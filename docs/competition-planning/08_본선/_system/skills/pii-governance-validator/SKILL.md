---
name: pii-governance-validator
description: 원본 PII 외부반출·승인우회 위반 패턴을 스캔하는 거버넌스 검증 스킬
tags:
  - area/system
  - type/skill
  - status/active
date: 2026-06-27
up: "[[_tools-index]]"
---
# pii-governance-validator

> PII(개인식별정보) 및 민감 데이터의 외부 반출·승인 우회 위반 패턴을 정적 스캔하는 거버넌스 게이트.
> 커밋 전 또는 세션 종료 시 실행해 위반을 조기 탐지한다.

## 목적

- 실 고객 데이터·팀원 개인정보의 볼트 외부 유출 방지
- 허가되지 않은 파일에 PII가 포함되는 패턴 탐지
- 협업 규칙 §5(비밀유지) 준수 자동화

---

## 스캔 룰 (위반 패턴)

### RULE-01 — 실명 + 전화번호 동시 출현
- **패턴**: 한글 2~4자 + 010-XXXX-XXXX (같은 파일 5줄 이내)
- **심각도**: CRITICAL
- **허용 예외**: `_system/team/member-*.md` (팀원 연락처는 내부 볼트에만 허용)
- **위반 예시**: 고객 상담 이력에 이름과 전화번호가 함께 기록된 경우

### RULE-02 — 주민등록번호·여권번호 패턴
- **패턴**: `\d{6}-[1-4]\d{6}` (주민번호) 또는 `[A-Z]\d{8}` (여권번호)
- **심각도**: CRITICAL
- **허용 예외**: 없음 (볼트 내 어디에도 금지)

### RULE-03 — 금융 계좌·카드번호
- **패턴**: `\d{3,4}-\d{4}-\d{4}(-\d{4})?` (카드) 또는 `\d{10,14}` (계좌)
- **심각도**: HIGH
- **허용 예외**: 가상 예시 번호(1234-5678-... 형식 테스트 데이터는 제외)

### RULE-04 — 이메일 + 실명 조합 (고객 데이터 의심)
- **패턴**: 한글 이름 + `@` 이메일이 같은 줄 또는 마크다운 표 행에 존재
- **심각도**: HIGH
- **허용 예외**: `team/` 내 팀원 연락처, `00_제출/` 내 팀 소개 (명시 허용 목록)

### RULE-05 — 외부 URL에 PII 쿼리 파라미터 노출
- **패턴**: `https?://[^"'\s]+[?&](name|email|phone|id|user)=[가-힣A-Za-z0-9+%@]+`
- **심각도**: HIGH
- **허용 예외**: 없음

### RULE-06 — 승인 우회 마커 (의도적 규칙 무력화 시도)
- **패턴**: 주석·텍스트 내 `# nocheck`, `<!-- skip-pii -->`, `BYPASS_PII` 등
- **심각도**: MEDIUM (존재 자체를 경고)
- **사유**: 우회 마커 자체가 감사 대상

### RULE-07 — 6/29 이전 외부 공유 경로 노출
- **패턴**: `github.com/[^/]+/[^/]+` 링크가 `_system/` 외부 파일에 존재하고 `public` 키워드 동반
- **심각도**: MEDIUM
- **사유**: 비공개 정책(collaboration-rules §5) 위반 가능성

### RULE-08 — 원본 금융 거래 데이터 파일 직접 첨부 의심
- **패턴**: `.csv`, `.xlsx`, `.json` 파일명이 `고객`, `거래`, `계좌`, `명세` 키워드 포함
- **심각도**: HIGH
- **허용 예외**: `00_제출/` 내 공식 제출물, `_system/telemetry/` (집계 파일)
- **사유**: 원본 금융 데이터를 볼트에 포함하면 외부 반출 위험

---

## 실행 (수동)

```bash
# 볼트 전체 스캔
node 08_본선/_system/skills/pii-governance-validator/scan.mjs

# 특정 디렉터리만
node 08_본선/_system/skills/pii-governance-validator/scan.mjs --target 08_본선/02_제품

# 드라이런 (파일 생성 없이 stdout만)
node 08_본선/_system/skills/pii-governance-validator/scan.mjs --dry-run
```

## 출력 형식

```
[pii-validator] CRITICAL RULE-01: 실명+전화번호 조합
  파일: 08_본선/03_리서치/고객인터뷰.md:14
  내용(마스킹): 홍○○ 010-****-5678
[pii-validator] 스캔 완료 — CRITICAL:1 HIGH:0 MEDIUM:0
```

CRITICAL 또는 HIGH 발견 시 exit code 1로 종료 (CI 게이트 연동 가능).

---

## 통합 포인트

| 시점 | 방법 |
|------|------|
| 커밋 전 | `pre-commit` 훅에 등록 |
| 세션 종료 | Stop 훅 체인에 추가 |
| 주기 점검 | cron 또는 수동 실행 |
| CI | GitHub Actions 스텝 |

---

## 연결

- [[collaboration-rules]] — §5 비밀유지 원본 규칙
- [[_HARNESS-SYSTEM]] — 하네스 시스템
- [[ax-insights]] — 거버넌스 게이트 현황 반영
