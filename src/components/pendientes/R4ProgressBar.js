// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Variante Process con barra de 2 segmentos. Iconos chevron-left y close de Figma.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'
import _Icon from '../../icons/_Icon.js'

export default defineComponent({
  name: 'R4ProgressBar',
  components: { Icon: _Icon },
  props: {
    title: { type: String, default: '' },
    steps: { type: Number, default: 2 },
    current: { type: Number, default: 1 },
  },
  emits: ['back', 'close'],
  template: `
    <div class="r4-progress-bar">
      <div class="r4-progress-bar__process">
        <button class="r4-progress-bar__action" type="button" aria-label="Volver" @click="$emit('back')"><Icon name="chevron-left" /></button>
        <div class="r4-progress-bar__title">{{ title }}</div>
        <button class="r4-progress-bar__action" type="button" aria-label="Cerrar" @click="$emit('close')"><Icon name="close" /></button>
      </div>
      <div class="r4-progress-bar__track" role="progressbar" :aria-valuemin="0" :aria-valuemax="steps" :aria-valuenow="current" :aria-label="title">
        <span v-for="n in steps" :key="n" class="r4-progress-bar__segment" :class="{ 'r4-progress-bar__segment--done': n <= current }"></span>
      </div>
    </div>
  `,
})
