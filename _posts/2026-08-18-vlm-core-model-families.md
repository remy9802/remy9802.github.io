---
title: "VLM 核心路线：Qwen-VL 三代、LLaVA、InternVL 与 GPT 多模态模型"
date: 2026-08-18
permalink: /posts/vlm-core-model-families/
tags: [vision-language-model, multimodal-llm, qwen-vl, llava, internvl, gpt, literature-note]
note_type: topic-synthesis
literature_topics: [vlm]
---

> **阅读范围**：全文阅读 8 份主要来源，对应 6 条用户指定的模型路线：Qwen-VL、Qwen2-VL、Qwen3-VL、LLaVA、InternVL、GPT-4V/GPT-4o。  
> **检索日期**：2026-08-18。  
> **主题**：生成式视觉语言模型如何从“视觉编码器接入 LLM”，演进到原生多模态、长上下文推理与视觉代理？

## 核心结论

这里讨论的 VLM 更准确地说是生成式大型视觉语言模型（LVLM/LMM），而不是只做图文对比学习的 CLIP 类模型。六条路线共同采用“视觉表示 + 语言模型 + 跨模态对齐”，但技术重心在三年间发生了明显迁移：

1. **LLaVA 确立了低成本视觉指令微调范式。** 它用一个线性投影把冻结的 CLIP 视觉特征接入 Vicuna，并用 GPT-4 合成的 15.8 万条视觉指令数据训练。其核心贡献主要是数据与训练方法，而不是复杂连接器。
2. **Qwen-VL 1 代把 OCR、视觉定位、多图对话和中英双语纳入同一生成接口。** 它仍使用固定分辨率与固定 256 个视觉 token，但证明视觉 grounding 可以直接表达为文本坐标。
3. **InternVL 选择了与 LLaVA 相反的扩展方向：不仅扩展 LLM，也把视觉编码器扩到 6B，并用 8B 的 QLLaMA 作为“重型连接器”。** 这使同一模型兼容对比、生成、视觉感知和对话任务，但训练与推理成本显著提高。
4. **Qwen2-VL 的关键突破是动态视觉 token 与统一时空位置编码。** Naive Dynamic Resolution 避免把任意长宽比图像硬缩放到固定尺寸，M-RoPE 则把文本、图像和视频的位置统一为时间、高度、宽度三轴。
5. **Qwen3-VL 把竞争焦点从“看清图片”推进到“长上下文推理与行动”。** DeepStack 注入多层视觉特征，Interleaved MRoPE 改善长视频位置频谱，显式时间戳强化视频接地；训练又加入长 CoT、知识蒸馏、强化学习、GUI 操作和工具调用。它更接近多模态 agent，而不只是视觉问答模型。
6. **GPT-4V/GPT-4o 建立了闭源能力上界与安全议程，却不是可复现的架构论文。** GPT-4V 展示任意交错图文输入和强通用推理，GPT-4o 进一步声称以同一网络端到端处理文本、视觉和音频；但参数规模、网络结构、数据规模和大部分训练细节没有公开，因此与开放模型的比较只能是能力层面，不能是机制层面。

总体而言，VLM 的进步并非单纯来自更大的 LLM。**视觉 token 化、空间/时间位置表示、数据质量、后训练方法和评价协议**，至少与语言模型规模同等重要。

## 检索记录

- **数据源**：arXiv、NeurIPS Proceedings、CVF Open Access、OpenAI 官方研究页面与系统卡。
- **检索式**：
  - `("vision-language model" OR "large multimodal model") AND (visual instruction tuning OR alignment OR dynamic resolution)`
  - `(Qwen-VL OR Qwen2-VL OR Qwen3-VL) AND (technical report OR architecture OR evaluation)`
  - `(LLaVA OR InternVL OR GPT-4V OR GPT-4o) AND (paper OR system card OR visual input)`
- **时间范围**：核心来源发表于 2023-2025；检索更新至 2026-08-18。
- **纳入**：用户指定模型家族的首篇或代际技术报告；可获得全文；包含架构、训练、评价或部署安全的一手信息。
- **排除**：LLaVA-NeXT、InternVL2/2.5/3、Qwen2.5-VL 等中间或后续变体不单独展开，以控制主题范围；它们会影响代际连续性，因此在局限部分说明。
- **来源状态**：LLaVA 为 NeurIPS 2023 正式论文，InternVL 为 CVPR 2024 正式论文；Qwen-VL 三代均以 arXiv 技术报告为主要证据，其中 Qwen3-VL 截至检索日仍应视为预印本；GPT 来源是厂商技术报告和系统卡，不是同行评审论文。
- **检索性质**：这是围绕指定模型的定向检索，不是系统综述，也不按引用量评定“核心”。

## 研究问题

本文试图回答五个问题：

1. 视觉信息以什么形式进入自回归语言模型？
2. 模型怎样保留文字、小物体、坐标、图表和视频时间等细粒度信息？
3. 训练范式如何从图文对齐演进到指令微调、推理蒸馏和强化学习？
4. 基准提升究竟支持什么结论，又有哪些训练集重叠、模型裁判和协议差异？
5. 开源技术报告与闭源系统卡分别能告诉我们什么，不能告诉我们什么？

## 方法与数据

### 路线总览

| 路线 | 代表来源与状态 | 视觉—语言接口 | 训练重点 | 主要模态/上下文 | 可复现性 |
|---|---|---|---|---|---|
| LLaVA | NeurIPS 2023，同行评审 | CLIP ViT-L/14 + 单层线性投影 + Vicuna | 59.5 万图文对齐、15.8 万 GPT-4 合成指令 | 单图对话 | 代码、模型、数据开放 |
| Qwen-VL | 2023，arXiv 技术报告 | ViT-bigG + 位置感知 cross-attention，压缩为 256 token | 1.4B 清洗图文对、7 类多任务、35 万 SFT | 固定 448×448；图文、多图、坐标 | 权重与代码开放 |
| InternVL | CVPR 2024，同行评审 | 6B InternViT + 8B QLLaMA + LLM decoder | 4.98B 对比学习、1.03B 生成学习、约 400 万 SFT | 图像、检索、感知、对话 | 代码与模型开放，训练成本高 |
| Qwen2-VL | 2024，arXiv 技术报告 | 675M ViT + MLP merger + Qwen2 LLM | 两阶段共 1.4T 图文/视频 token + SFT | 动态分辨率；图像、视频、视觉 agent | 2B/7B/72B 开放权重系列 |
| Qwen3-VL | 2025，arXiv 预印本 | SigLIP-2 + MLP merger + DeepStack + Qwen3 Dense/MoE | 约 2.167T 分阶段预训练 token；SFT、蒸馏、RL | 原生 256K 图文视频交错上下文 | 多尺寸模型开放，但报告未同行评审 |
| GPT | GPT-4 技术报告、GPT-4V/GPT-4o 系统卡 | 未公开；GPT-4o 声称同一网络端到端处理多模态 | 网络规模与训练预算未披露；公开资料侧重 RLHF、红队与部署 | GPT-4V：图文→文本；GPT-4o：文本/图像/音频/视频 | API 可用，机制与权重闭源 |

以下按“一份主要来源一张卡片”记录。GPT 路线拆为技术报告和两份系统卡，避免把架构说明、部署评价与安全证据混在同一记录中。

### 论文 1：Qwen-VL

- **文献链接**：[Qwen-VL: A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond](https://arxiv.org/abs/2308.12966)
- **代码链接**：[QwenLM/Qwen-VL](https://github.com/QwenLM/Qwen-VL)
- **作者 / 机构 / 年份**：Jinze Bai、Shuai Bai、Shusheng Yang、Shijie Wang、Sinan Tan、Peng Wang、Junyang Lin、Chang Zhou、Jingren Zhou；Alibaba Group；2023。
- **研究问题**：怎样在一个通用生成模型中同时实现图像理解、OCR、多图对话、中英双语和视觉定位，而不为每项任务建立独立模型？
- **方法**：以 Qwen-7B 为语言基础，接入 1.9B 参数 ViT-bigG 和约 0.08B 的位置感知适配器，总规模约 9.6B；可学习 queries 将视觉序列压缩为固定 256 token，坐标归一化到 `[0, 1000)` 后按文本生成。训练依次使用从 5B 原始图文对清洗出的 1.4B 数据、多任务数据，以及 35 万条多模态指令数据。
- **实验**：覆盖 caption、VQA、TextVQA、DocVQA、ChartQA、RefCOCO 和 TouchStone。论文报告 TextVQA 63.8、DocVQA 65.1、ChartQA 65.7、RefCOCO val 89.36；多项传统任务中 Qwen-VL-Chat 略低于预训练版，构成重要反例。
- **结论**：统一文本接口可以同时表达自然语言答案与定位坐标；提升输入分辨率并加入 OCR/grounding 数据，显著扩展了早期通用 LVLM 的任务边界。
- **局限性**：固定 448×448 输入和 256 个视觉 token 限制小字、长文档及极端长宽比；技术报告未同行评审，部分训练数据和 TouchStone 评价难以独立复现，SFT 也不保证保留全部基础能力。

### 论文 2：Qwen2-VL

- **文献链接**：[Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution](https://arxiv.org/abs/2409.12191)
- **代码链接**：[QwenLM/Qwen3-VL](https://github.com/QwenLM/Qwen3-VL)（原 `QwenLM/Qwen2-VL` 官方仓库已重命名并重定向到该家族仓库，历史记录仍列出 Qwen2-VL 发布与微调代码）
- **作者 / 机构 / 年份**：Peng Wang、Shuai Bai、Sinan Tan、Shijie Wang、Zhihao Fan、Jinze Bai、Keqin Chen、Xuejing Liu、Jialin Wang、Wenbin Ge、Yang Fan、Kai Dang、Mengfei Du、Xuancheng Ren、Rui Men、Dayiheng Liu、Chang Zhou、Jingren Zhou、Junyang Lin；Qwen Team / Alibaba Group；2024。
- **研究问题**：怎样让 VLM 在不强制缩放到固定尺寸的前提下统一处理任意分辨率图像和视频，并保留二维空间与时间位置信息？
- **方法**：675M ViT 采用 Naive Dynamic Resolution，让视觉 token 数随输入尺寸变化；2×2 邻接 patch 经 MLP 合并；M-RoPE 将旋转位置编码分为时间、高度、宽度三轴；深度为 2 的 3D convolution 统一图像与视频。发布 2B、7B、72B 模型，预训练两阶段累计约 1.4T token。
- **实验**：覆盖 OCR、文档、综合推理、视频和视觉 agent。72B 模型在 DocVQA、OCRBench、RealWorldQA 分别为 96.5、877、77.8，但 MMMU 为 64.5，低于论文对照 GPT-4o 的 69.1。动态分辨率与 M-RoPE 消融呈混合结果，并非每项指标单调提升。
- **结论**：动态视觉 token 和统一时空位置编码改善了多尺度感知、OCR 与视频建模的效率—性能折中；综合推理仍是独立于分辨率的瓶颈。
- **局限性**：技术报告未同行评审；不同 token 预算的对照不等于统一算力比较；自建数据、函数调用集和训练数据重叠难以完全审计，通用模型在视觉语言导航上仍落后于专用模型。

### 论文 3：Qwen3-VL Technical Report

- **文献链接**：[Qwen3-VL Technical Report](https://arxiv.org/abs/2511.21631)
- **代码链接**：[QwenLM/Qwen3-VL](https://github.com/QwenLM/Qwen3-VL)
- **作者 / 机构 / 年份**：Qwen Team；Qwen Team / Alibaba Cloud；2025。
- **研究问题**：怎样把多模态模型从图像问答扩展到原生长上下文、长视频、复杂视觉推理、GUI 操作和工具调用，同时覆盖 dense、MoE 与 thinking/non-thinking 多种部署形态？
- **方法**：以 Qwen2.5-VL 为基础，引入 SigLIP-2 视觉编码器、DeepStack 多层视觉特征注入、Interleaved MRoPE、文本化视频时间戳和原生 256K 上下文。四阶段预训练预算为 67B、约 1T、约 1T、100B token；后训练含约 120 万 SFT 样本、long-CoT、蒸馏、约 3 万可验证 RL queries 和视觉工具交互数据。
- **实验**：235B-A22B Thinking 版在 MMMU 为 80.6，高于 Instruct 的 78.7；但 DocVQA 与 OCRBench 上 Instruct 以 97.1、920 高于 Thinking 的 96.5、875。内部消融中 DeepStack 把 12 项平均分从 74.7 提高到 76.0，却使 TextVQA 从 80.6 微降到 80.5；video needle 实验在约 1M token/2 小时外推设置为 99.5%。
- **结论**：长推理和多层视觉注入对综合任务总体有效，但 thinking 并非 OCR/文档任务的默认最优解；模型路线正从“回答”转向“感知—推理—行动”。
- **局限性**：截至检索日仍是预印本；作者以团队署名，机构和训练数据披露不如传统论文完整；长视频 needle 主要测试显著帧检索，不能替代因果理解；该代继承 Qwen2.5-VL，无法把 Qwen1→2→3 视为严格控制变量实验。

### 论文 4：Visual Instruction Tuning（LLaVA）

- **文献链接**：[NeurIPS 2023 正式论文](https://proceedings.neurips.cc/paper_files/paper/2023/hash/6dcf277ea32ce3288914faf369fe6de0-Abstract-Conference.html)
- **代码链接**：[haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA)
- **作者 / 机构 / 年份**：Haotian Liu、Chunyuan Li、Qingyang Wu、Yong Jae Lee；University of Wisconsin–Madison、Microsoft Research、Columbia University；2023。
- **研究问题**：能否借助纯文本 GPT-4 合成高质量视觉指令数据，用非常简单的跨模态连接器获得开放式视觉对话与推理能力？
- **方法**：冻结 CLIP ViT-L/14，以单层线性投影把视觉网格特征映射到 Vicuna 词嵌入空间；先在过滤后的 CC3M 59.5 万图文对上对齐，再联合微调投影层与 LLM。作者用 COCO caption 和 bounding box 为文本 GPT-4 构造图片代理，共生成 15.8 万条对话、描述和复杂推理指令。
- **实验**：LLaVA-Bench (COCO) 中，无 instruction tuning 的相对分为 21.5，完整数据为 85.1，仅对话数据为 73.8；ScienceQA 单模型为 90.92%，与文本 GPT-4 judge 集成后为 92.53。前者依赖 GPT-4 评分，后者不是 LLaVA 单模型成绩。
- **结论**：视觉指令数据与两阶段对齐训练可以让轻量线性连接器产生强视觉对话能力；论文的关键贡献更多在数据构造和训练范式，而非复杂架构。
- **局限性**：核心聊天评测样本较小且依赖 GPT-4 judge，存在教师偏好循环；文本代理会丢失原图细节；原始 LLaVA 对高分辨率、小物体、知识密集和严格 grounding 任务能力有限。

### 论文 5：InternVL

- **文献链接**：[CVPR 2024 正式论文](https://openaccess.thecvf.com/content/CVPR2024/html/Chen_InternVL_Scaling_up_Vision_Foundation_Models_and_Aligning_for_Generic_CVPR_2024_paper.html)
- **代码链接**：[OpenGVLab/InternVL](https://github.com/OpenGVLab/InternVL)
- **作者 / 机构 / 年份**：Zhe Chen、Jiannan Wu、Wenhai Wang、Weijie Su、Guo Chen、Sen Xing、Muyan Zhong、Qinglong Zhang、Xizhou Zhu、Lewei Lu、Bin Li、Ping Luo、Tong Lu、Yu Qiao、Jifeng Dai；OpenGVLab / Shanghai AI Laboratory、Nanjing University、The University of Hong Kong、The Chinese University of Hong Kong、Tsinghua University、University of Science and Technology of China、SenseTime Research；2024。
- **研究问题**：当 LLM 已扩展到数十或数百亿参数时，能否同步扩展视觉编码器与跨模态中间层，构建兼顾视觉表征、检索、生成和对话的通用模型？
- **方法**：构建约 5.9B 参数 InternViT-6B，并以从多语言 LLaMA-7B 初始化的 8B QLLaMA 作为语言中间件；新增 cross-attention 与 96 个 queries 约 1B 参数。先在 4.98B 清洗图文对上训练对比表征，再以 1.03B 精选数据联合 contrastive、matching、generation，最后用约 400 万条指令数据连接 Vicuna/InternLM。
- **实验**：覆盖视觉感知、图文检索、caption、VQA 和聊天。完整 QLLaMA + Vicuna-13B 版本报告 MME 1586.4、POPE 87.6、VQAv2 81.2；同一 InternViT-6B 配轻量 MLP 时分别为 1546.9、87.1、80.2。论文也比较不同视觉规模和连接器。
- **结论**：同步扩展视觉编码器和语言中间件能改善多类视觉—语言任务，并让同一基础模型适配表征与生成两类范式。
- **局限性**：InternViT 与 QLLaMA 都很重，不能仅凭准确率证明计算效率；表 9 中带 `*` 的多项结果表示训练时见过相应标注，不能按严格 zero-shot 解读；该论文代表原始 InternVL，而非后续 InternVL2/2.5/3。

### 论文 6：GPT-4 Technical Report

- **文献链接**：[GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)；[OpenAI 官方研究页面](https://openai.com/index/gpt-4-research/)
- **代码链接**：未公开；模型仅通过产品/API 提供，报告未发布训练或推理代码。
- **作者 / 机构 / 年份**：OpenAI；OpenAI；2023。
- **研究问题**：大规模多模态生成模型能否在专业和学术基准上获得接近人类水平的表现，并通过可预测扩展和后训练提高可靠性与安全性？
- **方法**：将 GPT-4 描述为接收交错文本与图像、输出文本的 Transformer 类多模态模型，并使用 RLHF 后训练；出于竞争与安全考虑，报告不披露架构、参数规模、硬件、训练算力、数据构成及视觉连接方式。
- **实验**：报告大量考试、语言和安全结果；视觉能力主要以少量标准视觉基准和案例展示，缺少足以复现架构选择的视觉消融。其价值更像能力与风险报告，而不是开放的视觉方法配方。
- **结论**：同一大模型可以统一处理图文输入并表现出强通用能力，但报告无法支持“某个公开视觉组件导致该能力”的机制性结论。
- **局限性**：闭源披露使训练、复现和归因均不可行；模型仍会幻觉、犯推理错误并对提示敏感；标准视觉基准覆盖面窄，内部测试也无法独立审计。

### 论文 7：GPT-4V(ision) System Card

- **文献链接**：[GPT-4V(ision) System Card](https://openai.com/index/gpt-4v-system-card/)
- **代码链接**：未公开；该系统卡对应闭源部署模型，没有官方训练代码仓库。
- **作者 / 机构 / 年份**：OpenAI；OpenAI；2023。
- **研究问题**：当 GPT-4 接受图像输入并进入真实部署后，会出现哪些图像特有的安全、可靠性、隐私与人机交互风险，后训练能缓解到什么程度？
- **方法**：基于训练于公开网络、授权文本与图像等数据的 GPT-4V，结合 RLHF、内部评价、领域专家红队和 Be My Eyes 真实用户试点；重点检查人物识别、无依据推断、OCR、地理定位、医学、仇恨和多模态越狱。
- **实验**：截至 2023 年 9 月，Be My Eyes 测试约 1.6 万用户、每天约 2.5 万次描述。安全后训练后的内部评估中，非法建议与无依据人物推断拒绝率为 97.2% 和 100%，但正确且简洁的拒绝风格只有 72.2% 和 50%。专家还观察到漏字符、数学符号、空间/颜色错误、图像顺序敏感与医学回答不一致。
- **结论**：视觉能力必须与现实部署中的不确定性沟通、隐私保护、拒绝策略和人工回退一起评价；高拒绝率本身不等于可靠或良好交互。
- **局限性**：系统卡不是架构论文，内部数据、提示和模型快照不能独立复现；真实用户试点有选择偏差；报告不能覆盖所有文化语境和高风险行业，且明确不支持药方、过敏原或过马路等用途。

### 论文 8：GPT-4o System Card

- **文献链接**：[GPT-4o System Card](https://openai.com/index/gpt-4o-system-card/)
- **代码链接**：未公开；系统通过产品/API 提供，没有公开模型权重或训练代码。
- **作者 / 机构 / 年份**：OpenAI；OpenAI；2024。
- **研究问题**：用一个端到端 omni model 统一处理文本、视觉和音频后，会引入哪些新的跨模态安全风险，部署前应如何评估和缓解？
- **方法**：系统卡把 GPT-4o 描述为单一自回归神经网络，可接收文本、音频、图像和视频并生成文本、音频和图像；训练数据来自公开网络、合作授权和多模态数据，并结合安全后训练、红队和风险分类，但未披露网络结构、参数或 token 预算。
- **实验**：评估重点是 Preparedness Framework、外部红队、语音身份、非授权声音生成、说话人识别、音频越狱以及文本/视觉既有风险；公开结果主要支持上线安全边界，不构成视觉架构消融。
- **结论**：原生跨模态扩大了实时交互能力，也把安全边界从“看图回答”扩展到声音身份、情感表达和跨模态注入；系统层防护是模型能力的一部分。
- **局限性**：闭源报告无法复现能力来源；视觉与音频结果大量依赖内部协议，难与开放模型直接比较；系统卡侧重风险而非统一性能评测，不能用来判断某个视觉结构是否优于 Qwen、LLaVA 或 InternVL。

## 主要发现

### 1. 视觉指令数据让简单接口产生了强对话能力

LLaVA 的消融最能说明视觉指令微调的重要性：在 LLaVA-Bench (COCO) 上，不做 instruction tuning 的相对得分只有 21.5，完整三类指令数据达到 85.1；只保留对话数据则为 73.8。这里的分数由 GPT-4 裁判，并相对于“读取真实 caption 和 bounding box 的文本版 GPT-4”，不是绝对准确率，但同设置消融仍支持“数据类型影响大于连接器复杂度”的结论。

在 ScienceQA 上，LLaVA 单模型达到 90.92%，LLaVA + 文本 GPT-4 judge 达到 92.53%。后者是模型集成结果，不能写成 LLaVA 本身的成绩；而且论文发现 reasoning-first 主要加快收敛，最终准确率提升很小。

### 2. 第一代 Qwen-VL 证明“可定位、可读字”可以统一为文本生成

Qwen-VL 在 TextVQA、DocVQA、ChartQA 上分别报告 63.8、65.1、65.7，在 RefCOCO val 上为 89.36；这组结果支持其 OCR 与 grounding 设计确实有效。一个值得注意的反例是：Qwen-VL-Chat 在 VQAv2、OKVQA、GQA、TextVQA、DocVQA 等多项传统任务上略低于预训练版本，说明 SFT 提升人机对话并不保证保留所有基础能力。

固定 448×448 和固定 256 个视觉 token 仍构成明显瓶颈：小字、长文档、极端长宽比和视频都必须在有限视觉带宽中竞争。

### 3. InternVL 表明视觉侧扩展有效，但规模与数据重叠不能忽略

InternVL-Chat 使用完整 QLLaMA + Vicuna-13B 时，在论文表 9 报告 MME 1586.4、POPE 87.6、VQAv2 81.2；同一 InternViT-6B 配轻量 MLP 的版本为 MME 1546.9、POPE 87.1、VQAv2 80.2。论文的表征消融也显示，QLLaMA 相比 MLP 能明显改善部分 caption 和 VQA 指标，支持“大视觉编码器 + 重型中间件”路线。

但这不是免费的提升。InternViT 本身约 5.9B，QLLaMA 又约 8B；而表 9 中多个带 `*` 的结果表示相应训练标注在训练阶段已经见过，不能按严格 zero-shot 解读。论文主要证明这套视觉表征具备广泛适配性，不等于已证明其计算效率优于轻量接口。

### 4. Qwen2-VL 把“感知分辨率”和“语言推理”分成了两个瓶颈

Qwen2-VL-72B 在 DocVQA 为 96.5、OCRBench 为 877、RealWorldQA 为 77.8，论文中的 GPT-4o 对照分别为 92.8、736、75.4；但在更依赖综合推理的 MMMU 上，Qwen2-VL-72B 为 64.5，低于 GPT-4o 的 69.1。作者也明确指出 MMMU 的限制更像推理瓶颈，而不是继续增加图像分辨率即可解决。

动态分辨率消融同样没有显示“token 越多越好”：平均约 1924 个动态视觉 token 时 OCRBench 为 866，而固定 3136 token 时反而为 786；但后者在 InfoVQA 略高。M-RoPE 在大多数视频指标上提升更稳定，却在个别图像指标上持平或下降。合理结论是它们改善了效率—性能折中，而不是对所有任务单调增益。

在视觉 agent 上，Qwen2-VL 的函数调用 Type Match/Exact Match 为 93.1/53.2，对照 GPT-4o 为 90.2/50.0；但在视觉语言导航上，两者都明显落后于专用模型。通用视觉语言能力尚未自动转化为空间地图和长期行动能力。

### 5. Qwen3-VL 的“Thinking”不是所有视觉任务的默认最优解

Qwen3-VL-235B-A22B 的 Thinking 版在 MMMU 上为 80.6，高于 Instruct 的 78.7；但在 DocVQA 和 OCRBench 上，Instruct 反而以 97.1 和 920 高于 Thinking 的 96.5 和 875。复杂 STEM 推理需要思考预算，检索式 OCR/文档任务则可能被长推理拖累或扰动。

DeepStack 在相同内部 15B-A2B、200B token 预训练设置下，把 12 项平均分从 74.7 提高到 76.0；但 TextVQA 从 80.6 微降至 80.5，说明多层视觉注入是总体有效而非逐项必胜。

报告的 video needle-in-a-haystack 实验显示：256K 训练上下文内最高 30 分钟视频为 100%，经 YaRN 外推到约 1M token/2 小时仍为 99.5%。这个实验只测试能否找回一帧显著“针”，不能替代长视频因果理解、事件计数或跨段推理评价。

### 6. GPT 的最大价值之一，是把多模态失败模式带入部署评价

GPT-4V 的早期 Be My Eyes 测试到 2023 年 9 月已扩展到约 1.6 万名盲人和低视力用户、每天约 2.5 万次描述；真实用户同时暴露了 OCR 改进、幻觉和“以肯定语气描述不存在菜单项”等风险。系统卡明确建议不要用它读取药方、检查过敏原或辅助过马路。

专家红队发现 GPT-4V 会漏掉字符、数学符号、空间位置和颜色映射，同一医学影像问题也可能给出不一致回答；图像顺序还会改变建议。模型经安全后训练后，在内部评估中对非法建议和无依据人物推断的拒绝率分别达到 97.2% 和 100%，但“正确且简洁的拒绝风格”只有 72.2% 和 50%。这表明高拒绝率本身并不等于可靠、安全或良好交互。

GPT-4o 将视觉扩展为文本—图像—音频—视频的统一网络，但其系统卡重点仍是部署安全，尤其是语音；没有足够公开证据把性能提升归因于某个具体视觉结构。因此，开放模型论文可用于研究“怎么做”，GPT 系统卡更适合研究“上线时会出什么问题”。

### 7. 跨论文排行榜的可信度正在下降

这些论文跨越 2023-2025，使用的模型裁判、提示、图像分辨率、训练集、基准版本和闭源 API 快照均不同。LLaVA 的核心分数依赖 GPT-4 judge；InternVL 部分评测见过训练标注；Qwen2-VL 使用自建多语言 OCR 与函数调用集；Qwen3-VL 又加入更多自建、模型裁判和工具增强结果。表格里的数字适合支持论文内部消融，较不适合拼成统一总排名。

## 局限与适用边界

### 来源与版本局限

- **不是六篇同类型论文**：两篇为同行评审论文，三篇 Qwen 为技术报告/预印本，GPT 则是厂商报告与系统卡，披露深度显著不同。
- **家族代表不等于当前最好版本**：本文用原始 LLaVA 和原始 InternVL 解释各自路线的起点，没有覆盖 LLaVA-1.5/NeXT、InternVL2/2.5/3；实际选型不能直接依据本文早期指标。
- **Qwen 代际不连续**：Qwen3-VL 直接继承 Qwen2.5-VL，多处方法与 Qwen2.5 的改动被压缩在代际之间；因此不能把 Qwen1、2、3 的差异都归因于文中列出的单个组件。
- **GPT 不可复现**：架构、参数、训练预算和完整数据未公开，系统卡的内部评估也无法独立审计。

### 评价与有效性局限

- 训练集与测试集可能直接或间接重叠；网页、合成题、模型生成 caption 与公开 benchmark 的边界越来越难审计。
- GPT/强 VLM 既生成训练数据又担任裁判，存在教师偏好循环与风格偏差。
- 传统 VQA、OCR 和静态多选题无法充分评价幻觉校准、交互式行动、长视频因果关系和真实用户风险。
- 参数量、视觉 token 数、延迟、显存和吞吐量没有在统一硬件与输入预算下报告，不能从准确率表直接推断部署成本。
- 所有精确数字均来自论文或系统卡，本文没有重训模型，也没有复核数据污染。

## 我的思考

如果把这几条路线压缩成一条技术史，2023 年的核心问题是“**怎样让 LLM 看见并听懂视觉指令**”，2024 年变成“**怎样不丢失原始分辨率、空间和视频时间信息**”，到 2025 年则转向“**怎样让多模态模型长时间思考、调用工具并执行动作**”。

我认为下一阶段最值得关注的不是再做一个更长的综合榜单，而是四个更可证伪的问题：

1. **视觉必要性**：遮掉图片后仍能答对多少题？只有文本捷径失效的样本才真正测到多模态推理。
2. **证据接地**：答案能否同时返回可核验区域、帧、页码或工具轨迹，而不是只生成流畅理由？
3. **计算自适应**：动态视觉 token、thinking/non-thinking 和工具调用能否由不确定性触发，在准确率、延迟和成本之间自动路由？
4. **真实闭环**：GUI、机器人和辅助无障碍场景中，模型是否能在连续观察—行动—反馈下保持校准，并在失败时可靠交还给人？

从工程角度看，一套成熟 VLM 可能不会固定采用“最大图像分辨率 + 最长 CoT + 最大模型”，而会像 Qwen2/3 的方向那样动态分配视觉 token 和推理预算，同时借鉴 GPT-4V 的部署经验，为高风险输出增加证据检查、拒绝策略与人工回退。

## 参考文献

1. Bai, J., Bai, S., Yang, S., Wang, S., Tan, S., Wang, P., Lin, J., Zhou, C., & Zhou, J. (2023). *Qwen-VL: A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond*. arXiv:2308.12966. [全文与版本记录](https://arxiv.org/abs/2308.12966) · DOI：未分配/不可用。
2. Wang, P., Bai, S., Tan, S., Wang, S., Fan, Z., Bai, J., Chen, K., Liu, X., Wang, J., Ge, W., Fan, Y., Dang, K., Du, M., Ren, X., Men, R., Liu, D., Zhou, C., Zhou, J., & Lin, J. (2024). *Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution*. arXiv:2409.12191. [全文与版本记录](https://arxiv.org/abs/2409.12191) · DOI：未分配/不可用。
3. Qwen Team. (2025). *Qwen3-VL Technical Report*. arXiv:2511.21631. [全文与版本记录](https://arxiv.org/abs/2511.21631) · 出版状态：预印本 · DOI：未分配/不可用。
4. Liu, H., Li, C., Wu, Q., & Lee, Y. J. (2023). *Visual Instruction Tuning*. Advances in Neural Information Processing Systems, 36. [NeurIPS 正式页面](https://proceedings.neurips.cc/paper_files/paper/2023/hash/6dcf277ea32ce3288914faf369fe6de0-Abstract-Conference.html) · [DOI:10.52202/075280-1516](https://doi.org/10.52202/075280-1516)。
5. Chen, Z., Wu, J., Wang, W., Su, W., Chen, G., Xing, S., Zhong, M., Zhang, Q., Zhu, X., Lu, L., Li, B., Luo, P., Lu, T., Qiao, Y., & Dai, J. (2024). *InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks*. Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 24185-24198. [CVF 正式页面](https://openaccess.thecvf.com/content/CVPR2024/html/Chen_InternVL_Scaling_up_Vision_Foundation_Models_and_Aligning_for_Generic_CVPR_2024_paper.html) · DOI：未在 CVF 记录中提供。
6. OpenAI. (2023). *GPT-4 Technical Report*. arXiv:2303.08774. [官方研究页面](https://openai.com/index/gpt-4-research/) · [arXiv 全文](https://arxiv.org/abs/2303.08774) · DOI：未分配/不可用。
7. OpenAI. (2023). *GPT-4V(ision) System Card*. [官方页面与全文](https://openai.com/index/gpt-4v-system-card/) · 出版类型：系统卡 · DOI：未分配/不可用。
8. OpenAI. (2024). *GPT-4o System Card*. [官方页面与全文](https://openai.com/index/gpt-4o-system-card/) · 出版类型：系统卡 · DOI：未分配/不可用。
