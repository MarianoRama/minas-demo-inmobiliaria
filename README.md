# Inmobiliaria Piedra Serrana — Sitio DEMO

Este proyecto es una **demostración de portafolio**, pensada para mostrarle a inmobiliarias de
Minas, Uruguay, un ejemplo de landing page. "Inmobiliaria Piedra Serrana" es el nombre de marca
solicitado para esta muestra; no representa ni atribuye afirmaciones a una empresa real. Las
propiedades, precios y datos de contacto son de ejemplo. Las fotos de fichas y del hero son
ilustrativas, no corresponden a avisos reales en Minas y deben reemplazarse por imágenes autorizadas
antes de presentar propiedades reales.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (v4, vía `@tailwindcss/vite`)
- Mapa embebido de Google Maps (búsqueda genérica de "Minas, Uruguay", sin API key)

## Secciones incluidas

- Header con logo y menú de navegación (responsive, con menú hamburguesa en mobile)
- Hero editorial con fotografía de vivienda ilustrativa y CTA a propiedades
- Catálogo con filtros combinables por operación, tipo, zona, dormitorios y rango de precio,
  orden por precio (dentro de la misma operación), superficie o dormitorios; ficha accesible con
  galería, datos principales y consulta contextual
- Formulario "¿Querés vender o alquilar tu propiedad?" sin backend ni almacenamiento de datos
- Consultas por WhatsApp que solo abren el contacto cuando `VITE_WHATSAPP_NUMBER` está configurado;
  de lo contrario, permiten copiar el mensaje
- Sección de zona de cobertura con mapa embebido de Minas
- Footer con datos de contacto ficticios

## Fotos ilustrativas y créditos

Se usan fotos de [Unsplash](https://unsplash.com/) bajo su [licencia](https://unsplash.com/license).
La etiqueta de cada ficha y su detalle aclara que la imagen no corresponde a una propiedad anunciada.
Créditos y referencias usados:

- Hero y casa: Toa Heftiba / Unsplash, [foto original](https://unsplash.com/photos/house-with-opened-door-fv2jr89ajTE)
- Casa: Zac Gudakov / Unsplash, [foto original](https://unsplash.com/photos/wwqZ8CM21gg)
- Apartamentos: Unsplash, [interior 1](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80) y [interior 2](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80)
- Terrenos: Francesco Ungaro / Unsplash, [campo abierto](https://unsplash.com/photos/a-large-empty-field-xuXYqBC0iTc); Siebe Warmoeskerken / Unsplash, [campo abierto](https://unsplash.com/photos/empty-field-a890vXiSvqU)

Las fotos ilustrativas no representan ubicación, estado, orientación ni características de los avisos ficticios.

## Cómo correrlo

```bash
npm ci
npm run dev      # entorno de desarrollo
npm run build    # build de producción (a dist/)
npm run preview  # sirve el build de producción localmente
```

## Carga de propiedades

El inventario vive en `src/data/properties.json`. El panel `/admin` usa Decap CMS para editarlo y
subir varias imágenes por ficha a `public/uploads`. Cada foto tiene un campo de crédito; el editor
debe actualizarlo al cargar material autorizado.

El panel muestra el estado de configuración del inicio de sesión. OAuth de GitHub queda pendiente:
hay que configurar un proveedor OAuth del lado servidor para el repositorio
`MarianoRama/minas-demo-inmobiliaria` y dar acceso de escritura a las personas editoras. No se
guardan contraseñas ni claves privadas en el navegador. Consultá la
[guía oficial de Decap para GitHub](https://decapcms.org/docs/github-backend/).

El formulario no guarda solicitudes. El contacto no está configurado: definí
`VITE_WHATSAPP_NUMBER` con un teléfono completo en formato internacional para abrir consultas; si
queda vacío, ninguna acción navega a un contacto externo y se puede copiar el texto de consulta.
