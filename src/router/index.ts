import { createRouter, createWebHistory } from 'vue-router'
import TimeBenders from '../pages/TimeBenders.vue'
import PowerPuffGirls from '../pages/PowerPuffGirls.vue'
import SummerLovers from '../pages/SummerLovers.vue'
import PinkPanthers from '../pages/PinkPanthers.vue'
import HomeView from '../pages/HomeView.vue'
import FlexiTablePage from '../../mentors/flexitable/FlexiTablePage.vue'

const router = createRouter({
  history: createWebHistory('./'),
  routes: [
    {
      path: '/timebenders',
      name: 'TimeBenders',
      component: TimeBenders
    },
    {
      path: '/powerpuffgirls',
      name: 'PowerPuffGirls',
      component: PowerPuffGirls
    },
    {
      path: '/summerLovers',
      name: 'SummerLovers',
      component: SummerLovers
    },
    {
      path: '/pinkpanthers',
      name: 'PinkPanthers',
      component: PinkPanthers
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomeView
    },
    {
      path: '/flexitable',
      name: 'FlexiTablePage',
      component: FlexiTablePage
    }
  ]
})

export default router
