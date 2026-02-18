import {
  serviceSchema,
  processStepSchema,
  type Service,
  type ProcessStep,
} from '@/lib/schemas/content'

// — Hero —

export const hero = {
  headline: 'I build the tools your business actually needs.',
  subheadline:
    'Solutions architecture, platform development, and implementation consulting for businesses that have outgrown their spreadsheets.',
  ctaText: "Let\u2019s talk",
}

// — Intro —

export const intro = {
  paragraphs: [
    'Every growing business hits the same wall. The data\u2019s in twelve places. Reporting takes three days when it should take three minutes. Teams are working around broken processes because \u201cthat\u2019s just how we do it.\u201d Everyone knows it\u2019s not working, but nobody\u2019s sure what the fix looks like.',
    'I help businesses figure that out and then build it. I run the discovery sessions with your leadership team, design the architecture, build the platform, and stay involved through go-live and adoption. One person, the whole way through \u2014 which means nothing gets lost in translation between what you asked for and what actually gets built.',
    'I\u2019ve done this across agencies, startups, scale-ups, and non-profits. The specifics change every time. The approach doesn\u2019t: understand the business properly, then build something that fits.',
  ],
}

// — Services —

const servicesData = [
  {
    id: 'solutions-architecture',
    title: 'Solutions Architecture & Design',
    icon: 'blueprint',
    description:
      'You know something needs to change but the technical path isn\u2019t clear. I work with your leadership team to understand the real problem, map out requirements, and design an architecture that makes sense for where your business is going \u2014 not just a quick fix for today.',
  },
  {
    id: 'custom-platform-development',
    title: 'Custom Platform Development',
    icon: 'app-window',
    description:
      'The systems your business actually runs on \u2014 finance platforms, operational dashboards, internal tools, data hubs. I build these end-to-end in TypeScript, React, and Supabase, wired into your existing tools and designed around how your team actually works.',
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture & Governance',
    icon: 'workflow',
    description:
      'If your data lives in five different tools and none of them agree, you\u2019ve got a problem that only gets worse as you grow. I design master data strategies that bring everything into one place \u2014 proper ownership, clear structures, automated sync, and a single version of the truth.',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    icon: 'brain',
    description:
      'Not AI for the sake of it. Practical automation that takes repetitive work off your team\u2019s plate \u2014 data enrichment, reporting, workflow orchestration, process automation. The kind of stuff that saves hours every week and actually sticks.',
  },
  {
    id: 'implementation-change-management',
    title: 'Implementation & Change Management',
    icon: 'compass',
    description:
      'A great system that nobody uses is a waste of everyone\u2019s time. I handle go-live, documentation, training, and the messy human side of getting people to trust something new. The job isn\u2019t done until your team is running it without me.',
  },
] as const satisfies readonly Service[]

export const services = {
  label: 'What I Build',
  headline: 'What I Build',
  items: servicesData.map((s) => serviceSchema.parse(s)),
}

// — Process —

const processData = [
  {
    id: 'discovery',
    step: 1,
    title: 'Discovery',
    icon: 'search',
    description:
      'I sit with your team and ask the right questions. Leadership, operations, finance \u2014 whoever\u2019s involved. We get clear on what success looks like before anyone touches code.',
  },
  {
    id: 'design',
    step: 2,
    title: 'Design',
    icon: 'pen-ruler',
    description:
      'I map the solution \u2014 architecture, data model, integrations. You get something that makes sense to both the technical and non-technical people in the room.',
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

export const process = {
  label: 'How I Work',
  headline: 'One person, start to finish',
  introParagraph:
    'I don\u2019t design something and hand you a PDF. I don\u2019t build something and disappear. One person owns the problem from discovery through to delivery \u2014 fewer misunderstandings, faster decisions, and a result that actually matches what you asked for.',
  steps: processData.map((p) => processStepSchema.parse(p)),
}

// — Tech List —

export const technologies = [
  'TypeScript',
  'React',
  'Supabase',
  'PostgreSQL',
  'n8n',
  'Google Workspace',
  'HubSpot',
  'Airtable',
  'REST APIs',
]

// — Contact —

export const contact = {
  label: 'Get in Touch',
  headline: 'Got a project in mind?',
  description:
    "Let\u2019s talk about what you need built. No commitment \u2014 just a conversation.",
  primaryCtaText: 'Get in touch',
  emailAddress: 'hello@buildwithmira.co.uk',
}
