---
title: "文献笔记｜GPT-3：规模化如何催生上下文少样本学习"
date: 2026-08-18
permalink: /posts/gpt-3-few-shot-learners/
tags: [literature-note, llm, gpt-3, in-context-learning, few-shot, scaling]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：NeurIPS 2020 正式正文 25 页、官方 Supplementary 32 页、arXiv v4 完整版、OpenAI 官方伴随仓库与模型卡。<br>
> **检索日期**：2026-08-18<br>
> **主题**：在不更新权重的条件下，扩大自回归语言模型能否系统提升 zero-/one-/few-shot 的上下文任务适应能力？

## 文献档案

- **论文**：*Language Models are Few-Shot Learners*
- **正式页面**：[NeurIPS 2020 Proceedings](https://papers.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html)
- **PDF**：[NeurIPS 正文](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf) · [官方 Supplementary](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Supplemental.pdf) · [arXiv:2005.14165](https://arxiv.org/abs/2005.14165)
- **代码 / 模型**：训练代码和权重**未公开**；[openai/gpt-3](https://github.com/openai/gpt-3) 是作者官方伴随仓库，只含无条件样例、合成任务数据、语种统计、重叠样例和模型卡，不能冒充模型实现。
- **作者**：Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, Sandhini Agarwal, Ariel Herbert-Voss, Gretchen Krueger, Tom Henighan, Rewon Child, Aditya Ramesh, Daniel M. Ziegler, Jeffrey Wu, Clemens Winter, Christopher Hesse, Mark Chen, Eric Sigler, Mateusz Litwin, Scott Gray, Benjamin Chess, Jack Clark, Christopher Berner, Sam McCandlish, Alec Radford, Ilya Sutskever, Dario Amodei
- **机构 / 年份**：OpenAI；Jared Kaplan 同时标注 Johns Hopkins University；2020
- **出版状态**：NeurIPS 2020 同行评审会议论文；DOI：未分配/不可用（正式 proceedings 页面未列），arXiv 编号 2005.14165。
- **版本说明**：阅读 NeurIPS camera-ready + 官方补充材料；arXiv 完整版为 v4（2020-07-22）。未发现撤稿或正式勘误；论文主动披露 benchmark 过滤 bug，因训练成本过高未重训。

## 核心结论

GPT-3 最强的论文级结论是一个 **规模—上下文学习交互**：125M 到 175B 的八档自回归 LM 均只做 next-token pretraining；推理时以自然语言任务描述和 $K$ 个示例放入 2048-token context，不更新参数。zero-shot 通常随规模平滑改善，而 few-shot 相对提升往往更快，说明大模型更能利用上下文示范。[原论文 Figure 1.1 与 §2](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf)

这一结论不是“175B 已经普遍超过微调”：TriviaQA few-shot 71.2 很强，但 NaturalQuestions 29.9 低于闭卷 T5-11B+SSM 的 36.6；DROP 36.5 远低于微调 SOTA 89.1。模型还存在污染、提示敏感、重复、事实错误、偏见与巨大训练成本。GPT-3 证明 in-context learning 是可规模化现象，却没有解释它的内部算法或提供可独立复现的训练系统。

## 检索记录

- **数据源**：NeurIPS 正文/补充材料、arXiv、OpenAI 官方 GitHub 与模型卡。
- **检索式**：`Language Models are Few-Shot Learners NeurIPS 2020 official`；`GPT-3 supplementary training data contamination`；`openai gpt-3 official repository code`。
- **纳入原因**：把 GPT-2 的零样本观察扩展为 0/1/few-shot 统一协议，并在三数量级模型规模上系统测量。
- **排除**：不以 API 产品文档、第三方复现或后来的“GPT-3.5”描述补全论文未公开的实现。
- **全文状态**：正文、补充材料、关键图表、模型卡和仓库内容均核验；因权重/训练代码不可用，无法重复训练或逐 benchmark 复跑。
- **版本 / 更正审计**：论文承认 benchmark 去污染程序的 bug；PIQA/Winograd 被标星，多个高度污染 LM benchmark 被取消报告。未发现官方撤稿。

## 研究背景

GPT-2 已观察到无需梯度更新的 task conditioning，但大多数任务仍远低于监督 baseline，也没有严格区分 zero-shot、one-shot 与 few-shot。GPT-3 把研究问题从“预训练表示能否迁移”改为“固定权重模型能否把上下文当作临时训练集”。

论文给出一种双时间尺度解释：预训练梯度下降是慢速 outer loop，训练出一个能在前向激活中执行快速适应的系统；推理上下文中的示例是 inner-like learning，但没有参数更新。作者把它称为 meta-learning 的一种视角，而不是证明 Transformer 在内部执行了某个已知优化算法。[原论文 §1](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf)

## 研究问题

1. 扩大参数量是否持续改善 true zero-shot、one-shot 与 few-shot？
2. few-shot 相对 zero-shot 的增益是否随模型变大，构成规模化 in-context learning 证据？
3. 纯文本上下文适应在哪些任务接近微调，在哪些任务仍失败？
4. 网页级预训练的测试污染、偏见、合成文本滥用和计算成本如何限制结论？

## 方法与数据

### 1. 统一的 0/1/few-shot 协议

- **Zero-shot**：只给自然语言任务描述/调用，不给已标注示例。
- **One-shot**：给一个 input–output 示例。
- **Few-shot**：给 $K$ 个示例，通常 $K=10\sim100$，受 2048-token context 限制。
- **Fine-tuning**：更新模型权重；本文把它留给未来研究，不训练 GPT-3 的任务特定 FT 版本。

对每个测试样本，few-shot 示例从该任务训练集随机抽取并拼入上下文；没有训练集的 LAMBADA/StoryCloze 从 dev 抽示例、在 test 评估。自由生成任务多使用 beam size 4、length penalty 0.6。模型间虽无任务梯度更新，但 prompt 格式、示例抽样和答案规范化仍是实验协议的一部分。

### 2. 模型架构与预训练目标

GPT-3 最大化标准 causal likelihood：

$$
\mathcal L(\theta)=-\sum_t\log p_\theta(x_t\mid x_{<t}).
$$

架构沿用 GPT-2 的 decoder-only、Pre-LN、可逆 byte-level BPE 与 residual 初始化，但各层交替采用 dense attention 和 locally banded sparse attention。八档模型为 125M、350M、760M、1.3B、2.7B、6.7B、13B、175B。

最大模型配置：96 layers，$d_{model}=12288$，96 heads，每头 128 维，FFN 为 $4d_{model}$，batch 3.2M tokens，峰值学习率 $0.6\times10^{-4}$。所有模型 context 2048，并各训练 300B tokens。[arXiv Table 2.1](https://arxiv.org/pdf/2005.14165)

### 3. 数据构造

训练池由 filtered Common Crawl、WebText2、Books1、Books2 与英文 Wikipedia 构成。Common Crawl 原始 45TB 压缩文本，经质量分类器重采样后约 570GB/410B BPE tokens，再以 MinHashLSH 做模糊去重，平均减少约 10%。高质量语料被过采样：

| 数据源 | 可用 token | 训练采样权重 | 训练 300B token 时约遍历次数 |
|---|---:|---:|---:|
| filtered Common Crawl | 410B | 60% | 0.44 |
| WebText2 | 19B | 22% | 2.9 |
| Books1 | 12B | 8% | 1.9 |
| Books2 | 55B | 8% | 0.43 |
| Wikipedia | 3B | 3% | 3.4 |

权重因四舍五入合计约 101%。这张表说明“300B 训练 tokens”不是从 499B 池均匀跑一遍，而是人为偏向高质量数据的混合采样。[Supplementary Table C.1](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Supplemental.pdf)

### 4. 优化与计算

Adam 使用 $\beta_1=0.9,\beta_2=0.95,\varepsilon=10^{-8}$，global gradient norm clip 1.0，weight decay 0.1；前 375M tokens 线性 warmup，至 260B tokens cosine decay 到初始学习率的 10%，之后保持。batch 从 32k tokens 在最初 4–12B tokens 逐渐增至目标值。短文档打包到 2048-token 序列，以 end-of-text 分隔而不加额外文档 mask。

补充材料估计 175B 训练为 $3.14\times10^{23}$ FLOPs，约 3640 PF-days；这是按每 token/参数近似计算，不是实测全系统能耗。论文只说在 V100 高带宽集群上进行宽度与深度并行，没有公开完整集群规模、效率、训练代码或 checkpoint。

### 5. 训练—推理边界

few-shot 推理没有反向传播：示例只改变当前 sequence activations 和条件分布。移除示例后，模型权重不保留此次任务；context 长度限制示例数量。因而 in-context learning 是条件推断/临时适应，不是通常意义的参数微调，也不意味着数据不进入模型输入。

## 实验

![GPT-3 随规模与上下文示例数增长的性能](/images/literature-notes/gpt-3-few-shot-learners/in-context-scaling.png)

*图 1｜左/中为 SuperGLUE 随参数量与 $K$ 变化，右为 42 个 accuracy benchmark 的聚合曲线；few-shot 与 zero-shot 的差距总体随规模扩大。注意 GPT-3 为 dev、虚线基线多为 test，不能直接作严格同协议 SOTA 比较。来源：原论文 Figure 1.1，NeurIPS 正文物理页 2。[原图](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf)*

### 上下文学习与规模

Figure 1.1 是最直接的跨规模证据：0.1B 到 175B 的 zero-/one-/few-shot 聚合性能大体上升，few-shot 曲线斜率更明显。中图还显示示例数从 1 到约 8 时 SuperGLUE 快速改善，之后收益趋缓。该图支持关联和交互趋势，但不是 compute-matched 因果实验：参数、层宽、训练 FLOPs与并行策略同时改变。

### Cloze 与 QA/RC

LAMBADA few-shot accuracy 86.4%，高于表中前 SOTA 68.0；zero-shot 为 76.2，one-shot 反而降至 72.5，说明单例格式有时会误导模型。论文确认 LAMBADA 存在大量真实污染，但 clean subset 与全量差异小于 0.5 个百分点；这个检查减弱而未消除污染疑虑。

![GPT-3 在开放域 QA 与阅读理解上的成功和失败](/images/literature-notes/gpt-3-few-shot-learners/qa-results.png)

*图 2｜TriviaQA few-shot 达 71.2；NaturalQS 仅 29.9。CoQA 从 zero-shot 81.5 升到 few-shot 85.0，但 DROP 仅 36.5，远低于微调 SOTA 89.1。来源：原论文 Tables 3.2–3.3，NeurIPS 正文物理页 5。[原表](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf)*

这些结果揭示任务依赖性：闭卷 TriviaQA 中 GPT-3 few-shot 71.2，超过表中 RAG open-domain 68.0；但更细粒度 Wikipedia 知识的 NaturalQS 为 29.9，低于 T5-11B+SSM 36.6。ARC-Challenge few-shot 51.5 低于 zero-/one-shot，DROP 的数值推理差距尤其大。不能用 TriviaQA 的成功代表普遍 QA。

### 生成、算术与社会影响

论文在若干合成任务上观察到能力随规模出现非线性改善，但 3 位以上算术、逆序/重排等仍不可靠；这提示“涌现”也受 tokenization、任务格式与测量尺度影响。

新闻生成实验让约 80 名美国参与者区分约 200 词的人类/模型文章。175B 输出的平均识别准确率 52%，95% CI 49–54%，接近随机；故流畅合成文本可能降低人工检测能力。但标题、上下文、样本选择和短文体限定了外推，且“难检测”不等于事实正确：作者指出事实错误、重复、non sequitur 仍是线索。[原论文 Table 7.3](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf)

### 污染审计

作者尝试在训练前用 benchmark 13-gram 去污染，但一个 bug 使长文档只被部分清除；因训练成本无法重训。训练后构造 clean subset：PIQA clean 下降约 3 个百分点、Winograd 下降 2.6%，均被标星；四个 Wikipedia LM benchmark 和 CBT 几乎完全包含于训练集，因此不报告。LAMBADA 虽有真实污染，clean 差异很小。[Supplementary Appendix C](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Supplemental.pdf)

该分析的证据边界也被作者说明：clean subset 可能发生难度分布偏移，污染收益可能与子集偏差相抵；13-gram 也无法涵盖所有语义泄漏。

## 主要发现

1. **in-context learning 随规模显著增强。** 这是跨八档模型、多个任务的重复趋势，而非单一演示。
2. **少样本不是稳定优于零样本。** LAMBADA one-shot、ARC-Challenge few-shot 等存在反例；示例格式和抽样可能伤害结果。
3. **任务差异极大。** TriviaQA/CoQA 较强，DROP/NaturalQS 明显落后；“通用”应理解为接口宽，而非每项可靠。
4. **数据治理是方法的一部分。** 质量重采样、过采样和去重直接定义模型看到的世界；过滤 bug 可改变 benchmark 可信度。
5. **规模有真实成本。** 175B 的估算训练计算约 3640 PF-days，而权重/代码未公开，使独立验证非常困难。

## 结论

### 作者结论

作者认为，扩大语言模型显著改善 task-agnostic few-shot performance；只用文本交互即可指定任务和示例，某些任务达到或超过微调系统。论文将这种能力解释为预训练产生的 meta-learning，并讨论滥用、偏见和能耗。

### 证据支持的较窄结论

在所用数据、模型族、2048-token prompt 和 benchmark 下，规模与 0/1/few-shot 表现普遍正相关，且大模型更善于利用上下文示例。证据没有建立参数规模是唯一原因，也没有证明该能力跨任务稳定、事实可靠或可安全部署。

## 局限与适用边界

### 作者明确报告的局限

- 多项任务仍远低于微调系统，特别是文本综合、双向信息需求和复杂推理。
- 自回归采样会重复、失去长文一致性、产生矛盾和 non sequitur。
- 模型缺少真实世界/多模态 grounding，主要训练于英文互联网文本。
- benchmark contamination 无法彻底排除；过滤 bug 使部分训练数据未按计划清除。
- 训练昂贵、能耗高；模型行为可解释性和可预测性有限。
- 数据继承并放大性别、种族、宗教等偏见，生成能力有虚假信息滥用风险。

### 额外识别的局限

- 权重、训练代码、完整训练文档清单与基础设施未公开，核心结论无法进行同模型独立复现。
- scaling 对照不是固定训练 FLOPs、固定 token 或固定优化超参的实验，不能单独归因于参数数量。
- 2048-token context 限制 few-shot 数量，长输入任务实际可用示例更少。
- prompt 和示例随机抽样的方差没有在所有任务系统报告；单一格式可能放大/压低结果。
- 多项外部 SOTA 比较跨 dev/test、闭卷/开卷或不同训练数据，完整系统排名不等同同协议因果对照。
- 聚合 42 个 accuracy 指标掩盖失败任务；平均曲线不能替代逐任务可靠性。

## 与 GPT 路线的关系

GPT-1 的适应发生在权重中，GPT-2 展示零样本 task cue，GPT-3 将适应进一步放进 context 并用规模放大。下一步 InstructGPT 不再只问“模型能否做”，而问“默认是否按用户意图做”：用 SFT、reward model 与 PPO 改变行为。GPT-4 则延续规模和后训练，但不披露架构/数据，研究重心从可复现 recipe 转向能力、安全与预测性报告。

## 我的思考

GPT-3 的真正转折不是 175B 这个数字，而是把“任务学习”从训练 API 移到文本 API。它让同一模型无需保存新 checkpoint 就能临时执行任务，也让实验更容易被 prompt 选择污染。因此，评价 in-context learning 应同时报告模型、示例采样分布、顺序、模板、context 占用与多次重复。

论文对污染 bug 的披露值得保留：它没有让全部结果失效，但改变了若干 benchmark 的证据等级。训练成本高到无法修复本身也是科学结论——前沿规模会削弱可纠错性。今后的模型应在训练前冻结去污染协议，并保留可审计数据 provenance，而不能只在成绩出来后补做 n-gram 检查。

## 参考文献

1. Brown, T. B., et al. (2020). *Language Models are Few-Shot Learners*. NeurIPS 33. [正式页面](https://papers.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html) · [正文](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf) · [补充材料](https://papers.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Supplemental.pdf) · DOI：未分配/不可用（正式 proceedings 未列）。
2. OpenAI. *GPT-3: Language Models are Few-Shot Learners*. [官方伴随仓库](https://github.com/openai/gpt-3)（样例/数据/模型卡；非训练代码）。
