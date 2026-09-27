import { useReveal } from '../hooks/useReveal'
import { SellRentForm } from './SellRentForm'

export function SellRentSection() {
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()

  return (
    <section id="tasaciones" className="bg-piedra-50">
      <div
        ref={nodeRef}
        className={`${className} mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start`}
        style={style}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brasa-500">Tasaciones</p>
          <h2 className="mt-2 font-display text-3xl text-tinta-900 sm:text-4xl">
            ¿Querés vender o alquilar tu propiedad?
          </h2>
          <p className="mt-4 text-tinta-700/80">
            Visitamos tu casa, terreno o local y te damos una tasación de referencia sin costo,
            basada en operaciones reales de la zona. Contanos los datos básicos y coordinamos por
            WhatsApp.
          </p>
          <p className="mt-4 text-sm text-piedra-700">
            Formulario de demostración: arma un mensaje de WhatsApp, no envía datos a ningún
            servidor.
          </p>
        </div>

        <div className="rounded-lg border border-piedra-200 bg-white p-6 shadow-sm sm:p-8">
          <SellRentForm />
        </div>
      </div>
    </section>
  )
}
