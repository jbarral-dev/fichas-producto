// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Variante usada: standalone, size small, sin icono.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Link',
  props: {
    label: { type: String, default: '' },
    href: { type: String, default: '#' },
  },
  template: `<a class="r4-link" :href="href"><slot>{{ label }}</slot></a>`,
})
