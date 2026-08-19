---
title: "精读｜Towards Reliable Code-as-Policies：用神经符号验证和安全探测约束机器人代码 Agent"
date: 2026-08-19
permalink: /posts/reliable-code-as-policies/
tags: [literature-note, nesyro, code-as-policies, embodied-ai, embodied-agent, llm, neuro-symbolic, partial-observability, robot-planning]
note_type: single-paper
literature_topics:
  - embodied-ai
  - embodied-agent
  - llm
excerpt: "精读 NeSyRo 的 SMT 代码验证、PDDL/LLM 双置信度、安全探测与递归代码修订，并核对 NeurIPS 2025 Spotlight、RLBench/真机分母和官方补充代码边界。"
---

> **阅读范围**：NeurIPS 2025 正式论文 32 个 PDF 物理页，包含附录算法、环境、提示词、阈值校准与案例；另解压核验官方 Supplemental ZIP 中的 README、源码、任务定义和依赖。<br>
> **检索日期**：2026-08-19<br>
> **版本口径**：以 NeurIPS 2025 正式 proceedings 版本为主，arXiv 仅作版本补充。官方虚拟会场标注为 Spotlight。未发现正式勘误、撤稿或替换声明。<br>
> **核心问题**：LLM 生成的机器人程序在部分可观测环境中会带着错误假设直接执行；能否在动作发生前同时验证“代码逻辑正确”与“当前世界里确实可执行”，并主动、安全地补齐缺失观测？

## 文献档案

- **论文**：*Towards Reliable Code-as-Policies: A Neuro-Symbolic Framework for Embodied Task Planning*。
- **方法名**：NeSyRo；核心评分名为 NeSyConf。
- **作者**：Sanghyun Ahn、Wonje Choi、Junyong Lee、Jinwoo Park、Honguk Woo；Honguk Woo 为通讯作者。
- **机构**：Sungkyunkwan University，Department of Computer Science and Engineering / Department of Artificial Intelligence。
- **年份 / 发表**：NeurIPS 2025，Advances in Neural Information Processing Systems 38，Main Conference Track，**Spotlight**。
- **文献链接**：[NeurIPS 正式页面](https://proceedings.neurips.cc/paper_files/paper/2025/hash/6d13ce54347c65845614d01ced1dbe23-Abstract-Conference.html) · [正式 PDF](https://proceedings.neurips.cc/paper_files/paper/2025/file/6d13ce54347c65845614d01ced1dbe23-Paper-Conference.pdf) · [Spotlight 会场页](https://nips.cc/virtual/2025/poster/117673) · [arXiv:2510.21302](https://arxiv.org/abs/2510.21302)。
- **DOI**：[10.52202/085713-2533](https://doi.org/10.52202/085713-2533)。
- **代码链接**：[NeurIPS 官方 Supplemental ZIP](https://proceedings.neurips.cc/paper_files/paper/2025/file/6d13ce54347c65845614d01ced1dbe23-Supplemental-Conference.zip)。压缩包含 `code/NeSyRo`、RLBench/real-world task definitions、验证/置信度源码与 README；截至检索日未发现独立维护的官方 GitHub repository、release/tag 或明确代码许可证。

## 核心结论

NeSyRo 把 Code as Policies 的“一次生成后执行”改造成两个关卡：

1. **Verification**：GPT-4o-mini 同时生成符号任务规格与 Python 策略，Z3 检查代码是否满足规格，失败反馈再让 LLM 修订；
2. **Validation**：逐个技能计算语言模型常识置信度 CSC 与 PDDL 逻辑置信度 LC。若乘积低于阈值，系统不执行主动作，而是生成一段用于获取缺失观测的 safe probe；探测程序自己也递归经过相同验证/验证流程。

它最强的证据来自部分可观测设置。RLBench 长程任务的成功率在 High / Low / Stochastic / Complete 四档中分别为 **45% / 45% / 35% / 65%**；原始 CaP 分别为 0% / 20% / 0% / 40%。真机把 High 与 Low 平均后，NeSyRo 总成功率为 **57.5±3.5%**，CaP 为 **10.6±0.9%**；不可逆动作计数从 53 降到 7。

但“安全”是相对于手写 PDDL 域与预定义技能前置条件而言，不是经过认证的物理安全。论文摘要的“+46.2%”更准确应理解为百分点式差值，且“86.8% task-relevant action executability”只出现在摘要/引言，没有主表定义、分子分母或可追踪计算，不能作为独立复算结果。

## 检索记录

- **检索式**：准确题名、`Towards Reliable Code-as-Policies NeurIPS 2025`、`NeSyRo code supplemental`、题名 + `correction erratum retraction`。
- **主证据**：NeurIPS 正式元数据与全文、官方 Spotlight 页面、官方 Supplemental ZIP、arXiv。
- **纳入原因**：它直接研究 LLM 代码 Agent、符号工具调用、环境探测、反馈修订与真机闭环，且排除了普通端到端 VLA 的低层建模问题。
- **全文状态**：正文、附录 A–D、算法、平台、任务、提示词、阈值与所有主表均已读；Supplemental 代码结构和 README 已检查。
- **版本 / 更正审计**：正式 NeurIPS 2025 proceedings 优先于 arXiv；截至检索日未发现 correction、erratum、withdrawal 或 retraction。
- **开放资源审计**：代码以 proceedings 附件发布，不是持续维护仓库；README 仍要求手动填写 API key 和 Fast Downward 路径，未提供容器、固定 checkpoint、真机硬件驱动或许可证文件。
- **排除**：非官方摘要、第三方复现与普通 VLA 策略不用于结论；CaP、CodeSift、LEMUR、LLM-Planner、AutoGen 只作为论文内基线。

## 研究背景

### 1. Code as Policies 的部分可观测失败

CaP 让 LLM 把语言指令变成 `pick`、`place`、`open` 等 API 调用，组合性和可读性都比固定分类器强。但模型常把“未观测”当成“默认安全”：不知道抽屉是否锁住，仍直接拉；看不见房间内物体，仍生成抓取；不知道抽屉是否为空，直接把物体塞进去。代码能编译，不等于它对当前环境成立。

### 2. 静态验证和运行验证是两个问题

SMT 可以发现参数绑定、顺序或规格冲突，却不能凭空知道抽屉现在是否上锁。反过来，只让 LLM 看执行反馈再重规划，可能已经发生不可逆错误。NeSyRo 因此借用软件工程的 Verification & Validation：先静态检查“程序是否符合规范”，再交互检查“这个程序是否适合当前世界”。

### 3. 主动感知被写成代码子树

关键设计不是简单加一个视觉查询，而是把获取观测也当成一段 policy code。主计划是树根，低置信技能触发 probe 子程序；probe 还可能发现自己缺信息，再递归生出新的 probe。环境观测更新后，只重写当前及未验证后缀，已验证前缀保持冻结。

## 研究问题

1. SMT 任务规格验证能否降低 LLM 生成程序的逻辑/编译错误？
2. LLM token likelihood 与 PDDL 前置条件是否提供互补的执行置信度？
3. 主动 safe probe 能否在部分可观测环境中补回对象身份、抽屉状态和光照信息？
4. 递归探测是否能减少不可逆动作，同时提高 RLBench 和真机成功率？
5. 收益是否跨不同代码生成 LLM 与不同 CSC 模型规模保持？

## 方法与数据

![NeSyRo 的代码验证、环境验证和递归安全探测框架](/images/literature-notes/reliable-code-as-policies/fig2-nesyro-framework.png)

*图 1｜上半部用 LLM + Z3 修正规格不一致代码；下半部逐技能计算 CSC 与 LC，低置信时进入可递归的 safe-probe pipeline。来源：原论文 Figure 2，PDF 物理页 4。[正式 PDF](https://proceedings.neurips.cc/paper_files/paper/2025/file/6d13ce54347c65845614d01ced1dbe23-Paper-Conference.pdf#page=4)*

### 1. 任务与策略表示

环境被视为部分可观测决策过程。LLM 不直接产生连续关节命令，而是生成由参数化技能构成的程序

$$
\pi_{\text{main}}=(f_0,f_1,\ldots,f_N),
$$

其中 $f_n$ 是 `pick(object)`、`place(target)`、`open(drawer)` 或 `turn_on(light)` 等低层 API。域知识 $\mathcal D$ 给出对象类型、谓词、技能参数、前置条件与效果。灵活性来自 LLM 组合技能，可靠性上限则受这套人工定义域约束。

### 2. Phase I：Neuro-Symbolic Code Verification

给定观测历史 $o_{\le t}$、语言目标 $g$、CoT prompt、域知识 $\mathcal D$ 与上一轮反馈，验证 LLM 同时生成任务规格 $T_{\text{spec}}$ 和 Python 程序：

$$
\Phi_{\text{veri}}(o_{\le t},g,l_{\text{cot}},\mathcal D,
\pi_{\text{main}}^{i-1},F_{\text{veri}}^{i-1},n)
\mapsto (T_{\text{spec}},\pi_{\text{main}}^i).
$$

Z3 检查 $\pi_{\text{main}}^i$ 是否满足 $T_{\text{spec}}$。若失败，它返回结构化反馈，指出参数、顺序或约束冲突，再由 LLM 修订。索引 $n$ 表示当前第一个未验证技能；$n$ 之前的代码被冻结，避免后续反馈破坏已通过部分。

需要注意，规格也是由同一个 LLM 从任务生成。Z3 能证明“代码符合生成的规格”，不能证明规格完整表达了用户真实意图。

### 3. Phase II：CSC 与 LC 双通道验证

验证阶段逐个检查 $f_n$。

**Common Sense Confidence（CSC）** 由 Llama-3.2-3B 计算。prompt 包含目标、当前观测、域知识、当前技能代码和检索到的单技能示例。系统聚合技能代码 token likelihood，转成 negative log-likelihood，再归一化到 $[0,1]$：

$$
\Phi_{\text{vali}}(\mathcal D,\mathcal E_{\text{demo}},o_{\le t},g,f_n)
\mapsto \operatorname{CSC}_{f_n}.
$$

**Logic Confidence（LC）** 由 Fast Downward 在 PDDL 中检查技能前置条件：可生成包含 $f_n$ 的计划则为 1，否则为 0。

$$
\operatorname{LC}_{f_n}\in\{0,1\}.
$$

最终评分为

$$
\operatorname{NeSyConf}_{f_n}
=\operatorname{CSC}_{f_n}\times\operatorname{LC}_{f_n}.
$$

因为是乘法且 LC 二值，只要符号规划器判定不可行，总分立即为 0。这个硬门控容易解释，但 PDDL 遗漏或观测误分类也会直接阻断本可行技能。

### 4. Safe probe 与递归策略树

若 $\operatorname{NeSyConf}_{f_n}<\epsilon$，CSC/LC 分别输出失败反馈 $F_{\text{csc}}$、$F_{\text{lc}}$。LLM 生成探测目标与 $\pi_{\text{probe}}$，例如：

- 调整相机/机器人视角以区分两个相似对象；
- 轻试抽屉以判断是否锁住；
- 打开灯恢复视觉；
- 检查抽屉是否为空。

$\pi_{\text{probe}}$ 不能直接执行，而要递归通过相同 verification 和 validation。执行后的新观测 $o_{\le t+1}$ 被写回，只更新当前技能或后缀。所有主技能都超过阈值后，才执行 grounded $\pi_{\text{main}}$。

“safe”意味着程序满足当前符号域中的前置条件和状态保留设计，不代表通过碰撞、力、速度或人机安全标准认证。

### 5. 阈值如何确定

论文称 $\epsilon$ 是唯一超参数。每种技能在不同初态做 5 次 safe exploration probe，先剔除作者认为因“non-informative reasons”失败的离群 trial，再只保留成功 grounding 的 probe，对其置信度分布取 lower quartile 作为阈值。

这个做法偏保守，但它先过滤失败、再用成功样本定阈值，可能产生选择偏差；还需要环境/技能特定校准，削弱“唯一超参数”和直接跨域迁移的强表述。

### 6. 合成示例库与模型配置

CSC 检索库约含 500 个 GPT-4o 生成的单技能示例，覆盖 15 种以上技能，包含成功/失败符号状态；它们在所有任务复用，不来自真机执行或人工标注。

默认实现：

- GPT-4o-mini：任务规格、代码和反馈生成，temperature 0；
- Llama-3.2-3B：CSC，使用 vLLM；
- Z3：静态 specification/code verification；
- Fast Downward：PDDL 前置条件 validation；
- 本地计算：i7-9700KF、RTX 4080 16 GB；更大 CSC 模型使用约 82 GB VRAM 云集群。

### 7. 低层执行并不是代码模型学出来的

RLBench 使用预参数化技能 API。真机为 7-DoF Franka Emika Research 3，顶部 Intel RealSense D435 提供 RGB-D 和物体检测；MoveIt 根据 3D 目标生成无碰关节路径，ROS 执行，夹爪使用按几何/语义设计的离散抓取策略，没有连续力控。

因此论文评测的是**技能级程序规划与主动观测**，不是从像素学习连续控制，也不是端到端 VLA。

## 实验

### 1. 四类任务、四档可观测性

任务分为 object relocation、object interaction、auxiliary manipulation、long-horizon。缺失信息分别涉及对象身份、抽屉锁定/占用状态、黑暗环境和多种缺失条件组合。

四档设置为：

- **High**：移除超过一半关键观测；
- **Low**：保留大部分但仍不完整；
- **Stochastic**：每个 episode 随机缺失；
- **Complete**：给出全部相关观测，无需 probe。

论文称每档以随机初态和指令评测 10 trials。表中 `±` 按论文 checklist 为标准差；未报告显著性检验。

### 2. RLBench 主结果

![RLBench 四任务类型、四档可观测性结果](/images/literature-notes/reliable-code-as-policies/table2-rlbench-results.png)

*图 2｜NeSyRo 在信息缺失时相对静态验证和失败后重规划基线保持更高 SR/GC；Complete 下差距缩小。来源：原论文 Table 2，PDF 物理页 7。[正式 PDF](https://proceedings.neurips.cc/paper_files/paper/2025/file/6d13ce54347c65845614d01ced1dbe23-Paper-Conference.pdf#page=7)*

长程任务成功率最能体现 safe probe：

| 方法 | High | Low | Stochastic | Complete |
|---|---:|---:|---:|---:|
| CaP | 0% | 20% | 0% | 40% |
| CaP + LEMUR | 0% | 30% | 0% | 55% |
| CaP + CodeSift | 0% | 30% | 5% | 65% |
| LLM-Planner | 0% | 10% | 5% | 35% |
| AutoGen | 0% | 30% | 20% | 50% |
| **NeSyRo** | **45%** | **45%** | **35%** | **65%** |

论文称相对 AutoGen 和 CaP + CodeSift，在所有可观测性和任务类型平均后 SR/GC 分别高 26.3 与 24.3 个百分点。Complete 下 NeSyRo 并非每项都压倒性领先，说明核心价值主要是恢复缺失观测，而不是单纯生成更强动作序列。

### 3. 真机结果

真机表将 High 与 Low 平均：

| 方法 | 总 SR | 总 GC | Irreversible Actions |
|---|---:|---:|---:|
| CaP | $10.6\pm0.9$ | $15.7\pm0.4$ | 53 |
| CaP + CodeSift | $10.6\pm4.4$ | $16.3\pm4.4$ | 29 |
| **NeSyRo** | **$57.5\pm3.5$** | **$58.9\pm4.4$** | **7** |
| NeSyRo-Complete | $68.8\pm5.3$ | $71.5\pm6.5$ | 6 |

长程子类为 NeSyRo 52.5%、CaP 5.0%、CodeSift 7.5%、Complete 60.0%。Object Relocation 达 82.5%，Object Interaction 为 75%；Auxiliary Manipulation 只有 20%，Complete 也为 20%，作者指出瓶颈是机械臂无法稳定按下灯开关，而非缺观测推理。

这项负结果很重要：高层验证不能修复低层技能本身做不到的动作。

### 4. 组件消融

在 High/Low 平均的 RLBench 实验中：

| 设置 | 总 SR | 总 GC |
|---|---:|---:|
| w/o LC | $44.3\pm2.0$ | $54.2\pm0.1$ |
| w/o CSC | $37.1\pm4.0$ | $49.9\pm4.4$ |
| **完整 NeSyRo** | **$61.9\pm6.2$** | **$72.0\pm3.9$** |

两路都提供增益。CSC 模型从 Llama-3.2-1B 换到 3B 后，长程 SR 从 32.5% 到 45%；8B 与 Qwen3-30B-A3B 的 SR 仍为 45%，GC 在 57.7%–64.9%，说明当前小任务里 3B 已接近饱和，但不等于更复杂域无尺度收益。

代码生成 LLM 越强，CaP 与 NeSyRo 都上升：GPT-4o-mini 下长程 SR 为 10% / 45%，o3 下为 45% / 75%。框架收益并没有消除对闭源强模型的依赖。

### 5. 摘要数字的可追踪性

摘要称相对 CaP 提高 46.2% success rate，并达到 86.8% task-relevant action executability。全文没有给出 86.8% 的指标定义、表格位置、trial 分母或逐动作统计；46.2 也没有被明确映射到一张主表的聚合公式。可复算的真机总 SR 差是 $57.5-10.6=46.9$ 个百分点，接近但不等于 46.2。严谨引用应优先使用带表格和分母的具体结果。

## 主要发现

1. **验证与验证解决不同错误**：Z3 检查程序—规格一致性，CSC/PDDL 检查当前环境可行性。
2. **主动探测比失败后重规划更适合不可逆任务**：NeSyRo 在长程 High 档为 45%，其他基线均为 0%。
3. **真机收益同时体现在成功率和不可逆动作**：总 SR 57.5% 对 10.6%，IA 7 对 53。
4. **高层 Agent 仍受低层技能限制**：按灯任务即使 Complete 也只有 20%。
5. **摘要的 86.8% 无法从全文独立复算**：不能脱离这一证据缺口重复传播。

## 结论

NeSyRo 给 Code as Policies 加上了一个清晰的“先查假设、再行动”机制：程序先过规格验证，技能再过环境验证；缺信息时执行受约束的探测，而不是赌一个默认状态。RLBench 和小规模真机结果都支持这一机制在部分可观测任务中显著减少灾难性的错误顺序。

证据支持的窄结论是：**在手工定义的对象谓词、PDDL 域和参数化技能库内，神经符号评分与递归 safe probe 能提高 LLM 代码计划的环境 grounding。** 它还不是开放技能发现、连续安全控制或任意家庭环境中的通用代码 Agent。

## 局限与适用边界

### 作者明确报告的局限

- LC 是二值判定，无法表达现实可行性的连续程度；作者计划使用 probabilistic / temporal PDDL。
- 依赖预定义 domain knowledge，未知技能尚不能自动纳入验证。
- 高风险工具可能造成危险；作者以 affordance 与前置条件检查缓解，但仍承认伦理风险。

### 额外识别的局限

- 规格、代码和反馈都由 LLM 生成；若 $T_{\text{spec}}$ 本身错误，Z3 只能证明代码与错误规格一致。
- “safe”只在手写符号模型内成立，未给碰撞、力、人类接近或紧急停止的形式安全证明。
- 阈值先剔除 non-informative failures、再仅用成功 grounding 分布，存在选择偏差，并需每环境/技能校准。
- 合成的约 500 条 demo 来自 GPT-4o，不是物理执行数据；其错误与偏差可能同时影响 CSC 和 probe。
- RLBench/真机每档 10 trials，误差大，无显著性检验、跨 prompt seeds 或跨机器人验证。
- 真机场景仍是固定桌面、少量已知对象与预定义技能，真实家庭的开放词汇、材料和危险物体未测试。
- 没有端到端延迟、LLM API 成本、递归深度上界、probe 次数分布或失败超时报告。
- 官方代码仅以 Supplemental ZIP 提供，缺独立版本维护、容器、许可证与完整真机驱动；复现仍需人工配置 API/solver 路径。
- 86.8% executability 缺少全文定义与分母，不能审计。

## 我的思考

NeSyRo 最有价值的抽象是把“代码是否正确”拆成三层：

```text
语义：是否满足用户任务规格？
符号：前置条件与效果在逻辑模型中是否成立？
物理：当前传感器和低层控制能否安全完成？
```

论文把前两层做得相对清楚，第三层仍主要依赖固定技能和手工符号。下一步应让每个技能同时返回可校准的成功概率、风险、耗时和观测价值；safe probe 则变成一个受约束信息增益规划问题，而不是阈值触发的 LLM 子程序。

它与 ReKep 可以自然组合：NeSyRo 检查任务级前置条件并决定该观察什么，ReKep 把空间关系转成可优化约束；接触丰富的短动作再交给 VLA。这样的层次化系统比让一个 LLM 同时承担规格、几何、动力学和安全更可审计。

## 参考文献

1. Ahn, S., Choi, W., Lee, J., Park, J. & Woo, H. *Towards Reliable Code-as-Policies: A Neuro-Symbolic Framework for Embodied Task Planning*. NeurIPS 2025, Advances in Neural Information Processing Systems 38. [NeurIPS](https://proceedings.neurips.cc/paper_files/paper/2025/hash/6d13ce54347c65845614d01ced1dbe23-Abstract-Conference.html) · [PDF](https://proceedings.neurips.cc/paper_files/paper/2025/file/6d13ce54347c65845614d01ced1dbe23-Paper-Conference.pdf) · [DOI](https://doi.org/10.52202/085713-2533)
2. Ahn, S. et al. *NeSyRo official supplemental material and code*. [Supplemental ZIP](https://proceedings.neurips.cc/paper_files/paper/2025/file/6d13ce54347c65845614d01ced1dbe23-Supplemental-Conference.zip)
3. Ahn, S. et al. *Towards Reliable Code-as-Policies*, arXiv:2510.21302. [arXiv](https://arxiv.org/abs/2510.21302)
