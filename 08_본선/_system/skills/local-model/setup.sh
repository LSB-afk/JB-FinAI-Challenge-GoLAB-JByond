#!/usr/bin/env bash
# setup.sh — Ollama 설치 확인 + 로컬모델 pull.
# 히어로: EXAONE 3.5 7.8B(데모 전용, 비상업 라이선스) / 백업: Qwen2.5 7B(상업 배포 권고 1순위)
# 근거: 08_본선/03_제품/00_결정-준비/설계/로컬모델-컴퓨팅-TCO-모델링.md
#
# 멱등: brew install / ollama pull 모두 이미 설치·다운로드된 것은 건너뛴다. 몇 번 다시 돌려도 안전.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v ollama &>/dev/null; then
  echo "[local-model] ollama가 설치되어 있지 않습니다."
  if command -v brew &>/dev/null; then
    echo "[local-model] brew install ollama 실행..."
    brew install ollama
  else
    echo "[local-model] Homebrew가 없습니다. 수동 설치 안내: https://ollama.com/download" >&2
    exit 1
  fi
else
  echo "[local-model] ollama 설치 확인됨 ($(command -v ollama))."
fi

if ! curl -fsS -o /dev/null "http://127.0.0.1:11434/api/tags" 2>/dev/null; then
  echo "[local-model] ollama 서버가 응답하지 않습니다. 백그라운드로 기동합니다..."
  nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
  for _ in 1 2 3 4 5; do
    sleep 1
    curl -fsS -o /dev/null "http://127.0.0.1:11434/api/tags" 2>/dev/null && break
  done
fi

echo "[local-model] EXAONE 3.5 7.8B(데모 히어로) pull..."
ollama pull exaone3.5:7.8b

echo "[local-model] Qwen2.5 7B(상업 배포 백업) pull..."
ollama pull qwen2.5:7b

echo "[local-model] 완료. 테스트:"
echo "  node ${SCRIPT_DIR}/run.mjs \"안녕하세요\" --model exaone"
