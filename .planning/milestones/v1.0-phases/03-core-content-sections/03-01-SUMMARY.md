---
phase: 03-core-content-sections
plan: 01
subsystem: content-sections
tags: [hero, intro, services, process, contact, typography, sections]
dependency_graph:
  requires: [02-01]
  provides: [section-components, hero-cta, services-list, process-steps, contact-cta]
  affects: []
tech_stack:
  added: []
  patterns: [server-components, data-mapping, staggered-animations]
key_files:
  created:
    - components/sections/Hero.tsx
    - components/sections/Intro.tsx
    - components/sections/Services.tsx
    - components/sections/Process.tsx
    - components/sections/Contact.tsx
    - components/sections/index.ts
  modified: []
decisions: []
metrics:
  duration_minutes: 1
  completed_date: 2026-02-16
---

# Phase 03 Plan 01: Core Content Sections Summary

**One-liner:** Five text-driven sections (Hero, Intro, Services, Process, Contact) using AnimatedSection wrapper, Button component, and design system utilities — ready for page assembly.

## What Was Built

Created the primary content sections for the single-page landing experience:

1. **Hero section** — Partial viewport height (70vh) with exact headline "I build the tools your business actually needs.", subline describing services, and "Let's talk" CTA linking to Calendly placeholder. No AnimatedSection wrapper (above-the-fold content).

2. **Intro section** — 3-paragraph narrative introducing Zach and positioning the consultancy. Flows as a continuation of hero with no visual break (no section-label, no AnimatedSection wrapper).

3. **Services section** — Maps 5 service offerings from `lib/data/services.ts` with stagger animation. Minimal text blocks with "What I Do" subtle label.

4. **Process section** — Maps 4 numbered steps (01-04) from `lib/data/process.ts` with stagger animation. Zero-padded step numbers using section-label styling.

5. **Contact section** — "Got a problem that needs solving?" headline with dual CTAs: "Get in touch" (primary, Calendly) and "hello@mira.co" (secondary email fallback). Stacks vertically on mobile, side-by-side on sm+ screens.

All components are React Server Components (no 'use client') using design system utilities (prose-width, section-padding, section-label, text-text-secondary).

## Tasks Completed

| Task | Description | Files | Commit |
|------|-------------|-------|--------|
| 1 | Create Hero, Intro, Services, Process sections | Hero.tsx, Intro.tsx, Services.tsx, Process.tsx | 9521cef |
| 2 | Create Contact section and barrel export | Contact.tsx, index.ts | eff21da |

## Deviations from Plan

None - plan executed exactly as written.

## Requirements Satisfied

- [x] HERO-01: Hero section displays headline "I build the tools your business actually needs."
- [x] HERO-02: Hero section displays subline describing services and value proposition
- [x] HERO-03: Hero section has "Let's talk" CTA linking to Calendly placeholder
- [x] HERO-04: Hero section occupies partial viewport height (~70vh) hinting at content below
- [x] INTRO-01: Intro section flows as continuation of hero with no visual break
- [x] SERV-01: Services section displays 5 service offerings with titles and descriptions
- [x] PROC-01: Process section displays 4 numbered steps (01-04) with titles and descriptions
- [x] CTA-01: Contact section displays "Got a problem that needs solving?" headline
- [x] CTA-02: Contact section has "Get in touch" CTA linking to Calendly
- [x] CTA-03: Contact section shows email fallback link (hello@mira.co)

## Must-Haves Verification

### Truths
- [x] Hero section displays headline "I build the tools your business actually needs."
- [x] Hero section displays subline describing services and value proposition
- [x] Hero section has "Let's talk" CTA linking to Calendly placeholder
- [x] Hero section occupies partial viewport height (~70vh) hinting at content below
- [x] Intro section flows as a continuation of hero with no visual break
- [x] Services section displays 5 service offerings with titles and descriptions
- [x] Process section displays 4 numbered steps (01-04) with titles and descriptions
- [x] Contact section displays "Got a problem that needs solving?" headline
- [x] Contact section has "Get in touch" CTA linking to Calendly
- [x] Contact section shows email fallback link (hello@mira.co)

### Artifacts
- [x] components/sections/Hero.tsx (19 lines) - Hero section with headline, subline, and CTA
- [x] components/sections/Intro.tsx (17 lines) - Intro/positioning narrative section
- [x] components/sections/Services.tsx (21 lines) - Services section with 5 offerings
- [x] components/sections/Process.tsx (25 lines) - Process section with 4 numbered steps
- [x] components/sections/Contact.tsx (27 lines) - Contact section with primary and secondary CTAs
- [x] components/sections/index.ts (5 lines) - Barrel export for all section components, exports [Hero, Intro, Services, Process, Contact]

### Key Links
- [x] Hero.tsx imports Button from '@/components/ui', pattern "Button.*href.*calendly" present
- [x] Services.tsx imports services from '@/lib/data/services', pattern "services\.map" present
- [x] Process.tsx imports processSteps from '@/lib/data/process', pattern "processSteps\.map" present
- [x] Contact.tsx imports Button from '@/components/ui', pattern "Button.*href.*calendly" present

## Technical Notes

- All sections use React Server Components (no client-side JavaScript except AnimatedSection wrapper)
- Hero and Intro intentionally omit AnimatedSection wrapper for immediate visibility
- Services, Process, and Contact use AnimatedSection with stagger for progressive reveal
- Button component's primary variant already provides text link with arrow styling per user decision
- Design system utilities (prose-width, section-padding, section-label) ensure consistency

## Next Steps

Plan 03-02 will add TechStack, About, and Footer sections to complete the content layer before page assembly in Plan 03-03.

## Self-Check: PASSED

### Files Verification
- FOUND: /Users/zachsaid/Projects/mira-consultancy/components/sections/Hero.tsx
- FOUND: /Users/zachsaid/Projects/mira-consultancy/components/sections/Intro.tsx
- FOUND: /Users/zachsaid/Projects/mira-consultancy/components/sections/Services.tsx
- FOUND: /Users/zachsaid/Projects/mira-consultancy/components/sections/Process.tsx
- FOUND: /Users/zachsaid/Projects/mira-consultancy/components/sections/Contact.tsx
- FOUND: /Users/zachsaid/Projects/mira-consultancy/components/sections/index.ts

### Commits Verification
- FOUND: 9521cef (Task 1: Hero, Intro, Services, Process)
- FOUND: eff21da (Task 2: Contact and barrel export)
