# docs

JB LocalGuard OS의 상세 문서 저장소입니다. 상위 폴더는 심사용 목차이고, 이 폴더는 원문형 상세 문서를 보관합니다.

## 문서 구조

| 폴더 | 내용 |
| --- | --- |
| `00_sources` | 대회 PDF, DAKER 페이지 정독 노트 |
| `_canon.md` | **사실 단일 출처(SSOT)** — 모든 수치·이름·인용 기준 |
| `01_research` | 금융 pain point·JB 사업·데이터/API/라이선스 근거(출처 검증) |
| `02_product` | PRD, 기능 명세, 히어로 케이스 워크스루, HagentOS UI 적용 |
| `03_agents` | Agent 시스템, Jeonse Shield Agent, Skill Registry |
| `04_submission` | **MVP 제안서·기능명세서(최종 제출본)** + 옛 초안(deprecated) |
| `05_evidence` | 출처 인덱스, 법령 인용 검증 |

## 추천 읽기 순서

1. [Canon (사실 단일 출처)](./_canon.md)
2. [MVP 제안서 (최종, 공식 7섹션)](./04_submission/mvp-proposal.md)
3. [기능명세서 (최종, 공식 6파트)](./04_submission/function-spec.md)
4. [히어로 케이스 워크스루](./02_product/hero-case-walkthrough.md)
5. [Agent 시스템](./03_agents/agent-system.md)
6. [법령 인용 검증](./05_evidence/legal-citation-verification.md)
7. [출처 인덱스](./05_evidence/source-index.md)

> 옛 초안 [`mvp-proposal-draft.md`](./04_submission/mvp-proposal-draft.md)·[`evaluation-fit.md`](./04_submission/evaluation-fit.md)은 **deprecated** — 최종본은 위 2·3번.

## 문서 작성 원칙

- 제품 주장은 가능한 한 출처 또는 앱 화면과 연결합니다.
- Agent가 수행하는 일은 `판단`, `행동 초안`, `검증`, `감사 기록`으로 나누어 씁니다.
- 전세/금융/준법 관련 문구는 확정 결론이 아니라 검토 가능한 신호로 표현합니다.
- 앱 구현과 문서의 Agent 이름, Skill 이름, 화면 이름을 일치시킵니다.

## 상위 폴더와의 관계

- `02_전략`은 이 폴더의 제출/근거 문서를 요약합니다.
- `03_제품`은 이 폴더의 PRD와 기능 명세를 제품 목차로 연결합니다.
- `04_증빙`은 이 폴더의 출처 문서를 증빙 목차로 연결합니다.
- `05_제출`은 이 폴더의 제출 문서를 심사용 패키지로 묶습니다.
