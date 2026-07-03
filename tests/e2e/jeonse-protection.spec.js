/* 전세사기 보호 담당자 역할 하네스 — 제품 수준 검증 스위트.
   범위: 역할 진입/사이드바 점유, route persistence, role scope 격리, PII 검색 차단,
   업무유형별 생성 기록, 하네스 실행/승인/에스컬레이션 규칙, 3-모드 사이드바 무결성, 반응형. */

const { expect, test } = require("@playwright/test");
const fs = require("node:fs");

const screenshotDirs = ["test-results/screenshots", "tests/results/screenshots"];

async function saveShot(page, name) {
  for (const dir of screenshotDirs) {
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: `${dir}/${name}`, fullPage: true });
  }
}

const JPO_DB_KEY = "jpo-ops-db-v1";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.removeItem("jb-localguard-os-state-v2"));
  await page.addInitScript(() => window.localStorage.removeItem("jb-finance-support-state-v4"));
  await page.addInitScript(() => window.localStorage.removeItem("jbwc-ops-db-v3"));
  await page.addInitScript(() => window.localStorage.removeItem("jpo-ops-db-v1"));
});

async function createJpoCaseViaWizard(page, { taskType, title, riskLevel, signal }) {
  await page.goto("/index.html#/roles/jeonse-protection/cases/new");
  await expect(page.locator("#jpo-new-case-form")).toBeVisible();
  await page.locator("#jpo-case-taskType").selectOption(taskType);
  await expect(page.locator("#jpo-new-case-form")).toBeVisible();
  await page.locator('#jpo-new-case-form input[name="title"]').fill(title);
  if (riskLevel) await page.locator('#jpo-new-case-form select[name="riskLevel"]').selectOption(riskLevel);
  if (signal) await page.locator(`#jpo-new-case-form input[name="riskSignals"][value="${signal}"]`).check();
  await page.locator('#jpo-new-case-form button[type="submit"]').click();
  await expect(page.locator(".jbwc-detail-panel")).toContainText(title);
  return page.evaluate(([key, caseTitle]) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    const created = db.jeonse_cases.find((item) => item.title === caseTitle);
    return {
      created,
      tasks: db.jeonse_tasks.filter((item) => item.caseId === created?.id),
      audits: db.audit_logs.filter((item) => item.targetId === created?.id),
      runs: db.agent_runs.filter((item) => item.caseId === created?.id),
      approvals: db.approvals.filter((item) => item.caseId === created?.id),
      analysis: db.ai_analysis_requests.filter((item) => item.caseId === created?.id),
      victimReviews: db.jeonse_victim_support_reviews.filter((item) => item.caseId === created?.id),
      guaranteeReviews: db.jeonse_guarantee_reviews.filter((item) => item.caseId === created?.id),
      alerts: db.jeonse_alerts.filter((item) => item.caseId === created?.id),
      registryChecks: db.jeonse_registry_checks.filter((item) => item.caseId === created?.id),
    };
  }, [JPO_DB_KEY, title]);
}

test("역할 레일에서 전세보호 담당자 클릭 시 전용 하네스로 진입하고 복귀할 수 있다", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator('[data-rail-toggle="role"]').click();
  await page.locator('[data-role-filter="전세보호 담당자"]').click();

  await expect(page.locator("#page-content").getByRole("heading", { name: "전세사기 보호 담당자 하네스" })).toBeVisible();
  await expect(page.locator(".sidebar-brand")).toContainText("전세사기 보호 업무지원 하네스");
  await expect(page.locator(".sidebar-brand")).toContainText("계약 전 위험 신호·피해자 지원·담당자 검토를 돕는 AI 운영지원");
  await expect(page.locator("#new-case-button")).toContainText("신규 전세보호 건 접수");
  await expect(page.locator("#sidebar-search")).toHaveAttribute("placeholder", /임대차 계약, 피해자 Ref/);
  await expect(page.locator('[data-role-filter="전세보호 담당자"]')).toHaveClass(/is-active/);
  expect(page.url()).toContain("/roles/jeonse-protection");

  await expect(page.locator("#nav-list")).toContainText("계약 전 위험 점검");
  await expect(page.locator("#nav-list")).toContainText("보증보험·HUG 연계");
  await expect(page.locator("#nav-list")).toContainText("피해자 결정 신청 보조");
  await expect(page.locator("#nav-list")).toContainText("취약고객 보호");
  await expect(page.locator("#nav-list")).not.toContainText("전세 안심 점검");

  await page.locator("[data-jpo-back]").click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB 금융안전 업무지원 포털");
  await expect(page.locator('[data-role-filter="전세보호 담당자"]')).not.toHaveClass(/is-active/);
});

test("전세보호 route가 새로고침 후에도 유지된다 (route persistence)", async ({ page }) => {
  const routes = [
    ["/roles/jeonse-protection/board", "전세사기 보호 담당자 하네스"],
    ["/roles/jeonse-protection/guarantee-hug", "보증보험·HUG 연계 검토"],
    ["/roles/jeonse-protection/victim-decision", "피해자 결정 신청 보조"],
    ["/roles/jeonse-protection/auction-support", "경공매·피해지원 큐"],
    ["/roles/jeonse-protection/agent-harness", "전세사기 보호 업무지원 하네스 — 전용 라우팅"],
  ];
  for (const [route, marker] of routes) {
    await page.goto(`/index.html#${route}`);
    await expect(page.locator("#page-content")).toContainText(marker);
    await page.reload();
    await expect(page.locator("#page-content")).toContainText(marker);
    await expect(page.locator(".sidebar-brand")).toContainText("전세사기 보호 업무지원 하네스");
    await expect(page.locator(".jbwc-breadcrumb")).toContainText("전세사기 보호 담당자 하네스");
    expect(page.url()).toContain(route);
  }

  await page.goto("/index.html#/roles/jeonse-protection/cases/new");
  await expect(page.locator("#jpo-new-case-form")).toBeVisible();
  await page.reload();
  await expect(page.locator("#jpo-new-case-form")).toBeVisible();

  await page.goto("/index.html#/roles/jeonse-protection/cases/JEONSE-CASE-0003");
  await expect(page.locator(".jbwc-detail-panel")).toContainText("JEONSE-CASE-0003");
  await page.reload();
  await expect(page.locator(".jbwc-detail-panel")).toContainText("JEONSE-CASE-0003");
});

test("모든 count/검색은 role scope query에서 나오고 타 역할 seed는 절대 노출되지 않는다", async ({ page }) => {
  await page.goto("/index.html#/roles/jeonse-protection/cases");
  await page.waitForFunction(() => typeof getJeonseProtectionSidebarCounts === "function");

  const scope = await page.evaluate((key) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    const other = db.jeonse_cases.filter((c) => c.roleKey !== "jeonse-protection-officer");
    let scopeError = null;
    try { jpoTable("jeonse_cases"); } catch (error) { scopeError = error.message; }
    const counts = getJeonseProtectionSidebarCounts();
    const mine = (table) => (db[table] || []).filter((row) => row.roleKey === "jeonse-protection-officer");
    return {
      rawCases: db.jeonse_cases.length,
      otherCases: other.length,
      otherIds: other.map((c) => c.id),
      scopedIds: jpoTable("jeonse_cases", JPO_ROLE_KEY).map((c) => c.id),
      scopeError,
      counts,
      expected: {
        approvals: mine("approvals").filter((x) => x.status === "pending").length,
        auditLogs: mine("audit_logs").filter((x) => x.reviewRequired === true).length,
        guaranteeHug: mine("jeonse_guarantee_reviews").filter((x) => ["open", "needsReview"].includes(x.status)).length,
        victimDecision: mine("jeonse_victim_support_reviews").filter((x) => ["open", "needsReview"].includes(x.status)).length,
        urgentAlerts: mine("jeonse_alerts").filter((x) => ["high", "critical"].includes(x.severity) && x.status !== "resolved").length,
        auctionSupport: mine("jeonse_referrals").filter((x) => x.category === "auction" && ["pending", "open"].includes(x.status)).length,
        vulnerableTenants: mine("jeonse_risk_assessments").filter((x) => x.kind === "vulnerableTenant" && ["open", "inReview"].includes(x.status)).length,
      },
      searchHits: searchJeonseProtectionRecords("타 역할 스코프").length,
    };
  }, JPO_DB_KEY);

  expect(scope.otherCases).toBeGreaterThan(0);
  for (const id of scope.otherIds) expect(scope.scopedIds).not.toContain(id);
  expect(scope.scopeError).toContain("role scope is required");
  expect(scope.searchHits).toBe(0);
  for (const [key, value] of Object.entries(scope.expected)) {
    expect(scope.counts[key], `count key: ${key}`).toBe(value);
  }
  await expect(page.locator("#page-content")).not.toContainText("JEONSE-OTHER-0001");

  await page.locator("#sidebar-search").fill("JEONSE-OTHER");
  await expect(page.locator("#jpo-search-results")).toContainText("결과 없음");
  await page.locator("#sidebar-search").fill("TENANT-REF-0001");
  await expect(page.locator("#jpo-search-results .jbwc-search-hit").first()).toContainText("JEONSE-CASE-0001");
  await page.locator("#jpo-search-results .jbwc-search-hit").first().click();
  await expect(page.locator(".jbwc-detail-panel")).toContainText("JEONSE-CASE-0001");
  await expect(page).toHaveURL(/\/roles\/jeonse-protection\/cases\/JEONSE-CASE-0001/);
});

test("개인정보 원문 패턴 검색은 차단되고 화면/DB에 개인정보 원문이 없다", async ({ page }) => {
  await page.goto("/index.html#/roles/jeonse-protection/board");
  await page.locator("#sidebar-search").fill("901231-1234567");
  await expect(page.locator("#jpo-search-results")).toContainText("개인정보 원문 검색 차단");
  await page.locator("#sidebar-search").fill("010-1234-5678");
  await expect(page.locator("#jpo-search-results")).toContainText("개인정보 원문 검색 차단");

  const piiScan = await page.evaluate((key) => {
    const raw = window.localStorage.getItem(key) || "";
    return {
      jumin: /\d{6}-[1-4]\d{6}/.test(raw),
      phone: /01[016789]-\d{3,4}-\d{4}/.test(raw),
      refOnly: raw.includes("TENANT-REF-") && raw.includes("ADDRESS-REF-"),
    };
  }, JPO_DB_KEY);
  expect(piiScan.jumin).toBe(false);
  expect(piiScan.phone).toBe(false);
  expect(piiScan.refOnly).toBe(true);
});

test("피해자 결정 보조 케이스 생성 시 검토·승인·감사가 모두 기록된다", async ({ page }) => {
  const state = await createJpoCaseViaWizard(page, {
    taskType: "victimDecision",
    title: "E2E 피해자 결정 보조 생성 검증",
  });
  expect(state.created.roleKey).toBe("jeonse-protection-officer");
  expect(state.created.status).toBe("pendingVictimReview");
  expect(state.created.requiresHumanReview).toBe(true);
  expect(state.victimReviews.length).toBe(1);
  expect(state.victimReviews[0].requiresHumanReview).toBe(true);
  expect(state.approvals.some((x) => x.approvalType === "피해자 결정 검토 승인" && x.status === "pending")).toBe(true);
  expect(state.audits.some((x) => x.action === "JPO_CASE_CREATED")).toBe(true);
  expect(state.analysis.length).toBe(1);
  expect(state.runs.length).toBeGreaterThanOrEqual(1);
  expect(state.runs[0].status).not.toBe("completed");
});

test("보증보험/HUG 케이스 생성 시 guarantee review와 사람 검토가 기록된다", async ({ page }) => {
  const state = await createJpoCaseViaWizard(page, {
    taskType: "guaranteeHug",
    title: "E2E 보증 HUG 생성 검증",
    signal: "guaranteeUncertain",
  });
  expect(state.created.status).toBe("pendingGuaranteeReview");
  expect(state.created.requiresHumanReview).toBe(true);
  expect(state.guaranteeReviews.length).toBe(1);
  expect(state.guaranteeReviews[0].requiresHumanReview).toBe(true);
  expect(state.approvals.some((x) => x.approvalType === "보증 연계 검토 승인")).toBe(true);
});

test("긴급 위험 알림 생성(critical) 시 알림·에스컬레이션이 기록되고 자동 종결되지 않는다", async ({ page }) => {
  const state = await createJpoCaseViaWizard(page, {
    taskType: "urgentAlert",
    title: "E2E 긴급 위험 알림 검증",
    riskLevel: "critical",
    signal: "auctionRisk",
  });
  expect(state.created.status).toBe("escalated");
  expect(state.created.requiresHumanReview).toBe(true);
  expect(state.alerts.length).toBeGreaterThanOrEqual(1);
  expect(state.alerts[0].severity).toBe("critical");
  expect(state.alerts[0].requiresHumanEscalation).toBe(true);
  expect(state.runs[0].requiresHumanEscalation).toBe(true);
  expect(["completed", "closed"]).not.toContain(state.runs[0].status);
});

test("하네스 샘플: 경공매 고위험 에스컬레이션과 안내문 승인 대기, 고위험 자동 종결 금지", async ({ page }) => {
  await page.goto("/index.html#/roles/jeonse-protection/agent-harness");
  await expect(page.locator("#page-content")).toContainText("전세사기 보호 업무지원 하네스 — 전용 라우팅");

  await page.getByRole("button", { name: /경매가 개시됐다는 문의가 접수됐어/ }).click();
  await expect(page.locator("#page-content")).toContainText("사람 검토 대기");
  const auction = await page.evaluate((key) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    return {
      lastRun: db.agent_runs[0],
      escalatedHandoff: db.agent_handoffs.find((h) => h.toAgentId === "jpo-auction" && h.status === "escalated"),
      auditHandoff: db.agent_handoffs.find((h) => h.toAgentId === "jpo-audit"),
    };
  }, JPO_DB_KEY);
  expect(auction.lastRun.agentId).toBe("jpo-auction");
  expect(auction.lastRun.requiresHumanEscalation).toBe(true);
  expect(auction.lastRun.status).toBe("needsReview");
  expect(auction.escalatedHandoff).toBeTruthy();
  expect(auction.auditHandoff).toBeTruthy();

  const approvalsBefore = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key)).approvals.filter((x) => x.status === "pending").length, JPO_DB_KEY);
  await page.getByRole("button", { name: /안내 문자 초안을 만들어줘/ }).click();
  await expect(page.locator("#page-content")).toContainText("발송 승인 대기");
  const comms = await page.evaluate((key) => {
    const db = JSON.parse(window.localStorage.getItem(key));
    return {
      lastRun: db.agent_runs[0],
      pendingApprovals: db.approvals.filter((x) => x.status === "pending").length,
      noticeApproval: db.approvals.find((x) => x.approvalType === "고객 안내문 발송 승인" && x.status === "pending"),
      highOrCritical: db.agent_runs.filter((run) => ["high", "critical"].includes(run.riskLevel)).map((run) => run.status),
    };
  }, JPO_DB_KEY);
  expect(comms.lastRun.agentId).toBe("jpo-comms");
  expect(comms.lastRun.status).toBe("pendingApproval");
  expect(comms.noticeApproval).toBeTruthy();
  expect(comms.pendingApprovals).toBeGreaterThan(approvalsBefore);
  for (const status of comms.highOrCritical) {
    expect(["completed", "closed"]).not.toContain(status);
  }
});

test("빈 상태/상세 미존재/사이드바 3-모드 전환이 안전하다", async ({ page }) => {
  await page.goto("/index.html#/roles/jeonse-protection/cases");
  const filterInput = page.locator("[data-jpo-list-filter]").first();
  await filterInput.fill("존재하지않는필터검색어");
  await filterInput.press("Enter");
  await expect(page.locator(".jbwc-empty")).toContainText("필터 조건에 맞는 데이터가 없습니다.");

  await page.goto("/index.html#/roles/jeonse-protection/cases/JEONSE-CASE-9999");
  await expect(page.locator(".jbwc-detail-panel")).toContainText("상세 데이터를 찾을 수 없습니다");

  await page.goto("/index.html");
  await expect(page.locator(".sidebar-brand")).toContainText("JB 금융안전 업무지원 포털");
  await page.locator('[data-rail-toggle="affiliate"]').click();
  await page.locator('[data-affiliate="JB우리캐피탈"]').click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB우리캐피탈 운영지원 포털");
  await page.locator('[data-rail-toggle="role"]').click();
  await page.locator('[data-role-filter="전세보호 담당자"]').click();
  await expect(page.locator(".sidebar-brand")).toContainText("전세사기 보호 업무지원 하네스");
  await page.locator('[data-rail-toggle="affiliate"]').click();
  await page.locator('[data-affiliate="JB우리캐피탈"]').click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB우리캐피탈 운영지원 포털");
  await page.locator("[data-jbwc-back]").click();
  await expect(page.locator(".sidebar-brand")).toContainText("JB 금융안전 업무지원 포털");
});

test("전세보호 하네스 데스크톱/태블릿/모바일 스크린샷 스모크 (overflow 금지)", async ({ page }) => {
  const viewports = [
    ["desktop", { width: 1920, height: 1080 }],
    ["tablet", { width: 820, height: 1180 }],
    ["mobile", { width: 390, height: 844 }],
  ];
  const routes = [
    ["board", "/roles/jeonse-protection/board"],
    ["cases", "/roles/jeonse-protection/cases"],
    ["wizard", "/roles/jeonse-protection/cases/new"],
    ["victim", "/roles/jeonse-protection/victim-decision"],
    ["harness", "/roles/jeonse-protection/agent-harness"],
  ];
  for (const [vpName, viewport] of viewports) {
    await page.setViewportSize(viewport);
    for (const [routeName, route] of routes) {
      await page.goto(`/index.html#${route}`);
      await expect(page.locator("#page-content")).not.toBeEmpty();
      const overflow = await page.evaluate(() => (
        Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - window.innerWidth
      ));
      expect(overflow, `${routeName}@${vpName}`).toBeLessThanOrEqual(1);
      await saveShot(page, `jpo-${routeName}-${vpName}.png`);
    }
  }
});
