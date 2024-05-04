import { createRouter, createWebHistory } from 'vue-router'
import ActivityOneView from '@/views/ActivityOneView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ActivityOneView
    },
    {
      path: '/graphic',
      name: 'graphic',
      component: () => import('../views/ActivityTwoView.vue')
    }
  ]
})

export default router
