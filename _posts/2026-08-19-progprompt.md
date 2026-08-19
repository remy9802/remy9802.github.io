---
title: "精读｜ProgPrompt：把机器人计划写成带注释、断言与恢复动作的程序提示"
date: 2026-08-19
permalink: /posts/progprompt/
tags: [literature-note, progprompt, embodied-ai, embodied-agent, llm, robot-planning, program-prompting]
note_type: single-paper
literature_topics:
  - embodied-ai
  - embodied-agent
  - llm
excerpt: "精读 ProgPrompt 的程序化提示、自然语言注释、可执行断言与真实机器人实验，并区分语义反馈闭环和连续控制闭环。"
---

> **阅读范围**：Autonomous Robots 扩展期刊版全文 14 个 PDF 物理页，含方法、VirtualHome、跨环境、实机实验、消融和失败分析；另核验 Springer 元数据、作者项目页与 NVLabs 官方代码。<br>
> **检索日期**：2026-08-19<br>
> **版本口径**：精读对象为 2023 年 Springer 扩展期刊版，而非只读较短的 ICRA 会议版；会议版作为版本沿革记录。截至检索日未发现正式勘误、撤稿或替换声明。<br>
> **核心问题**：纯自然语言提示容易生成不可执行、缺步骤的机器人计划；把示例写成类似 Python 的程序，并加入注释、前置条件断言与恢复动作，能否让 LLM 更好地遵守环境和机器人约束？

## 文献档案

- **论文**：*ProgPrompt: Program Generation for Situated Robot Task Planning Using Large Language Models*。
- **作者**：Ishika Singh、Valts Blukis、Arsalan Mousavian、Ankit Goyal、Danfei Xu、Jonathan Tremblay、Dieter Fox、Jesse Thomason、Animesh Garg。
- **机构**：University of Southern California、NVIDIA Seattle Robotics Lab、University of Washington、Georgia Institute of Technology。
- **年份 / 发表**：*Autonomous Robots* 47, 999–1012（2023）；在线发表 2023-08-28。
- **文献链接**：[Springer 正式页面](https://link.springer.com/article/10.1007/s10514-023-10135-3) · [正式 PDF](https://link.springer.com/content/pdf/10.1007/s10514-023-10135-3.pdf) · [作者项目页](https://progprompt.github.io/)。
- **DOI**：[期刊扩展版 10.1007/s10514-023-10135-3](https://doi.org/10.1007/s10514-023-10135-3)；较短 ICRA 2023 版的 DOI 是 [10.1109/ICRA48891.2023.10161317](https://doi.org/10.1109/ICRA48891.2023.10161317)。
- **代码链接**：[NVlabs/progprompt-vh](https://github.com/NVlabs/progprompt-vh)。官方仓库只提供 VirtualHome 复现代码；真实 Franka 机器人感知、抓取、运动规划与部署栈没有随仓库开放。

## 核心结论

ProgPrompt 不训练新模型，而是把提示词组织成一个“可执行任务程序”：开头导入机器人动作原语并列出场景对象，随后给出三个示例函数；函数内用自然语言注释标记子目标，用 `assert` 表达动作前置条件，并在断言失败时附带恢复动作。LLM 据此一次性生成新任务的程序，执行器逐条调用动作；需要时再用 LLM 根据当前语义状态判断断言。

在 VirtualHome 的 10 个任务、每任务 5 次评测中，GPT-3 完整版本得到 **0.34 success rate、0.84 executability、0.65 goal-condition recall**；去掉执行反馈后成功率降至 0.28，同时去掉注释和反馈则降至 0.18。结果支持注释与前置条件反馈有互补价值，但绝对任务成功率仍低，最长的多个任务成功率为 0。

真实 Franka Panda 部分只有 9 个场景—任务条件、每格一次试验：规划成功 8/9、执行成功 7/9；而且因状态跟踪不可靠，实机版没有启用论文的 assertion feedback。因此它是可行性展示，不能作为强实机可靠性证据。

## 检索记录

- **检索式**：准确题名、`ProgPrompt Autonomous Robots 2023`、`ProgPrompt ICRA DOI`、`ProgPrompt official code`、两条 DOI 的 correction/erratum/retraction。
- **主证据**：Springer Version of Record、项目页、NVLabs 官方仓库；ICRA 页面仅用于核验版本沿革。
- **全文状态**：14/14 个 PDF 物理页已读，覆盖全部主表、任务明细、提示结构、跨环境和实机配置。
- **更正审计**：截至检索日，Springer、项目页与官方仓库未显示 correction、erratum、withdrawal 或 retraction。
- **开放资源审计**：代码只覆盖 VirtualHome；实机模型/配置不可完整复现。
- **排除**：第三方摘要与非官方实现不用于实验数字和开放状态。

## 研究背景

LLM 能列出“做吐司”的大致步骤，却可能漏掉拿起面包、在手为空时调用放置、引用场景中不存在的对象，或者生成机器人没有的动作。只在提示词中写自然语言示例，结构约束弱，也很难将计划直接交给执行器。

程序表示恰好提供三类有用偏置：计划预期只调用已导入的 API，参数由提示中的对象列表约束，控制流可以显式表达前置条件与失败恢复。ProgPrompt 比 Code as Policies 更聚焦于**离散长时程任务规划**：它生成一个完整计划程序，而不是开放使用 NumPy/几何库构造连续控制策略；反馈也主要在 `assert` 处检查语义状态。

## 研究问题

1. 程序化提示是否比自然语言步骤更能约束动作名、对象和顺序？
2. 注释形式的子目标能否帮助 LLM组织较长计划？
3. 断言与恢复动作能否在执行时避免前置条件错误？
4. 少量固定示例能否跨 VirtualHome 环境泛化，并迁移到真实机器人？
5. 计划成功、动作可执行和目标条件覆盖这三种指标会揭示怎样的失败差异？

## 方法与数据

![ProgPrompt 的程序化提示与执行流程](/images/literature-notes/progprompt/method-overview.png)

*图 1｜提示词由可用动作、可见对象和示例程序组成；程序中的注释表达子目标，断言检查前置条件并触发恢复动作。来源：扩展期刊版 Figure 2，PDF 物理页 4。[正式 PDF](https://link.springer.com/content/pdf/10.1007/s10514-023-10135-3.pdf#page=4)*

### 1. 提示词作为机器人程序规范

每个 prompt 含三部分：

1. **Import / API**：列出约 10 种离散动作原语，如 walk、grab、open、put；
2. **Objects**：列出当前环境约 115 个独特对象实例，让 LLM 尽量只引用可见实体；
3. **Examples**：三个固定任务程序，展示函数签名、动作调用、注释、断言和恢复。

新任务被写成函数名或自然语言说明，LLM 续写整个函数体。论文比较 GPT-3、Codex、text-davinci-003 和 GPT-4，不微调模型。

### 2. 注释是语义级子目标

程序中的自然语言注释如 `# Find the salmon`、`# Put salmon in the fridge`，既把长任务切成局部阶段，也向 LLM 提供比动作 token 更丰富的常识。消融显示去掉注释会降低成功和 executability，但注释不由环境验证，也可能描述已经偏离实际状态的意图。

### 3. 断言与恢复动作

在关键动作前，程序写出类似“手中是否已有目标”“容器是否打开”的 assertion。执行器将当前离散语义状态和断言交给另一个 LLM query 判断真伪；若失败，先执行提示中生成的 recovery action，再继续主程序。

因此所谓 feedback 是**动作前置条件层面的离散语义反馈**。它不是视觉伺服、连续轨迹纠偏，也不检查动作执行后的真实成功；如果 VirtualHome 动作返回可执行但没有达成预期状态，系统可能继续向下运行。

### 4. 训练与推理

| 环节 | 训练 | 推理 |
|---|---|---|
| LLM | 使用现成模型，不微调 | 根据 3 个程序示例生成完整计划；另用于断言判断 |
| 环境表示 | 无学习 | 对象清单和离散语义状态写入 prompt |
| 低层动作 | VirtualHome 原语或实机预置模块 | 顺序执行计划，断言失败时恢复 |

实机使用 Franka Panda，ViLD 做开放词汇检测，Contact-GraspNet 生成抓取，SceneCollisionNet 检测碰撞，MPPI 做运动规划。为了缩小落差，只开放 `grab_and_putin` 复合原语；由于实机状态跟踪不可靠，作者关闭断言反馈。这意味着实机并没有验证完整 ProgPrompt 闭环。

## 实验

### 1. VirtualHome 协议

VirtualHome 有三个环境、115 个独特对象实例和 10 个动作原语。主表在 Environment 0 上选 10 个家庭任务，每个模型/设置运行 5 次；提示中固定三个示例。指标为：

- **SR**：最终是否满足完整任务目标；
- **Exec**：生成动作中可被模拟器执行的比例；
- **GCR**：目标条件被满足的召回率。

![ProgPrompt 主实验与消融](/images/literature-notes/progprompt/main-results.png)

*图 2｜完整 ProgPrompt 在多种 LLM 上均优于自然语言基线；GPT-3 的注释/反馈消融显示两者都有贡献。每个主设置只有 10 个任务 × 5 次。来源：扩展期刊版 Table 1，PDF 物理页 6。[正式 PDF](https://link.springer.com/content/pdf/10.1007/s10514-023-10135-3.pdf#page=6)*

| 模型 / 变体 | SR | Exec | GCR |
|---|---:|---:|---:|
| GPT-4，注释 + 反馈 | 0.37 ± 0.06 | **0.87 ± 0.01** | 0.64 ± 0.02 |
| text-davinci-003，注释 + 反馈 | **0.47 ± 0.15** | 0.85 ± 0.02 | **0.74 ± 0.07** |
| Codex，注释 + 反馈 | 0.40 ± 0.11 | **0.90 ± 0.05** | 0.72 ± 0.09 |
| GPT-3，注释 + 反馈 | 0.34 ± 0.08 | 0.84 ± 0.01 | 0.65 ± 0.05 |
| GPT-3，无反馈 | 0.28 | 0.82 | 0.56 |
| GPT-3，无注释、有反馈 | 0.30 | 0.65 | 0.58 |
| GPT-3，无注释、无反馈 | 0.18 | 0.68 | 0.42 |
| LangPrompt | 0 | 0.36 | 0.42 |
| Huang et al. baseline | 0 | 0.45 | 0.21 |

完整 GPT-3 比两项都去掉高 16 个成功率百分点，并把 executability 从 0.68 提到 0.84。因每个设置的任务和重复数有限，论文的均值/标准差不能替代跨新任务分布的大规模置信区间。

### 2. 任务级负结果

GPT-3 完整版只在 brush teeth（0.8）、throw away apple（1.0）和 put salmon in fridge（1.0）上出现较高成功；make toast、eat chips、wash plate、coffee with cupcake、microwave salmon 等多个任务成功率均为 0。尤其是 11–18 动作的 wash plate 与 microwave salmon，即使 executability 仍较高，也没有完成全部任务条件。

这说明“动作可以执行”远弱于“长任务完成”：漏一个目标条件、计划被 token 上限截断，或某一步语义结果不正确，都可能让最终 SR 归零。

### 3. 跨环境与实机

同一 10 任务 × 5 次协议下，GPT-3 完整版在 Environment 0 的 SR 为 0.34，在 Environment 1 和 2 均为 0.56。该结果说明对象清单更新后提示能适应不同房屋布局，但环境 1/2 分数更高也可能来自任务实例难度差异，不能只归因于“泛化提升”。

实机 9 个场景—任务组合中，计划层成功 8/9，最终执行 7/9。每格只有一次尝试，没有基线、误差条或随机化；且动作空间只剩一个复合原语、feedback 被关闭。合理表述是“展示了从 VirtualHome 程序接口迁移到 Franka 的可行性”，不是“验证了约 78% 的稳健实机成功率”。

## 主要发现

1. **程序语法是一种有效结构先验**：相比自然语言计划，动作名、对象与执行顺序更容易被解析和约束。
2. **注释与反馈互补**：前者帮助语义分解，后者修复部分前置条件；完整设置优于两项消融。
3. **高 executability 不等于任务成功**：多个长任务 Exec 较高但 SR 为 0，是论文最重要的负结果。
4. **模型更强不保证单调最优**：该小样本上 text-davinci-003 的 SR 高于 GPT-4，说明提示与任务适配不可忽略。
5. **实机只验证弱版本**：没有 assertion feedback，只有复合抓放原语，不能支持完整闭环的实机结论。

## 结论

ProgPrompt 证明，把提示写成机器人可执行程序而非散文式步骤，能显著改善计划的格式、前置条件和部分错误恢复。它的贡献更偏向提示表示和任务级编排，而不是低层控制学习。

最准确的定位是**带语义断言的开环程序计划器**：计划整体一次生成，只在显式断言点查询离散状态；它尚未实现持续视觉反馈或动作结果验证。

## 局限与适用边界

### 作者明确承认的局限

- 需要把连续机器人世界离散成动作原语、对象列表和语义状态，接口设计成本高。
- 主计划仍是一次性生成，动作后果反馈不足；只检查前置条件不能保证动作成功。
- token 上限会截断长程序，复杂环境和模拟器 artifact 会导致失败。
- LLM 仍可能 hallucinate 对象、动作或缺失步骤，没有正确性保证。
- 实机感知不足以可靠支持断言，因此关闭了论文关键反馈机制。

### 额外证据审计

- 断言真值由另一次 LLM query 判断，而非形式化符号执行器，可能把一个语言错误换成另一个语言错误。
- 10 个主任务、每任务 5 次规模较小；没有独立测试集、显著性检验或完整逐次日志。
- exact final-goal 指标会把“部分正确但漏一个条件”全部记失败，论文没有人类偏好或柔性任务质量对照。
- 不同 LLM 为外部专有服务，版本漂移、采样接口和提示细节影响复现。
- 实机每条件一次、无完整 feedback、无强基线，不能推断部署可靠性。
- 官方代码只复现 VirtualHome，真实系统依赖模型和配置未开放。
- 没有安全约束、碰撞风险分析或失败恢复的最坏情况保证。

## 我的思考

ProgPrompt 最有价值的思想是把“机器人提示词”当成接口规范：imports 限定能力，objects 限定引用范围，comments 表达意图，assertions 暴露执行假设。若把这一路线现代化，应让断言由类型化世界状态和可验证谓词执行，并在每个动作后检查 postcondition，而非再次询问 LLM。

与其它奠基路线相比，它处在 SayCan 的技能选择和 CaP 的开放代码生成之间：动作 API 仍离散受控，但完整程序可带控制结构；反馈比 SayCan 更显式，却不如 Inner Monologue 持续，也没有 VoxPoser 的连续三维表示。

## 参考文献

1. Singh, I. et al. *ProgPrompt: Program Generation for Situated Robot Task Planning Using Large Language Models*. Autonomous Robots 47, 999–1012 (2023). [DOI](https://doi.org/10.1007/s10514-023-10135-3) · [Springer](https://link.springer.com/article/10.1007/s10514-023-10135-3) · [PDF](https://link.springer.com/content/pdf/10.1007/s10514-023-10135-3.pdf)
2. Singh, I. et al. ICRA 2023 conference version, 11523–11530. [DOI](https://doi.org/10.1109/ICRA48891.2023.10161317)
3. NVIDIA Research. *ProgPrompt project and VirtualHome code*. [Project](https://progprompt.github.io/) · [GitHub](https://github.com/NVlabs/progprompt-vh)
