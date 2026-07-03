/* 전세사기 보호 담당자 역할 하네스 — 업무 보드 view. */

function jpoDashboardView() {
  const counts = jpoState.counts || {};
  const kpis = getJeonseProtectionDashboardKpis();
  const tasks = jpoTable("jeonse_tasks", JPO_ROLE_KEY)
    .filter((item) => ["open", "inProgress", "overdue"].includes(item.status) || item.dueAt === new Date().toISOString().slice(0, 10));
  const cases = jpoTable("jeonse_cases", JPO_ROLE_KEY).filter(jpoActiveCase);
  const menuCountKey = {
    preContractRisk: "preContractRisk",
    priceRatio: "priceRatio",
    registryRights: "registryRights",
    guaranteeHug: "guaranteeHug",
    auctionSupport: "auctionSupport",
    legalReferral: "supportReferrals",
    careReferral: "supportReferrals",
    victimDecision: "victimDecision",
    vulnerableTenant: "vulnerableTenants",
    urgentAlert: "urgentAlerts",
  };
  const typeCards = Object.entries(JPO_TASK_TAXONOMY).map(([taskType, cfg]) => {
    const value = counts[menuCountKey[taskType]];
    return `<button class="jbwc-card jbwc-domain-card" type="button" data-jpo-view="${escapeHtml(cfg.routeView)}">
      <header><strong>${escapeHtml(cfg.label)}</strong><span class="status-pill status-new">${escapeHtml(value == null ? "…" : String(value))}</span></header>
      <p class="jbwc-meta">담당 ${escapeHtml(cfg.team)}${cfg.requiresHumanReview ? " · 사람 검토 필수" : ""}</p>
      <p class="jbwc-guard">데이터 범위 roleKey=${escapeHtml(JPO_ROLE_KEY)}</p>
    </button>`;
  }).join("");
  return `<section class="jbwc-hero">
      <p class="eyebrow">역할 전용 업무 하네스 · 화면 필터가 아닌 독립 운영 콘솔</p>
      <h2>전세사기 보호 담당자 하네스</h2>
      <p>계약 전 위험 신호 점검부터 피해자 지원 연계까지, 전세보호 업무를 전용 데이터·에이전트·승인·감사 흐름으로 처리합니다.
      AI는 점검 항목과 안내 후보만 제안하고, 법률 판단·피해자 결정·보증 가능 여부·고객 발송은 항상 담당자가 결정합니다.</p>
      <div class="jbwc-kpis">${kpis.map(([label, value, note]) => `
        <article class="jbwc-kpi"><p class="jbwc-kpi-value">${escapeHtml(value)}</p>
        <p class="jbwc-kpi-label">${escapeHtml(label)}</p><p class="jbwc-kpi-note">${escapeHtml(note)}</p></article>`).join("")}</div>
    </section>
    ${jpoPanel("업무 유형 카드", `<div class="jbwc-grid">${typeCards}</div>`)}
    ${jpoPanel(`오늘 처리할 태스크 (${tasks.length})`, jpoTableView(["태스크", "관련 건", "담당", "상태"], tasks, (x) => `
      <li class="jbwc-row"><span class="jbwc-row-id">${escapeHtml(x.id)}</span>
        <span>${escapeHtml(x.title)}<br><span class="jbwc-row-note">${escapeHtml(x.caseId || "-")}</span></span>
        <span>${escapeHtml(jpoUserName(x.ownerId))} · 기한 ${escapeHtml(x.dueAt || "-")}</span>
        <span>${jpoStatusPill(x.status)}</span></li>`))}
    ${jpoPanel(`진행 중 전세보호 건 (${cases.length})`, jpoCaseListMarkup(cases))}
    ${jpoOfficialRefNote()}
    ${jpoMockNote()}`;
}
