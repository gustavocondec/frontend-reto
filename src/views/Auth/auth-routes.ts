export const authRoutes = [{
  path:'/login',
  name: 'login',
  component: ()=>import('@/layouts/default.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      path:'',
      name: 'login',
      component: ()=>import('./Login.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
}]

