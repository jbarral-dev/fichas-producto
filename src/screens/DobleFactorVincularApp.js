// Pantalla: alta del doble factor · vincular app. Figma 1N0hwfNDDXiA788hCBr3bD:
//   desktop cl-alta-2-factor-vincular-app--dk (42:21938) · mobile cl-alta-2-factor-vincular-app--mb (68:11691). Tablet: NO hay diseño.
// Responsive (docs "Páginas de Procesos"): el contenido cambia entre desktop y mobile (en mobile no hay QR: se copia el código).
// Tablet se extrapola: contenido de desktop con la rejilla de 8 columnas (6 de 8) y los tokens de modo Tablet. Pendiente de validar.
// Datos de ejemplo (prototipo): QR y clave manual; vendrían de backend.
import { defineComponent, inject, computed, ref } from '../../vendor/vue.esm-browser.prod.js'
import TemplateProcess from '../templates/TemplateProcess.js'
import Menu from '../components/pendientes/Menu.js'
import R4Wrapper from '../components/pendientes/R4Wrapper.js'
import R4PageTitleProcess from '../components/pendientes/R4PageTitleProcess.js'
import R4Section from '../components/pendientes/R4Section.js'
import R4Steps from '../components/pendientes/R4Steps.js'
import _StepItem from '../components/pendientes/_StepItem.js'
import R4Link from '../components/pendientes/R4Link.js'
import R4Notification from '../components/pendientes/R4Notification.js'
import R4Button from '../components/pendientes/R4Button.js'
import R4InputText from '../components/pendientes/R4InputText.js'
import _QrPlaceholder from './_QrPlaceholder.js'

// Contenido de la pantalla; vive dentro de la Template para poder leer su breakpoint (provide/inject).
const Content = defineComponent({
  name: 'DobleFactorVincularAppContent',
  components: { R4Wrapper, R4PageTitleProcess, R4Section, R4Steps, StepItem: _StepItem, R4Link, R4Notification, R4Button, R4InputText, QrPlaceholder: _QrPlaceholder },
  setup() {
    const breakpoint = inject('r4Breakpoint')
    const isMobile = computed(() => breakpoint.value === 'mobile')
    const claveManual = 'NGK3ZGB3ADVAD4BO3ZTSWLV2JZLLB7FR'
    const copiado = ref(false)
    const copiar = async () => {
      try { await navigator.clipboard.writeText(claveManual); copiado.value = true } catch (e) { copiado.value = false }
    }
    return { breakpoint, isMobile, claveManual, copiado, copiar }
  },
  // Orden del DOM = orden de lectura (título → contenido → acción); la rejilla coloca cada bloque en sus columnas.
  template: `
    <R4Wrapper is-first>
      <div class="r4-grid screen-2fa__grid">
        <div class="screen-2fa__col">
          <R4PageTitleProcess :title="isMobile ? 'Asocia Renta 4 a tu autenticador' : 'Asocia Renta 4 a un autenticador'" :media-query="isMobile ? 'mobile' : 'desktop'" />
        </div>

        <div v-if="!isMobile" class="screen-2fa__col screen-2fa__content">
          <R4Section :show-header="false" background-color="white" appearance="boxed" :media-query="breakpoint">
            <div class="screen-2fa__qr-steps">
              <QrPlaceholder :size="160" />
              <R4Steps class="screen-2fa__steps" size="medium">
                <StepItem step-number="1" :show-title="false" description="Abre tu app de autenticación." show-slot>
                  <R4Link href="#" text="¿Qué es una app de autenticación?" size="small" type="standalone" />
                </StepItem>
                <StepItem step-number="2" :show-title="false" description="Escanea el código QR." />
                <StepItem step-number="3" :show-title="false" description="Vuelve aquí y pulsa en “Continuar”." is-last-item="yes" />
              </R4Steps>
            </div>
          </R4Section>
          <R4Notification type="info">Si no puedes escanear el QR, introduce esta clave tu aplicación: {{ claveManual }}</R4Notification>
        </div>

        <div v-else class="screen-2fa__col screen-2fa__content screen-2fa__content--mobile">
          <R4Section :show-header="false" :show-more-link="false" background-color="transparent" appearance="plain" media-query="mobile">
            <R4Steps class="screen-2fa__steps" size="medium">
              <StepItem step-number="1" :show-title="false" description="Copia este código en tu aplicación de autenticación." show-slot>
                <R4Link href="#" text="¿Qué es una app de autenticación?" size="small" type="standalone" />
              </StepItem>
              <StepItem step-number="2" :show-title="false" description="Vuelve aquí y pulsa en “Continuar”." is-last-item="yes" />
            </R4Steps>
            <div class="screen-2fa__key">
              <R4InputText class="screen-2fa__key-input" :show-label="false" :show-caption="false" :model-value="claveManual" readonly aria-label="Código de autenticación" />
              <R4Button variant="secondary" content="icon" icon="ic-copy" size="large" aria-label="Copiar código" @click="copiar" />
            </div>
          </R4Section>
          <p class="screen-2fa__sr-only" role="status" aria-live="polite">{{ copiado ? 'Código copiado' : '' }}</p>
        </div>

        <div class="screen-2fa__col"><R4Button text="Continuar" variant="primary" content="text" size="large" href="#" /></div>
      </div>
    </R4Wrapper>
  `,
})

export default defineComponent({
  name: 'DobleFactorVincularApp',
  components: { TemplateProcess, Menu, Content },
  template: `
    <TemplateProcess>
      <template #header>
        <Menu type="process" process-title="Activación doble factor" :steps="2" :current="1" />
      </template>
      <Content />
    </TemplateProcess>
  `,
})
