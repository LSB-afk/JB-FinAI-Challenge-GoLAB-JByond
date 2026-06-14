# _MOC — Map of Contents

GitHub 워크스페이스 전체 탐색 시작점. 심사자·개발자·발표자가 어느 문서를 먼저 볼지 안내한다.
**사실 단일 출처(모든 수치·이름·인용의 기준)**: [`docs/_canon.md`](../docs/_canon.md)

## 0. 가장 먼저 (제출 핵심)
| 산출물 | 링크 |
| --- | --- |
| 🟦 **MVP 제안서** (공식 7섹션) | [`docs/04_submission/mvp-proposal.md`](../docs/04_submission/mvp-proposal.md) |
| 🟦 **기능명세서** (공식 6파트) | [`docs/04_submission/function-spec.md`](../docs/04_submission/function-spec.md) |
| 🟦 **Canon (사실 단일 출처)** | [`docs/_canon.md`](../docs/_canon.md) |
| 🟦 **제출 체크리스트 + 25항목 매핑** | [`05_제출/02-제출-패키지-체크리스트.md`](../05_제출/02-제출-패키지-체크리스트.md) |
| 🟦 **실행 앱(MVP)** | [`app/index.html`](../app/index.html) · 데모 `?demo=sme/jeonse/phishing` |

## 1. 워크스페이스 지도
| 폴더 | 내용 | 본문 문서 |
| --- | --- | --- |
| [02_전략](../02_전략/README.md) | 자유주제 전략·JB 적합성·차별성 | 문제정의 심층·JB연계·경쟁차별성·포지셔닝 |
| [03_제품](../03_제품/README.md) | 제품 정의·화면·MVP 기능 | 화면별 명세·사용자스토리·IA·로드맵 |
| [04_증빙](../04_증빙/README.md) | 출처·정책·근거 추적 | 심사인용카드·법령정책근거·증빙추적체인 |
| [05_제출](../05_제출/README.md) | 제출 패키지·통계·발표 | 프로젝트통계·체크리스트·발표스크립트 |
| [06_LLM위키](../06_LLM위키/README.md) | Agent 운영·프롬프트·거버넌스 | 프롬프트계약·모델라우팅·안전정책 |
| [07_아키텍처](../07_아키텍처/README.md) | 시스템/데이터/API/거버넌스 다이어그램 | (Mermaid 6종) |
| [_체계](../_체계/README.md) | Case→AgentRun→Approval→Audit 규칙 · [심사기준](../_체계/심사기준.md) | — |
| [docs](../docs/README.md) | 리서치·제출·제품·에이전트 상세 | 01_research, 04_submission, 05_evidence |
| [app](../app/README.md) | 실행 정적 MVP | — |
| [proposal](../proposal/) | 발표 데크(PPTX) + Mermaid | `build_proposal.py` |
| [scripts](../scripts/) | 검증 스크립트 | `verify_static.py` |
| [산출](../산출/) | 작업 로그·산출 리포트 | — |

## 2. 근거·리서치 (출처 추적)
- [JB 사업 연계 사실](../docs/01_research/jb-group-business-facts.md) · [Pain-point 근거](../docs/01_research/pain-point-evidence.md) · [데이터/API/라이선스 인벤토리](../docs/01_research/data-api-license-inventory.md)
- [법령 인용 검증](../docs/05_evidence/legal-citation-verification.md) · [출처 인덱스](../docs/05_evidence/source-index.md)
- [데이터 거버넌스 스펙](../docs/02_product/element-specs/07-data-governance-pii.md)

## 3. 심사자 5분 경로
1. [Canon](../docs/_canon.md) (제품·차별점·25항목 한눈에)
2. [MVP 제안서](../docs/04_submission/mvp-proposal.md) (부록 A = 25항목 커버리지 맵)
3. [기능명세서](../docs/04_submission/function-spec.md)
4. [앱 실행](../app/index.html) → `?demo=sme` 전주 카페 골든 패스
5. [데이터 거버넌스 아키텍처](../07_아키텍처/README.md) (PII 비반출 차별점)

## 4. 개발자 경로
1. [app README](../app/README.md)
2. [화면별 기능명세](../03_제품/01-화면별-기능명세.md)
3. [에이전트 프롬프트 계약](../06_LLM위키/01-에이전트-프롬프트-계약.md)
4. [모델 라우팅·거버넌스](../06_LLM위키/02-모델-라우팅-거버넌스.md)
5. [운영 체계](../_체계/README.md) · [검증 스크립트](../scripts/verify_static.py)

## 5. 빠른 실행 / 검증
```bash
cd app && python3 -m http.server 8000   # http://127.0.0.1:8000  (데모: ?demo=sme)
python3 scripts/verify_static.py          # 정적 검증
npm run test:e2e                          # Playwright 19종
```
