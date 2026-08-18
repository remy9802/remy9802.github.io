---
title: "文献笔记｜Qwen2.5 Technical Report：18T 数据、分阶段强化学习与百万上下文"
date: 2026-08-18
permalink: /posts/qwen25-technical-report/
tags: [literature-note, llm, qwen, multilingual-llm, rlhf, grpo, long-context]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：arXiv v2 全文 26 页，包括架构/许可证、18T 预训练、SFT、离线 DPO、在线 GRPO、奖励模型、多语言和长上下文实验；同时核查官方代码页与旗舰模型卡。
>
> **检索日期**：2026-08-18。
>
> **主题**：Qwen2.5 如何把数据质量、领域专门数据、可验证反馈和长上下文训练统一为覆盖 0.5B–72B 的模型平台？

## 文献档案

- **论文**：*Qwen2.5 Technical Report*
- **文献链接**：[arXiv:2412.15115](https://arxiv.org/abs/2412.15115) · [PDF](https://arxiv.org/pdf/2412.15115)
- **代码链接**：[报告所列 QwenLM/Qwen2.5 官方仓库](https://github.com/QwenLM/Qwen2.5) · [Qwen2.5-72B-Instruct 官方模型卡与文件](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct)
- **作者**：Qwen Team；报告列 An Yang 等 42 位核心贡献者，并另列完整 contributors 名单。
- **机构 / 年份**：Qwen Team（阿里云通义千问团队；报告首页未按传统论文格式逐作者列单位）；2025（v2）。
- **出版状态**：arXiv 技术报告，v1 于 2024-12-19 提交，v2 于 2025-01-03 提交，PDF 首页日期为 2025-01-06；未报告正式会议或期刊版本。为避免歧义，本文参考文献写作“2025（v2；v1 2024）”。`10.48550/arXiv.2412.15115` 是仓储 DOI。
- **版本说明**：本文按 v2 精读。报告中的 Qwen2.5 GitHub 地址目前可能转向统一 Qwen 代码树；历史复现应固定 checkpoint、模型卡与 commit。API 专有模型与开放 dense 权重也不能混为同一可复现实验对象。

## 核心结论

Qwen2.5 的主线不是一个新 attention 算子，而是**用模型参与数据治理，再把可验证反馈贯穿预训练与后训练**：预训练从 7T 扩到 18T，Qwen2-Instruct 负责质量打分和域分类，Qwen2-72B/Math 生成合成数据，专有奖励模型过滤；SFT 超过 100 万条，覆盖长输出、数学、近 40 种编程语言、结构化数据和 70,000 条逻辑问题；随后以约 150,000 对离线 DPO 获得客观任务能力，再用奖励模型和 GRPO 做在线偏好优化（原文 §3–4）。

报告支持 Qwen2.5-72B-Instruct 在当时的开放 70B 级模型中处于强前沿，并在数学、代码、严格指令和长上下文上较 Qwen2 明显提高。证据也给出重要边界：base 的 HumanEval 从 Qwen2-72B 的 64.6 降至 59.1；多语言文化细节仍落后部分基线；奖励模型榜单分数不能可靠预测下游 RL 效果；1M passkey 只证明超长序列中的单值检索。

## 检索记录

- **数据源**：arXiv 元数据与 v2 PDF、Qwen 官方 GitHub、官方 Hugging Face 模型卡。
- **检索式**：`Qwen2.5 Technical Report 2412.15115 official GitHub model card`；`site:huggingface.co/Qwen Qwen2.5-72B-Instruct`。
- **纳入原因**：它记录 Qwen 从 Qwen2 的 7T+DPO 路线向 18T、领域数据、DPO+GRPO 与 1M 长上下文平台演进的关键配方。
- **排除**：Qwen2.5-Coder、Math、VL 和 QwQ 只作为输入数据/后续谱系提及，不把其独立报告的数字补写成本论文实验。
- **全文状态**：全文、3 幅图、17 张主表和作者贡献列表均已阅读；代码与模型卡用于核验发布、许可证和实现边界。
- **版本 / 更正审计**：arXiv v1/v2 的跨年日期已核对；未见正式 venue、更正或撤稿。

## 研究背景

Qwen2 已经引入 GQA、dense+MoE、7T 高质量数据和 YARN+DCA，但真实使用暴露出三类缺口：输出通常不足 2K，结构化输入/输出和工具协议不够稳，7B 等尺度的严格指令遵循仍弱。与此同时，o1 式 inference-time reasoning 使“模型是否会写更长的可验证思维链”成为新问题，1M 级上下文也开始从展示性窗口转为 API 产品诉求。

Qwen2.5 因此试图从模型家族的角度补齐能力，而非只追逐一个旗舰分数：恢复 3B/14B/32B 中间尺度；让开放 dense 权重覆盖边缘到服务器；用专有 MoE 提供 API；让数学、代码、结构化数据、系统提示、低资源语言和长上下文共享一条后训练基础设施。

## 研究问题

1. 从 7T 扩到 18T 时，如何避免网页高频低价值域淹没技术、科学和学术数据？
2. dense 和 MoE 是否能用统一 scaling-law 实验预测学习率、batch 与最终 loss？
3. 超过 100 万条 SFT、约 15 万对 DPO 和在线 GRPO 如何分工？
4. 32K 原生训练、YARN+DCA 外推、Turbo 的 262K 训练与 1M 推理之间是什么关系？
5. 基准领先之外，许可证、专有组件、文化能力和奖励模型有效性有哪些限制？

## 方法与数据

![Qwen 系列随预训练 token 增长的能力变化](/images/literature-notes/qwen25-technical-report/method-overview.png)

*图 1｜报告把 Qwen1.5、Qwen2、Qwen2.5 的 3T→7T→18T 数据扩展与多项能力并列展示；这是跨代总体趋势，不是只改变 token 数的受控 scaling 实验。来源：原论文图 1，PDF 物理页 1。[原文](https://arxiv.org/pdf/2412.15115)*

### 1. 模型谱系、架构与许可证

开放权重部分是 0.5B、1.5B、3B、7B、14B、32B、72B 的 dense decoder；API 部分是专有 MoE Qwen2.5-Turbo/Plus。dense 延续 Qwen2 的 GQA、SwiGLU、RoPE、QKV bias、Pre-Norm+RMSNorm；MoE 延续细粒度专家与共享专家路由。报告没有公开 Turbo/Plus 的完整层数、专家数和总/激活参数，不能由 API 名称反推结构。

BBPE 有 151,643 个普通 token，控制 token 从 3 增到 22，其中两个服务工具功能。0.5B/1.5B/3B 原生 context 32K，其余 7B–72B 标称 128K，生成上限均 8K。

“开放权重”也不等于统一许可证：表 1 明确 0.5B、1.5B、7B、14B、32B 为 Apache 2.0，3B 为 Qwen Research License，72B 为 Qwen License。使用时应以具体 checkpoint 模型卡为准，不能把整个 Qwen2.5 系列概括为 Apache 2.0。

### 2. 18T 预训练数据治理

数据管线有四个关键环节：Qwen2-Instruct 从多维度给样本质量打分；吸收 Qwen2.5-Math/Coder 的领域数据；Qwen2-72B-Instruct 与 Qwen2-Math-72B-Instruct 合成数学、代码和知识文本，再由专有通用 RM 与 Math RM 过滤；Qwen2-Instruct 将数据按域分类并重新配比，降低电商、社交媒体、娱乐等重复/模板化高频域，提高技术、科学和学术域。

最终规模由 7T 增到 18T。这里的因变量同时受到数量、混合、过滤器、合成生成器和领域数据变化影响；图 1 因而支持“跨代联合 recipe 有效”，不能单独证明 token 数的因果效应。

### 3. 用 scaling law 选择超参数

作者训练 dense 44M–14B、MoE 44M–1B 激活参数的系列小模型，数据从 0.8B 到 600B token，拟合最优学习率 `μ_opt`、batch `B_opt` 与模型规模 `N`、数据量 `D` 的关系，再预测最终 loss，并用来配置大尺度 dense/MoE。

这与只预测“给定 FLOPs 下参数与 token 最优配比”的 scaling law 不同：目标首先是跨架构选择训练超参数及 MoE 容量。报告只给方法描述，没有公式系数、拟合误差、外推曲线或大模型验证残差，因此外部读者无法独立复算预测。

### 4. 长上下文预训练

除 Turbo 外，模型先以 4,096 长度训练，末段扩为 32,768，并通过 ABF 把 RoPE base 从 10,000 提到 1,000,000；推理时用 YARN+DCA 做 4 倍外推至 131,072。

Turbo 则按 32,768→65,536→131,072→262,144 四段渐进训练，RoPE base 设为 10,000,000；每段数据中 40% 为当前最大长度、60% 为更短序列，以减少只会处理满长输入的退化。再用 YARN+DCA 外推到 1M。因而“1M 支持”不等于用 1M 序列完成全量预训练。

### 5. 超过 100 万条 SFT

SFT 把难点拆成九类数据工程：

- 长输出由预训练长文反向生成查询、施加长度约束，再由 Qwen2 过滤，支持最多 8,192 token 输出；
- 数学引入 Qwen2.5-Math 的 CoT，用答案、RM 与 rejection sampling 验证；
- 代码由多语言 agent 协作生成近 40 种语言的任务，结合 Q&A、GitHub 片段和多语言 sandbox 的静态检查/单测；
- 指令遵循由模型同时生成指令、verifier 和单元测试，以执行反馈筛选；
- 结构化数据覆盖表格 QA、事实核验、纠错、结构理解和半结构化推理；
- 逻辑推理新增 70,000 条题，覆盖演绎、归纳、类比、因果和统计推理；
- 低资源语言由翻译与语义一致性检查迁移；另有数百种 system prompt 和多 critic/多 agent 一致通过的响应过滤。

最终超过 100 万条样本，训练 2 epochs、长度 32,768，学习率 `7e-6→7e-7`，weight decay 0.1、gradient clipping 1.0。

### 6. 离线 DPO 与在线 GRPO

离线阶段针对数学、代码、指令约束和逻辑等可客观核验、却未必适合通用 RM 打分的任务。SFT 模型重新采样，执行/答案检查通过者为正例、失败者为负例，再经人和自动审核，得到约 150,000 对；DPO 训练 1 epoch，Online Merging Optimizer，学习率 `7e-7`。

在线阶段的 RM 同时优化真实性、有用性、简洁、相关、无害与去偏。响应来自不同 SFT/DPO/RL checkpoint 和温度，偏好由人工与自动标签组合。GRPO 每个 query 采样 8 个回答，global batch 2,048、每 episode 2,048 个样本；训练按 RM 响应分数方差排序，高方差 query 优先。报告没有给 GRPO 学习率、KL、总 episode、训练算力和完整 query 数，复现仍不完整。

### 7. 长上下文后训练

Turbo 的 SFT 先仅用不超过 32K 的短指令，再混入不超过 262K 的长指令，以兼顾短任务。RL 仍只使用短指令：作者给出的原因是长上下文 RL 成本高且缺少可靠的长上下文 RM，并观察短指令 RL 仍能改善长任务偏好。这是方法选择，也是明确能力边界。

## 实验

![Qwen2.5-Turbo 的百万 token passkey 检索](/images/literature-notes/qwen25-technical-report/key-results.png)

*图 2｜Qwen2.5-Turbo 在报告的 1M-token passkey retrieval 达到 100%；该任务验证“能否从某个位置取回一个值”，不要求整合整篇长文。来源：原论文图 2，PDF 物理页 17。[原文](https://arxiv.org/pdf/2412.15115)*

### 基座：总体提高，但代码并非单调

Qwen2.5-72B base 的 MMLU 86.1、MMLU-Pro 58.1、BBH 86.3、GPQA 45.9、MATH 62.1、GSM8K 91.5、MBPP 84.7，均较 Qwen2-72B 有提高。反例是 HumanEval 59.1，低于 Qwen2-72B 的 64.6；HumanEval+ 51.2 也低于 56.1（表 2）。因此“加入更多代码数据”不保证每个代码 benchmark 单调提升，采样方差、数据分布和基准饱和都可能影响。

### Instruct：72B 接近 405B 是任务集合结论

Qwen2.5-72B-Instruct 在表 6 达到 MMLU-Pro 71.1、MATH 83.1、HumanEval 86.6、LiveCodeBench 55.5、IFEval 84.1、Arena-Hard 81.2、MT-Bench 9.35。对 Llama-3.1-405B，其 MMLU-Pro/GPQA/HumanEval 较低，MATH、LiveCodeBench、Arena-Hard 较高；“匹配 405B”是综合表现描述，不是每项相等。

摘要称 405B “约大 5 倍”，结论写“约大 6 倍”；按名义参数 405/72≈5.6。两种表述本质相容，但也提醒读者不要把四舍五入的宣传语当作计算量、显存或服务成本对照。

### 多语言与文化细节

Qwen2.5-72B-Instruct 的多语言 IFEval 为 86.98、扩展 MGSM 88.16，分别高于所列表中其他模型或处前列；BLEnD 文化细节为 32.48，虽高于 Qwen2-72B 的 25.90，却低于 GPT-4o-mini 的 35.91 和 Mistral-Large 的 33.47（表 13）。多语言知识/翻译提升不能替代文化语境评测。

### 奖励模型：榜单不预测 RL

Qwen2.5-RM-72B 的 RewardBench 总分 91.59，低于 Llama-3.1-Nemotron-70B-Reward 的 94.10；RMB overall 68.71，低于 Athene-RM-70B 的 73.98；但在 PPE objective average 69.85 与内部中文偏好 61.27 上领先表中基线。作者据此警告：针对单一 RM benchmark 过度优化会触发 Goodhart 风险；更关键的是，多次实验发现 RM benchmark 分数不能准确预测其指导出的 RL 模型性能。这是全文最重要的评价学负结果之一。

### 长上下文与稀疏推理

Qwen2.5-72B-Instruct 的 RULER 平均 95.1；移除 YARN+DCA 后为 90.8。在 128K 位置，分数从 67.0 提升至 88.4，证明外推组件的作用主要出现在训练长度之外。LV-Eval 128K/256K 由 27.0/2.4 提升为 50.9/45.2（表 16–17）。

Turbo 在 1M passkey 上 100%，并使用基于 MInference 的稀疏注意力：报告称 1M 时 attention 计算量降 12.5 倍、不同硬件配置的首 token 时间加速 3.2–4.3 倍。加速比依赖 batch、硬件、内核和稀疏模式；它不等同于端到端 decode 吞吐或所有长任务质量保持。

## 主要发现

1. **数据治理已成为模型能力的一部分。** 生成器、过滤器、RM 和域分类器共同决定 18T 的有效分布。
2. **离线与在线 RL 按反馈可靠性分工。** 可执行/可核验任务先用 DPO，主观偏好再交给 RM+GRPO。
3. **Qwen2.5 首次把结构化数据、长输出和 system prompt 鲁棒性放进统一 SFT。** 这比只扩大普通对话数据更贴近真实接口。
4. **长窗口来自训练与外推的组合。** 开放 dense 是 32K 训练加 4 倍外推；Turbo 是 262K 渐进训练加外推到 1M。
5. **模型和评价器必须共同审计。** RM benchmark 与下游 RL 不一致，说明“更好的裁判分数”不是更好对齐的充分条件。

## 结论

作者认为，Qwen2.5 通过 18T 预训练、超过 100 万条 SFT 和多阶段 RL，显著改善领域知识、推理、长输出、结构化数据和偏好，并让 72B 在多项任务上匹配约 5–6 倍参数的 Llama-3.1-405B。

证据支持的较窄结论是：在报告的 2024 年评测快照内，Qwen2.5 使 Qwen 家族在数学、LiveCodeBench、严格指令和长上下文上大幅前进；但跨代联合变化无法只归因于 18T，专有 MoE/RM 不可复现，文化与奖励模型评估仍存在明确缺口。

## 局限与适用边界

### 作者明确报告的局限

- BLEnD 表明文化细节虽较 Qwen2 改善，仍有进一步提升空间。
- 单一 RewardBench 容易导致 Goodhart 式过拟合；现有 RM benchmark 不能可靠预测下游 RL 结果。
- 长上下文 RL 因计算成本和缺乏合适 RM，仅在短指令上训练。
- 未来仍需更广、更高质量数据、统一多模态和 inference-compute scaling 的推理能力。

### 额外识别的局限

- 未公开 18T 的来源比例、合成占比、去重统计、数据权利清单、总训练 FLOPs 或主要预训练超参数。
- scaling-law 方法没有系数、拟合误差与外推残差，外部无法验证其超参数预测。
- Turbo/Plus、通用 RM 与 Math RM 均为专有组件；报告把开放 dense 和 API MoE 放在同一模型家族，但可复现级别不同。
- 许可证按尺度分裂，3B/72B 不是 Apache 2.0；“开放”不能代替具体授权审查。
- 1M passkey 是单值检索；LV-Eval/RULER 更丰富但仍不能覆盖长文生成的全局一致性、引用准确性和事实漂移。
- base HumanEval 的跨代下降说明总体平均改进会掩盖任务退化；表格没有置信区间或多随机种子。
- API 模型的延迟/成本比较受服务版本和日期影响，不能从 2024-11 快照外推到当前产品。

## 路线关系

Qwen2.5 保留 Qwen2 的 GQA、dense+MoE 与 YARN+DCA，但将重点从“架构升级”移到“数据—反馈—产品接口”的联合优化。它吸收 Qwen2.5-Math/Coder 的领域数据，又成为 QwQ、Qwen2.5-VL 等专门模型的基座；Qwen3 随后会把这条路线推进到 36T/119 语言，并把 thinking 与 non-thinking 融入同一 checkpoint。

## 我的思考

Qwen2.5 最值得复用的方法不是 18T 这个数字，而是按“反馈是否可靠”分配算法：答案/执行器能判断的样本，不必让通用 RM 猜；偏好细微、无唯一答案的样本，再使用相对策略优化。未来应进一步报告每类 verifier 的误报/漏报，以及错误 verifier 对策略学习的放大程度。

长上下文也应拆成四个成本轴：预填充 FLOPs、KV/权重显存、首 token 延迟和答案质量。论文已报告 attention 计算与 TTFT，却没有把稀疏近似导致的质量变化与这些收益画成同一 Pareto 曲线；这是比“支持 1M”更有决策价值的下一步。

## 参考文献

1. Qwen Team. (2025; v1 2024). *Qwen2.5 Technical Report*. arXiv:2412.15115. [arXiv](https://arxiv.org/abs/2412.15115) · [PDF](https://arxiv.org/pdf/2412.15115) · [报告所列官方代码](https://github.com/QwenLM/Qwen2.5) · [官方模型](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct) · [仓储 DOI](https://doi.org/10.48550/arXiv.2412.15115)
