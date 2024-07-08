import { createRouter, createWebHistory } from 'vue-router'
import TimeBenders from '../pages/TimeBenders.vue'
import PowerPuffGirls from '../pages/PowerPuffGirls.vue'
const router = createRouter({
  history: createWebHistory('./'),
  routes: [{
    path: '/timebenders',
    name: 'TimeBenders',
    component: TimeBenders,
  },
  {
    path: '/powerpuffgirls',
    name: 'PowerPuffGirls',
    component: PowerPuffGirls,
  }

  ]
}


)

export default router
