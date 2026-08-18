(function () {
  "use strict";

  var library = document.querySelector("[data-literature-library]");
  if (!library) return;

  var defaultSort = "date-desc";
  var queryInput = library.querySelector("[data-literature-query]");
  var clearButton = library.querySelector("[data-literature-clear]");
  var kindSelect = library.querySelector("[data-literature-kind]");
  var sortSelect = library.querySelector("[data-literature-sort]");
  var topicButtons = Array.prototype.slice.call(library.querySelectorAll("[data-topic]"));
  var cards = Array.prototype.slice.call(library.querySelectorAll("[data-literature-card]"));
  var grid = library.querySelector("[data-literature-grid]");
  var status = library.querySelector("[data-literature-status]");
  var emptyState = library.querySelector("[data-literature-empty]");
  var activeTopic = "";
  var titleCollator = typeof Intl !== "undefined" && Intl.Collator
    ? new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" })
    : null;

  function normalize(value) {
    return (value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("zh-CN")
      .replace(/\s+/g, " ")
      .trim();
  }

  function optionalNumber(value) {
    if (value === null || String(value).trim() === "") return null;
    var number = Number(String(value).replace(/,/g, ""));
    return Number.isFinite(number) ? number : null;
  }

  function compareOptionalNumbers(left, right, direction) {
    var leftMissing = left === null;
    var rightMissing = right === null;
    if (leftMissing && rightMissing) return 0;
    if (leftMissing) return 1;
    if (rightMissing) return -1;
    return direction === "asc" ? left - right : right - left;
  }

  function compareTitles(left, right, direction) {
    var result = titleCollator
      ? titleCollator.compare(left.sortTitle, right.sortTitle)
      : left.sortTitle.localeCompare(right.sortTitle);
    return direction === "desc" ? -result : result;
  }

  cards.forEach(function (card, index) {
    var documentNode = card.querySelector("[data-literature-search-document]");
    var dateValue = Date.parse(card.getAttribute("data-date") || "");
    card.searchText = normalize(documentNode ? documentNode.textContent : card.textContent);
    card.topicList = (card.getAttribute("data-topics") || "").split(/\s+/).filter(Boolean);
    card.sortTitle = normalize(card.getAttribute("data-title") || "");
    card.sortDate = Number.isFinite(dateValue) ? dateValue : null;
    card.sortPaperYear = optionalNumber(card.getAttribute("data-paper-year"));
    card.sortCitations = optionalNumber(card.getAttribute("data-citations"));
    card.originalIndex = index;

    var citationNumber = card.querySelector("[data-citation-number]");
    if (citationNumber && card.sortCitations !== null && typeof Intl !== "undefined") {
      citationNumber.textContent = new Intl.NumberFormat("zh-CN").format(card.sortCitations);
    }
  });

  function compareCards(left, right) {
    var sort = sortSelect.value || defaultSort;
    var result = 0;

    if (sort === "date-asc") result = compareOptionalNumbers(left.sortDate, right.sortDate, "asc");
    else if (sort === "date-desc") result = compareOptionalNumbers(left.sortDate, right.sortDate, "desc");
    else if (sort === "paper-year-asc") result = compareOptionalNumbers(left.sortPaperYear, right.sortPaperYear, "asc");
    else if (sort === "paper-year-desc") result = compareOptionalNumbers(left.sortPaperYear, right.sortPaperYear, "desc");
    else if (sort === "citations-asc") result = compareOptionalNumbers(left.sortCitations, right.sortCitations, "asc");
    else if (sort === "citations-desc") result = compareOptionalNumbers(left.sortCitations, right.sortCitations, "desc");
    else if (sort === "title-desc") result = compareTitles(left, right, "desc");
    else result = compareTitles(left, right, "asc");

    if (result !== 0) return result;
    result = compareOptionalNumbers(left.sortDate, right.sortDate, "desc");
    return result !== 0 ? result : left.originalIndex - right.originalIndex;
  }

  function sortCards() {
    cards.slice().sort(compareCards).forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function readUrlState() {
    var params = new URLSearchParams(window.location.search);
    var requestedTopic = params.get("topic") || "";
    var validTopic = topicButtons.some(function (button) {
      return button.getAttribute("data-topic") === requestedTopic;
    });

    activeTopic = validTopic ? requestedTopic : "";
    queryInput.value = params.get("q") || "";
    kindSelect.value = params.get("type") || "";
    if (!kindSelect.value) kindSelect.value = "";
    sortSelect.value = params.get("sort") || defaultSort;
    if (!sortSelect.value) sortSelect.value = defaultSort;
  }

  function writeUrlState() {
    var url = new URL(window.location.href);
    var query = queryInput.value.trim();
    var kind = kindSelect.value;
    var sort = sortSelect.value;

    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");

    if (activeTopic) url.searchParams.set("topic", activeTopic);
    else url.searchParams.delete("topic");

    if (kind) url.searchParams.set("type", kind);
    else url.searchParams.delete("type");

    if (sort && sort !== defaultSort) url.searchParams.set("sort", sort);
    else url.searchParams.delete("sort");

    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  function updateTopicCounts() {
    var allCount = library.querySelector('[data-topic-count="all"]');
    if (allCount) allCount.textContent = cards.length;

    topicButtons.forEach(function (button) {
      var topic = button.getAttribute("data-topic");
      if (!topic) return;
      var count = cards.filter(function (card) {
        return card.topicList.indexOf(topic) !== -1;
      }).length;
      var countNode = library.querySelector('[data-topic-count="' + topic + '"]');
      if (countNode) countNode.textContent = count;
    });
  }

  function resetState() {
    activeTopic = "";
    queryInput.value = "";
    kindSelect.value = "";
    sortSelect.value = defaultSort;
  }

  function render(updateUrl) {
    var terms = normalize(queryInput.value).split(" ").filter(Boolean);
    var selectedKind = kindSelect.value;
    var selectedSort = sortSelect.value || defaultSort;
    var visible = 0;
    var visibleWithMetric = 0;

    sortCards();

    cards.forEach(function (card) {
      var matchesQuery = terms.every(function (term) {
        return card.searchText.indexOf(term) !== -1;
      });
      var matchesTopic = !activeTopic || card.topicList.indexOf(activeTopic) !== -1;
      var matchesKind = !selectedKind || card.getAttribute("data-kind") === selectedKind;
      var matches = matchesQuery && matchesTopic && matchesKind;

      card.hidden = !matches;
      if (matches) {
        visible += 1;
        if (selectedSort.indexOf("citations-") === 0 && card.sortCitations !== null) visibleWithMetric += 1;
        if (selectedSort.indexOf("paper-year-") === 0 && card.sortPaperYear !== null) visibleWithMetric += 1;
      }
    });

    topicButtons.forEach(function (button) {
      var selected = button.getAttribute("data-topic") === activeTopic;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    status.textContent = "显示 " + visible + " / " + cards.length + " 篇文献";
    if (selectedSort.indexOf("citations-") === 0) status.textContent += " · " + visibleWithMetric + " 篇有引用数据";
    if (selectedSort.indexOf("paper-year-") === 0) status.textContent += " · " + visibleWithMetric + " 篇有年份数据";
    emptyState.hidden = visible !== 0;
    clearButton.disabled = !queryInput.value && !activeTopic && !selectedKind && selectedSort === defaultSort;

    if (updateUrl !== false) writeUrlState();
  }

  topicButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeTopic = button.getAttribute("data-topic") || "";
      render();
    });
  });

  queryInput.addEventListener("input", function () {
    render();
  });

  kindSelect.addEventListener("change", function () {
    render();
  });

  sortSelect.addEventListener("change", function () {
    render();
  });

  clearButton.addEventListener("click", function () {
    resetState();
    render();
    queryInput.focus();
  });

  document.addEventListener("keydown", function (event) {
    var target = event.target;
    var isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
    var hasState = queryInput.value || activeTopic || kindSelect.value || sortSelect.value !== defaultSort;

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      queryInput.focus();
    }

    if (event.key === "Escape" && hasState) {
      resetState();
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
