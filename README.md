# Inmobiliaria Cerro del Pintado — Sitio DEMO

Este proyecto es una **demostración de portafolio**, pensada para mostrarle a inmobiliarias de
Minas, Uruguay, un ejemplo de landing page moderna. "Inmobiliaria Cerro del Pintado" es un
nombre **ficticio** (en referencia al cerro homónimo de Minas), y todas las propiedades, precios,
teléfono de WhatsApp y datos de contacto son de ejemplo. No representa a ningún negocio real.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (v4, vía `@tailwindcss/vite`)
- Imágenes placeholder de [picsum.photos](https://picsum.photos/)
- Mapa embebido de Google Maps (búsqueda genérica de "Minas, Uruguay", sin API key)

## Secciones incluidas

- Header con logo y menú de navegación (responsive, con menú hamburguesa en mobile)
- Hero con degradé/SVG y CTA a la sección de propiedades
- Propiedades destacadas: grid de 6 propiedades de ejemplo con filtro por tipo de operación
  (Todos / Venta / Alquiler) usando `useState`
- Formulario "¿Querés vender o alquilar tu propiedad?" que muestra un mensaje de confirmación
  al enviarse (no hay backend, no se guarda ni envía ningún dato)
- Botón flotante de WhatsApp (número de ejemplo `+598 99 000 000`)
- Sección de zona de cobertura con mapa embebido de Minas
- Footer con datos de contacto ficticios

## Cómo correrlo

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción (a dist/)
npm run preview  # sirve el build de producción localmente
```

## Notas

- No hay backend ni base de datos: el formulario de venta/alquiler es solo de interfaz.
- No se usa contenido, fotos ni información real de ninguna inmobiliaria existente.
