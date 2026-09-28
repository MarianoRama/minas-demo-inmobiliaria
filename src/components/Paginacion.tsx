interface Props {
  paginaActual: number
  totalPaginas: number
  onCambiar: (pagina: number) => void
}

export function Paginacion({ paginaActual, totalPaginas, onCambiar }: Props) {
  if (totalPaginas <= 1) return null

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <nav aria-label="Paginación de propiedades" className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onCambiar(Math.max(1, paginaActual - 1))}
        disabled={paginaActual === 1}
        aria-label="Página anterior"
        className="foco-visible flex h-11 w-11 items-center justify-center border-2 border-piedra-300 text-tinta-800 disabled:opacity-30"
      >
        ‹
      </button>
      {paginas.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onCambiar(p)}
          aria-current={p === paginaActual ? 'page' : undefined}
          className={`foco-visible flex h-11 w-11 items-center justify-center text-sm font-semibold ${
            p === paginaActual ? 'border-2 border-sierra-700 bg-sierra-700 text-piedra-50' : 'border-2 border-piedra-300 text-tinta-800 hover:bg-piedra-100'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onCambiar(Math.min(totalPaginas, paginaActual + 1))}
        disabled={paginaActual === totalPaginas}
        aria-label="Página siguiente"
        className="foco-visible flex h-11 w-11 items-center justify-center border-2 border-piedra-300 text-tinta-800 disabled:opacity-30"
      >
        ›
      </button>
    </nav>
  )
}
