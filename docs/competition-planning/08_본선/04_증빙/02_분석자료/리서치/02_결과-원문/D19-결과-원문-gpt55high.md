---
tags:
  - area/strategy
  - type/reference
  - status/active
date: 2026-06-30
up: "[[_운영-회수현황]]"
---
> 📄 **요약 먼저** → [[D19-요약]] · 상세가 필요할 때만 아래 원문을 본다.

> 원본 파일: `D19. gpt 5.5 high.20260630_JB_LocalGuard_서비스_계약_리서치.docx`
> 회수 2026-06-30 · ⚠️ 대외비 · **사용 모델: gpt 5.5 high (Deep Research)**

---

# JB LocalGuard OS 운영 가능한 서비스 계약 리서치

## 핵심 발견 요약

아래 표의 요지는 단순합니다. **JB LocalGuard OS를 “라이선스”가 아니라 “금융권이 운영을 위탁할 수 있는 서비스”로 보이게 하려면, 비용의 중심을 모델 사용료가 아니라 운영·감사·장애대응·지원조직에 둬야 한다**는 점입니다. 국내 금융 규제와 글로벌 클라우드/AI 공식 SLA 문서가 공통으로 보여주는 것은, 운영서비스의 핵심 원가는 **접속기록 보관, 재해복구, 위탁 통제, 보안 점검, P1 대응 체계, 변경통제**라는 사실입니다. [\[1\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967)

| 축 | 핵심 발견 | 우리 계약에 넣을 문장 |
|----|----|----|
| TCO | 외부 LLM 단가는 토큰 기준으로 공개되어 있지만, 금융권 운영비에서 더 큰 비중을 차지하는 것은 **로그·감사보관, DLP/PII 스캔, 백업·DR, 관찰성, 보안모니터링, 온콜/지원조직**이다. OpenAI와 Anthropic의 공개 가격은 1M 토큰당 수 달러~수십 달러 수준이지만, AWS Enterprise Support는 월 최소 5,000달러, Google Cloud Premium Support는 월 최소 15,000달러다. 즉, **“운영 가능한 지원체계” 자체가 이미 별도 원가**다. [\[2\]](https://developers.openai.com/api/docs/pricing) | “서비스 요금은 모델/API 이용료, 검색/색인, 로그·감사보관, DLP, 백업·DR, 보안모니터링, 관찰성, 정기 리포팅 및 지원조직 운영비를 포함한 관리형 서비스 요금으로 구성한다.” |
| TCO | 데이터 검색계층은 **생산계 SLA를 충족하려면 복제본 수를 늘려야 하므로**, 개발/PoC 가격을 그대로 운영가로 볼 수 없다. Azure AI Search는 읽기 전용 SLA에 2개 복제본, 읽기/쓰기 SLA에는 3개 이상 복제본을 요구하고, Free tier는 생산용 SLA가 없다. [\[3\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) | “운영 전환 시 검색/색인 계층은 최소 3 replicas 이상으로 구성하며, 해당 복제·이중화 비용은 운영환경 단가에 반영한다.” |
| TCO | PII 비반출 제품이라도 비용이 0이 되지 않는다. 개인정보 안전성 확보조치 기준은 **접속기록 1년, 특정 경우 2년 보관**, 월 1회 이상 점검, **암호키의 생성·이용·보관·배포·파기 절차**를 요구한다. 즉 **토큰화 키 관리, 로그 마스킹, 감사조회 권한관리**는 남는 원가다. [\[4\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201) | “공급사는 토큰화/암호키 관리 절차, 로그 마스킹, 감사조회 권한 통제를 운영 절차로 유지하고, 관련 운영기록을 계약 기간 중 보관·제공한다.” |
| SLA | 운영단계 SLA는 단순 가용성 수치 하나로 끝나지 않는다. AWS API Gateway SLA와 Google Vertex AI SLA는 모두 **서비스 크레딧, 측정 방식, 예외조항, 고객의 청구 절차**를 함께 둔다. Azure는 99.9% SLA가 항상 연 8.7시간 이하 장애를 뜻하지 않는다고 명시한다. 즉 금융사 계약서에는 **가용성 + 측정식 + 예외 + 크레딧 + 고객 로그근거 제출 방식**을 함께 넣어야 한다. [\[5\]](https://aws.amazon.com/api-gateway/sla/) | “가용성은 월간 기준으로 측정하며, 측정식·예외사유·신청기한·SLA 크레딧 산식을 별첨 SLA에 명시한다.” |
| SLA | PoC는 best-effort가 가능하지만, **파일럿부터는 최소한의 장애등급·응답시간·백업·변경통지**가 필요하다. Azure Foundry는 개발 배포에는 SLA가 없고, 표준은 best-effort, provisioned는 더 강한 SLA·낮은 지연 변동성을 제공한다고 구분한다. [\[6\]](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types) | “PoC는 무보증 시험환경으로 하되, 파일럿부터는 장애등급, 초기응답시간, 일일 백업, 월간 리포트 및 변경통지 절차를 적용한다.” |
| SLA | JB LocalGuard OS는 **고객 접점 자동실행이 승인 전 차단**되므로, SLA의 1순위는 “자동실행 성공률”이 아니라 **케이스 생성, 위험알림, 승인대기열, 감사로그 무결성**이어야 한다. 이는 코어뱅킹형 RTO/RPO를 그대로 가져오지 말고, RM 의사결정을 멈추지 않는 수준으로 설계해야 함을 뜻한다. Azure는 Search가 단일 리전 서비스이며 비동기 복제라 쓰기 손실 가능성을 명시한다. [\[7\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) | “본 서비스의 핵심 SLA 대상은 케이스 생성, 위험알림, 승인대기열 및 감사원장 기록이며, 대고객 자동실행은 계약 범위에서 제외한다.” |
| 지원조직 | 클라우드 사업자도 생산운영에는 TAM, 전략 리뷰, 보안 인시던트 대응 같은 **이름 있는 지원조직**을 붙여 판다. AWS Enterprise Support는 TAM·보안 인시던트 대응·전략 리뷰를, Azure ProDirect는 계정관리와 강화된 장애 커뮤니케이션을, GCP Premium Support는 named Technical Account Manager와 P1 15분 응답을 제공한다. [\[8\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html) | “공급사는 서비스 매니저 1인, L2 운영 담당, L3 AI/LLMOps 담당, 보안/준법 연락책임자를 지정하고, 월간 운영회의 및 분기 QBR을 수행한다.” |
| 지원조직 | 작은 스타트업이라도 파일럿은 돌릴 수 있지만, **정식 운영 전환엔 최소한 L2/L3 분리, 보안/준법 대응 창구, 휴가/퇴사에 대비한 이중화된 담당 구조**가 필요하다. 단일 담당자 의존은 운영계약의 전형적 실패 신호다. Azure incident management 가이드는 Incident Response Manager와 Retrospective Leader 같은 역할 정의를 요구한다. [\[9\]](https://learn.microsoft.com/en-us/azure/well-architected/design-guides/incident-management) | “공급사는 단일 담당자 의존을 배제하기 위해 주요 운영업무별 백업 담당자를 지정하고, 인수인계 문서와 런북을 최신 상태로 유지한다.” |
| 장애대응 | 금융 AI 콘솔에는 일반 기능 장애 외에 **PII 의심 이벤트**와 **감사원장 쓰기 실패**를 별도 최고심각도로 두는 편이 합리적이다. 중요한 원장 접근 기록은 5년 보존 의무가 있고, 침해사고는 72시간 내 통지의무가 걸릴 수 있기 때문이다. [\[10\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672) | “PII 반출 의심, 감사원장 기록 실패, 승인정책 무단변경은 최고 심각도 보안/준법 인시던트로 분류한다.” |
| 장애대응 | 외부 모델 장애나 deprecation은 운영계약에 반드시 들어가야 한다. OpenAI는 일반 제공 모델에 **최소 6개월 deprecation notice**를, Priority processing에는 enterprise agreement 기반 SLA 크레딧을 둔다. 따라서 고객 통보·대체모델·회귀테스트·롤백절차가 필요하다. [\[11\]](https://developers.openai.com/api/docs/deprecations) | “공급사는 외부 모델의 중단·변경·요금 변동·deprecation이 확인될 경우, 고객에게 통지하고 대체모델 및 회귀검증 결과를 제공한다.” |
| 감사·보관 | 국내 규정은 위탁업무에 대해 **수탁자 교육·점검·감독**, 재위탁 사전동의, 손해배상 책임을 요구한다. 표준 개인정보처리위탁 계약서도 실태점검 및 시정요구 조항을 둔다. 운영계약서에 감사권·보안점검권·재위탁 통지가 빠지면 금융사 구매자는 불안해질 수밖에 없다. [\[12\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print) | “고객은 수탁자의 운영·보안·개인정보 처리 현황에 대해 정기 또는 수시 점검을 실시할 수 있으며, 재위탁은 고객의 사전 서면승인을 요한다.” |
| 감사·보관 | 전자금융감독규정상 클라우드 이용 시 업무연속성 계획에는 **데이터 백업, 재해복구, 침해사고 대응훈련, 출구전략**이 포함되어야 한다. 따라서 종료·반출·삭제 절차까지 계약에 넣어야 운영계약처럼 보인다. [\[13\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) | “공급사는 계약 종료 시 데이터 반출, 로그 인계, 백업 파기, 키 폐기, 계정 회수 및 종료확인서를 포함한 종료 절차를 제공한다.” |

이 리서치의 결론은 분명합니다. **JB LocalGuard OS의 12개월 계약은 ‘AI 기능 사용료’가 아니라 ‘금융권 운영가능성 보증료’를 파는 구조여야 한다**는 것입니다. 공개 단가가 있는 외부 모델·DLP·관찰성 비용은 비교적 작거나 예측 가능하지만, 금융사가 안심하는 핵심은 **운영통제·장애대응·감사증빙·지원조직**이며, 그 부분이 계약가를 수억 원대로 끌어올리는 합리적 근거입니다. AWS/GCP의 프리미엄 지원만으로도 이미 연 단위 최소 금액이 크고, 국내 규정은 보관·감독·위탁통제를 별도 운영행위로 만든다는 점이 그 배경입니다. [\[14\]](https://aws.amazon.com/premiumsupport/pricing/)

## 비용 모델과 12개월 TCO 산식표

### 라이선스 가격과 운영 가능 서비스 가격의 차이

라이선스 가격은 보통 **소프트웨어 사용권이나 API 사용량**을 판정합니다. 반면 운영 가능 서비스 가격은 다음 다섯 가지를 함께 팝니다. **가용성/응답시간 보증, 보안·로그·감사 대응, 재해복구/백업, 고객 커뮤니케이션, 그리고 이름 있는 지원조직**입니다. 이 차이는 추상적이지 않습니다. 국내 규정은 접속기록 보관, 월간 점검, 키 관리, 위탁 감독, 재위탁 동의, 클라우드 업무연속성 계획을 요구하고, 글로벌 클라우드 사업자도 TAM·프리미엄지원·보안 인시던트 대응을 별도 가격으로 판매합니다. 따라서 금융권에서 “운영 가능한 서비스”는 본질적으로 **규제 준수와 운영책임을 포함한 상품**입니다. [\[15\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201)

### 12개월 TCO 시나리오에 대한 해석

아래 표는 **직접비 산식**과 **공개 단가가 있는 참고 단가**를 분리한 것입니다. 인력비는 공개 단가가 일관되지 않아 **FTE-month 기반 산식**으로 두고, 마지막에 **상업적 제안 밴드 \[후보 범위\]**를 제시합니다. 핵심 해석은 다음과 같습니다.

생산 운영으로 갈수록 비용이 커지는 첫 번째 이유는 **복제·보관·보안스캔**입니다. 예를 들어 검색계층은 운영 SLA를 맞추기 위해 replicas를 늘려야 하고, 로그는 “수집” 비용보다 “장기보관과 인덱싱” 비용 구조가 달라집니다. 두 번째 이유는 **프리미엄 지원과 온콜**입니다. AWS Enterprise Support 최소 월 5,000달러, GCP Premium Support 최소 월 15,000달러 같은 공식 지원 가격은 “24x7 대응가능성”이 이미 별도 상품이라는 점을 보여줍니다. 세 번째 이유는 **감사와 위탁통제**입니다. 금융권은 장애만 복구하면 끝이 아니라, 누가 무엇을 승인·변경·조회했는지 나중에 꺼내 보여줄 수 있어야 하므로, 감사원장·접속기록·변경승인 라인이 TCO를 만든다는 점이 중요합니다. [\[16\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search)

| 비용항목 | 가격 단위 | 산식 | 보수 | 기준 | 강화 | 공개 단가/후보 범위 | 근거 URL | 발행처·날짜 | 신뢰도 | 비고 |
|----|----|----|----|----|----|----|----|----|----|----|
| 외부 LLM/API 호출비 | 1M input/output tokens | `(월 입력토큰/1M×입력단가 + 월 출력토큰/1M×출력단가) × 12` | 저비용 모델·표준 tier | 중간 모델·표준 tier | 상위 모델·priority/provisioned mix | OpenAI gpt-5.4-mini 입력 \$0.75/MTok, 출력 \$4.50/MTok; gpt-5.5 입력 \$5/MTok, 출력 \$30/MTok. Anthropic Haiku 4.5 입력 \$1/MTok, 출력 \$5/MTok; Sonnet 4.6 입력 \$3/MTok, 출력 \$15/MTok. [\[17\]](https://developers.openai.com/api/docs/pricing) | `https://developers.openai.com/api/docs/pricing` / `https://www.anthropic.com/pricing` | OpenAI API Docs, accessed 2026-06-30 / Anthropic Pricing, accessed 2026-06-30 | 1차 | **토큰 단가 자체는 공개·예측 가능**. 다만 priority/data residency uplift는 별도 고려. |
| 데이터 레지던시·고가용성 uplift | 토큰비 또는 배포 tier uplift | `기본 LLM비 × residency uplift 또는 provisioned surcharge` | 미적용 가능 | 필요 시 일부 적용 | 전 구간 적용 | OpenAI는 data residency eligible endpoints에 10% uplift. Azure Foundry는 provisioned가 standard보다 SLA 강하고 latency variance가 낮음. [\[18\]](https://developers.openai.com/api/docs/pricing) | `https://developers.openai.com/api/docs/pricing` / `https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types` | OpenAI Docs, accessed 2026-06-30 / Microsoft Learn, 2026-02-27 | 1차 | 금융권 운영에서는 **표준 best-effort보다 provisioned/priority의 계약가가 더 설득력 있음**. |
| 임베딩 | 1M tokens | `(초기 색인 토큰 + 월 증분 토큰×12)/1M × 단가` | text-embedding-3-small 중심 | 소형 + 일부 대형 | 대형 중심 또는 재색인 잦음 | OpenAI text-embedding-3-small \$0.02/MTok, text-embedding-3-large \$0.13/MTok. [\[19\]](https://developers.openai.com/api/docs/models/text-embedding-3-large) | `https://developers.openai.com/api/docs/models/text-embedding-3-large` | OpenAI API Docs, accessed 2026-06-30 | 1차 | **임베딩 자체는 대체로 저렴**하나, 재색인 빈도·문서량이 비용 결정. |
| 문서 추출/OCR·전처리 | 문서 페이지 | `월 페이지수 × 페이지당 단가 × 12` | 배치 중심·필수 문서만 | 기준 업무문서 | 넓은 문서 커버리지 | Azure Document Intelligence는 페이지 기준 과금, 예: Add-on \$6/1,000 pages; custom generative extraction \$30/1,000 pages. AWS Textract도 문서 API별 페이지 과금. [\[20\]](https://azure.microsoft.com/en-us/pricing/details/document-intelligence/) | `https://azure.microsoft.com/en-us/pricing/details/document-intelligence/` / `https://aws.amazon.com/textract/pricing/` | Microsoft Pricing, accessed 2026-06-30 / AWS Pricing, accessed 2026-06-30 | 1차 | 계약서에는 **초기 적재·증분 적재를 분리**하는 것이 안전. |
| RAG 인덱스/검색 계층 | replicas, partitions, nodes | `기본 검색 서비스비 × replicas × partitions` | 2 replicas read-only 수준 | 3 replicas read-write 수준 | 다중리전/오버프로비저닝 | Azure AI Search는 read-only SLA 2 replicas, read-write 3+ replicas 필요. OpenSearch는 node/storage 기반 과금. [\[21\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) | `https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search` / `https://aws.amazon.com/opensearch-service/pricing/` | Microsoft Learn, 2026-01-22 / AWS Pricing, accessed 2026-06-30 | 1차 | **운영전환 시 검색계층 비용이 2~3배로 뛰는 포인트**. 정확한 단가는 서비스/지역별 상이 → 산식 중심. |
| 프록시/API 게이트웨이 | API call, throughput, hour | `월 호출건수 × 호출단가 × 12` 또는 `예약용량 × 시간단가` | shared gateway | dedicated gateway | dedicated + WAF + rate shaping | 공개 단가는 서비스 옵션 편차가 커서 본 보고서에서는 **산식만 핵심**. 별도의 SLA는 API Gateway 서비스별로 99.95% 예시. [\[22\]](https://aws.amazon.com/api-gateway/sla/) | `https://aws.amazon.com/api-gateway/sla/` | AWS SLA, 2022-05-05 | 1차 | 가격은 지역/종류/캐시옵션 차이가 커 \[미검증\] 정액 대신 산식 계약 권고. |
| DLP·PII 스캔 | GB scanned/profiled | `월 스캔GB × GB단가 × 12` | 야간 배치·표본 스캔 | 전량 스캔 + 마스킹 | 전량 + 재스캔 + 다중 규칙셋 | Google Sensitive Data Protection discovery \$0.03/GB profiled. AWS CloudWatch data protection example \$0.12/GB scanned. Datadog Sensitive Data Scanner \$0.30/GB, Detect only \$0.03/GB. [\[23\]](https://cloud.google.com/sensitive-data-protection/pricing) | `https://cloud.google.com/sensitive-data-protection/pricing` / `https://aws.amazon.com/cloudwatch/pricing/` / `https://www.datadoghq.com/pricing/list/` | Google Cloud Pricing, accessed 2026-06-30 / AWS Pricing, accessed 2026-06-30 / Datadog Pricing, accessed 2026-06-30 | 1차 | 생산계약서는 **배치/실시간 스캔 범위를 별도 명시**해야 비용분쟁을 줄임. |
| 로그·감사원장 저장 | GB/day, indexed events, months retained | `(일 로그GB × 30 × 수집단가 + 아카이브GB × 저장단가 × 보관월수)` | 30일 인덱스 + 12개월 archive | 30~90일 인덱스 + 24개월 archive | 90일 인덱스 + 36~60개월 archive | CloudWatch 예시: 수집 \$0.50/GB, 압축 아카이브 \$0.03/GB-month. Datadog indexed logs 15일 \$1.70/1M logs, 30일 \$2.50/1M logs, flex storage \$0.05/1M events. CloudTrail는 최근 90일 management event history 무료. [\[24\]](https://aws.amazon.com/cloudwatch/pricing/) | `https://aws.amazon.com/cloudwatch/pricing/` / `https://www.datadoghq.com/pricing/list/` / `https://aws.amazon.com/cloudtrail/pricing/` | AWS Pricing, accessed 2026-06-30 / Datadog Pricing, accessed 2026-06-30 / AWS Pricing, accessed 2026-06-30 | 1차 | **수집보다 인덱싱/조회성 저장이 비싸다**. 감사조회 잦으면 indexed 보관기간 조정 필요. |
| 관찰성 APM/log/trace | APM host, GB ingested, indexed spans | `호스트수 × host단가 × 12 + 월 span/log GB × 단가 × 12` | 최소 APM + 로그 위주 | APM + trace 샘플링 | APM full + 장기 trace | Datadog APM \$31/APM host-month, ingest \$0.10/GB, indexed spans 7일 \$1.27/1M. New Relic는 100GB/month ingest 포함 free tier와 edition별 지원. [\[25\]](https://www.datadoghq.com/pricing/list/) | `https://www.datadoghq.com/pricing/list/` / `https://newrelic.com/pricing` | Datadog Pricing, accessed 2026-06-30 / New Relic Pricing, accessed 2026-06-30 | 1차 | 단일벤더 예시. **생산계약 총액의 핵심숫자로 단정 금지**. |
| 보안모니터링·취약점 점검 | server/month, asset/month, scan/project | `서버/워크로드 수 × 보안도구 단가 × 12 + 정기 진단 프로젝트비` | CSP 기본보안 + 반기 점검 | 월간 모니터링 + 분기 점검 | 24x7 MDR/SOC 연계 | Microsoft Defender for Servers Plan 2가 지역별 가격표에 server/month 기반으로 제시. AWS Enterprise는 Security Incident Response 포함. [\[26\]](https://azure.microsoft.com/da-dk/pricing/details/defender-for-cloud/) | `https://azure.microsoft.com/*/pricing/details/defender-for-cloud/` / `https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html` | Microsoft Pricing, accessed 2026-06-30 / AWS Support User Guide, accessed 2026-06-30 | 1차 | 정확 단가는 서비스 범위별 편차 큼 → **산식+견적 항목** 권장. |
| 백업·DR | backup GB-month, replica region, drill event | `백업 저장량 × 저장단가 + 복제/예비환경 + 분기 DR drill` | 일백업, 단일리전 restore | 일백업 + 분기 복구훈련 | 크로스리전 예비 + 정기 failover drill | 전자금융감독규정 별표는 클라우드 업무연속성 계획에 데이터 백업, 재해복구, 침해사고 대응훈련, 출구전략을 포함하도록 요구. [\[27\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) | `https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D...` | 국가법령정보센터, 2026-02 개정 반영 | 1차 | **정확 단가는 아키텍처 의존**. 다만 계약 항목에서 빠지면 안 됨. |
| 운영자 콘솔·권한관리 | active admin, role review cycle | `관리자 수 + 월간 권한검토 회수` | 월1 검토 | 월1 검토 + 분기 재인증 | 월1 검토 + 강제 재인증 + 이중승인 | 개인정보 안전성 확보조치 기준은 접속기록 월 1회 이상 점검, 다운로드 확인, 키 관리 절차를 요구. [\[28\]](https://www.law.go.kr/LSW/lawBodyComparePrint.do?leftEfYd=&leftGubun=AdmRul&leftSeq=2100000204678&rightEfYd=&rightGubun=AdmRul&rightSeq=2100000204677) | `https://www.law.go.kr/LSW/lawBodyComparePrint.do?...` | 개인정보보호위원회 고시 비교문, reflected 2021/2025 | 1차 | **권한검토·승인정책 변경관리 자체가 운영원가**. |
| 월간 운영 리포트·QBR | report/month, review/quarter | `월간 리포트 12회 + 분기 QBR 4회 + RCA 건수` | 월간 리포트 | 월간 + 분기 QBR | 월간 + 분기 QBR + 경영진 브리핑 | AWS Enterprise는 strategic business reviews, Azure ProDirect는 service reviews와 enhanced outage communications 제공. [\[29\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html) | `https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html` / `https://azure.microsoft.com/en-us/support/plans/prodirect` | AWS User Guide, accessed 2026-06-30 / Microsoft Azure, accessed 2026-06-30 | 1차 | **QBR은 단순 부가서비스가 아니라 금융권 신뢰 장치**. |
| 공급사 지원조직·온콜 | FTE-month, on-call hour, severity band | `(SM + L1 + L2 + L3 + 보안/DLP + 준법/감사대응 + 교육) FTE-month` | 12~15 FTE-month/년 \[후보\] | 24~30 FTE-month/년 \[후보\] | 36~48 FTE-month/년 \[후보\] | 공개 인건비 단가는 본 보고서에서 교차검증 불가 → **산식만 제시**. 다만 AWS/Azure/GCP 공식 지원 자체가 월 최소 \$100~\$15,000+로 별도 상품이다. [\[30\]](https://azure.microsoft.com/en-us/support/plans/standard) | `https://azure.microsoft.com/en-us/support/plans/standard` / `https://azure.microsoft.com/en-us/support/plans/prodirect` / `https://aws.amazon.com/premiumsupport/pricing/` / `https://cloud.google.com/support` | Microsoft/AWS/Google, accessed 2026-06-30 | 1차 + \[후보 범위\] | **계약가의 핵심 항목**. 공개 인건비 부재로 총액은 상업적 후보 범위로만 제안. |

### 12개월 상업적 제안 밴드

아래 금액은 **공개 단가가 있는 항목**과 **운영조직 FTE-month 산식**을 합쳐 만든 **상업적 제안 후보 범위**입니다. 즉, 사실값이 아니라 **금융사 제안서에 넣을 수 있는 운영계약 밴드**로 보시는 편이 정확합니다.

| 단계 | 권장 적용 상황 | 추천 지원모델 | 12개월 계약가 밴드 | 해석 |
|----|----|----|----|----|
| 파일럿 | 1개 본부 또는 제한된 RM 그룹, 3개 도메인 검증, 업무시간 중심 운용 | Service Manager part-time, L2/L3 pooled, 보안/준법 창구 겸임, P1 보안만 24x7 | **1.5억~2.8억 원 \[후보 범위\]** | PoC보다 한 단계 높은 “운영형 시험서비스”. 월간 리포트, 일백업, 장애등급, 모델변경 통지 포함. |
| 정식 운영 기준 | 다수 RM, 승인대기열·위험알림·감사로그를 일상적으로 사용하는 수준 | Named SM, L1 1차 접수, L2 AppOps, L3 AI/LLMOps, 보안/DLP, 준법/감사 대응, 분기 QBR | **3.0억~5.0억 원 \[후보 범위\]** | 구매자가 “운영계약”으로 인식하기 시작하는 구간. **사람·통제·온콜 비용이 모델비를 압도**하는 구조. |
| 강화 운영 | 멀티리전 DR, 더 긴 보관기간, 월말/사고대응 확장시간, 더 강한 변경통제 | 전담 운영조직 + 외부 SOC/클라우드 프리미엄 지원 + 정기 DR drill | **5.0억~8.0억 원+ \[후보 범위\]** | 감사대응과 리스크 민감도가 높은 금융계열사에서 가능한 패키지. |

이 밴드가 과장처럼 보이지 않는 이유는, **클라우드 사업자 스스로도 생산운영 지원을 최소 월 수천~수만 달러로 별도 판매**하기 때문입니다. 즉, 금융사가 사는 것은 LLM token이 아니라 **“사고 났을 때 누가 받고, 언제 복구하고, 무엇을 남기고, 어떻게 설명하는가”**입니다. JB LocalGuard OS도 그 언어로 가격을 잡아야 합니다. [\[31\]](https://aws.amazon.com/premiumsupport/pricing/)

## SLA 초안과 단계별 운영 수준

### 단계별 SLA의 원칙

PoC는 보통 “될까?”를 보는 단계이므로 **best-effort**가 가능합니다. 하지만 파일럿부터는 사용자 교육과 실제 워크플로가 붙기 때문에, 최소한 **장애등급, 초기응답시간, 백업, 변경통지, 리포트**가 필요합니다. 정식 운영에서는 여기에 **서비스시간, 측정식, 예외조항, RCA 제출기한, SLA 크레딧, 재해복구 목표, 보안 incident 통지**가 더해져야 합니다. Azure Foundry가 developer deployment에는 SLA가 없고, standard는 best-effort, provisioned는 stronger guarantees라고 구분하는 점은 이 단계 차이를 잘 보여줍니다. [\[6\]](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types)

### JB LocalGuard OS에 맞는 우선순위

JB LocalGuard OS는 승인우선 구조이므로, **업무중단 리스크는 “자동 실행 실패”가 아니라 “위험알림·사후관리 워크플로 지연”**에서 발생합니다. 따라서 SLA 우선순위는 다음 순서가 적절합니다.

첫째, **케이스 생성과 승인대기열 가용성**입니다. RM이 검토할 케이스가 안 뜨면 콘솔은 사실상 멈춘 것입니다. 둘째, **위험알림 지연**입니다. 알림이 몇 시간 늦어지면 사기·전세·소상공인 리스크 포착 가치가 크게 떨어집니다. 셋째, **감사원장과 판단근거 기록**입니다. 이 기록이 안 남으면 나중에 설명 가능성이 무너집니다. 넷째, 일반 화면 오류나 리포트 포맷 오류입니다. 이 순서는 전자금융감독규정상 중요한 원장 접근기록 5년 보존과 개인정보 접속기록 1~2년 보관, 그리고 클라우드 업무연속성 계획 의무와도 정합적입니다. [\[32\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672)

### SLA 초안 표

| 항목 | PoC | 파일럿 | 정식 운영 | 측정 방식 | 예외/면책 | 근거 |
|----|----|----|----|----|----|----|
| 서비스 정의 | 기능 검증용 시험환경 | 제한 사용자 운영형 시험서비스 | 업무사용 생산서비스 | 별첨 서비스정의서 기준 | 테스트 데이터, 임시 기능 제외 | Azure는 developer/best-effort와 stronger SLA deployment를 구분. [\[6\]](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types) |
| 월간 가용성 | 보장 없음, best-effort | **99.5% \[제안\]** | **99.9% \[제안\]** | 승인대기열·케이스조회·위험알림 API를 월 기준 집계 | 계획점검, 고객망/IDP, 외부 벤더 장애, 고객 오조작 제외 | AWS API Gateway 99.95%, Vertex AI 99.9%, Vector Search 99.9%, Azure는 SLA 정의가 좁을 수 있음을 경고. [\[33\]](https://aws.amazon.com/api-gateway/sla/) |
| 서비스시간 | 업무시간 only | 평일 09:00–18:00 KST + P1 보안 24x7 | 평일 07:00–22:00 KST + P1/보안 24x7 \[제안\] | 지원창구 운영시간 기준 | 비업무시간 일반문의 제외 | Azure/AWS/GCP는 P1/A급에 24x7, 하위는 business-hours 지원 구조. [\[34\]](https://azure.microsoft.com/en-us/support/plans/response) |
| 장애 접수 및 초동응답 P1 | best-effort | 30분 이내 \[제안\] | 15분~30분 이내 \[제안\] | 접수시각~첫 human acknowledgement | 고객 연락처 미갱신, 연속협업 미제공 시 severity 하향 가능 | Azure Sev A \<1h, GCP P1 15m, AWS Enterprise 15m. [\[35\]](https://azure.microsoft.com/en-us/support/plans/response) |
| 장애 접수 및 초동응답 P2 | best-effort | 4영업시간 이내 \[제안\] | 2영업시간 이내 \[제안\] | 동일 | 동일 | Azure Sev B \<4h/2h. [\[36\]](https://azure.microsoft.com/en-us/support/plans/response) |
| RTO | 미적용 | **8영업시간 \[후보\]** | **4시간 기준 / 1시간 강화 \[후보\]** | P1/P2 확정 후 복구시각까지 | 외부 모델/클라우드 광역장애, 고객 승인 지연 | 금융 클라우드 연속성 계획은 DR 포함을 요구하되 수치는 정하지 않음. Azure는 failover가 복잡하며 때로 데이터손실 가능성을 명시. [\[37\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) |
| RPO | 미적용 | **24시간 \[후보\]** | **4시간 기준 / 15분 강화 \[후보\]** | 마지막 복구가능 백업/복제 시점 | 비동기 복제 충돌, 고객 소스시스템 지연 | Azure AI Search는 비동기 복제이며 primary 손실 시 일부 미복제 writes 손실 가능. [\[3\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) |
| 정기점검 | 수시 | 월 1회, 사전 공지 5영업일 \[제안\] | 월 1회, 사전 공지 7영업일 \[제안\] | 공지 이력 기준 | 긴급 보안패치 제외 | 금융권 구매자 안심을 위해 계획점검 공지는 사실상 필수. Azure/AWS SLA도 planned maintenance와 exclusions를 둠. [\[38\]](https://aws.amazon.com/api-gateway/sla/) |
| 보안패치 | 수시 반영 | Critical 7일, High 30일 \[제안\] | Critical 72시간 또는 완화조치, High 14일 \[제안\] | 취약점 접수~완화/적용 시각 | 고객 변경동결 요청 시 예외 | 개인정보 고시는 악성프로그램 경보·제작사 업데이트 공지 시 즉시 업데이트를 요구. [\[28\]](https://www.law.go.kr/LSW/lawBodyComparePrint.do?leftEfYd=&leftGubun=AdmRul&leftSeq=2100000204678&rightEfYd=&rightGubun=AdmRul&rightSeq=2100000204677) |
| 데이터 백업 | 수동/제한적 | 일 1회 백업, 월1 restore test \[제안\] | 일 1회 이상, 분기 restore test, 반기 DR drill \[제안\] | 백업성공률·복구테스트 통과율 | 소스데이터 자체 미제공 영역 제외 | 클라우드 업무연속성 계획에 데이터 백업·재해복구·훈련 포함. [\[27\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) |
| 로그 보존 | 최소 | 운영로그 12개월, 감사로그 24개월 \[제안\] | 운영로그 24개월, 감사원장 관련 5년 정렬 \[제안\] | 보관수명주기 정책 기준 | 법정 보존 우선 | 중요원장 직접접근 기록 5년 보존, 접속기록 1~2년 보관. [\[39\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672) |
| 모델변경 통보 | 수시 | 사전 30일 통보 \[제안\] | 일반 변경 30일, deprecated 모델 영향 시 즉시 예고 + 전환계획 \[제안\] | 버전변경 공지일 기준 | 긴급 보안·장애 회피 변경은 사후통보 허용 | OpenAI GA 모델 deprecation notice 최소 6개월. [\[40\]](https://developers.openai.com/api/docs/deprecations) |
| RCA 제공 | 없음 | P1/P2만 5영업일 \[제안\] | P1 5영업일, P2 10영업일 \[제안\] | RCA 문서 제출 시각 | 외부 벤더 공식 PIR 대기 시 interim RCA 허용 | Azure는 PIR/retrospective와 사후 학습을 권고. [\[41\]](https://learn.microsoft.com/en-us/azure/reliability/incident-response) |
| SLA 크레딧 | 없음 | 선택적 | 적용 | 월별 미달 구간별 차등 | sole remedy, 신청기한 명시 | AWS API Gateway 10%/25%/100%, Vertex AI 10%/25%/50% 예시. [\[42\]](https://aws.amazon.com/api-gateway/sla/) |

### 적정 RTO/RPO 제안

코어뱅킹 수준의 RTO/RPO를 JB LocalGuard OS에 그대로 붙이면 과장입니다. Azure AI Search도 단일 리전 서비스이며, 멀티리전은 고객이 별도로 구성해야 하고, 비동기 복제 특성상 쓰기 손실 가능성이 존재합니다. 반대로 JB LocalGuard OS는 승인우선·내부 콘솔이므로 몇 분 단위 RPO 0을 요구하지 않아도 업무 리스크를 관리할 수 있습니다. 따라서 아래 3단계가 현실적입니다. [\[43\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search)

| 수준 | RTO | RPO | 적합한 상황 |
|----|----|----|----|
| 보수 | 8영업시간 | 24시간 | 파일럿, 업무시간 중심, 운영책임을 가볍게 시작할 때 |
| 기준 | 4시간 | 4시간 | 정식 운영의 기본선. RM 하루 업무를 멈추지 않게 하는 수준 |
| 강화 | 1시간 | 15분 | 월말/감사 집중기간, 멀티리전·예비환경 투자까지 동반할 때 |

## 지원조직 RACI와 현실적 조직안

### 최소 운영조직의 현실적 형태

**작은 스타트업 팀이 금융사 파일럿을 운영할 때 가능한 최소 구조**는 다음 정도입니다. 서비스 매니저 0.2~0.3 FTE, L2 애플리케이션 운영 0.5 FTE, L3 AI/LLMOps 0.3~0.5 FTE, 보안/DLP·준법 대응 0.2 FTE, 고객교육/CS 0.1~0.2 FTE입니다. 이 구조면 파일럿은 가능하지만, 정식 운영에는 취약합니다. 특히 단일 창업멤버가 L2·L3·고객대응·준법응답을 겸하면 **운영계약으로는 매우 약한 신호**가 됩니다. Azure와 AWS의 운영 가이드는 Incident Manager, TAM, Retrospective/RCA 역할처럼 책임을 분리하는 구조를 전제로 합니다. [\[44\]](https://learn.microsoft.com/en-us/azure/well-architected/design-guides/incident-management)

**정식 운영 전환 시 권장 구조**는 이름 있는 서비스 매니저, L1 접수창구, L2 AppOps, L3 AI/LLMOps, 보안/DLP 담당, 준법·감사 대응 창구, 교육/고객성공 담당, 그리고 P1 온콜 책임자를 분리한 구조입니다. 완전한 내재화가 어렵다면, L1 또는 SIEM/MDR을 외부 파트너로 아웃소싱하고, 공급사는 L2/L3와 변경통제·모델정책 소유권을 유지하는 모델이 가장 현실적입니다. 이는 클라우드 사업자들도 Premium/Enterprise Support와 named TAM, Security Incident Response를 별도 결제형 조직으로 제공하는 것과 같은 논리입니다. [\[45\]](https://cloud.google.com/support)

### 월간 운영 작업의 실체

운영조직이 해야 할 일은 “장애가 나면 받는다”가 아닙니다. 매월 반복되는 일은 **모델/프롬프트 버전 관리, 비용 모니터링, 로그 샘플링, 접속권한 검토, 승인정책 변경관리, 릴리즈 노트, 사용자 교육, 보안패치, 월간 운영 리포트, RCA 관리**입니다. 개인정보 안전성 확보조치 기준이 접속기록을 월 1회 이상 점검하고, 다운로드가 발견되면 사유를 확인하라고 요구하는 점은, 이런 월간 작업이 계약 원가로 남는다는 직접 근거입니다. [\[28\]](https://www.law.go.kr/LSW/lawBodyComparePrint.do?leftEfYd=&leftGubun=AdmRul&leftSeq=2100000204678&rightEfYd=&rightGubun=AdmRul&rightSeq=2100000204677)

### 지원조직 RACI 표

| 업무 | GoLab/공급사 | JB IT | JB 현업 RM | JB 준법/보안 | 외부 클라우드/LLM 벤더 | 산출물 |
|----|----|----|----|----|----|----|
| 서비스 운영 계획 수립 | **R/A** | C | I | C | I | 연간 운영계획, 달력 |
| 사용자/권한 온보딩 | R | **A** | C | C | I | 계정승인 기록 |
| 케이스 생성·알림 흐름 모니터링 | **R** | C | I | I | I | 일일 헬스 리포트 |
| 모델·프롬프트 버전 관리 | **R** | C | C | **A** for 정책성 변경 | C | 버전대장, 변경승인서 |
| 승인정책 변경 관리 | R | C | C | **A** | I | 정책변경 요청서, 승인로그 |
| 비용 모니터링 및 예산 경보 | **R** | C | I | I | C | 월간 비용 리포트 |
| 접속기록·로그 샘플링 점검 | **R** | C | I | **A** | I | 월간 로그점검표 |
| 보안패치/취약점 조치 | **R** | C | I | **A** | C | 패치적용 보고서 |
| 장애 1차 접수 및 분류 | **R** | C | I | I | C | 티켓, severity 판정 |
| 외부 LLM/클라우드 장애 에스컬레이션 | R | I | I | I | **A/R** | 벤더 case, 상태업데이트 |
| RCA 작성 | **R** | C | I | C | C | RCA 보고서 |
| 감사/점검 대응 | **R** | C | I | **A** | C | 점검응답서, 증빙 패키지 |
| 사용자 교육/전환관리 | **R** | C | **A** for 참여/확산 | I | I | 교육자료, 참석기록 |
| 월간 운영회의/QBR | **R** | C | C | C | I | 운영리포트, 액션아이템 |
| 종료/반출/삭제 절차 | **R** | **A** | I | **A** for 통제 승인 | C | 종료확인서, 데이터 인계서 |

설명하면, **운영 책임(R)**은 공급사가 가져가되, **계정·인프라 연동·내부 승인(A)**은 JB IT와 준법/보안이 가져가는 구조가 바람직합니다. RM은 입력과 승인, 현업적 유효성 검증에 책임을 갖고, 외부 클라우드/LLM 벤더는 인프라 가용성과 업스트림 incident에 대한 책임을 집니다. 이 구조가 금융사 입장에서 납득되는 이유는, 국내 규정이 위탁자에게 감독 의무를, 수탁자에게 범위 준수와 재위탁 통제 의무를 동시에 요구하기 때문입니다. [\[46\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print)

## 장애 등급과 복구 플레이북

### 금융 AI 콘솔에 맞는 장애 등급

일반 SaaS처럼 “전체 다운 vs 부분 다운”만으로는 부족합니다. JB LocalGuard OS에는 **보안/PII 의심 이벤트**와 **감사원장 쓰기 실패**를 별도 최고 등급으로 둬야 합니다. 이유는 두 가지입니다. 첫째, 개인정보 침해는 통지의무와 법적 리스크를 동반합니다. 둘째, 중요한 원장·감사기록이 유실되면 장애보다 더 심각한 **설명가능성 상실**이 생깁니다. [\[47\]](https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP)

또한 외부 모델 장애는 “우리 책임 아님”으로 넘기면 안 됩니다. Azure와 Google은 광역 장애 시 비즈니스 연속성을 우선하라고 하고, OpenAI는 model deprecation notice를 최소 6개월 두고, enterprise agreement에서는 priority/scale tier SLA credit 구조를 둡니다. 따라서 고객에게 필요한 것은 **업스트림 문제가 생겼을 때 어떤 대체모델로 우회하는지, 누구에게 언제 알리는지, 승인정책을 누가 잠그는지**입니다. [\[48\]](https://learn.microsoft.com/en-us/azure/reliability/incident-response)

### 장애 등급·복구 플레이북

| 등급 | 예시 | 초동응답 | 고객통보 | 우회/복구 | RCA | SLA 영향 |
|----|----|----|----|----|----|----|
| **S0 보안·준법 최고등급** | PII 비반출 위반 의심, 로그 마스킹 실패, 토큰화 키 노출 의심, 감사원장 쓰기 실패 | 15분 이내 24x7 \[제안\] | 즉시 내부 보안/준법 연락, 1시간 내 1차 상황공유 \[제안\] | 관련 기능 차단, 승인정책 락다운, 로그보존 보호, 외부 전송 중지 | 5영업일 이내 중간보고 + 최종 RCA \[제안\] | 일반 uptime과 별도. 중대 인시던트 조항 적용. 근거: 72시간 통지 및 원장 접근기록 5년 보존. [\[49\]](https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP) |
| **P1 전체 서비스 중단** | 케이스 조회/생성이 전면 불가, 승인대기열 접근 불가, 로그인 불가 | 15~30분 이내 | 30분 이내 초기공유, 1시간 간격 업데이트 \[제안\] | read-only fallback, 수동 엑셀/배치 우회, 예비환경 전환 | 5영업일 | 가용성/응답 SLA 직접 차감. AWS/GCP/Azure 고심각도 응답시간 참고. [\[34\]](https://azure.microsoft.com/en-us/support/plans/response) |
| **P2 도메인/케이스 처리 장애** | 소상공인만 분석 실패, 전세 도메인 지연, 특정 케이스 생성 실패 | 2시간 이내 \[제안\] | 4시간 이내 영향범위 공유 \[제안\] | 도메인 우회, 재처리 큐, 수동 승인대상 등록 | 10영업일 | 파일럿/운영 SLA에 포함 |
| **P3 성능 저하·부분 오류** | 응답지연, 일부 리스크 스코어 누락, 외부 모델 timeout 증가 | 4영업시간 이내 \[제안\] | 일일/수시 보고 | smaller model fallback, timeout 조정, queue backpressure | 필요시 경량 RCA | 성능 SLO 위반 시 반영 |
| **P4 화면·리포트 오류** | 관리자 화면 표시 오류, PDF 포맷 깨짐, 비핵심 리포트 수치 정렬 오류 | 다음 영업일 \[제안\] | 필요시 주간공지 | 핫픽스 또는 차기 릴리즈 | 일반적으로 없음 | SLA 직접 차감 제외 |
| **U1 업스트림 벤더 이벤트** | 외부 LLM 장애, 모델 지연 급증, 배포 중단, 가격 급등, deprecation 공지 | 30분 이내 내부 판정 \[제안\] | 확인 즉시 고객 통지, 대체경로·영향범위 포함 \[제안\] | 대체모델 전환, 규칙기반 축소모드, 승인정책 보수화 | 벤더 PIR 수신 후 보완 RCA | 벤더 면책이 있더라도 **공급사 커뮤니케이션 의무는 유지**. [\[50\]](https://developers.openai.com/api/docs/deprecations) |

### 외부 모델 장애와 모델 변경 통보 절차

외부 LLM에 대해서는 다음 절차가 적절합니다.

일반 장애 시에는 **상태 확인 → 영향범위 분리 → 대체모델/대체경로 전환 → 고객 공지 → 사후 검증** 순서가 맞습니다. 가격 급등이나 deprecation은 운영이슈이므로, **모델 공급사 공지일로부터 영업일 기준 5일 내 영향평가 메모**를 고객에게 보내고, **30일 이내 전환계획**을 공유하는 조항이 바람직합니다. OpenAI는 일반 제공 모델에 최소 6개월 notice를 두고, priority processing은 enterprise agreement 기반 SLA credit을 둡니다. Azure Foundry는 provisioned가 강한 SLA와 낮은 latency variance를, standard는 best-effort를 명시하므로, 생산계 고객에게는 “standard only” 운영을 피하는 것이 설득력이 큽니다. [\[51\]](https://developers.openai.com/api/docs/deprecations)

**프롬프트/정책 변경 승인**은 더 엄격해야 합니다. 누가 승인해야 하는지, 언제 통보하는지, 어떤 로그를 남길지 계약서에 적어야 합니다. 추천 절차는 이렇습니다.\
공급사는 변경요청서를 작성하고, 변경 유형을 **기능 / 성능 / 보안 / 준법**으로 분류합니다. 성능개선 수준이면 공급사 SM과 JB IT 승인으로 충분할 수 있지만, **정책·PII·승인로직 관련 변경은 JB 준법/보안 공동승인**이 필요합니다. 적용 전에는 테스트 결과와 롤백 계획을 첨부하고, 적용 후에는 변경 ID, 승인자, 적용시각, 영향범위, 롤백 여부를 감사로그에 남겨야 합니다. 이 구조는 국내 위탁통제·로그보관 의무와 맞물려야 안정적입니다. [\[52\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print)

## 근거표

아래 표는 보고서의 핵심 주장별로 **URL, 짧은 원문 인용, 발행처·날짜, 신뢰도**를 모아 둔 것입니다. URL은 시스템 제약상 코드 형태로 표기했습니다.

| 주장 | 출처 URL | 발행처·날짜 | 신뢰도 | 원문 인용 |
|----|----|----|----|----|
| 금융분야 클라우드 이용가이드는 2025 개정이 전자금융감독규정 제14조의2를 반영 | `https://www.fsec.or.kr/bbs/detail?bbsNo=11691&menuNo=222` | 금융보안원, 2025-05-22 | 1차 | “제14조의2에 따라… 세부절차를 안내” |
| 클라우드 업무연속성 계획에는 백업·재해복구·침해사고 대응훈련·출구전략이 포함 | `https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D...` | 국가법령정보센터, 2026 시행 반영 | 1차 | “데이터 백업, 재해복구 및 침해 사고대응 훈련계획, 출구전략” |
| 중요원장 접근 작업기록은 5년 보존 | `https://www.law.go.kr/admRulSc.do?menuId=5&query=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95...` | 국가법령정보센터, 2026-02-13 시행 | 1차 | “작업자 및 작업내용 등을 기록하여 5년간 보존” |
| 인터넷 접속내용은 1년 이상 기록·보관 | `https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000274812&chrClsCd=010201` | 국가법령정보센터, 2026-02-13 시행 | 1차 | “접속내용을 1년 이상 별도로 기록ㆍ보관” |
| 개인정보 접속기록은 1년, 특정 경우 2년 보관 및 월 1회 점검 | `https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201` | 개인정보보호위원회 고시, 2025-10-31 | 1차 | “1년 이상… 다만… 2년 이상”, “월 1회 이상 점검” |
| 암호키 생성·이용·보관·배포·파기 절차가 필요 | `https://www.law.go.kr/LSW/lawBodyComparePrint.do?...` | 개인정보 고시 비교문, reflected 2021/2025 | 1차 | “암호 키 생성, 이용, 보관, 배포 및 파기” |
| 업무위탁 시 위탁자는 수탁자를 교육하고 감독해야 함 | `https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print` | 개인정보 보호법 제26조 | 1차 | “수탁자를 교육하고… 안전하게 처리하는지를 감독” |
| 재위탁은 위탁자 동의 필요 | `https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print` | 개인정보 보호법 제26조 | 1차 | “다시 위탁하려는 경우에는 위탁자의 동의를” |
| 표준 위탁계약서는 실태점검·시정요구 조항을 둠 | `https://www.law.go.kr/LSW/flDownload.do?flSeq=96663885` | 국가법령정보센터 표준계약서 | 1차 | “실태를 점검하여 시정을 요구할 수” |
| 특정 개인정보 침해사고는 72시간 이내 통지 | `https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP` | 개인정보 보호법 시행령, 2025-03-13 | 1차 | “72시간 이내에… 알려야 한다” |
| AWS API Gateway SLA는 99.95%, 크레딧은 10/25/100% | `https://aws.amazon.com/api-gateway/sla/` | AWS, 2022-05-05 | 1차 | “at least 99.95%”, “10%…25%…100%” |
| Vertex AI SLA는 주요 서비스 99.9% | `https://cloud.google.com/vertex-ai/sla` | Google Cloud, accessed 2026-06-30 | 1차 | “Training, Deployment… \>= 99.9%” |
| Vector Search SLA는 2개 이상 replicas일 때 99.9% | `https://cloud.google.com/terms/vector-search/sla` | Google Cloud, 2026-04-22 | 1차 | “index deployed with 2 or more replicas… 99.9%” |
| Azure AI Search 생산권고는 read-only 2 replicas, read-write 3+ replicas | `https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search` | Microsoft Learn, 2026-01-22 | 1차 | “two replicas… three or more replicas” |
| Azure Standard 지원은 월 100달러, Sev A \<1h | `https://azure.microsoft.com/en-us/support/plans/standard` | Microsoft Azure, accessed 2026-06-30 | 1차 | “\$100/month”, “\< 1 hours” |
| Azure ProDirect는 월 1,000달러, pooled account management | `https://azure.microsoft.com/en-us/support/plans/prodirect` | Microsoft Azure, accessed 2026-06-30 | 1차 | “\$1,000/month”, “Pooled team… account management” |
| AWS Enterprise Support는 TAM, 15분 응답, 월 5,000달러 최소 | `https://aws.amazon.com/premiumsupport/pricing/` | AWS, accessed 2026-06-30 | 1차 | “\$5k/month”, “15 minute production-critical” |
| GCP Premium Support는 P1 15분, named TAM, 월 15,000달러 최소 | `https://cloud.google.com/support` / `https://docs.cloud.google.com/support/docs/premium` | Google Cloud, accessed 2026-06-30 | 1차 | “15 minutes”, “named Technical Account Manager”, “Minimum spend of \$15,000.00” |
| OpenAI 일반 제공 모델 deprecation notice는 최소 6개월 | `https://developers.openai.com/api/docs/deprecations` | OpenAI Developers, accessed 2026-06-30 | 1차 | “Generally available models: At least 6 months” |
| OpenAI Priority processing은 enterprise SLA credit 적용 | `https://openai.com/api-priority-processing/` | OpenAI, accessed 2026-06-30 | 1차 | “service credits will be offered” |
| OpenAI 토큰 가격 예시 | `https://developers.openai.com/api/docs/pricing` | OpenAI Developers, accessed 2026-06-30 | 1차 | “gpt-5.5 \$5.00…\$30.00” |
| OpenAI embedding 가격 예시 | `https://developers.openai.com/api/docs/models/text-embedding-3-large` | OpenAI Developers, accessed 2026-06-30 | 1차 | “text-embedding-3-small \$0.02” |
| Anthropic 토큰 가격 예시 | `https://www.anthropic.com/pricing` | Anthropic, accessed 2026-06-30 | 1차 | “Sonnet 4.6… \$3 / MTok… \$15 / MTok” |
| Google Sensitive Data Protection은 \$0.03/GB profiled | `https://cloud.google.com/sensitive-data-protection/pricing` | Google Cloud, accessed 2026-06-30 | 1차 | “charges US\$0.03 per GB” |
| AWS CloudWatch example은 data protection scan \$0.12/GB, archive \$0.03/GB-month | `https://aws.amazon.com/cloudwatch/pricing/` | AWS, accessed 2026-06-30 | 1차 | “\$0.12 per GB”, “\$0.03 \* 1 GB” |
| Datadog는 APM host·logs·sensitive scanner를 별도 과금 | `https://www.datadoghq.com/pricing/list/` | Datadog, accessed 2026-06-30 | 1차 | “Per APM host… \$31”, “Sensitive Data Scanner… Per scanned GB” |
| CloudTrail은 90일 event history 무료 | `https://aws.amazon.com/cloudtrail/pricing/` | AWS, accessed 2026-06-30 | 1차 | “most recent 90-day history… at no additional cost” |
| Azure는 99.9% SLA가 항상 연 8.7시간 이하 장애를 의미하지 않는다고 설명 | `https://learn.microsoft.com/ko-kr/azure/reliability/concept-service-level-agreements` | Microsoft Learn, 2026-04-01 | 1차 | “항상 사용할 수 있도록 보장하지 않습니다” |

## 제품 적용 시사점과 갭

### JB LocalGuard OS 제안서에 넣을 운영 문장

아래 문장들은 **“좋은 데모”가 아니라 “운영 가능한 서비스 계약”**처럼 보이게 만드는 데 초점을 맞춘 문구입니다.

1.  **“본 서비스는 PII 비반출 원칙을 유지하되, 접속기록·승인기록·감사원장을 별도 보관하고 고객의 점검 요청 시 증빙을 제공한다.”** [\[53\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201)
2.  **“PoC 환경과 운영 환경은 구분하며, 파일럿부터 장애등급·초동응답·백업·변경통지·월간 리포트를 포함한 운영 SLA를 적용한다.”** [\[6\]](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types)
3.  **“운영 환경의 검색/색인 계층은 생산 SLA를 충족하기 위해 최소 복제수와 이중화를 적용하며, 해당 비용은 운영 환경 단가에 반영한다.”** [\[3\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search)
4.  **“서비스 핵심 SLA는 케이스 생성, 위험알림, 승인대기열, 감사원장 기록을 대상으로 측정하며, 대고객 자동실행은 계약 범위에서 제외한다.”**
5.  **“공급사는 서비스 매니저, L2 운영 담당, L3 AI/LLMOps 담당, 보안/준법 연락책임자를 지정하고, P1/보안 인시던트에 대해 24x7 비상연락체계를 유지한다.”** [\[34\]](https://azure.microsoft.com/en-us/support/plans/response)
6.  **“외부 모델의 장애·폐기·deprecation·성능 저하·가격 변동 발생 시 공급사는 고객에게 영향평가와 대체경로를 통지한다.”** [\[11\]](https://developers.openai.com/api/docs/deprecations)
7.  **“정책·프롬프트·모델 변경은 변경요청서, 승인자, 적용시각, 영향범위, 롤백계획을 포함한 변경통제 절차에 따라 수행한다.”** [\[54\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print)
8.  **“고객은 수탁자의 운영·보안·개인정보 처리 현황에 대해 정기 또는 수시 점검을 실시할 수 있으며, 재위탁은 고객의 사전 서면승인을 요한다.”** [\[46\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print)
9.  **“공급사는 월간 운영 리포트와 분기 QBR을 통해 가용성, 비용, 장애, 변경, 보안 이벤트, 교육 실적을 보고한다.”** [\[29\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html)
10. **“계약 종료 시 공급사는 데이터 반출, 로그 인계, 백업 파기, 키 폐기, 계정 회수 및 종료확인서를 포함한 종료 절차를 제공한다.”** [\[27\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967)
11. **“본 서비스 요금은 라이선스가 아니라 운영형 서비스요금으로서, 외부 모델/API, 로그·감사보관, DLP, 백업·DR, 관찰성, 보안모니터링, 온콜, 정기 리포팅 비용을 포함한다.”** [\[55\]](https://aws.amazon.com/premiumsupport/pricing/)
12. **“PII 반출 의심 또는 감사원장 기록 실패는 최고 심각도 인시던트로 취급하며, 즉시 기능 차단과 상황공유 절차를 개시한다.”** [\[49\]](https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP) \|

### 구매자가 보는 실패 신호

반대로 아래 신호가 보이면 구매자는 “좋은 데모지만 운영계약으로는 부족하다”고 판단하기 쉽습니다.

첫째, **SLA가 가용성 숫자 하나만 있고 측정식·예외·크레딧·변경통지가 없을 때**입니다. AWS와 Google의 공식 SLA는 항상 크레딧, 정의, 예외를 함께 둡니다. [\[42\]](https://aws.amazon.com/api-gateway/sla/)\
둘째, **온콜이 없거나 단일 담당자 의존**입니다. 클라우드 벤더조차 P1 대응과 named 역할에 돈을 받습니다. [\[56\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html)\
셋째, **로그 보관비·DLP 스캔비·감사조회 비용이 빠져 있을 때**입니다. 국내 규정상 이 영역은 선택이 아닙니다. [\[4\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201)\
넷째, **외부 API/모델 장애 대책과 deprecation 통보 절차가 없을 때**입니다. [\[11\]](https://developers.openai.com/api/docs/deprecations)\
다섯째, **종료/반출/삭제 절차가 없는 계약**입니다. 금융 클라우드 업무연속성 계획은 출구전략을 포함해야 합니다. [\[27\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967)

### 갭과 \[미검증\]

이 보고서에는 일부러 비워 둔 부분이 있습니다. 숨기지 않는 편이 더 신뢰를 줍니다.

**공개 가격 부재 구간이 있습니다.** Azure AI Search의 세부 티어 가격, API Gateway의 옵션별 단가, 보안점검 프로젝트성 비용, 외부 SOC/MDR 가격, 한국형 관리서비스 인건비는 공개 단가가 일관되지 않거나 지역/옵션 의존성이 큽니다. 그래서 본 보고서는 그 구간을 **정액 사실값이 아니라 산식과 후보 범위**로만 제시했습니다. 이 부분은 실제 제안 직전 **사용량 가정서 + 벤더 견적서 + 파트너 운영단가표**로 메우는 것이 맞습니다.

**국내 금융 AI SaaS의 공개 SLA 사례는 아직 부족합니다.** 그래서 국내 규제·보관·위탁통제는 1차 자료로, SLA 수치와 지원등급은 글로벌 클라우드/AI 공식 문서를 보조 근거로 사용했습니다. 이는 합리적이지만, **한국 금융 적용 시 고객사의 내부 기준**에 맞춘 조정이 필요합니다. 특히 영업시간, 월말 확장운영, 감사 시즌 대응체계는 각 금융사 차이가 큽니다. [\[57\]](https://www.fsec.or.kr/bbs/detail?bbsNo=11691&menuNo=222)

**인력비 총액은 공개 교차검증이 어렵습니다.** 그래서 FTE-month 구조와 상업적 밴드만 제안했습니다. 이 밴드는 “공급사 원가”가 아니라 **금융권 구매자가 납득할 만한 계약 포맷의 가격대**입니다. 제안서 제출 전에는 내부적으로 `(필요 FTE-month × 내부 loaded rate)`를 곱해 검증해야 합니다.

**보관기간의 법정선과 내부통제선은 다릅니다.** 법적으로 분명한 것은 중요원장 직접접근 5년, 개인정보 접속기록 1~2년입니다. 하지만 운영로그, 모델 판단근거, 승인사유 로그를 몇 년 보관할지는 고객 내부감사 정책의 영향을 크게 받습니다. 따라서 제안서에는 **“법정 최소 + 고객정책 옵션”** 구조로 제시하는 것이 안전합니다. [\[39\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672)

최종적으로, 이 리서치가 제안하는 상업적 메시지는 한 줄로 정리됩니다. **JB LocalGuard OS의 계약가는 모델비가 아니라 운영책임비여야 하며, 구매자는 기능보다도 ‘누가, 언제, 어떤 증빙으로 책임지는가’를 산다.** 그 기준으로 보면, 파일럿은 1억 원대 후반~2억 원대, 정식 운영은 3억~5억 원대, 강화 운영은 그 이상이 **과장이 아니라 운영가능성에 대한 가격 언어**입니다. 이 문장을 받쳐 주는 근거는 이미 공식 문서 안에 있습니다. [\[58\]](https://aws.amazon.com/premiumsupport/pricing/)

------------------------------------------------------------------------

[\[1\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) [\[13\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) [\[27\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) [\[37\]](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967) https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967

<https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+2%EC%9D%983%5D+%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%BB%B4%ED%93%A8%ED%8C%85%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%9D%B4%EC%9A%A9%EA%B3%BC+%EA%B4%80%EB%A0%A8%ED%95%9C+%EC%97%85%EB%AC%B4+%EC%97%B0%EC%86%8D%EC%84%B1+%EA%B3%84%ED%9A%8D%28%EC%A0%9C14%EC%A1%B0%EC%9D%982+%EA%B4%80%EB%A0%A8%29&flSeq=161734967>

[\[2\]](https://developers.openai.com/api/docs/pricing) [\[17\]](https://developers.openai.com/api/docs/pricing) [\[18\]](https://developers.openai.com/api/docs/pricing) https://developers.openai.com/api/docs/pricing

<https://developers.openai.com/api/docs/pricing>

[\[3\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) [\[7\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) [\[16\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) [\[21\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) [\[43\]](https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search) https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search

<https://learn.microsoft.com/en-us/azure/reliability/reliability-ai-search>

[\[4\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201) [\[15\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201) [\[53\]](https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201) https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201

<https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000265956&chrClsCd=010201>

[\[5\]](https://aws.amazon.com/api-gateway/sla/) [\[22\]](https://aws.amazon.com/api-gateway/sla/) [\[33\]](https://aws.amazon.com/api-gateway/sla/) [\[38\]](https://aws.amazon.com/api-gateway/sla/) [\[42\]](https://aws.amazon.com/api-gateway/sla/) https://aws.amazon.com/api-gateway/sla/

<https://aws.amazon.com/api-gateway/sla/>

[\[6\]](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types) https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types

<https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types>

[\[8\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html) [\[29\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html) [\[56\]](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html) https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html

<https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html>

[\[9\]](https://learn.microsoft.com/en-us/azure/well-architected/design-guides/incident-management) [\[44\]](https://learn.microsoft.com/en-us/azure/well-architected/design-guides/incident-management) https://learn.microsoft.com/en-us/azure/well-architected/design-guides/incident-management

<https://learn.microsoft.com/en-us/azure/well-architected/design-guides/incident-management>

[\[10\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672) [\[32\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672) [\[39\]](https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672) https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672

<https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000174672>

[\[11\]](https://developers.openai.com/api/docs/deprecations) [\[40\]](https://developers.openai.com/api/docs/deprecations) [\[50\]](https://developers.openai.com/api/docs/deprecations) [\[51\]](https://developers.openai.com/api/docs/deprecations) https://developers.openai.com/api/docs/deprecations

<https://developers.openai.com/api/docs/deprecations>

[\[12\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print) [\[46\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print) [\[52\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print) [\[54\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print) https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print

<https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print>

[\[14\]](https://aws.amazon.com/premiumsupport/pricing/) [\[31\]](https://aws.amazon.com/premiumsupport/pricing/) [\[55\]](https://aws.amazon.com/premiumsupport/pricing/) [\[58\]](https://aws.amazon.com/premiumsupport/pricing/) https://aws.amazon.com/premiumsupport/pricing/

<https://aws.amazon.com/premiumsupport/pricing/>

[\[19\]](https://developers.openai.com/api/docs/models/text-embedding-3-large) https://developers.openai.com/api/docs/models/text-embedding-3-large

<https://developers.openai.com/api/docs/models/text-embedding-3-large>

[\[20\]](https://azure.microsoft.com/en-us/pricing/details/document-intelligence/) https://azure.microsoft.com/en-us/pricing/details/document-intelligence/

<https://azure.microsoft.com/en-us/pricing/details/document-intelligence/>

[\[23\]](https://cloud.google.com/sensitive-data-protection/pricing) https://cloud.google.com/sensitive-data-protection/pricing

<https://cloud.google.com/sensitive-data-protection/pricing>

[\[24\]](https://aws.amazon.com/cloudwatch/pricing/) https://aws.amazon.com/cloudwatch/pricing/

<https://aws.amazon.com/cloudwatch/pricing/>

[\[25\]](https://www.datadoghq.com/pricing/list/) https://www.datadoghq.com/pricing/list/

<https://www.datadoghq.com/pricing/list/>

[\[26\]](https://azure.microsoft.com/da-dk/pricing/details/defender-for-cloud/) https://azure.microsoft.com/da-dk/pricing/details/defender-for-cloud/

<https://azure.microsoft.com/da-dk/pricing/details/defender-for-cloud/>

[\[28\]](https://www.law.go.kr/LSW/lawBodyComparePrint.do?leftEfYd=&leftGubun=AdmRul&leftSeq=2100000204678&rightEfYd=&rightGubun=AdmRul&rightSeq=2100000204677) https://www.law.go.kr/LSW/lawBodyComparePrint.do?leftEfYd=&leftGubun=AdmRul&leftSeq=2100000204678&rightEfYd=&rightGubun=AdmRul&rightSeq=2100000204677

<https://www.law.go.kr/LSW/lawBodyComparePrint.do?leftEfYd=&leftGubun=AdmRul&leftSeq=2100000204678&rightEfYd=&rightGubun=AdmRul&rightSeq=2100000204677>

[\[30\]](https://azure.microsoft.com/en-us/support/plans/standard) https://azure.microsoft.com/en-us/support/plans/standard

<https://azure.microsoft.com/en-us/support/plans/standard>

[\[34\]](https://azure.microsoft.com/en-us/support/plans/response) [\[35\]](https://azure.microsoft.com/en-us/support/plans/response) [\[36\]](https://azure.microsoft.com/en-us/support/plans/response) https://azure.microsoft.com/en-us/support/plans/response

<https://azure.microsoft.com/en-us/support/plans/response>

[\[41\]](https://learn.microsoft.com/en-us/azure/reliability/incident-response) [\[48\]](https://learn.microsoft.com/en-us/azure/reliability/incident-response) https://learn.microsoft.com/en-us/azure/reliability/incident-response

<https://learn.microsoft.com/en-us/azure/reliability/incident-response>

[\[45\]](https://cloud.google.com/support) https://cloud.google.com/support

<https://cloud.google.com/support>

[\[47\]](https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP) [\[49\]](https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP) https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP

<https://www.law.go.kr/LSW//lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250313&joNo=003900&lsiSeq=269291&urlMode=lsInfoP>

[\[57\]](https://www.fsec.or.kr/bbs/detail?bbsNo=11691&menuNo=222) https://www.fsec.or.kr/bbs/detail?bbsNo=11691&menuNo=222

<https://www.fsec.or.kr/bbs/detail?bbsNo=11691&menuNo=222>
