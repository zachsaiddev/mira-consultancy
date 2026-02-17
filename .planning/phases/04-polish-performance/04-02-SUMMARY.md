---
phase: 04-polish-performance
plan: 02
subsystem: ui
tags: [accessibility, performance, animation, prefers-reduced-motion, css, react-hooks]

# Dependency graph
requires:
  - phase: 02-animation-effects
    provides: AnimatedSection component with scroll-triggered fade animations
  - phase: 03.1-visual-polish-styling
    provides: gradient orb system, globals.css, film grain, focus-visible, prefers-reduced-motion CSS

provides:
  - usePrefersReducedMotion hook — SSR-safe, runtime-change-aware reduced-motion detection
  - AnimatedSection with no-flash guarantee for reduced-motion users
  - Gradient orb blur optimized to 70px for mobile GPU performance
  - TechStack icons with proper role="img" + aria-label accessible names

affects:
  - any phase adding new animation components (must import usePrefersReducedMotion)
  - any phase adding icon-only UI elements (must follow role="img" + aria-label pattern)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - usePrefersReducedMotion hook pattern — SSR-safe hook with runtime change listener
    - Early-return pattern in animated components — hooks called unconditionally, conditional render after

key-files:
  created:
    - lib/hooks/usePrefersReducedMotion.ts
  modified:
    - components/ui/AnimatedSection.tsx
    - app/globals.css
    - components/sections/TechStack.tsx

key-decisions:
  - "usePrefersReducedMotion defaults false SSR-safe — animations enabled on server, checked on mount"
  - "blur(70px) on gradient orbs: quadratic cost reduction vs 100px, visually equivalent at 50-60vw scale"
  - "AnimatedSection early-return for reduced-motion before render logic — prevents opacity-0 flash entirely"
  - "TechStack role=img + aria-label on wrapper div, aria-hidden on inner SVG — avoids duplicate screen reader announcement"

patterns-established:
  - "Reduced-motion hook pattern: call hooks unconditionally (Rules of Hooks), conditional early-return after all hooks"
  - "Icon accessibility pattern: role=img + aria-label on container, aria-hidden=true on decorative inner SVG"

# Metrics
duration: 2min
completed: 2026-02-17
---

# Phase 4 Plan 02: Mobile Performance & Accessibility Summary

**usePrefersReducedMotion hook with AnimatedSection no-flash guard, orb blur reduced 100px -> 70px for mobile GPU, and TechStack icon aria roles added**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-17T13:37:23Z
- **Completed:** 2026-02-17T13:39:06Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `usePrefersReducedMotion` hook: SSR-safe (defaults false), runtime-change-aware (listens for MediaQueryList change events), consistent with existing motion hook patterns
- Fixed AnimatedSection opacity-0 flash: reduced-motion users now receive immediate visible content — no transition, no flash, no layout shift
- Reduced gradient orb blur from 100px to 70px — same visual effect at this scale with significantly lower GPU texture processing cost on mobile
- Added proper accessible names to TechStack icons (`role="img"`, `aria-label`) and marked inner SVGs as `aria-hidden` to prevent double announcements

## Task Commits

Each task was committed atomically:

1. **Task 1: Create usePrefersReducedMotion hook and fix AnimatedSection** - `5babdf8` (feat)
2. **Task 2: Optimize gradient orb blur and verify accessibility fundamentals** - `a368aa5` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `lib/hooks/usePrefersReducedMotion.ts` — New hook: SSR-safe reduced-motion detection with runtime change listener
- `components/ui/AnimatedSection.tsx` — Added usePrefersReducedMotion import; early-return for reduced-motion users before animation logic
- `app/globals.css` — `.gradient-orb` filter changed from `blur(100px)` to `blur(70px)`
- `components/sections/TechStack.tsx` — Added `role="img"` + `aria-label={tech.name}` to icon wrappers; `aria-hidden="true"` on inner Icon SVG

## Decisions Made

- `usePrefersReducedMotion` defaults to `false` (animations enabled) for SSR safety — state is corrected on mount via `useEffect`
- Hook listens for `MediaQueryList` `change` events, unlike `BackgroundGradient` and `useParallax` which only check `.matches` once — small improvement that covers the case where a user toggles their system setting while the page is open
- Blur reduced to 70px rather than removed entirely — per CONTEXT.md "any performance optimizations that don't remove visual effects" are in scope; 70px is visually equivalent to 100px at 50-60vw element sizes
- TechStack accessibility: wrapper div gets the semantic `role="img"` + `aria-label`, inner SVG gets `aria-hidden="true"` — this is the correct ARIA pattern to avoid duplicate announcements

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added aria-hidden to TechStack icon SVGs**
- **Found during:** Task 2 (accessibility verification)
- **Issue:** Plan specified adding `role="img"` + `aria-label` to the wrapper div but did not explicitly say to add `aria-hidden="true"` to the inner `<Icon />`. Without it, screen readers would announce the icon twice (once from the container label, once from the SVG content)
- **Fix:** Added `aria-hidden="true"` prop to the `<Icon>` component call alongside the `role="img"` + `aria-label` on the wrapper
- **Files modified:** `components/sections/TechStack.tsx`
- **Verification:** Build passes; correct ARIA pattern (container announces, inner SVG silent)
- **Committed in:** `a368aa5` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 — missing critical accessibility)
**Impact on plan:** Necessary for correct screen reader behavior. No scope creep.

## Issues Encountered

None — build passed cleanly on both tasks. The `metadataBase` warning in the build output is pre-existing and unrelated to this plan.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All animation components now have reduced-motion guards
- Mobile GPU performance improved (blur reduction)
- Accessibility fundamentals verified and corrected
- Ready for any remaining performance or polish work in phase 04

---
*Phase: 04-polish-performance*
*Completed: 2026-02-17*

## Self-Check: PASSED

- lib/hooks/usePrefersReducedMotion.ts: FOUND
- components/ui/AnimatedSection.tsx: FOUND
- app/globals.css: FOUND
- components/sections/TechStack.tsx: FOUND
- .planning/phases/04-polish-performance/04-02-SUMMARY.md: FOUND
- Commit 5babdf8: FOUND
- Commit a368aa5: FOUND
