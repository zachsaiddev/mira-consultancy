# Stack Recommendations

**Domain:** Premium Consultancy Brochure Site
**Researched:** 2026-02-16
**Confidence:** HIGH (Stack is user-specified, recommendations are for complementary tools)

## Core Stack (User-Specified)

| Technology | Version | Rationale | Confidence |
|-----------|---------|-----------|------------|
| **Next.js** | 15.x (latest) | Framework — SSG, App Router, built-in optimizations | HIGH |
| **TypeScript** | 5.x | Type safety, better DX | HIGH |
| **React** | 19.x | UI library (ships with Next.js 15) | HIGH |
| **Tailwind CSS** | 4.x | Utility-first CSS, rapid styling, built-in dark mode support | HIGH |

## Complementary Stack

### Fonts

| Choice | Rationale | Confidence |
|--------|-----------|------------|
| **`next/font`** (built-in) | Automatic optimization, subsetting, zero CLS. Self-hosts Google Fonts. | HIGH |
| **Inter** or **Geist Sans** (body) | Clean, modern, excellent readability. Geist is Vercel's own font, optimized for Next.js. | HIGH |
| **Geist Mono** or **JetBrains Mono** (code/tech) | For tech stack display, monospace accents | MEDIUM |

For bold typography, consider a display font pairing:
- **Instrument Serif** — editorial feel, pairs well with sans-serif body
- **Playfair Display** — classic serif for headlines if going editorial
- **Syne** — geometric, modern, bold — fits "confident without being stiff"

### Animations

| Choice | Rationale | Confidence |
|--------|-----------|------------|
| **CSS + Intersection Observer** (primary) | Zero bundle cost, GPU-accelerated, sufficient for subtle fade-ins | HIGH |
| **Framer Motion** (optional, if needed) | Only if orchestrated animations needed. ~30KB gzipped. | MEDIUM |

**Recommendation:** Start with native Intersection Observer + CSS transitions. Only add Framer Motion if you need staggered entrance animations or complex orchestration. For subtle fade-ins on scroll, native is sufficient and lighter.

### Utilities

| Tool | Purpose | Confidence |
|------|---------|------------|
| **clsx** or **cn (tailwind-merge)** | Conditional class merging | HIGH |
| **@next/bundle-analyzer** | Monitor bundle size | HIGH |

### Linting & Formatting

| Tool | Purpose | Confidence |
|------|---------|------------|
| **ESLint** (ships with Next.js) | Code quality | HIGH |
| **Prettier** | Code formatting | HIGH |

### Deployment

| Option | Best For | Confidence |
|--------|----------|------------|
| **Vercel** | Easiest for Next.js, free tier | HIGH |
| **Cloudflare Pages** | Edge performance, generous free tier | HIGH |
| **Netlify** | Good alternative, static hosting | MEDIUM |

## What NOT to Use

| Technology | Why Avoid |
|-----------|-----------|
| **GSAP** | Overkill for subtle animations, commercial license required |
| **Locomotive Scroll** | Heavy, complex setup, conflicts with Next.js hydration |
| **styled-components / Emotion** | Tailwind is specified; CSS-in-JS adds runtime cost |
| **Redux / Zustand** | No state management needed for static brochure site |
| **Contentful / Strapi / CMS** | Premature for v1; content is static and provided |
| **Prisma / Drizzle** | No database needed |
| **shadcn/ui** | Designed for app UIs, not editorial/brochure design. Would impose its design system. |

## Package.json Essentials

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "^15",
    "prettier": "^3",
    "prettier-plugin-tailwindcss": "^0.6",
    "@next/bundle-analyzer": "^15"
  }
}
```

## Sources

- Next.js documentation (nextjs.org/docs)
- Tailwind CSS v4 documentation (tailwindcss.com)
- User-specified stack requirements
