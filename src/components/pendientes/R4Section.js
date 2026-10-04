// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma de R4Section (era VUE en el catálogo; Changelog SM-24225, SM-22065). Se han leído sus 12 variantes.
// Props como en Figma: showHeader, title, showHelpButton, showMoreLink, backgroundColor, mediaQuery, appearance, slot.
// - backgroundColor: transparent | white | subtleGrey. appearance: plain | boxed (plain solo existe con transparent).
// - Cabecera: título + R4Button (text, icon, large; icono ic-question-circle--solid) + R4Link ("Ver todos", standalone medium, flecha derecha).
// - mediaQuery sigue siendo un eje de Figma en este componente: aquí es prop tal cual. CLAUDE.md dice que mediaQuery solo
//   existe en Template, Wrapper, Menu y Footer: DISCREPANCIA a resolver con Jon (container queries en su lugar).
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'
import R4Button from './R4Button.js'
import R4Link from './R4Link.js'

export default defineComponent({
  name: 'R4Section',
  components: { R4Button, R4Link },
  props: {
    showHeader: { type: Boolean, default: true },
    title: { type: String, default: '' },
    showHelpButton: { type: Boolean, default: true },
    showMoreLink: { type: Boolean, default: true },
    backgroundColor: { type: String, default: 'transparent', validator: (v) => ['transparent', 'white', 'subtleGrey'].includes(v) },
    mediaQuery: { type: String, default: 'desktop', validator: (v) => ['desktop', 'tablet', 'mobile'].includes(v) },
    appearance: { type: String, default: 'plain', validator: (v) => ['plain', 'boxed'].includes(v) },
    helpLabel: { type: String, default: 'Ayuda' }, // aria-label del botón de ayuda (solo icono)
    moreLinkHref: { type: String, default: '#' },
  },
  emits: ['help', 'more'],
  setup(props) {
    const isMobile = computed(() => props.mediaQuery === 'mobile')
    const classes = computed(() => [
      'r4-section',
      `r4-section--${props.appearance}`,
      `r4-section--${props.mediaQuery}`,
      props.appearance === 'boxed' ? `r4-section--bg-${props.backgroundColor}` : null,
    ])
    return { isMobile, classes }
  },
  template: `
    <section :class="classes">
      <header v-if="showHeader" class="r4-section__header">
        <div class="r4-section__title-wrapper">
          <h2 class="r4-section__title">{{ title }}</h2>
          <R4Button v-if="showHelpButton" variant="text" content="icon" icon="ic-question-circle--solid" size="large" :aria-label="helpLabel" @click="$emit('help', $event)" />
        </div>
        <R4Link v-if="showMoreLink && !isMobile" class="r4-section__more" text="Ver todos" type="standalone" size="medium" show-icon-right icon-right="ic-angle-right" :href="moreLinkHref" @click="$emit('more', $event)" />
      </header>
      <div class="r4-section__slot"><slot /></div>
      <R4Link v-if="showMoreLink && isMobile" class="r4-section__more r4-section__more--bottom" text="Ver todos" type="standalone" size="medium" show-icon-right icon-right="ic-angle-right" :href="moreLinkHref" @click="$emit('more', $event)" />
    </section>
  `,
})
