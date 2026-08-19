---
title: "精读｜Inner Monologue：把环境反馈持续写回语言模型的具身规划"
date: 2026-08-19
permalink: /posts/inner-monologue/
tags: [literature-note, inner-monologue, embodied-ai, embodied-agent, llm, feedback, closed-loop-planning]
note_type: single-paper
literature_topics:
  - embodied-ai
  - embodied-agent
  - llm
excerpt: "精读 Inner Monologue 的成功反馈、被动场景反馈与主动问答，并核对 Ravens、真实桌面、真实厨房实验及人工 oracle 边界。"
---

> **阅读范围**：CoRL 2022 / PMLR 正文与附录共 14 个 PDF 物理页，覆盖三种反馈、三个机器人域、全部主表、失败分析和提示案例；另核验 PMLR、arXiv 与作者项目页。<br>
> **检索日期**：2026-08-19<br>
> **版本口径**：以 PMLR 正式版本为主；arXiv 截至检索日只有 v1。未发现正式勘误、撤稿或替换声明。<br>
> **核心问题**：开环 LLM 计划无法知道对象是否移动、技能是否失败或任务进展到哪里；如果把这些状态转成自然语言并不断追加到上下文，LLM 能否据此修正后续行为？

## 文献档案

- **论文**：*Inner Monologue: Embodied Reasoning through Planning with Language Models*。
- **作者**：Wenlong Huang、Fei Xia、Ted Xiao、Harris Chan、Jacky Liang、Pete Florence、Andy Zeng、Jonathan Tompson、Igor Mordatch、Yevgen Chebotar、Pierre Sermanet、Noah Brown、Tomas Jackson、Linda Luu、Sergey Levine、Karol Hausman、Brian Ichter；前三位共同一作并按字母顺序排列。
- **机构**：Robotics at Google。
- **年份 / 发表**：CoRL 2022；PMLR 205:1769–1782，2023。
- **文献链接**：[PMLR 论文页](https://proceedings.mlr.press/v205/huang23c.html) · [正式 PDF](https://proceedings.mlr.press/v205/huang23c/huang23c.pdf) · [作者项目页](https://innermonologue.github.io/) · [arXiv:2207.05608](https://arxiv.org/abs/2207.05608)。
- **DOI**：PMLR 未分配出版商 DOI；[10.48550/arXiv.2207.05608](https://doi.org/10.48550/arXiv.2207.05608) 是 arXiv 仓储 DOI。
- **代码链接**：截至检索日，PMLR、arXiv、作者项目页与 Google Research 页面均未提供官方代码仓库；因此本文不把第三方复现标成官方代码。

## 核心结论

Inner Monologue 不是一个固定网络架构，而是一种**提示时反馈协议**：机器人每执行一步，就把“技能成功/失败”“当前有哪些对象/任务进度”或“模型主动询问后得到的答案”写成文本，追加进 LLM 上下文，再让模型决定下一步。它把原本开环的语言规划变成技能级闭环，而不更新 LLM 参数。

在真实桌面任务中，开放式 LLM 计划加对象反馈只有 20% 成功；对象 + 成功反馈的 Inner Monologue 达到 **90%**。在真实厨房 120 次评测中，SayCan 为 **30.8%**，加入成功反馈为 48.7%，再加入对象反馈为 **60.4%**。扰动下的 mobile manipulation 从 SayCan 的 0% 提升到 75%，显示显式状态文本能帮助 LLM 改计划。

然而反馈来源并不统一：Ravens 使用脚本/近 oracle 状态，真实桌面用 MDETR 和启发式成功检测，真实厨房的对象反馈由人手工提供；三个域还使用不同 LLM 和控制器。因此论文证明“合适的文本反馈可以改善这些系统”，没有证明一个完全自动、统一的 Inner Monologue 模型已在真实厨房闭环运行。

## 检索记录

- **检索式**：准确题名、`Inner Monologue CoRL PMLR`、`Inner Monologue embodied reasoning code`、`huang23c correction erratum retraction`。
- **主证据**：PMLR 元数据与全文、作者项目页、arXiv v1。
- **全文状态**：方法、Ravens、真实桌面、真实厨房、提示样例、失败原因与反馈来源均已读。
- **代码审计**：官方一手页面未发现仓库；只记录“未公开”，不以第三方仓库代替。
- **更正审计**：截至检索日未发现 correction、erratum、withdrawal 或 retraction。
- **排除**：非官方实现、视频转述与自动摘要不用于实验数字。

## 研究背景

早期 LLM 机器人规划通常先生成一串技能，再按顺序执行。物理世界一旦偏离假设——抓取失败、用户移走物体、抽屉没打开——语言模型仍会沿旧计划前进。传统机器人闭环控制会观测误差并修正，但这些连续信号未必能直接被 LLM 消费。

Inner Monologue 选择一个简单接口：把世界变化压缩成自然语言。文本与 LLM 的预训练模态一致，也能直接进入现有 few-shot prompt；代价是几何、置信度与时序信息会被离散描述丢失。论文的研究重点不是训练新的世界模型，而是验证“state-to-language feedback”能否激活 LLM 已有的推理与恢复能力。

## 研究问题

1. 二值技能成功反馈是否足以让 LLM 在失败后重试或改变策略？
2. 当前对象与任务进度的被动场景反馈能否处理扰动和部分可观测？
3. LLM 主动提出问题、由人或 VQA 回答，能否补充任务特定状态？
4. 反馈是否在仿真、桌面和移动操作三类系统中都带来一致增益？
5. 哪些失败来自 LLM、场景描述器与低层控制，反馈又在哪些条件下无效？

## 方法与数据

![Inner Monologue 在提示上下文中持续加入环境反馈](/images/literature-notes/inner-monologue/method-overview.png)

*图 1｜LLM 生成计划步骤，机器人执行后把成功和场景信息作为“内心独白”写回上下文，再生成下一步；不同实验实例化了不同反馈源。来源：原论文 Figure 3，PDF 物理页 4。[原文 PDF](https://proceedings.mlr.press/v205/huang23c/huang23c.pdf#page=4)*

### 1. 通用循环

给定任务 $i$、已执行技能历史 $h_t$ 和文本反馈 $f_{1:t}$，LLM 在技能级产生下一动作：

$$
l_{t+1}\sim p_{\mathrm{LLM}}(l\mid i,h_t,f_{1:t}).
$$

低层策略执行 $l_{t+1}$ 后，反馈模块把新观测映射成文本 $f_{t+1}$，再追加到 prompt。论文没有提出新的语言模型训练损失，性能来自上下文更新和已有技能库。

### 2. 三种反馈

- **Success feedback**：报告刚执行技能是否成功。它帮助模型重试、换对象或跳过已完成步骤，但只给一个二值结果时无法解释失败原因。
- **Passive scene feedback**：系统主动列出场景对象、关系或任务进度，例如“桌上现在有红色积木，蓝色碗为空”。它不需要 LLM 先问，但文本长度随场景复杂度增长。
- **Active scene feedback**：LLM 生成问题，外部人类或 VQA 回答，再继续规划。它能按需获取信息，却把性能依赖转移到问答质量和人工可用性。

论文标题中的“inner monologue”因此是外部感知器提供的文本化状态，不是模型内部 chain-of-thought 的可验证读取。

### 3. 三个实验域不是同一端到端系统

| 域 | LLM | 反馈源 | 低层执行 |
|---|---|---|---|
| Ravens 仿真 | InstructGPT | 脚本化 Object / Success / Scene | 预训练语言条件 pick-place policy |
| 真实桌面 | InstructGPT | MDETR 对象检测 + bbox 启发式成功判断 | 吸盘抓放 primitive |
| 真实厨房 | PaLM + SayCan affordance | 学习的 success detector + **人工 Object 描述** | 移动操作、抽屉等技能库 |

不同组件使论文更像框架验证而非统一模型 benchmark。特别是厨房中最强 `Object + Success` 设置需要人工场景文本，不能称为完全自主 perception-to-action 系统。

### 4. 执行粒度

每次 LLM 只决定下一项语言技能，低层 policy 在一段时间内执行；完成后才反馈和重规划。它比开环计划更闭环，却不是 50–100 Hz 的连续视觉控制。若短技能内部发生碰撞或状态快速变化，语言层通常来不及介入。

## 实验

### 1. Ravens 仿真

评测 4 个 seen tasks 和 4 个 unseen tasks，每任务 50 episodes。作者向物体位置加入像素噪声 $\mathcal N(0,3)$，向 heatmap 加 $\mathcal N(0,2.5)$，向放置位置加 $\mathcal N(0,0.02\,\mathrm m)$，以模拟感知/控制误差。

代表性成功率：

| 任务 | CLIPort | Oracle plan | Object | Object + Success | Object + Scene |
|---|---:|---:|---:|---:|---:|
| Seen pick-and-place | 24% | 74% | 80% | 90% | **94%** |
| Seen stack-all | 2% | 32% | 4% | 10% | **26%** |
| Unseen matching bowls | 0% | 0% | 56% | 70% | **82%** |
| Unseen mismatched bowls | 0% | 0% | 62% | 76% | **86%** |
| Unseen stack corner | 0% | 0% | 0% | 4% | **6%** |

反馈显著改善需要对象重配对的任务，但几乎没有解决困难堆叠；这表明语言层恢复不能代替精确低层控制。

### 2. 真实桌面

每个任务/设置运行 10 次，控制噪声为标准差 4 mm 并截断在 $2\sigma$。总成功率：

| 设置 | 成功率 |
|---|---:|
| Open-loop LLM + Object | 20% |
| Inner Monologue + Object | 45% |
| Inner Monologue + Success | 40% |
| Inner Monologue + Object + Success | **90%** |

具体到 stacking 与 sorting，完整反馈分别为 100% 和 80%；open-loop 都只有 20%。结果显示两类反馈一起用远强于单用，但试验规模小，一个 trial 就对应 10 个百分点。

### 3. 真实厨房：120 次评测

厨房系统在三类任务上分别测试正常设置与外部人工扰动，总计 120 次。

![Inner Monologue 真实厨房成功率与失败类型](/images/literature-notes/inner-monologue/main-results.png)

*图 2｜左表显示 SayCan、成功反馈及对象+成功反馈的 120 次平均结果；右图把失败分为 LLM、场景描述、控制与成功。扰动条件下，显式反馈的优势更大。来源：原论文 Table 3 与 Figure 4，PDF 物理页 7。[原文 PDF](https://proceedings.mlr.press/v205/huang23c/huang23c.pdf#page=7)*

| 设置 | 总成功率 |
|---|---:|
| SayCan | 30.8% |
| + Success | 48.7% |
| + Object + Success | **60.4%** |

无扰动时，完整反馈在 manipulation、mobile manipulation、drawers 上分别为 75%、75%、100%；有扰动时分别为 33.3%、75%、44.4%。对应 SayCan 在扰动下只有 12.5%、0%、0%。

这些数据支持对象文本能让规划器应对部分外部变化，但厨房 Object feedback 是人工输入。最强 60.4% 不是自动视觉场景描述器的性能上限。

### 4. 失败分析与“涌现”案例

作者将失败分为 LLM、scene description 与 low-level control。反馈减少了部分语言规划失败，但检测错误和控制失败仍存在；LLM 有时还会忽略已经写入上下文的反馈，或对不在场景中的对象继续规划。

论文展示了模型从反馈中做复杂推断、主动提问或重新安排任务的 qualitative cases，并称其为 emergent reasoning。作者也说明，没有针对性 prompt examples 时这些行为并不一致。它们没有与主表同规模量化，不应升级为稳定能力结论。

## 主要发现

1. **把反馈写回文本能显著改善技能级恢复**：桌面完整反馈 90%，厨房从 30.8% 提至 60.4%。
2. **对象状态与成功信号互补**：一个描述“世界是什么”，一个描述“刚才做成没有”。
3. **反馈价值在扰动下最明显**：厨房 mobile manipulation 从 0% 到 75%。
4. **语言反馈不能修复低层技能**：Ravens 困难堆叠仍只有 6%，控制瓶颈清楚存在。
5. **自动化程度影响结论**：最强厨房结果依赖人工对象描述，三域也不是同一系统。

## 结论

Inner Monologue 将具身 LLM 从“先计划、后盲目执行”推进到“执行一步、描述世界、再计划”。它展示了一种低成本通用接口：不重新训练 LLM，只要把可靠感知或任务进度翻译成文本，就可能调用模型已有的常识进行恢复。

论文的最强结论应限定为：**在技能边界，文本化成功与场景反馈能提高多种已有机器人系统的鲁棒性**。它还没有证明开放世界状态能被自动、无损地语言化，也没有给出连续安全控制方案。

## 局限与适用边界

### 作者明确承认的局限

- 仿真与厨房部分依赖 oracle 或人工 scene descriptions，自动感知仍未解决。
- success detector、object detector 或 VQA 错误会向 LLM 提供错误事实。
- LLM 有时忽略反馈、错误引用不在场对象，且“涌现”推理依赖提示示例。
- 低层控制能力仍是上限；语言重规划无法完成技能本身做不到的精细操作。

### 额外证据审计

- 三个域使用不同 LLM、反馈器、技能库和控制器，不能把增益解释为一个固定架构的统一泛化。
- 厨房最强设置有人工 Object feedback，人类投入和响应延迟没有量化。
- 真实桌面每设置每任务 10 次，厨房也未报告置信区间、训练种子或显著性检验。
- 人为扰动是设计好的实验事件，不等于真实家庭环境的长尾变化。
- 文本化状态会丢失几何、置信度、时间连续性和多模态歧义；错误文本可能比缺少文本更危险。
- 没有独立安全反馈、碰撞监测或风险约束；技能级响应可能晚于物理事故。
- 官方代码未公开，完整提示、反馈实现与机器人栈难以复现。

## 我的思考

Inner Monologue 的路线今天仍然成立，但“把一切变成文本”不应成为终点。更好的 agent 可以同时保留：

- 结构化符号状态，用于可验证前/后置条件；
- 三维地图或视觉 token，用于几何与不确定性；
- 文本摘要，用于 LLM 的高层推理；
- 独立安全监控，用于毫秒级停止和约束。

与 ProgPrompt 相比，Inner Monologue 强调执行后的持续反馈；与 VoxPoser 相比，它的接口更通用却损失空间精度；与 SayCan 相比，它把环境状态真正放进 LLM 上下文。未来关键不只是“有反馈”，而是反馈是否自动、校准、可验证，以及代理是否知道何时不该相信它。

## 参考文献

1. Huang, W. et al. *Inner Monologue: Embodied Reasoning through Planning with Language Models*. CoRL 2022, PMLR 205:1769–1782 (2023). [PMLR](https://proceedings.mlr.press/v205/huang23c.html) · [PDF](https://proceedings.mlr.press/v205/huang23c/huang23c.pdf)
2. Huang, W. et al. *Inner Monologue*, arXiv:2207.05608v1. [arXiv](https://arxiv.org/abs/2207.05608)
3. Robotics at Google. *Inner Monologue project page*. [Project](https://innermonologue.github.io/)
