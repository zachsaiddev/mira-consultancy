# Mira Consultancy

## What This Is

A brochure website for Mira Consultancy — a technology consultancy run by Zach, specialising in custom internal application development, AI agent systems, and workflow automation for small to mid-sized businesses. The site serves as the primary online presence: sharp, fast, and designed to convert visitors into discovery calls via Calendly.

## Core Value

The site must look premium and load fast — a single-page experience that communicates credibility, showcases services clearly, and drives visitors to book a call. If the design doesn't feel confident and professional, nothing else matters.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with headline, subline, and Calendly CTA
- [ ] Intro/positioning section with personal narrative
- [ ] Services section showcasing 5 service offerings
- [ ] "How I Work" process section (4 steps)
- [ ] Tech stack display (logo row or text)
- [ ] About section with personal bio
- [ ] Contact/CTA section with Calendly link and email fallback
- [ ] Footer with copyright, location, and social links
- [ ] Dark/monochrome design with bold typography and generous whitespace
- [ ] Subtle scroll animations (fade-ins, smooth transitions)
- [ ] Mobile-responsive layout
- [ ] Fast page load (static/SSG, minimal JS)
- [ ] Architecture that supports future blog and case studies sections

### Out of Scope

- Blog section — v2, but architecture should accommodate it
- Case studies section — v2, but architecture should accommodate it
- Contact form — using Calendly instead
- CMS integration — static content for now
- Analytics/tracking — can be added post-launch
- SEO optimisation beyond basics — content-first, optimise later

## Context

**Design references:**
- [Luciano Pereira](https://luciano-pereira.pages.dev) — clean structure, strong typography
- [Clint Balcom](https://www.clintbalcom.com) — narrative flow, personal-but-premium feel (closest match)
- [Graffio](https://graffio.co) — attention to craft, editorial quality, motion

**Design direction:** Bold, typographically strong, generous whitespace, dark/monochrome palette. Should feel like a person, not a corporation. Professional but approachable — confident without being stiff. Subtle animations (fade-ins on scroll, smooth transitions) — polished but restrained.

**Founder:** Zach, London-based technology consultant. Background in internal tooling, system architecture, intelligent automation. Also performs live music across London.

**All website copy has been provided** — hero, intro, services, process, tech stack, about, contact, footer. Content is final and should be used as-is.

## Constraints

- **Tech stack**: Next.js (React), TypeScript, Tailwind CSS — non-negotiable
- **Performance**: Must be fast — static generation, minimal client-side JS
- **Extensibility**: Architecture must support adding blog/case studies routes later without redesign
- **Domain**: TBD — use placeholder where needed
- **Hosting**: TBD — build framework-agnostic deployment
- **CTAs**: All "Let's talk" / "Get in touch" buttons link to Calendly (URL TBD, use placeholder)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Calendly for CTAs | Removes need to build contact form, lowers friction for booking calls | — Pending |
| Dark/monochrome palette | Matches design references, feels premium and personal | — Pending |
| Subtle animations only | Restrained motion keeps focus on content, faster to build | — Pending |
| No CMS | Static content is simpler, faster, and sufficient for v1 | — Pending |
| Single-page landing | All content on one page, future sections as separate routes | — Pending |

---
*Last updated: 2026-02-16 after initialization*
