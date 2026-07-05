---
tags:
  - area/system
  - type/moc
  - status/active
date: 2026-06-27
up: "[[_MOC_HOME|본선 MOC 허브]]"
---

# 시스템 도구 MOC

> vault 운영·시각화·탐색 도구 모음. 콘텐츠가 아닌 인프라 레이어.

---

## 하네스 시스템 (마스터)

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/_HARNESS-SYSTEM\|하네스 시스템 마스터 설계]] | 전체 운영 하네스 설계 원본 |

---

## 인-볼트 공유 메모리

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/memory/_memory-index\|메모리 인덱스]] | 공유 메모리 단일 포인터 목록 |
| [[08_본선/_system/memory/context/제품-정의\|제품-정의]] | JB LocalGuard OS 제품 정의 |
| [[08_본선/_system/memory/context/본선-현황\|본선-현황]] | GoLAB 본선 13팀, 7/4~5 정읍 |
| [[08_본선/_system/memory/context/재설계-방향\|재설계-방향]] | 정적 MVP 폐기 → 역엔지니어링 재설계 |
| [[08_본선/_system/memory/context/레퍼런스\|레퍼런스]] | paperclip·hagent-os 기준 레퍼런스 |
| [[08_본선/_system/memory/context/대외비-규칙\|대외비-규칙]] | 6/29 전 보안 제약 |

---

## 텔레메트리

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/telemetry/_telemetry-log\|텔레메트리 로그]] | append-only 에이전트 사용량 기록 |

---

## 팀

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/team/_team-roster\|팀 로스터]] | GoLAB 4인 팀 개요 |
| [[08_본선/_system/team/member-template\|멤버 프로필 템플릿]] | 개인 프로필 작성 기준 |
| [[08_본선/_system/team/member-01\|member-01]] | 팀원 01 프로필 (TBD) |
| [[08_본선/_system/team/member-02\|member-02]] | 팀원 02 프로필 (TBD) |
| [[08_본선/_system/team/member-03\|member-03]] | 팀원 03 프로필 (TBD) |
| [[08_본선/_system/team/member-04\|member-04]] | 팀원 04 프로필 (TBD) |
| [[08_본선/_system/team/_contribution-stats\|기여 통계]] | 팀원×분야 기여 현황 + AI 에이전트 기여 합계 |

---

## 운영 SSoT & 계획

| 파일 | 역할 |
|-----|------|
| [[08_본선/PLAN\|PLAN]] | 운영 SSoT — 무엇을 왜 |
| [[08_본선/PROGRESS\|PROGRESS]] | 작업 단위 상태 |
| [[08_본선/AGENTS\|에이전트 협업 계약]] | 역할분담·핸드오프·의사결정 |
| [[08_본선/02_전략/01_foundation/본선-마스터-플레이북\|마스터 플레이북]] | 본선 북극성(시스템 보존) |

---

## 에이전트 로스터 (다학제 11 + 후보 4)

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/agents/_agent-registry\|에이전트 레지스트리]] | 운영·개발 AI 에이전트 정의·기여·토큰 추적 |
| [[08_본선/_system/agents/roles/orchestrator\|orchestrator]] · [[08_본선/_system/agents/roles/finance-domain\|finance-domain]] · [[08_본선/_system/agents/roles/compliance-risk\|compliance-risk]] · [[08_본선/_system/agents/roles/research\|research]] · [[08_본선/_system/agents/roles/product\|product]] | 활성 역할 (1) |
| [[08_본선/_system/agents/roles/designer\|designer]] · [[08_본선/_system/agents/roles/builder\|builder]] · [[08_본선/_system/agents/roles/judge-qa\|judge-qa]] · [[08_본선/_system/agents/roles/evidence\|evidence]] · [[08_본선/_system/agents/roles/submission\|submission]] | 활성 역할 (2) |
| [[08_본선/_system/agents/roles/visualization\|visualization]] | 활성 역할 (시각화 PM + 데이터 품질 관리자) |
| [[08_본선/_system/agents/candidates/red-team-judge\|red-team-judge]] · [[08_본선/_system/agents/candidates/data-engineer\|data-engineer]] · [[08_본선/_system/agents/candidates/pitch-storyteller\|pitch-storyteller]] · [[08_본선/_system/agents/candidates/security\|security]] | 후보(대비) |

---

## 도구 시스템 & 자체 스킬

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/tools/_tools-index\|도구 인덱스]] | skills/plugins/mcp/cli/commands 레지스트리 허브 + 부트스트랩 |
| [[08_본선/_system/skills/telemetry-aggregator/SKILL\|telemetry-aggregator]] | intake CSV → 통계 파생 갱신(파이프라인 엔진) |
| [[08_본선/_system/skills/canon-moc-sync/SKILL\|canon-moc-sync]] | 중복명·MOC링크·frontmatter 집행 |
| [[08_본선/_system/skills/pii-governance-validator/SKILL\|pii-governance-validator]] | PII 비반출·승인우회 위반 스캔 |
| [[08_본선/_system/skills/visualization-cycle/SKILL\|visualization-cycle]] | VISUALIZATION-PLAN 기준 Excalidraw 재생성·검증 |
| [[08_본선/_system/skills/harness-sync/SKILL\|harness-sync]] | **상태 동기화** — 모든 시스템 파일을 현재 상태로(프롬프트·로그·레지스트리·MOC·메모리·텔레메트리) |

---

## 기록 파이프라인 & 인사이트

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/automation/README\|자동 기록 하네스]] | Stop훅 → intake CSV (Capture-by-default) |
| [[08_본선/_system/telemetry/ai-usage-stats\|사용량 통계]] | aggregator 파생 통계 SSoT |
| [[08_본선/_system/ax-insights\|AX 인사이트]] | 외부 자랑·인수인계·메타평가 합성 |

---

## 협업

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/collaboration-rules\|협업 규칙]] | 브랜치·커밋·옵시디언·로그·핸드오프·비밀유지 |

---

## 시각화

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/visualizations/_viz-index\|시각화 인덱스]] | 다이어그램 목록·데이터 스펙 |
| [[08_본선/_system/visualizations/VISUALIZATION-PLAN\|시각화 기획안]] | Excalidraw 생성 전 목적·독자·데이터·갱신 조건을 고정하는 상위 SSoT |
| [[08_본선/_system/visualizations/timeline\|타임라인]] | 대회 전체 타임라인 Excalidraw |
| [[08_본선/_system/visualizations/contribution\|기여도]] | 팀원×분야 기여 히트맵 Excalidraw |
| [[08_본선/_system/visualizations/tokens-time\|토큰/시간]] | 세션별 토큰 사용량 추이 Excalidraw |
| [[08_본선/_system/visualizations/agent-flow\|에이전트 흐름]] | 에이전트 협업 흐름도 Excalidraw |

---

## 기존 시스템 파일

| 파일 | 역할 |
|-----|------|
| [[08_본선/_system/dashboard/project-dashboard\|프로젝트 대시보드]] | KPI·마일스톤·제출 네비게이션 |
| [[08_본선/_system/workspace-visual-map\|워크스페이스 비주얼 맵]] | 폴더 구조 시각화 |

---

## 탐색

- [[08_본선/_MOC/_MOC_HOME|본선 MOC 허브]]로 돌아가기
- [[본선 HOME|본선 HOME]] — 최상위 진입점
