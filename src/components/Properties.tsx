import { useMemo, useState } from 'react'
import { propiedades } from '../data/propiedades'
import { useFavoritos } from '../hooks/useFavoritos'
import { useReveal } from '../hooks/useReveal'
import { cumpleRango, rangosPrecio } from '../lib/precio'
import type { TipoOperacion, TipoPropiedad } from '../types'
import { FeaturedProperty } from './FeaturedProperty'
import { PropertyCard } from './PropertyCard'
import { PropertyModal } from './PropertyModal'

const propiedadDestacada = propiedades.find((p) => p.id === 8) ?? propiedades[0]

type FiltroOperacion = 'Todas' | TipoOperacion
type FiltroTipo = 'Todos' | TipoPropiedad

const tipos: FiltroTipo[] = ['Todos', 'Casa', 'Apartamento', 'Terreno', 'Chacra', 'Local comercial']
const dormitoriosOpciones = ['Cualquiera', '0', '1', '2', '3', '4+'] as const

const claseSelect =
  'foco-visible w-full rounded-md border border-piedra-300 bg-white px-3 py-2.5 text-sm text-tinta-900 transition-colors hover:border-piedra-400'

export function Properties() {
  const [operacion, setOperacion] = useState<FiltroOperacion>('Todas')
  const [tipo, setTipo] = useState<FiltroTipo>('Todos')
  const [dormitorios, setDormitorios] = useState<(typeof dormitoriosOpciones)[number]>('Cualquiera')
  const [rangoId, setRangoId] = useState(rangosPrecio[0].id)
  const [soloFavoritos, setSoloFavoritos] = useState(false)
  const [seleccionada, setSeleccionada] = useState<(typeof propiedades)[number] | null>(null)

  const { favoritos, alternar, esFavorito } = useFavoritos()
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()

  const rango = rangosPrecio.find((r) => r.id === rangoId) ?? rangosPrecio[0]

  const filtradas = useMemo(() => {
    return propiedades.filter((p) => {
      if (operacion !== 'Todas' && p.operacion !== operacion) return false
      if (tipo !== 'Todos' && p.tipo !== tipo) return false
      if (dormitorios !== 'Cualquiera') {
        if (dormitorios === '4+' ? p.dormitorios < 4 : p.dormitorios !== Number(dormitorios)) return false
      }
      if (!cumpleRango(p, rango)) return false
      if (soloFavoritos && !favoritos.includes(p.id)) return false
      return true
    })
  }, [operacion, tipo, dormitorios, rango, soloFavoritos, favoritos])

  return (
    <section id="propiedades" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div ref={nodeRef} className={className} style={style}>
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brasa-500">Cartera actual</p>
          <h2 className="mt-2 font-display text-3xl text-tinta-900 sm:text-4xl">Propiedades disponibles</h2>
          <p className="mt-3 text-tinta-700/80">
            Casas y apartamentos en el centro, terrenos camino a Villa Serrana, chacras cerca de
            Parque Salus y Ruta 12, y locales sobre calle Treinta y Tres. Filtrá por lo que
            buscás.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-piedra-200 bg-white p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
              Operación
              <select className={claseSelect} value={operacion} onChange={(e) => setOperacion(e.target.value as FiltroOperacion)}>
                <option>Todas</option>
                <option>Venta</option>
                <option>Alquiler</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
              Tipo
              <select className={claseSelect} value={tipo} onChange={(e) => setTipo(e.target.value as FiltroTipo)}>
                {tipos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
              Dormitorios
              <select
                className={claseSelect}
                value={dormitorios}
                onChange={(e) => setDormitorios(e.target.value as (typeof dormitoriosOpciones)[number])}
              >
                {dormitoriosOpciones.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
              Precio
              <select className={claseSelect} value={rangoId} onChange={(e) => setRangoId(e.target.value)}>
                {rangosPrecio.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-piedra-100 pt-4">
            <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
              <input
                type="checkbox"
                checked={soloFavoritos}
                onChange={(e) => setSoloFavoritos(e.target.checked)}
                className="h-4 w-4 rounded border-piedra-400 text-brasa-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brasa-500"
              />
              Ver solo mis favoritos ({favoritos.length})
            </label>

            <p className="text-sm text-tinta-700/70" role="status" aria-live="polite">
              <span className="font-semibold text-tinta-900">{filtradas.length}</span>{' '}
              {filtradas.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
            </p>
          </div>
        </div>
      </div>

      <FeaturedProperty propiedad={propiedadDestacada} onAbrir={setSeleccionada} />

      {filtradas.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="grilla-propiedades">
          {filtradas.map((p, i) => (
            <PropertyCard
              key={p.id}
              propiedad={p}
              esFavorito={esFavorito(p.id)}
              onAlternarFavorito={alternar}
              onAbrir={setSeleccionada}
              retrasoMs={(i % 6) * 70}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-piedra-300 py-16 text-center text-tinta-700/70">
          No hay propiedades que coincidan con esos filtros. Probá ampliar el rango de precio o
          cambiar el tipo.
        </p>
      )}

      <PropertyModal propiedad={seleccionada} onCerrar={() => setSeleccionada(null)} />
    </section>
  )
}
