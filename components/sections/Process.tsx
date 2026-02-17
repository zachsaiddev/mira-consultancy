import { processSteps } from '@/lib/data/process';
import { AnimatedSection } from '@/components/ui';

export function Process() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">How I Work</p>
        <h2 className="mb-12">Process</h2>
        <div className="section-card divide-y divide-accent/10">
          {processSteps.map((step) => (
            <div key={step.id} className="py-8 first:pt-0 last:pb-0 group cursor-default">
              <p className="section-label mb-2">
                {String(step.step).padStart(2, '0')}
              </p>
              <h3 className="text-xl mb-2">{step.title}</h3>
              <p className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
