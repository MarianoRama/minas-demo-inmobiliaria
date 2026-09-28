import { Bath, BedDouble, Car, Ruler, Trees, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDatos } from '../data/DatosContext'
import { linkWhatsApp } from '../lib/whatsapp'
import type { Propiedad } from '../types'
import { PropertyArt } from './illustrations/PropertyArt'
import { Sello } from './Sello'

interface Props {
  propiedad: Propiedad | null
  onCerrar: () => void
}

export function PropertyModal({ propiedad, onCerrar }: Props) {
  const { negocio } = useDatos()
  const cerrarRef = useRef<HTMLButtonElement>(null)
  const contenedorRef = useRef<HTMLDivElement>(null)
  const [fotoActiva, setFotoActiva] = useState(0)

  useEffect(() => {
    if (!propiedad) return

    const anterior = document.activeElement as HTMLElement | null
    cerrarRef.current?.focus()
    document.body.style.overflow = 'hidden'

    function alTeclear(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCerrar()
        return
      }
      if (e.key !== 'Tab') return
      const nodo = contenedorRef.current
      if (!nodo) return
      const focosables = nodo.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focosables.length === 0) return
      const primero = focosables[0]
      const ultimo = focosables[focosables.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.body.style.overflow = ''
      anterior?.focus()
    }
  }, [propiedad, onCerrar])

  if (!propiedad) return null

  const mensajeVisita = `Hola. Quiero coordinar una visita a la propiedad ${propiedad.referencia}: ${propiedad.titulo} (${propiedad.zona}). ¿Tenés disponibilidad esta semana?`
  const tieneFotos = propiedad.fotos.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-tinta-900/60 p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Cerrar ficha de la propiedad"
        onClick={onCerrar}
        className="absolute inset-0 cursor-default"
      />
      <div
        ref={contenedorRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-t-2xl border-2 border-tinta-900 bg-piedra-50 shadow-2xl sm:rounded-none"
      >
        <div className="relative aspect-[16/9] shrink-0 bg-piedra-100">
          {tieneFotos ? (
            <img src={propiedad.fotos[fotoActiva]} alt={propiedad.titulo} className="h-full w-full object-cover" />
          ) : (
            <PropertyArt tipo={propiedad.tipo} id={propiedad.id} className="h-full w-full" />
          )}
          {propiedad.estado !== 'Disponible' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Sello estado={propiedad.estado} className="bg-piedra-50/70" />
            </div>
          )}
          <button
            ref={cerrarRef}
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="foco-visible absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-tinta-900 shadow hover:bg-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {tieneFotos && propiedad.fotos.length > 1 && (
          <div className="flex gap-2 border-b border-piedra-200 bg-piedra-100 p-3">
            {propiedad.fotos.map((foto, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFotoActiva(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === fotoActiva}
                className={`foco-visible h-14 w-20 shrink-0 overflow-hidden border-2 ${i === fotoActiva ? 'border-sierra-700' : 'border-transparent'}`}
              >
                <img src={foto} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-5 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-piedra-700">
            {propiedad.referencia} · {propiedad.operacion} · {propiedad.zona}
          </p>
          <h2 id="modal-titulo" className="mt-1 font-display text-2xl text-tinta-900 sm:text-3xl">
            {propiedad.titulo}
          </h2>
          <p className="mt-1 text-sm text-tinta-700/70">{propiedad.direccion}</p>

          <p className="mt-3 font-display text-2xl text-sierra-700">{propiedad.precioTexto}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-piedra-200 py-5 text-sm sm:grid-cols-4">
            <div className="relative flex flex-col items-start gap-1">
              <Ruler className="h-5 w-5 text-sierra-600" aria-hidden="true" />
              <span className="font-display text-lg text-tinta-900">
                {propiedad.m2Terreno ? `${propiedad.m2Terreno.toLocaleString('es-UY')} m²` : `${propiedad.m2} m²`}
              </span>
              <span className="text-xs text-tinta-700/60">{propiedad.m2Terreno ? 'de terreno' : 'construidos'}</span>
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 rotate-[-8deg] font-hand text-sm text-brasa-600 sm:text-base"
              >
                medido in situ
              </span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <BedDouble className="h-5 w-5 text-sierra-600" aria-hidden="true" />
              <span className="font-semibold text-tinta-900">{propiedad.dormitorios || '-'}</span>
              <span className="text-xs text-tinta-700/60">dormitorios</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Bath className="h-5 w-5 text-sierra-600" aria-hidden="true" />
              <span className="font-semibold text-tinta-900">{propiedad.banos || '-'}</span>
              <span className="text-xs text-tinta-700/60">baños</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              {propiedad.garage ? <Car className="h-5 w-5 text-sierra-600" aria-hidden="true" /> : <Trees className="h-5 w-5 text-sierra-600" aria-hidden="true" />}
              <span className="font-semibold text-tinta-900">{propiedad.garage ? 'Sí' : propiedad.patio ? 'Sí' : '-'}</span>
              <span className="text-xs text-tinta-700/60">{propiedad.garage ? 'garaje' : 'patio/parque'}</span>
            </div>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-tinta-700">{propiedad.descripcion}</p>

          {propiedad.caracteristicas.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {propiedad.caracteristicas.map((c) => (
                <li key={c} className="border border-piedra-300 px-2.5 py-1 text-xs font-medium text-tinta-700">
                  {c}
                </li>
              ))}
            </ul>
          )}

          <a
            href={linkWhatsApp(mensajeVisita, negocio.whatsappLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="foco-visible mt-7 flex min-h-[44px] w-full items-center justify-center gap-2 bg-sierra-700 px-6 py-3.5 text-sm font-semibold text-piedra-50 transition-colors hover:bg-sierra-600 sm:w-auto"
          >
            Coordinar visita por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
