/**
 * 公共请求模块
 */
import request from '@/utils/request';
import { ILoginInfo, ILoginForm, ILoginResponse } from '@/api/types/common';

// interface ResponseData<T = any> {
//   status: number;
//   msg: string;
//   data: T;
// }

export const getLoginInfo = () => {
  // return request({
  //   method: 'GET',
  //   url: '/login/info',
  // });

  // return request.get<{
  //   status: number;
  //   msg: string;
  //   data: {
  //     login_logo: string;
  //     logo_rectangle: string;
  //     logo_square: string;
  //     slide: string[];
  //   };
  // }>('/login/info');

  // return request.get<
  //   ResponseData<{
  //     login_logo: string;
  //     logo_rectangle: string;
  //     logo_square: string;
  //     slide: string[];
  //   }>
  // >('/login/info');

  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info',
  });
};

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now(),
    },
    responseType: 'blob', // 请求获取图片数据
  });
};

export const login = (data: ILoginForm) => {
  return request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data,
  });
};

export const logout = () => {
  return request({
    method: 'GET',
    url: '/setting/admin/logout',
  });
};
