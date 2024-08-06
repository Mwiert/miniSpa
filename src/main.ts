import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import './assets/css/main.scss'
import dayjs from 'dayjs'
import SvgIcon from './components/SvgIcon.vue'
import FlexiTablePagination from '../mentors/flexitable/components/FlexiTablePagination.vue' // Adjust the path as needed


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$dayjs = dayjs

app.component('SvgIcon', SvgIcon)
app.component('FlexiTablePagination', FlexiTablePagination)

app.mount('#app')
