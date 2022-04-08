export const memberRoutes = [

  {
    path:'/member',
    name: 'member',
    component: ()=>import('@/layouts/default.vue'),
    meta: {
      requiresAuth: true
    },
    children : [
      {
        path:'',
        name: 'member',
        component: ()=>import('./Member.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]
