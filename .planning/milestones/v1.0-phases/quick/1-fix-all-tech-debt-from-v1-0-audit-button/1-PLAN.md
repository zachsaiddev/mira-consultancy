---
phase: quick-1
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - components/ui/Button.tsx
  - components/ui/index.ts
  - components/ui/ToolsColumn.tsx
  - components/sections/About.tsx
  - components/icons/tech/TypeScript.tsx
  - components/icons/tech/React.tsx
  - components/icons/tech/Supabase.tsx
  - components/icons/tech/PostgreSQL.tsx
  - components/icons/tech/N8N.tsx
  - components/icons/tech/NodeJS.tsx
  - components/icons/tech/index.ts
  - lib/schemas/content.ts
  - lib/data/pages/home.ts
  - components/sections/CaseStudies.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Button arrow slides right on hover"
    - "No dead tech icon code in the codebase"
    - "ToolsColumn exported from UI barrel like all other UI components"
    - "About.tsx renders as a server component (no use client)"
    - "CaseStudy and ProBonoItem validated by Zod at runtime"
  artifacts:
    - path: "components/ui/Button.tsx"
      provides: "group class on button/anchor for arrow animation"
      contains: "group"
    - path: "components/ui/index.ts"
      provides: "ToolsColumn barrel export"
      contains: "ToolsColumn"
    - path: "lib/schemas/content.ts"
      provides: "caseStudySchema and proBonoItemSchema"
      contains: "caseStudySchema"
  key_links:
    - from: "components/ui/Button.tsx"
      to: "arrow span"
      via: "group class enables group-hover:translate-x-1"
      pattern: "group.*group-hover:translate-x-1"
    - from: "lib/data/pages/home.ts"
      to: "lib/schemas/content.ts"
      via: "import and .parse() calls"
      pattern: "caseStudySchema\\.parse"
---

<objective>
Fix all 5 tech debt items from the v1.0 milestone audit: Button arrow animation bug, dead tech icon components, ToolsColumn barrel inconsistency, About.tsx unnecessary 'use client', and CaseStudy/ProBonoItem Zod schema migration.

Purpose: Clean codebase before moving past v1.0 milestone.
Output: All audit tech debt items resolved. Build passes. No dead code.
</objective>

<execution_context>
@/Users/zachsaid/.claude/get-shit-done/workflows/execute-plan.md
@/Users/zachsaid/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/v1.0-MILESTONE-AUDIT.md
@components/ui/Button.tsx
@components/ui/index.ts
@components/sections/About.tsx
@lib/schemas/content.ts
@lib/data/pages/home.ts
@components/sections/CaseStudies.tsx
@app/layout.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix Button arrow bug, delete dead tech icons, add ToolsColumn to barrel, remove About.tsx use client</name>
  <files>
    components/ui/Button.tsx
    components/ui/index.ts
    components/sections/About.tsx
    components/icons/tech/TypeScript.tsx
    components/icons/tech/React.tsx
    components/icons/tech/Supabase.tsx
    components/icons/tech/PostgreSQL.tsx
    components/icons/tech/N8N.tsx
    components/icons/tech/NodeJS.tsx
    components/icons/tech/index.ts
    app/layout.tsx
  </files>
  <action>
    4 independent fixes:

    1. **Button arrow animation (BUG):** In `components/ui/Button.tsx`, add `'group'` to the `cn()` call on line 28 so it becomes:
       ```
       cn(
         'group inline-flex items-center gap-2 font-medium px-6 py-3 transition-all cursor-pointer',
         ...
       )
       ```
       The arrow span already has `group-hover:translate-x-1` but the parent element was missing the `group` class, so the hover trigger never fires.

    2. **Delete dead tech icon components:** Delete the entire `components/icons/tech/` directory (7 files: 6 component files + barrel index.ts). These are orphaned — the tools display uses SVG files from `/public/images/logos/` instead. The parent barrel `components/icons/index.ts` does NOT re-export from `tech/`, so no other file needs updating.

    3. **ToolsColumn barrel export:** In `components/ui/index.ts`, add:
       ```
       export { ToolsColumn } from './ToolsColumn';
       ```
       Then update `app/layout.tsx` line 4 from:
       ```
       import { ToolsColumn } from '@/components/ui/ToolsColumn'
       ```
       to:
       ```
       import { BackgroundGradient, ToolsColumn } from '@/components/ui'
       ```
       (Combine with the existing BackgroundGradient import on line 3 and remove the separate BackgroundGradient import.)

    4. **Remove About.tsx 'use client':** Delete the `'use client'` directive from line 1 of `components/sections/About.tsx`. The component uses `process.env.NEXT_PUBLIC_BASE_PATH` which is build-time inlined by Next.js (not a runtime browser API), `next/image` (works in server components), and no hooks or event handlers. The original decision in 04-01 was incorrect about needing the directive. Other components like `ToolsGrid.tsx` already use `NEXT_PUBLIC_BASE_PATH` without 'use client' and work fine.
  </action>
  <verify>
    Run `npx tsc --noEmit` — no TypeScript errors.
    Run `npm run build` — build succeeds.
    Confirm `components/icons/tech/` directory no longer exists.
    Confirm `grep -r "use client" components/sections/About.tsx` returns nothing.
    Confirm `grep "group" components/ui/Button.tsx` shows the group class present.
    Confirm `grep "ToolsColumn" components/ui/index.ts` shows the barrel export.
  </verify>
  <done>
    Button cn() includes 'group' class (arrow animation works on hover).
    components/icons/tech/ directory deleted (zero dead icon code).
    ToolsColumn exported from components/ui/index.ts barrel.
    layout.tsx imports ToolsColumn from barrel, not direct path.
    About.tsx has no 'use client' directive.
    Build passes with no errors.
  </done>
</task>

<task type="auto">
  <name>Task 2: Migrate CaseStudy and ProBonoItem to Zod schemas</name>
  <files>
    lib/schemas/content.ts
    lib/data/pages/home.ts
    components/sections/CaseStudies.tsx
  </files>
  <action>
    Migrate CaseStudy and ProBonoItem from plain TypeScript interfaces to Zod schemas, matching the pattern already established by Service, ProcessStep, and Differentiator.

    1. **Add schemas to `lib/schemas/content.ts`:**

       ```typescript
       // CaseStudy schema
       export const caseStudySchema = z.object({
         id: z.string().min(1),
         title: z.string().min(1),
         context: z.string().min(1),
         paragraphs: z.array(z.string().min(1)).min(1),
         metric: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
       })

       export type CaseStudy = z.infer<typeof caseStudySchema>

       // ProBonoItem schema
       export const proBonoItemSchema = z.object({
         name: z.string().min(1),
         description: z.string().min(1),
         url: z.string().url().optional(),
       })

       export type ProBonoItem = z.infer<typeof proBonoItemSchema>
       ```

    2. **Update `lib/data/pages/home.ts`:**
       - Replace the `export interface CaseStudy` and `export interface ProBonoItem` blocks (lines 176-188) with imports from the schema file:
         ```typescript
         import {
           serviceSchema, processStepSchema, differentiatorSchema,
           caseStudySchema, proBonoItemSchema,
           type Service, type ProcessStep, type Differentiator,
           type CaseStudy, type ProBonoItem,
         } from '@/lib/schemas/content'
         ```
       - Change `studies` array to use `.parse()` like the other data arrays:
         ```typescript
         studies: studiesData.map((s) => caseStudySchema.parse(s)),
         ```
         (Extract the inline array to a `const studiesData = [...] as const satisfies readonly CaseStudy[]` before the export, following the same pattern as `servicesData`, `processData`, `differentiatorData`.)
       - Change `proBono` array similarly:
         ```typescript
         proBono: proBonoData.map((p) => proBonoItemSchema.parse(p)),
         ```
         (Extract to `const proBonoData = [...] as const satisfies readonly ProBonoItem[]`.)

    3. **Update `components/sections/CaseStudies.tsx`:**
       - Change the import from `import type { CaseStudy, ProBonoItem } from '@/lib/data/pages/home'` to `import type { CaseStudy, ProBonoItem } from '@/lib/schemas/content'` — types should come from the schema source of truth, not the data file.
  </action>
  <verify>
    Run `npx tsc --noEmit` — no TypeScript errors.
    Run `npm run build` — build succeeds (Zod .parse() runs at build time, validating all data).
    Confirm `grep "caseStudySchema" lib/schemas/content.ts` returns the schema definition.
    Confirm `grep "interface CaseStudy\|interface ProBonoItem" lib/data/pages/home.ts` returns nothing (no more local interfaces).
    Confirm `grep "caseStudySchema.parse" lib/data/pages/home.ts` shows runtime validation.
  </verify>
  <done>
    CaseStudy and ProBonoItem defined as Zod schemas in lib/schemas/content.ts.
    Data in home.ts validated via .parse() at build time (same pattern as Service, ProcessStep, Differentiator).
    CaseStudies.tsx imports types from schema file.
    No plain TypeScript interfaces for content types remain in home.ts.
    Build passes — all case study and pro bono data passes Zod validation.
  </done>
</task>

</tasks>

<verification>
- `npx tsc --noEmit` passes with zero errors
- `npm run build` succeeds — static export generates without errors
- No references to `components/icons/tech` exist anywhere in the codebase
- Button component includes `group` class in its className
- ToolsColumn is in the UI barrel and layout.tsx uses the barrel import
- About.tsx has no `'use client'` directive
- All 5 content types (Service, ProcessStep, Differentiator, CaseStudy, ProBonoItem) use Zod schemas
</verification>

<success_criteria>
All 5 v1.0 audit tech debt items resolved. TypeScript compilation and static build both pass. Zero dead code, consistent patterns across all content schemas and UI barrel exports.
</success_criteria>

<output>
After completion, create `.planning/quick/1-fix-all-tech-debt-from-v1-0-audit-button/1-SUMMARY.md`
</output>
