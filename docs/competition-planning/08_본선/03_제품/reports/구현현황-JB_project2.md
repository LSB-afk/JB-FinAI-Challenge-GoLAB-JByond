---
tags: [area/product, type/reference, status/active]
date: 2026-07-04
up: "[[INDEX|제품 인덱스]]"
aliases: [JB_project2 구현현황, implementation-inventory]
---

# JB_project2 구현현황 — 페이지·뷰·컴포넌트·함수·데이터 총정리 (코드 SSOT)

> 대상: `_vendor/JB_project2/app/` (읽기 전용 벤더 클론, 이승보 프로토타입 = 제출 코드정본). 모든 수치는 `grep`/파일 직독으로 확인한 실측치이며, 확인 안 된 항목은 `[미확인]`으로 표시했다.
>
> **⚠ 델타 — 재실측 완료 2026-07-05 (0226bd6)**: 아래 §0~§8 원문은 `e57b826` 기준 실측이었다. 이후 **RM 역할 하네스 신설**이 들어와 `_vendor/JB_project2` HEAD `0226bd6` 기준으로 전 항목 재실측했다(§0/§1/§2/§5/§6/§8에 인라인 반영, 원 수치는 보존하고 갱신치를 병기). 핵심 변화: `rmOfficer.*` **15개 신규 파일(2,693줄)**, `RMO_VIEWS` **16개 뷰**(당초 가정 15개가 아님 — `audit-logs` 포함), 전용 에이전트 11개·스킬 11개, 전용 DB 13테이블, e2e 2개 파일 3개 시나리오. **가장 중요한 정정**: org-rail의 "역할=RM" 클릭은 이제 레거시 `rmDashboardPage`(app.js:1769)가 아니라 **신규 `rm-officer-harness`로 연결**된다(app.js:5546-5548 `data-role-filter="RM"` 핸들러). 레거시 `rm-dashboard`는 UI에서 도달 불가능한 고아 라우트로 남아 있고(직접 해시 이동 `#rm-dashboard` 시에만 렌더링), 아래 §1/§2의 "RM 대시보드 = 역할 RM 트리거" 서술은 이 재검증으로 갱신됐다.
>
> **⚠ 델타 — 재실측 2026-07-05 #2 (8c274b5)**: 0226bd6 이후 10커밋(+12,034줄, 68파일)이 추가로 들어왔다. `app/` 단독으로 **75개 파일, 35,915줄**(0226bd6 대비 +20파일/+8,399줄). 핵심 변화 3가지 — ① **`server/` 백엔드 신설**(§10): `JB_DB_DRIVER` 환경변수로 localStorage/파일DB(JSON)/Supabase 3단 스토리지 옵션, 키는 env 전용으로 코드에 미노출 확인. ② **Ollama 실연동 경로 신설**(§11): `scripts/ollama-agent-proxy.mjs`(:8030, 금지패턴 4종(승인단정·금리한도·신용등급단정·PII의심) 필터 내장) + `app/agentModelSettings.js` 토글 — 단, 메인 판단·초안 생성 루프(`recordCorporateCreditAgentRun`/`recordRmOfficerAgentRun`)는 여전히 결정론적 mock이고, Ollama는 하네스 뷰의 **별도 "샘플 요청" 버튼**을 눌러야만 실행되는 opt-in 경로다(호출부에 `forceOllama`/runtime 게이트 있음 — 과장 금지). ③ **`corporate-credit` 하네스 이중등록 버그 발견**(§12, 이번 실측 최대 쟁점) — `harnessRegistry.js`가 `id: "corporate-credit"`를 **두 번** 등록하는데, 두 번째(cclConsole 기반) 블록이 참조하는 `CCL_ROLE_KEY` 등은 **어디에도 로드되지 않는 파일**(`cclConsole.*.js`, index.html에 script 태그 없음)의 심볼이라 **`ReferenceError`로 즉시 중단**된다. 그 여파로 같은 파일 내 이후 등록(`fds-response`, 중복 `rm-officer`)이 통째로 누락돼 **FDS 콘솔의 훅 기반 가드레일(`beforeCaseCreate`/`beforeAgentRun`/`beforeCustomerMessage`)이 항상 `{ok:true}`로 무력화**된다. 실제 라이브 렌더 경로(신규 `corporateCredit.*` 15파일/2,036줄, `CCR_ROLE_KEY`)는 이 버그와 무관하게 정상 작동하며 결과적으로 의도한 하네스가 이긴다(우연).

## 0. 파일 구성 (실측)

당초 CLAUDE.md 설명(`index.html` + `app.js` ~250KB + `modules.js` + `styles.css` ~150KB)보다 훨씬 커졌다. e57b826 기준 실제 앱 디렉터리는 **43개 파일, 총 24,667줄**의 4-콘솔 번들 구조였다.

**재실측(2026-07-05, 0226bd6)**: `app/*.js *.css *.html` 전체 **55개 파일, 총 27,516줄**(`wc -l` 직접 합산). RM 역할 하네스 신설로 **`rmOfficer.*` 15개 신규 파일, 2,693줄**이 추가됐다.

**재실측(2026-07-05 #2, 8c274b5)**: `app/*.js *.css *.html` 전체 **75개 파일, 총 35,915줄**(0226bd6 대비 +20파일/+8,399줄). 순증 최대 항목은 **`corporateCredit*.js` 15개 파일(2,036줄, 신규 독립 CCR 하네스)** + `agentModelSettings.js`(238줄). `app/` 바깥에도 신규 영역이 생겼다 — `server/`(5파일, 994줄), `scripts/ollama-agent-proxy.mjs`(179줄), `tests/backend/server.test.mjs`(320줄). 상세는 §10·§11.

| 파일군 | 파일 수 | 대표 파일(줄 수) |
|---|---|---|
| 코어/셸 | index.html(120), app.js(5,766), modules.js(865) | 원본 MVP 로직 + 셸 |
| 하네스 엔진 | harnessCore.js(141), harnessRegistry.js(153), harnessVerification.js(101) | 공유 가드레일/자체검증 |
| 기업여신(CCL) 콘솔 | cclConsole.core/data/app.js(244+280+397=921줄) | — |
| FDS/피싱(FDR) 콘솔 | fdrConsole.core/data/app.js(253+302+421=976줄) | — |
| 전세보호(JPO) 콘솔 | jeonseProtection\* 14개 파일(약 3,300줄) | 가장 큰 콘솔 |
| JB우리캐피탈(JBWC) 콘솔 | jbWooriCapital\*, wooricap\* 10개 파일(약 2,600줄) + wooricap.css(771줄) | 자체 CSS 파일 별도 보유 |
| **RM 역할 하네스(신규)** | **`rmOfficer*.js` 15개 파일(2,693줄)** — rmOfficer-db.js(356) · rmOfficerAgents.registry.js(319) · rmOfficerServices.js(413) · rmOfficer.view.board.js(164) · rmOfficerDeliverable.service.js(225) · rmOfficerHarness.js(203) 등 | 콘솔 5종째, 자체 CSS 없음(styles.css 공용) |
| 스타일 | styles.css(8,696줄), wooricap.css(771줄) | 디자인 토큰/컴포넌트 |

`index.html`의 `<script>` 로드 순서(재실측): `modules.js → harnessCore.js → (JBWC 번들) → (JPO 번들) → cclConsole.* → fdrConsole.* → **rmOfficer.config/Agents/Rules/Priority/Deliverable/db/Services/helpers/view.*/commands/sidebar → rmOfficerHarness.js** → harnessRegistry.js → harnessVerification.js → app.js`(마지막, 메인 오케스트레이터). `index.html` 주석 원문: "RM은 jbwc/jpo/ccl/fdr 콘솔보다 먼저 로드한다: 그 네 콘솔은 rmOfficer를 모르므로(ccl/fdr은 수정 금지 파일)".

---

## 1. 역할 콘솔 / 계열사·역할축

`index.html`의 `org-rail`은 **계열사 전환**(전체/전북은행/JB우리캐피탈)과 **역할 전환**(RM/기업여신 담당자/전세보호 담당자/보이스피싱·FDS 담당자) 두 축을 별도로 노출한다. e57b826 기준 실제로 구현된 진입점은 6개였다.

| 진입점 | 트리거 | roleKey/routeBase | 비고 |
|---|---|---|---|
| 기본 업무 보드(원본 MVP) | 계열사=전체/전북은행 | (route-key 없음, `navigation` 배열, 15개 아이템) | app.js 고유, 예선부터 있던 케이스 대시보드 |
| ~~RM 대시보드~~ (레거시, 재실측으로 고아 라우트 확인) | (UI에서 도달 불가 — 직접 해시 이동만) | `rm-dashboard` (단일 뷰, 하위 라우트 없음) | app.js:1769 `rmDashboardPage`. 아래 참고 |
| 기업여신 담당자 콘솔(CCL) | 역할=기업여신 담당자 | `corporate-credit` / `/roles/corporate-credit` | cclConsole.\* — **[8c274b5 이후 죽은 코드, §12 참고]** 실제 라이브 경로는 `corporateCredit.*`(CCR) 15파일로 대체됨 |
| FDS/보이스피싱 담당자 콘솔(FDR) | 역할=보이스피싱/FDS 담당자 | `fds-response` / `/roles/fds-response` | fdrConsole.\* |
| 전세보호 담당자 콘솔(JPO) | 역할=전세보호 담당자 | `jeonse-protection` / `/roles/jeonse-protection` | jeonseProtection.\* (가장 방대) |
| JB우리캐피탈 콘솔(JBWC) | 계열사=JB우리캐피탈 | `/jb-woori-capital` | wooricap.\*, jbWooriCapital\* — **역할 전환이 아니라 계열사 전환**에 걸림 |

라우팅은 `app.js:5705` `applyHashRoute()`가 4개 콘솔의 `xxxRouteFromHash()`를 순서대로 시도(jbwc → jpo → ccl → fdr)한 뒤에야 원본 `navigation` 매칭으로 폴백하는 단일 디스패처 구조.

**재실측(2026-07-05, 0226bd6) — RM 콘솔 신설로 진입점 재편**: org-rail의 **"역할=RM" 버튼(`data-role-filter="RM"`) 클릭 핸들러(app.js:5546-5548)가 이제 레거시 `rm-dashboard`가 아니라 신규 `rm-officer-harness`로 이동**한다 — `activeView = "rm-officer-harness"` + `window.location.hash = rmoHashForView("board")`(기본 `#/roles/rm-officer/board`). 레거시 `rmDashboardPage`(app.js:1769-2200대)는 렌더 함수·`navigation` 폴백 목록(app.js:5770)에는 여전히 남아 있어 코드는 죽지 않았지만, **org-rail 어디에도 그리로 가는 트리거가 없다** — `#rm-dashboard` 해시를 직접 입력해야만 보이는 사실상 고아 라우트다.

| 진입점(신규) | 트리거 | roleKey/routeBase | 비고 |
|---|---|---|---|
| RM 업무지원 포털(신규 콘솔) | 역할=RM | `rm-officer-harness` / `/roles/rm-officer` (`RMO_ROUTE_BASE`) | rmOfficer.\* 15개 파일, `harnessRegistry.js:156`에 `id: "rm-officer"`로 정식 등록 |

총 진입점은 **7개**(기본 업무 보드 + 고아화된 legacy rm-dashboard + CCL + FDR + JPO + JBWC + 신규 rm-officer)로 늘었으나, 실질 UI 도달 가능 진입점은 6개(legacy rm-dashboard 제외)다.

---

## 2. 페이지/뷰/라우트 (콘솔별 전체 목록)

### 2-1. 기업여신 담당자(CCL) — 14개 뷰 (`cclConsole.core.js` `CCL_VIEWS`)
`board · cases · cases-new · doc-check · approval-drafts · financial-summary · repayment-check · policy-match · early-warning · consult-log · reply-drafts · ai-analysis · agent-harness · audit-logs`
칸반 컬럼(`CCL_BOARD_COLUMNS`, 6개): 신규 접수 → 자료 수집 → AI 검토 → 담당자 검토 필요 → 품의 진행 → 완료·보류.

### 2-2. FDS/보이스피싱 담당자(FDR) — 15개 뷰 (`fdrConsole.core.js:41-57`)
`board · cases · cases-new · block-review · escalations · anomaly-signals · elder-guard · pattern-summary · rule-status · contact-scripts · payment-hold-guide · follow-up · ai-analysis · agent-harness · audit-logs`

### 2-3. 전세보호 담당자(JPO) — 29개 뷰 (`jeonseProtection.config.js` `JPO_VIEWS`, 콘솔 중 최다)
`board · cases · cases-new · price-enrich · registry-check · guarantee-check · victim-application · urgent-auction · price-risk · rent-comparables · sale-comparables · official-price · building-check · landlord-risk · intake-consult · victim-guide · doc-checklist · legal-referral · finance-housing-referral · care-referral · support-referral · ai-analysis · ai-consult-summary · agent-harness · data-connectors · roles · audit-logs · inspections · case-full`
(라이브 데모 전용 `?live=1` 경로가 `jeonsePublicData.adapters.js`를 통해 실제 `fetch()`를 수행하는 유일한 뷰 — 나머지는 전부 로컬 seed.)

### 2-4. JB우리캐피탈(JBWC) — 24개 뷰 (`jbWooriCapitalSidebar.config.js` `JBWC_VIEWS`)
`board · approvals · audit-logs · privacy-permissions · integrations · cases · cases-new · ai-analysis · ai-assist · capabilities · roles · inspections · consumer-protection · alerts · personal-finance · auto-finance · mortgage-secured · enterprise-finance · customer-management · documents · vehicle-lifecycle · fds · complaints · agent-harness`

### 2-5. 원본 업무 보드(base app) — 15개 nav 아이템 + `rm-dashboard`(고아 라우트)
`app.js` 최상단 `navigation` 배열(15개, dashboard/approvals 등)과 별도 단일 페이지 `rm-dashboard`. 이 계층은 콘솔이 아니라 예선 단계부터 이어진 flat 페이지 목록이다. `rm-dashboard`는 §1 재실측대로 UI 트리거가 없는 고아 라우트.

### 2-6. RM 업무지원 포털(신규) — 16개 뷰 (`rmOfficer.config.js:93-110` `RMO_VIEWS`, 재실측 2026-07-05)

`board · consult-queue · approvals · policy-checklists · deliverables · cases · cases-new · disaster · repayment · daily-finance · policy-startup · agent-queue · agent-harness · data-connectors · roles · audit-logs`

라우트 베이스 `RMO_ROUTE_BASE = "/roles/rm-officer"`(rmOfficer.config.js:11). 다른 4콘솔과 달리 칸반 컬럼이 아니라 `RMO_STAGES = ["todo","doing","done"]` 3단계 진행축 + 4개 상담유형(`disasterRisk·repaymentCare·dailyFinance·policyStartup`) 축을 병행 노출. `rmoNavigation`(같은 파일 112-134)이 "오늘 처리할 일 / 상담 유형 / AI·자동화 관리" 3개 섹션으로 사이드바를 구성.

**총 라우트 실측치 갱신(소스 `*_VIEWS` 객체 전수): CCL 14 + FDR 15 + JPO 29 + JBWC 24 + base 15 + rm-dashboard 1 + RM 16 = 114개 뷰 키.** (2026-07-04 정정치 98에서 RM 16개 뷰 추가.) 참고: 팀 논의에서 "RMO_VIEWS 16뷰"로 언급된 적이 있으나 실측 결과 `audit-logs`를 포함해 **16개**가 정확하다.

### 2-7. RM 콘솔 작동 핵심 기능 (실코드 근거, 재실측 2026-07-05)

| 기능 | 위치 | 내용 |
|---|---|---|
| 키보드 퍼스트 | `rmoHandleKeydown` (rmOfficerHarness.js:61-91) | 보드 뷰에서 숫자키 `1`~`9`로 해당 순번 케이스 선택 → `rmoGo("board", {kind:"case", id})`. 케이스 상세에서 `↓/→/j`·`↑/←/k`로 승인 큐 이동, `Enter`로 `rmoDoApprove()` 실행, `Escape`로 모달 닫기/보드 복귀. input·textarea·select·contentEditable 포커스 중에는 비활성화. |
| 인라인 승인 | `rmoDoApprove` (rmOfficerHarness.js:50-59) | `approveRmOfficerAssignment(assignmentId)` 호출 → 에러/중복 실행 처리 → 통합 리포트 완성 시 `rmoState.mdTab = "통합본"`으로 전환하고 알림. 클릭(`data-rmo-approve` 버튼, rmOfficerHarness.js:139)과 키보드(Enter) 양쪽에서 동일 함수 호출. |
| 우선순위 서비스 | `rmOfficerPriority.service.js` (108줄) | `computeRmOfficerPriority` — 상담유형·위험도·SLA기한으로 점수·근거 산정, `rmoDaysUntil`·`rmoMaxRisk`·`rmoRiskRank` 보조. `rmoSortByUrgency`로 급한 순 정렬. |
| 산출물 서비스 | `rmOfficerDeliverable.service.js` (225줄) | `rmoBuildAgentDeliverable`(개별 에이전트 MD 생성)·`rmoBuildIntegratedDeliverable`(개별 산출물을 위키링크로 엮은 통합 리포트 생성) — 둘 다 템플릿 리터럴 조립, LLM 미호출(**MOCKED**, §4/§8과 동일 패턴). |
| e2e 2종 | `tests/e2e/rm-officer-smoke.spec.js`(1개), `tests/e2e/rm-officer.spec.js`(2개) | ① 스모크: 진입→보드→키보드 선택→승인(개별→통합 MD)→신규 접수→새로고침 완주. ② scope 격리 + 통합 MD 뷰어 탭 + 민감정보 검색 차단. ③ 보안 훅 차단(PII 접수/자동 종결) + 승인 결정. RM 전용 시나리오 총 3개. |

**총 e2e 시나리오 재실측**: `grep -c "test(" tests/e2e/*.spec.js` 합산 결과 **63개**(jeonse-protection 16 · jeonse-smoke 2 · localguard 24 · role-consoles 7 · wooricap 11 · rm-officer-smoke 1 · rm-officer 2) — §8 기존치 60에서 RM 3개 추가.

**재실측(2026-07-05 #2, 8c274b5)**: 8개 spec 파일 총 **73개** `test()`(corporate-credit-smoke 1 · jeonse-smoke 2 · localguard 25 · jeonse-protection 19 · rm-officer-smoke 1 · role-consoles 7 · rm-officer 7 · wooricap 11) — 신규 `corporate-credit-smoke.spec.js`(88줄) + `rm-officer.spec.js` 283줄 증가(2→7개 시나리오) + `localguard.spec.js` +23줄(24→25) + `jeonse-protection.spec.js` +3개(16→19). 별도로 `tests/backend/server.test.mjs`(320줄, Node `--test`)가 신설되어 `npm run backend:test`로 server/ 백엔드를 검증한다(§10).

---

## 3. 컴포넌트 (styles.css 실측)

- `styles.css` 고유 클래스 선택자: **484개**(`grep -oE '\.[a-zA-Z][a-zA-Z0-9_-]*' styles.css | sort -u | wc -l`)
- `wooricap.css`(JBWC 전용 별도 스타일시트) 고유 클래스: **53개** → 두 파일 합산 실질 컴포넌트 클래스 **537개** (과제 설명의 "~481개"는 styles.css 단독 수치와 근접, wooricap.css는 별도 카운트가 필요)

컴포넌트 계열(이름에 패턴 포함, 중복 제거 카운트):
| 계열 | 개수 |
|---|---|
| `*panel*` | 28 |
| `*card*` | 21 |
| `*board*` | 9 |
| `*badge*` | 6 |
| `*chip*` | 3 |
| `*pill*` | 2 (status-pill 등은 `status-*` 계열로 별도 분류됨) |
| `*kanban*` | 1 |
| `*timeline*` | 1 |
| `*modal*` | 1 |
| `*tag*` | 1 |

`status-pill`류(승인 대기/차단/검토 필요 등 상태 배지)는 각 콘솔 렌더러(`cclList`, `fdrList`, `jbwc-row` 등)에서 광범위하게 재사용되는 실질적 최다 사용 컴포넌트지만 클래스명 검색 패턴상 "pill" 계열에 잡히지 않아 위 표에서 저평가됨 — 실사용 빈도 기준 최다 컴포넌트는 `status-pill` 변형.

---

## 4. 핵심 함수/함수 계약 — 실제 vs 목업

| 함수 | 위치 | 성격 |
|---|---|---|
| `computeRiskDecision(item)` | app.js:4687 | **REAL** 결정론적 가중합 스코어링(도메인별 5개 signal × weight). LLM 미호출, 하드코딩된 signal 문구 템플릿에 실제 케이스 필드값 삽입 |
| `buildDashboardData()` | app.js:4608 | **REAL** 로컬 state 집계 함수 |
| `auditChainRecords(item)` | app.js:4494 | **REAL** 해시체인 감사로그 — `simpleHash()`(FNV-1a 32bit, app.js:4485)로 `previousHash` 연쇄. **단, 이 해시체인은 base app에만 존재**하며 CCL/FDR/JPO/JBWC 4개 역할 콘솔의 `*_audit_logs` 테이블은 해시체인 없이 평문 리스트로만 렌더링됨(예: cclConsole.app.js:193-199) — 콘솔 전체에 일관 적용되지 않은 기능 |
| `moveCaseToColumn(caseId, column)` | app.js:5351 | **REAL** in-memory 상태 변경(직접 mutation, 커스텀 undo 없음) + 승인대기 이동 시 산출물 생성 훅 트리거 |
| `createCorporateCreditCase(form)` | cclConsole.data.js:179 | **REAL** — CCL 전용 케이스 생성, `harnessRunHooks("afterCaseCreate", …)` 경유 |
| `recordCorporateCreditAgentRun(run)` | cclConsole.data.js:219 | **REAL** 로컬 append, 출력 텍스트 자체는 하드코딩된 템플릿(**MOCKED LLM output**) |
| `cclDecideApproval(approvalId, decision, decidedBy)` | cclConsole.data.js:238 | **REAL** 승인/반려 상태 전이 로직 |
| `harnessGuardCheckPII / CheckAssertions / CheckScope / CheckAutoClose / CheckApprovalRequired` | harnessCore.js:74-110 | **REAL** — 정규식 기반 주민번호/전화번호/11자리 이상 숫자열 탐지, scope 필드 강제, high/critical 자동종결 차단, 고객발송 승인누락 차단. 실제 동작하는 가드레일(모의 아님) |
| `verifyHarnessIntegrity / verifyRoleHarnessScope / verifyNoForbiddenRoleResurface / verifyNoPIILeakage / verifyAgentRegistryCompleteness / verifyHookCoverage / runHarnessSelfTest` | harnessVerification.js 전체 | **REAL** 자체 검증기 — manifest 필수키·countService·PII DOM 스캔(`document.body.innerText` 정규식 검사)·agent 필드 완결성·hook 커버리지를 실제로 실행해 `window.__lastHarnessSelfTest`에 기록. mock이 아니라 런타임에 도는 self-test |

**LLM 실호출 여부**: 코드 전체에서 `fetch()`는 단 2곳(app.js:705, jeonsePublicData.adapters.js:91) — 둘 다 **data.go.kr 공공데이터(전세 실거래가) 조회**용이며 `?live=1` 데모 슬라이스 전용. OpenAI/Anthropic 등 LLM API 호출은 **전무**. 모든 "AI 에이전트 산출물"은 JS 템플릿 문자열에 케이스 필드를 보간한 정적 텍스트 — 표시된 40개 에이전트(e57b826 기준, RM 추가 후 재실측 51개 — §6) 전부 출력 텍스트는 목업. 재실측한 RM 하네스(`rmOfficerDeliverable.service.js`)도 동일하게 `fetch()` 신규 추가 없이 템플릿 리터럴만 사용 — 목업 패턴 예외 없음.

---

## 5. 데이터 모델 / localStorage 테이블

콘솔별로 완전히 분리된 5개의 localStorage DB 키(스코프 격리, alias 금지가 하네스 규칙). **재실측(2026-07-05)**: RM 하네스가 자체 로더(`rmOfficer-db.js`, 아래 참고)로 추가되어 스코프 격리 DB는 실질 6개 계열로 늘었다(RM은 별도 localStorage 키가 아니라 base app 스토리지 내 `rm_officer_*` 테이블 프리픽스로 격리).

| 키 | 콘솔 | 내부 테이블(실측) |
|---|---|---|
| `jb-finance-support-state-v4` | base app | `appStorageKey` — CLAUDE.md에 기술된 `jb-localguard-os-state-v2`와 **다름**(버전 드리프트, 02_제품/app과 _vendor/JB_project2/app은 별개 상태 스키마) |
| `ccl-ops-db-v1` | CCL | `users, ccl_cases, ccl_review_notes, ccl_doc_checks, ccl_memo_drafts, approvals, ccl_audit_logs, ccl_consult_logs, ai_analysis_requests, ai_recommendations, harness_agents, ccl_agent_runs, agent_handoffs` (13개 테이블, cclConsole.data.js:6-91) |
| `fdr-ops-db-v1` | FDR | `fdr_signals, fdr_block_reviews, fdr_rules, fdr_followups, approvals, fdr_audit_logs, ai_analysis_requests, ai_recommendations, harness_agents, fdr_agent_runs, agent_handoffs` (11개 테이블, fdrConsole.data.js:45-95) |
| `jpo-ops-db-v2` | JPO | `role_workspaces, jeonse_price_snapshots, jeonse_risk_signals, jeonse_registry_checks, jeonse_guarantee_checks, jeonse_support_referrals, approvals, jeonse_evidence, jeonse_audit_logs, ai_analysis_requests, ai_recommendations, harness_agents, jeonse_agent_runs, agent_handoffs, external_connectors, inspection_schedules` (16개 테이블, 4콘솔 중 최다 — jeonseProtection-db.js:139-247) |
| `jbwc-ops-db-v3` | JBWC | `affiliates, approvals, audit_logs, privacy_permission_checks, external_connectors, ai_analysis_requests, ai_recommendations, inspection_schedules, customer_support_cases, consumer_protection_reviews, fds_alerts, document_cases, vehicle_lifecycle_tasks, harness_agents, agent_runs, agent_handoffs, kpi_snapshots` (17개 테이블 — wooricap-db.js:123-242; 유일하게 자체 `cases` 없이 `document_cases`/`customer_support_cases` 등 도메인별 분리 테이블 사용) |

기타: `jb-localguard-nav-order-v1`(nav 순서 커스터마이즈), `skillContentStorageKey`(modules.js:757, 업무 기능 콘텐츠 편집 영속화).

**재실측 추가(2026-07-05) — RM 역할 하네스 DB**: 별도 localStorage 키 없이 `rmOfficer-db.js`(356줄) 자체 로더가 관리하는 **13개 테이블**(rmOfficer-db.js 실측): `rm_officer_cases, rm_officer_consult_queue, rm_officer_policy_checklists, rm_officer_agent_assignments, rm_officer_agent_runs, rm_officer_agent_handoffs, rm_officer_approvals, rm_officer_deliverables, rm_officer_evidence_items, rm_officer_audit_logs, rm_officer_external_connectors, rm_officer_role_assignments, rm_officer_tasks`. **scope 규칙 실확인**: `rmoTable(table, roleKey)`(rmOfficer-db.js:313-318)가 `if (!roleKey) throw new Error("role scope is required")`로 강제 — CCL/FDR/JPO/JBWC와 **동일한 "scope 없으면 예외" 계약**을 그대로 따른다. `role_workspaces`(전역)와 `rm_officer_users`(roleKeys 배열 필터)만 예외 취급되는 것도 다른 콘솔 패턴과 일치.

**Case는 마크다운 파일이 아니라 순수 JS 객체(localStorage에 JSON 직렬화)** — PRD의 FR류 문서가 "케이스=문서"를 전제한다면 실제 구현과 어긋난다.

---

## 6. 에이전트 & 스킬 로스터

| 콘솔 | 에이전트 수 | 스킬 수 |
|---|---|---|
| ~~CCL~~(cclConsole, 8c274b5 이후 죽은 코드 — §12) | ~~8~~ (`cclConsoleAgents`, cclConsole.core.js:111) | ~~6~~ (`cclConsoleSkills`, :161) |
| **CCR(신규, 재실측 2026-07-05 #2 — 실라이브 corporate-credit)** | **15 (`corporateCreditAgents`, corporateCreditAgents.registry.js:28, `ccrAgent(` 15회)** | **7 (`corporateCreditSkills`, :124-132)** |
| FDR | 8 (`fdrConsole.core.js`) | 6 (`fdrConsoleSkills`, :171) |
| JPO | 11 (`jeonseProtectionAgents.registry.js`) | 10 (`jeonseProtectionSkills`, :246) |
| JBWC | 13 (`jbWooriCapitalAgents.registry.js`) | 6 (`jbWooriCapitalSkills`, :271) |
| RM(재실측 2026-07-05) | 11 (`rmOfficerAgents`, rmOfficerAgents.registry.js:34-267) | 11 (`rmOfficerSkills`, :269-281) |
| **합계(0226bd6, CCL 기준)** | 51 에이전트 | 39 스킬 |
| **합계(재실측 2026-07-05 #2, 8c274b5 — CCL→CCR 대체)** | **58 에이전트**(CCR 15 + FDR 8 + JPO 11 + JBWC 13 + RM 11) | **40 스킬**(CCR 7 + FDR 6 + JPO 10 + JBWC 6 + RM 11) |

CCR 15개 에이전트(`ccrAgent()` 팩토리, corporateCreditAgents.registry.js): `ccr-triage`(오케스트레이터)·`ccr-borrower`·`ccr-financial-quality`·`ccr-cashflow`·`ccr-collateral`·`ccr-working`·`ccr-facility`·`ccr-trade`·`ccr-policy-esg`·`ccr-pf`·`ccr-covenant`·`ccr-ews`·`ccr-memo`·`ccr-compliance`(가드레일)·(도메인 라우팅용 1종 추가, `corporateCreditRoutingRules` 참고). `harnessRegistry.js:25`의 `requiredAgents: 15`와 일치(자체검증기가 강제하는 수치와 실측이 정합).

RM 11개 에이전트: `rmo-triage(오케스트레이터)·rmo-marine-risk·rmo-credit-care·rmo-salary-flow·rmo-dsr-guard·rmo-youth-finance·rmo-policy-finance·rmo-action·rmo-comms·rmo-approval-router·rmo-compliance(가드레일)`. 다른 콘솔과 동일하게 `id, agentKey, name, displayName, domain, responsibilities, allowedActions, blockedActions, dbReads, dbWrites, handoffRules, guardrails, metrics` 필드를 갖춘 `rmoAgent()` 팩토리로 생성하며, 모든 에이전트에 `RMO_FORBIDDEN_OUTPUTS`(8개 금지 항목 — 실제 승인/금리/신용평가/정책자금 확정·PII 원문 저장 등)를 `blockedActions`에 공통 병합한다(rmOfficerAgents.registry.js:20).

각 에이전트는 `id, agentKey, name, displayName, domain, responsibilities, allowedActions, blockedActions, dbReads, dbWrites, handoffRules, guardrails, metrics` 필드를 갖추도록 `verifyAgentRegistryCompleteness`가 강제(필드 누락 시 self-test 실패) — 스펙만 있는 게 아니라 실제로 검증기가 도는 구조.

---

## 7. 디자인 토큰 (styles.css 실측)

- 고유 CSS 커스텀 프로퍼티(`--*`): **110개**(styles.css) + **11개**(wooricap.css, 별도 파일) = **총 121개** — 과제 설명 "~118개"에 근접하나 정확히는 121개(두 파일 합산), styles.css 단독으로는 110개.
- 선언 라인 수(다크모드/미디어쿼리 재정의 포함 총 등장 횟수): 260줄 — 고유명 대비 재정의가 2배 이상 많음(테마 오버라이드가 많다는 뜻).
- 고유 클래스 선택자: styles.css 484개 + wooricap.css 53개 = 537개.

---

## 8. 구현 vs 목업 vs 부재 총괄표

| 영역 | 상태 | 근거 |
|---|---|---|
| 4개 역할 콘솔 라우팅/뷰 전환(재실측: RM 포함 5콘솔) | **REAL** | 각 콘솔 `*RouteFromHash` + `applyHashRoute` 디스패치, 실제 hash 기반 네비게이션 동작. RM도 `rmoRouteFromHash`로 동일 디스패치 체인에 편입(app.js:5757) |
| 리스크 스코어링(`computeRiskDecision`) | **REAL(결정론적 로직)** | 가중합 공식 실동작, 단 signal 서술 문구는 템플릿 |
| 감사로그 해시체인 | **부분 REAL** | base app만 해시체인(FNV-1a), 4개 역할 콘솔은 평문 리스트만 — **콘솔 전체 일관성 없음** |
| PII/스코프/승인/자동종결 가드레일 | **REAL** | harnessCore.js 정규식·필드 검사가 실제로 실행되고 위반 시 문자열 반환 |
| 하네스 자체검증(self-test) | **REAL** | harnessVerification.js가 런타임에 manifest/agent/hook을 실제로 스캔 |
| AI 에이전트 산출물 텍스트 | **MOCKED** | 전부 JS 템플릿 리터럴, LLM API 호출 없음(전체 코드베이스에 `fetch()` 2건, 둘 다 공공데이터 API) |
| 라이브 전세 실거래가 조회(`?live=1`) | **REAL(제한적)** | 로컬 프록시 경유 실제 data.go.kr fetch, 나머지 데이터는 seed |
| 케이스 = 문서(마크다운) 모델 | **부재** | 순수 JS 객체 + localStorage, 파일 시스템 기반 케이스 문서 없음 |
| 감사/컴플라이언스 리포트 내보내기 | **REAL(부분)** | `exportAuditJson`(app.js:4525) base app에만 존재, 역할 콘솔에는 미확인 |
| 5개 독립 localStorage DB(콘솔별 스코프 격리, 재실측: RM 포함 6번째 스코프) | **REAL** | 서로 다른 storage key, `harnessGuardCheckScope`로 교차 오염 검사. RM은 `rmoTable(table, roleKey)`가 동일한 scope 강제 계약을 따름(§5) |
| E2E 테스트 커버리지 | **REAL** | `_vendor/JB_project2/tests/e2e/`에 5개 spec 파일, 총 60개 `test()` 시나리오(jeonse-protection 16, localguard 24, role-consoles 7, wooricap 11, jeonse-smoke 2) |
| **RM 업무지원 콘솔(신규, 재실측 2026-07-05)** | **REAL(로직) / MOCKED(AI 출력)** | 16뷰 라우팅·13테이블 scope 격리·키보드 퍼스트(`rmoHandleKeydown`)·인라인 승인(`rmoDoApprove`)·우선순위 계산(`computeRmOfficerPriority`)은 실동작. `rmoBuildAgentDeliverable/rmoBuildIntegratedDeliverable`이 만드는 산출물 텍스트는 다른 4콘솔과 동일하게 템플릿 리터럴(LLM 미호출). e2e 3개 시나리오(총 63개로 갱신) |
| **백엔드 저장소 옵션(신규, 재실측 2026-07-05 #2)** | **REAL(선택지 3단)** | `server/index.mjs`(591줄) — `JB_DB_DRIVER` env로 `JsonRepository`(파일 JSON, 기본값)와 `SupabaseRepository`(env 키 필수, `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` 미설정 시 즉시 throw)를 전환. `npm run backend`로 기동, 320줄 Node 테스트(`tests/backend/server.test.mjs`)로 검증. 프런트 `app/`은 기본적으로 여전히 `localStorage` 독립 — server/는 별도 옵트인 API 계층으로 병존 |
| **Ollama 로컬 모델 실연동(신규, 재실측 2026-07-05 #2)** | **REAL(opt-in) / 기본 mock 유지** | `scripts/ollama-agent-proxy.mjs`(:8030, 179줄) — 승인단정·금리한도·신용평가 3종 정규식 금지패턴 필터 내장, `/agent/run`·`/agent/models` 엔드포인트. `app/agentModelSettings.js` 토글 UI. 단 CCR/RM 하네스의 **주 판단·초안 루프는 여전히 결정론적 mock**(`recordCorporateCreditAgentRun`/`recordRmOfficerAgentRun`) — Ollama는 하네스 뷰의 별도 "샘플 요청" 버튼(`runCorporateCreditOllamaSampleRequest`/`runRmOfficerOllamaSampleRequest`)에서만 트리거되는 opt-in 경로 |
| **`corporate-credit` 하네스 이중등록 버그(신규 발견, 재실측 2026-07-05 #2)** | **버그 — 구조적 결함** | §12 참고. `harnessRegistry.js`의 두 번째 `id:"corporate-credit"` 블록이 로드되지 않는 `cclConsole.*` 심볼을 참조해 `ReferenceError`로 중단 → 같은 파일 내 `fds-response` 등록이 통째로 누락되어 FDS 콘솔의 훅 가드레일이 상시 무력화(`{ok:true}` 고정 반환) |

---

## 참고 — 확인 방법

모든 수치는 다음 방식으로 직접 확인했다(재현 가능):
```bash
cd _vendor/JB_project2/app
wc -l *.js *.css *.html
grep -oE '\.[a-zA-Z][a-zA-Z0-9_-]*' styles.css | sort -u | wc -l   # 484
grep -oE '^\s*--[a-zA-Z0-9-]+:' styles.css | sort -u | wc -l       # 110
grep -n "function <이름>" *.js                                     # 함수 위치
grep -c "test(" ../tests/e2e/*.spec.js                              # 60 (e57b826) → 63 (0226bd6, RM e2e 2파일 3개 추가)
```

## 9. 다음 이식 후보 — 핸드오프 (사용자 승인 2026-07-04, 상태: **PR 제출됨 — `LSB-afk/JB_project2#2` OPEN**)

> 위 §0~§8과 달리 이 절만 **실측이 아니라 이식 지시서**다. 전략(사용자 확정): **스펙 핸드오프 우선, 승보 요청 시 additive-only 모듈 PR**(River-181 fork 경유). 타이밍은 PR `LSB-afk/JB_project2#1` 머지 후.
>
> **집행 완료(2026-07-04 야간, 사용자 '적용하시오' 지시)**: 아래 §9.1·§9.2를 additive-only로 구현해 **PR #2** 제출 — `app/memoryCards.js`(승인→3계층 카드 증류, 수용 기준 4개 브라우저 실검증 통과) + `scripts/llm-gateway.mjs`(:8022, 3엔진+폴백 사다리, 8021은 paperclip 점유로 회피). 기존 파일 수정은 등록 3줄(index.html·cclConsole.app.js·package.json).

### 9.1 MemoryCard 슬라이스 (스펙 SSOT = [[11-메모리-3계층-자동진화-설계도]])

- **방식**: 신규 파일 1개(`memoryCards.js` — MemoryCard 저장 + Distiller 후처리 + memory 뷰 렌더) + 기존 코드 등록 지점 **1줄**만 터치. 충돌 표면적 최소화(PR#1과 같은 방식).
- **스키마·증류 프롬프트**: 설계도 11 §2(MemoryCard)·§3(Distiller — "기본값은 기억하지 않는다") 원문 그대로. 저장은 기존 `cclTable(table, roleKey)` scope 규칙 준수(`ccl_memory_cards`).
- **수용 기준**: ① CCL-0001 실행 후 카드 1~2장 생성 ② 에이전트 상세에서 카드 열람(읽기 전용) ③ 카드 fact에 PII 원문 0건(포인터만) ④ scope 없는 조회는 기존처럼 예외.
- **paperclip 매핑 근거**: 설계도 11 §9 (설정 diff 스냅샷·풀로그/발췌 분리·fingerprint 중복 억제 등 8패턴).

### 9.2 /llm 게이트웨이 (참고 — 필요 시 파일 복사)

예선 레포 `02_제품/scripts/api-proxy.mjs`에 구현·검증 완료(단일 파일, 의존성 0): claude✓/codex✓/ollama✓ 3엔진 + 폴백 사다리 + JSONL 원장 + `/llm/usage` 집계. JB_project2에서 로컬모델 연동 시 이 파일을 그대로 가져가 `OLLAMA_BASE`만 맞추면 됨. Docker 물리분리 구성은 `02_제품/deploy/`(compose+런북).

---

## 10. 백엔드 저장소 옵션(`server/`) — 신규(재실측 2026-07-05 #2)

`server/index.mjs`(591줄)가 정적 파일 서빙 + REST API를 함께 제공한다. 저장 드라이버는 `JB_DB_DRIVER` 환경변수(`server/index.mjs:234`)로 3단 선택:

| 드라이버 | 조건 | 구현 |
|---|---|---|
| `json`(기본값) | env 미설정 시 | `server/lib/repository.mjs`(93줄) `JsonRepository` — `server/data/localguard-db.json` 파일에 append |
| `supabase` | `JB_DB_DRIVER=supabase` | `server/lib/supabaseRepository.mjs`(138줄) `SupabaseRepository` — `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`(or `SUPABASE_SECRET_KEY`) **env 필수, 미설정 시 즉시 `throw`**(코드에 키 하드코딩 없음, 실측 확인). URL만 기본값(`DEFAULT_SUPABASE_URL`)이 코드에 있고 키는 없음 |
| (미지정 값) | 그 외 | `unsupported JB_DB_DRIVER` 에러 |

`npm run backend`(`node server/index.mjs`)로 기동, `npm run backend:test`(`node --test tests/backend/*.test.mjs`)로 320줄 테스트 검증. `sql/supabase-api-state.sql`(27줄)이 Supabase 쪽 테이블 스키마. **주의**: 프런트 `app/*.js`는 이 백엔드와 자동 연동되지 않는다 — 여전히 브라우저 `localStorage`가 기본 저장소이고, `server/`는 별도로 기동해야 하는 옵트인 API 계층이다(프런트가 이 API를 호출하는 코드는 이번 실측 범위에서 확인되지 않음, `[미확인]`).

## 11. Ollama 로컬 모델 실연동 경로 — 신규(재실측 2026-07-05 #2)

`scripts/ollama-agent-proxy.mjs`(179줄, :8030)가 로컬 Ollama(:11434)를 중계한다. 응답 텍스트에 대해 3종 정규식 금지패턴 필터 내장(`FORBIDDEN_PATTERNS`, ollama-agent-proxy.mjs:12-14): 승인/거절 단정, 금리/한도 산정, 신용평가 단정 — 매치 시 위반 목록을 응답에 포함해 반환(차단이 아니라 플래그, `[확인]`).

`app/agentModelSettings.js`(238줄)가 프런트 토글: `localStorage` 키 `jb-agent-model-settings-v1`에 `runtime: "mock" | "ollama"` 저장. **주의할 점** — 코드 상 `AGENT_MODEL_DEFAULTS.runtime`의 리터럴 기본값은 `"ollama"`(agentModelSettings.js:6, 즉 `localStorage`에 아무것도 없는 최초 상태에서는 이 값)이지만, 실제 실행 경로는 다음 두 가지뿐이라 이것이 자동 실행을 의미하지 않는다:
- `corporateCreditServices.js:302 runAgentModelRequest(...)`(no `forceOllama`) — 하네스 뷰의 "샘플 요청" **버튼 클릭 시**(`corporateCredit.view.harness.js:53`)에만 호출. 프록시가 안 떠 있으면 fetch 실패로 안전 종료.
- `rmOfficerServices.js:445-457 runAgentModelRequest(..., { forceOffline: false, forceOllama: true })` — 마찬가지로 RM 하네스 뷰의 별도 버튼(`rmOfficer.view.harness.js:327`)에서만 호출, `forceOllama: true`로 runtime 설정과 무관하게 강제 실행되지만 이 역시 버튼을 눌러야 발생.

즉 **CCR/RM의 주 판단·초안 생성 루프(`recordCorporateCreditAgentRun`/`recordRmOfficerAgentRun`, 일반 케이스 처리 시 호출)는 여전히 결정론적 mock**이고, Ollama 실호출은 하네스 화면의 명시적 "샘플 요청" 버튼을 통해서만 일어나는 opt-in 시연 경로다 — "기본값이 mock이 아니다"와 "기본 흐름이 mock이다"는 서로 다른 사실이며, 후자가 실제 동작을 지배한다.

## 12. 구조적 결함 — `corporate-credit` 하네스 이중등록 (신규 발견, 재실측 2026-07-05 #2, 코드로 재현 확인)

**증상**: `app/harnessRegistry.js`에 `registerHarness({ id: "corporate-credit", ... })` 호출이 **두 번** 있다(6행: 신규 CCR 기반, 163행: 구 cclConsole 기반). `harnessStore.manifests`는 `id`를 키로 하는 단순 객체(harnessCore.js:18-24)라 나중 호출이 이전 등록을 덮어써야 정상이지만, **두 번째 호출은 실행되지 않는다**.

**원인**: 163행 블록이 참조하는 `CCL_ROLE_KEY`, `CCL_DISPLAY_NAME`, `CCL_ROUTE_BASE`, `cclNavigation`, `cclConsoleAgents`, `cclConsoleSkills`, `cclConsoleHooks`, `cclConsoleRules`, `cclConsoleHarness`, `CCL_DB_KEY`, `cclTable`는 전부 `app/cclConsole.core.js`·`cclConsole.data.js`·`cclConsole.app.js`(3파일, 921줄)에 정의돼 있는데, **이 3개 파일은 `index.html`에 `<script>` 태그가 없어 브라우저에 전혀 로드되지 않는다**(실측: `index.html` 전체 65개 script 태그 목록에 `cclConsole` 문자열 0건). 재현: 이 보고서 작성 중 Node `vm` 모듈로 `index.html`의 스크립트 로드 순서를 그대로 재생한 결과 `ReferenceError: CCL_ROLE_KEY is not defined`가 `harnessRegistry.js` 실행 중 발생함을 직접 확인했다.

**여파**: 브라우저에서 스크립트 태그는 파일 단위로 독립 실행되므로 이 에러가 다른 `<script>` 파일 실행을 막지는 않지만, **`harnessRegistry.js` 파일 자체는 그 지점에서 실행이 중단**된다. 그 결과 같은 파일 내 163행 이후에 있던 등록들이 전부 스킵된다:
- `id: "fds-response"`(199행) — **한 번도 등록되지 않음**. `getHarness("fds-response")`는 항상 `null`.
- 중복 `id: "rm-officer"`(236행, 내용은 47행과 동일한 것으로 보이는 merge 잔재) — 스킵되지만 47행 등록이 이미 있어 무해.

`fds-response`가 등록되지 않은 실질 영향: `app/fdrConsole.data.js:180-181`이 `harnessRunHooks("fds-response", hookName, payload)`를 호출하는데, `harnessCore.js:41-42`의 `getHarness(harnessId)`가 `null`을 반환하면 `handlers`가 빈 배열로 처리되어 **`{ ok: true, violations: [] }`가 항상 반환된다** — 즉 FDS(보이스피싱/이상거래대응) 콘솔의 `beforeCaseCreate`/`beforeAgentRun`/`beforeCustomerMessage` 훅 가드레일(PII/금지표현 검사 등)이 **코드가 존재함에도 실행 자체가 되지 않는 상태**다. FDS 콘솔 UI 자체(`fdrConsole.*`)는 harnessRegistry와 무관하게 app.js의 자체 뷰 라우팅으로 정상 렌더된다 — 화면은 멀쩡해 보이지만 훅 가드레일만 조용히 무력화된 상태라 발견이 어렵다.

**"corporate-credit이 몇 개인가" 판정**: 실질적으로 **1개(CCR)**. 두 번째 등록이 코드 로드 실패로 무산되는 "사고"로, `harnessStore.manifests["corporate-credit"]`는 첫 번째(CCR, 6행) 등록이 그대로 유지된다 — 그리고 이는 실제 라이브 렌더 경로(app.js가 참조하는 `corporateCreditDashboardPage`/`corporateCreditHarnessPage`, 모두 CCR 파일 소속)와 일치한다. `cclConsole.*.js`(921줄)는 이제 색인·등록 양쪽에서 완전히 죽은 코드다. **원인 추정(코드·커밋 로그 근거)**: `3e269ae`("기업여신 역할을 독립 하네스로 운영하기 위해")가 CCR 파일군 + `harnessRegistry.js`에 신규 블록을 추가했고, 이후 `b80459c`("원격 변경을 받아도 RM 최신 하네스 흐름이 유지되게 한다")가 origin/main 병합 과정에서 구버전 `harnessRegistry.js`(cclConsole 기반 corporate-credit + fds-response + rm-officer)를 완전히 대체하지 못하고 신·구 블록을 이어붙인 것으로 보인다(`[추정] — 커밋 diff로 확정 가능하나 이번 실측 범위 밖`).

**권고(실측 범위 밖, 참고용)**: (a) `harnessRegistry.js`의 163~197행(cclConsole 기반 corporate-credit 블록)과 235~272행(중복 rm-officer 블록) 삭제, (b) `cclConsole.core.js`/`cclConsole.data.js`/`cclConsole.app.js` 삭제 또는 격리, (c) `fds-response` 등록을 정상 실행되는 위치로 복구.
