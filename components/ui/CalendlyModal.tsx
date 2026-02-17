'use client'

import { useEffect, useCallback } from 'react'

interface CalendlyModalProps {
  open: boolean
  onClose: () => void
  url: string
}

export function CalendlyModal({ open, onClose, url }: CalendlyModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
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
        <iframe
          src={url}
          className="w-full h-full rounded-lg border border-accent/15"
          title="Book a discovery call"
        />
      </div>
    </div>
  )
}
