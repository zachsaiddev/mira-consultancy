import type { CaseStudy, ProBonoItem } from '@/lib/schemas/content';
import { AnimatedSection } from '@/components/ui';

interface CaseStudiesProps {
  label: string;
  headline: string;
  studies: CaseStudy[];
  proBono: ProBonoItem[];
}

export function CaseStudies({ label, headline, studies, proBono }: CaseStudiesProps) {
  return (
    <AnimatedSection as="section" stagger className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">{label}</p>
        <h2 className="mb-16">{headline}</h2>

        {/* Main case studies */}
        <div className="space-y-0 divide-y divide-accent/10">
          {studies.map((study) => (
            <article key={study.id} className="py-12 first:pt-0 last:pb-0">
              <p className="text-text-tertiary font-mono text-sm uppercase tracking-widest mb-3">
                {study.context}
              </p>
              <h3 className="mb-6">{study.title}</h3>
              <div className="space-y-4 mb-8">
                {study.paragraphs.map((text, i) => (
                  <p key={i} className="text-text-secondary">
                    {text}
                  </p>
                ))}
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                {Array.isArray(study.metric) ? (
                  study.metric.map((line, i) => (
                    <p key={i} className="text-white">{line}</p>
                  ))
                ) : (
                  <p className="text-white">{study.metric}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pro bono — visually lighter, compact */}
        <div className="mt-16 pt-12 border-t border-accent/10">
          <p className="text-text-tertiary font-mono text-sm uppercase tracking-widest mb-8">
            Pro bono &amp; community
          </p>
          <div className="space-y-6">
            {proBono.map((item) => (
              <div key={item.name}>
                <p className="text-text-primary font-medium">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </p>
                <p className="text-text-tertiary text-sm mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
