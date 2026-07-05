---
tags:
  - area/system
  - type/registry
  - status/active
date: 2026-06-27
up: "[[_tools-index]]"
aliases:
  - 커맨드레지스트리
  - registry-commands
---
# registry-commands

> Claude Code 내장 슬래시 커맨드 레지스트리.
> 커맨드는 Claude Code 세션 안에서 `/커맨드명` 으로 직접 호출. 설치 불필요.

---

## 슬래시 커맨드 레지스트리

| 도구 | 종류 | 설치/와이어링 | 인증요부 | 상태 | 용도(본선) | 엔진(Claude/Codex) |
|------|------|-------------|---------|------|-----------|------------------|
| `/code-review` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 코드 변경 리뷰 (버그·단순화·효율) `--comment` PR 인라인, `--fix` 자동 수정 | Claude |
| `/verify` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 코드 변경 실제 동작 검증 (앱 실행 후 관찰) | Claude |
| `/review` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 현재 diff 일반 리뷰 | Claude |
| `/security-review` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 보안 취약점 분석 (커밋 전 필수) | Claude |
| `/run` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 앱 실행·스크린샷·동작 확인 | Claude |
| `/loop` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 반복 실행 설정 (예: `/loop 5m /run`) | Claude |
| `/update-config` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | settings.json 훅·권한·환경변수 자동 설정 | Claude |
| `/init` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 프로젝트 Claude Code 초기화 (CLAUDE.md 생성) | Claude |
| `/simplify` | 내장 슬래시 커맨드 | Claude Code 내장 | 없음 | 활성 | 변경 코드 단순화·재사용·효율 개선 적용 | Claude |

---

## 주요 사용 패턴 (본선)

```
# 제출 직전 체크
/security-review
/verify

# 코드 작성 후
/code-review --fix

# 세션 반복 모니터링
/loop 10m /run

# 하네스 설정 변경
/update-config
```

---

## 연결

- [[_tools-index|도구 인덱스]]
- [[_HARNESS-SYSTEM|하네스 시스템]]
- [[registry-skills|스킬 레지스트리]] (스킬도 슬래시로 호출 가능)
