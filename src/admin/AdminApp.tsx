import { useState } from 'react'
import { useDatos } from '../data/DatosContext'
import type { Propiedad } from '../types'
import { SierraMark } from '../components/illustrations/SierraMark'
import { Formulario } from './Formulario'
import { Herramientas } from './Herramientas'
import { Lista } from './Lista'
import { Login } from './Login'
import { NegocioForm } from './NegocioForm'
import { useSesionAdmin } from './useSesionAdmin'

type Vista = 'lista' | 'formulario' | 'negocio' | 'herramientas'

const pestañas: { id: Vista; etiqueta: string }[] = [
  { id: 'lista', etiqueta: 'Propiedades' },
  { id: 'negocio', etiqueta: 'Datos del negocio' },
  { id: 'herramientas', etiqueta: 'Copia y respaldo' },
]

export function AdminApp() {
  const { autenticado, salir } = useSesionAdmin()
  const [autenticadoLocal, setAutenticadoLocal] = useState(autenticado)
  const { negocio, crear, actualizar, marcarDestacada, destacadaId, avisoStorage, soloLecturaSheets } = useDatos()
  const [vista, setVista] = useState<Vista>('lista')
  const [editando, setEditando] = useState<Propiedad | null>(null)

  if (!autenticadoLocal) {
    return <Login onIngresar={() => setAutenticadoLocal(true)} />
  }

  function abrirNueva() {
    setEditando(null)
    setVista('formulario')
  }

  function abrirEditar(p: Propiedad) {
    setEditando(p)
    setVista('formulario')
  }

  function guardar(datos: Omit<Propiedad, 'id'>, destacada: boolean) {
    if (editando) {
      actualizar(editando.id, datos)
      marcarDestacada(destacada ? editando.id : destacadaId === editando.id ? null : destacadaId)
    } else {
      const nueva = crear(datos)
      if (destacada) marcarDestacada(nueva.id)
    }
    setVista('lista')
  }

  return (
    <div className="min-h-screen bg-piedra-100">
      <div className="bg-tinta-900 px-4 py-2 text-center text-xs font-semibold text-piedra-100 sm:text-sm">
        Modo demostración: los cambios se guardan solo en este navegador.
      </div>

      <header className="sticky top-0 z-30 border-b-2 border-tinta-900 bg-piedra-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <SierraMark className="h-8 w-8" />
            <div className="leading-tight">
              <p className="font-display text-base text-sierra-800">{negocio.nombre}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-piedra-700">Panel del dueño</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#/" className="foco-visible text-sm font-semibold text-sierra-700 underline underline-offset-4">
              Ver sitio
            </a>
            <button type="button" onClick={salir} className="foco-visible text-sm font-semibold text-tinta-700/70 hover:text-tinta-900">
              Salir
            </button>
          </div>
        </div>

        {vista !== 'formulario' && (
          <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6" aria-label="Secciones del panel">
            {pestañas.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setVista(t.id)}
                aria-current={vista === t.id ? 'page' : undefined}
                className={`min-h-[40px] shrink-0 whitespace-nowrap border-2 px-4 text-sm font-semibold ${
                  vista === t.id ? 'border-sierra-700 bg-sierra-700 text-piedra-50' : 'border-piedra-300 text-tinta-800 hover:bg-piedra-100'
                }`}
              >
                {t.etiqueta}
              </button>
            ))}
          </nav>
        )}
      </header>

      {avisoStorage && (
        <div role="alert" className="mx-auto mt-4 max-w-4xl border-2 border-brasa-500 bg-brasa-500/10 px-4 py-3 text-sm text-brasa-700 sm:mx-auto sm:px-4">
          {avisoStorage}
        </div>
      )}
      {soloLecturaSheets && (
        <div className="mx-auto mt-4 max-w-4xl border-2 border-piedra-400 bg-piedra-200/60 px-4 py-3 text-sm text-tinta-800">
          Estos datos se editan en tu planilla de Google. Este panel solo permite cambiar los datos del
          negocio.
        </div>
      )}

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {vista === 'lista' && !soloLecturaSheets && <Lista onEditar={abrirEditar} onNueva={abrirNueva} />}
        {vista === 'lista' && soloLecturaSheets && (
          <p className="text-tinta-700/80">La lista de propiedades se administra desde Google Sheets.</p>
        )}
        {vista === 'formulario' && (
          <div>
            <button
              type="button"
              onClick={() => setVista('lista')}
              className="foco-visible mb-4 text-sm font-semibold text-sierra-700 underline underline-offset-4"
            >
              ← Volver a la lista
            </button>
            <h1 className="mb-5 font-display text-2xl text-tinta-900">{editando ? 'Editar propiedad' : 'Nueva propiedad'}</h1>
            <Formulario propiedad={editando ?? undefined} esDestacada={editando ? editando.id === destacadaId : false} onGuardar={guardar} onCancelar={() => setVista('lista')} />
          </div>
        )}
        {vista === 'negocio' && <NegocioForm />}
        {vista === 'herramientas' && <Herramientas />}
      </main>
    </div>
  )
}
