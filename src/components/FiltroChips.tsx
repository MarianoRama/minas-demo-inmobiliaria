interface Chip {
  clave: string
  etiqueta: string
  onQuitar: () => void
}

export function FiltroChips({ chips, onLimpiarTodo }: { chips: Chip[]; onLimpiarTodo: () => void }) {
  if (chips.length === 0) return null
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.clave}
          type="button"
          onClick={c.onQuitar}
          className="foco-visible flex min-h-[36px] items-center gap-1.5 border border-sierra-700 bg-sierra-700/10 px-3 text-xs font-semibold text-sierra-800 hover:bg-sierra-700/20"
        >
          {c.etiqueta}
          <span aria-hidden="true">✕</span>
        </button>
      ))}
      <button type="button" onClick={onLimpiarTodo} className="foco-visible min-h-[36px] px-2 text-xs font-semibold text-tinta-700/70 underline underline-offset-4 hover:text-tinta-900">
        Limpiar todo
      </button>
    </div>
  )
}
