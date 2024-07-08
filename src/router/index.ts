import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomeView.vue'
import UIDropdown from '../components/UIDropdown.vue'
const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/summerlovers',
      name: 'summerlovers',
      component: UIDropdown
    }
  ]
})

export default router
