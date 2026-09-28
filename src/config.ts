// Datos del autor del sitio. Editá acá para reutilizar el crédito en el footer.
export const AUTOR = {
  nombre: 'Mariano Rama',
  whatsapp: '59899000000',
  texto: 'Diseño y desarrollo web en Minas',
}

// Datos de la inmobiliaria ficticia. Son los valores por defecto: el dueño
// puede cambiarlos desde el panel (#/admin) y ahí quedan guardados en su navegador.
export const NEGOCIO_INICIAL = {
  nombre: 'Piedra Serrana',
  rubro: 'Inmobiliaria',
  slogan: 'Propiedades en Minas, con los pies en la sierra',
  whatsapp: '598 94 512 830',
  whatsappLink: '59894512830',
  telefonoFijo: '4442 3517',
  email: 'hola@piedraserrana-demo.uy',
  direccion: 'Treinta y Tres 812, Minas, Lavalleja',
  horarios: [
    { dia: 'Lunes a viernes', texto: '9:00 a 13:00 y 15:00 a 19:00' },
    { dia: 'Sábados', texto: '9:00 a 12:00' },
    { dia: 'Domingos', texto: 'Cerrado' },
  ],
  avisoHome: 'Nueva chacra cerca del Parque Salus, la sumamos esta semana.',
}

/**
 * Fuente de la colección de propiedades.
 * - 'local': usa los datos de este proyecto (por defecto, editable desde el panel).
 * - 'sheets': lee una planilla de Google Sheets publicada como CSV (solo lectura desde el panel).
 *   Columnas esperadas: ver README.md.
 */
export const FUENTE_DATOS: { tipo: 'local' } | { tipo: 'sheets'; csvUrl: string } = {
  tipo: 'local',
}
