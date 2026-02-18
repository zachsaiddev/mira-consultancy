'use client';

import { useState } from 'react';
import { Button, AnimatedSection, CalendlyModal } from '@/components/ui';
import { prefetchCalendly } from '@/components/ui/CalendlyModal';

const CALENDLY_URL = 'https://calendly.com/buildwithmira/discovery';

interface ContactProps {
  label: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  emailAddress: string;
}

export function Contact({ label, headline, description, primaryCtaText, emailAddress }: ContactProps) {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <AnimatedSection as="section" stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">{label}</p>
          <h2 className="mb-6">{headline}</h2>
          <div className="section-card">
            <p className="text-lg text-text-secondary mb-8 max-w-[38rem]">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <span onMouseEnter={() => prefetchCalendly(CALENDLY_URL)}>
                <Button onClick={() => setShowCalendly(true)}>
                  {primaryCtaText}
                </Button>
              </span>
              <Button href={`mailto:${emailAddress}`} variant="secondary">
                {emailAddress}
              </Button>
            </div>
          </div>
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
