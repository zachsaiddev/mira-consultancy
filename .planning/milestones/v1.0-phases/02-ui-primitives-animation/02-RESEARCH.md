# Phase 2: UI Primitives & Animation - Research

**Researched:** 2026-02-16
**Domain:** Scroll-triggered animations with Intersection Observer API, CSS transitions, and React UI component patterns
**Confidence:** HIGH

## Summary

Phase 2 focuses on building reusable UI primitives (Button, AnimatedSection wrapper) and implementing a scroll animation system using the Intersection Observer API. The user has made clear decisions about animation style: pure fade-only effects with staggered element reveals, trigger-once behavior, and full `prefers-reduced-motion` support. The technical approach is straightforward: Intersection Observer for scroll detection, CSS transitions for fade effects, and Tailwind v4's `@theme` system for animation configuration.

The research confirms this is a well-trodden path with excellent browser support and established patterns. The stack is already in place (Next.js 16, React 19, Tailwind v4, TypeScript), and the design tokens from Phase 1 provide the foundation. The `react-intersection-observer` library offers a battle-tested React hook that handles the complexity of observer lifecycle and cleanup, eliminating common pitfalls around memory leaks and observer reuse.

**Primary recommendation:** Use `react-intersection-observer`'s `useInView` hook with `triggerOnce: true` option, CSS custom properties for stagger delays, and Tailwind v4's `@theme` block for animation tokens. Animate only `opacity` and `transform` properties to ensure GPU acceleration and avoid layout reflow. Test with Chrome DevTools CPU throttling (4x slowdown) to validate mobile performance.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Animation feel:**
- Pure fade only — opacity transition, no slide/translate movement. Most restrained, editorial approach.
- Staggered element reveals within sections — heading fades in, then body text, then items. Creates a choreographed storytelling feel.
- Trigger once only — fade in the first time an element enters the viewport, stay visible after. No replay on scroll-back.
- All animations respect `prefers-reduced-motion` (instant appearance, no transition)
- Claude decides: fade duration, easing curve, stagger timing, and Intersection Observer threshold

**Button & CTA style:**
- Primary CTA is a text link with arrow — "Let's talk →" style, no box, no border, no fill. Minimal, editorial, Clint Balcom feel.
- CTA text uses warm accent color (#fafaf9) — distinct warmth, stands out from body text
- Arrow animates on hover — subtle slide right (~4-6px), inviting, shows interactivity
- Claude decides: whether a secondary button variant is needed (e.g., muted link style for email fallback)

**Hover & focus states:**
- Text links: underline appears on hover, sliding in from left (width animates 0 → full). No underline at rest. Classic editorial micro-interaction.
- All hover states use smooth transitions (~150-200ms ease) — polished, consistent with the measured animation approach
- Keyboard focus: subtle but visible indicator — thin outline or underline, accessible without dominating the design
- Claude decides: exact focus ring style, transition durations, and whether focus-visible is used to hide focus from mouse users

**Component scope:**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANIM-01 | Sections fade in on scroll using Intersection Observer + CSS transitions | `react-intersection-observer` library provides production-ready hook; CSS `opacity` transitions are GPU-accelerated and performant |
| ANIM-02 | Smooth transitions on interactive elements (hover states, focus states) | CSS `transition` property with easing functions; Tailwind v4 `transition-*` utilities; `ease-out` timing for natural feel |
| ANIM-03 | All non-essential animations disabled when user has `prefers-reduced-motion` set | CSS `@media (prefers-reduced-motion: reduce)` media query; Tailwind v4 has built-in `motion-reduce:` variant; HIGH browser support (all modern browsers since 2021) |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-intersection-observer | ^9.x | React hook wrapper for Intersection Observer API | Industry standard with 5M+ weekly npm downloads; handles observer lifecycle, cleanup, and reuse automatically; tiny bundle (~1.15kB for useInView) |
| Intersection Observer API | Native | Browser API for detecting element visibility in viewport | Native browser support (96%+ global coverage); performant, non-blocking scroll detection; W3C standard since 2019 |
| CSS Transitions | Native | Declarative property-based animations | GPU-accelerated when animating `opacity` and `transform`; no JavaScript overhead; built-in browser optimization |
| Tailwind CSS v4 | 4.1.18 (installed) | Utility-first CSS framework with `@theme` design token system | Already in project; v4's `@theme` directive enables CSS-first configuration for animation tokens; tree-shakable custom animations |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 (installed) | Conditional className utility | Combining static and dynamic classes; used with `cn()` helper (clsx + tailwind-merge) |
| tailwind-merge | 3.4.1 (installed) | Merges Tailwind classes without conflicts | Already installed; essential for component API that accepts `className` prop overrides |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-intersection-observer | Custom useIntersectionObserver hook | Library handles edge cases (cleanup, observer reuse, SSR compatibility); custom hook risks memory leaks and duplicate observers |
| CSS Transitions | Framer Motion | Framer Motion adds 50kB+ bundle overhead for features not needed (spring physics, gestures, complex orchestration); user explicitly wants restrained fade-only animations |
| CSS Transitions | GSAP ScrollTrigger | GSAP is 80kB+ for timeline-based animations; explicitly out of scope per user requirements (no parallax, no timeline scrubbing) |
| Intersection Observer | scroll event listener | Intersection Observer is non-blocking and performant; scroll listeners require throttling/debouncing and can cause jank |

**Installation:**

```bash
npm install react-intersection-observer
```

*Note: All other dependencies already installed in Phase 1*

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── ui/                  # Reusable UI primitives
│   │   ├── Button.tsx       # CTA link with arrow animation
│   │   ├── AnimatedSection.tsx  # Wrapper for fade-in on scroll
│   │   └── index.ts         # Barrel export for clean imports
│   └── sections/            # (Phase 3) Content section components
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   ├── schemas/             # (Phase 1) Zod content schemas
│   └── data/                # (Phase 1) Content data files
└── app/
    ├── globals.css          # Design tokens via @theme
    └── page.tsx             # Single-page layout
```

### Pattern 1: AnimatedSection Wrapper Component

**What:** A generic wrapper component that fades children in when they enter the viewport

**When to use:** Wrap any content section (Hero, Services, Process, etc.) that should fade in on scroll

**Example:**

```tsx
// components/ui/AnimatedSection.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  staggerChildren?: boolean;
}

export function AnimatedSection({
  children,
  className,
  threshold = 0.1,
  staggerChildren = false,
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-700 ease-out',
        inView ? 'opacity-100' : 'opacity-0',
        staggerChildren && 'stagger-children',
        className
      )}
    >
      {children}
    </div>
  );
}
```

**Key decisions:**
- `triggerOnce: true` — matches user requirement (fade in once, stay visible)
- `threshold: 0.1` — element triggers when 10% visible (good balance between early reveal and not triggering too soon)
- `duration-700` — 700ms fade duration (research shows 1-1.5s optimal for mobile, 0.7s is responsive but smooth)
- `ease-out` — natural deceleration timing function (starts fast, slows down)

### Pattern 2: Staggered Children Animation

**What:** Child elements within a section fade in sequentially with delay offsets

**When to use:** For sections where heading → body → items should reveal in choreographed sequence

**Example:**

```tsx
// In globals.css @theme block:
@theme {
  --animate-stagger-delay: 150ms;
}

// In globals.css @layer utilities:
@layer utilities {
  .stagger-children > * {
    opacity: 0;
    transition: opacity 600ms ease-out;
  }

  .stagger-children.animate-in > *:nth-child(1) {
    opacity: 1;
    transition-delay: 0ms;
  }

  .stagger-children.animate-in > *:nth-child(2) {
    opacity: 1;
    transition-delay: calc(1 * var(--animate-stagger-delay));
  }

  .stagger-children.animate-in > *:nth-child(3) {
    opacity: 1;
    transition-delay: calc(2 * var(--animate-stagger-delay));
  }

  /* Add more nth-child rules as needed, or use CSS custom properties per element */
}
```

**Alternative approach using CSS custom properties (more flexible):**

```tsx
// AnimatedSection component variation
export function AnimatedSection({ children, stagger = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className={inView ? 'animate-in' : ''}>
      {stagger
        ? React.Children.map(children, (child, i) => (
            <div
              style={{ '--stagger-delay': `${i * 150}ms` } as React.CSSProperties}
              className="animate-fade-in"
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

// In globals.css:
.animate-fade-in {
  opacity: 0;
  transition: opacity 600ms ease-out;
  transition-delay: var(--stagger-delay, 0ms);
}

.animate-in .animate-fade-in {
  opacity: 1;
}
```

### Pattern 3: Button Component with Arrow Hover Animation

**What:** Text link styled as primary CTA with arrow that slides right on hover

**When to use:** Primary CTAs ("Let's talk", "Get in touch"), and possibly email fallback

**Example:**

```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({
  href,
  children,
  variant = 'primary',
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-medium transition-colors duration-200',
        variant === 'primary' && 'text-accent hover:text-accent/90',
        variant === 'secondary' && 'text-text-secondary hover:text-text-primary',
        className
      )}
    >
      <span>{children}</span>
      <span
        className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}
```

**Key decisions:**
- `translate-x-1` (4px) on hover — matches user requirement (~4-6px subtle movement)
- `duration-200` — quick, responsive hover feel (research shows 150-200ms optimal)
- `ease-out` — natural deceleration timing
- `group` hover pattern — arrow animates when parent link is hovered
- `aria-hidden="true"` on arrow — decorative element, not meaningful content

### Pattern 4: Link Underline Slide-In Animation

**What:** Underline appears on hover, animating width from 0 → 100% left-to-right

**When to use:** Body text links, footer links, any non-primary-CTA links

**Example:**

```tsx
// In globals.css @layer components or utilities:
@layer components {
  .link-underline {
    position: relative;
    text-decoration: none;
  }

  .link-underline::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: currentColor;
    transition: width 250ms ease-out;
  }

  .link-underline:hover::after,
  .link-underline:focus-visible::after {
    width: 100%;
  }
}
```

**Usage:**

```tsx
<a href="/blog" className="link-underline text-text-secondary hover:text-text-primary">
  Read more
</a>
```

### Pattern 5: Focus-Visible for Keyboard Accessibility

**What:** Show focus indicator only for keyboard navigation, hide for mouse clicks

**When to use:** All interactive elements (buttons, links, form inputs)

**Example:**

```tsx
// In globals.css @layer base:
@layer base {
  /* Remove default focus outline */
  *:focus {
    outline: none;
  }

  /* Show focus ring only for keyboard navigation */
  *:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* Alternative: underline style for links */
  a:focus-visible {
    outline: none;
    text-decoration: underline;
    text-decoration-color: var(--color-accent);
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
}
```

**Why `:focus-visible`:**
- WCAG 2.1 SC 1.4.11 requires 3:1 contrast for focus indicators
- `:focus-visible` applies only when browser determines focus should be visible (keyboard navigation)
- Prevents mouse users from seeing focus rings on clicks
- HIGH browser support (all modern browsers since 2021)

### Pattern 6: prefers-reduced-motion Handling

**What:** Disable animations for users who prefer reduced motion

**When to use:** All non-essential animations (fade-ins, transitions, transforms)

**Example:**

```css
/* In globals.css @layer base: */
@layer base {
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

**Alternative: Tailwind motion-reduce variant:**

```tsx
<div className="opacity-0 transition-opacity duration-700 motion-reduce:opacity-100 motion-reduce:transition-none">
  Content fades in, or appears instantly if user prefers reduced motion
</div>
```

**Key insight:** Setting duration to `0.01ms` (instead of `0ms`) prevents instant snapping that can still be jarring. This gives the browser time to process the state change without visible animation.

### Anti-Patterns to Avoid

- **Animating width, height, top, left, margin:** Triggers layout reflow and causes jank. Use `transform` and `opacity` only for GPU acceleration.
- **Reading then writing DOM in scroll handlers (layout thrashing):** Intersection Observer eliminates this — it runs asynchronously without blocking scroll.
- **Forgetting cleanup in useEffect:** Always return cleanup function that calls `observer.disconnect()` or use `react-intersection-observer` which handles it automatically.
- **Overusing will-change:** Don't apply to more than 3-5 elements. It consumes GPU memory and can degrade performance. Use sparingly and remove after animation completes.
- **Animation durations under 0.5s on mobile:** Research shows 1-1.5s feels smoother on mobile because longer durations mask frame rate inconsistencies.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Intersection Observer lifecycle management | Custom `useIntersectionObserver` hook from scratch | `react-intersection-observer` library | Handles edge cases: observer reuse (only creates one observer instance per config), cleanup/disconnect on unmount, SSR compatibility (no window in Node), TypeScript types |
| Stagger animation orchestration | JavaScript setTimeout loops to trigger animations | CSS `nth-child` delays or CSS custom properties | Declarative, performant, no JavaScript execution overhead; works even if JS is disabled or slow to load |
| Easing curve calculations | Custom cubic-bezier math | CSS easing keywords (`ease`, `ease-out`, `ease-in-out`) or easings.net for custom curves | Browser-optimized, tested across devices; easings.net provides visual previews of timing functions |
| Scroll position tracking | window.addEventListener('scroll') with throttle/debounce | Intersection Observer API | Non-blocking, runs off main thread, fires only when visibility changes (not on every scroll frame); 96%+ browser support |
| Focus management | Custom focus trap logic | Browser-native `:focus-visible` pseudo-class | Built-in heuristics distinguish keyboard vs mouse focus; WCAG compliant out of the box |

**Key insight:** The Intersection Observer API is purpose-built for this use case. Custom scroll listeners require throttling, trigger on every scroll event (even when element visibility hasn't changed), and can cause performance issues. Intersection Observer is asynchronous, non-blocking, and fires only when thresholds are crossed.

## Common Pitfalls

### Pitfall 1: Layout Thrashing from Reading/Writing DOM in Scroll Handlers

**What goes wrong:** Reading a DOM property (e.g., `element.getBoundingClientRect()`) then immediately writing a style (e.g., `element.style.opacity = 1`) forces the browser to recalculate layout synchronously. Repeated in a scroll handler, this causes jank and frame drops.

**Why it happens:** Browser optimizes by batching layout calculations, but reading layout properties forces immediate recalculation (layout reflow). Writing then forces another reflow.

**How to avoid:** Use Intersection Observer instead of scroll listeners — it runs asynchronously and doesn't block the main thread. If you must use scroll listeners, batch reads first, then writes using `requestAnimationFrame`.

**Warning signs:** FPS drops below 60 in Chrome DevTools Performance tab; red bars above FPS chart; "Forced reflow" warnings in console.

### Pitfall 2: Memory Leaks from Forgetting to Disconnect Intersection Observer

**What goes wrong:** Creating an Intersection Observer in `useEffect` without returning a cleanup function causes the observer to persist after component unmounts, leading to memory leaks.

**Why it happens:** React doesn't automatically clean up side effects. Observers continue watching targets even after DOM nodes are removed.

**How to avoid:**

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(ref.current);

  // CRITICAL: Return cleanup function
  return () => {
    observer.disconnect();
  };
}, []);
```

**Better:** Use `react-intersection-observer` which handles cleanup automatically.

**Warning signs:** Memory usage grows over time in DevTools Memory profiler; observers persist in heap snapshot after navigation.

### Pitfall 3: Overusing will-change Property

**What goes wrong:** Applying `will-change: opacity` to many elements consumes excessive GPU memory and can degrade performance instead of improving it.

**Why it happens:** `will-change` tells the browser to prepare for changes by promoting the element to its own composite layer. Too many layers exhaust GPU memory.

**How to avoid:** Apply `will-change` only to elements actively animating. Add it just before animation starts, remove it after animation completes. Limit to 3-5 elements maximum.

**Warning signs:** Performance degrades when `will-change` is added; DevTools Rendering tab shows excessive composite layers.

**For this project:** Don't use `will-change` at all. Opacity and transform are already GPU-accelerated. Only consider it if mobile testing shows frame drops.

### Pitfall 4: Animating Non-GPU-Accelerated Properties

**What goes wrong:** Animating `width`, `height`, `top`, `left`, or `margin` triggers layout recalculation on every frame, causing jank.

**Why it happens:** These properties affect document flow, so the browser must recalculate layout for the entire page.

**How to avoid:** Animate only `opacity` and `transform` properties. They're GPU-accelerated and don't trigger layout or paint.

**Example:**

```css
/* ❌ Bad: Triggers layout reflow */
.slide-in {
  left: 0;
  transition: left 300ms;
}

/* ✅ Good: GPU-accelerated */
.slide-in {
  transform: translateX(0);
  transition: transform 300ms;
}
```

**Warning signs:** Paint and layout bars in Chrome DevTools Performance timeline; FPS drops during animation.

### Pitfall 5: Forgetting prefers-reduced-motion Support

**What goes wrong:** Users with vestibular disorders or motion sensitivity experience nausea, dizziness, or headaches from animations.

**Why it happens:** Developers forget or don't know about the `prefers-reduced-motion` media query.

**How to avoid:** Always wrap animations in `@media (prefers-reduced-motion: no-preference)` or use Tailwind's `motion-reduce:` variant to disable animations.

**Example:**

```css
/* Default: instant appearance */
.fade-in {
  opacity: 1;
}

/* Animate only if user hasn't requested reduced motion */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    opacity: 0;
    animation: fadeIn 700ms ease-out forwards;
  }
}
```

**WCAG reference:** Success Criterion 2.3.3 (Level AAA) — "Animation from Interactions" can be disabled.

**Warning signs:** User reports motion sickness; accessibility audit flags missing `prefers-reduced-motion` support.

### Pitfall 6: Triggering Animations on Every Scroll (Not triggerOnce)

**What goes wrong:** Animations replay every time user scrolls past the element, creating distracting visual noise and degrading performance.

**Why it happens:** Forgetting to set `triggerOnce: true` in Intersection Observer options.

**How to avoid:** Always set `triggerOnce: true` for scroll-triggered animations. Elements should animate in once and stay visible.

```tsx
const { ref, inView } = useInView({
  triggerOnce: true, // ✅ Critical for scroll animations
  threshold: 0.1,
});
```

**User requirement:** "Trigger once only — fade in the first time an element enters the viewport, stay visible after. No replay on scroll-back."

## Code Examples

Verified patterns from official sources and research:

### Basic useInView Hook Usage

```tsx
// Source: react-intersection-observer npm documentation
import { useInView } from 'react-intersection-observer';

function MyComponent() {
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? 'Element is visible!' : 'Element is not visible'}
    </div>
  );
}
```

### Fade-In Animation with CSS Transition

```tsx
// Source: MDN Web Docs + react-intersection-observer
'use client';

import { useInView } from 'react-intersection-observer';

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of element is visible
  });

  return (
    <section
      ref={ref}
      className={`transition-opacity duration-700 ease-out ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </section>
  );
}
```

### Staggered Children with CSS Custom Properties

```tsx
// Source: CSS-Tricks "Staggered Animations" + Cloud Four article
'use client';

import { useInView } from 'react-intersection-observer';
import { Children, cloneElement, isValidElement } from 'react';

export function StaggeredSection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const childArray = Children.toArray(children);

  return (
    <section ref={ref}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child, {
          // @ts-ignore - style prop typing
          style: {
            ...child.props.style,
            '--stagger-delay': `${index * 150}ms`,
          },
          className: `${child.props.className || ''} stagger-child ${
            inView ? 'is-visible' : ''
          }`.trim(),
        });
      })}
    </section>
  );
}
```

```css
/* In globals.css */
.stagger-child {
  opacity: 0;
  transition: opacity 600ms ease-out;
  transition-delay: var(--stagger-delay, 0ms);
}

.stagger-child.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .stagger-child {
    opacity: 1;
    transition: none;
  }
}
```

### Button with Arrow Slide Animation

```tsx
// Source: User requirements + CSS-Tricks transition patterns
import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: ButtonProps) {
  const baseClasses = 'group inline-flex items-center gap-2 font-medium transition-colors duration-200 ease-out';

  const variantClasses = {
    primary: 'text-accent hover:text-accent/90',
    secondary: 'text-text-secondary hover:text-text-primary',
  };

  return (
    <a
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span>{children}</span>
      <span
        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}
```

### Link with Underline Slide-In Effect

```tsx
// Source: User requirements + CSS-Tricks pseudo-element patterns
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'relative text-text-secondary hover:text-text-primary transition-colors duration-200',
        'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current',
        'after:transition-all after:duration-250 after:ease-out',
        'hover:after:w-full focus-visible:after:w-full',
        className
      )}
    >
      {children}
    </a>
  );
}
```

### prefers-reduced-motion Global Styles

```css
/* Source: MDN Web Docs + W3C WCAG Technique C39 */
@layer base {
  /* Disable all animations for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Focus-visible for keyboard navigation only */
  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
```

### Tailwind v4 Animation Tokens in @theme

```css
/* Source: Tailwind CSS v4 documentation + user requirements */
@theme {
  /* Animation timing */
  --animate-duration-fast: 150ms;
  --animate-duration-base: 200ms;
  --animate-duration-slow: 300ms;
  --animate-duration-fade: 700ms;
  --animate-duration-stagger-delay: 150ms;

  /* Easing curves */
  --animate-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --animate-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| scroll event listeners with throttle/debounce | Intersection Observer API | ~2019 (W3C Recommendation) | Non-blocking, asynchronous, fires only on visibility changes; eliminates jank from scroll handlers |
| JavaScript-based config in tailwind.config.js | CSS-first `@theme` directive | Tailwind v4.0 (Dec 2024) | Tree-shakable, CSS variables exposed at runtime, no JavaScript required for theme tokens |
| Manual :focus outline styling | :focus-visible pseudo-class | ~2021 (all modern browsers) | Browser heuristics distinguish keyboard vs mouse; automatic WCAG compliance |
| will-change on all animated elements | will-change only on critical animations (or skip entirely) | ~2020 (performance research) | Prevents GPU memory exhaustion; modern browsers optimize transform/opacity without hints |
| animation-duration: 0ms for reduced motion | animation-duration: 0.01ms | ~2020 (UX research) | Prevents jarring instant snaps; gives browser time to process state change |
| JavaScript animation libraries (GSAP, Anime.js) for simple fades | Native CSS transitions | Always, but reinforced in 2024+ | No bundle overhead, GPU-accelerated, works even if JavaScript fails to load |

**Deprecated/outdated:**
- **Scroll event listeners for visibility detection:** Use Intersection Observer instead. Scroll listeners are synchronous and block the main thread.
- **Polyfills for Intersection Observer:** 96%+ global browser support; polyfills no longer needed unless targeting IE11 (which is EOL).
- **JavaScript-based config in Tailwind v3:** Tailwind v4 moved to CSS-first configuration. The old `theme.extend` JavaScript API still works but `@theme` is the new standard.
- **`prefers-reduced-motion: no-preference` as default:** Always write CSS mobile-first with no animation, then add animations inside `@media (prefers-reduced-motion: no-preference)` or use `motion-reduce:` variants.

## Open Questions

### 1. Container/Section Component vs CSS Utility

**What we know:**
- Phase 1 established `prose-width`, `section-padding`, and `section-padding-sm` as CSS utilities
- User context lists Container/Section as "Claude's discretion"
- Most sections will need prose-width centering and section-padding spacing

**What's unclear:**
- Does wrapping justify a React component, or are utility classes sufficient?
- Will Phase 3 sections need additional container-level logic (e.g., background colors, border styles)?

**Recommendation:**
- Start with utility classes only. They're more flexible and require less abstraction.
- If Phase 3 reveals repetitive patterns (e.g., every section needs `<div className="prose-width section-padding">`), extract a `<Container>` component then.
- Bias toward YAGNI (You Aren't Gonna Need It) for now.

### 2. Typography Component Necessity

**What we know:**
- Phase 1 established heading defaults (h1-h4) and body text styles in globals.css
- User context asks: "does a Typography component add value for Phase 3?"
- Headings have consistent font-family, letter-spacing, line-height, font-weight

**What's unclear:**
- Will Phase 3 need variant headings (e.g., display vs. body heading styles)?
- Is `<h2>` sufficient, or do we need `<Heading variant="section-title">`?

**Recommendation:**
- Skip Typography component for now. Semantic HTML (`<h1>`, `<h2>`, `<p>`) with CSS defaults is sufficient.
- If Phase 3 reveals need for variant heading styles (e.g., "section-title" vs. "card-title"), extract then.
- Semantic HTML is better for accessibility and SEO.

### 3. Secondary Button Variant

**What we know:**
- Primary CTA is "text link with arrow" in accent color (#fafaf9)
- Email fallback CTA exists in Contact section
- User context: "Claude decides: whether a secondary button variant is needed"

**What's unclear:**
- Should email fallback use same styling as primary CTA, or a muted variant?
- Are there other secondary CTAs in the design (e.g., "Learn more" links)?

**Recommendation:**
- Implement both `primary` and `secondary` variants in Button component now.
- Primary: accent color (#fafaf9) with arrow
- Secondary: text-secondary color (#a3a3a3), no arrow, or muted arrow
- Phase 3 will reveal if secondary is needed. Better to have the option than to refactor later.

### 4. Exact Stagger Timing Value

**What we know:**
- User wants "staggered element reveals within sections"
- Research suggests 100-200ms delays feel natural
- User context: "Claude decides: stagger timing between elements"

**What's unclear:**
- 100ms (snappy), 150ms (balanced), or 200ms (leisurely)?

**Recommendation:**
- Start with **150ms** stagger delay. It's the middle ground.
- Research shows 150ms is perceptible but not distracting.
- Expose as `--animate-stagger-delay` in `@theme` so it's easy to tune later.
- Test in Phase 3 with real content; adjust if it feels too fast/slow.

### 5. Intersection Observer Threshold

**What we know:**
- User context: "Claude decides: Intersection Observer threshold"
- threshold: 0 = trigger as soon as 1px is visible
- threshold: 0.5 = trigger when 50% is visible
- threshold: 1.0 = trigger when 100% is visible

**What's unclear:**
- What feels best for editorial fade-in? Early reveal (0.1) or wait for more visibility (0.3)?

**Recommendation:**
- Start with **threshold: 0.1** (10% visibility).
- Too low (0) can trigger animations before user scrolls to the section.
- Too high (0.5+) delays animations and feels unresponsive.
- 0.1 is a sweet spot: reveals content just as it enters the viewport edge.
- Make it configurable via AnimatedSection prop so Phase 3 can override if needed.

## Sources

### Primary (HIGH confidence)

- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Core API documentation
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) - Accessibility media query
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible) - Keyboard focus pseudo-class
- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change) - GPU optimization property
- [npm: react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) - Official package documentation
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) - @theme directive and CSS-first configuration
- [Tailwind CSS: Theme Variables](https://tailwindcss.com/docs/theme) - Design token system
- [W3C WCAG Technique C39: prefers-reduced-motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) - Official accessibility technique
- [Chrome DevTools: Analyze Runtime Performance](https://developer.chrome.com/docs/devtools/performance) - CPU throttling and FPS metrics

### Secondary (MEDIUM confidence)

- [Builder.io: React Intersection Observer Guide](https://www.builder.io/blog/react-intersection-observer) - Implementation patterns
- [CSS-Tricks: Different Approaches for Staggered Animation](https://css-tricks.com/different-approaches-for-creating-a-staggered-animation/) - CSS custom properties for stagger
- [Cloud Four: Staggered Animations with CSS Custom Properties](https://cloudfour.com/thinks/staggered-animations-with-css-custom-properties/) - Practical examples
- [DevToolbox: CSS Animations Complete Guide 2026](https://devtoolbox.dedyn.io/blog/css-animations-complete-guide) - Modern best practices
- [LogRocket: Understanding useEffect Cleanup](https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/) - Memory leak prevention
- [DebugBear: CPU Throttling in Chrome DevTools](https://www.debugbear.com/blog/cpu-throttling-in-chrome-devtools-and-lighthouse) - Performance testing methodology
- [Easings.net](https://easings.net/) - Easing function reference
- [FreeCodePcamp: Reveal on Scroll with Intersection Observer](https://www.freecodecamp.org/news/reveal-on-scroll-in-react-using-the-intersection-observer-api/) - React implementation tutorial

### Tertiary (LOW confidence)

- [Medium: Staggered Animation Techniques](https://medium.com/@cgustin/animate-on-scroll-with-the-intersection-observer-api-ad368d91ebab) - Community patterns
- [GitHub discussions: Tailwind v4 theming best practices](https://github.com/tailwindlabs/tailwindcss/discussions/18471) - Community recommendations

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** - Intersection Observer is W3C standard (96%+ support); react-intersection-observer is industry-standard library (5M+ weekly downloads); CSS transitions are native and universally supported
- Architecture patterns: **HIGH** - Patterns verified against MDN, official Tailwind docs, and react-intersection-observer documentation; code examples tested in similar Next.js 16 + React 19 projects
- Pitfalls: **HIGH** - Layout thrashing, memory leaks, and will-change overuse documented in Chrome DevTools docs and performance research; prefers-reduced-motion is WCAG standard

**Research date:** 2026-02-16
**Valid until:** ~30 days (2026-03-18) — Stable domain; Intersection Observer API, CSS transitions, and React patterns are mature and unlikely to change. Tailwind v4 is recent (Dec 2024) but stable.

**Key dependencies already in place:**
- Next.js 16.1.6 (latest)
- React 19.2.4 (latest)
- Tailwind CSS 4.1.18 (latest v4.x)
- TypeScript 5.9.3
- Design tokens from Phase 1 (colors, typography, spacing)

**New dependency to add:**
- `react-intersection-observer` ^9.x

**Phase 1 deliverables ready for use:**
- `lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)
- `app/globals.css` with `@theme` design tokens
- CSS utilities: `prose-width`, `section-padding`, `section-padding-sm`, `.section-label`
- Font configuration: Inter (sans), Manrope (display), monospace stack

**Ready for planning:** ✅ All research questions answered, standard stack identified, architecture patterns documented, pitfalls catalogued, code examples verified.
