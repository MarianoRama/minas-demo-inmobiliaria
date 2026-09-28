import { useEffect } from 'react'

export function FiltroDrawer({ abierto, onCerrar, children }: { abierto: boolean; onCerrar: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!abierto) return
    document.body.style.overflow = 'hidden'
    function alTeclear(e: KeyboardEvent) {
      if (e.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', alTeclear)
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:hidden">
      <button type="button" aria-label="Cerrar filtros" onClick={onCerrar} className="absolute inset-0 bg-tinta-900/60" />
      <div role="dialog" aria-modal="true" aria-label="Filtros" className="relative flex max-h-[88vh] w-full flex-col overflow-y-auto rounded-t-2xl border-t-2 border-tinta-900 bg-piedra-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-tinta-900">Filtros</h2>
          <button type="button" onClick={onCerrar} aria-label="Cerrar" className="foco-visible flex h-10 w-10 items-center justify-center text-2xl text-tinta-700">
            ×
          </button>
        </div>
        {children}
        <button
          type="button"
          onClick={onCerrar}
          className="foco-visible sticky bottom-0 mt-6 min-h-[48px] bg-sierra-700 text-sm font-semibold text-piedra-50 hover:bg-sierra-600"
        >
          Ver resultados
        </button>
      </div>
    </div>
  )
}
