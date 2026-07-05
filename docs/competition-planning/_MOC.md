# _MOC — Map of Contents

GitHub 워크스페이스 전체 탐색 시작점. 심사자·개발자·발표자가 어느 문서를 먼저 볼지 안내한다.
**사실 단일 출처(모든 수치·이름·인용의 기준)**: [`_canon.md`](_canon.md)

> 🏆 **본선 진출(13팀, GoLAB)** — 본선 작업공간 [`08_본선/HOME.md`](본선%20HOME.md) · 본선 MOC [`08_본선/_MOC/_MOC_HOME.md`](08_본선/_MOC/_MOC_HOME.md) · ⚠️ 본선 문서는 6/29 공식발표 전 대외비.

## 0. 가장 먼저 (제출 핵심)
| 산출물 | 링크 |
| --- | --- |
| 🟦 **MVP 제안서** (공식 7섹션) | [`00_제출/mvp-proposal.md`](00_제출/mvp-proposal.md) |
| 🟦 **기능명세서** (공식 6파트) | [`00_제출/function-spec.md`](00_제출/function-spec.md) |
| 🟦 **Canon (사실 단일 출처)** | [`_canon.md`](_canon.md) |
| 🟦 **제출 체크리스트 + 25항목 매핑** | [`00_제출/02-제출-패키지-체크리스트.md`](00_제출/02-제출-패키지-체크리스트.md) |
| 🟦 **실행 앱(MVP)** | [`app/index.html`](02_제품/app/index.html) · 데모 `?demo=sme/jeonse/phishing` |

## 1. 워크스페이스 지도
| 폴더                                              | 내용                          | 본문 문서                                                                                      |
| ----------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| [00_제출](00_제출/README.md)                        | 제출 패키지·통계·발표                | 제안서·기능명세서·프로젝트통계·체크리스트·발표스크립트·제출본                                                          |
| [01_전략](01_전략/README.md)                        | 자유주제 전략·JB 적합성·차별성          | 문제정의 심층·JB연계·경쟁차별성·포지셔닝                                                                    |
| [02_제품](02_제품/README.md)                        | 제품 정의·화면·MVP 기능             | 화면별 명세·사용자스토리·IA·로드맵·element-specs·히어로 워크스루                                                |
| [03_에이전트](03_에이전트/README.md)                    | Agent/LLM 운영·프롬프트·거버넌스      | 프롬프트계약·모델라우팅·안전정책·시스템설계                                                                    |
| [04_아키텍처](04_아키텍처/README.md)                    | 시스템/데이터/API/거버넌스 다이어그램      | (Mermaid 6종)                                                                               |
| [05_리서치](05_리서치/README.md)                      | Pain-point·JB 사업·데이터/API 근거 | 출처 검증 리서치                                                                                  |
| [06_증빙](06_증빙/README.md)                        | 출처·정책·법령 근거 추적              | 심사인용카드·법령정책근거·증빙추적·법령검증·출처인덱스                                                              |
| [07_원천](07_원천/README.md)                        | 대회 원천 자료                    | 대회 PDF·DAKER 정독 노트                                                                         |
| [_canon.md](_canon.md) · [_체계](_체계/README.md)   | 사실 SSOT · 운영 규칙             | Case 생애주기·승인/감사 정책 · [](_체계/#%20JB금융그룹%20Fin-AI%20Challenge%20대회%20안내%20정본%20(공식%20전문).md) |
| [app](02_제품/app/README.md)                      | 실행 정적 MVP                   | `index.html`·`app.js`·`styles.css`                                                         |
| [발표자료](00_제출/발표자료)                              | 발표 데크(PPTX) + Mermaid·스크린샷  | `build_proposal.py`                                                                        |
| [자산](02_제품/자산) · [산출](06_증빙/산출)                 | 스크린샷·다이어그램 · 작업 로그/리포트      | —                                                                                          |
| [scripts](02_제품/scripts) · [tests](02_제품/tests) | 정적 검증 · Playwright E2E      | `verify_static.py`                                                                         |

## 2. 근거·리서치 (출처 추적)
- [JB 사업 연계 사실](05_리서치/jb-group-business-facts.md) · [Pain-point 근거](05_리서치/pain-point-evidence.md) · [데이터/API/라이선스 인벤토리](05_리서치/data-api-license-inventory.md)
- [법령 인용 검증](06_증빙/legal-citation-verification.md) · [출처 인덱스](06_증빙/source-index.md)
- [데이터 거버넌스 스펙](02_제품/element-specs/07-data-governance-pii.md)

## 3. 심사자 5분 경로
1. [Canon](_canon.md) (제품·차별점·25항목 한눈에)
2. [MVP 제안서](00_제출/mvp-proposal.md) (부록 A = 25항목 커버리지 맵)
3. [기능명세서](00_제출/function-spec.md)
4. [앱 실행](02_제품/app/index.html) → `?demo=sme` 전주 카페 골든 패스
5. [데이터 거버넌스 아키텍처](04_아키텍처/README.md) (PII 비반출 차별점)

## 4. 개발자 경로
1. [app README](02_제품/app/README.md)
2. [화면별 기능명세](02_제품/01-화면별-기능명세.md)
3. [에이전트 프롬프트 계약](03_에이전트/01-에이전트-프롬프트-계약.md)
4. [모델 라우팅·거버넌스](03_에이전트/02-모델-라우팅-거버넌스.md)
5. [운영 체계](_체계/README.md) · [검증 스크립트](02_제품/scripts/verify_static.py)

## 5. 빠른 실행 / 검증
```bash
cd app && python3 -m http.server 8000   # http://127.0.0.1:8000  (데모: ?demo=sme)
python3 scripts/verify_static.py          # 정적 검증
npm run test:e2e                          # Playwright 19종
```
