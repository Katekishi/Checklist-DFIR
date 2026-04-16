const storageKey = "dfir-checklist-state-v2";
const sectionsEl = document.getElementById("sections");
const searchInput = document.getElementById("searchInput");
const mitreFilter = document.getElementById("mitreFilter");
const statusFilter = document.getElementById("statusFilter");
const osFilterRadios = document.getElementById("osFilterRadios");
const tagFilter = document.getElementById("tagFilter");
const sortSelect = document.getElementById("sortSelect");
const advancedFiltersButton = document.getElementById("advancedFiltersButton");
const advancedFiltersPanel = document.getElementById("advancedFiltersPanel");
const gridViewButton = document.getElementById("gridViewButton");
const listViewButton = document.getElementById("listViewButton");
const toggleSectionsButton = document.getElementById("toggleSectionsButton");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const exportButton = document.getElementById("exportButton");
const resetButton = document.getElementById("resetButton");
const emptyState = document.getElementById("emptyState");
const artifactOverlay = document.getElementById("artifactOverlay");
const overlayContent = document.getElementById("overlayContent");
const overlayTitle = document.getElementById("overlayTitle");
const overlaySubtitle = document.getElementById("overlaySubtitle");
const overlayCloseButton = document.getElementById("overlayCloseButton");
const resetDialog = document.getElementById("resetDialog");
const resetDialogConfirmButton = document.getElementById("resetDialogConfirmButton");
const resetDialogCancelButton = document.getElementById("resetDialogCancelButton");
const resetDialogCloseButton = document.getElementById("resetDialogCloseButton");
const aiClearHistoryDialog = document.getElementById("aiClearHistoryDialog");
const aiClearHistoryDialogConfirmButton = document.getElementById("aiClearHistoryDialogConfirmButton");
const aiClearHistoryDialogCancelButton = document.getElementById("aiClearHistoryDialogCancelButton");
const aiClearHistoryDialogCloseButton = document.getElementById("aiClearHistoryDialogCloseButton");
const detailInsertDialog = document.getElementById("detailInsertDialog");
const detailInsertForm = document.getElementById("detailInsertForm");
const detailInputElements = Array.from(document.querySelectorAll("[data-detail-input]"));
const detailInsertCancelButton = document.getElementById("detailInsertCancelButton");
const detailInsertCloseButton = document.getElementById("detailInsertCloseButton");
const shortcutDialog = document.getElementById("shortcutDialog");
const shortcutDialogCloseButton = document.getElementById("shortcutDialogCloseButton");
const tutorialDialog = document.getElementById("tutorialDialog");
const tutorialDialogBody = document.getElementById("tutorialDialogBody");
const tutorialDialogTitle = document.getElementById("tutorialDialogTitle");
const tutorialDialogSubtitle = document.getElementById("tutorialDialogSubtitle");
const tutorialDialogCloseButton = document.getElementById("tutorialDialogCloseButton");
const lastSavedLabel = document.getElementById("lastSavedLabel");
const overallProgressBar = document.getElementById("overallProgressBar");
const overallProgressCopy = document.getElementById("overallProgressCopy");
const overallStatusLegend = document.getElementById("overallStatusLegend");
const overallTagLegend = document.getElementById("overallTagLegend");
const pageEl = document.querySelector(".page");
const menuToggleButton = document.getElementById("menuToggleButton");
const appSidebarBackdrop = document.getElementById("appSidebarBackdrop");
const appSidebar = document.querySelector(".app-sidebar");
const appNavButtons = Array.from(document.querySelectorAll('[data-action="switch-app-view"]'));
const overviewView = document.getElementById("overviewView");
const casesView = document.getElementById("casesView");
const artifactsView = document.getElementById("artifactsView");
const aiView = document.getElementById("aiView");
const aiModelSelect = document.getElementById("aiModelSelect");
const aiContextLengthInput = document.getElementById("aiContextLengthInput");
const aiContextLengthSlider = document.getElementById("aiContextLengthSlider");
const aiContextMinLabel = document.getElementById("aiContextMinLabel");
const aiContextMaxLabel = document.getElementById("aiContextMaxLabel");
const aiContextHint = document.getElementById("aiContextHint");
const aiModelRefreshButton = document.getElementById("aiModelRefreshButton");
const aiSessionPill = document.getElementById("aiSessionPill");
const aiSessionToggleButton = document.getElementById("aiSessionToggleButton");
const aiSessionRefreshButton = document.getElementById("aiSessionRefreshButton");
const aiRuntimeSections = document.getElementById("aiRuntimeSections");
const aiModelLoadingPlaceholder = document.getElementById("aiModelLoadingPlaceholder");
const aiModelLoadingCopy = document.getElementById("aiModelLoadingCopy");
const aiModelLoadingElapsed = document.getElementById("aiModelLoadingElapsed");
const aiBackendStatusText = document.getElementById("aiBackendStatusText");
const aiBackendStatusLabel = document.getElementById("aiBackendStatusLabel");
const aiEvidencePathInput = document.getElementById("aiEvidencePathInput");
const aiExecutionTargetInput = document.getElementById("aiExecutionTargetInput");
const aiIocInput = document.getElementById("aiIocInput");
const aiMcpOrdersInput = document.getElementById("aiMcpOrdersInput");
const aiArtifactSelectionList = document.getElementById("aiArtifactSelectionList");
const aiSelectedArtifactsCopy = document.getElementById("aiSelectedArtifactsCopy");
const aiSelectAllArtifactsButton = document.getElementById("aiSelectAllArtifactsButton");
const aiClearArtifactsButton = document.getElementById("aiClearArtifactsButton");
const aiToggleAllMitreButton = document.getElementById("aiToggleAllMitreButton");
const aiOpenChatButton = document.getElementById("aiOpenChatButton");
const aiAnalyzeButton = document.getElementById("aiAnalyzeButton");
const aiInvestigationOutputSection = document.getElementById("aiInvestigationOutputSection");
const aiInlineChatComposer = document.getElementById("aiInlineChatComposer");
const aiInlineChatInput = document.getElementById("aiInlineChatInput");
const aiInlineChatApplyUpdatesCheckbox = document.getElementById("aiInlineChatApplyUpdatesCheckbox");
const aiInlineChatSendButton = document.getElementById("aiInlineChatSendButton");
const aiInlineChatClearHistoryButton = document.getElementById("aiInlineChatClearHistoryButton");
const aiChatHistory = document.getElementById("aiChatHistory");
const aiStatusText = document.getElementById("aiStatusText");
const aiTokenChunksText = document.getElementById("aiTokenChunksText");
const aiProcessingStatus = document.getElementById("aiProcessingStatus");
const aiProcessingStatusLabel = document.getElementById("aiProcessingStatusLabel");
const aiProcessingStatusPercent = document.getElementById("aiProcessingStatusPercent");
const aiProcessingStatusTrack = document.getElementById("aiProcessingStatusTrack");
const aiProcessingStatusBar = document.getElementById("aiProcessingStatusBar");
const aiModelLoadedText = document.getElementById("aiModelLoadedText");
const aiThinkingCard = document.getElementById("aiThinkingCard");
const aiThinkingStatusLabel = document.getElementById("aiThinkingStatusLabel");
const aiThinkingToggleButton = document.getElementById("aiThinkingToggleButton");
const aiThinkingOutput = document.getElementById("aiThinkingOutput");
const aiFindingsOutput = document.getElementById("aiFindingsOutput");
const aiPromptEditorButton = document.getElementById("aiPromptEditorButton");
const aiPromptDialog = document.getElementById("aiPromptDialog");
const aiPromptDialogCloseButton = document.getElementById("aiPromptDialogCloseButton");
const aiPromptDialogCancelButton = document.getElementById("aiPromptDialogCancelButton");
const aiPromptDialogResetButton = document.getElementById("aiPromptDialogResetButton");
const aiPromptDialogSaveButton = document.getElementById("aiPromptDialogSaveButton");
const aiSystemPromptInput = document.getElementById("aiSystemPromptInput");
const aiUserPromptInput = document.getElementById("aiUserPromptInput");
const aiPromptPreviewOutput = document.getElementById("aiPromptPreviewOutput");

const AI_DEFAULTS = {
  backendBaseUrl: "http://127.0.0.1:8787",
  launcherBaseUrl: "http://127.0.0.1:8790",
  lmstudioBaseUrl: "http://127.0.0.1:1234/v1",
  contextLength: 0,
  idleTimeoutMinutes: 20,
  mcpCommand: "/home/rem/Desktop/Checklist/winforensics-mcp/.venv/bin/python -m winforensics_mcp.server"
};
const artifactEditorForm = document.getElementById("artifactEditorForm");
const artifactEditorIdInput = document.getElementById("artifactEditorId");
const artifactEditorOsInput = document.getElementById("artifactEditorOs");
const artifactEditorOsTokenField = document.getElementById("artifactEditorOsTokenField");
const artifactEditorOsChipList = document.getElementById("artifactEditorOsChipList");
const artifactEditorOsComposerInput = document.getElementById("artifactEditorOsComposer");
const artifactEditorMitreInput = document.getElementById("artifactEditorMitre");
const artifactEditorMitreTokenField = document.getElementById("artifactEditorMitreTokenField");
const artifactEditorMitreChipList = document.getElementById("artifactEditorMitreChipList");
const artifactEditorMitreSelector = document.getElementById("artifactEditorMitreSelector");
const artifactEditorTagsInput = document.getElementById("artifactEditorTags");
const artifactEditorTagsTokenField = document.getElementById("artifactEditorTagsTokenField");
const artifactEditorTagsChipList = document.getElementById("artifactEditorTagsChipList");
const artifactEditorTagsComposerInput = document.getElementById("artifactEditorTagsComposer");
const artifactEditorNameInput = document.getElementById("artifactEditorName");
const artifactEditorLocationTokenField = document.getElementById("artifactEditorLocationTokenField");
const artifactEditorLocationChipList = document.getElementById("artifactEditorLocationChipList");
const artifactEditorLocationComposerInput = document.getElementById("artifactEditorLocationComposer");
const artifactEditorLocationInput = document.getElementById("artifactEditorLocation");
const artifactEditorToolTokenField = document.getElementById("artifactEditorToolTokenField");
const artifactEditorToolChipList = document.getElementById("artifactEditorToolChipList");
const artifactEditorToolComposerInput = document.getElementById("artifactEditorToolComposer");
const artifactEditorToolInput = document.getElementById("artifactEditorTool");
const artifactEditorInstructionsInput = document.getElementById("artifactEditorInstructions");
const artifactEditorResetButton = document.getElementById("artifactEditorResetButton");
const artifactEditorSubmitButton = document.getElementById("artifactEditorSubmitButton");
const artifactEditorList = document.getElementById("artifactEditorList");
const artifactEditorCount = document.getElementById("artifactEditorCount");
const artifactEditorHint = document.getElementById("artifactEditorHint");
const artifactEditorAutoSuggestConfig = [
  { input: artifactEditorOsComposerInput, key: "os", mode: "os" },
  { input: artifactEditorTagsComposerInput, key: "tags", mode: "tags" },
  { input: artifactEditorNameInput, key: "artifact", mode: "single" },
  { input: artifactEditorLocationComposerInput, key: "location", mode: "paths" },
  { input: artifactEditorToolComposerInput, key: "tool", mode: "tools" }
].filter((config) => config.input);

const overlayTransitionMs = 280;
const detailTransitionMs = 560;
const detailExpandedMaxHeight = 430;
const cardUpdateFlashMs = 220;
const recentUpdateWindowMs = 1000 * 60 * 60 * 24;
const artifactDataStorageKey = "dfir-checklist-artifacts-v1";

let overlayCloseTimer = 0;
let resetDialogCloseTimer = 0;
let aiClearHistoryDialogCloseTimer = 0;
let detailDialogCloseTimer = 0;
let shortcutDialogCloseTimer = 0;
let aiPromptDialogCloseTimer = 0;
let tutorialDialogCloseTimer = 0;
let filterRenderTimer = 0;
let filterPersistTimer = 0;
let stateSaveTimer = 0;
let pendingRenderFocusState = null;
let activeAppView = "cases";
let isSidebarOpen = false;
let activeOverlayArtifactId = null;
let activeTutorialArtifactId = null;
let showTutorialBranches = false;
let activeTutorialTool = "";
let aiSessionStatus = { active: false };
let aiBackendOnline = false;
let aiBackendPollTimer = 0;
let aiIsStartingSession = false;
let aiPromptOverrides = {
  systemPromptOverride: "",
  userPromptOverride: ""
};
let aiPromptPreviewTimer = 0;
let aiModelLoadTimer = 0;
let aiModelLoadStartedAt = 0;
let aiModelContextSpecs = new Map();
let aiContextSliderDragging = false;
const aiSelectedArtifactIds = new Set();
const aiCollapsedMitreGroups = new Set();
const aiSeenMitreGroups = new Set();
let aiThinkingCollapsed = false;
let aiActiveAnalyzeAbortController = null;
let aiAnalyzeInProgress = false;
let aiUiBusy = false;
let aiNextAnalyzeResponseMode = "";
let aiNextAnalyzeOrdersOverride = "";
let aiNextAnalyzeSelectedArtifactsOverride = null;
let aiConversationHistory = [];
let artifactEditorOsChips = [];
let artifactEditorMitreChips = [];
let artifactEditorTagChips = [];
let artifactEditorLocationChips = [];
let artifactEditorToolChips = [];
let tutorialMapViewportEl = null;
let tutorialMapCanvasEl = null;
const expandedTutorialStepKeys = new Set();
let lastFocusedElement = null;
let hasBuiltLayout = false;
let detailInsertTargetArtifactId = "";
const tutorialMapState = {
  x: 28,
  y: 24,
  scale: 1,
  minScale: 0.65,
  maxScale: 1.85,
  isDragging: false,
  pointerId: null,
  dragStartX: 0,
  dragStartY: 0,
  dragOriginX: 0,
  dragOriginY: 0,
  moved: false,
  clickBlockUntil: 0
};
const expandedArtifactIds = new Set();
const sectionRegistry = new Map();
const artifactRegistry = new Map();

if (window.location.protocol === "file:") {
  const target = "http://127.0.0.1:8790/dfir-checklist.html";
  if (window.location.href !== target) {
    window.location.replace(target);
  }
}

if (aiRuntimeSections) {
  aiRuntimeSections.classList.remove("is-visible");
  aiRuntimeSections.setAttribute("aria-hidden", "true");
}

if (aiModelLoadingPlaceholder) {
  aiModelLoadingPlaceholder.classList.add("is-hidden");
}

if (aiModelLoadingElapsed) {
  aiModelLoadingElapsed.textContent = "0.0s";
}

function startAiModelLoadTimer() {
  aiModelLoadStartedAt = performance.now();
  if (aiModelLoadTimer) {
    window.clearInterval(aiModelLoadTimer);
  }

  aiModelLoadTimer = window.setInterval(() => {
    if (!aiModelLoadingElapsed) {
      return;
    }
    const elapsedSeconds = (performance.now() - aiModelLoadStartedAt) / 1000;
    aiModelLoadingElapsed.textContent = `${elapsedSeconds.toFixed(1)}s`;
  }, 100);
}

function stopAiModelLoadTimer() {
  if (aiModelLoadTimer) {
    window.clearInterval(aiModelLoadTimer);
    aiModelLoadTimer = 0;
  }
  if (aiModelLoadingElapsed) {
    aiModelLoadingElapsed.textContent = "0.0s";
  }
}

loadPersistedArtifacts();

let mitreOrder = [];
let osOrder = [];
let tagOptions = [];
let tagTokenSet = new Set();

function refreshDerivedCollections() {
  mitreOrder = [...new Set(checklistData.flatMap((item) => splitArtifactEditorMitreValues(item.mitre)))];
  osOrder = [...new Set(checklistData.flatMap((item) => splitArtifactEditorOsValues(item.os)))];
  tagOptions = (() => {
  const canonicalByToken = new Map();
  checklistData.forEach((item) => {
    splitTags(item.tags).forEach((tag) => {
      const token = normalizeTagToken(tag);
      if (!token || canonicalByToken.has(token)) {
        return;
      }
      canonicalByToken.set(token, tag.replace(/\s+/g, " ").trim());
    });
  });

  return [...canonicalByToken.entries()]
    .map(([token, label]) => ({ token, label }))
    .sort((left, right) => left.label.localeCompare(right.label, undefined, { sensitivity: "base" }));
  })();
  tagTokenSet = new Set(tagOptions.map((tag) => tag.token));
}

refreshDerivedCollections();

const state = loadState();

function loadPersistedArtifacts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(artifactDataStorageKey) || "[]");
    if (!Array.isArray(parsed) || !parsed.length) {
      return;
    }

    const sanitized = parsed
      .filter((item) => item && typeof item === "object")
      .map((item, index) => ({
        id: typeof item.id === "string" && item.id.trim() ? item.id.trim() : `artifact-custom-${index + 1}`,
        os: String(item.os || "").trim(),
        mitre: String(item.mitre || "").trim(),
        tags: String(item.tags || "").trim(),
        artifact: String(item.artifact || "").trim(),
        location: String(item.location || "").trim(),
        tool: String(item.tool || "").trim(),
        instructions: String(item.instructions || "").trim()
      }))
      .filter((item) => item.os && item.mitre && item.tags && item.artifact && item.location && item.tool && item.instructions);

    if (!sanitized.length) {
      return;
    }

    checklistData.splice(0, checklistData.length, ...sanitized);
  } catch {
    // Ignore invalid stored data and keep bundled checklist.
  }
}

function saveArtifactsData() {
  try {
    localStorage.setItem(artifactDataStorageKey, JSON.stringify(checklistData));
  } catch {
    // Ignore storage write failures in restricted browser contexts.
  }
}

const detailFieldDefinitions = {
  path: { label: "Path", placeholder: "C:\\\\Windows\\\\Temp\\\\file.exe" },
  registry: { label: "Registry", placeholder: "HKCU\\\\Software\\\\..." },
  hash: { label: "SHA256", placeholder: "abcdef1234..." },
  ip: { label: "IP/Domain/URL", placeholder: "10.10.10.5 or suspicious.example" },
  user: { label: "Username", placeholder: "DOMAIN\\\\username" },
  process: { label: "Process", placeholder: "powershell.exe -enc ..." },
  service: { label: "Service/Task", placeholder: "SuspiciousService / TaskName" },
  timestamp: { label: "Timestamp", placeholder: "2026-03-26 14:33 UTC" }
};

const artifactStatuses = {
  "not-started": { label: "Not started", colorClass: "status-not-started", sortRank: 3 },
  "in-progress": { label: "In progress", colorClass: "status-in-progress", sortRank: 1 },
  "needs-review": { label: "Needs investigation", colorClass: "status-needs-review", sortRank: 2 },
  completed: { label: "Completed", colorClass: "status-completed", sortRank: 0 }
};

const artifactStatusOrder = ["completed", "in-progress", "needs-review", "not-started"];
const artifactStatusClassList = [
  "is-status-completed",
  "is-status-in-progress",
  "is-status-needs-review",
  "is-status-not-started",
  "is-found"
];

function splitTags(rawTags) {
  return String(rawTags || "")
    .split(/[\/,|;]+/g)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function splitArtifactEditorOsValues(rawOs) {
  return String(rawOs || "")
    .split(/(?:\r?\n|,|\||;|\/)+/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function splitArtifactEditorMitreValues(rawMitre) {
  return String(rawMitre || "")
    .split(/(?:\r?\n|,|\||;|\/)+/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function getPrimaryMitreValue(rawMitre) {
  return splitArtifactEditorMitreValues(rawMitre)[0] || "";
}

function splitArtifactEditorToolValues(rawTool) {
  return String(rawTool || "")
    .split(/(?:\r?\n|,|\||;|\/)+/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function normalizeTagToken(tag) {
  return String(tag || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getItemTagTokens(rawTags) {
  return splitTags(rawTags).map((tag) => normalizeTagToken(tag)).filter(Boolean);
}

function getSelectedTagFilterToken() {
  if (!tagFilter || tagFilter.value === "all") {
    return "all";
  }

  const selectedOption = tagFilter.options[tagFilter.selectedIndex];
  const labelToken = normalizeTagToken(selectedOption?.textContent || "");
  const valueToken = normalizeTagToken(tagFilter.value);

  if (labelToken && labelToken !== "all tags") {
    return labelToken;
  }

  return valueToken || "all";
}

function renderTagPills(rawTags) {
  const tags = splitTags(rawTags);
  if (!tags.length) {
    return '<span class="tag">No tags</span>';
  }

  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderDetailListValue(rawValue, splitFn) {
  const values = getUniqueSortedValues(splitFn(rawValue));
  if (!values.length) {
    return escapeHtml(String(rawValue || ""));
  }

  if (values.length === 1) {
    return escapeHtml(values[0]);
  }

  return `
    <ul class="detail-value-list">
      ${values.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
    </ul>
  `;
}

function isStrictTagMatch(item, selectedTag) {
  const selectedTagToken = normalizeTagToken(selectedTag);
  if (!selectedTagToken) {
    return true;
  }

  const tagTokens = getItemTagTokens(item.tags);
  return tagTokens.includes(selectedTagToken);
}

function normalizeArtifactStatus(rawStatus, legacyFound = false) {
  const normalized = String(rawStatus || "").trim().toLowerCase().replace(/[_\s]+/g, "-");

  if (artifactStatuses[normalized]) {
    return normalized;
  }

  if (["found", "done", "complete", "completed", "comlpeted", "resolved", "closed"].includes(normalized)) {
    return "completed";
  }

  if (["needs-review", "needs-investigation", "needs-investigaiton", "review", "investigate", "needsinvestigation"].includes(normalized)) {
    return "needs-review";
  }

  if (["in-progress", "progress", "started", "working"].includes(normalized)) {
    return "in-progress";
  }

  if (["pending", "todo", "not-started", "notstarted", "new", "n/a", "na"].includes(normalized)) {
    return "not-started";
  }

  return legacyFound ? "completed" : "not-started";
}

function normalizeLooseText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findChecklistItemForAiUpdate(update) {
  const updateArtifactRaw = String(update?.artifact || update?.artifact_id || update?.id || "").trim();
  if (!updateArtifactRaw) {
    return null;
  }

  const exactId = checklistData.find((entry) => String(entry.id || "").trim() === updateArtifactRaw);
  if (exactId) {
    return exactId;
  }

  const updateLoose = normalizeLooseText(updateArtifactRaw);
  if (!updateLoose) {
    return null;
  }

  const exactName = checklistData.find((entry) => normalizeLooseText(entry.artifact) === updateLoose);
  if (exactName) {
    return exactName;
  }

  const containsMatch = checklistData.find((entry) => {
    const candidate = normalizeLooseText(entry.artifact);
    return candidate.includes(updateLoose) || updateLoose.includes(candidate);
  });
  if (containsMatch) {
    return containsMatch;
  }

  return null;
}

function isGenericEvidenceText(text) {
  const normalized = normalizeLooseText(text);
  if (!normalized) {
    return true;
  }

  const genericPhrases = [
    "suspicious path",
    "possible indicator",
    "general anomaly",
    "potentially malicious",
    "review recommended",
    "see logs",
    "no specific evidence"
  ];

  return genericPhrases.some((phrase) => normalized.includes(phrase));
}

function getMcpEvidenceForArtifact(item, mcpActivity) {
  if (!item || !mcpActivity || !Array.isArray(mcpActivity.trace)) {
    return [];
  }

  const itemId = String(item.id || "").trim();
  const itemName = normalizeLooseText(item.artifact);

  return mcpActivity.trace
    .filter((entry) => entry && typeof entry === "object")
    .filter((entry) => {
      const traceId = String(entry.artifact_id || "").trim();
      const traceName = normalizeLooseText(entry.artifact || "");
      return traceId === itemId || (itemName && traceName && (traceName.includes(itemName) || itemName.includes(traceName)));
    })
    .map((entry) => {
      const tool = String(entry.tool || "mcp-tool").trim();
      const excerpt = String(entry.result_excerpt || "").trim();
      if (!excerpt || isGenericEvidenceText(excerpt)) {
        return "";
      }
      const firstLine = excerpt.split(/\r?\n/)[0].slice(0, 280).trim();
      return firstLine ? `${tool}: ${firstLine}` : "";
    })
    .filter(Boolean)
    .slice(0, 4);
}

function normalizeFilterStatus(rawStatus) {
  if (rawStatus === "all" || rawStatus === "commented") {
    return rawStatus;
  }

  return normalizeArtifactStatus(rawStatus, false);
}

function normalizeTagFilterValue(rawTag) {
  if (rawTag === "all") {
    return "all";
  }

  const token = normalizeTagToken(rawTag);
  return tagTokenSet.has(token) ? token : "all";
}

function getEntryStatus(entry) {
  return normalizeArtifactStatus(entry?.status, Boolean(entry?.found));
}

function getStatusLabel(status) {
  return artifactStatuses[status]?.label || artifactStatuses["not-started"].label;
}

function getStatusSortRank(status) {
  return artifactStatuses[status]?.sortRank ?? artifactStatuses["not-started"].sortRank;
}

function applyCardStatusClass(card, status) {
  if (!card) {
    return;
  }

  artifactStatusClassList.forEach((className) => card.classList.remove(className));
  card.classList.add(`is-status-${status}`);
  if (status === "completed") {
    card.classList.add("is-found");
  }
}

function getStatusCounts(items) {
  const counts = {
    completed: 0,
    "in-progress": 0,
    "needs-review": 0,
    "not-started": 0
  };

  items.forEach((item) => {
    const status = getEntryStatus(getEntry(item.id));
    counts[status] += 1;
  });

  return counts;
}

function renderSectionProgressBreakdown(sectionData, statusCounts, totalItems) {
  const segmentsHost = sectionData?.section?.querySelector(".summary-progress-segments");
  const legendHost = sectionData?.section?.querySelector(".summary-progress-legend");
  if (!segmentsHost && !legendHost) {
    return;
  }

  if (segmentsHost) {
    const segmentsMarkup = artifactStatusOrder
      .map((status) => {
        const value = statusCounts[status] || 0;
        const width = totalItems ? (value / totalItems) * 100 : 0;
        return `<span class="summary-progress-segment ${artifactStatuses[status].colorClass}" style="width:${width}%" title="${getStatusLabel(status)}: ${value}"></span>`;
      })
      .join("");

    segmentsHost.innerHTML = segmentsMarkup;
  }

  if (legendHost) {
    legendHost.innerHTML = artifactStatusOrder
      .map((status) => {
        const value = statusCounts[status] || 0;
        return `
          <span class="summary-progress-legend-item">
            <span class="summary-progress-dot ${artifactStatuses[status].colorClass}" aria-hidden="true"></span>
            <span>${getStatusLabel(status)}: <strong>${value}</strong></span>
          </span>
        `;
      })
      .join("");
  }
}

function getStatusSelectMarkup(action, artifactId, selectedStatus, className = "") {
  const options = artifactStatusOrder
    .map((status) => `<option value="${status}" ${selectedStatus === status ? "selected" : ""}>${getStatusLabel(status)}</option>`)
    .join("");

  return `
    <select class="status-select ${className}" data-action="${escapeHtml(action)}" data-artifact-id="${escapeHtml(artifactId)}" aria-label="Artifact status">
      ${options}
    </select>
  `;
}

function getDefaultFilters() {
  return {
    query: "",
    mitre: "all",
    status: "all",
    os: "all",
    tag: "all",
    sort: "default",
    exportScope: "all"
  };
}

function sanitizeFilters(input) {
  const defaults = getDefaultFilters();
  const normalizedSort = input?.sort === "found-first" ? "completed-first" : (input?.sort || defaults.sort);
  return {
    query: String(input?.query || ""),
    mitre: input?.mitre || defaults.mitre,
    status: normalizeFilterStatus(input?.status || defaults.status),
    os: input?.os || defaults.os,
    tag: normalizeTagFilterValue(input?.tag || defaults.tag),
    sort: normalizedSort,
    exportScope: input?.exportScope || defaults.exportScope
  };
}

function sanitizeCollapsedSections(input) {
  if (!input || typeof input !== "object") {
    return {};
  }

  const sanitized = {};
  Object.entries(input).forEach(([mitreName, isCollapsed]) => {
    if (typeof mitreName === "string") {
      sanitized[mitreName] = Boolean(isCollapsed);
    }
  });

  return sanitized;
}

function getDefaultCollapsedSections() {
  const collapsed = {};
  mitreOrder.forEach((mitreName) => {
    if (mitreName) {
      collapsed[mitreName] = true;
    }
  });
  return collapsed;
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
    const persistedCollapsed = sanitizeCollapsedSections(parsed.collapsedSections);
    return {
      entries: typeof parsed.entries === "object" && parsed.entries ? parsed.entries : {},
      viewMode: parsed.viewMode === "list" ? "list" : "grid",
      filters: sanitizeFilters(parsed.filters),
      collapsedSections: {
        ...getDefaultCollapsedSections(),
        ...persistedCollapsed
      },
      advancedFiltersOpen: Boolean(parsed.advancedFiltersOpen),
      lastSavedAt: typeof parsed.lastSavedAt === "string" ? parsed.lastSavedAt : ""
    };
  } catch {
    return {
      entries: {},
      viewMode: "grid",
      filters: getDefaultFilters(),
      collapsedSections: getDefaultCollapsedSections(),
      advancedFiltersOpen: false,
      lastSavedAt: ""
    };
  }
}

function getSelectedOsFilterValue() {
  const selected = osFilterRadios?.querySelector('input[name="osFilterOption"]:checked');
  return selected?.value || "all";
}

function setSelectedOsFilterValue(value) {
  const normalizedValue = value || "all";
  const target = osFilterRadios?.querySelector(`input[name="osFilterOption"][value="${CSS.escape(normalizedValue)}"]`)
    || osFilterRadios?.querySelector('input[name="osFilterOption"][value="all"]');

  if (target) {
    target.checked = true;
  }
}

function setAdvancedFiltersOpen(open, persist = true) {
  const isOpen = Boolean(open);
  if (advancedFiltersPanel) {
    advancedFiltersPanel.classList.toggle("is-open", isOpen);
    advancedFiltersPanel.setAttribute("aria-hidden", String(!isOpen));
  }

  if (advancedFiltersButton) {
    advancedFiltersButton.setAttribute("aria-expanded", String(isOpen));
    advancedFiltersButton.classList.toggle("is-active", isOpen);
    advancedFiltersButton.title = isOpen ? "Hide advanced filters" : "Advanced filters";
    advancedFiltersButton.setAttribute("aria-label", isOpen ? "Hide advanced filters" : "Advanced filters");
  }

  state.advancedFiltersOpen = isOpen;
  if (persist) {
    saveState();
  }
}

function saveState() {
  try {
    state.lastSavedAt = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(state));
    updateLastSavedLabel();
  } catch {
    lastSavedLabel.textContent = "Save failed in this browser context";
  }
}

function scheduleStateSave() {
  window.clearTimeout(stateSaveTimer);
  stateSaveTimer = window.setTimeout(() => {
    saveState();
  }, 240);
}

function scheduleFilterPersistence() {
  window.clearTimeout(filterPersistTimer);
  filterPersistTimer = window.setTimeout(() => {
    saveState();
  }, 220);
}

function getEntry(id) {
  if (!state.entries[id]) {
    state.entries[id] = { status: "not-started", comment: "", details: [], updatedAt: "" };
  }

  const entry = state.entries[id];

  if (typeof state.entries[id].updatedAt !== "string") {
    state.entries[id].updatedAt = "";
  }

  if (!Array.isArray(state.entries[id].details)) {
    state.entries[id].details = [];
  }

  if (typeof state.entries[id].comment !== "string") {
    state.entries[id].comment = "";
  }

  state.entries[id].details = state.entries[id].details
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      id: typeof item.id === "string" ? item.id : `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: typeof item.type === "string" ? item.type : "",
      label: typeof item.label === "string" ? item.label : getDetailLabel(item.type),
      value: typeof item.value === "string" ? item.value : String(item.value ?? "")
    }))
    .filter((item) => item.value.trim());

  state.entries[id].status = normalizeArtifactStatus(entry.status, Boolean(entry.found));
  delete state.entries[id].found;

  return state.entries[id];
}

function hasNotes(entry) {
  const comment = typeof entry?.comment === "string" ? entry.comment.trim() : "";
  const details = Array.isArray(entry?.details) ? entry.details : [];
  return Boolean(comment) || details.length > 0;
}

function getDetailLabel(type) {
  return detailFieldDefinitions[type]?.label || "Detail";
}

function renderStructuredDetails(entry, artifactId) {
  if (!entry.details.length) {
    return "";
  }

  const items = entry.details
    .map((item) => `
      <div class="structured-detail-item">
        <div class="structured-detail-main">
          <span class="structured-detail-label">${escapeHtml(item.label || getDetailLabel(item.type))}</span>
          <code class="structured-detail-value">${escapeHtml(item.value || "")}</code>
        </div>
        <button class="structured-detail-remove" type="button" data-action="remove-detail" data-artifact-id="${escapeHtml(artifactId)}" data-detail-id="${escapeHtml(item.id || "")}" aria-label="Remove detail" title="Remove">×</button>
      </div>
    `)
    .join("");

  return `<div class="structured-details">${items}</div>`;
}

function markEntryUpdated(entry) {
  entry.updatedAt = new Date().toISOString();
}

function getInsertDetailButtonMarkup(artifactId) {
  return `
    <button class="comment-insert-btn" type="button" data-action="open-detail-dialog" data-artifact-id="${escapeHtml(artifactId)}" aria-label="Insert detail" title="Insert detail">
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M10 4v12"></path>
        <path d="M4 10h12"></path>
      </svg>
    </button>
  `;
}

function getGuidanceFlowButtonMarkup(artifactId) {
  return "";
}

function getStepTypeIconMarkup(type) {
  if (type === "location") {
    return `
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M10 17s5-4.6 5-8.2A5 5 0 0 0 5 8.8C5 12.4 10 17 10 17z"></path>
        <circle cx="10" cy="8" r="1.8"></circle>
      </svg>
    `;
  }

  if (type === "tooling") {
    return `
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M12.8 3.3a4 4 0 0 0 3.9 5.2l-6.6 6.6a2 2 0 1 1-2.8-2.8l6.6-6.6a4 4 0 0 0 5.2-3.9l-2.4 2.4-2.6-.4-.4-2.6 2.4-2.4z"></path>
      </svg>
    `;
  }

  if (type === "validation") {
    return `
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M4 10.5l3.5 3.5L16 6"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4 4h12"></path>
      <path d="M4 10h12"></path>
      <path d="M4 16h7"></path>
    </svg>
  `;
}

function parseConditionalBranches(stepText) {
  const text = String(stepText || "").trim();
  if (!text) {
    return [];
  }

  const keywordMatch = /(\bif\b|\bwhen\b|\belse\b|\bunless\b|\brequires\b|\boptional\b|אם|במידה|כאשר|אחרת|דורש|אופציונלי)/i.test(text);
  const alternatives = text
    .split(/\s+(?:or|או)\s+/i)
    .map((part) => part.trim())
    .filter((part) => part.length >= 10);

  if (alternatives.length >= 2) {
    return alternatives.slice(0, 3).map((option, index) => ({
      label: `Branch ${index + 1}`,
      description: option
    }));
  }

  if (keywordMatch) {
    return [
      {
        label: "Condition met",
        description: text
      },
      {
        label: "Condition unmet",
        description: "Pivot to neighboring artifacts and timeline evidence to validate or refute the same hypothesis."
      }
    ];
  }

  return [];
}

function detectLocationType(locationText) {
  const value = String(locationText || "").toLowerCase();
  if (!value) {
    return "source";
  }

  if (/hklm|hkcu|ntuser\.dat|usrclass\.dat|registry|\\services\\/.test(value)) {
    return "registry";
  }

  if (/\.evtx|event|\/var\/log|auth\.log|syslog|security\.evtx|operational\.evtx/.test(value)) {
    return "log";
  }

  if (/\.sqlite|\.db|database|sru/.test(value)) {
    return "database";
  }

  if (/\/proc\/net|tcp|udp|network|rdp|dns/.test(value)) {
    return "network";
  }

  if (/file|path|\\|\//.test(value)) {
    return "file";
  }

  return "source";
}

function getLocationStepTitle(locationText) {
  const locationType = detectLocationType(locationText);
  if (locationType === "registry") {
    return "Inspect registry source";
  }
  if (locationType === "log") {
    return "Review event and log source";
  }
  if (locationType === "database") {
    return "Open artifact database source";
  }
  if (locationType === "network") {
    return "Inspect network evidence source";
  }
  return "Locate artifact source";
}

function getToolCommandHints(toolText) {
  const normalized = String(toolText || "").toLowerCase();
  const commandSets = [
    {
      test: /(plaso|log2timeline|psort|timeline explorer)/,
      title: "Timeline collection",
      commands: [
        { command: "log2timeline.py timeline.plaso /evidence/path", note: "Build timeline from collected image or folder." },
        { command: "psort.py -o l2tcsv timeline.plaso > timeline.csv", note: "Export timeline for analyst pivots and filtering." }
      ]
    },
    {
      test: /(db browser|sqlite)/,
      title: "SQLite artifact review",
      commands: [
        { command: "sqlite3 <artifact.db> '.tables'", note: "List available tables before deeper analysis." },
        { command: "sqlite3 <artifact.db> 'SELECT * FROM urls LIMIT 20;'", note: "Quick sample query to verify expected evidence exists." }
      ]
    },
    {
      test: /(event log|evtx|evttxcmd|wevtutil)/,
      title: "Event log parsing",
      commands: [
        { command: "wevtutil qe Security /f:text /c:30", note: "Preview recent Security events quickly." },
        { command: "EvtTxCmd.exe -f <path_to_evtx> --csv out", note: "Export EVTX data to structured CSV for filtering." }
      ]
    },
    {
      test: /(registry explorer|regripper|appcompatcacheparser|amcacheparser)/,
      title: "Registry triage",
      commands: [
        { command: "rip.exe -r <hive_path> -p run", note: "Extract autorun evidence from a registry hive." },
        { command: "AppCompatCacheParser.exe --csv <output> <SYSTEM_hive>", note: "Parse ShimCache timeline candidates." }
      ]
    },
    {
      test: /(pecmd|prefetch)/,
      title: "Prefetch analysis",
      commands: [
        { command: "PECmd.exe -d C:\\Windows\\Prefetch --csv out", note: "Export Prefetch execution metadata." }
      ]
    },
    {
      test: /(srumecmd|srum)/,
      title: "SRUM analysis",
      commands: [
        { command: "SrumECmd.exe -f C:\\Windows\\System32\\sru\\SRUDB.dat --csv out", note: "Extract per-app network and energy usage evidence." }
      ]
    }
  ];

  const match = commandSets.find((set) => set.test.test(normalized));
  if (match) {
    return match;
  }

  return {
    title: "Tool runbook",
    commands: [
      { command: "<tool> --help", note: "Start with built-in help to confirm syntax and options." },
      { command: "<tool> <input_artifact> --output <report>", note: "Run the tool against this artifact and capture output." }
    ]
  };
}

function buildGuidanceSteps(item) {
  const guidance = refineGuidanceText(item?.instructions || "");
  const instructionSteps = guidance
    .split(/\s*;\s*/)
    .map((step) => step.trim())
    .filter(Boolean);

  const steps = [
    {
      title: getLocationStepTitle(item?.location),
      description: item?.location || "Use the artifact source listed in the checklist.",
      type: "location",
      branches: []
    },
    {
      title: "Open recommended tooling",
      description: item?.tool || "Open your preferred forensic tooling.",
      type: "tooling",
      branches: []
    }
  ];

  if (instructionSteps.length) {
    instructionSteps.forEach((step, index) => {
      steps.push({
        title: `Analysis step ${index + 1}`,
        description: step,
        type: "analysis",
        branches: parseConditionalBranches(step)
      });
    });
  } else {
    steps.push({
      title: "Review analyst guidance",
      description: guidance || "No additional guidance is available for this artifact yet.",
      type: "analysis",
      branches: []
    });
  }

  steps.push({
    title: "Validate and document",
    description: "Correlate findings with timeline, keep only corroborated evidence, and record final notes in the artifact comments.",
    type: "validation",
    branches: []
  });

  return steps;
}

function getFocusedStepDescription(text, maxWords = 22) {
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "";
  }

  const words = cleaned.split(" ");
  if (words.length <= maxWords) {
    return cleaned;
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
}

function getGuidanceDetailMarkup(item) {
  const guidance = refineGuidanceText(item.instructions);
  return `
    <dd>
      <div class="guidance-block">
        <p class="guidance-text" lang="he" dir="rtl">${escapeHtml(guidance)}</p>
        ${getGuidanceFlowButtonMarkup(item.id)}
      </div>
    </dd>
  `;
}

function syncCardStructuredDetails(artifactId) {
  const card = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"]`);
  if (!card) {
    return;
  }

  const wrapper = card.querySelector(".comment-form-wrapper");
  if (!wrapper) {
    return;
  }

  const entry = getEntry(artifactId);
  const existing = wrapper.querySelector(".structured-details");
  const rendered = renderStructuredDetails(entry, artifactId);

  if (!rendered) {
    existing?.remove();
    return;
  }

  if (existing) {
    existing.outerHTML = rendered;
    return;
  }

  const insertButton = wrapper.querySelector('[data-action="open-detail-dialog"]');
  if (insertButton) {
    insertButton.insertAdjacentHTML("afterend", rendered);
    return;
  }

  wrapper.insertAdjacentHTML("afterbegin", rendered);
}

function updateLastSavedLabel() {
  if (!state.lastSavedAt) {
    lastSavedLabel.textContent = "Not saved yet";
    return;
  }

  const saved = new Date(state.lastSavedAt);
  if (Number.isNaN(saved.getTime())) {
    lastSavedLabel.textContent = "Saved";
    return;
  }

  lastSavedLabel.textContent = `${saved.toLocaleDateString()} ${saved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function syncViewButtons() {
  const isListView = state.viewMode === "list";

  sectionsEl.dataset.view = state.viewMode;
  gridViewButton.classList.toggle("is-active", !isListView);
  gridViewButton.setAttribute("aria-pressed", String(!isListView));
  listViewButton.classList.toggle("is-active", isListView);
  listViewButton.setAttribute("aria-pressed", String(isListView));
}

function setViewMode(viewMode) {
  const normalizedViewMode = viewMode === "list" ? "list" : "grid";
  if (state.viewMode === normalizedViewMode) {
    syncViewButtons();
    return;
  }

  state.viewMode = normalizedViewMode;
  saveState();
  render();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineMarkdown(value) {
  const escaped = escapeHtml(value ?? "");
  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderSimpleMarkdown(value) {
  const normalized = normalizeMojibakeText(String(value ?? "")).replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return "";
  }

  const lines = normalized.split("\n");
  const htmlParts = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }
    htmlParts.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join("")}</ul>`);
    listItems = [];
  };

  lines.forEach((rawLine) => {
    const line = String(rawLine || "").trim();
    if (!line) {
      flushList();
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      listItems.push(renderInlineMarkdown(line.replace(/^[-*]\s+/, "")));
      return;
    }

    flushList();

    if (/^###\s+/.test(line)) {
      htmlParts.push(`<h5>${renderInlineMarkdown(line.replace(/^###\s+/, ""))}</h5>`);
      return;
    }

    if (/^##\s+/.test(line) || /^#\s+/.test(line)) {
      htmlParts.push(`<h4>${renderInlineMarkdown(line.replace(/^#{1,2}\s+/, ""))}</h4>`);
      return;
    }

    htmlParts.push(`<p>${renderInlineMarkdown(line)}</p>`);
  });

  flushList();
  return htmlParts.join("");
}

function refineGuidanceText(text) {
  return String(text ?? "")
    .replace(/^בדוק/g, "בדקו")
    .replace(/^חפש/g, "חפשו")
    .replace(/^סנן/g, "סננו")
    .replace(/^ווידוא/g, "אמתו")
    .replace(/; שים לב/g, "; שימו לב")
    .replace(/; בדוק/g, "; בדקו")
    .replace(/; חפש/g, "; חפשו")
    .replace(/לעתים/g, "לעיתים")
    .replace(/מסייע/g, "מסייע בזיהוי")
    .trim();
}

function findItemById(id) {
  return checklistData.find((item) => item.id === id) || null;
}

function syncBodyScrollLock() {
  const tutorialOpen = Boolean(tutorialDialog && !tutorialDialog.hidden);
  const promptDialogOpen = Boolean(aiPromptDialog && !aiPromptDialog.hidden);
  document.body.style.overflow = !artifactOverlay.hidden || !resetDialog.hidden || !aiClearHistoryDialog.hidden || !detailInsertDialog.hidden || !shortcutDialog.hidden || promptDialogOpen || tutorialOpen ? "hidden" : "";
}

function rememberFocus() {
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
}

function restoreFocus() {
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))
    .filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
}

function getTopOpenDialog() {
  if (tutorialDialog && !tutorialDialog.hidden) {
    return tutorialDialog;
  }

  if (aiPromptDialog && !aiPromptDialog.hidden) {
    return aiPromptDialog;
  }

  if (!resetDialog.hidden) {
    return resetDialog;
  }

  if (!aiClearHistoryDialog.hidden) {
    return aiClearHistoryDialog;
  }

  if (!detailInsertDialog.hidden) {
    return detailInsertDialog;
  }

  if (!shortcutDialog.hidden) {
    return shortcutDialog;
  }

  if (!artifactOverlay.hidden) {
    return artifactOverlay;
  }

  return null;
}

function trapFocus(event) {
  if (event.key !== "Tab") {
    return;
  }

  const dialog = getTopOpenDialog();
  if (!dialog) {
    return;
  }

  const focusableElements = getFocusableElements(dialog);
  if (!focusableElements.length) {
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function renderOverlay(item) {
  if (!item) {
    return;
  }

  if (artifactOverlay.hidden) {
    rememberFocus();
  }

  window.clearTimeout(overlayCloseTimer);
  activeOverlayArtifactId = item.id;
  const entry = getEntry(item.id);
  const artifactStatus = getEntryStatus(entry);
  const hasCommentText = hasNotes(entry);

  overlayTitle.textContent = item.artifact;
  overlaySubtitle.textContent = item.mitre;
  overlayContent.innerHTML = `
    <div class="overlay-meta" title="${escapeHtml(splitTags(item.tags).join(", ") || "No tags")}">
      ${renderTagPills(item.tags)}
      <span class="tag os-tag">${escapeHtml(item.os)}</span>
      ${hasCommentText ? '<span class="comment-pill">Notes added</span>' : ""}
    </div>
    <div class="overlay-status-row">
      ${getStatusSelectMarkup("overlay-set-status", item.id, artifactStatus, "status-select-overlay")}
      <div class="overlay-status-copy">Update triage status while reviewing notes and evidence details.</div>
    </div>
    <dl class="detail-list">
      <div class="detail-item">
        <dt>Location</dt>
        <dd>${renderDetailListValue(item.location, splitArtifactEditorLocationPaths)}</dd>
      </div>
      <div class="detail-item">
        <dt>Tooling</dt>
        <dd>${renderDetailListValue(item.tool, splitArtifactEditorToolValues)}</dd>
      </div>
      <div class="detail-item guidance">
        <dt>Analyst Guidance</dt>
        ${getGuidanceDetailMarkup(item)}
      </div>
    </dl>
    <div class="comment-section">
      <label class="comment-label" for="overlay-comment-${item.id}">Analyst comments</label>
      <div class="comment-form-wrapper">
        ${getInsertDetailButtonMarkup(item.id)}
        ${renderStructuredDetails(entry, item.id)}
        <textarea id="overlay-comment-${item.id}" data-action="overlay-comment-input" data-artifact-id="${escapeHtml(item.id)}" placeholder="Add findings, timestamps, hashes, usernames, or evidence notes here...">${escapeHtml(entry.comment)}</textarea>
      </div>
    </div>
  `;

  artifactOverlay.hidden = false;
  requestAnimationFrame(() => {
    artifactOverlay.classList.add("is-open");
  });
  syncBodyScrollLock();
  overlayCloseButton.focus();
}

function closeOverlay() {
  if (artifactOverlay.hidden) {
    return;
  }

  artifactOverlay.classList.remove("is-open");
  activeOverlayArtifactId = null;
  window.clearTimeout(overlayCloseTimer);

  overlayCloseTimer = window.setTimeout(() => {
    artifactOverlay.hidden = true;
    overlayContent.innerHTML = "";
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function openResetDialog() {
  rememberFocus();
  window.clearTimeout(resetDialogCloseTimer);
  resetDialog.hidden = false;

  requestAnimationFrame(() => {
    resetDialog.classList.add("is-open");
    syncBodyScrollLock();
    resetDialogCancelButton.focus();
  });
}

function closeResetDialog() {
  if (resetDialog.hidden) {
    return;
  }

  resetDialog.classList.remove("is-open");
  window.clearTimeout(resetDialogCloseTimer);

  resetDialogCloseTimer = window.setTimeout(() => {
    resetDialog.hidden = true;
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function openAiClearHistoryDialog() {
  if (!aiClearHistoryDialog) {
    return;
  }

  rememberFocus();
  window.clearTimeout(aiClearHistoryDialogCloseTimer);
  aiClearHistoryDialog.hidden = false;

  requestAnimationFrame(() => {
    aiClearHistoryDialog.classList.add("is-open");
    syncBodyScrollLock();
    aiClearHistoryDialogCancelButton?.focus();
  });
}

function closeAiClearHistoryDialog() {
  if (!aiClearHistoryDialog || aiClearHistoryDialog.hidden) {
    return;
  }

  aiClearHistoryDialog.classList.remove("is-open");
  window.clearTimeout(aiClearHistoryDialogCloseTimer);

  aiClearHistoryDialogCloseTimer = window.setTimeout(() => {
    aiClearHistoryDialog.hidden = true;
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function clearAiConversationHistory() {
  aiConversationHistory = [];
  renderAiConversationHistory();
  if (aiStatusText) {
    aiStatusText.textContent = "Chat history cleared. Starting a new chat.";
  }
  aiInlineChatInput?.focus();
}

function openDetailInsertDialog(artifactId) {
  if (!artifactId || !detailInsertDialog) {
    return;
  }

  rememberFocus();
  detailInsertTargetArtifactId = artifactId;
  window.clearTimeout(detailDialogCloseTimer);
  detailInsertDialog.hidden = false;

  if (detailInsertForm) {
    detailInsertForm.reset();
  }

  requestAnimationFrame(() => {
    detailInsertDialog.classList.add("is-open");
    syncBodyScrollLock();
    detailInputElements[0]?.focus();
  });
}

function closeDetailInsertDialog() {
  if (!detailInsertDialog || detailInsertDialog.hidden) {
    return;
  }

  detailInsertDialog.classList.remove("is-open");
  window.clearTimeout(detailDialogCloseTimer);

  detailDialogCloseTimer = window.setTimeout(() => {
    detailInsertDialog.hidden = true;
    detailInsertTargetArtifactId = "";
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function addStructuredDetail(artifactId, type, value) {
  const entry = getEntry(artifactId);
  entry.details.push({
    id: `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    label: getDetailLabel(type),
    value
  });
  markEntryUpdated(entry);
  saveState();
  updateCommentPills(artifactId, hasNotes(entry));
  render();
  syncCardStructuredDetails(artifactId);

  if (activeOverlayArtifactId === artifactId) {
    const item = findItemById(artifactId);
    renderOverlay(item);
  }
}

function addStructuredDetailsBatch(artifactId, detailItems) {
  if (!detailItems.length) {
    return;
  }

  const entry = getEntry(artifactId);
  detailItems.forEach(({ type, value }) => {
    entry.details.push({
      id: `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      label: getDetailLabel(type),
      value
    });
  });

  markEntryUpdated(entry);
  saveState();
  updateCommentPills(artifactId, hasNotes(entry));
  render();
  syncCardStructuredDetails(artifactId);

  const card = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"]`);
  const details = card?.querySelector(".artifact-details");
  if (details) {
    setDetailsExpanded(details, true);
  }

  if (activeOverlayArtifactId === artifactId) {
    const item = findItemById(artifactId);
    renderOverlay(item);
  }
}

function removeStructuredDetail(artifactId, detailId) {
  const previousPageScrollY = window.scrollY;
  const previousDetailScrollTop = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"] .artifact-body`)?.scrollTop || 0;

  const entry = getEntry(artifactId);
  const nextDetails = entry.details.filter((item) => item.id !== detailId);
  if (nextDetails.length === entry.details.length) {
    return;
  }

  entry.details = nextDetails;
  markEntryUpdated(entry);
  saveState();
  updateCommentPills(artifactId, hasNotes(entry));
  render();
  syncCardStructuredDetails(artifactId);

  requestAnimationFrame(() => {
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo(0, Math.min(previousPageScrollY, maxScrollY));

    const nextDetailBody = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"] .artifact-body`);
    if (!nextDetailBody) {
      return;
    }

    const maxDetailScrollTop = Math.max(0, nextDetailBody.scrollHeight - nextDetailBody.clientHeight);
    nextDetailBody.scrollTop = Math.min(previousDetailScrollTop, maxDetailScrollTop);
  });

  if (activeOverlayArtifactId === artifactId) {
    const item = findItemById(artifactId);
    renderOverlay(item);
  }
}

function openShortcutDialog() {
  rememberFocus();
  window.clearTimeout(shortcutDialogCloseTimer);
  shortcutDialog.hidden = false;

  requestAnimationFrame(() => {
    shortcutDialog.classList.add("is-open");
    syncBodyScrollLock();
    shortcutDialogCloseButton.focus();
  });
}

function closeShortcutDialog() {
  if (shortcutDialog.hidden) {
    return;
  }

  shortcutDialog.classList.remove("is-open");
  window.clearTimeout(shortcutDialogCloseTimer);

  shortcutDialogCloseTimer = window.setTimeout(() => {
    shortcutDialog.hidden = true;
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function clampTutorialMapScale(value) {
  return Math.max(tutorialMapState.minScale, Math.min(tutorialMapState.maxScale, value));
}

function getTutorialMapMetrics(scale = tutorialMapState.scale) {
  if (!tutorialMapViewportEl || !tutorialMapCanvasEl) {
    return null;
  }

  const viewportWidth = tutorialMapViewportEl.clientWidth;
  const viewportHeight = tutorialMapViewportEl.clientHeight;
  const contentWidth = tutorialMapCanvasEl.offsetWidth * scale;
  const contentHeight = tutorialMapCanvasEl.offsetHeight * scale;

  return {
    viewportWidth,
    viewportHeight,
    contentWidth,
    contentHeight
  };
}

function applyTutorialMapTransform(nextX, nextY, nextScale, animate = false) {
  if (!tutorialMapViewportEl || !tutorialMapCanvasEl) {
    return;
  }

  const scale = clampTutorialMapScale(nextScale);
  const metrics = getTutorialMapMetrics(scale);
  if (!metrics) {
    return;
  }

  const padding = 20;
  let x = nextX;
  let y = nextY;

  if (metrics.contentWidth <= metrics.viewportWidth - (padding * 2)) {
    x = (metrics.viewportWidth - metrics.contentWidth) / 2;
  } else {
    const maxX = padding;
    const minX = metrics.viewportWidth - metrics.contentWidth - padding;
    x = Math.min(maxX, Math.max(minX, x));
  }

  if (metrics.contentHeight <= metrics.viewportHeight - (padding * 2)) {
    y = (metrics.viewportHeight - metrics.contentHeight) / 2;
  } else {
    const maxY = padding;
    const minY = metrics.viewportHeight - metrics.contentHeight - padding;
    y = Math.min(maxY, Math.max(minY, y));
  }

  tutorialMapState.x = x;
  tutorialMapState.y = y;
  tutorialMapState.scale = scale;

  tutorialMapCanvasEl.style.transition = animate ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)" : "";
  tutorialMapCanvasEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

  const zoomReadout = tutorialDialogBody?.querySelector('[data-role="tutorial-map-zoom"]');
  if (zoomReadout) {
    zoomReadout.textContent = `${Math.round(scale * 100)}%`;
  }
}

function zoomTutorialMap(delta, anchorClientX, anchorClientY) {
  if (!tutorialMapViewportEl || !tutorialMapCanvasEl) {
    return;
  }

  const viewportRect = tutorialMapViewportEl.getBoundingClientRect();
  const nextScale = clampTutorialMapScale(tutorialMapState.scale + delta);
  const anchorX = anchorClientX - viewportRect.left;
  const anchorY = anchorClientY - viewportRect.top;
  const worldX = (anchorX - tutorialMapState.x) / tutorialMapState.scale;
  const worldY = (anchorY - tutorialMapState.y) / tutorialMapState.scale;
  const nextX = anchorX - (worldX * nextScale);
  const nextY = anchorY - (worldY * nextScale);

  applyTutorialMapTransform(nextX, nextY, nextScale);
}

function wireTutorialMap() {
  tutorialMapViewportEl = tutorialDialogBody?.querySelector('[data-role="tutorial-map-viewport"]') || null;
  tutorialMapCanvasEl = tutorialDialogBody?.querySelector('[data-role="tutorial-map-canvas"]') || null;
  if (!tutorialMapViewportEl || !tutorialMapCanvasEl || tutorialMapViewportEl.dataset.mapBound === "true") {
    return;
  }

  tutorialMapViewportEl.dataset.mapBound = "true";

  tutorialMapViewportEl.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest("button") || event.target.closest('[data-action="open-tool-details"]')) {
      return;
    }

    tutorialMapState.isDragging = true;
    tutorialMapState.pointerId = event.pointerId;
    tutorialMapState.dragStartX = event.clientX;
    tutorialMapState.dragStartY = event.clientY;
    tutorialMapState.dragOriginX = tutorialMapState.x;
    tutorialMapState.dragOriginY = tutorialMapState.y;
    tutorialMapState.moved = false;

    tutorialMapViewportEl.classList.add("is-dragging");
    tutorialMapViewportEl.setPointerCapture(event.pointerId);
  });

  tutorialMapViewportEl.addEventListener("pointermove", (event) => {
    if (!tutorialMapState.isDragging || tutorialMapState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - tutorialMapState.dragStartX;
    const deltaY = event.clientY - tutorialMapState.dragStartY;
    if (Math.abs(deltaX) > 7 || Math.abs(deltaY) > 7) {
      tutorialMapState.moved = true;
    }

    applyTutorialMapTransform(
      tutorialMapState.dragOriginX + deltaX,
      tutorialMapState.dragOriginY + deltaY,
      tutorialMapState.scale
    );
  });

  const finishDrag = (event) => {
    if (!tutorialMapState.isDragging || tutorialMapState.pointerId !== event.pointerId) {
      return;
    }

    if (tutorialMapViewportEl.hasPointerCapture(event.pointerId)) {
      tutorialMapViewportEl.releasePointerCapture(event.pointerId);
    }

    tutorialMapViewportEl.classList.remove("is-dragging");
    if (tutorialMapState.moved) {
      tutorialMapState.clickBlockUntil = Date.now() + 180;
    }

    tutorialMapState.isDragging = false;
    tutorialMapState.pointerId = null;
  };

  tutorialMapViewportEl.addEventListener("pointerup", finishDrag);
  tutorialMapViewportEl.addEventListener("pointercancel", finishDrag);
  tutorialMapViewportEl.addEventListener("click", (event) => {
    if (Date.now() < tutorialMapState.clickBlockUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  tutorialMapViewportEl.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomTutorialMap(event.deltaY < 0 ? 0.08 : -0.08, event.clientX, event.clientY);
  }, { passive: false });

  requestAnimationFrame(() => {
    applyTutorialMapTransform(tutorialMapState.x, tutorialMapState.y, tutorialMapState.scale);
  });
}

function openTutorialToolDetails(toolName) {
  if (!activeTutorialArtifactId) {
    return;
  }

  activeTutorialTool = toolName || "";
  const item = findItemById(activeTutorialArtifactId);
  renderTutorialDialog(item);

  requestAnimationFrame(() => {
    const toolPanel = tutorialDialogBody?.querySelector(".guidance-tool-details");
    toolPanel?.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
}

function renderTutorialDialog(item) {
  if (!item || !tutorialDialogBody || !tutorialDialogTitle || !tutorialDialogSubtitle) {
    return;
  }

  const tagList = splitTags(item.tags).join(" | ") || "No tags";
  const steps = buildGuidanceSteps(item).map((step) => {
    const existingBranches = Array.isArray(step.branches) ? step.branches : [];
    const scenarioBranches = [...existingBranches];

    if (!scenarioBranches.length && step.type === "tooling") {
      scenarioBranches.push(
        {
          label: "If primary tool is available",
          description: "Run the recommended parser first and capture baseline output for pivoting."
        },
        {
          label: "If primary tool is unavailable",
          description: "Switch to a secondary parser or native commands and keep the same evidence scope."
        }
      );
    }

    if (!scenarioBranches.length && step.type === "validation") {
      scenarioBranches.push(
        {
          label: "If evidence correlates",
          description: "Mark the artifact as completed and document final timeline anchors."
        },
        {
          label: "If evidence conflicts",
          description: "Set status to needs investigation and branch into neighboring artifacts."
        }
      );
    }

    return {
      ...step,
      conciseDescription: getFocusedStepDescription(step.description),
      branches: scenarioBranches
    };
  });
  const hasBranchableSteps = steps.some((step) => Array.isArray(step.branches) && step.branches.length > 0);
  const toolHints = activeTutorialTool ? getToolCommandHints(activeTutorialTool) : null;

  tutorialDialogTitle.textContent = `${item.artifact} walkthrough`;
  tutorialDialogSubtitle.textContent = `${item.mitre} | ${item.os} | ${tagList}`;
  tutorialDialogBody.innerHTML = `
    <p class="tutorial-intro">Follow this artifact flow to move from evidence collection to validated findings.</p>
    ${hasBranchableSteps ? `
      <div class="tutorial-controls">
        <button class="tutorial-branch-toggle" type="button" data-action="toggle-branch-paths" aria-pressed="${showTutorialBranches ? "true" : "false"}">
          ${showTutorialBranches ? "Hide conditional branches" : "Show conditional branches"}
        </button>
      </div>
    ` : ""}
    <div class="guidance-flow-map" aria-label="Step-by-step guidance map for ${escapeHtml(item.artifact)}">
      <div class="tutorial-map-toolbar" role="group" aria-label="Guide map controls">
        <p class="tutorial-map-tip">Drag to pan the guide map. Use zoom controls like a mini map.</p>
        <div class="tutorial-map-controls">
          <button class="tutorial-map-btn" type="button" data-action="tutorial-map-zoom-out" aria-label="Zoom out" title="Zoom out">−</button>
          <span class="tutorial-map-zoom" data-role="tutorial-map-zoom">100%</span>
          <button class="tutorial-map-btn" type="button" data-action="tutorial-map-zoom-in" aria-label="Zoom in" title="Zoom in">+</button>
          <button class="tutorial-map-btn tutorial-map-reset" type="button" data-action="tutorial-map-reset">Reset</button>
        </div>
      </div>
      <div class="tutorial-map-viewport" data-role="tutorial-map-viewport" aria-label="Draggable step map viewport">
        <div class="tutorial-map-canvas" data-role="tutorial-map-canvas">
          <div class="guidance-map-canvas" role="list">
            ${steps.map((step, index) => `
              ${(() => {
                const stepKey = `${item.id}:${index}`;
                const isExpanded = expandedTutorialStepKeys.has(stepKey);
                return `
              <article
                class="guidance-map-node guidance-map-node-${escapeHtml(step.type || "analysis")}${step.type === "tooling" ? " is-tool-node" : ""}${isExpanded ? " is-expanded" : ""}"
                role="listitem"
              >
                <span class="guidance-flow-index" aria-hidden="true">${index + 1}</span>
                <div class="guidance-flow-content">
                  <h3>
                    <span class="guidance-step-icon guidance-step-icon-${escapeHtml(step.type || "analysis")}" aria-hidden="true">${getStepTypeIconMarkup(step.type)}</span>
                    <span>${escapeHtml(step.title)}</span>
                  </h3>
                  <p class="guidance-step-summary">${escapeHtml(step.conciseDescription || step.description)}</p>
                  <button class="guidance-step-expand-btn" type="button" data-action="toggle-step-details" data-step-key="${escapeHtml(stepKey)}" aria-expanded="${isExpanded ? "true" : "false"}">
                    ${isExpanded ? "Hide details" : "Open details"}
                  </button>
                  <div class="guidance-step-detail" ${isExpanded ? "" : "hidden"}>
                    <p class="guidance-step-focus-label">Detailed guide</p>
                    <p lang="he" dir="rtl">${escapeHtml(step.description)}</p>
                    ${step.type === "tooling" ? `<button class="guidance-tool-inline-btn" type="button" data-action="open-tool-details" data-tool="${escapeHtml(item.tool || "")}">Open instructions for this tool</button>` : ""}
                    ${showTutorialBranches && step.branches?.length ? `
                      <div class="guidance-branch-grid" aria-label="Conditional investigation branches">
                        ${step.branches.map((branch) => `
                          <article class="guidance-branch-card">
                            <p class="guidance-branch-title">${escapeHtml(branch.label)}</p>
                            <p class="guidance-branch-copy" lang="he" dir="rtl">${escapeHtml(branch.description)}</p>
                          </article>
                        `).join("")}
                      </div>
                    ` : ""}
                  </div>
                </div>
              </article>
              `;
              })()}
              ${index < steps.length - 1 ? '<div class="guidance-map-arrow" aria-hidden="true"><span class="guidance-map-arrow-line">|\n|\n|\nV</span></div>' : ""}
            `).join("")}
          </div>
        </div>
      </div>
      ${toolHints ? `
        <aside class="guidance-tool-details" aria-live="polite">
          <div class="guidance-tool-head">
            <p class="guidance-tool-kicker">Tool details</p>
            <button class="guidance-tool-close" type="button" data-action="close-tool-details" aria-label="Close tool details">Close</button>
          </div>
          <h4>${escapeHtml(toolHints.title)}</h4>
          <p class="guidance-tool-name">${escapeHtml(activeTutorialTool)}</p>
          <div class="guidance-tool-commands">
            ${toolHints.commands.map((item) => `
              <div class="guidance-tool-command-item">
                <code>${escapeHtml(item.command)}</code>
                <p>${escapeHtml(item.note)}</p>
              </div>
            `).join("")}
          </div>
        </aside>
      ` : ""}
    </div>
  `;

  wireTutorialMap();
}

function openTutorialDialog(artifactId) {
  const item = findItemById(artifactId);
  if (!item || !tutorialDialog) {
    return;
  }

  if (tutorialDialog.hidden) {
    rememberFocus();
  }

  activeTutorialArtifactId = artifactId;
  showTutorialBranches = false;
  activeTutorialTool = "";
  expandedTutorialStepKeys.clear();
  window.clearTimeout(tutorialDialogCloseTimer);
  renderTutorialDialog(item);
  tutorialDialog.hidden = false;

  requestAnimationFrame(() => {
    tutorialDialog.classList.add("is-open");
    syncBodyScrollLock();
    tutorialDialogCloseButton?.focus();
  });
}

function closeTutorialDialog() {
  if (!tutorialDialog || tutorialDialog.hidden) {
    return;
  }

  tutorialDialog.classList.remove("is-open");
  activeTutorialArtifactId = null;
  activeTutorialTool = "";
  expandedTutorialStepKeys.clear();
  window.clearTimeout(tutorialDialogCloseTimer);

  tutorialDialogCloseTimer = window.setTimeout(() => {
    tutorialDialog.hidden = true;
    if (tutorialDialogBody) {
      tutorialDialogBody.innerHTML = "";
    }
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function resetSavedState() {
  state.entries = {};
  expandedArtifactIds.clear();
  hasBuiltLayout = false;
  artifactRegistry.clear();
  sectionRegistry.clear();
  saveState();
  render();
  if (!artifactOverlay.hidden) {
    closeOverlay();
  }
  if (!detailInsertDialog.hidden) {
    closeDetailInsertDialog();
  }
  if (tutorialDialog && !tutorialDialog.hidden) {
    closeTutorialDialog();
  }
  closeResetDialog();
}

function getZoomButtonMarkup(artifactId, isPressed, label) {
  return `
    <button class="zoom-btn" type="button" data-action="${isPressed ? "close-overlay" : "open-overlay"}" data-artifact-id="${escapeHtml(artifactId)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" aria-pressed="${isPressed ? "true" : "false"}">
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M2 8V2h6"></path>
        <path d="M2 2l6 6"></path>
        <path d="M18 12v6h-6"></path>
        <path d="M18 18l-6-6"></path>
      </svg>
    </button>
  `;
}

function getDetailsToggleLabel(isExpanded) {
  return isExpanded ? "Collapse" : "Expand";
}

function getDetailsToggleMarkup(artifactId) {
  const isExpanded = expandedArtifactIds.has(artifactId);
  return `
    <button class="artifact-details-toggle" type="button" data-action="toggle-details" data-artifact-id="${escapeHtml(artifactId)}" aria-expanded="${isExpanded ? "true" : "false"}" aria-controls="details-body-${escapeHtml(artifactId)}" aria-label="Toggle details">
      <span class="artifact-details-toggle-text">${getDetailsToggleLabel(isExpanded)}</span>
    </button>
  `;
}

function createArtifactCard(item) {
  const entry = getEntry(item.id);
  const artifactStatus = getEntryStatus(entry);
  const hasCommentText = hasNotes(entry);
  const isExpanded = expandedArtifactIds.has(item.id);
  const card = document.createElement("article");

  card.className = "artifact-card";
  applyCardStatusClass(card, artifactStatus);
  card.dataset.artifactId = item.id;
  card.innerHTML = `
    <div class="artifact-top">
      <div class="artifact-heading">
        <div class="artifact-title-row">
          <h3 class="artifact-title">${escapeHtml(item.artifact)}</h3>
          <div class="artifact-inline-actions">
            ${getDetailsToggleMarkup(item.id)}
          </div>
        </div>
        <div class="artifact-meta-row">
          <div class="artifact-meta" title="${escapeHtml(splitTags(item.tags).join(", ") || "No tags")}">
            ${renderTagPills(item.tags)}
            <span class="tag os-tag">${escapeHtml(item.os)}</span>
            ${hasCommentText ? '<span class="comment-pill">Notes added</span>' : ""}
          </div>
        </div>
      </div>
      <div class="artifact-top-controls">
        ${getStatusSelectMarkup("set-status", item.id, artifactStatus, "status-select-card")}
        ${getZoomButtonMarkup(item.id, false, "Open focused view")}
      </div>
    </div>

    <details class="artifact-details" data-expanded="${isExpanded ? "true" : "false"}" ${isExpanded ? "open" : ""}>
      <summary>Details</summary>
      <div id="details-body-${escapeHtml(item.id)}" class="artifact-body">
        <dl class="detail-list">
          <div class="detail-item">
            <dt>Location</dt>
            <dd>${renderDetailListValue(item.location, splitArtifactEditorLocationPaths)}</dd>
          </div>
          <div class="detail-item">
            <dt>Tooling</dt>
            <dd>${renderDetailListValue(item.tool, splitArtifactEditorToolValues)}</dd>
          </div>
          <div class="detail-item guidance">
            <dt>Analyst Guidance</dt>
            ${getGuidanceDetailMarkup(item)}
          </div>
        </dl>

        <div class="comment-section">
          <label class="comment-label" for="comment-${item.id}">Analyst comments</label>
          <div class="comment-form-wrapper">
            ${getInsertDetailButtonMarkup(item.id)}
            ${renderStructuredDetails(entry, item.id)}
            <textarea id="comment-${item.id}" data-action="comment-input" placeholder="Add findings, timestamps, hashes, usernames, or evidence notes here...">${escapeHtml(entry.comment)}</textarea>
          </div>
        </div>
      </div>
    </details>
  `;

  artifactRegistry.set(item.id, { card, item });
  return card;
}

function buildLayout() {
  sectionsEl.innerHTML = "";
  sectionRegistry.clear();
  artifactRegistry.clear();

  mitreOrder.forEach((mitreName, sectionIndex) => {
    const section = document.createElement("section");
    section.className = "mitre-section";
    section.style.setProperty("--section-index", sectionIndex);
    section.innerHTML = `
      <div class="section-header">
        <div class="section-heading">
          <div class="section-title-row">
            <button
              class="section-collapse-btn"
              type="button"
              data-action="toggle-section-collapse"
              data-mitre="${escapeHtml(mitreName)}"
              aria-label="Collapse ${escapeHtml(mitreName)} section"
              aria-expanded="true"
              title="Collapse section"
            >
              <span class="section-collapse-glyph" aria-hidden="true">▾</span>
            </button>
          <h2>${escapeHtml(mitreName)}</h2>
          </div>
          <p class="section-subtitle"></p>
        </div>
        <div class="section-progress">
          <div class="summary-progress" aria-label="Section completion progress">
            <div class="summary-progress-track"><div class="summary-progress-segments"></div></div>
            <p class="summary-progress-copy">Section progress: <strong>0% completed</strong></p>
            <div class="summary-progress-legend" aria-label="Section status breakdown"></div>
          </div>
          <div class="section-actions">
            <button class="section-action-btn" type="button" data-action="toggle-section-details" data-mode="expand" aria-label="Expand all artifacts in this section">Expand all</button>
          </div>
        </div>
      </div>
      <div class="artifact-grid"></div>
    `;

    const grid = section.querySelector(".artifact-grid");
    const subtitle = section.querySelector(".section-subtitle");
    const progress = section.querySelector(".section-progress");
    const progressCopy = progress.querySelector(".summary-progress-copy strong");
    const sectionToggleButton = section.querySelector('[data-action="toggle-section-details"]');

    sectionRegistry.set(mitreName, { section, grid, subtitle, progress, progressCopy, sectionToggleButton });

    checklistData
      .filter((item) => getPrimaryMitreValue(item.mitre) === mitreName)
      .forEach((item) => {
        const card = createArtifactCard(item);
        grid.appendChild(card);
      });

    sectionsEl.appendChild(section);
  });

  hasBuiltLayout = true;
  requestAnimationFrame(() => {
    pageEl?.classList.add("is-hydrated");
  });
}

function updateSectionDisplay(mitreName, visibleItems) {
  const sectionData = sectionRegistry.get(mitreName);
  if (!sectionData) {
    return;
  }

  const { section, subtitle, progress, progressCopy } = sectionData;
  const visibleCount = visibleItems.length;
  const statusCounts = getStatusCounts(visibleItems);
  const completedCount = statusCounts.completed;
  const commentedCount = visibleItems.filter((item) => hasNotes(getEntry(item.id))).length;
  const percent = visibleCount ? Math.round((completedCount / visibleCount) * 100) : 0;

  section.hidden = visibleCount === 0;
  subtitle.textContent = `${visibleCount} artifact${visibleCount === 1 ? "" : "s"} · ${statusCounts["in-progress"]} in progress · ${statusCounts["needs-review"]} needs investigation · ${statusCounts["not-started"]} not started · ${commentedCount} with notes`;
  if (progressCopy) {
    progressCopy.textContent = `${percent}% completed`;
  }
  renderSectionProgressBreakdown(sectionData, statusCounts, visibleCount);
  progress.classList.toggle("is-complete", visibleCount > 0 && completedCount === visibleCount);
  syncSectionCollapseButton(section, mitreName);
  syncSectionToggleButton(section);
}

function syncSectionCollapseButton(section, mitreName) {
  const collapseButton = section.querySelector('[data-action="toggle-section-collapse"]');
  if (!collapseButton) {
    return;
  }

  const isCollapsed = Boolean(state.collapsedSections?.[mitreName]);
  section.classList.toggle("is-collapsed", isCollapsed);
  collapseButton.setAttribute("aria-expanded", String(!isCollapsed));
  collapseButton.setAttribute("aria-label", `${isCollapsed ? "Expand" : "Collapse"} ${mitreName} section`);
  collapseButton.title = `${isCollapsed ? "Expand" : "Collapse"} section`;
}

function getVisibleSections() {
  return Array.from(sectionsEl.querySelectorAll(".mitre-section:not([hidden])"));
}

function syncGlobalSectionsToggleButton() {
  if (!toggleSectionsButton) {
    return;
  }

  const visibleSections = getVisibleSections();
  if (!visibleSections.length) {
    toggleSectionsButton.disabled = true;
    toggleSectionsButton.dataset.mode = "collapse";
    toggleSectionsButton.textContent = "Collapse categories";
    toggleSectionsButton.setAttribute("aria-label", "Collapse all visible categories");
    return;
  }

  toggleSectionsButton.disabled = false;
  const anyExpanded = visibleSections.some((section) => !section.classList.contains("is-collapsed"));
  const mode = anyExpanded ? "collapse" : "expand";
  const label = anyExpanded ? "Collapse categories" : "Expand categories";

  toggleSectionsButton.dataset.mode = mode;
  toggleSectionsButton.textContent = label;
  toggleSectionsButton.setAttribute("aria-label", `${label} in current results`);
}

function setSectionCollapsed(section, mitreName, collapse) {
  state.collapsedSections[mitreName] = Boolean(collapse);
  syncSectionCollapseButton(section, mitreName);
}

function syncSectionToggleButton(section) {
  const toggleButton = section.querySelector('[data-action="toggle-section-details"]');
  if (!toggleButton) {
    return;
  }

  const visibleDetails = Array.from(section.querySelectorAll(".artifact-card:not([hidden]) .artifact-details"));
  const anyExpanded = visibleDetails.some((details) => details.dataset.expanded === "true");
  const mode = anyExpanded ? "collapse" : "expand";
  const label = anyExpanded ? "Collapse all" : "Expand all";

  toggleButton.dataset.mode = mode;
  toggleButton.textContent = label;
  toggleButton.setAttribute("aria-label", `${label} artifacts in this section`);
}

function applyFiltersAndSort() {
  if (!hasBuiltLayout) {
    buildLayout();
  }

  syncViewButtons();

  const filteredItems = getFilteredItems();
  const grouped = new Map(mitreOrder.map((name) => [name, []]));
  const visibleById = new Set(filteredItems.map((item) => item.id));

  filteredItems.forEach((item) => {
    grouped.get(getPrimaryMitreValue(item.mitre))?.push(item);
  });

  artifactRegistry.forEach(({ card, item }) => {
    card.hidden = !visibleById.has(item.id);
    card.style.setProperty("--card-index", "0");
    syncCardCommentPill(item.id);
  });

  grouped.forEach((items, mitreName) => {
    const sectionData = sectionRegistry.get(mitreName);
    if (!sectionData) {
      return;
    }

    const visibleCards = [];
    items.forEach((item, index) => {
      const artifactData = artifactRegistry.get(item.id);
      if (!artifactData) {
        return;
      }

      artifactData.card.hidden = false;
      artifactData.card.style.setProperty("--card-index", String(index));
      visibleCards.push(artifactData.card);
    });

    sectionData.grid.replaceChildren(...visibleCards);

    updateSectionDisplay(mitreName, items);
  });

  emptyState.hidden = filteredItems.length !== 0;
  updateSummary(filteredItems.length);
  syncRenderedDetails();
  syncGlobalSectionsToggleButton();
}

function buildOptions() {
  const previousMitre = mitreFilter.value || state.filters?.mitre || "all";
  const previousOs = getSelectedOsFilterValue() || state.filters?.os || "all";
  const previousTag = tagFilter.value || state.filters?.tag || "all";
  const previousEditorMitreValues = splitArtifactEditorMitreValues(artifactEditorMitreInput?.value || "");

  mitreFilter.innerHTML = '<option value="all">All tactics</option>';
  tagFilter.innerHTML = '<option value="all">All tags</option>';
  if (osFilterRadios) {
    osFilterRadios.innerHTML = "";
  }

  mitreOrder.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    mitreFilter.appendChild(option);

  });

  const osOptions = ["all", ...osOrder];
  osOptions.forEach((name) => {
    const labelText = name === "all" ? "All OS" : name;
    const option = document.createElement("label");
    option.className = "os-radio-option";
    option.innerHTML = `
      <input type="radio" name="osFilterOption" value="${escapeHtml(name)}" ${name === "all" ? "checked" : ""}>
      <span>${escapeHtml(labelText)}</span>
    `;
    osFilterRadios?.appendChild(option);
  });

  tagOptions.forEach(({ token, label }) => {
    const option = document.createElement("option");
    option.value = token;
    option.textContent = label;
    tagFilter.appendChild(option);
  });

  mitreFilter.value = mitreFilter.querySelector(`option[value="${CSS.escape(previousMitre)}"]`) ? previousMitre : "all";
  setSelectedOsFilterValue(previousOs);
  tagFilter.value = tagFilter.querySelector(`option[value="${CSS.escape(previousTag)}"]`) ? previousTag : "all";
  setArtifactEditorMitreValues(previousEditorMitreValues);
  syncArtifactEditorMitreSelectorOptions();
}

function applySavedControlState() {
  const filters = state.filters;
  searchInput.value = filters.query;
  mitreFilter.value = mitreFilter.querySelector(`option[value="${CSS.escape(filters.mitre)}"]`) ? filters.mitre : "all";
  statusFilter.value = statusFilter.querySelector(`option[value="${CSS.escape(filters.status)}"]`) ? filters.status : "all";
  setSelectedOsFilterValue(filters.os);
  tagFilter.value = tagFilter.querySelector(`option[value="${CSS.escape(filters.tag)}"]`) ? filters.tag : "all";
  sortSelect.value = sortSelect.querySelector(`option[value="${CSS.escape(filters.sort)}"]`) ? filters.sort : "default";
  setAdvancedFiltersOpen(Boolean(state.advancedFiltersOpen), false);
}

function persistFiltersToState() {
  const selectedTagToken = getSelectedTagFilterToken();
  state.filters = {
    query: searchInput.value,
    mitre: mitreFilter.value,
    status: statusFilter.value,
    os: getSelectedOsFilterValue(),
    tag: normalizeTagFilterValue(selectedTagToken),
    sort: sortSelect.value,
    exportScope: state.filters?.exportScope || "all"
  };
}

function shouldRerenderForFoundChange() {
  return Boolean(artifactStatuses[statusFilter.value]) || sortSelect.value === "completed-first" || sortSelect.value === "status-priority";
}

function shouldRerenderForCommentChange() {
  return statusFilter.value === "commented" || sortSelect.value === "commented-first";
}

function getDetailsBody(details) {
  return details.querySelector(".artifact-body");
}

function getDetailsExpandedHeight(body) {
  return Math.min(body.scrollHeight, detailExpandedMaxHeight);
}

function finishDetailsAnimation(details, expand) {
  const body = getDetailsBody(details);
  if (!body) {
    return;
  }

  window.clearTimeout(details.animationTimer);
  details.classList.remove("is-animating");

  if (expand) {
    details.open = true;
    details.dataset.expanded = "true";
    body.style.height = `${getDetailsExpandedHeight(body)}px`;
    body.style.overflow = "auto";
    syncDetailsToggle(details, true);
    return;
  }

  details.dataset.expanded = "false";
  details.open = false;
  body.style.height = "0px";
  body.style.overflow = "hidden";
  syncDetailsToggle(details, false);
}

function syncDetailsToggle(details, isExpanded) {
  const card = details.closest(".artifact-card");
  const toggle = card?.querySelector('[data-action="toggle-details"]');
  if (!toggle) {
    return;
  }

  const label = getDetailsToggleLabel(isExpanded);
  toggle.setAttribute("aria-expanded", String(isExpanded));
  toggle.setAttribute("aria-label", `${label} details`);

  const labelEl = toggle.querySelector(".artifact-details-toggle-text");
  if (labelEl) {
    labelEl.textContent = label;
  }
}

function setDetailsExpanded(details, expand) {
  const body = getDetailsBody(details);
  if (!body) {
    return;
  }

  const isExpanded = details.dataset.expanded === "true";
  if (expand === isExpanded && !details.classList.contains("is-animating")) {
    return;
  }

  const artifactId = details.closest(".artifact-card")?.dataset.artifactId;
  if (artifactId) {
    if (expand) {
      expandedArtifactIds.add(artifactId);
    } else {
      expandedArtifactIds.delete(artifactId);
    }
  }

  window.clearTimeout(details.animationTimer);
  const startHeight = body.getBoundingClientRect().height;

  details.open = true;
  details.classList.add("is-animating");
  details.dataset.expanded = expand ? "true" : "false";
  syncDetailsToggle(details, expand);
  const section = details.closest(".mitre-section");
  if (section) {
    syncSectionToggleButton(section);
  }
  body.style.overflow = "hidden";
  body.style.height = `${startHeight}px`;

  requestAnimationFrame(() => {
    body.style.height = `${expand ? getDetailsExpandedHeight(body) : 0}px`;
  });

  details.animationTimer = window.setTimeout(() => {
    finishDetailsAnimation(details, expand);
  }, detailTransitionMs);
}

function syncDetailsState(details) {
  const body = getDetailsBody(details);
  if (!body) {
    return;
  }

  const card = details.closest(".artifact-card");
  const artifactId = card?.dataset.artifactId;
  const shouldBeExpanded = Boolean(artifactId && expandedArtifactIds.has(artifactId));

  details.open = shouldBeExpanded;
  details.dataset.expanded = shouldBeExpanded ? "true" : "false";
  body.style.height = shouldBeExpanded ? `${getDetailsExpandedHeight(body)}px` : "0px";
  body.style.overflow = shouldBeExpanded ? "auto" : "hidden";
  syncDetailsToggle(details, shouldBeExpanded);
}

function syncRenderedDetails() {
  sectionsEl.querySelectorAll(".artifact-details").forEach((details) => {
    syncDetailsState(details);
  });
}

function flashElement(element, className = "is-updating") {
  if (!element) {
    return;
  }

  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => {
    element.classList.remove(className);
  }, cardUpdateFlashMs);
}

function updateCommentPills(artifactId, hasComment) {
  const card = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"]`);
  const cardMeta = card?.querySelector(".artifact-meta");
  const cardPill = cardMeta?.querySelector(".comment-pill");

  if (cardMeta) {
    if (hasComment && !cardPill) {
      cardMeta.insertAdjacentHTML("beforeend", '<span class="comment-pill">Notes added</span>');
    }

    if (!hasComment && cardPill) {
      cardPill.remove();
    }
  }

  const overlayMeta = overlayContent.querySelector(".overlay-meta");
  const overlayPill = overlayMeta?.querySelector(".comment-pill");

  if (overlayMeta && activeOverlayArtifactId === artifactId) {
    if (hasComment && !overlayPill) {
      overlayMeta.insertAdjacentHTML("beforeend", '<span class="comment-pill">Notes added</span>');
    }

    if (!hasComment && overlayPill) {
      overlayPill.remove();
    }
  }
}

function syncCardCommentPill(artifactId) {
  const entry = getEntry(artifactId);
  updateCommentPills(artifactId, hasNotes(entry));
}

function updateCardStatusState(artifactId) {
  const entry = getEntry(artifactId);
  const artifactStatus = getEntryStatus(entry);
  const card = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"]`);
  if (!card) {
    return;
  }

  applyCardStatusClass(card, artifactStatus);
  const statusSelect = card.querySelector('[data-action="set-status"]');
  if (statusSelect) {
    statusSelect.value = artifactStatus;
  }

  const overlaySelect = overlayContent.querySelector('[data-action="overlay-set-status"]');
  if (overlaySelect && activeOverlayArtifactId === artifactId) {
    overlaySelect.value = artifactStatus;
  }

  flashElement(card);
}

function updateSectionProgressForArtifact(artifactId) {
  const card = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"]`);
  const section = card?.closest(".mitre-section");
  if (!section) {
    return;
  }

  const cards = Array.from(section.querySelectorAll(".artifact-card"));
  const statusCounts = {
    completed: cards.filter((artifactCard) => artifactCard.classList.contains("is-status-completed")).length,
    "in-progress": cards.filter((artifactCard) => artifactCard.classList.contains("is-status-in-progress")).length,
    "needs-review": cards.filter((artifactCard) => artifactCard.classList.contains("is-status-needs-review")).length,
    "not-started": cards.filter((artifactCard) => artifactCard.classList.contains("is-status-not-started")).length
  };
  const completedCount = statusCounts.completed;
  const totalCount = cards.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const progress = section.querySelector(".section-progress");
  const progressCopy = progress?.querySelector(".summary-progress-copy strong");

  if (progressCopy) {
    progressCopy.textContent = `${percent}% completed`;
  }

  const sectionData = sectionRegistry.get(section.querySelector('[data-action="toggle-section-collapse"]')?.dataset.mitre || "");
  if (sectionData) {
    renderSectionProgressBreakdown(sectionData, statusCounts, totalCount);
  }

  progress?.classList.toggle("is-complete", totalCount > 0 && completedCount === totalCount);
  flashElement(progress);
}

function renderOverallProgressBreakdown(statusCounts, totalArtifacts) {
  if (overallProgressBar) {
    const segments = artifactStatusOrder
      .map((status) => {
        const value = statusCounts[status] || 0;
        const width = totalArtifacts ? (value / totalArtifacts) * 100 : 0;
        return `<span class="summary-progress-segment ${artifactStatuses[status].colorClass}" style="width:${width}%" title="${getStatusLabel(status)}: ${value}"></span>`;
      })
      .join("");

    overallProgressBar.innerHTML = segments;
  }

  if (overallStatusLegend) {
    overallStatusLegend.innerHTML = artifactStatusOrder
      .map((status) => `
        <span class="summary-progress-legend-item">
          <span class="summary-progress-dot ${artifactStatuses[status].colorClass}" aria-hidden="true"></span>
          <span>${getStatusLabel(status)}: <strong>${statusCounts[status] || 0}</strong></span>
        </span>
      `)
      .join("");
  }
}

function getOverallTagStats() {
  const tagStatsByToken = new Map();

  checklistData.forEach((item) => {
    const tagTokens = [...new Set(getItemTagTokens(item.tags))];
    const status = getEntryStatus(getEntry(item.id));

    tagTokens.forEach((token) => {
      if (!tagStatsByToken.has(token)) {
        tagStatsByToken.set(token, {
          token,
          label: splitTags(item.tags).find((tag) => normalizeTagToken(tag) === token) || token,
          total: 0,
          completed: 0,
          statusCounts: {
            completed: 0,
            "in-progress": 0,
            "needs-review": 0,
            "not-started": 0
          }
        });
      }

      const stats = tagStatsByToken.get(token);
      stats.total += 1;
      stats.statusCounts[status] += 1;

      if (status === "completed") {
        stats.completed += 1;
      }
    });
  });

  return [...tagStatsByToken.values()].sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total;
    }

    return left.label.localeCompare(right.label, undefined, { sensitivity: "base" });
  });
}

function renderOverallTagStats() {
  if (!overallTagLegend) {
    return;
  }

  const stats = getOverallTagStats();
  overallTagLegend.innerHTML = stats
    .map((item) => {
      const percent = item.total ? Math.round((item.completed / item.total) * 100) : 0;
      const segments = artifactStatusOrder
        .map((status) => {
          const value = item.statusCounts[status] || 0;
          const width = item.total ? (value / item.total) * 100 : 0;
          return `<span class="tag-progress-segment ${artifactStatuses[status].colorClass}" style="width:${width}%" title="${getStatusLabel(status)}: ${value}"></span>`;
        })
        .join("");

      const countsMarkup = artifactStatusOrder
        .map((status) => {
          const value = item.statusCounts[status] || 0;
          const tooltip = `${getStatusLabel(status)}: ${value}`;
          return `<span class="tag-progress-status-item" role="img" aria-label="${escapeHtml(tooltip)}" data-tooltip="${escapeHtml(tooltip)}"><span class="summary-progress-dot ${artifactStatuses[status].colorClass}" aria-hidden="true"></span>${value}</span>`;
        })
        .join("");

      return `
        <div class="tag-progress-item" title="${escapeHtml(item.label)}: ${item.completed}/${item.total} completed">
          <div class="tag-progress-head">
            <span class="tag-progress-name">${escapeHtml(item.label)}</span>
            <span class="tag-progress-value">${percent}% (${item.completed}/${item.total})</span>
          </div>
          <div class="tag-progress-track" aria-hidden="true">
            <span class="tag-progress-segments">${segments}</span>
          </div>
          <div class="tag-progress-statuses" aria-label="Status counts for ${escapeHtml(item.label)}">${countsMarkup}</div>
        </div>
      `;
    })
    .join("");
}

function getActiveFiltersCount() {
  let total = 0;
  if (searchInput.value.trim()) {
    total += 1;
  }
  if (mitreFilter.value !== "all") {
    total += 1;
  }
  if (statusFilter.value !== "all") {
    total += 1;
  }
  if (getSelectedOsFilterValue() !== "all") {
    total += 1;
  }
  if (tagFilter.value !== "all") {
    total += 1;
  }
  if (sortSelect.value !== "default") {
    total += 1;
  }
  return total;
}

function getRecentlyUpdatedCount() {
  const now = Date.now();
  return checklistData.filter((item) => {
    const updatedAt = getEntry(item.id).updatedAt;
    if (!updatedAt) {
      return false;
    }

    const timestamp = new Date(updatedAt).getTime();
    if (Number.isNaN(timestamp)) {
      return false;
    }

    return now - timestamp <= recentUpdateWindowMs;
  }).length;
}

function updateSummaryStats(visibleArtifacts, highlight = false) {
  const statusCounts = getStatusCounts(checklistData);
  const commentCount = checklistData.filter((item) => hasNotes(getEntry(item.id))).length;
  const completion = checklistData.length ? Math.round((statusCounts.completed / checklistData.length) * 100) : 0;

  document.getElementById("artifactTotal").textContent = checklistData.length;
  document.getElementById("mitreTotal").textContent = mitreOrder.length;
  document.getElementById("foundCount").textContent = statusCounts.completed;
  document.getElementById("commentCount").textContent = commentCount;
  document.getElementById("completionPercent").textContent = `${completion}%`;
  document.getElementById("visibleCount").textContent = visibleArtifacts;
  document.getElementById("activeFiltersCount").textContent = getActiveFiltersCount();
  document.getElementById("recentlyUpdatedCount").textContent = getRecentlyUpdatedCount();

  renderOverallProgressBreakdown(statusCounts, checklistData.length);
  renderOverallTagStats();
  overallProgressCopy.textContent = `${completion}% completed`;

  if (highlight) {
    ["foundCount", "completionPercent", "visibleCount", "commentCount"].forEach((id) => {
      flashElement(document.getElementById(id)?.closest(".summary-stat"));
    });
  }
}

function syncArtifactStatusState(artifactId) {
  updateCardStatusState(artifactId);
  updateSectionProgressForArtifact(artifactId);
  render();
  updateSummaryStats(getFilteredItems().length, true);
}

function matchesFilters(item) {
  const entry = getEntry(item.id);
  const selectedMitre = mitreFilter.value;
  const selectedStatus = normalizeFilterStatus(statusFilter.value);
  const selectedOs = getSelectedOsFilterValue();
  const selectedTag = getSelectedTagFilterToken();
  const query = searchInput.value.trim().toLowerCase();

  if (selectedMitre !== "all" && item.mitre !== selectedMitre) {
    const mitreValues = splitArtifactEditorMitreValues(item.mitre);
    if (!mitreValues.includes(selectedMitre)) {
      return false;
    }
  }

  if (selectedOs !== "all" && item.os !== selectedOs) {
    const osValues = splitArtifactEditorOsValues(item.os);
    if (!osValues.includes(selectedOs)) {
      return false;
    }
  }

  if (selectedTag !== "all") {
    if (!isStrictTagMatch(item, selectedTag)) {
      return false;
    }
  }

  const artifactStatus = getEntryStatus(entry);

  if (selectedStatus === "commented") {
    if (!hasNotes(entry)) {
      return false;
    }
  } else if (selectedStatus !== "all") {
    if (artifactStatus !== selectedStatus) {
      return false;
    }
  }

  if (!query) {
    return true;
  }

  const structuredDetailsText = entry.details.map((detail) => `${detail.label} ${detail.value}`).join(" ");
  const haystack = [item.artifact, item.location, item.tool, item.instructions, item.tags, item.os, item.mitre, entry.comment, structuredDetailsText]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function sortItems(items) {
  const sortMode = sortSelect.value;
  if (sortMode === "default") {
    return items;
  }

  const sorted = [...items];

  sorted.sort((left, right) => {
    if (sortMode === "artifact-asc") {
      return left.artifact.localeCompare(right.artifact);
    }

    if (sortMode === "artifact-desc") {
      return right.artifact.localeCompare(left.artifact);
    }

    if (sortMode === "completed-first") {
      const completedDelta = Number(getEntryStatus(getEntry(right.id)) === "completed") - Number(getEntryStatus(getEntry(left.id)) === "completed");
      if (completedDelta !== 0) {
        return completedDelta;
      }
      return left.artifact.localeCompare(right.artifact);
    }

    if (sortMode === "status-priority") {
      const statusDelta = getStatusSortRank(getEntryStatus(getEntry(left.id))) - getStatusSortRank(getEntryStatus(getEntry(right.id)));
      if (statusDelta !== 0) {
        return statusDelta;
      }
      return left.artifact.localeCompare(right.artifact);
    }

    if (sortMode === "commented-first") {
      const leftComment = Number(hasNotes(getEntry(left.id)));
      const rightComment = Number(hasNotes(getEntry(right.id)));
      const commentDelta = rightComment - leftComment;
      if (commentDelta !== 0) {
        return commentDelta;
      }
      return left.artifact.localeCompare(right.artifact);
    }

    return 0;
  });

  return sorted;
}

function getFilteredItems() {
  return sortItems(checklistData.filter(matchesFilters));
}

function render() {
  applyFiltersAndSort();
}

function updateSummary(visibleArtifacts) {
  updateSummaryStats(visibleArtifacts);
}

function getExportItems(scope) {
  if (scope === "visible") {
    return getFilteredItems();
  }

  if (scope === "found" || scope === "completed") {
    return checklistData.filter((item) => getEntryStatus(getEntry(item.id)) === "completed");
  }

  if (scope === "commented") {
    return checklistData.filter((item) => hasNotes(getEntry(item.id)));
  }

  return checklistData;
}

function exportState() {
  const scope = "all";
  const exportItems = getExportItems(scope);
  const payload = {
    exportedAt: new Date().toISOString(),
    scope,
    artifactCount: checklistData.length,
    exportedCount: exportItems.length,
    filters: {
      query: searchInput.value,
      mitre: mitreFilter.value,
      status: statusFilter.value,
      os: getSelectedOsFilterValue(),
      tag: tagFilter.value,
      sort: sortSelect.value
    },
    entries: exportItems.map((item) => {
      const entry = getEntry(item.id);
      return {
        mitre: item.mitre,
        artifact: item.artifact,
        tags: item.tags,
        os: item.os,
        status: getEntryStatus(entry),
        found: getEntryStatus(entry) === "completed",
        comment: entry.comment,
        details: entry.details,
        updatedAt: entry.updatedAt,
        location: item.location,
        tool: item.tool,
        instructions: item.instructions
      };
    })
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dfir-checklist-notes-${scope}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function captureCommentFocusState() {
  const activeElement = document.activeElement;
  if (!(activeElement instanceof HTMLTextAreaElement)) {
    return null;
  }

  const action = activeElement.dataset.action;
  if (action !== "comment-input" && action !== "overlay-comment-input") {
    return null;
  }

  const artifactId = activeElement.dataset.artifactId
    || activeElement.closest(".artifact-card")?.dataset.artifactId
    || "";

  if (!artifactId) {
    return null;
  }

  return {
    action,
    artifactId,
    selectionStart: typeof activeElement.selectionStart === "number" ? activeElement.selectionStart : null,
    selectionEnd: typeof activeElement.selectionEnd === "number" ? activeElement.selectionEnd : null,
    scrollTop: activeElement.scrollTop
  };
}

function restoreCommentFocusState(focusState) {
  if (!focusState) {
    return;
  }

  const selector = focusState.action === "overlay-comment-input"
    ? `[data-action="overlay-comment-input"][data-artifact-id="${CSS.escape(focusState.artifactId)}"]`
    : `.artifact-card[data-artifact-id="${CSS.escape(focusState.artifactId)}"] [data-action="comment-input"]`;

  const nextTextarea = document.querySelector(selector);
  if (!(nextTextarea instanceof HTMLTextAreaElement)) {
    return;
  }

  nextTextarea.focus({ preventScroll: true });

  if (typeof focusState.selectionStart === "number" && typeof focusState.selectionEnd === "number") {
    const valueLength = nextTextarea.value.length;
    const nextStart = Math.min(focusState.selectionStart, valueLength);
    const nextEnd = Math.min(focusState.selectionEnd, valueLength);
    nextTextarea.setSelectionRange(nextStart, nextEnd);
  }

  nextTextarea.scrollTop = focusState.scrollTop;
}

function scheduleRender() {
  pendingRenderFocusState = captureCommentFocusState();
  window.clearTimeout(filterRenderTimer);
  filterRenderTimer = window.setTimeout(() => {
    const focusState = pendingRenderFocusState;
    pendingRenderFocusState = null;
    filterRenderTimer = 0;
    render();
    if (focusState) {
      requestAnimationFrame(() => {
        restoreCommentFocusState(focusState);
      });
    }
  }, 140);
}

function clearFilters() {
  const defaults = getDefaultFilters();
  searchInput.value = defaults.query;
  mitreFilter.value = defaults.mitre;
  statusFilter.value = defaults.status;
  setSelectedOsFilterValue(defaults.os);
  tagFilter.value = defaults.tag;
  sortSelect.value = defaults.sort;
  setAdvancedFiltersOpen(false, false);
  state.filters = { ...defaults, exportScope: "all" };
  saveState();
  render();
}

function setAppView(viewName) {
  const nextView = ["overview", "cases", "artifacts", "ai"].includes(viewName) ? viewName : "cases";
  activeAppView = nextView;

  const views = {
    overview: overviewView,
    cases: casesView,
    artifacts: artifactsView,
    ai: aiView
  };

  Object.entries(views).forEach(([key, element]) => {
    if (!element) {
      return;
    }

    const isActive = key === nextView;
    element.hidden = !isActive;
    element.classList.toggle("is-active", isActive);
  });

  appNavButtons.forEach((button) => {
    const isActive = button.dataset.view === nextView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setSidebarOpen(open) {
  const shouldOpen = Boolean(open);
  isSidebarOpen = shouldOpen;
  pageEl?.classList.toggle("is-sidebar-open", shouldOpen);
  document.body.classList.toggle("sidebar-open", shouldOpen);
  if (menuToggleButton) {
    menuToggleButton.setAttribute("aria-expanded", String(shouldOpen));
  }
}

function toggleSidebar() {
  setSidebarOpen(!isSidebarOpen);
}

function getAiBackendBaseUrl() {
  return AI_DEFAULTS.backendBaseUrl;
}

function getAiLauncherBaseUrl() {
  return AI_DEFAULTS.launcherBaseUrl;
}

function getAiLauncherCandidateBaseUrls() {
  const primary = getAiLauncherBaseUrl();
  const candidates = [primary];

  if (primary.includes("127.0.0.1")) {
    candidates.push(primary.replace("127.0.0.1", "localhost"));
  } else if (primary.includes("localhost")) {
    candidates.push(primary.replace("localhost", "127.0.0.1"));
  }

  return [...new Set(candidates)];
}

function parseCommandLine(value) {
  const text = String(value || "").trim();
  if (!text) {
    return {
      command: "/home/rem/Desktop/Checklist/winforensics-mcp/.venv/bin/python",
      args: ["-m", "winforensics_mcp.server"]
    };
  }

  const parts = text.match(/(?:[^"]\S*|".+?")+/g) || [];
  const normalized = parts.map((part) => part.replace(/^"|"$/g, ""));
  return {
    command: normalized[0] || "uv",
    args: normalized.slice(1)
  };
}

async function aiRequest(path, method = "GET", body) {
  const endpoint = `${getAiBackendBaseUrl()}${path}`;
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.detail || payload?.error || `Request failed (${response.status})`);
  }

  return payload;
}

function stripThinkTagsForThinking(text) {
  return String(text || "").replace(/<\/?think(?:ing)?>/gi, "");
}

function stripThinkBlocksForFinal(text) {
  return String(text || "").replace(/<think(?:ing)?>[\s\S]*?<\/think(?:ing)?>/gi, "");
}

function extractThinkingBlocks(text) {
  const source = String(text || "");
  const matches = source.match(/<think(?:ing)?>([\s\S]*?)<\/think(?:ing)?>/gi) || [];
  if (!matches.length) {
    return "";
  }
  return matches
    .map((block) => stripThinkTagsForThinking(block).trim())
    .filter(Boolean)
    .join("\n\n");
}

function buildAiAnalyzePayload() {
  const overrideOrders = typeof aiNextAnalyzeOrdersOverride === "string" ? aiNextAnalyzeOrdersOverride.trim() : "";
  const freeTextOrders = overrideOrders || aiMcpOrdersInput?.value?.trim() || "";
  const hasFreeTextOrders = Boolean(freeTextOrders);
  const inlineCheckboxMode = aiInlineChatApplyUpdatesCheckbox?.checked ? "checklist" : "chat";
  const responseMode = aiNextAnalyzeResponseMode || (hasFreeTextOrders ? inlineCheckboxMode : "checklist");
  const selectedArtifacts = Array.isArray(aiNextAnalyzeSelectedArtifactsOverride)
    ? aiNextAnalyzeSelectedArtifactsOverride
    : getSelectedArtifactsForAnalyze();
  return {
    evidence_path: aiEvidencePathInput?.value?.trim() || "",
    execution_target: aiExecutionTargetInput?.value?.trim() || "",
    ioc: aiIocInput?.value?.trim() || "",
    mcp_orders: freeTextOrders,
    artifacts: checklistData.map((item) => ({
      id: item.id,
      artifact: item.artifact,
      mitre: item.mitre,
      os: item.os,
      tags: item.tags,
      tool: item.tool,
      location: item.location
    })),
    selected_artifacts: selectedArtifacts,
    thinking_mode: "enabled",
    response_mode: responseMode,
    chat_history: normalizeAiHistoryEntries(aiConversationHistory),
    system_prompt_override: aiPromptOverrides.systemPromptOverride || "",
    user_prompt_override: aiPromptOverrides.userPromptOverride || ""
  };
}

async function refreshAiPromptPreview() {
  if (!aiPromptPreviewOutput) {
    return;
  }

  aiPromptPreviewOutput.textContent = "Loading prompt preview...";

  try {
    const payload = await aiRequest("/api/ai/analyze/prompt-preview", "POST", buildAiAnalyzePayload());
    aiPromptPreviewOutput.textContent = JSON.stringify(payload, null, 2);
  } catch (error) {
    aiPromptPreviewOutput.textContent = `Prompt preview failed: ${error.message}`;
  }
}

function openAiPromptDialog() {
  if (!aiPromptDialog) {
    return;
  }

  rememberFocus();
  window.clearTimeout(aiPromptDialogCloseTimer);

  if (aiSystemPromptInput) {
    aiSystemPromptInput.value = aiPromptOverrides.systemPromptOverride || "";
  }
  if (aiUserPromptInput) {
    aiUserPromptInput.value = aiPromptOverrides.userPromptOverride || "";
  }

  aiPromptDialog.hidden = false;
  requestAnimationFrame(() => {
    aiPromptDialog.classList.add("is-open");
    syncBodyScrollLock();
    aiSystemPromptInput?.focus();
  });
  refreshAiPromptPreview();
}

function closeAiPromptDialog() {
  if (!aiPromptDialog || aiPromptDialog.hidden) {
    return;
  }

  aiPromptDialog.classList.remove("is-open");
  window.clearTimeout(aiPromptDialogCloseTimer);

  aiPromptDialogCloseTimer = window.setTimeout(() => {
    aiPromptDialog.hidden = true;
    syncBodyScrollLock();
    restoreFocus();
  }, overlayTransitionMs);
}

function parseSseChunk(rawEvent) {
  const lines = rawEvent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let eventName = "message";
  const dataLines = [];

  lines.forEach((line) => {
    if (line.startsWith("event:")) {
      eventName = line.slice(6).trim() || "message";
      return;
    }
    if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trim());
    }
  });

  let payload = {};
  if (dataLines.length) {
    try {
      payload = JSON.parse(dataLines.join("\n"));
    } catch {
      payload = { raw: dataLines.join("\n") };
    }
  }

  return { eventName, payload };
}

function normalizeMojibakeText(text) {
  const value = String(text || "");
  return value
    .replace(/â¯/g, " ")
    .replace(/â/g, "-")
    .replace(/â|â/g, "-")
    .replace(/â/g, "'")
    .replace(/â|â/g, '"')
    .replace(/â¦/g, "...")
    .replace(/Â/g, "");
}

function renderSimpleMarkdown(markdownText) {
  const normalized = normalizeMojibakeText(markdownText).replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const htmlLines = [];
  let inList = false;
  let inTable = false;

  const closeList = () => {
    if (inList) {
      htmlLines.push("</ul>");
      inList = false;
    }
  };

  const closeTable = () => {
    if (inTable) {
      htmlLines.push("</tbody></table>");
      inTable = false;
    }
  };

  const inline = (text) => {
    let out = escapeHtml(text);
    out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return out;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      closeTable();
      continue;
    }

    if (/^\|.*\|$/.test(line)) {
      closeList();
      const cells = line.split("|").slice(1, -1).map((cell) => inline(cell.trim()));
      const isSeparator = cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/<[^>]+>/g, "")));

      if (!inTable && !isSeparator) {
        htmlLines.push("<table><tbody>");
        inTable = true;
      }

      if (inTable && !isSeparator) {
        htmlLines.push(`<tr>${cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);
      }
      continue;
    }

    closeTable();

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        htmlLines.push("<ul>");
        inList = true;
      }
      htmlLines.push(`<li>${inline(listMatch[1])}</li>`);
      continue;
    }

    closeList();

    const h2Match = line.match(/^##\s+(.*)$/);
    if (h2Match) {
      htmlLines.push(`<h4>${inline(h2Match[1])}</h4>`);
      continue;
    }

    const h3Match = line.match(/^###\s+(.*)$/);
    if (h3Match) {
      htmlLines.push(`<h5>${inline(h3Match[1])}</h5>`);
      continue;
    }

    htmlLines.push(`<p>${inline(line)}</p>`);
  }

  closeList();
  closeTable();
  return htmlLines.join("");
}

async function aiAnalyzeRequestStream(body, handlers = {}, signal) {
  const endpoint = `${getAiBackendBaseUrl()}/api/ai/analyze/stream`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    signal
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload?.detail || payload?.error || `Request failed (${response.status})`);
  }

  if (!response.body) {
    throw new Error("Streaming response body is not available in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split(/\r?\n\r?\n/);
    buffer = chunks.pop() || "";

    chunks.forEach((chunk) => {
      if (!chunk.trim()) {
        return;
      }

      const { eventName, payload } = parseSseChunk(chunk);
      const handler = handlers[eventName] || handlers.message;
      if (typeof handler === "function") {
        handler(payload);
      }
    });
  }

  if (buffer.trim()) {
    const { eventName, payload } = parseSseChunk(buffer);
    const handler = handlers[eventName] || handlers.message;
    if (typeof handler === "function") {
      handler(payload);
    }
  }
}


async function launcherRequest(path, method = "GET", body) {
  let lastError = "";

  for (const baseUrl of getAiLauncherCandidateBaseUrls()) {
    const endpoint = `${baseUrl}${path}`;
    try {
      const response = await fetch(endpoint, {
        method,
        // Avoid custom headers to reduce CORS preflight edge cases.
        body: body ? JSON.stringify(body) : undefined
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.detail || payload?.error || `Launcher request failed (${response.status})`);
      }

      return payload;
    } catch (error) {
      lastError = error?.message || "Network error";
    }
  }

  if (window.location.protocol === "file:") {
    throw new Error("Firefox blocks file:// pages from calling local HTTP services. Open http://127.0.0.1:8790/dfir-checklist.html instead.");
  }

  throw new Error(lastError || "Network error");
}

function setAiBusy(isBusy) {
  aiUiBusy = Boolean(isBusy);
  [aiSessionToggleButton, aiSessionRefreshButton]
    .filter(Boolean)
    .forEach((button) => {
      button.disabled = aiUiBusy;
    });

  updateAiAnalyzeButtonState();
  updateAiChatButtonState();
  if (aiInlineChatSendButton) {
    aiInlineChatSendButton.disabled = aiUiBusy || aiAnalyzeInProgress;
  }
  if (aiInlineChatClearHistoryButton) {
    aiInlineChatClearHistoryButton.disabled = aiUiBusy || aiAnalyzeInProgress;
  }
}

function openAiInlineChatComposer() {
  setAiInvestigationOutputVisible(true, true);
  if (aiInlineChatComposer) {
    aiInlineChatComposer.hidden = false;
  }
  aiInlineChatInput?.focus();
  aiInlineChatInput?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  if (aiStatusText && !aiAnalyzeInProgress) {
    aiStatusText.textContent = "Chat mode ready. Enter free-text prompt and run.";
  }
}

function normalizeAiHistoryEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }

  const normalized = entries
    .map((entry) => {
      const role = String(entry?.role || "").trim().toLowerCase();
      const content = String(entry?.content || "").trim();
      if (!content || (role !== "user" && role !== "assistant")) {
        return null;
      }
      return { role, content };
    })
    .filter(Boolean);

  return normalized.slice(-12);
}

function renderAiConversationHistory() {
  if (!aiChatHistory) {
    return;
  }

  if (!aiConversationHistory.length) {
    aiChatHistory.innerHTML = "";
    return;
  }

  aiChatHistory.innerHTML = aiConversationHistory
    .map((entry) => {
      const role = entry.role === "user" ? "You" : "Assistant";
      const rowClass = entry.role === "user" ? "is-user" : "is-assistant";
      const contentHtml = entry.role === "assistant"
        ? renderSimpleMarkdown(entry.content || "")
        : `<pre class="ai-chat-message-content">${escapeHtml(normalizeMojibakeText(entry.content || ""))}</pre>`;
      return `
        <article class="ai-chat-message ${rowClass}">
          <div class="ai-chat-message-role">${escapeHtml(role)}</div>
          <div class="ai-chat-message-content ai-output-markdown">${contentHtml}</div>
        </article>
      `;
    })
    .join("");

  aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
}

async function runInlineChatPromptViaAnalyze() {
  const freeTextPrompt = String(aiInlineChatInput?.value || "").trim();
  if (!freeTextPrompt) {
    aiInlineChatInput?.focus();
    return;
  }

  const sessionReady = Boolean(aiSessionStatus?.active && aiSessionStatus?.model_loaded);
  if (!sessionReady) {
    if (aiStatusText) {
      aiStatusText.textContent = "Start an AI session first, then run the prompt.";
    }
    return;
  }

  const evidencePath = String(aiEvidencePathInput?.value || "").trim();
  if (!evidencePath) {
    if (aiStatusText) {
      aiStatusText.textContent = "Please provide mounted evidence path.";
    }
    aiEvidencePathInput?.focus();
    return;
  }

  if (aiAnalyzeInProgress) {
    if (aiStatusText) {
      aiStatusText.textContent = "Analysis already running. Stop current run first.";
    }
    return;
  }

  if (aiMcpOrdersInput) {
    aiMcpOrdersInput.value = freeTextPrompt;
  }

  const applyUpdates = Boolean(aiInlineChatApplyUpdatesCheckbox?.checked);
  aiNextAnalyzeOrdersOverride = freeTextPrompt;
  aiNextAnalyzeResponseMode = applyUpdates ? "checklist" : "chat";
  // In plain chat mode, prevent sticky artifact selections from causing broad MCP fan-out.
  aiNextAnalyzeSelectedArtifactsOverride = applyUpdates ? null : [];

  if (aiInlineChatInput) {
    aiInlineChatInput.value = "";
    aiInlineChatInput.focus();
  }

  // Prefer the normal click path; if the control is temporarily disabled/stale,
  // dispatch the event directly so inline chat still enters the same analyze flow.
  if (aiAnalyzeButton && !aiAnalyzeButton.disabled) {
    aiAnalyzeButton.click();
    return;
  }

  if (aiAnalyzeButton) {
    aiAnalyzeButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return;
  }

  if (aiStatusText) {
    aiStatusText.textContent = "Analyze control is unavailable.";
  }
}

function updateAiChatButtonState() {
  const sessionReady = Boolean(aiSessionStatus?.active && aiSessionStatus?.model_loaded);
  if (aiOpenChatButton) {
    aiOpenChatButton.disabled = aiUiBusy || !sessionReady;
  }
}

function setAiInvestigationOutputVisible(isVisible, animate = false) {
  if (!aiInvestigationOutputSection) {
    return;
  }

  const visible = Boolean(isVisible);
  aiInvestigationOutputSection.classList.toggle("is-hidden", !visible);
  aiInvestigationOutputSection.setAttribute("aria-hidden", String(!visible));

  if (!visible) {
    setAiProcessingStatus({ visible: false });
    if (aiInlineChatComposer) {
      aiInlineChatComposer.hidden = true;
    }
  } else if (aiInlineChatComposer) {
    aiInlineChatComposer.hidden = false;
  }

  if (visible && animate) {
    aiInvestigationOutputSection.classList.remove("is-revealing");
    void aiInvestigationOutputSection.offsetWidth;
    aiInvestigationOutputSection.classList.add("is-revealing");
  } else {
    aiInvestigationOutputSection.classList.remove("is-revealing");
  }
}

function setAiProcessingStatus(options = {}) {
  if (!aiProcessingStatus || !aiProcessingStatusTrack) {
    return;
  }

  const visible = options.visible !== false;
  if (!visible) {
    aiProcessingStatus.hidden = true;
    aiProcessingStatusTrack.classList.remove("is-indeterminate");
    return;
  }

  const label = String(options.label || "Processing prompt...").trim() || "Processing prompt...";
  const rawPercent = Number(options.percent);
  const safePercent = Number.isFinite(rawPercent) ? Math.max(0, Math.min(100, Math.round(rawPercent))) : 0;
  const indeterminate = Boolean(options.indeterminate);

  aiProcessingStatus.hidden = false;

  if (aiProcessingStatusLabel) {
    aiProcessingStatusLabel.textContent = label;
  }
  if (aiProcessingStatusPercent) {
    aiProcessingStatusPercent.textContent = `${safePercent}%`;
  }

  aiProcessingStatusTrack.setAttribute("aria-valuenow", String(safePercent));
  aiProcessingStatusTrack.setAttribute("aria-label", label);

  if (indeterminate) {
    aiProcessingStatusTrack.classList.add("is-indeterminate");
    return;
  }

  aiProcessingStatusTrack.classList.remove("is-indeterminate");
  if (aiProcessingStatusBar) {
    aiProcessingStatusBar.style.width = `${safePercent}%`;
  }
}

function updateAiAnalyzeButtonState() {
  if (!aiAnalyzeButton) {
    return;
  }

  const isRunning = aiAnalyzeInProgress;
  const sessionReady = Boolean(aiSessionStatus?.active && aiSessionStatus?.model_loaded);

  aiAnalyzeButton.textContent = isRunning ? "Stop analysis" : "Analyze mounted disk";
  aiAnalyzeButton.title = isRunning ? "Stop current investigation" : "Analyze mounted disk";
  aiAnalyzeButton.classList.toggle("danger-btn", isRunning);
  aiAnalyzeButton.classList.toggle("primary-btn", !isRunning);
  aiAnalyzeButton.disabled = isRunning ? false : (aiUiBusy || !sessionReady);
}

function setAiAnalyzeRunning(isRunning) {
  aiAnalyzeInProgress = Boolean(isRunning);
  updateAiAnalyzeButtonState();
  if (aiInlineChatSendButton) {
    aiInlineChatSendButton.disabled = aiUiBusy || aiAnalyzeInProgress;
  }
}


async function requestAiAnalysisCancel() {
  try {
    await aiRequest("/api/ai/analyze/cancel", "POST", {});
  } catch {
    // Ignore cancellation request failures because local stream abort is primary.
  }
}

function setAiThinkingCollapsed(collapsed) {
  aiThinkingCollapsed = Boolean(collapsed);

  if (aiThinkingCard) {
    aiThinkingCard.classList.toggle("is-collapsed", aiThinkingCollapsed);
  }

  if (aiThinkingToggleButton) {
    aiThinkingToggleButton.textContent = aiThinkingCollapsed ? "Expand" : "Collapse";
    aiThinkingToggleButton.setAttribute("aria-expanded", String(!aiThinkingCollapsed));
    aiThinkingToggleButton.title = aiThinkingCollapsed ? "Expand thinking" : "Collapse thinking";
  }
}

aiThinkingToggleButton?.addEventListener("click", () => {
  setAiThinkingCollapsed(!aiThinkingCollapsed);
});

function setAiBackendStatus(online, detail = "") {
  aiBackendOnline = Boolean(online);
  if (!aiBackendStatusText || !aiBackendStatusLabel) {
    return;
  }

  aiBackendStatusText.classList.remove("is-checking", "is-online", "is-offline");
  aiBackendStatusText.classList.add(aiBackendOnline ? "is-online" : "is-offline");
  aiBackendStatusLabel.textContent = aiBackendOnline
    ? "Backend: online"
    : `Backend: offline${detail ? ` (${detail})` : ""}`;
}

async function checkBackendHealth() {
  const healthUrl = `${getAiBackendBaseUrl()}/api/ai/health`;
  try {
    const response = await fetch(healthUrl, { cache: "no-store" });
    if (!response.ok) {
      setAiBackendStatus(false, `HTTP ${response.status}`);
      return false;
    }

    const payload = await response.json().catch(() => ({}));
    setAiBackendStatus(Boolean(payload?.ok), payload?.ok ? "" : "unexpected response");
    return Boolean(payload?.ok);
  } catch {
    setAiBackendStatus(false, "not reachable");
    return false;
  }
}

function startAiBackendPoller() {
  if (aiBackendPollTimer) {
    window.clearInterval(aiBackendPollTimer);
  }

  checkBackendHealth();
  aiBackendPollTimer = window.setInterval(() => {
    checkBackendHealth();
  }, 3000);
}

async function requestBackendShutdown() {
  try {
    await aiRequest("/api/ai/server/shutdown", "POST", {});
  } catch {
    // Ignore shutdown request failures; backend may already be down.
  }
}

async function requestLauncherStart() {
  return launcherRequest("/api/launcher/start", "POST", {
    backend_url: getAiBackendBaseUrl()
  });
}

async function requestLauncherStop() {
  try {
    await launcherRequest("/api/launcher/stop", "POST", {});
  } catch {
    // Ignore launcher stop failures; process may already be stopped.
  }
}

async function waitForBackendOnline(timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const isOnline = await checkBackendHealth();
    if (isOnline) {
      return true;
    }
    await new Promise((resolve) => window.setTimeout(resolve, 500));
  }
  return false;
}

function getSelectedAiModel() {
  return String(aiModelSelect?.value || "").trim();
}

function getDefaultContextSpec() {
  return {
    min: 256,
    max: 262144,
    defaultValue: 8192
  };
}

function sanitizeContextSpec(rawSpec) {
  const fallback = getDefaultContextSpec();
  const minCandidate = Number.parseInt(String(rawSpec?.min ?? fallback.min), 10);
  const maxCandidate = Number.parseInt(String(rawSpec?.max ?? fallback.max), 10);
  const defaultCandidate = Number.parseInt(String(rawSpec?.defaultValue ?? fallback.defaultValue), 10);

  const min = Number.isFinite(minCandidate) && minCandidate > 0 ? minCandidate : fallback.min;
  const max = Number.isFinite(maxCandidate) && maxCandidate >= min ? maxCandidate : fallback.max;
  const defaultValue = Number.isFinite(defaultCandidate) && defaultCandidate >= min && defaultCandidate <= max
    ? defaultCandidate
    : Math.min(Math.max(fallback.defaultValue, min), max);

  return { min, max, defaultValue };
}

function getSelectedModelContextSpec() {
  const modelKey = getSelectedAiModel();
  if (modelKey && aiModelContextSpecs.has(modelKey)) {
    return sanitizeContextSpec(aiModelContextSpecs.get(modelKey));
  }
  return getDefaultContextSpec();
}

function getContextStorageKey(modelKey) {
  return `ai-context-length:${String(modelKey || "").trim()}`;
}

function formatContextLength(value) {
  const parsed = Number.parseInt(String(value ?? "").replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(parsed)) {
    return "";
  }
  return parsed.toLocaleString("en-US");
}

function parseContextLength(value) {
  const cleaned = String(value ?? "").replace(/[^\d]/g, "");
  return Number.parseInt(cleaned, 10);
}

function clampContextLength(value, spec = getSelectedModelContextSpec()) {
  const parsed = parseContextLength(value);
  const normalized = Number.isFinite(parsed) ? parsed : spec.defaultValue;
  return Math.max(spec.min, Math.min(spec.max, normalized));
}

function setContextControlsValue(value, spec = getSelectedModelContextSpec()) {
  const clamped = clampContextLength(value, spec);
  if (aiContextLengthInput) {
    aiContextLengthInput.value = formatContextLength(clamped);
  }
  if (aiContextLengthSlider) {
    aiContextLengthSlider.value = String(clamped);
  }
  return clamped;
}

function setContextInputOnly(value, spec = getSelectedModelContextSpec()) {
  const clamped = clampContextLength(value, spec);
  if (aiContextLengthInput) {
    aiContextLengthInput.value = formatContextLength(clamped);
  }
  return clamped;
}

function commitContextInputValue() {
  const spec = getSelectedModelContextSpec();
  const normalized = setContextControlsValue(aiContextLengthInput?.value, spec);
  persistContextLengthForSelectedModel(normalized);
  return normalized;
}

function persistContextLengthForSelectedModel(value) {
  const modelKey = getSelectedAiModel();
  if (!modelKey) {
    return;
  }
  const spec = getSelectedModelContextSpec();
  const clamped = clampContextLength(value, spec);
  sessionStorage.setItem(getContextStorageKey(modelKey), String(clamped));
}

function applyContextSpecForSelectedModel(preferredValue = null) {
  const spec = getSelectedModelContextSpec();

  if (aiContextLengthInput) {
    aiContextLengthInput.placeholder = `${formatContextLength(spec.defaultValue)}`;
  }

  if (aiContextLengthSlider) {
    aiContextLengthSlider.min = String(spec.min);
    aiContextLengthSlider.max = String(spec.max);
    aiContextLengthSlider.step = "1";
  }

  if (aiContextMinLabel) {
    aiContextMinLabel.textContent = `min ${formatContextLength(spec.min)}`;
  }
  if (aiContextMaxLabel) {
    aiContextMaxLabel.textContent = `max ${formatContextLength(spec.max)}`;
  }
  if (aiContextHint) {
    aiContextHint.textContent = `Use the slider to pick context length within this model's supported range. Default for this model: ${formatContextLength(spec.defaultValue)}.`;
  }

  const modelKey = getSelectedAiModel();
  const savedForModel = modelKey ? sessionStorage.getItem(getContextStorageKey(modelKey)) : null;
  const sourceValue = preferredValue ?? savedForModel ?? aiContextLengthInput?.value ?? spec.defaultValue;
  const normalized = setContextControlsValue(sourceValue, spec);
  persistContextLengthForSelectedModel(normalized);
}

function renderAiModelOptions(models, selectedModel = "") {
  if (!aiModelSelect) {
    return;
  }

  const modelList = Array.isArray(models) ? models : [];
  const options = ['<option value="">Select model...</option>'];
  modelList.forEach((model) => {
    const key = String(model?.key || "").trim();
    if (!key) {
      return;
    }

    const label = String(model?.display_name || key).trim();
    const isLoaded = Boolean(model?.loaded);
    const selected = key === selectedModel ? " selected" : "";
    const loadedSuffix = isLoaded ? " (loaded)" : "";
    options.push(`<option value="${escapeHtml(key)}"${selected}>${escapeHtml(label + loadedSuffix)}</option>`);
  });

  aiModelSelect.innerHTML = options.join("");
}

async function refreshAiModelList() {
  if (!aiModelSelect) {
    return;
  }

  const previous = getSelectedAiModel();
  aiModelSelect.innerHTML = '<option value="">Loading models...</option>';

  const backendReady = await checkBackendHealth();
  if (!backendReady) {
    try {
      await requestLauncherStart();
      const online = await waitForBackendOnline(20000);
      if (!online) {
        throw new Error("backend still offline");
      }
    } catch {
      aiModelSelect.innerHTML = '<option value="">Backend offline</option>';
      return;
    }
  }

  try {
    const payload = await aiRequest("/api/ai/models");
    const models = Array.isArray(payload?.models) ? payload.models : [];

    aiModelContextSpecs = new Map();
    models.forEach((model) => {
      const key = String(model?.key || "").trim();
      if (!key) {
        return;
      }
      aiModelContextSpecs.set(
        key,
        sanitizeContextSpec({
          min: model?.context_min,
          max: model?.context_max,
          defaultValue: model?.context_default
        })
      );
    });

    renderAiModelOptions(models, previous || sessionStorage.getItem("ai-model-key") || "");
    if (!getSelectedAiModel() && models.length) {
      aiModelSelect.value = String(models[0]?.key || "");
    }

    if (aiModelSelect.value) {
      sessionStorage.setItem("ai-model-key", aiModelSelect.value);
    }

    applyContextSpecForSelectedModel();
  } catch {
    aiModelSelect.innerHTML = '<option value="">Unable to fetch models</option>';
  }
}

function setAiSessionStatus(status) {
  aiSessionStatus = status && typeof status === "object" ? status : { active: false };
  if (aiSessionPill) {
    const stateText = aiSessionStatus.active ? "running" : "stopped";
    aiSessionPill.innerHTML = `<strong>Session:</strong> ${escapeHtml(stateText)}`;
  }

  if (aiModelLoadedText) {
    const loaded = Boolean(aiSessionStatus.model_loaded);
    const modelName = String(aiSessionStatus.model || "").trim();
    aiModelLoadedText.classList.toggle("is-loaded", loaded);
    aiModelLoadedText.classList.toggle("is-unloaded", !loaded);
    aiModelLoadedText.textContent = loaded
      ? `Model memory: loaded (${modelName || "selected model"})`
      : "Model memory: not loaded";
  }

  if (aiSessionToggleButton) {
    const isActive = Boolean(aiSessionStatus.active);
    aiSessionToggleButton.textContent = isActive ? "Stop session" : "Start session";
    aiSessionToggleButton.title = isActive ? "Stop session" : "Start session";
    aiSessionToggleButton.classList.toggle("danger-btn", isActive);
    aiSessionToggleButton.classList.toggle("primary-btn", !isActive);
  }

  const ready = Boolean(aiSessionStatus.active && aiSessionStatus.model_loaded);
  if (aiRuntimeSections) {
    aiRuntimeSections.classList.toggle("is-visible", ready);
    aiRuntimeSections.setAttribute("aria-hidden", String(!ready));
  }

  if (aiModelLoadingPlaceholder) {
    aiModelLoadingPlaceholder.classList.toggle("is-hidden", !aiIsStartingSession || ready);
  }

  if (!ready && !aiAnalyzeInProgress) {
    setAiInvestigationOutputVisible(false);
    setAiProcessingStatus({ visible: false });
  }

  updateAiAnalyzeButtonState();
  updateAiChatButtonState();

  if (aiModelLoadingCopy) {
    if (ready) {
      aiModelLoadingCopy.textContent = "AI Investigation tools are ready.";
    } else if (aiIsStartingSession) {
      aiModelLoadingCopy.textContent = "Loading selected model and preparing AI Investigation tools...";
    } else {
      aiModelLoadingCopy.textContent = "Start a session to load the selected model and unlock AI Investigation tools.";
    }
  }

  if (aiModelSelect && aiSessionStatus.model) {
    aiModelSelect.value = String(aiSessionStatus.model);
  }

  // Only sync from backend when a session is active to avoid wiping pending user choices.
  if (!aiContextSliderDragging && Boolean(aiSessionStatus.active) && typeof aiSessionStatus.context_length === "number") {
    applyContextSpecForSelectedModel(aiSessionStatus.context_length);
  }
}


function updateAiSelectedArtifactsCopy() {
  if (!aiSelectedArtifactsCopy) {
    return;
  }

  const selectedCount = aiSelectedArtifactIds.size;
  const totalCount = checklistData.length;
  if (!selectedCount) {
    aiSelectedArtifactsCopy.textContent = `0 selected (defaults to all ${totalCount} artifacts)`;
    return;
  }

  aiSelectedArtifactsCopy.textContent = `${selectedCount} selected artifact${selectedCount === 1 ? "" : "s"}`;
}

function getAiSelectableArtifacts() {
  return checklistData
    .map((item) => ({
      id: item.id,
      artifact: String(item.artifact || "").trim(),
      mitre: String(item.mitre || "").trim(),
      os: String(item.os || "").trim()
    }))
    .sort((left, right) => left.artifact.localeCompare(right.artifact, undefined, { sensitivity: "base" }));
}

function getAiArtifactsGroupedByMitre() {
  const grouped = new Map();
  getAiSelectableArtifacts().forEach((item) => {
    const category = item.mitre || "Unmapped";
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category).push(item);
  });

  const mitreIndex = new Map(mitreOrder.map((name, index) => [name, index]));

  return Array.from(grouped.entries())
    .map(([category, items]) => ({ category, items }))
    .sort((left, right) => {
      const leftIndex = mitreIndex.has(left.category) ? mitreIndex.get(left.category) : Number.POSITIVE_INFINITY;
      const rightIndex = mitreIndex.has(right.category) ? mitreIndex.get(right.category) : Number.POSITIVE_INFINITY;

      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }

      return left.category.localeCompare(right.category, undefined, { sensitivity: "base" });
    });
}

function syncAiToggleAllMitreButton() {
  if (!aiToggleAllMitreButton || !aiArtifactSelectionList) {
    return;
  }

  const groups = Array.from(aiArtifactSelectionList.querySelectorAll(".ai-artifact-selection-group"));
  if (!groups.length) {
    aiToggleAllMitreButton.disabled = true;
    aiToggleAllMitreButton.dataset.mode = "collapse";
    aiToggleAllMitreButton.textContent = "Collapse all";
    aiToggleAllMitreButton.setAttribute("aria-label", "Collapse all MITRE categories");
    return;
  }

  aiToggleAllMitreButton.disabled = false;
  const anyExpanded = groups.some((group) => !group.classList.contains("is-collapsed"));
  const mode = anyExpanded ? "collapse" : "expand";
  const label = anyExpanded ? "Collapse all" : "Expand all";

  aiToggleAllMitreButton.dataset.mode = mode;
  aiToggleAllMitreButton.textContent = label;
  aiToggleAllMitreButton.setAttribute("aria-label", `${label} MITRE categories`);
}

function setAiMitreGroupCollapsed(groupElement, collapse, animate = false) {
  if (!groupElement) {
    return;
  }

  const category = String(groupElement.dataset.aiMitreGroup || "").trim();
  const body = groupElement.querySelector(".ai-artifact-selection-group-body");
  const toggleButton = groupElement.querySelector("[data-ai-mitre-toggle]");
  const toggleText = toggleButton?.querySelector(".ai-artifact-selection-toggle-text");
  const shouldCollapse = Boolean(collapse);

  groupElement.classList.toggle("is-collapsed", shouldCollapse);

  if (category) {
    if (shouldCollapse) {
      aiCollapsedMitreGroups.add(category);
    } else {
      aiCollapsedMitreGroups.delete(category);
    }
  }

  if (toggleButton) {
    toggleButton.setAttribute("aria-expanded", shouldCollapse ? "false" : "true");
    if (toggleText) {
      toggleText.textContent = shouldCollapse ? "Expand" : "Collapse";
    }
  }

  if (!body) {
    syncAiToggleAllMitreButton();
    return;
  }

  const clearAnimatedStyles = () => {
    body.style.maxHeight = "";
    body.style.opacity = "";
    body.style.transform = "";
    body.style.transition = "";
    body.style.overflow = "";
  };

  if (!animate) {
    body.hidden = shouldCollapse;
    clearAnimatedStyles();
    syncAiToggleAllMitreButton();
    return;
  }

  const durationMs = 280;
  body.style.overflow = "hidden";
  body.style.transition = `max-height ${durationMs}ms var(--ease-standard), opacity ${durationMs}ms var(--ease-standard), transform ${durationMs}ms var(--ease-standard)`;

  if (shouldCollapse) {
    body.hidden = false;
    const startHeight = body.scrollHeight;
    body.style.maxHeight = `${startHeight}px`;
    body.style.opacity = "1";
    body.style.transform = "translateY(0)";
    // Force layout before transitioning so a single-group collapse animates reliably.
    void body.offsetHeight;

    body.style.maxHeight = "0px";
    body.style.opacity = "0";
    body.style.transform = "translateY(-6px)";

    const onCollapseEnd = (event) => {
      if (event.target !== body || event.propertyName !== "max-height") {
        return;
      }
      body.hidden = true;
      clearAnimatedStyles();
      syncAiToggleAllMitreButton();
    };

    body.addEventListener("transitionend", onCollapseEnd, { once: true });
    return;
  }

  body.hidden = false;
  body.style.maxHeight = "0px";
  body.style.opacity = "0";
  body.style.transform = "translateY(-6px)";
  // Force layout before transitioning so a single-group expand animates reliably.
  void body.offsetHeight;

  const targetHeight = body.scrollHeight;
  body.style.maxHeight = `${targetHeight}px`;
  body.style.opacity = "1";
  body.style.transform = "translateY(0)";

  const onExpandEnd = (event) => {
    if (event.target !== body || event.propertyName !== "max-height") {
      return;
    }
    clearAnimatedStyles();
    syncAiToggleAllMitreButton();
  };

  body.addEventListener("transitionend", onExpandEnd, { once: true });
}

function renderAiArtifactSelectionList() {
  if (!aiArtifactSelectionList) {
    return;
  }

  const options = getAiSelectableArtifacts();
  const validIds = new Set(options.map((item) => item.id));
  aiSelectedArtifactIds.forEach((id) => {
    if (!validIds.has(id)) {
      aiSelectedArtifactIds.delete(id);
    }
  });

  if (!options.length) {
    aiArtifactSelectionList.innerHTML = '<p class="ai-chat-paragraph">No artifacts available.</p>';
    updateAiSelectedArtifactsCopy();
    syncAiToggleAllMitreButton();
    return;
  }

  const grouped = getAiArtifactsGroupedByMitre();
  grouped.forEach((group) => {
    if (!aiSeenMitreGroups.has(group.category)) {
      aiSeenMitreGroups.add(group.category);
      aiCollapsedMitreGroups.add(group.category);
    }
  });

  aiArtifactSelectionList.innerHTML = grouped
    .map((group) => {
      const total = group.items.length;
      const selected = group.items.filter((item) => aiSelectedArtifactIds.has(item.id)).length;
      const checked = selected && selected === total ? "checked" : "";
      const collapsed = aiCollapsedMitreGroups.has(group.category);
      const collapsedClass = collapsed ? "is-collapsed" : "";
      const toggleLabel = collapsed ? "Expand" : "Collapse";

      const itemHtml = group.items
        .map((item) => {
          const itemChecked = aiSelectedArtifactIds.has(item.id) ? "checked" : "";
          return `
            <label class="ai-artifact-selection-item" role="option" aria-selected="${itemChecked ? "true" : "false"}">
              <input class="ai-artifact-checkbox" type="checkbox" data-ai-artifact-id="${escapeHtml(item.id)}" ${itemChecked}>
              <span>
                <p class="ai-artifact-selection-title">${escapeHtml(item.artifact || item.id)}</p>
                <p class="ai-artifact-selection-meta">${escapeHtml(group.category)} | ${escapeHtml(item.os || "Unknown OS")}</p>
              </span>
            </label>
          `;
        })
        .join("");

      return `
        <section class="ai-artifact-selection-group ${collapsedClass}" data-ai-mitre-group="${escapeHtml(group.category)}">
          <div class="ai-artifact-selection-group-header">
            <label class="ai-artifact-selection-category">
              <input class="ai-artifact-checkbox" type="checkbox" data-ai-mitre-category="${escapeHtml(group.category)}" ${checked}>
              <span class="ai-artifact-selection-tree-marker" aria-hidden="true"></span>
              <span class="ai-artifact-selection-category-label">${escapeHtml(group.category)}</span>
            </label>
            <div class="ai-artifact-selection-group-actions">
              <span class="ai-artifact-selection-category-count">${selected}/${total} selected</span>
              <button class="secondary-btn ai-artifact-selection-toggle" type="button" data-ai-mitre-toggle="${escapeHtml(group.category)}" aria-expanded="${collapsed ? "false" : "true"}">
                <span class="ai-artifact-selection-toggle-text">${toggleLabel}</span>
                <svg class="ai-artifact-selection-toggle-chevron" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M6 8l4 4 4-4"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="ai-artifact-selection-group-body" ${collapsed ? "hidden" : ""}>
            ${itemHtml}
          </div>
        </section>
      `;
    })
    .join("");

  updateAiSelectedArtifactsCopy();
  syncAiToggleAllMitreButton();
}

function getSelectedArtifactsForAnalyze() {
  if (!aiSelectedArtifactIds.size) {
    return [];
  }

  return Array.from(aiSelectedArtifactIds);
}

function applyAiArtifactUpdates(updates, mcpActivity = null) {
  if (!Array.isArray(updates) || !updates.length) {
    return 0;
  }

  let applied = 0;
  updates.forEach((update) => {
    const item = findChecklistItemForAiUpdate(update);
    if (!item) {
      return;
    }

    const entry = getEntry(item.id);
    let evidenceDetailsAdded = 0;
    if (typeof update.status === "string" && update.status.trim()) {
      entry.status = normalizeArtifactStatus(update.status.trim(), false);
    }

    const noteText = [update?.comment, update?.notes, update?.details]
      .map((value) => (typeof value === "string" ? value.trim() : ""))
      .find((value) => Boolean(value));

    if (noteText) {
      const prefix = entry.comment?.trim() ? `${entry.comment.trim()}\n\n` : "";
      entry.comment = `${prefix}${noteText}`;
    }

    if (Array.isArray(update.details) && update.details.length) {
      const nextDetails = update.details
        .filter((detail) => detail && typeof detail === "object")
        .map((detail) => ({
          id: `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          type: "",
          label: String(detail.label || "Evidence").trim() || "Evidence",
          value: String(detail.value || "").trim()
        }))
        .filter((detail) => detail.value);
      if (nextDetails.length) {
        entry.details = [...entry.details, ...nextDetails];
        evidenceDetailsAdded += nextDetails.length;
      }
    } else if (typeof update.details === "string" && update.details.trim()) {
      const value = update.details.trim();
      if (!isGenericEvidenceText(value)) {
        entry.details = [
          ...entry.details,
          {
            id: `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: "",
            label: "Evidence",
            value
          }
        ];
        evidenceDetailsAdded += 1;
      }
    }

    if (Array.isArray(update.evidence)) {
      const explicitEvidence = update.evidence
        .map((value) => String(value || "").trim())
        .filter((value) => value && !isGenericEvidenceText(value));
      explicitEvidence.forEach((value) => {
        entry.details = [
          ...entry.details,
          {
            id: `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: "",
            label: "Evidence",
            value
          }
        ];
        evidenceDetailsAdded += 1;
      });
    }

    if (evidenceDetailsAdded === 0) {
      const mcpEvidence = getMcpEvidenceForArtifact(item, mcpActivity);
      mcpEvidence.forEach((value) => {
        entry.details = [
          ...entry.details,
          {
            id: `detail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: "",
            label: "MCP evidence",
            value
          }
        ];
      });
    }

    markEntryUpdated(entry);
    applied += 1;
  });

  if (applied > 0) {
    saveState();
    render();
  }

  return applied;
}

async function refreshAiSessionStatus() {
  try {
    const payload = await aiRequest("/api/ai/session/status");
    setAiSessionStatus(payload);
    if (aiStatusText) {
      aiStatusText.textContent = payload.active
        ? `Session active. Model: ${payload.model || "unknown"}`
        : "No session active yet.";
    }
  } catch (error) {
    if (aiStatusText) {
      aiStatusText.textContent = `Status error: ${error.message}`;
    }
  }
}

function getArtifactEditorFormData() {
  return {
    os: artifactEditorOsInput.value.trim(),
    mitre: artifactEditorMitreInput.value.trim(),
    tags: artifactEditorTagsInput.value.trim(),
    artifact: artifactEditorNameInput.value.trim(),
    location: artifactEditorLocationInput.value.trim(),
    tool: artifactEditorToolInput.value.trim(),
    instructions: artifactEditorInstructionsInput.value.trim()
  };
}

function normalizeArtifactEditorTag(tag) {
  return String(tag || "").replace(/\s+/g, " ").trim();
}

function getUniqueArtifactEditorTags(tags) {
  const seen = new Set();
  const uniqueTags = [];
  tags.forEach((tag) => {
    const normalized = normalizeArtifactEditorTag(tag);
    if (!normalized) {
      return;
    }

    const token = normalized.toLocaleLowerCase();
    if (seen.has(token)) {
      return;
    }

    seen.add(token);
    uniqueTags.push(normalized);
  });

  return uniqueTags;
}

function syncArtifactEditorTagsInput() {
  if (!artifactEditorTagsInput) {
    return;
  }

  artifactEditorTagsInput.value = artifactEditorTagChips.join(", ");
}

function renderArtifactEditorTagChips() {
  if (!artifactEditorTagsChipList) {
    return;
  }

  artifactEditorTagsChipList.innerHTML = artifactEditorTagChips
    .map((tag, index) => `
      <span class="tag-chip">
        <span>${escapeHtml(tag)}</span>
        <button type="button" class="tag-chip-remove" data-action="remove-tag-chip" data-tag-index="${index}" aria-label="Remove tag ${escapeHtml(tag)}">x</button>
      </span>
    `)
    .join("");
}

function setArtifactEditorTags(tags) {
  artifactEditorTagChips = getUniqueArtifactEditorTags(tags);
  syncArtifactEditorTagsInput();
  renderArtifactEditorTagChips();
}

function addArtifactEditorTag(tag) {
  const normalized = normalizeArtifactEditorTag(tag);
  if (!normalized) {
    return false;
  }

  const token = normalized.toLocaleLowerCase();
  if (artifactEditorTagChips.some((existingTag) => existingTag.toLocaleLowerCase() === token)) {
    return false;
  }

  artifactEditorTagChips.push(normalized);
  syncArtifactEditorTagsInput();
  renderArtifactEditorTagChips();
  return true;
}

function removeArtifactEditorTagByIndex(index) {
  if (index < 0 || index >= artifactEditorTagChips.length) {
    return;
  }

  artifactEditorTagChips.splice(index, 1);
  syncArtifactEditorTagsInput();
  renderArtifactEditorTagChips();
}

function commitArtifactEditorTag(valueOverride = "") {
  const sourceValue = valueOverride || artifactEditorTagsComposerInput?.value || "";
  const didAdd = addArtifactEditorTag(sourceValue);
  if (artifactEditorTagsComposerInput) {
    artifactEditorTagsComposerInput.value = "";
    artifactEditorTagsComposerInput.focus({ preventScroll: true });
  }

  return didAdd;
}

function normalizeArtifactEditorOsValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getUniqueArtifactEditorOsValues(values) {
  const seen = new Set();
  const uniqueValues = [];
  values.forEach((value) => {
    const normalized = normalizeArtifactEditorOsValue(value);
    if (!normalized) {
      return;
    }

    const token = normalized.toLocaleLowerCase();
    if (seen.has(token)) {
      return;
    }

    seen.add(token);
    uniqueValues.push(normalized);
  });

  return uniqueValues;
}

function syncArtifactEditorOsInput() {
  if (!artifactEditorOsInput) {
    return;
  }

  artifactEditorOsInput.value = artifactEditorOsChips.join(" / ");
}

function renderArtifactEditorOsChips() {
  if (!artifactEditorOsChipList) {
    return;
  }

  artifactEditorOsChipList.innerHTML = artifactEditorOsChips
    .map((value, index) => `
      <span class="tag-chip">
        <span>${escapeHtml(value)}</span>
        <button type="button" class="tag-chip-remove" data-action="remove-os-chip" data-os-index="${index}" aria-label="Remove operating system ${escapeHtml(value)}">x</button>
      </span>
    `)
    .join("");
}

function setArtifactEditorOsValues(values) {
  artifactEditorOsChips = getUniqueArtifactEditorOsValues(values);
  syncArtifactEditorOsInput();
  renderArtifactEditorOsChips();
}

function addArtifactEditorOsValue(value) {
  const normalized = normalizeArtifactEditorOsValue(value);
  if (!normalized) {
    return false;
  }

  const token = normalized.toLocaleLowerCase();
  if (artifactEditorOsChips.some((existingValue) => existingValue.toLocaleLowerCase() === token)) {
    return false;
  }

  artifactEditorOsChips.push(normalized);
  syncArtifactEditorOsInput();
  renderArtifactEditorOsChips();
  return true;
}

function removeArtifactEditorOsValueByIndex(index) {
  if (index < 0 || index >= artifactEditorOsChips.length) {
    return;
  }

  artifactEditorOsChips.splice(index, 1);
  syncArtifactEditorOsInput();
  renderArtifactEditorOsChips();
}

function commitArtifactEditorOsValue(valueOverride = "") {
  const sourceValue = valueOverride || artifactEditorOsComposerInput?.value || "";
  const didAdd = addArtifactEditorOsValue(sourceValue);
  if (artifactEditorOsComposerInput) {
    artifactEditorOsComposerInput.value = "";
    artifactEditorOsComposerInput.focus({ preventScroll: true });
  }

  return didAdd;
}

function normalizeArtifactEditorMitreValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getUniqueArtifactEditorMitreValues(values) {
  const seen = new Set();
  const uniqueValues = [];
  values.forEach((value) => {
    const normalized = normalizeArtifactEditorMitreValue(value);
    if (!normalized) {
      return;
    }

    const token = normalized.toLocaleLowerCase();
    if (seen.has(token)) {
      return;
    }

    seen.add(token);
    uniqueValues.push(normalized);
  });

  return uniqueValues;
}

function syncArtifactEditorMitreInput() {
  if (!artifactEditorMitreInput) {
    return;
  }

  artifactEditorMitreInput.value = artifactEditorMitreChips.join(" / ");
}

function renderArtifactEditorMitreChips() {
  if (!artifactEditorMitreChipList) {
    return;
  }

  artifactEditorMitreChipList.innerHTML = artifactEditorMitreChips
    .map((value, index) => `
      <span class="tag-chip">
        <span>${escapeHtml(value)}</span>
        <button type="button" class="tag-chip-remove" data-action="remove-mitre-chip" data-mitre-index="${index}" aria-label="Remove MITRE tactic ${escapeHtml(value)}">x</button>
      </span>
    `)
    .join("");

  syncArtifactEditorMitreSelectorOptions();
}

function syncArtifactEditorMitreSelectorOptions() {
  if (!artifactEditorMitreSelector) {
    return;
  }

  const selectedTokens = new Set(artifactEditorMitreChips.map((value) => value.toLocaleLowerCase()));
  const availableMitreValues = mitreOrder.filter((value) => !selectedTokens.has(value.toLocaleLowerCase()));

  artifactEditorMitreSelector.innerHTML = '<option value="" selected hidden></option>';
  availableMitreValues.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    artifactEditorMitreSelector.appendChild(option);
  });

  artifactEditorMitreSelector.value = "";
  artifactEditorMitreSelector.disabled = availableMitreValues.length === 0;
}

function setArtifactEditorMitreValues(values) {
  artifactEditorMitreChips = getUniqueArtifactEditorMitreValues(values);
  syncArtifactEditorMitreInput();
  renderArtifactEditorMitreChips();
}

function addArtifactEditorMitreValue(value) {
  const normalized = normalizeArtifactEditorMitreValue(value);
  if (!normalized) {
    return false;
  }

  const token = normalized.toLocaleLowerCase();
  if (artifactEditorMitreChips.some((existingValue) => existingValue.toLocaleLowerCase() === token)) {
    return false;
  }

  artifactEditorMitreChips.push(normalized);
  syncArtifactEditorMitreInput();
  renderArtifactEditorMitreChips();
  return true;
}

function removeArtifactEditorMitreValueByIndex(index) {
  if (index < 0 || index >= artifactEditorMitreChips.length) {
    return;
  }

  artifactEditorMitreChips.splice(index, 1);
  syncArtifactEditorMitreInput();
  renderArtifactEditorMitreChips();
}

function normalizeArtifactEditorToolValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getUniqueArtifactEditorToolValues(values) {
  const seen = new Set();
  const uniqueValues = [];
  values.forEach((value) => {
    const normalized = normalizeArtifactEditorToolValue(value);
    if (!normalized) {
      return;
    }

    const token = normalized.toLocaleLowerCase();
    if (seen.has(token)) {
      return;
    }

    seen.add(token);
    uniqueValues.push(normalized);
  });

  return uniqueValues;
}

function syncArtifactEditorToolInput() {
  if (!artifactEditorToolInput) {
    return;
  }

  artifactEditorToolInput.value = artifactEditorToolChips.join(" / ");
}

function renderArtifactEditorToolChips() {
  if (!artifactEditorToolChipList) {
    return;
  }

  artifactEditorToolChipList.innerHTML = artifactEditorToolChips
    .map((value, index) => `
      <span class="tag-chip">
        <span>${escapeHtml(value)}</span>
        <button type="button" class="tag-chip-remove" data-action="remove-tool-chip" data-tool-index="${index}" aria-label="Remove tool ${escapeHtml(value)}">x</button>
      </span>
    `)
    .join("");
}

function setArtifactEditorToolValues(values) {
  artifactEditorToolChips = getUniqueArtifactEditorToolValues(values);
  syncArtifactEditorToolInput();
  renderArtifactEditorToolChips();
}

function addArtifactEditorToolValue(value) {
  const normalized = normalizeArtifactEditorToolValue(value);
  if (!normalized) {
    return false;
  }

  const token = normalized.toLocaleLowerCase();
  if (artifactEditorToolChips.some((existingValue) => existingValue.toLocaleLowerCase() === token)) {
    return false;
  }

  artifactEditorToolChips.push(normalized);
  syncArtifactEditorToolInput();
  renderArtifactEditorToolChips();
  return true;
}

function removeArtifactEditorToolValueByIndex(index) {
  if (index < 0 || index >= artifactEditorToolChips.length) {
    return;
  }

  artifactEditorToolChips.splice(index, 1);
  syncArtifactEditorToolInput();
  renderArtifactEditorToolChips();
}

function commitArtifactEditorToolValue(valueOverride = "") {
  const sourceValue = valueOverride || artifactEditorToolComposerInput?.value || "";
  const didAdd = addArtifactEditorToolValue(sourceValue);
  if (artifactEditorToolComposerInput) {
    artifactEditorToolComposerInput.value = "";
    artifactEditorToolComposerInput.focus({ preventScroll: true });
  }

  return didAdd;
}

function normalizeArtifactEditorPath(pathValue) {
  return String(pathValue || "").replace(/\s+/g, " ").trim();
}

function splitArtifactEditorLocationPaths(rawLocation) {
  return String(rawLocation || "")
    .split(/(?:\r?\n|;|\|)+/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function getUniqueArtifactEditorPaths(paths) {
  const seen = new Set();
  const uniquePaths = [];
  paths.forEach((pathValue) => {
    const normalized = normalizeArtifactEditorPath(pathValue);
    if (!normalized) {
      return;
    }

    const token = normalized.toLocaleLowerCase();
    if (seen.has(token)) {
      return;
    }

    seen.add(token);
    uniquePaths.push(normalized);
  });

  return uniquePaths;
}

function syncArtifactEditorLocationInput() {
  if (!artifactEditorLocationInput) {
    return;
  }

  artifactEditorLocationInput.value = artifactEditorLocationChips.join(" ; ");
}

function renderArtifactEditorLocationChips() {
  if (!artifactEditorLocationChipList) {
    return;
  }

  artifactEditorLocationChipList.innerHTML = artifactEditorLocationChips
    .map((pathValue, index) => `
      <span class="tag-chip">
        <span>${escapeHtml(pathValue)}</span>
        <button type="button" class="tag-chip-remove" data-action="remove-path-chip" data-path-index="${index}" aria-label="Remove path ${escapeHtml(pathValue)}">x</button>
      </span>
    `)
    .join("");
}

function setArtifactEditorLocationPaths(paths) {
  artifactEditorLocationChips = getUniqueArtifactEditorPaths(paths);
  syncArtifactEditorLocationInput();
  renderArtifactEditorLocationChips();
}

function addArtifactEditorLocationPath(pathValue) {
  const normalized = normalizeArtifactEditorPath(pathValue);
  if (!normalized) {
    return false;
  }

  const token = normalized.toLocaleLowerCase();
  if (artifactEditorLocationChips.some((existingPath) => existingPath.toLocaleLowerCase() === token)) {
    return false;
  }

  artifactEditorLocationChips.push(normalized);
  syncArtifactEditorLocationInput();
  renderArtifactEditorLocationChips();
  return true;
}

function removeArtifactEditorLocationPathByIndex(index) {
  if (index < 0 || index >= artifactEditorLocationChips.length) {
    return;
  }

  artifactEditorLocationChips.splice(index, 1);
  syncArtifactEditorLocationInput();
  renderArtifactEditorLocationChips();
}

function commitArtifactEditorLocationPath(valueOverride = "") {
  const sourceValue = valueOverride || artifactEditorLocationComposerInput?.value || "";
  const didAdd = addArtifactEditorLocationPath(sourceValue);
  if (artifactEditorLocationComposerInput) {
    artifactEditorLocationComposerInput.value = "";
    artifactEditorLocationComposerInput.focus({ preventScroll: true });
  }

  return didAdd;
}

function getUniqueSortedValues(values) {
  const canonicalByToken = new Map();
  values.forEach((value) => {
    const cleaned = String(value || "").replace(/\s+/g, " ").trim();
    if (!cleaned) {
      return;
    }

    const token = cleaned.toLocaleLowerCase();
    if (!canonicalByToken.has(token)) {
      canonicalByToken.set(token, cleaned);
    }
  });

  return [...canonicalByToken.values()].sort((left, right) => left.localeCompare(right, undefined, { sensitivity: "base" }));
}

function getArtifactEditorSuggestionPool(fieldKey) {
  if (fieldKey === "os") {
    const osValues = [];
    checklistData.forEach((item) => {
      splitArtifactEditorOsValues(item.os).forEach((value) => {
        if (value) {
          osValues.push(value);
        }
      });
    });

    const selectedTokens = new Set(artifactEditorOsChips.map((value) => value.toLocaleLowerCase()));
    return getUniqueSortedValues(osValues).filter((value) => !selectedTokens.has(value.toLocaleLowerCase()));
  }

  if (fieldKey === "tags") {
    const tagValues = [];
    checklistData.forEach((item) => {
      splitTags(item.tags).forEach((tag) => {
        if (tag) {
          tagValues.push(tag);
        }
      });
    });

    const selectedTagTokens = new Set(artifactEditorTagChips.map((tag) => tag.toLocaleLowerCase()));
    return getUniqueSortedValues(tagValues).filter((tag) => !selectedTagTokens.has(tag.toLocaleLowerCase()));
  }

  if (fieldKey === "location") {
    const locationValues = [];
    checklistData.forEach((item) => {
      splitArtifactEditorLocationPaths(item.location).forEach((pathValue) => {
        if (pathValue) {
          locationValues.push(pathValue);
        }
      });
    });

    const selectedPathTokens = new Set(artifactEditorLocationChips.map((pathValue) => pathValue.toLocaleLowerCase()));
    return getUniqueSortedValues(locationValues).filter((pathValue) => !selectedPathTokens.has(pathValue.toLocaleLowerCase()));
  }

  if (fieldKey === "tool") {
    const toolValues = [];
    checklistData.forEach((item) => {
      splitArtifactEditorToolValues(item.tool).forEach((value) => {
        if (value) {
          toolValues.push(value);
        }
      });
    });

    const selectedTokens = new Set(artifactEditorToolChips.map((value) => value.toLocaleLowerCase()));
    return getUniqueSortedValues(toolValues).filter((value) => !selectedTokens.has(value.toLocaleLowerCase()));
  }

  return getUniqueSortedValues(checklistData.map((item) => item?.[fieldKey]));
}

function getSuggestionMatches(pool, query, limit = 3) {
  const normalizedQuery = String(query || "").trim().toLocaleLowerCase();
  if (!normalizedQuery) {
    return pool.slice(0, limit);
  }

  const startsWithMatches = [];
  const includesMatches = [];
  pool.forEach((entry) => {
    const token = entry.toLocaleLowerCase();
    if (token.startsWith(normalizedQuery)) {
      startsWithMatches.push(entry);
    } else if (token.includes(normalizedQuery)) {
      includesMatches.push(entry);
    }
  });

  return [...startsWithMatches, ...includesMatches].slice(0, limit);
}

function getSuggestionItems(pool, query, limit = 3) {
  const normalizedQuery = String(query || "").replace(/\s+/g, " ").trim();
  const matches = getSuggestionMatches(pool, normalizedQuery, limit).map((value) => ({ value, label: value, isCreate: false }));

  if (!normalizedQuery) {
    return matches;
  }

  const exists = pool.some((entry) => entry.toLocaleLowerCase() === normalizedQuery.toLocaleLowerCase());
  if (exists) {
    return matches.slice(0, limit);
  }

  const createSuggestion = {
    value: normalizedQuery,
    label: `+ ${normalizedQuery}`,
    isCreate: true
  };

  return [createSuggestion, ...matches].slice(0, limit);
}

function createArtifactEditorSuggestionBox(input) {
  const field = input.closest(".field");
  if (!field) {
    return null;
  }

  field.classList.add("field-autocomplete");
  const host = document.createElement("div");
  host.className = "artifact-editor-suggestions";
  host.dataset.suggestionHost = "true";
  host.hidden = true;
  host.setAttribute("role", "listbox");
  field.appendChild(host);
  return host;
}

function closeAllArtifactEditorSuggestionBoxes() {
  document.querySelectorAll('[data-suggestion-host="true"]').forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }

    node.hidden = true;
    node.classList.remove("is-open");
    node.innerHTML = "";
  });
}

function setArtifactInputValueFromSuggestion(config, suggestion) {
  const input = config.input;
  if (!input) {
    return;
  }

  if (config.mode === "tags") {
    commitArtifactEditorTag(suggestion.value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  if (config.mode === "os") {
    commitArtifactEditorOsValue(suggestion.value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  if (config.mode === "paths") {
    commitArtifactEditorLocationPath(suggestion.value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  if (config.mode === "tools") {
    commitArtifactEditorToolValue(suggestion.value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  input.value = suggestion.value;

  const caretPosition = input.value.length;
  input.focus({ preventScroll: true });
  input.setSelectionRange(caretPosition, caretPosition);
}

function bindArtifactEditorAutocomplete(config) {
  const input = config.input;
  if (!input) {
    return;
  }

  const suggestionsHost = createArtifactEditorSuggestionBox(input);
  if (!suggestionsHost) {
    return;
  }

  let highlightedIndex = 0;
  let activeSuggestions = [];

  const getQuery = () => {
    return input.value.trim();
  };

  const closeSuggestions = () => {
    activeSuggestions = [];
    highlightedIndex = 0;
    suggestionsHost.hidden = true;
    suggestionsHost.classList.remove("is-open");
    suggestionsHost.innerHTML = "";
  };

  const openSuggestions = () => {
    if (document.activeElement !== input) {
      closeSuggestions();
      return;
    }

    const pool = getArtifactEditorSuggestionPool(config.key);
    activeSuggestions = getSuggestionItems(pool, getQuery(), 3);

    if (!activeSuggestions.length) {
      closeSuggestions();
      return;
    }

    closeAllArtifactEditorSuggestionBoxes();

    highlightedIndex = Math.min(highlightedIndex, activeSuggestions.length - 1);
    suggestionsHost.innerHTML = "";
    activeSuggestions.forEach((suggestion, index) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "artifact-editor-suggestion-item";
      if (index === highlightedIndex) {
        option.classList.add("is-active");
      }
      if (suggestion.isCreate) {
        option.classList.add("is-create");
      }
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(index === highlightedIndex));
      option.textContent = suggestion.label;
      option.addEventListener("mousedown", (event) => {
        event.preventDefault();
        setArtifactInputValueFromSuggestion(config, suggestion);
        highlightedIndex = 0;
        if (suggestion.isCreate) {
          closeSuggestions();
          return;
        }
        openSuggestions();
      });
      suggestionsHost.appendChild(option);
    });

    suggestionsHost.hidden = false;
    suggestionsHost.classList.add("is-open");
  };

  input.addEventListener("focus", () => {
    highlightedIndex = 0;
    openSuggestions();
  });

  input.addEventListener("input", () => {
    highlightedIndex = 0;
    openSuggestions();
  });

  input.addEventListener("keydown", (event) => {
    if (suggestionsHost.hidden || !activeSuggestions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % activeSuggestions.length;
      openSuggestions();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      highlightedIndex = (highlightedIndex - 1 + activeSuggestions.length) % activeSuggestions.length;
      openSuggestions();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selectedSuggestion = activeSuggestions[highlightedIndex];
      if (config.mode === "tags" || config.mode === "paths" || config.mode === "os" || config.mode === "tools") {
        if (config.mode === "tags") {
          commitArtifactEditorTag(selectedSuggestion.value);
        } else if (config.mode === "paths") {
          commitArtifactEditorLocationPath(selectedSuggestion.value);
        } else if (config.mode === "os") {
          commitArtifactEditorOsValue(selectedSuggestion.value);
        } else {
          commitArtifactEditorToolValue(selectedSuggestion.value);
        }
        highlightedIndex = 0;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        if (selectedSuggestion.isCreate) {
          closeSuggestions();
          return;
        }
        openSuggestions();
        return;
      }

      setArtifactInputValueFromSuggestion(config, selectedSuggestion);
      highlightedIndex = 0;
      if (selectedSuggestion.isCreate) {
        closeSuggestions();
        return;
      }
      openSuggestions();
      return;
    }

    if (event.key === "Escape") {
      closeSuggestions();
    }
  });

  input.addEventListener("blur", () => {
    window.setTimeout(() => {
      if (document.activeElement !== input && !suggestionsHost.contains(document.activeElement)) {
        closeSuggestions();
      }
    }, 100);
  });
}

function setupArtifactEditorAutocomplete() {
  artifactEditorAutoSuggestConfig.forEach((config) => {
    bindArtifactEditorAutocomplete(config);
  });
}

function getNextArtifactId() {
  const existingIds = new Set(checklistData.map((item) => item.id));
  let nextIndex = checklistData.length + 1;
  let candidateId = `artifact-${nextIndex}`;

  while (existingIds.has(candidateId)) {
    nextIndex += 1;
    candidateId = `artifact-${nextIndex}`;
  }

  return candidateId;
}

function resetArtifactEditorForm(setFocus = false) {
  if (!artifactEditorForm) {
    return;
  }

  artifactEditorForm.reset();
  setArtifactEditorOsValues([]);
  setArtifactEditorMitreValues([]);
  setArtifactEditorTags([]);
  setArtifactEditorLocationPaths([]);
  setArtifactEditorToolValues([]);
  artifactEditorIdInput.value = "";
  if (artifactEditorSubmitButton) {
    artifactEditorSubmitButton.textContent = "Add artifact";
  }
  if (artifactEditorHint) {
    artifactEditorHint.textContent = "Select Edit to load an artifact into the form.";
  }

  if (setFocus) {
    artifactEditorNameInput.focus();
  }
}

function renderArtifactEditorList() {
  if (!artifactEditorList) {
    return;
  }

  const sortedItems = [...checklistData].sort((left, right) => {
    const mitreDelta = left.mitre.localeCompare(right.mitre, undefined, { sensitivity: "base" });
    if (mitreDelta !== 0) {
      return mitreDelta;
    }
    return left.artifact.localeCompare(right.artifact, undefined, { sensitivity: "base" });
  });

  if (!sortedItems.length) {
    artifactEditorList.innerHTML = '<p class="advanced-note">No artifacts available.</p>';
  } else {
    artifactEditorList.innerHTML = sortedItems
      .map((item) => `
        <article class="artifact-editor-item" role="listitem" data-artifact-id="${escapeHtml(item.id)}">
          <div class="artifact-editor-item-main">
            <p class="artifact-editor-item-title">${escapeHtml(item.artifact)}</p>
            <p class="artifact-editor-item-meta">${escapeHtml(item.mitre)} | ${escapeHtml(item.os)} | ${escapeHtml(item.tags)}</p>
          </div>
          <div class="artifact-editor-item-actions">
            <button class="secondary-btn" type="button" data-action="edit-artifact" data-artifact-id="${escapeHtml(item.id)}">Edit</button>
            <button class="danger-btn" type="button" data-action="delete-artifact" data-artifact-id="${escapeHtml(item.id)}">Delete</button>
          </div>
        </article>
      `)
      .join("");
  }

  if (artifactEditorCount) {
    artifactEditorCount.innerHTML = `<strong>${checklistData.length}</strong> artifacts`;
  }
}

function loadArtifactIntoEditor(artifactId) {
  const item = findItemById(artifactId);
  if (!item || !artifactEditorForm) {
    return;
  }

  artifactEditorIdInput.value = item.id;
  setArtifactEditorOsValues(splitArtifactEditorOsValues(item.os));
  if (artifactEditorOsComposerInput) {
    artifactEditorOsComposerInput.value = "";
  }
  setArtifactEditorMitreValues(splitArtifactEditorMitreValues(item.mitre));
  if (artifactEditorMitreSelector) {
    artifactEditorMitreSelector.value = "";
  }
  setArtifactEditorTags(splitTags(item.tags));
  if (artifactEditorTagsComposerInput) {
    artifactEditorTagsComposerInput.value = "";
  }
  setArtifactEditorLocationPaths(splitArtifactEditorLocationPaths(item.location));
  if (artifactEditorLocationComposerInput) {
    artifactEditorLocationComposerInput.value = "";
  }
  artifactEditorNameInput.value = item.artifact;
  setArtifactEditorToolValues(splitArtifactEditorToolValues(item.tool));
  if (artifactEditorToolComposerInput) {
    artifactEditorToolComposerInput.value = "";
  }
  artifactEditorInstructionsInput.value = item.instructions;

  if (artifactEditorSubmitButton) {
    artifactEditorSubmitButton.textContent = "Save changes";
  }
  if (artifactEditorHint) {
    artifactEditorHint.textContent = `Editing: ${item.artifact}`;
  }

  setAppView("artifacts");
  artifactEditorNameInput.focus();
}

function onChecklistDataChanged() {
  refreshDerivedCollections();
  buildOptions();
  persistFiltersToState();
  state.filters = sanitizeFilters(state.filters);

  if (activeOverlayArtifactId && !findItemById(activeOverlayArtifactId)) {
    closeOverlay();
  }

  expandedArtifactIds.forEach((artifactId) => {
    if (!findItemById(artifactId)) {
      expandedArtifactIds.delete(artifactId);
    }
  });

  Object.keys(state.entries).forEach((artifactId) => {
    if (!findItemById(artifactId)) {
      delete state.entries[artifactId];
    }
  });

  hasBuiltLayout = false;
  sectionRegistry.clear();
  artifactRegistry.clear();

  render();
  renderArtifactEditorList();
  renderAiArtifactSelectionList();
  saveArtifactsData();
  saveState();
}

function deleteArtifact(artifactId) {
  const index = checklistData.findIndex((item) => item.id === artifactId);
  if (index === -1) {
    return;
  }

  checklistData.splice(index, 1);
  onChecklistDataChanged();

  if (artifactEditorIdInput.value === artifactId) {
    resetArtifactEditorForm();
  }
}

sectionsEl.addEventListener("change", (event) => {
  const target = event.target;
  const card = target.closest(".artifact-card");
  if (!card) {
    return;
  }

  const artifactId = card.dataset.artifactId;
  const entry = getEntry(artifactId);

  if (target.dataset.action === "set-status") {
    entry.status = normalizeArtifactStatus(target.value, false);
    markEntryUpdated(entry);
    saveState();
    syncArtifactStatusState(artifactId);
  }
});

sectionsEl.addEventListener("click", (event) => {
  const detailsSummary = event.target.closest(".artifact-details > summary");
  if (detailsSummary) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  const sectionCollapseToggle = event.target.closest('[data-action="toggle-section-collapse"]');
  if (sectionCollapseToggle) {
    const mitreName = sectionCollapseToggle.dataset.mitre;
    if (!mitreName) {
      return;
    }

    const section = sectionCollapseToggle.closest(".mitre-section");
    if (section) {
      const nextCollapsedState = !Boolean(state.collapsedSections[mitreName]);
      setSectionCollapsed(section, mitreName, nextCollapsedState);
      syncGlobalSectionsToggleButton();
    }
    saveState();
    return;
  }

  const detailsToggle = event.target.closest('[data-action="toggle-details"]');
  if (detailsToggle) {
    const card = detailsToggle.closest(".artifact-card");
    const details = card?.querySelector(".artifact-details");
    if (!details) {
      return;
    }

    setDetailsExpanded(details, details.dataset.expanded !== "true");
    return;
  }

  const zoomButton = event.target.closest('[data-action="open-overlay"]');
  if (zoomButton) {
    const item = findItemById(zoomButton.dataset.artifactId);
    renderOverlay(item);
    return;
  }

  const closeZoomButton = event.target.closest('[data-action="close-overlay"]');
  if (closeZoomButton) {
    closeOverlay();
    return;
  }

  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) {
    return;
  }

  if (actionButton.dataset.action === "open-detail-dialog") {
    openDetailInsertDialog(actionButton.dataset.artifactId);
    return;
  }

  if (actionButton.dataset.action === "remove-detail") {
    const artifactId = actionButton.dataset.artifactId;
    const detailId = actionButton.dataset.detailId;
    if (artifactId && detailId) {
      removeStructuredDetail(artifactId, detailId);
    }
    return;
  }

  const section = actionButton.closest(".mitre-section");
  if (!section) {
    return;
  }

  if (actionButton.dataset.action === "toggle-section-details") {
    const detailsList = section.querySelectorAll(".artifact-card:not([hidden]) .artifact-details");
    const shouldExpand = actionButton.dataset.mode !== "collapse";

    detailsList.forEach((details) => {
      setDetailsExpanded(details, shouldExpand);
    });

    syncSectionToggleButton(section);
  }
});

sectionsEl.addEventListener("keydown", (event) => {
  const detailsSummary = event.target.closest(".artifact-details > summary");
  if (!detailsSummary) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
  }
});

sectionsEl.addEventListener("input", (event) => {
  const target = event.target;
  const card = target.closest(".artifact-card");
  if (!card || target.dataset.action !== "comment-input") {
    return;
  }

  const artifactId = card.dataset.artifactId;
  const entry = getEntry(artifactId);
  const hadNotes = hasNotes(entry);
  entry.comment = target.value;
  const hasCommentNow = hasNotes(entry);
  markEntryUpdated(entry);
  scheduleStateSave();

  updateCommentPills(artifactId, hasCommentNow);

  const overlayTextarea = overlayContent.querySelector(`[data-action="overlay-comment-input"][data-artifact-id="${artifactId}"]`);
  if (overlayTextarea && overlayTextarea.value !== target.value) {
    overlayTextarea.value = target.value;
  }

  if (filterRenderTimer) {
    pendingRenderFocusState = captureCommentFocusState();
  }

  if (hadNotes !== hasCommentNow) {
    scheduleRender();
  } else {
    updateSummaryStats(getFilteredItems().length);
  }
});

artifactOverlay.addEventListener("click", (event) => {
  if (event.target === artifactOverlay) {
    closeOverlay();
  }
});

overlayCloseButton.addEventListener("click", closeOverlay);

resetDialog.addEventListener("click", (event) => {
  if (event.target === resetDialog) {
    closeResetDialog();
  }
});

aiClearHistoryDialog?.addEventListener("click", (event) => {
  if (event.target === aiClearHistoryDialog) {
    closeAiClearHistoryDialog();
  }
});

detailInsertDialog.addEventListener("click", (event) => {
  if (event.target === detailInsertDialog) {
    closeDetailInsertDialog();
  }
});

shortcutDialog.addEventListener("click", (event) => {
  if (event.target === shortcutDialog) {
    closeShortcutDialog();
  }
});

aiPromptDialog?.addEventListener("click", (event) => {
  if (event.target === aiPromptDialog) {
    closeAiPromptDialog();
  }
});

tutorialDialog?.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");
  if (actionButton?.dataset.action === "toggle-step-details") {
    const stepKey = actionButton.dataset.stepKey || "";
    if (stepKey && activeTutorialArtifactId) {
      if (expandedTutorialStepKeys.has(stepKey)) {
        expandedTutorialStepKeys.delete(stepKey);
      } else {
        expandedTutorialStepKeys.add(stepKey);
      }

      const item = findItemById(activeTutorialArtifactId);
      renderTutorialDialog(item);
    }
    return;
  }

  if (actionButton?.dataset.action === "tutorial-map-zoom-in") {
    const rect = tutorialMapViewportEl?.getBoundingClientRect();
    if (rect) {
      zoomTutorialMap(0.1, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    return;
  }

  if (actionButton?.dataset.action === "tutorial-map-zoom-out") {
    const rect = tutorialMapViewportEl?.getBoundingClientRect();
    if (rect) {
      zoomTutorialMap(-0.1, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    return;
  }

  if (actionButton?.dataset.action === "tutorial-map-reset") {
    applyTutorialMapTransform(28, 24, 1, true);
    return;
  }

  if (actionButton?.dataset.action === "toggle-branch-paths") {
    if (activeTutorialArtifactId) {
      showTutorialBranches = !showTutorialBranches;
      const item = findItemById(activeTutorialArtifactId);
      renderTutorialDialog(item);
    }
    return;
  }

  if (actionButton?.dataset.action === "close-tool-details") {
    if (activeTutorialArtifactId) {
      activeTutorialTool = "";
      const item = findItemById(activeTutorialArtifactId);
      renderTutorialDialog(item);
    }
    return;
  }

  const toolNode = event.target.closest('[data-action="open-tool-details"]');
  if (toolNode && activeTutorialArtifactId) {
    event.preventDefault();
    event.stopPropagation();
    openTutorialToolDetails(toolNode.dataset.tool || "");
    return;
  }

  if (event.target === tutorialDialog) {
    closeTutorialDialog();
  }
});

tutorialDialog?.addEventListener("dblclick", (event) => {
  const toolNode = event.target.closest('[data-action="open-tool-details"]');
  if (!toolNode || !activeTutorialArtifactId) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
});

resetDialogCloseButton.addEventListener("click", closeResetDialog);
resetDialogCancelButton.addEventListener("click", closeResetDialog);
resetDialogConfirmButton.addEventListener("click", resetSavedState);
aiClearHistoryDialogCloseButton?.addEventListener("click", closeAiClearHistoryDialog);
aiClearHistoryDialogCancelButton?.addEventListener("click", closeAiClearHistoryDialog);
aiClearHistoryDialogConfirmButton?.addEventListener("click", () => {
  clearAiConversationHistory();
  closeAiClearHistoryDialog();
});
detailInsertCloseButton.addEventListener("click", closeDetailInsertDialog);
detailInsertCancelButton.addEventListener("click", closeDetailInsertDialog);
shortcutDialogCloseButton.addEventListener("click", closeShortcutDialog);
tutorialDialogCloseButton?.addEventListener("click", closeTutorialDialog);
aiPromptDialogCloseButton?.addEventListener("click", closeAiPromptDialog);
aiPromptDialogCancelButton?.addEventListener("click", closeAiPromptDialog);
aiPromptDialogResetButton?.addEventListener("click", async () => {
  aiPromptOverrides = {
    systemPromptOverride: "",
    userPromptOverride: ""
  };

  if (aiSystemPromptInput) {
    aiSystemPromptInput.value = "";
  }
  if (aiUserPromptInput) {
    aiUserPromptInput.value = "";
  }

  await refreshAiPromptPreview();
  if (aiStatusText) {
    aiStatusText.textContent = "Prompt overrides reset to backend defaults.";
  }
});
aiPromptDialogSaveButton?.addEventListener("click", async () => {
  aiPromptOverrides = {
    systemPromptOverride: aiSystemPromptInput?.value?.trim() || "",
    userPromptOverride: aiUserPromptInput?.value?.trim() || ""
  };
  await refreshAiPromptPreview();
  closeAiPromptDialog();
  if (aiStatusText) {
    aiStatusText.textContent = "Prompt overrides saved for next analysis run.";
  }
});

aiSystemPromptInput?.addEventListener("input", () => {
  aiPromptOverrides.systemPromptOverride = aiSystemPromptInput.value;
  if (aiPromptPreviewTimer) {
    window.clearTimeout(aiPromptPreviewTimer);
  }
  aiPromptPreviewTimer = window.setTimeout(() => {
    refreshAiPromptPreview();
  }, 250);
});

aiUserPromptInput?.addEventListener("input", () => {
  aiPromptOverrides.userPromptOverride = aiUserPromptInput.value;
  if (aiPromptPreviewTimer) {
    window.clearTimeout(aiPromptPreviewTimer);
  }
  aiPromptPreviewTimer = window.setTimeout(() => {
    refreshAiPromptPreview();
  }, 250);
});

aiPromptEditorButton?.addEventListener("click", () => {
  openAiPromptDialog();
});

aiOpenChatButton?.addEventListener("click", () => {
  openAiInlineChatComposer();
});

aiInlineChatClearHistoryButton?.addEventListener("click", () => {
  openAiClearHistoryDialog();
});

aiInlineChatSendButton?.addEventListener("click", async () => {
  await runInlineChatPromptViaAnalyze();
});

aiInlineChatInput?.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter" || event.shiftKey) {
    return;
  }
  event.preventDefault();
  await runInlineChatPromptViaAnalyze();
});

// Delegate click as a resilient fallback in case the toolbar is re-rendered.
document.addEventListener("click", (event) => {
  const promptButton = event.target.closest("#aiPromptEditorButton");
  if (!promptButton) {
    const chatButton = event.target.closest("#aiOpenChatButton");
    if (!chatButton) {
      return;
    }

    event.preventDefault();
    openAiInlineChatComposer();
    return;
  }

  event.preventDefault();
  openAiPromptDialog();
});

detailInsertForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!detailInsertTargetArtifactId) {
    return;
  }

  const detailItems = detailInputElements
    .map((input) => ({ type: input.dataset.detailInput || "", value: input.value.trim() }))
    .filter((item) => item.type && item.value);

  if (!detailItems.length) {
    detailInputElements[0]?.focus();
    return;
  }

  addStructuredDetailsBatch(detailInsertTargetArtifactId, detailItems);
  closeDetailInsertDialog();
});

overlayContent.addEventListener("change", (event) => {
  const target = event.target;
  if (target.dataset.action !== "overlay-set-status") {
    return;
  }

  const artifactId = target.dataset.artifactId;
  const entry = getEntry(artifactId);
  entry.status = normalizeArtifactStatus(target.value, false);
  markEntryUpdated(entry);
  saveState();
  syncArtifactStatusState(artifactId);
});

overlayContent.addEventListener("input", (event) => {
  const target = event.target;
  if (target.dataset.action !== "overlay-comment-input") {
    return;
  }

  const artifactId = target.dataset.artifactId;
  const entry = getEntry(artifactId);
  const hadNotes = hasNotes(entry);
  entry.comment = target.value;
  const hasCommentNow = hasNotes(entry);
  markEntryUpdated(entry);
  scheduleStateSave();

  updateCommentPills(artifactId, hasCommentNow);

  const cardTextarea = sectionsEl.querySelector(`.artifact-card[data-artifact-id="${artifactId}"] [data-action="comment-input"]`);
  if (cardTextarea && cardTextarea.value !== target.value) {
    cardTextarea.value = target.value;
  }

  if (filterRenderTimer) {
    pendingRenderFocusState = captureCommentFocusState();
  }

  if (hadNotes !== hasCommentNow) {
    scheduleRender();
  } else {
    updateSummaryStats(getFilteredItems().length);
  }
});

overlayContent.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) {
    return;
  }

  if (actionButton.dataset.action === "open-detail-dialog") {
    openDetailInsertDialog(actionButton.dataset.artifactId);
    return;
  }

  if (actionButton.dataset.action === "remove-detail") {
    const artifactId = actionButton.dataset.artifactId;
    const detailId = actionButton.dataset.detailId;
    if (artifactId && detailId) {
      removeStructuredDetail(artifactId, detailId);
    }
  }

});

document.addEventListener("keydown", (event) => {
  trapFocus(event);

  if (event.key === "Escape" && tutorialDialog && !tutorialDialog.hidden) {
    closeTutorialDialog();
    return;
  }

  if (event.key === "Escape" && isSidebarOpen) {
    setSidebarOpen(false);
    return;
  }

  if (event.key === "Escape" && !resetDialog.hidden) {
    closeResetDialog();
    return;
  }

  if (event.key === "Escape" && aiClearHistoryDialog && !aiClearHistoryDialog.hidden) {
    closeAiClearHistoryDialog();
    return;
  }

  if (event.key === "Escape" && !detailInsertDialog.hidden) {
    closeDetailInsertDialog();
    return;
  }

  if (event.key === "Escape" && !shortcutDialog.hidden) {
    closeShortcutDialog();
    return;
  }

  if (event.key === "Escape" && aiPromptDialog && !aiPromptDialog.hidden) {
    closeAiPromptDialog();
    return;
  }

  if (event.key === "Escape" && !artifactOverlay.hidden) {
    closeOverlay();
    return;
  }

  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
    return;
  }

  if (event.key === "/") {
    event.preventDefault();
    searchInput.focus();
    return;
  }

  if (event.key.toLowerCase() === "g") {
    setViewMode("grid");
    return;
  }

  if (event.key.toLowerCase() === "l") {
    setViewMode("list");
    return;
  }

  if (event.key.toLowerCase() === "e") {
    exportState();
    return;
  }

  if (event.key.toLowerCase() === "r") {
    openResetDialog();
    return;
  }
});

appSidebar?.addEventListener("click", (event) => {
  const viewButton = event.target.closest('[data-action="switch-app-view"]');
  if (!viewButton) {
    return;
  }

  setAppView(viewButton.dataset.view || "cases");
  setSidebarOpen(false);
});

menuToggleButton?.addEventListener("click", () => {
  toggleSidebar();
});

appSidebarBackdrop?.addEventListener("click", () => {
  setSidebarOpen(false);
});

artifactEditorResetButton?.addEventListener("click", () => {
  resetArtifactEditorForm(true);
});

artifactEditorTagsChipList?.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove-tag-chip"]');
  if (!button) {
    return;
  }

  const index = Number.parseInt(button.dataset.tagIndex || "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  removeArtifactEditorTagByIndex(index);
  artifactEditorTagsComposerInput?.focus({ preventScroll: true });
  artifactEditorTagsComposerInput?.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorTagsTokenField?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('[data-action="remove-tag-chip"]')) {
    return;
  }

  artifactEditorTagsComposerInput?.focus({ preventScroll: true });
});

artifactEditorTagsComposerInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Backspace") {
    return;
  }

  if (artifactEditorTagsComposerInput.value.trim()) {
    return;
  }

  if (!artifactEditorTagChips.length) {
    return;
  }

  event.preventDefault();
  removeArtifactEditorTagByIndex(artifactEditorTagChips.length - 1);
  artifactEditorTagsComposerInput.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorOsChipList?.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove-os-chip"]');
  if (!button) {
    return;
  }

  const index = Number.parseInt(button.dataset.osIndex || "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  removeArtifactEditorOsValueByIndex(index);
  artifactEditorOsComposerInput?.focus({ preventScroll: true });
  artifactEditorOsComposerInput?.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorOsTokenField?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('[data-action="remove-os-chip"]')) {
    return;
  }

  artifactEditorOsComposerInput?.focus({ preventScroll: true });
});

artifactEditorOsComposerInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Backspace") {
    return;
  }

  if (artifactEditorOsComposerInput.value.trim()) {
    return;
  }

  if (!artifactEditorOsChips.length) {
    return;
  }

  event.preventDefault();
  removeArtifactEditorOsValueByIndex(artifactEditorOsChips.length - 1);
  artifactEditorOsComposerInput.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorMitreChipList?.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove-mitre-chip"]');
  if (!button) {
    return;
  }

  const index = Number.parseInt(button.dataset.mitreIndex || "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  removeArtifactEditorMitreValueByIndex(index);
  artifactEditorMitreSelector?.focus({ preventScroll: true });
});

artifactEditorMitreTokenField?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('[data-action="remove-mitre-chip"]')) {
    return;
  }

  artifactEditorMitreSelector?.focus({ preventScroll: true });
});

artifactEditorMitreSelector?.addEventListener("change", () => {
  const nextValue = artifactEditorMitreSelector.value.trim();
  if (!nextValue) {
    return;
  }

  addArtifactEditorMitreValue(nextValue);
  artifactEditorMitreSelector.value = "";
});

artifactEditorLocationChipList?.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove-path-chip"]');
  if (!button) {
    return;
  }

  const index = Number.parseInt(button.dataset.pathIndex || "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  removeArtifactEditorLocationPathByIndex(index);
  artifactEditorLocationComposerInput?.focus({ preventScroll: true });
  artifactEditorLocationComposerInput?.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorLocationTokenField?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('[data-action="remove-path-chip"]')) {
    return;
  }

  artifactEditorLocationComposerInput?.focus({ preventScroll: true });
});

artifactEditorLocationComposerInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Backspace") {
    return;
  }

  if (artifactEditorLocationComposerInput.value.trim()) {
    return;
  }

  if (!artifactEditorLocationChips.length) {
    return;
  }

  event.preventDefault();
  removeArtifactEditorLocationPathByIndex(artifactEditorLocationChips.length - 1);
  artifactEditorLocationComposerInput.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorToolChipList?.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove-tool-chip"]');
  if (!button) {
    return;
  }

  const index = Number.parseInt(button.dataset.toolIndex || "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  removeArtifactEditorToolValueByIndex(index);
  artifactEditorToolComposerInput?.focus({ preventScroll: true });
  artifactEditorToolComposerInput?.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorToolTokenField?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('[data-action="remove-tool-chip"]')) {
    return;
  }

  artifactEditorToolComposerInput?.focus({ preventScroll: true });
});

artifactEditorToolComposerInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Backspace") {
    return;
  }

  if (artifactEditorToolComposerInput.value.trim()) {
    return;
  }

  if (!artifactEditorToolChips.length) {
    return;
  }

  event.preventDefault();
  removeArtifactEditorToolValueByIndex(artifactEditorToolChips.length - 1);
  artifactEditorToolComposerInput.dispatchEvent(new Event("input", { bubbles: true }));
});

artifactEditorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (artifactEditorOsComposerInput?.value.trim()) {
    commitArtifactEditorOsValue(artifactEditorOsComposerInput.value);
  }
  if (artifactEditorMitreSelector?.value.trim()) {
    addArtifactEditorMitreValue(artifactEditorMitreSelector.value.trim());
    artifactEditorMitreSelector.value = "";
  }
  if (artifactEditorTagsComposerInput?.value.trim()) {
    commitArtifactEditorTag(artifactEditorTagsComposerInput.value);
  }
  if (artifactEditorLocationComposerInput?.value.trim()) {
    commitArtifactEditorLocationPath(artifactEditorLocationComposerInput.value);
  }
  if (artifactEditorToolComposerInput?.value.trim()) {
    commitArtifactEditorToolValue(artifactEditorToolComposerInput.value);
  }

  const payload = getArtifactEditorFormData();
  if (!payload.os || !payload.mitre || !payload.tags || !payload.artifact || !payload.location || !payload.tool || !payload.instructions) {
    return;
  }

  const editingId = artifactEditorIdInput.value;
  if (editingId) {
    const target = checklistData.find((item) => item.id === editingId);
    if (target) {
      target.os = payload.os;
      target.mitre = payload.mitre;
      target.tags = payload.tags;
      target.artifact = payload.artifact;
      target.location = payload.location;
      target.tool = payload.tool;
      target.instructions = payload.instructions;
    }
  } else {
    checklistData.push({ id: getNextArtifactId(), ...payload });
  }

  onChecklistDataChanged();
  resetArtifactEditorForm();
});

artifactEditorList?.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) {
    return;
  }

  const artifactId = actionButton.dataset.artifactId;
  if (!artifactId) {
    return;
  }

  if (actionButton.dataset.action === "edit-artifact") {
    loadArtifactIntoEditor(artifactId);
    return;
  }

  if (actionButton.dataset.action === "delete-artifact") {
    deleteArtifact(artifactId);
  }
});

async function startAiSession() {
  try {
    setAiBusy(true);
    aiIsStartingSession = true;
    startAiModelLoadTimer();
    setAiSessionStatus(aiSessionStatus);
    let backendReady = await checkBackendHealth();
    if (!backendReady) {
      if (aiStatusText) {
        aiStatusText.textContent = "Backend offline. Requesting launcher start...";
      }

      try {
        await requestLauncherStart();
      } catch (launcherError) {
        if (aiStatusText) {
          aiStatusText.textContent = `Launcher start failed: ${launcherError.message}`;
        }
        return;
      }

      backendReady = await waitForBackendOnline(20000);
    }

    if (!backendReady) {
      if (aiStatusText) {
        aiStatusText.textContent = "Backend did not come online after launcher start request.";
      }
      return;
    }

    if (aiStatusText) {
      aiStatusText.textContent = "Starting session...";
    }

    const selectedModel = getSelectedAiModel();
    if (!selectedModel) {
      if (aiStatusText) {
        aiStatusText.textContent = "Select a model first.";
      }
      return;
    }

    sessionStorage.setItem("ai-model-key", selectedModel);

    const contextSpec = getSelectedModelContextSpec();
    const contextLength = clampContextLength(aiContextLengthInput?.value, contextSpec);
    setContextControlsValue(contextLength, contextSpec);
    persistContextLengthForSelectedModel(contextLength);

    const launch = parseCommandLine(AI_DEFAULTS.mcpCommand);
    const payload = await aiRequest("/api/ai/session/start", "POST", {
      lmstudio_base_url: AI_DEFAULTS.lmstudioBaseUrl,
      model: selectedModel,
      context_length: contextLength,
      idle_timeout_minutes: AI_DEFAULTS.idleTimeoutMinutes,
      mcp_command: launch.command,
      mcp_args: launch.args
    });

    setAiSessionStatus(payload);
    if (aiStatusText) {
      aiStatusText.textContent = payload.message || "Session started.";
    }
  } catch (error) {
    if (aiStatusText) {
      aiStatusText.textContent = `Start failed: ${error.message}`;
    }
  } finally {
    aiIsStartingSession = false;
    stopAiModelLoadTimer();
    setAiSessionStatus(aiSessionStatus);
    setAiBusy(false);
  }
}

aiSessionRefreshButton?.addEventListener("click", async () => {
  setAiBusy(true);
  await checkBackendHealth();
  await refreshAiSessionStatus();
  setAiBusy(false);
});

aiModelRefreshButton?.addEventListener("click", async () => {
  aiModelRefreshButton.disabled = true;
  await refreshAiModelList();
  aiModelRefreshButton.disabled = false;
});

aiModelSelect?.addEventListener("change", () => {
  if (aiModelSelect.value) {
    sessionStorage.setItem("ai-model-key", aiModelSelect.value);
  }
  applyContextSpecForSelectedModel();
});

aiContextLengthInput?.addEventListener("input", () => {
  if (!aiContextLengthInput) {
    return;
  }
  aiContextLengthInput.value = aiContextLengthInput.value.replace(/[^\d,\s]/g, "");
});

aiContextLengthInput?.addEventListener("change", () => {
  commitContextInputValue();
});

aiContextLengthInput?.addEventListener("blur", () => {
  commitContextInputValue();
});

aiContextLengthInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  commitContextInputValue();
});

aiContextLengthSlider?.addEventListener("input", () => {
  const spec = getSelectedModelContextSpec();
  const normalized = setContextInputOnly(aiContextLengthSlider.value, spec);
  persistContextLengthForSelectedModel(normalized);
});

aiContextLengthSlider?.addEventListener("pointerdown", () => {
  aiContextSliderDragging = true;
});

aiContextLengthSlider?.addEventListener("pointerup", () => {
  aiContextSliderDragging = false;
});

aiContextLengthSlider?.addEventListener("change", () => {
  aiContextSliderDragging = false;
  const spec = getSelectedModelContextSpec();
  const normalized = setContextControlsValue(aiContextLengthSlider.value, spec);
  persistContextLengthForSelectedModel(normalized);
});

async function stopAiSession() {
  try {
    setAiBusy(true);
    aiIsStartingSession = false;
    stopAiModelLoadTimer();
    const payload = await aiRequest("/api/ai/session/stop", "POST", {});
    setAiSessionStatus(payload);
    await requestBackendShutdown();
    await requestLauncherStop();
    setAiBackendStatus(false, "stopped");
    if (aiStatusText) {
      aiStatusText.textContent = payload.message || "Session stopped.";
    }
  } catch (error) {
    if (aiStatusText) {
      aiStatusText.textContent = `Stop failed: ${error.message}`;
    }
  } finally {
    setAiBusy(false);
  }
}

aiSessionToggleButton?.addEventListener("click", async () => {
  if (aiSessionStatus?.active) {
    await stopAiSession();
    return;
  }
  await startAiSession();
});

aiArtifactSelectionList?.addEventListener("change", (event) => {
  const categoryInput = event.target.closest('input[type="checkbox"][data-ai-mitre-category]');
  if (categoryInput) {
    const mitreCategory = categoryInput.dataset.aiMitreCategory || "";
    if (!mitreCategory) {
      return;
    }

    checklistData.forEach((item) => {
      const itemMitre = String(item.mitre || "").trim() || "Unmapped";
      if (itemMitre !== mitreCategory) {
        return;
      }

      if (categoryInput.checked) {
        aiSelectedArtifactIds.add(item.id);
      } else {
        aiSelectedArtifactIds.delete(item.id);
      }
    });

    renderAiArtifactSelectionList();
    return;
  }

  const artifactInput = event.target.closest('input[type="checkbox"][data-ai-artifact-id]');
  if (!artifactInput) {
    return;
  }

  const artifactId = artifactInput.dataset.aiArtifactId;
  if (!artifactId) {
    return;
  }

  if (artifactInput.checked) {
    aiSelectedArtifactIds.add(artifactId);
  } else {
    aiSelectedArtifactIds.delete(artifactId);
  }

  renderAiArtifactSelectionList();
});

aiArtifactSelectionList?.addEventListener("click", (event) => {
  const toggleButton = event.target.closest('button[data-ai-mitre-toggle]');
  if (!toggleButton) {
    return;
  }

  const category = String(toggleButton.dataset.aiMitreToggle || "").trim();
  if (!category) {
    return;
  }

  const groupElement = toggleButton.closest(".ai-artifact-selection-group");
  const nextCollapsed = !aiCollapsedMitreGroups.has(category);
  setAiMitreGroupCollapsed(groupElement, nextCollapsed, true);
});

aiSelectAllArtifactsButton?.addEventListener("click", () => {
  checklistData.forEach((item) => aiSelectedArtifactIds.add(item.id));
  renderAiArtifactSelectionList();
});

aiClearArtifactsButton?.addEventListener("click", () => {
  aiSelectedArtifactIds.clear();
  renderAiArtifactSelectionList();
});

aiToggleAllMitreButton?.addEventListener("click", () => {
  if (!aiArtifactSelectionList) {
    return;
  }

  const groups = Array.from(aiArtifactSelectionList.querySelectorAll(".ai-artifact-selection-group"));
  if (!groups.length) {
    return;
  }

  const shouldCollapse = groups.some((group) => !group.classList.contains("is-collapsed"));
  groups.forEach((group) => {
    setAiMitreGroupCollapsed(group, shouldCollapse, true);
  });
});

aiAnalyzeButton?.addEventListener("click", async () => {
  if (aiAnalyzeInProgress) {
    if (aiStatusText) {
      aiStatusText.textContent = "Stopping analysis...";
    }

    aiActiveAnalyzeAbortController?.abort();
    await requestAiAnalysisCancel();
    return;
  }

  const analyzePayload = buildAiAnalyzePayload();
  const runPrompt = String(analyzePayload.mcp_orders || "").trim();
  const hasRunPrompt = Boolean(runPrompt);
  let shouldPersistAssistantReply = false;

  if (hasRunPrompt) {
    aiConversationHistory = normalizeAiHistoryEntries([
      ...aiConversationHistory,
      { role: "user", content: runPrompt }
    ]);
    analyzePayload.chat_history = normalizeAiHistoryEntries(aiConversationHistory);
    shouldPersistAssistantReply = true;
    renderAiConversationHistory();
  }

  aiNextAnalyzeResponseMode = "";
  aiNextAnalyzeOrdersOverride = "";
  aiNextAnalyzeSelectedArtifactsOverride = null;
  const evidencePath = analyzePayload.evidence_path;
  let tickTimer = 0;
  if (!evidencePath) {
    if (aiStatusText) {
      aiStatusText.textContent = "Please provide mounted evidence path.";
    }
    return;
  }

  try {
    aiActiveAnalyzeAbortController = new AbortController();
    setAiAnalyzeRunning(true);
    setAiInvestigationOutputVisible(true, true);
    setAiProcessingStatus({
      visible: true,
      label: "Processing prompt: preparing...",
      percent: 2,
      indeterminate: true
    });
    setAiBusy(true);
    let finalPayload = null;
    let latestStatusMessage = "Running investigation...";
    let liveThinkingTranscriptRaw = "";
    let liveFinalTranscriptRaw = "";
    let streamChunkCount = 0;
    const streamNotes = [];
    const streamRows = [];
    let rowSequence = 0;
    let mcpLiveRowId = "";
    let thinkingLiveRowId = "";
    let mcpPlannedCalls = 0;
    let mcpFinishedCalls = 0;
    const liveExpandedRowIds = new Set();
    let outputAutoFollow = true;
    let outputScrollTopSnapshot = 0;
    const startedAt = performance.now();

    const nextRowId = () => {
      rowSequence += 1;
      return `row-${rowSequence}`;
    };

    const addStreamRow = (kind, summary, detail, options = {}) => {
      const row = {
        id: nextRowId(),
        kind: String(kind || "status"),
        summary: String(summary || "").trim() || "(update)",
        summaryMeta: String(options.summaryMeta || "").trim(),
        detail: String(detail || "").trim() || String(summary || "").trim() || "(no details)",
        status: String(options.status || "done").trim() || "done",
        isLive: Boolean(options.isLive),
        collapsible: options.collapsible !== false
      };
      streamRows.push(row);
      return row.id;
    };

    const updateStreamRow = (rowId, summary, detail, options = {}) => {
      const row = streamRows.find((item) => item.id === rowId);
      if (!row) {
        return;
      }
      row.summary = String(summary || row.summary || "").trim() || row.summary;
      row.detail = String(detail || row.detail || "").trim() || row.detail;
      if (Object.prototype.hasOwnProperty.call(options, "summaryMeta")) {
        row.summaryMeta = String(options.summaryMeta || "").trim();
      }
      if (Object.prototype.hasOwnProperty.call(options, "status")) {
        row.status = String(options.status || row.status || "done").trim() || "done";
      }
    };

    const setRowStatus = (rowId, status) => {
      if (!rowId) {
        return;
      }
      const row = streamRows.find((item) => item.id === rowId);
      if (!row) {
        return;
      }
      row.status = String(status || "done").trim() || "done";
    };

    const markAllRowsDone = () => {
      streamRows.forEach((row) => {
        row.status = "done";
      });
    };

    const sentencePreviewFromThinking = (text) => {
      const cleaned = normalizeMojibakeText(stripThinkTagsForThinking(text || ""))
        .replace(/\s+/g, " ")
        .trim();
      if (!cleaned) {
        return "Thinking...";
      }

      const fragments = cleaned
        .split(/(?<=[.!?])\s+|\n+/)
        .map((item) => item.trim())
        .filter(Boolean);
      const latest = fragments.length ? fragments[fragments.length - 1] : cleaned;
      const words = latest.split(/\s+/).filter(Boolean).slice(0, 5).join(" ");
      const short = words || latest;
      return short.length > 22 ? `${short.slice(0, 19)}...` : short;
    };

    const pushStreamNote = (note) => {
      const ts = ((performance.now() - startedAt) / 1000).toFixed(1);
      const stamped = `[${ts}s] ${note}`;
      streamNotes.push(stamped);
    };

    const upsertStreamNote = (predicate, note) => {
      const ts = ((performance.now() - startedAt) / 1000).toFixed(1);
      const stamped = `[${ts}s] ${note}`;
      for (let i = streamNotes.length - 1; i >= 0; i -= 1) {
        if (predicate(streamNotes[i])) {
          streamNotes[i] = stamped;
          return;
        }
      }
      streamNotes.push(stamped);
    };

    const renderLiveStream = (finalized = false) => {
      if (!aiFindingsOutput && !aiThinkingOutput) {
        return;
      }

      const elapsed = ((performance.now() - startedAt) / 1000).toFixed(1);
      const thinkingBlock = stripThinkTagsForThinking(liveThinkingTranscriptRaw).trim() || "(waiting for thinking tokens...)";
      const finalBlock = stripThinkTagsForThinking(stripThinkBlocksForFinal(liveFinalTranscriptRaw)).trim() || "(waiting for final output tokens...)";
      const statusBlock = streamNotes.length ? streamNotes.join("\n") : "(no MCP/status events yet)";

      if (aiStatusText) {
        aiStatusText.textContent = latestStatusMessage;
      }

      if (aiTokenChunksText) {
        aiTokenChunksText.textContent = `Token chunks: ${streamChunkCount}`;
      }

      if (aiThinkingCard) {
        aiThinkingCard.hidden = true;
      }

      if (aiThinkingOutput) {
        aiThinkingOutput.textContent = [
          "Thinking stream",
          `Elapsed: ${elapsed}s`,
          `Token chunks received: ${streamChunkCount}`,
          "",
          "MCP and status timeline:",
          statusBlock,
          "",
          "LLM thinking:",
          thinkingBlock
        ].join("\n");

        // Keep the newest reasoning text visible while tokens stream in.
        aiThinkingOutput.scrollTop = aiThinkingOutput.scrollHeight;
      }

      if (aiFindingsOutput) {
        const rowScrollState = new Map();
        Array.from(aiFindingsOutput.querySelectorAll("details[data-item-id]"))
          .forEach((rowNode) => {
            const rowId = String(rowNode.getAttribute("data-item-id") || "").trim();
            if (!rowId) {
              return;
            }

            const body = rowNode.querySelector("pre");
            if (!body) {
              return;
            }

            const atBottom = (body.scrollHeight - body.scrollTop - body.clientHeight) < 24;
            rowScrollState.set(rowId, {
              scrollTop: body.scrollTop,
              atBottom
            });
          });

        const previousOutputNode = aiFindingsOutput.querySelector(".ai-live-output-markdown");
        if (previousOutputNode) {
          outputScrollTopSnapshot = previousOutputNode.scrollTop;
          const outputAtBottom = (previousOutputNode.scrollHeight - previousOutputNode.scrollTop - previousOutputNode.clientHeight) < 24;
          outputAutoFollow = outputAtBottom;
        }

        const shouldStickToBottom = (aiFindingsOutput.scrollHeight - aiFindingsOutput.scrollTop - aiFindingsOutput.clientHeight) < 80;
        const hasLiveOutput = Boolean(finalBlock && finalBlock !== "(waiting for final output tokens...)");

        aiFindingsOutput.innerHTML = `
          <div class="ai-stream-meta">
            <p><strong>Investigation Output</strong></p>
            <p>Elapsed: ${escapeHtml(elapsed)}s</p>
            <p>Token chunks received: ${escapeHtml(String(streamChunkCount))}</p>
          </div>
          <div class="ai-live-feed">
            ${streamRows.map((row) => `
              <details class="ai-live-row${row.isLive ? " is-live" : ""} is-${escapeHtml(row.status)}" data-item-id="${escapeHtml(row.id)}">
                <summary>
                  <span class="ai-live-row-summary-main">${escapeHtml(normalizeMojibakeText(row.summary))}</span>
                  <span class="ai-live-row-summary-meta">${escapeHtml(normalizeMojibakeText(row.summaryMeta || ""))}</span>
                </summary>
                <pre>${escapeHtml(normalizeMojibakeText(row.detail))}</pre>
              </details>
            `).join("")}
            ${hasLiveOutput ? `<div class="ai-live-output-markdown ai-output-markdown">${renderSimpleMarkdown(finalBlock)}</div>` : ""}
          </div>
        `;

        Array.from(aiFindingsOutput.querySelectorAll("details[data-item-id]")).forEach((rowNode) => {
          const rowId = String(rowNode.getAttribute("data-item-id") || "");
          if (rowId && liveExpandedRowIds.has(rowId)) {
            rowNode.setAttribute("open", "open");
          }

          const summaryNode = rowNode.querySelector("summary");
          if (summaryNode) {
            summaryNode.addEventListener("click", () => {
              // Preemptively track intended state so rapid token rerenders do not swallow a click.
              const willOpen = !rowNode.open;
              if (willOpen) {
                liveExpandedRowIds.add(rowId);
              } else {
                liveExpandedRowIds.delete(rowId);
              }
            });
          }

          rowNode.addEventListener("toggle", () => {
            if (rowNode.open) {
              liveExpandedRowIds.add(rowId);
            } else {
              liveExpandedRowIds.delete(rowId);
            }
          });

          const body = rowNode.querySelector("pre");
          if (!body) {
            return;
          }

          const row = streamRows.find((item) => item.id === rowId);
          const prior = rowScrollState.get(rowId);
          const isRunning = row?.status === "running";
          const shouldAutoBottom = Boolean(isRunning || !prior || prior.atBottom);

          if (rowNode.open) {
            if (shouldAutoBottom) {
              body.scrollTop = body.scrollHeight;
            } else {
              body.scrollTop = Math.max(0, Math.min(prior.scrollTop, body.scrollHeight - body.clientHeight));
            }
          }
        });

        const liveOutputNode = aiFindingsOutput.querySelector(".ai-live-output-markdown");
        if (liveOutputNode) {
          liveOutputNode.addEventListener("scroll", () => {
            const atBottom = (liveOutputNode.scrollHeight - liveOutputNode.scrollTop - liveOutputNode.clientHeight) < 24;
            outputAutoFollow = atBottom;
            if (!atBottom) {
              outputScrollTopSnapshot = liveOutputNode.scrollTop;
            }
          });

          if (outputAutoFollow) {
            liveOutputNode.scrollTop = liveOutputNode.scrollHeight;
          } else {
            liveOutputNode.scrollTop = Math.max(0, Math.min(outputScrollTopSnapshot, liveOutputNode.scrollHeight - liveOutputNode.clientHeight));
          }
        }

        if (shouldStickToBottom) {
          aiFindingsOutput.scrollTop = aiFindingsOutput.scrollHeight;
        }
      }
    };

    if (aiStatusText) {
      aiStatusText.textContent = latestStatusMessage;
    }
    if (aiTokenChunksText) {
      aiTokenChunksText.textContent = "Token chunks: 0";
    }
    if (aiThinkingCard) {
      aiThinkingCard.hidden = true;
    }
    setAiThinkingCollapsed(false);
    mcpLiveRowId = addStreamRow("mcp", "MCP: preparing analysis stream...", "Preparing analysis stream...", { isLive: true, status: "running" });
    pushStreamNote("Preparing analysis stream...");
    renderLiveStream();

    tickTimer = window.setInterval(() => {
      renderLiveStream();
    }, 1000);

    await aiAnalyzeRequestStream(analyzePayload, {
      status: (streamStatus) => {
        const message = streamStatus?.message || "Running investigation...";
        latestStatusMessage = message;

        const plannedMatch = String(message).match(/MCP planned calls:\s*(\d+)/i);
        if (plannedMatch) {
          mcpPlannedCalls = Number(plannedMatch[1]) || 0;
        }

        const normalizedMessage = String(message).trim();
        if (/collecting mcp activity/i.test(normalizedMessage) || /mcp activity running/i.test(normalizedMessage)) {
          const callProgress = mcpPlannedCalls > 0
            ? (mcpFinishedCalls / mcpPlannedCalls)
            : 0;
          const percent = 8 + (callProgress * 56);
          setAiProcessingStatus({
            visible: true,
            label: `Processing prompt: ${normalizedMessage}`,
            percent,
            indeterminate: mcpPlannedCalls <= 0
          });
        } else if (/running model analysis/i.test(normalizedMessage)) {
          setAiProcessingStatus({
            visible: true,
            label: "Processing prompt: model analysis running...",
            percent: 70,
            indeterminate: false
          });
        }

        if (!mcpLiveRowId) {
          mcpLiveRowId = addStreamRow("mcp", `MCP: ${message}`, message, { isLive: true, status: "running" });
        } else {
          updateStreamRow(mcpLiveRowId, `MCP: ${message}`, message, { status: "running" });
        }

        if (/running model analysis/i.test(message)) {
          setRowStatus(mcpLiveRowId, "done");
        }

        if (/^MCP activity running\.\.\./i.test(message)) {
          upsertStreamNote((line) => /MCP activity running\.\.\./i.test(String(line)), message);
        } else {
          pushStreamNote(message);
        }
        renderLiveStream();
      },
      mcp: (mcpPayload) => {
        const summary = `MCP summary: attempted=${Number(mcpPayload?.attempted_calls || 0)}, success=${Number(mcpPayload?.successful_calls || 0)}, failed=${Number(mcpPayload?.failed_calls || 0)} (${String(mcpPayload?.reason || "")})`;
        pushStreamNote(summary);
        if (!mcpLiveRowId) {
          mcpLiveRowId = addStreamRow("mcp", summary, summary, { isLive: true, status: "done" });
        } else {
          updateStreamRow(mcpLiveRowId, summary, summary, { status: "done" });
        }

        if (Array.isArray(mcpPayload?.trace)) {
          mcpPayload.trace.forEach((entry) => {
            const tool = String(entry?.tool || "unknown");
            const ok = entry?.ok ? "ok" : "failed";
            const duration = Number(entry?.duration_seconds || 0).toFixed(2);
            pushStreamNote(`MCP ${tool} ${ok} in ${duration}s`);
          });
        }
        renderLiveStream();
      },
      "mcp-step": (stepPayload) => {
        const phase = String(stepPayload?.phase || "").trim().toLowerCase();
        const artifact = String(stepPayload?.artifact || "artifact").trim();
        const tool = String(stepPayload?.tool || "unknown-tool").trim();

        if (phase === "plan") {
          const reason = String(stepPayload?.reason || "").trim();
          const text = `MCP plan: run ${tool} for ${artifact}${reason ? ` (${reason})` : ""}`;
          pushStreamNote(text);
          updateStreamRow(mcpLiveRowId, text, text);
          renderLiveStream();
          return;
        }

        if (phase === "init-start") {
          const initMessage = String(stepPayload?.message || "Initializing MCP server session...").trim();
          const text = `MCP: ${initMessage}`;
          pushStreamNote(text);
          updateStreamRow(mcpLiveRowId, text, text);
          renderLiveStream();
          return;
        }

        if (phase === "init-finish") {
          const initMessage = String(stepPayload?.message || "MCP initialization complete.").trim();
          const ok = stepPayload?.ok !== false;
          const text = `MCP: ${initMessage}${ok ? "" : " (failed)"}`;
          pushStreamNote(text);
          updateStreamRow(mcpLiveRowId, text, text);
          renderLiveStream();
          return;
        }

        if (phase === "start") {
          const reason = String(stepPayload?.reason || "").trim();
          const argumentsText = (() => {
            try {
              return JSON.stringify(stepPayload?.arguments || {});
            } catch {
              return "{}";
            }
          })();
          const startText = `MCP: running ${tool} for ${artifact}${reason ? ` (${reason})` : ""}`;
          const callProgress = mcpPlannedCalls > 0
            ? (mcpFinishedCalls / mcpPlannedCalls)
            : 0;
          const percent = 10 + (callProgress * 55);
          setAiProcessingStatus({
            visible: true,
            label: `Processing prompt: ${tool} running...`,
            percent,
            indeterminate: false
          });
          pushStreamNote(startText);
          pushStreamNote(`MCP args: ${argumentsText}`);
          updateStreamRow(mcpLiveRowId, startText, `${startText}\nMCP args: ${argumentsText}`);
          renderLiveStream();
          return;
        }

        if (phase === "finish") {
          const ok = Boolean(stepPayload?.ok);
          const duration = Number(stepPayload?.duration_seconds || 0).toFixed(2);
          mcpFinishedCalls += 1;
          const callProgress = mcpPlannedCalls > 0
            ? Math.min(1, mcpFinishedCalls / mcpPlannedCalls)
            : 0;
          const percent = 12 + (callProgress * 56);
          setAiProcessingStatus({
            visible: true,
            label: `Processing prompt: ${tool} ${ok ? "completed" : "failed"}`,
            percent,
            indeterminate: false
          });
          if (ok) {
            const doneText = `MCP done: ${artifact} -> ${tool} ok in ${duration}s`;
            pushStreamNote(doneText);
            const excerpt = String(stepPayload?.result_excerpt || "").trim();
            if (excerpt) {
              const firstLine = excerpt.split(/\r?\n/)[0].slice(0, 220).trim();
              if (firstLine) {
                pushStreamNote(`MCP result: ${firstLine}`);
                updateStreamRow(mcpLiveRowId, doneText, `${doneText}\nMCP result: ${firstLine}`);
              } else {
                updateStreamRow(mcpLiveRowId, doneText, doneText);
              }
            } else {
              updateStreamRow(mcpLiveRowId, doneText, doneText);
            }
          } else {
            const errorText = String(stepPayload?.error || "unknown error").trim();
            const failText = `MCP done: ${artifact} -> ${tool} failed in ${duration}s (${errorText})`;
            pushStreamNote(failText);
            updateStreamRow(mcpLiveRowId, failText, failText);
          }
          renderLiveStream();
          return;
        }

        const fallbackText = `MCP step: ${JSON.stringify(stepPayload || {})}`;
        pushStreamNote(fallbackText);
        updateStreamRow(mcpLiveRowId, fallbackText, fallbackText);
        renderLiveStream();
      },
      token: (tokenPayload) => {
        const tokenText = String(tokenPayload?.text || "");
        if (!tokenText) {
          return;
        }

        streamChunkCount += 1;
        const generationPercent = Math.min(97, 70 + (Math.log10(streamChunkCount + 1) * 16));
        setAiProcessingStatus({
          visible: true,
          label: "Processing prompt: generating response...",
          percent: generationPercent,
          indeterminate: false
        });
        const channel = String(tokenPayload?.channel || "final").trim().toLowerCase();
        if (channel === "thinking") {
          liveThinkingTranscriptRaw += tokenText;
          const thinkingSummary = sentencePreviewFromThinking(liveThinkingTranscriptRaw);
          const thinkingDetail = stripThinkTagsForThinking(liveThinkingTranscriptRaw).trim() || thinkingSummary;
          const meta = `${((performance.now() - startedAt) / 1000).toFixed(1)}s | ${streamChunkCount} tok`;
          if (!thinkingLiveRowId) {
            thinkingLiveRowId = addStreamRow("thinking", `Thinking: ${thinkingSummary}`, thinkingDetail, { isLive: true, summaryMeta: meta, status: "running" });
          } else {
            updateStreamRow(thinkingLiveRowId, `Thinking: ${thinkingSummary}`, thinkingDetail, { summaryMeta: meta, status: "running" });
          }
          setRowStatus(mcpLiveRowId, "done");
        } else {
          liveFinalTranscriptRaw += tokenText;
          const outputPreview = normalizeMojibakeText(stripThinkTagsForThinking(stripThinkBlocksForFinal(liveFinalTranscriptRaw)).replace(/\s+/g, " ").trim());
          setRowStatus(mcpLiveRowId, "done");
          setRowStatus(thinkingLiveRowId, "done");
        }
        renderLiveStream();
      },
      done: (payload) => {
        finalPayload = payload || {};
        const doneMode = String(payload?.response_mode || "").trim().toLowerCase();
        const doneResponseText = String(payload?.response_text || payload?.raw?.response_text || "").trim();
        if (doneMode === "chat" && doneResponseText && !String(liveFinalTranscriptRaw || "").trim()) {
          liveFinalTranscriptRaw = doneResponseText;
        }
        setAiProcessingStatus({
          visible: true,
          label: "Processing prompt: completed",
          percent: 100,
          indeterminate: false
        });
      },
      error: (errorPayload) => {
        setAiProcessingStatus({
          visible: true,
          label: "Processing prompt: failed",
          percent: 100,
          indeterminate: false
        });
        throw new Error(errorPayload?.detail || "Analysis stream failed.");
      }
    }, aiActiveAnalyzeAbortController.signal);

    const payload = finalPayload;
    if (!payload) {
      throw new Error("Analysis stream ended before final result arrived.");
    }

    if (payload?.cancelled) {
      setAiProcessingStatus({
        visible: true,
        label: "Processing prompt: cancelled",
        percent: 100,
        indeterminate: false
      });
      markAllRowsDone();
      latestStatusMessage = "Analysis cancelled by user.";
      if (aiStatusText) {
        aiStatusText.textContent = latestStatusMessage;
      }
      renderLiveStream(true);
      return;
    }

    const responseMode = String(payload?.response_mode || "checklist").trim().toLowerCase();
    const payloadResponseText = String(payload?.response_text || payload?.raw?.response_text || "").trim();
    if (responseMode === "chat" && payloadResponseText && !String(liveFinalTranscriptRaw || "").trim()) {
      liveFinalTranscriptRaw = payloadResponseText;
    }

    const finalElapsed = Number(payload?.duration_seconds || (performance.now() - startedAt) / 1000);
    setAiProcessingStatus({
      visible: true,
      label: "Processing prompt: completed",
      percent: 100,
      indeterminate: false
    });
    markAllRowsDone();
    pushStreamNote(`Analysis complete in ${finalElapsed.toFixed(1)}s.`);
    if (payload?.summary) {
      pushStreamNote(`Summary: ${String(payload.summary)}`);
    }
    renderLiveStream(true);

    if (responseMode === "chat") {
      if (shouldPersistAssistantReply) {
        const assistantReply = String(payloadResponseText || liveFinalTranscriptRaw || payload?.summary || "").trim();
        if (assistantReply) {
          aiConversationHistory = normalizeAiHistoryEntries([
            ...aiConversationHistory,
            { role: "assistant", content: assistantReply }
          ]);
          renderAiConversationHistory();
        }
      }

      if (!streamChunkCount && payloadResponseText) {
        pushStreamNote("Rendered direct free-text response from server payload.");
        renderLiveStream(true);
      }
      if (aiStatusText) {
        const elapsed = Number(payload?.duration_seconds || 0);
        latestStatusMessage = `Free-text response completed in ${elapsed.toFixed(1)}s.`;
        aiStatusText.textContent = latestStatusMessage;
      }
      return;
    }

    const applied = applyAiArtifactUpdates(payload.updates || [], payload.mcp_activity || null);
    if (shouldPersistAssistantReply) {
      const checklistReply = String(payload?.response_text || payload?.summary || "Analysis completed.").trim();
      if (checklistReply) {
        aiConversationHistory = normalizeAiHistoryEntries([
          ...aiConversationHistory,
          { role: "assistant", content: checklistReply }
        ]);
        renderAiConversationHistory();
      }
    }
    if (aiStatusText) {
      const elapsed = Number(payload?.duration_seconds || 0);
      latestStatusMessage = `Investigation completed in ${elapsed.toFixed(1)}s. Applied ${applied} checklist update${applied === 1 ? "" : "s"}.`;
      aiStatusText.textContent = latestStatusMessage;
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      setAiProcessingStatus({
        visible: true,
        label: "Processing prompt: cancelling...",
        percent: 100,
        indeterminate: false
      });
      if (aiStatusText) {
        aiStatusText.textContent = "Stopping analysis...";
      }
      await requestAiAnalysisCancel();
      if (aiStatusText) {
        aiStatusText.textContent = "Analysis cancelled by user.";
      }
      setAiProcessingStatus({
        visible: true,
        label: "Processing prompt: cancelled",
        percent: 100,
        indeterminate: false
      });
      return;
    }

    setAiProcessingStatus({
      visible: true,
      label: "Processing prompt: failed",
      percent: 100,
      indeterminate: false
    });
    if (aiStatusText) {
      latestStatusMessage = `Analysis failed: ${error.message}`;
      aiStatusText.textContent = latestStatusMessage;
    }
  } finally {
    if (tickTimer) {
      window.clearInterval(tickTimer);
    }
    aiActiveAnalyzeAbortController = null;
    setAiAnalyzeRunning(false);
    setAiBusy(false);
  }
});

searchInput.addEventListener("input", () => {
  persistFiltersToState();
  scheduleFilterPersistence();
  scheduleRender();
});

[mitreFilter, statusFilter, tagFilter, sortSelect].forEach((control) => {
  control.addEventListener("change", () => {
    persistFiltersToState();
    saveState();
    render();
  });
});

osFilterRadios?.addEventListener("change", () => {
  persistFiltersToState();
  saveState();
  render();
});

exportButton.addEventListener("click", exportState);

gridViewButton.addEventListener("click", () => {
  setViewMode("grid");
});

listViewButton.addEventListener("click", () => {
  setViewMode("list");
});

clearFiltersButton.addEventListener("click", clearFilters);

resetButton.addEventListener("click", () => {
  openResetDialog();
});

advancedFiltersButton?.addEventListener("click", () => {
  setAdvancedFiltersOpen(!state.advancedFiltersOpen);
});

toggleSectionsButton?.addEventListener("click", () => {
  const visibleSections = getVisibleSections();
  if (!visibleSections.length) {
    return;
  }

  const shouldCollapse = toggleSectionsButton.dataset.mode !== "expand";
  visibleSections.forEach((section) => {
    const collapseButton = section.querySelector('[data-action="toggle-section-collapse"]');
    const mitreName = collapseButton?.dataset.mitre;
    if (!mitreName) {
      return;
    }
    setSectionCollapsed(section, mitreName, shouldCollapse);
  });

  syncGlobalSectionsToggleButton();
  saveState();
});

buildOptions();
applySavedControlState();
if (aiContextLengthInput) {
  applyContextSpecForSelectedModel(AI_DEFAULTS.contextLength || 8192);
}
updateLastSavedLabel();
setAppView(activeAppView);
setSidebarOpen(false);
setupArtifactEditorAutocomplete();
renderArtifactEditorList();
renderAiArtifactSelectionList();
render();
refreshAiSessionStatus();
startAiBackendPoller();
refreshAiModelList();

window.addEventListener("beforeunload", () => {
  if (stateSaveTimer || filterPersistTimer) {
    window.clearTimeout(stateSaveTimer);
    window.clearTimeout(filterPersistTimer);
    saveState();
  }
});
