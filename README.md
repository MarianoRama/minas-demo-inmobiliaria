# Piedra Serrana — Sitio DEMO de inmobiliaria

Este proyecto es una **demostración de portafolio**, pensada para mostrarle a inmobiliarias de
Minas, Uruguay, un ejemplo de sitio hecho a medida. "Piedra Serrana" es un nombre **ficticio**, y
todas las propiedades, precios, testimonios, empresas aliadas y datos de contacto son de ejemplo.
No representa a ningún negocio real.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`), tokens de marca en `src/index.css`
- Tipografías self-hosted: `@fontsource-variable/fraunces` (títulos) y `@fontsource-variable/public-sans` (texto)
- Iconos: `lucide-react` + SVG propios (ilustraciones de propiedades y marca de sierra)
- Sin backend: los formularios arman un mensaje y abren WhatsApp; los favoritos se guardan en el
  `localStorage` del navegador de cada visitante

## Secciones incluidas

- Header con logo propio y menú responsive
- Hero con titular grande, ilustración de marca y una novedad editable desde el panel
- Propiedades: 21 fichas de ejemplo, paginadas de a 9, con filtros completos (operación, tipo,
  zona, dormitorios, baños, garaje, precio mínimo/máximo en la moneda correcta, favoritos y orden),
  chips de filtros activos, un botón "Filtros" con cajón para mobile, contador de resultados y
  ficha de detalle en panel modal accesible con galería de hasta 4 fotos y botón de "Coordinar
  visita" por WhatsApp
- Zonas donde trabaja la inmobiliaria (centro, camino a Villa Serrana, Parque Salus/Ruta 8, Ruta 12) + mapa
- Testimonios cortos (marcados como ficticios)
- "Tasamos tu propiedad": formulario que arma un mensaje de WhatsApp con los datos cargados
- Cinta de "Nos confían" con wordmarks ficticios (escribanía, constructora, banco, etc.), en
  desplazamiento continuo, con pausa al pasar el mouse
- Botón flotante de WhatsApp y footer con crédito del autor
- **Panel de administración** en `#/admin` (ver más abajo)

## Panel de administración (`#/admin`)

Pensado para que el dueño del negocio cargue y cambie propiedades desde el celular, sin tocar
código.

- **Acceso**: PIN de demostración `1234` (se muestra en la propia pantalla de ingreso). La sesión
  se guarda en `sessionStorage` mientras el navegador esté abierto. **En un sitio real este acceso
  se reemplaza** por inicio de sesión con Google (si los datos viven en una planilla de Sheets) o
  por un backend con usuarios propios, por ejemplo [Supabase](https://supabase.com/).
- **Datos**: todo se guarda en el `localStorage` del navegador (clave `inmobiliaria.datos.v1`), no
  hay servidor. Desde "Copia y respaldo" se puede descargar un JSON de respaldo, cargar uno
  existente o volver a los datos de ejemplo originales.
- **Propiedades**: alta, edición, duplicar y eliminar, con buscador, estado (Disponible,
  Reservada, Vendida, Alquilada: se ve como un sello en la ficha pública), la propiedad
  "pausada" no se muestra en el sitio, y una casilla para marcarla como la destacada del home.
- **Fotos**: hasta 4 por propiedad, se cargan desde el celular o la PC (`<input type="file"
  capture>`), se redimensionan solas en el navegador (máximo 1200px, JPEG ~75% calidad) antes de
  guardarse.
- **Datos del negocio**: WhatsApp, teléfono, dirección, horarios por día y la novedad del home,
  editables desde la pestaña "Datos del negocio".

### Fuente de datos alternativa: Google Sheets

Todo el código está preparado para que, en un cliente real, la lista de propiedades salga de una
planilla de Google Sheets pública en vez de vivir en el navegador. Para activarlo:

1. En Google Sheets: `Archivo → Compartir → Publicar en la Web`, elegir la hoja y el formato CSV,
   copiar el link.
2. En `src/config.ts`, cambiar:
   ```ts
   export const FUENTE_DATOS = { tipo: 'sheets', csvUrl: 'https://docs.google.com/.../pub?output=csv' }
   ```
3. Columnas esperadas en la planilla (encabezados exactos):

   `referencia, titulo, tipo, operacion, moneda, precio, precioTexto, m2, m2Terreno, dormitorios,
   banos, garage, patio, zona, direccion, descripcion, caracteristicas, estado, publicada, foto`

   - `tipo`: Casa / Apartamento / Terreno / Chacra / Local comercial
   - `operacion`: Venta / Alquiler · `moneda`: USD / UYU
   - `garage`, `patio`, `publicada`: Sí / No
   - `caracteristicas`: separadas por `|` (ej. `Garaje|Parrillero`)
   - `foto`: una URL de imagen (esta fuente no admite las 4 fotos del panel, solo una)

Con `FUENTE_DATOS.tipo === 'sheets'`, el panel deja de mostrar el formulario de propiedades y
avisa que se editan en la planilla; los datos del negocio se siguen editando desde el panel.
El parser de CSV propio (soporta comillas y comas dentro de un campo) se puede probar con
`npm run test:csv`.

## Cómo correrlo

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción (a dist/)
npm run preview  # sirve el build de producción localmente
```

## Cómo cambiar los datos del negocio

- `src/config.ts`: nombre de la inmobiliaria, WhatsApp, teléfono, dirección, horario, y los datos
  de crédito del autor (`AUTOR`).
- La forma recomendada de cambiar datos día a día es el **panel** (`#/admin`, ver arriba): ahí se
  edita todo sin tocar código y los cambios quedan guardados en el navegador.
- `src/data/propiedades.ts`: son los datos de ejemplo que usa el sitio la primera vez (y a los que
  vuelve "Restaurar datos de ejemplo" del panel). Cada propiedad tiene un array `fotos` (hasta 4):
  si está vacío se muestra la ilustración SVG generada; si tiene URLs o dataURLs, se muestran esas
  fotos con galería en la ficha.

- `src/components/LogoStrip.tsx`: lista `aliados` con los nombres de la cinta de "Nos confían".
- `src/components/Testimonios.tsx`: testimonios de clientes.

## Cómo deployar

- **Vercel**: importar el repositorio, framework detectado automáticamente (Vite). No requiere
  configuración adicional.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages / subcarpetas**: el proyecto ya tiene `base: './'` en `vite.config.ts`, así que el
  build funciona tanto en la raíz de un dominio como en una subcarpeta.

## Notas

- No hay backend ni base de datos: los formularios arman enlaces de WhatsApp, no envían datos a
  ningún servidor.
- El mapa embebido de Google Maps puede no cargar en entornos sin salida a internet (por ejemplo,
  sandboxes de desarrollo); en producción funciona sin problema.
- No se usa contenido, fotos ni información real de ninguna inmobiliaria existente.
