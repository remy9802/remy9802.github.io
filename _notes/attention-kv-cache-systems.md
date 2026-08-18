---
title: "从 MHA、GQA、MLA 到 FlashAttention 与 PagedAttention：注意力和 KV Cache 系统笔记"
date: 2026-08-18
permalink: /notes/attention-kv-cache-systems/
note_kind: learning
note_topics:
  - machine-learning
  - engineering
tags:
  - attention
  - mha
  - mqa
  - gqa
  - mla
  - flashattention
  - pagedattention
  - kv-cache
excerpt: "分层理解 MHA、MQA、GQA、MLA 的 KV 表示，FlashAttention 的 IO-aware 精确计算，以及 PagedAttention 的服务端分页管理。"
---

> **一句话结论：** MHA、MQA、GQA、MLA 改的是 **注意力头如何表示或共享 K/V**；FlashAttention 改的是 **同一注意力公式怎样在加速器上少搬数据**；PagedAttention 改的是 **服务端怎样分配、映射和共享 KV cache**。它们处在不同层级，通常可以组合，而不是六选一。

## 1. 先画清楚四个层次

| 层次 | 代表方法 | 它回答的问题 | 是否改变注意力的数学语义 |
|---|---|---|---|
| 头与投影结构 | MHA、MQA、GQA | 多个 query head 是否共享 K/V head？ | 会改变参数化和表示容量 |
| 潜变量表示 | MLA | K/V 能否由更小的联合 latent 表示并在计算时恢复/吸收？ | 会改变参数化和缓存表示 |
| 计算内核 | FlashAttention | 如何计算 softmax attention，避免反复读写大矩阵？ | 标准版本不改变；数值误差范围内等价 |
| 服务内存管理 | PagedAttention | 多请求、变长序列的 KV block 如何分配、映射和共享？ | 不改变模型注意力定义 |

把 FlashAttention 说成“另一种注意力头”，或把 PagedAttention 说成“压缩 K/V 的模型结构”，都会把模型设计与系统实现混在一起。

## 2. 基础公式与 decode 为什么容易受内存带宽限制

设隐藏状态 $X\in\mathbb R^{T\times d}$，第 $h$ 个注意力头为

$$
Q_h=XW_h^Q,\qquad K_h=XW_h^K,\qquad V_h=XW_h^V,
$$

$$
O_h=\operatorname{softmax}\!\left(
\frac{Q_hK_h^\top}{\sqrt{d_h}}+M
\right)V_h,
\qquad
O=\operatorname{Concat}(O_1,\ldots,O_{H_q})W^O.
$$

自回归生成第 $t$ 个 token 时，历史 token 的 $K,V$ 不会改变，可以缓存起来。于是每一步只计算新 token 的 query/key/value，再让新 query 读取全部历史缓存。这避免重复投影历史序列，却带来一个随上下文线性增长的常驻状态。

令：

- $L$：Transformer 层数；
- $B$：活跃序列数；
- $T$：每条序列已缓存 token 数，这里为便于估算假设等长；
- $H_{kv}$：每层 KV head 数；
- $d_h$：单个 KV head 维度；
- $b$：每个缓存元素的字节数。

忽略 allocator、对齐、元数据、量化 scale 和临时 workspace，常规显式 KV cache 约为

$$
\boxed{
M_{KV}\approx 2LBT H_{kv}d_h b
}
$$

系数 2 来自 K 和 V。真实 serving 中每个请求长度不同，应把 $BT$ 换成所有活跃请求缓存 token 数之和。这个公式也不包含模型权重和中间激活。

## 3. MHA：每个 query head 都有自己的 K/V

原始 Transformer 的 Multi-Head Attention（MHA）令 $H_{kv}=H_q$：每个 query head 有独立的 K/V 投影和缓存。[Transformer 论文](https://arxiv.org/abs/1706.03762)

**优点**

- 每个头可以学习不同的查询、寻址和内容通道，表示容量直观且充分；
- 训练、微调和内核支持最成熟，适合作为质量与实现基线；
- 不需要处理 query head 到 KV head 的共享映射。

**主要代价和失败模式**

- KV cache 随 $H_q$ 线性增长；长上下文和大 batch 下很快占满显存；
- 单 token decode 的算术强度较低，每一步都要读取大量历史 K/V，容易成为 memory-bandwidth-bound；
- batch 被缓存挤小后，GPU 计算单元利用率也可能下降。

MHA 适合训练基线、缓存并非瓶颈的短上下文任务，以及质量优先且硬件余量充足的场景。

## 4. MQA：所有 query head 共用一组 K/V

Multi-Query Attention（MQA）保留 $H_q$ 个 query head，却只使用一组 key 和 value，即 $H_{kv}=1$。每个 query head 仍有自己的 $Q_h$，但都读取同一个 $K,V$。提出 MQA 的工作将目标直接对准增量解码时反复加载 K/V 的带宽成本，并报告在其任务中显著加速且质量仅小幅下降。[MQA 论文](https://arxiv.org/abs/1911.02150)

相对同维度 MHA，理想 KV cache 比例为

$$
\frac{M_{MQA}}{M_{MHA}}=\frac{1}{H_q}.
$$

**优点**

- 极大降低 KV cache、decode 内存流量和多卡通信压力；
- 同一显存可容纳更长上下文或更多并发请求；
- query 仍保留多头，因此不同头可以对共享内容做不同查询。

**代价和失败模式**

- 所有 query head 被迫共享 K/V 表示，可能形成容量瓶颈并损失质量；
- 把训练好的 MHA 权重直接平均成一个 KV head 通常不足，需要继续训练或专门转换；
- 当瓶颈已转移到采样、网络、权重读取或其他算子时，缩小 KV 不一定等比例提升端到端速度。

MQA 更偏向吞吐、长上下文和显存受限的推理场景。

## 5. GQA：在 MHA 与 MQA 之间连续取舍

Grouped-Query Attention（GQA）使用 $1<H_{kv}<H_q$ 个 KV heads。每组 $H_q/H_{kv}$ 个 query heads 共享一组 K/V；通常要求两者整除，具体实现也可用显式映射。

$$
\frac{M_{GQA}}{M_{MHA}}=\frac{H_{kv}}{H_q}.
$$

当 $H_{kv}=H_q$ 时退化为 MHA；当 $H_{kv}=1$ 时退化为 MQA。原论文还给出从 MHA checkpoint 转换后继续训练的 uptraining 方法，并在其设置中报告 GQA 的质量接近 MHA、速度接近 MQA；“接近”是论文实验结论，不应脱离模型和硬件泛化。[GQA 论文](https://arxiv.org/abs/2305.13245)

**优点**

- 用可调的 KV head 数在表示容量与缓存/带宽之间折中；
- 相比 MQA 保留更多 K/V 子空间，相比 MHA 显著缩小缓存；
- 适合希望兼顾生成质量和服务吞吐的通用大模型。

**代价和失败模式**

- $H_{kv}$ 是需要通过质量、时延、并发共同选择的超参数；
- checkpoint 转换需要可靠的权重聚合和继续训练，不能假设零成本无损；
- kernel 若不能原生处理 GQA，可能显式 repeat K/V，抵消部分内存优势；
- KV head 过少时仍会出现类似 MQA 的共享瓶颈。

## 6. MLA：缓存联合低维 latent，而非若干完整 KV heads

Multi-head Latent Attention（MLA）由 DeepSeek‑V2 系统提出。它不只是把 KV heads 从 $H_q$ 减少到某个整数，而是先把当前隐藏状态压缩成联合 latent：

$$
c_t^{KV}=W^{DKV}h_t,
$$

再由它生成各头使用的内容 key/value：

$$
k_t^C=W^{UK}c_t^{KV},
\qquad
v_t^C=W^{UV}c_t^{KV}.
$$

若直接在 decode 时把完整 $k_t^C,v_t^C$ 展开并缓存，低秩设计的意义会被削弱。MLA 的关键是利用线性变换吸收（weight absorption），让推理主要缓存 $c_t^{KV}$；同时为兼容位置信息，DeepSeek‑V2 将 RoPE 相关的 key 部分解耦并额外缓存。[DeepSeek‑V2 论文，MLA 章节](https://arxiv.org/abs/2405.04434)

设联合 latent 维度为 $d_c$，需要缓存的解耦位置 key 维度为 $d_R$，则论文式理想实现的量级近似为

$$
M_{MLA}\approx LBT(d_c+d_R)b.
$$

它与 MHA/MQA/GQA 的 $2LBT H_{kv}d_hb$ 不能只按“头数”比较；必须代入 checkpoint 的 $d_c,d_R,H_{kv},d_h$，并确认后端确实执行了吸收后的计算。DeepSeek‑V2 在其具体配置和对照下报告 KV cache 降低 93.3%，这个数字是 **论文特定模型相对其基线**，不是所有 MLA 模型的固定压缩率。

**优点**

- 用联合低秩表示压缩 K/V，仍可恢复多头内容表示；
- 显著减少长上下文 decode 的缓存与带宽压力；
- 低秩 query 投影还可降低部分激活内存，具体收益取决于训练实现。

**代价和失败模式**

- 结构、RoPE 拆分、权重吸收和 kernel 都比 GQA 更复杂；
- $d_c$ 太小会成为信息瓶颈，太大则失去缓存优势；
- 朴素框架若逐 token 展开并存储完整 K/V，可能“模型名是 MLA，实际缓存不是 MLA”；
- 将已有 MHA/GQA checkpoint 改成 MLA 并非简单改配置，通常需要结构转换和再训练；
- 在不同硬件上，节省带宽可能换来额外矩阵计算，端到端收益需实测。

可参考 DeepSeek‑V2 的[作者官方仓库](https://github.com/deepseek-ai/DeepSeek-V2)。

## 7. FlashAttention：同一公式，换一种 IO-aware 计算次序

标准实现常先把完整注意力分数矩阵 $S=QK^\top$ 写到高带宽显存（HBM），再读回做 softmax 和乘 $V$。长度为 $T$ 时，这个中间矩阵是 $O(T^2)$，而 GPU 片上 SRAM 更快却更小。

FlashAttention 将 $Q,K,V$ 分块搬入 SRAM，用 online softmax 维护每行的最大值、归一化因子和输出累积量。对一块新 logits $s$，可以更新

$$
m_{new}=\max(m_{old},\max s),
$$

并按新的最大值重新缩放旧累积量，从而不必把完整 $T\times T$ 分数矩阵写回 HBM。原始工作将其定义为 IO-aware 的 **exact attention**：标准 dense 版本保持同一 softmax attention 语义，实际数值只受浮点计算次序影响。[FlashAttention 论文](https://arxiv.org/abs/2205.14135)

**它解决什么**

- 减少 HBM 与片上 SRAM 之间的数据搬运；
- 不物化完整注意力矩阵，显著降低训练和 prefill 的中间激活内存；
- 通过重计算部分中间量，让反向传播也避免保存巨大矩阵。

**它不解决什么**

- dense attention 的算术量仍随序列长度近似二次增长；
- 不减少模型逻辑上的 KV cache 元素数；
- 不自动改变 MHA/MQA/GQA/MLA 的头结构；
- 在 query 长度为 1 的 decode 阶段，收益模式与大矩阵 prefill 不同，历史 KV 读取仍可能是瓶颈。

**失败模式与工程边界**

- head dimension、数据类型、mask、dropout、GPU 架构和编译环境必须落在内核支持范围；
- 不支持的形状回退到普通 kernel 后，性能可能突然下降；
- “不保存 $T^2$ 矩阵”不等于端到端显存为 $O(1)$，输入、输出、KV cache 和其他层激活仍存在；
- block-sparse FlashAttention 是论文另行扩展的近似稀疏版本，不能和标准 exact 版本混为一谈。

实现参考[作者官方 FlashAttention 仓库](https://github.com/Dao-AILab/flash-attention)。

## 8. PagedAttention：给变长 KV cache 加一层分页系统

在线服务面对的不是一条固定长度序列，而是不断到达、结束和增长的请求。若为每条请求预留最大连续空间，会产生内部浪费；若按当前长度频繁申请连续空间，又会造成外部碎片和搬迁。beam search、parallel sampling 和共享前缀还会复制大量相同 KV。

PagedAttention 借鉴操作系统虚拟内存：

1. 把每条序列的逻辑 KV cache 划分为固定 token 数的逻辑块；
2. 物理块可以离散地放在显存任意位置；
3. block table 将逻辑块号映射到物理块号；
4. attention kernel 按映射读取历史 K/V；
5. 多个候选序列可以引用同一物理块，发生写入时再 copy-on-write。

因此 PagedAttention 主要减少 **碎片、过度预留和重复副本**，并让调度器容纳更大 batch。vLLM 论文在其模型、硬件和工作负载上报告相对当时系统在相同延迟水平实现 2–4 倍吞吐；这个结果不能直接当作所有部署的固定倍率。[PagedAttention / vLLM 论文](https://arxiv.org/abs/2309.06180)

**优点**

- 请求增长时不要求物理连续内存，降低外部碎片；
- 最后一块之外几乎无需为未生成 token 预留空间；
- 支持 beam、parallel sampling 和共享前缀的块级共享；
- 将缓存管理与逻辑序列解耦，便于 continuous batching 和抢占调度。

**代价和失败模式**

- block table 查询、非连续访问和调度器引入额外复杂度；
- 块过大会增加最后一块的内部浪费，块过小则增加元数据和寻址开销；
- 分页本身不减少每个逻辑 token 所需的 K/V 数量；
- 显存不足时若触发交换、重计算或频繁抢占，尾延迟仍可能恶化；
- 前缀只有在 token、模型配置和相关缓存语义一致时才能安全共享。

实现参考[vLLM 官方仓库](https://github.com/vllm-project/vllm)。

## 9. KV cache 量级比较

在相同 $L,B,T,d_h,b$ 下，忽略系统开销：

| 方法 | 每 token、每层缓存元素量级 | 相对 MHA | 主要旋钮 |
|---|---:|---:|---|
| MHA | $2H_qd_h$ | $1$ | query/KV head 数 |
| MQA | $2d_h$ | $1/H_q$ | 固定为 1 个 KV head |
| GQA | $2H_{kv}d_h$ | $H_{kv}/H_q$ | KV head 数 $H_{kv}$ |
| MLA | $d_c+d_R$ | $(d_c+d_R)/(2H_qd_h)$ | latent 与位置维度、吸收后的实现 |

例如，若一个模型有 $H_q=32$ 个 query heads：MQA 的理论显式 KV 元素数是 MHA 的 $1/32$；若 GQA 有 $H_{kv}=8$，则是 $1/4$。这只是 **缓存元素数量** 比例，不等于端到端吞吐一定提升 32 倍或 4 倍。

还要分别看两个阶段：

- **Prefill：** 同时处理较长 prompt，attention 矩阵和算力占比大，FlashAttention 一类内核常很重要；
- **Decode：** 每步 query 很短，却需扫描历史 KV，MQA/GQA/MLA 的缓存表示和 PagedAttention 的并发管理更关键。

## 10. 它们如何组合

| 组合 | 是否概念上兼容 | 价值 | 注意事项 |
|---|---|---|---|
| GQA + FlashAttention | 是 | 同时缩小 KV 和减少 attention IO | kernel 必须原生支持 GQA，避免显式复制 K/V |
| GQA + PagedAttention | 是 | 降低单 token 缓存，再降低服务碎片和重复 | 页表布局需认识 KV head 形状 |
| GQA + FlashAttention + PagedAttention | 是，也是常见系统分层 | 模型、kernel、allocator 三层协同 | 性能取决于后端是否真正融合 |
| MLA + FlashAttention 类内核 | 原理上可组合 | 潜变量缓存加 IO-aware 计算 | 需要适配 MLA 的吸收形式和 RoPE 拆分，不能直接假设普通 MHA kernel 可用 |
| MLA + 分页缓存 | 原理上可组合 | 管理压缩 latent 的动态请求生命周期 | serving engine 必须支持对应缓存布局和 attention kernel |
| MQA/GQA/MLA + KV 量化 | 可组合 | 进一步减少字节数 $b$ | scale/zero-point 带来元数据、反量化成本和精度风险 |

因此正确的系统问题不是“FlashAttention 和 GQA 哪个更好”，而是：

1. checkpoint 用什么 K/V 表示？
2. attention kernel 如何执行该表示？
3. serving engine 如何分配并调度这些缓存？

## 11. 选型与诊断

### 训练或长 prompt 的 prefill 慢

先确认是否物化了完整注意力矩阵、FlashAttention 路径是否命中，以及 shape/dtype/mask 是否导致回退。此时只把 MHA 换成 GQA，未必解决主要的二次 attention 计算。

### 单请求 decode 慢且显存带宽高

检查 KV cache 读取量、量化和 kernel。若能重新训练模型，GQA/MLA 是结构级路线；已有 MHA checkpoint 则要评估 uptraining、量化或张量并行通信优化，不能只改配置文件。

### 高并发服务显存明明够，却放不下更多请求

检查预留策略、碎片、不同序列长度和前缀重复。PagedAttention 或等价的 block allocator/continuous batching 往往比单纯优化单次 attention kernel 更直接。

### 质量下降

将问题分层排查：

- MQA/GQA/MLA 改变了模型表示，可能需要再训练并做任务级评测；
- KV 量化可能产生数值误差，应按层、长度和任务分桶；
- exact FlashAttention 不应造成系统性语义变化，若差异很大，应检查 mask、位置编码、精度、kernel bug 或回退路径；
- PagedAttention 若实现正确不改变 logits，异常通常指向 block table、共享前缀或生命周期管理错误。

## 12. 最小 benchmark 清单

不要只报 tokens/s。至少同时记录：

- 模型、dtype/量化、GPU、并行策略和软件版本；
- prompt 长度、生成长度、并发数和长度分布；
- time to first token（TTFT）与 inter-token latency（ITL）；
- 吞吐、峰值显存、KV cache 实际占用和可容纳请求数；
- P50/P95/P99 延迟，而不仅是平均值；
- kernel 是否命中、是否发生回退、抢占、交换或重计算；
- 与原模型相同的质量评测，特别是长上下文和检索任务。

只有在相同模型质量、请求分布和延迟约束下，吞吐比较才有意义。

## 参考资料与官方实现

- Vaswani et al., 2017, [Attention Is All You Need](https://arxiv.org/abs/1706.03762)。MHA 与原始 Transformer。
- Shazeer, 2019, [Fast Transformer Decoding: One Write-Head is All You Need](https://arxiv.org/abs/1911.02150)。MQA。
- Ainslie et al., 2023, [GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](https://arxiv.org/abs/2305.13245)。GQA 与 uptraining。
- DeepSeek‑AI, 2024, [DeepSeek‑V2](https://arxiv.org/abs/2405.04434)；[作者官方仓库](https://github.com/deepseek-ai/DeepSeek-V2)。MLA。
- Dao et al., 2022, [FlashAttention](https://arxiv.org/abs/2205.14135)；[作者官方仓库](https://github.com/Dao-AILab/flash-attention)。
- Kwon et al., 2023, [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)；[vLLM 官方仓库](https://github.com/vllm-project/vllm)。

## 我的思考

这组概念最适合用“跨层协同”理解：模型结构决定每个 token 逻辑上要保存什么，kernel 决定怎样搬运和计算，服务系统决定多个请求之间怎样占用这些状态。只优化其中一层，瓶颈经常会转移到另一层；所以真实选型应从 TTFT、ITL、并发和质量四个目标共同反推，而不是追逐单个方法名。
