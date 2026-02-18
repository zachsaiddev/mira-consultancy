import type { ProcessStep } from '@/lib/schemas/content';
import { AnimatedSection } from '@/components/ui';
import {
  SearchIcon,
  PenRulerIcon,
  CodeIcon,
  ShieldIcon,
} from '@/components/icons/process';

const processIcons: Record<string, React.FC<{ className?: string }>> = {
  search: SearchIcon,
  'pen-ruler': PenRulerIcon,
  code: CodeIcon,
  shield: ShieldIcon,
};

interface ProcessProps {
  label: string;
  headline: string;
  introParagraph?: string;
  steps: ProcessStep[];
}

export function Process({ label, headline, introParagraph, steps }: ProcessProps) {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">{label}</p>
        <h2 className="mb-6">{headline}</h2>
        {introParagraph && (
          <p className="text-text-secondary mb-12 max-w-[38rem]">
            {introParagraph}
          </p>
        )}
        <div className={`section-card divide-y divide-accent/10${!introParagraph ? ' mt-6' : ''}`}>
          {steps.map((step) => {
            const Icon = step.icon ? processIcons[step.icon] : null;
            return (
              <div key={step.id} className="py-8 first:pt-0 last:pb-0 group cursor-default">
                <div className="flex items-center gap-3 mb-2">
                  <p className="section-label">
                    {String(step.step).padStart(2, '0')}
                  </p>
                  {Icon && <Icon className="w-5 h-5 text-accent shrink-0" />}
                </div>
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
