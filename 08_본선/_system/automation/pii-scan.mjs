import fs from 'node:fs';
import path from 'node:path';

const BASE_DIR = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

const TARGETS = [
  '08_본선/04_증빙/01_핵심로그/프롬프트-로그.md',
  '08_본선/04_증빙/01_핵심로그/decision-log.md',
  '08_본선/04_증빙/01_핵심로그/session-log.md',
  '08_본선/_system/telemetry/ai-session-intake.csv',
];

const REPORT_PATH = '08_본선/_system/telemetry/_pii-scan-report.md';

const PATTERNS = [
  {
    name: '주민등록번호',
    regex: /\b\d{6}-?[1-4]\d{6}\b/g,
    severity: 'HIGH',
    mask: (value) => {
      const digits = value.replace(/\D/g, '');
      return `${digits.slice(0, 6)}-${digits.slice(6, 7)}******`;
    },
  },
  {
    name: '카드번호',
    regex: /\b\d{4}-?\d{4}-?\d{4}-?\d{4}\b/g,
    severity: 'HIGH',
    mask: (value) => {
      const digits = value.replace(/\D/g, '');
      return `${digits.slice(0, 4)}-****-****-${digits.slice(-4)}`;
    },
  },
  {
    name: '계좌번호',
    regex: /\b\d{3,4}-?\d{4,6}-?\d{2,6}(-?\d{2,3})?\b/g,
    severity: 'MEDIUM',
    mask: (value) => `${value.slice(0, 4)}${'*'.repeat(Math.max(0, value.length - 4))}`,
  },
  {
    name: '휴대폰',
    regex: /\b01[016789]-?\d{3,4}-?\d{4}\b/g,
    severity: 'MEDIUM',
    mask: (value) => {
      const digits = value.replace(/\D/g, '');
      return `${digits.slice(0, 3)}-****-${digits.slice(-4)}`;
    },
  },
  {
    name: '이메일',
    regex: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g,
    severity: 'LOW',
    mask: (value) => {
      const atIndex = value.indexOf('@');
      if (atIndex === -1) return '***';
      const local = value.slice(0, atIndex);
      const domain = value.slice(atIndex + 1);
      return `${local.slice(0, 3)}***@${domain}`;
    },
  },
];

function scanLine(file, lineNumber, line) {
  const findings = [];

  for (const pattern of PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(line)) !== null) {
      findings.push({
        file,
        line: lineNumber,
        pattern: pattern.name,
        masked_match: pattern.mask(match[0]),
        severity: pattern.severity,
      });
    }
  }

  return findings;
}

function scanFile(relativePath) {
  const absolutePath = path.join(BASE_DIR, relativePath);
  if (!fs.existsSync(absolutePath)) return [];

  const content = fs.readFileSync(absolutePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const findings = [];

  for (let index = 0; index < lines.length; index += 1) {
    findings.push(...scanLine(relativePath, index + 1, lines[index]));
  }

  return findings;
}

function escapeTableCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function renderReport(scannedAt, findingsByFile) {
  const allFindings = [...findingsByFile.values()].flat();
  const lines = [
    '---',
    `scanned_at: "${scannedAt}"`,
    '---',
    '',
    '# PII Scan Report',
    '',
  ];

  if (allFindings.length === 0) {
    lines.push('결과: 이상 없음', '');
    return lines.join('\n');
  }

  for (const [file, findings] of findingsByFile) {
    if (findings.length === 0) continue;

    lines.push(`## ${file}`, '');
    lines.push('| file | line | pattern | masked_match | severity |');
    lines.push('|---|---:|---|---|---|');
    for (const finding of findings) {
      lines.push(
        `| ${escapeTableCell(finding.file)} | ${finding.line} | ${escapeTableCell(finding.pattern)} | ${escapeTableCell(finding.masked_match)} | ${finding.severity} |`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  const scannedAt = new Date().toISOString();
  const findingsByFile = new Map();

  for (const target of TARGETS) {
    findingsByFile.set(target, scanFile(target));
  }

  const reportAbsolutePath = path.join(BASE_DIR, REPORT_PATH);
  fs.mkdirSync(path.dirname(reportAbsolutePath), { recursive: true });
  fs.writeFileSync(reportAbsolutePath, renderReport(scannedAt, findingsByFile), 'utf8');

  const highCount = [...findingsByFile.values()]
    .flat()
    .filter((finding) => finding.severity === 'HIGH').length;

  if (highCount > 0) {
    process.stdout.write(
      JSON.stringify({
        systemMessage: `⚠️ PII 의심 ${highCount}건 — _pii-scan-report.md 확인`,
      }) + '\n',
    );
  }
}

try {
  main();
} catch {
  // Stop hooks must never block the session.
} finally {
  process.exit(0);
}
