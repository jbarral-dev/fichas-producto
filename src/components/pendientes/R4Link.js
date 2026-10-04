// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo; Changelog SM-19075: variante standalone). Props como en Figma:
// text, showText, iconLeft, showIconLeft, iconRight, showIconRight, size, type, interaction (estado: lo resuelve CSS).
// Los estados hover/focus/disabled se han leído para size small y medium; large reutiliza el mismo patrón sin haberse leído.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'
import _Icon from '../../icons/_Icon.js'

export default defineComponent({
  name: 'R4Link',
  components: { Icon: _Icon },
  props: {
    text: { type: String, default: '' },
    showText: { type: Boolean, default: true },
    iconLeft: { type: String, default: 'ic-arrow-left' },
    showIconLeft: { type: Boolean, default: false },
    iconRight: { type: String, default: 'ic-arrow-right' },
    showIconRight: { type: Boolean, default: false },
    size: { type: String, default: 'medium', validator: (v) => ['small', 'medium', 'large'].includes(v) },
    type: { type: String, default: 'standalone', validator: (v) => ['standalone', 'inline'].includes(v) },
    href: { type: String, default: '#' },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    iconPx() { return this.size === 'large' ? 18 : 16 },
  },
  template: `
    <a class="r4-link" :class="['r4-link--' + size, 'r4-link--' + type, { 'r4-link--disabled': disabled }]"
       :href="disabled ? undefined : href" :aria-disabled="disabled ? 'true' : undefined">
      <Icon v-if="showIconLeft" :name="iconLeft" :size="iconPx" />
      <span v-if="showText" class="r4-link__text"><slot>{{ text }}</slot></span>
      <Icon v-if="showIconRight" :name="iconRight" :size="iconPx" />
    </a>
  `,
})
