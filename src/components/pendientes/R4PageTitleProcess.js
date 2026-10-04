// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (SIN VUE en el catálogo). Props como en Figma: title, description, showDescription, mediaQuery (desktop | mobile).
// mediaQuery: eje explícito en Figma (CLAUDE.md dice que mediaQuery solo existe en Template, Wrapper, Menu y Footer: discrepancia a
// resolver con Jon). El tamaño del título lo gobiernan los tokens por modo (size/heading/m: 32 · 28 · 24); el eje cambia gap y descripción.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4PageTitleProcess',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    showDescription: { type: Boolean, default: false },
    mediaQuery: { type: String, default: 'desktop', validator: (v) => ['desktop', 'mobile'].includes(v) },
  },
  template: `
    <div class="r4-page-title-process" :class="'r4-page-title-process--' + mediaQuery">
      <h1 class="r4-page-title-process__title"><slot>{{ title }}</slot></h1>
      <p v-if="showDescription" class="r4-page-title-process__description">{{ description }}</p>
    </div>
  `,
})
