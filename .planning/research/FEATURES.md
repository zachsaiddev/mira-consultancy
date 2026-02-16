# Feature Landscape

**Domain:** Technology Consultancy Brochure/Landing Page
**Researched:** 2026-02-16
**Confidence:** MEDIUM (Based on training data; web search tools unavailable for verification)

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Clear value proposition** | Visitors need to understand what you do within 3 seconds | Low | Hero section with headline + subheadline |
| **Service offerings** | Primary reason visitors come to site | Low | Dedicated section listing 3-5 core services |
| **Contact mechanism** | Dead-end sites feel unprofessional | Low | Clear CTA(s) throughout, footer contact info |
| **Professional visual design** | Premium consultancy = premium presentation | Medium | Dark/monochrome palette, bold typography, generous whitespace |
| **Mobile responsiveness** | 40-60% of traffic is mobile | Medium | Responsive grid, touch-friendly CTAs |
| **Fast load times** | Slow sites = untrustworthy | Medium | SSG approach already planned; optimize images, minimal JS |
| **About/credibility** | Solo consultancies need trust signals | Low | About section with photo, background, expertise |
| **Technology stack showcase** | Tech consultancy visitors want to see technical depth | Low | Dedicated section showing frameworks/tools/languages |
| **Process/methodology** | Clients want predictability | Low | How you work, what to expect |
| **Footer with essentials** | Navigation, legal, contact | Low | Links, copyright, privacy policy, contact |

## Differentiators

Features that set product apart. Not expected, but valued when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Scroll animations** | Creates premium, polished feel | Medium | Subtle fade-ins, parallax, progress indicators |
| **Case studies/portfolio** | Proof of work > claims | Medium-High | Not needed for MVP, but strong differentiator when added |
| **Testimonials** | Social proof from named clients | Low | Quotes with client name/company/photo |
| **Blog/thought leadership** | Demonstrates expertise, SEO benefit | High | Not MVP; future extension |
| **Availability indicator** | "Currently available for Q2 2026 projects" | Low | Reduces friction, sets expectations |
| **Specific niche positioning** | "React/TypeScript specialist" vs "web developer" | Low | Copy/messaging differentiation |
| **Process diagram/visual** | Shows methodology visually | Medium | Flowchart or timeline of engagement phases |
| **Technology deep-dive** | Interactive tech stack or detailed explanations | Medium-High | Goes beyond logo grid to explain choices |
| **Personal brand elements** | Unique photography, custom illustrations | Medium | Distinguishes from template sites |
| **Email newsletter signup** | List building for long-term relationship | Low | Simple form in footer or dedicated section |
| **Work preference indicators** | "Remote-first", "Async-friendly", "Contract preferred" | Low | Filters leads, attracts aligned clients |
| **Response time commitment** | "Replies within 24 hours" | Low | Sets expectations, builds trust |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Complex multi-page navigation** | Single-page site scope; adds maintenance burden | Anchor links to sections on same page |
| **Blog in MVP** | Requires ongoing content commitment; adds technical complexity | Plan architecture for future addition; don't build now |
| **Custom booking system** | Calendly integration is simpler, more reliable | Link to Calendly for scheduling |
| **Client portal/dashboard** | Out of scope for brochure site | Separate tool if needed later |
| **Pricing calculator** | Consultancy pricing is custom/complex | "Contact for quote" approach |
| **Live chat widget** | Adds overhead, often ignored, slows site | Contact form + email + Calendly |
| **Animation overload** | Distracting, slows site, hurts accessibility | Subtle scroll animations only |
| **Social media feeds** | External dependency, can break, looks dated | Social links in footer only |
| **Unnecessary form fields** | Reduces conversions | Calendly handles intake; contact form minimal |
| **Auto-playing video** | Annoying, accessibility issue, bandwidth cost | Static images or user-triggered video |
| **Cookie consent banner** | No tracking/analytics = no need (unless EU traffic) | Only add if tracking implemented |
| **Multiple CTAs competing** | Confused visitors don't convert | Single primary CTA (Calendly), repeated at logical points |

## Feature Dependencies

```
Mobile responsiveness → All sections (baseline requirement)
Fast load times → Image optimization + SSG + minimal JS
Scroll animations → Performance budget management
Case studies (future) → Architecture planning now (routing, MDX/CMS)
Blog (future) → Architecture planning now (routing, MDX/CMS)
Contact form → Form handling service (Formspree, Netlify Forms, etc.)
```

**Critical path for MVP:**
```
Hero (value prop) → Services → Process → Tech Stack → About → Contact
```

**Future extensions (plan architecture, don't build):**
```
Blog → Case Studies → Portfolio Gallery
```

## MVP Recommendation

### Must Have (Build Now)

1. **Hero with clear value proposition** - First impression, establishes credibility
2. **Services section** - Core content, why visitors come
3. **Process section** - Builds confidence, reduces objections
4. **Tech stack section** - Demonstrates technical depth
5. **About section** - Trust building for solo consultancy
6. **Contact CTAs** - Calendly links, simple contact form fallback
7. **Footer** - Navigation, contact info, copyright
8. **Mobile responsiveness** - 40-60% of traffic
9. **Fast performance** - Trust signal, SEO benefit
10. **Subtle scroll animations** - Premium feel, differentiates from templates

### Strong Differentiators (Consider for MVP)

1. **Testimonials** - If available, strong social proof (Low complexity)
2. **Availability indicator** - "Available for projects starting March 2026" (Low complexity)
3. **Work preference indicators** - Remote, async, contract terms (Low complexity)
4. **Process diagram/visual** - Makes methodology tangible (Medium complexity)

### Defer to Post-Launch

1. **Case studies** - Requires completed projects, content creation (Build architecture to support)
2. **Blog** - Ongoing commitment, not needed for initial credibility (Build architecture to support)
3. **Newsletter signup** - Premature without content plan
4. **Advanced animations** - Diminishing returns after subtle effects

## Complexity Assessment

| Feature Category | Total Complexity | Time Estimate | Priority |
|------------------|------------------|---------------|----------|
| Core sections (hero, services, process, tech, about) | Low | 1-2 days | P0 |
| Responsive layout + design system | Medium | 2-3 days | P0 |
| Scroll animations (subtle) | Medium | 1-2 days | P1 |
| Contact integration (Calendly + form) | Low-Medium | 1 day | P0 |
| Performance optimization | Medium | 1 day | P0 |
| Testimonials section | Low | 0.5 day | P1 |
| Case study architecture (no content) | Medium | 1 day | P2 |

**Estimated MVP timeline:** 7-10 days (includes design, development, polish)

## Feature Validation Notes

**Table stakes validated against:**
- Solo consultant portfolio patterns (personal experience, training data)
- Conversion optimization principles (clear CTA, trust signals, mobile-first)
- Technical consultancy norms (showcase tech stack, demonstrate process)

**Differentiators based on:**
- Premium positioning (scroll animations, custom design vs templates)
- Solo consultancy needs (availability, work preferences, personal brand)
- Future-proofing (case study/blog architecture without content commitment)

**Anti-features informed by:**
- Scope constraints (single-page, brochure site, no backend complexity)
- Maintenance burden (solo founder can't commit to blog immediately)
- Conversion best practices (single clear CTA vs multiple competing actions)

## Confidence Assessment

| Area | Confidence | Rationale |
|------|------------|-----------|
| Table stakes | MEDIUM | Based on training data patterns for consultancy sites; couldn't verify with current examples due to tool restrictions |
| Differentiators | MEDIUM | Drawn from UX best practices and premium positioning principles; specific examples like Clint Balcom not researched |
| Anti-features | HIGH | Based on stated project scope, technical constraints, and solo founder context |
| Complexity estimates | MEDIUM-HIGH | Align with SSG + modern frontend development; assume Next.js/similar stack |

## Sources

**Note:** Web search and documentation tools were unavailable during this research. Findings are based on:
- Training data on consultancy/freelancer website patterns (pre-2025)
- UX/conversion optimization principles
- Technical constraints from project context (SSG, single-page, extensible architecture)
- Solo consultancy positioning requirements

**Recommended validation:**
1. Review 5-10 premium independent consultancy sites (e.g., Clint Balcom, Kent C. Dodds, Tanner Linsley)
2. Analyze competitor positioning and feature sets
3. Verify current design trends (dark mode preferences, animation patterns, typography choices)
4. Validate with user research if available (what clients look for when hiring consultants)

**Limitation:** This research reflects general patterns but lacks 2026-specific verification. Recommend spot-checking 2-3 premium consultancy sites before finalizing feature set.
