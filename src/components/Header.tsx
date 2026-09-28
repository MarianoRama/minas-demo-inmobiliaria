import { useState } from 'react'
import { useDatos } from '../data/DatosContext'
import { SierraMark } from './illustrations/SierraMark'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#propiedades', label: 'Propiedades' },
  { href: '#zonas', label: 'Zonas' },
  { href: '#tasaciones', label: 'Tasamos tu propiedad' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { negocio } = useDatos()

  return (
    <header className="sticky top-0 z-40 border-b border-piedra-200 bg-piedra-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5 foco-visible rounded-sm">
          <SierraMark className="h-9 w-9 shrink-0" />
          <span className="leading-tight">
            <span className="block font-display text-lg text-sierra-800 sm:text-xl">
              {negocio.nombre}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-piedra-700">
              {negocio.rubro} · Minas
            </span>
          </span>
        </a>

        <nav className="hidden md:flex md:items-center md:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="foco-visible rounded-sm text-sm font-medium text-tinta-700 transition-colors hover:text-sierra-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="foco-visible inline-flex h-11 w-11 items-center justify-center rounded-md text-sierra-800 md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" className="flex flex-col gap-1 border-t border-piedra-200 bg-piedra-50 px-4 pb-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="foco-visible flex min-h-[44px] items-center rounded-sm text-[15px] font-medium text-tinta-700"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
