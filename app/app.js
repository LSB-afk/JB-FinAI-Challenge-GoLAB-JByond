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

const jeonseFeatures = [
  {
    id: "price-ratio",
    title: "전세가율 탐지",
    description: "매매 추정가 대비 전세보증금 비율과 주변 시세 대비 보증금 과다 여부를 묶어 전세가율 위험 점수를 만든다.",
    skills: ["jeonse-price-ratio", "local-market-compare"],
  },
  {
    id: "registry-risk",
    title: "권리관계 위험",
    description: "근저당, 압류, 가압류, 신탁등기, 단기 소유권 이전 신호를 등기부 기준으로 추출하고 보증보험 가입 가능성을 분류한다.",
    skills: ["registry-rights-scan", "ownership-transfer-delta", "guarantee-feasibility"],
  },
  {
    id: "asset-risk",
    title: "자산 리스크",
    description: "고객 총자산 대비 보증금 비중, 월 소득 대비 주거비 부담, 전세대출 상환 가능성과 계약 실패 시 손실 민감도를 분석한다.",
    skills: ["tenant-asset-exposure", "housing-cost-burden"],
  },
  {
    id: "contract-checklist",
    title: "계약 체크리스트",
    description: "계약 전 확인 서류, 임대인·중개사 확인 항목, 특약 문구 초안, 보증보험 가입 전 확인사항을 승인 대기 카드로 만든다.",
    skills: ["pre-contract-checklist", "special-clause-drafter", "compliance-guard"],
  },
  {
    id: "bank-linkage",
    title: "은행 연계",
    description: "전세대출 상담 연결, 보증보험 안내, 위험 매물 경고, 안전 계약 가이드를 RM 승인 후 고객에게 안내한다.",
    skills: ["bank-linkage-brief", "notification-brief", "approval-gate"],
  },
];

let cases = JSON.parse(JSON.stringify(initialCases));
let selectedCaseId = "jeonju-cafe";
let selectedAgentId = null;
let selectedSkillId = null;
let selectedFeatureId = null;
let selectedEvidenceId = null;
let activeDetailType = "case";
let activeView = "dashboard";
let boardMode = "kanban";
let railFilter = "all";
let caseSequence = 201;
let runSequence = 1;
let agentRuns = [
  {
    id: "run-001",
    caseId: "seoul-jeonse-villa",
    caseCode: "JBG-201",
    agentName: "Jeonse Shield Lead",
    startedAt: "14:04",
    status: "approval_pending",
    command: "전세가율, 권리관계, 자산 노출, 보증보험 가능성을 종합 진단해줘.",
    log: [
      ["14:04", "Run started. Mounted skills: jeonse-price-ratio, registry-rights-scan, tenant-asset-exposure."],
      ["14:06", "Deposit Ratio Agent: 주변 시세 대비 보증금이 높아 전세가율 과다 후보로 분류."],
      ["14:08", "Approval Gate: 안전 계약 가이드 초안을 승인 큐에 등록."],
    ],
  },
];
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

function currentAgent() {
  return agents.find((agent) => agent.id === selectedAgentId) || null;
}

function currentSkill() {
  return skillRack.find((skill) => skill.slug === selectedSkillId) || null;
}

function currentFeature() {
  return jeonseFeatures.find((feature) => feature.id === selectedFeatureId) || null;
}

function visibleCases() {
  if (railFilter === "all") return cases;
  return cases.filter((item) => item.affiliate === railFilter);
}

function casesByAgent(agentId) {
  const agent = agents.find((entry) => entry.id === agentId);
  if (!agent) return [];
  return cases.filter((item) => item.agents.includes(agentId) || item.owner === agent.name);
}

function agentsBySkill(slug) {
  return agents.filter((agent) => agent.skills.includes(slug));
}

function casesBySkill(slug) {
  const agentIds = agentsBySkill(slug).map((agent) => agent.id);
  return cases.filter((item) => item.agents.some((id) => agentIds.includes(id)));
}

function skillsByCase(item) {
  const mounted = new Set();
  item.agents.forEach((agentId) => {
    const agent = agents.find((entry) => entry.id === agentId);
    if (agent) agent.skills.forEach((slug) => mounted.add(slug));
  });
  return Array.from(mounted);
}

function caseAgents(item) {
  return item.agents.map((agentId) => agents.find((agent) => agent.id === agentId)).filter(Boolean);
}

function agentsByFeature(feature) {
  const related = new Set();
  feature.skills.forEach((slug) => {
    agentsBySkill(slug).forEach((agent) => related.add(agent.id));
  });
  return agents.filter((agent) => related.has(agent.id));
}

function casesByEvidence(entryId) {
  return cases.filter((item) => item.evidenceIds.includes(entryId));
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
  const scoped = visibleCases();
  return {
    dashboard: scoped.length,
    inbox: scoped.filter((item) => item.status === "Escalated" || item.status === "Approval Pending").length,
    cases: scoped.length,
    approvals: scoped.filter((item) => item.status === "Approval Pending").length,
    runs: agentRuns.filter((run) => run.status === "running").length || agentRuns.length,
    jeonse: scoped.filter((item) => item.pains.includes("jeonse-fraud")).length,
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
      activeDetailType = defaultDetailForView(activeView);
      selectDefaultCaseForView(activeView);
      render();
    });
  });
}

function defaultDetailForView(view) {
  if ((view === "agents" || view === "orgchart") && selectedAgentId) return "agent";
  if (view === "skills" && selectedSkillId) return "skill";
  if (view === "jeonse" && selectedFeatureId) return "feature";
  const summaryViews = ["agents", "orgchart", "skills", "routines", "goals", "activity", "budget", "settings"];
  if (summaryViews.includes(view)) return "view";
  return "case";
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
  const next = visibleCases().find(matcher) || cases.find(matcher);
  if (next) selectedCaseId = next.id;
}

function renderMetrics() {
  const metricGrid = document.getElementById("metric-grid");
  if (!metricGrid) return;
  const scoped = visibleCases();
  const highRisk = scoped.filter((item) => item.riskScore >= 85).length;
  const pending = scoped.filter((item) => item.status === "Approval Pending").length;
  const running = scoped.filter((item) => item.status === "Agent Running").length;
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
  const scoped = visibleCases();

  if (boardMode === "queue") {
    caseBoard.classList.add("is-queue");
    const queued = scoped.slice().sort((a, b) => b.riskScore - a.riskScore);
    caseBoard.innerHTML = `
      <div class="queue-list">
        ${queued.length ? queued.map(renderCaseCard).join("") : '<div class="empty-state">대기 case 없음</div>'}
      </div>
    `;
    return;
  }

  caseBoard.classList.remove("is-queue");
  const columns = [
    ["todo", "TODO"],
    ["running", "IN PROGRESS"],
    ["approval", "APPROVAL"],
    ["done", "DONE"],
    ["blocked", "BLOCKED"],
  ];

  caseBoard.innerHTML = columns
    .map(([key, label]) => {
      const items = scoped.filter((item) => statusToColumn(item.status) === key);
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
  const live = visibleCases().filter((item) => item.status === "Agent Running" || item.status === "Approval Pending");
  liveCount.textContent = live.length;
  liveRuns.innerHTML = live
    .map((item) => {
      const progress = item.status === "Approval Pending" ? 86 : 52;
      return `
        <article class="run-card is-clickable" data-case-id="${escapeHtml(item.id)}" role="button" tabindex="0">
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
  document.querySelectorAll("[data-board-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      boardMode = button.dataset.boardMode;
      render();
    });
  });
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
      `<div class="view-switch board-switch" aria-label="board mode"><button class="${boardMode === "kanban" ? "is-active" : ""}" type="button" data-board-mode="kanban">Kanban</button><button class="${boardMode === "queue" ? "is-active" : ""}" type="button" data-board-mode="queue">Queue</button></div><div id="case-board" class="case-board"></div>`,
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
    ${pageHeader("AgentRun", "실시간 실행", "Dispatch와 Run으로 생성된 AgentRun 실행 로그와 라이브 상태를 확인합니다.")}
    <section class="page-two-col">
      ${panelMarkup("Run Log", "AgentRun 실행 로그", runsView())}
      ${panelMarkup("Live Agent Runs", "실시간 실행", '<div id="live-runs" class="live-runs run-page-list"></div><span id="live-count" class="count-pill ghost-count">0</span>')}
    </section>
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

function runStatusLabel(status) {
  const labels = {
    running: "Agent Running",
    approval_pending: "Approval Pending",
    escalated: "Escalated",
    completed: "Approved",
    rejected: "Rejected",
  };
  return labels[status] || status;
}

function runsView() {
  if (!agentRuns.length) return '<div class="empty-state">실행된 AgentRun 없음</div>';
  return `
    <div class="run-log-list">
      ${agentRuns
        .map((run) => {
          const target = cases.find((item) => item.id === run.caseId);
          const label = runStatusLabel(run.status);
          return `
            <article class="run-card run-log-card ${run.status === "running" ? "is-live" : ""}">
              <div class="run-head">
                <strong>${run.status === "running" ? '<span class="pulse"></span>' : ""}${escapeHtml(run.id)} · ${escapeHtml(run.agentName)}</strong>
                <span class="status-pill ${statusClass(label)}">${escapeHtml(label)}</span>
              </div>
              <button class="link-button" type="button" data-case-id="${escapeHtml(run.caseId)}">
                ${escapeHtml(run.caseCode)} · ${escapeHtml(target ? target.customerName : "unknown case")}
              </button>
              <p class="run-command">“${escapeHtml(run.command)}”</p>
              <div class="run-log">
                ${run.log
                  .map(
                    ([time, text]) => `
                      <div class="audit-item">
                        <span class="audit-time">${escapeHtml(time)}</span>
                        <p>${escapeHtml(text)}</p>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function jeonseView() {
  const jeonseCase = cases.find((item) => item.pains.includes("jeonse-fraud"));
  return `
    <div class="jeonse-summary">
      <article class="work-item featured is-clickable ${jeonseCase.id === selectedCaseId && activeDetailType === "case" ? "is-selected" : ""}" data-case-id="${escapeHtml(jeonseCase.id)}" role="button" tabindex="0">
        <div class="item-head">
          <strong>${escapeHtml(jeonseCase.code)} · ${escapeHtml(jeonseCase.customerName)}</strong>
          <span class="status-pill ${statusClass(jeonseCase.status)}">${escapeHtml(jeonseCase.status)}</span>
        </div>
        <p>${escapeHtml(jeonseCase.primaryPain)} · ${escapeHtml(jeonseCase.exposure)}</p>
        <div class="tag-row">${jeonseCase.rootCauses.map((cause) => `<span class="tag">${escapeHtml(cause)}</span>`).join("")}</div>
      </article>
      <div class="feature-grid">
        ${jeonseFeatures
          .map((feature) => {
            const featureAgents = agentsByFeature(feature);
            return `
              <article class="work-item is-clickable ${feature.id === selectedFeatureId && activeDetailType === "feature" ? "is-selected" : ""}" data-feature-id="${escapeHtml(feature.id)}" role="button" tabindex="0">
                <div class="item-head">
                  <strong>${escapeHtml(feature.title)}</strong>
                  <span class="source-badge">${featureAgents.length} agents · ${feature.skills.length} skills</span>
                </div>
                <p>${escapeHtml(feature.description)}</p>
                <div class="tag-row">${feature.skills.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}</div>
              </article>
            `;
          })
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
            <article class="agent-card is-clickable ${agent.id === selectedAgentId && activeDetailType === "agent" ? "is-selected" : ""}" data-agent-id="${escapeHtml(agent.id)}" role="button" tabindex="0">
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
  const agentById = Object.fromEntries(agents.map((agent) => [agent.id, agent]));
  const branches = [
    {
      title: "Regional Pain Radar",
      subtitle: "기사·공식자료·상담메모 기반 지역 금융 pain signal",
      agents: ["pain-radar", "cashflow", "policy", "analytics"],
    },
    {
      title: "Jeonse Shield Line",
      subtitle: "전세가율·권리관계·고객 자산노출·은행 연계",
      agents: ["jeonse-lead", "deposit-ratio", "registry-rights", "tenant-asset", "bank-linkage"],
      featured: true,
    },
    {
      title: "Approval & Customer Ops",
      subtitle: "RM 초안, 승인 게이트, 고객 안내 전 통제",
      agents: ["rm-copilot"],
    },
    {
      title: "Fraud & Compliance",
      subtitle: "사기 차단, 준법 검토, 특약/계약 문구 통제",
      agents: ["fraud", "contract-check"],
    },
  ];

  return `
    <div class="org-diagram" role="img" aria-label="JB LocalGuard OS AI Agent 조직도">
      <div class="org-tier org-human-tier">
        ${humanNode("Human RM Lead", "RM 최종 승인권자")}
        ${humanNode("Human Compliance Lead", "준법 최종 승인권자")}
      </div>
      <div class="org-connector split-connector" aria-hidden="true"></div>
      <div class="org-tier org-command-tier">
        ${orgNode(agentById.orchestrator, "command")}
        ${orgNode(agentById.compliance, "command")}
      </div>
      <div class="org-connector branch-connector" aria-hidden="true"></div>
      <div class="org-branch-grid">
        ${branches.map((branch) => orgBranch(branch, agentById)).join("")}
      </div>
      <div class="org-legend">
        <span><i class="legend-dot running"></i>running</span>
        <span><i class="legend-dot pending"></i>pending approval</span>
        <span><i class="legend-dot idle"></i>idle</span>
      </div>
    </div>
  `;
}

function humanNode(title, description) {
  return `
    <article class="org-node human">
      <span class="node-kicker">Human Gate</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function orgBranch(branch, agentById) {
  return `
    <section class="org-branch ${branch.featured ? "is-featured" : ""}">
      <div class="branch-head">
        <strong>${escapeHtml(branch.title)}</strong>
        <p>${escapeHtml(branch.subtitle)}</p>
      </div>
      <div class="branch-agents">
        ${branch.agents.map((id) => orgNode(agentById[id], id === "jeonse-lead" ? "line-lead" : "")).join("")}
      </div>
    </section>
  `;
}

function orgNode(agent, variant = "") {
  if (!agent) return "";
  const status = agent.status === "running" ? "status-running" : agent.status === "pending_approval" ? "status-pending" : "status-new";
  const selected = agent.id === selectedAgentId && activeDetailType === "agent" ? "is-selected" : "";
  return `
    <article class="org-node is-clickable ${variant} ${selected}" data-agent-id="${escapeHtml(agent.id)}" role="button" tabindex="0">
      <div class="node-topline">
        <span class="node-kicker">${escapeHtml(agent.type)}</span>
        <span class="status-pill ${status}">${escapeHtml(agent.status)}</span>
      </div>
      <strong>${escapeHtml(agent.name)}</strong>
      <p>${escapeHtml(agent.role)}</p>
      <div class="node-meta">
        <span>${escapeHtml(agent.heartbeat)}</span>
        <span>queue ${agent.queue}</span>
        <span>${agent.skills.length} skills</span>
      </div>
    </article>
  `;
}

function skillsView() {
  return `
    <div class="skill-grid">
      ${skillRack
        .map(
          (skill) => `
            <article class="skill-card is-clickable ${skill.slug === selectedSkillId && activeDetailType === "skill" ? "is-selected" : ""}" data-skill-id="${escapeHtml(skill.slug)}" role="button" tabindex="0">
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

  let markup;
  if (activeDetailType === "agent" && currentAgent()) {
    markup = agentDetailMarkup();
  } else if (activeDetailType === "skill" && currentSkill()) {
    markup = skillDetailMarkup();
  } else if (activeDetailType === "feature" && currentFeature()) {
    markup = featureDetailMarkup();
  } else if (activeDetailType === "view" && contextPages[activeView]) {
    markup = contextPages[activeView]();
  } else {
    markup = caseContextMarkup();
  }

  contextPanel.innerHTML = markup;
  bindContextActions();
}

function caseLinkButton(item) {
  return `
    <button class="work-item link-card" type="button" data-case-id="${escapeHtml(item.id)}">
      <div class="item-head">
        <strong>${escapeHtml(item.code)} · ${escapeHtml(item.customerName)}</strong>
        <span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
      </div>
      <p>${escapeHtml(item.primaryPain)}</p>
    </button>
  `;
}

function agentLinkButton(agent) {
  const status = agent.status === "running" ? "status-running" : agent.status === "pending_approval" ? "status-pending" : "status-new";
  return `
    <button class="work-item link-card" type="button" data-agent-id="${escapeHtml(agent.id)}">
      <div class="item-head">
        <strong>${escapeHtml(agent.name)}</strong>
        <span class="status-pill ${status}">${escapeHtml(agent.status)}</span>
      </div>
      <p>${escapeHtml(agent.role)}</p>
    </button>
  `;
}

function skillTagButton(slug) {
  return `<button class="tag tag-button" type="button" data-skill-id="${escapeHtml(slug)}">${escapeHtml(slug)}</button>`;
}

function agentDetailMarkup() {
  const agent = currentAgent();
  const linked = casesByAgent(agent.id);
  const percent = Math.round((agent.spent / agent.budget) * 100);
  const statusPill = agent.status === "running" ? "status-running" : agent.status === "pending_approval" ? "status-pending" : "status-new";
  const firstCase = linked[0];
  return `
    <section class="panel selected-case-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Selected Agent</p>
          <h3>${escapeHtml(agent.name)}</h3>
        </div>
        <span class="status-pill ${statusPill}">${escapeHtml(agent.status)}</span>
      </div>
      <div class="case-properties">
        <div class="property-list">
          ${propertyRow("담당 업무", agent.role)}
          ${propertyRow("Type", agent.type)}
          ${propertyRow("Reports To", agent.reportsTo)}
          ${propertyRow("Heartbeat", agent.heartbeat)}
          ${propertyRow("Queue", agent.queue)}
          ${propertyRow("Budget", `₩${agent.spent.toLocaleString()} / ₩${agent.budget.toLocaleString()} · ${percent}%`)}
          ${propertyRow("Current", agent.currentCase)}
        </div>
        <p class="eyebrow">Mounted Skills</p>
        <div class="tag-row">${agent.skills.map(skillTagButton).join("")}</div>
      </div>
    </section>
    ${compactPanel(
      "Assigned Cases",
      "담당 케이스",
      linked.length
        ? `<div class="context-list">${linked.map(caseLinkButton).join("")}</div>`
        : '<div class="empty-state">연결된 케이스 없음</div>',
    )}
    ${compactPanel(
      "Agent Actions",
      "실행 가능 action",
      `<div class="action-row action-stack">
        <button id="agent-run-case" class="primary-button" type="button" ${firstCase && firstCase.status !== "Agent Running" ? "" : "disabled"}>
          <span aria-hidden="true">▶</span>
          ${escapeHtml(firstCase ? `${firstCase.code} 실행` : "실행할 케이스 없음")}
        </button>
        <button id="agent-open-cases" class="secondary-button" type="button" ${firstCase ? "" : "disabled"}>케이스 화면으로 이동</button>
        <button id="back-to-case" class="ghost-button" type="button">Selected Case로 돌아가기</button>
      </div>`,
    )}
  `;
}

function skillDetailMarkup() {
  const skill = currentSkill();
  const users = agentsBySkill(skill.slug);
  const linked = casesBySkill(skill.slug);
  const riskPill = skill.risk === "high" ? "status-escalated" : skill.risk === "medium" ? "status-pending" : "status-approved";
  return `
    <section class="panel selected-case-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Selected Skill</p>
          <h3>${escapeHtml(skill.slug)}</h3>
        </div>
        <span class="status-pill ${riskPill}">${escapeHtml(skill.risk)}</span>
      </div>
      <div class="case-properties">
        <div class="property-list">
          ${propertyRow("Type", skill.type)}
          ${propertyRow("Purpose", skill.purpose)}
          ${propertyRow("위험도", skill.risk)}
          ${propertyRow("승인 정책", skill.approval)}
          ${propertyRow("Enabled", skill.enabled ? "yes" : "no")}
        </div>
      </div>
    </section>
    ${compactPanel(
      "Mounted Agents",
      "이 Skill을 사용하는 Agent",
      users.length
        ? `<div class="context-list">${users.map(agentLinkButton).join("")}</div>`
        : '<div class="empty-state">장착한 Agent 없음</div>',
    )}
    ${compactPanel(
      "Applied Cases",
      "이 Skill이 적용된 Case",
      linked.length
        ? `<div class="context-list">${linked.map(caseLinkButton).join("")}</div>`
        : '<div class="empty-state">적용된 케이스 없음</div>',
    )}
    ${compactPanel("Navigate", "이동", '<div class="action-row action-stack"><button id="back-to-case" class="ghost-button" type="button">Selected Case로 돌아가기</button></div>')}
  `;
}

function featureDetailMarkup() {
  const feature = currentFeature();
  const featureAgents = agentsByFeature(feature);
  const jeonseCase = cases.find((item) => item.pains.includes("jeonse-fraud"));
  return `
    <section class="panel selected-case-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Jeonse Shield Feature</p>
          <h3>${escapeHtml(feature.title)}</h3>
        </div>
        <span class="status-pill status-running">active</span>
      </div>
      <div class="case-properties">
        <p>${escapeHtml(feature.description)}</p>
        <p class="eyebrow">Linked Skills</p>
        <div class="tag-row">${feature.skills.map(skillTagButton).join("")}</div>
      </div>
    </section>
    ${compactPanel(
      "Linked Agents",
      "이 기능을 수행하는 Agent",
      featureAgents.length
        ? `<div class="context-list">${featureAgents.map(agentLinkButton).join("")}</div>`
        : '<div class="empty-state">연결된 Agent 없음</div>',
    )}
    ${compactPanel(
      "Target Case",
      "적용 대상 케이스",
      jeonseCase ? `<div class="context-list">${caseLinkButton(jeonseCase)}</div>` : '<div class="empty-state">전세 케이스 없음</div>',
    )}
    ${compactPanel("Navigate", "이동", '<div class="action-row action-stack"><button id="back-to-case" class="ghost-button" type="button">Selected Case로 돌아가기</button></div>')}
  `;
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
        <p class="eyebrow">Mounted Skills</p>
        <div class="tag-row">${skillsByCase(item).map(skillTagButton).join("")}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Case Agents</p>
          <h3>담당 Agent</h3>
        </div>
      </div>
      <div class="context-list">${caseAgents(item).map(agentLinkButton).join("") || '<div class="empty-state">배정된 Agent 없음</div>'}</div>
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
    .map((entry) => {
      const selected = entry.id === selectedEvidenceId;
      const linkedCases = casesByEvidence(entry.id);
      const judgment = selected
        ? `
          <div class="evidence-judgment">
            <p class="eyebrow">이 Evidence가 연결된 판단</p>
            <p><strong>${escapeHtml(item.code)}</strong> · ${escapeHtml(item.approvalTitle)}</p>
            <p>다음 행동: ${escapeHtml(item.nextAction)}</p>
            <p>사용 케이스: ${linkedCases.map((linked) => escapeHtml(linked.code)).join(", ") || "없음"}</p>
          </div>
        `
        : "";
      return `
        <article class="evidence-card is-clickable ${selected ? "is-selected" : ""}" data-evidence-id="${escapeHtml(entry.id)}" role="button" tabindex="0">
          <span class="source-badge">${escapeHtml(entry.type)} · ${escapeHtml(entry.source)}</span>
          <a href="${escapeHtml(entry.url)}" target="_blank" rel="noreferrer">${escapeHtml(entry.title)}</a>
          <p>${escapeHtml(entry.implication)}</p>
          ${judgment}
        </article>
      `;
    })
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

function startAgentRun(item, command) {
  runSequence += 1;
  const run = {
    id: `run-${String(runSequence).padStart(3, "0")}`,
    caseId: item.id,
    caseCode: item.code,
    agentName: item.owner,
    startedAt: timestamp(),
    status: "running",
    command,
    log: [[timestamp(), `Run started by ${item.owner}. Mounted skills and injected case context.`]],
  };
  agentRuns.unshift(run);

  item.status = "Agent Running";
  item.stage = "in_progress";
  item.audit.push([timestamp(), `AgentRun ${run.id} started: ${command}`]);
  activity.unshift([timestamp(), item.owner, "checked out", item.code]);

  window.setTimeout(() => {
    if (run.status !== "running") return;
    const target = cases.find((entry) => entry.id === run.caseId);
    run.log.push([
      timestamp(),
      target && target.pains.includes("jeonse-fraud")
        ? "Registry Rights Agent: 등기부 권리관계와 전세가율 신호를 교차 확인 중."
        : "Evidence Harvest: 근거 소스와 상담 메모를 case context에 연결 중.",
    ]);
    render();
  }, 700);

  window.setTimeout(() => {
    if (run.status !== "running") return;
    const target = cases.find((entry) => entry.id === run.caseId);
    if (!target) return;
    const escalate = target.id === "gunsan-manufacturing";
    run.status = escalate ? "escalated" : "approval_pending";
    run.log.push([
      timestamp(),
      escalate
        ? "Fraud Shield: Customer-facing action remains blocked. Internal escalation only."
        : "Approval Gate: Draft action is ready for human review.",
    ]);
    if (target.status === "Agent Running") {
      target.status = escalate ? "Escalated" : "Approval Pending";
      target.stage = escalate ? "blocked" : "pending_approval";
      target.transcript.push(
        escalate
          ? "Fraud Shield: Customer-facing action remains blocked. Internal escalation only."
          : "Approval Gate: Draft action is ready for human review.",
      );
      target.audit.push([timestamp(), `AgentRun ${run.id} completed and approval policy evaluated.`]);
      activity.unshift([timestamp(), "Approval Gate", escalate ? "escalated case" : "created approval", target.code]);
    }
    render();
  }, 1600);

  return run;
}

function runAgents() {
  const item = currentCase();
  if (item.status === "Agent Running") return;
  startAgentRun(item, item.nextAction);
  render();
}

function closeRunsForCase(item, status, logText) {
  agentRuns
    .filter((run) => run.caseId === item.id && (run.status === "approval_pending" || run.status === "running"))
    .forEach((run) => {
      run.status = status;
      run.log.push([timestamp(), logText]);
    });
}

function approveAction() {
  const item = currentCase();
  if (item.status !== "Approval Pending") return;
  item.status = "Approved";
  item.stage = "done";
  item.audit.push([timestamp(), "Human RM approved the proposed action. Demo outbound task recorded."]);
  activity.unshift([timestamp(), "Human RM", "approved action", item.code]);
  closeRunsForCase(item, "completed", "Human RM approved the action. Run closed.");
  render();
}

function rejectAction() {
  const item = currentCase();
  if (item.status !== "Approval Pending") return;
  item.status = "Rejected";
  item.stage = "blocked";
  item.audit.push([timestamp(), "Human reviewer rejected the draft and requested revision."]);
  activity.unshift([timestamp(), "Human reviewer", "rejected draft", item.code]);
  closeRunsForCase(item, "rejected", "Human reviewer rejected the draft. Run closed.");
  render();
}

function dispatchCommand() {
  const item = currentCase();
  const commandInput = document.getElementById("command-input");
  const command = (commandInput ? commandInput.value.trim() : "") || "empty command";
  item.audit.push([timestamp(), `Orchestrator command received: ${command}`]);
  activity.unshift([timestamp(), "LocalGuard Orchestrator", "dispatched command", item.code]);
  startAgentRun(item, command);
  activeView = "runs";
  activeDetailType = "case";
  render();
}

function newCaseDemo() {
  caseSequence += 1;
  const code = `JBG-${caseSequence}`;
  const affiliate = railFilter === "all" ? "전북은행" : railFilter;
  const fresh = {
    id: `manual-${caseSequence}`,
    code,
    customerName: `신규 위험 상담 ${code}`,
    affiliate,
    segment: "개인사업자",
    region: "전북 전주",
    industry: "상담 접수",
    riskScore: 55,
    status: "New",
    priority: "medium",
    zeroHuman: "L1 초안 + 원클릭 승인",
    sla: "1d",
    owner: "LocalGuard Orchestrator",
    stage: "todo",
    due: "내일 18:00",
    exposure: "상담 접수 · 분류 대기",
    primaryPain: "분류 대기",
    nextAction: "Pain 분류와 담당 Agent 배정",
    approvalTitle: "초기 분류 결과 확인",
    pains: ["triage"],
    rootCauses: ["신규 접수"],
    evidenceIds: ["jb-network"],
    gates: [["RM 승인 후 고객 접촉", "pending"]],
    agents: ["orchestrator", "pain-radar"],
    transcript: [],
    audit: [[timestamp(), "Case registered from console New Case button."]],
  };
  cases.push(fresh);
  activity.unshift([timestamp(), "LocalGuard Orchestrator", "registered case", code]);
  selectedCaseId = fresh.id;
  activeView = "cases";
  activeDetailType = "case";
  render();
}

function selectCase(caseId) {
  selectedCaseId = caseId;
  selectedEvidenceId = null;
  activeDetailType = "case";
  render();
}

function selectAgent(agentId) {
  selectedAgentId = agentId;
  activeDetailType = "agent";
  render();
}

function selectSkill(slug) {
  selectedSkillId = slug;
  activeDetailType = "skill";
  render();
}

function selectFeature(featureId) {
  selectedFeatureId = featureId;
  activeDetailType = "feature";
  render();
}

function selectEvidence(entryId) {
  selectedEvidenceId = selectedEvidenceId === entryId ? null : entryId;
  render();
}

function bindPress(element, handler) {
  element.addEventListener("click", handler);
  element.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (element.tagName === "BUTTON" || element.tagName === "A") return;
    event.preventDefault();
    handler();
  });
}

function bindSelectionTargets() {
  document.querySelectorAll("[data-case-id]").forEach((element) => {
    bindPress(element, () => selectCase(element.dataset.caseId));
  });
  document.querySelectorAll("[data-agent-id]").forEach((element) => {
    bindPress(element, () => selectAgent(element.dataset.agentId));
  });
  document.querySelectorAll("[data-skill-id]").forEach((element) => {
    bindPress(element, () => selectSkill(element.dataset.skillId));
  });
  document.querySelectorAll("[data-feature-id]").forEach((element) => {
    bindPress(element, () => selectFeature(element.dataset.featureId));
  });
  document.querySelectorAll("[data-evidence-id]").forEach((element) => {
    bindPress(element, () => selectEvidence(element.dataset.evidenceId));
  });
}

function bindActions() {
  document.getElementById("new-case-button").addEventListener("click", newCaseDemo);
  document.getElementById("sidebar-search").addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (!query) return;
    const foundCase = cases.find((item) => `${item.customerName} ${item.code} ${item.affiliate}`.toLowerCase().includes(query));
    if (foundCase) {
      selectedCaseId = foundCase.id;
      activeDetailType = "case";
      render();
      return;
    }
    const foundAgent = agents.find((agent) => `${agent.name} ${agent.role}`.toLowerCase().includes(query));
    if (foundAgent) {
      selectedAgentId = foundAgent.id;
      activeDetailType = "agent";
      if (activeView !== "orgchart") activeView = "agents";
      render();
      return;
    }
    const foundSkill = skillRack.find((skill) => `${skill.slug} ${skill.type} ${skill.purpose}`.toLowerCase().includes(query));
    if (foundSkill) {
      selectedSkillId = foundSkill.slug;
      activeDetailType = "skill";
      activeView = "skills";
      render();
    }
  });

  document.querySelectorAll("[data-affiliate]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.affiliate;
      railFilter = railFilter === next ? "all" : next;
      document.querySelectorAll("[data-affiliate]").forEach((entry) => {
        entry.classList.toggle("is-active", entry.dataset.affiliate === railFilter);
      });
      const scoped = visibleCases();
      if (!scoped.some((item) => item.id === selectedCaseId) && scoped.length) {
        selectedCaseId = scoped[0].id;
      }
      render();
    });
  });
}

function bindContextActions() {
  const runButton = document.getElementById("run-agents");
  const approveButton = document.getElementById("approve-action");
  const rejectButton = document.getElementById("reject-action");
  if (runButton) runButton.addEventListener("click", runAgents);
  if (approveButton) approveButton.addEventListener("click", approveAction);
  if (rejectButton) rejectButton.addEventListener("click", rejectAction);

  const backButton = document.getElementById("back-to-case");
  if (backButton) {
    backButton.addEventListener("click", () => {
      activeDetailType = "case";
      render();
    });
  }

  const agentRunButton = document.getElementById("agent-run-case");
  if (agentRunButton) {
    agentRunButton.addEventListener("click", () => {
      const agent = currentAgent();
      if (!agent) return;
      const linked = casesByAgent(agent.id);
      const target = linked.find((item) => item.status !== "Agent Running");
      if (!target) return;
      selectedCaseId = target.id;
      startAgentRun(target, `${agent.name} 단독 실행: ${target.nextAction}`);
      render();
    });
  }

  const agentCasesButton = document.getElementById("agent-open-cases");
  if (agentCasesButton) {
    agentCasesButton.addEventListener("click", () => {
      const agent = currentAgent();
      if (!agent) return;
      const linked = casesByAgent(agent.id);
      if (linked.length) selectedCaseId = linked[0].id;
      activeView = "cases";
      activeDetailType = "case";
      render();
    });
  }
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
  bindSelectionTargets();
}

bindActions();
render();
