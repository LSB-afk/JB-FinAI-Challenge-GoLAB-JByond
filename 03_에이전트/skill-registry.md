# Skill Registry

Skill packages are domain capabilities mounted onto Agents. This follows the reference system pattern where an Agent is not hardcoded for one job; it receives skills with instructions, tools, policies, and metadata.

## Skills

| Slug | Type | Purpose | Approval Policy |
| --- | --- | --- | --- |
| `case-os-core` | orchestration | Create and update case state | internal only |
| `evidence-harvest` | research | Pull pain evidence from news, policy, official pages, counseling notes | internal only |
| `source-ranker` | research | Rank source credibility and freshness | internal only |
| `pain-classifier` | reasoning | Classify case pain as cashflow, rate, delinquency, fraud, policy, digital-barrier | internal only |
| `cashflow-stress` | finance | Estimate repayment stress from sales pressure, debt burden, and rate sensitivity | RM review |
| `rate-relief` | finance | Identify rate shock and relief/refinance conversation needs | RM review |
| `policy-match` | finance | Match support program clues and required documents | RM review |
| `document-checklist` | operations | Produce missing document checklist | RM review |
| `fraud-shield` | risk | Detect suspicious call, deepfake, phishing, abnormal callback, forced transfer | blocks external action |
| `do-not-contact-rule` | risk | Stop customer-facing output when fraud or compliance risk is high | mandatory |
| `notification-brief` | communication | Draft RM note or customer callback script | approval required |
| `tone-control` | communication | Keep text factual, calm, non-promissory | approval required |
| `compliance-guard` | compliance | Check prohibited claims, privacy exposure, misleading benefit language | mandatory |
| `privacy-redaction` | compliance | Mask PII in logs and drafts | mandatory |
| `claim-limiter` | compliance | Replace guaranteed outcome wording with review-safe wording | mandatory |
| `approval-gate` | control | Require human approval before external action | mandatory |
| `audit-ledger` | control | Record evidence, judgment, action, user approval, timestamp | mandatory |
| `portfolio-signal` | analytics | Aggregate branch or affiliate level pain clusters | internal only |
| `trend-summary` | analytics | Summarize changing risk themes | internal only |
| `case-metrics` | analytics | Track queue age, approval status, recurring pain | internal only |
| `jeonse-price-ratio` | jeonse-risk | Estimate high jeonse-ratio risk against likely market value | RM review |
| `local-market-compare` | jeonse-risk | Compare deposit against nearby market references | RM review |
| `registry-rights-scan` | legal-risk | Detect mortgage, seizure, provisional seizure, trust registration, and other registry risk signals | human/legal review |
| `ownership-transfer-delta` | legal-risk | Detect short-term ownership transfer and abnormal ownership history | human/legal review |
| `guarantee-feasibility` | guarantee | Classify likely guarantee-insurance feasibility questions and required checks | RM review |
| `tenant-asset-exposure` | asset-risk | Estimate deposit exposure versus customer assets and loss sensitivity | advisor review |
| `housing-cost-burden` | asset-risk | Analyze housing cost and jeonse-loan repayment burden versus monthly income | advisor review |
| `pre-contract-checklist` | contract | Draft document, landlord, broker, and guarantee pre-checklist | approval required |
| `special-clause-drafter` | contract | Draft special clause wording for human/legal review | legal review |
| `bank-linkage-brief` | banking | Connect jeonse-loan counseling, guarantee guidance, warning, and safe-contract guide | RM approval |

## Skill Contract

```json
{
  "slug": "fraud-shield",
  "name": "Fraud Shield",
  "type": "risk",
  "instructions": [
    "Look for suspicious callback, urgent transfer, voice modulation, deepfake, unusual URL, or account takeover clues.",
    "If fraud risk is high, block customer-facing messages and create an escalation memo."
  ],
  "tools": ["evidence_feed", "case_notes", "risk_rules"],
  "policies": ["do_not_contact_on_high_fraud", "audit_required"],
  "metadata": {
    "riskLevel": "high",
    "requiresApproval": true,
    "zeroHumanLevel": "L4"
  }
}
```

## Runtime Loading Rule

1. Orchestrator opens a case.
2. The case pain tags decide which skills are mounted.
3. Agents run only with mounted skills.
4. Every skill output must include `evidence`, `confidence`, `proposedAction`, and `approvalPolicy`.
5. Approval Gate blocks actions whose policy is not satisfied.
