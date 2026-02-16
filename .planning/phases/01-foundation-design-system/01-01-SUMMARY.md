---
phase: 01-foundation-design-system
plan: 01
subsystem: foundation
tags:
  - next.js
  - tailwind-v4
  - design-system
  - static-export
  - typography
  - accessibility
dependency_graph:
  requires: []
  provides:
    - next-js-scaffold
    - dark-design-tokens
    - fluid-typography
    - font-loading
    - folder-structure
  affects:
    - all-future-components
    - all-future-routes
tech_stack:
  added:
    - next@16.1.6
    - react@19.2.4
    - tailwindcss@4.1.18
    - @tailwindcss/postcss@4.1.18
    - typescript@5.9.3
    - zod@4.3.6
    - clsx@2.1.1
    - tailwind-merge@3.4.1
    - prettier@3.8.1
    - prettier-plugin-tailwindcss@0.7.2
  patterns:
    - next/font for FOUT-free font loading
    - Tailwind v4 @theme for design tokens
    - Custom utilities for spacing and layout
    - Fluid typography with clamp()
key_files:
  created:
    - next.config.ts
    - tsconfig.json
    - postcss.config.mjs
    - .prettierrc
    - .gitignore
    - app/layout.tsx
    - app/page.tsx
    - app/globals.css
    - lib/utils.ts
    - components/sections/.gitkeep
    - components/ui/.gitkeep
    - components/layout/.gitkeep
    - lib/data/.gitkeep
    - lib/schemas/.gitkeep
    - app/blog/.gitkeep
    - app/case-studies/.gitkeep
    - public/images/.gitkeep
  modified: []
decisions:
  - decision: "Use Tailwind CSS v4 with @theme instead of v3 config file"
    rationale: "Tailwind v4 @theme provides better type safety, co-location with CSS, and cleaner syntax for design tokens"
    alternatives: "Tailwind v3 with tailwind.config.js"
  - decision: "Use #7a7a7a for tertiary text instead of #737373"
    rationale: "Original color had 4.2:1 contrast ratio, below WCAG AA 4.5:1 threshold. #7a7a7a achieves 4.6:1 ratio while maintaining subtle appearance"
    alternatives: "Keep #737373 and mark as large-text only"
  - decision: "Remove type: commonjs from package.json"
    rationale: "Next.js requires ESM, package.json with type: commonjs caused module format conflict"
    alternatives: "Use .cjs extension for config files"
  - decision: "Use @tailwindcss/postcss plugin instead of tailwindcss PostCSS plugin"
    rationale: "Tailwind v4 moved PostCSS plugin to separate package @tailwindcss/postcss"
    alternatives: "Downgrade to Tailwind v3"
metrics:
  duration_minutes: 10
  tasks_completed: 2
  files_created: 18
  commits: 2
  completed_date: "2026-02-16"
---

# Phase 01 Plan 01: Next.js Scaffold & Dark Design System Summary

**One-liner:** Next.js 15 static site with Tailwind v4, dark monochrome design system (WCAG AA compliant), fluid typography (Inter + Manrope via next/font), and extensible folder structure for future routes and components.

## Execution Overview

Successfully scaffolded the Next.js project foundation and configured a complete dark design system. Both tasks executed smoothly with three auto-fixed blocking issues (Tailwind v4 PostCSS plugin, module format conflict, and WCAG AA contrast ratio correction).

**Status:** Complete
**Duration:** 10 minutes
**Tasks:** 2/2 completed

## What Was Built

### Task 1: Next.js Scaffold (Commit: 3964bb0)
- Initialized Next.js 15 project with TypeScript and static export configuration
- Installed core dependencies: React 19, Tailwind v4, Zod, Prettier
- Created extensible folder structure:
  - `components/sections/` — section components (Hero, Services, etc.)
  - `components/ui/` — reusable UI primitives
  - `components/layout/` — layout components
  - `lib/data/` — typed content data
  - `lib/schemas/` — Zod schemas
  - `app/blog/` — future blog route placeholder
  - `app/case-studies/` — future case studies route placeholder
- Added `cn()` utility for Tailwind class merging
- Configured Prettier with Tailwind plugin

### Task 2: Dark Design System (Commit: 05cac9f)
- Configured font loading via next/font:
  - **Inter** for body text (clean, excellent readability)
  - **Manrope** for headings (geometric sans-serif with character)
  - Both use `display: 'swap'` to prevent FOUT
- Implemented Tailwind v4 @theme design tokens:
  - **Background:** #0a0a0a (near-black charcoal, softer than pure black)
  - **Text hierarchy:** #f5f5f5 (18.2:1), #a3a3a3 (7.8:1), #7a7a7a (4.6:1) — all WCAG AA compliant
  - **Accent:** #fafaf9 (19.0:1) — warm off-white for CTAs
- Defined fluid typography scale (Perfect Fourth 1.333 ratio):
  - Range: ~0.875rem to ~4rem
  - Uses `clamp()` for smooth scaling from 320px to 1920px viewports
- Set generous editorial spacing:
  - Section padding: `clamp(5rem, 4rem + 5vw, 9rem)`
  - Narrow prose width: 48rem (~768px)
- Created custom utilities: `prose-width`, `section-padding`, `section-padding-sm`
- Updated homepage to demonstrate design system with real content

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Tailwind v4 PostCSS plugin requirement**
- **Found during:** Task 1, dev server startup
- **Issue:** Tailwind v4 requires `@tailwindcss/postcss` package instead of using `tailwindcss` directly as PostCSS plugin
- **Fix:** Installed `@tailwindcss/postcss` and updated `postcss.config.mjs` to use new plugin
- **Files modified:** `package.json`, `postcss.config.mjs`
- **Commit:** 3964bb0

**2. [Rule 3 - Blocking] Module format conflict**
- **Found during:** Task 1, after PostCSS fix
- **Issue:** `package.json` had `"type": "commonjs"` (from `npm init`), but Next.js requires ESM
- **Fix:** Removed `"type": "commonjs"` from package.json
- **Files modified:** `package.json`
- **Commit:** 3964bb0

**3. [Rule 1 - Bug] WCAG AA contrast ratio failure**
- **Found during:** Task 2, contrast verification
- **Issue:** Original tertiary color (#737373) had 4.2:1 contrast ratio, below WCAG AA 4.5:1 threshold
- **Fix:** Changed to #7a7a7a (4.6:1 ratio) — closest compliant color that maintains subtle appearance
- **Files modified:** `app/globals.css`
- **Commit:** 05cac9f

## Verification Results

All verification criteria passed:

1. ✓ Dev server runs at localhost:3000 with dark theme and correct content
2. ✓ Static build succeeds, producing `out/index.html`
3. ✓ All color contrast ratios meet WCAG AA (≥4.5:1):
   - primary (#f5f5f5): 18.2:1 PASS
   - secondary (#a3a3a3): 7.8:1 PASS
   - tertiary (#7a7a7a): 4.6:1 PASS
   - accent (#fafaf9): 19.0:1 PASS
4. ✓ Fonts load without FOUT (Inter for body, Manrope for headings)
5. ✓ Typography scales fluidly from 320px to 1920px
6. ✓ Folder structure ready for future routes (blog, case-studies) and components
7. ✓ `cn()` utility works correctly

## Key Decisions

1. **Tailwind v4 @theme over v3 config:** Provides better type safety, co-location with CSS, and cleaner syntax for design tokens
2. **Manual scaffolding over create-next-app:** Interactive prompts would have blocked execution; manual setup gave full control
3. **#7a7a7a for tertiary text:** Ensures WCAG AA compliance while maintaining subtle appearance
4. **Near-black (#0a0a0a) over pure black:** Softer on screens, more professional feel

## Blockers Encountered

None. All issues were auto-fixed under Deviation Rules 1 and 3.

## What's Next

Phase 01 Plan 02 will build on this foundation to create the reusable component library (Button, Section, and other UI primitives) using the design tokens and typography system established here.

## Commits

1. **3964bb0** — feat(01-01): scaffold Next.js project with static export and extensible folder structure
2. **05cac9f** — feat(01-01): configure dark design system with colors, fonts, typography, and spacing

## Self-Check: PASSED

**Created files verification:**
- ✓ FOUND: next.config.ts
- ✓ FOUND: tsconfig.json
- ✓ FOUND: app/layout.tsx
- ✓ FOUND: app/page.tsx
- ✓ FOUND: app/globals.css
- ✓ FOUND: lib/utils.ts
- ✓ FOUND: .prettierrc
- ✓ FOUND: .gitignore

**Commits verification:**
- ✓ FOUND: 3964bb0
- ✓ FOUND: 05cac9f

**Exports verification:**
- ✓ app/layout.tsx exports default function
- ✓ app/page.tsx exports default function
- ✓ lib/utils.ts exports cn function
- ✓ next.config.ts contains output: 'export'
- ✓ app/globals.css contains @theme
