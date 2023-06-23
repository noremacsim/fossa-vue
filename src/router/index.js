import { createRouter, createWebHistory } from 'vue-router'
import NewHomeView from '../views/NewHomeView.vue'
import UserView from '../views/UserView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: NewHomeView
    },
    {
      path: '/user',
      name: 'userProfile',
      component: UserView
    }
  ]
})

export default router
