# Architecture Patterns

**Domain:** Premium Next.js Brochure Site
**Researched:** 2026-02-16
**Confidence:** HIGH (Official Next.js documentation)

## Recommended Architecture

Premium Next.js brochure sites should use a **component-based, server-first architecture** that leverages Next.js App Router with React Server Components for optimal performance and static generation.

### System Overview

```
┌─────────────────────────────────────────────────────┐
│                 Root Layout                         │
│  (HTML shell, fonts, metadata, global styles)       │
└──────────────────┬──────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
    ┌────▼─────┐      ┌─────▼──────────┐
    │  Home    │      │  Future Routes │
    │  Page    │      │  (blog, etc)   │
    └────┬─────┘      └────────────────┘
         │
    ┌────▼──────────────────────────────┐
    │   Section Components              │
    │  (Hero, Services, Process, etc)   │
    └────┬──────────────────────────────┘
         │
    ┌────▼──────────────────────────────┐
    │   UI Components                   │
    │  (Button, Card, AnimatedSection)  │
    └───────────────────────────────────┘
```

### Component Boundaries

| Component Layer | Responsibility | Communicates With | Server/Client |
|----------------|----------------|-------------------|---------------|
| **Root Layout** | HTML structure, global providers, fonts, metadata | All pages | Server |
| **Page Components** | Route-specific UI, section orchestration | Section components | Server |
| **Section Components** | Feature-specific UI blocks (Hero, Services, etc) | UI components, data | Server (default) / Client (if interactive) |
| **UI Components** | Reusable primitives (Button, Card, Typography) | Props only | Server (default) / Client (if interactive) |
| **Animation Wrappers** | Scroll animations, transitions | Child components | Client (uses browser APIs) |
| **Utility Functions** | Data formatting, content, helpers | Components via imports | N/A (pure functions) |

### File & Folder Structure

**Recommended: Store project files outside of `app`**

This keeps routing clear and separates concerns. For a brochure site with future extensibility:

```
mira-consultancy/
├── app/                          # Next.js App Router (routing only)
│   ├── layout.tsx                # Root layout (required)
│   ├── page.tsx                  # Home page (/)
│   ├── blog/                     # Future: blog routes
│   │   ├── layout.tsx            # Blog-specific layout
│   │   ├── page.tsx              # Blog index (/blog)
│   │   └── [slug]/
│   │       └── page.tsx          # Blog post (/blog/post-name)
│   ├── case-studies/             # Future: case studies
│   │   └── page.tsx
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Error boundary
│   └── favicon.ico               # Favicon
│
├── components/                   # All React components
│   ├── sections/                 # Page sections (large, feature-specific)
│   │   ├── Hero.tsx
│   │   ├── Intro.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Typography.tsx
│   │   └── AnimatedSection.tsx   # Client component for scroll animations
│   │
│   └── providers/                # Context providers (if needed)
│       └── ThemeProvider.tsx     # Client component
│
├── lib/                          # Utilities and helpers
│   ├── content.ts                # Content data (services, tech stack, etc)
│   ├── utils.ts                  # Helper functions (cn, formatters)
│   └── types.ts                  # TypeScript types/interfaces
│
├── public/                       # Static assets
│   ├── images/
│   └── fonts/ (if self-hosting)
│
├── styles/                       # Global styles (if needed)
│   └── globals.css               # Tailwind directives, custom CSS
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

**Why this structure?**
- **Clear separation**: Routing (`app/`) vs implementation (`components/`, `lib/`)
- **Scalability**: Easy to add `/blog` or `/case-studies` routes later
- **Discoverability**: Components organized by type/function
- **Colocation**: Related files grouped together
- **Type safety**: Centralized types in `lib/types.ts`

### Data Flow

```
1. Build Time (next build)
   └─> Server Components fetch/prepare data
       └─> Static HTML generated
           └─> Optimized for performance

2. Initial Load
   └─> Pre-rendered HTML sent immediately
       └─> Minimal JavaScript for interactivity
           └─> Hydration for client components only

3. User Interaction (scroll, click)
   └─> Client Components respond
       └─> No server round-trip needed
```

**For Mira Consultancy:**
- Content lives in `lib/content.ts` (typed objects)
- Server Components import and render content at build time
- Client Components (`AnimatedSection`) wrap sections for scroll animations
- No runtime data fetching needed (all static)

### Routing Strategy

**Current (Single-Page Landing):**
```
app/
├── layout.tsx          # Root layout with <html>, <body>
└── page.tsx            # Home page imports all sections
```

**Future (Blog + Case Studies):**
```
app/
├── layout.tsx                    # Root layout (shared)
├── page.tsx                      # Home page (/)
│
├── blog/
│   ├── layout.tsx                # Blog-specific layout/nav
│   ├── page.tsx                  # Blog index (/blog)
│   └── [slug]/
│       └── page.tsx              # Dynamic post (/blog/my-post)
│
└── case-studies/
    ├── page.tsx                  # Index (/case-studies)
    └── [slug]/
        └── page.tsx              # Dynamic case study
```

**Static Generation Setup:**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',              // Enable static export
  // trailingSlash: true,        // Optional: /blog/ vs /blog
}

export default nextConfig
```

**Dynamic Routes (Future Blog):**

```typescript
// app/blog/[slug]/page.tsx
import { getBlogPosts } from '@/lib/content'

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Page component (Server Component)
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return <article>{/* render post */}</article>
}
```

## Patterns to Follow

### Pattern 1: Server Components by Default
**What:** All components are Server Components unless they need client-side interactivity.
**When:** Always start with Server Components, add `'use client'` only when needed.
**Why:** Smaller bundle size, better performance, faster load times.

**Example:**
```typescript
// components/sections/Services.tsx (Server Component - default)
import { services } from '@/lib/content'
import { Card } from '@/components/ui/Card'

export function Services() {
  return (
    <section>
      {services.map((service) => (
        <Card key={service.id} {...service} />
      ))}
    </section>
  )
}
```

### Pattern 2: Client Component Boundaries
**What:** Mark components `'use client'` at the smallest possible boundary.
**When:** Component uses hooks, event handlers, or browser APIs.
**Why:** Minimizes JavaScript sent to browser.

**Example:**
```typescript
// components/ui/AnimatedSection.tsx (Client Component)
'use client'

import { useEffect, useRef } from 'react'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(/* ... */)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
```

**Usage in Server Component:**
```typescript
// components/sections/Hero.tsx (Server Component)
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Hero() {
  return (
    <AnimatedSection>
      <h1>Static content rendered on server</h1>
    </AnimatedSection>
  )
}
```

### Pattern 3: Content as Data
**What:** Store content in typed TypeScript objects, not hardcoded in components.
**When:** Any content that might change or need to be reused.
**Why:** Single source of truth, type safety, easier updates.

**Example:**
```typescript
// lib/content.ts
export const services = [
  {
    id: 'modernization',
    title: 'Application Modernization',
    description: 'Transform legacy systems into cloud-native applications',
    icon: 'refresh',
  },
  // ...
] as const

export type Service = typeof services[number]

// lib/types.ts
export interface Service {
  id: string
  title: string
  description: string
  icon: string
}
```

### Pattern 4: Composition Over Configuration
**What:** Build complex UIs by composing simple components.
**When:** Creating page layouts from reusable sections.
**Why:** Flexibility, reusability, easier testing.

**Example:**
```typescript
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Contact />
    </>
  )
}
```

### Pattern 5: Layout Nesting
**What:** Use nested layouts for shared UI across route segments.
**When:** Adding blog or case studies with different navigation/styling.
**Why:** DRY, consistent UX, automatic layout preservation on navigation.

**Example:**
```typescript
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <BlogNav /> {/* Only shows on blog routes */}
      <main>{children}</main>
    </div>
  )
}
```

### Pattern 6: Metadata API
**What:** Use Next.js metadata API for SEO instead of manual `<head>` tags.
**When:** Setting page titles, descriptions, Open Graph tags.
**Why:** Type-safe, automatic deduplication, server-rendered.

**Example:**
```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Mira Consultancy',
    template: '%s | Mira Consultancy',
  },
  description: 'Technology consultancy specializing in cloud-native solutions',
  openGraph: {
    images: ['/og-image.jpg'],
  },
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client Components Everywhere
**What:** Adding `'use client'` to every component "just in case".
**Why bad:** Increases bundle size, slows initial load, defeats Server Component benefits.
**Instead:** Start with Server Components, add `'use client'` only when you get errors about hooks/events.

### Anti-Pattern 2: Inline Styles
**What:** Using `style={{ color: 'red' }}` instead of Tailwind classes.
**Why bad:** Harder to maintain, inconsistent design system, no design tokens.
**Instead:** Use Tailwind utility classes: `className="text-red-500"`.

### Anti-Pattern 3: Hardcoded Content
**What:** Writing content directly in component JSX.
**Why bad:** Hard to update, no reusability, difficult to internationalize later.
**Instead:** Extract to `lib/content.ts` with proper types.

**Bad:**
```typescript
export function Services() {
  return (
    <div>
      <h2>Application Modernization</h2>
      <p>Transform legacy systems...</p>
    </div>
  )
}
```

**Good:**
```typescript
import { services } from '@/lib/content'

export function Services() {
  return (
    <div>
      {services.map(s => (
        <div key={s.id}>
          <h2>{s.title}</h2>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### Anti-Pattern 4: Deeply Nested Components
**What:** Components 5+ levels deep (e.g., `<Page><Section><Container><Card><Item>...`).
**Why bad:** Hard to reason about, prop drilling, performance overhead.
**Instead:** Keep component hierarchies shallow (2-3 levels max for most components).

### Anti-Pattern 5: Using Pages Router Patterns
**What:** Trying to use `getStaticProps`, `_app.js`, `_document.js` from Pages Router.
**Why bad:** App Router works completely differently.
**Instead:** Use Server Components (async by default), root layout, and new data fetching patterns.

### Anti-Pattern 6: Over-Engineering for Future
**What:** Creating complex abstractions for blog/case studies before they're needed.
**Why bad:** YAGNI (You Ain't Gonna Need It), adds complexity, harder to change.
**Instead:** Build what's needed now (landing page), refactor when adding features.

## Static Export Configuration

### Required Setup

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',  // Enables static HTML export
}

export default nextConfig
```

### What Works with Static Export

✅ **Supported:**
- Server Components (rendered at build time)
- Client Components (pre-rendered to HTML, hydrated on client)
- `next/image` (with custom loader for CDN)
- Route Handlers returning static data (`GET` only)
- Static metadata (title, description, OG images)
- CSS Modules, Tailwind CSS
- All static assets in `/public`

❌ **Not Supported:**
- Dynamic routes without `generateStaticParams()`
- Server Actions
- Cookies, headers (server-only APIs)
- Incremental Static Regeneration (ISR)
- On-demand revalidation
- Image optimization with default loader

### Image Optimization for Static Export

Since default image optimization requires a server, use a custom loader:

**Option 1: Unoptimized (simple)**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // Disable optimization
  },
}
```

**Option 2: CDN Loader (production-ready)**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
}

// lib/image-loader.ts
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/YOUR_CLOUD/image/upload/${params.join(',')}${src}`
}
```

## Build Order & Dependencies

### Phase 1: Foundation (Build First)
**Why first:** Everything depends on these.

1. **Project setup**
   - `next.config.ts` with `output: 'export'`
   - `tailwind.config.ts`
   - `tsconfig.json`

2. **Type definitions** (`lib/types.ts`)
   - Service, TechStack, ProcessStep interfaces
   - Ensures type safety from the start

3. **Content data** (`lib/content.ts`)
   - Services, tech stack, process steps
   - Uses types from step 2

4. **Root layout** (`app/layout.tsx`)
   - HTML structure, metadata, fonts
   - Required before any pages render

### Phase 2: UI Primitives (Build Second)
**Why second:** Section components depend on these.

5. **Base UI components** (`components/ui/`)
   - `Container.tsx` - width constraints, padding
   - `Typography.tsx` - headings, paragraphs
   - `Button.tsx` - CTA buttons
   - `Card.tsx` - service cards, tech cards

6. **Animation wrapper** (`components/ui/AnimatedSection.tsx`)
   - Client component for scroll animations
   - Used by all sections

**Dependencies:**
```
AnimatedSection → children (Server Components)
Card → Typography
Button → (standalone)
```

### Phase 3: Section Components (Build Third)
**Why third:** Compose UI primitives into page sections.

7. **Section components** (`components/sections/`)
   - Build in visual order for easier testing:
     - `Hero.tsx` - imports: AnimatedSection, Button
     - `Intro.tsx` - imports: AnimatedSection, Typography
     - `Services.tsx` - imports: AnimatedSection, Card, content
     - `Process.tsx` - imports: AnimatedSection, Card, content
     - `TechStack.tsx` - imports: AnimatedSection, content
     - `About.tsx` - imports: AnimatedSection, Typography
     - `Contact.tsx` - imports: AnimatedSection, Button
     - `Footer.tsx` - imports: Typography

**Dependencies:**
```
All Sections → AnimatedSection (client wrapper)
             → UI Components (Button, Card, etc)
             → Content data (services, tech, etc)
```

### Phase 4: Pages (Build Fourth)
**Why fourth:** Assemble sections into complete pages.

8. **Home page** (`app/page.tsx`)
   - Import and compose all sections
   - Set page-specific metadata

9. **Error boundaries** (`app/error.tsx`, `app/not-found.tsx`)
   - Handle errors gracefully

**Dependencies:**
```
app/page.tsx → All Section Components
app/error.tsx → UI Components (optional)
```

### Phase 5: Future Routes (Build Later)
**When needed:** Only when adding blog or case studies.

10. **Blog structure** (future)
    ```
    app/blog/
    ├── layout.tsx           # Blog-specific nav/layout
    ├── page.tsx             # Blog index
    └── [slug]/
        └── page.tsx         # Post template

    lib/content/
    └── posts.ts             # Blog post data

    components/blog/
    ├── PostCard.tsx         # Preview card
    └── PostContent.tsx      # Article renderer
    ```

### Dependency Graph

```
Root Layout (app/layout.tsx)
    │
    ├─> Fonts, Metadata
    │
    └─> Home Page (app/page.tsx)
            │
            ├─> Hero
            │     ├─> AnimatedSection (client)
            │     └─> Button
            │
            ├─> Services
            │     ├─> AnimatedSection (client)
            │     ├─> Card → Typography
            │     └─> content.ts
            │
            ├─> Process
            │     ├─> AnimatedSection (client)
            │     ├─> Card
            │     └─> content.ts
            │
            ├─> Contact
            │     ├─> AnimatedSection (client)
            │     └─> Button
            │
            └─> Footer
                  └─> Typography
```

**Build order ensures:**
- No circular dependencies
- Types available before content
- UI components ready before sections
- Sections complete before pages
- Clear, testable progression

## Performance Optimizations

### Built-in Next.js Optimizations

1. **Automatic Code Splitting**
   - Each route only loads necessary JavaScript
   - Client Components chunked separately

2. **Static HTML Pre-rendering**
   - Full HTML generated at build time
   - Instant First Contentful Paint

3. **Font Optimization** (`next/font`)
   ```typescript
   // app/layout.tsx
   import { Inter } from 'next/font/google'

   const inter = Inter({ subsets: ['latin'] })

   export default function RootLayout({ children }) {
     return (
       <html className={inter.className}>
         <body>{children}</body>
       </html>
     )
   }
   ```

4. **Image Optimization** (`next/image`)
   - Lazy loading by default
   - Automatic format selection (WebP/AVIF)
   - Responsive sizing

### Tailwind CSS Optimizations

1. **PurgeCSS** (automatic)
   - Removes unused styles
   - Configured in `tailwind.config.ts`:
   ```typescript
   export default {
     content: [
       './app/**/*.{js,ts,jsx,tsx}',
       './components/**/*.{js,ts,jsx,tsx}',
     ],
   }
   ```

2. **Dark mode** (optional for future)
   ```typescript
   // tailwind.config.ts
   export default {
     darkMode: 'class',  // or 'media'
   }
   ```

### Animation Performance

1. **Use CSS transforms** (GPU-accelerated)
   ```typescript
   // Good: translate, scale, opacity
   className="transition-transform hover:scale-105"

   // Avoid: top, left, margin (CPU-intensive)
   ```

2. **Intersection Observer** for scroll animations
   ```typescript
   // Only animate elements when visible
   useEffect(() => {
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             entry.target.classList.add('animate-in')
           }
         })
       },
       { threshold: 0.1 }
     )
   }, [])
   ```

## Scalability Considerations

### At Launch (Single-Page Landing)

**Traffic:** Hundreds of visitors/month
**Approach:** Static HTML hosted on CDN
**Cost:** Near-zero (Vercel free tier, Netlify, etc.)
**Performance:** Excellent (all static)

### At 1K Visitors/Month

**Same approach works.**
- Static hosting scales effortlessly
- No server costs
- Global CDN distribution

### Adding Blog (Future)

**Changes needed:**
1. Add `app/blog/` directory
2. Create `lib/content/posts.ts` (MDX or JSON)
3. Build `generateStaticParams()` for dynamic routes
4. Still 100% static export

**No architecture changes needed.**

### At 10K+ Visitors/Month

**Optimization opportunities:**
1. **Image CDN** (Cloudinary, Imgix)
   - Offload image optimization
   - Better caching

2. **Analytics** (Vercel Analytics, Plausible)
   - Track performance
   - Privacy-friendly

3. **Bundle analysis**
   ```bash
   npm run build
   # Review .next/analyze/ output
   ```

4. **Contact form** (if interactive)
   - Client-side: FormSpree, Netlify Forms
   - Or add API route (requires `output: 'standalone'`)

### Migration Path: Static → Dynamic

If you later need server features (ISR, Server Actions, API routes):

1. **Change config:**
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     // output: 'export',  // Remove this line
   }
   ```

2. **Deploy to platform with Node.js** (Vercel, Railway, etc.)

3. **Add server features incrementally**
   - Contact form → Server Action
   - Blog → ISR with revalidation

**Architecture stays the same.** Components, routing, structure unchanged.

## Testing Strategy

### Component Testing
```typescript
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### Build Testing
```bash
# Test static export builds successfully
npm run build

# Verify output
ls -la out/
# Should see: index.html, _next/, etc.
```

### Visual Testing (Optional)
- Storybook for component showcase
- Chromatic for visual regression

## Deployment

### Static Hosts (Recommended)

**Vercel** (easiest for Next.js)
```bash
npm run build
# Auto-deploys from Git
```

**Netlify**
```bash
npm run build
# Build command: next build
# Publish directory: out
```

**GitHub Pages**
```yaml
# .github/workflows/deploy.yml
- run: npm run build
- uses: peaceiris/actions-gh-pages@v3
  with:
    publish_dir: ./out
```

**Cloudflare Pages**
- Build command: `next build`
- Output directory: `out`

### Domain Setup

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  // Optional: custom domain configuration
  assetPrefix: process.env.NODE_ENV === 'production'
    ? 'https://miraconsultancy.com'
    : '',
}
```

## Sources

All architecture recommendations based on official Next.js documentation:

- [Next.js App Router Documentation](https://nextjs.org/docs/app/building-your-application/routing) (v16.1.6, updated 2026-02-11)
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) (v16.1.6, updated 2026-02-11)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) (v16.1.6, updated 2026-02-11)
- [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) (v16.1.6, updated 2026-02-11)
- [Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) (v16.1.6, updated 2026-02-11)

**Confidence: HIGH** - All recommendations sourced from official Next.js documentation with version verification.
