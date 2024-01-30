import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'
import SignInView from "@/views/SignInView.vue";


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
      path: '/signin',
      name: 'signin',
      component: SignInView
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
