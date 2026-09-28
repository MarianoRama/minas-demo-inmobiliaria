import { useRef, useState } from 'react'
import { redimensionarImagen } from '../lib/imagen'

interface Props {
  fotos: string[]
  onChange: (fotos: string[]) => void
  max?: number
}

export function PhotoInput({ fotos, onChange, max = 4 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleArchivos(lista: FileList | null) {
    if (!lista || lista.length === 0) return
    setError(null)
    setProcesando(true)
    try {
      const disponibles = max - fotos.length
      const archivos = Array.from(lista).slice(0, Math.max(disponibles, 0))
      const nuevas = await Promise.all(archivos.map((a) => redimensionarImagen(a)))
      onChange([...fotos, ...nuevas])
    } catch {
      setError('No se pudo procesar la foto. Probá con otra imagen.')
    } finally {
      setProcesando(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function quitar(i: number) {
    onChange(fotos.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {fotos.map((foto, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden border-2 border-piedra-300 bg-piedra-100">
            <img src={foto} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => quitar(i)}
              aria-label={`Quitar foto ${i + 1}`}
              className="foco-visible absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-tinta-900/80 text-piedra-50"
            >
              ×
            </button>
          </div>
        ))}
        {fotos.length < max && (
          <label className="foco-visible flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 border-2 border-dashed border-piedra-400 text-center text-xs font-medium text-piedra-700 hover:bg-piedra-100">
            {procesando ? (
              <span>Procesando…</span>
            ) : (
              <>
                <span className="text-2xl leading-none">+</span>
                <span>Agregar foto</span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              className="sr-only"
              onChange={(e) => handleArchivos(e.target.files)}
              disabled={procesando}
            />
          </label>
        )}
      </div>
      <p className="mt-2 text-xs text-tinta-700/70">
        Hasta {max} fotos. Se achican solas a un tamaño liviano para que la página cargue rápido.
      </p>
      {error && (
        <p role="alert" className="mt-1 text-xs font-semibold text-brasa-600">
          {error}
        </p>
      )}
    </div>
  )
}
