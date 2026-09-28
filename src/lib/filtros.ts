import type { TipoOperacion, TipoPropiedad } from '../types'

export type FiltroOperacion = 'Todas' | TipoOperacion
export type FiltroTipo = 'Todos' | TipoPropiedad
export const dormitoriosOpciones = ['Cualquiera', '0', '1', '2', '3', '4+'] as const
export const banosOpciones = ['Cualquiera', '1', '2', '3+'] as const
export type OrdenPropiedades = 'relevancia' | 'precio-asc' | 'precio-desc' | 'm2-desc'

export interface EstadoFiltros {
  operacion: FiltroOperacion
  tipo: FiltroTipo
  zona: string
  dormitorios: (typeof dormitoriosOpciones)[number]
  banos: (typeof banosOpciones)[number]
  garage: boolean
  precioMin: string
  precioMax: string
  moneda: 'USD' | 'UYU'
  soloFavoritos: boolean
  orden: OrdenPropiedades
}

export const filtrosVacios: EstadoFiltros = {
  operacion: 'Todas',
  tipo: 'Todos',
  zona: 'Todas',
  dormitorios: 'Cualquiera',
  banos: 'Cualquiera',
  garage: false,
  precioMin: '',
  precioMax: '',
  moneda: 'USD',
  soloFavoritos: false,
  orden: 'relevancia',
}
