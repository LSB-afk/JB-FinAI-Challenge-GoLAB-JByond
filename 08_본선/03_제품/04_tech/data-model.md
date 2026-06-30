---
tags:
  - area/product
  - type/stub
  - status/draft
date: 2026-06-26
up: "[[INDEX|제품 인덱스]]"
---

# 데이터 모델

> 역엔지니어링/브레인스토밍으로 채울 예정

---

## 핵심 엔티티 4종

> 작성 예정 — 씨앗 기반 초안

---

## 씨앗 포인트

- **씨앗**: **Case / AgentRun / Approval / AuditEvent** 4개 엔티티 독립 분리
- **씨앗**: 각 엔티티는 독립적으로 조회·수정 가능 (순환 의존 없음)
- **씨앗**: AuditEvent는 모든 상태 변경을 이벤트 소싱 방식으로 기록

---

### Case

```
Case {
  id: UUID
  status: enum(new | in_progress | review | done | blocked)
  risk_signal: RiskSignal[]
  customer_id: string
  created_at: datetime
  updated_at: datetime
  // 작성 예정: 상세 필드
}
```

---

### AgentRun

```
AgentRun {
  id: UUID
  case_id: UUID (FK → Case)
  agent_id: string
  status: enum(running | pending | done | blocked | idle)
  skill_calls: SkillCall[]
  started_at: datetime
  ended_at: datetime
  // 작성 예정: 상세 필드
}
```

---

### Approval

```
Approval {
  id: UUID
  case_id: UUID (FK → Case)
  agent_run_id: UUID (FK → AgentRun)
  action_draft: string
  status: enum(pending | approved | rejected | modified)
  approver_id: string
  approved_at: datetime
  // 작성 예정: 상세 필드
}
```

---

### AuditEvent

```
AuditEvent {
  id: UUID
  entity_type: enum(case | agent_run | approval)
  entity_id: UUID
  event_type: string
  payload: JSON
  actor: string
  created_at: datetime
}
```

---

## 참조

- [[08_본선/03_제품/05_diagrams/04_erd|ERD 다이어그램]]
- [[08_본선/03_제품/04_tech/api-spec|API 명세]]
