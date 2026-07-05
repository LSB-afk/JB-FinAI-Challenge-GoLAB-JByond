---
tags:
  - area/product
  - type/moc
  - status/active
date: 2026-07-04
up: "[[_결정준비-MOC]]"
aliases:
  - CaseOps 분기
  - casesops-branch
---
# CaseOps 확장 분기 (branch)

> **성격**: 잠근 문서세트(35종)를 흔들지 않는 **탐색 분기(folder-as-branch)**. 여기서 세세하게 설계·논의하고, 팀 확정분만 정본 문서(domain-model·architecture·agent-design·pitch 등)로 승격한다.
> **출처**: [[_원문-ChatGPT-CaseOps대화]](1차) + [[_원문-ChatGPT-CaseOps대화-2차-정합성]](2차: 기능 정합성·MVP경계·3층 CaseOps/AgentOps/TrustOps·8 운영규칙·팀 공유본) + 무제폴더 + [[무제폴더-핵심이해]]. **근거층**: 리서치 요약 `08_본선/04_증빙/02_분석자료/리서치/_결과/_요약-D*.md`(D2·D5·D6·D7·D9·D11·D14·D15·D17·D18·D21·D25 등) 적극 인용.
> **작성**: Codex 위임(사용자 지시). **경계**: 이 분기 문서는 vanilla JS 무빌드 결론([[paperclip-통합-블루프린트]])과 정합 — monorepo 제안은 **개념·이름만 차용**하고 실제 스택 이식 금지.

## 프레임 전환: "분기/미확정" → 3구간 배치

이전 프레임은 이 분기 전체를 `[분기/미확정]` 한 덩어리로 묶었다. 실제로는 상당 부분이 코드 SSOT `_vendor/JB_project2`(e57b826)로 **이미 실동작(E4 실증)**한다. 2차 원문 §6([[_원문-ChatGPT-CaseOps대화-2차-정합성]] "MVP에서 다 구현했다고 말하면 안 됨" + 팀 공유 압축본)의 MVP/아키텍처/로드맵 경계와 정합성 감사 F결론에 따라, 각 항목을 **구현수준 3구간**으로 배치한다.

| 구간 | 표현 | 대상 | 근거등급 |
|---|---|---|---|
| **① MVP 구현대상** | "실제 시연" | Case Schema · Case State Machine · **Policy Engine** · Evaluation Harness · CaseOps Engine 중 **Intake / Priority Scoring / Skill Routing / Evidence Graph** | E4(부분 실증) — JB_project2 하네스로 실동작 |
| **② 아키텍처·모의** | "은행 적용 시 확장, 일부 모의 시연" | Bank Data Connector · Model/Skill Registry · Memory Router · 119 사고대응 | E2~3(설계+샘플) |
| **③ 로드맵** | "운영 고도화" | 실시간 은행 DB 연동 · 자체(온프레) 특화모델 완전학습 · 119 자동복구 완전구현 | E1(방향) |

> 원칙(2차 §6): "MVP는 Case Queue→Evidence→판단→Human Gate→Audit를 실제 시연, Bank Connector·Model Registry·Memory·119는 확장 설계+일부 모의 시연." 어느 것도 "구현 완료"로 과장하지 않는다.

## 결정 1~5 세부 문서 (구간 라벨 부여)
| # | 문서 | 다룸 | 구간 | 근거 요약 |
|---|---|---|---|---|
| 1 | [[01-메모리-거버넌스]] | 8계층 메모리·Customer↔Staff 분리·Memory Router·로그8종 | ② 아키텍처·모의 (장기메모리 완전구현은 ③ 로드맵) | D11·D14·D25·D17 |
| 2 | [[02-CaseOps-Engine-7알고리즘]] | CaseOps 브랜딩·Intake·Priority Scoring(설명가능식)·Auto Skill Routing·Evidence Graph·Guarded Model Routing | **① MVP 구현대상**(Intake/Priority/Routing/Evidence, E4 부분실증) · Guarded Model Routing은 ② | D2·D9·D18·D21 |
| 3 | [[03-119-사고대응-에이전트]] | 119(Kill Switch·Rollback·Replay·Quarantine·Hotfix)·무기/방패·Verification | ② 아키텍처·모의 (자동복구 완전구현은 ③ 로드맵) | D8·D15·D14 |
| 4 | [[04-은행DB연결-특화모델]] | Bank Data Connector(read-only 4단계)·연결대상8·특화모델(전세위험·FDS·여신·상담긴급도·룰엔진) | ② 아키텍처·모의 (실시간DB·자체모델 완전학습은 ③ 로드맵) | D5·D6·D7·D17·D25 |
| 5 | [[05-9파이프라인-아키텍처-저장소]] | 9파이프라인·9레이어·Paperclip 비교·GitHub 저장소(개념차용)·monorepo↔vanilla 충돌해소 | ② 아키텍처 (전체 골격) | D9·D20·B1 |
| 7 | [[07-policy-engine]] | Policy Engine 정의 — 금지선·승인선 강제규칙 통합(데이터접근·외부LLM전송·사람승인·상위검토·메모리저장) + rules/·harnessCore guardrail 매핑 | **① MVP 구현대상** (5 guardrail E4 강제 + 확장규칙 [설계]) | 2차 §6·감사 F결론 |
| 8 | [[08-Cost-Sentinel-에이전트-설계도]] | Q13 담당 운영 에이전트 — 원가 순찰·티어 효율·break-even 감시, SOUL/tools/memory 파일셋(paperclip式) | ① MVP 물증 E4(원장·집계·패널) + 순찰은 [설계] | Q13 |
| 9 | [[09-119-라우팅관측-확장-설계도]] | Q14 담당 — 기존 119 감지입력에 LLM 라우팅 오류 스트림 편입(폴백 사다리 E4·사고 승격 임계표) | ① 사다리·JSONL E4 + 티켓UI [설계] | Q14·D15 |
| 10 | [[10-Ledger-Curator-에이전트-설계도]] | Q15 담당 — 감사 원장 사서: 소비자 검사·PII 역설 차단·메모리 승격 심사(3계층 격리 집행) | ① 태그·체인·내보내기 E4 + 순찰 [설계] | Q15·D11 |
| 11 | [[11-메모리-3계층-자동진화-설계도]] | 3계층 메모리(고객/에이전트/직원) 실장 스펙 — MemoryCard 스키마·Distiller 증류 프롬프트·RAG(벡터+그래프1-hop) 주입·SOUL 자동진화 루프(diff 제안→사람 승인) | ② 설계 (원천 데이터는 E4: llm-runs·감사원장) | D11·01 |

## 디자인 분기(별도) — 정보체계·뷰·데이터바인딩
- [[06-정보체계-뷰-데이터바인딩-스펙]] — 정보 계층 전략·전 뷰 상세·각 데이터 연결(paperclip master 유기적 통합 참조). 디자이너 세션 입력. **구간**: ① MVP(실제 렌더되는 뷰·데이터바인딩).

## 승급 규칙
- 팀/사용자 확정 → 정본 문서로 이관: 메모리→`05_domain-model`·`data-strategy` / CaseOps·모델→`07_architecture`·`08_feature-spec` / 119→`failure-modes`·`agent-roster` / Policy Engine→`07_architecture`·`06_compliance` / 발표→`pitch-outline`·`judge-qna`.
- **구간 ①(MVP 구현대상)**: 이미 E4 실증분은 정본 승격 우선. 미구현 세부는 `[분기/미확정]` 유지.
- **구간 ②·③**: 확정 전까지 `[분기/미확정]` — "구현 완료" 표현 금지, "설계/로드맵"으로만 표기.

## 연결
[[_결정준비-MOC]] · [[차별성-설정근거상향-흐름]] · [[paperclip-통합-블루프린트]] · [[무제폴더-핵심이해]]
