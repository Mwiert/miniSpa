import { createRouter, createWebHistory } from 'vue-router'
import PowerPuffGirls from '../pages/PowerPuffGirls.vue'
const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/powerpuffgirls',
      name: 'powerpuffgirls',
      component: PowerPuffGirls
    }
  ]
})

export default router
