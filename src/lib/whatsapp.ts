import { NEGOCIO } from '../config'

export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${NEGOCIO.whatsappLink}?text=${encodeURIComponent(mensaje)}`
}
