---
tags:
  - area/product
  - type/stub
  - status/draft
date: 2026-06-26
up: "[[INDEX|제품 인덱스]]"
---

# 에이전트 로스터

> 역엔지니어링/브레인스토밍으로 채울 예정

---

## 에이전트 구성 원칙

- **씨앗**: 에이전트 상세 6탭 (Dashboard·Instructions·Skills·Configuration·Runs·Budget) — 각 에이전트는 이 6개 속성을 갖는다
- **씨앗**: 5종 상태 칩 (running / pending / done / blocked / idle) — 에이전트 실행 상태 표시
- **씨앗**: 오케스트레이터가 서브에이전트를 순차/병렬로 조율 — FSM 5단 상태 모델

---

## 에이전트 목록 (예선 Canon 기준 14종 + 승인자 2종 + 게이트)

> 내부 영문명·표시명은 [[_canon|예선 Canon §2]]가 확정 SSOT. 이 파일은 **본선 역할 재정의 브레인스토밍 공간**.

### 운영 지휘·분석
| 내부 영문명 | 표시명 | 본선 역할 후보 | 상태 |
|-----------|-------|-------------|------|
| LocalGuard Orchestrator | 운영 조율 에이전트 | 서브에이전트 조율, 케이스 라우팅 | 작성 예정 |
| Analytics Agent | 포트폴리오 분석 에이전트 | 전체 포트폴리오 위험도 집계 | 작성 예정 |

### 위험·금융 판단
| 내부 영문명 | 표시명 | 본선 역할 후보 | 상태 |
|-----------|-------|-------------|------|
| Pain Radar Agent | 위험신호 조기감지 에이전트 | 이상 지표 탐지·알림 | 작성 예정 |
| Cashflow Triage Agent | 상환위험 분류 에이전트 | 히어로 케이스(JBG-104) owner | 작성 예정 |
| Policy Match Agent | 정책금융 매칭 에이전트 | 정책 상품 자동 매칭·초안 생성 | 작성 예정 |

### 전세 보호 라인
| 내부 영문명 | 표시명 | 본선 역할 후보 | 상태 |
|-----------|-------|-------------|------|
| Jeonse Shield Lead | 전세위험 관리 리드 | 전세 케이스 조율 | 작성 예정 |
| Deposit Ratio Agent | 전세가율 분석 에이전트 | 전세가율 자동 계산·임계 판단 | 작성 예정 |
| Registry Rights Agent | 등기 권리 분석 에이전트 | 등기부 권리관계 체크 | 작성 예정 |
| Tenant Asset Risk Agent | 임차인 손실위험 에이전트 | 임차인 손실 가능액 산정 | 작성 예정 |

### 준법·차단·계약 통제
| 내부 영문명 | 표시명 | 본선 역할 후보 | 상태 |
|-----------|-------|-------------|------|
| Fraud Shield Agent | 이상거래 탐지·차단 에이전트 | 보이스피싱·이상거래 1차 차단 | 작성 예정 |
| Compliance Guard Agent | 준법 검토 에이전트 | 신용정보법·전금법 준수 검토 | 작성 예정 |
| Contract Checklist Agent | 계약 체크리스트 에이전트 | 전세 계약서 위험 항목 체크 | 작성 예정 |

### 고객·은행 연계
| 내부 영문명 | 표시명 | 본선 역할 후보 | 상태 |
|-----------|-------|-------------|------|
| RM Copilot Agent | RM 보좌 에이전트 | RM 담당자 지원·초안 제공 | 작성 예정 |
| Bank Linkage Agent | 은행 연계 에이전트 | 계열사 시스템 연동 초안 | 작성 예정 |

### 사람 승인자 / 게이트
| 역할 | 표시명 | 설명 |
|-----|-------|------|
| Human RM Lead | RM 최종 승인자 | L3-L4 승인 권한 보유 |
| Human Compliance Lead | 준법 최종 승인자 | 준법 판단 최종 결재 |
| Approval Gate | 승인 게이트 | 고객 행동 사전 차단 게이트 |

---

## 본선 재정의 브레인스토밍

> 아래는 확정이 아님 — 역엔지니어링/브레인스토밍으로 채울 예정

- **씨앗 (paperclip 패턴)**: 각 에이전트는 Dashboard·Instructions·Skills·Configuration·Runs·Budget 6탭으로 관리
- **씨앗 (paperclip 패턴)**: 에이전트 상태 = 5종 칩 (running/pending/done/blocked/idle)
- **씨앗 (paperclip 패턴)**: 에이전트 조직도(트리 캔버스)에서 Orchestrator→하위 에이전트 위계 시각화

### 재정의 후보 질문 (작성 예정)
- [ ] 본선에서 추가할 에이전트 역할이 있는가?
- [ ] 에이전트별 승인 레벨(L0~L4) 매트릭스 재설계 필요한가?
- [ ] Heartbeat 주기·스킬 착탈식 운영 방식 상세화

---

## 참조

- [[08_본선/03_제품/02_agent-design/orchestrator|오케스트레이터]]
- [[08_본선/03_제품/02_agent-design/skill-spec|스킬 명세]]
- [[08_본선/03_제품/05_diagrams/01_agent-flow|에이전트 흐름 다이어그램]]
