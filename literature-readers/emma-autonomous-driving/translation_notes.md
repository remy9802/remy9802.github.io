# Translation notes｜EMMA: End-to-End Multimodal Model for Autonomous Driving

## 当前状态

- **模式**：source-mapped draft
- **PDF 页数**：31
- **来源块总数**：194
- **已人工翻译块**：1
- **待翻译块**：193
- **已识别 caption 候选**：21（尚未完成紧裁与图注配对）

## 质量与版面说明

- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。
- 仅 manifest 中的开篇核心段落经过人工翻译；本机小模型试译未达到忠实度要求，未写入任何读者正文。
- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。
- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。
- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。

## 术语决定

- **End-to-end Multimodal Model for Autonomous driving (EMMA)** → **端到端自动驾驶多模态模型**：保留模型名 EMMA
- **ego vehicle status** → **自车状态**：不用主车状态
- **road graph** → **道路图**：指道路拓扑元素
- **language space** → **语言空间**：与数值动作空间区分
