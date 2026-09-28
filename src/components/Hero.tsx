export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-oliva-800 text-arena-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(212,197,150,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.15), transparent 40%)',
        }}
      />

      <svg
        aria-hidden
        className="absolute bottom-0 left-0 w-full text-oliva-900/60"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,160 C240,80 480,200 720,140 C960,80 1200,180 1440,100 L1440,200 L0,200 Z"
        />
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div className="flex flex-col items-start gap-6">
        <span className="inline-flex items-center rounded-full bg-arena-50/10 border border-arena-100/30 px-4 py-1 text-xs font-medium tracking-wide uppercase">
          Minas, Uruguay
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-tight max-w-2xl">
          Encontrá tu próximo hogar al pie de la sierra
        </h1>
        <p className="max-w-xl text-arena-100/90 text-base sm:text-lg">
          En Inmobiliaria Piedra Serrana podés consultar propiedades en Minas y alrededores,
          coordinar una visita o conversar sobre una venta o alquiler.
        </p>
        <a
          href="#propiedades"
          className="inline-flex items-center gap-2 rounded-md bg-arena-100 text-oliva-900 font-semibold px-6 py-3 shadow-lg shadow-black/10 hover:bg-arena-50 transition-colors"
        >
          Ver propiedades
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-arena-100/20 bg-oliva-900/40 shadow-2xl shadow-black/20">
          <img
            src="https://images.unsplash.com/photo-1534430198509-8a3091682aa8?auto=format&fit=crop&w=1400&q=80"
            alt="Fachada de una vivienda; imagen ilustrativa"
            className="aspect-[4/3] w-full object-cover"
            fetchPriority="high"
          />
          <figcaption className="px-4 py-3 text-xs text-arena-100/80">
            Fotografía de Toa Heftiba / Unsplash. Imagen ilustrativa; no corresponde a un aviso en Minas.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
