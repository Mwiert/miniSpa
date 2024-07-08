import { createRouter, createWebHistory } from 'vue-router'
import PinkPanthers from '../pages/PinkPanthers.vue'
import PowerPuffGirls from '../pages/PowerPuffGirls.vue'
const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/pinkpanthers',
      name: 'pinkpanthers',
      component: PinkPanthers
    },
    {
      path: '/powerpuffgirls',
      name: 'powerpuffgirls',
      component: PowerPuffGirls
    }
  ]
})

export default router
