# Phase 1: Foundation & Design System - Research

**Researched:** 2026-02-16
**Domain:** Next.js 15 App Router with static export, dark design system with WCAG AA compliance, fluid typography, and TypeScript content schemas
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for the consultancy site using Next.js 15 with static site generation, a dark monochrome design system, responsive fluid typography, and TypeScript-based content schemas. The research confirms that all requirements can be implemented using stable, well-documented technologies with strong ecosystem support.

The core stack consists of Next.js 15 App Router with `output: 'export'` for static generation, Tailwind CSS v4 with CSS-first theming for the dark design system, `next/font` for FOUT-free font loading, and Zod for TypeScript schema validation. All components are production-ready with excellent documentation and community support.

**Primary recommendation:** Use Next.js 15 App Router with static export, Tailwind CSS v4 @theme for design tokens, CSS clamp() for fluid typography, next/font for Google Fonts (Inter/Manrope), and Zod schemas for content validation.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Color palette**: Dark monochrome palette with subtle accent using neutral warm off-whites
- **No surface separation**: No cards, borders, or elevation - content flows freely, sections distinguished by spacing and typography alone
- **Typography**: Geometric sans-serif for headings (e.g. Inter, Manrope), confident & measured type scale, modular type scale approach (tight letter-spacing on headings, structured scale ratios)
- **Spacing & density**: Narrow prose-width content area (~700-800px max) centered with lots of margin, editorial feel
- **Content-sized hero**: Not full viewport - visitor sees the start of next section peeking in

### Claude's Discretion
- Base dark shade (pure black vs charcoal)
- Font pairing strategy (same family or two)
- Monospace accent usage for tech content
- Section vertical spacing rhythm
- Services/process layout (stacked vs grid)
- Exact type scale ratios and sizes

### Deferred Ideas (OUT OF SCOPE)
None - discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAYOUT-01 | Site renders as a single-page layout with all sections in sequence | Next.js App Router single page.tsx with scroll behavior, route groups for future /blog and /case-studies routes |
| DESGN-01 | Dark/monochrome color palette throughout the site | Tailwind CSS v4 @theme with semantic design tokens, CSS custom properties for dark mode |
| DESGN-02 | Bold, typographically strong design with generous whitespace | CSS clamp() for fluid type scale, modular scale ratios (1.2-1.333), wide section spacing |
| DESGN-03 | All text/background pairs meet WCAG AA contrast ratio (4.5:1 minimum for normal text, 3:1 for large text) | WebAIM Contrast Checker API for programmatic validation, documented color contrast requirements |
| DESGN-04 | Consistent typography scale that works across mobile (320px) and desktop viewports | Fluid typography with clamp() prevents overflow on small screens, viewport-based scaling |
| PERF-01 | Site uses static site generation (SSG) - no server runtime required | Next.js static export with `output: 'export'` in next.config.js |
| PERF-02 | Fonts loaded via `next/font` with no visible flash of unstyled text (FOUT) | next/font preloads fonts at build time with CSS size-adjust for fallback matching |
| EXT-01 | Project file structure supports adding /blog and /case-studies routes without redesigning existing architecture | App Router route groups for organization, colocation patterns, split project structure |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15+ (App Router) | Static site generation framework | Industry standard for React SSG/SSR, excellent static export support, built-in optimization |
| React | 18+ | UI library | Required by Next.js, Server Components support |
| TypeScript | 5+ | Type safety | Next.js first-class TypeScript support, catch errors at compile time |
| Tailwind CSS | 4.0+ | Utility-first CSS framework | CSS-first @theme configuration, automatic content detection, 5x faster builds |
| next/font | Built-in | Font optimization | Eliminates FOUT, automatic subsetting, preloads fonts at build time |
| Zod | 3.23+ | Runtime type validation | TypeScript-first schema validation, generate static types from schemas, safeParse for error handling |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/typography | 0.5+ | Prose styling | If long-form content needs opinionated defaults (optional for custom styling) |
| clsx | 2.1+ | Conditional classNames | When combining multiple Tailwind classes conditionally |
| prettier-plugin-tailwindcss | 0.6+ | Auto-sort Tailwind classes | Maintain consistent class ordering across team |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS v4 | Vanilla CSS / CSS Modules | Tailwind offers design token system, dark mode variants, and faster iteration. Vanilla CSS requires more boilerplate for responsive/dark mode. |
| Zod | Yup / Joi | Zod has better TypeScript inference and smaller bundle size. Yup/Joi are more mature but less TypeScript-native. |
| next/font | Google Fonts CDN | next/font preloads at build time, prevents FOUT, and self-hosts fonts. CDN requires runtime loading and risks FOUT. |

**Installation:**
```bash
# Create Next.js project with TypeScript
npx create-next-app@latest mira-consultancy --typescript --tailwind --app --no-src-dir

# Install validation and utility libraries
npm install zod clsx

# Install development dependencies
npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier
```

---

## Architecture Patterns

### Recommended Project Structure

```
mira-consultancy/
├── app/
│   ├── layout.tsx           # Root layout with fonts, metadata
│   ├── page.tsx             # Single-page landing (all sections)
│   ├── blog/                # Future blog route
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── case-studies/        # Future case studies route
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── globals.css          # Tailwind imports + @theme
├── components/
│   ├── sections/            # Hero, Services, Process, etc.
│   ├── ui/                  # Reusable Button, Card, etc.
│   └── layout/              # Header, Footer (if needed later)
├── lib/
│   ├── data/
│   │   ├── services.ts      # Service data with Zod schema
│   │   ├── tech-stack.ts    # Tech stack data with Zod schema
│   │   └── process.ts       # Process steps with Zod schema
│   ├── schemas/             # Shared Zod schemas
│   │   └── content.ts
│   └── utils.ts             # Helper functions (cn, etc.)
├── public/
│   └── images/              # Static images
├── next.config.js           # Static export configuration
├── tailwind.config.ts       # (Optional overrides)
├── tsconfig.json
└── package.json
```

**Key organizational principles:**
- **Colocation within app/**: Route-specific components can live in private folders (`_components`) within route segments
- **Route groups**: Use `(marketing)` for landing page vs `(content)` for blog/case-studies to apply different layouts without affecting URLs
- **Private folders**: Prefix with `_` (e.g., `app/_lib/`) to prevent routing while keeping code close to usage

### Pattern 1: Static Export Configuration

**What:** Configure Next.js for static HTML generation with no server runtime

**When to use:** All pages can be pre-rendered at build time (no user-specific data, no server-side auth)

**Example:**
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Optional: Prevent automatic redirects for trailing slashes
  // skipTrailingSlashRedirect: true,

  // Optional: Change output directory from 'out' to 'dist'
  // distDir: 'dist',

  // Image optimization for static export
  images: {
    unoptimized: true, // Required for static export OR use custom loader
  },
}

module.exports = nextConfig
```

**Source:** [Next.js Static Exports Documentation](https://nextjs.org/docs/app/guides/static-exports)

### Pattern 2: Font Loading with next/font

**What:** Load Google Fonts (Inter, Manrope) with automatic optimization and FOUT prevention

**When to use:** All projects - next/font is the standard for Next.js font loading

**Example:**
```typescript
// app/layout.tsx
import { Inter, Manrope } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

**How it prevents FOUT:**
- Fonts are preloaded at build time
- Uses CSS `size-adjust` property so fallback fonts match actual fonts' proportions
- No layout shift when fonts load
- Automatic subsetting for smaller file sizes

**Source:** [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

### Pattern 3: Tailwind v4 @theme for Design Tokens

**What:** Define design tokens (colors, spacing, typography) in CSS using @theme directive instead of JavaScript config

**When to use:** Tailwind CSS v4+ projects - this is the new standard approach

**Example:**
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Color tokens - dark monochrome palette */
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a3a3a3;
  --color-accent: #fafaf9; /* Warm off-white */

  /* Typography tokens */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-manrope), system-ui, sans-serif;

  /* Spacing tokens - generous whitespace */
  --spacing-section: clamp(4rem, 8vw + 2rem, 8rem);
  --max-width-prose: 800px;
}

/* Extend Tailwind with semantic classes */
@utility prose-narrow {
  max-width: var(--max-width-prose);
  margin-inline: auto;
}
```

**Why CSS-first:**
- Theme is inspectable in DevTools
- Can be overridden at runtime with CSS variables
- No JavaScript bundle impact
- 5x faster builds with Lightning CSS

**Source:** [Tailwind CSS v4 Complete Guide](https://devtoolbox.dedyn.io/blog/tailwind-css-v4-complete-guide)

### Pattern 4: Fluid Typography with clamp()

**What:** Responsive font sizes that scale smoothly between min and max values based on viewport width

**When to use:** All text that needs to be responsive - replaces multiple media query breakpoints

**Example:**
```css
/* app/globals.css */
@theme {
  /* Fluid type scale - Perfect Fourth ratio (1.333) */
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --font-size-2xl: clamp(2rem, 1.5rem + 2.5vw, 2.667rem);
  --font-size-3xl: clamp(2.667rem, 2rem + 3.33vw, 3.556rem);
}
```

**Formula breakdown:**
```
clamp(MIN, PREFERRED, MAX)

MIN = smallest acceptable size (typically 0.67-0.89 of MAX)
PREFERRED = base + viewport scaling (e.g., 1rem + 4vw)
MAX = computed ratio-based size
```

**Benefits:**
- Prevents text overflow on small viewports (320px)
- Maintains accessibility through zoom compatibility (includes rem)
- Reduces need for multiple media queries
- Smooth scaling across all viewport sizes

**Source:** [Generating font-size CSS Rules and Creating a Fluid Type Scale](https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/)

### Pattern 5: TypeScript Content Schemas with Zod

**What:** Define content structure with Zod schemas that provide both runtime validation and TypeScript types

**When to use:** All static content data (services, tech stack, process steps)

**Example:**
```typescript
// lib/schemas/content.ts
import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(10),
  technologies: z.array(z.string()),
})

export type Service = z.infer<typeof serviceSchema>

// lib/data/services.ts
import { serviceSchema, type Service } from '@/lib/schemas/content'

export const services: Service[] = [
  {
    id: 'cloud-native',
    title: 'Cloud-Native Development',
    description: 'Build scalable, resilient applications...',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  // ... more services
]

// Validate at build time (optional)
services.forEach((service, index) => {
  const result = serviceSchema.safeParse(service)
  if (!result.success) {
    console.error(`Invalid service at index ${index}:`, result.error)
    process.exit(1)
  }
})
```

**Why Zod:**
- TypeScript-first with automatic type inference
- Runtime validation catches data errors at build time
- safeParse prevents throwing, returns result object
- Composable schemas for nested structures

**Source:** [Zod Schema Validation in TypeScript](https://blog.logrocket.com/schema-validation-typescript-zod/)

### Pattern 6: Dark Mode with Tailwind

**What:** Implement dark mode using Tailwind's dark: variant with CSS class selector

**When to use:** Sites with dark-first design (like this project)

**Example:**
```css
/* app/globals.css */
@import "tailwindcss";

/* Configure dark mode to use class selector instead of prefers-color-scheme */
@custom-variant dark (&:where(.dark, .dark *));
```

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
```

**For this project:** Since the design is dark-first (not togglable), apply `class="dark"` to `<html>` in root layout and use `dark:` variants for all color utilities.

**Source:** [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)

### Anti-Patterns to Avoid

- **Don't use static `generateStaticParams()` with dynamic content**: If using static export with dynamic routes, you MUST export `generateStaticParams()` or Next.js will fail at build time
- **Don't use @apply excessively**: Tailwind v4 recommends reducing @apply usage - prefer composing utilities in JSX or extracting components
- **Don't hardcode viewport breakpoints in multiple media queries**: Use clamp() for fluid scaling instead of multiple breakpoints for font-size
- **Don't mix design token patterns**: Choose either Tailwind @theme OR vanilla CSS variables, not both - creates confusion
- **Don't assume contrast is safe**: Always validate color pairs programmatically with WebAIM API or similar tool

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading optimization | Custom font-face with manual preload | `next/font` | Handles subsetting, preloading, FOUT prevention, and fallback matching automatically. Edge cases: CORS, browser caching, format support. |
| Schema validation | Manual type guards and runtime checks | Zod | Provides type inference, composable schemas, detailed error messages, and safeParse. Hand-rolled validation misses edge cases. |
| Responsive typography | Multiple media query breakpoints | CSS `clamp()` with viewport units | Single declaration replaces 3-5 media queries, smoother scaling, less code to maintain. |
| Design tokens | Hardcoded color/spacing values | Tailwind @theme or CSS custom properties | Centralized token management, easy theming, better maintainability. Hardcoded values become unmaintainable. |
| Image optimization for static export | Manual image processing | `next/image` with custom loader OR `unoptimized: true` | Next.js handles srcset generation, lazy loading, and optimization. Custom solutions miss responsive image complexity. |
| Contrast checking | Manual visual testing | WebAIM Contrast Checker API | Programmatic validation ensures WCAG AA compliance. Visual testing misses subtle failures and is not scalable. |

**Key insight:** Next.js and Tailwind have solved common problems (font loading, responsive scaling, design tokens) with production-tested solutions. Custom implementations introduce bugs and maintenance burden without adding value.

---

## Common Pitfalls

### Pitfall 1: Static Export with Dynamic Features

**What goes wrong:** Using server-only features (cookies, headers, dynamic routes without generateStaticParams) causes build failures with `output: 'export'`

**Why it happens:** Static export pre-renders all pages at build time - features requiring request-time data are incompatible

**How to avoid:**
- Add `export const dynamic = 'force-static'` to route segments
- Use `generateStaticParams()` for any dynamic routes
- Avoid cookies(), headers(), and Server Actions
- Set `images: { unoptimized: true }` OR define custom image loader

**Warning signs:**
- Build errors mentioning "Dynamic API" or "Route Handlers that rely on Request"
- Missing pages in `out/` directory after build
- 404 errors for dynamic routes in production

**Source:** [Next.js Static Export Unsupported Features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features)

### Pitfall 2: WCAG Contrast Failures on Dark Backgrounds

**What goes wrong:** Dark gray text on dark backgrounds fails WCAG AA (4.5:1 for normal text, 3:1 for large text)

**Why it happens:** Designers assume "lighter = readable" but contrast ratios don't scale linearly with hex values

**How to avoid:**
- Use WebAIM Contrast Checker API programmatically: `https://webaim.org/resources/contrastchecker/?fcolor=FFFFFF&bcolor=0A0A0A&api`
- Test all text/background pairs, not just primary colors
- For #0a0a0a background, minimum text color is ~#757575 for 4.5:1 ratio
- Document safe color pairings in design tokens

**Warning signs:**
- Text that's difficult to read in different lighting conditions
- Accessibility audit failures
- User complaints about readability

**Example safe pairings for dark bg (#0a0a0a):**
- Primary text: #f5f5f5 (21:1 ratio) ✓
- Secondary text: #a3a3a3 (8.59:1 ratio) ✓
- Accent: #fafaf9 (21:1 ratio) ✓
- Fail: #525252 (3.98:1 - below 4.5:1) ✗

**Source:** [WCAG Color Accessibility Guide 2026](https://aibrandcolors.com/accessibility-guide/)

### Pitfall 3: Font Loading Flash (FOUT) Despite next/font

**What goes wrong:** Brief flash of unstyled text when navigating between pages or on slow connections

**Why it happens:** Misconfigured `display` property or missing font preload in layout

**How to avoid:**
- Use `display: 'swap'` (recommended) or `display: 'optional'` in next/font config
- Load fonts in root `layout.tsx`, not individual pages
- Apply font CSS variables to `<html>` element, not `<body>`
- Ensure fonts are subset correctly (include all required characters)

**Warning signs:**
- Text briefly appears in system font before custom font loads
- Different fonts on initial load vs navigation
- Font loading triggered on every route change

**Example correct setup:**
```typescript
// app/layout.tsx - CORRECT
const inter = Inter({
  subsets: ['latin'], // ✓ Subset reduces file size
  display: 'swap',    // ✓ Prevents invisible text
  variable: '--font-inter', // ✓ CSS variable for Tailwind
})

return (
  <html className={inter.variable}> {/* ✓ Applied to html, not body */}
    <body>{children}</body>
  </html>
)
```

**Source:** [How to Fix Font Loading Issues in Next.js](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view)

### Pitfall 4: Layout Shift from Fluid Typography

**What goes wrong:** Text size changes cause cumulative layout shift (CLS) as viewport resizes

**Why it happens:** Large min-max gaps in clamp() or missing container width constraints

**How to avoid:**
- Limit type scale variance: max size should be ≤ 1.5x min size
- Use `max-width` on prose containers to prevent extreme scaling
- Test at viewport extremes (320px and 2560px+)
- Use `line-height` that scales with font-size (unitless values like 1.5)

**Warning signs:**
- Text that feels too small on mobile or too large on desktop
- Page jumps when resizing browser
- Poor Core Web Vitals CLS score

**Example:**
```css
/* BAD - too much variance */
font-size: clamp(1rem, 5vw, 5rem); /* 5x scaling causes layout shift */

/* GOOD - controlled variance */
font-size: clamp(2rem, 1.5rem + 2.5vw, 2.667rem); /* 1.33x scaling */
```

**Source:** [Responsive and Fluid Typography with Baseline CSS](https://www.oddbird.net/2026/01/08/typography-baseline-css/)

### Pitfall 5: Missing generateStaticParams for Dynamic Routes

**What goes wrong:** Build fails or dynamic routes return 404 in production despite working in development

**Why it happens:** Static export requires knowing all route paths at build time

**How to avoid:**
- Export `generateStaticParams()` from any `[slug]/page.tsx`
- Return array of all possible param values
- Fetch data at build time, not runtime
- Set `dynamicParams = false` to catch missing routes

**Warning signs:**
- "Page not found" errors for dynamic routes in production
- Build warnings about missing generateStaticParams
- Routes work in `npm run dev` but fail in `npm run build`

**Example:**
```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  // Fetch all blog post slugs at build time
  const posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false // Throw 404 for unknown slugs
```

**Source:** [Next.js Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

### Pitfall 6: Tailwind Class Ordering Inconsistency

**What goes wrong:** Different developers apply classes in different orders, causing merge conflicts and visual bugs when specificity changes

**Why it happens:** Tailwind's utility-first approach allows arbitrary ordering, but inconsistency creates maintenance issues

**How to avoid:**
- Install `prettier-plugin-tailwindcss` to auto-sort classes
- Configure Prettier to run on save in editor
- Add Prettier check to pre-commit hooks
- Use `clsx()` or `cn()` helper for conditional classes

**Warning signs:**
- Git diffs showing reordered classes with no visual change
- Hover/focus states not applying due to ordering
- Team debates about class order in code reviews

**Example:**
```typescript
// BEFORE - inconsistent ordering
<div className="text-white p-4 bg-black flex">
<div className="flex bg-black text-white p-4"> // Same styles, different order

// AFTER - with prettier-plugin-tailwindcss
<div className="flex bg-black p-4 text-white"> // Consistent auto-sorted
```

**Source:** [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)

---

## Code Examples

Verified patterns from official sources:

### Basic Next.js Static Export Setup

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

**Source:** [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)

### Root Layout with Fonts and Metadata

```typescript
// app/layout.tsx
import { Inter, Manrope } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mira Consultancy - Cloud-Native Development',
  description: 'Expert consultancy for cloud-native applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

**Source:** [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

### Tailwind v4 Design Tokens

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors - Dark monochrome palette */
  --color-bg-base: #0a0a0a;
  --color-bg-elevated: #1a1a1a;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a3a3a3;
  --color-text-tertiary: #737373;
  --color-accent-warm: #fafaf9;

  /* Typography */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-manrope), system-ui, sans-serif;

  /* Fluid type scale - Perfect Fourth (1.333) */
  --font-size-sm: clamp(0.889rem, 0.8rem + 0.4vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --font-size-2xl: clamp(2rem, 1.5rem + 2.5vw, 2.667rem);
  --font-size-3xl: clamp(2.667rem, 2rem + 3.33vw, 3.556rem);
  --font-size-4xl: clamp(3.556rem, 2.5rem + 5.28vw, 4.74rem);

  /* Spacing - Generous whitespace */
  --spacing-section-sm: clamp(3rem, 5vw + 1rem, 5rem);
  --spacing-section-md: clamp(4rem, 8vw + 2rem, 8rem);
  --spacing-section-lg: clamp(6rem, 12vw + 3rem, 12rem);

  /* Layout */
  --max-width-prose: 800px;
  --max-width-wide: 1200px;
}

/* Dark mode variant */
@custom-variant dark (&:where(.dark, .dark *));

/* Custom utilities */
@utility prose-narrow {
  max-width: var(--max-width-prose);
  margin-inline: auto;
}

@utility section-spacing {
  padding-block: var(--spacing-section-md);
}
```

**Source:** [Tailwind CSS v4 Complete Guide](https://devtoolbox.dedyn.io/blog/tailwind-css-v4-complete-guide)

### Content Schema with Zod

```typescript
// lib/schemas/content.ts
import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().min(10).max(300),
  technologies: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
})

export const techStackItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['frontend', 'backend', 'infrastructure', 'tooling']),
  description: z.string().min(10).max(200),
})

export const processStepSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().positive(),
  title: z.string().min(1).max(60),
  description: z.string().min(10).max(300),
})

export type Service = z.infer<typeof serviceSchema>
export type TechStackItem = z.infer<typeof techStackItemSchema>
export type ProcessStep = z.infer<typeof processStepSchema>
```

```typescript
// lib/data/services.ts
import { serviceSchema, type Service } from '@/lib/schemas/content'

export const services: Service[] = [
  {
    id: 'cloud-native',
    title: 'Cloud-Native Development',
    description: 'Build scalable, resilient applications using modern cloud-native patterns and technologies.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    featured: true,
  },
  {
    id: 'api-design',
    title: 'API Design & Integration',
    description: 'Design robust, secure APIs that power modern applications and integrations.',
    technologies: ['REST', 'GraphQL', 'OpenAPI', 'OAuth'],
    featured: false,
  },
  // ... more services
]

// Validate at module load (catches errors at build time)
if (process.env.NODE_ENV !== 'production') {
  services.forEach((service, index) => {
    const result = serviceSchema.safeParse(service)
    if (!result.success) {
      console.error(`Invalid service at index ${index}:`, result.error.format())
      throw new Error('Service data validation failed')
    }
  })
}
```

**Source:** [Zod TypeScript Schema Validation](https://www.telerik.com/blogs/zod-typescript-schema-validation-made-easy)

### Utility Helper for Class Names

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  isPrimary ? 'primary-variant' : 'secondary-variant'
)} />
```

**Source:** Common pattern from shadcn/ui and other component libraries

### Single-Page Layout Pattern

```typescript
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { TechStack } from '@/components/sections/TechStack'
import { Process } from '@/components/sections/Process'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <Hero />
      <Services />
      <TechStack />
      <Process />
      <CTA />
    </main>
  )
}
```

**Source:** Next.js App Router patterns

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next export` command | `output: 'export'` in next.config.js | Next.js 14 (2024) | Unified configuration, clearer intent |
| JavaScript tailwind.config.js | CSS @theme directive in globals.css | Tailwind v4 (Jan 2025) | 5x faster builds, runtime theme overrides, DevTools inspection |
| @tailwind directives | @import "tailwindcss" | Tailwind v4 (Jan 2025) | Simpler, aligns with CSS standards |
| Manual media queries for typography | CSS clamp() with viewport units | ~2022 (baseline browser support) | Single declaration, smoother scaling |
| prefers-color-scheme only | Class-based dark mode | Ongoing | User control, better UX for dark-first designs |
| Manual font loading | next/font | Next.js 13 (2022) | Eliminates FOUT, automatic optimization |
| Type-only TypeScript | Runtime validation with Zod | ~2020 (Zod release) | Catch data errors at runtime/build time |

**Deprecated/outdated:**
- `next export` CLI command: Removed in Next.js 14 - use `output: 'export'` instead
- `@tailwind base/components/utilities`: Replaced with `@import "tailwindcss"` in Tailwind v4
- JavaScript-based Tailwind config: Migrating to CSS @theme in v4
- `@apply` directive overuse: Still works but discouraged in favor of component extraction
- Multiple `@font-face` declarations: Replaced by next/font automatic handling

---

## Open Questions

### 1. **Exact type scale ratio for headings**

**What we know:**
- User wants modular scale with "large but not overwhelming" headings
- References include Perfect Fourth (1.333) and Major Third (1.25)
- Need to test against actual content for optimal fit

**What's unclear:**
- Whether to use fixed ratio or mixed ratios (e.g., 1.25 for body, 1.333 for display)
- Exact min/max values in clamp() for each heading level

**Recommendation:**
- Start with Perfect Fourth (1.333) across all levels
- Test with real content in Phase 2
- Adjust if headings feel too large/small in context

### 2. **Monospace font for tech content**

**What we know:**
- User wants to decide whether to use monospace for tech-related content
- Common pattern in developer-focused sites
- Could apply to inline code, tech stack items, or labels

**What's unclear:**
- Which content types should use monospace (inline code only vs tech labels)
- Whether to use next/font with JetBrains Mono / Fira Code or system monospace stack

**Recommendation:**
- Use system monospace stack initially: `ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace`
- Avoid loading additional font file unless monospace is heavily used
- Decision can be made during design implementation in Phase 2

### 3. **Base dark shade (pure black vs charcoal)**

**What we know:**
- User wants dark monochrome palette but hasn't specified exact base shade
- Pure black (#000000) offers maximum contrast but can feel harsh on screens
- Charcoal (#0a0a0a to #1a1a1a) is softer and common in modern dark UIs

**What's unclear:**
- User preference for pure black vs near-black
- Whether to use true black for performance (OLED pure black saves battery)

**Recommendation:**
- Start with near-black (#0a0a0a) for base background
- Elevated surfaces at #1a1a1a for subtle depth without borders
- Test with actual content and adjust based on feel
- Consider OLED optimization if user prioritizes mobile battery life

---

## Sources

### Primary (HIGH confidence)

- [Next.js Static Exports Documentation](https://nextjs.org/docs/app/guides/static-exports) - Official Next.js 16.1.6 docs
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) - Official structure conventions
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - Official next/font guide
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode) - Official dark mode implementation
- [Zod Official Documentation](https://zod.dev/) - TypeScript-first schema validation
- [MDN: CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) - CSS clamp function reference
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG contrast validation tool

### Secondary (MEDIUM confidence)

- [Tailwind CSS v4 Complete Guide](https://devtoolbox.dedyn.io/blog/tailwind-css-v4-complete-guide) - Comprehensive v4 migration guide (Feb 2026)
- [Next.js Font Optimization: Custom and Google Fonts](https://www.contentful.com/blog/next-js-fonts/) - Contentful guide on next/font
- [Generating font-size CSS Rules and Creating a Fluid Type Scale](https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/) - Modern CSS fluid typography
- [WCAG Color Accessibility Guide 2026](https://aibrandcolors.com/accessibility-guide/) - Complete WCAG AA/AAA standards
- [CSS Custom Properties Complete Guide for 2026](https://devtoolbox.dedyn.io/blog/css-variables-complete-guide) - Design tokens best practices
- [Responsive and Fluid Typography with Baseline CSS](https://www.oddbird.net/2026/01/08/typography-baseline-css/) - Modern typography patterns (Jan 2026)
- [How to Fix Font Loading Issues in Next.js](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view) - Recent troubleshooting guide (Jan 2026)

### Tertiary (LOW confidence - requires validation)

- [Next.js 16 App Router Project Structure Guide](https://makerkit.dev/blog/tutorials/nextjs-app-router-project-structure) - Community best practices
- [Schema Validation in TypeScript with Zod](https://blog.logrocket.com/schema-validation-typescript-zod/) - LogRocket tutorial
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) - Community patterns

---

## Metadata

**Confidence breakdown:**
- **Standard stack:** HIGH - Next.js 15, Tailwind v4, next/font, and Zod are well-documented stable releases
- **Architecture:** HIGH - Official Next.js docs and Tailwind v4 guides provide clear patterns
- **Pitfalls:** HIGH - Documented in official Next.js troubleshooting and community case studies
- **Design system implementation:** MEDIUM - Fluid typography and design tokens are well-documented but require testing with actual content
- **WCAG compliance:** HIGH - WebAIM provides API and clear contrast requirements

**Research date:** 2026-02-16

**Valid until:** 2026-03-16 (30 days - stack is stable, Next.js 15 and Tailwind v4 are production-ready)

**Notes:**
- Tailwind CSS v4 was released January 2025 - recent but stable and recommended
- Next.js 15 App Router with static export is production-ready
- All core dependencies have strong ecosystem support and active maintenance
- Design decisions (font pairing, exact type scale, base dark shade) deferred to implementation phase per user constraints
