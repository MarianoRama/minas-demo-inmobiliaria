/** Redimensiona una imagen del celular/PC a máximo 1200px de lado y la deja en JPEG ~0.75. */
export function redimensionarImagen(archivo: File, maxLado = 1200, calidad = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    lector.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('No se pudo leer la imagen.'))
      img.onload = () => {
        let { width, height } = img
        if (width > maxLado || height > maxLado) {
          if (width >= height) {
            height = Math.round((height * maxLado) / width)
            width = maxLado
          } else {
            width = Math.round((width * maxLado) / height)
            height = maxLado
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('No se pudo procesar la imagen.'))
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', calidad))
      }
      img.src = lector.result as string
    }
    lector.readAsDataURL(archivo)
  })
}
