# scripts

JB LocalGuard OS 저장소의 검증 스크립트를 보관합니다.

## 현재 스크립트

| 파일 | 역할 |
| --- | --- |
| `verify_static.py` | 정적 앱과 필수 문서/문구/구조가 존재하는지 확인 |

## 실행 방법

저장소 루트에서 실행합니다.

```bash
python3 scripts/verify_static.py
```

## 검증 목적

- `app/index.html`, `app/app.js`, `app/styles.css`가 존재하는지 확인
- 주요 제품 문구와 Agent/Skill 구조가 누락되지 않았는지 확인
- 제출용 문서 구조가 유지되는지 확인
- GitHub 제출 전 기본 정적 품질을 빠르게 확인

## 다음 보강 방향

- 브라우저 기반 클릭 테스트 스크립트 추가
- Mermaid 문법 검증 추가
- 링크 유효성 검사 추가
- 제출 전 필수 폴더/README 존재 여부 검사 추가
