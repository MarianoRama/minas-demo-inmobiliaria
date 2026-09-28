import { useMemo, useRef, useState } from 'react'
import { useDatos } from '../data/DatosContext'
import { useFavoritos } from '../hooks/useFavoritos'
import { useReveal } from '../hooks/useReveal'
import type { Propiedad } from '../types'
import { filtrosVacios, type EstadoFiltros } from '../lib/filtros'
import { CamposFiltro } from './CamposFiltro'
import { FeaturedProperty } from './FeaturedProperty'
import { FiltroChips } from './FiltroChips'
import { FiltroDrawer } from './FiltroDrawer'
import { Paginacion } from './Paginacion'
import { PropertyCard } from './PropertyCard'
import { PropertyModal } from './PropertyModal'

const POR_PAGINA = 9

function cumplePrecio(p: Propiedad, filtros: EstadoFiltros): boolean {
  if (!filtros.precioMin && !filtros.precioMax) return true
  if (p.moneda !== filtros.moneda) return false
  const min = filtros.precioMin ? Number(filtros.precioMin) : undefined
  const max = filtros.precioMax ? Number(filtros.precioMax) : undefined
  if (min !== undefined && p.precio < min) return false
  if (max !== undefined && p.precio > max) return false
  return true
}

export function Properties() {
  const { propiedadesPublicadas, destacada } = useDatos()
  const [filtros, setFiltros] = useState<EstadoFiltros>(filtrosVacios)
  const [pagina, setPagina] = useState(1)
  const [drawerAbierto, setDrawerAbierto] = useState(false)
  const [seleccionada, setSeleccionada] = useState<Propiedad | null>(null)

  const { favoritos, alternar, esFavorito } = useFavoritos()
  const { nodeRef, className, style } = useReveal<HTMLDivElement>()
  const anclaRef = useRef<HTMLDivElement>(null)

  const zonas = useMemo(
    () => Array.from(new Set(propiedadesPublicadas.map((p) => p.zona))).sort(),
    [propiedadesPublicadas],
  )

  function cambiarFiltros(cambios: Partial<EstadoFiltros>) {
    setFiltros((f) => ({ ...f, ...cambios }))
    setPagina(1)
  }

  const filtradasBase = useMemo(() => {
    return propiedadesPublicadas.filter((p) => {
      if (filtros.operacion !== 'Todas' && p.operacion !== filtros.operacion) return false
      if (filtros.tipo !== 'Todos' && p.tipo !== filtros.tipo) return false
      if (filtros.zona !== 'Todas' && p.zona !== filtros.zona) return false
      if (filtros.dormitorios !== 'Cualquiera') {
        if (filtros.dormitorios === '4+' ? p.dormitorios < 4 : p.dormitorios !== Number(filtros.dormitorios)) return false
      }
      if (filtros.banos !== 'Cualquiera') {
        if (filtros.banos === '3+' ? p.banos < 3 : p.banos !== Number(filtros.banos)) return false
      }
      if (filtros.garage && !p.garage) return false
      if (!cumplePrecio(p, filtros)) return false
      if (filtros.soloFavoritos && !favoritos.includes(p.id)) return false
      return true
    })
  }, [propiedadesPublicadas, filtros, favoritos])

  const mostrarDestacada = destacada !== null && filtradasBase.some((p) => p.id === destacada.id)

  const listaOrdenada = useMemo(() => {
    const sinDestacada = filtradasBase.filter((p) => !mostrarDestacada || p.id !== destacada?.id)
    const copia = [...sinDestacada]
    switch (filtros.orden) {
      case 'precio-asc':
        return copia.sort((a, b) => a.precio - b.precio)
      case 'precio-desc':
        return copia.sort((a, b) => b.precio - a.precio)
      case 'm2-desc':
        return copia.sort((a, b) => (b.m2Terreno ?? b.m2) - (a.m2Terreno ?? a.m2))
      default:
        return copia
    }
  }, [filtradasBase, mostrarDestacada, destacada, filtros.orden])

  const totalPaginas = Math.max(1, Math.ceil(listaOrdenada.length / POR_PAGINA))
  const paginaSegura = Math.min(pagina, totalPaginas)
  const inicio = (paginaSegura - 1) * POR_PAGINA
  const paginaActual = listaOrdenada.slice(inicio, inicio + POR_PAGINA)

  function irAPagina(p: number) {
    setPagina(p)
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    anclaRef.current?.scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth', block: 'start' })
  }

  const chips = useMemo(() => {
    const lista: { clave: string; etiqueta: string; onQuitar: () => void }[] = []
    if (filtros.operacion !== 'Todas') lista.push({ clave: 'operacion', etiqueta: filtros.operacion, onQuitar: () => cambiarFiltros({ operacion: 'Todas' }) })
    if (filtros.tipo !== 'Todos') lista.push({ clave: 'tipo', etiqueta: filtros.tipo, onQuitar: () => cambiarFiltros({ tipo: 'Todos' }) })
    if (filtros.zona !== 'Todas') lista.push({ clave: 'zona', etiqueta: filtros.zona, onQuitar: () => cambiarFiltros({ zona: 'Todas' }) })
    if (filtros.dormitorios !== 'Cualquiera')
      lista.push({ clave: 'dormitorios', etiqueta: `${filtros.dormitorios} dorm.`, onQuitar: () => cambiarFiltros({ dormitorios: 'Cualquiera' }) })
    if (filtros.banos !== 'Cualquiera')
      lista.push({ clave: 'banos', etiqueta: `${filtros.banos} baños`, onQuitar: () => cambiarFiltros({ banos: 'Cualquiera' }) })
    if (filtros.garage) lista.push({ clave: 'garage', etiqueta: 'Con garaje', onQuitar: () => cambiarFiltros({ garage: false }) })
    if (filtros.precioMin || filtros.precioMax)
      lista.push({
        clave: 'precio',
        etiqueta: `Precio ${filtros.precioMin || '0'}–${filtros.precioMax || '∞'} ${filtros.moneda}`,
        onQuitar: () => cambiarFiltros({ precioMin: '', precioMax: '' }),
      })
    if (filtros.soloFavoritos) lista.push({ clave: 'favoritos', etiqueta: 'Favoritos', onQuitar: () => cambiarFiltros({ soloFavoritos: false }) })
    return lista
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros])

  return (
    <section id="propiedades" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div ref={anclaRef} className="scroll-mt-20" />
      <div ref={nodeRef} className={className} style={style}>
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brasa-500">Cartera actual</p>
          <h2 className="mt-2 font-display text-3xl text-tinta-900 sm:text-4xl">Propiedades disponibles</h2>
          <p className="mt-3 text-tinta-700/80">
            Casas y apartamentos en el centro, terrenos camino a Villa Serrana, chacras cerca de Parque
            Salus y Ruta 12, y locales sobre calle Treinta y Tres.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerAbierto(true)}
            className="foco-visible flex min-h-[44px] items-center gap-2 border-2 border-tinta-900 bg-piedra-50 px-4 text-sm font-semibold text-tinta-900"
          >
            Filtros{chips.length > 0 ? ` (${chips.length})` : ''}
          </button>
          <p className="text-sm text-tinta-700/70" role="status" aria-live="polite">
            <span className="font-semibold text-tinta-900">{filtradasBase.length}</span>{' '}
            {filtradasBase.length === 1 ? 'propiedad' : 'propiedades'}
          </p>
        </div>

        <div className="mb-8 hidden border-2 border-piedra-200 bg-white p-4 sm:p-6 lg:block">
          <CamposFiltro filtros={filtros} onCambiar={cambiarFiltros} zonas={zonas} totalFavoritos={favoritos.length} />
          <p className="mt-5 border-t border-piedra-100 pt-4 text-sm text-tinta-700/70" role="status" aria-live="polite">
            <span className="font-semibold text-tinta-900">{filtradasBase.length}</span>{' '}
            {filtradasBase.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
          </p>
        </div>

        <FiltroChips chips={chips} onLimpiarTodo={() => cambiarFiltros(filtrosVacios)} />
      </div>

      <FiltroDrawer abierto={drawerAbierto} onCerrar={() => setDrawerAbierto(false)}>
        <CamposFiltro filtros={filtros} onCambiar={cambiarFiltros} zonas={zonas} totalFavoritos={favoritos.length} />
      </FiltroDrawer>

      {mostrarDestacada && destacada && <FeaturedProperty propiedad={destacada} onAbrir={setSeleccionada} />}

      {paginaActual.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-tinta-700/70">
            Mostrando {inicio + 1}–{Math.min(inicio + POR_PAGINA, listaOrdenada.length)} de {listaOrdenada.length}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="grilla-propiedades">
            {paginaActual.map((p, i) => (
              <PropertyCard
                key={p.id}
                propiedad={p}
                esFavorito={esFavorito(p.id)}
                onAlternarFavorito={alternar}
                onAbrir={setSeleccionada}
                retrasoMs={(i % 9) * 60}
              />
            ))}
          </div>
          <Paginacion paginaActual={paginaSegura} totalPaginas={totalPaginas} onCambiar={irAPagina} />
        </>
      ) : (
        <div className="border border-dashed border-piedra-300 py-16 text-center">
          <p className="text-tinta-800">No encontramos propiedades con esos filtros.</p>
          <p className="mt-1 text-sm text-tinta-700/70">Probá sacar algún filtro o ampliar el rango de precio.</p>
          <button
            type="button"
            onClick={() => cambiarFiltros(filtrosVacios)}
            className="foco-visible mt-5 min-h-[44px] border-2 border-tinta-900 px-5 text-sm font-semibold text-tinta-900 hover:bg-piedra-100"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <PropertyModal key={seleccionada?.id ?? 'cerrado'} propiedad={seleccionada} onCerrar={() => setSeleccionada(null)} />
    </section>
  )
}
