#!/usr/bin/env node
// boot.mjs — 새 세션 오리엔테이션용 컴팩트 스냅샷. 큰 로그를 다 읽지 않고 "지금 상태"만 출력.
// 사용: node 08_본선/_system/skills/session-boot/boot.mjs   |   --self-test
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../../..");
const LOG = path.join(ROOT, "08_본선/04_증빙/01_핵심로그");

// 마지막 `### ` 블록만 추출(최근 1건)
function lastBlock(text) {
  const i = text.lastIndexOf("\n### ");
  if (i < 0) return "";
  return text.slice(i + 1).replace(/\n<!--[\s\S]*$/, "").trim();
}

function read(p) { try { return fs.readFileSync(p, "utf8"); } catch { return ""; } }
// 헤딩(re) 매칭 줄의 "다음 비어있지 않은 줄"을 반환(없으면 매칭 줄 자체)
function lineAfter(p, re) {
  const ls = read(p).split("\n");
  const i = ls.findIndex(l => re.test(l));
  if (i < 0) return "";
  for (let j = i + 1; j < ls.length; j++) if (ls[j].trim()) return ls[j].trim();
  return ls[i];
}

if (process.argv.includes("--self-test")) {
  const s = "### A\nx\n\n### B\ny\n\n<!-- 끝 -->";
  const got = lastBlock(s);
  if (got !== "### B\ny") { console.error("FAIL:", JSON.stringify(got)); process.exit(1); }
  console.log("self-test OK"); process.exit(0);
}

let git = "";
try {
  const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT }).toString().trim();
  const dirty = execSync("git status --short", { cwd: ROOT }).toString().split("\n").filter(Boolean).length;
  const last = execSync("git log --oneline -1", { cwd: ROOT }).toString().trim();
  git = `🌿 브랜치 ${branch} · 미커밋 ${dirty}파일 · HEAD ${last}`;
} catch { git = "🌿 git 정보 없음"; }

const phase = lineAfter(path.join(ROOT, "08_본선/PLAN.md"), /##\s*현재 페이즈/) || "(PLAN 현재 페이즈 줄 못 찾음)";

console.log(`
=== 본선 하네스 부팅 스냅샷 ===
${git}

📍 PLAN 페이즈: ${phase.replace(/^#+\s*/, "")}

🗒️ 마지막 세션(session-log):
${lastBlock(read(path.join(LOG, "session-log.md"))) || "(없음)"}

⚖️ 마지막 결정(decision-log):
${lastBlock(read(path.join(LOG, "decision-log.md"))) || "(없음)"}

🗺️ 진입점(읽기 순서): 본선 HOME → PLAN → PROGRESS → AGENTS §4-A(자동 스킬 규약) → _tools-index
🤖 자동 시행 스킬: 파일생성→canon-moc-sync · 세션종료/"프롬프트 기록"→prompt-capture · 새 도구→tool-intake · 회의STT→meeting-intake · 제품정의변경→submission-consistency-check · 보드영향→visualization-cycle (상세 AGENTS §4-A)
⛔ 게이트: 외부제출·공개푸시·고객대상=사람 승인 / SSOT=_canon·정본 / 링크측정=canon-moc-sync(직접 grep 금지)
`);
