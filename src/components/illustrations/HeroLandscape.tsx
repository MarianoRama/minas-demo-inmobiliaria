/**
 * Ilustración de marca: panorámica de las sierras de Minas al atardecer,
 * con cielo cálido, cordones serranos con progresión de valor
 * (lejos claro y cálido, cerca oscuro y verde), monte y un rancho con la
 * ventana encendida. Pensada para ocupar el hero completo (mitad derecha y
 * parte baja), no una franja angosta.
 */

const ANCHO = 900
const ALTO = 600

type Onda = { freq: number; amp: number; fase: number }

/** Altura del perfil de una sierra en x, sumando senoidales (determinístico, sin Math.random). */
function alturaEn(x: number, base: number, ondas: Onda[]): number {
  return ondas.reduce((y, { freq, amp, fase }) => y + Math.sin((x / ANCHO) * Math.PI * freq + fase) * amp, base)
}

/** Genera un perfil de lomas suaves y redondeadas (nunca picos alpinos afilados). */
function perfilLoma(base: number, ondas: Onda[]): string {
  const pasos = 48
  const puntos: [number, number][] = []
  for (let i = 0; i <= pasos; i++) {
    const x = (ANCHO / pasos) * i
    puntos.push([x, alturaEn(x, base, ondas)])
  }
  let d = `M0,${puntos[0][1].toFixed(1)} `
  for (let i = 1; i < puntos.length; i++) {
    const [x0, y0] = puntos[i - 1]
    const [x1, y1] = puntos[i]
    const mx = (x0 + x1) / 2
    const my = (y0 + y1) / 2
    d += `Q${x0.toFixed(1)},${y0.toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)} `
  }
  d += `L${ANCHO},${puntos[puntos.length - 1][1].toFixed(1)} L${ANCHO},${ALTO} L0,${ALTO} Z`
  return d
}

// Cuatro cordones con progresión de valor: lejano claro y cálido -> cercano oscuro y verde.
const lejano = { base: 300, ondas: [{ freq: 2.2, amp: 22, fase: 0.4 }, { freq: 4.6, amp: 8, fase: 1.8 }] }
const medio = { base: 355, ondas: [{ freq: 1.7, amp: 30, fase: 1.1 }, { freq: 3.4, amp: 10, fase: 0.2 }] }
const cercano1 = { base: 415, ondas: [{ freq: 1.4, amp: 34, fase: 2.3 }, { freq: 3.1, amp: 12, fase: 0.6 }] }
const cercano2 = { base: 478, ondas: [{ freq: 1.1, amp: 30, fase: 0.9 }, { freq: 2.6, amp: 14, fase: 2.1 }] }

function Pino({ x, y, escala = 1 }: { x: number; y: number; escala?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${escala})`}>
      <rect x="-2.5" y="14" width="5" height="12" fill="var(--color-sierra-900)" />
      <path d="M0 -26 L15 12 L-15 12 Z" fill="var(--color-sierra-800)" />
      <path d="M0 -13 L11 12 L-11 12 Z" fill="var(--color-sierra-700)" />
    </g>
  )
}

function Copudo({ x, y, escala = 1 }: { x: number; y: number; escala?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${escala})`}>
      <rect x="-2.5" y="6" width="5" height="14" fill="var(--color-sierra-900)" />
      <circle cy="-4" r="13" fill="var(--color-sierra-700)" />
      <circle cx="-6" cy="0" r="9" fill="var(--color-sierra-800)" />
    </g>
  )
}

export function HeroLandscape({ className = 'h-full w-full', idSuffix = '' }: { className?: string; idSuffix?: string }) {
  const cielo = `cielo-${idSuffix}`
  const ventana = `ventana-${idSuffix}`

  // outcrop rocoso apoyado sobre el cordón medio, a la manera de un cerro serrano.
  const rocaX = 555
  const rocaY = alturaEn(rocaX, lejano.base, lejano.ondas)

  const casaX = 640
  const casaY = alturaEn(casaX, cercano2.base, cercano2.ondas) - 2

  return (
    <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={cielo} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16211a" />
          <stop offset="38%" stopColor="#28381f" />
          <stop offset="66%" stopColor="#5c5330" />
          <stop offset="86%" stopColor="#a3703f" />
          <stop offset="100%" stopColor="#c98a52" />
        </linearGradient>
        <radialGradient id={ventana} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6cf6b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f6cf6b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`horizonte-${idSuffix}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc9a55" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#b97a45" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#b97a45" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={ANCHO} height={ALTO} fill={`url(#${cielo})`} />

      {/* resplandor cálido del atardecer, detrás de los cordones */}
      <ellipse cx="430" cy="295" rx="520" ry="150" fill={`url(#horizonte-${idSuffix})`} />

      {/* sol bajo, discreto, cerca del horizonte cálido */}
      <circle cx="205" cy="300" r="26" fill="#f3d9a8" opacity="0.6" />

      {/* cordón lejano: claro y cálido, con un afloramiento rocoso */}
      <path d={perfilLoma(lejano.base, lejano.ondas)} fill="#cabb95" />
      <path
        d={`M${rocaX - 18} ${rocaY + 4} L${rocaX - 6} ${rocaY - 32} L${rocaX + 3} ${rocaY - 16} L${rocaX + 15} ${rocaY - 38} L${rocaX + 24} ${rocaY + 2} Z`}
        fill="#cabb95"
      />
      {/* cordón medio */}
      <path d={perfilLoma(medio.base, medio.ondas)} fill="#8d8259" />
      {/* cordón cercano 1 */}
      <path d={perfilLoma(cercano1.base, cercano1.ondas)} fill="#4b5c3a" />
      {/* cordón cercano 2 (primer plano, el más oscuro) */}
      <path d={perfilLoma(cercano2.base, cercano2.ondas)} fill="#202f1c" />

      {/* camino serpenteante hacia el rancho */}
      <path
        d={`M${casaX - 25} ${ALTO} C ${casaX - 45} 540, ${casaX + 10} 520, ${casaX - 15} 480 C ${casaX - 35} 455, ${casaX + 5} 440, ${casaX - 10} ${casaY + 10}`}
        fill="none"
        stroke="#c7b184"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* monte disperso, con variedad de especies */}
      <Pino x={95} y={462} escala={1.05} />
      <Copudo x={128} y={470} escala={0.85} />
      <Pino x={158} y={452} escala={0.7} />
      <Copudo x={760} y={468} escala={1} />
      <Pino x={800} y={478} escala={0.8} />
      <Copudo x={560} y={492} escala={0.65} />

      {/* rancho con ventana encendida */}
      <g transform={`translate(${casaX},${casaY})`}>
        <path d="M-34 -2 L0 -30 L34 -2 Z" fill="#3c4a2e" stroke="#141d10" strokeWidth="2" strokeLinejoin="round" />
        <rect x="-28" y="-2" width="56" height="36" fill="#eee3cd" stroke="#141d10" strokeWidth="2" />
        <rect x="12" y="-24" width="7" height="16" fill="#3c4a2e" stroke="#141d10" strokeWidth="1.4" />
        <rect x="4" y="8" width="13" height="26" fill="#2a2115" />
        <circle cx="-14" cy="14" r="12" fill={`url(#${ventana})`} />
        <rect x="-20" y="8" width="12" height="12" fill="#f6cf6b" stroke="#3c2f14" strokeWidth="1.2" />
        <line x1="-14" y1="8" x2="-14" y2="20" stroke="#3c2f14" strokeWidth="1" />
        <line x1="-20" y1="14" x2="-8" y2="14" stroke="#3c2f14" strokeWidth="1" />
      </g>

      <path d={`M0 ${ALTO - 1} H${ANCHO}`} stroke="#141d10" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}
