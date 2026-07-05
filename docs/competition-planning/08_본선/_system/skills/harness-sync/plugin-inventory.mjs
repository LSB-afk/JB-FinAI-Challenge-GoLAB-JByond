#!/usr/bin/env node
/**
 * harness-sync/plugin-inventory.mjs
 * ~/.claude/settings.json 읽기 → enabledPlugins · extraKnownMarketplaces · mcpServers 파싱
 * → registry-plugins.md (활성/비활성 표·마켓플레이스 표) 및 registry-mcp.md (settings MCP 섹션) 재생성.
 *
 * 규칙:
 *  - settings.json 은 읽기 전용 — 절대 수정하지 않음
 *  - <!-- PLUGIN-REGISTRY-START/END --> 마커 사이만 재생성 (수동 작성 구역 보존)
 *  - <!-- MCP-SETTINGS-START/END --> 마커 사이만 재생성
 *  - 파일이 없으면 새로 생성
 *  - 표준 라이브러리만 사용, 외부 전송 없음
 *
 * Usage:
 *   node plugin-inventory.mjs            # 실행
 *   node plugin-inventory.mjs --dry-run  # 출력만, 파일 변경 없음
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import process from 'node:process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DRY_RUN = process.argv.includes('--dry-run')

// 경로 설정
const SETTINGS_PATH = resolve(homedir(), '.claude', 'settings.json')
const SYSTEM_DIR = resolve(__dirname, '..', '..')
const TOOLS_DIR = resolve(SYSTEM_DIR, 'tools')
const PLUGINS_REGISTRY = resolve(TOOLS_DIR, 'registry-plugins.md')
const MCP_REGISTRY = resolve(TOOLS_DIR, 'registry-mcp.md')

// ─── settings.json 파싱 ─────────────────────────────────

function loadSettings() {
  if (!existsSync(SETTINGS_PATH)) {
    console.warn(`[plugin-inventory] 경고: settings.json 없음 (${SETTINGS_PATH})`)
    return {}
  }
  try {
    return JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
  } catch (e) {
    console.error(`[plugin-inventory] settings.json 파싱 오류: ${e.message}`)
    return {}
  }
}

// ─── 플러그인 정보 파싱 ─────────────────────────────────

/**
 * settings.enabledPlugins: string[] — 예: ["obsidian@obsidian-skills", "codex@openai-codex"]
 * settings.plugins: { [id]: { enabled: bool, ... } } — 또는 배열 형식
 */
function parsePlugins(settings) {
  const enabled = new Set()
  const disabled = new Set()

  const ep = settings.enabledPlugins
  // 객체 방식 { "name@market": true|false } — 현재 Claude Code 형식
  if (ep && typeof ep === 'object' && !Array.isArray(ep)) {
    for (const [id, val] of Object.entries(ep)) {
      if (val === true) enabled.add(id)
      else disabled.add(id)
    }
  } else if (Array.isArray(ep)) {
    // 배열 방식(구형): 활성만 나열
    for (const entry of ep) enabled.add(String(entry))
  }

  // plugins 객체 방식 (일부 버전)
  if (settings.plugins && typeof settings.plugins === 'object') {
    for (const [id, cfg] of Object.entries(settings.plugins)) {
      if (cfg?.enabled === false) disabled.add(id)
      else if (cfg?.enabled === true) enabled.add(id)
    }
  }

  return { enabled: [...enabled], disabled: [...disabled] }
}

/**
 * extraKnownMarketplaces: { [id]: string } — 예: { "obsidian-skills": "github:kepano/obsidian-skills" }
 */
function parseMarketplaces(settings) {
  const mp = settings.extraKnownMarketplaces
  if (!mp || typeof mp !== 'object') return {}
  return mp
}

/**
 * mcpServers: { [name]: { command, args, ... } }
 */
function parseMcpServers(settings) {
  const servers = settings.mcpServers
  if (!servers || typeof servers !== 'object') return {}
  return servers
}

// ─── 플러그인 메타 보조 데이터 ──────────────────────────

/** 알려진 플러그인 메타 (용도·권장·baseline). 자동 파싱 값에 없으면 '-' */
const PLUGIN_META = {
  'obsidian': { marketplace: 'obsidian-skills', desc: '볼트 파일 읽기·쓰기·검색·태그 관리', recommend: '필수', baseline: '✅ baseline' },
  'superpowers': { marketplace: 'claude-plugins-official', desc: '브레인스토밍·병렬 에이전트·TDD·코드리뷰 슈퍼파워', recommend: '필수', baseline: '✅ baseline' },
  'code-simplifier': { marketplace: 'claude-plugins-official', desc: '코드 단순화·리팩터링 지원', recommend: '권장', baseline: '—' },
  'context7': { marketplace: 'claude-plugins-official', desc: '라이브러리·프레임워크 최신 문서 조회', recommend: '필수', baseline: '✅ baseline' },
  'skill-creator': { marketplace: 'claude-plugins-official', desc: '스킬 정의·배포 자동화', recommend: '필수', baseline: '✅ baseline' },
  'codex': { marketplace: 'openai-codex', desc: 'Codex CLI 런타임 연동', recommend: '필수', baseline: '✅ baseline' },
  'example-skills': { marketplace: 'anthropic-agent-skills', desc: '스킬 예시 참조 컬렉션', recommend: '선택', baseline: '—' },
  'frontend-design': { marketplace: 'claude-plugins-official', desc: '프론트엔드 컴포넌트 설계·생성', recommend: '디자이너 권장', baseline: '—' },
  'ui-ux-pro-max': { marketplace: 'ui-ux-pro-max-skill', desc: 'UI/UX 고급 설계 지원', recommend: '디자이너 권장', baseline: '—' },
  'figma': { marketplace: 'claude-plugins-official', desc: 'Figma 디자인 연동 (MCP 보완)', recommend: '디자이너 권장', baseline: '—' },
  'chrome-devtools-mcp': { marketplace: 'claude-plugins-official', desc: 'Chrome DevTools 브라우저 디버깅', recommend: 'QA 권장', baseline: '—' },
  'telegram': { marketplace: 'claude-plugins-official', desc: 'Telegram 메시징 연동', recommend: '선택', baseline: '—' },
  'agent-sdk-dev': { marketplace: 'claude-plugins-official', desc: 'Anthropic Agent SDK 개발 지원', recommend: '고급 선택', baseline: '—' },
}

function pluginName(entry) {
  return entry.split('@')[0]
}

function mpSourceStr(entry) {
  const s = entry?.source ?? entry
  if (!s) return ''
  if (typeof s === 'string') return s
  if (s.source === 'github' && s.repo) return `github:${s.repo}`
  if (s.url) return s.url
  return JSON.stringify(s)
}

function pluginMarketplace(entry, marketplaces) {
  const atIdx = entry.indexOf('@')
  if (atIdx === -1) return '—'
  const mpId = entry.slice(atIdx + 1)
  const src = mpSourceStr(marketplaces[mpId])
  return src ? `${mpId} (\`${src}\`)` : mpId
}

function pluginMeta(name) {
  return PLUGIN_META[name] ?? { desc: '—', recommend: '—', baseline: '—' }
}

// ─── 마커 블록 교체 유틸 ─────────────────────────────────

function replaceMarkerBlock(content, startMarker, endMarker, newBlock) {
  const startIdx = content.indexOf(startMarker)
  const endIdx = content.indexOf(endMarker)
  if (startIdx === -1 || endIdx === -1) {
    // 마커 없음 → 파일 끝에 새 블록 추가
    return content.trimEnd() + '\n\n' + startMarker + '\n' + newBlock + '\n' + endMarker + '\n'
  }
  return (
    content.slice(0, startIdx) +
    startMarker +
    '\n' +
    newBlock +
    '\n' +
    endMarker +
    content.slice(endIdx + endMarker.length)
  )
}

// ─── registry-plugins.md 재생성 ─────────────────────────

function buildPluginsBlock(enabled, disabled, marketplaces) {
  const lines = []

  // 활성 플러그인 표
  lines.push('## 활성 플러그인 (enabledPlugins: true)\n')
  lines.push('| 플러그인 | 마켓플레이스 | 상태 | 용도 | 본선 권장 | 팀 baseline |')
  lines.push('|---------|------------|------|------|----------|------------|')
  if (enabled.length === 0) {
    lines.push('| (없음) | — | — | — | — | — |')
  } else {
    for (const entry of enabled) {
      const name = pluginName(entry)
      const mp = pluginMarketplace(entry, marketplaces)
      const meta = pluginMeta(name)
      lines.push(`| \`${name}\` | ${mp} | **활성** | ${meta.desc} | ${meta.recommend} | ${meta.baseline} |`)
    }
  }

  lines.push('')
  lines.push('---\n')

  // 비활성 플러그인 표
  lines.push('## 비활성 플러그인 (설치 완료, 필요 시 활성화)\n')
  lines.push('| 플러그인 | 마켓플레이스 | 상태 | 용도 | 본선 권장 |')
  lines.push('|---------|------------|------|------|----------|')
  if (disabled.length === 0) {
    lines.push('| (없음) | — | — | — | — |')
  } else {
    for (const entry of disabled) {
      const name = pluginName(entry)
      const mp = pluginMarketplace(entry, marketplaces)
      const meta = pluginMeta(name)
      lines.push(`| \`${name}\` | ${mp} | 비활성 | ${meta.desc} | ${meta.recommend} |`)
    }
  }

  lines.push('')
  lines.push('---\n')

  // 마켓플레이스 표
  lines.push('## 등록된 마켓플레이스 (extraKnownMarketplaces)\n')
  lines.push('| 마켓플레이스 ID | 소스 | 설명 |')
  lines.push('|--------------|------|------|')

  // 알려진 마켓플레이스 메타
  const MP_DESC = {
    'obsidian-skills': 'Obsidian 볼트 플러그인',
    'openai-codex': 'OpenAI Codex CLI 연동',
    'anthropic-agent-skills': 'Anthropic 공식 에이전트 스킬',
    'omc': 'Oh My Claude Code',
    'claude-plugins-official': 'Claude Code 공식 플러그인 컬렉션',
    'everything-claude-code': '확장 플러그인 컬렉션',
    'ecc': 'Everything Claude Code 축약',
    'ui-ux-pro-max-skill': 'UI/UX Pro Max 전문 스킬',
  }

  if (Object.keys(marketplaces).length === 0) {
    lines.push('| (없음) | — | — |')
  } else {
    for (const [id, src] of Object.entries(marketplaces)) {
      const desc = MP_DESC[id] ?? '—'
      lines.push(`| \`${id}\` | \`${mpSourceStr(src)}\` | ${desc} |`)
    }
  }

  return lines.join('\n')
}

function updatePluginsRegistry(enabled, disabled, marketplaces) {
  const START = '<!-- PLUGIN-REGISTRY-START -->'
  const END = '<!-- PLUGIN-REGISTRY-END -->'

  let content = existsSync(PLUGINS_REGISTRY)
    ? readFileSync(PLUGINS_REGISTRY, 'utf8')
    : buildDefaultPluginsFile()

  const newBlock = buildPluginsBlock(enabled, disabled, marketplaces)
  const updated = replaceMarkerBlock(content, START, END, newBlock)

  if (!DRY_RUN) {
    writeFileSync(PLUGINS_REGISTRY, updated, 'utf8')
  }
  console.log(`[plugin-inventory] registry-plugins.md ${DRY_RUN ? '(dry-run)' : '갱신'} — 활성 ${enabled.length}, 비활성 ${disabled.length}`)
}

function buildDefaultPluginsFile() {
  return `---
tags:
  - area/system
  - type/registry
  - status/active
date: ${new Date().toISOString().slice(0, 10)}
up: "[[_tools-index]]"
aliases:
  - 플러그인레지스트리
  - registry-plugins
---
# registry-plugins

> Claude Code 플러그인 레지스트리. \`plugin-inventory.mjs\` 실행 시 활성/비활성 표가 자동 재생성된다.
> 수동 수정은 <!-- MANUAL-NOTES --> 구역에만 — 나머지는 스크립트가 덮어씀.

---

<!-- PLUGIN-REGISTRY-START -->
<!-- PLUGIN-REGISTRY-END -->

---

## 팀원 설치 가이드

<!-- MANUAL-NOTES -->
## 수동 메모
<!-- /MANUAL-NOTES -->

---

## 연결

- [[_tools-index|도구 인덱스]]
- [[_HARNESS-SYSTEM|하네스 시스템]]
`
}

// ─── registry-mcp.md 재생성 ─────────────────────────────

/**
 * settings.mcpServers 에서 settings 등록 MCP만 섹션 재생성.
 * <!-- MCP-SETTINGS-START/END --> 마커 사이만 교체.
 */
function buildMcpSettingsBlock(mcpServers) {
  const lines = []
  lines.push('## settings.json 등록 MCP 서버 (자동 생성)\n')
  lines.push('| 서버명 | 실행 방식 | 커맨드 | 상태 | 용도 |')
  lines.push('|-------|---------|--------|------|------|')

  const MCP_META = {
    'hwp-mcp': { desc: '한글(.hwp/.hwpx/.docx) 문서 읽기·편집', status: '활성' },
  }

  if (Object.keys(mcpServers).length === 0) {
    lines.push('| (없음) | — | — | — | — |')
  } else {
    for (const [name, cfg] of Object.entries(mcpServers)) {
      const type = cfg.type ?? (cfg.command ? 'stdio' : '—')
      const cmd = cfg.command
        ? `\`${cfg.command}${cfg.args?.length ? ' ' + cfg.args.join(' ') : ''}\``
        : '—'
      const meta = MCP_META[name] ?? { desc: '—', status: '활성' }
      lines.push(`| \`${name}\` | ${type} | ${cmd} | ${meta.status} | ${meta.desc} |`)
    }
  }

  return lines.join('\n')
}

function updateMcpRegistry(mcpServers) {
  const START = '<!-- MCP-SETTINGS-START -->'
  const END = '<!-- MCP-SETTINGS-END -->'

  if (!existsSync(MCP_REGISTRY)) {
    console.warn(`[plugin-inventory] registry-mcp.md 없음 — 마커 섹션만 추가 불가. 수동 생성 필요.`)
    return
  }

  let content = readFileSync(MCP_REGISTRY, 'utf8')

  // 마커 없으면 파일 끝 앞(## 연결 앞)에 삽입
  if (!content.includes(START)) {
    // ## 연결 섹션 앞에 삽입
    const linkIdx = content.lastIndexOf('\n## 연결')
    const insertAt = linkIdx === -1 ? content.length : linkIdx
    const marker = `\n\n${START}\n${END}\n`
    content = content.slice(0, insertAt) + marker + content.slice(insertAt)
  }

  const newBlock = buildMcpSettingsBlock(mcpServers)
  const updated = replaceMarkerBlock(content, START, END, newBlock)

  if (!DRY_RUN) {
    writeFileSync(MCP_REGISTRY, updated, 'utf8')
  }
  console.log(`[plugin-inventory] registry-mcp.md ${DRY_RUN ? '(dry-run)' : '갱신'} — settings MCP ${Object.keys(mcpServers).length}개`)
}

// ─── 메인 ───────────────────────────────────────────────

const settings = loadSettings()
const marketplaces = parseMarketplaces(settings)
const { enabled, disabled } = parsePlugins(settings)
const mcpServers = parseMcpServers(settings)

updatePluginsRegistry(enabled, disabled, marketplaces)
updateMcpRegistry(mcpServers)

if (DRY_RUN) {
  console.log('[plugin-inventory] dry-run 완료 — 파일 변경 없음')
} else {
  console.log('[plugin-inventory] 완료')
}
