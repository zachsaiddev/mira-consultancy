import Image from 'next/image';
import { AnimatedSection } from '@/components/ui';
import { tools } from '@/lib/data/tools';

export function ToolsGrid() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <AnimatedSection as="section" className="section-padding lg:hidden">
      <div className="prose-width">
        <p className="section-label mb-8">Tools I use</p>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.logo}
              className="flex flex-col items-center gap-2"
            >
              <Image
                src={`${basePath}/images/logos/${tool.logo}.svg`}
                alt={tool.name}
                width={28}
                height={28}
                className="w-7 h-7 opacity-50"
                unoptimized
              />
              <span className="text-[9px] text-text-tertiary text-center leading-tight">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
