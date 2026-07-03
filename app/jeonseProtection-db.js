/* 전세사기 보호 담당자 역할 하네스 — 전용 mock DB/repository.
   실제 개인정보(실명·주민번호·전화·계좌·주소 원문·등기 원문)는 어떤 필드에도 저장하지 않는다.
   모든 개체는 익명화 Ref(TENANT-REF-*, PROPERTY-REF-*, LANDLORD-REF-*, ADDRESS-REF-*)로만 표현한다. */

const JPO_DB_KEY = "jpo-ops-db-v1";
const JPO_SEED_EXAMPLE_IDS = [
  "JEONSE-CASE-0001",
  "JEONSE-RISK-0001",
  "JEONSE-REG-0001",
  "JEONSE-HUG-0001",
  "JEONSE-VICTIM-0001",
  "JEONSE-ALERT-0001",
  "JEONSE-RUN-0001",
];

function jpoSeedData() {
  const R = JPO_ROLE_KEY;
  const W = JPO_WORKSPACE_ID;
  const today = new Date();
  const iso = (date) => date.toISOString().slice(0, 10);
  const plus = (days) => { const d = new Date(today); d.setDate(d.getDate() + days); return iso(d); };
  const scope = (row) => ({ roleKey: R, workspaceId: W, ...row });

  const users = [
    ["USR-JPO-RISK-01", "위험분석 김OO", "analyst", "전세위험분석팀"],
    ["USR-JPO-RISK-02", "위험분석 이OO", "analyst", "전세위험분석팀"],
    ["USR-JPO-REG-01", "권리분석 박OO", "review", "권리분석팀"],
    ["USR-JPO-GRT-01", "보증연계 정OO", "review", "보증연계팀"],
    ["USR-JPO-SUP-01", "피해지원 최OO", "support", "피해지원팀"],
    ["USR-JPO-SUP-02", "피해지원 한OO", "support", "피해지원팀"],
    ["USR-JPO-CARE-01", "고객보호 윤OO", "care", "고객보호팀"],
    ["USR-JPO-AUD-01", "내부통제 배OO", "compliance", "내부통제팀"],
  ].map(([id, name, role, team]) => ({ id, name, role, team, status: "active", roleKeys: [R] }));

  const ownerByTeam = {
    전세위험분석팀: "USR-JPO-RISK-01",
    권리분석팀: "USR-JPO-REG-01",
    보증연계팀: "USR-JPO-GRT-01",
    피해지원팀: "USR-JPO-SUP-01",
    고객보호팀: "USR-JPO-CARE-01",
    내부통제팀: "USR-JPO-AUD-01",
  };
  const bands = ["1억 미만", "1억~2억", "2억~3억", "3억 이상"];

  const caseSpecs = [
    ["preContractRisk", "신축 빌라 계약 전 위험 점검", "inReview", "normal", "medium", ["ratioHigh"]],
    ["preContractRisk", "재계약 전 위험 신호 재점검", "received", "normal", "medium", ["clauseMissing"]],
    ["priceRatio", "전세가율 90% 초과 의심 점검", "inReview", "high", "high", ["ratioHigh", "depositOverMarket"]],
    ["priceRatio", "주변 시세 대비 보증금 과다 검토", "triaged", "normal", "medium", ["depositOverMarket"]],
    ["registryRights", "근저당 설정 의심 등기 점검", "waitingExternalData", "high", "high", ["lienSuspect"]],
    ["registryRights", "신탁등기 의심 물건 점검", "waitingExternalData", "normal", "medium", ["trustRegistry"]],
    ["guaranteeHug", "보증보험 가입요건 검토", "pendingGuaranteeReview", "normal", "medium", ["guaranteeUncertain"]],
    ["guaranteeHug", "HUG 지원 프로그램 연계 검토", "pendingGuaranteeReview", "high", "medium", ["guaranteeUncertain"]],
    ["auctionSupport", "임차 주택 경매 개시 대응", "escalated", "urgent", "high", ["auctionRisk"]],
    ["auctionSupport", "공매 공고 확인 지원", "inReview", "high", "high", ["auctionRisk"]],
    ["victimDecision", "피해자 결정 신청 서류 준비", "pendingVictimReview", "high", "high", ["landlordMultiHome"]],
    ["victimDecision", "결정 신청 요건 사전 점검", "pendingVictimReview", "normal", "medium", ["landlordMultiHome"]],
    ["legalReferral", "법률상담 연계 요청", "inReview", "normal", "medium", ["infoMismatch"]],
    ["careReferral", "긴급주거 지원 연계 요청", "inReview", "normal", "medium", []],
    ["careReferral", "심리상담 연계 요청", "assigned", "low", "low", []],
    ["vulnerableTenant", "고령 임차인 우선 보호 검토", "inReview", "high", "medium", ["vulnerableTenant"]],
    ["vulnerableTenant", "청년 1인 가구 보호 검토", "inReview", "normal", "medium", ["vulnerableTenant"]],
    ["urgentAlert", "임대인 연락 두절 긴급 신호", "escalated", "urgent", "critical", ["landlordMultiHome", "auctionRisk"]],
    ["urgentAlert", "보증금 미반환 임박 신호", "escalated", "urgent", "high", ["ratioHigh"]],
    ["preContractRisk", "중개사 정보 불일치 점검", "inReview", "normal", "medium", ["infoMismatch"]],
  ];

  const jeonse_cases = caseSpecs.map(([taskType, title, status, priority, riskLevel, riskSignals], index) => {
    const n = String(index + 1).padStart(4, "0");
    const taxonomy = JPO_TASK_TAXONOMY[taskType] || {};
    return scope({
      id: `JEONSE-CASE-${n}`,
      caseNo: `JEONSE-CASE-${n}`,
      taskType,
      title,
      description: `${taxonomy.label || taskType} 내부 운영 모의 케이스`,
      status,
      priority,
      riskLevel,
      riskSignals,
      assignedTeam: taxonomy.team || "전세위험분석팀",
      assignedToId: ownerByTeam[taxonomy.team] || "USR-JPO-RISK-01",
      tenantRefId: `TENANT-REF-${n}`,
      contractRefId: `CONTRACT-REF-${n}`,
      propertyRefId: `PROPERTY-REF-${n}`,
      landlordRefId: `LANDLORD-REF-${n}`,
      addressRefId: `ADDRESS-REF-${n}`,
      depositAmountBand: bands[index % bands.length],
      leaseStartDate: plus(-360 + index * 7),
      leaseEndDate: plus(360 - index * 5),
      sourceChannel: index % 3 === 0 ? "contactCenter" : index % 3 === 1 ? "branch" : "opsPortal",
      tags: [taskType].concat(riskSignals),
      requiresHumanReview: Boolean(taxonomy.requiresHumanReview) || ["high", "critical"].includes(riskLevel),
      attachmentsExist: ["registryRights", "victimDecision", "guaranteeHug"].includes(taskType),
      vulnerableTenant: riskSignals.includes("vulnerableTenant"),
      dueAt: plus((index % 5) - 1),
      createdAt: plus(index < 4 ? 0 : -Math.min(index, 14)),
      updatedAt: plus(index % 4 === 0 ? 0 : -1),
    });
  });

  const activeCases = jeonse_cases.filter((c) => JPO_ACTIVE_CASE_STATUSES.includes(c.status));
  const caseByType = (taskType, nth = 0) => jeonse_cases.filter((c) => c.taskType === taskType)[nth]?.id || null;

  return {
    version: 1,
    seededAt: new Date().toISOString(),
    role_workspaces: [
      { id: W, roleKey: R, displayName: JPO_DISPLAY_NAME, harnessId: "jeonseFraudProtectionHarness", status: "active" },
      { id: "fds", roleKey: "fds-officer", displayName: "보이스피싱/FDS 담당자", harnessId: "roadmap", status: "roadmap" },
    ],
    users,
    jeonse_cases: jeonse_cases.concat([
      // 타 역할 스코프 검증용 seed — 전세보호 하네스 count/search/list 어디에도 노출되면 안 된다.
      { roleKey: "fds-officer", workspaceId: "fds", id: "JEONSE-OTHER-0001", caseNo: "JEONSE-OTHER-0001", taskType: "preContractRisk", title: "타 역할 스코프 제외 검증용", description: "role scope 격리 테스트 전용", status: "received", priority: "urgent", riskLevel: "critical", riskSignals: [], assignedTeam: "타 역할", assignedToId: "USR-JPO-RISK-01", tenantRefId: "TENANT-REF-9999", contractRefId: "CONTRACT-REF-9999", propertyRefId: "PROPERTY-REF-9999", landlordRefId: "LANDLORD-REF-9999", addressRefId: "ADDRESS-REF-9999", depositAmountBand: "1억~2억", leaseStartDate: plus(-30), leaseEndDate: plus(300), sourceChannel: "test", tags: ["exclude"], requiresHumanReview: true, attachmentsExist: false, vulnerableTenant: false, dueAt: plus(0), createdAt: plus(0), updatedAt: plus(0) },
    ]),
    jeonse_tasks: activeCases.slice(0, 12).map((c, index) => scope({
      id: `JEONSE-TASK-${String(index + 1).padStart(4, "0")}`,
      caseId: c.id,
      title: `${JPO_TASK_TAXONOMY[c.taskType]?.label || c.taskType} 확인`,
      status: index % 4 === 0 ? "inProgress" : index % 5 === 0 ? "overdue" : "open",
      dueAt: c.dueAt,
      ownerId: c.assignedToId,
    })),
    jeonse_risk_assessments: [
      scope({ id: "JEONSE-RISK-0001", caseId: caseByType("preContractRisk", 0), kind: "preContract", ratioBand: "80~90%", status: "open", riskLevel: "medium", checklist: ["전세가율 구간 확인", "특약 문구 점검"] }),
      scope({ id: "JEONSE-RISK-0002", caseId: caseByType("preContractRisk", 1), kind: "preContract", ratioBand: "70~80%", status: "inReview", riskLevel: "medium", checklist: ["재계약 조건 비교"] }),
      scope({ id: "JEONSE-RISK-0003", caseId: caseByType("preContractRisk", 2), kind: "preContract", ratioBand: "확인 필요", status: "open", riskLevel: "medium", checklist: ["중개사 정보 대조"] }),
      scope({ id: "JEONSE-RISK-0004", caseId: caseByType("priceRatio", 0), kind: "preContract", ratioBand: "90% 이상", status: "inReview", riskLevel: "high", checklist: ["시세 재확인"] }),
      scope({ id: "JEONSE-RISK-0005", caseId: caseByType("vulnerableTenant", 0), kind: "vulnerableTenant", ratioBand: "-", status: "open", riskLevel: "medium", checklist: ["고령 임차인 우선 연락 순서"] }),
      scope({ id: "JEONSE-RISK-0006", caseId: caseByType("vulnerableTenant", 1), kind: "vulnerableTenant", ratioBand: "-", status: "inReview", riskLevel: "medium", checklist: ["청년 1인 가구 안내 채널"] }),
      scope({ id: "JEONSE-RISK-0007", caseId: caseByType("urgentAlert", 0), kind: "vulnerableTenant", ratioBand: "-", status: "open", riskLevel: "high", checklist: ["긴급 보호 검토"] }),
    ],
    jeonse_price_ratio_checks: [
      scope({ id: "JEONSE-PRICE-0001", caseId: caseByType("priceRatio", 0), ratioBand: "90% 이상", status: "open", riskLevel: "high", checkType: "전세가율 구간 점검" }),
      scope({ id: "JEONSE-PRICE-0002", caseId: caseByType("priceRatio", 1), ratioBand: "80~90%", status: "inReview", riskLevel: "medium", checkType: "시세 대비 보증금 점검" }),
      scope({ id: "JEONSE-PRICE-0003", caseId: caseByType("preContractRisk", 0), ratioBand: "80~90%", status: "open", riskLevel: "medium", checkType: "계약 전 구간 점검" }),
      scope({ id: "JEONSE-PRICE-0004", caseId: caseByType("urgentAlert", 1), ratioBand: "90% 이상", status: "open", riskLevel: "critical", checkType: "미반환 위험 구간 점검" }),
    ],
    jeonse_registry_checks: [
      scope({ id: "JEONSE-REG-0001", caseId: caseByType("registryRights", 0), issueType: "근저당 의심", status: "open", riskLevel: "high" }),
      scope({ id: "JEONSE-REG-0002", caseId: caseByType("registryRights", 1), issueType: "신탁등기 의심", status: "waitingExternalData", riskLevel: "medium" }),
      scope({ id: "JEONSE-REG-0003", caseId: caseByType("auctionSupport", 0), issueType: "압류/가압류 의심", status: "inReview", riskLevel: "high" }),
      scope({ id: "JEONSE-REG-0004", caseId: caseByType("victimDecision", 0), issueType: "소유권 이전 이력", status: "open", riskLevel: "medium" }),
    ],
    jeonse_guarantee_reviews: [
      scope({ id: "JEONSE-HUG-0001", caseId: caseByType("guaranteeHug", 0), reviewType: "가입요건 검토", guaranteeProgram: "전세보증금 반환보증(안내 후보)", status: "open", requiresHumanReview: true }),
      scope({ id: "JEONSE-HUG-0002", caseId: caseByType("guaranteeHug", 1), reviewType: "HUG 프로그램 연계", guaranteeProgram: "전세피해지원 프로그램(안내 후보)", status: "needsReview", requiresHumanReview: true }),
      scope({ id: "JEONSE-HUG-0003", caseId: caseByType("auctionSupport", 1), reviewType: "보증사고 여부 확인", guaranteeProgram: "확인 필요", status: "open", requiresHumanReview: true }),
    ],
    jeonse_victim_support_reviews: [
      scope({ id: "JEONSE-VICTIM-0001", caseId: caseByType("victimDecision", 0), reviewType: "결정 신청 체크리스트", status: "open", requiresHumanReview: true, checklist: ["임대차계약 참조 확인", "피해 정황 요약(익명)", "신청 서류 목록 준비"] }),
      scope({ id: "JEONSE-VICTIM-0002", caseId: caseByType("victimDecision", 1), reviewType: "요건 사전 점검", status: "needsReview", requiresHumanReview: true, checklist: ["특별법 요건 항목 대조"] }),
      scope({ id: "JEONSE-VICTIM-0003", caseId: caseByType("auctionSupport", 0), reviewType: "경매 병행 결정 검토", status: "open", requiresHumanReview: true, checklist: ["경매 일정 확인", "우선매수 안내 후보"] }),
    ],
    jeonse_referrals: [
      scope({ id: "JEONSE-REF-0001", caseId: caseByType("auctionSupport", 0), category: "auction", referralType: "경공매 지원 안내", supportProgram: "우선매수·퇴거 유예(안내 후보)", status: "pending", requiresHumanReview: true }),
      scope({ id: "JEONSE-REF-0002", caseId: caseByType("auctionSupport", 1), category: "auction", referralType: "공매 대응 안내", supportProgram: "공매 절차 안내(안내 후보)", status: "open", requiresHumanReview: true }),
      scope({ id: "JEONSE-REF-0003", caseId: caseByType("legalReferral", 0), category: "legal", referralType: "법률상담 연계", supportProgram: "법률구조 상담(안내 후보)", status: "pending", requiresHumanReview: true }),
      scope({ id: "JEONSE-REF-0004", caseId: caseByType("victimDecision", 0), category: "legal", referralType: "법률상담 연계", supportProgram: "특별법 상담(안내 후보)", status: "open", requiresHumanReview: true }),
      scope({ id: "JEONSE-REF-0005", caseId: caseByType("careReferral", 0), category: "care", referralType: "긴급주거 지원 연계", supportProgram: "긴급주거 지원(안내 후보)", status: "pending", requiresHumanReview: false }),
      scope({ id: "JEONSE-REF-0006", caseId: caseByType("careReferral", 1), category: "care", referralType: "심리상담 연계", supportProgram: "심리상담 연계(안내 후보)", status: "open", requiresHumanReview: false }),
    ],
    jeonse_alerts: [
      scope({ id: "JEONSE-ALERT-0001", caseId: caseByType("urgentAlert", 0), alertType: "임대인 연락 두절", severity: "critical", status: "open", requiresHumanEscalation: true }),
      scope({ id: "JEONSE-ALERT-0002", caseId: caseByType("urgentAlert", 1), alertType: "보증금 미반환 임박", severity: "high", status: "open", requiresHumanEscalation: true }),
      scope({ id: "JEONSE-ALERT-0003", caseId: caseByType("auctionSupport", 0), alertType: "경매 개시 결정", severity: "high", status: "investigating", requiresHumanEscalation: true }),
    ],
    approvals: [
      scope({ id: "APR-JPO-0001", caseId: caseByType("careReferral", 0), approvalType: "고객 안내문 발송 승인", status: "pending", requestedById: "USR-JPO-SUP-01", approverId: "USR-JPO-AUD-01", requestedAt: plus(0) }),
      scope({ id: "APR-JPO-0002", caseId: caseByType("auctionSupport", 0), approvalType: "경공매 지원 안내 승인", status: "pending", requestedById: "USR-JPO-SUP-01", approverId: "USR-JPO-AUD-01", requestedAt: plus(0) }),
      scope({ id: "APR-JPO-0003", caseId: caseByType("legalReferral", 0), approvalType: "법률상담 연계 승인", status: "pending", requestedById: "USR-JPO-SUP-02", approverId: "USR-JPO-AUD-01", requestedAt: plus(-1) }),
      scope({ id: "APR-JPO-0004", caseId: caseByType("priceRatio", 0), approvalType: "위험등급 변경 승인", status: "approved", requestedById: "USR-JPO-RISK-01", approverId: "USR-JPO-AUD-01", requestedAt: plus(-2) }),
    ],
    audit_logs: [
      scope({ id: "AUD-JPO-0001", actorId: "USR-JPO-RISK-01", action: "RISK_SCORE_CHANGED", targetType: "case", targetId: caseByType("priceRatio", 0), riskLevel: "high", reviewRequired: true, createdAt: plus(0) }),
      scope({ id: "AUD-JPO-0002", actorId: "USR-JPO-SUP-01", action: "SUPPORT_REFERRAL_LINKED", targetType: "referral", targetId: "JEONSE-REF-0001", riskLevel: "medium", reviewRequired: true, createdAt: plus(0) }),
      scope({ id: "AUD-JPO-0003", actorId: "jpo-registry", action: "EXTERNAL_DATA_QUERIED", targetType: "registry", targetId: "JEONSE-REG-0001", riskLevel: "medium", reviewRequired: true, createdAt: plus(-1) }),
      scope({ id: "AUD-JPO-0004", actorId: "jpo-comms", action: "TENANT_NOTICE_DRAFTED", targetType: "approval", targetId: "APR-JPO-0001", riskLevel: "medium", reviewRequired: true, createdAt: plus(-1) }),
      scope({ id: "AUD-JPO-0005", actorId: "jpo-privacy", action: "REDACTION_CHECK_FLAGGED", targetType: "privacy", targetId: "PRV-JPO-0001", riskLevel: "medium", reviewRequired: true, createdAt: plus(-2) }),
      scope({ id: "AUD-JPO-0006", actorId: "USR-JPO-AUD-01", action: "APPROVAL_DECIDED", targetType: "approval", targetId: "APR-JPO-0004", riskLevel: "low", reviewRequired: false, createdAt: plus(-2) }),
    ],
    privacy_permission_checks: [
      scope({ id: "PRV-JPO-0001", policyArea: "실명·주민번호·상세주소 원문 저장 금지", status: "open", riskLevel: "high", ownerId: "USR-JPO-AUD-01", dueAt: plus(1) }),
      scope({ id: "PRV-JPO-0002", policyArea: "증빙 자료 마스킹 점검", status: "needsReview", riskLevel: "medium", ownerId: "USR-JPO-AUD-01", dueAt: plus(2) }),
      scope({ id: "PRV-JPO-0003", policyArea: "외부반출 승인 절차 점검", status: "open", riskLevel: "medium", ownerId: "USR-JPO-AUD-01", dueAt: plus(6) }),
    ],
    external_connectors: [
      scope({ id: "CON-JPO-0001", name: "HUG 전세피해지원센터 연계(모의)", category: "guarantee", status: "active", lastSyncAt: plus(0), health: "healthy", externalRef: "khug.or.kr" }),
      scope({ id: "CON-JPO-0002", name: "국토부 피해자 지원관리시스템 연계(모의)", category: "victimSupport", status: "active", lastSyncAt: plus(0), health: "healthy", externalRef: "molit.go.kr" }),
      scope({ id: "CON-JPO-0003", name: "등기 이슈 조회(모의)", category: "registry", status: "active", lastSyncAt: plus(-1), health: "degraded", externalRef: "iros.go.kr" }),
      scope({ id: "CON-JPO-0004", name: "시세 비교 피드(모의)", category: "price", status: "active", lastSyncAt: plus(0), health: "healthy", externalRef: "molit.go.kr" }),
      scope({ id: "CON-JPO-0005", name: "보증요건 점검 피드(모의)", category: "guarantee", status: "error", lastSyncAt: plus(-3), health: "down", externalRef: "khug.or.kr" }),
    ],
    ai_analysis_requests: [
      scope({ id: "AIR-JPO-0001", caseId: caseByType("priceRatio", 0), requestType: "전세가율 구간 분석", status: "running", requestedById: "USR-JPO-RISK-01", createdAt: plus(0) }),
      scope({ id: "AIR-JPO-0002", caseId: caseByType("registryRights", 0), requestType: "등기 이슈 분류", status: "queued", requestedById: "USR-JPO-REG-01", createdAt: plus(0) }),
      scope({ id: "AIR-JPO-0003", caseId: caseByType("victimDecision", 0), requestType: "결정 신청 체크리스트 초안", status: "running", requestedById: "USR-JPO-SUP-01", createdAt: plus(-1) }),
    ],
    ai_recommendations: [
      scope({ id: "REC-JPO-0001", caseId: caseByType("priceRatio", 0), agentId: "jpo-price", title: "전세가율 구간 재검토 체크리스트", status: "active", confidence: "high", createdAt: plus(0) }),
      scope({ id: "REC-JPO-0002", caseId: caseByType("registryRights", 0), agentId: "jpo-registry", title: "근저당 이슈 확인 순서 제안", status: "proposed", confidence: "medium", createdAt: plus(0) }),
      scope({ id: "REC-JPO-0003", caseId: caseByType("guaranteeHug", 0), agentId: "jpo-guarantee", title: "가입요건 검토 항목 정리", status: "active", confidence: "high", createdAt: plus(-1) }),
      scope({ id: "REC-JPO-0004", caseId: caseByType("victimDecision", 0), agentId: "jpo-victim", title: "결정 신청 서류 준비 순서", status: "active", confidence: "high", createdAt: plus(0) }),
      scope({ id: "REC-JPO-0005", caseId: caseByType("careReferral", 0), agentId: "jpo-comms", title: "임차인 안내 문자 초안(승인 대기)", status: "proposed", confidence: "medium", createdAt: plus(0) }),
    ],
    harness_agents: [],
    agent_runs: [
      scope({ id: "JEONSE-RUN-0001", agentId: "jpo-price", caseId: caseByType("priceRatio", 0), inputSummary: "전세가율 구간 점검", outputSummary: "90% 이상 구간 — 검토 필요", status: "needsReview", riskLevel: "high", requiresHumanEscalation: false, createdAt: plus(0) }),
      scope({ id: "JEONSE-RUN-0002", agentId: "jpo-registry", caseId: caseByType("registryRights", 0), inputSummary: "근저당 의심 분류", outputSummary: "외부자료 대기 등록", status: "running", riskLevel: "medium", requiresHumanEscalation: false, createdAt: plus(0) }),
      scope({ id: "JEONSE-RUN-0003", agentId: "jpo-auction", caseId: caseByType("auctionSupport", 0), inputSummary: "경매 개시 신호", outputSummary: "사람 에스컬레이션 + 지원 안내 후보", status: "needsReview", riskLevel: "high", requiresHumanEscalation: true, createdAt: plus(0) }),
      scope({ id: "JEONSE-RUN-0004", agentId: "jpo-victim", caseId: caseByType("victimDecision", 0), inputSummary: "결정 신청 체크리스트", outputSummary: "담당자 검토 필요", status: "needsReview", riskLevel: "medium", requiresHumanEscalation: false, createdAt: plus(-1) }),
      scope({ id: "JEONSE-RUN-0005", agentId: "jpo-comms", caseId: caseByType("careReferral", 0), inputSummary: "임차인 안내 문자 초안", outputSummary: "발송 승인 대기 등록", status: "pendingApproval", riskLevel: "medium", requiresHumanEscalation: false, createdAt: plus(0) }),
      scope({ id: "JEONSE-RUN-0006", agentId: "jpo-referral", caseId: caseByType("careReferral", 1), inputSummary: "심리상담 연계 후보", outputSummary: "연계 후보 정리 완료", status: "completed", riskLevel: "low", requiresHumanEscalation: false, createdAt: plus(-1) }),
    ],
    agent_handoffs: [
      scope({ id: "HND-JPO-0001", fromAgentId: "jpo-orchestrator", toAgentId: "jpo-auction", caseId: caseByType("auctionSupport", 0), reason: "경매 개시 고위험 — 사람 검토 필수", status: "escalated", createdAt: plus(0) }),
      scope({ id: "HND-JPO-0002", fromAgentId: "jpo-price", toAgentId: "jpo-registry", caseId: caseByType("priceRatio", 0), reason: "권리관계 동반 점검", status: "open", createdAt: plus(0) }),
      scope({ id: "HND-JPO-0003", fromAgentId: "jpo-comms", toAgentId: "jpo-audit", caseId: caseByType("careReferral", 0), reason: "안내문 발송 승인 추적", status: "open", createdAt: plus(-1) }),
    ],
    business_capabilities: (typeof jeonseProtectionAgents !== "undefined" ? jeonseProtectionAgents : []).map((agent, index) => scope({
      id: `CAP-JPO-${String(index + 1).padStart(4, "0")}`,
      name: `${agent.displayName} 운영 체크`,
      domain: agent.domain,
      status: index % 3 === 0 ? "proposed" : "enabled",
      proposedByAgentId: agent.id,
    })),
    role_assignments: users.map((user, index) => scope({
      id: `ROL-JPO-${String(index + 1).padStart(4, "0")}`,
      userId: user.id,
      role: user.role,
      permissionScope: user.team,
      status: index % 4 === 0 ? "needsReview" : "active",
      reviewRequired: index % 4 === 0,
    })),
    inspection_schedules: [
      scope({ id: "INS-JPO-0001", inspectionType: "개인정보 접근권한 정기점검", status: "upcoming", dueAt: plus(4), ownerId: "USR-JPO-AUD-01" }),
      scope({ id: "INS-JPO-0002", inspectionType: "등기 이슈 커넥터 재점검", status: "overdue", dueAt: plus(-2), ownerId: "USR-JPO-REG-01" }),
      scope({ id: "INS-JPO-0003", inspectionType: "보증 연계 상태 점검", status: "upcoming", dueAt: plus(6), ownerId: "USR-JPO-GRT-01" }),
    ],
  };
}

let jpoDbCache = null;

function jpoLoadDb() {
  if (jpoDbCache) return jpoDbCache;
  try {
    const raw = window.localStorage.getItem(JPO_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 1) {
        jpoDbCache = parsed;
        jpoSyncHarnessAgents(jpoDbCache);
        jpoSaveDb();
        return jpoDbCache;
      }
    }
  } catch (error) { /* 손상 시 재시드 */ }
  jpoDbCache = jpoSeedData();
  jpoSyncHarnessAgents(jpoDbCache);
  jpoSaveDb();
  return jpoDbCache;
}

function jpoSaveDb() {
  try { window.localStorage.setItem(JPO_DB_KEY, JSON.stringify(jpoDbCache)); } catch (error) { /* 메모리 유지 */ }
}

function jpoResetDb() {
  jpoDbCache = jpoSeedData();
  jpoSyncHarnessAgents(jpoDbCache);
  jpoSaveDb();
}

function jpoSyncHarnessAgents(db) {
  if (typeof jeonseFraudProtectionHarness === "undefined") return;
  db.harness_agents = jeonseFraudProtectionHarness.agents.map((agent) => ({
    id: agent.id,
    roleKey: JPO_ROLE_KEY,
    workspaceId: JPO_WORKSPACE_ID,
    name: agent.displayName || agent.name,
    domain: agent.domain,
    status: agent.status,
    description: agent.description,
  }));
}

function jpoTable(table, roleKey) {
  if (!roleKey) throw new Error("role scope is required");
  const db = jpoLoadDb();
  const rows = db[table] || [];
  if (table === "role_workspaces") return rows.slice();
  if (table === "users") return rows.filter((row) => !row.roleKeys || row.roleKeys.includes(roleKey));
  return rows.filter((row) => row.roleKey === roleKey);
}

function jpoInsert(table, row) {
  const db = jpoLoadDb();
  db[table] = db[table] || [];
  db[table].unshift(row);
  jpoSaveDb();
  return row;
}

function jpoNextId(prefix, table) {
  const db = jpoLoadDb();
  const count = (db[table] || []).filter((row) => String(row.id || "").startsWith(prefix)).length + 1;
  return `${prefix}-${String(count).padStart(4, "0")}`;
}

/* Repository interface — 운영 DB 전환 시 이 5개 진입점만 서버 구현으로 교체한다.
   계약: table(name, roleKey)은 roleKey 필수(미지정 시 예외), insert는 roleKey/workspaceId가
   채워진 row만, nextId는 데모용 순번(운영 전환 시 시퀀스/UUID), reset/snapshot은 데모 전용. */
const jpoRepository = {
  table: jpoTable,
  insert: jpoInsert,
  nextId: jpoNextId,
  reset: jpoResetDb,
  snapshot: jpoLoadDb,
};
