export function Footer() {
  return (
    <footer id="contacto" className="bg-oliva-900 text-arena-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-heading text-xl text-arena-50 mb-2">Inmobiliaria Piedra Serrana</p>
          <p className="text-sm text-arena-200">
            Inmobiliaria ficticia de ejemplo — Minas, Uruguay. Este sitio es una demo de
            portafolio y no corresponde a una empresa real.
          </p>
        </div>

        <div>
          <p className="font-semibold text-arena-50 mb-2">Contacto</p>
          <ul className="space-y-1 text-sm text-arena-200">
            <li>Minas, Lavalleja · Dirección a configurar</li>
            <li>Teléfono a configurar</li>
            <li>Correo a configurar</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-arena-50 mb-2">Enlaces</p>
          <ul className="space-y-1 text-sm text-arena-200">
            <li><a href="#inicio" className="hover:text-arena-50">Inicio</a></li>
            <li><a href="#propiedades" className="hover:text-arena-50">Propiedades</a></li>
            <li><a href="#vender-alquilar" className="hover:text-arena-50">Vender/Alquilar</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-oliva-700/60 py-4 text-center text-xs text-arena-300">
        © {new Date().getFullYear()} Inmobiliaria Piedra Serrana — Sitio demo de portafolio, datos e
        imágenes ficticios.
      </div>
    </footer>
  )
}
