import { useEffect, useRef, useState } from 'react'

/**
 * Hace aparecer un elemento con fade + slide corto cuando entra en pantalla.
 * Respeta prefers-reduced-motion (se muestra directamente, sin animar) y solo
 * dispara una vez por elemento.
 */
export function useReveal<T extends HTMLElement>(retrasoMs = 0) {
  const elementoRef = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = elementoRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisible(true)
            observador.unobserve(entrada.target)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px 120px 0px' },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [])

  return {
    nodeRef: elementoRef,
    className: visible ? 'reveal reveal-visible' : 'reveal',
    style: { transitionDelay: visible ? `${retrasoMs}ms` : '0ms' },
  }
}
