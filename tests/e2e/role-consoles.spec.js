/* 역할축 콘솔 검증 — 기업여신 심사지원 포털(ccl) + FDS·보이스피싱 대응 포털(fdr).
   철학: 역할=콘솔, 도메인=케이스, 에이전트=내부 전문가 조직(표면/내부 분리). */

const { expect, test } = require("@playwright/test");
const fs = require("node:fs");

const screenshotDirs = ["test-results/screenshots", "tests/results/screenshots"];
async function saveShot(page, name) {
  for (const dir of screenshotDirs) {
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: `${dir}/${name}`, fullPage: true });
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.removeItem("jb-finance-support-state-v4"));
  await page.addInitScript(() => window.localStorage.removeItem("jbwc-ops-db-v3"));
  await page.addInitScript(() => window.localStorage.removeItem("jpo-ops-db-v2"));
  await page.addInitScript(() => window.localStorage.removeItem("ccl-ops-db-v1"));
  await page.addInitScript(() => window.localStorage.removeItem("fdr-ops-db-v1"));
});

test("기업여신: 레일 진입 → 전용 콘솔·보드 lifecycle·복귀", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator('[data-rail-toggle="role"]').click();
  await page.locator('[data-role-filter="기업여신 담당자"]').click();

  await expect(page.locator(".sidebar-brand")).toContainText("기업여신 심사지원 포털");
  await expect(page.locator("#new-case-button")).toContainText("여신 검토 건 접수");
  expect(page.url()).toContain("/roles/corporate-credit/board");
  for (const label of ["여신 검토 보드", "서류 누락 확인", "승인 품의함", "재무자료 요약", "상환능력 체크", "정책금융 후보", "고객 회신 초안"]) {
    await expect(page.locator("#nav-list")).toContainText(label);
  }
  for (const column of ["신규 접수", "자료 수집", "AI 검토", "담당자 검토 필요", "품의 진행", "완료·보류"]) {
    await expect(page.locator(".jpo-board")).toContainText(column);
  }
  const hero = page.locator('[data-board-column="aiReview"] .jpo-card', { hasText: "CCL-0001" });
  await expect(hero).toContainText("BIZ-REF-0001");
  await expect(hero).toContainText("전북 전주 · 카페");
  await expect(page.locator("#page-content")).not.toContainText("CCL-OTHER-0001");
  await saveShot(page, "console-ccl-board.png");

  await page.locator("[data-ccl-back]").click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB 금융안전 업무지원 포털");
});

test("기업여신: 접수 → 기록 체인 + scope/count parity + 훅 차단", async ({ page }) => {
  await page.goto("/index.html#/roles/corporate-credit/cases/new");
  await page.locator('input[name="title"]').fill("전주 카페 2호점 운전자금 검토");
  await page.locator('select[name="riskLevel"]').selectOption("high");
  await page.locator('#ccl-new-case-form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/roles\/corporate-credit\/cases\/CCL-\d+/);
  const newId = decodeURIComponent(page.url().split("/").pop());
  await expect(page.locator(".jbwc-detail-panel")).toContainText(newId);

  const created = await page.evaluate(([key, id]) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    const item = db.ccl_cases.find((c) => c.id === id);
    const counts = getCorporateCreditSidebarCounts();
    let scopeError = null;
    try { cclTable("ccl_cases"); } catch (error) { scopeError = error.message; }
    return {
      status: item.status, requiresHumanReview: item.requiresHumanReview,
      doc: db.ccl_doc_checks.some((x) => x.caseId === id),
      audit: db.ccl_audit_logs.some((x) => x.action === "CASE_CREATED" && x.targetId === id),
      run: db.ccl_agent_runs.find((x) => x.caseId === id),
      approval: db.approvals.some((x) => x.caseId === id && x.status === "pending"),
      scopeError,
      othersVisible: cclTable("ccl_cases", CCL_ROLE_KEY).some((c) => c.id === "CCL-OTHER-0001"),
      boardCount: counts.board,
      dbActive: db.ccl_cases.filter((c) => c.roleKey === "corporate-credit" && ["received", "collecting", "aiReview", "humanReview", "memoDraft"].includes(c.status)).length,
    };
  }, ["ccl-ops-db-v1", newId]);
  expect(created.status).toBe("humanReview");
  expect(created.requiresHumanReview).toBe(true);
  expect(created.doc && created.audit && created.approval).toBe(true);
  expect(["completed", "closed"]).not.toContain(created.run.status);
  expect(created.scopeError).toContain("role scope is required");
  expect(created.othersVisible).toBe(false);
  expect(created.boardCount).toBe(created.dbActive);

  // PII 훅: 실명·전화 포함 접수 차단
  await page.goto("/index.html#/roles/corporate-credit/cases/new");
  await page.locator('input[name="segment"]').fill("문의 010-9876-5432");
  await page.locator('#ccl-new-case-form button[type="submit"]').click();
  await expect(page.getByRole("status")).toContainText("접수 차단(보안 훅)");
  const blocked = await page.evaluate((key) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    return { leaked: db.ccl_cases.some((c) => String(c.segment).includes("010-9876")), audit: db.ccl_audit_logs.some((a) => a.action === "CCL_HOOK_BLOCKED_CASE_CREATE") };
  }, "ccl-ops-db-v1");
  expect(blocked.leaked).toBe(false);
  expect(blocked.audit).toBe(true);
});

test("기업여신: 하네스 표면/내부 분리·회신 초안 승인 대기·사람 승인·selfTest", async ({ page }) => {
  await page.goto("/index.html#/roles/corporate-credit/agent-harness");
  await expect(page.locator("#page-content")).toContainText("기업여신 심사지원 하네스 — 전용 라우팅");
  await expect(page.locator("#page-content")).toContainText("표면 에이전트 (5)");
  await expect(page.locator("#page-content")).toContainText("내부 전문 조직 (3)");

  await page.getByRole("button", { name: /회신 초안을 만들어줘/ }).click();
  await expect(page.locator("#page-content")).toContainText("승인 대기");
  const state = await page.evaluate((key) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    return {
      run: db.ccl_agent_runs.find((r) => r.agentId === "ccl-reply"),
      approval: db.approvals.find((a) => a.approvalType === "고객 회신 발송 승인" && a.status === "pending"),
    };
  }, "ccl-ops-db-v1");
  expect(state.run.status).toBe("pendingApproval");
  expect(state.approval).toBeTruthy();

  await page.goto("/index.html#/roles/corporate-credit/approval-drafts");
  const pendingBefore = await page.evaluate(() => getCorporateCreditSidebarCounts().approvals);
  await page.locator("[data-ccl-approve]").first().click();
  await expect(page.getByRole("status")).toContainText("승인 완료 (사람 결정)");
  const pendingAfter = await page.evaluate(() => getCorporateCreditSidebarCounts().approvals);
  expect(pendingAfter).toBe(pendingBefore - 1);

  const selfTest = await page.evaluate(() => runHarnessSelfTest("corporate-credit"));
  expect(selfTest.pass, JSON.stringify(selfTest.results.filter((r) => !r.ok), null, 2)).toBe(true);
});

test("FDS: 레일 진입 → 전용 콘솔·보드·고령 카드·복귀", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator('[data-rail-toggle="role"]').click();
  await page.locator('[data-role-filter="보이스피싱/FDS 담당자"]').click();

  await expect(page.locator(".sidebar-brand")).toContainText("FDS·보이스피싱 대응 포털");
  expect(page.url()).toContain("/roles/fds-response/board");
  for (const label of ["경보 대응 보드", "차단·보류 검토함", "이상거래 신호", "고령·취약 고객 조기경보", "고객 확인 스크립트", "지급정지 절차 안내"]) {
    await expect(page.locator("#nav-list")).toContainText(label);
  }
  for (const column of ["신규 경보", "신호 분석", "담당자 검토 필요", "고객 확인 중", "차단·보류 결정 대기", "종결(사람)"]) {
    await expect(page.locator(".jpo-board")).toContainText(column);
  }
  const hero = page.locator('[data-board-column="humanReview"] .jpo-card', { hasText: "FDSC-0001" });
  await expect(hero).toContainText("CUST-FD-0001");
  await expect(hero).toContainText("고령·취약");
  await expect(hero).toContainText("고액 이체");
  await expect(page.locator('[data-board-column="closedByHuman"]')).toContainText("FDSC-0005");
  await expect(page.locator("#page-content")).not.toContainText("FDSC-OTHER-0001");
  await saveShot(page, "console-fdr-board.png");

  await page.locator("[data-fdr-back]").click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB 금융안전 업무지원 포털");
});

test("FDS: 고령 경보 접수 → human review 체인 + 자동 종결 금지 + 사람 종결", async ({ page }) => {
  await page.goto("/index.html#/roles/fds-response/cases/new");
  await page.locator('select[name="alertType"]').selectOption("elderRisk");
  await page.locator('input[name="elderFlag"]').check();
  await page.locator('select[name="riskLevel"]').selectOption("high");
  await page.locator('#fdr-new-case-form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/roles\/fds-response\/cases\/FDSC-\d+/);
  const newId = decodeURIComponent(page.url().split("/").pop());

  const created = await page.evaluate(([key, id]) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    const item = db.fdr_cases.find((c) => c.id === id);
    return {
      status: item.status, elderFlag: item.elderFlag,
      signal: db.fdr_signals.some((x) => x.caseId === id && x.signalType === "ELDERLY_CUSTOMER"),
      audit: db.fdr_audit_logs.some((x) => x.action === "ALERT_RECEIVED" && x.targetId === id),
      approval: db.approvals.some((x) => x.caseId === id && x.status === "pending"),
      elderHandoff: db.agent_handoffs.some((x) => x.caseId === id && x.toAgentId === "fdr-elder"),
    };
  }, ["fdr-ops-db-v1", newId]);
  expect(created.status).toBe("humanReview");
  expect(created.elderFlag && created.signal && created.audit && created.approval && created.elderHandoff).toBe(true);

  // 자동 종결 금지: high 완료 시도 → needsReview 강등
  const demoted = await page.evaluate(() => recordFdsResponseAgentRun({ agentId: "fdr-signal", inputSummary: "자동 종결 시도 검증", outputSummary: "완료 처리 시도", status: "completed", riskLevel: "high" }).status);
  expect(demoted).toBe("needsReview");

  // 사람 종결: closedByHuman은 USR-만 가능
  const closeGuard = await page.evaluate((id) => {
    const byAgent = fdrCloseCaseByHuman(id, "fdr-supervisor");
    const byHuman = fdrCloseCaseByHuman(id, "USR-FDR-SUP-01");
    const db = JSON.parse(window.localStorage.getItem("fdr-ops-db-v1"));
    return { byAgentBlocked: byAgent.blocked === true, status: byHuman.case.status, audit: db.fdr_audit_logs.some((a) => a.action === "CASE_CLOSED_BY_HUMAN" && a.targetId === id) };
  }, newId);
  expect(closeGuard.byAgentBlocked).toBe(true);
  expect(closeGuard.status).toBe("closedByHuman");
  expect(closeGuard.audit).toBe(true);
});

test("FDS: 스크립트 승인 대기 + selfTest + route 유지", async ({ page }) => {
  await page.goto("/index.html#/roles/fds-response/agent-harness");
  await page.getByRole("button", { name: /고객 확인 스크립트 초안/ }).click();
  await expect(page.locator("#page-content")).toContainText("승인 대기");
  const state = await page.evaluate((key) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    return { run: db.fdr_agent_runs.find((r) => r.agentId === "fdr-contact" && r.inputSummary.includes("스크립트 초안을")), approval: db.approvals.filter((a) => a.approvalType === "고객 확인 스크립트 사용 승인" && a.status === "pending").length };
  }, "fdr-ops-db-v1");
  expect(state.run.status).toBe("pendingApproval");
  expect(state.approval).toBeGreaterThanOrEqual(1);

  const selfTest = await page.evaluate(() => runHarnessSelfTest("fds-response"));
  expect(selfTest.pass, JSON.stringify(selfTest.results.filter((r) => !r.ok), null, 2)).toBe(true);

  for (const [route, marker] of [["/roles/fds-response/block-review", "차단·보류 검토함"], ["/roles/corporate-credit/approval-drafts", "품의 초안"]]) {
    await page.goto(`/index.html#${route}`);
    await expect(page.locator("#page-content")).toContainText(marker);
    await page.reload();
    await expect(page.locator("#page-content")).toContainText(marker);
    expect(page.url()).toContain(route);
  }
});

test("메인 대시보드 링크·역할 전환 체인·모바일", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator("#page-content")).toContainText("실동작 콘솔 · 에이전트 8");
  // 역할 전환 체인: 기업여신 → FDS → 전세보호 → 메인 (사이드바 점유 중재)
  await page.goto("/index.html#/roles/corporate-credit/board");
  await expect(page.locator(".sidebar-brand")).toContainText("기업여신 심사지원 포털");
  await page.goto("/index.html#/roles/fds-response/board");
  await expect(page.locator(".sidebar-brand")).toContainText("FDS·보이스피싱 대응 포털");
  await page.goto("/index.html#/roles/jeonse-protection/board");
  await expect(page.locator(".sidebar-brand")).toContainText("전세사기 보호 업무지원 포털");
  await page.locator("[data-jpo-back]").click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB 금융안전 업무지원 포털");

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/roles/corporate-credit/board", "/roles/fds-response/board"]) {
    await page.goto(`/index.html#${route}`);
    await expect(page.locator("#page-content")).not.toBeEmpty();
    const overflow = await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - window.innerWidth);
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
  await saveShot(page, "console-fdr-mobile.png");
});
