# 08 · README 업그레이드 (다이어그램·스크린샷·설치법)

> 모듈: README.md (루트 + app) + `자산/diagrams/`, `자산/screenshots/`

## 목적
GitHub에서 README만 봐도 (1) 구조를 다이어그램으로 이해 (2) 상세 설치/실행법 (3) 실제 작동 화면을 볼 수 있어야 한다.

## 추가물
1. **아키텍처 다이어그램 이미지** (Excalidraw로 작도 → PNG 캡처)
   - 시스템 구조: Case → AgentRun → Agent → Skill → Plugin(법령/정책/뉴스/JB DB) → Governance → Approval → Audit
   - 데이터 거버넌스 흐름: 원본 PII → 토큰화 → 모델 라우팅(국내/외부) → 외부 반출 제한 → 감사
   - 저장: `자산/diagrams/*.png`, README에 `![](경로)` 임베드
2. **실제 작동 스크린샷**: 대시보드, 케이스 상세(자율운영), 플러그인, 거버넌스 패널, 산출물 뷰어 → `자산/screenshots/*.png`
3. **상세 설치/실행법**:
   - 사전 요구(Python3 / Node 18+ for e2e), clone, `npm install`
   - 실행: `npm run dev` (또는 `cd app && python3 -m http.server 8000`) → `http://127.0.0.1:8000`
   - 데모 모드 URL(`?demo=jeonse|phishing|sme`)
   - 검증: `python3 scripts/verify_static.py`, `npm run test:e2e`
   - 트러블슈팅(포트 충돌, 브라우저 미설치)

## 도구
- Excalidraw MCP(`mcp__claude_ai_Excalidraw`)로 다이어그램 작도/내보내기, 또는 ASCII→이미지 대체.
- 스크린샷은 Playwright 캡처(`tests/results/screenshots/`) 재활용 + 신규 뷰 추가 캡처.

## 심사 효과
④ 검증가능성·전달력, 전체 인상 품질.
