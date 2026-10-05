# Catálogo de componentes R4 — estado Figma / Vue / AEM

> **Fuente de este catálogo:** dashboard "Design System R4 — Estado Junio 2026" (74 componentes) +
> documentos de decisiones de septiembre 2026. **Es una foto, no la verdad en vivo.**
> Si algo no cuadra con Figma o con la librería Vue, avisa a Jon; no lo resuelvas en silencio.

## Cómo leer este catálogo

| Estado | Significa | Qué haces |
|---|---|---|
| **VUE** | Existe en la librería Vue de IT | Impórtalo y úsalo. **Nunca lo reconstruyas.** |
| **VUE+AEM** | Existe en Vue y en AEM | Igual que VUE |
| **AEM** | Solo existe en la web pública (empresa externa). **No hay Vue** | No lo uses ni lo inventes. Para y avisa |
| **EN PROGRESO** | Vue en desarrollo activo, aún no usable | Trátalo como "sin Vue" (ver flujo en `CLAUDE.md`) |
| **SIN VUE** | Diseñado en Figma, sin desarrollo | Flujo "Figma sin Vue" de `CLAUDE.md` |
| **SIN FIGMA** | Existe en producción pero no tiene diseño en Figma | Para y avisa. No hay fuente de verdad visual |

Columna **Doc**: `falta` / `desact.` según el dashboard. `—` = sin incidencia (deducido por exclusión).
Si la doc de Confluence está desactualizada o falta, **manda Figma**.

Columna **Figma**: nodo en `LXKe53jePjDEAVhdYCU4ed` (Primitivos 1.2) o `J199oWCLWyL9mly6xNdUcR` (Específicos).
`?` = pendiente de rellenar (ver sección final).

Columna **Cambios posteriores a junio**: modificaciones en Figma posteriores al dashboard.
Si aparece una, **la implementación Vue puede no estar alineada** con Figma. Compara antes de usar.

---

## 1. Existen en Vue (44)

| Componente | Estado | Doc | Figma | Import | Cambios posteriores a junio |
|---|---|---|---|---|---|
| R4Button | VUE | — | ? | ? | |
| R4Link | VUE | — | ? | ? | |
| R4Modal | VUE | — | ? | ? | Pendiente: variante Dialog |
| R4Accordion | VUE | — | ? | ? | |
| R4Tag | VUE | desact. | ? | ? | |
| R4Text | VUE | desact. | ? | ? | |
| R4Title | VUE | ok | ? | ? | Confluence actualizado (Jon, 2026-10-05): la propiedad `type` (title, subtitle, pretitle) ya no aplica. **Subtitle y Pretitle son meros estilos tipográficos de Figma, no componentes.** Pendiente: leer la página de R4Title para ver la API vigente. |

| R4Avatar | VUE | — | ? | ? | |
| R4Chip | VUE | — | ? | ? | |
| R4Sheet | VUE | — | ? | ? | |
| R4Article | VUE | — | ? | ? | |
| R4Breadcrumb | VUE | — | ? | ? | ⚠️ Se eliminó `HomeLabel`. Solo se muestra en páginas de nivel 2+ |
| R4ListDetail | VUE | — | ? | ? | |
| R4Section | VUE | — | ? | ? | ⚠️ Changelog (SM-24225): nueva prop `backgroundColor`; `style` pasa a controlar solo la estructura. Renombre de `style` a `variant` solo era candidato: **leer el código**. Pendiente reclasificar a Compuesto |
| R4SegmentedControls | VUE | — | ? | ? | UI desactualizada (pendiente) |
| R4ListIcon | VUE | falta | ? | ? | |
| R4Tabs | VUE | falta | `13591:3199` | ? | ⚠️ Nuevo eje `layout` (`scrollable`/`fixed`); 8 booleanos `Show Item1…8` sustituidos por **slot**. Cambio rompedor |
| R4CardImage | VUE | — | ? | ? | |
| R4CardAccount | VUE | — | ? | ? | Pendiente: border |
| R4CardAdvisor | VUE | — | ? | ? | |
| R4AccountSwitch | VUE | — | ? | ? | |
| R4PageTitleAccount | VUE | — | ? | ? | |
| R4Notification | VUE | desact. | ? | ? | |
| R4Result | VUE | desact. | ? | ? | Propuesta (no decidida): evolucionar a R4Feedback |
| R4Splash | VUE | desact. | ? | ? | Propuesta (no decidida): fusionar con R4Modal |
| R4ProgressBar | VUE | desact. | ? | ? | |
| R4BuyButton | VUE | falta | ? | ? | |
| R4InputText | VUE | desact. | ? | ? | |
| R4InputSelect | VUE | desact. | ? | ? | |
| R4InputCheckbox | VUE | desact. | ? | ? | |
| R4InputRadio | VUE | desact. | ? | ? | |
| R4InputSwitch | VUE | desact. | ? | ? | |
| R4InputOTP | VUE | desact. | ? | ? | |
| R4InputDate | VUE | desact. | ? | ? | |
| R4InputAmount | VUE | falta | ? | ? | |
| R4InputTextarea | VUE | desact. | ? | ? | |
| R4InputEmail | VUE | falta | ? | ? | |
| R4InputIban | VUE | falta | ? | ? | |
| R4InputNIF | VUE | falta | ? | ? | |
| R4InputPassword | VUE | falta | ? | ? | |
| R4InputNumber | VUE | falta | ? | ? | |
| R4InputPhone | VUE | falta | ? | ? | |
| R4InputUser | VUE | falta | ? | ? | |
| R4Banner | VUE+AEM | — | ? | ? | |

## 2. Solo AEM — no hay Vue (17)

Fuera del paraguas Vue. **No los uses ni los recrees sin que Jon lo pida.**

| Componente | Estado | Doc | Figma | Notas |
|---|---|---|---|---|
| R4Grid | AEM · SIN FIGMA | — | no existe | Propuesto fusionar con R4HighlightGrid |
| R4FormLead | AEM · SIN FIGMA | — | no existe | |
| R4ChartTimeseries | AEM · SIN FIGMA | — | no existe | |
| R4HeroMini | AEM · SIN FIGMA | — | no existe | Candidato a eliminar; sustituir por R4Banner |
| R4Strip | AEM · SIN FIGMA | falta | no existe | |
| R4HighlightMedia | AEM | desact. | ? | Prop `background` pendiente de deprecar (la banda de color la pone el Wrapper) |
| R4HighlightGrid | AEM | — | ? | Figma en progreso / refactorizar |
| R4Documents | AEM | — | ? | |
| R4RiskBox | AEM | falta | ? | |
| R4ChartColumn | AEM | falta | ? | |
| R4Hero | AEM | — | ? | Excluyente con R4PageTitle* |
| R4FAQ | AEM | — | ? | |
| R4Carousel | AEM | — | ? | |
| R4PageTitleProduct | AEM | desact. | ? | Figma en progreso |
| R4PageTitleSection | AEM | — | ? | |
| R4HeroHome | AEM | falta | ? | Figma en progreso |
| R4Table | AEM | falta | ? | |

## 3. Sin desarrollo Vue (15)

Existen en Figma. No hay Vue utilizable.

| Componente | Estado | Doc | Figma | Notas |
|---|---|---|---|---|
| R4NavigationItems | EN PROGRESO | — | ? | |
| R4Icon | EN PROGRESO | — | ? | |
| R4Steps | EN PROGRESO | — | ? | ⚠️ Changelog SM-24485 (evolutivo): versión `medium` más compacta (indicador 40→32 px, gap 16→12 px, padding-top de textos 8→4 px) y nueva prop `showTitle` |
| R4Tooltip | EN PROGRESO | falta | ? | Figma en progreso |
| R4CardProductSelection | EN PROGRESO | — | ? | |
| R4InputSearch | SIN VUE | falta | ? | |
| R4CardProduct | SIN VUE | — | ? | |
| R4Spinner | SIN VUE | — | ? | |
| R4PageTitleProcess | SIN VUE | falta | ? | |
| R4Skeleton | SIN VUE | — | ? | |
| R4ButtonDock | SIN VUE | falta | ? | Duda abierta: ¿componente o patrón de layout? |
| R4Badge | SIN VUE | — | ? | |
| R4Feature | SIN VUE | — | `16394:2134` | Figma en progreso / refactorizar. Changelog SM-23564: desarrollo solicitado para sustituir a R4CardIcon. Ver `r4feature-interactividad.md` |
| R4Stats | SIN VUE | — | `27472:816` | Diseñado, no publicado. Añadido al listado de Confluence después del dashboard de junio. Reestructurado en sept 2026 (`columns` × slot). Ver `r4stats-y-ejes-agnosticos.md` |
| R4StatItem | SIN VUE | — | `25682:70` | Diseñado, no publicado. `size` `large`/`small`; sin eje `style` ni `mediaQuery` |

## 4. No incluidos en el dashboard de junio

Aparecen en documentos posteriores. **Estado Vue desconocido: confirmar con IT / Jon antes de asumir nada.**

| Componente | Figma | Notas |
|---|---|---|
| R4Subtitle | — | **No es componente**: estilo tipográfico de Figma (Jon, 2026-10-05) |
| R4Pretitle | — | **No es componente**: estilo tipográfico de Figma (Jon, 2026-10-05) |
| R4Jumbo | ? | Changelog SM-24142: sustituye a BannerSimple de AEM; recoge la variante `backgroundImage` de R4HighlightMedia |
| R4Shortcuts | ? | Aparece en el Changelog (SM-18982). No está en el dashboard |
| R4CardIcon | ? | Aparece en el Changelog; R4Feature está previsto para sustituirlo |
| Wrapper (R4Wrapper) | ? | Changelog SM-23967: creación de nuevo componente. Doc en Confluence: Wrapper. Ver `templates-y-wrapper.md` |
| Templates v2 | ? | Propuesta pendiente de validar. Ver `templates-y-wrapper.md` |
| _TabItem | `13416:5227` | Privado. Hijo de R4Tabs |
| _FeatureLeading | `26945:225` | Privado. Hijo de R4Feature |
| CardContainer | ? | Superficie de card con estados. La usan R4Feature y R4StatItem |
| Menu | ? | Archivo Figma "Templates 1.0" (antiguo, de uso vigente). En proceso: `Type=Process`, incluye R4ProgressBar. Se reconstruye en `pendientes/` |
| Footer (`_Footer Default`) | ? | Archivo Figma "Templates 1.0" (antiguo, vigente). Las páginas de proceso no lo llevan |
| R4CardArticle | ? | Nombre del Changelog (SM-18984); el catálogo lo llama R4Article. Mismo componente, salvo que Jon diga otra cosa |

---

## Fuente complementaria: Changelog

`Changelog cambios` (Confluence, DIS, página `3832610825`) registra los cambios pedidos por tickets de Jira Service
Management, con su tipo (`NUEVO`, `EVOLUTIVO`, `CANCELADO`), el enlace al ticket y, cuando existe, al de AEM. **No indica si un cambio ya está en la librería Vue**,
solo que se solicitó. Úsalo para saber qué ha cambiado en un componente, no para deducir su estado de desarrollo.

## Pendiente de completar

1. **Columna Figma e Import** (`?`): rellenar con el Figma MCP (`search_design_system`, `get_metadata`) y con la
   estructura real del repo Vue de IT.
2. **Mapeo de props Figma → Vue** por componente, cuando difieran (ejes de Figma vs props reales).
3. **Estado real de Vue**: confirmar con IT. Hay discrepancias internas en el dashboard de junio que conviene aclarar
   (p. ej. "en progreso" = 8 en el resumen, pero solo 5 aparecen marcados con ↻ en la lista de sin desarrollo).
4. **Ruta/paquete de la librería Vue** y URL de Storybook por componente
   (Storybook: https://storybook-dev.renta4.es/).
