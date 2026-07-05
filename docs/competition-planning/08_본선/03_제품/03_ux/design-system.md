---
tags:
  - area/product
  - type/draft
  - status/draft
date: 2026-07-03
up: "[[INDEX|제품 인덱스]]"
---

# 디자인 시스템

> [확정] **라이트 테마 기본**(다크 폐기, 2026-07-02 확정). 2026-06-26 스텁의 "다크 테마"·"8px 그리드"는 폐기된 초안이며 본 문서에서 교정한다. 토큰 출처: `jbfg-design-tokens.css`(JB금융그룹 공식 사이트 리버스엔지니어링) → [[JB-콘솔-프로토타입-스펙-가안|콘솔 프로토타입 SSOT]] §JB 디자인 토큰. 에이전트·화면 사실: [[_canon|canon]] §2, [[ia-screen-map|IA·화면 맵]](미확정 초안, `_archive/`).
>
> **[개정 2026-07-04]** 밀도 원칙(§1-6)·레이아웃 확정(§1-3)·Case FSM/컴포넌트/PII UI/인터랙션 신규 절(§8~§11)을 [[디자인-토큰-업그레이드-설계안]](사용자 직접 지시 + Figma "망상궤도" LocalGuard OS Foundations/Components + 실제 대시보드 비교 근거)에 따라 반영. 폰트(SUIT vs Noto Sans KR)만 미해결로 남아있음(§6-1). 토큰 실 파일은 `08_본선/03_제품/03_ux/tokens/`(`jb-console-tokens.css`/`.json`) 참고. 화면 흐름·IA·케이스 상세 등 뷰 설계는 PRD/기능명세서 확정 후 별도 라운드에서 다룬다(범위 밖).

---

## 1. 디자인 원칙

1. **라이트 기본** — OS가 다크여도 라이트 고정(다크 토글은 유지하되 기본값 아님). 금융 운영 콘솔은 "어두워서 전문적"이 아니라 신뢰감·가독성이 우선 — 실사용 판정에서 다크 3열안이 폐기된 이유.
2. **일은 에이전트, 사람은 눈만** — 키보드 퍼스트, 스페이스 2회로 검토→다음 진행. RM의 클릭·타이핑을 최소화한다. **HCI 근거**([[엔터퍼스트_케이스플로우_HCI_UX분석]]): recognition-over-recall(정보를 기억해 찾지 않고 화면이 보여줌) · Hick's Law(기본 액션 1개로 선택지↓) · Fitts's Law(반복 진행=키보드, 책임 있는 최종 승인만=마우스 클릭) · Progressive Disclosure(요약→근거→원문 순으로 늦게 공개). **리스크 방어**: 고위험 케이스는 Enter만으로 진행 불가(마우스 클릭 승인 강제) · AI 추천과 근거를 분리 표시하고 확신도/불확실성을 병기 · 근거 부족 케이스는 자동 보류/재검토 큐로 이동.
3. **3열 셸 고정** — org-rail(계열사)+nav-list/page-content(작업)+context-panel(근거). 모든 화면이 이 틀 안에서 움직인다([[ia-screen-map|IA·화면 맵]] §4, 미확정 초안 `_archive/`). **[확정 2026-07-04]** Figma 사이드바 280px+2열 대안과 승보 JB_project2 실제 구동 화면을 비교한 결과([[디자인-토큰-업그레이드-설계안]] §1-1), 3열 셸을 그대로 유지하고 **page-content 영역의 기본 뷰는 Kanban/테이블**(케이스를 한눈에 훑는 용도, §1-6 밀도 원칙과 일치)로 채택한다.
4. **JB 신뢰 아이덴티티 차용, paperclip과 육안 구분** — 네이비 히어로 헤더·글래스 KPI·큰 타이포로 JB 브랜드감을 내되, 카드·여백은 §1-6 밀도 원칙에 따라 타이트하게 유지한다(표절 가드는 색·타이포·비율의 브랜드감 차이로 확보하며, "여백을 넓혀 고급스럽게"는 더 이상 차별화 수단으로 쓰지 않는다). 표절 가드(콘솔 스펙 §차별화).
5. **근거 없는 자동화 없음** — 리스크 배지·승인 카드는 항상 근거(Evidence) 드릴인을 1클릭 이내로 노출한다.
6. **밀도·위계·가독성 우선(확정 2026-07-04, 사용자 직접 지시)** — 이 콘솔은 IR 대시보드가 아니라 **직원용 업무 프로그램**이다. 예쁠 필요는 없다: 정보 위계·분류·스캔 가독성이 최우선이며 카드 간격·여백은 좁게 잡는다(§4 spacing 스케일 개정 참고). 단 색·타이포의 "때깔"은 JB 브랜드(네이비·블루)와 어울려야 한다 — 밀도는 올리되 브랜드 아이덴티티는 유지한다. 근거: [[디자인-토큰-업그레이드-설계안]] §2-0.

---

## 2. 컬러 팔레트

출처: `jbfg-design-tokens.css`(콘솔 스펙 §JB 디자인 토큰과 동일 값).

### 브랜드
| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-brand-primary` | `#0A31A8` | 주 브랜드색, 주요 CTA·강조 텍스트 |
| `--color-brand-accent` | `#1C56FF` | 링크·정보성 강조, 리스크 L1/L2 배지 |
| `--color-brand-deep` | `#0D2D77` | 히어로 헤더 그라디언트 딥톤 |
| `--color-brand-navy` | `#0B235B` | 히어로 헤더 배경(대시보드 네이비 배너) |
| `--color-esg-green` | `#9ECFA9` | ESG/지속가능 계열 보조 강조(장식) |
| `--color-focus-green` | `#51E3A4` | 포커스 링 전용 |
| `--color-tech-cyan` | `#19E4EE` | 장식용 포인트(과다 사용 금지) |

### 배경 / 텍스트 / 보더
| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-bg-default` | `#FFFFFF` | 기본 배경 |
| `--color-bg-subtle` | `#F8F8F8` | 카드 하위 섹션 배경 |
| `--color-bg-muted` | `#F3F3F3` | 비활성/뮤트 영역(예: L0 배지 배경) |
| `--color-bg-news` | `#FCFCFC` | 리스트 배경(옵션) |
| `--color-text-primary` | `#333333` | 본문·필수 정보 |
| `--color-text-secondary` | `#666666` | 보조 설명 |
| `--color-text-tertiary` | `#767676` | 캡션·메타정보 전용(§6 접근성 제약 참고) |
| `--color-text-inverse` | `#FFFFFF` | 네이비/딥 배경 위 텍스트 |
| `--color-border-default` | `#E5E5E5` | 카드·구분선 |

### 상태 / 글래스
| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-status-rise` | `#D00000` | 상승/위험 급등, 리스크 L4 |
| `--color-status-fall` | `#1850FF` | 하락/개선 |
| `--color-glass-dark` | `rgba(0,19,74,.48)` | 히어로 배너 글래스 오버레이 |
| `--color-glass-light` | `rgba(255,255,255,.75)` | 라이트 배경 위 글래스 카드 |
| `--color-overlay-image` | `rgba(0,0,0,.4)` | 이미지 위 텍스트 가독성 오버레이 |

### 리스크 L0~L4 의미색 — 승인 단계 축 (제안 매핑, [개정 2026-07-04] L3 hex 확정)
콘솔 스펙은 PII거버넌스·감사체인 페이지에서 "의미색 red/amber/emerald/violet"을 JB 토큰과 하모나이즈해 유지했다고 명시한다(무결성 유지, §해소된 항목). 명칭·용도(5단계 체계)는 [확정]이다. **이 축은 "누가 승인하는가"(승인 단계)를 나타내며, 아래 "케이스 리스크 심각도"(무엇이 얼마나 위험한가)와는 별개 축이다 — 한 케이스는 예: `severity=High` + `approvalLevel=L2`처럼 두 값을 동시에 가진다.**

| 레벨 | 의미 | 색상 | 승인 주체 |
|---|---|---|---|
| L0 | 관찰/로그, 자동 통과 | 중립 회색(`--color-text-tertiary` on `--color-bg-muted`) | 없음(시스템) |
| L1 | RM 검토 | 파랑(`--color-brand-accent` `#1C56FF`) | RM |
| L2 | RM 승인 | 파랑 + 진한 보더(`--color-brand-accent` / `--color-brand-deep` 보더) | RM |
| L3 | 준법/법률 검토 | 보라 `#6D28D9`(violet-700, [제안] — JB 브랜드 팔레트에 violet 계열이 없어 신규 도입, 김민주 확인 대기) | 준법 최종 승인자 |
| L4 | 차단·상위검토 | 빨강(`--color-status-rise` `#D00000`) | 승인 게이트 + 상위검토 |

### 케이스 리스크 심각도 — Critical/High/Medium/Low (신규, Figma "망상궤도" LocalGuard OS Console Foundations 출처)
케이스 자체의 위험 심각도를 나타내는 축(승인 단계와 무관). 리스크 배지·정렬·필터에 사용.

| 심각도 | 색상 | 용도 |
|---|---|---|
| Critical | `#B91C1C` | 즉시 조치 필요, 자동 종결 금지 |
| High | `#EA580C` | 우선 검토 대상 |
| Medium | `#D97706` | 통상 검토 큐 |
| Low | `#15803D` | 낮은 우선순위, 배치 처리 가능 |

---

## 3. 타이포그래피

`--font-family-base`: `"SUIT Variable", -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

- **가중치**: regular **500**(SUIT 특성상 본문 기본이 500) · body **600** · bold **700** · extrabold **800**(헤드라인 전용).
- **자간**: 일반 텍스트 `-0.02em`, 숫자(KPI·리스크 스코어) `-0.06em` — 숫자를 더 타이트하게 짜서 대시보드 밀도를 낸다.
- **크기 스케일**(클램프, 반응형): display-1 56~96px · headline-1 44~88px · headline-2 32~64px · title-1 28~40px · title-2 24~32px · title-3 20~24px · body-1 17~20px · body-2 16px(모바일 15px) · caption 14px(모바일 13px).
- **사용 규칙**: extrabold(800) 헤드라인은 대시보드 히어로 배너·페이지 타이틀에만. 케이스 카드·리스트 항목은 body-2/caption. 리스크 스코어 숫자(예: "88")는 title-1~2 크기 + 숫자 자간(-0.06em) + extrabold.

---

## 4. Spacing / Layout

JB 원본 스케일(브랜드 페이지 기준, `--jb-space-*`로 원문 보존): 4·8·12·16·20·24·28·32·40·48·64·80·100·144px. 원본 클램프: 카드 간격 14~24px, 그리드 간격 20~32px, 섹션 세로 간격 64~144px.

**[개정 2026-07-04, §1-6 밀도 원칙 반영] 콘솔 전용 축소 스케일**(`--console-space-*`, 실제 화면에 적용하는 값 — 원본 JB 스케일은 마케팅 페이지처럼 여백이 넓은 용도이며, 업무 콘솔은 이 축소판을 쓴다):
- 카드 간격 `--space-card-gap`: clamp(8px, 0.6vw, 14px) — 기존 14~24px에서 축소
- 그리드 간격 `--space-grid-gap`: clamp(10px, 1vw, 18px) — 기존 20~32px에서 축소
- 섹션 세로 간격 `--space-section-y`: clamp(24px, 3vw, 56px) — 기존 64~144px에서 축소
- 히어로 배너 높이: 최대 180px로 캡(콘솔 히어로는 마케팅 히어로보다 낮게 — 정보 밀도 우선)
- 카드 radius: 기본 `--radius-lg`(24px)로 다운(기존 xl 32px에서 축소, §5 참고)

레이아웃: 페이지 여백 `--layout-page-margin`(21~57px 클램프) · 콘텐츠 최대폭 lg 1564px / md 1328px / sm 1000px · 헤더 높이 데스크톱 96px / 모바일 62px.

### 3열 셸 폭 [확정 2026-07-04]
```
[ org-rail 64px ] [ nav-list 240px ] [ page-content flex(≤1564px) ] [ context-panel 360px ]
```
Figma 사이드바 280px+2열 대안과 승보 JB_project2 실제 구동 화면을 비교한 결과([[디자인-토큰-업그레이드-설계안]] §1-1) 이 3열 셸을 그대로 확정한다. page-content의 기본 뷰는 Kanban/테이블(§1-3). 1440px 이하 화면에서는 context-panel이 오버레이로 전환(TBD로 유지 — 반응형 세부는 프로토타입 단계에서 검증).

---

## 5. Radius / Shadow / Motion

- **Radius**: xs 4px · sm 8px · md 16px · lg 24px · xl 32px · 2xl 40px · pill 999px · circle 50%. 카드는 **24px(lg)**([개정 2026-07-04] 밀도 원칙 반영, 기존 32px(xl)에서 축소), 배지·칩은 pill, 입력 필드는 8~16px.
- **Shadow**: dropdown `4px 4px 24px rgba(0,0,0,.1)` · overlay `0 8px 32px rgba(0,0,0,.16)`.
- **Motion**: fast 120ms(호버) · base 200ms(일반 전환) · menu 280ms(드롭다운/context-panel 슬라이드) · card 600ms(카드 진입 애니메이션). 이징: `--ease-standard cubic-bezier(.2,0,0,1)` · `--ease-out cubic-bezier(.16,1,.3,1)`.

---

## 6. 접근성

- **대비**: `--color-text-primary`(#333)·`--color-text-secondary`(#666)는 흰 배경에서 본문 기준(AA 4.5:1)을 여유 있게 충족한다. `--color-text-tertiary`(#767676)는 임계치에 근접해 있어 **캡션(14px 이하) 메타정보에만 사용하고, 리스크 배지·승인 상태처럼 의사결정에 영향을 주는 텍스트에는 사용을 금지**한다.
- **색맹 대응**: 리스크 배지 L0~L4는 색만으로 구분하지 않는다 — 레벨 텍스트(L0~L4)와 아이콘을 항상 병기한다.
- **키보드 포커스**: 전 인터랙티브 요소에 `--focus-ring`(2px solid `--color-focus-green`) + `--focus-ring-offset`(3px). `:focus-visible`로 마우스 클릭 시 숨기고 키보드 탐색 시 항상 노출한다. 키보드 퍼스트 흐름은 [[ia-screen-map|IA·화면 맵]] §5 참고(미확정 초안, `_archive/`).
- **모션 민감도**: `prefers-reduced-motion` 대응 — 600ms 카드 진입/280ms 메뉴 전환을 즉시 전환으로 대체(제안, TBD).
- **터치 타깃**: 최소 40px(`--space-10`) 확보.

---

## 7. 컴포넌트 목록

| 컴포넌트 | 용도 | 핵심 토큰 | 상태 |
|---|---|---|---|
| **케이스 카드** | 케이스 큐/칸반의 단위 카드(S-03) | radius lg(24px, 개정), shadow dropdown, card-gap | default / hover / 선택됨 / 고위험(보더 강조) |
| **승인 카드** | 승인 대기 항목(S-04) | radius lg, L레벨 배지 색 | 대기 / 승인됨 / 반려됨 |
| **에이전트 카드** | 에이전트 레지스트리(S-07) | radius lg, 상태 아이콘 | 활성 / 휴면 / 오류 |
| **리스크 배지(승인단계) L0~L4** | 승인 단계 라벨(전 화면 공통) | pill, §2 "L0~L4 승인 단계 축" | L0~L4 5종 |
| **리스크 배지(심각도)** | 케이스 위험 심각도 라벨(신규) | pill, §2 "케이스 리스크 심각도" | Critical/High/Medium/Low 4종 |
| **감사 타임라인** | 해시체인 시각화(감사체인 드릴인) | radius sm, 모노스페이스 해시 표기 | 무결성 정상 / 위변조 경고 |
| **org-rail** | 계열사 전환 아이콘 rail | radius circle, glass | 전북은행/JB우리캐피탈 활성, 나머지 비활성 |
| **KPI 글래스카드** | 대시보드 히어로 배너(S-01, 최대높이 180px 캡) | glass-dark, brand-navy 배경, extrabold 숫자 | 정적(카운트업 애니메이션 옵션) |
| **진단 폼** | 전세Shield 입력(S-06) | radius md 입력필드, body-2 | 입력중 / 계산완료 / 고위험 경고 |
| **PII 등급 배지** | 원본/가명/토큰화 라벨(S-15) | pill, 의미색 4종 | 3단계 |
| **스킬/플러그인 카드** | 레지스트리 항목(S-11/S-12) | radius lg | 연결됨 / 미연결 / 승인필요 |

### LocalGuard 콘솔 전용 컴포넌트 8종 (신규, Figma "망상궤도" LocalGuard OS Console Components 출처)

| 컴포넌트 | 용도 | 핵심 토큰 | 상태 |
|---|---|---|---|
| **LG/CaseCard** | Case FSM 상태를 보여주는 케이스 카드(§8 Case FSM 색상) | radius lg, §8 상태색 | New/InProgress/Review/Done/Blocked |
| **LG/KanbanColumn** | page-content 기본 뷰의 칸반 컬럼(§1-3) | radius lg, card-gap | 5개 컬럼(Case FSM 5상태와 1:1) |
| **LG/AgentRunTimeline** | 에이전트 실행 스트리밍 표시 | §9 AgentRun 상태색, pulse dot | Running(auto-scroll)/Succeeded/Failed/Queued |
| **LG/ApprovalPanel** | 승인 대기/처리 패널(context-panel) | §9 Approval 상태색 | Pending/Approved/Rejected/Modified |
| **LG/AuditEventRow** | 감사 로그 행(우측 drawer) | radius sm, 모노스페이스 | diff/actor/timestamp/payload 표시 |
| **LG/SecurityPolicyCard** | PII 비반출 규칙 카드(§10) | brand-navy 배경, badge | EXPORT BLOCKED/MASKED |
| **LG/IntegrationStatus** | 외부 연결 상태 카드 | pill 상태 배지 | 연결됨/degraded/down |
| **LG/MobileCaseSummary** | 모바일 케이스 요약 카드 | radius lg, 압축 레이아웃 | 리뷰 전용 축약 뷰 |

## 8. Case FSM 상태색 (신규)

| 상태 | 색상 | 의미 |
|---|---|---|
| New | `#1C56FF` | 에이전트 실행 시작 |
| InProgress | `#06A5FF` | 실시간 모니터링 |
| Review | `#F59E0B` | 승인/거부/수정 대기 |
| Done | `#10B981` | 감사 로그 확인 완료 |
| Blocked | `#DC2626` | 재검토 요청 |

## 9. Approval · AgentRun 상태색 (신규)

**Approval**(승인 처리 결과 — §2 "L0~L4 승인 단계 축"과는 별개로, 승인 액션 자체의 결과 상태):

| 상태 | 색상 |
|---|---|
| Pending | `#F59E0B` |
| Approved | `#10B981` |
| Rejected | `#DC2626` |
| Modified | `#1C56FF` |

**AgentRun**(에이전트 실행 상태):

| 상태 | 색상 |
|---|---|
| Running | `#1C56FF`(pulse dot + auto-scroll) |
| Succeeded | `#10B981` |
| Failed | `#DC2626` |
| Queued | `#64748B` |

## 10. PII 비반출 UI 규칙 (신규)

- 원본 PII는 UI/로그에 직접 표시하지 않는다.
- 마스킹 표기: `홍*동`, `010-****-1234`.
- 반출 스캔 실패 시 발송 버튼은 `disabled`.
- 승인/수정/거부는 모두 AuditEvent로 기록한다.
- 외부 모델로 전송하기 전 라우팅 배지를 표시한다.
- 배지: EXPORT BLOCKED `#DC2626` / MASKED `#0F766E`.

## 11. 인터랙션 계약 (신규)

| 인터랙션 | 규칙 |
|---|---|
| Kanban DnD | 허용 액션이 있을 때만 drag/drop 가능. 불가 상태는 cursor disabled + reason tooltip. |
| Agent Streaming | running 단계는 pulse dot + auto-scroll. 실패 시 retry 가능 여부와 에러 payload 노출. |
| Approval Gate | Approve/Reject/Modify 전 확인 모달. 승인 전 외부 발송 API 호출 금지. |
| Audit Trail | 모든 상태 변경은 우측 drawer에서 diff·actor·timestamp·payload JSON 확인. |

---

## 참조

- [[JB-콘솔-프로토타입-스펙-가안|콘솔 프로토타입 SSOT]] §JB 디자인 토큰 · §시그니처 페이지.
- [[_canon|canon]] §2 에이전트 로스터.
- [[ia-screen-map|IA·화면 맵]](미확정 초안, `_archive/`)
- [[user-journeys|사용자 여정]](미확정 초안, `_archive/`)
- [[디자인-토큰-업그레이드-설계안]] — 본 개정(2026-07-04)의 조사·근거 문서.
- [[엔터퍼스트_케이스플로우_HCI_UX분석]] — §1-2 HCI 근거 원문.
- `08_본선/03_제품/03_ux/tokens/jb-console-tokens.css`·`.json` — 본 문서 값의 실 토큰 파일.

## 12. 다음 라운드 (범위 밖 — PRD/기능명세서 확정 후)

케이스 상세 화면 계층, 전체 화면 흐름·IA, 뷰 목록 확장(승인 대기함/감사 콘솔 등 개별 화면 명세)은 본 개정 범위에 포함하지 않는다. PRD·기능명세서가 나온 뒤 별도 라운드에서 [[ia-screen-map|IA·화면 맵]](미확정 초안, `_archive/`)과 함께 다룬다.

**참고 자료 대기열 (자료 보관만, 미착수):**
- Figma "망상궤도" node-id `4924-844` — 케이스 대시보드(Case 카드 3열) + 케이스 상세 Enter-First 승인 플로우(에이전트별 사용 이유·예상 기대값·근거 데이터·Enter 승인, 스트리밍 진행률 상태 포함) 저해상 와이어프레임. IA·화면 맵 라운드 착수 시 1차 입력으로 사용.
