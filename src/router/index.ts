import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/ServicesView.vue'),
    },
    {
      path: '/access',
      name: 'access',
      component: () => import('@/views/AccessView.vue'),
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('@/views/ReviewsView.vue'),
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('@/views/ReservationView.vue'),
    },
    // Hidden routes - not linked in navigation
    {
      path: '/records',
      name: 'records',
      component: () => import('@/views/HiddenRecordsView.vue'),
      meta: { hidden: true },
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: () => import('@/views/HiddenProtocolView.vue'),
      meta: { hidden: true },
    },
    {
      path: '/basement',
      name: 'basement',
      component: () => import('@/views/HiddenBasementView.vue'),
      meta: { hidden: true },
    },
    {
      path: '/staff/real',
      name: 'staff-real',
      component: () => import('@/views/HiddenStaffView.vue'),
      meta: { hidden: true },
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: () => import('@/views/HiddenTerminalView.vue'),
      meta: { hidden: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (_to.hash) return { el: _to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
