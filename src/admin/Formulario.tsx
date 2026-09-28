import { useState, type FormEvent } from 'react'
import type { EstadoPropiedad, Propiedad, TipoOperacion, TipoPropiedad } from '../types'
import { PhotoInput } from './PhotoInput'

const tipos: TipoPropiedad[] = ['Casa', 'Apartamento', 'Terreno', 'Chacra', 'Local comercial']
const operaciones: TipoOperacion[] = ['Venta', 'Alquiler']
const estados: EstadoPropiedad[] = ['Disponible', 'Reservada', 'Vendida', 'Alquilada']

type Borrador = Omit<Propiedad, 'id' | 'm2Terreno'> & { m2Terreno: string }

function borradorVacio(): Borrador {
  return {
    referencia: '',
    titulo: '',
    tipo: 'Casa',
    operacion: 'Venta',
    moneda: 'USD',
    precio: 0,
    precioTexto: '',
    m2: 0,
    m2Terreno: '',
    dormitorios: 0,
    banos: 0,
    garage: false,
    patio: false,
    zona: '',
    direccion: '',
    descripcion: '',
    caracteristicas: [],
    estado: 'Disponible',
    publicada: true,
    fotos: [],
  }
}

const clasesInput =
  'foco-visible w-full border-2 border-piedra-300 bg-white px-3 py-2.5 text-tinta-900 placeholder:text-piedra-400'

interface Props {
  propiedad?: Propiedad
  esDestacada: boolean
  onGuardar: (datos: Omit<Propiedad, 'id'>, marcarDestacada: boolean) => void
  onCancelar: () => void
}

export function Formulario({ propiedad, esDestacada, onGuardar, onCancelar }: Props) {
  const [datos, setDatos] = useState<Borrador>(() =>
    propiedad ? { ...propiedad, m2Terreno: propiedad.m2Terreno ? String(propiedad.m2Terreno) : '' } : borradorVacio(),
  )
  const [destacada, setDestacada] = useState(esDestacada)
  const [errores, setErrores] = useState<Record<string, string>>({})

  function campo<K extends keyof Borrador>(clave: K, valor: Borrador[K]) {
    setDatos((d) => ({ ...d, [clave]: valor }))
  }

  function validar(): boolean {
    const nuevos: Record<string, string> = {}
    if (!datos.referencia.trim()) nuevos.referencia = 'Falta la referencia.'
    if (!datos.titulo.trim()) nuevos.titulo = 'Falta el título.'
    if (!datos.zona.trim()) nuevos.zona = 'Falta la zona.'
    if (!datos.direccion.trim()) nuevos.direccion = 'Falta la dirección.'
    if (!datos.descripcion.trim()) nuevos.descripcion = 'Falta la descripción.'
    if (!(datos.precio > 0)) nuevos.precio = 'El precio tiene que ser mayor a cero.'
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validar()) return
    const precioTexto =
      datos.precioTexto.trim() ||
      (datos.moneda === 'USD'
        ? `USD ${datos.precio.toLocaleString('es-UY')}`
        : `$ ${datos.precio.toLocaleString('es-UY')}${datos.operacion === 'Alquiler' ? ' / mes' : ''}`)
    onGuardar(
      {
        ...datos,
        precioTexto,
        m2Terreno: datos.m2Terreno ? Number(datos.m2Terreno) : undefined,
      },
      destacada,
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-tinta-900">Fotos</h2>
        <p className="text-sm text-tinta-700/70">Si no cargás fotos, se usa una ilustración propia.</p>
        <div className="mt-3">
          <PhotoInput fotos={datos.fotos} onChange={(fotos) => campo('fotos', fotos)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="referencia" className="text-sm font-medium text-tinta-800">
            Referencia
          </label>
          <input
            id="referencia"
            className={clasesInput}
            value={datos.referencia}
            onChange={(e) => campo('referencia', e.target.value)}
            placeholder="Ej: PS-122"
          />
          {errores.referencia && <p className="mt-1 text-xs font-semibold text-brasa-600">{errores.referencia}</p>}
        </div>

        <div>
          <label htmlFor="estado" className="text-sm font-medium text-tinta-800">
            Estado
          </label>
          <select id="estado" className={clasesInput} value={datos.estado} onChange={(e) => campo('estado', e.target.value as EstadoPropiedad)}>
            {estados.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="titulo" className="text-sm font-medium text-tinta-800">
            Título
          </label>
          <input
            id="titulo"
            className={clasesInput}
            value={datos.titulo}
            onChange={(e) => campo('titulo', e.target.value)}
            placeholder="Ej: Casa de un piso con parrillero"
          />
          {errores.titulo && <p className="mt-1 text-xs font-semibold text-brasa-600">{errores.titulo}</p>}
        </div>

        <div>
          <label htmlFor="tipo" className="text-sm font-medium text-tinta-800">
            Tipo
          </label>
          <select id="tipo" className={clasesInput} value={datos.tipo} onChange={(e) => campo('tipo', e.target.value as TipoPropiedad)}>
            {tipos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="operacion" className="text-sm font-medium text-tinta-800">
            Operación
          </label>
          <select
            id="operacion"
            className={clasesInput}
            value={datos.operacion}
            onChange={(e) => campo('operacion', e.target.value as TipoOperacion)}
          >
            {operaciones.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="moneda" className="text-sm font-medium text-tinta-800">
            Moneda
          </label>
          <select id="moneda" className={clasesInput} value={datos.moneda} onChange={(e) => campo('moneda', e.target.value as 'USD' | 'UYU')}>
            <option value="USD">U$S (dólares)</option>
            <option value="UYU">$ (pesos)</option>
          </select>
        </div>

        <div>
          <label htmlFor="precio" className="text-sm font-medium text-tinta-800">
            Precio
          </label>
          <input
            id="precio"
            type="number"
            min={0}
            className={clasesInput}
            value={datos.precio || ''}
            onChange={(e) => campo('precio', Number(e.target.value))}
            placeholder="Precio en números, sin puntos"
          />
          <p className="mt-1 text-xs text-tinta-700/60">Solo números, sin puntos ni separadores.</p>
          {errores.precio && <p className="mt-1 text-xs font-semibold text-brasa-600">{errores.precio}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="precioTexto" className="text-sm font-medium text-tinta-800">
            Precio como se muestra (opcional)
          </label>
          <input
            id="precioTexto"
            className={clasesInput}
            value={datos.precioTexto}
            onChange={(e) => campo('precioTexto', e.target.value)}
            placeholder="Si lo dejás vacío, se arma solo. Ej: $ 27.500 / mes"
          />
        </div>

        <div>
          <label htmlFor="m2" className="text-sm font-medium text-tinta-800">
            m² construidos
          </label>
          <input id="m2" type="number" min={0} className={clasesInput} value={datos.m2 || ''} onChange={(e) => campo('m2', Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="m2Terreno" className="text-sm font-medium text-tinta-800">
            m² de terreno (para campos)
          </label>
          <input
            id="m2Terreno"
            type="number"
            min={0}
            className={clasesInput}
            value={datos.m2Terreno}
            onChange={(e) => campo('m2Terreno', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dormitorios" className="text-sm font-medium text-tinta-800">
            Dormitorios
          </label>
          <input
            id="dormitorios"
            type="number"
            min={0}
            className={clasesInput}
            value={datos.dormitorios}
            onChange={(e) => campo('dormitorios', Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="banos" className="text-sm font-medium text-tinta-800">
            Baños
          </label>
          <input id="banos" type="number" min={0} className={clasesInput} value={datos.banos} onChange={(e) => campo('banos', Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="zona" className="text-sm font-medium text-tinta-800">
            Zona
          </label>
          <input id="zona" className={clasesInput} value={datos.zona} onChange={(e) => campo('zona', e.target.value)} placeholder="Ej: Centro" />
          {errores.zona && <p className="mt-1 text-xs font-semibold text-brasa-600">{errores.zona}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="direccion" className="text-sm font-medium text-tinta-800">
            Dirección
          </label>
          <input
            id="direccion"
            className={clasesInput}
            value={datos.direccion}
            onChange={(e) => campo('direccion', e.target.value)}
            placeholder="Ej: Rodó 456, Minas"
          />
          {errores.direccion && <p className="mt-1 text-xs font-semibold text-brasa-600">{errores.direccion}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="descripcion" className="text-sm font-medium text-tinta-800">
            Descripción
          </label>
          <textarea
            id="descripcion"
            rows={4}
            className={clasesInput}
            value={datos.descripcion}
            onChange={(e) => campo('descripcion', e.target.value)}
          />
          {errores.descripcion && <p className="mt-1 text-xs font-semibold text-brasa-600">{errores.descripcion}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="caracteristicas" className="text-sm font-medium text-tinta-800">
            Características (separadas por coma)
          </label>
          <input
            id="caracteristicas"
            className={clasesInput}
            value={datos.caracteristicas.join(', ')}
            onChange={(e) => campo('caracteristicas', e.target.value.split(',').map((c) => c.trim()).filter(Boolean))}
            placeholder="Ej: Garaje, Parrillero, Chimenea"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-piedra-200 pt-5">
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
          <input type="checkbox" checked={datos.garage} onChange={(e) => campo('garage', e.target.checked)} className="h-5 w-5" />
          Tiene garaje
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
          <input type="checkbox" checked={datos.patio} onChange={(e) => campo('patio', e.target.checked)} className="h-5 w-5" />
          Tiene patio o parque
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
          <input type="checkbox" checked={datos.publicada} onChange={(e) => campo('publicada', e.target.checked)} className="h-5 w-5" />
          {datos.publicada ? 'Activa (se ve en la web)' : 'Pausada (no se ve en la web)'}
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-tinta-800">
          <input type="checkbox" checked={destacada} onChange={(e) => setDestacada(e.target.checked)} className="h-5 w-5" />
          Es la propiedad destacada del home
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-piedra-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancelar}
          className="foco-visible min-h-[44px] border-2 border-piedra-300 px-5 text-sm font-semibold text-tinta-800 hover:bg-piedra-100"
        >
          Cancelar
        </button>
        <button type="submit" className="foco-visible min-h-[44px] bg-sierra-700 px-6 text-sm font-semibold text-piedra-50 hover:bg-sierra-600">
          Guardar propiedad
        </button>
      </div>
    </form>
  )
}
