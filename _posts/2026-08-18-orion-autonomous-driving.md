---
title: "文献笔记｜ORION：用生成式规划器连接语言推理与驾驶动作"
date: 2026-08-18
permalink: /posts/orion-autonomous-driving/
tags: [literature-note, autonomous-driving, vision-language-action, orion]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
---

> **阅读范围**：阅读全文，包括 Bench2Drive 表格、动作接口与历史查询消融。  
> **检索日期**：2026-08-18。  
> **主题**：怎样让 VLM 的语义推理端到端地指导精确、可多模态采样的数值轨迹？

## 文献档案

- **文献链接**：[ICCV 2025 CVF 正式页面](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html) · [arXiv:2503.19755](https://arxiv.org/abs/2503.19755)
- **代码链接**：[xiaomi-mlab/Orion](https://github.com/xiaomi-mlab/Orion)
- **作者 / 机构 / 年份**：Haoyu Fu、Diankun Zhang、Zongchuang Zhao、Jianfeng Cui、Dingkang Liang、Chong Zhang、Dingyuan Zhang、Hongwei Xie、Bing Wang、Xiang Bai；Huazhong University of Science and Technology、Xiaomi EV；2025。
- **出版状态**：ICCV 2025，页 24823-24834；[DOI:10.1109/ICCV51701.2025.02302](https://doi.org/10.1109/ICCV51701.2025.02302)。

## 核心结论

ORION 的关键贡献不是换一个更大的 VLM，而是用可微生成式规划器连接“语言推理空间”和“连续动作空间”。在 Bench2Drive 仿真闭环中，这一接口明显优于纯文本轨迹和简单 MLP 解码，但证据仍局限于 CARLA 短路线与特定训练配置。

## 检索记录

- **数据源**：CVF Open Access、IEEE DOI、论文项目页与官方 GitHub。
- **检索式**：`ORION vision-language instructed action generation generative planner Bench2Drive`。
- **纳入原因**：代表“VLM planning token + 可微生成式数值规划器”的 VLA 路线，并提供闭环消融。
- **版本核验**：以 ICCV 正式 PDF 的表格为准；CVF 网页摘要一处写作 77.47 DS，而正式 PDF 摘要、正文和表 1 均为 77.74。

## 研究背景

驾驶 VLM 的核心结构矛盾是：语言模型的隐藏状态适合表达语义和因果关系，车辆轨迹却是连续、多模态且受道路与动力学约束的分布。把浮点坐标当文本生成会产生量化、格式和时延问题；将 VLM 只用于低频 meta-action，再由独立规划器执行，则轨迹损失无法训练语言侧的视觉推理。与此同时，单帧 VLM 缺少对运动趋势和历史交互的记忆。

ORION 延续 VLM 的文本推理能力，但不让它直接承担数值轨迹解码。论文用 QT-Former 压缩当前感知与长期历史，用一个 planning token 汇总语言推理，再以条件生成模型输出轨迹分布。这使它处在“纯语言动作”和“完全独立规划器”之间。

## 研究问题

VLM 能解释交通状态，但驾驶需要连续、多解且可执行的轨迹。纯文本坐标解码受数值精度和自回归延迟限制；把 VLM 只当高层决策器又切断了轨迹损失对语言推理的反馈。ORION 试图建立一个可端到端训练的桥梁，让语义、历史和动作共同优化。

## 方法与数据

![ORION 从视觉、推理到动作的完整架构](/images/literature-notes/orion-autonomous-driving/method-overview.png)

*图 1｜ORION 的三空间对齐：QT-Former 把视觉空间压缩成 perception、scene、history queries；LLM 在推理空间生成文本任务和 planning token；生成式规划器把该 token 映射到多模态动作空间。来源：原论文图 2。*

训练时，感知任务损失先约束 perception queries，VQA 交叉熵约束语言推理，轨迹重建、KL、碰撞和道路边界损失则通过 planning token 反向传回语言侧。推理时不需要真实轨迹编码器：只保留由 planning token 条件化的潜变量先验并采样多条候选，再由 GRU 解码。因而条件 VAE 的真实轨迹分支只用于训练对齐，不能误解为测试阶段偷看未来。

### QT-Former：当前帧感知与长期记忆

EVA-02-L 将多相机图像编码为视觉特征。QT-Former 用 512 个 scene queries 和 600 个 perception queries 与带 3D 位置编码的图像特征交叉注意；perception queries 另接目标/地图检测、交通状态和周围参与者运动预测头。16 个 history queries 从保存 16 帧的 FIFO memory bank 中压缩历史，再与当前 scene queries 交互。这样送入 LLM 的不是完整历史图像，而是经过任务监督筛选的场景与记忆 token。

### 从语言推理到 planning token

Vicuna-1.5 通过 LoRA 接收场景 token、历史 token 和分层问答指令，完成场景描述、历史回顾、场景分析、动作推理。最后一个专用 planning token 汇聚整段上下文，其隐藏表示作为动作生成条件。作者为 Bench2Drive 自动构建 Chat-B2D，使用 Qwen2-VL 生成交通状态、运动和历史问答；因此 planning token 学到的因果结构同时受到教师模型和模板设计影响。

### 条件 VAE 规划器

ORION 不直接把 planning token 线性回归为一条轨迹，而是分别把 planning token 与真实轨迹映射为高斯潜变量，用 KL 散度对齐，再由 GenAD 风格 GRU 解码器输出多模态轨迹。规划损失还包括 MSE、碰撞和道路边界项，且能反向更新语言侧。论文也实现了条件 diffusion 与 MLP decoder 对照，用来检验收益是否来自“任何动作头”还是来自分布式生成接口。

### 训练配置

模型只使用相机和 Bench2Drive 导航命令，不使用 HD map target point。输入图像缩放至 640×640，训练使用 32 张 80GB A800；Vicuna LoRA rank/alpha 均为 16。总损失是 QT-Former 的检测/交通/运动损失、LLM 交叉熵和生成规划器损失之和，因而它是多任务端到端训练，而不是仅用语言理由监督的规划器。

## 实验

### 数据集与协议

Bench2Drive base set 含 1000 个约 150 m 的驾驶片段，950 用于训练、50 用于开环验证；闭环为 44 类交互场景，每类 5 条路线，共 220 条短路线。指标包括 Driving Score（完成度乘违规惩罚）、Success Rate、Efficiency、Comfortness 和五类 Multi-Ability；开环报告 2 秒、2 Hz 的平均 L2 和碰撞率。所有主要动作接口消融共享传感器、视觉编码器、QT-Former、VLM 和训练策略，这是论文因果证据中较强的一部分。

### 主结果

![ORION 在 Bench2Drive 上的闭环、开环与多能力结果](/images/literature-notes/orion-autonomous-driving/key-results.png)

*图 2｜Bench2Drive 主表。ORION 的优势集中在闭环 DS/SR 和超车、紧急制动、交通标志，开环 Avg.L2 并非最优；这正说明回放轨迹误差与交互式驾驶质量不是同一指标。来源：原论文表 1。*

| 模型 | DS | SR | Avg L2 | 五类能力均值 | 证据定位 |
|---|---:|---:|---:|---:|---|
| DriveTransformer-Large | 63.46 | 35.01% | 0.62 m | 38.60% | 表 1 |
| DriveAdapter（相机+LiDAR、蒸馏） | 64.22 | 33.08% | 1.01 m | 42.08% | 表 1 |
| ORION | 77.74 | 54.62% | 0.68 m | 54.72% | 表 1 |

ORION 在超车、紧急制动、交通标志上为 71.11%、78.33%、69.15%，但 merging 25.00%、give-way 30.00%，低于部分专用基线。开环 L2 不是最优，闭环却明显领先，反过来说明单一 L2 不足以排序交互驾驶策略。

### 动作接口与生成器消融

在严格共享主干的比较中，纯文本轨迹为 42.23 DS/13.14% SR，meta-action 引导 VAD 为 44.94/15.45，planning token+MLP 为 70.73/45.12，ORION VAE 为 77.74/54.62（图 5）。这组实验支持两层结论：把坐标当文本最弱；单一 planning token 配可分布建模的生成器优于简单 MLP。

把 VAE 换成 diffusion 后为 71.97 DS/46.54% SR、0.73 m L2、0.96% 碰撞；VAE 为 77.74/54.62、0.68 m、0.47%（表 2）。但 diffusion 使用 K-means anchors 并输出 20 模态，训练稳定性和采样预算未完全对齐，结果不能推广成“VAE 普遍优于 diffusion”。

### QT-Former、记忆与多任务

基础生成式规划器为 56.33 DS/26.05% SR；加入交通状态监督变为 74.65/49.31；再加运动预测约 74.07/49.77；最后加入 memory bank 达到 77.74/54.62（表 3）。history query 从 0、8、16 增至 32 时，DS 为 65.10、68.09、74.10、62.46（表 4），过多历史反而干扰当前帧与潜空间优化。

VQA 与规划联合训练相对规划单任务把 DS/SR 从 74.10/44.66% 提升到 77.74/54.62%，同时语言指标略升（表 5）。这支持正迁移，但 Chat-B2D 与规划使用同域自动标注，尚不能证明开放世界语言知识直接改善驾驶。

## 主要发现

1. **生成式动作接口带来最大增益。** 纯文本轨迹范式只有 42.23 DS / 13.14% SR，ORION 达到 77.74 DS / 54.62% SR（论文图 5、表 3）。这支持数值规划器比“把坐标继续当词”更适合闭环动作生成。
2. **VAE 在该设置下优于 diffusion。** 条件 diffusion 为 71.97 DS / 46.54% SR，VAE 为 77.74 / 54.62%，同时 VAE 的开环 L2 更低（表 2）。该结果只说明论文实现和预算下的相对表现，不能推广为一般结论。
3. **历史与推理监督有效，但更多历史并非越好。** 加入交通状态、运动推理和 memory bank 后，闭环 DS 从基础生成式规划器的 56.33 提升到 77.74（表 3）；16 个历史 queries 最好，32 个反而退化，说明记忆压缩存在容量与噪声折中（表 4）。
4. **闭环领先仍有分场景弱点。** 论文报告 ORION 在 merging 和 give-way 场景落后于部分专用基线，作者将其联系到变道时机和因果关系歧义。

## 结论

作者认为，生成模型可以作为跨域接口，把 VLM 的推理表示与轨迹分布放进统一潜空间，并允许 VQA 与规划联合训练。QT-Former 的历史记忆进一步补足单帧语义对动态驾驶的不足。

## 局限与适用边界

### 实证边界

- 闭环实验基于 CARLA 和 Bench2Drive 220 条短路线，不能代表真实传感器噪声、城市分布或长时驾驶。
- Chat-B2D 主要由自动流程生成，问答监督可能继承教师模型偏差，并不保证文字因果解释与动作真实一致。
- 对 VAE、diffusion 与 MLP 的比较依赖实现、采样数和预算；论文没有提供统一车端硬件下的时延与能耗。
- 合流、让行等交互场景仍薄弱，说明历史聚合尚未解决长期博弈与多主体不确定性。
- 闭环结果来自同一模拟器的训练和测试分布；没有跨模拟器、真实回放或传感器故障压力测试。
- planning token 是高维条件向量，文本理由与轨迹一致的定性例子不能证明它具有可干预、可校准的语义；错误理由仍可能产生正确动作，反之亦然。
- 32 张 A800 的训练规模与未披露的端到端时延限制了“可部署性”判断。

## 我的思考

ORION 最值得借鉴的是“保留语义层，但不要强迫语义层承担连续控制”。它比外接经典规划器更紧耦合，又比文本航点更符合轨迹分布。下一步应加入显式动力学/碰撞约束、不确定性校准，并验证 planning token 是否包含可解释且因果有效的信息，而不是仅作为高维条件向量。

## 参考文献

1. Fu, H., Zhang, D., Zhao, Z., Cui, J., Liang, D., Zhang, C., Zhang, D., Xie, H., Wang, B., & Bai, X. (2025). *ORION: A Holistic End-to-End Autonomous Driving Framework by Vision-Language Instructed Action Generation*. ICCV, 24823-24834. [正式页面](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html) · [DOI](https://doi.org/10.1109/ICCV51701.2025.02302) · [代码](https://github.com/xiaomi-mlab/Orion)。
