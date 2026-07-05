---
name: visualization-cycle
description: Plan-first Excalidraw visualization workflow for the JB finals vault. Use when creating, updating, validating, indexing, or regenerating visualizations from VISUALIZATION-PLAN.md, ledger CSVs, PROGRESS, telemetry, team roles, AI/tool registries, demo storyboard documents, workflow gap audits, or presentation-readability checks.
---

# visualization-cycle

Use this skill whenever a user asks to create, update, audit, regenerate, or improve Excalidraw visualizations in the JB finals workspace.

## Required workflow

1. Read `08_본선/_system/visualizations/VISUALIZATION-PLAN.md` first.
2. If the requested board or update is not in the plan, update the plan before generating Excalidraw.
3. Read only the relevant sources listed in the plan: ledgers, `PROGRESS.md`, `PLAN.md`, telemetry, agent registry, tool registry, or demo scripts.
4. Update source ledgers before drawing when the change introduces new people, roles, tools, phases, or contribution weights.
5. Run the generator:

```bash
node 08_본선/_system/automation/viz-generator.mjs
```

6. Validate generated files:

```bash
node 08_본선/_system/skills/visualization-cycle/scripts/run.mjs
```

7. For workflow/timeline boards, compare against `workflow-gantt-flow-gap-audit.md` if it exists. Do not create a separate `workflow-gap-audit` skill unless this cycle cannot cover the audit reliably.
8. Apply the visual brief check: within 5 seconds, the board should expose the core message, source/evidence, owner/next action, and any people/AI/contribution layer that the plan promises.
9. Update `08_본선/_system/visualizations/_viz-index.md` if a board was added, removed, or semantically changed.
10. Append the user prompt to `08_본선/04_증빙/01_핵심로그/프롬프트-로그.md`.

## Non-negotiable rules

- Do not create orphan `.excalidraw` files. Every board must appear in both `VISUALIZATION-PLAN.md` and `_viz-index.md`.
- Do not hide uncertainty. Use `TBD`, `estimate`, or `mixed` on the board when data is incomplete.
- Keep people contribution and AI support visually separate.
- Every new board must contain a metadata box with `Source`, `Last generated`, `Data quality`, `Next`, and `Owner`.
- Prefer updating ledger CSVs over hardcoding new contribution, phase, or tool data into `viz-generator.mjs`.
- Do not manually edit generated `.excalidraw` JSON unless the generator cannot express the needed shape.
- Treat `visual-brief-audit` as part of this skill, not a new skill: title, message, evidence/source, owner/next, uncertainty, and role layers must be visible.
- Treat `workflow-gap-audit` as this skill's validation extension while the audit remains centered on visualization/plan alignment.

## Update triggers

Run this skill when any of these change:

- `PROGRESS.md` or `PLAN.md`
- `contribution-ledger.csv`
- `phase-ledger.csv`
- `tool-usage-ledger.csv`
- `_agent-registry.md`
- `_team-roster.md`
- `ai-session-intake.csv`
- 시연 시나리오 or 발표 스크립트
- 심사기준·제출 체크리스트 mapping
- `workflow-gantt-flow-gap-audit.md`
- presentation-readability or "있어빌리티" feedback

## Output expectation

End with:

```text
1. Plan touched:
2. Sources read:
3. Boards generated:
4. Validation:
5. Remaining TBD/estimate:
```
