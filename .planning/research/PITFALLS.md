# Domain Pitfalls

**Domain:** Premium Brochure/Portfolio Site (Dark Theme, Typography-Heavy, Animated)
**Researched:** 2026-02-16
**Confidence:** MEDIUM-LOW (based on training data, unable to verify with current sources)

> **Note:** This research was conducted without access to web search tools. Findings are based on established best practices in Next.js, dark theme design, typography, and animation performance as of January 2025. Recommendations should be validated against current documentation.

## Critical Pitfalls

Mistakes that cause rewrites, major performance issues, or accessibility violations.

### Pitfall 1: Animation-Induced Layout Shift (CLS Killer)

**What goes wrong:** Scroll animations that trigger layout recalculations cause cumulative layout shift (CLS), devastating Core Web Vitals scores and user experience. Elements "jump" as they animate in, especially on slower devices.

**Why it happens:**
- Animating properties that trigger layout (height, width, top, left, margin, padding)
- Not reserving space for content before it animates in
- Using libraries that measure DOM elements synchronously during scroll
- Transforms applied without `will-change` or proper containment

**Consequences:**
- Failed Core Web Vitals audits (Google Search ranking penalty)
- Janky scrolling on mobile devices
- Content shifting under user's cursor/finger
- Professional credibility damaged (ironic for consultancy site)

**Prevention:**
1. **Animate only composited properties:** `transform`, `opacity`, `filter` (GPU-accelerated, no layout)
2. **Reserve layout space:** Use fixed dimensions or aspect ratios for animated elements
3. **Use `will-change` sparingly:** Apply to animating elements only during animation
4. **Prefer CSS transforms over position:** `transform: translateY()` not `top`
5. **Test with Chrome DevTools Performance monitor:** Record while scrolling, watch for Layout/Reflow

**Detection:**
- CLS score >0.1 in Lighthouse (aim for <0.1)
- Purple "Layout Shift" bars in Chrome Performance timeline
- Visible "jumping" when scrolling on throttled CPU
- Elements repositioning after animations complete

**Phase:** Phase 1 (Foundation) — Architecture decisions lock you in. Set animation constraints early.

---

### Pitfall 2: Dark Theme Contrast Failure (WCAG AA/AAA)

**What goes wrong:** Text appears elegant on designer's calibrated monitor but is unreadable on user's device. Gray-on-dark-gray fails WCAG contrast requirements, causing accessibility violations and legal liability.

**Why it happens:**
- Designers prioritize aesthetics over accessibility
- Testing only on high-end monitors with perfect calibration
- Misunderstanding WCAG contrast ratios (4.5:1 for normal text, 7:1 for AAA)
- Using pure black (#000) backgrounds (increases eye strain, makes subtle grays invisible)
- Copy-pasting colors from design references without contrast checking

**Consequences:**
- ADA/WCAG compliance violations (legal risk for consultancy)
- Users with visual impairments or cheap monitors can't read content
- Increased bounce rate from readability issues
- Fails automated accessibility audits (affects enterprise contracts)
- Unprofessional for consultancy claiming technical expertise

**Prevention:**
1. **Test all text/background pairs:** Use WebAIM Contrast Checker or Stark plugin
2. **Minimum ratios:** 4.5:1 for body text (14-18px), 3:1 for large text (24px+), 7:1 for AAA
3. **Avoid pure black:** Use dark grays (#0F0F0F, #1A1A1A) for backgrounds
4. **Test on multiple devices:** Including cheap laptops, phones with low brightness
5. **Use Tailwind's opacity utilities carefully:** `text-gray-400` might look good but fail contrast
6. **Create contrast-safe color system:** Document approved text/background combinations

**Detection:**
- Run axe DevTools or WAVE browser extension
- Lighthouse accessibility audit flags contrast issues
- Test with grayscale filter (simulates low contrast sensitivity)
- View on phone in bright sunlight (real-world test)
- Use Chrome DevTools color picker (shows contrast ratio inline)

**Phase:** Phase 1 (Foundation) — Color system must be accessibility-compliant from start. Retrofitting is painful.

---

### Pitfall 3: Font Loading Flash (FOUT/FOIT) on Premium Typography

**What goes wrong:** Custom fonts load slowly, causing Flash of Unstyled Text (FOUT) or invisible text (FOIT). On a typography-heavy site, this is catastrophic — entire page is blank or ugly for 2-5 seconds.

**Why it happens:**
- Loading multiple font weights/styles (Regular, Medium, Bold, Italic = 4 files)
- Not using `font-display: swap` (browser default is `block` = invisible text)
- Hosting fonts on slow CDN or not preloading critical fonts
- Not subsetting fonts (loading full character sets for Latin-only content)
- Loading fonts in CSS instead of preloading in `<head>`

**Consequences:**
- 2-5 second blank page on first visit (users bounce)
- Jarring text reflow when font loads (CLS penalty)
- Poor first impression for premium consultancy brand
- Failed LCP (Largest Contentful Paint) metric
- Users on slow connections see fallback fonts permanently

**Prevention:**
1. **Use `next/font` (Next.js 13+):** Automatic optimization, subsetting, preloading
2. **Self-host fonts:** Don't rely on Google Fonts CDN (privacy + performance)
3. **Subset fonts:** Include only needed characters (Latin subset ~30% of full font)
4. **Preload critical fonts:** Add `<link rel="preload">` for above-fold text
5. **Use `font-display: swap`:** Show fallback immediately, swap when loaded
6. **Limit font weights:** 2-3 weights max (Regular, Medium/SemiBold, Bold)
7. **Match fallback metrics:** Use `size-adjust` to minimize layout shift when swapping

**Detection:**
- Network tab shows font loading after 1-2 seconds
- Text appears in Times/Arial before custom font loads
- Layout shifts when font swaps (measure CLS)
- Lighthouse flags "Ensure text remains visible during webfont load"

**Phase:** Phase 1 (Foundation) — Font loading strategy affects architecture. Must be configured before building components.

---

### Pitfall 4: Mobile Scroll Performance Collapse

**What goes wrong:** Scroll animations are smooth on desktop but stutter/lag on mobile. Page feels broken on phones, which is 60%+ of traffic for brochure sites.

**Why it happens:**
- Scroll event listeners fire too frequently (not throttled/debounced)
- JavaScript-based animations block main thread
- Animating non-composited properties (forces GPU to raster every frame)
- Not using passive event listeners (browser can't optimize scrolling)
- Intersection Observer callbacks doing heavy DOM manipulation
- Multiple animation libraries running simultaneously (Framer Motion + GSAP + custom)

**Consequences:**
- Janky scrolling on iPhone/Android (30 FPS or worse)
- Battery drain from excessive CPU/GPU usage
- Users perceive site as low-quality despite premium design
- Consultancy appears technically incompetent
- High bounce rate on mobile

**Prevention:**
1. **Use CSS-based animations when possible:** `@keyframes` + `animation-timeline: scroll()` (new, check support)
2. **Intersection Observer for triggers:** Not scroll event listeners
3. **Passive event listeners:** `{ passive: true }` on scroll/touch events
4. **RequestAnimationFrame for JS animations:** Never animate directly in scroll callback
5. **Throttle/debounce scroll handlers:** Max 60 FPS (16.67ms intervals)
6. **Test on real devices:** iPhone SE (budget), mid-range Android
7. **Use Chrome DevTools CPU throttling:** 4x slowdown simulates low-end mobile

**Detection:**
- FPS counter in Chrome DevTools shows <60 FPS while scrolling
- "Long Tasks" in Performance timeline during scroll
- Scroll feels laggy on iPhone when testing
- Lighthouse flags "Avoid long main thread tasks"
- GPU usage spikes in Activity Monitor/Task Manager

**Phase:** Phase 2 (Animation Implementation) — Critical to test performance from first animation. Debugging later requires refactoring.

---

### Pitfall 5: Over-Animating (Motion Sickness & Cognitive Overload)

**What goes wrong:** Every element animates on scroll. Parallax backgrounds, sliding text, rotating icons, fading images — all at once. Users feel nauseous or overwhelmed. "Prefers-reduced-motion" is ignored.

**Why it happens:**
- Designer/developer excitement about animation capabilities
- Copying trendy agency sites without restraint
- Not considering accessibility (vestibular disorders affect 35% of adults over 40)
- Confusing "premium" with "heavily animated"
- No design system rules for when to animate

**Consequences:**
- Motion sickness for users with vestibular disorders (accessibility violation)
- Cognitive overload (users can't focus on content)
- Longer time-to-comprehension (animations distract from message)
- Ignoring `prefers-reduced-motion` is WCAG 2.1 violation
- Site feels gimmicky instead of professional

**Prevention:**
1. **Respect `prefers-reduced-motion`:** Disable non-essential animations when set
2. **Animation hierarchy:** Only animate 1-2 elements per viewport section
3. **Subtle > dramatic:** Fade-ins (0.3-0.5s) better than flying/rotating
4. **No parallax on mobile:** Performance and nausea issues
5. **No auto-playing animations:** User-initiated (scroll/click) only
6. **Design rule:** "Animations should feel discovered, not imposed"

**Detection:**
- Ask someone to use site — watch for squinting/discomfort
- Enable `prefers-reduced-motion` in OS — site should still work
- Count animations per viewport — more than 3 is red flag
- Test with someone prone to motion sickness

**Phase:** Phase 2 (Animation Implementation) — Establish animation guidelines before building. Easy to over-animate without rules.

---

## Moderate Pitfalls

Avoidable mistakes that hurt quality but don't require rewrites.

### Pitfall 6: Next.js Image Component Misuse

**What goes wrong:** Using `<img>` tags instead of `next/image`, or misconfiguring `next/image` causing LCP delays, missing lazy loading, or oversized images.

**Why it happens:**
- Developers unfamiliar with `next/image` defaults
- Not understanding `priority` prop for above-fold images
- Missing `sizes` attribute (loads unnecessarily large images)
- Not optimizing source images before deployment

**Prevention:**
1. **Use `next/image` exclusively:** Never raw `<img>` except for SVG/icons
2. **Add `priority` to hero images:** Prevents lazy-loading above fold
3. **Specify `sizes` attribute:** Tells browser which image size to load
4. **Optimize source images:** Max 2x retina resolution, compress with ImageOptim/Squoosh
5. **Use appropriate `fill` or explicit dimensions:** Prevents CLS

**Detection:**
- Lighthouse flags "Properly size images" or "Defer offscreen images"
- Network tab shows full-res images loading on mobile
- LCP >2.5s due to image loading

**Phase:** Phase 2 (Component Implementation) — Catch early in code review before bad patterns spread.

---

### Pitfall 7: Typography Scale Breaks on Mobile

**What goes wrong:** Bold desktop typography (72px headlines) doesn't scale down properly. Mobile headlines are too large (text wraps awkwardly) or too small (readability suffers).

**Why it happens:**
- Using fixed font sizes instead of responsive utilities
- Not testing on small screens (320px iPhone SE width)
- Assuming Tailwind's responsive prefixes are enough without tuning
- Generous desktop whitespace becomes cramped on mobile

**Prevention:**
1. **Use Tailwind responsive utilities:** `text-4xl lg:text-6xl xl:text-8xl`
2. **Test at 320px width:** Smallest common mobile viewport
3. **Fluid typography:** `clamp()` for smooth scaling between breakpoints
4. **Adjust line-height per size:** Larger text needs tighter line-height
5. **Mobile-first development:** Start with mobile sizing, scale up

**Detection:**
- Text overflows container on 375px viewport
- Headlines wrap to 3+ lines on mobile
- Body text smaller than 16px (hard to read)
- Chrome DevTools responsive mode testing

**Phase:** Phase 2 (Component Implementation) — Test mobile frequently during development.

---

### Pitfall 8: Hydration Mismatch from Client-Side Animations

**What goes wrong:** Next.js throws "Hydration failed" errors because animation libraries add/modify DOM during client-side hydration, causing server HTML to mismatch client HTML.

**Why it happens:**
- Framer Motion or other animation libraries initialize before hydration completes
- Conditional rendering based on `window` or browser-only APIs
- Using `useEffect` to add animation classes (runs after SSR HTML rendered)

**Prevention:**
1. **Suppress hydration warnings carefully:** Only if animation is intentional client-only
2. **Use `suppressHydrationWarning` on animated containers:** Not a fix, but prevents console spam
3. **Initialize animations after mount:** `useEffect` + state flag
4. **Prefer CSS animations for initial state:** No JS required for SSR
5. **Test in production build:** Hydration errors only appear in dev mode prominently

**Detection:**
- Console errors: "Hydration failed" or "Text content did not match"
- React DevTools shows red highlights on mismatched elements
- Page flashes or jumps after load (hydration reconciliation)

**Phase:** Phase 2 (Animation Implementation) — Catch during development with proper testing.

---

### Pitfall 9: Missing Semantic HTML & Accessibility

**What goes wrong:** Using `<div>` for everything. No proper heading hierarchy, landmarks, or alt text. Screen readers can't navigate. Keyboard navigation broken.

**Why it happens:**
- Focus on visual design over semantics
- Not testing with screen readers (VoiceOver, NVDA)
- Using generic `<div>` and `<span>` instead of `<article>`, `<section>`, `<nav>`
- Forgetting `alt` attributes on images
- Custom components that aren't keyboard accessible

**Prevention:**
1. **Use semantic HTML:** `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<nav>`
2. **Proper heading hierarchy:** Single `<h1>`, then `<h2>`, `<h3>` in order
3. **Alt text for all images:** Descriptive, not "image" or filename
4. **Test keyboard navigation:** Tab through entire page without mouse
5. **Test with screen reader:** VoiceOver (Mac) or NVDA (Windows)
6. **Use ARIA labels sparingly:** Semantic HTML first, ARIA only when needed

**Detection:**
- axe DevTools or WAVE flags semantic issues
- Lighthouse accessibility score <90
- Can't tab to all interactive elements
- Screen reader announces "button" for styled `<div>` click handlers

**Phase:** Phase 1-2 (Foundation & Components) — Build semantically from start. Retrofitting is tedious.

---

### Pitfall 10: Overly Complex Scroll Animation Libraries

**What goes wrong:** Installing GSAP + ScrollTrigger + Locomotive Scroll + Framer Motion for simple fade-ins. Bundle size balloons, conflicts arise, maintenance nightmare.

**Why it happens:**
- Following tutorials that use heavy libraries
- Not knowing simpler alternatives (Intersection Observer API)
- Assuming premium animations require premium libraries
- Copy-pasting code from agency sites

**Prevention:**
1. **Start with Intersection Observer:** Native browser API, zero bundle cost
2. **Use Framer Motion only if needed:** Great for complex orchestration, overkill for fade-ins
3. **Avoid GSAP unless essential:** Large bundle, license costs for commercial use
4. **CSS animations for simple effects:** `@keyframes` + Intersection Observer for triggers
5. **Measure bundle size:** `@next/bundle-analyzer`

**Detection:**
- Next.js bundle analysis shows >50KB for animation libraries
- Multiple animation libraries in package.json
- Simple fade-in requires 3 imports

**Phase:** Phase 1 (Foundation) — Choose animation strategy before building. Changing libraries mid-project is painful.

---

## Minor Pitfalls

Small issues that are easy to fix but hurt polish.

### Pitfall 11: Inconsistent Animation Timing

**What goes wrong:** Some elements fade in over 300ms, others 500ms, some 200ms. No consistent easing curves. Animations feel random.

**Prevention:**
- Create animation constants: `DURATION = { fast: 200, normal: 300, slow: 500 }`
- Use consistent easing: `ease-out` for entrances, `ease-in` for exits
- Document in design system/Tailwind config

**Phase:** Phase 1 (Foundation) — Define before animating anything.

---

### Pitfall 12: Not Testing on Actual Mobile Devices

**What goes wrong:** Site works in Chrome DevTools responsive mode but breaks on real iPhone/Android due to viewport units, safe areas, hover states, etc.

**Prevention:**
- Test on 2-3 real devices (iPhone, Android, tablet)
- Use BrowserStack if no physical devices available
- Check viewport units (`100vh` broken on mobile Safari)
- Test hover states (don't rely on `:hover` on touch devices)

**Phase:** Throughout — Continuous testing, especially before major milestones.

---

### Pitfall 13: Ignoring TypeScript Strictness

**What goes wrong:** `any` types everywhere, optional chaining abuse (`?.?.?.`), type assertions without validation. Defeats purpose of TypeScript.

**Prevention:**
- Enable `strict: true` in tsconfig.json
- Use proper types for props, state, API responses
- Avoid `any` — use `unknown` and type guards instead
- Type animations props (Framer Motion types)

**Phase:** Phase 1 (Foundation) — Set TypeScript config before writing code.

---

### Pitfall 14: Missing Meta Tags & OpenGraph

**What goes wrong:** Sharing site on LinkedIn/Twitter shows broken preview or no preview. Missing SEO meta tags.

**Prevention:**
- Use Next.js `Metadata` API (App Router) or `next-seo` (Pages Router)
- Add OpenGraph tags: title, description, image (1200x630)
- Test with OpenGraph debugger (LinkedIn, Twitter, Facebook)
- Include favicon, apple-touch-icon

**Phase:** Phase 3 (Content & Polish) — Add before launching/sharing.

---

### Pitfall 15: No Loading States or Skeleton Screens

**What goes wrong:** Blank page while fonts/images load. No feedback to user. Feels unpolished.

**Prevention:**
- Add loading skeletons for above-fold content
- Use Next.js `loading.tsx` for route transitions
- Show progressive image loading (blur placeholder)
- Consider suspense boundaries for async components

**Phase:** Phase 2-3 (Components & Polish) — Add as components are built.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Initial Setup | Choosing wrong Next.js mode (App vs Pages Router) | Use App Router (newer, better for SSG), avoid mixing patterns |
| Color System | Dark theme contrast failures | Test every color pair with contrast checker during design phase |
| Typography | Font loading flash (FOUT/FOIT) | Configure `next/font` in Phase 1, test font loading immediately |
| Animation Architecture | Choosing heavy animation library | Start with Intersection Observer + CSS, add Framer Motion only if needed |
| Component Building | Hydration mismatches | Test SSR vs client rendering for each animated component |
| Performance Testing | Not testing on real mobile devices | Test on physical iPhone/Android before considering phase complete |
| Launch Prep | Missing OpenGraph/meta tags | Add metadata to checklist before sharing site |

---

## Domain-Specific Red Flags

**Brochure sites often fail on:**
- Over-designing (complexity for its own sake)
- Ignoring performance for visual flair
- Not testing accessibility (especially dark themes)
- Assuming desktop-first (mobile is majority traffic)
- Animation overload (motion sickness, performance)

**Success pattern for premium consultancy:**
- Restrained, purposeful animations
- Accessibility-first color system
- Typography that works on all devices
- Fast load times (credibility signal)
- Mobile-responsive by default

---

## Validation Checklist

Before considering site complete:

- [ ] Lighthouse score >90 on all metrics (Performance, Accessibility, Best Practices, SEO)
- [ ] CLS <0.1, LCP <2.5s, FID <100ms (Core Web Vitals)
- [ ] All text/background pairs pass WCAG AA (4.5:1 minimum)
- [ ] `prefers-reduced-motion` respected (animations disable/reduce)
- [ ] Works on iPhone SE (375px width, older device)
- [ ] Fonts load in <1s with proper fallback
- [ ] No hydration errors in production build
- [ ] Screen reader navigation works (test with VoiceOver)
- [ ] Keyboard navigation works (tab through all interactive elements)
- [ ] OpenGraph preview looks correct on LinkedIn/Twitter

---

## Sources

**Confidence Note:** This research was conducted without access to verification tools. Recommendations are based on:

- Next.js documentation (as of January 2025)
- Web Vitals specifications (Google)
- WCAG 2.1 accessibility standards
- Established performance best practices
- Common patterns from portfolio/agency site analysis (training data)

**Recommended verification:**
- Next.js official docs (nextjs.org/docs)
- Web.dev Core Web Vitals (web.dev/vitals)
- WCAG contrast guidelines (webaim.org/resources/contrastchecker)
- Framer Motion docs (framer.com/motion)
- MDN Web Docs for Intersection Observer, CSS animations

**Overall Confidence: MEDIUM-LOW** — Unable to verify with current sources (2026), but pitfalls are based on long-established principles unlikely to have changed. Validate critical recommendations against official docs before implementation.
