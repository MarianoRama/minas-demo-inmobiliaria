import type { EstadoPropiedad } from '../types'

const texto: Partial<Record<EstadoPropiedad, string>> = {
  Reservada: 'RESERVADA',
  Vendida: 'VENDIDA',
  Alquilada: 'ALQUILADA',
}

/** Sello de goma cruzado, como el que se usaría en una carpeta de inmobiliaria real. */
export function Sello({ estado, className = '' }: { estado: EstadoPropiedad; className?: string }) {
  const palabra = texto[estado]
  if (!palabra) return null
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none border-[3px] border-brasa-600/90 px-3 py-1 text-center font-display text-lg font-semibold uppercase tracking-[0.12em] text-brasa-600/90 ${className}`}
      style={{ transform: 'rotate(-9deg)', mixBlendMode: 'multiply' }}
    >
      {palabra}
    </div>
  )
}
