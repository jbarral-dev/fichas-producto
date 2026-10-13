// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma de `FixedProductTitle` (frame "Efecto Scroll", ficha de acción mobile; sin página de Confluence ni entrada en el catálogo). Es la caja que, al hacer scroll
// en mobile y salir R4PageTitleProduct del viewport, queda fija justo debajo de la cabecera con el nombre del producto (truncado), el precio y la variación.
// Asociada a R4PageTitleProduct (Jon): la Template la muestra cuando el título emite `visible-change = false` y la mete en la cabecera sticky (debajo del Menu).
// Aparece y desaparece con fundido (fadeIn / fadeOut, 0,2 s; sin animación con prefers-reduced-motion).
// Solo mobile (el CSS la oculta a partir de 600 px). Sin interacción: texto + logo decorativo. aria-hidden mientras no es visible (v-show).
// Props (propias del prototipo; sin API definida): productName, logoURL, price, currency, variation (número, % con signo), visible.
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'

const fmt = (n) => new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

export default defineComponent({
  name: 'FixedProductTitle',
  props: {
    productName: { type: String, required: true },
    logoURL: { type: String, default: undefined },
    price: { type: Number, required: true },
    currency: { type: String, default: 'EUR' },
    variation: { type: Number, default: undefined },
    visible: { type: Boolean, default: false },
  },
  setup(props) {
    const symbol = computed(() => ({ EUR: '€', USD: '$', GBP: '£' }[props.currency] || props.currency))
    const variationText = computed(() => (props.variation === undefined ? '' : `(${props.variation >= 0 ? '+' : '−'}${fmt(Math.abs(props.variation))}%)`))
    return { symbol, variationText, fmt }
  },
  template: `
    <Transition name="r4-fixedproducttitle">
    <div v-show="visible" class="r4-fixedproducttitle" :aria-hidden="visible ? undefined : 'true'">
      <div class="r4-fixedproducttitle__left">
        <img v-if="logoURL" class="r4-fixedproducttitle__logo" :src="logoURL" alt="" aria-hidden="true" />
        <span class="r4-fixedproducttitle__name">{{ productName }}</span>
      </div>
      <div class="r4-fixedproducttitle__right">
        <span v-if="variation !== undefined" class="r4-fixedproducttitle__variation" :class="variation >= 0 ? 'is-positive' : 'is-negative'">{{ variationText }}</span>
        <span class="r4-fixedproducttitle__price">{{ fmt(price) }}{{ symbol }}</span>
      </div>
    </div>
    </Transition>
  `,
})
