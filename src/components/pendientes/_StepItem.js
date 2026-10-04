// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Hijo privado de R4Steps (en Figma: stepItem). Props como en Figma: number, title, description, showTitle, isLast.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: '_StepItem',
  props: {
    number: { type: [Number, String], required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    showTitle: { type: Boolean, default: false },
    isLast: { type: Boolean, default: false },
  },
  template: `
    <li class="r4-step-item" :class="{ 'r4-step-item--last': isLast }">
      <div class="r4-step-item__indicator-and-line">
        <span class="r4-step-item__indicator" aria-hidden="true">{{ number }}</span>
        <span v-if="!isLast" class="r4-step-item__line" aria-hidden="true"></span>
      </div>
      <div class="r4-step-item__content">
        <div class="r4-step-item__texts">
          <p v-if="showTitle && title" class="r4-step-item__title">{{ title }}</p>
          <p v-if="description" class="r4-step-item__description">{{ description }}</p>
        </div>
        <div v-if="$slots.default" class="r4-step-item__slot"><slot /></div>
      </div>
    </li>
  `,
})
