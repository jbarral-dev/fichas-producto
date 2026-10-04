// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Changelog SM-24225 (backgroundColor, style) y SM-22065 (showHeader).
// Solo se ha leído la variante usada en la pantalla del doble factor: tarjeta blanca con borde, sin cabecera. No se
// conoce la API real: `style`/`backgroundColor` del Changelog no se implementan porque no se han visto sus valores.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Section',
  props: {
    showHeader: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
  template: `
    <section class="r4-section">
      <header v-if="showHeader" class="r4-section__header"><slot name="header">{{ title }}</slot></header>
      <div class="r4-section__slot"><slot /></div>
    </section>
  `,
})
