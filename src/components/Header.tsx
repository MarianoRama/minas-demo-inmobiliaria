import { useState } from 'react'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#propiedades', label: 'Propiedades' },
  { href: '#vender-alquilar', label: 'Vender/Alquilar' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-arena-50/95 backdrop-blur border-b border-oliva-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center gap-2 font-heading text-oliva-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-oliva-700 text-arena-50 text-sm font-bold">
            CP
          </span>
          <span className="text-lg sm:text-xl leading-tight">
            Cerro del Pintado
            <span className="block text-[11px] font-sans font-normal tracking-wide text-oliva-600">
              INMOBILIARIA
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-oliva-800 hover:text-oliva-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-oliva-800"
          aria-label="Abrir menú"
          aria-expanded={open}
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
        <nav className="md:hidden border-t border-oliva-200 bg-arena-50 px-4 pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-oliva-800"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
