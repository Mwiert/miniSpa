import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import './assets/css/main.scss'
import dayjs from 'dayjs'
import { airlineName } from './filters/filters'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$filters = airlineName

app.mount('#app')
