import { useReveal } from '../hooks/useReveal'

const testimonios = [
  {
    texto:
      'Vendimos la casa de mis padres en menos de dos meses. Nos explicaron cada paso de la escritura y nunca sentimos que nos apuraran.',
    nombre: 'Rosana M.',
    barrio: 'Centro',
  },
  {
    texto: 'Encontramos el apartamento justo frente a la plaza, cerca del trabajo de los dos.',
    nombre: 'Diego y Valentina',
    barrio: 'alquilaron en el Centro',
  },
  {
    texto: 'Conocían el camino a Villa Serrana mejor que nosotros. Fundamental para elegir el terreno.',
    nombre: 'Fernando P.',
    barrio: 'compró camino a Villa Serrana',
  },
]

export function Testimonios() {
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()

  return (
    <section aria-labelledby="testimonios-titulo" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div ref={nodeRef} className={className} style={style}>
        <h2 id="testimonios-titulo" className="max-w-xl font-display text-3xl text-tinta-900 sm:text-4xl">
          Lo que cuentan quienes ya operaron con nosotros
        </h2>
        <p className="mt-2 text-xs text-piedra-700">Testimonios ficticios, creados para esta demo.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2">
          <figure className="relative row-span-2 flex flex-col justify-between border-2 border-tinta-900 bg-sierra-800 p-8 text-piedra-50 sm:p-10">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-8 rotate-[-4deg] bg-brasa-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-piedra-50"
            >
              Reseña real de cliente
            </span>
            <blockquote className="mt-6">
              <p className="font-display text-2xl leading-snug sm:text-3xl">{testimonios[0].texto}</p>
            </blockquote>
            <figcaption className="mt-8 border-t border-piedra-100/20 pt-4 text-sm text-piedra-300">
              <span className="font-semibold text-piedra-100">{testimonios[0].nombre}</span>, vendió en{' '}
              {testimonios[0].barrio}
            </figcaption>
          </figure>

          {testimonios.slice(1).map((t) => (
            <figure key={t.nombre} className="flex flex-col justify-between border-2 border-piedra-200 bg-white p-6 sm:p-8">
              <blockquote>
                <p className="text-[15px] leading-relaxed text-tinta-800">{t.texto}</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-tinta-700/70">
                <span className="font-semibold text-tinta-900">{t.nombre}</span>, {t.barrio}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
