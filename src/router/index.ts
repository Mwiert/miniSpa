import { createRouter, createWebHistory } from 'vue-router'
import FlightResults from '@/pages/FlightResults.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'flightresults',
      component: FlightResults
    }
  ]
})

export default router
