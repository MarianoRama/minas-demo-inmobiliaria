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
- Hero con titular grande, ilustración de marca y franja de números (años en la plaza, operaciones cerradas)
- Propiedades: 12 fichas de ejemplo con filtros por operación, tipo, dormitorios y rango de
  precio, contador de resultados, favoritos persistentes y ficha de detalle en panel modal
  accesible con botón de "Coordinar visita" por WhatsApp (mensaje prearmado con la referencia)
- Zonas donde trabaja la inmobiliaria (centro, camino a Villa Serrana, Parque Salus/Ruta 8, Ruta 12) + mapa
- Testimonios cortos (marcados como ficticios)
- "Tasamos tu propiedad": formulario que arma un mensaje de WhatsApp con los datos cargados
- Cinta de "Nos confían" con wordmarks ficticios (escribanía, constructora, banco, etc.), en
  desplazamiento continuo, con pausa al pasar el mouse
- Botón flotante de WhatsApp y footer con crédito del autor

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
- `src/data/propiedades.ts`: listado de propiedades. Cada una tiene un campo opcional `foto`: si
  se completa con una ruta o URL de imagen real, se muestra esa foto en lugar de la ilustración
  SVG generada. Ejemplo:

  ```ts
  {
    id: 1,
    referencia: 'PS-101',
    // ...
    foto: '/fotos/ps-101-fachada.jpg', // poné el archivo en /public/fotos
  }
  ```

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
