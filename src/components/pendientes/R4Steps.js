// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (EN PROGRESO en el catálogo). Props como en Figma: size (large | medium) + slot `steps` con _StepItem.
// En Figma el primer stepItem va fijo dentro del componente y el resto en el slot; aquí todos los pasos van en el slot.
// Changelog SM-24485 (medium compacta, showTitle) ya aplicado en Figma. Falta indicator=icon (R4Icon, SM-23524/SM-23360).
import { defineComponent, provide, computed } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4Steps',
  props: {
    size: { type: String, default: 'medium', validator: (v) => ['large', 'medium'].includes(v) },
  },
  setup(props) {
    provide('r4StepsSize', computed(() => props.size))
  },
  template: `<ol class="r4-steps" :class="'r4-steps--' + size"><slot /></ol>`,
})
