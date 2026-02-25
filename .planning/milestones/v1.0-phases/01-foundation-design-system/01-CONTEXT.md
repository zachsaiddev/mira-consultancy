# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the technical foundation and design system that all components depend on: Next.js project setup with static export, dark color palette with WCAG AA compliance, responsive typography system, font loading without FOUT, and typed TypeScript content schema for services, tech stack, and process steps.

</domain>

<decisions>
## Implementation Decisions

### Color palette
- Dark monochrome palette — Claude decides base dark shade (pure black vs charcoal) based on references and contrast requirements
- Subtle accent using neutral warm off-whites (not a brand color — warm whites vs cool whites for emphasis)
- No surface separation — no cards, borders, or elevation. Content flows freely, sections distinguished by spacing and typography alone. Most editorial approach.
- Overall feel: sophisticated, restrained, monochrome with warmth from off-white accents

### Typography
- Geometric sans-serif for headings — clean, modern, tech-forward (e.g. Inter, Manrope)
- Confident & measured type scale — large but not overwhelming headings. Clear hierarchy without being shouty. Closer to Clint Balcom's restraint than Graffio's drama.
- Modular type scale approach borrowed from Luciano Pereira — tight letter-spacing on headings, structured scale ratios
- Claude decides: font pairing (same family or two), and whether monospace is used for tech-related content

### Spacing & density
- Narrow prose-width content area (~700-800px max) — centered, lots of margin, editorial feel
- Content-sized hero — not full viewport. Visitor sees the start of next section peeking in. Inviting rather than dramatic.
- Claude decides: section spacing rhythm, and grid vs stacked layout for services (5 items) and process steps (4 items)

### Claude's Discretion
- Base dark shade (pure black vs charcoal)
- Font pairing strategy
- Monospace accent usage for tech content
- Section vertical spacing rhythm
- Services/process layout (stacked vs grid)
- Exact type scale ratios and sizes

</decisions>

<specifics>
## Specific Ideas

### Reference direction (composite of three sites)
- **Clint Balcom (primary):** Narrative flow (content reads like a story, not rigid blocks), restraint & minimalism (nothing decorative, content talks), personal-but-premium tone (person not corporation, confident without stiff). Apply this feel to a dark palette.
- **Luciano Pereira:** Borrow the type system approach (modular scale, tight letter-spacing on headings, small-caps section labels) and clean structural organization.
- **Graffio:** Borrow bold display heading confidence and editorial whitespace generosity.

### Synthesis
The site should feel like Clint Balcom's personal-but-premium narrative approach, rendered in a dark monochrome palette, with Luciano's typographic precision and Graffio's confident whitespace. Minimal, editorial, warm.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-02-16*
