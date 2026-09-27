/** Marca de agua de las sierras de Minas — usada en el logo y el hero. */
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

/** Silueta panorámica de sierra, para fondos de sección (decorativa). */
export function SierraPanorama({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 220" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M0 170 L60 120 L110 150 L160 90 L210 150 L260 100 L320 160 L360 110 L420 150 L480 130 L480 220 L0 220 Z"
        fill="var(--color-sierra-700)"
        opacity="0.9"
      />
      <path
        d="M0 190 L70 150 L130 175 L190 130 L250 175 L310 140 L380 180 L480 160 L480 220 L0 220 Z"
        fill="var(--color-sierra-800)"
      />
      <circle cx="410" cy="46" r="26" fill="var(--color-piedra-200)" opacity="0.9" />
    </svg>
  )
}
