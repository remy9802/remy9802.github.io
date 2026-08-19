(function () {
  "use strict";

  var studio = document.getElementById("writing-studio");
  if (!studio) return;

  var STORAGE_KEY = "remy-blog-writing-draft-v1";
  var titleInput = document.getElementById("draft-title");
  var dateInput = document.getElementById("draft-date");
  var tagsInput = document.getElementById("draft-tags");
  var bodyInput = document.getElementById("draft-body");
  var preview = document.getElementById("markdown-preview");
  var saveStatus = document.getElementById("save-status");
  var stats = document.getElementById("document-stats");
  var toast = document.getElementById("studio-toast");
  var importInput = document.getElementById("import-file");
  var saveTimer;
  var mathTimer;
  var toastTimer;

  var starter = {
    title: "一篇正在发生的文章",
    date: today(),
    tags: "学习, 随笔",
    body: "## 从一个小问题开始\n\n每一篇值得写下来的文章，通常都来自一个还没有答案的问题。\n\n> 写作不是记录已经完成的思考，而是让思考真正发生。\n\n### 今天想弄明白的三件事\n\n- 我真正好奇的是什么？\n- 哪个例子最能说明它？\n- 读者离开时应该记住什么？\n\n你可以直接删掉这些文字，开始自己的文章。"
  };

  function today() {
    var now = new Date();
    var offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  function loadDraft() {
    var saved;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      saved = null;
    }
    var draft = saved && typeof saved === "object" ? saved : starter;
    titleInput.value = draft.title || "";
    dateInput.value = draft.date || today();
    tagsInput.value = draft.tags || "";
    bodyInput.value = draft.body || "";
    render();
  }

  function getDraft() {
    return {
      title: titleInput.value.trim(),
      date: dateInput.value || today(),
      tags: tagsInput.value.trim(),
      body: bodyInput.value
    };
  }

  function queueSave() {
    saveStatus.textContent = "保存中";
    saveStatus.classList.add("is-saving");
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getDraft()));
        saveStatus.textContent = "已保存";
        saveStatus.classList.remove("is-saving");
      } catch (error) {
        saveStatus.textContent = "无法保存";
        saveStatus.classList.remove("is-saving");
      }
    }, 350);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeUrl(value) {
    var decoded = value.replace(/&amp;/g, "&").trim();
    if (/^(https?:\/\/|mailto:|\/|#)/i.test(decoded)) {
      return escapeHtml(decoded);
    }
    return "#";
  }

  function inlineMarkdown(value) {
    var protectedTokens = [];
    function protect(content) {
      var token = "\u0000PROTECTED" + protectedTokens.length + "\u0000";
      protectedTokens.push(content);
      return token;
    }

    var text = escapeHtml(value).replace(/`([^`]+)`/g, function (_, code) {
      return protect("<code>" + code + "</code>");
    }).replace(/\$\$[^$]+\$\$|\$[^$\n]+\$/g, function (math) {
      return protect(math);
    });

    text = text
      .replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+[\"'][^\"']*[\"'])?\)/g, function (_, label, url) {
        return '<a href="' + safeUrl(url) + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>")
      .replace(/~~([^~]+)~~/g, "<del>$1</del>")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/(^|[^_])_([^_\n]+)_/g, "$1<em>$2</em>");

    protectedTokens.forEach(function (content, index) {
      text = text.replace("\u0000PROTECTED" + index + "\u0000", content);
    });
    return text;
  }

  function clearPreviewMath() {
    if (window.MathJax && typeof window.MathJax.typesetClear === "function") {
      window.MathJax.typesetClear([preview]);
    }
  }

  function queueMathTypeset() {
    window.clearTimeout(mathTimer);
    mathTimer = window.setTimeout(function () {
      if (!window.MathJax ||
          !window.MathJax.startup ||
          !window.MathJax.startup.promise ||
          typeof window.MathJax.typesetPromise !== "function") return;

      window.MathJax.startup.promise
        .then(function () { return window.MathJax.typesetPromise([preview]); })
        .catch(function () {
          // Keep the Markdown editor usable if an incomplete formula cannot be typeset yet.
        });
    }, 120);
  }

  function markdownToHtml(markdown) {
    var lines = String(markdown || "").replace(/\r\n?/g, "\n").split("\n");
    var html = [];
    var paragraph = [];
    var listType = "";
    var inCode = false;
    var codeLanguage = "";
    var codeLines = [];

    function closeParagraph() {
      if (paragraph.length) {
        html.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
        paragraph = [];
      }
    }

    function closeList() {
      if (listType) {
        html.push("</" + listType + ">");
        listType = "";
      }
    }

    lines.forEach(function (line) {
      var fence = line.match(/^```\s*([\w-]+)?\s*$/);
      if (fence) {
        if (inCode) {
          html.push('<pre><code' + (codeLanguage ? ' class="language-' + escapeHtml(codeLanguage) + '"' : "") + ">" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
          inCode = false;
          codeLanguage = "";
          codeLines = [];
        } else {
          closeParagraph();
          closeList();
          inCode = true;
          codeLanguage = fence[1] || "";
        }
        return;
      }

      if (inCode) {
        codeLines.push(line);
        return;
      }

      if (!line.trim()) {
        closeParagraph();
        closeList();
        return;
      }

      var heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        closeParagraph();
        closeList();
        var level = heading[1].length;
        html.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
        return;
      }

      if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
        closeParagraph();
        closeList();
        html.push("<hr>");
        return;
      }

      var quote = line.match(/^>\s?(.*)$/);
      if (quote) {
        closeParagraph();
        closeList();
        html.push("<blockquote>" + inlineMarkdown(quote[1]) + "</blockquote>");
        return;
      }

      var unordered = line.match(/^\s*[-*+]\s+(.+)$/);
      var ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
      if (unordered || ordered) {
        closeParagraph();
        var nextType = unordered ? "ul" : "ol";
        if (listType !== nextType) {
          closeList();
          listType = nextType;
          html.push("<" + listType + ">");
        }
        html.push("<li>" + inlineMarkdown((unordered || ordered)[1]) + "</li>");
        return;
      }

      closeList();
      paragraph.push(line.trim());
    });

    if (inCode) {
      html.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
    }
    closeParagraph();
    closeList();
    return html.join("\n");
  }

  function render() {
    var draft = getDraft();
    var bodyText = draft.body.trim();
    var charCount = bodyText.replace(/\s/g, "").length;
    var latinWords = (bodyText.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) || []).length;
    var readingUnits = charCount + latinWords;
    var minutes = Math.max(1, Math.ceil(readingUnits / 300));
    var tags = draft.tags.split(/[,，]/).map(function (tag) { return tag.trim(); }).filter(Boolean);
    var tagLabel = tags.length ? tags.join(" · ") : "未分类";

    stats.textContent = charCount + " 字 · 约 " + minutes + " 分钟";
    clearPreviewMath();
    preview.innerHTML =
      '<p class="preview-kicker">' + escapeHtml(tagLabel) + "</p>" +
      '<h1 class="preview-title">' + escapeHtml(draft.title || "无标题文章") + "</h1>" +
      '<p class="preview-meta">' + escapeHtml(draft.date) + " · 预计阅读 " + minutes + " 分钟</p>" +
      (bodyText ? markdownToHtml(draft.body) : '<div class="preview-empty"><p>开始输入后，预览会出现在这里。</p></div>');
    queueMathTypeset();
  }

  function onEdit() {
    render();
    queueSave();
  }

  function yamlQuote(value) {
    return '"' + String(value).replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"';
  }

  function buildMarkdown() {
    var draft = getDraft();
    var tags = draft.tags.split(/[,，]/).map(function (tag) { return tag.trim(); }).filter(Boolean);
    var frontMatter = [
      "---",
      "title: " + yamlQuote(draft.title || "无标题文章"),
      "date: " + draft.date,
      "permalink: /posts/" + slugify(draft.title || "untitled") + "/",
      "tags: [" + tags.map(yamlQuote).join(", ") + "]",
      "---",
      ""
    ].join("\n");
    return frontMatter + draft.body.replace(/^\s+/, "") + "\n";
  }

  function slugify(value) {
    var slug = String(value)
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return slug || "untitled";
  }

  function filename() {
    var draft = getDraft();
    return draft.date + "-" + slugify(draft.title || "untitled") + ".md";
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  function downloadMarkdown() {
    var blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename();
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast("文章已导出，可放入博客的 _posts 文件夹。");
  }

  function copyMarkdown() {
    var content = buildMarkdown();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(content).then(function () {
        showToast("Markdown 已复制到剪贴板。");
      }).catch(function () {
        fallbackCopy(content);
      });
    } else {
      fallbackCopy(content);
    }
  }

  function fallbackCopy(content) {
    var helper = document.createElement("textarea");
    helper.value = content;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    var copied = document.execCommand("copy");
    helper.remove();
    showToast(copied ? "Markdown 已复制到剪贴板。" : "复制失败，请选择正文后手动复制。");
  }

  function parseFrontMatter(content) {
    var result = { title: "", date: today(), tags: "", body: content };
    var normalized = content.replace(/\r\n?/g, "\n");
    var match = normalized.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return result;

    match[1].split("\n").forEach(function (line) {
      var field = line.match(/^(title|date|tags):\s*(.*)$/);
      if (!field) return;
      var value = field[2].trim().replace(/^[\"']|[\"']$/g, "");
      if (field[1] === "tags") {
        value = value.replace(/^\[|\]$/g, "").split(",").map(function (tag) {
          return tag.trim().replace(/^[\"']|[\"']$/g, "");
        }).filter(Boolean).join(", ");
      }
      result[field[1]] = value;
    });
    result.date = String(result.date).slice(0, 10) || today();
    result.body = normalized.slice(match[0].length);
    return result;
  }

  function importMarkdown(file) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("文件超过 2 MB，请选择更小的 Markdown 文件。");
      importInput.value = "";
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var draft = parseFrontMatter(String(reader.result || ""));
      titleInput.value = draft.title || file.name.replace(/\.(md|markdown)$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      dateInput.value = draft.date;
      tagsInput.value = draft.tags;
      bodyInput.value = draft.body;
      render();
      queueSave();
      showToast("已导入 " + file.name);
      importInput.value = "";
    };
    reader.onerror = function () {
      showToast("无法读取这个文件。");
      importInput.value = "";
    };
    reader.readAsText(file);
  }

  function applyFormat(format) {
    var start = bodyInput.selectionStart;
    var end = bodyInput.selectionEnd;
    var selected = bodyInput.value.slice(start, end);
    var before = bodyInput.value.slice(0, start);
    var after = bodyInput.value.slice(end);
    var replacement = selected;
    var selectStart = start;
    var selectEnd;
    var lineStart;

    if (format === "bold") replacement = "**" + (selected || "粗体文字") + "**";
    if (format === "italic") replacement = "*" + (selected || "斜体文字") + "*";
    if (format === "code") replacement = "`" + (selected || "code") + "`";
    if (format === "link") replacement = "[" + (selected || "链接文字") + "](https://)";

    if (format === "heading" || format === "quote" || format === "list") {
      lineStart = before.lastIndexOf("\n") + 1;
      start = lineStart;
      before = bodyInput.value.slice(0, start);
      selected = bodyInput.value.slice(start, end) || (format === "heading" ? "小标题" : format === "quote" ? "引用文字" : "列表项");
      after = bodyInput.value.slice(end);
      var prefix = format === "heading" ? "## " : format === "quote" ? "> " : "- ";
      replacement = prefix + selected.replace(/\n/g, "\n" + prefix);
      selectStart = start;
    }

    bodyInput.value = before + replacement + after;
    selectEnd = start + replacement.length;
    bodyInput.focus();
    bodyInput.setSelectionRange(selectStart, selectEnd);
    onEdit();
  }

  [titleInput, dateInput, tagsInput, bodyInput].forEach(function (input) {
    input.addEventListener("input", onEdit);
  });

  document.querySelectorAll("[data-format]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyFormat(button.getAttribute("data-format"));
    });
  });

  document.querySelectorAll(".studio-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var view = tab.getAttribute("data-view");
      var activePaneId = view === "edit" ? "editor-pane" : "preview-pane";
      document.querySelectorAll(".studio-tab").forEach(function (item) {
        var active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", active ? "true" : "false");
      });
      document.querySelectorAll(".studio-pane").forEach(function (pane) {
        pane.classList.toggle("is-active", pane.id === activePaneId);
      });
    });
  });

  document.getElementById("new-draft").addEventListener("click", function () {
    var hasContent = titleInput.value.trim() || bodyInput.value.trim();
    if (hasContent && !window.confirm("新建草稿会清除当前浏览器中的这份草稿，确定继续吗？")) return;
    titleInput.value = "";
    dateInput.value = today();
    tagsInput.value = "";
    bodyInput.value = "";
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(getDraft()));
    } catch (error) {
      // The editor still works when browser storage is unavailable.
    }
    render();
    titleInput.focus();
    showToast("新的空白草稿已准备好。");
  });

  document.getElementById("download-markdown").addEventListener("click", downloadMarkdown);
  document.getElementById("copy-markdown").addEventListener("click", copyMarkdown);
  importInput.addEventListener("change", function () { importMarkdown(importInput.files[0]); });

  bodyInput.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      event.preventDefault();
      var start = bodyInput.selectionStart;
      var end = bodyInput.selectionEnd;
      bodyInput.value = bodyInput.value.slice(0, start) + "  " + bodyInput.value.slice(end);
      bodyInput.setSelectionRange(start + 2, start + 2);
      onEdit();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      downloadMarkdown();
    }
  });

  loadDraft();
})();
