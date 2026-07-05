---
tags:
  - area/system
  - type/guide
  - status/active
date: 2026-06-27
up: "[[본선 HOME]]"
aliases:
  - 하네스시스템
  - HARNESS-SYSTEM
  - 운영하네스
---
# 본선 운영 하네스 (Ops Harness) — 메모리·기록·협업 시스템 마스터 설계

> 목적: `_system/`의 전체 구성(메모리·텔레메트리·팀·에이전트·시각화)과 자동화 설계를 정의하는 마스터 설계도 — "무엇이 있고 어떻게 연결되는가". 실무 규칙은 [[collaboration-rules]], 병렬 세션 운영은 [[AI-협업-맥락관리-프로토콜]] 참조.

> ⚠️ 대외비 — 6/29 공식발표 전 비공개. GitHub 오픈소스 공유 예정(팀원 4명).
> **핵심 원칙 — Capture-by-default**: *사용자가 몰라도 에이전트는 놓치지 않고 기록한다.* 모든 의미 있는 작업·결정·프롬프트·툴/토큰/시간·기여는 시스템이 자동(또는 규약상 강제)으로 누적한다.
> 이 시스템 자체가 대회 메타 평가(운영·협업·재현성) 점수 대상이다. 벤치마크: HagentOS(메모리+옵시디언 협업으로 1등).

## 0. 두 종류의 메모리 (구분)
| 메모리              | 위치                      | 공유               | 용도                      |
| ---------------- | ----------------------- | ---------------- | ----------------------- |
| **인-볼트 메모리(정본)** | `08_본선/_system/memory/` | **GitHub로 팀 공유** | 프로젝트 맥락·결정·사실의 공유 단일 출처 |
| 전역 에이전트 메모리      | `~/.claude/.../memory/` | 비공유(내 세션 recall) | 세션 간 빠른 회상용 미러          |

→ 새 맥락은 **인-볼트 메모리에 먼저** 쌓고, 필요 시 전역으로 미러. 팀원은 볼트만 보면 전체 맥락 파악.

## 1. 구성 (`08_본선/_system/`)
| 폴더/파일 | 역할 |
|-----------|------|
| `_HARNESS-SYSTEM.md` | (이 파일) 시스템 마스터 설계 |
| `memory/` | 인-볼트 공유 메모리 — `_memory-index.md` + `context/*.md`(사실·결정·왜) |
| `telemetry/` | 에이전팅 텔레메트리 — `_telemetry-log.md`(append-only) + 스키마. 세션종료·체크포인트·수동 시 툴/토큰/시간 기록 |
| `team/` | 팀원 4명 — `_team-roster.md` + `member-template.md` + `member-01..04.md`(역할·이력·프로필·한 일·분야별 기여 통계) |
| `agents/` | 운영·개발 AI 에이전트 레지스트리 — `_agent-registry.md`(에이전트 정의·기여·토큰) |
| `collaboration-rules.md` | 최소 협업 규칙(브랜치·커밋·옵시디언·로그·핸드오프·비밀유지) |
| `visualizations/` | Excalidraw 시각화 — [[VISUALIZATION-PLAN]] 기획 선행 + `.excalidraw` 자동 생성·검증 |
| `automation/` | 자동 기록 하네스 — Stop 훅 스크립트 + 와이어링(사용자 무자각 기록의 실체) |
| `dashboard/project-dashboard.md` | 살아있는 운영 대시보드(현황·오늘 할 일·블로커) |

## 2. 기록 대상 & 스키마 (무엇을 자동으로 쌓는가)
1. **프롬프트** → `04_증빙/01_핵심로그/프롬프트-로그.md` — 사용자 프롬프트 원문(세션 누적).
2. **결정** → `decision-log.md` — 선택/이유/대안.
3. **세션** → `session-log.md` — 한 일/결과/다음.
4. **텔레메트리** → `telemetry/_telemetry-log.md` — 1행 = 1세션/체크포인트:
   `날짜 | 트리거(세션종료/체크포인트/수동) | 사용 툴(횟수) | 토큰(in/out) | 소요시간 | 작업/산출물 | 투입 에이전트 | 비고`
5. **기여** → `team/_contribution-stats.md`, `agents/_agent-registry.md` — 누가(팀원/에이전트) 어느 분야(개발·디자인·문서·리서치·발표·운영)에 얼마나.
6. **타임라인** → `visualizations/`(엑스칼리드로) + 텔레메트리에서 파생.

## 3. 자동화 (Capture-by-default 구현)
- **규약 층**(항상): [[AGENTS]] — 모든 에이전트/세션은 종료 전 위 로그에 append(수동이라도 강제).
- **자동 층**(훅): `automation/`의 **Stop 훅**이 세션 종료 시 트랜스크립트를 파싱해 `telemetry/_telemetry-log.md`에 툴/토큰/시간/타임스탬프를 자동 append → *사용자가 아무것도 안 해도 기록됨*. 활성화는 `update-config`로 settings.json 등록(검증 후).
- **수동 트리거**: 사용자가 "기록해" 라고 하거나 체크포인트 시점에 동일 항목 갱신.
- **시각화 자동 층**: [[visualization-cycle]]이 [[VISUALIZATION-PLAN]]을 기준으로 `viz-generator.mjs`를 실행하고 `.excalidraw` JSON·인덱스·간트 갭·5초 가독성 정합성을 검증한다. `harness-sync` 자동 단계에 포함된다.

## 4. 시각화 (Excalidraw)
HagentOS처럼 핵심 지표를 엑스칼리드로로 바로 보거나 디자인 참고한다.

- 기획 SSoT: [[VISUALIZATION-PLAN]] — 새 보드·큰 변경은 여기 먼저 등록.
- 담당 에이전트: [[visualization]] — 시각화 PM + 데이터 품질 관리자.
- 자동화 스킬: [[visualization-cycle]] — 계획 확인 → 생성기 실행 → JSON/인덱스·간트 갭·5초 가독성 검증.
- 핵심 보드: 타임라인, 기여도, 툴·토큰·시간 추이, 에이전트 흐름, AX 운영체계, 팀 역할·기여율, 시연영상 스토리보드.

## 5. 연결
- [[AGENTS|협업 계약]] · [[project-dashboard|운영 대시보드]] · [[_MOC_HOME|본선 MOC]] · [[hagent-os-구조-청사진|구조 청사진]]
- 로그: [[프롬프트-로그]] · [[decision-log]] · [[session-log]] · [[master-evidence-ledger]]
