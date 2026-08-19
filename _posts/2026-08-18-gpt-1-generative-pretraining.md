---
title: "文献笔记｜GPT-1：生成式预训练如何迁移到语言理解任务"
date: 2026-08-18
permalink: /posts/gpt-1-generative-pretraining/
tags: [literature-note, llm, gpt-1, generative-pretraining, transfer-learning]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：OpenAI 论文全文 12 页、OpenAI 官方研究页、作者官方代码/模型仓库；核对论文表 2–5、Figure 1–2 与仓库复现实验说明。<br>
> **检索日期**：2026-08-18<br>
> **主题**：单向 Transformer 语言模型的无标签预训练，能否通过极少结构改动迁移到多类监督 NLP 任务？

## 文献档案

- **论文**：*Improving Language Understanding by Generative Pre-Training*
- **正式页面**：[OpenAI 官方研究页](https://openai.com/index/language-unsupervised/)
- **PDF**：[OpenAI 官方全文](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- **代码 / 模型**：[openai/finetune-transformer-lm](https://github.com/openai/finetune-transformer-lm)（作者官方；当前已归档）
- **作者**：Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever
- **机构 / 年份**：OpenAI；2018
- **出版状态**：论文页脚标注 “Preprint. Work in progress.”，不是同行评审会议/期刊版本；未分配 DOI。
- **版本说明**：后世常称“GPT-1”，原论文标题和正文并未把模型编号为 GPT-1。官方仓库说明其 ROCStories 默认代码 10 次运行中位准确率为 85.8%，略低于论文单次 86.5%，这是重要的复现更正。

## 核心结论

这篇工作确立了早期 GPT 的两阶段范式：先在 BooksCorpus 上以 causal language modeling 学习通用表示，再把结构化监督任务改写为单一 token 序列，仅增加线性输出头并端到端微调。[原论文 §3](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)

论文在 12 个数据集中的 9 个报告当时最好结果；更关键的内部证据是表 5：去掉预训练后八项平均分从 74.7 降至 59.9，而同框架 LSTM 为 69.1。它支持“生成式预训练对这些任务有显著迁移价值”，但不能把全部提升归因于某一个组件：预训练数据、Transformer 架构、task-specific input transformation 与微调 recipe 同时变化。

## 检索记录

- **数据源**：OpenAI 官方研究页与 PDF、OpenAI 官方 GitHub 仓库。
- **检索式**：`site:openai.com Improving Language Understanding Generative Pre-Training`；`github openai finetune-transformer-lm`。
- **纳入原因**：GPT 路线的第一篇核心方法论文，首次系统展示 decoder-only Transformer 的“生成式预训练→判别式微调”。
- **排除**：未用 BERT 论文或后续综述倒推 GPT-1 方法；“GPT-1”仅作为后设简称。
- **全文状态**：论文、表图和仓库 README 均已读取；未重新训练 BooksCorpus 或 12 个下游任务。
- **更正审计**：无撤稿/正式勘误；记录官方代码对 ROCStories 可复现数值的说明。

## 研究背景

2018 年的迁移学习通常转移静态词向量（word2vec/GloVe）、上下文化特征，或在特定任务上搭建定制网络。问题有两层：无标签文本应使用什么目标学习可迁移的长程表示；复杂的结构化任务如何接入一个预训练语言模型而不重新设计大量参数。

GPT-1 的答案刻意简单：把语言建模作为统一预训练目标，把 premise–hypothesis、context–question–answer 等结构线性化为 token 序列，让同一个 masked Transformer decoder 处理所有任务。OpenAI 官方页将其定位为 Transformer 与 unsupervised pre-training 两个既有思想的结合，而非声称二者均由本文首创。[官方研究页](https://openai.com/index/language-unsupervised/)

## 研究问题

1. BooksCorpus 上的自回归语言模型预训练是否能稳定提升不同类型的监督语言理解任务？
2. 是否可以只通过输入序列重排和一个线性输出头，在分类、蕴含、相似度、问答中复用同一主干？
3. 提升来自预训练本身、Transformer 架构，还是微调阶段保留的辅助 LM 目标？
4. 无监督预训练过程中是否已经出现无需梯度更新的任务行为？

## 方法与数据

![GPT-1 两阶段训练与任务输入变换](/images/literature-notes/gpt-1-generative-pretraining/method-overview.png)

*图 1｜左：12-block masked Transformer 在预训练中预测下一 token、微调时接线性任务头；右：不同结构化任务被串成统一 token 序列。来源：原论文 Figure 1，官方 PDF 物理页 4。[原图](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)*

### 1. 无监督生成式预训练

对无标签 token 序列 $U=\{u_1,\ldots,u_n\}$，模型最大化固定上下文窗口内的对数似然：

$$
L_1(U)=\sum_i \log P(u_i\mid u_{i-k},\ldots,u_{i-1};\Theta).
$$

语言模型是 12 层 decoder-only Transformer：masked multi-head self-attention 保证每个位置只读取左侧上下文。其隐藏状态为

$$
h_0=UW_e+W_p,\qquad
h_l=\operatorname{TransformerBlock}(h_{l-1}),
$$

$$
P(u)=\operatorname{softmax}(h_nW_e^\top).
$$

模型使用 $d_{model}=768$、12 heads、FFN 内层 3072、learned positional embedding、GELU 和 40k-merge BPE。它不是原 Transformer 的完整 encoder–decoder，而是只保留 causal decoder stack。

### 2. 判别式微调与辅助目标

监督样本由 token 序列 $x_1,\ldots,x_m$ 和标签 $y$ 构成。最后 token 的顶层表示 $h_l^m$ 接线性分类器：

$$
P(y\mid x_1,\ldots,x_m)=\operatorname{softmax}(h_l^mW_y),
$$

$$
L_2(C)=\sum_{(x,y)}\log P(y\mid x_1,\ldots,x_m).
$$

部分实验在微调时联合优化

$$
L_3(C)=L_2(C)+\lambda L_1(C),\qquad \lambda=0.5,
$$

以维持语言建模能力并充当辅助正则。表 5 表明该辅助项并非普遍增益：八项平均分 w/o aux LM 为 75.0，略高于 full 的 74.7；它主要对较大 NLI/QQP 数据有帮助。

### 3. Task-aware input transformation

- **分类**：`<s> text <e>`，取末端表示分类。
- **蕴含**：`<s> premise $ hypothesis <e>`。
- **相似度**：分别编码 text1→text2 和 text2→text1，两表示相加后分类，以处理无序性。
- **多项选择**：对每个候选构造 `context $ question $ answer_k`，独立编码后在候选间 softmax。

它的意义是将任务结构放入输入，而不是给每个任务发明深层网络；但不同任务仍使用标签、任务数据与输出头，因此不是今天意义上的 zero-shot 统一接口。

### 4. 数据与训练

- **预训练数据**：BooksCorpus，超过 7000 本未出版书籍，约 5GB；选择理由是包含较长连续文本。
- **预训练**：512-token 连续序列、batch 64、100 epochs；Adam，峰值学习率 $2.5\times10^{-4}$，2000-step warmup 后 cosine decay；dropout 0.1，权重衰减 0.01。
- **微调**：多数任务 3 epochs、batch 32、学习率 $6.25\times10^{-5}$，0.2% warmup，linear decay。
- **计算**：OpenAI 官方页报告约 8×P600 训练 30 天、总计 0.96 PF-days；论文正文未给独立多次训练成本分布。[官方 compute 说明](https://openai.com/index/language-unsupervised/)

### 5. 推理

下游分类/选择任务不是自由文本生成：模型读取完整输入，用末端 hidden state 经线性头输出标签或候选分数。论文的 zero-shot probes 则直接比较预训练 LM 对人为设计 completion 的概率，不进行参数更新；二者不能混为一类实验。

## 实验

### 监督迁移

论文覆盖 NLI（SNLI、MultiNLI、QNLI、RTE、SciTail）、QA/commonsense（RACE、Story Cloze）、相似度（MRPC、QQP、STS-B）和分类（SST-2、CoLA）。代表结果包括：MultiNLI matched/mismatched 82.1/81.4，RACE 59.0，Story Cloze 86.5，CoLA 45.4，GLUE 72.8。[原论文 Tables 2–4](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)

“9/12 SOTA”是当时特定基线表上的完整 recipe 比较，不是每个组件的因果证据。RTE 为 56.0，低于 multi-task BiLSTM 的 61.7；MRPC 82.3 也低于所列 86.0，说明小数据或任务特性仍可使方法退化。

![GPT-1 预训练与架构消融](/images/literature-notes/gpt-1-generative-pretraining/ablation-results.png)

*图 2｜去掉预训练使八项平均分从 74.7 降到 59.9；相同框架换成单层 LSTM 为 69.1；去掉辅助 LM 后平均分反而为 75.0。来源：原论文 Table 5，官方 PDF 物理页 8。[原表](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)*

### 消融与零样本探针

- **预训练作用最强**：w/o pre-training 在八项上均退化，平均差 14.8 分。
- **Transformer vs LSTM**：同框架单层 2048-unit LSTM 平均低 5.6 分，但 MRPC 上 LSTM 更好；不能说 Transformer 对所有任务严格支配。
- **转移深度**：从仅 embedding 到转移更多层，MultiNLI/RACE 整体上升，支持中高层也携带可迁移信息。
- **zero-shot probes**：随着 LM 训练推进，CoLA、SST-2、RACE、pronoun resolution 的启发式分数总体提高；但这些手工 scoring rule 与标准任务接口不同，绝对性能也不等同于微调结果。

### 复现证据

官方仓库只直接实现论文的 ROCStories Cloze 流程，并明确说 GPU 算子导致非确定性；默认超参数 10 次中位数 85.8%，而论文报告单次 86.5%。因此 86.5 不能当作稳定均值，更不能声称官方代码完整复现全部 12 个任务。[官方仓库 README](https://github.com/openai/finetune-transformer-lm)

## 主要发现

1. **预训练不是轻微初始化收益。** 受控消融中去掉它导致广泛、显著退化。
2. **统一主干可跨任务复用。** 任务差异主要由输入线性化与浅输出头表达。
3. **辅助 LM 目标具有条件性。** 它帮助部分大数据任务，却非总体必需。
4. **生成目标在无监督阶段已诱发一些任务相关行为。** 但论文只提供启发式 probe，不能等同通用 zero-shot instruction following。
5. **单次最佳结果隐藏方差。** 官方代码对 Story Cloze 的中位结果低于论文单次值，提醒需要多 seed 报告。

## 结论

### 作者结论

作者认为，连续文本上的生成式预训练能学习世界知识和长程依赖，并有效迁移到问答、相似度、蕴含和分类；Transformer 与包含长程结构的数据是该范式的重要组合。

### 证据支持的较窄结论

在 BooksCorpus、12-layer causal Transformer 和所列 2018 年数据集上，两阶段训练明显优于无预训练，并以有限任务结构改动取得强结果。证据没有证明“无监督语言模型已经理解一切任务”，也没有隔离数据规模、模型结构与训练预算的全部交互。

## 局限与适用边界

### 作者明确报告的局限

- 预训练约需 8 GPU 一个月，较当时从头训练任务模型昂贵。
- 文本包含不完整/不准确信息与社会偏差；只从文本学习有世界知识边界。
- 模型仍有脆弱、反直觉的 out-of-distribution 和对抗泛化行为。
- RTE 等小数据集未达到最好结果；作者未探索 multi-task fine-tuning。

### 额外识别的局限

- BooksCorpus 的采集、授权和具体文档列表不足以让今天完整重建数据管线。
- 多数结果未给多 seed、置信区间或显著性；官方代码暴露了 Story Cloze 单次值的方差问题。
- 表 5 仅用八项而非全部 12 项，且“平均分”混合不同量纲指标，只适合作为粗略摘要。
- zero-shot probe 使用任务特定手工模板/阈值，模板敏感性未系统评估。
- 单向上下文限制 token 表示读取右侧证据；论文未与同规模双向预训练进行受控比较。
- 官方代码只覆盖一个主要结果且技术栈陈旧；不能据此声称端到端完全可复现。

## 与 GPT 路线的关系

GPT-1 的核心是“预训练后改权重”：每个下游任务仍需要监督微调。GPT-2 把重点推向无需权重更新的 zero-shot task conditioning；GPT-3 用 175B 规模系统化检验 in-context few-shot；InstructGPT 再用人类示范、偏好模型和 PPO 让 next-token 模型更符合用户指令。GPT-1 因而是从表示迁移走向通用生成式接口的第一块可复现实验基石。

## 我的思考

这篇论文最现代的部分不是模型规模，而是接口设计：尽量让不同任务共享同一计算图，把结构差异编码进 token 序列。今天的 prompt 其实把这一原则推进到极端——连任务头都用语言表达。但 GPT-1 的消融也提醒我们：自然语言接口的统一不等于评估分布的统一，小数据、模板和数据来源仍会决定成败。

若重新验证该结论，我会做三项补充：固定 token/compute 比较 causal 与 bidirectional objective；对所有任务报告多 seed；把 task transformation 模板作为实验因素，而非固定预处理。这样才能把“生成目标”“架构”和“提示格式”的贡献拆开。

## 参考文献

1. Radford, A., Narasimhan, K., Salimans, T., & Sutskever, I. (2018). *Improving Language Understanding by Generative Pre-Training*. OpenAI preprint. [官方页面](https://openai.com/index/language-unsupervised/) · [PDF](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf) · DOI：未分配。
2. OpenAI. *finetune-transformer-lm*. [官方代码与模型](https://github.com/openai/finetune-transformer-lm)（已归档；README 含 ROCStories 复现说明）。
