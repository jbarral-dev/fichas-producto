// PENDIENTE-IT: no oficial. Sustituir cuando exista en la librería Vue.
// Reconstrucción desde Figma de R4ChartLine (Específicos; no aparece en el catálogo; Confluence R4ChartLine 3512008717, de feb 2026, NO tiene tabla de API).
// Figma/Confluence: Interaction (default | hover), mediaQuery, Timeline (periods | today). Aquí:
// - mediaQuery NO existe en código (decisión de Jon): lo resuelve el CSS por el ancho del contenedor `r4page` (alturas, separaciones, tamaño del selector de periodos,
//   etiquetas del eje X —en mobile solo las de las horas pares— y etiquetas abreviadas de los periodos).
// - Sin tabla de API → props deducidas de Figma + datos que en producción vendrían de backend (extras del prototipo, avisados):
//   timeline ('today' | 'periods'), points (valores de la serie), domain, yLabels (de arriba a abajo), xLabels, progress (fracción del ancho que ocupa la serie, 0–1),
//   periods ({ label, shortLabel, value }[]) y selectedPeriod. Evento `period` (value).
// - Desktop y mobile usan el R4SegmentedControls de Figma: large (48) en desktop, medium (40) en mobile (se gobierna con --r4-segmented-height).
// Reconstruido: estado Interaction=default con el indicador en el último punto. NO reconstruido: Interaction=hover (tooltip con valores y línea de seguimiento),
// la serie de "Entradas/Salidas" ni la leyenda (de la variante de patrimonio de la doc), Timeline=periods con etiquetas de meses.
// El gráfico es informativo: role="img" con aria-label; los datos exactos deberían ofrecerse también como texto (pendiente de accesibilidad en la doc).
import { defineComponent, computed } from '../../../vendor/vue.esm-browser.prod.js'
import R4SegmentedControls from './R4SegmentedControls.js'

let uid = 0

export default defineComponent({
  name: 'R4ChartLine',
  components: { R4SegmentedControls },
  props: {
    timeline: { type: String, default: 'today', validator: (v) => ['today', 'periods'].includes(v) },
    points: { type: Array, required: true },
    yLabels: { type: Array, required: true },
    xLabels: { type: Array, required: true },
    progress: { type: Number, default: 1 },
    periods: { type: Array, default: () => [] },
    selectedPeriod: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    domain: { type: Array, default: undefined }, // [mín, máx] de los valores; por defecto los de la serie
  },
  emits: ['period'],
  setup(props) {
    const gradientId = `r4-chartline-area-${++uid}`
    // Coordenadas normalizadas 0–100 (el SVG se estira con preserveAspectRatio="none"; el trazo es vector-effect: non-scaling-stroke).
    const geometry = computed(() => {
      const n = props.points.length
      const [lo, hi] = props.domain || [Math.min(...props.points), Math.max(...props.points)]
      const span = hi - lo || 1
      const xs = props.points.map((_, i) => (n > 1 ? (i / (n - 1)) * props.progress * 100 : 0))
      const ys = props.points.map((v) => 100 - ((v - lo) / span) * 100)
      const line = xs.map((x, i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${ys[i].toFixed(2)}`).join(' ')
      const area = `${line} L${xs[n - 1].toFixed(2)} 100 L0 100 Z`
      return { line, area, last: { x: xs[n - 1], y: ys[n - 1] } }
    })
    return { gradientId, geometry }
  },
  template: `
    <div class="r4-chartline">
      <div class="r4-chartline__chart" role="img" :aria-label="ariaLabel">
        <div class="r4-chartline__y" aria-hidden="true"><span v-for="(l, i) in yLabels" :key="i">{{ l }}</span></div>
        <div class="r4-chartline__plot-col">
          <div class="r4-chartline__plot" aria-hidden="true">
            <svg class="r4-chartline__svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" class="r4-chartline__stop-top" />
                  <stop offset="1" class="r4-chartline__stop-bottom" />
                </linearGradient>
              </defs>
              <path class="r4-chartline__area" :d="geometry.area" :fill="'url(#' + gradientId + ')'" />
              <path class="r4-chartline__line" :d="geometry.line" />
            </svg>
            <div class="r4-chartline__indicator" :style="{ left: geometry.last.x + '%', top: geometry.last.y + '%' }">
              <span class="r4-chartline__indicator-line"></span><span class="r4-chartline__indicator-dot"></span>
            </div>
          </div>
          <div class="r4-chartline__x" aria-hidden="true"><span v-for="(l, i) in xLabels" :key="i">{{ l }}</span></div>
        </div>
      </div>
      <R4SegmentedControls v-if="periods.length" class="r4-chartline__periods" size="large" :items="periods" :selected-value="selectedPeriod" aria-label="Periodo del gráfico" @select="$emit('period', $event)" />
    </div>
  `,
})
