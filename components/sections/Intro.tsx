import Image from 'next/image';
import { AnimatedSection } from '@/components/ui';

interface IntroProps {
  paragraphs: string[];
  showPhoto?: boolean;
}

export function Intro({ paragraphs, showPhoto = false }: IntroProps) {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        {showPhoto ? (
          <div className="group flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <div className="shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/zach.webp`}
                alt="Zach Said"
                width={200}
                height={200}
                className="rounded-full object-cover w-32 h-32 md:w-48 md:h-48 grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  className={`text-lg leading-relaxed text-text-secondary${i < paragraphs.length - 1 ? ' mb-6' : ''}`}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`text-lg leading-relaxed text-text-secondary${i < paragraphs.length - 1 ? ' mb-6' : ''}`}
              >
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
