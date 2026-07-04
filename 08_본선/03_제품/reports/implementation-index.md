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
| Agent 콘솔 5종(CCL/FDR/JPO/JBWC/RM) | ✅작동(4콘솔 라우팅) + RM은 단일페이지 | `_vendor/JB_project2/app/`(읽기전용, 승보 프로토타입) — CCL 14뷰·FDR 15뷰·JPO 29뷰·JBWC 24뷰(`*_VIEWS` 상수), `app.js:5705 applyHashRoute()`가 4개 콘솔의 `xxxRouteFromHash()`를 jbwc→jpo→ccl→fdr 순 디스패치. RM은 `app.js:1769 rmDashboardPage`로 하위 라우트·harness 화면 없는 단일 뷰 — 나머지 4콘솔과 구조가 다름 | index.html에서 org-rail 계열사/역할 전환 클릭 → 해당 콘솔 board 뷰 렌더 | [[08_본선/03_제품/docs/08_feature-spec\|08_feature-spec]] 기능군1~2 |
| Skill 레지스트리 | ✅작동(정의+검증기) | 콘솔별 스킬 배열 — CCL 6·FDR 6·JPO 10·JBWC 6 = 28개(`cclConsole.core.js:161` 등) + `harnessVerification.js verifyAgentRegistryCompleteness`가 `id/agentKey/name/domain/allowedActions/...` 필드 완결성을 런타임에 실제 스캔(누락 시 self-test 실패) | 콘솔 `agent-harness` 뷰 열람, 또는 브라우저 콘솔에서 `window.__lastHarnessSelfTest` 확인 | [[08_본선/03_제품/docs/08_feature-spec\|08_feature-spec]] 기능군2 |
| **Model Router(/llm 게이트웨이)** | 🔶부분 | `02_제품/scripts/api-proxy.mjs handleLlm()`(POST /llm, claude/codex CLI + ollama HTTP, 폴백 사다리 `ladderFor()`) + `handleUsage()`(GET /llm/usage 집계) | `npm run demo:proxy` 기동 후 `?live=1`, 또는 `curl -X POST http://127.0.0.1:8020/llm -d '{"prompt":...,"engine":"ollama"}'` | [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서\|배포-토폴로지-운영-기획서]] §2 |
| Policy Engine(가드레일 5종 E4 vs 12규칙 설계) | ✅작동(5종) / 📐설계(12규칙) | `_vendor/JB_project2/app/harnessCore.js:74-110` — `harnessGuardCheckPII/CheckAssertions/CheckScope/CheckAutoClose/CheckApprovalRequired` 5개 함수, 정규식 기반 PII·scope·자동종결·승인누락 검사가 실제 실행되어 위반 시 문자열 반환. 12규칙 통합안은 코드 0줄, 문서만 | 콘솔에서 high/critical 케이스 자동종결 시도 → 차단 확인, 또는 `runHarnessSelfTest()` 실행 | [[08_본선/03_제품/01_결정-준비/casesops-분기/07-policy-engine\|07-policy-engine]] |
| Audit Ledger(해시체인=base app, append-log=CCL 등, 용도 태그) | 🔶부분 | `02_제품/app/app.js:4743 auditChainRecords`(FNV-1a `simpleHash`로 previousHash 연쇄) + `:4762 auditPurpose`(당국증적/운영점검/원가정산/분쟁재생 태그) — **base app에만 존재**. CCL/FDR/JPO/JBWC 4개 역할 콘솔은 해시체인 없는 평문 리스트(`_vendor/JB_project2/app/cclConsole.app.js:193-199` 등) | 케이스 상세 → 감사 탭 → "무결성 검증" 버튼(`verifyAuditChain`) | [[08_본선/03_제품/01_결정-준비/casesops-분기/10-Ledger-Curator-에이전트-설계도\|10-Ledger-Curator]] |
| Memory 3계층 | 📐설계 | 예선 앱(`02_제품/`)에는 코드 없음. JB_project2 PR `LSB-afk/JB_project2#2`(`memoryCards.js` 신설)가 **OPEN 상태**(2026-07-04 제출, 미머지) — `gh pr list --repo LSB-afk/JB_project2`로 확인 | (미머지 — 시연 불가. 머지 시 CCL-0001 실행 후 카드 열람) | [[08_본선/03_제품/01_결정-준비/casesops-분기/11-메모리-3계층-자동진화-설계도\|11-메모리-3계층-자동진화-설계도]] |
| Ontology 그래프(예선앱 케이스 상세, 17노드/16엣지) | ✅작동(E4) | `02_제품/app/modules.js:602 ontologyElements` + `:627 initCaseOntology` — cytoscape 로컬 벤더링(오프라인 동작), Case→AgentRun→Evidence→산출물→Approval→Audit 관계를 케이스 실데이터로 렌더 | 케이스 상세 열기 → 그래프 자동 마운트(`setTimeout(() => initCaseOntology(c), 0)`) | [[08_본선/03_제품/docs/05_domain-model\|05_domain-model]] |
| 관측(토큰 계기판·엔진룸) | 🔶부분 | `02_제품/app/modules.js:523 liveLlmBlock`(케이스 단가·RM 월 환산) + `:509 engineRoomRows`(최근 호출 8건, `fetchLlmUsage()` 5초 폴링) — `/llm/usage` 응답 소비, 프록시 미기동 시 조용히 생략 | `npm run demo:proxy` 기동 + `?live=1` 접속 → 토큰 패널 하단에 실측 블록 표시 | [[08_본선/03_제품/01_결정-준비/casesops-분기/08-Cost-Sentinel-에이전트-설계도\|08-Cost-Sentinel]] |
| 배포 토폴로지(Docker compose) | 📐설계 | `02_제품/deploy/docker-compose.yml`(console+pii-zone, `internal: true` 망분리) + `시연-런북-백엔드분리.md` — 파일은 존재하나 **이 머신에서 미검증**, 노트북 리허설 필요 | `cd 02_제품/deploy && docker compose up -d`(런북 §물리분리 증명 시퀀스) | [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서\|배포-토폴로지-운영-기획서]] |
| 상세뷰·스펙(기능군 1~7) | 📐설계(문서 산출물) | `08_본선/03_제품/docs/08_feature-spec.md` — 31개 Feature ID, ✅17/🟡8/⛔6 근거등급(E0~E5) 표. 이 색인의 "설계 SSOT" 열 상당수가 이 문서로 귀결 | 문서 §1 Feature Index 열람 | [[08_본선/03_제품/docs/08_feature-spec\|08_feature-spec]] |

## 연결
[[08_본선/03_제품/reports/구현현황-JB_project2|구현현황-JB_project2]] · [[08_본선/03_제품/docs/08_feature-spec|08_feature-spec]] · [[08_본선/03_제품/01_결정-준비/배포-토폴로지-운영-기획서|배포-토폴로지-운영-기획서]] · [[08_본선/03_제품/01_결정-준비/casesops-분기/_INDEX|CaseOps 분기]]
