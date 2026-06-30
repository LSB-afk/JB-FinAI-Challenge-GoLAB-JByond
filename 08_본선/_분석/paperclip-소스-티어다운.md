---
tags:
  - area/product
  - type/reference
  - status/active
date: 2026-07-01
up: "[[_03_제품_MOC]]"
aliases:
  - paperclip-소스-티어다운
  - paperclip-source-teardown
---
> **[대외비]** 6/29 공식 발표 전 비공개. 대회 출처·팀명·서비스명 외부 검색 노출 금지.
> ⚠️ **플래닝 전용 — 즉시 구현 아님.** 라이브 앱(`02_제품/app/*`) 무수정. 리프트는 "나중에 실행할 계획"으로만 둔다.

# Paperclip 소스기반 Phase 2 티어다운 — JB LocalGuard OS 리프트 플랜

> 스크린샷 IA 분석 [[paperclip-레퍼런스-분석]]을 **실제 MIT 소스 근거**로 승격(file:line). 캡처 갤러리 [[_캡처-맵]] · 벤치마크 맥락 [[B1-결과-gpt]].
> 소스(비커밋 레퍼런스): `~/Downloads/archives/paperclip-master/` · **라이선스 = MIT**(Copyright 2025 Paperclip AI) → 합법 전면 차용.
> 분업: **소스 추출·근거 = Codex(gpt-5.5 high)** / **토큰 매핑·판정 = Opus**. 하단 [부록]에 Codex 전문(file:line) 첨부.

---

## 핵심 판정 (Opus TL;DR)

1. **paperclip은 우리 운영계약의 실동작 1:1 레퍼런스.** Codex 매핑 확인:
   `issues`→**Case** · `heartbeatRuns`→**AgentRun** · `agents`→**Agent** · `companySkills`→**Skill** · `issueWorkProducts`→**Evidence** · `approvals`/`issueApprovals`→**Approval** · `activityLog`+`heartbeatRunEvents`→**Audit** (+보너스 `budgetPolicies/costEvents` = 토큰 예산 통제). → 우리 4함수계약(`computeRiskDecision`·`buildDashboardData`·`auditChainRecords`·`moveCaseToColumn`)을 서버 API로 승격할 때 **스키마·상태기계의 검증된 본보기**.
2. **리프트 가능 = 토큰 구조·상태색계·데이터 스키마·라우터 패턴·컴포넌트 해부.** 리프트 불가(레퍼런스 전용) = React/Tailwind/TanStack/Express/Postgres/WebSocket 런타임.
3. **3대 충돌(반드시 우리 것 유지)**: ① paperclip `--radius:0`·다크기본 ↔ 우리 **8px·라이트**(verify_static needle) ② paperclip 폰트 없음(inherit) ↔ 우리 **Pretendard** ③ paperclip 중립 그레이스케일 OKLCH ↔ 우리 **JB 블루 브랜드**. → **토큰 택소노미·상태색·컴포넌트 기법만** 가져오고 **값(라운드·폰트·팔레트)은 우리 것**.
4. **하드룰 정합**: paperclip에도 `redaction.ts`·승인 board 게이트·low-trust 격리가 있음 → **개념만 참고**, 우리 규칙은 더 엄격(원본 PII 외부 LLM 무반출·고객대상 액션 사람승인). approval payload·plugin event 같은 **반출 경로는 차용 금지**.

---

## ③-B 디자인 토큰 → 우리 `styles.css` 매핑 (Opus 판정)

> Codex가 추출한 paperclip 실토큰(부록 ③) → 우리 토큰 매핑 + 리프트 판정. **`adopt-구조`=명명 택소노미만, `keep-ours`=우리 값 유지, `adapt`=재테마.**

| paperclip 토큰(실값) | 우리 `styles.css` 대응 | 판정 | 비고 |
|---|---|---|---|
| 시맨틱 택소노미(`--background/-foreground/-card/-popover/-muted/-border/-ring/-sidebar/-chart-1..5`) | `--bg/--surface/--ink/--muted/--border`… | **adopt-구조** | *명명 체계*만 차용. 값은 우리 JB 블루(`--bg:#edf4fb`·navy/blue/cyan) 유지 — paperclip 중립 OKLCH(chroma 0) 미차용 |
| `--radius:0`·`--radius-lg/xl:0px` | `--radius:8px` | **keep-ours** ⚠️ | 충돌. 우리 8px 유지(verify_static `border-radius: 8px` needle). paperclip 플랫룩 미차용 |
| 폰트 inherit(Pretendard 없음) | Pretendard Variable | **keep-ours** ⚠️ | paperclip은 폰트 가이드 없음 → 우리 Pretendard 유지(needle) |
| status `todo #f59e0b` | `--warning #b76700`/`-bg` | **adapt** | 우리 5-state 칩과 정합 |
| status `in_progress #2563eb` | `--blue-600`(info) | **adapt** | 진행=블루 |
| status `in_review #7c3aed` | `--violet #6046b6`/`-bg` | **adapt** | 우리 violet 토큰 존재 → 매핑 용이 |
| status `done #22c55e` | `--success #0f8f72`/`-bg` | **adapt** | 완료=그린 |
| status `blocked #dc2626` | `--danger #c0322a`/`-bg` | **adapt** | 차단=레드 |
| status `running #2563eb`(cyan badge)·`paused #f59e0b`·`idle/backlog #a8aeb2` | `--cyan-500`·`--warning`·`--muted` | **adapt** | **running/paused 상태 신설** 권장(우리 칩에 추가) |
| agent 그라디언트 10쌍(`--agent-1a/b`…, capsule) | (신규) 에이전트 캡슐 그라디언트 | **adapt** | 기법(에이전트별 그라디언트 아바타) 차용 → 우리 에이전트(전세실드·등기권리·사기방지…)에 JB 블루 계열로 재테마. MIT라 값 재사용도 합법 |
| chart-1..5 OKLCH | 대시보드 미니차트 색 | **adapt** | `buildDashboardData` KPI 4종 차트에 매핑 |
| 컴포넌트: `EntityRow`·`StatusBadge`·`PropertyRow`·`MetricCard`·`AgentCapsule` | 문자열 템플릿 렌더 함수 | **adapt(재구현)** | React→바닐라 문자열 템플릿. **8px·Pretendard 유지**. anatomy(leading/identifier/title/subtitle/meta/trailing) 그대로 |

---

## 리프트 플랜 요약 (planning only · Codex ⑤ + 가드)

> 순서·난이도(S/M/L)는 Codex ⑤ 근거. **즉시 구현 아님 — 서버 승격 라운드에서 착수.**

1. **디자인 토큰(S, adapt)** — paperclip 시맨틱 택소노미 + 상태색계를 우리 JB 블루·8px·Pretendard로 재구성. running/paused/in_review 칩 신설.
2. **컴포넌트 해부(S, adapt)** — EntityRow/StatusBadge/PropertyRow/MetricCard/AgentCapsule → 바닐라 문자열 템플릿 함수.
3. **데이터 스키마(M, adapt)** — `issues/heartbeatRuns/agents/companySkills/issueWorkProducts/approvals/activityLog` → 우리 운영계약 이름의 localStorage JSON 컬렉션 → 서버 API. **Drizzle/Postgres 미차용.**
4. **상태 시스템(M, adapt)** — `status-colors.ts`의 task/agent 상태기계 → 바닐라 렌더 함수.
5. **라우터 패턴(M, reference)** — React Router 라우트 테이블 *아이디어*만 → 우리 인메모리 switch(또는 해시 3단 드릴다운 업그레이드 제안).
6. **에이전트운영(L, reference)** — heartbeat 스케줄·budget 게이트·approval wakeup·activity-log = **행위 모델 참고**. MVP는 로컬 시뮬, 고객대상 액션은 승인 게이트 유지.

**베끼지 말 것**: React·React Router·TanStack·Tailwind 파이프라인·shadcn/Radix 런타임·Express·Drizzle/Postgres·WebSocket 서버.
**가드**: verify_static 문자열계약 무파손 · 바닐라JS 관용구 · **원본 PII 외부반출 금지**(approval payload/plugin event 경로 차용 금지) · **승인 게이트 우회 금지**(board 게이트 유지).

---

## 부록 — Codex(gpt-5.5 high) 소스기반 티어다운 전문 (file:line 근거)
> 읽기전용 추출. 경로는 `~/Downloads/archives/paperclip-master/` 기준. 검증·요약은 위 본문(Opus).

## ① 인벤토리·라이선스

**Monorepo tree**

```text
/Users/river/Downloads/archives/paperclip-master/
├── .agents/
├── .claude/
├── .github/
├── cli/
├── doc/
├── docs/
├── docker/
├── evals/
├── packages/
├── patches/
├── releases/
├── report/
├── screenshots/
├── scripts/
├── server/
├── skills/
├── tests/
├── tools/
└── ui/
```

**`ui/`, `server/`, `packages/` 2-depth**

```text
ui
ui/public
ui/public/brands
ui/src
ui/src/adapters
ui/src/api
ui/src/components
ui/src/context
ui/src/fixtures
ui/src/hooks
ui/src/i18n
ui/src/lib
ui/src/pages
ui/src/plugins
ui/storybook
ui/storybook/.storybook
ui/storybook/fixtures
ui/storybook/stories

server
server/scripts
server/src
server/src/__tests__
server/src/adapters
server/src/auth
server/src/http
server/src/lib
server/src/middleware
server/src/onboarding-assets
server/src/realtime
server/src/routes
server/src/secrets
server/src/services
server/src/storage
server/src/types

packages
packages/adapter-utils
packages/adapter-utils/src
packages/adapters
packages/adapters/acpx-local
packages/adapters/claude-local
packages/adapters/codex-local
packages/adapters/cursor-cloud
packages/adapters/cursor-local
packages/adapters/gemini-local
packages/adapters/grok-local
packages/adapters/hermes
packages/adapters/hermes-gateway
packages/adapters/openclaw-gateway
packages/adapters/opencode-local
packages/adapters/pi-local
packages/db
packages/db/scripts
packages/db/src
packages/mcp-server
packages/mcp-server/src
packages/plugins
packages/plugins/create-paperclip-plugin
packages/plugins/examples
packages/plugins/paperclip-plugin-fake-sandbox
packages/plugins/plugin-llm-wiki
packages/plugins/plugin-workspace-diff
packages/plugins/sandbox-providers
packages/plugins/sdk
packages/shared
packages/shared/src
packages/skills-catalog
packages/skills-catalog/catalog
packages/skills-catalog/generated
packages/skills-catalog/scripts
packages/skills-catalog/src
packages/teams-catalog
packages/teams-catalog/catalog
packages/teams-catalog/generated
packages/teams-catalog/scripts
packages/teams-catalog/src
```

**Tech stack versions**

| 항목 | 버전 | 근거 |
|---|---:|---|
| Node engine | `>=20` | `/Users/river/Downloads/archives/paperclip-master/package.json:67-69` |
| package manager | `pnpm@9.15.4` | `/Users/river/Downloads/archives/paperclip-master/package.json:70` |
| React | `^19.2.7` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:61-62`, `/Users/river/Downloads/archives/paperclip-master/package.json:77-78` |
| Vite | `^6.1.0` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:81`, `/Users/river/Downloads/archives/paperclip-master/server/package.json:96` |
| Tailwind v4 | `tailwindcss ^4.3.0`, `@tailwindcss/vite ^4.3.0` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:70`, `/Users/river/Downloads/archives/paperclip-master/ui/package.json:78` |
| shadcn config | `style: new-york`, `tsx: true`, `iconLibrary: lucide` | `/Users/river/Downloads/archives/paperclip-master/ui/components.json:2-20` |
| Radix | `radix-ui ^1.6.0`, `@radix-ui/react-slot ^1.2.4` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:50`, `/Users/river/Downloads/archives/paperclip-master/ui/package.json:60` |
| React Router | `react-router-dom ^7.16.0` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:65` |
| TanStack Query | `@tanstack/react-query ^5.90.21` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:52` |
| Express | `^5.1.0` | `/Users/river/Downloads/archives/paperclip-master/server/package.json:72` |
| Drizzle ORM | `^0.45.2` | `/Users/river/Downloads/archives/paperclip-master/server/package.json:70`, `/Users/river/Downloads/archives/paperclip-master/packages/db/package.json:48` |
| Drizzle Kit | `^0.31.10` | `/Users/river/Downloads/archives/paperclip-master/packages/db/package.json:54` |
| Postgres client | `postgres ^3.4.9` | `/Users/river/Downloads/archives/paperclip-master/packages/db/package.json:50` |
| embedded Postgres | `^18.1.0-beta.16` | `/Users/river/Downloads/archives/paperclip-master/server/package.json:71`, `/Users/river/Downloads/archives/paperclip-master/packages/db/package.json:49` |
| WebSocket server | `ws ^8.19.0` | `/Users/river/Downloads/archives/paperclip-master/server/package.json:80` |
| TypeScript | `^5.7.3` | `/Users/river/Downloads/archives/paperclip-master/package.json:64`, `/Users/river/Downloads/archives/paperclip-master/ui/package.json:79`, `/Users/river/Downloads/archives/paperclip-master/server/package.json:95` |
| Playwright | `^1.58.2` | `/Users/river/Downloads/archives/paperclip-master/package.json:61` |
| Vitest | `^4.1.8` | `/Users/river/Downloads/archives/paperclip-master/package.json:65` |

**LOC**

| 대상 | Approx LOC | 방법 |
|---|---:|---|
| `ui/src` TS/TSX/JS/JSX/CSS layer | `229,107` lines | `find /Users/river/Downloads/archives/paperclip-master/ui/src -type f ... | xargs wc -l`, total output |

**License**

| 항목 | 값 | 근거 |
|---|---|---|
| Repository license text | `MIT License` | `/Users/river/Downloads/archives/paperclip-master/LICENSE:1` |
| Copyright | `Copyright (c) 2025 Paperclip AI` | `/Users/river/Downloads/archives/paperclip-master/LICENSE:3` |
| Package SPDX-style license string | `MIT` | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:5`, `/Users/river/Downloads/archives/paperclip-master/server/package.json:4`, `/Users/river/Downloads/archives/paperclip-master/packages/db/package.json:4` |
| Root package license field | `NOT FOUND` | `/Users/river/Downloads/archives/paperclip-master/package.json:1-81` has no `license` field |

## ② 운영계약 매핑

**Mapping table**

| our-concept | paperclip-concept | source file:symbol |
|---|---|---|
| Case | `issues` task/case table. `title`, `description`, `status`, `priority`, assignee, execution run refs. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/issues.ts:22` `issues` |
| Case, pipeline variant | `pipelineCases`, plus `pipelineCaseIssueLinks`, `pipelineCaseBlockers`, `pipelineCaseDocuments`, automation executions. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/pipeline_cases.ts:36`, `:89`, `:114`, `:158`, `:184` |
| AgentRun | `heartbeatRuns`, queued/running/finished run records with `usageJson`, `resultJson`, logs, process metadata, liveness fields. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/heartbeat_runs.ts:6` `heartbeatRuns` |
| Agent | `agents`, with `status`, `adapterType`, `adapterConfig`, `runtimeConfig`, budget and pause fields. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/agents.ts:14` `agents` |
| Skill | `companySkills`, `companySkillVersions`, `companySkillStars`, `companySkillComments`. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/company_skills.ts:16`, `:64`, `:90`, `:111` |
| Evidence | `issueWorkProducts`, linked to `issueId`, `createdByRunId`, `sourceTrust`, `url`, `reviewState`. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/issue_work_products.ts:18` `issueWorkProducts` |
| Evidence, documents | `issueDocuments`, `documents`, document annotation tables carry issue/work evidence. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/issue_documents.ts:6`; `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/documents.ts:23` |
| Approval | `approvals`, `issueApprovals`, plus approval routes/service. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/approvals.ts:5`; `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/issue_approvals.ts:7`; `/Users/river/Downloads/archives/paperclip-master/server/src/services/approvals.ts:11` |
| Audit | `activityLog`, `heartbeatRunEvents`. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/activity_log.ts:6`; `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/heartbeat_run_events.ts:6` |
| Budget/cost control | `budgetPolicies`, `budgetIncidents`, `costEvents`, enforced in `budgetService` and `heartbeatService`. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/budget_policies.ts:4`; `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/budget_incidents.ts:7`; `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/cost_events.ts:9`; `/Users/river/Downloads/archives/paperclip-master/server/src/services/budgets.ts:213` |
| Router shell | React Router wrapper plus `App.tsx` route declarations. | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/router.tsx:44`; `/Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:76`; `/Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:387` |

**Critical schema snippets**

```ts
// /Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/issues.ts:22-39
export const issues = pgTable(
  "issues",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull().references(() => companies.id),
    projectId: uuid("project_id").references(() => projects.id),
    projectWorkspaceId: uuid("project_workspace_id").references(() => projectWorkspaces.id, { onDelete: "set null" }),
    goalId: uuid("goal_id").references(() => goals.id),
    parentId: uuid("parent_id").references((): AnyPgColumn => issues.id),
    title: text("title").notNull(),
```

```ts
// /Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/heartbeat_runs.ts:6-18
export const heartbeatRuns = pgTable(
  "heartbeat_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull().references(() => companies.id),
    agentId: uuid("agent_id").notNull().references(() => agents.id),
    invocationSource: text("invocation_source").notNull().default("on_demand"),
    triggerDetail: text("trigger_detail"),
    status: text("status").notNull().default("queued"),
```

```ts
// /Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/approvals.ts:5-19
export const approvals = pgTable(
  "approvals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull().references(() => companies.id),
    type: text("type").notNull(),
    requestedByAgentId: uuid("requested_by_agent_id").references(() => agents.id),
    requestedByUserId: text("requested_by_user_id"),
    status: text("status").notNull().default("pending"),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
```

## ③ 디자인 토큰 (raw extract — no mapping, caller will map)

**Token source files**

| 파일 | 상태 |
|---|---|
| `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css` | FOUND, Tailwind v4 theme and CSS vars |
| `/Users/river/Downloads/archives/paperclip-master/ui/components.json` | FOUND, shadcn config |
| `/Users/river/Downloads/archives/paperclip-master/ui/vite.config.ts` | FOUND, `tailwindcss()` Vite plugin |
| `/Users/river/Downloads/archives/paperclip-master/ui/tailwind.config.*` | NOT FOUND |

**Tailwind/shadcn config**

| 항목 | 값 | 근거 |
|---|---|---|
| Tailwind import | `@import "tailwindcss";` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:1` |
| Typography plugin | `@plugin "@tailwindcss/typography";` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:2` |
| shadcn css | `src/index.css` | `/Users/river/Downloads/archives/paperclip-master/ui/components.json:6-11` |
| shadcn baseColor | `neutral` | `/Users/river/Downloads/archives/paperclip-master/ui/components.json:9` |
| shadcn icon library | `lucide` | `/Users/river/Downloads/archives/paperclip-master/ui/components.json:20` |
| Vite Tailwind plugin | `plugins: [react(), tailwindcss()]` | `/Users/river/Downloads/archives/paperclip-master/ui/vite.config.ts:1-8` |

**Color tokens: OKLCH values verbatim**

```css
/* /Users/river/Downloads/archives/paperclip-master/ui/src/index.css:45-79 */
:root {
  color-scheme: light;
  --radius: 0;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
```

| token | value | file:line |
|---|---|---|
| `--background` | `oklch(1 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:48` |
| `--foreground` | `oklch(0.145 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:49` |
| `--card` | `oklch(1 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:50` |
| `--card-foreground` | `oklch(0.145 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:51` |
| `--popover` | `oklch(1 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:52` |
| `--popover-foreground` | `oklch(0.145 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:53` |
| `--primary` | `oklch(0.205 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:54` |
| `--primary-foreground` | `oklch(0.985 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:55` |
| `--secondary` | `oklch(0.97 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:56` |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:57` |
| `--muted` | `oklch(0.97 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:58` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:59` |
| `--accent` | `oklch(0.97 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:60` |
| `--accent-foreground` | `oklch(0.205 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:61` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:62` |
| `--destructive-foreground` | `oklch(0.577 0.245 27.325)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:63` |
| `--border` | `oklch(0.922 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:64` |
| `--input` | `oklch(0.922 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:65` |
| `--ring` | `oklch(0.708 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:66` |
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:67` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:68` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:69` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:70` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:71` |
| `--sidebar` | `oklch(0.985 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:72` |
| `--sidebar-foreground` | `oklch(0.145 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:73` |
| `--sidebar-primary` | `oklch(0.205 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:74` |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:75` |
| `--sidebar-accent` | `oklch(0.97 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:76` |
| `--sidebar-accent-foreground` | `oklch(0.205 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:77` |
| `--sidebar-border` | `oklch(0.922 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:78` |
| `--sidebar-ring` | `oklch(0.708 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:79` |

| dark token | value | file:line |
|---|---|---|
| `--background` | `oklch(0.145 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:161` |
| `--foreground` | `oklch(0.985 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:162` |
| `--card` | `oklch(0.205 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:163` |
| `--card-foreground` | `oklch(0.985 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:164` |
| `--secondary` | `oklch(0.269 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:169` |
| `--muted` | `oklch(0.269 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:171` |
| `--muted-foreground` | `oklch(0.708 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:172` |
| `--destructive` | `oklch(0.637 0.237 25.331)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:175` |
| `--border` | `oklch(0.269 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:177` |
| `--ring` | `oklch(0.439 0 0)` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:179` |

**Status color scheme**

```css
/* /Users/river/Downloads/archives/paperclip-master/ui/src/index.css:128-138 */
  --status-agent-idle: #a8aeb2;
  --status-agent-running: #2563eb;
  --status-agent-paused: #f59e0b;
  --status-agent-error: #dc2626;
  --status-task-backlog: #a8aeb2;
  --status-task-todo: #f59e0b;
  --status-task-in_progress: #2563eb;
  --status-task-in_review: #7c3aed;
  --status-task-done: #22c55e;
```

| status | raw token/class | value | file:line |
|---|---|---|---|
| `todo` | `--status-task-todo` | `#f59e0b` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:133` |
| `in-progress` | `--status-task-in_progress` | `#2563eb` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:134` |
| `in-review` | `--status-task-in_review` | `#7c3aed` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:135` |
| `done` | `--status-task-done` | `#22c55e` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:136` |
| `blocked` | `--status-task-blocked` | `#dc2626` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:137` |
| `running` | `--status-agent-running` | `#2563eb` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:129` |
| `paused` | `--status-agent-paused` | `#f59e0b` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:130` |
| `running` badge class | `bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:52` |
| `paused` badge class | `bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:54` |
| `todo` badge class | `bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:83` |
| `in_progress` badge class | `bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:84` |
| `in_review` badge class | `bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:85` |
| `blocked` badge class | `bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:86` |
| `done` badge class | `bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300` | Tailwind class color | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:87` |

**Agent gradient pairs**

| pair | top | bottom | file:line |
|---|---|---|---|
| `--agent-1a/b` | `#f7cfdc` | `#1f7a3a` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:101-102` |
| `--agent-2a/b` | `#c9a9e8` | `#ee79a1` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:103-104` |
| `--agent-3a/b` | `#28164b` | `#7a1530` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:105-106` |
| `--agent-4a/b` | `#f3e6c4` | `#e3a21a` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:107-108` |
| `--agent-5a/b` | `#1f4dd6` | `#3aa35c` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:109-110` |
| `--agent-6a/b` | `#e94b27` | `#5a1122` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:111-112` |
| `--agent-7a/b` | `#7eb6e3` | `#ee79a1` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:113-114` |
| `--agent-8a/b` | `#9ce8a7` | `#bd7ff0` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:115-116` |
| `--agent-9a/b` | `#f3b49e` | `#1f4ed4` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:117-118` |
| `--agent-10a/b` | `#f2d95f` | `#4fbcba` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:119-120` |
| consumer | `linear-gradient(to bottom, var(--agent-${idx}a), var(--agent-${idx}b))` | runtime style | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/AgentCapsule.tsx:85` |

**Radius values**

| token/class | value | file:line |
|---|---|---|
| `--radius-sm` | `0.375rem` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:39` |
| `--radius-md` | `0.5rem` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:40` |
| `--radius-lg` | `0px` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:41` |
| `--radius-xl` | `0px` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:42` |
| `--radius` | `0` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:47` |
| button base | `rounded-md` | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/ui/button.tsx:8` |
| dialog content | `rounded-lg` | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/ui/dialog.tsx:62` |
| checkbox | `rounded-[4px]` | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/ui/checkbox.tsx:17` |

**Typography**

| 항목 | raw value/class | file:line |
|---|---|---|
| `Pretendard` | NOT FOUND | `rg Pretendard /Users/river/Downloads/archives/paperclip-master/ui` returned no match |
| inherited font | `font-family: inherit` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:271`, `:655`, `:760`, `:1367` |
| monospace | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:854`, `:959` |
| base form font size | `font-size: 1rem` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:656` |
| small responsive font | `font-size: 0.875rem` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:664` |
| markdown h1 | `font-size: 1.75em; font-weight: 700` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:821-822` |
| markdown h2 | `font-size: 1.35em; font-weight: 700` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:828-829` |
| markdown h3 | `font-size: 1.15em; font-weight: 600` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:835-836` |
| app title sample | `text-xl font-semibold` | `/Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:293` |
| metric value scale | `text-2xl sm:text-3xl font-semibold` | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/MetricCard.tsx:21` |
| entity row | `text-sm`, `text-xs`, `font-mono` | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/EntityRow.tsx:41`, `:53`, `:61` |
| status badge | `text-xs font-medium`; issue badge uses `font-normal` | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/StatusBadge.tsx:32`, `:89` |

**Reusable component anatomy**

| component | anatomy | source |
|---|---|---|
| `EntityRow` | `leading`, `identifier`, `title`, `subtitle`, `meta`, `trailing`, `selected`, `to`, `onClick`; flex row, optional link wrapper. | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/EntityRow.tsx:5-23`, `:25-87` |
| `StatusBadge` | generic `StatusBadge`, `AgentStatusBadge`, `AgentStatusCapsule`, `IssueStatusBadge`; local `--sc` CSS var for status helpers. | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/StatusBadge.tsx:14-17`, `:28-38`, `:46-56`, `:64-72`, `:84-98` |
| `PropertyRow` | label column `w-20`, content flex-wrap. | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/GoalProperties.tsx:21-28` |
| `MetricCard` | icon, value, label, optional description, optional link/click wrapper. | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/MetricCard.tsx:5-18`, `:21-31`, `:36-52` |
| `AgentCapsule` | gradient index normalized to 1-10 and CSS var gradient fill. | `/Users/river/Downloads/archives/paperclip-master/ui/src/components/AgentCapsule.tsx:38`, `:67-85`, `:120` |

## ④ 라우터·데이터·에이전트운영

**Router implementation**

| 항목 | 내용 | 근거 |
|---|---|---|
| Router wrapper | `ui/src/lib/router.tsx` re-exports `react-router-dom` and wraps `Link`, `NavLink`, `Navigate`, `useNavigate` to apply company prefixes. | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/router.tsx:1-14`, `:44`, `:53-111` |
| Router provider | `main.tsx` imports `BrowserRouter` from `@/lib/router`, not directly from `react-router-dom`. | `/Users/river/Downloads/archives/paperclip-master/ui/src/main.tsx:5`, `:49-71` |
| Route table | `App.tsx` uses `<Routes>` and `<Route>` declarations. | `/Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:1`, `:76-214`, `:387-448` |

**Route table quote**

```tsx
// /Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:76-87
function boardRoutes() {
  return (
    <>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/live" element={<DashboardLive />} />
      <Route path="onboarding" element={<OnboardingRoutePage />} />
      <Route path="companies" element={<Companies />} />
      <Route path="company/settings" element={<CompanySettings />} />
      <Route path="company/settings/environments" element={<Navigate to="/company/settings/instance/environments" replace />} />
```

```tsx
// /Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:140-187
      <Route path="routines" element={<Routines />} />
      <Route
        path="review-queue"
        element={<PipelinesExperimentalGate><ReviewQueue /></PipelinesExperimentalGate>}
      />
      <Route
        path="learnings"
        element={<PipelinesExperimentalGate><Learnings /></PipelinesExperimentalGate>}
      />
```

```tsx
// /Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:387-448
export function App() {
  return (
    <>
      <Routes>
        <Route path="auth" element={<AuthPage />} />
        <Route path="board-claim/:token" element={<BoardClaimPage />} />
        <Route path="cli-auth/:id" element={<CliAuthPage />} />
        <Route path="invite/:token" element={<InviteLandingPage />} />
        <Route path="tests/perf/long-thread" element={<IssueChatLongThreadPerf />} />
```

**Data/state providers**

| 항목 | 내용 | 근거 |
|---|---|---|
| TanStack Query | `QueryClient` has `staleTime: 30_000`, `refetchOnWindowFocus: true`. | `/Users/river/Downloads/archives/paperclip-master/ui/src/main.tsx:31-38` |
| Provider stack | `QueryClientProvider`, `ThemeProvider`, `BrowserRouter`, `CompanyProvider`, `LiveUpdatesProvider`, `SidebarProvider`, `PanelProvider`, `DialogProvider`. | `/Users/river/Downloads/archives/paperclip-master/ui/src/main.tsx:45-74` |
| API client | fetch base is `/api`, JSON default, `credentials: "include"`. | `/Users/river/Downloads/archives/paperclip-master/ui/src/api/client.ts:1`, `:15-26`, `:39-50` |
| Query keys | central `queryKeys` object covers companies, skills, agents, issues, pipelines, approvals, costs, etc. | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/queryKeys.ts:1-180` |

**localStorage keys**

| key | purpose | source |
|---|---|---|
| `paperclip.selectedCompanyId` | selected company | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/CompanyContext.tsx:34`, `:80-109` |
| `paperclip.theme` | theme choice | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/ThemeContext.tsx:19`, `:68-76`; `/Users/river/Downloads/archives/paperclip-master/ui/index.html:21-33` |
| `paperclip.sidebar.collapsed` | sidebar collapsed pin | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/SidebarContext.tsx:45`, `:55-76` |
| `paperclip:panel-visible` | properties/panel visibility | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/PanelContext.tsx:3`, `:16-28` |
| `paperclip:inbox:dismissed` | inbox dismissed alerts | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:21`, `:273-290` |
| `paperclip:inbox:read-items` | read inbox items | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:22`, `:309-323` |
| `paperclip:inbox:last-tab` | inbox last tab | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:23`, `:640-661` |
| `paperclip:inbox:issue-columns` | inbox columns | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:24`, `:336-355` |
| `paperclip:inbox:nesting` | inbox nesting | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:25`, `:621-633` |
| `paperclip:inbox:group-by` | inbox grouping | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:26`, `:359-372` |
| `paperclip:inbox:filters*` | company-scoped inbox filters | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:27`, `:190-240` |
| `paperclip:inbox:collapsed-groups*` | company-scoped collapsed groups | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/inbox.ts:28`, `:243-270` |

**WebSocket live updates**

```tsx
// /Users/river/Downloads/archives/paperclip-master/ui/src/context/LiveUpdatesProvider.tsx:1051-1079
    const connect = () => {
      if (closed) return;
      const url = buildSameOriginWebSocketUrl(
        `/api/companies/${encodeURIComponent(liveCompanyId)}/events/ws`,
      );
      const nextSocket = new WebSocket(url);
      socket = nextSocket;
```

| 항목 | 내용 | 근거 |
|---|---|---|
| URL builder | chooses `wss` for HTTPS, `ws` otherwise. | `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/websocket-url.ts:13-20` |
| reconnect | exponential backoff up to `15000`. | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/LiveUpdatesProvider.tsx:1041-1048` |
| event handling | parses JSON and calls `handleLiveEvent`. | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/LiveUpdatesProvider.tsx:1070-1079` |
| cache invalidation | live run, heartbeat, agents, dashboard, costs invalidated on events. | `/Users/river/Downloads/archives/paperclip-master/ui/src/context/LiveUpdatesProvider.tsx:639-644`, `:676-801` |

**Agent ops: heartbeat execution loop**

```ts
// /Users/river/Downloads/archives/paperclip-master/server/src/index.ts:854-872
    setInterval(() => {
      const sweptRuntimeStatuses = heartbeat.sweepExpiredRuntimeStatuses();
      if (sweptRuntimeStatuses > 0) {
        logger.info(
          { swept: sweptRuntimeStatuses },
          "heartbeat runtime-status sweeper cleared expired entries",
        );
      }

      void heartbeat
        .tickTimers(new Date())
```

```ts
// /Users/river/Downloads/archives/paperclip-master/server/src/services/heartbeat.ts:8375-8449
  async function startNextQueuedRunForAgent(agentId: string) {
    return withAgentStartLock(agentId, async () => {
      const agent = await getAgent(agentId);
      if (!agent) return [];
      const invokability = await getAgentInvokability(agent);
      if (!invokability.invokable) {
        if (shouldCancelRunsForNonInvokableAgent(invokability)) {
          await cancelActiveForAgentInternal(agentId, `Cancelled because the agent is not invokable: ${invokability.reason}`);
```

```ts
// /Users/river/Downloads/archives/paperclip-master/server/src/services/heartbeat.ts:9741-9770
      let adapterResult: Awaited<ReturnType<typeof adapter.execute>>;
      try {
        adapterResult = await adapter.execute({
          runId: run.id,
          agent,
          runtime: runtimeForAdapter,
          config: runtimeConfig,
          context,
          runtimeCommandSpec: adapter.getRuntimeCommandSpec?.(runtimeConfig) ?? null,
```

**Agent ops: budget/cost enforcement**

| mechanism | source |
|---|---|
| cost events are created after run usage/cost extraction | `/Users/river/Downloads/archives/paperclip-master/server/src/services/heartbeat.ts:8355-8371` |
| wakeup path checks `budgets.getInvocationBlock` before starting work | `/Users/river/Downloads/archives/paperclip-master/server/src/services/heartbeat.ts:11056-11065` |
| daily cap records skipped heartbeat request before adapter invocation | `/Users/river/Downloads/archives/paperclip-master/server/src/services/heartbeat.ts:11584-11608` |
| hard budget incident creates `budget_override_required` approval | `/Users/river/Downloads/archives/paperclip-master/server/src/services/budgets.ts:374-413` |
| budget pause updates agent/project/company and can cancel active work | `/Users/river/Downloads/archives/paperclip-master/server/src/services/budgets.ts:213-259` |
| invocation block checks company, agent, project hard-stop and paused status | `/Users/river/Downloads/archives/paperclip-master/server/src/services/budgets.ts:717-860` |

**Agent ops: approval gate**

| mechanism | source |
|---|---|
| create approval route validates schema, company access, approval access, run-context mutation guard. | `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:128-132` |
| approval payload is normalized for `hire_agent`, persisted with `status: "pending"`, linked to issues. | `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:139-167` |
| approve endpoint requires board actor. | `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:196-204` |
| approval service only resolves `pending` or `revision_requested`. | `/Users/river/Downloads/archives/paperclip-master/server/src/services/approvals.ts:15-16`, `:37-79` |
| approval approved can wake requester agent via heartbeat. | `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:225-232` |
| cheap status-only recovery runs cannot create/modify approvals. | `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:76-105` |

**Agent ops: activity/audit log**

| mechanism | source |
|---|---|
| `activityLog` table stores actor, action, entity, agent/run refs, details. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/activity_log.ts:6-25` |
| `heartbeatRunEvents` stores run event stream with `seq`, `eventType`, `message`, `payload`. | `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/heartbeat_run_events.ts:6-27` |
| `logActivity` sanitizes details, redacts current user values, inserts row, publishes live event. | `/Users/river/Downloads/archives/paperclip-master/server/src/services/activity-log.ts:65-99` |
| activity actions are forwarded as plugin domain events for mapped actions. | `/Users/river/Downloads/archives/paperclip-master/server/src/services/activity-log.ts:14-27`, `:100-118` |

**Security/redaction signals**

| mechanism | source |
|---|---|
| secret-like payload keys are redacted to `***REDACTED***`. | `/Users/river/Downloads/archives/paperclip-master/server/src/redaction.ts:3-13`, `:88-124` |
| approval route redacts approval payload before response. | `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:21-29`, `:180` |
| current user/home path log redaction exists. | `/Users/river/Downloads/archives/paperclip-master/server/src/log-redaction.ts:43-47`, `:107-148` |
| low-trust execution requires isolated workspace and sandbox driver. | `/Users/river/Downloads/archives/paperclip-master/server/src/services/low-trust-runtime-containment.ts:44-87` |
| low-trust runtime services require explicit `runtime.manage`. | `/Users/river/Downloads/archives/paperclip-master/server/src/services/low-trust-runtime-containment.ts:89-104` |

## ⑤ 리프트 플랜 후보 (planning only, no edits)

**Lift candidates**

| liftable piece | classify | effort to vanilla JS | 근거 | 포팅 메모 |
|---|---|---:|---|---|
| design-tokens | `adapt` | `S` | Tokens in `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:45-158`; radius conflict at `:39-47`; dark tokens at `:160-218`. | Raw colors/status/gradient names can be converted to JB CSS vars. Must not inherit radius `0`. |
| status-system | `adapt` | `M` | `status-colors.ts` maps task/agent status classes and CSS vars: `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/status-colors.ts:49-199`; badges consume `--sc`: `/Users/river/Downloads/archives/paperclip-master/ui/src/components/StatusBadge.tsx:14-17`, `:84-98`. | Good conceptual source for status chips/glyphs. Need vanilla class/render functions instead of React components. |
| IA-sidebar | `reference-only` | `M` | Sidebar state persisted in `/Users/river/Downloads/archives/paperclip-master/ui/src/context/SidebarContext.tsx:45-76`; layout routes in `/Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:443-445`. | JB target shell is fixed 4-zone rail/sidebar/main/properties. Reference collapse behavior only. |
| router-pattern | `reference-only` | `M` | React Router wrapper at `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/router.tsx:44-111`; JSX route table at `/Users/river/Downloads/archives/paperclip-master/ui/src/App.tsx:76-214`, `:387-448`. | Do not lift React Router. Translate route table idea into JB in-memory string switch. |
| data-schema | `adapt` | `M` | `issues`, `heartbeatRuns`, `agents`, `companySkills`, `issueWorkProducts`, `approvals`, `activityLog`: `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/issues.ts:22`; `/heartbeat_runs.ts:6`; `/agents.ts:14`; `/company_skills.ts:16`; `/issue_work_products.ts:18`; `/approvals.ts:5`; `/activity_log.ts:6`. | Map to localStorage JSON collections using JB contract names. Do not lift Drizzle/Postgres. |
| agent-ops-mechanism | `reference-only` | `L` | Scheduler interval `/Users/river/Downloads/archives/paperclip-master/server/src/index.ts:854-872`; queued run executor `/Users/river/Downloads/archives/paperclip-master/server/src/services/heartbeat.ts:8375-8453`; adapter execution `:9741-9770`; budget block `:11056-11065`; approvals route `/server/src/routes/approvals.ts:196-204`. | Useful as behavior model for heartbeat, budget gate, approval wakeups. JB MVP should simulate locally and keep all customer-facing actions behind approval. |
| component-anatomy | `adapt` | `S` | `EntityRow` `/Users/river/Downloads/archives/paperclip-master/ui/src/components/EntityRow.tsx:5-87`; `StatusBadge` `/StatusBadge.tsx:28-98`; `PropertyRow` `/GoalProperties.tsx:21-28`; `MetricCard` `/MetricCard.tsx:5-52`. | Convert to string-template functions. Keep JB radius `8px` and Pretendard. |

**Must NOT be lifted**

| item | status | source |
|---|---|---|
| React runtime | DO NOT LIFT | React dependency in `/Users/river/Downloads/archives/paperclip-master/ui/package.json:61-62`; root override `/Users/river/Downloads/archives/paperclip-master/package.json:77-78` |
| React Router runtime | DO NOT LIFT | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:65`; wrapper `/Users/river/Downloads/archives/paperclip-master/ui/src/lib/router.tsx:1-3`, `:44` |
| TanStack Query runtime | DO NOT LIFT | `/Users/river/Downloads/archives/paperclip-master/ui/package.json:52`; provider `/Users/river/Downloads/archives/paperclip-master/ui/src/main.tsx:6`, `:47` |
| Tailwind pipeline | DO NOT LIFT | Tailwind deps `/Users/river/Downloads/archives/paperclip-master/ui/package.json:70`, `:78`; CSS import `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:1`; Vite plugin `/Users/river/Downloads/archives/paperclip-master/ui/vite.config.ts:4`, `:8` |
| shadcn/Radix components | DO NOT LIFT AS RUNTIME | shadcn config `/Users/river/Downloads/archives/paperclip-master/ui/components.json:2-20`; Radix deps `/Users/river/Downloads/archives/paperclip-master/ui/package.json:50`, `:60` |
| Express server | DO NOT LIFT | `/Users/river/Downloads/archives/paperclip-master/server/package.json:72` |
| Drizzle/Postgres | DO NOT LIFT | `/Users/river/Downloads/archives/paperclip-master/server/package.json:70-71`; `/Users/river/Downloads/archives/paperclip-master/packages/db/package.json:48-50` |
| WebSocket server | DO NOT LIFT | `/Users/river/Downloads/archives/paperclip-master/server/package.json:80`; UI WebSocket client `/Users/river/Downloads/archives/paperclip-master/ui/src/context/LiveUpdatesProvider.tsx:1051-1079` |

**Conflicts**

| conflict | source | JB implication |
|---|---|---|
| paperclip dark-default HTML | `/Users/river/Downloads/archives/paperclip-master/ui/index.html:2`, `:21-40` | JB target is light console. Do not inherit `class="dark"` default or dark-first theme bootstrap. |
| paperclip root radius `0` | `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:47`; large radii also `0px` at `:41-42` | JB target requires `--radius:8px` for all components. |
| component classes use mixed radii | `rounded-md` button `/Users/river/Downloads/archives/paperclip-master/ui/src/components/ui/button.tsx:8`; `rounded-lg` dialog `/Users/river/Downloads/archives/paperclip-master/ui/src/components/ui/dialog.tsx:62`; `rounded-full` badges `/Users/river/Downloads/archives/paperclip-master/ui/src/components/StatusBadge.tsx:32`, `:51`, `:89` | Normalize to JB `8px`, except semantic circles/icons if explicitly allowed. |
| paperclip font is not Pretendard | `Pretendard` NOT FOUND; inherited font in `/Users/river/Downloads/archives/paperclip-master/ui/src/index.css:271`, `:655`, `:760`, `:1367` | JB must keep Pretendard. Do not copy font defaults. |
| PII/secrets can exist in approval/log payloads | approvals payload `/Users/river/Downloads/archives/paperclip-master/packages/db/src/schema/approvals.ts:14`; redaction exists `/Users/river/Downloads/archives/paperclip-master/server/src/redaction.ts:88-124`; route redacts `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:25-29` | JB hard rule remains stricter: never export raw PII to external LLMs. Lift redaction idea, not payload behavior. |
| approval bypass risk if agent actions copied without board gate | approve requires board `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:196-204`; cheap recovery guard `/Users/river/Downloads/archives/paperclip-master/server/src/routes/approvals.ts:76-105` | JB customer-facing actions must always stay behind human approval gate. |
| external plugin/event surface | `logActivity` publishes plugin domain event `/Users/river/Downloads/archives/paperclip-master/server/src/services/activity-log.ts:100-118` | Reference only. JB localStorage MVP should avoid external plugin/event egress. |
| low-trust sandbox requirements are backend-dependent | `/Users/river/Downloads/archives/paperclip-master/server/src/services/low-trust-runtime-containment.ts:44-87`, `:89-104` | Use as policy inspiration only; JB has no Express/Postgres/runtime sandbox in target stack. |
