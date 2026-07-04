---
tags:
  - area/product
  - type/plan
  - status/draft
date: 2026-07-01
up: "[[_빌드-로드맵-MOC]]"
aliases:
  - UI-조직도-콘솔
  - p4-ui
---

# P4 UI 조직도 콘솔

## ① 목표

조직도 메인 UI, JB 웹 디자인 차용, RM 콘솔, 신뢰보정 UX를 본선 시연 흐름에 맞춰 설계·구현한다.

## ② 세부 작업

- [ ] 조직도 기반 메인 화면에서 에이전트·사람 승인자·승인 게이트 관계 표현 #ui
- [ ] JB 웹 디자인에서 색, 정보 밀도, 컴포넌트 톤 차용 범위 정리 #ui
- [ ] RM 콘솔의 Case queue, Evidence, Approval, Audit 패널 IA 작성 #ui
- [ ] AI draft 수정 가능성, 불확실성, 다음 확인 항목을 신뢰보정 UX로 노출 #ui
- [ ] L0-L4 승인 상태와 고위험 friction을 시각 상태로 연결 #security
- [ ] 골든패스 3종 화면 이동과 데모 모드 진입점을 검증 #demo

## ③ 선행 의존

- [[P0-정의-합의]]
- [[P2-에이전트-스킬-메모리]]
- [[P3-보안-거버넌스]]

## ④ 담당 에이전트

- designer
- product
- orchestrator
- compliance-risk
- judge-qa

## ⑤ 산출물

- 조직도 메인 UI 와이어
- RM 콘솔 화면맵
- 신뢰보정 UX 체크리스트
- 데모 모드별 화면 플로우

## ⑥ 리스크·미결

- JB 웹 디자인은 차용 범위를 명시하고 공식 브랜드 자산 오용을 피한다.
- 전북/광주 히어로가 확정 전이면 화면 문구는 옵션 또는 중립 표현으로 둔다.
- UI는 승인 전 자동실행처럼 보이지 않도록 상태·CTA 문구를 검토한다.

## ⑦ 근거

- [[D18-결과-원문-gpt55high]]

