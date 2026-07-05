# HagentOS UI Adaptation

This update expands JB LocalGuard OS from a simple 3-column MVP into a HagentOS-style finance operations console. The main hero title is the AI Agent model name, `JB LocalGuard OS`; the challenge title is kept as contextual metadata, not the primary product title.

## Borrowed System Items

- 4-zone layout: organization rail, sidebar navigation, main work surface, properties panel
- Command bar: natural-language instruction to Orchestrator
- Dashboard metrics: running agents, active cases, Jeonse Shield, approval queue
- Case workspace: HagentOS-style List and Board modes
- Case board: BACKLOG, TODO, IN PROGRESS, REVIEW, BLOCKED, DONE
- Approval queue: human-in-the-loop review before external action
- Live AgentRun panel: running agent, linked case, transcript preview
- Agent team: status, reportsTo, heartbeat, queue, mounted skills
- Skill registry: skill type, purpose, risk, approval policy
- Heartbeat routines: scheduled scans and coalesced operational runs
- Activity ledger: audit-style timeline
- Budget page: per-Agent budget consumption
- Settings: organization profile, approval policy, integration adapters
- Jeonse Shield page: jeonse-fraud risk signals, tenant asset exposure, pre-contract checklist, and bank service linkage
- Agent org chart page: shows each AI Agent's reporting line, responsibility, status, budget, and mounted skills

## Finance Adaptation

The reference HagentOS domain is not copied. Each item is mapped to JB finance operations.

| HagentOS item | LocalGuard finance mapping |
| --- | --- |
| 기관 | JB affiliate tenant: 전북은행, 광주은행, JB우리캐피탈 |
| 학생/학부모 | 지역 소상공인, 개인사업자, 중소사업자 |
| 민원 case | 금융 위험 case: cashflow, rate, fraud, policy, digital barrier |
| 원장 승인 | RM, 준법, 보안 담당자 승인 |
| k-skill | finance/risk/compliance skill package |
| Activity | AgentRun and approval audit ledger |
| Schedule/Routine | daily pain radar scan, fraud sync, SLA checks |
| Budget | per-Agent API/runtime budget |

## Visual Direction

The updated palette follows the HagentOS readability model while keeping JB challenge blue as the accent:

- white canvas and panel surfaces for scanability
- thin `#e5e8eb` borders and low-shadow panels
- JB blue: primary actions, selected navigation, and status emphasis
- cyan: live state, evidence highlights, and metric accents
- 8px cards and controls, matching the HagentOS compact system

## Layout Specification

- 1920x1080 desktop target: the app shell occupies one viewport with independent scrolling in the main work surface and properties panel
- organization rail: 72px
- sidebar: 240px desktop
- properties panel: 320px desktop
- main work surface: remaining 1288px at 1920px desktop
- page padding: 24px/32px inside the main surface
- page gap: 16px
- card and control radius: 8px
- no marketing hero on the main workspace; the dashboard starts with a compact workspace header
- command panel: 280px instruction column plus flexible command input and one icon dispatch button
- page router: each sidebar item renders only its corresponding work screen in the main surface
- context panel: selected case, approval gate, evidence feed, and audit ledger stay in the right-side panel

## HagentOS Process Mirroring

The runtime process is now modeled after HagentOS rather than only described:

- Dashboard instruction dispatch creates an `AgentRun`, keeps the user on the dashboard, and shows a completion panel.
- The selected case status changes from `New` or `Approval Pending` into `Agent Running`, then the mock runtime advances it into approval or escalation.
- Case List mode is the default scan view. Board mode exposes HagentOS-style status columns and supports drag-to-status transitions.
- Moving a card to `IN PROGRESS` starts an `AgentRun`; moving to review, blocked, or done updates the case status and audit ledger.
- Approval Queue has tabs for all, pending, approved, and rejected/escalated states.
- The properties panel always reflects the current selected case, agent, skill, feature, or page summary.

Browser verification on the local server confirmed the 1920x1080 shell dimensions: 72px rail, 240px sidebar, 320px properties panel, 4 metric cards, 5 dashboard workspace panels, and no console errors.

## Added Jeonse Shield Line

The app now includes a separate jeonse-fraud prevention agent line:

- Jeonse Shield Lead
- Deposit Ratio Agent
- Registry Rights Agent
- Tenant Asset Risk Agent
- Contract Checklist Agent
- Bank Linkage Agent

These agents cover high jeonse ratio, excessive deposit versus nearby market, registry rights risk, short-term ownership transfer, guarantee feasibility, tenant asset exposure, pre-contract checklist, special clause drafts, jeonse-loan 상담, guarantee 안내, risky listing warning, and safe-contract guidance.

The UI avoids the academy domain and presents a finance operating system suitable for the free-topic JB future business AI track.
