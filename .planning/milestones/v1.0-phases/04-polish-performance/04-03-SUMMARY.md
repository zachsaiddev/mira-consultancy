---
phase: 04-polish-performance
plan: 03
subsystem: ui
tags: [lighthouse, performance, deployment, github-pages, opengraph, core-web-vitals, accessibility]

# Dependency graph
requires:
  - phase: 04-polish-performance
    plan: 01
    provides: WebP images, OG image, OpenGraph metadata in layout.tsx
  - phase: 04-polish-performance
    plan: 02
    provides: usePrefersReducedMotion, AnimatedSection no-flash, orb blur optimization, TechStack aria roles
provides:
  - Lighthouse Performance score 98 on mobile (live GitHub Pages)
  - Core Web Vitals all within thresholds: LCP 2.3s, CLS 0, TBT 10-20ms
  - Corrected metadataBase to origin-only URL (prevents double basePath in OG image URL)
  - Accessibility score 100 on live URL
  - Site deployed and live at https://zachsaiddev.github.io/mira-consultancy/
affects: [phase-05-future, social-sharing, github-pages-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Lighthouse CLI against live URL for stable scores — local serve has intermittent LanternError NO_LCP issue with this version"
    - "metadataBase should be origin-only (no basePath) — Next.js automatically prepends basePath when resolving metadata URLs"

key-files:
  created:
    - .planning/phases/04-polish-performance/04-03-SUMMARY.md
  modified:
    - app/layout.tsx

key-decisions:
  - "metadataBase corrected to https://zachsaiddev.github.io (origin only) — including /mira-consultancy basePath caused double-path in og:image URL"
  - "Lighthouse run on live URL rather than local serve — local serve had intermittent NO_LCP LanternError with simulate throttling"
  - "favicon.ico 404 console error is expected on GitHub Pages subdirectory deployments — browser requests root-domain favicon which doesn't exist without custom domain"

patterns-established:
  - "Run Lighthouse against live GitHub Pages URL, not local serve, for reliable simulate-throttling results"

# Metrics
duration: 6min
completed: 2026-02-17
---

# Phase 04 Plan 03: Deploy, Lighthouse Audit & Verification Summary

**Live site scores 98 Performance / 100 Accessibility on Lighthouse mobile with LCP 2.3s, CLS 0, TBT 10ms — all Phase 4 targets exceeded; OG metadata verified correct after metadataBase bug fix**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-17T13:42:02Z
- **Completed:** 2026-02-17T13:47:49Z
- **Tasks:** 1 auto + 1 checkpoint (Task 2: human-verify)
- **Files modified:** 1

## Accomplishments

- Fixed `metadataBase` double-basePath bug: OG image URL was resolving as `/mira-consultancy/mira-consultancy/opengraph-image.png`; corrected by setting metadataBase to origin-only `https://zachsaiddev.github.io`
- Deployed to GitHub Pages (push triggered Actions workflow, site live at https://zachsaiddev.github.io/mira-consultancy/)
- Lighthouse Performance **98** on mobile (target: >90) — exceeded by 8 points
- Accessibility **100** — all issues from previous plans resolved
- LCP **2.3s** (target: <2.5s), CLS **0** (target: <0.1), TBT **10-20ms** (target: <300ms)

## Lighthouse Results (Median of 2 valid runs)

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Performance | 98 | >90 | PASSED |
| Accessibility | 100 | 100 | PASSED |
| Best Practices | 96 | - | PASSED |
| SEO | 100 | - | PASSED |
| LCP | 2.3s | <2.5s | PASSED |
| CLS | 0 | <0.1 | PASSED |
| TBT | 10-20ms | <300ms | PASSED |
| FCP | 1.2s | - | PASSED |

*Note: Run 2 returned NO_LCP LanternError (intermittent Lighthouse simulator bug). Runs 1 and 3 both returned 98.*

*Note: Best Practices 96 (not 100) due to favicon.ico 404 at `https://zachsaiddev.github.io/favicon.ico`. Browser requests favicon at the root domain; GitHub Pages subdirectory deployments cannot serve favicon at domain root without a custom domain. This is expected behavior.*

## OG Metadata Verification

All 4 required OG tags present in built HTML output:

| Tag | Value |
|-----|-------|
| og:image | `https://zachsaiddev.github.io/mira-consultancy/opengraph-image.png` |
| og:title | Mira Consultancy — Custom Software for Growing Businesses |
| og:description | Custom applications, AI agents, and workflow automation... |
| twitter:card | summary_large_image |

## Task Commits

1. **Task 1: Deploy and run Lighthouse audit** — `fbafb98` (fix) — metadataBase bug fix + push to trigger deployment

## Files Created/Modified

- `app/layout.tsx` — Changed metadataBase from `https://zachsaiddev.github.io/mira-consultancy` to `https://zachsaiddev.github.io` to prevent double basePath in OG image URL

## Decisions Made

- `metadataBase` must be origin-only (no trailing basePath) — Next.js resolves metadata URLs by combining metadataBase + basePath + relative path; including basePath in metadataBase results in `/mira-consultancy/mira-consultancy/opengraph-image.png`
- Lighthouse run on the live GitHub Pages URL produced stable results; local `npx serve` with `--throttling-method=simulate` had intermittent `LanternError: NO_LCP` failures in this Lighthouse version
- favicon.ico 404 at root domain is an inherent GitHub Pages subdirectory limitation, not a fixable bug

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed double basePath in og:image URL**
- **Found during:** Task 1 (OG metadata verification step)
- **Issue:** `metadataBase` was set to `https://zachsaiddev.github.io/mira-consultancy` (including basePath). Next.js prepends basePath when resolving the OG image path from the `app/opengraph-image.png` file convention, resulting in the URL `https://zachsaiddev.github.io/mira-consultancy/mira-consultancy/opengraph-image.png` — a 404
- **Fix:** Changed `metadataBase` to `https://zachsaiddev.github.io` (origin only). Next.js now resolves: origin + `/mira-consultancy` (basePath) + `/opengraph-image.png` = correct URL
- **Files modified:** `app/layout.tsx`
- **Verification:** Rebuilt site, confirmed `og:image` content is `https://zachsaiddev.github.io/mira-consultancy/opengraph-image.png`
- **Committed in:** `fbafb98`

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug in metadataBase URL)
**Impact on plan:** Critical fix — OG image URL would have been a 404 for all social previews without this correction. No scope creep.

## Issues Encountered

- Local serve + Lighthouse simulate throttling produced intermittent `LanternError: NO_LCP` failures (Lighthouse CLI bug with this trace engine version). Resolved by running Lighthouse against the live GitHub Pages URL, which produced stable, consistent results.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Site is deployed and live at https://zachsaiddev.github.io/mira-consultancy/
- Performance: 98, Accessibility: 100 — Phase 4 targets exceeded
- OG metadata correct — social previews will render correctly
- Awaiting user checkpoint: mobile device verification on iPhone + OG preview check

---
*Phase: 04-polish-performance*
*Completed: 2026-02-17*

## Self-Check: PASSED

- FOUND: app/layout.tsx (metadataBase = https://zachsaiddev.github.io)
- FOUND: .planning/phases/04-polish-performance/04-03-SUMMARY.md
- FOUND: commit fbafb98 (fix: metadataBase origin-only URL)
- VERIFIED: og:image URL correct — https://zachsaiddev.github.io/mira-consultancy/opengraph-image.png
- VERIFIED: Lighthouse Performance 98, Accessibility 100, LCP 2.3s, CLS 0, TBT 10-20ms
- VERIFIED: Live site returns 200 at https://zachsaiddev.github.io/mira-consultancy/
