---
tags:
  - area/product
  - type/stub
  - status/draft
date: 2026-06-26
up: "[[INDEX|제품 인덱스]]"
---

# ERD — 엔티티 관계 다이어그램

> 역엔지니어링/브레인스토밍으로 채울 예정

---

## 씨앗 포인트

- **씨앗**: Case / AgentRun / Approval / AuditEvent — 4개 엔티티 독립 분리
- **씨앗**: 순환 의존 없음 — Case가 루트, AgentRun·Approval은 Case를 참조, AuditEvent는 모든 엔티티를 참조

---

## ERD 다이어그램

> 작성 예정

```mermaid
erDiagram
    CASE {
        uuid id PK
        string status
        string customer_id
        datetime created_at
    }
    AGENT_RUN {
        uuid id PK
        uuid case_id FK
        string agent_id
        string status
        datetime started_at
    }
    APPROVAL {
        uuid id PK
        uuid case_id FK
        uuid agent_run_id FK
        string action_draft
        string status
        string approver_id
    }
    AUDIT_EVENT {
        uuid id PK
        string entity_type
        uuid entity_id
        string event_type
        json payload
        datetime created_at
    }

    CASE ||--o{ AGENT_RUN : "has"
    CASE ||--o{ APPROVAL : "has"
    AGENT_RUN ||--o| APPROVAL : "generates"
    AUDIT_EVENT }o--|| CASE : "tracks"
    AUDIT_EVENT }o--|| AGENT_RUN : "tracks"
    AUDIT_EVENT }o--|| APPROVAL : "tracks"
```

---

## 참조

- [[08_본선/03_제품/04_tech/data-model|데이터 모델 — 엔티티 상세]]
