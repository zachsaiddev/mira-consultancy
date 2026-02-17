# Phase 4: Polish & Performance - Context

**Gathered:** 2026-02-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize the existing site for production launch — performance tuning, accessibility audit, mobile verification, and social meta tags. No new features or visual changes. The site is functionally complete; this phase makes it production-ready.

</domain>

<decisions>
## Implementation Decisions

### Performance targets
- Both Lighthouse score (>90 mobile) AND perceived speed matter equally
- Keep all visual effects (gradient orbs, parallax, animations) — optimize what's there, don't remove
- Convert all images to modern formats (WebP/AVIF) for smaller file sizes
- Use Lighthouse score as the primary benchmark — no specific load time target

### Mobile testing
- Primary device: iPhone (iOS Safari)
- User will test on their actual iPhone — Claude handles DevTools verification during development
- Everything matters: layout, text readability, touch targets, animations, scrolling
- Must look decent in both portrait AND landscape orientation

### Social previews
- OG image: Mira logo + tagline on dark background — clean and branded
- Description text: Use hero subline as-is ("Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.")
- Standard OG tags that work across all platforms (LinkedIn, Twitter, iMessage, Slack, etc.)

### Accessibility
- WCAG AA baseline — contrast ratios, keyboard nav, focus indicators, alt text
- Run automated audit (axe/Lighthouse) and fix ALL flagged issues
- Existing reduced-motion and focus-visible support already in place — verify and extend as needed

### Claude's Discretion
- OG image method (static file vs auto-generated) — pick what's simplest and looks good
- Image compression levels — balance quality vs file size
- Specific accessibility fixes — judge severity from audit results
- Any performance optimizations that don't remove visual effects

</decisions>

<specifics>
## Specific Ideas

- Site is already deployed on GitHub Pages — performance testing should use the live deployed URL
- Profile photo (zach.png) is a large PNG that should be priority for image optimization
- The gradient orb rAF loops and parallax hook are the main JS cost — optimize but preserve

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-polish-performance*
*Context gathered: 2026-02-17*
