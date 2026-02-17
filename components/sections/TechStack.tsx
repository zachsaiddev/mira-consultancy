import { techStack } from '@/lib/data/tech-stack'
import { AnimatedSection } from '@/components/ui'
import {
  TypeScriptIcon,
  ReactIcon,
  SupabaseIcon,
  PostgreSQLIcon,
  N8NIcon,
  NodeJSIcon,
} from '@/components/icons/tech'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  typescript: TypeScriptIcon,
  react: ReactIcon,
  supabase: SupabaseIcon,
  postgresql: PostgreSQLIcon,
  n8n: N8NIcon,
  nodejs: NodeJSIcon,
}

export function TechStack() {
  // Filter to only technologies that have icons
  const displayTech = techStack.filter((tech) => tech.id in iconMap)

  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-8">Tech Stack</p>
        <div className="section-card flex flex-wrap items-center gap-8">
          {displayTech.map((tech) => {
            const Icon = iconMap[tech.id]
            return (
              <div
                key={tech.id}
                className="opacity-40 hover:opacity-100 transition-opacity duration-200"
                role="img"
                aria-label={tech.name}
                title={tech.name}
              >
                <Icon className="w-8 h-8" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
