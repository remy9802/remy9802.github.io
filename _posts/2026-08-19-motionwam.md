---
title: "精读｜MotionWAM：用预测式视频世界模型驱动人形机器人全身移动操作"
date: 2026-08-19
permalink: /posts/motionwam/
tags: [literature-note, motionwam, embodied-ai, world-action-model, humanoid, loco-manipulation, flow-matching, action-representation]
note_type: single-paper
literature_topics:
  - embodied-ai
  - wam
  - world-model
  - action-representation
excerpt: "精读 MotionWAM 的双 DiT、SONIC 全身运动表示、三阶段训练与九项 G1 真机实验，并区分一次视频模型前向、四步动作流积分和 50 Hz 低层控制。"
---

> **阅读范围**：arXiv v1 全文 17 页，包含附录 A–F、全部公式、图表与失败案例；另核验作者项目页、相关 DiT4DiT 官方仓库和开放资源状态。<br>
> **检索日期**：2026-08-19<br>
> **版本口径**：本文只把实验写成 arXiv v1 预印本的作者报告；截至检索日未发现同行评议版本、撤稿或正式勘误。<br>
> **核心问题**：能否把视频世界模型学到的未来动态先验，压缩成一次视频 DiT 前向中的隐藏特征，再由动作 DiT 实时生成兼顾行走、躯干与双手操作的统一全身运动？

## 文献档案

- **论文**：*MotionWAM: Towards Foundation World Action Models for Real-Time Humanoid Loco-Manipulation*
- **作者**：Jia Zheng、Teli Ma、Yudong Fan、Zifan Wang、Shuo Yang、Junwei Liang；前两位为共同一作，Shuo Yang 与 Junwei Liang 为共同指导/通讯作者。
- **机构**：Mondo Robotics、香港科技大学（广州）、香港科技大学。
- **年份 / 状态**：2026；arXiv `cs.RO` v1 预印本，2026-06-08 提交。
- **文献链接**：[arXiv:2606.09215](https://arxiv.org/abs/2606.09215) · [PDF](https://arxiv.org/pdf/2606.09215) · [官方项目页](https://dit4dit.github.io/MotionWAM/)。
- **DOI**：[10.48550/arXiv.2606.09215](https://doi.org/10.48550/arXiv.2606.09215) 是 arXiv/DataCite 仓储 DOI，不是会议或期刊 DOI。
- **代码链接**：截至检索日，**没有独立发布 MotionWAM 的代码、权重或完整三阶段训练配置**。作者公开的 [DiT4DiT](https://github.com/Mondo-Robotics/DiT4DiT) 是相关前作与底层框架，包含 G1 管线，但不能标作 MotionWAM 的完整官方实现。
- **数据状态**：Stage 1 的输入来源大多可公开访问；Stage 2 没有完整数据清单；Stage 3 的约 1,800 条 G1 真机示范没有公开。因此不能把“使用公开数据预训练”改写成“MotionWAM 数据集已发布”。
- **许可**：arXiv 条目标注 CC BY 4.0；DiT4DiT 仓库使用 MIT License。

## 核心结论

MotionWAM 的主要贡献不是完整生成未来视频，而是把**预测未来所需的内部计算**变成动作策略的条件：Cosmos-Predict2.5-2B 视频 DiT 在接近纯噪声的未来流时间点只前向一次，动作 DiT读取其隐藏特征，再用 4 步流积分生成全身运动 latent。随后，离散 motion token 交给 SONIC 低层跟踪器，连续分量控制末端执行器。这个设计避开了逐帧完整去噪与视频解码，却仍保留了视频预测预训练提供的动态先验。

在作者的 Unitree G1 真机协议中，MotionWAM 在 9 项任务、每项 20 次试验上的等权平均成功率为 **76.1%（137/180）**，最强基线 GR00T-N1.7 为 **43.9%（79/180）**，差值是 **32.2 个百分点**。三阶段消融也表明，移除视频预训练 Stage 1 后，五任务平均从 70% 降至 59%；移除跨本体动作后训练 Stage 2 后降至 42%。这些证据支持“视频先验与动作后训练对该完整配方有互补作用”。

但证据边界同样清楚：所有最终训练与测试都在 G1、同一九类任务和视觉相似物体上完成；主表没有置信区间或多训练种子；MotionWAM 专属代码、权重、Stage 2 配方和 Stage 3 数据均未开放。论文因此证明的是一个有力的**单平台闭集真机结果**，还没有证明跨硬件 foundation model、严格 novel-object 泛化、公开基准 SOTA 或安全部署。

## 检索记录

- **检索式**：准确题名、`MotionWAM arXiv`、`MotionWAM code weights dataset`、`MotionWAM correction erratum retraction`、作者及实验室主页。
- **主证据**：arXiv v1 元数据、17 页全文、作者官方项目页、Mondo Robotics 官方 GitHub 与 DiT4DiT 仓库。
- **纳入原因**：用户指定论文；它直接研究视频世界模型、统一全身动作表示与实时人形机器人移动操作。
- **全文状态**：已读 17/17 个 PDF 物理页，覆盖附录 A–F、训练超参数、数据配方、任务指令、失败案例和成功轨迹。
- **版本 / 更正审计**：arXiv 当前只有 v1；未见 conference/journal reference，也未发现 withdrawal、replacement、correction、erratum 或 retraction 记录。
- **开放资源审计**：官方项目页只链接论文、视频和 DiT4DiT；Mondo Robotics 的 GitHub 与 Hugging Face 未提供 MotionWAM 专属仓库或 checkpoint。
- **排除**：聚合站、自动摘要与第三方解读只用于发现线索，不用于元数据、实验数字或开源状态判断。

## 研究背景

### 1. 为什么“会操作”还不等于“会全身移动操作”

多数 VLA 策略围绕固定机械臂建立：视觉与语言输入映射到末端位姿、夹爪或关节动作。人形机器人的 loco-manipulation 则要求策略同时协调行走、身体朝向、躯干高度、平衡、双臂和末端执行器。若上身操作策略与下肢 locomotion policy 分开设计，高层命令常被压缩成速度或离散技能，下肢难以根据任务语义主动参与，例如踢球、蹲下取篮筐或边推车边装载。

另一条路线是把视频生成模型当世界模型：先预测未来观测，再从未来反推动作。它的优点是能利用海量无动作标签视频学习物体运动和人体—环境交互，问题是完整视频扩散通常需要多次大模型前向、逐步去噪和解码，很难进入真机闭环。

MotionWAM 试图把两条路线接在一起：让视频生成预训练提供动态表征，让较轻的 Motion DiT 把表征转成统一全身动作，同时不在部署时真的生成完整未来视频。

### 2. 它在“世界模型”谱系中的位置

MotionWAM 与可交互视频模拟器、Dreamer 类 reward-aware agent 或 MPC 世界模型并不相同：

| 路线 | 学习/预测对象 | 部署时如何决策 |
|---|---|---|
| 完整生成式世界模型 | 可解码未来观测或视频 | 可视化未来，或对候选动作反复 rollout |
| Dreamer / model-based RL | 动作条件潜状态、奖励、continuation | 在 imagination 中优化 actor，或做规划 |
| MotionWAM | 视频 DiT 的预测隐藏特征 + motion latent | 一次视频 DiT 前向后，由 Motion DiT 直接生成动作 |

MotionWAM 没有奖励、价值函数、MCTS、MPC，也不对不同候选动作生成反事实未来。更准确的称呼是**受预测式视频世界模型条件化的 world-action policy**，而不是可供任意规划器查询的通用模拟器。

## 研究问题

论文可以拆成五个可检验问题：

1. **动态先验**：视频预测模型的隐藏状态是否比静态视觉语言模型更适合作为全身动作条件？
2. **计算效率**：能否只运行一次 Video DiT，而不是完整多步生成未来视频，仍获得可用动态特征？
3. **动作统一**：能否用 SONIC 的离散 motion token 表示行走、身体姿态与足部交互，同时用连续值表达末端动作？
4. **训练迁移**：无动作视频预训练、跨本体动作后训练和目标 G1 示范微调是否互补？
5. **真机有效性**：这一配方能否在需要手脚协同的九类任务上，同时取得较高成功率和可用的动作块生成速度？

## 方法与数据

![MotionWAM 三阶段双 DiT 架构](/images/literature-notes/motionwam/motionwam-fig3-architecture.png)

*图 1｜MotionWAM 先用人类与机器人第一视角视频训练 Video DiT，再接入 Motion DiT 做跨本体动作后训练，最后用重定向到 G1 的全身示范联合微调。图中“离散运动 token + 连续末端值”揭示了策略与 SONIC 低层控制器之间的接口。来源：原论文 Figure 3，PDF 物理页 5。[原文 PDF](https://arxiv.org/pdf/2606.09215#page=5)*

### 1. 任务形式化：先预测动态，再反推动作

普通反应式 VLA 可写成

$$
\pi_\theta(a_t\mid o_t,l),
$$

其中 $o_t$ 是当前观测，$l$ 是语言指令。MotionWAM 把它改写成两步关系：

$$
o_{t+1}\sim p_v(\cdot\mid o_t,l),
$$

$$
m_t\sim p_a\!\left(\cdot\mid o_t,p_t,H(o_{t+1}^{\tau_v})\right).
$$

$p_v$ 是预测未来的视频模型，$p_t$ 是 proprioception，$H(\cdot)$ 表示从 Video DiT 中截取的隐藏特征，$m_t$ 是统一运动 latent。关键是第二式在部署时并不要求解码 $o_{t+1}$：系统只取一次高噪声未来流前向产生的 $H$。

### 2. 全身动作空间：离散身体运动 + 连续末端执行器

MotionWAM 沿用 SONIC 的运动表示，将一个动作写为

$$
m_t=(m_t^{\mathrm{cont}},k_t).
$$

- $k_t$ 表达 locomotion、躯干、身体高度与足部交互。SONIC 使用两个 32-level finite scalar quantization token；论文在接口层把它展开成 64 维离散值，取值落在 $[-1,1]$ 的 32 个等级上。
- $m_t^{\mathrm{cont}}$ 直接表达夹爪或灵巧手等末端执行器的连续控制量。
- 连续分量直接送往末端接口；离散分量需要恢复为合法 SONIC 量化值后再由控制器跟踪。

这里存在一个需要复现者留意的内部冲突：§3.1、Figure 3 与配置中的 66 维动作都指向“64 维 FSQ 向量 + 两个夹爪通道”，§3.3 却改用单一标量 $\tilde{k}_t$ 保存 codebook index，并写成取整得到 $k_t$。SONIC 的逐维 FSQ 与单一 code index 不是同一表示；在代码未公开的情况下，不能擅自断定实际量化与反量化过程。

统一 latent 的价值在于让策略直接表达任务相关腿部行为，而不是只给独立 locomotion controller 一个速度命令。但主实验把所有基线都适配到了同一 SONIC 接口，论文没有真正加入“上下身解耦”或“冻结腿部”的对照。因此，主结果能证明 MotionWAM 在该统一接口上有效，不能单独量化统一动作空间本身贡献了多少。

### 3. 双 DiT：视频动态先验与动作生成分工

#### Video DiT

视频分支从 Cosmos-Predict2.5-2B 初始化，包括冻结的因果时空 VAE、Video DiT 和冻结的文本编码器；语言表示来自 Cosmos-Reason1。视频 VAE 和文本编码器在三个阶段都冻结，Video DiT 则按阶段更新。

给定干净未来视频 latent $z^0$ 与高斯噪声 $\epsilon_v$，论文使用从干净到噪声的线性流路径：

$$
z^{\tau_v}=(1-\tau_v)z^0+\tau_v\epsilon_v,
$$

$$
\mathcal L_{\mathrm{video}}
=\mathbb E\left[
\left\|v_\theta^{\mathrm{video}}(z^{\tau_v},o_t,l,\tau_v)
-(\epsilon_v-z^0)\right\|_2^2
\right].
$$

训练时，未来帧为视频分支提供监督；部署时没有真实未来帧，系统令 $\tau_f\approx1$，从近似纯噪声的未来 latent 开始，只通过 Video DiT 一次，在一个固定 Transformer block 截取隐藏激活。它没有把流从噪声完整积分回干净视频，也没有经过 VAE decoder。

#### Motion DiT

Motion DiT 读取三类条件：Video DiT 隐藏特征、当前 proprioception、带噪运动 latent。其 Transformer block 交错使用 self-attention 与 cross-attention，跨本体训练时共享主干，只保留本体特定输入/输出投影和 embodiment tag。

动作分支采用同方向的 flow-matching 目标：

$$
\mathcal L_{\mathrm{motion}}
=\mathbb E\left[
\left\|v_\phi^{\mathrm{motion}}(m^{\tau_a},H,p_t,\tau_a)
-(\epsilon_m-m^0)\right\|_2^2
\right].
$$

论文没有显式写出 $m^{\tau_a}$ 的插值公式，也没有给出四步 ODE solver 的更新式与时间表；只能从视频分支和 flow-matching 语境推断其采用相近噪声路径，不能把这一推断当成已披露实现。

Stage 2 与 Stage 3 联合优化

$$
\mathcal L=\mathcal L_{\mathrm{video}}+\mathcal L_{\mathrm{motion}}.
$$

论文把 Motion DiT 配置为 DiT-B，隐藏/输出维度 2,560，最大序列长度 1,024，动作维 66、状态维 64，cross-attention 条件维 2,048。推理时动作流仍需要 **4 个时间步**。

因此，“one-shot imagination”必须精确解释为：

> Video DiT 只前向一次；不是整个控制策略只计算一次。Motion DiT 仍执行 4 步流积分，之后还要做离散码合法化与 SONIC 低层跟踪。

### 4. 三阶段训练

| 阶段 | 数据与目标 | 更新模块 | 规模与配置 |
|---|---|---|---|
| Stage 1：第一视角视频预训练 | 人类、G1 类人形与其他机器人视频；只训练未来视频 flow matching | Video DiT | 约 2,136 h；100k steps；128 GPUs；每卡 batch 8 |
| Stage 2：跨本体动作后训练 | 带动作标签的异构人形数据；联合视频与动作目标 | Video DiT + Motion DiT + 本体投影 | 50k steps；32 GPUs；每卡 batch 8；具体数据清单/规模缺失 |
| Stage 3：目标机器人微调 | 9 任务 × 每任务 200 条 G1 全身遥操作示范 | 完整双 DiT | 约 1,800 episodes；15k steps；8 GPUs；每卡 batch 8 |

共同优化器为 AdamW，$\beta=(0.9,0.95)$、weight decay $10^{-8}$、gradient clipping 1，cosine schedule 最低学习率 $5\times10^{-7}$。Video DiT 学习率为 $10^{-5}$，Motion DiT 为 $10^{-4}$。论文没有披露 GPU 型号和总训练时长，因此不能从 GPU 数直接换算训练成本。

#### Stage 1 的 2,136 小时如何组成

论文先规定三个域的采样占比：人类第一视角 30%、G1 类人形 50%、其他真实机器人 20%；域内再大致按 episode 数平方根分配。主要来源包括 EgoDex、GR00T-X-Embodiment-Sim、RoboCOIN、GR00T-Teleop-GR1、Humanoid-Everyday、UnifoLM-WBT、PSI-Real 和 PSI-Simple。

这 2,136 小时不能称为“2,136 小时人类第一视角视频”：其中大部分是仿真或机器人流。相反，它的真正优势是**无需统一动作标签就能混合视觉行为数据**。

#### Stage 3 的全身遥操作

操作者佩戴 PICO VR 头显、双脚踝 tracker 与双手控制器，系统先恢复 SMPL-24 姿态，再借助 SONIC 重定向到 G1 的 29-DoF 身体。机器人双 7-DoF 手臂末端安装 ALOHA2 gripper，头部使用 Intel RealSense D435i。示范以 50 Hz 记录为 LeRobot episode。

50 Hz 是**数据记录/低层执行时间尺度**，不是 MotionWAM 高层动作块生成速度。两个频率不能互换。

### 5. 部署路径

一次高层控制更新依次执行：

1. 读取头部单相机 RGB、语言指令和 proprioception；
2. 从高噪声未来 latent 做一次 Video DiT 前向并截取隐藏状态；
3. Motion DiT 用 4 步流积分生成 66 维运动 latent；
4. 把连续末端值送至 gripper，把离散 motion token 映射回合法 SONIC code；
5. SONIC 负责全身运动跟踪与平衡。

真机实验称策略服务器运行在单张 RTX 4090 上，通过 WebSocket 与机器人通信；但论文只在 A100 上给出 4.9 Hz 的速度表，没有报告 RTX 4090 的平均延迟、尾延迟、丢帧或 deadline miss。

## 实验

### 1. 真机协议

九项任务同时覆盖双手操作与腿部参与：拿放瓶子、踢足球、从抽屉取物并关抽屉、推车装衣物、投垃圾、从桌下取篮筐、分层摆放商品、擦白板和把衣物投入洗衣机。

- 平台：Unitree G1，单头部 RGB，相同 proprioception、语言指令与 SONIC 输出接口。
- 训练：每种方法都使用同一批 Stage 3 示范微调。
- 评测：每方法、每任务 20 次，共 180 次试验；每任务成功率只能以 5 个百分点变化。
- 未报告：成功判定细则、超时、测试初始化分布、盲评、干预规则、逐次日志、训练 seed、置信区间或显著性检验。

### 2. 主结果：九项任务都取得样本内最高成功率

![MotionWAM 与五种基线的九任务真机成功率](/images/literature-notes/motionwam/motionwam-fig5-results.png)

*图 2｜每个柱来自 20 次真机试验；MotionWAM 在九项任务的样本成功率上均最高。该图给的是点估计，没有误差条或训练重复。来源：原论文 Figure 5，PDF 物理页 7。[原文 PDF](https://arxiv.org/pdf/2606.09215#page=7)*

| 方法 | 等权平均成功率 | 成功次数 / 180 | 与 MotionWAM 的差值 |
|---|---:|---:|---:|
| MotionWAM | **76.1%** | **137** | — |
| GR00T-N1.7 | 43.9% | 79 | -32.2 pp |
| $\pi_0.5$ | 18.9% | 34 | -57.2 pp |
| Qwen3DiT | 4.4% | 8 | -71.7 pp |
| Diffusion Policy | 0.6% | 1 | -75.5 pp |
| ACT | 1.1% | 2 | -75.0 pp |

MotionWAM 相对最强基线的优势是 **32.2 个百分点**；若换成相对提升才约为 73.3%。论文的“超过 32% absolute”应解释为百分点，不宜写成相对百分比。

最有诊断价值的基线是 Qwen3DiT：它用 Qwen3-VL 2B 替换 Cosmos Video DiT，但保留同一 Motion DiT、动作空间及 Stage 2/3 训练设置，参数量也接近。76.1% 对 4.4% 表明，在作者的实现与训练配方中，视频预测先验远强于该静态 VLM 替代项。

不过，这仍不是对“动态理解”这一抽象机制的纯因果检验。两个骨干的预训练数据、目标、token 结构和与 Motion DiT 的适配难度都不同；论文也没有测量未来预测准确率或物理一致性。GR00T-N1.7、$\pi_0.5$、DP 和 ACT 的预训练、参数规模与官方微调配方差异更大，更不能把所有性能差异只归因于 world model。

### 3. 三阶段训练消融

![MotionWAM 三阶段训练消融](/images/literature-notes/motionwam/motionwam-table1-ablation.png)

*图 3｜Stage 3 在所有变体中都保留；移除 Stage 1 或 Stage 2 都降低五任务平均成功率，且移除 Stage 2 的下降更大。来源：原论文 Table 1，PDF 物理页 8。[原文 PDF](https://arxiv.org/pdf/2606.09215#page=8)*

- Full：70.0%。
- 去掉 Stage 1、保留 Stage 2/3：59.0%，下降 11 个百分点。
- 去掉 Stage 2、保留 Stage 1/3：42.0%，下降 28 个百分点。

五项任务中每一项都随阶段移除而下降，支持两个预训练阶段互补；Stage 2 在这个消融中的边际作用更大。但实验没有“Stage 1 和 Stage 2 都去掉”的 Stage-3-only 对照，也没有从头共同训练、冻结 Video DiT、随机视频特征或完整视频去噪对照。因而不能据此证明“三阶段顺序训练是唯一正确方案”，也不能分离数据规模、初始化和训练目标各自的贡献。

### 4. 速度：比完整视频策略快，但不是所有基线中最快

| 方法 | 可训练参数 | A100 动作块生成频率 |
|---|---:|---:|
| GR00T-N1.7 | 1.6B | 6.5 Hz |
| Qwen3DiT | 2.3B | **9.0 Hz** |
| Cosmos Policy | 2.0B | 0.7 Hz |
| MotionWAM | 2.5B | 4.9 Hz |

MotionWAM 相对需要完整视频推理的 Cosmos Policy 达到 $4.9/0.7=7\times$ 速度，这直接支持“一次视频 DiT 前向比完整视频生成更适合闭环”。但 MotionWAM 仍慢于 GR00T-N1.7 和 Qwen3DiT；速度表也没有纳入 $\pi_0.5$、DP 和 ACT，Cosmos Policy 则没有进入成功率表。因此无法画出覆盖所有方法的性能—延迟 Pareto 前沿。

此外，表中 Hz 是**高层 action chunk 的生成频率**，测于单张 A100；不是 50 Hz 低层关节控制率，也不是论文实际 RTX 4090 服务器的实测频率。“实时”在这里应理解为作者已让闭环任务运行，而非已经给出完整车间部署级延迟保证。

### 5. 统计与失败案例应如何读

主表每任务只有 20 次试验，95% 等于 19/20，45% 等于 9/20，0% 也只是 0/20。论文没有提供区间估计，因此单任务的 5–15 个百分点差异不宜过度解释。九任务总体 32.2 个百分点的样本差距很大，但任务异质、试验是否独立和初始化是否配对都未知，不能替代正式的分层统计分析。

作者展示的主要失败来自两类视觉 grounding 问题：目标移出单相机视野，或头部视角偏离训练分布。策略随后停滞或生成错误全身轨迹。失败图只展示 Lift Basket 与 Kick Soccer 的案例，没有提供九任务失败归因比例。

## 主要发现

1. **最强结果属于完整训练配方。** 76.1% 对 43.9% 是可信的内部协议差值，但同时包含视频骨干、三阶段数据、Motion DiT 与统一动作接口的共同作用。
2. **视频预测先验是最值得继续验证的变量。** 匹配度较高的 Qwen3DiT 明显失败，说明静态 VLM 特征不能在该配方中直接替代视频 DiT；下一步仍需 matched-data、matched-capacity 的因果消融。
3. **一次视频前向解决的是大头计算，不是所有去噪。** Video DiT 是 1 次，Motion DiT 是 4 步，SONIC 还承担低层闭环。
4. **Stage 2 的动作后训练比 Stage 1 的视频预训练具有更大消融差值。** 去 Stage 2 为 -28 pp，去 Stage 1 为 -11 pp；这提醒我们不能只把成功归因于大规模无动作视频。
5. **“统一全身动作”是合理接口，但尚未被独立验证。** 缺少解耦上下身、冻结腿部或直接连续全身动作的对照。
6. **当前外部效度窄。** 所有最终证据都来自一台 G1、九类已见任务和相似物体；单相机失败又说明感知覆盖是系统瓶颈。

## 结论

MotionWAM 提出了一条务实的 world-action model 路线：不把视频世界模型当作必须完整运行的生成器，而把其高噪声未来预测隐藏状态当成动作专家的动态条件；再用统一 motion token 把高层策略与成熟的全身低层控制器连接。九项真机任务和阶段消融为这条设计提供了有说服力的初步证据。

更窄且更准确的结论是：**在作者的 Unitree G1 闭集任务、统一 SONIC 接口和三阶段训练协议下，MotionWAM 显著优于所实现的五类基线，同时比完整 Cosmos 视频策略具有更高的动作块输出频率。** 论文尚未证明跨硬件 foundation 能力、严格 OOD 泛化、反事实世界建模、端到端低层控制或安全部署。

## 局限与适用边界

### 作者明确报告的局限

1. **只在 Unitree G1 上完成目标微调与实机评测**，没有验证跨人形平台迁移。
2. **没有严格的新物体泛化实验**；训练和测试物体在视觉上相似。
3. **单头部相机容易丢失目标**；物体离开视野或头部视角漂移时，策略会丢失 grounding、停滞或执行错误轨迹。

### 额外识别的局限

1. **复现资料不足**：专属代码、权重和 Stage 3 数据未开放；Stage 2 的数据集、规模和采样权重没有给出。
2. **统计报告不足**：20 trials/task，仅点估计；无训练种子、置信区间、显著性检验或逐次日志。
3. **任务仍是闭集微调**：每任务 200 条示范，测试同九类任务；没有语言改写、新任务组合、环境迁移或严格对象 OOD。
4. **基线并非完全配平**：共享 Stage 3 数据和动作接口是优点，但预训练数据、目标、参数量和微调 recipe 不同。
5. **世界模型能力没有直接测量**：没有未来预测指标、物理一致性、反事实 rollout 或不确定性校准。
6. **“foundation”证据不足**：跨本体只出现在预训练，最终只验证一个机器人；更像朝基础模型迈进，而不是已完成验证。
7. **控制并非完全端到端**：策略输出 motion latent，稳定与平衡依赖 SONIC；不能写成从像素直接输出关节力矩。
8. **安全指标缺失**：没有跌倒、碰撞、约束违反、恢复、作用力、能耗、jerk 或人工接管统计。
9. **速度口径不完整**：A100 的 chunk rate 与 RTX 4090 的真实闭环硬件不一致；无平均/尾延迟、精度、显存、功耗和低层控制时序。
10. **关键实现细节缺失**：未给 Video DiT 的 hook 层、$\tau_f$ 精确值、动作 chunk 长度、Motion ODE solver/时间表、图像分辨率、64 维本体状态定义，以及 motion loss 是否经隐藏特征反传至 Video DiT。

## 我的思考

### 1. 真正创新是“把生成过程截在中间”

MotionWAM 与 Fast-WAM、Faster-WAM 一类工作的共同趋势，是把昂贵的视频生成器从“必须输出未来视频”改造成“只提供动作所需的中间预测特征”。这表明 world model 对控制的价值未必来自人类可观看的像素，而可能来自**受未来预测监督约束的隐变量计算**。

但隐藏特征有用不等于它已经学到可供规划的世界模型。最关键的后续实验应加入候选动作条件：固定当前观测，对不同动作生成不同未来隐藏状态，再检验其是否能预测可控后果。如果没有这一点，模型更接近强大的行为先验与 future-aware policy conditioner。

### 2. 三个最有价值的补充实验

1. **机制消融**：相同 Video DiT 初始化下，对比未来预测预训练、当前帧重建、随机未来、冻结隐藏特征和完整多步去噪；同时匹配数据量与参数量。
2. **动作接口消融**：统一 SONIC latent、上下身解耦、纯连续全身动作、冻结腿部四组对比，测成功率、平衡、脚部任务与运动自然度。
3. **外部效度与安全**：跨 G1/GR1/其他 humanoid 零样本或少样本迁移；新对象、新视角、多相机；报告跌倒/碰撞/超时、Wilson 区间和多 checkpoint 结果。

### 3. 应如何理解“实时”

对于分层人形系统，“实时”至少有三层：高层动作块更新、低层关节伺服、端到端感知—网络—执行延迟。MotionWAM 只明确报告第一层在 A100 上的 4.9 Hz，并由 SONIC 支撑第二层；第三层没有完整测量。今后的 WAM 论文应同时报告三层频率、P50/P95/P99 延迟和 missed-deadline rate，才能让不同系统真正可比。

## 参考文献

1. Zheng, J., Ma, T., Fan, Y., Wang, Z., Yang, S., & Liang, J. (2026). *MotionWAM: Towards Foundation World Action Models for Real-Time Humanoid Loco-Manipulation*. arXiv preprint. [arXiv](https://arxiv.org/abs/2606.09215) · [PDF](https://arxiv.org/pdf/2606.09215) · [项目页](https://dit4dit.github.io/MotionWAM/) · [arXiv DOI](https://doi.org/10.48550/arXiv.2606.09215)
2. Yang, S., et al. *DiT4DiT: Dual Diffusion Transformers for Robot Learning*. [官方代码](https://github.com/Mondo-Robotics/DiT4DiT)（相关前作，不等同于 MotionWAM 完整实现）
