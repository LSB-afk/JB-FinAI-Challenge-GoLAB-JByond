---
tags:
  - area/system
  - type/guide
  - status/draft
date: 2026-06-27
up: "[[_HARNESS-SYSTEM]]"
aliases:
  - 자동화
  - automation
---
# 자동 기록 하네스 (Automation)

> ⚠️ 대외비. "사용자가 몰라도 기록되는" 시스템의 실체. 활성화 전 1회 검증 권장.

## 무엇
`session-telemetry.mjs` — Claude Code **Stop 훅**. 세션 종료 시 트랜스크립트를 파싱해
`_system/telemetry/_telemetry-log.md`에 사용 툴·토큰(in/out)·소요시간을 1행 자동 append하고,
**`_system/telemetry/ai-session-intake.csv`에도 동일 세션을 구조화 CSV 행으로 append**한다.
CSV는 `telemetry-aggregator` 스킬이 읽어 통계 파일들을 갱신하는 원시 데이터 SSoT.

## 와이어링 (settings.json)
`~/.claude/settings.json` 또는 프로젝트 `.claude/settings.json` 의 `hooks`에 등록:
```json
{
  "hooks": {
    "Stop": [
      { "hooks": [ { "type": "command",
        "command": "node '/Users/river/project/active/JBproject/08_본선/_system/automation/session-telemetry.mjs'" } ] }
    ]
  }
}
```
→ 등록은 `update-config` 스킬로 안전하게(권한·검증 포함) 진행 권장.

## 검증 (활성화 전)
1. 최근 트랜스크립트 경로 확보: `~/.claude/projects/-Users-river-project-active-JBproject/*.jsonl`
2. 수동 실행: `echo '{"transcript_path":"<경로>","cwd":"/Users/river/project/active/JBproject"}' | node 08_본선/_system/automation/session-telemetry.mjs`
3. `_system/telemetry/_telemetry-log.md`에 1행이 추가됐는지 확인. 토큰/툴 수치가 합리적이면 훅 등록.

## 안전
- 훅은 실패해도 세션을 막지 않음(에러 조용히 무시).
- 표준 라이브러리만 사용. 외부 전송 없음(로컬 파일 append만).

## 한계 / 다음
- 트랜스크립트 스키마(필드명)는 버전에 따라 다를 수 있어 **1회 검증 필수**.
- 팀원별·작업별 귀속(attribution)은 자동 파싱이 어려움 → `team/` 수동 보정 + 체크포인트 기록 병행.
