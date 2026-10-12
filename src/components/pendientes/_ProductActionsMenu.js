// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Hijo privado de R4PageTitleProduct y de R4ButtonDock (no existe en Figma como componente propio): el botón de elipsis (R4Button secondary, solo icono) que abre un
// R4Popover con un R4NavigationItems con las acciones secundarias (doc de R4PageTitleProduct, 3876028437: «el resto de acciones van escondidas dentro del botón de menú
// que mostrará un R4Popover con un R4NavigationItems»). Accesibilidad según esa doc: botón con aria-label "Más acciones", aria-haspopup y aria-expanded.
// Apertura/cierre/posición los gestiona esta pieza (R4Popover es solo superficie): se cierra con Escape, clic fuera o al elegir una acción; `placement` decide si el popover
// se abre hacia abajo (desktop) o hacia arriba (dock de mobile). Las acciones del Figma de la ficha no traen icono ni descripción: se pintan solo con título.
import { defineComponent, ref, onMounted, onBeforeUnmount } from '../../../vendor/vue.esm-browser.prod.js'
import R4Button from './R4Button.js'
import R4Popover from './R4Popover.js'
import R4NavigationItems from './R4NavigationItems.js'

let uid = 0

export default defineComponent({
  name: '_ProductActionsMenu',
  components: { R4Button, R4Popover, R4NavigationItems },
  props: {
    actions: { type: Array, default: () => [] }, // { label, onClick? | href? }
    placement: { type: String, default: 'down', validator: (v) => ['down', 'up'].includes(v) },
  },
  emits: ['action'],
  setup(props, { emit }) {
    const open = ref(false)
    const root = ref(null)
    const menuId = `r4-actions-menu-${++uid}`
    const toggle = () => { open.value = !open.value }
    const close = () => { open.value = false }
    const onDocClick = (e) => { if (open.value && root.value && !root.value.contains(e.target)) close() }
    const onKeydown = (e) => { if (e.key === 'Escape' && open.value) { close(); root.value?.querySelector('button')?.focus() } }
    const choose = (it, e) => { e.preventDefault(); close(); if (it.onClick) it.onClick(); emit('action', it) }
    onMounted(() => document.addEventListener('click', onDocClick))
    onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
    return { open, root, menuId, toggle, onKeydown, choose }
  },
  template: `
    <div ref="root" class="r4-actionsmenu" @keydown="onKeydown">
      <R4Button class="r4-actionsmenu__trigger" type="secondary" icon="ic-ellipsis-v" aria-label="Más acciones" aria-haspopup="true" :aria-expanded="open ? 'true' : 'false'" :aria-controls="open ? menuId : undefined" @click="toggle" />
      <div v-if="open" :id="menuId" class="r4-actionsmenu__popover" :class="'r4-actionsmenu__popover--' + placement">
        <R4Popover width="default" density="none">
          <R4NavigationItems size="medium" density="narrow" :items="actions.map((a) => ({ title: a.label, linkHref: a.href || '#', _a: a }))" aria-label="Más acciones" @select="(it, e) => choose(it._a, e)" />
        </R4Popover>
      </div>
    </div>
  `,
})
