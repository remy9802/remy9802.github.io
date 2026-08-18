# Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution｜全文双语阅读器（draft）

> **状态：source-mapped draft。** 已完成全文页段映射与开篇核心段落人工翻译；其余逐段翻译、图表紧裁和公式转写均显式标为待处理。本文不是摘要替代品。

## 文献元数据

- **作者 / 机构**：Qwen Team；Alibaba Cloud
- **年份 / 载体**：2024；arXiv preprint
- **原文**：[官方来源](https://arxiv.org/abs/2409.12191)
- **原博客笔记**：[中文文献笔记](../../_posts/2026-08-18-qwen2-vl.md)
- **源文件**：`/tmp/literature-vlm-pdfs/qwen2-vl.pdf`（52 页，可检索文本 PDF）

## 页面索引

[p.1](#page-1) · [p.2](#page-2) · [p.3](#page-3) · [p.4](#page-4) · [p.5](#page-5) · [p.6](#page-6) · [p.7](#page-7) · [p.8](#page-8) · [p.9](#page-9) · [p.10](#page-10) · [p.11](#page-11) · [p.12](#page-12)
[p.13](#page-13) · [p.14](#page-14) · [p.15](#page-15) · [p.16](#page-16) · [p.17](#page-17) · [p.18](#page-18) · [p.19](#page-19) · [p.20](#page-20) · [p.21](#page-21) · [p.22](#page-22) · [p.23](#page-23) · [p.24](#page-24)
[p.25](#page-25) · [p.26](#page-26) · [p.27](#page-27) · [p.28](#page-28) · [p.29](#page-29) · [p.30](#page-30) · [p.31](#page-31) · [p.32](#page-32) · [p.33](#page-33) · [p.34](#page-34) · [p.35](#page-35) · [p.36](#page-36)
[p.37](#page-37) · [p.38](#page-38) · [p.39](#page-39) · [p.40](#page-40) · [p.41](#page-41) · [p.42](#page-42) · [p.43](#page-43) · [p.44](#page-44) · [p.45](#page-45) · [p.46](#page-46) · [p.47](#page-47) · [p.48](#page-48)
[p.49](#page-49) · [p.50](#page-50) · [p.51](#page-51) · [p.52](#page-52)

## 术语表

| Canonical term | 中文 | 首次使用 / 决定 |
|---|---|---|
| Naive Dynamic Resolution | 朴素动态分辨率 | 保留论文专名大小写 |
| Multimodal Rotary Position Embedding (M-RoPE) | 多模态旋转位置编码 | 首次展开，后文保留 M-RoPE |
| visual token | 视觉 token | 不译为视觉词元 |
| scaling law | 扩展规律 | 避免误写成一般比例关系 |

## 全文逐段对照

<a id="page-1"></a>
### Page 1

<a id="S001"></a>
**Source:** p.1 S001 · Abstract

**Original:** We present the Qwen2-VL Series, an advanced upgrade of the previous Qwen-VL models that redefines the conventional predetermined-resolution approach in visual processing. Qwen2-VL introduces the Naive Dynamic Resolution mechanism, which enables the model to dynamically process images of varying resolutions into different numbers of visual tokens. This approach allows the model to generate more efficient and accurate visual representations, closely aligning with human perceptual processes. The model also integrates Multimodal Rotary Position Embedding (M-RoPE), facilitating the effective fusion of positional information across text, images, and videos. We employ a unified paradigm for processing both images and videos, enhancing the model’s visual perception capabilities. To explore the potential of large multimodal models, Qwen2-VL investigates the scaling laws for large vision-language models (LVLMs). By scaling both the model size—with versions at 2B, 8B, and 72B parameters—and the amount of training data, the Qwen2-VL Series achieves highly competitive performance. Notably, the Qwen2-VL-72B model achieves results comparable to leading models such as GPT-4o and Claude 3.5 Sonnet across various multimodal benchmarks, outperforming other generalist models.

**中文:** 本文提出 Qwen2-VL 系列，它是对 Qwen-VL 的重要升级，重新定义了视觉处理中预先固定分辨率的传统做法。Qwen2-VL 引入朴素动态分辨率机制，可将不同分辨率的图像动态处理成数量不同的视觉 token，从而产生更高效、准确且更贴近人类感知过程的视觉表示。模型还整合多模态旋转位置编码（M-RoPE），以有效融合文本、图像和视频中的位置信息，并使用统一范式处理图像与视频。为探索大型多模态模型的潜力，Qwen2-VL 研究了大型视觉语言模型的扩展规律；通过同时扩大模型规模（2B、8B、72B）和训练数据量，系列模型取得了很有竞争力的性能。论文报告称，Qwen2-VL-72B 在多项多模态基准上达到与 GPT-4o、Claude 3.5 Sonnet 等领先模型相当的结果，并优于其他通用模型。

<a id="S002"></a>
**Source:** p.1 S002

**Original:** arXiv:2409.12191v2 [cs.CV] 3 Oct 2024

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S003"></a>
**Source:** p.1 S003

**Original:** Qwen2-VL: Enhancing Vision-Language Model’s Perception of the World at Any Resolution Peng Wang* Shuai Bai* Sinan Tan* Shijie Wang* Zhihao Fan* Jinze Bai*† Keqin Chen Xuejing Liu Jialin Wang Wenbin Ge Yang Fan Kai Dang Mengfei Du Xuancheng Ren Rui Men Dayiheng Liu Chang Zhou Jingren Zhou Junyang Lin† Qwen Team Alibaba Group

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S004"></a>
**Source:** p.1 S004

**Original:** Introduction

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S005"></a>
**Source:** p.1 S005

**Original:** In the realm of artificial intelligence, Large Vision-Language Models (LVLMs) represent a significant leap forward, building upon the strong textual processing capabilities of traditional large language models. These advanced models now encompass the ability to interpret and analyze a broader spectrum of data, including images, audio, and video. This expansion of capabilities has transformed LVLMs into indispensable tools for tackling a variety of real-world challenges. Recognized for their unique capacity to condense extensive and intricate knowledge into functional representations, LVLMs are paving the way for more comprehensive cognitive systems. By integrating diverse data forms, LVLMs aim to more closely mimic the nuanced ways in which humans perceive and interact with their environment. This allows these models to provide a more accurate representation of how we engage with and perceive our environment Recent advancements in large vision-language models (LVLMs) (Li et al., 2023c; Liu et al., 2023b; Dai et al., 2023; Zhu et al., 2023; Huang et al., 2023a; Bai et al., 2023b; Liu et al., 2023a; Wang et al., 2023b; OpenAI., 2023; Team et al., 2023) have led to significant improvements in a short span. These models (OpenAI, 2023; Touvron et al., 2023a,b; Chiang et al., 2023; Bai et al., 2023a) generally follow a common approach of visual encoder→cross-modal connector→LLM. This setup, combined with next-token prediction as the primary training method and the availability of high-quality datasets (Liu et al., 2023a; Zhang et al., 2023; Chen et al., 2023b; ∗ Equal

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S006"></a>
**Source:** p.1 S006

**Original:** core contribution, † Corresponding author

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-2"></a>
### Page 2

<a id="C001"></a>
**Source:** p.2 C001

**Original:** Figure 1: Qwen2-VL capabilities: Multilingual image text understanding, code/math reasoning, video analysis, live chat, agent potential, and more. See Appendix for details. Li et al., 2023b), has driven much of the progress. Additional factors like larger model architectures (Alayrac et al., 2022), higher-resolution images (Li et al., 2023a,d), and advanced techniques such as mixture-ofexpert models (MoE) (Wang et al., 2023b; Ye et al., 2023b), model ensembles (Lin et al., 2023), and more sophisticated connectors (Ye et al., 2023a) between visual and textual modalities have also played a key role in enhancing LVLMs’ ability to process complex visual and textual information more effectively. However, current large vision-language models (LVLMs) are typically constrained by a fixed image input size. Standard LVLMs encode input images to a fixed resolution (e.g., 224×224), often by either downsampling or upsampling the images (Zhu et al., 2023; Huang et al., 2023a), or by employing a scale-then-padding approach (Liu et al., 2023b,a). While this one-size-fits-all strategy enables processing of images at consistent resolutions, it also limits the model’s ability to capture information at different scales, particularly leading to a significant loss of detailed information in high-resolution images. Consequently, such models fall short of perceiving visual information with the same sensitivity to scale and detail as human vision. Additionally, most LVLMs rely on a static, frozen CLIP-style (Radford et al., 2021) vision encoder, raising concerns about whether the visual representations produced by such pre-trained models are adequate, particularly for complex reasoning tasks and processing intricate details within images. Recent works (Bai et al., 2023b; Ye et al., 2023a) have attempted to address these limitations by fine-tuning the vision transformer (ViT) during the LVLM training process, which has shown to yield improved results. To further enhance the model’s adaptability to varying resolutions, we introduce dynamic resolution training in the LVLM training process. Specifically, we employ a 2D Rotary Position Embedding (RoPE) in the ViT, thus allowing the model to better capture information across different spatial scales. When it comes to video content, which is essentially a sequence of frames, many existing models continue to treat it as an independent modality. However, understanding the dynamic nature of reality, as manifested in videos, is crucial for models aiming to grasp the complexities of the real world. Unlike text, which is inherently one-dimensional, the real-world environment exists in three dimensions. The use of one-dimensional position embeddings in current models significantly limits their ability to model three-dimensional space and temporal dynamics effectively. To bridge this gap, we have developed Multimodal Rotary Position Embedding (M-

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-3"></a>
### Page 3

<a id="C002"></a>
**Source:** p.3 C002

**Original:** Table 1: Model descriptions of Qwen2-VL. Model Name

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S007"></a>
**Source:** p.3 S007

**Original:** Vision Encoder

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S008"></a>
**Source:** p.3 S008

**Original:** LLM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S009"></a>
**Source:** p.3 S009

**Original:** Qwen2-VL-2B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S010"></a>
**Source:** p.3 S010

**Original:** 675M

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S011"></a>
**Source:** p.3 S011

**Original:** 1.5B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S012"></a>
**Source:** p.3 S012

**Original:** Qwen2-VL-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S013"></a>
**Source:** p.3 S013

**Original:** 675M

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S014"></a>
**Source:** p.3 S014

**Original:** 7.6B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S015"></a>
**Source:** p.3 S015

**Original:** Qwen2-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S016"></a>
**Source:** p.3 S016

**Original:** 675M

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S017"></a>
**Source:** p.3 S017

**Original:** 72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S018"></a>
**Source:** p.3 S018

**Original:** Model Description The most efficient model, designed to run on-device. It delivers adequate performance for most scenarios with limited resources. The performance-optimized model in terms of cost, significantly upgraded for text recognition and video understanding capabilities. It delivers significant performance across a broad range of visual tasks. The most capable model, further improvements in visual reasoning, instruction-following, decision-making, and agent capabilities. It delivers optimal performance on most complex tasks.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S019"></a>
**Source:** p.3 S019

**Original:** RoPE), which employs separate components to represent temporal and spatial information. This enables the model to naturally comprehend dynamic content, such as videos or streaming data, improving its ability to understand and interact with the world. Furthermore, compared to the scaling of large language models (LLMs), current LVLMs are still in the early stages of exploring the impact of scaling in terms of training data and model parameters. The exploration of scaling laws for LVLMs—how increases in model and data size affect performance—remains an open and promising area of research. In this work, we introduce the newest addition to the large vision-language models of the Qwen family: Qwen2-VL series, which comprises three open-weight models with total parameter counts of 2 billion, 8 billion, and 72 billion. As shown in Figure 1, the key advances in Qwen2-VL include: • State-of-the-art understanding across various resolutions and aspect ratios: Qwen2-VL achieves leading performance on visual benchmarks, including DocVQA, InfoVQA, RealWorldQA, MTVQA, MathVista, and others. • Comprehension of extended-duration videos (20 min+): Qwen2-VL is capable of understanding videos over 20 minutes in length, enhancing its ability to perform high-quality video-based question answering, dialogue, content creation, and more. • Robust agent capabilities for device operation: With advanced reasoning and decision-making abilities, Qwen2-VL can be integrated with devices such as mobile phones, robots, etc., enabling autonomous operation based on visual inputs and text instructions. • Multilingual support: To serve a global audience, beyond English and Chinese, Qwen2-VL now supports multilingual context understanding within images, including most European languages, Japanese, Korean, Arabic, Vietnamese, and others.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S020"></a>
**Source:** p.3 S020

**Original:** Approach

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S021"></a>
**Source:** p.3 S021

**Original:** The Qwen2-VL series consists of models of 3 sizes, which are Qwen2-VL-2B, Qwen2-VL-7B and Qwen2-VL72B. Table 1 lists the hyper-parameters and important information. Notably, Qwen2-VL employs a 675M parameter ViT across various-sized LLMs, ensuring that the computational load of the ViT remains constant regardless of the scale of the LLM.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S022"></a>
**Source:** p.3 S022

**Original:** 2.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S023"></a>
**Source:** p.3 S023

**Original:** Model Architecture

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C003"></a>
**Source:** p.3 C003

**Original:** Figure 2 illustrates the comprehensive structure of Qwen2-VL. We have retained the Qwen-VL (Bai et al., 2023b) framework, which integrates vision encoders and language models. For various scale adaptations, we 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-4"></a>
### Page 4

<a id="C004"></a>
**Source:** p.4 C004

**Original:** Figure 2: Qwen2-VL is capable of accurately identifying and comprehending the content within images, regardless of their clarity, resolution, or extreme aspect ratios. have implemented a Vision Transformer (ViT) (Dosovitskiy et al., 2021) with approximately 675 million parameters, adept at handling both image and video inputs. In terms of language processing, we have opted for the more powerful Qwen2 (Yang et al., 2024) series of language models. To further enhance the model’s ability to effectively perceive and comprehend visual information in videos, we introduced several key upgrades: Naive Dynamic Resolution A key architectural improvement in Qwen2-VL is the introduction of naive dynamic resolution support (Dehghani et al., 2024). Unlike Qwen-VL, Qwen2-VL can now process images of any resolution, dynamically converting them into a variable number of visual tokens.1 To support this feature, we modified ViT by removing the original absolute position embeddings and introducing 2D-RoPE (Su et al., 2024; Su, 2021) to capture the two-dimensional positional information of images. At the inference stage, images of varying resolutions are packed into a single sequence, with the packed length controlled to limit GPU memory usage. Furthermore, to reduce the visual tokens of each image, a simple MLP layer is employed after the ViT to compress adjacent 2 × 2 tokens into a single token, with the special &lt;|vision_start|&gt; and &lt;|vision_end|&gt; tokens placed at the beginning and end of the compressed visual tokens. As a result, an image with a resolution of 224 × 224, encoded with a ViT using patch_size=14, will be compressed to 66 tokens before entering LLM. Multimodal Rotary Position Embedding (M-RoPE) Another key architectural enhancement is the innovation of Multimodal Rotary Position Embedding (M-RoPE). Unlike the traditional 1D-RoPE in LLMs, which is limited to encoding one-dimensional positional information, M-RoPE effectively models the positional 1 This

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S024"></a>
**Source:** p.4 S024

**Original:** technology was previously implemented in the internal iterations, Qwen-VL Plus and Qwen-VL MAX. We have further upgraded it in Qwen2-VL.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-5"></a>
### Page 5

<a id="C005"></a>
**Source:** p.5 C005

**Original:** Figure 3: A demonstration of M-RoPE. By decomposing rotary embedding into temporal, height, and width components, M-RoPE can explicitly model the positional information of text, images, and video in LLM. information of multimodal inputs. This is achieved by deconstructing the original rotary embedding into three components: temporal, height, and width. For text inputs, these components utilize identical position IDs, making M-RoPE functionally equivalent to 1D-RoPE (Su, 2024). When processing images, the temporal IDs of each visual token remain constant, while distinct IDs are assigned to the height and width components based on the token’s position in the image. For videos, which are treated as sequences of frames, the temporal ID increments for each frame, while the height and width components follow the same ID assignment pattern as images. In scenarios where the model’s input encompasses multiple modalities, position numbering for each modality is initialized by incrementing the maximum position ID of the preceding modality by one. An illustration of M-RoPE is shown in Figure 3. M-RoPE not only enhances the modeling of positional information but also reduces the value of position IDs for images and videos, enabling the model to extrapolate to longer sequences during inference. Unified Image and Video Understanding Qwen2-VL employs a mixed training regimen incorporating both image and video data, ensuring proficiency in image understanding and video comprehension. To preserve video information as completely as possible, we sampled each video at two frames per second. Additionally, we integrated 3D convolutions (Carreira and Zisserman, 2017) with a depth of two to process video inputs, allowing the model to handle 3D tubes instead of 2D patches, thus enabling it to process more video frames without increasing the sequence length (Arnab et al., 2021). For consistency, each image is treated as two identical frames. To balance the computational demands of long video processing with overall training efficiency, we dynamically adjust the resolution of each video frame, limiting the total number of tokens per video to 16384. This training approach strikes a balance between the model’s ability to comprehend long videos and training efficiency.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S025"></a>
**Source:** p.5 S025

**Original:** 2.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S026"></a>
**Source:** p.5 S026

**Original:** Training

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S027"></a>
**Source:** p.5 S027

**Original:** Following Qwen-VL (Bai et al., 2023b), we adopt a three-stage training methodology. In the first stage, we focus exclusively on training the Vision Transformer (ViT) component, utilizing a vast corpus of image-text pairs to enhance semantic understanding within the Large Language Model (LLM). In the second stage, we unfreeze all parameters and train with a wider range of data for more comprehensive learning. In the final stage, we lock the ViT parameters and perform exclusive fine-tuning of the LLM using instructional datasets. The model is pre-trained on a diverse dataset that includes image-text pairs, optical character recognition (OCR) data, interleaved image-text articles, visual question answering datasets, video dialogues, and image knowledge datasets. Our data sources primarily comprise cleaned web pages, open-source datasets, and synthetic data. The cutoff date for our data knowledge is June 2023. This diverse data composition is instrumental in developing a robust multimodal understanding capability. During the initial pre-training phase, Qwen2-VL is exposed to a corpus of around 600 billion tokens. The LLM component of Qwen2-VL is initialized using the parameters from Qwen2 (Yang et al., 2024), while the vision encoder of Qwen2-VL is initialized with the ViT derived from DFN. However, the fixed position embedding in the original DFN’s ViT (Fang et al., 2023) is replaced by RoPE-2D. This pre-training phase 5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-6"></a>
### Page 6

<a id="S028"></a>
**Source:** p.6 S028

**Original:** primarily focuses on learning image-text relationships, textual content recognition within images through OCR, and image classification tasks. Such foundational training is instrumental in enabling the model to develop a robust understanding of core visual-textual correlations and alignments. The second pre-training phase marks a significant progression, involving an additional 800 billion tokens of image-related data. This stage introduces a higher volume of mixed image-text content, facilitating a more nuanced understanding of the interplay between visual and textual information. The incorporation of visual question answering datasets refines the model’s capacity to respond to image-related queries. Moreover, the inclusion of multitasking datasets is pivotal in developing the model’s ability to navigate diverse tasks concurrently, a skill of paramount importance when dealing with complex, real-world datasets. Concurrently, purely textual data continues to play a crucial role in maintaining and advancing the model’s linguistic proficiency. Throughout the pre-training stages, Qwen2-VL processes a cumulative total of 1.4 trillion tokens. Specifically, these tokens encompass not only text tokens but also image tokens. During the training process, however, we only provide supervision for the text tokens. This exposure to extensive and diverse linguistic and visual scenarios ensures that the model develops a deep understanding of the intricate relationships between visual and textual information, thereby laying a robust foundation for various multimodal tasks. During the instruction fine-tuning phase, we employ the ChatML (Openai, 2024) format to construct instruction-following data. This dataset encompasses not only pure text-based dialogue data but also multimodal conversational data. The multimodal components include image question-answering, document parsing, multi-image comparison, video comprehension, video stream dialogue, and agent-based interactions. Our comprehensive approach to data construction aims to enhance the model’s capability to understand and execute a wide range of instructions across various modalities. By incorporating diverse data types, we seek to develop a more versatile and robust language model capable of handling complex, multimodal tasks in addition to traditional text-based interactions. 2.2.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S029"></a>
**Source:** p.6 S029

**Original:** Data Format.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S030"></a>
**Source:** p.6 S030

**Original:** In line with Qwen-VL, Qwen2-VL also employs special tokens to distinguish vision and text inputs. Tokens &lt;|vision_start|&gt; and &lt;|vision_end|&gt; are inserted at the start and end of the image feature sequence to demarcate the image content. Dialogue Data. In terms of dialogue format, we construct our instruction tuning dataset using the ChatML format, where each interaction’s statement is marked with two special tokens (&lt;|im_start|&gt; and &lt;|im_end|&gt;) to facilitate dialogue termination. The sections marked in blue indicate the supervised parts. The Dataset Format Example of ChatML &lt;|im_start|&gt;user &lt;|vision_start|&gt;Picture1.jpg&lt;|vision_end|&gt;&lt;|vision_start|&gt;Picture2.jpg&lt;|vision_end|&gt;What do the two pictures have in common?&lt;|im_end|&gt; &lt;|im_start|&gt;assistant Both pictures are of SpongeBob SquarePants. &lt;|im_end|&gt; &lt;|im_start|&gt;user What is happening in the video?&lt;|vision_start|&gt;video.mp4&lt;|vision_end|&gt;&lt;|im_end|&gt; &lt;|im_start|&gt;assistant The protagonist in the video is frying an egg.&lt;|im_end|&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S031"></a>
**Source:** p.6 S031

**Original:** Visual Grounding. To endow the model with visual grounding capabilities, bounding box coordinates are normalized within [0, 1000) and represented as "(Xtop left , Ytop left ), (Xbottom right , Ybottom right )". Tokens

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-7"></a>
### Page 7

<a id="S032"></a>
**Source:** p.7 S032

**Original:** &lt;|box_start|&gt; and &lt;|box_end|&gt; are utilized to demarcate bounding box text. To accurately link bounding boxes with their textual descriptions, we introduce tokens &lt;|object_ref_start|&gt; and &lt;|object_ref_end|&gt; to indicate the content that the bounding box references, thereby allowing the model to effectively interpret and generate precise descriptions of specific regions. Referring Grounding &lt;|vision_start|&gt;Picture1.jpg&lt;|vision_end|&gt; &lt;|object_ref_start|&gt;the eyes on a giraffe&lt;|object_ref_end|&gt;&lt;|box_start|&gt;(176,106),(232,160) &lt;|box_end|&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S033"></a>
**Source:** p.7 S033

**Original:** Visual Agent. To develop Qwen2-VL as a general-purpose VL-Agent, we treat various agent tasks, such as UI Operations, Robotic Control, Games, and Navigation, as sequential decision-making problems, enabling Qwen2-VL to accomplish tasks through multi-step action execution. For each task, we first define a set of permissible actions and keywords pattern (underline) for function call (Qwen Team, 2024). Qwen2-VL then analyzes the observations, performs reasoning and planning, executes the selected actions, and interacts with the environment to acquire new observations. This cycle repeats iteratively until the task is successfully completed. By integrating various tools and leveraging the vision perception capabilities of large visionlanguage models (LVLMs), Qwen2-VL is able to iteratively execute increasingly complex tasks involving real-world visual interactions. Visual Agent &lt;|im_start|&gt;system You are a helpful assistant. # Actions ## You have the following actions. ### Tap Tap: A gentle tap that commands, chooses, or navigates through a smartphone’s user interface. Parameters: [{"name": "point", "description": "The specific spot of interest on the monitor, denoted by the coordinates (x, y) where x and y range from 0 to 1000.", "required": True}] ### Home Home: Go to phone’s home screen. Parameters: [] ### Other Actions ... ## Continuously take action until the task is completed. *FUNCTION*: The action to take, should be one of {Actions}. *ARGS*: The input of the action. *RESULT*: Action results. *RETURN*: Reply based on action results. &lt;|im_end|&gt; &lt;|im_start|&gt;user Find a pizza restaurant nearby in Map. &lt;|vision_start|&gt;Screenshot_1.jpg&lt;|vision_end|&gt; &lt;|im_end|&gt; &lt;|im_start|&gt;assistant Several e-mails are displaying on the phone screen. To open Map, I need go back to the home screen and find the corresponding app icon. *FUNCTION*: Home *ARGS*: {} *RESULT*: &lt;|vision_start|&gt;Screenshot_2.jpg&lt;|vision_end|&gt; *RETURN*: I return to the home screen. Next, I need to find the icon of Map and tap on it. *FUNCTION*: Tap *ARGS*: {"point": (348,291)} *RESULT*: &lt;|vision_start|&gt;Screenshot_3.jpg&lt;|vision_end|&gt; *RETURN*: [Thinking for the next action.] [Other subsequent actions.] ...... I have found the pizza restaurant nearby in Map. &lt;|im_end|&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-8"></a>
### Page 8

<a id="S034"></a>
**Source:** p.8 S034

**Original:** 2.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S035"></a>
**Source:** p.8 S035

**Original:** Multimodal Model Infrastructure

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S036"></a>
**Source:** p.8 S036

**Original:** The Qwen2-VL models were trained on Alibaba Cloud’s PAI-Lingjun Intelligent Computing Service (AlibabaCloud, 2024c) with its scalable computing, auto resuming and straggler detection. Storage. We use Alibaba Cloud’s ultra-speed CPFS (Cloud Parallel File Storage) (Alibaba-Cloud, 2024a) to build a storage system of Qwen2-VL pre-training and post-training. We decoupled the text data and vision data storage. We simply store text data on CPFS and use mmap for efficient access. For vision data, we use Alibaba Cloud’s OSS (Object Storage Service) (Alibaba-Cloud, 2024b) for persistent storage. During training, we accessed vision data through OSS’s python-client concurrently and tuned the concurrency and retrying parameters to avoid reaching the QPS (queries per second) limit. We also found that video data decoding is a main bottleneck, especially for long videos. After several attempts with open-source (FFmpeg-Developers, 2024) and in-house software failed, we opted for a caching decoding technique. Checkpointing saves each GPU’s optimizer and model states on CPFS. Parallelism. We use 3D parallelism which combines data parallelism (DP) (Li et al., 2020), tensor parallelism (TP) (Krizhevsky et al., 2012; Shoeybi et al., 2019) and pipeline parallelism (PP) (Huang et al., 2019; Narayanan et al., 2021; Lamy-Poirier, 2023) to scale Qwen2-VL model training. We also leverage deepspeed’s zero-1 redundancy optimizer (Rajbhandari et al., 2020) to shard states for memory saving. Sequence parallelism (SP) (Korthikanti et al., 2023) with selective checkpointing activation (Chen et al., 2016) was leveraged to reduce memory usage. When enabling TP training, we always shard the vision encoder and large language models together but not the vision merger due to its relatively few parameters. We found the TP training would result in different model shared-weights due to the convolution operator’s non-deterministic behavior 2 . We resolved this issue by performing offline reduction of the shared weights, thereby avoiding an additional all-reduce communication step. This approach resulted in only a minimal impact on performance. We leverage 1F1B PP (Narayanan et al., 2021) for Qwen2-VL 72B training. We combine the vision encoder, vision adapter and several LLM’s decoder layers into one stage, and evenly split the remaining decoder layers. Note that the vision and text sequence lengths are dynamic for each data point. We broadcast the dynamic sequence lengths before initiating the 1F1B process and access the shape information using batch indices. We also implemented an interleaved 1F1B PP (Narayanan et al., 2021) but found it is slower than the standard 1F1B setting. Software. We use PyTorch (Paszke et al., 2019; Ansel et al., 2024) version 2.1.2 with CUDA 11.8 (Nvidia, 2024b) for training. Additionally, we leverage flash-attention (Dao et al., 2022; Dao, 2024; Shah et al., 2024) for efficient training in both the vision encoder and the LLM. We also utilize fused operators (Nvidia, 2024a) such as LayerNorm (Ba et al., 2016), RMSNorm (Zhang and Sennrich, 2019), and Adam (Loshchilov and Hutter, 2019). Besides this, we leverage the overlap of communication and computation during matrix multiplication in our training process.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S037"></a>
**Source:** p.8 S037

**Original:** Experiments

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S038"></a>
**Source:** p.8 S038

**Original:** In this section, we first evaluate the model’s performance by conducting a comparative analysis across a variety of visual benchmarks, demonstrating the advantages of our approach. Subsequently, we carry out a detailed examination of specific capabilities, including general visual perception, document understanding, multilingual recognition in images, video comprehension, and agent abilities. Finally, we present an ablation study to investigate several key components of our approach. 2 https://pytorch.org/docs/stable/notes/randomness.html

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-9"></a>
### Page 9

<a id="C006"></a>
**Source:** p.9 C006

**Original:** Table 2: Performance Comparison of Qwen2-VL Models and State-of-the-art. Benchmark MMMUval (Yue et al., 2023) DocVQAtest (Mathew et al., 2021) InfoVQAtest (Mathew et al., 2021) AI2D (Kembhavi et al., 2016) ChartQAtest (Masry et al., 2022) TextVQAval (Singh et al., 2019) OCRBench (Liu et al., 2023e) MTVQA (Tang et al., 2024) VCRen easy (Zhang et al., 2024c) VCRzh easy (Zhang et al., 2024c) RealWorldQA (X.AI, 2024a) MMEsum (Fu et al., 2023) MMBench-ENtest (Liu et al., 2023d) MMBench-CNtest (Liu et al., 2023d) MMBench-V1.1test (Liu et al., 2023d) MMT-Benchtest (Ying et al., 2024) MMStar (Chen et al., 2024a) MMVetGPT-4-Turbo (Yu et al., 2024) HallBenchavg (Guan et al., 2023) MathVistatestmini (Lu et al., 2024a) MathVision (Wang et al., 2024) MMMU-Pro (Yue et al., 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S039"></a>
**Source:** p.9 S039

**Original:** Previous SoTA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S040"></a>
**Source:** p.9 S040

**Original:** Claude-3.5 Sonnet

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S041"></a>
**Source:** p.9 S041

**Original:** GPT-4o

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S042"></a>
**Source:** p.9 S042

**Original:** Qwen2-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S043"></a>
**Source:** p.9 S043

**Original:** Qwen2-VL-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S044"></a>
**Source:** p.9 S044

**Original:** Qwen2-VL-2B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S045"></a>
**Source:** p.9 S045

**Original:** 66.1 (X.AI, 2024b) 94.1 (Chen et al., 2024c) 82.0 (Chen et al., 2024c) 87.6 (Chen et al., 2024c) 88.4 (Chen et al., 2024c) 84.4 (Chen et al., 2024c) 852 (Yao et al., 2024) 23.2 (Team et al., 2023) 84.7 (Chen et al., 2024c) 22.1 (Chen et al., 2024c) 72.2 (Chen et al., 2024c) 2414.7 (Chen et al., 2024c) 86.5 (Chen et al., 2024c) 86.3 (Chen et al., 2024c) 85.5 (Chen et al., 2024c) 63.4 (Chen et al., 2024b) 67.1 (Chen et al., 2024c) 67.5 (OpenAI., 2023) 55.2 (Chen et al., 2024c) 69.0 (X.AI, 2024b) 30.3 (OpenAI, 2023) 46.9 (Team et al., 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S046"></a>
**Source:** p.9 S046

**Original:** 68.3 95.2 80.2(94.7) 90.8 788 25.7 63.9 1.0 60.1 1920.0 79.7 80.7 78.5 62.2 66.0 49.9 67.7 51.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S047"></a>
**Source:** p.9 S047

**Original:** 69.1 92.8 84.6(94.2) 85.7 736 27.8 91.6 14.9 75.4 2328.7 83.4 82.1 82.2 65.5 63.9 69.1 55.0 63.8 30.4 51.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S048"></a>
**Source:** p.9 S048

**Original:** 64.5 96.5 84.5 88.1 88.3 85.5 877 30.9 91.9 65.4 77.8 2482.7 86.5 86.6 85.9 71.7 68.3 74.0 58.1 70.5 25.9 46.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S049"></a>
**Source:** p.9 S049

**Original:** 54.1 94.5 76.5 83.0 83.0 84.3 866 25.6 89.7 59.9 70.1 2326.8 83.0 80.5 80.7 63.7 60.7 62.0 50.6 58.2 16.3 43.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S050"></a>
**Source:** p.9 S050

**Original:** 41.1 90.1 65.5 74.7 73.5 79.7 809 18.1 81.5 46.2 62.9 1872.0 74.9 73.5 72.2 54.5 48.0 49.5 41.7 43.0 12.4 37.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C007"></a>
**Source:** p.9 C007

**Original:** Table 3: Performance of Qwen2-VL and GPT-4o on internal multilingual OCR benchmarks. Language GPT-4o Qwen2-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S051"></a>
**Source:** p.9 S051

**Original:** 3.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S052"></a>
**Source:** p.9 S052

**Original:** Korean

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S053"></a>
**Source:** p.9 S053

**Original:** Japanese

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S054"></a>
**Source:** p.9 S054

**Original:** French

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S055"></a>
**Source:** p.9 S055

**Original:** German

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S056"></a>
**Source:** p.9 S056

**Original:** Italian

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S057"></a>
**Source:** p.9 S057

**Original:** Russian

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S058"></a>
**Source:** p.9 S058

**Original:** Vietnamese

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S059"></a>
**Source:** p.9 S059

**Original:** Arabic

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S060"></a>
**Source:** p.9 S060

**Original:** 87.8 94.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S061"></a>
**Source:** p.9 S061

**Original:** 88.3 93.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S062"></a>
**Source:** p.9 S062

**Original:** 89.7 94.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S063"></a>
**Source:** p.9 S063

**Original:** 88.3 91.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S064"></a>
**Source:** p.9 S064

**Original:** 74.1 89.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S065"></a>
**Source:** p.9 S065

**Original:** 96.8 97.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S066"></a>
**Source:** p.9 S066

**Original:** 72.0 73.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S067"></a>
**Source:** p.9 S067

**Original:** 75.9 70.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S068"></a>
**Source:** p.9 S068

**Original:** Compare to SOTAs

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S069"></a>
**Source:** p.9 S069

**Original:** We evaluate the visual capabilities of our model through various visual benchmarks, video tasks, and agentbased assessments. Qwen2-VL demonstrates highly competitive performance at the same scale, achieving new state-of-the-art (SoTA) results. Overall, our 72B model consistently delivers top-tier performance across most evaluation metrics, frequently surpassing even closed-source models such as GPT-4o (OpenAI, 2024) and Claude 3.5-Sonnet (Anthropic, 2024). Notably, it exhibits a significant advantage in document understanding tasks. However, in the MMMU (Yue et al., 2023) benchmark, our model still lags behind GPT-4o to some extent, indicating that Qwen2-VL-72B has room for improvement when handling more complex and challenging problem sets.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S070"></a>
**Source:** p.9 S070

**Original:** 3.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S071"></a>
**Source:** p.9 S071

**Original:** Quantitative Results

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S072"></a>
**Source:** p.9 S072

**Original:** In this section, we present an extensive evaluation of the Qwen2-VL series across an array of datasets, offering a comprehensive understanding of the model’s capabilities in various aspects. 3.2.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S073"></a>
**Source:** p.9 S073

**Original:** General Visual Question Answering

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S074"></a>
**Source:** p.9 S074

**Original:** To rigorously assess our models’ capabilities in general visual question answering tasks, we conduct extensive evaluations across a diverse array of state-of-the-art benchmarks: RealWorldQA (X.AI, 2024a), MMStar (Chen et al., 2024a), MMVet (Yu et al., 2024), MMT-Bench (Ying et al., 2024), MMBench (Liu et al., 2023d), MMbench-1.1 (Liu et al., 2023d), MME (Fu et al., 2023), and HallusionBench (Guan et al., 2023). The Qwen2-VL series exhibits exceptional performance across these benchmarks, with the 72B model consistently achieving or surpassing state-of-the-art results, while the 7B and 2B variants also demonstrate robust capabilities. On RealWorldQA, which evaluates real-world spatial comprehension, Qwen2-VL-72B achieves a

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-10"></a>
### Page 10

<a id="C008"></a>
**Source:** p.10 C008

**Original:** Table 4: Performance of Qwen2-VL and other models on video benchmarks. Benchmark MVBench (Li et al., 2024) PerceptionTesttest (Patraucean et al., 2024) EgoSchematest (Mangalam et al., 2023) Video-MME(wo/w subs) (Fu et al., 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S075"></a>
**Source:** p.10 S075

**Original:** Previous SoTA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S076"></a>
**Source:** p.10 S076

**Original:** Gemini 1.5-Pro

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S077"></a>
**Source:** p.10 S077

**Original:** GPT-4o

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S078"></a>
**Source:** p.10 S078

**Original:** Qwen2-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S079"></a>
**Source:** p.10 S079

**Original:** Qwen2-VL-7B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S080"></a>
**Source:** p.10 S080

**Original:** Qwen2-VL-2B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S081"></a>
**Source:** p.10 S081

**Original:** 69.6 66.9 62.0 66.3/69.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S082"></a>
**Source:** p.10 S082

**Original:** 63.2 75.0/81.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S083"></a>
**Source:** p.10 S083

**Original:** 72.2 71.9/77.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S084"></a>
**Source:** p.10 S084

**Original:** 73.6 68.0 77.9 71.2/77.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S085"></a>
**Source:** p.10 S085

**Original:** 67.0 62.3 66.7 63.3/69.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S086"></a>
**Source:** p.10 S086

**Original:** 63.2 53.9 54.9 55.6/60.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C009"></a>
**Source:** p.10 C009

**Original:** Table 5: Performance Comparison of Qwen2-VL-72B across various agent benchmarks and GPT-4o. SR, GC, TM and EM are short for success rate, goal-condition success, type match and exact match. ALFRED, R2R and REVERIE are performance in valid-unseen. Benchmark

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S087"></a>
**Source:** p.10 S087

**Original:** Metric

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S088"></a>
**Source:** p.10 S088

**Original:** Previous SoTA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S089"></a>
**Source:** p.10 S089

**Original:** GPT-4o

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S090"></a>
**Source:** p.10 S090

**Original:** Qwen2-VL-72B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S091"></a>
**Source:** p.10 S091

**Original:** General

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S092"></a>
**Source:** p.10 S092

**Original:** FnCall

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S093"></a>
**Source:** p.10 S093

**Original:** TM EM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S094"></a>
**Source:** p.10 S094

**Original:** -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S095"></a>
**Source:** p.10 S095

**Original:** 90.2 50.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S096"></a>
**Source:** p.10 S096

**Original:** 93.1 53.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S097"></a>
**Source:** p.10 S097

**Original:** UI Operations

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S098"></a>
**Source:** p.10 S098

**Original:** AITZ (Zhang et al., 2024b)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S099"></a>
**Source:** p.10 S099

**Original:** TM EM

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S100"></a>
**Source:** p.10 S100

**Original:** 83.0 (Hong et al., 2023) 47.7 (Zhan and Zhang, 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S101"></a>
**Source:** p.10 S101

**Original:** 70.0 35.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S102"></a>
**Source:** p.10 S102

**Original:** 89.6 72.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S103"></a>
**Source:** p.10 S103

**Original:** Card Games

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S104"></a>
**Source:** p.10 S104

**Original:** Number Line (Zhai et al., 2024) BlackJack (Zhai et al., 2024) EZPoint (Zhai et al., 2024) Point24 (Zhai et al., 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S105"></a>
**Source:** p.10 S105

**Original:** SR SR SR SR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S106"></a>
**Source:** p.10 S106

**Original:** 89.4 (Zhai et al., 2024) 40.2 (Zhai et al., 2024) 50.0 (Zhai et al., 2024) 2.6 (Liu et al., 2023b)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S107"></a>
**Source:** p.10 S107

**Original:** 91.5 34.5 85.5 3.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S108"></a>
**Source:** p.10 S108

**Original:** 100.0 42.6 100.0 4.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S109"></a>
**Source:** p.10 S109

**Original:** Robotic Control

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S110"></a>
**Source:** p.10 S110

**Original:** ALFRED (Shridhar et al., 2020a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S111"></a>
**Source:** p.10 S111

**Original:** SR GC

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S112"></a>
**Source:** p.10 S112

**Original:** 67.7 (Lu et al., 2023) 75.3 (Lu et al., 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S113"></a>
**Source:** p.10 S113

**Original:** -

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S114"></a>
**Source:** p.10 S114

**Original:** 67.8 75.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S115"></a>
**Source:** p.10 S115

**Original:** Navigation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S116"></a>
**Source:** p.10 S116

**Original:** R2R (Anderson et al., 2018) REVERIE (Qi et al., 2020)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S117"></a>
**Source:** p.10 S117

**Original:** SR SR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S118"></a>
**Source:** p.10 S118

**Original:** 79.0 (Chen et al., 2022) 61.0 (Sigurdsson et al., 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S119"></a>
**Source:** p.10 S119

**Original:** 43.7 31.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S120"></a>
**Source:** p.10 S120

**Original:** 51.7 31.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S121"></a>
**Source:** p.10 S121

**Original:** score of 77.8, surpassing both the previous state-of-the-art (72.2) and formidable baselines such as GPT-4o (75.4), thus demonstrating superior understanding of physical environments. For MMStar, a benchmark designed to assess genuine multimodal capabilities through visually indispensable samples, Qwen2-VL-72B attains 68.3, outperforming the previous best of 67.1 and highlighting its proficiency in integrating visual and textual information. On MMVet, which evaluates the integration of core vision-language capabilities across 16 complex multimodal tasks, Qwen2-VL-72B achieves a remarkable 74.0, significantly outperforming strong competitors including GPT-4V (67.5) and showcasing its versatility in addressing diverse multimodal challenges. In the MMT-Bench evaluation, which assesses advanced reasoning and instruction following across 32 core meta-tasks and 162 subtasks in multimodal understanding, Qwen2-VL-72B achieves 71.7, markedly surpassing the previous best (63.4) and demonstrating its prowess in applying expert knowledge and executing deliberate visual recognition, localization, reasoning, and planning. On MMBench, which evaluates fine-grained abilities across 20 dimensions, Qwen2-VL-72B exhibits strong performance, achieving 86.5 on the English test set, matching the state-of-the-art, and 86.6 on the Chinese test set, establishing a new benchmark. For MME, which measures a wide spectrum of perception and cognition abilities across 14 subtasks, Qwen2-VL-72B achieves a cumulative score of 2482.7, significantly outperforming the previous best (2414.7), underscoring its advanced capabilities in both visual perception and high-level cognition tasks. These comprehensive results underscore the Qwen2-VL series’ exceptional proficiency in general visual question answering tasks. The models demonstrate advanced capabilities in real-world spatial comprehension, genuine multimodal integration, complex reasoning, instruction following, and a broad range of perception and cognition tasks. The consistent superior performance across diverse benchmarks, particularly the outstanding results of the 72B model, positions the Qwen2-VL series as a leading solution in the field of visual question answering. Our models excel in handling visually indispensable tasks, integrating core vision-language capabilities, and demonstrating expertise across diverse multimodal scenarios, ranging from fundamental perception tasks to complex reasoning and planning. This exhaustive evaluation highlights the Qwen2-VL series’ versatility and effectiveness in addressing the multifaceted challenges posed by state-ofthe-art multimodal benchmarks, thereby setting a new standard for large vision-language models.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-11"></a>
### Page 11

<a id="S122"></a>
**Source:** p.11 S122

**Original:** 3.2.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S123"></a>
**Source:** p.11 S123

**Original:** Document and Diagrams Reading

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S124"></a>
**Source:** p.11 S124

**Original:** We tested our model’s OCR and document and diagram comprehension on DocVQA (Mathew et al., 2021), ChartQA (Masry et al., 2022),InfoVQA (Mathew et al., 2021), TextVQA (Singh et al., 2019),AI2D (Kembhavi et al., 2016) datasets. The DocVQA/InfoVQA/ChartQA dataset focuses on the model’s ability to comprehend text in documents/high-resolution infographics/charts, while the TextVQA dataset examines the ability to comprehend text in naturalistic images. The OCRBench dataset is a a dataset of mixed tasks, which focuses on mathematical formula parsing and information extraction in addition to the text-based VQA. The AI2D dataset focuses on multiple-choice questions on scientific diagrams containing text. In addition, we also tested the OCR and formula recognition capabilities of our model on OCRBench (Liu et al., 2023e), as well as the multilingual OCR capabilities of our model on the MTVQA (Tang et al., 2024) dataset. The experimental results show that our model achieves SoTA level in several metrics, including DocVQA, InfoVQA, TextVQA and OCRBench, demonstrating that our model has good comprehension of textual content in images from multiple domains. 3.2.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S125"></a>
**Source:** p.11 S125

**Original:** Multilingual Text Recognition and Understanding

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S126"></a>
**Source:** p.11 S126

**Original:** In particular, our model surpasses all existing general-purpose LVLMs in multilingual OCR. Our model not only outperforms existing LVLMs (including proprietary models such as GPT-4o, Claude 3.5 Sonnet, etc.) on the public-available MTVQA dataset, it also outperforms GPT-4o on the in-house internal benchmark across all foreign languages except Arabic (Table 3). 3.2.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S127"></a>
**Source:** p.11 S127

**Original:** Mathematical Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S128"></a>
**Source:** p.11 S128

**Original:** We’ve conducted experiments on the MathVista (Lu et al., 2024a) and MathVision (Wang et al., 2024) datasets to assess mathematical reasoning capabilities. MathVista is a comprehensive benchmark featuring 6,141 diverse examples of mathematical and visual tasks. The MathVision dataset comprises 3,040 math problems embedded in visual contexts from actual math competitions, covering 16 mathematical disciplines and varying in difficulty across five levels. These challenges underscore the necessity for LVLMs to exhibit strong visual comprehension, a deep understanding of mathematics, and sound logical reasoning skills. The Qwen2-VL series has demonstrated superior performance on MathVista, achieving a 70.5 outperforming other LVLMs. Additionally, it has set a new open-source benchmark on MathVision with 25.9. 3.2.5

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S129"></a>
**Source:** p.11 S129

**Original:** Referring Expression Comprehension

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S130"></a>
**Source:** p.11 S130

**Original:** Regarding visual localization task, we evaluate Qwen2-VL on RefCOCO, RefCOCO+, and RefCOCOg datasets (Kazemzadeh et al., 2014; Mao et al., 2016). The results, as depicted in Table 6, demonstrate that Qwen2-VL attains top-tier results among generalist models. Benefiting from a more rational structure design, Qwen2-VL is able to perceive details in high-resolution images, leading to significant improvements over Qwen-VL. The superiority of these models in comparison to both generalist and specialized models highlights their potential for advancing the field of visual localization and their capacity for real-world implementation in tasks requiring precise visual understanding. 3.2.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S131"></a>
**Source:** p.11 S131

**Original:** Video Understanding

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S132"></a>
**Source:** p.11 S132

**Original:** We evaluate our models on various video understanding tasks, with related benchmarks covering short videos of a few seconds to long videos of up to one hour. Table 4 presents the performance of Qwen2-VL and baseline models. Overall, Qwen2-VL demonstrates strong results across 2B, 7B, and 72B sizes, with Qwen2-VL-72B achieving the best performance on MVBench (Li et al., 2024), PerceptionTest (Patraucean et al., 2024), and EgoSchema (Mangalam et al., 2023). This showcases Qwen2-VL’s superior capabilities in 11

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-12"></a>
### Page 12

<a id="C010"></a>
**Source:** p.12 C010

**Original:** Table 6: Performance Comparison on Referring Expression Comprehension Task. Type

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S133"></a>
**Source:** p.12 S133

**Original:** RefCOCO

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S134"></a>
**Source:** p.12 S134

**Original:** Model

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S135"></a>
**Source:** p.12 S135

**Original:** RefCOCO+

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S136"></a>
**Source:** p.12 S136

**Original:** RefCOCOg

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S137"></a>
**Source:** p.12 S137

**Original:** val

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S138"></a>
**Source:** p.12 S138

**Original:** test-A

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S139"></a>
**Source:** p.12 S139

**Original:** test-B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S140"></a>
**Source:** p.12 S140

**Original:** val

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S141"></a>
**Source:** p.12 S141

**Original:** test-A

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S142"></a>
**Source:** p.12 S142

**Original:** test-B

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S143"></a>
**Source:** p.12 S143

**Original:** val

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S144"></a>
**Source:** p.12 S144

**Original:** test

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S145"></a>
**Source:** p.12 S145

**Original:** Generalist

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S146"></a>
**Source:** p.12 S146

**Original:** OFA-L (Wang et al., 2022) Shikra (Chen et al., 2023a) Qwen-VL (Bai et al., 2023b) Ferretv2 (Zhang et al., 2024a) CogVLM (Wang et al., 2023b) InternVL22b (Chen et al., 2024c) InternVL28b (Chen et al., 2024c) InternVL276b (Chen et al., 2024c) Qwen2-VL2b Qwen2-VL7b Qwen2-VL72b

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S147"></a>
**Source:** p.12 S147

**Original:** 80.0 87.0 89.4 92.6 92.8 82.3 87.1 92.2 87.6 91.7 93.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S148"></a>
**Source:** p.12 S148

**Original:** 83.7 90.6 92.3 95.0 94.8 88.2 91.1 94.8 90.6 93.6 95.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S149"></a>
**Source:** p.12 S149

**Original:** 76.4 80.2 85.3 88.9 89.0 75.9 80.7 88.4 82.3 87.3 90.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S150"></a>
**Source:** p.12 S150

**Original:** 68.3 81.6 83.1 87.4 88.7 73.5 79.8 88.8 79.0 85.8 90.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S151"></a>
**Source:** p.12 S151

**Original:** 76.0 87.4 88.3 92.1 92.9 82.8 87.9 93.1 84.9 90.5 93.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S152"></a>
**Source:** p.12 S152

**Original:** 61.8 72.1 77.2 81.4 83.4 63.3 71.4 82.8 71.0 79.5 85.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S153"></a>
**Source:** p.12 S153

**Original:** 67.6 82.3 85.6 89.4 89.8 77.6 82.7 89.5 81.2 87.3 89.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S154"></a>
**Source:** p.12 S154

**Original:** 67.6 82.2 85.5 90.0 90.8 78.3 82.7 90.3 80.3 87.8 90.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S155"></a>
**Source:** p.12 S155

**Original:** Specialist

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S156"></a>
**Source:** p.12 S156

**Original:** G-DINO-L (Liu et al., 2023c) UNINEXT-H (Yan et al., 2023) ONE-PEACE (Wang et al., 2023a)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S157"></a>
**Source:** p.12 S157

**Original:** 90.6 92.6 92.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S158"></a>
**Source:** p.12 S158

**Original:** 93.2 94.3 94.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S159"></a>
**Source:** p.12 S159

**Original:** 88.2 91.5 89.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S160"></a>
**Source:** p.12 S160

**Original:** 82.8 85.2 88.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S161"></a>
**Source:** p.12 S161

**Original:** 89.0 89.6 92.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S162"></a>
**Source:** p.12 S162

**Original:** 75.9 79.8 83.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S163"></a>
**Source:** p.12 S163

**Original:** 86.1 88.7 89.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S164"></a>
**Source:** p.12 S164

**Original:** 87.0 89.4 89.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S165"></a>
**Source:** p.12 S165

**Original:** video understanding tasks, and scaling up Qwen2-VL yields significant improvements. For the challenging Video-MME benchmark (Fu et al., 2024), which includes videos up to one hour, it is noteworthy that we limited the maximum number of frames extracted per video to 768 during evaluation, potentially impacting performance on longer videos. Future work will focus on extending Qwen2-VL to support longer sequences, thereby accommodating longer videos. 3.2.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S166"></a>
**Source:** p.12 S166

**Original:** Visual Agent

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S167"></a>
**Source:** p.12 S167

**Original:** Qwen2-VL is evaluated first for its ability to interact with the environment via function calls and then for its capacity to complete complex sequential decision tasks through multiple rounds of interaction. The implementation is based on the Qwen-Agent framework (Qwen Team, 2024). Function Calling Unlike function calling in LLMs (Yan et al., 2024; Srinivasan et al., 2023; Chen et al., 2023c), function calling in LVLMs often involves extracting information from visual cues. Due to the absence of public benchmarks for evaluating the capabilities of LVLMs in function calling, we constructed our internal evaluation dataset. To construct the evaluation dataset, we undertook the following procedures (Chen et al., 2023c): Scene Categorization, Image Collection, Image Content Extraction, and Question/Functions/Arguments Generation. Firstly, we classified scenes into categories based on different visual applications. Subsequently, we downloaded and meticulously selected high-quality, representative images from the internet for each category. Thereafter, utilizing an advanced LVLM (Bai et al., 2023b), we analyzed each image to extract key visual elements and textual information. Finally, based on the content information from the images, we used an advanced LLM (Yang et al., 2024) to generate a series of questions that required specific functions to answer, along with specifying the input parameters needed for these function calls. Similar to the function calling evaluation method in LLMs (Yan et al., 2024), we designed two metrics to evaluate the accuracy of the function selection and the correctness of the arguments input. Specifically, Type Match(TM), is calculated as the ratio of times the model successfully invoked the correct function to the total number of calls attempted. Exact Match(EM), for each function calling, we checked whether the arguments passed to the function exactly matched those recorded in the image’s content information, calculating this correctness ratio. As shown in Table 5, the performance of Qwen2-VL in both Type Match(93.1 vs. 90.2) and Exact Match(53.2 vs. 50.0) over GPT-4o substantiates the efficacy of Qwen2-VL’s capability in function calling, thereby underscoring 12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-13"></a>
### Page 13

<a id="S168"></a>
**Source:** p.13 S168

**Original:** its significant potential for application expansion through external tool integration. The evaluation results demonstrated that GPT-4o underperformed, primarily due to two factors: in scenarios where uncertainty arises, GPT-4o demonstrates a conservative approach by avoiding using external tools. The Optical Character Recognition (OCR) capability of GPT-4o is outperformed by Qwen2-VL, particularly in the context of Chinese characters. UI Operations/Games/Robotics/Navigation To assess Qwen2-VL’s ability to generally handle complex tasks, we conduct evaluations across multiple VL agent tasks, including mobile operations (Zhang et al., 2024b; Rawles et al., 2024b; Lu et al., 2024b; Rawles et al., 2024a), robotic control (Kolve et al., 2017; Shridhar et al., 2020a; Inoue and Ohashi, 2022; Lu et al., 2023; Jiang et al., 2022; Huang et al., 2023b), card games (Zhai et al., 2024), and vision-language navigation (Anderson et al., 2018; Qi et al., 2020). As these tasks need multiple actions to complete tasks, we keep the history (observation, action) through Qwen2-VL supports a 32K context length, then append each new observation image after every action, enabling continuous reasoning about subsequent steps. UI Operations: we evaluate Qwen2-VL using the AITZ task (Zhang et al., 2024b), which constructs a core clean test set derived from AITW (Rawles et al., 2024b). Based on common operation patterns of phone, we define actions such as tap, input and swipe (Rawles et al., 2024b) for Qwen2-VL to interact with on-screen icons for task completion. For example, when Qwen2-VL is tasked with finding a pizza restaurant nearby by Google Maps, it should input "pizza" in the search term, swipe to select the appropriate restaurant, and tap the corresponding link. Following the AITZ setting, we report both type match (correctness of tap, input, or swipe) and exact match (correctness of tap location, input text, or swipe direction). With the support of grounding capability on UI, Qwen2-VL surpasses GPT-4 and previous SoTA (Zhang et al., 2024b; Zhan and Zhang, 2023). Robotic Control: we evaluate Qwen2-VL on the ALFRED task (Shridhar et al., 2020a) in AI2THOR (Kolve et al., 2017). The task requires agent to perform complex household tasks, such as toasting bread and slicing an apple to prepare a meal. To work in the virtual environment, we define high-level actions (GotoLocation, Pickup, PutDown, Open, Close, Clean, Heat, Cool, Slice) (Shridhar et al., 2020b) as the action set. Moreover, agent needs to localize objects for manipulation (e.g., it can only pick up an apple if the apple is recognized). To improve the accuracy of manipulation, we integrate SAM (Kirillov et al., 2023). ALFRED task reports task success rate (SR) (e.g., preparing dinner) and sub-goal completion metrics (GC) (e.g., whether the bread is toasted or the apple is sliced). Qwen2-VL slightly outperforms the previously specialized model ThinkBot (Lu et al., 2023) on the valid-unseen set. Card Games: we leverage the card game environment from RL4VLM (Zhai et al., 2024) to assess Qwen2-VL’s performance in a series of card-based games: Number Line, BlackJack, EZPoint, and Point24. Each game presents distinct challenges: (1) reaching a target number using +1 or -1 operations, (2) drawing or holding cards to compete against the dealer, (3) applying basic arithmetic operations to reach a total of 12, and (4) using arithmetic operations to achieve a total of 24. We report the success rate of the tasks. They not only evaluate agent capabilities but also require strong OCR skills to recognize these cards and understand the progression of the game. Qwen2-VL demonstrates superior performance across all tasks. Vision-Language Navigation: we evaluate Qwen2-VL on the Vision-and-Language Navigation (VLN) task using the R2R (Anderson et al., 2018) and REVERIE (Qi et al., 2020). In VLN, the model must autonomously determine the next location based on instruction, current observations. We report the success rate (SR) of VLM in reaching the predetermined destination for this task. The performance of Qwen2-VL is comparable to that of GPT-4o, but both models fall significantly behind current specialized VLN models (Chen et al., 2022; Sigurdsson et al., 2023). We attribute this gap to the incomplete and unstructured map information generated by the model from multiple images. Accurately modeling maps and locations in a 3D environment remains a major challenge for multimodal models.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-14"></a>
### Page 14

<a id="C011"></a>
**Source:** p.14 C011

**Original:** Table 7: Qwen2-VL-7B under fixed/dynamic image tokens. Adjusting image sizes only results in small perturbations in performance, demonstrating the robustness to varying image sizes. Moreover, the dynamic resolution strategy achieves top-tier performance while consuming fewer tokens on average, demonstrating the efficiency of our model. Strategy Fixed Image Tokens Dynamic Image Tokens

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S169"></a>
**Source:** p.14 S169

**Original:** Average Image Tokens 64 576 1600 3136 1924

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S170"></a>
**Source:** p.14 S170

**Original:** InfoVQAval 28.85 65.72 74.99 77.27 75.89

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S171"></a>
**Source:** p.14 S171

**Original:** RealWorldQA 56.47 65.88 69.54 70.59 70.07

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S172"></a>
**Source:** p.14 S172

**Original:** OCRBench 572 828 824 786 866

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S173"></a>
**Source:** p.14 S173

**Original:** MMMU 53.33 52.78 52.89 53.44 53.44

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C012"></a>
**Source:** p.14 C012

**Original:** Figure 4: Qwen2-VL-7B with different min_pixels. Small images are upscaled to surpass a specified min_pixels threshold before input into the model. Increasing the image size within a reasonable range shows enhanced performance on perceptual tasks like InfoVQA, HallusionBench, and OCRBench.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S174"></a>
**Source:** p.14 S174

**Original:** 3.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S175"></a>
**Source:** p.14 S175

**Original:** Ablation Study

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S176"></a>
**Source:** p.14 S176

**Original:** In this section, we present ablation studies on image dynamic resolution, M-RoPE, and model scale. These experiments aim to provide insights into the impact of these key components on our model’s performance. 3.3.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S177"></a>
**Source:** p.14 S177

**Original:** Dynamic Resolution

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S178"></a>
**Source:** p.14 S178

**Original:** As shown in Table 7, we compare the performance between dynamic resolution and fixed resolution. For fixed resolution, we resize the images to ensure a constant number of image tokens being input to the model, rather than resizing to a specific height and width, as this would distort the original aspect ratio. For dynamic resolution, we only set min_pixels= 100 × 28 × 28 and max_pixels= 16384 × 28 × 28, allowing the number of image tokens depend primarily on the image’s native resolution. It can be observed that adjusting image sizes only results in small perturbations in performance, demonstrating the model robustness to varying image sizes. Moreover, dynamic resolution approach is more efficient. We can observe that no single fixed resolution achieves optimal performance across all benchmarks. In contrast, the dynamic resolution approach consistently achieves top-tier performance while consuming fewer tokens on average. Additionally, we observe that merely increasing the image size does not always lead to improved performance. It is more important to choose an appropriate resolution for different images. As detailed in Figure 4, we upscale small images to surpass a specified min_pixels threshold. Evaluations on upscaled images shows enhanced performance on perceptual tasks like InfoVQA, HallusionBench, and OCRBench. We attribute these gains to increased computational load. However, for OCRBench, a too-high min_pixels value leads to a severe performance decline. This is likely because OCRBench contains numerous extremely small images, and excessive enlargement causes these images to deviate from the training data distribution, turning them into out-of-distribution samples. In contrast, the effect of increasing min_pixels on the MMMU benchmark is negligible. We hypothesize that the performance bottleneck in MMMU is more related to the model’s

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-15"></a>
### Page 15

<a id="C013"></a>
**Source:** p.15 C013

**Original:** Table 8: Ablation studies of M-RoPE. Compared to 1D-RoPE, using M-RoPE achieves better performance in downstream tasks, particularly in video benchmarks. RWQ means RealworldQA. Image Benchmarks 1D-RoPE M-RoPE

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S179"></a>
**Source:** p.15 S179

**Original:** Video Benchmarks

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S180"></a>
**Source:** p.15 S180

**Original:** MathVista

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S181"></a>
**Source:** p.15 S181

**Original:** MMB

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S182"></a>
**Source:** p.15 S182

**Original:** MMStar

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S183"></a>
**Source:** p.15 S183

**Original:** RWQ

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S184"></a>
**Source:** p.15 S184

**Original:** DocVQA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S185"></a>
**Source:** p.15 S185

**Original:** ChartQA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S186"></a>
**Source:** p.15 S186

**Original:** InfoVQA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S187"></a>
**Source:** p.15 S187

**Original:** TextVQA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S188"></a>
**Source:** p.15 S188

**Original:** PerceptionTest

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S189"></a>
**Source:** p.15 S189

**Original:** NextQA

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S190"></a>
**Source:** p.15 S190

**Original:** STAR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S191"></a>
**Source:** p.15 S191

**Original:** 39.2 43.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S192"></a>
**Source:** p.15 S192

**Original:** 58.6 60.6

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S193"></a>
**Source:** p.15 S193

**Original:** 36.7 36.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S194"></a>
**Source:** p.15 S194

**Original:** 54.5 53.7

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S195"></a>
**Source:** p.15 S195

**Original:** 82.5 82.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S196"></a>
**Source:** p.15 S196

**Original:** 68.0 68.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S197"></a>
**Source:** p.15 S197

**Original:** 50.8 50.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S198"></a>
**Source:** p.15 S198

**Original:** 71.3 71.8

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S199"></a>
**Source:** p.15 S199

**Original:** 46.6 47.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S200"></a>
**Source:** p.15 S200

**Original:** 43.9 46.0

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S201"></a>
**Source:** p.15 S201

**Original:** 55.5 57.9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S202"></a>
**Source:** p.15 S202

**Original:** Training Sequence Length

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C014"></a>
**Source:** p.15 C014

**Original:** Figure 5: Evaluate the length extrapolation capability of Qwen2-VL-72B on Video-MME Medium Video. With the help of M-RoPE, the model demonstrated robust performance when the inference length exceeded the maximum training length of 16384 tokens. reasoning capability rather than image resolution. 3.3.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S203"></a>
**Source:** p.15 S203

**Original:** M-RoPE

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S204"></a>
**Source:** p.15 S204

**Original:** In this subsection, we demonstrate the effectiveness of M-RoPE. First, we validate its capability on various downstream tasks. We employ Qwen2-1.5B and ViT-L as the backbone and report the results of the pretrained models. As shown in Table 8, compared to 1D-RoPE, using M-RoPE achieves better performance in downstream tasks, particularly in video benchmarks. Furthermore, we assess the length extrapolation capability of M-RoPE on Video-MME medium-length videos. Figure 5 illustrates the performance of Qwen2VL-72B at different inference lengths. Leveraging M-RoPE, the model demonstrates robust results across various inference lengths. Notably, despite limiting the maximum tokens per video to 16K during training, the model still exhibits exceptional performance at a maximum inference length of 80K tokens. 3.3.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S205"></a>
**Source:** p.15 S205

**Original:** Model Scaling

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S206"></a>
**Source:** p.15 S206

**Original:** We evaluate the performance of models of varying scales across multiple capability dimensions. Specifically, we categorize these dimensions into complex college-level problem-solving, mathematical abilities, document and table comprehension, general scenario question-answering, and video comprehension. The overall capability of a model is assessed by averaging its scores across different benchmarks associated with each dimension. In particular, we use the MMMU (Yue et al., 2023) benchmark to represent college-level problem-solving ability, while the average scores from MathVista (Lu et al., 2024a) and MathVision (Wang et al., 2024) serve as indicators of mathematical ability. For general scenario question-answering, we compute the average score across the RealWorldQA (X.AI, 2024a), MMBench-V1.1 (Liu et al., 2023d), MMT-Bench (Ying et al., 2024), HallBench (Guan et al., 2023), MMVet (Yu et al., 2024), and MMStar (Chen et al., 2024a) 15

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-16"></a>
### Page 16

<a id="C015"></a>
**Source:** p.16 C015

**Original:** Figure 6: Model Performance Scaling Across Capabilities and Training Progress. As model size and the volume of training data increase, performance consistently improves across a range of capabilities and benchmarks. benchmarks. Document and table comprehension capability is reflected through the average score from benchmarks like DocVQA (Mathew et al., 2021), InfoVQA (Mathew et al., 2021), ChartQA (Masry et al., 2022), TextVQA (Singh et al., 2019), OCRBench (Liu et al., 2023e), and MTVQA (Tang et al., 2024). Lastly, video comprehension ability is measured by averaging scores across MVBench (Li et al., 2024), PerceptionTest (Patraucean et al., 2024), EgoSchema (Mangalam et al., 2023), and Video-MME (Fu et al., 2024). As illustrated in Figure 6(a), there is a consistent improvement in performance with increasing model size, particularly with respect to mathematical abilities, which show a positive correlation with the number of model parameters. On the other hand, for optical character recognition (OCR)-related tasks, even smallerscale models exhibit relatively strong performance. As shown in Figure 6(b), we visualize the relationship between model performance and the number of training tokens during the second stage of pretraining for Qwen2-VL-7B. As the number of training tokens increases, the model performance improves; however, performance on vision question answering (VQA) tasks exhibits some fluctuation. In contrast, for tasks such as AI2D (Kembhavi et al., 2016) and InfoVQA (Mathew et al., 2021)—both of which involve understanding textual and graphical information in images—the model performance shows steady improvement as training data is augmented.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S207"></a>
**Source:** p.16 S207

**Original:** Conclusion

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S208"></a>
**Source:** p.16 S208

**Original:** We have presented the Qwen2-VL series, the versatile large vision-language models, including three openweight models with total parameter counts of 2, 8, and 72 billion. Qwen2-VL matches the performance of top-tier models like GPT-4o and Claude3.5-Sonnet in a range of multimodal scenarios, surpassing all other open-weight LVLM models. Qwen2-VL series introduces naive dynamic resolution and multimodal rotary position embedding (M-RoPE) to fuse information across modals effectively and be capable of understanding videos over 20 minutes in length. With advanced reasoning and decision-making abilities, Qwen2-VL can be integrated with devices such as mobile phones, robots, etc. Furthermore, Qwen2-VL now supports understanding multilingual texts within images, including most European languages, Japanese, Korean, Arabic, Vietnamese, and others. We have made the Qwen2-VL model weights openly accessible, which enables researchers and developers to harness the full potential in a variety of applications and research projects. We aim to advance AI technologies and enhance their beneficial effects on society by dedicating ourselves to these endeavors.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-17"></a>
### Page 17

<a id="S209"></a>
**Source:** p.17 S209

**Original:** Acknowledgements We express our gratitude to Juan Zhu, Fan Hong, Jie Zhang, Yong Li of Alibaba Cloud’s PAI team (AlibabaCloud, 2024c) for supporting the training infrastructure of Qwen2-VL. This work was also supported by Qwen LLM team (Yang et al., 2024), and we especially thank Na Ni, Yichang Zhang, Jianxin Ma, Bowen Yu, Zheren Fu for their data contribution and insightful discussion.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S210"></a>
**Source:** p.17 S210

**Original:** References Jean-Baptiste Alayrac, Jeff Donahue, Pauline Luc, Antoine Miech, Iain Barr, Yana Hasson, Karel Lenc, Arthur Mensch, Katherine Millican, Malcolm Reynolds, et al. Flamingo: a visual language model for few-shot learning. In NeurIPS, 2022. 2 Alibaba-Cloud. Cloud parallel file storage (cpfs), 2024a. URL https://www.alibabacloud.com/en/ product/cpfs. 8 Alibaba-Cloud. Object storage service (oss), 2024b. URL https://www.alibabacloud.com/en/product/ object-storage-service. 8 Alibaba-Cloud. Pai-lingjun intelligent computing service, 2024c. URL https://www.alibabacloud.com/en/ product/pai-lingjun. 8, 17 Peter Anderson, Qi Wu, Damien Teney, Jake Bruce, Mark Johnson, Niko Sünderhauf, Ian Reid, Stephen Gould, and Anton Van Den Hengel. Vision-and-language navigation: Interpreting visually-grounded navigation instructions in real environments. In CVPR, 2018. 10, 13 Jason Ansel, Edward Z. Yang, Horace He, Natalia Gimelshein, Animesh Jain, Michael Voznesensky, Bin Bao, Peter Bell, David Berard, Evgeni Burovski, Geeta Chauhan, Anjali Chourdia, Will Constable, Alban Desmaison, Zachary DeVito, Elias Ellison, Will Feng, Jiong Gong, Michael Gschwind, Brian Hirsh, Sherlock Huang, Kshiteej Kalambarkar, Laurent Kirsch, Michael Lazos, Mario Lezcano, Yanbo Liang, Jason Liang, Yinghai Lu, C. K. Luk, Bert Maher, Yunjie Pan, Christian Puhrsch, Matthias Reso, Mark Saroufim, Marcos Yukio Siraichi, Helen Suk, Shunting Zhang, Michael Suo, Phil Tillet, Xu Zhao, Eikan Wang, Keren Zhou, Richard Zou, Xiaodong Wang, Ajit Mathews, William Wen, Gregory Chanan, Peng Wu, and Soumith Chintala. Pytorch 2: Faster machine learning through dynamic python bytecode transformation and graph compilation. In ASPLOS, 2024. 8 Anthropic. Claude 3.5 sonnet, 2024. URL https://www.anthropic.com/news/claude-3-5-sonnet. 9 Anurag Arnab, Mostafa Dehghani, Georg Heigold, Chen Sun, Mario Lučić, and Cordelia Schmid. Vivit: A video vision transformer. In ICCV, 2021. 5 Lei Jimmy Ba, Jamie Ryan Kiros, and Geoffrey E. Hinton. Layer normalization. arXiv:1607.06450, 2016. 8 Jinze Bai, Shuai Bai, Yunfei Chu, Zeyu Cui, Kai Dang, Xiaodong Deng, Yang Fan, Wenbin Ge, Yu Han, Fei Huang, et al. Qwen technical report. arXiv:2309.16609, 2023a. 1 Jinze Bai, Shuai Bai, Shusheng Yang, Shijie Wang, Sinan Tan, Peng Wang, Junyang Lin, Chang Zhou, and Jingren Zhou. Qwen-vl: A frontier large vision-language model with versatile abilities. arXiv:2308.12966, 2023b. 1, 2, 3, 5, 12 Joao Carreira and Andrew Zisserman. Quo vadis, action recognition? a new model and the kinetics dataset. In CVPR, 2017. 5 Keqin Chen, Zhao Zhang, Weili Zeng, Richong Zhang, Feng Zhu, and Rui Zhao. Shikra: Unleashing multimodal llm’s referential dialogue magic. arXiv:2306.15195, 2023a. 12

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-18"></a>
### Page 18

<a id="S211"></a>
**Source:** p.18 S211

**Original:** Lin Chen, Jisong Li, Xiaoyi Dong, Pan Zhang, Conghui He, Jiaqi Wang, Feng Zhao, and Dahua Lin. Sharegpt4v: Improving large multi-modal models with better captions. arXiv:2311.12793, 2023b. 1 Lin Chen, Jinsong Li, Xiaoyi Dong, Pan Zhang, Yuhang Zang, Zehui Chen, Haodong Duan, Jiaqi Wang, Yu Qiao, Dahua Lin, et al. Are we on the right way for evaluating large vision-language models? arXiv:2403.20330, 2024a. 9, 15 Shizhe Chen, Pierre-Louis Guhur, Makarand Tapaswi, Cordelia Schmid, and Ivan Laptev. Think global, act local: Dual-scale graph transformer for vision-and-language navigation. In CVPR, 2022. 10, 13 Tianqi Chen, Bing Xu, Chiyuan Zhang, and Carlos Guestrin. Training deep nets with sublinear memory cost. arXiv:1604.06174, 2016. 8 Zehui Chen, Weihua Du, Wenwei Zhang, Kuikun Liu, Jiangning Liu, Miao Zheng, Jingming Zhuo, Songyang Zhang, Dahua Lin, Kai Chen, et al. T-eval: Evaluating the tool utilization capability step by step. arXiv:2312.14033, 2023c. 12 Zhe Chen, Weiyun Wang, Hao Tian, Shenglong Ye, Zhangwei Gao, Erfei Cui, Wenwen Tong, Kongzhi Hu, Jiapeng Luo, Zheng Ma, et al. How far are we to gpt-4v? closing the gap to commercial multimodal models with open-source suites. arXiv:2404.16821, 2024b. 9 Zhe Chen, Weiyun Wang, Hao Tian, Shenglong Ye, Zhangwei Gao, Erfei Cui, Wenwen Tong, Kongzhi Hu, Jiapeng Luo, Zheng Ma, et al. Internvl2: Better than the best—expanding performance boundaries of open-source multimodal models with the progressive scaling strategy, 2024c. URL https://internvl. github.io/blog/2024-07-02-InternVL-2.0. 9, 12 Wei-Lin Chiang, Zhuohan Li, Zi Lin, Ying Sheng, Zhanghao Wu, Hao Zhang, Lianmin Zheng, Siyuan Zhuang, Yonghao Zhuang, Joseph E. Gonzalez, Ion Stoica, and Eric P. Xing. Vicuna: An open-source chatbot impressing gpt-4 with 90%* chatgpt quality, 2023. URL https://lmsys.org/blog/2023-03-30-vicuna/. 1 Wenliang Dai, Junnan Li, Dongxu Li, Anthony Meng Huat Tiong, Junqi Zhao, Weisheng Wang, Boyang Li, Pascale Fung, and Steven Hoi. Instructblip: Towards general-purpose vision-language models with instruction tuning. arXiv:2305.06500, 2023. 1 Tri Dao. Flashattention-2: Faster attention with better parallelism and work partitioning. In ICLR, 2024. 8 Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, and Christopher Ré. Flashattention: Fast and memoryefficient exact attention with io-awareness. In NeurIPS, 2022. 8 Mostafa Dehghani, Basil Mustafa, Josip Djolonga, Jonathan Heek, Matthias Minderer, Mathilde Caron, Andreas Steiner, Joan Puigcerver, Robert Geirhos, Ibrahim M Alabdulmohsin, et al. Patch n’pack: Navit, a vision transformer for any aspect ratio and resolution. In NeurIPS, 2024. 4 Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner, Mostafa Dehghani, Matthias Minderer, Georg Heigold, Sylvain Gelly, Jakob Uszkoreit, and Neil Houlsby. An image is worth 16x16 words: Transformers for image recognition at scale. In ICLR, 2021. 4 Abhimanyu Dubey, Abhinav Jauhri, Abhinav Pandey, Abhishek Kadian, Ahmad Al-Dahle, Aiesha Letman, Akhil Mathur, Alan Schelten, Amy Yang, Angela Fan, et al. The llama 3 herd of models. arXiv:2407.21783, 2024. 46, 48, 49 Alex Fang, Albin Madappally Jose, Amit Jain, Ludwig Schmidt, Alexander Toshev, and Vaishaal Shankar. Data filtering networks. arXiv:2309.17425, 2023. 5 FFmpeg-Developers. ffmpeg tool, 2024. URL http://ffmpeg.org/. 8 Chaoyou Fu, Peixian Chen, Yunhang Shen, Yulei Qin, Mengdan Zhang, Xu Lin, Zhenyu Qiu, Wei Lin, Jinrui Yang, Xiawu Zheng, et al. Mme: A comprehensive evaluation benchmark for multimodal large language models. arXiv:2306.13394, 2023. 9 18

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-19"></a>
### Page 19

<a id="S212"></a>
**Source:** p.19 S212

**Original:** Chaoyou Fu, Yuhan Dai, Yondong Luo, Lei Li, Shuhuai Ren, Renrui Zhang, Zihan Wang, Chenyu Zhou, Yunhang Shen, Mengdan Zhang, et al. Video-mme: The first-ever comprehensive evaluation benchmark of multi-modal llms in video analysis. arXiv:2405.21075, 2024. 10, 12, 16 Tianrui Guan, Fuxiao Liu, Xiyang Wu, Ruiqi Xian, Zongxia Li, Xiaoyu Liu, Xijun Wang, Lichang Chen, Furong Huang, Yaser Yacoob, Dinesh Manocha, and Tianyi Zhou. Hallusionbench: An advanced diagnostic suite for entangled language hallucination &amp; visual illusion in large vision-language models. arXiv:2310.14566, 2023. 9, 15 Wenyi Hong, Weihan Wang, Qingsong Lv, Jiazheng Xu, Wenmeng Yu, Junhui Ji, Yan Wang, Zihan Wang, Yuxiao Dong, Ming Ding, et al. Cogagent: A visual language model for gui agents. arXiv:2312.08914, 2023. 10 Shaohan Huang, Li Dong, Wenhui Wang, Yaru Hao, Saksham Singhal, Shuming Ma, Tengchao Lv, Lei Cui, Owais Khan Mohammed, Qiang Liu, et al. Language is not all you need: Aligning perception with language models. arXiv:2302.14045, 2023a. 1, 2 Siyuan Huang, Zhengkai Jiang, Hao Dong, Yu Qiao, Peng Gao, and Hongsheng Li. Instruct2act: Mapping multi-modality instructions to robotic actions with large language model. arXiv:2305.11176, 2023b. 13 Yanping Huang, Youlong Cheng, Ankur Bapna, Orhan Firat, Dehao Chen, Mia Xu Chen, HyoukJoong Lee, Jiquan Ngiam, Quoc V. Le, Yonghui Wu, and Zhifeng Chen. Gpipe: Efficient training of giant neural networks using pipeline parallelism. In NeurIPS, 2019. 8 Yuki Inoue and Hiroki Ohashi. Prompter: Utilizing large language model prompting for a data efficient embodied instruction following. arXiv:2211.03267, 2022. 13 Yunfan Jiang, Agrim Gupta, Zichen Zhang, Guanzhi Wang, Yongqiang Dou, Yanjun Chen, Li Fei-Fei, Anima Anandkumar, Yuke Zhu, and Linxi Fan. Vima: General robot manipulation with multimodal prompts. arXiv:2210.03094, 2022. 13 Sahar Kazemzadeh, Vicente Ordonez, Mark Matten, and Tamara Berg. Referitgame: Referring to objects in photographs of natural scenes. In EMNLP, 2014. 11 Aniruddha Kembhavi, Mike Salvato, Eric Kolve, Minjoon Seo, Hannaneh Hajishirzi, and Ali Farhadi. A diagram is worth a dozen images. In ECCV, 2016. 9, 11, 16 Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland, Laura Gustafson, Tete Xiao, Spencer Whitehead, Alexander C Berg, Wan-Yen Lo, et al. Segment anything. In ICCV, 2023. 13 Eric Kolve, Roozbeh Mottaghi, Winson Han, Eli VanderBilt, Luca Weihs, Alvaro Herrasti, Matt Deitke, Kiana Ehsani, Daniel Gordon, Yuke Zhu, et al. Ai2-thor: An interactive 3d environment for visual ai. arXiv:1712.05474, 2017. 13 Vijay Anand Korthikanti, Jared Casper, Sangkug Lym, Lawrence McAfee, Michael Andersch, Mohammad Shoeybi, and Bryan Catanzaro. Reducing activation recomputation in large transformer models. In MLSys, 2023. 8 Alex Krizhevsky, Ilya Sutskever, and Geoffrey E. Hinton. Imagenet classification with deep convolutional neural networks. In NeurIPS, 2012. 8 Joel Lamy-Poirier. Breadth-first pipeline parallelism. In MLSys, 2023. 8 Bo Li, Peiyuan Zhang, Jingkang Yang, Yuanhan Zhang, Fanyi Pu, and Ziwei Liu. Otterhd: A high-resolution multi-modality model. arXiv:2311.04219, 2023a. 2 Chen Li, Yixiao Ge, Dian Li, and Ying Shan. Vision-language instruction tuning: A review and analysis. arXiv:2311.08172, 2023b. 2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-20"></a>
### Page 20

<a id="S213"></a>
**Source:** p.20 S213

**Original:** Junnan Li, Dongxu Li, Silvio Savarese, and Steven Hoi. Blip-2: Bootstrapping language-image pre-training with frozen image encoders and large language models. arXiv:2301.12597, 2023c. 1 Kunchang Li, Yali Wang, Yinan He, Yizhuo Li, Yi Wang, Yi Liu, Zun Wang, Jilan Xu, Guo Chen, Ping Luo, et al. Mvbench: A comprehensive multi-modal video understanding benchmark. In CVPR, 2024. 10, 11, 16 Shen Li, Yanli Zhao, Rohan Varma, Omkar Salpekar, Pieter Noordhuis, Teng Li, Adam Paszke, Jeff Smith, Brian Vaughan, Pritam Damania, et al. Pytorch distributed: Experiences on accelerating data parallel training. In VLDB, 2020. 8 Zhang Li, Biao Yang, Qiang Liu, Zhiyin Ma, Shuo Zhang, Jingxu Yang, Yabo Sun, Yuliang Liu, and Xiang Bai. Monkey: Image resolution and text label are important things for large multi-modal models. arXiv:2311.06607, 2023d. 2 Ziyi Lin, Chris Liu, Renrui Zhang, Peng Gao, Longtian Qiu, Han Xiao, Han Qiu, Chen Lin, Wenqi Shao, Keqin Chen, Jiaming Han, Siyuan Huang, Yichi Zhang, Xuming He, Hongsheng Li, and Yu Jiao Qiao. Sphinx: The joint mixing of weights, tasks, and visual embeddings for multi-modal large language models. arXiv:2311.07575, 2023. 2 Haotian Liu, Chunyuan Li, Yuheng Li, and Yong Jae Lee. Improved baselines with visual instruction tuning. arXiv:2310.03744, 2023a. 1, 2 Haotian Liu, Chunyuan Li, Qingyang Wu, and Yong Jae Lee. Visual instruction tuning. arXiv:2304.08485, 2023b. 1, 2, 10 Shilong Liu, Zhaoyang Zeng, Tianhe Ren, Feng Li, Hao Zhang, Jie Yang, Chun yue Li, Jianwei Yang, Hang Su, Jun-Juan Zhu, and Lei Zhang. Grounding dino: Marrying dino with grounded pre-training for open-set object detection. arXiv:2303.05499, 2023c. 12 Yuan Liu, Haodong Duan, Bo Li Yuanhan Zhang, Songyang Zhang, Wangbo Zhao, Yike Yuan, Jiaqi Wang, Conghui He, Ziwei Liu, Kai Chen, and Dahua Lin. Mmbench: Is your multi-modal model an all-around player? arXiv:2307.06281, 2023d. 9, 15 Yuliang Liu, Zhang Li, Mingxin Huang, Biao Yang, Wenwen Yu, Chunyuan Li, Xucheng Yin, Cheng lin Liu, Lianwen Jin, and Xiang Bai. Ocrbench: On the hidden mystery of ocr in large multimodal models. arXiv:2305.07895, 2023e. 9, 11, 16 Ilya Loshchilov and Frank Hutter. Decoupled weight decay regularization. In ICLR, 2019. 8 Guanxing Lu, Ziwei Wang, Changliu Liu, Jiwen Lu, and Yansong Tang. Thinkbot: Embodied instruction following with thought chain reasoning. arXiv:2312.07062, 2023. 10, 13 Pan Lu, Ran Gong, Shibiao Jiang, Liang Qiu, Siyuan Huang, Xiaodan Liang, and Song-Chun Zhu. Inter-gps: Interpretable geometry problem solving with formal language and symbolic reasoning. In ACL, 2021. 32 Pan Lu, Hritik Bansal, Tony Xia, Jiacheng Liu, Chunyuan Li, Hannaneh Hajishirzi, Hao Cheng, Kai-Wei Chang, Michel Galley, and Jianfeng Gao. Mathvista: Evaluating mathematical reasoning of foundation models in visual contexts. In ICLR, 2024a. 9, 11, 15 Quanfeng Lu, Wenqi Shao, Zitao Liu, Fanqing Meng, Boxuan Li, Botong Chen, Siyuan Huang, Kaipeng Zhang, Yu Qiao, and Ping Luo. Gui odyssey: A comprehensive dataset for cross-app gui navigation on mobile devices. arXiv:2406.08451, 2024b. 13 Karttikeya Mangalam, Raiymbek Akshulakov, and Jitendra Malik. Egoschema: A diagnostic benchmark for very long-form video language understanding. In NeurIPS, 2023. 10, 11, 16 Junhua Mao, Jonathan Huang, Alexander Toshev, Oana Camburu, Alan L Yuille, and Kevin Murphy. Generation and comprehension of unambiguous object descriptions. In CVPR, 2016. 11

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-21"></a>
### Page 21

<a id="S214"></a>
**Source:** p.21 S214

**Original:** Ahmed Masry, Do Xuan Long, Jia Qing Tan, Shafiq Joty, and Enamul Hoque. Chartqa: A benchmark for question answering about charts with visual and logical reasoning. arXiv:2203.10244, 2022. 9, 11, 16 Minesh Mathew, Dimosthenis Karatzas, and CV Jawahar. Docvqa: A dataset for vqa on document images. In WACV, 2021. 9, 11, 16 Deepak Narayanan, Mohammad Shoeybi, Jared Casper, Patrick LeGresley, Mostofa Patwary, Vijay Korthikanti, Dmitri Vainbrand, Prethvi Kashinkunti, Julie Bernauer, Bryan Catanzaro, Amar Phanishayee, and Matei Zaharia. Efficient large-scale language model training on GPU clusters using megatron-lm. In SC, 2021. 8 Nvidia. Apex, 2024a. URL https://github.com/NVIDIA/apex. 8 Nvidia. Cuda, 2024b. URL https://developer.nvidia.com/cuda-toolkit. 8 OpenAI. Gpt-4 technical report. arXiv:2303.08774, 2023. 1, 9 OpenAI. Gpt-4v(ision) system card, 2023. URL https://openai.com/research/gpt-4v-system-card. 1, 9 Openai. Chatml documents, 2024. URL https://github.com/openai/openai-python/blob/main/chatml. md. 6 OpenAI. Hello gpt-4o, 2024. URL https://openai.com/index/hello-gpt-4o. 9 Adam Paszke, Sam Gross, Francisco Massa, Adam Lerer, James Bradbury, Gregory Chanan, Trevor Killeen, Zeming Lin, Natalia Gimelshein, Luca Antiga, Alban Desmaison, Andreas Köpf, Edward Z. Yang, Zachary DeVito, Martin Raison, Alykhan Tejani, Sasank Chilamkurthy, Benoit Steiner, Lu Fang, Junjie Bai, and Soumith Chintala. Pytorch: An imperative style, high-performance deep learning library. In NeurIPS, 2019. 8 Viorica Patraucean, Lucas Smaira, Ankush Gupta, Adria Recasens, Larisa Markeeva, Dylan Banarse, Skanda Koppula, Mateusz Malinowski, Yi Yang, Carl Doersch, et al. Perception test: A diagnostic benchmark for multimodal video models. In NeurIPS, 2024. 10, 11, 16 Yuankai Qi, Qi Wu, Peter Anderson, Xin Wang, William Yang Wang, Chunhua Shen, and Anton van den Hengel. Reverie: Remote embodied visual referring expression in real indoor environments. In CVPR, 2020. 10, 13 Alibaba Group Qwen Team. Qwen-agent framework, 2024. URL https://github.com/QwenLM/Qwen-Agent. 7, 12 Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, et al. Learning transferable visual models from natural language supervision. In ICML, 2021. 2 Samyam Rajbhandari, Jeff Rasley, Olatunji Ruwase, and Yuxiong He. Zero: memory optimizations toward training trillion parameter models. In SC, 2020. 8 Christopher Rawles, Sarah Clinckemaillie, Yifan Chang, Jonathan Waltz, Gabrielle Lau, Marybeth Fair, Alice Li, William Bishop, Wei Li, Folawiyo Campbell-Ajala, et al. Androidworld: A dynamic benchmarking environment for autonomous agents. arXiv:2405.14573, 2024a. 13 Christopher Rawles, Alice Li, Daniel Rodriguez, Oriana Riva, and Timothy Lillicrap. Androidinthewild: A large-scale dataset for android device control. In NeurIPS, 2024b. 13 Jay Shah, Ganesh Bikshandi, Ying Zhang, Vijay Thakkar, Pradeep Ramani, and Tri Dao. Flashattention-3: Fast and accurate attention with asynchrony and low-precision. arXiv:2407.08608, 2024. 8 Mohammad Shoeybi, Mostofa Patwary, Raul Puri, Patrick LeGresley, Jared Casper, and Bryan Catanzaro. Megatron-lm: Training multi-billion parameter language models using model parallelism. arXiv:1909.08053, 2019. 8 21

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-22"></a>
### Page 22

<a id="S215"></a>
**Source:** p.22 S215

**Original:** Mohit Shridhar, Jesse Thomason, Daniel Gordon, Yonatan Bisk, Winson Han, Roozbeh Mottaghi, Luke Zettlemoyer, and Dieter Fox. Alfred: A benchmark for interpreting grounded instructions for everyday tasks. In CVPR, 2020a. 10, 13 Mohit Shridhar, Xingdi Yuan, Marc-Alexandre Côté, Yonatan Bisk, Adam Trischler, and Matthew Hausknecht. Alfworld: Aligning text and embodied environments for interactive learning. arXiv:2010.03768, 2020b. 13 Gunnar A Sigurdsson, Jesse Thomason, Gaurav S Sukhatme, and Robinson Piramuthu. Rrex-bot: Remote referring expressions with a bag of tricks. In IROS, 2023. 10, 13 Amanpreet Singh, Vivek Natarajan, Meet Shah, Yu Jiang, Xinlei Chen, Dhruv Batra, Devi Parikh, and Marcus Rohrbach. Towards vqa models that can read. In CVPR, 2019. 9, 11, 16 Venkat Krishna Srinivasan, Zhen Dong, Banghua Zhu, Brian Yu, Damon Mosk-Aoyama, Kurt Keutzer, Jiantao Jiao, and Jian Zhang. Nexusraven: a commercially-permissive language model for function calling. In NeurIPS Workshop, 2023. 12 Jianlin Su. Transformer upgrade path: 4. rotary position encoding for two-dimensional positions, 2021. URL https://www.spaces.ac.cn/archives/8397. 4 Jianlin Su. Transformer upgrade path: 17. insights into multimodal positional encoding, 2024. URL https: //spaces.ac.cn/archives/10040. 5 Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu. Roformer: Enhanced transformer with rotary position embedding. In Neurocomputing, 2024. 4 Jingqun Tang, Qi Liu, Yongjie Ye, Jinghui Lu, Shu Wei, Chunhui Lin, Wanqing Li, Mohamad Fitri Faiz Bin Mahmood, Hao Feng, Zhen Zhao, Yanjie Wang, Yuliang Liu, Hao Liu, Xiang Bai, and Can Huang. Mtvqa: Benchmarking multilingual text-centric visual question answering. arXiv:2405.11985, 2024. 9, 11, 16 Gemini Team, Rohan Anil, Sebastian Borgeaud, Yonghui Wu, Jean-Baptiste Alayrac, Jiahui Yu, Radu Soricut, Johan Schalkwyk, Andrew M Dai, Anja Hauth, et al. Gemini: A family of highly capable multimodal models. arXiv:2312.11805, 2023. 1, 9 Hugo Touvron, Thibaut Lavril, Gautier Izacard, Xavier Martinet, Marie-Anne Lachaux, Timothée Lacroix, Baptiste Rozière, Naman Goyal, Eric Hambro, Faisal Azhar, et al. Llama: Open and efficient foundation language models. arXiv:2302.13971, 2023a. 1 Hugo Touvron, Louis Martin, Kevin Stone, Peter Albert, Amjad Almahairi, Yasmine Babaei, Nikolay Bashlykov, Soumya Batra, Prajjwal Bhargava, Shruti Bhosale, et al. Llama 2: Open foundation and fine-tuned chat models. arXiv:2307.09288, 2023b. 1 Ke Wang, Junting Pan, Weikang Shi, Zimu Lu, Mingjie Zhan, and Hongsheng Li. Measuring multimodal mathematical reasoning with math-vision dataset. arXiv:2402.14804, 2024. 9, 11, 15 Peng Wang, An Yang, Rui Men, Junyang Lin, Shuai Bai, Zhikang Li, Jianxin Ma, Chang Zhou, Jingren Zhou, and Hongxia Yang. Ofa: Unifying architectures, tasks, and modalities through a simple sequence-tosequence learning framework. In ICML, 2022. 12 Peng Wang, Shijie Wang, Junyang Lin, Shuai Bai, Xiaohuan Zhou, Jingren Zhou, Xinggang Wang, and Chang Zhou. One-peace: Exploring one general representation model toward unlimited modalities. arXiv:2305.11172, 2023a. 12 Weihan Wang, Qingsong Lv, Wenmeng Yu, Wenyi Hong, Ji Qi, Yan Wang, Junhui Ji, Zhuoyi Yang, Lei Zhao, Xixuan Song, et al. Cogvlm: Visual expert for pretrained language models. arXiv:2311.03079, 2023b. 1, 2, 12 X.AI. Grok-1.5 vision preview. https://x.ai/blog/grok-1.5v, 2024a. 9, 15 X.AI. Grok-2 beta release. https://x.ai/blog/grok-2, 2024b. 9

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-23"></a>
### Page 23

<a id="S216"></a>
**Source:** p.23 S216

**Original:** B. Yan, Yi Jiang, Jiannan Wu, D. Wang, Ping Luo, Zehuan Yuan, and Huchuan Lu. Universal instance perception as object discovery and retrieval. In CVPR, 2023. 12 Fanjia Yan, Huanzhi Mao, Charlie Cheng-Jie Ji, Tianjun Zhang, Shishir G. Patil, Ion Stoica, and Joseph E. Gonzalez. Berkeley function calling leaderboard, 2024. URL https://gorilla.cs.berkeley.edu/blogs/ 8_berkeley_function_calling_leaderboard.html. 12 An Yang, Baosong Yang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Zhou, Chengpeng Li, Chengyuan Li, Dayiheng Liu, Fei Huang, et al. Qwen2 technical report. arXiv:2407.10671, 2024. 4, 5, 12, 17 Zhengyuan Yang, Linjie Li, Kevin Lin, Jianfeng Wang, Chung-Ching Lin, Zicheng Liu, and Lijuan Wang. The dawn of lmms: Preliminary explorations with gpt-4v (ision). arXiv:2309.17421, 2023. 30, 44 Yuan Yao, Tianyu Yu, Ao Zhang, Chongyi Wang, Junbo Cui, Hongji Zhu, Tianchi Cai, Haoyu Li, Weilin Zhao, Zhihui He, et al. Minicpm-v: A gpt-4v level mllm on your phone. arXiv:2408.01800, 2024. 9 Qinghao Ye, Haiyang Xu, Guohai Xu, Jiabo Ye, Ming Yan, Yiyang Zhou, Junyang Wang, Anwen Hu, Pengcheng Shi, Yaya Shi, et al. mplug-owl: Modularization empowers large language models with multimodality. arXiv:2304.14178, 2023a. 2 Qinghao Ye, Haiyang Xu, Jiabo Ye, Ming Yan, Haowei Liu, Qi Qian, Ji Zhang, Fei Huang, and Jingren Zhou. mplug-owl2: Revolutionizing multi-modal large language model with modality collaboration. arXiv:2311.04257, 2023b. 2 Kaining Ying, Fanqing Meng, Jin Wang, Zhiqian Li, Han Lin, Yue Yang, Hao Zhang, Wenbo Zhang, Yuqi Lin, Shuo Liu, Jiayi Lei, Quanfeng Lu, Runjian Chen, Peng Xu, Renrui Zhang, Haozhe Zhang, Peng Gao, Yali Wang, Yu Qiao, Ping Luo, Kaipeng Zhang, and Wenqi Shao. Mmt-bench: A comprehensive multimodal benchmark for evaluating large vision-language models towards multitask agi. arXiv:2404.16006, 2024. 9, 15 Weihao Yu, Zhengyuan Yang, Linjie Li, Jianfeng Wang, Kevin Lin, Zicheng Liu, Xinchao Wang, and Lijuan Wang. Mm-vet: Evaluating large multimodal models for integrated capabilities. In ICML, 2024. 9, 15 Xiang Yue, Yuansheng Ni, Kai Zhang, Tianyu Zheng, Ruoqi Liu, Ge Zhang, Samuel Stevens, Dongfu Jiang, Weiming Ren, Yuxuan Sun, et al. Mmmu: A massive multi-discipline multimodal understanding and reasoning benchmark for expert agi. arXiv:2311.16502, 2023. 9, 15 Xiang Yue, Tianyu Zheng, Yuansheng Ni, Yubo Wang, Kai Zhang, Shengbang Tong, Yuxuan Sun, Ming Yin, Botao Yu, Ge Zhang, et al. Mmmu-pro: A more robust multi-discipline multimodal understanding benchmark. arXiv preprint arXiv:2409.02813, 2024. 9 Yuexiang Zhai, Hao Bai, Zipeng Lin, Jiayi Pan, Shengbang Tong, Yifei Zhou, Alane Suhr, Saining Xie, Yann LeCun, Yi Ma, et al. Fine-tuning large vision-language models as decision-making agents via reinforcement learning. arXiv:2405.10292, 2024. 10, 13 Zhuosheng Zhan and Aston Zhang. arXiv:2309.11436, 2023. 10, 13

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S217"></a>
**Source:** p.23 S217

**Original:** You only look at screens: Multimodal chain-of-action agents.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S218"></a>
**Source:** p.23 S218

**Original:** Biao Zhang and Rico Sennrich. Root mean square layer normalization. In NeurIPS, 2019. 8 Haotian Zhang, Haoxuan You, Philipp Dufter, Bowen Zhang, Chen Chen, Hong-You Chen, Tsu-Jui Fu, William Yang Wang, Shih-Fu Chang, Zhe Gan, and Yinfei Yang. Ferret-v2: An improved baseline for referring and grounding with large language models. arXiv:2404.07973, 2024a. 12 Jiwen Zhang, Jihao Wu, Yihua Teng, Minghui Liao, Nuo Xu, Xiao Xiao, Zhongyu Wei, and Duyu Tang. Android in the zoo: Chain-of-action-thought for gui agents. arXiv:2403.02713, 2024b. 10, 13 Pan Zhang, Xiaoyi Dong Bin Wang, Yuhang Cao, Chao Xu, Linke Ouyang, Zhiyuan Zhao, Shuangrui Ding, Songyang Zhang, Haodong Duan, Hang Yan, et al. Internlm-xcomposer: A vision-language large model for advanced text-image comprehension and composition. arXiv:2309.15112, 2023. 1 23

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-24"></a>
### Page 24

<a id="S219"></a>
**Source:** p.24 S219

**Original:** Tianyu Zhang, Suyuchen Wang, Lu Li, Ge Zhang, Perouz Taslakian, Sai Rajeswar, Jie Fu, Bang Liu, and Yoshua Bengio. Vcr: Visual caption restoration. arXiv:2406.06462, 2024c. 9 Deyao Zhu, Jun Chen, Xiaoqian Shen, Xiang Li, and Mohamed Elhoseiny. Minigpt-4: Enhancing visionlanguage understanding with advanced large language models. arXiv:2304.10592, 2023. 1, 2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-25"></a>
### Page 25

<a id="S220"></a>
**Source:** p.25 S220

**Original:** A

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S221"></a>
**Source:** p.25 S221

**Original:** Model Capabilities and Qualitative Examples

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S222"></a>
**Source:** p.25 S222

**Original:** In this section, we present some practical examples of our Qwen2-VL.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S223"></a>
**Source:** p.25 S223

**Original:** A.1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S224"></a>
**Source:** p.25 S224

**Original:** General Chat and OCR

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S225"></a>
**Source:** p.25 S225

**Original:** The Qwen2-VL models are now more adept at accurately describing and identifying complex information within images, as well as providing detailed background and answering related questions. Besides, the text processing capabilities of the Qwen2-VL models have seen significant improvements, particularly concerning the recognition of Chinese and English text within images. Multi-object Recognition

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S226"></a>
**Source:** p.25 S226

**Original:** Output the color and number of each box. Model Response The image shows a stack of colorful blocks with numbers on them. Here is the color and number of each block from top to bottom: - Top row (single block): Blue with the number 9 - Second row (two blocks): Light blue with the number 7, and green with the number 8 - Third row (three blocks): Purple with the number 4, pink with the number 5, and light green with the number 6 - Bottom row (four blocks): Red with the number 0, orange with the number 1, yellow with the number 2, and light green with the number 3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C016"></a>
**Source:** p.25 C016

**Original:** Figure 7: When presented with an image of cubes of different colors, the models identify their layout and the color of each cube.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-26"></a>
### Page 26

<a id="S227"></a>
**Source:** p.26 S227

**Original:** Plant identification

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S228"></a>
**Source:** p.26 S228

**Original:** What kind of flower is this? Model Response The flowers in the picture are forget-me-nots (Myosotis). These small, delicate flowers are known for their vibrant colors, typically blue, pink, or white, and are often used in bouquets and gardens for their charming appearance.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C017"></a>
**Source:** p.26 C017

**Original:** Figure 8: The model displays an adeptness in recognizing flowers in photographs.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-27"></a>
### Page 27

<a id="S229"></a>
**Source:** p.27 S229

**Original:** Document Parsing with Dense Formulas

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S230"></a>
**Source:** p.27 S230

**Original:** Convert the content in the image to Markdown

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S231"></a>
**Source:** p.27 S231

**Original:** Model Response X ,0 1. If i &gt; 0, let d′′ := (i − 1, d − i − l + 1, l). Let Vd and V ′′ be r + 1-dimensional subspaces of H 0 (Ld ) and H 0 (L ′′ ), respectively, such that φ (Vd ) = V ′′1 . Then d d d,d′′ d the distributivity holds in V ′′ if and only if d X ,0 X ,0 X ,0 X ,0 X ,0 X ,0 X ,0 dim(V 2 + V 3 ) − dim(V ′′2 + V ′′3 ) = r + 1 − dim(V ′′1 + V ′′2 + V ′′3 ) d d d d d d d X ,0 2. If i+l ≤ d−1, let d′′′ := (i, d−i−l−1, l+1). Let Vd and V ′′′ be r+1-dimensional subspaces of H 0 (Ld ) and H 0 (L ′′′ ), respectively, such that φ ′′′ (V ′′′ ) = V 3 . d d d ,d d d Then the distributivity holds in Vd if and only if X ,0 X ,0 X ,0 X ,0 X1 ,0 X2 ,0 X ,0 + V 2 ) = r + 1 − dim(V 1 +V 2 + V 3 ), dim(V ′′′ + V ′′′ ) − dim(V 1 d d d d d d d where the maps φ and φ ′′′ in Proposition 3.14 are the maps linking the corresponding sheaves. Another important result is Proposition 3.16, which establishes an inequality for any exact d,d′′ d ,d limit linear series. Specifically, our Proposition 3.16 says: Let {(Ld , Vd )}d be an exact limit linear series of degree d and dimension r. Then  X

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S232"></a>
**Source:** p.27 S232

**Original:**  dim 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S233"></a>
**Source:** p.27 S233

**Original:** d

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S234"></a>
**Source:** p.27 S234

**Original:** Vd X ,0 X ,0 X ,0 V 1 +V 2 +V 3 d d d

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S235"></a>
**Source:** p.27 S235

**Original:**    ≥ r + 1.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S236"></a>
**Source:** p.27 S236

**Original:** As a consequence of Proposition 3.14 and Proposition 3.16, in Corollary 3.17, we get the following characterization of exact limit linear series satisfying the distributivity at each multidegree: Let {(Ld , Vd )}d be an exact limit linear series of degree d and dimension r. Then  X d

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S237"></a>
**Source:** p.27 S237

**Original:**  dim 

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S238"></a>
**Source:** p.27 S238

**Original:** Vd X ,0 X ,0 X ,0 V 1 +V 2 +V 3 d d d

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S239"></a>
**Source:** p.27 S239

**Original:**    = r+1

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S240"></a>
**Source:** p.27 S240

**Original:** if and only if the distributivity holds in Vd for any d. In Section 3, we also study simple limit linear series. In Proposition 3.18, we characterize the multidegrees which determine all simple bases. In Proposition 3.20, following the construction in Muñoz [5], Proposition 4.4, we present a certain structure of linearly independent sections for any exact limit linear series satisfying the distributivity property. In propositions 3.21 and 3.22, we obtain some properties of that structure. These properties imply the existence of a simple basis (we give a proof of that in Proposition 3.23). We conclude Section 3 with a characterization of simple limit linear series among the exact limit linear series. Specifically, our Corollary 3.24 says: Let {(Ld , Vd )}d be an exact limit linear series of degree d and dimension r. Then the following statements are equivalent: 1. {(Ld , Vd )}d is simple. 2.   Vd P   = r + 1. 3. The distributivity holds in Vd for any d. d dim  X1 ,0 X ,0 X ,0  V +V 2 +V 3 d d d In a subsequent work, given a refined limit linear series, we will construct all simple extensions by combining our Proposition 3.14 and the method of Muñoz [6] for the construction of all exact extensions.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C018"></a>
**Source:** p.27 C018

**Original:** Figure 9: Literary writing in multiple languages based on visual stimuli. 27

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-28"></a>
### Page 28

<a id="S241"></a>
**Source:** p.28 S241

**Original:** Multilingual Text Recognition

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S242"></a>
**Source:** p.28 S242

**Original:** 转录图中内容，并识别图中每段内容的语言。 (Translation: Transcribe the picture and identify the language of each paragraph in it.)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S243"></a>
**Source:** p.28 S243

**Original:** Model Response 1. 汉语，也称为“华语”。是中国使用人数最多的语言，也是世界上作为第一语言使用人数最多的语言。是中华优秀传统文化的重要载体。繁体 字，又“繁中文”，“化字”/“字”相。一般是指字化被化字所代替的字。- 语言：中文 2. 日本は地方ごとに多な方言があり、とりわけ琉球で方言差が著しい。- 语言：日语 3. ᄒ ᆫᄀ ᅡ ᆨᄋ ᅮ ᅥ(韓國語), ᄌ ᅩᄉ ᆫᄆ ᅥ ᆯ(朝鮮ᄆ ᅡ ᆯ)ᄂ ᅡ ᆫᄃ ᅳ ᅢᄒ ᆫᄆ ᅡ ᆫᄀ ᅵ ᆨᄀ ᅮ ᅪᄌ ᅩᄉ ᆫᅵ ᅥ ᄆᄌ ᆫ ᅮᄌ ᅮᄋ ᅴᄋ ᆫᄆ ᅵ ᆫᄀ ᅵ ᆼᄒ ᅩ ᅪᄀ ᆨᄋ ᅮ ᅴᄀ ᆼᄋ ᅩ ᆼᄋ ᅭ ᅥᄋ ᅵᄃ ᅡ. ᄃ ᆯᄋ ᅮ ᆫᄑ ᅳ ᅭᄀ ᅵᄂ ᅡᄆ ᆫᄇ ᅮ ᆸᄋ ᅥ ᅦᄉ ᅥᄂ ᆫᄎ ᅳ ᅡᄋ ᅵᄀ ᅡᄋ ᆹᄌ ᅥ ᅵᄆ ᆫᄃ ᅡ ᆼᄉ ᅩ ᅡᄋ ᅥᄆ ᅵᄂ ᅡᄑ ᅭᄒ ᆫ ᅧ ᅦᄉ ᄋ ᅥᄎ ᅡᄋ ᅵᄀ ᅡᄋ ᆻᄃ ᅵ ᅡ. - 语言：韩语 4. Le français est une langue indo-européenne de la famille des langues romanes dont les locuteurs sont appelés « francophones ». - 语言：法语 5. El español o castellano es una lengua romance procedente del latín hablado, perteneciente a la familia de lenguas indoeuropeas. - 语言：西班 牙语 6. A língua portuguesa, também designada português, é uma língua indo-europeia românica flexiva ocidental originada no galego-português falado no Reino da Galiza e no norte de Portugal. - 语言：葡萄牙语 7. Is ceann de na teangacha Ceilteacha í an Ghaeilge (nó Gaeilge na hÉireann mar a thugtar uirthi corruair), agus ceann de na trí cinn de theangacha Ceilteacha ar a dtugtar na teangacha Gaelacha (Gaeilge, Gaeilge Mhanann agus Gaeilge na hAlban) go háirithe. - 语言：爱尔兰语 8. English is a West Germanic language in the Indo-European language family, whose speakers, called Anglophones, originated in early medieval England on the island of Great Britain. - 语言：英语 9. Die deutsche Sprache bzw. Deutsch ist eine westgermanische Sprache, die weltweit etwa 90 bis 105 Millionen Menschen als Muttersprache und weiteren rund 80 Millionen als Zweit- oder Fremdsprache dient. - 语言：德语 10. Język polski, polszczyzna — język z grupy zachodniosłowiańskiej (do której należą również czeski, kaszubski, słowacki, języki łużyckie czy wymarły język drzewiański), stanowiącej część rodziny indoeuropejskiej. - 语言：波兰语 11. Η ελληνική γλώσσα ανήκει στην ινδοευρωπαϊκή οικογένεια και αποτελεί το μοναδικό μέλος του ελληνικού κλάδου. - 语言： 希腊语 12. Tiếng Việt hay Việt ngữ là một ngôn ngữ thuộc ngữ hệ Nam Á, được công nhận là ngôn ngữ chính thức tại Việt Nam. - 语言：越南语 13. Монгол хэл нь Монгол улсын албан ёсны хэл юм. - 语言：蒙古语 - 语言：俄语 16. Kiswahili ni lugha ya Kibantu yenye misamiati mingi ya Kiarabu (35%), lakini sasa ya Kiingereza pia (10%), inayozungumzwa katika eneo kubwa la Afrika ya Mashariki. - 语言：斯瓦希里语

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C019"></a>
**Source:** p.28 C019

**Original:** Figure 10: The model displays an adeptness in recognizing multilingual texts in images. 28

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-29"></a>
### Page 29

<a id="S244"></a>
**Source:** p.29 S244

**Original:** Text Information Recognition &amp; Processing

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S245"></a>
**Source:** p.29 S245

**Original:** Translate all the text in the picture into English and standardize the format Model Response The text in the image reads: Learning Prompt Guo Moruo’s collection of poems, "The Goddess", is a representative work of modern Chinese poetry. It expresses new content and forms, embodying the spirit of the May Fourth Movement. "Standing on the Edge of the Earth" is a representative poem from "The Goddess". The poet imagines standing on the edge of the earth to observe it from all angles, shouting and singing, imagining the surging clouds, magnificent Arctic ice, and violent Pacific Ocean, praising the power to destroy the old world and create a new life. This poem embodies the free, and bold spirit of the May Fourth Movement. When reading, pay attention to connecting with the specific context of the May Fourth Movement to understand the content and form of this poem. Wen Yiduo’s "Red Candle" uses the classical image of "candle" to give it a new meaning, praising the red candle for its dedication to lighting up the world. Pay attention to how the poet uses the dialogue between "red candle" and "red candle" to express the confusion and hope of youth, as well as the firm pursuit of ideals. The use of fantasy and emotional rhetoric, the use of rhetorical devices such as alliteration and assonance, and the formation of rhythmic beauty through the arrangement of long and short sentences in the poem are also important aspects to appreciate. Chang Yao’s "Snow Capped Peak on the Side of the Sun" is rich in content. When reading, pay attention to the development of imagination and taste the heavy and majestic atmosphere created by the images of "snow-capped peak", "sun", and "spider". Feel the powerful contained in it. Shelley’s "To a Skylark" has profound implications and novel imagery. Pay attention to the poet’s emotions and understand the symbolic meaning of the skylark. Grasp the characteristics of the interlocking between sections of the work and appreciate the poet’s use of bold and flexible imagery. When learning this group of poems, rely more on reading aloud to clarify the emotional context of the poem and grasp the connotation of the image. Feel the emotions expressed by the poet and understand the use of symbolism.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C020"></a>
**Source:** p.29 C020

**Original:** Figure 11: Recognition of dense Chinese text. The model is capable of directly converting lengthy, closely packed Chinese characters into standard English with accuracy and fluency.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-30"></a>
### Page 30

<a id="S246"></a>
**Source:** p.30 S246

**Original:** Multilingual Text Recognition

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S247"></a>
**Source:** p.30 S247

**Original:** What is the text? Model Response The text on the wall is in Portuguese and reads: “não é normal ter medo de andar sozinha na rua!!!” This translates to: “It is not normal to be afraid to walk alone on the street!!!” Figure 12: The model displays an adeptness in recognizing multilingual texts in images. Image source: (Yang et al., 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-31"></a>
### Page 31

<a id="S248"></a>
**Source:** p.31 S248

**Original:** Multilingual Text Recognition

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S249"></a>
**Source:** p.31 S249

**Original:** 识别图中所有文字，无需添加标点。 (Translation: Recognize all the text in the image without adding punctuation.) Model Response 尊敬的老师 展信舒颜 气温骤降 树叶无声无息的掉落 教诲如春风 师恩深似海 愿温馨、喜悦与幸福 如同吐露芬芳的花朵 永远洋溢在您幸福的时光里

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C021"></a>
**Source:** p.31 C021

**Original:** Figure 13: The model displays an adeptness in recognizing multilingual texts in images.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-32"></a>
### Page 32

<a id="S250"></a>
**Source:** p.32 S250

**Original:** A.2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S251"></a>
**Source:** p.32 S251

**Original:** Information extraction and Visual Reasoning

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S252"></a>
**Source:** p.32 S252

**Original:** A notable advancement in the Qwen2-VL models is their enhanced visual reasoning capability. This advancement allows the models to interpret and comprehend complex representations such as flowcharts, diagrams, and other symbolic systems. Mathematical Problem Solving

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S253"></a>
**Source:** p.32 S253

**Original:** Find the length of AC in the isosceles triangle ABC. Model Response Since triangle ABC is isosceles, we know that AC = BC. Therefore, we can set the expressions for AC and BC equal to each other and solve for x 4x + 1 = 5x − 0.5 Subtracting 4x from both sides, we get: 1 = x − 0.5 Adding 0.5 to both sides, we get: 1.5 = x Now that we know the value of x, we can substitute it back into the expression for AC to find its length: AC = 4x + 1 AC = 4(1.5) + 1 AC = 6 + 1 AC = 7 Therefore, the length of AC is 7.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C022"></a>
**Source:** p.32 C022

**Original:** Figure 14: The model displays an adeptness in solving mathematical problems. Image source: Lu et al. (2021)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-33"></a>
### Page 33

<a id="S254"></a>
**Source:** p.33 S254

**Original:** Mathematical Problem Solving

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S255"></a>
**Source:** p.33 S255

**Original:** Read the image and solve it step by step. Model Response The image shows two geometric figures, a rectangular prism and a cube, with their dimensions labeled. The problem asks to calculate the surface area and volume of these figures. 1.For the rectangular prism: Length (l) = 4 cm Width (w) = 2 cm Height (h) = 3 cm Surface Area (SA) of a rectangular prism = 2lw + 2lh + 2wh Volume (V) of a rectangular prism = lwh Substituting the given values: SA = 2(4cm)(2cm) + 2(4cm)(3cm) + 2(2cm)(3cm) SA = 16cm2 + 24cm2 + 12cm2 SA = 52cm2 V = (4cm)(2cm)(3cm) V = 24cm3 2.For the cube: Side length (a) = 3 dm Surface Area (SA) of a cube = 6a2 Volume (V) of a cube = a3 Substituting the given value: SA = 6(3dm)2 SA = 6(9dm2) SA = 54dm2 V = (3dm)3 V = 27dm3 So, the surface area and volume for each figure are as follows: For the rectangular prism: Surface Area = 52 cm2 Volume = 24 cm3 For the cube: Surface Area = 54 dm2 Volume = 27 dm3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C023"></a>
**Source:** p.33 C023

**Original:** Figure 15: Solving a math problem. The model calculates the surface area and volume of these figures with step-by-step explanation

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-34"></a>
### Page 34

<a id="S256"></a>
**Source:** p.34 S256

**Original:** Algorithmic Problem Solving

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S257"></a>
**Source:** p.34 S257

**Original:** Solve the algorithmic problem in the web page.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-35"></a>
### Page 35

<a id="S258"></a>
**Source:** p.35 S258

**Original:** Model Response To solve the “Snake in Matrix” problem, we need to implement a function that takes the size of the matrix n and a list of commands, and returns the final position of the snake after executing all the commands. Here’s a step-by-step approach to solve this problem: 1. Initialize Variables: • Initialize the current position of the snake as 0. • Initialize the direction of the snake as RIGHT (initially, the snake moves to the right). 2. Define Movement Functions: • Create a function to move the snake based on the current direction and the size of the matrix n. • Update the position of the snake accordingly. 3. Process Commands: • Iterate through each command in the list of commands. • For each command, update the direction and position of the snake. 4. Return Final Position: • After processing all commands, return the final position of the snake. Here’s the Python code to implement the solution: class Solution : def f in al Po si tio nO fS na ke ( self , n : int , commands : List [ str ]) -&gt; int : # Initialize variables position = 0 direction = " RIGHT " # Define movement functions def move_right (): nonlocal position position += 1 def move_down (): nonlocal position position += n def move_left (): nonlocal position position -= 1 def move_up (): nonlocal position position -= n # Process commands for command in commands : if command == " RIGHT " : move_right () elif command == " DOWN " : move_down () elif command == " LEFT " : move_left () elif command == " UP " : move_up () # Return final position return position This code defines a class Solution with a method finalPositionOfSnake that takes the size of the matrix n and a list of commands, and returns the final position of the snake after executing all the commands. The movement functions (move_right, move_down, move_left, move_up) are used to update the position of the snake based on the current direction.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C024"></a>
**Source:** p.35 C024

**Original:** Figure 16: The model displays an adeptness in solving algorithmic problems. 35

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-36"></a>
### Page 36

<a id="S259"></a>
**Source:** p.36 S259

**Original:** Web Content Recognition

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S260"></a>
**Source:** p.36 S260

**Original:** Extract all page titles in the screenshot of search result. Model Response The page titles in the screenshot of the search result are: 1. 你好，Qwen2 2. QwenLM/Qwen2 3. Qwen2 - a Qwen Collection 4. 快速开始 5. Qwen2-7B 6. Qwen2-Math，新一代数学模型 7. Qwen 8. Qwen/Qwen2-7B-Instruct 9. [2407.10671] Qwen2 Technical Report 10. qwen2

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C025"></a>
**Source:** p.36 C025

**Original:** Figure 17: The model displays an adeptness in recognize content from the web page.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-37"></a>
### Page 37

<a id="S261"></a>
**Source:** p.37 S261

**Original:** OCR and Mathematical Problem Solving

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S262"></a>
**Source:** p.37 S262

**Original:** Please tell me how many days are between Ruka’s birthday and Yuki’s birthday? Think carefully step by step. Model Response To determine the number of days between Ruka’s and Yuki’s birthdays, we need to calculate the difference between their respective birth dates. 1. Ruka’s birthday is on June 24. 2. Yuki’s birthday is on September 17. Let’s break it down step by step: 1. From June 24 to June 30: • June 24 to June 30 is 6 days. 2. From July 1 to August 31: • July has 31 days. • August has 31 days. • Total days in July and August: 31 + 31 = 62 days. 3. From September 1 to September 17: • September 1 to September 17 is 17 days. Now, we add all these days together: • June 24 to June 30: 6 days • July 1 to August 31: 62 days • September 1 to September 17: 17 days Total days = 6 + 62 + 17 = 85 days Therefore, there are 85 days between Ruka’s and Yuki’s birthdays.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C026"></a>
**Source:** p.37 C026

**Original:** Figure 18: The model displays an adeptness in OCR and mathematical reasoning. 37

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-38"></a>
### Page 38

<a id="S263"></a>
**Source:** p.38 S263

**Original:** OCR and Format Following

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S264"></a>
**Source:** p.38 S264

**Original:** What are the Linux versions and their release dates in the picture? Return results as a JSON list. Model Response [ { " version ": "6.11 - rc3 " , " release_date ": "2024 -08 -11" }, { " version ": "6.10.4" , " release_date ": "2024 -08 -11" }, { " version ": "6.9.12 [ EOL ]" , " release_date ": "2024 -07 -27" }, { " version ": "6.6.45" , " release_date ": "2024 -08 -11" }, { " version ": "6.1.104" , " release_date ": "2024 -08 -11" }, { " version ": "5.15.164" , " release_date ": "2024 -07 -27" }, { " version ": "5.10.223" , " release_date ": "2024 -07 -27" }, { " version ": "5.4.281" , " release_date ": "2024 -07 -27" }, { " version ": "4.19.319" , " release_date ": "2024 -07 -27" }, { " version ": " next -20240812" , " release_date ": "2024 -08 -12" } ]

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C027"></a>
**Source:** p.38 C027

**Original:** Figure 19: The model displays an adeptness in OCR and following formats. 38

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-39"></a>
### Page 39

<a id="S265"></a>
**Source:** p.39 S265

**Original:** OCR and Format Following

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S266"></a>
**Source:** p.39 S266

**Original:** 将图中的每日的最高气温和最低气温整理成表格。(Translation: Organize the daily highest and lowest temperatures from the image into a table.) Model Response 以下是图中每日的最高气温和最低气温整理成的表格： 日期 最高气温 最低气温 08/12 08/13 08/14 08/15 08/16 08/17 08/18 08/19

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S267"></a>
**Source:** p.39 S267

**Original:** 31°C 30°C 30°C 31°C 31°C 30°C 30°C 30°C

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S268"></a>
**Source:** p.39 S268

**Original:** 23°C 22°C 23°C 24°C 24°C 24°C 23°C 22°C

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S269"></a>
**Source:** p.39 S269

**Original:** 希望这对你有帮助！ Figure 20: The model displays an adeptness in OCR and following formats. 39

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-40"></a>
### Page 40

<a id="S270"></a>
**Source:** p.40 S270

**Original:** OCR for Large Images

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S271"></a>
**Source:** p.40 S271

**Original:** qwen-vl-max-0809对视频内容的理解功能存在哪些限制？ (Translation: What limitations exist in qwen-vl-max-0809’s ability to understand video content?) Model Response qwen-vl-max-0809对视频内容的理解功能存在以下限制：视频文件大小最大为150MB，视频文件 格式支持MP4、AVI、MKV、MOV、FLV、WMV等，视频尺寸无限制，但视频文件会被调整到 约600K像素数，更大尺寸的视频文件不会有更好的理解效果。(Translation: qwen-vl-max-0809 has the following limitations on the video content understanding: the maximum video file size is 150MB, the video file formats supported are MP4, AVI, MKV, MOV, FLV, WMV, etc. There is no limitation on the video size, but the video file will be resized to about 600K pixels, and video files of larger sizes won’t have better video understanding results.)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C028"></a>
**Source:** p.40 C028

**Original:** Figure 21: The model displays an adeptness in large images OCR. 40

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-41"></a>
### Page 41

<a id="S272"></a>
**Source:** p.41 S272

**Original:** A.3

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S273"></a>
**Source:** p.41 S273

**Original:** Video Understanding

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S274"></a>
**Source:** p.41 S274

**Original:** Multi-Round Video Chat

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S275"></a>
**Source:** p.41 S275

**Original:** Please describe the video in detail. Model Response The video begins with a man speaking to the camera, followed by a group of people sitting in a control room. The camera then cuts to two men floating inside a space station, where they are seen speaking to the camera. The men appear to be astronauts, and they are wearing space suits. The space station is filled with various equipment and machinery, and the camera pans around to show the different areas of the station. The men continue to speak to the camera, and they appear to be discussing their mission and the various tasks they are performing. Overall, the video provides a fascinating glimpse into the world of space exploration and the daily lives of astronauts. User Query What is the color of the clothes the two astronauts wearing? Model Response The two astronauts are wearing blue and black clothes.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C029"></a>
**Source:** p.41 C029

**Original:** Figure 22: The model displays an adeptness in recognizing multi-round video chat.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-42"></a>
### Page 42

<a id="S276"></a>
**Source:** p.42 S276

**Original:** Multi-Video Understanding

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S277"></a>
**Source:** p.42 S277

**Original:** 视频中的人在做什么？ (Translation: What are the people in the video doing?)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S278"></a>
**Source:** p.42 S278

**Original:** Model Response 视频中的人正在使用吸尘器清理地板。 (Translation: The man in the video is using a vacuum cleaner to clean the floor.)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S279"></a>
**Source:** p.42 S279

**Original:** User Query 如果要进一步清洁地面的话，接下来该怎么做？ (Translation: What should I do next if I want to clean the floor further?)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S280"></a>
**Source:** p.42 S280

**Original:** Model Response 如果要进一步清洁地面，可以使用拖把或湿布擦拭地面，以去除吸尘器无法清除的污渍和灰尘。 (Translation: For further cleaning of the floor, wipe the floor with a mop or damp cloth to remove stains and dirt that the vacuum cleaner cannot remove.)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S281"></a>
**Source:** p.42 S281

**Original:** User Query

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S282"></a>
**Source:** p.42 S282

**Original:** 已经用拖把清洁了地面，评价一下清洁工作？ (Translation: Already cleaned the floor with a mop and please comment on the cleaning?)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S283"></a>
**Source:** p.42 S283

**Original:** Model Response 从视频中可以看出，清洁工作已经完成，地面已经变得干净整洁。 (Translation: As you can see from the video, the cleaning has been completed and the floor has been made clean and tidy.)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S284"></a>
**Source:** p.42 S284

**Original:** User Query 通过你看到的，接下来还能做些什么？ (Translation: By what you see, what else can you do next?)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S285"></a>
**Source:** p.42 S285

**Original:** Model Response 接下来可以将拖把清洗干净，晾干备用。 (Translation: Next you can clean the mop, dry it and set it aside.)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C030"></a>
**Source:** p.42 C030

**Original:** Figure 23: The model displays an adeptness in recognizing multi-video understanding. 42

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-43"></a>
### Page 43

<a id="S286"></a>
**Source:** p.43 S286

**Original:** A.4

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S287"></a>
**Source:** p.43 S287

**Original:** Visual Agent Capability

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S288"></a>
**Source:** p.43 S288

**Original:** The Qwen2-VL also excels in location and agent tasks. Locate Whatever You Desire

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S289"></a>
**Source:** p.43 S289

**Original:** Detect the bounding box of ’the red car’ Model Response &lt;|object_ref_start|&gt;the red car&lt;|object_ref_end|&gt;&lt;|box_start|&gt;(701,531),(869,675)&lt;|box_end|&gt;

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C031"></a>
**Source:** p.43 C031

**Original:** Figure 24: Our models were able to locate specific elements within images, such as identifying the red car accurately.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-44"></a>
### Page 44

<a id="S290"></a>
**Source:** p.44 S290

**Original:** Visual Referring Prompting

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S291"></a>
**Source:** p.44 S291

**Original:** What does the pointed news talk about? Model Response The pointed news with a green logo of OpenAI and a title "Le chatbot ChatGPT d’OpenAI dispose désormais d’instructions personnalisées pour stocker vos préférences" is talking about the new feature of ChatGPT that can now store personalized instructions to better serve users.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C032"></a>
**Source:** p.44 C032

**Original:** Figure 25: Our model is capable of annotating and posing questions regarding the content present in webpage screenshots, demonstrating its potential as a visual agent. Image source: (Yang et al., 2023)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-45"></a>
### Page 45

<a id="S292"></a>
**Source:** p.45 S292

**Original:** Function Calling - Basic

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S293"></a>
**Source:** p.45 S293

**Original:** 几点到达，到的时候目的地天气怎么样 (Translation: What time does this flight arrive? What is the weather like at the destination when it arrives?) Function Input 北京 Function Result 时间: 2024-07-30 14:00, 风向: 西南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 29°C, 天气: 小雨 时间: 2024-07-30 15:00, 风向: 西南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 28°C, 天气: 小雨 时间: 2024-07-30 16:00, 风向: 西南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 28°C, 天气: 小雨 时间: 2024-07-30 17:00, 风向: 西南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 28°C, 天气: 小雨 时间: 2024-07-30 18:00, 风向: 西南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 27°C, 天气: 中雨 时间: 2024-07-30 19:00, 风向: 南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 27°C, 天气: 中雨 时间: 2024-07-30 20:00, 风向: 南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 27°C, 天气: 中雨 时间: 2024-07-30 21:00, 风向: 南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 26°C, 天气: 小雨 时间: 2024-07-30 22:00, 风向: 南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 26°C, 天气: 小雨 时间: 2024-07-30 23:00, 风向: 南风, 风力: 0-3级微风&lt;5.4m/s, 温度: 26°C, 天气: 小雨 （避免显示过长，省略部分信息。） Model Response 根据航班信息，您乘坐的中国国航CA1723航班预计将于2024年7月30日20:30抵达北京首都机场T3航 站楼。 在您到达时，北京的天气预报显示会有中雨，并且温度约为27℃。请注意携带雨具并做好防雨措 施。祝您旅途愉快！ (Translation: According to flight information, your Air China flight CA1723 is expected to arrive at Beijing Capital Airport T3 Terminal at 20:30 on July 30, 2024. When you arrive, the weather forecast in Beijing shows moderate rain and the temperature is about 27℃. Please remember to bring rain gear and take rain protection measures. Have a pleasant journey!)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C033"></a>
**Source:** p.45 C033

**Original:** Figure 26: The model identified the destination and arrival time in the image, called the 24-hour weather query function, correctly input the destination, and extracted the weather at the arrival time from the query results, thus enabling it to answer the user’s question.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-46"></a>
### Page 46

<a id="S294"></a>
**Source:** p.46 S294

**Original:** Function Calling - Code Interpreter

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S295"></a>
**Source:** p.46 S295

**Original:** Implement the flowchart, representing modules as functions without implementation details. Write the code and validate it using the code interpreter. Function Input # Placeholder functions for the modules def speech_adapter ( input_audio ): # Placeholder for speech adapter implementation pass # To avoid excessive length , # the remaining functions without implementation details are omitted here . # Example usage input_audio = " talk about the weather in San Francisco . " s p e e c h _ a d a pt er _o ut pu t = speech_adapter ( input_audio ) s p e e c h _ e n c od er _o ut pu t = speech_encoder ( spee ch_ad apter_ outpu t ) s y s t e m _ pr omp t_ ou tp ut = system_prompt () d i a l o g u e _h is to r y _ o u t p u t = dialogue_history () llama_3_output = llama_3 ( speech_encoder_output , system_prompt_output , &#92; d i a l o g u e _h is to r y _ o u t p u t ) t e x t _ n o r m a l i z a t i o n _ o u t p u t = text_normalization ( llama_3_output ) p r o s o d y _m ode l_ ou tp ut = prosody_model ( t e x t _ no r m a l i z a t i on _ o u t p u t ) output_audio = synthesizer ( p rosody_model_output )

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S296"></a>
**Source:** p.46 S296

**Original:** Function Result Finished execution. Model Response The code has been executed without any errors, which means that the structure of the code matches the flowchart and there are no syntax issues. However, since the functions are placeholders and do not perform any actual operations, we cannot validate the correctness of the implementation. The code simply represents the flowchart by defining each module as a function and demonstrating how the functions could be called in sequence to process input audio and produce output audio.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C034"></a>
**Source:** p.46 C034

**Original:** Figure 27: The model identified the steps in the flowchart, drafted the simulation code as required while omitting the details, and then successfully executed it through the code interpreter. Image source: (Dubey et al., 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-47"></a>
### Page 47

<a id="S297"></a>
**Source:** p.47 S297

**Original:** Function Calling - Code Interpreter

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S298"></a>
**Source:** p.47 S298

**Original:** Count the average value of each row in this chart and draw a bar chart to show it. Write the code and verify it using the code interpreter. Function Input import pandas as pd import numpy as np import matplotlib . pyplot as plt # Extracting the numerical values from the table data = { " Model " : [ " Llama 3 8 B " , " Gemma 2 9 B " , " Mistral 7 B " , " Llama 3 70 B " , &#92; " Mixtral 8 x22B " , " GPT -3.5 Turbo " , " Llama 3 405 B " , " GPT -4 " , &#92; " GPT -4 o " , " Claude 3.5 Sonnet " , " Nemotron 4 340 B " ] , " HumanEval " : [72.6 , 54.3 , 40.2 , 80.5 , 75.6 , 68.0 , 89.0 , 86.6 , 90.2 , &#92; 92.0 , 73.2] , " HumanEval + " : [67.1 , 48.8 , 32.3 , 74.4 , 68.3 , 62.8 , 82.3 , 77.4 , 86.0 , &#92; 82.3 , 64.0] , " MBPP " : [60.8 , 59.2 , 42.6 , 75.4 , 66.2 , 71.2 , 78.8 , 80.2 , 81.4 , 76.6 , &#92; 75.4] , " MBPP EvalPlus ( base ) " : [72.8 , 71.7 , 49.5 , 86.0 , 78.6 , 82.0 , 88.6 , &#92; 83.6 , 87.8 , 90.5 , 72.8] } # Create a DataFrame df = pd . DataFrame ( data ) # Calculate the average for each row df [ " Average " ] = df . mean ( axis =1) # Plotting the bar chart plt . figure ( figsize =(12 , 6)) plt . bar ( df [ " Model " ] , df [ " Average " ] , color = " skyblue " ) plt . xlabel ( " Model " ) plt . ylabel ( " Average Score " ) plt . title ( " Average Pass@1 Scores on Code Generation Benchmarks " ) plt . xticks ( rotation =45 , ha = " right " ) plt . tight_layout () plt . show ()

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-48"></a>
### Page 48

<a id="S299"></a>
**Source:** p.48 S299

**Original:** Function Result

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S300"></a>
**Source:** p.48 S300

**Original:** Model Response The average Pass@1 scores on code generation benchmarks for each model have been calculated and are displayed in the table above. The bar chart shows the average scores for each model, providing a visual comparison of their performance across the different benchmarks.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C035"></a>
**Source:** p.48 C035

**Original:** Figure 28: The model analyzed the table, and wrote the code to calculate the mean of each row in the table and to plot the results as a bar chart, which was successfully executed and visualized by the code interpreter. Image source: (Dubey et al., 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-49"></a>
### Page 49

<a id="S301"></a>
**Source:** p.49 S301

**Original:** Function Calling - Code Interpreter

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S302"></a>
**Source:** p.49 S302

**Original:** Implement the formula, write the code and verify it using the code interpreter. Function Input import numpy as np def softmax ( x ): """ Compute softmax values for each sets of scores in x . """ e_x = np . exp ( x - np . max ( x )) return e_x / e_x . sum ( axis =0) def top_k (p , k ): """ Return the indices of the top k elements in the probability vector p . """ return np . argsort ( p )[ - k :][:: -1] # Example input x = np . array ([1 , 2 , 3 , 4 , 5]) # G = lambda x : x # Simple gating E = lambda x , i : x + i # Simple # Compute probabilities p = softmax ( G ( x )) # Select top k experts k = 3 top_experts = top_k (p , k ) # Compute output y = np . sum ([ p [ i ] * E (x , i ) for i p , top_experts , y

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S303"></a>
**Source:** p.49 S303

**Original:** Example input vector network ( identity function for demonstration ) expert functions ( add the expert index to the input )

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S304"></a>
**Source:** p.49 S304

**Original:** in top_experts ])

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S305"></a>
**Source:** p.49 S305

**Original:** Function Result (array([0.01165623, 0.03168492, 31.451165958047895)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S306"></a>
**Source:** p.49 S306

**Original:** 0.08612854,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S307"></a>
**Source:** p.49 S307

**Original:** 0.23412166,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S308"></a>
**Source:** p.49 S308

**Original:** 0.63640865]),

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S309"></a>
**Source:** p.49 S309

**Original:** array([4,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S310"></a>
**Source:** p.49 S310

**Original:** 3,

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S311"></a>
**Source:** p.49 S311

**Original:** 2]),

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S312"></a>
**Source:** p.49 S312

**Original:** Model Response The probabilities assigned to each expert based on the input vector (x) are: (p = [0.01165623, 0.03168492, 0.08612854, 0.23412166, 0.63640865]). The top (k = 3) experts selected based on these probabilities are the experts with indices 4, 3, and 2 (in descending order of probability). The output (y) computed as a weighted sum of the outputs of these top experts is approximately 31.4512. This example demonstrates a simple implementation of the MoE model’s operation. In a real-world scenario, the gating network (G) and the experts (Ei ) would be more complex, involving neural network layers and potentially non-linear transformations. Figure 29: The model understood the formula, implemented the code as required, and successfully executed it in the code interpreter to obtain the results. Image source: (Dubey et al., 2024)

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-50"></a>
### Page 50

<a id="S313"></a>
**Source:** p.50 S313

**Original:** VL Agent - UI Operations

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S314"></a>
**Source:** p.50 S314

**Original:** System Message You are a helpful assistant. # Actions ## You have the following actions. ### Click Click: A quick, light fingertip press that commands, selects, or navigates through a phone’s user interface. Parameters: [{"name": "point", "description": "The specific point of interest on the screen, marked by the coordinate (x, y)." "required": true, "schema": "string"}] ### Type Type: Engaging with a smartphone’s interface by entering text for various purposes like messaging, searching, or command execution. Parameters: [{ "name": "text", "description": "The text to be typed on a smartphone.", "required": true, "schema": "string"}] ### Swipe Swipe: Touch the screen and move your finger to a new location for new content. Parameters: ["name": "direction", "description": "Determine the swipe route from the cardinal directions: up, down, left, or right." "required": true, "schema": "string", "choices": ["up", "down", "left", "right"]] ### Back Back: Go in reverse to the prior interface or exiting the current context Parameters: [] ### Home Home: Return to the device’s home screen from any application or task. Parameters: [] ### Enter Enter: Execute a command to confirm inputs or selections. Parameters: [] ### Done Done: Indicate the completion of a task. Parameters: [] 50

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-51"></a>
### Page 51

<a id="S315"></a>
**Source:** p.51 S315

**Original:** VL Agent - UI Operations ## Continuously take action until the task is completed. *FUNCTION*: The action to take, should be one of {Click,Type,Swipe,Back,Home,Enter,Done} *ARGS*: The input of the action. *RESULT*: Action results. *RETURN*: Reply based on action results. User Your task is: What’s a good restaurant in San Diego? ![](Screenshot_1) Assistant The screen shows the email setup page, which is not relevant to finding a restaurant. Possible actions are to exit the em ail setup and navigate to a search engine or map application where I can look up restaurants in San Diego. *FUNCTION*: Home *ARGS*: {} *RESULT*: ![](Screenshot_2) *RETURN*: The screen shows the home screen with various apps, including Google Chrome and Maps which could be used to search for a restaurant in San Diego. Possible actions are to tap on the Google Chrome app to open it and then use it to search for a good restaurant in San Diego. *FUNCTION*: Click *ARGS*: {"point": "(687, 792)"} *RESULT*: ![](Screenshot_4) *RETURN*: The current screen shows search results for skateboards, which is not related to the query about finding a good restaurant in San Diego. Possible actions are to click on the Google search bar at the top of the screen and enter the correct search term "good restaurant in San Diego" to find relevant information. *FUNCTION*: Click *ARGS*: {"point": " (596, 213)"} *RESULT*: ![](Screenshot_6) *RETURN*: The current screen shows search suggestions related to skateboard speeds, which is not relevant to the query about finding a good restaurant in San Diego. Possible actions are to click on the "X" button to he correct query for finding a good restaurant in San Diego. *FUNCTION*: Click *ARGS*: {"point": "(927, 135)"} *RESULT*: ![](Screenshot_8) *RETURN*: The screen shows the Google search bar with a list of previous searches, none of which are related to finding a restauran t in San Diego. Possible actions are to type "good restaurant in San Diego" into the search bar and then press enter to perform the search. *FUNCTION*: Type *ARGS*: {"text": "What’s a good restaurant in San Diego?"} *RESULT*: ![](Screenshot_9) *RETURN*: The screen shows a list of search suggestions related to finding good restaurants in San Diego, indicating that the user has typed in a query but not yet executed it. Possible actions are to select one of the suggested searches or press enter on the keyboard to execute the current search and view the results. *FUNCTION*: Enter *ARGS*: {} *RESULT*: ![](Screenshot_10) *RETURN*: The screen shows a list of top-rated restaurants in San Diego with details such as ratings, price range, and opening hours. Possible actions are to stop and set the query as completed. *FUNCTION*: Done *ARGS*: {}

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C036"></a>
**Source:** p.51 C036

**Original:** Figure 30: Qwen2-VL as an agent understands the query with respect to UI operation, utilizes the pre-defined actions in system message, and fulfill the task step-by-step.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="page-52"></a>
### Page 52

<a id="S316"></a>
**Source:** p.52 S316

**Original:** VL Agent - Card Game

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="S317"></a>
**Source:** p.52 S317

**Original:** System Message You are a helpful assistant. # Actions ## You have the following actions. ### Hit Hit: Get a new card. Parameters: [] ### Stand Stand: Stop to get a new card. Parameters: [] ## Continuously take action until the task is completed. *FUNCTION*: The action to take, should be one of {Hit,Stand} *ARGS*: The input of the action. *RESULT*: Action results. *RETURN*: Reply based on action results. User You are a blackjack player. You are observing the current game state in the image. With the given functions, your goal is to dealer by getting as close to 21 points as possible without exceeding it. ![](Screenshot_1) Assistant I have 8 points, and the dealer has 10 points. I should hit. *FUNCTION*: Hit *ARGS*: {} *RESULT*: ![](Screenshot_2) *RETURN*: I have 15 points, and the dealer has 10 points. I should hit. *FUNCTION*: Hit *ARGS*: {} *RESULT*: ![](Screenshot_3) *RETURN*: I have 17 points, and the dealer has 10 points. I should stand. *FUNCTION*: Stand *ARGS*: {} *RESULT*: Dealer Card: Q, 5, Q. The total point of dealer is 25 &gt; 21. Player Card: 4, 4, 7, 2. The total point of player is 17. Player win!

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

<a id="C037"></a>
**Source:** p.52 C037

**Original:** Figure 31: Qwen2-VL recognizes these cards and utilizes Hit and Stand to play the blackjack.

**中文:** _待人工翻译（draft；不得视为已完成阅读）。_

## 阅读提示

- 当前文件的价值是稳定保存全文页码与段落锚点，并提供一个经人工复核的开篇双语块。
- 未翻译段落、图表、表格和公式都在 `translation_notes.md` 中登记；完成前不应把本文件标记为正式全文译读。
- 博客笔记可作为研究路线导读，但数值结论仍应回到本读者的具体页码块和原 PDF 核验。
