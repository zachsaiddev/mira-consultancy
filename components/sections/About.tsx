'use client'

import { AnimatedSection } from '@/components/ui'
import Image from 'next/image'

export function About() {
  return (
    <AnimatedSection as="section" className="section-padding">
      <div className="prose-width">
        <p className="section-label mb-4">About</p>
        <h2 className="mb-12">About Mira</h2>
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
            <p className="text-text-secondary">
              Mira Consultancy is led by Zach — a solutions architect and
              implementation consultant based in London.
            </p>
            <p className="text-text-secondary">
              For the past few years, I&apos;ve been the sole technology lead for a
              growing agency — which in practice means I&apos;ve done a bit of
              everything. Requirements workshops with the exec team on Monday,
              database architecture on Tuesday, go-live and training on Wednesday.
              I&apos;ve delivered ISO 27001 certification from scratch, built
              enterprise finance platforms, led data governance programmes, and put
              in the IT foundations that a 130-person company now relies on daily.
            </p>
            <p className="text-text-secondary">
              Before that, I spent seven years at Apple. That&apos;s where I learned
              the thing that still shapes how I work: if you have to explain the
              technology, you haven&apos;t designed it well enough.
            </p>
            <p className="text-text-secondary">
              I also work pro bono with non-profits including It&apos;s a Penalty
              and NCMEC, helping with digital transformation and technology strategy.
            </p>
            <p className="text-text-secondary">
              When I&apos;m not building systems, I&apos;m playing live music across
              London. Different stage, same energy.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
