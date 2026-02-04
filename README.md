# Colegio Federico Villarreal - Website Refactorizado

## Descripción del Proyecto

Sitio web institucional del Colegio Federico Villarreal en Piura, refactorizado siguiendo principios de Clean Code, modularización y separación de responsabilidades.

## Arquitectura del Proyecto

### Estructura de Directorios

```
ERP_Federico-Villareal/
├── index.html                  # Archivo principal (120 líneas vs 646 originales)
├── components/                 # Componentes HTML reutilizables
│   ├── header.html            # Navegación y logo
│   ├── hero.html              # Sección hero con animaciones
│   ├── about.html             # Quiénes somos (historia, misión, visión)
│   ├── levels.html            # Niveles educativos (Inicial, Primaria, etc.)
│   ├── proposal.html          # Propuesta de valor
│   ├── contact.html           # Formulario de contacto/admisión
│   └── footer.html            # Footer con información de contacto
├── css/
│   ├── styles.css             # Estilos base y variables CSS
│   └── components.css         # Estilos específicos de componentes
├── js/
│   └── main.js                # Lógica principal y cargador de componentes
├── assets/
│   ├── logos/                 # Logos del colegio
│   └── img/                   # Imágenes del sitio
└── README.md                  # Este archivo
```

## Mejoras Implementadas

### 1. Modularización

* Separación del código en 7 componentes independientes.
* Cada sección es un archivo HTML independiente.
* Fácil mantenimiento y escalabilidad.

### 2. Separación de Responsabilidades

* HTML: Estructura semántica.
* CSS: Presentación visual (styles.css + components.css).
* JavaScript: Comportamiento dinámico (main.js).

### 3. Clean Code

* Código organizado y legible.
* Nombres descriptivos para variables y funciones.
* Comentarios claros y útiles.
* Reducción de 646 a aproximadamente 120 líneas en index.html.

### 4. Sistema de Componentes

* Carga dinámica mediante JavaScript (ComponentLoader).
* Componentes independientes y reutilizables.
* Carga paralela para mejor rendimiento.

## Características Mantenidas

### Sin Cambios Visuales

* Estilos, animaciones y efectos idénticos al sitio original.
* Colores corporativos (Verde #006030, Oro #D4AF37, Rojo #C00000).
* Animaciones AOS funcionando correctamente.
* Efectos hover y transiciones intactos.

### Sin Cambios Funcionales

* Navegación suave (smooth scroll).
* Formulario de contacto funcional.
* Efectos de scroll en el header.
* Tarjetas interactivas.
* Diseño responsive.

### Sin Nuevas Dependencias

* Se mantienen las mismas librerías externas:
    * Tailwind CSS
    * AOS (Animate On Scroll)
    * Font Awesome
    * Google Fonts

## Cómo Usar

### Opción 1: Abrir Directamente

Abrir index.html en un navegador moderno.

### Opción 2: Servidor Local (Recomendado)

Para evitar problemas de CORS al cargar componentes:

**Con Python:**
```bash
python -m http.server 8000
```

**Con Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Con PHP:**
```bash
php -S localhost:8000
```

Luego visitar: http://localhost:8000

## Componentes Detallados

### 1. Header (components/header.html)

* Logo del colegio.
* Menú de navegación desktop.
* Botón de admisión.
* Botón de menú móvil.

### 2. Hero (components/hero.html)

* Imagen de fondo con overlay.
* Título principal con gradiente.
* CTAs (Postula Ahora / Conoce Niveles).
* Tarjetas flotantes decorativas.

### 3. About (components/about.html)

* Galería de imágenes.
* Historia del colegio.
* Tarjetas de Misión y Visión.

### 4. Levels (components/levels.html)

* Cinco tarjetas de niveles educativos.
* Efectos hover con cambio de color.
* Iconos Font Awesome.

### 5. Proposal (components/proposal.html)

* Propuesta pedagógica.
* Cuatro pilares institucionales.
* Estadística de ingresantes.

### 6. Contact (components/contact.html)

* Formulario de admisión.
* Información de contacto.
* WhatsApp y correo electrónico.

### 7. Footer (components/footer.html)

* Información corporativa.
* Enlaces rápidos.
* Seis sedes en Piura.
* Mapa de ubicación.
* Redes sociales.

## JavaScript: Sistema de Componentes

El archivo js/main.js contiene:

* ComponentLoader: Clase para cargar componentes dinámicamente.
* loadComponent(): Carga individual de componentes.
* loadAll(): Carga paralela de todos los componentes.
* initScrollEffects(): Efectos de scroll.
* Smooth scroll para navegación entre secciones.

## CSS Estructurado

### css/styles.css
* Variables CSS personalizadas.
* Estilos base y reset.
* Utilidades generales.
* Botones y efectos.

### css/components.css
* Glass morphism.
* Efectos hover en tarjetas.
* Estados de scroll.
* Spinner de carga.
* Media queries.

## Navegadores Soportados

* Chrome / Edge (últimas dos versiones).
* Firefox (últimas dos versiones).
* Safari (últimas dos versiones).
* Opera (última versión).

## Métricas de Refactorización

| Métrica | Antes | Después | Mejora |
| --- | --- | --- | --- |
| Líneas en index.html | 646 | ~120 | 81% reducción |
| Archivos HTML | 1 | 8 | Mejor modularidad |
| Mantenibilidad | Baja | Alta | Incremento |
| Escalabilidad | Difícil | Fácil | Incremento |
| Legibilidad | Media | Alta | Incremento |

## Mantenimiento Futuro

### Agregar una Nueva Sección

1. Crear archivo en components/nueva-seccion.html.
2. Agregar contenedor en index.html:
   ```html
   <div id="nueva-seccion-component"></div>
   ```
3. Registrar el componente en js/main.js:
   ```javascript
   { path: 'components/nueva-seccion.html', target: '#nueva-seccion-component' }
   ```

### Modificar Estilos

* Colores: editar variables en Tailwind o css/styles.css.
* Componentes: editar css/components.css.
* Estilos específicos: dentro del componente correspondiente.

### Agregar Funcionalidad JavaScript

* Agregar funciones en js/main.js o crear nuevos módulos dentro de js/.

## Contacto

**Colegio Federico Villarreal**
* Correo: contacto@colegiosvillarealpiura.com
* Teléfono: +51 980 160 029
* Mapa: https://goo.gl/maps/ejemplo

Desarrollado siguiendo principios de Clean Code y buenas prácticas frontend.

Última actualización: Febrero 2026