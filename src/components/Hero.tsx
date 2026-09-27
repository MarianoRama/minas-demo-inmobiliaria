import { SierraMark } from './illustrations/SierraMark'

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-sierra-800 textura-papel text-piedra-50">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
        <div>
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-piedra-300">
            <span className="h-px w-8 bg-piedra-300" aria-hidden="true" />
            Minas, Lavalleja — desde 2011
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05] text-piedra-50">
            Casas, campos y locales
            <br />
            con los pies en la sierra.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-piedra-200 sm:text-base">
            Compramos, vendemos y alquilamos propiedades en Minas y su zona rural desde hace
            catorce años. Conocemos cada cuadra del centro y cada camino a Villa Serrana —
            asesoramiento directo, sin intermediarios de más.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#propiedades"
              className="foco-visible inline-flex items-center gap-2 rounded-md bg-piedra-100 px-6 py-3.5 text-sm font-semibold text-sierra-800 transition-colors hover:bg-white"
            >
              Ver propiedades disponibles
            </a>
            <a
              href="#tasaciones"
              className="foco-visible inline-flex items-center gap-1.5 text-sm font-semibold text-piedra-200 underline decoration-piedra-400/50 underline-offset-4 transition-colors hover:text-white"
            >
              Tasamos tu propiedad
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-xs rounded-full bg-sierra-700/60 p-8 ring-1 ring-piedra-200/15 sm:max-w-sm">
            <SierraMark className="h-full w-full" />
          </div>
        </div>
      </div>

      <dl className="relative border-t border-piedra-100/15 bg-sierra-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-piedra-100/15 px-4 sm:px-6">
          {[
            { valor: '14', etiqueta: 'años en la plaza de Minas' },
            { valor: '210+', etiqueta: 'operaciones cerradas' },
            { valor: '12', etiqueta: 'propiedades disponibles hoy' },
          ].map((dato) => (
            <div key={dato.etiqueta} className="px-3 py-6 text-center sm:px-6 sm:text-left">
              <dt className="sr-only">{dato.etiqueta}</dt>
              <dd className="font-display text-2xl text-piedra-50 sm:text-3xl">{dato.valor}</dd>
              <dd className="mt-1 text-[11px] leading-snug text-piedra-300 sm:text-xs">{dato.etiqueta}</dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  )
}
