---
title: "文献笔记｜ORION：用生成式规划器连接语言推理与驾驶动作"
date: 2026-08-18
permalink: /posts/orion-autonomous-driving/
tags: [literature-note, autonomous-driving, vision-language-action, orion]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
source_reader: literature-readers/orion-autonomous-driving/paper.md
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

## 研究问题

VLM 能解释交通状态，但驾驶需要连续、多解且可执行的轨迹。纯文本坐标解码受数值精度和自回归延迟限制；把 VLM 只当高层决策器又切断了轨迹损失对语言推理的反馈。ORION 试图建立一个可端到端训练的桥梁，让语义、历史和动作共同优化。

## 方法与数据

模型包含三个部分：QT-Former 聚合当前视觉特征和历史查询记忆；LLM 同时回答 VQA 并输出 planning token；条件 VAE 以 planning token 为条件，从轨迹潜变量生成多模态候选轨迹。轨迹损失可以通过生成式规划器回传至 VLM，从而避免语言模块与经典规划器完全割裂。

作者还构建 Chat-B2D，用自动生成的问答监督交通状态、目标运动、因果关系和驾驶决策。主要实验基于 Bench2Drive：包含开环指标、视觉问答能力和 CARLA 闭环的 220 条短路线，闭环报告 Driving Score、Success Rate、效率与舒适性等指标。

## 主要发现

1. **生成式动作接口带来最大增益。** 纯文本轨迹范式只有 42.23 DS / 13.14% SR，ORION 达到 77.74 DS / 54.62% SR（论文图 5、表 3）。这支持数值规划器比“把坐标继续当词”更适合闭环动作生成。
2. **VAE 在该设置下优于 diffusion。** 条件 diffusion 为 71.97 DS / 46.54% SR，VAE 为 77.74 / 54.62%，同时 VAE 的开环 L2 更低（表 2）。该结果只说明论文实现和预算下的相对表现，不能推广为一般结论。
3. **历史与推理监督有效，但更多历史并非越好。** 加入交通状态、运动推理和 memory bank 后，闭环 DS 从基础生成式规划器的 56.33 提升到 77.74（表 3）；16 个历史 queries 最好，32 个反而退化，说明记忆压缩存在容量与噪声折中（表 4）。
4. **闭环领先仍有分场景弱点。** 论文报告 ORION 在 merging 和 give-way 场景落后于部分专用基线，作者将其联系到变道时机和因果关系歧义。

## 论文结论

作者认为，生成模型可以作为跨域接口，把 VLM 的推理表示与轨迹分布放进统一潜空间，并允许 VQA 与规划联合训练。QT-Former 的历史记忆进一步补足单帧语义对动态驾驶的不足。

## 局限与适用边界

- 闭环实验基于 CARLA 和 Bench2Drive 220 条短路线，不能代表真实传感器噪声、城市分布或长时驾驶。
- Chat-B2D 主要由自动流程生成，问答监督可能继承教师模型偏差，并不保证文字因果解释与动作真实一致。
- 对 VAE、diffusion 与 MLP 的比较依赖实现、采样数和预算；论文没有提供统一车端硬件下的时延与能耗。
- 合流、让行等交互场景仍薄弱，说明历史聚合尚未解决长期博弈与多主体不确定性。

## 我的思考

ORION 最值得借鉴的是“保留语义层，但不要强迫语义层承担连续控制”。它比外接经典规划器更紧耦合，又比文本航点更符合轨迹分布。下一步应加入显式动力学/碰撞约束、不确定性校准，并验证 planning token 是否包含可解释且因果有效的信息，而不是仅作为高维条件向量。

## 参考文献

1. Fu, H., Zhang, D., Zhao, Z., Cui, J., Liang, D., Zhang, C., Zhang, D., Xie, H., Wang, B., & Bai, X. (2025). *ORION: A Holistic End-to-End Autonomous Driving Framework by Vision-Language Instructed Action Generation*. ICCV, 24823-24834. [正式页面](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html) · [DOI](https://doi.org/10.1109/ICCV51701.2025.02302) · [代码](https://github.com/xiaomi-mlab/Orion)。
