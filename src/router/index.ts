import { createRouter, createWebHistory } from 'vue-router'
import TimeBenders from '../pages/TimeBenders.vue'
import PinkPanthers from '../pages/PinkPanthers.vue'

const router = createRouter({
  history: createWebHistory('./'),
  routes: [{
    path: '/timebenders',
    name: 'TimeBenders',
    component: TimeBenders,
  },
  {
    path: '/pinkpanthers',
    name: 'pinkpanthers',
    component: PinkPanthers

  }
  ]
}


)

export default router
