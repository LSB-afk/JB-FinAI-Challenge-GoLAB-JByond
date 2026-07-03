---
tags: [area/product, type/analysis, status/active]
date: 2026-07-03
up: "[[_결정준비-MOC]]"
---
# 스킬·플러그인·외부 플러그인·데이터 구상

# JB LocalGuard OS — 스킬·툴·MCP·외부데이터 설계안

## 0. 설계 전제

**SSOT 커널**은 `Case → AgentRun → Agent → Skill → Evidence → Approval → Audit`이다. 케이스는 업무 단위, AgentRun은 실행 기록, Agent는 책임 주체, Skill은 장착 기능, Evidence는 근거, Approval은 사람 개입, Audit은 감독·분쟁 증거다. 고객 대상 행동은 승인 전 자동 실행하지 않는다. (canon §0, §2, §8)

**확정 운영축**은 `계열사 × 담당직군`이다. 도메인(여신·전세·피싱·사후관리)은 직군이 처리하는 케이스 유형으로 둔다. 전세는 전북은행 전용 케이스로 두고, JB우리캐피탈에는 장착하지 않는다. (사용자 커널, canon §5)

**PII 방어 원칙**은 원본 PII·개인신용정보 외부 반출 금지다. 외부 LLM은 공개정보 또는 토큰화·비식별 컨텍스트만 처리하고, 원본 식별·대조는 국내·온프레/내부 모델로 라우팅한다. 신용정보법 §40조의2, PIPA §28조의4·§28조의5, 전자금융감독규정 망분리 원칙에 맞춘 구조다. (D5a, D5b, canon §4)

---

## 1. 계열사 × 직군 × 도메인 배치

| 계열사 | RM | 여신심사 | 사후관리 | 준법 | AML/사기 |
| --- | --- | --- | --- | --- | --- |
| 전북은행 | 소상공인·개인사업자 상담, 전세 상담, 피싱 대응 접점 | 기업/개인사업자 여신 보조, 정책금융 후보 | 상환위험·연체 전조·후속 태스크 | PII, 문안, 승인 L3/L4 | 보이스피싱·이상거래 차단 |
| JB우리캐피탈 | 캐피탈 고객 상담, 기업/비오토 케이스 | 캐피탈 여신·한도·상환능력 보조 | 연체·재약정·회수 전조 | 문안·개인신용정보·위탁 통제 | 대출사기·명의도용·이상신청 |
| 전세 도메인 | 전북은행 전용 | 전세대출/보증 연계 보조 | 계약 전후 위험 추적 | 권리·특약·문안 검토 | 전세사기 패턴 참고 |

전세는 은행 상품·보증·상담과 직접 연결되므로 전북은행 라인에만 둔다. 캐피탈은 동일 커널을 쓰되 `전세 Skill` 대신 `캐피탈 여신/사후관리 Skill`을 별도 모듈로 추가한다. (사용자 커널, canon §5)

---

## 2. 에이전트 로스터와 장착 Skill

현행 정본은 운영 에이전트 14종 + 사람 승인자 2종 + 승인 게이트다. (canon §2)

| 그룹 | 에이전트 | 장착 Skill | 주 사용자 |
| --- | --- | --- | --- |
| 운영 지휘 | 운영 조율 에이전트 | `case-os-core`, `approval-gate`, `audit-ledger` | RM, 사후관리 |
| 포트폴리오 | 포트폴리오 분석 에이전트 | `portfolio-signal`, `trend-summary`, `case-metrics` | 사후관리, 관리자 |
| 위험 탐지 | 위험신호 조기감지 에이전트 | `evidence-harvest`, `source-ranker`, `pain-classifier` | RM, 사후관리 |
| 여신 판단 | 상환위험 분류 에이전트 | `cashflow-stress`, `rate-relief` | RM, 여신심사 |
| 정책 매칭 | 정책금융 매칭 에이전트 | `policy-match`, `document-checklist` | RM, 여신심사 |
| 피싱/사기 | 이상거래 탐지·차단 에이전트 | `fraud-shield`, `do-not-contact-rule` | AML, 준법 |
| 준법 | 준법 검토 에이전트 | `compliance-guard`, `privacy-redaction`, `claim-limiter` | 준법 |
| RM 보좌 | RM 보좌 에이전트 | `notification-brief`, `tone-control` | RM |
| 전세 리드 | 전세위험 관리 리드 | `case-os-core`, `jeonse-price-ratio`, `approval-gate`, `audit-ledger` | 전북은행 RM |
| 전세가율 | 전세가율 분석 에이전트 | `jeonse-price-ratio`, `local-market-compare` | RM, 여신심사 |
| 권리관계 | 등기 권리 분석 에이전트 | `registry-rights-scan`, `ownership-transfer-delta` | 준법, RM |
| 임차인 리스크 | 임차인 손실위험 에이전트 | `tenant-asset-exposure`, `housing-cost-burden` | RM |
| 계약 | 계약 체크리스트 에이전트 | `pre-contract-checklist`, `special-clause-drafter`, `compliance-guard` | 준법, RM |
| 은행 연계 | 은행 연계 에이전트 | `bank-linkage-brief`, `guarantee-feasibility`, `notification-brief` | RM |

주의: `tone-control`, `trend-summary`, `case-metrics`, `privacy-redaction`, `claim-limiter`는 앱의 에이전트 장착 목록에는 있으나 `skillRack` 25종 본문에는 일부 누락되어 있다. 제출 문서에서는 canon 기준 `스킬 25`를 정본으로 쓰고, 누락 항목은 상세 Skill 정의 보강 대상으로 둔다. (근거: app.js, function-spec)

---

## 3. 도메인별 Skill 카탈로그

| 도메인 | 핵심 Skill | Evidence / 데이터 | 승인 |
| --- | --- | --- | --- |
| 여신·소상공인 | `cashflow-stress`, `rate-relief`, `policy-match`, `document-checklist`, `notification-brief` | JB 상담/거래 이력, 정책금융, ECOS 금리·경제지표, 지역 상권 뉴스 | L1 내부초안 → L2 RM 승인 → L3 준법 필요 시 |
| 전세 | `jeonse-price-ratio`, `local-market-compare`, `registry-rights-scan`, `guarantee-feasibility`, `pre-contract-checklist` | 국토부 실거래가, HUG 안심전세, 등기부, 보증보험 기준 | L1 분석 → L2 RM → L3 준법/법률 |
| 피싱·AML | `fraud-shield`, `do-not-contact-rule`, `escalation-memo` 후보 | 금융위 보이스피싱 정책, 내부 FDS/이상거래, 고객 접촉 이력 | L4 차단·상위검토 |
| 사후관리 | `portfolio-signal`, `case-metrics`, `trend-summary`, `audit-ledger` | 상환 일정, 연체 전조, 상담 메모, 후속 태스크 | L0 로그 → L1 담당자 검토 |

`escalation-memo`는 `03_에이전트/agent-system.md`에는 있으나 현재 `skillRack` 정본에는 없다. 도입 시 신규 Skill로 등록해야 한다. (근거 필요)

---

## 4. 플러그인 / MCP / 외부데이터 카탈로그

| 커넥터 | 용도 | 사용 Agent/Skill | 보안 등급 | 근거 |
| --- | --- | --- | --- | --- |
| `law-moleg` 국가법령정보 | 신용정보법, PIPA, 전자금융감독규정 조회 | 준법 검토, 감사 원장 | public | D5a, D5b, modules.js |
| `policy-sema` 정책금융 | 소진공, 저금리 대환, 보증 프로그램 후보 | 정책금융 매칭, 서류 체크리스트 | public | function-spec, modules.js |
| `policy-assembly` 국회·금융정책 | 금융위 정책, AI 가이드라인, 입법 변화 | 준법 검토 | public | modules.js |
| `news-local` 지역경제·상권 뉴스 | 전북 상권, 경기, 소상공인 위험 신호 | 위험신호 조기감지 | public | modules.js |
| `realestate-redev` 부동산/정비 | 상권 변화, 전세 시세 보조 | 전세가율, 위험 탐지 | public | modules.js |
| `jb-db` JB 금융 DB | 고객 거래·상담·심사 이력 | RM 보좌, 케이스 생성 | restricted | modules.js, 07-data-governance-pii |
| ECOS API | 금리·거시지표 | 여신·상환위험 | public | function-spec |
| 국토부 실거래가 / HUG | 시세·전세 위험·보증 가능성 | 전세 라인 | public/제약 있음 | function-spec, jeonse-shield-agents |
| Claude/OpenAI API | 비식별 추론, 초안 생성 | RM 보좌, 정책/법령 요약 | 외부 전송 금지 필드 제외 | D5a, D5b, function-spec |
| HyperCLOVA X / 국내·온프레 모델 | 원본 PII 필요 작업, 내부 요약 | 식별·대조, 내부 문서 RAG | restricted 처리 가능 | canon §10, function-spec |

은행 담당자가 실제로 자주 조회할 가능성이 높지만 정본 근거가 부족한 후보는 다음처럼 별도 플래그를 붙인다.

| 후보 데이터 | 쓰임 | 플래그 |
| --- | --- | --- |
| 여신 심사 시스템 원장, 한도/금리/담보/DSR 산식 | 여신심사·정책 제안 | → 최영욱 확인 필요 |
| 카드매출/입출금/연체/상환 스케줄 실시간 피드 | 사후관리·상환위험 | → 최영욱 확인 필요 |
| 내부 CRM/AICC 상담 녹취·요약 | RM 보좌·후속관리 | → 최영욱 확인 필요 |
| FDS, STR/CTR, KYC, 제재리스트, 명의도용/대출사기 조회 | AML·피싱 | → 최영욱 확인 필요 |
| NICE/KCB 등 CB 스코어·사업자 신용정보 | 여신심사 | → 최영욱 확인 필요 |
| 금융결제원 오픈뱅킹/펌뱅킹, 국세청 전자세금계산서 | 매출·현금흐름 대조 | → 최영욱 확인 필요 |
| 인터넷등기소 등기사항증명서 대량/API 가능 범위 | 전세 권리분석 | → 최영욱 확인 필요 |
| 은행 내규·상품규정·심사 매뉴얼 RAG | 준법·여신심사 | → 최영욱 확인 필요 |

---

## 5. 보안 연결 방식

외부 커넥터 호출은 `Data Governance Gate`를 반드시 통과한다.

1. **등급제**: `public / internal / confidential / restricted`로 필드 분류. `restricted`는 성명, 주민번호, 계좌, 연락처, 주소 등이며 외부 반출 금지. (07-data-governance-pii)
2. **토큰화**: 외부 호출 직전 PII를 토큰으로 치환하고, 토큰↔원본 매핑은 국내 PII 볼트/분리 저장소에만 보관. 신용정보법 §40조의2①②⑧ 및 감독규정 별표 8의 추가정보 분리보관 취지와 부합. (D5a)
3. **모델 라우팅**: 원본 PII·개인신용정보가 필요한 식별/대조는 내부·온프레. 공개 법령·정책·뉴스와 비식별 초안만 외부 LLM. (D5a, D5b)
4. **반출 스캔**: 주민번호·전화·계좌·주소·희소 조합을 전송 전후 스캔. 재식별 위험 발생 시 중단·회수·삭제. (D5a)
5. **감사 원장**: 어떤 Case, AgentRun, Skill, Evidence, Approval, 모델 라우트, 스캔 결과가 있었는지 해시체인으로 기록. 가명처리·접근·처리기록 3년 보존 요구와 연결. (D5a, app.js `auditChainRecords`)

D5b 기준으로 외부 생성형 AI·SaaS 사용 경로는 열려 있으나, 고유식별정보·개인신용정보를 일반 SaaS 예외로 처리하는 것은 금지/부적합하다. 가명정보 외부 처리도 공개근거상 혁신금융서비스 등 별도 경로가 더 안전하다. `MLS`라는 용어는 D5b에서 직접 확인 미흡으로 표시되어 있으므로, 심사용 문장에서는 “망분리 원칙 + 예외 + 보안대책/대체통제 + 결과책임”으로 쓰는 편이 안전하다. (D5b)

---

## 6. 승인 L0~L4 운영

| 레벨 | 의미 | 승인자 | 예시 |
| --- | --- | --- | --- |
| L0 | 관찰·로그 | 자동, 감사 기록 | Evidence 수집, 위험 태그 |
| L1 | 내부 초안 | 담당자 검토 | RM 메모, 서류 체크리스트 |
| L2 | 고객 접촉 전 RM 승인 | RM 최종 승인자 | 콜백 스크립트, 상담 안내 |
| L3 | 준법·법률 검토 | 준법 최종 승인자 | 전세 특약, 신용정보·표현 리스크 |
| L4 | 차단·상위검토 | RM+준법, 필요 시 보안/법무 | PII 외부 반출 시도, 피싱 고위험, 감사 실패 |

히어로 `JBG-104`는 riskScore 88이므로 고객 대상 행동은 승인 전 차단되고, RM 콜백/정책금융 안내는 `Approval Pending` 상태에서 RM 승인 후에만 진행된다. (canon §1, hero-case-walkthrough)

---

## 7. 실동작 데모 증거팩 반영

현재 증명 가능한 범위는 **정적 MVP의 로컬 브라우저 동작**이다. `?demo=sme`, `?demo=jeonse`, `?demo=phishing` 골든 패스가 있고, 함수계약은 `computeRiskDecision`, `buildDashboardData`, `moveCaseToColumn`, `auditChainRecords`로 추적된다. (function-spec, canon §9)

실동작으로 확인된 항목:
- 케이스 선택 → AgentRun 실행 → 승인 대기 전환
- 승인 큐에서 승인 처리
- 전세 진단 → 결과 저장 → 후속 작업 생성
- 로컬 상태 저장·데모 초기화
- 감사 원장 해시체인 검증·JSON export
- 거버넌스 패널의 토큰화 전/후, 라우팅, 반출 스캔 표시
- 제출 준비 리포트 기준 `e2e 19/19`, 이전 반복 리포트 기준 `13 passed` 기록

명확한 한계:
- 실제 은행 API, 등기부/HUG 실시간 조회, 실제 인증/권한, 서버 DB 저장은 데모 범위 밖이다.
- `jb-db`는 실제 연결이 아니라 연결 가능한 구조와 모의/캐시 응답이다.
- 외부 LLM 실호출도 원본 PII 비반출 원칙을 설명하는 데모이며, 운영 도입 시 위수탁·국외이전·혁신금융서비스/보안평가 검토가 필요하다. (D5a, D5b)

---

## 8. 심사위원용 한 문장

**JB LocalGuard OS는 전북은행과 JB우리캐피탈의 직군별 케이스 업무에 14개 전문 에이전트와 25개 Skill을 장착하되, 원본 PII·개인신용정보는 내부에 남기고 외부 모델에는 공개정보·토큰화 정보만 보내며, 모든 제안은 RM·준법 승인과 Evidence·Audit 해시체인으로 닫히는 금융 AX 운영 콘솔이다.**