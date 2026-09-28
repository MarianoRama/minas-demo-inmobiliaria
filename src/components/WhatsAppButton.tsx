import { WhatsAppAction, whatsappConfigurado } from './WhatsAppAction'

export function WhatsAppButton() {
  if (!whatsappConfigurado) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl bg-white p-3 text-oliva-900 shadow-lg shadow-black/20 ring-1 ring-oliva-200">
      <WhatsAppAction
        label="Consultar por WhatsApp"
        message="Hola, quisiera consultar sobre propiedades en Minas."
        className="flex min-h-11 items-center gap-2 rounded-full bg-[#16803c] px-4 py-3 text-sm font-semibold text-white shadow hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-900"
      >
        WhatsApp
      </WhatsAppAction>
    </div>
  )
}
