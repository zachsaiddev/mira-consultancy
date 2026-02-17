# Phase 4: Polish & Performance - Research

**Researched:** 2026-02-17
**Domain:** Web performance, accessibility auditing, image optimization, OG metadata — Next.js static export
**Confidence:** HIGH (most findings verified against official Next.js docs and Chrome Developers documentation)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Performance targets
- Both Lighthouse score (>90 mobile) AND perceived speed matter equally
- Keep all visual effects (gradient orbs, parallax, animations) — optimize what's there, don't remove
- Convert all images to modern formats (WebP/AVIF) for smaller file sizes
- Use Lighthouse score as the primary benchmark — no specific load time target

#### Mobile testing
- Primary device: iPhone (iOS Safari)
- User will test on their actual iPhone — Claude handles DevTools verification during development
- Everything matters: layout, text readability, touch targets, animations, scrolling
- Must look decent in both portrait AND landscape orientation

#### Social previews
- OG image: Mira logo + tagline on dark background — clean and branded
- Description text: Use hero subline as-is ("Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.")
- Standard OG tags that work across all platforms (LinkedIn, Twitter, iMessage, Slack, etc.)

#### Accessibility
- WCAG AA baseline — contrast ratios, keyboard nav, focus indicators, alt text
- Run automated audit (axe/Lighthouse) and fix ALL flagged issues
- Existing reduced-motion and focus-visible support already in place — verify and extend as needed

### Claude's Discretion
- OG image method (static file vs auto-generated) — pick what's simplest and looks good
- Image compression levels — balance quality vs file size
- Specific accessibility fixes — judge severity from audit results
- Any performance optimizations that don't remove visual effects

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

## Summary

This phase optimizes an already-complete Next.js 16 static export site (output: `'export'`, deployed to GitHub Pages under basePath `/mira-consultancy`) for a Lighthouse mobile score above 90. The site uses Tailwind v4, React 19, six animated gradient orbs with an rAF loop, a parallax hook, and two PNG images (`zach.png` at 2.3MB/1300x1300 and `logo.png` at 20KB/244x89). There are no server-side rendering capabilities — everything must be static.

**The most impactful single action is image optimization.** `zach.png` at 2.3MB will dominate LCP and likely prevent any score above 70 on mobile without intervention. Since `output: 'export'` disables Next.js's built-in image optimization pipeline (`images: { unoptimized: true }` is already set), images must be pre-converted with a CLI tool (Sharp or `cwebp`/`avifenc`) at build time. The existing `next/image` `<Image>` components can serve these WebP files directly with `unoptimized` still set.

For OG metadata: the `ImageResponse`/`opengraph-image.tsx` code-based approach does NOT work with `output: 'export'`. The correct approach is to place a static `opengraph-image.png` file in `app/` (Next.js file convention), which gets automatically picked up and generates the correct `<meta property="og:image">` tags. The OG image itself needs to be hand-crafted (Figma, HTML/CSS screenshot, or canvas script) — it won't be auto-generated at build time. Metadata (title, description, twitter card, url, siteName) goes in `app/layout.tsx` via the `metadata` export object.

**Primary recommendation:** Convert `zach.png` to WebP at ~400px width before anything else. That alone likely gets you 15–20 Lighthouse points on mobile.

---

## Critical Pre-existing Bug

**`About.tsx` references `/images/profile.jpg` but the file is `public/images/zach.png`.**

The image will 404 on the deployed site. This must be fixed as part of the image optimization work — rename the file or update the src. Since we're converting to WebP anyway, the path becomes `/images/zach.webp`.

---

## Standard Stack

### Core (no new installs required)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|-------------|
| Next.js `metadata` export | 16.x | OG tags, title, description | Built-in, zero overhead |
| `next/font/google` | 16.x | Font preloading already configured | Already in layout.tsx |

### Supporting (install for image conversion)

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| `sharp` | ^0.33 | CLI/script image conversion to WebP/AVIF | One-off conversion script at build |
| `@axe-core/playwright` | ^4.10 | Automated accessibility audit | Run once, fix all flagged issues |
| `playwright` | ^1.50 | Browser automation for axe audit | Needed by @axe-core/playwright |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `sharp` script | Squoosh CLI | Squoosh CLI is unmaintained since 2023; sharp is actively maintained and faster |
| `sharp` script | `cwebp` + `avifenc` | Native CLI tools work but require separate installs; sharp is JS-native and scriptable |
| `@axe-core/playwright` | Lighthouse accessibility tab | Lighthouse catches fewer issues (~30%); axe catches ~50% of WCAG violations automatically |
| Static `opengraph-image.png` | `opengraph-image.tsx` (ImageResponse) | ImageResponse does NOT work with `output: 'export'` — confirmed Next.js limitation |

**Installation:**
```bash
npm install --save-dev sharp @axe-core/playwright playwright
```

---

## Architecture Patterns

### Recommended Project Structure (additions only)

```
public/images/
├── zach.webp           # Converted from zach.png (replaces profile.jpg reference)
├── logo.webp           # Converted from logo.png
├── zach.png            # Keep original as fallback (optional)
└── logo.png            # Keep original as fallback (optional)

app/
├── opengraph-image.png # Static OG image (1200x630) — Next.js file convention
├── opengraph-image.alt.txt  # Alt text for OG image
└── layout.tsx          # Add metadata export with OG fields, metadataBase

scripts/
└── optimize-images.mjs # One-time sharp conversion script
```

### Pattern 1: Static OG Image via File Convention

**What:** Place `opengraph-image.png` directly in `app/`. Next.js file convention detects it and injects all required `<meta>` tags automatically.

**When to use:** Always for static exports. The alternative (`opengraph-image.tsx`) requires a server and doesn't work with `output: 'export'`.

**Example head output generated automatically:**
```html
<meta property="og:image" content="https://zach.said.github.io/mira-consultancy/opengraph-image.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Creation approach (Claude's discretion — use a Node script):**
The OG image (1200x630, dark background `#0a0c14`, Mira logo centered, tagline below) can be produced by:
1. A small Node script using `sharp` to composite logo onto a dark background with text (simplest, no design tool needed)
2. Taking a screenshot of an HTML page at 1200x630 using Playwright (more control over typography)
3. Manual export from Figma/design tool (requires user action)

Recommended: Node script with `sharp` — same tool already installed for image conversion. No user action required.

### Pattern 2: Metadata Object in layout.tsx

**What:** Export `metadata` const from `app/layout.tsx` with full OG, Twitter Card, and canonical fields.

**Critical:** `metadataBase` must be set for relative OG image URLs to resolve correctly on GitHub Pages.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://zach.said.github.io/mira-consultancy'),
  title: 'Mira Consultancy — Custom Software for Growing Businesses',
  description: 'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
  openGraph: {
    title: 'Mira Consultancy — Custom Software for Growing Businesses',
    description: 'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
    url: 'https://zach.said.github.io/mira-consultancy',
    siteName: 'Mira Consultancy',
    images: ['/opengraph-image.png'],  // resolved against metadataBase
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mira Consultancy — Custom Software for Growing Businesses',
    description: 'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
    images: ['/opengraph-image.png'],
  },
}
```

**Note:** File-based metadata (`opengraph-image.png` in `app/`) has higher priority than the `metadata` object for the image URL — so adding both the file AND the metadata object means the file takes precedence for the image, while the metadata object covers everything else (title, description, url, siteName, twitter).

### Pattern 3: Image Optimization Script

**What:** One-time Node script using `sharp` to convert PNG originals to WebP at appropriate display sizes.

```javascript
// scripts/optimize-images.mjs
// Source: https://sharp.pixelplumbing.com/
import sharp from 'sharp'
import { join } from 'node:path'

const PUBLIC = 'public/images'

await sharp(join(PUBLIC, 'zach.png'))
  .resize(400, 400, { fit: 'cover', position: 'top' })
  .webp({ quality: 82 })
  .toFile(join(PUBLIC, 'zach.webp'))

await sharp(join(PUBLIC, 'logo.png'))
  .webp({ quality: 90 })
  .toFile(join(PUBLIC, 'logo.webp'))

console.log('Images optimized.')
```

**After running:** Update `About.tsx` src from `/images/profile.jpg` to `/images/zach.webp` and `Hero.tsx` src from `/images/logo.png` to `/images/logo.webp`.

**Important:** Keep `unoptimized` prop on `<Image>` components — this is required for `output: 'export'`. The optimization is done ahead-of-time by our script, not at runtime by Next.js.

### Pattern 4: rAF Loop Optimization (BackgroundGradient)

**What:** The existing rAF loop in `BackgroundGradient.tsx` runs every frame and updates 6 orb `opacity` values plus 3 CSS custom properties. This is architecturally fine — it avoids layout thrashing by only touching `style` (compositor-only properties). The main concern is that 6 elements with `will-change: transform, opacity, translate` and `filter: blur(100px)` each create GPU layers.

**The problem:** On mobile, `filter: blur(100px)` on 6 large (50–60vw) elements is very expensive. Each blur pass requires the browser to process the full element area. Reducing blur radius or orb count are the two levers — but the user has locked "keep all visual effects."

**Optimization approach (within constraints):**
- Reduce blur from `100px` to `60-70px` — blur radius is the primary GPU cost, visually indistinguishable at this scale
- Add `contain: strict` or `content-visibility: auto` to the orb container? No — the orbs are `fixed` and always in view, so content-visibility won't help
- Ensure `will-change` is only on the animated properties — currently it's `will-change: transform, opacity, translate` which is correct, the orb classes should NOT additionally list `filter` since the blur is static

**LERP speed check:** Current LERP_SPEED is 0.03 — already very low. On mobile, consider increasing it slightly to 0.05 so orbs reach their targets faster and fewer frames show "in-between" states, reducing perceived jank.

### Pattern 5: Accessibility Audit

**What:** Run axe-core against the deployed site to find all WCAG AA violations.

```typescript
// scripts/a11y-audit.mjs
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('https://[username].github.io/mira-consultancy')
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa'])
  .analyze()
console.log('Violations:', JSON.stringify(results.violations, null, 2))
await browser.close()
```

**Known areas to audit from code review:**
- `<a>` elements (Button component) — already have text content, but check minimum touch target size (44x44px WCAG 2.5.5, advisory)
- `tech-stack` icon divs — have `title` attribute but no `aria-label`, and icons lack accessible names
- Orb container has `aria-hidden="true"` — correct
- Film grain `body::before` pseudo-element — decorative, no text needed
- `focus-visible` is implemented in globals.css — verify it works in all browsers
- `prefers-reduced-motion` guards exist in BackgroundGradient and useParallax — verify AnimatedSection also respects it (currently it does not check `prefers-reduced-motion` — this is a gap)

### Anti-Patterns to Avoid

- **Using `opengraph-image.tsx` with ImageResponse on a static export:** The route handler requires a server to generate images on-demand. With `output: 'export'`, no server exists. Use a static PNG file instead.
- **Setting OG image URL without `metadataBase`:** Without `metadataBase`, relative paths in `metadata.openGraph.images` cause build errors. Must set `metadataBase: new URL('https://zach.said.github.io/mira-consultancy')`.
- **Converting images to AVIF for the OG image:** OG images must be in JPG, PNG, or GIF format — not AVIF. Use PNG for the OG image, WebP for page images.
- **Applying `will-change` to elements that aren't actually animating:** The `transition` on `.gradient-orb` (line 110 in globals.css) sets `will-change: transform, opacity, translate`. This is appropriate since the JS animates these. But don't add more `will-change` declarations.
- **Running Lighthouse on localhost:** The phase context specifically says to test on the live deployed URL. Mobile network simulation is more realistic on the deployed site.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WebP conversion | Custom image resizer | `sharp` npm script | Sharp handles resize, format, quality, metadata stripping in one call; handles edge cases |
| Accessibility audit | Manual code review | `@axe-core/playwright` | Catches color contrast ratios, ARIA mistakes, missing labels automatically |
| OG image generation | Custom canvas renderer | Static PNG file + Next.js file convention | Zero complexity; Next.js handles all the meta tags automatically |
| Font optimization | Manual font subsetting | `next/font/google` (already in use) | Already configured with `display: 'swap'` and subsetting; nothing to add |

**Key insight:** Image optimization for static exports is entirely pre-build work — there's no runtime pipeline. The right tool is a simple Node script run once, not an abstraction layer.

---

## Common Pitfalls

### Pitfall 1: OG Image URL Wrong on GitHub Pages (basePath)

**What goes wrong:** OG image URL resolves to `https://zach.said.github.io/opengraph-image.png` (root) instead of `https://zach.said.github.io/mira-consultancy/opengraph-image.png` (with basePath). LinkedIn, Slack, iMessage won't find the image.

**Why it happens:** Next.js resolves `metadataBase` + relative image path. If `metadataBase` doesn't include the basePath, the image URL is wrong.

**How to avoid:** Set `metadataBase: new URL('https://zach.said.github.io/mira-consultancy')` — include the full path including basePath.

**Warning signs:** Paste the deployed URL into [opengraph.xyz](https://www.opengraph.xyz) or the LinkedIn post inspector — if the image shows as broken, basePath is wrong.

### Pitfall 2: `profile.jpg` 404 Bug

**What goes wrong:** `About.tsx` has `src="/images/profile.jpg"` but the actual file is `public/images/zach.png`. The image 404s silently (Next.js `<Image>` with `unoptimized` doesn't throw at build time for static paths).

**Why it happens:** The path was never corrected during development.

**How to avoid:** Fix it during the WebP conversion step — the new path will be `/images/zach.webp`.

**Warning signs:** Run `next build` and check for the image in the `out/` directory.

### Pitfall 3: filter: blur() on Mobile Killing Performance

**What goes wrong:** Six gradient orbs each with `filter: blur(100px)` on 50–60vw elements force 6 separate GPU layers. On a mid-range phone, this costs 10–20ms per paint, causing dropped frames and degrading TBT.

**Why it happens:** CSS `filter: blur()` cost scales quadratically with blur radius and linearly with element area. On desktop GPU it's invisible. On mobile GPU it's measurable.

**How to avoid:** Reduce blur to 60–70px. Visually equivalent at large scale. Reduces GPU texture processing area.

**Warning signs:** DevTools Performance panel shows "GPU" in the flame chart spiking during scroll on mobile emulation. Lighthouse TBT > 300ms on mobile.

### Pitfall 4: AnimatedSection Not Respecting `prefers-reduced-motion`

**What goes wrong:** `AnimatedSection.tsx` uses `useInView` to trigger fade-in transitions. The CSS global at the bottom of `globals.css` sets `transition-duration: 0.01ms` for reduced-motion users, which technically disables it — but the `opacity-0` initial state still flashes before the transition is disabled.

**Why it happens:** The component uses inline `style.transitionDuration` which overrides the CSS `!important` rule in some cases.

**How to avoid:** Check `useReducedMotion` (via `window.matchMedia`) in `AnimatedSection` and skip the animation entirely — render children as `opacity-100 translate-y-0` immediately. The existing BackgroundGradient and useParallax both do this correctly.

**Warning signs:** Lighthouse accessibility audit flags motion-related issues; manual test with System Preferences > Accessibility > Reduce Motion on macOS.

### Pitfall 5: Lighthouse Mobile Score vs Field Data

**What goes wrong:** The Lighthouse mobile test uses a simulated 4x CPU slowdown and "Moto G Power" device profile. The real iPhone experience will be better. Don't obsess over squeezing from 92 to 98 — 90+ is the target.

**Why it happens:** Lighthouse mobile emulation is deliberately pessimistic to catch real-world slow devices.

**How to avoid:** Test with Lighthouse on the live URL (`lighthouse https://zach.said.github.io/mira-consultancy --form-factor mobile`), accept 90+ as success.

**Warning signs:** Score varies ±5 points between Lighthouse runs — this is normal. Average 3 runs.

---

## Code Examples

Verified patterns from official sources:

### OG Metadata in layout.tsx

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://zach.said.github.io/mira-consultancy'),
  title: 'Mira Consultancy — Custom Software for Growing Businesses',
  description: 'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
  openGraph: {
    title: 'Mira Consultancy — Custom Software for Growing Businesses',
    description: 'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
    url: 'https://zach.said.github.io/mira-consultancy',
    siteName: 'Mira Consultancy',
    locale: 'en_US',
    type: 'website',
    // opengraph-image.png file in app/ takes precedence for image URL
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mira Consultancy — Custom Software for Growing Businesses',
    description: 'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
  },
}
```

### Static OG Image File Convention

```
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
// Place file at: app/opengraph-image.png
// Next.js automatically generates:
//   <meta property="og:image" content="https://zach.said.github.io/mira-consultancy/opengraph-image.png" />
//   <meta property="og:image:type" content="image/png" />
//   <meta property="og:image:width" content="1200" />
//   <meta property="og:image:height" content="630" />
// Supported types: .jpg, .jpeg, .png, .gif (NOT .webp or .avif)
// Max file size: 8MB
```

### Sharp Image Optimization Script

```javascript
// scripts/optimize-images.mjs
// Source: https://sharp.pixelplumbing.com/
import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public', 'images')

// Profile photo: resize to 400x400 (displayed at max 200px, 2x for retina)
await sharp(join(PUBLIC, 'zach.png'))
  .resize(400, 400, { fit: 'cover', position: 'top' })
  .webp({ quality: 82 })
  .toFile(join(PUBLIC, 'zach.webp'))

// Logo: keep original dimensions, just convert format
await sharp(join(PUBLIC, 'logo.png'))
  .webp({ quality: 90 })
  .toFile(join(PUBLIC, 'logo.webp'))

console.log('Done. Check public/images/ for .webp files.')
```

### Reduced-Motion Guard in AnimatedSection

```typescript
// Pattern: check prefers-reduced-motion before animating
// Source: Consistent with BackgroundGradient.tsx and useParallax.ts in this codebase

import { useEffect, useState } from 'react'

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return reduced
}

// In AnimatedSection: if prefersReducedMotion, skip animation classes entirely
// render children immediately as fully visible
```

### Lighthouse CLI Command

```bash
# Install lighthouse globally (or use npx)
npx lighthouse https://zach.said.github.io/mira-consultancy \
  --form-factor=mobile \
  --throttling-method=simulate \
  --output=html \
  --output-path=./lighthouse-report.html \
  --chrome-flags="--headless"
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next export` CLI command | `output: 'export'` in next.config | Next.js 14 | Already in use correctly |
| Manual `<meta>` tags in `_document.js` | `metadata` export object in `layout.tsx` | Next.js 13 App Router | Cleaner, type-safe, auto-generated tags |
| `ImageResponse` for OG images | Static file `opengraph-image.png` | Always for static export | ImageResponse requires server; static file is the correct approach |
| `squoosh-cli` | `sharp` | 2023 (Squoosh CLI unmaintained) | Sharp is maintained, faster, better API |
| `themeColor` in metadata | `generateViewport()` export | Next.js 14 | Deprecated — don't use `themeColor` in metadata object |

**Deprecated/outdated:**
- `@squoosh/cli`: Unmaintained since 2023; replace with `sharp`
- `themeColor` in `metadata` object: Deprecated in Next.js 14, use `generateViewport()` instead
- `colorScheme` in `metadata` object: Same deprecation

---

## Open Questions

1. **What is the actual GitHub Pages username/repo URL?**
   - What we know: basePath is `/mira-consultancy`, it deploys to GitHub Pages
   - What's unclear: Full URL needed for `metadataBase` — is it `zach.said.github.io/mira-consultancy` or a custom domain?
   - Recommendation: Check the GitHub repo settings for the Pages URL before setting `metadataBase`. If a custom domain is used, `metadataBase` should be that domain.

2. **Is `zach.png` the final photo, or is `profile.jpg` a different file the user intends to add?**
   - What we know: `About.tsx` references `/images/profile.jpg` which 404s; only `zach.png` exists
   - What's unclear: Was `profile.jpg` intentional or a copy-paste error?
   - Recommendation: Treat as a bug — convert `zach.png` to `zach.webp` and update the `src` reference. If the user wants a different photo, they can swap the file.

3. **Reduce blur radius from 100px to 60-70px — will user notice?**
   - What we know: blur radius is the primary GPU cost; 6 orbs at 100px blur on 50-60vw elements is expensive on mobile
   - What's unclear: Whether the Lighthouse score will hit 90+ without this optimization (depends on the phone's GPU)
   - Recommendation: Make it conditional — run Lighthouse first, and if TBT is the bottleneck, reduce blur. Document this as an optional optimization.

---

## Sources

### Primary (HIGH confidence)
- Next.js Docs v16.1.6 (2026-02-11): `opengraph-image` file convention — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Next.js Docs v16.1.6 (2026-02-11): `generateMetadata` / `metadataBase` — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js Docs v16.1.6 (2026-02-11): Static exports — https://nextjs.org/docs/app/guides/static-exports
- Chrome Developers: Lighthouse Performance Scoring — https://developer.chrome.com/docs/lighthouse/performance/performance-scoring
- Direct codebase analysis: `BackgroundGradient.tsx`, `useParallax.ts`, `About.tsx`, `Hero.tsx`, `globals.css`, `next.config.ts`

### Secondary (MEDIUM confidence)
- GitHub Discussion confirmed: OG image generation (ImageResponse) doesn't work with static export — https://github.com/vercel/next.js/discussions/55890
- Sharp npm package: active maintenance confirmed, squoosh-cli unmaintained — verified via npm registry
- Web.dev/Chrome TBT documentation: 300ms threshold for mobile — https://web.dev/articles/tbt

### Tertiary (LOW confidence)
- CSS `filter: blur()` mobile performance impact: documented across multiple sources but specific numbers vary by device generation
- Reducing blur from 100px to 60-70px as equivalent visual result: engineering judgment, not formally benchmarked

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against Next.js 16.1.6 official docs directly
- Architecture: HIGH — patterns confirmed from official docs; OG static-export limitation confirmed in GitHub discussions
- Pitfalls: HIGH for the 404 bug and basePath issue (directly observed in code); MEDIUM for mobile blur performance (general CSS knowledge, not device-specific benchmarks)
- Image optimization numbers: MEDIUM — "400px @ 82 quality" is reasonable practice, needs verification against actual visual quality during implementation

**Research date:** 2026-02-17
**Valid until:** 2026-03-17 (Next.js docs update frequently; re-verify OG file convention behavior if Next.js version changes)
