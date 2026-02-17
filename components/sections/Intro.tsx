import Image from 'next/image';
import { AnimatedSection } from '@/components/ui';

export function Intro() {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <div className="group flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          <div className="shrink-0">
            <Image
              src="/images/zach.png"
              alt="Zach Said"
              width={200}
              height={200}
              className="rounded-full object-cover w-32 h-32 md:w-48 md:h-48 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-text-secondary mb-6">
              I&apos;m Zach, and I build software for businesses that need custom tools
              but don&apos;t have the time or team to build them in-house.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary mb-6">
              Since 2018, I&apos;ve worked with startups, agencies, and scale-ups to
              design and build internal applications, AI-powered workflows, and
              technical infrastructure that actually gets used.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary">
              Based in London, working with clients across Europe and North America.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
