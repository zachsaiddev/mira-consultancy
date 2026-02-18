'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, AnimatedSection, CalendlyModal } from '@/components/ui';
import { prefetchCalendly } from '@/components/ui/CalendlyModal';
import { useParallax } from '@/lib/hooks/useParallax';

const CALENDLY_URL = 'https://calendly.com/buildwithmira/discovery';

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  showLogo?: boolean;
}

export function Hero({ headline, subheadline, ctaText, showLogo = true }: HeroProps) {
  const headlineRef = useParallax<HTMLHeadingElement>(0.06);
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <AnimatedSection as="section" className="min-h-[70vh] flex items-center section-padding">
        <div className="prose-width">
          {showLogo && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/logo.webp`}
              alt="Build with Mira"
              width={48}
              height={32}
              className="mb-6"
              unoptimized
            />
          )}
          <p className="section-label mb-8">Build with Mira</p>
          <h1 ref={headlineRef} className="mb-6 font-bold">
            {headline}
          </h1>
          <p className="text-lg text-text-secondary max-w-[38rem] mb-8">
            {subheadline}
          </p>
          <span onMouseEnter={() => prefetchCalendly(CALENDLY_URL)}>
            <Button onClick={() => setShowCalendly(true)}>
              {ctaText}
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
