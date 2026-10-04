// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma: componente del archivo "Templates | 1.0" (antiguo, vigente). Se ha leído solo la instancia de la
// pantalla del doble factor: Type=Process, desktop. El logotipo es un PLACEHOLDER de texto (SVG de marca sin descargar).
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'
import R4ProgressBar from './R4ProgressBar.js'

export default defineComponent({
  name: 'Menu',
  components: { R4ProgressBar },
  props: {
    type: { type: String, default: 'process' },
    processTitle: { type: String, default: '' },
    steps: { type: Number, default: 2 },
    current: { type: Number, default: 1 },
  },
  emits: ['back', 'close'],
  template: `
    <header class="menu">
      <div class="menu__bar">
        <div class="menu__bar-content">
          <div class="menu__branding" aria-label="renta4banco">
            <span class="menu__logo-mark" aria-hidden="true">r4</span>
            <span class="menu__logo-text">renta4banco</span>
          </div>
          <a class="menu__help" href="#">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.25c-.7.35-1.1.9-1.1 1.6v.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <circle cx="12" cy="17" r="1.1" fill="currentColor" />
            </svg>
            <span>Ayuda</span>
          </a>
        </div>
      </div>
      <R4ProgressBar v-if="type === 'process'" :title="processTitle" :steps="steps" :current="current" @back="$emit('back')" @close="$emit('close')" />
    </header>
  `,
})
