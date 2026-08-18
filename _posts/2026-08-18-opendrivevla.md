---
title: "文献笔记｜OpenDriveVLA：用结构化 3D token 约束语言动作"
date: 2026-08-18
permalink: /posts/opendrivevla/
tags: [literature-note, autonomous-driving, vision-language-action, opendrivevla]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
source_reader: literature-readers/opendrivevla/paper.md
---

> **阅读范围**：阅读全文，包括 nuScenes 规划、VQA 与分阶段训练消融。  
> **检索日期**：2026-08-18。  
> **主题**：如何让开放 VLM 获得动态驾驶所需的三维空间接地和行为交互能力？

## 文献档案

- **文献链接**：[AAAI 2026 正式页面](https://ojs.aaai.org/index.php/AAAI/article/view/38386) · [arXiv:2503.23463](https://arxiv.org/abs/2503.23463) · [项目页](https://drivevla.github.io/)
- **代码链接**：[DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA)
- **作者 / 机构 / 年份**：Xingcheng Zhou、Xuyuan Han、Feng Yang、Yunpu Ma、Volker Tresp、Alois Knoll；Technical University of Munich、Ludwig Maximilian University of Munich；2026。
- **出版状态**：AAAI 2026，40(16)，13782-13790；[DOI:10.1609/aaai.v40i16.38386](https://doi.org/10.1609/aaai.v40i16.38386)。

## 核心结论

OpenDriveVLA 表明，把 BEV 感知压缩为 scene、agent、map 三类实例感知 token，并分阶段对齐到语言空间，可以显著降低开环碰撞率；0.5B 模型已接近或超过更大版本。不过它依赖监督式 3D 感知和自车状态，只在 nuScenes 开环验证，不能据此推断真实闭环安全。

## 检索记录

- **数据源**：AAAI Proceedings、arXiv、项目页、官方 GitHub。
- **检索式**：`OpenDriveVLA structured 3D tokens hierarchical alignment nuScenes planning`。
- **纳入原因**：代表“结构化 3D 环境 token + 自回归语言航点”的开放 VLA 路线。
- **版本核验**：以 AAAI-26 正式版本为主；GitHub 记录显示模型/推理代码和 0.5B checkpoint 已发布，训练脚本仍列在后续计划中。

## 研究问题

通用 VLM 主要从静态二维图文中训练，缺少驾驶场景中的实例身份、三维位置和多主体互动知识。论文关注怎样把这些结构化视觉先验对齐到 LLM，并在不要求推理时输出长 CoT 的情况下生成空间接地轨迹。

## 方法与数据

OpenDriveVLA 使用 ResNet-101 和 BEV 感知模块提取多相机特征，再形成全局 scene token、动态 agent token 与静态 map token；三类 token 经层级视觉-语言对齐进入 Qwen2.5-Instruct 0.5B、3B 或 7B。训练分为 3D 感知预训练、层级对齐、驾驶指令微调、agent-environment-ego 交互预测和轨迹微调。

动作仍按文本 token 自回归生成：每 0.5 秒一个未来航点，预测 3 秒、共 6 点。数据与评价以 nuScenes 为主，同时使用 nu-Caption、nuScenes-QA 和 Nu-X 测试驾驶语言理解；开环规划同时报告 ST-P3 与 UniAD 两套 L2/碰撞协议。

## 主要发现

1. **结构化先验使小模型也有竞争力。** 0.5B 版本在 ST-P3 协议下平均 L2 为 0.35 m、碰撞率 0.09%；3B/7B 的 L2 为 0.33 m，但碰撞率都是 0.10%。UniAD 协议下 0.5B 为 0.68 m / 0.26%（论文表 1）。规模并未带来单调收益。
2. **完整分阶段训练主要改善碰撞。** 0.5B 仅做末端规划微调时，UniAD/ST-P3 碰撞率为 0.37%/0.13%；加入层级对齐与交互预测后降到 0.26%/0.09%，L2 从 0.70/0.36 变为 0.68/0.35（表 5）。
3. **输入消融暴露自车状态捷径。** 表 4 显示视觉信息至关重要，但自车状态、历史轨迹和命令也强烈影响开环指标。好成绩不能全部归因于视觉场景理解。
4. **语言任务与规划共享表示。** 模型在 nu-Caption、nuScenes-QA 与 Nu-X 上报告有竞争力的结果，但这些任务和规划使用同一数据域，不足以证明开放世界迁移。

## 论文结论

作者认为，层级 2D/3D 对齐和 agent-environment-ego 交互建模能让开放 VLM 内化空间与行为关系，从而在统一自回归框架中完成驾驶问答和轨迹生成。

## 局限与适用边界

- 只在 nuScenes 开环验证规划，没有 CARLA 或真实车辆闭环；L2 与离线碰撞率不能代表干预后的安全性。
- 3D token 来自有监督的检测、跟踪和地图分割模块，几何能力不是从原始视频与语言中自然涌现。
- 模型使用自车状态、历史轨迹与高层命令，存在 ego-status bias；论文消融也显示这些输入对结果影响很大。
- 轨迹仍是文本化航点并自回归生成，存在时延和误差传播；没有显式动力学可行性层。
- 当前仓库公开程度不完全：可见模型/推理相关内容，但 README 仍把完整训练脚本和 checkpoint 列为待办。

## 我的思考

OpenDriveVLA 说明，自动驾驶 VLA 的关键不只是更强的自然语言推理，而是为语言模型提供“正确抽象层”的空间 token。它的下一步应把这些 token 从离线 3D 监督扩展到时序自监督，并在闭环中区分真正的环境理解与自车状态外推。

## 参考文献

1. Zhou, X., Han, X., Yang, F., Ma, Y., Tresp, V., & Knoll, A. (2026). *OpenDriveVLA: Towards End-to-end Autonomous Driving with Large Vision Language Action Model*. AAAI, 40(16), 13782-13790. [正式页面](https://ojs.aaai.org/index.php/AAAI/article/view/38386) · [DOI](https://doi.org/10.1609/aaai.v40i16.38386) · [代码](https://github.com/DriveVLA/OpenDriveVLA)。
