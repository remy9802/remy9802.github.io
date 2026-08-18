# Translation notes｜Reasoning-VLA: A Fast and General Vision-Language-Action Reasoning Model for Autonomous Driving

## 当前状态

- **模式**：source-mapped draft
- **PDF 页数**：17
- **来源块总数**：306
- **已人工复核翻译块**：1
- **待翻译块**：305
- **已识别 caption 候选**：12（尚未完成紧裁与图注配对）

## 质量与版面说明

- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。
- 仅 manifest 中的开篇核心段落经过人工翻译；自动试译未达到忠实度要求，未写入读者正文。
- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。
- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。
- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。

## 术语决定

- **learnable action queries** → **可学习动作查询**：query 译为查询，保留模块语义
- **parallel action generation** → **并行动作生成**：与自回归动作解码区分
- **spatially-guided reasoning** → **空间引导推理**：标题核心术语
- **generalization** → **泛化**：涉及跨车辆与跨场景
