export function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2a5 5 0 0 0-4.78 3.53A4 4 0 0 0 4 9.5a4.5 4.5 0 0 0 .5 5A4 4 0 0 0 8 22h1" />
      <path d="M12 2a5 5 0 0 1 4.78 3.53A4 4 0 0 1 20 9.5a4.5 4.5 0 0 1-.5 5A4 4 0 0 1 16 22h-1" />
      <path d="M12 2v20" />
      <path d="M8 12h1.5" />
      <path d="M14.5 12H16" />
    </svg>
  )
}
