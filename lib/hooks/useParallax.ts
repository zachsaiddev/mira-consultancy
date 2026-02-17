'use client';

import { useEffect, useRef } from 'react';

/**
 * Applies a subtle translateY parallax to the ref'd element.
 * speed: 0.0 = no movement, 0.1 = very subtle, 0.2 = noticeable
 * Automatically disabled when prefers-reduced-motion is set.
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.08) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - window.innerHeight / 2) * speed;
        ref.current.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial position

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
