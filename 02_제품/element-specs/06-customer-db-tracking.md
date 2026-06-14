# 06 · 고객 DB + 케이스↔고객 추적

> 모듈: `customers[]` + `case.customerId` · 케이스를 고객 단위로 집요하게 추적

## 개념
케이스는 한 고객에서 발생한 사건이다. 따라서 고객을 1급 엔티티로 두고, 한 고객을 **지속 추적·관찰**하며 그에 연결된 케이스들을 타임라인으로 본다. 고객 정보는 PII이므로 거버넌스(07) 대상.

## 고객 엔티티
```js
{
  id: "cust-jeonju-cafe-001",
  name: "김민수",                 // restricted(PII) → 마스킹/토큰화
  maskedName: "김○○",            // UI 기본 표시
  affiliate: "전북은행",
  segment: "개인사업자",
  since: "2019-03",
  contact: { tier: "restricted" }, // 미표시
  caseIds: ["jeonju-cafe", ...],   // 연결 케이스
  riskTrend: [ {date, score} ],    // 추적 그래프
  notes: [ {date, actor, text} ]   // 상담/관찰 이력
}
```

## 추적 UI
- 케이스 상세 → "고객 추적" 섹션/뷰: 고객 요약(마스킹), 리스크 추이, 연결 케이스 타임라인, 관찰 노트.
- 한 고객의 여러 케이스가 시간순으로 연결되어 "집요한 추적"을 보여준다.
- 모든 PII 표시는 마스킹 기본, 재식별은 사람 승인 + 감사(07) 경유.

## 데이터 인터페이스
`case.customerId` 추가 → `customerById(id)` 조회. 히어로 고객(전주 카페)에 케이스 1~2건 + 추이/노트 시드.

## 갈아끼우기
`customers[]`는 독립 배열. 케이스는 `customerId`로만 참조 → 고객 데이터 소스 교체 가능.

## 심사 효과
③ 운영의 지속성·실무성, ⑤ PII 추적의 거버넌스 결합.
