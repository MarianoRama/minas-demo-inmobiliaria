import { CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { linkWhatsApp } from '../lib/whatsapp'

export function SellRentForm() {
  const [tipo, setTipo] = useState('Casa')
  const [operacion, setOperacion] = useState('Vender')
  const [zona, setZona] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [link, setLink] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const mensaje = `Hola! Soy ${nombre} y quiero ${operacion === 'Vender' ? 'vender' : 'alquilar'} un/a ${tipo.toLowerCase()} en zona ${zona}. Mi teléfono es ${telefono}. ¿Me pueden ayudar con una tasación?`
    const url = linkWhatsApp(mensaje)
    setLink(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (link) {
    return (
      <div className="rounded-lg border border-sierra-200 bg-sierra-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sierra-600" aria-hidden="true" />
        <h3 className="mt-3 font-display text-xl text-tinta-900">Abrimos WhatsApp con tu mensaje</h3>
        <p className="mt-2 text-sm text-tinta-700/80">
          Si no se abrió automáticamente, tocá el enlace de abajo. Esto es una demo: no se guarda
          ni se envía ningún dato a un servidor.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="foco-visible mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md bg-sierra-700 px-5 text-sm font-semibold text-piedra-50 hover:bg-sierra-600"
        >
          Abrir WhatsApp
        </a>
        <div>
          <button
            type="button"
            onClick={() => setLink(null)}
            className="foco-visible mt-4 text-sm font-semibold text-tinta-700 underline underline-offset-4"
          >
            Cargar otra consulta
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="operacion" className="text-sm font-medium text-tinta-800">
          Quiero
        </label>
        <select
          id="operacion"
          value={operacion}
          onChange={(e) => setOperacion(e.target.value)}
          className="foco-visible rounded-md border border-piedra-300 bg-white px-3 py-2.5 text-tinta-900"
        >
          <option>Vender</option>
          <option>Alquilar</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tipo" className="text-sm font-medium text-tinta-800">
          Tipo de propiedad
        </label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="foco-visible rounded-md border border-piedra-300 bg-white px-3 py-2.5 text-tinta-900"
        >
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Terreno</option>
          <option>Chacra</option>
          <option>Local comercial</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="zona" className="text-sm font-medium text-tinta-800">
          Zona
        </label>
        <input
          id="zona"
          type="text"
          required
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          placeholder="Ej: Centro, camino a Villa Serrana"
          className="foco-visible rounded-md border border-piedra-300 bg-white px-3 py-2.5 text-tinta-900 placeholder:text-piedra-400"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="text-sm font-medium text-tinta-800">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className="foco-visible rounded-md border border-piedra-300 bg-white px-3 py-2.5 text-tinta-900 placeholder:text-piedra-400"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="telefono" className="text-sm font-medium text-tinta-800">
          Teléfono de contacto
        </label>
        <input
          id="telefono"
          type="tel"
          required
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej: 099 000 000"
          className="foco-visible rounded-md border border-piedra-300 bg-white px-3 py-2.5 text-tinta-900 placeholder:text-piedra-400"
        />
      </div>

      <button
        type="submit"
        className="foco-visible sm:col-span-2 min-h-[44px] rounded-md bg-sierra-700 py-3 font-semibold text-piedra-50 transition-colors hover:bg-sierra-600"
      >
        Pedir tasación por WhatsApp
      </button>
    </form>
  )
}
