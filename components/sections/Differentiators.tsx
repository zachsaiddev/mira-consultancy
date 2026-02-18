import type { Differentiator } from '@/lib/schemas/content';
import { AnimatedSection } from '@/components/ui';

interface DifferentiatorsProps {
  headline: string;
  items: Differentiator[];
}

export function Differentiators({ headline, items }: DifferentiatorsProps) {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">What Makes This Different</p>
        <h2 className="mb-12">{headline}</h2>
        <div className="section-card divide-y divide-accent/10">
          {items.map((item) => (
            <div key={item.id} className="py-8 first:pt-0 last:pb-0 group cursor-default">
              <h3 className="text-xl mb-2">{item.title}</h3>
              <p className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
