---
title: "自动驾驶 VLA：5 篇核心论文的技术路线、证据与边界"
date: 2026-08-17
permalink: /posts/autonomous-driving-vla-core-papers/
tags: [autonomous-driving, vision-language-action, end-to-end-driving, literature-note]
note_type: topic-synthesis
---

> **阅读范围**：截至 2026-08-17，定向检索并阅读全文，选取 5 篇已有正式同行评审版本、且覆盖不同“推理—动作”接口的代表性工作。本文是技术脉络笔记，不是系统综述或可复现性审计。

## 核心结论

自动驾驶里的 VLA（Vision-Language-Action）并不只是“给 VLM 加一个轨迹输出头”。五篇论文真正竞争的是同一个接口问题：**怎样把视觉—语言空间中的语义与因果推理，稳定、低延迟地转换为满足车辆动力学约束的连续轨迹**。

1. **动作表示是架构分水岭。** EMMA 把轨迹写成文本；ORION 用可微生成式规划器连接语言推理与数值动作；OpenDriveVLA 用结构化 3D 环境 token 约束自回归航点；AutoVLA 把连续轨迹量化成物理动作 token；Reasoning-VLA 则用可学习 action queries 并行回归连续轨迹。研究趋势明显从“语言化一切”转向“保留语言推理，但让动作接口更物理、更并行”。
2. **CoT 有用，但不是免费午餐。** EMMA 在内部数据上的 CoT 规划增益为 6.7%；AutoVLA 通过强化微调学习何时快思考、何时慢思考；OpenDriveVLA 将推理知识蒸馏进模型而不要求推理时输出长 CoT；Reasoning-VLA 直接绕开逐 token 动作解码。共同目标都是减少显式推理造成的延迟与误差传播。
3. **空间与时间接地决定 VLA 能否从“会说”走向“会开”。** OpenDriveVLA 的 BEV/3D scene-agent-map token、ORION 的历史查询记忆、AutoVLA 的物理动作码本和 Reasoning-VLA 的空间引导 action queries，都是在补纯 VLM 对三维几何、动态交互和车辆可行性的不足。
4. **现有结果不能做简单总排名。** nuScenes 多为开环 L2/碰撞率，NAVSIM 使用 PDMS，Bench2Drive 是 CARLA 闭环，NeuroNCAP 又强调安全关键场景；训练数据、输入传感器、是否使用自车状态以及评价协议均不同。更合理的读法是比较每篇论文解决了哪一类接口瓶颈，而不是横向比较一个最高数字。
5. **距离真实部署仍有明显缺口。** 公开证据主要来自开环数据集或仿真闭环；CoT 与动作的一致性、长时记忆、传感器冗余、不确定性、安全约束以及车端算力，仍未被这批工作共同解决。

## 检索记录

- **检索日期**：2026-08-17
- **检索来源**：arXiv（发现与版本追踪）、OpenReview/TMLR、CVF Open Access、NeurIPS Proceedings、AAAI Proceedings、ICML/PMLR。
- **核心检索式**：
  - `autonomous driving AND ("vision-language-action" OR VLA) AND (trajectory OR planning)`
  - `("end-to-end autonomous driving") AND (VLM OR VLA) AND (action token OR generative planner OR action query)`
  - `自动驾驶 AND 视觉-语言-动作 AND 端到端规划`
- **纳入标准**：已有正式同行评审版本；可获得全文；从视觉/语言输入直接产生轨迹或可执行动作；能代表一种有辨识度的推理—动作接口。
- **排除与取舍**：DriveVLM 等 VLM 辅助式工作是重要前驱，但不是本文聚焦的统一 VLA 动作生成；[VLGA](https://arxiv.org/abs/2606.12396) 很新且有代表性，但截至检索日仍是 arXiv 预印本，列入延伸阅读而不与正式论文混排；综述论文只用于建立候选集合，不作为性能证据。
- **检索性质**：定向、迭代式检索，并以正式论文全文和表格为最终证据；不是穷尽所有数据库的系统检索。

## 研究问题

本文围绕四个问题阅读五篇论文：

1. 模型如何把多相机视觉、语言指令和自车状态统一表示？
2. 语言推理如何进入数值轨迹空间，动作又如何满足物理可行性？
3. CoT、强化学习、结构化 3D 表征和并行解码分别带来了什么可验证增益？
4. 这些增益在哪些数据集和评价协议下成立，离真实闭环部署还缺什么？

这里的“Action”主要是未来航点或轨迹，而不一定是直接输出方向盘、油门和制动。因此，自动驾驶 VLA 更准确地说是**以视觉—语言基础模型为核心的端到端运动规划策略**；轨迹往往仍需下游控制器转成车辆控制量。

## 方法与数据

### 五篇论文的技术位置

| 论文 | 正式版本 | 动作接口 | 空间/时间接地 | 推理机制 | 主要评价 |
|---|---|---|---|---|---|
| EMMA | TMLR 2025 | 将航点坐标表示为自然语言文本，自回归生成 | 环视相机短视频，最多 4 帧；无 LiDAR/雷达 | 可选层级 CoT，多任务联合训练 | nuScenes、WOMD/WOD、内部 2400 万场景 |
| ORION | ICCV 2025 | VLM planning token 条件化 VAE 生成式规划器 | QT-Former 聚合当前感知与历史查询记忆 | VQA 与规划联合训练、端到端可微 | Bench2Drive 开环与 CARLA 闭环 |
| OpenDriveVLA | AAAI 2026 | 自回归生成离散航点文本 token，再解码为数值轨迹 | BEV 与 scene/agent/map 三类 3D token | 分阶段对齐、交互预测和动作微调 | nuScenes 开环与驾驶 VQA |
| AutoVLA | NeurIPS 2025 | 2048 项物理动作码本；10 token 表示 5 秒轨迹 | 原始多相机流、语言命令和自车状态 | 快/慢双模式 SFT，GRPO 强化微调 | NAVSIM、Waymo、nuScenes、Bench2Drive |
| Reasoning-VLA | ICML 2026 | 可学习 action queries 并行生成连续轨迹，再细化 | 空间先验初始化；8 个数据集统一训练 | CoT 数据 + SFT + 动力学奖励 RL | nuScenes、NAVSIM、NeuroNCAP、零样本迁移 |

### 1. EMMA：把驾驶任务统一成语言生成

[EMMA](https://openreview.net/pdf?id=kH3t5lmOU8) 的激进之处在于：除相机图像/视频外，导航命令、自车历史状态、轨迹坐标、3D 目标和道路图都尽量转成文本，由 Gemini/PaLI 类多模态大模型统一生成。规划输出仍是未来航点，随后再交给控制器。

它把驾驶理由拆成场景描述、关键目标、元决策和行为描述；还把规划、3D 检测、道路图理解一起训练，试图从同一语言空间中获得通用驾驶表征。公开实验覆盖 nuScenes 与 Waymo 数据，关键 CoT 消融则来自 2400 万场景的内部数据集。

### 2. ORION：用生成式规划器打通推理与动作空间

[ORION](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html) 认为纯文本轨迹难以承担精确数值规划。它用 QT-Former 将当前感知与历史查询压缩给 LLM，再以 VLM 的 planning token 条件化 VAE 规划器，生成多模态轨迹。这样，VQA 推理与轨迹损失可在同一网络中反向传播，而不需要把语言结果交给一个割裂的经典规划模块。

论文还构建 Chat-B2D，以自动生成的问答监督强化交通状态、运动关系与驾驶决策推理；主要证据来自 Bench2Drive 的 220 条短路线 CARLA 闭环测试。

### 3. OpenDriveVLA：先建立 3D 环境 token，再学习语言动作

[OpenDriveVLA](https://ojs.aaai.org/index.php/AAAI/article/view/38386) 基于 Qwen2.5-Instruct 0.5B/3B/7B，先用 ResNet-101 与 BEV 编码器生成结构化环境表征，再分别抽取 scene、agent、map token。训练分为 3D 感知预训练、层级视觉—语言对齐、驾驶指令微调、agent-environment-ego 交互预测和轨迹动作微调。

其价值在于把开放词汇语义与实例级三维位置对齐，并通过中间交互预测把 CoT 知识压入参数；推理时不必显式输出长推理链。轨迹仍以每 0.5 秒一个航点的文本 token 自回归生成，预测 3 秒、共 6 个航点。

### 4. AutoVLA：把连续轨迹变成可学习的物理动作词表

[AutoVLA](https://proceedings.neurips.cc/paper_files/paper/2025/hash/2843fccca5bedd369a4764848b9bd546-Abstract-Conference.html) 用 K-disk 聚类把连续轨迹离散为 2048 个物理动作 token；每个 token 表示 0.5 秒运动，连续 10 个 token 对应 5 秒规划。它在一个自回归 VLM 中联合学习两种输出：简单场景只给动作，复杂场景先生成结构化 CoT 再给动作。

SFT 之后，作者用 GRPO 做强化微调，奖励由驾驶指标减去 CoT 长度惩罚构成，从而同时优化轨迹质量和推理成本。CoT 标注主要由 Qwen2.5-VL-72B 自动生成，再与 nuPlan、Waymo、DriveLM 等数据结合。

### 5. Reasoning-VLA：用并行 action queries 替代逐 token 动作解码

[Reasoning-VLA](https://openreview.net/pdf/2958fe5249a1a673a414d689de7784b306b2a02a.pdf) 使用 Qwen2.5-VL-3B/7B 进行视觉语言推理，但动作端不再逐 token 解码。它从训练轨迹的高斯分布初始化可学习 action queries，让这些查询与 VLM 隐状态交叉注意，并行回归多个连续轨迹点，最后通过 refinement 模块修正。

数据侧将 NAVSIM、nuScenes、Waymo、Argoverse 2、KITTI、Mapillary、ONCE 和 IDD 统一成超过 7.5 万个 CoT 驾驶片段；训练采用 4 个 epoch 的 SFT 和 1 个 epoch 的 RL，奖励同时考虑轨迹、转向、加速度等动力学约束。正式 ICML 版本标题增加了 “Efficient and Spatial-Guided General”，与 [arXiv 版本标题](https://arxiv.org/abs/2511.19912) 略有差异。

## 主要发现

### 1. 从“文本航点”到“连续并行动作”，接口越来越物理化

EMMA 证明了统一文本空间的简洁性：其 Gemini 初始化版本在 nuScenes 上平均 L2 为 0.32 m，内部预训练的 EMMA+ 为 0.29 m。但文本坐标 token 较长，物理约束也只能隐式学习。

ORION 的对照实验更直接地说明动作接口的重要性：纯文本范式在 Bench2Drive 闭环只有 42.23 DS / 13.14% SR；ORION 的生成式规划接口达到 77.74 DS / 54.62% SR，并比 MLP planning-token 解码器高 7.01 DS、9.50 个百分点 SR。VAE 规划器也优于论文中的 diffusion 版本（77.74 vs. 71.97 DS）。需要注意，[CVF 网页摘要](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html) 写作 77.47 DS，而正式 PDF 的摘要、表 1 和正文均为 77.74；本文采用 PDF 表格值。

AutoVLA 的同模型对照同样支持这一点：文本输出的 NAVSIM PDM 为 71.31、推理 7.65 秒；物理动作 token 提升到 80.54，并缩短到 3.95 秒。Reasoning-VLA 再向前一步，把 10 条轨迹的生成时间从 Qwen2.5-VL-7B 自回归基线的 5.472 秒降到 0.089 秒，论文据此报告约 61 倍加速；但该数字是在 H200 + vLLM 条件下测得，不能直接外推到车端硬件。

### 2. 推理监督能改善规划，但增益依赖数据规模、奖励与评价方式

EMMA 在内部 2400 万场景上报告 CoT 带来 6.7% 的规划质量提升，其中元决策贡献 3.0%，关键目标识别贡献 1.5%；场景描述对驾驶指标中性，但增强可解释性。这个结果说明“写出理由”不是整体都有效，真正有用的是与动作决策直接相关的中间变量。

AutoVLA 的强化微调把 NAVSIM PDMS 从 one-shot 的 80.54 提高到 89.11，并把平均推理时间降低 66.8%。其 Best-of-N 达到 92.12，但依赖 oracle scorer 从 6 个候选中选优，不能当作普通在线推理结果。论文的数据规模实验还显示：nuPlan 训练样本少于约 5 万时，CoT 并不优于只训练动作，说明推理监督本身也需要足够覆盖率。

Reasoning-VLA 在统一数据集上的 SFT→RL 平均 L2 从 0.24 m 降到 0.23 m，但 Waymo、Mapillary 和 IDD 子集反而略有变差；零样本总体从 0.31 m 降到 0.29 m，nuScenes 则不变。RL 的收益因分布而异，不能只看聚合均值。

### 3. 结构化 3D 与历史记忆，是减少“会描述但不会驾驶”的关键补丁

OpenDriveVLA 的完整三阶段训练相对仅做规划微调，将 ST-P3 协议下的平均碰撞率从 0.13% 降到 0.09%，UniAD 协议下从 0.37% 降到 0.26%；它在 0.5B 规模就取得 0.35 m 平均 L2 和 0.09% 碰撞率。7B 并没有在所有指标上单调胜过 0.5B，提示结构化视觉先验有时比扩大 LLM 更重要。不过它依赖监督式 3D 感知与描述数据，因此不是完全从原始图像自发获得几何能力。

ORION 中，加入交通状态、运动推理和历史记忆后，闭环 DS 从基础生成式规划器的 56.33 提升到 77.74；16 个历史查询最好，增加到 32 个反而退化到 62.46。更多历史并不自动等于更好记忆，压缩方式和时间窗口同样关键。

### 4. 开环领先不等于闭环安全

Reasoning-VLA-7B 在 nuScenes 开环达到 0.23 m 平均 L2 和 0.08% 平均碰撞率；专门用 nuScenes RL 的 7B+ 为 0.22 m / 0.07%。但在 NeuroNCAP 安全关键闭环评估中，通用 7B 的碰撞率仍为 59.4%，7B+ 为 59.8%。这组反差是五篇论文中最醒目的证据：轨迹模仿误差很小，不代表交互式危险场景中真的安全。

相比之下，ORION 与 AutoVLA 都提供 Bench2Drive 闭环证据。ORION 为 77.74 DS / 54.62% SR，AutoVLA 为 78.84 DS / 57.73% SR；但两者仍是 CARLA 仿真，且训练配置不同。ORION 在 merging 与 give-way 场景落后于 DriveAdapter，作者将其归因于变道时机和因果关系歧义。这类分场景失败比总分更接近真实研究问题。

### 5. 多任务与多数据集有潜力，但也引入监督质量和公平比较问题

EMMA 的规划、检测、道路图联合训练分别报告约 +1.4%、+5.5%、+2.4% 的增益；其中规划提升的不确定区间为 ±2.8%，跨过零点，不能视作稳健结论。Reasoning-VLA 的八数据集统一训练增强了跨平台覆盖，但 7.5 万条 CoT 由强 VLM 生成后再规则与人工校验，监督偏差可能被继承。ORION 的 Chat-B2D 与 AutoVLA 的 CoT 也大量依赖自动标注。

因此，当前“通用性”更多意味着跨多个公开数据格式学习，而不是已经证明跨车辆、城市、气候和真实传感器栈稳定迁移。

## 局限与适用边界

### 论文证据的共同局限

- **基准碎片化**：不同论文使用的传感器、预测时长、训练集和指标不同；即使都写“碰撞率”，计算协议也可能不同。
- **自车状态捷径**：多篇模型输入历史轨迹、速度或导航命令，开环结果可能部分来自 ego-status bias，而不是充分理解视觉。
- **闭环证据偏少**：OpenDriveVLA 只有 nuScenes 开环；EMMA 的大规模 CoT 结果来自内部数据；ORION 与 AutoVLA 的闭环主要来自仿真；Reasoning-VLA 的安全关键闭环碰撞率仍高。
- **推理—动作一致性未保证**：模型生成的文字理由可能与最终轨迹不一致。EMMA 明确把这一点列为限制，其余工作也没有给出形式化一致性保证。
- **实时性口径不统一**：EMMA 优化版本约 3 FPS，AutoVLA 快模式平均约 1.07 秒，Reasoning-VLA 的 0.089 秒依赖 H200/vLLM；这些数字不能跨硬件直接比较，更不能等同于量产车端延迟。
- **缺少完整安全栈**：五篇论文均未证明模型可独立替代定位、冗余感知、规则约束、故障诊断和最小风险停车等安全模块。

### 本笔记的边界

- 只选 5 篇代表性正式论文，不能覆盖 TOKEN、OmniDrive、DriveMOE、FutureSightDrive 等相邻路线。
- 没有重跑代码、复训模型或审计数据泄漏；所有数字均来自论文正文和正式表格。
- “核心”按技术路线代表性与证据完整度判断，不按引用数排序；2026 年论文尚没有足够长的引用时间窗口。

## 我的思考

我认为自动驾驶 VLA 最可能落地的形态不是一个大模型以固定频率直接接管全部控制，而是一个**分层、双速率系统**：

1. VLA 低频处理语义、长尾场景、交互意图和多候选轨迹；
2. 轻量动作头高频输出连续轨迹或控制参考；
3. 独立安全层执行动力学约束、碰撞检查、不确定性门控与紧急回退；
4. 只有在场景复杂度或不确定性升高时，才触发显式/潜式深度推理。

从这 5 篇论文看，下一阶段最值得关注的不是继续扩大 VLM 参数，而是三个更具体的问题：

- **推理可验证性**：理由是否真的因果地支撑动作，而不是事后解释？
- **闭环数据飞轮**：如何用干预、反事实和失败回放构造比自动 CoT 更可靠的监督？
- **统一安全评价**：能否在同一传感器与算力约束下，同时报告开环误差、闭环任务成功、安全关键碰撞、校准度和尾延迟？

如果这三个问题没有被解决，VLA 的语言能力越强，可能只是让错误决策更像一个有说服力的解释，而不一定让车辆更安全。

## 延伸阅读

- [A Survey on Vision-Language-Action Models for Autonomous Driving](https://arxiv.org/abs/2506.24044)：用于快速建立任务、数据和模型谱系，但性能判断仍应回到原论文。
- [VLGA: Vision-Language-Geometric-Action Model for End-to-End Autonomous Driving](https://arxiv.org/abs/2606.12396)：用 dense pointmap geometry expert 强化几何接地；截至本文检索日仍为预印本，适合作为后续路线观察。

## 参考文献

1. Hwang, J.-J., Xu, R., Lin, H., Hung, W.-C., Ji, J., Choi, K., Huang, D., He, T., Covington, P., Sapp, B., Zhou, Y., Guo, J., Anguelov, D., & Tan, M. (2025). *EMMA: End-to-End Multimodal Model for Autonomous Driving*. Transactions on Machine Learning Research. [正式全文](https://openreview.net/pdf?id=kH3t5lmOU8) · [arXiv:2410.23262](https://arxiv.org/abs/2410.23262) · DOI：未分配/不可用。
2. Fu, H., Zhang, D., Zhao, Z., Cui, J., Liang, D., Zhang, C., Zhang, D., Xie, H., Wang, B., & Bai, X. (2025). *ORION: A Holistic End-to-End Autonomous Driving Framework by Vision-Language Instructed Action Generation*. Proceedings of the IEEE/CVF International Conference on Computer Vision, 24823–24834. [CVF 正式页面](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html) · [DOI:10.1109/ICCV51701.2025.02302](https://doi.org/10.1109/ICCV51701.2025.02302) · [arXiv:2503.19755](https://arxiv.org/abs/2503.19755)。
3. Zhou, X., Han, X., Yang, F., Ma, Y., Tresp, V., & Knoll, A. (2026). *OpenDriveVLA: Towards End-to-end Autonomous Driving with Large Vision Language Action Model*. Proceedings of the AAAI Conference on Artificial Intelligence, 40(16), 13782–13790. [AAAI 正式页面](https://ojs.aaai.org/index.php/AAAI/article/view/38386) · [DOI:10.1609/aaai.v40i16.38386](https://doi.org/10.1609/aaai.v40i16.38386) · [arXiv:2503.23463](https://arxiv.org/abs/2503.23463)。
4. Zhou, Z., Cai, T., Zhao, S. Z., Zhang, Y., Huang, Z., Zhou, B., & Ma, J. (2025). *AutoVLA: A Vision-Language-Action Model for End-to-End Autonomous Driving with Adaptive Reasoning and Reinforcement Fine-Tuning*. Advances in Neural Information Processing Systems, 38. [NeurIPS 正式页面](https://proceedings.neurips.cc/paper_files/paper/2025/hash/2843fccca5bedd369a4764848b9bd546-Abstract-Conference.html) · [arXiv:2506.13757](https://arxiv.org/abs/2506.13757) · DOI：未分配/不可用。
5. Zhang, D., Yuan, Z., Chen, Z., Liao, C.-T., Chen, Y., Shen, F., Zhou, Q., & Chua, T.-S. (2026). *Reasoning-VLA: An Efficient and Spatial-Guided General Vision-Language-Action Reasoning Model for Autonomous Driving*. Proceedings of the 43rd International Conference on Machine Learning, PMLR 306. [正式全文](https://openreview.net/pdf/2958fe5249a1a673a414d689de7784b306b2a02a.pdf) · [arXiv:2511.19912](https://arxiv.org/abs/2511.19912) · DOI：未分配/不可用。
