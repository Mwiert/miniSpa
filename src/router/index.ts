import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
=======
import TimeBenders from '../pages/TimeBenders.vue'
import PowerPuffGirls from '../pages/PowerPuffGirls.vue'
>>>>>>> ce592a8b7598411f183fc84f2b2e3a3f2c005e6c
import SummerLovers from '../pages/SummerLovers.vue'

const router = createRouter({
  history: createWebHistory('./'),
  routes: [
<<<<<<< HEAD

    {
      path: '/summerlovers',
=======
    {
      path: '/timebenders',
      name: 'TimeBenders',
      component: TimeBenders,
    },
    {
      path: '/powerpuffgirls',
      name: 'PowerPuffGirls',
      component: PowerPuffGirls,
    },
    {
      path: '/summerLovers',
>>>>>>> ce592a8b7598411f183fc84f2b2e3a3f2c005e6c
      name: 'SummerLovers',
      component: SummerLovers
    }
  ]
})

export default router
