import { useReveal } from '../hooks/useReveal'

const zonas = [
  {
    nombre: 'Centro',
    detalle: 'Casas, apartamentos y locales sobre 25 de Mayo, Treinta y Tres, Rodó y Batlle y Ordóñez, a pasos de Plaza Libertad.',
  },
  {
    nombre: 'Camino a Villa Serrana',
    detalle: 'Terrenos y fracciones con monte nativo y vista a la sierra, entre 8 y 15 minutos del centro.',
  },
  {
    nombre: 'Parque Salus y Ruta 8',
    detalle: 'Chacras y casas de fin de semana cerca del parque, con acceso directo por Ruta 8.',
  },
  {
    nombre: 'Ruta 12',
    detalle: 'Campos chicos y chacras productivas, buena aguada y accesos de todo tiempo.',
  },
]

export function Zonas() {
  const reveal = useReveal<HTMLDivElement>()

  return (
    <section id="zonas" className="border-y border-piedra-200 bg-piedra-100/50">
      <div
        ref={reveal.nodeRef}
        className={`${reveal.className} mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1fr] lg:items-start`}
        style={reveal.style}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brasa-500">Cobertura</p>
          <h2 className="mt-2 font-display text-3xl text-tinta-900 sm:text-4xl">Zonas donde trabajamos</h2>
          <p className="mt-3 max-w-md text-tinta-700/80">
            Conocemos Minas casa por casa: desde el trazado colonial del centro hasta los caminos
            de tierra que llevan a Villa Serrana.
          </p>

          <ol className="mt-8 divide-y divide-piedra-200 border-t border-piedra-200">
            {zonas.map((zona, i) => (
              <li key={zona.nombre} className="flex gap-4 py-5">
                <span className="font-display text-2xl text-piedra-400">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-display text-lg text-tinta-900">{zona.nombre}</p>
                  <p className="mt-1 text-sm text-tinta-700/75">{zona.detalle}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="overflow-hidden rounded-lg border border-piedra-200 bg-sierra-800">
          <div className="relative aspect-[4/3] w-full">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-sierra-800 text-piedra-200">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              <p className="px-6 text-center text-xs text-piedra-300">Mapa de Minas, Lavalleja</p>
            </div>
            <iframe
              title="Mapa de Minas, Lavalleja, Uruguay"
              src="https://www.google.com/maps?q=Minas,+Lavalleja,+Uruguay&output=embed"
              className="relative h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
