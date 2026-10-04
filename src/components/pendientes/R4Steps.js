// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (EN PROGRESO en el catálogo). Versión medium compacta (Changelog SM-24485).
// Solo indicador numérico; no implementa indicator=icon (SM-23524 / SM-23360).
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Steps',
  template: `<ol class="r4-steps"><slot /></ol>`,
})
