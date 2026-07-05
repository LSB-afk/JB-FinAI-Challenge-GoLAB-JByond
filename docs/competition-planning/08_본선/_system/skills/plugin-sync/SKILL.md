---
name: plugin-sync
description: 팀이 쓰는 Claude Code 플러그인 세트를 커밋된 SSOT(.claude/settings.json)에서 새 기기·새 팀원에게 재현·동기화하는 스킬 + 설치 가이드. "플러그인 설치/동기화", "새 노트북에 세팅", "팀원이 같은 플러그인 깔게", "환경 재현", "무슨 플러그인 쓰지" 맥락에서 사용. skills는 bootstrap.sh, plugins는 이 스킬이 담당 → 둘 다 하면 환경 완전 동기화.
tags:
  - area/system
  - type/skill
  - status/active
date: 2026-07-03
up: "[[_tools-index]]"
---
# plugin-sync

> **플러그인 세트 = 커밋된 `.claude/settings.json` 하나가 유일 원천.** 목록을 손으로 이중 관리하지 않는다.
> 새 기기/새 팀원은 `sync.mjs` 만 돌리면 동일한 플러그인 환경이 재현된다. 대화형 로그인 불필요 — `claude plugin` CLI만 구동.

## 실행

```bash
# 설치 가이드(실행할 명령만 출력, 설치 안 함)
node 08_본선/_system/skills/plugin-sync/sync.mjs --dry-run
# 실제 동기화 (팀 세트 = 프로젝트 settings.json)
node 08_본선/_system/skills/plugin-sync/sync.mjs
# 개인 전역 세트까지 (~/.claude/settings.json)
node 08_본선/_system/skills/plugin-sync/sync.mjs --global
node 08_본선/_system/skills/plugin-sync/sync.mjs --self-test   # 파싱·플랜 검증
```

멱등 — 이미 추가/설치된 마켓플레이스·플러그인은 `(skip)`으로 넘어간다. `settings.json` 에서 플러그인이 추가/제거되면 다시 돌리면 그대로 반영.

## 팀 세트 (동기화 대상)

> 마켓플레이스 6 + 플러그인 12. **전체 목록·용도·역할별 권장 = [[registry-plugins]]**(커스텀 레지스트리, 사람용 표). 이 스킬은 "무엇"이 아니라 **"어떻게 동기화"**만 담당 — 목록 중복 보유하지 않는다.
> 항상 최신 설치 명령 = `sync.mjs --dry-run` 출력(= 정본, `.claude/settings.json`에서 파생).

## 개인 전역 세트 (참고 · 팀 동기화 대상 아님)

`~/.claude/settings.json` 에만 있는 개인 도구: `ponytail`(과설계 방지), `taste-skill`(디자인 감각), `notebooklm-py`, `agent-sdk-dev`. 비활성: `telegram`·`chrome-devtools-mcp`. 개인 세트 재현은 `--global` (일부 마켓플레이스는 `~/.claude/plugins/known_marketplaces.json`에 있어 CLI가 자동 보완).

## 스킬 ↔ 플러그인 동기화 경계

- **스킬(자체 구축)** 동기화 = `bootstrap.sh` → `_system/skills/*` 를 `.claude/skills/`로 배포(SKILL_DIRS).
- **플러그인** 동기화 = 이 스킬(`sync.mjs`) → `settings.json` 세트를 설치.
- **둘 다 = 환경 완전 재현.** bootstrap.sh STEP에 `plugin-sync` 호출 1줄을 넣으면 한 번에 끝난다(⚠️ `bootstrap.sh`/`settings.json` 편집은 **승인 게이트** — 사람 승인 후).

## harness-sync 의 plugin-inventory 와 차이 (방향 반대)
- `plugin-inventory.mjs`(harness-sync): **라이브 환경 → `registry-plugins.md`** 문서화. ⚠️ 개인 전역 플러그인이 팀 레지스트리를 오염시킬 수 있어 실행 주의.
- `plugin-sync`(이 스킬): **커밋 `settings.json`(팀 세트) → 설치 환경.** 오염 없이 재현·동기화.

## 연결
- [[_tools-index]] · [[registry-plugins]] · [[registry-skills]] · [[bootstrap.sh]] · [[본선-운영-하네스]]
