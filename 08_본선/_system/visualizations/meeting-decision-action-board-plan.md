---
tags:
  - area/system
  - type/plan
  - status/active
date: 2026-07-03
up: "[[VISUALIZATION-PLAN]]"
aliases:
  - 회의-결정-실행판-기획
  - meeting-decision-action-board-plan
---
# Meeting Decision Action Board Plan

## 목적

7월 1일~3일 회의록과 데일리/결정 로그를 근거로, 팀이 바로 의사결정하고 다음 작업을 실행할 수 있는 **회의 결정 실행판**을 만든다.

핵심 메시지:

> 7/1은 운영·리서치·WBS 기반을 만들었고, 7/2는 UX·에이전트·발표 방향을 정했으며, 7/3은 계열사·구동·역할·제출 조건을 확정했다. 남은 결정은 D2/D3/D5를 잠그고 빌드·브랜딩·제출물로 밀어 넣는 것이다.

## 보드

- 파일: `meeting-decision-action-board.excalidraw`
- 독자: PM, 개발, 디자인, 발표 담당, AI 세션
- 용도: 아침/작업 시작 전 5분 체크, 회의 후속 작업 분배, 발표용 "협업 진행 방식" 백업

## 근거 소스

- [[2026-07-01]]
- [[2026-07-02]]
- [[회의록-2026-07-02-스프린트회의]]
- [[회의록-2026-07-03-스프린트회의]]
- [[회의록-2026-07-03-제품정의확정]]
- [[decision-log]]
- [[session-log]]
- [[PROGRESS]]
- [[VISUALIZATION-PLAN]]

## 시각 구조

1. 상단: 7/1 → 7/2 → 7/3 결정 타임라인
2. 중앙: D1~D6 결정 게이트 보드
3. 우측: 즉시 실행 레인
   - Build/Demo
   - UX/Brand/Pitch
   - Docs/Submission
   - Governance/AI Ops
4. 하단: 리스크·미확정·다음 회의 입력
5. 우하단: 공통 메타 박스

## 표시 규칙

- `확정`: 회의록·decision-log에 명시된 결정
- `TBD`: 7/4 오전 등 후속 회의에서 잠글 항목
- `mixed`: 실연결+목업, 라이브+폴백처럼 혼합 전략
- `risk`: 자격·민감정보·실동작 장비·STT 수치 등 주의 항목

## 보드에 반드시 보여야 하는 내용

- 7/1: 볼트 정합화, 운영 자동화 스킬화, 리서치 종합, 11블록·WBS
- 7/2: 키보드-퍼스트 UX, 역할별 대시보드, 에이전트 구조, 발표/시연 전략, 텔레메트리 경로 복구
- 7/3: 전북은행+JB우리캐피탈, 하이브리드 구동, 역할 분담, 발표/제출 조건, 시연영상 가점
- D2 실동작 도메인은 `TBD: 전세사기 vs 보이스피싱`
- 김민주: UX/브랜딩/발표/시연 시나리오
- 이승보: 개발/설계/이승보 PC 최종 테스트
- 김주용: PM/문서/API/시각화/리서치
- 재형: 데이터·시스템 설계·금융 전략 서포트
- AI: Claude/Codex/GPT/Gemini/디자인·리서치·검증 에이전트

## 갱신 조건

- 7/4 스코프 확정 회의가 D2/D3/D5를 잠그는 경우
- 발표자료 PDF, 기능명세서 PDF, GitHub README, 시연영상 상태가 바뀌는 경우
- 데모 구동 머신·로컬모델·공공 API 연결 방식이 확정되는 경우
- 팀원 역할 또는 발표자 조합이 바뀌는 경우

## 완료 기준

- 5초 안에 "무엇이 확정됐고, 무엇을 오늘 해야 하는지"가 보인다.
- 확정/TBD/mixed/risk가 구분된다.
- 사람과 AI 담당 레이어가 분리되어 보인다.
- source, last generated, data quality, next, owner가 들어간 메타 박스가 있다.

## 연결

- [[VISUALIZATION-PLAN]]
- [[_viz-index]]
- [[workflow-gantt-blueprint]]
- [[update-control-tower]]
- [[demo-video-storyboard]]
- [[research-to-product-funnel]]
