// Auxiliar del prototipo (NO es R4Icon): pinta un icono de Figma por el nombre de su componente. Hereda el color (currentColor).
// R4Icon (EN PROGRESO en el catálogo) no está reconstruido: no se usa en esta pantalla.
import { defineComponent, computed } from '../../vendor/vue.esm-browser.prod.js'
import { icons } from './icons.js'

export default defineComponent({
  name: '_Icon',
  props: {
    name: { type: String, required: true },
    size: { type: Number, default: 0 }, // px; 0 = tamaño nativo del icono en Figma
  },
  setup(props) {
    const def = computed(() => {
      const d = icons[props.name]
      if (!d) throw new Error(`Icono "${props.name}" no registrado en src/icons/icons.js`)
      return d
    })
    const px = computed(() => props.size || def.value.size)
    return { def, px }
  },
  template: `<svg class="r4-icon" :width="px" :height="px" :viewBox="'0 0 ' + def.size + ' ' + def.size" fill="none" aria-hidden="true" focusable="false" v-html="def.markup"></svg>`,
})
