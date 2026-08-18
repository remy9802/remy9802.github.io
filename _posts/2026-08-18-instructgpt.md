---
title: "文献笔记｜InstructGPT：从人类示范、偏好模型到 PPO 的 RLHF 管线"
date: 2026-08-18
permalink: /posts/instructgpt/
tags: [literature-note, llm, instructgpt, rlhf, reward-model, ppo, alignment]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：NeurIPS 2022 正式正文 15 页、arXiv v1 完整版 68 页（含附录、标注说明和扩展实验）、OpenAI 官方研究页。<br>
> **检索日期**：2026-08-18<br>
> **主题**：如何把 GPT-3 的 next-token objective 转化为更符合特定用户/标注者意图的 instruction-following behavior？

## 文献档案

- **论文**：*Training Language Models to Follow Instructions with Human Feedback*
- **正式页面**：[NeurIPS 2022 Proceedings](https://papers.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html) · [OpenAI 官方介绍](https://openai.com/index/instruction-following/)
- **PDF**：[NeurIPS 正式正文](https://papers.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Paper-Conference.pdf) · [arXiv v1 完整版](https://arxiv.org/pdf/2203.02155)
- **代码 / 模型**：官方训练代码、reward model、权重与标注数据均未公开；没有用第三方 RLHF 实现冒充官方代码。
- **作者**：Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll L. Wainwright, Pamela Mishkin, Chong Zhang, Sandhini Agarwal, Katarina Slama, Alex Ray, John Schulman, Jacob Hilton, Fraser Kelton, Luke Miller, Maddie Simens, Amanda Askell, Peter Welinder, Paul F. Christiano, Jan Leike, Ryan Lowe
- **机构 / 年份**：OpenAI；Amanda Askell/Paul Christiano 的工作在 OpenAI 完成，论文脚注分别标注后续机构 Anthropic / Alignment Research Center；2022
- **出版状态**：NeurIPS 2022 同行评审会议论文；DOI：[10.52202/068431-2011](https://doi.org/10.52202/068431-2011)。
- **版本说明**：arXiv 仅 v1（2022-03-04），含完整附录；NeurIPS 正式版压缩为 15 页。OpenAI 官方页说明当时 API 部署的是使用同一反馈数据、但“相似而略有不同”方法训练的更新版本，因此论文模型与线上产品快照不能等同。

## 核心结论

InstructGPT 把语言模型后训练明确拆为三步：监督微调（SFT）学习示范、reward model（RM）学习成对偏好、PPO 在 KL 约束下优化策略，并混入 pretraining gradient 减轻“alignment tax”。[原论文 Figure 2 / §3](https://arxiv.org/pdf/2203.02155)

在 held-out API prompt 分布上，175B InstructGPT 相对 175B GPT-3 的人类偏好率为 \(85\pm3\%\)，相对 carefully prompted GPT-3 为 \(71\pm4\%\)；甚至 1.3B InstructGPT 在 Figure 1 中优于 175B GPT-3。这个结果证明少量高相关人类反馈可以比单纯扩大预训练模型更有效地改变交互行为。但它不是“普遍人类价值对齐”：反馈来自约 40 名筛选后的英语标注者、OpenAI 研究规范与特定 API 客户分布；偏见未改善，有害指令仍可能被执行。

## 检索记录

- **数据源**：NeurIPS 论文/DOI、arXiv 完整版、OpenAI 官方研究页。
- **检索式**：`Training language models to follow instructions human feedback NeurIPS 2022`；`InstructGPT official OpenAI methods limitations`；`10.52202/068431-2011`。
- **纳入原因**：奠定现代通用助手最具代表性的 SFT→RM→PPO RLHF 配方，并提供人类偏好、真实性、毒性、偏见与能力回退证据。
- **排除**：不把 ChatGPT 产品页、后续 PPO/GRPO/DPO 论文或开源复刻的训练细节回填到 InstructGPT。
- **全文状态**：正式正文、arXiv 附录、关键图表与 OpenAI 页面已核验；未获得官方代码/数据/权重，无法端到端复现。
- **版本 / 更正审计**：未发现撤稿；DOI 与 NeurIPS 记录一致。论文致谢记录 TruthfulQA 自动指标曾高估 PPO 增益，正式文本已以人工评价为主要证据。

## 研究背景

GPT-3 的预训练目标是预测互联网文本的下一 token，而用户期望助手遵从指令、诚实并避免伤害。两者并不等价：更大模型可以更流畅，却也可能生成虚假、有毒或不相关内容。论文把这种 objective mismatch 称为 misalignment，并以 helpful / honest / harmless 作为行为目标。

既有 instruction tuning（如 FLAN/T0）把公开 NLP 数据改写为指令；既有 RLHF 多聚焦 Atari、机器人或单一摘要任务。InstructGPT 的创新不是新发明 PPO，而是把人类反馈扩展到开放、异质的 API prompt 分布，并把后训练配方、偏好实验和边界一起系统化。

## 研究问题

1. 真实用户 prompt 上的示范与排序，能否让 GPT-3 更好遵循指令？
2. SFT、RM+PPO 各自贡献多少；1.3B 后训练模型能否超过 175B 纯预训练模型？
3. 改善人类偏好是否同时提高真实性、降低毒性，并避免公开 NLP 能力回退？
4. 学到的究竟是谁的偏好，能否推广到未参与训练的标注者、语言和任务？

## 方法与数据

![InstructGPT 三阶段 RLHF 训练流程](/images/literature-notes/instructgpt/rlhf-pipeline.png)

*图 1｜Step 1 用人类示范做 SFT；Step 2 对同一 prompt 的多个输出排序并训练 RM；Step 3 用 RM 标量奖励和 PPO 更新策略。来源：原论文 Figure 2，arXiv v1 物理页 3。[原图](https://arxiv.org/pdf/2203.02155)*

### 1. Prompt 与人类数据

训练 prompt 主要来自早期 InstructGPT 模型的 API Playground 用户，并加入标注者自写的 plain、few-shot、user-based prompt。作者按长公共前缀做启发式去重、每个 user ID 最多约 200 条，并从训练 split 过滤 PII。

三套数据用途不同：

| 数据 | 训练 prompt 规模 | 标签 | 用途 |
|---|---:|---|---|
| SFT | 约 13k | 标注者理想示范 | 最大似然微调 |
| RM | 约 33k | 同一 prompt 的输出排序 | 学习标量偏好奖励 |
| PPO | 约 31k | 无直接人类标签 | 策略 rollout / RLHF |

数据超过 96% 为英语。约 40 名标注者来自 Upwork/Scale AI，经敏感内容与研究者一致性筛选；训练标注者互相同意率 \(72.6\pm1.5\%\)，held-out 标注者为 \(77.3\pm1.3\%\)。多数比较因成本只由一人标注，分歧不会被完整观察。[原论文 §3.2–3.4](https://arxiv.org/pdf/2203.02155)

### 2. SFT：先模仿理想响应

以 1.3B、6B、175B GPT-3 为初始化，在 prompt–demonstration 上做 teacher-forced maximum likelihood。SFT 训练 16 epochs、cosine learning-rate decay、residual dropout 0.2。validation loss 在 1 epoch 后已过拟合，但继续训练仍改善 RM score 与人类偏好，因此 checkpoint 以 RM validation score 选取，而非最低 token loss。

这说明“语言建模 loss 最好”与“人认为回答最好”并不相同；也意味着 RM 已进入模型选择环节，后续偏好结果并非完全独立于 RM。

### 3. RM：从排序学习标量奖励

对每个 prompt，标注者排序 \(K=4\sim9\) 个模型 completion，由此产生 \(\binom K2\) 个成对偏好。RM 从 SFT 主干去掉 unembedding，输入 \((x,y)\) 输出标量 \(r_\theta(x,y)\)。损失为 Bradley–Terry / logistic 形式：

\[
\mathcal L_{RM}(\theta)
=-\frac{1}{\binom K2}
\mathbb E_{(x,y_w,y_l)\sim D}
\left[\log \sigma\bigl(r_\theta(x,y_w)-r_\theta(x,y_l)\bigr)\right].
\]

\(y_w\) 为偏好输出，\(y_l\) 为较差输出。高度相关的 pair 不被打散成独立数据，而把同一 prompt 的所有 pair 放入同一 batch element，避免一个 epoch 内重复使用同一 completion 导致过拟合。最终只使用 6B RM：175B RM 训练不稳定，且用作 PPO value function 成本更高。RL 前用 bias 把标注者示范的平均 reward 归零。

### 4. PPO 与 KL 约束

环境是单步 contextual bandit：采样 prompt \(x\)，策略 \(\pi_\phi^{RL}\) 生成 completion \(y\)，RM 给出终局奖励。除 PPO clipping/value learning 外，论文在每个 token 对 SFT reference 加 KL penalty，抑制策略远离人类示范分布和过度优化 RM。

纯 PPO 仍使若干公开 NLP benchmark 回退，于是 PPO-ptx 混入预训练梯度，目标可写为

\[
\begin{aligned}
J(\phi)=&\ \mathbb E_{(x,y)\sim D_{\pi_\phi^{RL}}}
\left[r_\theta(x,y)-\beta\log\frac{\pi_\phi^{RL}(y\mid x)}{\pi^{SFT}(y\mid x)}\right] \\
&+\gamma\,\mathbb E_{x\sim D_{pretrain}}\left[\log\pi_\phi^{RL}(x)\right].
\end{aligned}
\]

\(\beta\) 控制 reference KL，\(\gamma\) 控制 pretraining mix；PPO 中 \(\gamma=0\)，论文默认“InstructGPT”指 PPO-ptx。这里的 PPO 不是直接从人类实时反馈学习，而是优化一个已拟合且可能被 exploit 的 reward proxy。

### 5. 基线与评估

主要基线为原始 GPT-3、带一段人工搜索 few-shot prefix 的 GPT-3、SFT、PPO、PPO-ptx；另用约一百万例分别微调 175B GPT-3 得到 FLAN/T0 对照。主评价由人对 held-out customer prompts 的输出做排序、1–7 分与 metadata 标注；另测 TruthfulQA、RealToxicityPrompts、Winogender/CrowS-Pairs 及一组公开能力 benchmark。

## 实验

![InstructGPT 与 GPT-3 的人类偏好结果](/images/literature-notes/instructgpt/human-preference-results.png)

*图 2｜相对 175B SFT 的胜率显示：prompting、SFT、PPO 形成阶梯式改善；1.3B PPO-ptx 也高于 175B 原始 GPT-3。误差条为 95% CI。来源：原论文 Figure 1，arXiv v1 物理页 2。[原图](https://arxiv.org/pdf/2203.02155)*

### 人类偏好与规模

在 API prompt 测试分布中，175B InstructGPT 对同规模 GPT-3 的直接胜率为 \(85\pm3\%\)，对 carefully prompted GPT-3 为 \(71\pm4\%\)。Figure 1 还显示 1.3B PPO-ptx 胜过 175B GPT-3，支持“对齐数据可比 100× 参数差更影响交互偏好”。[原论文 §4.1](https://arxiv.org/pdf/2203.02155)

held-out labeler 对 InstructGPT 的偏好趋势与训练 labeler 相近；五折按标注者划分的 RM，在 held-out group 上偏好预测 accuracy 为 \(69.6\pm0.9\%\)，训练 group 为 \(72.4\pm0.4\%\)。这是对同一供应商/相近招募流程的泛化，不等于对全球用户价值的泛化。

### 真实性、幻觉与毒性

TruthfulQA 人工评价中，PPO 模型生成 truthful+informative 回答的比例相对 GPT-3 约翻倍；但 1.3B PPO-ptx 是例外，略差于同规模 GPT-3。API closed-domain tasks 的 hallucination rate 为 InstructGPT 21% vs GPT-3 41%。这些指标仍依赖标注定义，且“较少幻觉”不等于事实验证完备。

RealToxicityPrompts 中，加入“安全、尊重”指令时 InstructGPT 的 toxic outputs 约少 25%；没有 respectful prompt 时优势消失；明确要求毒性输出时，InstructGPT 反而比 GPT-3 更有毒。Winogender/CrowS-Pairs 指标没有显示 bias 改善，respectful instruction 在某设置还降低 entropy、表现为更强偏好。[原论文 §4.2](https://arxiv.org/pdf/2203.02155)

### Alignment tax 与 PPO-ptx

纯 PPO 在 SQuADv2、DROP、HellaSwag、WMT15 Fr→En 等任务退化。混入 pretraining updates 能恢复大部分损失，优于只增大 KL coefficient；但 PPO-ptx 在 DROP、SQuADv2 和翻译仍落后 GPT-3。故“minimal regressions”是总体描述，不是所有 benchmark 都无代价。

### API 数据 vs 公共 instruction tuning

175B InstructGPT 相对作者训练的 FLAN/T0 基线，人类偏好率为 \(78\pm4\%\) / \(79\pm4\%\)。论文解释为 API 分布中开放生成/brainstorming 约 57%，classification+QA 约 18%，公开 NLP mixture 与真实使用结构不匹配。这证明的是 **分布匹配的重要性**，不能证明 RLHF 天生优于所有 instruction tuning，因为训练数据量、来源、目标和 model selection 都不同。

### 计算成本

论文估计 175B SFT 为 4.9 PF-days、175B PPO-ptx 为 60 PF-days，而 GPT-3 预训练为 3640 PF-days。后训练相对预训练计算很小，但约 2 万小时人类反馈、数据基础设施和大量实验 run 不能被单一 FLOPs 数覆盖。[原论文 §5.1](https://arxiv.org/pdf/2203.02155)

## 主要发现

1. **行为质量不是参数量的单调函数。** 1.3B RLHF 模型可被偏好于 175B 纯预训练模型。
2. **三阶段各有作用。** 好 prompt、SFT、PPO 带来阶梯式偏好提升；PPO-ptx 主要修复能力回退。
3. **分布匹配决定偏好。** API-derived feedback 比公开 NLP mixture 更适合这组 API prompt。
4. **真实性/毒性改善是有条件的。** 幻觉和 respectful toxicity 改善，但 bias 未改善、有害指令下甚至更差。
5. **RLHF 对齐的是特定反馈过程。** 标注者、指南、研究机构和客户分布共同定义 reward，而非抽象、统一的“人类价值”。

## 结论

### 作者结论

作者认为，用人类反馈微调大模型是使其更符合用户意图的有效路径：InstructGPT 更受偏好、更真实、在特定条件下更少毒性，并能用 pretraining mix 降低能力税；但仍会犯简单错误，安全与对齐远未完成。

### 证据支持的较窄结论

在 2021–2022 年 OpenAI API prompt、约 40 名筛选标注者和 GPT-3 1.3B/6B/175B 上，SFT+RM+PPO-ptx 明显改善该评价群体的指令遵循偏好，并部分改善真实性。该证据不能推广为跨文化价值一致、事实可靠或对恶意请求安全。

## 局限与适用边界

### 作者明确报告的局限

- 标注者主要为美国/东南亚英语使用者，约 40 人，不代表所有受影响人群；标注者间也有约 27% 分歧。
- 大多数 comparison 只标一次，难以识别争议任务；平均偏好未必是合理社会选择。
- API 客户来自早期 waitlist，客户/终端用户/社会的利益可能不一致。
- 模型仍会编造事实、输出偏见/毒性/色情/暴力内容，并经常服从潜在有害指令。
- RLHF 可导致能力回退；PPO-ptx 也未完全消除。
- reward model 是代理目标，存在 over-optimization；175B RM 训练不稳定。

### 额外识别的局限

- 官方代码、权重、prompt 数据和 reward labels 不公开，关键胜率无法独立复现。
- 主评价与训练偏好共享标注规范/供应商，held-out labeler 不是真正跨文化外部验证。
- SFT checkpoint 由 RM score 选择，RM/PPO 与最终偏好评价存在同一规范的闭环，可能强化测量目标。
- 多数结果衡量短期输出偏好，不测长期对话、工具执行、现实后果或恶意自适应攻击。
- Helpful-first 的训练规则与 harmless evaluation 存在目标差异；毒性提示的反转结果正是该冲突的直接证据。
- 论文系统与同期 API 更新模型不同，不能把线上产品表现归因于这份公开 recipe。

## 与 GPT 路线的关系

GPT-1 通过监督标签适应任务；GPT-2/3 通过 prompt 与上下文示例临时适应。InstructGPT 把“默认行为”重新写入权重：SFT 教格式与基本意图，RM 压缩人类排序，PPO 让策略最大化该偏好，同时用 KL/pretraining mix 保住原能力。这一范式随后成为 ChatGPT 与多家 LLM 助手后训练的概念起点，但具体产品配方不能从本文直接推出。

## 我的思考

这篇论文最重要的负面结果是“respectful prompt 有效，但 harmful prompt 也更容易被遵循”。Instruction following 与 safety 不是同一轴：提高可控性会同时提高善意和恶意用户的控制力。安全后训练需要显式的指令优先级、拒绝策略和 adversarial evaluation，不能只最大化平均偏好。

另一个值得保留的设计思想是 PPO-ptx：行为对齐会遗忘基础能力，修复方法不是无限增加 KL，而是重新注入原分布的学习信号。它揭示多目标训练的本质——helpfulness、harmlessness、truthfulness 与 capability 不是一个 reward 标量天然能协调的，任何聚合都包含价值权衡和分布选择。

## 参考文献

1. Ouyang, L., et al. (2022). *Training Language Models to Follow Instructions with Human Feedback*. NeurIPS 35. [正式页面](https://papers.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html) · [正式正文](https://papers.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Paper-Conference.pdf) · [完整 arXiv](https://arxiv.org/abs/2203.02155) · [DOI](https://doi.org/10.52202/068431-2011)。
2. OpenAI. (2022). *Aligning Language Models to Follow Instructions*. [官方研究页](https://openai.com/index/instruction-following/)（含部署版本差异说明）。
