import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/frontproducts',
        name: '產品列表',
        component: () => import('../views/FrontProducts.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/Cart.vue'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'backendproducts',
        component: () => import('../views/Dashboard/BackendProducts.vue'),
      },
      {
        path: 'backendorders',
        component: () => import('../views/Dashboard/BackendOrders.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
