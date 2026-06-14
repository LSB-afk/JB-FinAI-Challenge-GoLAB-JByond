# Function Specification (내부 상세 · 참고용)

> ⚠️ 제출용 **기능명세서 최종본은 [`docs/04_submission/function-spec.md`](../00_제출/function-spec.md)** (공식 6파트)입니다. 이 문서는 화면/데이터 모델 내부 상세 참고용이며, 동일 파일명이지만 제출본이 아닙니다.

Product: JB LocalGuard OS  
MVP type: static browser console

## 1. Screen

### 1.1 Case Queue

각 case는 지역, 업종, 고객 유형, risk score, primary pain, status를 가진다.

Required behavior:

- case 선택 시 중앙 패널과 오른쪽 evidence panel이 갱신된다.
- high risk case는 fraud, cashflow, delinquency 같은 위험 태그가 보인다.
- status는 `New`, `Agent Running`, `Approval Pending`, `Approved` 중 하나다.

### 1.2 Agent Board

Agent Board는 case에 투입된 Agent 목록을 보여준다.

Required fields:

- Agent name
- Assigned skills
- Judgment
- Proposed action
- Confidence
- Verification state

### 1.3 Skill Rack

Skill Rack은 Agent가 장착할 수 있는 skill package를 보여준다.

Required fields:

- Skill slug
- Purpose
- Risk level
- Human approval requirement

### 1.4 Evidence Feed

Evidence Feed는 기사, JB 공식 발표, 금융위원회 경보, 내부 상담 이벤트를 보여준다.

Required behavior:

- 선택 case와 관련된 evidence를 우선 표시한다.
- evidence마다 source type과 design implication을 표시한다.

### 1.5 Approval and Audit

Approval panel은 Agent가 제안한 행동을 사람이 승인할 수 있게 한다.

Required behavior:

- Agent run 전에는 approval button이 비활성 상태다.
- Agent run 후 approval pending action이 생긴다.
- Approve action을 누르면 status가 `Approved`로 바뀌고 audit log가 추가된다.
- 외부 메시지 발송은 demo 상태로만 표시한다.

## 2. Data Model

```text
Case
  id
  customerName
  affiliate
  region
  industry
  riskScore
  status
  pains[]
  recommendedAction
  evidenceIds[]
  audit[]

Agent
  id
  name
  mission
  skills[]
  judgment
  action
  confidence
  verification

Skill
  slug
  name
  type
  instructions
  approvalPolicy
  riskLevel

Evidence
  id
  title
  source
  url
  implication
```

## 3. Agent Decision Rules

- `riskScore >= 85`: external action is blocked until RM approval and Compliance Guard pass.
- `fraud` pain exists: Fraud Shield Agent must run before customer outreach.
- `policy-match` action exists: Policy Match Agent must attach at least one program or requirement clue.
- `cashflow-stress` exists: Cashflow Triage Agent must include stress reason and recommended check.
- All cases: Audit Ledger must record who proposed what, when, and based on which evidence.

## 4. Demo Scenarios

1. 전주 카페: 금리 부담과 매출 둔화가 동시에 감지되어 repayment stress check와 RM call draft가 생성된다.
2. 광주 도소매: 정책금융 또는 대환 가능성이 감지되어 required documents checklist가 생성된다.
3. 군산 제조업: 보이스피싱 의심 콜백이 감지되어 external outreach is blocked and escalation memo is generated.

