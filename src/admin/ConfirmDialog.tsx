import { useEffect, useRef } from 'react'

interface Props {
  abierto: boolean
  titulo: string
  mensaje: string
  textoConfirmar?: string
  peligro?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}

export function ConfirmDialog({ abierto, titulo, mensaje, textoConfirmar = 'Confirmar', peligro, onConfirmar, onCancelar }: Props) {
  const botonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!abierto) return
    botonRef.current?.focus()
    function alTeclear(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancelar()
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [abierto, onCancelar])

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-tinta-900/60 p-4">
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-titulo" className="w-full max-w-sm border-2 border-tinta-900 bg-piedra-50 p-6 shadow-[6px_6px_0_var(--color-tinta-900)]">
        <h2 id="confirm-titulo" className="font-display text-xl text-tinta-900">
          {titulo}
        </h2>
        <p className="mt-2 text-sm text-tinta-700/85">{mensaje}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="foco-visible min-h-[44px] flex-1 border-2 border-piedra-300 text-sm font-semibold text-tinta-800 hover:bg-piedra-100"
          >
            Cancelar
          </button>
          <button
            ref={botonRef}
            type="button"
            onClick={onConfirmar}
            className={`foco-visible min-h-[44px] flex-1 text-sm font-semibold text-piedra-50 ${peligro ? 'bg-brasa-600 hover:bg-brasa-500' : 'bg-sierra-700 hover:bg-sierra-600'}`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
