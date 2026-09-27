import type { Propiedad } from '../types'

export function PropertyCard({ propiedad }: { propiedad: Propiedad }) {
  const badgeColor =
    propiedad.operacion === 'Venta'
      ? 'bg-oliva-600 text-arena-50'
      : 'bg-arena-400 text-oliva-900'

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-oliva-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={propiedad.imagen}
          alt={propiedad.titulo}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${badgeColor}`}
        >
          {propiedad.operacion}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-oliva-800">
          {propiedad.tipo}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-lg text-oliva-900">{propiedad.titulo}</h3>
        <p className="text-sm text-oliva-600">{propiedad.zona}</p>

        <div className="mt-2 flex items-center gap-4 text-sm text-oliva-700">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            {propiedad.m2} m²
          </span>
          {propiedad.dormitorios > 0 && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10V6a2 2 0 012-2h4a2 2 0 012 2v4M3 10h18M3 10v8M21 10v8M3 18h18" strokeLinecap="round" />
              </svg>
              {propiedad.dormitorios} dorm.
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-oliva-100">
          <span className="font-heading text-lg text-oliva-800">{propiedad.precio}</span>
          <a
            href="#contacto"
            className="text-sm font-semibold text-oliva-700 hover:text-oliva-500"
          >
            Consultar →
          </a>
        </div>
      </div>
    </article>
  )
}
