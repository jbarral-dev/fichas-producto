// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma de `searchResultItem` + `searchResultsList` (patrón de resultados de la ficha: derivados y «En otros mercados»). No es un componente del catálogo ni tiene
// página: solo el patrón «Búsqueda y selección de elementos» (Confluence 3950968833), que habla de buscadores y de mostrar los no disponibles con su motivo (no aplica a este uso).
// Props deducidas de Figma (sin API): logo (nombre de icono: bandera/logotipo), name, meta (string[] de la línea secundaria), price, variation (texto con signo),
// tone (auto | muted: color de la variación; auto = chart/positive|negative según el signo), href y action ({ icon, label }: botón de icono de 40 px, solo mobile).
// Interactividad (CLAUDE.md: un solo elemento interactivo): el nombre es el <a> y se estira con ::after para que toda la fila sea clicable; la acción de mobile (botón de compra
// del diseño) queda por encima. Figma lo pinta como fila clicable en desktop y fila + botón en mobile: se avisa en «Pendiente / dudas».
// Estilos: price de 16 Bold + variación xs SemiBold (default) · en mobile con acción: price 14 Regular + variación 14 Regular muted (compact, como en el Figma).
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'
import Icon from '../../icons/_Icon.js'
import R4Button from './R4Button.js'

export default defineComponent({
  name: '_SearchResultItem',
  components: { Icon, R4Button },
  props: {
    logo: { type: String, default: undefined },
    name: { type: String, required: true },
    meta: { type: Array, default: () => [] },
    price: { type: String, default: undefined },
    variation: { type: String, default: undefined },
    tone: { type: String, default: 'auto', validator: (v) => ['auto', 'muted'].includes(v) },
    href: { type: String, default: '#' },
    action: { type: Object, default: undefined },
  },
  emits: ['select', 'action'],
  setup(props) {
    const variationClass = computed(() => {
      if (props.tone === 'muted' || !props.variation) return 'is-muted'
      return props.variation.trim().startsWith('-') || props.variation.trim().startsWith('−') ? 'is-negative' : 'is-positive'
    })
    return { variationClass }
  },
  template: `
    <li class="r4-searchresult" :class="{ 'has-action': action }">
      <Icon v-if="logo" class="r4-searchresult__logo" :name="logo" />
      <div class="r4-searchresult__content">
        <div class="r4-searchresult__left">
          <a class="r4-searchresult__name" :href="href" @click="$emit('select', $event)">{{ name }}</a>
          <span v-if="meta.length" class="r4-searchresult__meta"><span v-for="(m, i) in meta" :key="i">{{ m }}</span></span>
        </div>
        <div v-if="price" class="r4-searchresult__right">
          <span class="r4-searchresult__price">{{ price }}</span>
          <span v-if="variation" class="r4-searchresult__variation" :class="variationClass">{{ variation }}</span>
        </div>
      </div>
      <R4Button v-if="action" class="r4-searchresult__action" type="text" :icon="action.icon" :aria-label="action.label" @click="$emit('action', $event)" />
    </li>
  `,
})
