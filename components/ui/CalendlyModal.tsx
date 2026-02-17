'use client'

import { useEffect, useCallback, useState, useRef } from 'react'

interface CalendlyModalProps {
  open: boolean
  onClose: () => void
  url: string
}

/** Prefetch Calendly on first hover over any booking button. */
let prefetched = false
export function prefetchCalendly(url: string) {
  if (prefetched) return
  prefetched = true
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url
  link.as = 'document'
  document.head.appendChild(link)
}

export function CalendlyModal({ open, onClose, url }: CalendlyModalProps) {
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      setLoaded(false)
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Book a discovery call"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[700px] h-[85vh] max-h-[750px] mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-text-secondary hover:text-text-primary transition-colors text-sm"
          aria-label="Close booking modal"
        >
          Close &times;
        </button>

        {/* Loading spinner */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-accent/15 bg-background">
            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={url}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full rounded-lg border border-accent/15 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          title="Book a discovery call"
        />
      </div>
    </div>
  )
}
