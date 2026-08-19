---
title: "视觉编码器与跨模态接口演进：从 ViT、CLIP、BLIP 到 SigLIP 2"
date: 2026-08-18
permalink: /posts/visual-encoder-evolution-vit-clip-siglip2/
tags: [literature-note, vision-transformer, clip, blip, blip2, q-former, siglip, siglip2, visual-encoder]
note_type: topic-synthesis
literature_topics: [vlm, visual-representation]
---

> **阅读范围**：全文阅读 ViT、CLIP、BLIP、BLIP-2、SigLIP 与 SigLIP 2 的主文和相关附录，并核验正式会议页面、arXiv 版本及官方代码。  
> **检索日期**：2026-08-18。  
> **主题**：视觉系统如何从“把图像表示为 patch token”，演进为开放词汇编码器、统一理解/生成模型，以及连接冻结视觉塔与 LLM 的跨模态接口？

## 核心结论

这六篇论文不是一条简单的单向版本链，而是从 ViT/CLIP 分出两条互补路线：

1. **ViT 解决输入表示**：图像被切成 patch token，标准 Transformer 可以成为视觉骨干，但大规模数据是弥补弱视觉归纳偏置的关键。[ViT 原文](https://openreview.net/forum?id=YicbFdNTTy)
2. **CLIP 解决语言监督与开放接口**：图像塔和文本塔通过 batch 对比目标进入共享空间，类别文本可在推理时生成零样本分类器。[CLIP 正式论文](https://proceedings.mlr.press/v139/radford21a.html)
3. **BLIP 解决理解与生成的架构割裂**：MED 在同一主体中切换双塔对齐、跨模态匹配和因果生成；CapFilt 再用模型生成、过滤网页描述。[BLIP 正式论文](https://proceedings.mlr.press/v162/li22n.html)
4. **BLIP-2 解决冻结单模态模型之间的接口问题**：Q-Former 先从冻结视觉塔提炼 32 个语言相关 queries，再把它们映射为冻结 LLM 的视觉软提示。[BLIP-2 正式论文](https://proceedings.mlr.press/v202/li23q.html)
5. **SigLIP 解决损失与分布式训练耦合**：把 batch-softmax 改为独立 pairwise sigmoid，使小 batch 更强、分块执行更简单；但所有图文 pair 的二次计算仍然存在。[SigLIP 正式论文](https://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html)
6. **SigLIP 2 解决编码器能力维度不足**：在保留 SigLIP 推理双塔的同时，用定位 decoder、自蒸馏、masked prediction、多语言数据和 NaFlex，把整图语义扩展到区域、稠密特征和原生宽高比。[SigLIP 2 原文](https://arxiv.org/abs/2502.14786)

一句话概括：**ViT 让图像成为 token；CLIP 让图像和文字进入同一空间；BLIP 让同一主体兼顾理解与生成；BLIP-2 让少量查询成为冻结视觉塔与 LLM 的接口；SigLIP/SigLIP 2 则沿编码器分支继续改进训练系统与局部、稠密表征。**

```text
ViT ──→ CLIP ──→ SigLIP ──→ SigLIP 2
  │        │       全局编码器、检索与开放词汇分支
  │        └──→ BLIP ──→ BLIP-2
  │                理解/生成统一与跨模态连接器分支
  └──────── patch-token 视觉接口
```

## 检索记录

- **数据源**：Google Research、OpenReview、ICML/PMLR、CVF Open Access、IEEE DOI、arXiv、OpenAI、Salesforce 与 Google Research 官方代码仓库。
- **核心检索式**：
  - `An Image is Worth 16x16 Words ICLR Vision Transformer`
  - `Learning Transferable Visual Models natural language supervision PMLR CLIP`
  - `BLIP Bootstrapping Language-Image Pre-training ICML PMLR`
  - `BLIP-2 frozen image encoders large language models PMLR Q-Former`
  - `Sigmoid Loss for Language Image Pre-Training ICCV SigLIP`
  - `SigLIP 2 multilingual localization dense features arXiv`
- **纳入标准**：指定路线的核心论文；可获得全文；能核验作者、出版状态、代码与关键实验。
- **版本状态**：ViT 为 ICLR 2021，CLIP 为 ICML 2021，BLIP 为 ICML 2022，BLIP-2 为 ICML 2023，SigLIP 为 ICCV 2023，均已同行评审；SigLIP 2 截至检索日仍按 arXiv v1 预印本处理。
- **检索性质**：围绕指定论文的定向技术脉络梳理，不是系统综述，也不以引用量替代证据质量。

## 研究背景

视觉模型长期围绕卷积网络建立：局部卷积和平移等变给小数据带来强先验，却让架构与 NLP 的通用 Transformer 分离。VLM 的发展需要一个统一接口——图像既要能被 Transformer 处理，又要能通过自然语言调用，还要在下游保留文字、区域、空间和高分辨率细节。

六篇论文共同覆盖从“表示”到“监督”、从“理解/生成接口”到“训练系统与能力覆盖”的演进，但 BLIP 与 SigLIP 两支不应被解释为谁取代谁：

| 阶段 | 主要改动 | 学到的核心能力 | 主要遗留问题 |
|---|---|---|---|
| ViT | 图像 patch 化 + Transformer Encoder | 大规模视觉迁移 | 小数据弱、高分辨率 token 成本高、仍是固定标签监督 |
| CLIP | 图像/文本双塔 + 对称 softmax | 开放词汇、零样本分类、检索 | 大 batch 耦合、提示敏感、只有全局对齐 |
| BLIP | MED + ITC/ITM/LM + CapFilt | 统一理解/生成、数据自举 | 仍需联合训练大主体，生成与过滤可能共享偏差 |
| BLIP-2 | 冻结视觉塔/LLM + 32-query Q-Former | 参数高效视觉软提示、零样本生成 | 总模型仍大，固定瓶颈可能丢失细节与稠密结构 |
| SigLIP | pairwise sigmoid + 分块执行 | 小 batch 与系统扩展性 | 仍计算大量 pair，定位/稠密能力不足 |
| SigLIP 2 | LocCa + 自蒸馏/遮蔽 + 多语 + NaFlex | 多语言、定位、稠密特征、原生宽高比 | 多组件难归因、训练数据与算力难复现 |

## 研究问题

本文用同一组问题重新阅读六篇论文：

1. 图像以什么 token 形式进入 Transformer？
2. 视觉语义来自固定标签、自然语言对齐，还是局部自监督？
3. 训练目标怎样定义正负样本，并对 batch、通信和显存产生什么约束？
4. pooled 全局表示能否同时服务 OCR、区域定位、深度与分割？
5. 论文的最高分究竟支持架构结论，还是混合了数据、算力和训练 recipe？
6. 视觉表示应作为可独立检索的 embedding、跨模态融合状态，还是供 LLM 消费的视觉软提示？

## 方法与数据

### 一、ViT：把二维图像转换为标准 token 序列

![ViT 的 patch-token 架构](/images/literature-notes/vit/method-overview.png)

*图 1｜ViT 将图像切成 patch，经线性投影、位置编码和 `[class]` token 后输入标准 Encoder。来源：ViT Figure 1，PDF 第 3 页。[原文](https://arxiv.org/pdf/2010.11929)*

给定 $H\times W\times C$ 图像和 patch 边长 $P$，序列长度为：

$$
N=\frac{HW}{P^2}.
$$

ViT 的方法贡献十分克制：除 patch embedding、位置编码与分类 token 外，编码器基本沿用 NLP Transformer。论文最重要的受控证据是，小数据时 ResNet 更强，预训练数据达到约 90M 以上后 ViT 的扩展优势才逐渐显现。[ViT Figures 3–5](https://arxiv.org/pdf/2010.11929)

这为后续双塔提供了视觉接口，但 ViT 本身仍在 ImageNet/JFT 固定标签上学习；它不知道“dog”这个文本 token 与某个视觉方向应当对应。

### 二、CLIP：用文本生成开放词汇分类器

![CLIP 对比预训练和零样本分类](/images/literature-notes/clip/method-overview.png)

*图 2｜CLIP 学习 batch 内图文配对；推理时把类别写成提示，文本向量即分类器权重。来源：CLIP Figure 1，PMLR PDF 第 2 页。[原文](https://proceedings.mlr.press/v139/radford21a/radford21a.pdf)*

CLIP 对图像与文本向量做 L2 归一化，形成 $N\times N$ 相似度矩阵，再对图像到文本、文本到图像两个方向计算交叉熵：

$$
\mathcal L_{\mathrm{CLIP}}
=\frac12\left[
CE(S,\mathrm{diag})+CE(S^\top,\mathrm{diag})
\right].
$$

训练数据 WIT 含 4 亿网络图文对；数据没有公开。推理时，`A photo of a {label}.` 等模板经过文本塔得到类别向量，图像按余弦相似度分类。80 个模板集成可在 ImageNet 上较单一裸类别名累计提升接近 5 个百分点，这说明零样本接口仍包含显著人工设计。[CLIP Supplement Figure 13](https://proceedings.mlr.press/v139/radford21a/radford21a-supp.pdf)

### 三、BLIP：让同一主体承担对齐、融合与生成

![BLIP 的多模态混合编码器—解码器](/images/literature-notes/blip/method-overview.png)

*图 3｜BLIP 的 MED 分别以 unimodal encoder、image-grounded encoder 和 causal decoder 运行，联合优化 ITC、ITM 与 LM；文本 encoder/decoder 共享 cross-attention 与 FFN，但保留不同 self-attention。来源：BLIP Figure 2，PMLR PDF 第 2 页。[原文](https://proceedings.mlr.press/v162/li22n/li22n.pdf)*

CLIP 的双塔表示适合大规模检索，却不能直接进行细粒度融合或自回归描述。BLIP 的 MED 用三种运行路径解决这一点：

$$
\mathcal L_{\mathrm{BLIP}}
=\mathcal L_{\mathrm{ITC}}
+\mathcal L_{\mathrm{ITM}}
+\mathcal L_{\mathrm{LM}}.
$$

ITC 保留双塔对齐，ITM 通过 cross-attention 判断图文是否匹配，LM 则以图像为条件生成文本。更重要的是，BLIP 没把网页文本噪声只当作数据规模问题：CapFilt 从预训练模型分出 captioner 和 filter，前者为网页图像生成新描述，后者独立过滤原始与合成文本，再用清洗语料重新训练。[BLIP §3](https://proceedings.mlr.press/v162/li22n/li22n.pdf)

这条路线与 CLIP/SigLIP 双塔并不冲突。BLIP 的理解路径本身包含对比表征；它增加的是融合和生成能力，以及“模型反过来改造数据”的闭环。代价是每个图文对需要多种文本前向，CapFilt 也可能把 captioner/filter 共有的偏差写回下一轮语料。

### 四、BLIP-2：把可训练完整模型改成冻结双端之间的桥

![BLIP-2 的 Q-Former 第一阶段](/images/literature-notes/blip2/qformer-stage1.png)

*图 4｜Q-Former 用 32 个 learnable queries 从冻结图像特征中提炼信息；ITC、ITM、ITG 通过三种 attention mask 分别约束全局对齐、融合匹配与条件生成。来源：BLIP-2 Figure 2，PMLR PDF 第 3 页。[原文](https://proceedings.mlr.press/v202/li23q/li23q.pdf)*

BLIP-2 不再联合训练完整视觉—语言主体，而把跨模态学习拆成两阶段：

1. 冻结 CLIP ViT-L/14 或 EVA-CLIP ViT-g/14，训练 Q-Former；32 个 queries 经 cross-attention 从图像 tokens 中提取与文字相关的固定长度表示。
2. 冻结视觉塔和 OPT/FlanT5，将 queries 经全连接层投影为 LLM 的 soft visual prompts，只训练桥接路径。

第一阶段仍继承 BLIP 的 ITC/ITM/生成目标，但把它们集中到桥接器。Figure 5 显示，若省略这一阶段，仅靠后续 language-modeling loss 对齐，OPT 和 FlanT5 的零样本 VQA 都显著退化。[BLIP-2 Figure 5](https://proceedings.mlr.press/v202/li23q/li23q.pdf)

BLIP-2 的关键抽象是：视觉 token 不必全部进入 LLM，上游可先产生少量“语言可读”的查询。但这种效率以选择性丢弃为代价；论文没有系统检验 OCR、小物体、定位和稠密预测。它也只减少预训练时可更新参数，最大模型仍有约 12.1B 总参数，不能把“54× fewer trainable parameters”改写成推理成本降低 54 倍。

### 五、SigLIP：把全局 softmax 改成独立 pair 判别

![SigLIP 的分块 sigmoid 损失](/images/literature-notes/siglip/method-overview.png)

*图 5｜独立 pair loss 允许文本 embedding 在设备间循环置换，单次只保留局部 $b\times b$ loss matrix。来源：SigLIP Figure 1，PDF 第 3 页。[原文](https://arxiv.org/pdf/2303.15343)*

SigLIP 不改变双塔表示，而将每个图文组合写为二分类：

$$
s_{ij}=t x_i^\top y_j+b,
\qquad
\mathcal L_{\mathrm{SigLIP}}
=-\frac1B\sum_{i,j}\log\sigma(z_{ij}s_{ij}).
$$

匹配 pair 的 $z_{ij}=+1$，其余为 $-1$。初始 bias $b=-10$ 用来抵消负例数量远多于正例的先验。由于每项彼此独立，设备可逐块累计，不必对整个 batch 共同 softmax；但 $B^2$ 个组合依然存在。[SigLIP §3](https://arxiv.org/pdf/2303.15343)

### 六、SigLIP 2：训练时增加局部监督，推理时仍保留双塔

![SigLIP 2 多目标训练配方](/images/literature-notes/siglip2/method-overview.png)

*图 6｜SigLIP 2 在原双塔外加入 LocCa decoder、EMA 教师、自蒸馏和 masked prediction；这些辅助分支不进入标准推理。来源：SigLIP 2 Figure 1，PDF 第 2 页。[原文](https://arxiv.org/pdf/2502.14786)*

SigLIP 2 使用 WebLI 的 10B 图像、12B alt-text、109 种语言，主要训练约 40B seen examples。它在全程加入 captioning、区域 caption 与 referring-expression decoder，并在最后 20% 训练加入 local-to-global 自蒸馏和 50% masked-patch prediction。NaFlex 版本进一步保留原生宽高比，在预设 token-length 集合中训练一个可变预算 checkpoint。[SigLIP 2 §2](https://arxiv.org/pdf/2502.14786)

这是一种“训练时加法、部署时减法”：辅助任务负责塑造 patch 表征，发布时仍可把模型当作常规 SigLIP image encoder 使用。

## 实验

六篇论文的数字不能直接排成单一排行榜：ViT 是监督分类；CLIP/SigLIP 使用不同私有图文数据与训练预算；BLIP/BLIP-2 混合检索、生成和 VQA，并复用不同视觉/语言骨干；SigLIP 2 又增加多目标和数据策展。更有意义的是看每篇论文内部的对照回答了什么。

| 论文 | 最有解释力的内部证据 | 支持的结论 | 不能推出的结论 |
|---|---|---|---|
| ViT | JFT 9M→300M、ResNet/ViT 受控计算曲线 | 数据规模可补偿弱视觉先验 | ViT 在所有数据规模都优于 CNN |
| CLIP | 27 数据集零样本差值、prompt 消融、自然分布偏移 | 语言监督可产生开放词汇迁移 | 对计数、医学或安全场景普遍可靠 |
| BLIP | 14M 下 captioner/filter、共享层与训练量控制 | MED 可兼顾理解/生成，CapFilt 的增益不只是训练更久 | 最大模型的全部提升都来自 CapFilt |
| BLIP-2 | 有/无第一阶段表示学习；同 LLM 更换视觉塔 | 两阶段桥接优于只做生成对齐，强骨干可模块化复用 | 少 trainable params 等于少 total params/低推理成本 |
| SigLIP | 固定 seen examples 的 batch 扫描 | sigmoid 在小 batch 更好，约 32k 饱和 | 分块后计算复杂度变成线性 |
| SigLIP 2 | SigLIP 同尺度对照、dense/localization 与 frozen-VLM 迁移 | 完整 recipe 扩展局部与稠密能力 | 每项提升都由某一个新增组件造成 |

### 代表性结果与反例

- **ViT**：JFT-300M 预训练的 ViT-H/14 报告 88.55% ImageNet，但小数据区间大型 ViT 反而更容易过拟合。[ViT Table 2、Figures 3–4](https://arxiv.org/pdf/2010.11929)
- **CLIP**：最佳模型报告 76.2% ImageNet 零样本；在 27 数据集中 16 项超过 ResNet-50 线性探测，却在 EuroSAT、KITTI Distance、CLEVR counting 等任务大幅落后。[CLIP Figure 4](https://proceedings.mlr.press/v139/radford21a/radford21a.pdf)
- **BLIP**：14M、ViT-B 下，CapFilt 将 COCO text/image retrieval Recall@1 从 78.4/60.7 提至 80.6/63.1；把原文本简单复制到相同 seen-text 数量没有带来增益，支持数据质量而非训练量解释。[BLIP Table 1、Appendix Table 12](https://proceedings.mlr.press/v162/li22n/li22n.pdf)
- **BLIP-2**：ViT-g + FlanT5-XXL 的零样本 VQAv2 为 65.0，高于 Flamingo-80B 的 56.3；但 OK-VQA 为 45.9，低于 Flamingo 的 50.6。强视觉理解不等于开放世界知识全面领先。[BLIP-2 Table 2](https://proceedings.mlr.press/v202/li23q/li23q.pdf)
- **SigLIP**：小于约 16k batch 时 sigmoid 优势明显，约 32k 后两种目标均趋于饱和；多语言检索在继续放大 batch 后下降。[SigLIP Figure 2](https://arxiv.org/pdf/2303.15343)
- **SigLIP 2**：B/16、256 输入的 ImageNet 零样本由 76.7% 提至 79.1%，RefCOCO val 由 64.05 提至 83.76；但同条件多语言检索仍略低于专门 mSigLIP。[SigLIP 2 Tables 1、5](https://arxiv.org/pdf/2502.14786)

## 主要发现

### 1. “视觉 token”经历了多次角色升级

ViT token 最初服务监督分类；CLIP/SigLIP 让 pooled image token 与语言共享空间；BLIP 让视觉 token 同时进入融合 encoder 和生成 decoder；BLIP-2 再把长视觉序列压成 32 个供 LLM 消费的 query tokens；SigLIP 2 则通过区域语言和自监督，让未池化 patch token 保留可用于定位和稠密预测的结构。现代 VLM 视觉前端的价值不能只看 ImageNet 或 retrieval 单分数。

### 2. 架构、目标与数据不能混为一谈

ViT 的扩展优势依赖 JFT；CLIP 的开放词汇来自 4 亿 WIT；BLIP/BLIP-2 依赖 14M/129M 图文数据、CapFilt 及已有 CLIP/BLIP 教师；SigLIP 模型结果依赖 WebLI 和数十亿 seen examples；SigLIP 2 又加入 40B examples 与多组件 recipe。跨代提升是真实工程结果，却不是单因素因果实验。

### 3. 压缩接口与稠密表征追求不同目标

CLIP/SigLIP 可以学到强整图语义，却在计数、空间和区域任务留下缺口。BLIP-2 的 32 queries 追求让 LLM 高效获得“最相关的语言信息”；SigLIP 2 则追求让 patch tokens 保留区域和稠密结构。前者适合紧凑语义桥接，后者更适合 OCR、定位、分割和深度等不能任意丢信息的任务。SigLIP 2 的大幅 referring-expression 与 dense 提升，反过来说明这些能力需要显式 patch-level 或区域语言监督。

### 4. BLIP-2 与 SigLIP 2 是正交选择，不是代际替代

BLIP-2 的问题是“怎样让冻结 LLM 读懂视觉塔”，SigLIP 2 的问题是“怎样训练一个更全面、仍可独立使用的视觉—文本编码器”。实际系统可以用 SigLIP 2 类视觉塔，再接 Q-Former、投影器或其他连接器；也可以在只需检索时完全绕过 LLM。把两者排成单一排行榜会掩盖接口与表征目标的差异。

### 5. 扩展性包括系统结构，而不只是参数量

BLIP 通过共享文本层避免为理解/生成维护完全分离模型；BLIP-2 冻结双端、把训练集中到接口；SigLIP 的贡献主要发生在损失执行，更容易 chunk、更少全局同步、小 batch 更强；SigLIP 2 则在 inference-compatible 前提下把高成本辅助分支限制在训练期。四者都表明，基础模型 recipe 必须同时设计数学目标、数据流和部署接口。

## 局限与适用边界

- 六篇论文使用不同数据、硬件、训练步数、骨干和评价协议，本文不把原始分数做未经控制的代际排名。
- ViT 的最佳 JFT 数据、CLIP 的 WIT、BLIP/BLIP-2 的 129M 数据混合，以及 SigLIP/SigLIP 2 的 WebLI 与策展流程都不能被外部完整审计。
- BLIP 的 captioner 与 filter 源于同一 MED，可能把相关错误写回语料；BLIP-2 又依赖 BLIP captioner 与 CLIP 排序，数据自举并非独立事实验证。
- BLIP-2 的“冻结”和“少参数”只精确描述预训练阶段及 trainable-parameter 口径；caption/VQA/retrieval 微调会解冻视觉塔，完整推理模型仍需加载数十亿参数。
- ViT、CLIP 和 SigLIP 的原始目标主要产生全局表示；BLIP-2 又主动压缩为固定 queries。即使 SigLIP 2 加入局部目标，也不等于已解决开放场景中的组合推理与细粒度可靠性。
- CLIP/SigLIP 的网络数据会继承语言、地域、版权与群体偏差；SigLIP 2 的有限公平性改善不能代表部署已经公平。
- BLIP-2 作者已展示知识错误、错误推理路径与信息过时案例；冻结 LLM 保留知识能力的同时，也冻结了知识缺口并继承偏见、冒犯输出和隐私风险。
- SigLIP 2 截至检索日仍是预印本，且多组件同时变化，独立复现和精确归因证据弱于其余五篇同行评审论文。
- patch token 数随分辨率增长，高分辨率文档和视频仍需动态 token、稀疏注意力或压缩策略；NaFlex 只解决一部分输入几何问题。

## 我的思考

选择视觉编码器时，应先问下游需要哪一种视觉信息，而不是只问哪个模型更新：

- 研究 patch 架构或监督迁移，ViT 是最清楚的起点；
- 需要成熟、广泛支持的开放词汇嵌入，CLIP 仍是重要基线；
- 需要同一主体覆盖检索、匹配与 caption，并研究数据自举，BLIP 提供清晰的三目标基线；
- 需要复用冻结视觉塔和 LLM、快速构建生成式 VLM，BLIP-2/Q-Former 是重要连接器基线，但不应把 32 queries 当成无损视觉表示；
- 关注分布式预训练效率和较小 batch，SigLIP 的目标更合适；
- VLM、OCR、区域定位、文档和稠密视觉，SigLIP 2 的训练信号更贴近需求，但需接受预印本与复现边界。

更长远看，视觉系统不会只追求一个更强 pooled vector，也不能只追求尽可能少的视觉 prompts。多模态 agent 同时需要“这是什么”“在哪里”“各 patch 如何关联”“哪些证据值得送入 LLM”。编码器分支负责保留可复用视觉结构，连接器分支负责按语言任务读取这些结构；现代 VLM 的关键设计空间正位于两者之间。

## 参考文献

1. Dosovitskiy, A., et al. (2021). *An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale*. ICLR. [OpenReview](https://openreview.net/forum?id=YicbFdNTTy) · [代码](https://github.com/google-research/vision_transformer)
2. Radford, A., et al. (2021). *Learning Transferable Visual Models From Natural Language Supervision*. ICML, PMLR 139. [正式页面](https://proceedings.mlr.press/v139/radford21a.html) · [代码](https://github.com/openai/CLIP)
3. Li, J., Li, D., Xiong, C., & Hoi, S. C. H. (2022). *BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation*. ICML, PMLR 162. [正式页面](https://proceedings.mlr.press/v162/li22n.html) · [代码](https://github.com/salesforce/BLIP)
4. Li, J., Li, D., Savarese, S., & Hoi, S. (2023). *BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models*. ICML, PMLR 202. [正式页面](https://proceedings.mlr.press/v202/li23q.html) · [代码](https://github.com/salesforce/LAVIS/tree/main/projects/blip2)
5. Zhai, X., Mustafa, B., Kolesnikov, A., & Beyer, L. (2023). *Sigmoid Loss for Language Image Pre-Training*. ICCV. [CVF](https://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html) · [DOI](https://doi.org/10.1109/ICCV51070.2023.01100)
6. Tschannen, M., et al. (2025). *SigLIP 2: Multilingual Vision-Language Encoders with Improved Semantic Understanding, Localization, and Dense Features*. arXiv:2502.14786. [原文](https://arxiv.org/abs/2502.14786) · [代码与权重](https://github.com/google-research/big_vision/blob/main/big_vision/configs/proj/image_text/README_siglip2.md)

### 延伸精读

- [ViT 单篇精读](/posts/vit/)
- [CLIP 单篇精读](/posts/clip/)
- [BLIP 单篇精读](/posts/blip/)
- [BLIP-2 单篇精读](/posts/blip2/)
- [SigLIP 单篇精读](/posts/siglip/)
- [SigLIP 2 单篇精读](/posts/siglip2/)
