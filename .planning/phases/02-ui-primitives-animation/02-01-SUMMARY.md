---
phase: 02-ui-primitives-animation
plan: 01
subsystem: ui
tags: [react, intersection-observer, animations, tailwind, accessibility]

# Dependency graph
requires:
  - phase: 01-foundation-design-system
    provides: Design tokens, Tailwind v4 config, color palette, typography system
provides:
  - AnimatedSection component with scroll-triggered fade-in and stagger mode
  - Button component with arrow hover animation and secondary variant
  - Animation design tokens (duration, easing, stagger delay)
  - prefers-reduced-motion support
  - focus-visible keyboard indicators
  - Link underline hover effect
affects: [03-content-sections, 04-seo-analytics, 05-polish-performance]

# Tech tracking
tech-stack:
  added: [react-intersection-observer]
  patterns: [scroll-triggered animations with triggerOnce, staggered child reveals, inline style injection for dynamic animations]

key-files:
  created:
    - components/ui/AnimatedSection.tsx
    - components/ui/Button.tsx
    - components/ui/index.ts
  modified:
    - app/globals.css
    - app/page.tsx
    - package.json

key-decisions:
  - "Inline styles for stagger animation instead of CSS classes (Tailwind v4 @layer components issue)"
  - "threshold: 0.1 (10% visibility) triggers fade-in — good balance per research"
  - "triggerOnce: true — sections stay visible after first scroll (user decision)"
  - "150ms stagger delay between children for measured editorial feel"
  - "700ms fade duration with ease-out timing function"

patterns-established:
  - "Client components can be imported in server components (Next.js App Router pattern)"
  - "Animation tokens use CSS custom properties for runtime flexibility"
  - "prefers-reduced-motion uses 0.01ms (not 0ms) to prevent jarring snaps"
  - "focus-visible pattern: outline removed for :focus, added for :focus-visible"

requirements-completed: [ANIM-01, ANIM-02, ANIM-03]

# Metrics
duration: 14min
completed: 2026-02-16
---

# Phase 02 Plan 01: UI Primitives & Animation Summary

**Scroll-triggered AnimatedSection with stagger mode, Button component with arrow hover animation, full prefers-reduced-motion support, and focus-visible keyboard indicators using react-intersection-observer**

## Performance

- **Duration:** 14 min
- **Started:** 2026-02-16T22:21:37Z
- **Completed:** 2026-02-16T22:35:06Z
- **Tasks:** 3 (1 checkpoint approved)
- **Files modified:** 7

## Accomplishments
- AnimatedSection wrapper fades content in on scroll with optional stagger reveal
- Button component with primary (arrow) and secondary (underline) variants
- Full accessibility: prefers-reduced-motion support, focus-visible keyboard indicators
- Animation design tokens integrated into Tailwind v4 @theme system
- Working demo on homepage with all sections animated

## Task Commits

Each task was committed atomically:

1. **Task 1: Animation infrastructure — install library, add design tokens, base styles** - `d9ed03d` (chore)
2. **Task 2: Create AnimatedSection, Button components, barrel export, and wire into page** - `ddf1422` (feat)
3. **Task 3: Visual verification of animations, hover states, and accessibility** - User approved (no commit)
4. **Post-checkpoint fix: Use inline styles for stagger instead of CSS classes** - `b067a71` (fix)

## Files Created/Modified
- `components/ui/AnimatedSection.tsx` - Scroll-triggered fade-in wrapper with optional stagger mode using react-intersection-observer
- `components/ui/Button.tsx` - CTA link component with arrow hover animation (primary) and underline effect (secondary)
- `components/ui/index.ts` - Barrel export for all UI primitives
- `app/globals.css` - Animation tokens (duration, easing, stagger), prefers-reduced-motion rule, focus-visible styles, link-underline effect
- `app/page.tsx` - Homepage updated to use AnimatedSection and Button components
- `package.json` - Added react-intersection-observer dependency

## Decisions Made

**1. Inline styles for stagger animation instead of CSS classes**
- Tailwind v4 @layer components styles weren't applying to dynamically-added class names (.stagger-child/.is-visible)
- Switched to inline opacity/transition styles injected via cloneElement
- Ensures stagger animation works reliably in all scenarios

**2. Animation timing values**
- 700ms fade duration: slow enough to feel editorial, fast enough to avoid sluggishness
- 150ms stagger delay: measured sequential reveal without feeling mechanical
- ease-out (cubic-bezier(0, 0, 0.2, 1)): natural deceleration per research

**3. Intersection Observer threshold: 0.1 (10%)**
- Triggers animation when element is 10% visible
- Good balance between early reveal (feels responsive) and avoiding premature triggers

**4. triggerOnce: true**
- Per user decision from checkpoint: sections fade in once and stay visible
- No re-animation on scroll-back (avoids distraction, maintains reading context)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Changed stagger implementation from CSS classes to inline styles**
- **Found during:** Task 3 visual verification (post-checkpoint)
- **Issue:** Stagger animation wasn't working — .stagger-child/.is-visible CSS classes not being applied correctly in Tailwind v4 @layer components context. Dynamic class addition wasn't triggering the styles.
- **Fix:** Rewrote stagger mode to inject inline styles (opacity, transition, transitionDelay) directly via cloneElement instead of relying on CSS classes
- **Files modified:** components/ui/AnimatedSection.tsx
- **Verification:** User confirmed stagger animation now works correctly during visual verification
- **Committed in:** b067a71 (separate fix commit after checkpoint approval)

---

**Total deviations:** 1 auto-fixed (1 blocking issue)
**Impact on plan:** Fix was necessary for stagger feature to work as intended. No scope creep — same behavior, different implementation approach.

## Issues Encountered

**Tailwind v4 @layer components and dynamic class names**
- Discovered that Tailwind v4's @layer components doesn't reliably apply styles to class names added dynamically to the DOM
- This is a known limitation: Tailwind's JIT compiler needs class names present at build time
- Resolution: Use inline styles for dynamic animations where CSS classes would be added/removed at runtime
- Pattern established: CSS classes for static styles, inline styles for runtime-injected styles

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Phase 03 (Content Sections):**
- AnimatedSection can wrap any content section
- Button component ready for CTAs in hero, contact, case studies
- Animation system fully functional and accessible
- Barrel export pattern established for importing UI components

**No blockers.**

**Pattern for Phase 03:**
```tsx
import { AnimatedSection, Button } from '@/components/ui';

<AnimatedSection stagger className="section-padding">
  <span className="label">Label</span>
  <h2>Heading</h2>
  <p>Content</p>
  <Button href="/path">Call to action</Button>
</AnimatedSection>
```

## Self-Check: PASSED

All files verified to exist:
- FOUND: components/ui/AnimatedSection.tsx
- FOUND: components/ui/Button.tsx
- FOUND: components/ui/index.ts

All commits verified:
- d9ed03d (chore: animation infrastructure)
- ddf1422 (feat: components and barrel export)
- b067a71 (fix: inline styles for stagger)

---
*Phase: 02-ui-primitives-animation*
*Completed: 2026-02-16*
