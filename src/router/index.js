import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/subscribe',
      name: 'subscription',
      component: SubscriptionView
    },
    {
      path: '/code/:code',
      name: 'import code',
      component: HomeView
    }
  ]
})

export default router
