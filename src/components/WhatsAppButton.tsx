import { useDatos } from '../data/DatosContext'
import { linkWhatsApp } from '../lib/whatsapp'

export function WhatsAppButton() {
  const { negocio } = useDatos()
  const mensaje = `Hola! Vi el sitio de ${negocio.nombre} (demo) y quería hacer una consulta.`
  return (
    <a
      href={linkWhatsApp(mensaje, negocio.whatsappLink)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp (número de ejemplo)"
      className="foco-visible fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-tinta-900/25 transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 004.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.03h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.17 8.17 0 01-1.26-4.35c0-4.52 3.68-8.2 8.22-8.2 2.2 0 4.26.86 5.82 2.4a8.16 8.16 0 012.4 5.81c0 4.52-3.68 8.21-8.19 8.21zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.16 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28z" />
      </svg>
      <span className="sr-only">Escribinos por WhatsApp</span>
    </a>
  )
}
