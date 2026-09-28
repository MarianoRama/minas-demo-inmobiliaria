import type { Propiedad } from '../types'

export function PropertyCard({ propiedad, onOpenDetail }: { propiedad: Propiedad; onOpenDetail: () => void }) {
  const foto = propiedad.imagenes[0]
  const badgeColor = propiedad.operacion === 'Venta' ? 'bg-oliva-700 text-white' : 'bg-arena-300 text-oliva-900'
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-oliva-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button type="button" onClick={onOpenDetail} className="relative block aspect-[4/3] w-full overflow-hidden text-left focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-oliva-700" aria-label={'Ver detalles de ' + propiedad.titulo}>
        {foto ? <img src={foto.src} alt={'Referencia ilustrativa de ' + propiedad.tipo.toLowerCase()} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <div className="flex h-full items-center justify-center bg-arena-100 text-sm text-oliva-600">Imagen ilustrativa no disponible</div>}
        <span className={'absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ' + badgeColor}>{propiedad.operacion}</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-oliva-800">{propiedad.tipo}</span>
        <span className="absolute bottom-3 left-3 rounded bg-oliva-900/80 px-2 py-1 text-[11px] font-medium text-white">Foto ilustrativa</span>
      </button>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-oliva-600">{propiedad.zona}</p>
        <h3 className="mt-1 font-heading text-xl leading-snug text-oliva-900">{propiedad.titulo}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-oliva-700">
          <span>{propiedad.m2.toLocaleString('es-UY')} m²</span>{propiedad.dormitorios > 0 && <span>{propiedad.dormitorios} {propiedad.dormitorios === 1 ? 'dormitorio' : 'dormitorios'}</span>}
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-oliva-100 pt-4">
          <span className="font-heading text-lg font-semibold text-oliva-800">{propiedad.precio}</span>
          <button type="button" onClick={onOpenDetail} className="shrink-0 rounded-md border border-oliva-300 px-3 py-2 text-sm font-semibold text-oliva-800 transition-colors hover:bg-oliva-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-700">Ver propiedad <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </article>
  )
}
