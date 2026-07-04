# Design Notes

## Evidence Reviewed

- `app/HARNESS_GUIDE.md`: role harnesses may share `jbwc-*` presentation classes, but business logic and route state must stay role-specific.
- `app/ROLE_HARNESS_CONTRACT.md`: `jeonse-protection` is the baseline role harness and must not inherit RM business behavior.
- `docs/04-전세보호-역할-하네스.md`: the 전세보호 role may suggest risk signals and checklist items only; fraud/legal/guarantee/victim decisions remain human-owned.
- `docs/05-RM-하네스.md`: RM board/SUB/keyboard/deliverable patterns are a UX reference, not a domain model to copy.
- Current implementation under `app/jeonseProtection*.js`: lifecycle board, case detail, wizard, harness registry, mock DB, and static tests already exist.

## Product Frame

전세사기 보호 하네스는 "실제 업무 실행 콘솔"처럼 보여야 한다. The top layer is a priority intake board for selecting a case. The lower layer is the selected case execution queue: evidence checks, agent runs, human approval, deliverables, and audit records.

The right properties panel is a context panel. It must summarize the currently selected case, agent, capability, or view. It should not be a fixed harness-stat panel unless no selection exists.

## Domain Rules

- AI output is always an internal operating aid.
- The UI must say "위험 신호", "확인 후보", "안내 초안", or "담당자 검토" instead of declaring fraud, legal conclusions, guarantee eligibility, or victim status.
- Customer-facing text requires pending approval.
- File upload stores metadata and analysis summaries only in the mock harness; no raw PII or original document body is persisted.
- High/critical risk and urgent auction flows must stay open for human review.

## Interaction Rules

- Number keys select priority board cases.
- Arrow keys move case or execution-node focus.
- `Enter` runs the focused 전세보호 queue node and shows a dimmed loading state.
- `Space` advances to the next queue step.
- Key hints are secondary UI; a transient key overlay shows the latest input during recording.
- Board selection should keep the user on the board route so the SUB queue remains visible. Dedicated case detail routes remain available under `/cases/:id`.

## Layout Rules

- Case detail headers use a compact meta line, title, customer/region/bank/domain summary, situation sentence, goal/risk/evidence cards, and a status segmented control.
- Cards follow: title + status, one-line summary, input/output or customer/work summary, domain/risk/human action footer.
- Sparse lists are padded with useful context: next actions, related agents, deliverables, and audit snippets.
- The right panel can be resized and must remain readable at narrow and wide desktop widths.

## Verification Targets

- Board top layer and SUB execution layer are visually separated.
- Case selection, `Enter`, `Space`, and arrow keys update selection/focus and scroll into view.
- Running nodes show a softer dim overlay with progress text.
- The right context panel changes with the selected case/capability/agent.
- New intake accepts file metadata and creates evidence/audit records.
- Agent execution creates markdown-like deliverables and audit entries without making prohibited final decisions.
