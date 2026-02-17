'use client';

import { useState } from 'react';
import { Button, AnimatedSection, CalendlyModal } from '@/components/ui';
import { prefetchCalendly } from '@/components/ui/CalendlyModal';

const CALENDLY_URL = 'https://calendly.com/buildwithmira/discovery';

export function Contact() {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <AnimatedSection as="section" stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="mb-6">Got something that needs fixing?</h2>
          <div className="section-card">
            <p className="text-lg text-text-secondary mb-8 max-w-[38rem]">
              Tell me what&apos;s not working. No sales pitch, no commitment — just
              a straight conversation about whether I can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <span onMouseEnter={() => prefetchCalendly(CALENDLY_URL)}>
                <Button onClick={() => setShowCalendly(true)}>
                  Get in touch
                </Button>
              </span>
              <Button href="mailto:hello@buildwithmira.co.uk" variant="secondary">
                hello@buildwithmira.co.uk
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
