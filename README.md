# JB LocalGuard OS — 프로토타입 (JB_project2)

> **"손은 놓고, 눈만"** — 에이전트가 일하고, 담당자는 승인만. AI는 제안하고, 사람은 결정한다.
>
> JB금융그룹 Fin:AI Challenge 출품용 **담당자 승인 중심 금융 AI 에이전트 운영 콘솔**의 실행 가능한 정적 프로토타입입니다.
> 프레임워크·빌드·백엔드 없이 브라우저에서 전체 운영 루프(접수 → 분류 → 에이전트 제안 → 사람 승인 → 감사 기록)가 동작합니다.

## 빠른 시작

```bash
npm install          # Playwright (검증용)
npm run dev          # http://127.0.0.1:8000/index.html
```

| 데모 | 진입 | 내용 |
| --- | --- | --- |
| GP-1 여신 (Hero 실동작) | `?demo=sme` 또는 첫 화면 CTA | 소상공인·SME 대출심사 운영지원 — AI가 위험 점수·필요 서류·체크리스트·권고 액션을 제안, RM이 승인 |
| GP-2 보이스피싱 (Hero 실동작) | `?demo=phishing` 또는 첫 화면 CTA | 이상거래 탐지·차단 운영지원 — high/critical 자동 종결 금지, human escalation 유지 |
| GP-3 전세 보호 (확장 로드맵) | `?demo=jeonse` | 로드맵 미리보기 — Hero 실동작 범위 아님 |
| JB우리캐피탈 포털 (그룹 확장성 증명) | `#/jb-woori-capital/board` | 동일 운영 패턴을 계열사 전용 독립 하네스로 확장 |

## 검증

```bash
npm run build      # 정적 계약 검증 (파일·핵심 문자열·금지 패턴·JS 문법)
npm test           # 동일
npm run test:e2e   # Playwright 33개 시나리오 (데모 골든패스·승인/감사·계열사 스코핑·반응형)
```

## 문서

| 문서 | 내용 |
| --- | --- |
| [docs/01-시스템-아키텍처.md](docs/01-시스템-아키텍처.md) | 설계도: 전체 구성도, 운영 계약(Case→…→Audit), 에이전트 하네스, 가드레일 |
| [docs/02-은행-DB-연동-설계.md](docs/02-은행-DB-연동-설계.md) | 기존 은행 DB(계정계/정보계/FDS/전자결재)와의 연결 방안 명문화 — 단계별 로드맵·데이터 매핑·보안 통제 |
| [docs/03-JB우리캐피탈-하네스.md](docs/03-JB우리캐피탈-하네스.md) | 계열사 전용 하네스: route·count 매핑·taxonomy·에이전트/핸드오프·seed·전환 주의사항 |

## 보안·컴플라이언스 원칙

- 실제 대출 승인/거절·금리/한도 산정·신용평가·금융거래 실행 **없음** (UI 자체가 존재하지 않음)
- 실제 고객 개인정보/신용정보 원문 **미사용** — 익명 참조 ID(CUST-*/CONTRACT-*)만 사용, 전체 데이터는 모의(mock)
- 보이스피싱·FDS 고위험(high/critical) 케이스 **자동 종결 금지** — e2e 불변식으로 고정
- 모든 AI output은 "내부 운영 참고용" — 최종 판단은 담당자 승인
- 운영 credential 없음 — DB 연동 시 서버 환경변수로만 주입 (docs/02 참고)

## 구조

```
app/          정적 SPA (메인 하네스 app.js + JB우리캐피탈 전용 wooricap.*)
tests/e2e/    Playwright 시나리오 33개
scripts/      verify_static.py (정적 계약 게이트)
docs/         아키텍처·DB 연동·계열사 하네스 설계
```
