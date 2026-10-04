// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma (era VUE en el catálogo). NO hay página de Confluence con tabla de API (solo "Atomos / Checkbox",
// de dic 2024, con valores antiguos): se usan las props de Figma adaptadas a código y se declara aquí.
// Figma: R4InputCheckbox = _Input Label/Default + _Checkbox Group (de `_CheckBox with Label`) + _Input Caption.
// Props: label (título del grupo, opcional), options [{ value, text, disabled }], modelValue (array de valores marcados),
// caption, status (Default | Error), orientation (Vertical | Horizontal), required (false → label con "(opcional)").
// Reconstruido: Variant=Default; estados default/hover/focused/disabled; Status Default y Error. El caption de error se asocia con aria-describedby.
// NO reconstruido: Variant Button y Button With Description (radio-botones), estado indeterminate y el tooltip (Show Tooltip).
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'

let uid = 0

export default defineComponent({
  name: 'R4InputCheckbox',
  props: {
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, required: true },
    label: { type: String, default: undefined },
    caption: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    status: { type: String, default: 'Default', validator: (v) => ['Default', 'Error'].includes(v) },
    orientation: { type: String, default: 'Vertical', validator: (v) => ['Vertical', 'Horizontal'].includes(v) },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const id = `r4-input-checkbox-${++uid}`
    const isChecked = (value) => props.modelValue.includes(value)
    const toggle = (value, checked) => {
      const next = checked ? [...props.modelValue, value] : props.modelValue.filter((v) => v !== value)
      emit('update:modelValue', next)
    }
    const classes = computed(() => ['r4-input-checkbox', `r4-input-checkbox--${props.status.toLowerCase()}`])
    return { id, isChecked, toggle, classes }
  },
  template: `
    <fieldset :class="classes" :aria-describedby="caption ? id + '-caption' : undefined" :aria-invalid="status === 'Error' ? 'true' : undefined">
      <legend v-if="label" class="r4-input-checkbox__legend">
        <span class="r4-input-checkbox__legend-text">{{ label }}</span>
        <span v-if="!required" class="r4-input-checkbox__optional">(opcional)</span>
      </legend>
      <div class="r4-input-checkbox__group" :class="'r4-input-checkbox__group--' + orientation.toLowerCase()">
        <label v-for="(option, i) in options" :key="option.value" class="r4-input-checkbox__option" :class="{ 'r4-input-checkbox__option--disabled': option.disabled }">
          <input class="r4-input-checkbox__box" type="checkbox" :value="option.value" :checked="isChecked(option.value)" :disabled="option.disabled"
                 @change="toggle(option.value, $event.target.checked)" />
          <span class="r4-input-checkbox__text">{{ option.text }}</span>
        </label>
      </div>
      <p v-if="caption" :id="id + '-caption'" class="r4-input-checkbox__caption">{{ caption }}</p>
    </fieldset>
  `,
})
