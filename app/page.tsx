import { services } from '@/lib/data/services'
import { techStack } from '@/lib/data/tech-stack'
import { processSteps } from '@/lib/data/process'
import { AnimatedSection, Button } from '@/components/ui'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <AnimatedSection stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-8">Mira Consultancy</p>
          <h1 className="mb-6">Technology that moves your business forward.</h1>
          <p className="text-lg text-text-secondary max-w-[38rem]">
            Custom applications, AI agents, and workflow automation — built
            with precision for businesses that need to move fast.
          </p>
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">What I Do</p>
          <h2 className="mb-12">Services</h2>
          <div className="space-y-10">
            {services.map((service) => (
              <div key={service.id}>
                <h3 className="text-xl mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Process */}
      <AnimatedSection stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">How I Work</p>
          <h2 className="mb-12">Process</h2>
          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.id}>
                <p className="section-label mb-2">
                  {String(step.step).padStart(2, '0')}
                </p>
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack */}
      <AnimatedSection stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">Tech Stack</p>
          <h2 className="mb-12">Tools I Use</h2>
          <div className="space-y-6">
            {(
              ['frontend', 'backend', 'infrastructure', 'automation'] as const
            ).map((category) => (
              <div key={category}>
                <p className="section-label mb-2">{category}</p>
                <p className="text-text-primary">
                  {techStack
                    .filter((t) => t.category === category)
                    .map((t) => t.name)
                    .join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="mb-6">Let&apos;s talk.</h2>
          <p className="mb-8">
            Ready to discuss your project? Book a discovery call or drop me an
            email.
          </p>
          <div className="flex flex-col gap-4">
            <Button href="https://calendly.com/placeholder" external>
              Book a call
            </Button>
            <Button href="mailto:hello@mira.co" variant="secondary">
              hello@mira.co
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
