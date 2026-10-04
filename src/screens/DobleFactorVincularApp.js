// Pantalla: cl-alta-2-factor-vincular-app--dk (Figma 1N0hwfNDDXiA788hCBr3bD, nodo 42:21938). Desktop.
// Datos de ejemplo (prototipo): QR y clave manual. Vendrían de backend.
import { defineComponent } from '../../vendor/vue.esm-browser.prod.js'
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
import _QrPlaceholder from './_QrPlaceholder.js'

export default defineComponent({
  name: 'DobleFactorVincularApp',
  components: { TemplateProcess, Menu, R4Wrapper, R4PageTitleProcess, R4Section, R4Steps, StepItem: _StepItem, R4Link, R4Notification, R4Button, QrPlaceholder: _QrPlaceholder },
  data: () => ({ claveManual: 'NGK3ZGB3ADVAD4BO3ZTSWLV2JZLLB7FR' }),
  // Orden del DOM = orden de lectura (título → contenido → acción); la rejilla coloca cada bloque en las columnas 4–9.
  template: `
    <TemplateProcess>
      <template #header>
        <Menu type="process" process-title="Activación doble factor" :steps="2" :current="1" />
      </template>
      <R4Wrapper is-first>
        <div class="r4-grid screen-2fa__grid">
          <div class="screen-2fa__col"><R4PageTitleProcess title="Asocia Renta 4 a un autenticador" /></div>
          <div class="screen-2fa__col screen-2fa__content">
            <R4Section>
              <div class="screen-2fa__qr-steps">
                <QrPlaceholder :size="160" />
                <R4Steps class="screen-2fa__steps">
                  <StepItem :number="1" description="Abre tu app de autenticación.">
                    <R4Link href="#" label="¿Qué es una app de autenticación?" />
                  </StepItem>
                  <StepItem :number="2" description="Escanea el código QR." />
                  <StepItem :number="3" description="Vuelve aquí y pulsa en “Continuar”." is-last />
                </R4Steps>
              </div>
            </R4Section>
            <R4Notification type="info">Si no puedes escanear el QR, introduce esta clave tu aplicación: {{ claveManual }}</R4Notification>
          </div>
          <div class="screen-2fa__col"><R4Button label="Continuar" href="#" /></div>
        </div>
      </R4Wrapper>
    </TemplateProcess>
  `,
})
