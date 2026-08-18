---
title: "文献笔记｜GPT-2：语言模型为何会显现零样本多任务能力"
date: 2026-08-18
permalink: /posts/gpt-2-unsupervised-multitask-learners/
tags: [literature-note, llm, gpt-2, zero-shot, webtext, scaling]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：OpenAI 技术报告全文 24 页（含污染分析与生成样例附录）、官方发布页、官方代码/权重仓库及模型卡。<br>
> **检索日期**：2026-08-18<br>
> **主题**：仅以大规模网页文本做 next-token prediction，模型是否会从自然文本中的任务示范自行学会零样本任务迁移？

## 文献档案

- **论文**：*Language Models are Unsupervised Multitask Learners*
- **正式页面**：[OpenAI 官方发布页](https://openai.com/index/better-language-models/)
- **PDF**：[OpenAI 官方全文](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- **代码 / 模型**：[openai/gpt-2](https://github.com/openai/gpt-2)（官方代码与四档权重；仓库于 2026-04-08 归档）
- **作者**：Alec Radford, Jeffrey Wu, Rewon Child, David Luan, Dario Amodei, Ilya Sutskever
- **机构 / 年份**：OpenAI；2019
- **出版状态**：OpenAI 技术报告，未见同行评审会议/期刊版本；未分配 DOI。PDF metadata 中的 ICML 字样不能当作出版记录。
- **版本说明**：论文 Table 2 使用约 117M/345M/762M/1542M 参数；官方仓库后来明确承认原参数计数有误，当前模型目录为 124M/355M/774M/1558M。本文保留“论文报告值”和“官方更正值”两套口径，不混写。

## 核心结论

GPT-2 把 GPT-1 的“预训练后逐任务微调”推进为“同一个语言模型，在推理时仅通过文本前缀触发任务”。作者从 Reddit 高赞外链构造 40GB WebText，训练最大约 1.5B 的 decoder-only Transformer，并观察到多个零样本任务随模型规模改善。[原论文 §2–3](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)

证据最稳健地支持：大容量自回归 LM 能从多样网页中学习可被自然语言上下文调用的若干任务行为，且规模在所测范围内通常改善结果。它不支持“无监督多任务学习已经解决 NLP”：摘要生成仅略高于随机抽句、Natural Questions exact match 仅 4.1%、多数开放任务仍远低于监督系统；WebText 与测试集存在可测重叠，结果还依赖 task hint、解码和人工格式规则。

## 检索记录

- **数据源**：OpenAI 官方发布页与 PDF、OpenAI 官方 GitHub、仓库 model card / developer instructions。
- **检索式**：`site:openai.com better language models GPT-2`；`site:github.com/openai/gpt-2 official`；`GPT-2 original parameter counts wrong`。
- **纳入原因**：首次在同一大规模生成式 LM 上系统评估跨任务 zero-shot transfer，并引出规模与 in-context task induction 路线。
- **排除**：不使用第三方 GPT-2 架构图或后续复现填补论文未报告的优化器、训练步数和算力。
- **全文状态**：正文、污染分析、附录样例和官方仓库均核验；未重新抓取 WebText 或运行完整 benchmark。
- **更正审计**：无撤稿；官方仓库记录参数计数更正。代码/模型现为只读归档，但仍是作者发布物。

## 研究背景

GPT-1 已证明大规模无标签预训练能提升监督任务，却仍为每个任务准备标签、微调权重和输出头。GPT-2 提出更激进的假设：互联网文本本身包含大量“自然发生的示范”，例如问题后跟答案、英文后跟法文、文章后跟摘要。若模型充分优化网页文本分布

\[
p(x)=\prod_{i=1}^{n}p(s_i\mid s_1,\ldots,s_{i-1}),
\]

那么为了更好预测文本，它可能隐式学习 \(p(\text{output}\mid\text{input},\text{task})\)。任务通过语言上下文指定，而不必设计新网络。[原论文 §1–2](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)

“unsupervised multitask learner”因此是一个经验性解释：训练目标仍只有 next-token likelihood，并没有显式任务标签；多任务结构来自语料中的隐式规律。它不是说训练数据无人创造或无偏，也不是今天严格意义的自监督/无监督术语裁决。

## 研究问题

1. WebText 上的单一 LM 是否能零样本完成语言建模、阅读理解、翻译、摘要和问答？
2. 从约一亿到约十五亿参数，任务表现是否随规模一致上升？
3. 字节级 BPE 与更深的 pre-normalized Transformer 如何支持跨域输入？
4. 测试成绩有多少可能来自训练—测试文本重叠或任务格式技巧？

## 方法与数据

### 1. WebText：以人类链接行为作质量过滤

作者抓取 Reddit 上至少获得 3 karma 的外链，将其视为网页质量的弱人工筛选。原始约 4500 万链接，经去重和启发式清洗形成略多于 800 万文档、40GB 文本；只保留 2017 年 12 月之前的链接，并移除 Wikipedia 文档以减轻与常见测试集的重叠。[原论文 §2.1](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)

这种数据选择提高可读性，却把 Reddit 用户、投票机制和链接生态的偏好带入分布。论文没有公开完整 WebText，官方后来发布的是用于研究输出行为的资源，不等于可原样重建训练集。

### 2. 可逆 byte-level BPE

纯字节模型能表示任意 UTF-8 字符串但序列较长；传统 BPE 常在 Unicode code point 上运行并产生 OOV/预处理依赖。GPT-2 从 256 个字节出发，限制 merge 跨越字符类别（空格为例外），形成 50,257 词表。这样任意 Unicode 字符串都有概率，benchmark 也可用可逆 detokenizer 还原其规范化差异。

可逆并不代表多语言均衡：WebText 主体是英文，输入覆盖性与语义覆盖性是两回事。

### 3. 模型结构

GPT-2 仍是 causal decoder-only Transformer，最大化前缀条件下下一 token 的对数似然。相对 GPT-1 的主要结构/训练改动包括：

- LayerNorm 移到每个 sub-block 输入侧，即后续常说的 Pre-LN；最终 self-attention block 后再加一个 LayerNorm。
- residual 分支初始化按层数以 \(1/\sqrt{N}\) 缩放。
- context 从 512 增至 1024 token；batch size 512。
- 四档模型从 12 层、\(d_{model}=768\) 扩至 48 层、\(d_{model}=1600\)。

论文没有报告完整 optimizer、学习率 schedule、训练 token 数、训练 steps、硬件或总 FLOPs；这些空白不能用第三方实践补成“原论文方法”。

### 4. 零样本任务接口

模型参数不针对 benchmark 更新，但每个任务仍需人为规定上下文和评分：

- **CoQA**：输入文档、对话历史与 `A:`，greedy decode 答案。
- **摘要**：文章后加 `TL;DR:`，top-\(k=2\) 采样 100 token，取前三句。
- **翻译**：上下文放若干 `English sentence = French sentence` 示例，再生成等号右侧。
- **问答**：用示例建立短答案格式，再对生成答案做 exact match。
- **cloze / Winograd**：比较候选 continuation 的 LM 概率。

所以“zero-shot”指 **不做梯度更新/不使用任务训练集优化模型**，并非没有 task prompt、示例格式、启发式约束或开发者选择。

## 实验

![GPT-2 零样本任务随规模变化](/images/literature-notes/gpt-2-unsupervised-multitask-learners/scaling-zero-shot.png)

*图 1｜阅读理解、翻译、摘要和开放问答大体随模型规模改善；但多条曲线仍明显低于监督系统，摘要很早趋于平台。来源：原论文 Figure 1，官方 PDF 物理页 2。[原图](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)*

### 语言建模与 cloze

![GPT-2 八个语言建模数据集的零样本结果](/images/literature-notes/gpt-2-unsupervised-multitask-learners/zero-shot-results.png)

*图 2｜论文口径的 1542M 模型在 8 个测试集中的 7 个达到表中最好结果；1BW PPL 42.16，明显差于 21.8。参数标签是论文原始计数，官方仓库已更正。来源：原论文 Table 3，官方 PDF 物理页 5。[原表](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)*

LAMBADA 上，论文表格给出 PPL 8.63、accuracy 63.24%。但正文说明：无 stop-word 终词约束时 accuracy 为 52.66%；63.24% 使用了任务特定 stop-word filter。该过滤利用“答案必须是句末词”的规则，因此不能把 63.24 当作完全无约束生成结果。

CBT common nouns / named entities 为 93.3% / 89.1%；作者因发现一本 CBT 测试书出现在 WebText，改报无明显重叠的 validation set。Winograd 为 70.70%，但数据只有 273 例，论文主动提醒谨慎解释。

### 阅读理解、摘要、翻译与开放问答

- **CoQA**：55 F1，不用该任务 127k+ 人工训练问答，达到/超过 4 个监督 baseline 中的 3 个；但仍低于约 89 F1 的 BERT 系统，且常用文档中实体检索启发式。
- **摘要**：有 `TL;DR:` 时 ROUGE average 21.40，只略高于随机三句 20.98，显著低于 bottom-up summarization 32.75；去掉 hint 降到 15.03。它证明可触发“像摘要”的行为，不证明实用摘要质量。
- **翻译**：WMT14 En→Fr 5 BLEU、Fr→En 11.5 BLEU，远低于当时强无监督 MT 的 33.5；英文强 LM 对 Fr→En 更有利。
- **Natural Questions**：exact match 4.1%，约是简单 question-type baseline 的 5.3 倍，但远低于带检索系统 30–50% 的范围。只看最有信心的 1% 问题时准确率 63.1%，提示概率校准有选择性用途，却不代表总体可靠。

### 规模证据

四档模型在多条曲线大体单调上升，支持容量是触发任务行为的重要条件；但论文同时说最大模型仍欠拟合 WebText。没有固定总 FLOPs 的 compute-matched 对照，因此不能区分“参数更多”“训练计算更多”与其他超参数调整的独立贡献。

### 污染分析

作者以归一化 8-gram Bloom filter 检查重叠。常见 LM 测试集与 WebText 的平均 8-gram overlap 为 3.2%；CoQA news domain 约 15% 文档出现在 WebText，对该域约带来 3 F1、对总体约 0.5–1.0 F1；LAMBADA 去掉任何 overlap 后 PPL 从 8.6 到 8.7、accuracy 从 63.2% 到 62.9%。[原论文 §4](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)

这是一项早期重要审计，但 n-gram 不能识别释义、答案泄漏或语义等价，且分析在训练后完成。结论应是“检测到的重叠对所测总体数值影响较小而一致”，不是“完全没有污染”。

## 主要发现

1. **自然网页中的示范可被 LM 部分吸收。** 只改变文本上下文即可调用若干任务行为。
2. **规模与零样本迁移正相关，但非万能。** 四档模型多数曲线上升；摘要、翻译与开放问答仍很弱。
3. **prompt 是实验处理的一部分。** `TL;DR:` 可带来 6.4 ROUGE-average 差异，说明任务触发方式会改变结论。
4. **统一生成接口暴露了生成式误差。** 摘要会混淆数字和细节，问答常靠实体启发式；流畅不等于正确。
5. **数据重叠必须显式审计。** 论文不仅报告 overlap，还在 CBT 上改用 validation set，建立了大规模网页预训练的早期污染分析范式。

## 结论

### 作者结论

作者认为，高容量 LM 在足够多样的文本上最大化似然后，会逐渐学到自然发生的任务结构，并在无需显式监督/微调的情况下完成多种任务；扩大模型和数据是有前景的通用系统路径。

### 证据支持的较窄结论

在 WebText 和最大约 1.5B 模型上，多项零样本指标明显高于小模型/简单 baseline，部分语言建模 benchmark 达到当时最好结果。可用性在不同任务间高度不均，且结果由语料覆盖、task cue、约束与数据重叠共同决定。

## 局限与适用边界

### 作者明确报告的局限

- 最大模型仍欠拟合 WebText，尚不知道充分训练后的能力上限。
- 摘要只有初级水平，许多实用任务可能不优于随机；翻译/问答远低于强系统。
- 生成会连贯却事实错误、偏置或含有细微不一致；官方模型卡要求高风险场景谨慎评估。
- 网页训练集与 benchmark 有重叠，n-gram 方法只能做有限审计。
- 单向表示在部分任务可能低效；论文未研究微调后的性能上限。

### 额外识别的局限

- 完整训练超参数、算力和 WebText 原始数据未发布，论文级再现受限；代码/权重只支持模型使用，不等于完整训练复现。
- 参数计数后来被官方更正，显示当时模型记录本身也有工程误差。
- “7/8 SOTA”集中于 LM 数据集，不能概括所有所测 NLP 任务。
- 每个 zero-shot task 使用不同 prompting、scoring 和解码；没有系统的 prompt sensitivity / 多模板方差。
- Reddit 高赞链接是强选择机制，放大英语、联网人口与平台社群偏好；“人类筛选”不是中立质量标签。
- 结果通常未给多 seed 或置信区间，跨模型曲线也同时改变参数、深度与宽度。

## 与 GPT 路线的关系

GPT-1 证明“预训练→微调”；GPT-2 证明“只改上下文也可能迁移”，并把规模作为关键变量。GPT-3 随后把 0/1/few-shot 定义标准化、规模扩到 175B，并系统展示 in-context learning 随规模加速。InstructGPT 则承认自然网页目标与用户意图不一致，用示范、偏好模型和 PPO 对 GPT-3 做行为对齐。

## 我的思考

GPT-2 最有价值的不是“零样本已经很强”，而是它同时展示成功曲线和失败曲线。Figure 1 中摘要早早平台、开放 QA 虽相对增长却绝对很低，这比单一 SOTA 表更准确地说明 scaling：扩大容量可以让隐式技能出现，但任务覆盖和可靠性不会自动统一。

论文还提示应把 prompt 当作实验变量。今天比较 LLM 时，至少应报告多模板、解码、上下文示例抽样、污染规则和不确定性；否则所谓模型差异可能只是接口差异。对历史 GPT-2 数值，参数计数更正也应留在笔记里，而不是用新版模型名静默覆盖原表。

## 参考文献

1. Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & Sutskever, I. (2019). *Language Models are Unsupervised Multitask Learners*. OpenAI technical report. [官方页面](https://openai.com/index/better-language-models/) · [PDF](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) · DOI：未分配。
2. OpenAI. *gpt-2*. [官方代码、模型与模型卡](https://github.com/openai/gpt-2)（已归档；含参数计数更正）。
