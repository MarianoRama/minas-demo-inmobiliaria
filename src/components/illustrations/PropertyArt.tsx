import type { JSX, ReactNode } from 'react'
import type { TipoPropiedad } from '../../types'

type Props = { className?: string; id: number }

const stroke = 'var(--color-sierra-700)'
const fillSoft = 'var(--color-piedra-200)'
const fillMid = 'var(--color-piedra-300)'
const accent = 'var(--color-brasa-500)'
const bg = 'var(--color-piedra-100)'

// Paletas para variar techos/fachadas/puertas sin salirse de la identidad de marca.
const techos = ['var(--color-piedra-300)', 'var(--color-piedra-400)', 'var(--color-sierra-400)', 'var(--color-brasa-400)']
const fachadas = ['#ffffff', '#f7f2e6', '#efe6d2']
const puertas = ['var(--color-sierra-700)', 'var(--color-brasa-500)', 'var(--color-tinta-700)']

/** Hash determinístico simple: mismo id siempre da la misma variación. */
function seed(id: number, salt: number, mod: number): number {
  return Math.abs((id * 9301 + salt * 49297 + 233) % 233280) % mod
}

function Marco({ children, flip = false }: { children: ReactNode; flip?: boolean }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img">
      <rect width="400" height="300" fill={bg} />
      <g transform={flip ? 'translate(400,0) scale(-1,1)' : undefined}>{children}</g>
    </svg>
  )
}

function IlustracionCasa({ id }: { id: number }) {
  const techo = techos[seed(id, 1, techos.length)]
  const fachada = fachadas[seed(id, 2, fachadas.length)]
  const puerta = puertas[seed(id, 3, puertas.length)]
  const conArbol = seed(id, 4, 2) === 0
  const conGaraje = seed(id, 5, 2) === 0
  const conCerco = !conGaraje && seed(id, 6, 2) === 0
  const conChimenea = seed(id, 7, 2) === 0
  const conSol = seed(id, 8, 2) === 0
  const flip = seed(id, 9, 2) === 0
  const tresVentanas = seed(id, 10, 2) === 0

  return (
    <Marco flip={flip}>
      {conSol && <circle cx="340" cy="55" r="22" fill={fillMid} opacity="0.7" />}
      <path d="M0 240 H400" stroke={stroke} strokeWidth="1" opacity="0.25" />

      {conGaraje && (
        <>
          <rect x="286" y="185" width="60" height="55" fill={fachada} stroke={stroke} strokeWidth="2.2" />
          <path d="M280 188 L316 158 L352 188 Z" fill={techo} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
          <rect x="296" y="205" width="40" height="35" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="306" y1="205" x2="306" y2="240" stroke={stroke} strokeWidth="1.2" />
          <line x1="316" y1="205" x2="316" y2="240" stroke={stroke} strokeWidth="1.2" />
          <line x1="326" y1="205" x2="326" y2="240" stroke={stroke} strokeWidth="1.2" />
        </>
      )}

      <rect x="130" y="150" width="150" height="90" fill={fachada} stroke={stroke} strokeWidth="2.5" />
      <path d="M118 155 L205 95 L292 155 Z" fill={techo} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {conChimenea && <rect x="240" y="105" width="16" height="28" fill={fillSoft} stroke={stroke} strokeWidth="2" />}
      <rect x="196" y="190" width="30" height="50" fill={puerta} opacity="0.9" />
      <circle cx="216" cy="215" r="1.6" fill={bg} />

      <rect x="150" y="175" width="26" height="26" fill="none" stroke={stroke} strokeWidth="2.2" />
      <line x1="163" y1="175" x2="163" y2="201" stroke={stroke} strokeWidth="1.4" />
      <line x1="150" y1="188" x2="176" y2="188" stroke={stroke} strokeWidth="1.4" />

      {tresVentanas ? (
        <>
          <rect x="228" y="175" width="20" height="26" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="238" y1="175" x2="238" y2="201" stroke={stroke} strokeWidth="1.2" />
          <rect x="254" y="175" width="20" height="26" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="264" y1="175" x2="264" y2="201" stroke={stroke} strokeWidth="1.2" />
        </>
      ) : (
        <>
          <rect x="234" y="175" width="26" height="26" fill="none" stroke={stroke} strokeWidth="2.2" />
          <line x1="247" y1="175" x2="247" y2="201" stroke={stroke} strokeWidth="1.4" />
          <line x1="234" y1="188" x2="260" y2="188" stroke={stroke} strokeWidth="1.4" />
        </>
      )}

      {conArbol && (
        <path
          d="M60 240 Q64 205 92 200 Q100 175 128 190 Q140 200 132 218 Q140 232 118 240 Z"
          fill={fillSoft}
          stroke={stroke}
          strokeWidth="2"
        />
      )}
      {conCerco &&
        [40, 62, 84, 106].map((x) => (
          <line key={x} x1={x} y1="240" x2={x} y2="220" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        ))}
      <path d="M0 240 H400" stroke={stroke} strokeWidth="2.5" />
    </Marco>
  )
}

function IlustracionApartamento({ id }: { id: number }) {
  const pisos = 3 + seed(id, 1, 2)
  const balconAccent = techos[seed(id, 2, techos.length)]
  const conTanque = seed(id, 3, 2) === 0
  const conSol = seed(id, 4, 2) === 0
  const flip = seed(id, 5, 2) === 0
  const colFila = seed(id, 6, 3)

  return (
    <Marco flip={flip}>
      {conSol && <circle cx="335" cy="55" r="16" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />}
      <path d="M0 250 H400" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <rect x="110" y={250 - pisos * 45 - 20} width="180" height={pisos * 45 + 20} fill="white" stroke={stroke} strokeWidth="2.5" />
      {Array.from({ length: pisos }).map((_, row) => (
        <g key={row}>
          {[0, 1, 2].map((col) => (
            <rect
              key={col}
              x={130 + col * 50}
              y={250 - pisos * 45 + row * 45}
              width="34"
              height="26"
              fill={col === colFila ? balconAccent : fillSoft}
              stroke={stroke}
              strokeWidth="1.8"
            />
          ))}
          <rect x={126} y={250 - pisos * 45 + row * 45 + 26} width="148" height="5" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
        </g>
      ))}
      <rect x="180" y="220" width="40" height="30" fill={stroke} opacity="0.85" />
      <rect x="105" y={250 - pisos * 45 - 25} width="190" height="8" fill={stroke} />
      {conTanque && <rect x="270" y={250 - pisos * 45 - 40} width="18" height="16" fill={fillMid} stroke={stroke} strokeWidth="1.6" />}
      <path d="M0 250 H400" stroke={stroke} strokeWidth="2.5" />
    </Marco>
  )
}

function IlustracionTerreno({ id, conCasco }: { id: number; conCasco: boolean }) {
  const conArbolGrande = seed(id, 1, 2) === 0
  const conSol = seed(id, 2, 2) === 0
  const postes = 5 + seed(id, 3, 3)
  const flip = seed(id, 4, 2) === 0
  const techo = techos[seed(id, 5, techos.length)]

  return (
    <Marco flip={flip}>
      <path d="M0 190 L60 150 L120 175 L190 130 L250 175 L320 140 L400 170 V300 H0 Z" fill={fillSoft} opacity="0.6" />
      <path d="M0 220 H400" stroke={stroke} strokeWidth="2.5" />
      {conSol && <circle cx="330" cy="60" r="24" fill={fillMid} stroke={stroke} strokeWidth="2" />}
      {Array.from({ length: postes }).map((_, i) => {
        const x = 30 + i * (340 / (postes - 1))
        return (
          <g key={x}>
            <line x1={x} y1="200" x2={x} y2="176" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            {i < postes - 1 && <line x1={x} y1="184" x2={x + 340 / (postes - 1)} y2="180" stroke={stroke} strokeWidth="1.6" />}
          </g>
        )
      })}
      {conArbolGrande ? (
        <>
          <path d="M96 220 C90 195 100 175 96 155" stroke={stroke} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="94" cy="150" r="20" fill={fillMid} stroke={stroke} strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="M70 220 C67 205 73 195 70 182" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="69" cy="178" r="13" fill={fillMid} stroke={stroke} strokeWidth="1.8" />
        </>
      )}
      {conCasco && (
        <g transform="translate(230,150)">
          <rect x="0" y="30" width="70" height="42" fill="white" stroke={stroke} strokeWidth="2.2" />
          <path d="M-6 33 L35 5 L76 33 Z" fill={techo} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
          <rect x="14" y="46" width="14" height="26" fill={stroke} opacity="0.85" />
          <rect x="42" y="46" width="14" height="16" fill="none" stroke={stroke} strokeWidth="1.6" />
          <circle cx="18" cy="59" r="1.2" fill={bg} />
        </g>
      )}
      <path d="M0 220 H400" stroke={stroke} strokeWidth="1" opacity="0.3" />
    </Marco>
  )
}

function IlustracionLocal({ id }: { id: number }) {
  const toldoA = seed(id, 1, 2) === 0 ? accent : techos[2]
  const toldoB = seed(id, 2, 2) === 0 ? fillMid : techos[1]
  const conVidrieraDoble = seed(id, 3, 2) === 0
  const flip = seed(id, 4, 2) === 0
  const conCartel = seed(id, 5, 2) === 0

  return (
    <Marco flip={flip}>
      <path d="M0 240 H400" stroke={stroke} strokeWidth="1" opacity="0.25" />
      <rect x="100" y="140" width="200" height="100" fill="white" stroke={stroke} strokeWidth="2.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${100 + i * 33.3} 140 L${100 + i * 33.3 + 16} 112 L${100 + (i + 1) * 33.3 + 16} 112 L${100 + (i + 1) * 33.3} 140 Z`}
          fill={i % 2 === 0 ? toldoA : toldoB}
          stroke={stroke}
          strokeWidth="1.6"
          opacity={i % 2 === 0 ? 0.85 : 1}
        />
      ))}
      <rect x="100" y="112" width="200" height="6" fill={stroke} />
      {conCartel && <rect x="150" y="96" width="100" height="14" fill={fillSoft} stroke={stroke} strokeWidth="1.6" />}

      {conVidrieraDoble ? (
        <>
          <rect x="112" y="158" width="72" height="60" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
          <line x1="148" y1="158" x2="148" y2="218" stroke={stroke} strokeWidth="1.4" />
          <rect x="196" y="158" width="72" height="60" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
          <line x1="232" y1="158" x2="232" y2="218" stroke={stroke} strokeWidth="1.4" />
          <rect x="278" y="180" width="16" height="38" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      ) : (
        <>
          <rect x="116" y="158" width="72" height="60" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
          <line x1="152" y1="158" x2="152" y2="218" stroke={stroke} strokeWidth="1.4" />
          <rect x="218" y="180" width="30" height="38" fill="none" stroke={stroke} strokeWidth="2.2" />
          <circle cx="243" cy="199" r="1.6" fill={stroke} />
        </>
      )}
      <path d="M0 240 H400" stroke={stroke} strokeWidth="2.5" />
    </Marco>
  )
}

const mapa: Record<TipoPropiedad, (id: number) => JSX.Element> = {
  Casa: (id) => <IlustracionCasa id={id} />,
  Apartamento: (id) => <IlustracionApartamento id={id} />,
  Terreno: (id) => <IlustracionTerreno id={id} conCasco={false} />,
  Chacra: (id) => <IlustracionTerreno id={id} conCasco />,
  'Local comercial': (id) => <IlustracionLocal id={id} />,
}

export function PropertyArt({ tipo, id, className }: Props & { tipo: TipoPropiedad }) {
  return <div className={className}>{mapa[tipo](id)}</div>
}
