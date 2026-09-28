# Inmobiliaria Piedra Serrana — Sitio DEMO

Este proyecto es una **demostración de portafolio**, pensada para mostrarle a inmobiliarias de
Minas, Uruguay, un ejemplo de landing page. "Inmobiliaria Piedra Serrana" es el nombre de marca
solicitado para esta muestra; no representa ni atribuye afirmaciones a una empresa real. Las
propiedades, precios y datos de contacto son de ejemplo. La foto del hero es ilustrativa y no
corresponde a una propiedad anunciada en Minas; las fichas pendientes muestran un marcador.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (v4, vía `@tailwindcss/vite`)
- Mapa embebido de Google Maps (búsqueda genérica de "Minas, Uruguay", sin API key)

## Secciones incluidas

- Header con logo y menú de navegación (responsive, con menú hamburguesa en mobile)
- Hero editorial con fotografía ilustrativa y CTA a propiedades
- Propiedades destacadas: grid de 6 propiedades de ejemplo con filtro por tipo de operación
  (Todos / Venta / Alquiler) usando `useState`
- Formulario "¿Querés vender o alquilar tu propiedad?" sin backend ni almacenamiento de datos
- Consultas por WhatsApp que solo abren el contacto cuando `VITE_WHATSAPP_NUMBER` está configurado;
  de lo contrario, permiten copiar el mensaje
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

## Carga de propiedades

El inventario se mantiene en `src/data/properties.json`. El panel `/admin` usa Decap CMS para
editarlo y subir fotos a `public/uploads`.

El panel apunta al repositorio GitHub de este ejemplo. El inicio de sesión queda pendiente:
hay que publicar el sitio, elegir y configurar un proveedor OAuth del lado servidor, y otorgar
permisos GitHub al editor. No guardes contraseñas ni claves privadas en el código. Con el
backend GitHub, quien edita necesita permiso de escritura en el repositorio. Consultá la
[guía oficial de Decap para GitHub](https://decapcms.org/docs/github-backend/).

El contacto no está configurado. Para agregarlo, definí `VITE_WHATSAPP_NUMBER` con el teléfono
completo en formato internacional. Si queda vacío, no se crea ningún enlace externo. Las fotos
de anuncios y la dirección requieren datos autorizados antes de publicar.
