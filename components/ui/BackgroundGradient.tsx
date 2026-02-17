'use client';

import { useEffect, useRef } from 'react';

/*
 * Orb config: each orb has a mouse sensitivity, scroll speed (parallax),
 * and a CSS class for color/size/position. Scroll speed varies so orbs
 * enter and leave the viewport at different rates as you scroll.
 */
const orbs = [
  // breathRate: radians per second for opacity sine wave (lower = slower pulse)
  // breathOffset: phase offset so orbs don't pulse in sync

  // Visible on load, drifts up and out
  { cls: 'gradient-orb-blue',    mx:  160, my:  120, startY: 0,    scrollSpeed: -0.12, breathRate: 0.15, breathOffset: 0    },
  { cls: 'gradient-orb-violet',  mx: -130, my:  150, startY: 0,    scrollSpeed: -0.06, breathRate: 0.12, breathOffset: 2.1  },
  // Scrolls into view mid-page
  { cls: 'gradient-orb-teal',    mx: -120, my:  130, startY: 700,  scrollSpeed: -0.12, breathRate: 0.18, breathOffset: 4.2  },
  { cls: 'gradient-orb-magenta', mx:  150, my: -100, startY: 1100, scrollSpeed: -0.14, breathRate: 0.1,  breathOffset: 1.0  },
  // Appears in lower half of page
  { cls: 'gradient-orb-coral',   mx: -100, my:  160, startY: 1800, scrollSpeed: -0.16, breathRate: 0.14, breathOffset: 3.5  },
  { cls: 'gradient-orb-indigo',  mx:  130, my: -90,  startY: 2400, scrollSpeed: -0.16, breathRate: 0.11, breathOffset: 5.3  },
] as const;

export function BackgroundGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    // Target values (set instantly by events)
    let targetMx = 0;
    let targetMy = 0;
    let targetSy = 0;

    // Current rendered values (lerped toward targets each frame)
    let currentMx = 0;
    let currentMy = 0;
    let currentSy = 0;

    const LERP_SPEED = 0.03; // 0-1, lower = smoother/slower

    let rafId: number;
    let running = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      if (!running) return;

      currentMx += (targetMx - currentMx) * LERP_SPEED;
      currentMy += (targetMy - currentMy) * LERP_SPEED;
      currentSy += (targetSy - currentSy) * LERP_SPEED;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mx', `${currentMx}`);
        containerRef.current.style.setProperty('--my', `${currentMy}`);
        containerRef.current.style.setProperty('--sy', `${currentSy}`);
      }

      // Gentle opacity breathing per orb
      const elapsed = (now - startTime) / 1000;
      for (let i = 0; i < orbs.length; i++) {
        const el = orbRefs.current[i];
        if (!el) continue;
        const { breathRate, breathOffset } = orbs[i];
        // Oscillates between 0.7 and 1.0
        const opacity = 0.85 + 0.15 * Math.sin(elapsed * breathRate + breathOffset);
        el.style.opacity = `${opacity}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMx = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMy = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetSy = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    targetSy = window.scrollY;
    currentSy = window.scrollY;
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      aria-hidden="true"
      style={{ '--mx': '0', '--my': '0', '--sy': '0' } as React.CSSProperties}
    >
      {orbs.map((orb, i) => (
        <div
          key={orb.cls}
          ref={(el) => { orbRefs.current[i] = el; }}
          className={`gradient-orb ${orb.cls}`}
          style={{
            translate: `calc(var(--mx) * ${orb.mx}px) calc(${orb.startY}px + var(--my) * ${orb.my}px + var(--sy) * ${orb.scrollSpeed}px)`,
          }}
        />
      ))}
    </div>
  );
}
