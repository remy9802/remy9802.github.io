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

### 2. 输入契约：FAST 实际接收什么

先把一个动作片段写成矩阵：

$$
A=[a_{t,d}]\in\mathbb{R}^{H\times D},
$$

其中 $H$ 是时间步数，$D$ 是动作维数。比如 50 Hz 双臂控制的一秒片段可以是 $H=50,D=14$。FAST 对整段时间序列编码，而不是分别处理 50 个时刻；同一个片段最终可以产生可变长度的 token 序列。

论文与官方 FAST+ 模型卡都推荐使用约一秒的 chunk。这不是 DCT 的数学限制，而是一个工程折中：窗口太短时可利用的时间相关性少，窗口太长又会增加自回归解码时延，并要求动作在更长时间内保持可预测。[原文 §V-C](https://arxiv.org/pdf/2501.09747) · [FAST+ 模型卡](https://huggingface.co/physical-intelligence/fast)

### 3. 第一步：逐维稳健归一化

先在训练集上为每个动作维 $d$ 统计 1% 与 99% 分位数 $q_{01,d},q_{99,d}$，再做仿射缩放：

$$
x_{t,d}=2\frac{a_{t,d}-q_{01,d}}{q_{99,d}-q_{01,d}+\epsilon}-1.
$$

因此 $q_{01,d}$ 与 $q_{99,d}$ 分别映射到约 $-1$ 与 $1$。相比使用最小值、最大值，少量异常动作不会把绝大多数正常样本挤进很窄的区间。它还把“米、弧度、关节速度”等尺度不同的动作维放到可共同量化的范围。

这里有两个容易忽略的实现边界：

- **归一化统计量不在 FAST+ tokenizer 内。** 官方处理器只保存 DCT/BPE 所需参数，调用方仍须为自己的机器人计算、保存并在执行前后应用 $q_{01},q_{99}$。
- **分位数映射不必然等于裁剪。** 论文描述的是把两个分位点映射到 $[-1,1]$；当前 openpi 的 quantile normalization 也只做上述仿射变换，不自动 `clip`，所以分位区间外的样本可能小于 $-1$ 或大于 $1$。[openpi `Normalize`](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/transforms.py)

### 4. 第二步：沿时间轴做正交 DCT

对每个动作维独立做 DCT-II。官方实现使用 SciPy 的 `dct(..., norm="ortho")`；写成公式是：

$$
C_{k,d}=\alpha_k\sum_{t=0}^{H-1}x_{t,d}
\cos\left[\frac{\pi}{H}\left(t+\frac{1}{2}\right)k\right],
$$

其中 $k=0,\ldots,H-1$ 是频率索引，$\alpha_0=1/\sqrt{H}$，$\alpha_k=\sqrt{2/H}$（$k>0$）。变换前后矩阵形状都还是 $H\times D$：DCT 本身**没有减少元素个数**，它只是把时间域轨迹改写成频域系数。

- $k=0$ 描述一段动作的直流/平均成分；
- 小 $k$ 描述整体趋势和缓慢弯曲；
- 大 $k$ 描述快速振荡、尖峰和细节。

机器人动作通常时间连续，因此能量集中在前几个低频系数，后面的高频系数接近零。这一步把“许多相邻时刻几乎相同”转换成“少数大系数 + 大量小系数”，为后续真正压缩创造稀疏性。

### 5. 第三步：缩放、取整，把小系数变成零

每个 DCT 系数使用同一个尺度 $\gamma$ 做标量量化：

$$
Q_{k,d}=\operatorname{round}(\gamma C_{k,d}),
\qquad
\widehat C_{k,d}=\frac{Q_{k,d}}{\gamma}.
$$

当 $|C_{k,d}|<1/(2\gamma)$ 时，它通常会被舍入为 0；轨迹越平滑，零越多。$\gamma$ 的作用方向如下：

| 设置 | 量化间隔 | 零系数 | BPE 后长度 | 重建误差 |
|---|---:|---:|---:|---:|
| 较小 $\gamma$ | 较粗 | 更多 | 更短 | 更大 |
| 较大 $\gamma$ | 较细 | 更少 | 更长 | 更小 |

忽略分布外编码等实现边界，单个频域系数的反量化误差不超过约 $1/(2\gamma)$。由于官方 DCT 使用正交归一化，IDCT 前后的二范数误差相同；但变回真实物理单位后，各动作维的误差还会被其分位数跨度重新缩放。这是由正交变换性质得到的推论，不是论文额外报告的控制误差保证。

论文的单数据集实验统一取 $\gamma=10$。这意味着量化网格为 0.1，但不意味着真实关节或末端动作误差就是 0.1；真实误差还取决于归一化尺度和各频率误差的叠加。

### 6. 第四步：按“低频优先”序列化

量化后仍有 $H\times D$ 个整数，必须先排成一维序列。FAST 的顺序是：先放所有动作维的最低频系数，再放所有动作维的第二低频系数，依此类推：

$$
s=[Q_{0,0},Q_{0,1},\ldots,Q_{0,D-1},
Q_{1,0},\ldots,Q_{H-1,D-1}].
$$

用一个 $H=4,D=3$ 的形状例子表示：

```text
频率 0:  q00  q01  q02   ┐
频率 1:  q10  q11  q12   ├─> q00,q01,q02,q10,q11,q12,...
频率 2:  q20  q21  q22   │
频率 3:  q30  q31  q32   ┘
```

论文把系数矩阵画成“动作维 $\times$ 频率”，所以称这种顺序为 **column-first**；当前官方 Python 代码把数组存为“频率 $\times$ 动作维”并直接 `flatten()`。两种说法指向同一个次序，不是算法冲突。[原文 Algorithm 1](https://arxiv.org/pdf/2501.09747) · [官方处理器源码](https://huggingface.co/physical-intelligence/fast/blob/main/processing_action_tokenizer.py)

为什么顺序重要？自回归模型先预测决定动作整体形状的低频项，即便后续高频 token 有误，轨迹仍可能保持基本方向；若先输出某一个动作维的全部频率，模型必须在看到其他维的整体趋势之前生成大量细节。论文报告低频优先的 rollout 更稳定。

### 7. 第五步：用 BPE 真正缩短序列

DCT 和取整只让整数矩阵变稀疏，**实际 token 数仍是 $H D$**。BPE 才把它压成较短的可变长序列。训练词典时，官方实现大致做四件事：

1. 在训练 action chunks 上执行 DCT 与取整；
2. 找到训练系数的最小整数 `min_token`，平移所有整数使其非负；
3. 把每个平移后的整数映射成临时字符，得到一条字符序列；
4. 从单个符号出发，反复把训练集中高频相邻符号对合并，直到达到目标 vocabulary size。

例如大量连续的零系数或经常共同出现的低频组合，会被一个 BPE token 代替。BPE 学到的是**整数模式词典**，不是神经网络 encoder；它是 FAST 唯一需要拟合的部分。当前官方 `.fit()` 使用 `min_frequency=2`，并把训练量化范围内的全部符号加入初始 alphabet。[官方处理器源码](https://huggingface.co/physical-intelligence/fast/blob/main/processing_action_tokenizer.py)

BPE 对词典覆盖范围内的 $s$ 是无损的：一串 BPE ID 可以精确展开回同一串量化整数。完整 FAST 仍然有损，因为 $C\rightarrow Q$ 的取整不可逆。还要注意，当前 HF 编码器在字符映射前执行 `max(Q - min_token, 0)`；如果部署时某个量化系数低于拟合词典时见过的 `min_token`，它还会被截到下界。因此“额外压缩无损”依赖输入归一化合理、量化整数没有越出词典低端范围。[官方处理器源码](https://huggingface.co/physical-intelligence/fast/blob/main/processing_action_tokenizer.py)

论文的消融也说明，仅做 DCT 而不做 BPE 仍会留下数百个零 token，推理更慢且策略更差；所以“频域集中信息”和“BPE 缩短序列”缺一不可。[原文 Appendix D](https://arxiv.org/pdf/2501.09747)

### 8. 完整解码：严格按相反顺序还原

给定预测的 BPE token 序列，解码过程为：

$$
\text{BPE IDs}
\xrightarrow{\Phi^{-1}}s
\xrightarrow{\operatorname{reshape}}Q
\xrightarrow{/\gamma}\widehat C
\xrightarrow{\operatorname{IDCT}}\widehat X
\xrightarrow{\text{denormalize}}\widehat A.
$$

解码器必须知道 $H$ 和 $D$，否则无法把一维整数串恢复成矩阵。官方 Hugging Face 处理器允许三种来源：调用 `decode()` 时显式传入、构造处理器时配置，或沿用最近一次编码缓存的形状；独立部署时显式传入最稳妥。当前实现还会检查展开后的整数数是否恰好等于 $HD$，解析失败时回退为全零动作，因此 token 截断、错误终止符或错误的 $H,D$ 都可能直接导致零输出。[FAST+ 模型卡](https://huggingface.co/physical-intelligence/fast) · [官方处理器源码](https://huggingface.co/physical-intelligence/fast/blob/main/processing_action_tokenizer.py)

### 9. 一个 50 Hz 双臂片段到底怎样变成 53 个 token

以论文的 T-shirt folding 为例：

1. 输入是一秒、50 个时间步、14 维动作，即 $A\in\mathbb{R}^{50\times14}$；
2. 归一化与 DCT 后仍是 $50\times14$，共 700 个系数；
3. 乘 $\gamma$ 并取整后，平滑动作的高频区出现大量零和重复模式；
4. 频率优先展开得到 700 个“原始整数符号”；
5. BPE 把相邻零串和常见组合合并，论文实测平均只剩 53 个 action tokens；
6. 解码时 53 个 ID 无损展开回 700 个整数，再经 IDCT 还原 50×14 动作。

因此“700→53”不是删掉 647 个时间点，也不是只保留前 53 个 DCT 系数；它是“有损量化制造重复 + 无损 BPE 合并重复”。动作仍以原始 50 Hz 时间网格重建。

### 10. FAST 与 FAST+ 的区别

两者的变换流程完全相同，主要区别是 BPE 词典的拟合数据：

| 版本 | BPE 训练数据 | 论文/发布配置 | 归一化统计 |
|---|---|---|---|
| dataset-specific FAST | 当前任务的数据 | 论文统一使用 $\gamma=10$、vocab 1024 | 当前数据集自己的 $q_{01},q_{99}$ |
| FAST+ | 约 100 万条跨具身的一秒动作序列 | 当前 HF 发布处理器为 scale 10、vocab 2048 | 仍由使用者按自己的数据在外部提供 |

FAST+ 训练混合覆盖单臂、双臂、移动机器人，joint、end-effector、camera-frame action space，以及约 5–50 Hz 和混合频率；论文训练词典前把动作补零到 32 维，以统一跨机器人表示。数据包括 Physical Intelligence 的 π0 混合以及 ALOHA、DROID、BridgeV2、Open X-Embodiment。这里的“通用”指一个 BPE 词典能复用，不表示动作坐标系、单位和分位数统计自动统一。[原文 Appendix A](https://arxiv.org/pdf/2501.09747) · [FAST+ 当前处理器配置](https://huggingface.co/physical-intelligence/fast/blob/main/processor_config.json)

若要拟合自己的词典，官方接口如下；输入应先完成归一化：

```python
from transformers import AutoProcessor

base = AutoProcessor.from_pretrained(
    "physical-intelligence/fast",
    trust_remote_code=True,
)

# 每个元素通常是 [time_horizon, action_dim]；time_horizon 可以不同。
custom_fast = base.fit(normalized_action_chunks, scale=10, vocab_size=1024)
custom_fast.save_pretrained("./my_fast_tokenizer")
```

`.fit()` 只训练 BPE 合并规则，通常是秒到分钟级；它不会学习动作 encoder、动力学或控制策略。不同长度 chunk 可以共同拟合，但动作维语义应保持一致，或像 FAST+ 一样先采用明确的 padding/canonicalization 规则。[FAST+ 模型卡](https://huggingface.co/physical-intelligence/fast)

### 11. 接入自回归 VLA：论文方案与 openpi 实现

论文层面的做法是把 FAST 的 BPE ID 分配给 VLM 词表中使用频率最低的 token，并用标准 next-token loss 微调整个 VLA。论文测试 π0/PaliGemma-3B 与 OpenVLA/Prismatic-7B，不需要 diffusion action expert 或额外的 learned tokenizer encoder。[原文 §VI-A](https://arxiv.org/pdf/2501.09747)

当前 openpi 的 `FASTTokenizer` 进一步给出了可复现的序列协议：

```text
Task: <language>, State: <256-bin state>;
Action: <mapped FAST token 1> <mapped FAST token 2> ... |
```

- 语言和离散化本体状态构成 prefix，prefix 内采用双向注意力；
- `Action:`、FAST tokens、分隔符与 EOS 构成 causal postfix；
- 交叉熵 loss mask 只覆盖 postfix；
- FAST ID $u$ 被映射为 $|V_{PG}|-1-128-u$，避开 PaliGemma 词表末尾 128 个特殊 token；这个算术映射自身可逆；
- 推理时模型带 KV cache 自回归生成，遇到 EOS 或达到最大步数停止，再抽取 `Action:` 与 `|` 之间的 token，反映射并调用 FAST 解码器。

这些是当前官方 openpi 的工程约定，不应误写成 DCT/BPE 算法本身的必要组成。[openpi `FASTTokenizer`](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/tokenizer.py) · [π0-FAST 实现](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/pi0_fast.py)

### 12. 最小伪代码

```python
def encode(action_chunk, q01, q99, gamma, bpe):
    # action_chunk: [H, D]
    x = 2 * (action_chunk - q01) / (q99 - q01 + 1e-6) - 1
    c = dct(x, axis=0, norm="ortho")       # [frequency, action_dim]
    q = round(gamma * c).astype(int)
    primitive_sequence = q.flatten()       # low frequency first
    return bpe.encode(primitive_sequence)   # variable-length IDs

def decode(ids, H, D, q01, q99, gamma, bpe):
    primitive_sequence = bpe.decode(ids)   # exactly H * D integers
    q = primitive_sequence.reshape(H, D)
    x_hat = idct(q / gamma, axis=0, norm="ortho")
    return (x_hat + 1) / 2 * (q99 - q01 + 1e-6) + q01
```

伪代码省略了官方实现把整数转换为临时字符、VLM token ID 重映射、padding、EOS、错误恢复和 batch 处理，但保留了 FAST 的算法主干。

### 13. 常见误解

| 误解 | 更准确的说法 |
|---|---|
| DCT 直接把 700 个数变成 53 个 | DCT 保持 $HD$ 个系数；取整制造稀疏性，BPE 才缩短 token 序列 |
| FAST 是无损 tokenizer | 词典覆盖范围内，BPE 对量化整数无损；取整有损，HF 实现对低于训练 `min_token` 的分布外系数还会截断 |
| FAST 只保留低频、直接丢弃高频 | 所有频率位置仍被序列化；小系数通过取整变零，再由 BPE 合并 |
| FAST+ 包含通用动作归一化 | FAST+ 复用 BPE 词典；每个数据/机器人仍要提供一致的坐标系与 quantile stats |
| vocab 越大，动作一定越准确 | 主要保真度由 $\gamma$ 与归一化决定；更大 BPE vocab 主要改变无损压缩长度与词表占用 |
| token 更少就一定推理更快 | FAST 比 naive 少很多 token，但 π0-FAST 仍需完整 LLM 串行解码，论文中慢于 diffusion π0 |

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
