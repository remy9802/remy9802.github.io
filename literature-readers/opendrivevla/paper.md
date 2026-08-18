# OpenDriveVLA: Towards End-to-End Autonomous Driving with Large Vision Language Action Model｜全文双语阅读器（draft）

> **状态：source-mapped draft。** 已完成全文页段映射与开篇核心段落人工翻译；其余逐段翻译、图表紧裁和公式转写均显式标为待处理。本文不是摘要替代品。

## 文献元数据

- **作者 / 机构**：Xingcheng Zhou、Xuyuan Han、Feng Yang、Yunpu Ma、Volker Tresp、Alois Knoll；TUM、LMU Munich
- **年份 / 载体**：2026；AAAI 2026
- **原文**：[官方来源](https://ojs.aaai.org/index.php/AAAI/article/view/38386)
- **原博客笔记**：[中文文献笔记](../../_posts/2026-08-18-opendrivevla.md)
- **源文件**：`/tmp/literature-vla-pdfs/opendrivevla.pdf`（9 页，可检索文本 PDF）

## 页面索引

[p.1](#page-1) · [p.2](#page-2) · [p.3](#page-3) · [p.4](#page-4) · [p.5](#page-5) · [p.6](#page-6) · [p.7](#page-7) · [p.8](#page-8) · [p.9](#page-9)

## 术语表

| Canonical term | 中文 | 首次使用 / 决定 |
|---|---|---|
| spatially-grounded | 空间接地的 | 指输出与三维场景实体和位置对应 |
| instance-aware | 实例感知 | 与 instance-agnostic 区分 |
| agent-environment-ego interaction | 智能体-环境-自车交互 | 三元交互保持连字符结构 |
| open-loop planning | 开环规划 | 与闭环评测区分 |

## 全文逐段对照

<a id="page-1"></a>
### Page 1

<a id="S001"></a>
**Source:** p.1 S001 · Abstract

**Original:** We present OpenDriveVLA, a Vision-Language Action (VLA) model designed for end-to-end autonomous driving, built upon open-source large language models. OpenDriveVLA generates spatially-grounded driving actions by leveraging multimodal inputs, including both 2D and 3D instance-aware visual representations, ego vehicle states, and language commands. To bridge the modality gap between driving visual representations and language embeddings, we introduce a hierarchical vision-language alignment process, projecting both 2D and 3D structured visual tokens into a unified semantic space. Furthermore, we incorporate structured agent–environment–ego interaction modeling into the autoregressive decoding process, enabling the model to capture fine-grained spatial dependencies and behavior-aware dynamics critical for reliable trajectory planning. Extensive experiments on the nuScenes dataset demonstrate that OpenDriveVLA achieves state-of-the-art results across open-loop trajectory planning and driving-related question-answering tasks. Qualitative analyses further illustrate its superior capability to follow high-level driving commands and generate trajectories under challenging scenarios, highlighting its potential for next-generation end-to-end autonomous driving.

**中文:** 本文提出 OpenDriveVLA：一个建立在开源大语言模型之上的端到端自动驾驶视觉-语言-动作（VLA）模型。OpenDriveVLA 利用二维和三维实例感知视觉表示、自车状态及语言命令等多模态输入，生成具有空间接地的驾驶动作。为弥合驾驶视觉表示与语言嵌入之间的模态差距，作者设计了分层视觉-语言对齐流程，将二维和三维结构化视觉 token 投影到统一语义空间。此外，模型把结构化的智能体-环境-自车交互建模融入自回归解码，使其能够捕捉可靠轨迹规划所需的细粒度空间依赖和行为感知动力学。nuScenes 上的大量实验显示，OpenDriveVLA 在开环轨迹规划及驾驶问答任务上取得当时最优结果；定性分析还表明，它能在挑战性场景中遵循高层驾驶指令并生成轨迹。

<a id="S002"></a>
**Source:** p.1 S002

**Original:** The Fortieth AAAI Conference on Artificial Intelligence (AAAI-26)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S003"></a>
**Source:** p.1 S003

**Original:** OpenDriveVLA: Towards End-to-end Autonomous Driving with Large Vision Language Action Model Xingcheng Zhou1 * , Xuyuan Han1 , Feng Yang1 , Yunpu Ma2 , Volker Tresp2 , Alois Knoll1 1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S004"></a>
**Source:** p.1 S004

**Original:** Technical University of Munich, Germany Ludwig Maximilian University of Munich, Germany {xingcheng.zhou, xuyuan.han}@tum.de

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S005"></a>
**Source:** p.1 S005

**Original:** Abstract

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S006"></a>
**Source:** p.1 S006

**Original:** 2024). However, directly leveraging existing VLMs for autonomous driving poses fundamental challenges. Firstly, current VLMs are predominantly optimized for static, 2D image-language tasks, leading to poor spatial reasoning performance in dynamic 3D driving environments (Zhai et al. 2023b). Besides, instance-agnostic VLMs (Liu et al. 2024c) are prone to hallucinations, often yielding incorrect yet overconfident outputs, posing safety risks in autonomous driving. Motivated by these limitations, our work answers a central question: How can we harness the emergent capabilities of large VLMs to produce safe spatially-grounded driving actions in dynamic 3D environments, while balancing inference speed and planning effectiveness? To enhance spatial-awareness and safety in LLM-based vision-language action model, we introduce two key designs. First, we structure the driving environment using instance-aware, hierarchical 2D and 3D visual representations to reduce the risk of instance hallucinations. Second, we incorporate agent–environment–ego interaction modeling, which is originally explicitly modeled in traditional endto-end driving systems, as an auxiliary objective into the autoregressive LLM training pipeline. It enables the model to internalize physical feasibility and dynamic multi-agent interactions, improving robustness in safety-critical scenarios. Built upon open-source large language models, OpenDriveVLA tightly integrates spatially-grounded multimodal reasoning and driving trajectory generation within a unified autoregressive framework. Unlike prior VLM-based methods, OpenDriveVLA leverages structured 2D and 3D instance-aware representations, ego vehicle states, and highlevel commands to directly produce reliable driving actions. Extensive experiments on nuScenes benchmark demonstrate that OpenDriveVLA achieves state-of-the-art performance in both open-loop planning and vision-language reasoning tasks. Our key contributions are:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S007"></a>
**Source:** p.1 S007

**Original:** Project Page — https://drivevla.github.io

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S008"></a>
**Source:** p.1 S008

**Original:** Introduction End-to-end learning frameworks have emerged as a promising paradigm in autonomous driving, enabling perception, prediction, and planning to be jointly optimized within a unified neural network (Zhou et al. 2024). They learn policies directly from sensor inputs and generalize well across varied scenarios. Despite notable progress, existing approaches still face critical challenges, including limited long-tail generalization, poor complex semantics understanding, and rigid task reasoning (Chen et al. 2024). Meanwhile, large language models (LLMs) and vision-language models (VLMs) exhibit strong in-context reasoning, commonsense understanding, and zero-shot generalization abilities. These capabilities are promising for driving, where robust scene understanding is crucial (Liu et al. 2024d; Zhou and Knoll

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S009"></a>
**Source:** p.1 S009

**Original:** • We present OpenDriveVLA, a 3D vision-language action model for end-to-end autonomous driving that generates reliable driving trajectories by integrating hierarchical visual input, ego state, and high-level language commands. • We develop a multi-stage training strategy that aligns structured 2D and 3D visual features into a unified semantic space, enabling naive VLMs to generate spatiallygrounded actions in complex driving scenarios.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S010"></a>
**Source:** p.1 S010

**Original:** * Corresponding

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S011"></a>
**Source:** p.1 S011

**Original:** author Copyright © 2026, Association for the Advancement of Artificial Intelligence (www.aaai.org). All rights reserved.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-2"></a>
### Page 2

<a id="S012"></a>
**Source:** p.2 S012

**Original:** • We introduce implicit agent–environment–ego interaction modeling into autoregressive LLM-based VLA training as an auxiliary task, enabling the model to learn behaviorally grounded and safety-aware driving actions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S013"></a>
**Source:** p.2 S013

**Original:** Related Work

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S014"></a>
**Source:** p.2 S014

**Original:** (a) VLM as additional Cap- (b) VLM as high-level driving decision-maker. tion or QA Head.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S015"></a>
**Source:** p.2 S015

**Original:** End-to-End Autonomous Driving Autonomous driving (AD) evolves through two distinct stages. Traditional approaches rely on a modular design, decomposing the system into perception (Li et al. 2022), prediction (Zhang et al. 2024b), and planning (Hu et al. 2021) components. While this structure ensures interpretability and allows for independent optimization, they suffer from cascading errors between stages and are not globally optimized for the final planning objective. In contrast, end-toend autonomous driving frameworks (Hu et al. 2023) address this by jointly optimizing perception, prediction, and planning within a unified neural network. These models learn driving policies directly from raw sensor inputs, which improves the model’s adaptability to diverse driving conditions. More recent approaches introduce diffusion models (Liao et al. 2024) and unified scene representations (Jia et al. 2025) to further enhance the effectiveness and robostness. However, existing end-to-end methods still face semantic reasoning bottlenecks, as they struggle to fully comprehend high-level scene semantics, infer complex agent interactions, and adapt to dynamic task requirements. Moreover, their decision-making processes remain opaque, making it difficult to diagnose failure cases, especially in longtail or unseen scenarios.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S016"></a>
**Source:** p.2 S016

**Original:** (c) Native 2D VLM for end- (d) 3D spatial-aware driving to-end driving. VLA (ours). Figure 1: Taxonomy of vision-language model applications in end-to-end autonomous driving.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S017"></a>
**Source:** p.2 S017

**Original:** Vision Language Models in Autonomous Driving VLMs have been applied to various autonomous driving tasks, including perception, scene description, synthetic data generation, and high-level decision-making (Zhou et al. 2024). These efforts aim to enhance interpretability, data efficiency, and instruction-following capabilities in driving models. We categorize recent works into 4 paradigms, as illustrated in Figure 1. One line of research in Fig.1 (a) integrates language heads, such as captioning or questionanswering modules, into driving models to enhance the interpretability (Ding et al. 2024). The second category in Fig.1 (b) employs vision language models to generate highlevel driving instructions, such as directional commands or abstract maneuvers, which are subsequently interpreted by separate planning modules into low-level controls (Jiang et al. 2024; Tian et al. 2024; Wang et al. 2023). It’s also usually formed as a fast-slow dual system. This design allows VLMs to make independent semantic reasoning, but retains a separate module for end-to-end driving planning, making joint optimization challenging. The third line in Fig.1 (c) applies native VLMs with 2D visual tokens to produce driving actions, and optionally scene captions or QA responses (Jin et al. 2023; Xu et al. 2024). These methods (Mei et al. 2024; Zhang et al. 2024a; Fu et al. 2025) process 2D images without explicit modeling of the instance, 3D spatial layout, and inter-agent interactions in the driving scene. It limits their spatial reasoning ability and understanding of agent dynamics in complex traffic environments. Recent studies (Favero et al. 2024) further indicate that such instance-agnostic approaches are more prone to hallucinate, often producing overconfident or semantically inconsistent text. In this work, we investigate how to extend 2D VLMs by explicitly modeling 3D instance-aware and spatial-aware scene representations into an end-to-end autonomous driving framework, as shown in Fig.1(d). Notably, we focus on fully differentiable end-to-end models in this work, while LLM-based agentic driving systems, such as (Wang et al. 2024; Sima et al. 2023), fall outside the scope of our study.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S018"></a>
**Source:** p.2 S018

**Original:** Large Vision Language Models Large Language Models demonstrated strong emergent capabilities in in-context learning, instruction following, and reasoning (Touvron et al. 2023; Yang, Yang, and et al. 2024). By training on vast amounts of Internet-scale data, these models acquire extensive world knowledge and exhibit strong adaptability across diverse tasks. Their success has also driven the rise of large VLMs, which extend these capabilities into cross-modal reasoning by integrating vision encoders with language models. State-of-the-art VLMs such as GPT-4V (OpenAI et al. 2024), LLaVA (Liu et al. 2024b), and Qwen-VL (Bai et al. 2023) demonstrate strong visual understanding and multimodal reasoning in open-domain tasks. However, these models are primarily trained on static 2D images or videos and exhibit limited spatial reasoning in dynamic 3D driving environments. Moreover, VLMs are prone to hallucinations and generally over-confident but incorrect descriptions, which pose serious risks in safetycritical planning scenarios. Recently, Vision-Language Action models have emerged to directly predict actions from visual inputs, demonstrating strong performance in robotic manipulation tasks (Kim et al. 2024). Currently, the application of such language-conditioned end-to-end action generation in autonomous driving remains underexplored. Yet, these methods are mostly limited to static setups and lack driving-specific 3D spatial design. 13783

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-3"></a>
### Page 3

<a id="C001"></a>
**Source:** p.3 C001

**Original:** Figure 2: OpenDriveVLA leverages open-source pre-trained language foundation models to generate driving actions conditioned on 3D environmental perception, ego vehicle states, and driver commands.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S019"></a>
**Source:** p.3 S019

**Original:** OpenDriveVLA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S020"></a>
**Source:** p.3 S020

**Original:** vironment. Global Scene Sampler encodes the surrounding driving scene context from multi-view 2D features, producing the scene token vscene = Qscene (f2D ). Agent QueryTransformer detects and tracks dynamic agents within i a }N the scene, extracting agent-centric tokens {vagent i=1 = Qagent (fbev ), where Na denotes the number of detected agents. In parallel, Map QueryTransformer extracts static structural information, such as lane boundaries and drivable areas, forming the map token vmap = Qmap (fbev ). Through vision-centric perception tasks, including 3D detection, tracking, and segmentation, the visual encoder produces structured environmental tokens that capture both dynamic agent behaviors and static map structures in a spatially grounded manner. The output tokens, denoted as Venv = {vscene , vagent , vmap }, serve as visual environment representation of the subsequent stages.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S021"></a>
**Source:** p.3 S021

**Original:** The overall architecture of OpenDriveVLA is shown in Figure 2, with its multi-stage training process further detailed in Figure 3. OpenDriveVLA uses a pre-trained vision encoder to extract tokenized environmental representations from multi-view images. These visual tokens are then aligned into the textual domain through cross-modal learning. After alignment, it undergoes driving instruction tuning, followed by agent-ego-environment interaction modeling. Finally, OpenDriveVLA is trained end-to-end to predict the ego vehicle’s future trajectory, guided by the aligned visual-language tokens and driving instructions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S022"></a>
**Source:** p.3 S022

**Original:** 3D Visual Environmental Perception Recent VLM-based autonomous driving methods typically rely on pretrained 2D visual encoders (Zhai et al. 2023b), where visual token selection and attention are indirectly guided through language supervision. While effective in open-domain vision-language applications, this design lacks explicit 3D spatial grounding and structured instance-level attention, which can lead to severe hallucinations in safetycritical driving scenarios (Xie et al. 2025). To mitigate this, OpenDriveVLA adopts a visual-centric query module, where the model first learns to focus on driving-relevant objects and map tokens through 3D vision tasks, ensuring reliable visual token proposal. Specifically, given a set of multi-view images I = {I i }N i=1 , the visual module first extracts multi-scale 2D features from each image using a shared 2D backbone, denoted as f2D . These 2D features are then aggregated across views and lifted into BEV space, producing the BEV feature fbev . To obtain structured environmental representations, we adopt three visual query modules: Global Scene Sampler Qscene , Agent QueryTransformer Qagent , and Map QueryTransformer Qmap . Each module extracts tokens focusing on a specific semantic aspect of the driving en-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S023"></a>
**Source:** p.3 S023

**Original:** Stage 1 - Hierarchical Vision-Language Alignment To bridge the modality gap between the extracted visual tokens and the word embedding space of a pre-trained LLM, we adopt a hierarchical vision-language feature alignment strategy. Given the visual tokens extracted from the 3D visual perception module, we introduce three token-specific projectors {Φscene , Φagent , Φmap }. During training, each active agent query from the 3D detection and tracking task i denoted as vagent , is also matched to its corresponding ground-truth caption Xiagent . These captions provide detailed descriptions, including 2D appearance descriptions and 3D spatial positions. For scene and map tokens, which encode holistic spatial context and static structural properties, a sample-wise alignment is applied, where each token is matched to a scene-level caption Xscene or Xmap . The scene token vscene captures the global 2D environmental context, while the map token vmap encodes structural elements such as lane topology, road boundaries, and drivable areas. Each of these tokens is aligned to its corresponding 13784

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-4"></a>
### Page 4

<a id="C002"></a>
**Source:** p.4 C002

**Original:** Figure 3: Illustration of main training stages on OpenDriveVLA. Stage 1: Hierarchical Feature Alignment. Stage 2: Driving Instruction Tuning. Stage 2.5: Agent-Env-Ego Interaction Modeling. Stage 3: Trajectory Planning Tuning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S024"></a>
**Source:** p.4 S024

**Original:** caption, denoted as Xscene and Xmap . During this stage, both the visual encoder and LLM remain frozen to preserve pretrained semantics, with only the token-specific projectors being trainable. The forward alignment step is formulated as follows: X̂k = LLM (Φk (vk )) , k ∈ {scene, map} (1)  i i X̂agent = LLM Φagent (vagent ) , i = 1, . . . , Na (2)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S025"></a>
**Source:** p.4 S025

**Original:** pre-trained LLMs lack an inherent inductive bias for spatial reasoning in 3D driving scenes, as they are predominantly trained on 2D vision-language and text-based datasets. We introduce a conditional agent trajectory forecasting task as an auxiliary objective, encouraging the model to learn spatially grounded interaction priors. During this stage, OpenDriveVLA captures the underlying structure of multi-agent dynamics, enhancing its capability for scene-aware trajectory generation and improving decision-making in complex traffic scenarios. Given scene and map tokens, as well as the ego vehicle state Sego , the LLM predicts the future motion of each detected agent based on its projected visual embedding i Φagent (vagent ). The future motion of agent ai is represented as a sequence of waypoints Wai . The predicted trajectory is conditioned on the scene context, map structure, and ego vehicle state, enabling OpenDriveVLA to infer interactionaware and spatially grounded motion sequences. The learning objective for the i-th agent is formulated as:

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S026"></a>
**Source:** p.4 S026

**Original:** Stage 2 - Driving Instruction Tuning We distill high-level driving knowledge into the model via supervised instruction tuning, enabling it to internalize semantic reasoning patterns during training. This avoids costly chain-of-thought (CoT) reasoning at inference time and balances planning efficacy with runtime efficiency. During the tuning process, driving knowledge from the language domain is injected into the model using a curated driving instruction QA dataset. The dataset covers a wide range of driving-related reasoning, including perception understanding, motion prediction, attention allocation, action reasoning, and high-level decision-making. By training on this diverse set of driving queries, OpenDriveVLA learns to contextualize the driving scene, follow commands, and generate semantically and behaviorally grounded planning decisions. We formulate the tuning data as instruction-response pairs {Xinput , Xanswer }, where Xinput = (Venv , Sego , Xquery ). Here, Xquery denotes the driving-related question, and Sego encodes the textual ego vehicle state. Given this multimodal input, the LLM autoregressively learns to generate the target response. During instruction tuning, the visual encoder remains frozen while the token-specific projectors and the LLM are set to be trainable. The instruction prediction process is as: X̂answer = LLM (Venv , Sego , Xquery )

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S027"></a>
**Source:** p.4 S027

**Original:** max

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S028"></a>
**Source:** p.4 S028

**Original:** T Y

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S029"></a>
**Source:** p.4 S029

**Original:** i i p wti | w1:t−1 , Venv , Sego , Φagent (vagent )

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S030"></a>
**Source:** p.4 S030

**Original:** 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S031"></a>
**Source:** p.4 S031

**Original:** (4)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S032"></a>
**Source:** p.4 S032

**Original:** t=1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S033"></a>
**Source:** p.4 S033

**Original:** This provides OpenDriveVLA with essential spatial priors, enabling it to bridge the gap between high-level semantic reasoning and physically grounded motion planning.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S034"></a>
**Source:** p.4 S034

**Original:** Stage 3 - End-to-end Trajectory Planning Tuning In this stage, OpenDriveVLA predicts ego trajectories as discrete waypoint sequences within a short horizon, denoted as Wego = {w1 , w2 , . . . , wT }. Each waypoint wt represents the 2D coordinates (xt , yt ) of the ego vehicle at time step t. The waypoints are tokenized into a sequence of discrete textual tokens for autoregressive generation in the LLM: T traj = Tokenizer(Wego ). The generation process is then cast as a causal sequence prediction task, where each token is predicted in a causal manner, conditioned on the visual perception tokens Venv , the ego state Sego , and the driving command Xdri .

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S035"></a>
**Source:** p.4 S035

**Original:** (3)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S036"></a>
**Source:** p.4 S036

**Original:** Stage 2.5 - Agent Environment Ego Interaction Reliable trajectory planning in autonomous driving necessitates a spatially grounded 3D representation of the environment. Beyond perception, it must also understand dynamic interactions between the ego vehicle and surrounding agents. Effective interaction modeling is essential to ensure that planned trajectories are both feasible and collisionfree under real-world driving constraints. However, existing 13785

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-5"></a>
### Page 5

<a id="S037"></a>
**Source:** p.5 S037

**Original:** ST-P3 metrics Method 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S038"></a>
**Source:** p.5 S038

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S039"></a>
**Source:** p.5 S039

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S040"></a>
**Source:** p.5 S040

**Original:** UniAD metrics

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S041"></a>
**Source:** p.5 S041

**Original:** Collision (%) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S042"></a>
**Source:** p.5 S042

**Original:** L2 (m) ↓ Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S043"></a>
**Source:** p.5 S043

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S044"></a>
**Source:** p.5 S044

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S045"></a>
**Source:** p.5 S045

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S046"></a>
**Source:** p.5 S046

**Original:** L2 (m) ↓ Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S047"></a>
**Source:** p.5 S047

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S048"></a>
**Source:** p.5 S048

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S049"></a>
**Source:** p.5 S049

**Original:** Collision (%) ↓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S050"></a>
**Source:** p.5 S050

**Original:** LLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S051"></a>
**Source:** p.5 S051

**Original:** Input

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S052"></a>
**Source:** p.5 S052

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S053"></a>
**Source:** p.5 S053

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S054"></a>
**Source:** p.5 S054

**Original:** 1s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S055"></a>
**Source:** p.5 S055

**Original:** 2s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S056"></a>
**Source:** p.5 S056

**Original:** 3s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S057"></a>
**Source:** p.5 S057

**Original:** Avg.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S058"></a>
**Source:** p.5 S058

**Original:** 1.65 1.41 2.54 2.78

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S059"></a>
**Source:** p.5 S059

**Original:** 1.03 0.81 1.43 1.60

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S060"></a>
**Source:** p.5 S060

**Original:** 0.05 0.08 0.06 0.04

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S061"></a>
**Source:** p.5 S061

**Original:** 0.17 0.15 0.17 0.09

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S062"></a>
**Source:** p.5 S062

**Original:** 0.71 0.84 1.07 0.88

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S063"></a>
**Source:** p.5 S063

**Original:** 0.31 0.36 0.43 0.33

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S064"></a>
**Source:** p.5 S064

**Original:** -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S065"></a>
**Source:** p.5 S065

**Original:** Visual Visual Ego Visual Visual LiDAR LiDAR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S066"></a>
**Source:** p.5 S066

**Original:** None-Autoregressive Methods 1.27 0.24 0.58 0.23 0.27 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S067"></a>
**Source:** p.5 S067

**Original:** 0.71 0.14 0.38 0.12 0.15 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S068"></a>
**Source:** p.5 S068

**Original:** 0.96 0.72 1.20 1.36

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S069"></a>
**Source:** p.5 S069

**Original:** ST-P3 (Hu et al. 2022) VAD (Jiang et al. 2023) Ego-MLP (Zhai et al. 2023a) UniAD (Hu et al. 2023) InsightDrive (Song et al. 2025) FF (Hu et al. 2021) EO (Khurana et al. 2022)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S070"></a>
**Source:** p.5 S070

**Original:** 1.33 0.17 0.46 0.44 0.23 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S071"></a>
**Source:** p.5 S071

**Original:** 2.11 0.34 0.76 0.67 0.41 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S072"></a>
**Source:** p.5 S072

**Original:** 2.90 0.60 1.12 0.96 0.68 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S073"></a>
**Source:** p.5 S073

**Original:** 2.11 0.37 0.78 0.69 0.44 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S074"></a>
**Source:** p.5 S074

**Original:** 0.23 0.07 0.21 0.04 0.09 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S075"></a>
**Source:** p.5 S075

**Original:** 0.62 0.10 0.35 0.08 0.10 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S076"></a>
**Source:** p.5 S076

**Original:** GPVL (Li et al. 2025) DriveVLM (Tian et al. 2024) GPT-Driver (Mao et al. 2023) RDA-Driver (Huang et al. 2024) OminiDrive (Wang et al. 2024) EMMA (Hwang et al. 2024) OpenEMMA (Xing et al. 2025) DME-Driver (Han et al. 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S077"></a>
**Source:** p.5 S077

**Original:** 0.21 0.18 0.20 0.17 0.14 0.14 1.45 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S078"></a>
**Source:** p.5 S078

**Original:** 0.39 0.34 0.40 0.37 0.29 0.29 3.21 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S079"></a>
**Source:** p.5 S079

**Original:** 0.69 0.68 0.70 0.69 0.55 0.54 3.76 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S080"></a>
**Source:** p.5 S080

**Original:** 0.43 0.40 0.44 0.40 0.33 0.32 2.81 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S081"></a>
**Source:** p.5 S081

**Original:** 0.07 0.10 0.04 0.01 0.00 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S082"></a>
**Source:** p.5 S082

**Original:** 0.09 0.22 0.12 0.05 0.13 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S083"></a>
**Source:** p.5 S083

**Original:** 0.27 0.45 0.36 0.26 0.78 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S084"></a>
**Source:** p.5 S084

**Original:** 0.14 0.27 0.17 0.10 0.30 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S085"></a>
**Source:** p.5 S085

**Original:** 0.27 0.23 0.45

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S086"></a>
**Source:** p.5 S086

**Original:** 0.74 0.73 0.91

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S087"></a>
**Source:** p.5 S087

**Original:** 1.52 1.54 1.58

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S088"></a>
**Source:** p.5 S088

**Original:** 0.84 0.80 0.98

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S089"></a>
**Source:** p.5 S089

**Original:** 0.07 0.00 0.05

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S090"></a>
**Source:** p.5 S090

**Original:** 0.15 0.13 0.28

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S091"></a>
**Source:** p.5 S091

**Original:** 1.10 0.83 0.55

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S092"></a>
**Source:** p.5 S092

**Original:** 0.44 0.32 0.29

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S093"></a>
**Source:** p.5 S093

**Original:** BERT Qwen-VL-7B GPT-3.5 LLaVa-7B LLaVA-7B Gemini Qwen-VL-7B LLaVa-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S094"></a>
**Source:** p.5 S094

**Original:** Textual Visual Textual Visual Visual Visual Visual Visual

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S095"></a>
**Source:** p.5 S095

**Original:** OpenDriveVLA-0.5B (Ours) OpenDriveVLA-3B (Ours) OpenDriveVLA-7B (Ours)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S096"></a>
**Source:** p.5 S096

**Original:** 0.15 0.14 0.15

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S097"></a>
**Source:** p.5 S097

**Original:** 0.32 0.30 0.31

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S098"></a>
**Source:** p.5 S098

**Original:** 0.57 0.55 0.55

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S099"></a>
**Source:** p.5 S099

**Original:** 0.35 0.33 0.33

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S100"></a>
**Source:** p.5 S100

**Original:** 0.01 0.02 0.01

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S101"></a>
**Source:** p.5 S101

**Original:** 0.06 0.07 0.08

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S102"></a>
**Source:** p.5 S102

**Original:** 0.20 0.22 0.21

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S103"></a>
**Source:** p.5 S103

**Original:** 0.09 0.10 0.10

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S104"></a>
**Source:** p.5 S104

**Original:** 0.21 0.19 0.20

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S105"></a>
**Source:** p.5 S105

**Original:** 0.60 0.58 0.58

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S106"></a>
**Source:** p.5 S106

**Original:** 1.22 1.24 1.21

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S107"></a>
**Source:** p.5 S107

**Original:** 0.68 0.67 0.66

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S108"></a>
**Source:** p.5 S108

**Original:** 0.00 0.02 0.00

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S109"></a>
**Source:** p.5 S109

**Original:** 0.15 0.18 0.22

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S110"></a>
**Source:** p.5 S110

**Original:** 0.63 0.70 0.55

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S111"></a>
**Source:** p.5 S111

**Original:** 0.26 0.30 0.25

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S112"></a>
**Source:** p.5 S112

**Original:** Qwen2.5-0.5B Qwen2.5-3B Qwen2.5-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S113"></a>
**Source:** p.5 S113

**Original:** Visual Visual Visual

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S114"></a>
**Source:** p.5 S114

**Original:** 0.48 0.30 0.55 0.67

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S115"></a>
**Source:** p.5 S115

**Original:** Autoregressive Methods

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C003"></a>
**Source:** p.5 C003

**Original:** Table 1: Open-Loop planning performance comparison of different driving models, including both autoregressive methods and non-autoregressive methods. OpenDriveVLA shows powerful planning ability and achieves best-in-class results among opensource models, even with the 0.5B version. We refer to the result summary from (Song et al. 2025; Mao et al. 2023; Li et al. 2025; Huang et al. 2024).

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S116"></a>
**Source:** p.5 S116

**Original:** T̂traj = argmaxTtraj

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S117"></a>
**Source:** p.5 S117

**Original:** T Y

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S118"></a>
**Source:** p.5 S118

**Original:** To further enhance spatial grounding, each object caption is augmented with its corresponding BEV coordinates, enabling the model to associate object attributes with precise spatial locations. For scene tokens, we process multi-view scene descriptions from (Yang et al. 2023), merging them into unified summaries that describe the driving environment across all camera views. For map tokens, structured language descriptions are derived from ground-truth annotations, translating map elements such as lane dividers, crosswalks, and road boundaries into descriptive text. Driving Instruction Tuning. We adopt multiple instructionoriented datasets derived from nuScenes to inject drivingspecific knowledge into OpenDriveVLA. We unify several datasets into a standardized instruction-based QA format, including driving-related question-answer pairs collected from nuCaption (Yang et al. 2023), nuScenesQA (Qian et al. 2023), and nuX (Ding et al. 2024) dataset. Each QA pair is conditioned on structured environmental visual tokens and the ego vehicle state, ensuring consistency across different data sources. This multimodal instruction tuning process allows OpenDriveVLA to effectively ground language understanding into both environmental perception and scene understanding, bridging perception, reasoning, and action within the language space. Motion Forecasting and Trajectory Prediction. We formulate both agent motion forecasting and ego trajectory planning in the ego system, where the model directly predicts future displacements within each entity’s local coordinate frame relative to the ego vehicle for planning and relative to each agent for forecasting. This formulation captures motion dynamics in a spatially consistent manner across all

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S119"></a>
**Source:** p.5 S119

**Original:** p (wt | w1:t−1 , Venv , Sego , Xdri )

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S120"></a>
**Source:** p.5 S120

**Original:** t=1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S121"></a>
**Source:** p.5 S121

**Original:** (5) The entire pipeline, including the 3D visual encoder, cross-modality projectors, and LLM, is jointly optimized end-to-end during training, with the 2D encoder kept frozen. At inference, the model autoregressively generates the tokenized trajectory T̂traj , which is then decoded back into numerical waypoints: Ŵego = Decoder(T̂traj )

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S122"></a>
**Source:** p.5 S122

**Original:** (6)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S123"></a>
**Source:** p.5 S123

**Original:** Experiments Training Datasets We curate the training data of OpenDriveVLA based on its distinct training phases, drawing from: TOD3Cap (Jin et al. 2024), nuCaption (Yang et al. 2023), nuScenesQA (Qian et al. 2023), nuX (Ding et al. 2024), and GPT-Driver (Mao et al. 2023). We conduct experiments on nuScenes (Caesar et al. 2020), following standard data split into training and validation sets. OpenDriveVLA is trained using the training set paired with corresponding QA captions, while the validation set is exclusively used for performance evaluation to ensure fair comparisons with prior works. The details of training data can be found in supplementary materials. Hierarchical Vision-Language Alignment. For agent-level caption, we post-process data from (Jin et al. 2024), which provides the 2D visual description of individual objects. 13786

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-6"></a>
### Page 6

<a id="S124"></a>
**Source:** p.6 S124

**Original:** nu-Caption

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S125"></a>
**Source:** p.6 S125

**Original:** Method

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S126"></a>
**Source:** p.6 S126

**Original:** nuScenes-QA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S127"></a>
**Source:** p.6 S127

**Original:** BL-1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S128"></a>
**Source:** p.6 S128

**Original:** BL-2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S129"></a>
**Source:** p.6 S129

**Original:** BL-3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S130"></a>
**Source:** p.6 S130

**Original:** BL-4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S131"></a>
**Source:** p.6 S131

**Original:** BERT-S

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S132"></a>
**Source:** p.6 S132

**Original:** Ext

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S133"></a>
**Source:** p.6 S133

**Original:** Cnt

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S134"></a>
**Source:** p.6 S134

**Original:** Obj

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S135"></a>
**Source:** p.6 S135

**Original:** Sts

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S136"></a>
**Source:** p.6 S136

**Original:** Cmp

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S137"></a>
**Source:** p.6 S137

**Original:** H0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S138"></a>
**Source:** p.6 S138

**Original:** H1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S139"></a>
**Source:** p.6 S139

**Original:** Acc

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S140"></a>
**Source:** p.6 S140

**Original:** Mini-GPT4 (Zhu et al. 2024) Instruct-BLIP (Dai and et al. 2023) LLaMA-AdapV2 (Gao et al. 2023) LLaVA1.5 (Liu et al. 2024a) LiDAR-LLM (Yang et al. 2023) BEVDet+BUTD (Qian et al. 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S141"></a>
**Source:** p.6 S141

**Original:** 15.0 18.7 30.2 20.0 41.0 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S142"></a>
**Source:** p.6 S142

**Original:** 6.8 13.4 17.3 12.1 30.0 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S143"></a>
**Source:** p.6 S143

**Original:** 3.7 7.4 10.4 8.6 23.4 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S144"></a>
**Source:** p.6 S144

**Original:** 2.6 5.2 7.5 5.4 19.3 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S145"></a>
**Source:** p.6 S145

**Original:** 84.4 85.9 86.5 85.0 91.3 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S146"></a>
**Source:** p.6 S146

**Original:** 19.3 45.8 74.5 83.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S147"></a>
**Source:** p.6 S147

**Original:** 2.7 7.7 15.0 20.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S148"></a>
**Source:** p.6 S148

**Original:** 7.6 7.8 37.8 48.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S149"></a>
**Source:** p.6 S149

**Original:** 10.8 9.0 45.9 52.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S150"></a>
**Source:** p.6 S150

**Original:** 1.6 52.1 57.8 67.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S151"></a>
**Source:** p.6 S151

**Original:** 15.1 25.7 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S152"></a>
**Source:** p.6 S152

**Original:** 4.8 41.5 -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S153"></a>
**Source:** p.6 S153

**Original:** 9.6 26.2 48.6 57.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S154"></a>
**Source:** p.6 S154

**Original:** OpenDriveVLA-0.5B (Ours) OpenDriveVLA-3B (Ours) OpenDriveVLA-7B (Ours)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S155"></a>
**Source:** p.6 S155

**Original:** 47.2 48.3 49.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S156"></a>
**Source:** p.6 S156

**Original:** 35.8 36.9 38.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S157"></a>
**Source:** p.6 S157

**Original:** 29.4 30.3 31.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S158"></a>
**Source:** p.6 S158

**Original:** 25.2 26.1 27.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S159"></a>
**Source:** p.6 S159

**Original:** 91.9 92.0 92.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S160"></a>
**Source:** p.6 S160

**Original:** 83.9 84.0 84.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S161"></a>
**Source:** p.6 S161

**Original:** 22.0 22.3 22.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S162"></a>
**Source:** p.6 S162

**Original:** 50.2 50.3 49.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S163"></a>
**Source:** p.6 S163

**Original:** 57.0 56.9 54.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S164"></a>
**Source:** p.6 S164

**Original:** 68.4 68.5 68.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S165"></a>
**Source:** p.6 S165

**Original:** 62.3 62.6 62.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S166"></a>
**Source:** p.6 S166

**Original:** 56.5 56.5 56.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S167"></a>
**Source:** p.6 S167

**Original:** 58.4 58.5 58.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C004"></a>
**Source:** p.6 C004

**Original:** Table 2: Performance on nu-Caption (Yang et al. 2023) and nuScenes-QA (Qian et al. 2023). BL-1/2/3/4: BLEU scores. QA metrics report accuracy on five question types: Existence, Counting, Object, Status, and Comparison.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S168"></a>
**Source:** p.6 S168

**Original:** Main Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S169"></a>
**Source:** p.6 S169

**Original:** entities. Following (Mao et al. 2023), the ego vehicle state is encoded as textual input to ensure ego awareness throughout the training process. Both tasks predict 3-second future trajectories, sampled at 0.5-second intervals, resulting in 6 waypoints per trajectory.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S170"></a>
**Source:** p.6 S170

**Original:** Open Loop Trajectory Planning. We evaluate OpenDriveVLA on the open-loop trajectory planning task using both ST-P3 and UniAD metrics, ensuring comprehensive performance assessment across spatial accuracy and collision avoidance. As shown in Table 1, OpenDriveVLA achieves state-of-the-art performance across both settings. Specifically, both 3B and 7B version models achieve an average L2 error of 0.33m under ST-P3 metrics, outperforming prior autoregressive language models (Mao et al. 2023; Tian et al. 2024). On the UniAD metrics, OpenDriveVLA7B also achieves great performance with an average L2 error of 0.66m. Notably, despite significantly fewer parameters, the 0.5B version still outperforms prior models obviously.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S171"></a>
**Source:** p.6 S171

**Original:** Evaluations We evaluate OpenDriveVLA on the open-loop planning task of nuScenes benchmark, where the model is reported under both ST-P3 (Hu et al. 2022) and UniAD (Hu et al. 2023) settings. The evaluation metrics include L2 displacement errors at 1, 2, and 3 seconds, along with the average collision rate over the prediction horizon. To further assess the scene understanding ability of OpenDriveVLA, we report its QA prediction performance on three driving visual question answering (VQA) datasets directly after the driving instruction tuning stage, i.e., (Yang et al. 2023), nuScenesQA (Qian et al. 2023), and nuX (Ding et al. 2024). The VQA evaluation results adopt standard NLG metrics, including BLEU, METEOR, CIDEr, BERT-Score, etc.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S172"></a>
**Source:** p.6 S172

**Original:** Models Hint-UniAD (Ding et al. 2024) Hint-VAD (Ding et al. 2024) GPT-4o (Xu et al. 2024) Gemini 1.5 (Team et al. 2024) Vote2CapDETR (Chen et al. 2023) TOD3 Cap (Jin et al. 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S173"></a>
**Source:** p.6 S173

**Original:** CIDER

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S174"></a>
**Source:** p.6 S174

**Original:** BL-4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S175"></a>
**Source:** p.6 S175

**Original:** METEOR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S176"></a>
**Source:** p.6 S176

**Original:** ROUGE-L

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S177"></a>
**Source:** p.6 S177

**Original:** 21.7 22.4 19.0 17.6 15.3 14.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S178"></a>
**Source:** p.6 S178

**Original:** 4.2 4.2 4.0 3.4 2.6 2.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S179"></a>
**Source:** p.6 S179

**Original:** 12.7 13.2 10.3 9.3 10.9 10.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S180"></a>
**Source:** p.6 S180

**Original:** 27.0 27.6 24.9 23.4 24.2 23.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S181"></a>
**Source:** p.6 S181

**Original:** 5.4 4.3 4.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S182"></a>
**Source:** p.6 S182

**Original:** 12.5 12.8 12.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S183"></a>
**Source:** p.6 S183

**Original:** 27.9 27.8 27.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S184"></a>
**Source:** p.6 S184

**Original:** OpenDriveVLA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S185"></a>
**Source:** p.6 S185

**Original:** Implementation Details

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S186"></a>
**Source:** p.6 S186

**Original:** 0.5B (Ours) 3B (Ours) 7B (Ours)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S187"></a>
**Source:** p.6 S187

**Original:** The 3D visual perception module in OpenDriveVLA follows the vision-centric design from (Hu et al. 2023), using a ResNet-101 backbone for 2D feature extraction. The perception backbone is pre-trained via multi-task learning on 3D object detection, object tracking, and map segmentation. The resulting BEV feature map has a spatial resolution of 200 × 200. To construct a unified scene representation, the global SceneSampler applies 2D adaptive pooling to each camera view, subsequently concatenating the pooled multiview features into a global scene token. Agent and map tokens are extracted from the final layer of their respective QueryTransformer modules. Each token type is then mapped into the language space using a separate two-layer MLP with GeLU activation. We adopt Qwen 2.5-Instruct (Yang, Yang, and et al. 2024) as the pre-trained LLM, which undergoes full parameter tuning during training. Training is performed on 4 NVIDIA H100 GPUs with a batch size of 1, completed in approximately two days. We freeze the 2D backbone during stage 3. During inference, we set the decoding temperature to 0 to ensure deterministic trajectory generation. See supplementary material for detailed training configurations.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S188"></a>
**Source:** p.6 S188

**Original:** 32.3 25.5 26.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C005"></a>
**Source:** p.6 C005

**Original:** Table 3: Performance comparison of OpenDriveVLA on the Nu-X dataset (Ding et al. 2024). Driving Question Answering. We access OpenDriveVLA on the driving VQA task across three nuScenes-based datasets (Table 2, Table 3), reporting results after the second stage of training. OpenDriveVLA reaches best-in-class performance across all three datasets, consistently outperforming previous language-enhanced driving models and general-purpose multimodal baselines among most metrics. On nuCaption dataset, it achieves the best captioning performance among all evaluated models, outperforming both general VLMs LLaVA1.5 (Liu et al. 2024a) and Mini-GPT4 (Zhu et al. 2024), as well as autonomous driving-specific models such as LiDAR-LLM (Yang et al. 2023). For nuScenesQA dataset, OpenDriveVLA also achieves strong performance. Compared to models that directly fuse BEV features with language models such as BEVDet+BUTD (Qian et al. 2023), it demonstrates clear advantages in object and status13787

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-7"></a>
### Page 7

<a id="C006"></a>
**Source:** p.7 C006

**Original:** Figure 4: Visualization of OpenDriveVLA-7B planning actions under original dataset instruction to keep forward (left) and modified instruction to turn right (right). The QA prediction showcases (middle) are from results reported in Table 2 and Table 3. The agent motion prediction results are visualized after the agent-env-ego interaction stage. related questions, which highlights the benefit of its spatially grounded visual-language alignment. Notably, the 0.5B version outperforms even the larger 7B on the Nu-X dataset, which shows its powerful scene-understanding ability even with lightweight LLMs.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S189"></a>
**Source:** p.7 S189

**Original:** Training Stage 1 2 2.5 3 ✓ ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S190"></a>
**Source:** p.7 S190

**Original:** Ablation Study

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S191"></a>
**Source:** p.7 S191

**Original:** ✓ ✓ ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S192"></a>
**Source:** p.7 S192

**Original:** Ego ✓ ✓ ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S193"></a>
**Source:** p.7 S193

**Original:** Hist

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S194"></a>
**Source:** p.7 S194

**Original:** Cmd

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S195"></a>
**Source:** p.7 S195

**Original:** ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S196"></a>
**Source:** p.7 S196

**Original:** ✓ ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S197"></a>
**Source:** p.7 S197

**Original:** ✓ ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S198"></a>
**Source:** p.7 S198

**Original:** ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S199"></a>
**Source:** p.7 S199

**Original:** Avg. Collision (%) ↓ UniAD ST-P3 0.77 1.14 0.29 0.33 0.26

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S200"></a>
**Source:** p.7 S200

**Original:** 0.24 0.49 0.10 0.13 0.09

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S201"></a>
**Source:** p.7 S201

**Original:** Avg. L2 (m) ↓ UniAD ST-P3 1.34 1.30 0.77 0.80 0.68

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S202"></a>
**Source:** p.7 S202

**Original:** ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S203"></a>
**Source:** p.7 S203

**Original:** 0.37 0.32 0.31 0.26

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S204"></a>
**Source:** p.7 S204

**Original:** 0.13 0.12 0.11 0.09

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S205"></a>
**Source:** p.7 S205

**Original:** Avg. L2 (m) ↓ UniAD ST-P3 0.70 0.69 0.68 0.68

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S206"></a>
**Source:** p.7 S206

**Original:** 0.36 0.35 0.35 0.35

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C007"></a>
**Source:** p.7 C007

**Original:** Table 5: Ablation study on the effect of multi-stage training of 0.5B model. Stage 1, 2, 2.5, and 3 correspond to hierarchical feature alignment, driving instruction tuning, AgentEnv-Ego modeling, and trajectory tuning, respectively.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S207"></a>
**Source:** p.7 S207

**Original:** We conduct ablation studies to evaluate the impact of input modalities and our multi-stage training strategy on OpenDriveVLA’s performance. Additionally, we qualitatively assess the model’s ability to follow diverse driving commands. Visu

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S208"></a>
**Source:** p.7 S208

**Original:** ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S209"></a>
**Source:** p.7 S209

**Original:** ✓ ✓ ✓ ✓

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S210"></a>
**Source:** p.7 S210

**Original:** Avg. Collision (%) ↓ UniAD ST-P3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S211"></a>
**Source:** p.7 S211

**Original:** Effect of Driving Command. Figure 4 presents the qualitative comparison at an intersection under two different driver instructions: keep forward and turn right, with the right turn as the ground truth. OpenDriveVLA accurately adapts its plan to the given command while maintaining contextaware and environment-consistent behavior, demonstrating robust command-following and generalization in complex scenes. In addition, we visualize the QA predictions for the same scene, showcasing the model’s ability to reason over decision-making and traffic scene understanding.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S212"></a>
**Source:** p.7 S212

**Original:** 0.75 0.75 0.39 0.40 0.35

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C008"></a>
**Source:** p.7 C008

**Original:** Table 4: Ablation study on the effect of different input combinations on OpenDriveVLA-0.5B. Effect of Input Modalities. We investigate how individual input components contribute to trajectory planning. Table 4 presents the results of ablating visual perception, ego state, historical trajectory, and high-level language commands. The inclusion of visual inputs significantly boosts overall performance. Adding textual commands and historical information further improves the predictions, emphasizing the value of semantic intent and temporal context. Notably, egostate features play a critical role in nuScenes open-loop benchmark, consistent with prior findings (Li et al. 2024). Effect of Multi-Stage Training Strategy. We evaluate the contribution of each training phase in our staged pipeline incrementally. As shown in Table 5, each additional stage consistently improves performance, with the most notable reductions in collision rate observed after Hierarchical VisionLanguage Alignment and Agent-Environment-Ego Interaction Modeling. These improvements highlight the effectiveness of cross-modal grounding and interaction-aware reasoning in enhancing safety-critical planning behavior.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S213"></a>
**Source:** p.7 S213

**Original:** Conclusion In this work, we present OpenDriveVLA, a scalable visionlanguage action model designed for end-to-end autonomous driving. Built upon pre-trained large language models, OpenDriveVLA generates 3D spatially grounded and semantically consistent driving actions from multimodal inputs. We introduce a hierarchical vision-language feature alignment module and realize agent-env-ego interaction in LLM to enable fine-grained spatial reasoning and dynamic scene understanding. Through multi-stage training paradigm, OpenDriveVLA achieves state-of-the-art performance in open-loop planning and driving-related question answering. Extensive evaluations on nuScenes dataset show its superior trajectory planning capability compared to existing approaches. Our work demonstrates the feasibility of a scalable vision-language-driven approach for autonomous driving and highlights the potential of large language models as a foundation for end-to-end driving action systems. 13788

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-8"></a>
### Page 8

<a id="S214"></a>
**Source:** p.8 S214

**Original:** References

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S215"></a>
**Source:** p.8 S215

**Original:** Huang, Z.; Tang, T.; Chen, S.; Lin, S.; Jie, Z.; Ma, L.; Wang, G.; and Liang, X. 2024. Making Large Language Models Better Planners with Reasoning-Decision Alignment. arXiv:2408.13890. Hwang, J.-J.; Xu, R.; Lin, H.; Hung, W.-C.; Ji, J.; Choi, K.; Huang, D.; He, T.; Covington, P.; Sapp, B.; Zhou, Y.; Guo, J.; Anguelov, D.; and Tan, M. 2024. EMMA: End-to-End Multimodal Model for Autonomous Driving. arXiv:2410.23262. Jia, X.; You, J.; Zhang, Z.; and Yan, J. 2025. DriveTransformer: Unified Transformer for Scalable End-to-End Autonomous Driving. In The Thirteenth International Conference on Learning Representations. Jiang, B.; Chen, S.; Liao, B.; Zhang, X.; Yin, W.; Zhang, Q.; Huang, C.; Liu, W.; and Wang, X. 2024. Senna: Bridging Large Vision-Language Models and End-to-End Autonomous Driving. arXiv:2410.22313. Jiang, B.; Chen, S.; Xu, Q.; Liao, B.; Chen, J.; Zhou, H.; Zhang, Q.; Liu, W.; Huang, C.; and Wang, X. 2023. VAD: Vectorized Scene Representation for Efficient Autonomous Driving. ICCV. Jin, B.; Liu, X.; Zheng, Y.; Li, P.; and et al., H. Z. 2023. ADAPT: Action-aware Driving Caption Transformer. arXiv:2302.00673. Jin, B.; Zheng, Y.; Li, P.; Li, W.; Zheng, Y.; and Hu, S. e. a. 2024. TOD3Cap: Towards 3D Dense Captioning. In Computer Vision – ECCV 2024: 18th European Conference, Milan, Italy, September 29 – October 4, 2024, Proceedings, Part XVIII, 367–384. Berlin, Heidelberg: Springer-Verlag. ISBN 978-3-031-72648-4. Khurana, T.; Hu, P.; Dave, A.; Ziglar, J.; Held, D.; and Ramanan, D. 2022. Differentiable Raycasting for SelfSupervised Occupancy Forecasting. In Computer Vision – ECCV 2022: 17th European Conference, Tel Aviv, Israel, October 23–27, 2022, Proceedings, Part XXXVIII, 353–369. Berlin, Heidelberg: Springer-Verlag. ISBN 9783-031-19838-0. Kim, M.; Pertsch, K.; Karamcheti, S.; Xiao, T.; Balakrishna, A.; Nair, S.; Rafailov, R.; Foster, E.; Lam, G.; Sanketi, P.; Vuong, Q.; Kollar, T.; Burchfiel, B.; Tedrake, R.; Sadigh, D.; Levine, S.; Liang, P.; and Finn, C. 2024. OpenVLA: An Open-Source Vision-Language-Action Model. arXiv preprint arXiv:2406.09246. Li, T.; Wang, H.; Li, X.; Liao, W.; He, T.; and Peng, P. 2025. Generative Planning with 3D-vision Language Pre-training for End-to-End Autonomous Driving. arXiv:2501.08861. Li, Z.; Wang, W.; Li, H.; Xie, E.; Sima, C.; Lu, T.; Qiao, Y.; and Dai, J. 2022. BEVFormer: Learning Bird’sEye-View Representation from nbsp;Multi-camera Images vinbsp;Spatiotemporal Transformers. In Computer Vision – ECCV 2022: 17th European Conference, Tel Aviv, Israel, October 23–27, 2022, Proceedings, Part IX, 1–18. Berlin, Heidelberg: Springer-Verlag. ISBN 978-3-031-20076-2. Li, Z.; Yu, Z.; Lan, S.; Li, J.; Kautz, J.; Lu, T.; and Alvarez, J. M. 2024. Is Ego Status All You Need for Open-Loop Endto-End Autonomous Driving? In 2024 IEEE/CVF Confer-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S216"></a>
**Source:** p.8 S216

**Original:** Bai, J.; Bai, S.; Yang, S.; Wang, S.; Tan, S.; Wang, P.; Lin, J.; Zhou, C.; and Zhou, J. 2023. Qwen-VL: A Versatile VisionLanguage Model for Understanding, Localization, Text Reading, and Beyond. arXiv preprint arXiv:2308.12966. Caesar, H.; Bankiti, V.; Lang, A. H.; Vora, S.; Liong, V. E.; Xu, Q.; Krishnan, A.; Pan, Y.; Baldan, G.; and Beijbom, O. 2020. nuScenes: A Multimodal Dataset for Autonomous Driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR). Chen, L.; Wu, P.; Chitta, K.; Jaeger, B.; Geiger, A.; and Li, H. 2024. End-to-end Autonomous Driving: Challenges and Frontiers. IEEE Transactions on Pattern Analysis and Machine Intelligence. Chen, S.; Zhu, H.; Chen, X.; Lei, Y.; Yu, G.; and Chen, T. 2023. End-to-end 3d dense captioning with vote2cap-detr. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 11124–11133. Dai, W.; and et al., J. L. 2023. InstructBLIP: Towards General-purpose Vision-Language Models with Instruction Tuning. In Thirty-seventh Conference on Neural Information Processing Systems. Ding, K.; Chen, B.; Su, Y.; Gao, H.-a.; Jin, B.; Sima, C.; Li, X.; Zhang, W.; Barsch, P.; and Li, H. e. a. 2024. HintAD: Holistically Aligned Interpretability in End-to-End Autonomous Driving. In 8th Annual Conference on Robot Learning. Favero, A.; Zancato, L.; Trager, M.; Choudhary, S.; Perera, P.; Achille, A.; Swaminathan, A.; and Soatto, S. 2024. Multi-Modal Hallucination Control by Visual Information Grounding. arXiv:2403.14003. Fu, H.; Zhang, D.; Zhao, Z.; Cui, J.; Liang, D.; Zhang, C.; Zhang, D.; Xie, H.; Wang, B.; and Bai, X. 2025. ORION: A Holistic End-to-End Autonomous Driving Framework by Vision-Language Instructed Action Generation. arXiv:2503.19755. Gao, P.; Han, J.; Zhang, R.; Lin, Z.; Geng, S.; Zhou, A.; Zhang, W.; and Lu, P. e. a. 2023. Llama-adapter v2: Parameter-efficient visual instruction model. arXiv preprint arXiv:2304.15010. Han, W.; Guo, D.; Xu, C.-Z.; and Shen, J. 2024. DMEDriver: Integrating Human Decision Logic and 3D Scene Perception in Autonomous Driving. arXiv:2401.03641. Hu, P.; Huang, A.; Dolan, J.; Held, D.; and Ramanan, D. 2021. Safe Local Motion Planning With Self-Supervised Freespace Forecasting. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 12732–12741. Hu, S.; Chen, L.; Wu, P.; Li, H.; Yan, J.; and Tao, D. 2022. ST-P3: End-to-end Vision-based Autonomous Driving via Spatial-Temporal Feature Learning. In European Conference on Computer Vision (ECCV). Hu, Y.; Yang, J.; Chen, L.; Li, K.; Sima, C.; Zhu, X.; Chai, S.; Du, S.; Lin, T.; Wang, W.; Lu, L.; Jia, X.; Liu, Q.; Dai, J.; Qiao, Y.; and Li, H. 2023. Planning-oriented Autonomous Driving. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition. 13789

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-9"></a>
### Page 9

<a id="S217"></a>
**Source:** p.9 S217

**Original:** Wang, S.; Yu, Z.; Jiang, X.; Lan, S.; Shi, M.; Chang, N.; Kautz, J.; Li, Y.; and Alvarez, J. M. 2024. OmniDrive: A Holistic LLM-Agent Framework for Autonomous Driving with 3D Perception, Reasoning and Planning. arXiv:2405.01533. Wang, W.; Xie, J.; Hu, C.; Zou, H.; Fan, J.; Tong, W.; Wen, Y.; Wu, S.; Deng, H.; Li, Z.; et al. 2023. DriveMLM: Aligning Multi-Modal Large Language Models with Behavioral Planning States for Autonomous Driving. arXiv preprint arXiv:2312.09245. Xie, S.; Kong, L.; Dong, Y.; Sima, C.; and et al., W. Z. 2025. Are VLMs Ready for Autonomous Driving? An Empirical Study from the Reliability, Data, and Metric Perspectives. arXiv:2501.04003. Xing, S.; Qian, C.; Wang, Y.; Hua, H.; Tian, K.; Zhou, Y.; and Tu, Z. 2025. OpenEMMA: Open-Source Multimodal Model for End-to-End Autonomous Driving. arXiv:2412.15208. Xu, Z.; Zhang, Y.; Xie, E.; Zhao, Z.; Guo, Y.; Wong, K.Y. K.; Li, Z.; and Zhao, H. 2024. DriveGPT4: Interpretable End-to-End Autonomous Driving Via Large Language Model. IEEE Robotics and Automation Letters, 9(10): 8186–8193. Yang, A.; Yang, B.; and et al., B. Z. 2024. Qwen2.5 Technical Report. arXiv preprint arXiv:2412.15115. Yang, S.; Liu, J.; Zhang, R.; Pan, M.; Guo, Z.; Li, X.; Chen, Z.; Gao, P.; Guo, Y.; and Zhang, S. 2023. LiDAR-LLM: Exploring the Potential of Large Language Models for 3D LiDAR Understanding. arXiv:2312.14074. Zhai, J.-T.; Feng, Z.; Du, J.; Mao, Y.; Liu, J.-J.; Tan, Z.; Zhang, Y.; Ye, X.; and Wang, J. 2023a. Rethinking the Open-Loop Evaluation of End-to-End Autonomous Driving in nuScenes. arXiv:2305.10430. Zhai, X.; Mustafa, B.; Kolesnikov, A.; and et al., L. B. 2023b. Sigmoid Loss for Language Image Pre-Training. arXiv:2303.15343. Zhang, J.; Huang, Z.; Ray, A.; and Ohn-Bar, E. 2024a. Feedback-Guided Autonomous Driving. In 2024 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 15000–15011. Zhang, S.; Zhai, Y.; Mei, J.; and Hu, Y. 2024b. FusionOcc: Multi-Modal Fusion for 3D Occupancy Prediction. In Proceedings of the 32nd ACM International Conference on Multimedia, MM ’24, 787–796. New York, NY, USA: Association for Computing Machinery. ISBN 9798400706868. Zhou, X.; and Knoll, A. C. 2024. GPT-4V as Traffic Assistant: An In-depth Look at Vision Language Model on Complex Traffic Events. arXiv:2402.02205. Zhou, X.; Liu, M.; Yurtsever, E.; Zagar, B. L.; Zimmer, W.; Cao, H.; and Knoll, A. C. 2024. Vision Language Models in Autonomous Driving: A Survey and Outlook. IEEE Transactions on Intelligent Vehicles, 1–20. Zhu, D.; Chen, J.; Shen, X.; Li, X.; and Elhoseiny, M. 2024. MiniGPT-4: Enhancing Vision-Language Understanding with Advanced Large Language Models. In The Twelfth International Conference on Learning Representations.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S218"></a>
**Source:** p.9 S218

**Original:** ence on Computer Vision and Pattern Recognition (CVPR), 14864–14873. Liao, B.; Chen, S.; Yin, H.; Jiang, B.; Wang, C.; Yan, S.; Zhang, X.; Li, X.; Zhang, Y.; Zhang, Q.; and Wang, X. 2024. DiffusionDrive: Truncated Diffusion Model for End-to-End Autonomous Driving. arXiv preprint arXiv:2411.15139. Liu, H.; Li, C.; Li, Y.; and Lee, Y. J. 2024a. Improved Baselines with Visual Instruction Tuning. arXiv:2310.03744. Liu, H.; Li, C.; Li, Y.; Li, B.; Zhang, Y.; Shen, S.; and Lee, Y. J. 2024b. LLaVA-NeXT: Improved reasoning, OCR, and world knowledge. Liu, H.; Xue, W.; Chen, Y.; Chen, D.; Zhao, X.; Wang, K.; Hou, L.; Li, R.; and Peng, W. 2024c. A Survey on Hallucination in Large Vision-Language Models. arXiv:2402.00253. Liu, M.; Yurtsever, E.; Fossaert, J.; Zhou, X.; Zimmer, W.; Cui, Y.; Zagar, B. L.; and Knoll, A. C. 2024d. A Survey on Autonomous Driving Datasets: Statistics, Annotation Quality, and a Future Outlook. IEEE Transactions on Intelligent Vehicles, 1–29. Mao, J.; Qian, Y.; Ye, J.; Zhao, H.; and Wang, Y. 2023. GPTDriver: Learning to Drive with GPT. arXiv:2310.01415. Mei, J.; Ma, Y.; Yang, X.; Wen, L.; Cai, X.; Li, X.; Fu, D.; Zhang, B.; Cai, P.; Dou, M.; Shi, B.; He, L.; Liu, Y.; and Qiao, Y. 2024. Continuously Learning, Adapting, and Improving: A Dual-Process Approach to Autonomous Driving. arXiv:2405.15324. OpenAI; Achiam, J.; Adler, S.; Agarwal, S.; Ahmad, L.; Akkaya, I.; Aleman, F. L.; Almeida, D.; and et al., J. A. 2024. GPT-4 Technical Report. arXiv:2303.08774. Qian, T.; Chen, J.; Zhuo, L.; Jiao, Y.; and Jiang, Y.-G. 2023. NuScenes-QA: A Multi-modal Visual Question Answering Benchmark for Autonomous Driving Scenario. arXiv preprint arXiv:2305.14836. Sima, C.; Renz, K.; Chitta, K.; Chen, L.; Zhang, H.; Xie, C.; Luo, P.; Geiger, A.; and Li, H. 2023. DriveLM: Driving with Graph Visual Question Answering. arXiv preprint arXiv:2312.14150. Song, R.; Guo, X.; Wu, H.; Wei, Q.; and Chen, L. 2025. InsightDrive: Insight Scene Representation for End-to-End Autonomous Driving. arXiv:2503.13047. Team, G.; Georgiev, P.; Lei, V. I.; Burnell, R.; Bai, L.; Gulati, A.; Tanzer, G.; Vincent, D.; Pan, Z.; Wang, S.; Mariooryad, S.; Ding, Y.; Geng, X.; Alcober, F.; Frostig, R.; Omernick, M.; and et al., L. W. 2024. Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context. arXiv:2403.05530. Tian, X.; Gu, J.; Li, B.; Liu, Y.; Wang, Y.; Zhao, Z.; Zhan, K.; Jia, P.; Lang, X.; and Zhao, H. 2024. DriveVLM: The Convergence of Autonomous Driving and Large VisionLanguage Models. In 8th Annual Conference on Robot Learning. Touvron, H.; Lavril, T.; Izacard, G.; and Xavier Martinet, e. a. 2023. LLaMA: Open and Efficient Foundation Language Models. arXiv:2302.13971. 13790

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

## 阅读提示

- 当前文件的价值是稳定保存全文页码与段落锚点，并提供一个经人工复核的开篇双语块。
- 未翻译段落、图表、表格和公式都在 `translation_notes.md` 中登记；完成前不应把本文件标记为正式全文译读。
- 旧博客笔记可作为研究路线导读，但数值结论仍应回到本读者的具体页码块和原 PDF 核验。
