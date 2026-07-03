---
tags:
  - area/system
  - type/index
  - status/active
date: 2026-06-27
up: "[[_HARNESS-SYSTEM]]"
aliases:
  - 메모리인덱스
  - memory-index
---
# 인-볼트 공유 메모리 인덱스

> 대외비 — 6/29 공식발표 전 비공개. GitHub 팀 공유 예정(4인).

이 파일은 `08_본선/_system/memory/context/` 하위 모든 사실·결정·맥락 파일의 단일 포인터 목록이다. 새 사실이 추가되면 이 인덱스에도 1행을 추가한다(append-only).

---

## 컨텍스트 메모리 (context/)

| 파일 | 핵심 사실 한 줄 |
|------|----------------|
| [[08_본선/_system/memory/context/제품-정의\|제품-정의]] | JB LocalGuard OS = RM용 거버넌드 AI Agent 운영 콘솔; 코어베팅 3결합 |
| [[08_본선/_system/memory/context/본선-현황\|본선-현황]] | GoLAB 본선 13팀, 7/4~5 정읍, 6/29 공식발표, 구글폼 6/28 |
| [[08_본선/_system/memory/context/재설계-방향\|재설계-방향]] | 현 정적 MVP UI 폐기 → 역엔지니어링 재설계; 백엔드 Node+TS 접근법A |
| [[08_본선/_system/memory/context/레퍼런스\|레퍼런스]] | paperclip=디자인·라우터·데이터·에이전트운영 기준; hagent-os=구조·MOC·메모리 1등 기준 |
| [[08_본선/_system/memory/context/대외비-규칙\|대외비-규칙]] | 6/29 전 외부유출·공개푸시 금지; .eml·개인정보 git 비추적 |
| [[08_본선/_system/memory/context/리서치-사이클\|리서치-사이클]] | 딥프롬프트 27종·결과 회수(수식 LaTeX)·모델기록·총정리본; 1차 사이클 6/30 마감 |
| [[08_본선/_system/memory/context/본선-운영-하네스\|본선-운영-하네스]] | 자체 스킬 9종·AI 자동 시행 규칙·시각화/제출 정합성 검증 맵 |
| [[08_본선/_system/memory/context/실동작-슬라이스\|실동작-슬라이스]] | JB_project2 파이프라인·가드레일 실재·LLM출력 목업 → ccl-financial/CCL-0001 실 LLM 슬라이스 PR `LSB-afk/JB_project2#1` |

---

## 기록 규약

- 새 사실은 `context/` 에 개별 파일로 생성 후 이 인덱스에 행 추가
- 파일명 중복 금지, 위키링크로만 참조
- 세션 간 회상 속도가 목적이므로 각 파일은 핵심 사실 1건만 담는다

---

## 연결

- [[_HARNESS-SYSTEM|하네스 시스템 마스터 설계]]
- [[08_본선/_system/telemetry/_telemetry-log|텔레메트리 로그]]
- [[08_본선/_system/agents/_agent-registry|에이전트 레지스트리]]
