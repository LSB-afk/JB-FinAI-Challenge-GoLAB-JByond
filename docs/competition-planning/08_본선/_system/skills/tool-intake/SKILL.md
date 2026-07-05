---
name: tool-intake
description: 신규 도구(플러그인·CLI·MCP·스킬) 도입 워크플로 — 출처검증→SkillSpector 보안스캔→레지스트리 분류·등록→bootstrap 게이트→AI 메모리 트리거→로그를 일괄 처리. 도구를 추가/설치/검토할 때, "이 스킬/플러그인 깔자"·"이 도구 추가" 요청 시 사용. 검증 없는 설치를 구조적으로 차단.
tags:
  - area/system
  - type/skill
  - status/active
date: 2026-07-01
up: "[[_tools-index]]"
---
# tool-intake

> 새 도구를 팀 도구셋에 들이는 **표준 6단계**. S14·S15·T(도구셋 확장)에서 매번 반복된 워크플로를 한 흐름으로 고정. 보안 게이트(SkillSpector)를 절차에 못박아 "검증 없이 설치"를 막는다.

## 6단계

1. **출처 검증** — `gh repo view <owner/repo>` 또는 WebFetch로 실재·라이선스·★·최근 활동 확인. 비공개/404/라이선스 불명이면 중단·보고.
2. **🔒 보안 스캔(스킬·플러그인일 때 필수)** — 설치 **전** [[registry-cli|skillspector]]:
   ```bash
   skillspector scan <레포URL|경로>            # 51+ = 설치 금지
   skillspector scan <경로>                     # 한국어 스킬은 --no-llm 끄고 LLM모드(anthropic/claude_cli) 병행
   ```
   점수·심각도를 로그에 남긴다. 클린 ≠ 안전 확정(정적 한계 명시).
3. **레지스트리 분류·등록** — 종류에 맞는 레지스트리에 행 추가:
   - 플러그인 → SSOT=`.claude/settings.json` `enabledPlugins`+`extraKnownMarketplaces` (수정 후 [[registry-plugins]]는 plugin-inventory가 재생성, **개인 전역 혼입 주의**).
   - CLI/스크립트 → [[registry-cli]] · MCP → [[registry-mcp]] · 스킬 → [[registry-skills]] (+ `skills-lock.json`).
4. **bootstrap 게이트** — 서드파티 설치형이면 `bootstrap.sh` STEP 3.5에 설치 명령 추가(스캔 게이트 아래). 자동 실행 금지·echo만 원칙 유지.
5. **AI 메모리 트리거** — 즉시 안 쓰고 대기하는 도구면 글로벌 메모리에 **트리거별 "How to apply"** 불렛 추가([[본선-도구-확장-제안]] 형식) → 팀원 무지시·AI 선제안. MEMORY.md 포인터 1줄.
6. **로그** — decision-log(선택·이유·라이선스·스캔점수·상태) + 해당 분기(T) 프롬프트 로그.

## 승인 게이트
- `.claude/settings.json`·`bootstrap.sh`는 **팀 공유 SSOT** → 편집은 **사용자 승인 후**.
- 외부 데이터 전송 도구(notebooklm·firecrawl류)는 **고객 PII·대외비 투입 금지** 경고를 레지스트리에 명시.
- 라이선스 비상업/카피레프트(AGPL·GPL)면 소스 lift 금지·용도 제약 명기.

## 트리거 (AGENTS §4-A)
"이 도구/스킬/플러그인 추가·설치·검토" 맥락 → 이 절차로 진행. 6종 도구 예시·결정 = [[도구-확장-리서치-20260701]].

## 연결
- [[registry-cli]] · [[registry-plugins]] · [[registry-skills]] · [[registry-mcp]] · [[본선-도구-확장-제안]] · [[_tools-index]]
