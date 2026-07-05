---
tags: [area/product, type/reference, status/active]
date: 2026-07-05
up: "[[INDEX|제품 인덱스]]"
aliases: [구현 색인, implementation index]
---

# Implementation Index — 시스템별 실작동 vs 설계

> 목적 = 시스템별 "실작동(E4) vs 부분 vs 설계"를 한 표로 — 발표·QA에서 과장 없이 인용하는 SSOT.

각 ✅ 판정에는 코드 파일:함수 또는 검증 기록 1개씩을 근거로 붙였다. 코드로 직접 확인되지 않은 항목은 ✅를 주지 않았다.

| 시스템 | 상태 | 어디서 작동 | 실행/시연 방법 | 설계 SSOT |
|---|---|---|---|---|
| Agent 콘솔 5종(CCL/FDR/JPO/JBWC/RM) | ✅작동(5콘솔 전부 하네스 라우팅), **단 CCL 계보는 8c274b5에서 CCR로 교체·구코드 죽음** | `_vendor/JB_project2/app/` — CCL 14뷰·FDR 16뷰·JPO 29뷰·JBWC 24뷰 + **RM(rm-officer) 16뷰**(`RMO_VIEWS`, `RMO_ROUTE_BASE=/roles/rm-officer`, 전용 레지스트리·키보드 퍼스트). **재검증 2026-07-05**: 이전 "RM=단일페이지" 판정은 레거시 `rmDashboardPage`(app.js:1769, label-only — harnessRegistry에 재유입 차단 가드 존재) 오인이었음. **재검증 2026-07-05 #2(8c274b5)**: 기업여신 콘솔의 실라이브 코드가 `cclConsole.*`에서 `corporateCredit.*`(CCR, 15파일/2,036줄/25뷰/15에이전트)로 전면 교체됐고, `harnessRegistry.js`가 `id:"corporate-credit"`를 이중등록하다 두 번째(cclConsole 기반, 미로드 파일 참조) 블록에서 `ReferenceError`로 중단 — 그 여파로 `fds-response` 하네스가 레지스트리에 **한 번도 등록되지 않아** FDS 콘솔의 훅 가드레일(`beforeCaseCreate` 등)이 항상 `{ok:true}`로 무력화됨(구조적 결함, `[[08_본선/03_제품/reports/구현현황-JB_project2\|구현현황-JB_project2]] §12`) | index.html에서 org-rail 계열사/역할 전환 클릭 → 해당 콘솔 board 뷰 렌더 | [[08_본선/03_제품/docs/08_feature-spec\|08_feature-spec]] 기능군1~2 |
| Skill 레지스트리 | ✅작동(정의+검증기) | 콘솔별 스킬 배열 — ~~CCL 6~~(죽은 코드)→**CCR 7**·FDR 6·JPO 10·JBWC 6·RM 11 = **40개**(0226bd6 시점 28+RM11=39에서 CCL→CCR 교체로 +1) + `harnessVerification.js verifyAgentRegistryCompleteness`가 `id/agentKey/name/domain/allowedActions/...` 필드 완결성을 런타임에 실제 스캔(누락 시 self-test 실패) | 콘솔 `agent-harness` 뷰 열람, 또는 브라우저 콘솔에서 `window.__lastHarnessSelfTest` 확인 | [[08_본선/03_제품/docs/08_feature-spec\|08_feature-spec]] 기능군2 |
| **Model Router(/llm 게이트웨이)** | 🔶부분 | `02_제품/scripts/api-proxy.mjs handleLlm()`(POST /llm, claude/codex CLI + ollama HTTP, 폴백 사다리 `ladderFor()`) + `handleUsage()`(GET /llm/usage 집계). **병존(신규, 8c274b5)**: `_vendor/JB_project2/scripts/ollama-agent-proxy.mjs`(:8030) — Ollama 전용 중계, 금지패턴 4종(승인단정·금리한도·신용등급단정·PII의심) 필터 내장, `app/agentModelSettings.js` 토글. CCR/RM 하네스 뷰의 "샘플 요청" 버튼에서만 호출되는 **opt-in** 경로이고, 주 판단·초안 루프는 여전히 mock | `npm run demo:proxy` 기동 후 `?live=1`, 또는 `curl -X POST http://127.0.0.1:8020/llm -d '{"prompt":...,"engine":"ollama"}'` — 별도로 `npm run demo:ollama`(:8030) 기동 후 CCR/RM 하네스 뷰의 "Ollama 샘플 요청" 버튼 | [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서\|배포-토폴로지-운영-기획서]] §2 |
| **Storage/Audit 백엔드(신규, 8c274b5)** | 🔶부분 | `_vendor/JB_project2/server/index.mjs`(591줄) — `JB_DB_DRIVER` env로 `JsonRepository`(파일 JSON, 기본값) / `SupabaseRepository`(env 키 필수, 미설정 시 즉시 throw, 키 미노출 확인) 전환. 프런트 `app/`은 기본 `localStorage` 그대로이며 이 백엔드는 별도 옵트인 API 계층(프런트 연동 코드는 이번 실측에서 미확인) | `npm run backend` 기동, `npm run backend:test`(320줄 Node 테스트) | [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서\|배포-토폴로지-운영-기획서]] §1 |
| Policy Engine(가드레일 5종 E4 vs 12규칙 설계) | ✅작동(5종) / 📐설계(12규칙) | `_vendor/JB_project2/app/harnessCore.js:74-110` — `harnessGuardCheckPII/CheckAssertions/CheckScope/CheckAutoClose/CheckApprovalRequired` 5개 함수, 정규식 기반 PII·scope·자동종결·승인누락 검사가 실제 실행되어 위반 시 문자열 반환. 12규칙 통합안은 코드 0줄, 문서만 | 콘솔에서 high/critical 케이스 자동종결 시도 → 차단 확인, 또는 `runHarnessSelfTest()` 실행 | [[08_본선/03_제품/01_결정-준비/casesops-분기/07-policy-engine\|07-policy-engine]] |
| Audit Ledger(해시체인=base app, append-log=CCL 등, 용도 태그) | 🔶부분 | `02_제품/app/app.js:4743 auditChainRecords`(FNV-1a `simpleHash`로 previousHash 연쇄) + `:4762 auditPurpose`(당국증적/운영점검/원가정산/분쟁재생 태그) — **base app에만 존재**. CCL/FDR/JPO/JBWC 4개 역할 콘솔은 해시체인 없는 평문 리스트(`_vendor/JB_project2/app/cclConsole.app.js:193-199` 등) | 케이스 상세 → 감사 탭 → "무결성 검증" 버튼(`verifyAuditChain`) | [[08_본선/03_제품/01_결정-준비/casesops-분기/10-Ledger-Curator-에이전트-설계도\|10-Ledger-Curator]] |
| Memory 3계층 | 📐설계 | 예선 앱(`02_제품/`)에는 코드 없음. JB_project2 PR `LSB-afk/JB_project2#2`(`memoryCards.js` 신설)가 **OPEN 상태**(2026-07-04 제출, 미머지) — `gh pr list --repo LSB-afk/JB_project2`로 확인 | (미머지 — 시연 불가. 머지 시 CCL-0001 실행 후 카드 열람) | [[08_본선/03_제품/01_결정-준비/casesops-분기/11-메모리-3계층-자동진화-설계도\|11-메모리-3계층-자동진화-설계도]] |
| Ontology 그래프(예선앱 케이스 상세, 17노드/16엣지) | ✅작동(E4) | `02_제품/app/modules.js:602 ontologyElements` + `:627 initCaseOntology` — cytoscape 로컬 벤더링(오프라인 동작), Case→AgentRun→Evidence→산출물→Approval→Audit 관계를 케이스 실데이터로 렌더 | 케이스 상세 열기 → 그래프 자동 마운트(`setTimeout(() => initCaseOntology(c), 0)`) | [[08_본선/03_제품/docs/05_domain-model\|05_domain-model]] |
| 관측(토큰 계기판·엔진룸) | 🔶부분 | `02_제품/app/modules.js:523 liveLlmBlock`(케이스 단가·RM 월 환산) + `:509 engineRoomRows`(최근 호출 8건, `fetchLlmUsage()` 5초 폴링) — `/llm/usage` 응답 소비, 프록시 미기동 시 조용히 생략 | `npm run demo:proxy` 기동 + `?live=1` 접속 → 토큰 패널 하단에 실측 블록 표시 | [[08_본선/03_제품/01_결정-준비/casesops-분기/08-Cost-Sentinel-에이전트-설계도\|08-Cost-Sentinel]] |
| 배포 토폴로지(Docker compose) | 📐설계 | `02_제품/deploy/docker-compose.yml`(console+pii-zone, `internal: true` 망분리) + `시연-런북-백엔드분리.md` — 파일은 존재하나 **이 머신에서 미검증**, 노트북 리허설 필요 | `cd 02_제품/deploy && docker compose up -d`(런북 §물리분리 증명 시퀀스) | [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서\|배포-토폴로지-운영-기획서]] |
| 상세뷰·스펙(기능군 1~7) | 📐설계(문서 산출물) | `08_본선/03_제품/docs/08_feature-spec.md` — 31개 Feature ID, ✅17/🟡8/⛔6 근거등급(E0~E5) 표. 이 색인의 "설계 SSOT" 열 상당수가 이 문서로 귀결 | 문서 §1 Feature Index 열람 | [[08_본선/03_제품/docs/08_feature-spec\|08_feature-spec]] |

## 연결
[[08_본선/03_제품/reports/구현현황-JB_project2|구현현황-JB_project2]] · [[08_본선/03_제품/docs/08_feature-spec|08_feature-spec]] · [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서|배포-토폴로지-운영-기획서]] · [[08_본선/03_제품/01_결정-준비/casesops-분기/_INDEX|CaseOps 분기]]
