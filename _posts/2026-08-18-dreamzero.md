---
title: "文献笔记｜DreamZero：把视频世界模型变成零样本机器人策略"
date: 2026-08-18
permalink: /posts/dreamzero/
tags: [literature-note, dreamzero, world-action-model, embodied-ai, video-diffusion, flow-matching, robot-learning]
note_type: single-paper
literature_topics: [embodied-ai, wam, world-model]
---

> **阅读范围**：arXiv v1 全文 36 页，包括主文、方法、系统优化、实验、讨论与附录；并核对官方项目页、训练/微调/评测代码和公开模型说明。<br>
> **检索日期**：2026-08-18。<br>
> **关键辨析**：DreamZero 不只是把“预测未来”当作训练辅助任务；标准版在推理时仍联合去噪未来视频与动作，DreamZero-Flash 只是把这一联合过程压缩到少步或单步，并没有把未来分支删除。

## 文献档案

- **论文**：*World Action Models are Zero-shot Policies*
- **文献链接**：[arXiv:2602.15922](https://arxiv.org/abs/2602.15922) · [PDF](https://arxiv.org/pdf/2602.15922)
- **项目主页**：[DreamZero](https://dreamzero0.github.io/)
- **代码链接**：[dreamzero0/dreamzero](https://github.com/dreamzero0/dreamzero)
- **模型**：[GEAR-Dreams/DreamZero-DROID](https://huggingface.co/GEAR-Dreams/DreamZero-DROID) · [GEAR-Dreams/DreamZero-AgiBot](https://huggingface.co/GEAR-Dreams/DreamZero-AgiBot)
- **作者**：Seonghyeon Ye 等 36 位作者；项目页标注的 project leads 为 Seonghyeon Ye、Yuke Zhu、Linxi “Jim” Fan、Joel Jang，完整作者顺序以 [arXiv 条目](https://arxiv.org/abs/2602.15922) 为准
- **机构 / 年份**：NVIDIA；2026
- **出版状态**：截至检索日为 arXiv v1 预印本，提交于 2026-02-17，尚无正式会议或期刊 DOI。可解析的 [10.48550/arXiv.2602.15922](https://doi.org/10.48550/arXiv.2602.15922) 是 arXiv DataCite DOI，不应写成正式出版 DOI。
- **代码状态**：官方仓库已提供预训练、微调、仿真与真机评测代码，以及 DROID/AgiBot 模型；README 说明 14B 推理至少需要 2 张 GPU，并主要在 H100/GB200 上测试。[官方 README](https://github.com/dreamzero0/dreamzero)

## 核心结论

DreamZero 的核心主张是：相较只从当前观测直接拟合动作的 VLA，预训练视频扩散模型已经含有关于物体运动、接触和场景演化的时空先验；把未来视频与动作放入同一个自回归流匹配模型，可以把机器人策略学习改写为“先形成视觉未来，再从视觉未来提取逆动力学动作”。在作者的真机协议下，DreamZero 用约 500 小时异质、非重复的 AgiBot 数据，从零训练得到 62.2% 的已见任务平均进度和 39.5% 的未见任务平均进度，分别高于最强预训练 VLA 对照的 27.4% 和 16.3%。[原论文 Figures 8–9](https://arxiv.org/pdf/2602.15922)

但它并不是“无需在推理时想象未来”的方法。标准 DreamZero 在每个闭环周期联合去噪视频和动作；执行动作后，再用真实新观测替换 KV cache 中对应的生成帧。DreamZero-Flash 通过解耦视频/动作噪声时间，把 4 步联合去噪压到 1 步，在 table bussing 上以 150 ms 获得 74%±10.1% 任务进度，而标准 4 步为 350 ms、83%±6.1%。因此其证据支持“高噪未来表征仍能帮助动作”，而不是证明未来条件可以删除。[原论文 §3.2.5、Table 3](https://arxiv.org/pdf/2602.15922)

## 检索记录

- **数据源**：arXiv v1、NVIDIA GEAR 官方项目页、官方 GitHub、官方 Hugging Face 模型仓库。
- **检索式**：`World Action Models are Zero-shot Policies arXiv 2602.15922`；`DreamZero NVIDIA official code`；`dreamzero0 DreamZero project`。
- **纳入原因**：论文明确提出 DreamZero，并同时给出世界动作模型架构、零样本真机实验、跨具身迁移和实时化方案。
- **排除**：没有把第三方论文解读、排行榜转载或非官方移植的结果当作论文证据。
- **全文状态**：36 页全文已读；主文方法与六组研究问题、附录架构/训练/实时系统细节均已核对。
- **图表核验**：方法图取自 Figure 4（PDF 第 6 页），核心结果图取自 Figure 9（PDF 第 14 页）；均从原 PDF 渲染裁取并检查可读性。
- **版本核验**：截至检索日 arXiv 仅有 v1，未发现撤稿或勘误；元数据按 arXiv 与项目页记录。

## 研究背景

VLA 通常继承 VLM 的静态图文语义，再在机器人数据上增加动作头。它擅长识别“哪个物体”以及理解语言目标，却不必显式学习“接触后世界如何变化”。作者认为，这会让模型在未见动作上退回训练分布中的高频行为：例如面对“解鞋带”仍尝试抓取和放置。

视频生成模型恰好提供另一种先验。它需要从当前帧和文本推断后续帧，因此必须编码动作结果、物体持续性和粗粒度物理动态。此前的视频策略常采用两阶段“生成视频 → 逆动力学恢复动作”，但视频与动作可能不对齐，且多步扩散太慢。DreamZero 试图同时解决三个问题：端到端视频—动作对齐、自回归与双向 WAM 的架构取舍，以及 14B 视频 DiT 的真机实时部署。[原论文 §§1、3](https://arxiv.org/pdf/2602.15922)

## 研究问题

1. 联合预测视频和动作，能否让策略从异质、长时、少重复的机器人轨迹中学习，而不依赖每个任务大量重复示范？
2. 视频世界先验能否迁移到训练中从未出现的动作和新环境，并优于已有跨具身预训练的 VLA？
3. 视觉未来与动作应由两个模型串联，还是由一个自回归 DiT 端到端联合建模？
4. 只含视频、没有动作标签的其他机器人或人类示范，能否提升目标机器人的未见任务能力？
5. 14B 视频扩散策略如何从约 5.7 s/action chunk 降到可闭环控制的延迟？
6. 模型规模、数据多样性和自回归结构分别带来什么作用？

## 方法与数据

![DreamZero 的训练与闭环推理架构](/images/literature-notes/dreamzero/method-overview.png)

*图 1｜训练时，视频 latent 与动作共同加噪并由 causal DiT 联合做 flow matching；推理时，模型仍联合产生未来视频与动作，动作执行后用真实观测更新 KV cache。来源：原论文 Figure 4，PDF 第 6 页。[原论文 PDF](https://arxiv.org/pdf/2602.15922)*

### 1. 联合视频—动作分解

在时刻 (l)，模型接收历史观测 (o_{0:l})、语言 (c) 和本体状态 (q_l)，预测未来视频与动作。作者把联合分布写为：

$$
\pi_0(o_{l:l+H},a_{l:l+H}\mid o_{0:l},c,q_l)
=\pi_0(o_{l:l+H}\mid o_{0:l},c,q_l)
\pi_0(a_{l:l+H}\mid o_{0:l+H},q_l).
$$

右侧第一项是视频预测，第二项相当于从观测与视觉未来恢复动作的逆动力学模型（IDM）。不同于“先生成视频、再调用独立 IDM”，DreamZero 用同一套 14B 自回归视频 DiT 联合预测两种模态，只额外增加 state/action encoder 与 action decoder，尽量保留 Wan2.1-I2V-14B 的视频先验。多相机画面在输入端直接拼接，而不是修改主干。[原论文 §3.1](https://arxiv.org/pdf/2602.15922)

### 2. Chunk-wise 自回归 flow matching

轨迹被切成多个 chunk。第 (k) 个视频 latent 和归一化动作都使用同一噪声时间 (t_k)，论文采用“(t=0) 为高斯噪声、(t=1) 为干净数据”的记号：

$$
z^k_{t_k}=t_k z^k_1+(1-t_k)z^k_0,
\qquad
a^k_{t_k}=t_k a^k_1+(1-t_k)a^k_0,
$$

其中 (z^k_0,a^k_0\sim\mathcal N(0,I))，(z^k_1,a^k_1) 是真实视频 latent 与动作。此前的干净 chunk 形成 teacher-forcing 上下文：

$$
\mathcal C_k=\{(z^j_1,a^j_1)\}_{j=1}^{k-1}.
$$

模型联合预测两种模态的速度：

$$
\mathcal L(\theta)=
\mathbb E\left[
\frac{1}{K}\sum_{k=1}^{K}w(t_k)
\left\|
u_\theta([z^k_{t_k},a^k_{t_k}];\mathcal C_k,c,q_k,t_k)
-v_k
\right\|_2^2
\right],
$$

其中 (v_k=[z^k_1,a^k_1]-[z^k_0,a^k_0])。注意力 mask 让当前 noisy chunk 读取此前 clean chunks；视频采用自回归 chunk 生成，而动作保持闭环 chunk 预测，避免直接把生成误差无限传播到控制。[原论文 Eqs. 1–3、Appendix C](https://arxiv.org/pdf/2602.15922)

### 3. 训练期世界预测与推理期未来条件

| 阶段 | 视频/未来分支 | 动作分支 | 信息关系 |
| --- | --- | --- | --- |
| 训练 | 对真实未来视频 latent 加噪并预测联合速度 | 对动作加噪并预测联合速度 | 同一 causal DiT、共享时间步、teacher-forcing 历史 |
| 标准推理 | 显式迭代去噪未来视频 chunk | 同时去噪动作 chunk | 动作读取共同演化的未来表征；执行后用真实帧替换 cache |
| Flash 推理 | 仍保留高噪视频 latent，但只做少步/单步 | 动作少步/单步去噪 | 通过专门训练，让较干净动作适应仍然很 noisy 的视觉条件 |

因此，DreamZero 的闭环纠错发生在“下一个控制周期”：当前周期仍依据生成的未来表征产生动作；真实环境的新观测会在执行后覆盖生成帧，减少长期自回归漂移。论文没有把标准或 Flash 推理改成 current-only policy。

### 4. DreamZero-Flash 与系统优化

标准训练让视频和动作共享均匀采样的 (t)。少步推理时，动作已接近干净而视频仍很 noisy，产生训练—推理错配。Flash 将视频时间改为：

$$
t_k^{\text{video}}=1-\eta,
\qquad \eta\sim\operatorname{Beta}(7,1),
$$

使 (\mathbb E[t_k^{\text{video}}]=0.125)，即训练时大部分视频条件接近噪声；动作时间仍均匀采样。模型因而学会从 noisy visual context 直接恢复动作。系统侧还包括：双 GPU 并行 CFG、按相邻速度余弦相似度复用 DiT 输出、`torch.compile`/CUDA Graph、cuDNN attention、GPU scheduler，以及 GB200 上的 NVFP4/FP8 混合量化。动作执行与推理异步，48 步 action chunk 以 30 Hz 执行，为推理留出重叠窗口。[原论文 §§3.2.2–3.2.6](https://arxiv.org/pdf/2602.15922)

### 5. 数据与训练

- **AgiBot G1**：约 500 小时、7,193 个 episode、22 个真实环境；每条轨迹平均 4.4 分钟、42.4 个子任务，强调长时与异质性。
- **DROID-Franka**：使用公开 DROID 数据，独立训练一个 DreamZero-DROID，以支持可复现实验与公开评测。
- **主训练**：Wan2.1-I2V-14B-480P 初始化；AgiBot 与 DROID 均训练 100K steps、global batch 128；更新所有 DiT block 与 state/action 编解码器，冻结 text encoder、image encoder 和 VAE。
- **任务特定 post-training**：shirt folding 33 h、fruit packing 12 h、table bussing 40 h，各训练 50K steps。
- **跨具身视频**：9 个未见任务，每个任务 8 条；YAM 约 20 分钟、人类第一视角约 12 分钟。只施加视频目标，与 AgiBot 数据按 1:1 混合训练 10K steps。

## 实验

作者把实验组织为六个问题，而不是单一 benchmark 排名。

1. **已见任务、未见环境/物体**：AgiBot 上 10 个已见任务，每个 checkpoint 共 80 次 rollout；DROID 上 20 个已见任务。指标既有 success rate，也有分阶段 task progress。
2. **未见动作**：AgiBot 的 10 个未见任务包含解鞋带、熨衣、画画、拉车等；DROID 评估 20 个训练中动词缺失的任务。
3. **post-training 后的 OOD 保持**：三个下游任务在与训练采集地不同的环境中测试，改变桌高、距离、物体和摆放。
4. **跨具身视频迁移**：比较 baseline DreamZero、Human2Robot 和 YAM Robot2Robot，只增加无动作标签视频。
5. **新具身适配**：AgiBot checkpoint 用 YAM 的 55 条、约 30 分钟 play data 微调，再测试未见物体与语言跟随。
6. **速度—性能与消融**：Flash 单步/多步、5B/14B、异质/重复数据、自回归/双向架构。消融统一用 50K steps、batch 32 和 PnP-Easy，规模小于主实验。

![DreamZero 在未见任务上的零样本结果](/images/literature-notes/dreamzero/key-results.png)

*图 2｜AgiBot 与 DROID-Franka 的未见任务评估。DreamZero 在 AgiBot 上达到 39.5% 平均任务进度，在 DROID 上达到 49% 任务进度和 22.5% 成功率。来源：原论文 Figure 9，PDF 第 14 页。[原论文 PDF](https://arxiv.org/pdf/2602.15922)*

## 主要发现

- **异质数据学习**：AgiBot 已见任务中，DreamZero 为 62.2% 平均任务进度；最强预训练 VLA 对照为 27.4%，from-scratch VLA 接近零。DROID 已见任务中，DreamZero 同样高于公开/内部 VLA 对照。[Figure 8](https://arxiv.org/pdf/2602.15922)
- **零样本未见动作**：AgiBot 平均进度 39.5%，最强预训练 VLA 为 16.3%；DROID 上 DreamZero 为 49% task progress / 22.5% success，而 GR00T N1.6 为 31% / 12.5%，(\pi_{0.5}) 为 33% / 7.5%。
- **跨具身无动作视频有效**：9 个未见任务由 38.3%±7.6% 提升到人类视频的 54.3%±10.4%，以及 YAM 视频的 55.4%±9.5%；后两者相对提升均超过 42%。
- **数据多样性与规模均重要**：同为 500 h，异质数据的消融进度为 50%±6.3%，重复数据为 33%±4.2%；14B 为 50%±6.3%，5B 为 21%±4.2%。作者观察到小模型的视觉幻觉会直接变成错误动作。
- **AR 的优势主要在动态质量和速度**：AR 与双向模型在小规模 PnP 消融中都为 50%，但 AR 动作更平滑，并因 KV cache 快 3–4 倍；这一结果没有证明 AR 在成功率上显著更优。
- **实时化是系统组合效果**：从单 GPU 约 5.7 s 降至 2 张 GB200 上约 150 ms，累计 38×；其中包含缓存、量化、编译、并行与 Flash，不能把全部加速归因于噪声调度。

## 结论

DreamZero 展示了一条不同于 VLM→VLA 的路线：从视频扩散主干出发，把可见的未来世界当作动作学习的稠密中介，再以联合 flow matching 对齐视频与控制。论文最有力的证据是未见动作、异质数据学习和少量无动作跨具身视频迁移；它提示 WAM 的扩展瓶颈可能更多在视频预测质量与隐式 IDM，而不仅是语言语义。

同时，DreamZero 的结论应理解为一个完整系统结论：14B Wan 视频先验、500 h 数据、联合生成、自回归 cache 和高端 GPU 优化共同作用。论文没有单独证明“视觉未来因果地带来全部零样本收益”，也没有证明昂贵的推理期视频分支不可替代；后来的 Fast-WAM / Faster-WAM 正是在拆解这个问题。

## 局限与适用边界

### 作者明确讨论的局限

- **尚无 WAM scaling law**：只比较 5B 与 14B，未系统覆盖模型、数据与计算量的联合缩放。
- **人类视频规模很小**：Human2Robot 仅约 12 分钟，尚不能外推到大规模互联网/第一视角视频训练。
- **推理仍昂贵**：7 Hz 依赖 2 张 GB200；消费级设备上的 VLA 可超过 20 Hz，DreamZero 尚不是轻量边缘策略。
- **短期记忆**：视觉历史约 6 秒；论文也明确没有针对必须依赖记忆的任务做训练或评估。
- **高精度行为克隆瓶颈**：钥匙插入、精细装配等亚厘米任务可能需要更密集的精确示范。
- **多具身联合预训练未做**：AgiBot 与 DROID 分开训练；高自由度具身所需的 implicit IDM 数据量仍未知。

### 额外局限与解读边界

- **真机指标不是统一 success rate**：大量结果使用分阶段 task progress；“超过 2×”不等于完整成功率翻倍，也受评分规则影响。
- **对照并非完全同等先验**：DreamZero 从 web-scale 视频模型初始化，VLA 从 VLM 初始化；这是研究问题本身的一部分，却难以把“视频目标”“预训练数据”和“架构”完全分离。
- **关键 AgiBot 数据未完整公开**：官方代码和 checkpoint 已发布，但论文的约 500 h 内部语料仍限制端到端复现。
- **误差会忠实传入控制**：作者明确观察到多数失败源于错误视频预测，动作头会执行被幻觉出的轨迹；这对安全部署尤其重要。
- **实时数字硬件依赖强**：38× 是累计优化且基于 GB200/NVFP4；不能直接外推到单张消费卡或不同 CUDA 栈。
- **跨具身形态差距有限**：YAM 与 AgiBot 都是双臂平行夹爪；30 分钟适配不代表可直接迁移到手爪、腿式或明显不同动力学的机器人。

## 我的思考

DreamZero 最重要的思想不是“机器人先生成一段好看的视频”，而是把视觉未来变成动作监督的公共坐标系。动作空间随具身变化，像素中的“杯子被抬起并放入袋中”却相对具身无关，这解释了为什么无动作标签的人类/YAM 视频仍可能改善 AgiBot。

它也暴露了 WAM 的核心张力：训练时世界预测可以强迫网络学习动力学，但推理时是否需要真正生成未来，是另一个独立问题。DreamZero 把两者绑定；Fast-WAM 将推理未来移除；Faster-WAM 又以一次高噪未来表征恢复 OOD 鲁棒性。三篇连起来看，更准确的研究轴不是“要不要世界模型”，而是：**世界监督放在训练的哪里、未来表征在推理的哪一层被读取，以及为了鲁棒性需要多少未来计算。**

## 参考文献

1. Ye, S., Ge, Y., Zheng, K., et al. *World Action Models are Zero-shot Policies*. arXiv:2602.15922, 2026. [arXiv](https://arxiv.org/abs/2602.15922) · [PDF](https://arxiv.org/pdf/2602.15922) · [代码](https://github.com/dreamzero0/dreamzero)
2. DreamZero project. *DreamZero: World Action Models are Zero-shot Policies*. [项目主页](https://dreamzero0.github.io/)
3. DreamZero official repository. *Code to pretrain, fine-tune, and evaluate DreamZero*. [GitHub](https://github.com/dreamzero0/dreamzero)
