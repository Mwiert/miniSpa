import { createRouter, createWebHistory } from 'vue-router'
import FlightResults from '@/pages/FlightResults.vue'
import ExamplePage from '@/pages/ExamplePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'flightresults',
      component: FlightResults
    },
    {
      path: '/ex',
      name: 'examplepage',
      component: ExamplePage
    }
  ]
})

export default router
