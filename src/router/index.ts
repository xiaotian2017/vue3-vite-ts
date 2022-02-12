import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { store } from '@/store/index';

// 进度条的配置
nprogress.configure({});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// VueRouter 4 中可以不写 next 了，默认就是通过状态
router.beforeEach((to, from) => {
  nprogress.start();

  if (to.meta.requiresAuth && !store.state.user?.token) {
    // 此路由需要授权，请检查是否已登录
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    };
  }
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
