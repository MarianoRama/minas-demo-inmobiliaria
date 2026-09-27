import { useState, type FormEvent } from 'react'

export function SellRentForm() {
  const [enviado, setEnviado] = useState(false)
  const [tipo, setTipo] = useState('Casa')
  const [zona, setZona] = useState('')
  const [telefono, setTelefono] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Demo sin backend: solo mostramos confirmación.
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-oliva-300 bg-oliva-50 p-8 text-center">
        <p className="text-2xl mb-2">✅</p>
        <h3 className="font-heading text-xl text-oliva-900 mb-2">¡Gracias por tu consulta!</h3>
        <p className="text-oliva-700">
          Esto es una demo: en un sitio real, un asesor de Cerro del Pintado se contactaría con vos
          a la brevedad.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-4 text-sm font-semibold text-oliva-700 underline"
        >
          Enviar otra consulta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tipo" className="text-sm font-medium text-oliva-800">
          Tipo de propiedad
        </label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-md border border-oliva-300 bg-white px-3 py-2.5 text-oliva-900 focus:outline-none focus:ring-2 focus:ring-oliva-500"
        >
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Terreno</option>
          <option>Local comercial</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="zona" className="text-sm font-medium text-oliva-800">
          Zona
        </label>
        <input
          id="zona"
          type="text"
          required
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          placeholder="Ej: Centro, Minas"
          className="rounded-md border border-oliva-300 bg-white px-3 py-2.5 text-oliva-900 placeholder:text-oliva-400 focus:outline-none focus:ring-2 focus:ring-oliva-500"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="telefono" className="text-sm font-medium text-oliva-800">
          Teléfono de contacto
        </label>
        <input
          id="telefono"
          type="tel"
          required
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej: 099 000 000"
          className="rounded-md border border-oliva-300 bg-white px-3 py-2.5 text-oliva-900 placeholder:text-oliva-400 focus:outline-none focus:ring-2 focus:ring-oliva-500"
        />
      </div>

      <button
        type="submit"
        className="sm:col-span-2 rounded-md bg-oliva-700 text-arena-50 font-semibold py-3 hover:bg-oliva-600 transition-colors"
      >
        Solicitar tasación
      </button>
    </form>
  )
}
