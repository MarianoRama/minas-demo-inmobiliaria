import { useReveal } from '../hooks/useReveal'

// Nombres ficticios de empresas que "trabajan con" la inmobiliaria: ninguno
// corresponde a una marca real.
const aliados = [
  'Escribanía Zabala & Ferreira',
  'Constructora Piedra Alta',
  'Banco Cardal',
  'Corralón San Francisco',
  'Estudio Contable del Cerro',
  'Gestora Serrana Seguros',
]

function Wordmark({ nombre }: { nombre: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap px-8 text-lg font-display text-tinta-700/40 grayscale transition-all duration-300 hover:text-sierra-700 hover:grayscale-0">
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {nombre}
    </span>
  )
}

export function LogoStrip() {
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()
  const fila = [...aliados, ...aliados]

  return (
    <section aria-labelledby="aliados-titulo" className="border-y border-piedra-200 bg-piedra-100/60 py-12 sm:py-14">
      <div ref={nodeRef} className={className} style={style}>
        <p
          id="aliados-titulo"
          className="mx-auto max-w-6xl px-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-piedra-700 sm:px-6 sm:text-left"
        >
          Nos confían sus operaciones
        </p>

        <div
          className="cinta-pausa relative mt-6 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="cinta-track flex w-max items-center py-1">
            {fila.map((nombre, i) => (
              <Wordmark key={`${nombre}-${i}`} nombre={nombre} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
