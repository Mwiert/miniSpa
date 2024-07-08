import { createRouter, createWebHistory } from 'vue-router'
import TimeBenders from '../pages/TimeBenders.vue'

const router = createRouter({
  history: createWebHistory('./'),
  routes: [{
    path: '/timebenders',
    name: 'TimeBenders',
    component: TimeBenders,
  }
  ]
}


)

export default router
