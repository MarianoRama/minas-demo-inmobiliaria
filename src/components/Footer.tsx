import { AUTOR, NEGOCIO } from '../config'
import { SierraMark } from './illustrations/SierraMark'

export function Footer() {
  return (
    <footer id="contacto" className="bg-sierra-900 text-piedra-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <SierraMark className="h-9 w-9" />
            <p className="font-display text-xl text-piedra-50">{NEGOCIO.nombre}</p>
          </div>
          <p className="mt-3 text-sm text-piedra-300">
            Inmobiliaria ficticia de ejemplo en Minas, Uruguay. Este sitio es una demo de
            portafolio y no corresponde a una empresa real.
          </p>
        </div>

        <div>
          <p className="mb-2 font-semibold text-piedra-50">Contacto</p>
          <ul className="space-y-1.5 text-sm text-piedra-300">
            <li>{NEGOCIO.direccion}</li>
            <li>WhatsApp: {NEGOCIO.whatsapp} (ejemplo)</li>
            <li>Tel. fijo: {NEGOCIO.telefonoFijo}</li>
            <li>{NEGOCIO.email}</li>
            <li className="pt-1 text-piedra-400">{NEGOCIO.horario}</li>
          </ul>
        </div>

        <div>
          <p className="mb-2 font-semibold text-piedra-50">Enlaces</p>
          <ul className="space-y-1.5 text-sm text-piedra-300">
            <li><a href="#inicio" className="foco-visible hover:text-piedra-50">Inicio</a></li>
            <li><a href="#propiedades" className="foco-visible hover:text-piedra-50">Propiedades</a></li>
            <li><a href="#zonas" className="foco-visible hover:text-piedra-50">Zonas</a></li>
            <li><a href="#tasaciones" className="foco-visible hover:text-piedra-50">Tasamos tu propiedad</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-piedra-100/10 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-xs text-piedra-400 sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <p>
            © {new Date().getFullYear()} {NEGOCIO.nombre} — Sitio demo de portafolio, datos e
            ilustraciones ficticios.
          </p>
          <p>
            Sitio demo por {AUTOR.nombre} — ¿querés una página así para tu negocio?{' '}
            <a
              href={`https://wa.me/${AUTOR.whatsapp}?text=${encodeURIComponent(`Hola ${AUTOR.nombre}! Vi la demo de inmobiliaria y quiero una página así para mi negocio.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="foco-visible font-semibold text-piedra-200 underline underline-offset-4 hover:text-piedra-50"
            >
              Escribime
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
