import { useEffect, useState } from 'react'

function leerHash(): string {
  return window.location.hash.replace(/^#/, '') || '/'
}

/** Ruteo mínimo por hash, sin librería: sirve para #/admin en GitHub Pages. */
export function useHashRoute(): string {
  const [ruta, setRuta] = useState(leerHash)

  useEffect(() => {
    const onHashChange = () => setRuta(leerHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return ruta
}
