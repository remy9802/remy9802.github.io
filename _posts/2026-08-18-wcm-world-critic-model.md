---
title: "文献笔记｜WCM：把世界预测写进 VLA 强化学习的 critic"
date: 2026-08-18
permalink: /posts/wcm-world-critic-model/
tags: [literature-note, embodied-ai, vla, world-model, world-critic-model, real-world-rl, critic]
note_type: single-paper
literature_topics: [embodied-ai, vla, world-model, real-robot-rl]
---

> **阅读范围**：arXiv v1 全文，包括 LeJEPA 式 critic、三项损失、on/off-policy 接入、149 个仿真任务、七项真机实验、消融、训练算法及附录。  
> **检索日期**：2026-08-18。  
> **主题**：只看单帧并回归标量 return 的 VLA critic 是否丢失了接触、速度和进度；加入历史与下一潜变量预测，能否得到更准确、更可泛化的价值表征？

## 文献档案

- **论文**：*WCM: A World Critic Model for Vision-Language-Action Reinforcement Learning*
- **文献链接**：[arXiv:2607.29613](https://arxiv.org/abs/2607.29613) · [项目页](https://sylvestf.github.io/wcm-homepage/)
- **PDF**：[arXiv v1](https://arxiv.org/pdf/2607.29613)
- **代码 / 权重**：[sylvestf/WCM](https://github.com/sylvestf/WCM) · [Hugging Face collection](https://huggingface.co/collections/Sylvest/wcm)
- **作者**：Senyu Fei、Xiaopeng Yu、Siyin Wang、Xianzhong Zhao、Jingjing Gong、Xipeng Qiu
- **机构 / 年份**：同济大学、上海创智学院、复旦大学；2026
- **出版状态**：arXiv v1 预印本，提交于 2026-07-31；截至检索日未找到同行评审版本。
- **DOI**：[10.48550/arXiv.2607.29613](https://doi.org/10.48550/arXiv.2607.29613)，为 arXiv/DataCite DOI。

## 核心结论

WCM 的核心判断是：VLA-RL 的 critic 面对的是部分可观测控制问题，单帧无法区分“正在接近目标”“刚发生碰撞”或“停滞”；仅把多帧堆叠后用稀疏 scalar return 监督，也可能学不到跨时间动力学。WCM 因而共享一个历史 Transformer，同时预测下一潜在状态和当前 value，以密集的世界预测目标塑造 critic 表征。

论文在 ManiSkill、MetaWorld、CALVIN、LIBERO-Plus 共 149 个仿真任务，以及 WidowX-250S 的七个真机任务上接入 π0、π0.5 和 OpenVLA-OFT。ManiSkill 中 π0.5 的 IND/OOD 平均成功率达到 91.9%/64.4%，对照 Flow-SDE 为 90.9%/49.3%；真实 stovetop cleaning 上，π0.5 + WCM 为 33/50，Gemma critic 的 RECAP 为 27/50，SFT 为 4/50。[原文 Tables 1、3](https://arxiv.org/pdf/2607.29613)

## 检索记录

- **数据源**：arXiv v1、作者项目页、官方 GitHub 与 Hugging Face collection。
- **检索式**：`WCM World Critic Model VLA RL`；`arXiv 2607.29613`；`site:github.com/sylvestf/WCM`。
- **纳入原因**：原始 WCM 论文，显式把世界预测用于 VLA-RL critic，并同时覆盖 on-policy、off-policy、仿真、OOD 与真机。
- **排除**：World Action Model、World Model 和 WCM 的二次报道未混入本文自身结果。
- **全文状态**：23 页 v1 主文与附录均已检查，包括 λ/history 消融、sim-to-real、三套训练算法、真机数据流程、吞吐和 value 可视化。

## 研究背景

critic-based VLA-RL 用 value 或 advantage 把稀疏成功奖励转化为更密的策略更新信号。现有实现常直接从当前图像或 VLM 当前帧 latent 回归 value，隐含假设“单帧足以近似 Markov state”。但机器人场景经常不是这样：同一静态画面可能对应不同速度、接触历史、抓取是否刚滑落或任务是否在前进。

简单堆叠多帧只增加输入，不保证网络学到动力学。return 是一个低维、稀疏目标，高容量历史编码器可能忽略旧帧，或把它们当作静态纹理。WCM 借鉴 joint-embedding predictive architecture：若 critic 必须根据历史和动作预测下一 latent，它就更有动力保留会影响未来的状态信息。

## 研究问题

1. VLA-RL 的主要 critic 瓶颈是否是单帧状态近似，而非策略骨干本身？
2. 历史输入为什么不足，下一潜变量预测是否提供必要的密集监督？
3. 同一 critic 能否适配自回归/flow VLA，以及 on-policy/off-policy 更新？
4. 世界预测是否改善 IND、OOD、长时序和真实接触任务，而不只是仿真训练分数？
5. 历史越长是否越好，world/value loss 权重怎样影响泛化？

## 方法与数据

![WCM 架构与训练管线](/images/literature-notes/wcm/method-overview.png)

*图 1｜WCM 用历史图像编码、因果 world predictor、下一 latent head 与 value head 联合训练，并分别接入 on-policy PPO/Flow-SDE 和 off-policy AWR/RECAP。来源：原论文 Figure 2，arXiv PDF 第 4 页。[原图](https://arxiv.org/pdf/2607.29613)*

### 1. 历史条件的潜在状态

对最近 (K) 个观测，每帧先独立编码：

$$
z_{t-k}=\operatorname{enc}_\epsilon(o_{t-k}),
\qquad k\in\{0,\ldots,K-1\}.
$$

encoder 在不同接入场景中可为 ViT，也可复用 VLA 的 VLM backbone。语言指令先由 CLIP 编码，再经 adapter 映射到 WCM 维度；视觉历史对语言 token 做 cross-attention，并进入 causal Transformer：

$$
h_t=\operatorname{Tr}_\phi
(\operatorname{XAttn}(z_{t-K+1:t},u_\ell)).
$$

该 (h_t) 被视作紧凑、可更新的 predictive state，而不是只为当前回报拟合的静态特征。[原文 §3.2](https://arxiv.org/pdf/2607.29613)

### 2. value 与动作条件世界预测双头

value head 预测 return：

$$
\hat V_t=\mathcal D_{\mathrm{value}}(h_t).
$$

world head 接收当前 latent、历史状态和动作，以 gated FiLM residual blocks 预测下一 latent：

$$
\hat z_{t+1}=\mathcal D_{\mathrm{world}}(h_t,a_t,z_t).
$$

预测目标不是解码像素视频，而是编码器空间中的下一状态；因此它比生成式视频 world model 轻，但其“世界”范围也仅限单步 latent dynamics。

### 3. 三项联合目标

下一状态 teacher-forcing 损失为：

$$
\mathcal L_{\mathrm{pred}}=
\lVert\hat z_{t+1}-z_{t+1}\rVert_2^2.
$$

为防止 joint embedding 塌缩，离线/真机版本还加入 SIGReg，使随机一维投影接近各向同性 Gaussian。value target 使用成功终点 0、失败终点 (-C_{\mathrm{fail}})、其余每步 (-1) 的折扣 return，再 min–max 到 ([-1,1])：

$$
\mathcal L=
\mathcal L_{\mathrm{value}}+
\lambda\mathcal L_{\mathrm{pred}}+
\eta\mathcal L_{\mathrm{SIGReg}}.
$$

仿真 on-policy 管线为减小开销不使用 SIGReg；因此论文的不同实验并非完全相同的三项 recipe。[原文 Eqs. 6–10、Appendix D](https://arxiv.org/pdf/2607.29613)

### 4. 接入 on-policy VLA-RL

- 自回归 OpenVLA-OFT：用 PPO，WCM 替代原 3-layer MLP value head；
- flow-matching π0/π0.5：用 Flow-SDE，WCM 提供 GAE value；
- rollout buffer 同时更新 policy 与 WCM。

ManiSkill 实验沿用 RLinf 的 batch 64 和训练 1000 steps，即 RL 阶段最多看到约 64k trajectories；OpenVLA-OFT 的极弱 0.78% zero-shot 初始值在约 600 steps 后接近收敛。论文的“12,551% 提升”来自 0.78% 到 98.7% 的相对增幅，阅读时应同时报告绝对值。[原文 Table 1、Appendix D.2](https://arxiv.org/pdf/2607.29613)

### 5. 接入 off-policy 真机后训练

- OpenVLA-OFT 使用 AWR；π0.5 使用 RECAP；
- 初始 buffer 每任务含 100 条遥操作轨迹；每轮再收集 50 条成功/失败 rollout，共 8 轮；
- 失败 rollout 由人在环纠正为成功轨迹，在失败点赋大负奖励；
- baseline critic 是 SigLIP-400M + Gemma-270M，WCM 有约 107.2M 可学习参数；
- WCM 与策略按任务或任务组更新，非一个跨七任务统一 critic。

所有真机实验在 WidowX-250S 上以 10 Hz 控制、chunk size 5 运行；训练使用 8×H100，推理在 RTX 5090 工作站。[原文 §4.4、Appendix D.2](https://arxiv.org/pdf/2607.29613)

## 实验

### 仿真主结果

ManiSkill 的关键对照如下：

| Backbone | 方法 | IND 平均 | OOD 平均 |
|---|---|---:|---:|
| π0 | Flow-SDE | 78.8 | 39.3 |
| π0 | WCM | 84.4±1.2 | 51.5±1.5 |
| π0.5 | Flow-SDE | 90.9 | 49.3 |
| π0.5 | WCM | 91.9±0.4 | 64.4±1.4 |
| OpenVLA-OFT | PPO | 97.7 | 77.1 |
| OpenVLA-OFT | WCM | 99.0±0.4 | 77.9±0.8 |

WCM 对 π 系列的 OOD 增益更大，对已经很强的 OpenVLA PPO 只小幅提高。MetaWorld 中 π0/π0.5 分别达到 83.4%/75.2%；CALVIN 平均链长 4.748/4.717。LIBERO-Plus 从 one-demo SFT 起步，三类 backbone 总体为 72.8%–74.0%，超过各自 50-demo Full-SFT 的 71.2%–72.9%。[原文 Tables 1–2、Figure 4](https://arxiv.org/pdf/2607.29613)

### 世界预测与历史消融

把历史给原 MLP 或 history ViT（即 WCM 但 λ=0）并不稳定；加入预测损失后整体最好。history length 从 1 到 5 的平均最优点为 3，而非越长越强。λ 在 0.3–0.5 区间平衡 IND/OOD；OOD 对 λ 的波动约 10.6 个百分点，显著高于 IND 的 2.7。[原文 Figure 5、Appendix A](https://arxiv.org/pdf/2607.29613)

### 真机结果

![WCM 七项真机结果](/images/literature-notes/wcm/key-results.png)

*图 2｜OpenVLA-OFT 与 π0.5 在 pick-and-place、布料折叠、灶台清洁和传送带寿司抓取上的 SFT、标准 critic RL 与 WCM 结果；每格为测试开始后的前 50 条轨迹。来源：原论文 Table 3，arXiv PDF 第 9 页。[原图](https://arxiv.org/pdf/2607.29613)*

WCM 在七项任务均高于对应 Gemma-critic AWR/RECAP。例如 OpenVLA-OFT 的毛巾折叠为 40/50，对照 AWR 35/50；π0.5 的胡萝卜、灶台清洁和寿司抓取分别为 44/50、33/50、24/50，对照 RECAP 为 33/50、27/50、18/50。吞吐图在毛巾、灶台和寿司上也显示 WCM 版本更高，但正文 Table 3 没有为七任务报告多 seed 置信区间。

作者给出的行为解释是：单帧 critic 容易把“末端靠近桌面”误当作成功抓取的 proxy，从而导致碰撞或电机停滞；历史预测使碰撞后的 value 下跌，并减少移动寿司抓取中的抓后延迟。这些轨迹和 value 曲线支持机制解释，但仍是有限案例可视化。[原文 Appendix D–E](https://arxiv.org/pdf/2607.29613)

## 主要发现

1. **世界模型可以服务 critic，而不必直接生成动作。** WCM 的预测头只在训练时塑造 value representation。
2. **历史输入与历史监督是两件事。** 多帧架构若只有 scalar return，可能仍忽略动力学；下一 latent 提供更密的跨时间约束。
3. **收益主要体现在 OOD 与接触进度。** 强 IND baseline 上绝对提升有限，分布变化和部分可观测任务更明显。
4. **短历史优于盲目加长。** 本文平均最优 (K=3)，说明时序窗口也有容量、噪声和优化折中。
5. **WCM 是 critic 插件，不是独立 RL 算法。** 主结果仍依赖 PPO、Flow-SDE、AWR 或 RECAP 的数据与 policy update。

## 结论

WCM 将 VLA-RL 的价值估计从“当前画面到一个数”扩展为“历史和动作到下一 latent 与一个数”。论文提供了较完整的跨 backbone、跨 RL 范式和真机证据，表明 predictive representation 是改进 critic 的有效方向；但“world model”在这里应理解为轻量单步潜在动力学辅助目标，而不是可长期 rollout、规划或生成未来视频的完整世界模型。

## 局限与适用边界

### 论文直接呈现的边界

- 论文没有独立 Limitations 章节；作者在附录只谨慎说明 WCM 前 500 steps 未见 critic overfitting，不声称完全免疫。
- 更长历史并非总有益，平均最优长度为 3；λ 需要按 IND/OOD 权衡调节。
- 仿真到真实的直接迁移仍不稳定：仿真 RL 在画面中心可工作，但视野边缘有明显抓取偏差。
- 真机训练仍有遥操作初始数据、人在环失败纠正、人工奖励和硬件安全边界。

### 额外识别的局限

- 仅 arXiv v1，发布时间距检索日很近，结论尚未经同行评审和独立复现。
- 149 个任务数量很大，但来自四个相关模拟套件；真实实验仅一款 WidowX 平台、七个固定工作站任务。
- 真机每项结果是测试开始后的前 50 条轨迹，缺少多 seed、置信区间和统一安全统计。
- 部分超大相对提升来自接近零的起点；0.78%→98.7% 应主要按绝对百分点与训练数据量解释。
- “naive history 导致指数复杂度”的表述过强：实际复杂度取决于帧数、token 数和 attention 实现，不能一般化为指数增长。
- WCM 同时改变网络容量、历史输入和辅助目标；虽有 λ=0/history 消融，仍缺完全容量/计算配平的 factorial attribution。
- latent prediction 依赖同一个可训练 encoder，预测误差未与物理状态或校准 value 系统对应；低 loss 不自动意味着因果、可规划世界状态。
- 仿真训练使用 8×H100、最多 64k RL trajectories；“轻量 critic”不等于整体训练成本低。

## 我的思考

WCM 最有启发性的地方是把 critic 视作状态表示学习问题。策略可以调用强 VLA，但若 critic 无法区分“看起来接近目标”和“正在以错误速度撞向目标”，advantage 就会把错误监督送回大策略。对真机而言，改进 critic 可能比继续增加 actor 参数更直接。

下一步应把 WCM 与 RL Token 结合做严格对照：一个压缩 VLA 当前内部状态，另一个显式学习历史动力学。可以测试同一 actor 下 current RL token、recurrent RL token、WCM token 的 value calibration、OOD 误差和碰撞预测；同时加入多步 latent rollout 与不确定性，判断它何时真正从辅助表征升级为可用于安全决策的 world critic。

## 参考文献

1. Fei, S., Yu, X., Wang, S., Zhao, X., Gong, J., & Qiu, X. (2026). *WCM: A World Critic Model for Vision-Language-Action Reinforcement Learning*. arXiv:2607.29613. [arXiv](https://arxiv.org/abs/2607.29613) · [DOI](https://doi.org/10.48550/arXiv.2607.29613) · [代码](https://github.com/sylvestf/WCM) · [模型](https://huggingface.co/collections/Sylvest/wcm)
