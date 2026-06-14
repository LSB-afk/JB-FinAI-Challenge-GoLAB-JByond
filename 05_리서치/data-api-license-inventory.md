# 데이터·API·오픈소스 라이선스 인벤토리 (JB LocalGuard OS)

검증일: 2026-06-14

본 문서는 JB금융그룹 Fin:AI Challenge 심사기준 3.5 ("외부 데이터·오픈소스·상용 API의 출처, 라이선스, 제약사항을 고려하고 있는가")에 대응하기 위해, JB LocalGuard OS가 활용(또는 본선에서 활용 예정)하는 외부 데이터·상용 API·오픈소스의 출처/접근방식/라이선스/제약을 정리한 것이다. 라이선스 문구를 1차 출처에서 확정하지 못한 항목은 "확인 필요"로 표기했다.

> 표기 원칙: 공공데이터포털(data.go.kr) 개방 데이터는 데이터셋별로 공공누리 유형이 달리 표기되며, 기본 권장 유형은 **공공누리 제1유형(출처표시, 상업적 이용·변형 가능)**이다. 다만 데이터셋마다 유형이 다를 수 있어 개별 상세페이지 확인이 필요하다.

## A. 공개/공공 데이터

| 항목 | 제공처/제공기관 | 데이터/용도 | 접근 방식 | 라이선스 | 제약사항 | 출처URL |
| --- | --- | --- | --- | --- | --- | --- |
| 사업자등록 진위확인·상태조회 | 국세청 (공공데이터포털 제공) | 사업자등록번호 진위/휴·폐업 상태조회 — 사업자 KYC, 케이스 검증 | OpenAPI(REST, JSON/XML), 포털 회원가입 후 활용신청·인증키 | 공공누리 유형 데이터셋 표기 기준 — **확인 필요**(상세페이지 확인) | 인증키 필요. 사업자번호 등 입력값 처리, 대량 자동조회 시 트래픽/약관 제한 가능 | https://www.data.go.kr/bbs/ntc/selectNotice.do?originId=NOTICE_0000000004360 |
| 상가(상권)정보 | 소상공인시장진흥공단 (공공데이터포털) | 상호/주소/업종/좌표 등 상권 데이터 — 지역 소상공인 상권 분석 | OpenAPI(REST) + 파일데이터(CSV, 분기 갱신) | 공공누리(데이터셋 표기, 다수 제1유형) — **확인 필요** | 인증키 필요. 출처는 국세청/카드사. 분기 단위 갱신으로 최신성 한계 | https://www.data.go.kr/data/15012005/openapi.do |
| ECOS 경제통계 (기준금리 등) | 한국은행 | 기준금리/환율/금리/GDP 등 거시지표 — 금리민감도·정책금융 판단 | OpenAPI(REST, JSON/XML/XLS), ECOS 가입 후 인증키 | 한국은행 작성 통계: **출처표시 시 상업적 이용 포함 무료 자유이용**. 타기관 작성 통계는 비상업 한정, 상업이용 시 작성기관 승인 필요 | 인증키 필요. 출처표기 의무(예: "출처: ECOS(한국은행), 2026.6.14"). 통계작성기관별 조건 상이 | https://ecos.bok.or.kr/api/ |
| 전자공시(DART) | 금융감독원 (OPEN DART) | 기업개황/정기보고서/재무/주요사항 공시 — 기업금융 케이스 분석 | OpenAPI(REST, JSON/XML), OPEN DART 가입 후 인증키 | OPEN DART 이용약관 적용(개인·기업·단체 누구나 이용 가능, 공시문서 자유 추출·이용) — 상업적 이용 가부 약관 원문 **확인 필요** | 인증키 필요. 약관 준수. 대량 호출 제한 가능 | https://opendart.fss.or.kr/intro/terms.do |
| 전세보증금반환보증 발급현황 | HUG 주택도시보증공사 (공공데이터포털) | 분기/주택유형별 보증 발급현황(통계) — 전세 리스크 안내 | 파일데이터(CSV) + 포털 OpenAPI 변환 제공 | 공공누리(데이터셋 표기) — **확인 필요** | 집계 통계 위주(개별 계약 미포함), 분기 갱신 최신성 한계 | https://www.data.go.kr/data/15002531/fileData.do |
| 아파트 매매/전월세 실거래가 | 국토교통부 (공공데이터포털) | 아파트 매매·전월세 실거래 — 담보/전세 시세 참조 | OpenAPI(REST), 인증키. 법정동코드+계약년월 조회 | 공공누리(데이터셋 표기, 다수 제1유형) — **확인 필요** | 인증키 필요. 개인정보 보호 위해 동/호 미포함. 대량 자동수집 시 약관·트래픽 제약 | https://www.data.go.kr/data/15126469/openapi.do |
| 부동산등기(등기부) 정보 | 대법원 인터넷등기소 / 법원 등기정보광장 | 부동산등기부 열람 — 권리관계 확인 | Open API(등기정보광장) / 열람·발급은 인터넷등기소(유료, 건별 수수료) | 법원 제공 약관 적용(공공누리 아님) — **확인 필요** | **접근 제약 큼**: Open API 일 최대 1,000건, 분당 30건 제한, 인증키 24개월·3개월 미사용 시 삭제. 자동 대량수집 사실상 불가, 수수료 발생 | https://data.iros.go.kr/rp/oa/openOapiIntro.do |
| 오픈뱅킹 / 계좌·거래 API | 금융결제원 (오픈뱅킹) | 계좌조회/거래내역/이체 등 — (본선 검토용, 실데이터 연동) | OpenAPI, **이용기관 등록·보안심사 통과 필수** | 금융결제원 오픈뱅킹 이용약관/이용기관 계약 — **확인 필요** | **제약 큼**: 자격을 갖춘 금융사·핀테크 이용기관만 참여, 엄격한 보안심사·인증 필요. 개인신용정보 취급 → 신용정보법 적용 | https://developers.kftc.or.kr/dev |
| 부동산통계(R-ONE) | 한국부동산원 | 매매가격지수/전세가격지수 등 통계 — 시세 추세 참조 | OpenAPI(REST), R-ONE 인증키 / 공공데이터포털 연계 | 공공누리(데이터셋 표기) — **확인 필요** | 인증키 필요. 개별 시세가 아닌 지수/통계. 갱신주기 한계 | https://www.reb.or.kr/r-one/portal/openapi/openApiIntroPage.do |

## B. 상용 API / 모델

| 항목 | 제공처/제공기관 | 데이터/용도 | 접근 방식 | 라이선스 | 제약사항 | 출처URL |
| --- | --- | --- | --- | --- | --- | --- |
| Claude API | Anthropic | 에이전트 추론/요약/초안 생성 | REST API, API 키 | Commercial Terms of Service. 기본적으로 **상용 제품(API 등) 입력·출력은 모델 학습에 미사용**(Development Partner Program 옵트인 제외). 고객이 Controller, Anthropic은 Processor | **데이터가 美 기반 인프라로 전송 → 국외이전 해당**. 학습 미사용이어도 국외이전·위탁 규제는 별도 적용. API 키·요금·이용약관 준수 | https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training |
| OpenAI API | OpenAI | 대체 LLM 추론 | REST API, API 키 | Business/API 데이터는 **기본적으로 학습 미사용(2023-03-01 이후)**, 옵트인 시에만 공유 | **데이터 美 전송 → 국외이전**. 남용탐지·서비스 목적 입력/출력 최대 30일 보관(엔드포인트별 예외). 학습 미사용≠국내 보관 | https://openai.com/policies/api-data-usage-policies/ |
| HyperCLOVA X (국내/온프레 대안) | 네이버클라우드 | 금융특화 sLLM, 폐쇄망/온프레 추론 — PII 처리 경로 대안 | 클라우드 API / 뉴로클라우드(온프레, 고객 데이터센터 내 설치) | 네이버클라우드 상용 계약/약관 — **확인 필요**(구체 라이선스·요금 미검증) | 국내 리전·온프레로 **데이터 국외반출 없이** 처리 가능. JB-네이버클라우드 AI 협약과 정합. 도입비용/계약 필요 | https://clova.ai/hyperclova |

## C. 오픈소스 (현 MVP / 본선 후보)

| 항목 | 제공처/제공기관 | 데이터/용도 | 접근 방식 | 라이선스 | 제약사항 | 출처URL |
| --- | --- | --- | --- | --- | --- | --- |
| Vanilla JS (현 MVP) | — | 정적 콘솔 MVP. 외부 런타임 의존성 거의 없음 | 브라우저 네이티브 | 해당 없음(표준 웹) | 외부 의존성이 없어 라이선스 리스크 최소 | — |
| Playwright | Microsoft | E2E 테스트 자동화 | npm/pip 패키지(개발·CI) | Apache License 2.0 | 저작권/NOTICE 고지 의무. 런타임 번들 아님(테스트 도구) | https://github.com/microsoft/playwright/blob/main/LICENSE |
| python-pptx | Steve Canny | 제안 데크(.pptx) 자동 생성 | pip 패키지(빌드 도구) | MIT License | 저작권 고지 의무 | https://github.com/scanny/python-pptx/blob/master/LICENSE |
| FastAPI (본선 백엔드 후보) | Sebastián Ramírez | 백엔드 API 프레임워크 | pip 패키지 | MIT License | 저작권 고지 의무 | https://github.com/fastapi/fastapi |
| PostgreSQL (본선 후보) | PostgreSQL Global Dev Group | 케이스/감사로그 저장소 | DB 서버 | PostgreSQL License (BSD/MIT 계열 permissive) | 저작권/허가 고지 유지. 상업적 이용 허용 | https://opensource.org/license/postgresql |

## D. 제약·리스크 요약

| 항목 | 제공처/제공기관 | 데이터/용도 | 접근 방식 | 라이선스 | 제약사항 | 출처URL |
| --- | --- | --- | --- | --- | --- | --- |
| 등기·실거래 자동 대량수집 제한 | 대법원 인터넷등기소 / 국토부 | 권리관계·시세 — 케이스 보강 | API/열람 | 기관 약관 | 등기 Open API 일 1,000건·분당 30건 제한, 발급 수수료, 대량 크롤링 금지 → 케이스 단위 소량 조회만 설계 | https://data.iros.go.kr/rp/oa/openOapiIntro.do |
| 금융 PII 국외전송 금지(거버넌스) | 개인정보보호법 / 신용정보법 | 개인(신용)정보 보호 | 규제 준수 | 법령 | 국외이전은 물리적 제공뿐 아니라 **원격 조회·처리위탁·보관까지 포함**. 해외 LLM API 전송은 국외이전 + 신용정보법 위탁 규제 대상 → PII 마스킹/비식별 후에만 외부호출, PII 처리는 국내/온프레 모델로 라우팅 | https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=140586 |
| 데이터 최신성 | 공공기관 다수 | 통계/실거래 등 | 파일/API | 공공누리 등 | 상권·전세보증·부동산통계는 분기/월 갱신 → 의사결정 시 기준일 명시, 실시간 가정 금지 | https://www.data.go.kr/ |
| 라이선스 표기 의무 | 공공누리 / OSS | 출처표시 | — | 공공누리/Apache/MIT 등 | 공공누리·ECOS는 출처표시 의무(예: "출처: ECOS(한국은행)"), OSS는 NOTICE/저작권 고지 유지 → 제품 내 출처/라이선스 고지 페이지 필요 | https://www.kogl.or.kr/info/license.do |

## 출처 목록

- 국세청 사업자등록 진위/상태조회 OpenAPI 공지: https://www.data.go.kr/bbs/ntc/selectNotice.do?originId=NOTICE_0000000004360
- 소상공인시장진흥공단 상가(상권)정보 OpenAPI: https://www.data.go.kr/data/15012005/openapi.do
- 한국은행 ECOS Open API: https://ecos.bok.or.kr/api/
- 금융감독원 OPEN DART 이용약관: https://opendart.fss.or.kr/intro/terms.do
- HUG 전세보증금반환보증 발급현황(공공데이터포털): https://www.data.go.kr/data/15002531/fileData.do
- 국토교통부 아파트 매매 실거래가 OpenAPI: https://www.data.go.kr/data/15126469/openapi.do
- 국토교통부 아파트 전월세 실거래가 OpenAPI: https://www.data.go.kr/data/15126474/openapi.do
- 대법원 등기정보광장 Open API 안내(제약): https://data.iros.go.kr/rp/oa/openOapiIntro.do
- 금융결제원 오픈뱅킹 개발자포털: https://developers.kftc.or.kr/dev
- 한국부동산원 R-ONE Open API 소개: https://www.reb.or.kr/r-one/portal/openapi/openApiIntroPage.do
- Anthropic 데이터 학습 사용 정책: https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training
- Anthropic Processor/Controller 역할: https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller
- OpenAI Enterprise/API 데이터 사용 정책: https://openai.com/policies/api-data-usage-policies/
- 네이버클라우드 HyperCLOVA X: https://clova.ai/hyperclova
- Playwright LICENSE(Apache-2.0): https://github.com/microsoft/playwright/blob/main/LICENSE
- python-pptx LICENSE(MIT): https://github.com/scanny/python-pptx/blob/master/LICENSE
- FastAPI(MIT): https://github.com/fastapi/fastapi
- PostgreSQL License: https://opensource.org/license/postgresql
- 신용정보의 이용 및 보호에 관한 법률: https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=140586
- 공공누리 이용허락 안내: https://www.kogl.or.kr/info/license.do

## 제품 적용 (3.5 대응)

JB LocalGuard OS는 외부 데이터·API·오픈소스를 다음 원칙으로 활용한다.

1. **출처·라이선스 준수 및 고지**
   - 공공데이터포털 데이터는 공공누리 유형을 데이터셋별로 확인하고, 출처표시(공공누리 제1유형 기준) 의무를 콘솔 내 "출처/라이선스" 고지로 이행한다.
   - 한국은행 ECOS는 "출처: ECOS(한국은행)" 형식 출처표기를 산출물에 포함한다(한국은행 작성 통계는 출처표시 시 상업적 이용 가능, 타기관 통계는 승인 조건 확인).
   - 오픈소스(Playwright Apache-2.0, python-pptx MIT, FastAPI MIT, PostgreSQL License)는 저작권/NOTICE 고지를 유지한다.

2. **접근 제약을 설계에 반영**
   - 등기/실거래처럼 자동 대량수집이 제한·유료인 소스는 케이스 단위 소량 조회로만 사용하고, 대량 크롤링을 하지 않는다(등기 Open API 일 1,000건·분당 30건 한도 등).
   - 오픈뱅킹 등 이용기관 자격·보안심사가 필요한 API는 본선 단계에서 자격 충족 후 연동하는 것으로 명시한다.
   - 분기/월 갱신 데이터는 의사결정 시 기준일을 표기하여 최신성 한계를 투명하게 드러낸다.

3. **PII 비반출(by-design) 거버넌스 — 왜 필수인가**
   - 핵심 근거는 "상용 LLM이 입력을 학습에 쓰지 않는다"가 **아니다**. Anthropic/OpenAI가 학습 미사용을 보장하더라도, 개인(신용)정보를 美 기반 LLM API로 보내는 행위 자체가 **개인정보보호법상 국외이전**에 해당한다. 현행 해석상 국외이전은 물리적 제공뿐 아니라 **원격 조회·처리위탁·보관**까지 포함하므로 벤더 약관만으로는 해소되지 않는다.
   - 금융 맥락에서는 **신용정보법**상 개인신용정보 처리·위탁 규제가 추가로 적용된다.
   - 따라서 LocalGuard OS는 PII를 외부 프런티어 LLM으로 전송하지 않는다(비반출). 외부 LLM 호출이 필요한 경우 마스킹/비식별화 후의 비-PII 컨텍스트만 전달하고, PII가 결합되는 추론은 **국내 리전/온프레미스 모델(예: HyperCLOVA X 뉴로클라우드)**로 라우팅한다 — 이는 JB-네이버클라우드 AI 협약 방향과도 정합한다.
   - 모든 외부 호출 경계에서 PII 마스킹 여부를 검증하고, 사용한 데이터 출처·모델·처리경로를 감사 로그(Audit Log)에 남긴다.
