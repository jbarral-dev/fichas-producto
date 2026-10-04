// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Solo se ha leído la variante info (icono info-circle de Figma).
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'
import _Icon from '../../icons/_Icon.js'

export default defineComponent({
  name: 'R4Notification',
  components: { Icon: _Icon },
  props: {
    type: { type: String, default: 'info' },
    text: { type: String, default: '' },
  },
  template: `
    <div class="r4-notification" :class="'r4-notification--' + type" role="note">
      <Icon class="r4-notification__icon" name="info-circle" />
      <div class="r4-notification__body"><slot>{{ text }}</slot></div>
    </div>
  `,
})
