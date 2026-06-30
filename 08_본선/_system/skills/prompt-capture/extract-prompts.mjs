#!/usr/bin/env node
// extract-prompts.mjs — 현재(또는 지정) 세션 트랜스크립트에서 "사용자가 실제로 타이핑한 프롬프트"만 시간순 추출.
// 분류(분기코드)·산출 요약은 AI 판단 → SKILL.md 참조. 이 스크립트는 결정론적 추출만 담당.
// 사용: node extract-prompts.mjs [transcript.jsonl]   (인자 없으면 이 프로젝트의 최신 .jsonl 자동 선택)
//       node extract-prompts.mjs --self-test
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ponytail: Claude Code 트랜스크립트 휴리스틱 — 명령/툴결과/시스템리마인더 래퍼를 제외하고 자연어 프롬프트만.
function extractFromLines(lines) {
  const out = [];
  for (const line of lines) {
    let e;
    try { e = JSON.parse(line); } catch { continue; }
    if (!e || e.type !== "user" || !e.message || e.message.role !== "user" || e.isMeta) continue;
    const c = e.message.content;
    let text = "";
    if (typeof c === "string") text = c;
    else if (Array.isArray(c)) {
      if (c.some(b => b && b.type === "tool_result")) continue;      // 툴 결과 턴 제외
      text = c.filter(b => b && b.type === "text").map(b => b.text).join("\n");
    }
    text = (text || "").trim();
    if (!text) continue;
    // 래퍼(슬래시커맨드 출력·로컬커맨드·시스템리마인더·caveat)만으로 된 턴 제외
    if (/^<(command-|local-command|system-reminder|bash-|user-|caveat)/i.test(text)) continue;
    out.push({ ts: e.timestamp || "", text });
  }
  return out;
}

function latestTranscript() {
  // 프로젝트 루트 = 이 파일에서 5단계 위 (prompt-capture→skills→_system→08_본선→ROOT)
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../../..");
  const dir = path.join(os.homedir(), ".claude", "projects", root.replace(/\//g, "-"));
  if (!fs.existsSync(dir)) throw new Error(`트랜스크립트 디렉토리 없음: ${dir}`);
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".jsonl"))
    .map(f => ({ f, m: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  if (!files.length) throw new Error(`*.jsonl 없음: ${dir}`);
  return path.join(dir, files[0].f);
}

if (process.argv.includes("--self-test")) {
  const sample = [
    JSON.stringify({ type: "user", message: { role: "user", content: "프롬프트들 잘 기록하라." } }),
    JSON.stringify({ type: "user", message: { role: "user", content: [{ type: "tool_result", content: "x" }] } }),
    JSON.stringify({ type: "user", message: { role: "user", content: "<command-name>/init</command-name>" } }),
    JSON.stringify({ type: "user", message: { role: "user", content: [{ type: "text", text: "스킬화해줘" }] } }),
    JSON.stringify({ type: "assistant", message: { role: "assistant", content: "무시" } }),
  ];
  const got = extractFromLines(sample).map(p => p.text);
  const expect = ["프롬프트들 잘 기록하라.", "스킬화해줘"];
  if (JSON.stringify(got) !== JSON.stringify(expect)) {
    console.error("FAIL:", got); process.exit(1);
  }
  console.log("self-test OK"); process.exit(0);
}

const target = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : latestTranscript();
const lines = fs.readFileSync(target, "utf8").split("\n").filter(Boolean);
const prompts = extractFromLines(lines);
console.log(`# 추출 출처: ${target}\n# 사용자 프롬프트 ${prompts.length}건 (시간순)\n`);
prompts.forEach((p, i) => console.log(`[${i + 1}] ${p.ts}\n${p.text}\n`));
