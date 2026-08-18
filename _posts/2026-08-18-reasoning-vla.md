---
title: "文献笔记｜Reasoning-VLA：空间引导的并行连续动作生成"
date: 2026-08-18
permalink: /posts/reasoning-vla/
tags: [literature-note, autonomous-driving, vision-language-action, reasoning-vla]
note_type: single-paper
literature_topics: [autonomous-driving, vla]
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

## 研究背景

自回归 VLA 把每个未来动作离散为 token，可以沿用语言模型训练方式，却必须逐 token 生成整条轨迹；diffusion 规划器也需要多步去噪。二者在大模型上都容易把动作延迟推到秒级。连续回归头更快，但若只接最后一个隐藏状态，可能没有充分利用视觉语言模型形成的多层推理表示。

同时，自动驾驶数据集在相机布置、坐标系、城市、车辆和任务定义上高度碎片化。单域上很低的 L2 往往依赖固定传感器与运动先验，换域或进入闭环危险场景后不一定成立。Reasoning-VLA 因此把“并行动作接口”和“统一多域训练”放在同一研究框架中，并额外用 NeuroNCAP 检查开环—闭环落差。

## 研究问题

自回归动作 token 与 diffusion 往往需要多个解码步骤，难以满足高频控制；单一数据集训练又容易绑定某种相机、车辆或城市分布。论文尝试同时解决动作生成效率和跨平台泛化，并研究 SFT 后的动力学奖励 RL 是否进一步有效。

## 方法与数据

![Reasoning-VLA 并行动作查询和两阶段训练](/images/literature-notes/reasoning-vla/method-overview.png)

*图 1｜Reasoning-VLA 结构。上半部分显示 action queries 与 VLM 隐状态交互后一步并行回归轨迹；下半部分显示先以统一 CoT 数据做 SFT，再用轨迹、转向和加速度规则奖励做 RL。来源：原论文图 1。*

端到端信息流是：图像与问题先经过 VLM 得到整段表征缓存；按未来时刻排列的 action queries 在自身之间建模时间依赖，再 cross-attend 视觉语言表征；ARM 对每个时间位置细化并回归二维坐标。训练时语言 token 仍受自回归交叉熵约束，动作分支则使用连续回归与 RL 奖励，两种梯度共同塑造共享视觉语言表征。

### 推理骨干与并行动作查询

视觉语言骨干为 Qwen2.5-VL-3B/7B，负责把三相机图像、过去 3 秒自车状态和指令组织为推理表示。动作模块维护形状为 `T×N×D` 的 learnable action queries：`T` 是未来时间步，`N` 是坐标维度，`D` 与 VLM 隐藏维相同。queries 先做双向 self-attention，再跨注意 VLM KV cache，因此所有未来动作能在一次 forward 中并行生成，而不是受语言模型 causal mask 约束逐 token 解码。

### 高斯先验初始化与连续动作

作者先统计每个未来时刻 `(x,y)` 的训练集均值和方差，再从相应高斯分布采样扩展到 query 隐藏维，作为可学习参数初值。这不是运行时从多个轨迹分布采样，而是训练初始化。query 隐状态经 Action Refinement Module 的 attention+MLP 连续回归轨迹，不需要离散动作词表；其优点是保留细粒度数值，风险是没有 token 级概率可直接解释不确定性。

### SFT、RL 与奖励

SFT 用统一 CoT 数据建立从视觉理由到动作的映射；随后用 GRPO 做 RL。轨迹奖励不是普通平均 MSE，而是对未来步折扣并分别加权纵/横坐标误差。动力学奖励把转向变化约束在论文设定阈值内、把加速度限制在约 0.6g，并奖励平滑变化。总奖励为轨迹、转向、加速度三项加权和。论文训练为 4 个 epoch SFT 加 1 个 epoch RL，但没有像成熟机器人控制工作那样把所有奖励权重与敏感性完整展开。

### 统一数据集

作者把 NAVSIM、nuScenes、Waymo、Argoverse 2、KITTI、Mapillary、ONCE、IDD 的坐标系、相机和动作格式统一，形成超过 7.5 万条理由驾驶片段。理由由强 VLM 生成，经规则校验后由人工结合视频和轨迹复核。数据覆盖多城市、车辆和相机配置，是跨域实验的基础；同时，统一过程可能抹平原始数据频率和标注语义差异。

## 实验

### 评价设计

实验包含五层证据：nuScenes 开环 L2/碰撞；八数据集逐域 L2；把四域留出后的 zero-shot；NAVSIM PDMS；NeuroNCAP 安全关键闭环。最后在同一 H200+vLLM 环境比较自回归 Qwen2.5-VL 与 action queries 的完整动作生成时间。`Reasoning-VLA-7B` 是统一数据 SFT+RL 通用模型，`7B+` 又在 nuScenes 片段上额外 RL，二者不能混称同一模型。

### 开环与 NAVSIM

![Reasoning-VLA 在 nuScenes 上的开环结果](/images/literature-notes/reasoning-vla/key-results.png)

*图 2｜nuScenes 主结果。通用 7B 的平均 L2/碰撞率为 0.23 m/0.08%，额外单域 RL 的 7B+ 为 0.22/0.07%；两者差距很小，且不能替代后文 NeuroNCAP 的闭环安全结果。来源：原论文表 1。*

nuScenes 上 3B、7B、7B+ 的平均 L2/碰撞为 0.30 m/0.13%、0.23/0.08%、0.22/0.07%（表 1）。NAVSIM 上 7B 的 PDMS 91.7，高于论文列出的 Para-Drive 84.0，主要增益来自 TTC 98.1 对 93.0 和 progress 80.7 对 79.3（表 6）。这些指标评价候选轨迹与回放场景的兼容性，仍不是在线执行后的风险。

### 闭环安全

NeuroNCAP 包含 stationary、frontal、side 三类碰撞场景。统一数据训练的 7B 平均 Score 2.25、碰撞率 59.4%；仅 nuScenes 训练的 7B 为 2.12/61.3%（表 8）。统一训练确有改善，但绝对碰撞率依然很高。额外 nuScenes RL 的 7B+ 在正文表 2 平均碰撞率约 59.8%，未优于通用 7B，表明针对开环奖励的微调没有自然转化为安全收益。

### 组件消融

直接让 Qwen2.5-VL-7B 回归轨迹的平均 L2 为 1.45 m。不可学习 queries 的 SFT/SFT+RL 为 0.32/0.30；移除高斯初始化为 0.29/0.27；移除 ARM 为 0.29/0.29；完整模型为 0.26/0.23（表 4）。可学习 query 是主要增益来源，初始化和 ARM 提供较小但可测的改善；RL 平均改善 0.03 m，但并非所有子数据集都受益。

### 泛化与效率

四域训练、四域 zero-shot 时，SFT+RL 在 nuScenes、Argoverse 2、Mapillary、IDD 的平均 L2 为 0.28、0.26、0.55、0.46 m，整体 0.29 m（表 5）。这证明存在跨域迁移，但训练域和留出域仍共享道路图像与专家轨迹的强先验。

H200+vLLM 上，自回归 Qwen2.5-VL-7B 生成 6/10 条轨迹需 5.396/5.472 秒；Reasoning-VLA 为 0.081/0.089 秒，且理论动作步骤为 1（表 9）。约 61 倍是“动作生成子过程”的加速，不包括相机采集、预处理、安全检查或控制执行。

## 主要发现

1. **并行动作头显著降低生成时延。** H200 + vLLM 上，自回归 Qwen2.5-VL-7B 生成 10 条轨迹需 5.472 s，Reasoning-VLA-7B 只需 0.089 s，论文称约 61 倍加速（表 9）。
2. **nuScenes 开环结果很强。** 通用 7B 模型平均 L2 0.23 m、平均碰撞率 0.08%；再用 nuScenes 子集 RL 的 7B+ 为 0.22 m / 0.07%（表 1）。
3. **开环与闭环安全明显脱节。** NeuroNCAP 中通用 7B 和 7B+ 的平均碰撞率分别为 59.4% 与 59.8%（表 2）。针对 nuScenes 的额外 RL 并未改善总体安全关键闭环结果。
4. **RL 的平均收益掩盖子集退化。** 八数据集统一平均 L2 从 SFT 的 0.24 m 降到 SFT+RL 的 0.23 m，但 Waymo、Mapillary 和 IDD 略有变差（表 3）。
5. **统一训练通常优于单域训练。** 7B 在统一数据训练后，nuScenes 开环由单域训练的 0.25 m / 0.10% 变为 0.23 m / 0.08%，NeuroNCAP 平均分也提高；这支持数据多样性，但仍混合了样本数和分布覆盖的影响（表 7、8）。

## 结论

作者认为，空间引导 action queries 能在保留 VLM 推理表示的同时实现一步并行连续动作生成；统一多数据集和 SFT+RL 则提高一般化能力，形成更接近驾驶基础模型的训练范式。

## 局限与适用边界

### 论文结果直接暴露的局限

- 0.089 秒在 H200 + vLLM 上测得，不代表量产车端延迟，也未包含完整感知和安全栈开销。
- NeuroNCAP 碰撞率仍约 60%，说明强开环指标不足以支持“安全驾驶”结论。
- CoT 主要由外部 VLM 合成，人工复核无法完全消除教师偏差或理由-动作不一致。
- 八数据集统一训练在相机配置、坐标系和标签质量上仍不等价；部分改善可能来自更多数据，而非 action query 本身。
- 当前官方代码仓库规模较小，训练资产和完整复现程度仍需单独审计。
- RL 只把平均 L2 从 0.24 降至 0.23 m，Waymo、Mapillary、IDD 等子集存在轻微退化；不能写成全面泛化提升。
- 连续回归头缺少经过校准的轨迹概率与安全证书；一次并行输出更快，也减少了在动作生成过程中插入显式约束或纠错的机会。
- 论文把高斯初始化称为空间引导，但它只利用训练轨迹的边际均值/方差，没有显式建模地图拓扑、其他参与者或多模态条件分布。

## 我的思考

Reasoning-VLA 最重要的结果不是刷新 L2，而是把“高速开环预测”与“高闭环碰撞”并列呈现。它提醒我们，未来 VLA 论文应把 action head 延迟、闭环安全、不确定性和紧急回退放在同一评价表中；否则并行解码只会更快地产生未经安全约束的轨迹。

## 参考文献

1. Zhang, D., Yuan, Z., Chen, Z., Liao, C.-T., Chen, Y., Shen, F., Zhou, Q., & Chua, T.-S. (2026). *Reasoning-VLA: An Efficient and Spatial-Guided General Vision-Language-Action Reasoning Model for Autonomous Driving*. ICML 2026. [正式全文](https://openreview.net/pdf/2958fe5249a1a673a414d689de7784b306b2a02a.pdf) · [代码](https://github.com/xipi702/Reasoning-VLA) · DOI：未分配/不可用。
