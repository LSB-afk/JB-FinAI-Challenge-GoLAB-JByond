#!/usr/bin/env node
// Codex CLI telemetry backfill.
// Reads local Codex state metadata and writes project-scoped derived stats.
// Raw Codex DB remains local; generated CSV stores only bounded excerpts.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const projectDir = path.resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
const systemDir = path.join(projectDir, "08_본선/_system");
const telemetryDir = path.join(systemDir, "telemetry");
const codexDb = process.env.CODEX_STATE_DB || path.join(os.homedir(), ".codex/state_5.sqlite");
const writeMode = process.argv.includes("--write");
const jsonMode = process.argv.includes("--json");

const OUT = {
  csv: path.join(telemetryDir, "codex-cli-backfill.csv"),
  stats: path.join(telemetryDir, "codex-cli-usage-stats.md"),
};

function main() {
  if (!fs.existsSync(codexDb)) {
    fail(`Codex state DB not found: ${codexDb}`);
  }

  const rows = loadThreads();
  const summary = summarize(rows);
  const csv = renderCsv(rows);
  const md = renderMarkdown(rows, summary);

  if (writeMode) {
    fs.mkdirSync(telemetryDir, { recursive: true });
    atomicWrite(OUT.csv, csv);
    atomicWrite(OUT.stats, md);
  }

  if (jsonMode) {
    process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
  } else {
    process.stdout.write(renderConsole(summary, writeMode));
  }
}

function loadThreads() {
  const root = sqlQuote(projectDir);
  const query = `
    select
      id,
      created_at,
      updated_at,
      model_provider,
      coalesce(model, '') as model,
      coalesce(reasoning_effort, '') as reasoning_effort,
      tokens_used,
      cwd,
      coalesce(git_branch, '') as git_branch,
      coalesce(first_user_message, '') as first_user_message
    from threads
    where cwd = ${root} or cwd like ${sqlQuote(projectDir + "/%")}
    order by updated_at asc, id asc;
  `;

  const text = execFileSync("sqlite3", ["-json", codexDb, query], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 50 * 1024 * 1024,
  }).trim();
  if (!text) return [];
  return JSON.parse(text).map(row => ({
    thread_id: row.id,
    created_at_utc: epochToIso(row.created_at),
    updated_at_utc: epochToIso(row.updated_at),
    model_provider: row.model_provider || "openai",
    model: row.model || "unknown",
    reasoning_effort: row.reasoning_effort || "unknown",
    tokens_used: Number(row.tokens_used || 0),
    cwd: row.cwd || "",
    git_branch: row.git_branch || "",
    first_user_message_excerpt: excerpt(row.first_user_message || ""),
    source: "codex_state_sqlite",
  }));
}

function summarize(rows) {
  const totalTokens = rows.reduce((sum, r) => sum + r.tokens_used, 0);
  const byModel = group(rows, r => `${r.model_provider}/${r.model}/${r.reasoning_effort}`);
  const byDay = group(rows, r => r.updated_at_utc.slice(0, 10));
  const byBranch = group(rows, r => r.git_branch || "(none)");
  return {
    generated_at_utc: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    project_dir: projectDir,
    source_db: codexDb,
    threads: rows.length,
    tokens_used: totalTokens,
    by_model: tableFromGroup(byModel),
    by_day: tableFromGroup(byDay),
    by_branch: tableFromGroup(byBranch),
  };
}

function group(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    const cur = map.get(key) || { key, threads: 0, tokens_used: 0 };
    cur.threads += 1;
    cur.tokens_used += row.tokens_used;
    map.set(key, cur);
  }
  return map;
}

function tableFromGroup(map) {
  return [...map.values()].sort((a, b) => b.tokens_used - a.tokens_used || a.key.localeCompare(b.key));
}

function renderCsv(rows) {
  const headers = [
    "thread_id",
    "created_at_utc",
    "updated_at_utc",
    "model_provider",
    "model",
    "reasoning_effort",
    "tokens_used",
    "cwd",
    "git_branch",
    "first_user_message_excerpt",
    "source",
  ];
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map(h => csv(row[h])).join(","));
  }
  return lines.join("\n") + "\n";
}

function renderMarkdown(rows, summary) {
  const top = [...rows].sort((a, b) => b.tokens_used - a.tokens_used).slice(0, 20);
  return [
    "---",
    "tags:",
    "  - area/system",
    "  - type/stats",
    "  - status/active",
    "date: 2026-07-03",
    'up: "[[_HARNESS-SYSTEM]]"',
    "---",
    "# Codex CLI 사용 통계 (파생 백필)",
    "",
    "> 로컬 Codex state DB에서 `cwd`가 현재 프로젝트인 thread만 추출한 파생 통계. 원본 DB·전체 대화 원문은 커밋하지 않는다.",
    `> 마지막 생성: ${summary.generated_at_utc}`,
    "",
    "## 전체",
    `- 프로젝트: \`${summary.project_dir}\``,
    `- 원천: \`${summary.source_db}\``,
    `- Codex thread: **${summary.threads.toLocaleString()}**`,
    `- Codex tokens_used: **${summary.tokens_used.toLocaleString()}**`,
    "",
    "## 모델/effort별",
    "| model | threads | tokens_used |",
    "|-------|---------|-------------|",
    ...summary.by_model.map(r => `| ${r.key} | ${r.threads.toLocaleString()} | ${r.tokens_used.toLocaleString()} |`),
    "",
    "## 일자별",
    "| updated day (UTC) | threads | tokens_used |",
    "|-------------------|---------|-------------|",
    ...summary.by_day.map(r => `| ${r.key} | ${r.threads.toLocaleString()} | ${r.tokens_used.toLocaleString()} |`),
    "",
    "## 브랜치별",
    "| branch | threads | tokens_used |",
    "|--------|---------|-------------|",
    ...summary.by_branch.map(r => `| ${r.key} | ${r.threads.toLocaleString()} | ${r.tokens_used.toLocaleString()} |`),
    "",
    "## 상위 thread (토큰 기준)",
    "| updated | thread | model | effort | tokens_used | prompt excerpt |",
    "|---------|--------|-------|--------|-------------|----------------|",
    ...top.map(r => `| ${r.updated_at_utc} | \`${r.thread_id.slice(0, 8)}\` | ${r.model} | ${r.reasoning_effort} | ${r.tokens_used.toLocaleString()} | ${md(r.first_user_message_excerpt)} |`),
    "",
    "## 해석 주의",
    "- `tokens_used`는 Codex가 제공하는 thread 총량이며 입력/출력 분리값이 아니다.",
    "- Claude `ai-session-intake.csv`의 `engine=codex, agent=via-claude` 행은 위임 횟수 가시화용이다. 이 파일의 Codex CLI 총량과 중복 합산하지 않는다.",
    "- `first_user_message_excerpt`는 작업 식별용 120자 이하 마스킹 발췌만 저장한다. 원문 전체가 필요하면 로컬 Codex DB/히스토리를 별도 승인 후 확인한다.",
    "",
    "---",
    "[[ai-session-intake.README]] · [[ai-usage-stats]] · [[registry-cli]] · [[registry-plugins]]",
  ].join("\n") + "\n";
}

function renderConsole(summary, wrote) {
  return [
    `[codex-cli-telemetry] ${wrote ? "wrote" : "dry-run"} — threads ${summary.threads}, tokens_used ${summary.tokens_used.toLocaleString()}`,
    `project: ${summary.project_dir}`,
    `source: ${summary.source_db}`,
    wrote ? `files: ${OUT.csv}, ${OUT.stats}` : "pass --write to update files",
    "",
  ].join("\n");
}

function epochToIso(v) {
  const n = Number(v || 0);
  if (!Number.isFinite(n) || n <= 0) return "";
  return new Date(n * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
}

function excerpt(value) {
  return redact(String(value))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function redact(value) {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/01[016789][-\s]?\d{3,4}[-\s]?\d{4}/g, "[phone]")
    .replace(/\b\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}\b/g, "[card]")
    .replace(/\b(?:sk-|pk-|ghp_|github_pat_|xox[baprs]-)[A-Za-z0-9_\-]{12,}\b/g, "[secret]");
}

function csv(value) {
  const s = String(value ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function md(value) {
  return String(value || "—")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ")
    .trim() || "—";
}

function sqlQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function atomicWrite(filePath, content) {
  const tmp = filePath + ".tmp";
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, filePath);
}

function fail(message) {
  process.stderr.write(`[codex-cli-telemetry] ${message}\n`);
  process.exitCode = 1;
  process.exit();
}

main();
