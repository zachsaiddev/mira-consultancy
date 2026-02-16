import { techStackItemSchema, type TechStackItem } from '@/lib/schemas/content'

const techStackData = [
  // Frontend
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'python', name: 'Python', category: 'backend' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend' },
  { id: 'supabase', name: 'Supabase', category: 'backend' },

  // Infrastructure
  { id: 'docker', name: 'Docker', category: 'infrastructure' },
  { id: 'aws', name: 'AWS', category: 'infrastructure' },
  { id: 'vercel', name: 'Vercel', category: 'infrastructure' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'infrastructure' },

  // Automation
  { id: 'n8n', name: 'n8n', category: 'automation' },
  { id: 'zapier', name: 'Zapier', category: 'automation' },
  { id: 'openai-api', name: 'OpenAI API', category: 'automation' },
  { id: 'langchain', name: 'LangChain', category: 'automation' },
] as const satisfies readonly TechStackItem[]

// Validate at module load — throws during build if invalid
export const techStack = techStackData.map((t) => techStackItemSchema.parse(t))
