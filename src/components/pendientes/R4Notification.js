// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Solo variante info. Icono dibujado a mano (no descargado de Figma).
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Notification',
  props: {
    type: { type: String, default: 'info' },
    text: { type: String, default: '' },
  },
  template: `
    <div class="r4-notification" :class="'r4-notification--' + type" role="note">
      <svg class="r4-notification__icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" />
        <rect x="9.25" y="8.75" width="1.5" height="5.5" fill="currentColor" />
        <circle cx="10" cy="6.25" r="1" fill="currentColor" />
      </svg>
      <div class="r4-notification__body"><slot>{{ text }}</slot></div>
    </div>
  `,
})
