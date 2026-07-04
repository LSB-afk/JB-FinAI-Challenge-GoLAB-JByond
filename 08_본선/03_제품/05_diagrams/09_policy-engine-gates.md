---
tags:
  - area/product
  - type/diagram
  - status/active
date: 2026-07-05
up: "[[INDEX|제품 인덱스]]"
---

# Policy Engine — 가드레일 게이트

> 이 그림의 주장 = Policy Engine은 신규 기능이 아니라 모든 상태 전이를 감싸는 강제 게이트다 — 5종 가드(scope·PII·승인필요·자동종결·단정표현)는 이미 코드에서 실행되고, 12규칙 중 7개가 이번 프로토타입에서 실제로 차단한다.

```mermaid
flowchart LR
  ACT["Case Lifecycle 행동 초안<br/>beforeCaseCreate ~ onAuditWrite hook"] --> PE(("Policy Engine"))
  PE --> P1["P1 Scope 검사<br/>harnessGuardCheckScope(E4)"]
  PE --> P3["P3 PII 검사<br/>harnessGuardCheckPII(E4)"]
  PE --> P5["P5 승인필요<br/>harnessGuardCheckApprovalRequired(E4)"]
  PE --> P7["P7 자동종결 차단<br/>harnessGuardCheckAutoClose(E4)"]
  PE --> P9["P9 단정표현 차단<br/>harnessGuardCheckAssertions(E4)"]
  PE -.-> P8["P8 준법 에스컬레이션 L3~L4(설계)"]
  PE -.-> P10["P10 Evidence 연결 강제(설계)"]
  PE -.-> P11["P11 memory_policy 목적제한(설계)"]
  P1 & P3 & P5 & P7 & P9 --> BLOCK["block / require_approval /<br/>escalate 결정 → hookLog 적재"]
  P8 & P10 & P11 -.-> BLOCK
```

5종 가드(실선)는 4개 하네스(jeonse·wooricap·ccl·fdr) 공통 lifecycle hook에서 실제 실행되며 위반은 `harnessStore.hookLog`에 적재된다(`_vendor/JB_project2/app/harnessCore.js`). 준법 에스컬레이션·Evidence 강제·메모리 목적제한(점선) 등 확장 5규칙은 구조만 정의된 설계 단계다.

## 연결
- [[07-policy-engine]]
- [[03_approval-gate]]
