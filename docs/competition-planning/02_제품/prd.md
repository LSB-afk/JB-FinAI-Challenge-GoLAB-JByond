# Product Requirements Document

Product: JB LocalGuard OS  
Contest topic: 자유주제, JB 미래사업 AI  
Version: MVP baseline  
Date: 2026-06-11

## 1. Problem

JB금융그룹의 지역 기반 고객, 특히 소상공인과 중소사업자는 금리 부담, 매출 변동, 정책금융 탐색, 보이스피싱 위험을 동시에 겪는다. 은행과 캐피탈 담당자는 상담 기록, 거래 맥락, 기사, 정책 공고, 사기 경보를 따로 확인해야 하므로 조기 대응과 사후관리가 늦어진다.

## 2. User

- Primary: 전북은행, 광주은행, JB우리캐피탈의 RM, 기업금융 담당자, 사후관리 담당자
- Secondary: 리스크 관리, 준법, 지역 영업점 관리자
- End customer: 지역 소상공인, 개인사업자, 중소사업자

## 3. Core Bet

금융 Agent는 고객에게 바로 말하는 챗봇보다, 담당자에게 근거 있는 판단과 승인 가능한 행동 초안을 제공할 때 실제 업무 도입 가능성이 높다.

## 4. MVP Scope

MVP는 브라우저에서 실행되는 운영 콘솔이다.

- 고객 case queue 표시
- 선택된 case의 risk score, root cause, recommended next action 표시
- 각 Agent의 skill, 판단 결과, confidence 표시
- Agent run 실행
- RM 승인 대기 조치 승인
- 기사, 정책, 내부 이벤트 근거 표시
- 감사 로그 표시

## 5. Out of Scope

- 실제 계좌, 신용정보, 개인식별정보 연동
- 실제 대출 심사 자동 승인
- 실제 고객 메시지 발송
- 학원 운영자 문제 또는 교육 도메인 기능

## 6. Agent Operating Loop

1. Evidence Harvest Agent가 기사, 정책, 사기 경보, 상담 키워드를 수집한다.
2. Cashflow Triage Agent가 매출 압박, 금리 민감도, 연체 조짐을 판단한다.
3. Policy Match Agent가 정책금융과 대환 가능성을 매칭한다.
4. Fraud Shield Agent가 보이스피싱 또는 비정상 안내 위험을 확인한다.
5. RM Copilot Agent가 고객 안내 초안과 내부 메모를 생성한다.
6. Compliance Guard Agent가 금지 표현, 과장, 개인정보 노출을 검사한다.
7. Approval Gate가 사람 승인 전에는 외부 행동을 막는다.
8. Audit Ledger가 판단 근거, 사용 스킬, 결과를 기록한다.

## 7. Success Metrics

- Case triage time: 담당자가 위험 원인과 다음 행동을 파악하는 시간을 50 percent 이상 줄인다.
- Evidence traceability: 모든 Agent 판단에 최소 1개 이상의 근거 링크 또는 내부 이벤트가 연결된다.
- Approval safety: 외부 고객 안내는 100 percent 승인 게이트를 통과해야 한다.
- Verifiability: 데모에서 Agent run, approval, audit log 변화를 재현할 수 있다.

## 8. Evaluation Fit

- Topic fit: 자유주제이며 JB 지역 금융 사업과 연결된다.
- Business linkage: 기업대출 상담, 심사, 사후관리 AI 방향과 맞다.
- Agent design: 판단, 행동, 검증 루프와 복수 전문 Agent를 보여준다.
- MVP completeness: 정적 앱에서 케이스 선택, 실행, 승인, 로그 갱신이 가능하다.
- Risk management: 고객 발송 전 approval gate와 compliance guard가 있다.

