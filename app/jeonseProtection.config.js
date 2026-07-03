/* 전세사기 보호 담당자 역할 하네스 — 전용 route/nav/업무유형/위험신호/라벨 config.
   "역할 = 화면 필터"가 아니라 "역할 = 독립 업무 하네스".
   Presentation shell(4-zone·jbwc-* CSS 토큰)은 공통을 재사용하되,
   업무 메뉴·분류·상태·데이터 스코프는 메인/계열사 하네스와 완전히 분리한다. */

const JPO_ROLE_KEY = "jeonse-protection-officer";
const JPO_WORKSPACE_ID = "jeonse-protection";
const JPO_DISPLAY_NAME = "전세사기 보호 담당자";
const JPO_ROUTE_BASE = "/roles/jeonse-protection";

const JPO_REQUIRED_ROUTES = [
  "/roles/jeonse-protection",
  "/roles/jeonse-protection/board",
  "/roles/jeonse-protection/cases",
  "/roles/jeonse-protection/cases/new",
  "/roles/jeonse-protection/cases/:caseId",
  "/roles/jeonse-protection/approvals",
  "/roles/jeonse-protection/audit-logs",
  "/roles/jeonse-protection/privacy-permissions",
  "/roles/jeonse-protection/integrations",
  "/roles/jeonse-protection/pre-contract-risk",
  "/roles/jeonse-protection/price-ratio",
  "/roles/jeonse-protection/registry-rights",
  "/roles/jeonse-protection/guarantee-hug",
  "/roles/jeonse-protection/auction-support",
  "/roles/jeonse-protection/support-referrals",
  "/roles/jeonse-protection/victim-decision",
  "/roles/jeonse-protection/alerts",
  "/roles/jeonse-protection/vulnerable-tenants",
  "/roles/jeonse-protection/ai-analysis",
  "/roles/jeonse-protection/ai-assist",
  "/roles/jeonse-protection/agent-harness",
  "/roles/jeonse-protection/capabilities",
  "/roles/jeonse-protection/roles",
  "/roles/jeonse-protection/inspections",
];

/* 업무 유형 10종 — 신규 접수 위저드 Step 1과 파생 테이블/뷰 매핑의 단일 기준 */
const JPO_TASK_TAXONOMY = {
  preContractRisk: {
    label: "계약 전 위험 점검",
    team: "전세위험분석팀",
    routeView: "pre-contract-risk",
    initialStatus: "inReview",
    derived: "jeonse_risk_assessments",
  },
  priceRatio: {
    label: "전세가율·시세 점검",
    team: "전세위험분석팀",
    routeView: "price-ratio",
    initialStatus: "inReview",
    derived: "jeonse_price_ratio_checks",
  },
  registryRights: {
    label: "권리관계·등기 점검",
    team: "권리분석팀",
    routeView: "registry-rights",
    initialStatus: "waitingExternalData",
    derived: "jeonse_registry_checks",
  },
  guaranteeHug: {
    label: "보증보험/HUG 검토",
    team: "보증연계팀",
    routeView: "guarantee-hug",
    initialStatus: "pendingGuaranteeReview",
    derived: "jeonse_guarantee_reviews",
    requiresHumanReview: true,
  },
  auctionSupport: {
    label: "경공매 지원 안내",
    team: "피해지원팀",
    routeView: "auction-support",
    initialStatus: "inReview",
    derived: "jeonse_referrals",
    referralCategory: "auction",
    requiresHumanReview: true,
  },
  victimDecision: {
    label: "피해자 결정 신청 보조",
    team: "피해지원팀",
    routeView: "victim-decision",
    initialStatus: "pendingVictimReview",
    derived: "jeonse_victim_support_reviews",
    requiresHumanReview: true,
  },
  legalReferral: {
    label: "법률상담 연계",
    team: "피해지원팀",
    routeView: "support-referrals",
    initialStatus: "inReview",
    derived: "jeonse_referrals",
    referralCategory: "legal",
    requiresHumanReview: true,
  },
  careReferral: {
    label: "심리·주거 지원 연계",
    team: "피해지원팀",
    routeView: "support-referrals",
    initialStatus: "inReview",
    derived: "jeonse_referrals",
    referralCategory: "care",
  },
  vulnerableTenant: {
    label: "취약고객 보호",
    team: "고객보호팀",
    routeView: "vulnerable-tenants",
    initialStatus: "inReview",
    derived: "jeonse_risk_assessments",
    assessmentKind: "vulnerableTenant",
    requiresHumanReview: true,
  },
  urgentAlert: {
    label: "긴급 위험 알림",
    team: "전세위험분석팀",
    routeView: "alerts",
    initialStatus: "escalated",
    derived: "jeonse_alerts",
    requiresHumanReview: true,
    escalationRequired: true,
  },
};

/* 위험 신호 10종 — 위저드 Step 3 체크박스와 오케스트레이터 라우팅 입력 */
const JPO_RISK_SIGNALS = {
  ratioHigh: "전세가율 과다 의심",
  depositOverMarket: "주변 시세 대비 보증금 과다",
  lienSuspect: "근저당/압류/가압류 의심",
  trustRegistry: "신탁등기 의심",
  landlordMultiHome: "임대인 다주택/반복 피해 의심",
  guaranteeUncertain: "보증보험 가입 불확실",
  clauseMissing: "계약서 특약 누락",
  infoMismatch: "중개사/임대인 정보 불일치",
  auctionRisk: "경공매 진행 가능성",
  vulnerableTenant: "취약 임차인 여부",
};

const JPO_ACTIVE_CASE_STATUSES = [
  "received", "triaged", "assigned", "inReview", "pendingApproval",
  "pendingVictimReview", "pendingGuaranteeReview", "waitingExternalData", "escalated",
];

const JPO_VIEWS = {
  board: "업무 보드",
  approvals: "검토·승인함",
  "audit-logs": "감사 기록",
  "privacy-permissions": "개인정보·권한 정책",
  integrations: "외부 데이터 연결",
  cases: "전체 전세보호 건 조회",
  "cases-new": "신규 전세보호 건 접수",
  "pre-contract-risk": "계약 전 위험 점검",
  "price-ratio": "전세가율·시세 점검",
  "registry-rights": "권리관계·등기 점검",
  "guarantee-hug": "보증보험·HUG 연계",
  "auction-support": "경공매·피해지원",
  "support-referrals": "법률·심리·주거 지원 연계",
  "victim-decision": "피해자 결정 신청 보조",
  alerts: "긴급 알림",
  "vulnerable-tenants": "취약고객 보호",
  "ai-analysis": "AI 분석 요청",
  "ai-assist": "AI 업무지원",
  "agent-harness": "운영 에이전트 하네스",
  capabilities: "업무 기능",
  roles: "담당자/권한",
  inspections: "정기 점검",
};

const JPO_ROUTE_BY_VIEW = Object.fromEntries(
  Object.keys(JPO_VIEWS).map((view) => [view, view === "cases-new" ? `${JPO_ROUTE_BASE}/cases/new` : `${JPO_ROUTE_BASE}/${view}`]),
);
const JPO_VIEW_BY_ROUTE = Object.fromEntries(Object.entries(JPO_ROUTE_BY_VIEW).map(([view, route]) => [route, view]));

const jpoNavigation = [
  { section: "오늘 처리할 일", items: [
    { id: "board", icon: "layout-dashboard", label: "업무 보드", description: "오늘 확인", countKey: "board" },
    { id: "approvals", icon: "check-square", label: "검토·승인함", description: "안내·연계 승인", countKey: "approvals" },
    { id: "audit-logs", icon: "history", label: "감사 기록", description: "검토 필요", countKey: "auditLogs" },
    { id: "privacy-permissions", icon: "settings", label: "개인정보·권한 정책", description: "익명 Ref 원칙", countKey: "privacyPermissions" },
    { id: "integrations", icon: "database", label: "외부 데이터 연결", description: "HUG·국토부", countKey: "integrations" },
    { id: "cases", icon: "file-text", label: "전체 전세보호 건 조회", description: "상세 조회", countKey: "cases" },
  ]},
  { section: "전세보호 업무", items: [
    { id: "pre-contract-risk", icon: "shield", label: "계약 전 위험 점검", description: "사전 예방", countKey: "preContractRisk" },
    { id: "price-ratio", icon: "activity", label: "전세가율·시세 점검", description: "시세 비교", countKey: "priceRatio" },
    { id: "registry-rights", icon: "file-text", label: "권리관계·등기 점검", description: "근저당·신탁", countKey: "registryRights" },
    { id: "guarantee-hug", icon: "wallet", label: "보증보험·HUG 연계", description: "가입요건 검토", countKey: "guaranteeHug" },
    { id: "auction-support", icon: "target", label: "경공매·피해지원", description: "우선매수·퇴거", countKey: "auctionSupport" },
    { id: "support-referrals", icon: "users", label: "법률·심리·주거 지원 연계", description: "기관 안내 후보", countKey: "supportReferrals" },
  ]},
  { section: "고객보호·리스크", items: [
    { id: "victim-decision", icon: "check-square", label: "피해자 결정 신청 보조", description: "체크리스트", countKey: "victimDecision" },
    { id: "alerts", icon: "bell", label: "긴급 알림", description: "고위험 대응", countKey: "urgentAlerts" },
    { id: "vulnerable-tenants", icon: "shield", label: "취약고객 보호", description: "우선 검토", countKey: "vulnerableTenants" },
  ]},
  { section: "AI·자동화 관리", items: [
    { id: "ai-analysis", icon: "activity", label: "AI 분석 요청", description: "대기/실행", countKey: "aiAnalysis" },
    { id: "ai-assist", icon: "bot", label: "AI 업무지원", description: "제안 검토", countKey: "aiAssist" },
    { id: "agent-harness", icon: "bot", label: "운영 에이전트 하네스", description: "10개 에이전트", countKey: "agentHarness" },
    { id: "capabilities", icon: "puzzle", label: "업무 기능", description: "기능 제안", countKey: "capabilities" },
    { id: "roles", icon: "network", label: "담당자/권한", description: "권한 검토", countKey: "roles" },
    { id: "inspections", icon: "refresh-cw", label: "정기 점검", description: "스케줄", countKey: "inspections" },
  ]},
];

/* 상태·필드 한국어 라벨 — key는 DB 계약(영문), 표기만 한국어.
   역할 하네스 독립성을 위해 계열사 하네스 상수를 참조하지 않고 자체 정의한다. */
const JPO_STATUS_LABELS = {
  received: "접수",
  triaged: "분류 완료",
  assigned: "배정됨",
  inReview: "검토중",
  pendingApproval: "승인 대기",
  pendingVictimReview: "피해자결정 검토 대기",
  pendingGuaranteeReview: "보증 검토 대기",
  waitingExternalData: "외부자료 대기",
  escalated: "에스컬레이션",
  open: "미처리",
  inProgress: "진행중",
  pending: "대기",
  queued: "대기열",
  running: "실행중",
  needsReview: "검토 필요",
  investigating: "조사중",
  upcoming: "예정",
  overdue: "기한 초과",
  degraded: "성능 저하",
  down: "중단",
  error: "오류",
  resolved: "해결됨",
  active: "활성",
  enabled: "사용중",
  healthy: "정상",
  completed: "완료",
  closed: "종결",
  rejected: "반려",
  proposed: "제안됨",
  critical: "심각",
};

const JPO_FIELD_LABELS = {
  id: "ID",
  caseNo: "케이스 번호",
  taskType: "업무 유형",
  title: "제목",
  description: "설명",
  status: "상태",
  priority: "우선순위",
  riskLevel: "위험도",
  severity: "심각도",
  assignedTeam: "담당팀",
  assignedToId: "담당자 ID",
  ownerId: "담당자 ID",
  userId: "사용자 ID",
  actorId: "행위자 ID",
  tenantRefId: "임차인 참조 ID",
  contractRefId: "계약 참조 ID",
  propertyRefId: "물건 참조 ID",
  landlordRefId: "임대인 참조 ID",
  addressRefId: "주소 참조 ID",
  depositAmountBand: "보증금 구간",
  leaseStartDate: "임대차 시작일",
  leaseEndDate: "임대차 종료일",
  riskSignals: "위험 신호",
  sourceChannel: "접수 채널",
  tags: "태그",
  requiresHumanReview: "사람 검토 필요",
  requiresHumanEscalation: "사람 에스컬레이션 필수",
  reviewRequired: "검토 필요 여부",
  attachmentsExist: "관련 문서 존재",
  dueAt: "처리 기한",
  createdAt: "생성일",
  updatedAt: "수정일",
  requestedAt: "요청일",
  lastSyncAt: "최근 동기화",
  caseId: "관련 케이스",
  kind: "점검 종류",
  checkType: "점검 유형",
  issueType: "이슈 유형",
  reviewType: "검토 유형",
  approvalType: "승인 유형",
  inspectionType: "점검 유형",
  requestType: "요청 유형",
  referralType: "연계 유형",
  category: "분류",
  policyArea: "정책 영역",
  permissionScope: "권한 범위",
  health: "연결 상태",
  name: "이름",
  team: "팀",
  role: "역할",
  agentId: "에이전트 ID",
  fromAgentId: "출발 에이전트",
  toAgentId: "도착 에이전트",
  reason: "사유",
  inputSummary: "입력 요약",
  outputSummary: "결과 요약",
  confidence: "확신도",
  action: "행위",
  targetType: "대상 유형",
  targetId: "대상 ID",
  requestedById: "요청자 ID",
  approverId: "승인자 ID",
  checklist: "체크리스트",
  ratioBand: "전세가율 구간",
  guaranteeProgram: "보증 프로그램",
  supportProgram: "지원 프로그램",
  externalRef: "외부 참고",
  roleKey: "역할 스코프",
  workspaceId: "워크스페이스",
};

const JPO_SORT_LABELS = {
  default: "기본 정렬",
  status: "상태순",
  riskLevel: "위험도순",
  priority: "우선순위순",
  dueAt: "기한순",
  createdAt: "생성일순",
};

const JPO_PRIORITY_LABELS = { low: "낮음", normal: "보통", high: "높음", urgent: "긴급" };
const JPO_RISK_LABELS = { low: "낮음", medium: "보통", high: "높음", critical: "심각" };

/* 공식 근거 — "안내 후보" 참고 링크로만 사용. 신청 대행·법적 판단 아님.
   법령/지원요건은 바뀔 수 있으므로 화면에 항상 "최신 기준 담당자 확인 필요"를 함께 표시한다. */
const JPO_OFFICIAL_REFERENCES = [
  { key: "molit", label: "국토교통부 전세사기피해자 지원관리시스템", site: "molit.go.kr", note: "피해자 결정 신청 흐름 참고" },
  { key: "hug", label: "HUG 전세피해지원센터 / 전세피해지원 프로그램", site: "khug.or.kr", note: "보증·피해지원 프로그램 안내 후보" },
  { key: "law", label: "전세사기피해자 지원 및 주거안정에 관한 특별법", site: "law.go.kr", note: "요건·절차는 법령 원문 확인" },
  { key: "fsc", label: "금융위원회 전세사기 피해자 금융지원 프로그램", site: "fsc.go.kr", note: "금융지원 안내 후보" },
];

function jpoHashForView(view, caseId) {
  if (caseId) return `#${JPO_ROUTE_BASE}/cases/${encodeURIComponent(caseId)}`;
  const route = JPO_ROUTE_BY_VIEW[view] || JPO_ROUTE_BASE;
  return `#${route}`;
}

function jpoRouteFromHash(hash) {
  const raw = String(hash || "").replace(/^#/, "");
  if (raw === JPO_ROUTE_BASE || raw === "jeonse-protection-harness") return { view: "board" };
  if (!raw.startsWith(JPO_ROUTE_BASE)) return null;
  if (raw.startsWith(`${JPO_ROUTE_BASE}/cases/`) && raw !== `${JPO_ROUTE_BASE}/cases/new`) {
    return { view: "cases", caseId: decodeURIComponent(raw.slice(`${JPO_ROUTE_BASE}/cases/`.length)) };
  }
  return { view: JPO_VIEW_BY_ROUTE[raw] || "board" };
}
