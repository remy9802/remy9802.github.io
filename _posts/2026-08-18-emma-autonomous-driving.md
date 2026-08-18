---
title: "文献笔记｜EMMA：用统一语言空间完成端到端自动驾驶"
date: 2026-08-18
permalink: /posts/emma-autonomous-driving/
tags: [literature-note, autonomous-driving, vision-language-action, emma]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
source_reader: literature-readers/emma-autonomous-driving/paper.md
---

> **阅读范围**：阅读全文，包括正文、消融实验与附录限制。  
> **检索日期**：2026-08-18。  
> **主题**：把驾驶感知、推理与轨迹统一为语言生成，能否形成通用端到端驾驶模型？

## 文献档案

- **文献链接**：[TMLR / OpenReview 正式全文](https://openreview.net/pdf?id=kH3t5lmOU8) · [Waymo 研究页面](https://waymo.com/research/emma/) · [arXiv:2410.23262](https://arxiv.org/abs/2410.23262)
- **代码链接**：未公开；Waymo 官方页面仅提供论文与 BibTeX。
- **作者 / 机构 / 年份**：Jyh-Jing Hwang、Runsheng Xu、Hubert Lin、Wei-Chih Hung、Jingwei Ji、Kristy Choi、Di Huang、Tong He、Paul Covington、Benjamin Sapp、Yin Zhou、James Guo、Dragomir Anguelov、Mingxing Tan；Waymo LLC；2025。
- **出版状态**：Transactions on Machine Learning Research，2025 年 7 月正式发表；DOI：未分配/不可用。

## 核心结论

EMMA 证明，多相机视觉之外的导航、自车状态和驾驶输出可以统一写成文本，由一个 Gemini/PaLI 类多模态模型同时完成规划、3D 检测与道路图任务。其优势是接口统一和多任务迁移，代价则是数值轨迹被语言化后的效率、物理约束和可复现性不足。

## 检索记录

- **数据源**：OpenReview/TMLR、Waymo Research、arXiv。
- **检索式**：`EMMA end-to-end multimodal model autonomous driving trajectory chain-of-thought`。
- **纳入原因**：自动驾驶 VLA 中“全部输入输出语言化”路线的代表作，且有正式同行评审全文。
- **版本核验**：阅读 TMLR 2025 版本；arXiv v3 标注同一正式发表状态。

## 研究问题

传统端到端驾驶模型通常为规划、检测和地图建立专用输出头，任务之间依靠人工接口连接。EMMA 追问：能否把导航命令、自车历史、未来轨迹、3D 目标和道路图都转换为自然语言，使预训练多模态大模型成为驾驶系统的核心，并通过联合训练获得通用驾驶表征？

## 方法与数据

EMMA 接收环视相机的少量连续帧，将导航指令和历史自车状态序列化为文本提示，再自回归生成未来轨迹坐标、检测框或道路图元素。规划理由进一步拆成场景描述、关键目标、元决策和行为描述，从而把 CoT 与最终轨迹放在同一生成序列中。模型以 Gemini 为主要初始化，也报告 PaLI-X 对照，没有额外设计独立的 BEV、检测或规划模块。

公开实验使用 nuScenes、Waymo Open Motion Dataset 与 Waymo Open Dataset；内部实验还使用约 2400 万场景的规划集，以及千万级检测和道路图样本。nuScenes 包含 1000 个约 20 秒场景和 6 个环视相机；论文表 1 汇总了各训练集规模。评价包括未来轨迹 L2、3D 检测指标、道路图指标和内部规划质量。

## 主要发现

1. **大模型初始化和额外驾驶预训练都有效。** nuScenes 上，随机初始化、Gemini 初始化的 EMMA、内部大规模预训练后的 EMMA+，平均 L2 分别为 0.37、0.32、0.29 m（论文表 3）。这支持预训练知识有帮助，但 EMMA+ 的增益也混合了不可公开数据规模的影响。
2. **CoT 的有效部分与动作决策直接相关。** 在内部 2400 万场景上，完整 CoT 相对直接规划改善 6.7%；元决策贡献 3.0%，关键目标贡献 1.5%，单独场景描述对规划质量基本中性（表 4）。因此，生成更长描述并不自动改善驾驶。
3. **多任务联合训练存在正迁移，但规划增益不够稳健。** 同时训练规划、检测和道路图时，三项任务分别报告约 +1.4%、+5.5%、+2.4%；规划增益的标准差为 ±2.8%，区间跨过零点（表 5）。更可靠的结论是检测和地图任务受益明显，而不是所有任务都确定提升。

## 论文结论

作者认为，将驾驶任务统一为视觉问答和文本生成，可以充分利用多模态大模型的世界知识、推理和扩展能力，并通过跨任务训练形成通用驾驶模型。论文把 EMMA 定位为研究原型，而非可直接替代完整自动驾驶栈的系统。

## 局限与适用边界

- 作者明确指出模型一次只能处理少量图像帧，不使用 LiDAR 或雷达，且计算成本较高。
- 轨迹坐标作为文本逐 token 生成，既慢于并行动作头，也没有显式动力学和碰撞约束；语言理由与最终动作之间不存在形式化一致性保证。
- 关键 CoT 与数据扩展结果来自内部数据，外部研究者无法复现数据分布、标注或评价。
- nuScenes 是开环模仿评价；低 L2 不代表交互式闭环安全，也可能受到历史自车状态捷径影响。
- 模型、训练代码和权重未公开，论文主要证明概念可行性，不能完成严格可复现性审计。

## 我的思考

EMMA 的价值更像“接口极简化实验”：它把每个驾驶任务都翻译成语言，从而测试通用 MLLM 能走多远。后续 ORION、AutoVLA 和 Reasoning-VLA 都在修补它暴露的动作接口问题——保留语言推理，却把轨迹交给生成式规划器、物理 token 或连续 action queries。对实际系统而言，EMMA 更适合作为低频语义决策器或多任务教师，而不是高频控制器。

## 参考文献

1. Hwang, J.-J., Xu, R., Lin, H., Hung, W.-C., Ji, J., Choi, K., Huang, D., He, T., Covington, P., Sapp, B., Zhou, Y., Guo, J., Anguelov, D., & Tan, M. (2025). *EMMA: End-to-End Multimodal Model for Autonomous Driving*. Transactions on Machine Learning Research. [正式全文](https://openreview.net/pdf?id=kH3t5lmOU8) · [arXiv](https://arxiv.org/abs/2410.23262) · DOI：未分配/不可用。
