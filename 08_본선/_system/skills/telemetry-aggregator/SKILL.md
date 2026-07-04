---
name: telemetry-aggregator
description: ai-session-intake.csv를 읽어 _telemetry-log.md·_contribution-stats.md·_agent-registry.md·ai-usage-stats.md를 갱신하는 집계 스킬
tags:
  - area/system
  - type/skill
  - status/active
date: 2026-06-27
up: "[[_tools-index]]"
---
# telemetry-aggregator

> `ai-session-intake.csv` → 4개 통계 파일 자동 갱신 스킬.
> `aggregate.mjs`를 실행하거나 "텔레메트리 집계해줘" 트리거 시 동작.

## 목적

intake CSV에 누적된 원시 AI 세션 데이터를 파싱해 다음 4개 파일을 덮어쓰거나 append한다:

| 출력 파일 | 갱신 방식 | 설명 |
|-----------|----------|------|
| `telemetry/_telemetry-log.md` | append | 미반영 행만 추가 (중복 방지: `ts` 키 기준) |
| `team/_contribution-stats.md` | 섹션 갱신 | 팀원×분야 기여 통계 재계산 |
| `agents/_agent-registry.md` | 섹션 갱신 | 에이전트별 누적 토큰·세션수 갱신 |
| `telemetry/ai-usage-stats.md` | 전체 재생성 | 엔진별·도메인별·기간별 집계 |

## 실행

```bash
# 프로젝트 루트에서
node 08_본선/_system/skills/telemetry-aggregator/aggregate.mjs
```

인수 없이 실행하면 `cwd`에서 `08_본선/_system/` 경로를 자동 탐색한다.

## 주의사항

- intake CSV는 append-only — 스킬이 CSV를 수정하지 않음
- 기존 행 수정 금지: 오류 시 새 `_CORRECTION` 행 추가 후 재집계
- 세션 종료 훅(`session-telemetry.mjs`)이 CSV에 행을 추가한 뒤, 이 스킬이 통계를 반영

## 연결

- [[08_본선/04_증빙/02_분석자료/리서치/리서치-인덱스|리서치 인덱스]] — 컬럼 가이드
- [[ai-usage-stats]] — 집계 결과 SSoT
- [[_telemetry-log]] — Append-only 원본 로그
- [[_agent-registry]] — 에이전트 레지스트리
- [[_contribution-stats]] — 팀 기여 통계
