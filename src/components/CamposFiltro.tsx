import { banosOpciones, dormitoriosOpciones, type EstadoFiltros, type FiltroOperacion, type FiltroTipo, type OrdenPropiedades } from '../lib/filtros'

const tipos: FiltroTipo[] = ['Todos', 'Casa', 'Apartamento', 'Terreno', 'Chacra', 'Local comercial']

const claseSelect =
  'foco-visible w-full border-2 border-piedra-300 bg-white px-3 py-2.5 text-sm text-tinta-900 transition-colors hover:border-piedra-400'

interface Props {
  filtros: EstadoFiltros
  onCambiar: (cambios: Partial<EstadoFiltros>) => void
  zonas: string[]
  totalFavoritos: number
}

export function CamposFiltro({ filtros, onCambiar, zonas, totalFavoritos }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Operación
          <select
            className={claseSelect}
            value={filtros.operacion}
            onChange={(e) => {
              const operacion = e.target.value as FiltroOperacion
              const moneda = operacion === 'Venta' ? 'USD' : operacion === 'Alquiler' ? 'UYU' : filtros.moneda
              onCambiar({ operacion, moneda })
            }}
          >
            <option>Todas</option>
            <option>Venta</option>
            <option>Alquiler</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Tipo
          <select className={claseSelect} value={filtros.tipo} onChange={(e) => onCambiar({ tipo: e.target.value as FiltroTipo })}>
            {tipos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Zona
          <select className={claseSelect} value={filtros.zona} onChange={(e) => onCambiar({ zona: e.target.value })}>
            <option>Todas</option>
            {zonas.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Dormitorios
          <select
            className={claseSelect}
            value={filtros.dormitorios}
            onChange={(e) => onCambiar({ dormitorios: e.target.value as EstadoFiltros['dormitorios'] })}
          >
            {dormitoriosOpciones.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Baños
          <select className={claseSelect} value={filtros.banos} onChange={(e) => onCambiar({ banos: e.target.value as EstadoFiltros['banos'] })}>
            {banosOpciones.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Ordenar por
          <select className={claseSelect} value={filtros.orden} onChange={(e) => onCambiar({ orden: e.target.value as OrdenPropiedades })}>
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="m2-desc">Más metros primero</option>
          </select>
        </label>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-piedra-700">
          Precio en {filtros.moneda === 'USD' ? 'dólares (U$S)' : 'pesos ($)'}
        </p>
        <div className="mt-1.5 grid grid-cols-2 gap-3">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Mínimo"
            value={filtros.precioMin}
            onChange={(e) => onCambiar({ precioMin: e.target.value })}
            className="foco-visible border-2 border-piedra-300 bg-white px-3 py-2.5 text-sm text-tinta-900 placeholder:text-piedra-400"
          />
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Máximo"
            value={filtros.precioMax}
            onChange={(e) => onCambiar({ precioMax: e.target.value })}
            className="foco-visible border-2 border-piedra-300 bg-white px-3 py-2.5 text-sm text-tinta-900 placeholder:text-piedra-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-piedra-200 pt-4">
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
          <input type="checkbox" checked={filtros.garage} onChange={(e) => onCambiar({ garage: e.target.checked })} className="h-4 w-4" />
          Con garaje
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
          <input
            type="checkbox"
            checked={filtros.soloFavoritos}
            onChange={(e) => onCambiar({ soloFavoritos: e.target.checked })}
            className="h-4 w-4"
          />
          Solo mis favoritos ({totalFavoritos})
        </label>
      </div>
    </div>
  )
}
