# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-07-05
- Primary product surfaces: JB 금융안전 업무지원 포털, 역할별 RM/전세사기 보호/기업여신/FDS 하네스, 오른쪽 context panel, 역할 rail menu.
- Evidence reviewed:
  - `app/HARNESS_GUIDE.md`: role harnesses may share presentation classes, but business logic and route state must stay role-specific.
  - `app/ROLE_HARNESS_CONTRACT.md`: `jeonse-protection` is the baseline role harness and must not inherit RM business behavior.
  - `docs/04-전세보호-역할-하네스.md`: 전세보호 role may suggest risk signals and checklist items only; fraud/legal/guarantee/victim decisions remain human-owned.
  - `docs/05-RM-하네스.md`: RM board/SUB/keyboard/deliverable patterns are a UX reference, not a domain model to copy.
  - `app/app.js`: global shell, role rail, dashboard, context panel, and route switching.
  - `app/jeonseProtection*.js`: lifecycle board, case detail, wizard, harness registry, mock DB, and static tests.

## Brand
- Personality: restrained financial operations console, not a marketing page.
- Trust signals: clear scope, human approval, audit logs, role-bound data, source labels, stable keyboard behavior.
- Avoid: empty gray screens, decorative animation, fraud/legal final declarations, role screens that look like copied templates.

## Product goals
- Goals:
  - Make the first role click visibly explain "role selection -> permission activation -> data connection -> work console ready".
  - Make RM, 전세사기 보호, 기업여신, and FDS roles feel like separate work contexts under a GM/Admin account.
  - Keep role harness actions usable after the animation settles.
- Non-goals:
  - Do not simulate external production access or real document ingestion.
  - Do not make AI outputs appear to be legal, fraud, guarantee, victim, or credit final decisions.
- Success signals:
  - The dashboard is not blank before a role is selected.
  - Role click shows a staged activation sequence within about 1.4 seconds.
  - The right context panel changes with the selected role and then with the destination harness.

## Personas and jobs
- Primary personas: hackathon judges, GM/Admin demo operator, RM, 전세사기 보호 담당자, 기업여신 담당자, FDS/준법 담당자.
- User jobs:
  - Understand the platform hierarchy quickly.
  - Select a role and see the corresponding work console become active.
  - Inspect priority cases, context, agent queue, deliverables, and audit trail.
- Key contexts of use: desktop demo, screen recording, role-based walkthrough, keyboard-driven operation.

## Information architecture
- Primary navigation: left rail group menu -> role selection -> role-specific harness route.
- Core routes/screens:
  - `/index.html` dashboard with locked workspace preview.
  - `#/roles/rm-officer/board`
  - `#/roles/jeonse-protection/board`
  - `#/roles/corporate-credit/board`
  - `#fds-dashboard`
- Content hierarchy:
  - GM/Admin activation state first.
  - Selected role identity and permission scope.
  - Work board, context panel, and execution queue.

## Design principles
- Principle 1: Activation, not denial. Lock visuals mean "waiting for a role", not "access blocked".
- Principle 2: Role context changes must be visible. Do not simply route to another page with no transition.
- Principle 3: Motion should explain sequence. Use stagger, blur release, skeleton replacement, and short status steps.
- Tradeoffs: The animation should be noticeable for judges but short enough that tests and daily use do not feel delayed.

## Visual language
- Color: JB blue as the primary activation color, green for connected/ready, amber for review/permission checks, red only for risk/control labels.
- Typography: dense operations UI; no oversized type inside compact panels.
- Spacing/layout rhythm: structured panels and split preview layouts; no floating card inside card nesting.
- Shape/radius/elevation: 8-18px radius following existing shell patterns; subtle elevation for selected role and active work cards.
- Motion:
  - State model: `idle` -> `activating` -> `revealing` -> `ready`.
  - Sequence: permission check, data connection, board generation, context panel activation, agent queue display.
  - Duration target: about 900-1400ms end to end.
  - Reduced motion: no transform-heavy animation; content should still appear in the same order.
- Imagery/iconography: use existing inline icon helper and role/domain labels; avoid decorative illustrations.

## Components
- Existing components to reuse: `workspace-panel`, `status-pill`, `source-badge`, `metric-card`, `rail-role-menu`, role harness boards.
- New/changed components:
  - Locked workspace preview on the main dashboard.
  - Role activation sequence page.
  - Role activation context panel.
  - Staggered activation cards, skeleton bars, step timeline, queue preview.
- Variants and states:
  - idle locked skeleton
  - activating permission/data checks
  - revealing board/context/queue
  - ready destination harness
- Token/component ownership: global shell owns role activation; each harness owns its business logic after ready.

## Accessibility
- Target standard: keyboard-usable demo with readable contrast.
- Keyboard/focus behavior: role menu buttons remain native buttons; activation state uses `aria-live` status copy.
- Contrast/readability: skeletons must remain low emphasis but not disappear against white backgrounds.
- Screen-reader semantics: step timeline and context panel use plain text status labels.
- Reduced motion and sensory considerations: respect `prefers-reduced-motion`.

## Responsive behavior
- Supported breakpoints/devices: desktop-first, with narrow desktop/tablet graceful stacking.
- Layout adaptations: activation preview uses multi-column split on wide screens and single-column stacking under 980px.
- Touch/hover differences: role launch buttons are large enough for pointer use; hover is enhancement only.

## Interaction states
- Loading: "권한 확인", "업무 데이터 연결", "업무보드 생성", "상세 패널 활성화", "에이전트 실행 큐 표시".
- Empty: use locked workspace skeleton instead of blank gray space.
- Error: no new network error state; local demo activation should complete deterministically.
- Success: destination harness becomes ready and context panel shows selected role summary.
- Disabled: no "접근 불가" language for GM/Admin role switching.
- Offline/slow network, if applicable: local demo data is mock/localStorage, so activation is visual only.

## Content voice
- Tone: concise operations Korean, suitable for bank internal tools.
- Terminology:
  - "GM/Admin Console"
  - "역할 선택 대기"
  - "권한 확인"
  - "업무 데이터 연결"
  - "실행 콘솔 준비"
- Microcopy rules:
  - Prefer "활성화", "연결", "검토", "승인" over "차단", "금지" unless describing risk controls.
  - For 전세사기, use "위험 신호", "확인 후보", "안내 초안", "담당자 검토".

## Implementation constraints
- Framework/styling system: vanilla JS with existing CSS files and global render loop.
- Design-token constraints: extend existing JB blue/financial operations palette; avoid new dependencies.
- Performance constraints: role activation uses timers and CSS only; no remote calls.
- Compatibility constraints: existing hash routes and Playwright tests must keep passing.
- Test/screenshot expectations:
  - First dashboard contains locked workspace preview.
  - Clicking a role shows activation sequence and then reaches the role route.
  - Context panel shows activation status during sequence.
  - Existing role harness keyboard/action flows still work after ready.

## Open questions
- [ ] Whether the demo operator wants animation disabled for a live pitch fallback / owner: product / impact: minor.
