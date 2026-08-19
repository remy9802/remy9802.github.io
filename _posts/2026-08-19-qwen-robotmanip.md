---
title: "精读｜Qwen-RobotManip：三维对齐如何把异构机器人数据转化为可扩展训练信号"
date: 2026-08-19
permalink: /posts/qwen-robotmanip/
tags: [literature-note, qwen-robotmanip, vla, embodied-ai, robot-manipulation, cross-embodiment, action-representation, flow-matching]
note_type: single-paper
literature_topics:
  - embodied-ai
  - vla
  - action-representation
excerpt: "精读 Qwen-RobotManip 的表示、运动与行为三维对齐，重建 80 维动作空间、相机坐标系 EEF、上下文适配与 3.81 万小时数据配方，并审计 π0.5 对比、真机协议和开源边界。"
---

> **阅读范围**：arXiv v2 全文 44 页；正文至物理页 38，随后为参考文献，当前版本没有独立附录或补充材料。另核验 arXiv/DataCite 元数据、v1→v2 文本差异、Qwen 官方博客与官方 GitHub、π0.5 官方论文/实现，以及 RoboChallenge 官方评测说明。<br>
> **检索日期**：2026-08-19<br>
> **版本口径**：本文只把结果写成 arXiv v2 技术报告的作者报告；截至检索日未发现同行评议版本。<br>
> **核心问题**：机器人数据的形态、坐标系和行为差异能否先被对齐，再通过跨来源扩展获得真正的任务、场景、语言和跨本体泛化？

## 文献档案

- **题目**：*Qwen-RobotManip Technical Report: Alignment Unlocks Scale for Robotic Manipulation Foundation Models*
- **作者**：Haoqi Yuan、Zhixuan Liang、Anzhe Chen、Ye Wang、Haoyang Li、Pei Lin、Yiyang Huang、Zixing Lei、Tong Zhang、Jiazhao Zhang、Jie Zhang、Jingyang Fan、Gengze Zhou、Qihang Peng、Chenxu Lv、Xiaoyue Chen、An Yang、Fei Huang、Junyang Lin、Dayiheng Liu、Jingren Zhou、Chenfei Wu、Xiong-Hui Chen。
- **机构**：论文以 **Qwen Team** 署名，但正文与 arXiv/DataCite 元数据均未逐作者列出 affiliation；不根据品牌名称补写未经文献声明的机构归属。
- **年份 / 状态**：2026；arXiv `cs.RO` 主分类、兼属 `cs.CV` 与 `cs.LG` 的 v2 预印本。
- **文献链接**：[arXiv:2606.17846](https://arxiv.org/abs/2606.17846) · [v2 PDF](https://arxiv.org/pdf/2606.17846v2) · [Qwen 官方介绍](https://qwen.ai/blog?id=qwen-robotmanip)。
- **DOI**：[10.48550/arXiv.2606.17846](https://doi.org/10.48550/arXiv.2606.17846) 是 arXiv/DataCite 仓储 DOI，不是会议或期刊 DOI。
- **代码链接**：[QwenLM/Qwen-RobotManip](https://github.com/QwenLM/Qwen-RobotManip)。截至检索日，该仓库只有 README 与演示素材，**没有训练/推理代码**；README 还明确表示目前没有发布 Qwen-RobotManip 权重的计划。因此它应称为“官方信息仓库”，而不是可复现代码库。
- **模型 / 数据状态**：没有官方模型权重；没有发布整理后的 3.81 万小时混合语料、Human-to-Robot 合成集或 RoboTwin-IF/XE 独立数据包。构成机器人语料的源数据集大多公开，但论文的清洗、重采样、坐标修正和混合配方没有完整落地资源。
- **许可**：arXiv 条目为 CC BY 4.0；GitHub 根目录未提供独立 LICENSE 文件。
- **版本说明**：arXiv v1 提交于 2026-06-16，v2 提交于 2026-06-17。逐页文本比较显示，v2 只补充项目负责人标记和致谢，没有改变方法、表格或实验结论。

## 核心结论

Qwen-RobotManip 最有价值的思想不是单纯“把数据做大”，而是把跨机器人训练拆成三种不同的不一致并分别处理：用统一槽位与掩码解决**表示不一致**，用相机坐标系末端增量解决**运动坐标不一致**，用结构化提示与同一回合的执行历史解决**行为不一致**。在作者内部控制实验中，完整对齐版本随预训练数据从 1% 增至 100% 时，OOD 动作误差和 RoboTwin-Clean2Rand Hard 成功率都呈较稳定改善；未统一语义槽位的版本明显更不稳定。这支持“对齐是该训练配方实现数据扩展的必要条件”，但还不足以把它上升为所有 VLA 架构都成立的普遍 scaling law。[论文 §6.4，Figures 18–19](https://arxiv.org/pdf/2606.17846v2#page=32)

完整系统在多项 OOD 仿真和真机实验中领先 π0.5：例如 LIBERO-Plus 为 89.0% 对 84.4%，RoboTwin-Clean2Rand Hard（joint）为 62.6% 对 47.9%，EBench 为 45.6% 对 27.1%；CobotMagic ALOHA 的作者自建 OOD 真机任务为 87.5% 对 37.5%。然而这些数字检验的是**完整系统配方**，不是只隔离某一个对齐模块。尤其是 π0.5 对比缺少统一的训练步数、算力、超参数和推理预算说明；Table30 虽采用标准化真机评测，但 π0.5 是挑战委员会以约每任务 50 条样本训练的参考基线，而 Qwen 的该阶段数据预算没有披露。因而可以说“Qwen 提交系统在所报告协议下领先”，不能仅凭这些表格断言“模型架构本身公平击败 π0.5”。[论文 Tables 4–14](https://arxiv.org/pdf/2606.17846v2#page=21) · [RoboChallenge 官方年度报告](https://robochallenge.ai/2025%20RoboChallenge%20Annual%20Report.pdf)

可复现性是当前最大短板：论文未报告预训练算力、总步数、batch size、学习率、动作 chunk 长度、输入分辨率、控制频率和完整数据采样权重；官方仓库也没有代码或权重。这个版本更适合作为一份系统设计与实验报告，而不是可直接复现的开源基础模型。

## 检索记录

- **检索式**：准确题名、`arXiv 2606.17846`、`Qwen-RobotManip official code weights`、`Qwen-RobotManip pi0.5 RoboChallenge`、`Table30 generalist baseline training`。
- **主证据**：arXiv v2 PDF 与官方 API、DataCite 记录、Qwen 官方博客与 GitHub、Physical Intelligence 的 [π0.5 论文](https://arxiv.org/abs/2504.16054) 和 [openpi](https://github.com/Physical-Intelligence/openpi)、RoboChallenge 官方年度报告。
- **纳入原因**：用户指定论文；它直接讨论跨本体 VLA 的动作表示、数据扩展、OOD 评测和真机迁移。
- **全文状态**：已读 v2 的 44/44 页，核对正文、20 个编号表格、22 幅编号图、脚注、作者限制与参考文献。报告没有独立 appendix/supplement，因此不存在未读的附录实验。
- **版本 / 更正审计**：官方 API 当前指向 v2；未发现撤稿、更正或正式发表记录。v1→v2 不涉及技术内容变化。
- **代码审计**：检查官方仓库根目录与最新提交 `37f406303e13f0840a5e087c523b9b99108e7351`；只有 README 和 `assets/`，没有代码、配置、权重或数据清单。
- **排除**：聚合站和第三方解读只用于发现线索，不用于方法、数字或开源状态判断。

## 研究背景

### 1. VLA 扩展为什么比语言模型更难

文本模型可以把来自不同网站的样本映射到近似统一的 token 空间；机器人示范则同时携带硬件形态、关节定义、坐标系、相机安装、控制频率和操作者风格。即使两个机器人都在做“把杯子放到托盘上”，一个数据集可能记录 7 维绝对关节位置，另一个记录基座坐标下的末端位姿增量；相同视觉运动对应的数值标签并不相同。直接混合会让模型把容量花在识别数据集约定，而不是学习可迁移的操作结构。[论文 §1](https://arxiv.org/pdf/2606.17846v2#page=2)

论文进一步质疑只看 IID 榜单的做法：LIBERO 和 RoboTwin 的训练、测试场景高度同分布，甚至从头训练模型也能接近预训练模型；只有改变相机、背景、对象、指令或机器人本体，预训练是否学到可迁移结构才更容易显现。这个判断推动全文把 LIBERO-Plus、RoboTwin-Clean2Rand、EBench、RoboCasa365、RoboTwin-IF 和 RoboTwin-XE 作为主要证据。

### 2. 论文的核心假设

论文的逻辑链可以写成：

$$
\text{异构数据}
\xrightarrow{\text{表示/运动/行为对齐}}
\text{可共享训练信号}
\xrightarrow{\text{规模扩大}}
\text{OOD 泛化}.
$$

这里有两个需要分别验证的命题：

1. 没有对齐时，增加数据是否真的不能稳定改善 OOD 表现？
2. 对齐后出现的性能提升，是否能跨任务、场景、语言和机器人形态，并延伸到真机？

## 研究问题

论文实际回答五组可检验问题：

1. **表示对齐**：一个固定的跨本体状态—动作模板，能否同时容纳单臂、双臂、灵巧手和移动底盘，又不让空槽位产生错误梯度？
2. **运动对齐**：把末端动作统一投影到相机坐标系，是否比原始拼接或普通 EEF 相对动作更利于数据扩展与零样本跨本体迁移？
3. **行为对齐**：结构化本体提示和回合内历史能否让同一策略适应不同速度、动力学与执行风格？
4. **数据扩展**：公开机器人数据、第一人称人类视频、Human-to-Robot 合成数据和视觉语言协同训练分别贡献什么？
5. **外部效度**：OOD 仿真、少样本真机、标准化 Table30 和跨本体实验，能把结论推到多远？

## 方法与数据

### 1. 总体架构：Qwen-VL + flow-matching DiT

![Qwen-RobotManip 总体架构与三维对齐](/images/literature-notes/qwen-robotmanip/method-overview.png)

*图 1｜Qwen-VL 负责多视角视觉与语言语义，DiT 动作专家在统一状态—动作空间中预测连续动作；相机几何、末端类型和历史上下文共同参与去噪。来源：原论文 Figure 3，PDF 物理页 11。[原文 PDF](https://arxiv.org/pdf/2606.17846v2#page=11)*

模型由两个解耦但端到端联合优化的部分组成：

- **视觉语言骨干**：Qwen3.5-4B，最后一层隐藏维度为 2560；动态分辨率视觉 token 与文本 token 在同一 Transformer 中融合。
- **动作专家**：10 层 DiT，隐藏维度 768、12 个注意力头；状态由两层 MLP 编码并与 noisy action token 拼接。偶数层 cross-attention 读取视觉 token，奇数层读取语言 token。
- **条件信号**：扩散/流匹配时间步、末端类型、相机参数是否可用，以及可选的历史 context。
- **输出**：一段连续动作 chunk 的 velocity field；标准模型推理时用 4 步 Euler 积分。Context 版本在消融中需要 10 步才消除明显抖动。

这种分工让 VLM 保留语义与视觉先验，较小的 DiT 专注连续控制。但论文没有给出动作 chunk 的确切长度 $T$、实际控制 Hz、图像分辨率和绝对端到端延迟，因而“4 步 Euler”不能单独证明实时性。

### 2. 表示对齐：80 维 canonical state-action vector

统一向量由两个 29 维单臂块和 22 个共享保留维组成：

| 单臂字段 | 维数 | 状态含义 |
|---|---:|---|
| 关节位置 | 7 | 机械臂关节绝对位置 |
| EEF 位姿 | 9 | 3D 位置 + 6D 连续旋转表示 |
| 夹爪 | 1 | 平行夹爪位置 |
| 灵巧手 | 12 | 多指主动关节 |

单臂只填一个块，双臂填两个块，灵巧手再填手指槽位；移动底盘等额外自由度可放入 22 个保留维。不存在的自由度补零，并通过逐维 binary mask 从损失中排除。这样，“第几个维度表示什么”在各本体之间保持固定，而不只是把原始动作任意拼接到同样长度。[论文 §3.2](https://arxiv.org/pdf/2606.17846v2#page=10)

状态与动作仍不完全同构：状态中的 EEF 旋转用 6D 表示，EEF 动作的旋转增量用 3D rotation vector；关节动作是绝对值，EEF 动作是相对当前状态的增量。论文没有明确说明 9 维 EEF 槽在动作侧剩余的 3 个位置如何编码或屏蔽，这是实现层面的一个小缺口。

训练掩码不仅覆盖无效维度，还合并了：

1. 本体槽位 mask；
2. 越界、异常帧和 episode 尾部的时间步 mask；
3. 人类视频中手离开视野后的 per-hand mask。

每个样本按有效元素数独立归一化，避免双臂或高自由度本体仅因有效维度更多而主导梯度。

### 3. 运动对齐：相机坐标系 EEF 增量

统一槽位只解决“字段位置”，仍没有解决“同一动作在不同坐标系下数值不同”。设当前末端坐标系为 $e$、目标末端为 $e^*$、参考相机为 $c$，模型把末端增量变换到相机系：

$$
\Delta p_c = R_{ce}\Delta p_e,
\qquad
\Delta R_c = R_{ce}\Delta R_e R_{ec}.
$$

操作上，相机里看起来相近的移动会得到相近的数值目标，降低机器人基座定义与关节形态造成的碎片化。作者没有采用更紧凑的完整位姿复合式，因为其平移项会与相对旋转及 camera-to-EEF offset 耦合，对长尾分布和标定误差更敏感。[论文 Equations 5–6，§3.3](https://arxiv.org/pdf/2606.17846v2#page=12)

相机几何还通过 CaPE 注入 DiT：

- 每个 64 维注意力头中，32 维用于相机旋转位置编码，另 32 维用 RoPE 表达时间；
- CaPE 同时作用于 query、key、value 和 attention output；
- 内参通过归一化 patch 坐标的线性投影加入视觉 token；
- 多视角训练时随机选择外部、头部或腕部相机作为动作参考系；
- 若样本没有标定参数，auxiliary flag 会让策略退回 robot-base relative 模式。

最后一点很重要：所谓“统一相机动作空间”并未覆盖所有数据。真正的 camera-frame 模式依赖训练与部署时都有可靠内外参；缺失标定时仍存在另一套动作约定。

### 4. 行为对齐：prompt + in-context policy adaptation

结构化 prompt 包含：本体名称、任务指令、以 500 步分箱的 episode 长度（论文称 speed）、FPS 和相机相对机械臂的方向。训练时以 15% 概率丢弃 embodiment、speed 和 FPS 字段，使缺少元信息时不至于完全失效。

Context 版本则把最近执行历史看作“隐式本体描述”。一个历史块为

$$
c_h=(o_h,s_h,a_h),
$$

即历史图像、状态和已执行的 $K$ 步动作。历史图像与当前图像一起进入 VLM；状态和动作经 MLP 映射成 token，并带时间位置与 chunk 内槽位 embedding。默认的 unified 模式让这些 token 进入 VLM 全层因果注意力，再将融合表示交给 DiT。

训练时不能总取最近历史，否则模型会学成复制上一段动作。作者从 episode 的随机位置采样上下文，迫使模型提取更稳定的速度、抓取风格和动力学线索；部署时才使用 rolling recent window。这个机制不更新参数，因此是回合内条件适配，不是在线梯度学习。

它也有明确代价：Context 模型在 4 步去噪时出现抖动，增至 10 步后才超过无上下文模型；episode 开头全零历史还会使真机起步犹豫。Context 也没有在所有基准上提升，EBench、RoboCasa365 和 RoboTwin-IF 均略有回退。[论文 §3.5、Table 15](https://arxiv.org/pdf/2606.17846v2#page=33)

### 5. Human-to-Robot：扩展本体与视觉覆盖

![Qwen-RobotManip Human-to-Robot 合成流程](/images/literature-notes/qwen-robotmanip/human-to-robot-pipeline.png)

*图 2｜流程先把人手轨迹重定向为平行夹爪，再去除人手、搜索机器人基座、做 IK 渲染与深度合成；同一批第一人称视频被渲染为 15 种双臂本体。来源：原论文 Figure 1，PDF 物理页 5。[原文 PDF](https://arxiv.org/pdf/2606.17846v2#page=5)*

人手到机器人由两个阶段组成：

1. **动作对齐**：用 MANO/21 个手关键点构造虚拟手指；拇指与虚拟手指中点作为 EEF 位置，距离作为夹爪开度，腕部—指尖和虎口方向构造右手坐标系；位置/开度用 Savitzky–Golay 平滑，旋转用加权 SLERP。
2. **视觉对齐**：SAM3 分割手臂，ProPainter 完成人手去除；围绕轨迹中心网格搜索可达基座；MuJoCo IK 追踪动作并渲染机器人，Depth Anything 3 提供场景深度，以遮挡关系完成合成。

目标机器人包括 Panda、UR5e、ARX-L5、xArm7、Sawyer、Kinova Gen3、IIWA、Jaco、FR3、UR10e、ViperX、WidowX、Piper、YAM 和 AgileX ALOHA，每种以同构双臂形式渲染。EgoDex、EgoVerse 和 ViTRA 还分别按 60%、45% 和 25% 帧率采样，以缩小人与机器人动作速度差异。[论文 §2.3](https://arxiv.org/pdf/2606.17846v2#page=4)

### 6. 数据构成与“开放数据”口径

| 数据类型 | 论文计入时长 | 主要来源 | 证据边界 |
|---|---:|---|---|
| 单臂机器人 | 3,808 h | OXE、RoboMIND、DROID、RH20T 等 | 多源公开数据的筛选子集 |
| 双臂机器人 | 6,744 h | AgiBotWorld、RoboCOIN、RDT 等 | 不同本体和采集约定 |
| 移动/人形机器人 | 868 h | InternData-A1、Galaxea 等 | 含仿真与移动操作 |
| 人类第一视角 | 1,933 h | EgoDex、VITRA、EgoVerse | 同时也是 H2R 的源内容 |
| Human-to-Robot | 24,808 h | 上述人类视频渲染到 15 种本体 | 派生视图，不是等量独立行为内容 |

表中相加为 38,161 小时，论文取整为约 38,100 小时。这里的 24,808 小时是由 1,933 小时人类视频跨本体变换得到；它扩展的是视觉形态与动作表示覆盖，不能解释为 24,808 小时彼此独立的新任务语义。[论文 Table 1](https://arxiv.org/pdf/2606.17846v2#page=3)

论文还使用约 2,800 万条 VLM 数据，覆盖通用视觉理解、空间推理、OCR、专业视觉知识、多语种/文本和 embodied-centric VL。后者包括由 Qwen3.6-Plus 生成的 ECoT、第一人称动作描述和 2D 手/EEF 轨迹预测。

因此必须精确区分两句话：

- **成立**：3.81 万小时“操作语料”由公开机器人数据与公开/可获得的人类视频派生，没有额外私有机器人采集。
- **不成立**：整个训练配方完全由公开数据构成。论文 §2.5 明确写到 2,800 万条 VL mixture 包含 proprietary data，而具体组成比例、条目和授权没有公开。

### 7. 数据清洗

所有操作数据经过五级数值清洗：突变检测、state-action 时序趋势对齐、极值过滤、关节—EEF 正运动学一致性修正，以及基坐标/EEF 朝向统一。另有三类跨模态检查：指令—视频一致性、机器人重投影与分割 mask 的一致性、黑帧/模糊/静止片段过滤。论文报告 RoboMIND 的 UR 类型数据有 81% episode 因时序趋势检查失败而被排除，说明原始数据质量问题并非边缘现象。[论文 §2.4](https://arxiv.org/pdf/2606.17846v2#page=6)

但各数据集阈值、投票 VLM、完整保留率和被修正轨迹列表没有公开；这使“清洗后语料”难以从源数据重建。

### 8. 训练目标

给定真实动作块 $a$，采样噪声 $\epsilon\sim\mathcal N(0,I)$ 和时间 $t\sim\operatorname{Beta}(1,1.5)$，构造线性路径

$$
x_t=(1-t)\epsilon+ta.
$$

动作专家预测速度 $a-\epsilon$，使用有效槽位掩码 $m$ 的 flow-matching MSE：

$$
\mathcal L_{\mathrm{FM}}
=\frac{1}{B}\sum_{i=1}^{B}
\frac{\sum_{t,j}m_{i,t,j}\left(f_\theta(x_{i,t},t_i,s_i,o_i)_j-v_{i,t,j}\right)^2}
{\sum_{t,j}m_{i,t,j}}.
$$

VLM 样本使用标准 next-token loss $\mathcal L_{\mathrm{VLM}}$，总目标为

$$
\mathcal L=\mathcal L_{\mathrm{FM}}+0.1\mathcal L_{\mathrm{VLM}}.
$$

实际训练采用 VLA:VL 为 9:1 的互斥 batch；每个操作样本重复采 8 组噪声与时间步，以摊薄 VLM 前向成本。两个损失都会更新 VLM，动作专家只参与动作路径。[论文 §4.1](https://arxiv.org/pdf/2606.17846v2#page=14)

领域 SFT 把一个目标域内所有任务合并为 generalist 模型，只优化 flow-matching loss，关闭预训练的数据过滤并加入 color jitter。论文的主对比使用标准目标域 SFT；额外实验再混入 10% VL 数据和相似本体的预训练 VLA 数据，以缓解 VLA-to-VA 的语言遗忘。

### 9. 部署路径

真机观测经 WiFi 发往远端服务器，动作再回传机器人。系统使用 Real-Time Chunking，在执行当前 action chunk 时异步生成下一块，以隐藏网络与推理延迟。[论文 §5](https://arxiv.org/pdf/2606.17846v2#page=16)

报告没有提供服务器 GPU、平均/尾部延迟、控制频率、丢包、RTC overlap 长度或本地故障回退。因此“远端闭环可以工作”有定性与成功率证据，“满足实时/安全控制要求”则没有系统测量支持。

## 实验

### 1. 证据链总览

| 论文主张 | 最直接证据 | 支持什么 | 不能推出什么 |
|---|---|---|---|
| 对齐使数据扩展有效 | 1%–100% 嵌套子集；Figures 18–19 | 在作者模型/数据中，完整表示的 OOD 误差与成功率随数据改善 | 普适 scaling exponent；其他架构也必然相同 |
| 相机 EEF 有利于跨本体 | RoboTwin-XE、Table 13、Table 20 | 对齐相机与初始 EEF 后，EEF 模式优于 joint/消融 | 无标定、不同相机或真实未知机器人也能零样本迁移 |
| H2R 数据有效 | Tables 16–17 的 robot-only/+ego/+H2R | 同一训练设置中 H2R 对 OOD 有额外增益 | 24,808 派生小时等价于独立真机小时 |
| VL co-training 保留泛化 | Table 18 | 移除 VL 后 RT-C2R/IF 明显下降 | 具体哪类 VL 数据起作用；私有数据不是必要条件 |
| 完整系统领先 π0.5 | Tables 4–14 | 在报告采用的多项协议中提交系统得分更高 | 在统一参数量、算力、训练步数与推理预算下的纯算法优势 |
| 出现自主恢复 | Figures 15–16 的案例 | 选定轨迹中能在跌落后重试并成功 | 重试频率、因果来源或比基线更常恢复 |

### 2. OOD 仿真：完整配方的优势

![Qwen-RobotManip 三类 OOD 泛化汇总](/images/literature-notes/qwen-robotmanip/ood-summary.png)

*图 3｜作者把场景/任务、指令和跨本体结果归成三类。注意浅色柱是各任务的“previous SOTA”，并非每一柱都固定为 π0.5，因此倍率不能解释成统一的一对一 π0.5 对照。来源：原论文 Figure 7，PDF 物理页 20。[原文 PDF](https://arxiv.org/pdf/2606.17846v2#page=20)*

| 基准 | π0.5 | Qwen-RobotManip | Context | 读法 |
|---|---:|---:|---:|---|
| LIBERO-Plus overall SR | 84.4 | 89.0 | 91.4 | +4.6 / +7.0 个百分点 |
| RoboTwin-C2R Hard SR（joint） | 47.9 | 62.6 | 69.4 | +14.7 / +21.5 个百分点 |
| EBench overall SR | 27.1 | 45.6 | 43.6 | Context 反而下降 2.0 点 |
| RoboCasa365 total SR | 16.9 | 35.9 | 33.8 | Composite-Unseen 仍只有 14.9% |
| RoboTwin-IF average SR | 49.6 | 72.2 | 72.0 | 只验证 held-out 模板，不等于开放语言 |
| RoboTwin-XE average SR（EEF） | 7.5 | 23.9 | 未报告 | 仿真零样本、相机配置受控 |

这组结果稳健地说明完整预训练配方在作者采用的 OOD 设置中优于从头训练和所测 VLA；同时也显示困难任务仍未解决。RoboCasa365 Composite-Unseen 只有 14.9%，RoboTwin-XE 的 Franka 仅 5.9%，说明“泛化”是相对改进，而不是可靠的开放世界操作。

### 3. “alignment unlocks scale” 的直接消融

![动作表示对齐的数据扩展曲线](/images/literature-notes/qwen-robotmanip/alignment-scaling.png)

*图 4｜语义槽位与相机 EEF 完整对齐后，验证 MSE 和 RoboTwin-C2R Hard 成功率随数据比例更稳定地改善；IID Easy 不呈同样趋势。来源：原论文 Figures 18–19，PDF 物理页 32。[原文 PDF](https://arxiv.org/pdf/2606.17846v2#page=32)*

作者比较三种设计：

- `w/o UnifiedSpace`：原始字段拼接并补零，没有跨本体语义槽位；
- `w/o UnifiedEEF`：有 80 维语义槽位，但 EEF 只是相对初始姿态的 axis-angle；
- `Ours`：再加入 camera-frame delta EEF。

在 RoboTwin-C2R Hard 的全量数据点，完整模型达到 50.2%（joint）和 56.6%（EEF），并随数据增大总体上升；IID Easy 则没有清晰单调关系。这是论文标题最重要的直接证据。

仍需保留三个统计边界：每个点选择“所有 checkpoint 中最好的验证 MSE”，会产生乐观选择；论文没有给随机种子、误差条或显著性检验；“近似 log-linear”只基于 6 个数据比例，没有拟合参数和外推检验。因此更稳妥的表述是**观察到内部扩展趋势**，而不是建立了严格的 scaling law。

### 4. H2R、VL 与架构消融

- **H2R**：RoboTwin-C2R Hard 从 robot-only 的 54.7% 提到 58.7%，比直接加原始 ego 的 55.0% 高 3.7 点；LIBERO-Plus 从 87.1% 提到 89.0%，比 raw ego 高 0.6 点。H2R 有一致但中等规模的增益，不是主结果全部差距的唯一来源。
- **VL co-training**：预训练移除 VL 后，RoboTwin-C2R Hard 从 62.6% 降至 54.4%，RoboTwin-IF 从 71.6% 降至 64.6%；post-training 加 VL 把 IF 提至 73.1%，但 Hard 为 62.5%，几乎不变。
- **架构**：last-layer cross-attention 在 LIBERO-Plus 为 87.5%，比 last-layer self-attention 的 87.0% 高 0.5 点，比 layer-wise 86.4% 高 1.1 点。它主要兼顾成本与小幅性能，不是大幅跃升。
- **Context**：在部分基准提升明显，但在 EBench、RoboCasa365、RoboTwin-IF 回退；早期消融中 4 步去噪无法兑现 context 增益，10 步才达到 70.9 平均分。

### 5. 真机 ALOHA：强结果，小样本分母

![CobotMagic ALOHA 真机 ID 与 OOD 结果](/images/literature-notes/qwen-robotmanip/real-robot-results.png)

*图 5｜同一 CobotMagic ALOHA 上，ID 共 7 个任务×5 次，OOD 共 4 个任务×10 次。Qwen-RobotManip 的汇总成功率分别为 88.6% 和 87.5%。来源：原论文 Tables 10–11，PDF 物理页 25。[原文 PDF](https://arxiv.org/pdf/2606.17846v2#page=25)*

模型用 22.9 小时 CobotMagic ALOHA 遥操作数据做领域微调：

- ID：31/35 成功，π0.5 为 15/35；最明显失败项是精密 yellow-disc insertion，仅 2/5。
- OOD：35/40 成功，π0.5 为 15/40；变化包括杂乱背景、未见对象、左右关系和 disco light。

这些是真实硬件上的闭环 task success，而非只看离线动作误差。不过论文没有明确说明 CobotMagic 对比中 π0.5 是否使用完全相同的 22.9 小时、训练步数和调参预算，也未给置信区间、随机化顺序或多个场地复现。5 次/任务的 ID 结果尤其容易受单次成败影响。

### 6. ARX 少样本：与 π0.5 最接近受控的比较

ARX 实验明确规定三种方法都使用相同的 130 条遥操作示范、相同状态输入（joint + EEF）并预测 EEF 动作：Unscrew Cap 50 条，其余 4 个任务各 20 条。Qwen 在 Put Fruits、Put Blocks、Fold Towel 和 Unscrew Cap 的分阶段成功率均不低于 π0.5；Insert Screw 两者都只有 handover 2/10，完整插入为 0/10。[论文 Table 12](https://arxiv.org/pdf/2606.17846v2#page=27)

这是论文里 π0.5 数据和接口控制最清楚的一组真机证据，但表中“Avg. success”是若干子步骤成功数的平均，不是每个任务的端到端成功率；训练超参数与推理预算仍未对齐披露。

### 7. 跨本体迁移：从受控仿真到真机技能组合

RoboTwin-XE 只用 AgileX 示范微调，在相同场景/随机种子、相同相机外参、IK 对齐初始 EEF 的条件下，把机器人替换为 ARX-X5、UR5-WSG 和 Franka：

- Qwen EEF：42.9 / 22.8 / 5.9，平均 23.9%；
- Qwen joint：37.6 / 4.1 / 1.8，平均 14.5%；
- π0.5 EEF：11.5 / 10.0 / 1.1，平均 7.5%。

这很好地隔离了动作接口对形态变化的作用，但仍是仿真，且相机几何被刻意固定；Franka 的 5.9% 表明形态差异变大后迁移快速衰减。

另一组 ARX 真机实验把 6,000 条 CobotMagic 与 130 条 ARX 示范共同训练，再测 4 个 ARX 未见任务。完整对齐达到 22/40（55.0%），`w/o UnifiedEEF` 为 5/40（12.5%），`w/o UnifiedSpace` 为 3/40（7.5%）。这是支持统一表示带来跨本体技能组合的强内部消融，但它不是对完全未见机器人的零样本真机测试。

### 8. RoboChallenge Table30：评测统一，训练预算不统一

Qwen 以匿名名 `Lira_generalist` 提交，一个模型负责每种本体的全部任务，在 30 个任务、4 种机器人上得到 45% 成功率与 59.83 process score；DM0 为 37% / 48.43，π0.5 generalist 为 17.67% / 31.27。[论文 Table 14](https://arxiv.org/pdf/2606.17846v2#page=28)

“20% relative improvement”是相对 DM0 的近似说法：成功率提高 8 个百分点，按 DM0 为分母约为 21.6%；它不是相对 π0.5 的 20%。Table30 的优势是同一硬件、场景重置、10 次执行和评分体系，且公开录像/日志，减少作者自建实验的操作员偏差。

公平性限制来自训练侧。RoboChallenge 官方报告说明 `pi05_generalist` 和 `pi0_generalist` 是委员会训练的参考模型，每个任务约 50 条样本，代表少样本多任务的下界；Qwen 报告只说使用挑战提供的数据 post-train，没有给实际样本数、训练步数或调参预算。因此 Table30 可以证明 Qwen 的**最终提交系统**在标准化评测上更强，不能作为等训练预算的 π0.5 架构对照。

### 9. 重试行为：有案例，缺少统计

论文展示 Qwen 在物体两次掉落后第三次抓取成功，并认为这是异构预训练中自然纠错轨迹带来的 emergent retry。这个案例证明策略能够闭环重试；但同一 Figure 16 中 DM0 也尝试了三次，只是都没抓稳。因此可见差异至少部分是抓取精度，而不是“有无重试机制”。没有重试触发率、恢复成功率或相同失败注入实验，不能给预训练与重试行为建立因果关系。[论文 Figures 15–16](https://arxiv.org/pdf/2606.17846v2#page=30)

## 主要发现

1. **三维对齐是分工明确的系统工程**：80 维槽位解决语义位置，相机 EEF 解决几何坐标，prompt/context 解决执行风格；三者不应混称为单一“动作统一”。
2. **最强因果证据来自内部 action-space 消融**：在相同模型族与嵌套数据子集下，完整对齐更稳定地利用新增数据，并在 OOD Hard 上持续获益。
3. **OOD 才显出预训练价值**：IID 榜单中从头训练模型已经很强，而相机、机器人初态、杂物和本体变化拉开差距。
4. **H2R 与 VL 都有独立贡献，但口径必须谨慎**：H2R 扩展的是同一人类行为的本体渲染；VL mixture 又包含私有数据，不能把完整训练说成全开源。
5. **Context 是有条件的增强项**：它提高部分机器人初态和 C2R robustness，却增加去噪成本、起步犹豫，并在若干基准回退。
6. **真机证据覆盖四种平台，但控制程度不一**：ARX 130 示范对比最接近同数据协议；CobotMagic 结果强但分母小；Table30 评测统一而训练预算不同。
7. **失败结果仍然关键**：RoboCasa365 Composite-Unseen 14.9%、Franka 零样本 5.9%、ARX Insert Screw 0/10，说明精密接触、长程组合与大形态差异仍未解决。

## 结论

### 作者结论

作者把 Qwen-RobotManip 视为“alignment first, then scale”的正面答案：统一的跨本体表示使约 3.81 万小时操作数据能够协同训练，H2R 提供本体多样性，VL co-training 保留感知与语言能力，最终带来任务/场景、指令和跨本体泛化。[论文 §7](https://arxiv.org/pdf/2606.17846v2#page=38)

### 证据支持的较窄结论

报告有力支持：**在 Qwen3.5-4B + flow-matching DiT 这一模型族、作者构建的数据和评测协议内，语义槽位与相机 EEF 对齐使跨本体数据更容易转化为 OOD 动作预测和任务成功率；完整系统也在多项仿真与真机评测中达到很强结果。**

它尚未证明：完全公开可复现的训练即可得到同样结果；对齐规律能无条件推广到其他 VLA；相对 π0.5 的全部优势来自对齐而非更多数据、不同 VLM、训练/推理预算或私有 VL 数据；以及系统已具备开放环境安全部署能力。

## 局限与适用边界

### 作者明确报告的局限

1. Human-to-Robot 仍有重定向近似、去除/修补伪影和仿真渲染域差距。
2. OOD 评测虽然比标准 benchmark 更难，但仍以仿真为主，需要更广的真实部署验证。
3. 固定 action chunk 和当前推理延迟限制了亚秒级高反应任务。
4. Context 模型起步时面对全零历史会犹豫；历史增加动作分布复杂度，需要更多去噪步。

### 额外识别的局限

1. **不可复现**：没有代码、权重、整理数据和详细训练配置；官方还明确表示当前不计划发布权重。
2. **“全开放”范围有限**：操作小时来自公开源，但 2,800 万条 VL 数据包含私有部分；完整训练输入无法审计。
3. **训练配方缺失**：没有总步数、GPU/算力、batch size、学习率、分辨率、chunk 长度、控制频率和逐数据集采样权重。
4. **π0.5 公平性不统一**：多数表只保证目标数据集相同或同一评测，未保证训练/推理预算相同；Table30 的 π0.5 又是少样本参考基线。
5. **真实机器人统计量有限**：多项任务只有 5 或 10 次，没有置信区间、多随机顺序、多机器人实例或多实验室复现。
6. **“scaling law”证据偏探索性**：6 个数据比例、最佳 checkpoint、无误差条和拟合检验，适合称趋势，不适合外推。
7. **派生小时可能夸大独立多样性**：24,808 小时 H2R 共享 1,933 小时人类源轨迹；小时数不等于独立任务信息量。
8. **相机 EEF 依赖标定**：RoboTwin-XE 固定相机外参并对齐初始 EEF；无标定时模型退回另一动作模式，真实跨设备泛化更难。
9. **语言泛化仍受控**：RoboTwin-IF 使用 held-out 模板，但任务、交互对象池和动作类型预先定义，不等于自由形式开放指令。
10. **恢复能力仅定性**：选定成功案例没有比较恢复率；基线也可能重试。
11. **安全与系统可靠性未评估**：远程 WiFi 推理没有尾延迟、断网、碰撞、力限幅、人机共处和异常停止报告。
12. **作者归因可能过宽**：完整系统同时改变数据规模、VLM、动作表示、合成、清洗、VL 协同训练与 context，跨模型榜单无法把全部增益归到“alignment”。

## 我的思考

### 1. 真正可迁移的单位可能是“观测坐标中的局部运动”

统一动作 token 只解决离散符号兼容，相机坐标 EEF 则尝试让数值距离与视觉相似性一致。这比简单的 embodiment ID 更接近一种**任务相关不变量**：看到相同方向的局部位移，就预测相似动作。下一步值得检验的是，这个不变量能否在显著改变相机位置、焦距、时延和手眼标定误差时继续成立。

### 2. 对齐不是消除本体信息，而是分离共享量与本体条件量

Qwen-RobotManip 并没有假设所有机器人完全相同。它把共享的 EEF 几何放在 canonical space，把不可共享的动力学/速度/手型放进 prompt、EEF type 和 episode context。这种“共享主干 + 显式条件”比完全抹平本体差异更合理。可以进一步做的实验是：逐层测量哪些 token 编码任务不变量，哪些仍能识别机器人身份。

### 3. 更严格的 π0.5 对照应该怎么做

一个真正归因于算法的比较至少需要固定：目标域示范数量、图像视角/分辨率、状态与动作接口、参数更新范围、优化步数、总 FLOPs、action chunk、执行窗口、去噪步数和 RTC 设置。然后同时报告多种随机种子、wall-clock 与真机成功率。当前报告最接近这个要求的是 ARX 130 示范实验，但仍差训练预算和多种子。

### 4. H2R 应按“独立信息量”而不仅是小时数计量

把一个人类片段渲染成 15 种机器人确实增加了本体覆盖，却没有增加 15 倍任务语义。更有解释力的 scaling 横轴可以同时报告：独立源轨迹小时、本体渲染小时、任务数、对象数和场景数。若固定源轨迹数量只增加渲染本体数，便能直接测量“本体多样性”而非总小时的贡献。

### 5. 三个可检验的后续问题

1. **标定鲁棒性**：给相机内外参加入可控偏差，比较 camera EEF、base EEF 和 joint action 的退化曲线。
2. **恢复因果性**：注入标准化滑落、遮挡与抓取偏移，报告 retry rate、recovery success 和额外动作代价，并消融含失败/纠正轨迹的数据。
3. **开放配方复现**：只用可公开追溯的 VL 子集与公开机器人数据训练较小模型，检验“对齐后 scaling”是否仍成立，分离私有 VL 与动作对齐的作用。

## 参考文献

1. Yuan, H., Liang, Z., Chen, A., et al. (2026). *Qwen-RobotManip Technical Report: Alignment Unlocks Scale for Robotic Manipulation Foundation Models*. arXiv preprint arXiv:2606.17846 v2. [arXiv](https://arxiv.org/abs/2606.17846) · [PDF](https://arxiv.org/pdf/2606.17846v2) · [arXiv DOI](https://doi.org/10.48550/arXiv.2606.17846) · [官方信息仓库](https://github.com/QwenLM/Qwen-RobotManip)
2. Black, K., Brown, N., Darpinian, J., et al. (2025). *π0.5: a Vision-Language-Action Model with Open-World Generalization*. Conference on Robot Learning. [arXiv](https://arxiv.org/abs/2504.16054) · [官方实现 openpi](https://github.com/Physical-Intelligence/openpi)
3. RoboChallenge Committee. (2026). *2025 RoboChallenge Annual Report*. [官方 PDF](https://robochallenge.ai/2025%20RoboChallenge%20Annual%20Report.pdf)
