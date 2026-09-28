import { useState, type FormEvent } from 'react'
import { useDatos } from '../data/DatosContext'

const clasesInput = 'foco-visible w-full border-2 border-piedra-300 bg-white px-3 py-2.5 text-tinta-900'

export function NegocioForm() {
  const { negocio, actualizarNegocio } = useDatos()
  const [datos, setDatos] = useState(negocio)
  const [guardado, setGuardado] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    actualizarNegocio(datos)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  function horario(i: number, campo: 'dia' | 'texto', valor: string) {
    setDatos((d) => ({ ...d, horarios: d.horarios.map((h, idx) => (idx === i ? { ...h, [campo]: valor } : h)) }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-display text-2xl text-tinta-900">Datos del negocio</h2>
      <p className="text-sm text-tinta-700/70">Esto se ve en el encabezado, el pie de página y los mensajes de WhatsApp.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-tinta-800">
            Nombre del negocio
          </label>
          <input id="nombre" className={clasesInput} value={datos.nombre} onChange={(e) => setDatos((d) => ({ ...d, nombre: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="slogan" className="text-sm font-medium text-tinta-800">
            Frase corta (slogan)
          </label>
          <input id="slogan" className={clasesInput} value={datos.slogan} onChange={(e) => setDatos((d) => ({ ...d, slogan: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="whatsapp" className="text-sm font-medium text-tinta-800">
            WhatsApp (como se muestra)
          </label>
          <input
            id="whatsapp"
            className={clasesInput}
            value={datos.whatsapp}
            onChange={(e) => setDatos((d) => ({ ...d, whatsapp: e.target.value }))}
            placeholder="Ej: 598 94 512 830"
          />
        </div>
        <div>
          <label htmlFor="whatsappLink" className="text-sm font-medium text-tinta-800">
            WhatsApp (para el link, solo números)
          </label>
          <input
            id="whatsappLink"
            className={clasesInput}
            value={datos.whatsappLink}
            onChange={(e) => setDatos((d) => ({ ...d, whatsappLink: e.target.value.replace(/\D/g, '') }))}
            placeholder="Ej: 59894512830"
          />
        </div>
        <div>
          <label htmlFor="telefonoFijo" className="text-sm font-medium text-tinta-800">
            Teléfono fijo
          </label>
          <input id="telefonoFijo" className={clasesInput} value={datos.telefonoFijo} onChange={(e) => setDatos((d) => ({ ...d, telefonoFijo: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-tinta-800">
            Email
          </label>
          <input id="email" type="email" className={clasesInput} value={datos.email} onChange={(e) => setDatos((d) => ({ ...d, email: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="direccion" className="text-sm font-medium text-tinta-800">
            Dirección
          </label>
          <input id="direccion" className={clasesInput} value={datos.direccion} onChange={(e) => setDatos((d) => ({ ...d, direccion: e.target.value }))} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-tinta-800">Horarios</p>
        <div className="mt-2 space-y-2">
          {datos.horarios.map((h, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input
                aria-label={`Día ${i + 1}`}
                className={clasesInput}
                value={h.dia}
                onChange={(e) => horario(i, 'dia', e.target.value)}
                placeholder="Ej: Lunes a viernes"
              />
              <input
                aria-label={`Horario ${i + 1}`}
                className={clasesInput}
                value={h.texto}
                onChange={(e) => horario(i, 'texto', e.target.value)}
                placeholder="Ej: 9:00 a 13:00"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="avisoHome" className="text-sm font-medium text-tinta-800">
          Novedad del home
        </label>
        <input
          id="avisoHome"
          className={clasesInput}
          value={datos.avisoHome}
          onChange={(e) => setDatos((d) => ({ ...d, avisoHome: e.target.value }))}
          placeholder="Ej: Nueva chacra cerca del Parque Salus"
        />
      </div>

      <div className="flex items-center gap-4 border-t border-piedra-200 pt-5">
        <button type="submit" className="foco-visible min-h-[44px] bg-sierra-700 px-6 text-sm font-semibold text-piedra-50 hover:bg-sierra-600">
          Guardar cambios
        </button>
        {guardado && <span className="text-sm font-semibold text-sierra-700">Guardado.</span>}
      </div>
    </form>
  )
}
