// PENDIENTE-IT: no oficial. Plantilla de proceso (docs/templates-y-wrapper.md y "Páginas de Procesos"): superficie gris,
// Header (Menu Type=Process, con R4ProgressBar) FIJO al hacer scroll, Main con Wrappers, sin Footer.
// La Template es el contenedor `r4page`: sus modos (Desktop / Tablet / Mobile) se resuelven por el ancho del contenedor.
// Expone `breakpoint` ('desktop' | 'tablet' | 'mobile') por provide/inject para componentes cuyo eje mediaQuery es explícito en Figma.
import { defineComponent, ref, provide, onMounted, onBeforeUnmount } from '../../vendor/vue.esm-browser.prod.js'

export default defineComponent({
  name: 'TemplateProcess',
  setup() {
    const root = ref(null)
    const breakpoint = ref('desktop')
    provide('r4Breakpoint', breakpoint)
    let observer
    const update = (width) => { breakpoint.value = width >= 1024 ? 'desktop' : width >= 768 ? 'tablet' : 'mobile' }
    onMounted(() => {
      update(root.value.clientWidth)
      observer = new ResizeObserver((entries) => update(entries[0].contentRect.width))
      observer.observe(root.value)
    })
    onBeforeUnmount(() => observer && observer.disconnect())
    return { root, breakpoint }
  },
  template: `
    <div ref="root" class="template-process">
      <div class="template-process__page r4-layout-modes">
        <div class="template-process__header"><slot name="header" /></div>
        <main class="template-process__main"><slot /></main>
      </div>
    </div>
  `,
})
