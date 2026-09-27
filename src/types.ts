export type TipoOperacion = 'Venta' | 'Alquiler'

export type TipoPropiedad = 'Casa' | 'Apartamento' | 'Terreno' | 'Chacra' | 'Local comercial'

export type Moneda = 'USD' | 'UYU'

export interface Propiedad {
  id: number
  referencia: string
  titulo: string
  tipo: TipoPropiedad
  operacion: TipoOperacion
  moneda: Moneda
  precio: number
  precioTexto: string
  m2: number
  m2Terreno?: number
  dormitorios: number
  banos: number
  garage: boolean
  patio: boolean
  zona: string
  direccion: string
  descripcion: string
  destacada?: boolean
  /** Si existe, se muestra la foto real en lugar de la ilustración. */
  foto?: string
}
