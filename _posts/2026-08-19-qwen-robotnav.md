---
title: "精读｜Qwen-RobotNav：把视觉历史变成可参数化的导航接口"
date: 2026-08-19
permalink: /posts/qwen-robotnav/
tags: [literature-note, qwen-robotnav, embodied-ai, vln, vla, vlm, navigation-foundation-model, real-robot]
note_type: single-paper
literature_topics: [embodied-ai, vln, vla]
excerpt: "精读 Qwen-RobotNav 的统一航点接口、任务自适应视觉 token 分配、15.6M 多任务训练、Agentic 导航系统与跨 VLN、ObjectNav、Tracking、EQA、自动驾驶和真机部署的证据边界。"
---

> **阅读范围**：arXiv v3 全文 37 个物理页，包括正文、结论、贡献说明和完整参考文献；该版本没有独立附录或补充材料。另核验 arXiv 元数据、官方博客入口和官方 GitHub 固定提交。<br>
> **检索日期**：2026-08-19。<br>
> **版本口径**：以 2026-06-29 修订的 arXiv v3 PDF 为准；截至检索日未发现同行评议版本、正式会议/期刊 DOI 或勘误。<br>
> **核心问题**：同一个导航模型能否在不改骨干和不做任务专用微调的前提下，通过外部可控的任务模式与视觉上下文参数，覆盖指令跟随、点目标/物体目标导航、目标跟踪、自动驾驶及长时程 Agentic 导航？

## 文献档案

- **论文**：*Qwen-RobotNav Technical Report: A Scalable Navigation Model Designed for an Agentic Navigation System*
- **作者**：Jiazhao Zhang、Gengze Zhou、Hale Yin、Yiyang Huang、Zixing Lei、Qihang Peng、Haoqi Yuan、Jie Zhang、Xudong Guo、Xiaoyue Chen、An Yang、Fei Huang、Zhibo Yang、Junyang Lin、Dayiheng Liu、Jingren Zhou、Zhuoyuan Yu、Jingyang Fan、Zhixuan Liang、Pei Lin、Ye Wang、Haoyang Li、Anzhe Chen、Kun Yan、Xiao Xu、Jiahao Li、Lulu Hu、Minying Zhang、Shurui Li、Wenhu Xiao、Shuai Bai、Xuancheng Ren、Chenxu Lv、Chenfei Wu、Xiong-Hui Chen。
- **机构 / 团队**：论文仅署名 **Qwen Team**，没有列出作者单位；本文不根据品牌归属补写未在论文中披露的机构。
- **年份与状态**：2026；arXiv `cs.RO` / `cs.CV` v3 技术报告，尚不能写成已同行评议论文。
- **文献链接**：[arXiv:2606.18112](https://arxiv.org/abs/2606.18112) · [v3 PDF](https://arxiv.org/pdf/2606.18112v3) · [官方博客](https://qwen.ai/blog?id=qwen-robotnav)。
- **DOI**：[10.48550/arXiv.2606.18112](https://doi.org/10.48550/arXiv.2606.18112) 是 arXiv/DataCite DOI，不是会议或期刊 DOI。
- **代码 / 模型**：[QwenLM/Qwen-RobotNav 官方仓库](https://github.com/QwenLM/Qwen-RobotNav)。截至检索日，仓库只有 README、两张图片和演示视频，没有训练/推理代码；README 还明确表示目前没有发布 Qwen-RobotNav 权重的计划。因此它是**官方信息仓库**，不能当作可复现代码仓库。
- **实现审计版本**：[GitHub commit `f74cf1f`](https://github.com/QwenLM/Qwen-RobotNav/tree/f74cf1f6079300aee6e40e03858da2f98b1b7261)，2026-06-30。

## 核心结论

Qwen-RobotNav 的核心创新不是新造一个导航 Transformer，而是把 Qwen3-VL 改成一个**可重配置的航点执行器**。同一组模型权重接收多相机 RGB 历史、语言任务和外部控制参数：任务模式决定“要执行哪类导航”，视觉 token 总预算、时间衰减、相机权重和抽帧模式决定“如何消费历史”。训练时对这些参数逐样本随机化，推理时上层规划器便可在 episode 中途更换上下文策略。

论文证据支持的较窄结论是：在作者报告的协议下，4B/8B 模型在 VLN-CE、VLNVerse、ObjectNav、开放词汇导航和跟踪等多个基准上具有竞争力；在 R2R 的 500-episode 消融中，同一模型对视觉预算与时间衰减的变化确有响应。它还给出了 Unitree Go2 的定性零样本演示，以及远端/板载 4B 推理延迟。

但“统一、可扩展、可部署”仍有明显边界：没有代码和权重；主要表格没有随机种子、方差或置信区间；所谓 2B→8B scaling 没有完整的 2B 数值；配置随机化本身没有对照消融；真机只有成功案例而无 episode 总数和失败率。自动驾驶的最佳 NAVSIM 结果还依赖前三帧**真实历史轨迹**，移除这一先验后 PDMS 从 91.4/90.9 降到 79.5/79.5；AlpaSim 零样本闭环结果也显著落后专用模型。

## 检索记录

- **检索式**：`Qwen-RobotNav 2606.18112`；`Qwen-RobotNav official GitHub model weights`；准确题名与 `Qwen RobotNav technical report`。
- **主证据**：arXiv v3 PDF、arXiv 版本记录、官方 Qwen 博客入口、官方 GitHub 仓库及其固定提交；第三方摘要和媒体报道不用于方法或实验结论。
- **纳入原因**：该文直接研究通用多任务导航模型、可编程视觉历史接口和 Agentic 导航，且覆盖 VLN、ObjectNav、Tracking、EQA、自动驾驶与真机部署。
- **全文状态**：已阅读 v3 的 37/37 个物理页并核对公式 1–5、Algorithm 1、Figures 1–18、Tables 1–9。PDF 第 31 页后为作者贡献与参考文献，没有附录。
- **版本 / 更正审计**：arXiv 记录 v1（2026-06-16）、v2（2026-06-18）和 v3（2026-06-29）；本文读取的 v3 PDF SHA-256 为 `dc70ff7f3b4413936f65575ee7b8d8aafe40699adcc37be35a83eee0037fc186`。未发现撤稿或正式更正。
- **元数据差异**：arXiv 网页摘要两处把骨干误写为 Qwen-RobotNav 自身；v3 PDF 明确写的是 **Qwen3-VL**，本文采用 PDF 口径。
- **公开实现状态**：固定提交的文件树中没有源码、配置、数据清单或权重。官方 README 不是论文实验的可运行实现。

## 研究背景

### 固定历史策略为何限制“通用导航模型”

指令跟随、物体搜索、目标跟踪和自动驾驶都要从视觉历史中规划运动，但需要的历史结构不同：

- 长指令跟随要回看很早出现过的地标；
- 物体搜索前期要保存全局探索史，接近候选目标时又更依赖当前视野；
- 动态跟踪更关心最近几帧，久远历史可能成为噪声；
- 自动驾驶需要多相机、短时间尺度的运动上下文。

既有统一导航模型通常把抽帧策略写死为均匀子采样或固定滑动窗口。即使模型能做多任务，上层 Agent 也无法在一次长任务中动态决定“现在应该保留多少过去、给哪台相机多少分辨率”。论文因此把问题从“再设计一个任务 head”改写为“让观察协议成为推理接口”。[原文 §1–2，PDF 物理页 2–8](https://arxiv.org/pdf/2606.18112v3)

### 统一模型与 Agentic 系统是两层不同对象

Qwen-RobotNav 本体是反应式航点预测器；长时程任务分解、工具选择、记忆更新和证据压缩由上层规划器与 harness 完成。论文的 EQA 与开放式找物演示评测的是这套**组合系统**，不能把结果全部归因于基础导航模型。

## 研究问题

论文试图回答六个可检验的问题：

1. 能否用统一的 8 航点回归接口覆盖不同具身、传感器布局和导航任务？
2. 视觉 token 预算、时间衰减、相机权重和抽帧策略能否成为推理时可调参数？
3. 通过训练期参数随机化，模型能否无需改结构或微调就适应新的上下文配置？
4. 多任务轨迹监督与视觉语言数据共同训练，能否保留 Qwen3-VL 的开放世界理解能力？
5. 上层 LLM 能否通过任务模式、上下文配置和两级记忆，把同一执行器组合成长时程 Agentic 导航系统？
6. 多基准与真机证据是否足以支持“可扩展、通用、零样本实景部署”的主张？

## 方法与数据

![Qwen-RobotNav 的模型与 Agentic 导航架构](/images/literature-notes/qwen-robotnav/method-overview.png)

*图 1｜上层 LLM 选择子目标和上下文参数；Qwen-RobotNav 本体对多相机历史分配视觉 token，以自然语言标记时间/视角，经 Qwen3-VL 和 4 层 MLP 输出 8 个航点。来源：原论文 Figure 2，PDF 物理页 4。[原始 v3 PDF](https://arxiv.org/pdf/2606.18112v3)*

### 1. 任务定义：统一为 8 个平面航点

在时刻 $T$，模型输入语言指令 $L$ 与 $T$ 个时刻、$N$ 台相机的 RGB 观测 $I_{1:T}^{1:N}$，输出

$$
W=\{(x_k,y_k,\theta_k)\}_{k=1}^{K},\qquad K=8.
$$

每个航点包含二维位置与朝向，共 3 DoF，最终输出维数为 24。该接口位于高层规划和底层控制之间：它不是离散的 `forward/turn/stop` token，也不是直接输出电机力矩或 $(v,\omega)$。论文没有完整定义所有数据集如何映射到统一坐标系、8 个点的时间间隔，以及执行多少个航点后重新规划。[原文 Eq. 1 与 §2.5，PDF 物理页 3、7](https://arxiv.org/pdf/2606.18112v3)

### 2. 骨干：保留 Qwen3-VL，只增加轻量动作头

模型由三部分组成：

1. **视觉编码器**：沿用 Qwen3-VL 的 SigLIP-2 ViT、动态分辨率和 2D-RoPE；两层 MLP patch merger 把相邻 $s_m^2$ 个空间 token 合并，DeepStack 把多个 ViT 层的视觉 token 注入早期 LLM 层。
2. **语言骨干**：Qwen3-VL 同时处理视觉序列、指令、具身 prompt 以及时间/视角标签。
3. **动作头**：从论文记作 $E_A\in\mathbb R^d$ 的最终隐藏状态回归轨迹。动作头为 4 层 MLP，隐藏维数 512，激活函数 GELU，输出 24 维。

论文强调“零架构改动”时，准确含义是**不改 Qwen3-VL 骨干内部结构**；整个导航模型仍新增了动作头、输入序列协议和外部执行系统。论文也没有说明 $E_A$ 对应哪个特殊 token 或如何从多 token 序列聚合，这是复现动作头的关键缺口。

### 3. 可参数化观察接口

每次调用携带配置

$$
\Phi=(B,\gamma,\{w_c\},m,b_{\min},b_{\max}),
$$

其中：

| 参数 | 作用 | 训练期范围 / 规则 |
|---|---|---|
| $B$ | 所有时间与相机共享的视觉 token 总预算 | $B\sim U[2048,4096]$ |
| $\gamma$ | 越大越偏向最近帧 | $\gamma\sim U[1,3]$ |
| $w_c$ | 第 $c$ 台相机的重要性 | 每台相机独立采样；只披露前相机示例 $U[1.5,2.5]$ |
| $m$ | 帧采样模式 | `random` 与 `latest` 各 50% |
| $b_{\min}$ | 单图最少 token | $U_{\mathbb Z}[1,8]$ |
| $b_{\max}$ | 单图最多 token | $U_{\mathbb Z}[128,256]$ |

`random` 追求全局历史覆盖，`latest` 保留最近窗口。保留 $T'\le T$ 帧后，时间权重为

$$
\omega_t=
\begin{cases}
1, & T'=1,\\
\exp\!\left(\gamma\,t/(T'-1)\right), & T'>1,
\end{cases}
$$

再与相机权重相乘：

$$
Q[t,c]=\omega_t w_c.
$$

算法先给每个 $(t,c)$ 单元分配 $b_{\min}$，把剩余预算按 $Q[t,c]$ 比例分发；超过 $b_{\max}$ 的单元被截断，溢出预算继续分配，直到稳定。要求

$$
T'N b_{\min}\le B\le T'N b_{\max},
$$

不满足时先把 $B$ 裁到可行区间。分配到 $A[t,c]$ 个 token 的图像，会被等比例缩放到约 $A[t,c](p s_m)^2$ 个像素，再进入动态分辨率视觉编码器。[原文 Algorithm 1、Eqs. 2–3，PDF 物理页 5–6](https://arxiv.org/pdf/2606.18112v3)

例如四相机默认示例为 $[2.0,1.0,0.5,1.0]$，依次对应前、右、后、左视角；当 $\gamma=2$ 时，最新帧权重是最旧帧的 $e^2\approx7.4$ 倍。这是一个工程启发式，而非根据任务效用或不确定性求得的最优分配；作者也明确表示仍可用更有原则的方法改进。

### 4. 时间、视角和具身身份全部写进自然语言

Qwen3-VL 原本无法从图像 token 本身判断“这是第几步、哪台相机”。作者没有增加可学习的相机/时间 embedding，而是把序列写成：

```text
Time step 0  Front View <image>  Right View <image> ...
Time step 1  Front View <image>  ...
```

同样，室内机器人和汽车通过 system prompt 前缀区分，例如“想象你是执行导航任务的机器人/汽车”。描述性视角名略优于数值方位角，但论文没有报告这项比较的精确数值。作者据此推断新平台只需新 prompt；由于没有无人机、轮式/四足平台间的受控 prompt 迁移实验，这一结论仍是设计主张，不是已验证的零成本扩展定律。[原文 §2.3–2.4，PDF 物理页 6–7](https://arxiv.org/pdf/2606.18112v3)

### 5. 动作归一化与损失

每个数据集分别统计各坐标绝对尺度的第 99 百分位，将航点归一化到 $[-1,1]$；推理时用同一尺度反归一化。轨迹损失与总损失为

$$
\mathcal L_{\mathrm{traj}}=\lVert \hat W-W^*\rVert_2^2,
$$

$$
\mathcal L=\mathcal L_{\mathrm{traj}}+\lambda\mathcal L_{\mathrm{VL}},
\qquad \lambda=1.
$$

$\mathcal L_{\mathrm{traj}}$ 只对轨迹样本生效，$\mathcal L_{\mathrm{VL}}$ 是导航相关视觉语言样本的 next-token loss。论文说二者共享前向过程，但未说明混合 batch 内的逐样本 mask、不同长度归一化或两项损失的实际量级，因此 $\lambda=1$ 不代表两类梯度贡献相等。

### 6. 15.6M 训练样本到底由什么组成

训练混合约 85% 轨迹规划数据与 15% 视觉语言数据。按正文各节给出的数目相加约为 15.592M，论文四舍五入为 15.6M：

| 数据族 | 报告样本量 | 生成方式与关键边界 |
|---|---:|---|
| VLN-CE R2R | 1.491M | 约 10K clip，teacher forcing 展开；包含单目/四目、指令改写和视觉增强变体 |
| VLN-CE RxR | 4.140M | 约 20K 较长 clip；同样包含增强变体，不是 4.14M 条独立路线 |
| PointNav | 0.984M | 922K 坐标目标 + 62K 文本动作原语；覆盖直达、0.5–6 m 短程与 6–10 m 长程 |
| ObjectNav | 2.000M | MP3D/HM3D 上骨架图随机探索、死路回溯；终点图像由 VLM 命名开放词汇目标 |
| Target Tracking | 1.486M | EVT-Bench Single Target Tracking；训练设置没有干扰目标 |
| Autonomous Driving | 3.216M | nuScenes 78K + OpenScene 3.138M；同一原始轨迹可派生多个条件变体 |
| T2V 自动生成导航 | 0.040M | LLM 写场景/指令，T2V 生成视频，VLM 过滤，单目深度/位姿恢复轨迹，再做运动学过滤 |
| 通用视觉语言 | 约 1.000M | VQA、caption、grounding、多图比较、识别和 STEM 等 |
| 导航专项推理 | 0.873M | 自由 QA 与历史/场景/指令进度/动作四段式多视角推理 |
| 离散多轮 VLN | 0.362M | CVDN、SOON、REVERIE、SRDF 等改写成多图多选对话 |

需要注意三点：

1. “样本”经 teacher-forcing 时间展开、相机配置、指令改写和图像增强后计数，不能等同于独立 episode 或独立环境。
2. ObjectNav 的 VLM 只在生成轨迹终点识别“显著且可达”的物体，可能偏向视觉清晰、易命名的目标；论文没有报告拒绝率或目标频率分布。
3. Driving 的 3.2M 是 supervision variants，不是 3.2M 条原始驾驶轨迹；条件可能包含导航指令、ego state 和真实历史轨迹。

### 7. 数据增强与优化

轨迹数据还使用以下增强：

- 每条去重后的语言指令由 LLM 生成 3 个改写，要求保留方向与地标；
- Qwen-Image-Edit 把 Habitat render 转为写实风格，同时假定几何布局不变；
- 相机高度在 0.5–1.5 m、水平视场角在 90°–120°、宽高比在 2:1–4:3 之间随机；
- Habitat 标准步长为 0.25 m/15°，低速轨迹用 0.05–0.25 m 随机子步长重放；
- PointNav 在距目标 1.5 m 内生成线性减速轨迹；直行样本仅保留 45%，转弯和停止全部保留。

模型从 Qwen3-VL 初始化并**端到端微调**，使用 AdamW（$\beta_1=0.9$、$\beta_2=0.95$、weight decay $10^{-2}$）、cosine schedule、前 3% step 线性 warm-up。视觉编码器/LLM 的峰值学习率为 $2\times10^{-5}$，动作头为 $10^{-4}$，梯度范数裁到 1.0。8B 模型 global batch size 为 256，总计 2,816 H100 GPU-hours。[原文 §2.6、§4，PDF 物理页 7、10–19](https://arxiv.org/pdf/2606.18112v3)

未报告的训练信息包括：训练 step/epoch 数、H100 数量与墙钟时间、2B/4B 训练成本、全部相机权重范围、逐数据集采样率、随机种子、损失方差及 checkpoint 选择规则。

### 8. Agentic 导航：任务模式与观察配置是工具参数

对第 $i$ 个子任务，上层规划器给出子目标 $L_i$、任务模式 $\tau_i$ 与观察配置 $\Phi_i$，调用

$$
W_i=\operatorname{nav\_qwennav}(L_i,\tau_i,\Phi_i).
$$

论文明确列出的模式为 `VLN`、`PointNav`、`ObjNav`、`Tracking`。它们不是四个独立 policy，而是同一模型的不同调用接口。自动驾驶虽然参与统一轨迹训练和评测，却没有被列进 §3.2 的 Agent task-mode 枚举；其行为主要由汽车具身 prompt、驾驶条件和训练数据区分。

每段导航结束后，harness 把密集图像与控制流压缩成一条 source-indexed evidence record，包含子目标、模式、参数、进度、显著观察、结果和关键帧编号。长期 notebook 保存已搜索区域、候选目标、被否定假设和地标；上层默认读文本摘要，需要时再按编号取回关键帧。辅助目标检测、场景理解和语义 grounding 工具只向规划器提供证据，不负责生成航点。[原文 §3，PDF 物理页 8–10](https://arxiv.org/pdf/2606.18112v3)

### 9. 训练—推理边界

- **训练时**：轨迹样本使用真实未来航点作 MSE 监督；视觉语言样本使用 token 预测；视觉配置逐样本随机。论文没有强化学习或环境回报优化。
- **单次推理时**：模型按指定模式和 $\Phi$ 编码历史，回归 8 个航点并反归一化；底层系统负责执行。
- **闭环时**：上层或 harness 决定何时重新调用、是否换模式/上下文，以及如何把 rollout 压成证据。确切重规划频率、控制器、碰撞检查和异常航点处理未报告。
- **EQA / 开放式任务**：Qwen3.6-Plus 负责推理、工具调度与记忆，Qwen-RobotNav 只执行导航段。因此 EQA 指标不是“8B 导航模型单模型端到端回答”的证据。

## 实验

### 1. VLN：主结果强，但模型规模并非处处单调

![Qwen-RobotNav 在 VLN-CE R2R 与 RxR Val-Unseen 的结果](/images/literature-notes/qwen-robotnav/vln-results.png)

*图 2｜单目与全景 VLN-CE R2R/RxR Val-Unseen 结果。Qwen-RobotNav-8B 在全景设置取得 R2R 72.1 SR / 66.6 SPL、RxR 76.5 SR / 65.7 SPL；单目 R2R 则是 4B 略优于 8B。来源：原论文 Table 1，PDF 物理页 20。[原始 v3 PDF](https://arxiv.org/pdf/2606.18112v3)*

在全景输入下，8B 的关键结果为：

| 基准 | NE↓ | OS / nDTW↑ | SR↑ | SPL↑ |
|---|---:|---:|---:|---:|
| R2R Val-Unseen | 3.53 | OS 78.5 | 72.1 | 66.6 |
| RxR Val-Unseen | 3.58 | nDTW 72.5 | 76.5 | 65.7 |

这比论文表中的 NavFoM 分别高 10.4 和 12.1 个 SR 百分点。但在单目 R2R 上，4B 为 66.9 SR / 60.5 SPL，8B 反而为 65.7 / 59.6；因此主表并不支持“参数越大，每项导航指标必然越高”。单目 RxR 则是 8B 更好，为 73.4 / 63.5。

VLNVerse 测试集上，8B 的 fine-grained SR/SPL 为 63.75/57.93，coarse-grained 为 46.59/41.54；4B 分别为 62.61/56.22 和 41.25/37.37。该结果支持长指令和粗粒度子目标推断能力，但仍是完整训练配方的横向比较，不能把增益单独归因于 token 分配。[原文 Tables 1–2，PDF 物理页 20](https://arxiv.org/pdf/2606.18112v3)

VLN-PE 使用 flash controller 时，8B 达到 65.50 SR / 61.19 SPL，高于 InternVLA-N1 的 60.36 / 54.93；但 Qwen-RobotNav-8B 的 fall rate 是 **4.05**，而 InternVLA-N1 只有 **0.45**。也就是说，它的到达率更高，物理跌倒指标却明显更差，不能把较高 SR 直接解释为更安全或更稳健。[原文 Table 3，PDF 物理页 21](https://arxiv.org/pdf/2606.18112v3)

### 2. ObjectNav：成功率与路径效率存在权衡

闭词表结果中：

- MP3D：4B 为 52.2 SR / 16.0 SPL，8B 为 48.8 / 17.7；
- HM3D v2：4B 为 75.6 / 30.6，8B 为 71.2 / 33.0。

4B 更容易找到目标，8B 路径效率更高。论文拿多数 HM3D v1 旧结果与自己的 HM3D v2 结果并列，并认为 v2 更难；因为场景池和语义标注版本不同，这不是同协议比较，不能仅凭该表严格建立“HM3D SOTA”。[原文 Table 4，PDF 物理页 21](https://arxiv.org/pdf/2606.18112v3)

HM3D-OVON 上，4B 在 Seen/Synonyms/Unseen 的 SR 为 57.7/60.1/53.1，SPL 为 24.4/25.1/20.9。它在 Seen 与 Synonyms 的 SR 最佳，但 Unseen SR 低于 ABot-N0 的 54.0，三个切分的 SPL 也低于 ABot-N0；作者将此解释为骨架探索数据促成了“先确保找到、再考虑路径长度”的行为。[原文 Table 5，PDF 物理页 22](https://arxiv.org/pdf/2606.18112v3)

### 3. Tracking：Tracking Rate 第一，不等于 episode 成功第一

EVT-Bench Single Target、单目设置中：

| 模型 | TR↑ | CR↓ | SR↑ |
|---|---:|---:|---:|
| TrackVLA++ | 81.0 | 2.10 | 86.0 |
| ABot-N0 | 87.6 | 8.54 | 86.9 |
| Qwen-RobotNav-4B | **90.0** | 6.40 | 77.4 |
| Qwen-RobotNav-8B | 89.7 | 5.70 | 78.6 |

Qwen-RobotNav 保持目标可见的比例最高，但 episode SR 比专用 TrackVLA++ 低 7.4–8.6 个百分点，碰撞率也高于 TrackVLA++。因此证据支持“更强的持续跟随”，不支持“整体跟踪任务最安全、最成功”。训练数据还只使用无干扰目标的 STT split，不能验证多人干扰下的重识别。[原文 Table 6，PDF 物理页 22](https://arxiv.org/pdf/2606.18112v3)

### 4. Agentic EQA：强结果来自组合系统

`Qwen3.6-Plus + QwenNav-8B` 在 HM-EQA、MT-EQA 和 EXPRESS-Bench 分别报告 76.7 Accuracy、54.4 Accuracy 和 79.27 LLM Score；对应 normalized steps 为 0.15、0.19，EXPRESS 的 $E_{path}$ 为 33.96。FAST-EQA 对应为 69.2、50.5、68.7 和 0.65、0.52、29.25。[原文 Table 7，PDF 物理页 23](https://arxiv.org/pdf/2606.18112v3)

摘要所写 HM-EQA 提升 10.8%、EXPRESS 提升 15.4% 是**相对提升**；绝对提升分别为 7.5 和 10.57 个百分点。所谓少 77% 步数与 HM-EQA 的 $0.65\rightarrow0.15$ 相符，但 MT-EQA 是约少 63.5%，不能把 77% 当成所有 EQA 基准的统一结论。

更重要的是，系统同时改变了上层 Qwen3.6-Plus、记忆、工具和执行器，且没有逐模块消融。表 7 证明完整 Agentic 配方有效，不能证明效果只来自 Qwen-RobotNav 的观察接口。

### 5. 自动驾驶：历史真实轨迹是决定性条件

NAVSIM `navtest` 中，评测时把前三帧真实轨迹作为历史先验写入 prompt：

- 4B：99.8 NC、97.5 DAC、98.5 TTC、99.9 Comfort、84.4 EP、**91.4 PDMS**；
- 8B：99.8、96.9、98.2、99.9、84.2、**90.9 PDMS**。

去掉历史 ego-status/轨迹先验后，两者 PDMS 都只有 **79.5**，下降 11.9 和 11.4 分。这项对照比横向 SOTA 排名更有信息量：最佳驾驶表现依赖短时真实运动历史，并不是仅靠当前多目 RGB 与高层指令获得。[原文 Table 8，PDF 物理页 23](https://arxiv.org/pdf/2606.18112v3)

AlpaSim 的零样本闭环是论文最重要的负结果：4B/8B 的 at-fault close encounter rate 都是 22%，off-road rate 为 34%/27%，score 为 0.15/0.17；Alpamayo-R1-0.5B 已达到 9%、19%、0.35，10B 为 4%、16%、0.72。8B 的出界率较 4B 改善，但与专用模型仍有大幅差距。这说明 NAVSIM 的高分不能外推为跨模拟器的闭环驾驶可靠性。[原文 Table 9，PDF 物理页 24–25](https://arxiv.org/pdf/2606.18112v3)

### 6. 数据规模：长时程任务继续受益，Tracking 较早饱和

用 12.5%、25%、50%、100% 导航数据训练时，Figure 14 报告：

- R2R SR：42.3 → 52.6 → 60.4 → 69.5；
- RxR SR：52.6 → 64.5 → 70.2 → 75.2；
- OVON-Unseen SR：37.1 → 46.1 → 47.4 → 53.1；
- EVT-Bench following rate：89.6 → 91.6 → 90.2 → 90.0；
- NAVSIM 带历史 PDMS：86.8 → 90.0 → 90.2 → 91.3。

长时程 VLN 随数据增长最明显，Tracking 在 25% 后非单调。该图支持“不同任务的数据饱和速度不同”，但没有说明所用模型规模、重复训练次数和误差条，无法判断 0.2–1.6 点波动是否稳定。[原文 Figure 14，PDF 物理页 26](https://arxiv.org/pdf/2606.18112v3)

### 7. 可参数化接口消融：证明可控，但只在单一任务上测试

![Qwen-RobotNav 的视觉 token 预算和时间衰减消融](/images/literature-notes/qwen-robotnav/interface-ablation.png)

*图 3｜Qwen-RobotNav-4B 在 500 个 R2R Val-Unseen episode 上改变推理期 $B$ 和 $\gamma$。更多 token 整体有益但非单调；更强 recency bias 提高 OSR，SR 在 $\gamma=3.0$ 后回落。来源：原论文 Figure 15，PDF 物理页 26。[原始 v3 PDF](https://arxiv.org/pdf/2606.18112v3)*

固定 $\gamma=2$，把 $B$ 从 2048 增到 4608，SR 从 70.8 增至 74.6，SPL 从 59.7 增至 62.4；OSR 在 $B=3584$ 达峰值 82.7，之后回落到 81.9。固定 $B=3072$，把 $\gamma$ 从 0.5 增到 3.5，OSR 从 78.8 增至 82.6；SR 在 $\gamma=3.0$ 达 72.5，$\gamma=3.5$ 回落到 72.0。[原文 Figure 15 与 §5.5，PDF 物理页 26–27](https://arxiv.org/pdf/2606.18112v3)

这组实验有两层价值：

1. **直接支持**：调用时改变上下文参数会改变同一模型的导航表现，接口不是纯格式装饰；$B=4608$、$\gamma=0.5/3.5$ 还略超出训练范围，显示有限外推。
2. **尚未支持**：只有 4B、R2R、500 episodes；没有在 Tracking、ObjectNav、Driving 上验证任务专属最优配置，也没有“固定配置训练 vs 随机配置训练”对照。因此还不能证明随机化是可控性的唯一原因，或上层 Planner 已能自动选出最优参数。

### 8. 真机部署：有闭环执行和延迟数据，但成功率未知

论文在 Unitree Go2 与 NVIDIA Jetson Thor 上比较 4B 部署：远端服务器连网络传输的端到端平均延迟为 **196 ms（5.1 Hz）**，板载 FP8/TensorRT 为 **204 ms（4.9 Hz）**。远端均值略快但波动更大，板载延迟更稳定。[原文 Figure 11 与 §5.1，PDF 物理页 19](https://arxiv.org/pdf/2606.18112v3)

定性案例包括：

- 未见展厅中按纯语言走 21.78 m，从客厅区域到医疗室，再按反向语言命令返回；
- 公寓中 4 条跨卧室、客厅和浴室的细粒度指令；
- 上层 Agent 查找 Cotti Coffee 的绿色雨伞，沿途写入地标和证据 notebook，最后回答是否找到。

这些案例证明模型可以接入真实机器人并完成所展示路线，但论文没有报告总 episode 数、失败案例、碰撞、人工接管、导航误差、网络丢包或硬件功耗，不能估计真实成功率。官方 README 在同一段里把“Jetson Thor 板载”与 **196 ms** 连写，而 v3 论文明确 196 ms 是远端、204 ms 才是板载；本文采用论文口径，并把 README 表述视为实现文档不一致。[固定提交 README](https://github.com/QwenLM/Qwen-RobotNav/blob/f74cf1f6079300aee6e40e03858da2f98b1b7261/README.md#-real-world-deployment)

## 主要发现

1. **论文最扎实的贡献是“观察协议可调用”。** $B$、$\gamma$、相机权重和抽帧方式成为推理参数，配置消融证明同一权重能表现出不同的历史—当前权衡。
2. **统一性主要来自数据、prompt 和航点接口，而不是新骨干。** Qwen3-VL 内部结构基本保留；自然语言标签承担时间、视角和具身身份编码，4 层 MLP 承担动作回归。
3. **15.6M 不是 15.6M 条独立轨迹。** 数量包含时间展开、增强、条件变体和视觉语言 QA；规模很大，但有效环境/路线多样性不能直接由样本数判断。
4. **多任务结果强，却存在明显非单调性和负结果。** 4B 在若干 R2R、ObjectNav、Tracking 或 NAVSIM 指标上优于 8B；VLN-PE fall rate、Tracking SR/CR 和 AlpaSim 明确限制了“全面更强”的表述。
5. **Agentic EQA 是系统级结果。** 上层 Qwen3.6-Plus、工具、记忆、上下文压缩和 Qwen-RobotNav 一起变化，不能由表 7 识别单个模块的因果贡献。
6. **真机证据说明能运行，不说明已可靠部署。** 有 5 Hz 左右延迟和长路线案例，但没有统计评测、安全指标或公开实现。

## 结论

### 作者结论

作者认为，多类导航任务共享感知—规划骨干，真正不同的是消费视觉流的方式；把观察上下文做成一等、外部可控变量，可以把固定 policy 变成可由 Agent 动态组合的导航原语。多任务训练、规模扩展和真机演示被用于支持其通用性与实用性。

### 证据支持的较窄结论

Qwen-RobotNav 证明了一条有潜力的工程路线：在大型 VLM 上增加统一航点头，用自然语言标识多视角时序结构，再以训练期配置随机化获得推理期上下文可调性。它在作者选择的多项基准上达到强结果，R2R 接口消融和 4B 部署延迟为关键直接证据。

现有证据还不足以证明任意配置稳健、跨任务自动选参、单调模型 scaling、开放环境安全或第三方可复现。更准确的定位是**闭源权重、未开源实现、跨任务监督训练的可重配置导航基础模型原型**。

## 局限与适用边界

### 作者明确报告或实验直接承认的局限

- token 分配是经验启发式，作者明确认为还可用更有原则的算法改进。
- 大 $B$ 与大 $\gamma$ 的收益非单调：视觉上下文过多或过度偏向最近帧会损害部分指标。
- 开放词汇 ObjectNav 采用 reach-first 探索，SR 较高但 SPL 偏低。
- Tracking 的 TR 最佳，但 SR 低于专用模型；作者把它解释为多任务训练下的权衡。
- AlpaSim 零样本闭环显著落后专用模型，作者只将其解释为有非平凡迁移能力，而非已达到最佳驾驶性能。
- 远端推理依赖网络且抖动更大；板载推理更稳定但受计算/带宽限制。

### 额外识别的局限

- **不可复现**：官方仓库没有源码、配置、数据处理脚本或权重，并明确不计划发布权重。
- **随机化因果未隔离**：没有固定配置训练对照，无法确定可调性有多少来自随机化，而非 Qwen3-VL 本身或海量增强数据。
- **“任意配置”表述过强**：训练只覆盖有限区间，论文仅在 R2R 上测试轻度区间外推。
- **规模证据不完整**：正文宣称 2B→8B 有利，但表格主要只有 4B/8B，且多项指标 4B 更好；没有等算力、等数据、多随机种子 scaling 曲线。
- **统计报告不足**：所有主表均无 seed 数、标准差、置信区间或显著性检验，500-episode 消融也没有不确定性。
- **协议异质**：HM3D v1/v2、单目/全景、额外 depth/odometry、驾驶历史先验不同，跨论文排行榜不能视作严格控制实验。
- **导航模型与系统混杂**：EQA 同时加入专有上层 LLM、视觉工具和记忆；没有模块消融，也没有披露工具实现与 prompt。
- **动作执行缺口**：没有说明 $E_A$ 的 token 位置、8 航点时间尺度、重规划频率、低层控制器、碰撞检查、异常轨迹拒绝或紧急停止。
- **数据透明度不足**：全部 dataset sampling rates、自动生成视频所用模型/阈值、VLM 目标拒绝率、图像编辑几何偏差和潜在训练—评测污染均未完整审计。
- **自动驾驶条件较强**：NAVSIM 最佳结果使用前三帧真实轨迹先验；移除后性能大降，AlpaSim 又显示明显 out-of-domain 安全缺口。
- **实景证据是选择性案例**：没有分母、失败录像、碰撞/接管率、路线随机化或多环境统计，无法把“zero-shot demo”外推为可靠部署。
- **文档内部不一致**：arXiv 网页摘要误写骨干，官方 README 的 196/204 ms 部署归属与论文不一致。
- **安全与隐私未讨论**：长时程视觉 notebook、远端图像传输和开放环境行人数据带来隐私、网络攻击与误识别风险，论文没有系统评估。

## 我的思考

Qwen-RobotNav 最值得继承的不是某个排行榜数字，而是把“视觉历史如何进入策略”提升为 Agent 可以调用的控制面。过去很多导航系统只让上层决定**去哪**，本文进一步让上层决定**看多少过去、偏重哪台相机、是全局回看还是最近窗口**。这相当于把注意力预算从模型内部隐变量变成系统 API，为资源受限部署和长时程任务提供了清晰接口。

但当前接口仍是手工启发式。更强的后续方案应让上层根据不确定性、目标可见性、回环需要和计算预算学习配置策略，例如把 $B$、$\gamma$ 与下一步信息价值联系起来，并显式加入延迟/能耗成本。训练时还应有固定配置与随机配置的成对对照，才能证明 robustness 来源。

第二个关键问题是安全分层。Qwen-RobotNav 的 8 航点更适合作为高层 proposal，而不是无条件执行的最终控制：局部几何规划器应检查可达性，runtime shield 应限制速度、曲率和碰撞风险，系统应在不确定时请求新视角或人工接管。VLN-PE 的高 fall rate、Tracking 的 collision trade-off 和 AlpaSim 的出界率已经说明，语义规划能力与物理安全不是同一件事。

最后，若要证明“Agentic 导航”而不只是组合演示，最有信息量的实验会是：固定 Qwen-RobotNav 权重，对比静态配置、手工动态配置、上层 LLM 动态配置与学习型配置；同时报告任务成功、路径效率、调用次数、token、延迟、能耗、碰撞和记忆错误。这样才能判断可参数化接口是否真正给 Agent 带来系统级收益。

## 参考文献

1. Zhang, J., Zhou, G., Yin, H., Huang, Y., Lei, Z., Peng, Q., et al. (2026). *Qwen-RobotNav Technical Report: A Scalable Navigation Model Designed for an Agentic Navigation System*. arXiv:2606.18112v3. [arXiv](https://arxiv.org/abs/2606.18112) · [PDF](https://arxiv.org/pdf/2606.18112v3) · [arXiv/DataCite DOI](https://doi.org/10.48550/arXiv.2606.18112)
2. Qwen Team. (2026). *Qwen-RobotNav Official Repository*. [官方仓库](https://github.com/QwenLM/Qwen-RobotNav) · [审计固定提交](https://github.com/QwenLM/Qwen-RobotNav/tree/f74cf1f6079300aee6e40e03858da2f98b1b7261)
3. Qwen Team. (2026). *Qwen-RobotNav Blog*. [官方博客](https://qwen.ai/blog?id=qwen-robotnav)
