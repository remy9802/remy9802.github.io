---
title: "文献笔记｜Qwen3 Technical Report：统一思考模式、强弱蒸馏与稀疏旗舰"
date: 2026-08-18
permalink: /posts/qwen3-technical-report/
tags: [literature-note, llm, qwen, reasoning-model, moe, grpo, distillation]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：arXiv v1 全文 35 页，包括架构、36T 预训练、四阶段旗舰后训练、强到弱蒸馏、思考预算、长上下文和多语言附录；同时核查官方代码页与初版旗舰模型卡。
>
> **检索日期**：2026-08-18。
>
> **主题**：Qwen3 如何在同一 checkpoint 中统一 thinking/non-thinking，并把旗舰模型的推理能力低成本迁移到 0.6B–30B-A3B？

## 文献档案

- **论文**：*Qwen3 Technical Report*
- **文献链接**：[arXiv:2505.09388](https://arxiv.org/abs/2505.09388) · [PDF](https://arxiv.org/pdf/2505.09388)
- **代码链接**：[QwenLM/Qwen3 官方仓库](https://github.com/QwenLM/Qwen3) · [Qwen3-235B-A22B 初版官方模型卡与文件](https://huggingface.co/Qwen/Qwen3-235B-A22B)
- **作者**：Qwen Team；核心贡献者以 An Yang、Anfeng Li、Baosong Yang 等署名，完整 core contributors 与 contributors 名单见原论文 §6。
- **机构 / 年份**：Qwen Team（阿里云通义千问团队；报告首页未按传统论文格式逐作者列单位）；2025。
- **出版状态**：arXiv 技术报告（2025-05-14，v1；PDF 首页日期 2025-05-15），未报告正式会议或期刊版本。`10.48550/arXiv.2505.09388` 为仓储 DOI。
- **版本说明**：本文只精读报告对应的首批 Qwen3 checkpoint。官方代码仓库后来纳入 Qwen3-2507 等更新版本；后续模型的训练、模式支持和指标不能倒填到这份 v1 报告。

## 核心结论

Qwen3 的中心创新位于后训练接口：旗舰 235B-A22B MoE 与 32B dense 先经 long-CoT cold start 和 reasoning GRPO 获得思考能力，再用 thinking-mode fusion 把带推理和不带推理的 SFT 合入同一模型，最后以覆盖 20 多类任务的 general RL 改善指令、偏好与 agent。`/think`、`/no_think` 和 thinking budget 让部署者在同一 checkpoint 中控制推理开销（原文 §4）。

小模型不重复完整四阶段，而是先蒸馏教师两种模式的输出，再让学生 on-policy 生成并对齐 Qwen3-32B/235B 的 logits。Qwen3-8B 的直接对照显示，on-policy distillation 用 1,800 GPU-hours，在所列任务上全面高于用 17,920 GPU-hours 的直接 RL；但这一结论只覆盖共同 off-policy 起点上的数学/代码 query，不是所有蒸馏与 RL 的普遍定律。

## 检索记录

- **数据源**：arXiv 元数据与 v1 PDF、Qwen 官方 GitHub、官方 Hugging Face 初版模型卡。
- **检索式**：`Qwen3 Technical Report 2505.09388 official repository Qwen3-235B-A22B`；`site:github.com/QwenLM/Qwen3 Qwen3 official`。
- **纳入原因**：Qwen 路线首次将显式推理、普通对话、推理预算和强弱蒸馏统一进整套 dense/MoE 家族。
- **排除**：Qwen3-2507、Qwen3-Next、后续 VL/Omni 等不用于解释 v1；第三方部署测评不作为原报告训练证据。
- **全文状态**：全文、2 幅主图、23 张正文/附录表及多语言附表均已阅读；官方仓库用于核验代码、权重和版本边界。
- **版本 / 更正审计**：arXiv 仅 v1；未见正式 venue、更正或撤稿。

## 研究背景

到 2025 年，通用 chat 模型与 reasoning model 通常是两个 checkpoint：前者回答快，后者输出长 CoT、在数学和代码上更强却延迟高。DeepSeek-R1 展示了可验证任务上的大规模 RL，QwQ-32B 展示了 Qwen 系推理模型；但真实产品仍需要针对简单问题快速回答、复杂问题深思，并在多轮对话中随用户意图切换。

另一个成本矛盾是，小模型若逐一重复冷启动、reasoning RL、融合和 general RL，研发与采样开销巨大。Qwen3 因此同时回答两个问题：如何把“是否思考”和“思考多久”做成接口；如何把旗舰训练得到的策略和 logits 迁移给边缘模型，而不是每个尺度重新探索。

## 研究问题

1. 同一参数集能否稳定服务 thinking 与 non-thinking 两种行为，并在多轮中按最后一个控制标记切换？
2. reasoning RL 如何从少量、严格可验证的 query-verifier 对获得可扩展推理？
3. thinking budget 是否形成平滑的推理时计算—性能曲线？
4. 对小模型，off-policy+on-policy distillation 是否比从同一起点直接 RL 更强、更省算力？
5. general RL 在提升指令/agent 能力时，会不会损伤已经学到的数学和代码推理？

## 方法与数据

![Qwen3 旗舰四阶段后训练与轻量模型蒸馏流程](/images/literature-notes/qwen3-technical-report/method-overview.png)

*图 1｜235B-A22B/32B 走 long-CoT→reasoning RL→模式融合→general RL；30B-A3B 及 14B 以下模型走强到弱蒸馏。来源：原论文图 1，PDF 物理页 9。[原文](https://arxiv.org/pdf/2505.09388)*

### 1. dense 与 MoE 架构

Dense 包含 0.6B、1.7B、4B、8B、14B、32B；MoE 为 30B-A3B 和 235B-A22B。全系列是 causal decoder-only Transformer，沿用 GQA、SwiGLU、RoPE、Pre-Norm+RMSNorm，但移除 Qwen2/2.5 的 QKV bias，并加入 QK-Norm 稳定 attention 训练。BBPE 词表为 151,669。

MoE 每层有 128 个专家、每 token 路由 top-8；与 Qwen2.5-MoE 不同，Qwen3 不设共享专家，并采用 global-batch load-balancing loss 鼓励专家分化。30B-A3B 总/激活参数约 30B/3B，235B-A22B 为 235B/22B。报告没有给相同激活 FLOPs 的 dense 端到端吞吐对照，“高效”仍需结合部署拓扑验证。

表 1–2 的标称 context：0.6B/1.7B 为 32K，其余为 128K。训练 recipe 则是末段 32K，加 YARN+DCA 做四倍推理外推；标称 128K 不是 128K 全程预训练。

### 2. 36T、多语言与模型生成数据

数据总计约 36T token、119 种语言/方言。Qwen2.5-VL 对大量 PDF 类文档做文字识别，Qwen2.5 再清理；Qwen2.5、Math 与 Coder 生成教材、QA、instruction 和代码等数万亿 token。超过 30T token 被按教育价值、学科/领域和安全等维度标注，再在小 proxy model 上做消融，以**样本级标签**而非仅来源/域级标签优化混合。

这条链路提高了可扩展性，也让生成器、OCR、清理器和标注器的偏差进入预训练分布。报告没有公开合成比例、PDF 权利清单、OCR 错误率、语言分布或样本级标签器精度，外部无法审计 119 种语言的实际数据均衡。

### 3. 三阶段预训练

S1 用超过 30T token、长度 4,096 学通用知识与 119 种语言；S2 用约 5T 更高质量 STEM、代码、推理和合成数据继续训练，仍为 4,096，并加快学习率衰减；S3 用数千亿长文本训练 32,768，其中 75% 长度 16,384–32,768，25% 为 4,096–16,384，RoPE base 由 10,000 提至 1,000,000，再用 YARN+DCA 四倍外推。

作者也按三个阶段分别拟合 dense/MoE 的学习率 schedule 和 batch scaling law；同 Qwen2.5 一样，没有公开拟合方程、预测误差或完整超参数表。

### 4. Stage 1：long-CoT cold start

数据覆盖数学、代码、逻辑与 STEM，必须有可验证答案或代码测试。Qwen2.5-72B-Instruct 先排除多子问、一般生成、不可验证或无需 CoT 就能答对的问题，并标注领域以平衡分布；QwQ-32B 为其余 query 生成 `N` 个候选。

响应过滤掉终答错误、严重重复、明显猜测、思考与摘要矛盾、语言/风格异常和疑似验证集相似项。作者刻意只选少量样本、少训练步：目标是注入推理格式和起点，不让 SFT 过早锁死探索空间。报告没有公开 `N`、最终样本数或步数。

### 5. Stage 2：reasoning RL

RL query 必须未用于 cold start、对当前模型可学、尽可能难且覆盖子领域。最终仅 3,995 个 query-verifier 对，用 GRPO 更新；作者报告大 batch、每 query 多 rollout 和 off-policy training 有利，并通过控制 entropy 维持或逐步增加来平衡探索。235B-A22B 的 AIME'24 从 70.1 提到 85.1，单次 run 共 170 个 RL step。

3,995 的“小数据”并不等于低计算：每题多次长推理 rollout，token 与 verifier 调用成本仍可能很高。报告没有给 rollout 数、平均思考长度、学习率、KL/clip、总 token 或 GPU-hours。

### 6. Stage 3：thinking mode fusion

在 reasoning-RL 模型上继续 SFT。Thinking 样本由 Stage 2 模型在 Stage 1 query 上 rejection sampling；non-thinking 覆盖代码、数学、指令、多语言、写作、QA 和角色扮演，并用自动 checklist 评价，低资源语言额外提高翻译比例。

模板在用户/system 输入中使用 `/think` 与 `/no_think`（实现中具体字符串以模型卡模板为准）；默认 thinking，可省略 `/think`。助手 thinking 响应用 `<think>…</think>`，non-thinking 仍保留空的 `<think></think>`，保证格式一致；多轮随机插入两种标记，模型遵循最后出现的标记。

Thinking budget 不是单独训练目标：当 reasoning token 达到阈值，外部停止思考并插入“时间有限、基于已有思考直接作答”的 stop-thinking 指令，模型再生成答案。作者称处理中间预算的能力由模式融合自然涌现，因此预算外推质量仍依赖模型能否从不完整推理收束。

### 7. Stage 4：general RL

奖励系统覆盖 20 多类任务，包括指令与格式遵循、开放偏好、真实环境中的多轮/多步工具调用，以及带防幻觉信号的 RAG 等专门场景。反馈分三类：格式/可验证任务用 rule reward；有参考答案但规则难写的任务让 Qwen2.5-72B-Instruct 参照答案评分；无参考答案的开放问题用人类偏好训练的标量 RM。

Agent rollout 能与真实环境多轮交互，这比只给静态 tool-call 字符串更接近决策过程；但环境集合、权限、失败恢复和安全隔离没有公开，无法判断向现实工具的泛化。

### 8. 强到弱蒸馏

0.6B/1.7B/4B/8B/14B 和 30B-A3B 先做 off-policy distillation：混合旗舰教师在 thinking/non-thinking 下的输出，使学生获得基本推理和模式切换。随后学生自己按两种模式生成 on-policy 序列，再让其 logits 对齐 Qwen3-32B 或 235B-A22B 教师 logits，以 KL divergence 训练。

它与普通“只模仿教师最终文本”不同：on-policy 输入状态来自学生分布，教师 logits 为学生已到达的每一步提供软目标，理论上减少 exposure mismatch；代价是需要访问大教师的全词表 logits，存储/计算开销高于只保存文本。

## 实验

![Qwen3-235B-A22B 随 thinking budget 的性能变化](/images/literature-notes/qwen3-technical-report/key-results.png)

*图 2｜AIME'24、AIME'25、LiveCodeBench v5 与 GPQA-Diamond 随 thinking budget 增大整体平滑提高；图只覆盖 1K–32K 范围，超过 32K 是作者未来工作而非已验证结论。来源：原论文图 2，PDF 物理页 20。[原文](https://arxiv.org/pdf/2505.09388)*

### 旗舰结果与协议边界

Qwen3-235B-A22B thinking 在 AIME'24/AIME'25 为 85.7/81.5、LiveCodeBench v5 为 70.7、CodeForces rating 2,056、BFCL v3 为 70.8；但 GPQA-Diamond 71.1、IFEval strict 83.4，低于表中部分闭源基线（表 11）。它对 DeepSeek-R1 的 23 项比较中赢 17 项，是在报告特定 prompt、采样和日期下的任务集合结论。

协议对 reasoning 分数影响很大：thinking 模式 temperature 0.6、top-p 0.95、top-k 20；non-thinking 为 0.7/0.8/20。两种模式最大输出 32,768，AIME 延至 38,912；AIME 每题采样 64 次再取平均 accuracy，CodeForces 每题最多 8 次尝试。不能把这些数字当作单次贪心、固定 token 成本的性能。

### 思考预算：存在平滑收益，但非免费

图 2 的四条曲线从 1K 增至 32K 时总体单调上升，说明同一 checkpoint 可通过更多生成 token 换取更高数学、代码和科学问答表现。图中没有延迟、能耗、每正确答案成本或任务自适应停止基线；因此它证明 inference-time scaling 存在，不证明总是经济最优。

### 蒸馏与直接 RL 的受控比较

在同一 off-policy distilled Qwen3-8B 起点上，直接 RL 使用 17,920 GPU-hours，AIME'24 67.6（pass@64 90.0）、AIME'25 55.5（83.3）、MATH500 94.8、LiveCodeBench 52.9、GPQA-Diamond 61.3。On-policy distillation 只用 1,800 GPU-hours，对应 74.4（93.3）、65.5（86.7）、97.0、60.3、63.3（表 21）。

这是强对照：蒸馏约用十分之一 GPU-hours 且所有列更高，pass@64 也增加，说明教师 logits 扩大了学生在这些任务上的有效探索。它只覆盖 math/code queries、单一 8B 学生和特定强教师，不能推出没有强教师时蒸馏仍优于 RL，也不能说明 student 可超越 teacher 的上限。

### 模式融合和通用 RL 的能力交换

Qwen3-32B 的 ThinkFollow 在 Stage 3 为 88.7，Stage 4 提至 98.9；ToolUse thinking 从 Stage 2 的 63.3，经 Stage 3 的 70.4 到 Stage 4 的 85.5。与此同时，thinking AIME'24 由 83.8→81.9→81.4，LiveCodeBench 由 68.4→67.2→65.7（表 22）。

作者明确接受这一 trade-off：通用、指令和 agent 能力变稳，但最难数学/代码推理有小幅退化。这是比最终总榜更可信的阶段消融，也说明“继续对齐”并不保证所有已有能力单调保持。

### 长上下文中，thinking 反而可能干扰检索

RULER 上 235B-A22B non-thinking 平均 95.0、128K 为 90.6；thinking（预算 8,192）为 92.2/86.0。多个尺度都呈现 thinking 略低，作者推测检索任务不需要长推理，额外思考会干扰取回（附录表 23）。Thinking 是任务条件变量，而非越多越好的全局开关。

## 主要发现

1. **推理模式成为可控接口。** 同一模型用模板标记和预算覆盖快答、深思与中间状态，减少双 checkpoint 部署成本。
2. **reasoning RL 依赖少量高质量 verifier，而非海量普通偏好。** 3,995 对足以推动 AIME，但 rollout 计算仍不可忽略。
3. **小模型更适合借用旗舰搜索结果。** 在给定 8B 对照中，on-policy logit distillation 比直接 RL 更强且约省一个数量级 GPU-hours。
4. **通用性与专门推理存在可测交换。** Stage 4 大幅提高 agent/指令，却让 AIME/代码略降。
5. **Thinking 应按任务选择。** 数学和代码随预算获益，长文检索反而可能受干扰。

## 结论

作者结论是：Qwen3 以 36T token、119 种语言、dense+MoE 家族、统一 thinking/non-thinking、可调 thinking budget 和强弱蒸馏，在数学、代码、agent 与多语言上达到强开放模型前沿，并以 Apache 2.0 发布首批权重。

证据支持的较窄结论是：报告给出一条相当完整的“可验证冷启动→reasoning RL→双模式融合→general RL”机制链，并通过阶段消融和 8B GPU-hours 对照验证核心选择；但数据、RL 超参数、总算力和环境未公开，跨专有 API 的 headline 比较也受采样预算与评测时点制约。

## 局限与适用边界

### 作者明确报告的局限

- Stage 3/4 会使困难 AIME 与 LiveCodeBench 的 thinking 表现下降；作者为整体通用性接受这一折中。
- 图 2 只验证到约 32K thinking budget；更长输出是否继续改善被留作未来工作。
- RULER 中 thinking 模式略低，作者计划改善长上下文 thinking。
- 未来仍需更高质量/更多样数据、架构压缩、极长上下文，以及基于环境反馈的 agent RL。

### 额外识别的局限

- 未公开 36T 数据的详细来源/语言/合成比例、去重与权利审计，也未报告完整预训练超参数、总 FLOPs 和碳成本。
- cold-start 样本数、QwQ 候选数 `N`、GRPO rollout/batch/学习率/KL 与 general-RL query/环境均缺失，无法端到端复现。
- 3,995 verifier 集偏数学、代码、逻辑/STEM，不能直接说明开放写作、事实更新或社会判断的推理质量。
- Thinking budget 通过外部截断并插入固定指令实现，不是显式成本条件化训练；过早截断可能留下未验证中间结论。
- 强弱蒸馏对照只有 8B、math/code 和特定教师；教师 logits 访问本身是一项高门槛资源。
- 多个闭源基线采用不同 API 快照、prompt 与未公开训练数据；AIME 64 次采样等预算也不能代表单次用户体验。
- 官方仓库持续更新，当前 Qwen3-2507 等版本不是报告中的初版 Qwen3；引用时必须写明 checkpoint。

## 路线关系

Qwen3 继承 Qwen2.5 的 GQA、长上下文外推、数据模型化过滤和 GRPO，但把 QwQ 式 reasoning 从专门 checkpoint 内化到通用模型。MoE 从共享+路由专家转为 128 个纯路由专家，后训练则与 DeepSeek-R1 的可验证 reasoning RL、传统 knowledge distillation 和通用偏好 RL 汇合，最终形成“旗舰探索、小模型蒸馏、同一模型按预算服务”的路线。

## 我的思考

Qwen3 最重要的实验不是与某个闭源模型谁高两分，而是表 21 和表 22：前者告诉我们在已有强教师时，学生没有必要重复昂贵探索；后者告诉我们部署需要的通用稳定性会真实消耗一部分专门推理能力。二者共同把模型研发从“单榜最强”改成了能力、成本和接口的多目标优化。

下一步应训练一个显式以预算为条件的 policy：输入预算/延迟目标，奖励同时包含正确性与 token 成本，并与固定截断、自然停止和任务路由器比较。这样才能判断 thinking budget 是用户手动旋钮，还是模型能自主决定“何时继续想、何时回答”的决策变量。

## 参考文献

1. Qwen Team. (2025). *Qwen3 Technical Report*. arXiv:2505.09388. [arXiv](https://arxiv.org/abs/2505.09388) · [PDF](https://arxiv.org/pdf/2505.09388) · [官方代码](https://github.com/QwenLM/Qwen3) · [初版旗舰模型](https://huggingface.co/Qwen/Qwen3-235B-A22B) · [仓储 DOI](https://doi.org/10.48550/arXiv.2505.09388)
