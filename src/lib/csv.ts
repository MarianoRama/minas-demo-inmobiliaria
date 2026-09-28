/**
 * Parser de CSV simple pero correcto: soporta comillas dobles, comas y
 * saltos de línea dentro de un campo entre comillas, y comillas escapadas
 * como "" dentro de un campo. Pensado para el CSV publicado de Google Sheets.
 */
export function parseCSV(texto: string): string[][] {
  const filas: string[][] = []
  let fila: string[] = []
  let campo = ''
  let entreComillas = false
  const src = texto.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  for (let i = 0; i < src.length; i++) {
    const c = src[i]

    if (entreComillas) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          campo += '"'
          i++
        } else {
          entreComillas = false
        }
      } else {
        campo += c
      }
      continue
    }

    if (c === '"') {
      entreComillas = true
    } else if (c === ',') {
      fila.push(campo)
      campo = ''
    } else if (c === '\n') {
      fila.push(campo)
      filas.push(fila)
      fila = []
      campo = ''
    } else {
      campo += c
    }
  }

  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo)
    filas.push(fila)
  }

  return filas.filter((f) => f.some((c) => c.trim() !== ''))
}

/** Convierte un CSV con encabezado en fila 1 a una lista de objetos {columna: valor}. */
export function csvAObjetos(texto: string): Record<string, string>[] {
  const filas = parseCSV(texto)
  if (filas.length === 0) return []
  const encabezados = filas[0].map((h) => h.trim())
  return filas.slice(1).map((fila) => {
    const obj: Record<string, string> = {}
    encabezados.forEach((h, i) => {
      obj[h] = (fila[i] ?? '').trim()
    })
    return obj
  })
}
