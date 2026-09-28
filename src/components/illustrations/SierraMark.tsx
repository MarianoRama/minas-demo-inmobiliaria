/** Marca de agua de las sierras de Minas. Se usa en el logo y en el hero. */
export function SierraMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="var(--color-piedra-100)" />
      <circle cx="45" cy="21" r="6" fill="var(--color-piedra-300)" />
      <path
        d="M6 44 L20 26 L28 36 L37 20 L58 44 Z"
        fill="none"
        stroke="var(--color-sierra-700)"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M6 44 L20 26 L28 36 L37 20 L58 44"
        fill="var(--color-sierra-600)"
        opacity="0.18"
      />
      <line x1="4" y1="46" x2="60" y2="46" stroke="var(--color-sierra-700)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
