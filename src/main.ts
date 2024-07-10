import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import './assets/css/main.scss'
import dayjs from 'dayjs'
import SvgIcon from './components/SvgIcon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$dayjs = dayjs

app.component('SvgIcon', SvgIcon)

app.mount('#app')
