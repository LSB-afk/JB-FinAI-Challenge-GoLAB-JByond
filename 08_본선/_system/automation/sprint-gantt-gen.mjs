// ponytail: stdlib only, no deps. Re-run whenever 48h-스프린트-시간간트.md changes.
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dir, '..', '..')
const VIZ = join(__dir, '..', 'visualizations')
const GENERATED_AT = '2026-07-03 KST'

// ── Element builders ──────────────────────────────────────────────────────────
let _id = 0
const uid = () => `viz-${++_id}`
const seed = (i) => 1000 + i * 7
const vnonce = (i) => 2000 + i * 13

const base = (i, extra = {}) => ({
  id: uid(),
  angle: 0,
  strokeColor: '#1e293b',
  backgroundColor: 'transparent',
  fillStyle: 'solid',
  strokeWidth: 1,
  strokeStyle: 'solid',
  roughness: 1,
  opacity: 100,
  groupIds: [],
  frameId: null,
  roundness: null,
  seed: seed(i),
  version: 1,
  versionNonce: vnonce(i),
  isDeleted: false,
  boundElements: null,
  updated: 1,
  link: null,
  locked: false,
  ...extra,
})

const rect = (i, x, y, w, h, bg = '#e0f2fe', stroke = '#1e293b') => ({
  ...base(i),
  type: 'rectangle',
  x, y, width: w, height: h,
  backgroundColor: bg,
  strokeColor: stroke,
})

const text = (i, x, y, w, h, t, fontSize = 14, align = 'center', color = '#1e293b') => ({
  ...base(i),
  type: 'text',
  x, y, width: w, height: h,
  text: t,
  strokeColor: color,
  fontSize,
  fontFamily: 1,
  textAlign: align,
  verticalAlign: 'top',
  baseline: Math.round(fontSize * 1.25),
  containerId: null,
  originalText: t,
  lineHeight: 1.25,
})

const arrow = (i, x, y, dx, dy) => ({
  ...base(i),
  type: 'arrow',
  x, y, width: Math.abs(dx), height: Math.abs(dy),
  points: [[0, 0], [dx, dy]],
  startBinding: null,
  endBinding: null,
  startArrowhead: null,
  endArrowhead: 'arrow',
})

const line = (i, x, y, dx, dy, color = '#94a3b8', style = 'solid') => ({
  ...base(i),
  type: 'line',
  x, y,
  width: Math.abs(dx),
  height: Math.abs(dy),
  points: [[0, 0], [dx, dy]],
  startBinding: null,
  endBinding: null,
  startArrowhead: null,
  endArrowhead: null,
  strokeColor: color,
  strokeStyle: style,
})

const weekdayKo = (dateLike) =>
  new Intl.DateTimeFormat('ko-KR', { weekday: 'short', timeZone: 'Asia/Seoul' })
    .format(new Date(`${dateLike}T00:00:00+09:00`))

const readMaybe = (path, fallback = '') => existsSync(path) ? readFileSync(path, 'utf8') : fallback

const metaBox = (elements, i, x, y, w, source, trigger, owner, quality = 'mixed') => {
  elements.push(rect(i, x, y, w, 88, '#f8fafc', '#94a3b8'))
  elements.push(text(i + 1, x + 12, y + 10, w - 24, 16, `Source: ${source}`, 9, 'left', '#334155'))
  elements.push(text(i + 2, x + 12, y + 28, w - 24, 16, `Last generated: ${GENERATED_AT}`, 9, 'left', '#334155'))
  elements.push(text(i + 3, x + 12, y + 46, w - 24, 16, `Data quality: ${quality}`, 9, 'left', '#334155'))
  elements.push(text(i + 4, x + 12, y + 64, w - 24, 16, `Next: ${trigger} · Owner: ${owner}`, 9, 'left', '#334155'))
}

const save = (filename, elements) => {
  const out = {
    type: 'excalidraw',
    version: 2,
    source: 'https://excalidraw.com',
    elements,
    appState: { viewBackgroundColor: '#ffffff', gridSize: null },
    files: {},
  }
  writeFileSync(join(VIZ, filename), JSON.stringify(out, null, 2), 'utf8')
  console.log(`✓ ${filename}: ${elements.length} elements`)
}

const truncate = (value, max = 28) => value.length > max ? `${value.slice(0, max - 1)}…` : value

const hourLabel = (h) => {
  const absoluteHour = 20 + h
  const clock = `${String(absoluteHour % 24).padStart(2, '0')}:00`
  if (h === 4) return `${clock}\n7/4`
  if (h === 28) return `${clock}\n7/5`
  return clock
}

const buildSprintGantt = () => {
  _id = 0
  readMaybe(join(ROOT, '03_제품/00_결정-준비/48h-스프린트-시간간트.md'))
  const elements = []
  const x0 = 340
  const y0 = 92
  const pastW = 110
  const hourW = 55
  const rowH = 90
  const pastTotalW = pastW * 3
  const timelineW = pastTotalW + hourW * 39
  const boardW = x0 + timelineW - 50
  const laneStartY = y0 + 62
  const hourX = (h) => x0 + pastTotalW + h * hourW
  const pastX = (k) => x0 + k * pastW
  const barColor = (bar, laneIndex) => {
    if (bar.travel) return '#94a3b8'
    if (bar.crit) return ['#dc2626', '#b91c1c', '#f59e0b', '#c2410c', '#7c3aed'][laneIndex] ?? '#dc2626'
    return ['#4a9eed', '#0891b2', '#2563eb', '#0f766e', '#6d28d9'][laneIndex] ?? '#4a9eed'
  }

  const lanes = [
    {
      name: '1. 개발',
      humans: '🧑 이승보',
      robots: '🤖 Claude Codex API · EXAONE 로컬모델',
      bg: '#e8f4fd',
      done: '7/1 아이디어회의 제품정의합의 · 7/2 역할축UX검토 · 7/3 프로토타입DB연결 과제정리 (완료)',
      bars: [
        { s: 0, e: 2, label: '앱 설계 정합(조직도·역할축·2트랙 콘솔)', owner: '🧑이승보', tag: 'dev1' },
        { s: 2, e: 5, label: '핵심 기능 골든패스(전주카페 여신)', owner: '🧑이승보', tag: 'dev2' },
        { s: 5, e: 9, label: '리스크판단 에이전트 실동작(Claude/Codex API)', owner: '🧑이승보 · 🤖Claude+Codex', tag: 'after dev2 · crit', crit: true },
        { s: 9, e: 12, label: '로컬모델 EXAONE 데모 라우팅', owner: '🧑이승보 · 🤖EXAONE', tag: 'after dev3 · crit', crit: true },
        { s: 12, e: 14, label: '은행DB/하이브리드 연동 명문화', owner: '🧑이승보', tag: 'after dev4' },
        { s: 14, e: 17, label: '전북은행 여신·전세보호·피싱 화면 연결', owner: '🧑이승보', tag: 'after dev5' },
        { s: 17, e: 19, label: 'JB우리캐피탈 여신 사후관리 EWS 화면 연결', owner: '🧑이승보', tag: 'after dev6' },
        { s: 17, e: 19, label: '🚌 현장 세팅 정읍(추정)', owner: '🧑이승보', tag: '정읍/현장 · parallel', travel: true, level: 1 },
        { s: 19, e: 21, label: '키보드 인터랙션 승인 UX 구현', owner: '🧑이승보', tag: 'after dev7' },
        { s: 32.5, e: 34.5, label: '배포 URL 준비', owner: '🧑이승보', tag: '제출물#5 · crit', crit: true },
        { s: 34.5, e: 35.5, label: '제출 전 기능 동작 고정', owner: '🧑이승보', tag: 'after sub_url · crit', crit: true },
        { s: 37, e: 38, label: '🚌 현장 발표 시연 지원(추정)', owner: '🧑이승보', tag: '정읍/현장', travel: true },
      ],
    },
    {
      name: '2. 디자인·발표',
      humans: '🧑 김민주',
      robots: '🤖 design-ai(Figma/Claude)',
      bg: '#fef3c7',
      done: '7/1 JB웹사이트 분석 · 7/2 키보드 중심 인터랙션 확정 · 7/3 발표흐름·브랜딩 과제정리 (완료)',
      bars: [
        { s: 0, e: 2, label: 'JB 디자인 시스템 토큰 잠금', owner: '🧑김민주', tag: 'ux1' },
        { s: 2, e: 5, label: '콘솔 2트랙 화면 톤 업데이트', owner: '🧑김민주', tag: 'after ux1' },
        { s: 5, e: 7, label: '이름/슬로건 브랜딩 후보 정리', owner: '🧑김민주', tag: 'after ux2' },
        { s: 7, e: 9, label: '위험 업무 승인 UX 후보 정리', owner: '🧑김민주', tag: 'after ux3' },
        { s: 16, e: 19, label: '5분 발표 흐름 원고 정리', owner: '🧑김민주', tag: 'ux5' },
        { s: 19, e: 21, label: '시연 시나리오 리허설 1차', owner: '🧑김민주', tag: 'after dev7' },
        { s: 20, e: 22, label: '🚌 현장 리허설 정읍(추정)', owner: '🧑김민주', tag: '정읍/현장', travel: true, level: 1 },
        { s: 26.5, e: 29.5, label: '발표자료 PDF 최종화', owner: '🧑김민주', tag: '제출물#3 · crit', crit: true },
        { s: 29.5, e: 32.5, label: '시연영상 녹화·렌더링', owner: '🧑김민주·🧑이승보', tag: '제출물#4 · crit', crit: true },
        { s: 37, e: 38, label: '🚌 발표 시연 본방(추정)', owner: '🧑김민주', tag: '정읍/현장', travel: true },
      ],
    },
    {
      name: '3. 문서·설계·API',
      humans: '🧑 김주용',
      robots: '🤖 evidence(Haiku) · submission(Sonnet)',
      bg: '#ecfdf5',
      done: '7/1 총정리본 검증 · 7/2 설득패키지 리서치 회수 · 7/3 결정현황 종합·업무분장 로그 (완료)',
      bars: [
        { s: 0, e: 2, label: '하나의 금융AX콘솔 설명 구조', owner: '🧑김주용', tag: 'doc1' },
        { s: 2, e: 5, label: '에이전트 14 로스터·기능 구조 정합', owner: '🧑김주용', tag: 'after doc1' },
        { s: 5, e: 8, label: '스킬/MCP·은행DB·오픈API 카탈로그', owner: '🧑김주용', tag: 'after doc2' },
        { s: 12, e: 14, label: '로컬모델×Claude/Codex 하이브리드 아키텍처', owner: '🧑김주용', tag: 'after dev4' },
        { s: 14, e: 16, label: '시연 스토리(전주카페·전세·피싱) 정리', owner: '🧑김주용', tag: 'after doc4' },
        { s: 19, e: 21, label: '🚌 현장 QA 답변 준비 정읍(추정)', owner: '🧑김주용', tag: '정읍/현장', travel: true },
        { s: 24, e: 27, label: '기능명세서(변경이력 포함) PDF', owner: '🧑김주용', tag: '제출물#1 · 변경이력 필수', crit: true },
        { s: 27, e: 30, label: 'MVP 제안서 최종본', owner: '🧑김주용', tag: '제출물#2 · crit', crit: true },
        { s: 34.5, e: 36.5, label: 'GitHub README 제출본', owner: '🧑김주용', tag: '제출물#6 · crit', crit: true },
        { s: 36.5, e: 37.5, label: '최종 제출 패키지 점검', owner: '🧑김주용', tag: 'after sub_readme · crit', crit: true },
        { s: 37, e: 38, label: '🚌 발표 시연 공동 대응(추정)', owner: '🧑김주용', tag: '정읍/현장', travel: true, level: 1 },
      ],
    },
    {
      name: '4. 서포트·외부확인',
      humans: '🧑 최영욱',
      robots: '🤖 GPT딥리서치 · evidence',
      bg: '#f8fafc',
      done: '7/1 팀로스터·역할정리 · 7/2 공공데이터·차별점 과제수령 · 7/3 전세/피싱출처·KIPRIS 과제정리 (완료)',
      bars: [
        { s: 0, e: 3, label: '공공데이터 출처 확인·전세/피싱 공식숫자', owner: '🧑최영욱', tag: 'sup1' },
        { s: 3, e: 5, label: 'KIPRIS 상표검색(LocalGuard)', owner: '🧑최영욱', tag: 'after sup1' },
        { s: 5, e: 9, label: '은행 자동화 차별점 GPT딥리서치 회수', owner: '🧑최영욱', tag: 'after sup2' },
        { s: 9, e: 12, label: '사후관리 EWS 캐피탈 적용성 확인', owner: '🧑최영욱', tag: 'after sup3' },
        { s: 16, e: 18, label: '발표 근거 출처 최종 체크', owner: '🧑최영욱', tag: 'after doc5' },
        { s: 16, e: 18, label: '🚌 현장 이동 정읍(추정)', owner: '🧑최영욱', tag: '정읍/현장 · parallel', travel: true, level: 1 },
        { s: 32.5, e: 33.5, label: '시연영상·제출물 외부 리스크 점검', owner: '🧑최영욱', tag: 'after sub_video' },
        { s: 36.5, e: 37.5, label: '🚌 현장 서포트·규정 확인(추정)', owner: '🧑최영욱', tag: '정읍/현장', travel: true },
      ],
    },
    {
      name: '5. AI오케스트레이션',
      humans: '🧑 AI오케스트레이션',
      robots: '🤖 Claude Opus/Sonnet · Codex GPT-5.5',
      bg: '#f5f3ff',
      done: '7/1 딥리서치 27종 회수검증 · 7/2 리서치지도·설득패키지 조립 · 7/3 결정준비 배치·viz 3보드 생성 (완료)',
      bars: [
        { s: 0, e: 2, label: '앱 설계 정합 감사', owner: '🤖orchestrator', tag: 'ai1' },
        { s: 2, e: 5, label: 'Claude/Codex API 프롬프트 계약', owner: '🤖orchestrator', tag: 'after ai1' },
        { s: 12, e: 14, label: '로컬모델 데모 폴백 점검', owner: '🤖orchestrator', tag: 'after dev4 · crit', crit: true },
        { s: 18, e: 22, label: '🚌 현장 로그·증빙 누적(추정)', owner: '🤖evidence', tag: '정읍/현장', travel: true },
        { s: 21, e: 23, label: '발표 질의응답 적대검증', owner: '🤖orchestrator', tag: 'after ux6' },
        { s: 21, e: 24, label: 'JudgeQA 정적검증·E2E 스크린샷', owner: '🤖judge-qa', tag: 'after dev8', level: 1 },
        { s: 37.5, e: 38.5, label: '제출물 정합성 최종검사', owner: '🤖orchestrator', tag: 'after doc6 · crit', crit: true },
      ],
    },
  ]

  const pastHeaders = ['7/1 (완료)', '7/2 (완료)', '7/3 09~20 (완료)']
  const fullHeight = lanes.length * rowH + 130

  elements.push(text(0, 40, 18, 1100, 36, '48h 스프린트 시간 간트 — 제출물 역산·현장 이동·AI 오케스트레이션', 22, 'left'))
  elements.push(text(1, 42, 52, 1500, 22, `기준: 2026-07-03 20:00 KST = h0 · 7/4(${weekdayKo('2026-07-04')})~7/5(${weekdayKo('2026-07-05')}) 정읍 현장 · 마감 2026-07-05 10:30 KST`, 12, 'left'))
  elements.push(rect(10, 40, y0 - 10, x0 + timelineW - 10, 52, '#1e1e2e', 'transparent'))
  elements.push(text(11, 55, y0 + 8, 260, 20, '트랙 / 담당 / 시간', 12, 'left', '#e5e7eb'))

  pastHeaders.forEach((label, i) => {
    const x = pastX(i)
    elements.push(text(30 + i, x, y0 - 1, pastW - 8, 30, label, 10, 'center', '#f8fafc'))
    elements.push(line(60 + i, x, y0 + 42, 0, fullHeight, '#d1d5db', 'dashed'))
  })
  elements.push(line(63, x0 + pastTotalW, y0 + 42, 0, fullHeight, '#94a3b8', 'solid'))

  Array.from({ length: 39 }, (_, h) => h).forEach((h) => {
    const x = hourX(h)
    const dayColor = h >= 24 ? '#fecaca' : '#f8fafc'
    elements.push(text(80 + h, x, y0 - 3, hourW - 7, 34, hourLabel(h), 10, 'center', dayColor))
    elements.push(line(130 + h, x, y0 + 42, 0, fullHeight, '#d1d5db', 'dashed'))
  })

  lanes.forEach((lane, i) => {
    const y = laneStartY + i * rowH
    elements.push(rect(200 + i, 40, y, boardW, rowH - 8, lane.bg, 'transparent'))
    elements.push(text(220 + i, 56, y + 10, 220, 18, lane.name, 12, 'left'))
    elements.push(text(240 + i, 56, y + 33, 260, 14, lane.humans, 8, 'left', '#334155'))
    elements.push(text(260 + i, 56, y + 52, 270, 14, lane.robots, 8, 'left', '#6d28d9'))

    const doneX = x0 + 8
    const doneW = pastTotalW - 16
    elements.push(rect(280 + i, doneX, y + 18, doneW, 42, '#94a3b8', 'transparent'))
    elements.push(text(300 + i, doneX + 8, y + 21, doneW - 16, 12, 'done 7/1~7/3', 8, 'center', '#ffffff'))
    elements.push(text(320 + i, doneX + 8, y + 35, doneW - 16, 10, truncate(lane.done, 48), 7, 'center', '#ffffff'))
    elements.push(text(340 + i, doneX + 8, y + 49, doneW - 16, 10, '압축 과거 3칸', 7, 'center', '#e0f2fe'))

    lane.bars.forEach((bar, j) => {
      const x = hourX(bar.s) + 5
      const w = Math.max(42, (bar.e - bar.s) * hourW - 10)
      const levelY = y + (bar.level ? 45 : 18)
      const h = bar.level ? 32 : 42
      const color = barColor(bar, i)
      const stroke = bar.travel ? '#64748b' : 'transparent'
      elements.push(rect(380 + i * 30 + j, x, levelY, w, h, color, stroke))
      elements.push(text(560 + i * 30 + j, x + 5, levelY + 3, w - 10, 11, truncate(bar.label, Math.max(12, Math.floor(w / 7))), 8, 'center', '#ffffff'))
      elements.push(text(740 + i * 30 + j, x + 5, levelY + 17, w - 10, 10, truncate(bar.owner, Math.max(10, Math.floor(w / 8))), 7, 'center', '#ffffff'))
      elements.push(text(920 + i * 30 + j, x + 5, levelY + 29, w - 10, 9, truncate(bar.tag, Math.max(10, Math.floor(w / 8))), 7, 'center', '#e0f2fe'))
    })
  })

  const milestoneX = hourX(38.5)
  elements.push(line(1100, milestoneX, y0 + 34, 0, fullHeight + 20, '#dc2626'))
  elements.push(text(1101, milestoneX - 58, laneStartY + lanes.length * rowH + 10, 116, 20, '◆ 10:30 마감 제출', 10, 'center', '#dc2626'))
  elements.push(text(1102, milestoneX - 70, y0 + 14, 140, 18, '◆ 본선 제출 마감 10:30', 10, 'center', '#fecaca'))

  const checklistY = laneStartY + lanes.length * rowH + 42
  elements.push(rect(1120, 40, checklistY, boardW, 55, '#fff7ed', '#f59e0b'))
  elements.push(text(1121, 56, checklistY + 16, 210, 18, '📦 제출물 6종', 12, 'left', '#92400e'))
  ;[
    { h: 27, label: '기능명세서 PDF\n20:00 · 변경이력 필수', row: 0 },
    { h: 30, label: 'MVP 제안서 PDF\n23:00', row: 1 },
    { h: 29.5, label: '발표자료 PDF\n22:30', row: 0 },
    { h: 32.5, label: '시연영상\n01:30', row: 1 },
    { h: 34.5, label: '배포 URL\n04:30', row: 0 },
    { h: 36.5, label: 'GitHub README\n06:30', row: 1 },
  ].forEach((item, i) => {
    const x = hourX(item.h)
    const y = checklistY + 8 + item.row * 21
    elements.push(rect(1130 + i, x, y, 86, 18, '#f59e0b', '#92400e'))
    elements.push(text(1150 + i, x + 5, y + 3, 76, 14, item.label, 7, 'center', '#ffffff'))
  })

  const legendY = checklistY + 80
  elements.push(rect(1200, 40, legendY, boardW, 78, '#f8fafc', '#94a3b8'))
  elements.push(text(1201, 60, legendY + 13, 1640, 22, '범례: 파랑/청록=작업 · 적/주황=critical/제출물 의존 · 회색=완료/현장 이동 추정 · 점선=시간 그리드 · 실선/◆=10:30 제출 마감', 12, 'left'))
  elements.push(text(1202, 60, legendY + 39, 1780, 18, 'bar 3줄: 산출물 / 🧑담당·🤖AI / 선행 작업 id 또는 정읍·현장 태그. 과거 7/1~7/3은 레인별 done 바 하나로 압축 표시.', 10, 'left', '#334155'))
  metaBox(elements, 1240, 2180, legendY + 8, 590, '48h-스프린트-시간간트.md, 48h-스프린트-마스터.md', '시간표·제출물·담당 변경', 'AI오케스트레이션', 'estimate')

  return elements
}

save('48h-스프린트-시간간트.excalidraw', buildSprintGantt())
