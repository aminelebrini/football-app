import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SiteHeader from './components/SiteHeader.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('SiteHeader', SiteHeader)

app.mount('#app')
