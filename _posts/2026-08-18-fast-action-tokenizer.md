---
title: "文献笔记｜FAST：面向高频机器人控制的动作 tokenizer"
date: 2026-08-18
permalink: /posts/fast-action-tokenizer/
tags: [literature-note, fast-tokenizer, fast-plus, action-tokenization, dct, autoregressive-vla]
note_type: single-paper
literature_topics: [embodied-ai, vla, action-representation]
---

> **阅读范围**：阅读全文，包括 DCT/BPE 动作压缩、FAST+ 数据构成、tokenizer 与策略消融、DROID/真机实验、π0-FAST 对照和附录。  
> **检索日期**：2026-08-18。  
> **主题**：怎样把高频连续机器人 action chunk 压缩为适合自回归 VLA 的离散 token，同时保持动作保真度和跨机器人复用能力？

## 文献档案

- **论文**：*FAST: Efficient Action Tokenization for Vision-Language-Action Models*
- **文献链接**：[RSS 2025 正式页面](https://www.roboticsproceedings.org/rss21/p012.html) · [arXiv:2501.09747](https://arxiv.org/abs/2501.09747) · [项目页](https://www.pi.website/research/fast)
- **PDF**：[RSS 正式版](https://www.roboticsproceedings.org/rss21/p012.pdf) · [arXiv v1](https://arxiv.org/pdf/2501.09747)
- **代码 / 模型**：[FAST+ 官方 tokenizer](https://huggingface.co/physical-intelligence/fast) · [openpi / π0-FAST](https://github.com/Physical-Intelligence/openpi) · [π0-FAST 实现](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/pi0_fast.py)
- **作者**：Karl Pertsch、Kyle Stachowicz、Brian Ichter、Danny Driess、Suraj Nair、Quan Vuong、Oier Mees、Chelsea Finn、Sergey Levine
- **机构 / 年份**：Physical Intelligence、UC Berkeley、Stanford；2025
- **出版状态**：Robotics: Science and Systems XXI 同行评审论文；DOI：[10.15607/RSS.2025.XXI.012](https://doi.org/10.15607/RSS.2025.XXI.012)。
- **术语说明**：FAST 是 **Frequency-space Action Sequence Tokenization**，属于机器人动作表征，不是自然语言或视觉 tokenizer；FAST+ 是在约 100 万条真实机器人动作序列上训练的通用版本。

## 核心结论

FAST 的核心洞见是“先压缩，再离散化”。高频动作在相邻时间步高度相关，逐维逐时刻的 256-bin 量化会产生数百个容易复制、信息密度很低的 token；FAST 先用离散余弦变换把平滑动作能量集中到低频，再量化系数并用 BPE 压缩重复模式。它在 50 Hz 双臂动作上将一秒 action chunk 从约 700 个 token 降到 53 个，并使原本几乎无法训练的自回归策略完成高频灵巧任务。[原文 Table I、Figure 6](https://arxiv.org/pdf/2501.09747)

π0-FAST 在论文的通用机器人混合数据上达到与 diffusion π0 相近的总体任务表现，并把训练 GPU-hours 最多降低约 5 倍；但自回归推理反而更慢——作者报告 RTX 4090 上生成一秒动作约 750 ms，而 diffusion π0 约 100 ms。训练效率与控制时延必须分开报告。[原文 §VI-E–F](https://arxiv.org/pdf/2501.09747)

## 检索记录

- **数据源**：RSS 官方论文集、arXiv、Physical Intelligence 项目页、官方 Hugging Face tokenizer 与 openpi 仓库。
- **检索式**：`FAST Efficient Action Tokenization VLA`；`site:roboticsproceedings.org/rss21 FAST action tokenization`；`site:huggingface.co/physical-intelligence/fast`；`site:github.com/Physical-Intelligence/openpi pi0 FAST`。
- **纳入原因**：FAST 的正式论文和官方实现，直接评价动作压缩、策略学习、跨机器人复用及 diffusion/自回归折中。
- **排除**：同名 NLP fast tokenizer、社区复现和后续 FASTer 等不同方法未混入本文结果。
- **全文状态**：arXiv v1 共 19 页，正文、附录、所有关键图表均已检查，并用 RSS 正式记录核验发表状态。

## 研究背景

VLA 若使用标准语言模型式自回归解码，必须先把连续动作变成离散符号。RT-2、OpenVLA 等常见做法是对每个动作维度、每个时间步独立分桶。对低频短动作，这种方法尚可；对 20–50 Hz、一秒长度、多自由度的 action chunk，token 数会随“频率×维度”线性膨胀，而且相邻 token 几乎相同。

高度相关序列给 next-token prediction 留下捷径：模型复制最近动作就能降低 loss，却不必真正理解视觉状态、语言意图与长程动作形状。论文用一个 cubic-spline 玩具任务显示，随着同一连续轨迹被更密集采样，naive binning 的预测质量显著恶化，而频域表示保持稳定。[原文 Figures 2–3](https://arxiv.org/pdf/2501.09747)

## 研究问题

论文回答五个问题：

1. 高频控制失败是否主要来自动作 token 的冗余与相邻相关性？
2. 能否用分析式时间序列压缩，而不是训练额外 VQ encoder，得到短且高保真的动作 token？
3. 同一 tokenizer 能否跨 action dimension、控制频率和机器人本体使用？
4. 更好的 tokenizer 是否真的改善 VLA 策略，而不只是离线重建误差？
5. 自回归 π0-FAST 与 flow/diffusion π0 在训练成本、成功率和推理延迟上分别有什么取舍？

## 方法与数据

![FAST 动作 tokenization 流程](/images/literature-notes/fast-tokenizer/method-overview.png)

*图 1｜连续 action chunk 依次经过稳健归一化、DCT、系数量化、低频优先展开和 BPE，得到更短的离散动作序列。来源：原论文 Figure 4，arXiv PDF 第 5 页。[原图](https://arxiv.org/pdf/2501.09747)*

### 1. 问题定义

策略预测未来 $H$ 步动作：

$$
\pi(a_{1:H}\mid o),
$$

动作 tokenizer 定义映射：

$$
T_a:a_{1:H}\longrightarrow[T_1,\ldots,T_n],
$$

其中离散序列长度 $n$ 可以随动作复杂度变化，不必固定为 $H\times D$。这与逐时刻分桶的固定展开不同。

### 2. 稳健归一化与 DCT

每个动作维使用训练集的 1% / 99% 分位数缩放到约 $[-1,1]$，降低离群值对尺度的影响。随后沿时间轴对每个动作维做 DCT：

$$
C^i_j=\operatorname{DCT}(a^i_{1:H}).
$$

平滑控制信号的大部分能量集中在少数低频系数；高速采样产生的冗余因此不再按时间步重复出现。系数再用尺度 $\gamma$ 量化：

$$
\bar C^i_j=\operatorname{round}(\gamma C^i_j).
$$

这里已经产生有损误差，
$\gamma$ 控制压缩率—重建精度折中。

### 3. 低频优先展开与 BPE

量化后的系数矩阵按频率优先、跨动作维 column-first 展开，让最重要的低频成分先出现；论文发现它比逐动作维 row-first 更利于稳定 rollout。整数序列再交给 byte-pair encoding，将常见 coefficient 子序列和零串合并为可变长度 token。

BPE 对量化后的整数序列是无损压缩；完整 FAST 并非无损，因为量化已经丢失精度。dataset-specific FAST 默认使用约 $\gamma=10$、BPE vocabulary 1024；解码时执行 inverse BPE、反量化、IDCT 和反归一化。[原文 §V、Algorithm 1](https://arxiv.org/pdf/2501.09747)

### 4. FAST+ 通用 tokenizer

FAST+ 的 BPE 词典用约 100 万条一秒真实动作序列拟合，覆盖：

- 单臂、双臂与移动操作机器人；
- joint、end-effector 与 camera-frame action space；
- 约 5–50 Hz 及混合控制频率；
- Physical Intelligence 内部数据，以及 ALOHA、DROID、BridgeV2、Open X-Embodiment 等来源。

不同机器人动作 pad 到统一上限后拟合词典。官方实现建议先做 quantile normalization，再按一秒 chunk 编码；用户也可以在自有数据上用 `.fit()` 数分钟内训练新词典。[FAST+ 官方模型卡](https://huggingface.co/physical-intelligence/fast)

### 5. 接入 VLA

训练时将动作 token 写入 VLM 词表中使用频率最低的 token ID，并以标准 next-token loss 微调。论文测试 π0/PaliGemma-3B 与 OpenVLA/Prismatic-7B 两类骨干，不需要增加 diffusion action expert 或额外 learned tokenizer encoder。推理时自回归解码 token，再还原一秒连续动作。[原文 §VI-A](https://arxiv.org/pdf/2501.09747)

## 实验

### 压缩率

一秒动作在相近重建误差下的平均 token 数为：

| 数据 | 维度 / 频率 | Naive | FAST | 压缩倍数 |
|---|---:|---:|---:|---:|
| BridgeV2 | 7D / 5 Hz | 35 | 20 | 1.75× |
| DROID | 7D / 15 Hz | 105 | 29 | 3.6× |
| Table bussing | 7D / 20 Hz | 140 | 28 | 5.0× |
| T-shirt folding | 14D / 50 Hz | 700 | 53 | 13.2× |

FAST 倾向于每个机器人臂、每秒产生约 30 个 token，不再随采样频率线性增加。[原文 Table I](https://arxiv.org/pdf/2501.09747)

### Tokenizer 对策略性能的影响

![不同动作 tokenizer 的策略表现](/images/literature-notes/fast-tokenizer/key-results.png)

*图 2｜Naive、learned FSQ、dataset-specific FAST 与通用 FAST+ 在 LIBERO、DROID、20 Hz table bussing、50 Hz T-shirt folding 上的表现；误差线为 95% CI。来源：原论文 Figure 6，arXiv PDF 第 8 页。[原图](https://arxiv.org/pdf/2501.09747)*

Naive binning 在 20 Hz table bussing 与 50 Hz T-shirt folding 上几乎不能取得任务进展；FAST 与 FAST+ 明显更强。learned FSQ 压缩器也比 naive 好，但在需要细粒度控制的真实任务上通常弱于简单 DCT 方案。FAST+ 与针对单数据集拟合的 FAST 接近，支持词典跨数据复用。[原文 §VI-B、Figure 6](https://arxiv.org/pdf/2501.09747)

### DROID 与跨机器人泛化

DROID 策略用约 75k 成功 episodes、21M samples 训练，在完全未见的桌面环境进行语言条件零样本测试。主量化实验覆盖 16 类任务、每类约 44 次 trials；跨三个校园的视频主要是定性展示，没有对应统一成功率。FAST+ 还在训练词典未见的单臂、灵巧手、UMI、人形和导航数据上实现至少约 2× 离线压缩，但这些形态没有全部接受真实策略控制评价。[原文 Figures 7–8、Appendix](https://arxiv.org/pdf/2501.09747)

### π0-FAST 与 diffusion π0

通用训练混合包含约 10k robot-hours、903M internal timesteps，开放 Bridge/DROID/OXE 只占较小部分。π0-FAST 在 laundry folding、grocery bagging、toast、bussing 等任务上总体与 diffusion π0 的 95% CI 重叠，并用最多约 5× 更少 GPU-hours；table bussing 达到较高水平所需训练步数约减少 3×。[原文 Figures 9–11](https://arxiv.org/pdf/2501.09747)

部署折中相反：作者在 RTX 4090 上报告 diffusion π0 用约 100 ms 生成一秒 action chunk，π0-FAST 约 750 ms。前者只需多步调用约 300M action expert，后者必须用完整约 2B 语言模型逐 token 解码 30–60 步。FAST 加快训练，并未解决自回归控制延迟。

## 主要发现

1. **高频失败的关键是冗余，而不只是量化分辨率。** 更密采样增加大量可复制 token，却不增加等量控制信息。
2. **DCT+BPE 将动作复杂度与采样频率部分解耦。** 低频结构先被保留，重复整数模式再无损合并。
3. **简单分析式压缩可以优于 learned code。** 在本文所测灵巧任务上，FAST 比 FSQ 更稳定，且无需训练 encoder/decoder 网络。
4. **离线压缩泛化与策略泛化是不同证据。** FAST+ 在多形态数据上可压缩，不代表相同策略已在所有机器人上成功控制。
5. **训练吞吐和推理时延方向相反。** 自回归 VLA 更容易用标准 next-token pipeline 扩大训练，却在逐 token 动作解码上更慢。

## 结论

论文报告表明，高频连续动作应在离散化前利用时间结构压缩。FAST 让自回归 VLA 在 naive tokenization 失败的灵巧任务上可训练，FAST+ 又把这一表示扩展为跨机器人可复用的通用 tokenizer；与 π0 结合后，它提供了一条不使用 diffusion head 的大规模 VLA 路线。[RSS 正式摘要](https://www.roboticsproceedings.org/rss21/p012.html)

## 局限与适用边界

### 作者明确承认的局限

- 真实策略实验主要使用静态机械臂；灵巧手、人形、移动平台等更多只做了离线压缩评价。
- 论文未证明 autoregressive 或 diffusion 在所有任务上绝对更优，两者仍有不同训练/推理折中。
- π0-FAST 自回归推理显著慢于 diffusion π0，未在动态环境系统评价控制时延。
- 其他压缩方法、解码加速、量化 kernel 与非自回归组合仍留作未来工作。

### 额外识别的局限

- 通用 π0 训练混合大部分为私有数据，外部无法完整复现 10k-hour scaling 结果。
- FAST+ 词典训练包含部分真实策略评测域数据；严格 unseen-domain 证据主要来自 Figure 8 的离线压缩，而不是全面控制成功率。
- 一些任务 trials 较少、含人工判定且置信区间较宽；跨校园展示以定性视频为主。
- DCT 假设 action chunk 在时间上相对平滑；突发接触、冲击或非平稳动力学可能需要更短或自适应 chunk。
- $\gamma$、归一化分位数和一秒窗口都形成保真度—压缩率—控制时延折中。
- 训练效率结论绑定具体 π0/OpenVLA 实现、模型规模和硬件，不能直接外推到所有 VLA。

## 我的思考

FAST 把一个容易被忽视的事实说清楚：tokenizer 不是前处理细节，而是决定学习问题难度的模型组件。同一连续轨迹若用 5 Hz 或 50 Hz 采样，物理行为没有增加十倍复杂度；naive token 序列却增长十倍。频域压缩让表示更接近“动作形状”而不是“采样表格”。

它也提示 VLA 需要同时优化三种预算：训练 token 数、策略输出时延和动作重建误差。FAST 解决了第一项并改善第三项，却暴露第二项。后续研究若把并行 token decoding、分层动作码或 speculative action decoding 与 FAST 结合，可能比继续单纯扩大 VLA 参数更直接地改善真实控制周期。

## 参考文献

1. Pertsch, K., Stachowicz, K., Ichter, B., Driess, D., Nair, S., Vuong, Q., Mees, O., Finn, C., & Levine, S. (2025). *FAST: Efficient Action Tokenization for Vision-Language-Action Models*. Proceedings of Robotics: Science and Systems XXI. [正式页面](https://www.roboticsproceedings.org/rss21/p012.html) · [PDF](https://www.roboticsproceedings.org/rss21/p012.pdf) · [DOI](https://doi.org/10.15607/RSS.2025.XXI.012) · [FAST+](https://huggingface.co/physical-intelligence/fast) · [openpi](https://github.com/Physical-Intelligence/openpi)
