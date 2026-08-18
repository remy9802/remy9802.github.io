(function () {
  "use strict";

  var library = document.querySelector("[data-notes-library]");
  if (!library) return;

  var queryInput = library.querySelector("[data-notes-query]");
  var clearButton = library.querySelector("[data-notes-clear]");
  var kindSelect = library.querySelector("[data-notes-kind]");
  var topicButtons = Array.prototype.slice.call(library.querySelectorAll("[data-note-topic]"));
  var cards = Array.prototype.slice.call(library.querySelectorAll("[data-note-card]"));
  var status = library.querySelector("[data-notes-status]");
  var emptyState = library.querySelector("[data-notes-empty]");
  var activeTopic = "";

  function normalize(value) {
    return (value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("zh-CN")
      .replace(/\s+/g, " ")
      .trim();
  }

  cards.forEach(function (card) {
    var documentNode = card.querySelector("[data-note-search-document]");
    card.searchText = normalize(documentNode ? documentNode.textContent : card.textContent);
    card.topicList = (card.getAttribute("data-topics") || "").split(/\s+/).filter(Boolean);
  });

  function readUrlState() {
    var params = new URLSearchParams(window.location.search);
    var requestedTopic = params.get("topic") || "";
    var validTopic = topicButtons.some(function (button) {
      return button.getAttribute("data-note-topic") === requestedTopic;
    });

    activeTopic = validTopic ? requestedTopic : "";
    queryInput.value = params.get("q") || "";
    kindSelect.value = params.get("type") || "";
    if (!kindSelect.value) kindSelect.value = "";
  }

  function writeUrlState() {
    var url = new URL(window.location.href);
    var query = queryInput.value.trim();
    var kind = kindSelect.value;

    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");

    if (activeTopic) url.searchParams.set("topic", activeTopic);
    else url.searchParams.delete("topic");

    if (kind) url.searchParams.set("type", kind);
    else url.searchParams.delete("type");

    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  function updateTopicCounts() {
    var allCount = library.querySelector('[data-note-topic-count="all"]');
    if (allCount) allCount.textContent = cards.length;

    topicButtons.forEach(function (button) {
      var topic = button.getAttribute("data-note-topic");
      if (!topic) return;
      var count = cards.filter(function (card) {
        return card.topicList.indexOf(topic) !== -1;
      }).length;
      var countNode = library.querySelector('[data-note-topic-count="' + topic + '"]');
      if (countNode) countNode.textContent = count;
    });
  }

  function render(updateUrl) {
    var terms = normalize(queryInput.value).split(" ").filter(Boolean);
    var selectedKind = kindSelect.value;
    var visible = 0;

    cards.forEach(function (card) {
      var matchesQuery = terms.every(function (term) {
        return card.searchText.indexOf(term) !== -1;
      });
      var matchesTopic = !activeTopic || card.topicList.indexOf(activeTopic) !== -1;
      var matchesKind = !selectedKind || card.getAttribute("data-kind") === selectedKind;
      var matches = matchesQuery && matchesTopic && matchesKind;

      card.hidden = !matches;
      if (matches) visible += 1;
    });

    topicButtons.forEach(function (button) {
      var selected = button.getAttribute("data-note-topic") === activeTopic;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    status.textContent = "显示 " + visible + " / " + cards.length + " 篇笔记";
    emptyState.hidden = visible !== 0;
    clearButton.disabled = !queryInput.value && !activeTopic && !selectedKind;

    if (updateUrl !== false) writeUrlState();
  }

  topicButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeTopic = button.getAttribute("data-note-topic") || "";
      render();
    });
  });

  queryInput.addEventListener("input", function () {
    render();
  });

  kindSelect.addEventListener("change", function () {
    render();
  });

  clearButton.addEventListener("click", function () {
    activeTopic = "";
    queryInput.value = "";
    kindSelect.value = "";
    render();
    queryInput.focus();
  });

  document.addEventListener("keydown", function (event) {
    var target = event.target;
    var isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      queryInput.focus();
    }

    if (event.key === "Escape" && (queryInput.value || activeTopic || kindSelect.value)) {
      activeTopic = "";
      queryInput.value = "";
      kindSelect.value = "";
      render();
      if (document.activeElement === queryInput) queryInput.blur();
    }
  });

  window.addEventListener("popstate", function () {
    readUrlState();
    render(false);
  });

  readUrlState();
  updateTopicCounts();
  render(false);
})();
