import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  // 根路径
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router