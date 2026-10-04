// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (SIN VUE en el catálogo). Solo el título; no se han leído otras variantes.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4PageTitleProcess',
  props: {
    title: { type: String, default: '' },
  },
  template: `
    <div class="r4-page-title-process">
      <h1 class="r4-page-title-process__title"><slot>{{ title }}</slot></h1>
    </div>
  `,
})
