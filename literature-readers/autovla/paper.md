# AutoVLA: A Vision-Language-Action Model for End-to-End Autonomous Driving with Adaptive Reasoning and Reinforcement Fine-Tuning｜全文双语阅读器（draft）

> **状态：source-mapped draft。** 已完成全文页段映射与开篇核心段落人工翻译；其余逐段翻译、图表紧裁和公式转写均显式标为待处理。本文不是摘要替代品。

## 文献元数据

- **作者 / 机构**：Zewei Zhou、Tianhui Cai、Seth Z. Zhao、Yun Zhang、Zhiyu Huang、Bolei Zhou、Jiaqi Ma；University of California, Los Angeles
- **年份 / 载体**：2025；NeurIPS 2025
- **原文**：[官方来源](https://proceedings.neurips.cc/paper_files/paper/2025/hash/2843fccca5bedd369a4764848b9bd546-Abstract-Conference.html)
- **原博客笔记**：[中文文献笔记](../../_posts/2026-08-18-autovla.md)
- **源文件**：`/tmp/literature-vla-pdfs/autovla.pdf`（30 页，可检索文本 PDF）

## 页面索引

[p.1](#page-1) · [p.2](#page-2) · [p.3](#page-3) · [p.4](#page-4) · [p.5](#page-5) · [p.6](#page-6) · [p.7](#page-7) · [p.8](#page-8) · [p.9](#page-9) · [p.10](#page-10) · [p.11](#page-11) · [p.12](#page-12)
[p.13](#page-13) · [p.14](#page-14) · [p.15](#page-15) · [p.16](#page-16) · [p.17](#page-17) · [p.18](#page-18) · [p.19](#page-19) · [p.20](#page-20) · [p.21](#page-21) · [p.22](#page-22) · [p.23](#page-23) · [p.24](#page-24)
[p.25](#page-25) · [p.26](#page-26) · [p.27](#page-27) · [p.28](#page-28) · [p.29](#page-29) · [p.30](#page-30)

## 术语表

| Canonical term | 中文 | 首次使用 / 决定 |
|---|---|---|
| Vision-Language-Action (VLA) | 视觉-语言-动作模型 | 首次展开，后文保留 VLA |
| action token | 动作 token | 保留 token，不译为词元 |
| fast/slow thinking | 快速/慢速思考 | 对应 trajectory-only / chain-of-thought |
| Group Relative Policy Optimization (GRPO) | 组相对策略优化 | 首次展开，后文保留 GRPO |

## 全文逐段对照

<a id="page-1"></a>
### Page 1

<a id="S001"></a>
**Source:** p.1 S001 · Abstract

**Original:** Recent advancements in Vision-Language-Action (VLA) models have shown promise for end-to-end autonomous driving by leveraging world knowledge and reasoning capabilities. However, current VLA models often struggle with physically infeasible action outputs, complex model structures, or unnecessarily long reasoning. In this paper, we propose AutoVLA, a novel VLA model that unifies reasoning and action generation within a single autoregressive generation model for end-to-end autonomous driving. AutoVLA performs semantic reasoning and trajectory planning directly from raw visual inputs and language instructions. We tokenize continuous trajectories into discrete, feasible actions, enabling direct integration into the language model. For training, we employ supervised fine-tuning to equip the model with dual thinking modes: fast thinking (trajectory-only) and slow thinking (enhanced with chain-of-thought reasoning). To further enhance planning performance and efficiency, we introduce a reinforcement fine-tuning method based on Group Relative Policy Optimization (GRPO), reducing unnecessary reasoning in straightforward scenarios. Extensive experiments across real-world and simulated datasets and benchmarks, including nuPlan, nuScenes, Waymo, and CARLA, demonstrate the competitive performance of AutoVLA in both open-loop and closed-loop settings. Qualitative results showcase the adaptive reasoning and accurate planning capabilities of AutoVLA in diverse scenarios.

**中文:** 视觉-语言-动作（VLA）模型的最新进展表明，借助世界知识和推理能力，VLA 有望用于端到端自动驾驶。然而，现有 VLA 模型往往面临动作输出不符合物理可行性、模型结构复杂或推理过程不必要地冗长等问题。本文提出 AutoVLA：一种面向端到端自动驾驶、在单一自回归生成模型内统一推理与动作生成的新型 VLA。AutoVLA 直接根据原始视觉输入和语言指令完成语义推理与轨迹规划。作者把连续轨迹离散化为物理可行的动作 token，从而可直接集成进语言模型。训练阶段先通过监督微调获得两种思考模式：仅生成轨迹的快速思考，以及加入思维链推理的慢速思考；随后采用基于组相对策略优化（GRPO）的强化微调，在简单场景中减少不必要的推理，以提升规划性能和效率。覆盖 nuPlan、nuScenes、Waymo 与 CARLA 的真实及仿真数据集和基准实验表明，AutoVLA 在开环与闭环设置中均具有竞争力；定性结果进一步展示了它在多类场景下的自适应推理和准确规划能力。

<a id="S002"></a>
**Source:** p.1 S002

**Original:** arXiv:2506.13757v3 [cs.CV] 5 Nov 2025

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S003"></a>
**Source:** p.1 S003

**Original:** AutoVLA: A Vision-Language-Action Model for End-to-End Autonomous Driving with Adaptive Reasoning and Reinforcement Fine-Tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S004"></a>
**Source:** p.1 S004

**Original:** Zewei Zhou∗ Tianhui Cai∗ Seth Z. Zhao Yun Zhang Zhiyu Huang† Bolei Zhou Jiaqi Ma University of California, Los Angeles https://autovla.github.io/

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S005"></a>
**Source:** p.1 S005

**Original:** Introduction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S006"></a>
**Source:** p.1 S006

**Original:** Autonomous driving systems typically adopt a modular paradigm, decomposing the driving task into different sub-modules, such as perception [1–3], prediction [4–6], and planning [7–9]. While this design enables structured development, it may cause error accumulation and a lack of joint optimization across modules, leading to suboptimal performance [10, 11]. End-to-end autonomous driving has gained prominence with a unified model architecture that maps raw sensor inputs directly to final driving actions. These models are trained on human driving data, enhancing scalability and human-like behavior. Vision-based approaches have garnered significant interest due to their affordability and ease of deployment [12–15]. However, conventional end-to-end methods [16–19] primarily focus on imitating expert trajectories, lacking essential world knowledge for understanding and reasoning about surrounding environments, particularly in long-tail or challenging scenarios. Recent advances in Vision-Language Models (VLMs) [20–22] have gained significant interest by introducing models capable of leveraging extensive world knowledge and powerful reasoning. These models have shown strong potential in ∗ †

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S007"></a>
**Source:** p.1 S007

**Original:** Equal contribution. Email: {zeweizhou, tianhui}@ucla.edu Corresponding author. Email: zhiyuh@ucla.edu

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S008"></a>
**Source:** p.1 S008

**Original:** 39th Conference on Neural Information Processing Systems (NeurIPS 2025).

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-2"></a>
### Page 2

<a id="S009"></a>
**Source:** p.2 S009

**Original:** Final Trajectory Top-K Token Not in Top-K

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S010"></a>
**Source:** p.2 S010

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S011"></a>
**Source:** p.2 S011

**Original:** Vision Encoder

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S012"></a>
**Source:** p.2 S012

**Original:** L-Language Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S013"></a>
**Source:** p.2 S013

**Original:** Action Codebook

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S014"></a>
**Source:** p.2 S014

**Original:** t=1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S015"></a>
**Source:** p.2 S015

**Original:** p=0 .1 p= 0.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S016"></a>
**Source:** p.2 S016

**Original:** Reasoning Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S017"></a>
**Source:** p.2 S017

**Original:** Text Tokenizer

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S018"></a>
**Source:** p.2 S018

**Original:** Supervised Fine-tuning GT Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S019"></a>
**Source:** p.2 S019

**Original:** 🔥 Vision Encoder 🔥

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S020"></a>
**Source:** p.2 S020

**Original:** LLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S021"></a>
**Source:** p.2 S021

**Original:** Text Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S022"></a>
**Source:** p.2 S022

**Original:** SFT Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S023"></a>
**Source:** p.2 S023

**Original:** .2 p=0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S024"></a>
**Source:** p.2 S024

**Original:** p=0.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S025"></a>
**Source:** p.2 S025

**Original:** p= 0.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S026"></a>
**Source:** p.2 S026

**Original:** in Complex Scenarios

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S027"></a>
**Source:** p.2 S027

**Original:** Change Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S028"></a>
**Source:** p.2 S028

**Original:** Fast Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S029"></a>
**Source:** p.2 S029

**Original:** in Simple Scenarios

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S030"></a>
**Source:** p.2 S030

**Original:** Go Straight

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S031"></a>
**Source:** p.2 S031

**Original:** p=0.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S032"></a>
**Source:** p.2 S032

**Original:** p=0.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S033"></a>
**Source:** p.2 S033

**Original:** p=0.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S034"></a>
**Source:** p.2 S034

**Original:** p=0.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S035"></a>
**Source:** p.2 S035

**Original:** t=2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S036"></a>
**Source:** p.2 S036

**Original:** t=3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S037"></a>
**Source:** p.2 S037

**Original:** Action Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S038"></a>
**Source:** p.2 S038

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S039"></a>
**Source:** p.2 S039

**Original:** Auto Vision Language Action Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S040"></a>
**Source:** p.2 S040

**Original:** System Prompt Task &amp; Thinking Guidance

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S041"></a>
**Source:** p.2 S041

**Original:** 0.2 p=

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S042"></a>
**Source:** p.2 S042

**Original:** 0.2 p=

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S043"></a>
**Source:** p.2 S043

**Original:** Dual Thinking Mode Adaptation Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S044"></a>
**Source:** p.2 S044

**Original:** Chain of Thought

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S045"></a>
**Source:** p.2 S045

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S046"></a>
**Source:** p.2 S046

**Original:** Ego states

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S047"></a>
**Source:** p.2 S047

**Original:** p=0.4 t=0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S048"></a>
**Source:** p.2 S048

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S049"></a>
**Source:** p.2 S049

**Original:** Turn Left | Go Straight …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S050"></a>
**Source:** p.2 S050

**Original:** Velocity | History Action …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S051"></a>
**Source:** p.2 S051

**Original:** 0.2 p= .2 p=0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S052"></a>
**Source:** p.2 S052

**Original:** Vision Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S053"></a>
**Source:** p.2 S053

**Original:** Instruction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S054"></a>
**Source:** p.2 S054

**Original:** A-Action Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S055"></a>
**Source:** p.2 S055

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S056"></a>
**Source:** p.2 S056

**Original:** p= 0. 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S057"></a>
**Source:** p.2 S057

**Original:** V-Vision Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S058"></a>
**Source:** p.2 S058

**Original:** Camera streams

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S059"></a>
**Source:** p.2 S059

**Original:** Reinforcement Fine-tuning RFT ❄ Vision Encoder Reward Model GRPO❄

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S060"></a>
**Source:** p.2 S060

**Original:** LLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S061"></a>
**Source:** p.2 S061

**Original:** LoRA 🔥

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S062"></a>
**Source:** p.2 S062

**Original:** 1. Scene Description The ego vehicle is approaching a construction zone during daylight … - Front: A construction worker is in the center lane, holding a SLOW paddle, and a construction vehicle is blocking the right lane … - Left: The left lane is clear, with a few vehicles ahead .… - Back: Light traAic is present at a distance behind the ego vehicle … 2. Critical Object Description - Construction Worker (center front): Holding a SLOW sign and gesturing, likely managing traAic flow around a construction zone … - Forklift/Loader (front right): Stationary and blocking the right lane… 3. Reasoning on Intent The ego vehicle was previously stopped and is now beginning to move slowly (velocity ≈ 0.44 m/s, low acceleration). The driving command is GO_STRAIGHT, but the direct path is blocked by both the construction worker and the forklift. Meanwhile, the left lane appears clear and viable, with enough space to safely merge. 4. Best Driving Action: change lane to the left with an acceleration.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C001"></a>
**Source:** p.2 C001

**Original:** Figure 1: AutoVLA is an end-to-end autonomous driving framework based on vision-language models that integrates world knowledge into the driving policy. It takes visual observations, vehicle states, and language instructions as input and incorporates CoT reasoning and physical action tokenization to generate planning trajectories directly. The model is trained using supervised fine-tuning to jointly learn reasoning and action, and reinforcement fine-tuning is further applied to enable adaptive reasoning through fast and slow thinking modes, improving performance and efficiency. improving adaptability and scalability across diverse driving scenarios [23–29]. Building upon VLMs, Vision-Language-Action (VLA) models extend this capability to action generation, enabling embodied agents, such as robots [30–32] and autonomous vehicles [33, 34], to produce feasible physical actions based on visual observations and language instructions. Despite recent progress, existing VLA models face two critical limitations in autonomous driving, as illustrated in Fig. 2. 1) Physically-infeasible or complex structure for action generation. Some models generate textual actions or waypoints directly using VLMs [35–37], but these outputs can be physically infeasible and suffer from mode collapse. To address this, recent approaches introduce intermediate meta-actions [38–40] or latent action tokens [41–43], which are then processed by downstream planners or decoders to produce physically feasible trajectories. However, the intermediate representations either break the end-to-end optimization paradigm or increase model complexity and training overhead. 2) Inflexible and inefficient reasoning across diverse scenarios. Most existing models [44, 45] employ a fixed reasoning strategy, lacking the ability to adaptively switch between direct action outputs for straightforward scenarios and chain-of-thought (CoT) reasoning for complex ones. Although DriveVLM [46] introduces a dual-process paradigm, it relies on separate modules (i.e., a VLM for slow reasoning and a conventional end-to-end model for fast responses), which results in a complicated architecture, increased training overhead, and limited scalability [47]. To overcome these limitations, we propose AutoVLA, an end-to-end autonomous driving framework that directly integrates physical action tokens into a pretrained VLM backbone, enabling direct learning of an autoregressive planning policy, as illustrated in Fig. 1. Our unified architecture seamlessly integrates reasoning and action generation, allowing adaptive switching between direct trajectory generation and CoT reasoning. In supervised fine-tuning (SFT), we leverage both trajectoryonly data and CoT reasoning data to equip the model with dual-process capabilities (fast and slow thinking). Furthermore, we propose reinforcement fine-tuning (RFT) [48], utilizing Group Relative Policy Optimization (GRPO) [49] with verifiable planning reward functions. This enables adaptive reasoning that balances planning accuracy and efficiency. The RFT method not only improves planning performance but also runtime efficiency by minimizing unnecessary reasoning. We extensively evaluate AutoVLA using real-world datasets, including nuPlan [50, 51], Waymo [52], nuScenes [53], and simulation datasets such as CARLA [54, 55]. Experimental results demonstrate that AutoVLA achieves superior performance across various end-to-end autonomous driving benchmarks under both open-loop and closed-loop tests. Empirical results validate that our RFT approach 2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-3"></a>
### Page 3

<a id="S063"></a>
**Source:** p.3 S063

**Original:** (a) Dual VLM End-to-end Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S064"></a>
**Source:** p.3 S064

**Original:** Vision Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S065"></a>
**Source:** p.3 S065

**Original:** Conventional End-to-end Model Images Images Images

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S066"></a>
**Source:** p.3 S066

**Original:** Language Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S067"></a>
**Source:** p.3 S067

**Original:** Redundant Reasoning in Simple Scenarios

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S068"></a>
**Source:** p.3 S068

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S069"></a>
**Source:** p.3 S069

**Original:** (c) VLM as End-to-end Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S070"></a>
**Source:** p.3 S070

**Original:** Action Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S071"></a>
**Source:** p.3 S071

**Original:** Dual System Vision Language Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S072"></a>
**Source:** p.3 S072

**Original:** Images Images Images

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S073"></a>
**Source:** p.3 S073

**Original:** Vision Language Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S074"></a>
**Source:** p.3 S074

**Original:** Explanation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S075"></a>
**Source:** p.3 S075

**Original:** (b) Hybrid VLM End-to-end Model Conventional End-to-end Model Images Images Images

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S076"></a>
**Source:** p.3 S076

**Original:** Text

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S077"></a>
**Source:** p.3 S077

**Original:** Infeasible Trajectories

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S078"></a>
**Source:** p.3 S078

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S079"></a>
**Source:** p.3 S079

**Original:** CoT Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S080"></a>
**Source:** p.3 S080

**Original:** (d) VLA as End-to-end Model Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S081"></a>
**Source:** p.3 S081

**Original:** Action Tokenization

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S082"></a>
**Source:** p.3 S082

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S083"></a>
**Source:** p.3 S083

**Original:** Vision Language Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S084"></a>
**Source:** p.3 S084

**Original:** CoT Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S085"></a>
**Source:** p.3 S085

**Original:** High-level Decision Vision Language Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S086"></a>
**Source:** p.3 S086

**Original:** Images Images Images

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S087"></a>
**Source:** p.3 S087

**Original:** Hierarchical System

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S088"></a>
**Source:** p.3 S088

**Original:** Thinking Mode Adaptation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C002"></a>
**Source:** p.3 C002

**Original:** Figure 2: Four paradigms of VLMs for end-to-end autonomous driving. Compared to other methods, our proposed VLA-based paradigm enables direct trajectory planning and adaptive reasoning from visual inputs. By incorporating physical action tokenization into the language model, our model effectively integrates high-level scene reasoning and low-level trajectory planning. markedly improves planning performance, enables adaptive fast and slow thinking capabilities, and reduces runtime by minimizing redundant reasoning. The main contributions of this paper are summarized as follows: 1. We introduce AutoVLA, an end-to-end autonomous driving framework leveraging a pretrained VLM backbone integrated with physical action tokens, enabling direct policy learning and semantic reasoning from raw visual observations and language instructions. 2. We propose an RL-based post-training method using GRPO to enable adaptive reasoning and further enhance the model’s performance on end-to-end driving tasks. 3. We demonstrate that AutoVLA achieves superior performance across multiple autonomous driving benchmarks, including both open-loop and closed-loop testing.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S089"></a>
**Source:** p.3 S089

**Original:** Related Work

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S090"></a>
**Source:** p.3 S090

**Original:** End-to-end Autonomous Driving. End-to-end autonomous driving approaches have made significant advances in recent years [10, 11, 56–64]. Methods such as UniAD [65] and VAD [66] explicitly integrate multiple driving tasks from perception to planning in a unified Transformer architecture, thereby enhancing planning performance. ParaDrive [67] discusses the necessary components within end-to-end driving architectures. Additionally, GenAD [68] and DiffusionDrive [69] adopt generative models to maintain trajectory continuity and produce multi-modal driving trajectories. However, integrating world knowledge into end-to-end driving systems remains challenging due to bottlenecks in semantic reasoning [34] and limited adaptability in complex environments [70]. VLA and VLM for Autonomous Driving. The gap between semantic reasoning and physical actions remains a critical challenge for VLA and VLM in end-to-end autonomous driving. Current research broadly follows three directions. The first directly formulates driving as a language-centric problem, utilizing VLMs for scenario understanding through caption generation [71–73] or question answering [74, 75]. The second direction leverages VLA or VLM to produce high-level meta-actions or driving decisions [17, 38–40], which are used to either supervise [12, 76–78] or guide [39, 79] traditional planners or end-to-end models. Although these approaches facilitate integration, they prevent full end-to-end optimization. Thus, a third direction directly integrates VLMs with action generation into VLA models, enabling the direct prediction of latent action tokens [34–36, 43] or final driving trajectories [37, 44, 80–83]. However, simple trajectory decoders employed in these methods (e.g., MLP [41, 84] or GRU [45]) may produce impractical trajectories and suffer from modal collapse. To address this issue, ORION [42] incorporates generative planners into VLM architectures, enhancing trajectory feasibility but increasing model complexity and computational demands. In our work, we integrate a physical action codebook for vehicle motion into a pretrained VLM to effectively bridge the semantic reasoning and physical action space. Reinforcement Fine-tuning. RFT [48] has shown considerable promise in enhancing the performance and adaptability of LLMs, as demonstrated in DeepSeek-R1 [22]. In autonomous driving, 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-4"></a>
### Page 4

<a id="S091"></a>
**Source:** p.4 S091

**Original:** Knowledge Distillation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S092"></a>
**Source:** p.4 S092

**Original:** Large Vision Language Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S093"></a>
**Source:** p.4 S093

**Original:** Same Inputs

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S094"></a>
**Source:** p.4 S094

**Original:** Qwen2.5-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S095"></a>
**Source:** p.4 S095

**Original:** Reinforcement Fine-tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S096"></a>
**Source:** p.4 S096

**Original:** GT Decision Sample 1 |

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S097"></a>
**Source:** p.4 S097

**Original:** Supervised Fine-tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S098"></a>
**Source:** p.4 S098

**Original:** GT Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S099"></a>
**Source:** p.4 S099

**Original:** Action

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S100"></a>
**Source:** p.4 S100

**Original:** Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S101"></a>
**Source:** p.4 S101

**Original:** Reasoning Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S102"></a>
**Source:** p.4 S102

**Original:** Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S103"></a>
**Source:** p.4 S103

**Original:** … Sample 2 |

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S104"></a>
**Source:** p.4 S104

**Original:** - Scene Analysis - Critical Object Identification

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S105"></a>
**Source:** p.4 S105

**Original:** Qwen2.5-VL-3B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S106"></a>
**Source:** p.4 S106

**Original:** - Intention Reasoning - Final Action Decision

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S107"></a>
**Source:** p.4 S107

**Original:** System Prompt

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S108"></a>
**Source:** p.4 S108

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S109"></a>
**Source:** p.4 S109

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S110"></a>
**Source:** p.4 S110

**Original:** Text Tokenizer

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S111"></a>
**Source:** p.4 S111

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S112"></a>
**Source:** p.4 S112

**Original:** Trajectory 2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S113"></a>
**Source:** p.4 S113

**Original:** Turn Left | Go Straight | Turn Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S114"></a>
**Source:** p.4 S114

**Original:** Fast Thinking &lt;think&gt; This is a straightforward scenario, and a direct decision can be made...&lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S115"></a>
**Source:** p.4 S115

**Original:** Vision Encoder Sample 3 |

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S116"></a>
**Source:** p.4 S116

**Original:** Trajectory 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S117"></a>
**Source:** p.4 S117

**Original:** - Task: You will be provided with video observations from the ego vehicle’s surrounding cameras, along with the vehicle’s current dynamic states. Your task is to predict the most appropriate driving action for the next 5 seconds.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S118"></a>
**Source:** p.4 S118

**Original:** Instruction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S119"></a>
**Source:** p.4 S119

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning… The ego vehicle should wait for the vehicle on the right to pass before proceeding straight with caution.&lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S120"></a>
**Source:** p.4 S120

**Original:** &lt;answer&gt;&lt;action_22&gt;&lt;action_12&gt;&lt;action_26&gt;&lt; action_34&gt;&lt;action_31&gt;&lt;action_33&gt;&lt;action_68&gt; &lt;action_53&gt;&lt;action_42&gt;&lt;action_58&gt;&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S121"></a>
**Source:** p.4 S121

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S122"></a>
**Source:** p.4 S122

**Original:** - Role: You are an advanced full self-driving system.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S123"></a>
**Source:** p.4 S123

**Original:** - Fast/Slow Thinking: If necessary, use step-by-step reasoning (Chain-of-Thought) ... Otherwise, you may directly predict the final driving action.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S124"></a>
**Source:** p.4 S124

**Original:** Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S125"></a>
**Source:** p.4 S125

**Original:** &lt;answer&gt;&lt;action_0&gt;&lt;action_0&gt;&lt;action_0&gt;&lt;acti on_18&gt;&lt;action_22&gt;&lt;action_26&gt;&lt;action_35&gt;&lt;ac tion_32&gt;&lt;action_42&gt;&lt;action_38&gt;&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S126"></a>
**Source:** p.4 S126

**Original:** Action Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S127"></a>
**Source:** p.4 S127

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S128"></a>
**Source:** p.4 S128

**Original:** Reasoning Format

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S129"></a>
**Source:** p.4 S129

**Original:** Trajectory 1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S130"></a>
**Source:** p.4 S130

**Original:** Group Relative Policy Optimization

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S131"></a>
**Source:** p.4 S131

**Original:** Slow Thinking &lt;think&gt; This is a complex scenario requiring additional reasoning… The vehicle ahead is slow-moving or possibly stopped. The ego vehicle should change to the left lane.&lt;/think&gt; &lt;answer&gt;&lt;action_12&gt;&lt;action_23&gt;&lt;action_14&gt;&lt; action_89&gt;&lt;action_17&gt;&lt;action_33&gt;&lt;action_86&gt; &lt;action_75&gt;&lt;action_67&gt;&lt;action_83&gt;&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S132"></a>
**Source:** p.4 S132

**Original:** Multi-view Camera Streams

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S133"></a>
**Source:** p.4 S133

**Original:** Reward S1: 0.92

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S134"></a>
**Source:** p.4 S134

**Original:** Ego states

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S135"></a>
**Source:** p.4 S135

**Original:** S2: 0.00

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S136"></a>
**Source:** p.4 S136

**Original:** Velocity | Acceleration | History Action

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S137"></a>
**Source:** p.4 S137

**Original:** S3: 0.64

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S138"></a>
**Source:** p.4 S138

**Original:** Reward Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S139"></a>
**Source:** p.4 S139

**Original:** - Safety &amp; Comfort - Penalty for slow thinking - Travel progress …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C003"></a>
**Source:** p.4 C003

**Original:** Figure 3: Overview of the AutoVLA model and its training process. A pretrained small VLM is used as the backbone of AutoVLA. The model receives multi-view camera streams, system prompts, driving instructions, and vehicle status as input, and outputs textual reasoning and physical action tokens. In SFT, a large VLM model with strong visual understanding capabilities is employed to collect reasoning data, which is used alongside trajectory data in SFT for training the AutoVLA model. In RFT, we utilize GRPO to train the model for improved alignment with verified reward functions, while enabling adaptive reasoning by penalizing excessive reasoning. Gen-Drive [7] and TrajHF [85] employed the RFT to align the trajectory generation model with safety constraints and human driving preferences. RAD [86] combined 3D Gaussian splatting to generate scenarios and conduct closed-loop RL training. However, the application of RFT in endto-end VLM/VLA-based autonomous driving remains nascent. While previous methods, such as AlphaDrive [38], utilize GRPO instead of direct preference optimization (DPO) [87] to enhance planning performance and ensure training efficiency and stability, they are still limited to simplified settings involving only high-level meta-actions. In this work, we advance this direction by applying RFT to optimize the end-to-end VLA framework in both scene reasoning and low-level planning, and we adopt GRPO to accelerate convergence and enhance training stability.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S140"></a>
**Source:** p.4 S140

**Original:** AutoVLA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S141"></a>
**Source:** p.4 S141

**Original:** The proposed AutoVLA framework consists of two main components, as shown in Fig. 1. 1) VLM Backbone: It is capable of processing visual and textual input and generating corresponding tokens (reasoning and action), employing a unified autoregressive Transformer decoder. 2) Physical Action Token Generation: We extend the language model decoder to output physical action tokens that directly correspond to vehicle movements. These tokens are designed to comply with physical constraints and can be reliably translated into physically feasible planning trajectories. Training of AutoVLA is conducted in two stages, as illustrated in Fig. 3. 1) Supervised Fine-Tuning uses ground-truth trajectory data and distills high-quality reasoning data from a large-scale VLM. 2) Reinforcement Fine-Tuning uses task-specific reward functions to optimize planning performance while improving the running efficiency by minimizing unnecessary reasoning. The details of our model and training process are illustrated below. 3.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S142"></a>
**Source:** p.4 S142

**Original:** Framework

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S143"></a>
**Source:** p.4 S143

**Original:** Model Inputs. AutoVLA takes as input multi-view, multi-frame camera data C from onboard cameras, high-level navigation instructions I, and ego vehicle states S, and performs scene reasoning 4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-5"></a>
### Page 5

<a id="S144"></a>
**Source:** p.5 S144

**Original:** and trajectory planning. Specifically, we utilize three RGB cameras positioned at the front, front-left, and front-right sides of the vehicle. Each camera stream ci = [cit−3 , cit−2 , cit−1 , cit ] captures four sequential frames at a frequency of 2 Hz, including the current and three preceding frames, supplying temporal information for scene dynamics. Additionally, the model employs high-level navigation instructions I (e.g., Turn Left and Go Straight) to specify intended directions explicitly. The ego vehicle’s state S encompasses current velocity, acceleration, and historical actions. Base VLM Model. We adopt Qwen2.5-VL-3B [21] as the vision-language backbone of AutoVLA. Qwen2.5-VL is a series of powerful multimodal large language models that possess strong visual understanding capabilities, and the open-source nature of the Qwen2.5-VL model facilitates taskspecific fine-tuning. The 3B variant offers a good trade-off between efficiency and performance, making it suitable for deployment in onboard devices. Action Tokenization. To enable trajectory planning within the language model, we discretize continuous vehicle trajectories P ∈ Rτ ×d into a sequence of physical action tokens a = [a1 , . . . , aT ], where at ∈ A, T is the length of the tokenized predicted trajectory and each token is represented by short-term spatial position and heading movement (∆x, ∆y, ∆θ). This transforms the planning task into a next-token prediction problem, which can be conducted within the language model. We build our action codebook A = {a1 , a2 , . . . , aK } using a K-disk clustering method [88–90], which covers the majority of vehicle movement patterns. Finally, we obtain a vehicle motion codebook that consists of K = 2048 discrete action tokens. Following [30, 91], these action tokens are incorporated into the VLM as additional tokens (i.e., &lt;action_0&gt;, &lt;action_1&gt;, . . . ). During inference, the model outputs a sequence of these action tokens, which are subsequently decoded into a planning trajectory using the action codebook. More details about action tokenization and trajectory decoding are provided in the Supplementary Material. Unified Reasoning and Action. AutoVLA unifies reasoning and action generation within a single autoregressive Transformer framework, enabling adaptive switching between fast and slow thinking depending on the driving scenario. In fast thinking mode, AutoVLA directly predicts physical action tokens without generating long CoT reasoning, enabling rapid responses in straightforward scenarios. In contrast, slow thinking mode involves structured CoT reasoning, where the model first analyzes the environment, identifies critical elements, and reasons through potential outcomes before deciding on the final driving action. To enable this dual thinking capability, AutoVLA is trained with a mixture of direct action supervision and reasoning-augmented data. We design system prompts and response formats to support both modes consistently. 3.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S145"></a>
**Source:** p.5 S145

**Original:** Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S146"></a>
**Source:** p.5 S146

**Original:** Reasoning data provides high-quality CoT annotations that are essential for training VLMs with reasoning capabilities [42]. In driving tasks, reasoning involves understanding complex semantics and interactions in dynamic environments [92–95]. Despite its importance, the development of a high-quality, large-scale driving reasoning dataset remains a key challenge due to three major limitations: 1) limited scenario diversity and repetitive examples, 2) inadequate representation of critical perceptual cues, such as traffic signs and vehicle indicator signals, 3) low-quality reasoning process, such as repeatedly stopping at a stop sign without justification. To address these issues, we propose an automated reasoning annotation pipeline using the advanced Qwen2.5-VL-72B model [21]. This pipeline enables automatic generation of high-accuracy reasoning annotations and supports knowledge distillation from a large capable model to a more compact target model. The pipeline generates structured reasoning annotations across four key components: detailed scene descriptions, identification of crucial objects, prediction of surrounding agents’ intentions, and determination of appropriate driving actions. To regulate the reasoning outcomes, our approach incorporates ground-truth driving actions as hints, guiding the model to produce causal explanations that explicitly link driving decisions to scene context. This structured prompting method significantly reduces nonsensical outputs and minimizes the need for manual correction. Employing this annotation pipeline, we compile a comprehensive reasoning dataset comprising approximately 45.6k CoT reasoning annotations for the nuPlan dataset and 7.2k annotations for the Waymo end-to-end driving dataset. Additionally, we reformat and integrate DriveLM [96], a VQA dataset built on nuScenes and CARLA simulation data, to augment our reasoning data. Additional details and illustrative examples are provided in the Supplementary Material. 5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-6"></a>
### Page 6

<a id="S147"></a>
**Source:** p.6 S147

**Original:** 3.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S148"></a>
**Source:** p.6 S148

**Original:** Supervised Fine-tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S149"></a>
**Source:** p.6 S149

**Original:** Supervised fine-tuning (SFT) is employed to train the model to generate both reasoning and action sequences. Given multi-frame camera images C, a high-level navigation instruction I, and the ego vehicle state S, the model is trained to produce a sequence of output tokens. The output sequence consists of language tokens l = [l1 , . . . , lL ] for reasoning followed by action tokens a = [a1 , . . . , aT ]. To enable both fast and slow thinking during SFT, we curate training data with ground-truth assistant responses that either include only the final action tokens or combine CoT reasoning with the corresponding action tokens. In the fast-thinking mode, l is a fixed, short template indicating that reasoning is not needed. Conversely, in the slow-thinking mode, l begins with a template that introduces the need for CoT reasoning, followed by a structured sequence of reasoning. The first supervision signal is the standard causal language modeling objective, which minimizes the negative log-likelihood of the target token sequence and facilitates the reasoning capability. The other supervision signal focuses on the planning accuracy, and we introduce an auxiliary loss over action tokens a = [a1 , . . . , aT ], which appear at positions xL+1 to xL+T in the output sequence. Given an output sequence x = [l1 , . . . , lL , a1 , . . . , aT ], the loss functions are defined as: LLM = −

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S150"></a>
**Source:** p.6 S150

**Original:** N 1 X log pθ (xi | x&lt;i , C, I, S), N i=1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S151"></a>
**Source:** p.6 S151

**Original:** Laction = −

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S152"></a>
**Source:** p.6 S152

**Original:** L+T 1 X log pθ (xi | x&lt;i , C, I, S), T

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S153"></a>
**Source:** p.6 S153

**Original:** (1)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S154"></a>
**Source:** p.6 S154

**Original:** i=L+1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S155"></a>
**Source:** p.6 S155

**Original:** where N = L + T , and pθ denotes the model’s predicted distribution parameterized by θ. To jointly optimize reasoning and action generation, we combine the language modeling loss and the action loss into a single SFT loss function. To address the imbalance between reasoning data and action-only data, and to encourage the model to learn from examples that include CoT reasoning, we apply a per-sample weighting factor based on the presence of CoT in the ground truth. The overall loss for each training example is computed as follows:  λcot if CoT is present in GT LSFT = w · (L + λ L ) , w = , (2) i LM,i a action,i i i 1 otherwise where λa and λcot are hyperparameters that control the relative importance. 3.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S156"></a>
**Source:** p.6 S156

**Original:** Reinforcement Fine-tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S157"></a>
**Source:** p.6 S157

**Original:** To further improve the performance of AutoVLA and align it with driving requirements and taskspecific rewards, we introduce a reinforcement learning-based post-training method. This RFT stage enables the model to perform adaptive reasoning and optimize planning performance. We employ the GRPO algorithm [49], which stabilizes training and improves convergence efficiency. Moreover, the inherent multi-modality of planning, characterized by multiple feasible trajectories in the same scenario, naturally aligns with the group-based optimization framework of GRPO [38]. Given a scenario input query q, comprising sensor images, the ego vehicle’s state, and driving instruction, we sample a set of G candidate outputs O = {o1 , o2 , . . . , oG } from the old policy πθold . The current policy πθ is then optimized using the normalized group-relative advantage Ai , by maximizing the following objective: " # G  1 X R JGRPO (θ) = Eq,{oi }∼πθold (O|q) J − βDKL (πθ ∥πref ) , (3) G i=1 i   ri − mean({rj }G πθ (oi |q) j=1 ) , 1 − ϵ, 1 + ϵ Ai , Ai = , G πθold (oi |q) std({rj }j=1 ) (4) where θ and θold denote the current and old policy parameters, ri is the reward for sample oi , ϵ and β are hyperparameters controlling the clipping range and the weight of the KL divergence regularization term, and πref is the reference policy from the SFT stage. JiR = min

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S158"></a>
**Source:** p.6 S158

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S159"></a>
**Source:** p.6 S159

**Original:** πθ (oi |q) Ai , clip πθold (oi |q)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S160"></a>
**Source:** p.6 S160

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S161"></a>
**Source:** p.6 S161

**Original:** The final reward function is defined as r = rDriving − λr rCoT , where the λr denotes the balance weight. The term rDriving varies across benchmarks. For the nuPlan dataset, we employ the Predictive Driver Model Score (PDMS) [51] as the driving reward, which captures aspects such as safety, comfort, 6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-7"></a>
### Page 7

<a id="C004"></a>
**Source:** p.7 C004

**Original:** Table 1: Testing Results on the NAVSIM (nuPlan) End-to-end Driving Benchmark Method

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S162"></a>
**Source:** p.7 S162

**Original:** PDMS ↑ Collision ↑ Area ↑ Direction ↑ Progress ↑ TTC ↑ Comfort ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S163"></a>
**Source:** p.7 S163

**Original:** Ego Status MLP TransFuser [58] DRAMA [56] Hydra-MDP [57] Centaur [59] TrajHF [85]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S164"></a>
**Source:** p.7 S164

**Original:** 66.40 83.88 86.87 91.26 92.10 93.95

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S165"></a>
**Source:** p.7 S165

**Original:** 93.09 97.78 98.19 99.07 99.23 99.30

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S166"></a>
**Source:** p.7 S166

**Original:** 78.26 92.63 95.18 98.29 98.72 97.51

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S167"></a>
**Source:** p.7 S167

**Original:** 90.45 97.97 98.03 95.79 96.77 91.72

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S168"></a>
**Source:** p.7 S168

**Original:** 63.20 78.88 81.33 85.20 85.96 90.39

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S169"></a>
**Source:** p.7 S169

**Original:** 84.02 92.89 94.17 96.56 97.17 98.02

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S170"></a>
**Source:** p.7 S170

**Original:** 99.97 99.98 100.00 100.00 99.97 99.81

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S171"></a>
**Source:** p.7 S171

**Original:** AutoVLA (One-shot) AutoVLA (Post-RFT) AutoVLA (Best-of-N)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S172"></a>
**Source:** p.7 S172

**Original:** 80.54 89.11 92.12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S173"></a>
**Source:** p.7 S173

**Original:** 96.89 98.41 99.14

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S174"></a>
**Source:** p.7 S174

**Original:** 92.42 95.64 97.08

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S175"></a>
**Source:** p.7 S175

**Original:** 94.43 95.40 95.51

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S176"></a>
**Source:** p.7 S176

**Original:** 75.82 81.87 87.55

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S177"></a>
**Source:** p.7 S177

**Original:** 88.06 98.04 97.12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S178"></a>
**Source:** p.7 S178

**Original:** 99.94 99.94 99.98

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S179"></a>
**Source:** p.7 S179

**Original:** travel efficiency, and other driving quality metrics. For the Waymo end-to-end driving dataset, due to the limited availability of Rater Feedback Score (RFS) annotations [52], we use the Average Displacement Error (ADE) as the driving reward. To discourage unnecessary long reasoning chains, we incorporate a CoT length penalty rCoT into the reward function. Additional implementation details are provided in the Supplementary Material.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S180"></a>
**Source:** p.7 S180

**Original:** 4 4.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S181"></a>
**Source:** p.7 S181

**Original:** Experiments Experimental Setup

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S182"></a>
**Source:** p.7 S182

**Original:** Datasets. We train the AutoVLA model using a diverse set of real-world and simulation datasets. The nuPlan (Open-Scene) dataset [50, 97] contains 120 hours of large-scale driving data with eight streams of camera data and object annotations. The Waymo end-to-end driving dataset (Waymo E2E) [52] comprises 4,021 20-second driving segments with eight streams of camera views and ego vehicle trajectories, especially focusing on challenging and long-tail scenarios, such as driving through construction areas or risky situations. The nuScenes dataset [53] provides 1,000 urban driving scenes with six camera views. The CARLA-Garage dataset [55] provides over 500,000 frames of simulation camera data. In addition to the collected reasoning data, we utilize the DriveLM dataset [96] for nuScenes and CARLA datasets, by reformatting the VQA pairs to facilitate CoT reasoning. Benchmarks. We evaluate AutoVLA on both open-loop and closed-loop benchmarks across realworld and simulated environments. Open-loop performance is assessed on two public benchmarks: the NAVSIM benchmark [51] from the nuPlan dataset and the nuScenes benchmark [65]. The NAVSIM benchmark employs PDMS to assess key aspects of driving behavior, such as collision and ego progress. The nuScenes benchmark uses L2 distance and collision rate as evaluation metrics. Additionally, we report our model’s performance on the Waymo end-to-end driving benchmark using the RFS metric, which reflects human-judged planning quality. Closed-loop performance is evaluated on the Bench2Drive benchmark [54] in the CARLA simulator. Bench2Drive contains 44 interactive, closed-loop scenarios under varying locations and weather conditions, using metrics such as success rate, driving score, efficiency, and comfort. Implementation Details. Each action token corresponds to 0.5 seconds of movement, and the planning horizon is set to 5 seconds. Consequently, the model outputs 10 action tokens, from which a 5-second trajectory can be decoded. For SFT, we use a learning rate of 1 × 10−5 and the FSDP training strategy. The model is trained for 5 epochs using 8 NVIDIA L40S GPUs. We use a per-GPU batch size of 1 and accumulate gradients over 4 steps, resulting in an effective batch size of 32. The weighting parameters in the SFT loss function are set to λa = 1 and λcot = 40. For RFT, we employ the LoRA adapter [98] for parameter-efficient training. The learning rate for RFT is set to 3 × 10−5 , and the KL regularization weight β is set to 0.04. We perform a single policy update at each step, allowing the use of a simplified objective without the need for clipping or tracking the old policy. The model is fine-tuned for 6, 000 steps, and the best-performing checkpoint is selected for evaluation. Additional details are provided in the Supplementary Material. 4.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S183"></a>
**Source:** p.7 S183

**Original:** Main Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S184"></a>
**Source:** p.7 S184

**Original:** This section reports the main results of the AutoVLA model for various datasets and benchmarks, with additional results included in the Supplementary Material. 7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-8"></a>
### Page 8

<a id="S185"></a>
**Source:** p.8 S185

**Original:** (a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S186"></a>
**Source:** p.8 S186

**Original:** (c)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S187"></a>
**Source:** p.8 S187

**Original:** (b)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S188"></a>
**Source:** p.8 S188

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S189"></a>
**Source:** p.8 S189

**Original:** Back

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S190"></a>
**Source:** p.8 S190

**Original:** Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S191"></a>
**Source:** p.8 S191

**Original:** Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S192"></a>
**Source:** p.8 S192

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S193"></a>
**Source:** p.8 S193

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S194"></a>
**Source:** p.8 S194

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S195"></a>
**Source:** p.8 S195

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S196"></a>
**Source:** p.8 S196

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S197"></a>
**Source:** p.8 S197

**Original:** Slow Thinking Before RFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S198"></a>
**Source:** p.8 S198

**Original:** Fast Thinking After RFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S199"></a>
**Source:** p.8 S199

**Original:** Scene Description: The scene appears near a building entrance. The front view shows a clear path ahead with no immediate obstacles... The weather seems clear and sunny, with no visible signs of rain or adverse conditions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S200"></a>
**Source:** p.8 S200

**Original:** Critical Object Description: 1. White Car (Front view): Just ahead of the ego vehicle, and appears stationary or slowly moving forward. 2. A Row of Cars(Left View): Several cars are parked or waiting along the left side, with some space between them. Paying attention to these cars is crucial to avoid any potential collisions while turning left...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S201"></a>
**Source:** p.8 S201

**Original:** &lt;think&gt; This is a straightforward scenario, and a direct decision can be made. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S202"></a>
**Source:** p.8 S202

**Original:** Reasoning on Intent: - The presence of the white car in the front and cars on the left necessitates a cautious approach to avoid any collisions. The absence of active indicator lights suggests that the vehicles are stationary. - The ego vehicle is currently moving at a moderate speed (4.979 m/s) and is instructed to turn left ... - The vehicle has a significant lateral acceleration, suggesting that the vehicle is already turning left.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S203"></a>
**Source:** p.8 S203

**Original:** &lt;answer&gt; The final output action is: &lt;action_520&gt;&lt;action_920&gt;… &lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S204"></a>
**Source:** p.8 S204

**Original:** Best Driving Action: Turn left with a constant speed. Given the need to navigate around the cars on the left and … &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_520&gt;&lt;action_920&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C005"></a>
**Source:** p.8 C005

**Original:** Figure 5: Reinforcement fine-tuning results on the nuPlan dataset. (a) Comparison of PDMS and runtime before and after RFT; (b) Training reward curves for different GRPO group sample sizes; (c) Qualitative comparison of planning and reasoning performance before and after RFT.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S205"></a>
**Source:** p.8 S205

**Original:** nuPlan PDM Score

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S206"></a>
**Source:** p.8 S206

**Original:** 80.54

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S207"></a>
**Source:** p.8 S207

**Original:** No at-fault Col.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S208"></a>
**Source:** p.8 S208

**Original:** 61.38 51.17

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S209"></a>
**Source:** p.8 S209

**Original:** 50 40

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S210"></a>
**Source:** p.8 S210

**Original:** 10k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S211"></a>
**Source:** p.8 S211

**Original:** 100k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S212"></a>
**Source:** p.8 S212

**Original:** 84.44 80.30

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S213"></a>
**Source:** p.8 S213

**Original:** 10k 0.7 0.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S214"></a>
**Source:** p.8 S214

**Original:** 1.03

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S215"></a>
**Source:** p.8 S215

**Original:** 0.84 0.86

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S216"></a>
**Source:** p.8 S216

**Original:** 100k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S217"></a>
**Source:** p.8 S217

**Original:** 185k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S218"></a>
**Source:** p.8 S218

**Original:** Action-only Training Reasoning Training 0.57

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S219"></a>
**Source:** p.8 S219

**Original:** 0.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S220"></a>
**Source:** p.8 S220

**Original:** 0.50 0.43

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S221"></a>
**Source:** p.8 S221

**Original:** 0.4 0.80

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S222"></a>
**Source:** p.8 S222

**Original:** 0.7 100k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S223"></a>
**Source:** p.8 S223

**Original:** 0.38 0.35

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S224"></a>
**Source:** p.8 S224

**Original:** 0.71 0.70

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S225"></a>
**Source:** p.8 S225

**Original:** 50k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S226"></a>
**Source:** p.8 S226

**Original:** 50k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S227"></a>
**Source:** p.8 S227

**Original:** 0.54

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S228"></a>
**Source:** p.8 S228

**Original:** 0.98

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S229"></a>
**Source:** p.8 S229

**Original:** 10k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S230"></a>
**Source:** p.8 S230

**Original:** Action-only Training Reasoning Training

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S231"></a>
**Source:** p.8 S231

**Original:** nuScenes Col. Rate (%)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S232"></a>
**Source:** p.8 S232

**Original:** 0.99

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S233"></a>
**Source:** p.8 S233

**Original:** 0.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S234"></a>
**Source:** p.8 S234

**Original:** 95.19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S235"></a>
**Source:** p.8 S235

**Original:** 93.26

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S236"></a>
**Source:** p.8 S236

**Original:** 86.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S237"></a>
**Source:** p.8 S237

**Original:** 185k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S238"></a>
**Source:** p.8 S238

**Original:** Action-only Training Reasoning Training

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S239"></a>
**Source:** p.8 S239

**Original:** 1.0 0.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S240"></a>
**Source:** p.8 S240

**Original:** 50k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S241"></a>
**Source:** p.8 S241

**Original:** 92.33

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S242"></a>
**Source:** p.8 S242

**Original:** nuScenes L2 (m)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S243"></a>
**Source:** p.8 S243

**Original:** 1.2 1.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S244"></a>
**Source:** p.8 S244

**Original:** Action-only Training Reasoning Training

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S245"></a>
**Source:** p.8 S245

**Original:** 44.06

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S246"></a>
**Source:** p.8 S246

**Original:** Col. Rate

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S247"></a>
**Source:** p.8 S247

**Original:** PDM Score

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S248"></a>
**Source:** p.8 S248

**Original:** 71.79

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S249"></a>
**Source:** p.8 S249

**Original:** 65.19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S250"></a>
**Source:** p.8 S250

**Original:** 94.18

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S251"></a>
**Source:** p.8 S251

**Original:** 74.97

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S252"></a>
**Source:** p.8 S252

**Original:** nuPlan No at-fault Col. 96.89

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S253"></a>
**Source:** p.8 S253

**Original:** 73.62

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S254"></a>
**Source:** p.8 S254

**Original:** L2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S255"></a>
**Source:** p.8 S255

**Original:** Data Scaling Results. We train AutoVLA on a mixture of the nuPlan and nuScenes datasets with varying training set sizes (10k, 50k, 100k, and the full 185k samples), with action-only supervision or with additional CoT reasoning supervision. The models are evaluated on the respective standard test sets, and the results are shown in Fig. 4. We observe that increasing the amount of training data consistently improves planning performance on both datasets. In the nuPlan dataset, when using fewer than 50k training samples, CoT reasoning does not outperform action-only in terms of PDMS and Collision Score. This is likely due to the increased difficulty of learning structured reasoning from limited data. However, as the training set size increases, models trained with CoT reasoning surpass those with action-only supervision, highlighting the scalability advantages of reasoningaugmented learning. A similar trend is observed on the nuScenes dataset: as the training set size increases, models trained with CoT reasoning consistently outperform those trained with action-only data in terms of L2 distance and collision rate.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S256"></a>
**Source:** p.8 S256

**Original:** 185k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S257"></a>
**Source:** p.8 S257

**Original:** 0.3 10k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S258"></a>
**Source:** p.8 S258

**Original:** 50k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S259"></a>
**Source:** p.8 S259

**Original:** 0.32

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S260"></a>
**Source:** p.8 S260

**Original:** 0.31

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S261"></a>
**Source:** p.8 S261

**Original:** 100k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S262"></a>
**Source:** p.8 S262

**Original:** 185k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C006"></a>
**Source:** p.8 C006

**Original:** Figure 4: Data scaling effect on planning performance for nuPlan and nuScenes datasets (logscaled x-axis). Increasing the amount of training data consistently enhances planning performance.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S263"></a>
**Source:** p.8 S263

**Original:** RFT Performance. The slow-thinking mode Table 2: Runtime Analysis of Fast &amp; Slow Thinkincurs a significantly higher runtime due to the ing Modes in AutoVLA generation of CoT reasoning compared to the fast-thinking mode, as shown in Table 2. To Thinking Mode Min. (s) Max. (s) Avg. (s) mitigate this overhead, we introduce RFT to enFast Thinking 0.997 1.116 1.072 hance AutoVLA’s adaptive thinking capability Slow Thinking 7.607 13.706 10.518 and avoid unnecessary reasoning in straightforward scenarios. Specifically, we apply RFT to the full-data CoT reasoning model trained via SFT to enhance its planning performance. As shown in Fig. 5(a), RFT yields a 10.6% improvement in PDMS (on the NAVSIM testing set) and a 66.8% reduction in runtime (average over 500 testing scenarios). The reward curve in Fig. 5(b) illustrates the progressive improvement of the model’s policy during RFT. Experiments with different GRPO group 8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-9"></a>
### Page 9

<a id="S264"></a>
**Source:** p.9 S264

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S265"></a>
**Source:** p.9 S265

**Original:** (b)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S266"></a>
**Source:** p.9 S266

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning. Scene Description: The scene is a daytime urban environment with clear weather. The road is marked with double yellow lines, indicating a no-passing zone. There are construction barriers and signs indicating road work ahead. Several vehicles are visible in the distance, traveling in both directions. The front left camera shows a building and some greenery along the road. The front right camera captures a construction site with barriers and a few vehicles. Critical Object Description: 1. Construction Barriers: Located in the center of the road ahead, these barriers indicate ongoing road work. They are important as they may require the vehicle to slow down and navigate around them. 2. Vehicles Ahead: Positioned further down the road, these vehicles are traveling in the same direction as the ego vehicle. They are important as they may slow down or stop due to the road work or other vehicles ahead. Reasoning on Intent: Firstly, notice the construction barriers. These barriers indicate that the road ahead may have reduced speed limits or require careful navigation. The ego vehicle should approach these barriers with caution and potentially reduce its speed …… - Given the current driving command instruction to "go straight," the ego vehicle should continue moving forward while being mindful of the road conditions ahead. The presence of construction barriers and other vehicles suggests that the vehicle should slow down to navigate safely through the area. Best Driving Action: Move forward with a deceleration. This to safely approach the construction barriers, maintain a safe distance from other vehicles, and comply with any road conditions indicated by the signs. …… &lt;/think&gt; dd

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S267"></a>
**Source:** p.9 S267

**Original:** dd

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S268"></a>
**Source:** p.9 S268

**Original:** (a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S269"></a>
**Source:** p.9 S269

**Original:** Dd

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S270"></a>
**Source:** p.9 S270

**Original:** dd

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S271"></a>
**Source:** p.9 S271

**Original:** dd

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S272"></a>
**Source:** p.9 S272

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S273"></a>
**Source:** p.9 S273

**Original:** &lt;answer&gt; The final output action is: &lt;action_1457&gt;&lt;action_1457&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C007"></a>
**Source:** p.9 C007

**Original:** Figure 6: Performance comparison of AutoVLA with different training settings on the Waymo end-to-end driving dataset, along with an example illustrating the model’s reasoning capabilities. sample sizes indicate that larger groups lead to better performance by promoting broader exploration of training samples. As illustrated in Fig. 5(c), RFT also reduces unnecessary and slow reasoning in simple scenarios, driven by the CoT length penalty that encourages fast thinking for straightforward driving cases. A qualitative comparison shows that the SFT model produces suboptimal plans due to error accumulation in generation, whereas the RFT model (optimized via PDMS-based reward) generates better trajectories. nuPlan Benchmark Results. We evaluate AutoVLA against state-of-the-art end-to-end driving models on the NAVSIM benchmark [51] and present results in Table 1. In best-of-N planning, we use an oracle scorer to select the optimal trajectory from six generated candidates. After RFT, AutoVLA demonstrates significantly improved performance, aligning more closely with the NAVSIM reward signal. The best-of-N strategy further enhances performance, achieving the highest PDMS. Overall, AutoVLA achieves competitive results while demonstrating scalability across diverse datasets. Waymo E2E Performance. We evaluate AutoVLA on the Waymo end-to-end driving dataset [52], which features long-tail and complex driving scenarios. The model’s performance under various training settings on the test set is presented in Fig. 6. The results reveal that pretraining on a combination of nuPlan and nuScenes datasets significantly enhances performance, suggesting enhanced scene understanding through exposure to more diverse training data. Incorporating CoT reasoning in training further improves planning performance compared to action-only training. Post-training with RFT, using ADE as the reward function, achieves the best overall RFS metric. A qualitative example in a construction zone demonstrates the model’s ability to reason about occlusions and generate effective detour plans. CARLA Closed-loop Performance. We evaluate the closed-loop driving performance of our AutoVLA model on the Bench2Drive benchmark [54] in the CARLA simulator. The model is trained using SFT with both trajectory-only and CoT data. During testing, the planning frequency is set to 2 Hz. The results, shown in Table 3, demonstrate that AutoVLA outperforms existing end-to-end driving models in terms of overall driving score and success rate in the closed-loop test. Table 3: Testing Results on the Bench2Drive (CARLA) Closed-loop Driving Benchmark Driving Score ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S274"></a>
**Source:** p.9 S274

**Original:** Success Rate (%) ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S275"></a>
**Source:** p.9 S275

**Original:** Efficiency ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S276"></a>
**Source:** p.9 S276

**Original:** Comfortness ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S277"></a>
**Source:** p.9 S277

**Original:** AD-MLP [99] UniAD-Base [65] VAD [66] TCP-traj [100] DriveAdapter [101] Orion [42]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S278"></a>
**Source:** p.9 S278

**Original:** 18.05 45.81 42.35 59.90 64.22 77.74

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S279"></a>
**Source:** p.9 S279

**Original:** 0.00 16.36 15.00 30.00 33.08 54.62

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S280"></a>
**Source:** p.9 S280

**Original:** 48.45 129.21 157.94 76.54 70.22 151.48

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S281"></a>
**Source:** p.9 S281

**Original:** 22.63 43.58 46.01 18.08 16.01 17.38

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S282"></a>
**Source:** p.9 S282

**Original:** AutoVLA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S283"></a>
**Source:** p.9 S283

**Original:** 78.84

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S284"></a>
**Source:** p.9 S284

**Original:** 57.73

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S285"></a>
**Source:** p.9 S285

**Original:** 146.93

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S286"></a>
**Source:** p.9 S286

**Original:** 39.33

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S287"></a>
**Source:** p.9 S287

**Original:** Method

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S288"></a>
**Source:** p.9 S288

**Original:** 4.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S289"></a>
**Source:** p.9 S289

**Original:** Ablation Studies

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S290"></a>
**Source:** p.9 S290

**Original:** Text Waypoint Output. We use the same mixed training set from the nuPlan and nuScenes datasets to train a model that predicts waypoints in a text format, which are then converted into a trajectory of waypoints. We evaluate its performance in an open-loop planning setting using the standard test sets. The results, shown in Table 5, indicate that our action tokenization and generation method significantly outperforms the text-based waypoint prediction approach. Additionally, due to the need to decode 9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-10"></a>
### Page 10

<a id="C008"></a>
**Source:** p.10 C008

**Original:** Table 4: Action Tokenization Accuracy with Different Codebook Sizes and Methods. (DCT: discrete cosine transform; MC: movement coverage; CU: codebook usage. Bold indicates best performance, underline the second-best, and tilde the third-best.) ::: FAST (DCT) [91] K-disk (Ours) Codebook RT-1 (Action Bin) [102] Size ADE(m) ↓ FDE(m) ↓ ADE(m) ↓ FDE(m) ↓ ADE(m) ↓ FDE(m) ↓ MC ↑ 256 1024 2048 4096

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S291"></a>
**Source:** p.10 S291

**Original:** 0.1440 0.1052 0.1014 0.1001

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S292"></a>
**Source:** p.10 S292

**Original:** 0.2942 0.1883 0.1775 0.1739

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S293"></a>
**Source:** p.10 S293

**Original:** 0.1708 0.0522 0.0281 0.0149

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S294"></a>
**Source:** p.10 S294

**Original:** 0.2137 0.0588 0.0309 0.0161

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S295"></a>
**Source:** p.10 S295

**Original:** 0.0687 0.0253 0.0182 ::::: 0.0141

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S296"></a>
**Source:** p.10 S296

**Original:** 0.1034 0.0282 0.0203 ::::: 0.0155

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S297"></a>
**Source:** p.10 S297

**Original:** 86.47% 97.41% 99.42% 100.0%

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S298"></a>
**Source:** p.10 S298

**Original:** CU ↑ 100.0% 100.0% 100.0% 91.46%

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S299"></a>
**Source:** p.10 S299

**Original:** numerical values, the text-based method incurs Table 5: Influence of Physical Action Tokenization a substantially higher computational cost in generating the final trajectory. This shows the limMetric Text Waypoint Physical Action itation of language models in handling precise PDM Score ↑ 71.31 80.54 numerical reasoning. Avg. L2 (m) ↓ 0.89 0.70 Avg. Col. (%) ↓ 0.36 0.31 Action Tokenization Methods. We evaluate reconstruction accuracy across different codebook Runtime (s) ↓ 7.65 3.95 sizes for several tokenization methods, including RT-1 [102], FAST [91], and our proposed K-disk tokenization, as shown in Table 4. For RT-1, ac- Table 6: Performance Comparison across Different celeration and steering rate are discretized using Tokenization Methods on NAVSIM uniform action bins, and a kinematic model is employed to reconstruct the trajectory. However, Tokenization PDMS ↑ Collision ↑ Progress ↑ because only trajectory-level data is available 92.74 64.09 and control actions must be indirectly inferred, FAST (DCT) [91] 67.63 K-disk (Ours) 80.54 96.89 75.82 this binning approach yields the highest reconstruction error. The FAST tokenization method is more sensitive to codebook size than our Kdisk approach, achieving comparable reconstruction accuracy only at K = 4096. In contrast, our proposed method consistently attains the highest reconstruction accuracy across all codebook sizes. When the codebook size is small (K = 256), reconstruction errors are significantly higher due to limited movement coverage, as many movements cannot be adequately represented by the small set of codebook tokens. As the codebook size increases beyond K = 2048, the improvements in tokenization accuracy and movement coverage become marginal, while codebook usage decreases as many tokens remain redundant and unused. Considering this trade-off, we select K = 2048 to balance reconstruction accuracy, movement coverage, and efficient codebook usage. Furthermore, Table 6 reports planning performance on NAVSIM (nuPlan) for different tokenization methods. Our proposed method outperforms FAST. In FAST, the discrete cosine transform converts fixed-horizon planning trajectories into variable-length token sequences, complicating the selection of appropriate token lengths and making fixed-horizon planning difficult.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S300"></a>
**Source:** p.10 S300

**Original:** Conclusions

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S301"></a>
**Source:** p.10 S301

**Original:** We propose AutoVLA, an end-to-end autonomous driving framework that unifies scene reasoning and action generation within a single autoregressive model. We adopt SFT to enable the model to operate in both fast thinking (direct trajectory generation) and slow thinking (enhanced with long CoT reasoning) modes. In addition, we introduce RFT to enable adaptive reasoning by penalizing unnecessary reasoning and aligning action generation with reward functions, improving both performance and efficiency. Experimental results demonstrate that AutoVLA achieves competitive performance on both open-loop and closed-loop planning benchmarks and exhibits strong reasoning capabilities. Limitation and Future Work. Although our model with dual-process adaptation achieves nearreal-time inference (1 Hz), it remains highly GPU-dependent, requiring significant memory and computing. Future work will focus on real-time applications, optimizing runtime efficiency, and reducing computation overhead (e.g., through model quantization) to enable real-time deployment. 10

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-11"></a>
### Page 11

<a id="S302"></a>
**Source:** p.11 S302

**Original:** Acknowledgements This work was supported by the Federal Highway Administration Center of Excellence on New Mobility and Automated Vehicles, and by the National Science Foundation under Award No. 2346267, POSE: Phase II - DriveX: An Open Source Ecosystem for Automated Driving and Intelligent Transportation Research.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S303"></a>
**Source:** p.11 S303

**Original:** References [1] Zhiqi Li, Wenhai Wang, Hongyang Li, Enze Xie, Chonghao Sima, Tong Lu, Qiao Yu, and Jifeng Dai. Bevformer: learning bird’s-eye-view representation from lidar-camera via spatiotemporal transformers. IEEE Transactions on Pattern Analysis and Machine Intelligence, 2024. [2] Yue Wang, Vitor Campagnolo Guizilini, Tianyuan Zhang, Yilun Wang, Hang Zhao, and Justin Solomon. Detr3d: 3d object detection from multi-view images via 3d-to-2d queries. In Conference on Robot Learning, pages 180–191. PMLR, 2022. [3] Tingting Liang, Hongwei Xie, Kaicheng Yu, Zhongyu Xia, Zhiwei Lin, Yongtao Wang, Tao Tang, Bing Wang, and Zhi Tang. Bevfusion: A simple and robust lidar-camera fusion framework. Advances in Neural Information Processing Systems, 35:10421–10434, 2022. [4] Zikang Zhou, Zihao Wen, Jianping Wang, Yung-Hui Li, and Yu-Kai Huang. Qcnext: A next-generation framework for joint multi-agent trajectory prediction. arXiv preprint arXiv:2306.10508, 2023. [5] Shaoshuai Shi, Li Jiang, Dengxin Dai, and Bernt Schiele. Mtr++: Multi-agent motion prediction with symmetric scene modeling and guided intention querying. IEEE Transactions on Pattern Analysis and Machine Intelligence, 46(5):3955–3971, 2024. [6] Zhiyu Huang, Haochen Liu, and Chen Lv. Gameformer: Game-theoretic modeling and learning of transformer-based interactive prediction and planning for autonomous driving. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 3903–3913, 2023. [7] Zhiyu Huang, Xinshuo Weng, Maximilian Igl, Yuxiao Chen, Yulong Cao, Boris Ivanovic, Marco Pavone, and Chen Lv. Gen-drive: Enhancing diffusion generative driving policies with reward modeling and reinforcement learning fine-tuning. arXiv preprint arXiv:2410.05582, 2024. [8] Zhiyu Huang, Haochen Liu, Jingda Wu, and Chen Lv. Differentiable integrated motion prediction and planning with learnable cost function for autonomous driving. IEEE transactions on neural networks and learning systems, 2023. [9] Haochen Liu, Zhiyu Huang, Wenhui Huang, Haohan Yang, Xiaoyu Mo, and Chen Lv. Hybridprediction integrated planning for autonomous driving. IEEE Transactions on Pattern Analysis and Machine Intelligence, 2025. [10] Hao Shao, Letian Wang, Ruobing Chen, Steven L Waslander, Hongsheng Li, and Yu Liu. Reasonnet: End-to-end driving with temporal and global reasoning. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 13723–13733, 2023. [11] Xiaosong Jia, Penghao Wu, Li Chen, Jiangwei Xie, Conghui He, Junchi Yan, and Hongyang Li. Think twice before driving: Towards scalable decoders for end-to-end autonomous driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 21983–21994, 2023. [12] Chenbin Pan, Burhaneddin Yaman, Tommaso Nesti, Abhirup Mallik, Alessandro G Allievi, Senem Velipasalar, and Liu Ren. Vlp: Vision language planning for autonomous driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 14760–14769, 2024. 11

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-12"></a>
### Page 12

<a id="S304"></a>
**Source:** p.12 S304

**Original:** [13] Yuqi Wang, Jiawei He, Lue Fan, Hongxin Li, Yuntao Chen, and Zhaoxiang Zhang. Driving into the future: Multiview visual forecasting and planning with world model for autonomous driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 14749–14759, June 2024. [14] Shengchao Hu, Li Chen, Penghao Wu, Hongyang Li, Junchi Yan, and Dacheng Tao. Stp3: End-to-end vision-based autonomous driving via spatial-temporal feature learning. In European Conference on Computer Vision, pages 533–549. Springer, 2022. [15] Shaoheng Fang, Zi Wang, Yiqi Zhong, Junhao Ge, and Siheng Chen. Tbp-former: Learning temporal bird’s-eye-view pyramid for joint perception and prediction in vision-centric autonomous driving. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 1368–1378, 2023. [16] Xingcheng Zhou, Mingyu Liu, Ekim Yurtsever, Bare Luka Zagar, Walter Zimmer, Hu Cao, and Alois C Knoll. Vision language models in autonomous driving: A survey and outlook. IEEE Transactions on Intelligent Vehicles, 2024. [17] Tianhui Cai, Yifan Liu, Zewei Zhou, Haoxuan Ma, Seth Z Zhao, Zhiwen Wu, and Jiaqi Ma. Driving with regulation: Interpretable decision-making for autonomous vehicles with retrieval-augmented reasoning via llm. arXiv preprint arXiv:2410.04759, 2024. [18] Li Chen, Penghao Wu, Kashyap Chitta, Bernhard Jaeger, Andreas Geiger, and Hongyang Li. End-to-end autonomous driving: Challenges and frontiers. IEEE Transactions on Pattern Analysis and Machine Intelligence, 2024. [19] Daocheng Fu, Xin Li, Licheng Wen, Min Dou, Pinlong Cai, Botian Shi, and Yu Qiao. Drive like a human: Rethinking autonomous driving with large language models. In 2024 IEEE/CVF Winter Conference on Applications of Computer Vision Workshops (WACVW), pages 910–919. IEEE, 2024. [20] Aaron Jaech, Adam Kalai, Adam Lerer, Adam Richardson, Ahmed El-Kishky, Aiden Low, Alec Helyar, Aleksander Madry, Alex Beutel, Alex Carney, et al. Openai o1 system card. arXiv preprint arXiv:2412.16720, 2024. [21] Shuai Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, Sibo Song, Kai Dang, Peng Wang, Shijie Wang, Jun Tang, et al. Qwen2.5-vl technical report. arXiv preprint arXiv:2502.13923, 2025. [22] Daya Guo, Dejian Yang, Haowei Zhang, Junxiao Song, Ruoyu Zhang, Runxin Xu, Qihao Zhu, Shirong Ma, Peiyi Wang, Xiao Bi, et al. Deepseek-r1: Incentivizing reasoning capability in llms via reinforcement learning. arXiv preprint arXiv:2501.12948, 2025. [23] Kai Chen, Yanze Li, Wenhua Zhang, Yanxin Liu, Pengxiang Li, Ruiyuan Gao, Lanqing Hong, Meng Tian, Xinhai Zhao, Zhenguo Li, et al. Automated evaluation of large vision-language models on self-driving corner cases. In 2025 IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), pages 7817–7826. IEEE, 2025. [24] Boyi Li, Yue Wang, Jiageng Mao, Boris Ivanovic, Sushant Veer, Karen Leung, and Marco Pavone. Driving everywhere with large language model policy adaptation. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 14948–14957, 2024. [25] Zhenhua Xu, Yujia Zhang, Enze Xie, Zhen Zhao, Yong Guo, Kwan-Yee K Wong, Zhenguo Li, and Hengshuang Zhao. Drivegpt4: Interpretable end-to-end autonomous driving via large language model. IEEE Robotics and Automation Letters, 2024. [26] Shihao Wang, Zhiding Yu, Xiaohui Jiang, Shiyi Lan, Min Shi, Nadine Chang, Jan Kautz, Ying Li, and Jose M Alvarez. Omnidrive: A holistic llm-agent framework for autonomous driving with 3d perception, reasoning and planning. arXiv preprint arXiv:2405.01533, 2024. [27] Yingzi Ma, Yulong Cao, Jiachen Sun, Marco Pavone, and Chaowei Xiao. Dolphins: Multimodal language model for driving. In European Conference on Computer Vision, pages 403–420. Springer, 2024. 12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-13"></a>
### Page 13

<a id="S305"></a>
**Source:** p.13 S305

**Original:** [28] Katharina Winter, Mark Azer, and Fabian B Flohr. Bevdriver: Leveraging bev maps in llms for robust closed-loop driving. arXiv preprint arXiv:2503.03074, 2025. [29] Kexin Tian, Jingrui Mao, Yunlong Zhang, Jiwan Jiang, Yang Zhou, and Zhengzhong Tu. Nuscenes-spatialqa: A spatial understanding and reasoning benchmark for vision-language models in autonomous driving. arXiv preprint arXiv:2504.03164, 2025. [30] Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, et al. Openvla: An open-source vision-language-action model. arXiv preprint arXiv:2406.09246, 2024. [31] Qingqing Zhao, Yao Lu, Moo Jin Kim, Zipeng Fu, Zhuoyang Zhang, Yecheng Wu, Zhaoshuo Li, Qianli Ma, Song Han, Chelsea Finn, et al. Cot-vla: Visual chain-of-thought reasoning for vision-language-action models. arXiv preprint arXiv:2503.22020, 2025. [32] Chia-Yu Hung, Qi Sun, Pengfei Hong, Amir Zadeh, Chuan Li, U-Xuan Tan, Navonil Majumder, and Soujanya Poria. Nora: A small open-sourced generalist vision language action model for embodied tasks, 2025. URL https://arxiv.org/abs/2504.19854. [33] Hidehisa Arai, Keita Miwa, Kento Sasaki, Kohei Watanabe, Yu Yamaguchi, Shunsuke Aoki, and Issei Yamamoto. Covla: Comprehensive vision-language-action dataset for autonomous driving. In 2025 IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), pages 1933–1943. IEEE, 2025. [34] Xingcheng Zhou, Xuyuan Han, Feng Yang, Yunpu Ma, and Alois C Knoll. Opendrivevla: Towards end-to-end autonomous driving with large vision language action model. arXiv preprint arXiv:2503.23463, 2025. [35] Hao Shao, Yuxuan Hu, Letian Wang, Guanglu Song, Steven L Waslander, Yu Liu, and Hongsheng Li. Lmdrive: Closed-loop end-to-end driving with large language models. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 15120–15130, 2024. [36] Katrin Renz, Long Chen, Elahe Arani, and Oleg Sinavski. Simlingo: Vision-only closed-loop autonomous driving with language-action alignment. arXiv preprint arXiv:2503.09594, 2025. [37] Jyh-Jing Hwang, Runsheng Xu, Hubert Lin, Wei-Chih Hung, Jingwei Ji, Kristy Choi, Di Huang, Tong He, Paul Covington, Benjamin Sapp, et al. Emma: End-to-end multimodal model for autonomous driving. arXiv preprint arXiv:2410.23262, 2024. [38] Bo Jiang, Shaoyu Chen, Qian Zhang, Wenyu Liu, and Xinggang Wang. Alphadrive: Unleashing the power of vlms in autonomous driving via reinforcement learning and reasoning. arXiv preprint arXiv:2503.07608, 2025. [39] Bo Jiang, Shaoyu Chen, Bencheng Liao, Xingyu Zhang, Wei Yin, Qian Zhang, Chang Huang, Wenyu Liu, and Xinggang Wang. Senna: Bridging large vision-language models and end-toend autonomous driving. arXiv preprint arXiv:2410.22313, 2024. [40] Wenhai Wang, Jiangwei Xie, ChuanYang Hu, Haoming Zou, Jianan Fan, Wenwen Tong, Yang Wen, Silei Wu, Hanming Deng, Zhiqi Li, et al. Drivemlm: Aligning multi-modal large language models with behavioral planning states for autonomous driving. arXiv preprint arXiv:2312.09245, 2023. [41] Katrin Renz, Long Chen, Ana-Maria Marcu, Jan Hünermann, Benoit Hanotte, Alice Karnsund, Jamie Shotton, Elahe Arani, and Oleg Sinavski. Carllava: Vision language models for cameraonly closed-loop driving. arXiv preprint arXiv:2406.10165, 2024. [42] Haoyu Fu, Diankun Zhang, Zongchuang Zhao, Jianfeng Cui, Dingkang Liang, Chong Zhang, Dingyuan Zhang, Hongwei Xie, Bing Wang, and Xiang Bai. Orion: A holistic end-to-end autonomous driving framework by vision-language instructed action generation. arXiv preprint arXiv:2503.19755, 2025. [43] Waywe Research Team et al. Lingo-2: Driving with natural language, 2024. 13

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-14"></a>
### Page 14

<a id="S306"></a>
**Source:** p.14 S306

**Original:** [44] Shuo Xing, Chengyuan Qian, Yuping Wang, Hongyuan Hua, Kexin Tian, Yang Zhou, and Zhengzhong Tu. Openemma: Open-source multimodal model for end-to-end autonomous driving. In Proceedings of the Winter Conference on Applications of Computer Vision, pages 1001–1009, 2025. [45] Tianqi Wang, Enze Xie, Ruihang Chu, Zhenguo Li, and Ping Luo. Drivecot: Integrating chain-of-thought reasoning with end-to-end driving. arXiv preprint arXiv:2403.16996, 2024. [46] Xiaoyu Tian, Junru Gu, Bailin Li, Yicheng Liu, Yang Wang, Zhiyong Zhao, Kun Zhan, Peng Jia, Xianpeng Lang, and Hang Zhao. Drivevlm: The convergence of autonomous driving and large vision-language models. arXiv preprint arXiv:2402.12289, 2024. [47] Wenjie Ma, Jingxuan He, Charlie Snell, Tyler Griggs, Sewon Min, and Matei Zaharia. Reasoning models can be effective without thinking. arXiv preprint arXiv:2504.09858, 2025. [48] Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright, Pamela Mishkin, Chong Zhang, Sandhini Agarwal, Katarina Slama, Alex Ray, et al. Training language models to follow instructions with human feedback. Advances in neural information processing systems, 35:27730–27744, 2022. [49] Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, YK Li, Y Wu, et al. Deepseekmath: Pushing the limits of mathematical reasoning in open language models. arXiv preprint arXiv:2402.03300, 2024. [50] Napat Karnchanachari, Dimitris Geromichalos, Kok Seang Tan, Nanxiang Li, Christopher Eriksen, Shakiba Yaghoubi, Noushin Mehdipour, Gianmarco Bernasconi, Whye Kit Fong, Yiluan Guo, et al. Towards learning-based planning: The nuplan benchmark for real-world autonomous driving. In 2024 IEEE International Conference on Robotics and Automation (ICRA), pages 629–636. IEEE, 2024. [51] Daniel Dauner, Marcel Hallgarten, Tianyu Li, Xinshuo Weng, Zhiyu Huang, Zetong Yang, Hongyang Li, Igor Gilitschenski, Boris Ivanovic, Marco Pavone, et al. Navsim: Data-driven non-reactive autonomous vehicle simulation and benchmarking. Advances in Neural Information Processing Systems, 37:28706–28719, 2024. [52] Runsheng Xu, Hubert Lin, Wonseok Jeon, Hao Feng, Yuliang Zou, Liting Sun, John Gorman, Kate Tolstaya, Sarah Tang, Brandyn White, Sapp Ben, Mingxing Tan, Jyh-Jing Hwang, and Dragomir Anguelov. Wod-e2e: Waymo open dataset for end-to-end driving in challenging long-tail scenarios. arXiv preprint arXiv:2510.26125, 2025. [53] Holger Caesar, Varun Bankiti, Alex H Lang, Sourabh Vora, Venice Erin Liong, Qiang Xu, Anush Krishnan, Yu Pan, Giancarlo Baldan, and Oscar Beijbom. nuscenes: A multimodal dataset for autonomous driving. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 11621–11631, 2020. [54] Xiaosong Jia, Zhenjie Yang, Qifeng Li, Zhiyuan Zhang, and Junchi Yan. Bench2drive: Towards multi-ability benchmarking of closed-loop end-to-end autonomous driving. arXiv preprint arXiv:2406.03877, 2024. [55] Bernhard Jaeger, Kashyap Chitta, and Andreas Geiger. Hidden biases of end-to-end driving models. In Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV), pages 8240–8249, October 2023. [56] Chengran Yuan, Zhanqi Zhang, Jiawei Sun, Shuo Sun, Zefan Huang, Christina Dao Wen Lee, Dongen Li, Yuhang Han, Anthony Wong, Keng Peng Tee, et al. Drama: An efficient end-to-end motion planner for autonomous driving with mamba. arXiv preprint arXiv:2408.03601, 2024. [57] Zhenxin Li, Kailin Li, Shihao Wang, Shiyi Lan, Zhiding Yu, Yishen Ji, Zhiqi Li, Ziyue Zhu, Jan Kautz, Zuxuan Wu, et al. Hydra-mdp: End-to-end multimodal planning with multi-target hydra-distillation. arXiv preprint arXiv:2406.06978, 2024. [58] Kashyap Chitta, Aditya Prakash, Bernhard Jaeger, Zehao Yu, Katrin Renz, and Andreas Geiger. Transfuser: Imitation with transformer-based sensor fusion for autonomous driving. IEEE transactions on pattern analysis and machine intelligence, 45(11):12878–12895, 2022. 14

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-15"></a>
### Page 15

<a id="S307"></a>
**Source:** p.15 S307

**Original:** [59] Chonghao Sima, Kashyap Chitta, Zhiding Yu, Shiyi Lan, Ping Luo, Andreas Geiger, Hongyang Li, and Jose M Alvarez. Centaur: Robust end-to-end autonomous driving with test-time training. arXiv preprint arXiv:2503.11650, 2025. [60] Zewei Zhou, Hao Xiang, Zhaoliang Zheng, Seth Z Zhao, Mingyue Lei, Yun Zhang, Tianhui Cai, Xinyi Liu, Johnson Liu, Maheswari Bajji, et al. V2XPnP: Vehicle-to-everything spatiotemporal fusion for multi-agent perception and prediction. arXiv preprint arXiv:2412.01812, 2024. [61] Wenchao Sun, Xuewu Lin, Yining Shi, Chuang Zhang, Haoran Wu, and Sifa Zheng. Sparsedrive: End-to-end autonomous driving via sparse scene representation. arXiv preprint arXiv:2405.19620, 2024. [62] Yiheng Li, Seth Z. Zhao, Chenfeng Xu, Chen Tang, Chenran Li, Mingyu Ding, Masayoshi Tomizuka, and Wei Zhan. Pre-training on synthetic driving data for trajectory prediction. In 2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), pages 5910–5917, 2024. doi: 10.1109/IROS58592.2024.10802492. [63] Wenzhao Zheng, Junjie Wu, Yao Zheng, Sicheng Zuo, Zixun Xie, Longchao Yang, Yong Pan, Zhihui Hao, Peng Jia, Xianpeng Lang, et al. Gaussianad: Gaussian-centric end-to-end autonomous driving. arXiv preprint arXiv:2412.10371, 2024. [64] Yuping Wang, Shuo Xing, Cui Can, Renjie Li, Hongyuan Hua, Kexin Tian, Zhaobin Mo, Xiangbo Gao, Keshu Wu, Sulong Zhou, Hengxu You, Juntong Peng, Junge Zhang, Zehao Wang, Rui Song, Mingxuan Yan, Walter Zimmer, Xingcheng Zhou, Peiran Li, Zhaohan Lu, Chia-Ju Chen, Yue Huang, Ryan A. Rossi, Lichao Sun, Hongkai Yu, Zhiwen Fan, Frank Hao Yang, Yuhao Kang, Ross Greer, Chenxi Liu, Eun Hak Lee, Xuan Di, Xinyue Ye, Liu Ren, Alois Knoll, Xiaopeng Li, Shuiwang Ji, Masayoshi Tomizuka, Marco Pavone, Tianbao Yang, Jing Du, Ming-Hsuan Yang, Hua Wei, Ziran Wang, Yang Zhou, Jiachen Li, and Zhengzhong Tu. Generative ai for autonomous driving: Frontiers and opportunities, 2025. URL https: //arxiv.org/abs/2505.08854. [65] Yihan Hu, Jiazhi Yang, Li Chen, Keyu Li, Chonghao Sima, Xizhou Zhu, Siqi Chai, Senyao Du, Tianwei Lin, Wenhai Wang, et al. Planning-oriented autonomous driving. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 17853–17862, 2023. [66] Bo Jiang, Shaoyu Chen, Qing Xu, Bencheng Liao, Jiajie Chen, Helong Zhou, Qian Zhang, Wenyu Liu, Chang Huang, and Xinggang Wang. Vad: Vectorized scene representation for efficient autonomous driving. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 8340–8350, 2023. [67] Xinshuo Weng, Boris Ivanovic, Yan Wang, Yue Wang, and Marco Pavone. Para-drive: Parallelized architecture for real-time autonomous driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 15449–15458, 2024. [68] Wenzhao Zheng, Ruiqi Song, Xianda Guo, Chenming Zhang, and Long Chen. Genad: Generative end-to-end autonomous driving. In European Conference on Computer Vision, pages 87–104. Springer, 2024. [69] Bencheng Liao, Shaoyu Chen, Haoran Yin, Bo Jiang, Cheng Wang, Sixu Yan, Xinbang Zhang, Xiangyu Li, Ying Zhang, Qian Zhang, et al. Diffusiondrive: Truncated diffusion model for end-to-end autonomous driving. arXiv preprint arXiv:2411.15139, 2024. [70] Zhiqi Li, Zhiding Yu, Shiyi Lan, Jiahan Li, Jan Kautz, Tong Lu, and Jose M Alvarez. Is ego status all you need for open-loop end-to-end autonomous driving? In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 14864–14873, 2024. [71] Bu Jin, Xinyu Liu, Yupeng Zheng, Pengfei Li, Hao Zhao, Tong Zhang, Yuhang Zheng, Guyue Zhou, and Jingjing Liu. Adapt: Action-aware driving caption transformer. In 2023 IEEE International Conference on Robotics and Automation (ICRA), pages 7554–7561. IEEE, 2023. 15

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-16"></a>
### Page 16

<a id="S308"></a>
**Source:** p.16 S308

**Original:** [72] SungYeon Park, MinJae Lee, JiHyuk Kang, Hahyeon Choi, Yoonah Park, Juhwan Cho, Adam Lee, and DongKyu Kim. Vlaad: Vision and language assistant for autonomous driving. In Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision, pages 980–987, 2024. [73] Kairui Ding, Boyuan Chen, Yuchen Su, Huan-ang Gao, Bu Jin, Chonghao Sima, Wuqiang Zhang, Xiaohui Li, Paul Barsch, Hongyang Li, et al. Hint-ad: Holistically aligned interpretability in end-to-end autonomous driving. arXiv preprint arXiv:2409.06702, 2024. [74] Ana-Maria Marcu, Long Chen, Jan Hünermann, Alice Karnsund, Benoit Hanotte, Prajwal Chidananda, Saurabh Nair, Vijay Badrinarayanan, Alex Kendall, Jamie Shotton, et al. Lingoqa: Visual question answering for autonomous driving. In European Conference on Computer Vision, pages 252–269. Springer, 2024. [75] Yiheng Li, Cunxin Fan, Chongjian Ge, Zhihao Zhao, Chenran Li, Chenfeng Xu, Huaxiu Yao, Masayoshi Tomizuka, Bolei Zhou, Chen Tang, Mingyu Ding, and Wei Zhan. Womdreasoning: A large-scale dataset for interaction reasoning in driving, 2025. URL https: //arxiv.org/abs/2407.04281. [76] Yi Xu, Yuxin Hu, Zaiwei Zhang, Gregory P Meyer, Siva Karthik Mustikovela, Siddhartha Srinivasa, Eric M Wolff, and Xin Huang. Vlm-ad: End-to-end autonomous driving through vision-language model supervision. arXiv preprint arXiv:2412.14446, 2024. [77] Deepti Hegde, Rajeev Yasarla, Hong Cai, Shizhong Han, Apratim Bhattacharyya, Shweta Mahajan, Litian Liu, Risheek Garrepalli, Vishal M Patel, and Fatih Porikli. Distilling multimodal large language models for autonomous driving. arXiv preprint arXiv:2501.09757, 2025. [78] Pei Liu, Haipeng Liu, Haichao Liu, Xin Liu, Jinxin Ni, and Jun Ma. Vlm-e2e: Enhancing end-to-end autonomous driving with multimodal driver attention fusion. arXiv preprint arXiv:2502.18042, 2025. [79] Haicheng Liao, Hanlin Kong, Bonan Wang, Chengyue Wang, Wang Ye, Zhengbing He, Chengzhong Xu, and Zhenning Li. Cot-drive: Efficient motion forecasting for autonomous driving with llms and chain-of-thought prompting. arXiv preprint arXiv:2503.07234, 2025. [80] Jiageng Mao, Yuxi Qian, Junjie Ye, Hang Zhao, and Yue Wang. Gpt-driver: Learning to drive with gpt. arXiv preprint arXiv:2310.01415, 2023. [81] Songyan Zhang, Wenhui Huang, Zihui Gao, Hao Chen, and Chen Lv. Wisead: Knowledge augmented end-to-end autonomous driving with vision-language model. arXiv preprint arXiv:2412.09951, 2024. [82] Ran Tian, Boyi Li, Xinshuo Weng, Yuxiao Chen, Edward Schmerling, Yue Wang, Boris Ivanovic, and Marco Pavone. Tokenize the world into object-level knowledge to address long-tail events in autonomous driving. arXiv preprint arXiv:2407.00959, 2024. [83] Zhijie Qiao, Haowei Li, Zhong Cao, and Henry X. Liu. Lightemma: Lightweight end-to-end multimodal model for autonomous driving, 2025. URL https://arxiv.org/abs/2505. 00284. [84] Wenru Liu, Pei Liu, and Jun Ma. Dsdrive: Distilling large language model for lightweight end-to-end autonomous driving with unified reasoning and planning, 2025. URL https: //arxiv.org/abs/2505.05360. [85] Derun Li, Jianwei Ren, Yue Wang, Xin Wen, Pengxiang Li, Leimeng Xu, Kun Zhan, Zhongpu Xia, Peng Jia, Xianpeng Lang, et al. Finetuning generative trajectory model with reinforcement learning from human feedback. arXiv preprint arXiv:2503.10434, 2025. [86] Hao Gao, Shaoyu Chen, Bo Jiang, Bencheng Liao, Yiang Shi, Xiaoyang Guo, Yuechuan Pu, Haoran Yin, Xiangyu Li, Xinbang Zhang, et al. Rad: Training an end-to-end driving policy via large-scale 3dgs-based reinforcement learning. arXiv preprint arXiv:2502.13144, 2025. 16

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-17"></a>
### Page 17

<a id="S309"></a>
**Source:** p.17 S309

**Original:** [87] Rafael Rafailov, Archit Sharma, Eric Mitchell, Christopher D Manning, Stefano Ermon, and Chelsea Finn. Direct preference optimization: Your language model is secretly a reward model. Advances in Neural Information Processing Systems, 36:53728–53741, 2023. [88] Zhejun Zhang, Peter Karkus, Maximilian Igl, Wenhao Ding, Yuxiao Chen, Boris Ivanovic, and Marco Pavone. Closed-loop supervised fine-tuning of tokenized traffic models. arXiv preprint arXiv:2412.05334, 2024. [89] Jonah Philion, Xue Bin Peng, and Sanja Fidler. Trajeglish: Traffic modeling as next-token prediction. arXiv preprint arXiv:2312.04535, 2023. [90] Wei Wu, Xiaoxin Feng, Ziyan Gao, and Yuheng Kan. Smart: scalable multi-agent real-time motion generation via next-token prediction. Advances in Neural Information Processing Systems, 37:114048–114071, 2024. [91] Karl Pertsch, Kyle Stachowicz, Brian Ichter, Danny Driess, Suraj Nair, Quan Vuong, Oier Mees, Chelsea Finn, and Sergey Levine. Fast: Efficient action tokenization for vision-language-action models. arXiv preprint arXiv:2501.09747, 2025. [92] Sung-Yeon Park, Can Cui, Yunsheng Ma, Ahmadreza Moradipari, Rohit Gupta, Kyungtae Han, and Ziran Wang. Nuplanqa: A large-scale dataset and benchmark for multi-view driving scene understanding in multi-modal large language models. arXiv preprint arXiv:2503.12772, 2025. [93] Dongming Wu, Wencheng Han, Yingfei Liu, Tiancai Wang, Cheng-zhong Xu, Xiangyu Zhang, and Jianbing Shen. Language prompt for autonomous driving. In Proceedings of the AAAI Conference on Artificial Intelligence, volume 39, pages 8359–8367, 2025. [94] Tianwen Qian, Jingjing Chen, Linhai Zhuo, Yang Jiao, and Yu-Gang Jiang. Nuscenes-qa: A multi-modal visual question answering benchmark for autonomous driving scenario. In Proceedings of the AAAI Conference on Artificial Intelligence, volume 38, pages 4542–4550, 2024. [95] Ming Nie, Renyuan Peng, Chunwei Wang, Xinyue Cai, Jianhua Han, Hang Xu, and Li Zhang. Reason2drive: Towards interpretable and chain-based reasoning for autonomous driving. In European Conference on Computer Vision, pages 292–308. Springer, 2024. [96] Chonghao Sima, Katrin Renz, Kashyap Chitta, Li Chen, Hanxue Zhang, Chengen Xie, Jens Beißwenger, Ping Luo, Andreas Geiger, and Hongyang Li. Drivelm: Driving with graph visual question answering. In European Conference on Computer Vision, pages 256–274. Springer, 2024. [97] OpenScene Contributors. Openscene: The largest up-to-date 3d occupancy prediction benchmark in autonomous driving. https://github.com/OpenDriveLab/OpenScene, 2023. [98] Edward J Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen, et al. Lora: Low-rank adaptation of large language models. ICLR, 1 (2):3, 2022. [99] Jiang-Tian Zhai, Ze Feng, Jinhao Du, Yongqiang Mao, Jiang-Jiang Liu, Zichang Tan, Yifu Zhang, Xiaoqing Ye, and Jingdong Wang. Rethinking the open-loop evaluation of end-to-end autonomous driving in nuscenes. arXiv preprint arXiv:2305.10430, 2023. [100] Penghao Wu, Xiaosong Jia, Li Chen, Junchi Yan, Hongyang Li, and Yu Qiao. Trajectoryguided control prediction for end-to-end autonomous driving: A simple yet strong baseline. Advances in Neural Information Processing Systems, 35:6119–6132, 2022. [101] Xiaosong Jia, Yulu Gao, Li Chen, Junchi Yan, Patrick Langechuan Liu, and Hongyang Li. Driveadapter: Breaking the coupling barrier of perception and planning in end-to-end autonomous driving. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 7953–7963, 2023. 17

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-18"></a>
### Page 18

<a id="S310"></a>
**Source:** p.18 S310

**Original:** [102] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Joseph Dabis, Chelsea Finn, Keerthana Gopalakrishnan, Karol Hausman, Alex Herzog, Jasmine Hsu, et al. Rt-1: Robotics transformer for real-world control at scale. arXiv preprint arXiv:2212.06817, 2022. [103] Scott Ettinger, Shuyang Cheng, Benjamin Caine, Chenxi Liu, Hang Zhao, Sabeek Pradhan, Yuning Chai, Ben Sapp, Charles R Qi, Yin Zhou, et al. Large scale interactive motion forecasting for autonomous driving: The waymo open motion dataset. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 9710–9719, 2021.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-19"></a>
### Page 19

<a id="S311"></a>
**Source:** p.19 S311

**Original:** AutoVLA Supplementary Material A A.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S312"></a>
**Source:** p.19 S312

**Original:** Action Tokenization Action Codebook

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S313"></a>
**Source:** p.19 S313

**Original:** To enable trajectory-level planning within a language model, we introduce physical action tokens, each representing a short-term feasible vehicle maneuver. These tokens are derived from clustering vehicle motion patterns in the Waymo Open Motion Dataset (WOMD) [103], which contains extensive real-world vehicle trajectories. The resulting codebook, visualized in Fig. S1(a), is used across experiments involving multiple real-world datasets, including nuPlan, nuScenes, and Waymo. Due to differences in vehicle dynamics compared to real-world data for simulation testing, we construct a separate action codebook using the same clustering procedure on the CARLA-Garage dataset [55]. This produces another set of 2048 action tokens for simulation testing, as shown in Fig. S1(b). We begin by sampling short motion segments from the dataset to construct a discrete action codebook. Each segment represents 0.5 seconds of vehicle motion, characterized by its final-frame bounding-box contour, computed based on the vehicle’s position, dimensions, and heading with respect to the currentframe coordinate. Then, we apply K-Disk clustering on these sampled segments, which iteratively selects a diverse set of representative segments {m1 , . . . , mK }, such that no two segments are within a distance threshold δ = 0.05 m, measured using average contour distance. For each selected segment mk , we extract its spatial displacement and heading change, denoted as (∆x, ∆y, ∆θ), and define it as the action token ak . The resulting action codebook is A = {a1 , . . . , aK }, with K = 2048, where each token encodes a distinct and physically feasible short-term vehicle behavior. Real-world (WOMD)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S314"></a>
**Source:** p.19 S314

**Original:** Carla Simulation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S315"></a>
**Source:** p.19 S315

**Original:** (a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S316"></a>
**Source:** p.19 S316

**Original:** (b)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S317"></a>
**Source:** p.19 S317

**Original:** Figure S1: Visualization of action codebooks from (a) real-world dataset (WOMD) and (b) simulation dataset (CARLA). Grey arrows represent all 2048 tokens (position and heading), with 300 tokens randomly highlighted in blue for clarity. A.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S318"></a>
**Source:** p.19 S318

**Original:** Action Tokenizer

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S319"></a>
**Source:** p.19 S319

**Original:** We implement an action tokenizer based on the constructed action codebook. During training, continuous trajectories are discretized by mapping each 0.5-second segment to its nearest action token in the codebook A, resulting in a sequence of discrete tokens [a1 , a2 , . . . , aT ]. During inference, the language model autoregressively generates a sequence of action tokens, each representing a 0.5-second motion segment. These tokens are then converted back to their corresponding motion segments in the codebook and applied sequentially from the initial ego pose. Therefore, the model reconstructs a continuous trajectory in the ego-centric coordinate frame by composing these local displacements and rotations.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S320"></a>
**Source:** p.19 S320

**Original:** B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S321"></a>
**Source:** p.19 S321

**Original:** Reasoning Data Collection

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S322"></a>
**Source:** p.19 S322

**Original:** A large-scale, high-quality reasoning dataset with chain-of-thought (CoT) annotations is essential for enabling robust reasoning capabilities in vision-language-action (VLA) models. In this paper, we introduce an automated reasoning annotation pipeline using the state-of-the-art Qwen2.5-VL-72B vision-language model [21], as illustrated in Fig. S2. The pipeline significantly reduces reliance on 19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-20"></a>
### Page 20

<a id="S323"></a>
**Source:** p.20 S323

**Original:** Scene Description: The scene is at night, and the ego vehicle is stopped at an intersection. The front camera shows multiple red traffic lights directly ahead, indicating that the vehicle must stop. ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S324"></a>
**Source:** p.20 S324

**Original:** Reasoning Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S325"></a>
**Source:** p.20 S325

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S326"></a>
**Source:** p.20 S326

**Original:** Reasoning Format

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S327"></a>
**Source:** p.20 S327

**Original:** Critical Object Description: Reasoning Data 1. Red Traffic Lights (Front Camera) - Location: Directly ahead of the ego vehicle. - Description: The traffic lights are clearly red, signaling all vehicles to stop. - Importance: The red lights are crucial as they dictate the vehicle‘s immediate action— stopping and waiting for the light to change. 2. Pedestrian Crossings (Front Left and Front Right Cameras): - Location: On either side of the intersection. - Description: No pedestrians are visible near the crossings. - Importance: Although no pedestrians are present, the crossings indicate potential areas where pedestrians may appear, requiring vigilance...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S328"></a>
**Source:** p.20 S328

**Original:** - Scene Analysis - Critical Object Identification

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S329"></a>
**Source:** p.20 S329

**Original:** Qwen2.5-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S330"></a>
**Source:** p.20 S330

**Original:** - Intention Reasoning - Final Action Decision

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S331"></a>
**Source:** p.20 S331

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S332"></a>
**Source:** p.20 S332

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S333"></a>
**Source:** p.20 S333

**Original:** Text Tokenizer

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S334"></a>
**Source:** p.20 S334

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S335"></a>
**Source:** p.20 S335

**Original:** …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S336"></a>
**Source:** p.20 S336

**Original:** Vision Encoder

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S337"></a>
**Source:** p.20 S337

**Original:** System Prompt - Role: You are an advanced full self-driving system. - Task: You will be provided with video observations from the ego vehicle’s surrounding cameras, along with the vehicle’s current dynamic states. Your task is to predict the optimal driving action for the next five seconds and use step-by-step reasoning (Chain-of-Thought) to arrive at the best driving action.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S338"></a>
**Source:** p.20 S338

**Original:** Instruction Turn Left | Go Straight …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S339"></a>
**Source:** p.20 S339

**Original:** Ego states Velocity | Acceleration | History Action

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S340"></a>
**Source:** p.20 S340

**Original:** Multi-view Camera Streams

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S341"></a>
**Source:** p.20 S341

**Original:** Ground Truth Action Lateral + Longitudinal Actions

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S342"></a>
**Source:** p.20 S342

**Original:** Reasoning on Intent: 1. Red Traffic Lights: The primary focus is the red traffic lights, which mandate that the vehicle must stop and wait until the light turns green… 2. Driving Command Instruction: The driving command suggests “go left,” but given the red light, the vehicle cannot proceed in any direction until the light changes… 3. Ego Vehicle State: The vehicle has already been stopped for the past four seconds, and its current velocity and acceleration are zero… Best Driving Action: Stop. Given the red traffic lights and the vehicle‘s current state of being stopped, the best action is to remain stopped…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S343"></a>
**Source:** p.20 S343

**Original:** Example - Scene Description: The scene is at rainy night, and the vehicle need to identify the vehicle position light and traffic light carefully. There is a construction vehicle and a white truck in front of … - Critical Object Description: The White truck is turning right, with position light is on (general brightness, not brake light). The Construction vehicles are stationary (brake lights on). - Reasoning on Intent: Firstly, notice White truck, which will turn right on the right-turn lane. Secondly, notice Unclear Light in front. There are some lights in the night scene, and the ego vehicle does not need to follow the unclear light as a traffic light. The ego vehicle is moving on the go straight lane in the past 4s, but the driving command is turn right now. Meanwhile, no vehicle is in the right behind. Thus, the ego vehicle should change the lane to the right and follow the White truck. - Best Driving Action: change lane to right with an acceleration

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S344"></a>
**Source:** p.20 S344

**Original:** Figure S2: Automated reasoning annotation pipeline for autonomous driving, illustrated with a reasoning annotation example from the Waymo end-to-end driving dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S345"></a>
**Source:** p.20 S345

**Original:** human annotations and facilitates effective knowledge distillation from a more powerful, large-scale model to a more efficient, compact model.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S346"></a>
**Source:** p.20 S346

**Original:** B.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S347"></a>
**Source:** p.20 S347

**Original:** Reasoning Annotation Pipeline

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S348"></a>
**Source:** p.20 S348

**Original:** System Prompt. The system prompt specifies the model’s role, task, expected CoT reasoning format, and examples of CoT reasoning. The definition of role and CoT reasoning format aligns with the required outputs of the AutoVLA model, which focuses on structured CoT reasoning. We carefully design several representative reasoning examples to guide the model. Moreover, the reasoning process includes four main steps: 1) scene description and analysis, 2) critical object identification and description, 3) intention reasoning of the surrounding objects, and 4) decision-making and meta-action. User Message. The user message includes the driving instructions, ego vehicle states, and multi-view camera streams. Notably, we introduce the ground-truth driving meta-action derived from the data as explicit hints in reasoning, guiding the model to produce causal explanations that directly associate decisions with the driving context. This structured prompting significantly reduces nonsensical outputs and minimizes manual revisions. Reasoning Data Generation. We employ the most capable model in the Qwen-VL series as the reasoning data annotation engine, leveraging its strong reasoning capacity and extensive world knowledge. The maximum length for newly generated reasoning textual tokens is set to 700. Additionally, we extract answers to relevant questions from the DriveLM VQA dataset [96], which focuses on perception, prediction, and planning in the nuScenes and CARLA datasets, and then we reformat them into our standardized reasoning format. These reformatted samples are then combined with the generated data to construct the final reasoning dataset. Human Quality Check. We evaluate the quality of generated reasoning based on the accuracy and completeness of critical object identification, causal reasoning, and action decisions. The evaluation uses a binary scoring scheme: any error in these aspects results in a score of 0; otherwise, the sample receives a score of 1. Human annotators assessed 3,000 randomly selected samples, yielding an overall accuracy of 88.8%, which demonstrates the high reliability of our proposed annotation pipeline. Erroneous samples were either corrected or discarded. 20

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-21"></a>
### Page 21

<a id="S349"></a>
**Source:** p.21 S349

**Original:** History and GT Future Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S350"></a>
**Source:** p.21 S350

**Original:** History and GT Future Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S351"></a>
**Source:** p.21 S351

**Original:** History Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S352"></a>
**Source:** p.21 S352

**Original:** History Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S353"></a>
**Source:** p.21 S353

**Original:** Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S354"></a>
**Source:** p.21 S354

**Original:** Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S355"></a>
**Source:** p.21 S355

**Original:** Scene Description: The scene is a residential area during the daytime with clear weather. The ego vehicle is at an intersection with a "STOP" sign visible on the right side. There are parked cars along both sides of the street, and a few houses can be seen. The front left camera shows a clear path to the left, while the front right camera shows the "STOP" sign and a parked car nearby. The back camera shows a straight road leading up to the intersection. No pedestrians or moving vehicles are observed in the immediate vicinity.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S356"></a>
**Source:** p.21 S356

**Original:** Scene Description: The scene is at night, and the road appears to be undergoing construction or maintenance work, as indicated by the "KEEP LEFT" sign and orange-and-white striped poles. There are several vehicles ahead, including a large truck directly in front of the ego vehicle. The road is well-lit by streetlights, and the weather seems clear. No traffic lights are visible in the scene.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S357"></a>
**Source:** p.21 S357

**Original:** Critical Object Description:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S358"></a>
**Source:** p.21 S358

**Original:** 1. Large Truck: Located directly in front of the ego vehicle, the truck is moving slowly or is stationary. Its brake lights are on, indicating it may be slowing down or stopped. This is important because the ego vehicle must maintain a safe distance.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S359"></a>
**Source:** p.21 S359

**Original:** Critical Object Description:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S360"></a>
**Source:** p.21 S360

**Original:** 1. STOP Sign: Located on the right side of the intersection, indicating that the ego vehicle must come to a complete stop before proceeding. - What it is doing: The sign is static and serves as a regulatory control. - Why it is important: The ego vehicle must adhere to the stop sign to ensure safety and compliance with traffic rules. 2. Parked Cars: Visible on both sides of the street, particularly near the intersection. - What they are doing: They are stationary and occupy parking spaces. - Why they are important: The ego vehicle must navigate around these parked cars, especially when changing lanes or turning. 3. Clear Path to the Left: Observed through the front left camera. - What it indicates: A potential route for the ego vehicle to take. - Why it is important: This path appears unobstructed, making it a viable option for the ego vehicle to proceed.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S361"></a>
**Source:** p.21 S361

**Original:** 2. KEEP LEFT Sign: Positioned on the right side of the road, this sign indicates that vehicles should stay in the left lane due to construction or roadwork. This is crucial for navigating the area safely and legally. 3. Orange-and-White Striped Poles: These poles are placed along the right side of the road, marking the boundary of the construction zone. They help guide drivers to stay in the correct lane and avoid hazards. Reasoning on Intent: 1. The Large Truck ahead is either slowing down or stopped, as indicated by its brake lights. The ego vehicle must decelerate to maintain a safe following distance and avoid a collision. 2. The KEEP LEFT Sign and Orange-and-White Striped Poles indicate that the ego vehicle should stay in the left lane. Since the driving command is to go straight, the ego vehicle should continue moving forward while adhering to these instructions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S362"></a>
**Source:** p.21 S362

**Original:** Reasoning on Intent: 1. The ego vehicle has already come to a stop as indicated by its current velocity being close to zero and the past behavior of decelerating to zero. 2. The driving command instructs the ego vehicle to go left, suggesting a left turn or lane change is necessary. 3. The front left camera shows a clear path to the left, indicating that it is safe to proceed in that direction. 4. Given the absence of any moving vehicles or pedestrians, the ego vehicle can safely execute a quick acceleration after changing lanes to the left.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S363"></a>
**Source:** p.21 S363

**Original:** 3. The ego vehicle has been moving forward with a deceleration in the past 4 seconds, and its current velocity is relatively low. Given the presence of the truck ahead and the construction zone, it is reasonable to continue decelerating to ensure safety. Best Driving Action: Move forward with a deceleration This action aligns with the need to maintain a safe distance from the truck ahead while adhering to the road signs and navigating through the construction zone. Decelerating ensures the ego vehicle can respond appropriately if the truck stops completely or if any unexpected obstacles appear.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S364"></a>
**Source:** p.21 S364

**Original:** Best Driving Action: Change lane to left with a quick acceleration. This action aligns with the driving command to go left, the clear path observed in the front left camera, and the need to quickly proceed after stopping at the intersection. The quick acceleration ensures efficient navigation through the intersection while maintaining safety.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S365"></a>
**Source:** p.21 S365

**Original:** Figure S3: Visualization of the reasoning data annotation on the Waymo end-to-end driving dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S366"></a>
**Source:** p.21 S366

**Original:** B.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S367"></a>
**Source:** p.21 S367

**Original:** Reasoning Annotation Visualization

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S368"></a>
**Source:** p.21 S368

**Original:** Some CoT reasoning annotation examples from the Waymo end-to-end driving dataset are shown in Fig. S3, showcasing that our annotation pipeline can deal with situations where a vehicle already stopped at a stop sign can proceed, rather than remaining stopped indefinitely. The pipeline also accurately interprets construction-related road control scenarios, enabling high-quality reasoning annotations. Examples on the nuPlan dataset are provided in Fig. S4, demonstrating the pipeline’s capability to distinguish the functional relevance of stop signs and traffic lights across different lanes, rather than stopping at every detected stop sign.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S369"></a>
**Source:** p.21 S369

**Original:** C

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S370"></a>
**Source:** p.21 S370

**Original:** Details of Supervised Fine-tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S371"></a>
**Source:** p.21 S371

**Original:** We perform supervised fine-tuning (SFT) with the Fully Sharded Data Parallel (FSDP) strategy for efficient multi-GPU training. We enable mixed-precision training using BFloat16 for parameters, 21

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-22"></a>
### Page 22

<a id="S372"></a>
**Source:** p.22 S372

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S373"></a>
**Source:** p.22 S373

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S374"></a>
**Source:** p.22 S374

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S375"></a>
**Source:** p.22 S375

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S376"></a>
**Source:** p.22 S376

**Original:** Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S377"></a>
**Source:** p.22 S377

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S378"></a>
**Source:** p.22 S378

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S379"></a>
**Source:** p.22 S379

**Original:** Reasoning Data

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S380"></a>
**Source:** p.22 S380

**Original:** Scene Description: The scene depicts a busy urban intersection with multiple lanes of traffic. The traffic lights ahead are red, indicating that vehicles must stop. There are several vehicles visible in the front camera view, including a white van directly in front of the ego vehicle and other cars further ahead. The right camera view shows a truck and some cars moving along the adjacent lane. The left camera view captures a few cars and a pedestrian area under a building. The rear camera view shows a white truck passing by.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S381"></a>
**Source:** p.22 S381

**Original:** Scene Description: The scene appears to be an urban area with multiple lanes and various road features. The front view shows a clear path ahead with no immediate obstacles. The right view indicates a curved road leading towards a covered area with some parked vehicles and pedestrians. The left view shows a sidewalk with some greenery and a stop sign further down the road. The rear view shows a relatively empty street behind the vehicle. The weather seems clear, and there are no visible traffic lights affecting the current path.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S382"></a>
**Source:** p.22 S382

**Original:** Critical Object Description:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S383"></a>
**Source:** p.22 S383

**Original:** Critical Object Description:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S384"></a>
**Source:** p.22 S384

**Original:** 1. White Van (Front Camera View): - Location: Directly in front of the ego vehicle. - Status: Stationary, as indicated by the red traffic light. - Indicator Lights: No visible lights. - Importance: This vehicle is directly in the path of the ego vehicle, and it is crucial to maintain a safe distance while waiting for the traffic light to change. 2. Truck (Right Camera View): - Location: In the adjacent lane to the right. - Status: Moving forward. - Indicator Lights: No visible indicator lights. - Importance: The truck’s movement needs to be monitored to ensure there is no sudden lane change into the ego vehicle’s lane. 3. Cars (Left Camera View): - Location: On the left side of the road. - Status: Stationary. - Indicator Lights: Not applicable. - Importance: not immediately relevant to the ego vehicle’s movement, requiring caution.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S385"></a>
**Source:** p.22 S385

**Original:** 1. Pedestrians near the covered area (Right View): - Location: On the right side of the road, near the covered area. - Description: A few pedestrians are walking along the sidewalk near the covered area. They appear to be moving at a normal pace and are not showing any immediate intention to cross the road. - Importance: Pay attention to their movements as they could potentially step onto the road unexpectedly, especially if the vehicle is turning right. 2. Stop Sign (Left View): - Location: Further down the left side of the road. - Description: A stop sign is visible, indicating that the vehicle must come to a complete stop before proceeding. - Importance: This is crucial as it dictates the vehicle’s next action. Ignoring the stop sign could lead to unsafe driving conditions and potential accidents. Reasoning on Intent: - The ego vehicle is currently instructed to turn right. The front and right views show a clear path for turning, but the presence of pedestrians near the covered area requires caution. - The left view shows a stop sign, which suggests that the vehicle may need to stop before completing the turn. However, since the stop sign is further down the road and the vehicle is already turning right, it is likely not immediately relevant. - The vehicle is currently moving at a moderate speed with a slight acceleration, indicating that it is preparing to execute the turn.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S386"></a>
**Source:** p.22 S386

**Original:** Reasoning on Intent: - Traffic Lights: The red traffic light indicates that all vehicles must stop and wait until the light turns green. - Lane Markings: The ego vehicle is in the correct lane for moving forward, as per the driving command “keep forward.” - Other Vehicles: The white van directly in front is stationary, and the truck in the adjacent lane is moving forward without any indication of changing lanes. - Ego Vehicle State: The ego vehicle is currently stationary with zero velocity and acceleration, consistent with the requirement to stop at the red light. Given the red traffic light and the stationary vehicle directly in front, the ego vehicle should remain stopped until the light turns green.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S387"></a>
**Source:** p.22 S387

**Original:** Best Driving Action: Turn right with a constant speed. Given the clear path ahead and the absence of immediate obstacles, the ego vehicle should proceed with turning right while maintaining a constant speed. This ensures a smooth and controlled turn while staying aware of the pedestrians on the right side. The stop sign on the left is not directly relevant to the current maneuver, so the focus remains on executing the turn safely

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S388"></a>
**Source:** p.22 S388

**Original:** Best Driving Action: Stop. The ego vehicle should remain stationary, adhering to the red traffic light and maintaining a safe distance from the vehicle in front. Once the light turns green, the vehicle can proceed forward.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S389"></a>
**Source:** p.22 S389

**Original:** Figure S4: Visualization of the reasoning data annotation on the nuPlan dataset. System Prompt

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S390"></a>
**Source:** p.22 S390

**Original:** User Message

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S391"></a>
**Source:** p.22 S391

**Original:** - Role: You are an Advanced Driver Assistance and Full Self-Driving System. - Task: You will receive visual observations from the ego vehicle‘s cameras and dynamic information about the vehicle’s current state. Your task is to predict the optimal driving action for the next five seconds. First, carefully analyze the surrounding environment by considering traffic lights, the movements of other vehicles and pedestrians, lane markings, and any other relevant factors. If necessary, use step-by-step reasoning (Chain-of-Thought) to arrive at the best driving action. Otherwise, you may directly predict the final driving action. - Fast/Slow Thinking: If necessary, use step-by-step reasoning (Chain-of-Thought) to arrive at the best driving action. Otherwise, you may directly predict the final driving action. Structure your reasoning as follows: 1. Scene Analysis: Describe the traffic situation, including relevant environmental cues such as traffic lights, lane markings, and the behaviors of surrounding vehicles or pedestrians. 2. Identification of Critical Objects: Identify two to three critical road users or obstacles, specifying their relative positions to the ego vehicle. 3. Prediction of Critical Object Behavior: Predict the potential movements of the identified critical objects. 4. Ego Vehicle Intent Reasoning: Based on the observed environment and current vehicle state, reason about the desired intent of the ego vehicle. 5. Final Action Decision: Select one lateral action and one longitudinal action: - Lateral actions (choose exactly one): [move forward, turn left, change lane to left, turn right, change lane to right] - Longitudinal actions (choose exactly one): [stop, deceleration to zero, maintain constant speed, quick deceleration, deceleration, quick acceleration, acceleration] Present the final action clearly after your reasoning steps.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S392"></a>
**Source:** p.22 S392

**Original:** - Input Description: The autonomous vehicle is equipped with three cameras mounted at the front, left, and right, enabling a comprehensive perception of the surrounding environment. - Multi-view Camera Streams: - Front Camera: The first video presents the front view of the vehicle, comprising four sequential frames sampled at 2 Hz. [front camera frames] - Front Left Camera: The second video presents the front-left view of the vehicle, comprising four sequential frames sampled at 2 Hz. [front left camera frames] - Front Right Camera: The third video presents the front-right view of the vehicle, comprising four sequential frames sampled at 2 Hz. [front right camera frames] - Ego States: The current velocity of the vehicle is 3.1 m/s, and the current acceleration is 1.4 m/s². - Instruction: The driving instruction is Keep Forward. Based on this information, plan the action trajectory for the autonomous vehicle over the next five seconds.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S393"></a>
**Source:** p.22 S393

**Original:** Figure S5: System Prompt and User Message of AutoVLA. gradients, and buffers to reduce memory usage and accelerate computation. Gradient checkpointing is enabled to reduce GPU memory consumption. The learning rate warm-up is 500 steps and decays by 2% every 2,000 steps. The model is trained for 5 epochs, with gradient clipping applied at a maximum value of 1.0 to ensure training stability. The model takes both system and user prompts as context inputs. As illustrated in Fig. S5, the system prompt defines the model’s role, task, and the expected CoT reasoning format. The user message describes the multi-view camera observations, the ego vehicle’s current state (i.e., speed and acceleration) and optionally historical states, and the high-level driving instruction. We use three camera views (front, front-left, and front-right), each providing four consecutive frames. Images in the video stream are resized to maintain original aspect ratios but reduced to 28 × 28 × 128 pixels. 22

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-23"></a>
### Page 23

<a id="S394"></a>
**Source:** p.23 S394

**Original:** Algorithm 1 RFT for AutoVLA with GRPO Input: Supervised fine-tuned policy πSFT , Action Codebook A, Group size G, Training step K, Dataset D, Driving reward function rDriving , Reasoning reward function rCoT , Balance weigh λr , KL regularization weight β Output: Reinforcement fine-tuned policy πRFT 1: Initialize reference policy πref ← πSFT and current policy πθ ← πSFT 2: for training step 1 to K do 3: Sample scenario U from D 4: for sample i from 1 to G do 5: Sample input query q, final output oi , and per-token probability πθ (oi |q) 6: πθold (oi |q) ← πθ (oi |q) 7: Calculate per-token probability πref (oi |q) of πref under oi 8: Decode trajectory τ ← A(oi ) 9: Calculate reward ri ← rDriving (τ, U ) − λr rCoT (oi ) 10: end for 11: Group average reward r̄, σr ← mean(r1 , . . . , rG ), std(r1 , . . . , rG ) 12: Group relative advantage Ai ← (ri − r̄)/(σr )  PG  πθ (oi |q) 13: LRFT ← − i − πθ (oi |q) Ai + βDKL (πθ (oi |q)∥πref (oi |q)) old 14: Optimize πθ according to LRFT 15: end for 16: return Converged policy πRFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S395"></a>
**Source:** p.23 S395

**Original:** D

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S396"></a>
**Source:** p.23 S396

**Original:** Details of Reinforcement Fine-tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S397"></a>
**Source:** p.23 S397

**Original:** Group Relative Policy Optimization (GRPO) employs group-based sampling to compute the advantage function, replacing conventional state-value estimators or critic models. This design accelerates training while aligning naturally with the inherent multimodality of planning, which requires evaluating and selecting from a set of candidate trajectories. The overall reinforcement fine-tuning (RFT) procedure is illustrated in Algorithm 1. D.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S398"></a>
**Source:** p.23 S398

**Original:** Kullback-Leibler (KL) Divergence

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S399"></a>
**Source:** p.23 S399

**Original:** The KL divergence term DKL is incorporated in Eq. (3) to regularize the current policy with respect to the reference policy:   πref (oi |q) πref (oi |q) DKL (πθ ∥πref ) = − log − 1, (S1) πθ (oi |q) πθ (oi |q) where θ denotes the parameters of the current policy πθ , q is the scenario input query, oi is the output of ith sample in the group, and πref is the reference policy from the SFT stage. This regularization term penalizes large deviations from the reference policy, ensuring that policy updates remain within a stable area. As a result, the model retains useful knowledge acquired during SFT while improving driving behavior through reinforcement learning guided by validated reward functions. D.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S400"></a>
**Source:** p.23 S400

**Original:** Reward Function

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S401"></a>
**Source:** p.23 S401

**Original:** The reward function provides the primary RFT training signal, guiding the optimization of policy updates. To further enhance comprehensive driving performance beyond imitating expert driving, we adopt a hybrid reward design that integrates the primary driving reward rDriving and a CoT penalty rCoT to discourage lengthy reasoning. For the NAVSIM Benchmark, we employ Predictive Driver Model Score (PDMS) [51] as the primary reward. For the Waymo end-to-end dataset, due to the limited annotation of RFS, we employ the (normalized) Average Displacement Error (ADE) as the driving reward. The final reward function, balanced by a weighting coefficient λr , is defined as: r = rDriving − λr rCoT . 23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S402"></a>
**Source:** p.23 S402

**Original:** (S2)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-24"></a>
### Page 24

<a id="S403"></a>
**Source:** p.24 S403

**Original:** In the nuPlan dataset, we adopt the PDMS score as the driving reward signal rDriving , which serves as a comprehensive measure of driving quality. It is defined as follows:   5TTC + 2C + 5EP rDriving = PDMS = NC × DAC × , (S3) 12 where the components include No at-fault Collision (NC), Drivable Area Compliance (DAC), Ego Progress (EP), Comfort (C), and Time-to-Collision (TTC). Detailed descriptions of each component can be found in [51]. Each sub-score is expressed as a percentage, and their weighted combination yields a normalized score within the range [0, 1], reflecting aspects of safety, comfort, and progress. For any scenario in which the planner fails (due to output errors), we assign a score of 0. For the Waymo dataset, we define the driving reward rDriving based on the ADE metric: rDriving

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S404"></a>
**Source:** p.24 S404

**Original:** T δ − ADE 1X = , ADE = ∥ŷt − yt ∥2 , κ T t=1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S405"></a>
**Source:** p.24 S405

**Original:** (S4)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S406"></a>
**Source:** p.24 S406

**Original:** where δ denotes the maximum displacement error, and κ is a scaling factor to normalize the reward. The planning trajectory ŷ is evaluated against the ground truth trajectory y, and ADE is computed as the average L2 distances over T time steps. To penalize excessively long reasoning chains, we introduce a CoT penalty term rCoT , defined via a sigmoid function that normalizes the length of reasoning: rCoT =

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S407"></a>
**Source:** p.24 S407

**Original:** 1 1+

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S408"></a>
**Source:** p.24 S408

**Original:** e−(L−Ltol )γ

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S409"></a>
**Source:** p.24 S409

**Original:** ,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S410"></a>
**Source:** p.24 S410

**Original:** (S5)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S411"></a>
**Source:** p.24 S411

**Original:** where L denotes the length of the CoT reasoning, Ltol is the tolerance threshold, and γ is a scaling coefficient that controls the steepness of the penalty curve. D.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S412"></a>
**Source:** p.24 S412

**Original:** Implementation Details

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S413"></a>
**Source:** p.24 S413

**Original:** We use the navtrain split of the nuPlan dataset for RFT for the NAVSIM benchmark and the validation split of the Waymo end-to-end driving dataset for the Waymo benchmark. The vision encoder of pretrained AutoVLA is frozen, and the model is fine-tuned using Low-Rank Adaptation (LoRA) to reduce training costs and memory consumption. Specifically, both the LoRA rank and alpha are set to 8, with a dropout rate of 0.1. The pretrained SFT model is used as the reference policy during optimization. The hyperparameters γ, Ltol , and learning rate are set to 2 × 10−3 , 400, and 3 × 10−5 , respectively. To ensure that the driving reward signal is dominant, the regularization weight is set to a relatively small value, λr = 0.3. We also set δ = 2, κ = 10 in the RFT of the Waymo dataset. Moreover, we configure the generation parameters with a sampling temperature of 1.0, top-p of 1.0, and top-k of 0.0 to encourage diverse and exploratory generation during GRPO sampling, which effectively covers a wider range of possible actions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S414"></a>
**Source:** p.24 S414

**Original:** E E.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S415"></a>
**Source:** p.24 S415

**Original:** Experiment Details Data Preprocessing

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S416"></a>
**Source:** p.24 S416

**Original:** To enable mixed training across multiple driving datasets, we develop a unified data preprocessing pipeline that standardizes the format across all datasets. For each sample, we extract and standardize: 1) Ground truth trajectory coordinates and headings in the ego vehicle’s coordinate frame at 2 Hz, 2) Image paths for multi-view camera image sequences consisting of 4 consecutive frames captured at 2 Hz (providing 2 seconds of history), 3) CoT reasoning annotations, 4) Vehicle states including its current velocity and acceleration, 5) High-level driving instructions. The preprocessing pipeline handles dataset-specific differences in data format, sampling rates, and coordinate systems to create a consistent format. The size and distribution of the final formatted dataset are shown in Table S1. nuPlan (NAVSIM). We randomly sample 45.6k scenarios from the nuPlan trainval split and generate reasoning data using our proposed automated annotation pipeline. The resulting reasoning samples, together with the remaining training data with only trajectory annotation, constitute our full training set of nuPlan. Following the NAVSIM benchmark, the navtest split is used as the test set. 24

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-25"></a>
### Page 25

<a id="S417"></a>
**Source:** p.25 S417

**Original:** Table S1: Training and Testing Data Size for Different Datasets Dataset nuPlan (NAVSIM) [51] nuScenes [53] Waymo [52] CARLA [96]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S418"></a>
**Source:** p.25 S418

**Original:** Train Samples

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S419"></a>
**Source:** p.25 S419

**Original:** Reasoning Samples

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S420"></a>
**Source:** p.25 S420

**Original:** Test Samples

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S421"></a>
**Source:** p.25 S421

**Original:** 166.3k 19.0k 23.8k 274.5k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S422"></a>
**Source:** p.25 S422

**Original:** 45.6k 2.9k 7.2k 53.2k

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S423"></a>
**Source:** p.25 S423

**Original:** 12.1k 5.6k 1.5k –

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S424"></a>
**Source:** p.25 S424

**Original:** nuScenes. We preprocess all samples from the training set. For samples included in the DriveLM dataset, we reformat the question-answer (QA) pairs to generate structured reasoning annotations following our four-step reasoning format. Samples not covered by DriveLM are also used for training but only with trajectory supervision. The validation set is used for testing. Waymo. The Waymo end-to-end driving dataset provides 2037 training and 479 validation segments, each containing a 20-second video with driving logs for the entire duration. We sample reasoning data using a 4-second sliding window and extract trajectory-only data using a 2-second sliding window offset by 1 second from the reasoning samples. Due to noise in the position data, the estimated vehicle heading can exhibit abrupt fluctuations when the vehicle is stationary. To address this issue, we apply a motion threshold to detect stationary periods and smooth the heading accordingly. The test set comprises 1505 samples. CARLA. The CARLA-Garage dataset is used to train the model for closed-loop evaluation. Since only front camera images are available, we use single-view inputs (with four consecutive frames) for CARLA training and testing. We sample data using a sliding window with an offset of 0.5 seconds, and downsample the trajectories from 4 Hz to 2 Hz. For reasoning annotations, we leverage the DriveLM-CARLA dataset, which provides QA pairs similar to DriveLM-nuScenes, and we reformat the QA pairs to generate samples with reasoning annotations. E.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S425"></a>
**Source:** p.25 S425

**Original:** Evaluation Metrics

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S426"></a>
**Source:** p.25 S426

**Original:** nuPlan (NAVSIM). PDMS is the official benchmark metric in NAVSIM on the nuPlan dataset, with its formulation provided in Eq. (S3). nuScenes. Following previous works, we adopt the L2 Distance to measure the average displacement error between predicted and ground-truth trajectories, and use Collision Rate to assess the frequency of predicted trajectories overlapping with surrounding objects. We follow the UniAD protocol, reporting both metrics at 1, 2, and 3 seconds in the future, instead of averaging over the horizons. Waymo. Following the Waymo end-to-end driving benchmark, Rater Feedback Score (RFS) is used to evaluate the driving performance. The Waymo dataset provides three human-annotated trajectories, each associated with a scalar quality score in [0, 10]. A planning trajectory is matched to its closest reference trajectory, and a trust region is defined around it using lateral and longitudinal thresholds at fixed timesteps (3 s and 5 s). These thresholds are scaled by a piecewise linear function of the rater’s trajectory’s initial speed. Predictions within the trust region inherit the matched rater’s score, and those outside are penalized exponentially based on normalized deviation.tr CARLA. We evaluate driving performance in closed-loop testing using four key metrics: Driving Score, Success Rate, Efficiency, and Comfortness following the Bench2Drive benchmark [51]. Driving Score reflects the overall route completion penalized by infraction severity. Success Rate measures the percentage of routes completed without major infractions within the time limit. Efficiency quantifies how well the ego vehicle maintains a reasonable speed relative to surrounding traffic, computed as the average speed ratio over multiple checkpoints. Comfortness assesses the smoothness of the trajectory based on physical signals such as acceleration, jerk, and yaw rate, using expert-derived thresholds. E.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S427"></a>
**Source:** p.25 S427

**Original:** Model Training

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S428"></a>
**Source:** p.25 S428

**Original:** Our primary base model is trained on the mixed training set of the nuPlan and nuScenes datasets. The ego state contains the vehicle’s current velocity and acceleration. For the test on the Waymo end-to-end driving dataset, we further fine-tune this base model using the Waymo end-to-end driving 25

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-26"></a>
### Page 26

<a id="S429"></a>
**Source:** p.26 S429

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S430"></a>
**Source:** p.26 S430

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S431"></a>
**Source:** p.26 S431

**Original:** Fast Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S432"></a>
**Source:** p.26 S432

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S433"></a>
**Source:** p.26 S433

**Original:** Fast Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S434"></a>
**Source:** p.26 S434

**Original:** Fast Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S435"></a>
**Source:** p.26 S435

**Original:** &lt;think&gt; This is a straightforward scenario, and a direct decision can be made. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S436"></a>
**Source:** p.26 S436

**Original:** &lt;think&gt; This is a straightforward scenario, and a direct decision can be made. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S437"></a>
**Source:** p.26 S437

**Original:** &lt;think&gt; This is a straightforward scenario, and a direct decision can be made. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S438"></a>
**Source:** p.26 S438

**Original:** &lt;answer&gt; The final output action is: &lt;action_1122&gt;&lt;action_1456&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S439"></a>
**Source:** p.26 S439

**Original:** &lt;answer&gt; The final output action is: &lt;action_72&gt;&lt;action_147&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S440"></a>
**Source:** p.26 S440

**Original:** &lt;answer&gt; The final output action is: &lt;action_452&gt;&lt;action_459&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S441"></a>
**Source:** p.26 S441

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S442"></a>
**Source:** p.26 S442

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S443"></a>
**Source:** p.26 S443

**Original:** Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S444"></a>
**Source:** p.26 S444

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S445"></a>
**Source:** p.26 S445

**Original:** Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S446"></a>
**Source:** p.26 S446

**Original:** Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S447"></a>
**Source:** p.26 S447

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S448"></a>
**Source:** p.26 S448

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S449"></a>
**Source:** p.26 S449

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S450"></a>
**Source:** p.26 S450

**Original:** Scene Description: There are many trucks and one trailer to the front left of the ego car. There are two trucks and two trailers to the front right of the ego car.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S451"></a>
**Source:** p.26 S451

**Original:** Scene Description: There is a white SUV in front of the ego car. There is a green traffic light in front of the ego car. There is a black car to the front left of the ego car...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S452"></a>
**Source:** p.26 S452

**Original:** Scene Description: There are many cars and one pedestrian to the front left of the ego car. There is one car in front of the ego car. There are two cars to the front right of the ego car....

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S453"></a>
**Source:** p.26 S453

**Original:** Critical Object Description: There is a white SUV to the front left of the ego vehicle and a green light to the front of the ego vehicle …The moving status of the White SUV is going straight…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S454"></a>
**Source:** p.26 S454

**Original:** Critical Object Description: There is a black SUV to the front of the ego vehicle, …, and a red light to front of the ego vehicle. The moving status of the Black SUV is stationary…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S455"></a>
**Source:** p.26 S455

**Original:** Reasoning on Intent: Firstly, notice the red and white truck. The red and white truck is obstructing the lane ahead and remains stationary. The ego vehicle must yield and wait for the obstacle to clear…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S456"></a>
**Source:** p.26 S456

**Original:** Reasoning on Intent: Firstly, notice the White SUV. The object is moving, so the ego vehicle should continue... Secondly, notice the Green light. The object is a traffic sign, so the ego vehicle should move ahead …

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S457"></a>
**Source:** p.26 S457

**Original:** Reasoning on Intent: Firstly, notice the Red light. It is a traffic sign, so the ego vehicle should remain stationary. Secondly, notice Black SUV…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S458"></a>
**Source:** p.26 S458

**Original:** Best Driving Action: STOP. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S459"></a>
**Source:** p.26 S459

**Original:** Best Driving Action: Move forward with acceleration. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S460"></a>
**Source:** p.26 S460

**Original:** &lt;answer&gt; The final output action is: &lt;action_617&gt;&lt;action_404&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S461"></a>
**Source:** p.26 S461

**Original:** &lt;answer&gt; The final output action is: &lt;action_626&gt;&lt;action_208&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S462"></a>
**Source:** p.26 S462

**Original:** Critical Object Description: There is a white truck to the front left of the ego vehicle, and a red and white truck to the front of the ego vehicle… The moving status of the red and white truck is stationary. The moving status of the white truck is stationary…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S463"></a>
**Source:** p.26 S463

**Original:** Best Driving Action: STOP. &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_1882&gt;&lt;action_1067&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S464"></a>
**Source:** p.26 S464

**Original:** Figure S6: Planning and reasoning results of AutoVLA on the nuScenes dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S465"></a>
**Source:** p.26 S465

**Original:** Table S2: Testing Results of AutoVLA on the nuScenes Planning Benchmark ST-P3 metrics Method

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S466"></a>
**Source:** p.26 S466

**Original:** L2 (m) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S467"></a>
**Source:** p.26 S467

**Original:** UniAD metrics

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S468"></a>
**Source:** p.26 S468

**Original:** Collision (%) ↓ Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S469"></a>
**Source:** p.26 S469

**Original:** L2 (m) ↓ 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S470"></a>
**Source:** p.26 S470

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S471"></a>
**Source:** p.26 S471

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S472"></a>
**Source:** p.26 S472

**Original:** Collision (%) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S473"></a>
**Source:** p.26 S473

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S474"></a>
**Source:** p.26 S474

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S475"></a>
**Source:** p.26 S475

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S476"></a>
**Source:** p.26 S476

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S477"></a>
**Source:** p.26 S477

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S478"></a>
**Source:** p.26 S478

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S479"></a>
**Source:** p.26 S479

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S480"></a>
**Source:** p.26 S480

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S481"></a>
**Source:** p.26 S481

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S482"></a>
**Source:** p.26 S482

**Original:** ST-P3 [14] VAD [66] UniAD [65] EMMA [37] OpenEMMA [44] OpenDriveVLA-3B [34]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S483"></a>
**Source:** p.26 S483

**Original:** 1.33 0.17 0.44 0.14 1.45 0.14

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S484"></a>
**Source:** p.26 S484

**Original:** 2.11 0.34 0.67 0.29 3.21 0.30

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S485"></a>
**Source:** p.26 S485

**Original:** 2.90 0.60 0.96 0.54 3.76 0.55

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S486"></a>
**Source:** p.26 S486

**Original:** 2.11 0.37 0.69 0.32 2.81 0.33

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S487"></a>
**Source:** p.26 S487

**Original:** 0.23 0.07 0.04 0.02

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S488"></a>
**Source:** p.26 S488

**Original:** 0.62 0.10 0.08 0.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S489"></a>
**Source:** p.26 S489

**Original:** 1.27 0.24 0.23 0.22

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S490"></a>
**Source:** p.26 S490

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S491"></a>
**Source:** p.26 S491

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S492"></a>
**Source:** p.26 S492

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S493"></a>
**Source:** p.26 S493

**Original:** AutoVLA (action only) AutoVLA (w/ CoT)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S494"></a>
**Source:** p.26 S494

**Original:** 0.22 0.39 0.61 0.41 0.10 0.17 0.28 0.18 0.29 0.67 1.17 0.71 0.15 0.34 0.56 0.35 0.21 0.38 0.60 0.40 0.13 0.18 0.28 0.20 0.28 0.66 1.16 0.70 0.14 0.25 0.53 0.31

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S495"></a>
**Source:** p.26 S495

**Original:** 0.71 0.14 0.12 0.48 0.96 1.65 1.03 0.05 0.17 0.71 0.31 0.10 0.19 0.58 1.24 0.67 0.02 0.18 0.70 0.30

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S496"></a>
**Source:** p.26 S496

**Original:** dataset. For the model trained on Waymo, the ego vehicle’s state encompasses current acceleration and a 4-second history of vehicle positions and velocities. For closed-loop simulation testing, we train a separate model using data preprocessed from the CARLA Garage dataset and DriveLM-CARLA annotations. This model is trained with single-view inputs instead of the multi-view setup used in the primary model, and we use a large resolution for the input images (with 28 × 28 × 384 pixels).

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S497"></a>
**Source:** p.26 S497

**Original:** E.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S498"></a>
**Source:** p.26 S498

**Original:** Inference

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S499"></a>
**Source:** p.26 S499

**Original:** We employ a stochastic generation strategy using top-p and top-k sampling to generate reasoning and planning outputs. Higher sampling diversity (e.g., temperature=1.0, top-p=0.5, top-k=20) supports slow thinking modes, enabling the model to produce deeper and more elaborate reasoning chains. In contrast, more deterministic settings (e.g., temperature=0.1, top-p=0.01, top-k=1) produce fast thinking, yielding consistent and direct responses. 26

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-27"></a>
### Page 27

<a id="S500"></a>
**Source:** p.27 S500

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S501"></a>
**Source:** p.27 S501

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S502"></a>
**Source:** p.27 S502

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S503"></a>
**Source:** p.27 S503

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S504"></a>
**Source:** p.27 S504

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S505"></a>
**Source:** p.27 S505

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S506"></a>
**Source:** p.27 S506

**Original:** Ground Ground Truth Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S507"></a>
**Source:** p.27 S507

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S508"></a>
**Source:** p.27 S508

**Original:** Planning Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S509"></a>
**Source:** p.27 S509

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S510"></a>
**Source:** p.27 S510

**Original:** Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S511"></a>
**Source:** p.27 S511

**Original:** Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S512"></a>
**Source:** p.27 S512

**Original:** Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S513"></a>
**Source:** p.27 S513

**Original:** Fast Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S514"></a>
**Source:** p.27 S514

**Original:** &lt;think&gt; This is a straightforward scenario, and a direct decision can be made. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S515"></a>
**Source:** p.27 S515

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S516"></a>
**Source:** p.27 S516

**Original:** Fast Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S517"></a>
**Source:** p.27 S517

**Original:** &lt;answer&gt;The final output action is: &lt;action_1601&gt;&lt;action_485&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S518"></a>
**Source:** p.27 S518

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S519"></a>
**Source:** p.27 S519

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S520"></a>
**Source:** p.27 S520

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S521"></a>
**Source:** p.27 S521

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S522"></a>
**Source:** p.27 S522

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S523"></a>
**Source:** p.27 S523

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S524"></a>
**Source:** p.27 S524

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S525"></a>
**Source:** p.27 S525

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S526"></a>
**Source:** p.27 S526

**Original:** Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S527"></a>
**Source:** p.27 S527

**Original:** Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S528"></a>
**Source:** p.27 S528

**Original:** &lt;think&gt; This is a straightforward scenario, and a direct decision can be made. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S529"></a>
**Source:** p.27 S529

**Original:** &lt;answer&gt;The final output action is: &lt;action_1726&gt;&lt;action_191&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S530"></a>
**Source:** p.27 S530

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S531"></a>
**Source:** p.27 S531

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S532"></a>
**Source:** p.27 S532

**Original:** Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S533"></a>
**Source:** p.27 S533

**Original:** Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S534"></a>
**Source:** p.27 S534

**Original:** Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S535"></a>
**Source:** p.27 S535

**Original:** Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S536"></a>
**Source:** p.27 S536

**Original:** Slow Thinking

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S537"></a>
**Source:** p.27 S537

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S538"></a>
**Source:** p.27 S538

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S539"></a>
**Source:** p.27 S539

**Original:** Scene Description: The scene is a daytime urban intersection with clearly marked lanes, pedestrian sidewalks, and visible green traffic lights. A van is in front of the vehicle, and two lanes ahead with yellow box markings. Two pedestrians are walking on the sidewalk in the left...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S540"></a>
**Source:** p.27 S540

**Original:** Scene Description: The ego vehicle is at an intersection in an urban environment. The front camera shows a stop sign, a red traffic light, and a “No Left Turn” sign on the left side of the road… The front-right camera shows a curved road into a parking lot with a stop sign and a bump warning, while the back camera shows traffic queued behind, suggesting the ego vehicle recently began moving forward…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S541"></a>
**Source:** p.27 S541

**Original:** Critical Object Description: 1. Pedestrians (Left View): - Status: Walking on the sidewalk. - Prediction: Will likely continue walking without crossing the road. - Importance: Must ensure they do not suddenly enter the crosswalk during the left turn. 2. White van (Front View): - Status: Appears to be moving slowly or preparing to proceed straight. - Prediction: May go straight or turn right. - Importance: Ego vehicle must monitor for potential conflict if the van turns unexpectedly. 3. Green traffic light (front view) - Status: Green in the ego lane’s direction. - Prediction: Will allow safe execution of left turn. - Importance: Confirms that the ego vehicle has the right-of-way to begin the turn. Reasoning on Intent: - Firstly, the ego vehicle has been stopped in the past 4 seconds, indicating readiness to execute a maneuver. - Secondly, the green traffic light ahead authorizes vehicles in the ego’s direction to proceed, including for left turns. - Thirdly, there are no immediate vehicles blocking the left-turn path, and the intersection is mostly clear. - Finally, while there are pedestrians on the sidewalk, they show no intent to cross, and no opposing vehicles are visibly entering the intersection…

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S542"></a>
**Source:** p.27 S542

**Original:** Critical Object Description: 1. Traffic light (Front view): Located at the upper-left of the intersection, currently red. It is crucial as it controls crossing traffic and the ego vehicle’s entry into the intersection. 2. Black car ahead (Front view): Located directly ahead, it is proceeding forward into the intersection, helping validate that vehicles are allowed to go straight. 3. “No Left Turn” sign (Front view): Located below the stop sign, this prohibits left turns from the ego vehicle’s current lane. Reasoning on Intent: - The “No Left Turn” sign and the stop sign indicate that vehicles must stop and cannot turn left. - The red traffic light is positioned toward the left, suggesting it might only control leftturning traffic, not forward movement. - The ego vehicle was stopped in the past 4 seconds and is now moving slowly with a low acceleration, indicating it's starting from a stop sign. Best Driving Action: Move forward with acceleration. Given the road signs, vehicle behavior, and instruction to go forward, ego vehicle has already stop on the stop sign, and can move forward with acceleration to follow the vehicle ahead, aligning with the ego vehicle’s instruction. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S543"></a>
**Source:** p.27 S543

**Original:** Best Driving Action: Turn left with acceleration. This ensures a smooth maneuver respecting the traffic light signal, allowing the ego vehicle to safely and efficiently execute the left turn while monitoring surroundings. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S544"></a>
**Source:** p.27 S544

**Original:** &lt;answer&gt; The final output action is: &lt;action_28&gt;&lt;action_1&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S545"></a>
**Source:** p.27 S545

**Original:** &lt;answer&gt; The final output action is: &lt;action_842&gt;&lt;action_1470&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S546"></a>
**Source:** p.27 S546

**Original:** Figure S7: Planning and reasoning results of AutoVLA on the nuPlan dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S547"></a>
**Source:** p.27 S547

**Original:** F F.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S548"></a>
**Source:** p.27 S548

**Original:** Additional Results nuScenes Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S549"></a>
**Source:** p.27 S549

**Original:** We evaluate AutoVLA on the nuScenes dataset following both ST-P3 [14] and UniAD [65] protocols, in comparison with state-of-the-art end-to-end models. As shown in Table S2, our model demonstrated competitive performance in the nuScenes planning benchmark. Fig. S6 shows AutoVLA’s planning outputs. The model generates safe trajectories that closely align with ground-truth motions, accompanied by coherent and context-aware reasoning outputs. However, it can be observed that many nuScenes scenarios are relatively straightforward, often not requiring complex reasoning. This may explain the lack of performance gain in quantitative metrics when reasoning is introduced. F.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S550"></a>
**Source:** p.27 S550

**Original:** nuPlan Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S551"></a>
**Source:** p.27 S551

**Original:** We present additional visualization results of our model on the nuPlan dataset in Fig. S7. In relatively simple scenarios such as curved roads and intersections, our model generates high-quality trajectories via fast thinking. In more complex scenes with numerous traffic regulations, it leverages slow thinking 27

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-28"></a>
### Page 28

<a id="S552"></a>
**Source:** p.28 S552

**Original:** Front

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S553"></a>
**Source:** p.28 S553

**Original:** Front Right

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S554"></a>
**Source:** p.28 S554

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S555"></a>
**Source:** p.28 S555

**Original:** Ground Truth

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S556"></a>
**Source:** p.28 S556

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S557"></a>
**Source:** p.28 S557

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S558"></a>
**Source:** p.28 S558

**Original:** Scene Description: The scene appears to be an urban area with a mix of pedestrian pathways and roads. The front view shows a pathway lined with bollards and a building entrance... The weather seems clear, and ...

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S559"></a>
**Source:** p.28 S559

**Original:** Back

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S560"></a>
**Source:** p.28 S560

**Original:** Front Left

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S561"></a>
**Source:** p.28 S561

**Original:** Slow Thinking After RFT &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S562"></a>
**Source:** p.28 S562

**Original:** Critical Object Description: 1. A Car (Right View): Parked or slow driving along the side of the road in the right view. &lt;think&gt; This is a complex scenario requiring additional reasoning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S563"></a>
**Source:** p.28 S563

**Original:** Slow Thinking Before RFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S564"></a>
**Source:** p.28 S564

**Original:** Scene Description: The scene appears to be an urban area with a mix of pedestrian pathways and roads. The front view shows a pathway leading towards a building entrance... The weather seems clear, and ... Critical Object Description: 1. Vehicles on the right side (Right View): Parked along the side of the road in the right view. 2. Building entrance and pathway (Front View): Directly in front of the vehicle. The pathway leads towards a building entrance. The entrance has glass doors and pillars ... Reasoning on Intent: The driving command instructs the vehicle to turn right. The front view shows a clear path leading towards the building entrance. The right view shows a road with vehicles, which needs to be navigated carefully. The left view shows a sidewalk with trees and a building, which is not directly relevant to the current maneuver. The vehicle is moving at a low speed with a slight deceleration, suggesting it is preparing to make the turn. Best Driving Action: Turn right with a deceleration. Given the need to navigate around the vehicles on the right and … &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_2022&gt;&lt;action_2022&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S565"></a>
**Source:** p.28 S565

**Original:** 2. Building entrance (Front View): Located directly in front of the vehicle, near the bollards. The entrance is static and poses no immediate threat. The entrance will remain static unless someone exits or enters the building. While not immediately critical, being aware of the surroundings helps avoid collisions with fixed objects like bollards. Reasoning on Intent: The ego vehicle is currently moving slowly with a slight deceleration, as indicated by the velocity and acceleration values. The driving command is to turn right, suggesting the vehicle intends to make a right turn soon. The absence of pedestrians in the immediate vicinity allows for a smooth maneuver. However, the ego vehicle should navigate carefully to ensure no pedestrians are about to cross. Best Driving Action: Turn right with a deceleration. Given the current situation, the vehicle should proceed with a right turn while maintaining a controlled deceleration to ensure safety … &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_2022&gt;&lt;action_2022&gt;…&lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S566"></a>
**Source:** p.28 S566

**Original:** Figure S8: Qualitative comparison of planning and reasoning performance in complex scenarios, before and after RFT. Results indicate that RFT maintains reasoning capabilities in complex scenarios while enhancing planning performance.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S567"></a>
**Source:** p.28 S567

**Original:** Table S3: Waymo Vision-based End-to-End Driving Challenge Leaderboard Method Name

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S568"></a>
**Source:** p.28 S568

**Original:** RFS (Overall) ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S569"></a>
**Source:** p.28 S569

**Original:** ADE at 5s (Overall) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S570"></a>
**Source:** p.28 S570

**Original:** ADE at 3s (Overall)↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S571"></a>
**Source:** p.28 S571

**Original:** RFS (Spotlight)↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S572"></a>
**Source:** p.28 S572

**Original:** 7.9860 7.7367 7.6925 7.5919 7.5566 7.5432 7.5281 7.4988 7.4957 7.4288 7.3433 7.2922 7.2787 7.0641 6.5169 6.4719 5.1575

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S573"></a>
**Source:** p.28 S573

**Original:** 2.7419 3.0715 2.9864 2.9768 2.9580 2.8135 3.0182 2.7024 2.9556 3.2165 3.3485 3.2915 3.4573 3.5779 3.7395 3.9148 12.4755

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S574"></a>
**Source:** p.28 S574

**Original:** 1.2055 1.3269 1.3083 1.3605 1.3507 1.2082 1.3200 1.1968 1.3038 1.3140 1.4232 1.4385 1.5346 1.7242 1.7052 1.9446 6.6842

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S575"></a>
**Source:** p.28 S575

**Original:** 6.8929 6.7269 6.6544 6.5688 6.9436 6.6791 6.5953 6.4543 6.4101 6.2510 6.4023 6.3083 6.2428 5.8562 5.7103 5.7977 4.7131

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S576"></a>
**Source:** p.28 S576

**Original:** Poutine HMVLM UniPlan DiffusionLTF AutoVLA Swin-Trajectory waymo ViT-Adapter-GRU DriveTraj open-llama MTR-VP WayPredict-XL DriveTraj WayPredict LightEMMA FrozenResNet50 OpenEMMA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S577"></a>
**Source:** p.28 S577

**Original:** to produce better and regulation-compliant planning results with CoT reasoning. As illustrated in Fig. S8, our AutoVLA model preserves reasoning capabilities in complex scenarios despite removing redundant reasoning after RFT. Qualitative comparisons demonstrate that RFT enhances planning performance in complex scenarios. F.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S578"></a>
**Source:** p.28 S578

**Original:** Waymo Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S579"></a>
**Source:** p.28 S579

**Original:** To overcome the limited size of the Waymo end-to-end driving dataset, we augment the training data with samples from the nuPlan and nuScenes datasets. For convenience, we refer to this combined dataset as nuX. We use this nuX data to pretrain the model before fine-tuning it on the Waymo dataset. To further enhance planning performance, we apply RFT on the AutoVLA model after SFT. Given the limited number of RFS-labeled samples (only 480 in the validation set), we adopt the average displacement error (ADE) as the primary reward signal. 28

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-29"></a>
### Page 29

<a id="S580"></a>
**Source:** p.29 S580

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S581"></a>
**Source:** p.29 S581

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning. Slow Thinking Scene Description: The scene is at night, and the road appears well-lit by streetlights. The ego vehicle is traveling on a multi-lane road with visible lane markings. In the front view, several vehicles are ahead, maintaining a moderate distance. A cyclist is riding along the edge of the road. Traffic lights are green, allowing vehicles to proceed… Critical Object Description: 1. Vehicles Ahead: Located directly in front of the ego vehicle, these vehicles appear to be moving steadily. They are maintaining a consistent distance from each other, suggesting normal traffic flow. - What they are doing: Moving forward. - What they will do: Likely continue moving forward as the traffic light is green. - Why important: The ego vehicle must maintain a safe following distance to avoid collisions. 2. Cyclist on the Road: Positioned on the right side near the edge of the road, the cyclist is riding parallel to the ego vehicle. - What they are doing: Riding along the edge of the road. - What they will do: Continue riding along the edge. - Why important: The ego vehicle must maintain a safe lateral distance to avoid any potential collision with the cyclist... Reasoning on Intent: 1. Traffic Lights: The green traffic lights indicate that the ego vehicle can proceed without stopping. 2. Vehicles Ahead: The vehicles ahead are moving steadily, suggesting that the ego vehicle can maintain its current speed and follow them. 3. Cyclist on the Road: The cyclist is riding along the edge and poses no immediate threat to the ego vehicle's path. Given the green traffic light, the steady movement of vehicles ahead, and the absence of any immediate obstacles or hazards, the ego vehicle should continue moving forward at a constant speed. … Best Driving Action: Move forward with a constant speed. &lt;/think&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S582"></a>
**Source:** p.29 S582

**Original:** (a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S583"></a>
**Source:** p.29 S583

**Original:** &lt;answer&gt; The final output action is: &lt;action_1386&gt;&lt;action_1333&gt;… &lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S584"></a>
**Source:** p.29 S584

**Original:** Ground Truth Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S585"></a>
**Source:** p.29 S585

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning. Slow Thinking Scene Description: The scene is at night, and the road appears to be undergoing construction or maintenance work. There are several vehicles stopped ahead, likely due to the traffic control setup. A worker in high-visibility clothing is directing traffic, indicating a lane closure. The front left and front right cameras show clear paths to the left and right sides of the road, respectively. Critical Object Description: 1. Worker in High-Visibility Clothing: Located in the center-right of the front view, the worker is actively directing traffic. This indicates that the left lane is closed or restricted, and vehicles must stop or change lane. 2. Vehicles Ahead: Several vehicles are stopped ahead, blocking the path. They appear stationary, likely due to the traffic control setup. The vehicles are positioned in such a way that they prevent direct passage forward. Reasoning on Intent: 1. Traffic Control Worker: The worker in the high-visibility clothing clearly indicates that the vehicle should stop. 2. Stationary Vehicles Ahead: The presence of stopped vehicles ahead reinforces the need to stop and wait for the appropriate signal or clearance before proceeding. The ego vehicle has been stationary for the past 2 seconds, indicating compliance with the traffic control setup. Best Driving Action: Stop. The ego vehicle should remain stationary, adhering to the traffic control setup and waiting for the appropriate signal or clearance to proceed. This ensures safety for both the workers and the vehicles ahead, as well as maintaining smooth traffic flow. &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_0&gt;&lt;action_0&gt;… &lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S586"></a>
**Source:** p.29 S586

**Original:** (b) From the test set, no ground truth is provided Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S587"></a>
**Source:** p.29 S587

**Original:** &lt;think&gt; This is a complex scenario requiring additional reasoning. Slow Thinking Scene Description: The scene is a residential area during the daytime with clear weather. The road is a two-lane street with no visible lane markings. There are houses, trees, and bushes along both sides of the road. A pedestrian is walking on the sidewalk to the right of the ego vehicle. A dog is running ahead on the road. Several parked cars are visible on the left side of the road… Critical Object Description: 1. Pedestrian: The pedestrian is walking along the sidewalk and appears to have no intention of crossing the road. - What they are doing: Walking on the sidewalk. - What they will do: Continue walking on the sidewalk without crossing the road. - Why they are important: The pedestrian is near the ego vehicle’s path, so it is crucial to maintain a safe distance and avoid any sudden movements that could startle them. 2. Dog: Located ahead of the pedestrian on the road. The dog is running freely on the road. - What they are doing: Running on the road. - What they will do: Continue running on the road. - Why they are important: The dog is in the path of the ego vehicle, and maintaining a safe distance is essential to avoid any potential collision. Reasoning on Intent: 1. The pedestrian has no intention of crossing the road. The ego vehicle should maintain a safe distance from the pedestrian while moving forward. 2. The dog is running ahead of the pedestrian on the road. The ego vehicle should slow down to maintain a safe distance from the dog and avoid any sudden movements that could cause it to swerve or collide with the dog The ego vehicle has been moving forward with a constant speed in the past 2 seconds, and the current driving command is to go straight. However, due to the presence of the pedestrian and the dog, the ego vehicle needs to adjust its speed to ensure safety.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S588"></a>
**Source:** p.29 S588

**Original:** (c) From the test set, no ground truth is provided Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S589"></a>
**Source:** p.29 S589

**Original:** Best Driving Action: Move forward with a deceleration. This action allows the ego vehicle to maintain a safe distance from the pedestrian and the dog while continuing to move forward as instructed by the driving command. Decelerating ensures that the ego vehicle can react appropriately to any unexpected changes in the environment, such as the pedestrian suddenly crossing the road or the dog swerving into the other lane. &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_87&gt;&lt;action_125&gt;… &lt;/answer&gt; &lt;think&gt; This is a complex scenario requiring additional reasoning. Slow Thinking Scene Description: The scene is a residential street during the daytime with clear visibility. The road is marked with orange traffic cones, indicating a construction zone ahead. Several vehicles are visible, including a white truck directly in front of the ego vehicle and a few parked cars along both sides of the road. Critical Object Description: 1. White Truck: Located directly in front of the ego vehicle, it appears to be moving slowly or stopping. This vehicle is crucial as it dictates the flow of traffic in the construction zone. - What it is doing: Moving slowly or stopping due to the construction zone. - Why it is important: The ego vehicle must maintain a safe distance and adjust its speed accordingly. 2. Traffic Cones: Positioned along the center of the road, these cones indicate a narrowed lane due to construction. - What they are doing: Marking the path for vehicles in the construction zone. - Why they are important: The ego vehicle must navigate around them carefully to avoid collisions. Reasoning on Intent: 1. White Truck: The white truck is directly in front of the ego vehicle and appears to be slowing down or stopping. The ego vehicle should match its speed to maintain a safe following distance. 2. Traffic Cones: The presence of traffic cones indicates a narrowed lane, requiring the ego vehicle to proceed cautiously and potentially reduce speed further if necessary. The ego vehicle has been decelerating over the past 2 seconds and is currently moving at a relatively low speed. The driving command is to go straight, which aligns with navigating through the construction zone. Given these observations, the ego vehicle should continue to decelerate and proceed cautiously while maintaining a safe distance from the white truck and navigating around the traffic cones.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S590"></a>
**Source:** p.29 S590

**Original:** (d)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S591"></a>
**Source:** p.29 S591

**Original:** Best Driving Action: Move forward with a deceleration. This action ensures the ego vehicle safely navigates through the construction zone while maintaining a safe distance from the white truck and avoiding any potential hazards posed by the traffic cones. &lt;/think&gt; &lt;answer&gt; The final output action is: &lt;action_392&gt;&lt;action_310&gt;… &lt;/answer&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S592"></a>
**Source:** p.29 S592

**Original:** Figure S9: Planning and reasoning results of AutoVLA on the Waymo end-to-end driving dataset.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S593"></a>
**Source:** p.29 S593

**Original:** As of May 22, 2025, AutoVLA achieves competitive performance on the Waymo End-to-End Driving Challenge leaderboard, as shown in Table S3. The model ranks highly in both RFS Overall and ADE metrics and achieves the top score in the RFS Spotlight metric, which focuses on the most challenging scenarios. Qualitative results are shown in Fig. S9, where AutoVLA demonstrates its ability to generate safe, context-aware trajectories in complex environments. The model effectively handles interactions, construction zones, and traffic regulations in diverse scenarios while providing coherent reasoning to justify its decisions. 29

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-30"></a>
### Page 30

<a id="S594"></a>
**Source:** p.30 S594

**Original:** Table S4: Ablation Study on the Waymo End-to-End Driving Test Set Camera

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S595"></a>
**Source:** p.30 S595

**Original:** Pretraining

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S596"></a>
**Source:** p.30 S596

**Original:** Output

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S597"></a>
**Source:** p.30 S597

**Original:** Front Front Multi Multi Multi Multi

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S598"></a>
**Source:** p.30 S598

**Original:** None None None None nuX nuX

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S599"></a>
**Source:** p.30 S599

**Original:** Action-only CoT-enhanced Action-only CoT-enhanced Action-only CoT-enhanced

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S600"></a>
**Source:** p.30 S600

**Original:** Post-RFT

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S601"></a>
**Source:** p.30 S601

**Original:** RFS (Overall) ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S602"></a>
**Source:** p.30 S602

**Original:** ADE at 5s ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S603"></a>
**Source:** p.30 S603

**Original:** 6.938 7.127 7.239 7.283 7.406 7.447

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S604"></a>
**Source:** p.30 S604

**Original:** 3.595 3.188 3.243 3.182 3.116 3.115

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S605"></a>
**Source:** p.30 S605

**Original:** 7.557

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S606"></a>
**Source:** p.30 S606

**Original:** 2.958

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S607"></a>
**Source:** p.30 S607

**Original:** Table S4 presents the ablation studies of the AutoVLA model in different training setups. The results indicate that multi-camera input consistently enhances driving performance. When trained solely on the Waymo end-to-end driving dataset, incorporating reasoning significantly improves performance compared to action-only setups. Moreover, pretraining on nuX data provides a substantial performance boost, suggesting that such pretraining enhances the scene understanding of the model with more driving data. RFT can significantly improve planning performance by mitigating error accumulation in generation and aligning with the task-specific rewards. F.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S608"></a>
**Source:** p.30 S608

**Original:** CARLA Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S609"></a>
**Source:** p.30 S609

**Original:** We evaluate the model after SFT in closed-loop testing within the CARLA simulator. The replanning frequency is set to 2 Hz, meaning the AutoVLA model is queried every 0.5 seconds in simulation, and the planned trajectory is used to generate control commands. High-level driving instructions are derived from a predefined route plan, while the vehicle’s current state (including speed and acceleration) is obtained from the IMU and speedometer sensors. The model receives four RGB images from the front-camera sensor covering the past two seconds as visual input. AutoVLA predicts a five-second trajectory, which is then used by a PID controller to compute the control actions (throttle, brake, and steering) that are applied to the vehicle. Closed-loop testing results in the CARLA simulator are shown in Fig. S10. Two representative scenarios are illustrated: (1) the ego vehicle equipped with AutoVLA successfully responds to a cut-in vehicle, and (2) it executes a smooth left turn. Additional closed-loop simulation results are available on the project website.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S610"></a>
**Source:** p.30 S610

**Original:** t=17s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S611"></a>
**Source:** p.30 S611

**Original:** t=18s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S612"></a>
**Source:** p.30 S612

**Original:** t=7s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S613"></a>
**Source:** p.30 S613

**Original:** t=9s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S614"></a>
**Source:** p.30 S614

**Original:** t=20s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S615"></a>
**Source:** p.30 S615

**Original:** t=11s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S616"></a>
**Source:** p.30 S616

**Original:** t=22s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S617"></a>
**Source:** p.30 S617

**Original:** t=13s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S618"></a>
**Source:** p.30 S618

**Original:** Figure S10: Closed-loop testing in the CARLA simulator. The two scenarios demonstrate AutoVLA’s capability to (top) respond safely to a cut-in vehicle and (bottom) execute a smooth left turn.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S619"></a>
**Source:** p.30 S619

**Original:** G

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S620"></a>
**Source:** p.30 S620

**Original:** Broader Impacts

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S621"></a>
**Source:** p.30 S621

**Original:** Autonomous driving is a safety-critical system, further emphasized by the integration of language guidance into the VLA model. This integration necessitates robust safeguards against adversarial attacks and proactive identification and filtering of unsafe human instructions. To mitigate potential hacking threats, it is essential to establish a secure communication channel in the vehicle, complemented by a gated-release strategy for model updates rather than online continual reinforcement fine-tuning on individual vehicles. 30

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

## 阅读提示

- 当前文件的价值是稳定保存全文页码与段落锚点，并提供一个经人工复核的开篇双语块。
- 未翻译段落、图表、表格和公式都在 `translation_notes.md` 中登记；完成前不应把本文件标记为正式全文译读。
- 旧博客笔记可作为研究路线导读，但数值结论仍应回到本读者的具体页码块和原 PDF 核验。
