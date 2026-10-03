# R4Tabs · eje `layout` y migración a slot

Septiembre 2026. Archivo: `R4 Design System | Primitivos | 1.2`, página `R4Tabs`.
Nodos: `R4Tabs` 13591:3199 · `_TabItem` 13416:5227.

## 1. El problema

En mobile con 2 o 3 tabs, cada tab debería repartirse el ancho. No se podía estandarizar
porque había un **HUG en cascada**: el contenedor en HUG × HUG y los 8 `_TabItem` también en
HUG. Poner la instancia a FILL en la pantalla no servía de nada — los items seguían
apelotonados a la izquierda. Cada diseñador lo arreglaba a mano, item por item.

## 2. Modelo final

| Propiedad | Tipo | Valores |
|---|---|---|
| `type` | VARIANT | `divider` · `title` |
| `layout` | VARIANT | `scrollable` (default) · `fixed` |
| `slot` | SLOT | 2–8 hijos, solo `_TabItem`, `stretchChildOnInsert: true` |

Los 8 booleanos `Show Item1…8` **desaparecen**, sustituidos por el slot (mismo patrón que
R4Stats y R4NavigationItems).

Estructura de cada variante: el componente es un auto-layout horizontal que contiene la
`Line` en absoluto (solo en `type=divider`, constraints `STRETCH`/`MAX`) y un frame `slot`.

- `layout=fixed` — componente `primaryAxisSizingMode = FIXED` (375 de referencia), slot en
  FILL, items en FILL. Las tabs se reparten el ancho a partes iguales.
- `layout=scrollable` — componente en HUG, slot en HUG, items en HUG. Anchos naturales; en
  código, scroll horizontal.

`_TabItem`: `minWidth = 90` en las 12 variantes.

## 3. La regla de uso

> Usa `fixed` mientras ninguna etiqueta necesite truncarse. En cuanto una lo necesite,
> `scrollable`.

Receta práctica:

| Contexto | `layout` |
|---|---|
| Mobile, 2–3 tabs | `fixed` |
| Mobile, 4+ tabs o etiquetas largas | `scrollable` |
| Desktop ancho completo | `scrollable` |
| Desktop en caja estrecha o modal, 2–3 tabs | `fixed` |

El `minWidth` de 90 convierte la regla en algo autoverificable: con `fixed` y demasiadas
tabs, el contenido desborda el frame en el propio Figma. Si desborda, la variante elegida es
la equivocada.

Verificado: 2 tabs → 184+184 en 375 · 3 tabs → 120×3 · 6 tabs en `fixed` → 90 cada una y
desborda a 580.

## 4. Impacto en instancias existentes

- El `defaultVariant` sigue siendo `type=divider, layout=scrollable`, con la misma geometría
  de antes: el eje nuevo **no cambia** el aspecto de nada.
- Quitar los 8 booleanos **sí es rompedor**: las instancias pierden la configuración de qué
  tabs estaban ocultas. Hay que revisarlas una a una.
- `minWidth = 90` puede ensanchar tabs de etiqueta corta que antes medían menos.

## 5. Hallazgos de la API de Figma (para futuras migraciones a slot)

- **Una propiedad SLOT se crea por API** con
  `set.addComponentProperty(name, 'SLOT', '', { slotSettings, preferredValues })`.
  El `defaultValue` tiene que ser `''` — con `null` o `{}` falla la validación.
- **`slotSettings` vive en la propiedad, no en el nodo.** `slot.stretchChildOnInsert` no
  existe como propiedad del nodo SLOT. Consecuencia de diseño importante: **no se puede
  tener `stretchChildOnInsert` distinto por variante**. Por eso el reparto lo decide el
  sizing del contenedor (`FIXED` vs `HUG`), no el ajuste del slot.
- Un **FRAME normal se convierte en slot** asignándole
  `componentPropertyReferences = { slotContentId: '<clave>' }`. En el máster se sigue viendo
  como FRAME; en la instancia se materializa como `SLOT`. Confirmado.
- **Clona las variantes ANTES de crear el slot**: `clone()` de una variante con slot pierde
  el nodo SLOT.
- **FILL dentro de un padre en HUG no se comporta como HUG**: Figma congela el ancho del
  padre y reparte por igual entre los hijos. Por eso `scrollable` mantiene los items en HUG
  explícitamente.
- Los hijos ocultos no ocupan espacio, así que con FILL las tabs visibles se reparten solas.

## 6. Pendiente

- `_TabItem` no sigue la convención de nombrado de hijos (debería ser `tabItem`, camelCase
  sin guion bajo, como `statItem` o `navigationItem`).
- Revisar instancias en el archivo de Específicos y en los archivos de pantallas.
- Documentar el eje en la página de Confluence de R4Tabs y anotar el cambio en el Changelog.
- Valorar un patrón "Navegación por pestañas" en la sección Patrones con la regla del punto 3.
