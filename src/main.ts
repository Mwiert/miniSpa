import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import './assets/css/main.scss'
import dayjs from 'dayjs'
import SvgIcon from './components/SvgIcon.vue'
import SmartTablePagination from './components/SmartTable/SmartTablePagination.vue' // Adjust the path as needed

//Vue.component('SmartTablePagination', SmartTablePagination)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$dayjs = dayjs

app.component('SvgIcon', SvgIcon)
app.component('SmartTablePagination', SmartTablePagination)

app.mount('#app')
