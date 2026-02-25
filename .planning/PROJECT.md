# Mira Consultancy

## What This Is

A premium brochure website for Mira Consultancy — a technology consultancy run by Zach, specialising in custom internal application development, AI agent systems, and workflow automation for small to mid-sized businesses. Live at zachsaiddev.github.io/mira-consultancy. Single-page dark design with editorial typography, scroll animations, and Calendly-driven CTAs.

## Core Value

The site must look premium and load fast — a single-page experience that communicates credibility, showcases services clearly, and drives visitors to book a call. If the design doesn't feel confident and professional, nothing else matters.

## Requirements

### Validated

- Hero section with headline, subline, and Calendly CTA — v1.0
- Intro/positioning section with personal narrative — v1.0
- Services section showcasing 5 service offerings — v1.0
- "How I Work" process section (4 steps) — v1.0
- Tech stack display (logo row) — v1.0
- About section with personal bio — v1.0
- Contact/CTA section with Calendly link and email fallback — v1.0
- Footer with copyright, location, and social links — v1.0
- Dark/monochrome design with bold typography and generous whitespace — v1.0
- Subtle scroll animations (fade-ins, smooth transitions) — v1.0
- Mobile-responsive layout — v1.0
- Fast page load (static/SSG, minimal JS) — v1.0 (Lighthouse 98)
- Architecture that supports future blog and case studies sections — v1.0

### Active

(None — next milestone will define new requirements)

### Out of Scope

- Blog section — v2, architecture already accommodates it
- Case studies section — v2, architecture already accommodates it
- Contact form — using Calendly instead
- CMS integration — static content sufficient
- SEO optimisation beyond basics — content-first, optimise later
- Custom domain — currently on GitHub Pages subdirectory
- Dark/light mode toggle — dark-only design per design direction

## Context

**Current state:** v1.0 shipped. 2,421 LOC (TypeScript/TSX/CSS), 146 files. Next.js 15, Tailwind v4, Zod schemas, static export to GitHub Pages.

**Design references:**
- [Luciano Pereira](https://luciano-pereira.pages.dev) — clean structure, strong typography
- [Clint Balcom](https://www.clintbalcom.com) — narrative flow, personal-but-premium feel (closest match)
- [Graffio](https://graffio.co) — attention to craft, editorial quality, motion

**Design direction:** Bold, typographically strong, generous whitespace, dark/monochrome palette. Animated gradient orbs with film grain texture. Editorial typography with magazine-style ruled lines. Parallax scroll on hero. Should feel like a person, not a corporation.

**Founder:** Zach, London-based technology consultant. Background in internal tooling, system architecture, intelligent automation. Also performs live music across London.

**Known issues:**
- favicon.ico 404 on GitHub Pages subdirectory deploy (needs custom domain to fix)
- Calendly URL is still placeholder
- Phase 5 (future architecture docs) was scoped but not executed — architecture already supports extensibility via file structure

## Constraints

- **Tech stack**: Next.js (React), TypeScript, Tailwind CSS — non-negotiable
- **Performance**: Must be fast — static generation, minimal client-side JS
- **Extensibility**: Architecture must support adding blog/case studies routes later without redesign
- **Hosting**: GitHub Pages (static export)
- **CTAs**: All "Let's talk" / "Get in touch" buttons link to Calendly (URL TBD, use placeholder)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Calendly for CTAs | Removes need to build contact form, lowers friction for booking calls | Good |
| Dark/monochrome palette | Matches design references, feels premium and personal | Good |
| Subtle animations only | Restrained motion keeps focus on content, faster to build | Good |
| No CMS | Static content is simpler, faster, and sufficient for v1 | Good |
| Single-page landing | All content on one page, future sections as separate routes | Good |
| Tailwind v4 @theme | Better type safety and co-location vs v3 config | Good |
| Accent color #7a9eb8 muted steel blue | WCAG AA ~5.5:1, visually distinct from warm white | Good |
| Film grain via SVG feTurbulence | Static, fixed position, subtle texture at 0.035 opacity | Good |
| divide-y for magazine list pattern | Clean index-style rules without extra markup | Good |
| maskImage radial-gradient for photo fade | Center offset suits portrait photos, soft edge blend | Good |
| useParallax at speed 0.06 | Subtle depth without layout shift, rAF-batched | Good |
| blur(70px) on gradient orbs | Quadratic cost reduction vs 100px, visually equivalent | Good |
| metadataBase origin-only | Prevents double basePath in OG image URL on GitHub Pages | Good |
| GitHub Pages static export | Free hosting, sufficient for brochure site | Good |

---
*Last updated: 2026-02-25 after v1.0 milestone*
