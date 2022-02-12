import { RouteRecordRaw } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';

import productRoutes from './modules/product';
import orderRoutes from './modules/order';
import permissionRoutes from './modules/permission';
import mediaRoutes from './modules/media';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/home.vue'),
        meta: {
          title: '首页',
        },
      },
      productRoutes,
      orderRoutes,
      permissionRoutes,
      mediaRoutes,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('../views/study/study.vue'),
    meta: {
      title: 'study Vite & Vue@3 & TS',
    },
  },
];

export default [...routes];
