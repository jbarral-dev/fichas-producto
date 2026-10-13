// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo; Changelog SM-22060 y SM-23040 —este último, aún PENDIENTE en AEM: variante tabular, slot Switch en valor,
// slot en concepto—). API = "API componente" de Confluence (R4ListDetail, 3682271233): size (small | medium | large | extraLarge; por defecto extraLarge) e items
// (ListDetailItem[]: la doc no define su forma → aquí { concept, value, valueIcon?, info?, action? }; extras del prototipo, avisados).
// Semántica según la doc: sin acciones → <dl> con <dt>/<dd>; con acciones → <ul role="list"> y por fila un <div role="toolbar" aria-label="Acciones de {concept}">.
// Reconstruido (leído en Figma): size small y medium, orientation horizontal, valor tipo texto (con icono/bandera opcional), concepto con botón de información
// (tooltip: R4Tooltip NO está reconstruido, el botón solo emite `info`) y una acción de icono por fila. NO reconstruido: orientation vertical/tabular, _Point,
// valor account / link / switch / tag, segunda acción, size large y extraLarge (se declaran en la API pero usan los valores de medium).
// Extra: action.pressed mantiene el botón en estado pressed (y aria-expanded si action.haspopup) mientras el popover/sheet que abre está visible.
// Altura de fila: small 36 + 8 (separador) · medium 40 + 16.
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'
import Icon from '../../icons/_Icon.js'
import R4Button from './R4Button.js'

export default defineComponent({
  name: 'R4ListDetail',
  components: { Icon, R4Button },
  props: {
    size: { type: String, default: 'extraLarge', validator: (v) => ['small', 'medium', 'large', 'extraLarge'].includes(v) },
    items: { type: Array, required: true }, // { concept, value, valueIcon?, info?: { label }, action?: { icon, label } }
    ariaLabel: { type: String, default: undefined },
  },
  emits: ['info', 'action'],
  setup(props) {
    const interactive = computed(() => props.items.some((i) => i.info || i.action))
    return { interactive }
  },
  template: `
    <component :is="interactive ? 'ul' : 'dl'" class="r4-listdetail" :class="'r4-listdetail--' + size" :role="interactive ? 'list' : undefined" :aria-label="ariaLabel">
      <component :is="interactive ? 'li' : 'div'" v-for="(it, i) in items" :key="i" class="r4-listdetail__row">
        <div class="r4-listdetail__content">
          <component :is="interactive ? 'span' : 'dt'" class="r4-listdetail__concept">
            <span>{{ it.concept }}</span>
            <R4Button v-if="it.info" class="r4-listdetail__info" type="text" size="medium" icon="ic-info-circle" :aria-label="it.info.label" @click="$emit('info', it)" />
          </component>
          <component :is="interactive ? 'span' : 'dd'" class="r4-listdetail__value">
            <Icon v-if="it.valueIcon" class="r4-listdetail__value-icon" :name="it.valueIcon" />
            <span class="r4-listdetail__value-text">{{ it.value }}</span>
            <div v-if="it.action" class="r4-listdetail__actions" role="toolbar" :aria-label="'Acciones de ' + it.concept">
              <R4Button class="r4-listdetail__action" type="text" size="medium" :pressed="!!it.action.pressed" :aria-haspopup="it.action.haspopup ? 'true' : undefined" :aria-expanded="it.action.haspopup ? (it.action.pressed ? 'true' : 'false') : undefined" :icon="it.action.icon" :aria-label="it.action.label" @click="$emit('action', it, $event)" />
            </div>
          </component>
        </div>
        <div v-if="i < items.length - 1" class="r4-listdetail__divider" aria-hidden="true"></div>
      </component>
    </component>
  `,
})
