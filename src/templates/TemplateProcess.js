// PENDIENTE-IT: no oficial. Plantilla de proceso (docs/templates-y-wrapper.md): superficie gris, Menu Type=Process, sin Footer.
// El contenido de Main son Wrappers; nada suelto.
import { defineComponent } from '../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'TemplateProcess',
  template: `
    <div class="template-process">
      <slot name="header" />
      <main class="template-process__main"><slot /></main>
    </div>
  `,
})
