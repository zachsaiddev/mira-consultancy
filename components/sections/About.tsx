import { AnimatedSection } from '@/components/ui'
import Image from 'next/image'

export function About() {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">About</p>
        <h2 className="mb-12">Who I Am</h2>
        <div className="section-card grid md:grid-cols-[200px_1fr] gap-8 items-start">
          {/* Photo column */}
          <div
            className="w-48 h-48 md:w-full md:h-auto overflow-hidden"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 50% 40%, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 40%, black 40%, transparent 80%)',
            }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Zach Said"
              width={200}
              height={200}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>

          {/* Bio column */}
          <div className="space-y-4">
            <p className="text-text-secondary">
              I'm a full-stack developer and technical consultant based in London. Since 2018,
              I've been building software for startups, agencies, and scale-ups across Europe and
              North America.
            </p>
            <p className="text-text-secondary">
              My stack centres around TypeScript, React, Next.js, and Supabase, with a focus on
              PostgreSQL for data architecture and n8n for workflow automation.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
