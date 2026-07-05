#!/usr/bin/env bash
# deploy-public-demo.sh — AI(Claude/Codex)가 사람 개입 없이 실행·자가검증하는 정적 공개데모 배포기.
#
# 핵심 설계: 대화형 로그인 금지. 이미 인증된 `gh` CLI만 사용(토큰/브라우저 OAuth 불필요).
# 대상: 02_제품/app 의 vanilla-JS 앱 → GitHub Pages(gh-pages 브랜치) → 공개 URL.
# 자가검증: 배포 후 URL을 폴링해 index.html의 로드베어링 문자열이 실제로 서빙되는지 확인.
#
# 사용:
#   bash deploy-public-demo.sh --check    # 프리플라이트만(읽기전용, 배포 안 함)
#   bash deploy-public-demo.sh            # 실제 배포 + 검증
#
# 환경변수(선택 오버라이드):
#   OWNER/REPO  기본값 = 현재 저장소(gh repo view). Pages 활성화엔 admin 권한 필요 →
#               admin 아니면 본인 fork로 OWNER=<you> REPO=<repo> 지정.
#   APP_DIR     기본값 = <repo루트>/02_제품/app
set -euo pipefail

NEEDLE="JB 금융안전 업무지원"   # index.html <title> — 배포가 실제로 살아있는지 확인하는 검증 문자열
REPO_ROOT="$(git rev-parse --show-toplevel)"
APP_DIR="${APP_DIR:-$REPO_ROOT/02_제품/app}"

# OWNER/REPO 미지정 시 현재 저장소에서 유도
if [[ -z "${OWNER:-}" || -z "${REPO:-}" ]]; then
  nwo="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
  OWNER="${OWNER:-${nwo%%/*}}"
  REPO="${REPO:-${nwo##*/}}"
fi
OWNER_LC="$(printf '%s' "$OWNER" | tr '[:upper:]' '[:lower:]')"
URL="https://${OWNER_LC}.github.io/${REPO}/"

preflight() {
  echo "== preflight =="
  for c in gh git curl; do command -v "$c" >/dev/null || { echo "MISSING: $c" >&2; return 1; }; done
  gh auth status >/dev/null 2>&1 || { echo "gh not authenticated → run: gh auth login" >&2; return 1; }
  [[ -f "$APP_DIR/index.html" ]] || { echo "app not found: $APP_DIR/index.html" >&2; return 1; }
  grep -q "$NEEDLE" "$APP_DIR/index.html" || { echo "needle '$NEEDLE' absent from index.html — update NEEDLE" >&2; return 1; }
  local admin
  admin="$(gh api "repos/$OWNER/$REPO" --jq '.permissions.admin' 2>/dev/null || echo false)"
  echo "repo=$OWNER/$REPO  admin=$admin  app=$APP_DIR"
  echo "target URL=$URL"
  if [[ "$admin" != "true" ]]; then
    echo "WARN: no admin on $OWNER/$REPO → cannot enable Pages. Set OWNER=<your-fork-owner> and retry." >&2
    return 2
  fi
  echo "preflight OK"
}

deploy() {
  # gh-pages 브랜치를 앱 폴더 내용만으로 구성(전체 볼트가 아니라 앱만 서빙) → force push.
  # ponytail: subtree split 대신 temp orphan 브랜치 복사 — 대용량 볼트에서 더 빠르고 단순.
  local tmp; tmp="$(mktemp -d)"
  cp -R "$APP_DIR"/. "$tmp"/
  : > "$tmp/.nojekyll"   # Jekyll 처리 비활성화(정적 그대로 서빙)
  git -C "$tmp" init -q
  git -C "$tmp" checkout -q -b gh-pages
  git -C "$tmp" add -A
  git -C "$tmp" -c user.email=deploy@localguard -c user.name=deploy commit -qm "deploy public demo"
  git -C "$tmp" push -q -f "https://github.com/$OWNER/$REPO.git" gh-pages   # gh credential helper가 https 인증 처리
  rm -rf "$tmp"

  # Pages 소스 = gh-pages / 루트. 이미 있으면 PUT, 없으면 POST(멱등).
  if gh api "repos/$OWNER/$REPO/pages" >/dev/null 2>&1; then
    gh api -X PUT "repos/$OWNER/$REPO/pages" -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null
  else
    gh api -X POST "repos/$OWNER/$REPO/pages" -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null
  fi
}

verify() {
  echo "== verify (Pages 초기 빌드 대기, 최대 ~5분) =="
  for _ in $(seq 1 30); do
    if curl -sfL "$URL" | grep -q "$NEEDLE"; then
      echo "LIVE ✓  $URL"
      return 0
    fi
    sleep 10
  done
  echo "verify timeout — Pages가 아직 빌드 중이거나 실패. 수동 확인: $URL" >&2
  return 1
}

case "${1:-}" in
  --check) preflight ;;
  "") preflight && deploy && verify ;;
  *) echo "usage: $0 [--check]" >&2; exit 2 ;;
esac
