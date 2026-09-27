import { useMemo, useState } from 'react'
import { propiedades } from '../data/propiedades'
import type { TipoOperacion } from '../types'
import { PropertyCard } from './PropertyCard'

type Filtro = 'Todos' | TipoOperacion

const filtros: Filtro[] = ['Todos', 'Venta', 'Alquiler']

export function Properties() {
  const [filtro, setFiltro] = useState<Filtro>('Todos')

  const filtradas = useMemo(() => {
    if (filtro === 'Todos') return propiedades
    return propiedades.filter((p) => p.operacion === filtro)
  }, [filtro])

  return (
    <section id="propiedades" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-heading text-3xl sm:text-4xl text-oliva-900">Propiedades destacadas</h2>
        <p className="mt-3 text-oliva-600">
          Una selección de ejemplo de casas, apartamentos y terrenos en Minas y su zona.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-10">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium border transition-colors ${
              filtro === f
                ? 'bg-oliva-700 border-oliva-700 text-arena-50'
                : 'bg-white border-oliva-200 text-oliva-700 hover:border-oliva-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((p) => (
          <PropertyCard key={p.id} propiedad={p} />
        ))}
      </div>

      {filtradas.length === 0 && (
        <p className="text-center text-oliva-500 mt-10">No hay propiedades para este filtro.</p>
      )}
    </section>
  )
}
