---
tags:
  - area/strategy
  - type/reference
  - status/active
date: 2026-06-30
up: "[[_운영-회수현황]]"
---
> 📄 **요약 먼저** → [[D18-요약]] · 상세가 필요할 때만 아래 원문을 본다.

> 원본 파일: `D18. gpt 5.5 high. 20260630_JB_LocalGuard_OS_현업_채택과_신뢰_보정_UX_리서치.docx`
> 회수 2026-06-30 · ⚠️ 대외비 · **사용 모델: gpt 5.5 high (Deep Research)**

---

# JB LocalGuard OS 현업 채택과 신뢰 보정 UX 리서치

## 핵심 발견 요약

RM이 **AI 제안을 실제로 수용하는 조건**은 “정확해 보이는 답” 자체보다, **지금 이 케이스에서 왜 이런 제안이 나왔는지 검증 가능한 근거 패키지**가 있느냐에 더 가깝습니다. 금융 규제·감독 문서는 공통적으로 AI를 **보조수단**으로 위치시키고, 책임소재·설명가능성·정기 교육·인간 개입 규정을 요구합니다. 영국 FCA/BoE 조사에서도 금융권 ML은 AML·사기탐지·언더라이팅·신용리스크 등으로 확산됐지만, 현장 안전장치로는 **alert systems**와 **human-in-the-loop**가 가장 흔했고, 복잡 모델의 검증·설명가능성·규제 해석 불명확성이 중요한 제약으로 남았습니다. 즉 JB LocalGuard OS도 “AI가 먼저 쓰고 사람이 승인”이 아니라, **사람이 검증 가능한 형태로 AI가 초안을 만들고 책임은 끝까지 사람에게 남는 구조**일 때 채택될 가능성이 높습니다. [\[1\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=)

반대로 RM이 AI를 **거부·회피·무시**하는 대표 조건은 꽤 일관됩니다. 첫째, **한 번의 명백한 오류**가 이후 신뢰를 급격히 깎습니다. 알고리즘은 인간보다 더 빨리 “실수 한 번에” 버려지는 경향이 있고, 심지어 사람이 알고리즘이 인간보다 평균적으로 낫다는 사실을 봤어도 마찬가지였습니다. 둘째, **검토 부담이 늘어날 때**입니다. EBA는 ML 검증이 전통 모형보다 더 많은 테스트·시간·IT/인력 자원을 요구한다고 적었고, OECD는 금융권 AI 감독에서 설명가능성·동적 재보정·human-in-the-loop의 실제 운영화가 채택을 막는 핵심 과제라고 정리했습니다. 셋째, **책임은 내가 지는데 설명은 AI가 못할 때**입니다. 이 조합은 현업 입장에서 “쓸 이유보다 리스크가 큰 도구”가 됩니다. [\[2\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf)

**자동화편향과 rubber-stamping 위험**은 단순히 “AI를 너무 믿는 문제”가 아닙니다. Zhang 등은 **confidence score는 trust calibration에 도움**을 줄 수 있지만, 그것만으로 팀 성과가 좋아지는 것은 아니라고 보였습니다. Bansal 등은 더 나아가 **설명이 오히려 AI의 정답·오답 여부와 무관하게 수용을 늘릴 수 있다**고 보여줬습니다. 이 결과는 승인우선 콘솔에서 특히 중요합니다. 설명 텍스트가 길고 그럴듯할수록 RM이 검토를 덜 할 수 있기 때문입니다. 따라서 JB LocalGuard OS는 “설명 많이 제공”보다 **근거 원문 링크, 규정 근거, uncertainty, 다음 확인항목, 대안 행동**을 함께 주어야 하며, 고위험 건에서는 **원문 확인 체크·이중확인·고객 발송 preview** 같은 적절한 friction이 필요합니다. [\[3\]](https://qveraliao.com/fat2020.pdf)

한편 **과소신뢰와 algorithm aversion**도 무시하면 안 됩니다. Dietvorst 등은 사람들은 알고리즘이 인간보다 낫더라도 **그 실수를 본 뒤 더 빨리 신뢰를 잃는다**고 보였고, 후속 연구에서는 사용자가 알고리즘 출력에 **아주 약간이라도 수정권**을 가지면 사용 의향과 만족이 높아졌습니다. JB LocalGuard OS에 이것을 옮기면, RM이 AI 초안을 “수정 가능한 제안”으로 받아들이게 해야지 “그대로 승인하라”는 구조로 만들면 안 됩니다. 승인 전에 **문구 수정, 액션 변경, 근거 추가, 보류 사유 기록**이 손쉽게 가능해야 지속 사용이 나옵니다. [\[4\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf)

**알림 피로**는 금융·의료·사이버에서 모두 비슷한 동학을 보입니다. 최신 체계적 문헌고찰은 alert fatigue를 “과도하거나 관련성 낮은 알림 때문에 적절한 대응이 지속적으로 감소하는 상태”로 정리했고, 실제 문헌에서 가장 흔한 지표는 **quantity, override rate, acceptance rate**였습니다. 의료 안전 문헌은 다수의 무의미한 경보가 사용자를 둔감하게 만들어 **중요 경보까지 무시하게 만드는 역설**을 강조했고, AML 현장 자료는 기존 거래모니터링의 false positive가 통상 **80~90%** 수준이라고 보고합니다. 그래서 JB LocalGuard OS는 채택률보다 **경보 무시율, 승인 리드타임, 재작업률, override 사유 분포, follow-up completion**을 봐야 합니다. “얼마나 많이 눌렀나”보다 “어떤 경보가 체계적으로 무시되고, 왜 재작업이 일어나며, 어떤 manager/team에서 형식승인이 늘어나는가”가 더 중요합니다. [\[5\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf)

JB LocalGuard OS의 세 도메인은 alert fatigue 패턴이 같지 않을 가능성이 큽니다. **보이스피싱**은 피해가 실시간·비가역적으로 커질 수 있어 즉시 상위검토·차단 후보가 많고, **소상공인 상환위험**은 보통 검토 큐 중심의 우선순위 관리가 더 적합합니다. **전세 위험**은 법적·문서적 맥락과 최신성 검증이 중요해, 즉시 차단보다 **증빙확인 중심의 review flow**가 더 중요할 수 있습니다. 이는 FATF가 거래모니터링·스크리닝에서 **risk bucket triage**와 human judgement 지원을 강조한 점, 그리고 금융당국이 AI를 보조수단으로 두고 human intervention을 차등화하라고 한 점과 맞닿아 있습니다. 다만 한국 RM 직접 행동 데이터는 아직 부족하므로 이 도메인별 설계는 **파일럿 로그로 검증해야 하는 가설**입니다. [\[6\]](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf)

마지막으로, **채택률(adoption rate) 단독 KPI는 부족**합니다. 최근 human-AI research는 주관적 trust와 실제 reliance를 구분해야 한다고 강조합니다. 사용자가 많이 눌렀다는 사실은 적절한 사용을 뜻하지 않습니다. 과도한 승인도, 과도한 거부도 둘 다 실패일 수 있습니다. 따라서 JB LocalGuard OS의 KPI는 “채택률”보다 **appropriate reliance**와 운영품질에 가까운 지표 조합으로 구성되어야 합니다. [\[7\]](https://arxiv.org/pdf/2302.02187)

## 근거표

| 주장 | 출처 URL | 발행처·날짜 | 신뢰도 | 원문 짧은 인용 | 제품 관련성 |
|----|----|----|----|----|----|
| 한국 금융당국은 AI를 보조수단으로 보고 책임·개입·교육을 요구한다 | `https://www.fsc.go.kr/no010101/85908` | 금융위원회, 2025-12-22 | 1차 | “AI 활용에 대한 임직원 책임소재 명확화… 임직원 개입이 필요한 상황을 차등화… 정기적 교육 실시” | 승인우선 콘솔의 human approval, 책임로그, role-based friction 근거. [\[8\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) |
| 2026 가이드라인 시행 계획에도 거버넌스·보안·위험관리·안내데스크가 포함됐다 | `https://www.fsc.go.kr/no010101/87142` | 금융위원회, 2026-06-18 | 1차 | “｢금융분야 인공지능 가이드라인｣은 ’26.6.22일 시행… ｢AI 위험관리프레임워크｣… ｢AI 보안 안내서｣도 함께 배포” | JB LocalGuard OS를 단일 모델이 아니라 운영체계로 설계해야 함. [\[9\]](https://www.fsc.go.kr/no010101/87142) |
| 영국 금융권은 ML을 AML·사기탐지·언더라이팅 등에 이미 넓게 쓰며 human-in-the-loop가 흔한 safeguard다 | `https://www.fca.org.uk/publication/research/research-note-on-machine-learning-in-uk-financial-services.pdf` | FCA/BoE, 2019-10 | 1차 | “ML is most commonly used in anti-money laundering (AML) and fraud detection… general insurance pricing and underwriting”; “Alert systems and human-in-the-loop are the most common safeguards” | JB의 주요 도메인과 가장 가까운 금융 현업 사례. [\[10\]](https://www.fca.org.uk/publication/research/research-note-on-machine-learning-in-uk-financial-services.pdf) |
| 감독당국은 critical decision에 쓰인 AI는 설명 가능해야 한다고 본다 | `https://www.bis.org/fsi/fsipapers24.pdf` | BIS FSI, 2024-09 | 1차 | “supervisors generally expect firms to be able to explain AI models that are used for critical activities or to inform decision-making” | RM 승인 화면에 근거·설명·감사추적이 필요한 이유. [\[11\]](https://www.bis.org/fsi/fsipapers24.pdf) |
| 금융권 AI에서 accountability는 board/senior management 책임과 human intervention 문서화를 요구한다 | `https://www.bis.org/fsi/publ/insights35.pdf` | BIS FSI, 2021-01 | 1차 | “human overrides to models/rating assignments need to be monitored and documented” | override taxonomy와 override 로그 필수 근거. [\[12\]](https://www.bis.org/fsi/publ/insights35.pdf) |
| 규제 목적 ML은 여전히 제한적이며, 검증 복잡도와 자원부담이 크다 | `https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf` | EBA, 2023-08-04 | 1차 | “complexity of ML techniques may increase the time, computational/IT and human resources needed for validating” | RM이 “AI가 일을 줄여주지 않는다” 느끼는 순간 채택이 꺾인다는 운영 리스크. [\[13\]](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf) |
| 일본 POC는 데이터 반출 없이 true positive likelihood로 human judgement를 지원했다 | `https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Stocktake-Datapooling-Collaborative-Analytics.pdf` | FATF, 2021-07 | 1차 | “facilitate human judgement by calculating the likelihood of a true positive score” | JB LocalGuard OS의 ‘사람 승인 전 고객행동 차단’ 구조와 매우 유사한 참조 사례. [\[14\]](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Stocktake-Datapooling-Collaborative-Analytics.pdf) |
| AML transaction monitoring은 false positive가 매우 높고 현업 부담의 핵심 원인이다 | `https://www.swift.com/swift-resource/250631/download` | SWIFT Institute, 2021 | 1차 | “the most quoted range for false positives was around 80-90%” | alert fatigue, queue prioritization, suppress 정책 설계 근거. [\[15\]](https://www.swift.com/swift-resource/250631/download) |
| SWIFT 실무 페이지도 금융권 AML false positive를 90% 초과로 설명한다 | `https://www.swift.com/risk-and-compliance/anti-money-laundering` | SWIFT, 접속기준 2026-06 | 1차 | “More than 90% of these will typically be false positives” | 위 수치의 현장 감각 교차확인. [\[16\]](https://www.swift.com/risk-and-compliance/anti-money-laundering) |
| confidence score는 trust calibration에는 도움을 주지만 성과 개선은 보장하지 않는다 | `https://qveraliao.com/fat2020.pdf` | FAT\* 2020, 2020-01-27 | 1차 | “confidence score can help calibrate people’s trust… but trust calibration alone is not sufficient to improve AI-assisted decision making” | 점수만 보여주는 UI의 한계. [\[17\]](https://qveraliao.com/fat2020.pdf) |
| explanation은 오히려 AI가 틀렸을 때도 수용을 늘릴 수 있다 | `https://idl.cs.washington.edu/files/2021-AIExplanationsTeamPerformance-CHI.pdf` | CHI 2021, 2021-05 | 1차 | “Explanations often increased accuracy when the AI system was correct but, worryingly, decreased it when the AI erred” | ‘그럴듯한 설명’이 rubber-stamping을 부를 수 있음을 시사. [\[18\]](https://idl.cs.washington.edu/files/2021-AIExplanationsTeamPerformance-CHI.pdf) |
| 알고리즘은 사람보다 한 번의 오류에 더 빠르게 불신당한다 | `https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf` | Journal of Experimental Psychology: General, 2014 | 1차 | “people are especially averse to algorithmic forecasters after seeing them perform, even when they see them outperform a human” | RM의 초기 오류 경험 관리, trust-repair 필요성. [\[19\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf) |
| 약간의 수정권만 줘도 algorithm aversion을 줄일 수 있다 | `https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf` | Management Science, 2018 | 1차 | “reduce algorithm aversion by giving people some control—even a slight amount” | 승인 전 편집·수정 가능 UX의 직접 근거. [\[20\]](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf) |
| instance-level uncertainty는 prediction alone보다 더 나은 의사결정을 만들 수 있다 | `https://arxiv.org/abs/2309.10852` | arXiv preprint, 2024-02 개정 | \[간접\] | “UQ was beneficial for decision-making performance compared to only AI predictions” | uncertainty 표시를 confidence 점수의 보완재로 써야 함. [\[21\]](https://arxiv.org/abs/2309.10852) |
| counterfactual explanation은 wrong AI output에 대한 과잉의존을 줄일 수 있다 | `https://arxiv.org/abs/2308.04375` | CSCW 2023 관련 arXiv, 2023-08 | \[간접\] | “counterfactual explanations… reduce their over-reliance on ‘wrong’ AI outputs by 21%” | “대안 행동/다음 확인항목” UI의 간접 근거. [\[22\]](https://arxiv.org/abs/2308.04375) |
| alert fatigue 문헌은 정의가 불명확하지만 quantity·override·acceptance가 가장 흔한 지표다 | `https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf` | JAMIA, 2026 | 1차 | “The most common alert metrics were quantity, override rate, and acceptance rate” | KPI 설계의 기본 축. [\[23\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| 과도한·무의미한 경보는 결국 중요한 경보까지 무시하게 만든다 | `https://psnet.ahrq.gov/node/33586/psn-pdf` | AHRQ PSNet, 2024-12-15 | 1차 | “clinicians… ignore both the bothersome… and the critical alerts” | severity tier와 non-interruptive alert 설계 필요. [\[24\]](https://psnet.ahrq.gov/node/33586/psn-pdf) |
| 도입 장벽은 workflow integration, interoperability, liability, trust 문제를 함께 다뤄야 풀린다 | `https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/` | National Academy of Medicine, 2022-09-29 | 1차 | “workflow integration… liability… provider trust and adoption” | RM 교육·운영·인센티브·시스템 연계까지 같이 봐야 하는 이유. [\[25\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |

## RM 채택 리스크 맵

| 리스크 | 발생 조건 | 현업 행동 | 제품 영향 | 완화 UX·운영장치 | 근거 |
|----|----|----|----|----|----|
| 자동화편향 | 설명이 그럴듯하고, 확인 비용이 높고, 성과압박이 강할 때 | AI 제안을 실질 검토 없이 승인하거나 형식승인 | 오탐/오판이 승인 단계를 통과 | 근거 원문 링크, 규정 근거, uncertainty, 대안행동, 원문확인 체크, 고위험 이중확인 | [\[3\]](https://qveraliao.com/fat2020.pdf) |
| 과소신뢰 | 초기에 명백한 오류를 봤거나, AI가 불완전하다는 인식만 남을 때 | AI 제안을 거의 열어보지 않거나, 일관되게 거절 | 채택률 저하보다 더 심각한 “보조도구 무력화” 발생 | 오류 후 trust-repair 배너, model update 공지, 오류케이스 교육, 수정 가능한 제안 | [\[26\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf) |
| 검토부담 증가 | 설명은 많은데 확인 포인트가 정리되지 않고, 이중입력까지 발생할 때 | “AI가 오히려 시간 잡아먹는다”는 인식 확산 | 재작업률·리드타임 상승, 지속사용 감소 | explain-why-now, 다음 확인항목 3개 이내, 승인 전 자동 요약, CRM 연동으로 중복입력 제거 | [\[27\]](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf) |
| 알림 피로 | false positive와 저가치 알림이 누적될 때 | 무시, 일괄기각, 늦은 확인, 중요 알림 누락 | 실제 위험 신호 탐지력 하락 | severity tier, non-interruptive 기본, queue aging, snooze/suppress, closed-loop threshold 튜닝 | [\[5\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| 책임회피 | 책임은 RM·관리자에게 있는데 AI가 근거를 충분히 못 줄 때 | 승인을 미루거나 상위결재로 과잉전가 | 승인 리드타임 증가, 고객 응대 지연 | role-based 설명수준, 승인권자별 rationale, override 사유 구조화, 감사로그 자동화 | [\[28\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) |
| 교육 미흡 | 온보딩 없이 바로 투입되거나, 오류 시나리오 훈련이 없을 때 | 과신/회피가 팀마다 다르게 발생 | 팀 간 편차 확대, KPI 해석 불가 | 초기 온보딩, calibrated trust training, 오류사례 리뷰, champion user 운영 | [\[29\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |
| 관리자 인센티브 왜곡 | 처리량만 평가하고 “좋은 거절/좋은 수정”은 인정하지 않을 때 | rubber-stamping 유도 | adoption은 높아도 운영품질 악화 | manager dashboard에 승인량이 아니라 rework·follow-up·ignore·override 질 지표 반영 | [\[30\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |

비기술 장벽은 별도로 보면 더 선명합니다.

| 비기술 장벽 | 현상 | JB LocalGuard OS 번역 |
|----|----|----|
| 책임소재 불안 | “AI가 추천했어도 최종 책임은 내 것”이라는 불균형 | 승인자별 설명층위, 로그 자동기록, override 사유 표준화가 필수. [\[31\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) |
| 성과평가 왜곡 | 빠른 처리만 보상하면 품질보다 통과가 유리 | 승인량 대신 승인 리드타임·재작업률·follow-up completion을 본다. [\[32\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |
| 내부정치·상위결재 선호 | 애매한 건 모두 escalation되어 병목 발생 | escalation quality와 불필요 escalation 비율을 따로 측정한다. [\[33\]](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/supervision-of-artificial-intelligence-in-finance_1295e5e2/92743dc1-en.pdf) |
| 기존 시스템 이중입력 | 핵심 맥락은 CRM/코어에 있고 AI 콘솔은 별도일 때 | AI 콘솔은 “판단 근거+행동초안” 중심, 원 시스템과 event sync가 기본. [\[34\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |
| 직무불안·숙련 약화 우려 | AI가 판단을 대체한다는 인식이 생길 때 | “AI는 권고, 인간은 승인·수정·책임”을 UI와 교육 모두에서 반복 명시. [\[35\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |

## 신뢰 보정 UX 원칙 표

| UX 원칙 | 막는 위험 | 화면·흐름 예시 | 필요한 로그 이벤트 | 근거 |
|----|----|----|----|----|
| 점수 단독 노출 금지 | 점수권위 편향, 숫자 맹신 | `위험도 0.82`만 보여주지 말고 `왜 지금 떴는지`, `불확실성`, `다음 확인 3항목`을 함께 노출 | `evidence_opened`, `uncertainty_expanded`, `next_check_clicked` | [\[36\]](https://qveraliao.com/fat2020.pdf) |
| 근거 원문 우선 | rubber-stamping, 책임회피 | 규정 조항, 고객 이력, 거래 패턴, 유사케이스를 탭으로 제공 | `source_link_clicked`, `policy_basis_opened`, `similar_case_opened` | [\[37\]](https://www.bis.org/fsi/fsipapers24.pdf) |
| editable AI draft | algorithm aversion, 사용포기 | AI가 메시지/행동 초안을 만들되 RM이 문구·행동·대상·타이밍을 수정 가능 | `draft_edited`, `draft_diff_saved`, `ai_suggestion_partially_used` | [\[38\]](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf) |
| risk-tiered friction | 자동화편향, 과소확인 | 고위험은 근거확인 체크 + 이중확인 + preview, 중위험은 사유선택, 저위험은 빠른 승인 | `tier_assigned`, `double_check_completed`, `preview_viewed` | [\[39\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) |
| explain-why-now | 알림 피로, 무시 증가 | “왜 오늘/지금 RM 큐에 올랐는가”를 이벤트 기반으로 설명 | `why_now_viewed` | [\[40\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| alternative action 제시 | 이분법적 승인/반려, 과도한 escalation | `즉시 연락`, `모니터링 유지`, `상위검토`, `보류 후 서류확인` 등 대안 제시 | `alternative_selected`, `escalate_reason_selected` | [\[41\]](https://arxiv.org/abs/2308.04375) |
| 인간·AI 각각의 강점 표시 | AI 과신, 자기판단 포기 | “AI는 거래패턴·유사사건 강함 / RM은 최신 고객맥락·관계사실 강함”을 문맥 도움말로 고정 | `hint_viewed` | [\[42\]](https://arxiv.org/abs/2301.05809) |
| 오류 후 trust repair | 한 번의 명백한 오류 후 이탈 | 모델 업데이트, 수정 릴리즈 노트, 재발방지 근거를 알림으로 제시 | `model_update_notice_seen`, `post_error_return_visit` | [\[43\]](https://www.jorgegoncalves.com/docs/facct24.pdf) |
| 승인 전 고객발송 preview | 고객 접촉 부적절, 책임불안 | 고객에게 나갈 문구·행동을 최종 미리보기에서 확인 후 승인 | `customer_preview_viewed`, `customer_action_blocked_until_approval` | [\[44\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) |
| trust와 reliance 분리 측정 | 채택률 착시 | 설문 trust와 실제 수용행동을 별도로 측정 | `self_trust_survey_submitted`, `ai_advice_accepted`, `ai_advice_rejected` | [\[45\]](https://arxiv.org/pdf/2604.23896) |

## 알림 피로 KPI 표

| KPI | 정의·산식 | 측정 이벤트 | 위험 신호 | 개선 액션 | 출처 |
|----|----|----|----|----|----|
| alert_volume_per_rm | `특정 기간 총 알림 ÷ RM 수` | `alert_created` | 팀별 급격한 편차, 특정 규칙 폭증 | threshold 재조정, 묶음 알림, suppress 룰 도입 | [\[40\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| alert_burden_rate | `RM 1인당 하루 actionable alert 수` | `alert_created`, `rm_assigned` | fatigue onset 추정, queue aging 동반 | severity tier 재설계 | [\[23\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| operational_false_alert_share | `false/benign 처리된 알림 ÷ 전체 처리 알림` | `alert_dispositioned(false_positive/benign)` | 80% 이상 지속 시 피로 가능성 ↑ | 규칙 제거·분할, feature 개선 | [\[46\]](https://www.swift.com/swift-resource/250631/download) |
| precision | `TP ÷ (TP+FP)` | `alert_dispositioned` | precision 하락 | 근거·threshold·세그먼트별 모델 재조정 | [\[23\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| recall | `TP ÷ (TP+FN)` | `alert_dispositioned`, `missed_case_found` | precision만 높이고 recall 저하 | holdout 모니터링, miss review | [\[23\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| time_to_acknowledge | `first_ack_at - first_alert_at` | `alert_created`, `alert_opened/acknowledged` | 고위험 tier에서 지연 | 상위노출, 모바일/데스크 알림 정책 수정 | [\[40\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| dismissal_rate | `dismissed 알림 ÷ 전체 알림` | `alert_dismissed` | 특정 유형·팀에서 비정상 급등 | dismiss 사유 검토, rule cleanup | [\[23\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) |
| override_rate | `AI 권고와 다른 최종결정 ÷ AI 제안 케이스` | `ai_suggestion_shown`, `final_decision_saved` | 특정 케이스군에서 집중 | 모델 drift, evidence UI 부족 여부 점검 | [\[47\]](https://www.bis.org/fsi/publ/insights35.pdf) |
| alert_ignore_rate | `SLA 내 미열람 또는 미결정 알림 ÷ 전체 알림` | `alert_created`, `alert_opened`, `alert_closed` | 형식운영·숨은 피로 | queue routing 변경, manager review | [\[24\]](https://psnet.ahrq.gov/node/33586/psn-pdf) |
| approval_lead_time | `first_alert_at → approved_at` | `alert_created`, `approved` | 병목·과도한 friction | tier별 friction 재설계 | 승인우선 콘솔용 제안 KPI이며 fatigue 지표와 함께 봐야 함. [\[48\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) |
| rework_rate | `RM 수정/반려 케이스 ÷ AI 제안 케이스` | `draft_edited`, `rejected`, `returned_for_revision` | 초안 품질 저하, evidence 부족 | prompt/template/rule 수정, 교육 보강 | [\[49\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |
| follow_up_completion | `필수 후속조치 완료 건 ÷ 승인 건` | `approved`, `follow_up_done` | 승인만 하고 후속조치 미이행 | task integration, nudging 강화 | [\[25\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) |

채택률은 보조지표로만 두는 편이 좋습니다. 많이 클릭했다고 잘 쓰는 것이 아니기 때문입니다. 최근 human-AI literature는 **subjective trust와 objective reliance를 분리**하고, 올바른 AI 수용과 올바른 자기판단 유지가 함께 있는지를 봐야 한다고 제안합니다. JB LocalGuard OS에서는 `adoption_rate`보다 `approval_lead_time`, `rework_rate`, `override_reason_distribution`, `alert_ignore_rate`, `follow_up_completion`, `post-training behavior change`를 묶어 보는 편이 현업 채택을 훨씬 잘 설명합니다. [\[7\]](https://arxiv.org/pdf/2302.02187)

## Override 사유 taxonomy 초안

| 사유 코드 | RM 입력 문구 | 의미 | 후속 처리 | 제품 적용 |
|----|----|----|----|----|
| EVID_MISSING | “근거가 부족합니다” | source/policy/customer-context가 부족 | 모델 출력 포맷 수정, evidence completeness 점검 | 근거 미노출 시 승인 금지 조건 후보 |
| EVID_CONFLICT | “근거끼리 상충합니다” | 원문·규정·고객이력 간 모순 | retrieval·ranking·dedup 개선 | conflict badge 자동 표기 |
| NEED_LATEST | “최신 정보 확인이 필요합니다” | 실시간 거래/상환/서류 최신성 이슈 | 데이터 freshness 모니터링, SLA 개선 | stale data 경고 표기 |
| CUSTOMER_CONTEXT_DIFF | “고객 맥락이 다릅니다” | 관계사실, 최근 상담, 지역 특성 미반영 | CRM 연동 개선, RM 피드백 흡수 | free-text+태그 병행 |
| POLICY_INTERPRETATION | “규정 해석 이견이 있습니다” | 규정 적용이 애매하거나 승인권자 판단 필요 | 준법·리스크 FAQ 보강, 정책 룰 업데이트 | policy basis 탭 개선 |
| FALSE_POSITIVE | “오탐으로 판단합니다” | 신호는 떴으나 위험 아님 | threshold/segmentation/rule tuning | suppress 추천 학습 |
| ACTION_INAPPROPRIATE | “행동 초안이 부적절합니다” | 연락/문구/시점/수위가 맞지 않음 | 템플릿 재작성, 도메인별 action library 개선 | 고객발송 preview 필수 |
| NEED_ESCALATION | “상위 승인 필요합니다” | 권한 범위 밖 또는 법적 민감 사안 | escalation routing 개선 | 상위검토 사유 의무 입력 |
| DUPLICATE_ALERT | “중복 알림입니다” | 이미 처리 중인 동일/유사 사건 | dedup·bundle 개선 | alert bundle UI |
| TRAINING_GAP | “어떻게 판단할지 확신이 없습니다” | 사용법/정책 이해 부족 | 교육 콘텐츠/코칭 연결 | help-to-learn CTA |
| SYSTEM_ISSUE | “시스템 동작이 이상합니다” | 지연·링크 오류·화면 문제 | 버그 triage | product ops 즉시 라우팅 |
| OTHER | “기타” | 미분류 | 주간 taxonomy 정제 | free-text mandatory |

이 taxonomy의 핵심은 “기각 이유 수집”이 아니라 **후속 조치를 자동으로 갈라주는 것**입니다. `FALSE_POSITIVE`는 룰·threshold 튜닝으로, `CUSTOMER_CONTEXT_DIFF`는 CRM·노트 연동으로, `TRAINING_GAP`은 교육으로, `POLICY_INTERPRETATION`은 준법 FAQ로 보내야 합니다. 그래야 override 로그가 단순 감사 데이터가 아니라 **모델·룰·교육·운영 개선의 닫힌 루프**가 됩니다. BIS가 human override를 별도로 모니터링·문서화해야 한다고 본 이유와도 정확히 맞닿습니다. [\[50\]](https://www.bis.org/fsi/publ/insights35.pdf)

## 제품 적용 시사점

JB LocalGuard OS에 바로 반영할 우선순위는 다음이 가장 실용적입니다.

첫째, **AI 제안 카드를 evidence-first 구조로 바꾸는 것**입니다. 카드 1장 안에 `왜 지금 떴는지`, `불확실성`, `근거 원문 링크`, `규정 근거`, `유사 케이스`, `추천 행동`, `대안 행동`이 들어가야 합니다. 점수는 그중 하나여야지 중심이 되면 안 됩니다. confidence만으로는 calibration이 부족하고, 설명은 잘못 설계하면 오히려 오답 수용을 늘릴 수 있기 때문입니다. [\[51\]](https://qveraliao.com/fat2020.pdf)

둘째, **고위험 승인에만 friction을 집중**해야 합니다. 모든 알림을 무겁게 만들면 병목이 생기고, 모든 알림을 가볍게 만들면 형식승인이 생깁니다. 권장 방식은 `저위험=빠른 승인`, `중위험=사유선택`, `고위험=원문확인 체크 + 이중확인 + 고객발송 preview`입니다. 의료 alert fatigue 문헌이 말하듯 **높은 severity만 interruptive**로 두는 방식이 더 안전합니다. [\[52\]](https://psnet.ahrq.gov/node/33586/psn-pdf)

셋째, **override를 실패 신호가 아니라 학습 신호로 취급**해야 합니다. `override_reason_distribution`은 제품·모델·교육 상태를 동시에 보여주는 가장 값진 운영 지표입니다. 예를 들어 `EVID_MISSING`이 많으면 UI와 retrieval 문제이고, `CUSTOMER_CONTEXT_DIFF`가 많으면 RM 노트/CRM 맥락이 빠진 것이며, `TRAINING_GAP`이 많으면 현업 교육 설계가 부족한 것입니다. [\[53\]](https://www.bis.org/fsi/publ/insights35.pdf)

넷째, **채택률 단독 KPI를 버리고 운영품질 KPI 묶음으로 바꿔야** 합니다. 최소 묶음은 `approval_lead_time`, `rework_rate`, `override_reason_distribution`, `alert_ignore_rate`, `follow_up_completion`입니다. 여기에 주관 지표로는 분기별 `calibrated trust survey`를 붙이되, 행동 로그와 별도로 봐야 합니다. 사용자가 “믿는다”고 답해도 실제로는 무시하거나 rubber-stamp할 수 있기 때문입니다. [\[54\]](https://arxiv.org/pdf/2604.23896)

다섯째, **세 도메인별 큐 전략을 분리**해야 합니다.\
소상공인 상환위험은 실시간 차단보다 **전담 RM 검토 큐**가 기본입니다. 리스크는 누적되지만 보통 즉시 비가역 피해는 상대적으로 낮기 때문입니다.\
전세 위험은 **증빙·정책·최신성 확인 중심 큐**가 적합합니다. 서류와 맥락이 중요해 RM 수정/거부 사유가 풍부하게 나올 가능성이 큽니다.\
보이스피싱은 **즉시 상위검토·차단 후보 비중이 가장 높아야** 합니다. 실시간성, 피해 비가역성, 고객보호 우선순위가 높기 때문입니다. 이 부분은 금융사기 대응 일반 원칙과 FATF의 risk-bucket triage를 바탕으로 한 **제품 가설**이며, 파일럿 로그로 우선 검증해야 합니다. [\[55\]](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf)

여섯째, **교육은 한 번의 온보딩으로 끝나면 안 됩니다**. 가장 효과적인 구조는 `초기 30분 온보딩 → 오류 사례 기반 주간 리뷰 → 월간 refresh → champion user 피드백`입니다. 내용은 “AI 소개”보다 **언제 믿고, 언제 의심하고, 언제 수정·거부해야 하는가**여야 합니다. 한국 금융당국도 정기 교육을 보조수단성 원칙의 필수 요소로 두고 있고, NAM 역시 method-to-use와 desire-to-use를 분리해 훈련과 심리적 수용을 둘 다 다루어야 한다고 봤습니다. [\[56\]](https://www.fsc.go.kr/no010101/85908)

일곱째, **오류 후 trust repair 설계**를 제품에 넣어야 합니다. 모델 업데이트가 단순 사과·부인보다 신뢰 회복에 효과적이었다는 최근 HCI 연구는, 현업 AI에서도 “무슨 문제가 있었고 무엇이 고쳐졌는지”를 release note와 banner로 보여주는 것이 중요하다는 뜻입니다. RM은 완벽한 AI를 기대하기보다, **오류가 드러났을 때 시스템이 책임 있게 학습하고 있다는 신호**를 원합니다. [\[43\]](https://www.jorgegoncalves.com/docs/facct24.pdf)

여덟째, **파일럿은 6~8주, 팀 단위, 행동 로그 중심**이 적절합니다. 권장 설계는 RM 2개 이상 팀을 잡아 `기존 프로세스` 대 `JB LocalGuard OS`를 비교하거나, 같은 팀 내에서 `AI suggestion on/off`, `confidence only` 대 `evidence+uncertainty+alternative`를 비교하는 방식입니다. 표본은 최소 수십 명보다 **수백 건 단위의 승인 이벤트**가 더 중요합니다. 측정 단위는 사용자 수보다 `alert`, `case`, `approval`, `override`, `follow-up` 이벤트여야 하며, 대표 판정 축은 `approval_lead_time`, `rework_rate`, `alert_ignore_rate`, `override taxonomy`, `post-training behavior shift`입니다. 이 설계는 D13/D15 영역의 성능·감사증거를 넓히려는 것이 아니라, **현업 채택 행동과 UX 채택 지표**를 검증하는 용도에 맞습니다. [\[57\]](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/supervision-of-artificial-intelligence-in-finance_1295e5e2/92743dc1-en.pdf)

정리하면, “AI를 잘 쓰는 RM”은 **AI를 빨리 승인하는 사람**이 아니라, **근거를 빠르게 검증하고 적절히 수정·거부할 수 있는 사람**입니다. 반대로 “AI에 끌려다니는 RM”은 점수·설명 텍스트에 끌려 형식승인하거나, 한 번의 오류 후 전면 회피하는 사람입니다. 제품 원칙으로 번역하면 다음 한 문장으로 압축됩니다. **JB LocalGuard OS는 RM의 판단을 대체하는 화면이 아니라, RM이 더 잘 검증하도록 돕는 화면이어야 한다.** [\[58\]](https://qveraliao.com/fat2020.pdf)

## 갭과 미검증

가장 큰 갭은 **한국 금융 RM 직접 연구의 부족**입니다. 이번 조사에서 한국 금융당국의 AI 원칙·교육·거버넌스 자료는 확인됐지만, RM·심사역·준법담당자가 실제 업무에서 **언제 AI를 수용·거부·무시·형식승인하는지**를 정량적으로 다룬 국내 1차 연구는 충분히 확보되지 않았습니다. 따라서 의료·항공·공공·글로벌 금융 HCI 연구를 상당 부분 끌어와 번역했으며, 이 일반화에는 한계가 있습니다. 한국 맥락의 확정 답은 결국 JB LocalGuard OS 파일럿의 행동 로그가 채워야 합니다. [\[59\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=)

또한 **최근 HCI 연구 일부는 금융 직접 적용성이 낮거나 preprint**입니다. uncertainty quantification, counterfactual explanation, appropriate reliance measurement review는 설계 시사점은 크지만, 금융 RM 환경에서 재현됐다고 보기 어렵습니다. 이들은 본 보고서에서 \[간접\] 또는 \[미검증\]에 가깝게 취급해야 합니다. 특히 “counterfactual explanation이 과잉의존을 21% 줄였다” 같은 단일 수치는 **의료 인접 과제**의 결과이므로, JB 제품에서 그대로 기대효과로 쓰면 과장입니다. [\[60\]](https://arxiv.org/abs/2308.04375)

핵심 수치 중 **AML false positive 80~90%+**는 SWIFT 자료와 SWIFT 실무 페이지로 교차확인했지만, 기관·업무·규칙 구성에 따라 크게 달라질 수 있습니다. 따라서 이를 JB LocalGuard OS의 목표값으로 바로 도입해서는 안 되고, “현업 피로를 유발할 수 있는 수준의 노이즈가 금융 범죄 탐지에서 흔하다”는 참고치로만 보는 편이 안전합니다. [\[46\]](https://www.swift.com/swift-resource/250631/download)

제품 사실에 대해서는 **내부 정본** `_canon.md`**를 이 세션에서 확인하지 못했기 때문에**, 본 보고서는 사용자가 제공한 프롬프트 범위 밖의 JB LocalGuard OS 사실을 추가 단정하지 않았습니다. 따라서 JB 계열 관계, 자산 규모, 외부 제휴 상태 등 프롬프트 밖 제품·회사 사실은 의도적으로 확장하지 않았습니다.

자체 점검 결과는 다음과 같습니다. **D13/D15 경계는 지켰고**, 본 보고서는 모델 성능·감사증거·사고대응이 아니라 **현업 채택 행동, 신뢰 보정 UX, 알림 피로, 교육·피드백 루프**에 집중했습니다. **채택률 단독 KPI도 피했고**, `approval_lead_time`, `rework_rate`, `override_reason_distribution`, `alert_ignore_rate`, `follow_up_completion` 중심으로 설계했습니다. **원문 확인 가능한 자료만 짧게 인용**했고, conference PDF·정부 보고서·감독기관 문서·공식 보고서를 우선 썼습니다. **한국 금융 직접 근거 부재는 갭으로 명시**했습니다.

------------------------------------------------------------------------

[\[1\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[8\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[28\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[31\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[39\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[44\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[48\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) [\[59\]](https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=

<https://www.fsc.go.kr/no010101/85908?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=>

[\[2\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf) [\[4\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf) [\[19\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf) [\[26\]](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf) https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf

<https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/Dietvorst-Simmons-Massey-2014.pdf>

[\[3\]](https://qveraliao.com/fat2020.pdf) [\[17\]](https://qveraliao.com/fat2020.pdf) [\[36\]](https://qveraliao.com/fat2020.pdf) [\[51\]](https://qveraliao.com/fat2020.pdf) [\[58\]](https://qveraliao.com/fat2020.pdf) https://qveraliao.com/fat2020.pdf

<https://qveraliao.com/fat2020.pdf>

[\[5\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) [\[23\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) [\[40\]](https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf) https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf

<https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf>

[\[6\]](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf) [\[55\]](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf) https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf

<https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf>

[\[7\]](https://arxiv.org/pdf/2302.02187) https://arxiv.org/pdf/2302.02187

<https://arxiv.org/pdf/2302.02187>

[\[9\]](https://www.fsc.go.kr/no010101/87142) https://www.fsc.go.kr/no010101/87142

<https://www.fsc.go.kr/no010101/87142>

[\[10\]](https://www.fca.org.uk/publication/research/research-note-on-machine-learning-in-uk-financial-services.pdf) https://www.fca.org.uk/publication/research/research-note-on-machine-learning-in-uk-financial-services.pdf

<https://www.fca.org.uk/publication/research/research-note-on-machine-learning-in-uk-financial-services.pdf>

[\[11\]](https://www.bis.org/fsi/fsipapers24.pdf) [\[37\]](https://www.bis.org/fsi/fsipapers24.pdf) https://www.bis.org/fsi/fsipapers24.pdf

<https://www.bis.org/fsi/fsipapers24.pdf>

[\[12\]](https://www.bis.org/fsi/publ/insights35.pdf) [\[47\]](https://www.bis.org/fsi/publ/insights35.pdf) [\[50\]](https://www.bis.org/fsi/publ/insights35.pdf) [\[53\]](https://www.bis.org/fsi/publ/insights35.pdf) https://www.bis.org/fsi/publ/insights35.pdf

<https://www.bis.org/fsi/publ/insights35.pdf>

[\[13\]](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf) [\[27\]](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf) https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf

<https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf>

[\[14\]](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Stocktake-Datapooling-Collaborative-Analytics.pdf) https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Stocktake-Datapooling-Collaborative-Analytics.pdf

<https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Stocktake-Datapooling-Collaborative-Analytics.pdf>

[\[15\]](https://www.swift.com/swift-resource/250631/download) [\[46\]](https://www.swift.com/swift-resource/250631/download) https://www.swift.com/swift-resource/250631/download

<https://www.swift.com/swift-resource/250631/download>

[\[16\]](https://www.swift.com/risk-and-compliance/anti-money-laundering) https://www.swift.com/risk-and-compliance/anti-money-laundering

<https://www.swift.com/risk-and-compliance/anti-money-laundering>

[\[18\]](https://idl.cs.washington.edu/files/2021-AIExplanationsTeamPerformance-CHI.pdf) https://idl.cs.washington.edu/files/2021-AIExplanationsTeamPerformance-CHI.pdf

<https://idl.cs.washington.edu/files/2021-AIExplanationsTeamPerformance-CHI.pdf>

[\[20\]](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf) [\[38\]](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf) https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf

<https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf>

[\[21\]](https://arxiv.org/abs/2309.10852) https://arxiv.org/abs/2309.10852

<https://arxiv.org/abs/2309.10852>

[\[22\]](https://arxiv.org/abs/2308.04375) [\[41\]](https://arxiv.org/abs/2308.04375) [\[60\]](https://arxiv.org/abs/2308.04375) https://arxiv.org/abs/2308.04375

<https://arxiv.org/abs/2308.04375>

[\[24\]](https://psnet.ahrq.gov/node/33586/psn-pdf) [\[52\]](https://psnet.ahrq.gov/node/33586/psn-pdf) https://psnet.ahrq.gov/node/33586/psn-pdf

<https://psnet.ahrq.gov/node/33586/psn-pdf>

[\[25\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) [\[29\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) [\[30\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) [\[32\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) [\[34\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) [\[35\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) [\[49\]](https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/) https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/

<https://nam.edu/perspectives/meeting-the-moment-addressing-barriers-and-facilitating-clinical-adoption-of-artificial-intelligence-in-medical-diagnosis/>

[\[33\]](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/supervision-of-artificial-intelligence-in-finance_1295e5e2/92743dc1-en.pdf) [\[57\]](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/supervision-of-artificial-intelligence-in-finance_1295e5e2/92743dc1-en.pdf) https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/supervision-of-artificial-intelligence-in-finance_1295e5e2/92743dc1-en.pdf

<https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/supervision-of-artificial-intelligence-in-finance_1295e5e2/92743dc1-en.pdf>

[\[42\]](https://arxiv.org/abs/2301.05809) https://arxiv.org/abs/2301.05809

<https://arxiv.org/abs/2301.05809>

[\[43\]](https://www.jorgegoncalves.com/docs/facct24.pdf) https://www.jorgegoncalves.com/docs/facct24.pdf

<https://www.jorgegoncalves.com/docs/facct24.pdf>

[\[45\]](https://arxiv.org/pdf/2604.23896) [\[54\]](https://arxiv.org/pdf/2604.23896) https://arxiv.org/pdf/2604.23896

<https://arxiv.org/pdf/2604.23896>

[\[56\]](https://www.fsc.go.kr/no010101/85908) https://www.fsc.go.kr/no010101/85908

<https://www.fsc.go.kr/no010101/85908>
