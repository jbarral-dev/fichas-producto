# R4StatItem / R4Stats · y la regla de ejes agnósticos al dispositivo

Reestructura de septiembre de 2026. Archivo: `R4 Design System | Primitivos | 1.2`.
Nodos: `R4StatItem` 25682:70 · `R4Stats` 27472:816.

## 1. La regla que sale de aquí (aplicable a todo el sistema)

> `mediaQuery` solo existe en los componentes cuyo objeto de diseño **es la página en un
> breakpoint**: Template, Wrapper, Menu, Footer. Todo lo que va dentro usa ejes semánticos
> (`size`, `columns`, `density`).

Razones:

1. **Nombra la causa, no el efecto.** "mobile" no es una propiedad del componente, es una
   circunstancia del observador. Lo que cambia es el tamaño tipográfico: eso es `size`.
2. **No compone.** Un eje `mediaQuery` en el contenedor no propaga a los hijos dentro de un slot,
   y una página desktop tiene sidebars, modales y columnas estrechas donde el ancho disponible no
   tiene relación con el viewport.
3. **No traduce a código.** Nadie escribe `<R4Stats mediaQuery="mobile">` en Vue. El dev escribe
   `size="small"` o lo resuelve en CSS. Un prop `mediaQuery` obliga al dev a ignorarlo, y en ese
   momento el Figma miente sobre el componente.
4. **Container queries.** El comportamiento correcto es responder al ancho del contenedor.

Efecto colateral: **desaparece la necesidad de variantes tablet** en los componentes de contenido.
Solo las Templates y el Wrapper modelan breakpoints.

Contraejemplo que motivó la decisión: la landing de Crescenta usa en desktop una fila de 4 cifras
pequeñas en caja. Con un eje `mediaQuery` ese caso es inexpresable sin mentir.

## 2. Modelo final

### R4StatItem (antes `statItem`)

| Propiedad | Tipo | Valores |
|---|---|---|
| `size` | VARIANT | `large` (importe a size/heading/l, 40) · `small` (size/heading/m, 32) |
| `label`, `amount`, `unit` | TEXT | — |
| `showIcon`, `showHelp` | BOOLEAN | — |
| `separatorRight`, `separatorBottom` | BOOLEAN | ambos `false` por defecto |

- **Sin eje `style`.** El item nunca pinta fondo ni borde. La caja la pone `CardContainer`, que ya
  existe con radio y estados. Se eliminaron las variantes `style=boxed` (no tenían instancias).
- **Sin `mediaQuery`.** `desktop` → `size=large`, `mobile` → `size=small`.
- La capa `bottom` pasa a llamarse `content` (nombre semántico, no posicional).
- El `R4Icon` anidado queda **expuesto** (`isExposedInstance`), así que el glifo se cambia desde el
  panel del propio item sin bajar al anidado.
- El `label` hace wrap (`textAutoResize=HEIGHT` + `FILL`); antes desbordaba con etiquetas largas.
  El botón de ayuda se alinea a la primera línea.

### R4Stats

| Propiedad | Tipo | Valores |
|---|---|---|
| `columns` | VARIANT | `1` · `2` · `3` · `4` |
| `slot` | SLOT | `stretchChildOnInsert: true`, sin restricción de valores, preferred = R4StatItem |

- `orientation` **no existe como eje**: `columns=1` *es* la disposición vertical.
- El área de items es una **rejilla nativa** (`items`), no un frame por fila. 6 items con
  `columns=3` dan 2 filas de 3 sin capas adicionales. Columnas `FLEX 1` (se reparten el ancho que
  les dé el Wrapper), filas `HUG`.
- Gutters: `spacing/10` entre columnas; `spacing/10` entre filas salvo en `columns=1`, que usa
  `spacing/6`.

## 3. Separadores

Los pone el **item**, no el contenedor, porque Figma no tiene divisorias nativas en auto-layout.
Son rectángulos de 1px posicionados en absoluto **dentro del gutter**: 20px a la derecha (mitad de
`spacing/10`) y 12px abajo (mitad de `spacing/6`), con constraints `MAX`/`STRETCH` para que sigan
al borde cuando el item se estira.

Regla de uso:

- `separatorRight` en todos menos el último de cada fila.
- `separatorBottom` solo en `columns=1`, en todos menos el último.

Esto corrige el bug anterior: el separador colgando detrás del último item.

## 4. Receta responsive (sustituye al eje de dispositivo)

| Contexto | `columns` | `size` |
|---|---|---|
| Desktop, ancho completo (12 col) | 3 o 4 | large |
| Desktop, media caja (6 col) o modal | 2 | small |
| Tablet | 2 | large |
| Mobile | 1 | small |

Lo que se pierde al quitar `mediaQuery` es el acoplamiento automático. Se compensa con esta tabla y
con que las Templates mobile traigan ya el contenido por defecto correcto.

## 5. Limitaciones de Figma encontradas (para futuras reestructuras)

- **Un SLOT no admite `layoutMode = 'GRID'`**: *"GRID layoutMode cannot be applied to Slot frames"*.
  Por eso la rejilla es un frame `items` **dentro** del slot. Es una capa, pero una sola para todas
  las filas, no una por fila.
- **`gridRowSizes` no acepta `AUTO`**: los valores válidos son `FLEX`, `FIXED` y `HUG`. Sin `HUG`,
  las filas se aplastan y los items se solapan.
- **`clone()` de una variante con slot pierde el nodo SLOT.** Para añadir variantes a un set con
  slot hay que crear el COMPONENT a mano, meter un FRAME normal, hacer `appendChild` al set y
  **enlazarlo a la propiedad de slot existente** con
  `componentPropertyReferences = { slotContentId: '<clave>' }`. Verificado: en la instancia ese
  frame se materializa como SLOT y acepta hijos.
- **`gridRowCount` hay que subirlo a mano** al añadir filas, o la rejilla recorta.
- **Reordenar variantes exige `layoutMode = 'NONE'`** en el set (ya documentado en R4Feature).
- **`defaultVariant` lo decide la posición en el canvas** (la de arriba a la izquierda), no el orden
  de `children`. `insertChild(0, …)` no lo cambia.
- Los children de un auto-layout con `WRAP` **sí** aceptan `FILL` (contra lo que sugiere la doc).

## 6. Pendiente

- **Clasificación**: ambos viven en el archivo de Primitivos. `R4Stats` es un bloque compuesto del
  mismo orden que R4HighlightGrid — valorar moverlo a Específicos.
- **Frames de accesibilidad** (roles, orden de lectura, orden de foco) para los dos componentes.
- **Área táctil del botón de ayuda**: 24px en visual, necesita 44px en código (WCAG 2.5.5).
  Documentado en la descripción del componente, no modelado en Figma.
- **Color semántico del valor** (positivo/negativo para variaciones y rentabilidades): no añadido
  para no multiplicar la matriz sin decisión previa. En contexto de mercados es casi obligatorio.
- **`defaultVariant` de R4Stats es `columns=1`** porque es la variante de arriba. Si se prefiere
  `columns=3`, basta arrastrarla al primer puesto.
- Si el componente ya estaba publicado, la eliminación de `style=boxed` y el renombrado de
  `mediaQuery` son **cambios rompedores** para consumidores en otros archivos. Verificado que no hay
  instancias en la página del componente, pero no en el resto de la biblioteca.
