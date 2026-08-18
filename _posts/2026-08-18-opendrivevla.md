---
title: "文献笔记｜OpenDriveVLA：用结构化 3D token 约束语言动作"
date: 2026-08-18
permalink: /posts/opendrivevla/
tags: [literature-note, autonomous-driving, vision-language-action, opendrivevla]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
---

> **阅读范围**：阅读全文，包括 nuScenes 规划、VQA 与分阶段训练消融。  
> **检索日期**：2026-08-18。  
> **主题**：如何让开放 VLM 获得动态驾驶所需的三维空间接地和行为交互能力？

## 文献档案

- **文献链接**：[AAAI 2026 正式页面](https://ojs.aaai.org/index.php/AAAI/article/view/38386) · [arXiv:2503.23463](https://arxiv.org/abs/2503.23463) · [项目页](https://drivevla.github.io/)
- **代码链接**：[DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA)；仓库已发布 0.5B checkpoint 和模型/推理代码，但 README 仍把完整训练脚本列为后续发布项。
- **作者 / 机构 / 年份**：Xingcheng Zhou、Xuyuan Han、Feng Yang、Yunpu Ma、Volker Tresp、Alois Knoll；Technical University of Munich、Ludwig Maximilian University of Munich；2026。
- **出版状态**：AAAI 2026，40(16)，13782-13790；[DOI:10.1609/aaai.v40i16.38386](https://doi.org/10.1609/aaai.v40i16.38386)。

## 核心结论

OpenDriveVLA 表明，把 BEV 感知压缩为 scene、agent、map 三类实例感知 token，并分阶段对齐到语言空间，可以显著降低开环碰撞率；0.5B 模型已接近或超过更大版本。不过它依赖监督式 3D 感知和自车状态，只在 nuScenes 开环验证，不能据此推断真实闭环安全。

## 检索记录

- **数据源**：AAAI Proceedings、arXiv、项目页、官方 GitHub。
- **检索式**：`OpenDriveVLA structured 3D tokens hierarchical alignment nuScenes planning`。
- **纳入原因**：代表“结构化 3D 环境 token + 自回归语言航点”的开放 VLA 路线。
- **版本核验**：以 AAAI-26 正式版本为主；GitHub 记录显示模型/推理代码和 0.5B checkpoint 已发布，训练脚本仍列在后续计划中。

## 研究背景

驾驶 VLM 若只接收二维图像 token，往往能说出“画面中有什么”，却很难稳定回答对象位于车体坐标系何处、道路边界如何延伸，以及某条语言指令怎样改变轨迹。传统 BEV 感知模型拥有三维几何与实例级监督，但输出空间和语言模型不兼容。此前方法要么把感知结果转成冗长文本，要么把 VLM 与规划器松散串联，都会损失空间细节或端到端训练能力。

OpenDriveVLA 的出发点是把成熟的三维驾驶感知模块变成一组有语义分工的视觉 token：场景、动态参与者和静态地图分别编码，再逐步对齐到语言空间。它关注的不只是“能否生成轨迹”，还关注指令修改是否真的会改变动作，以及较小开源语言模型能否完成这一任务。

## 研究问题

通用 VLM 主要从静态二维图文中训练，缺少驾驶场景中的实例身份、三维位置和多主体互动知识。论文关注怎样把这些结构化视觉先验对齐到 LLM，并在不要求推理时输出长 CoT 的情况下生成空间接地轨迹。

## 方法与数据

![OpenDriveVLA 结构化环境 token 与训练流程](/images/literature-notes/opendrivevla/method-overview.png)

*图 1｜OpenDriveVLA 信息流。BEV 编码器产生二维/三维特征，三个查询模块分别提取 scene、agent、map token，经投影器注入 VLM；模型结合自车状态和驾驶命令自回归生成航点。右侧标出各阶段解冻的组件。来源：原论文图 2。*

推理时，视觉分支先在车体坐标系中形成 BEV 表征；EnvQFormer 将大尺寸特征压缩为固定数量的结构化 token；三类 projector 把视觉维度映射到 LLM embedding；文本序列同时加入 system、ego、command 与 question token；最后 LLM 以文本化数值航点输出 3 秒轨迹。训练采用逐层解冻，是为了先稳定几何语义，再让语言模型学习命令与动作，避免从随机跨模态接口直接端到端优化。

### 结构化视觉环境表示

多相机图像先经 ResNet-101 提取多尺度 2D 特征，再提升到 200×200 的 BEV 特征图。三个查询模块分别形成：全局 `scene token`，描述各相机的整体场景；`agent tokens`，对应检测和跟踪到的动态参与者；`map token`，编码车道边界、可行驶区等静态结构。视觉编码器先在 3D 检测、跟踪和地图分割上做监督式多任务预训练，所以后续所谓“3D 空间推理”建立在显式 BEV/实例监督上。

### 四阶段训练

1. **层级视觉-语言对齐（Stage 1）**：分别用三个两层 MLP projector 把 scene/agent/map token 映射到语言空间。scene/map 对齐场景级 caption，agent 对齐外观和 3D 位置描述；视觉编码器与 LLM 冻结，只训练 projector。
2. **驾驶指令微调（Stage 2）**：全量微调 Qwen2.5-Instruct 0.5B/3B/7B 和 projector，以驾驶问答注入感知、运动预测、注意分配、动作推理和高层决策知识；该阶段训练模型内化理由，但部署规划时不要求生成长 CoT。
3. **Agent-Env-Ego 交互（Stage 2.5）**：给定结构化环境 token 和自车状态，让 LLM 自回归预测每个 agent 的 3 秒未来轨迹，作为空间和交互先验。
4. **自车轨迹微调（Stage 3）**：输入视觉 token、自车状态、历史轨迹和驾驶命令，按文本 token 生成未来 3 秒、每 0.5 秒一个的 6 个 `(x,y)` 航点。

训练使用 4 张 H100、batch size 1，约两天完成；Stage 3 冻结 2D backbone，LLM 全参数微调，推理温度为 0。该配置表明小模型的成本不只来自 LLM，还包含先行的 BEV 感知网络。

### 数据

规划训练和评价基于 nuScenes；agent caption 来自现有 2D 物体描述数据并补充 3D 空间位置。驾驶语言评价使用 nu-Caption、nuScenes-QA 和 Nu-X。论文没有像大型预训练报告那样给出所有阶段的唯一总样本量，因此不能把改进简单归结为数据或架构之一。

## 实验

### 评价协议

开环规划同时采用 ST-P3 与 UniAD 两套实现，均报告 1/2/3 秒 L2 和离线碰撞率，但两套指标的坐标和碰撞计算不同，不能混用。语言任务使用 BLEU、BERTScore、CIDEr、METEOR、ROUGE-L 或分类准确率。消融统一使用 0.5B 版本，分别移除视觉、自车状态、历史、命令或训练阶段。

### 开环规划结果

![OpenDriveVLA 开环规划主结果](/images/literature-notes/opendrivevla/key-results.png)

*图 2｜nuScenes 上两套评价实现的开环结果。0.5B/3B/7B 版本各有优势，但不同基线的传感器、语言模型和评价实现并不统一；粗体表示列内最优，不等于统一条件下的总体排名。来源：原论文表 1。*

| 模型 | ST-P3：Avg L2 / 碰撞 | UniAD：Avg L2 / 碰撞 | 论文表 |
|---|---:|---:|---|
| OpenDriveVLA-0.5B | 0.35 m / 0.09% | 0.68 m / 0.26% | 表 1 |
| OpenDriveVLA-3B | 0.33 m / 0.10% | 0.68 m / 0.27% | 表 1 |
| OpenDriveVLA-7B | 0.33 m / 0.10% | 0.66 m / 0.27% | 表 1 |
| RDA-Driver | 0.40 m / 0.10% | 0.80 m / 0.32% | 表 1 |

3B/7B 的 L2 略好，但 0.5B 的碰撞率不差，说明在这个短时开环任务上 LLM 尺寸不是主导因素。更重要的是，所有版本都使用相同的结构化 3D 前端，模型大小对比不能代表“纯 0.5B VLM”与大模型的差别。

### 语言理解与指令跟随

在 nu-Caption 上，0.5B/3B/7B 的 BLEU-4 为 25.2/26.1/27.6，BERTScore 为 91.9/92.0/92.2；nuScenes-QA 总准确率为 58.4/58.5/58.2（表 2），规模提升并不单调。Nu-X 上 0.5B 的 CIDEr 32.3，反而高于 3B 的 25.5 和 7B 的 26.2（表 3）。图 4 还显示修改高层命令可改变转弯轨迹，但这是定性案例，不足以估计指令冲突或恶意命令下的可靠性。

### 输入与训练阶段消融

完整输入在 UniAD 协议为 0.68 m/0.26%。移除视觉但保留自车、历史和命令时仍有 0.77 m/0.29%，说明自车历史能形成强基线；移除自车状态则恶化为 1.34 m/0.77%，移除命令为 0.80 m/0.33%（表 4）。因此模型成绩同时依赖视觉、ego bias 和路线条件。

仅做 Stage 3 时 UniAD/ST-P3 碰撞率为 0.37%/0.13%；依次加入 Stage 1、2、2.5 后变为 0.32/0.12、0.31/0.11、0.26/0.09（表 5）。各阶段对 L2 的改善较小，主要收益体现在离线碰撞率。

## 主要发现

1. **结构化先验使小模型也有竞争力。** 0.5B 版本在 ST-P3 协议下平均 L2 为 0.35 m、碰撞率 0.09%；3B/7B 的 L2 为 0.33 m，但碰撞率都是 0.10%。UniAD 协议下 0.5B 为 0.68 m / 0.26%（论文表 1）。规模并未带来单调收益。
2. **完整分阶段训练主要改善碰撞。** 0.5B 仅做末端规划微调时，UniAD/ST-P3 碰撞率为 0.37%/0.13%；加入层级对齐与交互预测后降到 0.26%/0.09%，L2 从 0.70/0.36 变为 0.68/0.35（表 5）。
3. **输入消融暴露自车状态捷径。** 表 4 显示视觉信息至关重要，但自车状态、历史轨迹和命令也强烈影响开环指标。好成绩不能全部归因于视觉场景理解。
4. **语言任务与规划共享表示。** 模型在 nu-Caption、nuScenes-QA 与 Nu-X 上报告有竞争力的结果，但这些任务和规划使用同一数据域，不足以证明开放世界迁移。

## 结论

作者认为，层级 2D/3D 对齐和 agent-environment-ego 交互建模能让开放 VLM 内化空间与行为关系，从而在统一自回归框架中完成驾驶问答和轨迹生成。

## 局限与适用边界

### 论文没有充分解决的问题

- 只在 nuScenes 开环验证规划，没有 CARLA 或真实车辆闭环；L2 与离线碰撞率不能代表干预后的安全性。
- 3D token 来自有监督的检测、跟踪和地图分割模块，几何能力不是从原始视频与语言中自然涌现。
- 模型使用自车状态、历史轨迹与高层命令，存在 ego-status bias；论文消融也显示这些输入对结果影响很大。
- 轨迹仍是文本化航点并自回归生成，存在时延和误差传播；没有显式动力学可行性层。
- 当前仓库公开程度不完全：0.5B checkpoint 与推理代码已经可见，但 README 仍把完整训练脚本列为待办，难以从原始数据重现四阶段训练。
- 三种 LLM 规模共享强监督 BEV 前端，论文没有报告去掉 3D 专家监督、只依赖原始视觉预训练时的对照，因而无法量化 VLM 自身获得了多少空间能力。
- 指令跟随只通过少量定性轨迹展示，没有系统测试命令与道路几何冲突、错误导航或安全规则优先级。

## 我的思考

OpenDriveVLA 说明，自动驾驶 VLA 的关键不只是更强的自然语言推理，而是为语言模型提供“正确抽象层”的空间 token。它的下一步应把这些 token 从离线 3D 监督扩展到时序自监督，并在闭环中区分真正的环境理解与自车状态外推。

## 参考文献

1. Zhou, X., Han, X., Yang, F., Ma, Y., Tresp, V., & Knoll, A. (2026). *OpenDriveVLA: Towards End-to-end Autonomous Driving with Large Vision Language Action Model*. AAAI, 40(16), 13782-13790. [正式页面](https://ojs.aaai.org/index.php/AAAI/article/view/38386) · [DOI](https://doi.org/10.1609/aaai.v40i16.38386) · [代码](https://github.com/DriveVLA/OpenDriveVLA)。
