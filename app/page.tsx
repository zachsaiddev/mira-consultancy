import {
  Hero,
  Intro,
  Differentiators,
  Services,
  Process,
  CaseStudies,
  About,
  Contact,
  Footer,
} from '@/components/sections'
import {
  hero,
  intro,
  differentiators,
  services,
  process,
  caseStudies,
  about,
  contact,
} from '@/lib/data/pages/home'

export default function Home() {
  return (
    <main className="min-h-screen border-t-[3px] border-accent">
      <Hero headline={hero.headline} subheadline={hero.subheadline} ctaText={hero.ctaText} />
      <Intro paragraphs={intro.paragraphs} />

      <hr className="border-t border-accent/15" />
      <Differentiators headline={differentiators.headline} items={differentiators.items} />

      <hr className="border-t border-accent/15" />
      <Services label={services.label} headline={services.headline} services={services.items} />

      <hr className="border-t border-accent/15" />
      <Process label={process.label} headline={process.headline} steps={process.steps} />

      <hr className="border-t border-accent/15" />
      <CaseStudies
        label={caseStudies.label}
        headline={caseStudies.headline}
        studies={caseStudies.studies}
        proBono={caseStudies.proBono}
      />

      <hr className="border-t border-accent/15" />
      <About label={about.label} headline={about.headline} paragraphs={about.paragraphs} />

      <hr className="border-t border-accent/15" />
      <Contact
        label={contact.label}
        headline={contact.headline}
        description={contact.description}
        primaryCtaText={contact.primaryCtaText}
        emailAddress={contact.emailAddress}
      />

      <Footer />
    </main>
  )
}
