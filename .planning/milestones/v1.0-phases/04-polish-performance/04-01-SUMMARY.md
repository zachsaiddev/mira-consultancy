---
phase: 04-polish-performance
plan: 01
subsystem: ui
tags: [sharp, webp, images, opengraph, metadata, performance, next.js]

# Dependency graph
requires:
  - phase: 03.1-visual-polish-styling
    provides: About.tsx, Hero.tsx, Intro.tsx components with image references
provides:
  - WebP-optimized profile photo at 24KB (down from 2.3MB PNG)
  - WebP-optimized logo at 6KB (down from 20KB PNG)
  - Static 1200x630 OG image for social media previews
  - Full OpenGraph and Twitter Card metadata in layout.tsx
  - Repeatable image optimization scripts
affects: [github-pages-deployment, social-sharing, lighthouse-score, LCP]

# Tech tracking
tech-stack:
  added: []
  patterns: [sharp for image processing via Node scripts, Next.js file-based OG image convention]

key-files:
  created:
    - scripts/optimize-images.mjs
    - scripts/generate-og-image.mjs
    - public/images/zach.webp
    - public/images/logo.webp
    - app/opengraph-image.png
  modified:
    - app/layout.tsx
    - components/sections/About.tsx
    - components/sections/Hero.tsx
    - components/sections/Intro.tsx

key-decisions:
  - "sharp used as transitive dependency via next — no separate install required"
  - "app/opengraph-image.png file convention: Next.js auto-serves at /opengraph-image.png via metadataBase"
  - "metadataBase set to https://zachsaiddev.github.io/mira-consultancy (includes basePath)"
  - "About.tsx needs 'use client' to access NEXT_PUBLIC_BASE_PATH at render time"
  - "Original .png source files retained in public/images/ for re-conversion"

patterns-established:
  - "Image optimization scripts in scripts/ using sharp for repeatable conversions"
  - "All image src attributes use NEXT_PUBLIC_BASE_PATH prefix for GitHub Pages compatibility"

# Metrics
duration: 2min
completed: 2026-02-17
---

# Phase 04 Plan 01: Image Optimization & OpenGraph Summary

**WebP image conversion (2.3MB -> 24KB profile photo), profile.jpg 404 bug fix, and branded 1200x630 OG image with full OpenGraph/Twitter Card metadata via Next.js file convention**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-17T13:37:24Z
- **Completed:** 2026-02-17T13:39:21Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Fixed live 404 production bug: About.tsx was referencing `/images/profile.jpg` which never existed
- Reduced profile photo from 2.3MB PNG to 24KB WebP — 99% size reduction, direct LCP improvement
- Reduced logo from 20KB PNG to 6KB WebP — 70% reduction
- Created 1200x630 branded OG image with dark background and logo composite for social previews
- Added complete OpenGraph and Twitter Card metadata with correct metadataBase for GitHub Pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert images to WebP and fix profile.jpg 404 bug** - `ee293b5` (feat)
2. **Task 2: Create OG image and add full metadata to layout.tsx** - `da541a6` (feat)

## Files Created/Modified
- `scripts/optimize-images.mjs` - Sharp script to convert zach.png and logo.png to WebP
- `scripts/generate-og-image.mjs` - Sharp script to generate 1200x630 branded OG image
- `public/images/zach.webp` - Profile photo at 400x400 (24KB, down from 2.3MB)
- `public/images/logo.webp` - Logo in WebP format (6KB, down from 20KB)
- `app/opengraph-image.png` - Static 1200x630 OG image with dark brand background
- `app/layout.tsx` - Added metadataBase, openGraph, and twitter card fields
- `components/sections/About.tsx` - Fixed profile.jpg 404, added 'use client', updated to zach.webp with basePath
- `components/sections/Hero.tsx` - Updated logo.png to logo.webp
- `components/sections/Intro.tsx` - Updated zach.png to zach.webp

## Decisions Made
- `sharp` used via transitive dependency (bundled with Next.js 16) — no separate install needed
- `app/opengraph-image.png` file convention: Next.js auto-routes it at `/opengraph-image.png`; `metadataBase` resolves the relative path so OG tags emit the full GitHub Pages URL automatically
- `metadataBase` set to `https://zachsaiddev.github.io/mira-consultancy` — includes the `/mira-consultancy` basePath so all OG image URLs resolve correctly on GitHub Pages
- `About.tsx` required `'use client'` directive to access `process.env.NEXT_PUBLIC_BASE_PATH` at render time (was previously a server component with hard-coded path)
- Original PNG source files retained for re-conversion if quality/size settings need adjustment

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- All images are WebP and correctly referenced across all three components
- OG image is ready; social previews will work once deployed to GitHub Pages
- Build passes cleanly with static export
- Ready for Phase 04 Plan 02 (remaining performance/polish work)

---
*Phase: 04-polish-performance*
*Completed: 2026-02-17*
