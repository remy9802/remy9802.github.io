#!/usr/bin/env python3
"""Build source-mapped draft nature-reader bundles from selectable-text PDFs.

The script creates a complete page/block map, inserts the manually reviewed lead
translation supplied in the manifest, and marks every remaining translation,
visual crop, and equation as pending. It deliberately avoids low-quality machine
translation and keeps incomplete work explicit.
"""

from __future__ import annotations

import argparse
import difflib
import html
import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "literature-readers" / "manifest.json"
OUTPUT_ROOT = ROOT / "literature-readers"
EXTRACTED_TEXT_ROOT = Path("/tmp/nature-reader-pdftotext")

LIGATURES = str.maketrans({"ﬁ": "fi", "ﬂ": "fl", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl"})
COMMON_HEADINGS = {
    "abstract",
    "introduction",
    "related work",
    "method",
    "methods",
    "experiments",
    "results",
    "discussion",
    "conclusion",
    "conclusions",
    "limitations",
    "references",
    "appendix",
    "acknowledgements",
    "acknowledgments",
}


def normalize_for_match(value: str) -> str:
    value = value.translate(LIGATURES).lower()
    value = re.sub(r"\s+", " ", value)
    return re.sub(r"[^a-z0-9 ]", "", value).strip()


def clean_paragraph(raw: str) -> str:
    lines = [line.strip() for line in raw.translate(LIGATURES).splitlines()]
    lines = [line for line in lines if line]
    if not lines:
        return ""

    output: list[str] = []
    for line in lines:
        if output and output[-1].endswith("-") and re.match(r"^[a-z]", line):
            output[-1] = output[-1][:-1] + line
        else:
            output.append(line)
    return re.sub(r"\s+", " ", " ".join(output)).strip()


def split_page(page_text: str) -> list[str]:
    blocks = []
    for raw in re.split(r"\n\s*\n+", page_text):
        paragraph = clean_paragraph(raw)
        if not paragraph or re.fullmatch(r"\d+", paragraph):
            continue
        blocks.append(paragraph)
    return blocks


def block_type(text: str) -> str:
    lowered = text.lower().strip()
    if re.match(r"^(figure|fig\.|table)\s*\d+", lowered):
        return "caption"
    if len(text) <= 140:
        plain = re.sub(r"^\d+(?:\.\d+)*[.)]?\s*", "", lowered).strip(" :")
        if plain in COMMON_HEADINGS or re.match(r"^\d+(?:\.\d+)*\s+[a-z]", lowered):
            return "heading"
    if lowered.startswith(("copyright ©", "arxiv:", "this cvpr paper is the open access version")):
        return "note"
    return "paragraph"


def markdown_text(value: str) -> str:
    value = html.escape(value, quote=False)
    value = value.replace("\\", "&#92;").replace("$", "&#36;")
    return value


def source_blocks(entry: dict[str, Any]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    EXTRACTED_TEXT_ROOT.mkdir(parents=True, exist_ok=True)
    text_path = EXTRACTED_TEXT_ROOT / f"{entry['slug']}.txt"
    extraction = subprocess.run(
        ["pdftotext", entry["pdf_path"], str(text_path)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
    )
    warning_lines = list(dict.fromkeys(line.strip() for line in extraction.stderr.splitlines() if line.strip()))
    entry["_extraction_warning"] = "；".join(warning_lines)
    pages = text_path.read_text(encoding="utf-8", errors="replace").split("\f")
    if pages and not pages[-1].strip():
        pages.pop()

    blocks: list[dict[str, Any]] = []
    page_records: list[dict[str, Any]] = []
    source_counter = 1
    caption_counter = 1
    order = 1

    lead = {
        "id": f"S{source_counter:03d}",
        "page": int(entry.get("lead_page", 1)),
        "type": "paragraph",
        "order": order,
        "original_text": entry["lead_original"].strip(),
        "translation": entry["lead_translation"].strip(),
        "bbox": None,
        "confidence": "high",
        "refs": [],
        "insert_after": None,
        "manually_reviewed": True,
        "translation_provenance": "human-reviewed",
        "label": entry.get("lead_label", "Abstract"),
    }
    blocks.append(lead)
    source_counter += 1
    order += 1

    normalized_lead = normalize_for_match(entry["lead_original"])
    page_to_ids: dict[int, list[str]] = defaultdict(list)
    page_to_ids[lead["page"]].append(lead["id"])

    for page_number, page_text in enumerate(pages, start=1):
        for paragraph in split_page(page_text):
            normalized = normalize_for_match(paragraph)
            if normalized and normalized_lead:
                similarity = difflib.SequenceMatcher(None, normalized, normalized_lead).ratio()
                if similarity >= 0.84 or (
                    len(normalized) > 120 and normalized[:120] in normalized_lead
                ):
                    continue

            kind = block_type(paragraph)
            if kind == "caption":
                block_id = f"C{caption_counter:03d}"
                caption_counter += 1
            else:
                block_id = f"S{source_counter:03d}"
                source_counter += 1

            block = {
                "id": block_id,
                "page": page_number,
                "type": kind,
                "order": order,
                "original_text": paragraph,
                "translation": "",
                "bbox": None,
                "confidence": "medium",
                "refs": [],
                "insert_after": None,
                "manually_reviewed": False,
                "translation_provenance": "pending",
            }
            blocks.append(block)
            page_to_ids[page_number].append(block_id)
            order += 1

    for page_number in range(1, len(pages) + 1):
        page_records.append({"page": page_number, "block_ids": page_to_ids.get(page_number, [])})

    return blocks, page_records


def make_paper(entry: dict[str, Any], blocks: list[dict[str, Any]], pages: list[dict[str, Any]]) -> str:
    lines = [
        f"# {entry['title']}｜全文双语阅读器（draft）",
        "",
        "> **状态：source-mapped draft。** 已完成全文页段映射与开篇核心段落人工翻译；其余逐段翻译、图表紧裁和公式转写均显式标为待处理。本文不是摘要替代品。",
        "",
        "## 文献元数据",
        "",
        f"- **作者 / 机构**：{entry['authors_institutions']}",
        f"- **年份 / 载体**：{entry['year']}；{entry['venue']}",
        f"- **原文**：[官方来源]({entry['source_url']})",
        f"- **原博客笔记**：[中文文献笔记](../../{entry['note_path']})",
        f"- **源文件**：`{entry['pdf_path']}`（{entry['pages']} 页，可检索文本 PDF）",
        "",
        "## 页面索引",
        "",
    ]

    page_links = [f"[p.{page['page']}](#page-{page['page']})" for page in pages]
    for start in range(0, len(page_links), 12):
        lines.append(" · ".join(page_links[start : start + 12]))
    lines.extend(["", "## 术语表", "", "| Canonical term | 中文 | 首次使用 / 决定 |", "|---|---|---|"])
    for item in entry.get("glossary", []):
        lines.append(f"| {item['term']} | {item['translation']} | {item['note']} |")

    lines.extend(["", "## 全文逐段对照", ""])
    blocks_by_page: dict[int, list[dict[str, Any]]] = defaultdict(list)
    for block in blocks:
        blocks_by_page[int(block["page"])].append(block)

    for page in pages:
        page_number = int(page["page"])
        lines.extend([f'<a id="page-{page_number}"></a>', f"### Page {page_number}", ""])
        for block in blocks_by_page.get(page_number, []):
            lines.extend(
                [
                    f'<a id="{block["id"]}"></a>',
                    f'**Source:** p.{page_number} {block["id"]}'
                    + (f' · {block.get("label")}' if block.get("label") else ""),
                    "",
                    f'**Original:** {markdown_text(block["original_text"])}',
                    "",
                ]
            )
            if block["translation"]:
                lines.append(f'**中文:** {markdown_text(block["translation"])}')
            else:
                lines.append("**中文:** _待人工翻译（draft；不得视为已完成阅读）。_")
            lines.append("")

    lines.extend(
        [
            "## 阅读提示",
            "",
            "- 当前文件的价值是稳定保存全文页码与段落锚点，并提供一个经人工复核的开篇双语块。",
            "- 未翻译段落、图表、表格和公式都在 `translation_notes.md` 中登记；完成前不应把本文件标记为正式全文译读。",
            "- 博客笔记可作为研究路线导读，但数值结论仍应回到本读者的具体页码块和原 PDF 核验。",
            "",
        ]
    )
    return "\n".join(lines)


def make_notes(entry: dict[str, Any], blocks: list[dict[str, Any]]) -> str:
    translated = sum(bool(block["translation"]) for block in blocks)
    human_translated = sum(block.get("translation_provenance") == "human-reviewed" for block in blocks)
    captions = sum(block["type"] == "caption" for block in blocks)
    pending = len(blocks) - translated
    quality_notes = [
        "- 原文来自 PDF 可选文本层；多栏论文可能存在阅读顺序交错，当前块统一标为 medium confidence，人工复核后才可提升置信度。",
        "- 仅 manifest 中的开篇核心段落经过人工翻译；自动试译未达到忠实度要求，未写入读者正文。",
        "- 图、表及其 caption 尚待根据 PDF 页面紧裁并放置到首次实质讨论位置；`assets/` 目前为空。",
        "- 显示公式尚待逐页视觉核验、建立 `E...` 锚点并转写为 Markdown 数学；在此之前不得声称公式处理完成。",
        "- 若原文块出现页眉、页脚、双栏串行或表格文本碎片，应在正式翻译阶段按渲染页修正，不从上下文猜测。",
    ]
    if entry.get("_extraction_warning"):
        quality_notes.append(f"- **PDF 解析器提示**：{entry['_extraction_warning']}；当前仍能提取 {entry['pages']} 页文本，但相关对象需在正式阶段视觉复核。")

    return "\n".join(
        [
            f"# Translation notes｜{entry['title']}",
            "",
            "## 当前状态",
            "",
            "- **模式**：source-mapped draft",
            f"- **PDF 页数**：{entry['pages']}",
            f"- **来源块总数**：{len(blocks)}",
            f"- **已人工复核翻译块**：{human_translated}",
            f"- **待翻译块**：{pending}",
            f"- **已识别 caption 候选**：{captions}（尚未完成紧裁与图注配对）",
            "",
            "## 质量与版面说明",
            "",
        ]
        + quality_notes
        + ["", "## 术语决定", ""]
        + [
            f"- **{item['term']}** → **{item['translation']}**：{item['note']}"
            for item in entry.get("glossary", [])
        ]
        + [""]
    )


def build_entry(entry: dict[str, Any]) -> dict[str, Any]:
    output_dir = OUTPUT_ROOT / entry["slug"]
    assets_dir = output_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    (assets_dir / ".gitkeep").write_text("", encoding="utf-8")

    blocks, pages = source_blocks(entry)
    source_map = {
        "paper": {
            "title": entry["title"],
            "venue": entry["venue"],
            "source_type": "pdf",
            "language": "en",
            "source_path": entry["pdf_path"],
            "source_url": entry["source_url"],
            "status": "source-mapped-draft",
        },
        "blocks": blocks,
        "pages": pages,
        "figures": [],
        "equations": [],
        "glossary": entry.get("glossary", []),
    }

    (output_dir / "paper.md").write_text(make_paper(entry, blocks, pages), encoding="utf-8")
    (output_dir / "source_map.json").write_text(
        json.dumps(source_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (output_dir / "translation_notes.md").write_text(make_notes(entry, blocks), encoding="utf-8")
    return {
        "slug": entry["slug"],
        "title": entry["title"],
        "pages": entry["pages"],
        "blocks": len(blocks),
        "translated": sum(bool(block["translation"]) for block in blocks),
        "human_reviewed": sum(block.get("translation_provenance") == "human-reviewed" for block in blocks),
    }


def build_index(results: list[dict[str, Any]]) -> None:
    lines = [
        "# Nature Reader 文献重读工作区",
        "",
        "> 13 份来源共 407 页。本目录保存 source-mapped draft；每份读者都明确区分已人工翻译块和待处理块。",
        "",
        "| 文献 | 页数 | 来源块 | 已人工翻译 | 状态 |",
        "|---|---:|---:|---:|---|",
    ]
    for item in results:
        lines.append(
            f"| [{item['title']}]({item['slug']}/paper.md) | {item['pages']} | {item['blocks']} | {item['human_reviewed']} | draft |"
        )
    lines.extend(
        [
            "",
            "## 状态定义",
            "",
            "- `draft`：来源页段已映射，但仍有未翻译正文、未裁图表或未核验公式。",
            "- `complete`：逐段双语、视觉资产、公式与严格校验全部完成后才能使用该状态。",
            "",
        ]
    )
    (OUTPUT_ROOT / "README.md").write_text("\n".join(lines), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--paper", action="append", default=[], help="Only build the selected slug; repeatable")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    entries = manifest["papers"]
    if args.paper:
        requested = set(args.paper)
        entries = [entry for entry in entries if entry["slug"] in requested]
        missing = requested - {entry["slug"] for entry in entries}
        if missing:
            raise SystemExit(f"Unknown paper slug(s): {', '.join(sorted(missing))}")

    results = [build_entry(entry) for entry in entries]
    if not args.paper:
        build_index(results)
    print(json.dumps({"papers": len(results), "pages": sum(item["pages"] for item in results), "results": results}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
