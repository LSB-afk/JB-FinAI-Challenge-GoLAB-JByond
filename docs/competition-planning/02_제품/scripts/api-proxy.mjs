// 데모 전용 로컬 프록시: 국토부 실거래가 CORS 우회 + LLM 게이트웨이.
// 사용: DATA_GO_KR_KEY=<Decoding 인증키> npm run demo:proxy
//
// GET  /jeonse?lawd=<법정동코드5>&ym=<YYYYMM>&kind=trade|rent
//   kind=trade(기본) → 연립다세대 매매 평균가(전세가율 분모=주변 시세)
//   kind=rent        → 연립다세대 전월세 보증금 평균(참고)
//   응답 { estimatedPrice, samples, source }. 키 없으면 503(앱은 폴백값 사용).
//
// POST /llm  { prompt, engine?: "claude"|"codex"|"ollama", model?, tier?, caseId?, runId?, timeoutMs? }
//   claude/codex CLI + ollama HTTP 라우팅(paperclip式). 폴백 사다리:
//   요청 엔진 실패 → 다음 엔진 재시도 → 전부 실패 시 사람 큐 격상(escalated:true).
//   ollama는 OLLAMA_BASE(기본 http://127.0.0.1:11434, Docker 분리 시 http://pii-zone:11434)
//   + OLLAMA_MODEL(기본 qwen2.5:0.5b)로 접속 — PII 존(로컬모델) 티어의 실체.
//   호출자 책임: 프롬프트에 원문 PII 금지(Zero-PII 최소필드만 — subject_token/risk_code 등).
//   모든 시도는 llm-runs.jsonl 에 구조화 1줄(JSONL)로 기록:
//   { runId, caseId, ts, engine, tier, latencyMs, tokensIn, tokensOut, costUsd,
//     errorClass, retry, fallbackPath, escalated }
//
// GET  /llm/usage → llm-runs.jsonl 집계 { totals, byCase, byTier, recent }
//   (콘솔 토큰 사용 패널이 ?live=1 에서 호출 → 케이스 단가·RM 월 환산 실측 표시)
//
// 브라우저 라이브 데모(?live=1)에서만 호출됨.
import http from "node:http";
import { spawn } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KEY = process.env.DATA_GO_KR_KEY;
// data.go.kr 오픈API 엔드포인트 (연립다세대 = RH)
const ENDPOINT = {
  trade: "https://apis.data.go.kr/1613000/RTMSDataSvcRHTrade/getRTMSDataSvcRHTrade", // 매매 → <dealAmount>
  rent: "https://apis.data.go.kr/1613000/RTMSDataSvcRHRent/getRTMSDataSvcRHRent",     // 전월세 → <deposit>
};

const JSON_HEADERS = { "content-type": "application/json" };
const LOG_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "llm-runs.jsonl");
const ENGINE_TIER = { claude: "frontier", codex: "local", ollama: "local" }; // 데모 서사상 기본 티어 라벨
// 폴백 사다리 순서: 요청 엔진 → 나머지 순서대로 (ollama 요청 시 claude→codex까지 2단 폴백)
const ladderFor = (first) => [...new Set([first, "claude", "codex"])];
let runSeq = 0;

function appendLog(record) {
  try { appendFileSync(LOG_FILE, JSON.stringify(record) + "\n"); } catch { /* 로그 실패가 응답을 막지 않게 */ }
}

function classifyError(err) {
  if (err && err.code === "ENOENT") return "engine_missing";
  const msg = String((err && err.message) || err);
  if (msg.includes("fetch failed") || msg.includes("ECONNREFUSED")) return "engine_missing"; // ollama 미기동
  if (msg === "timeout" || msg.includes("TimeoutError") || (err && err.name === "TimeoutError")) return "timeout";
  if (msg.startsWith("exit_")) return "nonzero_exit";
  if (msg === "parse_error" || msg === "empty_output") return msg;
  return "unknown";
}

function runCli(cmd, args, timeoutMs) {
  return new Promise((resolve, reject) => {
    // cwd=tmp 고정: CLI가 레포 CLAUDE.md/메모리를 컨텍스트로 끌어와 토큰이 부풀고
    // 볼트 내용(대외비)이 프롬프트 컨텍스트로 새는 것을 차단한다.
    const child = spawn(cmd, args, { cwd: tmpdir(), stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let errOut = "";
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; child.kill("SIGKILL"); reject(new Error("timeout")); }, timeoutMs);
    child.stdout.on("data", (d) => { out += d; });
    child.stderr.on("data", (d) => { errOut += d; });
    child.on("error", (e) => { if (!timedOut) { clearTimeout(timer); reject(e); } });
    child.on("close", (code) => {
      if (timedOut) return;
      clearTimeout(timer);
      if (code !== 0) reject(new Error(`exit_${code}: ${errOut.slice(0, 300)}`));
      else resolve(out);
    });
  });
}

async function callEngine(engine, prompt, timeoutMs, model) {
  if (engine === "ollama") {
    const base = process.env.OLLAMA_BASE || "http://127.0.0.1:11434";
    const mdl = model || process.env.OLLAMA_MODEL || "qwen2.5:0.5b"; // Mac Docker GPU 미지원 → 소형 모델 기본
    const r = await fetch(`${base}/api/generate`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ model: mdl, prompt, stream: false }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!r.ok) throw new Error(`exit_${r.status}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    if (!j.response) throw new Error("empty_output");
    return { text: j.response, tokensIn: j.prompt_eval_count || 0, tokensOut: j.eval_count || 0, costUsd: 0 };
  }
  if (engine === "codex") {
    const out = await runCli("codex", ["exec", "--json", "--skip-git-repo-check", prompt], timeoutMs);
    let text = "";
    let tokensIn = 0;
    let tokensOut = 0;
    for (const line of out.split("\n")) {
      if (!line.trim()) continue;
      let ev;
      try { ev = JSON.parse(line); } catch { continue; }
      if (ev.item && ev.item.type === "agent_message" && ev.item.text) text = ev.item.text;
      const usage = ev.usage || (ev.info && ev.info.total_token_usage);
      if (usage) {
        tokensIn = usage.input_tokens ?? tokensIn;
        tokensOut = usage.output_tokens ?? tokensOut;
      }
    }
    if (!text) throw new Error("empty_output");
    return { text, tokensIn, tokensOut, costUsd: 0 }; // codex CLI는 비용 미보고 → 구독 정액 [가정]
  }
  const out = await runCli("claude", ["-p", prompt, "--output-format", "json"], timeoutMs);
  let parsed;
  try { parsed = JSON.parse(out); } catch { throw new Error("parse_error"); }
  const usage = parsed.usage || {};
  return {
    text: parsed.result ?? "",
    tokensIn: (usage.input_tokens || 0) + (usage.cache_read_input_tokens || 0) + (usage.cache_creation_input_tokens || 0),
    tokensOut: usage.output_tokens || 0,
    costUsd: parsed.total_cost_usd || 0,
  };
}

async function handleLlm(req, res) {
  let body = "";
  for await (const chunk of req) body += chunk;
  let payload;
  try { payload = JSON.parse(body || "{}"); } catch {
    res.writeHead(400, JSON_HEADERS).end(JSON.stringify({ error: "invalid json body" }));
    return;
  }
  const prompt = String(payload.prompt || "").trim();
  if (!prompt) {
    res.writeHead(400, JSON_HEADERS).end(JSON.stringify({ error: "prompt required" }));
    return;
  }
  const first = ["codex", "ollama"].includes(payload.engine) ? payload.engine : "claude";
  const timeoutMs = Math.min(Number(payload.timeoutMs) || 90000, 300000);
  const runId = payload.runId || `run-${Date.now().toString(36)}-${++runSeq}`;
  const caseId = payload.caseId || "unassigned";
  const ladder = ladderFor(first);
  const fallbackPath = [];

  for (let attempt = 0; attempt < ladder.length; attempt += 1) {
    const engine = ladder[attempt];
    const started = Date.now();
    try {
      const r = await callEngine(engine, prompt, timeoutMs, payload.model);
      const record = {
        runId, caseId, ts: new Date().toISOString(), engine,
        tier: payload.tier || ENGINE_TIER[engine],
        latencyMs: Date.now() - started,
        tokensIn: r.tokensIn, tokensOut: r.tokensOut, costUsd: r.costUsd,
        errorClass: null, retry: attempt,
        fallbackPath: fallbackPath.join(">") || null, escalated: false,
      };
      appendLog(record);
      res.writeHead(200, JSON_HEADERS).end(JSON.stringify({ ...record, text: r.text }));
      return;
    } catch (e) {
      const errorClass = classifyError(e);
      fallbackPath.push(`${engine}:${errorClass}`);
      appendLog({
        runId, caseId, ts: new Date().toISOString(), engine,
        tier: payload.tier || ENGINE_TIER[engine],
        latencyMs: Date.now() - started,
        tokensIn: 0, tokensOut: 0, costUsd: 0,
        errorClass, retry: attempt,
        fallbackPath: fallbackPath.join(">"), escalated: false,
      });
    }
  }

  // 두 엔진 모두 실패 → 사람 큐 격상: 콘솔이 승인 큐에 수동처리 항목으로 노출한다.
  const record = {
    runId, caseId, ts: new Date().toISOString(), engine: null, tier: null,
    latencyMs: 0, tokensIn: 0, tokensOut: 0, costUsd: 0,
    errorClass: "all_engines_failed", retry: ladder.length,
    fallbackPath: fallbackPath.join(">"), escalated: true,
  };
  appendLog(record);
  res.writeHead(200, JSON_HEADERS).end(JSON.stringify({ ...record, text: null, queue: "human" }));
}

function handleUsage(res) {
  const records = existsSync(LOG_FILE)
    ? readFileSync(LOG_FILE, "utf8").split("\n").filter(Boolean).map((line) => {
        try { return JSON.parse(line); } catch { return null; }
      }).filter(Boolean)
    : [];
  const totals = { calls: records.length, runs: 0, tokensIn: 0, tokensOut: 0, costUsd: 0, errors: 0, escalated: 0 };
  const byCase = {};
  const byTier = {};
  for (const r of records) {
    if (r.errorClass) {
      totals.errors += 1;
      if (r.escalated) totals.escalated += 1;
      continue;
    }
    totals.runs += 1;
    totals.tokensIn += r.tokensIn || 0;
    totals.tokensOut += r.tokensOut || 0;
    totals.costUsd += r.costUsd || 0;
    const c = byCase[r.caseId] || (byCase[r.caseId] = { runs: 0, tokensIn: 0, tokensOut: 0, costUsd: 0 });
    c.runs += 1; c.tokensIn += r.tokensIn || 0; c.tokensOut += r.tokensOut || 0; c.costUsd += r.costUsd || 0;
    const tierKey = r.tier || "unknown";
    const t = byTier[tierKey] || (byTier[tierKey] = { runs: 0, tokensIn: 0, tokensOut: 0, costUsd: 0 });
    t.runs += 1; t.tokensIn += r.tokensIn || 0; t.tokensOut += r.tokensOut || 0; t.costUsd += r.costUsd || 0;
  }
  res.writeHead(200, JSON_HEADERS).end(JSON.stringify({ totals, byCase, byTier, recent: records.slice(-20) }));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 로컬 데모 전용
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") { res.writeHead(204).end(); return; }
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/llm" && req.method === "POST") { await handleLlm(req, res); return; }
  if (u.pathname === "/llm/usage") { handleUsage(res); return; }
  if (u.pathname !== "/jeonse") { res.writeHead(404).end(); return; }
  if (!KEY) { res.writeHead(503, JSON_HEADERS).end(JSON.stringify({ error: "no DATA_GO_KR_KEY" })); return; }
  const kind = u.searchParams.get("kind") === "rent" ? "rent" : "trade";
  const field = kind === "rent" ? "deposit" : "dealAmount"; // 만원 단위, 콤마 포함
  try {
    const q = new URLSearchParams({
      serviceKey: KEY, // Decoding 키 사용(URLSearchParams가 인코딩함)
      LAWD_CD: u.searchParams.get("lawd") || "11500",
      DEAL_YMD: u.searchParams.get("ym") || "202605",
      numOfRows: "100",
    });
    const r = await fetch(`${ENDPOINT[kind]}?${q}`);
    const xml = await r.text();
    const re = new RegExp(`<${field}>\\s*([\\d,]+)\\s*</${field}>`, "g");
    const amounts = [...xml.matchAll(re)]
      .map((m) => Number(m[1].replace(/,/g, "")) * 10000) // 만원 → 원
      .filter((n) => n > 0);
    const estimatedPrice = amounts.length
      ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length)
      : 0;
    res.writeHead(200, JSON_HEADERS);
    res.end(JSON.stringify({ estimatedPrice, samples: amounts.length, source: `국토부 연립다세대 ${kind === "rent" ? "전월세" : "매매"} 실거래가` }));
  } catch (e) {
    res.writeHead(502, JSON_HEADERS).end(JSON.stringify({ error: String(e) }));
  }
});

server.listen(8020, () => console.log("[api-proxy] http://127.0.0.1:8020 — /jeonse · /llm · /llm/usage"));
