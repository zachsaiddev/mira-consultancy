import { processStepSchema, type ProcessStep } from '@/lib/schemas/content'

const processStepsData = [
  {
    id: 'discovery',
    step: 1,
    title: 'Discovery',
    icon: 'search',
    description:
      'I sit with your team and ask the right questions. Leadership, operations, finance — whoever\'s involved. We get clear on what success looks like before anyone touches code.',
  },
  {
    id: 'design',
    step: 2,
    title: 'Design',
    icon: 'pen-ruler',
    description:
      'I map the solution — architecture, data model, integrations. You get something that makes sense to both the technical and non-technical people in the room.',
  },
  {
    id: 'build',
    step: 3,
    title: 'Build',
    icon: 'code',
    description:
      'Iterative, with regular check-ins. You see progress early, give feedback often, and course-correct before anything goes too far.',
  },
  {
    id: 'implement',
    step: 4,
    title: 'Implement',
    icon: 'shield',
    description:
      'Go-live, documentation, training, handover. Your team knows how to use it and trusts it.',
  },
  {
    id: 'support',
    step: 5,
    title: 'Support',
    icon: 'shield',
    description:
      'I stick around. Things evolve, requirements shift, new ideas surface. The system grows with you.',
  },
] as const satisfies readonly ProcessStep[]

// Validate at module load — throws during build if invalid
export const processSteps = processStepsData.map((p) =>
  processStepSchema.parse(p),
)
