# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-16)

**Core value:** The site must look premium and load fast — a single-page experience that communicates credibility, showcases services clearly, and drives visitors to book a call.
**Current focus:** Polish & Performance — Phase 04 In Progress

## Current Position

Phase: 04 of 5 (Polish & Performance) — In Progress (awaiting human checkpoint)
Plan: 3 of 3 in current phase (04-03 Task 1 complete, Task 2 checkpoint pending)
Status: Checkpoint — awaiting human verify (mobile device + OG preview)
Last activity: 2026-02-17 — 04-03-PLAN.md Task 1 complete (Lighthouse 98, deploy verified)

Progress: [████████░░] 80%

## Performance Metrics

**Velocity:**
- Total plans completed: 10
- Average duration: 4.7 min
- Total execution time: 0.67 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 | 2 | 11 min | 5.5 min |
| 02 | 1 | 14 min | 14 min |
| 03 | 3 | 12 min | 4.0 min |
| 03.1 | 2 | 2 min | 1.0 min |
| 04 | 3 | 9 min | 3.0 min |

**Recent Trend:**
- Last 5 plans: 03.1-01 (1min), 03.1-02 (1min), 04-01 (1min), 04-02 (2min), 04-03 (6min)
- Trend: Steady

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Calendly for CTAs: Removes need to build contact form, lowers friction for booking calls
- Dark/monochrome palette: Matches design references, feels premium and personal
- Subtle animations only: Restrained motion keeps focus on content, faster to build
- No CMS: Static content is simpler, faster, and sufficient for v1
- Single-page landing: All content on one page, future sections as separate routes
- Tailwind v4 @theme: Better type safety and co-location vs v3 config (01-01)
- #7a7a7a tertiary text: WCAG AA compliant (4.6:1) vs original #737373 (4.2:1) (01-01)
- Inline styles for stagger animation: Tailwind v4 @layer components doesn't apply to dynamically-added classes (02-01)
- triggerOnce: true for scroll animations: Sections stay visible after first scroll (02-01)
- Hero/Intro no-divider: Intro flows as visual continuation of hero, no hr between them (03-03)
- Footer owns its own top border: no external hr before Footer (03-03)
- Accent color #7a9eb8 muted steel blue: WCAG AA ~5.5:1, visually distinct from previous warm white (03.1-01)
- Film grain via SVG feTurbulence data-URI at opacity 0.035: static, fixed position, z-index -1 (03.1-01)
- h1 override after shared heading block: CSS cascade sets 5xl size and editorial tracking without duplicating shared rules (03.1-01)
- divide-y replaces space-y-10 for magazine list pattern: Tailwind divide-y adds border-top to every child except first, producing clean index-style rules without extra markup (03.1-02)
- maskImage radial-gradient ellipse 85% 85% at 50% 40%: Center offset suits portrait photos; transparent at 80% gives soft fade (03.1-02)
- Heading stays unchanged on hover, only description brightens: Restrained hover effect per locked design decision (03.1-02)
- useParallax speed 0.06 on Hero h1: subtle depth without layout shift, rAF-batched, passive listener (03.1-03)
- prefers-reduced-motion guard on all motion hooks: accessibility requirement, hook returns immediately if set (03.1-03)
- sharp used as transitive dependency via next — no separate install required (04-01)
- app/opengraph-image.png file convention: Next.js auto-serves at /opengraph-image.png via metadataBase (04-01)
- metadataBase corrected to https://zachsaiddev.github.io (origin only) — including basePath caused double-path /mira-consultancy/mira-consultancy/ in og:image URL (04-03 bug fix)
- About.tsx needs 'use client' to access NEXT_PUBLIC_BASE_PATH at render time (04-01)
- usePrefersReducedMotion defaults false SSR-safe: animations enabled on server, corrected on mount (04-02)
- blur(70px) on gradient orbs: quadratic cost reduction vs 100px, visually equivalent at 50-60vw scale (04-02)
- AnimatedSection early-return for reduced-motion: prevents opacity-0 flash entirely, hooks still called unconditionally (04-02)
- TechStack role=img + aria-label on wrapper, aria-hidden on inner SVG: correct ARIA pattern avoiding duplicate announcements (04-02)
- Lighthouse run against live GitHub Pages URL (not local serve): local simulate throttling has intermittent NO_LCP LanternError in this CLI version (04-03)
- favicon.ico 404 on GitHub Pages subdirectory deploy is expected — browser requests root-domain favicon which requires custom domain to fix (04-03)

### Pending Todos

None yet.

### Roadmap Evolution

- Phase 03.1 inserted after Phase 3: Visual Polish & Styling (INSERTED)

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-17
Stopped at: 04-03-PLAN.md Task 2 checkpoint:human-verify — Lighthouse 98, OG metadata verified, awaiting user mobile device test + OG preview check
Resume file: .planning/phases/04-polish-performance/04-03-SUMMARY.md
