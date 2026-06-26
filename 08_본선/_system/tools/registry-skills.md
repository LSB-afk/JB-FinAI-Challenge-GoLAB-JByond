---
tags:
  - area/system
  - type/registry
  - status/active
date: 2026-06-27
up: "[[_tools-index]]"
aliases:
  - 스킬레지스트리
  - registry-skills
---
# registry-skills

> Claude Code 스킬 레지스트리 — 보유 스킬(글로벌·프로젝트) + 자체 구축 스킬.
> 자체 구축 스킬은 `08_본선/_system/skills/` 하위에 버전 관리되며 bootstrap.sh로 배포.

---

## 스킬 레지스트리

| 도구 | 종류 | 설치/와이어링 | 인증요부 | 상태 | 용도(본선) | 엔진(Claude/Codex) |
|------|------|-------------|---------|------|-----------|------------------|
| `notion-publish` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | Notion 페이지 발행 자동화 | Claude |
| `perplexity-web-mcp` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | Perplexity 세션 | 활성 | 웹 검색·AI 모델 쿼리 (pplx_*) | Claude |
| `verify` | 보유 스킬 (`/verify`) | 내장 슬래시 커맨드 | 없음 | 활성 | 코드 변경 실제 동작 검증 | Claude |
| `web-demo-video` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 시연 영상 자동 녹화 | Claude |
| `token-efficient-ops` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 컨텍스트 절약·배치 최적화 | Claude |
| `manage-skills` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 스킬 목록·활성화 관리 | Claude |
| `deep-research` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 멀티소스 팩트체크 리서치 | Claude |
| `humanize-korean` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | AI 문체 → 자연스러운 한국어 윤문 | Claude |
| `superpowers:*` | 보유 스킬 (묶음) | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 브레인스토밍·병렬에이전트·TDD·코드리뷰 등 | Claude |
| `obsidian:*` | 보유 스킬 (묶음) | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 옵시디언 Bases·Canvas·CLI·Markdown 관리 | Claude |
| `codex:*` | 보유 스킬 (묶음) | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | Codex CLI 런타임·결과 핸들링·GPT-5.4 프롬프트 | Codex |
| `example-skills:*` | 보유 스킬 (묶음) | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 알고리즘 아트·웹앱·슬랙 GIF 등 참조 예시 | Claude |
| `skill-creator` | 보유 스킬 | `~/.claude/skills/` 전역 등록 | 없음 | 활성 | 새 스킬 정의·생성 | Claude |
| **`telemetry-aggregator`** | **자체 구축 스킬** | `_system/skills/telemetry-aggregator/` → bootstrap → `.claude/skills/` | 없음 | **활성** | 세션 종료 시 텔레메트리 자동 집계·append | Claude |
| **`canon-moc-sync`** | **자체 구축 스킬** | `_system/skills/canon-moc-sync/` → bootstrap → `.claude/skills/` | 없음 | **활성** | MOC 정합성 자동 검증·동기화 | Claude |
| **`pii-governance-validator`** | **자체 구축 스킬** | `_system/skills/pii-governance-validator/` → bootstrap → `.claude/skills/` | 없음 | **활성** | 개인정보 거버넌스 자동 검증 | Claude |
| **`harness-sync`** | **자체 구축 스킬** | `_system/skills/harness-sync/` → bootstrap → `.claude/skills/` | 없음 | **활성** | 세션 체크포인트·종료 시 모든 시스템 파일 동기화 (8단계 루틴) | Claude |

---

## 연결

- [[_tools-index|도구 인덱스]]
- [[_HARNESS-SYSTEM|하네스 시스템]]
- 자체 스킬 소스: `08_본선/_system/skills/`
