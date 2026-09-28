import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { FUENTE_DATOS, NEGOCIO_INICIAL } from '../config'
import { csvAObjetos } from '../lib/csv'
import type { DatosNegocio, EstadoPropiedad, Propiedad, TipoPropiedad } from '../types'
import { Contexto, type DatosContexto } from './DatosContext'
import { propiedadesEjemplo } from './propiedades'

const CLAVE = 'inmobiliaria.datos.v1'

interface Almacen {
  propiedades: Propiedad[]
  negocio: DatosNegocio
  destacadaId: number | null
}

const almacenInicial: Almacen = {
  propiedades: propiedadesEjemplo,
  negocio: NEGOCIO_INICIAL,
  destacadaId: 8,
}

function leerAlmacen(): Almacen {
  try {
    const crudo = window.localStorage.getItem(CLAVE)
    if (!crudo) return almacenInicial
    const datos = JSON.parse(crudo)
    return {
      propiedades: Array.isArray(datos.propiedades) ? datos.propiedades : almacenInicial.propiedades,
      negocio: datos.negocio ? { ...almacenInicial.negocio, ...datos.negocio } : almacenInicial.negocio,
      destacadaId: typeof datos.destacadaId === 'number' ? datos.destacadaId : almacenInicial.destacadaId,
    }
  } catch {
    return almacenInicial
  }
}

let proximoId = 1000

function tipoDesdeTexto(t: string): TipoPropiedad {
  const valores: TipoPropiedad[] = ['Casa', 'Apartamento', 'Terreno', 'Chacra', 'Local comercial']
  return valores.find((v) => v.toLowerCase() === t.trim().toLowerCase()) ?? 'Casa'
}

function estadoDesdeTexto(t: string): EstadoPropiedad {
  const valores: EstadoPropiedad[] = ['Disponible', 'Reservada', 'Vendida', 'Alquilada']
  return valores.find((v) => v.toLowerCase() === t.trim().toLowerCase()) ?? 'Disponible'
}

/** Convierte filas del CSV de Google Sheets (ver README) en propiedades. */
function filasCsvAPropiedades(filas: Record<string, string>[]): Propiedad[] {
  return filas.map((f, i) => {
    const moneda = f.moneda?.trim().toUpperCase() === 'UYU' ? 'UYU' : 'USD'
    const precio = Number(f.precio?.replace(/[^\d]/g, '')) || 0
    return {
      id: 1_000_000 + i,
      referencia: f.referencia || `SH-${i + 1}`,
      titulo: f.titulo || 'Propiedad sin título',
      tipo: tipoDesdeTexto(f.tipo || 'Casa'),
      operacion: f.operacion?.trim().toLowerCase() === 'alquiler' ? 'Alquiler' : 'Venta',
      moneda,
      precio,
      precioTexto:
        f.precioTexto || (moneda === 'USD' ? `USD ${precio.toLocaleString('es-UY')}` : `$ ${precio.toLocaleString('es-UY')}`),
      m2: Number(f.m2) || 0,
      m2Terreno: f.m2Terreno ? Number(f.m2Terreno) : undefined,
      dormitorios: Number(f.dormitorios) || 0,
      banos: Number(f.banos) || 0,
      garage: /^s[ií]/i.test(f.garage || ''),
      patio: /^s[ií]/i.test(f.patio || ''),
      zona: f.zona || 'Centro',
      direccion: f.direccion || '',
      descripcion: f.descripcion || '',
      caracteristicas: f.caracteristicas ? f.caracteristicas.split('|').map((c) => c.trim()).filter(Boolean) : [],
      estado: estadoDesdeTexto(f.estado || 'Disponible'),
      publicada: f.publicada ? /^s[ií]/i.test(f.publicada) : true,
      fotos: f.foto ? [f.foto] : [],
    }
  })
}

export function DatosProvider({ children }: { children: ReactNode }) {
  const [almacen, setAlmacen] = useState<Almacen>(() => (FUENTE_DATOS.tipo === 'local' ? leerAlmacen() : almacenInicial))
  const [avisoStorage, setAvisoStorage] = useState<string | null>(null)
  const [propiedadesSheets, setPropiedadesSheets] = useState<Propiedad[] | null>(null)
  const [cargandoSheets, setCargandoSheets] = useState(FUENTE_DATOS.tipo === 'sheets')
  const [errorSheets, setErrorSheets] = useState<string | null>(null)

  useEffect(() => {
    if (FUENTE_DATOS.tipo !== 'sheets') return
    let activo = true
    fetch(FUENTE_DATOS.csvUrl)
      .then((r) => {
        if (!r.ok) throw new Error('No se pudo cargar la planilla.')
        return r.text()
      })
      .then((texto) => {
        if (!activo) return
        setPropiedadesSheets(filasCsvAPropiedades(csvAObjetos(texto)))
      })
      .catch((e) => {
        if (!activo) return
        setErrorSheets(e instanceof Error ? e.message : 'No se pudo cargar la planilla.')
      })
      .finally(() => {
        if (activo) setCargandoSheets(false)
      })
    return () => {
      activo = false
    }
  }, [])

  const guardar = useCallback((nuevo: Almacen) => {
    setAlmacen(nuevo)
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(nuevo))
      setAvisoStorage(null)
    } catch {
      setAvisoStorage(
        'No se pudo guardar en este navegador (memoria llena o modo privado). El cambio se ve ahora, pero puede perderse al recargar.',
      )
    }
  }, [])

  const usaSheets = FUENTE_DATOS.tipo === 'sheets'
  const propiedades = useMemo(
    () => (usaSheets ? propiedadesSheets ?? (errorSheets ? almacen.propiedades : []) : almacen.propiedades),
    [usaSheets, propiedadesSheets, errorSheets, almacen.propiedades],
  )

  const crear = useCallback(
    (p: Omit<Propiedad, 'id'>) => {
      proximoId += 1
      const nueva: Propiedad = { ...p, id: proximoId }
      setAlmacen((actual) => {
        const nuevo = { ...actual, propiedades: [nueva, ...actual.propiedades] }
        guardar(nuevo)
        return nuevo
      })
      return nueva
    },
    [guardar],
  )

  const actualizar = useCallback(
    (id: number, cambios: Partial<Propiedad>) => {
      setAlmacen((actual) => {
        const nuevo = {
          ...actual,
          propiedades: actual.propiedades.map((p) => (p.id === id ? { ...p, ...cambios } : p)),
        }
        guardar(nuevo)
        return nuevo
      })
    },
    [guardar],
  )

  const eliminar = useCallback(
    (id: number) => {
      setAlmacen((actual) => {
        const nuevo = {
          ...actual,
          propiedades: actual.propiedades.filter((p) => p.id !== id),
          destacadaId: actual.destacadaId === id ? null : actual.destacadaId,
        }
        guardar(nuevo)
        return nuevo
      })
    },
    [guardar],
  )

  const duplicar = useCallback(
    (id: number) => {
      setAlmacen((actual) => {
        const original = actual.propiedades.find((p) => p.id === id)
        if (!original) return actual
        proximoId += 1
        const copia: Propiedad = {
          ...original,
          id: proximoId,
          referencia: `${original.referencia}-COPIA`,
          titulo: `${original.titulo} (copia)`,
        }
        const nuevo = { ...actual, propiedades: [copia, ...actual.propiedades] }
        guardar(nuevo)
        return nuevo
      })
    },
    [guardar],
  )

  const marcarDestacada = useCallback(
    (id: number | null) => {
      setAlmacen((actual) => {
        const nuevo = { ...actual, destacadaId: id }
        guardar(nuevo)
        return nuevo
      })
    },
    [guardar],
  )

  const actualizarNegocio = useCallback(
    (cambios: Partial<DatosNegocio>) => {
      setAlmacen((actual) => {
        const nuevo = { ...actual, negocio: { ...actual.negocio, ...cambios } }
        guardar(nuevo)
        return nuevo
      })
    },
    [guardar],
  )

  const restaurarEjemplo = useCallback(() => {
    guardar(almacenInicial)
  }, [guardar])

  const exportar = useCallback(() => {
    const blob = new Blob([JSON.stringify(almacen, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'piedra-serrana-datos.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [almacen])

  const importar = useCallback(
    (archivo: File) =>
      new Promise<void>((resolve, reject) => {
        const lector = new FileReader()
        lector.onerror = () => reject(new Error('No se pudo leer el archivo.'))
        lector.onload = () => {
          try {
            const datos = JSON.parse(lector.result as string)
            if (!Array.isArray(datos.propiedades) || !datos.negocio) {
              throw new Error('El archivo no tiene el formato esperado.')
            }
            guardar({
              propiedades: datos.propiedades,
              negocio: { ...almacenInicial.negocio, ...datos.negocio },
              destacadaId: typeof datos.destacadaId === 'number' ? datos.destacadaId : null,
            })
            resolve()
          } catch (e) {
            reject(e instanceof Error ? e : new Error('El archivo no es válido.'))
          }
        }
        lector.readAsText(archivo)
      }),
    [guardar],
  )

  const zonas = useMemo(() => Array.from(new Set(propiedades.map((p) => p.zona))).sort(), [propiedades])
  const destacadaId = almacen.destacadaId
  const destacada = useMemo(() => propiedades.find((p) => p.id === destacadaId) ?? null, [propiedades, destacadaId])
  const propiedadesPublicadas = useMemo(() => propiedades.filter((p) => p.publicada), [propiedades])

  const valor: DatosContexto = {
    propiedades,
    propiedadesPublicadas,
    negocio: almacen.negocio,
    destacadaId,
    destacada,
    zonas,
    cargandoSheets,
    errorSheets,
    avisoStorage,
    soloLecturaSheets: usaSheets,
    crear,
    actualizar,
    eliminar,
    duplicar,
    marcarDestacada,
    actualizarNegocio,
    restaurarEjemplo,
    exportar,
    importar,
  }

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}
