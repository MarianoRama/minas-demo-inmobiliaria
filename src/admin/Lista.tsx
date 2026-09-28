import { useMemo, useState } from 'react'
import { useDatos } from '../data/DatosContext'
import type { Propiedad } from '../types'
import { PropertyArt } from '../components/illustrations/PropertyArt'
import { ConfirmDialog } from './ConfirmDialog'

const colorEstado: Record<string, string> = {
  Disponible: 'bg-sierra-100 text-sierra-800',
  Reservada: 'bg-piedra-300 text-tinta-900',
  Vendida: 'bg-tinta-900 text-piedra-50',
  Alquilada: 'bg-brasa-500 text-piedra-50',
}

interface Props {
  onEditar: (p: Propiedad) => void
  onNueva: () => void
}

export function Lista({ onEditar, onNueva }: Props) {
  const { propiedades, destacadaId, eliminar, duplicar } = useDatos()
  const [busqueda, setBusqueda] = useState('')
  const [aEliminar, setAEliminar] = useState<Propiedad | null>(null)

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return propiedades
    return propiedades.filter((p) => `${p.referencia} ${p.titulo} ${p.zona} ${p.direccion}`.toLowerCase().includes(q))
  }, [propiedades, busqueda])

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl text-tinta-900">Propiedades ({propiedades.length})</h2>
        <button
          type="button"
          onClick={onNueva}
          className="foco-visible min-h-[44px] bg-sierra-700 px-5 text-sm font-semibold text-piedra-50 hover:bg-sierra-600"
        >
          + Agregar propiedad
        </button>
      </div>

      <input
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por referencia, título, zona o dirección…"
        aria-label="Buscar propiedad"
        className="foco-visible mt-4 w-full border-2 border-piedra-300 bg-white px-3 py-2.5 text-tinta-900 placeholder:text-piedra-400"
      />

      <ul className="mt-4 divide-y divide-piedra-200 border-y border-piedra-200">
        {filtradas.map((p) => (
          <li key={p.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
            <div className="h-16 w-24 shrink-0 overflow-hidden border border-piedra-300 bg-piedra-100">
              {p.fotos[0] ? (
                <img src={p.fotos[0]} alt="" className="h-full w-full object-cover" />
              ) : (
                <PropertyArt tipo={p.tipo} id={p.id} className="h-full w-full" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-piedra-600">
                {p.referencia} · {p.zona}
                {p.id === destacadaId && <span className="ml-2 text-brasa-600">★ destacada</span>}
                {!p.publicada && <span className="ml-2 text-tinta-700/60">· pausada</span>}
              </p>
              <p className="truncate font-display text-base text-tinta-900">{p.titulo}</p>
              <p className="text-sm text-tinta-700/70">{p.precioTexto}</p>
            </div>

            <span className={`w-fit rounded-sm px-2 py-1 text-[11px] font-semibold ${colorEstado[p.estado]}`}>{p.estado}</span>

            <div className="flex gap-2 sm:shrink-0">
              <button
                type="button"
                onClick={() => onEditar(p)}
                className="foco-visible min-h-[44px] flex-1 border-2 border-piedra-300 px-3 text-sm font-semibold text-tinta-800 hover:bg-piedra-100 sm:flex-none"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => duplicar(p.id)}
                className="foco-visible min-h-[44px] flex-1 border-2 border-piedra-300 px-3 text-sm font-semibold text-tinta-800 hover:bg-piedra-100 sm:flex-none"
              >
                Duplicar
              </button>
              <button
                type="button"
                onClick={() => setAEliminar(p)}
                className="foco-visible min-h-[44px] flex-1 border-2 border-brasa-500 px-3 text-sm font-semibold text-brasa-600 hover:bg-brasa-500/10 sm:flex-none"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
        {filtradas.length === 0 && <li className="py-10 text-center text-tinta-700/70">No hay propiedades que coincidan con la búsqueda.</li>}
      </ul>

      <ConfirmDialog
        abierto={aEliminar !== null}
        titulo="Eliminar propiedad"
        mensaje={aEliminar ? `¿Eliminar "${aEliminar.titulo}" (${aEliminar.referencia})? No se puede deshacer.` : ''}
        textoConfirmar="Eliminar"
        peligro
        onCancelar={() => setAEliminar(null)}
        onConfirmar={() => {
          if (aEliminar) eliminar(aEliminar.id)
          setAEliminar(null)
        }}
      />
    </div>
  )
}
