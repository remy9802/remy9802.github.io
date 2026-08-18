---
title: "具身智能算法图谱：VLA、世界动作模型与真机强化学习"
date: 2026-08-18
permalink: /posts/embodied-ai-algorithm-landscape/
tags: [literature-note, embodied-ai, vision-language-action, world-model, world-action-model, real-robot-rl]
note_type: topic-synthesis
literature_topics: [embodied-ai, vla, wam, world-model, real-robot-rl]
---

> **阅读范围**：截至 2026-08-18，对具身操作领域的通用 VLA、世界动作模型（WAM）和真机强化学习进行定向检索。重点覆盖 π0、π0.5、π0.6/π*0.6、π0.7、GR00T N1/N1.7、DreamZero、Fast-WAM、HIL-SERL 与 RL Token，并补充 Faster-WAM、WCM 和 AutoSERL。本文是算法路线图，不是穷尽全部数据库的系统综述。

## 核心结论

1. **具身基础模型正在形成三条互补路线。** π 系列和 GR00T 主要扩大 VLA 的数据、动作接口与跨本体能力；DreamZero、Fast-WAM 和 Faster-WAM 用视频生成学习物理动态；HIL-SERL、π*0.6、RL Token、WCM 与 AutoSERL 则让策略在真实硬件上从成功、失败和干预中继续改进。
2. **世界模型不等于世界动作模型。** 世界模型学习环境随动作演化的动力学；WAM 进一步把未来视觉状态与动作生成耦合成策略。DreamZero在推理时显式生成未来，Fast-WAM 只在训练时保留视频预测，Faster-WAM 则重新证明分布外场景需要未来表征，并用稀疏交互降低开销。
3. **“真机实验”不等于“真机强化学习”。** DreamZero 和 Fast-WAM 在真实机器人上评测，但训练核心仍是模仿/视频联合建模；HIL-SERL、π*0.6、RL Token、WCM 和 AutoSERL 才使用在真实机器人上采集的在线或近在线经验更新策略或价值模型。
4. **通用策略与在线 RL 正在分工。** 通用 VLA 提供视觉语义、任务先验和基本动作；轻量 actor–critic、advantage conditioning 或 history-aware critic 专门优化最后几厘米的接触、速度和恢复行为。这比在真机上端到端更新数十亿参数更现实。
5. **开放性和证据等级差异很大。** π0、π0.5、GR00T N1/N1.7、DreamZero、Fast-WAM、HIL-SERL、WCM、AutoSERL 有官方代码；π0.6 是模型卡而非独立论文，GR00T N1.7 是版本发布而非新论文；截至检索日，π0.7、π*0.6 和 RL Token 没有官方完整训练代码。不能把产品版本、技术报告和同行评审论文混为一谈。

## 检索记录

- **检索日期**：2026-08-18。
- **检索来源**：arXiv、Robotics: Science and Systems Proceedings、Science Robotics/PubMed、OpenReview、论文项目页、作者或机构官方 GitHub、Physical Intelligence 与 NVIDIA 官方技术页面。
- **核心检索式**：
  - `embodied AI AND (vision-language-action OR VLA OR robot foundation model)`
  - `(world model OR world action model OR video diffusion) AND robot manipulation`
  - `(real-world OR real-robot OR on-robot) AND reinforcement learning AND manipulation`
  - `pi0 pi0.5 pi0.6 pi0.7 GR00T N1.7 DreamZero Fast-WAM HIL-SERL RL Token`
- **纳入标准**：可获得论文、模型卡或机构技术页全文；方法对具身操作算法有清晰贡献；包含真实机器人证据、公开基准，或是指定模型系列的重要版本；链接与代码状态可以核验。
- **排除原则**：只有新闻转述、没有一手技术资料的条目不纳入；社区复现不冒充官方代码；只在仿真训练后部署而未在真机继续学习的方法不标为“真机强化学习”。
- **检索性质**：定向、迭代式检索。2026 年条目更新很快，发布状态与代码开放程度以本页日期为准。

### 条目状态与检索标签

| 条目 | 一手资料状态 | 官方代码 | 检索标签 |
|---|---|---|---|
| π0 | RSS 2025 论文 | [openpi](https://github.com/Physical-Intelligence/openpi) | 具身、VLA |
| π0.5 | CoRL 2025 论文 | [openpi](https://github.com/Physical-Intelligence/openpi) | 具身、VLA |
| π0.6 | Physical Intelligence 模型卡 | 未公开完整版本 | 具身、VLA |
| π*0.6 / RECAP | arXiv 论文与机构技术页 | 未公开 | 具身、VLA、真机强化学习 |
| π0.7 | arXiv 预印本与机构技术页 | 未公开 | 具身、VLA |
| GR00T N1 / N1.7 | N1 为 arXiv 论文；N1.7 为模型版本 | [Isaac-GR00T](https://github.com/NVIDIA/Isaac-GR00T) | 具身、VLA、人形机器人 |
| DreamZero | arXiv 预印本、ICLR 2026 World Models Workshop | [dreamzero](https://github.com/dreamzero0/dreamzero) | 具身、WAM、世界模型 |
| Fast-WAM | arXiv 预印本 | [FastWAM](https://github.com/yuantianyuan01/FastWAM) | 具身、WAM、世界模型 |
| Faster-WAM | arXiv 预印本 | [FasterWAM](https://github.com/hustvl/FasterWAM) | 具身、WAM、世界模型 |
| HIL-SERL | Science Robotics 2025 | [hil-serl](https://github.com/rail-berkeley/hil-serl) | 具身、真机强化学习、人类干预 |
| RL Token | arXiv 预印本与机构技术页 | 未公开官方代码 | 具身、VLA、真机强化学习 |
| WCM | arXiv 预印本 | [WCM](https://github.com/sylvestf/WCM) | 具身、世界模型、真机强化学习 |
| AutoSERL | ECCV 2026；arXiv 预印本 | [AutoSERL](https://github.com/autoserl/AutoSERL) | 具身、真机强化学习、自动干预 |

## 研究问题

本轮阅读围绕五个问题：

1. 通用 VLA 如何把视觉、语言、本体状态和连续动作统一起来？
2. 模型如何跨机器人本体、场景、物体和长时任务泛化？
3. 未来视频预测究竟在训练时提供表征监督，还是必须在推理时参与动作生成？
4. 如何让数十亿参数的 VLA 在真实机器人上用少量经验高效、安全地强化？
5. 不同论文的“成功率、任务进度、吞吐量、延迟”分别在什么条件下成立，能否直接比较？

## 研究背景

纯模仿学习策略通常把机器人控制写成条件分布

$$
\pi(a_{t:t+H}\mid o_t, s_t, l),
$$

其中 $o_t$ 是视觉观测，$s_t$ 是本体状态，$l$ 是语言指令，输出是长度为 $H$ 的 action chunk。它能从示范中学到“平均正确”的动作，但对示范覆盖之外的接触状态、失败恢复和速度优化较弱。

三条路线从不同位置补这个缺口：

| 路线 | 学习对象 | 典型监督 | 推理输出 | 主要优势 | 主要代价 |
|---|---|---|---|---|---|
| VLA | 从视觉/语言到动作的策略 | 多机器人示范、网页图文、高层子任务 | 连续动作、离散动作 token 或 diffusion/flow action | 语义泛化、跨任务共享 | 容易继承示范偏差，物理动态多为隐式学习 |
| 世界模型 / WAM | 动作条件下的未来状态与动作 | 视频、机器人轨迹、未来帧 | 未来视觉 + 动作，或只保留未来表征 | 物理动态、跨本体视频迁移 | 视频生成昂贵，预测误差未必等价于控制误差 |
| 真机强化学习 | 用真实交互优化策略或价值函数 | 奖励、成功/失败、人工干预、优势估计 | 更新后的 actor/critic 或条件策略 | 精度、速度、恢复能力 | 真机时间、安全、重置和奖励工程 |

## 方法与数据

### 一、通用 VLA 与机器人基础模型

#### 1. π0：用 flow matching 连接 VLM 与连续动作

- **文献与代码**：[RSS 2025 正式页面](https://www.roboticsproceedings.org/rss21/p010.html) · [arXiv:2410.24164](https://arxiv.org/abs/2410.24164) · [openpi](https://github.com/Physical-Intelligence/openpi)
- **作者/机构/年份**：Kevin Black 等；Physical Intelligence；2024 预印本，2025 年 RSS 正式发表。
- **研究问题**：预训练 VLM 具有网页尺度的视觉语义知识，但自回归语言头不适合高频、连续、精细的机器人动作。怎样保留 VLM 的语义能力，同时生成流畅的连续控制？
- **方法**：π0 在约 3B 参数的 VLM 主干旁增加 action expert，通过 flow matching 从噪声恢复连续 action chunk。视觉和语言主干处理图像与指令，动作专家以主干特征、机器人状态和扩散时间为条件生成动作。模型在多种单臂、双臂和移动操作平台的数据上联合预训练，再通过少量高质量数据微调复杂任务。
- **实验**：论文覆盖 7 类机器人配置、68 个任务，包括叠衣、清桌和组装纸箱；比较直接提示、高层 VLM 指令和下游微调后的表现。官方随后开放基础权重及 ALOHA、DROID 等平台的示例检查点。
- **结论**：VLM + 连续生成式动作专家是通用机器人策略的一条有效接口，能同时容纳跨任务预训练和灵巧动作微调。
- **局限性**：训练数据中有大量内部数据；不同平台的动作空间仍需适配与归一化；原论文主要是模仿学习，不会从部署失败中自动改进。

#### 2. π0.5：异构协同训练与开放世界泛化

- **文献与代码**：[arXiv:2504.16054](https://arxiv.org/abs/2504.16054) · [论文 PDF](https://www.physicalintelligence.company/download/pi05.pdf) · [openpi](https://github.com/Physical-Intelligence/openpi)
- **作者/机构/年份**：Physical Intelligence、Kevin Black 等；Physical Intelligence；2025，CoRL 2025。
- **研究问题**：仅扩大目标机器人示范，很难覆盖新家庭中的新布局、物体与长时任务。能否把多机器人数据、网页知识和高层语义监督共同转移到移动操作？
- **方法**：π0.5 使用异构协同训练，把图像、语言、目标检测、网页图文、高层子任务预测和低层动作组织成混合多模态样本。同一个模型先低频生成“拿起盘子”等语义子任务，再高频根据当前观测与子任务生成连续动作，从而建立语言规划与动作执行的层级接口。
- **实验**：模型在完全未见过的家庭中执行清理厨房、卧室等长时任务；消融比较不同数据源和显式/隐式高层规划，显示跨来源知识迁移是泛化关键。
- **结论**：开放世界泛化不只依赖更多机器人轨迹，还依赖合理的数据接口，使非动作监督能进入策略学习。
- **局限性**：新家庭评测规模和数据主要由机构内部掌握；openpi 支持 π0.5 的 flow-matching 训练与推理，但不等于完整开放论文中的全部高层协同训练流水线。

#### 3. π0.6 与 π*0.6：从模型升级到 RECAP 真机强化

- **文献与代码**：[π0.6 模型卡](https://website.pi-asset.com/pi06star/PI06_model_card.pdf) · [π*0.6 / RECAP 论文](https://arxiv.org/abs/2511.14759) · [项目页](https://www.pi.website/blog/pistar06) · 官方完整训练代码未公开。
- **作者/机构/年份**：Physical Intelligence 团队；Physical Intelligence；2025。
- **研究问题**：π0.5 已能泛化，但实际部署还要求更高吞吐量、更低失败率和对边缘状态的恢复。怎样把示范、在线成功/失败、奖励与人工纠正统一用于 VLA 改进？
- **方法**：基础 π0.6 仍保留高层子任务和低层动作的层级设计，采用 Gemma 3 4B + 约 860M action expert、最多四路 448×448 图像，并以 Knowledge Insulation 同时学习 FAST 离散动作、连续 flow actions 和网页协同任务。π*0.6 使用 RECAP：先以 advantage conditioning 做通用离线 RL 预训练，再用下游示范微调，最后在真机上收集自主轨迹、奖励反馈和遥操作干预继续强化。
- **实验**：基础模型卡比较 π0.6 与 π0.5 在静态、移动和泛化任务上的零微调表现。RECAP 在叠衣、专业咖啡机制作饮品和工厂纸箱组装上报告：部分最难任务吞吐量超过翻倍，失败率约减半，并展示数小时连续运行。
- **结论**：π0.6 是更强的监督预训练底座；π*0.6 才是利用真机经验改进后的 RL 策略。两者不能只用一个“π0.6”名称混写。
- **局限性**：π0.6 是四页模型卡而非独立同行评审论文；任务、奖励、干预和大部分数据为内部系统；缺少官方训练代码和可公开复现的完整真机基准。

#### 4. π0.7：用可控上下文吸收示范、失败和策略元数据

- **文献与代码**：[arXiv:2604.15483](https://arxiv.org/abs/2604.15483) · [官方项目页](https://www.pi.website/blog/pi07) · 截至检索日无官方代码/权重。
- **作者/机构/年份**：Physical Intelligence、Bo Ai、Ali Amin 等；Physical Intelligence；2026。
- **研究问题**：单个通用策略能否在不做任务专用微调的情况下，复用不同机器人、不同质量轨迹和 RL 专家产生的经验，并组合出新技能？
- **方法**：核心是 diverse context conditioning。除语言命令外，提示还包含任务执行质量、策略、速度、子目标图像等多模态上下文。训练数据不仅有专家示范，也有次优自主轨迹、失败和非机器人数据；模型通过元数据区分“要模仿哪一种行为”，避免把好坏轨迹无差别平均。π0.7 还把 RECAP 专家产生的经验蒸馏进统一模型。
- **实验**：论文在多平台上测试未见环境中的多阶段指令、零样本跨本体叠衣、咖啡机操作、速度/最优性控制和组合泛化；机构页面报告单一 π0.7 在若干任务上达到或超过 π*0.6 专用策略的吞吐量与成功率。
- **结论**：比单纯扩大参数更重要的是给混合质量数据提供可辨识的条件，让策略知道任务目标、执行方式与数据质量。
- **局限性**：大部分证据来自内部机器人、任务和评测；“涌现能力”缺少统一外部基准；未开放模型，难以检查元数据构造、训练数据泄漏和跨本体公平性。

#### 5. GR00T N1 与 N1.7：面向人形机器人的双系统 VLA

- **文献与代码**：[GR00T N1 论文](https://arxiv.org/abs/2503.14734) · [GR00T N1.7 官方仓库](https://github.com/NVIDIA/Isaac-GR00T) · [NVIDIA 技术页](https://developer.nvidia.com/blog/develop-humanoid-robot-policies-end-to-end-with-nvidia-isaac-gr00t/)
- **作者/机构/年份**：NVIDIA、Johan Bjorck 等；NVIDIA；N1 论文 2025，N1.7 版本 2026。
- **研究问题**：如何让一个人形机器人基础模型同时具有视觉语言理解、跨本体迁移和实时连续动作生成能力？
- **方法**：GR00T N1 使用双系统架构：System 2 的 VLM 理解图像、语言和任务语义，System 1 的 diffusion transformer 生成动作；两者端到端联合训练。N1.7 延续该接口，将 VLM 更换为基于 Qwen3-VL 架构的 Cosmos-Reason2-2B，使用跨人类与机器人一致的相对末端执行器增量动作空间，并加入大规模第一视角人类视频、机器人示范和仿真数据。
- **实验**：N1 论文在多本体仿真基准和 Fourier GR-1 真机双臂任务上评测。N1.7 发布 3B 基础检查点及 LIBERO、DROID、SimplerEnv 等版本，并提供 ONNX/TensorRT 部署路径。
- **结论**：共享动作表征和人类视频预训练是人形/跨本体策略扩展的重要工程路线；开放训练、微调和部署栈使其比多数闭源基础模型更易验证。
- **局限性**：N1.7 不是一篇新的独立同行评审论文，引用仍应回到 N1 基础论文并注明版本；官方不同页面对数据小时数采用不同统计口径，不宜把数字直接拼接；仿真与指定平台结果不能自动外推到任意人形机器人。

### 二、世界模型与 World Action Model

#### 6. DreamZero：把视频扩散模型直接变成零样本策略

- **文献与代码**：[arXiv:2602.15922](https://arxiv.org/abs/2602.15922) · [项目页](https://dreamzero0.github.io/) · [官方代码](https://github.com/dreamzero0/dreamzero)
- **作者/机构/年份**：Seonghyeon Ye、Yunhao Ge 等；NVIDIA；2026。
- **研究问题**：VLA 擅长识别语义，却常把新动词退化成训练集中高频的抓放动作。显式学习视频中的物理变化，能否提高对未见运动和新本体的泛化？
- **方法**：DreamZero 基于 14B 自回归视频 diffusion backbone，同时生成未来视频 token 与动作。未来帧是世界状态如何演化的稠密表示，动作分支在同一模型中学习控制；系统用缓存、少步扩散、异步推理和 action chunk smoothing，把大模型部署到 7 Hz 闭环。视频-only 的人类或其他机器人示范也可作为跨本体监督。
- **实验**：在 AgiBot 和 DROID 上测试已见/未见任务、新环境与新物体；项目页报告 AgiBot 预训练设置下平均任务进度 62.2%，最佳 VLA 基线 27.4%；在 DROID 未见动词上为 49%，VLA 基线约 25%–32%。10–20 分钟跨本体视频带来超过 42% 相对增益，30 分钟 play data 用于新 YAM 本体适配。
- **结论**：视频生成先验可以把“动作之后世界会怎样”显式引入策略，对新动作语义和跨本体迁移有明显潜力。
- **局限性**：模型和部署成本高，官方实现建议多 GPU；多数数字由作者自建真机协议产生；未来视频看起来合理并不保证动作安全或因果正确；该方法没有用在线奖励更新，因此不标为真机强化学习。

#### 7. Fast-WAM：训练时学世界，推理时不生成未来

- **文献与代码**：[arXiv:2603.16666](https://arxiv.org/abs/2603.16666) · [项目页](https://yuantianyuan01.github.io/FastWAM/) · [官方代码](https://github.com/yuantianyuan01/FastWAM)
- **作者/机构/年份**：Tianyuan Yuan、Zibin Dong、Yicheng Liu、Hang Zhao；清华大学交叉信息研究院、Galaxea AI；2026。
- **研究问题**：WAM 的收益来自训练期的视频建模，还是必须在每个控制周期显式“想象未来”？
- **方法**：Fast-WAM 采用 Wan2.2-5B video DiT 与约 1B action expert，通过结构化注意力掩码联合学习未来视频和动作。推理时只编码当前干净观测的 latent token，一次前向后直接生成动作，移除未来视频迭代去噪。多个受控变体用于拆分视频协同训练与测试时想象的贡献。
- **实验**：无具身预训练时，在 LIBERO 平均成功率 97.6%、RoboTwin 2.0 平均 91.8%；真实 Galaxea R1 Lite 毛巾折叠验证长时、可变形物体操作。单张 RTX 5090D V2 上延迟约 190 ms，比 imagine-then-execute WAM 快 4 倍以上。去掉视频协同训练后，RoboTwin 平均从 91.8% 降至 83.8%。
- **结论**：训练期视频预测是强表征监督，显式生成完整未来并非所有分布内控制任务的必要条件。
- **局限性**：真实实验主要是一类毛巾任务；与使用大规模具身预训练的 VLA 横向比较不完全公平；论文仍是预印本，190 ms 也依赖高端桌面 GPU。

#### 8. Faster-WAM：在分布外场景保留稀疏未来条件

- **文献与代码**：[arXiv:2608.04404](https://arxiv.org/abs/2608.04404) · [官方代码与模型](https://github.com/hustvl/FasterWAM)
- **作者/机构/年份**：Weiheng Zhao 等；华中科技大学、D-Robotics、Horizon Robotics、厦门大学；2026。
- **研究问题**：Fast-WAM 在分布内很强，但彻底移除推理期未来表征是否会损害分布外鲁棒性？能否保留未来条件而不恢复密集视频—动作交互的高成本？
- **方法**：模型先用一次 video expert 前向得到多层未来相关 K/V 表征并缓存；SparseMoT 只在少数网络层让动作分支读取视频表征，其余层只细化动作；Interval KV-Fusion 把一段深度范围内的多层 K/V 聚合成固定长度上下文。视频和动作分支仍用 flow matching 联合训练。
- **实验**：论文报告 LIBERO-Plus 分布外成功率从 Fast-WAM 的 49.14% 提升到 73.57%，同时比密集 Joint-WAM 快 2.21 倍；还评测 LIBERO、RoboTwin 2.0 与真实机器人操作。
- **结论**：Fast-WAM 与 Faster-WAM 并非简单互相否定：训练期世界建模足以支撑很多分布内任务，但在分布偏移下，经过压缩的推理期未来表征仍可能关键。
- **局限性**：截至检索日是刚发布的 v1 预印本，尚缺独立复现和充分同行评议；结果依赖作者构造的 Joint-WAM 与分布外协议。

### 三、真机强化学习与部署后改进

#### 9. HIL-SERL：人类干预驱动的样本高效真机 RL

- **文献与代码**：[Science Robotics DOI](https://doi.org/10.1126/scirobotics.ads5033) · [arXiv:2410.21845](https://arxiv.org/abs/2410.21845) · [项目页](https://hil-serl.github.io/) · [官方代码](https://github.com/rail-berkeley/hil-serl)
- **作者/机构/年份**：Jianlan Luo、Charles Xu、Jeffrey Wu、Sergey Levine；加州大学伯克利分校；2024 预印本，2025 年 Science Robotics。
- **研究问题**：真机 RL 容易因奖励稀疏、探索危险和样本成本高而失败。少量示范和在线人工接管能否把训练时间压缩到小时级？
- **方法**：先遥操作收集正负样本，训练二值视觉奖励分类器；将少量示范放入 demo buffer；在线阶段使用样本高效的 off-policy RL，从 RL buffer 与 demo/intervention 数据共同更新。操作者在早期频繁接管，既防止危险也展示如何从策略访问到的状态恢复，随后随成功率提高逐步减少干预。
- **实验**：覆盖精密装配、动态操纵、双臂协调等多类任务，在 1–2.5 小时真机训练内达到接近满成功率；相对相同人类数据量的模仿学习，平均成功率约提高 2 倍、执行速度约提高 1.8 倍。
- **结论**：真机 RL 的关键不是单一算法，而是奖励、示范、干预、异步采样和稳定控制组成的完整系统。
- **局限性**：仍需要人类持续监控、遥操作和任务化奖励分类器；重置、硬件磨损与安全成本没有消失；结果集中在固定工作台和受控初始分布。

#### 10. RL Token：冻结大 VLA，只强化一个轻量接口

- **文献与代码**：[arXiv:2604.23073](https://arxiv.org/abs/2604.23073) · [官方项目页](https://www.pi.website/research/rlt) · 截至检索日无官方代码；现有公开仓库属于社区复现。
- **作者/机构/年份**：Charles Xu、Jost Tobias Springenberg、Michael Equi、Ali Amin、Adnan Esmail、Sergey Levine、Liyiming Ke；Physical Intelligence；2026。
- **研究问题**：完整微调数十亿参数 VLA 对几小时真机数据过重，而从头训练小 RL 策略又丢失 VLA 的语义和动作先验。能否构造一个兼顾两者的压缩接口？
- **方法**：在 π0.6 内部特征上训练 encoder–decoder transformer，以重建 VLA embedding 的信息瓶颈目标得到一个紧凑 RL token。之后冻结 VLA 与 token 编码器，用小型 off-policy actor–critic 在真机上高速更新。actor 的动作保持锚定于 VLA 建议，critic 利用 RL token 与本体状态估计价值，从而只修正任务中最精密、最困难的阶段。
- **实验**：四个真机任务为螺丝安装、扎带穿插、充电器插入和网线插入；每项使用 1–10 小时遥操作示范初始化，在线阶段收集约 400–1000 个 episode，即约 15 分钟至 5 小时有效机器人数据。论文在关键阶段用 50 次试验评估，报告最难阶段最高 3 倍加速，并显著提高成功率，部分任务超过人类遥操作速度。
- **结论**：把 VLA 视为冻结的感知—先验提供者，把 RL 视为轻量残差优化器，是部署后个性化的一条高效路线。
- **局限性**：需要先为每个任务收集示范并训练 RL-token 表征；主要优化局部长时任务瓶颈，不等于整套策略都能自主强化；奖励仍由人工二值判断，且官方训练代码未开放。

#### 11. WCM：用世界建模目标训练 VLA 的 critic

- **文献与代码**：[arXiv:2607.29613](https://arxiv.org/abs/2607.29613) · [官方代码、数据与检查点](https://github.com/sylvestf/WCM)
- **作者/机构/年份**：Senyu Fei、Xiaopeng Yu、Siyin Wang、Xianzhong Zhao、Jingjing Gong、Xipeng Qiu；同济大学、上海创智学院、复旦大学；2026。
- **研究问题**：机器人控制是部分可观测过程，单帧 critic 难以判断运动、接触和动作后果；只回归标量 return 又不足以学到时间动态。怎样让价值函数拥有轻量世界表征？
- **方法**：WCM 使用轻量 LeJEPA 风格编码器处理历史窗口，共享表征上同时训练两个头：value head 估计状态价值，action-conditioned dynamics head 预测下一 latent state。未来潜变量预测为 critic 提供跨时间监督，而非在推理时生成像素视频；模型可接入 π0、π0.5、OpenVLA-OFT，并兼容 on-policy 与 off-policy RL。
- **实验**：在 ManiSkill、MetaWorld、CALVIN、LIBERO-Plus 等 4 个基准共 149 个任务评测；在 7 个真实操作任务上配合 OpenVLA-OFT 和 π0.5 做 off-policy RL。仓库还开放 181 个真机 pick-and-place episode 的样例数据与 critic 检查点。
- **结论**：世界模型不必总是生成可视视频；把未来 latent 预测作为 critic 的辅助目标，可能是连接世界模型和真机 RL 的更轻量方式。
- **局限性**：非常新的预印本；仓库说明论文中的完整 RL 代码与部分检查点仍在逐步开放；不同 backbone、训练管线和基准的增益需要独立复现。

#### 12. AutoSERL：用一条示范自动替代持续人工干预

- **文献与代码**：[arXiv:2607.01651](https://arxiv.org/abs/2607.01651) · [项目页](https://autoserl.github.io/) · [官方代码](https://github.com/autoserl/AutoSERL)
- **作者/机构/年份**：Yuwan Liu、Hongze Yu 等；中国科学院自动化所、北京智源研究院、PKU–PsiBot 联合实验室、北京大学等；2026，ECCV 2026。
- **研究问题**：HIL-SERL 有效但需要操作者一直在环。能否只提供一条示范轨迹，就自动判断何时引导、如何恢复以及何时停止干预？
- **方法**：滑动窗口干预从示范附近选择前向参考点，避免策略被拉回已走过的位置；安全恢复机制在停滞或危险时回到预设恢复点并重放示范片段；终止准则在策略可独立完成后关闭引导，保留 RL 自主探索。示范和自动干预转移同时进入 demo/replay buffer。
- **实验**：在两类机器人平台上的 6 个接触密集任务测试，包括插头/USB 插入、悬挂物体和用钩子开抽屉。项目页报告相同训练时间下普遍优于 SERL、行为克隆和单次模仿学习，插入任务达到 50/50；在所测任务上与 HIL-SERL 相当。
- **结论**：把一条示范转成在线安全约束和恢复结构，可以大幅减少持续人工监督。
- **局限性**：干预阈值、停滞窗口和恢复点仍是任务相关启发式；单条示范必须经过关键接触区域；尚未证明能扩展到开放环境、长时移动操作或高维灵巧手。

## 主要发现

### 1. π 系列的主线不是简单版本迭代，而是数据接口逐步升级

π0 解决“VLM 如何输出连续动作”；π0.5 解决“网页、高层子任务与多机器人数据如何协同训练”；π0.6 用更强 VLM、Knowledge Insulation 和元数据条件改善零微调表现；π*0.6 用 RECAP 把真机优势信号和干预加入策略；π0.7 再把专家、失败、自主轨迹和 RL 专家经验放入一个可控上下文模型。版本号背后依次对应**动作接口—异构数据—经验学习—可控蒸馏**四个研究问题。

### 2. WAM 的争论已经从“要不要预测未来”转为“未来表征何时进入动作”

DreamZero 证明大规模视频生成先验可以直接支撑闭环动作和跨本体迁移；Fast-WAM 的受控消融显示，分布内任务中训练期视频协同监督比显式测试时生成未来更重要；Faster-WAM 则在 LIBERO-Plus 上显示，完全移除推理期未来信息会损害分布外鲁棒性。三者共同指向一个更细的设计空间：

$$
\text{视频监督强度} \times \text{未来表征可见性} \times \text{视频—动作交互频率}.
$$

因此，“VLA 对 WAM”不是二选一。实际系统可能在训练时使用强视频世界模型，在部署时只保留压缩 latent、K/V cache 或 critic 辅助目标。

### 3. 真机 RL 的瓶颈正从算法转向接口和运维

HIL-SERL 依靠人类干预保证探索质量；RECAP 用优势条件统一离线与在线数据；RL Token 压缩 VLA 表征，使小 actor–critic 能在机器人旁实时更新；AutoSERL 把单条示范变成自动干预器；WCM 用未来 latent 目标改善 critic。它们优化的是五种不同瓶颈：**安全探索、异构经验、计算开销、人工成本、部分可观测性**。

### 4. 成功率之外，吞吐量与恢复能力开始成为一等指标

π*0.6 和 RL Token 都强调每小时/每十分钟成功次数，而不只看二值成功；HIL-SERL 同时报告周期时间；π0.7 用速度/质量元数据控制策略。这更接近真实应用，因为一个 95% 成功但每次耗时十分钟的策略，可能不如 90% 成功且能快速重试、自动恢复的策略。

### 5. 开放代码仍不等于完全可复现

openpi 没有公开 π 系列的全部内部数据和最新训练栈；GR00T N1.7 有代码与检查点，但人类视频和完整预训练数据并非都可自由获得；DreamZero、Fast-WAM 需要高端多卡或大规模训练资源；WCM 的完整 RL 管线仍在逐步释放。复现评估应分别记录：**模型代码、训练代码、权重、数据、真机环境、奖励与重置协议**，不能只写“有 GitHub”。

## 局限与适用边界

- **基准不可直接横比**：LIBERO、RoboTwin、DROID、内部家庭任务和真实工厂任务的动作空间、初始状态、成功判定和重置方式不同。
- **样本量口径不同**：论文会混用演示小时数、有效 robot time、episode 数、训练 wall-clock 和操作者时间；“几小时学会”必须结合重置和标注成本理解。
- **内部评测占比高**：π0.5–π0.7 和 π*0.6 的关键长时结果多来自内部硬件与数据，外部团队难以做完全同条件复现。
- **奖励与安全仍依赖人工**：HIL-SERL 的奖励分类器、RECAP 的干预、RL Token 的二值奖励和 AutoSERL 的恢复点都带有人类先验。
- **世界预测不等于因果理解**：视频模型可能生成视觉上合理但接触力学错误的未来；未来 latent 改善动作也不证明模型学到了可解释的物理定律。
- **2026 年结论尚不稳定**：π0.7、DreamZero、Fast/Faster-WAM、RL Token 与 WCM 都较新，引用、复现和正式发表状态会继续变化。

本笔记没有重跑代码、复训权重或进行机器人实验，所有数值来自论文、模型卡和官方项目页。对同一版本存在不同统计口径时，本文优先保留保守描述，而不把数字强行合并。

## 我的思考

我认为最有希望的系统不是让一个模型包办所有事情，而是形成三层闭环：

1. **通用 VLA 层**：理解场景、语言、任务阶段与跨本体动作先验；
2. **世界表征层**：用视频或 latent dynamics 判断动作后果、接触进展与分布偏移；
3. **真机 RL 层**：用小 actor–critic、advantage conditioning 或自动干预器优化特定硬件上的精度、速度和恢复。

真正值得继续追踪的交叉点是 WCM 一类“世界 critic”：它既不要求每一步渲染完整未来视频，也不让小 critic 只看单帧标量回报，而是用轻量未来预测辅助价值学习。如果这条路线能在开放数据、统一真机任务和不同 VLA backbone 上稳定复现，它可能比“更大的视频生成器”更快进入实际机器人部署。

后续阅读应优先回答三个可检验问题：

- WAM 的 OOD 增益来自真正的动作条件动力学，还是更强的视频表征与数据规模？
- VLA + 小型 RL 头在长期更新后会不会破坏原有跨任务泛化，如何检测与回滚？
- 能否建立同时报告成功率、吞吐量、干预次数、硬件时间、能耗、碰撞/过力和恢复率的统一真机基准？

## 参考文献

1. Black, K., et al. (2025). *π0: A Vision-Language-Action Flow Model for General Robot Control*. Robotics: Science and Systems XXI. [正式页面](https://www.roboticsproceedings.org/rss21/p010.html) · [DOI:10.15607/RSS.2025.XXI.010](https://doi.org/10.15607/RSS.2025.XXI.010) · [arXiv:2410.24164](https://arxiv.org/abs/2410.24164)。
2. Physical Intelligence, Black, K., et al. (2025). *π0.5: a Vision-Language-Action Model with Open-World Generalization*. CoRL 2025. [arXiv:2504.16054](https://arxiv.org/abs/2504.16054) · [论文 PDF](https://www.physicalintelligence.company/download/pi05.pdf)。
3. Physical Intelligence. (2025). *π0.6 Model Card*. [模型卡 PDF](https://website.pi-asset.com/pi06star/PI06_model_card.pdf)。
4. Physical Intelligence, Amin, A., et al. (2025). *π*0.6: a VLA That Learns From Experience*. [arXiv:2511.14759](https://arxiv.org/abs/2511.14759) · [项目页](https://www.pi.website/blog/pistar06)。
5. Physical Intelligence, Ai, B., et al. (2026). *π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities*. [arXiv:2604.15483](https://arxiv.org/abs/2604.15483) · [项目页](https://www.pi.website/blog/pi07)。
6. NVIDIA, Bjorck, J., et al. (2025). *GR00T N1: An Open Foundation Model for Generalist Humanoid Robots*. [arXiv:2503.14734](https://arxiv.org/abs/2503.14734) · [N1.7 代码与模型](https://github.com/NVIDIA/Isaac-GR00T)。
7. Ye, S., et al. (2026). *World Action Models are Zero-shot Policies*. [arXiv:2602.15922](https://arxiv.org/abs/2602.15922) · [项目页](https://dreamzero0.github.io/) · [代码](https://github.com/dreamzero0/dreamzero)。
8. Yuan, T., Dong, Z., Liu, Y., & Zhao, H. (2026). *Fast-WAM: Do World Action Models Need Test-time Future Imagination?* [arXiv:2603.16666](https://arxiv.org/abs/2603.16666) · [代码](https://github.com/yuantianyuan01/FastWAM)。
9. Zhao, W., et al. (2026). *Faster-WAM: Efficient Inference-Time Future Conditioning for Robust World Action Models*. [arXiv:2608.04404](https://arxiv.org/abs/2608.04404) · [代码与模型](https://github.com/hustvl/FasterWAM)。
10. Luo, J., Xu, C., Wu, J., & Levine, S. (2025). *Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning*. Science Robotics, 10(105), eads5033. [DOI:10.1126/scirobotics.ads5033](https://doi.org/10.1126/scirobotics.ads5033) · [arXiv:2410.21845](https://arxiv.org/abs/2410.21845) · [代码](https://github.com/rail-berkeley/hil-serl)。
11. Xu, C., Springenberg, J. T., Equi, M., Amin, A., Esmail, A., Levine, S., & Ke, L. (2026). *RL Token: Bootstrapping Online RL with Vision-Language-Action Models*. [arXiv:2604.23073](https://arxiv.org/abs/2604.23073) · [项目页](https://www.pi.website/research/rlt)。
12. Fei, S., et al. (2026). *WCM: A World Critic Model for Vision-Language-Action Reinforcement Learning*. [arXiv:2607.29613](https://arxiv.org/abs/2607.29613) · [代码、数据与检查点](https://github.com/sylvestf/WCM)。
13. Liu, Y., et al. (2026). *One Demonstration Is Enough for Real-World Robotic Reinforcement Learning*. ECCV 2026. [arXiv:2607.01651](https://arxiv.org/abs/2607.01651) · [项目页](https://autoserl.github.io/) · [代码](https://github.com/autoserl/AutoSERL)。
