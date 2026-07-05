---
name: session-boot
description: 새 세션을 본선 하네스에 빠르게 "부팅" — 진입점·현재 상태(미커밋·미해결·다음 할 일)·자동 시행 스킬 규약·승인 게이트를 한 번에 로드해 오리엔테이션. 본선(08_본선) 작업을 시작할 때, "세션 시작/부팅"·"어디까지 했지"·"현재 상태"·"하네스 로드"·인수인계 받을 때 사용. 복잡한 시스템을 매번 더듬지 않게 한다.
tags:
  - area/system
  - type/skill
  - status/active
date: 2026-07-01
up: "[[_tools-index]]"
---
# session-boot

> 본선 작업 세션의 **오리엔테이션 스킬**. 하네스가 복잡해 새 세션이 매번 길을 잃으므로, "지금 어디고·무엇이 열려있고·무엇이 자동으로 도는지"를 한 번에 로드한다.

## 실행

```bash
# 컴팩트 상태 스냅샷 (큰 로그를 다 안 읽고 핵심만)
node 08_본선/_system/skills/session-boot/boot.mjs
node .../boot.mjs --self-test
```

## 부팅 순서 (AI 단계)

1. **스냅샷** — `boot.mjs` 실행 → git(브랜치·미커밋·HEAD) · PLAN 현재 페이즈 · 마지막 session-log·decision-log 블록 · 진입점·자동스킬·게이트 요약을 받는다.
2. **진입점 확인**(필요 시 깊이 읽기) — [[본선 HOME]] → [[PLAN]](무엇을 왜) → [[PROGRESS]](작업 상태) → [[AGENTS]] §4-A(자동 스킬 규약) → [[_tools-index]](도구·스킬 지도).
3. **열린 일 파악** — 스냅샷의 decision/session "상태·다음"에서 **미커밋·승인 대기·보류(⏳)** 항목을 추린다. 대기 중인 제안(예: [[본선-도구-확장-제안]] 트리거)도 확인.
4. **규약 재로드** — 아래 항상-적용 규칙을 의식하고 작업 시작.
5. **브리핑** — 사용자에게 "현재 상태 / 열린 일 / 바로 할 수 있는 것"을 3~5줄로 요약 보고.

## 항상-적용 규칙 (부팅 시 재확인)

- **Capture-by-default** — 작업 끝에 프롬프트·결정·세션·텔레메트리 누적([[본선-운영-하네스]]). 세션종료/"프롬프트 기록"→[[prompt-capture]].
- **자동 시행 스킬** — 파일생성→[[canon-moc-sync]] · 새 도구→[[tool-intake]] · 회의STT→[[meeting-intake]] · 제품정의 변경→[[submission-consistency-check]] · 보드영향→[[visualization-cycle]]. (AGENTS §4-A 표가 SSOT)
- **승인 게이트** — 외부 제출·공개 푸시·고객 대상·`settings.json`/`bootstrap.sh` 편집 = **사람 승인**.
- **SSOT·측정 규율** — 사실/수치 = [[_canon]]·정본. 링크·도달성은 **직접 grep 금지, [[canon-moc-sync]]로**(NFC·이스케이프파이프 함정).
- 🔒 대외비 게이트(6/29 전 비공개)는 만료. 푸시는 사용자 지시 시.

## 자동 호출 와이어링
프로젝트 `CLAUDE.md`에 "본선(08_본선) 작업 시작 시 `session-boot` 먼저 실행" 지시 1줄을 두어, 새 세션이 자동으로 부팅한다. (완전 자동을 원하면 SessionStart 훅으로 승격 가능 — 승인 후.)

## 연결
- [[본선 HOME]] · [[PLAN]] · [[PROGRESS]] · [[AGENTS]] · [[_tools-index]] · [[registry-skills]] · [[본선-운영-하네스]]
