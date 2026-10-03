# R4 Design System — Contexto para Claude Code

Este paquete es el contexto que necesita Claude Code para prototipar pantallas fieles al Design System R4.
**Es para Jon, no para Claude Code**: Claude Code lee `CLAUDE.md`, no este README.

## Contenido

```
R4 Design System/
├── CLAUDE.md                      reglas, flujo y recursos (lo carga Claude Code al arrancar)
├── README.md                      estas instrucciones
└── docs/design-system/
    ├── catalogo.md                estado de los componentes (Figma / Vue / AEM)
    ├── templates-y-wrapper.md
    ├── r4feature-interactividad.md
    ├── r4stats-y-ejes-agnosticos.md
    └── r4tabs-layout-y-slot.md
```

## Qué hacer

1. **Descomprime** el zip y copia su contenido (no solo `CLAUDE.md`) en una carpeta nueva llamada **"R4 Design System"**.
   `CLAUDE.md` debe quedar en la raíz y `docs/` al lado.
2. **Abre la app de escritorio de Claude → pestaña Code.** Pulsa el botón de carpeta (el que ahora pone "Claude") y
   selecciona la carpeta **"R4 Design System"**.
3. **Comprueba que los conectores de Figma y Atlassian están activos** en esa sesión. No se heredan del chat.
4. **Primer mensaje:** pídele que siga la sección **"Primeros pasos"** del `CLAUDE.md`.
   Empezará por `git init` y luego te propondrá el stack y esperará tu confirmación.
5. **Verificación opcional:** pregúntale *"¿Qué dice el catálogo sobre R4Tabs?"*. Si responde con el nodo `13591:3199`
   y el cambio a slot, ha cargado bien los documentos.
6. **Prueba de humo:** dale el enlace de Figma de una pantalla sencilla (pocos componentes) y revisa el resultado
   antes de lanzar pantallas grandes.

## Importante

- **Es una fase temporal.** Sin acceso al repo de la librería Vue de IT, Claude Code reconstruye los componentes desde
  Figma en `src/components/pendientes/`. Cuando tengas el repo o el paquete, díselo y seguirá la sección
  "Transición al repo de IT" del `CLAUDE.md`.
- **No pongas el token de Figma en ningún archivo de esta carpeta.** Si hace falta, como variable de entorno.
  Como está expuesto en tus preferencias, conviene regenerarlo.
- **El catálogo es una foto** (dashboard de junio + Changelog + documentos de septiembre). Las columnas Figma e Import
  están en gran parte pendientes (`?`). Claude Code puede completar la de Figma con el Figma MCP.
- **Mantenimiento:** cuando tomes una decisión de diseño en el chat, vuélcala a `docs/design-system/` o al `CLAUDE.md`.
  Claude Code no recuerda conversaciones: solo lo que está escrito en estos archivos.
