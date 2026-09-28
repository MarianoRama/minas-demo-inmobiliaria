import { useMemo, useState } from 'react'
import { propiedades } from '../data/propiedades'
import type { Propiedad, TipoOperacion, TipoPropiedad } from '../types'
import { PropertyCard } from './PropertyCard'
import { PropertyDetailsDialog } from './PropertyDetailsDialog'

type OperacionFiltro = 'Todas' | TipoOperacion
type Orden = 'sugerido' | 'precio-asc' | 'precio-desc' | 'superficie' | 'dormitorios'
const tipos: TipoPropiedad[] = ['Casa', 'Apartamento', 'Terreno']
const control = 'min-w-0 rounded-md border border-oliva-200 bg-white px-3 py-2 text-sm text-oliva-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-700'

export function Properties() {
  const [operacion, setOperacion] = useState<OperacionFiltro>('Todas')
  const [tipo, setTipo] = useState<TipoPropiedad | 'Todos'>('Todos')
  const [zona, setZona] = useState('Todas')
  const [dormitorios, setDormitorios] = useState('Todos')
  const [precioMin, setPrecioMin] = useState('')
  const [precioMax, setPrecioMax] = useState('')
  const [orden, setOrden] = useState<Orden>('sugerido')
  const [detalle, setDetalle] = useState<Propiedad | null>(null)
  const zonas = useMemo(() => [...new Set(propiedades.map((p) => p.zona))].sort(), [])
  const puedeFiltrarPrecio = operacion !== 'Todas'

  const filtradas = useMemo(() => {
    const min = precioMin === '' ? undefined : Number(precioMin)
    const max = precioMax === '' ? undefined : Number(precioMax)
    const resultado = propiedades.filter((p) => {
      const precio = p.precioValor
      return (operacion === 'Todas' || p.operacion === operacion) &&
        (tipo === 'Todos' || p.tipo === tipo) &&
        (zona === 'Todas' || p.zona === zona) &&
        (dormitorios === 'Todos' || (dormitorios === '4+' ? p.dormitorios >= 4 : p.dormitorios === Number(dormitorios))) &&
        (!puedeFiltrarPrecio || ((min === undefined || precio >= min) && (max === undefined || precio <= max)))
    })
    return resultado.sort((a, b) => {
      if (orden === 'precio-asc') return a.precioValor - b.precioValor
      if (orden === 'precio-desc') return b.precioValor - a.precioValor
      if (orden === 'superficie') return b.m2 - a.m2
      if (orden === 'dormitorios') return b.dormitorios - a.dormitorios
      return a.id - b.id
    })
  }, [operacion, tipo, zona, dormitorios, precioMin, precioMax, orden, puedeFiltrarPrecio])

  function limpiarFiltros() {
    setOperacion('Todas'); setTipo('Todos'); setZona('Todas'); setDormitorios('Todos')
    setPrecioMin(''); setPrecioMax(''); setOrden('sugerido')
  }

  return (
    <section id="propiedades" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-oliva-600">Encontrá tu lugar</p>
          <h2 className="font-heading text-3xl text-oliva-900 sm:text-4xl">Propiedades destacadas</h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-oliva-600">Casas, apartamentos y terrenos de ejemplo en Minas y alrededores. Las fotos son referencias ilustrativas.</p>
      </div>

      <div className="mb-7 rounded-xl border border-oliva-200 bg-arena-100/70 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-1.5 text-xs font-semibold text-oliva-700">Operación
            <select className={control} value={operacion} onChange={(e) => { setOperacion(e.target.value as OperacionFiltro); setPrecioMin(''); setPrecioMax(''); setOrden('sugerido') }}>
              <option value="Todas">Venta y alquiler</option><option value="Venta">Venta</option><option value="Alquiler">Alquiler</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-oliva-700">Tipo de propiedad
            <select className={control} value={tipo} onChange={(e) => setTipo(e.target.value as TipoPropiedad | 'Todos')}>
              <option value="Todos">Todos los tipos</option>{tipos.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-oliva-700">Zona
            <select className={control} value={zona} onChange={(e) => setZona(e.target.value)}>
              <option value="Todas">Todas las zonas</option>{zonas.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-oliva-700">Dormitorios
            <select className={control} value={dormitorios} onChange={(e) => setDormitorios(e.target.value)}>
              <option value="Todos">Cualquier cantidad</option><option value="0">Sin dormitorios</option><option value="1">1 dormitorio</option><option value="2">2 dormitorios</option><option value="3">3 dormitorios</option><option value="4+">4 o más</option>
            </select>
          </label>
          <fieldset className="grid gap-1.5 text-xs font-semibold text-oliva-700 sm:col-span-2">
            <legend className="mb-1">Rango de precio {puedeFiltrarPrecio ? (operacion === 'Venta' ? '(USD)' : '($U por mes)') : ''}</legend>
            <div className="grid grid-cols-2 gap-2">
              <label className="sr-only" htmlFor="precio-min">Precio mínimo</label>
              <input id="precio-min" className={control} type="number" min="0" inputMode="numeric" placeholder="Desde" value={precioMin} disabled={!puedeFiltrarPrecio} onChange={(e) => setPrecioMin(e.target.value)} />
              <label className="sr-only" htmlFor="precio-max">Precio máximo</label>
              <input id="precio-max" className={control} type="number" min="0" inputMode="numeric" placeholder="Hasta" value={precioMax} disabled={!puedeFiltrarPrecio} onChange={(e) => setPrecioMax(e.target.value)} />
            </div>
            {!puedeFiltrarPrecio && <span className="font-normal text-oliva-600">Elegí una operación para comparar precios en la misma moneda.</span>}
          </fieldset>
          <label className="grid gap-1.5 text-xs font-semibold text-oliva-700 sm:col-span-2">Ordenar por
            <select className={control} value={orden} onChange={(e) => setOrden(e.target.value as Orden)}>
              <option value="sugerido">Orden sugerido</option>
              {puedeFiltrarPrecio && <><option value="precio-asc">Menor precio</option><option value="precio-desc">Mayor precio</option></>}
              <option value="superficie">Mayor superficie</option><option value="dormitorios">Más dormitorios</option>
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-oliva-200 pt-3">
          <p className="text-sm text-oliva-700" aria-live="polite">{filtradas.length} {filtradas.length === 1 ? 'resultado' : 'resultados'}</p>
          <button type="button" onClick={limpiarFiltros} className="rounded px-2 py-1 text-sm font-semibold text-oliva-700 underline underline-offset-4 hover:text-oliva-900 focus-visible:outline-2 focus-visible:outline-oliva-700">Limpiar filtros</button>
        </div>
      </div>

      {filtradas.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((p) => <PropertyCard key={p.id} propiedad={p} onOpenDetail={() => setDetalle(p)} />)}
      </div> : <div className="rounded-xl border border-dashed border-oliva-300 bg-white px-5 py-10 text-center">
        <p className="font-heading text-xl text-oliva-900">No encontramos propiedades con esos filtros.</p>
        <p className="mt-2 text-sm text-oliva-600">Probá ampliar la zona o el rango de precio.</p>
        <button type="button" onClick={limpiarFiltros} className="mt-4 rounded-md bg-oliva-700 px-4 py-2 text-sm font-semibold text-white hover:bg-oliva-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-700">Ver todas</button>
      </div>}
      {detalle && <PropertyDetailsDialog propiedad={detalle} onClose={() => setDetalle(null)} />}
    </section>
  )
}
