'use client'

import { AnimatedSection } from '@/components/ui'
import Image from 'next/image'

interface AboutProps {
  label: string;
  headline: string;
  paragraphs: string[];
}

export function About({ label, headline, paragraphs }: AboutProps) {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">{label}</p>
        <h2 className="mb-12">{headline}</h2>
        <div className="section-card grid md:grid-cols-[200px_1fr] gap-8 items-start">
          {/* Photo column */}
          <div className="w-48 h-48 md:w-full md:h-auto overflow-hidden rounded-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/zach.webp`}
              alt="Zach Said"
              width={200}
              height={200}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>

          {/* Bio column */}
          <div className="space-y-4">
            {paragraphs.map((text, i) => (
              <p key={i} className="text-text-secondary">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
