import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
// import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core'
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser, faCartShopping, faRightFromBracket, faUserPlus, faLock, faEnvelope, fa} from '@fortawesome/free-solid-svg-icons'
import {faCcVisa, faCcAmex, faCcMastercard, faCcPaypal}  from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import $bus from './utils/Events.js'
import $pages from './data'


/* add icons to the library */
library.add(faUser,faCartShopping,faRightFromBracket,faUserPlus, faLock,faEnvelope,faCcVisa,faCcAmex, faCcMastercard, faCcPaypal)

const app = createApp(App)

app.use(router).component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.$bus = $bus // SO this is the global bus to emit events so that other components will know
app.config.globalProperties.$pages = $pages

app.mount('#app')