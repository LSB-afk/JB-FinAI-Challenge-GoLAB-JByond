# MVP Proposal Draft  ⚠️ DEPRECATED

> 이 문서는 옛 영문 초안입니다. **제출/심사에 사용하지 마세요.** 최종 제출본은 공식 7섹션 한국어 [`mvp-proposal.md`](mvp-proposal.md)이며, 에이전트 표시명·KPI·통계는 [`docs/_canon.md`](../_canon.md)를 따릅니다.

## 1. Service Name

JB LocalGuard OS

## 2. Topic

자유주제: JB 미래사업 AI

## 3. Problem Definition

지역 소상공인과 중소사업자는 대출금리, 매출 둔화, 정책금융 탐색, 보이스피싱 위험을 동시에 겪는다. 금융회사 담당자는 기사, 정책 공고, 상담 기록, 거래 맥락, 사기 경보를 따로 확인해야 하므로 위험 징후를 조기에 해석하고 다음 행동으로 연결하기 어렵다.

## 4. Solution

JB LocalGuard OS는 고객별 위험을 `Case`로 만들고 여러 전문 Agent가 판단, 행동, 검증을 수행하는 운영 콘솔이다. Agent는 스킬을 장착해 증거를 수집하고, 위험 원인을 분류하며, RM이 승인할 수 있는 조치 초안을 만든다. 고객 발송이나 민감 조치는 승인 게이트를 통과해야 하며 모든 판단과 행동은 감사 로그로 남는다.

## 5. AI Agent Design

- Pain Radar Agent: 기사, 공식 자료, 상담 노트에서 pain signal을 수집한다.
- Cashflow Triage Agent: 금리 부담, 매출 압박, 연체 조짐을 판단한다.
- Policy Match Agent: 정책금융, 대환, 필요 서류를 매칭한다.
- Fraud Shield Agent: 보이스피싱, 딥페이크, 이상 콜백 위험을 탐지한다.
- RM Copilot Agent: 담당자 메모와 고객 안내 초안을 만든다.
- Compliance Guard Agent: 과장 표현, 개인정보, 준법 리스크를 검토한다.
- Approval Gate: 외부 행동 전에 사람 승인을 요구한다.
- Audit Ledger: 근거, 판단, 행동, 승인 내역을 기록한다.

## 6. MVP Scenario

1. RM이 전주 카페 고객 case를 선택한다.
2. Agent Run을 실행한다.
3. Cashflow Triage Agent가 금리 부담과 매출 둔화를 위험 요인으로 판단한다.
4. Policy Match Agent가 정책금융 검토 체크리스트를 생성한다.
5. RM Copilot Agent가 고객 콜백 초안을 생성한다.
6. Compliance Guard Agent가 표현을 검토한다.
7. RM이 승인하면 case status가 Approved로 바뀌고 audit log가 추가된다.

## 7. Business Linkage

전북은행과 광주은행은 지역 경제와 중소기업, 가계 금융 접점이 강하다. JB우리캐피탈은 대출, 리스, 할부금융 접점이 있다. JB금융그룹은 기업대출 상담, 심사, 사후관리 AI 활용 방향을 공개한 바 있다. LocalGuard OS는 이 흐름을 고객 위험 조기 감지와 담당자 승인형 행동 자동화로 확장한다.

## 8. Expected Impact

- RM의 case 파악 시간 단축
- 사후관리 누락 감소
- 정책금융 또는 대환 검토 기회 발견
- 보이스피싱 고위험 case의 외부 행동 차단
- 금융권 도입에 필요한 승인, 준법, 감사 가능성 확보

