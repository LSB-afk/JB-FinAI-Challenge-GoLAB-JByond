# Jeonse Shield Agents

JB LocalGuard OS includes a dedicated jeonse-fraud prevention agent line. This is not an automatic legal judgment engine. It is a pre-contract risk triage and bank-service linkage workflow that creates reviewable evidence, checklists, and approval cards for RM and compliance staff.

## Agent Line

| Agent | Responsibility | Mounted Skills |
| --- | --- | --- |
| Jeonse Shield Lead | Open jeonse risk cases, assign specialist agents, set approval level | `case-os-core`, `jeonse-price-ratio`, `approval-gate`, `audit-ledger` |
| Deposit Ratio Agent | Detect high jeonse ratio and deposit overpricing against nearby market | `jeonse-price-ratio`, `local-market-compare` |
| Registry Rights Agent | Identify registry/right-risk signals requiring human/legal review | `registry-rights-scan`, `ownership-transfer-delta` |
| Tenant Asset Risk Agent | Analyze tenant exposure and repayment burden | `tenant-asset-exposure`, `housing-cost-burden` |
| Contract Checklist Agent | Draft pre-contract document, landlord, broker, clause, and guarantee checklist | `pre-contract-checklist`, `special-clause-drafter`, `compliance-guard` |
| Bank Linkage Agent | Connect customer to jeonse-loan 상담, guarantee guidance, warning, and safe-contract guide | `bank-linkage-brief`, `guarantee-feasibility`, `notification-brief` |

## Core Features

### 1. 전세 위험 신호 탐지

- 전세가율 과다
- 주변 시세 대비 보증금 과다
- 근저당, 압류, 가압류, 신탁등기 등 권리관계 위험
- 단기간 소유권 이전
- 보증보험 가입 불가 가능성

### 2. 고객 맞춤형 자산 리스크 분석

- 고객 총자산 대비 전세보증금 비중
- 월 소득 대비 주거비 부담
- 전세대출 상환 가능성
- 계약 실패 시 손실 위험도

### 3. AI 계약 전 체크리스트

- 계약 전 확인 서류
- 임대인 확인 항목
- 중개사 확인 항목
- 특약 문구 초안
- 보증보험 가입 전 확인사항

### 4. 은행 서비스 연계

- 전세대출 상담 연결
- 보증보험 안내
- 위험 매물 경고
- 안전 계약 가이드 제공

## Safety Policy

- The system must not say a contract is legally safe or unsafe as a final legal conclusion.
- Registry, lien, trust, tax, and guarantee conditions must be confirmed from official/source documents.
- Special clauses are drafts only and require human/legal review.
- Bank linkage requires customer consent and RM approval.
- Customer-facing warning messages must pass Compliance Guard.

## Official Basis

- HUG 안심전세 App: https://www.khug.or.kr/jeonse/web/s01/s010102.jsp
- HUG 안심전세포털: https://www.khug.or.kr/jeonse/index_jeonse.jsp
- 국토교통부 안심전세 App 보도자료: https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?id=95087856
- 범정부 전세사기 예방 및 피해 지원방안: https://www.korea.kr/briefing/pressReleaseView.do?newsId=156550481
