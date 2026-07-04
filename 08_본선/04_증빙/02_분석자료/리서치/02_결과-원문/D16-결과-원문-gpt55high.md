---
tags:
  - area/strategy
  - type/reference
  - status/active
date: 2026-06-30
up: "[[_운영-회수현황]]"
---
> 📄 **요약 먼저** → [[D16-요약]] · 상세가 필요할 때만 아래 원문을 본다.

> 원본 파일: `D16. gpt 5.5 high. 20260630_한국_은행권_RM_업무량·생산성·원가_베이스라인.docx`
> 회수 2026-06-30 · ⚠️ 대외비 · **사용 모델: GPT-5.5 high (Deep Research)**
> 수식·도표는 원문 이미지 → `_media/`에 추출(Obsidian 인라인).

---

# 한국 은행권 RM 업무량·생산성·원가 베이스라인

## 핵심 발견

이번 리서치에서 공개 근거로 가장 단단하게 확보된 것은 **RM의 업무 범위**, **은행권 인건비 수준**, **대출·사후관리에서 사람이 반드시 남아 있어야 하는 통제 지점**, **문서 진위확인·사후기록 보관·이상거래 모니터링 때문에 발생하는 반복 검토 업무**입니다. 반면 **한국 은행 RM 1인당 월별 처리 케이스 수**와 **업무 단계별 직접 시간실측**은 공개 자료가 매우 부족해, 일부는 인접 근거를 결합해 재구성해야 했습니다. 따라서 아래 값은 “구매자 앞에서 방어 가능한 공개값”과 “내부 가정으로만 써야 하는 재구성값”을 분리해 제시합니다. [\[1\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009)

핵심적으로, 한국 은행 RM의 공개 업무 범위는 단순 영업이 아니라 **상담·서류수집·신용평가 입력·대출 의사결정 연결·사후관리·리스크 대응**까지 포괄합니다. 우리은행은 “체계적이고 전문적인 교육을 받은 800여명의 RM”을 공개하고 있고, KB는 RM을 “여신지원 결정, 정보제공, 경영상담”을 수행하는 기업금융 전문가로 설명합니다. 하나은행도 RM이 “업체의 여신한도 결정 및 심사기능”을 보유한다고 명시합니다. 즉, JB LocalGuard OS가 겨냥하는 영역은 RM의 주변 업무가 아니라 **RM 핵심 업무의 반복 행정·검토 층**입니다. 신뢰도는 **높음**입니다. [\[2\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009)

업무 단계별 시간은 직접 측정 공개가 적지만, 적어도 **만기연장 같은 비교적 단순한 여신 처리도 케이스당 30분 이상** 걸렸다는 국내 은행 자동화 사례가 확인됩니다. 동시에 IBK기업은행은 RPA로 **일 평균 3,000건의 영업점 여신 서류 관련 업무**를 대체했다고 밝혔고, NH농협은행은 **가계여신 자동기한연기**를 포함한 7개 프로세스에 대규모 RPA를 운영했습니다. 따라서 “증빙 대조·입력·품의 초안·이력기록”이 상당한 반복 부하라는 점은 방어 가능하지만, 각 단계의 평균시간은 상당 부분 \[추정\]이 필요합니다. 신뢰도는 **중간**입니다. [\[3\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13)

인건비는 비교적 견고합니다. 2025년 은행연합회 경영현황 공개 보고서 기준으로 우리은행 임직원 1인당 평균 근로소득은 **1억 1,859만원**, NH농협은행은 **1.17억원**, 전북은행은 **9,619만원**입니다. 한국의 금융·보험업 월평균 총근로시간은 2025년 **165.4시간**으로 공표되어 있어, 연 환산 약 **1,985시간**을 기준으로 직접 시급을 잡을 수 있습니다. 여기에 비생산시간과 간접비를 반영하면 RM의 실무 생산시간 기준 시간당 원가는 대략 **6.8만~12.9만원 \[추정\]** 범위가 합리적입니다. 신뢰도는 **중간~높음**입니다. [\[4\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a)

handoff와 재작업은 공개되는 순간 대부분 **사고·감사·제재** 형태로 드러납니다. 금감원은 2024년 여신 프로세스 개선에서 **발급기관 진위확인**, **공적장부 확인**, **제3자 현장조사**, **임대료 입금내역 징구**를 강화하도록 했고, 2026년 신한은행 사례에서는 여신 사후관리 내역을 **통합단말시스템에 기록하고 근거를 보관**해야 하는데 그 절차가 미흡했다고 적시됐습니다. 즉 재작업의 본질은 단순히 “한 번 더 읽는다”가 아니라, **근거 누락·입력 누락·확인근거 미보관·본부 질의 대응**입니다. 신뢰도는 **중간**입니다. [\[5\]](https://www.yna.co.kr/view/AKR20241216070100002)

AI 적용 가능 시간은 넓지만, **완전 자동화**로 말하면 안 됩니다. 금융위 AI 가이드라인은 신용평가·여신심사에서 **미리 지정된 승인책임자**의 활용 승인과 **사람에 의한 통제가능성**을 요구했고, 생성형 AI 정책 자료도 **“최종 의사결정과 그에 따른 책임은 임직원이 수행”**한다고 명시합니다. 따라서 JB LocalGuard OS의 ROI는 “자동 승인”이 아니라 **초안 작성·근거 정리·누락 탐지·handoff 감축·감사추적 강화**로 잡는 것이 맞습니다. 신뢰도는 **높음**입니다. [\[6\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=)

## 근거표

출처 열의 인용은 클릭 가능한 원문 링크입니다.

| 주장 | 수치/범위 | 출처 | 발행처·날짜 | 신뢰도 | 원문 인용 | 비고 |
|----|---:|----|----|----|----|----|
| 우리은행은 중소기업 전담 RM 규모를 공개함 | RM 800여명 | [\[7\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009) | 우리은행 RM서비스소개, 확인일 2026-06-30 | 1차 | “체계적이고 전문적인 교육을 받은 800여명의 RM들이 중소기업을 위해 활동합니다.” | 한국 은행권에서 드문 직접 RM 인력 공개 |
| KB는 RM 업무를 여신지원 결정·정보제공·경영상담으로 정의 | 정성 근거 | [\[8\]](https://obiz.kbstar.com/quics?page=C017116) | KB국민은행 RM제도안내, 확인일 2026-06-30 | 1차 | “RM은 기업고객에 대한 여신지원 결정, 정보제공, 경영상담…” | RM 업무 포트폴리오 정의 |
| 하나은행은 RM이 여신한도 결정·심사 기능을 보유한다고 명시 | 정성 근거 | [\[9\]](https://biz.hanabank.com/cont/support/support05/support052/support0521/support05212/index.jsp) | 하나은행 RM 안내, 확인일 2026-06-30 | 1차 | “업체의 여신한도 결정 및 심사기능을 보유” | 승인·심사 연계 업무 확인 |
| 기업대출 절차는 상담→신용평가→등급결정→대출 의사결정→실행 | 정성 근거 | [\[10\]](https://obiz.kbstar.com/quics?page=C016276) | KB국민은행 신청절차/필요서류, 확인일 2026-06-30 | 1차 | “대출상담 및 신청… 신용평가… 대출 의사결정… 대출 실행” | handoff 지점 구조 확인 |
| 기업·개인사업자 대출은 서류 종류가 많음 | 기본서류 + 추가서류 다수 | [\[10\]](https://obiz.kbstar.com/quics?page=C016276) | KB국민은행 신청절차/필요서류, 확인일 2026-06-30 | 1차 | “상업등기부등본… 사업자등록증… 세금계산서…” | 서류대조/보완 workload 근거 |
| 기업 운전자금은 1년 이내 만기 상품이 일반적 | 1년 이내, 일부 최대 3년 | [\[11\]](https://obiz.kbstar.com/quics?QSL=F&cc=b035196%3Ab035393&page=C016280&prcode=LN25001273&%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%83%81%ED%92%88%EC%BD%94%EB%93%9C=LN25001273) | KB국민은행 상품안내, 확인일 2026-06-30 | 1차 | “운전자금 일시상환방식 (1년이내…)” | 만기연장 수요 재구성의 핵심 근거 |
| 개인사업자 운전자금은 1년 이내+최장 5년 연장 가능 상품이 존재 | 1년 이내, 최장 5년 연장 가능 | [\[12\]](https://spot.wooribank.com/pot/Dream?PRD_CD=P020000023&PRD_YN=Y&cc=c010528%3Ac010531%3Bc012425%3Ac012399&withyou=POLON0063) | 우리은행 상품안내, 확인일 2026-06-30 | 1차 | “운전자금… 1년 이내(최장 5년까지 기간연장 가능)” | 재약정·만기관리 반복성 근거 |
| 개인사업자대출 용도외 유용 사후점검 기준 | 건당 1억원 초과 또는 동일인당 5억원 초과, 주택 취득 담보는 전수점검 | [\[13\]](https://eiec.kdi.re.kr/policy/materialView.do?num=178989) | 금융감독원·금융위원회, 2018-07-23 / 2018-10-22 | 1차 | “건당 1억원… 동일인당 5억원… 금액에 관계 없이 전수 점검” | 사후관리 case 발생 조건 |
| 금감원은 여신 프로세스 개선에서 진위확인과 제3자 조사 강화를 요구 | 정성 근거 | [\[14\]](https://www.yna.co.kr/view/AKR20241216070100002) | 금감원 워크숍 보도내용, 2024-12-16~17 | 2차 | “발급기관 등을 통해 진위확인 절차를 강화”, “제3자 현장조사를 의무화” | handoff·재작업 원인 근거 |
| 신한은행 제재 사례는 사후관리 기록·근거 보관 의무를 적시 | 정성 근거 | [\[15\]](https://www.newswatch.kr/news/articleView.html?idxno=76328) | 금감원 제재 보도, 2026-01-12 | 2차 | “사후관리 내역을 통합단말시스템에 기록하고 관련 사후관리 근거를 보관” | 감사원장/증적 보관의 필요성 |
| 자영업자 차주 수 | 2025년 2분기 307.8만명 | [\[16\]](https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=acc988043be34ef4a115c394d1b8a88b&fileSn=1) | 한국은행 금융안정 자료, 2026-03 인용 | 1차 | “자영업자 차주 수는… 2025년 2/4분기말(307.8만명)” | 시장 전체 workload 모수 |
| 자영업자 대출 규모 | 2024년 1분기 1,055.9조원 | [\[17\]](https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=cee44c2a702d4cd2974f9797c86858dc&fileSn=3) | 한국은행 금융안정 상황, 2024 | 1차 | “자영업자대출… 1,055.9조원(개인사업자대출 702.7조원…)” | 사후관리 시장 규모 |
| 2025년말 개인사업자 차주 수 | 321.1만명 | [\[18\]](https://marketin.edaily.co.kr/News/ReadE?newsId=03217686645477456) | 한국은행 인용 보도, 2026-06-01 | 2차 | “2025년 말 개인사업자 차주 수는 총 321만1000명” | BOK 수치 재인용 |
| 자영업자 연체율 | 2025년말 1.86% | [\[19\]](https://marketin.edaily.co.kr/News/ReadE?newsId=03824486645387256) | 한국은행 인용 보도, 2026-03-26 | 2차 | “자영업자 대출 연체율은 2025년 말 기준 1.86%” | 연체관리·EWS workload 근거 |
| 이상금융거래 대응 강화 지시 | 정성 근거 | [\[20\]](https://fsc.go.kr/no010101/84446?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=sj&srchText=) | 금융위원회, 2025-04-29 | 1차 | “이상금융거래 모니터링 강화 등을 취하도록 유의사항을 전파” | 이상거래 case의 상시성 근거 |
| 보이스피싱 정보공유 AI 플랫폼 성과 | 5개월간 26.6만건 정보 공유, 약 419억원 차단 | [\[21\]](https://www.fsc.go.kr/po010101/86991?curPage=6&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) | 금융위원회, 2026-06-29 | 1차 | “26만 6천여건의 정보 공유… 약 419억원… 선제적으로 차단” | 이상거래 탐지 이벤트 규모 |
| 금융위 AI 가이드라인은 여신심사에 승인책임자와 사람 통제를 요구 | 정성 근거 | [\[22\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=) | 금융위원회, 2021-07-08 | 1차 | “미리 지정된 승인책임자… 사람에 의한 통제가능성 확보” | 승인우선 설계 정합성 |
| 생성형 AI 활용 원칙은 최종 의사결정 책임을 임직원에게 둠 | 정성 근거 | [\[23\]](https://www.korea.kr/common/docViewer.do?fileId=197983652&tblKey=GMN) | 정부 정책자료, 2024 | 1차 | “최종 의사결정과 그에 따른 책임은 임직원이 수행” | 완전 자동화 금지 근거 |
| 우리은행 평균 근로소득 | 1억 1,859만원 | [\[24\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a) | 전국은행연합회 경영현황 공개 보고서, 2025 | 1차 | “1인당 평균 근로소득은 1억 1,859만 원” | 시간당 원가 산출 입력값 |
| NH농협은행 평균 근로소득 | 1.17억원 | [\[25\]](https://m.kfb.or.kr/include/download.php?enc_para=wPibobgSfc2vx2XiqHLAI1xXRVgUF8GYulwVNIjuFk1aqDYl3uZfCf%2AU) | 전국은행연합회 경영현황 공개 보고서, 2025 | 1차 | “1인당 평균 근로소득은 1.17억원” | 시간당 원가 산출 입력값 |
| 전북은행 평균 근로소득 | 9,619만원 | [\[26\]](https://m.kfb.or.kr/include/download.php?enc_para=zf6bobgSfc2vx2XiqHLAI%2ADU3SPrRez5Y%2FtzuSJh0WsLvxqEpQ5DxEne) | 전국은행연합회 경영현황 공개 보고서, 2025 | 1차 | “임직원 1인 평균 근로소득은 9,619만원” | 지방은행 하단값 역할 |
| 금융·보험업 월 총근로시간 | 165.4시간 | [\[27\]](https://stathtml.moel.go.kr/statHtml/statHtml.do?orgId=118&tblId=DT_118N_MON051) | 고용노동부 통계, 2025-12 기준 표 | 1차 | “금융 및 보험업… 165.4” | 연 환산 약 1,985시간 |
| 금융·보험업 월 임금총액 | 805.1만원 또는 996.4만원 수준 | [\[28\]](https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000198487) | KDI 요약 / e-나라지표, 2025 | 2차/1차 혼합 | “월평균 임금총액… 805.1만원”, “금융 및 보험업(9,964천원)” | 은행 전체보다 보수적 하한 지표 |
| 은행 여신의 상당 부분은 지점 전결 | 약 60% | [\[29\]](https://news.bizwatch.co.kr/article/finance/2024/08/14/0036) | 비즈워치, 2024-08-16 | 2차 | “주요 은행에서 취급… 여신 중 60% 가량이 지점 전결” | 나머지 40%는 handoff 가능성 시사 |
| 대출기한연장 업무의 단일 건 처리시간 사례 | 1건 30분 이상 | [\[30\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13) | 디지털데일리 기사 스니펫, 2023-06-27 | 2차 \[단일출처\] | “1건 처리에 30분 이상 걸리던 대출기한연장업무” | 만기연장 baseline anchor |
| IBK RPA 적용 여신서류 업무 규모 | 일평균 3,000건, 연 10억원 비용절감 | [\[31\]](https://ceoscoredaily.com/page/view/2019102216095268429) | CEO스코어데일리, 2019-10-23 | 2차 | “일 평균 3000건의 영업점 여신 서류 관련 업무… 연간 10억 원의 비용 절감” | 문서반복 workload 근거 |
| NH농협은행 RPA 적용 범위 | 7개 프로세스, 40대 로봇, 24시간 운영 | [\[32\]](https://www.ddaily.co.kr/news/article/?no=185677) | 디지털데일리, 2019-09-11 | 2차 | “가계여신 자동기한연기… 7개 프로세스… 운영 로봇수는 40대” | 만기연장 자동화 가능성 보조 |
| 신한은행 RPA 적용 업무 | 스크래핑 제출서류 정상입력 여부·필수 확인 작업 | [\[33\]](https://www.sdgnews.net/news/articleView.html?idxno=21177) | SDG뉴스, 2017-08-16 | 2차 | “소득 및 재직서류 내용의 정상 입력 여부와 심사 과정의 필수 확인 작업” | 증빙대조 자동화 보조 |

## 공개 근거로 재구성한 베이스라인

한국 공개자료만으로 “RM 1인당 월간 신규여신 몇 건”을 바로 찍는 숫자는 거의 없습니다. 대신 공개된 직무 설명과 프로세스, 대출 만기 구조, 사후점검 의무, 이상거래 대응, 여신 서류 자동화 사례를 결합하면 **RM의 케이스 포트폴리오**는 꽤 선명하게 보입니다. 즉 RM은 고객상담만 하는 인력이 아니라, **상담 → 서류징구/대조 → 신용평가 입력 → 품의·전결/심사 handoff → 실행 후 사후관리 → EWS/연체/이상거래 대응 → 기록보관**으로 이어지는 전 과정을 끌고 갑니다. [\[34\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009)

이 구조를 기준으로 보면 RM workload는 다섯 층으로 나뉩니다. 첫째, **단순 조회·상담**입니다. 정책자금 적합 여부, 대출가능성, 금리·한도, 필요서류, 만기 연장 가능 여부 설명이 여기에 들어갑니다. 둘째, **서류 보완·증빙 대조**입니다. 사업자등록, 재무·세무 자료, 계약서, 세금계산서, 부동산·임대차 관련 자료, KYC 자료, 스크래핑 자료 정상입력 여부 확인이 포함됩니다. 셋째, **품의 필요 케이스**입니다. 신규여신, 만기연장, 조건변경, 한도 증액, 예외 취급이 대표적입니다. 넷째, **본부·심사부 handoff 케이스**입니다. 금액, 등급, 담보, 예외 여부에 따라 branch-only가 끝나지 않는 케이스입니다. 다섯째, **준법·리스크 검토 필요 케이스**입니다. 자금용도외 유용 점검, 사후관리 기록, 이상거래·보이스피싱 의심, 연체징후, 취약담보 확인 같은 영역입니다. [\[35\]](https://obiz.kbstar.com/quics?page=C016276)

직접 케이스 수가 공개되지 않는 항목은 다음 식으로 재구성하는 것이 가장 방어적입니다.\
**\[추정\] 연간 만기연장 케이스/인 = 활성 운전자금 거래처 수 × 1년 만기 상품 비중 × 실제 연장·재약정 비중**.\
기업·개인사업자 운전자금 대출이 “1년 이내, 최장 5년까지 기간연장 가능” 구조를 많이 취한다는 점은 공개돼 있으므로, **활성 포트폴리오만 확인되면** 만기관리 수요를 손쉽게 역산할 수 있습니다. 다만 현재 공개자료로는 은행별 RM 1인당 활성 운전자금 거래처 수가 부족하므로, 이 항은 구매자 앞 공개숫자라기보다 **파일럿/인터뷰로 바로 메워야 할 내부 가정식**입니다. [\[36\]](https://obiz.kbstar.com/quics?QSL=F&cc=b035196%3Ab035393&page=C016280&prcode=LN25001273&%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%83%81%ED%92%88%EC%BD%94%EB%93%9C=LN25001273)

사후관리 케이스는 공개 규정이 더 뚜렷합니다. 개인사업자대출은 건당 1억원 초과, 동일인당 5억원 초과, 또는 주택 취득 담보 제공 시 점검 대상이 되며, 금감원은 여신사고 이후 발급기관 진위확인, 공적장부 확인, 제3자 현장조사, 임대료 입금내역 징구를 강화하도록 했습니다. 즉 RM에게 남는 일은 단순히 “대출을 내주고 끝”이 아니라, **정책상 반드시 남는 포스트딜 검토**입니다. JB LocalGuard OS가 효율을 내는 곳도 바로 이 **증빙 추적·누락 탐지·기록 적재** 구간입니다. [\[37\]](https://eiec.kdi.re.kr/policy/materialView.do?num=178989)

## RM baseline 표

아래 표의 **빈도**와 상당수 **소요시간**은 한국 RM 직접 실측 공개자료가 부족하여 \[추정\]을 포함합니다. 반면 **업무 구조**, **필수 단계**, **사람 승인 필요 여부**는 공개 근거가 강합니다. 특히 “구매자 앞에서 말해도 되는 수준”은 **시간 범위의 하단값**과 **사람 승인 필요 단계**까지로 보고, 월별 케이스 수는 가급적 **내부 가정**으로 취급하는 것이 안전합니다. [\[38\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009)

| 업무/케이스 | 빈도(월/연) | 평균 소요시간 | 변동폭 | handoff 여부 | 자동화 가능 부분 | 사람 승인/판단 필수 부분 | 근거강도 |
|----|---:|---:|----|----|----|----|----|
| 신규여신 상담 | \[추정\] 4~12건/월 | \[추정\] 45~120분 | 업종, 담보, 정책자금 매칭 여부에 따라 큼 | 조건부 | 상담 전 자료 요약, 기존 거래이력 정리, 필요서류 체크리스트, 콜메모 초안 | 한도/조건 제시, 예외 판단, 대면 설명 | 중간 [\[39\]](https://obiz.kbstar.com/quics?page=C017116) |
| 품의서 작성 | \[추정\] 8~30건/월 | \[추정\] 30~90분 | 신규/증액/예외일수록 증가 | 예 | 초안 작성, 재무·세무·매출 근거 정리, 근거 링크화 | 최종 의견, 승인권자 결재 | 중간 [\[40\]](https://obiz.kbstar.com/quics?page=C016276) |
| 만기연장 | \[추정\] 3~15건/월 | **30분 이상** 하단 확인, 실무상 \[추정\] 30~60분 | 금리·상환조건 변경 여부에 따라 증가 | 자주 발생 | 서류 재징구 체크, 만기조건 비교, 안내문 초안 | 연장 승인, 조건변경 판단 | 중간 [\[41\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13) |
| 서류대조/KYC | \[추정\] 20~80건/월 | \[추정\] 20~60분 | 서류 누락·불일치·수기 자료 많을수록 증가 | 잦음 | OCR·파서 기반 대조, 누락 탐지, 형식 오류 검출 | 실질 동일성 판단, 의심서류 escalatation | 중간 [\[42\]](https://obiz.kbstar.com/quics?page=C016276) |
| 사후관리 모니터링 | \[추정\] 10~40건/월 | \[추정\] 20~60분 | 정기점검 vs 현장점검 차이 큼 | 조건부 | 이상징후 요약, 문서 증적 정리, 점검기록 초안 | 신용위험 해석, 추가조치 여부 결정 | 중간 [\[43\]](https://www.newswatch.kr/news/articleView.html?idxno=76328) |
| EWS 대응 | \[추정\] 1~8건/월 | \[추정\] 30~120분 | false positive, 고객연락 난이도 영향 큼 | 예 | 이벤트 묶음 요약, 근거패킷 생성, prior case 비교 | 실제 위험 판단, 계정조치·고객통지 판단 | 낮음~중간 [\[44\]](https://fsc.go.kr/no010101/84446?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=sj&srchText=) |
| 자금용도외 유용 점검 | \[추정\] 2~10건/월 | \[추정\] 30~90분 | 금액·담보·임대업 여부에 따라 증가 | 예 | 대상 자동선별, 공적장부/입금내역 대조, 체크리스트 | 용도외 유용 해석, 제재·회수·추가확인 결정 | 중간 [\[45\]](https://eiec.kdi.re.kr/policy/materialView.do?num=178989) |
| 연체관리 | \[추정\] 1~6건/월 | \[추정\] 30~120분 | 차주 상황·담보·회수전략 따라 큼 | 예 | 연체이력 요약, 약정조건 비교, 통화기록 초안 | 채무조정·회수·유예 판단 | 낮음~중간 [\[46\]](https://marketin.edaily.co.kr/News/ReadE?newsId=03824486645387256) |
| 고객 커뮤니케이션 기록 | \[추정\] 40~120건/월 | \[추정\] 5~15분 | 상담 밀도·사후관리 빈도 영향 | 거의 없음 | 콜메모·안내문·이메일 초안, 증빙 링크 첨부 | 대외 발송 승인, 민감표현 확인 | 중간 [\[47\]](https://www.ibk.co.kr/) |

### 시간이 비교적 명확한 하단값

공개 자료로 바로 잡을 수 있는 하단값은 많지 않지만, 적어도 **대출기한연장 1건이 30분 이상**이라는 사례는 있습니다. 이를 기준으로 보면 신규여신 풀패키지, 정책금융 매칭, 예외 품의, 사후점검은 그보다 짧게 잡기 어렵습니다. 다만 이 수치는 단일출처 2차 자료이므로, 구매자 앞에서는 **“단순 만기연장도 30분+ 사례가 있었다”** 수준으로만 쓰고, 신규여신 전체 평균시간으로 일반화하지 않는 편이 안전합니다. [\[30\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13)

### AI가 줄일 수 있는 시간과 사람이 반드시 남는 시간

JB LocalGuard OS가 줄일 수 있는 시간은 **문서 수집·정리, 입력 보조, 증빙 대조, 품의 초안, 사후점검 체크리스트, EWS evidence packet, 고객 안내문·콜메모 초안**입니다. 반대로 사람이 반드시 남아야 하는 시간은 **최종 승인, 예외판단, 고객 설명, 지급정지/거래제한 같은 대고객 조치, 부정·용도외 유용 여부의 최종 해석**입니다. 이는 2021년 금융위 AI 가이드라인의 “승인책임자”와 “사람에 의한 통제가능성” 요구, 그리고 생성형 AI 정책자료의 “최종 의사결정은 임직원” 원칙과 정합적입니다. [\[6\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=)

## 원가·ROI 산식

### 시간당 원가 산식

시간당 원가는 다음 식으로 잡는 것이 가장 방어적입니다.

**시간당 원가 \[추정\] = 연간 총보상 × 간접비 배율 ÷ 연간 실업무 가능시간**

여기서 연간 총보상은 은행연합회 경영현황 공개 보고서의 **임직원 1인당 평균 근로소득**을 사용했고, 연간 총근로시간은 고용노동부의 금융·보험업 **월 165.4시간**을 연 환산한 약 **1,985시간**을 사용했습니다. 간접비 배율과 실업무 가능시간은 공개 실측이 부족하므로 \[추정\]입니다. [\[4\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a)

| 시나리오 | 연간 총보상 | 간접비 배율 \[추정\] | 연간 실업무 가능시간 \[추정\] | 시간당 원가 |
|----|---:|---:|---:|---:|
| 보수 | 9,619만원 | 1.20배 | 1,700시간 | **6.8만원** |
| 기준 | 1억 1,500만원 | 1.35배 | 1,550시간 | **10.0만원** |
| 공격 | 1억 2,000만원 | 1.50배 | 1,400시간 | **12.9만원** |

이 중 **연간 총보상**은 구매자 앞에서 바로 써도 되는 수준이고, **간접비 배율·실업무 가능시간**은 회사 내부 노동배분 데이터를 알기 전까지는 **내부 가정**으로만 두는 것이 맞습니다. [\[4\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a)

### 케이스당 절감시간 산식

케이스당 절감시간은 다음처럼 분해해야 과대평가를 피할 수 있습니다.

**케이스당 절감시간 \[추정\] = (초안작성 절감 + 증빙대조 절감 + 누락탐지 절감 + 기록작성 절감 + handoff 재작업 절감) × 사람검토 상수**

사람검토 상수는, AI 출력물을 사람이 검토·수정·승인해야 한다는 점을 반영한 계수입니다. 승인우선 설계일수록 이 계수는 1보다 작아집니다. 금융위 AI 원칙상 최종 합의·승인 단계는 삭제할 수 없으므로, 절감시간을 **전 업무시간**이 아니라 **반복 행정·검토 시간의 일부**로 잡아야 합니다. [\[6\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=)

### 연간 절감 가능 원가 산식

**연간 절감 가능 원가 = RM 수 × 케이스/인 × 케이스당 절감시간 × 시간당 원가 × 실현율**

여기서 “실현율”은 실제 현장 adoption, 승인 체계, 케이스 적합도, 예외 비중, 기존 시스템 연계 품질을 반영하는 계수입니다. 자동 발송·자동 승인 없는 승인우선 모델에서는 보수적으로 잡는 편이 맞습니다. [\[6\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=)

### 보수·기준·공격 시나리오

아래의 **케이스/인**과 **절감시간/케이스**, **실현율**은 공개 실측 부족으로 \[추정\]이며, 특히 케이스/인은 **내부 가정 전용** 성격이 강합니다.

| 변수 | 보수 | 기준 | 공격 | 구매자 앞에서 말해도 되는 수준 | 근거강도 | 민감도 |
|----|---:|---:|---:|----|----|----|
| RM 수 | 실제 조직 수 | 실제 조직 수 | 실제 조직 수 | 예 | 높음 | 중간 |
| 케이스/인/년 \[추정\] | 180 | 360 | 600 | **아니오**. 파일럿/인터뷰로 교정 권장 | 낮음 | **매우 높음** |
| 케이스당 절감시간 \[추정\] | 10분 | 20분 | 30분 | 부분적으로만 예. 구조화 업무 subtask 기준으로만 | 낮음~중간 | **매우 높음** |
| 시간당 원가 \[추정\] | 6.8만원 | 10.0만원 | 12.9만원 | 총보상은 예, 배율·가동시간은 아니오 | 중간~높음 | 중간 |
| 실현율 \[추정\] | 35% | 55% | 70% | 아니오 | 낮음 | **높음** |

이 가정으로 계산한 연간 절감 가능 원가는 아래와 같습니다.

| 시나리오 | RM 1인당 연간 절감 |       RM 10명 |        RM 50명 |       RM 100명 |
|----------|-------------------:|--------------:|---------------:|---------------:|
| 보수     |             71만원 |       711만원 |      3,558만원 |      7,115만원 |
| 기준     |            661만원 |     6,611만원 |  3억 3,053만원 |  6억 6,106만원 |
| 공격     |          2,700만원 | 2억 7,000만원 | 13억 4,996만원 | 26억 9,991만원 |

### 현재 반복 행정·검토에 쓰는 비용의 베이스라인

절감액만 보면 작아 보일 수 있어, 현재 비용 분모를 같이 보는 편이 좋습니다. 아래는 RM 1명이 **반복 행정·검토**에 쓰는 현재 비용을 단순 계산한 값입니다.

- **보수**: 180케이스 × 35분 × 6.8만원/시간 = **약 711만원/년 \[추정\]**
- **기준**: 360케이스 × 45분 × 10.0만원/시간 = **약 2,704만원/년 \[추정\]**
- **공격**: 600케이스 × 60분 × 12.9만원/시간 = **약 7,714만원/년 \[추정\]**

이 수치는 “RM 전체 연봉”이 아니라, 그중에서 **반복 문서·검토·기록·handoff 재작업에 묶인 비용**만 떼어낸 분모입니다. 구매자 앞에서는 보수·기준만 쓰고, 공격 시나리오는 내부 시뮬레이션에 두는 편이 안전합니다. 관련 구조 근거는 여신 서류 대량 처리, 만기연장 30분+ 사례, 문서진위확인 강화, 사후기록 보관 의무입니다. [\[48\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13)

### 민감도 상위 변수와 취약 변수

민감도 상위 3개 변수는 **케이스/인**, **케이스당 절감시간**, **실현율**입니다. 셋 다 공개 RM 실측 부족으로 흔들리기 쉽습니다. 반면 **시간당 원가**는 공개 보수 자료가 있어 상대적으로 안정적입니다. 구매자 질문에 가장 취약한 변수는 **케이스/인**과 **handoff 후 재작업 시간**입니다. 이 둘은 한국 은행 RM 공개 실측 자료가 거의 없어, 내부 인터뷰·파일럿 없이 숫자를 단정하면 방어력이 급격히 떨어집니다. [\[49\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a)

## 제품 적용 시사점

JB LocalGuard OS의 **RM 보좌 에이전트**는 신규여신 상담 전 준비, 거래 이력 요약, 증빙 체크리스트 작성, 콜메모 초안 같은 시간을 줄일 수 있습니다. 공개 프로세스에서 상담-평가-승인-실행 사이에 필요한 서류와 단계가 길기 때문에, RM이 직접 “찾아보고 복붙하고 정리하는 시간”은 충분히 존재합니다. 다만 조건 제시와 고객 커뮤니케이션의 최종 책임은 사람에게 남아야 합니다. [\[50\]](https://obiz.kbstar.com/quics?page=C016276)

**정책금융 매칭 에이전트**는 고객 상태와 제출 자료를 기반으로 적합한 프로그램 후보를 좁히고, 누락 서류와 자격 충족 여부를 정리하는 데 유효합니다. 이 영역은 공식 프로세스상 제출서류와 조건확인이 많고, 만기·연장·채무조정 프로그램도 상품별로 분기되기 때문에, 사람이 최종 선택하되 기계가 후보군과 근거를 좁히는 방식이 가장 안전합니다. 소상공인 119Plus와 같은 프로그램은 창구 상담이 필수로 붙는 성격이어서, “자동 실행”이 아니라 **상담 보조**로 정의해야 합니다. [\[51\]](https://www.fsc.go.kr/no010101/84508?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=)

**준법 검토 에이전트**는 가장 ROI 설명이 쉽습니다. 금감원이 문서 진위확인, 공적장부 확인, 제3자 현장조사, 임대료 입금내역 징구를 강조했고, 사후관리 기록과 근거 보관 미흡이 제재 사유가 된 만큼, AI가 잘하는 것은 **누락방지**와 **근거 패키징**입니다. 즉 “위험 여부를 AI가 결정”하는 것이 아니라, **위험판단에 필요한 증빙을 빠짐없이 정리**하는 것입니다. [\[5\]](https://www.yna.co.kr/view/AKR20241216070100002)

**승인 게이트**와 **감사 원장**은 LocalGuard OS의 핵심 방어선입니다. 금융위 AI 원칙은 여신심사에서 지정된 승인책임자와 사람 통제를 요구하고, 정부 자료도 최종 의사결정 책임이 임직원에게 있음을 분명히 합니다. 또한 사후관리 내역의 시스템 기록과 근거 보관은 금감원 제재 포인트였습니다. 따라서 “Case → AgentRun → Evidence → Approval → Audit” 흐름은 단순 UX가 아니라, **감사·내부통제·사람 책임 구조를 만족시키는 ROI 전제조건**입니다. [\[52\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=)

## 갭과 미검증

이번 리서치의 가장 큰 갭은 **한국 은행 RM 1인당 월별 실측 케이스 수**와 **업무 단계별 stop-watch 시간 자료**가 거의 공개되지 않는다는 점입니다. 그래서 신규여신 상담 수, 품의 작성 수, EWS 대응 수, handoff 후 재작업 분(min) 같은 변수는 다수 \[추정\]입니다. 이 값들은 보고서의 방향성과 범위 설정에는 유용하지만, **계약 직전 ROI 계산서**에 넣으려면 반드시 현장 측정이 필요합니다.

특히 아래 항목은 아직 **\[미검증\] 또는 내부가정 전용**으로 두는 것이 좋습니다.

| 항목 | 현재 판단 | 왜 취약한가 |
|----|----|----|
| RM 1인당 연간 eligible case 수 | \[추정\] | 공개 RM 실측 부재 |
| handoff 대기시간 | \[미검증\] | 한국 은행권 공개 대기시간 없음 |
| handoff 후 재작업 분 | \[추정\] | 사고·감사 자료는 원인만 말하고 시간은 거의 없음 |
| EWS 월간 hit 수/false positive | \[미검증\] | 대외 공개 거의 없음 |
| 실현율 | \[추정\] | 시스템 연계·조직문화·승인정책에 따라 크게 달라짐 |

파일럿 또는 인터뷰에서 가장 먼저 재야 할 항목은 다음 체크리스트입니다.

| 측정 항목 | 권장 측정 방식 | ROI에 직접 연결되는 변수 |
|----|----|----|
| RM별 활성 관리 차주 수 | 최근 12개월 active borrower 집계 | 케이스/인 |
| 케이스 유형별 월 건수 | 신규·연장·조건변경·사후관리·EWS·연체 분리 | 케이스/인 |
| 단계별 touch time | 준비·서류대조·입력·품의·기록·재작업 stopwatch | 케이스당 절감시간 |
| 누락서류 재요청률 | 접수→보완요청→재접수 추적 | 재작업 시간 |
| 심사/handoff 비율 | 지점종결 vs 본부/심사부 이관 비율 | handoff 절감 |
| handoff 대기시간 | 신청시각~재회신시각 로그화 | 리드타임 개선 |
| 사후관리 기록 누락률 | 샘플 감사 | 감사·준법 ROI |
| EWS hit 후 실제 action 비율 | alert→인간검토→조치 전환율 | Agent 적합률 |
| RM 실업무 가능시간 | 결재·회의·교육·영업·행정 분해 | 시간당 원가 |
| AI 초안 채택률 | 초안 수정률·버림률 측정 | 실현율 |

최종적으로, **구매자 앞에서 바로 말해도 되는 숫자**는 은행권 인건비, 금융·보험업 근로시간, 1년 만기 운전자금 구조, 용도외 유용 점검 기준, AI 최종책임의 인간 귀속, 문서 진위확인·근거보관 의무 같은 값입니다. 반면 **RM 1인당 월 케이스 수**, **케이스당 절감분**, **조직별 실현율**은 아직 공개근거가 약해, 이번 보고서에서는 정직하게 \[추정\] 또는 \[미검증\]으로 남겨두는 것이 맞습니다. ROI 분모를 강하게 만들려면, 이 마지막 3개만 단기 파일럿으로 보강하면 됩니다. [\[53\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a)

------------------------------------------------------------------------

[\[1\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009) [\[2\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009) [\[7\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009) [\[34\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009) [\[38\]](https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009) https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009

<https://sbiz.wooribank.com/biz/Dream?withyou=CSSUS0009>

[\[3\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13) [\[30\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13) [\[41\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13) [\[48\]](https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13) https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13

<https://www.bondental.co.kr/g4/bbs/board.php?bo_table=ad&page=539&sfl=&sod=asc&sop=and&sst=wr_hit&stx=&wr_id=13>

[\[4\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a) [\[24\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a) [\[49\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a) [\[53\]](https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a) https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a

<https://m.kfb.or.kr/include/download.php?enc_para=wPKbobgSfc2vx2XiqHLAI6vR25KZdvkJF5%2FnpS1E3R6WyE0JoOs%2AQg9a>

[\[5\]](https://www.yna.co.kr/view/AKR20241216070100002) [\[14\]](https://www.yna.co.kr/view/AKR20241216070100002) https://www.yna.co.kr/view/AKR20241216070100002

<https://www.yna.co.kr/view/AKR20241216070100002>

[\[6\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=) [\[22\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=) [\[52\]](https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=) https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=

<https://www.fsc.go.kr/no010101/76206?curPage=208&srchBeginDt=&srchCtgry=&srchEndDt=%2F1000&srchKey=&srchText=>

[\[8\]](https://obiz.kbstar.com/quics?page=C017116) [\[39\]](https://obiz.kbstar.com/quics?page=C017116) https://obiz.kbstar.com/quics?page=C017116

<https://obiz.kbstar.com/quics?page=C017116>

[\[9\]](https://biz.hanabank.com/cont/support/support05/support052/support0521/support05212/index.jsp) https://biz.hanabank.com/cont/support/support05/support052/support0521/support05212/index.jsp

<https://biz.hanabank.com/cont/support/support05/support052/support0521/support05212/index.jsp>

[\[10\]](https://obiz.kbstar.com/quics?page=C016276) [\[35\]](https://obiz.kbstar.com/quics?page=C016276) [\[40\]](https://obiz.kbstar.com/quics?page=C016276) [\[42\]](https://obiz.kbstar.com/quics?page=C016276) [\[50\]](https://obiz.kbstar.com/quics?page=C016276) https://obiz.kbstar.com/quics?page=C016276

<https://obiz.kbstar.com/quics?page=C016276>

[\[11\]](https://obiz.kbstar.com/quics?QSL=F&cc=b035196%3Ab035393&page=C016280&prcode=LN25001273&%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%83%81%ED%92%88%EC%BD%94%EB%93%9C=LN25001273) [\[36\]](https://obiz.kbstar.com/quics?QSL=F&cc=b035196%3Ab035393&page=C016280&prcode=LN25001273&%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%83%81%ED%92%88%EC%BD%94%EB%93%9C=LN25001273) https://obiz.kbstar.com/quics?QSL=F&cc=b035196%3Ab035393&page=C016280&prcode=LN25001273&%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%83%81%ED%92%88%EC%BD%94%EB%93%9C=LN25001273

<https://obiz.kbstar.com/quics?QSL=F&cc=b035196%3Ab035393&page=C016280&prcode=LN25001273&%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%83%81%ED%92%88%EC%BD%94%EB%93%9C=LN25001273>

[\[12\]](https://spot.wooribank.com/pot/Dream?PRD_CD=P020000023&PRD_YN=Y&cc=c010528%3Ac010531%3Bc012425%3Ac012399&withyou=POLON0063) https://spot.wooribank.com/pot/Dream?PRD_CD=P020000023&PRD_YN=Y&cc=c010528%3Ac010531%3Bc012425%3Ac012399&withyou=POLON0063

<https://spot.wooribank.com/pot/Dream?PRD_CD=P020000023&PRD_YN=Y&cc=c010528%3Ac010531%3Bc012425%3Ac012399&withyou=POLON0063>

[\[13\]](https://eiec.kdi.re.kr/policy/materialView.do?num=178989) [\[37\]](https://eiec.kdi.re.kr/policy/materialView.do?num=178989) [\[45\]](https://eiec.kdi.re.kr/policy/materialView.do?num=178989) https://eiec.kdi.re.kr/policy/materialView.do?num=178989

<https://eiec.kdi.re.kr/policy/materialView.do?num=178989>

[\[15\]](https://www.newswatch.kr/news/articleView.html?idxno=76328) [\[43\]](https://www.newswatch.kr/news/articleView.html?idxno=76328) https://www.newswatch.kr/news/articleView.html?idxno=76328

<https://www.newswatch.kr/news/articleView.html?idxno=76328>

[\[16\]](https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=acc988043be34ef4a115c394d1b8a88b&fileSn=1) https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=acc988043be34ef4a115c394d1b8a88b&fileSn=1

<https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=acc988043be34ef4a115c394d1b8a88b&fileSn=1>

[\[17\]](https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=cee44c2a702d4cd2974f9797c86858dc&fileSn=3) https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=cee44c2a702d4cd2974f9797c86858dc&fileSn=3

<https://www.bok.or.kr/portal/cmmn/file/fileDown.do?atchFileId=cee44c2a702d4cd2974f9797c86858dc&fileSn=3>

[\[18\]](https://marketin.edaily.co.kr/News/ReadE?newsId=03217686645477456) https://marketin.edaily.co.kr/News/ReadE?newsId=03217686645477456

<https://marketin.edaily.co.kr/News/ReadE?newsId=03217686645477456>

[\[19\]](https://marketin.edaily.co.kr/News/ReadE?newsId=03824486645387256) [\[46\]](https://marketin.edaily.co.kr/News/ReadE?newsId=03824486645387256) https://marketin.edaily.co.kr/News/ReadE?newsId=03824486645387256

<https://marketin.edaily.co.kr/News/ReadE?newsId=03824486645387256>

[\[20\]](https://fsc.go.kr/no010101/84446?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=sj&srchText=) [\[44\]](https://fsc.go.kr/no010101/84446?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=sj&srchText=) https://fsc.go.kr/no010101/84446?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=sj&srchText=

<https://fsc.go.kr/no010101/84446?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=sj&srchText=>

[\[21\]](https://www.fsc.go.kr/po010101/86991?curPage=6&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) https://www.fsc.go.kr/po010101/86991?curPage=6&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=

<https://www.fsc.go.kr/po010101/86991?curPage=6&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=>

[\[23\]](https://www.korea.kr/common/docViewer.do?fileId=197983652&tblKey=GMN) https://www.korea.kr/common/docViewer.do?fileId=197983652&tblKey=GMN

<https://www.korea.kr/common/docViewer.do?fileId=197983652&tblKey=GMN>

[\[25\]](https://m.kfb.or.kr/include/download.php?enc_para=wPibobgSfc2vx2XiqHLAI1xXRVgUF8GYulwVNIjuFk1aqDYl3uZfCf%2AU) https://m.kfb.or.kr/include/download.php?enc_para=wPibobgSfc2vx2XiqHLAI1xXRVgUF8GYulwVNIjuFk1aqDYl3uZfCf%2AU

<https://m.kfb.or.kr/include/download.php?enc_para=wPibobgSfc2vx2XiqHLAI1xXRVgUF8GYulwVNIjuFk1aqDYl3uZfCf%2AU>

[\[26\]](https://m.kfb.or.kr/include/download.php?enc_para=zf6bobgSfc2vx2XiqHLAI%2ADU3SPrRez5Y%2FtzuSJh0WsLvxqEpQ5DxEne) https://m.kfb.or.kr/include/download.php?enc_para=zf6bobgSfc2vx2XiqHLAI%2ADU3SPrRez5Y%2FtzuSJh0WsLvxqEpQ5DxEne

<https://m.kfb.or.kr/include/download.php?enc_para=zf6bobgSfc2vx2XiqHLAI%2ADU3SPrRez5Y%2FtzuSJh0WsLvxqEpQ5DxEne>

[\[27\]](https://stathtml.moel.go.kr/statHtml/statHtml.do?orgId=118&tblId=DT_118N_MON051) https://stathtml.moel.go.kr/statHtml/statHtml.do?orgId=118&tblId=DT_118N_MON051

<https://stathtml.moel.go.kr/statHtml/statHtml.do?orgId=118&tblId=DT_118N_MON051>

[\[28\]](https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000198487) https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000198487

<https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000198487>

[\[29\]](https://news.bizwatch.co.kr/article/finance/2024/08/14/0036) https://news.bizwatch.co.kr/article/finance/2024/08/14/0036

<https://news.bizwatch.co.kr/article/finance/2024/08/14/0036>

[\[31\]](https://ceoscoredaily.com/page/view/2019102216095268429) https://ceoscoredaily.com/page/view/2019102216095268429

<https://ceoscoredaily.com/page/view/2019102216095268429>

[\[32\]](https://www.ddaily.co.kr/news/article/?no=185677) https://www.ddaily.co.kr/news/article/?no=185677

<https://www.ddaily.co.kr/news/article/?no=185677>

[\[33\]](https://www.sdgnews.net/news/articleView.html?idxno=21177) https://www.sdgnews.net/news/articleView.html?idxno=21177

<https://www.sdgnews.net/news/articleView.html?idxno=21177>

[\[47\]](https://www.ibk.co.kr/) https://www.ibk.co.kr/

<https://www.ibk.co.kr/>

[\[51\]](https://www.fsc.go.kr/no010101/84508?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) https://www.fsc.go.kr/no010101/84508?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=

<https://www.fsc.go.kr/no010101/84508?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=>
