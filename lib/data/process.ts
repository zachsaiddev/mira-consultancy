import { processStepSchema, type ProcessStep } from '@/lib/schemas/content'

const processStepsData = [
  {
    id: 'discovery',
    step: 1,
    title: 'Discovery',
    description:
      'Understanding the problem, the context, and what success looks like. We talk through your goals, constraints, and the outcomes you need.',
  },
  {
    id: 'design',
    step: 2,
    title: 'Design',
    description:
      'Planning the solution — architecture, technology choices, and a clear roadmap. You get a technical plan that makes sense for your business.',
  },
  {
    id: 'build',
    step: 3,
    title: 'Build',
    description:
      'Iterative development with regular check-ins and demos. You see progress weekly, provide feedback, and steer direction as we go.',
  },
  {
    id: 'support',
    step: 4,
    title: 'Support',
    description:
      'Ongoing maintenance, bug fixes, and feature enhancements. The software keeps working, and evolves as your business does.',
  },
] as const satisfies readonly ProcessStep[]

// Validate at module load — throws during build if invalid
export const processSteps = processStepsData.map((p) =>
  processStepSchema.parse(p),
)
