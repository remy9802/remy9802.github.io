# Translation notes｜InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks

## 当前状态

- **模式**：source-mapped draft
- **PDF 页数**：14
- **来源块总数**：253
- **已人工复核翻译块**：1
- **待翻译块**：252
- **已识别 caption 候选**：15（尚未完成紧裁与图注配对）

## 质量与版面说明

- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。
- 仅 manifest 中的开篇核心段落经过人工翻译；自动试译未达到忠实度要求，未写入读者正文。
- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。
- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。
- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。
- **PDF 解析器提示**：Syntax Error (318): Unterminated string；Syntax Error (324): End of file inside dictionary；当前仍能提取 14 页文本，但相关对象需在正式阶段视觉复核。

## 术语决定

- **vision foundation model** → **视觉基础模型**：与 vision-language foundation model 区分
- **progressive alignment** → **渐进式对齐**：对应三阶段训练路线
- **InternViT-6B** → **InternViT-6B**：视觉编码器专名不翻译
- **generic visual-linguistic task** → **通用视觉语言任务**：覆盖表征与生成任务
