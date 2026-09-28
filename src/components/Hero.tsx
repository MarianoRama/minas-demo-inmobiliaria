import { HeroLandscape } from './illustrations/HeroLandscape'

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-sierra-800 textura-papel text-piedra-50">
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HeroLandscape className="h-full w-full" idSuffix="hero" />
        </div>
        {/* velo para que el texto mantenga contraste AA sobre el paisaje */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{ background: 'linear-gradient(115deg, #16211a 0%, rgba(22,33,26,0.85) 32%, rgba(22,33,26,0.35) 56%, transparent 72%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 sm:hidden"
          style={{ background: 'linear-gradient(180deg, rgba(22,33,26,0.15) 0%, rgba(22,33,26,0.8) 42%, rgba(22,33,26,0.8) 68%, transparent 96%)' }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-[190px] pt-12 sm:px-6 sm:pb-[240px] sm:pt-16 lg:pb-[260px] lg:pt-16">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-piedra-300">
              <span className="h-px w-8 bg-piedra-300" aria-hidden="true" />
              Minas, Lavalleja — desde 2011
            </p>
            <h1
              className="font-display text-[clamp(2.15rem,5vw,3.5rem)] leading-[1.12] text-piedra-50"
              style={{ textWrap: 'balance' }}
            >
              Casas, campos y locales con los pies en la sierra.
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
