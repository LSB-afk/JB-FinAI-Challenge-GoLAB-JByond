---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-06-26
up: "[[_system_tools_MOC|시스템 도구 MOC]]"
---

# 워크스페이스 비주얼 맵

> 목적: `08_본선/` vault **내부** 폴더 구조와 각 레이어의 역할을 한 눈에 파악한다(파일 단위 트리). 여러 git **저장소** 간의 구분은 [[레포-지도]] 참조 — 이 문서와는 다른 축.
> 🔄 2026-07-05 갱신: 03_제품 재구조화(`docs/`·`evals/`·`reports/`·`harness.yaml` 신설, `01_prd`→`01_결정-준비`, `07_계열사/역할-하네스`→`08_계열사-하네스`·`09_역할-하네스`)·02_전략 정리(스테일 문서 `98_archive/`로 이관) 반영.

---

## 폴더 트리

```
08_본선/
│
├── 본선 HOME.md                     ← 최상위 진입점
├── AGENTS.md                        ← 협업 계약(역할·결정모델·승인게이트)
├── PLAN.md / PROGRESS.md / HANDOFF.md ← 운영 SSoT(계획·진행상태·인수인계)
├── SHARE-PACKAGE.md                 ← 외부 공유용 독자 가이드
│
├── _MOC/                            ← MOC 허브 레이어
│   ├── _MOC_HOME.md                 ← 6개 섹션 MOC 통합 진입점
│   ├── _01_대회정보_MOC.md
│   ├── _02_전략_MOC.md
│   ├── _03_제품_MOC.md
│   ├── _04_증빙_MOC.md
│   ├── _05_제출_MOC.md
│   └── _system_tools_MOC.md
│
├── _system/                         ← 운영 인프라 레이어
│   ├── _HARNESS-SYSTEM.md           ← 하네스 마스터 설계(무엇이 있나)
│   ├── collaboration-rules.md       ← 실무 협업 규칙(어떻게 하나)
│   ├── AI-협업-맥락관리-프로토콜.md   ← 병렬 세션 공존·맥락관리 규약
│   ├── workspace-visual-map.md      ← (이 파일) vault 내부 폴더 트리
│   ├── 레포-지도.md                  ← git 저장소 간 구분(외부 축)
│   ├── ax-insights.md               ← AI 협업 성과 인사이트(자동집계)
│   ├── memory/ · telemetry/ · progress/ ← 공유 메모리·기록·상태
│   ├── team/ · agents/              ← 팀 로스터·AI 에이전트 레지스트리
│   ├── dashboard/                   ← project-dashboard.md(KPI·마일스톤)
│   ├── visualizations/              ← Excalidraw/Canvas 시각화 카탈로그
│   └── automation/ · skills/ · tools/ ← 자동화 스크립트·스킬·도구 레지스트리
│
├── _분석/                           ← 레퍼런스 역엔지니어링 분석(paperclip 등)
│
├── 01_대회정보/                     ← 공식 정보 색인 (원본은 예선 `_체계/`)
│   ├── 본선_공지.md · 본선_안내문.md
│   ├── 본선_심사기준.md
│   └── 본선_일정표.md
│
├── 02_전략/                         ← 경쟁 전략 레이어
│   ├── 01_foundation/               ← JB-도입시나리오-설득패키지·본선-마스터-플레이북·제품정의-캔버스·회의-리서치팩
│   ├── 03_decisions/                ← bet-memo·risk-register (scope-board는 archive)
│   └── 98_archive/                  ← 소임 종료 문서(회의 준비물·완료 실행계획 등)
│
├── 03_제품/                         ← 제품 설계 레이어 (핵심, 하네스 정규문서 체계)
│   ├── README.md · INDEX.md         ← 개발자 진입점·전체 색인
│   ├── harness.yaml                 ← 문서 상태 SSOT
│   ├── docs/                        ← 하네스 정규문서 15종(구 00_vision·01_prd 등 통합)
│   ├── rules/ · evals/ · reports/   ← 코드룰·평가·구현현황 리포트
│   ├── 00_vision/                   ← 비전 서사(그대로 유지: 차별성-경험레이어-서사 등)
│   ├── 01_결정-준비/                ← 회의 결정·근거팩·CaseOps 분기 (구 00_결정-준비)
│   ├── 02_agent-design/ · 03_ux/ · 04_tech/ · 05_diagrams/ · 06_build-roadmap/
│   ├── 07_발표-제출/                ← 실제 제출 자료(번호 유지)
│   ├── 08_계열사-하네스/ · 09_역할-하네스/ · 10_설계도/
│   └── _archive/                    ← 소임 종료된 제품 문서
│
├── 04_증빙/                         ← 작업 기록 레이어
│   ├── 01_핵심로그/                 ← 프롬프트-로그·decision-log·session-log
│   ├── 02_분석자료/                 ← 리서치 D시리즈(01_프롬프트·02_결과-원문·03_요약-정리)
│   ├── 03_daily/ · 04_회의록/
│
├── 05_제출/                         ← 최종 제출 레이어
│   ├── ai-report-final.md · submission-checklist.md
│   ├── live-final-verification.md · retrospective.md
│   └── 발표-*.md                    ← 발표/시연 전략 문서
│
└── assets/                          ← 미디어 자산
    ├── excalidraw/exported-images/  ← 시각화 공유용 PNG/SVG
    ├── screenshots/ (paperclip 포함)
    └── pdf/
```

---

## 레이어 역할 요약

| 레이어 | 폴더 | 역할 |
|-------|------|------|
| 네비게이션 | `_MOC/` | 섹션 간 이동·색인 |
| 운영 | `_system/` | 하네스 설계·협업 규칙·기록·시각화 |
| 레퍼런스 분석 | `_분석/` | 외부 제품 역엔지니어링(paperclip 등) |
| 정보 | `01_대회정보/` | 공식 대회 정보 색인 |
| 전략 | `02_전략/` | 경쟁 전략·의사결정 |
| 제품 | `03_제품/` | 제품 설계 전체(하네스 정규문서 체계) |
| 증빙 | `04_증빙/` | 작업 기록·리서치·회의록 |
| 제출 | `05_제출/` | 최종 산출물 |
| 자산 | `assets/` | 미디어 파일 |

---

## 탐색

- [[본선 HOME|본선 HOME]] — 최상위 진입점
- [[08_본선/_MOC/_MOC_HOME|MOC 허브]] — 섹션 MOC 모음
- [[레포-지도]] — git 저장소 간 구분(이 문서와 다른 축)
