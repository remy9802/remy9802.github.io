---
title: "文献笔记｜Qwen Technical Report：中文友好的预训练、RLHF 与工具智能体起点"
date: 2026-08-18
permalink: /posts/qwen-technical-report/
tags: [literature-note, llm, qwen, multilingual-llm, rlhf, agent]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：arXiv v1 全文 59 页，包括预训练、SFT、奖励模型、PPO、Code-Qwen、Math-Qwen、工具调用与附录案例；同时核查官方仓库和模型卡。
>
> **检索日期**：2026-08-18。
>
> **主题**：第一代 Qwen 如何把中英双语基座、偏好对齐、代码/数学专门化和工具调用组织成一条模型家族路线？

## 文献档案

- **论文**：*Qwen Technical Report*
- **文献链接**：[arXiv:2309.16609](https://arxiv.org/abs/2309.16609) · [PDF](https://arxiv.org/pdf/2309.16609)
- **代码链接**：[QwenLM/Qwen 官方仓库](https://github.com/QwenLM/Qwen) · [Qwen-14B 官方模型与实现文件](https://huggingface.co/Qwen/Qwen-14B/tree/main)
- **作者**：Jinze Bai, Shuai Bai, Yunfei Chu, Zeyu Cui, Kai Dang, Xiaodong Deng, Yang Fan, Wenbin Ge, Yu Han, Fei Huang, Binyuan Hui, Luo Ji, Mei Li, Junyang Lin, Runji Lin, Dayiheng Liu, Gao Liu, Chengqiang Lu, Keming Lu, Jianxin Ma, Rui Men, Xingzhang Ren, Xuancheng Ren, Chuanqi Tan, Sinan Tan, Jianhong Tu, Peng Wang, Shijie Wang, Wei Wang, Shengguang Wu, Benfeng Xu, Jin Xu, An Yang, Hao Yang, Jian Yang, Shusheng Yang, Yang Yao, Bowen Yu, Hongyi Yuan, Zheng Yuan, Jianwei Zhang, Xingxuan Zhang, Yichang Zhang, Zhenru Zhang, Chang Zhou, Jingren Zhou, Xiaohuan Zhou, Tianhang Zhu。
- **机构 / 年份**：Qwen Team, Alibaba Group；2023。作者按姓氏字母顺序排列，而非贡献顺序。
- **出版状态**：arXiv 技术报告（2023-09-28，v1），未报告正式会议或期刊版本。`10.48550/arXiv.2309.16609` 为 arXiv 仓储 DOI。
- **版本说明**：本文只讨论第一代 Qwen 报告；Qwen2/2.5/3 的架构、数据或许可证变化不倒推到本版本。

## 核心结论

第一代 Qwen 的贡献是把四条当时常被分开讨论的路线接成一个模型谱系：最高 3T token 的中英文本/代码预训练；ChatML 格式的 SFT；偏好模型预训练、奖励模型与 PPO；以及从同一基座继续训练出的代码、数学和工具智能体变体（原文图 1、§2–5）。

论文最强的公开证据是：Qwen-14B base 在报告的 7 个通用基准上均高于表中既有 13B 级基座；Qwen-14B-Chat 在中英评测、代码和工具调用上形成了较完整的能力面。但它没有给出可复现的数据混合、总训练算力或对架构组件的受控消融，因此“完整 recipe 有效”与“某个组件导致提升”必须分开。

## 检索记录

- **数据源**：arXiv 元数据与 PDF、Qwen 官方 GitHub、官方 Hugging Face 模型仓库。
- **检索式**：`Qwen Technical Report 2309.16609 official repository model card`；`site:github.com/QwenLM/Qwen Qwen official`。
- **纳入原因**：Qwen 家族首篇总报告，明确记录预训练、RLHF、专门模型和 agent 起点。
- **排除**：Qwen-VL 只按谱系关系提及，其视觉方法不纳入；后续 Qwen1.5/2 不用于填补本报告缺失参数。
- **全文状态**：59 页全文、5 幅图、主要表格与附录均阅读；官方仓库用于核验代码/权重可用性。
- **版本 / 更正审计**：arXiv 仅 v1；未见正式 venue、更正或撤稿。

## 研究背景

2023 年开放 LLM 的核心矛盾不只是“有没有权重”，还包括中文 token 化成本、双语数据质量、对话对齐和应用层工具调用。LLaMA 提供了高效开放基座的骨架，但其数据和 tokenizer 以英语为主；ChatGPT 展示了 RLHF 后的交互体验，却不公开训练配方。Qwen 试图填补中间地带：在开发者可部署的 1.8B/7B/14B 尺度上，同时提供 base、chat 与领域变体。

这也决定了论文不是单一算法论文，而是一份“系统族报告”。它同时声称预训练强、对齐有效、代码/数学专门化有收益、agent 可以调用工具，因此阅读时必须给每种主张找到各自的实验块，不能用某一张总榜代替全部证据。

## 研究问题

1. 面向中英、代码和多语言场景，怎样设计 tokenization、数据过滤和基座结构？
2. SFT、preference model pretraining、reward model 与 PPO 能否把基座转成更受人偏好的助手？
3. 从通用基座继续训练代码/数学数据，是否比只依赖通用模型更有效？
4. chat 模型能否稳定按 ReAct 格式选择工具、执行代码并依据环境结果继续规划？

## 方法与数据

![第一代 Qwen 模型谱系](/images/literature-notes/qwen-technical-report/method-overview.png)

*图 1｜Qwen base 经 SFT/RLHF 形成 chat 模型，并继续分化出代码、数学和视觉语言模型；图中箭头表达训练继承关系，不代表每条路线都有同强度消融。来源：原论文图 1，PDF 物理页 3。[原文](https://arxiv.org/pdf/2309.16609)*

### 1. 预训练数据与去污染

语料包含公开网页、百科、书籍与代码，显著偏重英语和中文，总规模最高 3T token。网页先做 HTML 正文抽取、语言识别，再采用规范化后的 exact-match 和 MinHash/LSH fuzzy dedup；质量过滤结合规则、语言模型、文本质量分类器和不良内容识别模型。作者还上采样部分高质量来源，并把高质量多任务 instruction 数据混入预训练。

对报告涉及的评测任务，instruction 数据会过滤与测试集发生 13-gram 重叠的样本；作者明确说无法对所有下游任务都重复该流程。因此，去污染证据覆盖的是一组已知 benchmark，不是对未知训练记忆的完整审计。

### 2. tokenizer 与网络结构

Tokenizer 从 `tiktoken` 的 `cl100k_base` 出发，扩入常用中文字符/词和其他语言 token，数字拆为单个字符，最终词表约 152K。图 3 用每种语言随机 100 万文档、以 XLM-R 为基准比较压缩率；该结果支持多语言编码效率，不直接证明下游理解能力。

模型为 decoder-only Transformer，采用 untied input/output embeddings、RoPE、attention QKV bias、Pre-Norm + RMSNorm、SwiGLU。与 LLaMA 的重要差异是更大词表和 QKV bias。1.8B/7B/14B 分别为 24/32/40 层、hidden size 2,048/4,096/5,120，训练 2.2T/2.4T/3.0T token。

### 3. 优化与长上下文

预训练上下文为 2,048，目标是 next-token prediction；AdamW 采用 $\beta_1=0.9,\beta_2=0.95,\epsilon=10^{-8}$，4M-token batch、cosine decay 到峰值的 10%，BF16 混合精度并使用 FlashAttention。

长上下文主要在**推理阶段**组合 dynamic NTK-aware RoPE interpolation、LogN-Scaling 与 layer-wise window attention。较低层用较短窗口、较高层用较长窗口。表 3 在 arXiv 文本上展示 16K 范围的 perplexity 改善；这不等同于训练时已具备 16K 原生上下文，也不等同于长文多跳理解。

### 4. SFT 与 RLHF

SFT 使用 ChatML 区分 system/user/assistant，只在 assistant token 上计算 next-token loss。序列长 2,048、batch 128、训练 4,000 steps；学习率在前 1,430 steps 升至 $2\times10^{-6}$，weight decay 0.1、dropout 0.1、gradient clipping 1.0。数据覆盖自然对话、任务、工具、agent 与暴力/偏见/色情等安全主题，但数量与混合比例没有公开。

RLHF 先做 preference model pretraining（PMP），再用约 6,600 个细粒度标签平衡 prompt 的多样性与难度，收集不同 Qwen checkpoint/采样策略的多响应，由人工排序训练同尺度 reward model。RM 在结束 token 上池化标量；学习率 $3\times10^{-6}$、batch 64、长度 2,048、1 epoch。

PPO 同时维护 policy、value、reference、reward 四个模型。训练前先单独更新 value model 50 steps；每个 query 同时采样两个回答，KL 系数 0.04，reward 按运行均值归一化；policy/value 学习率分别为 $1\times10^{-6}$ 与 $5\times10^{-6}$，value clip 为 0.15。作者还混入 pretraining gradient 以缓解 alignment tax，但没有公开精确混合比例。

### 5. 专门化与 agent

Code-Qwen 从通用 Qwen 初始化，再继续预训练约 90B code token、最长 8,192；随后做多阶段 code SFT。Math-Qwen-Chat 直接做数学 instruction tuning，输入较短，序列长 1,024，并 mask system/user token 的 loss。

工具路线用 Qwen 自身 self-instruct 生成 ReAct 格式样本，规则与人工过滤后迭代，最终约 2,000 条高质量 agent 样本混入通用 SFT，而非另开单独阶段。代码解释器任务形成“写代码—运行—读取结果—继续规划”的闭环，但底层模型参数本身不会在单次任务中更新。

## 实验

![Qwen 基座在七个常用基准上的比较](/images/literature-notes/qwen-technical-report/key-results.png)

*图 2｜Qwen-14B 在报告表 2 的 MMLU、C-Eval、GSM8K、MATH、HumanEval、MBPP、BBH 上均高于列出的既有 13B 级基座；灰色数字多取自其他论文/平台。来源：原论文表 2，PDF 物理页 8。[原文](https://arxiv.org/pdf/2309.16609)*

### 基座与对齐模型

Qwen-14B 在 MMLU 5-shot 为 66.3、C-Eval 5-shot 72.1、GSM8K 8-shot 61.3、HumanEval 0-shot 32.3；Qwen-7B 对应为 58.2、63.5、51.7、29.9（表 2）。表中基线的最佳分数来自官方报告和 OpenCompass，不是同一代码、同一日期下的完全受控重跑。

Qwen-14B-Chat 在表 5 的 MMLU 0/5-shot 为 64.6/66.5，C-Eval 69.8/71.7，HumanEval 43.9。值得注意的是 GSM8K 0-shot 60.1、8-shot 59.3，BBH 0-shot 46.9、3-shot 58.7；few-shot 并非对所有任务单调改善。

### RLHF 的直接证据

奖励模型在自有 Qwen Helpful-base/online 上，pairwise accuracy 从 PMP 的 62.68/61.62 提升到 RM 的 74.78/69.71；但在 Anthropic helpful 数据上部分下降，说明面向自有策略分布的拟合不保证跨域提升（表 4）。

人评使用 300 条中文指令、每条 3 位标注者，对 Qwen-7B/14B SFT、Qwen-14B RLHF、GPT-3.5 与 GPT-4 排序。报告称 RLHF 版显著优于 SFT，但仍落后 GPT-4（图 4）。数据为单语言、内部构造，且只报告聚合胜率，不能外推到所有人群和任务。

### 代码、数学与工具

Code-Qwen-14B-Chat 在 HumanEval pass@1 为 66.4、MBPP 52.4；相比 Qwen-14B-Chat 的 43.9/46.4，支持领域继续训练和 SFT 的整套配方有效。由于同时改变预训练语料与后训练，不能区分 90B code token 和 code SFT 的单独贡献。

Math-Qwen-14B-Chat 在 GSM8K/MATH 为 69.8/24.2，高于 Qwen-14B-Chat 的 60.1/18.4（表 12）。在代码解释器内部集上，Qwen-14B-Chat 的代码可执行率 81.7%、最终可视化正确率 56.4；GPT-4 分别为 86.8% 和 63.8%（表 7–8）。可视化正确性由 Qwen-VL 判定，评估器与被评模型属于同一模型家族，存在共享偏差风险。

## 主要发现

1. **中文友好的 tokenization 是系统效率贡献。** 更大多语言词表减少中文等文本所需 token，但词表规模也增加 embedding 参数和显存开销。
2. **Qwen 把 base、chat、领域模型和 agent 组织为可复用谱系。** 图 1 比单一榜单更能解释后续 Qwen 路线。
3. **RLHF 改善的是人类偏好下的回答行为。** 其直接证据来自内部中文人评和自有 RM 数据，而不是通用 benchmark 全面提高。
4. **领域专门化有明显收益。** Code/Math 版本高于同尺度通用 chat，但论文没有拆分 continued pretraining、SFT 和数据质量的贡献。
5. **工具使用需要数据格式与环境反馈。** 约 2,000 条高质量 ReAct 样本已能带来可观能力，说明格式学习和基座能力同样重要。

## 结论

作者认为 Qwen-1 建立了一个覆盖 1.8B–14B 的开放 LLM 家族，并证明预训练、SFT、RLHF、领域继续训练与工具增强可以在同一基座上协同。

证据支持的较窄结论是：Qwen-14B 在报告选定的中英、数学、代码与 agent 评测上处于当时强开放模型行列；对齐和领域化的整套流程有效，但数据、计算与受控消融不足以精确归因或独立复现。

## 局限与适用边界

### 作者明确报告的局限

- Qwen 与最强专有模型仍有差距，尤其是复杂综合任务；作者明确要求更严格的 GPT-4 对比测试。
- 传统静态 benchmark 难以衡量对齐后的 chat 模型，因此引入内部人评，但该评估本身也较窄。
- 工具选择基准可能过于简单；模型规模增大后工具选择与参数填写出现收益饱和。
- 长上下文技巧主要通过 perplexity 验证，论文没有把它等同于所有长文理解任务。

### 额外识别的局限

- 没有公开预训练来源比例、处理后语料、总 FLOPs/GPU-hours、SFT 数量、PPO query 数或完整训练日志。
- 多数 headline 比较跨论文取数，数据、tokenizer、prompt 和污染处理均可能不同。
- 13-gram 去污染仅保证报告涉及的一部分 instruction 数据，且无法发现语义改写或答案泄漏。
- 人评只有 300 条中文指令；标注者背景、一致性统计和不确定性未报告。
- 安全数据被用于 SFT，但缺少系统性的越狱、偏见、毒性和误用定量表。
- 工具执行是受控 benchmark；真实 API 权限、错误恢复、注入攻击与长期状态没有覆盖。
- 开放代码与权重不等于完整训练可复现；第一代模型许可证也应按具体 checkpoint 核查，不能用后续 Qwen3 的 Apache 2.0 概括。

## 路线关系

Qwen 在结构上明显继承 LLaMA 的 decoder-only、RMSNorm、SwiGLU、RoPE 路线，但用约 152K 的多语言 tokenizer、QKV bias 与更完整的 SFT/RLHF/agent 配方适配中文应用。后续 Qwen2 会用 GQA、DCA/YARN、dense+MoE 和 DPO 重构这条路线；因此 Qwen-1 更像“家族原型”，而不是后续版本的等价小模型。

## 我的思考

第一代 Qwen 最有前瞻性的地方是把 agent 样本混入通用对齐，而不是把“工具调用”当成外挂 prompt 技巧。这意味着工具能力的一部分是语言模型对协议、错误反馈和动作格式的建模问题。

仍待验证的是：约 2,000 条人工过滤的 agent 数据究竟学习了可迁移的“工具使用抽象”，还是记住了 ReAct 格式和有限工具分布。更强的实验应固定基座与通用 SFT，只改变工具任务的环境多样性、反馈真实性和轨迹长度。

## 参考文献

1. Bai, J. et al. (2023). *Qwen Technical Report*. arXiv:2309.16609. [arXiv](https://arxiv.org/abs/2309.16609) · [PDF](https://arxiv.org/pdf/2309.16609) · [官方代码](https://github.com/QwenLM/Qwen) · [官方模型](https://huggingface.co/Qwen/Qwen-14B) · [仓储 DOI](https://doi.org/10.48550/arXiv.2309.16609)
