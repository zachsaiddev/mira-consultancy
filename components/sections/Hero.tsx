import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center section-padding">
      <div className="prose-width">
        <p className="section-label mb-8">Mira Consultancy</p>
        <h1 className="mb-6">I build the tools your business actually needs.</h1>
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
