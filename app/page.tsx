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
    <main className="min-h-screen border-t-[3px] border-accent">
      {/* Hero + Intro flow together without divider */}
      <Hero />
      <Intro />

      {/* Dividers between remaining sections */}
      <hr className="border-t border-accent/15" />
      <Services />

      <hr className="border-t border-accent/15" />
      <Process />

      <hr className="border-t border-accent/15" />
      <TechStack />

      <hr className="border-t border-accent/15" />
      <About />

      <hr className="border-t border-accent/15" />
      <Contact />

      {/* Footer has its own top border */}
      <Footer />
    </main>
  )
}
