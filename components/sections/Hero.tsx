'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, AnimatedSection, CalendlyModal } from '@/components/ui';
import { prefetchCalendly } from '@/components/ui/CalendlyModal';
import { useParallax } from '@/lib/hooks/useParallax';

const CALENDLY_URL = 'https://calendly.com/buildwithmira/discovery';

export function Hero() {
  const headlineRef = useParallax<HTMLHeadingElement>(0.06);
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <AnimatedSection as="section" className="min-h-[70vh] flex items-center section-padding">
        <div className="prose-width">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/logo.webp`}
            alt="Build with Mira"
            width={48}
            height={32}
            className="mb-6"
            unoptimized
          />
          <p className="section-label mb-8">Build with Mira</p>
          <h1 ref={headlineRef} className="mb-6 font-bold">
            I build the tools your business actually needs.
          </h1>
          <p className="text-lg text-text-secondary max-w-[38rem] mb-8">
            Custom applications, AI agents, and workflow automation — built with
            precision for businesses that need to move fast.
          </p>
          <span onMouseEnter={() => prefetchCalendly(CALENDLY_URL)}>
            <Button onClick={() => setShowCalendly(true)}>
              Let&apos;s talk
            </Button>
          </span>
        </div>
      </AnimatedSection>
      <CalendlyModal
        open={showCalendly}
        onClose={() => setShowCalendly(false)}
        url={CALENDLY_URL}
      />
    </>
  );
}
