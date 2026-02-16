import { serviceSchema, type Service } from '@/lib/schemas/content'

const servicesData = [
  {
    id: 'custom-internal-applications',
    title: 'Custom Internal Applications',
    description:
      'Bespoke tools tailored to your workflows — CRMs, dashboards, admin panels, and process automation. Built to replace clunky spreadsheets and manual processes with fast, reliable software.',
  },
  {
    id: 'ai-agent-systems',
    title: 'AI Agent Systems',
    description:
      'Intelligent automation powered by LLMs — customer support agents, data extraction pipelines, content generation systems. AI that actually works for your business, not just experiments.',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description:
      'Connect your tools, eliminate repetitive tasks, and streamline operations. From simple integrations to complex multi-step workflows — automation that saves time and reduces errors.',
  },
  {
    id: 'system-architecture-design',
    title: 'System Architecture & Design',
    description:
      'Strategic technical planning for new products or system migrations. Choosing the right stack, designing scalable architecture, and creating technical roadmaps that align with business goals.',
  },
  {
    id: 'technical-advisory',
    title: 'Technical Advisory',
    description:
      'Ongoing technical guidance for product teams — code reviews, architecture decisions, technology selection, and implementation strategy. A trusted technical voice when you need one.',
  },
] as const satisfies readonly Service[]

// Validate at module load — throws during build if invalid
export const services = servicesData.map((s) => serviceSchema.parse(s))
