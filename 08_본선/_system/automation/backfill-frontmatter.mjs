#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const VAULT_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const PROJECT_ROOT = path.resolve(VAULT_ROOT, "..");
const LF = "\n";

const EXCLUDED_RELS = new Set([
  "_system/telemetry/_pii-scan-report.md",
  "_system/telemetry/ai-usage-stats.md",
]);

const DUPLICATE_BASENAMES = new Set([
  "README",
  "orchestrator",
  "SKILL",
  "prd",
  "AGENTS",
  "function-spec",
  "summary",
]);

const README_UP = "[[08_본선/05_제출/리서치-딥프롬프트/README]]";
const RESULT_UP = "[[_00-회수현황]]";
const PRODUCT_MOC_UP = "[[_03_제품_MOC]]";

const logs = [];
const warnings = [];
let filesChanged = 0;

function nfc(value) {
  return value.normalize("NFC");
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function rel(file) {
  return nfc(toPosix(path.relative(VAULT_ROOT, file)));
}

function displayRel(file) {
  return nfc(toPosix(path.relative(PROJECT_ROOT, file)));
}

function existsRel(relPath) {
  return fs.existsSync(path.join(VAULT_ROOT, relPath));
}

function collectMd(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectMd(full, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function writeIfChanged(file, before, after, reason) {
  if (before === after) return false;
  fs.writeFileSync(file, after, "utf8");
  filesChanged += 1;
  logs.push(`[modify] ${displayRel(file)} :: ${reason}`);
  return true;
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const closeEnd = end + "\n---".length;
  const afterClose = text[closeEnd] === "\n" ? closeEnd + 1 : closeEnd;
  return {
    before: "---\n",
    bodyStart: afterClose,
    fm: text.slice(4, end),
    body: text.slice(afterClose),
  };
}

function splitLinesPreserve(text) {
  return text.length ? text.split(/\n/) : [];
}

function fieldRange(lines, key) {
  const start = lines.findIndex((line) => new RegExp(`^${key}:`).test(line));
  if (start === -1) return null;
  let end = start + 1;
  while (end < lines.length && !/^[A-Za-z0-9_-]+:/.test(lines[end])) end += 1;
  return { start, end };
}

function quoteYamlString(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function stripYamlScalar(raw) {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function getFieldValue(fm, key) {
  const line = splitLinesPreserve(fm).find((item) => item.startsWith(`${key}:`));
  if (!line) return null;
  return stripYamlScalar(line.slice(key.length + 1));
}

function setScalarField(fm, key, value) {
  const lines = splitLinesPreserve(fm);
  const range = fieldRange(lines, key);
  const nextLine = `${key}: ${quoteYamlString(value)}`;
  if (!range) {
    const insertAt = lines.findIndex((line) => line.startsWith("aliases:"));
    if (insertAt === -1) lines.push(nextLine);
    else lines.splice(insertAt, 0, nextLine);
    return lines.join(LF);
  }
  lines.splice(range.start, range.end - range.start, nextLine);
  return lines.join(LF);
}

function parseTags(fm) {
  const lines = splitLinesPreserve(fm);
  const range = fieldRange(lines, "tags");
  if (!range) return [];
  const first = lines[range.start].slice("tags:".length).trim();
  if (first.startsWith("[") && first.endsWith("]")) {
    return first
      .slice(1, -1)
      .split(",")
      .map((item) => stripYamlScalar(item.trim()))
      .filter(Boolean);
  }
  return lines
    .slice(range.start + 1, range.end)
    .map((line) => line.match(/^\s*-\s*(.+?)\s*$/)?.[1])
    .filter(Boolean)
    .map(stripYamlScalar);
}

function setTags(fm, tags) {
  const lines = splitLinesPreserve(fm);
  const range = fieldRange(lines, "tags");
  const block = ["tags:", ...tags.map((tag) => `  - ${tag}`)];
  if (!range) {
    lines.unshift(...block);
  } else {
    lines.splice(range.start, range.end - range.start, ...block);
  }
  return lines.join(LF);
}

function ensureDate(fm, date = "2026-06-30") {
  if (/^date:/m.test(fm)) return fm;
  const lines = splitLinesPreserve(fm);
  const upIdx = lines.findIndex((line) => line.startsWith("up:"));
  if (upIdx === -1) lines.push(`date: ${date}`);
  else lines.splice(upIdx, 0, `date: ${date}`);
  return lines.join(LF);
}

function ensureFrontmatter(text, initialUp, initialTags) {
  const parsed = parseFrontmatter(text);
  if (parsed) return { text, parsed };
  const fm = [
    "tags:",
    ...initialTags.map((tag) => `  - ${tag}`),
    "date: 2026-06-30",
    `up: ${quoteYamlString(initialUp)}`,
  ].join(LF);
  const next = `---\n${fm}\n---\n${text}`;
  return { text: next, parsed: parseFrontmatter(next) };
}

function mergeTags(existing, required, options = {}) {
  let tags = [...existing];
  if (options.replaceAreaWith) {
    tags = tags.filter((tag) => !tag.startsWith("area/"));
    if (!tags.includes(options.replaceAreaWith)) tags.unshift(options.replaceAreaWith);
  }
  if (options.replaceStatusWith) {
    tags = tags.filter((tag) => !tag.startsWith("status/"));
    tags.push(options.replaceStatusWith);
  }

  for (const tag of required) {
    if (tag.startsWith("area/") && tags.some((item) => item.startsWith("area/"))) continue;
    if (tag.startsWith("type/") && tags.includes(tag)) continue;
    if (tag.startsWith("status/") && tags.includes(tag)) continue;
    if (!tags.includes(tag)) tags.push(tag);
  }
  return tags;
}

function updateFrontmatter(file, updater, reason) {
  const before = read(file);
  let working = before;
  let parsed = parseFrontmatter(working);
  const ensured = updater.ensure
    ? ensureFrontmatter(working, updater.ensure.up, updater.ensure.tags)
    : null;
  if (ensured) {
    working = ensured.text;
    parsed = ensured.parsed;
  }
  if (!parsed) {
    warnings.push(`[warn] no frontmatter delimiter: ${displayRel(file)}`);
    return false;
  }
  let fm = parsed.fm;
  if (updater.up !== undefined) fm = setScalarField(fm, "up", updater.up);
  if (updater.tags) {
    const current = parseTags(fm);
    const nextTags = mergeTags(current, updater.tags.required, updater.tags.options);
    fm = setTags(fm, nextTags);
  }
  if (updater.ensureDate) fm = ensureDate(fm, updater.ensureDate);
  const after = `---\n${fm}\n---\n${parsed.body}`;
  return writeIfChanged(file, before, after, reason);
}

function splitWikilinkInner(inner) {
  let hashAt = -1;
  let aliasAt = -1;
  let aliasSuffixAt = -1;
  for (let i = 0; i < inner.length; i += 1) {
    const char = inner[i];
    const escaped = i > 0 && inner[i - 1] === "\\";
    if (!escaped && char === "#" && hashAt === -1 && aliasAt === -1) hashAt = i;
    if (char === "|" && aliasAt === -1) {
      aliasAt = i;
      aliasSuffixAt = escaped ? i - 1 : i;
      break;
    }
  }
  const aliasTargetEnd = aliasSuffixAt !== -1 ? aliasSuffixAt : aliasAt;
  const targetEnd = [hashAt, aliasTargetEnd].filter((idx) => idx !== -1).sort((a, b) => a - b)[0] ?? inner.length;
  return {
    target: inner.slice(0, targetEnd).trim(),
    suffix: aliasSuffixAt !== -1 ? inner.slice(aliasSuffixAt) : inner.slice(targetEnd),
  };
}

function normalizeUpValue(value) {
  return value.replace(/\[\[([^\]]+)\]\]/g, (full, inner) => {
    const { target, suffix } = splitWikilinkInner(inner);
    const normalizedTarget = nfc(target);
    if (!normalizedTarget.startsWith("08_본선/")) return full;
    const basename = nfc(path.posix.basename(normalizedTarget));
    if (DUPLICATE_BASENAMES.has(basename)) return full;
    return `[[${basename}${suffix}]]`;
  });
}

function normalizeAllAbsoluteUp(files) {
  let beforeCount = 0;
  let afterCount = 0;
  for (const file of files) {
    if (EXCLUDED_RELS.has(rel(file))) continue;
    const text = read(file);
    const parsed = parseFrontmatter(text);
    if (!parsed) continue;
    const up = getFieldValue(parsed.fm, "up");
    if (!up) continue;
    if (up.includes("[[08_본선/")) beforeCount += 1;
    const nextUp = normalizeUpValue(up);
    if (nextUp !== up) {
      updateFrontmatter(file, { up: nextUp }, "normalize absolute path in up");
    }
    const afterText = read(file);
    const afterParsed = parseFrontmatter(afterText);
    const afterUp = afterParsed ? getFieldValue(afterParsed.fm, "up") : null;
    if (afterUp?.includes("[[08_본선/")) afterCount += 1;
  }
  return { beforeCount, afterCount };
}

function applyPathIfExists(relPath, fn) {
  const full = path.join(VAULT_ROOT, relPath);
  if (!fs.existsSync(full)) {
    warnings.push(`[warn] missing target skipped: 08_본선/${relPath}`);
    return;
  }
  fn(full);
}

function addProductIndexLine() {
  applyPathIfExists("_MOC/_03_제품_MOC.md", (file) => {
    const before = read(file);
    if (/\[\[INDEX\]\]/.test(before)) return;
    const after = before.trimEnd() + "\n- [[INDEX]]\n";
    writeIfChanged(file, before, after, "add product INDEX backlink");
  });
}

function repairHagentDeadLinks() {
  applyPathIfExists("_분석/hagent-os-구조-청사진.md", (file) => {
    const before = read(file);
    const after = before
      .replace(/\[\[08_본선\/HOME((?:#[^\]|]+)?)(\|[^\]]+)?\]\]/g, "[[본선 HOME$1$2]]")
      .replace(/\[\[08_본선\/_03_제품_MOC((?:#[^\]|]+)?)(\|[^\]]+)?\]\]/g, "[[_03_제품_MOC$1$2]]");
    writeIfChanged(file, before, after, "repair hagent dead wikilinks");
  });
}

function main() {
  if (!fs.existsSync(VAULT_ROOT)) {
    throw new Error(`Vault root not found: ${VAULT_ROOT}`);
  }

  const files = collectMd(VAULT_ROOT);
  const resultTargets = files.filter((file) => {
    const r = rel(file);
    if (EXCLUDED_RELS.has(r)) return false;
    return /^05_제출\/리서치-딥프롬프트\/_결과\/(?!_00-회수현황\.md$)(?!_모델기록\.md$).+\.md$/.test(r);
  });
  const promptTargets = files.filter((file) =>
    /^05_제출\/리서치-딥프롬프트\/D.+\.md$/.test(rel(file)),
  );

  for (const file of resultTargets) {
    updateFrontmatter(
      file,
      {
        ensure: { up: RESULT_UP, tags: ["area/strategy", "type/reference", "status/active"] },
        up: RESULT_UP,
        tags: { required: ["area/strategy", "type/reference", "status/active"], options: {} },
        ensureDate: "2026-06-30",
      },
      "backfill result up/tags",
    );
  }

  for (const file of promptTargets) {
    updateFrontmatter(
      file,
      {
        up: README_UP,
        tags: { required: ["area/strategy", "type/prompt", "status/active"], options: {} },
      },
      "fix prompt up/tags",
    );
  }

  for (const relPath of [
    "05_제출/리서치-딥프롬프트/_00-도메인-분해-점검.md",
    "05_제출/리서치-딥프롬프트/_01-실행-대시보드.md",
    "05_제출/리서치-딥프롬프트/_03-리서치-갭감사.md",
  ]) {
    applyPathIfExists(relPath, (file) =>
      updateFrontmatter(
        file,
        {
          up: README_UP,
          tags: { required: ["area/strategy", "type/reference", "status/active"], options: {} },
        },
        "fix research control up/tags",
      ),
    );
  }

  applyPathIfExists("05_제출/리서치-딥프롬프트/_02-코덱스-점검.md", (file) =>
    updateFrontmatter(
      file,
      {
        up: README_UP,
        tags: { required: ["area/strategy", "type/reference", "status/active"], options: {} },
      },
      "backfill codex check up/tags",
    ),
  );

  applyPathIfExists("05_제출/리서치-딥프롬프트/README.md", (file) =>
    updateFrontmatter(
      file,
      {
        ensure: { up: "[[_05_제출_MOC]]", tags: ["area/strategy", "type/index", "status/active"] },
        up: "[[_05_제출_MOC]]",
        tags: { required: ["area/strategy", "type/index", "status/active"], options: {} },
        ensureDate: "2026-06-30",
      },
      "backfill README up/tags",
    ),
  );

  for (const relPath of [
    "_분석/hagent-os-구조-청사진.md",
    "_분석/paperclip-레퍼런스-분석.md",
  ]) {
    applyPathIfExists(relPath, (file) =>
      updateFrontmatter(file, { up: PRODUCT_MOC_UP }, "fix analysis up"),
    );
  }

  applyPathIfExists("_분석/paperclip-레퍼런스-분석.md", (file) =>
    updateFrontmatter(
      file,
      {
        tags: {
          required: ["area/product", "type/reference", "status/active"],
          options: { replaceAreaWith: "area/product", replaceStatusWith: "status/active" },
        },
      },
      "set paperclip product tags",
    ),
  );

  applyPathIfExists("_system/skills/visualization-cycle/SKILL.md", (file) =>
    updateFrontmatter(
      file,
      {
        up: "[[_system_tools_MOC]]",
        tags: { required: ["area/system", "type/reference", "status/active"], options: {} },
      },
      "backfill visualization skill up/tags",
    ),
  );

  const upCounts = normalizeAllAbsoluteUp(collectMd(VAULT_ROOT));

  applyPathIfExists("03_제품/INDEX.md", (file) =>
    updateFrontmatter(file, { up: PRODUCT_MOC_UP }, "ensure product INDEX up"),
  );
  addProductIndexLine();
  repairHagentDeadLinks();

  process.stdout.write(`[backfill-frontmatter] vault=${VAULT_ROOT}\n`);
  process.stdout.write(`[backfill-frontmatter] files_changed=${filesChanged}\n`);
  process.stdout.write(`[backfill-frontmatter] created_files=0\n`);
  process.stdout.write(
    `[backfill-frontmatter] absolute_up_before=${upCounts.beforeCount} absolute_up_after=${upCounts.afterCount}\n`,
  );
  for (const line of logs) process.stdout.write(`${line}\n`);
  for (const line of warnings) process.stdout.write(`${line}\n`);
}

main();
