import { createRouter, createWebHistory } from 'vue-router'
import PinkPanthers from '../pages/PinkPanthers.vue'
const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/pinkpanthers',
      name: 'pinkpanthers',
      component: PinkPanthers
    }
  ]
})

export default router
