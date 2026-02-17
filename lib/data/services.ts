import { serviceSchema, type Service } from '@/lib/schemas/content'

const servicesData = [
  {
    id: 'solutions-architecture',
    title: 'Solutions Architecture & Design',
    icon: 'blueprint',
    description:
      'You know something needs to change but the technical path isn\'t clear. I work with your leadership team to understand the real problem, map out requirements, and design an architecture that makes sense for where your business is going — not just a quick fix for today.',
  },
  {
    id: 'custom-platform-development',
    title: 'Custom Platform Development',
    icon: 'app-window',
    description:
      'The systems your business actually runs on — finance platforms, operational dashboards, internal tools, data hubs. I build these end-to-end in TypeScript, React, and Supabase, wired into your existing tools and designed around how your team actually works.',
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture & Governance',
    icon: 'workflow',
    description:
      'If your data lives in five different tools and none of them agree, you\'ve got a problem that only gets worse as you grow. I design master data strategies that bring everything into one place — proper ownership, clear structures, automated sync, and a single version of the truth.',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    icon: 'brain',
    description:
      'Not AI for the sake of it. Practical automation that takes repetitive work off your team\'s plate — data enrichment, reporting, workflow orchestration, process automation. The kind of stuff that saves hours every week and actually sticks.',
  },
  {
    id: 'implementation-change-management',
    title: 'Implementation & Change Management',
    icon: 'compass',
    description:
      'A great system that nobody uses is a waste of everyone\'s time. I handle go-live, documentation, training, and the messy human side of getting people to trust something new. The job isn\'t done until your team is running it without me.',
  },
] as const satisfies readonly Service[]

// Validate at module load — throws during build if invalid
export const services = servicesData.map((s) => serviceSchema.parse(s))
