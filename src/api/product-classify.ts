import request from '@/utils/request';
import type {
  ITopCategory,
  IListForm,
  ICategory,
  IAddCategoryForm,
} from '@/api/types/product-classify';

/**
 * 树形列表 - 0-仅顶级分类
 */
export const getTopCategory = () => {
  return request<ITopCategory[]>({
    method: 'GET',
    url: '/product/category/tree/0',
  });
};

/**
 * 分类列表
 */
export const getCategoryList = (data: IListForm) => {
  return request<{
    list: ICategory[];
    count: number;
  }>({
    method: 'GET',
    url: '/product/category',
    params: data,
  });
};

/**
 * 切换分类显示状态
 */
export const changeShowStatus = (
  id: ICategory['id'],
  isShow: ICategory['is_show']
) => {
  return request<{
    number: number;
  }>({
    method: 'PUT',
    url: `/product/category/set_show/${id}/${isShow}`,
  });
};

/**
 * 分类删除
 */
export const deleteCategory = (id: ICategory['id']) => {
  return request<{
    status: number;
    msg: string;
  }>({
    method: 'DELETE',
    url: `/product/category/${id}`,
  });
};

/**
 * 分类添加
 */
export const addCategory = (data: IAddCategoryForm) => {
  return request<{
    status: number;
    msg: string;
  }>({
    method: 'POST',
    url: '/product/category',
    data,
  });
};

/**
 * 分类编辑
 */
export const updateCategory = (id: ICategory['id'], data: IAddCategoryForm) => {
  return request<{
    status: number;
    msg: string;
  }>({
    method: 'PUT',
    url: `/product/category/${id}`,
    data,
  });
};

/**
 * 分类查询
 */
export const getCategoryById = (id: ICategory['id']) => {
  return request<{
    action: string;
    info: string;
    method: string;
    rules: any[];
    status: boolean;
    title: string;
  }>({
    method: 'get',
    url: `/product/category/${id}`,
  });
};
