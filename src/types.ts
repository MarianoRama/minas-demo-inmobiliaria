export type TipoOperacion = 'Venta' | 'Alquiler'
export type TipoPropiedad = 'Casa' | 'Apartamento' | 'Terreno'

export interface FotoPropiedad {
  src: string
  credito: string
}

export interface Propiedad {
  id: number
  titulo: string
  tipo: TipoPropiedad
  operacion: TipoOperacion
  m2: number
  dormitorios: number
  precio: string
  precioValor: number
  zona: string
  imagenes: FotoPropiedad[]
}
