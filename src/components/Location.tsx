export function Location() {
  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl text-oliva-900 mb-4">
            Zona de cobertura
          </h2>
          <p className="text-oliva-700 mb-4">
            Trabajamos en la ciudad de Minas y alrededores, departamento de Lavalleja: centro,
            barrios residenciales, zonas cercanas al Cerro del Pintado y balnearios de la zona
            rural.
          </p>
          <ul className="space-y-2 text-oliva-700">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-oliva-500" /> Centro de Minas
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-oliva-500" /> Barrios residenciales
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-oliva-500" /> Zona rural y balnearios
            </li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-oliva-200 shadow-sm aspect-[4/3]">
          <iframe
            title="Mapa de Minas, Uruguay"
            src="https://www.google.com/maps?q=Minas,+Uruguay&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
