---
title: "文献笔记｜Faster-WAM：用一次未来条件兼顾 WAM 的鲁棒性与速度"
date: 2026-08-18
permalink: /posts/faster-wam-2608-04404/
tags: [literature-note, faster-wam, world-action-model, embodied-ai, future-conditioning, sparsemot, world-model]
note_type: single-paper
literature_topics: [embodied-ai, wam, world-model]
---

> **阅读范围**：arXiv v1 全文 12 页，包括 SparseMoT、Interval KV-Fusion、训练目标、分布内/外与真机实验、附录训练和延迟细节；并核对官方训练/评测代码及 checkpoint。<br>
> **检索日期**：2026-08-18。<br>
> **同名提醒**：本文对应 **arXiv:2608.04404**，副标题是 *Efficient Inference-Time Future Conditioning for Robust World Action Models*；不要与 arXiv:2608.02365 的另一篇同名 “Faster-WAM” 混淆。<br>
> **关键辨析**：Faster-WAM 推理时实例化未来噪声 slots，并运行视频专家一次以取得 future-aware K/V；随后不继续去噪、也不解码未来视频。它介于 DreamZero 的迭代未来生成和 Fast-WAM 的 current-only 接口之间。

## 文献档案

- **论文**：*Faster-WAM: Efficient Inference-Time Future Conditioning for Robust World Action Models*
- **文献链接**：[arXiv:2608.04404](https://arxiv.org/abs/2608.04404) · [PDF](https://arxiv.org/pdf/2608.04404)
- **代码链接**：[hustvl/FasterWAM](https://github.com/hustvl/FasterWAM)
- **模型链接**：[hustvl/FasterWAM checkpoints](https://huggingface.co/hustvl/FasterWAM)
- **作者**：Weiheng Zhao、Haoyi Jiang、Xin Shi、Liu Liu、Fan Huang、Zhizhong Su、Wei Sui、Xinggang Wang
- **机构 / 年份**：Huazhong University of Science and Technology；D-Robotics；Horizon Robotics；Xiamen University；2026
- **出版状态**：截至检索日为 arXiv v1 预印本，提交于 2026-08-05，尚无正式会议或期刊 DOI。[10.48550/arXiv.2608.04404](https://doi.org/10.48550/arXiv.2608.04404) 是 arXiv DataCite DOI。
- **代码状态**：官方仓库 release checklist 已标注训练/推理代码、LIBERO/LIBERO-Plus/RoboTwin 评测代码与模型 checkpoint 全部发布，采用 Apache-2.0；仓库也保留同框架的 FastWAM、JointWAM 对照。[官方 README](https://github.com/hustvl/FasterWAM)

## 核心结论

Faster-WAM 对 Fast-WAM 的结论作了一个重要修正：训练期视频 co-training 的确重要，但在分布偏移下，推理期 future-aware representation 也可能是关键。相同训练框架下，Fast-WAM 在标准 LIBERO 为 97.6%，到 LIBERO-Plus 七类分布偏移后降为 49.14%；保留迭代未来条件的 Joint-WAM 为 66.27%；Faster-WAM 用一次视频前向和稀疏 K/V 条件达到 73.57%。[原论文 Tables 1、3](https://arxiv.org/pdf/2608.04404)

性能并没有以 Joint-WAM 的延迟为代价。在 L20、224×448 输入、10 个动作去噪步的同机测量中，Joint-WAM 为 559.84 ms，Fast-WAM 为 320.97 ms，Faster-WAM 为 252.95 ms；后者相对 Joint-WAM 快 2.21×，甚至比 current-only Fast-WAM 更快。原因是一次视频 K/V 构建只增加约 15 ms，而 SparseMoT 把反复 action denoising 的开销从 276.56 ms 降到 192.11 ms。[原论文 Table 4、Appendix Table A4](https://arxiv.org/pdf/2608.04404)

最容易误读的一点是：Faster-WAM 的“未来条件”不是一段已经生成好的未来视频。默认推理只在高斯 future slots 的噪声端 (\tau_v=1) 运行视频专家一次，缓存各层 K/V；附录中把视频去噪步从 1 增到 10，LIBERO-Plus 反而从 73.57% 降到 68.33%。论文支持的是“高噪、一次前向的 future-aware feature 足以提供控制线索”，不是“更清晰的未来画面一定更好”。[Appendix Table A3](https://arxiv.org/pdf/2608.04404)

## 检索记录

- **数据源**：arXiv v1、论文首页官方 code/models 链接、HUST-VL 官方 GitHub、官方 Hugging Face checkpoint。
- **检索式**：`arXiv 2608.04404 Faster-WAM`；`Efficient Inference-Time Future Conditioning official code`；`hustvl FasterWAM`。
- **纳入原因**：论文直接测试 inference-time future conditioning 的 OOD 价值，并提出 one-pass cache + sparse interaction 的明确折中方案。
- **排除与消歧**：排除 arXiv:2608.02365 的同名论文；没有把第三方汇总页或 Fast-WAM 项目页的数据当作本文结果。
- **全文状态**：12 页全文已读；主文方法/实验、Appendix A1–A5 的训练、video steps、latency、真机数据与 per-task RoboTwin 结果均已核对。
- **图表核验**：方法图取自 Figure 2（PDF 第 3 页），核心结果图取自 Figure 1（PDF 第 1 页）；从 arXiv v1 原 PDF 渲染裁取并检查可读性。
- **版本核验**：截至检索日只有 v1，未发现正式出版、撤稿或勘误。

## 研究背景

DreamZero 等 Joint-WAM 在每个动作去噪步都更新视频与动作，能够让动作读取不断演化的 future representation，但视频主干和 dense cross-branch attention 使延迟过高。Fast-WAM 走向另一极端：训练时保留视频目标，推理时删除所有未来 slots，速度大幅提升，在标准 LIBERO/RoboTwin 上几乎不损失平均性能。

Faster-WAM 认为标准 benchmark 已接近饱和，无法回答 current-only 接口在真正分布偏移下是否稳健。作者在 LIBERO-Plus 观察到 Fast-WAM 相比 Joint-WAM 明显退化，于是提出新的设计原则：**未来表征应在推理时保留，但视频—动作交互不必在每一层、每一个动作去噪步都密集发生。** 这把研究焦点从“生成多少未来视频”转为“动作在何时、以什么代价读取未来特征”。[原论文 Introduction](https://arxiv.org/pdf/2608.04404)

## 研究问题

1. 推理期 future representation 是否只增加计算，还是会在 camera、robot、language、lighting、background、noise、layout 偏移下提高鲁棒性？
2. 能否只运行一次视频专家，并把未来表征缓存给整个动作 flow integration，而不反复视频去噪？
3. 视频—动作交互需要每层发生吗；如何既保留多深度视觉信息，又不增加 attention token 长度？
4. one-pass future conditioning、SparseMoT 和 Interval KV-Fusion 各自贡献多少性能与速度？
5. 更充分地去噪未来 slots 是否会产生更好的控制条件？

## 方法与数据

![Faster-WAM 的 SparseMoT 与 Interval KV-Fusion](/images/literature-notes/faster-wam/method-overview.png)

*图 1｜视频专家只前向一次并建立未来 K/V cache；动作专家在 SparseMoT 选定层读取 Interval KV-Fusion 汇总的多层未来表征，其余层只做动作自更新。来源：原论文 Figure 2，PDF 第 3 页。[原论文 PDF](https://arxiv.org/pdf/2608.04404)*

### 1. 三种视觉接口

控制时刻 (t) 的输入为图像 (o_t)、语言 (l)、本体状态 (s_t)，输出 horizon (H) 的动作 chunk：

$$
A_t=a_{t+1:t+H},
\qquad
\pi_\theta=p_\theta(A_t\mid s_t,l,R_t^v).
$$

记 (z_t^0=E_v(o_t)) 为当前帧 latent，(Z_t) 为未来视频 latent。三种 WAM 的差异可以写成：

$$
R^{v,\mathrm{joint}}_{t,k}
=G_v(z_t^0,Z_t^{(k)},l),
$$

$$
R^{v,\mathrm{fast}}_t
=G_v(z_t^0,l).
$$

Joint-WAM 在每个动作/视频去噪步 (k) 重算随 (Z_t^{(k)}) 演化的视觉表示；Fast-WAM 完全删除未来 slots；Faster-WAM 则在动作积分前建立一次固定但 future-aware 的表示，并在后续动作步复用。[原论文 Eqs. 1–3](https://arxiv.org/pdf/2608.04404)

### 2. One-pass future conditioning

视频与动作都用 flow matching，并取 (\tau=0) 为干净、(\tau=1) 为高斯噪声。默认推理将 future slots 初始化为 (Z_{t,1}=\epsilon_t^v)，与当前干净 anchor (z_t^0) 和语言一起送入 Wan2.2-5B video expert **一次**。虽然 future slots 尚未被重建，视频网络为了估计噪声端的 flow direction，仍需利用场景与任务推断可能的演化方向。

从视频注意力第 (j) 层保留 key/value：

$$
C^v_{t,\tau_v}
=\left\{
(K^v_{t,\tau_v,j},V^v_{t,\tau_v,j})
\right\}_{j=1}^{L}.
$$

视频流使用非对称注意力：future slots 可读取当前 anchor，anchor 不能读取 future；跨专家时 action query 可以读 video features，video query 不能读 action。因而这套 K/V 不依赖正在变化的动作轨迹，可以预计算并缓存。[原论文 §3, “One-pass Future Conditioning”](https://arxiv.org/pdf/2608.04404)

### 3. SparseMoT：只稀疏地读取视频

传统 dense MoT 在 (L) 个对齐 stage 的每一层、每个动作 flow step 都做视频—动作交互。SparseMoT 选择：

$$
\mathcal J=\{j_1,\ldots,j_M\}
\subseteq\{1,\ldots,L\},
\qquad j_1<\cdots<j_M.
$$

在选定层 (j_m)，action query 同时读取融合视频 K/V 与动作自身 K/V：

$$
\widetilde X^a_{j_m}
=\operatorname{Attn}\!\left(
Q^a_{j_m},
[\widehat K^v_{j_m};K^a_{j_m}],
[\widehat V^v_{j_m};V^a_{j_m}]
\right).
$$

未选层仍保留 action self-attention、FFN 和 residual update，只是不再次访问视频。因此 SparseMoT 稀疏的是跨分支通信，而不是删掉动作网络深度。实现采用 30 层、宽度 1024 的 action Transformer，每 4 层交互一次，得到 (M=8) 个读取点。[原论文 Eqs. 5–6、Implementation Details](https://arxiv.org/pdf/2608.04404)

### 4. Interval KV-Fusion：不增加序列长度的多层汇总

若稀疏层只读取本层 K/V，中间视频层的信息会丢失；若把所有中间 token 直接拼接，attention 长度和成本会上升。作者把两个交互点之间的层定义为 interval：

$$
\mathcal I_m=\{j_{m-1}+1,\ldots,j_m\},
$$

再用 softmax 归一化的可学习权重做同形状加权和：

$$
(\widehat K^v_{j_m},\widehat V^v_{j_m})
=\sum_{j\in\mathcal I_m}W^{\mathrm{fuse}}_{m,j}
(K^v_j,V^v_j).
$$

输出仍只占一个 stage 的 token 长度，因此可把多深度 future features 提供给动作，又不增加 cross-attention complexity。[原论文 Eqs. 7–8](https://arxiv.org/pdf/2608.04404)

### 5. 独立视频/动作 flow matching

训练时分别采样视频与动作的 flow time：

$$
Z_{t,\tau_v}=(1-\tau_v)Z_t+\tau_v\epsilon_t^v,
\qquad
A_{t,\tau_a}=(1-\tau_a)A_t+\tau_a\epsilon_t^a.
$$

视频目标 (u_t^v=\epsilon_t^v-Z_t)，动作目标 (u_t^a=\epsilon_t^a-A_t)。联合损失为：

$$
\mathcal L=
\lambda_v\mathbb E\left[
W_v^{\mathrm{flow}}(\tau_v)
\|\widehat u_t^v-u_t^v\|_2^2
\right]
+\lambda_a\mathbb E\left[
W_a^{\mathrm{flow}}(\tau_a)
\|\widehat u_t^a-u_t^a\|_2^2
\right].
$$

附录给出 (\lambda_v=\lambda_a=1)，两个 scheduler 都为 1,000 timesteps、shift 5.0。独立采样噪声级使动作专家在训练时接触不同清晰度组合的视觉/动作状态。[原论文 Eqs. 9–11、Table A1](https://arxiv.org/pdf/2608.04404)

### 6. 训练—推理边界

| 阶段/方法 | future slots | 视频计算 | 动作读取的条件 |
| --- | --- | --- | --- |
| 训练 | 1 个当前 + 8 个真实未来 latent 加噪 | 视频/动作联合训练 | 多噪声级未来 K/V |
| Joint-WAM 推理 | 有，并反复更新 | 每个 denoising step 重跑 | 不断演化的 future features |
| Fast-WAM 推理 | 无 | 当前帧一次编码 | current-only features |
| Faster-WAM 推理 | 有，初始化为 Gaussian noise | (\tau_v=1) 只跑一次，不解码 | 固定 future-aware K/V cache |

“推理期未来条件”与“推理期未来视频生成”必须分开：Faster-WAM 有前者，没有默认意义上的完整后者。

### 7. 数据与优化

- **共同骨干**：Wan2.2-5B video DiT、text encoder 与 VAE；action chunk 32，visual sequence 为当前 1 帧 + 未来 8 帧，时间 stride 4。
- **LIBERO**：2 视角拼为 224×448；10 epochs、8 张 A800、global batch 128。
- **RoboTwin 2.0**：3 视角拼为 384×320；5 epochs、32 张 A800、global batch 1,024；2,500 clean + 25,000 randomized demonstrations。
- **真机**：双 Piper 6-DoF 机械臂，4 个任务各 400 条示范，共 1,600 条、4.52 小时；5 epochs、32 张 A800、global batch 512。
- **优化**：BF16、DeepSpeed ZeRO-1、AdamW (betas 0.9/0.95)、learning rate (10^{-4})、weight decay (10^{-2})、5% warmup + cosine decay、gradient clipping 1.0。

## 实验

实验覆盖三个层次：标准分布内成功率、系统分布偏移，以及真机分布偏移。LIBERO 每任务 50 rollouts；RoboTwin 50+ 任务在 clean/randomized 各 100 trials；LIBERO-Plus 直接用 LIBERO 训练策略测试七类未见偏移，不额外训练。

真机对 4 个双臂任务各做 30 trials，并在“Pick Strawberries”增加新背景、改变光照、未见干扰物三种 OOD 条件。延迟则在单张 L20、BF16、224×448、action horizon 32、10 个动作去噪步下，先 warmup 5 次再同步测量 10 次。

![Faster-WAM 的分布内、分布外与延迟对比](/images/literature-notes/faster-wam/key-results.png)

*图 2｜三种同框架 WAM 的分布内、分布外和延迟概览。Fast-WAM current-only 较快但 OOD 下降；Faster-WAM 用 one-pass future cache 与 sparse interaction 同时获得最高 OOD 成功率和最低延迟。来源：原论文 Figure 1，PDF 第 1 页。[原论文 PDF](https://arxiv.org/pdf/2608.04404)*

## 主要发现

- **分布内性能**：Faster-WAM 在 LIBERO 为 99.0%，高于 Joint-WAM 98.5% 和 Fast-WAM 97.6%；RoboTwin clean/randomized 为 92.78%/92.26%，平均 92.6%。
- **LIBERO-Plus 是主要证据**：Fast-WAM 49.14%，Joint-WAM 66.27%，Faster-WAM 73.57%。Faster-WAM 在七类偏移均高于 Fast-WAM，尤其 Camera 18.75→53.75、Noise 29.84→63.57。
- **future slots 的受控作用**：保持 SparseMoT/KV-Fusion 不变、只构造 current-only 的 C-O Faster-WAM 为 51.00%；恢复 future slots 后为 73.57%，说明增益不只是稀疏动作架构。
- **多深度信息与中等稀疏度有效**：去掉 KV-Fusion 为 69.99%；dense stride-1 为 69.78%，stride-2 为 71.65%，stride-4 最好为 73.57%，过稀的 stride-14 降为 70.05%。
- **无需清晰未来视频**：默认 one-pass 为 73.57%，2 个视频步 73.24%，10 步 68.33%。这说明高噪 future-aware hidden state 比完整 rollout 更符合该 checkpoint 的训练和条件接口。
- **延迟**：Faster-WAM 252.95±2.42 ms，Fast-WAM 320.97±2.86 ms，Joint-WAM 559.84±7.61 ms。去掉 SparseMoT 后为 339.00 ms；KV-Fusion 的测量开销不足 1 ms。
- **真机**：标准 4 任务平均成功率 Faster-WAM 95.8%、Joint 90.8%、Fast 88.3%；三类未见条件平均为 71.1%、55.6%、45.6%。

## 结论

Faster-WAM 给出一个更细的 WAM 设计结论：训练时预测世界、推理时保留 future representation 都可能有用，但“未来”不必以逐步解码的视频形式存在。一次高噪视频前向可以先产生多层 K/V，动作模型随后以稀疏方式读取它们，从而把 future reasoning 与昂贵 rollout 解耦。

这也解释了它为什么既比 Joint-WAM 快，又能比 Fast-WAM 更稳健：前者的冗余来自每步都重跑视频并密集交互；后者的损失来自彻底删除 future temporal slots。Faster-WAM 选择只付一次视频计算，再把交互频率降为每 4 层一次。

## 局限与适用边界

### 作者明确给出的局限/未来工作

- SparseMoT 的交互层目前按固定 stride 人工指定；作者提出未来学习自动选择交互 stage。
- 当前加速主要来自架构；graph compilation 与自定义 CUDA kernel 仍可能提供额外系统优化。

### 额外局限与解读边界

- **future-aware 不等于正确未来**：默认 K/V 来自高斯 future slots 的一次网络响应，没有评估其预测校准、物理一致性或可视化可解释性。
- **OOD 仍是基准内合成偏移**：LIBERO-Plus 很有价值，但七类变化仍围绕已有任务；不能直接推出对新技能、新动力学或故障状态的鲁棒性。
- **真机范围有限**：单一双臂平台、4 个任务和约 4.52 h 数据；OOD 只在其中一个任务上改背景、光照和干扰物。
- **计算门槛较高**：RoboTwin/真机训练使用 32 张 A800，且骨干为 5B；252.95 ms 仍不等于高频低功耗边缘控制。
- **对比限于共同 Wan2.2 框架**：Joint/Fast/Faster 的因果比较较干净，但不能代表所有 WAM/VLA 架构；与预训练方法的表格比较也存在数据和实现差异。
- **one-pass 最优可能是训练配方相关**：同一 checkpoint 增加 video steps 反而下降，不证明更准确的未来普遍有害；模型没有专门为多步 future refinement 后的固定 cache 重新训练。
- **统计证据不完整**：延迟有均值和标准差，成功率表格未报告多训练 seed 方差；小幅分布内差异不宜当成稳定排序。
- **真实数据未完整公开说明**：官方 release 覆盖三个仿真 benchmark 和 checkpoint，但 README 没有提供 1,600 条真机数据的等价公开下载流程。

## 我的思考

Faster-WAM 最值得借鉴的不是又一个 “WAM 更快” 数字，而是把 future computation 分成三个维度：时间上算几次、深度上在哪几层交互、表示上保留多少层 K/V。过去把“要不要未来”当作二元问题，容易忽略大量中间设计。

更进一步，固定 stride 仍是一种静态折中。一个自然方向是让策略根据当前观测不确定度动态分配未来预算：常规状态走 Fast-WAM 式 current-only 路径；检测到相机/背景/物体动力学偏移时，启用一次或多次 future cache；再把动作层的交互 gate 学成输入相关。这样，“世界模型”会从固定昂贵模块变成可按风险调用的计算资源。

## 参考文献

1. Zhao, W., Jiang, H., Shi, X., et al. *Faster-WAM: Efficient Inference-Time Future Conditioning for Robust World Action Models*. arXiv:2608.04404v1, 2026. [arXiv](https://arxiv.org/abs/2608.04404) · [PDF](https://arxiv.org/pdf/2608.04404) · [代码](https://github.com/hustvl/FasterWAM)
2. FasterWAM official repository. *Training, inference, benchmark evaluation, and checkpoints*. [GitHub](https://github.com/hustvl/FasterWAM) · [模型](https://huggingface.co/hustvl/FasterWAM)
3. Yuan, T., Dong, Z., Liu, Y., & Zhao, H. *Fast-WAM: Do World Action Models Need Test-time Future Imagination?* arXiv:2603.16666, 2026. [arXiv](https://arxiv.org/abs/2603.16666)
