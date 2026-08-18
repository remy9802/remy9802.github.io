# Translation notes｜AutoVLA: A Vision-Language-Action Model for End-to-End Autonomous Driving with Adaptive Reasoning and Reinforcement Fine-Tuning

## 当前状态

- **模式**：source-mapped draft
- **PDF 页数**：30
- **来源块总数**：629
- **已人工复核翻译块**：1
- **待翻译块**：628
- **已识别 caption 候选**：8（尚未完成紧裁与图注配对）

## 质量与版面说明

- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。
- 仅 manifest 中的开篇核心段落经过人工翻译；自动试译未达到忠实度要求，未写入读者正文。
- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。
- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。
- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。

## 术语决定

- **Vision-Language-Action (VLA)** → **视觉-语言-动作模型**：首次展开，后文保留 VLA
- **action token** → **动作 token**：保留 token，不译为词元
- **fast/slow thinking** → **快速/慢速思考**：对应 trajectory-only / chain-of-thought
- **Group Relative Policy Optimization (GRPO)** → **组相对策略优化**：首次展开，后文保留 GRPO
