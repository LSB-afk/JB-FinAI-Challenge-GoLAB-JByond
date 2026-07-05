# Evaluation Fit  ⚠️ DEPRECATED

> 이 문서는 옛 영문 초안입니다. **제출/심사에 사용하지 마세요.** 최종 평가항목 대응은 [`mvp-proposal.md` 부록 A](mvp-proposal.md) 및 [`05_제출/02-제출-패키지-체크리스트.md`](02-제출-패키지-체크리스트.md)의 25항목 매핑을 사용합니다.

## 1. Topic Fit and Problem Definition

The submission uses the free topic and defines a JB-linked problem: local small-business financial safety operations.

## 2. Finance and Business Linkage

- 전북은행 and 광주은행: regional banking, SMEs, households, customer channels
- JB우리캐피탈: loan, lease, installment and repayment risk touchpoints
- JB금융그룹 AI direction: enterprise loan counseling, screening, post-management, document extraction, judgment rationale support

## 3. AI Agent Design and Technical Feasibility

The design has multiple specialized Agents and skill packages.

- Judgment: risk classification, rate stress, fraud block, policy match
- Action: RM memo, customer call draft, checklist, escalation
- Verification: compliance pass, approval gate, audit log, status update

The MVP is static but interactive, so judges can verify the operating loop without live banking data.

## 4. MVP Completeness and Verifiability

Implemented MVP features:

- case selection
- Agent run
- status changes
- approval action
- evidence feed
- skill rack
- audit log

Verification command:

```bash
python3 scripts/verify_static.py
```

## 5. Innovation, Scale, and Risk Management

Innovation:

- Agent OS for regional finance operations, not a single chatbot
- Skills can be mounted per case, enabling extension to new products or affiliates
- Evidence and approval are first-class entities

Scale:

- Add affiliates by adding case schemas and skills
- Add policy sources by extending Evidence Harvest
- Add risk rules through skill packages

Risk management:

- No automatic credit decision
- No real customer message without human approval
- Fraud case blocks outbound action
- Compliance Guard and Audit Ledger are mandatory

