# Repository Guidelines

## Project Structure & Module Organization

This repository is a JB LocalGuard OS competition workspace: mostly Korean Markdown documentation plus a small static MVP app.

- `02_제품/app/`: runnable vanilla HTML/CSS/JS MVP (`index.html`, `styles.css`, `app.js`, `modules.js`).
- `02_제품/tests/e2e/`: Playwright end-to-end tests.
- `02_제품/scripts/`: verification and utility scripts, including `verify_static.py`.
- `02_제품/자산/`: screenshots, diagrams, and demo assets.
- `00_제출/`: proposal, function spec, presentation, and final submission artifacts.
- `01_전략/` through `07_원천/`: strategy, product docs, agents, architecture, research, evidence, and source materials.
- `08_본선/`: separate finals workspace with its own plans, logs, agents, memory, and submission materials.
- `_canon.md` is the single source of truth for product facts, names, statistics, and citations.

## Build, Test, and Development Commands

```bash
npm install
npm run dev
npm run test
npm run test:e2e
```

- `npm run dev`: serves `02_제품/app` on `http://127.0.0.1:8000/index.html`.
- `npm run test`: runs the static verification contract in `02_제품/scripts/verify_static.py`.
- `npm run test:e2e`: runs Playwright tests; the config starts a local server on port `8010`.

Demo modes: `?demo=sme`, `?demo=jeonse`, and `?demo=phishing`.

## Coding Style & Naming Conventions

Match the existing vanilla-JS style. Do not introduce a framework, bundler, TypeScript, JSX, or backend unless the task explicitly requires it. Keep scripts browser-compatible and loaded by plain `<script>` tags. Preserve Korean filenames and visible labels; many are referenced by tests, Markdown links, and `verify_static.py`.

Use concise comments only for non-obvious logic. CSS should preserve the current dense console style, Pretendard font usage, and 8px card/control radius.

## Testing Guidelines

Run `npm run test` after any app, documentation, or path change. This check is string-sensitive and may fail if required labels, filenames, scripts, or documented terms change. Run `npm run test:e2e` for UI, routing, layout, approval-flow, localStorage, or responsive changes.

Name new Playwright tests by user-visible behavior, for example: `test("approval queue can approve a pending action", ...)`.

## Commit & Pull Request Guidelines

Recent commits use scoped Conventional Commit style, often with Korean scope text, for example:

- `docs(본선): ...`
- `chore(plugins): ...`
- `feat(본선): ...`

Use the same pattern: `<type>(<scope>): <short summary>`. For PRs, include the purpose, touched directories, test results, screenshots for UI changes, and any affected submission or canon documents.

## Security & Configuration Tips

Do not publish raw source emails, private finals materials, demo videos, or customer-like PII. For factual claims, update or cite `_canon.md` rather than inventing new wording.
