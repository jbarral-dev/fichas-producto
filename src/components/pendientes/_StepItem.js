// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Hijo privado de R4Steps (en Figma: stepItem). Props como en Figma: stepNumber, title, description, showTitle, showDescription,
// showSlot, size (medium | large), indicator (number | icon), isLastItem (yes | no), slot Content.
// NO reconstruido: indicator=icon (usa R4Icon, que no está reconstruido y no se usa en esta pantalla).
import { defineComponent, inject, computed, ref } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: '_StepItem',
  props: {
    stepNumber: { type: [Number, String], default: '1' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    showTitle: { type: Boolean, default: true },
    showDescription: { type: Boolean, default: true },
    showSlot: { type: Boolean, default: false },
    size: { type: String, default: undefined }, // por defecto lo hereda de R4Steps
    indicator: { type: String, default: 'number', validator: (v) => v === 'number' },
    isLastItem: { type: String, default: 'no', validator: (v) => ['yes', 'no'].includes(v) },
  },
  setup(props) {
    const parentSize = inject('r4StepsSize', ref('medium'))
    const effectiveSize = computed(() => props.size || parentSize.value)
    return { effectiveSize }
  },
  template: `
    <li class="r4-step-item" :class="['r4-step-item--' + effectiveSize, { 'r4-step-item--last': isLastItem === 'yes' }]">
      <div class="r4-step-item__indicator-and-line">
        <span class="r4-step-item__indicator" aria-hidden="true"><span class="r4-step-item__number">{{ stepNumber }}</span></span>
        <span v-if="isLastItem === 'no'" class="r4-step-item__line" aria-hidden="true"></span>
      </div>
      <div class="r4-step-item__content">
        <div class="r4-step-item__texts">
          <p v-if="showTitle" class="r4-step-item__title">{{ title }}</p>
          <p v-if="showDescription" class="r4-step-item__description">{{ description }}</p>
        </div>
        <div v-if="showSlot" class="r4-step-item__slot"><slot /></div>
      </div>
    </li>
  `,
})
