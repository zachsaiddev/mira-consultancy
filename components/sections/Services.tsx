import type { Service } from '@/lib/schemas/content';
import { AnimatedSection } from '@/components/ui';
import {
  AppWindowIcon,
  BrainIcon,
  WorkflowIcon,
  BlueprintIcon,
  CompassIcon,
} from '@/components/icons/services';

const serviceIcons: Record<string, React.FC<{ className?: string }>> = {
  'app-window': AppWindowIcon,
  brain: BrainIcon,
  workflow: WorkflowIcon,
  blueprint: BlueprintIcon,
  compass: CompassIcon,
};

interface ServicesProps {
  label: string;
  headline: string;
  services: Service[];
}

export function Services({ label, headline, services }: ServicesProps) {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">{label}</p>
        <h2 className="mb-12">{headline}</h2>
        <div className="section-card divide-y divide-accent/10">
          {services.map((service) => {
            const Icon = service.icon ? serviceIcons[service.icon] : null;
            return (
              <div key={service.id} className="py-8 first:pt-0 last:pb-0 group cursor-default">
                <div className="flex items-center gap-3 mb-2">
                  {Icon && <Icon className="w-5 h-5 text-accent shrink-0" />}
                  <h3 className="text-xl">{service.title}</h3>
                </div>
                <p className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
