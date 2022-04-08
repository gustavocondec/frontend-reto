import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {authRoutes} from "@/views/Auth/auth-routes";

const routes: Array<RouteRecordRaw> = [
  {
    path:'/home',
    name: 'home',
    component: ()=>import('@/views/Home/Home.vue')
  },
  ...authRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})





import store from '../store/index'
router.beforeEach((to, from, next) => {
  if(to.matched.some(r=>r.meta.requiresAuth)){
    console.log('store en before each', store)
    // @ts-ignore
    if(store.state.auth.isAuthenticated) next()
    else router.push('/login')
  }else next()
})

export default router
