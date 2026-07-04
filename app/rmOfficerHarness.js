/* ============================================================
   RM 역할 하네스 — route/view/sidebar/action 연결부 + 키보드 퍼스트 핸들러.
   business config/registry/service는 rmOfficer* 전용 파일에서만 가져온다.
   ============================================================ */

const rmoViewRenderers = Object.assign(
  {
    board: rmoBoardView,
    "cases-new": rmoCaseCreationView,
    "agent-harness": rmoHarnessView,
    capabilities: rmoCapabilityRepositoryView,
  },
  rmoCaseViewRenderers,
);

let rmoKeyOverlayTimer = null;

function rmOfficerHarnessPage() {
  let body = "";
  try {
    const renderer = rmoViewRenderers[rmoState.view] || rmoViewRenderers.board;
    body = renderer();
  } catch (error) {
    body = `<div class="jbwc-error">RM 데이터를 불러오지 못했습니다. <button class="secondary-button" type="button" data-rmo-reset-db>데모 데이터 초기화</button></div>`;
  }
  return `<div class="jbwc-shell rmo-shell">${rmoHeaderBar()}${rmoDetailPanel()}${body}${rmoDocumentModalMarkup()}${rmoKeyOverlayMarkup()}</div>`;
}

function rmoKeyOverlayMarkup() {
  if (!rmoState.keyOverlay) return "";
  return `<div class="rmo-key-overlay" role="status">
    <strong>${escapeHtml(rmoState.keyOverlay.key)}</strong>
    <span>${escapeHtml(rmoState.keyOverlay.label || "")}</span>
  </div>`;
}

function rmoShowKeyOverlay(key, label) {
  rmoState.keyOverlay = { key, label: label || "" };
  if (rmoKeyOverlayTimer) window.clearTimeout(rmoKeyOverlayTimer);
  rmoKeyOverlayTimer = window.setTimeout(() => {
    rmoState.keyOverlay = null;
    if (rmoModeActive() && typeof render === "function") render();
  }, 900);
}

function rmoActivateFromHash() {
  const route = rmoRouteFromHash(window.location.hash);
  if (!route) return false;
  let changed = false;
  if (!rmoModeActive()) {
    activeView = "rm-officer-harness";
    activeDetailType = defaultDetailForView(activeView);
    changed = true;
  }
  if (route.view && RMO_VIEWS[route.view] && rmoState.view !== route.view) {
    rmoState.view = route.view;
    changed = true;
  }
  if (route.caseId) {
    const nextDetail = { kind: "case", id: route.caseId };
    if (JSON.stringify(rmoState.detail) !== JSON.stringify(nextDetail)) {
      rmoState.detail = nextDetail;
      rmoState.workMapFocusIndex = -1;
      rmoState.workMapExpandedNodeId = null;
      changed = true;
    }
  }
  return changed;
}

function rmoSetPendingScroll(target) {
  rmoState.pendingScrollTarget = target || null;
}

function rmoElementByDataAttr(attr, value) {
  if (!value) return null;
  return Array.from(document.querySelectorAll(`[${attr}]`)).find((el) => el.getAttribute(attr) === value) || null;
}

function rmoQueueNodesForCase(caseId) {
  const caseRow = rmoTable("rm_officer_cases", RMO_ROLE_KEY).find((c) => c.id === caseId);
  if (!caseRow) return [];
  const tree = rmoBuildWorkMapTree(caseRow);
  return [...tree.branches, ...(tree.report ? [tree.report] : [])];
}

function rmoFocusedNodeId() {
  return rmoState.workMapNodeOrder[rmoState.workMapFocusIndex] || null;
}

function rmoAdvanceWorkStep(delta = 1) {
  if (!rmoState.workMapNodeOrder.length) return;
  const max = rmoState.workMapNodeOrder.length - 1;
  rmoState.workMapFocusIndex = Math.min(max, Math.max(0, rmoState.workMapFocusIndex + delta));
  rmoState.workMapExpandedNodeId = null;
  rmoSetPendingScroll({ nodeFocus: true, sub: true });
}

function rmoMoveFocusAfterNodeAction(caseId, currentNodeId) {
  const nodes = rmoQueueNodesForCase(caseId);
  if (!nodes.length) return;
  const currentIdx = Math.max(0, nodes.findIndex((node) => node.id === currentNodeId));
  let nextIdx = nodes.findIndex((node, idx) => idx > currentIdx && rmoNodeStatus(node.status) === "ready");
  if (nextIdx < 0) nextIdx = nodes.findIndex((node, idx) => idx > currentIdx && ["running", "needsApproval", "notStarted"].includes(rmoNodeStatus(node.status)));
  if (nextIdx < 0) nextIdx = Math.min(currentIdx + 1, nodes.length - 1);
  rmoState.workMapFocusIndex = nextIdx;
}

function rmoStartAssignmentRun(assignmentId) {
  const asg = rmoTable("rm_officer_agent_assignments", RMO_ROLE_KEY).find((a) => a.id === assignmentId);
  if (!asg) return { error: "배정을 찾을 수 없습니다." };
  if (["completed", "needsApproval"].includes(asg.status)) return { alreadyDone: true, assignment: asg };
  const caseRow = rmoTable("rm_officer_cases", RMO_ROLE_KEY).find((c) => c.id === asg.caseId);
  if (!caseRow) return { error: "케이스를 찾을 수 없습니다." };
  if (asg.kind === "report") {
    const incompleteBranches = rmoTable("rm_officer_agent_assignments", RMO_ROLE_KEY)
      .filter((a) => a.caseId === caseRow.id && a.kind !== "report" && a.status !== "completed");
    if (incompleteBranches.length) return { error: "선행 분석 노드를 먼저 완료해야 합니다." };
  }
  if (!["pendingApproval", "running"].includes(asg.status)) return { error: "아직 실행할 수 없는 노드입니다." };
  if (asg.status !== "running") rmoUpdate("rm_officer_agent_assignments", asg.id, { status: "running", progress: 40 });
  if (rmoStageOf(caseRow) === "todo") rmoUpdate("rm_officer_cases", caseRow.id, { stage: "doing", status: "analyzing", updatedAt: rmoNow() });
  return { assignment: rmoTable("rm_officer_agent_assignments", RMO_ROLE_KEY).find((a) => a.id === assignmentId), case: rmoTable("rm_officer_cases", RMO_ROLE_KEY).find((c) => c.id === caseRow.id) };
}

function rmoFinishApprove(assignmentId) {
  const result = approveRmOfficerAssignment(assignmentId);
  if (result.error) { if (typeof notify === "function") notify(result.error); render(); return; }
  if (result.alreadyDone) { if (typeof notify === "function") notify("이미 실행 완료된 에이전트입니다."); render(); return; }
  rmoInvalidateCounts();
  rmoState.workMapExpandedNodeId = null;
  rmoMoveFocusAfterNodeAction(result.case.id, assignmentId);
  rmoSetPendingScroll({ nodeFocus: true, sub: true });
  if (result.integrated) { rmoState.mdTab = "통합본"; if (typeof notify === "function") notify(`${result.deliverable.fileName} 생성 · 통합 리포트 완성 — 직원 최종 승인(A) 대기`); }
  else if (typeof notify === "function") notify(`${result.deliverable.fileName} 생성 완료 — 다음 에이전트 승인(Enter)`);
  render();
}

function rmoFlushPendingScroll() {
  const target = rmoState.pendingScrollTarget;
  if (!target || !rmoModeActive()) return;
  rmoState.pendingScrollTarget = null;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const cardId = target.cardId || (rmoState.detail && rmoState.detail.kind === "case" ? rmoState.detail.id : null);
      const card = rmoElementByDataAttr("data-rmo-open-case", cardId);
      if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

      let node = null;
      if (target.nodeId) node = rmoElementByDataAttr("data-rmo-node", target.nodeId);
      if (!node && target.nodeFocus) {
        const focusedId = rmoState.workMapNodeOrder[rmoState.workMapFocusIndex];
        node = rmoElementByDataAttr("data-rmo-node", focusedId);
      }
      if (node) node.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      else if (target.sub) {
        const sub = document.querySelector(".rmo-sub-region");
        if (sub) sub.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      }
    });
  });
}

function rmoDoApprove(assignmentId) {
  const started = rmoStartAssignmentRun(assignmentId);
  if (started.error) { if (typeof notify === "function") notify(started.error); return; }
  if (started.alreadyDone) { if (typeof notify === "function") notify("이미 실행 완료된 에이전트입니다."); return; }
  rmoInvalidateCounts();
  rmoState.workMapExpandedNodeId = null;
  rmoSetPendingScroll({ nodeId: assignmentId, sub: true });
  rmoShowKeyOverlay("Enter", `${rmoAgentDisplayName(started.assignment.agentId)} 실행 중`);
  if (typeof notify === "function") notify(`${rmoAgentDisplayName(started.assignment.agentId)} 실행 중 — 산출물 생성 준비`);
  render();
  window.setTimeout(() => rmoFinishApprove(assignmentId), 900);
}

function rmoDoRerun(assignmentId) {
  const result = rmoRerunWorkMapNode(assignmentId);
  if (result.error) { if (typeof notify === "function") notify(result.error); return; }
  rmoInvalidateCounts();
  rmoState.workMapExpandedNodeId = null;
  rmoMoveFocusAfterNodeAction(result.assignment.caseId, assignmentId);
  rmoSetPendingScroll({ nodeFocus: true, sub: true });
  if (typeof notify === "function") notify(`${result.deliverable ? result.deliverable.fileName : ""} 재실행 완료`.trim());
  render();
}

function rmoDoApproveCase() {
  const caseId = rmoState.detail && rmoState.detail.kind === "case" ? rmoState.detail.id : null;
  if (!caseId) return;
  const result = rmoApproveCaseReport(caseId, "USR-RMO-APR-01");
  if (result.error) { if (typeof notify === "function") notify(result.error); return; }
  if (result.alreadyDone) { if (typeof notify === "function") notify("이미 직원 최종 승인이 완료된 케이스입니다."); return; }
  rmoInvalidateCounts();
  if (typeof notify === "function") notify("직원 최종 승인 완료 — 케이스가 종료 처리되었습니다.");
  render();
}

function rmoHandleKeydown(event) {
  if (!rmoModeActive()) return;
  const target = event.target;
  if (target && (/(INPUT|TEXTAREA|SELECT)/).test(target.tagName || "") || (target && target.isContentEditable)) return;
  if (rmoState.modal && rmoState.modal.fileName) {
    if (event.key === "Escape") { rmoState.modal = null; render(); event.preventDefault(); }
    return;
  }
  if (/^[1-9]$/.test(event.key) && rmoState.view === "board") {
    const id = rmoState.boardOrder[Number(event.key) - 1];
    if (id) {
      rmoSetPendingScroll({ cardId: id, sub: true });
      rmoShowKeyOverlay(event.key, `Case ${event.key} 선택`);
      rmoGo("board", { kind: "case", id });
      event.preventDefault();
    }
    return;
  }
  const caseSelected = rmoState.detail && rmoState.detail.kind === "case";
  /* ←→ 케이스 이동 — 케이스가 선택된 상태에서 업무보드 순서를 따라 이전/다음 케이스로 */
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    if (caseSelected && rmoState.view === "board" && rmoState.boardOrder.length) {
      const idx = rmoState.boardOrder.indexOf(rmoState.detail.id);
      const nextIdx = event.key === "ArrowRight" ? Math.min(idx + 1, rmoState.boardOrder.length - 1) : Math.max(idx - 1, 0);
      const nextId = rmoState.boardOrder[nextIdx];
      if (nextId && nextId !== rmoState.detail.id) {
        rmoSetPendingScroll({ cardId: nextId, sub: true });
        rmoShowKeyOverlay(event.key === "ArrowRight" ? "→" : "←", event.key === "ArrowRight" ? "다음 케이스" : "이전 케이스");
        rmoGo("board", { kind: "case", id: nextId });
      }
      event.preventDefault();
    }
    return;
  }
  if (!caseSelected) return;
  /* ↑↓ 업무 계층도 노드 이동 · Space 다음 스텝 · D 상세 보기 · Enter 실행 승인 · R 재실행 · A 통합 보고서 승인 */
  if (event.key === "ArrowDown") {
    rmoAdvanceWorkStep(1);
    rmoShowKeyOverlay("↓", "다음 에이전트");
    render(); event.preventDefault();
  } else if (event.key === "ArrowUp") {
    rmoAdvanceWorkStep(-1);
    rmoShowKeyOverlay("↑", "이전 에이전트");
    render(); event.preventDefault();
  } else if (event.key === " " || event.key === "Spacebar") {
    rmoAdvanceWorkStep(1);
    rmoShowKeyOverlay("Space", "다음 스텝");
    render(); event.preventDefault();
  } else if (event.key === "d" || event.key === "D") {
    const id = rmoFocusedNodeId();
    if (id) rmoState.workMapExpandedNodeId = rmoState.workMapExpandedNodeId === id ? null : id;
    rmoSetPendingScroll({ nodeFocus: true, sub: true });
    rmoShowKeyOverlay("D", rmoState.workMapExpandedNodeId ? "상세 열기" : "상세 닫기");
    render(); event.preventDefault();
  } else if (event.key === "Enter") {
    const id = rmoFocusedNodeId();
    if (id) { rmoDoApprove(id); event.preventDefault(); }
  } else if (event.key === "r" || event.key === "R") {
    const id = rmoFocusedNodeId();
    if (id) { rmoShowKeyOverlay("R", "재실행"); rmoDoRerun(id); event.preventDefault(); }
  } else if (event.key === "a" || event.key === "A") {
    rmoShowKeyOverlay("A", "직원 최종 승인");
    rmoDoApproveCase(); event.preventDefault();
  } else if (event.key === "Escape") {
    rmoState.detail = null;
    rmoState.workMapExpandedNodeId = null;
    rmoShowKeyOverlay("Esc", "케이스 선택 해제");
    if (window.location.hash !== rmoHashForView("board")) window.location.hash = rmoHashForView("board");
    else render();
    event.preventDefault();
  }
}

function bindRmOfficerActions() {
  if (rmoActivateFromHash()) {
    render();
    return;
  }
  if (rmoModeActive()) {
    document.querySelectorAll("[data-role-filter]").forEach((entry) => {
      entry.classList.toggle("is-active", entry.dataset.roleFilter === "RM");
    });
    rmoTakeoverSidebar();
    rmoEnsureCounts();
    if (!rmoState.roleEntered) {
      rmoState.roleEntered = true;
      if (typeof harnessRunHooks === "function") harnessRunHooks("rm-officer", "onRoleEnter", {});
    }
  } else {
    rmoState.roleEntered = false;
    document.querySelectorAll('[data-role-filter="RM"]').forEach((entry) => entry.classList.remove("is-active"));
    rmoRestoreSidebar();
  }

  if (!rmoState.keyboardBound) {
    document.addEventListener("keydown", rmoHandleKeydown);
    rmoState.keyboardBound = true;
  }

  document.querySelectorAll("[data-rmo-view]").forEach((button) => {
    button.addEventListener("click", () => rmoGo(button.dataset.rmoView));
  });
  document.querySelectorAll("[data-rmo-open-case]").forEach((row) => {
    row.addEventListener("click", () => { rmoSetPendingScroll({ cardId: row.dataset.rmoOpenCase, sub: true }); rmoGo("board", { kind: "case", id: row.dataset.rmoOpenCase }); });
  });
  document.querySelectorAll("[data-rmo-open-detail]").forEach((row) => {
    row.addEventListener("click", (event) => {
      event.stopPropagation();
      const [kind, id] = String(row.dataset.rmoOpenDetail || "").split(":");
      if (kind === "case") { rmoState.infoCaseId = id; render(); }
    });
  });
  document.querySelectorAll("[data-rmo-clear-detail]").forEach((button) => {
    button.addEventListener("click", () => { rmoState.infoCaseId = null; render(); });
  });
  document.querySelectorAll("[data-rmo-filter]").forEach((button) => {
    button.addEventListener("click", () => { rmoState.boardFilter = button.dataset.rmoFilter; render(); });
  });
  document.querySelectorAll("[data-rmo-cap-filter]").forEach((button) => {
    button.addEventListener("click", () => { rmoCapabilityFilter = button.dataset.rmoCapFilter; render(); });
  });
  document.querySelectorAll("[data-rmo-approve]").forEach((button) => {
    button.addEventListener("click", (event) => { event.stopPropagation(); rmoDoApprove(button.dataset.rmoApprove); });
  });
  document.querySelectorAll("[data-rmo-rerun]").forEach((button) => {
    button.addEventListener("click", (event) => { event.stopPropagation(); rmoDoRerun(button.dataset.rmoRerun); });
  });
  document.querySelectorAll("[data-rmo-approve-case]").forEach((button) => {
    button.addEventListener("click", (event) => { event.stopPropagation(); rmoDoApproveCase(); });
  });
  document.querySelectorAll("[data-rmo-node]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      const idx = rmoState.workMapNodeOrder.indexOf(card.dataset.rmoNode);
      if (idx >= 0) {
        const sameNode = rmoFocusedNodeId() === card.dataset.rmoNode;
        rmoState.workMapFocusIndex = idx;
        rmoState.workMapExpandedNodeId = sameNode && rmoState.workMapExpandedNodeId !== card.dataset.rmoNode ? card.dataset.rmoNode : null;
        rmoSetPendingScroll({ nodeId: card.dataset.rmoNode, sub: true });
        render();
      }
    });
  });
  document.querySelectorAll("[data-rmo-approve-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const result = rmoDecideApproval(button.dataset.rmoApproveItem, button.dataset.rmoDecision, "USR-RMO-APR-01");
      if (result.error) { if (typeof notify === "function") notify(result.error); return; }
      rmoInvalidateCounts();
      if (typeof notify === "function") notify(`승인 항목 ${button.dataset.rmoDecision === "approve" ? "승인" : "반려"} 처리`);
      render();
    });
  });
  document.querySelectorAll("[data-rmo-md-tab]").forEach((button) => {
    button.addEventListener("click", () => { rmoState.mdTab = button.dataset.rmoMdTab; render(); });
  });
  document.querySelectorAll("[data-rmo-open-md]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      rmoState.modal = { fileName: button.dataset.rmoOpenMd, caseId: button.dataset.rmoMdCase || (rmoState.detail && rmoState.detail.id) };
      render();
    });
  });
  document.querySelectorAll("[data-rmo-close-modal]").forEach((el) => {
    el.addEventListener("click", (event) => { if (event.target === el) { rmoState.modal = null; render(); } });
  });
  document.querySelectorAll("[data-rmo-reset-db]").forEach((button) => {
    button.addEventListener("click", () => {
      rmoResetDb();
      rmoInvalidateCounts();
      if (typeof notify === "function") notify("RM 데모 데이터를 다시 채웠습니다.");
      render();
    });
  });
  document.querySelectorAll("[data-rmo-refresh]").forEach((button) => {
    button.addEventListener("click", () => { rmoInvalidateCounts(); render(); });
  });
  document.querySelectorAll("[data-rmo-list-filter]").forEach((input) => {
    input.addEventListener("change", () => { const state = rmoListState(input.dataset.rmoListFilter); state.q = input.value; state.page = 1; render(); });
  });
  document.querySelectorAll("[data-rmo-list-page]").forEach((button) => {
    button.addEventListener("click", () => { const state = rmoListState(button.dataset.rmoListPage); state.page += Number(button.dataset.pageDelta || 0); render(); });
  });
  const back = document.querySelector("[data-rmo-back]");
  if (back) {
    back.addEventListener("click", () => {
      activeView = "dashboard";
      activeDetailType = defaultDetailForView("dashboard");
      rmoState.view = "board";
      rmoState.detail = null;
      rmoState.infoCaseId = null;
      if (window.location.hash !== "#dashboard") window.location.hash = "#dashboard";
      if (typeof notify === "function") notify("전체 화면으로 복귀했습니다.");
      render();
    });
  }
  rmoBindCaseWizardForm();
  rmoBindHarnessSamples();
  rmoFlushPendingScroll();
}

(function () {
  const prevBind = typeof bindModuleActions === "function" ? bindModuleActions : null;
  window.bindModuleActions = function () {
    if (prevBind) prevBind();
    bindRmOfficerActions();
  };
})();
