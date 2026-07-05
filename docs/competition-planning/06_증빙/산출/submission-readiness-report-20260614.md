# 제출 준비 완료 리포트 — JB LocalGuard OS (2026-06-14)

> 마감 2026-06-15 10:00 KST. 사실 단일 출처: [`docs/_canon.md`](../../_canon.md). 페이즈별 체크포인트 태그 c0–c6.

## /goal 완료 조건 충족
| 조건 | 상태 |
| --- | --- |
| 제안서·기능명세서가 25 세부항목(1.1–5.5) 전부 커버 | ✅ [제안서 부록 A](../../00_제출/mvp-proposal.md) · [25항목 매핑](../../00_제출/02-제출-패키지-체크리스트.md) |
| 공식 구조 준수 (제안서 7섹션 / 기능명세서 6파트) | ✅ |
| 일관성 패스 클린 (proposal↔spec↔app↔deck↔canon) | ✅ [정합 리포트](consistency-reconciliation-report-20260614.md) |
| 검증된 법령 인용만 사용 | ✅ [법령 검증](../legal-citation-verification.md) |
| 정적 검증 / e2e 그린 | ✅ verify_static(34 files) · **e2e 19/19** |

## 산출물 위치
- **MVP 제안서(최종)**: `docs/04_submission/mvp-proposal.md` + 데크 `proposal/[LocalGuard]...MVP제안서.pptx`(수치 정정 반영)
- **기능명세서(최종)**: `docs/04_submission/function-spec.md`
- **제출 패키지/체크리스트/통계/발표**: `05_제출/01~03`
- **지식 라이브러리**: `02_전략`·`03_제품`·`04_증빙`·`06_LLM위키`(각 본문 문서) · `07_아키텍처`(거버넌스 다이어그램)
- **근거**: `docs/01_research/*`(JB·pain·데이터/API) · `docs/05_evidence/*`(법령 검증)
- **MOC**: `_MOC/README.md`(전체 링크 와이어링)

## 이번 작업 요약 (P0–P6)
- P0 canon 단일 출처 + **법령 인용 검증**(신용정보법 §40-2 우선, PIPA §28-4/§28-5, 망분리 로드맵).
- P1 출처 검증 리서치 3종(JB 사업·pain-point·데이터/API/라이선스).
- P2 공식 7섹션 제안서 + 6파트 기능명세서(25항목 1:1 매핑).
- P3 지식 라이브러리(14 본문 문서) + 프로젝트 통계 + MOC + 거버넌스 다이어그램.
- P4 히어로 케이스(전주 카페 JBG-104) end-to-end 워크스루.
- P5 일관성 정합(데크 통계·KPI·표시명·히어로 정정, 옛 초안 deprecated, 앱 반영).
- P6 데크 PPTX 아티팩트 패치 + e2e 19/19 + 최종 검증.

## PDF 변환 환경 (검증된 사실)
이 환경에는 **PPTX→PDF 도구(soffice/libreoffice) 없음**, pandoc은 있으나 **PDF 엔진(LaTeX/weasyprint/typst) 없음** → **이 환경에서 PDF 직접 생성 불가**(가정 아님, 확인됨).
대신 사용자가 한 단계로 PDF화할 수 있는 아티팩트를 `05_제출/제출본/`에 생성:
- `JB_LocalGuard_OS_MVP제안서.docx` (Word→PDF) · 데크 `proposal/*.pptx` (PowerPoint/Keynote→PDF)
- `JB_LocalGuard_OS_기능명세서.docx` + `.html` (Word/브라우저 인쇄→PDF)
**제출 전 필수**: ① 데크 PPTX를 PowerPoint/Keynote로 열어 슬라이드 3·7·8 정정 텍스트 줄바꿈/넘침 육안 확인 후 PDF 내보내기 ② 기능명세서 PDF 페이지 수(3p 권장) 확인.

## 남은 선택 사항 (사용자 판단)
- **시연영상**(선택, +5점): `05_제출/03-발표-시연-스크립트.md` 준비됨. **공개 검색노출 플랫폼 업로드 금지**.
- **미검증 통계**([미검증] 표기): 제출 직전 원문 재확인 또는 제외.
- **template.pptx 부재**: 데크 소스(build_proposal.py)·아티팩트(PPTX) 모두 정정 완료. 전체 재생성하려면 로컬 `proposal/template.pptx` 필요(gitignored).
- **remote push**: 기존 결정대로 **미실행**.
