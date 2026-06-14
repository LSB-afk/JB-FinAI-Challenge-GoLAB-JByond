# app

JB LocalGuard OS의 실행 가능한 정적 MVP 앱입니다.

## 실행 방법

```bash
cd app
python3 -m http.server 8000
```

브라우저에서 `http://127.0.0.1:8000/index.html`을 엽니다.

## 파일 역할

| 파일 | 역할 |
| --- | --- |
| `index.html` | 앱 엔트리와 4-zone shell 구조 |
| `styles.css` | HagentOS 기반 레이아웃, Pretendard 폰트, 그룹/패널/카드 스타일 |
| `app.js` | Case, Agent, Skill, Evidence, Approval, Audit 데모 데이터와 화면 렌더링 |

## 화면 구성

- 대시보드: 케이스 상태와 운영 지표
- 알림함: 승인 대기/차단/긴급 알림
- 케이스: 고객/사업자/전세 위험 케이스
- 승인: RM/준법 승인과 반려
- 실행 이력: AgentRun 로그
- 전세 보호: 전세사기 위험 신호와 은행 연계 흐름
- 에이전트 팀: 업무 범주별 AI Agent 분류
- 조직도: 사람 승인자와 AI Agent 보고 체계
- 스킬: Agent에 장착되는 기능 단위
- 활동 이력/비용/설정: 운영 관리 영역

## 현재 동작

- 카드 클릭 시 오른쪽 상세 패널 갱신
- 상세 패널 on/off
- 상세 패널 항목 접기/펼치기
- AgentRun 실행 후 로그와 상태 갱신
- 승인/반려 후 Case status와 Audit 갱신
- 에이전트/스킬/기능 연결 상세 확인

## 검증

```bash
cd ..
python3 scripts/verify_static.py
```

추가 브라우저 검증 권장 항목:

- 1920x1080에서 가로 넘침이 없는지 확인
- 에이전트 팀 분류 5개가 보이는지 확인
- 상세 패널 접기/펼치기가 실제로 본문을 숨기는지 확인
- 콘솔 오류가 없는지 확인
