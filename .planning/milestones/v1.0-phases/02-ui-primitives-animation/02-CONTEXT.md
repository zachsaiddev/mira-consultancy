# Phase 2: UI Primitives & Animation - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Build reusable UI components and a scroll animation system validated for performance. These primitives will be consumed by all content sections in Phase 3. Includes Button, AnimatedSection wrapper, and any container/typography abstractions needed.

</domain>

<decisions>
## Implementation Decisions

### Animation feel
- Pure fade only — opacity transition, no slide/translate movement. Most restrained, editorial approach.
- Staggered element reveals within sections — heading fades in, then body text, then items. Creates a choreographed storytelling feel.
- Trigger once only — fade in the first time an element enters the viewport, stay visible after. No replay on scroll-back.
- All animations respect `prefers-reduced-motion` (instant appearance, no transition)
- Claude decides: fade duration, easing curve, stagger timing, and Intersection Observer threshold

### Button & CTA style
- Primary CTA is a text link with arrow — "Let's talk →" style, no box, no border, no fill. Minimal, editorial, Clint Balcom feel.
- CTA text uses warm accent color (#fafaf9) — distinct warmth, stands out from body text
- Arrow animates on hover — subtle slide right (~4-6px), inviting, shows interactivity
- Claude decides: whether a secondary button variant is needed (e.g., muted link style for email fallback)

### Hover & focus states
- Text links: underline appears on hover, sliding in from left (width animates 0 → full). No underline at rest. Classic editorial micro-interaction.
- All hover states use smooth transitions (~150-200ms ease) — polished, consistent with the measured animation approach
- Keyboard focus: subtle but visible indicator — thin outline or underline, accessible without dominating the design
- Claude decides: exact focus ring style, transition durations, and whether focus-visible is used to hide focus from mouse users

### Component scope
- No Card component — skip entirely. Content flows freely with spacing and typography only, matching the editorial no-surface-separation decision.
- Core primitives: Button, AnimatedSection — these are the clear requirements
- Claude decides: whether Container/Section and SectionLabel deserve React components or remain CSS utilities, and whether a Typography component adds value for Phase 3

### Claude's Discretion
- Fade duration and easing curve
- Stagger timing between elements
- Intersection Observer threshold
- Secondary button variant (if needed)
- Focus ring implementation details
- Container/Section as React component vs CSS utility
- SectionLabel as React component vs CSS class
- Typography component (yes/no)
- Any additional primitives needed for Phase 3 sections

</decisions>

<specifics>
## Specific Ideas

### Animation personality
The animations should feel editorial and restrained — pure fades with stagger, no bouncing, sliding, or parallax effects. The motion personality matches the Clint Balcom reference: content reveals itself naturally as you scroll, never demanding attention through movement.

### CTA interaction
The "Let's talk →" pattern with arrow slide-right on hover is the signature interaction. It should feel inviting without being flashy — the arrow motion is the most kinetic element on the page, everything else is more restrained.

### Link underlines
Underlines sliding in from the left is a deliberate editorial touch borrowed from magazine-style web design. It's a small detail that signals polish.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-ui-primitives-animation*
*Context gathered: 2026-02-16*
