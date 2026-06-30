#!/usr/bin/env node
// Git commit 기반 human contribution 자동 집계.
// 실패 시 조용히 반환해 텔레메트리 하네스를 막지 않는다.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const AUTHOR_SLOT_MAP = {
  // "email@example.com": "M1",
};

const DOMAINS = ["dev", "doc", "research", "design", "ops", "other"];
const TARGET = path.join(process.cwd(), "08_본선/_system/team/_contribution-stats.md");
const START = "<!-- GIT-CONTRIB -->";
const END = "<!-- /GIT-CONTRIB -->";

function updateGitContrib() {
  try {
    const log = execFileSync("git", [
      "-c", "core.quotepath=false",
      "log",
      "--no-merges",
      "--numstat",
      "--format=COMMIT:%H%n%ae%n%an",
      "HEAD",
    ], { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

    const stats = collectStats(log);
    const block = renderBlock(stats);
    writeMarkerBlock(TARGET, block);
  } catch {
    return;
  }
}

function collectStats(log) {
  const byAuthor = new Map();
  const lines = log.split(/\r?\n/);
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (line.startsWith("COMMIT:")) {
      const email = lines[++i] || "";
      const name = lines[++i] || email || "unknown";
      const author = AUTHOR_SLOT_MAP[email] || name;
      current = ensureAuthor(byAuthor, author);
      current.commits++;
      continue;
    }

    if (!current) continue;

    const parts = line.split("\t");
    if (parts.length < 3) continue;

    const added = numericNumstat(parts[0]);
    const deleted = numericNumstat(parts[1]);
    const filePath = parts.slice(2).join("\t");
    const domain = classifyDomain(filePath);

    current[domain]++;
    current.files++;
    current.added += added;
    current.deleted += deleted;
  }

  return [...byAuthor.entries()]
    .map(([author, stat]) => ({ author, ...stat }))
    .sort((a, b) => b.commits - a.commits || a.author.localeCompare(b.author));
}

function ensureAuthor(byAuthor, author) {
  if (!byAuthor.has(author)) {
    byAuthor.set(author, {
      dev: 0,
      doc: 0,
      research: 0,
      design: 0,
      ops: 0,
      other: 0,
      files: 0,
      commits: 0,
      added: 0,
      deleted: 0,
    });
  }
  return byAuthor.get(author);
}

function numericNumstat(value) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

function classifyDomain(filePath) {
  if (containsAny(filePath, ["02_제품/app", ".js", ".css", ".html", "scripts/"])) return "dev";
  if (containsAny(filePath, ["_제출", ".docx", ".pdf"]) || /[0-9]+_.*\.md$/.test(filePath)) return "doc";
  if (containsAny(filePath, ["05_리서치", "리서치-딥프롬프트", "딥프롬프트"])) return "research";
  if (containsAny(filePath, ["diagrams", "styles", "ux", ".excalidraw"])) return "design";
  if (filePath.includes("08_본선/_system")) return "ops";
  return "other";
}

function containsAny(value, needles) {
  return needles.some(needle => value.includes(needle));
}

function renderBlock(stats) {
  const rows = stats.map(stat => [
    stat.author,
    stat.dev,
    stat.doc,
    stat.research,
    stat.design,
    stat.ops,
    stat.other,
    stat.commits,
    stat.added,
    stat.deleted,
  ]);

  return [
    START,
    "| Author | dev | doc | research | design | ops | other | commits | +lines | -lines |",
    "|--------|-----|-----|----------|--------|-----|-------|---------|--------|--------|",
    ...(rows.length ? rows.map(row => `| ${row.join(" | ")} |`) : ["| (no commits) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |"]),
    END,
  ].join("\n");
}

function writeMarkerBlock(filePath, block) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  let existing = "";
  try { existing = fs.readFileSync(filePath, "utf8"); } catch { /* 새 파일 */ }

  const pattern = new RegExp(`${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}`, "m");
  const updated = pattern.test(existing)
    ? existing.replace(pattern, block)
    : existing.trimEnd() + (existing.trimEnd() ? "\n\n" : "") + block + "\n";

  atomicWriteFile(filePath, updated.endsWith("\n") ? updated : updated + "\n");
}

function atomicWriteFile(filePath, content) {
  const tmp = filePath + ".tmp";
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, filePath);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export { updateGitContrib };
export default updateGitContrib;

if (decodeURI(import.meta.url).replace(/^file:\/\//, "") === path.resolve(process.argv[1] || "")) {
  updateGitContrib();
}
