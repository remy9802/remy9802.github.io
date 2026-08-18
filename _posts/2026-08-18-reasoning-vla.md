---
title: "文献笔记｜Reasoning-VLA：空间引导的并行连续动作生成"
date: 2026-08-18
permalink: /posts/reasoning-vla/
tags: [literature-note, autonomous-driving, vision-language-action, reasoning-vla]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
source_reader: literature-readers/reasoning-vla/paper.md
---

> **阅读范围**：阅读全文，包括统一数据集、动作查询、RL、迁移与 NeuroNCAP 结果。  
> **检索日期**：2026-08-18。  
> **主题**：如何绕过自回归动作解码，同时提升自动驾驶 VLA 的跨数据集泛化与动作速度？

## 文献档案

- **文献链接**：[ICML 2026 版本全文](https://openreview.net/pdf/2958fe5249a1a673a414d689de7784b306b2a02a.pdf) · [arXiv:2511.19912](https://arxiv.org/abs/2511.19912)
- **代码链接**：[xipi702/Reasoning-VLA](https://github.com/xipi702/Reasoning-VLA)
- **作者 / 机构 / 年份**：Dapeng Zhang、Zhenlong Yuan、Zhangquan Chen、Chih-Ting Liao、Yinda Chen、Fei Shen、Qingguo Zhou、Tat-Seng Chua；Lanzhou University、National University of Singapore、University of Science and Technology of China、Tsinghua University、University of New South Wales；2026。
- **出版状态**：ICML 2026 正式版本题名为 *Reasoning-VLA: An Efficient and Spatial-Guided General Vision-Language-Action Reasoning Model for Autonomous Driving*；arXiv 初版题名略有不同；DOI：未分配/不可用。

## 核心结论

Reasoning-VLA 用空间先验初始化的 learnable action queries 并行回归连续轨迹，把 10 条轨迹生成从自回归基线的 5.472 秒降至 0.089 秒。统一八数据集训练改善了开环和部分零样本指标，但 NeuroNCAP 碰撞率仍接近 60%，清楚显示开环 L2 很低不等于闭环安全。

## 检索记录

- **数据源**：ICML/OpenReview 正式全文、arXiv、官方 GitHub。
- **检索式**：`Reasoning-VLA action queries parallel trajectory unified driving datasets NeuroNCAP`。
- **纳入原因**：代表“VLM 负责推理、action queries 并行生成连续动作”的高速 VLA 路线，并同时提供跨数据集与安全关键闭环证据。
- **版本核验**：正文实验来自本地保存的完整论文；正式标题与 arXiv v1 标题差异已在档案中说明。

## 研究问题

自回归动作 token 与 diffusion 往往需要多个解码步骤，难以满足高频控制；单一数据集训练又容易绑定某种相机、车辆或城市分布。论文尝试同时解决动作生成效率和跨平台泛化，并研究 SFT 后的动力学奖励 RL 是否进一步有效。

## 方法与数据

模型以 Qwen2.5-VL-3B/7B 为视觉语言骨干。作者从训练轨迹的高斯分布初始化一组可学习 action queries，让 queries 与 VLM 隐状态交叉注意，一次并行回归多个连续轨迹点，再由 Action Refinement Module 修正。训练先进行 4 个 epoch SFT，再进行 1 个 epoch RL；奖励考虑轨迹误差、转向和加速度等动力学量。

数据侧把 NAVSIM、nuScenes、Waymo、Argoverse 2、KITTI、Mapillary、ONCE 和 IDD 统一成超过 7.5 万条 CoT 驾驶片段。CoT 先由强 VLM 生成，再经规则过滤和人工复核。评价包括八数据集开环 L2、nuScenes 碰撞率、NAVSIM PDMS、NeuroNCAP 闭环和零样本划分。

## 主要发现

1. **并行动作头显著降低生成时延。** H200 + vLLM 上，自回归 Qwen2.5-VL-7B 生成 10 条轨迹需 5.472 s，Reasoning-VLA-7B 只需 0.089 s，论文称约 61 倍加速（表 9）。
2. **nuScenes 开环结果很强。** 通用 7B 模型平均 L2 0.23 m、平均碰撞率 0.08%；再用 nuScenes 子集 RL 的 7B+ 为 0.22 m / 0.07%（表 1）。
3. **开环与闭环安全明显脱节。** NeuroNCAP 中通用 7B 和 7B+ 的平均碰撞率分别为 59.4% 与 59.8%（表 2）。针对 nuScenes 的额外 RL 并未改善总体安全关键闭环结果。
4. **RL 的平均收益掩盖子集退化。** 八数据集统一平均 L2 从 SFT 的 0.24 m 降到 SFT+RL 的 0.23 m，但 Waymo、Mapillary 和 IDD 略有变差（表 3）。
5. **统一训练通常优于单域训练。** 7B 在统一数据训练后，nuScenes 开环由单域训练的 0.25 m / 0.10% 变为 0.23 m / 0.08%，NeuroNCAP 平均分也提高；这支持数据多样性，但仍混合了样本数和分布覆盖的影响（表 7、8）。

## 论文结论

作者认为，空间引导 action queries 能在保留 VLM 推理表示的同时实现一步并行连续动作生成；统一多数据集和 SFT+RL 则提高一般化能力，形成更接近驾驶基础模型的训练范式。

## 局限与适用边界

- 0.089 秒在 H200 + vLLM 上测得，不代表量产车端延迟，也未包含完整感知和安全栈开销。
- NeuroNCAP 碰撞率仍约 60%，说明强开环指标不足以支持“安全驾驶”结论。
- CoT 主要由外部 VLM 合成，人工复核无法完全消除教师偏差或理由-动作不一致。
- 八数据集统一训练在相机配置、坐标系和标签质量上仍不等价；部分改善可能来自更多数据，而非 action query 本身。
- 当前官方代码仓库规模较小，训练资产和完整复现程度仍需单独审计。

## 我的思考

Reasoning-VLA 最重要的结果不是刷新 L2，而是把“高速开环预测”与“高闭环碰撞”并列呈现。它提醒我们，未来 VLA 论文应把 action head 延迟、闭环安全、不确定性和紧急回退放在同一评价表中；否则并行解码只会更快地产生未经安全约束的轨迹。

## 参考文献

1. Zhang, D., Yuan, Z., Chen, Z., Liao, C.-T., Chen, Y., Shen, F., Zhou, Q., & Chua, T.-S. (2026). *Reasoning-VLA: An Efficient and Spatial-Guided General Vision-Language-Action Reasoning Model for Autonomous Driving*. ICML 2026. [正式全文](https://openreview.net/pdf/2958fe5249a1a673a414d689de7784b306b2a02a.pdf) · [代码](https://github.com/xipi702/Reasoning-VLA) · DOI：未分配/不可用。
