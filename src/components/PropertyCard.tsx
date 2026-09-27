import { Bath, BedDouble, Car, Ruler } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { linkWhatsApp } from '../lib/whatsapp'
import type { Propiedad } from '../types'
import { PropertyArt } from './illustrations/PropertyArt'

interface Props {
  propiedad: Propiedad
  esFavorito: boolean
  onAlternarFavorito: (id: number) => void
  onAbrir: (propiedad: Propiedad) => void
  retrasoMs?: number
}

export function PropertyCard({ propiedad, esFavorito, onAlternarFavorito, onAbrir, retrasoMs = 0 }: Props) {
  const reveal = useReveal<HTMLDivElement>(retrasoMs)
  const badgeColor =
    propiedad.operacion === 'Venta' ? 'bg-sierra-700 text-piedra-50' : 'bg-brasa-500 text-piedra-50'

  const mensajeVisita = `Hola! Quiero coordinar una visita a la propiedad ${propiedad.referencia} — ${propiedad.titulo} (${propiedad.zona}). ¿Tenés disponibilidad esta semana?`

  return (
    <div ref={reveal.nodeRef} className={reveal.className} style={reveal.style}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-piedra-200 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-tinta-900/10">
        <button
          type="button"
          onClick={() => onAbrir(propiedad)}
          className="foco-visible flex flex-1 flex-col text-left"
          aria-haspopup="dialog"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-piedra-100">
            {propiedad.foto ? (
              <img
                src={propiedad.foto}
                alt={propiedad.titulo}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                <PropertyArt tipo={propiedad.tipo} className="h-full w-full" />
              </div>
            )}
            <span className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeColor}`}>
              {propiedad.operacion}
            </span>
            <span className="absolute right-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-medium text-tinta-700">
              {propiedad.tipo}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-piedra-700">
              {propiedad.referencia} · {propiedad.zona}
            </p>
            <h3 className="font-display text-lg leading-snug text-tinta-900">{propiedad.titulo}</h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-tinta-700/80">
              <span className="flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
                {propiedad.m2Terreno ? `${propiedad.m2Terreno.toLocaleString('es-UY')} m²` : `${propiedad.m2} m²`}
              </span>
              {propiedad.dormitorios > 0 && (
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                  {propiedad.dormitorios}
                </span>
              )}
              {propiedad.banos > 0 && (
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" aria-hidden="true" />
                  {propiedad.banos}
                </span>
              )}
              {propiedad.garage && (
                <span className="flex items-center gap-1">
                  <Car className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              )}
            </div>

            <div className="mt-auto flex items-end justify-between border-t border-piedra-100 pt-3">
              <span className="font-display text-lg text-sierra-700">{propiedad.precioTexto}</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-sierra-700 transition-transform duration-300 group-hover:translate-x-0.5">
                Ver ficha
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </button>

        <div className="flex items-center justify-between gap-2 border-t border-piedra-100 px-4 py-3">
          <button
            type="button"
            onClick={() => onAlternarFavorito(propiedad.id)}
            aria-pressed={esFavorito}
            aria-label={esFavorito ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className="foco-visible flex h-11 w-11 items-center justify-center rounded-md text-piedra-700 transition-colors hover:bg-piedra-100 hover:text-brasa-500"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill={esFavorito ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              style={esFavorito ? { color: 'var(--color-brasa-500)' } : undefined}
            >
              <path
                d="M12 20.5s-7.5-4.6-10-9.2C.5 8.1 2.2 5 5.4 5c1.9 0 3.3 1 4.6 2.6C11.3 6 12.7 5 14.6 5c3.2 0 4.9 3.1 3.4 6.3-2.5 4.6-10 9.2-10 9.2z"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <a
            href={linkWhatsApp(mensajeVisita)}
            target="_blank"
            rel="noopener noreferrer"
            className="foco-visible flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-md bg-sierra-700 px-3 text-sm font-semibold text-piedra-50 transition-colors hover:bg-sierra-600"
          >
            Coordinar visita
          </a>
        </div>
      </article>
    </div>
  )
}
