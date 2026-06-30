---
tags:
  - area/product
  - type/stub
  - status/draft
date: 2026-06-26
up: "[[INDEX|제품 인덱스]]"
---

# 에이전트 흐름 다이어그램

> 역엔지니어링/브레인스토밍으로 채울 예정

---

## 목적

위험 신호 입력부터 승인 게이트까지 에이전트 실행 시퀀스를 시각화.

---

## 씨앗 포인트

- **씨앗**: 오케스트레이터가 서브에이전트를 순차/병렬로 조율
- **씨앗**: 각 에이전트 실행은 AuditEvent로 기록
- **씨앗**: 에이전트 실행 결과는 케이스 상세에서 실시간 스트리밍으로 표시

---

## 시퀀스 다이어그램

> 작성 예정

```mermaid
sequenceDiagram
    participant R as 위험 신호
    participant O as 오케스트레이터
    participant T as Triage Agent
    participant RA as Risk Assessor
    participant DW as Draft Writer
    participant CC as Compliance Checker
    participant AG as 승인 게이트
    participant H as 담당자

    R->>O: 신호 입력
    O->>T: 분류 요청
    T-->>O: 분류 결과
    O->>RA: 위험도 평가 요청
    RA-->>O: 위험도 점수
    O->>DW: 초안 작성 요청
    DW-->>O: 행동 초안
    O->>CC: 규정 검증 요청
    CC-->>O: 검증 결과
    O->>AG: 승인 요청
    AG->>H: 승인 알림
    H-->>AG: 승인/거부
```

---

## 참조

- [[08_본선/03_제품/02_agent-design/agent-roster|에이전트 로스터]]
- [[08_본선/03_제품/02_agent-design/orchestrator|오케스트레이터]]
