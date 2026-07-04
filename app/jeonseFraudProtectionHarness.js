/* ============================================================
   전세사기 보호 담당자 역할 하네스 — 라우팅/화면 연결부
   - view 렌더러: jeonseProtection.view.board/cases/wizard/harness.js
   - 공용 헬퍼: jeonseProtection.helpers.js · 사이드바: jeonseProtection.sidebar.js
   - business config/registry/service는 별도 전용 파일에서만 가져온다.
   - 실제 개인정보·법률 판단·신청 대행 없음. mock DB는 role scope 강제.
   ============================================================ */

const jpoViewRenderers = Object.assign(
  {
    board: jpoDashboardView,
    "cases-new": jpoCaseCreationView,
    "agent-harness": jpoHarnessView,
    "capability-repository": jpoCapabilityRepositoryView,
  },
  jpoCaseViewRenderers,
);

let jpoKeyboardBound = false;

function jpoOpsPage() {
  let body = "";
  try {
    const renderer = jpoViewRenderers[jpoState.view] || jpoViewRenderers.board;
    body = renderer();
  } catch (error) {
    body = `<div class="jbwc-error">데이터를 불러오지 못했습니다. <button class="secondary-button" type="button" data-jpo-reset-db>데모 데이터 초기화</button></div>`;
  }
  return `<div class="jbwc-shell jpo-shell">${jpoHeaderBar()}${jpoDetailPanel()}${body}</div>`;
}

function jpoContextCaseMarkup(row) {
  const runs = jpoTable("jeonse_agent_runs", JPO_ROLE_KEY).filter((run) => run.caseId === row.id).slice(0, 3);
  const deliverables = typeof jpoCaseDeliverables === "function" ? jpoCaseDeliverables(row.id).slice(0, 3) : [];
  const audits = jpoTable("jeonse_audit_logs", JPO_ROLE_KEY).filter((audit) => audit.caseId === row.id).slice(0, 3);
  return `<div class="case-properties jpo-context-panel" data-jpo-context-kind="case">
    <div class="property-row"><span>선택 케이스</span><strong>${escapeHtml(row.caseNo)} · ${escapeHtml(row.addressMasked)}</strong></div>
    <div class="property-row"><span>상태/위험</span><strong>${escapeHtml(jpoStatusLabel(row.status))} · ${escapeHtml(JPO_RISK_LABELS[row.riskLevel] || row.riskLevel)} · ${row.auctionNoticed ? "경·공매 긴급" : "일반 처리"}</strong></div>
    <div class="property-row"><span>고객/담당</span><strong>${escapeHtml(row.customerRefId)} · ${escapeHtml(jpoUserName(row.assignedToId))}</strong></div>
    <div class="property-row"><span>상황</span><strong>${escapeHtml(jpoCaseSituationLine(row))}</strong></div>
    <div class="property-row"><span>다음 액션</span><strong>${escapeHtml(jpoCaseNextAction(row))}</strong></div>
    <div class="property-row"><span>실행 큐</span><strong>${escapeHtml(jpoCaseAgentIds(row, false).map(jpoAgentDisplayName).join(" → "))}</strong></div>
    <div class="property-row"><span>생성 산출물</span><strong>${deliverables.length ? deliverables.map((item) => escapeHtml(item.fileName)).join(" · ") : "아직 없음"}</strong></div>
    <div class="property-row"><span>최근 실행</span><strong>${runs.length ? runs.map((run) => `${escapeHtml(jpoAgentDisplayName(run.agentId))} ${escapeHtml(jpoStatusLabel(run.status))}`).join(" · ") : "아직 없음"}</strong></div>
    <div class="property-row"><span>감사 기록</span><strong>${audits.length ? audits.map((audit) => escapeHtml(audit.action)).join(" · ") : "없음"}</strong></div>
    <p class="jbwc-guard">선택 항목 요약입니다. 전세사기 여부·법률·보증·피해자 결정은 확정하지 않습니다.</p>
  </div>`;
}

function jpoContextCapabilityMarkup(capability) {
  if (!capability) return "";
  return `<div class="case-properties jpo-context-panel" data-jpo-context-kind="capability">
    <div class="property-row"><span>기능명</span><strong>${escapeHtml(capability.name)}</strong></div>
    <div class="property-row"><span>사용 도메인</span><strong>${escapeHtml(capability.domain)}</strong></div>
    <div class="property-row"><span>상태/위험도</span><strong>${escapeHtml(capability.stateLabel || capability.status || "-")} · ${escapeHtml(capability.risk || "중간")}</strong></div>
    <div class="property-row"><span>입력값</span><strong>${escapeHtml(capability.data || capability.inputs || "-")}</strong></div>
    <div class="property-row"><span>출력값</span><strong>${escapeHtml(capability.output || capability.outputs || "-")}</strong></div>
    <div class="property-row"><span>연결 에이전트</span><strong>${escapeHtml((capability.agents || []).map(jpoAgentDisplayName).join(", "))}</strong></div>
    <div class="property-row"><span>사람 검토</span><strong>${capability.humanReview === false ? "선택 검토" : "필요"}</strong></div>
    <p class="jbwc-guard">기능 카드는 전세보호 업무 단위의 입력/출력과 검토 게이트를 설명합니다.</p>
  </div>`;
}

function jpoContextAgentRunMarkup(run) {
  if (!run) return "";
  return `<div class="case-properties jpo-context-panel" data-jpo-context-kind="agentRun">
    <div class="property-row"><span>실행 ID</span><strong>${escapeHtml(run.id)}</strong></div>
    <div class="property-row"><span>에이전트</span><strong>${escapeHtml(jpoAgentDisplayName(run.agentId))}</strong></div>
    <div class="property-row"><span>관련 케이스</span><strong>${escapeHtml(run.caseId || "-")}</strong></div>
    <div class="property-row"><span>입력</span><strong>${escapeHtml(run.inputSummary || "-")}</strong></div>
    <div class="property-row"><span>결과</span><strong>${escapeHtml(run.outputSummary || "-")}</strong></div>
    <div class="property-row"><span>상태</span><strong>${escapeHtml(jpoStatusLabel(run.status))} · ${run.requiresHumanReview ? "담당자 검토 필요" : "검토 후보"}</strong></div>
    <p class="jbwc-guard">실행 결과는 내부 운영 참고용이며 자동 완료/발송하지 않습니다.</p>
  </div>`;
}

function jpoContextMarkup() {
  const counts = jpoState.counts || getJeonseProtectionSidebarCounts();
  if (jpoState.detail?.kind === "case") {
    const row = jpoTable("jeonse_cases", JPO_ROLE_KEY).find((item) => item.id === jpoState.detail.id || item.caseNo === jpoState.detail.id);
    if (row) return jpoContextCaseMarkup(row);
  }
  if (jpoState.detail?.kind === "agentRun") {
    const run = jpoTable("jeonse_agent_runs", JPO_ROLE_KEY).find((item) => item.id === jpoState.detail.id);
    if (run) return jpoContextAgentRunMarkup(run);
  }
  if (jpoState.contextSubject?.kind === "capability" && typeof JPO_CAPABILITY_CATALOG !== "undefined") {
    const capability = JPO_CAPABILITY_CATALOG.find((item) => item.name === jpoState.contextSubject.id);
    if (capability) return jpoContextCapabilityMarkup(capability);
  }
  if (jpoState.view === "capability-repository" && typeof JPO_CAPABILITY_CATALOG !== "undefined") {
    return jpoContextCapabilityMarkup(JPO_CAPABILITY_CATALOG[0]);
  }
  const selected = jpoSelectedBoardCase();
  if (selected) return jpoContextCaseMarkup(selected);
  return `<div class="case-properties">
    <div class="property-row"><span>전용 하네스</span><strong>${escapeHtml(jeonseFraudProtectionHarness.id)}</strong></div>
    <div class="property-row"><span>데이터 범위(roleKey)</span><strong>${escapeHtml(JPO_ROLE_KEY)}</strong></div>
    <div class="property-row"><span>전세보호 건</span><strong>${escapeHtml(counts.cases)}</strong></div>
    <div class="property-row"><span>긴급 경·공매</span><strong>${escapeHtml(counts.urgentAuction)}</strong></div>
    <div class="property-row"><span>데이터 연계</span><strong>${(typeof isLive === "function" && isLive()) ? "실거래 API 모드" : "샘플/스냅샷 기준"}</strong></div>
    <div class="property-row"><span>사람 검토</span><strong>피해자 결정·법률·보증·안내문 필수</strong></div>
    <p class="jbwc-guard">전세사기 여부·피해자 결정·보증 가입·법률 자문에 대한 확정 판단, 신청 대행, 개인정보 원문 저장/출력은 금지됩니다.</p>
  </div>`;
}

function jpoGo(view, detail) {
  jpoState.view = view;
  jpoState.detail = detail || null;
  if (view !== "capability-repository") jpoState.contextSubject = null;
  const next = detail && detail.kind === "case" ? jpoHashForView("cases", detail.id) : jpoHashForView(view);
  if (window.location.hash !== next) window.location.hash = next;
  else if (typeof render === "function") render();
}

function jpoSelectBoardCase(caseId, sourceLabel = "케이스 선택") {
  const found = jpoTable("jeonse_cases", JPO_ROLE_KEY).find((item) => item.id === caseId || item.caseNo === caseId);
  if (!found) return;
  const changed = jpoState.selectedCaseId !== found.id;
  jpoState.selectedCaseId = found.id;
  if (changed) jpoState.workMapFocusIndex = 0;
  jpoState.view = "board";
  jpoState.detail = null;
  jpoState.contextSubject = { kind: "case", id: found.id };
  jpoShowKeyOverlay(sourceLabel, `${found.caseNo} 선택`);
  jpoSetPendingScroll(`[data-jpo-sub-case="${found.id}"]`);
  const next = jpoHashForView("board");
  if (window.location.hash !== next) window.location.hash = next;
  else if (typeof render === "function") render();
}

function jpoMoveBoardSelection(delta) {
  const order = jpoState.boardOrder || [];
  if (!order.length) return;
  const current = Math.max(0, order.indexOf(jpoState.selectedCaseId));
  const nextIndex = Math.min(Math.max(current + delta, 0), order.length - 1);
  jpoSelectBoardCase(order[nextIndex], delta > 0 ? "→ 케이스 이동" : "← 케이스 이동");
}

function jpoMoveQueueFocus(delta, label = "큐 이동") {
  const row = jpoSelectedBoardCase();
  if (!row) return;
  const nodes = jpoQueueNodesForCase(row);
  if (!nodes.length) return;
  jpoState.workMapFocusIndex = Math.min(Math.max(Number(jpoState.workMapFocusIndex || 0) + delta, 0), nodes.length - 1);
  const node = nodes[jpoState.workMapFocusIndex];
  jpoShowKeyOverlay(label, `${jpoAgentDisplayName(node.agentId)} 선택`);
  jpoSetPendingScroll(`[data-jpo-node="${node.id}"]`);
  if (typeof render === "function") render();
}

function jpoExecuteQueueNode(nodeId) {
  const parsed = jpoParseQueueNodeId(nodeId);
  if (!parsed || jpoIsNodeRunning(nodeId)) return;
  jpoState.selectedCaseId = parsed.caseId;
  const row = jpoSelectedBoardCase();
  const index = row ? jpoQueueNodesForCase(row).findIndex((node) => node.id === nodeId) : -1;
  if (index >= 0) jpoState.workMapFocusIndex = index;
  jpoState.nodeRuntime = { nodeId, status: "running" };
  jpoShowKeyOverlay("Enter 실행", `${jpoAgentDisplayName(parsed.agentId)} 실행`);
  jpoSetPendingScroll(`[data-jpo-node="${nodeId}"]`);
  if (jpoNodeRuntimeTimer) window.clearTimeout(jpoNodeRuntimeTimer);
  if (typeof render === "function") render();
  jpoNodeRuntimeTimer = window.setTimeout(() => {
    const result = runJeonseProtectionQueueNode(parsed.caseId, nodeId);
    jpoState.nodeRuntime = null;
    jpoState.contextSubject = { kind: "case", id: parsed.caseId };
    jpoInvalidateCounts();
    if (result && typeof notify === "function") {
      const file = result.deliverable?.fileName || "실행 기록";
      notify(`${file} 생성 · 감사 기록 저장`);
    }
    if (typeof render === "function") render();
  }, 680);
}

function jpoExecuteFocusedQueueNode() {
  const row = jpoSelectedBoardCase();
  const node = row ? jpoFocusedNode(row) : null;
  if (node) jpoExecuteQueueNode(node.id);
}

function jpoHandleKeyboard(event) {
  if (!jpoModeActive() || jpoState.view !== "board" || event.metaKey || event.ctrlKey || event.altKey) return;
  const target = event.target;
  if (target && (target.closest("input, textarea, select, button") || target.isContentEditable)) return;
  if (/^[1-9]$/.test(event.key)) {
    const id = (jpoState.boardOrder || [])[Number(event.key) - 1];
    if (id) {
      event.preventDefault();
      jpoSelectBoardCase(id, `${event.key} 선택`);
    }
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    jpoMoveBoardSelection(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    jpoMoveBoardSelection(1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    jpoMoveQueueFocus(-1, "↑ 큐 이동");
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    jpoMoveQueueFocus(1, "↓ 큐 이동");
  } else if (event.key === " ") {
    event.preventDefault();
    jpoMoveQueueFocus(1, "Space 다음");
  } else if (event.key === "Enter") {
    event.preventDefault();
    jpoExecuteFocusedQueueNode();
  }
}

function jpoActivateFromHash() {
  const route = jpoRouteFromHash(window.location.hash);
  if (!route) return false;
  let changed = false;
  const previousView = jpoState.view;
  if (!jpoModeActive()) {
    activeView = "jeonse-protection-harness";
    activeDetailType = defaultDetailForView(activeView);
    changed = true;
  }
  if (route.view && JPO_VIEWS[route.view] && jpoState.view !== route.view) {
    jpoState.view = route.view;
    changed = true;
  }
  if (route.caseId) {
    const nextDetail = { kind: "case", id: route.caseId };
    if (JSON.stringify(jpoState.detail) !== JSON.stringify(nextDetail)) {
      jpoState.detail = nextDetail;
      changed = true;
    }
  } else if (route.view && route.view !== previousView && jpoState.detail) {
    jpoState.detail = null;
    changed = true;
  }
  return changed;
}

function bindJpoActions() {
  if (jpoActivateFromHash()) {
    render();
    return;
  }

  if (jpoModeActive()) {
    if (!jpoKeyboardBound) {
      jpoKeyboardBound = true;
      window.addEventListener("keydown", jpoHandleKeyboard);
    }
    document.querySelectorAll("[data-role-filter]").forEach((entry) => {
      entry.classList.toggle("is-active", entry.dataset.roleFilter === "전세보호 담당자");
    });
    jpoTakeoverSidebar();
    jpoEnsureCounts();
    if (!jpoState.roleEntered) {
      jpoState.roleEntered = true;
      if (typeof harnessRunHooks === "function") {
        const enterGuard = harnessRunHooks("jeonse-protection", "onRoleEnter", {});
        if (!enterGuard.ok && typeof notify === "function") notify(`하네스 진입 점검 경고: ${enterGuard.violations.join(" / ")}`);
      }
    }
  } else {
    jpoState.roleEntered = false;
    document.querySelectorAll('[data-role-filter="전세보호 담당자"]').forEach((entry) => {
      entry.classList.remove("is-active");
    });
    jpoRestoreSidebar();
  }

  document.querySelectorAll("[data-jpo-view]").forEach((button) => {
    button.addEventListener("click", () => jpoGo(button.dataset.jpoView));
  });
  document.querySelectorAll("[data-jpo-board-case]").forEach((card) => {
    card.addEventListener("click", () => jpoSelectBoardCase(card.dataset.jpoBoardCase, "카드 선택"));
  });
  document.querySelectorAll("[data-jpo-run-node]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      jpoExecuteQueueNode(button.dataset.jpoRunNode);
    });
  });
  document.querySelectorAll("[data-jpo-capability]").forEach((card) => {
    card.addEventListener("click", () => {
      jpoState.contextSubject = { kind: "capability", id: card.dataset.jpoCapability };
      render();
    });
  });
  jpoBindHarnessSamples();
  document.querySelectorAll("[data-jpo-command]").forEach((button) => {
    button.addEventListener("click", () => {
      jpoRunCommand(button.dataset.jpoCommand);
      render();
    });
  });
  document.querySelectorAll("[data-jpo-approve]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const result = jpoDecideApproval(button.dataset.jpoApprove, "approve");
      if (result && result.blocked) {
        if (typeof notify === "function") notify(`승인 차단: ${result.violations.join(" / ")}`);
        return;
      }
      if (result && typeof notify === "function") notify(`${result.approval.approvalType} 승인 완료 (사람 결정)`);
      jpoInvalidateCounts();
      render();
    });
  });
  document.querySelectorAll("[data-jpo-reset-db]").forEach((button) => {
    button.addEventListener("click", () => {
      jpoResetDb();
      jpoInvalidateCounts();
      if (typeof notify === "function") notify("전세보호 데모 데이터를 다시 채웠습니다.");
      render();
    });
  });
  document.querySelectorAll("[data-jpo-refresh]").forEach((button) => {
    button.addEventListener("click", () => { jpoInvalidateCounts(); render(); });
  });
  document.querySelectorAll("[data-jpo-open-case]").forEach((row) => {
    row.addEventListener("click", () => {
      const found = jpoTable("jeonse_cases", JPO_ROLE_KEY).find((item) => item.id === row.dataset.jpoOpenCase);
      if (found) {
        const title = found.title || `${jpoIntakeTypeLabel(found.intakeType)} · ${found.addressMasked}`;
        if (typeof notify === "function") notify(`${found.caseNo} · ${title} — ${jpoStatusLabel(found.status)} · 담당 ${jpoUserName(found.assignedToId)} (모의)`);
        jpoGo("cases", { kind: "case", id: found.id });
      }
    });
  });
  document.querySelectorAll("[data-jpo-open-detail]").forEach((row) => {
    row.addEventListener("click", () => {
      const [kind, id] = String(row.dataset.jpoOpenDetail || "").split(":");
      if (!kind || !id) return;
      jpoState.detail = { kind, id };
      render();
    });
  });
  document.querySelectorAll("[data-jpo-open-approval]").forEach((row) => {
    row.addEventListener("click", () => { jpoState.detail = { kind: "approval", id: row.dataset.jpoOpenApproval }; render(); });
  });
  document.querySelectorAll("[data-jpo-clear-detail]").forEach((button) => {
    button.addEventListener("click", () => { jpoState.detail = null; render(); });
  });
  document.querySelectorAll("[data-jpo-list-filter]").forEach((input) => {
    input.addEventListener("change", () => {
      const state = jpoListState(input.dataset.jpoListFilter);
      state.q = input.value;
      state.page = 1;
      render();
    });
  });
  document.querySelectorAll("[data-jpo-list-sort]").forEach((select) => {
    select.addEventListener("change", () => {
      const state = jpoListState(select.dataset.jpoListSort);
      state.sort = select.value;
      state.page = 1;
      render();
    });
  });
  document.querySelectorAll("[data-jpo-list-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const state = jpoListState(button.dataset.jpoListPage);
      state.page += Number(button.dataset.pageDelta || 0);
      render();
    });
  });

  jpoBindCaseWizardForm();

  document.querySelectorAll("[data-jpo-enrich-latest]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = jpoTable("jeonse_cases", JPO_ROLE_KEY).find((c) => c.status === "enriching" || c.sourceMode === "fallback")
        || jpoTable("jeonse_cases", JPO_ROLE_KEY)[0];
      if (!target) return;
      jpoState.enrich = { status: "loading", caseId: target.id, message: `${target.caseNo} 실거래 조회 중...` };
      render();
      enrichJeonseCase(target.id)
        .then((result) => {
          jpoState.enrich = {
            status: result.market.sourceMode,
            caseId: target.id,
            message: `${target.caseNo} 보강 완료 — ${JPO_SOURCE_MODES[result.market.sourceMode]} · 위험도 ${JPO_RISK_LABELS[result.assessment.riskLevel] || result.assessment.riskLevel}`,
          };
          jpoInvalidateCounts();
        })
        .catch(() => { jpoState.enrich = { status: "fallback", caseId: target.id, message: "보강 실패 — 담당자 확인 필요" }; })
        .then(() => render());
    });
  });

  const back = document.querySelector("[data-jpo-back]");
  if (back) {
    back.addEventListener("click", () => {
      document.querySelectorAll("[data-role-filter]").forEach((entry) => entry.classList.remove("is-active"));
      activeView = "dashboard";
      activeDetailType = defaultDetailForView("dashboard");
      jpoState.view = "board";
      jpoState.detail = null;
      if (window.location.hash !== "#dashboard") window.location.hash = "#dashboard";
      if (typeof notify === "function") notify("전체 화면으로 복귀했습니다.");
      render();
    });
  }
  if (jpoModeActive()) jpoFlushPendingScroll();
}

(function () {
  const prevBind = typeof bindModuleActions === "function" ? bindModuleActions : null;
  window.bindModuleActions = function () {
    if (prevBind) prevBind();
    bindJpoActions();
  };
})();
