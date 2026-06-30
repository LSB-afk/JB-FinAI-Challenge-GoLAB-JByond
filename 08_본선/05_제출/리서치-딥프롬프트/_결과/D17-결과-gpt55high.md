---
tags:
  - area/strategy
  - type/reference
  - status/active
date: 2026-06-30
up: "[[_00-회수현황]]"
---
> 원본 파일: `D17. gpt 5.5 high. 20260630_JB_금융그룹_데이터_경계와_클린룸_운영모델.docx`
> 회수 2026-06-30 · ⚠️ 대외비 · **사용 모델: gpt 5.5 high (Deep Research)**

---

# JB LocalGuard OS를 위한 금융그룹 데이터 경계와 클린룸 운영모델

## 핵심 발견

### 계열사 데이터 경계

JB LocalGuard OS의 기본 전제는 “같은 그룹이니 자유롭게 공유”가 아니라, **식별형 내부경영관리 레인**과 **가명분석 레인**을 분리하는 것입니다. 전북은행·광주은행·JB우리캐피탈은 모두 JB금융지주 산하 회사이지만, 여전히 **별도 법인**이고, 개인신용정보는 원칙적으로 정보주체 동의 없이 타인에게 제공할 때마다 개별 동의가 필요합니다. 다만 금융지주회사법 제48조의2는 예외적으로 금융실명법과 신용정보법에도 불구하고, 금융지주회사등 내부에서 **신용위험관리 등 내부 경영관리 목적**으로 고객정보를 제공할 수 있게 합니다. 그러나 이 특례도 무제한이 아니라, **제공 가능한 정보 범위, 암호화, 분리보관, 이용기간·목적, 삭제, 고객정보관리인 승인** 같은 절차를 전제로 하며, 시행령은 이 내부 경영관리 목적에서 **“고객에게 상품 및 서비스를 소개하거나 구매를 권유하는 업무”를 제외**합니다. 즉, 그룹 내부 특례는 RM 리스크 탐지·내부통제·상품개발에는 쓸 수 있어도, 계열사 간 식별형 고객정보를 들고 와서 바로 마케팅/영업 액션을 하는 근거로 읽으면 안 됩니다. [\[1\]](https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351)

실무적으로 더 중요한 제한은 **“원장(master)”과 원본 식별자**입니다. 금융지주회사감독규정은 고객정보 제공 절차로서 **“고객정보 원장을 제공하지 않을 것”**, **승인받은 이용자 외 접근 불가**, **고유식별정보는 암호화 또는 별도 관리번호로 변환하여 제공할 것**을 요구합니다. 또한 공동 사무공간·공동 시스템을 쓰더라도, 법 제48조의2 등 법령에 따라 허용되거나 고객이 동의한 경우 외에는 **다른 계열사가 보유한 고객정보에 대한 접근을 금지**하고 적절한 내부통제장치를 두도록 요구합니다. 따라서 JB LocalGuard OS의 그룹 공통 레이어에는 원본 고객 원장, 주민등록번호, 계좌번호, 카드번호, 전체 거래내역, 상담 전문(全文) 같은 **원본 데이터가 올라가면 안 되고**, 최소한의 토큰·코드·요약만 올라가야 합니다. [\[2\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR)

기업여신정보는 개인신용정보와 동일하지 않지만, 법인 대표자·개인사업자·연대보증인·실질 지배인 관련 정보는 다시 개인신용정보 영역으로 흘러들 수 있습니다. 신용정보법은 개인신용정보를 “기업 및 법인에 관한 정보를 제외한 살아 있는 개인에 관한 신용정보”로 정의하면서도, 신용도 판단 정보와 신용거래능력 판단 정보의 범위를 넓게 규정합니다. 따라서 소상공인 여신에서는 **법인/개인사업자/대표자보증 구간을 분리 분류**해야 하고, “기업여신 데이터니까 자유롭다”는 식의 일괄 처리도 피해야 합니다. 이 부분은 법문 구조상 타당한 해석이지만, 개별 필드가 어느 범주에 속하는지는 상품 구조와 보증 형태에 따라 달라져 사전 법무 검토가 필요합니다. [\[3\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540)

### 동의·위탁·공동이용

실무 구분은 다섯 가지로 정리하는 것이 가장 안전합니다. 첫째, **공동이용**은 여러 회사가 동일 고객정보를 각자 자기 목적에 맞게 이용하는 구조입니다. 식별형 데이터를 여러 계열사가 자기 목적에 따라 쓰면 보통 정보주체에게 그 구조가 명확히 고지되어야 하며, 금융지주회사법 특례 바깥에서는 일반적인 제3자 제공·이용 동의 구조와 사실상 가깝게 작동합니다. 둘째, **제3자 제공**은 수령자가 자기 목적을 위해 데이터를 받는 구조로, 신용정보법 제32조가 기본 규율입니다. 셋째, **업무위탁**은 수탁자가 위탁자의 지시 범위 안에서만 처리하고 자기 목적 사용이 금지되는 구조입니다. 신용정보법 제17조는 개인신용정보 처리 위탁에 개인정보보호법 제26조를 준용하고, PIPA는 위탁계약 문서에 목적 외 처리 금지, 보호조치, 재위탁 제한, 감독과 책임 사항을 넣도록 요구합니다. 넷째, **가명정보 결합**은 서로 다른 보유자가 가진 가명정보를 행 단위로 결합하는 구조입니다. 이는 일반적으로 결합전문기관 또는 데이터전문기관 경로를 탑니다. 다섯째, **내부 통계·연구 목적 처리**는 같은 회사가 자기 데이터만 가명처리하여 통계·연구·공익적 기록보존 등에 사용하는 구조입니다. [\[4\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print)

PoC 단계에서 고객 동의를 최소화하려면, 가장 먼저 **식별형 실명데이터를 그룹 공통 레이어에서 사용하지 않는 설계**를 선택해야 합니다. 전북은행과 광주은행, JB우리캐피탈의 실제 고객을 쓰더라도, 각 계열사 내부에서는 기존 거래·리스크관리 목적 범위 안에서만 보고, 그룹 공통 Case에는 토큰화된 주체, 이벤트 코드, 위험 사유 코드, 근거 포인터만 올립니다. 외부 LLM이나 외부 RAG는 그보다 더 좁게, 아예 **비식별 요약**만 받게 해야 합니다. 이렇게 해두면 PoC에서 별도의 대규모 제3자 제공 동의를 새로 만들어야 하는 범위를 줄일 수 있습니다. 반대로, 계열사 간 식별형 고객 리스트를 합쳐서 영업 대상자를 추리거나 교차판매 후보를 산출하는 구조는, 금융지주회사법 특례 목적과 분리되고 마케팅 동의 이슈까지 겹치므로 PoC에 넣지 않는 편이 안전합니다. [\[5\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10)

현장 공시 관행도 이 구분을 뒷받침합니다. 전북은행은 그룹사 간 고객정보 취급방침과 그룹사 간 고객정보 제공 현황 조회 메뉴를 운영하고 있고, 광주은행과 JB우리캐피탈도 그룹사 고객정보 제공내역 조회나 신용정보 제공·이용 내역 조회 기능을 노출합니다. 이것은 그룹 내부 제공이 “안 보이게 일어나는 내부 행위”가 아니라, **목적·절차·통지·조회**의 대상이라는 뜻입니다. 광주은행은 특정 금융거래·상품·서비스를 신청한 경우 해당 거래 제공을 위한 **최소한의 정보만 제공**된다고 명시하고 있습니다. JB LocalGuard OS는 이 현실에 맞게 **목적코드·제공사유·조회이력·통지 여부**까지 시스템에 박아 넣어야 합니다. [\[6\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act)

### 클린룸·토큰화

가명정보와 클린룸은 동일한 개념이 아닙니다. **가명처리**는 데이터 자체의 식별가능성을 낮추는 법적·기술적 조치이고, **클린룸**은 그 데이터를 안전한 분석공간 안에서 합치고 분석하며, 밖으로는 승인된 산출물만 내보내는 운영 모델입니다. 개인정보보호법은 서로 다른 개인정보처리자 간 가명정보 결합을 전문기관이 수행하도록 하고, 결합된 정보를 외부로 반출하려면 가명정보 또는 익명정보로 다시 처리한 뒤 전문기관 승인까지 받도록 합니다. 금융위원회와 금융보안원 체계에서는 데이터전문기관이 금융·이종산업 데이터 결합을 담당하고, 원격 분석환경에서 **분석 결과물만 반출**할 수 있도록 운영하고 있습니다. 따라서 JB LocalGuard OS가 계열사 간 행 단위 결합, 외부 공공데이터 결합, 샘플링 결합, 자가결합 확장 등을 하려면, **그룹 내부 Case Hub**와 **전문기관 클린룸**을 혼동하면 안 됩니다. Case Hub는 내부 경영관리용 최소 공통 필드 저장소이고, 결합전문기관은 행 단위 가명결합과 반출심사를 담당하는 별도 통제점입니다. [\[7\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR)

JB LocalGuard OS의 권장 구조는 다음과 같습니다. **원천 시스템과 원본 PII·신용정보는 계열사별 안전구역에 보관**하고, 각 계열사 내부에 토큰화 게이트웨이와 프롬프트 프록시를 둡니다. 여기서 계좌번호·고객번호·휴대전화·정확주소·상담원 자유기재·원문 거래메모 같은 원본은 절대 외부 LLM으로 보내지지 않습니다. 대신 내부에서만 볼 수 있는 **원본 키 ↔ 토큰 키 매핑 테이블**을 분리 보관하고, 그룹 Case Hub에는 `subject_token`, `affiliate_id`, `domain`, `risk_code`, `score_band`, `evidence_pointer`, `event_time_bucket`, `approval_state` 같은 최소 필드만 올립니다. 금융지주회사감독규정상 고객정보 원장을 넘기지 말아야 하고, 고유식별정보는 변환·암호화해야 하므로, 이 구조는 법적 요구와도 잘 맞습니다. [\[8\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR)

외부 LLM을 쓰더라도, 그것은 **Case 초안 작성용 보조도구**로만 써야 합니다. 금융분야 인공지능 가이드라인은 AI가 금융회사의 업무 효율화와 의사결정을 지원하는 보조수단이며, 최종 책임은 금융회사와 임직원에게 있다고 설명하고, 데이터 수집·처리 단계에서 개인정보보호법과 신용정보법의 동의 요건 및 처리 제한을 준수해야 한다고 적시합니다. 같은 맥락에서 금융위·금융보안원은 AI 챗봇 보안성 체크리스트를 제시하며, 개인정보를 처리하지 않는 챗봇이라면 입력창에 개인정보를 입력하지 않도록 사전 안내하는 항목까지 제시했습니다. JB LocalGuard OS의 “고객 대상 행동은 사람 승인 전까지 차단” 설계는 단순 제품 철학이 아니라, 현재 감독·가이드 방향과 정합적입니다. [\[9\]](https://www.fsc.go.kr/no010101/87142)

### PoC 허용범위

PoC/MVP의 안전한 데이터 우선순위는 뚜렷합니다. **합성 데이터 → 공개 데이터 → 익명/집계 데이터 → 계열사 내부 가명 데이터 → 계열사 내부 실명 데이터** 순으로 진입해야 합니다. 실명 데이터는 RM 화면에서 사람이 최종 검토할 필요가 있는 마지막 단계에만 남겨두고, 모델 개발·프롬프트 생성·에이전트 협업·근거 저장은 가능한 한 가명·요약·코드화된 데이터로 먼저 굴려야 합니다. 전북은행 개인정보처리방침은 금융거래 관련 개인신용정보를 거래 종료일까지 목적 내 보유·이용하고, 종료 후에는 금융사고 조사·분쟁해결·민원처리·법령상 의무이행·리스크관리 업무로만 한정한다고 밝히고 있습니다. 이는 PoC에서 “실제 운영처럼 보여주기 위해 일단 다 넣어보자”식 설계가 가장 위험하다는 점을 시사합니다. [\[10\]](https://www.jbbank.co.kr/idvd_info_ptct_crdt_01.act)

도메인별 최소 필드는 다음처럼 보는 것이 실무적으로 맞습니다. **소상공인 여신**은 업종코드, 개인사업자/법인 구분, 익스포저 구간, 연체일수 버킷, 상환패턴 변화, 담보유형, 한도소진율, 최근 이상징후 코드 정도면 위험 Case를 만들 수 있습니다. **전세 위험**은 물건 토큰, 지역코드의 거친 단위, 전세금 구간, 만기 버킷, 담보가치 대비 위험 구간, 사고·권리변동 코드, 상환·갱신 이벤트 정도가 핵심입니다. **보이스피싱/이상거래**는 채널, 거래금액 구간, 신규 수취인 여부, 장치 위험점수, 위치이동 버킷, 이상행동 사유 코드, 지급정지·피해신고 이벤트 정도면 충분합니다. 반대로 세 도메인 모두에서 주민등록번호, 계좌번호 원문, 카드번호, 휴대폰번호, 정확 주소, 콜 녹취 원문, 상담원 메모 원문, 거래메모 전문, 신용조회사 원본 리포트 PDF, 신분증 이미지, 등기부 사본 원문은 그룹 공통 레이어와 외부 LLM 경로에서 제외하는 편이 안전합니다. 이는 최소수집 원칙, 고객정보 원장 금지, 원본 식별자 암호화/변환, 챗봇 PII 입력 제한이라는 여러 규범이 겹치는 지점입니다. [\[11\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357)

가명결합이 필요한 경우와 내부 가명처리로 충분한 경우도 분리해야 합니다. **한 계열사 내부에서 자기 보유 데이터만 써서 통계, 연구, 내부 검증을 하는 것**은 내부 가명처리만으로 충분한 경우가 많습니다. 반면 **전북은행의 거래·연체 패턴과 광주은행의 보이스피싱 징후, JB우리캐피탈의 상환행태를 같은 고객 축으로 행 단위 매칭해 그룹 공통 모델을 학습**하려면, 법적 근거를 금융지주회사법 내부 경영관리 특례로 좁게 잡아도 데이터 결합 통제와 반출 규칙이 필요하고, 외부 제3자 데이터나 공공데이터를 붙이거나 결합 결과를 넓게 활용하려면 데이터전문기관 경로가 더 안전합니다. 특히 결합 결과를 밖으로 내보낼 때는 전문기관 승인, 재식별 위험 점검, 최소 샘플수 기준, 집계형 산출물 우선 원칙을 기본값으로 두는 것이 좋습니다. [\[12\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR)

## 제품 적용 시사점

### 데이터 경계도

JB LocalGuard OS의 추천 경계도는 아래와 같습니다. 이 설계의 핵심은 **식별형 데이터는 각 계열사 내부**, **그룹 공통 Hub에는 토큰과 코드**, **외부 LLM에는 비식별 요약**만 흐르게 만드는 것입니다. 이 방식은 금융지주회사법 특례의 내부 경영관리 목적, 고객정보 원장 금지, 승인 기반 접근, 암호화·변환 의무, 그리고 AI 가이드라인의 보조수단 원칙을 동시에 만족시키는 방향입니다. [\[13\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10)

    [전북은행 원천계]
      코어뱅킹 / 여신 / 거래 / 상담 / 사후관리
            │
            ├─ 내부 RM 화면용 실명 조회
            └─ 토큰화 게이트웨이
                 ├─ 원본키 Vault
                 ├─ subject_token 생성
                 ├─ free-text 마스킹
                 └─ evidence_pointer 생성
                         │
    [광주은행 원천계] ───┼──► [그룹 Case Hub]
    [JB우리캐피탈 원천계] ─┘      - case_id
                                 - subject_token
                                 - domain
                                 - risk_code
                                 - score_band
                                 - event_time_bucket
                                 - evidence_pointer
                                 - approval_state
                                 - audit_ref
                                         │
                                         ├─ 내부 Agent 실행
                                         │    (식별정보 재주입 금지)
                                         │
                                         └─ Prompt Proxy
                                              ├─ 반출 스캔
                                              ├─ PII/신용정보 차단
                                              ├─ 토큰·요약만 외부 LLM 전송
                                              └─ 응답은 draft only
                                                       │
                                                 [인간 승인 게이트]
                                                       │
                                          고객 연락/조치/보고 실행

그룹 공통 객체는 네 개만 두는 것이 실무적으로 효율적입니다. **Case**에는 사건 식별자, 도메인, 위험등급, 상태, 담당자, 승인정보만 둡니다. **AgentRun**에는 어떤 에이전트가 어떤 입력을 받아 어떤 초안을 냈는지의 메타데이터와 출력 해시를 둡니다. **Evidence**에는 원문을 복제하지 말고 `evidence_pointer`, `reason_code`, `source_affiliate`, `source_system`, `time_bucket`, `document_hash`를 둡니다. **Audit**에는 접근자, 목적코드, 승인자, 반출스캔 결과, 프롬프트 다이제스트, 모델명, 인간 검토 결과를 남깁니다. 이렇게 하면 그룹 과잉공유를 막으면서도 “왜 이 Case가 떴는가”라는 설명가능성은 확보할 수 있습니다. [\[14\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR)

### 권한·승인·감사 요구사항

권한 모델은 **법인 단위 기본 분리 + 목적코드 기반 예외 허용**이 적절합니다. 전북은행 RM은 광주은행 원본 증빙을 직접 열람하지 못하고, 광주은행 데이터관리자 또는 그룹 고객정보관리인 승인 아래 **필요 최소 범위의 재식별 조회**만 가능하게 해야 합니다. 이 승인 구조는 금융지주회사법상 고객정보관리인 제도와 감독규정의 승인 중심 설계에 맞닿아 있습니다. 계열사 간 공동 사무공간·공동 시스템을 쓰는 경우에도 접근 차단과 별도 감독책임자 지정이 요구되므로, JB LocalGuard OS 역시 테넌트 분리와 감독자 대시보드를 기본값으로 두는 편이 맞습니다. [\[15\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act)

감사증거는 단순 접속로그만으로는 부족합니다. 최소한 **누가**, **어떤 목적코드로**, **어느 계열사 데이터에**, **어떤 승인번호를 근거로**, **어떤 필드를**, **어느 화면/에이전트/프롬프트에 사용했는지**, **외부 반출 스캐너가 무엇을 차단·허용했는지**, **최종 인간 승인자가 누구였는지**를 남겨야 합니다. 전북은행과 JB우리캐피탈, 광주은행이 모두 제공·이용 내역 조회나 그룹 고객정보 제공 내역 조회를 고객에게 제공한다는 점을 감안하면, 제품 내부의 감사로그도 **대내 통제용**과 **대고객 설명용** 두 층으로 설계하는 편이 좋습니다. [\[16\]](https://www.kjbank.com/ib20/mnu/BHPCSCN060500)

### 외부 LLM 비반출 설계

외부 LLM은 허용하되, **원본 PII·신용정보는 절대 비반출**로 설계하는 것이 핵심 차별점에 부합합니다. 구현 방식은 프롬프트 프록시 앞단에서 `PII detect → credit-info detect → free-text redaction → token substitution → policy check → outbound log`를 수행하고, 통과한 프롬프트만 외부 모델로 보냅니다. 예를 들어 “홍길동, 010-…, 전주시 … 아파트 전세계약, 계좌 …에서 3,800만원 이체”는 외부로 나가면 안 되고, “`CUST_TK_91`, 호남권 거주, 전세 만기 근접, 고액 이체 1회, 신규 수취인, 지점 상담 후 미승인 상태”처럼 바뀌어야 합니다. 이것은 법문에 적힌 “고객정보 원장 금지, 고유식별정보 변환, 목적 외 이용 금지”를 제품 구조로 번역한 것입니다. [\[17\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR)

LLM 출력도 통제해야 합니다. 에이전트가 내는 것은 **판단 초안, 행동 초안, 검증 초안**까지만 허용하고, 고객 연락·한도조정·추심 개시·계좌제한 같은 실행은 모두 **인간 승인 전 차단**해야 합니다. 금융위 AI 가이드라인은 AI가 보조수단이며 최종 책임은 금융회사와 임직원에게 있다고 보고, AI 기반 신용평가·여신심사·이상거래탐지와 챗봇 영역에서도 데이터 관리, 설명, 검증, 도입 후 모니터링을 강조합니다. JB LocalGuard OS의 장점은 바로 이 지점에서 “자동 실행형 AI”가 아니라 “승인 전 차단형 AI”로 심사 리스크를 낮출 수 있다는 데 있습니다. [\[18\]](https://www.fsc.go.kr/no010101/87142)

### 그룹 내 과잉공유 방지 설계

그룹 과잉공유를 막으려면, 제품 차원에서 **법적 목적**을 기술적 필터로 바꿔야 합니다. 첫째, 케이스 생성 규칙은 목적코드가 `위험관리`, `내부통제`, `사고조사`, `분쟁·민원`, `상품·서비스 개발`, `성과관리`, `위탁업무 수행` 중 무엇인지 반드시 가져야 하고, `마케팅`, `상품권유`, `교차판매` 코드로는 식별형 공유를 허용하지 않아야 합니다. 둘째, 공통 Hub에는 **정확주소 대신 지역코드**, **정확금액 대신 금액구간**, **정확일시 대신 시간버킷**, **상담원 메모 대신 표준 사유코드**만 저장해야 합니다. 셋째, 계열사 간 공동 학습이 필요하면 먼저 **행 단위 공유 대신 연합학습·모델 파라미터 교환·집계형 피처 통합**으로 가능한지 검토하고, 이것으로 안 될 때만 데이터전문기관 결합으로 올라가는 게 좋습니다. PIPC와 KISA 자료는 PET로서 연합학습, 합성데이터, 차분프라이버시, 보호된 분석환경을 반복적으로 언급하고 있어, JB LocalGuard OS의 추가 방어선으로 활용할 수 있습니다. [\[19\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10)

## 운영 체크리스트

| 데이터 흐름 | 가능/조건부/금지 | 필요한 동의·위탁·고지 | 처리 위치 | 반출 가능 산출물 | 감사증거 |
|----|----|----|----|----|----|
| 전북은행 내부 원천데이터 → 전북은행 내부 RM 화면 | 가능 | 기존 거래·리스크관리 목적 범위 내 내부 이용. 별도 외부 제공 아님. [\[20\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR) | 전북은행 내부망 | 없음 | 사용자 ID, 조회사유, 사건번호, 열람필드 |
| 광주은행 내부 원천데이터 → 광주은행 내부 이상거래 탐지/검증 | 가능 | 기존 금융거래 설정·유지·사고조사 목적 범위. [\[20\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR) | 광주은행 내부망 | 없음 | 모델 버전, 탐지규칙, 담당자 승인 |
| JB우리캐피탈 원천데이터 → 그룹 Case Hub | 조건부 | 금융지주회사법 제48조의2 목적에 해당해야 하며, 내부 경영관리 목적코드, 고객정보관리인 승인, 원장 미제공, 암호화/변환 필요. [\[21\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) | 계열사 토큰화 구역 → 그룹 Hub | subject_token, risk_code, score_band, evidence_pointer | 승인번호, 목적코드, 제공필드 목록, 제공자·수령자 |
| 계열사 상담기록 원문 → 그룹 Case Hub | 원칙적 금지 | 자유기재 원문은 과잉공유·재식별 위험이 높음. 표준 사유코드·마스킹 요약으로 대체 권고. 목적상 불가피하면 별도 승인과 국소 열람만. [\[22\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) | 계열사 내부 클린룸 | 표준화 요약, reason_code | 원문 보관 위치, 요약 생성기록, 재식별 통제 |
| 계열사 간 식별형 고객리스트 결합하여 교차판매 대상 산출 | 금지에 가깝고 동의 없으면 부적절 | 금융지주 특례 목적에서 상품 소개·구매 권유는 제외. 마케팅/교차판매는 별도 동의 구조 검토 필요. [\[23\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) | 사용 금지 권고 | 없음 | 차단 로그, 정책 룰 ID |
| 계열사 내부 가명데이터 → 내부 통계/연구/검증 | 가능 | 동의 없이 가능하나 가명처리, 추가정보 분리보관, 보안대책, 기록관리 필요. [\[24\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) | 각 계열사 내부 분석구역 | 집계치, 검증리포트, 모델 성능지표 | 가명처리 이력, 적정성 검토, 보유기간·파기 기록 |
| 전북은행 가명데이터 + 광주은행 가명데이터 행 단위 결합 | 조건부 | 법적 목적과 절차 명확화 필요. 넓은 통계·연구·외부데이터 결합이면 결합전문기관/데이터전문기관 경로 권장. [\[25\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) | 전문기관 클린룸 우선 | 결합 후 승인된 집계·스코어·설명근거 | 결합신청서, 샘플링/자가결합 여부, 반출승인서 |
| 계열사 가명데이터 + 공공/외부 데이터 결합 | 조건부 | 전문기관 결합 및 반출심사 필요성 높음. [\[26\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) | 데이터전문기관 | 집계표, 세그먼트별 위험지표, 승인된 모델 피처 | 결합기관 승인, 반출심사 결과, 재식별 위험 점검 |
| 그룹 Case 요약 → 외부 LLM API | 조건부 | 원본 PII·신용정보 비반출, 프롬프트 프록시·반출스캔·토큰화·인간승인 전 차단 필요. [\[27\]](https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142) | 그룹 프록시 → 외부 API | 비식별 초안, 설명문 초안, 체크리스트 초안 | 프롬프트 해시, 차단사유, 모델명, 응답 검토자 |
| 원본 주민번호·계좌번호·정확주소·거래메모 전문 → 외부 LLM | 금지 | 제3자 제공/외부 처리 리스크가 매우 큼. 제품 차원에서 정책 차단 권고. [\[28\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print) | 반출 금지 | 없음 | 정책 위반 차단 로그 |
| 외부 개발사/SaaS → 실명 고객 개인신용정보 처리 | 조건부 | 처리위탁 구조로만 설계, 목적 외 처리 금지·보호조치·재위탁 제한·공개 필요. 외부 LLM에는 실명 데이터 금지 권고. [\[29\]](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000460853) | 국내 위탁 환경 또는 내부망 | 평가 리포트, 운영지표 | 위탁계약, 수탁자 공개, 재위탁 승인, 점검기록 |
| 전문기관 원격분석 환경 → 그룹으로 결과 반출 | 조건부 | 반출심사 통과 결과물만 가능. [\[30\]](https://www.fsec.or.kr/bbs/110) | 데이터전문기관 | 분석결과물만 | 반출 신청서, 반출 승인 내역, 결과물 해시 |

## 근거표

| 주장 | 출처 URL | 발행처·날짜 | 신뢰도 | 원문 인용 |
|----|----|----|----|----|
| 개인정보 처리에서 특별법이 있으면 그 법이 우선한다. [\[31\]](https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351) | https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351 | 법제처 국가법령정보센터·개인정보 보호법 \[현행법\] | 1차 | “개인정보의 처리 및 보호에 관하여 다른 법률에 특별한 규정이 있는 경우를 제외하고는 이 법에서 정하는 바에 따른다.” |
| 개인신용정보는 원칙적으로 타인 제공 시 개별 동의가 필요하다. [\[32\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print) | https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print | 법제처 국가법령정보센터·신용정보법 \[시행 2024-08-14\] | 1차 | “개인신용정보를 타인에게 제공하려는 경우에는 … 개인신용정보를 제공할 때마다 미리 개별적으로 동의를 받아야 한다.” |
| 개인신용정보의 이용은 거래 설정·유지 판단, 동의받은 목적, 직접 제공받은 목적 등으로 한정된다. [\[33\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR) | https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR | 법제처 국가법령정보센터·신용정보법 \[시행 2024-08-14\] | 1차 | “개인신용정보는 다음 각 호의 어느 하나에 해당하는 경우에만 이용하여야 한다.” |
| 금융지주회사법은 금융실명법·신용정보법에도 불구하고 그룹 내부 경영관리 목적의 고객정보 제공을 허용한다. [\[34\]](https://law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR) | https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR | 법제처 국가법령정보센터·금융지주회사법 \[현행법\] / 전북은행 정책페이지 2021-07-27 | 1차 | “「금융실명거래…」 및 「신용정보의 이용 및 보호에 관한 법률」 제32조·제33조에도 불구하고 … 내부 경영관리상 이용하게 할 목적으로 제공할 수 있다.” |
| 다만 그 내부 경영관리 목적에는 상품 소개·구매 권유가 포함되지 않는다. [\[35\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) | https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10 | 법제처 국가법령정보센터·금융지주회사법 시행령 | 1차 | “고객에게 상품 및 서비스를 소개하거나 구매를 권유하는 업무가 아닌 업무로서 … 신용위험관리 … 고객분석과 상품 및 서비스의 개발 …” |
| 그룹 내 고객정보 제공은 범위·암호화·분리보관·이용기간·삭제 같은 절차 요건을 따른다. [\[36\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) | https://www.jbbank.co.kr/cstm_info_ptct_hndl.act | 전북은행·고객정보취급방침 2021-07-27 | 1차 | “제공할 수 있는 정보의 범위 / 고객정보의 암호화 등 처리방법 / 고객정보의 분리보관 / 고객정보의 이용기간 및 이용목적 / 이용기간 경과시 고객정보의 삭제” |
| 감독규정은 고객정보 원장 제공을 금지하고, 승인받은 이용자 외에는 접근 불가하게 하며, 고유식별정보는 암호화·변환을 요구한다. [\[37\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR) | https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR | 법제처 국가법령정보센터·금융지주회사감독규정 | 1차 | “고객정보 원장을 제공하지 않을 것” / “승인을 받은 이용자 외에는 … 접근이나 활용이 불가능하도록 암호화” / “고유식별정보는 … 변환하여 제공할 것” |
| 공동 사무공간·공동 시스템에서도 허용 또는 동의 없는 고객정보 접근은 금지된다. [\[38\]](https://www.law.go.kr/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+1%EC%9D%986%5D+%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%93%B1%EC%9D%98+%EA%B3%B5%EB%8F%99%EA%B4%91%EA%B3%A0+%EB%B0%8F+%EC%82%AC%EB%AC%B4%EA%B3%B5%EA%B0%84+%EB%93%B1+%EC%8B%9C%EC%84%A4%EC%9D%98+%EA%B3%B5%EB%8F%99%EC%82%AC%EC%9A%A9%EA%B8%B0%EC%A4%80%28%EC%A0%9C24%EC%A1%B0+%EA%B4%80%EB%A0%A8%29&flSeq=131828169) | https://www.law.go.kr/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+1%EC%9D%986%5D+%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%93%B1%EC%9D%98+%EA%B3%B5%EB%8F%99%EA%B4%91%EA%B3%A0+%EB%B0%8F+%EC%82%AC%EB%AC%B4%EA%B3%B5%EA%B0%84+%EB%93%B1+%EC%8B%9C%EC%84%A4%EC%9D%98+%EA%B3%B5%EB%8F%99%EC%82%AC%EC%9A%A9%EA%B8%B0%EC%A4%80%28%EC%A0%9C24%EC%A1%B0+%EA%B4%80%EB%A0%A8%29&flSeq=131828169 | 법제처 국가법령정보센터·금융지주회사등의 공동사용기준 \[PDF\] | 1차 | “법 제48조의2 등 법령에 따라 허용되거나 고객이 동의한 경우 외에는 … 고객정보를 제공하거나 외부로 유출하는 행위를 하여서는 아니되며” |
| 위탁은 수탁자의 자기 목적 사용이 금지되는 구조여야 하고, 문서·공개·재위탁 통제가 필요하다. [\[29\]](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000460853) | https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000460853 | 법제처 국가법령정보센터·신용정보법/개인정보보호법·현행법 | 1차 | “개인신용정보의 처리 위탁에 대해서는 「개인정보 보호법」 제26조 … 준용” / “위탁업무 수행 목적 외 개인정보의 처리 금지” |
| 가명정보는 동의 없이 통계작성·과학적 연구·공익적 기록보존에 처리할 수 있다. [\[39\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) | https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357 | 법제처 국가법령정보센터·개인정보 보호법 \[현행법\] | 1차 | “개인정보처리자는 통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 정보주체의 동의 없이 가명정보를 처리할 수 있다.” |
| 신용정보법 체계에서도 가명정보 제공은 동의 예외로 인정되고, 시장조사 등 상업적 통계도 포함된다. [\[40\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540) | https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540 | 법제처 국가법령정보센터·신용정보법 / 제정·개정이유 | 1차 | “통계작성, 연구, 공익적 기록보존 등을 위하여 가명정보를 제공하는 경우. 이 경우 통계작성에는 시장조사 등 상업적 목적…” |
| 서로 다른 개인정보처리자 간 가명정보 결합은 전문기관이 수행하고, 반출은 승인 대상이다. [\[41\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) | https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR | 법제처 국가법령정보센터·개인정보 보호법/시행령/고시 | 1차 | “서로 다른 개인정보처리자 간의 가명정보의 결합은 … 전문기관이 수행한다.” / “반출하려는 개인정보처리자는 … 전문기관의 장의 승인을 받아야 한다.” |
| 금융 데이터 결합 제도는 샘플링 결합과 자가결합 확대를 허용했지만, 여전히 전문기관 통제가 전제다. [\[42\]](https://www.fsc.go.kr/no010101/77193?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) | https://www.fsc.go.kr/no010101/77193 | 금융위원회·보도자료 2022-01-06 / 2022-07-06 | 1차 | “샘플링 결합 절차 도입” / “데이터 자가결합 허용요건 확대” / “정보주체 동의없이도 샘플링된 데이터만 … 전송하여 결합” |
| 금융보안원 데이터전문기관/금융데이터거래소는 원격 분석환경에서 분석 결과물만 반출하게 한다. [\[30\]](https://www.fsec.or.kr/bbs/110) | https://www.fsec.or.kr/bbs/109 | 금융보안원·안내페이지 \[현행\] | 1차 | “분석 결과물만 반출할 수 있도록 원격 분석환경 서비스 제공” / “분석결과 반출 신청 건에 대하여 … 반출 심사” |
| 금융 AI 가이드라인은 데이터 처리에서 개인정보보호법·신용정보법 준수를 요구하고, AI를 보조수단으로 본다. [\[43\]](https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142) | https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142 | 금융위원회·금융분야 인공지능 가이드라인 2024-05-02 | 1차 | “데이터 수집·처리 과정에서 개인정보보호법, 신용정보법상의 동의 요건과 처리 제한을 준수” / “의사결정을 지원하는 보조수단” |
| AI 챗봇 보안 체크리스트는 불필요한 PII 입력 자체를 막도록 요구한다. [\[44\]](https://www.fsc.go.kr/no010101/79825?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) | https://www.fsc.go.kr/no010101/79825 | 금융위원회·보도자료 2023-04-17 | 1차 | “AI 챗봇 서비스에 대한 보안성 체크리스트” / “개인정보를 처리하지 않는 챗봇의 경우 입력창에 개인정보를 입력하지 않도록 … 안내” |
| 광주은행은 특정 금융거래 제공을 위한 최소한의 정보만 제공한다고 명시하고, 그룹사 제공내역 조회를 운영한다. [\[45\]](https://www.kjbank.com/ib20/mnu/BHPCSCN060500) | https://www.kjbank.com/ib20/mnu/BHPCSCN060500 | 광주은행·개인정보보호활용체제 \[현행\] | 1차 | “특정 금융거래·상품·서비스를 신청하는 경우에 한해 … 최소한의 정보만 제공” / “그룹사고객정보제공내역조회” |
| 전북은행은 그룹사 간 고객정보 제공현황 조회와 연 1회 이상 고객통지를 명시한다. [\[36\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) | https://www.jbbank.co.kr/cstm_info_ptct_hndl.act | 전북은행·고객정보취급방침 2021-07-27 | 1차 | “그룹사간고객정보제공현황조회” / “연1회 이상 통지하는 등 고객통지의무에 최선을 다 할 것입니다” |
| JB우리캐피탈도 그룹 내 고객정보 제공 내역 조회와 신용정보 제공·이용내역 조회를 노출한다. [\[46\]](https://www.wooricap.com/cst/plc/JCSTPLC0005.do) | https://www.wooricap.com/cst/plc/JCSTPLC0005.do | JB우리캐피탈·약관 및 정책 페이지 \[현행\] | 1차 | “그룹 내 고객정보 제공 내역 조회” / “신용정보 제공/이용내역조회” |
| PET 자료는 연합학습·차분프라이버시·보호된 분석환경을 개인정보보호 강화기술로 제시한다. [\[47\]](https://www.privacy.go.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000843238&fileSn=1) | https://www.privacy.go.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000843238&fileSn=1 | 개인정보보호위원회·KISA 동향자료 2021-08-31 / 2024-05-28 | 1차 | “연합학습(Federal Learning)” / “차분프라이버시(Differential Privacy)” / “안전한 실행환경으로 개인정보보호를 강화” |

## 갭·\[미검증\]

공개자료만으로는 **JB금융그룹 내부의 실제 고객정보 제공 절차서, 데이터 카탈로그, 고객정보관리인 승인 워크플로, 계열사별 위탁계약 표준조항, 내부 정보보호등급표, 망분리·클라우드 구체 구조, 외부 LLM 도입 계약 조건**까지는 확인되지 않았습니다. 따라서 아래 항목은 PoC 시작 전에 반드시 법무·준법·정보보호·현업이 함께 확인해야 합니다. [\[48\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act)

첫째, **금융지주회사법 특례를 어느 업무까지 JB LocalGuard OS에 태울 수 있는지**가 핵심입니다. 리스크 탐지·내부통제·사고조사·상품개발 보조는 비교적 근거가 강하지만, RM의 후속 행동 추천이 실질적으로 상품권유나 영업권유로 평가될 여지가 있는지, 또는 연체관리·사후관리 이벤트가 영업행위와 얼마나 구분되는지는 개별 시나리오별로 따져야 합니다. 이는 제품의 액션 라이브러리와 승인 단계 정의에 직접 연결됩니다. 이 부분은 법령 구조상 해석 가능하지만, **행위 시나리오별 내부 법률의견서**가 필요합니다. [\[49\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10)

둘째, **가명결합과 그룹 내부 공유의 경계**도 운영 전에 정해야 합니다. 전북은행·광주은행·JB우리캐피탈이 같은 지주 산하이므로 특정 범위의 고객정보 공유가 허용되더라도, 그것이 곧바로 “아무 행 단위 결합 모델도 그룹 내부에서 자유롭게 돌릴 수 있다”는 뜻은 아닙니다. 특히 외부 공공데이터·통신데이터·부동산 데이터와 붙이거나, 결합 결과를 넓은 범위로 활용하려는 경우에는 데이터전문기관 경로가 더 안전할 수 있습니다. 어떤 시나리오를 **지주 특례 레인**으로 처리하고, 어떤 시나리오를 **전문기관 결합 레인**으로 올릴지 정책 문서로 먼저 고정해야 합니다. 공개자료만으로는 JB의 실제 데이터 범위가 확인되지 않아 이 부분은 `[미검증]`입니다. [\[50\]](https://law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR)

셋째, **외부 LLM의 법적 지위**도 계약별로 달라질 수 있습니다. 단순 API 호출인지, 저장·학습 비활성화 조건인지, 수탁자 구조인지, 해외 재이전 가능성이 있는지, 로그가 어디에 남는지에 따라 위탁·제3자 제공·국외이전 검토가 달라집니다. 본 보고서는 원본 PII·신용정보 비반출을 전제로 외부 LLM 사용을 설계했지만, 실제 계약서와 아키텍처를 보지 못했으므로 이 부분은 제품 심사 전 **계약서·DPA·기술문서 점검 필요** 항목입니다. [\[51\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print)

넷째, **소상공인/개인사업자 데이터의 법적 분류**는 상품별로 달라질 수 있습니다. 대표자보증, 공동차주, 개인사업자 대출, 법인 대출, 임대인·임차인 정보가 혼재하면 동일 필드라도 개인신용정보성 여부가 달라질 수 있습니다. 본 보고서는 법률 정의에 따라 보수적으로 설계하라고 권고했지만, 실제 필드 단위 판단은 `[미검증]`이며, PoC 필드셋 확정 전에 표준 분류표를 만들어야 합니다. [\[3\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540)

다섯째, **반출 기준의 정량 문턱값**—예를 들어 최소 샘플 수, 셀 억제 기준, 재식별 위험 허용치, 요약 길이 제한, 프롬프트 차단 룰—은 공개자료만으로 JB에 맞는 수치를 단정할 수 없습니다. 법령과 가이드라인은 승인·적정성·안전조치를 요구하지만, 구체 수치는 각 기관 정책과 전문기관 심사기준에 크게 좌우됩니다. 따라서 PoC 전에 최소한 `k-익명형 집계 기준`, `희소 셀 마스킹 기준`, `토큰 치환 규칙`, `외부 LLM 허용 속성 목록`, `반출물 승인 체크리스트`를 내부 기준으로 제정해야 합니다. 이 수치 기준은 공개자료 기준으로는 `[미검증]`입니다. [\[52\]](https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000235874)

------------------------------------------------------------------------

[\[1\]](https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351) [\[31\]](https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351) https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351

<https://law.go.kr/LSW/lsInfoP.do?lsiSeq=270351>

[\[2\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR) [\[8\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR) [\[14\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR) [\[17\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR) [\[37\]](https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR) https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR

<https://www.law.go.kr/LSW/admRulSideInfoP.do?admRulSeq=2100000007197&chrClsCd=010202&docCls=jo&joBrNo=02&joChgYn=N&joNo=0024&langType=Ko&urlMode=admRulScJoRltInfoR>

[\[3\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540) [\[40\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540) https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540

<https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=001540>

[\[4\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print) [\[28\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print) [\[32\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print) https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print

<https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=001540&lsJoLnkSeq=1000722082&print=print>

[\[5\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) [\[13\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) [\[19\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) [\[23\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) [\[35\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) [\[49\]](https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10) https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10

<https://www.law.go.kr/LSW//lsLinkProc.do?admRulNm=%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95&chrClsCd=010202&datClsCd=010102&gubun=admRul&joNo=002702001&lsId=36056&lsNm=%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9&mode=10>

[\[6\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) [\[15\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) [\[21\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) [\[36\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) [\[48\]](https://www.jbbank.co.kr/cstm_info_ptct_hndl.act) https://www.jbbank.co.kr/cstm_info_ptct_hndl.act

<https://www.jbbank.co.kr/cstm_info_ptct_hndl.act>

[\[7\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) [\[12\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) [\[25\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) [\[26\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) [\[41\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR) https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR

<https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=03&joNo=0028&lsiSeq=270351&urlMode=lsScJoRltInfoR>

[\[9\]](https://www.fsc.go.kr/no010101/87142) [\[18\]](https://www.fsc.go.kr/no010101/87142) https://www.fsc.go.kr/no010101/87142

<https://www.fsc.go.kr/no010101/87142>

[\[10\]](https://www.jbbank.co.kr/idvd_info_ptct_crdt_01.act) https://www.jbbank.co.kr/idvd_info_ptct_crdt_01.act

<https://www.jbbank.co.kr/idvd_info_ptct_crdt_01.act>

[\[11\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) [\[22\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) [\[24\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) [\[39\]](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357) https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357

<https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&lsId=011357>

[\[16\]](https://www.kjbank.com/ib20/mnu/BHPCSCN060500) [\[45\]](https://www.kjbank.com/ib20/mnu/BHPCSCN060500) https://www.kjbank.com/ib20/mnu/BHPCSCN060500

<https://www.kjbank.com/ib20/mnu/BHPCSCN060500>

[\[20\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR) [\[33\]](https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR) https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR

<https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0033&lsiSeq=260423&urlMode=lsScJoRltInfoR>

[\[27\]](https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142) [\[43\]](https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142) https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142

<https://www.fsc.go.kr/comm/getFile?fileNo=6&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87142>

[\[29\]](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000460853) https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000460853

<https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000460853>

[\[30\]](https://www.fsec.or.kr/bbs/110) https://www.fsec.or.kr/bbs/110

<https://www.fsec.or.kr/bbs/110>

[\[34\]](https://law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR) [\[50\]](https://law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR) https://law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR

<https://law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0048&lsiSeq=254783&urlMode=lsScJoRltInfoR>

[\[38\]](https://www.law.go.kr/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+1%EC%9D%986%5D+%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%93%B1%EC%9D%98+%EA%B3%B5%EB%8F%99%EA%B4%91%EA%B3%A0+%EB%B0%8F+%EC%82%AC%EB%AC%B4%EA%B3%B5%EA%B0%84+%EB%93%B1+%EC%8B%9C%EC%84%A4%EC%9D%98+%EA%B3%B5%EB%8F%99%EC%82%AC%EC%9A%A9%EA%B8%B0%EC%A4%80%28%EC%A0%9C24%EC%A1%B0+%EA%B4%80%EB%A0%A8%29&flSeq=131828169) https://www.law.go.kr/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+1%EC%9D%986%5D+%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%93%B1%EC%9D%98+%EA%B3%B5%EB%8F%99%EA%B4%91%EA%B3%A0+%EB%B0%8F+%EC%82%AC%EB%AC%B4%EA%B3%B5%EA%B0%84+%EB%93%B1+%EC%8B%9C%EC%84%A4%EC%9D%98+%EA%B3%B5%EB%8F%99%EC%82%AC%EC%9A%A9%EA%B8%B0%EC%A4%80%28%EC%A0%9C24%EC%A1%B0+%EA%B4%80%EB%A0%A8%29&flSeq=131828169

<https://www.law.go.kr/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+1%EC%9D%986%5D+%EA%B8%88%EC%9C%B5%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC%EB%93%B1%EC%9D%98+%EA%B3%B5%EB%8F%99%EA%B4%91%EA%B3%A0+%EB%B0%8F+%EC%82%AC%EB%AC%B4%EA%B3%B5%EA%B0%84+%EB%93%B1+%EC%8B%9C%EC%84%A4%EC%9D%98+%EA%B3%B5%EB%8F%99%EC%82%AC%EC%9A%A9%EA%B8%B0%EC%A4%80%28%EC%A0%9C24%EC%A1%B0+%EA%B4%80%EB%A0%A8%29&flSeq=131828169>

[\[42\]](https://www.fsc.go.kr/no010101/77193?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) https://www.fsc.go.kr/no010101/77193?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=

<https://www.fsc.go.kr/no010101/77193?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=>

[\[44\]](https://www.fsc.go.kr/no010101/79825?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=) https://www.fsc.go.kr/no010101/79825?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=

<https://www.fsc.go.kr/no010101/79825?curPage=&srchBeginDt=&srchCtgry=&srchEndDt=&srchKey=&srchText=>

[\[46\]](https://www.wooricap.com/cst/plc/JCSTPLC0005.do) https://www.wooricap.com/cst/plc/JCSTPLC0005.do

<https://www.wooricap.com/cst/plc/JCSTPLC0005.do>

[\[47\]](https://www.privacy.go.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000843238&fileSn=1) https://www.privacy.go.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000843238&fileSn=1

<https://www.privacy.go.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000843238&fileSn=1>

[\[51\]](https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print) https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print

<https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsId=011357&lsJoLnkSeq=900079061&print=print>

[\[52\]](https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000235874) https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000235874

<https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000235874>
