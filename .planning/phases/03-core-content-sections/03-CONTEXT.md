# Phase 3: Core Content Sections - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement all visible content sections — Hero, Intro, Services, Process, Tech Stack, About, Contact, and Footer — delivering the complete single-page experience. All sections use the design system and UI primitives from Phases 1-2.

</domain>

<decisions>
## Implementation Decisions

### Hero presentation
- Partial viewport height (~70-80vh) — hint of next section peeks below
- Left-aligned text positioning — editorial, reads naturally
- Solid dark background — no gradient or texture, text does the work
- CTA as styled text link with arrow — minimal, confident, not a filled button

### Services display
- Minimal text blocks — title + description pairs with generous spacing, no card borders or grid
- Clean, editorial feel — let the typography carry the weight

### Process visualization
- Claude's discretion on how to visualize the 4 steps (numbered steps vs timeline vs other)
- Should feel consistent with the minimal text approach used elsewhere

### Tech stack display
- Horizontal row of small tech logos/icons — subtle and scannable
- Not text-only, not badges — actual logos

### Section headings
- Subtle, muted section labels — present but not dominant
- Not large bold headings, not invisible either

### Content flow & rhythm
- Sections separated by subtle thin horizontal divider lines
- Intro section flows as a continuation of the hero — same visual treatment, no break between them
- Medium content width (max ~900px) — comfortable reading with breathing room
- About section includes a photo alongside the bio text

### Contact section
- Consistent visual weight with other sections — not a bold finale, part of the flow
- CTA as styled text link with arrow — same style as hero CTA
- Email fallback displayed alongside

### Footer
- Two-row layout: copyright + location on one row, social links on another
- Social links as icons only (LinkedIn, GitHub, Email) — clean and compact

### Claude's Discretion
- Process section visualization approach (numbered steps, timeline, or other)
- Exact spacing and vertical rhythm between sections
- Loading/animation sequencing for section reveals
- About section photo + text layout arrangement
- Intro section copy length and formatting

</decisions>

<specifics>
## Specific Ideas

- Hero and intro should feel like one continuous thought — no visual break between them
- The overall feel is editorial and typographic — text does the heavy lifting, minimal decorative elements
- Tech stack logos should be subtle (perhaps muted/monochrome) to match the dark palette
- Divider lines between sections should be very thin and low-contrast — separation without distraction

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-core-content-sections*
*Context gathered: 2026-02-16*
