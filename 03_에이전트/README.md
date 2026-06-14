# 06_LLM위키

LLM/AI Agent 운영 방식, 프롬프트 방향, 다음 작업 지시문을 누적하는 공간입니다.

## 이 폴더의 역할

이 폴더는 제품 구현보다 Agent 운영 사고방식을 정리합니다. 다음 개발자가 같은 맥락을 잃지 않도록 프롬프트, 실행 루프, 안전 정책, Agent 간 책임 분리를 기록합니다.

## 본문 문서

설계 등급 본문 문서 3종(캐논 단일 출처, PII 비반출·L0–L4 정합):

- [01 · 에이전트 프롬프트 계약](01-에이전트-프롬프트-계약.md) — 14개 에이전트별 system/task 프롬프트, 필수 출력 스키마(판단·근거·불확실성·다음 확인), 승인레벨 도출 규칙, 장착 스킬.
- [02 · 모델 라우팅 거버넌스](02-모델-라우팅-거버넌스.md) — tokenize→route→egress-scan→audit 파이프라인, 데이터 등급·라우팅 결정 표, 검증된 법령 근거(신용정보법 §40조의2 등).
- [03 · 안전정책 · 실패처리](03-안전정책-실패처리.md) — 환각/불확실성/근거 부족 시 출력 표준, 에스컬레이션·do-not-contact, 준법 검토 루프, 책임소재·설명가능성.

## 현재 Agent 운영 패턴

- Case를 만들고 담당 Agent를 배정합니다.
- Agent는 Skill Registry의 스킬을 장착합니다.
- AgentRun은 실행 결과와 중간 로그를 남깁니다.
- Approval Gate는 고객-facing 행동 전 사람 승인을 요구합니다.
- Audit Ledger는 판단과 행동 이력을 남깁니다.
- Evidence Feed는 Agent 판단 근거와 출처를 연결합니다.
- Properties Panel은 Case, Agent, Skill, Feature의 현재 맥락을 보여줍니다.

## Agent 책임 분리

| 범주 | Agent | 책임 |
| --- | --- | --- |
| 운영 지휘 | LocalGuard Orchestrator, Analytics Agent | 케이스 생성, 배정, 상태 추적, 운영 지표 |
| 위험/금융 판단 | Pain Radar, Cashflow Triage, Policy Match | 위험 신호, 상환 스트레스, 정책금융 후보 |
| 전세 보호 | Jeonse Shield Lead, Deposit Ratio, Registry Rights, Tenant Asset Risk | 전세가율, 권리관계, 자산노출, 보증 가능성 |
| 준법/차단 | Fraud Shield, Compliance Guard, Contract Checklist | 사기 차단, 개인정보/표현 검토, 특약 초안 통제 |
| 고객/은행 연결 | RM Copilot, Bank Linkage | RM 안내문, 상담 연결, 보증보험 안내 |

## 프롬프트 설계 원칙

- Agent에게 결론보다 근거, 불확실성, 다음 확인 항목을 요구합니다.
- 고객에게 직접 말하는 문장은 기본적으로 초안이며 승인 전 발송하지 않습니다.
- 전세/법률/금융 판단은 "확정"이 아니라 "검토 필요 신호"로 표현합니다.
- 모든 자동화는 `무엇을 읽었는지`, `어떤 스킬을 썼는지`, `어떤 승인이 필요한지`를 남깁니다.
- Agent가 모르는 정보는 추정하지 않고 Evidence 요청 또는 사람 검토로 넘깁니다.

## 다음 개발 프롬프트

다음 단계는 `Case -> AgentRun -> Agent -> Skill -> Evidence -> Approval -> Audit` 클릭 흐름을 실제 상태 변화로 연결하는 것입니다.

```text
JB LocalGuard OS의 정적 MVP를 실제 프로세스처럼 동작하게 고도화해줘.

요구사항:
1. Case 카드를 누르면 해당 Case의 Agent, Skill, Evidence, Approval, Audit이 모두 연결되어야 한다.
2. AgentRun 실행 버튼을 누르면 담당 Agent별 단계 로그가 시간순으로 추가되어야 한다.
3. Approval Gate는 승인/반려/상위 검토 상태를 명확하게 바꾸고 Audit Ledger에 남겨야 한다.
4. 전세 보호 케이스는 전세가율, 시세 비교, 권리관계, 임차인 자산노출, 계약 체크리스트, 은행 연계가 각각 Agent와 Skill로 연결되어야 한다.
5. 고객-facing 문구는 반드시 RM/준법 승인 전에는 외부 실행되지 않도록 UI 상태를 제한해야 한다.
6. 모든 화면은 HagentOS처럼 가독성 높은 그룹/접기/상세 패널 구조를 유지해야 한다.
7. 검증은 node --check, scripts/verify_static.py, 브라우저 클릭 테스트로 진행한다.
```

## 연결 문서

- [Agent 시스템](agent-system.md)
- [Skill Registry](skill-registry.md)
- [Jeonse Shield Agents](jeonse-shield-agents.md)
- [운영 체계](../_체계/README.md)
- [아키텍처](../04_아키텍처/README.md)

## 다음 보강 방향

- Agent별 system prompt와 task prompt를 분리합니다.
- 위험 점수 산식과 confidence 산출 근거를 프롬프트 계약으로 만듭니다.
- 실패/불확실성/근거 부족 시 Agent가 어떤 메시지를 남겨야 하는지 표준화합니다.
