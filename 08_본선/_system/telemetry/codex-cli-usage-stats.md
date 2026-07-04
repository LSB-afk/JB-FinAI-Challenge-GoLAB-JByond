---
tags:
  - area/system
  - type/stats
  - status/active
date: 2026-07-03
up: "[[_HARNESS-SYSTEM]]"
---
# Codex CLI 사용 통계 (파생 백필)

> 로컬 Codex state DB에서 `cwd`가 현재 프로젝트인 thread만 추출한 파생 통계. 원본 DB·전체 대화 원문은 커밋하지 않는다.
> 마지막 생성: 2026-07-03T18:19:49Z

## 전체
- 프로젝트: `/Users/river/project/active/JBproject`
- 원천: `/Users/river/.codex/state_5.sqlite`
- Codex thread: **144**
- Codex tokens_used: **121,993,380**

## 모델/effort별
| model | threads | tokens_used |
|-------|---------|-------------|
| openai/gpt-5.5/high | 116 | 109,317,931 |
| openai/gpt-5.4/xhigh | 6 | 10,568,768 |
| openai/gpt-5.5/medium | 3 | 1,010,297 |
| openai/gpt-5.3-codex-spark/high | 4 | 644,114 |
| openai/gpt-5.5/xhigh | 3 | 435,243 |
| openai/gpt-5.5/low | 1 | 17,027 |
| openai/gpt-5-codex/minimal | 1 | 0 |
| openai/gpt-5.3-codex-spark/minimal | 2 | 0 |
| openai/gpt-5.3-codex/minimal | 1 | 0 |
| openai/gpt-5.3/minimal | 1 | 0 |
| openai/unknown/unknown | 6 | 0 |

## 일자별
| updated day (UTC) | threads | tokens_used |
|-------------------|---------|-------------|
| 2026-07-03 | 29 | 77,647,044 |
| 2026-06-30 | 46 | 24,847,910 |
| 2026-07-02 | 53 | 16,428,049 |
| 2026-07-01 | 3 | 2,426,263 |
| 2026-06-27 | 12 | 364,800 |
| 2026-06-29 | 1 | 279,314 |

## 브랜치별
| branch | threads | tokens_used |
|--------|---------|-------------|
| ui-density-improvements | 144 | 121,993,380 |

## 상위 thread (토큰 기준)
| updated | thread | model | effort | tokens_used | prompt excerpt |
|---------|--------|-------|--------|-------------|----------------|
| 2026-07-03T10:28:58Z | `019f190b` | gpt-5.5 | high | 50,884,065 | 어제 무슨 일을 했지? 우리가 |
| 2026-07-03T18:19:49Z | `019f2622` | gpt-5.5 | high | 12,266,116 | 너는 JB 본선 프로젝트(/Users/river/project/active/JBproject, 볼트 08_본선/)의 로그·통계·로우데이터 관리 전담 에이전트다. 시작 시 반드시 `node 08_본선/_system/s |
| 2026-07-03T16:45:57Z | `019f28d9` | gpt-5.4 | xhigh | 3,878,512 | 당신은 긴 금융 AI 리서치 보고서들을 팀에 브리핑하는 한국어 전문가입니다. 지금 작업 폴더에서 아래 "처리할 코드" 각각에 대해 요약본 파일을 만드세요. 한 코드씩 끝까지 처리합니다. [각 코드 C 처리 절차] 1 |
| 2026-06-30T23:38:12Z | `019f1ae2` | gpt-5.5 | high | 3,492,688 | <task> Read these files from /Users/river/project/active/JBproject/ in order, then produce Wave2 canvas blocks for JB Lo |
| 2026-06-30T17:03:32Z | `019f1974` | gpt-5.5 | high | 2,861,840 | <task> Write and execute an idempotent Node.js script at `08_본선/_system/automation/backfill-frontmatter.mjs` that fixes |
| 2026-07-03T16:44:44Z | `019f28d9` | gpt-5.4 | xhigh | 2,720,771 | 당신은 긴 금융 AI 리서치 보고서들을 팀에 브리핑하는 한국어 전문가입니다. 지금 작업 폴더에서 아래 "처리할 코드" 각각에 대해 요약본 파일을 만드세요. 한 코드씩 끝까지 처리합니다. [각 코드 C 처리 절차] 1 |
| 2026-06-30T18:45:50Z | `019f19d3` | gpt-5.5 | high | 2,179,201 | <task> Read-only source-grounded teardown of the paperclip app at /Users/river/Downloads/archives/paperclip-master/. Do |
| 2026-07-02T19:09:47Z | `019f2438` | gpt-5.5 | high | 2,175,976 | <task> JB금융 본선 프로젝트 운영 SSoT 정합 + 공식 규칙 전파 완결성 진단 및 안전 갱신. 작업 루트: /Users/river/project/active/JBproject 오늘: 2026-07-03. 본 |
| 2026-07-03T16:43:30Z | `019f28d9` | gpt-5.4 | xhigh | 1,948,654 | 당신은 긴 금융 AI 리서치 보고서들을 팀에 브리핑하는 한국어 전문가입니다. 지금 작업 폴더에서 아래 "처리할 코드" 각각에 대해 요약본 파일을 만드세요. 한 코드씩 끝까지 처리합니다. [각 코드 C 처리 절차] 1 |
| 2026-07-01T17:18:56Z | `019f1ead` | gpt-5.5 | high | 1,947,002 | <task> You are working ONLY inside /Users/river/Downloads/archives/paperclip-jb-fork/ (an isolated MIT fork of paperclip |
| 2026-07-03T16:44:38Z | `019f28d9` | gpt-5.4 | xhigh | 1,863,366 | 당신은 긴 금융 AI 리서치 보고서들을 팀에 브리핑하는 한국어 전문가입니다. 지금 작업 폴더에서 아래 "처리할 코드" 각각에 대해 요약본 파일을 만드세요. 한 코드씩 끝까지 처리합니다. [각 코드 C 처리 절차] 1 |
| 2026-06-30T16:49:24Z | `019f1967` | gpt-5.5 | high | 1,852,465 | <task> Perform a read-only precision audit of the Obsidian vault at /Users/river/project/active/JBproject. Target: all 0 |
| 2026-07-02T02:50:27Z | `019f20b7` | gpt-5.5 | high | 1,703,360 | <task> Read-only exploration of an isolated paperclip fork at /Users/river/Downloads/archives/paperclip-jb-fork/ and pro |
| 2026-06-30T23:31:52Z | `019f1adb` | gpt-5.5 | high | 1,640,806 | <task> Read the following source files in /Users/river/project/active/JBproject/ and create ONE new file: SOURCE FILES T |
| 2026-07-02T07:46:48Z | `019f21c3` | gpt-5.5 | high | 1,636,507 | <task> Generate TypeScript seed-data modules for a JB금융 지역은행 RM 케이스 운영 콘솔 (React app). STAGING: Write ALL output files t |
| 2026-07-02T19:08:40Z | `019f2437` | gpt-5.5 | high | 1,274,949 | <task> Working directory: /Users/river/project/active/JBproject Vault root: 08_본선/ Today: 2026-07-03 Run a link/MOC/fron |
| 2026-06-30T18:31:50Z | `019f19c6` | gpt-5.5 | high | 1,203,478 | <task> 오프라인 적대검증(adversarial cross-verification) 수행. 웹/네트워크 검색 절대 금지. 로컬 .md 파일만 읽는다. 입력 경로(읽기 전용): - 결과 디렉토리: /Users/ri |
| 2026-06-30T23:29:41Z | `019f1adb` | gpt-5.5 | high | 925,233 | <task> Read the following files in /Users/river/project/active/JBproject/ and produce the 4-block canvas cell content as |
| 2026-07-02T02:51:25Z | `019f20b7` | gpt-5.5 | high | 902,183 | <task> Work ONLY in /Users/river/Downloads/archives/paperclip-jb-fork/. Never touch /Users/river/project/active/JBprojec |
| 2026-07-03T06:09:47Z | `019f2692` | gpt-5.5 | high | 870,576 | 작업 디렉토리: /Users/river/project/active/JBproject (Obsidian 볼트 + 정적 웹앱 저장소). git 커밋/git add 금지 — 파일만 작성. ## 목표 `08_본선/_syst |

## 해석 주의
- `tokens_used`는 Codex가 제공하는 thread 총량이며 입력/출력 분리값이 아니다.
- Claude `ai-session-intake.csv`의 `engine=codex, agent=via-claude` 행은 위임 횟수 가시화용이다. 이 파일의 Codex CLI 총량과 중복 합산하지 않는다.
- `first_user_message_excerpt`는 작업 식별용 120자 이하 마스킹 발췌만 저장한다. 원문 전체가 필요하면 로컬 Codex DB/히스토리를 별도 승인 후 확인한다.

---
[[08_본선/04_증빙/02_분석자료/리서치/리서치-인덱스|리서치 인덱스]] · [[ai-usage-stats]] · [[registry-cli]] · [[registry-plugins]]
