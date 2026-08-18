# Reasoning-VLA: A Fast and General Vision-Language-Action Reasoning Model for Autonomous Driving｜全文双语阅读器（draft）

> **状态：source-mapped draft。** 已完成全文页段映射与开篇核心段落人工翻译；其余逐段翻译、图表紧裁和公式转写均显式标为待处理。本文不是摘要替代品。

## 文献元数据

- **作者 / 机构**：Dapeng Zhang、Zhenlong Yuan、Zhangquan Chen、Chih-Ting Liao、Yinda Chen、Fei Shen、Qingguo Zhou、Tat-Seng Chua；Lanzhou University、National University of Singapore、University of Science and Technology of China、Tsinghua University、University of New South Wales
- **年份 / 载体**：2025；arXiv v1；OpenReview 后续版本使用修订标题
- **原文**：[官方来源](https://arxiv.org/abs/2511.19912)
- **原博客笔记**：[中文文献笔记](../../_posts/2026-08-18-reasoning-vla.md)
- **源文件**：`/tmp/literature-vla-pdfs/reasoning-vla.pdf`（17 页，可检索文本 PDF）

## 页面索引

[p.1](#page-1) · [p.2](#page-2) · [p.3](#page-3) · [p.4](#page-4) · [p.5](#page-5) · [p.6](#page-6) · [p.7](#page-7) · [p.8](#page-8) · [p.9](#page-9) · [p.10](#page-10) · [p.11](#page-11) · [p.12](#page-12)
[p.13](#page-13) · [p.14](#page-14) · [p.15](#page-15) · [p.16](#page-16) · [p.17](#page-17)

## 术语表

| Canonical term | 中文 | 首次使用 / 决定 |
|---|---|---|
| learnable action queries | 可学习动作查询 | query 译为查询，保留模块语义 |
| parallel action generation | 并行动作生成 | 与自回归动作解码区分 |
| spatially-guided reasoning | 空间引导推理 | 标题核心术语 |
| generalization | 泛化 | 涉及跨车辆与跨场景 |

## 全文逐段对照

<a id="page-1"></a>
### Page 1

<a id="S001"></a>
**Source:** p.1 S001 · Abstract

**Original:** Vision-Language-Action (VLA) models have recently shown strong decision-making capabilities in autonomous driving. However, existing VLAs often struggle with achieving efficient inference and generalizing to novel autonomous vehicle configurations and driving scenarios. In this paper, we propose Reasoning-VLA, a general and fast action-generation VLA framework. The proposed model employs a set of learnable action queries, initialized via Gaussian sampling from ground-truth trajectories within the training corpus. These learnable queries interact with reasoning-enhanced vision-language features to generate continuous action trajectories in parallel. To promote robust generalization, we consolidate eight publicly available autonomous driving datasets into a standardized, Chain-of-Thought reasoning-based, and easy-to-use data format for model training. Leveraging both supervised learning and reinforcement learning fine-tuning, extensive empirical evaluations across multiple benchmarks demonstrate that Reasoning-VLA achieves state-of-the-art performance, superior generalization capability, and the excellent inference speed reported to date.

**中文:** 视觉-语言-动作（VLA）模型近期在自动驾驶决策中展现出较强能力，但现有 VLA 往往难以同时实现高效推理，并泛化到新的自动驾驶车辆配置和驾驶场景。本文提出 Reasoning-VLA，一个通用且快速的动作生成 VLA 框架。模型采用一组可学习动作查询，这些查询由训练语料中的真实轨迹进行高斯采样初始化；查询与经推理增强的视觉-语言特征交互，以并行方式生成连续动作轨迹。为提升稳健泛化，作者整合八个公开自动驾驶数据集，统一为基于思维链推理且易于使用的训练格式。通过监督学习和强化学习微调，多项基准上的大量实验表明，Reasoning-VLA 达到当时最优性能，具备更强泛化能力，并实现了论文所报告的优异推理速度。

<a id="S002"></a>
**Source:** p.1 S002

**Original:** arXiv:2511.19912v1 [cs.CV] 25 Nov 2025

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S003"></a>
**Source:** p.1 S003

**Original:** Reasoning-VLA: A Fast and General Vision-Language-Action Reasoning Model for Autonomous Driving Dapeng Zhang1,2 , Zhenlong Yuan3 , Zhangquan Chen4 , Chih-Ting Liao5 , Yinda Chen6 Fei Shen2* , Qingguo Zhou1* , Tat-Seng Chua2 1 Lanzhou University, China; 2 National University of Singapore, Singapore 3 University of Science and Technology of China, China; 4 Tsinghua University, China 5 University of New South Wales, Australia; 6 University of Science and Technology of China, China * Corresponding authors

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S004"></a>
**Source:** p.1 S004

**Original:** Abstract Vision-Language-Action (VLA) models have recently shown strong decision-making capabilities in autonomous driving. However, existing VLAs often struggle with achieving efficient inference and generalizing to novel autonomous vehicle configurations and driving scenarios. In this paper, we propose Reasoning-VLA, a general and fast action-generation VLA framework. The proposed model employs a set of learnable action queries, initialized via Gaussian sampling from ground-truth trajectories within the training corpus. These learnable queries interact with reasoning-enhanced vision–language features to generate continuous action trajectories in parallel. To promote robust generalization, we consolidate eight publicly available autonomous driving datasets into a standardized, Chain-of-Thought reasoning–based, and easy-touse data format for model training. Leveraging both supervised learning and reinforcement learning fine-tuning, extensive empirical evaluations across multiple benchmarks demonstrate that Reasoning-VLA achieves state-ofthe-art performance, superior generalization capability, and the excellent inference speed reported to date. Code: https://github.com/xipi702/Reasoning-VLA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S005"></a>
**Source:** p.1 S005

**Original:** 1. Introduction Autonomous driving (AD) is a highly complex system that requires precise environmental perception and reliable driving behavior generation. Traditional end-to-end AD methods initially advanced the field but face issues such as poor scalability, cumulative errors, and limited generalization across hardware and datasets. These limitations hinder their generalization ability to new driving scenarios. Recently, foundation models—especially large language and vision–language models like CLIP, Qwen2.5VL, and DeepSeek-V3 [1, 26, 36]—have shown remarkable

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S006"></a>
**Source:** p.1 S006

**Original:** generalization through large-scale pretraining. Their capabilities offer a promising direction for building more flexible and robust AD systems. Building on these advancements, contemporary frameworks in robotic manipulation and autonomous driving increasingly adopt vision–language generative paradigms (e.g., autoregressive or diffusion-based models [2, 21, 50, 52]), collectively referred to as Vision–Language–Action (VLA) models. These systems generate fine-grained action trajectories from high-level visual–linguistic reasoning, thereby enhancing flexibility and practicality in motion planning and control. Leveraging large-scale pretrained foundation models, recent approaches such as DriveMOE [50] have achieved strong benchmark performance while simultaneously improving interpretability and robustness capabilities in autonomous driving tasks. Despite these promising results, several challenges hinder the widespread deployment of VLAs in autonomous driving: 1) Most existing VLA architectures are based on autoregressive or diffusion models that require multiple inference steps to generate actions, limiting their suitability for real-time, high-frequency control. 2) Current VLA methods lack robust generalization to new vehicle platforms or unseen driving scenarios. We argue that developing a general-purpose foundation VLA requires diverse, largescale datasets that encompass various environments and vehicle configurations. 3) Existing fine-tuning strategies are often inefficient in exploring the full potential of VLAs, constraining their generalization capability. To address these challenges, we propose ReasoningVLA, an efficient and generalist VLA framework that establishes a new state-of-the-art for autonomous driving. First, we design a novel interaction mechanism between action and vision–language modalities by introducing a set of learnable action queries initialized via Gaussian Sampling from ground-truth trajectories in the dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-2"></a>
### Page 2

<a id="S007"></a>
**Source:** p.2 S007

**Original:** myvla Pipeline

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S008"></a>
**Source:** p.2 S008

**Original:** N Hidden States

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S009"></a>
**Source:** p.2 S009

**Original:** VLto A Interaction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S010"></a>
**Source:** p.2 S010

**Original:** VLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S011"></a>
**Source:** p.2 S011

**Original:** Question CoT Reasoning Prompt Ego Status Prompt ...... &lt;answer&gt;&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S012"></a>
**Source:** p.2 S012

**Original:** Images

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S013"></a>
**Source:** p.2 S013

**Original:** Parallel Action Learnable Action Query

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S014"></a>
**Source:** p.2 S014

**Original:** Text

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S015"></a>
**Source:** p.2 S015

**Original:** Gaussian Distribution Initializing

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S016"></a>
**Source:** p.2 S016

**Original:** Refinement

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S017"></a>
**Source:** p.2 S017

**Original:** x1, y1, ...... xn, yn

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S018"></a>
**Source:** p.2 S018

**Original:** Training Process

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S019"></a>
**Source:** p.2 S019

**Original:** ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S020"></a>
**Source:** p.2 S020

**Original:** CoT Reasoning Structured Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S021"></a>
**Source:** p.2 S021

**Original:** User: You are an autonomous driving agent. You have access to multi-view camera images.. Assistant: Provided are the previous ego vehicle status. The data is presented in the format [x, y]:(t-3.0s) [-0.35, 0.02], Acceleration: X -0.52, Y 0.23 m/s^2, Velocity: X 0.49, Y 0.0 m/s, (t-2.5s) [-0.16, 0.02], Acceleration: X -0.38, Y 0.26 m/s^2, Qestion: Your task is to do your best to predict future waypoints for the vehicle over the next 10 timesteps...... GT Answer: [0.00, 0.00], [3.36, -0.02], [6.60, -0.06], [9.75, -0.11], [12.75, -0.16], [15.52, -0.20], [17.85, -0.27], [20.48, 0.30], [22.63, -0.32], [24.46, -0.42]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S022"></a>
**Source:** p.2 S022

**Original:** Causal Reasoning Strategy QA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S023"></a>
**Source:** p.2 S023

**Original:** Regression

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S024"></a>
**Source:** p.2 S024

**Original:** Math QA Answer Generation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S025"></a>
**Source:** p.2 S025

**Original:** t-3.0s [-3.75, 0.05], Acceleration: X -1.12, Y 0.13 m/s^2, Velocity: X 0.57, Y 0.0 m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S026"></a>
**Source:** p.2 S026

**Original:** Generated Answer: [0.00, 0.01], [3.30, -0.03], [6.67, -0.16], [9.71, 0.13], [12.67, -0.10], [15.39, -0.28], [17.78, -0.23], [20.57, -0.51], [22.74, -0.22], [24.89, -0.37]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S027"></a>
**Source:** p.2 S027

**Original:** GT Answer: [0.00, 0.00], [3.36, -0.02], [6.60, -0.06], [9.75, -0.11], [12.75, -0.16], [15.52, -0.20], [17.85, -0.27], [20.48, -0.30], [22.63, -0.32], [24.46, -0.42]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S028"></a>
**Source:** p.2 S028

**Original:** SFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S029"></a>
**Source:** p.2 S029

**Original:** Policy Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S030"></a>
**Source:** p.2 S030

**Original:** t-2.0s [-3.6, 0.02], Acceleration: X 0.84, Y 0.12 m/s^2, Velocity: X 0.22, Y 0.0 m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S031"></a>
**Source:** p.2 S031

**Original:** Rule-Based Reward

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S032"></a>
**Source:** p.2 S032

**Original:** KL

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S033"></a>
**Source:** p.2 S033

**Original:** t-1.0s [-2.9, 0.01], Acceleration: X 2.2, Y 0.06 m/s^2, Velocity: X 1.72, Y 0.0 m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S034"></a>
**Source:** p.2 S034

**Original:** Reference Model RL

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C001"></a>
**Source:** p.2 C001

**Original:** Figure 1. Reasoning-VLA is an efficient Vision–Language–Action (VLA) framework for autonomous driving that employs parallel actions to interact with reasoning-enhanced vision–language models (VLMs), enabling one-step prediction of future trajectories. The model is trained on our unified and generalized autonomous driving dataset using a combination of supervised fine-tuning (SFT) and reinforcement learning (RL), guided by specifically designed rule-based reward functions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S035"></a>
**Source:** p.2 S035

**Original:** These learnable queries interact with reasoning-enhanced vision–language representations through cross-attention to extract action-related information efficiently and generate continuous trajectories in parallel. Second, to enable generalization, we construct a unified, Chain-of-Thought reasoning-based dataset that merges eight publicly available autonomous driving datasets into a coherent and easy-touse format. This dataset covers diverse vehicle platforms and driving scenarios, enhancing the generalization ability of Reasoning-VLA. Finally, we adopt a two-stage training strategy that combines supervised fine-tuning (SFT) and reinforcement learning (RL) to fully exploit the model’s reasoning and planning potential. Extensive experiments demonstrate that Reasoning-VLA significantly improves generalization ability, planning performance, and inference speed compared with existing VLA approaches. To summarize, the main contributions are as follows: • We propose Reasoning-VLA, an efficient and fast VLA framework that employs learnable action queries to interact with reasoning-enhanced vision–language representations, enabling one-step parallel action generation. • We initialize learnable action queries via Gaussian Distribution Sampling from ground-truth trajectories, improving model efficiency. • We construct a unified, Chain-of-Thought reasoningbased autonomous driving dataset that merges eight existing datasets, facilitating generalization across vehicle types and driving environments. • We employ a combined SFT and RL fine-tuning strategy augmented with physical and dynamic rewards to en-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S036"></a>
**Source:** p.2 S036

**Original:** hance the general reasoning ability of Reasoning-VLA, achieving substantial improvements over prior methods.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S037"></a>
**Source:** p.2 S037

**Original:** 2. Related Work 2.1. Classic Autonomous Driving Classic autonomous driving (AD) methods have been developed over many years, evolving from modular systems to modern end-to-end learning frameworks [14, 25, 34, 35, 51, 54, 55]. Early AD systems were typically constructed by cascading these single-task modules into a sequential pipeline [24, 27, 28, 46, 55]. However, such designs suffer from error accumulation, where inaccuracies in upstream tasks propagate through subsequent modules, ultimately degrading overall system performance. To address this issue, recent research has shifted toward end-to-end learning-based approaches that integrate all sub-tasks into a unified framework. Modern open-source end-to-end AD methods increasingly rely on bird’s-eye view (BEV) feature representations and generate planning trajectories through cross-interactions among internal components [5, 13, 18– 20]. Meanwhile, other approaches exploit sparse feature extraction from the 3D environment to directly infer results from image features, thereby avoiding the computational cost of constructing explicit BEV features [41, 46]. Collectively, these advances have simplified the traditional multistage AD pipeline, marking the beginning of a new era of data-driven autonomous driving.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S038"></a>
**Source:** p.2 S038

**Original:** 2.2. Vision-Language-Action Models With the rapid advancement of VLMs in recent years [1, 22, 23, 26, 36, 57, 58], researchers have increasingly integrated

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-3"></a>
### Page 3

<a id="S039"></a>
**Source:** p.3 S039

**Original:** VLMs into autonomous driving and robotic systems to enhance overall performance. For instance, DriveVLM and DriveMM [15, 42] incorporate VLM modules to improve situational understanding and enhance generalization in vehicle control. DriveMLM [45] introduces a behavior planning module that produces optimal driving decisions along with rationales. Although these methods effectively model visionlanguage representations, they often neglect the role of action generation, limiting their practical applicability. To address this, recent works have explored integrating visionlanguage understanding with action prediction, directly fine-tuning large pre-trained VLMs to estimate robot actions [2, 3, 56]. These approaches, commonly referred to as Vision–Language–Action (VLA) models. Recent representative VLA methods demonstrate significant performance improvements. OpenVLA [21] employs a pre-trained VLM combined with a discretization bin tokenizer to predict actions. Similarly, π0.5 [17] leverages co-training and hybrid multimodal examples—incorporating robot observations, language instructions, and low-level actions—within a single unified model, achieving SOTA performance. The success of VLAs in robotics provides a promising direction for autonomous driving. Some approaches extend novel VLM architectures to train billion-parameter policies with task-specific modifications, offering a direct pathway for AD systems to benefit from rapid VLM advancements [52]. However, most existing VLA methods rely on autoregressive or diffusion-based training and inference, which inherently limits their speed and efficiency [50].

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S040"></a>
**Source:** p.3 S040

**Original:** ities of autonomous driving models [52].

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S041"></a>
**Source:** p.3 S041

**Original:** 2.3. Fine-tuning with Reinforcement Learning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S042"></a>
**Source:** p.3 S042

**Original:** Most existing Vision–Language–Action (VLA) methods either rely on a specialized action tokenizer to convert actions into a format compatible with LLMs—followed by autoregressive generation or employ diffusion/flow matching modules to refine VLM hidden states or noise in order to produce continuous action values. In contrast, our Reasoning-VLA, built on the Qwen2.5-VL symbolic reasoning framework, fundamentally differs from these autoregression-based and diffusion-based approaches [2, 21, 52]. To bridge vision-language representations and action prediction, Reasoning-VLA comprises three primary components: A pre-trained VLM reasoning backbone; A VL-to-Action module that leverages a set of learnable action queries for parallel action decoding; A refinement module that enhances action prediction performance. As illustrated in Fig. 1, the learnable action queries are designed with the same feature dimensionality as the Qwen2.5-VL reasoning model. These queries undergo self-attention and cross-attention with the VLM simultaneously. By employing additional learnable queries, Reasoning-VLA can predict action chunks in a single step, rather than generating actions token by token, as required in autoregressive approaches. The features from these action queries, together

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S043"></a>
**Source:** p.3 S043

**Original:** With the development of extensive pre-training techniques and high-level general capabilities, Reinforcement Learning (RL) has achieved remarkable success in advancing the reasoning and decision-making abilities of LLMs. Reinforcement Learning from Human Feedback (RLHF) approaches, such as PPO [38], typically require training a reward model to optimize the policy network. However, this process can be complex and often unstable. Notably, models such as GPT-4 [33] follow this RL-based fine-tuning paradigm. Building upon PPO, DPO [37] fine-tunes pretrained models to follow instructions and align with human preferences, while eliminating the need for sampling during fine-tuning. Similarly, Qwen3 [49] employs DPO to improve performance in applications. Another variant, GRPO [39], uses sampling to estimate advantages, thereby effectively enhancing the reasoning capabilities of actors. For example, DeepSeek-R1 [11] applies GRPO to advance LLM reasoning, emphasizing self-evolution rather than fine-tuning data. Inspired by these methods, recent works have adopted analogous RL-based fine-tuning strategies to improve the reasoning and decision-making capabil-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S044"></a>
**Source:** p.3 S044

**Original:** 3. Method As illustrated in Fig. 1, the Reasoning-VLA framework comprises three main components: (1) a reasoningenhanced vision–language model (VLM) backbone, (2) an action module that interacts with the VLM and enables parallel decoding of action trajectories, and (3) a multi-stage intermediate refinement module. In the following sections, we present a detailed description of our approach to developing a VLA framework for autonomous driving and highlight key insights.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S045"></a>
**Source:** p.3 S045

**Original:** 3.1. Preliminaries: Vision-Language Models In this work, we adopt Qwen2.5-VL [1] as our foundational model. Qwen2.5-VL effectively simulates humanlike analytical thinking, supporting multi-step reasoning, deliberate planning, and problem-solving. Qwen2.5-VL incorporates several architectural innovations: a redesigned Vision Transformer (ViT) with 2D-RoPE and windowed attention for computational efficiency; an MLP-based vision–language merger that compresses visual features into tokens suitable for the LLM; and a large language model initialized with pre-trained Qwen2.5 weights. The model not only exhibits strong vision–language understanding but also maintains robust LLM reasoning capabilities. Furthermore, it generalizes effectively across domains without requiring task-specific fine-tuning, making it a suitable base model for applications such as autonomous driving and action execution in real-world scenarios.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S046"></a>
**Source:** p.3 S046

**Original:** 3.2. The Structure of Reasoning-VLA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-4"></a>
### Page 4

<a id="S047"></a>
**Source:** p.4 S047

**Original:** VLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S048"></a>
**Source:** p.4 S048

**Original:** Cross-Attn

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S049"></a>
**Source:** p.4 S049

**Original:** VLM KV Cache

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S050"></a>
**Source:** p.4 S050

**Original:** Self-Attn

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S051"></a>
**Source:** p.4 S051

**Original:** Learnable Action Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S052"></a>
**Source:** p.4 S052

**Original:** with intermediate VLM representations, are subsequently processed by a series of refinement modules to produce the final action trajectories. The architectural design of Reasoning-VLA offers four key advantages: 1. Leverages the reasoning capabilities of the VLM for more informed and context-aware action generation. 2. Parallel action generation via action queries enables significantly higher inference speed compared to autoregressive or diffusion-based methods. 3. Learnable action queries are initialized with Gaussiandistributed ground-truth actions, improving model performance. 4. Refinement modules interact with intermediate hidden states to enhance feature representation and trajectory accuracy.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S053"></a>
**Source:** p.4 S053

**Original:** Action KV

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S054"></a>
**Source:** p.4 S054

**Original:** Gaussian Sample Initialization with Action GTs

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C002"></a>
**Source:** p.4 C002

**Original:** Figure 2. The action module interacts with the vision-language model (VLM). The learnable action queries are initialized using a Gaussian distribution derived from the ground-truth (GT) action data. Through self-attention and cross-attention mechanisms with the reasoning VLM, the model transfers the generalized reasoning capability from the VL to A.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S055"></a>
**Source:** p.4 S055

**Original:** 3.3. Learnable Action Queries and Initialization 3.3.1. Learnable Action Queries We initialize a set of learnable action queries AQ ∈ T × N × D. Here T is the number of future time steps to be predicted, N is the dimensions of action trajectory coordinate, D is the feature dimensionality. As shown in Fig.2. Unlike VLMs, which embedded input tokens into embeddings, our action queries are initialized as learnable parameters. This design provides greater flexibility and expressive capacity, enabling parallel prediction of action trajectories, and offering an efficient alternative to sequential token generation. 3.3.2. Learnable Action Query Initialization To accelerate training convergence, we also initialize the action queries with a set of predefined parameters. These predefined parameters must satisfy two criteria: 1. The predefined parameters must match the shape of action queries; 2. The reasonable initial values that reflect typical action distributions. Given that the total number of action values is T × N , in our method, we predict future T steps for N coordinates (e.g., x, y), total action query is N × T . We have to generate T × N action queries with D dimensions. Specifically, we extract the action trajectory values of each frame firstly (each frame have N × T action values, the total action trajectory values are Dall × N × T , where Dall is the total number of frames in our datasets), then we calculate the mean action values, such as, x1 , y1 , x2 , y2 , xi , yi , ..., xN , yN , each xi , yi represents the average coordinate for the corresponding position. To match the feature dimension of action queries, we extend the N × T action values to N × T × D, by sampling D values from a Gaussian distribution with the previously calculated mean and variance. This procedure completes the initialization of the learnable action queries, providing a well-structured and informative starting point for training.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S056"></a>
**Source:** p.4 S056

**Original:** 3.4. How Do Actions Interact with Vision-Language Reasoning? Unlike autoregression-based or diffusion-based visionlanguage-action (VLA) methods, our approach employs in-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S057"></a>
**Source:** p.4 S057

**Original:** dependent learnable action queries to predict action trajectories. Consequently, the interaction between the action module and the vision-language model (VLM) differs substantially. Since the action queries are not tied to the VLM’s token representations, they first perform self-attention and then interact with the VLM through cross-attention, as illustrated in Fig. 2. Through these attention mechanisms, the action queries can extract rich and semantically meaningful information from the VLM’s hidden states, which contain extensive reasoning content. This interaction strategy provides a significant advantage: the action queries can generate all expected actions in parallel during a single forward pass, enabling efficient action chunking. This contrasts with autoregression-based VLAs that require sequential tokenby-token processing. Our approach reduces action generation from more than N × T sequential passes to a single pass, substantially improving both training and inference efficiency. Furthermore, we eliminate the discretization process used in autoregressive VLAs, which often degrades fine-grained action details. In addition, we replace the causal attention mask with bidirectional mask, allowing models to predict all actions simultaneously.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S058"></a>
**Source:** p.4 S058

**Original:** 3.5. Action Refinement Module To further enhance the representation quality and accuracy of the predicted action trajectories, we introduce an Action Refinement Module (ARM). Specifically, the ARM takes the selected hidden states of the action queries as input and refines them through a combination of multilayer perceptron (MLP) and attention mechanisms. Unlike nexttoken prediction methods (e.g., π0 ), which employ discrete action representations, our approach adopts a regressionbased strategy to generate continuous actions. This design preserves the efficiency benefits of parallel action prediction while improving the precision and smoothness of the resulting action trajectories.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-5"></a>
### Page 5

<a id="S059"></a>
**Source:** p.5 S059

**Original:** 3.6. SFT and RL Drawing inspiration from recent advances in VLMs, we employ two complementary training strategies to enhance the generalization ability of our model: supervised fine-tuning (SFT) and reinforcement learning (RL) fine-tuning. SFT. In this stage, we utilize our unified reasoning dataset to construct structured reasoning chains. Prior studies in VLMs have shown that base models tend to generate tangential or unstructured responses without supervised fine-tuning. Therefore, the SFT process is essential for establishing a solid foundation for subsequent RL training. Reasoning-VLA demonstrates excellent performance on the unified reasoning dataset after SFT. RL. Although SFT effectively fits the training data, it often struggles to generalize to unseen or out-of-distribution scenarios. To address this limitation, we apply the GRPO [39] during RL fine-tuning. Unlike conventional policybased methods, GRPO replaces the critic model—typically as large as the policy model—with an estimation of group scores. This design not only simplifies the overall architecture but also significantly reduces computational overhead during training. The rule-based reward functions used for RL optimization are introduced in the following subsection.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S060"></a>
**Source:** p.5 S060

**Original:** 3.7. Reward Functions Normally, AD methods use BEV 2-dimensions coordinates x, y to optimize the loss function, while neglecting physical trajectory constraints and vehicle dynamics. In our RL fine-tuning stage, we design two types of verifiable reward functions to more accurately evaluate and enhance the quality of generated responses. Physical Trajectory Reward Different from most regression-based reward functions PN that employ the mean squared Euclidean distance N1 i=1 (xi − xigt )2 , we adopt a weighted Euclidean distance to better align the predicted coordinates with the ground-truth trajectories. Specifically, our physical trajectory reward is defined as: N  1 X i i 2 rtraj = 1 − γ α(xi − xigt )2 + β(y i − ygt ) (1) N i=1 where N is the number of trajectory steps, xi and y i are the predicted coordinates at the i-th time step, and xigt and i ygt are their corresponding ground-truth values. Because the x and y coordinates in autonomous driving often differ in scale, the weighting factors α and β are introduced to balance their respective contributions to the reward. The term γ i represents a discount factor that reduces the influence of future trajectory points. This reward function encourages the autonomous vehicle to follow the desired route by penalizing deviations across the entire trajectory. Vehicle Dynamic Reward In autonomous driving, most existing studies rarely incorporate vehicle kinematic and dynamic constraints into motion trajectory prediction.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C003"></a>
**Source:** p.5 C003

**Original:** Figure 3. Statistical distribution of the unified dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S061"></a>
**Source:** p.5 S061

**Original:** However, these constraints exert a non-negligible influence on the vehicle’s behavior and overall driving safety. To address this limitation, we propose a Vehicle Dynamics Reward that explicitly accounts for steering and acceleration to constrain the limitations of real-world vehicle dynamics. This design establishes a dynamic constraint optimization objective that ensures physically feasible and stable motion trajectories. The generated action trajectories are governed by both steering kinematics and acceleration dynamics. Specifically, the maximum steering angle is limited to 40 degrees, and the maximum acceleration is constrained to 0.6 gravity. Moreover, abrupt changes in steering or acceleration may lead to vehicle instability or discomfort for passengers. To achieve comfortable and safe driving behavior, the steering constraint reward is defined as: (   N −1 j j−1 / xj − xj−1 | &lt; 0.84 1 X 1, | y − y rsteer =   N − 1 j=1 0, | y j − y j−1 / xj − xj−1 | ≥ 0.84 (2) where (xj , y j ) and (xj−1 , y j−1) respectively denote the predicted coordinates at j − th and (j − 1) − th time step. In this reward function, we reward with 1 when the turning angle is less than 0.84. We further introduce an Acceleration Reward to constrain non-physical vehicle dynamics. The acceleration reward is defined as: p (xj+1 − xj )2 + (y j+1 − y j )2 accj = T2 (3) p j j−1 2 (x − x ) + (y j − y j−1 )2 − T2 ( N −2 1 X 1, |accj | &lt; 6 racc = (4) N − 2 j=1 0, |accj | ≥ 6 Here N is the number of trajectory steps, T is the time interval between consecutive actions, j is the j-th trajectory step. As shown in equation above, the reward function effectively constrains steering and acceleration within physical limits, ensuring that the generated action trajectories are both physically realizable and socially acceptable in

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-6"></a>
### Page 6

<a id="C004"></a>
**Source:** p.6 C004

**Original:** Table 1. Open-loop performance on the nuScenes dataset. Our fully generalized methods, Reasoning-VLA-3B and Reasoning-VLA7B, follow the complete SFT and RL training process described in the Methods section. The training dataset is our unified dataset, which is constructed from NAVSIM [9], nuScenes [4], Waymo [40], Argoverse-V2 [48], KITTI [10], Mapillary [32], ONCE [31], and IDD [43]. The validation dataset comprises the corresponding nuScenes validation clips from the unified dataset. Reasoning-VLA-7B+ is fine-tuned with an additional RL process using the corresponding nuScenes training clips from the unified dataset. *: Official checkpoints re-validated with corrected metrics, sourced from [12]. Reasoning-VLA-7B represents our general model.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S062"></a>
**Source:** p.6 S062

**Original:** L2 (m) ↓ 1s 2s 3s End2End Autonomous Driving Methods ST-P3[12] 1.33 2.11 2.90 0.45 0.70 1.04 UniAD[13]* VAD[20]* 0.41 0.70 1.05 PPAD[6] 0.30 0.69 1.26 SparseDrive[41] 0.29 0.63 0.97 VLM &amp; VLA Autonomous Driving Methods DriveVLM-Dual[42] 0.15 0.29 0.48 0.14 0.29 0.55 OmniDrive[44] EMMA+[16] 0.13 0.27 0.48 Impromptu-VLA[7] 0.13 0.27 0.53 Our Reasoning-VLA Methods Reasoning-VLA-3B 0.08 0.33 0.48 Reasoning-VLA-7B 0.05 0.20 0.44 Reasoning-VLA-7B+ 0.05 0.19 0.41 Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S063"></a>
**Source:** p.6 S063

**Original:** Collision Rate (%) ↓ 2s 3s Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S064"></a>
**Source:** p.6 S064

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S065"></a>
**Source:** p.6 S065

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S066"></a>
**Source:** p.6 S066

**Original:** 2.11 0.73 0.72 0.75 0.63

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S067"></a>
**Source:** p.6 S067

**Original:** 0.23 0.62 0.07 0.03 0.03

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S068"></a>
**Source:** p.6 S068

**Original:** 0.62 0.58 0.17 0.22 0.09

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S069"></a>
**Source:** p.6 S069

**Original:** 1.27 0.63 0.41 0.73 0.19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S070"></a>
**Source:** p.6 S070

**Original:** 0.71 0.61 0.22 0.33 0.10

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S071"></a>
**Source:** p.6 S071

**Original:** 0.31 0.33 0.29 0.30

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S072"></a>
**Source:** p.6 S072

**Original:** 0.05 0.00 – –

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S073"></a>
**Source:** p.6 S073

**Original:** 0.08 0.13 – –

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S074"></a>
**Source:** p.6 S074

**Original:** 0.17 0.78 – –

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S075"></a>
**Source:** p.6 S075

**Original:** 0.10 0.30 – –

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S076"></a>
**Source:** p.6 S076

**Original:** 0.30 0.23 0.22

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S077"></a>
**Source:** p.6 S077

**Original:** 0.04 0.01 0.02

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S078"></a>
**Source:** p.6 S078

**Original:** 0.13 0.07 0.06

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S079"></a>
**Source:** p.6 S079

**Original:** 0.23 0.15 0.13

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S080"></a>
**Source:** p.6 S080

**Original:** 0.13 0.08 0.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S081"></a>
**Source:** p.6 S081

**Original:** mixed traffic scenarios. This design further reinforces the autonomous driving system’s ability to maintain stable and reasonable motion patterns, which are essential for safe and comfortable driving. The final reward rtotal is defined as the weighted sum of rtraj , rsteer and racc .

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S082"></a>
**Source:** p.6 S082

**Original:** The processing pipeline for the unified dataset is illustrated in Fig. 5 of Appendix B. A representation of the dataset is also provided in the Appendix B.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S083"></a>
**Source:** p.6 S083

**Original:** rtotal = θ1 rtraj + θ2 rsteer + θ3 racc

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S084"></a>
**Source:** p.6 S084

**Original:** We conduct experiments to evaluate Reasoning-VLA as an efficient VLA method for autonomous driving, assess the effectiveness of our training process, and explore its potential as a unified base model for specific autonomous driving tasks. The experiments are designed to answer the following questions: 1. How does Reasoning-VLA compare to prior autonomous driving VLA, when evaluated across multiple datasets and under various generalization scenarios? 2. How does each design affect the performance of fine-tuned Reasoning-VLA on general autonomous driving tasks? 3. Can the design of Reasoning-VLA influence inference efficiency (action generation throughput and latency) and make it more accessible?

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S085"></a>
**Source:** p.6 S085

**Original:** (5)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S086"></a>
**Source:** p.6 S086

**Original:** Here, θ1 , θ2 , θ3 are coefficients that balance the contributions of each sub-reward.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S087"></a>
**Source:** p.6 S087

**Original:** 4. Unified Datasets To capture diverse driving scenarios and further improve generalization, we specifically selected eight widely used autonomous driving datasets as the foundation for our unified dataset: NAVSIM [9], nuScenes [4], Waymo [40], Argoverse-V2 [48], KITTI [10], Mapillary [32], ONCE [31], and IDD [43]. However, many of the original clips lack meaningful text-image associations and often have coarse annotations, limiting their suitability for visionlanguage-action (VLA) reasoning and creative generation. From these sources, we carefully selected over 75,000 high-quality clips to form a reasoning-intensive dataset. Each clip was processed using a strong reasoning VLM to generate Chain-of-Thought descriptions, followed by comprehensive human verification and visualization to ensure correctness and annotation quality. The final dataset is provided in a consistent, standardized format, facilitating downstream training and evaluation. The statistical analysis of the resulting unified dataset is presented in Fig. 3.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S088"></a>
**Source:** p.6 S088

**Original:** 5. Experiments

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S089"></a>
**Source:** p.6 S089

**Original:** 5.1. Experiment Setups In our experiments, we mainly evaluate Reasoning-VLA’s performance on unified AD datasets, which are constructed from eight autonomous driving datasets. To fairly compare with existing methods, we retain the original training and testing splits of each dataset. During training, we shuffle the unified datasets and fine-tune Reasoning-VLA sequen-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-7"></a>
### Page 7

<a id="C005"></a>
**Source:** p.7 C005

**Original:** Table 2. Closed-loop performance on the NeuroNCAP. We utilize the challenging closed-loop NeuroNCAP simulator to emulate a wide range of complex real-world driving scenarios. NeuroNCAP provides pretrained rendering model checkpoints, making it particularly wellsuited for evaluating our method. For our experiments, we downloaded the NeuroAD weights, adapted the evaluation scripts accordingly, and conducted the closed-loop evaluation. Since NeuroNCAP offers a standardized benchmark and evaluation metrics commonly used by other methods, we adhered to its recommended configuration. The Reasoning-VLA modules and fine-tuning process are identical to those employed in the open-loop evaluation. *: Sourced from [29, 53].

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S090"></a>
**Source:** p.7 S090

**Original:** NeuroNCAP Score ↑ Stationary Frontal Side End2End &amp; VLA Autonomous Driving Methods UniAD[13]* 0.84 0.10 1.26 0.47 0.04 1.45 VAD[20]* SparseDrive[41]* – – – BridgeAD-B[53]* – – – Impromptu-VLA[7] 1.77 2.31 2.10 Our Reasoning-VLA Methods Reasoning-VLA-3B 1.88 2.29 1.94 1.93 2.57 2.24 Reasoning-VLA-7B Reasoning-VLA-7B+ 2.06 2.33 2.17 Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S091"></a>
**Source:** p.7 S091

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S092"></a>
**Source:** p.7 S092

**Original:** Collision Rate (%) ↓ Stationary Frontal Side

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S093"></a>
**Source:** p.7 S093

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S094"></a>
**Source:** p.7 S094

**Original:** 0.73 0.66 0.92 1.60 2.15

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S095"></a>
**Source:** p.7 S095

**Original:** 87.8 96.2 – – 70.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S096"></a>
**Source:** p.7 S096

**Original:** 98.4 99.6 – – 59.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S097"></a>
**Source:** p.7 S097

**Original:** 79.6 81.6 – – 65.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S098"></a>
**Source:** p.7 S098

**Original:** 88.6 92.5 93.9 72.6 65.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S099"></a>
**Source:** p.7 S099

**Original:** 2.04 2.25 2.19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S100"></a>
**Source:** p.7 S100

**Original:** 63.7 59.8 57.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S101"></a>
**Source:** p.7 S101

**Original:** 60.4 56.0 57.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S102"></a>
**Source:** p.7 S102

**Original:** 64.1 62.2 64.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S103"></a>
**Source:** p.7 S103

**Original:** 62.7 59.4 59.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S104"></a>
**Source:** p.7 S104

**Original:** tially using SFT followed by RL. The decay learning rate are start from 5e-4 and e-6 form SFT and RL separately, the accumulated size is 2. Training is performed for 4 epochs for SFT and 1 epoch for RL, using a total batch size of 8 distributed across 8 H200 GPUs. For open-loop evaluation, we use the same testing and validation clips as employed by prior methods. For closed-loop evaluation, the model is tested on the NeuroNCAP benchmark to enable a fair comparison with other approaches.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S105"></a>
**Source:** p.7 S105

**Original:** ditional fine-tuning further improves performance across all time intervals: Reasoning-VLA-7B+ achieves increases of 4.3% and 12.5% over Reasoning-VLA-7B in average L2 and Collision Rate, respectively. These results indicate that our approach provides significant improvements in openloop evaluation, highlighting the strong generalization capability of the Reasoning-VLA architecture. Consequently, it can serve as an effective base model for downstream autonomous driving tasks.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S106"></a>
**Source:** p.7 S106

**Original:** 5.2. Main Comparison Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S107"></a>
**Source:** p.7 S107

**Original:** 5.2.2. Closed-loop Evaluation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S108"></a>
**Source:** p.7 S108

**Original:** 5.2.1. Open-loop Evaluation Since our goal is to propose a generalized VLA model for autonomous driving, we train our model using the proposed unified dataset. To ensure a fair comparison with prior methods, we adopt the same validation splits and report results on open-loop benchmarks. The open-loop performance on the nuScenes dataset is summarized in Table 1. Three main models are presented in this table: Reasoning-VLA-3B: Based on Qwen2.5-VL-3B, trained using the complete SFT and RL process. ReasoningVLA-7B: Based on Qwen2.5-VL-7B and fine-tuned using the SFT and RL process. Reasoning-VLA-7B+: Similar to Reasoning-VLA-7B, but additionally fine-tuned with RL on selected nuScenes training clips from the unified dataset. Our results show that the purely generalized model, Reasoning-VLA-7B, surpasses previous works across benchmarks, achieving substantial improvements of +23.3% in average L2 and +20.0% in average Collision Rate over the existing best methods. Reasoning-VLA-3B also achieves results comparable to state-of-the-art methods. When fine-tuned with GRPO on specific datasets (i.e., selected nuScenes training clips from the unified dataset), our generalized model demonstrates excellent task-specific performance. As shown in the last row of Table 1, the ad-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S109"></a>
**Source:** p.7 S109

**Original:** We use NeuroNCAP [30] as the closed-loop real-world simulator because it provides renderings of novel, unseen scenarios. Most existing closed-loop real-world simulators are limited in their rendering of the reactions of surrounding objects, such as vehicles and pedestrians, whereas NeuroNCAP offers pretrained rendering model checkpoints, making it particularly well-suited for evaluating our method. As shown in Table 2, the three main models evaluated are the same as those in the open-loop experiments. Our methods demonstrate significant advantages in closed-loop performance on NeuroNCAP. The generalized model, Reasoning-VLA-7B, substantially outperforms prior methods in terms of NeuroNCAP Score and Collision Rate, achieving an average NeuroNCAP Score of 2.25 and an average Collision Rate of 59.4. When additionally finetuned with RL on selected nuScenes training clips from the unified dataset, performance on stationary scenarios shows slight improvement; however, overall performance decreases. This is because the smaller nuScenes dataset adjusts the model to fit that specific data, thereby reducing its generalization ability in closed-loop evaluation. Notably, even Reasoning-VLA-3B surpasses competing methods, achieving more than a 4.3% improvement in average

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-8"></a>
### Page 8

<a id="C006"></a>
**Source:** p.8 C006

**Original:** Table 3. Generalized performance on our unifed dataset. We trained two models using the unified dataset: Reasoning-VLA-7B + SFT: This model is fine-tuned using only supervised fine-tuning (SFT). Reasoning-VLA-7B + SFT + RL: This model undergoes the full training process, including both SFT and reinforcement learning (RL). The training dataset for both models is the unified training dataset. For evaluation, the dataset splits follow the recommendations provided by each original dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S110"></a>
**Source:** p.8 S110

**Original:** Datasets NAVSIM[9] nuScenes[4] Waymo[40] Argoverse-V2[48] KITTI[10] Mapillary[32] ONCE[31] IDD[43] Unified

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S111"></a>
**Source:** p.8 S111

**Original:** Reasoning-VLA-7B + SFT L2 (m) ↓ 1s 2s 3s Avg. 0.05 0.18 0.43 0.22 0.06 0.23 0.48 0.26 0.04 0.15 0.44 0.21 0.01 0.13 0.45 0.20 0.02 0.15 0.48 0.22 0.04 0.44 0.92 0.47 0.07 0.49 0.87 0.48 0.02 0.29 0.77 0.36 0.05 0.20 0.47 0.24

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S112"></a>
**Source:** p.8 S112

**Original:** Collision Rate. These results demonstrate the strong generalization capability of our model, particularly in closed-loop environments that involve previously unseen scenarios. Table 4. Ablation study of components contributions. R-VLA (Reasoning-VLA) is a 7B-parameter model. All experiments were conducted on our unified dataset and evaluated using a selected subset of the nuScenes dataset extracted from the unified dataset

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S113"></a>
**Source:** p.8 S113

**Original:** Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S114"></a>
**Source:** p.8 S114

**Original:** 1s Qwen2.5-VL-7B 0.46 R-VLA(w/o AQ)+SFT 0.09 R-VLA(w/o AQ)+SFT+RL 0.08 R-VLA(w/o AQ-Init)+SFT 0.06 R-VLA(w/o AQ-Init)+SFT+RL 0.08 R-VLA(w/o ARM)+SFT 0.06 R-VLA(w/o ARM)+SFT+RL 0.05 R-VLA+SFT 0.06 R-VLA+SFT+RL 0.05

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S115"></a>
**Source:** p.8 S115

**Original:** L2 (m) ↓ 2s 3s 1.33 2.55 0.31 0.55 0.30 0.52 0.27 0.55 0.23 0.50 0.28 0.53 0.24 0.57 0.23 0.48 0.20 0.44

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S116"></a>
**Source:** p.8 S116

**Original:** Avg. 1.45 0.32 0.30 0.29 0.27 0.29 0.29 0.26 0.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S117"></a>
**Source:** p.8 S117

**Original:** 5.2.3. Generalized Performance To evaluate the generalization capability of ReasoningVLA, we tested Reasoning-VLA-7B on eight sub-datasets. As shown in Table 3, our results demonstrate that Reasoning-VLA exhibits strong generalization performance. The model was trained on the unified dataset and evaluated separately on each sub-dataset. We observed that the L2 performance for each sub-dataset closely matches that of the overall unified validation dataset. The variance of the L2 values is minimal, with variance values of 0.012 and 0.014 for average L2 in Reasoning-VLA-7B with SFT and Reasoning-VLA-7B with SFT plus RL, respectively. These results indicate that our method maintains robust generalization across different driving scenarios and vehicle configurations. Besides, the SFT+RL training strategy achieves

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S118"></a>
**Source:** p.8 S118

**Original:** Reasoning-VLA-7B + SFT + RL L2 (m) ↓ 1s 2s 3s Avg. 0.04 0.18 0.41 0.21 0.05 0.20 0.44 0.23 0.03 0.14 0.48 0.22 0.01 0.14 0.43 0.19 0.01 0.15 0.43 0.20 0.04 0.41 1.01 0.49 0.06 0.43 0.90 0.46 0.03 0.27 0.81 0.37 0.05 0.19 0.43 0.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S119"></a>
**Source:** p.8 S119

**Original:** an improvement compare to SFT alone, highlighting the effectiveness of RL.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S120"></a>
**Source:** p.8 S120

**Original:** 5.3. Ablation Study 5.3.1. Key Design Contributions We conducted ablation studies to evaluate the effectiveness of key component designs, with results summarized in Table 4. Five experimental groups were constructed using different combinations of model components. As shown in Group-1 of Tab.4, the evaluation result of original Qwen2.5-VL-7B in poor performance. Differently, in Group-2, we replaced the learnable action queries with nonlearnable queries and trained the model exclusively on the unified dataset. This modification yielded suboptimal results, achieving an average L2 of 0.32 and 0.30 with SFT and SFT+RL fine-tuning, respectively. In Group-3, only the learnable action query initialization was removed, resulting in a slight performance degradation compared to the full Reasoning-VLA model (Group-5). The results from Groups 2 and 3 suggest that learnable action queries significantly contribute to the model’s ability to generalize across diverse autonomous driving scenarios, thereby enhancing the overall performance of Reasoning-VLA. In Group-4, the action refinement module was removed, and actions were directly regressed from parallel action outputs using an MLP. This sequential strategy led to a modest performance drop relative to Group-5. Overall, these ablation studies demonstrate that each component of Reasoning-VLA contributes to its final performance, confirming the effectiveness of the proposed design. More experiments (including ablation studies, generalization performance, efficiency performance and qualitative results) are illustrated in Appendix A.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S121"></a>
**Source:** p.8 S121

**Original:** 6. Conclusions This paper presents a general and efficient VLA framework based on a reasoning-enhanced vision-language model for autonomous driving. The proposed method introduces

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-9"></a>
### Page 9

<a id="S122"></a>
**Source:** p.9 S122

**Original:** learnable action queries, initialized through Gaussian sampling from ground-truth trajectories, which interact with reasoning-augmented vision–language features to generate continuous action trajectories in parallel, thereby significantly improving inference efficiency. To enhance generalization, we unify eight existing autonomous driving datasets into a standardized, reasoning-based, and easyto-use unified dataset. Following supervised fine-tuning (SFT) and reinforcement learning (RL) optimization, our method demonstrates outstanding performance and strong generalization capabilities in autonomous driving tasks.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S123"></a>
**Source:** p.9 S123

**Original:** References [1] Shuai Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, Sibo Song, Kai Dang, Peng Wang, Shijie Wang, Jun Tang, Humen Zhong, Yuanzhi Zhu, Mingkun Yang, Zhaohai Li, Jianqiang Wan, Pengfei Wang, Wei Ding, Zheren Fu, Yiheng Xu, Jiabo Ye, Xi Zhang, Tianbao Xie, Zesen Cheng, Hang Zhang, Zhibo Yang, Haiyang Xu, and Junyang Lin. Qwen2.5-vl technical report. arXiv preprint arXiv:2502.13923, 2025. 1, 2, 3 [2] Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, James Tanner, Quan Vuong, Anna Walling, Haohuan Wang, and Ury Zhilinsky. π0 : A vision-language-action flow model for general robot control, 2024. 1, 3 [3] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli Ding, Danny Driess, Avinava Dubey, Chelsea Finn, Pete Florence, Chuyuan Fu, Montse Gonzalez Arenas, Keerthana Gopalakrishnan, Kehang Han, Karol Hausman, Alexander Herzog, Jasmine Hsu, Brian Ichter, Alex Irpan, Nikhil Joshi, Ryan Julian, Dmitry Kalashnikov, Yuheng Kuang, Isabel Leal, Lisa Lee, Tsang-Wei Edward Lee, Sergey Levine, Yao Lu, Henryk Michalewski, Igor Mordatch, Karl Pertsch, Kanishka Rao, Krista Reymann, Michael Ryoo, Grecia Salazar, Pannag Sanketi, Pierre Sermanet, Jaspiar Singh, Anikait Singh, Radu Soricut, Huong Tran, Vincent Vanhoucke, Quan Vuong, Ayzaan Wahid, Stefan Welker, Paul Wohlhart, Jialin Wu, Fei Xia, Ted Xiao, Peng Xu, Sichun Xu, Tianhe Yu, and Brianna Zitkovich. Rt-2: Vision-language-action models transfer web knowledge to robotic control, 2023. 3 [4] Holger Caesar, Varun Bankiti, Alex H. Lang, Sourabh Vora, Venice Erin Liong, Qiang Xu, Anush Krishnan, Yu Pan, Giancarlo Baldan, and Oscar Beijbom. nuscenes: A multimodal dataset for autonomous driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2020. 6, 8, 2 [5] Shaoyu Chen, Bo Jiang, Hao Gao, Bencheng Liao, Qing Xu, Qian Zhang, Chang Huang, Wenyu Liu, and Xinggang Wang. Vadv2: End-to-end vectorized autonomous driving via probabilistic planning, 2024. 2 [6] Zhili Chen, Maosheng Ye, Shuangjie Xu, Tongyi Cao, and

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S124"></a>
**Source:** p.9 S124

**Original:** [7]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S125"></a>
**Source:** p.9 S125

**Original:** [8]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S126"></a>
**Source:** p.9 S126

**Original:** [9]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S127"></a>
**Source:** p.9 S127

**Original:** [10]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S128"></a>
**Source:** p.9 S128

**Original:** [11]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S129"></a>
**Source:** p.9 S129

**Original:** [12]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S130"></a>
**Source:** p.9 S130

**Original:** [13]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S131"></a>
**Source:** p.9 S131

**Original:** [14] [15]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S132"></a>
**Source:** p.9 S132

**Original:** [16]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S133"></a>
**Source:** p.9 S133

**Original:** [17]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S134"></a>
**Source:** p.9 S134

**Original:** Qifeng Chen. Ppad: Iterative interactions of prediction and planning for end-to-end autonomous driving, 2024. 6 Haohan Chi, Huan ang Gao, Ziming Liu, Jianing Liu, Chenyu Liu, Jinwei Li, Kaisen Yang, Yangcheng Yu, Zeda Wang, Wenyi Li, Leichen Wang, Xingtao Hu, Hao Sun, Hang Zhao, and Hao Zhao. Impromptu vla: Open weights and open data for driving vision-language-action models, 2025. 6, 7 Kashyap Chitta, Aditya Prakash, Bernhard Jaeger, Zehao Yu, Katrin Renz, and Andreas Geiger. Transfuser: Imitation with transformer-based sensor fusion for autonomous driving. IEEE transactions on pattern analysis and machine intelligence, 45(11):12878–12895, 2022. 2 Daniel Dauner, Marcel Hallgarten, Tianyu Li, Xinshuo Weng, Zhiyu Huang, Zetong Yang, Hongyang Li, Igor Gilitschenski, Boris Ivanovic, Marco Pavone, Andreas Geiger, and Kashyap Chitta. Navsim: Data-driven nonreactive autonomous vehicle simulation and benchmarking, 2024. 6, 8, 2 Andreas Geiger, Philip Lenz, Christoph Stiller, and Raquel Urtasun. Vision meets robotics: The kitti dataset. The international journal of robotics research, 32(11):1231–1237, 2013. 6, 8 Daya Guo, Dejian Yang, Haowei Zhang, Junxiao Song, Ruoyu Zhang, Runxin Xu, Qihao Zhu, Shirong Ma, Peiyi Wang, and et al. Deepseek-r1: Incentivizing reasoning capability in llms via reinforcement learning, 2025. 3 Shengchao Hu, Li Chen, Penghao Wu, Hongyang Li, Junchi Yan, and Dacheng Tao. St-p3: End-to-end vision-based autonomous driving via spatial-temporal feature learning, 2022. 6 Yihan Hu, Jiazhi Yang, Li Chen, Keyu Li, Chonghao Sima, Xizhou Zhu, Siqi Chai, Senyao Du, Tianwei Lin, Wenhai Wang, Lewei Lu, Xiaosong Jia, Qiang Liu, Jifeng Dai, Yu Qiao, and Hongyang Li. Planning-oriented autonomous driving, 2023. 2, 6, 7 Junjie Huang and Guan Huang. Bevdet4d: Exploit temporal cues in multi-camera 3d object detection, 2022. 2 Zhijian Huang, Chengjian Fen, Feng Yan, Baihui Xiao, Zequn Jie, Yujie Zhong, Xiaodan Liang, and Lin Ma. Drivemm: All-in-one large multimodal model for autonomous driving. arXiv preprint arXiv:2412.07689, 2024. 3 Jyh-Jing Hwang, Runsheng Xu, Hubert Lin, Wei-Chih Hung, Jingwei Ji, Kristy Choi, Di Huang, Tong He, Paul Covington, Benjamin Sapp, Yin Zhou, James Guo, Dragomir Anguelov, and Mingxing Tan. Emma: End-to-end multimodal model for autonomous driving, 2025. 6 Physical Intelligence, Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Z. Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Springenberg, Kyle Stachowicz, James Tanner, Quan Vuong, Homer Walke, Anna Walling, Haohuan Wang, Lili Yu, and Ury Zhilinsky. π0.5 : a

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-10"></a>
### Page 10

<a id="S135"></a>
**Source:** p.10 S135

**Original:** [18]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S136"></a>
**Source:** p.10 S136

**Original:** [19]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S137"></a>
**Source:** p.10 S137

**Original:** [20]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S138"></a>
**Source:** p.10 S138

**Original:** [21]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S139"></a>
**Source:** p.10 S139

**Original:** [22]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S140"></a>
**Source:** p.10 S140

**Original:** [23]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S141"></a>
**Source:** p.10 S141

**Original:** [24]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S142"></a>
**Source:** p.10 S142

**Original:** [25]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S143"></a>
**Source:** p.10 S143

**Original:** [26]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S144"></a>
**Source:** p.10 S144

**Original:** [27]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S145"></a>
**Source:** p.10 S145

**Original:** [28]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S146"></a>
**Source:** p.10 S146

**Original:** [29] [30]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S147"></a>
**Source:** p.10 S147

**Original:** [31]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S148"></a>
**Source:** p.10 S148

**Original:** vision-language-action model with open-world generalization, 2025. 3 Xiaosong Jia, Penghao Wu, Li Chen, Jiangwei Xie, Conghui He, Junchi Yan, and Hongyang Li. Think twice before driving: Towards scalable decoders for end-to-end autonomous driving, 2023. 2 Xiaosong Jia, Zhenjie Yang, Qifeng Li, Zhiyuan Zhang, and Junchi Yan. Bench2drive: Towards multi-ability benchmarking of closed-loop end-to-end autonomous driving, 2024. Bo Jiang, Shaoyu Chen, Qing Xu, Bencheng Liao, Jiajie Chen, Helong Zhou, Qian Zhang, Wenyu Liu, Chang Huang, and Xinggang Wang. Vad: Vectorized scene representation for efficient autonomous driving, 2023. 2, 6, 7 Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, Quan Vuong, Thomas Kollar, Benjamin Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey Levine, Percy Liang, and Chelsea Finn. Openvla: An opensource vision-language-action model, 2024. 1, 3 Junnan Li, Dongxu Li, Caiming Xiong, and Steven Hoi. BLIP: Bootstrapping language-image pre-training for unified vision-language understanding and generation. In Proceedings of the 39th International Conference on Machine Learning, pages 12888–12900. PMLR, 2022. 2 Junnan Li, Dongxu Li, Silvio Savarese, and Steven Hoi. BLIP-2: Bootstrapping language-image pre-training with frozen image encoders and large language models. In Proceedings of the 40th International Conference on Machine Learning, pages 19730–19742. PMLR, 2023. 2 Zhiqi Li, Wenhai Wang, Hongyang Li, Enze Xie, Chonghao Sima, Tong Lu, Qiao Yu, and Jifeng Dai. Bevformer: Learning bird’s-eye-view representation from multi-camera images via spatiotemporal transformers, 2022. 2 Ming Liang, Bin Yang, Wenyuan Zeng, Yun Chen, Rui Hu, Sergio Casas, and Raquel Urtasun. Pnpnet: End-to-end perception and prediction with tracking in the loop, 2020. 2 Aixin Liu, Bei Feng, Bing Xue, Bingxuan Wang, Bochao Wu, Chengda Lu, Chenggang Zhao, Chengqi Deng, Chenyu Zhang, and et al. Deepseek-v3 technical report, 2025. 1, 2 Yicheng Liu, Jinghuai Zhang, Liangji Fang, Qinhong Jiang, and Bolei Zhou. Multimodal motion prediction with stacked transformers, 2021. 2 Yicheng Liu, Tianyuan Yuan, Yue Wang, Yilun Wang, and Hang Zhao. Vectormapnet: End-to-end vectorized hd map learning, 2023. 2 William Ljungbergh and et al. Neural rendering for safetycritical autonomous driving simulation, 2024. 7 William Ljungbergh, Adam Tonderski, Joakim Johnander, Holger Caesar, Kalle Åström, Michael Felsberg, and Christoffer Petersson. Neuroncap: Photorealistic closedloop safety testing for autonomous driving, 2024. 7 Jiageng Mao, Niu Minzhe, ChenHan Jiang, hanxue liang, Jingheng Chen, Xiaodan Liang, Yamin Li, Chaoqiang Ye, Wei Zhang, Zhenguo Li, Jie Yu, Chunjing XU, and Hang Xu. One million scenes for autonomous driving: Once dataset. In Proceedings of the Neural Information Processing Systems Track on Datasets and Benchmarks, 2021. 6, 8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S149"></a>
**Source:** p.10 S149

**Original:** [32] Gerhard Neuhold, Tobias Ollmann, Samuel Rota Bulo, and Peter Kontschieder. The mapillary vistas dataset for semantic understanding of street scenes. In Proceedings of the IEEE international conference on computer vision, pages 4990– 4999, 2017. 6, 8, 2 [33] OpenAI, Josh Achiam, Steven Adler, Sandhini Agarwal, Lama Ahmad, et al. Gpt-4 technical report, 2024. 3 [34] Jonah Philion and Sanja Fidler. Lift, splat, shoot: Encoding images from arbitrary camera rigs by implicitly unprojecting to 3d, 2020. 2 [35] Aditya Prakash, Kashyap Chitta, and Andreas Geiger. Multimodal fusion transformer for end-to-end autonomous driving, 2021. 2 [36] Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, and Ilya Sutskever. Learning transferable visual models from natural language supervision, 2021. 1, 2 [37] Rafael Rafailov, Archit Sharma, Eric Mitchell, Christopher D Manning, Stefano Ermon, and Chelsea Finn. Direct preference optimization: Your language model is secretly a reward model. Advances in Neural Information Processing Systems, 36:53728–53741, 2023. 3 [38] John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, and Oleg Klimov. Proximal policy optimization algorithms, 2017. 3 [39] Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, YK Li, Y Wu, et al. Deepseekmath: Pushing the limits of mathematical reasoning in open language models. arXiv preprint arXiv:2402.03300, 2024. 3, 5 [40] Pei Sun, Henrik Kretzschmar, Xerxes Dotiwalla, Aurelien Chouard, Vijaysai Patnaik, Paul Tsui, James Guo, Yin Zhou, Yuning Chai, Benjamin Caine, et al. Scalability in perception for autonomous driving: Waymo open dataset. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 2446–2454, 2020. 6, 8 [41] Wenchao Sun, Xuewu Lin, Yining Shi, Chuang Zhang, Haoran Wu, and Sifa Zheng. Sparsedrive: End-to-end autonomous driving via sparse scene representation, 2024. 2, 6, 7 [42] Xiaoyu Tian, Junru Gu, Bailin Li, Yicheng Liu, Yang Wang, Zhiyong Zhao, Kun Zhan, Peng Jia, Xianpeng Lang, and Hang Zhao. Drivevlm: The convergence of autonomous driving and large vision-language models, 2024. 3, 6 [43] Girish Varma, Anbumani Subramanian, Anoop Namboodiri, Manmohan Chandraker, and CV Jawahar. Idd: A dataset for exploring problems of autonomous navigation in unconstrained environments. In 2019 IEEE winter conference on applications of computer vision (WACV), pages 1743–1751. IEEE, 2019. 6, 8, 2 [44] Shihao Wang, Zhiding Yu, Xiaohui Jiang, Shiyi Lan, Min Shi, Nadine Chang, Jan Kautz, Ying Li, and Jose M. Alvarez. Omnidrive: A holistic vision-language dataset for autonomous driving with counterfactual reasoning, 2025. 6 [45] Wenhai Wang, Jiangwei Xie, ChuanYang Hu, Haoming Zou, Jianan Fan, Wenwen Tong, Yang Wen, Silei Wu, Hanming

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-11"></a>
### Page 11

<a id="S150"></a>
**Source:** p.11 S150

**Original:** [46]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S151"></a>
**Source:** p.11 S151

**Original:** [47]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S152"></a>
**Source:** p.11 S152

**Original:** [48]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S153"></a>
**Source:** p.11 S153

**Original:** [49]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S154"></a>
**Source:** p.11 S154

**Original:** [50]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S155"></a>
**Source:** p.11 S155

**Original:** [51]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S156"></a>
**Source:** p.11 S156

**Original:** [52]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S157"></a>
**Source:** p.11 S157

**Original:** [53]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S158"></a>
**Source:** p.11 S158

**Original:** [54]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S159"></a>
**Source:** p.11 S159

**Original:** [55]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S160"></a>
**Source:** p.11 S160

**Original:** [56]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S161"></a>
**Source:** p.11 S161

**Original:** Deng, Zhiqi Li, Hao Tian, Lewei Lu, Xizhou Zhu, Xiaogang Wang, Yu Qiao, and Jifeng Dai. Drivemlm: Aligning multimodal large language models with behavioral planning states for autonomous driving, 2023. 3 Yue Wang, Vitor Guizilini, Tianyuan Zhang, Yilun Wang, Hang Zhao, and Justin Solomon. Detr3d: 3d object detection from multi-view images via 3d-to-2d queries, 2021. 2 Xinshuo Weng, Boris Ivanovic, Yan Wang, Yue Wang, and Marco Pavone. Para-drive: Parallelized architecture for realtime autonomous driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 15449–15458, 2024. 2 Benjamin Wilson, William Qi, Tanmay Agarwal, John Lambert, Jagjeet Singh, Siddhesh Khandelwal, Bowen Pan, Ratnesh Kumar, Andrew Hartnett, Jhony Kaesemodel Pontes, et al. Argoverse 2: Next generation datasets for self-driving perception and forecasting. arXiv preprint arXiv:2301.00493, 2023. 6, 8, 2 Chenfei Wu, Jiahao Li, Jingren Zhou, Junyang Lin, Kaiyuan Gao, Kun Yan, Sheng ming Yin, Shuai Bai, Xiao Xu, Yilei Chen, Yuxiang Chen, Zecheng Tang, Zekai Zhang, Zhengyi Wang, An Yang, Bowen Yu, Chen Cheng, Dayiheng Liu, Deqing Li, Hang Zhang, Hao Meng, Hu Wei, Jingyuan Ni, Kai Chen, Kuan Cao, Liang Peng, Lin Qu, Minggang Wu, Peng Wang, Shuting Yu, Tingkun Wen, Wensen Feng, Xiaoxiao Xu, Yi Wang, Yichang Zhang, Yongqiang Zhu, Yujia Wu, Yuxuan Cai, and Zenan Liu. Qwen-image technical report, 2025. 3 Zhenjie Yang, Yilin Chai, Xiaosong Jia, Qifeng Li, Yuqian Shao, Xuekai Zhu, Haisheng Su, and Junchi Yan. Drivemoe: Mixture-of-experts for vision-language-action model in endto-end autonomous driving, 2025. 1, 3 Tianyuan Yuan, Yicheng Liu, Yue Wang, Yilun Wang, and Hang Zhao. Streammapnet: Streaming mapping network for vectorized online hd map construction, 2023. 2 Zhenlong Yuan, Jing Tang, Jinguo Luo, Rui Chen, Chengxuan Qian, Lei Sun, Xiangxiang Chu, Yujun Cai, Dapeng Zhang, and Shuo Li. Autodrive-r2 : Incentivizing reasoning and self-reflection capacity for vla model in autonomous driving. 2025. 1, 3 Bozhou Zhang, Nan Song, Xin Jin, and Li Zhang. Bridging past and future: End-to-end autonomous driving with historical prediction and planning, 2025. 7 Dapeng Zhang, Peng Zhi, Binbin Yong, Jin-Qiang Wang, Yufeng Hou, Lan Guo, Qingguo Zhou, and Rui Zhou. Ehss: An efficient hybrid-supervised symmetric stereo matching network. 2023 IEEE 26th International Conference on Intelligent Transportation Systems (ITSC), pages 1044–1051, 2023. 2 Dapeng Zhang, Dayu Chen, Peng Zhi, Yinda Chen, Zhenlong Yuan, Chenyang Li, Sunjing, Rui Zhou, and Qingguo Zhou. Mapexpert: Online hd map construction with simple and efficient sparse map element expert. 2024. 2 Dapeng Zhang, Jing Sun, Chenghui Hu, Xiaoyan Wu, Zhenlong Yuan, Rui Zhou, Fei Shen, and Qingguo Zhou. Pure vision language action (vla) models: A comprehensive survey. 2025. 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S162"></a>
**Source:** p.11 S162

**Original:** [57] Deyao Zhu, Jun Chen, Xiaoqian Shen, Xiang Li, and Mohamed Elhoseiny. Minigpt-4: Enhancing vision-language understanding with advanced large language models. arXiv preprint arXiv:2304.10592, 2023. 2 [58] Jinguo Zhu, Weiyun Wang, Zhe Chen, Zhaoyang Liu, Shenglong Ye, Lixin Gu, Hao Tian, Yuchen Duan, Weijie Su, Jie Shao, Zhangwei Gao, Erfei Cui, Xuehui Wang, Yue Cao, Yangzhou Liu, Xingguang Wei, Hongjie Zhang, Haomin Wang, Weiye Xu, Hao Li, Jiahao Wang, Nianchen Deng, Songze Li, Yinan He, Tan Jiang, Jiapeng Luo, Yi Wang, Conghui He, Botian Shi, Xingcheng Zhang, Wenqi Shao, Junjun He, Yingtong Xiong, Wenwen Qu, Peng Sun, Penglong Jiao, Han Lv, Lijun Wu, Kaipeng Zhang, Huipeng Deng, Jiaye Ge, Kai Chen, Limin Wang, Min Dou, Lewei Lu, Xizhou Zhu, Tong Lu, Dahua Lin, Yu Qiao, Jifeng Dai, and Wenhai Wang. Internvl3: Exploring advanced training and test-time recipes for open-source multimodal models, 2025. 2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-12"></a>
### Page 12

<a id="S163"></a>
**Source:** p.12 S163

**Original:** Reasoning-VLA: A Fast and General Vision-Language-Action Reasoning Model for Autonomous Driving Supplementary Material 7. Appendix A 7.1. Zero-Shot Performance We also conducted a ”zero shot” experiment to further validate the generalization capability of our model. Specifically, the unified dataset was partitioned into distinct scenarios, where the NAVSIM, Waymo, KITTI, and ONCE sub-datasets were used for training, and the remaining four sub-datasets served as validation sets. As shown in Table 5, our method exhibits strong generalization performance on unseen datasets. This experiment confirms that the proposed Reasoning-VLA possesses robust adaptability to new driving scenarios and tasks, highlighting its potential as a general-purpose autonomous driving framework.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S164"></a>
**Source:** p.12 S164

**Original:** 7.2. Performance on NAVSIM Moreover, Tab.6 demonstrates the evaluation results on the NAVSIM evaluation. Compared to the Para-Drive method, our approach achieves respective improvements of 0.8, 5.1, 1.4, and 7.7 in DAC, TTC, EP, and PDMS metrics. Overall, the proposed model consistently delivers accurate and reliable predictions across the NAVSIM evaluations, establishing its state-of-the-art performance and strong generalization capability.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S165"></a>
**Source:** p.12 S165

**Original:** 7.3. More Ablation Studies 7.3.1. The Source of Performance: Generalization Ability or Data Contribution? To further demonstrate that the SOTA performance of Reasoning-VLA arises from its generalization capabilities rather than from reliance on a specific dataset, we conducted two types of experiments, as shown in Tables 7 and 8. We evaluated two types of fine-tuned models: Reasoning-VLA Fine-tuned on the nuScenes Dataset: The Reasoning-VLA (3B and 7B) models were fine-tuned exclusively on the selected nuScenes subset extracted from the unified dataset. Reasoning-VLA Fine-tuned on the Unified Dataset: The Reasoning-VLA (3B and 7B) models were fine-tuned on the entire unified dataset. Open-loop evaluations were performed on the corresponding nuScenes validation subset of the unified dataset. As shown in Table 7, the Reasoning-VLA models finetuned on the unified dataset outperform those fine-tuned solely on the nuScenes subset in terms of average L2 error and collision rate. Specifically, Reasoning-VLA-7B finetuned on the selected nuScenes subset achieves an average

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S166"></a>
**Source:** p.12 S166

**Original:** L2 error of 0.25 and a collision rate of 0.10, which are 8.7% and 25% lower, respectively, than the general ReasoningVLA-7B fine-tuned on the unified dataset. Closed-loop evaluations, summarized in Table 8, further indicate that models fine-tuned on the unified dataset outperform those trained only on the nuScenes subset across all metrics. These results confirm that Reasoning-VLA possesses strong generalization capabilities in autonomous driving scenarios, comparable to those observed in VLMs. 7.3.2. Inference Efficiency To evaluate the inference efficiency of Reasoning-VLA, we conducted experiments summarized in Table 9. Compared to existing autoregression-based VLMs, our method achieves superior performance using the same backbone. Reasoning-VLA can generate multiple future trajectories (e.g., 6 or 10 trajectories) in a single inference step, whereas autoregression-based VLA/VLMs must generate these trajectories sequentially. Even when employing the efficient bin-tokenizer proposed by OpenVLA [21] and π0 [2], these methods require at least 12 to 20 steps to generate the desired trajectories, including both reasoning and trajectory tokens. Our experiments show that Reasoning-VLA achieves a generation speed of 0.089s per inference for 10 trajectories using vLLM, which is approximately 61 times faster than the autoregression-based Qwen2.5-VL7B for the same number of trajectories. These results clearly demonstrate the superior inference efficiency of the Reasoning-VLA design. 7.3.3. Model Size As is well known, the performance of LLMs and VLMs generally improves with an increase in model parameters. To analyze the impact of model size, we compare the 3B and 7B variants of our Reasoning-VLA. As shown in Tables 1 and 2, the Reasoning-VLA-7B model achieves superior performance, with an average L2 error of 0.23 and an average NeuroNCAP Score of 2.25, representing improvements of 30.4% and 9.3%, respectively, over the ReasoningVLA-3B model. This performance gap indicates that larger models inherently possess stronger representational capacity, enabling them to capture more complex patterns and achieve better results.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S167"></a>
**Source:** p.12 S167

**Original:** 7.4. Qualitative Results of Action Trajectories We also provide qualitative results to further demonstrate the effectiveness of Reasoning-VLA. As illustrated in Fig.4, the visualization of predicted action trajectories across eight

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-13"></a>
### Page 13

<a id="C007"></a>
**Source:** p.13 C007

**Original:** Table 5. Zero shot performance on our unified dataset. The unified dataset is divided into two parts: the training set, which includes data from NAVSIM, Waymo, KITTI, and ONCE, and the evaluation sets, which consist of the remaining four sub-datasets along with the unified validation set.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S168"></a>
**Source:** p.13 S168

**Original:** Reasoning-VLA-7B + SFT Datasets 1s nuScenes[4] Argoverse-V2[48] Mapillary[32] IDD[43] All

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S169"></a>
**Source:** p.13 S169

**Original:** 0.07 0.03 0.08 0.09 0.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S170"></a>
**Source:** p.13 S170

**Original:** L2 (m) ↓ 2s 3s 0.24 0.18 0.59 0.41 0.28

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S171"></a>
**Source:** p.13 S171

**Original:** 0.52 0.59 1.09 0.96 0.57

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S172"></a>
**Source:** p.13 S172

**Original:** Reasoning-VLA-7B + SFT + RL

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S173"></a>
**Source:** p.13 S173

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S174"></a>
**Source:** p.13 S174

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S175"></a>
**Source:** p.13 S175

**Original:** 0.28 0.27 0.59 0.49 0.31

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S176"></a>
**Source:** p.13 S176

**Original:** 0.08 0.04 0.07 0.08 0.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S177"></a>
**Source:** p.13 S177

**Original:** L2 (m) ↓ 2s 3s 0.26 0.18 0.57 0.38 0.27

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S178"></a>
**Source:** p.13 S178

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S179"></a>
**Source:** p.13 S179

**Original:** 0.50 0.55 1.01 0.93 0.53

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S180"></a>
**Source:** p.13 S180

**Original:** 0.28 0.26 0.55 0.46 0.29

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C008"></a>
**Source:** p.13 C008

**Original:** Table 6. Performance on the NAVSIM. *: Sourced from [9].

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S181"></a>
**Source:** p.13 S181

**Original:** Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S182"></a>
**Source:** p.13 S182

**Original:** NC↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S183"></a>
**Source:** p.13 S183

**Original:** DAC↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S184"></a>
**Source:** p.13 S184

**Original:** TTC↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S185"></a>
**Source:** p.13 S185

**Original:** Comfort↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S186"></a>
**Source:** p.13 S186

**Original:** EP↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S187"></a>
**Source:** p.13 S187

**Original:** PDMS↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S188"></a>
**Source:** p.13 S188

**Original:** TransFuser[8]* UniAD[13]* Para-Drive[47]* Reasoning-VLA-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S189"></a>
**Source:** p.13 S189

**Original:** 97.7 97.8 97.9 97.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S190"></a>
**Source:** p.13 S190

**Original:** 92.8 91.9 92.4 93.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S191"></a>
**Source:** p.13 S191

**Original:** 92.8 92.9 93.0 98.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S192"></a>
**Source:** p.13 S192

**Original:** 100 100 99.8 99.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S193"></a>
**Source:** p.13 S193

**Original:** 79.2 78.8 79.3 80.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S194"></a>
**Source:** p.13 S194

**Original:** 84.0 83.4 84.0 91.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S195"></a>
**Source:** p.13 S195

**Original:** datasets highlights the strong generalization capability of our method. Notably, Reasoning-VLA produces consistent and accurate trajectory predictions even in previously unseen scenarios, confirming its robustness and adaptability.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S196"></a>
**Source:** p.13 S196

**Original:** 8. Appendix B 8.1. Unified Dataset Existing individual autonomous driving datasets are often limited in scope, providing narrow coverage of the diverse scenarios encountered in real-world driving. To address this, we aggregate eight public datasets to construct a unified, reasoning-intensive dataset designed to support Chainof-Thought generation with a strong reasoning VLM. This unified dataset is organized into a coherent, easy-to-use format to facilitate model training and enhance the generalization capability of Reasoning-VLA. The processing pipeline for the unified dataset is illustrated in Fig. 5. First, all source datasets are converted into a standardized data format. The resulting image-text pairs are then input into a VLM, which generates detailed reasoning content according to a predefined labeling protocol. This reasoning output undergoes a rule-based verification process, followed by human review. During human verification, annotators assess the clips along with their associated labels to select the final set of high-quality data.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S197"></a>
**Source:** p.13 S197

**Original:** 8.2. CoT Reasoning Unifided Dataset Format and Prompt During the SFT stage of our method, we designed a structured input prompt to facilitate the generation of highquality chain-of-thought (CoT) reasoning data. The prompt template is presented as follows: {’role’: ’system’, ’content’: [{’type’: ’ text’, ’text’: ’You are a helpful assistant’}]}, {’role’: ’user’, ’content’: [{’type’: ’ image’, ’image’: ’nuScences_441_4000. CAM_FRONT.png’}, {’type’: ’image’, ’ image’: ’nuScences_441_4000.CAM_LEFT. png’}, {’type’: ’image’, ’image’: ’ nuScences_441_4000.CAM_RIGHT.png’}, {’ type’: ’text’, ’text’: "You are an autonomous driving agent. You have access to multi-view camera images of a vehicle: (1) front view (which you should focus on with the most attention ) &lt;image&gt;, (2) front right view &lt;image &gt;, and (3) front left view &lt;image&gt;. Your task is to do your best to predict future waypoints for the vehicle over the next 10 timesteps, given the vehicle’s intent inferred from the images. Provided are the previous ego vehicle status recorded over the last 3.0 seconds (at 0.5-second intervals). This includes the x and y coordinates

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-14"></a>
### Page 14

<a id="C009"></a>
**Source:** p.14 C009

**Original:** Table 7. Generalization performance on the Open-loop Metrics.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S198"></a>
**Source:** p.14 S198

**Original:** Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S199"></a>
**Source:** p.14 S199

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S200"></a>
**Source:** p.14 S200

**Original:** L2 (m) ↓ 2s 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S201"></a>
**Source:** p.14 S201

**Original:** Collision Rate (%) ↓ 2s 3s Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S202"></a>
**Source:** p.14 S202

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S203"></a>
**Source:** p.14 S203

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S204"></a>
**Source:** p.14 S204

**Original:** 0.33 0.25

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S205"></a>
**Source:** p.14 S205

**Original:** 0.05 0.01

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S206"></a>
**Source:** p.14 S206

**Original:** 0.13 0.08

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S207"></a>
**Source:** p.14 S207

**Original:** 0.27 0.20

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S208"></a>
**Source:** p.14 S208

**Original:** 0.15 0.10

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S209"></a>
**Source:** p.14 S209

**Original:** 0.30 0.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S210"></a>
**Source:** p.14 S210

**Original:** 0.04 0.01

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S211"></a>
**Source:** p.14 S211

**Original:** 0.13 0.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S212"></a>
**Source:** p.14 S212

**Original:** 0.23 0.15

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S213"></a>
**Source:** p.14 S213

**Original:** 0.13 0.08

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S214"></a>
**Source:** p.14 S214

**Original:** Reasoning-VLA Finetuned with nuScenes Dataset Reasoning-VLA-3B Reasoning-VLA-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S215"></a>
**Source:** p.14 S215

**Original:** 0.10 0.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S216"></a>
**Source:** p.14 S216

**Original:** 0.38 0.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S217"></a>
**Source:** p.14 S217

**Original:** 0.51 0.46

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S218"></a>
**Source:** p.14 S218

**Original:** Reasoning-VLA Finetuned with Our Unified Dataset Reasoning-VLA-3B Reasoning-VLA-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S219"></a>
**Source:** p.14 S219

**Original:** 0.08 0.05

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S220"></a>
**Source:** p.14 S220

**Original:** 0.33 0.20

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S221"></a>
**Source:** p.14 S221

**Original:** 0.48 0.44

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C010"></a>
**Source:** p.14 C010

**Original:** Table 8. Generalization performance on the Closed-loop Metrics.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S222"></a>
**Source:** p.14 S222

**Original:** Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S223"></a>
**Source:** p.14 S223

**Original:** NeuroNCAP Score ↑ Stationary Frontal Side

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S224"></a>
**Source:** p.14 S224

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S225"></a>
**Source:** p.14 S225

**Original:** Collision Rate (%) ↓ Stationary Frontal Side

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S226"></a>
**Source:** p.14 S226

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S227"></a>
**Source:** p.14 S227

**Original:** Reasoning-VLA Finetuned with nuScenes Dataset Reasoning-VLA-3B Reasoning-VLA-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S228"></a>
**Source:** p.14 S228

**Original:** 1.67 1.79

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S229"></a>
**Source:** p.14 S229

**Original:** 2.16 2.44

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S230"></a>
**Source:** p.14 S230

**Original:** 1.83 2.12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S231"></a>
**Source:** p.14 S231

**Original:** 1.89 2.12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S232"></a>
**Source:** p.14 S232

**Original:** 69.0 61.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S233"></a>
**Source:** p.14 S233

**Original:** 63.3 57.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S234"></a>
**Source:** p.14 S234

**Original:** 66.6 65.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S235"></a>
**Source:** p.14 S235

**Original:** 66.3 61.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S236"></a>
**Source:** p.14 S236

**Original:** 2.04 2.25

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S237"></a>
**Source:** p.14 S237

**Original:** 63.7 59.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S238"></a>
**Source:** p.14 S238

**Original:** 60.4 56.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S239"></a>
**Source:** p.14 S239

**Original:** 64.1 62.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S240"></a>
**Source:** p.14 S240

**Original:** 62.7 59.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S241"></a>
**Source:** p.14 S241

**Original:** Reasoning-VLA Finetuned with Our Unified Dataset Reasoning-VLA-3B Reasoning-VLA-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S242"></a>
**Source:** p.14 S242

**Original:** 1.88 1.93

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S243"></a>
**Source:** p.14 S243

**Original:** 2.29 2.57

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S244"></a>
**Source:** p.14 S244

**Original:** 1.94 2.24

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C011"></a>
**Source:** p.14 C011

**Original:** Table 9. The Efficiency Comparisons. Steps: Theoretical number of VLM inference steps required to complete a single prediction process. Speed(s): Measured inference time to generate a complete prediction process. All experiments were conducted on an NVIDIA H200 GPU using vLLM. Traj: Number of predicted trajectories.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S245"></a>
**Source:** p.14 S245

**Original:** Methods Qwen2.5-VL-7B(6 Traj) Qwen2.5-VL-7B(10 Traj) Reasoning-VLA-7B(6 Traj) Reasoning-VLA-7B(10 Traj)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S246"></a>
**Source:** p.14 S246

**Original:** Steps ≫ 12 ≫ 20 1 1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S247"></a>
**Source:** p.14 S247

**Original:** Speed(s) 5.396 5.472 0.081 0.089

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S248"></a>
**Source:** p.14 S248

**Original:** of the ego vehicle. Positive x means forward direction while positive y means leftwards. The data is presented in the format [x, y]:(t-3.0s) [-21.95, -0.11], Acceleration: X 0.22, Y 0.21 m/ sˆ2, Velocity: X 6.93, Y 0.0 m/s, (t -2.5s) [-18.42, -0.07], Acceleration: X 0.19, Y 0.22 m/sˆ2, Velocity: X 7.03, Y 0.0 m/s, (t-2.0s) [-14.88, -0.05], Acceleration: X 0.26, Y 0.15 m/sˆ2, Velocity: X 7.16, Y 0.0 m/s, (t-1.5s) [-11.22, -0.02], Acceleration: X 0.16, Y 0.15 m/sˆ2, Velocity: X 7.25, Y 0.0 m /s, (t-1.0s) [-7.15, 0.02], Acceleration: X -0.21, Y 0.16 m/sˆ2, Velocity: X 7.23, Y 0.0 m/s, (t-0.5s)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S249"></a>
**Source:** p.14 S249

**Original:** [-3.52, 0.02], Acceleration: X -0.39, Y 0.19 m/sˆ2, Velocity: X 7.09, Y 0.0 m/ s, (t-0.0s) [0.0, 0.0], Acceleration: X -0.51, Y -0.06 m/sˆ2, Velocity: X 6.88, Y 0.0 m/s&#92;n&#92;nPlease think deeply. Engage in an internal dialogue other natural language thought expressions It ’s a reasoning process. Provide your reasoning between the &lt;think&gt; &lt;/think&gt; tags, and then give your answer between the &lt;answer&gt; &lt;/answer&gt; tags. Predicted future movement details for the next 5 seconds (sampled at 0.5-second intervals), including BEV location in x and y directions (in meters). Positive x means forward direction while positive y means leftwards. The output is formatted as [x, y]."}]}, {’role’: ’assistant’, ’content’: [{’type’: ’text’, ’text’: "&lt;think&gt;&#92;nLet me think . To rephrase the question in a way that requires Chain-of-Thought reasoning with numerical or mathematical expressions, we should break down the prediction of future waypoints into smaller steps, starting from understanding the provided data and applying relevant physics equations . &#92;n&#92;nThe original question asks for

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-15"></a>
### Page 15

<a id="S250"></a>
**Source:** p.15 S250

**Original:** NAVSIM nuScnes Waymo MapillaryV2 Once

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S251"></a>
**Source:** p.15 S251

**Original:** KITTI Argoverse Once NAVSIM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S252"></a>
**Source:** p.15 S252

**Original:** IDD Figure 4. Qualitative Results of Action Trajectories. Reasoning-VLA predictions on eight different datasets.Red lines denote GT trajectories while green lines represent predicted trajectories.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-16"></a>
### Page 16

<a id="S253"></a>
**Source:** p.16 S253

**Original:** ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S254"></a>
**Source:** p.16 S254

**Original:** Rule-Based Verification

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S255"></a>
**Source:** p.16 S255

**Original:** Labels Formatting

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S256"></a>
**Source:** p.16 S256

**Original:** Data Selection

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S257"></a>
**Source:** p.16 S257

**Original:** "role": "user", "content": "You are ... "role": "assistant", "content": " Given the ego status of ... ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S258"></a>
**Source:** p.16 S258

**Original:** Time series alignment Raw data filter Cam FOV alignment Labels Alignment ... ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S259"></a>
**Source:** p.16 S259

**Original:** Temporary alignment Format checking Coordinate alignment Time stamp alignment Scene checking Objects checking ……

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S260"></a>
**Source:** p.16 S260

**Original:** Public Datasets

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S261"></a>
**Source:** p.16 S261

**Original:** X1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S262"></a>
**Source:** p.16 S262

**Original:** X2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S263"></a>
**Source:** p.16 S263

**Original:** XT-2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S264"></a>
**Source:** p.16 S264

**Original:** XT-1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S265"></a>
**Source:** p.16 S265

**Original:** XT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S266"></a>
**Source:** p.16 S266

**Original:** Question:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S267"></a>
**Source:** p.16 S267

**Original:** You are driving on the street, from the images and ego ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S268"></a>
**Source:** p.16 S268

**Original:** Ranking Step 1 Step N

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S269"></a>
**Source:** p.16 S269

**Original:** VLM Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S270"></a>
**Source:** p.16 S270

**Original:** Step 1 Step N

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S271"></a>
**Source:** p.16 S271

**Original:** Unsatisfactory Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S272"></a>
**Source:** p.16 S272

**Original:** Human Verification

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S273"></a>
**Source:** p.16 S273

**Original:** The predicted action x, y …. The action is 19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S274"></a>
**Source:** p.16 S274

**Original:** Enhanced Reasoning X0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S275"></a>
**Source:** p.16 S275

**Original:** X1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S276"></a>
**Source:** p.16 S276

**Original:** X2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S277"></a>
**Source:** p.16 S277

**Original:** Qwen2.5-VL

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S278"></a>
**Source:** p.16 S278

**Original:** XT-2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S279"></a>
**Source:** p.16 S279

**Original:** XT-1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S280"></a>
**Source:** p.16 S280

**Original:** we should break down the prediction of future waypoints into …original question asks for predicting the future waypoints directly from the given vehicle status, but let's derive the…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S281"></a>
**Source:** p.16 S281

**Original:** Reasoning CoT generation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S282"></a>
**Source:** p.16 S282

**Original:** Logits Projection Labels Images ……

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C012"></a>
**Source:** p.16 C012

**Original:** Figure 5. Pipeline for generating the unified reasoning dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S283"></a>
**Source:** p.16 S283

**Original:** predicting the future waypoints directly from the given vehicle status, but let’s derive the waypoints through intermediate calculations. &#92;n &#92;nOh, I see. The question now needs to be framed in such a way that the responder understands they need.&#92;n&lt;/think&gt;&#92;n&lt; answer&gt;&lt;|place_holder|&gt;&lt;|place_holder |&gt;&lt;|place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;| place_holder|&gt;&lt;|place_holder|&gt;&lt;/answer &gt;"}]}, {’actions’: array([[0. , 0. ], [0.40046561, 0.39716284], [0.39221381, 0.33593741], [0.39243497, 0.31284149], [0.38875668, 0.28942805], [0.38467048, 0.27311695], [0.38409407, 0.26829267], [0.38829151, 0.27437078], [0.3931127 , 0.28797924], [0.39968362, 0.29992925]])}

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S284"></a>
**Source:** p.16 S284

**Original:** 8.3. Training Details The training details of SFT and RL are illustrated below. 8.3.1. SFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S285"></a>
**Source:** p.16 S285

**Original:** batch_size 8 gradient_accumulation_steps 2 learning_rate 5e-5 bf16 gradient_checkpointing true attn_implementation flash_attention_2 num_train_epochs 4 max_grad_norm 5 zero2 config: { "fp16": { "enabled": "auto", "loss_scale": 0, "loss_scale_window": 1000, "initial_scale_power": 16, "hysteresis": 2, "min_loss_scale": 1 }, "bf16": { "enabled": "auto" }, "optimizer": { "type": "AdamW", "params": { "lr": "auto", "betas": "auto", "eps": "auto", "weight_decay": "auto" } }, "zero_optimization": { "stage": 2, "offload_optimizer": { "device": "none", "pin_memory": true

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-17"></a>
### Page 17

<a id="S286"></a>
**Source:** p.17 S286

**Original:** }, "allgather_partitions": true, "allgather_bucket_size": 2e8, "overlap_comm": false, "reduce_scatter": true, "reduce_bucket_size": 2e8, "contiguous_gradients": true

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S287"></a>
**Source:** p.17 S287

**Original:** "offload_param": { "device": "none", "pin_memory": true }, "overlap_comm": true, "contiguous_gradients": true, "sub_group_size": 1e9, "reduce_bucket_size": "auto", "stage3_prefetch_bucket_size": " auto", "stage3_param_persistence_threshold ": "auto", "stage3_max_live_parameters": 1e9, "stage3_max_reuse_distance": 1e9, "stage3_gather_16bit_weights _on_model_save": true

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S288"></a>
**Source:** p.17 S288

**Original:** }, "gradient_accumulation_steps": "auto", "gradient_clipping": "auto", "steps_per_print": 100, "train_batch_size": "auto", "train_micro_batch_size_per_gpu": "auto ", "wall_clock_breakdown": false } },

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S289"></a>
**Source:** p.17 S289

**Original:** 8.3.2. RL max_prompt_length 16384 max_completion_length 768 batch_size 8 gradient_accumulation_steps 2 learning_rate 1e-6 lr_scheduler_type "cosine" weight_decay 0.01 bf16 gradient_checkpointing true temporal true len_control true attn_implementation flash_attention_2 max_pixels 401408 num_train_epochs 1 beta 0.04 max_grad_norm num_generations 8 zero3 config: "fp16": { "enabled": "auto", "loss_scale": 0, "loss_scale_window": 1000, "initial_scale_power": 16, "hysteresis": 2, "min_loss_scale": 1 }, "bf16": { "enabled": "auto" }, "zero_optimization": { "stage": 3, "offload_optimizer": { "device": "none", "pin_memory": true },

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S290"></a>
**Source:** p.17 S290

**Original:** "gradient_accumulation_steps": "auto", "gradient_clipping": "auto", "steps_per_print": 100, "train_batch_size": "auto", "train_micro_batch_size_per_gpu": "auto ", "wall_clock_breakdown": false }

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S291"></a>
**Source:** p.17 S291

**Original:** 8.4. Reward Function Implements Our reward functions significantly influence the RL process. For trajectory reward function: rtraj = 1 −

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S292"></a>
**Source:** p.17 S292

**Original:** N  1 X i i 2 γ α(xi − xigt )2 + β(y i − ygt ) (6) N i=1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S293"></a>
**Source:** p.17 S293

**Original:** normally, we can select hyper-parameters (1 in this function) to achieve an accurate reward. Some times we need change the 1 to large numbers such as 2. We can also replaced with another easy way: rtraj = 1−min(1.0,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S294"></a>
**Source:** p.17 S294

**Original:** N  1 X i i 2 γ α(xi − xigt )2 + β(y i − ygt ) ) N i=1 (7)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

## 阅读提示

- 当前文件的价值是稳定保存全文页码与段落锚点，并提供一个经人工复核的开篇双语块。
- 未翻译段落、图表、表格和公式都在 `translation_notes.md` 中登记；完成前不应把本文件标记为正式全文译读。
- 博客笔记可作为研究路线导读，但数值结论仍应回到本读者的具体页码块和原 PDF 核验。
