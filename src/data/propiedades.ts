import type { Propiedad, TipoOperacion, TipoPropiedad } from '../types'
import inventario from './properties.json'

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor)
}

const tipos: TipoPropiedad[] = ['Casa', 'Apartamento', 'Terreno']
const operaciones: TipoOperacion[] = ['Venta', 'Alquiler']
const datos: unknown = inventario

function esTipoPropiedad(valor: unknown): valor is TipoPropiedad {
  return tipos.some((tipo) => tipo === valor)
}

function esOperacion(valor: unknown): valor is TipoOperacion {
  return operaciones.some((operacion) => operacion === valor)
}

export const propiedades: Propiedad[] = esRegistro(datos) && Array.isArray(datos.propiedades)
  ? datos.propiedades.flatMap((valor): Propiedad[] => {
      if (!esRegistro(valor)) return []
      if (
        typeof valor.id !== 'number' || !Number.isInteger(valor.id) ||
        typeof valor.titulo !== 'string' ||
        !esTipoPropiedad(valor.tipo) || !esOperacion(valor.operacion) ||
        typeof valor.m2 !== 'number' || !Number.isFinite(valor.m2) ||
        typeof valor.dormitorios !== 'number' || !Number.isFinite(valor.dormitorios) ||
        typeof valor.precio !== 'string' || typeof valor.zona !== 'string' ||
        typeof valor.imagen !== 'string'
      ) return []
      return [{
        id: valor.id,
        titulo: valor.titulo,
        tipo: valor.tipo,
        operacion: valor.operacion,
        m2: valor.m2,
        dormitorios: valor.dormitorios,
        precio: valor.precio,
        zona: valor.zona,
        imagen: valor.imagen,
      }]
    })
  : []
