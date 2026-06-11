const navigation = [
  {
    section: "Command",
    items: [
      { id: "dashboard", icon: "⌂", label: "대시보드", countKey: "dashboard" },
      { id: "inbox", icon: "!", label: "알림함", countKey: "inbox" },
    ],
  },
  {
    section: "Work",
    items: [
      { id: "cases", icon: "C", label: "케이스 목록", countKey: "cases" },
      { id: "approvals", icon: "A", label: "승인 큐", countKey: "approvals" },
      { id: "runs", icon: "R", label: "AgentRun", countKey: "runs" },
      { id: "jeonse", icon: "J", label: "전세 Shield", countKey: "jeonse" },
      { id: "goals", icon: "G", label: "운영 목표", countKey: "goals" },
    ],
  },
  {
    section: "Institution",
    items: [
      { id: "agents", icon: "T", label: "에이전트 팀", countKey: "agents" },
      { id: "orgchart", icon: "O", label: "Agent 조직도", countKey: "orgchart" },
      { id: "skills", icon: "K", label: "Skill Registry", countKey: "skills" },
      { id: "routines", icon: "H", label: "Heartbeat", countKey: "routines" },
      { id: "activity", icon: "L", label: "처리 이력", countKey: "activity" },
      { id: "budget", icon: "₩", label: "API 예산", countKey: "budget" },
      { id: "settings", icon: "S", label: "설정", countKey: "settings" },
    ],
  },
];

const evidence = [
  {
    id: "jb-ai-mou",
    type: "JB Official",
    title: "JB금융그룹-네이버클라우드 AI 업무협약",
    source: "JB금융그룹",
    url: "https://www.jbfg.com/ko/prcenter/press/detail/17.do",
    implication:
      "기업대출 상담, 심사, 사후관리에서 상담 기록과 문서 데이터를 구조화하고 승인 판단 근거를 생성하는 방향과 연결된다.",
  },
  {
    id: "jb-network",
    type: "JB Official",
    title: "JB금융그룹 계열사와 지역 금융 접점",
    source: "JB금융그룹",
    url: "https://www.jbfg.com/ko/about/network.do",
    implication:
      "전북은행, 광주은행, JB우리캐피탈을 중심으로 지역 고객과 금융 사후관리 접점이 있다.",
  },
  {
    id: "smallbiz-burden",
    type: "News",
    title: "소상공인 금융비용 부담과 연체율 상승",
    source: "쿠키뉴스",
    url: "https://www.kukinews.com/article/view/kuk202602170018",
    implication:
      "금융비용과 내수 침체가 동시에 부담으로 나타나 cashflow triage가 필요하다.",
  },
  {
    id: "rate-shock",
    type: "News",
    title: "자영업자 대출 잔액과 금리 민감도",
    source: "연합뉴스",
    url: "https://www.yna.co.kr/view/AKR20260328043600002",
    implication:
      "금리 상승과 다중채무 부담이 지역 사업자 상환 위험으로 전이될 수 있다.",
  },
  {
    id: "fraud-ai",
    type: "Policy",
    title: "보이스피싱 AI 플랫폼과 고도화된 사기 위험",
    source: "금융위원회",
    url: "https://www.fsc.go.kr/no010101/86063",
    implication:
      "딥페이크와 음성변조 등 AI 악용 사기에 대해 Fraud Shield Agent가 외부 경보를 연결해야 한다.",
  },
  {
    id: "digital-gap",
    type: "News",
    title: "고령층 디지털 금융 역량 격차",
    source: "브라보마이라이프",
    url: "https://bravo.etoday.co.kr/view/atc_view/19103",
    implication:
      "고객 직접 자동화보다 RM 승인형 안내와 쉬운 콜백 스크립트가 적합하다.",
  },
  {
    id: "hug-safe-jeonse",
    type: "Official",
    title: "HUG 안심전세 서비스",
    source: "주택도시보증공사",
    url: "https://www.khug.or.kr/jeonse/web/s01/s010102.jsp",
    implication:
      "시세, 전세가율, 임대인 정보, 셀프테스트, 보증가입 가능성 확인을 전세 위험 판단 근거로 연결한다.",
  },
  {
    id: "molit-jeonse-policy",
    type: "Policy",
    title: "전세사기 예방과 보증 기준 정책",
    source: "국토교통부",
    url: "https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?id=95087856",
    implication:
      "전세가율, 권리관계, 특약, 보증보험 확인 항목을 고객 안내 체크리스트에 반영한다.",
  },
];

const skillRack = [
  ["case-os-core", "orchestration", "Case 생성, 상태 전이, 담당 Agent 배정", "internal only", "low"],
  ["evidence-harvest", "research", "기사, 공식 발표, 상담 노트에서 위험 근거 수집", "internal only", "low"],
  ["source-ranker", "research", "공식성, 최신성, 금융 관련성을 점수화", "internal only", "low"],
  ["pain-classifier", "reasoning", "cashflow, rate, fraud, policy, digital-barrier 분류", "internal only", "low"],
  ["cashflow-stress", "finance", "매출 둔화, 금리 부담, 상환 압박 판단", "RM review", "medium"],
  ["rate-relief", "finance", "금리 충격과 대환 검토 필요성 판단", "RM review", "medium"],
  ["policy-match", "finance", "정책금융, 대환, 필요 서류 후보 매칭", "RM review", "medium"],
  ["document-checklist", "operations", "상담 전 필요한 서류와 확인 질문 생성", "RM review", "low"],
  ["fraud-shield", "risk", "보이스피싱, 딥페이크, 이상 콜백 위험 차단", "blocks external action", "high"],
  ["do-not-contact-rule", "risk", "고위험 fraud case의 외부 고객 접촉 금지", "mandatory", "high"],
  ["notification-brief", "communication", "RM 메모와 고객 콜백 스크립트 작성", "approval required", "medium"],
  ["compliance-guard", "compliance", "과장 표현, 개인정보, 준법 리스크 검토", "mandatory", "high"],
  ["approval-gate", "control", "외부 행동 전 사람 승인 요구", "mandatory", "high"],
  ["audit-ledger", "control", "근거, 판단, 행동, 승인 내역 기록", "mandatory", "low"],
  ["portfolio-signal", "analytics", "지점/계열사별 위험 클러스터 집계", "internal only", "low"],
  ["jeonse-price-ratio", "jeonse-risk", "매매 추정가 대비 전세보증금 비율과 과다 전세가율 위험 산정", "RM review", "high"],
  ["local-market-compare", "jeonse-risk", "주변 시세 대비 보증금 과다 여부 비교", "RM review", "medium"],
  ["registry-rights-scan", "legal-risk", "근저당, 압류, 가압류, 신탁등기 등 권리관계 위험 추출", "human/legal review", "high"],
  ["ownership-transfer-delta", "legal-risk", "단기간 소유권 이전, 매매가 급변, 임대인 변경 신호 탐지", "human/legal review", "high"],
  ["guarantee-feasibility", "guarantee", "보증보험 가입 불가 가능성, 보증 한도, 선순위 채권 확인 필요성 분류", "RM review", "high"],
  ["tenant-asset-exposure", "asset-risk", "총자산 대비 보증금 비중과 계약 실패 시 손실 위험도 산정", "advisor review", "medium"],
  ["housing-cost-burden", "asset-risk", "월 소득 대비 주거비와 전세대출 상환 부담 분석", "advisor review", "medium"],
  ["pre-contract-checklist", "contract", "계약 전 확인 서류, 임대인·중개사 확인 항목 생성", "approval required", "medium"],
  ["special-clause-drafter", "contract", "근저당 말소, 보증보험, 잔금 조건 관련 특약 문구 초안 제안", "legal review", "high"],
  ["bank-linkage-brief", "banking", "전세대출 상담, 보증보험 안내, 위험 매물 경고, 안전 계약 가이드 연결", "RM approval", "medium"],
].map(([slug, type, purpose, approval, risk]) => ({
  slug,
  type,
  purpose,
  approval,
  risk,
  enabled: true,
}));

const agents = [
  {
    id: "orchestrator",
    name: "LocalGuard Orchestrator",
    type: "orchestrator",
    status: "running",
    reportsTo: "Human RM Lead",
    budget: 180000,
    spent: 42000,
    heartbeat: "38s",
    queue: 4,
    currentCase: "전주 중앙로 카페",
    skills: ["case-os-core", "approval-gate", "audit-ledger"],
    role: "지시 해석, Agent 배정, 승인 레벨 산정",
  },
  {
    id: "pain-radar",
    name: "Pain Radar Agent",
    type: "research",
    status: "running",
    reportsTo: "LocalGuard Orchestrator",
    budget: 90000,
    spent: 31000,
    heartbeat: "1m",
    queue: 6,
    currentCase: "portfolio scan",
    skills: ["evidence-harvest", "source-ranker", "pain-classifier"],
    role: "기사, 공식자료, 상담 메모에서 pain signal 탐지",
  },
  {
    id: "cashflow",
    name: "Cashflow Triage Agent",
    type: "finance",
    status: "pending_approval",
    reportsTo: "LocalGuard Orchestrator",
    budget: 120000,
    spent: 58000,
    heartbeat: "2m",
    queue: 3,
    currentCase: "전주 중앙로 카페",
    skills: ["cashflow-stress", "rate-relief"],
    role: "상환 스트레스, 금리 민감도, 조기 연체 위험 판단",
  },
  {
    id: "policy",
    name: "Policy Match Agent",
    type: "finance",
    status: "idle",
    reportsTo: "LocalGuard Orchestrator",
    budget: 85000,
    spent: 18000,
    heartbeat: "5m",
    queue: 2,
    currentCase: "광주 송정 도소매",
    skills: ["policy-match", "document-checklist"],
    role: "정책금융 후보와 제출 서류 체크리스트 생성",
  },
  {
    id: "fraud",
    name: "Fraud Shield Agent",
    type: "risk",
    status: "running",
    reportsTo: "Compliance Guard",
    budget: 110000,
    spent: 64000,
    heartbeat: "42s",
    queue: 1,
    currentCase: "군산 부품 제조업",
    skills: ["fraud-shield", "do-not-contact-rule"],
    role: "고위험 사기 징후 탐지, 외부 행동 차단",
  },
  {
    id: "rm-copilot",
    name: "RM Copilot Agent",
    type: "communication",
    status: "idle",
    reportsTo: "Human RM Lead",
    budget: 95000,
    spent: 26000,
    heartbeat: "4m",
    queue: 5,
    currentCase: "callback drafts",
    skills: ["notification-brief", "tone-control"],
    role: "RM 메모, 통화 스크립트, 후속 태스크 초안 생성",
  },
  {
    id: "compliance",
    name: "Compliance Guard Agent",
    type: "compliance",
    status: "running",
    reportsTo: "Human Compliance Lead",
    budget: 140000,
    spent: 52000,
    heartbeat: "1m",
    queue: 2,
    currentCase: "approval queue",
    skills: ["compliance-guard", "privacy-redaction", "claim-limiter"],
    role: "금지 표현, 개인정보, 확정 혜택 표현 검토",
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    type: "analytics",
    status: "idle",
    reportsTo: "LocalGuard Orchestrator",
    budget: 70000,
    spent: 16000,
    heartbeat: "8m",
    queue: 0,
    currentCase: "portfolio dashboard",
    skills: ["portfolio-signal", "trend-summary", "case-metrics"],
    role: "지점별 case cluster, queue health, 예산 흐름 집계",
  },
  {
    id: "jeonse-lead",
    name: "Jeonse Shield Lead",
    type: "housing-risk",
    status: "running",
    reportsTo: "LocalGuard Orchestrator",
    budget: 160000,
    spent: 39000,
    heartbeat: "35s",
    queue: 3,
    currentCase: "서울 신축빌라 전세 예정",
    skills: ["case-os-core", "jeonse-price-ratio", "approval-gate", "audit-ledger"],
    role: "전세사기 위험 case를 생성하고 가격, 권리, 자산, 계약, 은행 연계 Agent를 배정",
  },
  {
    id: "deposit-ratio",
    name: "Deposit Ratio Agent",
    type: "housing-risk",
    status: "running",
    reportsTo: "Jeonse Shield Lead",
    budget: 85000,
    spent: 21000,
    heartbeat: "54s",
    queue: 2,
    currentCase: "전세가율 과다 판단",
    skills: ["jeonse-price-ratio", "local-market-compare"],
    role: "전세가율 과다, 주변 시세 대비 보증금 과다, 매매가 추정 불확실성 판단",
  },
  {
    id: "registry-rights",
    name: "Registry Rights Agent",
    type: "legal-risk",
    status: "pending_approval",
    reportsTo: "Jeonse Shield Lead",
    budget: 105000,
    spent: 33000,
    heartbeat: "1m",
    queue: 2,
    currentCase: "등기부 권리관계 확인",
    skills: ["registry-rights-scan", "ownership-transfer-delta"],
    role: "근저당, 압류, 신탁등기, 단기 소유권 이전 등 권리관계 위험을 분류",
  },
  {
    id: "tenant-asset",
    name: "Tenant Asset Risk Agent",
    type: "asset-risk",
    status: "idle",
    reportsTo: "Jeonse Shield Lead",
    budget: 75000,
    spent: 16000,
    heartbeat: "5m",
    queue: 1,
    currentCase: "고객 자산 노출 분석",
    skills: ["tenant-asset-exposure", "housing-cost-burden"],
    role: "총자산 대비 보증금, 월 소득 대비 주거비, 전세대출 상환 가능성, 손실 위험도를 산정",
  },
  {
    id: "contract-check",
    name: "Contract Checklist Agent",
    type: "contract",
    status: "idle",
    reportsTo: "Compliance Guard Agent",
    budget: 78000,
    spent: 19000,
    heartbeat: "4m",
    queue: 2,
    currentCase: "계약 전 체크리스트",
    skills: ["pre-contract-checklist", "special-clause-drafter", "compliance-guard"],
    role: "확인 서류, 임대인·중개사 확인, 특약 문구, 보증보험 전 확인사항을 초안화",
  },
  {
    id: "bank-linkage",
    name: "Bank Linkage Agent",
    type: "banking",
    status: "idle",
    reportsTo: "Human RM Lead",
    budget: 68000,
    spent: 12000,
    heartbeat: "7m",
    queue: 1,
    currentCase: "전세대출 상담 연결",
    skills: ["bank-linkage-brief", "guarantee-feasibility", "notification-brief"],
    role: "전세대출 상담, 보증보험 안내, 위험 매물 경고, 안전 계약 가이드로 은행 접점을 연결",
  },
];

const initialCases = [
  {
    id: "jeonju-cafe",
    code: "JBG-104",
    customerName: "전주 중앙로 카페",
    affiliate: "전북은행",
    segment: "개인사업자",
    region: "전북 전주",
    industry: "카페",
    riskScore: 88,
    status: "Approval Pending",
    priority: "urgent",
    zeroHuman: "L2 초안 + 편집 후 발송",
    sla: "2h",
    owner: "Cashflow Triage Agent",
    stage: "pending_approval",
    due: "오늘 16:00",
    exposure: "운전자금 1.8억 · 카드매출 둔화",
    primaryPain: "금리 부담 + 매출 둔화",
    nextAction: "RM 콜백 초안과 상환 스트레스 점검",
    approvalTitle: "상환 스트레스 확인 콜백 + 정책금융 검토 안내",
    pains: ["cashflow-stress", "rate-shock", "policy-match"],
    rootCauses: ["금융비용 부담", "내수 침체", "디지털 신청 장벽"],
    evidenceIds: ["jb-ai-mou", "smallbiz-burden", "rate-shock", "digital-gap"],
    gates: [
      ["금융조건 확정 표현 금지", "passed"],
      ["개인정보 마스킹", "passed"],
      ["RM 승인 후 고객 콜백", "pending"],
    ],
    agents: ["pain-radar", "cashflow", "policy", "rm-copilot", "compliance"],
    transcript: [
      "Pain Radar: 소상공인 금융비용 부담과 상담 메모가 같은 방향입니다.",
      "Cashflow: 상환 스트레스 점검 우선순위 High입니다.",
      "Compliance: 혜택 확정 표현을 검토 가능성 중심으로 낮췄습니다.",
    ],
    audit: [
      ["09:14", "Case opened from RM note and small-business risk feed."],
      ["09:18", "Evidence Harvest attached 4 sources."],
      ["09:22", "Approval request created for RM callback draft."],
    ],
  },
  {
    id: "gwangju-wholesale",
    code: "JBG-118",
    customerName: "광주 송정 도소매",
    affiliate: "광주은행",
    segment: "개인사업자",
    region: "광주 광산구",
    industry: "도소매",
    riskScore: 72,
    status: "New",
    priority: "high",
    zeroHuman: "L1 초안 + 원클릭 승인",
    sla: "1d",
    owner: "Policy Match Agent",
    stage: "todo",
    due: "내일 10:00",
    exposure: "대환 상담 후보 · 서류 미비",
    primaryPain: "정책금융 탐색 비용",
    nextAction: "대환 가능성 검토와 서류 체크리스트",
    approvalTitle: "정책금융 상담 전 필요 서류 안내",
    pains: ["policy-match", "documentation", "digital-barrier"],
    rootCauses: ["지원제도 탐색 비용", "서류 누락", "디지털 신청 장벽"],
    evidenceIds: ["jb-network", "jb-ai-mou", "smallbiz-burden", "digital-gap"],
    gates: [
      ["지원 가능성 확정 표현 금지", "pending"],
      ["필요 서류 안내만 허용", "passed"],
      ["RM 승인 후 안내", "pending"],
    ],
    agents: ["pain-radar", "policy", "rm-copilot"],
    transcript: [
      "Policy Match: 사업자등록, 매출 증빙, 기존 대출 조건 확인이 필요합니다.",
      "RM Copilot: 고객 안내 문구를 확정형이 아닌 검토형으로 작성했습니다.",
    ],
    audit: [["10:02", "Policy match case created from branch request."]],
  },
  {
    id: "gunsan-manufacturing",
    code: "JBG-127",
    customerName: "군산 부품 제조업",
    affiliate: "JB우리캐피탈",
    segment: "법인사업자",
    region: "전북 군산",
    industry: "제조",
    riskScore: 94,
    status: "Escalated",
    priority: "critical",
    zeroHuman: "L4 정보 제공만",
    sla: "30m",
    owner: "Fraud Shield Agent",
    stage: "blocked",
    due: "즉시",
    exposure: "리스 계약 · 의심 콜백 URL",
    primaryPain: "보이스피싱 의심 콜백",
    nextAction: "외부 행동 차단과 보안 escalation",
    approvalTitle: "보안팀 escalation memo",
    pains: ["fraud", "callback-risk", "do-not-contact"],
    rootCauses: ["긴급 송금 요청", "외부 URL", "음성변조 의심"],
    evidenceIds: ["jb-network", "fraud-ai", "jb-ai-mou"],
    gates: [
      ["고객-facing 자동 발송 금지", "blocked"],
      ["보안팀 내부 escalation만 허용", "passed"],
      ["개인정보 마스킹", "passed"],
    ],
    agents: ["fraud", "compliance", "orchestrator"],
    transcript: [
      "Fraud Shield: 긴급 송금 요청과 콜백 URL이 결합되어 고위험입니다.",
      "Orchestrator: 외부 고객 접촉은 차단하고 내부 escalation만 허용합니다.",
    ],
    audit: [
      ["11:20", "Suspicious callback report converted to high-risk fraud case."],
      ["11:23", "Fraud Shield blocked customer-facing action."],
    ],
  },
  {
    id: "iksan-restaurant",
    code: "JBG-133",
    customerName: "익산 음식점",
    affiliate: "전북은행",
    segment: "개인사업자",
    region: "전북 익산",
    industry: "음식점",
    riskScore: 67,
    status: "Agent Running",
    priority: "medium",
    zeroHuman: "L1 초안 + 원클릭 승인",
    sla: "1d",
    owner: "Pain Radar Agent",
    stage: "in_progress",
    due: "내일 15:00",
    exposure: "매출 계절성 · 카드매출 변동",
    primaryPain: "매출 변동성",
    nextAction: "위험 원인 분류 후 RM briefing",
    approvalTitle: "RM briefing note",
    pains: ["cashflow-stress", "seasonality"],
    rootCauses: ["매출 계절성", "원재료비 변동"],
    evidenceIds: ["smallbiz-burden", "jb-network"],
    gates: [
      ["내부 브리핑만 허용", "passed"],
      ["고객 안내 전 RM 승인", "pending"],
    ],
    agents: ["pain-radar", "cashflow", "analytics"],
    transcript: [
      "Pain Radar: 매출 변동과 원재료비 이슈를 분리해 확인 중입니다.",
    ],
    audit: [["13:08", "Case assigned to Pain Radar Agent."]],
  },
  {
    id: "seoul-jeonse-villa",
    code: "JBG-201",
    customerName: "서울 신축빌라 전세 예정",
    affiliate: "전북은행",
    segment: "청년 전세대출 고객",
    region: "서울 강서구",
    industry: "주거 · 전세계약",
    riskScore: 91,
    status: "Approval Pending",
    priority: "critical",
    zeroHuman: "L3 분석 + 사람 결정",
    sla: "오늘 18:00",
    owner: "Jeonse Shield Lead",
    stage: "pending_approval",
    due: "오늘 18:00",
    exposure: "전세보증금 2.35억 · 총자산 대비 78%",
    primaryPain: "전세가율 과다 + 권리관계 확인 필요",
    nextAction: "위험 매물 경고, 보증보험 확인, 전세대출 상담 연결",
    approvalTitle: "전세사기 위험 진단 리포트 + 안전 계약 체크리스트",
    pains: ["jeonse-fraud", "price-ratio", "registry-risk", "guarantee-feasibility"],
    rootCauses: ["전세가율 과다", "주변 시세 대비 보증금 높음", "근저당 확인 필요", "보증보험 가입 가능성 확인"],
    evidenceIds: ["hug-safe-jeonse", "molit-jeonse-policy", "jb-network"],
    gates: [
      ["법률 판단 확정 표현 금지", "pending"],
      ["등기부/보증보험 원문 확인 필요", "pending"],
      ["은행 상담 연결 전 고객 동의", "passed"],
      ["특약 문구는 초안으로만 제공", "passed"],
    ],
    agents: ["jeonse-lead", "deposit-ratio", "registry-rights", "tenant-asset", "contract-check", "bank-linkage", "compliance"],
    transcript: [
      "Deposit Ratio: 전세보증금이 주변 시세 대비 높아 전세가율 과다 후보입니다.",
      "Registry Rights: 등기부 원문에서 근저당, 신탁등기, 소유권 이전 이력 확인이 필요합니다.",
      "Tenant Asset Risk: 보증금이 고객 총자산의 대부분을 차지해 손실 민감도가 높습니다.",
      "Bank Linkage: 전세대출 상담과 보증보험 가능성 확인 안내를 승인 대기로 올렸습니다.",
    ],
    audit: [
      ["14:02", "Jeonse Shield case opened from pre-contract customer 상담."],
      ["14:04", "Deposit Ratio and Registry Rights Agents assigned."],
      ["14:08", "Approval request created for safe-contract guide and bank 상담 연결."],
    ],
  },
];

const routines = [
  ["평일 08:30", "지역 소상공인 pain radar scan", "Pain Radar Agent", "enabled"],
  ["매일 10:00", "승인 대기 case SLA 점검", "LocalGuard Orchestrator", "enabled"],
  ["매일 14:00", "보이스피싱 경보 동기화", "Fraud Shield Agent", "enabled"],
  ["매일 15:00", "전세 위험 매물/상담 case 점검", "Jeonse Shield Lead", "enabled"],
  ["금요일 17:00", "지점별 case cluster 리포트", "Analytics Agent", "paused"],
];

const goals = [
  ["Triage time", "RM이 원인과 다음 행동을 파악하는 시간을 50% 단축", 64],
  ["Evidence traceability", "Agent 판단 100%에 근거 링크 또는 내부 이벤트 연결", 91],
  ["Approval safety", "고객-facing 행동 100% 승인 게이트 통과", 100],
  ["Fraud block", "고위험 사기 case 외부 발송 차단", 100],
  ["Jeonse safe-contract", "전세 위험 case 100%에 권리관계/보증보험/은행 연계 체크리스트 연결", 86],
];

let cases = JSON.parse(JSON.stringify(initialCases));
let selectedCaseId = "jeonju-cafe";
let activeView = "dashboard";
let activity = [
  ["14:08", "Jeonse Shield Lead", "created approval", "JBG-201"],
  ["14:04", "Registry Rights Agent", "requested source document", "JBG-201"],
  ["13:12", "Cashflow Triage Agent", "created approval", "JBG-104"],
  ["13:08", "Pain Radar Agent", "checked out", "JBG-133"],
  ["11:23", "Fraud Shield Agent", "blocked outbound action", "JBG-127"],
  ["10:02", "Policy Match Agent", "created document checklist", "JBG-118"],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentCase() {
  return cases.find((item) => item.id === selectedCaseId) || cases[0];
}

function statusClass(status) {
  if (status === "Agent Running") return "status-running";
  if (status === "Approval Pending") return "status-pending";
  if (status === "Approved") return "status-approved";
  if (status === "Escalated") return "status-escalated";
  if (status === "Rejected") return "status-rejected";
  return "status-new";
}

function statusToColumn(status) {
  if (status === "Approved") return "done";
  if (status === "Approval Pending") return "approval";
  if (status === "Agent Running") return "running";
  if (status === "Escalated" || status === "Rejected") return "blocked";
  return "todo";
}

function counts() {
  return {
    dashboard: cases.length,
    inbox: cases.filter((item) => item.status === "Escalated" || item.status === "Approval Pending").length,
    cases: cases.length,
    approvals: cases.filter((item) => item.status === "Approval Pending").length,
    runs: cases.filter((item) => item.status === "Agent Running").length,
    jeonse: cases.filter((item) => item.pains.includes("jeonse-fraud")).length,
    agents: agents.length,
    orgchart: agents.length,
    skills: skillRack.length,
    routines: routines.filter((item) => item[3] === "enabled").length,
    goals: goals.length,
    activity: activity.length,
    budget: agents.reduce((sum, agent) => sum + agent.spent, 0),
    settings: 3,
  };
}

function renderNavigation() {
  const currentCounts = counts();
  document.getElementById("nav-list").innerHTML = navigation
    .map(
      (group) => `
        <div class="nav-section">
          <div class="nav-section-title">${escapeHtml(group.section)}</div>
          ${group.items
            .map(
              (item) => `
                <button class="nav-button ${activeView === item.id ? "is-active" : ""}" type="button" data-view="${escapeHtml(item.id)}">
                  <span class="nav-button-main">
                    <span class="nav-icon">${escapeHtml(item.icon)}</span>
                    <span class="nav-label">${escapeHtml(item.label)}</span>
                  </span>
                  <span class="nav-count">${escapeHtml(currentCounts[item.countKey])}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      selectDefaultCaseForView(activeView);
      render();
    });
  });
}

function selectDefaultCaseForView(view) {
  const selected = currentCase();
  const matchers = {
    inbox: (item) => item.status === "Escalated" || item.status === "Approval Pending",
    approvals: (item) => item.status === "Approval Pending",
    runs: (item) => item.status === "Agent Running" || item.status === "Approval Pending",
    jeonse: (item) => item.pains.includes("jeonse-fraud"),
  };
  const matcher = matchers[view];
  if (!matcher || matcher(selected)) return;
  const next = cases.find(matcher);
  if (next) selectedCaseId = next.id;
}

function renderMetrics() {
  const metricGrid = document.getElementById("metric-grid");
  if (!metricGrid) return;
  const highRisk = cases.filter((item) => item.riskScore >= 85).length;
  const pending = cases.filter((item) => item.status === "Approval Pending").length;
  const running = cases.filter((item) => item.status === "Agent Running").length;
  const spend = agents.reduce((sum, agent) => sum + agent.spent, 0);
  const total = agents.reduce((sum, agent) => sum + agent.budget, 0);
  const cards = [
    ["High Risk", highRisk, "Fraud, rate shock, delinquency watch"],
    ["Approval Queue", pending, "RM 또는 준법 승인 대기"],
    ["Live AgentRun", running, "현재 실행 중인 Agent 작업"],
    ["API Budget", `${Math.round((spend / total) * 100)}%`, `₩${spend.toLocaleString()} / ₩${total.toLocaleString()}`],
  ];
  metricGrid.innerHTML = cards
    .map(
      ([label, value, detail]) => `
        <article class="metric-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <p>${escapeHtml(detail)}</p>
        </article>
      `,
    )
    .join("");
}

function renderBoard() {
  const caseBoard = document.getElementById("case-board");
  if (!caseBoard) return;
  const columns = [
    ["todo", "TODO"],
    ["running", "IN PROGRESS"],
    ["approval", "APPROVAL"],
    ["done", "DONE"],
    ["blocked", "BLOCKED"],
  ];

  caseBoard.innerHTML = columns
    .map(([key, label]) => {
      const items = cases.filter((item) => statusToColumn(item.status) === key);
      return `
        <section class="board-column">
          <h4><span>${label}</span><span>${items.length}</span></h4>
          ${
            items.length
              ? items.map(renderCaseCard).join("")
              : '<div class="empty-state">대기 case 없음</div>'
          }
        </section>
      `;
    })
    .join("");

  document.querySelectorAll("[data-case-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCaseId = button.dataset.caseId;
      render();
    });
  });
}

function renderCaseCard(item) {
  return `
    <button class="case-card ${item.id === selectedCaseId ? "is-active" : ""}" type="button" data-case-id="${escapeHtml(item.id)}">
      <span class="mini-line">
        <span>${escapeHtml(item.code)}</span>
        <span>${escapeHtml(item.affiliate)}</span>
        <span>SLA ${escapeHtml(item.sla)}</span>
      </span>
      <strong>${escapeHtml(item.customerName)}</strong>
      <span class="case-meta">
        <span>${escapeHtml(item.region)}</span>
        <span>${escapeHtml(item.segment)}</span>
      </span>
      <span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
      <div class="risk-bar"><i style="width:${item.riskScore}%"></i></div>
      <div class="tag-row">${item.pains.map((pain) => `<span class="tag">${escapeHtml(pain)}</span>`).join("")}</div>
    </button>
  `;
}

function renderLiveRuns() {
  const liveRuns = document.getElementById("live-runs");
  const liveCount = document.getElementById("live-count");
  if (!liveRuns || !liveCount) return;
  const live = cases.filter((item) => item.status === "Agent Running" || item.status === "Approval Pending");
  liveCount.textContent = live.length;
  liveRuns.innerHTML = live
    .map((item) => {
      const progress = item.status === "Approval Pending" ? 86 : 52;
      return `
        <article class="run-card">
          <div class="run-head">
            <strong><span class="pulse"></span>${escapeHtml(item.owner)}</strong>
            <span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
          </div>
          <p>${escapeHtml(item.code)} · ${escapeHtml(item.customerName)}</p>
          <div class="progress-track"><i style="width:${progress}%"></i></div>
          <p>${escapeHtml(item.transcript[item.transcript.length - 1] || "Waiting for run output...")}</p>
        </article>
      `;
    })
    .join("") || '<div class="empty-state">실행 중인 AgentRun 없음</div>';
}

function renderWorkbench() {
  const pageContent = document.getElementById("page-content");
  if (!pageContent) return;

  const pages = {
    dashboard: dashboardPage,
    inbox: inboxPage,
    cases: casesPage,
    approvals: approvalsPage,
    runs: runsPage,
    jeonse: jeonsePage,
    goals: goalsPage,
    agents: agentsPage,
    orgchart: orgChartPage,
    skills: skillsPage,
    routines: routinesPage,
    activity: activityPage,
    budget: budgetPage,
    settings: settingsPage,
  };

  pageContent.innerHTML = (pages[activeView] || pages.dashboard)();
  bindPageActions();
}

function bindPageActions() {
  const dispatchButton = document.getElementById("dispatch-command");
  if (dispatchButton) dispatchButton.addEventListener("click", dispatchCommand);
}

function heroMarkup() {
  return `
    <section class="jb-hero" aria-label="JB LocalGuard OS hero">
      <div class="hero-copy">
        <span class="status-badge">JB금융그룹 Fin:AI Challenge · 자유주제</span>
        <h2>JB LocalGuard OS</h2>
        <p>지역 금융 pain point를 Case, AgentRun, Approval, Audit으로 자동화하는 AI Agent 모델</p>
      </div>
      <div class="hero-mark" aria-hidden="true">
        <span class="mark-box"></span>
        <strong>LocalGuard AI</strong>
      </div>
    </section>
  `;
}

function pageHeader(eyebrow, title, description) {
  return `
    <section class="page-header">
      <div>
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
      </div>
    </section>
  `;
}

function panelMarkup(eyebrow, title, body, extraClass = "") {
  return `
    <section class="panel ${extraClass}">
      <div class="panel-head">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h3>${escapeHtml(title)}</h3>
        </div>
      </div>
      ${body}
    </section>
  `;
}

function commandMarkup() {
  return `
    <section class="command-panel" aria-label="orchestrator command">
      <div>
        <p class="eyebrow">Orchestrator Command</p>
        <h3>지역 금융 오케스트레이터에게 지시하기</h3>
      </div>
      <div class="command-row">
        <textarea id="command-input" rows="2">전주 카페 case의 금리 부담, 정책금융 후보, 고객 안내 초안을 승인 가능한 형태로 정리해줘.</textarea>
        <button id="dispatch-command" class="primary-button" type="button">
          <span aria-hidden="true">▶</span>
          Dispatch
        </button>
      </div>
    </section>
  `;
}

function dashboardPage() {
  return `
    ${heroMarkup()}
    ${commandMarkup()}
    <section id="metric-grid" class="metric-grid" aria-label="metrics"></section>
    <section class="page-two-col">
      ${panelMarkup("Live Agent Runs", "실시간 실행", '<div id="live-runs" class="live-runs"></div><span id="live-count" class="count-pill ghost-count">0</span>')}
      ${panelMarkup("Dashboard Brief", "오늘 운영 브리프", dashboardView())}
    </section>
  `;
}

function inboxPage() {
  return `
    ${pageHeader("Inbox", "알림함", "승인 대기, escalation, 실패 알림만 모아 보는 화면입니다.")}
    ${panelMarkup("Action Needed", "처리 필요 알림", inboxView())}
  `;
}

function casesPage() {
  return `
    ${pageHeader("Case Board", "위험 케이스 칸반", "금융 위험 case를 TODO, IN PROGRESS, APPROVAL, DONE, BLOCKED 상태로 관리합니다.")}
    ${panelMarkup(
      "Case Board",
      "위험 케이스 칸반",
      '<div class="view-switch board-switch" aria-label="board mode"><button class="is-active" type="button">Kanban</button><button type="button">Queue</button></div><div id="case-board" class="case-board"></div>',
      "board-panel",
    )}
  `;
}

function approvalsPage() {
  return `
    ${pageHeader("Approvals", "승인 큐", "고객-facing 행동, 법률/권리 리스크, 금융조건 표현을 사람 승인 전까지 차단합니다.")}
    ${panelMarkup("Approval Queue", "승인 대기 항목", approvalsView())}
  `;
}

function runsPage() {
  return `
    ${pageHeader("AgentRun", "실시간 실행", "현재 실행 중이거나 승인 대기 중인 AgentRun transcript를 확인합니다.")}
    ${panelMarkup("Live Agent Runs", "실시간 실행", '<div id="live-runs" class="live-runs run-page-list"></div><span id="live-count" class="count-pill ghost-count">0</span>')}
  `;
}

function jeonsePage() {
  return `
    ${pageHeader("Jeonse Shield", "전세사기 AI Agent 라인", "전세 위험 신호, 고객 자산노출, 계약 전 체크리스트, 은행 서비스 연계를 전용 Agent들이 분담합니다.")}
    ${panelMarkup("Jeonse Shield", "전세사기 대응 기능", jeonseView())}
  `;
}

function goalsPage() {
  return `
    ${pageHeader("Goals", "운영 목표", "Agent 운영의 성공 기준과 달성률을 추적합니다.")}
    ${panelMarkup("Operating Goals", "목표 달성률", goalsView())}
  `;
}

function agentsPage() {
  return `
    ${pageHeader("Agents", "에이전트 팀", "각 AI Agent의 상태, 역할, 장착 스킬, 보고 체계를 확인합니다.")}
    ${panelMarkup("Agent Team", "에이전트 팀", agentsView())}
  `;
}

function orgChartPage() {
  return `
    ${pageHeader("Org Chart", "Agent 조직도", "AI Agent들이 어떤 상위 Agent 또는 사람에게 보고하는지 조직도로 확인합니다.")}
    ${panelMarkup("Agent Organization", "Agent 조직도", orgChartView())}
  `;
}

function skillsPage() {
  return `
    ${pageHeader("Skill Registry", "Skill Registry", "Agent에게 장착되는 금융, 리스크, 계약, 준법 스킬 패키지를 확인합니다.")}
    ${panelMarkup("Skill Registry", "장착 가능 스킬", skillsView())}
  `;
}

function routinesPage() {
  return `
    ${pageHeader("Heartbeat", "Heartbeat 루틴", "정기 실행되는 Agent scan과 SLA 점검 루틴을 관리합니다.")}
    ${panelMarkup("Routine Schedule", "정기 실행", routinesView())}
  `;
}

function activityPage() {
  return `
    ${pageHeader("Activity", "처리 이력", "Agent checkout, approval 생성, escalation, 승인/반려 기록을 시간순으로 봅니다.")}
    ${panelMarkup("Activity Ledger", "처리 이력", activityView())}
  `;
}

function budgetPage() {
  return `
    ${pageHeader("API Budget", "API 예산", "Agent별 월 예산과 사용률을 추적합니다.")}
    ${panelMarkup("Budget Usage", "Agent별 사용률", budgetView())}
  `;
}

function settingsPage() {
  return `
    ${pageHeader("Settings", "설정", "조직 프로필, 승인 정책, 외부 연동 adapter를 관리합니다.")}
    ${panelMarkup("Settings", "운영 설정", settingsView())}
  `;
}

function dashboardView() {
  return `
    <div class="work-grid">
      ${workItem("지시 입력 바", "자연어 지시를 Orchestrator가 Case와 AgentRun으로 변환한다.", "대시보드 상단 고정")}
      ${workItem("라이브 에이전트 패널", "실행 중인 Agent, 연결 case, transcript preview를 보여준다.", "실시간 상태")}
      ${workItem("4개 지표 카드", "High Risk, Approval, Live Run, API Budget을 요약한다.", "운영 현황")}
      ${workItem("최근 활동", "Agent checked out, approval created, status changed를 감사 로그처럼 표시한다.", "Activity")}
      ${workItem("최근 케이스", "지역 금융 위험 case를 TODO/RUNNING/APPROVAL/BLOCKED로 구분한다.", "Kanban")}
      ${workItem("전세 Shield", "전세가율, 권리관계, 고객 자산노출, 보증보험, 은행 상담 연결을 전용 Agent 라인으로 처리한다.", "Jeonse")}
      ${workItem("오늘 후속조치", "SLA 만료 전 담당 RM 승인 또는 escalation을 유도한다.", "Follow-up")}
    </div>
  `;
}

function inboxView() {
  return `
    <div class="work-grid">
      ${cases
        .filter((item) => item.status === "Escalated" || item.status === "Approval Pending")
        .map((item) => workItem(`${item.code} · ${item.customerName}`, item.nextAction, item.status))
        .join("")}
    </div>
  `;
}

function casesView() {
  return `
    <div class="two-col">
      ${cases.map((item) => workItem(`${item.code} · ${item.customerName}`, `${item.primaryPain} · ${item.exposure}`, `${item.status} · ${item.zeroHuman}`)).join("")}
    </div>
  `;
}

function approvalsView() {
  const approvals = cases.filter((item) => item.status === "Approval Pending");
  return approvals.length
    ? `<div class="two-col">${approvals.map((item) => workItem(item.approvalTitle, `${item.code} · ${item.customerName} · ${item.nextAction}`, item.zeroHuman)).join("")}</div>`
    : '<div class="empty-state">승인 대기 항목 없음</div>';
}

function runsView() {
  return `
    <div class="two-col">
      ${cases
        .map((item) => workItem(`${item.owner} on ${item.code}`, item.transcript.join(" / "), `${item.status} · ${item.sla}`))
        .join("")}
    </div>
  `;
}

function jeonseView() {
  const jeonseCase = cases.find((item) => item.pains.includes("jeonse-fraud"));
  const features = [
    [
      "전세 위험 신호 탐지",
      "전세가율 과다, 주변 시세 대비 보증금 과다, 근저당·압류·신탁등기, 단기 소유권 이전, 보증보험 가입 불가 가능성을 묶어 위험 점수를 만든다.",
      ["jeonse-price-ratio", "local-market-compare", "registry-rights-scan", "ownership-transfer-delta", "guarantee-feasibility"],
    ],
    [
      "고객 맞춤형 자산 리스크 분석",
      "고객 총자산 대비 전세보증금 비중, 월 소득 대비 주거비 부담, 전세대출 상환 가능성, 계약 실패 시 손실 민감도를 분석한다.",
      ["tenant-asset-exposure", "housing-cost-burden"],
    ],
    [
      "AI 계약 전 체크리스트",
      "계약 전 확인 서류, 임대인 확인 항목, 중개사 확인 항목, 특약 문구 초안, 보증보험 가입 전 확인사항을 승인 대기 카드로 만든다.",
      ["pre-contract-checklist", "special-clause-drafter", "compliance-guard"],
    ],
    [
      "은행 서비스 연계",
      "전세대출 상담 연결, 보증보험 안내, 위험 매물 경고, 안전 계약 가이드를 RM 승인 후 고객에게 안내한다.",
      ["bank-linkage-brief", "notification-brief", "approval-gate"],
    ],
  ];

  return `
    <div class="jeonse-summary">
      <article class="work-item featured">
        <div class="item-head">
          <strong>${escapeHtml(jeonseCase.code)} · ${escapeHtml(jeonseCase.customerName)}</strong>
          <span class="status-pill ${statusClass(jeonseCase.status)}">${escapeHtml(jeonseCase.status)}</span>
        </div>
        <p>${escapeHtml(jeonseCase.primaryPain)} · ${escapeHtml(jeonseCase.exposure)}</p>
        <div class="tag-row">${jeonseCase.rootCauses.map((cause) => `<span class="tag">${escapeHtml(cause)}</span>`).join("")}</div>
      </article>
      <div class="feature-grid">
        ${features
          .map(
            ([title, description, skills]) => `
              <article class="work-item">
                <div class="item-head">
                  <strong>${escapeHtml(title)}</strong>
                  <span class="source-badge">AI Agent Skill</span>
                </div>
                <p>${escapeHtml(description)}</p>
                <div class="tag-row">${skills.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}</div>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function agentsView() {
  return `
    <div class="agent-grid">
      ${agents
        .map(
          (agent) => `
            <article class="agent-card">
              <div class="item-head">
                <strong>${escapeHtml(agent.name)}</strong>
                <span class="status-pill ${agent.status === "running" ? "status-running" : agent.status === "pending_approval" ? "status-pending" : "status-new"}">${escapeHtml(agent.status)}</span>
              </div>
              <p>${escapeHtml(agent.role)}</p>
              <div class="tag-row">${agent.skills.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}</div>
              <p>reportsTo: ${escapeHtml(agent.reportsTo)} · heartbeat ${escapeHtml(agent.heartbeat)} · queue ${agent.queue}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function orgChartView() {
  const humanLeads = ["Human RM Lead", "Human Compliance Lead"];
  const childAgents = (leader) => agents.filter((agent) => agent.reportsTo === leader || agent.reportsTo === `${leader} Agent`);
  const rootChildren = agents.filter((agent) => agent.reportsTo === "Human RM Lead" || agent.reportsTo === "Human Compliance Lead");
  const byLead = [
    ["Human RM Lead", rootChildren.filter((agent) => agent.reportsTo === "Human RM Lead")],
    ["Human Compliance Lead", rootChildren.filter((agent) => agent.reportsTo === "Human Compliance Lead")],
    ["LocalGuard Orchestrator", childAgents("LocalGuard Orchestrator")],
    ["Jeonse Shield Lead", childAgents("Jeonse Shield Lead")],
    ["Compliance Guard Agent", childAgents("Compliance Guard")],
  ];

  return `
    <div class="org-chart">
      <div class="org-root">
        ${humanLeads.map((lead) => `<div class="org-node human"><strong>${escapeHtml(lead)}</strong><span>최종 승인권자</span></div>`).join("")}
      </div>
      <div class="org-level">
        ${byLead
          .filter(([, list]) => list.length)
          .map(
            ([lead, list]) => `
              <section class="org-column">
                <h4>${escapeHtml(lead)}</h4>
                ${list
                  .map(
                    (agent) => `
                      <article class="org-node">
                        <div class="item-head">
                          <strong>${escapeHtml(agent.name)}</strong>
                          <span class="status-pill ${agent.status === "running" ? "status-running" : agent.status === "pending_approval" ? "status-pending" : "status-new"}">${escapeHtml(agent.status)}</span>
                        </div>
                        <p>${escapeHtml(agent.role)}</p>
                        <div class="tag-row">${agent.skills.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}</div>
                        <p>reportsTo: ${escapeHtml(agent.reportsTo)} · budget ₩${agent.budget.toLocaleString()} · spent ₩${agent.spent.toLocaleString()}</p>
                      </article>
                    `,
                  )
                  .join("")}
              </section>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function skillsView() {
  return `
    <div class="skill-grid">
      ${skillRack
        .map(
          (skill) => `
            <article class="skill-card">
              <div class="item-head">
                <strong>${escapeHtml(skill.slug)}</strong>
                <span class="source-badge">${escapeHtml(skill.type)}</span>
              </div>
              <p>${escapeHtml(skill.purpose)}</p>
              <span class="risk-chip ${skill.risk === "high" ? "status-escalated" : skill.risk === "medium" ? "status-pending" : "status-approved"}">${escapeHtml(skill.risk)} · ${escapeHtml(skill.approval)}</span>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function routinesView() {
  return `<div class="work-grid">${routines.map((item) => workItem(item[1], `${item[0]} · ${item[2]}`, item[3])).join("")}</div>`;
}

function goalsView() {
  return `
    <div class="work-grid">
      ${goals
        .map(
          (goal) => `
            <article class="work-item">
              <div class="item-head"><strong>${escapeHtml(goal[0])}</strong><span>${goal[2]}%</span></div>
              <p>${escapeHtml(goal[1])}</p>
              <div class="progress-track"><i style="width:${goal[2]}%"></i></div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function activityView() {
  return `
    <div class="two-col">
      ${activity
        .map(
          ([time, agent, action, code]) => `
            <article class="activity-item">
              <span class="audit-time">${escapeHtml(time)}</span>
              <strong>${escapeHtml(agent)} ${escapeHtml(action)}</strong>
              <p>on ${escapeHtml(code)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function budgetView() {
  return `
    <div class="budget-grid">
      ${agents
        .map((agent) => {
          const percent = Math.round((agent.spent / agent.budget) * 100);
          return `
            <div class="budget-row">
              <strong>${escapeHtml(agent.name)}</strong>
              <div class="progress-track"><i style="width:${percent}%"></i></div>
              <span>${percent}%</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function settingsView() {
  return `
    <div class="work-grid">
      ${workItem("Organization profile", "전북은행 · 광주은행 · JB우리캐피탈 mock tenant를 전환한다.", "local_trusted")}
      ${workItem("Approval policy", "L0-L4 zero-human 레벨과 금지 자동 실행 항목을 관리한다.", "mandatory")}
      ${workItem("External integrations", "뉴스/공식자료/RM 상담 기록/보안 경보 adapter를 연결한다.", "mocked")}
    </div>
  `;
}

function workItem(title, description, meta) {
  return `
    <article class="work-item">
      <div class="item-head">
        <strong>${escapeHtml(title)}</strong>
        <span class="source-badge">${escapeHtml(meta)}</span>
      </div>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function renderProperties() {
  const contextPanel = document.getElementById("context-panel");
  if (!contextPanel) return;

  const contextPages = {
    agents: agentContextMarkup,
    orgchart: agentContextMarkup,
    skills: skillContextMarkup,
    routines: routineContextMarkup,
    goals: goalContextMarkup,
    activity: activityContextMarkup,
    budget: budgetContextMarkup,
    settings: settingsContextMarkup,
  };

  const renderContext = contextPages[activeView] || caseContextMarkup;
  contextPanel.innerHTML = renderContext();
  bindContextActions();
}

function caseContextMarkup() {
  const item = currentCase();
  const reviewDisabled = item.status !== "Approval Pending" ? "disabled" : "";
  const runDisabled = item.status === "Agent Running" ? "disabled" : "";
  const gateRows = item.gates
    .map(
      ([label, gateStatus]) => `
        <article class="gate-row">
          <div class="item-head">
            <strong>${escapeHtml(label)}</strong>
            <span class="status-pill ${gateStatus === "passed" ? "status-approved" : gateStatus === "blocked" ? "status-escalated" : "status-pending"}">${escapeHtml(gateStatus)}</span>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="panel selected-case-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Selected Case</p>
          <h3 id="property-title">${escapeHtml(item.customerName)}</h3>
        </div>
        <span id="property-status" class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
      </div>
      <div id="case-properties" class="case-properties">
        <div class="property-list">
          ${propertyRow("Code", item.code)}
          ${propertyRow("Affiliate", item.affiliate)}
          ${propertyRow("Region", `${item.region} · ${item.industry}`)}
          ${propertyRow("Risk", `${item.riskScore}/100 · ${item.priority}`)}
          ${propertyRow("Zero-human", item.zeroHuman)}
          ${propertyRow("Owner", item.owner)}
          ${propertyRow("Exposure", item.exposure)}
          ${propertyRow("Due", item.due)}
        </div>
        <div class="tag-row">${item.rootCauses.map((cause) => `<span class="tag">${escapeHtml(cause)}</span>`).join("")}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Approval Gate</p>
          <h3>승인 정책</h3>
        </div>
      </div>
      <div id="approval-gates" class="approval-gates">${gateRows}</div>
      <div class="action-row">
        <button id="run-agents" class="primary-button" type="button" ${runDisabled}>
          <span aria-hidden="true">▶</span>
          Run
        </button>
        <button id="approve-action" class="secondary-button" type="button" ${reviewDisabled}>
          <span aria-hidden="true">✓</span>
          Approve
        </button>
        <button id="reject-action" class="danger-button" type="button" ${reviewDisabled}>
          <span aria-hidden="true">×</span>
          Reject
        </button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Evidence Feed</p>
          <h3>근거</h3>
        </div>
      </div>
      <div id="evidence-feed" class="evidence-feed"></div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Audit Ledger</p>
          <h3>감사 로그</h3>
        </div>
      </div>
      <div id="audit-log" class="audit-log"></div>
    </section>
  `;
}

function propertyRow(label, value) {
  return `<div class="property-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function compactPanel(eyebrow, title, body) {
  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h3>${escapeHtml(title)}</h3>
        </div>
      </div>
      ${body}
    </section>
  `;
}

function agentContextMarkup() {
  const running = agents.filter((agent) => agent.status === "running").length;
  const pending = agents.filter((agent) => agent.status === "pending_approval").length;
  const queue = agents.reduce((sum, agent) => sum + agent.queue, 0);
  const topAgents = agents
    .filter((agent) => agent.status === "running" || agent.status === "pending_approval")
    .slice(0, 5)
    .map((agent) => workItem(agent.name, agent.role, `${agent.status} · queue ${agent.queue}`))
    .join("");

  return `
    ${compactPanel(
      "Agent Control",
      "팀 운영 요약",
      `<div class="property-list">
        ${propertyRow("Agents", agents.length)}
        ${propertyRow("Running", running)}
        ${propertyRow("Approval", pending)}
        ${propertyRow("Queue", queue)}
      </div>`,
    )}
    ${compactPanel("Active Agents", "실행/승인 대기", `<div class="context-list">${topAgents}</div>`)}
  `;
}

function skillContextMarkup() {
  const categoryCounts = skillRack.reduce((acc, skill) => {
    acc[skill.type] = (acc[skill.type] || 0) + 1;
    return acc;
  }, {});
  const highRisk = skillRack.filter((skill) => skill.risk === "high").length;
  const categoryRows = Object.entries(categoryCounts)
    .map(([type, count]) => propertyRow(type, count))
    .join("");

  return `
    ${compactPanel(
      "Skill Registry",
      "스킬 구성",
      `<div class="property-list">
        ${propertyRow("Total", skillRack.length)}
        ${propertyRow("High-risk", highRisk)}
        ${propertyRow("Mandatory gates", skillRack.filter((skill) => skill.approval === "mandatory").length)}
      </div>`,
    )}
    ${compactPanel("Categories", "타입별 분포", `<div class="property-list">${categoryRows}</div>`)}
  `;
}

function routineContextMarkup() {
  const enabled = routines.filter((routine) => routine[3] === "enabled").length;
  const rows = routines.map((routine) => workItem(routine[1], `${routine[0]} · ${routine[2]}`, routine[3])).join("");
  return `
    ${compactPanel("Heartbeat", "정기 실행 상태", `<div class="property-list">${propertyRow("Enabled", enabled)}${propertyRow("Paused", routines.length - enabled)}</div>`)}
    ${compactPanel("Schedule", "다음 루틴", `<div class="context-list">${rows}</div>`)}
  `;
}

function goalContextMarkup() {
  const average = Math.round(goals.reduce((sum, goal) => sum + goal[2], 0) / goals.length);
  const rows = goals.map((goal) => workItem(goal[0], goal[1], `${goal[2]}%`)).join("");
  return `
    ${compactPanel("Operating Goals", "목표 평균", `<div class="property-list">${propertyRow("Goal count", goals.length)}${propertyRow("Average", `${average}%`)}</div>`)}
    ${compactPanel("Targets", "관리 지표", `<div class="context-list">${rows}</div>`)}
  `;
}

function activityContextMarkup() {
  const latest = activity.slice(0, 5).map(([time, agent, action, code]) => workItem(`${time} · ${agent}`, action, code)).join("");
  return compactPanel("Activity", "최근 처리 이력", `<div class="context-list">${latest}</div>`);
}

function budgetContextMarkup() {
  const spent = agents.reduce((sum, agent) => sum + agent.spent, 0);
  const budget = agents.reduce((sum, agent) => sum + agent.budget, 0);
  const heavyUsers = agents
    .slice()
    .sort((a, b) => b.spent / b.budget - a.spent / a.budget)
    .slice(0, 4)
    .map((agent) => workItem(agent.name, `spent ₩${agent.spent.toLocaleString()} / ₩${agent.budget.toLocaleString()}`, `${Math.round((agent.spent / agent.budget) * 100)}%`))
    .join("");

  return `
    ${compactPanel("API Budget", "전체 예산", `<div class="property-list">${propertyRow("Spent", `₩${spent.toLocaleString()}`)}${propertyRow("Budget", `₩${budget.toLocaleString()}`)}${propertyRow("Usage", `${Math.round((spent / budget) * 100)}%`)}</div>`)}
    ${compactPanel("Usage", "사용률 상위 Agent", `<div class="context-list">${heavyUsers}</div>`)}
  `;
}

function settingsContextMarkup() {
  return compactPanel(
    "Settings",
    "운영 정책",
    `<div class="property-list">
      ${propertyRow("Tenant", "전북은행 · 광주은행 · JB우리캐피탈")}
      ${propertyRow("Approval", "L0-L4 human gate")}
      ${propertyRow("External", "mock adapters")}
    </div>`,
  );
}

function renderEvidence() {
  const item = currentCase();
  const evidenceFeed = document.getElementById("evidence-feed");
  if (!evidenceFeed) return;
  evidenceFeed.innerHTML = evidence
    .filter((entry) => item.evidenceIds.includes(entry.id))
    .map(
      (entry) => `
        <article class="evidence-card">
          <span class="source-badge">${escapeHtml(entry.type)} · ${escapeHtml(entry.source)}</span>
          <a href="${escapeHtml(entry.url)}" target="_blank" rel="noreferrer">${escapeHtml(entry.title)}</a>
          <p>${escapeHtml(entry.implication)}</p>
        </article>
      `,
    )
    .join("");
}

function renderAudit() {
  const item = currentCase();
  const auditLog = document.getElementById("audit-log");
  if (!auditLog) return;
  auditLog.innerHTML = item.audit
    .slice()
    .reverse()
    .map(
      ([time, text]) => `
        <article class="audit-item">
          <span class="audit-time">${escapeHtml(time)}</span>
          <p>${escapeHtml(text)}</p>
        </article>
      `,
    )
    .join("");
}

function timestamp() {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function runAgents() {
  const item = currentCase();
  item.status = "Agent Running";
  item.stage = "in_progress";
  item.audit.push([timestamp(), "AgentRun started. Mounted skills and injected case context."]);
  activity.unshift([timestamp(), item.owner, "checked out", item.code]);
  render();

  window.setTimeout(() => {
    const selected = currentCase();
    if (selected.status !== "Agent Running") return;
    selected.status = selected.id === "gunsan-manufacturing" ? "Escalated" : "Approval Pending";
    selected.stage = selected.status === "Escalated" ? "blocked" : "pending_approval";
    selected.transcript.push(
      selected.status === "Escalated"
        ? "Fraud Shield: Customer-facing action remains blocked. Internal escalation only."
        : "Approval Gate: Draft action is ready for human review.",
    );
    selected.audit.push([timestamp(), "AgentRun completed and approval policy evaluated."]);
    activity.unshift([timestamp(), "Approval Gate", "created approval", selected.code]);
    render();
  }, 480);
}

function approveAction() {
  const item = currentCase();
  if (item.status !== "Approval Pending") return;
  item.status = "Approved";
  item.stage = "done";
  item.audit.push([timestamp(), "Human RM approved the proposed action. Demo outbound task recorded."]);
  activity.unshift([timestamp(), "Human RM", "approved action", item.code]);
  render();
}

function rejectAction() {
  const item = currentCase();
  if (item.status !== "Approval Pending") return;
  item.status = "Rejected";
  item.stage = "blocked";
  item.audit.push([timestamp(), "Human reviewer rejected the draft and requested revision."]);
  activity.unshift([timestamp(), "Human reviewer", "rejected draft", item.code]);
  render();
}

function dispatchCommand() {
  const item = currentCase();
  const commandInput = document.getElementById("command-input");
  const command = commandInput ? commandInput.value.trim() : "";
  item.audit.push([timestamp(), `Orchestrator command received: ${command || "empty command"}`]);
  item.status = "Agent Running";
  item.stage = "in_progress";
  activity.unshift([timestamp(), "LocalGuard Orchestrator", "dispatched command", item.code]);
  activeView = "runs";
  render();
}

function newCaseDemo() {
  selectedCaseId = "gwangju-wholesale";
  activeView = "cases";
  currentCase().audit.push([timestamp(), "Opened from New Case button demo."]);
  render();
}

function bindActions() {
  document.getElementById("new-case-button").addEventListener("click", newCaseDemo);
  document.getElementById("sidebar-search").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const found = cases.find((item) => `${item.customerName} ${item.code} ${item.affiliate}`.toLowerCase().includes(query));
    if (found) {
      selectedCaseId = found.id;
      render();
    }
  });
}

function bindContextActions() {
  const runButton = document.getElementById("run-agents");
  const approveButton = document.getElementById("approve-action");
  const rejectButton = document.getElementById("reject-action");
  if (runButton) runButton.addEventListener("click", runAgents);
  if (approveButton) approveButton.addEventListener("click", approveAction);
  if (rejectButton) rejectButton.addEventListener("click", rejectAction);
}

function render() {
  renderNavigation();
  renderWorkbench();
  renderProperties();
  renderMetrics();
  renderBoard();
  renderLiveRuns();
  renderEvidence();
  renderAudit();
}

bindActions();
render();
