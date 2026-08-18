---
title: "强化学习概述：四组正交分类、优劣与改进路线"
date: 2026-08-18
permalink: /notes/reinforcement-learning-overview/
note_kind: learning
note_topics:
  - reinforcement-learning
  - machine-learning
tags:
  - value-based
  - policy-based
  - actor-critic
  - online-rl
  - offline-rl
  - on-policy
  - off-policy
  - model-free-rl
  - model-based-rl
  - world-model
excerpt: "从学习对象、数据来源、策略关系和环境模型四条正交轴理解强化学习，比较典型算法的优势、失效模式与修补方法。"
---

> **一句话结论：** Value-based / Policy-based 回答“学什么”，Online / Offline 回答“训练时还能否取得新数据”，On-policy / Off-policy 回答“谁产生数据、又在优化谁”，Model-free / Model-based 回答“是否显式利用环境模型改进决策”。四组概念属于不同维度，不能画成同一棵二叉树。

## 1. 强化学习到底在学什么

强化学习研究的是序贯决策：智能体在状态 $s_t$ 下选择动作 $a_t$，环境给出奖励 $r_t$ 和下一状态 $s_{t+1}$。常用形式是马尔可夫决策过程

$$
\mathcal{M}=(\mathcal{S},\mathcal{A},P,R,\gamma),
$$

其中 $P$ 是转移规律，$R$ 是奖励，$\gamma\in[0,1)$ 是折扣因子。策略 $\pi(a\mid s)$ 决定动作分布，优化目标是最大化期望折扣回报

$$
G_t=\sum_{k=0}^{\infty}\gamma^k r_{t+k+1},
\qquad
J(\pi)=\mathbb{E}_{\pi}[G_0].
$$

两个最常见的价值函数是

$$
V^\pi(s)=\mathbb{E}_{\pi}[G_t\mid S_t=s],
\qquad
Q^\pi(s,a)=\mathbb{E}_{\pi}[G_t\mid S_t=s,A_t=a].
$$

价值函数回答“从这里开始有多好”，策略回答“在这里应该怎样行动”。现代算法可能只显式学习其中一个，也可能同时学习两者。本文术语主要遵循 [Sutton 与 Barto 的教材](https://mitpress.mit.edu/9780262039246/reinforcement-learning/)。

## 2. 先把四条轴分开

| 分类轴 | 核心问题 | 两端含义 | 它不等于什么 |
|---|---|---|---|
| 表示与优化 | 主要学习对象是什么？ | Value-based 学价值并导出策略；Policy-based 直接参数化策略 | 不决定数据是在线还是离线 |
| 数据获取 | 训练时还能否向环境取得新样本？ | Online 可以继续交互；Offline 只能使用固定数据集 | Online 不等于 on-policy；使用 replay 也不等于 offline |
| 策略关系 | 数据由谁生成，更新又针对谁？ | On-policy 中行为策略 $\mu$ 与目标策略 $\pi$ 相同或很接近；Off-policy 允许 $\mu\neq\pi$ | 不决定是否还会继续收集数据 |
| 环境模型 | 是否显式使用环境动力学改进策略或选择动作？ | Model-free 不依靠显式模型做 policy improvement；Model-based 使用已知或学习到的模型进行规划、想象或合成更新 | 不由是否在线、是否重建像素或是否使用神经网络决定 |

由此可得几个常见反例：

- **SARSA** 是 model-free、value-based、online、on-policy。
- **DQN** 是 model-free、value-based、online、off-policy。
- **PPO** 通常是 model-free、policy-gradient / actor-critic、online、近似 on-policy。
- **SAC** 是 model-free、actor-critic、online、off-policy。
- **CQL、IQL** 是 offline，训练目标通常相对日志行为策略具有 off-policy 性质。
- **Dreamer** 使用学习到的世界模型训练 actor，因此属于 model-based；真机或游戏部署时直接执行 actor、不做在线搜索，并不会把它变成 model-free。
- **MuZero** 不重建像素，却用学习到的 latent dynamics 做 MCTS，因此仍是 model-based。

“Offline 必然等于 off-policy”也不是逻辑定理：若固定数据恰好由同一个固定策略 $\pi$ 生成，只做该策略的价值评估，可以是 offline + on-policy；一旦用这批旧数据改进出新策略，数据对新策略通常就成为 off-policy。

## 3. 第一条轴：Value-based、Policy-based 与 Actor-Critic

### 3.1 Value-based：先估值，再选动作

Value-based 方法学习 $V$ 或 $Q$，控制时通常取

$$
\pi_Q(s)=\arg\max_a Q(s,a),
$$

训练阶段再叠加 $\epsilon$-greedy 等探索。Q-learning 的一步目标可写成

$$
y_t=r_t+\gamma\max_{a'}Q_{\bar\theta}(s_{t+1},a'),
$$

再令 $Q_\theta(s_t,a_t)$ 接近 $y_t$。DQN 将这个思路与深度网络、经验回放和目标网络结合，扩展到高维视觉输入；原论文明确属于持续与环境交互的 **online + off-policy** 方法。[DQN 论文](https://doi.org/10.1038/nature14236)

**优势**

- 在中小规模离散动作空间中结构直接，不需要额外训练 actor。
- TD 与 bootstrapping 能较快传播奖励，经验回放可重复使用历史 transition。
- 行为策略可以负责探索，而目标策略趋向 greedy，样本利用率通常高于纯 on-policy 方法。
- $Q(s,a)$ 提供了动作层面的长期收益估计，便于诊断和规划接口使用。

**坏处、原因与常见修补**

| 问题 | 为什么会发生 | 常见改进 | 仍需保留的边界 |
|---|---|---|---|
| 最大化偏差 | 对含噪声的多个 $Q$ 估计取最大值，会系统性偏向偶然高估项 | Double Q / Double DQN 分开动作选择与价值评价；TD3 使用双 critic 取较小值 | 双估计器可能转为低估，不是“越保守越好” |
| 训练不稳定甚至发散 | 函数逼近、bootstrapping、off-policy 同时出现，构成 deadly triad | 目标网络、较慢的 Polyak 更新、回放、归一化、限制策略偏移；理论场景可用 gradient-TD 类方法 | 目标网络和 replay 是工程缓解，不是一般收敛证明 |
| 连续动作难求 $\arg\max_a Q$ | 每一步都要在连续高维空间做内层优化 | 引入显式 actor，转向 DDPG、TD3、SAC 等 actor-critic | actor 会主动利用 critic 的估计漏洞 |
| 难表达多峰随机策略 | greedy 派生策略通常趋向单一动作 | 最大熵 actor-critic、分布式策略或显式能量模型 | 学回报分布不等于自动得到多峰策略 |
| 稀疏奖励与长信用链 | 错误价值会沿 Bellman backup 传播，早期几乎没有学习信号 | n-step return、eligibility trace、内在奖励、目标条件化、演示数据 | 奖励塑形可能改变真实最优策略或被钻漏洞 |

[Double DQN](https://ojs.aaai.org/index.php/AAAI/article/view/10295) 直接针对 DQN 的过估计；[TD3](https://proceedings.mlr.press/v80/fujimoto18a.html) 则说明类似估值误差也会污染连续控制中的 actor。

### 3.2 Policy-based：直接优化动作分布

Policy-based 方法显式参数化 $\pi_\theta(a\mid s)$。最基本的策略梯度使用 log-derivative 形式

$$
\nabla_\theta J(\theta)
=\mathbb{E}_{\pi_\theta}
\left[\nabla_\theta\log\pi_\theta(a_t\mid s_t)\,G_t\right].
$$

REINFORCE 用完整 Monte Carlo 回报 $G_t$；实际系统常换成优势估计 $\hat A_t$。策略直接输出离散分布或连续分布参数，因此不必在动作空间里再求一次 $\arg\max$。

**优势**

- 自然处理连续动作、随机策略和多峰行为。
- 可以直接加入熵、KL、成本、风险等策略级约束。
- 某些任务中策略比完整价值面更容易近似；参数的小变化通常带来较平滑的策略变化。
- 优化目标与最终执行对象一致，不要求每个动作的 $Q$ 都同样准确。

**坏处、原因与常见修补**

| 问题 | 为什么会发生 | 常见改进 |
|---|---|---|
| 梯度方差高 | 同一动作之后的长期回报受大量随机因素影响 | baseline、advantage、GAE；更多并行轨迹与规范化 |
| 样本利用率低 | 纯 on-policy 更新后旧轨迹很快失效 | PPO 对最新批次做有限轮复用；或改用 off-policy actor-critic、模型想象 |
| 一次更新毁掉策略 | 新策略离采样策略过远，优势估计不再可靠 | TRPO 的 KL 约束思想；PPO ratio clipping、KL 监控与 early stopping |
| 熵过早坍缩 | 早期偶然优势被放大，策略迅速变得确定 | 熵奖励、最大熵 RL、SAC 自动温度调节 |
| 只会忠实优化错误奖励 | 数值目标与真实意图不一致 | 奖励审计、独立隐藏指标、约束、人工反馈与对抗测试 |

需要谨慎理解 [PPO](https://arxiv.org/abs/1707.06347)：它通常被归为 on-policy，是因为先用 $\pi_{old}$ 采集新 rollout，再围绕这批数据做有限轮更新；概率比裁剪是保守更新的启发式，并不构成绝对 trust region 或单调改进保证。[Truly PPO 的分析](https://proceedings.mlr.press/v115/wang20b.html)

### 3.3 Actor-Critic：不是第三个互斥阵营

Actor-Critic 同时学习显式策略 actor 与价值/优势 critic。critic 用 bootstrapping 降低纯 Monte Carlo 策略梯度的方差，actor 则解决连续动作选择问题。因此它更像 value 与 policy 的组合结构：

- A2C、A3C、PPO 常按 on-policy actor-critic 实现；
- DDPG、TD3、[SAC](https://proceedings.mlr.press/v80/haarnoja18b.html) 是 online + off-policy actor-critic；
- CQL、IQL 等离线方法也可能同时包含价值学习和策略抽取。

它的核心风险是 **critic exploitation**：actor 会寻找 critic 误差最大的动作，而不是环境中真正最好的动作，表现为“预测 $Q$ 不断升高，真实 return 反而下降”。双 critic、延迟 actor 更新、目标策略平滑、熵正则与不确定性惩罚都在缓解这个耦合问题，但不会让 critic 自动变真。

## 4. 第二条轴：Online 与 Offline

### 4.1 Online RL：还能继续向环境提问

Online RL 在训练期间可以执行当前或行为策略并取得新 transition。回放池可以很大，样本可以被反复使用；只要仍在持续加入新环境数据，它就仍是 online。

**优势**

- 能主动探索并补齐当前数据盲区。
- 策略暴露出失败后，可以采集针对性新数据纠正。
- 能适应动力学、任务或用户偏好的变化。
- 可以从 offline 预训练开始，再进行 offline-to-online 微调。

**主要代价与对策**

- **交互昂贵、慢。** 使用并行模拟、off-policy replay、模型预测/世界模型、离线或模仿预训练降低真机样本量。
- **探索可能伤人或损坏设备。** 使用约束 MDP、shield、安全层、控制屏障函数、备用控制器和人工接管；仅靠奖励惩罚通常不足以保证硬安全。
- **数据分布不断变化。** 控制 update-to-data ratio、保持评测策略冻结、监控 replay 新旧比例，并报告 wall-clock 与真实交互预算。
- **对奖励尺度和随机种子敏感。** 做奖励归一化、多随机种子、置信区间和独立评测，不只报告最佳一次运行。

[Constrained Policy Optimization](https://proceedings.mlr.press/v70/achiam17a.html) 是约束优化方向的代表，但它主要约束期望累计成本，不等于逐时刻零违规；真机安全通常仍需要运行时控制层。

### 4.2 Offline RL：只能从固定日志中学习

Offline RL 使用预先收集的静态数据集 $\mathcal D$，训练时不能执行新策略向环境索取更多样本。这使机器人、医疗、推荐等高成本或高风险场景能够复用历史日志。[Offline RL 教程](https://arxiv.org/abs/2005.01643) 这里的 offline 指 **fixed-dataset learning**，不是某些旧教材中“等一个 episode 结束后再统一更新”的实现时序。

**优势**

- 不在训练过程中进行危险探索。
- 能利用示范、历史系统日志和多行为策略混合数据。
- 训练与数据采集解耦，便于可重复实验和集中算力训练。
- 相比行为克隆，能利用奖励与时序信用分配，在数据支持范围内组合更好的决策。

**核心坏处：分布偏移与外推误差**

若 learned policy 选择了数据集中罕见或未出现的动作，函数逼近器仍会为它输出 $Q$；偶然高估的 OOD 动作会被策略改进选中，再被 Bellman backup 放大。于是“普通 off-policy 算法能用 replay”并不意味着它能直接用于完全固定的数据集。

三条代表性修补路线是：

1. **限制动作落在数据支持附近。** [BCQ](https://proceedings.mlr.press/v97/fujimoto19a.html) 学习行为支持并限制候选动作。
2. **对数据外动作做悲观估值。** [CQL](https://proceedings.neurips.cc/paper/2020/hash/0d2b2061826a5df3221116a5085a6052-Abstract.html) 在 Bellman 目标之外加入保守正则。
3. **训练时避免显式查询数据外动作。** [IQL](https://openreview.net/forum?id=68n2s9ZJWF8) 以 expectile value、Q backup 和优势加权行为克隆抽取策略。

这些方法控制外推风险，却不能凭空补出数据从未覆盖的因果信息。悲观性过强还会把策略锁在行为策略附近。更可靠的实践通常同时需要：覆盖更广的数据、分层数据质量分析、离线策略评估、不确定性 ensemble，以及条件允许时的小心 online fine-tuning。

## 5. 第三条轴：On-policy 与 Off-policy

设行为策略 $\mu$ 产生数据，目标策略 $\pi$ 是当前要评价或改进的策略。

### 5.1 On-policy：用“我现在的行为”改进“我现在的策略”

严格 on-policy 中 $\mu=\pi$；工程上也常把只允许很小 policy lag 的方法归在这一类。

**优点**

- 数据分布与目标策略匹配，通常不需要一般的 off-policy 校正。
- 算法概念直接，在非线性函数逼近下往往更容易获得稳定基线。
- 学到的是包含当前探索方式在内的实际行为价值；例如 SARSA 会考虑 $\epsilon$-greedy 后续仍可能误走的风险。

**坏处与修补**

- 策略一更新，旧数据迅速陈旧，真实样本效率低。可用并行 actor、模拟器、GAE，以及 PPO 对最新 batch 的有限复用。
- 轨迹相关性强、优势估计噪声大。可打乱 minibatch、规范化 advantage、增加 rollout 长度或并行环境。
- 为提高复用而做太多 epoch，会逐渐偏离采样策略。应监控 KL、clip fraction 和 importance ratio，并及时 early stop。

### 5.2 Off-policy：从别人的行为学习目标策略

Off-policy 允许 $\mu\neq\pi$，因此可使用 replay、演示、旧版本策略或多 actor 的数据。必要覆盖条件可写为

$$
\pi(a\mid s)>0 \Longrightarrow \mu(a\mid s)>0,
$$

即目标策略会选择的动作，行为数据至少要有机会覆盖。

**优点**

- 数据可重复使用，通常更节省环境交互。
- 探索策略与最终目标策略可以分工。
- 能吸收示范、历史日志和不同策略产生的数据。

**坏处与修补**

- **分布不匹配。** 用 importance sampling、weighted/truncated ratio、Retrace 或 V-trace 校正；截断会以偏差换方差。
- **长时域权重爆炸。** 使用 per-decision correction、截断、self-normalization 或 doubly robust 估计；若行为策略完全没有覆盖目标动作，仅靠权重无法修复。
- **deadly triad。** 目标网络、Double/twin critics、限制策略偏移和更稳定的 off-policy 目标只能缓解；应同时监控 $Q$ 尺度、TD error 与真实 return。
- **固定数据中的极端 OOD。** 使用行为约束、悲观价值或 in-support 更新；这已经进入 offline RL 的专门问题。

[IMPALA / V-trace](https://proceedings.mlr.press/v80/espeholt18a.html) 展示了分布式 actor–learner policy lag 的校正思路。再次强调：off-policy 不等于 offline；DQN 与 SAC 是最清楚的 online + off-policy 反例。

## 6. 第四条轴：Model-free 与 Model-based

这一轴讨论的不是“有没有神经网络”，而是**策略改进或动作选择是否显式利用环境模型**。环境模型通常描述状态转移和奖励：

$$
\hat P_\phi(s_{t+1}\mid s_t,a_t),
\qquad
\hat R_\phi(s_t,a_t),
$$

也可能只在 latent space 中预测对控制有用的下一表示、奖励、价值或策略先验。模型可以由数据学习，也可以来自已知物理方程、游戏规则或仿真器。

| 对比项 | Model-free | Model-based |
|---|---|---|
| 决策依据 | 直接学习价值或策略 | 用已知/学习模型做规划、想象或合成更新 |
| 真实样本效率 | 通常较低 | 通常较高，但取决于模型质量 |
| 训练与推理计算 | 训练可能需要大量交互，部署通常较轻 | 需要训练模型；MPC/MCTS 路线还增加决策时计算 |
| 主要风险 | 样本昂贵、探索与信用分配困难 | 模型偏差、误差累积与 planner exploitation |
| 典型方法 | DQN、PPO、SAC、IQL | Dyna、PETS、MBPO、Dreamer、MuZero、TD-MPC2 |

### 6.1 Model-free：直接从真实 transition 学价值或策略

Model-free 方法不显式学习并调用 $\hat P$ 来做 rollout、规划或 policy improvement，而是直接用环境给出的 transition 更新 $Q$、$V$ 或 $\pi$。SARSA、DQN、PPO、SAC、CQL 和 IQL 都属于这一大类。

这里的“无模型”不是“对世界一无所知”：策略网络仍会从数据中隐式编码动力学规律，也可以使用状态估计器、视觉编码器、演示、经验回放和辅助预测损失。判断标准是：**那个预测模型是否真正参与了动作选择或策略更新中的反事实 rollout。**

**优势**

- 训练目标直接面向价值或策略，不必先把整个环境预测准确。
- 不会因显式模型的长期 rollout 误差而直接选错动作。
- 算法与工程链路通常更简单；训练完成后 actor 或 $Q$ 的单步推理很快。
- 在有海量便宜交互的模拟器中，PPO、DQN、SAC 等往往是强而可靠的基线。

**坏处、原因与常见修补**

| 问题 | 为什么会发生 | 常见改进 | 代价或边界 |
|---|---|---|---|
| 真实样本效率低 | 每个新状态的后果主要靠实际交互获得，不能在模型里反复试验 | off-policy replay、n-step、演示/离线预训练、并行仿真 | replay 不能创造未覆盖的因果信息 |
| 稀疏奖励探索困难 | 没有模型帮助预演通往远期奖励的动作序列 | goal-conditioned RL、层级 RL、内在奖励、HER、课程学习 | bonus 或 shaping 可能改变优化目标 |
| 长时信用分配弱 | TD 或 Monte Carlo 要跨很长时间传播信号 | eligibility trace、GAE、return decomposition、层级技能 | 偏差—方差仍需权衡 |
| 真机试错昂贵或危险 | 错误策略必须在环境中执行后才暴露 | offline 初始化、模仿学习、安全层、fallback controller | “少试错”不等于形式化安全 |
| 迁移到新动力学慢 | 策略把动力学隐式固化在参数中 | domain randomization、context adaptation、system identification | 适应范围仍受训练分布限制 |

### 6.2 Model-based：在模型中预演，再决定怎样行动

Model-based RL 使用环境模型比较“如果执行不同动作，未来会怎样”。一种典型的有限时域规划目标是

$$
a_{t:t+H-1}^{*}
=\arg\max_{a_{t:t+H-1}}
\mathbb E_{\hat P_\phi}
\left[
\sum_{k=0}^{H-1}\gamma^k\hat R_\phi(\hat s_{t+k},a_{t+k})
+\gamma^H\hat V(\hat s_{t+H})
\right].
$$

显式 reward 并非必要条件：goal-conditioned planner 也可以最小化预测终点与目标状态/目标图像 latent 的距离。关键仍在于，它是否使用模型预测不同候选动作的后果。

实践中常只执行 $a_t^*$，观察真实下一状态后重新规划，这就是 receding-horizon MPC。Model-based 不只有一种实现：

| 路线 | 模型怎样参与决策 | 代表方法 | 推理时是否规划 |
|---|---|---|---|
| 已知模型规划 | 直接用规则、物理模型或模拟器搜索 | Dynamic Programming、AlphaZero | 通常是 |
| Dyna 式混合 | 真实 transition 学习模型，再用模型生成额外更新 | Dyna-Q | 不一定 |
| 合成短 rollout | 在真实 replay 附近生成短轨迹，训练 model-free learner | MBPO | 通常不是 |
| 决策时轨迹优化 | 对候选动作序列滚动预测并选最优 | PETS、TD-MPC2 | 是，通常 MPC/CEM/MPPI |
| 隐模型树搜索 | 预测 reward/value/policy 所需的 latent dynamics | MuZero | 是，MCTS |
| 想象中训练策略 | 在世界模型内训练 actor–critic，部署时直接执行 actor | Dreamer | 通常不是 |

这张表揭示一个常见误解：**model-based 不等于部署时一定很慢地在线规划。** Dreamer 把规划成本摊销进 actor；相反，MuZero、PETS、TD-MPC2 把一部分计算留到决策时。

**优势**

- 同一条真实 transition 可用于学习模型，再产生许多候选未来，通常更节省环境交互。
- 能显式比较动作序列、目标与约束，适合 MPC、目标图像规划和安全过滤。
- 模型可跨奖励或目标复用；任务变化时，有时只需改变规划目标。
- 预测误差、ensemble 分歧和 imagined rollout 可以提供诊断信号。

**核心坏处：模型偏差与规划器利用**

单步误差很小，也可能在长 rollout 中累积。更危险的是，planner 或 actor 会主动寻找模型最不准确、但预测奖励最高的动作，即 **model exploitation**：模型里的回报不断上升，真实环境表现却下降。

| 失败模式 | 典型症状 | 常见缓解 | 仍然解决不了什么 |
|---|---|---|---|
| 误差随时间累积 | horizon 越长，预测与真实轨迹越偏 | 短 rollout、MPC 每步重规划、multi-step loss | 不能消除系统性偏差 |
| 数据外动作被虚假高估 | planner 选择奇怪、激进或不可执行动作 | dynamics ensemble、不确定性惩罚、pessimism、动作支持约束 | ensemble 可能共同犯错 |
| 像素预测好但控制差 | 训练资源花在无关背景，关键接触/奖励预测不足 | latent/control-centric model、reward/value heads、任务相关表示 | 任务相关模型可能难迁移到新目标 |
| 随机性被均值化 | 多峰未来变成模糊或不存在的“平均未来” | stochastic latent、distributional prediction、多个候选 rollout | 概率校准仍然困难 |
| 规划计算昂贵 | MPC/MCTS 每一步要评估大量候选序列 | policy prior、短 horizon、并行 rollout、蒸馏成 actor | 训练效率高不代表推理更快 |
| 模型与策略共同漂移 | 新策略访问模型没见过的区域，误差又反过来误导策略 | 交替收集数据、保守更新、监控模型误差与真实 return | 真机收集仍可能有风险 |

[PETS](https://proceedings.neurips.cc/paper/2018/hash/3de568f8597b94bda53149c7d7f5958c-Abstract.html) 用 probabilistic ensemble 和 trajectory sampling 表达认知与环境不确定性；[MBPO](https://proceedings.neurips.cc/paper/2019/hash/5faf461eff3099671ad63c6f3f094f7f-Abstract.html) 则用短模型 rollout 控制偏差。两者都说明更可靠的路线通常不是无限延长想象，而是在模型利用率与误差之间找平衡。

### 6.3 “世界模型”与 Model-based RL 不是完全同义

- **世界模型**通常指学习到的环境表征与动力学；**model-based RL** 还包括使用已知模型的规划。
- 学会重建视频不自动构成 model-based control；只有模型真正参与 policy improvement 或动作选择，才进入这一分类。
- 不重建观测也不等于 model-free。[MuZero](https://doi.org/10.1038/s41586-020-03051-4) 只预测规划所需的 reward、value 与 policy，却是典型 model-based 方法。
- 部署时不搜索也不等于 model-free。[Dreamer](https://openreview.net/forum?id=0oabwyZbOu) 在学习到的 RSSM 中训练 actor–critic，再把决策摊销到 actor。
- Model-based 仍可分 online/offline：在线方法边交互边修正模型；offline model-based RL 只能从固定日志学习模型，更容易遭遇数据外 rollout。
- On/off-policy 也不能简单套用到整条 model-based pipeline：真实数据的行为策略、模型生成分布和最终 target policy 可能是三种不同分布。

因此，Model-free / Model-based 更像一条连续谱。许多强方法是混合系统：TD-MPC2 同时学习 latent dynamics、reward、$Q$ 与 policy prior；MBPO 用模型生成数据，却用 SAC 优化策略；Dyna 把真实经验与想象更新放进同一个循环。

## 7. 代表算法坐标表

| 算法 | 模型使用 | 学习对象 | 数据来源 | 策略关系 | 适用与备注 |
|---|---|---|---|---|---|
| SARSA | Model-free | Value-based | Online | On-policy | 离散动作；评估包含当前探索在内的行为 |
| Q-learning | Model-free | Value-based | Online | Off-policy | 行为可探索，目标趋向 greedy |
| DQN / Double DQN / Rainbow | Model-free | Value-based | Online | Off-policy | 高维观测、离散动作、经验回放 |
| REINFORCE | Model-free | Pure policy-based | Online | On-policy | 随机策略；简单但高方差 |
| A2C / A3C | Model-free | Actor-Critic | Online | On-policy | 用 critic 降方差，并行采样 |
| TRPO / PPO | Model-free | Policy gradient + critic | Online | 近似 On-policy | 连续控制常用；约束策略更新幅度 |
| DDPG / TD3 | Model-free | Actor-Critic | Online | Off-policy | 连续动作、确定性 actor |
| SAC | Model-free | Actor-Critic | Online | Off-policy | 连续动作、随机 actor、最大熵目标 |
| IMPALA | Model-free | Actor-Critic | Online、分布式 | Off-policy correction | V-trace 修正 actor–learner 延迟 |
| BCQ | Model-free | Value / Actor-Critic 混合 | Offline | Off-policy | 限制策略使用数据支持内动作 |
| CQL | Model-free | Value regularization；可叠加 DQN 或 SAC | Offline | Off-policy | 通过悲观 $Q$ 控制 OOD 高估 |
| IQL | Model-free | $V/Q$ + 优势加权策略抽取 | Offline | Off-policy | 价值训练阶段避免查询数据外动作 |
| Decision Transformer | 通常 Model-free | 条件策略 / 序列建模 | Offline | 不宜硬套经典更新分类 | 不进行经典 TD policy evaluation |
| Dyna-Q | Model-based 混合 | Model + Q | Online | 通常 Off-policy | 真实经验与模型生成更新并用 |
| PETS | Model-based | Dynamics ensemble + MPC | Online | 决策时规划 | 适合样本昂贵、连续控制 |
| MBPO | Model-based 混合 | Dynamics + SAC | Online | Off-policy | 用短模型 rollout 扩充 replay |
| Dreamer | Model-based | RSSM + Actor-Critic | Online、replay-based | 不宜单标签概括 | 在 imagination 中训练，部署 actor |
| MuZero | Model-based | Latent dynamics + Value/Policy | Online / self-play | 搜索与重分析 | 不重建像素，部署时 MCTS |
| TD-MPC2 | Model-based | Latent model + $Q$ + policy prior | Online / Offline | Replay-based | 部署时用 MPPI/MPC 规划 |

这张表也说明：**Policy-based 不都 on-policy，Value-based 也不都 off-policy。** Actor-Critic 应作为混合结构单独标注，而不是强行塞进某一端。

## 8. 常见失败症状：看到什么，先检查什么

| 现象 | 高概率原因 | 优先检查与处理 |
|---|---|---|
| TD loss、$Q$ 值持续爆炸，return 突然崩溃 | 移动目标、过估计、deadly triad、奖励尺度异常 | 对照 Monte Carlo return；Double/twin critic；减小学习率与 update ratio；目标网络；梯度裁剪；检查终止标记 |
| actor 预测 $Q$ 很高，真实表现很差 | actor 利用了 critic 在稀疏区域的漏洞 | 可视化数据覆盖；双 critic；延迟 actor；行为正则；ensemble uncertainty |
| PPO 曲线剧烈振荡、不同 seed 差异大 | 优势方差高、更新过大、同批数据复用过多 | advantage normalization；调低 LR/epoch；看 KL 与 clip fraction；early stop；增加 seeds |
| 策略熵很快归零 | 探索不足、熵系数太小、早期偶然优势放大 | entropy bonus；SAC 温度调节；探索 bonus；检查动作尺度与 squashing |
| 离线验证 $Q$ 很好，部署却失败 | OOD 动作高估、数据覆盖不足、OPE 失真 | CQL/IQL/BCQ；按行为策略支持做分组；FQE/多种 OPE 交叉核验；允许时小规模安全在线验证 |
| 模型单步误差不大，规划越长反而越差 | rollout 误差累积，planner 利用模型漏洞 | 缩短 horizon；MPC 重规划；ensemble disagreement；同时画真实/模型 return |
| 生成未来很清晰，控制却没有提升 | 模型优化了像素似然，而非动作相关、奖励相关信息 | latent/control-centric objective；reward/value heads；按动作条件做反事实评测 |
| reward 上升，真实任务质量下降 | reward hacking 或评测泄漏 | 独立隐藏指标；奖励通道隔离；约束和人工审计；检查 agent 是否操纵终止/传感器 |
| 真机训练发生碰撞或越界 | 安全只被写成软惩罚，探索超出可恢复区 | 硬 shield / barrier；fallback controller；动作限幅；人工接管；先离线和仿真预训练 |
| 只在一个 seed 上显著提升 | 高方差或选择性报告 | 统一预算、多 seed、均值和区间、完整学习曲线、预先定义评测协议 |

没有一种修补能免费解决问题：importance ratio 截断用偏差换方差，悲观 Q 用性能上限换稳健性，熵奖励用探索换短期回报，模型 rollout 又引入模型偏差。更准确的说法是“在特定假设下缓解”，而不是“彻底解决”。

## 9. 怎样选第一条基线

可以按任务约束快速判断：

1. **离散动作、能够在线交互：** 先做 Double DQN；若行动风险会受探索影响，也比较 SARSA 类 on-policy 基线。
2. **连续动作、在线样本昂贵：** 先做 SAC；若动力学相对平滑且计算预算充足，再比较 PETS、TD-MPC 类模型规划方法。
3. **有大量并行仿真、重视稳定简单：** PPO 是常见基线，但必须报告真实样本量和同批数据复用次数。
4. **只有固定日志：** 先做行为克隆作为下界，再做 IQL / CQL；若尝试 offline model-based RL，必须额外评估数据外 rollout 与不确定性。数据覆盖差时，算法调参不能替代补数据。
5. **真机且不允许危险探索：** offline 预训练 + 约束在线微调，并保留独立安全控制器和回退策略。
6. **奖励稀疏、长时规划明显：** 除 model-free 基线外，考虑目标条件化、层级 RL、模型学习或世界模型，但要单独评估模型偏差。
7. **硬约束且动力学模型可信：** MPC、shield 或控制屏障函数可以与 RL 叠加；模型预测控制仍不能替代系统级安全验证。

## 10. 还可以沿哪些维度延伸

四条主轴之外，还有多条独立维度：

- **离散 / 连续 / 混合动作：** 决定价值最大化、策略分布与控制接口的实现。
- **单任务 / 多任务 / Goal-conditioned：** 是否把任务或目标作为条件输入。
- **风险中性 / 风险敏感 / 约束 RL：** 优化期望回报，还是同时控制方差、尾部风险与成本。
- **单智能体 / 多智能体：** 环境非平稳性、信用分配和博弈均衡会成为新问题。
- **层级、分布式与序列建模：** 分别处理长时抽象、大规模采样和轨迹条件生成。

因此，“某算法属于哪一类”最好写成一个坐标，而不是一个标签。例如 SAC 可以描述为：**model-free、actor-critic、online、off-policy、maximum-entropy、continuous-control**。

## 11. 最小心智模型

- **Value / Policy：** 你把主要建模能力放在价值面，还是动作分布？
- **Online / Offline：** 训练失败时，你还能不能回环境补数据？
- **On / Off-policy：** 当前更新的数据分布，究竟属于正在优化的策略吗？
- **Model-free / Model-based：** 你是直接从 transition 学决策，还是让模型参与想象、规划或合成更新？
- **Actor-Critic：** 让价值估计帮助策略优化，但也会把 critic 的错误传给 actor。
- **所有改进都有交换条件：** 稳定性、偏差、方差、样本效率、保守性和安全性之间不存在免费的午餐。

## 参考资料

1. Sutton, R. S. & Barto, A. G. *Reinforcement Learning: An Introduction*, 2nd ed. MIT Press, 2018. [出版社页面](https://mitpress.mit.edu/9780262039246/reinforcement-learning/)；[作者开放版 PDF](http://incompleteideas.net/book/RLbook2020.pdf)。
2. Mnih, V. et al. Human-level control through deep reinforcement learning. *Nature* 518, 529–533 (2015). [论文](https://doi.org/10.1038/nature14236)；[官方代码（归档）](https://github.com/google-deepmind/dqn)。
3. Schulman, J. et al. Proximal Policy Optimization Algorithms (2017). [arXiv](https://arxiv.org/abs/1707.06347)。
4. Haarnoja, T. et al. Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor. *ICML* (2018). [PMLR](https://proceedings.mlr.press/v80/haarnoja18b.html)。
5. Fujimoto, S., van Hoof, H. & Meger, D. Addressing Function Approximation Error in Actor-Critic Methods. *ICML* (2018). [PMLR](https://proceedings.mlr.press/v80/fujimoto18a.html)。
6. Levine, S., Kumar, A., Tucker, G. & Fu, J. Offline Reinforcement Learning: Tutorial, Review, and Perspectives on Open Problems (2020). [arXiv](https://arxiv.org/abs/2005.01643)。
7. Fujimoto, S., Meger, D. & Precup, D. Off-Policy Deep Reinforcement Learning without Exploration. *ICML* (2019). [PMLR](https://proceedings.mlr.press/v97/fujimoto19a.html)。
8. Kumar, A. et al. Conservative Q-Learning for Offline Reinforcement Learning. *NeurIPS* (2020). [正式论文页](https://proceedings.neurips.cc/paper/2020/hash/0d2b2061826a5df3221116a5085a6052-Abstract.html)；[官方代码](https://github.com/aviralkumar2907/CQL)。
9. Kostrikov, I., Nair, A. & Levine, S. Offline Reinforcement Learning with Implicit Q-Learning. *ICLR* (2022). [OpenReview](https://openreview.net/forum?id=68n2s9ZJWF8)；[官方代码](https://github.com/ikostrikov/implicit_q_learning)。
10. van Hasselt, H., Guez, A. & Silver, D. Deep Reinforcement Learning with Double Q-learning. *AAAI* (2016). [正式论文页](https://ojs.aaai.org/index.php/AAAI/article/view/10295)。
11. Espeholt, L. et al. IMPALA: Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures. *ICML* (2018). [PMLR](https://proceedings.mlr.press/v80/espeholt18a.html)。
12. Achiam, J. et al. Constrained Policy Optimization. *ICML* (2017). [PMLR](https://proceedings.mlr.press/v70/achiam17a.html)。
13. Watkins, C. J. C. H. & Dayan, P. Q-learning. *Machine Learning* 8, 279–292 (1992). [论文](https://doi.org/10.1007/BF00992698)。
14. Williams, R. J. Simple statistical gradient-following algorithms for connectionist reinforcement learning. *Machine Learning* 8, 229–256 (1992). [论文](https://doi.org/10.1007/BF00992696)。
15. Schulman, J. et al. Trust Region Policy Optimization. *ICML* (2015). [PMLR](https://proceedings.mlr.press/v37/schulman15.html)。
16. Schulman, J. et al. High-Dimensional Continuous Control Using Generalized Advantage Estimation (2015). [arXiv](https://arxiv.org/abs/1506.02438)。
17. Moerland, T. M., Broekens, J., Plaat, A. & Jonker, C. M. Model-based Reinforcement Learning: A Survey (2020). [arXiv](https://arxiv.org/abs/2006.16712)。
18. Chua, K., Calandra, R., McAllister, R. & Levine, S. Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models. *NeurIPS* (2018). [正式论文页](https://proceedings.neurips.cc/paper/2018/hash/3de568f8597b94bda53149c7d7f5958c-Abstract.html)。
19. Janner, M., Fu, J., Zhang, M. & Levine, S. When to Trust Your Model: Model-Based Policy Optimization. *NeurIPS* (2019). [正式论文页](https://proceedings.neurips.cc/paper/2019/hash/5faf461eff3099671ad63c6f3f094f7f-Abstract.html)。
20. Hafner, D., Lillicrap, T., Norouzi, M. & Ba, J. Mastering Atari with Discrete World Models. *ICLR* (2021). [OpenReview](https://openreview.net/forum?id=0oabwyZbOu)。
21. Schrittwieser, J. et al. Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model. *Nature* 588, 604–609 (2020). [论文](https://doi.org/10.1038/s41586-020-03051-4)。
22. Hansen, N., Su, H. & Wang, X. TD-MPC2: Scalable, Robust World Models for Continuous Control. *ICLR* (2024). [正式论文页](https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html)；[官方代码](https://github.com/nicklashansen/tdmpc2)。
