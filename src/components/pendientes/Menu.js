// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma: componente "Menu" del archivo "Templates | 1.0" (antiguo, vigente). Eje Device (Desktop XL |
// Desktop | Tablet | Mobile) resuelto por el ancho de la Template (container query `r4page`), no por prop (regla de ejes agnósticos).
// Reconstruido: Type=Process, Cliente=Logado (Menu + R4ProgressBar). NO reconstruido: Type Default y Blocked, Cliente Sin logar.
// Desktop/Tablet: logotipo completo; Mobile: isotipo (R4BrandTypes Dark/White). Altura de la barra: token menuHeight (76 / 56 / 56).
import { defineComponent } from '../../../vendor/vue.esm-browser.prod.js'
import R4ProgressBar from './R4ProgressBar.js'
import R4BrandTypes from './R4BrandTypes.js'
import _MenuBranding from './_MenuBranding.js'
import _Icon from '../../icons/_Icon.js'

export default defineComponent({
  name: 'Menu',
  components: { R4ProgressBar, R4BrandTypes, MenuBranding: _MenuBranding, Icon: _Icon },
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
          <div class="menu__branding">
            <MenuBranding class="menu__branding-logotype" />
            <R4BrandTypes class="menu__branding-isotype" content="Isotype" theme="Dark" variant="White" />
          </div>
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
