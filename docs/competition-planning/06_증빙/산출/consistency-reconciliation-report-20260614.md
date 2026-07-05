# 일관성 정합 리포트 (P5) — 2026-06-14

> 심사 4.1(문서 간 일관성) 방어. 기준: [`docs/_canon.md`](../../_canon.md). 감사 → 수정 → 재검증 완료.

## 감사 방법
독립 감사 에이전트가 canon ↔ MVP 제안서 ↔ 기능명세서 ↔ 데크(build_proposal.py) ↔ app.js ↔ docs/README를 교차 점검. 표시명·KPI·히어로·통계·법령·섹션 라벨 6축.

## 정합 양호 (수정 불필요)
- app.js `agentNameLabels`(14+2+게이트)가 canon §2와 완전 일치.
- 히어로 JBG-104·riskScore 88·운전자금 1.8억이 app·제안서·canon에서 일치.
- 제안서 검증 통계·법령 인용 형태(신용정보법 §40-2 우선, PIPA 보충)·KPI·공식 섹션 라벨 모두 canon 준수.
- 네이버클라우드는 "MOU·공표 추진 방향"으로 표기(운영 중 주장 없음).

## 수정 완료 (드리프트 → canon 정합)
| # | 위치 | 수정 전 | 수정 후 |
| --- | --- | --- | --- |
| 1 | 데크 stat | 보이스피싱 8,545억(2024) | 1.13조(2025 1~11월, +56%) |
| 2 | 데크 stat | 취약 자영업자 43.7만·130조·'25.2Q | 42.7만(2024말·13.7%)·연체율 11.16% |
| 3 | 데크 차트 | 2021–2024 막대 | 2024 vs 2025(1~11월) YoY 비교(7,263/11,330) |
| 4 | 데크 stat#2 | 전세사기 보조설명 | HUG 사고액 2024년 4.49조 추가 |
| 5 | 데크 KPI4 / app goals | "고위험 사기 외부발송 0건" | "사후관리 누락 0건"(사기 차단은 보조설명) |
| 6 | app.js 내러티브·데크 | "사기 차단 에이전트" | "이상거래 탐지·차단 에이전트"(표시명) |
| 7 | 데크 slide7 | "대표 유스케이스 — 전세 보호" | "유스케이스 상세 — 전세 보호 라인" + SME를 "대표 케이스"로 |
| 8 | docs/README | 읽기순서가 옛 초안 지목 | 최종본(mvp-proposal.md·function-spec.md)으로 교체 |
| 9 | 옛 초안 2종 | 경쟁/모순 | ⚠️ DEPRECATED 배너 + academy/reference repo 노출 문구 제거 |

## 재검증
- `node --check app/app.js`·`modules.js` OK
- `python3 -c ast.parse build_proposal.py` OK
- `python3 scripts/verify_static.py` 통과(34 files)
- 잔여 드리프트 grep("사기 차단 에이전트", "8,545", "43.7만", "Fraud block") → 0건
- (데크 PPTX 재생성·e2e는 P6에서 수행)
