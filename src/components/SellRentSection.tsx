import { useDatos } from '../data/DatosContext'
import { useReveal } from '../hooks/useReveal'
import { SellRentForm } from './SellRentForm'

export function SellRentSection() {
  const { negocio } = useDatos()
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()

  return (
    <section id="tasaciones" className="bg-piedra-50">
      <div
        ref={nodeRef}
        className={`${className} mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start`}
        style={style}
      >
        <div>
          <h2 className="font-display text-3xl text-tinta-900 sm:text-4xl">
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

          <div className="relative mt-8 inline-block max-w-[260px] -rotate-2 border-[6px] border-piedra-400 bg-piedra-200 px-5 py-4 shadow-[3px_3px_0_var(--color-tinta-900)]">
            <div aria-hidden="true" className="absolute left-2 top-2 h-2 w-2 rounded-full bg-piedra-500" />
            <div aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full bg-piedra-500" />
            <div aria-hidden="true" className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-piedra-500" />
            <div aria-hidden="true" className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-piedra-500" />
            <p className="text-center font-hand text-4xl font-semibold text-tinta-900">Se vende</p>
            <p className="mt-1 text-center text-sm font-semibold text-tinta-800">{negocio.whatsapp}</p>
          </div>
        </div>

        <div className="border-2 border-piedra-200 bg-white p-6 sm:p-8">
          <SellRentForm />
        </div>
      </div>
    </section>
  )
}
