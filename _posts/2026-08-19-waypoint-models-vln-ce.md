---
title: "文献精读｜Waypoint Models：连续环境 VLN 中的可执行航点动作"
date: 2026-08-19
permalink: /posts/waypoint-models-vln-ce/
tags: [literature-note, embodied-ai, vln, continuous-navigation, waypoint, reinforcement-learning]
note_type: single-paper
literature_topics: [embodied-ai, vln, reinforcement-learning]
---

> **阅读范围**：ICCV 2021 正文与官方补充材料全文，包括模型、DDPPO 目标、动作空间消融、VLN-CE 排行榜结果、LoCoBot 运动计时模型和超参数。
> **检索日期**：2026-08-19。
> **一句话结论**：把 VLN 策略的输出从固定 0.25 m 原语提升为相对极坐标航点，能显著减少停转次数和估算执行时间；但论文的导航成功率仍来自无噪声仿真，真机只用于标定时间模型，并未完成真实机器人 VLN 验证。

## 文献档案

- **论文**：*Waypoint Models for Instruction-Guided Navigation in Continuous Environments*
- **作者**：Jacob Krantz、Aaron Gokaslan、Dhruv Batra、Stefan Lee、Oleksandr Maksymets
- **机构**：Oregon State University；Facebook AI Research（FAIR）；Cornell University；Georgia Institute of Technology。第一作者的工作部分完成于 FAIR 实习期间。
- **年份 / 会议**：2021，IEEE/CVF International Conference on Computer Vision（ICCV 2021），CVF 公开版页码 15162–15171。
- **正式论文页**：[CVF Open Access](https://openaccess.thecvf.com/content/ICCV2021/html/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.html)
- **PDF**：[ICCV 2021 正式 PDF](https://openaccess.thecvf.com/content/ICCV2021/papers/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.pdf)；[官方补充材料](https://openaccess.thecvf.com/content/ICCV2021/supplemental/Krantz_Waypoint_Models_for_ICCV_2021_supplemental.zip)
- **DOI**：[10.1109/ICCV48922.2021.01488](https://doi.org/10.1109/ICCV48922.2021.01488)
- **项目 / 代码**：[项目页](https://jacobkrantz.github.io/waypoint-vlnce/)；[jacobkrantz/VLN-CE](https://github.com/jacobkrantz/VLN-CE)
- **预印本**：[arXiv:2110.02207](https://arxiv.org/abs/2110.02207)

## 核心结论

论文抓住了 VLN-CE 的一个常被指标掩盖的问题：固定的 `forward 0.25 m / turn 15°` 低层原语虽然便于比较，却让机器人频繁停转，仿真中的高 SPL 不一定转化为现实中的高执行效率。作者让策略直接预测“方向 + 角度微调 + 距离”的相对航点，再交给连续导航器执行。最强 WPN 在 Val-Unseen 的 SR/SPL 为 36/30，略低于固定 0.25 m 的 HPN 的 38/36；但基于 LoCoBot 计时曲线估算的 EET 从 297 s 降到 153 s，约快 1.94 倍。[原文 Table 1](https://openaccess.thecvf.com/content/ICCV2021/papers/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.pdf)

这项工作因此更像“动作接口与评测口径”的研究，而不只是又一个 VLN 网络：航点表达能力、路径指标和物理执行成本彼此并不单调一致。不过，153 s 与 297 s 都是用真机单动作计时拟合后回放仿真轨迹得到的估值；论文没有让 LoCoBot 在真实室内执行自然语言导航，不能把 EET 写成真机任务耗时。

## 检索记录

- **检索式**：`Waypoint Models instruction-guided navigation continuous environments ICCV 2021`；`2110.02207 waypoint VLN-CE code`；`10.1109/ICCV48922.2021.01488`。
- **来源优先级**：CVF 正式论文页与 PDF、CVF 官方补充材料、作者项目页和作者代码仓库；arXiv 仅用于版本交叉核验。
- **纳入原因**：该文直接定义并系统消融 VLN-CE 的航点动作空间，同时提出 EET/SCT 以连接仿真路径与机器人执行成本。
- **排除内容**：第三方博客、复现仓库和聚合数据库的指标不作为证据；不同数据库存在页码偏移时，以 CVF 公开会议版 15162–15171 为准。
- **版本审计**：arXiv 仅有 2021-10-05 提交的 v1；CVF 为正式 ICCV 2021 版本，未发现官方勘误或撤稿。DOI 可解析至 IEEE 会议记录。
- **全文状态**：正文 10 个 PDF 物理页及官方补充材料均已阅读，方法图、主结果表、超参数和 LoCoBot 计时拟合均已核对。
- **复现审计**：官方仓库提供论文各配置、预训练 WPN/HPN 权重与评测说明；环境依赖 Habitat-Sim/Lab 0.1.7、Python 3.6。README 明示硬件和构建差异可能使 leaderboard 数字变化，并指出训练时关闭 sliding、评测时开启 sliding，因此“公开权重可运行”不等于逐位复现论文表格。

## 研究背景

R2R 最初建立在离散全景节点图上，agent 只需从已知可达邻居中选下一个节点。VLN-CE 将同一批 Matterport3D 路径转入连续空间，agent 要处理厘米级位置和朝向，但主流接口仍使用固定步长、固定角度的低层原语。两种设置的差异不只是离散与连续：离散图把可达性、避障和长距离移动都预先编码在边上，而低层 VLN-CE 把每次 0.25 m 前进都暴露给策略。

作者认为，更接近移动机器人软件栈的接口应是：高层语言策略选一个局部目标，低层导航器完成点转向和直线移动。问题随之变成：航点的角度和距离应该多自由？更自由是否必然改善 SR/SPL？以及常用路径指标能否反映真实底盘的时间成本？

## 研究问题

1. 连续环境中的 VLN 策略能否直接预测相对航点，而不是逐个输出固定低层原语？
2. 航点的距离与角度采用连续、离散或常数参数时，成功率、路径效率与执行时间如何权衡？
3. 全景 RGB-D 与连续导航器带来的增益，和网络本身的增益分别有多大？
4. 用真实底盘标定的运动时间模型，是否会给出不同于 SPL 的模型排序？

## 方法与数据

![Waypoint Models 方法总览](/images/literature-notes/waypoint-models-vln-ce/method-overview.png)

*图 1｜原论文 Figure 2：WPN 读取 12 个全景 RGB-D 视角与语言，先在 12 个粗方向和 STOP 中选择，再为所选方向预测角度偏移与距离；局部导航器把极坐标航点转成运动。来源：正式 PDF 物理第 4 页。[原始 PDF](https://openaccess.thecvf.com/content/ICCV2021/papers/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.pdf)*

### 1. 任务、观测与地图假设

实验使用 VLN-CE 的 R2R 划分：16,844 个 instruction–path 对、5,611 条不同路径、90 个 Matterport3D 场景。每步观测由 12 个方位均匀分布的 256×256 RGB-D 视图组成，每个视图水平视场角 90°，共同覆盖 360°；输入还包含上一航点动作和递归视觉历史。策略不接收预建拓扑图或全局度量地图。

“无地图”不等于无几何先验。深度编码器直接提供局部几何，仿真器给出无噪声视图和确定性位姿变化；连续导航器假设能按预测的相对角度点转向，再沿直线到达目标。论文没有联合学习定位、碰撞恢复或动态避障，航点是否落在可达自由空间主要由 WPN 自己从 RGB-D 中学出。

### 2. 动作空间：从原语到相对极坐标航点

WPN 的动作分三层：

1. 在 12 个全景视角对应的粗方向和一个 `STOP` 中采样 $\hat\theta^D$；
2. 在所选方向内预测偏移 $\hat\theta^{\mathrm{offset}}$；
3. 预测径向距离 $\hat r$，得到 $(\hat r,\hat\theta^D+\hat\theta^{\mathrm{offset}})$。

连续偏移由截断高斯参数化，范围 $[-15^\circ,15^\circ]$；连续距离范围为 $[0.25,4.0]$ m。离散偏移取 $\{-15^\circ,-10^\circ,\ldots,15^\circ\}$，离散距离取 $\{0.25,0.75,\ldots,2.75\}$ m。最受限的 HPN 固定偏移为 $0^\circ$、距离为 0.25 m，只保留方向选择。

执行端有两个版本：连续导航器允许任意转角和步长；为与既有 VLN-CE 工作公平比较，离散导航器仅允许 `forward 0.25 m`、`left 15°`、`right 15°`、`stop`。这仍是“点转向 + 直线段”的运动学抽象，不是速度、角速度或电机级连续控制。

### 3. 表征与决策链

- RGB 用 ImageNet 预训练 ResNet-18，深度用 PointGoal 预训练 ResNet-50；每个全景帧还编码相对朝向的正余弦。
- 指令经 GloVe 和双向 LSTM 编码；独立 GRU 汇总平均池化视觉特征、上一动作和上下文，形成视觉历史。
- 指令注意力、空间注意力与全景注意力把语言、历史和当前 12 帧对齐；action GRU 输出用于粗方向、偏移、距离和状态价值的分布参数。
- 推理时取各动作分布的 mode，并重复“观察—预测航点—导航器执行”，直到 `STOP` 或最大步数。

### 4. DDPPO 训练目标

作者不使用该任务此前常见的模仿学习，而以 DDPPO/PPO 端到端优化航点策略。标准 actor–critic 损失为：

$$
\mathcal L_{\mathrm{standard}}
=\mathcal L_{\mathrm{action}}
+c_v\mathcal L_{\mathrm{value}}
-c_e\mathcal S,
$$

其中动作联合概率分解为粗方向、条件偏移与条件距离三项的乘积；熵也分别对三部分加权。为抑制不必要的大角度偏移，作者加入趋零正则：

$$
\mathcal L_{\mathrm{total}}
=\mathcal L_{\mathrm{standard}}+c_r\mathcal L_{\mathrm{offset}},
\qquad \mathcal L_{\mathrm{offset}}=\left|\hat\theta^{\mathrm{offset}}\right|.
$$

论文式 (15) 的奖励写为：

$$
r(s,t)=r_{\mathrm{success}}-\Delta d_t+r_{\mathrm{slack}},
\qquad
\Delta d_t=D(s_t)-D(s_{t-1}),
$$

其中在离目标 3 m 内调用 `STOP` 时 $r_{\mathrm{success}}=2.5$。为避免每预测一个远航点只付一次固定时间惩罚而偏爱极远动作，slack 按预测距离缩放：

$$
r_{\mathrm{slack}}=-0.05\frac{\hat r}{0.25\,\mathrm m}.
$$

补充材料给出 $\gamma=0.99$、GAE $\tau=0.95$、PPO clip 0.2、$c_v=0.5$、$c_r=0.1146$、总熵系数 0.1、Adam 学习率 $2\times10^{-4}$。训练分布在 64 块 GPU，约采集 2 亿仿真步，约 5 天，以 Val-Unseen SPL 选择 checkpoint。

### 5. EET 与 SCT：真机只用于标定

作者在物理 LoCoBot 上分别重复 5 次测量 30°–180° 转向和 0.25–2.75 m 平移，选择 MoveBase 的拟合曲线：

$$
t_{\mathrm{rotate}}(\phi)=0.000358\phi^2+0.108\phi+2.23,
\qquad
t_{\mathrm{translate}}(x)=4.2x+0.362.
$$

把仿真轨迹的每段动作代入曲线相加，得到 Estimated Execution Time（EET）。Success weighted by Completion Time（SCT）再用 RRT* 估计该运动学约束下的最短可达时间 $T$，对成功轨迹计 $T/\max(C,T)$。这里唯一的真机数据是单动作计时；导航轨迹、成功判定和碰撞状态仍全部来自 Habitat 仿真。

## 实验

### 协议与指标

核心比较在 Val-Seen/Val-Unseen 完成，使用 TL、NE、OS、SR、SPL，以及作者提出的 EET/SCT。评测采用确定性 mode。连续导航器结果用于动作空间消融；离散导航器结果用于 VLN-CE Challenge test 排行榜比较。论文还重新评测同一 checkpoint 的连续/离散执行，以拆分观测与动作接口的影响。

![Waypoint Models 关键动作空间结果](/images/literature-notes/waypoint-models-vln-ce/key-results.png)

*图 2｜原论文 Table 1：连续导航器下不同距离与角度表达能力的 Val-Seen/Val-Unseen 结果，以及由 LoCoBot 运动模型估算的 EET/SCT。来源：正式 PDF 物理第 6 页。[原始 PDF](https://openaccess.thecvf.com/content/ICCV2021/papers/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.pdf)*

### 航点自由度与执行效率

- 全连续 WPN 在 Val-Unseen 得到 TL 10.38、NE 6.90、OS 41、SR 34、SPL 29、EET 186 s、SCT 20。
- 离散距离 + 连续偏移的 WPN 是作者选定的最佳 WPN：TL 10.62、NE 6.62、OS 43、SR 36、SPL 30、EET 153 s、SCT 23。
- 固定 0.25 m 距离 + 连续偏移的 HPN 达到 TL 7.71、NE 6.02、OS 42、SR 38、SPL 36，却需要 EET 297 s、SCT 11。

因此，限制动作自由度可略微提高传统成功/路径指标，却会因频繁启停使估算时间显著增加。最佳 WPN 相对最佳 HPN 的 SR 低 2 个百分点、SPL 低 6 个百分点，但 EET 缩短 144 s；论文计算的平均轨迹速度约为 6.9 cm/s 对 2.6 cm/s。第二个随机种子把最佳 WPN 的 SPL 从 30 复现为 29，作者据此提醒 1 个 SPL 点可能不显著。

### 排行榜结果

在 VLN-CE Challenge test 上，HPN + 离散导航器取得 TL 8.02、NE 6.65、OS 37、SR 32、SPL 30；WPN + 离散导航器为 9.68、7.49、36、29、25。论文的 CMA 基线为 8.85、7.91、36、28、25，因此 HPN 比基线高 4 个 SR 点和 5 个 SPL 点。该比较支持全景航点模块对低层接口也有帮助，但并不能证明连续 WPN 在 test 上优于 HPN。

### 真机证据等级

论文没有报告真实房间中的 instruction-following episode，没有真实 SR/SPL、碰撞率或路径图。物理 LoCoBot 只执行了不同角度和距离的定长动作以拟合耗时函数。因此证据应分为：

- **仿真任务证据**：全部 SR、SPL、NE、TL 与 test leaderboard 数字；
- **真机测量支持的估算**：EET/SCT，其中底层单动作耗时来自真机，但轨迹来自仿真；
- **真实机器人 VLN 证据**：无。

## 主要发现

1. **航点是合适的中层接口。** 它比每 0.25 m 决策一次更接近机器人导航栈，也保留了语言策略对局部路径的控制。
2. **动作表达力与 SPL 不单调。** 更受限的 HPN 在 SR/SPL 上更好，而可变距离 WPN 在估算耗时上更好。
3. **指标会改变模型排序。** 只看 SPL 会选 HPN；把底盘启停成本纳入后，WPN 更实用。
4. **全景 RGB-D 和导航器是重要混杂因素。** 与前向 RGB-D、固定原语基线的差异不能全归因于策略网络。
5. **真机标定不等于真机部署。** 论文建立了仿真—执行成本的桥梁，但尚未跨过感知、定位、控制噪声与碰撞恢复的 sim-to-real 缺口。

## 结论

作者证明，在连续 VLN 中直接预测相对航点能减少低层决策次数，并提出 EET/SCT 让评测关注物理执行时间。结果的真正贡献不是“更连续一定更成功”，而是展示传统 SR/SPL 与机器人时间成本可能冲突：最佳路径指标和最佳执行接口并非同一模型。

## 局限与适用边界

### 作者承认或实验直接显示的边界

- WPN 的传统 SR/SPL 低于更受限的 HPN；自由动作空间更难探索和优化。
- 结果对折扣因子与 slack reward 较敏感，补充材料显示 $\gamma$ 会显著改变所学步长偏好。
- 复现实验的第二随机种子相差 1 SPL，主表多数设置没有系统报告均值、方差或置信区间。
- EET 依赖特定 LoCoBot 和 MoveBase 的拟合曲线，换底盘、控制器、载荷或地面条件都需重新标定。

### 额外识别的边界

- Habitat 中的点转向、直线移动和感知近似理想；没有位姿漂移、RGB-D 失效、轮滑、动态障碍和真实碰撞恢复。
- 输入是 12 路全景 RGB-D，传感器与计算假设重于单相机移动机器人。
- 没有显式局部规划器；把避障责任交给 WPN 并不能给出部署期硬安全保证。
- “continuous”主要指连续状态空间以及可连续参数化的航点，不是直接连续控制线速度和角速度。
- 约 2 亿仿真步、64 GPU 的训练成本很高；官方环境版本较旧，公开权重与现代 Habitat 构建间存在复现摩擦。
- EET/SCT 把单动作耗时相加，未建模并行感知、网络延迟、控制失败、重新规划和电池等系统成本。

## 我的思考

这篇论文最值得保留的不是某个网络模块，而是“策略接口就是归纳偏置”。固定原语让强化学习问题简单，却把物理系统最昂贵的启停行为当成免费；过度自由的连续动作又扩大探索空间。航点处在两者之间，既能让高层模型表达长程意图，又能由低层控制器约束可执行性。

下一步更扎实的研究应把相对航点接入带碰撞约束的局部规划器，在同一真实机器人上比较成功率、墙钟时间、能耗、碰撞和恢复次数；同时报告多个随机种子和运动模型误差。这样才能判断 WPN 的 153 s 优势是否会在真实感知和控制闭环中保留。

## 参考文献

1. Krantz, J., Gokaslan, A., Batra, D., Lee, S., & Maksymets, O. (2021). *Waypoint Models for Instruction-Guided Navigation in Continuous Environments*. ICCV 2021, 15162–15171. [正式论文页](https://openaccess.thecvf.com/content/ICCV2021/html/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.html) · [PDF](https://openaccess.thecvf.com/content/ICCV2021/papers/Krantz_Waypoint_Models_for_Instruction-Guided_Navigation_in_Continuous_Environments_ICCV_2021_paper.pdf) · [DOI](https://doi.org/10.1109/ICCV48922.2021.01488) · [代码](https://github.com/jacobkrantz/VLN-CE)
2. Krantz, J., et al. (2021). *Waypoint Models for Instruction-Guided Navigation in Continuous Environments: Supplementary Material*. [CVF 官方补充材料](https://openaccess.thecvf.com/content/ICCV2021/supplemental/Krantz_Waypoint_Models_for_ICCV_2021_supplemental.zip)
