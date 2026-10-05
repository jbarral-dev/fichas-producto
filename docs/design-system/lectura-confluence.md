# Lectura completa de las fuentes autorizadas de Confluence — hallazgos (2026-10-05)

> Se leyeron las 98 páginas autorizadas de `fuentes-confluence.md` (todas `current`; la database del listado de componentes no es legible por el conector).
> Esto NO es una copia de la documentación: es la lista de **reglas que afectan a quien construye** y de **contradicciones entre páginas autorizadas** que Jon debe resolver.
> Origen: 4 lecturas en paralelo + verificación propia del caso R4Stats. Las afirmaciones marcadas «(doc)» salen de las lecturas y deben contrastarse con la página antes de apoyarse en ellas.

## 1. Reglas firmes (consistentes entre páginas)
- Tokens: cascada Foundations → Brand → Theme → Components (+ Typography y Layout por modo); capa más alta posible; nunca hex.
- Grid: 12 / 8 / 4 columnas, gutter 24. Contenido de procesos: 6/12 · 6/8 · 4/4. Resultados: 4/12 (6/12 a 1024 px).
- R4Wrapper: `density` relaxed 64/56/48 · default 48/40/32 · compact 32/28/24; gap de la grid = padding; primer Wrapper → `--wrapper-paddingTopFirstWrapper`; sin prop `isFirst`; sin `mediaQuery` en código.
- Procesos: R4ProgressBar entre Header y Main; sin Footer.
- Nomenclatura: componentes `R4PascalCase`; props y valores `camelCase`.
- La API de código está en la tabla «API componente» de cada página, no en las props de Figma (que existen solo para diseñar: `showX`, `mediaQuery`, `interaction`…).

## 2. Contradicciones entre páginas autorizadas (a resolver por Jon)
1. **Ancho máximo del contenedor a 1176 px:** R4Wrapper dice 1368; Grids, Páginas de Procesos, Área de Clientes y Potenciales dicen 1176. (Implementado: 1368.)
2. **Padding horizontal en tablet/mobile:** Grids, R4Wrapper y Procesos → 24 / 12. Área de Clientes y Potenciales (doc) → 16 / 16. (Implementado: 24 / 12.)
3. **Tablet:** Grids lo define ≥ 600 px; las tablas de páginas usan 768. (Implementado: 768.) Breakpoints Less (doc): 576 / 600 / 1024 / 1176 / 1440.
4. **`surface/page` (Light):** la página de tokens dice #FCFCFC; la variable de Figma es gray-100 #F7F7F7 y R4Wrapper `grey` = #F7F7F7. (Implementado: la variable de Figma.)
5. **Nomenclatura prohíbe `style`, `type` y `device`**, pero R4Button, R4Link, R4Notification, R4InputCheckbox (`type`) y varios `style` los usan. (Implementado: la API de cada componente.)
6. **Foco visible:** doble anillo 6 px #0B0B0B + 4 px #F7F7F7 (Button, Link, Section) frente a 3 px azul/#2B7FFF (Sheet, ListDetail y «el resto»). (Implementado: doble anillo.)
7. **Áreas táctiles:** R4Button 32/40 y R4Chip 40/32 se justifican con WCAG 2.5.5; se pide 44 px en `CLAUDE.md`. Bullets de R4Carousel de 12/16 px.
8. **R4Stats** (Confluence, 21 sept 2026): ya no hay `columns`; `orientation` + slot de 2–4 statItem y columnas por `minWidth`; statItem tiene `style` plain|boxed. **`docs/` y `CLAUDE.md` estaban obsoletos → actualizados.**
9. **R4Title / R4Subtitle / R4Pretitle:** Changelog SM-23216 canceló añadir `type`; la página de R4Title aún lo tiene (title|subtitle|pretitle) y Figma tiene Subtitle y Pretitle. Sin aclarar.
10. **`density`** significa cosas distintas: Wrapper none/compact/default/relaxed (la doc de API solo lista relaxed/default/compact), R4NavigationItems default/narrow/relaxed, R4Popover default/none.
11. **Defaults Figma ≠ API:** R4Title (`extraLarge2` vs `medium`), R4ListDetail (`large` vs `extraLarge`), R4ListIcon, R4NavigationItems (`hasCardContainer` yes vs false). Fijar el de la API.
12. **Specifics con `mediaQuery`/`device` o padding/fondo propios** (doc): R4FAQ (padding vertical 64/48), Hero, HeroHome, HighlightMedia (`background`), RichText, PageTitle*, CardAdvisor, ChartLine, RiskBox, R4Jumbo (alto fijo y fondo propio), Notification, Modal, Title. Chocan con «el Wrapper pone la banda de color/padding» y con «sin mediaQuery».
13. **Interactividad (un solo elemento interactivo):** R4CardImage (card clicable + R4Link), R4Article (`<a>` envolvente), R4CardAccount (`role=button` con `dl`), R4CardAdvisor, R4CardProduct, R4Documents combinan superficie clicable y enlaces/CTA.
14. **Páginas incompletas o sin API/a11y:** R4Tooltip («TBD»), R4Popover, R4Modal, R4Result, R4Shortcuts, R4Skeleton, R4Spinner, R4Accordion, R4Article, R4Badge, R4Banner, R4CardImage, R4CardProductSelection, R4Carousel, R4Chip, R4Divider (sin API Vue en varias). R4Table: dos APIs incompatibles (diseño y PrimeVue DataTable).
15. **Input Text y variantes** (ene 2025, Figma 1.0): errores de copy-paste (placeholder «Usuario» en Amount/IBAN, label «NIF / CIF» en User, lógica del IBAN invertida), `required` default False en la tabla pero «todos obligatorios» en el texto, sin API Vue ni a11y. Página «Inputs de texto» vacía.
16. **Catálogo vs Confluence:** R4ChartLine, R4RichText, HeaderProduct y Grid (específico) no están en `catalogo.md`; nombres que no coinciden (R4BlockHighlightMedia, R4ListConsents, R4Notificacion, R4CardList, R4Input/R4Select). «Nueva taxonomía» (jun 2026) clasifica como primitivos componentes que el catálogo da como AEM o sin Vue.
17. **R4ProgressBar:** el catálogo lo da como VUE, pero la página lo describe como cabecera de proceso completa; Figma limita `progress` a 1–3 y la API tiene `totalSteps` libre. Puede no ser el Vue existente.
18. **Templates:** la página usa Template 1/2/3 (Template 3 = procesos, Col Span 6 / 4); el repo usa TemplateProcess / Landing / Detail / Post / States (docs v2). Sin alinear.
19. **Changelog:** la columna Fecha está vacía en todas las filas.
20. **Varios:** analítica con prefijos/canales distintos (`[Channel]`, `App`, sin `R4`); snippets que invierten `eventLink`/`eventText`; Storybook en `next.renta4.es:10001` (R4Button, R4AccountSwitch) distinto del documentado; R4Chip `aria-pressed` donde debería ser `aria-expanded`; R4Divider Plain|Text vs Plain|Title; R4Icon `extraSmall` no contado en variantes; R4Section: `appearance` (API/Figma) frente a `style` (Changelog); R4Steps: catálogo 40→32 px y página large = 48.

## 3. Dónde está el detalle
Los resúmenes por página (API, accesibilidad, valores literales) se generaron en un directorio temporal y no se versionan. Se vuelven a leer en vivo con `getConfluencePage` según `fuentes-confluence.md`.
