# Translation notes｜Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution

## 当前状态

- **模式**：source-mapped draft
- **PDF 页数**：52
- **来源块总数**：354
- **已人工复核翻译块**：1
- **待翻译块**：353
- **已识别 caption 候选**：37（尚未完成紧裁与图注配对）

## 质量与版面说明

- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。
- 仅 manifest 中的开篇核心段落经过人工翻译；自动试译未达到忠实度要求，未写入读者正文。
- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。
- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。
- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。

## 术语决定

- **Naive Dynamic Resolution** → **朴素动态分辨率**：保留论文专名大小写
- **Multimodal Rotary Position Embedding (M-RoPE)** → **多模态旋转位置编码**：首次展开，后文保留 M-RoPE
- **visual token** → **视觉 token**：不译为视觉词元
- **scaling law** → **扩展规律**：避免误写成一般比例关系
