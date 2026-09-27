import type { Propiedad } from '../types'

export interface RangoPrecio {
  id: string
  label: string
  usdMin?: number
  usdMax?: number
  uyuMin?: number
  uyuMax?: number
}

export const rangosPrecio: RangoPrecio[] = [
  { id: 'todos', label: 'Cualquier precio' },
  { id: 'entrada', label: 'Entrada — USD hasta 80.000 / $ hasta 20.000', usdMax: 80000, uyuMax: 20000 },
  { id: 'medio', label: 'Medio — USD 80.000-150.000 / $ 20.000-35.000', usdMin: 80000, usdMax: 150000, uyuMin: 20000, uyuMax: 35000 },
  { id: 'alto', label: 'Alto — USD +150.000 / $ +35.000', usdMin: 150000, uyuMin: 35000 },
]

export function cumpleRango(propiedad: Propiedad, rango: RangoPrecio): boolean {
  if (rango.id === 'todos') return true
  const min = propiedad.moneda === 'USD' ? rango.usdMin : rango.uyuMin
  const max = propiedad.moneda === 'USD' ? rango.usdMax : rango.uyuMax
  if (min !== undefined && propiedad.precio < min) return false
  if (max !== undefined && propiedad.precio > max) return false
  return true
}
