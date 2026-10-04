// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Solo el estado default: no se han leído hover/focus/disabled.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Button',
  props: {
    label: { type: String, default: '' },
    href: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  template: `
    <a v-if="href && !disabled" class="r4-button" :href="href" @click="$emit('click', $event)">
      <span class="r4-button__content"><slot>{{ label }}</slot></span>
    </a>
    <button v-else class="r4-button" type="button" :disabled="disabled" @click="$emit('click', $event)">
      <span class="r4-button__content"><slot>{{ label }}</slot></span>
    </button>
  `,
})
