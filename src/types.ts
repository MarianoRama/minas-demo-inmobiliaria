export type TipoOperacion = 'Venta' | 'Alquiler'
export type TipoPropiedad = 'Casa' | 'Apartamento' | 'Terreno'

export interface Propiedad {
  id: number
  titulo: string
  tipo: TipoPropiedad
  operacion: TipoOperacion
  m2: number
  dormitorios: number
  precio: string
  zona: string
  imagen: string
}
