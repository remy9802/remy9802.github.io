# Translation notes｜GPT-4o System Card

## 当前状态

- **模式**：source-mapped draft
- **PDF 页数**：33
- **来源块总数**：264
- **已人工翻译块**：1
- **待翻译块**：263
- **已识别 caption 候选**：9（尚未完成紧裁与图注配对）

## 质量与版面说明

- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。
- 仅 manifest 中的开篇核心段落经过人工翻译；本机小模型试译未达到忠实度要求，未写入任何读者正文。
- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。
- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。
- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。

## 术语决定

- **omni model** → **全模态模型**：保留其统一网络含义
- **speech-to-speech** → **语音到语音**：强调端到端音频交互
- **Preparedness Framework** → **Preparedness Framework**：官方框架名保留英文
- **voice cloning** → **声音克隆**：与未经授权声音生成风险相关
