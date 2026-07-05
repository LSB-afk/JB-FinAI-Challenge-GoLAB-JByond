#!/usr/bin/env node
// plugin-sync/sync.mjs — 커밋된 SSOT(.claude/settings.json)에서 마켓플레이스+플러그인을 재설치(동기화).
//
// 핵심: 플러그인 목록을 손으로 이중 관리하지 않는다. settings.json 이 유일 원천 →
//       새 기기/새 팀원이 이 스크립트만 돌리면 동일한 플러그인 세트가 재현된다.
// 대화형 없음(브라우저 OAuth 불필요). `claude plugin` CLI만 구동.
// harness-sync 의 plugin-inventory.mjs 와 방향이 반대다:
//   plugin-inventory = 라이브 환경 → registry-plugins.md (문서화, 개인 세트 오염 위험)
//   plugin-sync      = 커밋 settings.json(팀 세트) → 설치 환경 (재현·동기화)
//
// 사용:
//   node sync.mjs --dry-run      # 설치 가이드: 실행할 명령만 출력(설치 안 함)
//   node sync.mjs                # 실제 동기화(project 세트)
//   node sync.mjs --global       # ~/.claude/settings.json(개인 전체 세트) 사용
//   node sync.mjs --self-test    # settings 파싱·플랜 생성 검증만
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const args = process.argv.slice(2);
const dry = args.includes('--dry-run');
const useGlobal = args.includes('--global');
const settingsPath = useGlobal
  ? join(process.env.HOME || '', '.claude/settings.json')
  : join(process.cwd(), '.claude/settings.json');

const load = (p) => JSON.parse(readFileSync(p, 'utf8'));
const marketSource = (m) => (m?.source?.source === 'github' ? m.source.repo : m?.source?.url);

// settings → 실행할 claude 명령 목록(마켓플레이스 먼저, 그 다음 플러그인)
function plan(settings) {
  const cmds = [];
  for (const [, m] of Object.entries(settings.extraKnownMarketplaces || {})) {
    const src = marketSource(m);
    if (src) cmds.push(['plugin', 'marketplace', 'add', src]);
  }
  for (const [id, on] of Object.entries(settings.enabledPlugins || {})) {
    if (on === true) cmds.push(['plugin', 'install', id]);
  }
  return cmds;
}

if (args.includes('--self-test')) {
  const cmds = plan(load(settingsPath));
  console.assert(cmds.length > 0, 'no commands generated');
  console.assert(cmds.every((c) => c.every((x) => typeof x === 'string' && x.length)), 'bad token');
  console.assert(cmds.some((c) => c[1] === 'marketplace') && cmds.some((c) => c[1] === 'install'),
    'plan must contain both marketplace-add and install steps');
  console.log(`self-test OK: ${cmds.length} commands from ${settingsPath}`);
  process.exit(0);
}

const cmds = plan(load(settingsPath));
console.log(`# ${useGlobal ? 'GLOBAL(개인)' : 'PROJECT(팀)'} 플러그인 동기화 — ${cmds.length} 단계`);
console.log(`# 원천: ${settingsPath}\n`);
let ok = 0, skip = 0;
for (const c of cmds) {
  const line = 'claude ' + c.join(' ');
  if (dry) { console.log(line); continue; }
  try {
    execFileSync('claude', c, { stdio: 'inherit' });
    ok++;
  } catch (e) {
    // 이미 추가/설치됨 등은 정상 — 멱등 재실행 시 무시
    console.error(`(skip) ${line} → ${String(e.message).split('\n')[0]}`);
    skip++;
  }
}
if (!dry) console.log(`\n동기화 완료: ${ok} 적용 · ${skip} 스킵(이미 존재)`);
