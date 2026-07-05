# JB LocalGuard OS Goal 4회 반복 개선 리포트

작성일: 2026-06-13
대상: JB LocalGuard OS MVP
검증 기준: Goal 문서의 서비스 사이클, UI/UX QA, Playwright, 비용·통계 대시보드 개선 요구사항

## 1. 전체 요약

- 개선 목표: 사용자가 진입, 케이스 선택, 데이터 입력, AI 판단 확인, 결과 저장, 후속 행동 생성까지 끊기지 않는 MVP 사이클을 만든다.
- 주요 수정 내용: 대시보드에 서비스 완료 사이클과 데이터 상태 패널을 추가하고, 전세 진단 저장/후속 작업 결과가 대시보드에 반영되도록 연결했다.
- 현재 작동 가능한 기능: 케이스 실행, 승인 처리, 전세 진단, 결과 저장, 후속 작업 생성, 로컬 상태 저장, 데모 초기화, 상세 패널 토글, 핵심 라우팅.
- 남은 한계: 실제 은행 API, 등기부/보증보험 실시간 조회, 실제 인증/권한, 서버 DB 저장은 아직 데모 범위 밖이다.

## 2. 4회 반복 수행 결과

| 반복 | 목표 | 수행 내용 | 검증 |
|---|---|---|---|
| 1회차 | 현재 상태 재점검 | Goal 문서와 기존 코드/테스트/산출물 확인, 부족 항목 정리 | 기존 정적 검증과 E2E 범위 확인 |
| 2회차 | 서비스 사이클 보강 | 분석 결과 저장, 후속 작업, 최근 저장 시각, 데이터 출처 표시, 데모 초기화 연결 | `npm run test` 통과 |
| 3회차 | UI·대시보드·반응형 검증 확대 | 핵심 라우팅, 전세 진단 후 대시보드 반영, 빈 명령 오류, 상세 패널 토글, 태블릿 화면 테스트 추가 | `npm run test:e2e` 13개 통과 |
| 4회차 | 최종 통합 | 산출물 리포트 작성, 캡처 경로 정리, 커밋/푸시 준비 | 최종 검증 후 커밋 |

## 3. 사용자 시나리오 검증 결과

| 시나리오 | 기존 상태 | 문제점 | 개선 내용 | 최종 상태 |
|---|---|---|---|---|
| 케이스 선택 후 AgentRun 실행 | 실행은 가능 | 실행 중 상태와 분석 결과 연결 확인 범위가 좁음 | 실행 중 로딩 문구, 완료 후 승인/산출물 확인 테스트 유지 | 통과 |
| 전세사기 위험 진단 | 진단 결과 표시 가능 | 저장/후속 작업이 대시보드 가치 지표로 이어지지 않음 | 저장 결과, 후속 작업, 완성형 사이클 수를 대시보드에 반영 | 통과 |
| 신규 케이스 등록 | 폼은 있음 | 사용자 입력 데이터와 데모 데이터 구분이 약함 | 데이터 상태 패널에서 데모/사용자/저장 결과를 분리 표시 | 통과 |
| 승인 큐 처리 | 승인 가능 | 승인 후 상태 확인 테스트만 존재 | 승인 버튼 동작을 E2E로 유지 검증 | 통과 |
| 설정 초기화 | 수동 초기화 없음 | 테스트 중 로컬 저장 상태를 되돌리기 어려움 | 설정 화면에 데모 상태 초기화 버튼 추가 | 통과 |

## 4. UI 오류 및 버그 수정 내역

## Bug ID: BUG-001

- 위치: 대시보드 데이터 상태
- 재현 방법: 전세 진단 실행 후 결과 저장, 후속 작업 생성, 대시보드 이동
- 현재 문제: 저장 결과가 사용자 가치 완료 상태로 명확히 보이지 않았다.
- 기대 동작: 분석 생성, 결과 저장, 후속 작업 생성이 한 사이클로 집계되어야 한다.
- 심각도: High
- 수정 내용: `scenarioCompletionView`, `dataStatusView`, `lastSavedAt` 추가
- 수정 전 캡처: 기존 `test-results/screenshots/dashboard.png`
- 수정 후 캡처: `test-results/screenshots/data-dashboard.png`
- 관련 파일: `app/app.js`, `app/styles.css`, `tests/e2e/localguard.spec.js`

## Bug ID: BUG-002

- 위치: 오케스트레이터 명령 입력
- 재현 방법: 명령 입력창을 빈 값으로 두고 실행 버튼 클릭
- 현재 문제: 빈 명령이 내부 문자열로 실행될 수 있었다.
- 기대 동작: 실행하지 않고 사용자가 이해할 수 있는 오류 안내를 보여준다.
- 심각도: Medium
- 수정 내용: 빈 명령 차단 및 “운영 지시를 입력해주세요.” 토스트 추가
- 수정 전 캡처: 없음
- 수정 후 캡처: Playwright 테스트로 상태 검증
- 관련 파일: `app/app.js`, `tests/e2e/localguard.spec.js`

## Bug ID: BUG-003

- 위치: 케이스 상세 패널의 AgentRun 상태
- 재현 방법: 케이스에서 에이전트 실행 직후 분석 결과 패널 확인
- 현재 문제: 실행 중 상태에서 결과 영역이 비어 보일 수 있었다.
- 기대 동작: 실행 중임을 로딩 상태와 설명 문구로 표시한다.
- 심각도: Medium
- 수정 내용: `loading-result`, `loading-spinner`, `processingStep` 추가
- 수정 전 캡처: 기존 흐름 캡처
- 수정 후 캡처: `test-results/screenshots/scenario-flow-2.png`
- 관련 파일: `app/app.js`, `app/styles.css`

## Bug ID: BUG-004

- 위치: 설정/데모 상태
- 재현 방법: 전세 진단과 신규 케이스를 여러 번 실행한 뒤 초기 상태로 되돌리기
- 현재 문제: 사용자가 로컬 데모 상태를 UI에서 초기화할 수 없었다.
- 기대 동작: 설정에서 데모 상태를 초기화하고 기본 데모로 재시작한다.
- 심각도: Low
- 수정 내용: `resetDemoState`와 설정 버튼 추가
- 수정 전 캡처: 없음
- 수정 후 캡처: Playwright 테스트로 버튼/토스트/리로드 검증
- 관련 파일: `app/app.js`, `tests/e2e/localguard.spec.js`

## 5. Playwright 테스트 결과

| 테스트명 | 목적 | 결과 | 스크린샷 |
|---|---|---|---|
| home and dashboard render without console errors | 홈/대시보드 렌더링과 핵심 패널 확인 | 통과 | `home.png`, `dashboard.png` |
| core routes render reachable grouped screens | 주요 라우팅 화면 접근성 확인 | 통과 | 자동 검증 |
| scenario flow runs a selected case and reaches approval state | 케이스 선택, 에이전트 실행, 승인 대기 전환 확인 | 통과 | `scenario-flow-1.png`, `scenario-flow-2.png` |
| approval queue can approve a pending action | 승인 큐 버튼 동작 확인 | 통과 | 자동 검증 |
| jeonse protection workflow is visible | 전세 Shield 핵심 기능 노출 확인 | 통과 | 자동 검증 |
| new case form validates input and registers user data | 입력 검증과 사용자 데이터 등록 확인 | 통과 | 자동 검증 |
| jeonse diagnosis produces result, save, and follow-up actions | 전세 진단, 결과 저장, 후속 작업 생성 확인 | 통과 | 자동 검증 |
| saved jeonse diagnosis updates dashboard service cycle | 저장 결과가 대시보드 완료 사이클에 반영되는지 확인 | 통과 | `data-dashboard.png` |
| empty command shows an actionable error and properties panel toggles | 빈 명령 오류와 오른쪽 패널 토글 확인 | 통과 | 자동 검증 |
| case search empty state works | 빈 검색 결과 처리 확인 | 통과 | `error-state.png` |
| mobile viewport keeps core navigation usable | 모바일 기본 화면 확인 | 통과 | `mobile-view.png` |
| tablet viewport keeps dashboard interpretation panels readable | 태블릿 대시보드 정보 계층 확인 | 통과 | `tablet-view.png` |
| settings can reset local demo state | 데모 초기화 버튼 동작 확인 | 통과 | 자동 검증 |

## 6. 비용·통계·데이터 대시보드 개선

- 추가된 KPI: 분석 생성 건수, 결과 저장 건수, 후속 작업 건수, 완성형 사이클 건수
- 추가된 데이터 상태: 데모 데이터, 사용자 입력 데이터, 저장된 분석 결과
- 비용 계산 방식: 기존 `buildDashboardData`의 총 예산, 사용 예산, 케이스당 평균 비용, 위험 완화 예상 효과를 유지한다.
- 데이터 해석 문구: “현재 완성형 사이클은 N건입니다”, “실제 API 연동 전까지는 데이터 출처를 화면에서 계속 구분합니다.”
- 빈 데이터 처리: 저장된 시나리오 결과가 없으면 전세 진단 또는 케이스 실행 후 결과 저장을 안내한다.

## 7. Fabel 5 자문 반영 내역

| 자문 항목 | Fabel 5 관점 | 반영 여부 | 반영 내용 |
|---|---|---|---|
| 우선 시나리오 | 전세사기 진단은 JB 금융 고객가치와 심사 리스크를 동시에 보여준다 | 반영 | 전세 진단 저장 후 대시보드 완료 사이클 반영 |
| UI 이탈 위험 | 사용자가 결과가 저장됐는지 모르면 데모 가치가 약해진다 | 반영 | 저장 결과, 후속 작업, 최근 저장 시각 표시 |
| 핵심 지표 | 사용자는 “그래서 무엇을 얻었는가”를 먼저 봐야 한다 | 반영 | 완료된 사용자 가치 패널 추가 |
| 버그 우선순위 | 흐름을 끊는 입력/상태 문제를 먼저 고친다 | 반영 | 빈 명령 차단, 실행 중 로딩 상태 추가 |
| 다음 버전 과제 | 실제 API와 권한 체계가 붙어야 서비스형 MVP가 된다 | 미반영 | 본선 고도화 항목으로 유지 |

## 8. 수정된 파일 목록

| 파일 | 수정 내용 |
|---|---|
| `app/app.js` | 서비스 사이클 대시보드, 데이터 상태, 저장 시각, 실행 중 로딩, 빈 명령 차단, 데모 초기화 |
| `app/styles.css` | 서비스 사이클/데이터 상태/로딩 스피너/반응형 스타일 |
| `tests/e2e/localguard.spec.js` | 핵심 라우팅, 대시보드 반영, 패널 토글, 태블릿, 초기화 E2E 테스트 추가 |
| `scripts/verify_static.py` | 새 기능 함수와 문구 정적 검증 추가 |
| `산출/goal-loop-4-report-20260613.md` | 4회 반복 개선 리포트 |

## 9. 실행 방법

```bash
npm install
npm run dev
npm run test
npm run test:e2e
```

## 10. 최종 검증 결과

```text
npm run test
static verification passed
checked files: 29

npm run test:e2e
13 passed
```

브라우저 플러그인 스모크는 플러그인 런타임의 내부 자산 쓰기 오류로 실행하지 못했다. 대신 Playwright 브라우저 기반 테스트와 스크린샷 저장으로 UI 동작 검증을 완료했다.
