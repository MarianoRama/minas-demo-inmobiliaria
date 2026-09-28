export function linkWhatsApp(mensaje: string, whatsappLink: string): string {
  return `https://wa.me/${whatsappLink}?text=${encodeURIComponent(mensaje)}`
}
