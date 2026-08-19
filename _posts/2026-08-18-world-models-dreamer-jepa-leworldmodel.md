---
title: "世界模型综述：从 Dreamer 的想象学习、JEPA 的表征预测到 LeWorldModel"
date: 2026-08-18
permalink: /posts/world-models-dreamer-jepa-leworldmodel/
tags: [literature-note, world-model, dreamer, jepa, model-based-rl, self-supervised-learning]
note_type: topic-synthesis
literature_topics: [world-model, model-based-rl, self-supervised-learning, embodied-ai]
---

> **阅读范围**：全文阅读 2018–2026 年 17 项一手文献，覆盖 World Models、PlaNet、Dreamer 1/2/3/4、MuZero、TD-MPC2、JEPA/I-JEPA/V-JEPA/V-JEPA 2、DINO-WM、LeJEPA、LeWorldModel、Genie 与 DayDreamer，并核验正式出版页和官方代码。<br>
> **检索日期**：2026-08-18。<br>
> **综述性质**：围绕指定路线的定向技术综述，不是穷尽数据库的系统综述。
> **证据边界**：Dreamer 4、V-JEPA 2、LeJEPA 与 LeWorldModel 截至检索日仍按 arXiv 预印本处理；LeCun 2022 是立场文章，不是实验论文。

## 核心结论

1. **世界模型不是“会生成视频的模型”的同义词。** 对决策而言，更实用的定义是：模型能根据历史与候选动作预测足以比较反事实后果的状态、奖励、价值或目标距离。MuZero 不重建像素仍是控制导向世界模型；Genie 能生成逐帧世界，却没有内置策略或规划器。
2. **Dreamer 的主线是“怎样使用模型”，不只是“怎样预测未来”。** PlaNet 每个环境步用 CEM 搜索；Dreamer 1–3 把搜索摊销为在潜空间想象中训练的 actor–critic；Dreamer 4 又将 RSSM 换成可扩展视频 Transformer，并转向固定离线数据中的想象强化学习。
3. **JEPA 是预测表征的原则，不自动等于可控制的世界模型。** I-JEPA 只预测单张图像的遮挡区域，V-JEPA 从无动作视频学习时空表征；只有加入动作条件动力学的 V-JEPA 2-AC、DINO-WM 或 LeWorldModel，才可根据候选动作进行闭环规划。
4. **当前没有统一最优架构。** 像素重建提供丰富但昂贵的监督；奖励/价值等价模型直接服务控制却可能忽略物理细节；JEPA 潜变量避开不可预测像素，却必须解决表征坍塌与任务相关信息丢失。选择取决于任务监督、数据是否含动作、是否需要决策时搜索，以及部署算力。
5. **最大的未解问题不是单步预测分数，而是长期闭环可靠性。** 模型误差会被 actor 或 planner 主动利用；离线动作覆盖不足、部分可观测、接触突变和分布外目标都会放大误差。现有证据主要来自游戏和仿真，真机研究仍以少量固定任务为主。

## 检索记录

- **数据源**：Nature、NeurIPS Proceedings、PMLR、OpenReview、CVF Open Access、TMLR、arXiv、论文项目页及作者或机构官方 GitHub。
- **检索式**：
  - world model AND latent dynamics AND planning from pixels
  - Dreamer DreamerV2 DreamerV3 Dreamer 4 official paper code
  - JEPA I-JEPA V-JEPA action-conditioned world model
  - DINO-WM LeJEPA LeWorldModel latent planning
  - MuZero TD-MPC2 Genie DayDreamer official proceedings
- **时间范围**：2018-01-01 至 2026-08-18；以奠基工作加最新指定工作为主。
- **纳入**：与四类问题直接相关的一手工作——想象式策略学习、决策时规划、联合嵌入预测、生成式交互环境；要求全文可读，且元数据与代码状态可从权威页面核验。
- **排除**：二手解读、同名社区复现、只有产品演示而无可审计技术论文的 Genie 2/3，以及仅做普通视频生成而没有动作条件或决策证据的模型。
- **去重与状态核验**：以正式出版记录优先，arXiv 用于全文和版本追踪；17/17 项均完成全文阅读。纳入 12 项同行评审论文、4 项预印本和 1 项立场文章。

### 文献、机构与代码状态

| 路线 | 文献与年份 | 作者/主要机构 | 状态 | 官方代码 |
|---|---|---|---|---|
| 起点 | [World Models](https://proceedings.neurips.cc/paper/2018/hash/2de5d16682c3c35007e4e92982f1a2ba-Abstract.html)，2018 | David Ha、Jürgen Schmidhuber；Google Brain、NNAISENSE/IDSIA | NeurIPS 2018 | [WorldModelsExperiments](https://github.com/hardmaru/WorldModelsExperiments) |
| 潜空间规划 | [PlaNet](https://proceedings.mlr.press/v97/hafner19a.html)，2019 | Danijar Hafner 等；Google Brain、DeepMind 等 | ICML 2019 | [google-research/planet](https://github.com/google-research/planet) |
| 想象策略 | [Dreamer](https://arxiv.org/abs/1912.01603)，2020 | Danijar Hafner 等；Google Brain、DeepMind、Toronto | ICLR 2020 Oral | [danijar/dreamer](https://github.com/danijar/dreamer) |
| 离散潜变量 | [DreamerV2](https://arxiv.org/abs/2010.02193)，2021 | Danijar Hafner 等；Google Research、DeepMind、Toronto | ICLR 2021 | [danijar/dreamerv2](https://github.com/danijar/dreamerv2) |
| 统一配方 | [DreamerV3](https://doi.org/10.1038/s41586-025-08744-2)，2025 | Danijar Hafner 等；Google DeepMind、Toronto | Nature 2025 | [danijar/dreamerv3](https://github.com/danijar/dreamerv3) |
| 扩展视频模型 | [Dreamer 4](https://arxiv.org/abs/2509.24527)，2025 | Danijar Hafner、Wilson Yan、Timothy Lillicrap；Google DeepMind | arXiv v1 预印本 | 未发现官方代码 |
| 树搜索 | [MuZero](https://doi.org/10.1038/s41586-020-03051-4)，2020 | Julian Schrittwieser 等；DeepMind、UCL | Nature 2020 | 仅论文伪代码，无官方完整实现 |
| 轨迹优化 | [TD-MPC2](https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html)，2024 | Nicklas Hansen、Hao Su、Xiaolong Wang；UC San Diego | ICLR 2024 Spotlight | [nicklashansen/tdmpc2](https://github.com/nicklashansen/tdmpc2) |
| JEPA 概念 | [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf)，2022 | Yann LeCun；NYU、Meta FAIR | 立场文章 v0.9.2 | 不适用 |
| 静态 JEPA | [I-JEPA](https://doi.org/10.1109/CVPR52729.2023.01499)，2023 | Mahmoud Assran 等；Meta AI、McGill/Mila、NYU | CVPR 2023 | [facebookresearch/ijepa](https://github.com/facebookresearch/ijepa)，已归档 |
| 视频 JEPA | [V-JEPA](https://arxiv.org/abs/2404.08471)，2024 | Adrien Bardes 等；Meta AI 等 | TMLR 2024 | [facebookresearch/jepa](https://github.com/facebookresearch/jepa) |
| 大规模视频/规划 | [V-JEPA 2](https://arxiv.org/abs/2506.09985)，2025 | Mahmoud Assran 等；Meta FAIR、Mila 等 | arXiv 预印本 | [facebookresearch/vjepa2](https://github.com/facebookresearch/vjepa2) |
| 冻结表征规划 | [DINO-WM](https://proceedings.mlr.press/v267/zhou25t.html)，2025 | Gaoyue Zhou 等；NYU、Meta AI | ICML 2025 | [gaoyuezhou/dino_wm](https://github.com/gaoyuezhou/dino_wm) |
| 防坍塌目标 | [LeJEPA](https://arxiv.org/abs/2511.08544)，2025 | Randall Balestriero、Yann LeCun；Brown、NYU | arXiv 预印本 | [galilai-group/lejepa](https://github.com/galilai-group/lejepa) |
| 端到端 JEPA 世界模型 | [LeWorldModel](https://arxiv.org/abs/2603.19312)，2026 | Lucas Maes 等；Mila、NYU、Samsung SAIL、Brown | arXiv v3 预印本 | [lucas-maes/le-wm](https://github.com/lucas-maes/le-wm) |
| 生成式环境 | [Genie](https://proceedings.mlr.press/v235/bruce24a.html)，2024 | Jake Bruce 等；Google DeepMind、UBC | ICML 2024 | 未开放代码、权重和训练数据 |
| 真机验证 | [DayDreamer](https://proceedings.mlr.press/v205/wu23c.html)，2023 | Philipp Wu 等；UC Berkeley | CoRL 2022 / PMLR 2023 | [danijar/daydreamer](https://github.com/danijar/daydreamer) |

## 研究问题

本文不按论文发布日期逐篇堆叠摘要，而是用六个问题比较不同路线：

1. 模型预测的是像素、潜变量、奖励/价值，还是只对决策等价的统计量？
2. 训练数据是否必须包含动作、奖励与任务标签？
3. 行为是在模型中训练成 actor，还是在部署时通过 MCTS、CEM 或 MPPI 搜索？
4. 潜变量怎样同时保留可预测性、任务相关性和多种可能未来，并避免坍塌？
5. 视觉预训练与少量机器人动作数据应怎样分工？
6. 实验究竟证明了表示能力、开放环预测、闭环控制，还是真实世界泛化？

## 研究背景

### 一、功能定义：世界模型必须支持“如果我这样做，会怎样”

令观测为 $o_t$、动作为 $a_t$、奖励为 $r_t$，历史压缩后的潜状态为 $z_t$。最一般的动作条件模型可写为：

$$
z_t=E(o_{\le t},a_{<t}),\qquad
\hat z_{t+1}=F(z_t,a_t),\qquad
(\hat r_t,\hat v_t,\hat o_t)=G(z_t).
$$

具体方法不必同时拥有所有输出。只要 $\hat z_{t+1}$、奖励、价值或目标距离足以比较动作后果，模型就能支持控制。反过来，只会预测自然视频而不接收动作的模型，可能是优秀表征学习器，却还不是可进行干预推理的控制模型。

### 二、四种常被混称为“世界模型”的对象

| 类型 | 典型模型 | 预测目标 | 动作怎样产生 | 部署时是否搜索 |
|---|---|---|---|---|
| 生成式潜世界 + 想象策略 | World Models、Dreamer、DayDreamer | 观测/潜状态、奖励、终止 | 在想象 rollout 中训练 actor | 通常否，直接执行 actor |
| 控制等价模型 + 搜索 | MuZero、TD-MPC2 | reward、value、policy 或任务潜变量 | MCTS、CEM、MPPI | 是 |
| JEPA 潜动力学 + 目标规划 | V-JEPA 2-AC、DINO-WM、LeWorldModel | 下一时刻 embedding | 最小化预测终态与目标图像 embedding 距离 | 是 |
| 生成式交互环境 | Genie | 视频 token 与无监督 latent action | 用户或外部 agent 提供动作 | 模型自身没有 planner |

这张表也解释了一个常见误写：DayDreamer 论文会使用“planning in imagination”的宽泛说法，但其机器人部署时并不逐步执行 MPC；actor 已在模型中学好，真实机器人上直接前向输出动作。

## 方法与数据

### 1. 从 World Models 到 PlaNet：先学潜空间，再在其中规划

[World Models](https://proceedings.neurips.cc/paper/2018/hash/2de5d16682c3c35007e4e92982f1a2ba-Abstract.html) 建立了早期模块化范式：VAE 将图像压缩为潜变量，MDN-RNN 预测潜状态的混合高斯分布，线性 controller 再由 CMA-ES 优化。它最重要的贡献不是某个网络结构，而是证明策略可以在学习到的“梦境”里训练。然而 Doom 实验也直接暴露了模型利用问题：当温度过低、虚拟环境过于确定时，策略在模型中得分 $2086\pm140$，回到真实环境却只有 $193\pm58$。这说明 agent 会主动寻找模型误差，而非被动承受误差。CarRacing 上 $906\pm21$ 的结果证明了路线可行，但控制器、表征和动力学被分阶段训练，任务规模仍很小。

[PlaNet](https://proceedings.mlr.press/v97/hafner19a.html) 将确定性记忆与随机状态合并为 Recurrent State-Space Model（RSSM）：

$$
h_t=f(h_{t-1},s_{t-1},a_{t-1}),\qquad
s_t\sim p(s_t\mid h_t),\qquad
o_t\sim p(o_t\mid h_t,s_t).
$$

确定性路径 $h_t$ 保存长期信息，随机变量 $s_t$ 表示不确定性；模型还学习奖励预测。部署时，PlaNet 每一步用 Cross-Entropy Method（CEM）在潜空间优化动作序列，只执行第一个动作后重新规划。论文在 6 个视觉 DeepMind Control 任务中，用约 $10^3$ 个 episode 达到或超过无模型 D4PG 约 $10^5$ 个 episode 的表现；“约 200 倍数据效率”来自学习曲线的量级比较，不应解释为所有任务严格同倍率。

### 2. Dreamer 1–3：把在线规划摊销为想象中的 actor–critic

[Dreamer](https://arxiv.org/abs/1912.01603) 沿用连续高斯 RSSM，但改变了模型的使用方式。它从真实 replay 编码状态，在模型中 rollout 多步潜轨迹，再用预测奖励和价值训练 actor–critic。actor 最大化想象回报，critic 拟合多步 $\lambda$-return；部署时直接执行 actor，不再像 PlaNet 那样对每一步运行 CEM。20 个视觉控制任务上，Dreamer 的平均得分为 823.39，高于论文重跑的 PlaNet 332.97，也高于使用约 20 倍真实交互的 D4PG 786.32。不过这些比较来自论文统一实现与当时协议，不能跨后续 benchmark 直接换算。

[DreamerV2](https://arxiv.org/abs/2010.02193) 的核心变化是将连续潜变量替换为 32 组、每组 32 类的离散随机变量，并用 straight-through gradient 训练。其 KL balancing 把 posterior 学习先验和先验追随 posterior 的梯度分开：

$$
\mathcal L_{\mathrm{KL}}
=\alpha\,\mathrm{KL}[\operatorname{sg}(q)\|p]
 +(1-\alpha)\,\mathrm{KL}[q\|\operatorname{sg}(p)].
$$

这套设计在 Atari 上用视觉输入统一学习，human-normalized median 为 2.15，论文对比中的 IQN 为 1.29、Rainbow 为 1.47。55 个游戏分别训练 55 个 agent，因此它证明的是“同一算法配方跨任务稳定”，不是“一套权重同时玩 55 个游戏”。

[DreamerV3](https://doi.org/10.1038/s41586-025-08744-2) 将可扩展性更多归因于数值与优化配方：离散 RSSM、KL free bits、1% uniform mixture、symlog 变换、two-hot 回归、基于回报分位数跨度的归一化，以及对 actor、critic 和 world model 更稳健的损失设计。论文用同一组超参数分别覆盖 8 个领域、150 余项任务；Atari 100k 的 median 为 830%，视觉 DeepMind Control 平均 802，并在 Minecraft 中让 10/10 个独立训练种子获得钻石。这里的“通用”仍指无需逐域调参，并非一个跨域共享参数的基础 agent。

![Dreamer 的世界模型与想象 actor–critic](/images/literature-notes/world-model-survey/dreamerv3-imagination-loop.png)

*图 1｜DreamerV3 的两条训练闭环：左侧从真实经验学习世界模型，右侧在模型想象轨迹中训练 actor–critic；部署时只需 actor。来源：[原论文图 1](https://www.nature.com/articles/s41586-025-08744-2.pdf#page=2)。*

### 3. Dreamer 4：从 RSSM 转向可扩展视频 Transformer

[Dreamer 4](https://arxiv.org/abs/2509.24527) 是架构层面的断点，而不是 DreamerV3 的小修。它用因果 tokenizer 压缩视频，使用 shortcut-forcing Transformer 预测未来 token，并增加任务、策略、奖励和价值头；在冻结行为克隆先验的约束下，从固定离线数据生成想象轨迹并做强化学习。约 2B 参数的模型在 2541 小时 Minecraft 人类视频上训练，1000 次独立 episode 中有 0.7% 获得钻石，成功 episode 平均约 20.7 分钟；H100 上生成速度约 21 FPS。

但这项结果截至本文日期仍是 arXiv v1 预印本，未发现官方代码，训练最高使用 1024 个 TPU，成功率也说明长时程鲁棒性仍远未解决。它展示了“视频预测器可以成为离线想象 RL 的底座”，尚未证明该配方能普遍迁移到机器人控制。

### 4. MuZero 与 TD-MPC2：不重建像素也可以是世界模型

[MuZero](https://doi.org/10.1038/s41586-020-03051-4) 只学习对规划有用的隐状态：

$$
s^0=h_\theta(o_{1:t}),\qquad
(r^k,s^k)=g_\theta(s^{k-1},a^k),\qquad
(p^k,v^k)=f_\theta(s^k).
$$

模型不承担像素重建，而是预测奖励、价值和策略先验；每个真实环境步在隐模型上执行 MCTS，并用搜索访问分布反过来监督策略头。它在 Go、国际象棋、将棋与 57 个 Atari 游戏中证明了 value-equivalent model 的有效性。200M frame 的 MuZero Reanalyze 在 Atari 上取得 731.1% median human-normalized score，但每个 Atari 游戏的训练仍使用 8 个 TPU，self-play 使用 32 个 TPU；动力学为确定性，也没有覆盖不完美信息和真实机器人。论文只发布了伪代码与超参数，第三方复现不应标作官方实现。

[TD-MPC2](https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html) 面向连续控制，联合学习 encoder、潜动力学、奖励、terminal Q 与 policy prior，并通过 SimNorm、离散化 reward/value 回归和 Q ensemble 提升稳定性。部署时用 MPPI 优化短动作序列，目标是预测奖励加 horizon 末端 Q；每步只执行首动作并闭环重规划。80 任务离线多任务实验中，模型从 1M 参数的 16.0 分扩展到 317M 参数的 70.6 分。关键消融更能说明机制：仅 policy 得 42.2，仅 planning 得 53.7，planning 加 policy 得 54.2，因而行为主要来自决策时规划，policy 只是采样先验。

TD-MPC2 覆盖 104 个在线连续控制任务和 80 个离线多任务任务，但全部为仿真，视觉设置仅包含少量 $64\times64$ 任务。它需要人工任务奖励，MPPI 也局限于连续动作；论文明确提醒 reward misspecification、离线覆盖不足和真机安全风险。

### 5. JEPA：预测“可预测的抽象”，而不是每个像素

[JEPA 立场文章](https://openreview.net/forum?id=BZ5a1r-kVsf) 提议：与其生成观测空间里所有不可预测细节，不如在表征空间预测与任务有关、结构更稳定的未来。抽象地写，context encoder 生成 $z_x$，target encoder 生成 $z_y$，predictor 用 context、mask 或动作预测目标：

$$
\hat z_y=P(z_x,m,a),\qquad
\mathcal L_{\mathrm{pred}}=d(\hat z_y,z_y).
$$

但仅最小化距离存在常数解：若两个 encoder 都输出同一向量，损失也可以为零。不同 JEPA 工作的关键差异，恰恰是如何防止这种坍塌，以及何时加入动作。

| 方法 | 防坍塌机制 | 预训练是否含动作 | 能否直接规划 |
|---|---|---:|---:|
| I-JEPA / V-JEPA | EMA target encoder、stop-gradient、上下文与目标遮挡 | 否 | 否 |
| V-JEPA 2-AC | 冻结视频 encoder，再训练动作条件 predictor | 是，后训练阶段 | 是 |
| DINO-WM | 冻结 DINOv2 patch 表征，只学习动力学 | 是 | 是 |
| LeJEPA / LeWorldModel | SIGReg 约束投影分布，后者同时学动力学 | 仅 LeWorldModel | 仅 LeWorldModel |

#### I-JEPA 与 V-JEPA：它们首先是表征学习器

[I-JEPA](https://doi.org/10.1109/CVPR52729.2023.01499) 从同一张图像选取一个较大的 context，以及多个语义尺度 target block，在潜空间预测被遮挡区域。它不做像素重建，也不依赖手工数据增强。ViT-H/14 的 ImageNet 线性评估达到 79.3%，但论文没有时间轴、动作输入或闭环控制，因此不能把 I-JEPA 直接称为机器人世界模型。官方仓库被归档只表示代码进入只读维护状态，不等于论文撤回。

[V-JEPA](https://arxiv.org/abs/2404.08471) 把这一原则扩展到视频：context encoder 只看未遮挡的时空 tube，EMA target encoder 产生完整视频特征，predictor 重建被遮挡的 target embedding。它用约 200 万段无标签视频训练，不使用动作、文本或像素 decoder；在冻结表征的 attentive probe 下，Kinetics-400 为 81.9、Something-Something-v2 为 72.2，ImageNet 线性评估为 77.9。这些结果证明动作理解与运动表征较强，却不等于模型已经学会“给定机器人动作后的未来”。

#### V-JEPA 2 与 V-JEPA 2-AC：视频知识和机器人动力学分阶段学习

[V-JEPA 2](https://arxiv.org/abs/2506.09985) 先从超过 100 万小时互联网视频和约 100 万张图像中学习 action-free 表征；随后冻结 encoder，用少于 62 小时、约 2.3 万条 DROID 轨迹训练约 300M 参数的 action-conditioned predictor，得到 V-JEPA 2-AC。规划时，CEM 搜索动作序列，使预测终态 embedding 靠近给定目标图像，再执行首动作并重规划。

![V-JEPA 2 的表征预训练与动作条件后训练](/images/literature-notes/world-model-survey/vjepa2-overview.png)

*图 2｜V-JEPA 2 的两阶段路线：先从大规模无动作视频学习视觉世界表征，再用少量带动作机器人轨迹训练 V-JEPA 2-AC predictor。只有第二阶段后的模型能进行动作条件规划。来源：[原论文图 1](https://arxiv.org/pdf/2506.09985#page=2)。*

两台不同实验室的 Franka 机械臂上，V-JEPA 2-AC 的平均成功率为：reach 100%，杯/盒 grasp 65%/25%，持物 reach 75%/75%，杯/盒 pick-and-place 80%/65%。每个实验室每项仅 10 次 trial；pick-and-place 还依赖人工给出的两个中间图像子目标，并非从最终目标自主完成长时规划。单张 RTX 4090 上每个动作约需 16 秒，说明“潜空间比视频生成规划快”成立，但还不是实时控制。

#### DINO-WM：冻结通用视觉表征，只学习动作动力学

[DINO-WM](https://proceedings.mlr.press/v267/zhou25t.html) 不再端到端训练视觉 encoder，而是冻结 DINOv2 patch tokens，用 Transformer 学习动作条件的下一时刻特征。给定目标图像后，CEM 最小化预测终态与目标的 patch-level 特征距离。6 个仿真环境中，主要成功率包括 Maze 0.98、Wall 0.96、Reacher 0.92、PushT 0.90；在 PushT 中，patch token 为 0.90，而只用 CLS token 降到 0.44，说明空间控制依赖局部特征，而不是单个全局语义向量。

这条路线把互联网视觉预训练与机器人动力学学习清楚分工，但结果依赖外部 DINOv2 预训练，规划仍较慢，且实验全为仿真。所谓 reward-free 指不使用任务奖励，不代表不需要动作轨迹或目标图像。

#### LeJEPA 与 LeWorldModel：用 SIGReg 取代 teacher–student 防坍塌

[LeJEPA](https://arxiv.org/abs/2511.08544) 用 Sketched Isotropic Gaussian Regularization（SIGReg）约束随机投影后的 embedding 接近各向同性高斯，从而不依赖 EMA teacher 或 stop-gradient。它在 10 余个数据集、60 余种架构设置中检验目标的稳定性，ViT-H 的 ImageNet 线性评估约 79%。但 LeJEPA 本身仍是图像表征方法，不包含动作条件转移或 planner。

[LeWorldModel](https://arxiv.org/abs/2603.19312) 才把 SIGReg 放进动作条件世界模型。约 5M 参数的 ViT-T encoder 将每帧压为一个 192 维 token，约 10M 参数的 predictor 预测下一潜状态：

$$
\mathcal L
=\|P(E(o_t),a_t)-E(o_{t+1})\|_2^2
+\lambda\,\mathrm{SIGReg}(E(o)),\qquad \lambda=0.1.
$$

它无需预训练、EMA、stop-gradient 或 decoder。规划时用 CEM 搜索 300 条候选动作序列，以预测终态与目标图像 embedding 的距离为能量；PushT 使用 30 轮更新，规划 horizon 为 5。

![LeWorldModel 的端到端 JEPA 训练](/images/literature-notes/world-model-survey/lewm-training.png)

*图 3｜LeWorldModel 同时训练视觉 encoder 和动作条件 predictor，以下一状态表征误差学习动力学，并用 SIGReg 避免表征坍塌；虚线模块只在训练期使用。来源：[原论文图 1](https://arxiv.org/pdf/2603.19312#page=1)。*

在 TwoRoom、Reacher、PushT、OGBench-Cube 上，LeWorldModel 成功率分别为 87%、86%、96%、74%；对应 DINO-WM 为 100%、79%、74%、86%，不存在单一方法全胜。单帧单 token 让一次规划从 DINO-WM 的约 47 秒降到 0.98 秒，约快 48 倍，但主要原因是 token 数量大幅减少，而不是规划算法改变。代价是方位与局部几何可能被压掉。所有实验仍为仿真，目标图像从同一条离线轨迹的后续帧抽取，且论文截至本文日期为 arXiv v3 预印本；这些条件不支持“已解决开放世界真机规划”的外推。

### 6. Genie：会生成可交互世界，不等于会在世界中行动

[Genie](https://proceedings.mlr.press/v235/bruce24a.html) 从无动作标签视频中学习三部分：ST-ViViT video tokenizer 将帧压成离散 token；Latent Action Model（LAM）把相邻帧变化量化为 8 个 latent action；decoder-only MaskGIT dynamics 根据历史 token 和 latent action 生成下一帧。

![Genie 的可交互环境架构](/images/literature-notes/world-model-survey/genie-architecture.png)

*图 4｜Genie 的三模块架构：视频 tokenizer、从帧间变化发现动作的 LAM，以及动作条件 MaskGIT dynamics。部署时用户选择 latent action，LAM 本身不再参与。来源：[原论文图 3](https://proceedings.mlr.press/v235/bruce24a/bruce24a.pdf#page=4)。*

主模型约 10.7B 参数，论文四舍五入称 11B。Platformers 原始检索库约 24.4 万小时，经质量筛选后实际主训练集约 3 万小时；这两个数字不能混用。冻结 LAM 后，CoinRun 模仿实验用 200 条专家视频即可接近 oracle behavior cloning，说明 latent action 具有一定跨视频一致性，但它只是给专家视频补伪动作标签，并不代表 Genie 自己完成了强化学习。

Genie 的输出是可交互的生成环境：用户或另一个 agent 必须选择动作。它没有奖励、价值、actor 或 planner。论文也明确指出模型只有 16 帧记忆、约 1 FPS，长时会幻觉，且未发布 checkpoint、数据或官方代码。因此，“能生成下一帧”与“能支持可靠长期控制”仍是两件事。

### 7. DayDreamer：Dreamer 路线的真机可行性验证

[DayDreamer](https://proceedings.mlr.press/v205/wu23c.html) 基于 DreamerV2 的离散 RSSM，把 RGB、深度和本体感觉编码进随机潜状态；world model 从 replay 学习重建、动力学和奖励，actor–critic 则在想象轨迹中学习。机器人数据采集和 learner 异步运行，策略权重周期同步。上真机时直接执行 actor，不进行 MCTS、CEM 或 MPC。

四项实验展示了在线世界模型 RL 的可行性：A1 四足约 1 小时学会前进；UR5 在 8 小时后达到约 2.5 objects/min；XArm 在 10 小时后达到约 3.1 objects/min；Sphero 不到 2 小时将平均目标距离降到约 0.15。与此同时，A1 主要是单次长跑，机械臂任务使用人工设计的动作限制、奖励和工程辅助，训练过程需要人工维修，Sphero 与 DrQ-v2 表现相近。它证明“可以在真实机器人上在线训练”，没有证明这种方法已经能零样本迁移到开放任务。

## 主要发现

### 1. Dreamer 系列真正演进的是模型使用方式与稳定性

| 工作 | 潜状态/预测器 | 如何得到行为 | 主要突破 | 仍未解决 |
|---|---|---|---|---|
| World Models | VAE + MDN-RNN | 在模型中用 CMA-ES 训练线性策略 | 建立潜世界概念 | 分阶段训练、模型漏洞 |
| PlaNet | 连续 RSSM | 测试时 CEM | 从像素做样本高效规划 | 每步搜索昂贵 |
| Dreamer | 连续 RSSM | 想象 actor–critic | 把规划摊销进策略 | 跨域稳定性 |
| DreamerV2 | 离散 RSSM | 想象 actor–critic | Atari 规模与离散表征 | 每任务仍单独训练 |
| DreamerV3 | 离散 RSSM + 稳健数值配方 | 想象 actor–critic | 一套超参数跨多域 | 算力、长期误差、安全 |
| Dreamer 4 | 视频 tokenizer + Transformer | 离线想象 RL + BC prior | 扩展到长视频数据 | 预印本、成功率低、未开放代码 |

从 PlaNet 到 Dreamer 的关键不是“模型更会重建图像”，而是将每个真实环境步的优化，变成训练阶段可重复采样的想象轨迹。由此换来更快部署，也把风险从 planner 利用模型误差，转成 actor 在训练时内化模型误差。两者都需要分布外检测与保守机制，只是发生位置不同。

### 2. 决策时搜索和想象 actor 是两种互补的计算分配

| 机制 | 代表模型 | 优点 | 代价 |
|---|---|---|---|
| MCTS | MuZero | 离散动作、长视野推演，搜索可改进策略 | 每步大量模拟，模型偏差可被深搜放大 |
| CEM/MPPI | PlaNet、TD-MPC2、DINO-WM、LeWorldModel | 可根据新目标即时重规划 | 动作维度与 horizon 增长时搜索迅速变难 |
| 想象 actor | Dreamer、DayDreamer | 部署仅一次网络前向，适合高频控制 | 新目标通常需要重新训练或显式条件化 |
| 外部控制 | Genie | 环境与 agent 解耦，可供人或策略交互 | 模型自身不会选择动作 |

MuZero 与 TD-MPC2 都是 reward-aware：前者用 MCTS，后者用 MPPI。DINO-WM 与 LeWorldModel 则是 reward-free、goal-conditioned：不需要奖励标签，但需要目标图像，并以终态潜距离定义任务。DayDreamer 是 reward-aware、无部署时搜索。把这些方法都写成“在世界模型里规划”会掩盖最重要的算法差异。

### 3. 表征粒度决定控制上限，也决定规划成本

DINO-WM 的 PushT 消融表明，空间任务需要 patch-level 特征；LeWorldModel 把一帧压成一个 token，换来约 48 倍规划加速，却在包含复杂三维姿态的 OGBench-Cube 上落后 DINO-WM。这里不存在免费的压缩：全局 token 适合目标语义与粗粒度运动，局部 token 更适合接触、遮挡与姿态，但候选轨迹的计算和内存随 token 数增长。

像素生成则位于另一端。Genie 能把预测解码成人可观察视频，便于交互和诊断，却要建模纹理、光照等大量与控制无关的不确定细节。MuZero 只保留 reward/value/policy，效率高但无法验证隐状态是否保持了任务外物理规律。实际系统更可能需要分层表示：慢速语义与任务状态、快速局部几何与接触状态，以及只在需要解释或数据生成时启用的 decoder。

### 4. “无动作视频预训练 + 少量动作数据”正在成为可行折中

V-JEPA 2-AC 给出目前最清晰的两阶段证据：互联网视频负责视觉与运动先验，少于 62 小时机器人轨迹负责将表征变为可干预动力学。相比直接在小型机器人数据上端到端学像素模型，这种分工更有扩展潜力。但动作语义不能仅从旁观视频中被唯一识别；真正的控制仍需带动作轨迹校准。Genie 的 latent action 可以从视频发现可交互因素，却仍需小量真实动作映射，且没有自动获得任务策略。

### 5. 现有实验不能放在一张排行榜里

| 论文 | 核心证据 | 能支持的结论 | 不能支持的外推 |
|---|---|---|---|
| DreamerV3 | 150+ 游戏/仿真任务，同一超参分别训练 | 算法配方跨域稳定 | 单一通用权重、真机安全 |
| MuZero | 棋类与 Atari，大规模搜索/自博弈 | 控制等价隐模型可支持强规划 | 可解释物理模型、低算力部署 |
| V-JEPA | 冻结 probe 的视频理解 | action-free 表征含运动语义 | 动作条件预测、闭环控制 |
| V-JEPA 2-AC | 两个实验室真机、小样本 trial | 少量动作后训练可激活规划 | 长时自主任务、实时控制 |
| DINO-WM / LeWorldModel | 目标图像仿真规划 | reward-free 潜规划有效 | 开放世界真机、语言目标 |
| Genie | 可控视频生成与 latent-action 一致性 | 无动作标签视频可学交互环境 | 模型自带策略或可靠物理 |
| DayDreamer | 4 个工程化真机任务 | 在线世界模型 RL 在真机可行 | 跨任务、跨机器人普适优势 |

## 局限与适用边界

### 1. 长时闭环误差仍是共同短板

一步预测误差小，不代表多步 rollout 可靠。actor、MCTS 或 CEM 会主动访问普通数据很少覆盖的状态，并可能利用模型漏洞。World Models 的低温 Doom 实验、MuZero 在 Atari 上随搜索加深而早早平台化、V-JEPA 2 对人工子目标的依赖，以及 Genie 的短记忆幻觉，都是同一问题的不同表现。现有方法缺少统一的分布外检测、误差上界或在不确定时退回保守控制的机制。

### 2. “reward-free”不等于“无监督”

DINO-WM 与 LeWorldModel 不需要奖励，却需要带动作的离线轨迹和目标图像；V-JEPA 2-AC 也必须用 DROID 动作后训练。Genie 可以从无动作视频发现 latent action，但将它映射到真实控制仍需少量动作标签。真正从互联网旁观视频恢复可执行、可跨 embodiment 对齐的动作语义，尚未解决。

### 3. 任务相关性与通用物理之间存在张力

MuZero 只预测 reward/value/policy，极其任务相关，却可能丢失换任务后需要的物理变量；像素模型保留更多信息，又将大量容量浪费在纹理和随机细节上；JEPA 选择可预测表征，但 encoder 可能忽略对当前 probe 无关、对未来接触控制关键的信息。现有 benchmark 很难判断潜状态学到的是一般动力学，还是只足够通过特定任务。

### 4. 计算位置不同，成本并没有消失

Dreamer 把部署时搜索转移到训练期大量想象；MuZero 和 TD-MPC2 把更多算力留到决策时；Dreamer 4 与 Genie 把成本前置到大规模视频模型训练。V-JEPA 2-AC 每个动作仍约 16 秒，LeWorldModel 的 0.98 秒也不是高频真机控制。比较“效率”必须同时报告训练数据、训练算力、环境交互、单步推理、规划预算和控制频率。

### 5. 证据主要来自仿真与工程化任务

DreamerV3、MuZero、TD-MPC2、DINO-WM 与 LeWorldModel 的主证据来自游戏或仿真。DayDreamer 和 V-JEPA 2-AC 提供真机结果，但任务少、trial 少、目标和动作空间经过工程化。真实环境中的遮挡、传感器失效、非平稳动力学、硬件磨损、人类共处和安全约束尚未被同一套协议系统验证。

### 6. 开放性和出版状态不一致

DreamerV3、MuZero、I-JEPA、V-JEPA、DINO-WM、Genie 与 DayDreamer已有同行评审记录；Dreamer 4、V-JEPA 2、LeJEPA 与 LeWorldModel 截至检索日仍是预印本。Genie 不开放训练数据、权重或代码，MuZero 没有官方端到端训练实现，Dreamer 4 也未发现官方代码。综述中的最新路线应视为高价值研究信号，而不是已经稳定复现的事实标准。

## 我的思考

### 1. 应按“决策功能”定义世界模型，而不是按输出模态

判断一个模型是否适合控制，最有用的问题不是“它能不能生成漂亮视频”，而是：

- 给定候选动作，它能否预测会改变决策的后果？
- 预测误差能否被 planner 或 actor 感知，而不是被利用？
- 新目标到来时，系统能否无需重新收集大量奖励数据就改变行为？
- 模型保留了哪些状态，又有意忽略了哪些状态？

这个定义能同时容纳 MuZero 的非生成隐模型与 Genie 的生成环境，并避免把所有视频预测器都自动称为 agent。

### 2. 更可扩展的路线可能是“表征预训练—动作校准—任务规划”三阶段

V-JEPA 2-AC 展示了一个值得继续验证的分工：

1. 用大规模无动作视频学习对象、运动和场景先验；
2. 用相对少量机器人轨迹识别动作如何改变潜状态；
3. 在具体任务上用 reward、目标图像或语言定义代价。

它比“所有能力都从昂贵机器人数据端到端学习”更现实，也比“旁观视频自然会产生控制能力”更诚实。下一步关键是检验动作校准能否跨机器人形态共享，以及互联网视频先验是否真的减少接触丰富任务所需的真机数据。

### 3. 规划计算应当按不确定度自适应

PlaNet、MuZero 与 TD-MPC2 固定每步搜索预算，Dreamer 固定直接执行 actor。更合理的系统可能采用双速率路径：熟悉状态由摊销策略快速响应；模型分歧、目标冲突或 OOD 状态触发更昂贵的树搜索、轨迹优化或像素级模拟。这样，world model 不只是动作生成器，也成为“何时应该慢下来思考”的不确定度接口。

### 4. 未来 benchmark 必须同时测三类忠实性

- **动力学忠实性**：动作干预后，潜状态或观测是否按真实世界演化；
- **决策忠实性**：更好的预测是否真的提高闭环回报、安全与恢复能力；
- **表征忠实性**：目标距离、reward/value 与人类希望优化的任务是否一致。

单看 reconstruction、FVD、probe accuracy 或 open-loop success 都不足够。更强的评测应包含可控反事实、分布外目标、长时闭环、模型不确定度、真机故障恢复与统一计算预算。

## 结论

从 World Models、PlaNet 到 Dreamer 1–3，主线是把潜动力学从模块化模拟器变成稳定的想象 actor–critic；Dreamer 4 则把这条路线推进到大规模生成视频 Transformer 和离线想象 RL。MuZero、TD-MPC2 证明世界模型无需重建像素，只要保留决策等价信息即可支持搜索。I-JEPA、V-JEPA 与 LeJEPA 重新定义了表征预测，但只有加入动作条件转移的 V-JEPA 2-AC、DINO-WM 和 LeWorldModel 才能真正规划。Genie 则代表另一条分支：它学习可交互环境，却把行动选择留给外部 agent。

当前最稳妥的结论不是哪一种架构已经胜出，而是三个设计问题必须被分开回答：**模型学什么、行为怎样产生、证据在什么闭环条件下成立。** 未来的通用世界模型需要同时拥有可扩展的无监督表征、少量动作数据即可校准的因果动力学、按目标与不确定度调用的规划机制，以及公开可复现的长期真实世界评测。

## 参考文献

1. Ha, D., & Schmidhuber, J. *World Models*. Advances in Neural Information Processing Systems 31, 2018. [NeurIPS](https://proceedings.neurips.cc/paper/2018/hash/2de5d16682c3c35007e4e92982f1a2ba-Abstract.html) · [代码](https://github.com/hardmaru/WorldModelsExperiments)
2. Hafner, D., Lillicrap, T., Fischer, I., et al. *Learning Latent Dynamics for Planning from Pixels*. Proceedings of ICML, PMLR 97:2555–2565, 2019. [PMLR](https://proceedings.mlr.press/v97/hafner19a.html) · [代码](https://github.com/google-research/planet)
3. Hafner, D., Lillicrap, T., Ba, J., & Norouzi, M. *Dream to Control: Learning Behaviors by Latent Imagination*. ICLR, 2020. [arXiv](https://arxiv.org/abs/1912.01603) · [代码](https://github.com/danijar/dreamer)
4. Hafner, D., Lillicrap, T., Norouzi, M., & Ba, J. *Mastering Atari with Discrete World Models*. ICLR, 2021. [arXiv](https://arxiv.org/abs/2010.02193) · [代码](https://github.com/danijar/dreamerv2)
5. Hafner, D., Pasukonis, J., Ba, J., & Lillicrap, T. *Mastering Diverse Control Tasks through World Models*. Nature 640, 647–653, 2025. [DOI](https://doi.org/10.1038/s41586-025-08744-2) · [代码](https://github.com/danijar/dreamerv3)
6. Hafner, D., Yan, W., & Lillicrap, T. *Training Agents Inside of Scalable World Models*. arXiv:2509.24527v1, 2025. [arXiv](https://arxiv.org/abs/2509.24527)
7. Schrittwieser, J., Antonoglou, I., Hubert, T., et al. *Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model*. Nature 588, 604–609, 2020. [DOI](https://doi.org/10.1038/s41586-020-03051-4)
8. Hansen, N., Su, H., & Wang, X. *TD-MPC2: Scalable, Robust World Models for Continuous Control*. ICLR, 2024. [ICLR](https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html) · [代码](https://github.com/nicklashansen/tdmpc2)
9. LeCun, Y. *A Path Towards Autonomous Machine Intelligence*. OpenReview working paper v0.9.2, 2022. [OpenReview](https://openreview.net/forum?id=BZ5a1r-kVsf)
10. Assran, M., Duval, Q., Misra, I., et al. *Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture*. CVPR, 15619–15629, 2023. [DOI](https://doi.org/10.1109/CVPR52729.2023.01499) · [代码](https://github.com/facebookresearch/ijepa)
11. Bardes, A., Garrido, Q., Ponce, J., et al. *Revisiting Feature Prediction for Learning Visual Representations from Video*. Transactions on Machine Learning Research, 2024. [OpenReview](https://openreview.net/forum?id=QaCCuDfBk2) · [代码](https://github.com/facebookresearch/jepa)
12. Assran, M., Bardes, A., Fan, D., et al. *V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning*. arXiv:2506.09985v1, 2025. [arXiv](https://arxiv.org/abs/2506.09985) · [代码](https://github.com/facebookresearch/vjepa2)
13. Zhou, G., Pan, H. Q., LeCun, Y., & Pinto, L. *World Models on Pre-trained Visual Features Enable Zero-shot Planning*. Proceedings of ICML, PMLR 267, 2025. [PMLR](https://proceedings.mlr.press/v267/zhou25t.html) · [代码](https://github.com/gaoyuezhou/dino_wm)
14. Balestriero, R., & LeCun, Y. *LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics*. arXiv:2511.08544v3, 2025. [arXiv](https://arxiv.org/abs/2511.08544) · [代码](https://github.com/galilai-group/lejepa)
15. Maes, L., Le Lidec, Q., Scieur, D., LeCun, Y., & Balestriero, R. *LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels*. arXiv:2603.19312v3, 2026. [arXiv](https://arxiv.org/abs/2603.19312) · [代码](https://github.com/lucas-maes/le-wm)
16. Bruce, J., Dennis, M. D., Edwards, A., et al. *Genie: Generative Interactive Environments*. Proceedings of ICML, PMLR 235:4603–4623, 2024. [PMLR](https://proceedings.mlr.press/v235/bruce24a.html)
17. Wu, P., Escontrela, A., Hafner, D., Goldberg, K., & Abbeel, P. *DayDreamer: World Models for Physical Robot Learning*. Proceedings of CoRL 2022, PMLR 205:2226–2240, 2023. [PMLR](https://proceedings.mlr.press/v205/wu23c.html) · [代码](https://github.com/danijar/daydreamer)
