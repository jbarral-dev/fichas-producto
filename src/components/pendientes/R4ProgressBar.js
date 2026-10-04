// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Variante Process con barra de 2 segmentos. Iconos dibujados a mano.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'R4ProgressBar',
  props: {
    title: { type: String, default: '' },
    steps: { type: Number, default: 2 },
    current: { type: Number, default: 1 },
  },
  emits: ['back', 'close'],
  template: `
    <div class="r4-progress-bar">
      <div class="r4-progress-bar__process">
        <button class="r4-progress-bar__action" type="button" aria-label="Volver" @click="$emit('back')">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <div class="r4-progress-bar__title">{{ title }}</div>
        <button class="r4-progress-bar__action" type="button" aria-label="Cerrar" @click="$emit('close')">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
        </button>
      </div>
      <div class="r4-progress-bar__track" role="progressbar" :aria-valuemin="0" :aria-valuemax="steps" :aria-valuenow="current" :aria-label="title">
        <span v-for="n in steps" :key="n" class="r4-progress-bar__segment" :class="{ 'r4-progress-bar__segment--done': n <= current }"></span>
      </div>
    </div>
  `,
})
