import {
  serviceSchema,
  processStepSchema,
  differentiatorSchema,
  type Service,
  type ProcessStep,
  type Differentiator,
} from '@/lib/schemas/content'

// — Hero —

export const hero = {
  headline: 'Built for your business. Designed for your people.',
  subheadline:
    'I help businesses implement technology that their teams understand, trust, and actually want to use.',
  ctaText: "Let\u2019s talk",
}

// — Intro —

export const intro = {
  paragraphs: [
    'Anyone can spin up a system these days. AI can build you a dashboard by lunchtime. The hard part was never the technology \u2014 it\u2019s getting people to use it.',
    'The finance team still using that spreadsheet from 2019? They\u2019re not doing it to be difficult. They\u2019re doing it because the last system someone built for them didn\u2019t respect how they work. It was designed for the data, not for the people.',
    'I\u2019m Zach. I build technology for businesses \u2014 but more importantly, I make sure it lands. That means understanding your culture before I touch your tech stack. Sitting with your team, not just your leadership. Designing around how people actually work, not how a system thinks they should. And staying involved long after go-live to make sure adoption actually happens.',
    'The best technology is the kind nobody has to think about. It just works, and people trust it.',
  ],
}

// — Differentiators —

const differentiatorData = [
  {
    id: 'people-first',
    title: 'I start with people, not platforms',
    description:
      'Before I write a line of code, I spend time with the people who\u2019ll use the system. What\u2019s frustrating them? What are they working around? What have they been promised before that didn\u2019t deliver? The answers shape everything I build.',
  },
  {
    id: 'adoption-focused',
    title: 'I design for adoption, not just functionality',
    description:
      'A system that does everything but nobody uses is worse than a spreadsheet that everyone understands. I build things that feel natural to the team using them \u2014 familiar enough to trust, smart enough to save time.',
  },
  {
    id: 'stay-until-sticks',
    title: 'I stay until it sticks',
    description:
      'Handover isn\u2019t a ZIP file and a wave goodbye. I do the training, the documentation, the hand-holding through the first few weeks. The job isn\u2019t done when the system goes live \u2014 it\u2019s done when your team is running it without me.',
  },
  {
    id: 'one-person',
    title: 'One person, the whole way through',
    description:
      'I run the discovery, design the solution, build the platform, and manage the implementation. Nothing gets lost in translation between what you asked for and what gets built \u2014 because it\u2019s the same person the whole way through.',
  },
] as const satisfies readonly Differentiator[]

export const differentiators = {
  headline:
    'Building software is easy. Getting people to use it is the hard part.',
  items: differentiatorData.map((d) => differentiatorSchema.parse(d)),
}

// — Services —

const servicesData = [
  {
    id: 'implementation-change-management',
    title: 'Implementation & Change Management',
    icon: 'compass',
    description:
      'The bit everyone else skips. I manage go-live, training, documentation, and the messy human side of getting teams to trust something new. I\u2019ve seen enough failed systems to know that adoption is where projects succeed or die.',
  },
  {
    id: 'solutions-architecture',
    title: 'Solutions Architecture & Design',
    icon: 'blueprint',
    description:
      'Working with your leadership team to understand the real problem, map out requirements, and design an approach that fits your business \u2014 not just today, but where you\u2019re heading.',
  },
  {
    id: 'custom-platform-development',
    title: 'Custom Platform Development',
    icon: 'app-window',
    description:
      'Finance platforms, operational dashboards, internal tools, data hubs \u2014 built end-to-end and designed around how your team actually works. Not a generic product forced into your workflow.',
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture & Governance',
    icon: 'workflow',
    description:
      'If your data\u2019s in five places and none of them agree, that\u2019s a problem that only gets worse. I design the structures, ownership, and sync that turn fragmented data into something your whole business can trust.',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    icon: 'brain',
    description:
      'Practical automation that takes repetitive work off your team\u2019s plate. Not AI for the sake of it \u2014 the kind of stuff that saves real hours every week and people actually notice.',
  },
] as const satisfies readonly Service[]

export const services = {
  label: 'What I Do',
  headline: 'What I Do',
  items: servicesData.map((s) => serviceSchema.parse(s)),
}

// — Process —

const processData = [
  {
    id: 'listen',
    step: 1,
    title: 'Listen.',
    icon: 'search',
    description:
      'I sit with your team \u2014 not just leadership \u2014 and understand what\u2019s actually happening on the ground. The real problems, not the ones in the brief.',
  },
  {
    id: 'design',
    step: 2,
    title: 'Design.',
    icon: 'pen-ruler',
    description:
      'I map a solution that works for the people using it, not just the people requesting it. Architecture, data model, integrations \u2014 shaped around your culture.',
  },
  {
    id: 'build',
    step: 3,
    title: 'Build.',
    icon: 'code',
    description:
      'Iterative, with your team involved. They see it early, give feedback, and start building familiarity before go-live.',
  },
  {
    id: 'implement',
    step: 4,
    title: 'Implement.',
    icon: 'shield',
    description:
      'Go-live, training, documentation, and support through the transition. Your team understands the system and feels ownership over it.',
  },
  {
    id: 'evolve',
    step: 5,
    title: 'Evolve.',
    icon: 'shield',
    description:
      'I stick around. Requirements shift, new ideas come up, and the system grows with your business.',
  },
] as const satisfies readonly ProcessStep[]

export const process = {
  label: 'How I Work',
  headline: 'From conversation to confidence',
  steps: processData.map((p) => processStepSchema.parse(p)),
}

// — About —

export const about = {
  label: 'About',
  headline: 'About Mira',
  paragraphs: [
    'Mira Consultancy is led by Zach \u2014 a solutions architect and implementation consultant based in London.',
    'I spent seven years at Apple, and that\u2019s where the foundation was set. Not the technical stuff \u2014 the human stuff. Understanding why people resist things, how to explain complex ideas simply, and why the best technology is the kind that disappears into the background.',
    'Since then I\u2019ve been the sole technology lead for a growing agency \u2014 building finance platforms, leading data governance programmes, delivering ISO 27001, and designing the IT operations infrastructure that 130 people rely on every day. In every one of those projects, the technology was the straightforward part. Getting people to trust it, use it, and make it theirs \u2014 that was the real work.',
    'I also work pro bono with non-profits including It\u2019s a Penalty and NCMEC, helping with digital transformation and technology strategy.',
    'When I\u2019m not connecting people with technology, I\u2019m playing live music across London. Different stage, same energy.',
  ],
}

// — Contact —

export const contact = {
  label: 'Get in Touch',
  headline: 'Got something that needs fixing?',
  description:
    "Tell me what\u2019s not working. No sales pitch, no commitment \u2014 just a straight conversation about whether I can help.",
  primaryCtaText: 'Get in touch',
  emailAddress: 'hello@buildwithmira.co.uk',
}
