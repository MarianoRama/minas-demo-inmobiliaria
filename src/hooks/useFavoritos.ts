import { useCallback, useEffect, useState } from 'react'

const CLAVE = 'piedra-serrana:favoritos'

function leer(): number[] {
  try {
    const crudo = window.localStorage.getItem(CLAVE)
    if (!crudo) return []
    const datos = JSON.parse(crudo)
    return Array.isArray(datos) ? datos.filter((n) => typeof n === 'number') : []
  } catch {
    return []
  }
}

function guardar(ids: number[]) {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(ids))
  } catch {
    // localStorage no disponible (modo privado, permisos, etc.): seguimos sin persistir.
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<number[]>(() => leer())

  useEffect(() => {
    guardar(favoritos)
  }, [favoritos])

  const alternar = useCallback((id: number) => {
    setFavoritos((actuales) =>
      actuales.includes(id) ? actuales.filter((f) => f !== id) : [...actuales, id],
    )
  }, [])

  const esFavorito = useCallback((id: number) => favoritos.includes(id), [favoritos])

  return { favoritos, alternar, esFavorito }
}
