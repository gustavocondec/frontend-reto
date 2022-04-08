export const authRoutes = [{
  path:'/login',
  name: 'login',
  component: ()=>import('./Login.vue'),
  meta: {
    requiresAuth: false
  }
}]

