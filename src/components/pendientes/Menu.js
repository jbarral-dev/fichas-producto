// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma: componente del archivo "Templates | 1.0" (antiguo, vigente). Se ha leído solo la instancia de la
// pantalla del doble factor: Type=Process, desktop. Logotipo = R4BrandTypes (SVG de Figma); icono de ayuda = ic-question-circle.
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'
import R4ProgressBar from './R4ProgressBar.js'
import R4BrandTypes from './R4BrandTypes.js'
import _Icon from '../../icons/_Icon.js'

export default defineComponent({
  name: 'Menu',
  components: { R4ProgressBar, R4BrandTypes, Icon: _Icon },
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
          <div class="menu__branding"><R4BrandTypes content="Logotype" theme="Dark" /></div>
          <a class="menu__help" href="#">
            <Icon name="ic-question-circle" />
            <span>Ayuda</span>
          </a>
        </div>
      </div>
      <R4ProgressBar v-if="type === 'process'" :title="processTitle" :steps="steps" :current="current" @back="$emit('back')" @close="$emit('close')" />
    </header>
  `,
})
