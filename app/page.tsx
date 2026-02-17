import {
  Hero,
  Intro,
  Services,
  Process,
  TechStack,
  About,
  Contact,
  Footer,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero + Intro flow together without divider */}
      <Hero />
      <Intro />

      {/* Dividers between remaining sections */}
      <hr className="border-t border-text-tertiary/20" />
      <Services />

      <hr className="border-t border-text-tertiary/20" />
      <Process />

      <hr className="border-t border-text-tertiary/20" />
      <TechStack />

      <hr className="border-t border-text-tertiary/20" />
      <About />

      <hr className="border-t border-text-tertiary/20" />
      <Contact />

      {/* Footer has its own top border */}
      <Footer />
    </main>
  )
}
