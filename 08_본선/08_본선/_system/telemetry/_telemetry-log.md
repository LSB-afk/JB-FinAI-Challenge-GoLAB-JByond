---
tags: [area/system, type/log, status/active]
date: 2026-06-27
up: "[[_HARNESS-SYSTEM]]"
---
# 텔레메트리 로그 (Append-only · 자동 기록)

> ⚠️ 대외비. 1행 = 1세션/체크포인트. Stop 훅이 자동 append. 수동 추가도 가능.

| 날짜(UTC) | 트리거 | 사용 툴(횟수) | 토큰(in/out) | 소요 | 작업/산출물 | 투입 | 비고 |
|------|--------|--------------|-------------|------|------------|------|------|
| 2026-06-30 17:09 | 세션종료 | Bash×7, mcp__perplexity__pplx_smart_query×4, Edit×1, Agent×1, ToolSearch×1, mcp__perplexity__pplx_usage×1 | 357592/33807 | 10m | — | (자동) | (자동 기록 · cache_read 2214708) |
| 2026-06-30 18:21 | 세션종료 | Bash×20, Edit×14, Read×13, Write×2 | 1012880/151609 | 1h31m | — | (자동) | (자동 기록 · cache_read 13030478) |
