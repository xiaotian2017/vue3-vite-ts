import request from '@/utils/request';
import type {
  IListForm,
  IReply,
  IVirtualReply,
  IProductListForm,
  IProduct,
} from '@/api/types/product-reply';
import { IFormData } from './types/form';

/**
 * 商品评论列表
 */
export const getReplyList = (params: IListForm) => {
  return request<{
    list: IReply[];
    count: number;
  }>({
    method: 'GET',
    url: '/product/reply',
    params,
  });
};

/**
 * 删除商品评论
 */
export const deleteReply = (id: number) => {
  return request<{
    msg: string;
    status: string;
  }>({
    method: 'DELETE',
    url: `/product/reply/delete/${id}`,
  });
};

/**
 * 回复
 */
export const reply = (id: IReply['id'], data: { content: string }) => {
  return request<{
    msg: string;
    status: string;
  }>({
    method: 'PUT',
    url: `/product/reply/set_reply/${id}`,
    data,
  });
};

/**
 * 添加虚拟评论
 */
export const addVirtualReply = (data: IVirtualReply) => {
  return request<{
    msg: string;
    status: string;
  }>({
    method: 'POST',
    url: `/product/reply/save_fictitious_reply`,
    data,
  });
};

/**
 * 虚拟评论表单
 */
export const getVirtualReplyForm = () => {
  return request<IFormData>({
    method: 'GET',
    url: `/product/reply/fictitious_reply/0`,
  });
};

/**
 * 选择商品列表
 */
export const getProductList = (data: IProductListForm) => {
  return request<{
    count: number;
    list: IProduct[];
  }>({
    method: 'GET',
    url: `/product/product/list`,
    params: data,
  });
};
