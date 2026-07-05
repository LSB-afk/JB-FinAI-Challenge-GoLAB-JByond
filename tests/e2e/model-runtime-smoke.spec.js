/* RM 실 LLM 경로 스모크 — 프록시/게이트웨이 미기동(오프라인)에서도
   메모리 카드 증류 · 모델요청 폴백 · 엔진 경로 표시가 앱을 죽이지 않고 완주하는지 검증.
   네트워크 의존 없음(그게 요점: 오프라인 폴백). 단독 실행:
   npx playwright test tests/e2e/model-runtime-smoke.spec.js */

const { expect, test } = require("@playwright/test");

const RMO_DB_KEY = "rmo-ops-db-v2";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    ["jb-finance-support-state-v4", "jpo-ops-db-v2", "ccr-ops-db-v1",
      "rmo-ops-db-v1", "rmo-ops-db-v2", "jb-agent-model-settings-v1"]
      .forEach((k) => window.localStorage.removeItem(k));
  });
});

test("실 LLM 경로: 오프라인에서 메모리 카드 증류 + 모델요청 폴백 + 엔진 경로 표시", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(String(e && e.message || e)));

  // 진입: role rail → RM → 에이전트 하네스 뷰(샘플 버튼 + 메모리 패널이 함께 있는 뷰)
  await page.goto("/index.html");
  await page.locator('[data-rail-toggle="role"]').click();
  await page.locator('[data-role-filter="RM"]').click();
  await expect(page).toHaveURL(/\/roles\/rm-officer\/board/);
  await page.goto("/index.html#/roles/rm-officer/agent-harness");
  await expect(page.locator("#page-content")).toContainText("RM 업무지원 하네스 — loop routing");

  // 3. 메모리 패널의 엔진 경로 표시(#rmo-engine-path)가 렌더됨
  await expect(page.locator("#rmo-engine-path")).toHaveText(/.+/);

  // 1. 샘플 모의 실행(mock 경로) → rmo_memory_cards 테이블에 카드 생성
  await page.locator("[data-rmo-sample]").first().click();
  await page.waitForFunction((key) => {
    const db = JSON.parse(window.localStorage.getItem(key) || "{}");
    return (db.rmo_memory_cards || []).length >= 1;
  }, RMO_DB_KEY);

  // 2. 프록시/게이트웨이 미기동에서 로컬 모델 실행 → runAgentModelRequest가
  //    오프라인 폴백을 타고 needsReview 기록으로 graceful degrade(앱은 살아 있음).
  await page.locator("[data-rmo-ollama-sample]").first().click();
  await page.waitForFunction((key) => {
    const db = JSON.parse(window.localStorage.getItem(key) || "{}");
    return (db.rm_officer_agent_runs || [])
      .some((r) => r.runtime === "ollama" && r.status === "needsReview");
  }, RMO_DB_KEY);

  // 콘솔 PAGEERROR 0 — 오프라인 폴백이 미처리 예외로 앱을 깨뜨리지 않았다
  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
});
