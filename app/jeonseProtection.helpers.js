/* 전세사기 보호 담당자 역할 하네스 — 공용 상태/렌더 헬퍼.
   presentation은 공통 CSS 토큰(jbwc-* 클래스)을 재사용하고,
   상태·데이터 접근은 전부 JPO 전용(config/db/services)만 사용한다. */

let jpoState = {
  view: "board",
  lastRun: null,
  detail: null,
  lists: {},
  counts: null,
  countsLoading: false,
  countsError: false,
  countsAt: null,
  search: { q: "", loading: false, error: false, blocked: null, results: null },
};

let jpoCaseWizard = jpoDefaultCaseWizard();

function jpoDefaultCaseWizard() {
  const taskType = "preContractRisk";
  return {
    taskType,
    title: "",
    description: "",
    tenantRefId: "TENANT-REF-DEMO",
    contractRefId: "CONTRACT-REF-DEMO",
    propertyRefId: "PROPERTY-REF-DEMO",
    landlordRefId: "LANDLORD-REF-DEMO",
    addressRefId: "ADDRESS-REF-DEMO",
    depositAmountBand: "1억~2억",
    leaseStartDate: "",
    leaseEndDate: "",
    assignedTeam: JPO_TASK_TAXONOMY[taskType].team,
    assignedToId: "",
    priority: "normal",
    riskLevel: "medium",
    dueAt: "",
    sourceChannel: "opsPortal",
    requiresHumanReview: false,
    attachmentsExist: false,
    tags: "",
    riskSignals: [],
  };
}

function jpoModeActive() {
  return typeof activeView !== "undefined" && activeView === "jeonse-protection-harness";
}

function jpoTaskTypeLabel(taskType) {
  return (JPO_TASK_TAXONOMY[taskType] || {}).label || taskType || "-";
}

function jpoStatusLabel(status) {
  return JPO_STATUS_LABELS[status] || status || "-";
}

function jpoRiskPill(risk) {
  const map = {
    low: ["낮음", "status-approved"],
    medium: ["보통", "status-pending"],
    high: ["높음", "status-escalated"],
    critical: ["심각", "status-escalated"],
    urgent: ["긴급", "status-escalated"],
    normal: ["보통", "status-pending"],
  };
  const [label, cls] = map[risk] || [risk || "-", "status-new"];
  return `<span class="status-pill ${cls}">${escapeHtml(label)}</span>`;
}

function jpoStatusPill(status) {
  const pending = [
    "received", "triaged", "assigned", "inReview", "pendingApproval",
    "pendingVictimReview", "pendingGuaranteeReview", "waitingExternalData",
    "open", "inProgress", "pending", "queued", "running", "needsReview",
    "investigating", "upcoming", "degraded",
  ];
  const danger = ["escalated", "overdue", "down", "error", "rejected", "critical"];
  const ok = ["completed", "closed", "resolved", "active", "enabled", "healthy", "approved"];
  const cls = danger.includes(status) ? "status-escalated"
    : ok.includes(status) ? "status-approved"
      : pending.includes(status) ? "status-pending" : "status-new";
  return `<span class="status-pill ${cls}" data-status="${escapeHtml(status || "-")}">${escapeHtml(jpoStatusLabel(status))}</span>`;
}

function jpoMockNote() {
  return `<p class="jbwc-mock-note">※ 내부 운영 참고용 모의(mock) 데이터 — 실제 신청·법률 판단·고객 안내 아님 · 담당자 검토 필요</p>`;
}

function jpoPanel(title, bodyHtml, metaHtml = "") {
  return `<section class="workspace-panel jbwc-panel">
    <p class="eyebrow">${escapeHtml(title)}</p>${metaHtml}${bodyHtml}</section>`;
}

function jpoDetailSource(kind) {
  return {
    case: "jeonse_cases",
    task: "jeonse_tasks",
    risk: "jeonse_risk_assessments",
    registry: "jeonse_registry_checks",
    price: "jeonse_price_ratio_checks",
    guarantee: "jeonse_guarantee_reviews",
    victim: "jeonse_victim_support_reviews",
    referral: "jeonse_referrals",
    alert: "jeonse_alerts",
    approval: "approvals",
    agentRun: "agent_runs",
    handoff: "agent_handoffs",
    recommendation: "ai_recommendations",
  }[kind] || null;
}

function jpoDetailTitle(kind, row) {
  if (!row) return "상세";
  if (kind === "case") return `${row.caseNo} · ${row.title}`;
  if (kind === "task") return `${row.id} · ${row.title}`;
  if (kind === "guarantee" || kind === "victim") return `${row.id} · ${row.reviewType}`;
  if (kind === "registry") return `${row.id} · ${row.issueType}`;
  if (kind === "price") return `${row.id} · ${row.checkType}`;
  if (kind === "referral") return `${row.id} · ${row.referralType}`;
  if (kind === "alert") return `${row.id} · ${row.alertType}`;
  if (kind === "approval") return `${row.id} · ${row.approvalType}`;
  if (kind === "agentRun") return `${row.id} · ${row.agentId}`;
  if (kind === "handoff") return `${row.id} · ${row.fromAgentId} → ${row.toAgentId}`;
  if (kind === "recommendation") return row.title;
  return row.id || "상세";
}

function jpoFieldLabel(key) {
  const label = JPO_FIELD_LABELS[key];
  return label ? `${label} · ${key}` : key;
}

function jpoDetailPanel() {
  if (!jpoState.detail) return "";
  const table = jpoDetailSource(jpoState.detail.kind);
  if (!table) return "";
  const row = jpoTable(table, JPO_ROLE_KEY).find((item) => (
    item.id === jpoState.detail.id || item.caseNo === jpoState.detail.id
  ));
  if (!row) {
    return `<section class="workspace-panel jbwc-detail-panel" aria-label="전세보호 운영 상세">
      <header>
        <div><p class="eyebrow">DB 상세 · 전세보호 role scope</p><h3>상세 데이터를 찾을 수 없습니다</h3></div>
        <button class="secondary-button" type="button" data-jpo-clear-detail>닫기</button>
      </header>
      <div class="jbwc-empty">요청한 기록(${escapeHtml(jpoState.detail.id || "-")})이 현재 데모 DB에 없습니다.
        데모 데이터가 초기화되었거나 잘못된 링크일 수 있습니다.
        <button class="secondary-button" type="button" data-jpo-reset-db>데모 데이터 다시 채우기</button></div>
    </section>`;
  }
  const fields = Object.entries(row)
    .filter(([key]) => !["roleKey", "workspaceId"].includes(key))
    .map(([key, value]) => {
      const normalized = Array.isArray(value) ? value.join(", ") : value == null ? "-" : String(value);
      return `<div><span>${escapeHtml(jpoFieldLabel(key))}</span><strong>${escapeHtml(normalized)}</strong></div>`;
    })
    .join("");
  return `<section class="workspace-panel jbwc-detail-panel" aria-label="전세보호 운영 상세">
    <header>
      <div><p class="eyebrow">DB 상세 · 전세보호 role scope</p><h3>${escapeHtml(jpoDetailTitle(jpoState.detail.kind, row))}</h3></div>
      <button class="secondary-button" type="button" data-jpo-clear-detail>닫기</button>
    </header>
    <div class="jbwc-detail-grid">${fields}</div>
    <p class="jbwc-guard">실명·주민번호·상세주소·계좌 원문 없이 익명 참조 ID(TENANT-REF-* 등)와 운영 상태만 표시합니다.</p>
  </section>`;
}

function jpoListKey(cols, rows) {
  return "jpo_" + cols.join("_").replace(/\W+/g, "_") + "_" + (rows[0]?.id || "empty");
}

function jpoListState(key) {
  jpoState.lists[key] = jpoState.lists[key] || { q: "", sort: "default", page: 1 };
  return jpoState.lists[key];
}

function jpoComparable(value) {
  return value == null ? "" : String(value).toLowerCase();
}

function jpoTableView(cols, rows, rowHtml, options = {}) {
  const key = options.key || jpoListKey(cols, rows);
  const state = jpoListState(key);
  const pageSize = options.pageSize || 8;
  const searchable = (row) => Object.values(row).map((v) => v == null ? "" : String(v)).join(" ").toLowerCase();
  const q = state.q.trim().toLowerCase();
  const filtered = q ? rows.filter((row) => searchable(row).includes(q)) : rows.slice();
  const sortKey = state.sort;
  const sorted = sortKey === "default" ? filtered : filtered.sort((a, b) => jpoComparable(a[sortKey]).localeCompare(jpoComparable(b[sortKey]), "ko"));
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  state.page = Math.min(Math.max(1, state.page), totalPages);
  const paged = sorted.slice((state.page - 1) * pageSize, state.page * pageSize);
  const sortOptions = ["default", "status", "riskLevel", "priority", "dueAt", "createdAt"].map((value) => (
    `<option value="${value}" ${state.sort === value ? "selected" : ""}>${escapeHtml(JPO_SORT_LABELS[value] || value)}</option>`
  )).join("");
  const controls = `<div class="jbwc-list-controls" data-jpo-list="${escapeHtml(key)}">
    <input type="search" data-jpo-list-filter="${escapeHtml(key)}" value="${escapeHtml(state.q)}" placeholder="현재 목록 필터" />
    <select data-jpo-list-sort="${escapeHtml(key)}" aria-label="목록 정렬">${sortOptions}</select>
    <span>${escapeHtml(String(sorted.length))}/${escapeHtml(String(rows.length))}건 · ${escapeHtml(String(state.page))}/${escapeHtml(String(totalPages))}쪽</span>
    <button class="secondary-button" type="button" data-jpo-list-page="${escapeHtml(key)}" data-page-delta="-1" ${state.page <= 1 ? "disabled" : ""}>이전</button>
    <button class="secondary-button" type="button" data-jpo-list-page="${escapeHtml(key)}" data-page-delta="1" ${state.page >= totalPages ? "disabled" : ""}>다음</button>
  </div>`;
  if (!rows.length) return `${controls}<div class="jbwc-empty">표시할 데이터가 없습니다. <button class="secondary-button" type="button" data-jpo-reset-db>데모 데이터 다시 채우기</button></div>`;
  if (!paged.length) return `${controls}<div class="jbwc-empty">필터 조건에 맞는 데이터가 없습니다.</div>`;
  return `${controls}<ul class="jbwc-list">
    <li class="jbwc-row jbwc-row-head">${cols.map((c) => `<span>${escapeHtml(c)}</span>`).join("")}</li>
    ${paged.map(rowHtml).join("")}
  </ul>`;
}

function jpoHeaderBar() {
  const at = jpoState.countsAt ? new Date(jpoState.countsAt).toTimeString().slice(0, 8) : "-";
  const dataState = jpoState.countsError
    ? `<span class="jbwc-badge-warn">데이터 갱신 실패</span>`
    : `데이터 기준 ${escapeHtml(at)}`;
  return `<nav class="jbwc-breadcrumb" aria-label="전세사기 보호 담당자 하네스 위치">
    <button class="secondary-button" type="button" data-jpo-back>← 전체로 돌아가기</button>
    <span>역할 &gt; <strong>전세사기 보호 담당자 하네스</strong> &gt; ${escapeHtml(JPO_VIEWS[jpoState.view] || "")}</span>
    <span class="jbwc-updated">${dataState} <button class="secondary-button jbwc-refresh" type="button" data-jpo-refresh>새로고침</button></span>
  </nav>`;
}

function jpoUserName(id) {
  const user = jpoTable("users", JPO_ROLE_KEY).find((item) => item.id === id);
  return user ? user.name : (id || "-");
}

function jpoAgentDisplayName(agentId) {
  const agent = jeonseProtectionAgents.find((item) => item.id === agentId);
  return agent ? agent.displayName : (agentId || "-");
}

function jpoOfficialRefNote() {
  const refs = JPO_OFFICIAL_REFERENCES.map((ref) => `${ref.label} (${ref.site})`).join(" · ");
  return `<p class="jbwc-guard">공식 근거(안내 후보): ${escapeHtml(refs)} — 법령·지원요건은 변동 가능, 최신 기준 담당자 확인 필요.</p>`;
}
