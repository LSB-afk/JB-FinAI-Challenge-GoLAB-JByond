# 수치로 보는 JByond

> 모든 수치는 이 레포에서 **재현 가능한 명령으로 실측**했다(측정일: 2026-07-05, 브랜치 `feat/memory-ontology-live`). 각 표의 각주에 산출 명령을 적었으니 심사 자리에서 그대로 재현할 수 있다.

## 코드 규모

| 항목 | 수치 | 산출 방법 |
|---|---|---|
| 프런트엔드 JS 파일 | **77개** | `ls app/*.js \| wc -l` |
| 프런트엔드 JS 총 라인 | **26,122줄** | `cat app/*.js \| wc -l` |
| 메인 오케스트레이터 `app.js` | 6,127줄 | `wc -l app/app.js` |
| 디자인 시스템 `styles.css` | 10,826줄 | `wc -l app/styles.css` |
| 백엔드 `server/` | 994줄 (mjs 4파일 967 + SQL 1파일) | `find server -type f \| xargs wc -l` |
| 운영 스크립트 `scripts/` | 1,294줄 (게이트웨이·프록시 3 mjs 512 + verify_static.py 782) | `wc -l scripts/*` |
| 뷰 모듈 `*.view.*.js` | 16개 (콘솔 4 × board·cases·wizard·harness) | `ls app/*.view.*.js \| wc -l` |

## 콘솔 · 화면

| 항목 | 수치 | 산출 방법 |
|---|---|---|
| 라이브 콘솔(`index.html` 로드 기준) | **5개** — 기업여신(CCL)·전세보호(JPO)·JB우리캐피탈(JBWC)·RM 역할 하네스(RMO)·base MVP 보드 | `grep -oE 'src="[^"]+"' app/index.html` |
| 뷰 레지스트리 정의 파일 | 6개 (`_VIEWS`/`viewRenderers` 보유 config·core) | `grep -rlE '_VIEWS\s*=' app/*.js` |
| FDR(보이스피싱) 콘솔 | 코드·시드 8에이전트 존재하나 이 브랜치 `index.html`엔 미배선 | `grep -c fdrConsole app/index.html` → 0 |

## AI 에이전트

| 콘솔 | 에이전트 정의 수 | 산출 방법 |
|---|---|---|
| 기업여신 CCL | 15 | `grep -c 'ccrAgent({' app/corporateCreditAgents.registry.js` |
| RM 역할 하네스 RMO | 29 | `grep -c 'rmoAgent({' app/rmOfficerAgents.registry.js` |
| JB우리캐피탈 JBWC | 13 | `grep -c 'jbwcAgent({' app/jbWooriCapitalAgents.registry.js` |
| 전세보호 JPO | 11 | `grep -c 'jpoAgent({' app/jeonseProtectionAgents.registry.js` |
| **4개 라이브 콘솔 합계** | **68** | 위 4개 factory 호출 합 |
| FDR 시드 에이전트(참고) | 8 | `grep -oE '"fdr-[a-z-]+"' app/fdrConsole.data.js \| sort -u \| wc -l` |

## 가드레일(실코드, 목업 아님)

| 항목 | 수치 | 산출 방법 |
|---|---|---|
| `harnessGuard*` 가드 함수 | **5개** — PII·주장검증·범위·자동종료·승인필요 | `grep -oE 'function harnessGuard[A-Za-z]+' app/harnessCore.js` |
| PII 탐지 패턴(`HARNESS_PII_PATTERNS`) | **6종** — 주민번호·외국인등록번호·전화번호·계좌형 숫자열·이메일·여권번호 | `awk '/HARNESS_PII_PATTERNS = \[/,/^\];/' app/harnessCore.js \| grep -c 'kind:'` |

## 검증

| 항목 | 수치 | 산출 방법 |
|---|---|---|
| E2E 스펙 파일 | 11개 | `ls tests/e2e/*.js` |
| E2E `test()` 총합 | **76개** | `grep -rc 'test(' tests/e2e/*.js \| awk -F: '{s+=$2} END{print s}'` |
| 백엔드 테스트(`server.test.mjs`) | 7개 | `grep -c 'test(' tests/backend/server.test.mjs` |
| 정적 검증(`verify_static.py`) 검사 파일 | **100개** · `static verification passed` | `python3 scripts/verify_static.py` |

## 메모리 · 감사

| 항목 | 수치 | 산출 방법 |
|---|---|---|
| RM 메모리 카드 계층 | **3계층** — 고객·에이전트·직원(승인결정에서만 증류) | `grep -n '3계층' app/rmoMemoryCards.js` |
| 감사 해시체인 알고리즘 | **FNV-1a 32bit**(offset 2166136261 · prime 16777619) | `grep -n 'FNV\|2166136261' app/rmoAuditChain.js` |
| 변조탐지 E2E | 존재 — `rmo-audit-chain-tamper.spec.js` | `ls tests/e2e/rmo-audit-chain-tamper.spec.js` |
| LLM 폴백 사다리 | **4단** — 로컬(Ollama) → 게이트웨이(Claude/Codex) → 목업 → 사람 큐 | `grep -n '폴백 사다리\|queue: "human"' scripts/llm-gateway.mjs` |

## Git 활동

| 항목 | 수치 | 산출 방법 |
|---|---|---|
| 브랜치 커밋 수 | **42** | `git rev-list --count HEAD` |
| 본선 48시간(7/4~) 커밋 수 | **37** | `git log --oneline --since="2026-07-04" \| wc -l` |
