import { useRef, useState } from 'react'
import { useDatos } from '../data/DatosContext'
import { ConfirmDialog } from './ConfirmDialog'

export function Herramientas() {
  const { exportar, importar, restaurarEjemplo } = useDatos()
  const inputRef = useRef<HTMLInputElement>(null)
  const [confirmarRestaurar, setConfirmarRestaurar] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function handleImportar(archivo: File | null) {
    if (!archivo) return
    try {
      await importar(archivo)
      setMensaje('Copia cargada correctamente.')
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : 'No se pudo cargar el archivo.')
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-tinta-900">Copia de seguridad</h2>
      <p className="text-sm text-tinta-700/70">
        Los datos viven solo en este navegador. Guardá una copia de vez en cuando por si cambiás de
        celular o borrás el historial.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={exportar}
          className="foco-visible min-h-[44px] flex-1 border-2 border-piedra-300 px-4 text-sm font-semibold text-tinta-800 hover:bg-piedra-100"
        >
          Descargar copia (JSON)
        </button>
        <label className="foco-visible flex min-h-[44px] flex-1 cursor-pointer items-center justify-center border-2 border-piedra-300 px-4 text-sm font-semibold text-tinta-800 hover:bg-piedra-100">
          Cargar copia
          <input ref={inputRef} type="file" accept="application/json" className="sr-only" onChange={(e) => handleImportar(e.target.files?.[0] ?? null)} />
        </label>
        <button
          type="button"
          onClick={() => setConfirmarRestaurar(true)}
          className="foco-visible min-h-[44px] flex-1 border-2 border-brasa-500 px-4 text-sm font-semibold text-brasa-600 hover:bg-brasa-500/10"
        >
          Volver a los datos de ejemplo
        </button>
      </div>

      {mensaje && (
        <p role="status" className="text-sm font-semibold text-sierra-700">
          {mensaje}
        </p>
      )}

      <ConfirmDialog
        abierto={confirmarRestaurar}
        titulo="Volver a los datos de ejemplo"
        mensaje="Se van a borrar todos tus cambios (propiedades y datos del negocio) y se restauran los datos de ejemplo originales. No se puede deshacer."
        textoConfirmar="Restaurar"
        peligro
        onCancelar={() => setConfirmarRestaurar(false)}
        onConfirmar={() => {
          restaurarEjemplo()
          setConfirmarRestaurar(false)
          setMensaje('Se restauraron los datos de ejemplo.')
        }}
      />
    </div>
  )
}
