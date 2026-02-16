import { services } from '@/lib/data/services';
import { AnimatedSection } from '@/components/ui';

export function Services() {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">What I Do</p>
        <h2 className="mb-12">Services</h2>
        <div className="space-y-10">
          {services.map((service) => (
            <div key={service.id}>
              <h3 className="text-xl mb-2">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
