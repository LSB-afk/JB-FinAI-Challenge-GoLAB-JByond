# 자산

앱, 스크립트, 참고 자료를 빠르게 찾기 위한 자산 인덱스입니다.

## 이 폴더의 역할

이 폴더는 저장소 안에서 실제로 실행하거나 재사용할 수 있는 자산을 찾기 위한 색인입니다. 제출 문서 자체보다 앱 파일, 검증 스크립트, 원천 자료 위치를 빠르게 안내합니다.

## 실행 자산

- [정적 앱 HTML](../app/index.html)
- [앱 로직](../app/app.js)
- [앱 스타일](../app/styles.css)
- [앱 README](../app/README.md)
- [정적 검증 스크립트](../scripts/verify_static.py)
- [스크립트 README](../scripts/README.md)

## 원천 자료

- [PDF 정독 노트](../../07_원천/pdf-read.md)
- [DAKER 페이지 정독 노트](../../07_원천/daker-page-line-read.md)
- [출처 인덱스](../../06_증빙/source-index.md)

## 설계 자산

- [PRD](../prd.md)
- [기능 명세](../function-spec.md)
- [Agent 시스템](../../03_에이전트/agent-system.md)
- [Skill Registry](../../03_에이전트/skill-registry.md)
- [아키텍처 다이어그램](../../04_아키텍처/README.md)

## 사용 방법

```bash
cd ../app
python3 -m http.server 8000
```

```bash
cd ..
python3 scripts/verify_static.py
```

## 다음 보강 방향

- 발표용 이미지, 화면 캡처, 데모 녹화 파일이 생기면 이 폴더에서 링크합니다.
- 외부 API 스키마나 mock 데이터 파일이 생기면 실행 자산으로 추가합니다.
