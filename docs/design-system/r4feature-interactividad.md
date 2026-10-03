# R4Feature — modelo de interactividad (decidido y aplicado, sept 2026)

Contexto: IT cuestionó en un comentario inline de Confluence la definición de Roles de R4Feature,
porque `hasCardContainer=yes` + `showR4Link=true` producía un `<a>` dentro de otro `<a>`.

## La regla adoptada

**Un solo elemento interactivo por componente. Nunca superficie clicable y R4Link a la vez.**

La interactividad NO depende de si hay CardContainer (decisión visual) sino de si hay R4Link
(decisión semántica). Cinco combinaciones válidas, encapsuladas en un eje único `interactivity`:

| interactivity | Card | R4Link | Accesibilidad |
| --- | --- | --- | --- |
| cardStatic | Sí | No | — |
| plainStatic | No | No | — |
| cardClickable | Sí | No | Toda la card clicable |
| cardLink | Sí | Sí | Solo el link clicable |
| plainLink | No | Sí | Solo el link clicable |

`plainClickable` no existe: sin contenedor no hay superficie donde pintar el state layer.
No está prohibido por convención — no es construible en Figma.

En `cardClickable` el `<a>` envuelve el **título** y se estira con `::after`; la card es un `<div>`.
Nunca se envuelve la card entera en un `<a>` (el nombre accesible sería todo el texto de la card).

Si negocio pide CTA visible + card clicable: `cardClickable` + chevron decorativo `aria-hidden="true"`.
No combinar los dos elementos interactivos.

## Fundamento externo

- eBay Playbook (design system) es taxativo y binario; no contempla híbrido.
- eBay Evo (ingeniería) sí describe un "hybrid", pero su propia página de accesibilidad lo corrige:
  el híbrido es `<div>` + delegación JS, nunca anidamiento. Se descartó el híbrido porque obliga a
  cada equipo consumidor a reimplementar la delegación (modificadores de teclado, selección de texto,
  doble evento de analítica). La regla binaria no se puede construir mal.
- Carbon: clickable tile no admite CTAs internos → usar base tile.
- Inclusive Components (Heydon), NZ Government: enlace en el título estirado con CSS.
- WCAG 2.2 eliminó el SC 4.1.1 Parsing, así que "HTML inválido" ya no es fallo de conformidad por sí;
  el patrón falla por 4.1.2 y 2.4.4, y axe lo marca como `nested-interactive`.

## Aplicado en Figma (archivo LXKe53jePjDEAVhdYCU4ed)

R4Feature component set `16394:2134`:

- 56 → **20 variantes**. Ejes: `size` × `align` × `interactivity`. Valores en camelCase.
- `showR4Link` eliminado como booleano. `linkHref` añadido como propiedad de texto.
- Eje `interaction` eliminado: era duplicación del `interaction` de la instancia anidada CardContainer,
  que ya estaba expuesta (junto con R4Link).
- Frames de accesibilidad reconstruidos para los 3 comportamientos:
  Roles `26903:178` · Orden de lectura `26904:208` · Orden de foco `26913:238`.

`_FeatureLeading` component set `26945:225` (privado, aparcado en la página de R4Feature):

- Ejes `size` (medium 40px / large 48px) × `style` (icon / number) = 4 variantes.
- Props: `icon` (INSTANCE_SWAP del glifo, default `12452:814` ic-user) y `number` (TEXT).
- Construido **clonando** R4Icon `isBoxed?=yes` y `_Number style=R4`, así que conserva las variables
  de color originales (`20037:4090` fondo icono, `19714:225` fondo número, `19714:235` texto).
- Se instancia como capa `Leading` en las 20 variantes de R4Feature, expuesta.

## Por qué el wrapper y no un eje de variante

Se probaron las tres opciones:

1. `leadingElement` como propiedad INSTANCE_SWAP de primer nivel en R4Feature: **no funciona**.
   La propiedad tiene un único `defaultValue` para todo el set y pisa el componente por variante —
   el test empírico dio el leading a 40px en `size=large` (debería ser 48px).
2. `leadingElement` como eje de variante: funciona, pero duplica la matriz a 40 variantes.
   Se llegó a aplicar y luego se revirtió.
3. **Wrapper `_FeatureLeading`** (la elegida): 20 variantes + 4 del wrapper, control como prop
   de primer nivel en el panel, y tamaño acoplado correctamente.

El wrapper necesita eje `size` porque el número usa `Exo 2 Bold` a **20px en medium y 24px en large**,
y el texto no escala al redimensionar la instancia. Con solo iconos habría bastado `style` (los
vectores sí escalan con FILL).

**Verificado empíricamente** que el acoplamiento funciona en ambos sentidos: al cambiar el `size` de
R4Feature, Figma reaplica el `size` correcto al Leading **y conserva** el `style` elegido por el
diseñador. Cambiar `interactivity` tampoco pierde el `style`.

## Aprendizajes técnicos de la API de Figma (para futuras reestructuras)

- `primaryAxisSizingMode = "AUTO"` se revierte en silencio en variantes de un component set.
  Usar `layoutSizingVertical = "HUG"`, que sí funciona.
- La exposición de instancias anidadas (`isExposedInstance`) se normaliza a nivel de component set:
  no se puede acotar por variante.
- Las anclas de grid (`gridColumnAnchorIndex`) son read-only en nodos COMPONENT. Para recolocar
  variantes hay que poner el set en `layoutMode = "NONE"` y usar x/y.
- El estado de foco de R4Link se llama `interaction=focus`, no `focused` (CardContainer sí usa `focused`).
- `componentPropertyReferences` no acepta `null` para desenlazar: hay que borrar la propiedad primero.
- Una propiedad INSTANCE_SWAP tiene un único default por component set; no sirve para nada que deba
  variar por variante. Para eso, encapsular en un wrapper con eje de variante propio.

## Pendiente / mejora futura

`_FeatureLeading` duplica conceptualmente lo que ya hacen `R4Icon isBoxed?=yes` y `_Number`.
Deja de ser duplicación si se reutiliza en otros componentes con el mismo patrón de leading —
R4NavigationItem lleva un R4Icon en la misma posición. Valorar esa unificación.
