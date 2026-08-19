---
title: "精读｜Code as Policies：让语言模型生成可执行机器人策略代码"
date: 2026-08-19
permalink: /posts/code-as-policies/
tags: [literature-note, code-as-policies, embodied-ai, embodied-agent, llm, code-generation, robot-planning]
note_type: single-paper
literature_topics:
  - embodied-ai
  - embodied-agent
  - llm
excerpt: "精读 Code as Policies 的分层代码生成、语言模型程序调用、空间推理与机器人实验，并审计真实机器人证据、API 依赖和执行安全边界。"
---

> **阅读范围**：ICRA 2023 论文与 arXiv v4 全文共 16 个 PDF 物理页，含附录提示词、代码样例、所有定量表格与失败讨论；另核验作者项目页和 Google Research 官方代码。<br>
> **检索日期**：2026-08-19<br>
> **版本口径**：书目信息采用 IEEE ICRA 2023 正式版本，方法细节采用内容更完整的 arXiv v4；截至检索日未发现勘误、撤稿或版本替换声明。<br>
> **核心问题**：如果把感知和控制能力暴露成 Python API，LLM 能否不经过额外训练，直接把开放语言指令写成带控制流、几何运算与反馈调用的机器人策略？

## 文献档案

- **论文**：*Code as Policies: Language Model Programs for Embodied Control*。
- **作者**：Jacky Liang、Wenlong Huang、Fei Xia、Peng Xu、Karol Hausman、Brian Ichter、Pete Florence、Andy Zeng。
- **机构**：Robotics at Google。
- **年份 / 发表**：IEEE International Conference on Robotics and Automation（ICRA）2023，9493–9500。
- **文献链接**：[IEEE DOI 页面](https://doi.org/10.1109/ICRA48891.2023.10160591) · [arXiv:2209.07753](https://arxiv.org/abs/2209.07753) · [作者项目页](https://code-as-policies.github.io/) · [全文 PDF](https://arxiv.org/pdf/2209.07753)。
- **DOI**：[10.1109/ICRA48891.2023.10160591](https://doi.org/10.1109/ICRA48891.2023.10160591)。
- **代码链接**：[Google Research / code_as_policies](https://github.com/google-research/google-research/tree/master/code_as_policies)。仓库提供 HumanEval、RoboCodeGen、空间推理、toy controller 与仿真桌面等多份自包含 Colab；它仍不包含论文全部实机控制系统、感知服务和训练/部署基础设施。

## 核心结论

Code as Policies（CaP）把机器人策略表示为普通 Python 程序：LLM 根据自然语言和少量 API 示例生成函数，程序可使用变量、循环、条件分支、第三方几何库以及运行时感知调用。它的核心技巧是**分层代码生成**：主程序中未定义的函数再交给 LLM 递归补全，从而把复杂问题拆成较短、可组合的子程序。

证据最强的部分是代码与仿真评测。层级生成将 code-davinci-002 在 RoboCodeGen 上的通过率从 **81% 提到 95%**，HumanEval greedy 从 **45.7% 提到 53.0%**；在作者构造的空间推理集上，带语言模型程序的总准确率为 **98%**，高于 chain-of-thought 的 58%。仿真长时程任务中，CaP 在 seen-action/seen-instruction、unseen-action/seen-instruction、unseen-action/unseen-instruction 三档分别达到 **97.2%、97.6%、80%**。

但论文对真实机器人的证据主要是展示而非统计：UR5e 绘图/桌面操作与 Everyday Robots 厨房任务没有报告系统成功率、试验次数或强基线。因此它证明了“LLM 能借助合适 API 生成有用的控制程序”，尚未证明生成代码比其他方法在真实机器人上更可靠或更安全。

## 检索记录

- **检索式**：准确题名、`Code as Policies ICRA DOI`、`Code as Policies official code`、`10160591 correction erratum retraction`。
- **主证据**：IEEE DOI 元数据、arXiv v4 全文、作者项目页、Google Research 官方仓库。
- **全文状态**：正文、附录提示词、RoboCodeGen/HumanEval、空间推理、仿真机器人与实机案例均已阅读。
- **更正审计**：IEEE、arXiv 与项目页截至检索日未显示 correction、erratum、withdrawal 或 retraction。
- **排除**：第三方复现、教程和聚合摘要不用于实验数字、代码状态或安全结论。

## 研究背景

SayCan 一类方法让 LLM 从预定义技能列表中选择，因而可控，却很难表达新组合：例如“在所有红色积木旁各画一个比积木大 1 cm 的圆”同时需要感知、循环、坐标变换和几何计算。若为每种组合预先定义一个技能，技能库会迅速膨胀。

程序代码天然提供这些组合结构。一个 Python 策略既能调用 `detect_objects()` 与 `move_to_pose()`，也能在运行时根据检测结果循环、排序、计算中点或构造轨迹。CaP 的研究假设是：代码大模型已经从互联网程序中学到足够多的控制流和库用法，只需以 few-shot 方式告诉它机器人有哪些接口，便可把语言任务编译成 policy code。

这条路线的能力上限也随之转移：从“技能菜单有哪些”转成“API 能提供什么、模型能否正确写程序、生成程序是否能安全执行”。换言之，代码提升了表达力，也扩大了故障面。

## 研究问题

1. LLM 生成的 Python 能否成为机器人策略，而不仅是一次性动作序列？
2. 递归补全未定义函数能否显著提高较长程序的生成正确率？
3. 借助 NumPy、Shapely 等库，代码表示能否补足 LLM 的精确空间推理？
4. 方法能否组合未见动作或未见指令，并在仿真与真实平台执行？
5. 程序表达力、底层 API 依赖与运行时安全之间有什么边界？

## 方法与数据

![Code as Policies 从语言生成可执行策略代码](/images/literature-notes/code-as-policies/method-overview.png)

*图 1｜CaP 用自然语言命令、API 文档和少量输入—代码示例提示代码模型；生成程序可查询感知、调用控制器、使用第三方库并通过控制流形成反馈策略。来源：原论文 Figure 1，PDF 物理页 1。[原文 PDF](https://arxiv.org/pdf/2209.07753#page=1)*

### 1. Language Model Programs

作者把策略写成程序

$$
\pi = \mathrm{LMP}(i, A, E),
$$

其中 $i$ 是新语言指令，$A$ 是可调用的感知/控制 API，$E$ 是少量自然语言到代码的示例。实验使用 OpenAI Codex `code-davinci-002`，温度设为 0，因而在给定提示词时做确定性解码；模型参数不做机器人任务微调。

不同平台用不同提示词前缀暴露能力，例如：

- 物体检测、颜色与边界框；
- 当前末端位姿、抓取与放置接口；
- 2D/3D 坐标与工作空间范围；
- NumPy 数值计算和 Shapely 平面几何；
- `say()` 等语言反馈函数。

主程序可反复调用感知函数，因此生成代码可能形成闭环，如“未检测到目标就继续搜索”。但闭环来自代码显式查询，LLM 本身在 token 生成完毕后通常不再观察环境。

### 2. 分层代码生成

平铺生成长程序容易因 token 预算、变量依赖和复杂组合失败。CaP 允许主程序调用未定义的帮助函数：

1. 先生成顶层函数；
2. 用抽象语法树寻找未定义调用；
3. 为每个函数根据名字、签名、上下文与已有示例构造新提示；
4. 深度优先递归生成函数体；
5. 直到没有未定义函数，再把层级组合成完整程序。

这种做法类似让 LLM 自己提出子问题接口。它提高了代码模块性，也可能把错误隐藏到多层调用中；函数名是否足以传递规范、递归何时停止和输入输出契约是否一致，仍未被形式验证。

### 3. 空间推理通过工具外包

LLM 不直接在自然语言中估算精确坐标，而是写程序：查询所有物体位置、筛选属性、用向量或几何库计算目标点，再调用控制 API。作者把这种模式称为 language model programs。优势在于算术与几何由确定性库执行，而不是依赖 LLM 在隐式 chain-of-thought 中“心算”。

这一结果不能解释成模型自身获得了几何 grounding：坐标系、检测结果、工作区边界与动作语义都由人为设计的 API 提供。模型学到的是如何组合这些接口。

### 4. 训练与运行时

CaP 本身没有机器人数据训练阶段：

- **离线准备**：人为定义安全可用的 API、导入库和 few-shot 示例；底层检测器与控制器各自预训练或工程实现。
- **代码生成**：Codex 一次生成主程序，再递归补全 helper functions。
- **静态筛查**：官方示例阻止导入、`__*` 名字以及 `exec` / `eval` 等明显危险操作，只给 `exec` 一个白名单全局环境。
- **执行**：程序在 Python 运行时调用真实/模拟感知和控制 API。

这个筛查远不是机器人安全沙箱：无限循环、超大资源开销、错误但合法的 API 参数、碰撞轨迹与危险动作都可能绕过字符级限制。

## 实验

### 1. 代码生成能力

RoboCodeGen 是作者构造的 37 题机器人代码集。通过率如下：

| 模型 | 平铺生成 | 分层生成 |
|---|---:|---:|
| GPT-3 6.7B | 3% | 5% |
| GPT-3 175B | 68% | 84% |
| Codex cushman | 54% | 57% |
| Codex davinci | 81% | **95%** |

在通用 HumanEval 上，分层生成也将 greedy pass rate 从 45.7% 提到 53.0%，$P@1$ 从 34.9% 提到 39.8%，$P@10$ 从 75.1% 提到 80.6%，$P@100$ 从 90.9% 提到 95.7%。作者提醒 code-davinci-002 与先前 HumanEval 报告所用模型并非完全相同，跨论文数字不应直接比较。

### 2. 空间推理

作者评测 28 个物体选择问题和 23 个位置问题，位置容差为 1 cm：

| 方法 | 物体选择 | 位置 | 总体 |
|---|---:|---:|---:|
| Vanilla natural language | 39% | 30% | 35% |
| Chain-of-thought | 68% | 48% | 58% |
| Language model programs | **96%** | **100%** | **98%** |

结果强力支持“生成可执行几何程序优于只输出自然语言推理”。但题集小、由作者构造，API 直接暴露结构化坐标，不能外推到含遮挡、深度噪声和坐标漂移的开放场景。

### 3. 仿真机器人任务

每个任务族运行 50 次；`SA/SI`、`UA/SI`、`UA/UI` 分别表示动作和指令是否在示例中出现。

![CaP 在仿真机器人任务中的成功率](/images/literature-notes/code-as-policies/main-results.png)

*图 2｜CaP 在多数长时程组合设置中高于 CLIPort 与自然语言规划器，但在 seen-action/seen-instruction 的空间任务上低于专门训练的 CLIPort。定量机器人主表全部来自仿真。来源：原论文 Table III，PDF 物理页 6。[原文 PDF](https://arxiv.org/pdf/2209.07753#page=6)*

| 设置 | 任务类型 | CLIPort | NL Planner | CaP |
|---|---|---:|---:|---:|
| SA / SI | 长时程 | 78.8% | 86.4% | **97.2%** |
| SA / SI | 空间 | **97.33%** | — | 89.3% |
| UA / SI | 长时程 | 36.8% | 88.0% | **97.6%** |
| UA / SI | 空间 | 0% | — | **73.33%** |
| UA / UI | 长时程 | 0% | 64.0% | **80.0%** |
| UA / UI | 空间 | 0.01% | — | **62.0%** |

这里保留正文 Table III 的 `0.01%`。但 arXiv v4 附录 Table VI 对同一 `UA/UI Spatial-Geometric` 汇总写成 `1.3%`，且逐任务中存在 4% 的非零项；两表无法自洽，疑似排版或汇总口径错误。因作者未给勘误，不能静默选择其中一个数值。

CLIPort 使用约 30,000 条示范训练，CaP 每个任务只在提示词中看到一个示例 rollout。CaP 在组合泛化上优势明显，但 SA/SI 空间任务低于 CLIPort 8.03 个百分点，说明专门学习的视觉动作模型在熟悉分布上仍有优势。

### 4. 真实机器人证据

论文展示三类系统：UR5e 白板绘图、UR5e 桌面抓放，以及 Everyday Robots 移动操作。示例包括根据物体大小画图、排列积木、把饮料送到用户等。作者明确说明开放式任务难以统一定量评价，也没有找到严格可比基线，因此真实机器人部分没有任务数、重复次数、成功率或误差条。

这类视频能证明系统曾执行复杂程序，却不能回答平均可靠性、失败概率、对照优势或安全性。主结论必须把“仿真定量”和“实机定性”分开。

## 主要发现

1. **代码是比技能列表更有表达力的策略表示**：循环、条件、函数与库调用让未见组合成为可能。
2. **层级生成有效**：RoboCodeGen 与 HumanEval 都显示递归 helper-function 补全提高通过率。
3. **外部工具显著改善精确空间计算**：98% 的小型空间题结果说明，把几何交给程序执行优于自然语言推理。
4. **组合泛化是主要强项**：未见动作/未见指令下，CaP 远超只会模仿训练分布的 CLIPort。
5. **不是所有设置都占优**：熟悉空间任务中，CLIPort 的 97.33% 高于 CaP 的 89.3%。
6. **真实机器人可靠性仍未量化**：展示不能替代重复试验和强对照。

## 结论

Code as Policies 将具身代理从“选择一个技能名”推进到“生成一个可运行程序”。最重要的设计不是无约束让 LLM 接管机器人，而是把机器人能力封装成清楚的 API，再让代码模型负责组合。分层生成和工具调用使复杂任务可以被拆解、计算和复用。

论文支持的是一种**API-grounded program synthesis**：机器人 grounding 主要存在于感知与控制接口，而非模型权重中。程序的正确性、可执行性和安全性都取决于接口设计与运行时约束。

## 局限与适用边界

### 作者明确承认的局限

- 能力受底层感知与控制 API 限制；API 不支持的动作无法凭代码生成出来。
- few-shot 提示容量有限，示例越多越接近上下文长度上限。
- 复杂任务或抽象层级与示例差异过大时，模型会生成错误程序。
- 系统倾向于假设指令可行，不会可靠判断一个任务从当前状态是否无法完成。
- 不能事先保证生成代码正确；作者把自动验证留作未来工作。
- 真实机器人任务开放，论文没有提供可比的定量基线。

### 额外证据审计

- `exec` 白名单与字符串黑名单不是物理安全证明；无限循环、越界坐标、碰撞、错误抓取和资源耗尽仍可能发生。
- API 和提示词承担了大量任务工程，少样本“泛化”不等于无需系统设计。
- 定量机器人结果集中在仿真，真实平台的成功率、延迟、恢复和人工干预没有报告。
- 代码由已停止公开服务的专有 Codex 版本生成，可复现性和模型漂移是现实问题。
- 空间题直接提供结构化检测/坐标，未充分测量真实视觉噪声与遮挡。
- 程序执行没有形式化规格、单元测试、轨迹级验证或 safety shield；可解释源码不等于代码本身可靠。
- 递归生成可能放大接口不一致，论文只用最终测试通过率观察，没有定位层级错误传播。

## 我的思考

CaP 把后续具身 agent 的研究问题定义得很清楚：真正困难的不是让 LLM 输出 Python 文本，而是建立一个**可验证的行动运行时**。实用系统至少还需要：

1. 生成前以类型、单位、坐标系和前/后置条件约束 API；
2. 生成后做静态分析、仿真 dry-run、碰撞检查和资源上限；
3. 执行中监控状态偏差，在每个关键节点重规划，而不是盲目跑完整程序；
4. 把执行日志、失败原因和不确定性返回模型，但把紧急停止与安全约束留给独立确定性模块。

从路线对比看，CaP 位于 SayCan 和 VoxPoser 之间：它比技能库调用更自由，却没有 VoxPoser 那种专为三维运动规划设计的空间 value map。其最大遗产是“LLM 生成策略程序”，最大未解问题则是“如何证明这段程序值得交给真实机器人执行”。

## 参考文献

1. Liang, J. et al. *Code as Policies: Language Model Programs for Embodied Control*. ICRA 2023, 9493–9500. [DOI](https://doi.org/10.1109/ICRA48891.2023.10160591) · [arXiv](https://arxiv.org/abs/2209.07753) · [PDF](https://arxiv.org/pdf/2209.07753)
2. Robotics at Google. *Code as Policies project page*. [Project](https://code-as-policies.github.io/)
3. Google Research. *Code as Policies official code directory*. [GitHub](https://github.com/google-research/google-research/tree/master/code_as_policies)
