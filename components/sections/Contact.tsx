import { Button } from '@/components/ui';
import { AnimatedSection } from '@/components/ui';

export function Contact() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">Get in Touch</p>
        <h2 className="mb-6">Got a problem that needs solving?</h2>
        <p className="text-lg text-text-secondary mb-8 max-w-[38rem]">
          Ready to discuss your project? Book a discovery call or drop me an
          email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="https://calendly.com/placeholder" external>
            Get in touch
          </Button>
          <Button href="mailto:hello@mira.co" variant="secondary">
            hello@mira.co
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
