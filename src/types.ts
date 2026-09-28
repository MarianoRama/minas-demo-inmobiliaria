export type TipoOperacion = 'Venta' | 'Alquiler'

export type TipoPropiedad = 'Casa' | 'Apartamento' | 'Terreno' | 'Chacra' | 'Local comercial'

export type Moneda = 'USD' | 'UYU'

export type EstadoPropiedad = 'Disponible' | 'Reservada' | 'Vendida' | 'Alquilada'

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
  caracteristicas: string[]
  estado: EstadoPropiedad
  /** Si está en false, no se muestra en el sitio público (pausada desde el panel). */
  publicada: boolean
  /** Hasta 4 fotos reales del cliente. Si está vacío se usa la ilustración propia. */
  fotos: string[]
}

export interface HorarioDia {
  dia: string
  texto: string
}

export interface DatosNegocio {
  nombre: string
  rubro: string
  slogan: string
  whatsapp: string
  whatsappLink: string
  telefonoFijo: string
  email: string
  direccion: string
  horarios: HorarioDia[]
  /** Texto corto que se muestra como novedad/aviso en el home. */
  avisoHome: string
}
