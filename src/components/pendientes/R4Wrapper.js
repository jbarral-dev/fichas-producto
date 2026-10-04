// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma de R4Wrapper (Changelog SM-23967). API = "API del componente" de Confluence (R4Wrapper, 3767762951):
// backgroundColor (none | grey | brandPrimary | brandSecondary | white), density (relaxed | default | compact), slot por defecto.
// - mediaQuery (Figma y tabla de la doc) NO existe en código: lo resuelve el CSS por el ancho de la Template (tokens por modo).
// - El primer R4Wrapper de cada página usa siempre wrapper/paddingTopFirstWrapper (48/40/32): lo aplica el CSS (:first-child), sin prop.
//   (docs/templates-y-wrapper.md proponía una prop `isFirst`; la doc de Confluence, más reciente, no la tiene: se sigue Confluence.)
// - El gap vertical de la Grid interior apunta al mismo token que el padding vertical (--r4-wrapper-gap).
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Wrapper',
  props: {
    backgroundColor: { type: String, default: 'none', validator: (v) => ['none', 'grey', 'brandPrimary', 'brandSecondary', 'white'].includes(v) },
    density: { type: String, default: 'default', validator: (v) => ['relaxed', 'default', 'compact'].includes(v) },
  },
  template: `
    <div class="r4-wrapper" :class="['r4-wrapper--density-' + density, 'r4-wrapper--bg-' + backgroundColor]">
      <div class="r4-wrapper__container"><div class="r4-wrapper__slot"><slot /></div></div>
    </div>
  `,
})
