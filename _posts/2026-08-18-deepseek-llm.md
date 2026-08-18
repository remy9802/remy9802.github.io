---
title: "文献笔记｜DeepSeek LLM：从数据工程与缩放律到 7B/67B 中英双语基座"
date: 2026-08-18
permalink: /posts/deepseek-llm/
tags: [literature-note, deepseek, llm, scaling-law, pretraining, alignment]
note_type: single-paper
literature_topics: [llm]
---

> **阅读范围**：arXiv v1 技术报告全文 48 页（含附录、模型卡与全部表格），并核对 arXiv 元数据和 DeepSeek 官方仓库。<br>
> **检索日期**：2026-08-18。<br>
> **一句话判断**：DeepSeek LLM 的核心不是单个榜单名次，而是把自建中英数据、计算最优缩放律和 7B/67B 训练连成一条可检验路线；论文证明该配方在其内部数据分布上有效，却没有公开完整语料、总 GPU 小时或训练代码，因此不能把拟合出的指数当成普适定律。

## 文献档案

- **论文**：*DeepSeek LLM: Scaling Open-Source Language Models with Longtermism*
- **文献链接**：[arXiv:2401.02954](https://arxiv.org/abs/2401.02954) · [PDF](https://arxiv.org/pdf/2401.02954) · [arXiv DataCite DOI](https://doi.org/10.48550/arXiv.2401.02954)
- **官方项目 / 模型链接**：[deepseek-ai/DeepSeek-LLM](https://github.com/deepseek-ai/DeepSeek-LLM)
- **代码开放边界**：官方仓库提供 7B/67B Base/Chat 权重入口、推理示例和评测脚本；它**不是**论文所用 HAI-LLM 预训练平台的完整源码，也未提供数据清洗、预训练和 SFT/DPO 全流水线。故本文将其称为“官方项目与模型仓库”，不称“完整训练代码”。
- **作者**：DeepSeek-AI（Xiao Bi 等；论文说明作者按姓氏字母顺序排列，完整 86 人名单以 [arXiv 元数据](https://arxiv.org/abs/2401.02954) 和 PDF 首页为准）
- **机构 / 年份**：DeepSeek-AI；2024
- **出版状态**：arXiv v1，2024-01-05 提交；截至检索日未核到独立的会议/期刊正式版本。10.48550/arXiv.2401.02954 是 arXiv 记录 DOI，不是同行评审 venue DOI。

## 核心结论

DeepSeek LLM 试图回答一个比“再训练一个 7B/70B 模型”更基础的问题：在自建中英语料上，给定计算预算时应该怎样选择模型规模、训练 token 数、批量和学习率？作者先用小模型与多个计算预算做 IsoFLOP 拟合，再按预测配置训练 7B 与 67B 模型，每个都消费 2T token。其拟合结果倾向于比 Chinchilla 更快地增加模型 FLOPs、较慢地增加数据量；但论文也通过更换数据分布展示了缩放指数会变化，因此最严谨的读法是“这是 DeepSeek 数据—架构—优化器组合下的经验规律”，而不是新的通用常数。

模型结果显示，DeepSeek LLM 67B 在论文协议下的 MMLU、数学与代码任务强于 LLaMA 2 70B，但在部分阅读理解/常识任务上并不占优。SFT 和 DPO 又显著改变模型行为：开放问答和数学代码提高，同时 HellaSwag、CLUEWSC 等基座榜单下降。论文因此同时提供了“预训练能力增益”和“对齐税”的证据，不支持“Chat 在所有能力上单调优于 Base”的简单叙述。

训练成本证据是不完整的。论文描述了 BF16、FlashAttention、ZeRO-1、张量/流水并行等系统设计，却没有给出 GPU 型号、数量、墙钟时间或 7B/67B 总 GPU 小时。任何关于 DeepSeek LLM 只花费某个美元数的说法，都不能由本论文推出。

## 检索记录

- **入口与查询**：题名 exact match、arXiv 2401.02954、DeepSeek-AI 官方组织及官方仓库。
- **一手来源**：arXiv v1 全文、arXiv 版本页、官方 GitHub；模型指标与训练数字均回到 PDF 正文/附录表格核对。
- **全文状态**：48/48 页已读；覆盖数据处理、缩放实验、预训练、SFT/DPO、评测、风险和模型卡。
- **版本 / venue 核验**：arXiv 仅 v1；未把 arXiv DOI 误写成期刊 DOI。
- **代码核验**：区分了模型权重、推理/评测样例与未公开的训练平台 HAI-LLM。
- **图表核验**：下列两图由官方 arXiv PDF 裁取，保持原论文 Figure 4、Figure 5 的坐标和图例；未使用二手重绘。

## 研究背景

Kaplan 等人的缩放律指出损失随参数、数据与计算呈幂律下降；Chinchilla 随后主张，在固定 FLOPs 下模型参数量与训练 token 应近似等比例扩张。问题在于，指数并不只由“语言建模”决定，还受 tokenizer、数据质量、模型定义和计算口径影响。与此同时，2023 年主流开放基座主要面向英语，中文训练量和双语清洗细节不足。

DeepSeek LLM 的切入点有三层：第一，建立覆盖中文和英文的 2T-token 自有语料；第二，用 non-embedding FLOPs 作为模型规模，重新估计计算最优分配；第三，用同一数据和架构路线训练可开放的 7B/67B Base，再用监督微调与偏好优化得到 Chat。它由此成为后续 DeepSeek-V2/V3 稀疏路线的密集基线。

## 研究问题

1. 对 DeepSeek 的中英数据分布，最优 batch size、学习率、模型 FLOPs 与 token 数如何随计算预算变化？
2. 小规模实验拟合的规律能否外推到约千倍计算量的 7B/67B 训练？
3. 自建 2T-token 双语数据和训练配方能否让 67B 密集模型达到同期强开源基座水平？
4. 1.5M 指令数据和 DPO 如何改变帮助性、安全性与基础能力？
5. 哪些结果是架构/数据可归因的受控证据，哪些只是整套训练配方的联合结果？

## 方法与数据

### 1. 数据工程与 tokenizer

预训练语料约 **2T token**，主要为中文和英文。流水线包括 URL/文档级去重、规则与模型过滤、内容重组和质量控制。一个能说明去重尺度的结果是：在 91 个 Common Crawl dump 上做全局去重会删除 89.8% 文档，而单个 dump 内去重仅删除 22.2%；这提示网页重复会被跨时间抓取显著放大。[原论文 §2.1、Table 1](https://arxiv.org/pdf/2401.02954#page=4)

tokenizer 为 byte-level BPE：先在 24GB 多语言语料上训练 100,015 词表，实际训练词表扩展到 102,400。论文没有公开语料清单、每一来源的 token 占比、去污染命中记录或清洗器权重，所以无法独立审计版权、隐私和 benchmark 泄漏。

### 2. 计算口径与缩放律

传统近似把总训练计算写成 \(C\approx6ND\)，其中 \(N\) 是参数量、\(D\) 是 token 数。作者认为 embedding、词表和稀疏结构会使参数量口径失真，改用每 token 的非 embedding 前后向 FLOPs \(M\)：

$$
C=M D.
$$

在 \(10^{17}\) 到 \(2\times10^{19}\) FLOPs 的小预算实验上，作者搜索最优 batch size \(B\) 和峰值学习率 \(\eta\)，得到经验式：

$$
\eta_{\mathrm{opt}}=0.3118\,C^{-0.1250},\qquad
B_{\mathrm{opt}}=0.2920\,C^{0.3271}.
$$

随后在八个 \(10^{17}\) 至 \(3\times10^{20}\) FLOPs 预算上，每个预算训练约十组模型—数据分配，并用独立 100M-token 验证集找 IsoFLOP 最低点。最终拟合：

$$
M_{\mathrm{opt}}=0.1715\,C^{0.5243},\qquad
D_{\mathrm{opt}}=5.8316\,C^{0.4757}.
$$

两个指数和为 1，是因为 \(C=MD\)。它意味着在本文范围内，算力增加时最优模型计算略快于数据量增长。论文 Table 4 又显示，改换数据质量后指数会发生变化；因此不能脱离语料分布复用系数和指数。[原论文 §3](https://arxiv.org/pdf/2401.02954#page=8)

![DeepSeek LLM 的计算最优分配](/images/literature-notes/deepseek-llm/scaling-allocation.png)

*图 1｜在不同计算预算下，作者对多组模型 FLOPs—训练 token 分配做二次拟合，取验证损失最低点；坐标是经验观测而非解析证明。来源：原论文 Figure 4，PDF 第 11 页。[原论文 PDF](https://arxiv.org/pdf/2401.02954#page=11)*

![缩放律对 7B 与 67B 的预测](/images/literature-notes/deepseek-llm/scaling-prediction.png)

*图 2｜由小计算实验外推到 DeepSeek LLM 7B/67B 的最优模型 FLOPs和 token 数；外推跨度约三个数量级，因此“落在趋势附近”是工程验证，不等于指数在更大尺度仍必然成立。来源：原论文 Figure 5，PDF 第 11 页。[原论文 PDF](https://arxiv.org/pdf/2401.02954#page=11)*

### 3. 7B / 67B 架构和优化

两者都是 decoder-only Transformer，沿用 LLaMA 风格的 Pre-Norm、RMSNorm、SwiGLU 和 RoPE。主要配置如下：

| 配置 | DeepSeek LLM 7B | DeepSeek LLM 67B |
|---|---:|---:|
| 层数 | 30 | 95 |
| hidden size | 4,096 | 8,192 |
| attention heads | 32 | 64 |
| KV 形式 | MHA | 8 KV heads 的 GQA |
| 上下文长度 | 4,096 | 4,096 |
| 训练 token | 2T | 2T |
| global batch | 2,304 | 4,608 |
| 峰值学习率 | \(4.2\times10^{-4}\) | \(3.2\times10^{-4}\) |

优化器为 AdamW（\(\beta_1=0.9,\beta_2=0.95\)，weight decay 0.1），2,000 step warm-up；训练进度达到 80% 和 90% 时，学习率分别降为峰值的 0.316 和 0.1，梯度裁剪为 1.0。训练使用 BF16 前后向、FP32 梯度累积，并组合数据并行、张量并行、序列并行、1F1B 流水并行、FlashAttention 和 ZeRO-1。[原论文 §4.1](https://arxiv.org/pdf/2401.02954#page=13)

这些系统组件属于内部 HAI-LLM 平台。论文没有报告 GPU 型号/数量、MFU、墙钟时间、能耗或 GPU 小时，官方仓库也未开放该平台；能复现模型推理，不代表能复现其预训练系统。

### 4. SFT 与 DPO

指令数据共约 **1.5M**：约 1.2M 帮助性样本和 300K 安全样本；帮助性部分按论文统计约含 31.2% 通用语言、46.6% 数学、22.2% 代码。7B SFT 4 个 epoch，67B SFT 2 个 epoch。随后以一轮 DPO 优化偏好，学习率 \(5\times10^{-6}\)、batch 512。

DPO 对一个偏好对 \((y_w,y_l)\) 直接拉大策略相对参考模型的对数概率差，可概括为：

$$
\mathcal L_{\mathrm{DPO}}
=-\log\sigma\!\left(\beta\left[
\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}
-\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}
\right]\right).
$$

报告强调 DPO 更明显改善开放式对话，标准学术 benchmark 的变化较小；但偏好数据来源、标注一致性与安全分类器细节没有完整公开。

## 实验

### 1. 基座模型

在论文统一表格中，DeepSeek LLM 67B 相比 LLaMA 2 70B 的代表性结果为：MMLU 71.3 vs. 69.0、GSM8K 63.4 vs. 58.4、MATH 18.7 vs. 13.5、HumanEval 42.7 vs. 28.7、MBPP 57.4 vs. 45.6、BBH 68.7 vs. 62.9。相反，RACE-High 为 50.7 vs. 54.3，说明优势集中在中文、数学、代码和部分综合知识，并非所有任务都领先。[原论文 Table 5](https://arxiv.org/pdf/2401.02954#page=15)

这些是单篇报告中的 benchmark 分数，不等于独立复现：各模型 tokenizer、prompt、few-shot 数和评测 harness 可能不同，表格也没有置信区间。训练语料不公开使 contamination 只能依赖作者流程，不能外部核验。

### 2. 对齐后的能力重排

67B 从 Base 到 Chat，GSM8K 从 63.4 增至 84.1、HumanEval 从 42.7 增至 73.8；但 HellaSwag 从 84.0 降至 75.7、CLUEWSC 从 81.0 降至 60.0。作者解释部分下降来自 Chat 与 Base 使用不同提示协议；无论原因，这组结果都提示 SFT/RLHF 的行为优化会重排基座能力，不能只报道上升项。[原论文 Table 6](https://arxiv.org/pdf/2401.02954#page=17)

MT-Bench 中，67B Chat 为 8.35，DPO 后为 8.76；论文引用的 GPT-3.5 和 GPT-4 分别为 8.39、9.26。该评测依赖 LLM-as-a-judge，且闭源 API 快照、长度与风格都会影响结果，因此更适合衡量当时协议下的对话偏好，不是人类效用的绝对尺度。

### 3. 缩放实验回答了什么

7B/67B 最终配置与小模型拟合趋势相符，是对大跨度外推的内部 sanity check。但模型规模、token 数和数据质量同时变化，论文没有用同等数据/算力训练 Kaplan、Chinchilla 和本方法三组大型对照。因此，论文支持“拟合配方足以指导本次训练”，不支持“0.5243/0.4757 在所有语言、架构和数据上最优”。

## 主要发现

1. **数据质量会进入缩放律。** 论文最重要的反直觉信息不是某个指数，而是不同数据分布会改变指数；缩放律是条件化的经验模型。
2. **用 FLOPs/token 描述规模比参数量更利于跨结构比较。** 这为后续 MoE 路线预留了统一口径：总参数很多，但每 token 激活计算可以受控。
3. **2T-token 中英预训练显著强化数学、代码和中文能力。** 67B 对 LLaMA 2 70B 的优势主要落在这些维度，部分英文阅读/常识任务仍弱。
4. **对齐不是无损变换。** SFT/DPO 改善对话、数学和代码，同时部分 Base benchmark 回退；评价应同时保留 Base 与 Chat。
5. **开放权重不等于开放训练。** 官方仓库足以部署和评测模型，但语料、HAI-LLM、完整训练脚本与计算账单未公开。

## 局限与适用边界

### 作者明确报告的局限

- 知识被训练截止日期冻结，不能保证最新信息；
- 仍会生成事实错误、幻觉或不可靠建议；
- 中文数据建设仍处早期阶段，质量与覆盖有继续提升空间；
- 训练主要覆盖中文和英文，其他语言能力较弱。[原论文 Limitations](https://arxiv.org/pdf/2401.02954#page=23)

### 额外证据边界

- **成本未知**：没有 GPU 型号、GPU 数、总 GPU 小时和失败实验，不能从 2T token 反推出可信美元成本。
- **数据不可审计**：没有语料清单、授权状态、去污染日志和可复现清洗器；双语质量结论只在作者内部数据上成立。
- **缩放外推有限**：拟合预算最高到 \(3\times10^{20}\) FLOPs，再外推到大型模型；只有两个最终规模，无法检验曲线在更大区间是否转折。
- **归因不唯一**：数据、tokenizer、超参数和模型规模被整体打包，榜单差异不能单独归因于某个组件。
- **评测不含统计不确定度**：大多数任务只有单点，没有种子、方差、显著性或独立复现；MT-Bench 还依赖模型裁判。
- **发布边界**：仓库含模型与样例，不含完整预训练/SFT/DPO 实现；“open-source”在此更接近开放权重与部分工具。

## 路线关系

DeepSeek LLM 是后续路线的密集起点：[DeepSeek-V2](/posts/deepseek-v2/) 用 MLA 和 DeepSeekMoE 将“模型容量”与“每 token 计算/KV 缓存”解耦；[DeepSeek-V3](/posts/deepseek-v3/) 在 V2 架构上加入无主辅助损失的负载均衡、MTP、FP8 与更大规模训练；[DeepSeek-R1](/posts/deepseek-r1/) 再以 V3 Base 为底座，用可验证奖励和 GRPO 强化推理。换言之，V1 解决“数据与规模怎么配”，V2/V3 解决“怎样更经济地扩大容量”，R1 解决“怎样把基座容量转成可观察的推理行为”。

## 我的思考

这篇论文最值得复用的是实验方法，而不是数值本身：先定义不会被 embedding/稀疏参数扭曲的计算口径，再用多个预算找局部最优点，最后在真正的大模型上验证外推。若把这一路线用于新数据或新架构，应该重新测指数，而不是照抄 0.5243/0.4757。

后续工作若要增强因果解释，至少需要三组补充：公开一个可审计的数据子集与去污染日志；在相同总 FLOPs 下比较不同模型/数据分配；报告 GPU 小时、能耗、MFU 和失败运行。这样才能把“性能路线”升级为“可复现的效率路线”。

## 结论

DeepSeek LLM 建立了 DeepSeek 系列的三块地基：中英数据工程、以 FLOPs/token 为模型规模的缩放方法，以及 Base—SFT—DPO 的完整能力链。它在数学、代码与中文任务上的结果具有路线意义，但开放范围和实验设计决定了其证据边界：缩放指数只适用于本次数据与训练条件，榜单不是单组件因果证明，训练总成本也未公开。

## 参考文献

1. DeepSeek-AI. *DeepSeek LLM: Scaling Open-Source Language Models with Longtermism*. arXiv:2401.02954, 2024. [arXiv](https://arxiv.org/abs/2401.02954) · [PDF](https://arxiv.org/pdf/2401.02954) · [DOI](https://doi.org/10.48550/arXiv.2401.02954)
2. DeepSeek-AI. *DeepSeek-LLM official repository*. [GitHub](https://github.com/deepseek-ai/DeepSeek-LLM)
3. Kaplan, J. et al. *Scaling Laws for Neural Language Models*. arXiv:2001.08361, 2020. [arXiv](https://arxiv.org/abs/2001.08361)
4. Hoffmann, J. et al. *Training Compute-Optimal Large Language Models*. NeurIPS 2022. [Proceedings](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c1e2faff6f588870935f114ebe04a3e5-Abstract-Conference.html)
