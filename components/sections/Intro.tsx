import Image from 'next/image';
import { AnimatedSection } from '@/components/ui';

export function Intro() {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <div className="group flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          <div className="shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/zach.webp`}
              alt="Zach Said"
              width={200}
              height={200}
              className="rounded-full object-cover w-32 h-32 md:w-48 md:h-48 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-text-secondary mb-6">
              Every growing business hits the same wall. The data&apos;s in twelve
              places. Reporting takes three days when it should take three minutes.
              Teams are working around broken processes because &ldquo;that&apos;s
              just how we do it.&rdquo; Everyone knows it&apos;s not working, but
              nobody&apos;s sure what the fix looks like.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary mb-6">
              I&apos;m Zach. I help businesses figure that out and then build it. I
              run the discovery sessions with your leadership team, design the
              architecture, build the platform, and stay involved through go-live
              and adoption. One person, the whole way through — which means nothing
              gets lost in translation between what you asked for and what actually
              gets built.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary">
              I&apos;ve done this across agencies, startups, scale-ups, and
              non-profits. The specifics change every time. The approach
              doesn&apos;t: understand the business properly, then build something
              that fits.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
