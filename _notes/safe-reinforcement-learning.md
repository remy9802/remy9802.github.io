---
title: "安全强化学习：从约束优化、风险控制到运行时防护"
date: 2026-08-18
permalink: /notes/safe-reinforcement-learning/
redirect_from:
  - /posts/safe-reinforcement-learning-review/
note_kind: learning
note_topics:
  - reinforcement-learning
  - machine-learning
  - robotics
tags: [safe-rl, cmdp, cpo, risk-sensitive-rl, shielding, offline-rl]
excerpt: "从安全语义、算法机制和证据边界出发，梳理 CMDP、CPO、PID-Lagrangian、CVaR、Lyapunov、Shielding、Recovery RL 与离线安全改进。"
---

> **阅读范围**：混合；核心方法论文、正式会议版本和技术报告全文精读，出版状态、DOI、代码与基准信息由正式页面交叉核验。<br>
> **检索日期**：2026-08-18<br>
> **综述性质**：围绕代表性算法的定向综述，不是穷尽所有安全强化学习工作的系统综述。<br>
> **核心问题**：安全强化学习究竟在保证什么、依靠什么假设，以及训练和部署中仍可能在哪里失效？

## 核心结论

1. **“安全”不是单一指标。** 期望累计成本、尾部风险、机会约束、逐状态硬约束、训练过程中少犯错，以及相对基线不退化，描述的是不同问题；只报告平均 cost 不能证明不会发生灾难性事件。
2. **CPO、Lagrangian 和 PID-Lagrangian 主要解决约束策略优化，不等于运行时安全屏障。** 它们依赖估计误差、函数近似和有限样本；即使优化目标写有约束，单次轨迹或单个动作仍可能违规。
3. **越强的保证，通常需要越强的先验。** Lyapunov、控制屏障函数、shield、可达性或高斯过程方法可以提供更接近逐状态/闭环的保证，但前提是动力学、约束、可观测性和不确定性界足够可信。
4. **真实系统应采用分层安全架构。** 一个更可辩护的组合是：离线数据或示范初始化，约束策略优化，在线 runtime shield / recovery controller，再加 OOD 监测、人工接管和独立的系统级验证。任何单个 safe-RL loss 都不应独自承担安全论证。

## 检索记录

- **数据源**：JMLR、PMLR/ICML、NeurIPS Proceedings、AAAI、IJCAI、IEEE、arXiv、OpenAI 官方研究页及作者官方代码仓库。
- **核心检索式**：`safe reinforcement learning survey`、`constrained policy optimization`、`Lyapunov safe reinforcement learning`、`PID Lagrangian safe RL`、`CVaR policy gradient`、`shielding reinforcement learning`、`safe exploration continuous action space`、`recovery RL`、`safe policy improvement baseline bootstrapping`、`offline safe reinforcement learning benchmark`。
- **时间范围**：以 2015–2024 年代表性深度安全强化学习为主；约束 MDP 的形式化背景追溯到 Altman 的专著。
- **纳入标准**：提出关键安全语义或方法族、给出可复核实验、具有正式会议/期刊记录或是被广泛采用的官方技术报告；优先正式版本和作者代码。
- **最终纳入**：15 篇代表性算法/基准论文，以及 5 项综述或 CMDP 理论来源；覆盖约束优化、风险敏感目标、Lyapunov/模型保证、运行时过滤、恢复策略、离线安全改进和评测平台。
- **排除**：只讨论一般鲁棒性、隐私或对齐而没有交互约束的工作；缺少原始论文对应关系的二手博客；把平均回报提升直接称作“更安全”的结果。
- **链接纠错**：网络资料有时把 arXiv:1910.01708 当作 Safety Gym；该编号实际对应另一篇 batch RL 论文。本笔记只采用 [OpenAI 官方 Safety Gym 页面](https://openai.com/index/benchmarking-safe-exploration-in-deep-reinforcement-learning/)与其[官方报告 PDF](https://cdn.openai.com/safexp-short.pdf)。

## 研究问题

标准强化学习通常最大化期望折扣回报：

$$
J_r(\pi)=\mathbb E_{\tau\sim\pi}
\left[\sum_{t=0}^{\infty}\gamma^t r(s_t,a_t)\right].
$$

这个目标并不关心奖励是怎样得到的。智能体可以通过高速、激进或不可逆的探索获得更高平均回报；低概率灾难也可能被大量普通轨迹稀释。在机器人、自动驾驶、电网或医疗等系统中，我们还会问：

- 训练期间能否避免危险探索，而不只是训练结束后表现安全？
- “平均成本不超预算”是否足够，还是每一步、每条轨迹都必须满足约束？
- 环境动力学和风险模型不准确时，所谓保证还剩下什么？
- 只有历史日志、不能在线试错时，怎样避免学到数据支持之外的危险动作？
- 安全算法牺牲了多少任务性能、样本效率和可扩展性？

[García 与 Fernández 的综述](https://www.jmlr.org/papers/v16/garcia15a.html)把早期路线概括为“修改最优性准则”和“修改探索过程”两大类。这一划分仍有解释力，但现代方法还需要额外区分运行时防护、离线安全改进和系统级验证。[Brunke 等人的机器人安全学习综述](https://doi.org/10.1146/annurev-control-042920-020211)进一步提醒：学习控制器、在 RL 目标中鼓励安全、以及对策略做形式认证，是证据强度不同的三件事。

![安全强化学习的历史分类表](/images/literature-notes/safe-reinforcement-learning/historical-taxonomy.png)

*图 1｜2015 年综述对安全强化学习方法的历史分类。它适合说明问题起源，但尚未覆盖后来的 CPO、PID-Lagrangian、Recovery RL 与离线基准。来源：[García & Fernández, 2015, Table 1](https://www.jmlr.org/papers/volume16/garcia15a/garcia15a.pdf)。*

## 方法与数据

### 1. 先定义“安全”的语义

| 安全语义 | 典型形式 | 能表达什么 | 不能自动保证什么 |
|---|---|---|---|
| 期望累计成本 | $J_c(\pi)\le d$ | 长期平均预算 | 单回合、单状态不违规 |
| 尾部风险 | $\operatorname{CVaR}_\alpha(Z)$ | 最坏一部分轨迹的平均损失 | 样本外绝对最坏情形 |
| 机会约束 | $\Pr(g(\tau)>0)\le\delta$ | 违规概率上界 | 未建模分布漂移下的上界 |
| 几乎必然约束 | $\Pr(\forall t,\,s_t\in\mathcal S_{safe})=1$ | 理论上的逐轨迹安全 | 近似模型和观测噪声下仍成立 |
| 逐状态/逐动作约束 | $c(s_t,a_t)\le 0$ | 每一步都不能越界 | 约束函数遗漏的风险 |
| 安全策略改进 | $J(\pi)\ge J(\pi_b)-\epsilon$ | 相对基线不显著退化 | 物理意义上的“无事故” |

这几种语义没有天然包含关系。例如，期望成本合格的策略仍可能以很小概率产生极大损失；相对日志策略“不变差”也只说明统计性能相对保守，并不说明日志策略本身安全。[Wachi 等人的约束形式综述](https://www.ijcai.org/proceedings/2024/913)和[逐状态安全综述](https://www.ijcai.org/proceedings/2023/763)都强调了约束定义对结论的决定性影响。

### 2. CMDP：最常用的统一形式

约束马尔可夫决策过程（CMDP）在奖励之外定义一个或多个成本：

$$
\begin{aligned}
\max_\pi\quad &J_r(\pi),\\
\text{s.t.}\quad &J_{c_i}(\pi)=
\mathbb E_\pi\!\left[\sum_{t=0}^{\infty}\gamma^t c_i(s_t,a_t)\right]\le d_i,
\quad i=1,\ldots,m.
\end{aligned}
$$

它把性能和约束显式分开，便于比较算法；代价是安全通常被压缩成**期望折扣和**。阈值 $d_i$、折扣因子、episode 长度和成本定义都会改变“合格”的含义。

### 3. 惩罚与 Lagrangian：简单，但容易振荡或钻空子

固定惩罚把奖励写成 $r-\lambda c$。它实现容易，却要求人工找到合适的 $\lambda$：太小会违规，太大又可能得到“什么都不做”的安全策略。原始问题更常被写成鞍点：

$$
\max_\pi\min_{\lambda_i\ge 0}
J_r(\pi)-\sum_i\lambda_i\bigl(J_{c_i}(\pi)-d_i\bigr).
$$

primal-dual 方法交替更新策略和乘子。[RCPO](https://openreview.net/forum?id=SkfrvsA9FX)允许用 Bellman 可分解的代理成本给 actor 提供梯度，再用原始约束慢速更新乘子；其收敛结论是渐近、局部且依赖多时间尺度等假设，并不保证中间训练过程安全。当成本延迟大、噪声强或策略更新很快时，积分式乘子还会出现过冲和周期振荡。[PID Lagrangian](https://proceedings.mlr.press/v119/stooke20a.html)把约束误差视为控制信号，引入比例、积分和微分项以改善阻尼。它解决的是训练动态，不是把统计约束升级成形式化硬保证；增益、成本尺度和估计噪声仍需调节。

### 4. CPO：在局部信赖域内直接约束策略更新

[Constrained Policy Optimization](https://proceedings.mlr.press/v70/achiam17a.html)用当前策略附近的奖励/成本 surrogate 与平均 KL 信赖域构造每次更新：

$$
\begin{aligned}
\max_\theta\quad &\hat{\mathbb E}
\left[\frac{\pi_\theta(a\mid s)}{\pi_{old}(a\mid s)}A_r(s,a)\right],\\
\text{s.t.}\quad &J_c(\pi_{old})+
\hat{\mathbb E}\left[\frac{\pi_\theta}{\pi_{old}}A_c\right]\le d,\\
&\hat{\mathbb E}[D_{KL}(\pi_{old}\|\pi_\theta)]\le\delta.
\end{aligned}
$$

二阶近似和线搜索让 CPO 比固定 penalty 更直接地追踪预算。论文还给出基于 policy divergence 的性能界。但实际深度网络使用有限轨迹、近似优势和局部二阶模型；“每次更新近似满足期望约束”不能改写成“执行时从不违规”。

![CPO 的奖励与约束学习曲线](/images/literature-notes/safe-reinforcement-learning/cpo-reward-constraint-results.png)

*图 2｜CPO 与 TRPO、固定惩罚及 primal-dual 变体在模拟连续控制任务上的奖励与成本曲线；虚线为成本限额。原论文中 Point 使用 5 个随机种子，其余任务使用 10 个。来源：[Achiam et al., 2017, Figure 1](https://proceedings.mlr.press/v70/achiam17a/achiam17a.pdf)。*

### 5. Lyapunov：把全局预算转成局部可行更新

[Chow 等人](https://papers.nips.cc/paper_files/paper/2018/hash/4fe5149039b52765bde64beb9f674940-Abstract.html)构造满足安全预算的 Lyapunov 函数，并据此限制每个状态上的策略改进；直觉是，只允许不会让未来累计成本上界失控的局部更新。它比纯平均 penalty 更贴近状态依赖安全，也能与 policy gradient、value-based 方法结合。

主要瓶颈是需要一个可行基线和足够准确的成本价值/Lyapunov 估计。若初始策略不安全、数据没有覆盖危险边界或函数近似低估成本，局部可行集本身就可能错误。

### 6. 风险敏感 RL：从平均值转向尾部

当少量高损失事件比平均成本更重要时，可优化损失随机变量 $Z$ 的条件风险价值：

$$
\operatorname{CVaR}_{\alpha}(Z)=
\min_{\eta}\left[
\eta+\frac{1}{1-\alpha}\mathbb E[(Z-\eta)_+]
\right].
$$

[Chow 等人的 percentile-risk constrained RL](https://www.jmlr.org/papers/v18/15-636.html)把 VaR 参数、策略和 Lagrange 乘子放在多时间尺度更新中，并用扩展状态跟踪累计风险。其 optimal-stopping 实验中，风险中性 policy gradient 的 CVaR 为 4.464，而 PG-CVaR 为 2.000；代价是平均目标从 1.177 变为 1.997（该任务以成本最小化，数值越低越好）。这支持“压低尾部要牺牲平均效用”，但只是合成任务内证据。尾部样本本来就少，梯度方差高，结果也对 $\alpha$、损失定义和分布漂移敏感。CVaR 控制的是所建模分布下某段尾部的均值，不是无限支持下的绝对最坏损失。

### 7. 模型保证、安全层与 Shielding：在动作执行前再检查一次

这类方法不只改变训练 loss，而是在探索或动作进入环境前做认证、验证或修正：

- [SafeMDP](https://proceedings.neurips.cc/paper/2016/hash/9a49a25d845a483fae4be7e341368e36-Abstract.html)用高斯过程的置信下界、Lipschitz 连续性、可达性与可返回性，逐步扩展“可安全探索”的状态集合。在火星地形实验中，它探索了 80.28% 的区域；去掉 expander 只到 30.44%，不检查可返回性的版本很快失败。其高概率保证依赖有限状态、已知确定性转移、正确核/RKHS 界、噪声假设和初始安全集，不能直接迁移到未知高维视觉动力学。
- [Dalal 等人](https://arxiv.org/abs/1801.08757)在线性化约束近似下，把策略动作投影回可行空间。安全层计算轻量，但一阶局部模型在接触、强非线性或分布外区域可能失准。
- [Shielding](https://ojs.aaai.org/index.php/AAAI/article/view/11797)从形式化安全规范综合一个 shield，阻止会进入坏状态的动作。若抽象模型和规范完备，它可以提供比平均 CMDP 更强的运行时语义；但未写进规范的危险、感知错误和模型遗漏仍不受保护。

共同的工程问题是 **recursive feasibility**：当前动作安全并不代表下一步仍有安全动作。一个好的 runtime filter 需要考虑制动距离、控制延迟、执行器约束和未来可恢复性，而非只做瞬时阈值裁剪。

### 8. 人类干预与 Recovery RL：把任务学习和最后防线分开

[Human Intervention RL](https://arxiv.org/abs/1707.05173)先由人类阻止灾难并收集干预标签，再训练 blocker 接替人类。其 Atari 实验显著降低事故，但 Road Runner 暴露出 blocker 与持续学习策略之间的分布漂移；Pong 策略在 blocker 存在时仍会提出危险动作。这说明“没有发生后果”不等于内部 policy 已学安全，blocker 往往不能在训练后移除。人工监督成本、漏检和不可挽回的快速事故也是明显边界。

[Recovery RL](https://doi.org/10.1109/LRA.2021.3070252)训练一个安全 critic 判断动作是否可能进入不可恢复区域；风险过高时，不执行任务策略动作，而由恢复策略接管。论文在模拟任务中报告成功—违规权衡的样本效率提高约 2–20 倍，并在其物理实验中报告约 3 倍改进。

这种模块化接口适合机器人，但其安全性受制于安全 critic 的召回率：**假阴性**会让危险动作漏过，**假阳性**会导致频繁干预、任务停滞。恢复数据从何而来、危险状态是否可逆，以及切换抖动如何处理，都是部署问题。

### 9. Sauté RL：把剩余安全预算并入状态

[Sauté RL](https://proceedings.mlr.press/v162/sootla22a.html)将“剩余安全预算”作为增广状态，并通过奖励塑形把几乎必然的轨迹约束转成无约束 RL 问题。相比只控制期望累计 cost，它明确记录预算怎样随轨迹消耗。

但这种归约仍依赖 Markov 性、成本观测和函数逼近质量。论文中的理论目标不能自动覆盖传感器延迟、未建模扰动或 neural policy 的数值实现错误。

### 10. 离线安全强化学习：没有在线试错，也没有自动安全

固定数据集避免了训练期间在真实系统上探索，却带来支持集外推。普通 offline RL 可能选择日志中几乎没出现、Q 值却被高估的动作；安全成本模型也会在同一区域失真。

[SPIBB](https://proceedings.mlr.press/v97/laroche19a.html)把低置信状态—动作上的策略约束在 baseline 附近，从而追求高概率的安全策略改进。这里的“safe”是**相对基线的性能不退化**，不是物理零违规。[Constrained Decision Transformer](https://proceedings.mlr.press/v202/liu23m.html)把 reward-to-go 和 cost-to-go 一起作为条件，并用数据集 Pareto frontier 对不可行目标做 relabel；在其 5 个连续控制任务中，CDT 的平均 reward/cost 为 82.99/0.72，而去掉 augmentation 后 cost 升到 1.54。它展示了部署时调节预算的可能性，但作者明确指出没有严格保证、需要即时 reward/cost 反馈，错误目标仍会恶化行为。[OSRL/DSRL Benchmark](https://data.mlr.press/volumes/01.html)则系统比较固定数据上的回报—成本权衡，并提供[官方代码](https://github.com/liuzuxin/OSRL)。合理的离线路线通常需要：

- 支持约束或行为正则，减少 OOD 动作；
- 对奖励与成本同时做保守/不确定性估计；
- 独立的 off-policy evaluation 和 stress test；
- 若允许上线，先经过 shadow mode、shield 和小步 offline-to-online 校准。

### 11. 基准怎样测，决定了“安全”看起来怎样

[Safety Gym](https://openai.com/index/benchmarking-safe-exploration-in-deep-reinforcement-learning/)由 3 种机器人、3 类任务和两种约束难度组合成 18 个约束环境，另有 9 个无约束 Level 0 环境。它让 reward 与 cost 分开记录，并强调学习全程的安全—性能权衡。

![Safety Gym 环境与任务组合](/images/literature-notes/safe-reinforcement-learning/safety-gym-environments.png)

*图 3｜Safety Gym 的机器人、任务与约束物体。来源：[Ray, Achiam & Amodei, 2019, Figure 5](https://cdn.openai.com/safexp-short.pdf)；[官方代码](https://github.com/openai/safety-gym)。*

Safety Gym 报告在 SG18 汇总设置下给出一组很有警示性的结果（3 个随机种子，全部数值以 PPO 归一化）：

| 算法 | Return | 最终 constraint violation | 训练期 cost rate |
|---|---:|---:|---:|
| PPO | 1.000 | 1.000 | 1.000 |
| PPO-Lagrangian | 0.240 | 0.026 | 0.245 |
| TRPO | 1.094 | 1.132 | 1.004 |
| TRPO-Lagrangian | 0.331 | 0.018 | 0.265 |
| CPO | 0.784 | 0.593 | 0.646 |

这不是跨论文的最终排行榜：作者对超参数做了人工调节，归一化又依赖 PPO 基线。但它揭示了两个事实。第一，CPO 在原论文任务中较好地追踪限制，却在这个更广的实现/基准中未能在几乎所有环境完全满足约束，说明近似误差和实现细节会改变结论。第二，Lagrangian 变体在该报告中显著减少最终违规与训练期成本，但付出了较大的回报损失。

[Safety-Gymnasium](https://github.com/PKU-Alignment/safety-gymnasium)进一步统一多种环境和接口，但基准分数仍不是安全证明。报告结果时至少应同时给出：

1. 最终 reward 与 cost；
2. 训练全过程累计违规和单位交互违规率；
3. episode cost 的 P95/P99、最大值和可行率；
4. shield/人工干预次数、恢复成功率和停滞率；
5. 多随机种子置信区间、超参数选择协议；
6. 模型误差、传感器故障、延迟、域外扰动和罕见事件 stress test。

## 主要发现

### 发现一：安全语义比算法名字更重要

同样标为 safe RL，CPO 约束的是期望成本，CVaR 关注尾部，shield 阻断不安全动作，SPIBB 保证的是相对 baseline 改进。若论文或产品没有先声明安全语义、时间尺度和概率口径，后续数字难以解释。

### 发现二：训练安全和部署安全必须分开

一个最终可行的 policy 可能在学习过程中发生大量违规；一个训练期 cost 很低的策略也可能在部署分布漂移时失效。Safety Gym 因而同时报告训练期 violation 和最终 cost。现实系统还要分别测试探索、更新、推理、执行器和故障恢复链路。

### 发现三：软约束可扩展，硬保证依赖模型

Lagrangian、CPO 和 Sauté 容易接入深度策略与高维任务，却只能在其统计目标和近似假设内解释。Shield、可达性或稳定性方法能提供更强语义，但对动力学维度、模型正确性和规范完整性要求更高。研究前沿不是简单选择其中一边，而是把可扩展的学习器放在可验证的安全包络内。

### 发现四：离线数据减少现场试错，却放大认知盲区

offline RL 不会在训练期间撞坏机器人，但它无法凭固定日志知道未覆盖动作是否安全。保守价值、baseline bootstrapping 和不确定性只能在数据与假设范围内降低风险；上线前仍需要运行时防护和渐进验证。

### 发现五：算法排名对实现、成本尺度和基准高度敏感

CPO 原论文与 Safety Gym 报告的相对表现并不一致，这并不意味着其中一方必然错误，而是表明估计器、标准化、超参数、环境约束和评测聚合会左右结论。安全 RL 尤其不适合只报一个平均分。

### 方法选择速查

| 场景 | 优先考虑 | 需要额外补上的东西 |
|---|---|---|
| 可容忍长期平均预算，环境可大量仿真 | Lagrangian / PID-Lagrangian、CPO | 多 seed、训练期违规、尾部成本 |
| 低概率灾难比平均成本重要 | CVaR、分布式/鲁棒风险目标 | 足够尾部样本、分布漂移测试 |
| 每一步都有明确物理约束 | Shield、安全层、CBF/可达性 | 可信模型、延迟与 recursive feasibility |
| 部分危险可由备份控制器恢复 | Recovery RL / runtime assurance | critic 召回率、切换逻辑、不可恢复集分析 |
| 只有固定日志 | SPIBB、支持约束、保守 offline safe RL | OPE、覆盖度审计、shadow mode 与 shield |
| 真实机器人首次上线 | 示范/离线预训练 + 约束优化 + runtime filter | 硬件联锁、人工接管、分阶段安全验证 |

## 局限与适用边界

### 代表性文献自身的共同局限

- 多数结果来自 MuJoCo、Safety Gym 或低维控制；高维视觉、真实接触、多人交通和开放世界中的证据明显不足。
- “约束满足”经常基于采样均值，随机种子少，罕见灾难的统计功效不足；没有观察到事故不等于事故概率为零。
- 成本函数通常由研究者完整给出，而现实中的未知危害、传感器误报和规范冲突恰恰最难处理。
- 算法比较常混入不同网络、标准化、预算、超参数与 early stopping；Safety Gym 的反例说明结论未必跨实现稳定。
- 形式化保证往往需要已知或可置信学习的动力学、可行初始策略、正确状态估计与完备约束。深度端到端系统通常难同时满足这些前提。

### 本综述的边界

- 这是代表性路线的定向综述，没有执行 PRISMA 式系统检索，也没有覆盖分布鲁棒 MDP、控制屏障函数、Hamilton–Jacobi 可达性、多智能体安全和人机协同的全部分支。
- 不同论文的 reward、cost 和 success 定义不一致，因此本文没有做跨论文数值排名或元分析。
- Safety Gym 与 Recovery RL 的数字按各自报告口径复述，只能支持相应环境中的比较，不能外推为真实系统事故率。
- 安全 RL 只处理由状态、动作、奖励和约束表达的风险；网络安全、隐私、公平、模型滥用与组织治理仍需要独立机制。

## 我的思考

我更倾向把安全强化学习看成一个**控制栈与证据栈的设计问题**，而不是寻找一个名字带 Safe 的万能算法：

```text
离线日志 / 示范 / 仿真
          ↓
保守初始化与覆盖度审计
          ↓
约束策略优化（性能层）
          ↓
Shield / Safety Filter / Recovery（执行层）
          ↓
OOD 监测、人工接管、硬件联锁（系统层）
          ↓
训练违规 + 尾部风险 + 故障注入 + 实机分阶段验证（证据层）
```

这里最容易被忽视的是**安全接口的失败方向**。任务策略失败时，shield 是否还能及时制动？安全 critic 不确定时默认放行还是拦截？感知模块置信度下降时，成本模型是否仍有意义？恢复策略把系统带回哪里，那里是否真的可继续控制？这些问题往往比把平均 cost 再降低几个百分点更接近真实安全。

下一步值得做三类验证：

1. 在同一算法上系统切换期望约束、CVaR 和逐状态约束，量化安全语义本身对策略行为的影响；
2. 对 runtime filter 注入模型偏差、延迟和漏检，绘制“保证随假设失效而怎样退化”的曲线；
3. 建立 offline-to-online 的分阶段 protocol，把日志覆盖、OPE、shadow execution、干预率和最终闭环测试连成一条可审计证据链。

## 参考文献

1. García, J.; Fernández, F. *A Comprehensive Survey on Safe Reinforcement Learning*. JMLR, 2015. [正式页面](https://www.jmlr.org/papers/v16/garcia15a.html)；DOI：未分配。
2. Brunke, L. et al. *Safe Learning in Robotics: From Learning-Based Control to Safe Reinforcement Learning*. Annual Review of Control, Robotics, and Autonomous Systems, 2022. [DOI](https://doi.org/10.1146/annurev-control-042920-020211)。
3. Altman, E. *Constrained Markov Decision Processes*. Chapman & Hall/CRC, 1999. [出版社页面](https://www.routledge.com/Constrained-Markov-Decision-Processes/Altman/p/book/9781315140223)；ISBN 9781315140223。
4. Achiam, J. et al. *Constrained Policy Optimization*. ICML/PMLR, 2017. [正式页面](https://proceedings.mlr.press/v70/achiam17a.html)；DOI：未分配；[官方代码](https://github.com/jachiam/cpo)。
5. Tessler, C.; Mankowitz, D. J.; Mannor, S. *Reward Constrained Policy Optimization*. ICLR, 2019. [正式页面](https://openreview.net/forum?id=SkfrvsA9FX)；DOI：未分配。
6. Stooke, A. et al. *Responsive Safety in Reinforcement Learning by PID Lagrangian Methods*. ICML/PMLR, 2020. [正式页面](https://proceedings.mlr.press/v119/stooke20a.html)；DOI：未分配。
7. Chow, Y. et al. *A Lyapunov-based Approach to Safe Reinforcement Learning*. NeurIPS, 2018. [正式页面](https://papers.nips.cc/paper_files/paper/2018/hash/4fe5149039b52765bde64beb9f674940-Abstract.html)；DOI：未分配。
8. Chow, Y. et al. *Risk-Constrained Reinforcement Learning with Percentile Risk Criteria*. JMLR, 2018. [正式页面](https://www.jmlr.org/papers/v18/15-636.html)；DOI：未分配。
9. Turchetta, M.; Berkenkamp, F.; Krause, A. *Safe Exploration in Finite Markov Decision Processes with Gaussian Processes*. NeurIPS, 2016. [正式页面](https://proceedings.neurips.cc/paper/2016/hash/9a49a25d845a483fae4be7e341368e36-Abstract.html)；DOI：未分配；[官方代码](https://github.com/befelix/SafeMDP)。
10. Dalal, G. et al. *Safe Exploration in Continuous Action Spaces*. arXiv preprint, 2018. [arXiv](https://arxiv.org/abs/1801.08757)；[arXiv DOI](https://doi.org/10.48550/arXiv.1801.08757)；官方代码未核到。
11. Alshiekh, M. et al. *Safe Reinforcement Learning via Shielding*. AAAI, 2018. [DOI](https://doi.org/10.1609/aaai.v32i1.11797)；[正式页面](https://ojs.aaai.org/index.php/AAAI/article/view/11797)；[官方代码](https://github.com/safe-rl/safe-rl-shielding)。
12. Saunders, W. et al. *Trial without Error: Towards Safe Reinforcement Learning via Human Intervention*. AAMAS extended abstract, 2018. [正式摘要](https://aamas.csc.liv.ac.uk/Proceedings/aamas2018/pdfs/p2067.pdf)；[完整预印本](https://arxiv.org/abs/1707.05173)；[官方代码](https://github.com/gsastry/human-rl)。
13. Thananjeyan, B. et al. *Recovery RL: Safe Reinforcement Learning with Learned Recovery Zones*. IEEE Robotics and Automation Letters, 2021. [DOI](https://doi.org/10.1109/LRA.2021.3070252)；[作者接受稿](https://arxiv.org/abs/2010.15920)；[官方代码](https://github.com/abalakrishna123/recovery-rl)。
14. Ray, A.; Achiam, J.; Amodei, D. *Benchmarking Safe Exploration in Deep Reinforcement Learning*. OpenAI technical report, 2019. [官方页面](https://openai.com/index/benchmarking-safe-exploration-in-deep-reinforcement-learning/)；DOI：未分配；[官方代码](https://github.com/openai/safety-gym)。
15. Sootla, A. et al. *Sauté RL: Almost Surely Safe Reinforcement Learning Using State Augmentation*. ICML/PMLR, 2022. [正式页面](https://proceedings.mlr.press/v162/sootla22a.html)；DOI：未分配；[官方代码](https://github.com/huawei-noah/HEBO/tree/master/SIMMER)。
16. Liu, Z. et al. *Constrained Decision Transformer for Offline Safe Reinforcement Learning*. ICML/PMLR, 2023. [正式页面](https://proceedings.mlr.press/v202/liu23m.html)；DOI：未分配；[官方代码](https://github.com/liuzuxin/OSRL)。
17. Liu, Z. et al. *Datasets and Benchmarks for Offline Safe Reinforcement Learning*. Journal of Data-centric Machine Learning Research, 2024. [正式卷页](https://data.mlr.press/volumes/01.html)；DOI：未分配；[项目页](https://www.offline-saferl.org/)；[官方代码](https://github.com/liuzuxin/OSRL)。
18. Ji, J. et al. *Safety-Gymnasium: A Unified Safe Reinforcement Learning Benchmark*. NeurIPS Datasets and Benchmarks, 2023. [DOI](https://doi.org/10.52202/075280-0831)；[正式页面](https://proceedings.neurips.cc/paper_files/paper/2023/hash/3c557a3d6a48cc99444f85e924c66753-Abstract-Datasets_and_Benchmarks.html)；[官方代码](https://github.com/PKU-Alignment/safety-gymnasium)。
19. Wachi, A. et al. *A Survey of Constraint Formulations in Safe Reinforcement Learning*. IJCAI, 2024. [DOI](https://doi.org/10.24963/ijcai.2024/913)；[正式页面](https://www.ijcai.org/proceedings/2024/913)。
20. Zhao, W. et al. *State-wise Safe Reinforcement Learning: A Survey*. IJCAI, 2023. [DOI](https://doi.org/10.24963/ijcai.2023/763)；[正式页面](https://www.ijcai.org/proceedings/2023/763)。
