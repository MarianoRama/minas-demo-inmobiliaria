import { useCallback, useState } from 'react'

const CLAVE = 'inmobiliaria.admin.sesion'
const PIN_DEMO = '1234'

function leer(): boolean {
  try {
    return window.sessionStorage.getItem(CLAVE) === 'ok'
  } catch {
    return false
  }
}

export function useSesionAdmin() {
  const [autenticado, setAutenticado] = useState(leer)

  const ingresar = useCallback((pin: string) => {
    if (pin !== PIN_DEMO) return false
    try {
      window.sessionStorage.setItem(CLAVE, 'ok')
    } catch {
      // sin sessionStorage seguimos igual, solo no persiste al recargar
    }
    setAutenticado(true)
    return true
  }, [])

  const salir = useCallback(() => {
    try {
      window.sessionStorage.removeItem(CLAVE)
    } catch {
      /* noop */
    }
    setAutenticado(false)
  }, [])

  return { autenticado, ingresar, salir, PIN_DEMO }
}
