/**
 * Ilustración de marca: panorámica de las sierras de Minas al atardecer, con
 * camino, monte y un rancho con la ventana encendida. Pensada para sangrar
 * fuera del contenedor (bleed) o cubrir la parte baja del hero.
 */
export function HeroLandscape({ className = 'h-full w-full', idSuffix = '' }: { className?: string; idSuffix?: string }) {
  const cielo = `cielo-${idSuffix}`
  const brillo = `brillo-${idSuffix}`

  return (
    <svg viewBox="0 0 900 560" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={cielo} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-sierra-900)" />
          <stop offset="55%" stopColor="var(--color-sierra-800)" />
          <stop offset="100%" stopColor="var(--color-sierra-700)" />
        </linearGradient>
        <radialGradient id={brillo} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-piedra-200)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-piedra-200)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="900" height="560" fill={`url(#${cielo})`} />

      {/* sol bajo, discreto */}
      <circle cx="700" cy="120" r="46" fill="var(--color-piedra-200)" opacity="0.18" />
      <circle cx="700" cy="120" r="24" fill="var(--color-piedra-200)" opacity="0.5" />

      {/* cordón lejano */}
      <path
        d="M0 260 L90 210 L170 245 L260 190 L340 235 L430 180 L520 230 L610 195 L700 240 L790 205 L900 245 L900 560 L0 560 Z"
        fill="var(--color-sierra-600)"
        opacity="0.55"
      />
      {/* cordón medio */}
      <path
        d="M0 320 L100 275 L190 310 L280 260 L380 305 L470 265 L560 315 L660 270 L760 310 L900 285 L900 560 L0 560 Z"
        fill="var(--color-sierra-600)"
        opacity="0.8"
      />
      {/* cordón cercano */}
      <path
        d="M0 380 L110 340 L210 375 L300 330 L410 372 L520 335 L610 378 L720 340 L820 375 L900 350 L900 560 L0 560 Z"
        fill="var(--color-sierra-700)"
      />

      {/* camino serpenteante */}
      <path
        d="M615 560 C 600 490 645 470 625 420 C 610 385 645 370 635 340"
        fill="none"
        stroke="var(--color-piedra-300)"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M615 560 C 600 490 645 470 625 420 C 610 385 645 370 635 340"
        fill="none"
        stroke="var(--color-piedra-100)"
        strokeWidth="2"
        strokeDasharray="10 14"
        opacity="0.5"
      />

      {/* monte / arboleda */}
      {[
        [120, 430, 1],
        [150, 445, 0.8],
        [175, 420, 0.65],
        [740, 410, 1.1],
        [770, 430, 0.75],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          <rect x="-3" y="18" width="6" height="16" fill="var(--color-sierra-900)" opacity="0.8" />
          <path d="M0 -30 L18 20 L-18 20 Z" fill="var(--color-sierra-800)" />
          <path d="M0 -14 L14 20 L-14 20 Z" fill="var(--color-sierra-700)" />
        </g>
      ))}

      {/* rancho con ventana encendida */}
      <g transform="translate(615,392)">
        <rect x="-30" y="6" width="60" height="34" fill="var(--color-tinta-900)" opacity="0.9" />
        <path d="M-36 8 L0 -20 L36 8 Z" fill="var(--color-sierra-900)" />
        <circle r="22" fill={`url(#${brillo})`} />
        <rect x="-8" y="16" width="14" height="14" fill="var(--color-piedra-200)" />
        <rect x="12" y="20" width="8" height="20" fill="var(--color-sierra-900)" opacity="0.9" />
      </g>

      <path d="M0 560 H900" stroke="var(--color-sierra-900)" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}
