// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). Props como en Figma: text, icon, variant, content, size, interaction.
// Reconstruido: variant primary | text · size large · content text | iconAndText | icon · interaction default/hover/focused/pressed/disabled.
// NO reconstruido (no leído): variant secondary y size medium.
// `interaction` en Figma es un estado: aquí lo resuelven :hover / :focus-visible / :active / disabled.
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'
import _Icon from '../../icons/_Icon.js'

export default defineComponent({
  name: 'R4Button',
  components: { Icon: _Icon },
  props: {
    text: { type: String, default: '' },
    icon: { type: String, default: 'search' }, // nombre del componente de icono en Figma (default de Figma: search)
    variant: { type: String, default: 'primary', validator: (v) => ['primary', 'text'].includes(v) },
    content: { type: String, default: 'text', validator: (v) => ['text', 'iconAndText', 'icon'].includes(v) },
    size: { type: String, default: 'large', validator: (v) => v === 'large' },
    href: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    ariaLabel: { type: String, default: undefined }, // obligatorio en la práctica con content=icon
  },
  emits: ['click'],
  setup(props) {
    const classes = computed(() => ['r4-button', `r4-button--${props.variant}`, `r4-button--${props.size}`, `r4-button--content-${props.content}`])
    return { classes }
  },
  template: `
    <a v-if="href && !disabled" :class="classes" :href="href" :aria-label="ariaLabel" @click="$emit('click', $event)">
      <span class="r4-button__content">
        <Icon v-if="content !== 'text'" :name="icon" :size="16" />
        <span v-if="content !== 'icon'" class="r4-button__text"><slot>{{ text }}</slot></span>
      </span>
    </a>
    <button v-else :class="classes" type="button" :disabled="disabled" :aria-label="ariaLabel" @click="$emit('click', $event)">
      <span class="r4-button__content">
        <Icon v-if="content !== 'text'" :name="icon" :size="16" />
        <span v-if="content !== 'icon'" class="r4-button__text"><slot>{{ text }}</slot></span>
      </span>
    </button>
  `,
})
