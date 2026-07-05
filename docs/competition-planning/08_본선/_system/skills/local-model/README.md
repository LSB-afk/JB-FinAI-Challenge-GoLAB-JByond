# local-model 사용 예시

전체 원칙·언제 쓰는지는 [[SKILL]] 참조. 여기는 바로 붙여 쓰는 명령 모음.

## 0) 최초 1회 설정 (멱등 — 재실행해도 안전)

```bash
bash 08_본선/_system/skills/local-model/setup.sh
```

내부에서 하는 일: `ollama` 설치 확인(없으면 `brew install ollama`) → 서버 기동 확인 →
`exaone3.5:7.8b`(데모 히어로) · `qwen2.5:7b`(상업 배포 백업) pull.

## 1) 기본 추론 (데모 히어로 EXAONE)

```bash
node 08_본선/_system/skills/local-model/run.mjs "전북 전주 중앙로 카페 사장님의 매출 둔화 신호를 3줄로 요약해줘"
```

## 2) 상업 배포 백업 모델로 확인

```bash
node 08_본선/_system/skills/local-model/run.mjs "이 상담 메모에서 위험 신호만 뽑아줘" --model qwen
node 08_본선/_system/skills/local-model/run.mjs "..." --model qwen14b   # 품질 백업(더 무거움)
```

## 3) PII 섞인 텍스트를 외부로 보내지 않고 처리

```bash
echo "고객 홍길동, 010-1234-5678, 전세보증금 관련 문의 요약해줘" \
  | node 08_본선/_system/skills/local-model/run.mjs --model qwen
```

이 호출은 `http://127.0.0.1:11434`(로컬 Ollama)로만 나간다. 인터넷/외부 API 호출 없음.

## 4) 아직 모델을 안 받았을 때 (실패 메시지 예시)

```
$ node run.mjs "test" --model exaone
[local-model] 로컬 추론 중 (exaone3.5:7.8b @ http://127.0.0.1:11434) — 외부 API 미호출
[local-model] 모델 "exaone3.5:7.8b"이 아직 없습니다. pull 필요:
  ollama pull exaone3.5:7.8b
  또는: bash 08_본선/_system/skills/local-model/setup.sh
```

setup.sh를 돌리기 전에는 정상적인 안내이며, 스크립트 자체는 이미 완성 상태다.
