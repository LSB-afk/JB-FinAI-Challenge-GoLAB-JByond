/* RM 역할 하네스 — 전용 mock DB/repository.
   scope(roleKey) 강제: scope 미지정 조회 시 예외를 던진다.
   실제 고객 주민/전화/계좌 원문은 저장하지 않는다(가상 인물명·익명 Ref만).
   seed: RM 콘솔 Figma 3케이스 + 히어로(전주 카페) 승격 + 완료 데모 케이스 + 타 scope 격리 seed. */

const RMO_DB_KEY = "rmo-ops-db-v1";

function rmoSeedData() {
  const today = new Date();
  const iso = (date) => date.toISOString().slice(0, 10);
  const plus = (days) => { const d = new Date(today); d.setDate(d.getDate() + days); return iso(d); };
  const now = iso(today);
  const scope = (row) => ({ roleKey: RMO_ROLE_KEY, workspaceId: RMO_WORKSPACE_ID, ...row });

  const users = [
    ["USR-RMO-01", "RM 담당 김OO", "rm", "지역RM팀"],
    ["USR-RMO-02", "RM 담당 이OO", "rm", "여신관리팀"],
    ["USR-RMO-03", "RM 담당 박OO", "rm", "리테일RM팀"],
    ["USR-RMO-04", "정책금융 담당 최OO", "policy", "정책금융팀"],
    ["USR-RMO-APR-01", "승인권자 한OO", "approver", "승인권자"],
  ].map(([id, name, role, team]) => ({ id, name, role, team, status: "active", roleKeys: [RMO_ROLE_KEY] }));

  /* [조건부 정합차] 페르소나 필드(이름·지역·은행)를 한 곳에 모아 한 줄로 교체 가능하게 유지한다.
     Case JBG-206은 Figma 표기(강하준·광주 북구·전북은행)를 따른다. 볼트 canon
     (조동준·광주 광산구·광주은행)으로 팀 확정 시 아래 rmoPersonas 한 줄만 교체하면 된다.
     verify_static needle에는 페르소나 이름을 넣지 않는다(제목·버튼·에이전트명 등 안정 라벨만). */
  const rmoPersonas = {
    "JBG-204": { customerAlias: "문서희", region: "전남 완도군", bank: "광주은행" },
    "JBG-206": { customerAlias: "강하준", region: "광주 북구", bank: "전북은행" },
    "JBG-207": { customerAlias: "임세빈", region: "전북 전주시", bank: "전북은행" },
    "JBG-208": { customerAlias: "한도영", region: "전북 전주시", bank: "전북은행" },
    "JBG-198": { customerAlias: "오세라", region: "전북 군산시", bank: "전북은행" },
    "JBG-202": { customerAlias: "배주안", region: "전남 여수시", bank: "광주은행" },
    /* 신규 3종 — 코디네이터 지시대로 마스킹 이름 그대로 유지(나이 별도 필드) */
    "JBG-210": { customerAlias: "오**", customerAge: 39, region: "전북 전주시", bank: "전북은행", affiliate: "JB우리캐피탈" },
    "JBG-211": { customerAlias: "윤**", customerAge: 76, region: "전북 전주시", bank: "전북은행" },
    "JBG-212": { customerAlias: "송**", customerAge: 50, region: "전북 김제시", bank: "전북은행" },
    "JBG-213": { customerAlias: "차**", customerAge: 22, region: "전북 익산시", bank: "전북은행" },
    "JBG-214": { customerAlias: "박**", customerAge: 29, region: "전북 군산시", bank: "전북은행" },
    "JBG-215": { customerAlias: "김**", customerAge: 34, region: "광주 서구", bank: "광주은행" },
    "JBG-216": { customerAlias: "정**", customerAge: 41, region: "전남 목포시", bank: "광주은행" },
    "JBG-217": { customerAlias: "서**", customerAge: 45, region: "전북 남원시", bank: "전북은행" },
  };

  /* 핵심 케이스 정의 (Figma 3 + 히어로 + 완료 데모 + 진행중 데모 + 업무 계층도 신규 3종)
     — 페르소나는 rmoPersonas에서 병합. goal = 케이스 상세 상단 "처리 목표". */
  const caseDefs = [
    { caseNo: "JBG-204", caseType: "disasterRisk", theme: "양식장 재해위험 대응",
      situation: "고수온 예보와 태풍 접근으로 전복 폐사 위험이 커지며 사료비·운전자금 부담이 동시에 올라온 완도 양식장 케이스.",
      goal: "재해 노출 정도를 파악하고 상환유예·정책 재해자금 안내 필요 여부를 확정한다.",
      stage: "todo", status: "intake", riskLevel: "high", requestedAmountBand: "1억~3억", dueAt: plus(1), assignedRmId: "USR-RMO-01" },
    { caseNo: "JBG-206", caseType: "repaymentCare", theme: "육아휴직 복귀기 상환부담 관리",
      situation: "육아휴직 복귀 직후 급여가 정상화되기 전 카드론과 직장인 대출 상환일이 겹친 광주 직장인 케이스.",
      goal: "소득 정상화 시점을 확인하고 상환일 조정 후보를 준비한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "3천만원 이하", dueAt: plus(3), assignedRmId: "USR-RMO-02" },
    { caseNo: "JBG-207", caseType: "dailyFinance", theme: "생활비 공백 대응",
      situation: "국가장학금 입금 전 생활비 공백이 생긴 전북 대학생이 소액 대출과 아르바이트 급여 사이에서 흔들리는 케이스.",
      goal: "생활비 공백 구간을 확인하고 고금리 대체대출 위험을 사전 안내한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "5백만원 이하", dueAt: plus(4), assignedRmId: "USR-RMO-03" },
    { caseNo: "JBG-208", caseType: "policyStartup", theme: "전주 중앙로 카페 여신 상담",
      situation: "전주 중앙로에서 카페를 운영하는 소상공인이 재료비 인상과 초기 시설투자 상환으로 정책자금·협약대출 안내를 요청한 히어로 케이스.",
      goal: "정책자금·협약대출 자격 요건을 확인하고 안내 문안을 준비한다.",
      stage: "doing", status: "analyzing", riskLevel: "medium", requestedAmountBand: "5천만원~1억", dueAt: plus(2), assignedRmId: "USR-RMO-04", running: "rmo-policy-finance" },
    { caseNo: "JBG-198", caseType: "repaymentCare", theme: "자영업 상환일 집중 관리",
      situation: "성수기 매출 변동으로 상환일이 특정 월에 몰린 군산 자영업자의 상환일 분산 검토가 끝난 완료 데모 케이스.",
      goal: "상환일 분산 검토를 완료하고 사후관리를 종결한다.",
      stage: "done", status: "completed", riskLevel: "medium", requestedAmountBand: "3천만원~5천만원", dueAt: plus(-1), assignedRmId: "USR-RMO-02", completed: true },
    { caseNo: "JBG-202", caseType: "disasterRisk", theme: "수산 가공장 재해 대응",
      situation: "풍랑 경보로 원재료 입고가 지연되며 운전자금 상환일이 임박한 여수 수산 가공장 케이스로 담당자 검토 대기 중.",
      goal: "재해 노출 분석을 마무리하고 통합 보고서를 담당자가 최종 승인한다.",
      stage: "doing", status: "humanReview", riskLevel: "high", requestedAmountBand: "5천만원~1억", dueAt: plus(2), assignedRmId: "USR-RMO-01" },
    { caseNo: "JBG-210", caseType: "bizCreditReferral", theme: "기업여신·기술신용 상담",
      situation: "매출 입금 공백과 원자재 비용 인상이 겹치며 초기 시설투자 상환 부담이 커진 전주 소재 사업장의 기업여신·기술신용 상담 케이스.",
      goal: "매출·비용·계약·기술신용 근거를 종합해 여신 담당자 검토 보고서를 완성한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "5천만원~1억", dueAt: plus(3), assignedRmId: "USR-RMO-02",
      rejectedAgentId: "rmo-biz-lease-review" },
    { caseNo: "JBG-211", caseType: "fraudResponse", theme: "보이스피싱 대응",
      situation: "평소와 다른 고액 이체 시도가 반복되고 고령자 사기 유형과 유사도가 높게 나타난 고령 고객 보이스피싱 의심 케이스.",
      goal: "이상거래·위험 패턴 분석을 완료하고 송금 보류 여부를 담당자가 즉시 승인한다.",
      stage: "doing", status: "humanReview", riskLevel: "high", requestedAmountBand: "-", dueAt: plus(0), assignedRmId: "USR-RMO-01",
      allBranchesCompleted: true },
    { caseNo: "JBG-212", caseType: "agriPostMonitoring", theme: "농수산 여신 사후관리",
      situation: "출하 대금 입금 공백과 농자재 지출 증가가 계절적 저점 구간과 겹치는 김제 농가의 사후관리 케이스.",
      goal: "지출·계절 요인을 종합해 상환유예 검토 필요 여부를 판단한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "3천만원~5천만원", dueAt: plus(5), assignedRmId: "USR-RMO-03" },
    { caseNo: "JBG-213", caseType: "dailyFinance", theme: "학자금 납부 일정 점검",
      situation: "학사 일정과 장학금 입금 예정일 사이에 등록금·생활비 공백이 생겨 단기 소액자금 상담을 요청한 대학생 케이스.",
      goal: "학자금·장학금 입금 구간을 확인하고 고금리 대체 이용 전 상담 안내를 준비한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "5백만원 이하", dueAt: plus(6), assignedRmId: "USR-RMO-03" },
    { caseNo: "JBG-214", caseType: "dailyFinance", theme: "생활비 소액대출 상환 리마인드",
      situation: "소액대출 상환일과 월세 납부일이 같은 주에 몰려 생활비 공백과 연체 우려가 동시에 나타난 청년 고객 케이스.",
      goal: "상환일과 필수 지출 일정을 비교해 리마인드 후보와 상담 콜백 태스크를 정리한다.",
      stage: "doing", status: "analyzing", riskLevel: "medium", requestedAmountBand: "5백만원 이하", dueAt: plus(2), assignedRmId: "USR-RMO-03", running: "rmo-youth-finance" },
    { caseNo: "JBG-215", caseType: "dailyFinance", theme: "급여 입금 지연 생활비 공백",
      situation: "급여 입금일이 예상보다 늦어지며 카드 결제일과 통신비 자동이체가 겹친 직장인 생활금융 상담 케이스.",
      goal: "급여 입금 주기와 고정 지출을 비교해 생활비 공백 구간과 리마인드 문안을 만든다.",
      stage: "todo", status: "intake", riskLevel: "low", requestedAmountBand: "5백만원 이하", dueAt: plus(7), assignedRmId: "USR-RMO-03" },
    { caseNo: "JBG-216", caseType: "policyStartup", theme: "지역 협약대출 서류 체크",
      situation: "신규 창업자가 사업자등록 직후 지역 협약대출 가능 여부와 준비 서류를 문의한 정책금융 상담 케이스.",
      goal: "정책자금 자격 체크리스트와 상담 전 필요 서류를 분리해 안내한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "3천만원 이하", dueAt: plus(4), assignedRmId: "USR-RMO-04" },
    { caseNo: "JBG-217", caseType: "repaymentCare", theme: "상환일 집중 구간 재조정 상담",
      situation: "운전자금과 소액대출 상환일이 같은 주에 몰려 월말 현금흐름 부담이 커진 소상공인 상환부담 관리 케이스.",
      goal: "상환일 집중도를 확인하고 담당자 검토용 조정 후보와 콜백 태스크를 생성한다.",
      stage: "todo", status: "intake", riskLevel: "medium", requestedAmountBand: "3천만원 이하", dueAt: plus(3), assignedRmId: "USR-RMO-02" },
  ];

  const rm_officer_cases = caseDefs.map((def, index) => {
    const persona = rmoPersonas[def.caseNo] || {};
    const priority = computeRmOfficerPriority(def);
    const wm = rmoWorkMapAgentsForCaseType(def.caseType);
    return scope({
      id: `RMO-CASE-${String(index + 1).padStart(4, "0")}`,
      caseNo: def.caseNo,
      customerRefId: `RMO-CUST-${String(index + 1).padStart(4, "0")}`,
      customerAlias: persona.customerAlias,
      customerAge: persona.customerAge,
      affiliate: persona.affiliate || "",
      bank: persona.bank,
      region: persona.region,
      caseType: def.caseType,
      theme: def.theme,
      title: def.theme,
      situation: def.situation,
      goal: def.goal || "",
      stage: def.stage,
      status: def.status,
      riskLevel: def.riskLevel,
      priority: priority.priority,
      priorityScore: priority.priorityScore,
      priorityReason: priority.priorityReason,
      prioritySources: priority.prioritySources,
      requestedAmountBand: def.requestedAmountBand,
      assignedRmId: def.assignedRmId,
      assignedTeam: RMO_CASE_TYPES[def.caseType].team,
      dueAt: def.dueAt,
      requiresHumanReview: priority.requiresHumanReview,
      escalationRequired: priority.escalationRequired,
      agentPlan: wm.branches.concat([wm.report]),
      createdAt: plus(-index),
      updatedAt: now,
      tags: [RMO_CASE_TYPES[def.caseType].label, persona.bank],
    });
  });

  /* 타 scope 격리 검증 seed — 조회 시 노출되면 안 됨 */
  rm_officer_cases.push({ roleKey: "other-role", workspaceId: "other", id: "RMO-OTHER-0001", caseNo: "RMO-격리검증", customerAlias: "타역할", theme: "타 역할 데이터", stage: "todo", status: "intake", riskLevel: "critical" });

  const caseRows = rm_officer_cases.filter((row) => row.roleKey === RMO_ROLE_KEY);
  const caseByNo = (no) => caseRows.find((c) => c.caseNo === no);

  /* 에이전트 업무 계층도(Agent Work Map) 노드 — 각 케이스의 branch(분석) + report(최종 보고서)를
     rm_officer_agent_assignments 행으로 저장한다. kind가 트리 위치를, 11필드(role/inputData/tools/
     riskLevel/requiresApproval/outputMdPath 등)가 "왜 이 에이전트가 필요한지"를 설명한다. */
  const rm_officer_agent_assignments = [];
  let asgSeq = 1;
  function pushWorkMapNode(c, agentId, order, kind, status) {
    const agent = rmOfficerAgents.find((a) => a.id === agentId) || rmOfficerAgents[0];
    const tpl = rmoDeliverableTemplate(agentId);
    const fields = rmoNodeFieldsFor(agentId);
    rm_officer_agent_assignments.push(scope({
      id: `RMO-ASG-${String(asgSeq++).padStart(4, "0")}`,
      caseId: c.id,
      agentId,
      order,
      kind,
      status,
      expectedOutput: agent.deliverableFile,
      outputMdPath: agent.deliverableFile,
      estimatedMinutes: agent.estimatedMinutes,
      reason: agent.description,
      role: fields.role,
      inputData: fields.inputData,
      tools: fields.tools,
      riskLevel: fields.riskLevel || c.riskLevel,
      requiresApproval: true,
      expectedValue: tpl.expectedValue,
      dataChips: (tpl.sources || []).map((s) => s.label),
      progress: status === "completed" ? 100 : 0,
      createdAt: c.createdAt,
    }));
  }
  caseRows.forEach((c) => {
    const def = caseDefs.find((d) => d.caseNo === c.caseNo) || {};
    const wm = rmoWorkMapAgentsForCaseType(c.caseType);
    const allDone = c.status === "completed";
    wm.branches.forEach((agentId, order) => {
      let status = "pendingApproval"; // 실행 가능(ready/파랑)
      if (allDone || def.allBranchesCompleted) status = "completed";
      else if (def.running === agentId) status = "running";
      else if (def.rejectedAgentId === agentId) status = "rejected";
      else if (c.status === "humanReview" && order === 0) status = "completed"; // 담당자 검토 대기 케이스는 첫 분석만 완료 데모
      pushWorkMapNode(c, agentId, order, "branch", status);
    });
    let reportStatus = "notStarted"; // 분석 미완료 시 회색 — report는 모든 branch 완료 후에만 실행 가능
    if (allDone) reportStatus = "completed";
    else if (def.allBranchesCompleted) reportStatus = "needsApproval"; // 분석 전원 완료·사람 승인 대기(보라)
    pushWorkMapNode(c, wm.report, wm.branches.length, "report", reportStatus);
  });

  /* 산출물(개별 md + 통합본) — 총괄(orchestrator) priority-brief.md는 모든 케이스에 생성하고,
     완료/진행 데모 케이스는 브랜치·리포트 md도 미리 만들어 둔다. */
  const rm_officer_deliverables = [];
  let delSeq = 1;
  function pushDeliverables(caseRow, agentIds, withIntegrated) {
    const built = agentIds.map((agentId) => {
      const d = rmoBuildAgentDeliverable(caseRow, agentId);
      d.id = `RMO-DLV-${String(delSeq++).padStart(4, "0")}`;
      rm_officer_deliverables.push(scope(d));
      return d;
    });
    if (withIntegrated) {
      const integrated = rmoBuildIntegratedDeliverable(caseRow, built);
      integrated.id = `RMO-DLV-${String(delSeq++).padStart(4, "0")}`;
      rm_officer_deliverables.push(scope(integrated));
    }
    return built;
  }
  caseRows.forEach((c) => pushDeliverables(c, ["rmo-triage"], false));
  const completedCase = caseByNo("JBG-198");
  if (completedCase) pushDeliverables(completedCase, completedCase.agentPlan, true);
  const humanReviewCase = caseByNo("JBG-202");
  if (humanReviewCase) pushDeliverables(humanReviewCase, [humanReviewCase.agentPlan[0]], false);
  /* 윤** — 분석 4건 전원 완료 + 리포트 작성 완료 + 통합본까지 만들어 두고, 사람 최종 승인만 남긴다(보라) */
  const fraudCase = caseByNo("JBG-211");
  if (fraudCase) pushDeliverables(fraudCase, fraudCase.agentPlan, true);

  const rm_officer_tasks = caseRows.slice(0, 5).map((c, index) => scope({
    id: `RMO-TASK-${String(index + 1).padStart(4, "0")}`,
    caseId: c.id,
    title: c.caseType === "disasterRisk" ? "재해 대응 상환유예 검토" : c.caseType === "policyStartup" ? "정책자금 안내 준비" : "상환일 조정 후보 검토",
    status: index % 4 === 0 ? "overdue" : "open",
    dueAt: c.dueAt,
    ownerId: c.assignedRmId,
  }));

  const rm_officer_consult_queue = [
    scope({ id: "RMO-CQ-0001", caseId: caseByNo("JBG-204").id, channel: "지점 방문", topic: "재해 운전자금 상담", status: "pending", requestedAt: now, ownerId: "USR-RMO-01" }),
    scope({ id: "RMO-CQ-0002", caseId: caseByNo("JBG-206").id, channel: "전화 상담", topic: "상환일 조정 상담", status: "pending", requestedAt: plus(-1), ownerId: "USR-RMO-02" }),
    scope({ id: "RMO-CQ-0003", caseId: caseByNo("JBG-208").id, channel: "지점 방문", topic: "정책자금 상담", status: "inProgress", requestedAt: plus(-1), ownerId: "USR-RMO-04" }),
    scope({ id: "RMO-CQ-0004", caseId: caseByNo("JBG-207").id, channel: "모바일", topic: "생활비 소액대출 상담", status: "pending", requestedAt: now, ownerId: "USR-RMO-03" }),
  ];

  const rm_officer_policy_checklists = [
    scope({ id: "RMO-POL-0001", caseId: caseByNo("JBG-208").id, program: "소상공인 정책자금", item: "매출 규모·업력 요건 확인", status: "open", reviewRequired: true, createdAt: now }),
    scope({ id: "RMO-POL-0002", caseId: caseByNo("JBG-208").id, program: "지역 협약대출", item: "이차보전 대상 여부 확인", status: "open", reviewRequired: true, createdAt: now }),
    scope({ id: "RMO-POL-0003", caseId: caseByNo("JBG-204").id, program: "재해 정책자금", item: "재해 피해 확인 서류 안내", status: "open", reviewRequired: true, createdAt: now }),
  ];

  const rm_officer_agent_runs = [];
  let runSeq = 1;
  function pushRun(agentId, caseRow, outputSummary, status, riskLevel) {
    rm_officer_agent_runs.push(scope({
      id: `RMO-RUN-${String(runSeq++).padStart(4, "0")}`,
      agentId,
      caseId: caseRow.id,
      inputSummary: `${caseRow.caseNo} ${RMO_CASE_TYPES[caseRow.caseType].label} 검토`,
      outputSummary,
      status,
      riskLevel: riskLevel || caseRow.riskLevel,
      requiresHumanReview: ["high", "critical"].includes(riskLevel || caseRow.riskLevel),
      runtime: "mock",
      model: "",
      runtimeStatus: "mock",
      validatedOutput: "",
      errorSummary: "",
      createdAt: plus(-(runSeq % 3)),
    }));
  }
  if (completedCase) completedCase.agentPlan.forEach((agentId) => pushRun(agentId, completedCase, "내부 업무 참고용 산출물 생성 · 통합본 연결", "completed", "medium"));
  if (humanReviewCase) pushRun(humanReviewCase.agentPlan[0], humanReviewCase, "재해 노출 요약 생성 · 담당자 검토 필요", "needsReview", "high");
  pushRun("rmo-triage", caseByNo("JBG-204"), "우선순위 근거 산정 · 급한 순 1위", "completed", "high");

  const rm_officer_agent_handoffs = [
    scope({ id: "RMO-HND-0001", fromAgentId: "rmo-triage", toAgentId: "rmo-marine-risk", caseId: caseByNo("JBG-204").id, reason: "재해 권역 매칭 필요", status: "open", createdAt: now }),
    scope({ id: "RMO-HND-0002", fromAgentId: "rmo-marine-risk", toAgentId: "rmo-compliance", caseId: caseByNo("JBG-202").id, reason: "high 위험 — 준법 검증 후 승인 라우팅", status: "escalated", createdAt: plus(-1) }),
    scope({ id: "RMO-HND-0003", fromAgentId: "rmo-comms", toAgentId: "rmo-approval-router", caseId: caseByNo("JBG-208").id, reason: "고객 안내문 발송 승인 필요", status: "open", createdAt: now }),
  ];

  const rm_officer_approvals = [
    scope({ id: "RMO-APR-0001", caseId: caseByNo("JBG-202").id, approvalType: "상환유예 검토 승인 요청", status: "pending", requestedById: "USR-RMO-01", approverId: "USR-RMO-APR-01", requestedAt: now }),
    scope({ id: "RMO-APR-0002", caseId: caseByNo("JBG-208").id, approvalType: "고객 안내문 발송 승인", status: "pending", requestedById: "USR-RMO-04", approverId: "USR-RMO-APR-01", requestedAt: now }),
    scope({ id: "RMO-APR-0003", caseId: caseByNo("JBG-198").id, approvalType: "상환일 조정 안내 승인", status: "approved", requestedById: "USR-RMO-02", approverId: "USR-RMO-APR-01", requestedAt: plus(-2), decidedAt: plus(-1), decidedBy: "USR-RMO-APR-01" }),
    scope({ id: "RMO-APR-0004", caseId: caseByNo("JBG-211").id, approvalType: "고위험 통합 리포트 검토 승인", status: "pending", requestedById: "USR-RMO-01", approverId: "USR-RMO-APR-01", requestedAt: now }),
  ];

  const rm_officer_evidence_items = caseRows.slice(0, 5).map((c, index) => scope({
    id: `RMO-EVD-${String(index + 1).padStart(4, "0")}`,
    caseId: c.id,
    evidenceType: ["intake", "priority", "marine", "repayment", "policy"][index % 5],
    title: "운영 근거 요약",
    summary: "민감 원문 없는 담당자 입력/샘플 기준 근거",
    sourceMode: "sample",
    createdAt: c.createdAt,
    reviewRequired: index % 2 === 0,
  }));

  const rm_officer_audit_logs = caseRows.slice(0, 6).map((c, index) => scope({
    id: `RMO-AUD-${String(index + 1).padStart(4, "0")}`,
    caseId: c.id,
    actorId: index % 2 ? "rmo-triage" : c.assignedRmId,
    action: ["CASE_CREATED", "PRIORITY_SCORED", "AGENT_RUN_RECORDED", "DELIVERABLE_CREATED", "APPROVAL_ROUTED", "HUMAN_REVIEW_REQUIRED"][index % 6],
    targetType: "rm_officer_case",
    targetId: c.id,
    riskLevel: c.riskLevel,
    reviewRequired: ["high", "critical"].includes(c.riskLevel),
    createdAt: c.createdAt,
  }));

  const rm_officer_external_connectors = [
    scope({ id: "RMO-CON-0001", name: "기상특보·고수온 예보(공개)", category: "marine", status: "active", health: "healthy", dataMode: "sample", lastSyncAt: now }),
    scope({ id: "RMO-CON-0002", name: "상환일정·급여주기(샘플)", category: "repayment", status: "active", health: "healthy", dataMode: "sample", lastSyncAt: plus(-1) }),
    scope({ id: "RMO-CON-0003", name: "정책자금 요건 안내(공개)", category: "policy", status: "active", health: "healthy", dataMode: "sample", lastSyncAt: plus(-2) }),
    scope({ id: "RMO-CON-0004", name: "학사일정·장학금 구간(샘플)", category: "dailyFinance", status: "manualRequired", health: "degraded", dataMode: "manualRequired", lastSyncAt: "" }),
  ];

  const rm_officer_role_assignments = users.map((u, index) => scope({
    id: `RMO-ROLE-${String(index + 1).padStart(4, "0")}`,
    userId: u.id,
    role: u.role,
    permissionScope: u.team,
    status: index === 4 ? "needsReview" : "active",
    reviewRequired: index === 4,
  }));

  return {
    version: RMO_DB_VERSION,
    seededAt: new Date().toISOString(),
    role_workspaces: [{ id: RMO_WORKSPACE_ID, roleKey: RMO_ROLE_KEY, displayName: RMO_DISPLAY_NAME, harnessId: "rmOfficerHarness", status: "active" }],
    rm_officer_users: users,
    rm_officer_cases,
    rm_officer_agent_assignments,
    rm_officer_deliverables,
    rm_officer_tasks,
    rm_officer_consult_queue,
    rm_officer_policy_checklists,
    rm_officer_agent_runs,
    rm_officer_agent_handoffs,
    rm_officer_approvals,
    rm_officer_evidence_items,
    rm_officer_audit_logs,
    rm_officer_external_connectors,
    rm_officer_role_assignments,
  };
}

let rmoDbCache = null;

function rmoLoadDb() {
  if (rmoDbCache) return rmoDbCache;
  try {
    const raw = window.localStorage.getItem(RMO_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === RMO_DB_VERSION) {
        rmoDbCache = parsed;
        rmoSyncHarnessAgents(rmoDbCache);
        rmoSaveDb();
        return rmoDbCache;
      }
    }
  } catch (error) { /* re-seed */ }
  rmoDbCache = rmoSeedData();
  rmoSyncHarnessAgents(rmoDbCache);
  rmoSaveDb();
  return rmoDbCache;
}

function rmoSaveDb() {
  try { window.localStorage.setItem(RMO_DB_KEY, JSON.stringify(rmoDbCache)); } catch (error) { /* memory only */ }
}

function rmoResetDb() {
  rmoDbCache = rmoSeedData();
  rmoSyncHarnessAgents(rmoDbCache);
  rmoSaveDb();
}

function rmoSyncHarnessAgents(db) {
  db.rm_officer_harness_agents = rmOfficerHarness.agents.map((agent) => ({
    id: agent.id,
    roleKey: RMO_ROLE_KEY,
    workspaceId: RMO_WORKSPACE_ID,
    name: agent.displayName || agent.name,
    org: agent.org,
    domain: agent.domain,
    status: agent.status,
    description: agent.description,
  }));
}

function rmoTable(table, roleKey) {
  if (!roleKey) throw new Error("role scope is required");
  const db = rmoLoadDb();
  const rows = db[table] || [];
  if (table === "role_workspaces") return rows.slice();
  if (table === "rm_officer_users") return rows.filter((row) => !row.roleKeys || row.roleKeys.includes(roleKey));
  return rows.filter((row) => row.roleKey === roleKey);
}

function rmoScopedRow(row) {
  return { roleKey: RMO_ROLE_KEY, workspaceId: RMO_WORKSPACE_ID, ...row };
}

function rmoInsert(table, row) {
  const db = rmoLoadDb();
  db[table] = db[table] || [];
  db[table].unshift(row);
  rmoSaveDb();
  return row;
}

function rmoUpdate(table, id, patch) {
  const db = rmoLoadDb();
  const rows = db[table] || [];
  const row = rows.find((item) => item.id === id);
  if (row) Object.assign(row, patch);
  rmoSaveDb();
  return row;
}

function rmoNextId(prefix, table) {
  const db = rmoLoadDb();
  const count = (db[table] || []).filter((row) => String(row.id || "").startsWith(prefix)).length + 1;
  return `${prefix}-${String(count).padStart(4, "0")}`;
}

const rmoRepository = {
  table: rmoTable,
  insert: rmoInsert,
  update: rmoUpdate,
  nextId: rmoNextId,
  reset: rmoResetDb,
  snapshot: rmoLoadDb,
};
