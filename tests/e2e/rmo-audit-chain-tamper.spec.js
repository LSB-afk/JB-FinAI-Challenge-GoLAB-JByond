/* RM 감사 해시체인 + 보안 패널 — 패널 렌더 + 위·변조 검출 실증. 임시 검증 스펙. */
const { expect, test } = require("@playwright/test");

const RMO_DB_KEY = "rmo-ops-db-v2";

test("보안 패널 렌더 + 감사 체인 tamper 검출", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.addInitScript(() => window.localStorage.removeItem("rmo-ops-db-v2"));
  await page.goto("/index.html");
  await page.locator('[data-rail-toggle="role"]').click();
  await page.locator('[data-role-filter="RM"]').click();
  await expect(page).toHaveURL(/\/roles\/rm-officer\/board/);

  // 보안 패널 렌더 + 셀프테스트 PASS + 체인 ✓
  await expect(page.locator("#rmo-sec-panel")).toBeVisible();
  await expect(page.locator("#rmo-sec-selftest")).toContainText("PASS");
  await expect(page.locator("#rmo-sec-guards .jbwc-row")).toHaveCount(6); // head + 5 guards
  await expect(page.locator("#rmo-sec-chain-result")).toContainText("무결성 검증");

  // 감사 행이 실제로 체인되었는지 + verify ok
  const before = await page.evaluate(() => {
    // 승인 결정을 1건 유발해 감사 행을 확실히 생성
    const pend = (typeof rmoTable === "function") && rmoTable("rm_officer_approvals", "rm-officer").find((a) => a.status === "pending");
    if (pend && typeof rmoDecideApproval === "function") rmoDecideApproval(pend.id, "approve", "USR-RMO-01");
    return { verify: rmoAuditChainVerify(), chained: rmoTable("rm_officer_audit_logs", "rm-officer").filter((r) => typeof r.chainSeq === "number").length };
  });
  expect(before.verify.ok).toBe(true);
  expect(before.chained).toBeGreaterThan(0);

  // TAMPER: localStorage에서 체인된 행의 note를 직접 편집 후 재검증 → ok:false
  const tampered = await page.evaluate(() => {
    const db = JSON.parse(window.localStorage.getItem("rmo-ops-db-v2"));
    const rows = db.rm_officer_audit_logs.filter((r) => typeof r.chainSeq === "number").sort((a, b) => a.chainSeq - b.chainSeq);
    const victim = rows[Math.floor(rows.length / 2)];
    const seq = victim.chainSeq;
    victim.note = (victim.note || "") + " [변조됨]";
    window.localStorage.setItem("rmo-ops-db-v2", JSON.stringify(db));
    if (typeof rmoDbCache !== "undefined") rmoDbCache = null; // 캐시 무효화 → localStorage 재로드
    const v = rmoAuditChainVerify();
    return { v, seq };
  });
  expect(tampered.v.ok).toBe(false);
  expect(tampered.v.firstBreakAt).toBe(tampered.seq);

  // 복원: 변조 제거 후 다시 ok
  const restored = await page.evaluate(() => {
    const db = JSON.parse(window.localStorage.getItem("rmo-ops-db-v2"));
    db.rm_officer_audit_logs.forEach((r) => { if (r.note) r.note = r.note.replace(" [변조됨]", ""); });
    window.localStorage.setItem("rmo-ops-db-v2", JSON.stringify(db));
    if (typeof rmoDbCache !== "undefined") rmoDbCache = null;
    return rmoAuditChainVerify();
  });
  expect(restored.ok).toBe(true);

  expect(errors).toEqual([]);
});
