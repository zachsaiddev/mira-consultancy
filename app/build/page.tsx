import type { Metadata } from 'next'
import {
  Hero,
  Intro,
  Services,
  Process,
  Contact,
  Footer,
} from '@/components/sections'
import {
  hero,
  intro,
  services,
  process,
  contact,
} from '@/lib/data/pages/build'

export const metadata: Metadata = {
  title: 'What I Build — Build with Mira',
  description:
    'Solutions architecture, platform development, and implementation consulting for businesses that have outgrown their spreadsheets.',
  openGraph: {
    title: 'What I Build — Build with Mira',
    description:
      'Solutions architecture, platform development, and implementation consulting for businesses that have outgrown their spreadsheets.',
    url: 'https://buildwithmira.co.uk/build',
  },
}

export default function BuildPage() {
  return (
    <main className="min-h-screen border-t-[3px] border-accent">
      <Hero headline={hero.headline} subheadline={hero.subheadline} ctaText={hero.ctaText} />
      <Intro paragraphs={intro.paragraphs} />

      <hr className="border-t border-accent/15" />
      <Services label={services.label} headline={services.headline} services={services.items} />

      <hr className="border-t border-accent/15" />
      <Process
        label={process.label}
        headline={process.headline}
        introParagraph={process.introParagraph}
        steps={process.steps}
      />

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
