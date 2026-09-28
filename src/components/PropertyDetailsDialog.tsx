import { useEffect, useRef, useState } from 'react'
import type { Propiedad } from '../types'
import { WhatsAppAction } from './WhatsAppAction'

export function PropertyDetailsDialog({ propiedad, onClose }: { propiedad: Propiedad; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [fotoActiva, setFotoActiva] = useState(0)
  const foto = propiedad.imagenes[fotoActiva]
  const consulta = 'Hola, quiero consultar por ' + propiedad.titulo + ' (' + propiedad.operacion + ', ' + propiedad.precio + '), en ' + propiedad.zona + '.'

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [])

  return (
    <dialog ref={dialogRef} aria-labelledby="detalle-titulo" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === dialogRef.current) onClose() }} className="m-auto max-h-[92dvh] w-[min(94vw,880px)] overflow-y-auto rounded-2xl bg-arena-50 p-0 text-oliva-900 shadow-2xl backdrop:bg-oliva-950/65">
      <div className="flex items-center justify-between gap-4 border-b border-oliva-200 px-5 py-4 sm:px-7">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-oliva-600">{propiedad.operacion} · {propiedad.tipo}</p><h2 id="detalle-titulo" className="mt-1 font-heading text-xl sm:text-2xl">{propiedad.titulo}</h2></div>
        <button type="button" onClick={onClose} aria-label="Cerrar detalles" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-oliva-300 text-xl hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-700">×</button>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-[1.15fr_0.85fr] sm:gap-7 sm:p-7">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-arena-200">{foto ? <img src={foto.src} alt={'Imagen ilustrativa de ' + propiedad.tipo.toLowerCase() + '; no corresponde a esta propiedad'} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm text-oliva-700">Imagen ilustrativa no disponible</div>}</div>
          <p className="mt-2 text-xs leading-relaxed text-oliva-600">Imagen ilustrativa; no corresponde a esta propiedad ni a un aviso real de Minas. Crédito: {foto?.credito ?? 'sin imagen'} · <a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-oliva-900">licencia Unsplash</a></p>
          {propiedad.imagenes.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Galería de imágenes">{propiedad.imagenes.map((imagen, index) => <button key={imagen.src + index} type="button" onClick={() => setFotoActiva(index)} aria-label={'Mostrar imagen ' + (index + 1)} aria-pressed={index === fotoActiva} className={'h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-700 ' + (index === fotoActiva ? 'border-oliva-700' : 'border-transparent')}><img src={imagen.src} alt="" className="h-full w-full object-cover" /></button>)}</div>}
        </div>
        <div className="flex flex-col">
          <p className="font-heading text-2xl font-semibold text-oliva-800">{propiedad.precio}</p>
          <p className="mt-1 text-sm text-oliva-700">{propiedad.zona}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-oliva-200 py-4 text-sm">
            <div><dt className="text-xs text-oliva-600">Superficie</dt><dd className="mt-1 font-semibold">{propiedad.m2.toLocaleString('es-UY')} m²</dd></div>
            <div><dt className="text-xs text-oliva-600">Dormitorios</dt><dd className="mt-1 font-semibold">{propiedad.dormitorios ? propiedad.dormitorios : 'No aplica'}</dd></div>
            <div><dt className="text-xs text-oliva-600">Tipo</dt><dd className="mt-1 font-semibold">{propiedad.tipo}</dd></div>
            <div><dt className="text-xs text-oliva-600">Operación</dt><dd className="mt-1 font-semibold">{propiedad.operacion}</dd></div>
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-oliva-700">Esta ficha es parte de una demostración. Consultá disponibilidad, condiciones y ubicación exacta antes de tomar una decisión.</p>
          <div className="mt-auto pt-5"><WhatsAppAction message={consulta} label={'Consultar por ' + propiedad.titulo} className="inline-flex min-h-11 items-center justify-center rounded-md bg-oliva-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-oliva-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oliva-700">Consultar por WhatsApp</WhatsAppAction></div>
        </div>
      </div>
    </dialog>
  )
}

