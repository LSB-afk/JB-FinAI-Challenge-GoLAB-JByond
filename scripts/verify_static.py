#!/usr/bin/env python3
"""JB LocalGuard OS 프로토타입 정적 검증 (standalone).

원본 워크스페이스의 verify_static.py에서 앱/문서 계약만 이식했다.
- 필수 파일 존재
- 핵심 문자열(needle) 계약: 화면 라벨·함수 계약·guardrail 문구
- JB우리캐피탈 전용 레이어의 금지 패턴 부재
- 모든 app/*.js 문법 검사(node --check)
"""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

app_js_files = [
    "app.js",
    "modules.js",
    "jbWooriCapitalSidebar.config.js",
    "jbWooriCapitalAgents.registry.js",
    "wooricap-db.js",
    "jbWooriCapitalServices.js",
    "wooricap.helpers.js",
    "wooricap.view.board.js",
    "wooricap.view.cases.js",
    "wooricap.view.wizard.js",
    "wooricap.view.harness.js",
    "wooricap.sidebar.js",
    "wooricap.js",
]

required = [
    ROOT / "package.json",
    ROOT / "README.md",
    ROOT / "playwright.config.js",
    ROOT / "app/index.html",
    ROOT / "app/styles.css",
    ROOT / "app/wooricap.css",
    ROOT / "docs/01-시스템-아키텍처.md",
    ROOT / "docs/02-은행-DB-연동-설계.md",
    ROOT / "docs/03-JB우리캐피탈-하네스.md",
    ROOT / "tests/e2e/localguard.spec.js",
    ROOT / "tests/e2e/wooricap.spec.js",
] + [ROOT / "app" / name for name in app_js_files]

missing = [path for path in required if not path.exists()]
if missing:
    raise SystemExit("Missing files:\n" + "\n".join(str(path) for path in missing))

package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
required_scripts = {
    "dev": "python3 -m http.server 8000 --directory app",
    "build": "python3 scripts/verify_static.py",
    "test": "python3 scripts/verify_static.py",
    "test:e2e": "playwright test",
}
for name, command in required_scripts.items():
    if package.get("scripts", {}).get(name) != command:
        raise SystemExit(f"package.json script {name!r} should be {command!r}")

html = (ROOT / "app/index.html").read_text(encoding="utf-8")
css = (ROOT / "app/styles.css").read_text(encoding="utf-8")
js = (ROOT / "app/app.js").read_text(encoding="utf-8")

html_needles = [
    "org-rail",
    "nav-list",
    "page-content",
    "context-panel",
    "./wooricap-db.js",
    "./jbWooriCapitalSidebar.config.js",
    "./jbWooriCapitalAgents.registry.js",
    "./jbWooriCapitalServices.js",
    "./wooricap.helpers.js",
    "./wooricap.view.board.js",
    "./wooricap.view.cases.js",
    "./wooricap.view.wizard.js",
    "./wooricap.view.harness.js",
    "./wooricap.sidebar.js",
    "./wooricap.js",
    "./app.js",
]
for needle in html_needles:
    if needle not in html:
        raise SystemExit(f"HTML missing {needle!r}")

js_needles = [
    "computeRiskDecision",
    "buildDashboardData",
    "auditChainRecords",
    "moveCaseToColumn",
    "demoProfiles",
    "손은 놓고, 눈만",
    "liveAgentIds",
    "agentExecutionBadge",
    "그룹 확장성",
    "전세 안심 점검 · 로드맵",
    "GP-1 소상공인 자금압박",
    "GP-2 보이스피싱 차단",
]
for needle in js_needles:
    if needle not in js:
        raise SystemExit(f"JS missing {needle!r}")

wooricap_needles = [
    "JBWC_AFFILIATE_ID",
    "getJbWooriCapitalSidebarCounts",
    "affiliateId scope is required",
    "searchJbWooriCapitalRecordsAsync",
    "createJbWooriCapitalOpsCase",
    "recordJbWooriCapitalAgentRun",
    "jbWooriCapitalOpsHarness",
    "routeJbWooriCapitalCase",
    "/jb-woori-capital/cases/new",
    "JB우리캐피탈 운영지원 포털",
    "신규 JB우리캐피탈 운영 건 접수",
    "FDS & Voice Phishing Response Agent",
    "실제 대출 승인/거절",
    "내부 운영 참고용",
    "jbwcRepository",
    "JBWC_STATUS_LABELS",
    "JBWC_FIELD_LABELS",
    "jbwcViewRenderers",
    "그룹 확장성 증명",
]
joined_wooricap = "\n".join(
    (ROOT / "app" / name).read_text(encoding="utf-8")
    for name in app_js_files
    if name not in ("app.js", "modules.js")
)
for needle in wooricap_needles:
    if needle not in joined_wooricap:
        raise SystemExit(f"JB우리캐피탈 implementation missing {needle!r}")

for forbidden in ["전세 안심 점검", "jbWooriCapitalDashboardConfig", "roleDashboardPage(jbWooriCapital"]:
    if forbidden in joined_wooricap:
        raise SystemExit(f"JB우리캐피탈 dedicated layer should not contain {forbidden!r}")

if "border-radius: 8px" not in css:
    raise SystemExit("CSS should keep cards and controls at 8px radius")
if "Pretendard" not in css:
    raise SystemExit("CSS should use Pretendard as the primary font")

for script in app_js_files:
    node_check = subprocess.run(
        ["node", "--check", str(ROOT / "app" / script)],
        text=True,
        capture_output=True,
        check=False,
    )
    if node_check.returncode != 0:
        raise SystemExit(node_check.stderr or node_check.stdout)

print("static verification passed")
print(f"checked files: {len(required)}")
