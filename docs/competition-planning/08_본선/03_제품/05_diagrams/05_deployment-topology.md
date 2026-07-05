---
tags:
  - area/product
  - type/diagram
  - status/active
date: 2026-07-05
up: "[[INDEX|제품 인덱스]]"
---

# 배포 토폴로지 — 3존 구조

> 이 그림의 주장 = PII 비반출은 네트워크 지점 하나(게이트웨이)로 물리화된다 — 존3(pii-net)은 Docker `internal: true`로 외부 인터넷 라우팅이 원천 차단되고, 직원 PC에는 아무것도 설치되지 않는다.

```mermaid
graph LR
  subgraph Z1["존1 · 직원 PC — 설치물 없음"]
    BR["브라우저(사내망 전용)"]
  end
  subgraph Z2["존2 · 콘솔 서버(사내망)"]
    WEB["웹앱+API Gateway(설계)"]
    GW["/llm 게이트웨이<br/>api-proxy.mjs(E4)"]
    DB[("PostgreSQL — Case·Approval·Audit(설계)")]
    FS["파일: agents/ 정의·llm-runs.jsonl(E4)"]
  end
  subgraph Z3["존3 · 로컬모델(pii-zone, pii-net internal:true)"]
    LM["Ollama — PII 원본 유일 처리점(E4)"]
  end
  EXT["외부 프런티어 API<br/>claude/codex, Zero-PII만(E4)"]
  BR -->|HTTPS·SSO| WEB --> GW
  GW -->|"OLLAMA_BASE=http://pii-zone:11434"| LM
  GW -->|비식별 최소필드만| EXT
  GW --> FS
  WEB -.->|운영 승격| DB
```

실선은 `02_제품/deploy/docker-compose.yml`이 실제로 구성하는 경계(console↔pii-zone, pii-net internal)다. 점선(PostgreSQL 승격)은 아직 로컬스토리지 하네스 단계인 설계 구간이다. 게이트웨이가 존2↔존3, 존2↔외부를 잇는 유일한 관문이다.

## 연결
- [[배포-토폴로지-운영-기획서]]
- [[09_policy-engine-gates]]
