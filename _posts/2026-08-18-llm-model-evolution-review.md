---
title: "综述｜从 Transformer 到推理强化：GPT、LLaMA、Qwen 与 DeepSeek 的 LLM 演进"
date: 2026-08-18
permalink: /posts/llm-model-evolution-review/
tags: [literature-note, llm, transformer, gpt, llama, qwen, deepseek, scaling, instruction-tuning, moe, reasoning-rl]
note_type: topic-synthesis
literature_topics: [llm]
excerpt: "以 15 篇代表性论文为证据，梳理大语言模型从 Transformer、规模化预训练、指令对齐，到高效 MoE 与推理强化的技术演进。"
---

> **阅读范围**：15 篇代表性论文/技术报告的全文、附录、正式出版页、作者项目与官方代码/模型说明。<br>
> **检索日期**：2026-08-18。<br>
> **综述边界**：聚焦当前通用生成式 LLM 的 decoder-only 主线；BERT、T5、PaLM、Mistral 等重要旁支只作背景定位，不冒充已逐篇精读的样本。

## 摘要

大语言模型的演进不能压缩成“参数越来越多”。15 篇核心文献展示了五次相互衔接的重心迁移：

1. **Transformer** 用注意力建立可并行扩展的序列建模底座；
2. **GPT-1/2/3** 把任务学习逐步迁入大规模自回归预训练与上下文；
3. **InstructGPT** 把“会续写”改造成“按人类意图回答”，后训练成为独立技术栈；
4. **LLaMA、Qwen 与 DeepSeek** 把竞争扩展到数据配方、开放权重、多语言、长上下文、MoE 和推理成本；
5. **DeepSeek-R1 与 Qwen3** 进一步把能力增益移向推理强化、长链思考、模式融合与蒸馏。

贯穿各代模型的核心目标仍是 next-token prediction。真正变化的是：模型怎样分配参数和数据、怎样压缩注意力与激活成本、怎样进行后训练，以及怎样证明能力不是由数据污染或评测协议造成。本文的主判断是：**LLM 已从“单一预训练规模竞赛”转向“预训练—后训练—推理计算—系统效率”的联合设计，但公开证据仍远未达到可严格复现的程度。**

## 核心结论

- Transformer 奠定了可扩展计算底座，GPT 系列依次推进生成式迁移、零样本任务化、上下文学习与偏好对齐。
- LLaMA 把开放权重与推理成本带入主线；Qwen 将多语言、专业能力、长上下文和可控思考组织成完整谱系；DeepSeek 则把 MLA、稀疏 MoE、FP8/MTP 与 reasoning RL 连成效率路线。
- 现代模型的提升通常同时改变数据、架构、后训练与推理预算，跨论文分数只能证明完整系统差异，不能自动证明某个模块的因果贡献。
- 开放权重、论文公开与端到端可复现是三个不同层级；15 篇文献中没有一篇公开了足以逐样本审计的完整最终训练管线。

## 检索记录

- **检索范围**：2017–2025 年 decoder-only 通用 LLM 主线的代表性转折点。
- **检索入口**：逐篇 exact-title 检索，随后以正式 proceedings、arXiv 版本记录、作者机构页面、官方 GitHub/模型卡交叉核对。
- **纳入规则**：必须改变架构、任务范式、训练/推理成本或后训练能力边界，并能取得全文；最终纳入 15 篇。
- **排除规则**：媒体报道、第三方排行榜与非官方复现不承担核心事实；BERT/T5 等旁支不纳入逐篇精读，不表示其学术重要性较低。
- **版本核验**：正式出版状态、arXiv 仓储 DOI 与会议/期刊 article DOI 逐篇分开记录，详见单篇笔记。

## 研究问题

1. LLM 从 Transformer 到推理模型的关键变化，究竟来自架构、数据、规模、后训练还是推理计算？
2. GPT、LLaMA、Qwen 与 DeepSeek 四条路线分别优先优化了什么，又交换了哪些透明度、成本或可靠性？
3. 怎样在评测协议和开放程度不同的情况下，给出不越过证据边界的横向比较？

## 方法与数据

本综述把 15 篇全文作为“研究对象”，不是把各论文 benchmark 拼成统一排行榜。比较矩阵包含五条轴：模型结构（dense/MoE、MHA/GQA/MLA）、预训练数据与 scaling、后训练、推理计算、开放与复现边界。数值只在原论文协议内解释；没有 matched-data / matched-compute 对照时，不做单组件因果归因。

## 1. 纳入标准与文献地图

本综述不是按公司平均分配篇数，而是选择改变了研究问题的工作：提出新底座、改变任务范式、重写训练/推理成本边界，或把后训练推进到新的能力阶段。只用论文、正式会议/期刊页面、作者机构页面和官方仓库作为事实依据。

| 阶段 | 代表工作 | 它真正改变了什么 | 主要证据边界 |
|---|---|---|---|
| 2017：架构底座 | Transformer | 用 self-attention 替代循环依赖，显著提高并行训练能力 | 证据来自机器翻译，不等于当时已证明通用 LLM |
| 2018：生成式预训练 | GPT-1 | 通用自回归预训练后，用很少任务结构做判别微调 | 规模和任务范围仍小，依赖逐任务监督微调 |
| 2019：零样本任务化 | GPT-2 | 把自然语言任务写进文本上下文，测试零样本迁移 | “zero-shot” 仍受 prompt、数据重叠与任务格式影响 |
| 2020：上下文学习 | GPT-3 | 规模化后通过 prompt 和 demonstrations 学习任务，不更新参数 | few-shot 并非稳定学习算法，成本、偏差与污染问题突出 |
| 2022：指令与偏好对齐 | InstructGPT | SFT + reward model + PPO，使输出更贴近标注者偏好 | 偏好人群有限；帮助性不等于真实性与普适价值 |
| 2023：开放推理成本前沿 | LLaMA | 让较小 dense 模型吃更多数据，重视长期推理成本 | 开放权重不等于训练数据、代码与日志完全开放 |
| 2023：闭源前沿系统 | GPT-4 | 报告多模态能力、可预测 scaling 与系统级安全评测 | 架构、参数、数据和训练算力均未披露 |
| 2023–2025：多语言通用化 | Qwen → Qwen2 → Qwen2.5 → Qwen3 | 扩展中英/多语、代码数学、上下文和模型尺度，并融合思考/非思考模式 | 版本间数据和评测同步变化，难做单因素归因 |
| 2024：高效 MoE | DeepSeek LLM → V2 | 从 dense scaling 过渡到 DeepSeekMoE + MLA，降低激活与 KV cache 成本 | 总参数、激活参数、训练与服务成本必须分开比较 |
| 2024：系统协同训练 | DeepSeek-V3 | 把 MoE、以动态 bias 为主的负载均衡、FP8、MTP 与集群优化组合 | 成本数字依赖指定硬件和计价口径，且不含全部研发成本 |
| 2025：推理强化 | DeepSeek-R1 | 用 RL 激发长链推理，再通过冷启动、SFT、RL 和蒸馏提高可用性 | benchmark 推理分数不等于一般可靠性；长输出增加推理成本 |

## 2. 第一阶段：Transformer 解决“怎样扩展序列计算”

![Transformer 编码器—解码器与多头注意力结构](/images/literature-notes/attention-is-all-you-need/method-overview.png)

*图 1｜Transformer 的核心不是“模型变大”，而是用 self-attention、位置编码、残差与前馈网络建立更易并行的序列计算图。来源：原论文关键结构图；详见[单篇精读](/posts/attention-is-all-you-need/)。*

循环网络必须沿 token 顺序传播状态，路径长度随序列增长。Transformer 将一次注意力写为

$$
\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V,
$$

允许同层 token 直接交互，并把大部分计算变成矩阵乘法。多头注意力提供不同子空间，位置编码补回顺序信息，残差和归一化支持深层优化。

这篇论文的直接实验是翻译，并非因果证明“注意力必然产生通用智能”。但它改变了可扩展性约束：一旦训练能高效并行，参数、数据与计算预算便可以持续放大。后续 GPT、LLaMA、Qwen、DeepSeek 大多没有离开 decoder Transformer 主干，而是在归一化、位置编码、FFN、注意力头共享和稀疏激活上迭代。

## 3. 第二阶段：GPT 把任务逐步搬进预训练与上下文

### 3.1 GPT-1：预训练表示，再做任务微调

GPT-1 用 decoder Transformer 做无监督语言模型预训练，再在分类、蕴含、问答等任务上监督微调。不同任务被序列化为统一 token 流，减少任务专用结构。它的历史意义不是首次提出语言模型，而是证明“同一个自回归 Transformer 表示”可以迁移到多类语言理解任务。

局限同样清楚：每个下游任务仍需标签和参数更新；模型规模、上下文、数据覆盖与今天的 LLM 不在同一量级。[单篇精读](/posts/gpt-1-generative-pretraining/)

### 3.2 GPT-2：任务可以被描述成文本

GPT-2 将训练目标收敛到纯语言建模，并用更大、更广的网页语料研究 zero-shot transfer。任务不再通过分类头定义，而通过上下文和输出格式表达。它由此提出一个关键想法：若训练分布包含足够多“自然发生的任务”，语言模型可能在推理时从文本条件中恢复任务。

但 zero-shot 不是无条件能力。prompt 措辞、答案格式、语料重叠和选择性展示都会影响结果；模型在摘要、翻译、问答等任务上的证据远非全面超越监督系统。[单篇精读](/posts/gpt-2-unsupervised-multitask-learners/)

### 3.3 GPT-3：规模化与 in-context learning

![GPT-3 的模型尺度与上下文学习证据](/images/literature-notes/gpt-3-few-shot-learners/in-context-scaling.png)

*图 2｜GPT-3 将 zero/one/few-shot 统一为推理时上下文条件，不做梯度更新；随着规模变化，部分任务出现更明显的 few-shot 收益。来源：原论文关键结果；详见[单篇精读](/posts/gpt-3-few-shot-learners/)。*

GPT-3 的关键改变是把 demonstrations 放进上下文：

$$
p(y\mid x,\mathcal D_{\mathrm{demo}}),
$$

模型参数保持不变，任务由 prompt 中的示例隐式指定。论文把模型扩展到 175B 参数，并在大量任务上比较 zero/one/few-shot。它让 in-context learning 成为独立研究对象，也推动 scaling law、prompt engineering 与涌现能力讨论。

需避免三种过度解读：第一，参数更多不意味着每项任务单调更好；第二，上下文模仿不等于训练时的稳定参数学习；第三，跨论文 benchmark 分数无法隔离数据规模、污染、prompt 搜索和计算预算。GPT-3 自身也报告了社会偏见、事实错误与高成本。

### 3.4 InstructGPT：能力与行为不是同一个目标

基础 LM 的目标是预测训练文本，不是理解用户意图。InstructGPT 把后训练拆成三步：人工示范做监督微调（SFT），成对偏好训练 reward model，再用 PPO 优化策略且以 KL 项限制其偏离 SFT 模型。概括式目标为

$$
\max_\pi\ \mathbb E[r_\phi(x,y)]
-\beta D_{KL}(\pi\Vert\pi_{\mathrm{SFT}}).
$$

这条路线证明较小的 aligned model 可能比更大的 base LM 更受人类评审偏好，但 reward model 只近似一组标注者在给定准则下的判断。它不能自动保证真实、无偏或代表所有文化价值；RL 也可能利用 reward model 漏洞。[单篇精读](/posts/instructgpt/)

### 3.5 GPT-4：能力前沿与证据透明度分离

GPT-4 Technical Report 展示更强的专业考试、多语言和图像理解能力，并强调可从小规模 run 预测最终损失/部分能力。可是报告没有披露模型大小、架构、数据、硬件和训练 recipe。因此，它适合作为“系统做到了什么”的能力记录，不适合作为“哪个组件导致提升”的可复现证据。[单篇精读](/posts/gpt-4-technical-report/)

GPT 路线的整体变化可压缩成：**参数内迁移 → 文本定义任务 → 上下文学习 → 人类偏好后训练 → 闭源系统评估。** 与此同时，公开方法细节并未随能力同步增长。

## 4. 第三阶段：LLaMA 重写开放模型的训练—推理账本

LLaMA 的关键论点是：compute-optimal training 不等于 deployment-optimal training。一个模型只训练一次，却可能推理数百万次；因此让较小模型训练更多 token，可能在相同性能下获得更低长期推理成本。

它把成熟组件组合为强 recipe：decoder-only Transformer、RMSNorm、SwiGLU、RoPE，以及更高效的 attention/checkpointing。7B–65B 模型使用约 1.0T–1.4T token，论文显示小模型在传统训练最优点之后仍能继续改善。结果支持 LLaMA 显著推进开放权重模型的性能—参数前沿，但不支持“所有任务全面超过更大模型”；MMLU、毒性、偏见和 TruthfulQA 都提供了边界证据。[单篇精读](/posts/llama-foundation-models/)

还应区分三种“开放”：

1. **权重可获取**；
2. **训练代码和数据配方可复现**；
3. **最终样本、过滤决策、训练日志和权利状态可审计**。

许多 open-weight LLM 主要达到第一层，部分达到第二层，很少达到第三层。

## 5. 第四阶段：Qwen 把多语言、专业能力与推理模式做成模型谱系

### 5.1 Qwen：中英通用基座与统一下游接口

初代 Qwen 把高质量中英文、多语言片段、代码和数学纳入统一预训练，并同时发布 base 与 chat 变体。它的重要性不只在中文 benchmark，而在于展示非英语中心数据、工具使用、代码与对话后训练可以在同一系列中协同开发。[单篇精读](/posts/qwen-technical-report/)

证据边界是：网页语料和内部清洗流程无法逐样本审计；跨模型比较还混入 tokenizer、prompt、训练 token、污染控制和 chat template 差异。

### 5.2 Qwen2 与 Qwen2.5：从单一基座到多尺度能力矩阵

Qwen2 扩展语言覆盖和模型尺度，并把 GQA 等服务友好设计推广到系列模型；Qwen2.5 又扩大预训练数据、上下文、代码/数学和 instruction 变体。二者共同说明，现代模型系列的“版本升级”往往同时改变数据量、数据质量、架构、上下文扩展和后训练，因而无法把最终分数提升归因于单一组件。

- [Qwen2 单篇精读](/posts/qwen2-technical-report/)
- [Qwen2.5 单篇精读](/posts/qwen25-technical-report/)

### 5.3 Qwen3：把 thinking / non-thinking 纳入同一策略

![Qwen3 的预训练与混合思考后训练流程](/images/literature-notes/qwen3-technical-report/method-overview.png)

*图 3｜Qwen3 不只增加规模，而是把推理强化、思考模式融合和通用能力对齐组织成分阶段后训练。来源：原技术报告方法图；详见[单篇精读](/posts/qwen3-technical-report/)。*

Qwen3 同时覆盖 dense 与 MoE 尺度，并让用户在高计算的 thinking 与低延迟的 non-thinking 模式之间切换。其研究重点从“是否会推理”转向“怎样控制推理预算、保持通用能力，并把强模型能力蒸馏到较小模型”。

这个设计不意味着一次模型权重就消除了两种模式的冲突：长思考可能过度计算、语言混杂或形成脆弱模板；短回答又可能在困难任务上过早终止。报告中的数学/代码/通用 benchmark 需要结合输出 token、采样预算和工具设置解释，不能只比较最高分。[单篇精读](/posts/qwen3-technical-report/)

## 6. 第五阶段：DeepSeek 把效率设计推进到 MoE、数值精度与 RL

### 6.1 DeepSeek LLM：先建立 dense scaling 基线

DeepSeek LLM 用 7B/67B dense 模型研究中英数据、模型—数据分配和训练 recipe。它的价值在于为后续 DeepSeekMoE/MLA 建立受控基线，并尝试用小规模实验预测更大模型的超参数与损失；但 scaling 外推仍取决于固定的数据分布、架构和训练稳定性假设。[单篇精读](/posts/deepseek-llm/)

### 6.2 DeepSeek-V2：MLA 与 DeepSeekMoE 同时降低两类成本

![DeepSeek-V2 的 MLA 与稀疏 MoE 架构](/images/literature-notes/deepseek-v2/architecture.png)

*图 4｜DeepSeek-V2 分别从 KV cache 和 FFN 激活两端降低服务/训练成本：MLA 压缩注意力状态，DeepSeekMoE 只激活部分专家。来源：原论文架构图；详见[单篇精读](/posts/deepseek-v2/)。*

标准多头注意力在长上下文服务中需要缓存每层 key/value。GQA 通过共享 KV heads 减少缓存；MLA 则把 KV 投影到低维潜变量，再在注意力计算中恢复所需表示。另一方面，MoE 将总参数容量和每 token 激活计算解耦：模型可以拥有大量专家，但每个 token 只路由到少数专家。

因此，比较 MoE 时至少要同时报告：**总参数、激活参数、训练 FLOPs、通信、KV cache、吞吐和质量。** 只把总参数与 dense 模型相比较会夸大计算成本；只看激活参数又会忽略内存、路由和跨设备通信。[单篇精读](/posts/deepseek-v2/)

### 6.3 DeepSeek-V3：架构、数值格式与集群系统共同优化

DeepSeek-V3 延续 MLA 与 MoE，并用动态专家 bias 取代主要的 batch-level 负载均衡损失，同时保留很小的 sequence-wise balance loss；此外加入 multi-token prediction、FP8 混合精度和系统级通信优化。其贡献不应被简化为某一个模块：在超大规模训练中，路由平衡、数值稳定、通信隐藏和故障恢复共同决定理论 FLOPs 能否变成有效吞吐。

论文报告的训练成本有明确硬件和计价假设，不包括数据、消融、失败 run、人员和部署成本。它可以用于核对最终训练 run 的数量级，不能直接推广成“复现同等模型只需同样金额”。[单篇精读](/posts/deepseek-v3/)

### 6.4 DeepSeek-R1：推理能力主要来自后训练，而非新主干

DeepSeek-R1-Zero 先检验在缺少显式 CoT SFT 的情况下，基于可验证奖励的 RL 能否诱发更长的推理行为；正式 R1 再加入 cold-start 数据、推理 RL、拒绝采样/SFT 和面向通用行为的后续训练。它说明准确率、输出长度、自检与策略模板可以在 RL 中共同涌现，也说明纯 RL 结果可能出现可读性差、语言混合与行为不稳。

关键边界有三点：

- RL 优化的是给定 reward/validator，可验证任务成功不代表开放问题上的真实可靠性；
- 更长 chain-of-thought 把成本从训练参数转移到推理 token 和延迟；
- 从大模型蒸馏到小模型证明能力可迁移，但不证明小模型独立发现了同样的推理策略。

[DeepSeek-R1 单篇精读](/posts/deepseek-r1/)

## 7. 横向比较：四条路线分别优化什么

| 路线 | 最稳定的历史贡献 | 主要效率杠杆 | 后训练重点 | 公开证据的突出短板 |
|---|---|---|---|---|
| GPT | 生成式预训练、in-context learning、RLHF 与前沿系统评测 | 公开报告后期难判断 | SFT、偏好模型、RLHF、安全栈 | GPT-4 起架构、数据和算力高度不透明 |
| LLaMA | 开放权重与 inference-optimal 训练观念 | 较小 dense 模型吃更多数据，成熟高效组件 | 论文中仅有限 instruction tuning | 最终语料与完整训练代码不可严格复现 |
| Qwen | 多语言、代码数学、长上下文与完整尺度矩阵 | GQA、dense/MoE 分层、蒸馏 | chat 对齐、专业能力、thinking 模式融合 | 多变量同时升级，单项归因与数据审计困难 |
| DeepSeek | MLA、细粒度 MoE、FP8/MTP 与 reasoning RL | KV 压缩、稀疏激活、数值和通信协同 | SFT/偏好对齐逐步转向可验证奖励 RL | 内部数据、基础设施和完整研发成本仍不可复现 |

这四条路线不是互斥范式。Qwen3 与 DeepSeek 都使用 MoE 和推理后训练；GPT 与开放模型都使用人类/AI 偏好信号；LLaMA 的开放权重又成为 Qwen、DeepSeek 蒸馏与对比的重要基础。更合适的理解是：它们在共同 decoder-only 主干上选择不同的工程和证据优先级。

## 8. 五个技术问题的演进

### 8.1 Dense 还是 MoE

Dense 模型每个 token 激活全部 FFN 参数，优化和部署路径较简单；MoE 用路由器选择少数专家，把容量与激活 FLOPs 分离。MoE 的代价是负载不均、专家坍缩、通信和服务批处理复杂。较强的辅助负载均衡损失可能伤害主任务，DeepSeek-V3 用动态 bias 为主、极小 sequence-wise loss 为辅的机制处理这一权衡。

### 8.2 MHA、GQA 还是 MLA

注意力计算和 KV cache 是长上下文服务的主要瓶颈。MHA 表达直接但 KV heads 多；GQA 共享 K/V；MLA 压缩到潜变量。缓存更小不自动意味着端到端更快：kernel、批量、硬件带宽、量化和并发调度都会改变最终结果。

### 8.3 数据规模还是数据质量

GPT-3、LLaMA、Qwen2.5/3、DeepSeek-V3 都显示更多 token 的价值，但 token 数不是质量。去重、语言比例、代码/数学合成、教材化重写、污染过滤和 curriculum 都会改变同一 token budget 的效果。由于最终语料通常不公开，跨家族的“每 token 效率”大多只能做弱比较。

### 8.4 预训练还是后训练

基础知识、语言建模和广泛模式主要来自预训练；指令遵循、拒答风格、工具格式与推理行为越来越依赖后训练。InstructGPT 确立偏好对齐流程，DeepSeek-R1 和 Qwen3 则把 RL 用于可验证推理和模式控制。后训练能重排已有能力，也可能引入 reward hacking、过度拒答、模式坍缩或通用能力遗忘。

### 8.5 增加参数还是增加推理计算

In-context examples、self-consistency、长 CoT 和工具调用都在推理时增加计算。推理模型的比较因此至少要配平输出 token、采样数、搜索/工具次数和延迟。只比较单个 benchmark 的最高 pass rate，会把更多 test-time compute 误写成模型本身无成本变强。

## 9. 怎样正确阅读 LLM 实验表

### 9.1 不把 benchmark 差值直接当架构因果

不同论文常同时改变训练 token、数据质量、模型规模、tokenizer、上下文、后训练和 prompt。若没有 matched-data / matched-compute 消融，就只能说“完整系统更好”，不能说某个模块独立导致全部增益。

### 9.2 分清 base、instruct、chat 与 reasoning 模型

Base LM 的 next-token likelihood、Chat 模型的指令跟随、Reasoning 模型的长链采样属于不同产品目标。用 chat 模板后的 instruct 模型与 base 模型做生成比较，或者把工具增强结果写成纯参数能力，都会混淆结论。

### 9.3 检查 prompt、采样和污染

需要记录 zero/few-shot、system prompt、CoT、temperature、top-p、最大输出长度、pass@k、工具和答案抽取规则。网页 benchmark 可能进入训练数据；“做了污染检查”也只覆盖作者定义的字符串或语义判据。

### 9.4 把安全与可靠性看成独立证据轴

平均准确率不能替代事实性、校准、偏见、越狱、隐私和真实部署评估。GPT-3、LLaMA、GPT-4 与各开放模型的自有安全测试协议不同，不能把缺少报告解释为没有风险。

## 主要发现

- 从 GPT-1 到 GPT-3，任务定义逐渐由下游结构迁入预训练分布与上下文；InstructGPT 又把行为目标迁入偏好后训练。
- LLaMA、Qwen 和 DeepSeek 说明“更小/更稀疏、训练更久、服务更省”与单纯扩大 dense 参数是不同优化目标。
- Qwen3 与 DeepSeek-R1 的关键变化主要位于 post-training 与 test-time compute，而不是完全替换 Transformer 主干。
- MLA、GQA、MoE、FP8 和 MTP 的收益必须在实际硬件、通信、KV cache 和输出 token 预算下评价。
- 技术透明度没有随模型能力单调提升；GPT-4 是能力证据强、机制证据弱的典型。

### 主要结论

1. **主干趋同，优化重心外移。** decoder Transformer 长期稳定，差异越来越来自数据、稀疏化、注意力缓存、后训练和系统实现。
2. **Scaling 已从参数单轴变成联合预算。** 参数、token、训练 FLOPs、激活参数、上下文和 test-time compute 必须同时核算。
3. **Alignment 与 reasoning 是不同目标。** 前者优化人类偏好与交互行为，后者常依赖可验证奖励和更长推理；二者都不能自动保证真实性。
4. **开放权重推动了复现，但不等于完整开放科学。** 缺少最终数据、过滤器、训练日志和失败 run 时，仍难复现因果结论。
5. **性能榜正在变成系统榜。** 工具、采样预算、上下文模板与后训练数据都会进入最终分数，论文必须给出更严格的成本配平。

### 值得继续研究的问题

- 在不公开原始敏感数据的前提下，怎样提供可审计的数据谱系与污染证明？
- MoE、GQA/MLA、量化和长上下文在相同硬件、相同延迟下究竟怎样公平比较？
- 推理 RL 学到的是可迁移算法、奖励模板，还是 benchmark 特定策略？
- 怎样报告准确率—输出 token—延迟—能耗—校准的联合 Pareto 前沿？
- 多语言平均分提高时，低资源语言、文化知识和安全行为是否同步改善？
- 开放权重模型如何同时支持独立安全研究、许可清晰度与责任部署？

## 局限与适用边界

- 这是按“技术转折点”组织的定向综述，不是按数据库预注册的穷尽式系统综述，也不提供 citation meta-analysis。
- 只对 15 篇纳入文献宣称全文阅读；BERT、T5、PaLM、Mistral 等只用于历史定位。
- 多数模型的最终训练语料、过滤器、训练日志和失败 run 未公开，无法独立验证数据归因与完整成本。
- 模型报告使用不同 prompt、采样、工具、污染检查和版本，本文不把跨报告分数差异当统计显著的 head-to-head 结果。
- “官方代码”可能只包含推理、微调或模型加载；单篇笔记已分别标出是否存在完整预训练实现。
- 2025 年后的模型与出版状态仍会更新；本综述冻结在 2026-08-18 的核验结果。

## 我的思考

这条历史最值得保留的不是某个榜单冠军，而是研究目标的迁移：先让计算图可扩展，再让任务进入预训练和上下文，继而让行为进入后训练，最后把容量、显存、通信和推理 token 纳入同一个预算。下一阶段真正困难的问题可能不是再发明一个模型名，而是建立可审计的数据谱系、成本配平和跨场景可靠性证据，让“系统更强”能够被拆解成可复验的科学结论。

## 10. 逐篇精读索引

### 架构与 GPT 路线

1. [Attention Is All You Need](/posts/attention-is-all-you-need/)
2. [GPT-1：Improving Language Understanding by Generative Pre-Training](/posts/gpt-1-generative-pretraining/)
3. [GPT-2：Language Models are Unsupervised Multitask Learners](/posts/gpt-2-unsupervised-multitask-learners/)
4. [GPT-3：Language Models are Few-Shot Learners](/posts/gpt-3-few-shot-learners/)
5. [InstructGPT](/posts/instructgpt/)
6. [GPT-4 Technical Report](/posts/gpt-4-technical-report/)

### 开放基座与 Qwen 路线

7. [LLaMA](/posts/llama-foundation-models/)
8. [Qwen Technical Report](/posts/qwen-technical-report/)
9. [Qwen2 Technical Report](/posts/qwen2-technical-report/)
10. [Qwen2.5 Technical Report](/posts/qwen25-technical-report/)
11. [Qwen3 Technical Report](/posts/qwen3-technical-report/)

### DeepSeek 路线

12. [DeepSeek LLM](/posts/deepseek-llm/)
13. [DeepSeek-V2](/posts/deepseek-v2/)
14. [DeepSeek-V3](/posts/deepseek-v3/)
15. [DeepSeek-R1](/posts/deepseek-r1/)

## 11. 检索与核验说明

- **检索式族**：逐篇 exact-title + official paper / technical report / official code / model card；并用作者机构、arXiv、NeurIPS/PMLR/Nature 等正式记录核出版状态。
- **来源层级**：论文与附录优先；正式出版页核元数据/DOI；作者官方仓库与模型页核代码、权重和许可证。第三方榜单、媒体摘要和复现仓库不承担核心事实。
- **版本控制**：逐篇记录 arXiv 版本、正式 venue、仓储 DOI 与正式 article DOI 的区别；技术报告不写成同行评审论文。
- **全文状态**：15/15 纳入工作均完成正文与关键附录阅读；每篇保留 1–2 张原论文关键图表，详细页记录图号和来源。
- **综述性质**：这是围绕代表性转折点的定向历史综述，不是穷尽所有 LLM 的系统综述；选择标准重“路线变化”而非模型榜单名次。

## 参考文献

1. Vaswani, A. et al. Attention Is All You Need. *NeurIPS* (2017). [正式论文](https://papers.nips.cc/paper/7181-attention-is-all-you-need)；[arXiv / DataCite DOI](https://doi.org/10.48550/arXiv.1706.03762)。
2. Radford, A. et al. Improving Language Understanding by Generative Pre-Training (2018). [OpenAI PDF](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)。
3. Radford, A. et al. Language Models are Unsupervised Multitask Learners (2019). [OpenAI PDF](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)。
4. Brown, T. B. et al. Language Models are Few-Shot Learners. *NeurIPS* (2020). [正式论文](https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html)。
5. Ouyang, L. et al. Training language models to follow instructions with human feedback. *NeurIPS* (2022). [正式论文](https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html)。
6. OpenAI. GPT-4 Technical Report (2023). [官方研究页](https://openai.com/index/gpt-4-research/)；[arXiv](https://arxiv.org/abs/2303.08774)。
7. Touvron, H. et al. LLaMA: Open and Efficient Foundation Language Models (2023). [arXiv](https://arxiv.org/abs/2302.13971)。
8. Bai, J. et al. Qwen Technical Report (2023). [arXiv](https://arxiv.org/abs/2309.16609)。
9. Yang, A. et al. Qwen2 Technical Report (2024). [arXiv](https://arxiv.org/abs/2407.10671)。
10. Qwen Team. Qwen2.5 Technical Report (2025, v2；v1 2024). [arXiv](https://arxiv.org/abs/2412.15115)。
11. Yang, A. et al. Qwen3 Technical Report (2025). [arXiv](https://arxiv.org/abs/2505.09388)。
12. DeepSeek-AI. DeepSeek LLM: Scaling Open-Source Language Models with Longtermism (2024). [arXiv](https://arxiv.org/abs/2401.02954)。
13. DeepSeek-AI. DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model (2024). [arXiv](https://arxiv.org/abs/2405.04434)。
14. DeepSeek-AI. DeepSeek-V3 Technical Report (2024). [arXiv](https://arxiv.org/abs/2412.19437)。
15. DeepSeek-AI. DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning. *Nature* 645, 633–638 (2025). [正式论文与 DOI](https://doi.org/10.1038/s41586-025-09422-z)；[扩展技术报告](https://arxiv.org/abs/2501.12948)。
