interface Props {
  lado?: 'izquierda' | 'derecha'
  className?: string
}

/** Trocito de cinta pegada, como en una carpeta de fotos real. Solo decorativo. */
export function CintaEsquina({ lado = 'izquierda', className = '' }: Props) {
  const rotacion = lado === 'izquierda' ? '-8deg' : '6deg'
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-16 ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(250,247,240,0.75), rgba(214,192,150,0.55))',
        boxShadow: '0 1px 2px rgba(32,28,22,0.25)',
        transform: `rotate(${rotacion})`,
      }}
    />
  )
}
