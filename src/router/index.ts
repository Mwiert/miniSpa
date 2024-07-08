import { createRouter, createWebHistory } from 'vue-router'
import SummerLovers from '../pages/SummerLovers.vue'

const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/summerlovers',
      name: 'summerlovers',
      component: SummerLovers
    }
  ]
})

export default router
