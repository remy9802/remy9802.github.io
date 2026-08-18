# ORION: A Holistic End-to-End Autonomous Driving Framework by Vision-Language Instructed Action Generation｜全文双语阅读器（draft）

> **状态：source-mapped draft。** 已完成全文页段映射与开篇核心段落人工翻译；其余逐段翻译、图表紧裁和公式转写均显式标为待处理。本文不是摘要替代品。

## 文献元数据

- **作者 / 机构**：Haoyu Fu 等；华中科技大学、Xiaomi EV
- **年份 / 载体**：2025；ICCV 2025
- **原文**：[官方来源](https://openaccess.thecvf.com/content/ICCV2025/html/Fu_ORION_A_Holistic_End-to-End_Autonomous_Driving_Framework_by_Vision-Language_Instructed_ICCV_2025_paper.html)
- **原博客笔记**：[中文文献笔记](../../_posts/2026-08-18-orion-autonomous-driving.md)
- **源文件**：`/tmp/literature-vla-pdfs/orion.pdf`（12 页，可检索文本 PDF）

## 页面索引

[p.1](#page-1) · [p.2](#page-2) · [p.3](#page-3) · [p.4](#page-4) · [p.5](#page-5) · [p.6](#page-6) · [p.7](#page-7) · [p.8](#page-8) · [p.9](#page-9) · [p.10](#page-10) · [p.11](#page-11) · [p.12](#page-12)

## 术语表

| Canonical term | 中文 | 首次使用 / 决定 |
|---|---|---|
| reasoning space | 推理空间 | 与 action space 成对使用 |
| action space | 动作空间 | 指连续数值轨迹域 |
| generative planner | 生成式规划器 | 保留 planner 的规划含义 |
| Bench2Drive | Bench2Drive | 基准名称不翻译 |

## 全文逐段对照

<a id="page-1"></a>
### Page 1

<a id="S001"></a>
**Source:** p.1 S001 · Abstract

**Original:** End-to-end (E2E) autonomous driving methods still struggle to make correct decisions in interactive closed-loop evaluation due to limited causal reasoning capability. Current methods attempt to leverage the powerful understanding and reasoning abilities of Vision-Language Models (VLMs) to resolve this dilemma. However, the problem is still open that few VLMs for E2E methods perform well in the closed-loop evaluation due to the gap between the semantic reasoning space and the purely numerical trajectory output in the action space. To tackle this issue, we propose ORION, a hOlistic E2E autonomous dRiving framework by vIsion-language instructed actiON generation. ORION uniquely combines a QT-Former to aggregate long-term history context, a Large Language Model (LLM) for driving scenario reasoning, and a generative planner for precision trajectory prediction. ORION further aligns the reasoning space and the action space to implement a unified E2E optimization for both visual question-answering (VQA) and planning tasks. Our method achieves an impressive closed-loop performance of 77.74 Driving Score (DS) and 54.62% Success Rate (SR) on the challenge Bench2Drive datasets, which outperforms state-of-the-art (SOTA) methods by a large margin of 14.28 DS and 19.61% SR.

**中文:** 由于因果推理能力有限，端到端（E2E）自动驾驶方法在交互式闭环评测中仍难以持续作出正确决策。已有研究尝试借助视觉语言模型（VLM）的理解与推理能力解决这一问题，但语义推理空间与动作空间中的纯数值轨迹输出之间存在鸿沟，因此很少有面向 E2E 驾驶的 VLM 能在闭环评测中表现良好。为此，作者提出 ORION，即通过视觉-语言指令动作生成构建的整体式端到端自动驾驶框架。ORION 结合了用于聚合长期历史上下文的 QT-Former、用于驾驶场景推理的大语言模型，以及用于精确轨迹预测的生成式规划器，并进一步对齐推理空间与动作空间，对视觉问答和规划任务进行统一端到端优化。在 Bench2Drive 挑战集上，ORION 获得 77.74 的驾驶得分和 54.62% 的成功率，相比当时最优方法分别提高 14.28 分和 19.61 个百分点。

<a id="S002"></a>
**Source:** p.1 S002

**Original:** This ICCV paper is the Open Access version, provided by the Computer Vision Foundation. Except for this watermark, it is identical to the accepted version; the final published version of the proceedings is available on IEEE Xplore.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S003"></a>
**Source:** p.1 S003

**Original:** ORION: A Holistic End-to-End Autonomous Driving Framework by Vision-Language Instructed Action Generation Haoyu Fu1∗ , Diankun Zhang2∗ , Zongchuang Zhao1∗ , Jianfeng Cui2 , Dingkang Liang1† , Chong Zhang2 , Dingyuan Zhang1 , Hongwei Xie2† , Bing Wang2 , Xiang Bai1 1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S004"></a>
**Source:** p.1 S004

**Original:** Huazhong University of Science and Technology, 2 Xiaomi EV {hyfu, zcuangzhao, dkliang}@hust.edu.cn https://xiaomi-mlab.github.io/Orion/

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S005"></a>
**Source:** p.1 S005

**Original:** 1. Introduction End-to-end (E2E) autonomous driving has witnessed significant advancements in recent years. Classic E2E methods [9, 19, 26, 69, 72] integrate perception [28, 44, 68], prediction [8, 16, 51], and planning [18, 45] modules through multi-task learning, as shown in Fig. 1(a). These methods optimize driving trajectories by imitating expert demon* Equal contribution. † Project leader.  Corresponding author. Work done when Haoyu Fu and Zhongchuang Zhao were interns at Xiaomi EV.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S006"></a>
**Source:** p.1 S006

**Original:** Image

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S007"></a>
**Source:** p.1 S007

**Original:** Perception

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S008"></a>
**Source:** p.1 S008

**Original:** Motion Prediction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S009"></a>
**Source:** p.1 S009

**Original:** Planning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S010"></a>
**Source:** p.1 S010

**Original:** (a) Classic E2E methods Image

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S011"></a>
**Source:** p.1 S011

**Original:** Text

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S012"></a>
**Source:** p.1 S012

**Original:** VLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S013"></a>
**Source:** p.1 S013

**Original:** (b) VLM-Based E2E methods Image

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S014"></a>
**Source:** p.1 S014

**Original:** VLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S015"></a>
**Source:** p.1 S015

**Original:** Interfaces

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S016"></a>
**Source:** p.1 S016

**Original:** Classic E2E Method

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S017"></a>
**Source:** p.1 S017

**Original:** (c) VLM-Assisted Classic E2E methods Image

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S018"></a>
**Source:** p.1 S018

**Original:** VLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S019"></a>
**Source:** p.1 S019

**Original:** Instructed

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S020"></a>
**Source:** p.1 S020

**Original:** Generative Planner

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S021"></a>
**Source:** p.1 S021

**Original:** (d) ORION :Information flow

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S022"></a>
**Source:** p.1 S022

**Original:** :Backpropagation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S023"></a>
**Source:** p.1 S023

**Original:** :Hinder

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S024"></a>
**Source:** p.1 S024

**Original:** : Multi-modal Trajectory

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C001"></a>
**Source:** p.1 C001

**Original:** Figure 1. The comparison of different E2E paradigms. Our ORION framework establishes the differentiable connection between reasoning and action space via the generative planner.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S025"></a>
**Source:** p.1 S025

**Original:** strations, achieving promising performance in the openloop evaluation [7, 55]. Nevertheless, these methods lack the common sense to complete complex causal reasoning. As a result, they struggle with comprehensive closed-loop benchmarks [24] that require autonomous decision-making and dynamic environmental interactions. Recently, VisionLanguage Models (VLMs) [1, 11, 40, 59] have accumulated rich world knowledge and aligned vision-language space between the vision encoder [46, 67] and Large-Language Models (LLMs) through the large-scale data training, providing new insight for achieving E2E autonomous driving. Leveraging VLMs for E2E autonomous driving is not trivial since VLM’s ability exists in the reasoning space, while E2E methods only need the numerical planning results in the action space. Although some convenient methods [20, 75] leverage VLM output trajectories by fine-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-2"></a>
### Page 2

<a id="S026"></a>
**Source:** p.2 S026

**Original:** tuning private models [3] or by employing discrete special tokens, these approaches essentially still perform text classification tasks. Besides, limited by the intrinsic autoregressive mechanism of VLMs, the trajectories these method output lack diversity [54], which is inconsistent with the natural uncertainty of human planning [9]. Therefore, directly using VLM for E2E autonomous driving may produce suboptimal solutions in complex scenes [65]. Other methods endeavor to bridge the gap via utilizing VLM output meta-action (e.g., turn left) to assist classic E2E methods [27, 41], as shown in Fig. 1(c). They adopt a carefully crafted interface to transmit the reasoning space information into the action space. However, this paradigm decouples these two spaces, hindering collaborative optimization between the trajectory optimization and the VLM reasoning process. Thus, the capabilities of VLM for E2E planning are not fully leveraged by the above framework. To tackle this problem, we propose a hOlistic E2E autonomous dRiving framework by vIsion-language instructed actiON generation, termed ORION. Inspired by the field of conditional generation [29, 39, 48, 49], where the semantic information controls the generation of detailed image features, we find that the generative model can construct a unified distribution of diverse types of data (e.g., image, text). Therefore, considering that the reasoning space of VLM and the action space of trajectory belong to different domains, we introduce a generative planner to establish a unified latent representation for aligning the two spaces. With the help of the introduced module, we take advantage of VLMs’ reasoning information to construct trajectory, facilitating the model to capture the causal relationship between scene information and driving behavior. Furthermore, it is well-known that long-term memory is necessary for E2E autonomous driving since historical information often influences trajectory planning within the current scene. Existing VLMs for E2E methods [20, 65] typically concatenate multi-frame images for temporal modeling. They are constrained by the token length of VLM and incur significant computational overhead. Instead, motivated by OmniDrive [61], which extracts features through Q-Former-styled architecture, we introduce QT-Former, a query-based temporal module. Besides focusing on the information of the objects in the scene, we also consider the long-term context of the scene. By leveraging a memory bank and a set of history queries, QT-Former effectively stores and extracts essential historical scene information to aggregate long-term visual context, further enhancing the temporal perception ability of reasoning and action space. We evaluate the closed-loop driving ability of ORION on the Bench2Drive dataset, which builds interactive scenarios based on the CARLA [12] simulator. ORION achieves 77.74 Driving Score (DS) and 54.62% Success Rate (SR), surpassing previous SOTA methods [25] with 14.28 driving

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S027"></a>
**Source:** p.2 S027

**Original:** scores and 19.61% success rates, demonstrating the powerful superiority of ORION. The benefits of ORION are from three aspects: 1) Thanks to the capability of the generative model to characterize the latent distribution of data, we bridge the gap between the reasoning space of VLM and the action space of trajectories through a generative planner, enabling the VLM to understand the scene and instruct trajectory generation. 2) The QT-former in ORION effectively captures long-term temporal dependencies, enabling the model to integrate temporal vision context into reasoning and action spaces. 3) Without bells and whistles, ORION achieves excellent performance in the Bench2Drive closed-loop benchmark. Experiments also show that ORION is compatible with diverse generative models, which further demonstrate the flexibility of our proposed framework.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S028"></a>
**Source:** p.2 S028

**Original:** 2. Related work 2.1. End-to-End Autonomous Driving End-to-end autonomous driving (E2E-AD) [64, 70] aims to directly process raw sensor data to predict motion trajectories and control signals, jointly optimizing the entire system to minimize error accumulation. Recent works like UniAD [19] and VAD [26] integrate perception and motion prediction into a unified planning framework. VADv2 [9] introduces probabilistic planning, outputting the probabilistic distribution of action and sampling one action to control the vehicle. GenAD [72] and DiffusionDrive [33] employ the generative model to predict multi-modal trajectory. However, these methods mainly excel in open-loop evaluation, where the model could readily overfit to the ego status, as highlighted in Ego-MLP [66] and BEV-Planner [32]. Although some studies [9, 22, 23, 72] adopt closed-loop evaluation in CARLA [12] to assess robust driving ability, their performance remains suboptimal, revealing a notable gap between their open-loop and closed-loop results. Thus, we aim to construct an E2E-AD system with strong consistency between open-loop and closed-loop performance.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S029"></a>
**Source:** p.2 S029

**Original:** 2.2. Vision-Language Models (VLMs) Recently, Vision-Language Models (VLMs) [1, 3, 11, 31, 36, 59] have extended large language models (LLMs) [40, 57] to multiple modalities using various vision encoders [46, 67], demonstrating strong vision contextual understanding and reasoning. LLaVA series [36, 37] introduce the visual instruction tuning to perform image-text alignment, while Monkey [31] improves detail comprehension by dividing images. InternVL series [10, 11] further enhances the vision detail understanding via a dynamic resolution strategy. However, most methods map the visual feature into language space through MLP, incurring high computational costs due to numerous image tokens. To alleviate

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-3"></a>
### Page 3

<a id="S030"></a>
**Source:** p.3 S030

**Original:** Perception Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S031"></a>
**Source:** p.3 S031

**Original:** : Frozen

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S032"></a>
**Source:** p.3 S032

**Original:** 濷 Vision Encoder

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S033"></a>
**Source:** p.3 S033

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S034"></a>
**Source:** p.3 S034

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S035"></a>
**Source:** p.3 S035

**Original:** Action Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S036"></a>
**Source:** p.3 S036

**Original:** Generative Planner

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S037"></a>
**Source:** p.3 S037

**Original:** QT-Former

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S038"></a>
**Source:** p.3 S038

**Original:** 濷 Planning Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S039"></a>
**Source:** p.3 S039

**Original:** Det. &amp; Motion &amp; Traffic

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S040"></a>
**Source:** p.3 S040

**Original:** Scene Description

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S041"></a>
**Source:** p.3 S041

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S042"></a>
**Source:** p.3 S042

**Original:** Text Tokenizer

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S043"></a>
**Source:** p.3 S043

**Original:** History Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S044"></a>
**Source:** p.3 S044

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S045"></a>
**Source:** p.3 S045

**Original:** Vision Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S046"></a>
**Source:** p.3 S046

**Original:** Instruction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S047"></a>
**Source:** p.3 S047

**Original:** Scene Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S048"></a>
**Source:** p.3 S048

**Original:** Text Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S049"></a>
**Source:** p.3 S049

**Original:** Large Language Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S050"></a>
**Source:** p.3 S050

**Original:** Loraa

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S051"></a>
**Source:** p.3 S051

**Original:** 瀖

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S052"></a>
**Source:** p.3 S052

**Original:** : Trainable

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S053"></a>
**Source:** p.3 S053

**Original:** Action Reasoning History Review

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S054"></a>
**Source:** p.3 S054

**Original:** Scene Analysis

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S055"></a>
**Source:** p.3 S055

**Original:** Reasoning Space

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C002"></a>
**Source:** p.3 C002

**Original:** Figure 2. The pipeline of our ORION, a holistic E2E framework aligning vision-reasoning-action space. It consists of three key components: a QT-Former to extract long-term context and link the vision space of the vision encoder and LLM’s reasoning space; the LLM for performing textual tasks and predicting a planning token; and a generative planner that bridges reasoning and action space for generating a multi-modal trajectory conditioned by the planning token. Perception Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S056"></a>
**Source:** p.3 S056

**Original:** this burden, QwenVL [4] and Flamingo [2] reduce token redundancy using cross-attention, while Qwen2VL [59] enhances efficiency with dynamic resolution and multimodal rotary position embedding (M-RoPE) for simultaneously processing diverse modalities. Many works [6, 63, 73] have explored VLMs for downstream tasks, while ORION combines VLMs with generative planners for autonomous driving.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S057"></a>
**Source:** p.3 S057

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S058"></a>
**Source:** p.3 S058

**Original:** History Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S059"></a>
**Source:** p.3 S059

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S060"></a>
**Source:** p.3 S060

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S061"></a>
**Source:** p.3 S061

**Original:** Image Features

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S062"></a>
**Source:** p.3 S062

**Original:** Self-Attention

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S063"></a>
**Source:** p.3 S063

**Original:** Cross-Attention

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S064"></a>
**Source:** p.3 S064

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S065"></a>
**Source:** p.3 S065

**Original:** Cross-Attention

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S066"></a>
**Source:** p.3 S066

**Original:** Cross-Attention

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S067"></a>
**Source:** p.3 S067

**Original:** 灅6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S068"></a>
**Source:** p.3 S068

**Original:** 濷 Detection

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S069"></a>
**Source:** p.3 S069

**Original:** 濷 Motion

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S070"></a>
**Source:** p.3 S070

**Original:** 灅1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S071"></a>
**Source:** p.3 S071

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S072"></a>
**Source:** p.3 S072

**Original:** Timestamp Long-term Memory Bank

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S073"></a>
**Source:** p.3 S073

**Original:** Update

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S074"></a>
**Source:** p.3 S074

**Original:** 濷 濷 濷 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S075"></a>
**Source:** p.3 S075

**Original:** MLP

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S076"></a>
**Source:** p.3 S076

**Original:** Traffic State

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S077"></a>
**Source:** p.3 S077

**Original:** 2.3. VLM for End-to-End Autonomous Driving VLMs showcase excellent contextual understanding, comprehensive world knowledge, and impressive generalization, motivating their application in autonomous driving. Some methods [20, 61, 65] directly employ VLMs for environment perception and explainable trajectory prediction in text form. For example, Omnidrive [61] adopts StreamPETR [60] as Q-Formar3D to compress current scene features and performs trajectory prediction through LLM’s text prediction. EMMA [20], trained on large-scale data, enables Gemini [3] to predict discrete textual planning with strong open-loop performance. Other studies [27, 56] integrate VLMs with representative E2E models in a fast-slow dual system. DriveVLM [56] leverages VLM to predict the low-frequency trajectory, which will be refined by an E2E model. Senna [27] further replaces the low-frequency with the meta-action, guiding the VAD [26] to predict motion. These methods only implement the open-loop evaluation. Although DriveMLM [62] and LMDrive [50] leverage the VLM to implement closed-loop evaluation, they struggle with processing complex scenarios limited by the simple CARLA Town05Long benchmark. In contrast, we propose a holistic E2E framework that employs a generative planner to bridge the reasoning space of VLM and the action space of trajectories, enabling interpretable driving decisions and precise trajectory generation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S078"></a>
**Source:** p.3 S078

**Original:** Scene Queries

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S079"></a>
**Source:** p.3 S079

**Original:** : Addition

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S080"></a>
**Source:** p.3 S080

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S081"></a>
**Source:** p.3 S081

**Original:** 濷

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C003"></a>
**Source:** p.3 C003

**Original:** Figure 3. The detailed architecture of QT-Former. It accepts diverse queries and image features as inputs to detect traffic elements, predict motion, and aggregate long-term vision context.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S082"></a>
**Source:** p.3 S082

**Original:** in complex real-world scenarios of Bench2Drive.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S083"></a>
**Source:** p.3 S083

**Original:** 3. Method In this paper, we present ORION. As shown in Fig. 2, ORION first encodes the image tokens with a vision encoder. Then, a QT-Former (Sec. 3.1) leverages diverse queries to aggregate long-term vision context and perceive traffic elements. The LLM (Sec. 3.2) subsequently combines the vision features with user instructions to generate a planning token. Finally, a generative planner (Sec. 3.3) bridges reasoning and action space, predicting a multimodal trajectory conditioned by the planning token.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S084"></a>
**Source:** p.3 S084

**Original:** 3.1. QT-Former To compress and extract multi-view image features Fm derived from the vision encoder while achieving long-term information modeling, we introduce QT-Former, a querybased temporal module, as shown in Fig. 3. Specifically,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-4"></a>
### Page 4

<a id="S085"></a>
**Source:** p.4 S085

**Original:** following Q-Former3D [61], we first set up two types of learnable queries, the scene queries Qs ∈ RNs ×Cq and the perception queries Qp ∈ RNp ×Cq , where Ns and Np are the number of scene and perception queries, respectively, and Cq is the channel of queries. Qs , Qp are processed through self-attention (SA) to exchange their information. Then they interact with image features Fm with 3D positional encoding [38] Pm in the cross-attention (CA) module. After that, the perception queries are fed into the multiple auxiliary heads for object detection(e.g., objects and map), traffic state (e.g. traffic signs, traffic lights, and whether the traffic light affects the ego vehicle), and motion prediction of dynamic agents. The scene queries serve as tokens representing the key information of the current scene. Additionally, we employ a set of history queries Qh ∈ RNh ×Cq and a long-term memory bank M ∈ R(Nh ×n)×Cq to efficiently retrieve and store essential historical scene information (e.g., preceding road conditions and traffic light status), where Nh is the number of history queries and n is the maximum history frame length. We utilize the Qh to extract the former frame queries in M with relative timestamp embedding Pt through a CA block. Then Qh interacts with current scene features Qs in another CA block, enabling the extraction of relevant details about the current scenario. This process can be formulated as: Qh = CA(Qh , M + Pt , M + Pt ), Q̂h = CA(Qh , Qs , Qs ),

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S086"></a>
**Source:** p.4 S086

**Original:** (1)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S087"></a>
**Source:** p.4 S087

**Original:** where Pt denotes the relative timestamp embedding. Subsequently, the updated history queries Q̂h are stored in the memory bank M following the First-In-First-Out (FIFO) replacement policy, formulated as: t−1 t M = [Q̂t−n h , · · ·, Q̂h , Q̂h ],

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S088"></a>
**Source:** p.4 S088

**Original:** (2)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S089"></a>
**Source:** p.4 S089

**Original:** where t is the current frame time, n is the stored frame length of M . Although some methods [52, 60] also leverage the memory bank to store preceding information, they typically perceive all or one-step compressed vision features of the current frame. Instead, we initialize a few numbers of the history queries to further extract the current compressed scene information, reducing the storage burden while enhancing long-term scene understanding ability. Finally, we leverage two-layer MLP to convert the updated history queries Q̂h and current scene features Qs to corresponding history tokens xh and scene tokens xs in the reasoning space of LLM.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S090"></a>
**Source:** p.4 S090

**Original:** 3.2. Large Language Model The LLM is pivotal to our framework because the highquality reasoning of the current driving scenario is necessary to instruct the generator to generate a reasonable and

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S091"></a>
**Source:** p.4 S091

**Original:** correct trajectory generation in action space. As shown in Fig. 2, the user instruction Xq , including scene description, history information review, scene analysis, and action reasoning, is first encoded into language tokens xq ∈ RL×C by the text tokenizer, where L is the token length and C is the dimension of LLM. Then, the scene tokens xs and history tokens xh are combined with the language tokens xq and fed into LLM. Leveraging its abundant world knowledge and outstanding reasoning ability, LLM performs hierarchical text-based reasoning tasks in the driving scenario. Meanwhile, we design a planning QA template with a special planning token s for LLM as the final QA to accumulate the understanding and reasoning context of the entire driving scenario to the s, formally written as: s ∼ p(s | xs , xh , xq , xa ),

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S092"></a>
**Source:** p.4 S092

**Original:** (3)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S093"></a>
**Source:** p.4 S093

**Original:** where xa denotes the generation answer of LLM. The embedding of the planning token s will serve as a condition to control the trajectory generation. To compensate for the lack of high-quality VQA annotations within closed-loop simulation to train LLMs for comprehensively understanding driving scenarios, we extend the Bench2Drive dataset via a fully automatic VQA annotation pipeline powered by Qwen2-VL [59] and propose our VQA dataset for close-loop simulation driving scenario Bench2Drive, Chat-B2D. We provide detailed information on Chat-B2D and its annotation pipeline in the Appendix.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S094"></a>
**Source:** p.4 S094

**Original:** 3.3. Generative Planner Generative models [15, 29, 49] can achieve deep representation learning of data distributions through latent space construction, effectively capturing critical features and intrinsic correlations within data. Recent researches [5, 39, 48] have demonstrated semantic correlations between latent spaces of different modalities, where adjusting the distribution parameters of one modality space enables precise control over the generation process of another modality space. Inspired by the generative domain, we introduce a generative planner to bridge the gap between the reasoning and action space. Specifically, we formulate the current trajectory a in action space as a conditional probability distribution p(a | s), where s is the planning token. To construct p(a | s), there are many excellent methods in the generation field (e.g., variational autoencoders (VAE) [29] and diffusion model [49]). As there are essential differences in the distribution between the reasoning space of VLM and the action space of trajectory, we use the VAE [29] model to align them in the Gaussian distribution. We employ two-layer MLPs to project both the state s and the ground-truth trajectory t into Gaussian variables z in the latent space, denoted as: p(zs |s) ∼ N (μs , σs2 ), p(zt |t) ∼ N (μt , σt2 ),

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S095"></a>
**Source:** p.4 S095

**Original:** (4)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-5"></a>
### Page 5

<a id="S096"></a>
**Source:** p.5 S096

**Original:** where N (μ, σ 2 ) denotes a Gaussian distribution with a mean of μ, and standard deviation of σ. We then use Kullback-Leibler divergence loss to enforce distribution matching, represented as: Lvae = DKL (p(z|s), p(z|t)).

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S097"></a>
**Source:** p.5 S097

**Original:** (5)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S098"></a>
**Source:** p.5 S098

**Original:** We then use the GRU decoder in GenAD [72] to decode the trajectory from the latent space z. Significantly, the functions of VAE in this paper are not the same as VAE of GenAD. The former only uses a single token encoded in the reasoning space from the perspective of the ego vehicle as input, aiming to bridge the gap between reasoning space and action space. The latter leverages the features of all agents encoded in the BEV space as input, designed to learn specific patterns of the highly structured trajectories of both the ego vehicle and other agents. Additionally, we also attempt to replace the VAE with alternative generative models, such as the diffusion model for trajectory generation. Benefiting from the proposed method that bridges the gap between the reasoning and action space through distribution learning in latent space, our framework still demonstrates superior performance compared to other methods (detailed in Sec. 4.5).

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S099"></a>
**Source:** p.5 S099

**Original:** 3.4. Training Objectives For the detection task of the proposed QT-Former, the detection loss is defined as Ldet = Lcls + Lreg , where Lcls is focal loss [35] and Lreg is L1 loss. For the traffic state and motion prediction, the losses are defined as Ltra and Lm = Lmcls + Lmreg , respectively, where Ltra and Lmcls are focal loss, and Lmreg is L1 loss. The total loss of QTFormer is: (6) Lqt = Ldet + Ltra + Lm . For the LLM, we leverage the auto-regressive crossentropy loss Lce . For the Generative Planner in our framework, Lvae is the Kullback-Leibler divergence loss used to align the reasoning space and action space. Following VAD [26], we adopt the collision loss Lcol , boundary loss Lbd , and MSE loss Lmse for the planning prediction. The total loss of generative planner is: Lgp = Lvae + Lmse + Lcol + Lbd .

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S100"></a>
**Source:** p.5 S100

**Original:** (7)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S101"></a>
**Source:** p.5 S101

**Original:** In summary, total loss of the proposed ORION is: L = Lqt + Lce + Lgp .

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S102"></a>
**Source:** p.5 S102

**Original:** (8)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S103"></a>
**Source:** p.5 S103

**Original:** CARLA V2 [12] for E2E autonomous driving. It provides an official training set where we use the base set (1000 clips) for fair comparison with all the other baselines, which is divided into 950 clips for training and 50 clips for open-loop validation. Each clip captures approximately 150 meters of continuous driving within a specific traffic scene. For closed-loop evaluation, we evaluate the proposed method on the official set of 220 short routes designed by Bench2drive, spanning 44 interactive scenarios with 5 routes per scenario. Additionally, we compare our method with other baselines on nuScenes [7] open-loop evaluation (details in Appendix). Evaluation Metrics. Bench2drive includes five metrics for closed-loop evaluation: Driving Score (DS), Success Rate (SR), Efficiency, Comfortness, and Multi-Ability. The Success Rate quantifies the proportion of routes successfully completed within the allotted time. The Driving Score follows CARLA [12], incorporating both route completion status and violation penalties, where infractions reduce the score via discount factors. Efficiency and Comfortness are used to measure the speed performance and comfort of the autonomous driving system during the driving process, respectively. Multi-Ability measures 5 advanced skills independently for urban driving. For open-loop evaluation, we use the L2 distance error and the collision rate. Additionally, we use CIDEr [58], BLEU [42], and ROUGE-L [34] to evaluate the performance of ORION on VQA tasks.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S104"></a>
**Source:** p.5 S104

**Original:** 4.2. Implementation Details Model Setting. Consistent with classic E2E baselines [19, 26, 72] on Bench2Drive, ORION is a fully HD map-free method that only uses the Navigation Command (NC) as an input condition for the trajectory predictions rather than locations of lane center (i.e., target point, TP). ORION is an anchor-free method that outputs 6 mode trajectory predictions corresponding to the 6 NC defined in Bench2Drive. Training Process. All experiments are conducted on 32 NVIDIA A800 GPUs with 80 GB of memory. Following Omnidrive [61], we adopt EVA-02-L [13] as the vision encoder. Vicuna v1.5 [71] is employed in ORION and finetuned using LoRA [17], with the rank dimension and alpha set to 16. The default number of scene, perception, and historical queries are 512, 600, and 16, respectively. We set the Memory Bank’s stored frame number n to 16. During training, data augmentations are applied to input images, which are first resized to a resolution of 640 × 640. More training details are provided in the Appendix.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S105"></a>
**Source:** p.5 S105

**Original:** The loss weight follows [26, 60, 72] without special design.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S106"></a>
**Source:** p.5 S106

**Original:** 4.3. Main Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S107"></a>
**Source:** p.5 S107

**Original:** 4. Experiments

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S108"></a>
**Source:** p.5 S108

**Original:** As reported in Tab. 1, the performance of ORION significantly exceeds all end-to-end methods on Bench2Drive, even the method with expert feature distillation. Specifically, ORION surpasses the latest SOTA method DriveTransformer [25] by +14.28 DS and +19.61% SR. It also

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S109"></a>
**Source:** p.5 S109

**Original:** 4.1. Dataset and Evaluation Metrics Dataset. We train and evaluate ORION on the Bench2drive dataset [24], a closed-loop evaluation protocol under

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-6"></a>
### Page 6

<a id="C004"></a>
**Source:** p.6 C004

**Original:** Table 1. Closed-loop, Open-loop and Multi-Ability Results of E2E-AD Methods in Bench2Drive under base set. C/L refers to camera/LiDAR. Avg.L2 is averaged over the predictions in 2 seconds under 2Hz, similar to UniAD. * denote expert feature distillation. Ref: Reference, Con: Condition, Mod: modality, NC: navigation command, TP: target point, DS: Driving Score, SR: Success Rate, Eff: Efficiency, Com: Comfortness, M: Merging, O: Overtaking, EB: Emergency Brake, GW: Give Way, TS: Traffic Sign. Method TCP* [64] TCP-ctrl* TCP-traj* TCP-traj w/o distillation ThinkTwice* [23] DriveAdapter* [22] AD-MLP [66] UniAD-Tiny [19] UniAD-Base [19] VAD [26] GenAD [72] MomAD[53] DriveTransformer-Large [25]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S110"></a>
**Source:** p.6 S110

**Original:** Closed-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S111"></a>
**Source:** p.6 S111

**Original:** Ability (%) ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S112"></a>
**Source:** p.6 S112

**Original:** Open-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S113"></a>
**Source:** p.6 S113

**Original:** Ref

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S114"></a>
**Source:** p.6 S114

**Original:** Con Mod DS↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S115"></a>
**Source:** p.6 S115

**Original:** SR(%)↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S116"></a>
**Source:** p.6 S116

**Original:** M

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S117"></a>
**Source:** p.6 S117

**Original:** O

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S118"></a>
**Source:** p.6 S118

**Original:** EB

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S119"></a>
**Source:** p.6 S119

**Original:** GW

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S120"></a>
**Source:** p.6 S120

**Original:** TS

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S121"></a>
**Source:** p.6 S121

**Original:** Mean

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S122"></a>
**Source:** p.6 S122

**Original:** NeurIPS 22 NeurIPS 22 NeurIPS 22 NeurIPS 22 CVPR 23 ICCV 23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S123"></a>
**Source:** p.6 S123

**Original:** TP C TP C TP C TP C TP C TP C&amp;L

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S124"></a>
**Source:** p.6 S124

**Original:** 40.70 30.47 59.90 49.30 62.44 64.22

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S125"></a>
**Source:** p.6 S125

**Original:** 15.00 7.27 30.00 20.45 31.23 33.08

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S126"></a>
**Source:** p.6 S126

**Original:** 54.26 55.97 76.54 78.78 69.33 70.22

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S127"></a>
**Source:** p.6 S127

**Original:** 47.80 51.51 18.08 22.96 16.22 16.01

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S128"></a>
**Source:** p.6 S128

**Original:** 1.70 1.70 1.96 0.95 1.01

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S129"></a>
**Source:** p.6 S129

**Original:** 16.18 10.29 8.89 17.14 27.38 28.82

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S130"></a>
**Source:** p.6 S130

**Original:** 20.00 4.44 24.29 6.67 18.42 26.38

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S131"></a>
**Source:** p.6 S131

**Original:** 20.00 10.00 51.67 40.00 35.82 48.76

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S132"></a>
**Source:** p.6 S132

**Original:** 10.00 10.00 40.00 50.00 50.00 50.00

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S133"></a>
**Source:** p.6 S133

**Original:** 6.99 6.45 46.28 28.72 54.23 56.43

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S134"></a>
**Source:** p.6 S134

**Original:** 14.63 8.23 34.22 28.51 37.17 42.08

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S135"></a>
**Source:** p.6 S135

**Original:** arXiv 23 CVPR 23 CVPR 23 ICCV 23 ECCV 24 CVPR 25 ICLR 25

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S136"></a>
**Source:** p.6 S136

**Original:** NC NC NC NC NC NC NC

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S137"></a>
**Source:** p.6 S137

**Original:** C C C C C C C

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S138"></a>
**Source:** p.6 S138

**Original:** 18.05 40.73 45.81 42.35 44.81 44.54 63.46

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S139"></a>
**Source:** p.6 S139

**Original:** 0.00 13.18 16.36 15.00 15.90 16.71 35.01

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S140"></a>
**Source:** p.6 S140

**Original:** 48.45 123.92 129.21 157.94 170.21 100.64

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S141"></a>
**Source:** p.6 S141

**Original:** 22.63 47.04 43.58 46.01 48.63 20.78

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S142"></a>
**Source:** p.6 S142

**Original:** 3.64 0.80 0.73 0.91 0.87 0.62

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S143"></a>
**Source:** p.6 S143

**Original:** 0.00 8.89 14.10 8.11 17.57

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S144"></a>
**Source:** p.6 S144

**Original:** 0.00 9.33 17.78 24.44 35.00

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S145"></a>
**Source:** p.6 S145

**Original:** 0.00 20.00 21.67 18.64 48.36

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S146"></a>
**Source:** p.6 S146

**Original:** 0.00 20.00 10.00 20.00 40.00

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S147"></a>
**Source:** p.6 S147

**Original:** 4.35 15.43 14.21 19.15 52.10

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S148"></a>
**Source:** p.6 S148

**Original:** 0.87 14.73 15.55 18.07 38.60

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S149"></a>
**Source:** p.6 S149

**Original:** -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S150"></a>
**Source:** p.6 S150

**Original:** NC

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S151"></a>
**Source:** p.6 S151

**Original:** C

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S152"></a>
**Source:** p.6 S152

**Original:** 77.74(+14.28) 54.62(+19.61) 151.48 17.38

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S153"></a>
**Source:** p.6 S153

**Original:** 0.68

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S154"></a>
**Source:** p.6 S154

**Original:** 25.00 71.11 78.33 30.00 69.15 54.72(+16.12)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S155"></a>
**Source:** p.6 S155

**Original:** ORION (Ours)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S156"></a>
**Source:** p.6 S156

**Original:** achieves improvements of +13.52 DS and +21.54% SR over DriveAdapter [22], even if DriveAdapter distills the expert feature from Think2Drive [30] and accepts two modalities (i.e., camera and LiDAR) inputs. The above promising results effectively demonstrate the superiority of our ORION. Additionally, the Multi-Ability results are also illustrated in Tab. 1. ORION achieves +16.12% and +12.64% performance improvements compared with DriveTransformer [25] and DriveAdapter [22] in the average ability, respectively. Specifically, our model demonstrates outstanding performance in some scenarios, such as Overtaking (71.11%), Emergency Brake (78.33%), and Traffic Sign (69.15%), which shows that our model benefits from the powerful reasoning capability of VLM to understand the causal interaction between the ego vehicle, dynamic elements and static elements (Traffic Signs) in driving scenarios. On the other hand, our model falls behind DriveAdapter in Merging and Give Way, which shows that ORION is not good at making lane-changing decisions. The phenomenon may be caused by the more diverse decision-making timing for lane-changing, making the model encounter difficulties in capturing the correct causal relationship [22].

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S157"></a>
**Source:** p.6 S157

**Original:** 4.4. Qualitative Results The qualitative results of ORION in two canonical closeloop evaluation scenarios of Bench2Drive are shown in Fig. 4. It shows both the driving action reasoning and trajectory prediction outputted by our model, as well as the corresponding ego-vehicle states. We observe that ORION can capture the correct causal relationship in the scenario and make correct driving decisions, then predict the planning trajectory following the reasoning instruction, demon-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S158"></a>
**Source:** p.6 S158

**Original:** Eff.↑ Com.↑ Avg.L2 (m) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S159"></a>
**Source:** p.6 S159

**Original:** strating the surprising interpretability of our method. More qualitative results can be found in the Appendix.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S160"></a>
**Source:** p.6 S160

**Original:** 4.5. Ablation Study Advantages of the vision-language instructed action generation. To validate the effectiveness of the planning generation paradigm proposed in this paper, extensive experiments are conducted to compare our paradigm with canonical trajectory prediction paradigms of VLMbased autonomous driving methods, including (a) plain text outputs [20, 61], (b) dual system (e.g. VAD [26]) outputs guided by elaborated design VLM interface (e.g. meta-action) [27], and (c) special token decode outputs by MLP [47], as shown in the left part of Fig. 5. To ensure the fairness of the ablations, experiments of different paradigms use the same sensor inputs, vision encoder, QT-former, and VLM as our ORION and are trained by the same strategy. Only the output formats of VLMs are adjusted according to the requirements of different paradigms. The results are illustrated in the right part of Fig. 5. The plain text paradigm performs the worst (42.23 DS, 13.14% SR, and 15.39% mean ability), indicating the limitations of plain text output in closed-loop driving scenarios, potentially due to its inadequate numerical reasoning capabilities [14, 43]. Compared with the plain text paradigm, the dual-system paradigm only obtains a slight performance improvement. Note that the reproduced results of the dualsystem paradigm are very close to the official results of VAD in Tab. 1. The results may indicate that the performance of the dual-system paradigm may be bottlenecked by the insufficient capabilities of classic E2E methods. Although the effectiveness of the MLP decoder paradigm has

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-7"></a>
### Page 7

<a id="S161"></a>
**Source:** p.7 S161

**Original:** You should keep and lanefollow. … car directly in front of the ego vehicle, which may require to maintain a safe following distance.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S162"></a>
**Source:** p.7 S162

**Original:** You should decelerate and lanefollow. … the pedestrian crossing the street, requiring a reduction in speed to ensure safety.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S163"></a>
**Source:** p.7 S163

**Original:** T=0.00s, V=5.02m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S164"></a>
**Source:** p.7 S164

**Original:** You should decelerate and lanefollow. … the pedestrian crossing the street, requiring a reduction in speed to ensure safety.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S165"></a>
**Source:** p.7 S165

**Original:** T=0.25s, V=4.19m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S166"></a>
**Source:** p.7 S166

**Original:** You should keep and lanefollow. The decision is influenced by the red traffic light ahead, which requires the ego vehicle to come to a complete stop.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S167"></a>
**Source:** p.7 S167

**Original:** T=1.00s, V=0.05m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S168"></a>
**Source:** p.7 S168

**Original:** You should keep your current speed You should decelerate and turn left. and turn left. … is based on the The decision is influenced by the current traffic conditions and the proximity of the bicycle ahead. absence of immediate obstacles or hazards.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S169"></a>
**Source:** p.7 S169

**Original:** T=0.00s, V=0.00m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S170"></a>
**Source:** p.7 S170

**Original:** You should accelerate and lane follow. The decision to accelerate is influenced by the current speed and clear lane for travel.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S171"></a>
**Source:** p.7 S171

**Original:** T=4.50s, V=4.92m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S172"></a>
**Source:** p.7 S172

**Original:** T=2.00s, V=2.67m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S173"></a>
**Source:** p.7 S173

**Original:** T=3.00s, V=5.04m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S174"></a>
**Source:** p.7 S174

**Original:** You should accelerate and turn left. The decision is based on the current slow speed of the ego vehicle and the need to gain momentum before turning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S175"></a>
**Source:** p.7 S175

**Original:** T=6.50s, V=4.85m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S176"></a>
**Source:** p.7 S176

**Original:** You should keep current speed and follow the lane. …the front car is moving at a similar speed, suggesting a steady flow of traffic.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S177"></a>
**Source:** p.7 S177

**Original:** T=7.50s, V=0.26m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S178"></a>
**Source:** p.7 S178

**Original:** You should keep and turn left. The decision is based on the absence of immediate obstacles or traffic signals requiring a change in speed.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S179"></a>
**Source:** p.7 S179

**Original:** T=9.50s, V=5.12m/s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C005"></a>
**Source:** p.7 C005

**Original:** Figure 4. Qualitative results of ORION on the Bench2Drive closed-loop evaluation set. The brown, red, and green refer to the action decision, the objects that influence driving decisions, and the prediction trajectory, respectively.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S180"></a>
**Source:** p.7 S180

**Original:** (a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S181"></a>
**Source:** p.7 S181

**Original:** (b)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S182"></a>
**Source:** p.7 S182

**Original:** Plain Text Meta Action

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S183"></a>
**Source:** p.7 S183

**Original:** Plain Text Meta-Action guided VAD MLP with Planning Token Ours

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S184"></a>
**Source:** p.7 S184

**Original:** 77.74 VAD

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S185"></a>
**Source:** p.7 S185

**Original:** VLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S186"></a>
**Source:** p.7 S186

**Original:** 54.62 54 62

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S187"></a>
**Source:** p.7 S187

**Original:** 50 Planning (c) MLP Token (d) Planning VAE Token

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S188"></a>
**Source:** p.7 S188

**Original:** 70.73

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S189"></a>
**Source:** p.7 S189

**Original:** 44.94 42.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S190"></a>
**Source:** p.7 S190

**Original:** 45.12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S191"></a>
**Source:** p.7 S191

**Original:** 30 15.45 13.14

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C006"></a>
**Source:** p.7 C006

**Original:** Table 2. Ablation on diverse generative planner. DS and SR denote Driving Score and Success Rate separately.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S192"></a>
**Source:** p.7 S192

**Original:** 54.72 54 72 48.44

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S193"></a>
**Source:** p.7 S193

**Original:** Generative Planner

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S194"></a>
**Source:** p.7 S194

**Original:** 20.65 15.39

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S195"></a>
**Source:** p.7 S195

**Original:** SR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S196"></a>
**Source:** p.7 S196

**Original:** Open-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S197"></a>
**Source:** p.7 S197

**Original:** Ability

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S198"></a>
**Source:** p.7 S198

**Original:** DS↑ SR(%)↑ Avg. L2 (m) ↓ Avg. col (%)↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S199"></a>
**Source:** p.7 S199

**Original:** Diffusion 71.97 VAE (Ours) 77.74

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S200"></a>
**Source:** p.7 S200

**Original:** 10 DS

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S201"></a>
**Source:** p.7 S201

**Original:** Closed-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S202"></a>
**Source:** p.7 S202

**Original:** 46.54 54.62

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S203"></a>
**Source:** p.7 S203

**Original:** 0.73 0.68

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S204"></a>
**Source:** p.7 S204

**Original:** 0.96 0.47

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S205"></a>
**Source:** p.7 S205

**Original:** Avg. 46.68 54.72

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S206"></a>
**Source:** p.7 S206

**Original:** Ability Mean

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C007"></a>
**Source:** p.7 C007

**Original:** Figure 5. Advantages of the vision-language instructed action generation. DS and SR denote Driving Score and Success Rate separately. VAD [26] is a classic E2E model.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S207"></a>
**Source:** p.7 S207

**Original:** been validated in CarLLava [47], our paradigm still shows a performance gain of +7.01 DS, +9.5% SR, and +6.28% average ability. The results may be caused by the fact that the MLP is the simplest way to align features between different spaces, which is consistent with the viewpoint presented in this paper. Additionally, the MLP-decoder struggles with handling multi-modal trajectory [9, 21], making it still significantly lag behind ORION in closed-loop evaluation. Analysis on different generative planners. We then investigate the effect of employing different generative planners to bridge the reasoning-action space. Specifically, we implement the diffusion model by simply replacing the VAE, which uses K-means trajectory anchors as prior information and outputs 20 mode trajectory predictions. The results are listed in Tab. 2. Note that VAE-based trajectory gener-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S208"></a>
**Source:** p.7 S208

**Original:** ation demonstrates a significant performance improvement over the diffusion-based. We argue the main reasons are as follows: 1) Compared with the conditional denoising process of diffusion, the latent space of VAE more directly and effectively aligns the reasoning information of VLM to the multi-modal action space. 2) The training process of VAE is inherently more stable, facilitating better alignment between the reasoning and action spaces. Surprisingly, even using diffusion, ORION still surpasses the DriveTransformer in Tab. 1 by +8.51 DS, +11.53% SR, and +8.08% average ability. This impressive result emphasizes the effectiveness and flexibility of our framework. Effectiveness of QT-Former designs. Tab. 3 shows the detailed ablations of each design in the introduced QTFormer. By leveraging explicit traffic state supervision (ID-2), ORION achieves 74.65 DS and 49.31% SR, which already outperforms DriveAdapter [22] and DriveTRansformer [25] by a large margin and makes an improvement of +18.32 and +23.26% compared with the base-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-8"></a>
### Page 8

<a id="C008"></a>
**Source:** p.8 C008

**Original:** Table 3. Ablation on QT-Former designs in different frameworks. DS and SR denote Driving Score and Success Rate separately. Traffic state means using explicit traffic state supervision. T: Plain Text, G: Instructed Generator ID 1 2 3 4 5 6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S209"></a>
**Source:** p.8 S209

**Original:** Traffic State

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S210"></a>
**Source:** p.8 S210

**Original:** Motion Pred.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S211"></a>
**Source:** p.8 S211

**Original:** Memory Bank

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S212"></a>
**Source:** p.8 S212

**Original:**   

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S213"></a>
**Source:** p.8 S213

**Original:**  

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S214"></a>
**Source:** p.8 S214

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S215"></a>
**Source:** p.8 S215

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S216"></a>
**Source:** p.8 S216

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S217"></a>
**Source:** p.8 S217

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S218"></a>
**Source:** p.8 S218

**Original:** Output type T

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S219"></a>
**Source:** p.8 S219

**Original:**  

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S220"></a>
**Source:** p.8 S220

**Original:** G

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S221"></a>
**Source:** p.8 S221

**Original:** DS ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S222"></a>
**Source:** p.8 S222

**Original:** SR(%) ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S223"></a>
**Source:** p.8 S223

**Original:**    

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S224"></a>
**Source:** p.8 S224

**Original:** 56.33 74.65 74.07 77.74 25.45 42.23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S225"></a>
**Source:** p.8 S225

**Original:** 26.05 49.31 49.77 54.62 10.38 13.14

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S226"></a>
**Source:** p.8 S226

**Original:** 0 8 16 32

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S227"></a>
**Source:** p.8 S227

**Original:** Closed-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S228"></a>
**Source:** p.8 S228

**Original:** ID

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S229"></a>
**Source:** p.8 S229

**Original:** Closed-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C009"></a>
**Source:** p.8 C009

**Original:** Table 4. Ablation of history queries number. DS and SR denote Driving Score and Success Rate separately. Query Num. Nh

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C010"></a>
**Source:** p.8 C010

**Original:** Table 5. Effectiveness of auxiliary VQA task training. DS and SR denote Driving Score and Success Rate separately. C/B/R refers to CIDEr/BLEU/ROUGE-L. FT: Fine Tuning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S230"></a>
**Source:** p.8 S230

**Original:** Open-loop

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S231"></a>
**Source:** p.8 S231

**Original:** DS ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S232"></a>
**Source:** p.8 S232

**Original:** SR(%) ↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S233"></a>
**Source:** p.8 S233

**Original:** Avg. L2 (m) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S234"></a>
**Source:** p.8 S234

**Original:** Avg. col (%)↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S235"></a>
**Source:** p.8 S235

**Original:** 65.10 68.09 74.10 62.46

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S236"></a>
**Source:** p.8 S236

**Original:** 38.83 39.09 44.66 37.73

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S237"></a>
**Source:** p.8 S237

**Original:** 0.67 0.66 0.68 0.65

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S238"></a>
**Source:** p.8 S238

**Original:** 0.61 0.62 0.55 0.73

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S239"></a>
**Source:** p.8 S239

**Original:** line (ID-1). This is because a better understanding of traffic signals helps ORION directly reduce infractions in closed-loop evaluation. It is worth noting that due to the causal confusion [22], it’s not trivial for previous methods to fully understand the corresponding causal relationships by simply introducing traffic state supervision, especially when encountering mixed expert behaviors before traffic signs [22, 23, 25, 64]. This result also proves that ORION can better utilize the reasoning ability of VLM to capture the causal relationship between scene information and driving behavior by aligning reasoning space and action space. This conclusion also can be verified by the results in Tab. 1, where ORION shows a significant advantage in traffic sign ability (+17.05%) compared to previous E2E methods [25]. Then, we combine the motion prediction module in the QT-Former’s perception head, which gains a slight improvement of +0.4% SR and further reduces the collision rate. The slight degradation on DS may be caused by the trade-off between DS and SR in the CARLA benchmark protocol [74]. Involving a memory bank into QT-Former and supervised by QA pairs about historical information leads to an increase of +3.67 DS and +4.85% SR and boosts the final performance to 77.74 DS and 54.62% SR, which demonstrates our model can benefit from the long-temporal memory of vision tokens. We also apply QT-former to the plain text output type. By leveraging its design, we improve the model’s performance by 16.78 DS and 2.78% SR over the baseline (ID5). Meanwhile, with the same QT-former designs, our ORION framework achieves further improvements of 35.51

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S240"></a>
**Source:** p.8 S240

**Original:** 1 2 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S241"></a>
**Source:** p.8 S241

**Original:** VQA Planning Closed-loop FT FT DS ↑ SR(%) ↑  

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S242"></a>
**Source:** p.8 S242

**Original:**  

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S243"></a>
**Source:** p.8 S243

**Original:** 74.10 77.74

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S244"></a>
**Source:** p.8 S244

**Original:** 44.66 54.62

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S245"></a>
**Source:** p.8 S245

**Original:** Language C↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S246"></a>
**Source:** p.8 S246

**Original:** B↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S247"></a>
**Source:** p.8 S247

**Original:** Open-loop R↑

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S248"></a>
**Source:** p.8 S248

**Original:** 65.65 50.82 77.65 65.77 52.49 77.58

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S249"></a>
**Source:** p.8 S249

**Original:** Avg. L2 (m) ↓ 0.68 0.68

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S250"></a>
**Source:** p.8 S250

**Original:** DS and 41.48% SR compared with the plain text output mode, demonstrating the effectiveness of our approach. Influence of history queries number. We conduct ablation experiments to further study the influence of the historical token number. Here, to accelerate the training process, we only train the model by the planning trajectory and history QA pairs without other auxiliary VQA tasks. The results are detailed in Tab. 4. Increasing the historical query number Nh from 0 to 8 brings a significant performance boost around 2.99 DS and 0.26% SR. Further increasing Nh from 8 to 16 leads to the sweet point that achieves the best performance of 74.10 DS and 44.66% SR. However, enlarging Nh from 16 to 32 shows a significant performance degradation. We argue that introducing more historical queries hinders the VLM from capturing the current frame features and latent space optimization in the generative planner. Influence between VQA task training and planning task training. As shown in Tab. 5. The model cannot obtain both reasoning and planning capabilities with single-task training. Surprisingly, when we train on two tasks simultaneously during training, ORION achieves better performance in both planning and language metrics compared to singletask training. Specifically, the multi-task training leads to improvements of +3.64 DS and +9.66% SR in the planning task, as well as a performance gain of +0.98 CIDEr, +2.56 BLEU, and +0.92 ROUGR-L in the VQA tasks. Furthermore, the results also validate the high quality and validity of the Chat-B2D dataset produced by our auto-pipeline.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S251"></a>
**Source:** p.8 S251

**Original:** 5. Conclusion This paper focuses on the challenge of aligning the reasoning space of VLM with the action space in E2E autonomous driving. This dilemma hinders existing methods from simultaneously understanding driving scenarios and generating high-quality multimodal trajectories. To tackle this, we introduce ORION, a holistic end-to-end autonomous driving framework by vision-language instructed action generation. By leveraging the proposed QT-Former and generative planner, we effectively bridge the vision-reasoning-action space. Extensive experiments show that ORION outperforms SOTA methods in closed-loop planning, demonstrating its effectiveness and flexibility.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-9"></a>
### Page 9

<a id="S252"></a>
**Source:** p.9 S252

**Original:** 6. Acknowledgments This work was supported by the NSFC (62225603 and 623B2038).

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S253"></a>
**Source:** p.9 S253

**Original:** References [1] Josh Achiam, Steven Adler, Sandhini Agarwal, Lama Ahmad, Ilge Akkaya, Florencia Leoni Aleman, Diogo Almeida, Janko Altenschmidt, Sam Altman, Shyamal Anadkat, et al. Gpt-4 technical report. arXiv preprint arXiv:2303.08774, 2023. 1, 2 [2] Jean-Baptiste Alayrac, Jeff Donahue, Pauline Luc, Antoine Miech, Iain Barr, Yana Hasson, Karel Lenc, Arthur Mensch, Katherine Millican, Malcolm Reynolds, et al. Flamingo: a visual language model for few-shot learning. In Proc. of Advances in Neural Information Processing Systems, 2022. 3 [3] Rohan Anil, Sebastian Borgeaud, Yonghui Wu, JeanBaptiste Alayrac, Jiahui Yu, Radu Soricut, Johan Schalkwyk, Andrew M Dai, Anja Hauth, Katie Millican, et al. Gemini: A family of highly capable multimodal models. arXiv preprint arXiv:2312.11805, 1, 2023. 2, 3 [4] Jinze Bai, Shuai Bai, Shusheng Yang, Shijie Wang, Sinan Tan, Peng Wang, Junyang Lin, Chang Zhou, and Jingren Zhou. Qwen-vl: A frontier large vision-language model with versatile abilities. arXiv preprint arXiv:2308.12966, 2023. 3 [5] James Betker, Gabriel Goh, Li Jing, Tim Brooks, Jianfeng Wang, Linjie Li, Long Ouyang, Juntang Zhuang, Joyce Lee, Yufei Guo, et al. Improving image generation with better captions. Computer Science., page 8, 2023. 4 [6] Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy Groom, Karol Hausman, Brian Ichter, et al. π0 : A vision-languageaction flow model for general robot control. arXiv preprint arXiv:2410.24164, 2024. 3 [7] Holger Caesar, Varun Bankiti, Alex H Lang, Sourabh Vora, Venice Erin Liong, Qiang Xu, Anush Krishnan, Yu Pan, Giancarlo Baldan, and Oscar Beijbom. nuscenes: A multimodal dataset for autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 11621–11631, 2020. 1, 5 [8] Yuning Chai, Benjamin Sapp, Mayank Bansal, and Dragomir Anguelov. Multipath: Multiple probabilistic anchor trajectory hypotheses for behavior prediction. arXiv preprint arXiv:1910.05449, 2019. 1 [9] Shaoyu Chen, Bo Jiang, Hao Gao, Bencheng Liao, Qing Xu, Qian Zhang, Chang Huang, Wenyu Liu, and Xinggang Wang. Vadv2: End-to-end vectorized autonomous driving via probabilistic planning. arXiv preprint arXiv:2402.13243, 2024. 1, 2, 7 [10] Zhe Chen, Weiyun Wang, Hao Tian, Shenglong Ye, Zhangwei Gao, Erfei Cui, Wenwen Tong, Kongzhi Hu, Jiapeng Luo, Zheng Ma, et al. How far are we to gpt-4v? closing the gap to commercial multimodal models with open-source suites. Science China Information Sciences, page 220101, 2024. 2 [11] Zhe Chen, Jiannan Wu, Wenhai Wang, Weijie Su, Guo Chen, Sen Xing, Muyan Zhong, Qinglong Zhang, Xizhou Zhu,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S254"></a>
**Source:** p.9 S254

**Original:** [12]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S255"></a>
**Source:** p.9 S255

**Original:** [13]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S256"></a>
**Source:** p.9 S256

**Original:** [14]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S257"></a>
**Source:** p.9 S257

**Original:** [15]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S258"></a>
**Source:** p.9 S258

**Original:** [16]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S259"></a>
**Source:** p.9 S259

**Original:** [17]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S260"></a>
**Source:** p.9 S260

**Original:** [18]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S261"></a>
**Source:** p.9 S261

**Original:** [19]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S262"></a>
**Source:** p.9 S262

**Original:** [20]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S263"></a>
**Source:** p.9 S263

**Original:** [21]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S264"></a>
**Source:** p.9 S264

**Original:** [22]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S265"></a>
**Source:** p.9 S265

**Original:** [23]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S266"></a>
**Source:** p.9 S266

**Original:** Lewei Lu, et al. Internvl: Scaling up vision foundation models and aligning for generic visual-linguistic tasks. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 24185–24198, 2024. 1, 2 Alexey Dosovitskiy, German Ros, Felipe Codevilla, Antonio Lopez, and Vladlen Koltun. Carla: An open urban driving simulator. In Conf. on Robot Learning, pages 1–16, 2017. 2, 5 Yuxin Fang, Quan Sun, Xinggang Wang, Tiejun Huang, Xinlong Wang, and Yue Cao. Eva-02: A visual representation for neon genesis. Image and Vision Computing, page 105171, 2024. 5 Simon Frieder, Luca Pinchetti, Ryan-Rhys Griffiths, Tommaso Salvatori, Thomas Lukasiewicz, Philipp Petersen, and Julius Berner. Mathematical capabilities of chatgpt. In Proc. of Advances in Neural Information Processing Systems, 2023. 6 Ian Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, and Yoshua Bengio. Generative adversarial networks. Communications of the ACM, pages 139–144, 2020. 4 Junru Gu, Chenxu Hu, Tianyuan Zhang, Xuanyao Chen, Yilun Wang, Yue Wang, and Hang Zhao. Vip3d: End-to-end visual trajectory prediction via 3d agent queries. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 5496–5506, 2023. 1 Edward J Hu, Yelong Shen, Phillip Wallis, Zeyuan AllenZhu, Yuanzhi Li, Shean Wang, Lu Wang, and Weizhu Chen. Lora: Low-rank adaptation of large language models. In Proc. of Intl. Conf. on Learning Representations, 2022. 5 Shengchao Hu, Li Chen, Penghao Wu, Hongyang Li, Junchi Yan, and Dacheng Tao. St-p3: End-to-end vision-based autonomous driving via spatial-temporal feature learning. In Proc. of European Conference on Computer Vision, pages 533–549, 2022. 1 Yihan Hu, Jiazhi Yang, Li Chen, Keyu Li, Chonghao Sima, Xizhou Zhu, Siqi Chai, Senyao Du, Tianwei Lin, Wenhai Wang, et al. Planning-oriented autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 17853–17862, 2023. 1, 2, 5, 6 Jyh-Jing Hwang, Runsheng Xu, Hubert Lin, Wei-Chih Hung, Jingwei Ji, Kristy Choi, Di Huang, Tong He, Paul Covington, Benjamin Sapp, et al. Emma: End-to-end multimodal model for autonomous driving. arXiv preprint arXiv:2410.23262, 2024. 1, 2, 3, 6 Bernhard Jaeger, Kashyap Chitta, and Andreas Geiger. Hidden biases of end-to-end driving models. In Porc. of IEEE Intl. Conf. on Computer Vision, pages 8240–8249, 2023. 7 Xiaosong Jia, Yulu Gao, Li Chen, Junchi Yan, Patrick Langechuan Liu, and Hongyang Li. Driveadapter: Breaking the coupling barrier of perception and planning in end-to-end autonomous driving. In Porc. of IEEE Intl. Conf. on Computer Vision, 2023. 2, 6, 7, 8 Xiaosong Jia, Penghao Wu, Li Chen, Jiangwei Xie, Conghui He, Junchi Yan, and Hongyang Li. Think twice before driving: Towards scalable decoders for end-to-end autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, 2023. 2, 6, 8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-10"></a>
### Page 10

<a id="S267"></a>
**Source:** p.10 S267

**Original:** [24] Xiaosong Jia, Zhenjie Yang, Qifeng Li, Zhiyuan Zhang, and Junchi Yan. Bench2drive: Towards multi-ability benchmarking of closed-loop end-to-end autonomous driving. In Proc. of Advances in Neural Information Processing Systems, 2024. 1, 5 [25] Xiaosong Jia, Junqi You, Zhiyuan Zhang, and Junchi Yan. Drivetransformer: Unified transformer for scalable end-toend autonomous driving. In Proc. of Intl. Conf. on Learning Representations, 2025. 2, 5, 6, 7, 8 [26] Bo Jiang, Shaoyu Chen, Qing Xu, Bencheng Liao, Jiajie Chen, Helong Zhou, Qian Zhang, Wenyu Liu, Chang Huang, and Xinggang Wang. Vad: Vectorized scene representation for efficient autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 8340– 8350, 2023. 1, 2, 3, 5, 6, 7 [27] Bo Jiang, Shaoyu Chen, Bencheng Liao, Xingyu Zhang, Wei Yin, Qian Zhang, Chang Huang, Wenyu Liu, and Xinggang Wang. Senna: Bridging large vision-language models and end-to-end autonomous driving. arXiv preprint arXiv:2410.22313, 2024. 2, 3, 6 [28] Xiaohui Jiang, Shuailin Li, Yingfei Liu, Shihao Wang, Fan Jia, Tiancai Wang, Lijin Han, and Xiangyu Zhang. Far3d: Expanding the horizon for surround-view 3d object detection. In Proc. of the AAAI Conf. on Artificial Intelligence, pages 2561–2569, 2024. 1 [29] Diederik P Kingma. Auto-encoding variational bayes. arXiv preprint arXiv:1312.6114, 2013. 2, 4 [30] Qifeng Li, Xiaosong Jia, Shaobo Wang, and Junchi Yan. Think2drive: Efficient reinforcement learning by thinking with latent world model for autonomous driving (in carlav2). In Proc. of European Conference on Computer Vision, pages 142–158, 2024. 6 [31] Zhang Li, Biao Yang, Qiang Liu, Zhiyin Ma, Shuo Zhang, Jingxu Yang, Yabo Sun, Yuliang Liu, and Xiang Bai. Monkey: Image resolution and text label are important things for large multi-modal models. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 26763– 26773, 2024. 2 [32] Zhiqi Li, Zhiding Yu, Shiyi Lan, Jiahan Li, Jan Kautz, Tong Lu, and Jose M Alvarez. Is ego status all you need for openloop end-to-end autonomous driving? In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 14864–14873, 2024. 2 [33] Bencheng Liao, Shaoyu Chen, Haoran Yin, Bo Jiang, Cheng Wang, Sixu Yan, Xinbang Zhang, Xiangyu Li, Ying Zhang, Qian Zhang, et al. Diffusiondrive: Truncated diffusion model for end-to-end autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, 2025. 2 [34] Chin-Yew Lin. Rouge: A package for automatic evaluation of summaries. In Proc. Annual Meeting of the Association for Computational Linguistics Workshop, pages 74–81, 2004. 5 [35] Tsung-Yi Lin, Priya Goyal, Ross Girshick, Kaiming He, and Piotr Dollár. Focal loss for dense object detection. In Porc. of IEEE Intl. Conf. on Computer Vision, pages 2980–2988, 2017. 5 [36] Haotian Liu, Chunyuan Li, Qingyang Wu, and Yong Jae Lee.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S268"></a>
**Source:** p.10 S268

**Original:** [37]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S269"></a>
**Source:** p.10 S269

**Original:** [38]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S270"></a>
**Source:** p.10 S270

**Original:** [39]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S271"></a>
**Source:** p.10 S271

**Original:** [40]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S272"></a>
**Source:** p.10 S272

**Original:** [41]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S273"></a>
**Source:** p.10 S273

**Original:** [42]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S274"></a>
**Source:** p.10 S274

**Original:** [43]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S275"></a>
**Source:** p.10 S275

**Original:** [44]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S276"></a>
**Source:** p.10 S276

**Original:** [45]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S277"></a>
**Source:** p.10 S277

**Original:** [46]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S278"></a>
**Source:** p.10 S278

**Original:** [47]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S279"></a>
**Source:** p.10 S279

**Original:** [48]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S280"></a>
**Source:** p.10 S280

**Original:** Visual instruction tuning. In Proc. of Advances in Neural Information Processing Systems, 2023. 2 Haotian Liu, Chunyuan Li, Yuheng Li, Bo Li, Yuanhan Zhang, Sheng Shen, and Yong Jae Lee. Llava-next: Improved reasoning, ocr, and world knowledge, 2024. 2 Yingfei Liu, Tiancai Wang, Xiangyu Zhang, and Jian Sun. Petr: Position embedding transformation for multi-view 3d object detection. In Proc. of European Conference on Computer Vision, pages 531–548, 2022. 4 Yixin Liu, Kai Zhang, Yuan Li, Zhiling Yan, Chujie Gao, Ruoxi Chen, Zhengqing Yuan, Yue Huang, Hanchi Sun, Jianfeng Gao, et al. Sora: A review on background, technology, limitations, and opportunities of large vision models. arXiv preprint arXiv:2402.17177, 2024. 2, 4 Haoyu Lu, Wen Liu, Bo Zhang, Bingxuan Wang, Kai Dong, Bo Liu, Jingxiang Sun, Tongzheng Ren, Zhuoshu Li, Hao Yang, et al. Deepseek-vl: towards real-world visionlanguage understanding. arXiv preprint arXiv:2403.05525, 2024. 1, 2 Jianbiao Mei, Yukai Ma, Xuemeng Yang, Licheng Wen, Xinyu Cai, Xin Li, Daocheng Fu, Bo Zhang, Pinlong Cai, Min Dou, et al. Continuously learning, adapting, and improving: A dual-process approach to autonomous driving. In Proc. of Advances in Neural Information Processing Systems, 2024. 2 Kishore Papineni, Salim Roukos, Todd Ward, and Wei-Jing Zhu. Bleu: a method for automatic evaluation of machine translation. In Proc. Annual Meeting of the Association for Computational Linguistics, pages 311–318, 2002. 5 Shuai Peng, Ke Yuan, Liangcai Gao, and Zhi Tang. Mathbert: A pre-trained model for mathematical formula understanding. arXiv preprint arXiv:2105.00377, 2021. 6 Jonah Philion and Sanja Fidler. Lift, splat, shoot: Encoding images from arbitrary camera rigs by implicitly unprojecting to 3d. In Proc. of European Conference on Computer Vision, pages 194–210, 2020. 1 Aditya Prakash, Kashyap Chitta, and Andreas Geiger. Multimodal fusion transformer for end-to-end autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 7077–7087, 2021. 1 Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, et al. Learning transferable visual models from natural language supervision. In Proc. of Intl. Conf. on Machine Learning, pages 8748–8763, 2021. 1, 2 Katrin Renz, Long Chen, Ana-Maria Marcu, Jan Hünermann, Benoit Hanotte, Alice Karnsund, Jamie Shotton, Elahe Arani, and Oleg Sinavski. Carllava: Vision language models for camera-only closed-loop driving. arXiv preprint arXiv:2406.10165, 2024. 6, 7 Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, and Björn Ommer. High-resolution image synthesis with latent diffusion models. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 10684–10695, 2022. 2, 4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-11"></a>
### Page 11

<a id="S281"></a>
**Source:** p.11 S281

**Original:** [49] Olaf Ronneberger, Philipp Fischer, and Thomas Brox. Unet: Convolutional networks for biomedical image segmentation. In Proc. of Intl. Conf. on Medical Image Computing and Computer Assisted Intervention, pages 234–241, 2015. 2, 4 [50] Hao Shao, Yuxuan Hu, Letian Wang, Guanglu Song, Steven L Waslander, Yu Liu, and Hongsheng Li. Lmdrive: Closed-loop end-to-end driving with large language models. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 15120–15130, 2024. 3 [51] Shaoshuai Shi, Li Jiang, Dengxin Dai, and Bernt Schiele. Motion transformer with global intention localization and local movement refinement. In Proc. of Advances in Neural Information Processing Systems, pages 6531–6543, 2022. 1 [52] Enxin Song, Wenhao Chai, Guanhong Wang, Yucheng Zhang, Haoyang Zhou, Feiyang Wu, Haozhe Chi, Xun Guo, Tian Ye, Yanting Zhang, et al. Moviechat: From dense token to sparse memory for long video understanding. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 18221–18232, 2024. 4 [53] Ziying Song, Caiyan Jia, Lin Liu, Hongyu Pan, Yongchang Zhang, Junming Wang, Xingyu Zhang, Shaoqing Xu, Lei Yang, and Yadan Luo. Don’t shake the wheel: Momentumaware planning in end-to-end autonomous driving. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, 2025. 6 [54] Yixuan Su, Tian Lan, Yan Wang, Dani Yogatama, Lingpeng Kong, and Nigel Collier. A contrastive framework for neural text generation. In Proc. of Advances in Neural Information Processing Systems, pages 21548–21561, 2022. 2 [55] Pei Sun, Henrik Kretzschmar, Xerxes Dotiwalla, Aurelien Chouard, Vijaysai Patnaik, Paul Tsui, James Guo, Yin Zhou, Yuning Chai, Benjamin Caine, et al. Scalability in perception for autonomous driving: Waymo open dataset. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 2446–2454, 2020. 1 [56] Xiaoyu Tian, Junru Gu, Bailin Li, Yicheng Liu, Yang Wang, Zhiyong Zhao, Kun Zhan, Peng Jia, Xianpeng Lang, and Hang Zhao. Drivevlm: The convergence of autonomous driving and large vision-language models. arXiv preprint arXiv:2402.12289, 2024. 3 [57] Hugo Touvron, Louis Martin, Kevin Stone, Peter Albert, Amjad Almahairi, Yasmine Babaei, Nikolay Bashlykov, Soumya Batra, Prajjwal Bhargava, Shruti Bhosale, et al. Llama 2: Open foundation and fine-tuned chat models. arXiv preprint arXiv:2307.09288, 2023. 2 [58] Ramakrishna Vedantam, C Lawrence Zitnick, and Devi Parikh. Cider: Consensus-based image description evaluation. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, pages 4566–4575, 2015. 5 [59] Peng Wang, Shuai Bai, Sinan Tan, Shijie Wang, Zhihao Fan, Jinze Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, et al. Qwen2-vl: Enhancing vision-language model’s perception of the world at any resolution. arXiv preprint arXiv:2409.12191, 2024. 1, 2, 3, 4 [60] Shihao Wang, Yingfei Liu, Tiancai Wang, Ying Li, and Xiangyu Zhang. Exploring object-centric temporal modeling

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S282"></a>
**Source:** p.11 S282

**Original:** [61]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S283"></a>
**Source:** p.11 S283

**Original:** [62]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S284"></a>
**Source:** p.11 S284

**Original:** [63]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S285"></a>
**Source:** p.11 S285

**Original:** [64]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S286"></a>
**Source:** p.11 S286

**Original:** [65]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S287"></a>
**Source:** p.11 S287

**Original:** [66]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S288"></a>
**Source:** p.11 S288

**Original:** [67]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S289"></a>
**Source:** p.11 S289

**Original:** [68]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S290"></a>
**Source:** p.11 S290

**Original:** [69]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S291"></a>
**Source:** p.11 S291

**Original:** [70]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S292"></a>
**Source:** p.11 S292

**Original:** [71]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S293"></a>
**Source:** p.11 S293

**Original:** for efficient multi-view 3d object detection. In Porc. of IEEE Intl. Conf. on Computer Vision, pages 3621–3631, 2023. 3, 4, 5 Shihao Wang, Zhiding Yu, Xiaohui Jiang, Shiyi Lan, Min Shi, Nadine Chang, Jan Kautz, Ying Li, and Jose M Alvarez. Omnidrive: A holistic llm-agent framework for autonomous driving with 3d perception, reasoning and planning. In Proc. of IEEE Intl. Conf. on Computer Vision and Pattern Recognition, 2024. 2, 3, 4, 5, 6 Wenhai Wang, Jiangwei Xie, ChuanYang Hu, Haoming Zou, Jianan Fan, Wenwen Tong, Yang Wen, Silei Wu, Hanming Deng, Zhiqi Li, et al. Drivemlm: Aligning multi-modal large language models with behavioral planning states for autonomous driving. arXiv preprint arXiv:2312.09245, 2023. 3 Jiannan Wu, Muyan Zhong, Sen Xing, Zeqiang Lai, Zhaoyang Liu, Zhe Chen, Wenhai Wang, Xizhou Zhu, Lewei Lu, Tong Lu, et al. Visionllm v2: An end-to-end generalist multimodal large language model for hundreds of visionlanguage tasks. Advances in Neural Information Processing Systems, 37:69925–69975, 2024. 3 Penghao Wu, Xiaosong Jia, Li Chen, Junchi Yan, Hongyang Li, and Yu Qiao. Trajectory-guided control prediction for end-to-end autonomous driving: A simple yet strong baseline. In Proc. of Advances in Neural Information Processing Systems, 2022. 2, 6, 8 Shuo Xing, Chengyuan Qian, Yuping Wang, Hongyuan Hua, Kexin Tian, Yang Zhou, and Zhengzhong Tu. Openemma: Open-source multimodal model for end-to-end autonomous driving. In Proc. of IEEE Winter Conf. on Applications of Computer Vision, pages 1001–1009, 2025. 2, 3 Jiang-Tian Zhai, Ze Feng, Jinhao Du, Yongqiang Mao, Jiang-Jiang Liu, Zichang Tan, Yifu Zhang, Xiaoqing Ye, and Jingdong Wang. Rethinking the open-loop evaluation of end-to-end autonomous driving in nuscenes. arXiv preprint arXiv:2305.10430, 2023. 2, 6 Xiaohua Zhai, Basil Mustafa, Alexander Kolesnikov, and Lucas Beyer. Sigmoid loss for language image pre-training. In Porc. of IEEE Intl. Conf. on Computer Vision, pages 11975–11986, 2023. 1, 2 Diankun Zhang, Zhijie Zheng, Haoyu Niu, Xueqing Wang, and Xiaojun Liu. Fully sparse transformer 3-d detector for lidar point cloud. IEEE Transactions on Geoscience and Remote Sensing, 61:1–12, 2023. 1 Diankun Zhang, Guoan Wang, Runwen Zhu, Jianbo Zhao, Xiwu Chen, Siyu Zhang, Jiahao Gong, Qibin Zhou, Wenyuan Zhang, Ningzi Wang, et al. Sparsead: Sparse query-centric paradigm for efficient end-to-end autonomous driving. arXiv preprint arXiv:2404.06892, 2024. 1 Zhejun Zhang, Alexander Liniger, Dengxin Dai, Fisher Yu, and Luc Van Gool. End-to-end urban driving by imitating a reinforcement learning coach. In Porc. of IEEE Intl. Conf. on Computer Vision, 2021. 2 Lianmin Zheng, Wei-Lin Chiang, Ying Sheng, Siyuan Zhuang, Zhanghao Wu, Yonghao Zhuang, Zi Lin, Zhuohan Li, Dacheng Li, Eric Xing, et al. Judging llm-as-a-judge with mt-bench and chatbot arena. In Proc. of Advances in Neural

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-12"></a>
### Page 12

<a id="S294"></a>
**Source:** p.12 S294

**Original:** [72]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S295"></a>
**Source:** p.12 S295

**Original:** [73]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S296"></a>
**Source:** p.12 S296

**Original:** [74]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S297"></a>
**Source:** p.12 S297

**Original:** [75]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S298"></a>
**Source:** p.12 S298

**Original:** Information Processing Systems, pages 46595–46623, 2023. 5 Wenzhao Zheng, Ruiqi Song, Xianda Guo, Chenming Zhang, and Long Chen. Genad: Generative end-to-end autonomous driving. In Proc. of European Conference on Computer Vision, pages 87–104, 2024. 1, 2, 5, 6 Xin Zhou, Dingkang Liang, Sifan Tu, Xiwu Chen, Yikang Ding, Dingyuan Zhang, Feiyang Tan, Hengshuang Zhao, and Xiang Bai. Hermes: A unified self-driving world model for simultaneous 3d scene understanding and generation. In Porc. of IEEE Intl. Conf. on Computer Vision, 2025. 3 Julian Zimmerlin, Jens Beißwenger, Bernhard Jaeger, Andreas Geiger, and Kashyap Chitta. Hidden biases of endto-end driving datasets. arXiv preprint arXiv:2412.09602, 2024. 8 Brianna Zitkovich, Tianhe Yu, Sichun Xu, Peng Xu, Ted Xiao, Fei Xia, Jialin Wu, Paul Wohlhart, Stefan Welker, Ayzaan Wahid, et al. Rt-2: Vision-language-action models transfer web knowledge to robotic control. In Conference on Robot Learning, pages 2165–2183. PMLR, 2023. 1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

## 阅读提示

- 当前文件的价值是稳定保存全文页码与段落锚点，并提供一个经人工复核的开篇双语块。
- 未翻译段落、图表、表格和公式都在 `translation_notes.md` 中登记；完成前不应把本文件标记为正式全文译读。
- 博客笔记可作为研究路线导读，但数值结论仍应回到本读者的具体页码块和原 PDF 核验。
