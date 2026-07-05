---
name: local-model
description: Ollama로 EXAONE 3.5 7.8B(데모 히어로) / Qwen2.5 7B·14B(상업 배포 백업)를 M4 Pro에서 로컬 추론. 프롬프트가 로컬을 벗어나지 않아 PII 포함 요청도 안전하게 처리한다. "로컬모델 실행", "로컬 추론", "Ollama 데모", "PII 로컬 처리", "오프라인 모델 테스트" 상황에서 사용.
tags: [area/system, type/skill, status/active]
date: 2026-07-03
up: "[[_tools-index]]"
---
# local-model

> 로컬 LLM(EXAONE 3.5 / Qwen2.5)을 Ollama로 즉시 실행하는 스킬. 프롬프트가 기기를 떠나지 않으므로 고객 PII가 섞인 텍스트도 외부 API(Claude/Codex/OpenAI)로 보내지 않고 처리할 수 있다.

## 왜(근거)

[[로컬모델-컴퓨팅-TCO-모델링]]의 결론: **시연 히어로 = EXAONE 3.5 7.8B**(국산·한국어 서사, 공개본은 비상업 라이선스라 데모 전용), **권고 배포 = Qwen2.5 7B**(상업 라이선스 명확성 우위), **품질 백업 = Qwen2.5 14B**. PII·민감 업무는 반드시 로컬 처리하고, 비민감·일반 추론만 외부 API로 폴백하는 것이 본선 아키텍처 원칙이다(같은 문서 §5).

## 언제 쓰나

- 로컬모델 데모/시연 리허설(발표 전 실동작 확인)
- PII 섞인 텍스트(고객명·계좌·주소 등)를 다뤄야 하는데 외부 API로 보내면 안 될 때
- Ollama가 도는지, 모델이 받아졌는지 빠르게 확인하고 싶을 때

## 사용법

```bash
# 최초 1회 (또는 재확인) — 멱등, 재실행해도 안전
bash 08_본선/_system/skills/local-model/setup.sh

# 추론 실행 (기본 모델 = exaone)
node 08_본선/_system/skills/local-model/run.mjs "전주 중앙로 카페 사장님 매출 둔화 신호를 3줄로 요약해줘" --model exaone

# 상업 배포 백업으로 확인
node 08_본선/_system/skills/local-model/run.mjs "..." --model qwen
node 08_본선/_system/skills/local-model/run.mjs "..." --model qwen14b

# stdin으로도 가능
echo "이 텍스트에 PII가 있는지 확인해줘" | node 08_본선/_system/skills/local-model/run.mjs --model qwen
```

## 입력/출력

- 입력: 프롬프트 문자열(위치 인자 또는 stdin), `--model exaone|qwen|qwen14b`(기본 `exaone`). 매핑에 없는 값은 Ollama 모델 태그로 그대로 전달(예: `--model llama3.1:8b`).
- 출력: 모델 응답 텍스트를 stdout에 그대로 출력(파이프 가능). 진행 메시지는 stderr.
- 실패 시(Ollama 미기동/모델 미설치): stderr에 원인과 `setup.sh` 재실행 안내를 찍고 exit 1.

## PII 안전 원칙

- `run.mjs`는 `http://127.0.0.1:11434`(Ollama 로컬 API)에만 요청한다. 외부 네트워크 호출이 코드 안에 없다.
- 원본 PII를 요약·마스킹하는 로직은 이 스킬의 책임이 아니다 — 정적 위반 탐지는 [[pii-governance-validator]]가 별도로 담당한다. 이 스킬은 "로컬에서만 도는 추론 엔진"을 제공할 뿐이므로, 라우팅 판단(PII면 로컬, 아니면 외부 폴백 가능)은 호출하는 쪽(콘솔 앱/오케스트레이터)의 책임이다.

## M4 Pro 실행 권고

- **경로:** Ollama(설치·실행 단순, "실제 로컬모델 응답"을 보여주기 쉬움). MLX가 Metal에 더 최적화될 수 있으나 준비 시간이 부족하면 Ollama 우선(같은 TCO 문서 §4).
- **모델 순서(리스크 낮은 순):** EXAONE 3.5 7.8B → Qwen2.5 7B → Qwen2.5 14B.
- **양자화:** GGUF Q4_K_M(Ollama 기본 배포 태그 기준). 예상 메모리 EXAONE ≈8~16GB, Qwen2.5 7B ≈ 4GB대, Qwen2.5 14B ≈16~24GB(모두 [추정], 같은 문서 §4).
- 긴 RAG 컨텍스트를 무리하게 넣지 말 것 — 시연 핵심은 속도가 아니라 "PII 감지 → 로컬 라우팅 → 근거 요약 → 사람 승인"이라는 정책 실행이다.

## 콘솔 앱과의 연동 지점

`02_제품/app/app.js`에 이미 이 스킬과 같은 기본 호스트를 겨냥한 opt-in 시드가 있다(`RUNTIME_CONFIG.ollamaBase = "http://127.0.0.1:11434"`, `?live=1`로 켜고 `?model=0`으로 모델만 끌 수 있음, app.js 673행 부근). 즉 향후 에이전트(판단→행동 초안→검증 루프, `startAgentRun`)가 로컬 추론을 실제로 호출하려면, 브라우저에서 이 엔드포인트로 직접 fetch하거나(CORS 허용 필요) 이 스킬의 `run.mjs`를 얇은 로컬 프록시 서버 뒤에 두면 된다 — 지금은 시드만 있고 실제 호출부는 미구현이므로, 연동 시 이 스킬을 그대로 백엔드 삼아 붙이면 된다.

## 설계 원칙

- 모델을 실제로 받지 않아도(`ollama pull` 전) `run.mjs`/`setup.sh`는 완성된 채로 존재하며 바로 실행 가능하다. 안내만 하고 무거운 다운로드는 사용자가 `setup.sh`를 직접 돌릴 때 일어난다.
- 새 의존성 없음 — Node 22 내장 `fetch`만 쓴다.

## 연결

- [[로컬모델-컴퓨팅-TCO-모델링]] — 모델 선정/TCO/라우팅 근거(SSOT)
- [[pii-governance-validator]] — 정적 PII 위반 스캔(이 스킬과 역할 분리)
- [[_tools-index]]
