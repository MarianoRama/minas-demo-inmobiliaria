import type { Propiedad, TipoOperacion, TipoPropiedad } from '../types'
import inventario from './properties.json'

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor)
}

const tipos: TipoPropiedad[] = ['Casa', 'Apartamento', 'Terreno']
const operaciones: TipoOperacion[] = ['Venta', 'Alquiler']

function esTipoPropiedad(valor: unknown): valor is TipoPropiedad {
  return tipos.some((tipo) => tipo === valor)
}

function esOperacion(valor: unknown): valor is TipoOperacion {
  return operaciones.some((operacion) => operacion === valor)
}

function esTexto(valor: unknown): valor is string {
  return typeof valor === 'string' && valor.trim().length > 0
}

function esImagen(valor: unknown): valor is Propiedad['imagenes'][number] {
  if (!esRegistro(valor) || !esTexto(valor.src) || !esTexto(valor.credito)) return false
  return valor.src.startsWith('/') || /^https:\/\/\S+$/i.test(valor.src)
}

const datos: unknown = inventario
export const propiedades: Propiedad[] = esRegistro(datos) && Array.isArray(datos.propiedades)
  ? datos.propiedades.flatMap((valor): Propiedad[] => {
      if (!esRegistro(valor)) return []
      if (
        typeof valor.id !== 'number' || !Number.isInteger(valor.id) || valor.id < 1 ||
        !esTexto(valor.titulo) ||
        !esTipoPropiedad(valor.tipo) || !esOperacion(valor.operacion) ||
        typeof valor.m2 !== 'number' || !Number.isFinite(valor.m2) || valor.m2 < 0 ||
        typeof valor.dormitorios !== 'number' || !Number.isInteger(valor.dormitorios) || valor.dormitorios < 0 ||
        !esTexto(valor.precio) || typeof valor.precioValor !== 'number' || !Number.isFinite(valor.precioValor) || valor.precioValor < 0 || !esTexto(valor.zona) ||
        !Array.isArray(valor.imagenes)
      ) return []
      const imagenes = valor.imagenes.filter(esImagen).map(({ src, credito }) => ({ src, credito }))
      return [{
        id: valor.id,
        titulo: valor.titulo,
        tipo: valor.tipo,
        operacion: valor.operacion,
        m2: valor.m2,
        dormitorios: valor.dormitorios,
        precio: valor.precio,
        precioValor: valor.precioValor,
        zona: valor.zona,
        imagenes,
      }]
    })
  : []
