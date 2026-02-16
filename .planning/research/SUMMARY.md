# Project Research Summary

**Project:** Mira Consultancy Premium Brochure Site
**Domain:** Technology Consultancy Single-Page Landing/Portfolio
**Researched:** 2026-02-16
**Confidence:** MEDIUM-HIGH

## Executive Summary

Mira Consultancy is a premium single-page brochure site for a technology consultancy. The research reveals a clear path: build a statically-generated Next.js 15 site using App Router with Tailwind CSS 4, emphasizing bold typography, dark theme aesthetics, and subtle scroll animations. The architecture should be component-based with server-first rendering, using Intersection Observer for animations rather than heavy libraries. Content should live in typed TypeScript objects rather than being hardcoded in components.

The recommended approach prioritizes performance and accessibility over visual complexity. Use Next.js static export (`output: 'export'`) for zero-cost CDN hosting, implement a contrast-safe dark color system (WCAG AA minimum), and animate only GPU-composited properties (transform, opacity) to avoid Core Web Vitals penalties. The site should be mobile-first with responsive typography that scales gracefully from 320px to desktop. Start with essential sections (Hero, Services, Process, Tech Stack, About, Contact) and plan architecture for future extensions (blog, case studies) without building them immediately.

Key risks center on animation performance and accessibility. Over-animating causes motion sickness and mobile performance collapse. Dark theme implementations often fail WCAG contrast requirements, creating legal liability for a consultancy. Font loading flash (FOUT/FOIT) on typography-heavy sites destroys first impressions. Mitigation requires respecting `prefers-reduced-motion`, testing all text/background pairs with contrast checkers, using `next/font` for automatic optimization, and continuous testing on real mobile devices (not just browser DevTools).

## Key Findings

### Recommended Stack

The stack is user-specified and modern: Next.js 15 with React 19, TypeScript 5.x, and Tailwind CSS 4.x. Complementary choices should emphasize zero-bundle-cost solutions where possible.

**Core technologies:**
- **Next.js 15** (App Router, static export): Framework with built-in SSG, optimizations, and zero-runtime-cost static generation — perfect for brochure sites
- **TypeScript 5.x**: Type safety for content, component props, and animation configurations
- **Tailwind CSS 4.x**: Utility-first styling with automatic purging, responsive utilities, and design system consistency
- **next/font with Inter/Geist Sans**: Automatic font optimization, subsetting, and self-hosting — prevents FOUT/FOIT that plagues typography-heavy sites
- **Intersection Observer + CSS animations (primary)**: Native browser API, zero bundle cost, GPU-accelerated — sufficient for subtle fade-ins
- **Framer Motion (optional fallback)**: Only if orchestrated animations needed beyond simple fade-ins (~30KB gzipped cost)

**What NOT to use:**
- GSAP (commercial license, overkill for subtle animations)
- Locomotive Scroll (heavy, Next.js hydration conflicts)
- shadcn/ui (app UI design system, not editorial/brochure)
- Any CMS or database (premature for v1 static content)
- CSS-in-JS libraries (runtime cost when Tailwind is specified)

### Expected Features

Research identifies clear table stakes vs. differentiators vs. anti-features for consultancy brochure sites.

**Must have (table stakes):**
- Clear value proposition in hero (3-second comprehension test)
- Service offerings section (primary visit reason)
- Process/methodology section (builds client confidence)
- Technology stack showcase (demonstrates technical depth)
- About section with credibility signals (critical for solo consultancy)
- Contact CTAs (Calendly integration + fallback form)
- Mobile responsiveness (40-60% of brochure site traffic)
- Fast load times (trust signal, SEO benefit)
- Professional visual design (dark theme, bold typography, whitespace)
- Footer with essentials (navigation, contact, copyright)

**Should have (competitive differentiators):**
- Subtle scroll animations (premium feel without distraction)
- Testimonials with named clients (social proof if available)
- Availability indicator ("Available Q2 2026 projects")
- Work preference indicators (remote-first, async-friendly, contract)
- Process diagram/visual (makes methodology tangible)

**Defer (v2+):**
- Case studies (requires completed projects, content creation)
- Blog/thought leadership (ongoing commitment, premature)
- Newsletter signup (needs content plan first)
- Advanced animations (diminishing returns after subtle effects)

**Anti-features (explicitly don't build):**
- Blog in MVP (defer, but plan architecture to support)
- Custom booking system (use Calendly)
- Client portal/dashboard (out of scope)
- Pricing calculator (consultancy = custom quotes)
- Live chat widget (adds overhead, slows site)
- Animation overload (accessibility violation, distracting)
- Auto-playing video (annoying, performance cost)

### Architecture Approach

Next.js App Router with server-first, component-based architecture. Store project files outside `app/` directory to keep routing clear and separate concerns.

**Major components:**

1. **Root Layout (`app/layout.tsx`)** — HTML structure, global metadata, font configuration, providers (server component)
2. **Page Component (`app/page.tsx`)** — Route orchestration, imports and composes all sections (server component)
3. **Section Components (`components/sections/`)** — Feature-specific blocks like Hero, Services, Process, TechStack, About, Contact, Footer (server components by default)
4. **UI Primitives (`components/ui/`)** — Reusable elements like Button, Card, Container, Typography (server components)
5. **Animation Wrapper (`components/ui/AnimatedSection.tsx`)** — Client component using Intersection Observer for scroll triggers
6. **Content Store (`lib/content.ts`)** — Typed TypeScript objects for services, tech stack, process steps (imported by sections at build time)
7. **Type Definitions (`lib/types.ts`)** — Interfaces for Service, TechStack, ProcessStep, etc.

**Key patterns to follow:**
- Server Components by default (smaller bundle, better performance)
- Client Components at smallest possible boundary (mark `'use client'` only when using hooks/events)
- Content as data (typed objects in `lib/content.ts`, not hardcoded in JSX)
- Composition over configuration (build pages by composing simple components)
- Static generation with `output: 'export'` (deploy to CDN, zero server cost)

**Anti-patterns to avoid:**
- Client components everywhere (increases bundle size unnecessarily)
- Inline styles instead of Tailwind classes (no design system consistency)
- Hardcoded content in components (hard to update, no reusability)
- Deep component nesting (>3 levels causes prop drilling, performance overhead)
- Over-engineering for future features (YAGNI — build blog architecture when actually adding blog)

**File structure:**
```
mira-consultancy/
├── app/                    # Routing only (layout, page, future blog/case-studies)
├── components/
│   ├── sections/          # Hero, Services, Process, TechStack, About, Contact, Footer
│   ├── ui/                # Button, Card, Container, Typography, AnimatedSection
│   └── providers/         # ThemeProvider if needed
├── lib/
│   ├── content.ts         # Services, tech stack, process data
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Helper functions (cn utility)
├── public/                # Static assets (images)
├── styles/                # globals.css (Tailwind directives)
└── next.config.ts         # { output: 'export' }
```

### Critical Pitfalls

Research identified five critical pitfalls that can destroy project success if not addressed early.

1. **Animation-Induced Layout Shift (CLS Killer)** — Animating non-composited properties (height, width, top, left, margin) triggers layout recalculations, causing Core Web Vitals failure and janky UX. **Prevention:** Animate only `transform`, `opacity`, `filter` (GPU-accelerated). Reserve layout space for animated elements. Test with Chrome Performance monitor. Set animation constraints in Phase 1 before patterns solidify.

2. **Dark Theme Contrast Failure (WCAG AA/AAA)** — Gray-on-dark-gray looks elegant but fails WCAG contrast requirements, creating accessibility violations and legal liability. **Prevention:** Test all text/background pairs with WebAIM Contrast Checker. Minimum 4.5:1 for body text, 3:1 for large text, 7:1 for AAA. Avoid pure black backgrounds (#000), use dark grays (#0F0F0F). Create contrast-safe color system in Phase 1. Run axe DevTools continuously.

3. **Font Loading Flash (FOUT/FOIT)** — Custom fonts load slowly, causing blank page or unstyled text for 2-5 seconds on typography-heavy site. **Prevention:** Use `next/font` for automatic optimization, subsetting, and preloading. Self-host fonts (don't rely on Google Fonts CDN). Limit to 2-3 font weights. Use `font-display: swap`. Configure in Phase 1 before building components.

4. **Mobile Scroll Performance Collapse** — Scroll animations smooth on desktop but stutter on mobile (60%+ of traffic). **Prevention:** Use Intersection Observer, not scroll event listeners. Animate only composited properties. Use passive event listeners. Test on real devices (iPhone SE, mid-range Android), not just Chrome DevTools. Use CPU throttling (4x) to simulate low-end mobile. Critical to test from first animation in Phase 2.

5. **Over-Animating (Motion Sickness & Cognitive Overload)** — Every element animating causes nausea and distraction. Ignoring `prefers-reduced-motion` is WCAG 2.1 violation. **Prevention:** Respect `prefers-reduced-motion` media query. Animation hierarchy (1-2 elements per viewport section max). Subtle > dramatic (fade-ins 0.3-0.5s, not flying/rotating). No parallax on mobile. Design rule: "Animations should feel discovered, not imposed." Establish guidelines in Phase 2 before animating.

## Implications for Roadmap

Based on combined research, the roadmap should follow a foundation-first, component-layered approach with continuous performance validation.

### Suggested Phase Structure

#### Phase 1: Foundation & Design System
**Rationale:** Everything depends on configuration, types, content structure, and root layout. Decisions here lock in patterns for entire project. Front-load the hard choices (color system, animation strategy, font configuration) to avoid costly refactoring.

**Delivers:**
- Next.js project with `output: 'export'` configured
- Tailwind CSS 4 setup with contrast-safe dark color system
- TypeScript strict mode with base type definitions
- Font configuration (`next/font` with Inter/Geist Sans)
- Root layout with metadata, HTML structure
- Content data schema and initial content objects
- Animation strategy decision (Intersection Observer + CSS vs. Framer Motion)

**Addresses (from FEATURES.md):**
- Foundation for professional visual design
- Performance baseline (SSG configuration)
- Mobile responsiveness infrastructure

**Avoids (from PITFALLS.md):**
- Dark theme contrast failures (test color pairs upfront)
- Font loading flash (configure next/font correctly)
- Wrong animation library choice (decide before building)

**Research flag:** Standard Next.js patterns — skip `/gsd:research-phase`.

---

#### Phase 2: UI Primitives & Animation System
**Rationale:** Section components depend on these reusable building blocks. Building primitives first prevents inconsistent patterns and enables parallel section development later. Animation wrapper must be tested for performance before spreading throughout site.

**Delivers:**
- Base UI components (Container, Typography, Button, Card)
- AnimatedSection wrapper (client component with Intersection Observer)
- Animation timing constants and easing standards
- Mobile responsiveness testing baseline
- Performance testing infrastructure (Lighthouse, Chrome DevTools)

**Addresses (from FEATURES.md):**
- Professional visual design (consistent components)
- Subtle scroll animations (AnimatedSection wrapper)

**Avoids (from PITFALLS.md):**
- Animation-induced layout shift (test AnimatedSection thoroughly)
- Mobile scroll performance collapse (validate on real devices)
- Inconsistent animation timing (establish constants)
- Hydration mismatches (test SSR vs. client rendering)

**Research flag:** Animation performance patterns need validation — consider `/gsd:research-phase` for Intersection Observer implementation best practices.

---

#### Phase 3: Core Sections (MVP Content)
**Rationale:** Build sections in visual/user-flow order for easier testing. Group by dependency (Hero → Services → Process → Tech Stack → About → Contact → Footer). All depend on UI primitives from Phase 2 and content from Phase 1.

**Delivers:**
- Hero with value proposition and CTA
- Services section with offerings
- Process/methodology section
- Tech stack showcase section
- About section with credibility signals
- Contact section with Calendly integration
- Footer with navigation and contact info

**Addresses (from FEATURES.md):**
- Clear value proposition (Hero)
- Service offerings (Services)
- Process/methodology (Process)
- Technology stack showcase (TechStack)
- About/credibility (About)
- Contact mechanism (Contact, Footer)

**Avoids (from PITFALLS.md):**
- Over-animating (apply 1-2 animations per section max)
- Typography scale breaks (test at 320px width)
- Missing semantic HTML (use proper landmarks, heading hierarchy)
- Next.js Image misuse (use next/image with priority for hero)

**Research flag:** Standard section patterns — skip `/gsd:research-phase`.

---

#### Phase 4: Polish & Performance Optimization
**Rationale:** Content complete, now optimize for production. This phase catches issues missed during development and ensures launch readiness.

**Delivers:**
- Performance optimization (image compression, bundle analysis)
- Accessibility audit and fixes (contrast, keyboard nav, screen reader)
- OpenGraph and SEO metadata
- Mobile device testing on real hardware
- Core Web Vitals validation (CLS <0.1, LCP <2.5s, FID <100ms)
- Loading states and progressive image loading
- Error boundaries (404, error.tsx)

**Addresses (from FEATURES.md):**
- Fast load times (optimization)
- Mobile responsiveness (real device testing)
- Professional visual design (polish)

**Avoids (from PITFALLS.md):**
- All critical pitfalls (final validation)
- Missing meta tags & OpenGraph (share preview testing)
- Not testing on actual mobile devices (physical device validation)
- No loading states (add skeleton screens)

**Research flag:** Standard optimization patterns — skip `/gsd:research-phase`.

---

#### Phase 5: Future Extensions (Architecture Planning Only)
**Rationale:** Don't build blog or case studies now, but plan architecture to support them without refactoring. Demonstrates extensibility thinking for consultancy credibility.

**Delivers:**
- Documented routing structure for `/blog` and `/case-studies`
- Content data schema for posts and case studies
- Component stubs or architecture diagrams (no implementation)
- Migration notes for static → dynamic if needed later

**Addresses (from FEATURES.md):**
- Blog/case study architecture (deferred features)

**Avoids (from PITFALLS.md):**
- Over-engineering for future (document, don't build)

**Research flag:** Skip — this is planning/documentation only, no implementation.

---

### Phase Ordering Rationale

**Why this order:**
1. **Foundation first** — Configuration, types, content schema, color system, and font setup lock in patterns. Changing these later requires refactoring all components.
2. **Primitives before sections** — Building reusable UI components and animation wrapper enables consistent, parallel section development. Prevents copy-paste code duplication.
3. **Sections in user flow order** — Hero → Services → Process → Tech → About → Contact → Footer matches visual layout and user journey, making testing intuitive.
4. **Polish as dedicated phase** — Optimization and accessibility often get skipped when mixed with feature work. Dedicated phase ensures launch quality.
5. **Future planning last** — Demonstrates extensibility without YAGNI violations. Architecture is proven working before planning extensions.

**Why this grouping:**
- **Phase 1** groups all foundational decisions that affect every other component
- **Phase 2** groups all reusable abstractions that sections depend on
- **Phase 3** groups all content sections (parallel after Phase 2 completes)
- **Phase 4** groups all validation and optimization (requires complete site)
- **Phase 5** groups all forward-looking planning (no dependencies)

**How this avoids pitfalls:**
- Front-loads critical decisions (color system, fonts, animation strategy) before patterns solidify
- Forces performance testing early (Phase 2 animation validation)
- Separates polish/optimization into dedicated phase (not rushed at end)
- Plans future without over-engineering (Phase 5 documents, doesn't implement)

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 2 (UI Primitives & Animation):** Intersection Observer implementation patterns, scroll animation performance optimization, hydration handling for client components. Complex domain with many pitfalls. Recommend `/gsd:research-phase` for AnimatedSection implementation.

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** Next.js configuration, Tailwind setup, TypeScript — well-documented official docs
- **Phase 3 (Core Sections):** Standard React component patterns, composition over configuration — established practices
- **Phase 4 (Polish):** Performance optimization, accessibility auditing — standard tooling and checklists
- **Phase 5 (Future Planning):** Documentation and architecture notes — no research needed

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | User-specified core stack. Complementary recommendations (next/font, Intersection Observer) based on official Next.js docs and performance best practices. |
| Features | MEDIUM | Based on training data patterns for consultancy sites. Couldn't verify with 2026 examples due to tool restrictions, but core table stakes (value prop, services, contact) are timeless. Differentiators align with premium positioning principles. |
| Architecture | HIGH | All recommendations from official Next.js documentation (v16.1.6, updated 2026-02-11). Server Component patterns, static export, and file structure sourced from Next.js best practices. |
| Pitfalls | MEDIUM-HIGH | Critical pitfalls (CLS, WCAG contrast, FOUT/FOIT, mobile performance) based on established Web Vitals and accessibility standards. Animation-specific pitfalls drawn from performance optimization principles. Couldn't verify with 2026 sources but core principles (GPU-composited animations, contrast ratios, font optimization) are foundational. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

Areas where research was inconclusive or needs validation during implementation:

- **Animation library decision:** Research recommends starting with Intersection Observer + CSS, adding Framer Motion only if needed. Validate during Phase 2 whether native approaches suffice for desired subtle effects. Test orchestration needs before committing to library.

- **Specific font pairing:** Research suggests Inter/Geist Sans for body, but display font pairing (Instrument Serif, Syne, etc.) needs design validation. Test typography hierarchy and contrast during Phase 1.

- **Contact form handling:** Research recommends Calendly for scheduling, but fallback contact form needs service decision (Formspree, Netlify Forms, or custom API route). Validate during Phase 3 whether static export constraint allows desired form functionality.

- **Real device testing baseline:** Research emphasizes testing on real mobile devices (iPhone SE, mid-range Android), but specific device targets should be validated against analytics/user research if available. Define target devices during Phase 1.

- **Dark theme color values:** Research provides principles (avoid pure black, test contrast), but specific color palette needs design iteration. Generate and validate complete color system during Phase 1 with contrast checker.

- **Testimonial availability:** Features research lists testimonials as low-complexity differentiator, but assumes availability. Validate during requirements whether client testimonials exist for Phase 3 inclusion or defer to post-launch.

## Sources

### Primary (HIGH confidence)

**Stack:**
- Next.js documentation (nextjs.org/docs) — Official Next.js 15 docs for App Router, static exports, next/font, next/image
- Tailwind CSS v4 documentation (tailwindcss.com) — Official Tailwind configuration and utilities
- User-specified stack requirements (Next.js 15, TypeScript 5.x, React 19, Tailwind CSS 4.x)

**Architecture:**
- [Next.js App Router Documentation](https://nextjs.org/docs/app/building-your-application/routing) (v16.1.6, updated 2026-02-11)
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) (v16.1.6, updated 2026-02-11)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) (v16.1.6, updated 2026-02-11)
- [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) (v16.1.6, updated 2026-02-11)

**Pitfalls:**
- WCAG 2.1 accessibility standards (webaim.org/resources/contrastchecker)
- Web Vitals specifications (web.dev/vitals) — CLS, LCP, FID metrics and thresholds
- Next.js performance best practices (as of January 2025)
- MDN Web Docs for Intersection Observer API, CSS animations, GPU-accelerated transforms

### Secondary (MEDIUM confidence)

**Features:**
- Training data on consultancy/freelancer website patterns (pre-2025)
- UX/conversion optimization principles (clear CTAs, trust signals, mobile-first)
- Solo consultancy positioning requirements (availability indicators, work preferences)

**Pitfalls:**
- Common patterns from portfolio/agency site analysis (training data)
- Established performance best practices (animation performance, mobile optimization)

### Tertiary (LOW confidence, needs validation)

**Features:**
- Specific consultancy site examples mentioned (Clint Balcom, Kent C. Dodds, Tanner Linsley) — not verified with 2026 data
- Estimated complexity and time for features — based on Next.js SSG patterns but not project-specific

**Recommended verification before implementation:**
1. Review 3-5 premium independent consultancy sites (2026 design trends, feature sets)
2. Validate scroll animation library decision during Phase 2 (Intersection Observer vs. Framer Motion for subtle effects)
3. Test dark theme color palette with real devices (not just calibrated monitors)
4. Confirm contact form service compatibility with static export (Formspree, Netlify Forms, or custom solution)

---

*Research completed: 2026-02-16*
*Ready for roadmap: YES*
*Recommended next step: Define detailed requirements, then create phased roadmap*
