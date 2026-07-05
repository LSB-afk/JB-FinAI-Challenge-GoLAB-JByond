# JByond 설치·사용 가이드

> **JByond** — 다음 세대를 잇는 JB금융의 AX Operating System (구 JB LocalGuard OS)
> 이 문서 하나로 설치 → 실행 → 로컬 모델 연결 → 조작법 → 검증 → 문제 해결까지 끝냅니다.
> **키·모델이 전혀 없어도 오프라인 시뮬레이션으로 전체 데모가 완주**됩니다.

## 1. 전제조건

| 필수 | 확인 명령 | 비고 |
|---|---|---|
| Python 3 | `python3 --version` | 정적 서버 용 (macOS 기본 내장) |
| Node.js 18+ | `node --version` | 프록시·백엔드·검증 용 |
| (선택) Ollama | `ollama --version` | 로컬 모델 실동작 시연 시에만 |

Windows는 `python3` 대신 `python`이 될 수 있습니다. 그 외 GPU·API 키·계정 등 일절 불필요.

## 2. 설치 · 기본 실행 (2분)

```bash
git clone https://github.com/LSB-afk/JBFinAI-GoLAB-JByond.git
cd JBFinAI-GoLAB-JByond
npm install          # Playwright 등 검증 도구 (시연 자체엔 없어도 됨)
npm run dev          # → http://127.0.0.1:8000/index.html
```

브라우저에서 열면 접수 → 분류 → 에이전트 제안 → **사람 승인** → 감사 기록의 전체 운영 루프가 바로 돕니다. 상태는 브라우저 `localStorage`에 저장됩니다(서버 불필요).

## 3. 실행 모드 (필요한 것만 추가로 켜기)

| 모드 | 명령 | 포트 | 하는 일 |
|---|---|---|---|
| 기본 (정적) | `npm run dev` | 8000 | 전체 데모 완주 — 이것만으로 충분 |
| 백엔드 | `npm run backend` | 8010 | `/api/*` 서버 + JSON 파일 저장소 (Supabase 전환은 `.env.example` 참고) |
| 로컬 모델 | `npm run demo:ollama` | 8030 | Ollama 중계 — RM 콘솔 실 LLM 실행 |
| LLM 게이트웨이 | `npm run demo:llm` | 8022 | claude→codex→ollama→사람 큐 **폴백 사다리** + 비용 원장 |
| 실거래가 | `npm run demo:proxy` | 8020 | 국토부 API 중계 — 브라우저에서 `?live=1` (키 없으면 자동 시뮬레이션) |

## 4. 로컬 모델(Ollama) 연결 — 실 LLM 시연

```bash
# 1) Ollama 설치 (macOS: brew install ollama / https://ollama.com)
ollama pull exaone3.5          # 또는 llama3.1:8b 등 아무 모델
OLLAMA_MODEL=exaone3.5 npm run demo:ollama    # :8030
```

- RM 콘솔에서 **모델 선택 UI**(설정)로 런타임을 `ollama`로 두면 샘플 실행·자연어 접수가 실제 로컬 모델로 돕니다.
- 모델 응답에는 **3계층 메모리 카드**가 `priorMemory`로 자동 주입되고, 결과는 감사 해시체인에 기록됩니다.
- Ollama가 죽어 있으면? → 게이트웨이(:8022)가 떠 있으면 폴백, 그것도 없으면 오프라인 목업으로 **끊김 없이 완주**합니다.

## 5. 조작법 (키보드 퍼스트)

| 키 | 동작 (RM·전세보호 콘솔 우선 적용) |
|---|---|
| `1~9` | 케이스 선택 · `←→↑↓` 이동 |
| `Space` | 다음 스텝 진행 · `Enter` 실행/승인 (고위험은 2단 확인) |
| **`n`** | **자연어 접수** — 상담·지시문 붙여넣기+파일 첨부(.txt/.md/.csv) → 모델이 케이스·서브케이스 생성, 부족한 자료를 되물음 |
| `Esc` | 모달 닫기 · `⌘/Ctrl+Enter` 접수 제출 |

시연 동선이 필요하면 → **[JUDGE_DEMO.md](JUDGE_DEMO.md)** (5분 대본: 구동 → 핵심 3콘솔 → 폴백 규칙).

## 6. 검증 (설치가 제대로 됐는지)

```bash
npm run test           # 정적 계약 검증 — "static verification passed / checked files: 100"
npx playwright test    # E2E 전체 (승인·자동종결 불변식·해시체인 변조탐지 포함)
npm run backend:test   # 백엔드 API 검증 (backend 모드 사용 시)
```

## 7. 트러블슈팅

| 증상 | 처방 |
|---|---|
| 포트 충돌 (8000/8010/8020/8022/8030) | 기존 프로세스 종료 또는 `PORT=`·`LLM_GATEWAY_PORT=`·`OLLAMA_AGENT_PROXY_PORT=` 등으로 변경 |
| Ollama 연결 안 됨 | `ollama serve` 기동 확인 → 그래도 안 되면 앱이 자동 목업 폴백하므로 시연은 계속됨 |
| Playwright 에러 | `npx playwright install chromium` 1회 |
| 화면이 이전 상태 | 브라우저 강력 새로고침(⌘⇧R) — 상태 초기화는 devtools에서 `localStorage.clear()` |
| 실거래가 안 나옴 | `?live=1` + `demo:proxy` + `.env.example`의 국토부 키 필요 — 없으면 시뮬레이션 값으로 동일 완주 |

## 8. 환경변수

전부 **선택사항**입니다. `cp .env.example .env` 후 필요한 값만 — 실거래가 키(국토부/서울), Ollama 주소·모델, 백엔드 포트·Supabase 전환. 각 항목 설명은 [`.env.example`](.env.example) 주석 참조.

---
문의: 팀 GoLAB · 라이선스 [MIT](LICENSE) · 서드파티 고지 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
