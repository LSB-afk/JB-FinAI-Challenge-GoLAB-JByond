---
tags:
  - area/product
  - type/stub
  - status/draft
date: 2026-06-26
up: "[[INDEX|제품 인덱스]]"
---

# API 명세

> 역엔지니어링/브레인스토밍으로 채울 예정

---

## API 설계 원칙

> 작성 예정

---

## 씨앗 포인트

- **씨앗**: 케이스 상세 인라인 라이브런 스트리밍 → SSE (Server-Sent Events) 또는 WebSocket 엔드포인트 필요
- **씨앗**: Case/AgentRun/Approval/AuditEvent 각각 독립 REST 엔드포인트
- **씨앗**: 승인 게이트 → `POST /approvals/:id/approve` · `POST /approvals/:id/reject`

---

## 엔드포인트 목록 (작성 예정)

### Cases

```
GET    /api/cases              → 케이스 목록 (칸반용)
GET    /api/cases/:id          → 케이스 상세
POST   /api/cases              → 케이스 생성
PATCH  /api/cases/:id          → 케이스 상태 변경
```

### AgentRuns

```
GET    /api/cases/:id/runs     → 케이스의 에이전트 실행 목록
POST   /api/cases/:id/runs     → 에이전트 실행 시작
GET    /api/runs/:id/stream    → 실행 로그 스트리밍 (SSE)
```

### Approvals

```
GET    /api/approvals          → 승인 대기 목록
POST   /api/approvals/:id/approve  → 승인
POST   /api/approvals/:id/reject   → 거부
```

### AuditEvents

```
GET    /api/audit?entity_id=:id    → 엔티티별 감사 로그
```

---

## 참조

- [[08_본선/03_제품/04_tech/data-model|데이터 모델]]
- [[_체계/본선-백엔드-실연동-설계|본선 백엔드 실연동 설계]]
