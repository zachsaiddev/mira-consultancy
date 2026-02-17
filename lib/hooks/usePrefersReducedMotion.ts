'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true if the user prefers reduced motion.
 * SSR-safe: defaults to false (animations enabled), then checks on mount.
 * Also listens for runtime changes (e.g., user toggles system setting while
 * the page is open).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mql.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
