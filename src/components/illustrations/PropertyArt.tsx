import type { JSX, ReactNode } from 'react'
import type { TipoPropiedad } from '../../types'

type Props = { className?: string }

const stroke = 'var(--color-sierra-700)'
const fillSoft = 'var(--color-piedra-200)'
const fillMid = 'var(--color-piedra-300)'
const accent = 'var(--color-brasa-500)'
const bg = 'var(--color-piedra-100)'

function Marco({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img">
      <rect width="400" height="300" fill={bg} />
      {children}
    </svg>
  )
}

function IlustracionCasa() {
  return (
    <Marco>
      <path d="M0 240 H400" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <rect x="130" y="150" width="150" height="90" fill="white" stroke={stroke} strokeWidth="2.5" />
      <path d="M118 155 L205 95 L292 155 Z" fill={fillMid} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="240" y="105" width="16" height="28" fill={fillSoft} stroke={stroke} strokeWidth="2" />
      <rect x="196" y="190" width="30" height="50" fill={stroke} opacity="0.85" />
      <circle cx="216" cy="215" r="1.6" fill={bg} />
      <rect x="150" y="175" width="26" height="26" fill="none" stroke={stroke} strokeWidth="2.2" />
      <line x1="163" y1="175" x2="163" y2="201" stroke={stroke} strokeWidth="1.4" />
      <line x1="150" y1="188" x2="176" y2="188" stroke={stroke} strokeWidth="1.4" />
      <rect x="234" y="175" width="26" height="26" fill="none" stroke={stroke} strokeWidth="2.2" />
      <line x1="247" y1="175" x2="247" y2="201" stroke={stroke} strokeWidth="1.4" />
      <line x1="234" y1="188" x2="260" y2="188" stroke={stroke} strokeWidth="1.4" />
      <path d="M60 240 Q64 205 92 200 Q100 175 128 190 Q140 200 132 218 Q140 232 118 240 Z" fill={fillSoft} stroke={stroke} strokeWidth="2" />
      <path d="M0 240 H400" stroke={stroke} strokeWidth="2.5" />
    </Marco>
  )
}

function IlustracionApartamento() {
  return (
    <Marco>
      <path d="M0 250 H400" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <rect x="110" y="70" width="180" height="180" fill="white" stroke={stroke} strokeWidth="2.5" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          {[0, 1, 2].map((col) => (
            <g key={col}>
              <rect
                x={130 + col * 50}
                y={90 + row * 40}
                width="34"
                height="26"
                fill={col === 1 ? fillMid : fillSoft}
                stroke={stroke}
                strokeWidth="1.8"
              />
              {row === 3 && (
                <rect x={130 + col * 50 - 4} y={90 + row * 40 + 26} width="42" height="6" fill="none" stroke={stroke} strokeWidth="1.4" />
              )}
            </g>
          ))}
        </g>
      ))}
      <rect x="180" y="220" width="40" height="30" fill={stroke} opacity="0.85" />
      <rect x="105" y="65" width="190" height="8" fill={stroke} />
      <circle cx="330" cy="60" r="14" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
      <path d="M0 250 H400" stroke={stroke} strokeWidth="2.5" />
    </Marco>
  )
}

function IlustracionTerreno() {
  return (
    <Marco>
      <path d="M0 190 L60 150 L120 175 L190 130 L250 175 L320 140 L400 170 V300 H0 Z" fill={fillSoft} opacity="0.6" />
      <path d="M0 220 H400" stroke={stroke} strokeWidth="2.5" />
      <circle cx="330" cy="60" r="24" fill={fillMid} stroke={stroke} strokeWidth="2" />
      {[40, 100, 160, 220, 280, 340].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="200" x2={x} y2="176" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          {i < 5 && <line x1={x} y1="184" x2={x + 60} y2="180" stroke={stroke} strokeWidth="1.6" />}
        </g>
      ))}
      <path d="M96 220 C90 195 100 175 96 155" stroke={stroke} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="94" cy="150" r="20" fill={fillMid} stroke={stroke} strokeWidth="2" />
    </Marco>
  )
}

function IlustracionLocal() {
  return (
    <Marco>
      <path d="M0 240 H400" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <rect x="100" y="140" width="200" height="100" fill="white" stroke={stroke} strokeWidth="2.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${100 + i * 33.3} 140 L${100 + i * 33.3 + 16} 112 L${100 + (i + 1) * 33.3 + 16} 112 L${100 + (i + 1) * 33.3} 140 Z`}
          fill={i % 2 === 0 ? accent : fillMid}
          stroke={stroke}
          strokeWidth="1.6"
          opacity={i % 2 === 0 ? 0.85 : 1}
        />
      ))}
      <rect x="100" y="112" width="200" height="6" fill={stroke} />
      <rect x="116" y="158" width="72" height="60" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
      <line x1="152" y1="158" x2="152" y2="218" stroke={stroke} strokeWidth="1.4" />
      <rect x="218" y="180" width="30" height="38" fill="none" stroke={stroke} strokeWidth="2.2" />
      <circle cx="243" cy="199" r="1.6" fill={stroke} />
      <path d="M0 240 H400" stroke={stroke} strokeWidth="2.5" />
    </Marco>
  )
}

const mapa: Record<TipoPropiedad, () => JSX.Element> = {
  Casa: IlustracionCasa,
  Apartamento: IlustracionApartamento,
  Terreno: IlustracionTerreno,
  Chacra: IlustracionTerreno,
  'Local comercial': IlustracionLocal,
}

export function PropertyArt({ tipo, className }: Props & { tipo: TipoPropiedad }) {
  const Ilustracion = mapa[tipo]
  return (
    <div className={className}>
      <Ilustracion />
    </div>
  )
}
