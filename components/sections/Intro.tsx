'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui';

interface IntroProps {
  paragraphs: string[];
}

export function Intro({ paragraphs }: IntroProps) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [showLaugh, setShowLaugh] = useState(false);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    function onScroll() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Snap to laugh once photo reaches the middle of the viewport
      setShowLaugh(rect.top < vh * 0.45);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          <div ref={photoRef} className="shrink-0 relative w-32 h-32 md:w-48 md:h-48">
            {/* Smile (base layer) */}
            <Image
              src={`${basePath}/images/zach.webp`}
              alt="Zach Said"
              width={200}
              height={200}
              className="rounded-full object-cover w-full h-full"
            />
            {/* Laugh (swap layer — snaps on/off, no blend) */}
            <Image
              src={`${basePath}/images/zach-laugh.webp`}
              alt=""
              width={200}
              height={200}
              aria-hidden="true"
              className={`rounded-full object-cover w-full h-full absolute inset-0 transition-opacity duration-200 ${showLaugh ? 'opacity-100' : 'opacity-0'}`}
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
      </div>
    </AnimatedSection>
  );
}
