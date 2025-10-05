import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'view',
      component: () => import('../views/PageView.vue')
    },
    {
      path: '/customize',
      name: 'customize',
      component: () => import('../views/CustomizationPanelView.vue')
    }
  ],
})

export default router
