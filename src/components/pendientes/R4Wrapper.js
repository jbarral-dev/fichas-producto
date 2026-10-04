// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma/docs (R4Wrapper, Changelog SM-23967). Props: density, backgroundColor, isFirst (docs/templates-y-wrapper.md).
// Ejes de dispositivo (mediaQuery) resueltos con container queries, no con prop.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Wrapper',
  props: {
    density: { type: String, default: 'default', validator: (v) => ['none', 'compact', 'default', 'relaxed'].includes(v) },
    backgroundColor: { type: String, default: 'none' },
    isFirst: { type: Boolean, default: false },
  },
  template: `
    <div class="r4-wrapper" :class="['r4-wrapper--density-' + density, 'r4-wrapper--bg-' + backgroundColor, { 'r4-wrapper--first': isFirst }]">
      <div class="r4-wrapper__container"><div class="r4-wrapper__slot"><slot /></div></div>
    </div>
  `,
})
