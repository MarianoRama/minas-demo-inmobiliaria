import { SellRentForm } from './SellRentForm'

export function SellRentSection() {
  return (
    <section id="vender-alquilar" className="bg-oliva-50 border-y border-oliva-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl text-oliva-900">
            ¿Querés vender o alquilar tu propiedad?
          </h2>
          <p className="mt-3 text-oliva-600">
            Contanos qué propiedad tenés y coordinamos una conversación para evaluar los próximos
            pasos. En esta demo, el formulario no transmite ni guarda datos.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-oliva-200 shadow-sm p-6 sm:p-10">
          <SellRentForm />
        </div>
      </div>
    </section>
  )
}
