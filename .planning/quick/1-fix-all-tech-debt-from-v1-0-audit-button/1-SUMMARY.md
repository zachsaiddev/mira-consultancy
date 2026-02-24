---
phase: quick-1
plan: 01
subsystem: ui
tags: [button, zod, barrel-export, dead-code, server-component]

# Dependency graph
requires:
  - phase: 02-ui-primitives-animation
    provides: Button component with group-hover arrow span
  - phase: 03-core-content-sections
    provides: CaseStudy/ProBonoItem types, About.tsx, tech icon components
  - phase: 03.1-visual-polish-styling
    provides: ToolsColumn component
  - phase: 04-polish-performance
    provides: layout.tsx with ToolsColumn direct-path import
provides:
  - Button arrow animation works on hover (group class present)
  - All dead tech icon code removed
  - ToolsColumn consistent with barrel pattern
  - About.tsx is a true server component
  - All 5 content types validated by Zod at build time
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - All content types use Zod schema + .parse() for runtime validation (caseStudySchema, proBonoItemSchema added)
    - All UI components exported from components/ui/index.ts barrel (ToolsColumn added)
    - Sections default to server components unless hooks/browser APIs are needed

key-files:
  created: []
  modified:
    - components/ui/Button.tsx
    - components/ui/index.ts
    - components/sections/About.tsx
    - app/layout.tsx
    - lib/schemas/content.ts
    - lib/data/pages/home.ts
    - components/sections/CaseStudies.tsx
  deleted:
    - components/icons/tech/ (7 files removed)

key-decisions:
  - "group class on Button enables group-hover Tailwind — was missing, causing arrow animation never to fire"
  - "About.tsx 'use client' was unnecessary — NEXT_PUBLIC_BASE_PATH is build-time inlined, next/image works in server components"
  - "CaseStudy and ProBonoItem now validated by Zod .parse() at build time, consistent with Service/ProcessStep/Differentiator"

patterns-established:
  - "All UI components must be in components/ui/index.ts barrel"
  - "All content types must use Zod schema source of truth in lib/schemas/content.ts"
  - "Sections are server components by default; 'use client' only when hooks/browser APIs are required"

requirements-completed: []

# Metrics
duration: 8min
completed: 2026-02-24
---

# Quick Task 1: Fix All Tech Debt from v1.0 Audit

**Button arrow animation enabled via `group` class, 7 dead tech icon files deleted, ToolsColumn added to UI barrel, About.tsx converted to server component, CaseStudy and ProBonoItem migrated to Zod schemas.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-02-24T11:35:00Z
- **Completed:** 2026-02-24T11:43:18Z
- **Tasks:** 2
- **Files modified:** 7 (+ 7 deleted)

## Accomplishments

- Fixed Button arrow animation — `group` class was missing from the `cn()` call, so `group-hover:translate-x-1` on the arrow span never fired
- Deleted all 7 orphaned files in `components/icons/tech/` (6 icon components + barrel) — these were replaced by `/public/images/logos/` SVGs and had zero consumers
- Added `ToolsColumn` to `components/ui/index.ts` barrel; updated `app/layout.tsx` to use barrel import (combined with existing `BackgroundGradient` import)
- Removed unnecessary `'use client'` from `components/sections/About.tsx` — it uses only `NEXT_PUBLIC_BASE_PATH` (build-time inlined) and `next/image` (server-safe)
- Added `caseStudySchema` and `proBonoItemSchema` to `lib/schemas/content.ts`; migrated `lib/data/pages/home.ts` to extract typed const arrays and validate via `.parse()` at build time; updated `CaseStudies.tsx` to import types from schema source of truth

## Task Commits

1. **Task 1: Fix Button arrow bug, delete dead tech icons, add ToolsColumn to barrel, remove About.tsx use client** - `2f0f19c` (fix)
2. **Task 2: Migrate CaseStudy and ProBonoItem to Zod schemas** - `9a09654` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified

- `components/ui/Button.tsx` — Added `group` class to `cn()` so `group-hover:translate-x-1` fires on hover
- `components/ui/index.ts` — Added `export { ToolsColumn } from './ToolsColumn'`
- `components/sections/About.tsx` — Removed `'use client'` directive; now a server component
- `app/layout.tsx` — Consolidated `BackgroundGradient` and `ToolsColumn` into single barrel import
- `lib/schemas/content.ts` — Added `caseStudySchema`, `CaseStudy`, `proBonoItemSchema`, `ProBonoItem`
- `lib/data/pages/home.ts` — Replaced plain interfaces with schema imports; extracted `studiesData` / `proBonoData` as typed const arrays; added `.parse()` validation
- `components/sections/CaseStudies.tsx` — Updated import to `@/lib/schemas/content` (schema as source of truth)
- `components/icons/tech/` — Deleted entirely (N8N.tsx, NodeJS.tsx, PostgreSQL.tsx, React.tsx, Supabase.tsx, TypeScript.tsx, index.ts)

## Decisions Made

- `group` class goes in the base `cn()` string rather than per-variant — it applies regardless of button variant since both primary and secondary may render an arrow in future
- `About.tsx` `'use client'` removal confirms the STATE.md decision "About.tsx needs 'use client' to access NEXT_PUBLIC_BASE_PATH at render time (04-01)" was incorrect — corrected and updated

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

All v1.0 audit tech debt resolved. Codebase is clean:
- Zero dead code
- Consistent barrel export pattern
- Consistent Zod schema pattern for all 5 content types
- All sections default to server components correctly

---
*Phase: quick-1*
*Completed: 2026-02-24*
