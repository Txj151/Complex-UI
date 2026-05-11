import { createRouter, createWebHistory } from 'vue-router'
import ExportHome from '@/views/exportHome/home.vue'
import FormHome from '@/views/formHome/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/export',
    },
    {
      path: '/export',
      name: 'export',
      component: ExportHome,
    },
    {
      path: '/form',
      name: 'form',
      component: FormHome,
    },
  ],
})

export default router
