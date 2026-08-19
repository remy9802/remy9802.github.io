---
title: "精读｜SONIC：以规模化动作跟踪构建人形机器人全身控制基础模型"
date: 2026-08-18
permalink: /posts/sonic-humanoid-whole-body-control/
tags: [literature-note, sonic, humanoid-robot, whole-body-control, motion-tracking, reinforcement-learning, sim-to-real, vla]
note_type: single-paper
literature_topics:
  - embodied-ai
  - reinforcement-learning
  - action-representation
  - vla
excerpt: "精读 SONIC 的规模化动作跟踪、统一 FSQ token、生成式运动学规划、Sim2Real 与 VLA 全身操作，并审计其基线、公平性、安全与复现边界。"
---

> **阅读范围**：Science Robotics 正式版对应的 arXiv v4 全文 39 页，含补充方法、失败案例、统计说明、数据与代码可用性；另核验作者项目、官方代码与文档。<br>
> **检索日期**：2026-08-18<br>
> **版本口径**：以 2026-08-13 的 arXiv v4 / Science Robotics 正式版为准；早期 v1 的“9k GPU-hours”已更新为 **21k GPU-hours**，不混用旧数字。<br>
> **主题**：规模化动作跟踪能否成为可迁移、可部署的人形机器人全身控制基础任务？

## 文献档案

- **题目**：*SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control*
- **作者**：Zhengyi Luo、Ye Yuan、Tingwu Wang、Chenran Li、Fernando Castañeda（共同一作）；Sirui Chen、Zi-Ang Cao、Jiefeng Li、David Minor、Qingwei Ben、Jinhyung Park、David Sami、Zi Wang、Xingye Da（核心贡献者）；Runyu Ding、Cyrus Hogg、Lina Song、Edy Lim、Eugene Jeong、Tairan He、Haoru Xue、Wenli Xiao、Simon Yuen、Jan Kautz、Yan Chang、Umar Iqbal、Linxi “Jim” Fan、Yuke Zhu。
- **机构**：NVIDIA。
- **出版**：*Science Robotics*, 11(117), eaed4592, 2026；同行评议期刊论文，2025-10-31 收稿、2026-07-17 接收、2026-08-12 正式发表。
- **正式 DOI**：[10.1126/scirobotics.aed4592](https://doi.org/10.1126/scirobotics.aed4592)。
- **文献链接**：[Science Robotics](https://www.science.org/doi/10.1126/scirobotics.aed4592) · [arXiv:2511.07820](https://arxiv.org/abs/2511.07820) · [作者项目页](https://nvlabs.github.io/GEAR-SONIC/)。
- **代码链接**：[NVlabs/GR00T-WholeBodyControl](https://github.com/NVlabs/GR00T-WholeBodyControl) · [官方文档](https://nvlabs.github.io/GR00T-WholeBodyControl/)。
- **数据与归档**：[BONES-SEED](https://huggingface.co/datasets/bones-studio/seed) 发布 142,220 条、约 288 小时动作，下载前需接受访问条款；论文代码与图表数据归档于 [Zenodo](https://doi.org/10.5281/zenodo.21273312)。

## 核心结论

SONIC 的关键贡献不是发明一种新的 RL 算法，而是把**动作跟踪**提升为可规模化的低层控制预训练任务：用 100M+ 帧动作、42M 参数策略和 21k GPU-hours，训练同一套 Unitree G1 全身控制策略，再用机器人、人类和混合三类编码器映射到共享 FSQ token，使运动学规划、VR/视频遥操作和 VLA 可以复用同一个低层执行接口。

论文有力支持三个较窄的结论：动作跟踪在其数据、模型与算力范围内持续受益于扩展；策略能高成功率迁移到未见动作与真实 G1；共享 token 比显式 SMPL pose 更适合所测 VLA 任务。它尚不能证明跨机器人形态的“通用”控制、形式化安全、长期能效，或不依赖专有数据与大算力的可复现性。

## 检索记录

- **检索式**：`SONIC whole-body control humanoid`、准确题名、`arXiv 2511.07820`、`GEAR-SONIC code`、`Science Robotics eaed4592`。
- **主证据**：Science Robotics 元数据、arXiv v4 全文、NVIDIA 作者项目、官方 GR00T-WholeBodyControl 仓库与文档、作者数据/Zenodo 归档。
- **版本审计**：论文于 2026-08-12 正式发表；arXiv v1 于 2025-11-11 提交，v4 于 2026-08-13 UTC 更新并关联 Science Robotics 11(117)。作者数、系统范围和训练算力在后续版本中扩充；本文不复用早期二手摘要的 9k GPU-hours 口径。PDF 页眉日期不是正式出版日。
- **纳入内容**：正文全部方法、三张主表、主图 1–6、补充方法 S1、讨论 S2、图 S1–S7 与 Data/Code Availability。
- **排除**：项目视频只作定性展示；第三方解读、社区部署经验与后续 checkpoint 的性能不作为论文实验结论。
- **更正状态**：截至检索日，正式页和 arXiv 未显示撤稿或更正；arXiv DOI `10.48550/arXiv.2511.07820` 只是预印本标识，正式引用应优先使用 Science Robotics DOI。

## 研究问题

### 背景：人形控制为什么没有像语言模型一样扩展

传统人形机器人策略常为某项技能单独训练：直线行走、起身、跳跃或遥操作各自拥有不同奖励。增加一种行为就要重新设计 reward、收集数据、训练专家，再处理专家切换。AMP、ASE、CALM 等对抗式动作先验减少了逐技能奖励设计，但判别器要覆盖越来越多样的动作分布，可能出现反馈变弱与 mode collapse。

SONIC 选择了一个更适合扩展的代理任务：**给定逐帧参考动作，让物理机器人在动力学约束下跟踪它。** 动作捕捉提供稠密的 pose、velocity 和 contact 相关监督；数据量增加时，每一帧仍有明确目标，而不必为每个行为重新发明任务奖励。

论文实际回答四个问题：

1. 数据、模型和训练算力放大后，动作跟踪是否持续提高，尤其是未见动作的泛化？
2. 一个策略能否同时接收 robot motion、human motion 与稀疏 hybrid command？
3. 如何把“跟踪已有动作”转成实时可交互的导航、蹲跪、爬行和拳击？
4. 共享动作 token 能否成为 VR、视频生成器和 VLA 的统一低层接口？

### 概念边界

- SONIC 是**低层全身跟踪与执行策略**，不是能自行理解任务的 VLA；高层意图来自外部 kinematic planner、GEM 或 GR00T N1.5。
- “同一策略”指同一个 universal control policy。文本/音乐生成器、运动学规划器和 VLA 仍是独立模型，不能把整套系统描述成一个端到端网络。
- 它减少的是**逐行为 reward engineering**，不是完全无手工奖励。补充材料仍包含 root/body/end-effector 跟踪奖励，以及动作变化、关节限位、接触、抖动和足部加速度惩罚。
- “foundation model”强调行为覆盖、共享接口和扩展趋势；42M 参数模型只在 Unitree G1 上完成论文级验证，并不等于跨 embodiment 的通用机器人基础模型。

## 方法与数据

### 1. 总体系统：生成参考，再由统一策略执行

系统分为两层：

```text
gamepad / VR / video / text / music / VLA
                   ↓
运动生成或高层动作接口
                   ↓
robot / human / hybrid encoder
                   ↓
共享 FSQ universal token
                   ↓
robot control decoder + 本体感觉
                   ↓
29 维目标关节角 → 关节 PD 控制器 → Unitree G1
```

![SONIC 统一全身控制策略方法图](/images/literature-notes/sonic/method-overview.png)

*图 1｜SONIC 用三种专用编码器把 robot motion、human motion 和 hybrid motion 映射到共享量化 token；同一个控制解码器结合本体感觉输出关节目标。Robot motion decoder 是训练期辅助重建头。来源：原论文 Figure 6（PDF 物理页 14），[论文链接](https://arxiv.org/pdf/2511.07820)。*

这张图最重要的因果边界是：规划器与 GEM 负责**产生运动参考**，SONIC policy 负责**把参考变成物理可执行控制**。文本或音乐能力主要来自 GEM，任务推理主要来自 VLA；SONIC 提供共享的 motor prior 与闭环稳定执行。

### 2. 动作数据：700 小时来源，611 小时进入主训练

原始 motion-capture collection 约 700 小时。作者先用 GMR 与 PyRoki 将人类动作 retarget 到 G1，再滤除楼梯、坐姿等目标机器人难以执行的动作，得到：

| 划分 | clips | 时长 | 子类别 | 与训练子类别重合 |
|---|---:|---:|---:|---:|
| train | 317,189 | 611 h | 8,447 | — |
| test-content | 7,016 | 15 h | 182 | 0% |
| test-repetition | 9,395 | 12 h | 1,088 | 100%，但 clip 不重合 |
| PHUMA 外部测试 | 68,326 motions | — | 不同数据/retarget pipeline | OOD |

训练集覆盖 33 个大类，包括基础/高级移动、手势、表演、格斗、舞蹈、受伤步态、工具与物体交互；以 50 Hz 计超过 100M 帧。`test-content` 测试未见动作语义，`test-repetition` 测试同类动作的新演员/新 take。公开 BONES-SEED 约 288 小时，只是主训练来源的一部分，因此完整 611 小时配方并未全部开放。

### 3. MDP、观测、动作与跟踪奖励

作者将跟踪写为 MDP $\mathcal M=\langle\mathcal S,\mathcal A,\mathcal T,\mathcal R,\gamma\rangle$，用 PPO 最大化折扣回报。actor 的输入包括：

$$
s_t^p=(q_t,\dot q_t,\omega_t,g_t,a_{t-1})_{t-9:t},
$$

即 10 步关节姿态、关节速度、root 角速度、重力方向与历史动作；再加一种 motion command $s_t^g$：

- $g_r$：未来 robot joint motion；
- $g_h$：未来 human 3D joints / SMPL motion；
- $g_m$：当前 head/hands 稀疏关键点 + 未来 lower-body robot motion。

所有量在机器人局部坐标系表达，并使用 6D rotation representation。policy 输出 29 维目标关节位置，由底层 PD controller 跟踪。训练采用 asymmetric actor–critic：critic 可见 base linear velocity、全 body link pose 和无噪状态，actor 只使用部署可得的带噪观测。

奖励写为

$$
r_t=\mathcal R(s_t^p,s_t^g)+\mathcal P(s_t^p,a_t),
$$

其中 $\mathcal R$ 匹配 root、body links、速度与头/腕/踝 end-effectors；$\mathcal P$ 惩罚动作突变、关节越限、非期望接触、腕/头抖动和足部加速度。这里的优势是同一套跟踪 reward 可以复用到数千类动作，而不是“没有 reward engineering”。

### 4. 三编码器、FSQ 与两个解码器

三种 encoder 都是 MLP，隐藏层为 `[2048, 1024, 512, 512]`。Robot/hybrid encoder 查看 10 个未来帧、间隔 0.1 s；human encoder 同样看 10 帧，但间隔 0.02 s。它们把输入投影到共享 latent，再通过 Finite Scalar Quantization（FSQ）产生两个 token。默认 `FSQ-32-32` 表示每个 token 32 维、每维 32 个量化级，flatten 后为 64 维 universal motion token。

作者选择 FSQ 而非 VQ-VAE 的理由是：无需学习 codebook、commitment loss 或 EMA update，且在 PPO 联合优化中不易 codebook collapse。straight-through estimator 让策略梯度穿过量化器。

token 后接两个头：

$$
a_t=\mathcal D_c(z,s_t^p),
\qquad
\hat g_r=\mathcal D_r(z).
$$

- $\mathcal D_c$：robot control decoder，结合 token 与本体感觉输出动作；
- $\mathcal D_r$：robot motion decoder，只在训练中重建机器人参考，形成跨形态的隐式 retargeting supervision。

### 5. 联合目标：RL、重建、跨编码器对齐与循环一致性

同一个动作同步构造 $g_r,g_h,g_m$，经三种 encoder 得到 $z_r,z_h,z_m$。总损失为：

$$
\mathcal L
=\mathcal L_{PPO}
+\mathcal L_{recon}
+\mathcal L_{token}
+\mathcal L_{cycle},
$$

$$
\mathcal L_{recon}
=\|\mathcal D_r(z_r)-g_r\|^2
+\|\mathcal D_r(z_h)-g_r\|^2
+\|\mathcal D_r(z_m)-g_r\|^2,
$$

$$
\mathcal L_{token}
=\|z_r-z_h\|^2+\|z_r-z_m\|^2+\|z_m-z_h\|^2,
$$

$$
\mathcal L_{cycle}
=\|\mathcal E_r(\mathcal D_r(z_h))-z_r\|^2.
$$

`recon` 让人类/混合输入恢复同一个 robot motion；`token` 让三种接口在共享空间中逐帧对齐；`cycle` 约束 human → robot → token 不丢失动作特征。PPO 更新 encoder、quantizer 和控制头，辅助损失更新 encoder 与 motion decoder。

### 6. 规模化训练与鲁棒化

作者分别扫描三条轴：

- 数据：4M → 10M → 22M → 100M frames；
- 模型：1.2M → 16M → 42M parameters；
- 算力：2k → 9k → 21k GPU-hours。

最大训练使用 128 GPUs、约 7 天、50k iterations；每张 GPU 并行 4,096 个 Isaac Lab 环境，每个 rollout 24 步。PPO 使用 $\gamma=0.99$、GAE $\lambda=0.95$、clip 0.2；actor/critic learning rate 分别为 $2\times10^{-5}$ 与 $10^{-3}$。

训练还包括：

- 按失败率加权的 bin-based adaptive motion sampling，兼顾困难动作与全数据覆盖；
- friction、restitution、初始关节与 base COM 随机化；
- root 线/角速度扰动模拟推力；
- reference position、orientation、velocity 与 joint jitter。

需要注意，算力实验是在相同 50k iterations 下增加 GPU 与 batch，因此“更多 GPU”同时意味着每次迭代见到更多并行样本；它不是严格控制总样本量的纯 compute scaling law。

### 7. 生成式运动学规划器：把意图变成可跟踪参考

动作跟踪本身要求一条 reference motion。为实现交互控制，作者另训一个 latent generative kinematic planner，把当前/历史 keyframe 与目标 keyframe 之间的 0.8–2.4 s 动作视为 motion in-betweening：

1. motion autoencoder 以 4× temporal downsampling 把 pose/root trajectory 编成 latent tokens；
2. masked-token backbone 从全 mask 开始，多轮固定最高置信 token；论文只举 Transformer 或 Conv1D 为可选实现，未明确披露部署版本使用哪一种；
3. cosine schedule 逐步减少 mask，解码完整过渡动作；
4. critically damped spring 过滤用户要求的 root position 与 heading，避免 6 m/s 到 -6 m/s 的瞬时反转。

规划器在普通 laptop 上低于 5 ms，在 Jetson Orin 上约 12 ms；可每 100 ms 重规划。它能从少量 keyframe/单条代表 clip 生成行走风格、拳击、不同高度蹲跪和爬行过渡，但论文没有给 planner 与其他生成式运动规划器的系统定量比较。

### 8. 部署与运行时链路

真实系统为 29 关节 Unitree G1，所有推理在板载 Jetson Orin 上运行：policy 50 Hz、command writer 500 Hz、输入 100 Hz、planner 10 Hz；TensorRT + CUDA Graph 使 policy forward 为 1–2 ms。

补充材料列出 data freshness、joint velocity、motor error/temperature、stream catch-up 与 CRC32 watchdog；stop 后切换为 $K_p=0,K_d=8$ 的纯阻尼模式。这些是重要工程保护，但作者明确承认论文没有形式化安全分析，不能把 watchdog 等同于闭环安全证明。

### 9. VLA 接口：预测 token，而不是直接预测 SMPL pose

作者把 GR00T N1.5 接到 SONIC：简单 apple-to-plate 使用 head/hands + navigation 的 3-point interface；更复杂任务让 VLA 输出 78 维动作——64 维 universal token + 14 维 hand joints。SONIC 解码 token 并闭环控制全身，从而允许 VLA 同时使用手和脚。

这里的学习链路是：VR 遥操作收集 demonstration → fine-tune GR00T N1.5 → VLA 预测 SONIC 接口动作 → SONIC 执行。SONIC 不是由语言端到端训练出来的，其 token 是通过动作跟踪和跨 encoder 对齐学得。

## 主要发现

### 1. 三条扩展轴都改善未见动作跟踪

![SONIC 扩展曲线与主要基准](/images/literature-notes/sonic/scaling-and-benchmarking.png)

*图 2｜数据、模型与 GPU-hours 扩展；与三类 tracker、OpenHomie specialist 及真实 G1 的比较。缩放曲线为每配置 $n=6$ 次评估的 mean ± 1 s.d.，不是明确报告的 6 次独立从头训练。来源：原论文 Figure 2（PDF 物理页 4），[论文链接](https://arxiv.org/pdf/2511.07820)。*

最大模型在 `test-content` 达到 **99.6% success / 23.8 mm MPJPE-L**；1.2M 小模型为 **98.0% / 27.7 mm**。数据、模型、算力从最小到最大配置的 success 差异均通过 Welch 双侧检验（论文报告 $P\le0.011$）；检验单位是 per-motion 二元结果，误差带来自同一配置的 6 个独立 evaluation checkpoints，并非 6 次独立从头训练。增益的绝对 success 幅度不大，但 OOD MPJPE 与失败率持续下降。

一个重要统计边界是：误差指标只对**成功跟踪的 motion**计算，因为提前终止后没有完整轨迹误差；因此 MPJPE 均值天然排除了失败样本，必须与 success rate 联合解读。

### 2. 相对 tracker 的优势明显，但不是等数据对照

在同一 MuJoCo 终止准则下：

| 方法 | test-content | test-repetition | PHUMA |
|---|---:|---:|---:|
| SONIC | 98.5% | 99.2% | 97.2% |
| BeyondMimic | 82.0% | 85.4% | 73.8% |
| Any2Track | 61.6% | 69.4% | 78.5% |

在 `test-content` 的成功轨迹上，SONIC 平均 MPJPE-L 为 23.7 mm，论文称相对 BeyondMimic 的 40.9 mm 降低 42%。Figure 2 还包含 GMT，但正文未逐项列出其精确数值，因此上表只抄录正文可核对的两项基线。作者同时明确：BeyondMimic/Any2Track/GMT 使用不同 source datasets 和 retargeting pipelines，比较主要反映“数据与规模整体配方”的优势，不能把差距全部归因于 FSQ、PPO 或某个网络模块。

### 3. 通用 tracker 在速度稳定性上超过 specialist

在 0–5 m/s、200 次 MuJoCo runs 中，SONIC survival 为 **197/200（98.5%）**，OpenHomie 为 **86/200（43.0%）**；后者超过约 2 m/s 后快速失稳。这个结果支持“多样动作先验可帮助狭义 locomotion”，但 OpenHomie 的训练数据、目标与扩展条件并未与 SONIC 完全配平。

### 4. Sim2Real 成功率高，主要误差落在脚部

同一组 124 条 motion 在 simulation 为 124/124 成功，真实 G1 为 **123/124（99.2%）**；real/sim 整体 MPJPE-L 为 **25.7/22.3 mm**。上身差距很小（22.2 vs. 21.8 mm），脚部则为 **53.7 vs. 29.0 mm**，说明接触与足端定位仍是主要 sim-to-real 缺口。

每条 motion 在真机只执行一次；论文没有报告多日、不同地面、硬件磨损或更换机器人后的重复性，99.2% 不能解释成长期事故率。

### 5. FSQ 与一致性损失支持共享接口

Table 3 的描述性消融显示：

- test-content 上 FSQ 为 **99.3% / 26.6 mm**，VQ-VAE 为 **98.7% / 35.3 mm**；
- robot/human/hybrid encoder 均超过 99.2% success，human 相对 robot 只多 0.6 mm MPJPE-L；
- 去掉 token/cycle consistency 后，跨 encoder latent divergence 增加约 8 倍。

但每个消融配置只做一次完整测试，没有独立随机种子或显著性检验；结论应写作支持设计选择，而非确定的普适优越性。

### 6. VLA 能用脚参与操作，token action 明显优于 pose action

![SONIC 的 VLA 任务结果与动作空间消融](/images/literature-notes/sonic/vla-results.png)

*图 3｜GR00T N1.5 通过 SONIC 接口完成全身 loco-manipulation；上表列 6 个 task variants，但两个 object-pickup variant 在论文“5-task average”中合并。下表只在 3 个任务比较 FSQ token 与显式 SMPL pose。来源：原论文 Table 1（PDF 物理页 11），[论文链接](https://arxiv.org/pdf/2511.07820)。*

六个 variant 的成功率为 60%–95%，每项只有 10–20 trials；按论文合并后的五任务平均为 **75%**。最难的 soda-can-to-trash-can 要依次走近、抓取、移动、单脚踩踏板并投放，成功率为 **60%（6/10）**。

在 carrot、open-trash-can、soda-can 三项消融中，FSQ token 平均 **68%**，显式 SMPL pose **27%**，高 42 个百分点；最复杂任务为 60% vs. 0%。证据支持“压缩、结构化动作空间更易被这个 VLA 配方学习”，但样本小，未与其他 action tokenization、diffusion action head 或分层 controller 比较。

### 7. 鲁棒性和多模态能力主要是案例证据

论文展示约 11 kg 物体从头顶高度落到运行中的机器人，SONIC 未使用 recovery module 仍维持平衡；还展示 video/text/music/VR 切换、拳击和爬行。这些视频有解释力，但没有重复次数、冲击分布、失败概率或人类自然度评分，不能替代系统性 robustness benchmark。

## 结论

SONIC 证明了一条很实用的分层路线：先通过大规模物理动作跟踪学习稳定的 whole-body motor prior，再把规划器、遥操作和 VLA 都接到一个共享动作 token 接口。它把过去“一个技能一个 controller”的系统，改造成“多种高层来源、一个低层闭环策略”，并把数据规模、训练规模和真实部署连成较完整的证据链。

论文最可信的历史定位是：**把 human motion tracking 从一个模仿任务推进为 humanoid control 的通用底座，并证明全身 latent action interface 能服务 VLA loco-manipulation。** 它还没有把低层 motor foundation 扩展成能在未知环境中自主规划且具形式安全保证的完整 humanoid agent。

## 局限与适用边界

### 作者明确承认

1. **没有形式化安全处理。** 极端输入或高度动态动作仍可能让机器人失衡。
2. **未研究长期能效。** 没有能耗、热、续航、关节磨损和长时间运行统计。
3. **复杂地面接触仍困难。** 补充图 S3 的 zombie crawl 与 cross-legged sit 失败，说明持续/多点接触和运动学极限尚未解决。

### 进一步识别的证据边界

1. **只验证一种 embodiment。** 论文训练和真实实验均围绕 29-DoF Unitree G1；官方仓库后来支持新形态，不等于论文已证明 cross-embodiment transfer。
2. **完整训练数据未开放。** BONES-SEED 为 288 小时，少于主训练 611 小时；21k GPU-hours 与 128 GPUs 也构成较高复现门槛。
3. **baseline 没有数据配平。** source motion、retargeting 和训练规模不同，不能把 tracker 差距单独归因于模型架构。
4. **规模曲线不是完整 scaling law。** 只有少数离散点；固定 iterations 下更大 GPU batch 同时改变样本吞吐，论文没有拟合幂律或给 compute-optimal frontier。
5. **“自然”缺少感知评价。** 没有人类偏好、自然度或社会可接受性实验；pose error 和 success 不能完全代表人看起来是否自然。
6. **真机统计仍窄。** 124 motions 每条只做一次，VLA 每任务 10–20 trials；没有跨日期、跨机器人、地面/负载/OOD 分层和置信区间。
7. **成功定义较局部。** tracking failure 以 root 或 end-effector height 偏离 0.25 m 判定，并做 local tracking；它能捕捉跌倒，却不衡量全局路径、能耗或所有接触质量。
8. **策略依赖上游参考质量。** 规划器、GEM 或 VLA 产生分布外 token/reference 时，policy 可能失稳；spring filter 与 domain randomization 只能缓和，不能证明安全。
9. **企业内研究存在利益相关。** 作者均来自 NVIDIA，公司资助并已提交相关专利；这不否定结果，但独立复现尤其重要。
10. **VLA 结论是配方级而非普适定律。** token vs. pose 只在 3 项任务、GR00T N1.5 和小样本 teleoperation data 上比较。

## 我的思考

SONIC 最值得迁移的思想，是把 humanoid policy 分成三种稳定接口：

```text
高层任务空间：语言、视觉、目标、操作意图
          ↓
中层运动空间：短时 reference / universal motion token
          ↓
低层物理空间：proprioception-conditioned joint control
```

这比让 VLA 直接回归 29 个关节的长序列更合理：低层 policy 吸收平衡、接触和 actuator dynamics，高层模型只需在一个已知可执行的 motion manifold 上决策。Table 1 的 token–pose 差距正是这一分层的初步证据。

不过，共享 latent 也可能隐藏风险：VLA 输出的 64 维连续表示虽然源自量化 token，论文的部署接口并未给出“哪些 token 一定可执行”的形式集合。下一步可以把 SONIC 与安全强化学习结合：

1. 在 token space 学习可达/可恢复集合，对 OOD token 做 uncertainty gate；
2. 让 planner 输出多条候选 motion，并用接触、能耗和稳定性 critic 重排；
3. 将 foot-contact、torque、thermal 和 fall-risk 指标加入长期真机评测；
4. 用不同 G1 个体、地面、负载与传感延迟构建分层 failure benchmark；
5. 比较 FSQ、VQ、连续 latent、FAST 类时序 token 与 diffusion action head，判断优势来自离散化、压缩还是 motor prior 本身。

如果这些边界得到补足，SONIC 式接口可能成为 humanoid 领域的“动作语言层”：上接 VLA/规划器，下接可验证的 whole-body controller，而不是让每个上层模型重新学习一遍平衡与接触。

## 参考文献

1. Luo, Z. et al. *SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control*. Science Robotics, 11(117):eaed4592, 2026. [DOI](https://doi.org/10.1126/scirobotics.aed4592) · [arXiv v4](https://arxiv.org/abs/2511.07820) · [项目页](https://nvlabs.github.io/GEAR-SONIC/)。
2. NVIDIA GEAR Team. *GR00T-WholeBodyControl*. 2026. [官方代码](https://github.com/NVlabs/GR00T-WholeBodyControl) · [官方文档](https://nvlabs.github.io/GR00T-WholeBodyControl/)。
3. BONES Studio. *BONES-SEED*. 2026. [数据集](https://huggingface.co/datasets/bones-studio/seed)。
4. Luo, Z. et al. *SONIC code and tabulated source data archival snapshot*. Zenodo, 2026. [DOI](https://doi.org/10.5281/zenodo.21273312)。
