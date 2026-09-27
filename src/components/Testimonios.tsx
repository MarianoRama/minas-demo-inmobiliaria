import { useReveal } from '../hooks/useReveal'

const testimonios = [
  {
    texto:
      'Vendimos la casa de mis padres en menos de dos meses. Nos explicaron cada paso de la escritura y nunca sentimos que nos apuraran.',
    nombre: 'Rosana M.',
    contexto: 'vendió una casa en el centro',
  },
  {
    texto: 'Encontramos el apartamento justo frente a la plaza, cerca del trabajo de los dos.',
    nombre: 'Diego y Valentina',
    contexto: 'alquilaron en el centro',
  },
  {
    texto: 'Conocían el camino a Villa Serrana mejor que nosotros. Fundamental para elegir el terreno.',
    nombre: 'Fernando P.',
    contexto: 'compró un terreno',
  },
]

export function Testimonios() {
  const reveal = useReveal<HTMLDivElement>()

  return (
    <section aria-labelledby="testimonios-titulo" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div ref={reveal.nodeRef} className={reveal.className} style={reveal.style}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brasa-500">Clientes</p>
        <h2 id="testimonios-titulo" className="mt-2 max-w-xl font-display text-3xl text-tinta-900 sm:text-4xl">
          Lo que cuentan quienes ya operaron con nosotros
        </h2>
        <p className="mt-2 text-xs text-piedra-700">Testimonios ficticios, creados para esta demo.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2">
          <figure className="row-span-2 flex flex-col justify-between rounded-lg border border-piedra-200 bg-sierra-800 p-8 text-piedra-50 sm:p-10">
            <svg viewBox="0 0 40 32" className="h-9 w-11 text-piedra-300/60" fill="currentColor" aria-hidden="true">
              <path d="M0 20.8C0 9.6 7.6 2 17.2 0l1.6 4.4C11.6 6.8 7.2 11.6 6.8 17.2c1.2-.8 2.8-1.2 4.4-1.2 4.4 0 8 3.6 8 8s-3.6 8-8 8-11.2-4.4-11.2-11.2zm22 0C22 9.6 29.6 2 39.2 0l1.6 4.4c-7.2 2.4-11.6 7.2-12 12.8 1.2-.8 2.8-1.2 4.4-1.2 4.4 0 8 3.6 8 8s-3.6 8-8 8-11.2-4.4-11.2-11.2z" />
            </svg>
            <blockquote className="mt-6">
              <p className="font-display text-2xl leading-snug sm:text-3xl">{testimonios[0].texto}</p>
            </blockquote>
            <figcaption className="mt-8 text-sm text-piedra-300">
              <span className="font-semibold text-piedra-100">{testimonios[0].nombre}</span> — {testimonios[0].contexto}
            </figcaption>
          </figure>

          {testimonios.slice(1).map((t) => (
            <figure key={t.nombre} className="flex flex-col justify-between rounded-lg border border-piedra-200 bg-white p-6 sm:p-8">
              <blockquote>
                <p className="text-[15px] leading-relaxed text-tinta-800">{t.texto}</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-tinta-700/70">
                <span className="font-semibold text-tinta-900">{t.nombre}</span> — {t.contexto}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
