import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { store } from '@/store/index';
import router from '@/router/index';
import { SET_USER } from '@/store/types';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

let isRefreshing = false;

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 容错：防止请求地址中有空格
    config.url = config.url?.trim();

    const { user } = store.state;
    if (user && user.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    const status = response.data.status;

    // 请求成功
    if (!status || status === 200) {
      return response;
    }

    // 登录过期
    if (status === 410000) {
      if (isRefreshing) return Promise.reject(response);
      isRefreshing = true;
      ElMessageBox.confirm(
        '您的登录已过期，您可以取消停留在此页面，或确认重新登录',
        '登录过期',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        }
      )
        .then(() => {
          // 清除登录状态并跳转到登录页
          store.commit(SET_USER, null);
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
        })
        .finally(() => {
          isRefreshing = false;
        });

      return Promise.reject(response);
    }

    // 其它错误给出提示即可，比如 400 参数错误之类的
    ElMessage.error(response.data.msg || '请求失败，请稍后重试');
    return Promise.reject(response.data);

    // // 统一处理接口响应错误，比如 token 过期无效/服务端异常等
    // if (response.data.status && response.data.status !== 200) {
    //   ElMessage.error(response.data.msg || '请求失败，请稍后重试');
    //   return Promise.reject(response.data);
    // }
    // return response;
  },
  function (error) {
    ElMessage.error(error.message || '请求失败，请稍后重试');
    return Promise.reject(error);
  }
);

// request 不支持泛型
// request.get / post/ put 支持相应数据泛型
// 由于后端包装一层数据 data ，导致访问数据比较麻烦，所以封装了 request
export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then((res) => (res.data.data || res.data) as T);
};
