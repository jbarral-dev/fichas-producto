# R4 Design System — Front-end (Renta 4 Banco)

Construyes el front-end de pantallas diseñadas en Figma, siendo **100 % fiel** a los componentes, la anatomía
y las guías del Design System R4. Responde a Jon en español, de forma concisa. Infiere decisiones razonables de
contexto, pero si una inferencia afecta a un componente o a una regla de este archivo, dilo.


> **FASE ACTUAL: PROTOTIPADO, TEMPORAL.** El objetivo ahora es generar **prototipos funcionales** de las pantallas diseñadas en Figma.
> Todavía no hay acceso al repo de la librería Vue de IT, así que los componentes se **reconstruyen desde Figma** en
> `src/components/pendientes/`. **Esto es provisional**: cuando haya acceso al repo o paquete de IT, esos componentes se
> sustituirán por los oficiales (ver "Transición al repo de IT"). Construye pensando en esa sustitución.

## Los 3 ámbitos del sistema de diseño

El sistema de diseño de Renta 4 tiene tres ámbitos:

- **Figma** → librería de componentes UI, variables y foundations.
- **Storybook** → repositorio de los componentes ya pasados a código (Vue.js).
- **Confluence** → toda la documentación.

No todos los componentes diseñados en Figma están desarrollados en Vue: de ahí el flujo obligatorio de más abajo.

## Recursos

### Confluence (espacio DIS)

- Arquitectura de tokens → https://renta4.atlassian.net/wiki/spaces/DIS/pages/3694592029/Arquitectura+de+tokens
- Explicación de la estructura de los componentes → https://renta4.atlassian.net/wiki/spaces/DIS/pages/2524512346/Componentes
- Listado de los actuales componentes → https://renta4.atlassian.net/wiki/spaces/DIS/database/3145597151?atl_f=PAGETREE
  (página de tipo *database*: el conector solo devuelve metadatos). **El listado ya está volcado en `docs/design-system/catalogo.md`
  y es la fuente que se usa. No pidas a Jon un CSV ni el listado: está en la documentación.**
- Carpeta padre de Primitivos → https://renta4.atlassian.net/wiki/spaces/DIS/pages/2846457858/Primitivos
- Carpeta padre de Específicos → https://renta4.atlassian.net/wiki/spaces/DIS/pages/2822045728/Espec+ficos
- Anatomía de páginas de procesos → https://renta4.atlassian.net/wiki/spaces/DIS/pages/3497656350/P+ginas+de+Procesos
- Componente Wrapper → https://renta4.atlassian.net/wiki/spaces/DIS/pages/3767762951/Wrapper
- **Changelog de cambios** (cambios solicitados a componentes vía Jira Service Management; página estándar, legible por MCP) → https://renta4.atlassian.net/wiki/spaces/DIS/pages/3832610825/Changelog+cambios
  Indica qué se pidió cambiar, **no** si ya está implementado en Vue.
  Lectura por MCP de Atlassian: `getConfluencePage` con `cloudId: renta4.atlassian.net`, `pageId: 3832610825`,
  `contentFormat: markdown` (funciona; hay que cargar la herramienta con ToolSearch). `catalogo.md` solo resume sus entradas
  clave: **para cada componente, léelo en vivo** (paso 0 del flujo) y no vuelvas a preguntar a Jon por él.

### Figma

- **Primitivos 1.2** (el principal: variables, foundations y componentes principales) →
  https://www.figma.com/design/LXKe53jePjDEAVhdYCU4ed/R4-Design-System-%7C-Primitivos-%7C-1.2?node-id=14244-3125&t=gV2kzVq7Ys0nN3fA-0
- **Específicos 1.0** (componentes específicos / compuestos) →
  https://www.figma.com/design/J199oWCLWyL9mly6xNdUcR/R4-Design-System-%7C-Espec%C3%ADficos-%7C-1.0?node-id=1444-1056&t=cgztn1axadR05tF5-0

### Storybook (librería Vue de IT)

- https://storybook-dev.renta4.es/

## Decisiones cerradas (no volver a preguntar)

- **Catálogo y Changelog:** ver Recursos. El catálogo es `catalogo.md`; el Changelog se lee en vivo por MCP.
- **Figma:** usar el conector de Figma ya cargado (`get_metadata`, `get_design_context`, `get_screenshot`, `get_variable_defs`).
  Los conectores `plugin:design:*` pueden fallar por proxy: ignóralos.
- **Menu y Footer** son componentes del archivo Figma **"R4 Design System | Templates | 1.0"** (generación antigua, pero se
  siguen usando de momento). No están en el catálogo. Se reconstruyen desde ese archivo en `pendientes/`, como no oficiales.
  En páginas de proceso el Menu es `Type=Process` y no hay Footer (la pantalla del doble factor no lo lleva: es coherente).
  `_Browser` es solo marco de presentación: **no se construye**.
- **Stack del prototipo:** lo único conocido de IT es que usa **Vue.js**; Jon no sabe más hasta dar acceso al repo. Hasta
  entonces **decide tú sin preguntar**: Vite + Vue 3 (`<script setup>`) + TypeScript, CSS plano con variables CSS (tokens
  semánticos) y container queries, sin Tailwind, Router ni Pinia. Provisional: se alinea con IT cuando llegue el repo.
- **Hasta tener acceso al repo de IT, creas tú todos los componentes** (incluso los `VUE` del catálogo), en `pendientes/`.
- **Nombres en Figma con errata:** la propiedad del Wrapper aparece como `backgroundCorlor`. En código usa `backgroundColor`.
- **Orden en el DOM:** manda el orden de lectura lógico (título → contenido → acción), no el orden de capas de Figma.
- **Datos de prototipo** (QR, claves, textos que vendrían de backend): usa valores de ejemplo y señálalos.

## Fuentes de verdad

| Fuente | Qué es | Autoridad para |
|---|---|---|
| **Figma** | Componentes UI, variables, foundations | Visual, anatomía, ejes, tokens |
| **Librería Vue de IT** (Storybook: https://storybook-dev.renta4.es/) | Componentes ya desarrollados | **API real** (props, slots, eventos) de lo que existe |
| **Confluence** (espacio DIS, renta4.atlassian.net) | Documentación | Guías y razonamiento. **Puede estar desactualizada** |
| `docs/design-system/` | Decisiones ya tomadas | Reglas de composición |

- Archivos Figma: Primitivos `LXKe53jePjDEAVhdYCU4ed` · Específicos `J199oWCLWyL9mly6xNdUcR`.
- Si Figma, el código Vue y Confluence **discrepan**: no resuelvas en silencio. Señálalo a Jon con la diferencia concreta.
- Accede a Figma y Confluence **por MCP, en vivo**. No copies su contenido a este repo.
- Nunca escribas credenciales ni tokens en archivos del repo. Usa variables de entorno.

## Primeros pasos (mientras el proyecto no esté montado)

Si en esta carpeta todavía **no hay proyecto Vue** (`package.json`, `src/`), sigue este orden y **no empieces con pantallas reales hasta completar los pasos 1 a 3**:

1. **Control de versiones.** Si la carpeta no es un repositorio git, ejecuta `git init` y haz un primer commit con la documentación (`CLAUDE.md` y `docs/`).
2. **Proyecto base.** Antes de crearlo, **propón a Jon el stack** (Vite + Vue, versión de Vue, TypeScript sí/no, enfoque de estilos y cómo cargar los tokens) y espera su confirmación. Si Jon indica el stack que usa IT, úsalo. Crea el proyecto con la carpeta `src/components/pendientes/` ya preparada.
3. **Prueba de humo con una pantalla pequeña.** Pide a Jon el enlace de Figma de una pantalla sencilla (por ejemplo, una de proceso con pocos componentes: R4PageTitleProcess, R4InputText, R4Button). Constrúyela siguiendo el flujo obligatorio y comprueba, antes de dar nada por bueno, que has:
   - leído el Changelog y el catálogo para cada componente;
   - respetado Template y Wrapper (todo dentro de un Wrapper, `isFirst`, density);
   - guardado los componentes reconstruidos en `src/components/pendientes/`;
   - listado al final lo que has reconstruido y cuáles eran `VUE` en el catálogo.
4. **Revisión con Jon.** Muéstrale el resultado con una captura y las decisiones que hayas tenido que inferir. Si algo no encaja, propón el cambio concreto para este `CLAUDE.md` en lugar de corregirlo solo en esta sesión.
5. **Después**, pantallas más grandes (fichas de producto, Tu Cuenta, doble factor), reutilizando los componentes ya guardados en `pendientes/`.

Cuando el proyecto base exista y la prueba esté validada, esta sección deja de aplicar: Jon puede borrarla.

## Estado actual: sin acceso al código de IT

**Todavía no hay repo ni paquete de la librería Vue de IT en este proyecto.** Mientras sea así, no puedes importar
ningún componente, ni siquiera los marcados como `VUE` en el catálogo. Aplica esto:

- Trata **todos** los componentes de Figma como "existe en Figma pero no en Vue" (rama 2 del flujo): constrúyelos desde Figma en `src/components/pendientes/`.
- Para los marcados `VUE`, aun así consulta el catálogo y el Changelog: te dicen qué existe de verdad en la librería oficial y qué cambios se han pedido.
- No inventes la API de un componente que el catálogo da como existente en Vue: sin acceso al código, **no conoces sus props reales**. Construye según Figma y avisa de que es una reconstrucción.
- Los componentes `AEM`, `SIN FIGMA` o ausentes del catálogo siguen siendo "para y avisa".
- Al terminar cada tarea, lista qué componentes has reconstruido y cuáles eran `VUE` en el catálogo, para que se puedan sustituir cuando haya acceso al repo.

### Transición al repo de IT (cuando Jon lo indique)

1. Jon te dará acceso al repo o al paquete. Hasta que lo diga expresamente, esta sección sigue vigente.
2. Lee la API real de cada componente oficial y completa en el catálogo las columnas Import y mapeo de props.
3. Por cada componente de `src/components/pendientes/` que ya exista en la librería: **sustitúyelo por el oficial**, adapta las pantallas a sus props reales y elimina el archivo reconstruido. Avisa de las diferencias de API o de comportamiento.
4. Lo que siga sin existir en la librería se queda en `pendientes/`, marcado como no oficial.
5. Borra la sección "Estado actual" y el aviso de fase temporal del inicio de este archivo.

Para que la sustitución sea fácil: mantén en cada componente reconstruido los **mismos nombres y props que tiene en Figma**, no añadas API propia que no esté en el diseño, y no mezcles lógica de pantalla dentro de ellos.

## Flujo obligatorio para cada pieza de UI

Antes de escribir markup, consulta el catálogo (importado aquí abajo) y sigue este orden:

0. **Antes de usar cualquier componente, busca su nombre en el Changelog** (Confluence, enlazado en Recursos; léelo por MCP en vivo, no de memoria). Si hay cambios recientes (`EVOLUTIVO`, `NUEVO`), tenlos en cuenta y avisa a Jon de las diferencias con lo que ves en el código o en Figma. El Changelog dice qué se pidió cambiar, no si ya está implementado en Vue.
1. **Existe en Vue (VUE / VUE+AEM):** impórtalo y úsalo. **Prohibido** reconstruirlo o imitarlo con HTML propio.
   Si sus props no coinciden con los ejes de Figma, usa el mapeo del catálogo; si no hay mapeo, lee el código del componente.
   Si la columna "Cambios posteriores a junio" tiene aviso, compara Figma con el componente antes de usarlo y avisa de diferencias.
2. **Existe en Figma pero no en Vue (SIN VUE / EN PROGRESO):** puedes crearlo, con estas condiciones:
   - **Antes de construir, mira si ya existe en `src/components/pendientes/`. Si existe, reutilízalo; no lo recrees.** Un componente se construye una sola vez y se importa desde ahí en todas las pantallas. Si Figma ha cambiado respecto a la versión guardada, actualiza el archivo existente en lugar de crear otro, y avisa de qué ha cambiado.
   - Ubícalo en `src/components/pendientes/`, **nunca** mezclado con la librería oficial.
   - Obtén anatomía y estilos con `get_design_context`, `get_variable_defs` y `get_screenshot`.
   - Usa tokens semánticos (nunca primitivos), prefijo `R4`, props en camelCase y slots donde Figma use SLOT.
   - Primera línea del archivo: `// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.`
   - Al terminar la tarea, **lista los componentes que has tenido que crear**.
3. **Solo AEM, SIN FIGMA, o no aparece en el catálogo:** **para y avisa a Jon.** No inventes el componente.
4. Si una pantalla necesita algo que no cubre ningún componente, no lo improvises con HTML suelto: pregunta.

## Convenciones

- Componentes `R4Nombre`; subelementos internos con `_` (`_TabItem`). Props y valores de variante en camelCase.
- Colores, espaciado y tipografía **solo con tokens semánticos**. Arquitectura de tokens en Confluence: "Arquitectura de tokens".
- Composición por **slots**, no por listas de booleanos (`Show Item1…8` ya no existe).
- R4Section: el Changelog indica `backgroundColor` nueva y `style` limitada a la estructura. Se barajó renombrar `style` a `variant` por conflicto con el atributo HTML, sin confirmar: **lee la API real del componente en el código**.
- Frames de Figma: `cl-ficha-[tipo]--dk/mb` para fichas de producto desktop/mobile.

## Reglas de composición de página

Detalle y razonamiento en el documento importado al final. Estado: **propuesta v2 montada en Figma, pendiente de validar**.
Aplícala por defecto y avisa si Figma muestra otra cosa.

- Todo contenido vive dentro de un **Wrapper**. Nada suelto en `Main`. Un Wrapper = un bloque (salvo layouts de columnas explícitos).
- El **primer Wrapper** abre con `spacing/page-start` (48/40/32), que ignora la `density`. En la API: `isFirst`. El último sigue la `density`.
- Escala `density`: `none` 0 · `compact` 32/28/24 · `default` 48/40/32 · `relaxed` 64/56/48 (desktop/tablet/mobile). Una sola density por página (excluyendo el primero).
- La **banda de color la pone siempre el Wrapper**; los bloques (R4HighlightMedia…) van con `background=none`.
- Ningún Wrapper con `backgroundColor` igual a la superficie de página. `app` = gris (`none`, `white`, `brandPrimary`, `brandSecondary`). `marketing` = blanco (`none`, `grey`, `brandPrimary`, `brandSecondary`).
- Nunca dos Wrappers consecutivos con el mismo `backgroundColor` distinto de `none`.
- Los componentes dentro de un Wrapper **no llevan padding vertical propio**.
- **R4Hero y R4PageTitle son excluyentes.** Con Hero, los títulos de sección usan R4Title.
- El breadcrumb de R4PageTitle solo aparece en páginas de nivel 2 o más.
- Las páginas de proceso no llevan Footer.
- El ancho de contenido lo fija la template, no la pantalla.

## Responsive: ejes agnósticos al dispositivo

Detalle en el documento de ejes agnósticos importado al final.

- `mediaQuery` **solo** existe en Template, Wrapper, Menu y Footer. Dentro, se usan ejes semánticos (`size`, `columns`, `density`).
- El comportamiento responsive se resuelve con **container queries** (ancho del contenedor, no del viewport).
- R4Stats: desktop ancho completo `columns` 3–4 + `size=large` · media caja o modal `columns=2` + `small` · tablet `2` + `large` · mobile `1` + `small`.
- R4Tabs (detalle en el documento importado al final): `fixed` mientras ninguna etiqueta necesite truncarse; si no, `scrollable`. Mobile con 2–3 tabs → `fixed`.

## Interactividad y accesibilidad

Detalle en el documento de interactividad importado al final.

- **Un solo elemento interactivo por componente.** Nunca superficie clicable y R4Link a la vez. Nunca `<a>` dentro de `<a>` (axe: `nested-interactive`).
- Cinco combinaciones válidas (`interactivity`): `cardStatic`, `plainStatic`, `cardClickable`, `cardLink`, `plainLink`. `plainClickable` no existe.
- `cardClickable`: el `<a>` envuelve el **título** y se estira con `::after`; la card es un `<div>`. Nunca envuelvas la card entera en un `<a>`.
- CTA visible + card clicable: `cardClickable` + chevron decorativo `aria-hidden="true"`.
- Áreas táctiles de 44 px en código aunque el visual sea menor (p. ej. botón de ayuda de R4StatItem: 24 px visual → 44 px).
- Respeta roles, orden de lectura y orden de foco definidos en los frames de accesibilidad de Figma de cada componente.

## Comandos

- Instalar / arrancar / build / test / Storybook: **[PENDIENTE: completar cuando se conozca el repo o paquete de IT]**

## Cuando haya duda

Para y pregunta antes de inventar. Es preferible una pregunta corta a un componente que luego IT tenga que rehacer.

## Documentos importados (se cargan en cada sesión)

Catálogo de componentes y estado Figma / Vue / AEM:

@docs/design-system/catalogo.md

Templates y componente Wrapper:

@docs/design-system/templates-y-wrapper.md

Ejes agnósticos al dispositivo (R4Stats):

@docs/design-system/r4stats-y-ejes-agnosticos.md

R4Tabs (eje `layout` y slot):

@docs/design-system/r4tabs-layout-y-slot.md

R4Feature (modelo de interactividad):

@docs/design-system/r4feature-interactividad.md
