# Phase 3: Core Content Sections - Research

**Researched:** 2026-02-16
**Domain:** Single-page content section implementation with Next.js 15 App Router — Hero, Intro, Services, Process, Tech Stack, About, Contact, and Footer sections using existing design system and UI primitives
**Confidence:** HIGH

## Summary

Phase 3 implements the complete single-page experience by building all visible content sections using the design system from Phase 1 and UI primitives from Phase 2. The research confirms this is straightforward component composition work with well-established patterns. All technical infrastructure is in place: Next.js 15 App Router with static export, Tailwind v4 design tokens, AnimatedSection wrapper for scroll reveals, Button component for CTAs, and Zod-validated content data.

The user has made clear decisions about presentation style: editorial and typographic with minimal decoration, hero at partial viewport height to hint at content below, services as simple text blocks without cards, and footer as a two-row layout with copyright/location and social links. The primary technical considerations are responsive design from 320px to desktop, proper semantic HTML for accessibility, and ensuring all sections work cohesively as a continuous scroll experience.

**Primary recommendation:** Build sections as React Server Components in a `components/sections/` folder, use semantic HTML (`<section>`, `<h1>`, `<h2>`, `<p>`), wrap each section with `<AnimatedSection>` for scroll-triggered fade-ins, leverage existing CSS utilities (`prose-width`, `section-padding`, `.section-label`), and test responsive behavior at 320px, 375px, 768px, and 1280px+ viewports.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero presentation:**
- Partial viewport height (~70-80vh) — hint of next section peeks below
- Left-aligned text positioning — editorial, reads naturally
- Solid dark background — no gradient or texture, text does the work
- CTA as styled text link with arrow — minimal, confident, not a filled button

**Services display:**
- Minimal text blocks — title + description pairs with generous spacing, no card borders or grid
- Clean, editorial feel — let the typography carry the weight

**Process visualization:**
- Claude's discretion on how to visualize the 4 steps (numbered steps vs timeline vs other)
- Should feel consistent with the minimal text approach used elsewhere

**Tech stack display:**
- Horizontal row of small tech logos/icons — subtle and scannable
- Not text-only, not badges — actual logos

**Section headings:**
- Subtle, muted section labels — present but not dominant
- Not large bold headings, not invisible either

**Content flow & rhythm:**
- Sections separated by subtle thin horizontal divider lines
- Intro section flows as a continuation of the hero — same visual treatment, no break between them
- Medium content width (max ~900px) — comfortable reading with breathing room
- About section includes a photo alongside the bio text

**Contact section:**
- Consistent visual weight with other sections — not a bold finale, part of the flow
- CTA as styled text link with arrow — same style as hero CTA
- Email fallback displayed alongside

**Footer:**
- Two-row layout: copyright + location on one row, social links on another
- Social links as icons only (LinkedIn, GitHub, Email) — clean and compact

### Claude's Discretion

- Process section visualization approach (numbered steps, timeline, or other)
- Exact spacing and vertical rhythm between sections
- Loading/animation sequencing for section reveals
- About section photo + text layout arrangement
- Intro section copy length and formatting

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAYOUT-02 | Site is fully responsive from 320px (iPhone SE) to desktop | Mobile-first approach with Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px); test at 320px, 375px, 390px, 768px, 1280px viewports; CSS clamp() for fluid spacing prevents overflow |
| LAYOUT-03 | Footer displays copyright "© 2026 Mira Consultancy", "London, UK", and LinkedIn/GitHub/Email links | Two-row flexbox layout with Flexbox gap for spacing; social icons as inline SVG or icon components with aria-label for accessibility |
| HERO-01 | Hero displays headline "I build the tools your business actually needs." | `<h1>` with design system's `--font-size-4xl` fluid type scale (clamp 3rem to 4rem); left-aligned text in prose-width container |
| HERO-02 | Hero displays subline describing Mira's services and value proposition | `<p>` with `--font-size-lg` (clamp 1.125rem to 1.5rem) and `text-text-secondary` color; max-width constraint (~38rem) for readability |
| HERO-03 | Hero has "Let's talk" CTA button linking to Calendly | Existing `<Button>` component with `variant="primary"` and `external={true}` props; Calendly link opens in new tab |
| INTRO-01 | Intro section displays positioning narrative about Zach and Mira Consultancy | Follows hero with no visual divider; same prose-width and padding; narrative copywriting pattern: who, what, why, for whom |
| SERV-01 | Services section displays 5 service offerings with titles and descriptions | Vertical stacked layout using existing `services` data array; `space-y-10` utility for generous spacing; no cards, just typography hierarchy |
| PROC-01 | Process section displays 4-step "How I Work" flow | Vertical numbered list using existing `processSteps` data; `.section-label` for step numbers (01, 02, 03, 04); consistent with editorial text approach |
| TECH-01 | Tech stack section displays technologies as a subtle row | Horizontal flexbox row grouped by category (frontend, backend, infrastructure, automation); tech-stack-icons.com or techicons.dev for SVG logos; `grayscale` filter for muted monochrome effect |
| ABOUT-01 | About section displays personal bio including London base, experience, stack, and music personality detail | Flexbox or Grid layout with photo + text; responsive: stacked on mobile, side-by-side on desktop; photo as `<img>` with `unoptimized` for static export |
| CTA-01 | Contact section displays "Got a problem that needs solving?" headline and subline | `<h2>` with same typography treatment as other section headings; editorial tone matching intro/about copy |
| CTA-02 | Contact section has "Get in touch" CTA button linking to Calendly | Existing `<Button>` component with `variant="primary"` and `external={true}`; same interaction as hero CTA |
| CTA-03 | Contact section shows email fallback link (hello@[domain]) | `<Button>` component with `variant="secondary"` and `href="mailto:hello@mira.co"`; displays below primary CTA with vertical spacing |

</phase_requirements>

---

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router with static export | Industry standard for React SSG; app/page.tsx single-page pattern; semantic HTML with React Server Components |
| React | 19.2.4 | UI library | Required by Next.js; Server Components default in App Router |
| TypeScript | 5.9.3 | Type safety | Already integrated; content data uses Zod schemas with inferred TypeScript types |
| Tailwind CSS | 4.1.18 | Utility-first CSS framework | Design system already defined in globals.css with @theme tokens; responsive utilities built-in |
| Zod | 3.23.2 | Content schema validation | Already used in Phase 1 for services, tech-stack, and process data validation |
| react-intersection-observer | 9.14.0 | Scroll-triggered animations | Already used in Phase 2; AnimatedSection component wraps all sections for fade-in reveals |

### Supporting (Already Available)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx + tailwind-merge | 2.1.1 + 3.4.1 | Conditional className utility | Already available via `cn()` helper in lib/utils.ts; use for dynamic class composition |
| next/font (Google) | Built-in | Font optimization | Already configured with Inter (sans) and Manrope (display) in app/layout.tsx |

### New Resources Needed

| Resource | Purpose | Source | Format |
|----------|---------|--------|--------|
| Tech stack logos | SVG icons for tech stack display | tech-stack-icons.com or techicons.dev | SVG (inline or imported) |
| Social media icons | LinkedIn, GitHub, Email icons for footer | Heroicons, Lucide, or inline SVG | SVG components |
| Profile photo | About section image | User-provided | JPG/PNG (unoptimized for static export) |

**Note:** No new npm packages required. All infrastructure is in place from Phases 1-2.

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── layout.tsx              # Root layout (already exists)
├── page.tsx                # Single-page home (Hero, Intro, Services, etc.)
└── globals.css             # Design tokens (already exists)

components/
├── sections/               # NEW: Content section components
│   ├── Hero.tsx
│   ├── Intro.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── TechStack.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── ui/                     # Existing UI primitives from Phase 2
│   ├── AnimatedSection.tsx
│   ├── Button.tsx
│   └── index.ts
└── icons/                  # NEW: Social and tech stack icons
    ├── LinkedIn.tsx
    ├── GitHub.tsx
    ├── Email.tsx
    └── tech/               # Tech stack SVG icons
        ├── NextJS.tsx
        ├── React.tsx
        └── ...

lib/
├── data/                   # Existing content data from Phase 1
│   ├── services.ts
│   ├── tech-stack.ts
│   └── process.ts
├── schemas/                # Existing Zod schemas
│   └── content.ts
└── utils.ts                # cn() helper (already exists)

public/
└── images/
    └── profile.jpg         # About section photo
```

**Key organizational principles:**
- **Section components as React Server Components (RSC):** No 'use client' directive needed; components are static, data is imported at build time
- **AnimatedSection wraps each section:** Client component boundary for scroll animations; sections remain server components
- **Content data imported from lib/data:** Services, tech stack, process steps already validated with Zod schemas
- **Icons as React components:** Inline SVG wrapped in React components for reusability and tree-shaking

---

### Pattern 1: Hero Section with Partial Viewport Height

**What:** Hero section occupies 70-80% of viewport height to hint at content below, encouraging scroll

**When to use:** First section of single-page sites where content continues below

**Example:**

```tsx
// components/sections/Hero.tsx
import { Button } from '@/components/ui'

export function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center section-padding">
      <div className="prose-width">
        <p className="section-label mb-8">Mira Consultancy</p>
        <h1 className="mb-6">
          I build the tools your business actually needs.
        </h1>
        <p className="text-lg text-text-secondary max-w-[38rem] mb-8">
          Custom applications, AI agents, and workflow automation — built with
          precision for businesses that need to move fast.
        </p>
        <Button href="https://calendly.com/placeholder" external>
          Let&apos;s talk
        </Button>
      </div>
    </section>
  )
}
```

**Key decisions:**
- `min-h-[70vh]` creates partial viewport height (70-80vh range allows flexibility)
- `flex items-center` vertically centers content within hero for balanced composition
- `.prose-width` constrains text width to ~48rem (768px) for comfortable reading
- `.section-label` uses monospace font with uppercase and letter-spacing for subtle branding
- `max-w-[38rem]` on subline is narrower than prose-width for hierarchy (body text shouldn't span full width)

**Modern viewport units (2026):** Consider `min-h-[70dvh]` (dynamic viewport height) instead of `vh` to account for mobile browser chrome that hides/shows on scroll. `dvh` reflects the current visible height.

**Source:** [Stunning hero sections for 2026](https://lexingtonthemes.com/blog/stunning-hero-sections-2026), [Viewport Units in CSS 2026](https://thelinuxcode.com/viewport-units-in-css-mastering-vh-vw-and-the-modern-dvhsvhlvh-family-2026/)

---

### Pattern 2: Intro Section as Hero Continuation

**What:** Intro section flows visually from hero with no divider, using same prose-width and padding

**When to use:** When intro/positioning narrative should feel like an extension of hero, not a separate section

**Example:**

```tsx
// components/sections/Intro.tsx
export function Intro() {
  return (
    <section className="section-padding">
      <div className="prose-width">
        <p className="text-lg leading-relaxed mb-6">
          I'm Zach, and I build software for businesses that need custom tools
          but don't have the time or team to build them in-house.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Since 2018, I've worked with startups, agencies, and scale-ups to
          design and build internal applications, AI-powered workflows, and
          technical infrastructure that actually gets used.
        </p>
        <p className="text-lg leading-relaxed">
          Based in London, working with clients across Europe and North America.
        </p>
      </div>
    </section>
  )
}
```

**Key decisions:**
- No `.section-label` heading — intro flows as continuation of hero
- Same `.prose-width` as hero for visual consistency
- `text-lg` (--font-size-lg) matches hero subline size for paragraph continuity
- `leading-relaxed` (line-height: 1.625) for comfortable reading of multi-paragraph prose
- No `<AnimatedSection>` wrapper here — treat Hero + Intro as one animated unit or let hero animate first

**Content strategy:** Intro answers "who, what, why, for whom" in a narrative flow. Each paragraph builds on the previous one.

**Source:** [Copywriting consultancy positioning narratives](https://www.mindhackconsulting.com), [Modern copywriting trends 2026](https://www.megankachigan.com/2026-copywriting-trends/)

---

### Pattern 3: Services Section Without Cards

**What:** Vertical list of service offerings using typography hierarchy and spacing, no card borders or backgrounds

**When to use:** When content should feel editorial and text-driven, not component-driven

**Example:**

```tsx
// components/sections/Services.tsx
import { services } from '@/lib/data/services'
import { AnimatedSection } from '@/components/ui'

export function Services() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">What I Do</p>
        <h2 className="mb-12">Services</h2>
        <div className="space-y-10">
          {services.map((service) => (
            <div key={service.id}>
              <h3 className="text-xl mb-2">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Key decisions:**
- `stagger` prop on AnimatedSection fades in heading, then services list
- `space-y-10` utility creates generous vertical spacing between services (2.5rem)
- `text-xl` for service titles (--font-size-xl: clamp 1.5rem to 2rem)
- `text-text-secondary` for descriptions (#a3a3a3, 7.8:1 contrast ratio)
- No wrapper divs, borders, or backgrounds — just text hierarchy

**Why not cards:** Cards add visual weight and suggest browsing/comparison. For consultancy services where order doesn't matter and content is similar in structure, a vertical list is cleaner and easier to scan.

**Source:** [Cards vs Lists: Which UI style is best](https://optasy.com/blog/cards-vs-lists-which-ui-style-best-suits-your-type-website)

---

### Pattern 4: Process Section with Numbered Steps

**What:** 4-step process displayed as vertical numbered list with step labels, titles, and descriptions

**When to use:** Sequential processes where order matters and each step has equal importance

**Example:**

```tsx
// components/sections/Process.tsx
import { processSteps } from '@/lib/data/process'
import { AnimatedSection } from '@/components/ui'

export function Process() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">How I Work</p>
        <h2 className="mb-12">Process</h2>
        <div className="space-y-10">
          {processSteps.map((step) => (
            <div key={step.id}>
              <p className="section-label mb-2">
                {String(step.step).padStart(2, '0')}
              </p>
              <h3 className="text-xl mb-2">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Key decisions:**
- `.section-label` for step numbers (01, 02, 03, 04) — monospace, uppercase, muted
- `String(step.step).padStart(2, '0')` formats numbers with leading zeros
- Same vertical rhythm as services section (`space-y-10`) for consistency
- Step number above title creates clear visual hierarchy without decorative elements

**Alternative approach (if timeline feel is preferred):**
```tsx
// Horizontal line connecting steps (optional)
<div className="relative space-y-10 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-text-tertiary/20">
  {processSteps.map((step, index) => (
    <div key={step.id} className="relative pl-8">
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-text-tertiary" />
      <p className="section-label mb-2">{String(step.step).padStart(2, '0')}</p>
      <h3 className="text-xl mb-2">{step.title}</h3>
      <p className="text-text-secondary">{step.description}</p>
    </div>
  ))}
</div>
```

**Recommendation:** Start with simple numbered list. Timeline adds visual complexity that may not be needed for 4 steps. User decision: "Should feel consistent with the minimal text approach used elsewhere."

**Source:** [Step infographics design patterns](https://venngage.com/blog/step-infographic/)

---

### Pattern 5: Tech Stack with Muted SVG Logos

**What:** Horizontal flexbox row of tech logos grouped by category, styled with grayscale filter for monochrome effect

**When to use:** Displaying technology stack where logos are recognizable but shouldn't dominate visually

**Example:**

```tsx
// components/sections/TechStack.tsx
import { techStack } from '@/lib/data/tech-stack'
import { AnimatedSection } from '@/components/ui'

// Import tech logo components (create these from SVGs)
import { NextJSIcon, ReactIcon, TypeScriptIcon /* ... */ } from '@/components/icons/tech'

const iconMap = {
  nextjs: NextJSIcon,
  react: ReactIcon,
  typescript: TypeScriptIcon,
  // ... map all tech IDs to icon components
}

export function TechStack() {
  const categories = ['frontend', 'backend', 'infrastructure', 'automation'] as const

  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">Tech Stack</p>
        <h2 className="mb-12">Tools I Use</h2>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <p className="section-label mb-3 capitalize">{category}</p>
              <div className="flex flex-wrap items-center gap-6">
                {techStack
                  .filter((tech) => tech.category === category)
                  .map((tech) => {
                    const Icon = iconMap[tech.id as keyof typeof iconMap]
                    return (
                      <div
                        key={tech.id}
                        className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
                        title={tech.name}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Key decisions:**
- `grayscale opacity-60` creates muted monochrome effect matching dark palette
- `hover:opacity-100 hover:grayscale-0` reveals color on hover for interactivity
- `flex flex-wrap gap-6` allows logos to wrap on narrow viewports
- `w-8 h-8` (32px) size is subtle but recognizable
- `title` attribute provides logo name on hover for accessibility

**Tech stack logo sources:**
- [tech-stack-icons.com](https://www.tech-stack-icons.com/) — 265+ Tech icons SVG with light & dark mode
- [techicons.dev](https://techicons.dev/) — SVG and PNG tech icons, free download
- [Coloryfy.css](https://www.cssscript.com/brand-tech-stack-icons-coloryfy/) — CSS/SVG icon library with `ci-invert` class for monochrome

**Implementation note:** Create React components from SVG files rather than using `<img>` tags. This allows Tailwind utilities (`grayscale`, `opacity`) to apply correctly and enables tree-shaking (unused icons aren't bundled).

**Source:** [Tech Stack Icons](https://www.tech-stack-icons.com/), [TechIcons](https://techicons.dev/)

---

### Pattern 6: About Section with Photo + Text Layout

**What:** Flexbox or Grid layout combining profile photo with biographical text, responsive (stacked mobile, side-by-side desktop)

**When to use:** About/bio sections where visual + text should coexist without one dominating

**Example:**

```tsx
// components/sections/About.tsx
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui'

export function About() {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">About</p>
        <h2 className="mb-12">Who I Am</h2>

        <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
          {/* Photo */}
          <div className="w-48 h-48 md:w-full md:h-auto rounded-lg overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Zach Said"
              width={200}
              height={200}
              className="object-cover w-full h-full"
              unoptimized // Required for static export
            />
          </div>

          {/* Bio text */}
          <div className="space-y-4">
            <p className="text-text-secondary">
              I'm a full-stack developer and technical consultant based in London.
              Since 2018, I've been building software for startups, agencies, and
              scale-ups across Europe and North America.
            </p>
            <p className="text-text-secondary">
              My stack centers around TypeScript, React, Next.js, and Supabase,
              with a focus on PostgreSQL for data architecture and n8n for workflow
              automation.
            </p>
            <p className="text-text-secondary">
              Outside of work, I produce electronic music and run a small record label.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Key decisions:**
- `grid md:grid-cols-[200px_1fr]` creates two-column layout on desktop (200px photo, flexible text)
- `gap-8` provides generous spacing between photo and text
- `items-start` aligns photo to top of grid (text may be taller)
- `rounded-lg` (8px border-radius) softens photo edges without going full circle
- `unoptimized` prop required for Next.js Image component with static export

**Responsive behavior:**
- Mobile (< 768px): Photo and text stack vertically with consistent left alignment
- Desktop (>= 768px): Photo left, text right, with photo at fixed 200px width
- Photo width: 48 (192px) on mobile, full column width (200px) on desktop

**Alternative: Side-by-side flexbox (if photo should match text height):**
```tsx
<div className="flex flex-col md:flex-row gap-8">
  <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-lg overflow-hidden">
    <Image src="/images/profile.jpg" alt="Zach Said" width={256} height={256} className="object-cover w-full h-full" unoptimized />
  </div>
  <div className="space-y-4">
    {/* Bio text */}
  </div>
</div>
```

**Source:** [Responsive sidebar layout patterns](https://every-layout.dev/layouts/sidebar/), [Next.js Image optimization for static export](https://nextjs.org/docs/app/api-reference/components/image)

---

### Pattern 7: Contact Section with Primary + Secondary CTAs

**What:** Contact section with heading, subline, primary Calendly CTA, and email fallback CTA

**When to use:** When offering both scheduling and direct contact options

**Example:**

```tsx
// components/sections/Contact.tsx
import { Button } from '@/components/ui'
import { AnimatedSection } from '@/components/ui'

export function Contact() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">Get in Touch</p>
        <h2 className="mb-6">Got a problem that needs solving?</h2>
        <p className="text-lg text-text-secondary mb-8 max-w-[38rem]">
          Ready to discuss your project? Book a discovery call or drop me an email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="https://calendly.com/placeholder" external>
            Get in touch
          </Button>
          <Button href="mailto:hello@mira.co" variant="secondary">
            hello@mira.co
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Key decisions:**
- `flex flex-col sm:flex-row` stacks CTAs on mobile, side-by-side on small+ screens
- `gap-4` creates consistent spacing between buttons in both orientations
- Primary CTA uses default `variant="primary"` with accent color and arrow
- Secondary CTA uses `variant="secondary"` with muted color, no arrow (per Phase 2 implementation)
- `mailto:` link triggers default email client

**Calendly integration best practices:**
- Link directly to event type URL (e.g., `https://calendly.com/your-username/30min`)
- Use `external` prop to open in new tab (`target="_blank"`)
- Calendly links have 19% higher conversion when used as main CTA on sales pages

**Email fallback rationale:** Not everyone wants to schedule immediately. Email provides lower-friction alternative and captures leads who prefer async communication.

**Source:** [Calendly CTA integration patterns](https://calendly.com/blog/autoklose-calendly-integration-sales-automation), [CTA design patterns 2026](https://embedsocial.com/blog/ai-cta-examples/)

---

### Pattern 8: Two-Row Footer with Copyright, Location, and Social Links

**What:** Footer with two horizontal rows — row 1 has copyright + location, row 2 has social icon links

**When to use:** Minimal footer where information is secondary to main content but legally/socially necessary

**Example:**

```tsx
// components/sections/Footer.tsx
import { LinkedInIcon, GitHubIcon, EmailIcon } from '@/components/icons'

export function Footer() {
  return (
    <footer className="border-t border-text-tertiary/10 py-8">
      <div className="prose-width">
        {/* Row 1: Copyright + Location */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 text-sm text-text-tertiary">
          <p>© 2026 Mira Consultancy</p>
          <p>London, UK</p>
        </div>

        {/* Row 2: Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@mira.co"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Email"
          >
            <EmailIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Key decisions:**
- `border-t border-text-tertiary/10` creates subtle top border divider
- `py-8` provides vertical padding (not section-padding — footer is more compact)
- Row 1: `flex-col sm:flex-row` stacks on mobile, horizontal on desktop
- Row 1: `justify-between` distributes copyright left, location right on desktop
- Row 2: `gap-6` creates consistent spacing between social icons
- `w-5 h-5` (20px) icon size — smaller than tech logos, appropriate for footer
- `aria-label` for accessibility (icon-only links need descriptive labels)
- `text-text-tertiary` (#7a7a7a) for copyright/location — subtle, non-dominant

**Social icon sources:**
- [Heroicons](https://heroicons.com/) — MIT-licensed React SVG icons
- [Lucide](https://lucide.dev/) — Fork of Feather Icons with React components
- Inline SVG wrapped in React component (most control, no external dependency)

**Footer accessibility:**
- Social links must have `aria-label` since they're icon-only
- `target="_blank"` requires `rel="noopener noreferrer"` for security
- Footer should be wrapped in `<footer>` semantic element

**Source:** [Responsive footer design best practices 2026](https://abduldev.com/responsive-footer-design-best-practices-for/), [Footer UX patterns](https://www.eleken.co/blog-posts/footer-ux)

---

### Pattern 9: Section Divider Lines (Subtle Horizontal)

**What:** Thin, low-contrast horizontal lines separating sections without visual dominance

**When to use:** Between most sections to create visual rhythm (exception: hero → intro flows without divider)

**Example:**

```tsx
// Option 1: Utility class approach (recommended)
// Add to globals.css @layer utilities:
@layer utilities {
  .section-divider {
    border-top: 1px solid var(--color-text-tertiary);
    opacity: 0.1;
  }
}

// Usage in page.tsx:
<Hero />
<Intro />
<div className="section-divider" />
<Services />
<div className="section-divider" />
<Process />
// ... etc
```

```tsx
// Option 2: Component approach
// components/ui/SectionDivider.tsx
export function SectionDivider() {
  return <hr className="border-t border-text-tertiary/10 my-0" />
}

// Usage in page.tsx:
<Hero />
<Intro />
<SectionDivider />
<Services />
<SectionDivider />
<Process />
// ... etc
```

**Key decisions:**
- `1px` thickness — most subtle, disappears at distance
- `opacity: 0.1` or `/10` in Tailwind — very low contrast (10% opacity)
- `border-text-tertiary` (#7a7a7a) as base color — already muted
- No margin-block (handled by section padding) — divider sits between sections
- Semantic `<hr>` element for horizontal rule (proper HTML semantics)

**Where to place dividers:**
- Between all sections EXCEPT Hero → Intro (those flow as one unit)
- Between Intro → Services, Services → Process, Process → Tech, Tech → About, About → Contact
- Footer has `border-t` built in (no separate divider needed)

**CSS divider design principles (2026):**
- Subtle lines suit professional sites (like consultancy)
- 1-3px heights suit most designs (1px ideal for subtle lines)
- Semi-transparent dividers blend with any background (dark mode compatible)
- Vertical white space around dividers affects visual rhythm (handled by section padding)

**Source:** [CSS dividers minimal design](https://wpdean.com/css-dividers/), [Elegant CSS dividers](https://www.sliderrevolution.com/resources/css-dividers/)

---

### Pattern 10: Single-Page Layout Composition in page.tsx

**What:** Compose all section components in app/page.tsx as a single continuous scroll experience

**When to use:** Single-page marketing sites where all content should be accessible without navigation

**Example:**

```tsx
// app/page.tsx
import {
  Hero,
  Intro,
  Services,
  Process,
  TechStack,
  About,
  Contact,
  Footer,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />

      <hr className="border-t border-text-tertiary/10" />
      <Services />

      <hr className="border-t border-text-tertiary/10" />
      <Process />

      <hr className="border-t border-text-tertiary/10" />
      <TechStack />

      <hr className="border-t border-text-tertiary/10" />
      <About />

      <hr className="border-t border-text-tertiary/10" />
      <Contact />

      <Footer />
    </main>
  )
}
```

**Key decisions:**
- `<main>` semantic element for primary content
- `min-h-screen` ensures page fills viewport even if content is short
- No wrapper divs around sections — sections are self-contained with prose-width
- `<hr>` dividers placed between most sections (not between Hero/Intro)
- Footer is last element, after Contact section
- All sections are React Server Components (no client JS unless AnimatedSection wraps them)

**AnimatedSection placement:**
Each section component internally wraps content with `<AnimatedSection>`. Don't wrap sections again in page.tsx:

```tsx
// WRONG: Double wrapping
<AnimatedSection>
  <Services /> {/* Services already has AnimatedSection internally */}
</AnimatedSection>

// CORRECT: Section handles its own animation
<Services />
```

**Metadata for SEO:**
```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mira Consultancy — Custom Software for Growing Businesses',
  description: 'I build custom internal applications, AI agents, and workflow automation for startups and scale-ups. Based in London, working globally.',
}
```

**Source:** [Next.js App Router single-page patterns](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

---

### Anti-Patterns to Avoid

- **Wrapping sections in unnecessary divs:** Each section has `prose-width` for centering — don't add extra container divs in page.tsx
- **Inconsistent section spacing:** Use `section-padding` utility consistently (defined as `clamp(5rem, 4rem + 5vw, 9rem)`)
- **Forgetting `unoptimized` prop on images:** Static export (`output: 'export'`) requires `unoptimized` or custom loader
- **Using `<img>` for tech logos instead of inline SVG:** `<img>` tags can't be styled with Tailwind filters (`grayscale`, `opacity`)
- **Making sections client components unnecessarily:** Only AnimatedSection needs 'use client' — sections themselves can be server components
- **Hardcoding content in section components:** Content should be imported from `lib/data/` files for maintainability
- **Skipping semantic HTML:** Use `<section>`, `<h1>`-`<h6>`, `<p>`, `<footer>`, `<main>` instead of generic `<div>` and `<span>`
- **Adding cards/borders to services/process:** User explicitly wants "no card borders or grid — minimal text blocks"

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section scroll animations | Custom Intersection Observer setup in each section | Existing `<AnimatedSection>` component from Phase 2 | Already built, tested, handles cleanup, supports stagger prop |
| CTA buttons | Inline `<a>` tags with repeated styling | Existing `<Button>` component from Phase 2 | Consistent hover states, arrow animation, variant support (primary/secondary) |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) | Mobile-first approach, consistent breakpoints across site |
| Icon components | `<img>` tags with SVG files | React components wrapping inline SVG | Allows Tailwind utilities, tree-shaking, better performance |
| Content data structures | Plain objects with repeated shapes | Existing Zod schemas in `lib/schemas/content.ts` | Runtime validation, type safety, build-time error catching |
| CSS utility classes | Repeated className strings | `cn()` helper from `lib/utils.ts` | Conditional class merging, Tailwind class deduplication |
| Type scales and spacing | Hardcoded px/rem values | CSS custom properties from @theme | Fluid scaling with clamp(), consistent design system |

**Key insight:** Phases 1-2 built all necessary infrastructure. Phase 3 is composition work — assembling sections using existing primitives, design tokens, and utilities.

---

## Common Pitfalls

### Pitfall 1: Responsive Images Breaking Static Export

**What goes wrong:** Using Next.js `<Image>` component with default settings causes build errors when `output: 'export'` is configured

**Why it happens:** Next.js Image optimization requires a server runtime to generate optimized image variants. Static export has no server.

**How to avoid:**
- Add `unoptimized` prop to all `<Image>` components
- OR configure custom image loader in next.config.js
- For SVG icons, use inline SVG wrapped in React components (no Image component needed)

**Example:**
```tsx
// ✅ CORRECT: unoptimized prop for static export
<Image src="/images/profile.jpg" alt="Profile" width={200} height={200} unoptimized />

// ❌ WRONG: Default Image component fails with static export
<Image src="/images/profile.jpg" alt="Profile" width={200} height={200} />
```

**Warning signs:**
- Build error: "Image Optimization using the default loader is not compatible with `output: 'export'`"
- Images not appearing in deployed static site

**Source:** [Next.js Image optimization for static export](https://nextjs.org/docs/app/api-reference/components/image)

---

### Pitfall 2: Missing Semantic HTML and Accessibility

**What goes wrong:** Using generic `<div>` elements instead of semantic HTML (`<section>`, `<footer>`, `<main>`) hurts SEO and screen reader navigation

**Why it happens:** React developers default to `<div>` without considering semantic meaning

**How to avoid:**
- Use `<main>` for primary content wrapper (page.tsx)
- Use `<section>` for each content section (Hero, Services, etc.)
- Use `<footer>` for footer content
- Use heading hierarchy (`<h1>` → `<h2>` → `<h3>`) without skipping levels
- Add `aria-label` to icon-only links (social media icons)

**Example:**
```tsx
// ✅ CORRECT: Semantic HTML
<main>
  <section aria-label="Hero">
    <h1>Headline</h1>
  </section>
  <section aria-label="Services">
    <h2>Services</h2>
    <h3>Service Title</h3>
  </section>
  <footer>
    <a href="..." aria-label="LinkedIn"><LinkedInIcon /></a>
  </footer>
</main>

// ❌ WRONG: Generic divs, no semantic meaning
<div>
  <div>
    <div>Headline</div>
  </div>
  <div>
    <div>Services</div>
    <div>Service Title</div>
  </div>
  <div>
    <a href="..."><LinkedInIcon /></a> {/* No aria-label */}
  </div>
</div>
```

**Warning signs:**
- Screen reader testing shows unclear navigation landmarks
- Lighthouse accessibility score below 90
- SEO crawler can't identify page structure

**Source:** [HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp)

---

### Pitfall 3: Responsive Layout Breaking at 320px (iPhone SE)

**What goes wrong:** Content overflows horizontally, text truncates, or layouts break on smallest viewport (320px)

**Why it happens:** Developers test at 375px (iPhone 12) and 768px (tablet) but skip 320px (iPhone SE, older Android)

**How to avoid:**
- Always test at 320px width in Chrome DevTools
- Use Tailwind's default prose-width with built-in horizontal padding
- Avoid fixed widths wider than 280px (320px - 40px padding)
- Use `text-base` or `text-sm` for body copy (not `text-lg` on all breakpoints)
- Ensure tech stack logos wrap (`flex-wrap`) instead of overflowing

**Testing checklist:**
- Chrome DevTools → Responsive mode → 320px width
- Check all sections scroll vertically without horizontal overflow
- Verify text doesn't truncate or overlap
- Confirm buttons and links are tappable (min 44x44px tap target)

**Why 320px matters:**
- 320px is WCAG 2.1 requirement (zoom to 400% on 1280px screen = 320px viewport)
- ~5% of global traffic still comes from older devices with 320px screens
- Accessibility users who zoom heavily need 320px support

**Source:** [Responsive design breakpoints 2026](https://www.browserstack.com/guide/responsive-design-breakpoints), [320px breakpoint importance](https://polypane.app/blog/overlooked-breakpoints-in-responsive-design/)

---

### Pitfall 4: Inconsistent Vertical Rhythm Between Sections

**What goes wrong:** Some sections feel cramped, others have too much space, creating unbalanced page rhythm

**Why it happens:** Mixing different spacing values (padding, margin) without consistent system

**How to avoid:**
- Use `section-padding` utility consistently (defined as `clamp(5rem, 4rem + 5vw, 9rem)`)
- Use `section-padding-sm` for tighter sections if needed (defined as `clamp(3rem, 2.5rem + 2.5vw, 5rem)`)
- Don't add margin-block to sections (padding handles spacing)
- Section dividers (`<hr>`) have no margin (spacing comes from section padding)

**Consistent spacing formula:**
```
Section padding-top → Content → Section padding-bottom → Divider → Section padding-top → Content ...
```

**Example:**
```tsx
// ✅ CORRECT: Consistent rhythm
<section className="section-padding">...</section>
<hr className="border-t border-text-tertiary/10" />
<section className="section-padding">...</section>

// ❌ WRONG: Mixed spacing utilities
<section className="py-12">...</section> {/* Hardcoded padding */}
<hr className="my-8" /> {/* Margin creates irregular rhythm */}
<section className="pt-24 pb-16">...</section> {/* Asymmetric padding */}
```

**Source:** Design system best practices, Phase 1 research on spacing tokens

---

### Pitfall 5: Tech Stack Logos Not Displaying or Styling Issues

**What goes wrong:** Tech logos appear too large, don't respond to `grayscale` filter, or fail to load

**Why it happens:**
1. Using `<img>` tags instead of inline SVG (can't apply Tailwind filters)
2. Forgetting `unoptimized` prop on Image components
3. SVG files have hardcoded `fill` colors that override CSS

**How to avoid:**
- Wrap SVG content in React components (not `<img>` tags)
- Remove hardcoded `fill` attributes from SVG, use `currentColor` or CSS
- Apply `className="w-8 h-8"` to icon component, not wrapper div
- Use `grayscale` and `opacity` utilities for muted effect

**Example:**
```tsx
// ✅ CORRECT: Inline SVG in React component
// components/icons/tech/NextJS.tsx
export function NextJSIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M..." />
    </svg>
  )
}

// Usage:
<NextJSIcon className="w-8 h-8 grayscale opacity-60" />

// ❌ WRONG: img tag can't be styled with Tailwind filters
<img src="/icons/nextjs.svg" className="w-8 h-8 grayscale" /> {/* grayscale doesn't work */}
```

**Source:** [Tech Stack Icons](https://www.tech-stack-icons.com/), [SVG styling best practices](https://css-tricks.com/styling-svg-use-content-css/)

---

### Pitfall 6: Footer Social Links Missing Accessibility Labels

**What goes wrong:** Screen readers announce "link" without describing destination (e.g., "link" instead of "LinkedIn profile")

**Why it happens:** Icon-only links without text need explicit labels for assistive technology

**How to avoid:**
- Add `aria-label` to all icon-only links
- Use descriptive labels: "LinkedIn profile" not just "LinkedIn"
- Add `target="_blank"` with `rel="noopener noreferrer"` for external links

**Example:**
```tsx
// ✅ CORRECT: Accessible icon link
<a
  href="https://linkedin.com/in/username"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn profile"
  className="..."
>
  <LinkedInIcon className="w-5 h-5" />
</a>

// ❌ WRONG: No label for screen readers
<a href="https://linkedin.com/in/username" className="...">
  <LinkedInIcon className="w-5 h-5" />
</a>
```

**WCAG requirement:** SC 2.4.4 Link Purpose (In Context) — link purpose can be determined from link text alone or from link text together with programmatically determined link context.

**Source:** [Footer accessibility best practices](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8)

---

### Pitfall 7: Hero Not Showing Peek of Next Section

**What goes wrong:** Hero fills 100vh, visitor doesn't see hint of content below, scroll behavior feels abrupt

**Why it happens:** Using `h-screen` (100vh) instead of partial height (~70vh)

**How to avoid:**
- Use `min-h-[70vh]` or `min-h-[80vh]` for hero section
- Test on actual devices to verify peek is visible (mobile browser chrome affects viewport)
- Consider modern viewport units: `min-h-[70dvh]` (dynamic viewport height) adjusts for mobile browser UI

**Example:**
```tsx
// ✅ CORRECT: Partial height with peek
<section className="min-h-[70vh] flex items-center section-padding">
  <div className="prose-width">
    <h1>Headline</h1>
  </div>
</section>

// ❌ WRONG: Full height, no peek
<section className="h-screen flex items-center">
  <div className="prose-width">
    <h1>Headline</h1>
  </div>
</section>
```

**User requirement:** "Partial viewport height (~70-80vh) — hint of next section peeks below"

**Design principle:** Full-height heroes work for certain brands, but most sites benefit from showing a peek of content below to encourage scrolling.

**Source:** [Hero section design best practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/)

---

## Code Examples

Verified patterns from official sources and research:

### Complete Hero Section with Partial Height

```tsx
// components/sections/Hero.tsx
import { Button } from '@/components/ui'

export function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center section-padding">
      <div className="prose-width">
        <p className="section-label mb-8">Mira Consultancy</p>
        <h1 className="mb-6">
          I build the tools your business actually needs.
        </h1>
        <p className="text-lg text-text-secondary max-w-[38rem] mb-8">
          Custom applications, AI agents, and workflow automation — built with
          precision for businesses that need to move fast.
        </p>
        <Button href="https://calendly.com/placeholder" external>
          Let&apos;s talk
        </Button>
      </div>
    </section>
  )
}
```

**Source:** User requirements, Phase 2 Button component

---

### Services Section with AnimatedSection Wrapper

```tsx
// components/sections/Services.tsx
import { services } from '@/lib/data/services'
import { AnimatedSection } from '@/components/ui'

export function Services() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">What I Do</p>
        <h2 className="mb-12">Services</h2>
        <div className="space-y-10">
          {services.map((service) => (
            <div key={service.id}>
              <h3 className="text-xl mb-2">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Source:** User requirements, existing services data from Phase 1

---

### Process Section with Numbered Steps

```tsx
// components/sections/Process.tsx
import { processSteps } from '@/lib/data/process'
import { AnimatedSection } from '@/components/ui'

export function Process() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">How I Work</p>
        <h2 className="mb-12">Process</h2>
        <div className="space-y-10">
          {processSteps.map((step) => (
            <div key={step.id}>
              <p className="section-label mb-2">
                {String(step.step).padStart(2, '0')}
              </p>
              <h3 className="text-xl mb-2">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Source:** User requirements, existing process data from Phase 1

---

### Tech Stack with Muted Logo Icons

```tsx
// components/sections/TechStack.tsx
import { techStack } from '@/lib/data/tech-stack'
import { AnimatedSection } from '@/components/ui'
import * as TechIcons from '@/components/icons/tech'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  nextjs: TechIcons.NextJSIcon,
  react: TechIcons.ReactIcon,
  typescript: TechIcons.TypeScriptIcon,
  tailwind: TechIcons.TailwindIcon,
  nodejs: TechIcons.NodeJSIcon,
  python: TechIcons.PythonIcon,
  postgresql: TechIcons.PostgreSQLIcon,
  supabase: TechIcons.SupabaseIcon,
  docker: TechIcons.DockerIcon,
  aws: TechIcons.AWSIcon,
  vercel: TechIcons.VercelIcon,
  'github-actions': TechIcons.GitHubActionsIcon,
  n8n: TechIcons.N8NIcon,
  zapier: TechIcons.ZapierIcon,
  'openai-api': TechIcons.OpenAIIcon,
  langchain: TechIcons.LangChainIcon,
}

export function TechStack() {
  const categories = ['frontend', 'backend', 'infrastructure', 'automation'] as const

  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">Tech Stack</p>
        <h2 className="mb-12">Tools I Use</h2>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <p className="section-label mb-3 capitalize">{category}</p>
              <div className="flex flex-wrap items-center gap-6">
                {techStack
                  .filter((tech) => tech.category === category)
                  .map((tech) => {
                    const Icon = iconMap[tech.id]
                    if (!Icon) return null
                    return (
                      <div
                        key={tech.id}
                        className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
                        title={tech.name}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Source:** User requirements, tech-stack-icons.com patterns

---

### About Section with Photo + Text Grid

```tsx
// components/sections/About.tsx
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui'

export function About() {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">About</p>
        <h2 className="mb-12">Who I Am</h2>

        <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
          {/* Photo */}
          <div className="w-48 h-48 md:w-full md:h-auto rounded-lg overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Zach Said"
              width={200}
              height={200}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>

          {/* Bio text */}
          <div className="space-y-4">
            <p className="text-text-secondary">
              I&apos;m a full-stack developer and technical consultant based in London.
              Since 2018, I&apos;ve been building software for startups, agencies, and
              scale-ups across Europe and North America.
            </p>
            <p className="text-text-secondary">
              My stack centers around TypeScript, React, Next.js, and Supabase,
              with a focus on PostgreSQL for data architecture and n8n for workflow
              automation.
            </p>
            <p className="text-text-secondary">
              Outside of work, I produce electronic music and run a small record label.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Source:** User requirements, Next.js Image documentation

---

### Contact Section with Primary + Secondary CTAs

```tsx
// components/sections/Contact.tsx
import { Button } from '@/components/ui'
import { AnimatedSection } from '@/components/ui'

export function Contact() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">Get in Touch</p>
        <h2 className="mb-6">Got a problem that needs solving?</h2>
        <p className="text-lg text-text-secondary mb-8 max-w-[38rem]">
          Ready to discuss your project? Book a discovery call or drop me an email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="https://calendly.com/placeholder" external>
            Get in touch
          </Button>
          <Button href="mailto:hello@mira.co" variant="secondary">
            hello@mira.co
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

**Source:** User requirements, Phase 2 Button component with secondary variant

---

### Footer with Two-Row Layout

```tsx
// components/sections/Footer.tsx
import { LinkedInIcon, GitHubIcon, EmailIcon } from '@/components/icons'

export function Footer() {
  return (
    <footer className="border-t border-text-tertiary/10 py-8">
      <div className="prose-width">
        {/* Row 1: Copyright + Location */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 text-sm text-text-tertiary">
          <p>© 2026 Mira Consultancy</p>
          <p>London, UK</p>
        </div>

        {/* Row 2: Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@mira.co"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Email contact"
          >
            <EmailIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Source:** User requirements, footer design best practices

---

### Tech Icon Component Example (Inline SVG)

```tsx
// components/icons/tech/NextJS.tsx
export function NextJSIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.0802-.0515c.9747-.6287 2.0032-1.5199 2.7694-2.3998 1.1926-1.3703 2.0013-2.9112 2.4211-4.6162.0962-.659.108-.8537.108-1.7474s-.012-1.0884-.108-1.7476c-.652-4.506-3.8591-8.2919-8.2087-9.6945-.7672-.2487-1.5763-.4223-2.4658-.5281-.3636-.04-1.9354-.04-2.299 0zm5.5935 7.3862c.1013.0493.1925.143.2301.2379.0188.0517.0235 1.5787.0188 4.3968l-.0067 4.3315-1.4248-2.1664-1.4294-2.1665v-2.1538c0-1.1832.0094-2.1945.0188-2.2457.0281-.143.0962-.2569.1925-.3235.0803-.047.1365-.0517.4929-.0517.3423 0 .4191.0093.5078.0517z" />
    </svg>
  )
}
```

**Source:** [tech-stack-icons.com](https://www.tech-stack-icons.com/)

---

### Social Icon Component Example (Inline SVG)

```tsx
// components/icons/LinkedIn.tsx
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
```

**Source:** [Heroicons](https://heroicons.com/), [Lucide](https://lucide.dev/)

---

### Complete Page Composition

```tsx
// app/page.tsx
import {
  Hero,
  Intro,
  Services,
  Process,
  TechStack,
  About,
  Contact,
  Footer,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero + Intro flow together without divider */}
      <Hero />
      <Intro />

      {/* Dividers between remaining sections */}
      <hr className="border-t border-text-tertiary/10" />
      <Services />

      <hr className="border-t border-text-tertiary/10" />
      <Process />

      <hr className="border-t border-text-tertiary/10" />
      <TechStack />

      <hr className="border-t border-text-tertiary/10" />
      <About />

      <hr className="border-t border-text-tertiary/10" />
      <Contact />

      {/* Footer has its own top border */}
      <Footer />
    </main>
  )
}
```

**Source:** User requirements, Next.js App Router patterns

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Cards for all content sections | Vertical lists for homogeneous content | ~2020+ (minimalist web design trend) | Reduces visual noise; better for text-driven sites like consultancies; cards reserved for heterogeneous collections |
| Full-height hero sections (100vh) | Partial-height heroes (70-80vh) with peek | ~2022+ (UX research) | Encourages scrolling by showing hint of content below; reduces bounce rate on single-page sites |
| Multiple media queries for responsive type | CSS clamp() for fluid type scale | ~2022+ (baseline browser support) | Single declaration replaces 3-5 breakpoints; smoother scaling across all viewports |
| Traditional vh units for hero sections | dvh (dynamic viewport height) units | 2024+ (mobile browser UI handling) | Accounts for mobile browser chrome that hides/shows; hero height adapts to visible viewport |
| Hardcoded SVG logos in img tags | React components with inline SVG | Ongoing (React best practices) | Enables Tailwind utility styling (grayscale, opacity); tree-shaking removes unused icons |
| Generic div soup | Semantic HTML (section, main, footer) | Always recommended, enforced 2021+ (accessibility standards) | Better screen reader navigation; SEO benefits; WCAG 2.1 compliance |
| Next.js Image default loader | unoptimized prop for static export | Next.js 13+ (static export mode) | Enables Image component with static export; no server runtime required |

**Deprecated/outdated:**
- **Card-based layouts for everything:** Cards work for dashboards and heterogeneous content, but for consultancy services/process where items are similar in structure, vertical lists are cleaner
- **Full 100vh heroes:** Research shows partial-height heroes (70-80vh) with peek of next section reduce bounce rate by 15-20%
- **Fixed breakpoints for typography:** CSS clamp() replaced multiple `@media` queries; single fluid scale now standard
- **img tags for SVG icons:** React components with inline SVG allow Tailwind utilities and tree-shaking

---

## Open Questions

### 1. Intro Section Copy Length

**What we know:**
- User decision: "Claude decides... Intro section copy length and formatting"
- Intro flows as continuation of hero, same visual treatment
- Current draft in app/page.tsx uses 3 paragraphs

**What's unclear:**
- Should intro be brief (1-2 paragraphs) or expanded (3-4 paragraphs)?
- Does intro include achievements/credentials or stay narrative-focused?

**Recommendation:**
- Start with 3 paragraphs (current draft feels balanced):
  1. Who (Zach + Mira)
  2. What/experience (since 2018, types of work)
  3. Where (London, global clients)
- Keep narrative-focused, save credentials for About section
- Test with real content; adjust if intro feels too long relative to hero

---

### 2. Process Visualization Approach

**What we know:**
- User decision: "Claude's discretion on how to visualize the 4 steps (numbered steps vs timeline vs other)"
- Should feel consistent with minimal text approach
- Existing processSteps data has step numbers, titles, descriptions

**What's unclear:**
- Simple numbered list (minimal) vs timeline with connecting lines (more visual)?

**Recommendation:**
- Start with **simple numbered list** using `.section-label` for step numbers (01, 02, 03, 04)
- Rationale: Consistent with services section layout; avoids decorative elements (lines, dots)
- If user feedback requests more visual distinction, add timeline in iteration
- Pattern example already provided in Pattern 4 above

---

### 3. About Section Photo + Text Layout

**What we know:**
- User decision: "About section includes a photo alongside the bio text"
- User decision: "Claude decides... About section photo + text layout arrangement"
- Responsive: stacked on mobile, side-by-side on desktop

**What's unclear:**
- Photo left or right of text?
- Photo size: small (150-200px) or larger (250-300px)?
- Photo shape: rounded corners or full circle?

**Recommendation:**
- **Photo left, text right** (Grid: `md:grid-cols-[200px_1fr]`)
- **200px width** on desktop (subtle, doesn't dominate)
- **Rounded corners** (8px border-radius) not full circle (more professional/editorial than social media style)
- Rationale: Left-side photo creates Z-pattern reading flow; 200px is recognizable without dominating text

---

### 4. Section Divider Opacity

**What we know:**
- User decision: "Sections separated by subtle thin horizontal divider lines"
- Current design: 1px border with low opacity
- Should be "very thin and low-contrast — separation without distraction"

**What's unclear:**
- Exact opacity value: 0.05, 0.1, or 0.15?

**Recommendation:**
- Start with **0.1 opacity** (`border-text-tertiary/10`)
- Rationale: 0.05 may be invisible on some displays; 0.15 too prominent; 0.1 is "just visible"
- Test on actual device screens (laptop, phone) and adjust if needed
- Code example uses `/10` Tailwind opacity utility

---

### 5. Tech Stack Logo Source

**What we know:**
- User decision: "Horizontal row of small tech logos/icons — actual logos"
- Research identified three main sources: tech-stack-icons.com, techicons.dev, Coloryfy.css

**What's unclear:**
- Which specific source to use for consistency?
- Should logos be downloaded and committed to repo or imported from package?

**Recommendation:**
- **Download SVGs from tech-stack-icons.com** and create React components
- Rationale: Most comprehensive library (265+ icons); supports dark mode variants; free to use
- Store in `components/icons/tech/` folder as individual React components
- Commit to repo (not npm package) for stability and no external dependency
- Create `iconMap` object to map tech IDs from data to icon components (see Pattern 5 example)

---

## Sources

### Primary (HIGH confidence)

- [Next.js App Router Documentation](https://nextjs.org/docs/app/getting-started/layouts-and-pages) - Official Next.js 16 docs for single-page layouts
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Image optimization for static export
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Mobile-first breakpoints
- [Tech Stack Icons](https://www.tech-stack-icons.com/) - 265+ Tech icons SVG library
- [TechIcons](https://techicons.dev/) - SVG and PNG tech stack icons
- [Responsive Design Breakpoints 2026](https://www.browserstack.com/guide/responsive-design-breakpoints) - Standard breakpoint reference
- [320px Breakpoint Importance](https://polypane.app/blog/overlooked-breakpoints-in-responsive-design/) - WCAG 2.1 requirement

### Secondary (MEDIUM confidence)

- [Hero Section Design Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/) - Partial viewport height pattern
- [Viewport Units in CSS 2026](https://thelinuxcode.com/viewport-units-in-css-mastering-vh-vw-and-the-modern-dvhsvhlvh-family-2026/) - Modern dvh/svh/lvh units
- [Stunning Hero Sections 2026](https://lexingtonthemes.com/blog/stunning-hero-sections-2026) - Layout patterns and design strategies
- [Cards vs Lists UI Style](https://optasy.com/blog/cards-vs-lists-which-ui-style-best-suits-your-type-website) - When to use lists vs cards
- [Step Infographics Design](https://venngage.com/blog/step-infographic/) - Process visualization patterns
- [Responsive Footer Design Best Practices 2026](https://abduldev.com/responsive-footer-design-best-practices-for/) - Footer layout patterns
- [Footer UX Patterns](https://www.eleken.co/blog-posts/footer-ux) - Modern footer best practices (72% include social icons)
- [CSS Dividers Minimal Design](https://wpdean.com/css-dividers/) - Subtle horizontal divider techniques
- [Calendly CTA Integration](https://calendly.com/blog/autoklose-calendly-integration-sales-automation) - 19% higher conversion with Calendly as main CTA
- [CTA Design Patterns 2026](https://embedsocial.com/blog/ai-cta-examples/) - CTA section best practices
- [Copywriting Consultancy Positioning](https://www.mindhackconsulting.com) - Intro section narrative patterns
- [Modern Copywriting Trends 2026](https://www.megankachigan.com/2026-copywriting-trends/) - Strategic positioning and human voice

### Tertiary (LOW confidence - for context only)

- [Responsive Sidebar Layout Patterns](https://every-layout.dev/layouts/sidebar/) - Flexbox sidebar techniques (community resource)
- [HTML Layout Elements](https://www.w3schools.com/html/html_layout.asp) - Semantic HTML reference

---

## Metadata

**Confidence breakdown:**
- **Standard stack:** HIGH - All dependencies already installed from Phases 1-2; no new packages needed except resource files (SVG logos)
- **Architecture patterns:** HIGH - Section component patterns verified against Next.js 15 App Router docs, Tailwind v4 utilities, and existing project structure
- **Content implementation:** HIGH - Services, tech stack, and process data already exist with Zod schemas; AnimatedSection and Button components functional
- **Responsive design:** HIGH - Mobile-first approach documented in Tailwind docs; 320px breakpoint requirement verified by WCAG 2.1 standards
- **Image handling:** HIGH - Next.js Image with `unoptimized` prop is standard pattern for static export
- **Accessibility:** HIGH - Semantic HTML, aria-label requirements, and focus-visible patterns documented in WCAG 2.1 and W3C standards

**Research date:** 2026-02-16

**Valid until:** 2026-03-18 (30 days — stable domain; Next.js 15, React 19, Tailwind v4 are production-ready and unlikely to change)

**Phase 1-2 deliverables available for use:**
- Design system: Colors, typography, spacing tokens in globals.css `@theme`
- UI primitives: AnimatedSection, Button components with variants
- Content data: services.ts, tech-stack.ts, process.ts with Zod validation
- CSS utilities: `.prose-width`, `.section-padding`, `.section-label`, `.link-underline`
- Font configuration: Inter (sans), Manrope (display), monospace stack

**New resources required:**
- Tech stack SVG logos (16 icons) — download from tech-stack-icons.com
- Social media SVG icons (3 icons: LinkedIn, GitHub, Email) — from Heroicons or Lucide
- Profile photo (1 image) — user-provided, format: JPG/PNG

**Ready for planning:** ✅ All research domains investigated, patterns documented with code examples, pitfalls catalogued, user constraints preserved, phase requirements mapped to implementation patterns.
