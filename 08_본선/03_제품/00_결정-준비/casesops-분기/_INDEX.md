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
> **출처**: [[_원문-ChatGPT-CaseOps대화]](1차) + [[_원문-ChatGPT-CaseOps대화-2차-정합성]](2차: 기능 정합성·MVP경계·3층 CaseOps/AgentOps/TrustOps·8 운영규칙·팀 공유본) + 무제폴더 + [[무제폴더-핵심이해]]. **근거층**: 리서치 요약 `08_본선/05_제출/리서치-딥프롬프트/_결과/_요약-D*.md`(D2·D5·D6·D7·D9·D11·D14·D15·D17·D18·D21·D25 등) 적극 인용.
> **작성**: Codex 위임(사용자 지시). **경계**: 이 분기 문서는 vanilla JS 무빌드 결론([[paperclip-통합-블루프린트]])과 정합 — monorepo 제안은 **개념·이름만 차용**하고 실제 스택 이식 금지.

## 결정 1~5 세부 문서
| # | 문서 | 다룸 | 근거 요약 |
|---|---|---|---|
| 1 | [[01-메모리-거버넌스]] | 8계층 메모리·Customer↔Staff 분리·Memory Router·로그8종 | D11·D14·D25·D17 |
| 2 | [[02-CaseOps-Engine-7알고리즘]] | CaseOps 브랜딩·Intake·Priority Scoring(설명가능식)·Auto Skill Routing·Evidence Graph·Guarded Model Routing | D2·D9·D18·D21 |
| 3 | [[03-119-사고대응-에이전트]] | 119(Kill Switch·Rollback·Replay·Quarantine·Hotfix)·무기/방패·Verification | D8·D15·D14 |
| 4 | [[04-은행DB연결-특화모델]] | Bank Data Connector(read-only 4단계)·연결대상8·특화모델(전세위험·FDS·여신·상담긴급도·룰엔진) | D5·D6·D7·D17·D25 |
| 5 | [[05-9파이프라인-아키텍처-저장소]] | 9파이프라인·9레이어·Paperclip 비교·GitHub 저장소(개념차용)·monorepo↔vanilla 충돌해소 | D9·D20·B1 |

## 디자인 분기(별도) — 정보체계·뷰·데이터바인딩
- [[06-정보체계-뷰-데이터바인딩-스펙]] — 정보 계층 전략·전 뷰 상세·각 데이터 연결(paperclip master 유기적 통합 참조). 디자이너 세션 입력.

## 승급 규칙
- 팀/사용자 확정 → 정본 문서로 이관: 메모리→`05_domain-model`·`data-strategy` / CaseOps·모델→`07_architecture`·`08_feature-spec` / 119→`failure-modes`·`agent-roster` / 발표→`pitch-outline`·`judge-qna`.
- 확정 전까지 이 분기는 `[분기/미확정]`.

## 연결
[[_결정준비-MOC]] · [[차별성-설정근거상향-흐름]] · [[paperclip-통합-블루프린트]] · [[무제폴더-핵심이해]]
