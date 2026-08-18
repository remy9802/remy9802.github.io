---
title: "LLM 的三种 Transformer 架构：Encoder-only、Decoder-only 与 Encoder–Decoder"
date: 2026-08-18
permalink: /notes/llm-architecture-families/
note_kind: learning
note_topics:
  - machine-learning
tags:
  - transformer
  - encoder-only
  - decoder-only
  - encoder-decoder
  - language-model
excerpt: "从掩码与信息流出发，比较三类 Transformer 的预训练目标、训练和推理方式、任务适配、优缺点与选型原则。"
---

> **一句话结论：** 三类架构最本质的区别不是“理解或生成”，而是 **每个 token 在哪一层能够读取哪些 token**，以及输入表示和输出生成是否由两套网络分工。Encoder-only 擅长一次性构造双向表示，Decoder-only 用统一的因果接口持续生成，Encoder–Decoder 则把“读输入”和“写输出”显式分开。

## 1. 先纠正一个容易误导的叫法

2017 年的原始 Transformer 是用于序列到序列任务的 **编码器—解码器**：编码器使用双向自注意力；解码器先做因果自注意力，再通过 cross-attention 读取编码器输出。[原始论文](https://arxiv.org/abs/1706.03762)

今天所谓的 **decoder-only Transformer** 通常并不是把原始 Transformer 的完整 decoder 原样堆叠起来。它移除了编码器，也通常移除了每层 decoder 中专门读取编码器输出的 cross-attention，只保留因果 self-attention、前馈网络、残差连接和归一化。因此，更准确的描述是：

> 现代 decoder-only block 是“采用因果掩码的 Transformer block”，通常等于原始 decoder block **去掉 cross-attention 子层**。

多模态模型或条件生成模型可以重新插入 cross-attention，但那是额外设计，不能用来定义普通 decoder-only 语言模型。

## 2. 统一视角：注意力掩码决定信息流

单个注意力头可写为

$$
\operatorname{Attn}(Q,K,V)
=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_h}}+M\right)V,
$$

其中 $M_{ij}=0$ 表示位置 $i$ 可以读取位置 $j$，$M_{ij}=-\infty$ 表示该连接被屏蔽。三类架构的关键差别可以浓缩为下表。

| 架构 | 输入侧 self-attention | 输出侧 self-attention | cross-attention | 典型概率目标 |
|---|---|---|---|---|
| Encoder-only | 双向；除 padding 等位置外彼此可见 | 无独立输出栈 | 无 | 根据左右文恢复被遮盖内容，或学习判别式表示 |
| Decoder-only | 单栈因果注意力；位置 $t$ 只看 $\le t$ | 与输入共用同一栈 | 通常无 | $p(x)=\prod_t p(x_t\mid x_{<t})$ |
| Encoder–Decoder | encoder 双向读取源序列 | decoder 对目标序列使用因果掩码 | decoder 读取全部 encoder 表示 | $p(y\mid x)=\prod_t p(y_t\mid y_{<t},x)$ |

“双向”指同一层内可以结合左、右上下文，并不表示模型知道训练样本之外的未来；“因果”则要求位置 $t$ 不能读取目标序列中 $t$ 之后的 token。

## 3. Encoder-only：把整段输入编码成上下文化表示

### 3.1 信息流和预训练目标

Encoder-only 对已知输入做双向 self-attention。以 BERT 为例，被选中的 token 会被遮盖或扰动，模型根据两侧上下文预测原 token；BERT 原始版本同时使用 next sentence prediction。[BERT 论文](https://arxiv.org/abs/1810.04805)

若遮盖位置集合为 $\mathcal M$，masked language modeling（MLM）目标可简写为

$$
\mathcal L_{\mathrm{MLM}}
=-\sum_{i\in\mathcal M}\log p_\theta(x_i\mid x_{\setminus\mathcal M}).
$$

损失通常只落在被选中的位置，但所有可见 token 都参与构造其上下文。后续 encoder-only 模型还采用动态遮盖、去掉句间预测、替换 token 检测等目标；这些是预训练目标的变化，不改变双向 encoder 的基本信息流。

### 3.2 训练、推理与任务适配

训练和常规推理时，整段输入可以并行经过所有 encoder 层。下游任务通常增加一个轻量任务头：

- 文本分类：读取特殊汇总 token 或池化后的序列表示；
- token 分类：对每个位置预测实体、词性或其他标签；
- 抽取式问答：预测答案起止位置；
- 检索与向量表示：将序列压缩成 embedding，并用对比目标训练。

Encoder-only 不是“绝对不能生成文本”，但它没有天然的从左到右生成接口。若要生成，通常需要迭代 mask、另接 decoder，或把任务改写为抽取/打分；这些路径不如自回归模型直接。

### 3.3 优点、局限和代表模型

**优点**

- 每个 token 能同时整合左右上下文，适合判别、抽取和稠密表示任务。
- 给定固定输入时一次前向即可得到全部位置的表示，推理不必逐 token 循环。
- 小中型模型加任务头即可高效微调，输出长度通常与输入长度一致。

**局限**

- MLM 只在部分位置产生直接训练信号；训练时出现的 mask token 与真实输入之间存在差异。
- 不原生提供开放式、可变长度的自回归生成。
- 对长输入仍有标准 self-attention 的二次计算代价。

代表模型包括 BERT、RoBERTa、ALBERT、ELECTRA，以及面向向量检索进一步训练的 encoder 模型。BERT 作者提供了[官方 TensorFlow 代码与预训练模型](https://github.com/google-research/bert)。

## 4. Decoder-only：把一切任务统一为“预测下一个 token”

### 4.1 信息流和预训练目标

Decoder-only 将提示、上下文和答案放进一个 token 流，用下三角因果掩码阻止未来信息泄漏。标准自回归目标是

$$
\mathcal L_{\mathrm{AR}}
=-\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{<t}).
$$

GPT 系列是代表路线；GPT-3 展示了在统一自回归接口下通过自然语言提示和上下文示例适配多类任务的能力。[GPT-3 论文](https://arxiv.org/abs/2005.14165)

### 4.2 “训练并行、生成串行”并不矛盾

预训练时完整答案已知，可以把目标右移一位，并用因果掩码同时计算所有位置的 logits；这种 teacher forcing 允许序列维并行。推理时第 $t+1$ 个 token 依赖刚生成的第 $t$ 个 token，因此必须沿时间步迭代。KV cache 避免重复计算历史 token 的 key/value，但不能消除这种数据依赖。

任务适配主要有三种方式：

1. **Prompt / in-context learning：** 把指令、示例和输入写成前缀，不更新参数；
2. **监督微调：** 通常只对答案区域计算语言模型损失，输入区域用于提供条件；
3. **参数高效微调：** 用 LoRA、adapter 等改变少量参数，接口仍是自回归生成。

### 4.3 优点、局限和代表模型

**优点**

- 预训练目标与最终生成行为一致，几乎所有文本任务都能改写为 token 生成。
- 单一模型和接口即可处理续写、对话、代码、结构化输出和工具调用。
- 每个非首 token 都能提供下一 token 预测监督，训练信号稠密。

**局限**

- 生成是串行过程，长输出的时延和 KV cache 随长度增长。
- 单向掩码不是为一次性构造双向句向量而设计；做 embedding 或 token 判别时常需专门训练与池化。
- 把输入和输出放进同一上下文会共同消耗窗口；长源序列加长目标时尤其明显。
- 自回归误差会进入后续上下文，部署时还要处理采样、停止条件和格式约束。

代表模型包括 GPT、LLaMA、Qwen、DeepSeek 等主流生成式语言模型。具体模型还会在位置编码、归一化、MLP、MoE 和注意力头共享上变化，但这些变化不改变 decoder-only 的因果信息流。

## 5. Encoder–Decoder：先完整读取，再条件生成

### 5.1 两条信息通路

Encoder–Decoder 使用两个 token 流：源序列 $x$ 经双向 encoder 得到 memory；目标前缀 $y_{<t}$ 经因果 decoder，并在每层或若干层通过 cross-attention 读取 memory。cross-attention 中，query 来自 decoder，key/value 来自 encoder：

$$
Q=H_{\mathrm{dec}}W_Q,
\qquad K=H_{\mathrm{enc}}W_K,
\qquad V=H_{\mathrm{enc}}W_V.
$$

因此 decoder 在生成每个目标 token 时，可以读取 **完整源输入**，却只能读取 **已生成的目标前缀**。

原始 Transformer 用机器翻译训练这一结构；T5 进一步把分类、问答、摘要等任务统一成 text-to-text，并以 span corruption 预训练输入到输出的映射。[Transformer 论文](https://arxiv.org/abs/1706.03762) [T5 论文](https://arxiv.org/abs/1910.10683)

### 5.2 训练、推理与预训练

常见预训练目标包括去噪重构、连续 span corruption、翻译式跨语言目标等。BART 则系统组合输入噪声与自回归重构，说明同一种 encoder–decoder 骨架可以承载多种 corruption。[BART 论文](https://arxiv.org/abs/1910.13461)

训练时 encoder 和 teacher-forced decoder 都可在各自序列维并行；推理时 encoder 只需运行一次，decoder 仍逐 token 生成并缓存自身 KV，同时反复读取 encoder memory。若源长度为 $S$、目标长度为 $T$，朴素注意力的主要项约为

$$
O(S^2)+O(T^2)+O(ST),
$$

分别来自 encoder self-attention、decoder self-attention 和 cross-attention。它不能仅凭这条式子就断言一定比 decoder-only 快：实际速度还取决于层数分配、缓存布局、输入输出比例和硬件内核。

### 5.3 优点、局限和代表模型

**优点**

- 输入理解和输出生成分工明确，适合翻译、摘要、改写、结构化转换等条件生成。
- encoder 对源输入使用双向上下文，decoder 每一步都能读取完整源表示。
- 输入与输出可用不同长度、不同注意力掩码；理论上也可采用不同词表或模态编码器。

**局限**

- 两套栈和 cross-attention 使系统、缓存和并行策略更复杂。
- 开放式续写不如单流 decoder-only 自然；必须明确什么是源、什么是目标。
- decoder 推理仍是自回归的，encoder 并不能消除生成串行瓶颈。
- 参数预算如何在 encoder 与 decoder 间分配是额外设计变量。

代表模型包括原始 Transformer、T5、BART、mT5 和 UL2。T5 的[作者官方代码](https://github.com/google-research/text-to-text-transfer-transformer)实现了 text-to-text 训练框架。

## 6. 横向比较：不要只看模型名字

| 维度 | Encoder-only | Decoder-only | Encoder–Decoder |
|---|---|---|---|
| 当前 token 可见范围 | 输入内双向 | 当前 token 及其左侧 | 源端双向；目标端因果；目标可读完整源端 |
| 典型预训练 | MLM、替换 token 检测 | next-token prediction | 去噪重构、span corruption、条件生成 |
| 固定输入表征 | 强 | 需要专门池化/训练才更合适 | encoder 端强 |
| 开放式生成 | 非原生 | 最直接 | 可以，但必须有源输入接口 |
| 条件生成 | 需另接生成器 | 将条件和答案串成单流 | 原生分离条件与答案 |
| 训练序列并行 | 可以 | teacher forcing 下可以 | encoder 与 teacher-forced decoder 均可以 |
| 生成时序列并行 | 不涉及常规逐 token 生成 | 不可以完全并行 | decoder 不可以完全并行 |
| 主要部署状态 | 输入激活或最终向量 | 自注意力 KV cache | encoder memory + decoder KV cache |

这里的“强”是架构归纳偏置，不是无条件性能排名。数据、规模、训练目标和评测协议可能比三分法本身更重要。

## 7. 如何选型

### 优先 Encoder-only

- 输出是类别、分数、token 标签或稠密向量，而不是长文本；
- 需要低时延地批量编码固定文本；
- 需要检索、rerank、抽取或输入侧双向上下文；
- 模型将作为更大系统中的感知/表示模块。

### 优先 Decoder-only

- 产品核心是对话、续写、代码或统一的自由文本接口；
- 希望主要靠 prompt 和 in-context learning 扩展任务；
- 需要复用成熟的大模型训练、对齐和推理生态；
- 可以承担逐 token 解码的时延与 KV cache 成本。

### 优先 Encoder–Decoder

- 问题天然是“给定完整输入，产生另一个序列”，如翻译、摘要、纠错和转换；
- 希望输入端充分双向编码，并与输出端的因果生成隔离；
- 源输入会被多个候选输出复用；
- 系统能接受两套栈与 cross-attention 的额外复杂度。

## 8. 常见误区

1. **“Encoder-only 就是理解，Decoder-only 就是生成。”** 这是经验分工，不是能力定理。预训练目标和适配方式同样关键。
2. **“Decoder-only 在训练时也只能一个 token 一个 token 算。”** 错。因果 mask 阻止信息泄漏，但 teacher forcing 仍允许并行计算所有训练位置。
3. **“Decoder-only 包含原始 decoder 的 cross-attention。”** 通常错。没有独立 encoder memory 时，这个子层一般被移除。
4. **“Encoder–Decoder 一定比 Decoder-only 参数更多。”** 不成立。总参数量由宽度、深度和两栈分配决定。
5. **“架构决定一切。”** 同一骨架在数据质量、tokenizer、目标函数、规模和对齐方法不同时，表现可以相差很大。

## 参考资料与实现

- Vaswani et al., 2017, [Attention Is All You Need](https://arxiv.org/abs/1706.03762)。原始 encoder–decoder Transformer 与 MHA。
- Devlin et al., 2018/2019, [BERT](https://arxiv.org/abs/1810.04805)；[作者官方代码](https://github.com/google-research/bert)。
- Brown et al., 2020, [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)。Decoder-only 与 in-context learning 的代表性工作。
- Raffel et al., 2019/2020, [T5](https://arxiv.org/abs/1910.10683)；[作者官方代码](https://github.com/google-research/text-to-text-transfer-transformer)。
- Lewis et al., 2019/2020, [BART](https://arxiv.org/abs/1910.13461)。Encoder–decoder 去噪预训练。

## 我的思考

三分法最有价值的地方不是给模型贴标签，而是迫使我们回答三个工程问题：**输入是否需要双向融合、输出是否必须逐 token 生成、条件信息是否值得单独编码和复用**。如果这三个问题已经答清楚，架构选择往往也就不再神秘。
