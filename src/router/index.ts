import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import PowerPuffGirls from '../pages/PowerPuffGirls.vue'

const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/powerpuffgirls',
      name: 'powerpuffgirls',
      component: PowerPuffGirls
    }
  ]
})

export default router
