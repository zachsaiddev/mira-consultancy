# Roadmap: Mira Consultancy

## Overview

This roadmap delivers a premium single-page brochure site for Mira Consultancy — from foundational configuration and design system through core content sections to production-ready optimization. Each phase builds on the previous, moving from technical infrastructure to user-facing features to polish, ensuring the site looks premium, loads fast, and drives visitors to book calls.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Design System** - Next.js setup, Tailwind config, typography, color system, and content schema
- [ ] **Phase 2: UI Primitives & Animation** - Reusable components and scroll animation system with performance validation
- [ ] **Phase 3: Core Content Sections** - Hero, Services, Process, Tech Stack, About, Contact, and Footer sections
- [ ] **Phase 4: Polish & Performance** - Optimization, accessibility, mobile testing, and production readiness
- [ ] **Phase 5: Future Architecture** - Document extensibility for blog and case studies (planning only, no implementation)

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Establish the technical foundation and design system that all components depend on
**Depends on**: Nothing (first phase)
**Requirements**: LAYOUT-01, DESGN-01, DESGN-02, DESGN-03, DESGN-04, PERF-01, PERF-02, EXT-01
**Success Criteria** (what must be TRUE):
  1. Next.js project runs locally with static export configured
  2. Dark color palette displays with all text/background pairs meeting WCAG AA contrast (4.5:1 minimum)
  3. Typography scales correctly from mobile (320px) to desktop with no layout breaks
  4. Fonts load with no flash of unstyled text (FOUT)
  5. Content data structure exists in typed TypeScript objects (services, tech stack, process steps)
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Project scaffolding, static export, design system (colors, fonts, typography, spacing)
- [ ] 01-02-PLAN.md — Content schemas (Zod), data files, single-page layout wiring

### Phase 2: UI Primitives & Animation
**Goal**: Build reusable UI components and scroll animation system validated for performance
**Depends on**: Phase 1
**Requirements**: ANIM-01, ANIM-02, ANIM-03
**Success Criteria** (what must be TRUE):
  1. Base UI components (Container, Typography, Button, Card) exist and are reusable across sections
  2. AnimatedSection wrapper fades elements in on scroll using Intersection Observer
  3. All animations respect `prefers-reduced-motion` setting
  4. Scroll animations perform smoothly on mobile (tested on real device or 4x CPU throttling)
  5. Interactive elements (buttons, links) have visible hover and focus states
**Plans**: 1 plan

Plans:
- [ ] 02-01-PLAN.md — Animation system, UI components (AnimatedSection, Button), and visual verification

### Phase 3: Core Content Sections
**Goal**: Implement all content sections delivering the complete single-page experience
**Depends on**: Phase 2
**Requirements**: LAYOUT-02, LAYOUT-03, HERO-01, HERO-02, HERO-03, INTRO-01, SERV-01, PROC-01, TECH-01, ABOUT-01, CTA-01, CTA-02, CTA-03
**Success Criteria** (what must be TRUE):
  1. Visitor lands on homepage and sees hero with headline, subline, and working "Let's talk" CTA
  2. Scrolling down reveals Intro, Services (5 offerings), Process (4 steps), Tech Stack, and About sections in sequence
  3. Contact section displays with "Get in touch" CTA and email fallback
  4. Footer shows copyright, London location, and social links (LinkedIn, GitHub, Email)
  5. All sections are fully responsive from 320px mobile to desktop
  6. All CTA buttons link to Calendly placeholder URL
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md -- Hero, Intro, Services, Process, Contact sections + barrel export
- [ ] 03-02-PLAN.md -- Icon components (social + tech) + TechStack, About, Footer sections
- [ ] 03-03-PLAN.md -- Page assembly with dividers, SEO metadata, and responsive verification

### Phase 03.1: Visual Polish & Styling (INSERTED)

**Goal:** Elevate visual presentation with depth, texture, and refined styling — gradient + grain background, editorial typography, magazine-style ruled lines, photo fade, and parallax-lite scroll effects
**Depends on:** Phase 3
**Requirements**: DESGN-01, DESGN-02, DESGN-03, DESGN-04, ANIM-01, ANIM-02, ANIM-03
**Success Criteria** (what must be TRUE):
  1. Background has visible depth with gradient and grain texture overlay
  2. Accent color is a cool muted blue/teal (WCAG AA compliant) replacing warm white
  3. Hero headline is commanding — larger, bolder, with tighter editorial tracking
  4. Service and process items are separated by thin horizontal ruled lines
  5. About photo edges fade/blend into the dark background
  6. Hero headline has subtle parallax depth effect on scroll
  7. All non-essential animations disabled when prefers-reduced-motion is set
**Plans:** 3 plans

Plans:
- [ ] 03.1-01-PLAN.md — Design system foundations (gradient + grain background, accent color, typography tokens, section divider fix)
- [ ] 03.1-02-PLAN.md — Component visual updates (ruled lines, hover states, photo fade, hero styling)
- [ ] 03.1-03-PLAN.md — Parallax hook + visual verification checkpoint

### Phase 4: Polish & Performance
**Goal**: Optimize for production launch with performance and accessibility validation
**Depends on**: Phase 3
**Requirements**: PERF-03
**Success Criteria** (what must be TRUE):
  1. Lighthouse Performance score >90 on mobile
  2. All interactive elements are keyboard-navigable with visible focus indicators
  3. Site tested on real mobile device (iPhone or Android) with no layout breaks or performance issues
  4. OpenGraph meta tags generate correct social media previews
  5. Core Web Vitals meet thresholds (CLS <0.1, LCP <2.5s, FID <100ms)
**Plans**: 3 plans

Plans:
- [ ] 04-01-PLAN.md — Image optimization (WebP conversion, profile.jpg fix), OG image, metadata
- [ ] 04-02-PLAN.md — Performance tuning (blur optimization, AnimatedSection reduced-motion), accessibility
- [ ] 04-03-PLAN.md — Deploy, Lighthouse audit, mobile verification checkpoint

### Phase 5: Future Architecture
**Goal**: Document routing and component structure for future blog and case studies sections without building them
**Depends on**: Phase 4
**Requirements**: (None — architecture planning only)
**Success Criteria** (what must be TRUE):
  1. Documentation exists describing `/blog` and `/case-studies` route structure
  2. Content data schema for blog posts and case studies is defined but not implemented
  3. Architecture notes explain how to add these routes without refactoring existing code
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 0/2 | Not started | - |
| 2. UI Primitives & Animation | 0/1 | Not started | - |
| 3. Core Content Sections | 0/3 | Not started | - |
| 4. Polish & Performance | 0/2 | Not started | - |
| 5. Future Architecture | 0/1 | Not started | - |
