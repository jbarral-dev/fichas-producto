import { createApp } from '../vendor/vue.esm-browser.prod.js'
import DobleFactorVincularApp from './screens/DobleFactorVincularApp.js'
import AltaCuentaDatosContacto from './screens/AltaCuentaDatosContacto.js'

// Prototipo sin router: la pantalla se elige con el hash (#alta-cuenta · #doble-factor). Por defecto, doble factor.
const screens = { 'doble-factor': DobleFactorVincularApp, 'alta-cuenta': AltaCuentaDatosContacto }
const name = location.hash.replace('#', '')
createApp(screens[name] || DobleFactorVincularApp).mount('#app')
window.addEventListener('hashchange', () => location.reload())
