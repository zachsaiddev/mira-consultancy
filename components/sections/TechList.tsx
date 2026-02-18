import { AnimatedSection } from '@/components/ui';

interface TechListProps {
  technologies: string[];
}

export function TechList({ technologies }: TechListProps) {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-8">Built with</p>
        <div className="section-card">
          <p className="text-text-secondary text-lg">
            {technologies.join(' / ')}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
