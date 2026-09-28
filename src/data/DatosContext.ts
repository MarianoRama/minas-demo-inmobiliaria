import { createContext, useContext } from 'react'
import type { DatosNegocio, Propiedad } from '../types'

export interface DatosContexto {
  propiedades: Propiedad[]
  propiedadesPublicadas: Propiedad[]
  negocio: DatosNegocio
  destacadaId: number | null
  destacada: Propiedad | null
  zonas: string[]
  cargandoSheets: boolean
  errorSheets: string | null
  avisoStorage: string | null
  soloLecturaSheets: boolean
  crear: (p: Omit<Propiedad, 'id'>) => Propiedad
  actualizar: (id: number, cambios: Partial<Propiedad>) => void
  eliminar: (id: number) => void
  duplicar: (id: number) => void
  marcarDestacada: (id: number | null) => void
  actualizarNegocio: (cambios: Partial<DatosNegocio>) => void
  restaurarEjemplo: () => void
  exportar: () => void
  importar: (archivo: File) => Promise<void>
}

export const Contexto = createContext<DatosContexto | null>(null)

export function useDatos(): DatosContexto {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useDatos debe usarse dentro de <DatosProvider>')
  return ctx
}
