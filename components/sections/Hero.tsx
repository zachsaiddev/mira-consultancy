'use client';

import Image from 'next/image';
import { Button } from '@/components/ui';
import { useParallax } from '@/lib/hooks/useParallax';

export function Hero() {
  const headlineRef = useParallax<HTMLHeadingElement>(0.06);

  return (
    <section className="min-h-[70vh] flex items-center section-padding">
      <div className="prose-width">
        <Image
          src="/images/logo.png"
          alt="Mira Consultancy"
          width={48}
          height={32}
          className="mb-6"
          unoptimized
        />
        <p className="section-label mb-8">Mira Consultancy</p>
        <h1 ref={headlineRef} className="mb-6 font-bold">
          I build the tools your business actually needs.
        </h1>
        <p className="text-lg text-text-secondary max-w-[38rem] mb-8">
          Custom applications, AI agents, and workflow automation — built with
          precision for businesses that need to move fast.
        </p>
        <Button href="https://calendly.com/placeholder" external>
          Let&apos;s talk
        </Button>
      </div>
    </section>
  );
}
