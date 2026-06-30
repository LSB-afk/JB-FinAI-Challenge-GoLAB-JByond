#!/usr/bin/env node
// 텔레메트리 파이프라인 자체검증 — SSoT(intake.csv) 로직 회귀 방지.
// 실행: node 08_본선/_system/automation/test-telemetry.mjs  (격리 temp 디렉터리에서만 동작, 실데이터 무관)
// 프레임워크 없음: node:assert 만. 깨지면 비0 종료.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HOOK = path.join(HERE, "session-telemetry.mjs");
const AGG_SRC = path.join(HERE, "../skills/telemetry-aggregator/aggregate.mjs");

function run(cwd, transcript, sessionId) {
  const payload = JSON.stringify({ transcript_path: transcript, cwd, session_id: sessionId });
  execFileSync(process.execPath, [HOOK], { input: payload, cwd, stdio: ["pipe", "ignore", "ignore"] });
}
function rows(intake) {
  return fs.readFileSync(intake, "utf8").trim().split("\n").slice(1);
}

const T = fs.mkdtempSync(path.join(os.tmpdir(), "tel-test-"));
try {
  const sysDir = path.join(T, "08_본선/_system");
  fs.mkdirSync(path.join(sysDir, "telemetry"), { recursive: true });
  fs.mkdirSync(path.join(sysDir, "skills/telemetry-aggregator"), { recursive: true });
  fs.mkdirSync(path.join(sysDir, "agents"), { recursive: true });
  fs.mkdirSync(path.join(sysDir, "team"), { recursive: true });
  fs.copyFileSync(AGG_SRC, path.join(sysDir, "skills/telemetry-aggregator/aggregate.mjs"));
  const intake = path.join(sysDir, "telemetry/ai-session-intake.csv");
  const tr = path.join(T, "tr.jsonl");

  // 수동 행(session_id 빈) 선주입 — upsert 가 보존해야 함
  fs.writeFileSync(intake,
    "ts,engine,agent,member_slot,domain,task,tokens_in,tokens_out,duration,tools,exact_or_estimate,prompt_ref,session_id\n" +
    "2026-06-30 09:00Z,chatgpt,gpt,D,research,수동행,—,—,—,deep-research,estimate,R1,\n");

  // 1) cache_read 제외 + codex 위임 캡처
  fs.writeFileSync(tr, [
    '{"timestamp":"2026-06-30T10:00:00Z","message":{"usage":{"input_tokens":100,"cache_creation_input_tokens":50,"cache_read_input_tokens":9000,"output_tokens":40},"content":[{"type":"tool_use","name":"Agent","input":{"subagent_type":"codex:codex-rescue"}}]}}',
    '{"timestamp":"2026-06-30T10:10:00Z","message":{"usage":{"input_tokens":200,"output_tokens":60},"content":[{"type":"tool_use","name":"Bash"}]}}',
  ].join("\n"));
  run(T, tr, "S1");
  let r = rows(intake);
  const s1 = r.find(x => x.endsWith(",S1"));
  assert(s1, "S1 claude 행 생성");
  assert(s1.includes(",350,100,"), `cache_read 제외(350=100+50+200): ${s1}`);
  assert(r.some(x => x.endsWith(",S1#codex")), "codex 위임 별도 행 생성");
  assert(r.some(x => x.endsWith(",R1,")), "수동행 보존(빈 session_id)");

  // 2) 같은 세션 재실행(누적 증가) → 행 수 불변(upsert), 값 갱신
  fs.writeFileSync(tr, [
    '{"timestamp":"2026-06-30T10:00:00Z","message":{"usage":{"input_tokens":500,"cache_creation_input_tokens":100,"output_tokens":300},"content":[{"type":"tool_use","name":"Agent","input":{"subagent_type":"codex:codex-rescue"}}]}}',
  ].join("\n"));
  const before = rows(intake).length;
  run(T, tr, "S1");
  r = rows(intake);
  assert.strictEqual(r.length, before, `재실행 시 행 수 불변(upsert): ${before}→${r.length}`);
  assert(r.find(x => x.endsWith(",S1")).includes(",600,300,"), "값 최신화(600/300)");

  // 3) 다른 세션 → 행 추가
  run(T, tr, "S2");
  assert(rows(intake).some(x => x.endsWith(",S2")), "새 세션 행 추가");

  // 4) aggregator 합산이 누적으로 부풀지 않음 (S1=600, S2=600 → 1200, 합산 중복 없음)
  execFileSync(process.execPath, [path.join(sysDir, "skills/telemetry-aggregator/aggregate.mjs")], { cwd: T, stdio: "ignore" });
  const usage = fs.readFileSync(path.join(sysDir, "telemetry/ai-usage-stats.md"), "utf8");
  const m = usage.match(/총 입력 토큰: \*\*([\d,]+)\*\*/);
  assert(m, "ai-usage-stats 총 입력 토큰 존재");
  assert.strictEqual(m[1].replace(/,/g, ""), "1200", `합산 정확(1200, 부풀림 없음): ${m[1]}`);

  console.log("✅ telemetry self-check 통과 (upsert·cache_read 제외·codex 캡처·수동행 보존·합산 정확)");
} finally {
  fs.rmSync(T, { recursive: true, force: true });
}
