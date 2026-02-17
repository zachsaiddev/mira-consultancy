'use client';

import { useEffect, useRef } from 'react';

export function BackgroundGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    let rafId: number;

    const update = (mx: number, my: number, sy: number) => {
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        containerRef.current.style.setProperty('--mx', `${mx}`);
        containerRef.current.style.setProperty('--my', `${my}`);
        containerRef.current.style.setProperty('--sy', `${sy}`);
      });
    };

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      const scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      update(mouseX, mouseY, scrollY);
    };

    const onScroll = () => {
      const scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      update(mouseX, mouseY, scrollY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ '--mx': '0', '--my': '0', '--sy': '0' } as React.CSSProperties}
    >
      {/* Each orb reacts to mouse + scroll at different speeds for depth */}
      <div
        className="gradient-orb gradient-orb-blue"
        style={{ translate: 'calc(var(--mx) * 35px) calc(var(--my) * 25px + var(--sy) * -80px)' }}
      />
      <div
        className="gradient-orb gradient-orb-violet"
        style={{ translate: 'calc(var(--mx) * -25px) calc(var(--my) * 30px + var(--sy) * -120px)' }}
      />
      <div
        className="gradient-orb gradient-orb-magenta"
        style={{ translate: 'calc(var(--mx) * 30px) calc(var(--my) * -20px + var(--sy) * 60px)' }}
      />
      <div
        className="gradient-orb gradient-orb-coral"
        style={{ translate: 'calc(var(--mx) * -20px) calc(var(--my) * 35px + var(--sy) * -40px)' }}
      />
    </div>
  );
}
