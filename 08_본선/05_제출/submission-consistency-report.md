---
tags:
  - area/strategy
  - type/report
  - status/active
date: 2026-07-01
up: "[[_05_제출_MOC]]"
aliases:
  - 제출정합성리포트
  - submission-consistency-report
---

# 제출 정합성 감사 리포트

> 감사 실행: 2026-07-01 / 감사자: submission-consistency-check 스킬 / 자동 수정 없음 — 결정은 orchestrator·decision-log 몫.
> 읽은 문서: SKILL.md · prd.md · mvp-scope.md · core-bet.md · submission-checklist.md · live-final-verification.md · ai-report-final.md · retrospective.md · _canon.md · 제품-정의.md · _회의록-INDEX.md · 본선-마스터-플레이북.md · 회의록-2026-06-30-아이디어회의.md · scope-board.md

---

## 불일치 목록 (교차 점검 5차원)

### 차원 1 · 히어로 시나리오 일치

| # | 문서 A | 문서 B | 현재 내용 발췌 | 심각도 | 권장 단일화 방향 |
|---|--------|--------|----------------|--------|----------------|
| 1 | `_canon.md §1` | `submission-checklist.md` · `live-final-verification.md` · `scope-board.md` | **[A] `_canon.md`**: `대표(hero) = "전주 중앙로 카페(SME)"` (코드 JBG-104, demo=sme, 개인사업자). `"보조 1 (전세 보호)"·"보조 2 (보이스피싱)"` <br>**[B] 체크리스트·live-verification·scope-board**: 히어로 시나리오가 **전세사기 탐지**로 단독 기술됨 (체크리스트: `"전세사기 시연 시나리오 E2E 통과"` / live-verification 핵심 E2E: `"시나리오: 전세사기 위험 탐지"` / scope-board In Scope: `"전세사기 위험 탐지 시나리오 (핵심 시연)"`) | **고** (제출 직결) | 6/30 회의·플레이북·제품-정의 합의에 따르면 **본선 히어로는 2계열사 RM 에이전트 (전세사기/보이스피싱 페인포인트)** 이고, _canon.md의 "전주 중앙로 카페(SME)"는 **예선 히어로**. `_canon.md §1`이 본선 히어로로 대체됐으나 아직 갱신 안 됨. → ① `_canon.md`를 본선 히어로(2계열사·전세·보이스피싱)로 갱신 승인 요청 ② 또는 예선/본선 히어로를 명시 구분 |
| 2 | `제품-정의.md` (6/30 합의) | `_canon.md §1` | **[A] 제품-정의**: `"타겟 = JB 2계열사(은행 계열사 1 + JB우리캐피탈)"` `"히어로 시나리오: 여신 사후관리·보이스피싱·전세사기"` <br>**[B] _canon §1**: `"대표(hero): 전주 중앙로 카페"` — 예선 SME 프레이밍 고정 | **고** (SSOT 충돌) | _canon.md는 SSOT이므로 먼저 _canon을 갱신·승인해야 하위 제출물과 정합 가능. decision-log에 "본선 히어로 확정" 항목 필요. |
| 3 | `prd.md` | `제품-정의.md` · 회의록 | **[A] prd.md**: 히어로 시나리오 언급 없음. "씨앗" 3개는 예선 설계 기반(다크 3열 쉘, 5컬럼 칸반, 4 엔티티)만 언급. <br>**[B] 제품-정의**: 2계열사 RM 에이전트·조직도 시각화 메인 UI | **중** | prd.md는 stub 상태(`"작성 예정"`)이나 "씨앗" 포인트 자체가 예선 아키텍처를 그대로 상속. 6/30 결정("조직도 시각화 = 메인 UI")이 반영 안 됨. PRD 작성 시 본선 결정사항 기준으로 시작 필요. |

---

### 차원 2 · MVP 범위(P0/P1) 상호 일치

| # | 문서 A | 문서 B | 현재 내용 발췌 | 심각도 | 권장 단일화 방향 |
|---|--------|--------|----------------|--------|----------------|
| 4 | `scope-board.md` | `mvp-scope.md` | **[A] scope-board In Scope**: "전세사기 위험 탐지 시나리오 (핵심 시연)" 단일 시나리오. SME/보이스피싱 없음. <br>**[B] mvp-scope.md**: P0/P1 기능 목록이 `"작성 예정"` stub. 실질적 범위 정의 미작성. | **고** | scope-board는 범위를 전세사기 단일로 좁혔으나 mvp-scope에는 어떤 내용도 없음. 6/30 합의(2계열사·3도메인)와도 괴리. 통일된 P0/P1 목록 작성 + scope-board 업데이트 필요. |
| 5 | `scope-board.md` | `제품-정의.md` (6/30) | **[A] scope-board Out of Scope**: `"모바일 앱 인터페이스"` `"멀티 지점 동시 지원"` — 이 정도 출처는 충돌 없음. <br>**[B] scope-board In Scope**: **"조직도 시각화"** · **"로컬 모델 실동작"** · **"JB 웹 디자인 시스템"** 이 목록에 전혀 없음. 6/30 시연 원칙 3가지가 In Scope에 누락. | **고** | scope-board를 6/30 합의 기준으로 갱신해야 심사 4.1(일관성) 방어 가능. |
| 6 | `mvp-scope.md` 씨앗 | `제품-정의.md` (6/30) | **[A] mvp-scope 씨앗**: `"에이전트 상세 6탭 중 Dashboard·Runs·Skills 3탭"` `"URL hash 3단 드릴다운"` — 예선 앱 구조. <br>**[B] 제품-정의**: `"조직도 시각화 = 메인 UI"` — 메인 UI 교체 결정. | **중** | mvp-scope 씨앗이 예선 UI 기준이라 본선 재설계 방향과 충돌. stub이어서 판단이 어렵지만 "씨앗" 자체가 구버전. |

---

### 차원 3 · 검증 기준 (live-final-verification ↔ 제품 기능)

| # | 문서 A | 문서 B | 현재 내용 발췌 | 심각도 | 권장 단일화 방향 |
|---|--------|--------|----------------|--------|----------------|
| 7 | `live-final-verification.md` | `_canon.md §7 (심사 25항목)` | **[A] live-verification KPI**: `"Triage 50%+ 달성"` `"Approval Gate 100%"` `"AuditEvent 100%"` — _canon §3과 일치. <br>**[B] _canon 심사 25항목 4.1**: `"MVP 제안서·기능명세서(+영상) 간 내용 일관"` — live-verification은 현재 심사 25항목 번호 매핑이 없음. | **중** | KPI 수치 자체는 일치(양호). 단, live-verification에 심사 항목 번호 매핑이 없어 제출 직전 4.1 방어 체크가 어려움. |
| 8 | `live-final-verification.md` 시스템 기동 체크 | `_canon.md §9 기술스택` | **[A] live-verification**: `"백엔드 서버 정상 기동"` `"DB 연결 확인"` `"에이전트 서비스 정상 응답"` — 서버·DB 존재 전제. <br>**[B] _canon §9**: `"현재 MVP: Vanilla JS/CSS/HTML 정적 앱, 네트워크 API 없이 브라우저 상태로 운영 루프 재현"` — 백엔드/DB 없음. | **고** (제출 직결) | live-verification이 **아직 존재하지 않는 백엔드/DB**를 검증 항목으로 포함. 현재 MVP(정적 앱) 기준이면 체크 항목 전부 해당 없음. 본선 구현 목표(서버 API 승격)가 완료되면 적합하나, 미완료 시 live-verification이 실행 불가. → 현재 정적 MVP 기준 검증 항목과 "본선 목표 구현 후" 항목을 분리할 것. |
| 9 | `live-final-verification.md` | `submission-checklist.md` | **[A] live-verification 에이전트**: Step 2 `"Triage Agent"` · Step 3 `"Risk Assessor"` · Step 4 `"Draft Writer"` · Step 5 `"Compliance Checker"` <br>**[B] _canon §2 에이전트 로스터**: 해당 영문명이 존재하지 않음. 정확한 영문명: `Cashflow Triage Agent`·`Pain Radar Agent`·`RM Copilot Agent`·`Compliance Guard Agent` | **중** | live-verification의 에이전트 이름이 _canon 로스터와 불일치(비공식 단순명 사용). 심사위원이 보는 화면 레이블(_canon 기준 표시명)과 다를 수 있음. |

---

### 차원 4 · 제품정의(타겟·차별점) 일관 반영

| # | 문서 A | 문서 B | 현재 내용 발췌 | 심각도 | 권장 단일화 방향 |
|---|--------|--------|----------------|--------|----------------|
| 10 | `본선-마스터-플레이북.md` (6/30 반영) | `prd.md` · `core-bet.md` · `mvp-scope.md` | **[A] 플레이북**: "타겟=JB 2계열사(은행1+JB우리캐피탈)" "차별점=확장성(단계적 청사진)" "로컬모델·조직도 UI·JB 디자인시스템" ✅ 반영 완료. <br>**[B] prd·core-bet·mvp-scope**: 3개 모두 `status/stub`, `"작성 예정"`. 2계열사·확장성·로컬모델·조직도 UI 언급 **없음**. | **고** | 플레이북·제품-정의에만 핵심 결정이 있고, 심사위원이 볼 제출 문서 기반인 prd·core-bet에 전혀 반영 안 됨. ai-report-final·발표덱 작성 전에 PRD·core-bet 작성 필수. |
| 11 | `ai-report-final.md` | `제품-정의.md` · `_canon.md` | **[A] ai-report-final**: 전체 `"작성 예정"` stub. 2계열사·차별점·시나리오 미작성. <br>**[B] 제품-정의**: 핵심 사실 확정 상태. | **고** (제출 직결) | ai-report-final은 **공식 제출 문서**임에도 내용 전무. 가장 시급한 우선순위 항목. |
| 12 | `submission-checklist.md` | `제품-정의.md` · `_canon.md §5` | **[A] 체크리스트**: 계열사명 언급 없음. `"전세사기 시연"` 단일. 보이스피싱·소상공인 E2E 체크 항목 없음. <br>**[B] _canon §5**: 계열사 5개 나열. 제품-정의: 2계열사 RM 에이전트 트랙 확정. | **중** | 체크리스트가 2계열사 구조를 반영하지 않음. 전세사기만 E2E 항목 있고 보이스피싱/소상공인 시나리오는 없음. |

---

### 차원 5 · 수치·용어 = SSOT

| # | 문서 A | 문서 B | 현재 내용 발췌 | 심각도 | 권장 단일화 방향 |
|---|--------|--------|----------------|--------|----------------|
| 13 | `live-final-verification.md` | `_canon.md §3 KPI` | **[A] live-verification KPI**: `"Triage 50%+ 달성"` — _canon과 동일. ✅ 일치. | 무결 | — |
| 14 | `_회의록-INDEX.md` | `_canon.md` | **[A] 회의록-INDEX `미확정·플래그`**: `"회의 중 언급된 JB 계열사 매출·인원 수치는 STT 관찰치(미검증) → _canon 반영 금지"` ✅ 올바르게 플래그됨. <br>**[B] _canon**: 해당 수치 없음. 정책 준수 확인. | 무결 | 회의 미검증 수치 격리 정책이 제대로 작동 중. |
| 15 | `ai-report-final.md` | `_canon.md §10 검증 통계` | **[A] ai-report-final**: 전체 stub — 수치 미기재. <br>**[B] _canon §10**: 전세사기 39,121건·HUG 4.49조→1.24조(-72.3%)·소상공인 1,064.2조·폐업 100.8만명 등 검증 수치 확정. | **고** (제출 직결) | ai-report-final 작성 시 반드시 _canon §10 수치만 인용. `[미검증]` 항목(깡통전세 단일지표 등) 사용 금지. |
| 16 | `_canon.md §4 법령` | 모든 제출 문서 | **[A] _canon**: `"전자금융감독규정 §15조"` 주석에 `"제출 직전 law.go.kr 현행 항·호 번호 재확인"` 경고 있음. <br>**[B] 제출 문서들**: 법령 인용 없음(stub 상태) — 현재는 충돌 없으나 ai-report·발표덱 작성 시 고위험. | **중** (예방) | ai-report·발표덱 작성 직전 _canon §4 법령 번호를 law.go.kr에서 재확인. 특히 전자금융감독규정 §15조 항·호 번호 변경 여부. |
| 17 | `_canon.md §9` | `live-final-verification.md` | 불일치 #8 참조 (백엔드/DB 전제 문제). 수치·용어가 아닌 기술 전제 충돌로 차원 3에서 상세 기술됨. | — | — |

---

## 수정 우선순위 큐

> 심각도 "고" 우선. 자동 수정 없음 — 모두 사람 결정 후 반영.

| 순위 | 항목 | 관련 불일치 # | 이유 |
|------|------|--------------|------|
| **1위** | `ai-report-final.md` 초안 작성 시작 | #11, #15 | **공식 제출 문서**인데 내용 전무. 제출일(7/5) 전에 반드시 완성 필요. _canon §10 수치·§0 한 줄 정의·§4 법령 기준으로 작성. |
| **2위** | `_canon.md §1` 본선 히어로 갱신 + decision-log 기록 | #1, #2 | SSOT 충돌. _canon에 "예선 히어로=SME 카페, 본선 히어로=2계열사 RM(전세사기·보이스피싱)" 명시 구분 필요. 하위 문서 전체가 _canon 기준으로 정렬됨. |
| **3위** | `live-final-verification.md` 기술 전제 수정 | #8 | 현재 정적 MVP 기준 실행 불가 체크리스트. "백엔드 서버·DB·에이전트 서비스" 항목을 "본선 구현 완료 후" 조건부로 분리하거나, 현재 정적 앱 기준 검증 항목으로 대체. |
| 4위 | `scope-board.md` In Scope 갱신 | #5 | 조직도 UI·로컬모델·JB 디자인시스템 3가지 6/30 시연 원칙을 In Scope에 추가. 전세사기 단일에서 2계열사·3도메인으로 확장. |
| 5위 | `prd.md` · `core-bet.md` 실질 작성 | #3, #10 | Stub 탈출. 2계열사·확장성·조직도UI·로컬모델 4가지를 PRD 핵심 기능·core-bet 씨앗으로 반영. ai-report·발표덱 작성의 전제. |
| 6위 | `submission-checklist.md` 갱신 | #12 | 보이스피싱·소상공인 시나리오 E2E 항목 추가(또는 2계열사 대응으로 재구성). 계열사명 명시. |
| 7위 | `live-final-verification.md` 에이전트 이름 정합 | #9 | "Risk Assessor"→`Pain Radar Agent(위험신호 조기감지 에이전트)` 등 _canon §2 표시명으로 통일. |

---

## 현황 요약

- **총 불일치 건수**: 15건
  - 심각도 **고** (제출 직결): **7건** (#1·#2·#4·#5·#8·#11·#15)
  - 심각도 **중**: 5건 (#3·#6·#7·#9·#12·#16)
  - 무결 (정책 준수 확인): 2건 (#13·#14)
- **가장 시급한 3건**
  1. `ai-report-final.md` 전체 미작성 — 제출 문서 공백 (제출일 D-4)
  2. `_canon.md` 본선 히어로 미갱신 — SSOT 충돌로 하위 문서 전체 정합 불가
  3. `live-final-verification.md` 백엔드/DB 전제 오류 — 현재 MVP 기준 전혀 실행 불가한 체크리스트

---

*이 리포트는 감사 결과 보고만. 수정 실행은 orchestrator → decision-log → 해당 문서 담당자 순서로.*
