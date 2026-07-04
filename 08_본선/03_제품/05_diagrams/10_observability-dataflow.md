---
tags:
  - area/product
  - type/diagram
  - status/active
date: 2026-07-05
up: "[[INDEX|제품 인덱스]]"
---

# 관측가능성 데이터 흐름 — 원장에서 계기판까지

> 이 그림의 주장 = 원장 한 줄(llm-runs.jsonl)이 집계 API·토큰 계기판·감사 용도 태그까지 이어지는 단일 파이프라인이다 — 세 운영 에이전트는 이 파이프라인을 순찰하는 설계 확장일 뿐, 실행 권한은 없다.

```mermaid
flowchart LR
  CALL["/llm 호출마다<br/>1줄 기록(E4)"] --> LEDGER[("llm-runs.jsonl<br/>runId·caseId·engine·tokens·costUsd·errorClass(E4)")]
  LEDGER --> USAGE["GET /llm/usage 집계<br/>totals·byCase·byTier(E4)"]
  USAGE --> PANEL["토큰 패널·엔진룸<br/>liveLlmBlock()·engineRoomRows()(E4)"]
  LEDGER --> AUDITTAG["감사 원장 용도 태그<br/>당국증적/분쟁재생/운영점검/원가정산(E4)"]
  LEDGER -.->|순찰| CS["Cost Sentinel<br/>단가·티어효율 감시(설계)"]
  LEDGER -.->|순찰| E119["119 확장<br/>errorClass 임계·사고승격(설계)"]
  AUDITTAG -.->|심사| LC["Ledger Curator<br/>소비자검사·PII역설 방지(설계)"]
  CS -.->|제안| APPR["라우팅 정책 변경 제안<br/>사람 승인(설계)"]
```

원장→집계→계기판(토큰 패널·엔진룸)까지는 `?live=1` 데모에서 이미 실측 동작한다(E4). Cost Sentinel·119·Ledger Curator 세 에이전트는 이 파이프라인을 상시 순찰해 원가·오류·감사 실효성을 감시하는 설계 확장으로, 숫자와 제안만 만들고 정책 변경은 사람이 승인한다.

## 연결
- [[Q13-토큰비용-유닛이코노믹스]]
- [[Q15-감사로그-실효성]]
