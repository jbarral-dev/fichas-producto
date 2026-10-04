// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma de R4InputText (era VUE en el catálogo). Props como en Figma: showLabel, showCaption, variant, status
// + los de los hijos _Input Label (text, opcional) y _Input Caption (text), y _Text (value/placeholder).
// Reconstruido: Variant=Text · Status=Default | Error | Success · estados default/hover/focused/typing/filled/disabled.
// NO reconstruido (no leído a fondo): las otras 9 variantes (Amount, IBAN, Phone, User, NIF, Password, E-mail, DataPicker, Number),
// iconos izquierdo/derecho, prefijo/sufijo, contador (showCount), botón del label y de la caption, y los _Text Info/Warning
// (no existen como Status de R4InputText).
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'

let uid = 0

export default defineComponent({
  name: 'R4InputText',
  props: {
    modelValue: { type: String, default: '' },
    showLabel: { type: Boolean, default: true },
    label: { type: String, default: 'Input Label' },
    optional: { type: Boolean, default: true }, // "Opcional" del _Input Label: muestra "(opcional)"
    showCaption: { type: Boolean, default: true },
    caption: { type: String, default: '' },
    variant: { type: String, default: 'Text', validator: (v) => v === 'Text' },
    status: { type: String, default: 'Default', validator: (v) => ['Default', 'Error', 'Success'].includes(v) },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    name: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined }, // necesario cuando showLabel=false
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const id = `r4-input-text-${++uid}`
    const classes = computed(() => ['r4-input-text', `r4-input-text--${props.status.toLowerCase()}`, { 'r4-input-text--disabled': props.disabled }])
    const onInput = (e) => emit('update:modelValue', e.target.value)
    return { id, classes, onInput }
  },
  template: `
    <div :class="classes">
      <label v-if="showLabel" class="r4-input-text__label" :for="id">
        <span class="r4-input-text__label-text">{{ label }}</span>
        <span v-if="optional" class="r4-input-text__optional">(opcional)</span>
      </label>
      <div class="r4-input-text__field">
        <input class="r4-input-text__input" :id="id" type="text" :name="name" :value="modelValue" :placeholder="placeholder || ' '"
               :disabled="disabled" :readonly="readonly" :aria-label="showLabel ? undefined : ariaLabel"
               :aria-invalid="status === 'Error' ? 'true' : undefined" :aria-describedby="showCaption && caption ? id + '-caption' : undefined"
               @input="onInput" />
      </div>
      <p v-if="showCaption && caption" :id="id + '-caption'" class="r4-input-text__caption">{{ caption }}</p>
    </div>
  `,
})
