'use client';

import { useState } from 'react';
import { Button, AnimatedSection, CalendlyModal } from '@/components/ui';

const CALENDLY_URL = 'https://calendly.com/buildwithmira/discovery';

export function Contact() {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <AnimatedSection as="section" stagger className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="mb-6">Got a problem that needs solving?</h2>
          <div className="section-card">
            <p className="text-lg text-text-secondary mb-8 max-w-[38rem]">
              Ready to discuss your project? Book a discovery call or drop me an
              email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => setShowCalendly(true)}>
                Get in touch
              </Button>
              <Button href="mailto:hello@mira.co" variant="secondary">
                hello@mira.co
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
