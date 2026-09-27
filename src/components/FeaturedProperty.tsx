import { Bath, BedDouble, Car, Ruler } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { linkWhatsApp } from '../lib/whatsapp'
import type { Propiedad } from '../types'
import { PropertyArt } from './illustrations/PropertyArt'

interface Props {
  propiedad: Propiedad
  onAbrir: (propiedad: Propiedad) => void
}

export function FeaturedProperty({ propiedad, onAbrir }: Props) {
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()
  const mensajeVisita = `Hola! Quiero coordinar una visita a la propiedad ${propiedad.referencia} — ${propiedad.titulo} (${propiedad.zona}). ¿Tenés disponibilidad esta semana?`

  return (
    <div ref={nodeRef} className={`${className} mb-10`} style={style}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brasa-500">Propiedad destacada</p>
      <article className="group grid overflow-hidden rounded-lg border border-piedra-200 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-tinta-900/10 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onAbrir(propiedad)}
          aria-haspopup="dialog"
          className="foco-visible relative aspect-[4/3] overflow-hidden bg-piedra-100 sm:aspect-auto"
        >
          {propiedad.foto ? (
            <img
              src={propiedad.foto}
              alt={propiedad.titulo}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
              <PropertyArt tipo={propiedad.tipo} id={propiedad.id} className="h-full w-full" />
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-sm bg-sierra-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-piedra-50">
            {propiedad.operacion}
          </span>
        </button>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-9">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-piedra-500">
            {propiedad.referencia} · {propiedad.zona}
          </p>
          <h3 className="font-display text-2xl leading-snug text-tinta-900 sm:text-3xl">{propiedad.titulo}</h3>
          <p className="text-[15px] leading-relaxed text-tinta-700/80">{propiedad.descripcion}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-tinta-700/80">
            <span className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4" aria-hidden="true" />
              {propiedad.m2Terreno ? `${propiedad.m2Terreno.toLocaleString('es-UY')} m²` : `${propiedad.m2} m²`}
            </span>
            {propiedad.dormitorios > 0 && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" aria-hidden="true" />
                {propiedad.dormitorios}
              </span>
            )}
            {propiedad.banos > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" aria-hidden="true" />
                {propiedad.banos}
              </span>
            )}
            {propiedad.garage && (
              <span className="flex items-center gap-1.5">
                <Car className="h-4 w-4" aria-hidden="true" />
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 border-t border-piedra-100 pt-5">
            <span className="font-display text-2xl text-sierra-700">{propiedad.precioTexto}</span>
            <button
              type="button"
              onClick={() => onAbrir(propiedad)}
              className="foco-visible flex items-center gap-1.5 text-sm font-semibold text-sierra-700 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              Ver ficha completa
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href={linkWhatsApp(mensajeVisita)}
              target="_blank"
              rel="noopener noreferrer"
              className="foco-visible ml-auto flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-sierra-700 px-5 text-sm font-semibold text-piedra-50 transition-colors hover:bg-sierra-600"
            >
              Coordinar visita
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
