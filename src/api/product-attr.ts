import request from '@/utils/request';
import type {
  IListForm,
  IAttr,
  IDeleteAttrsParams,
  IAttrTplForm,
  IAttrTpl,
} from '@/api/types/product-attr';

/**
 * 商品规格列表
 */
export const getAttrList = (params: IListForm) => {
  return request<{
    list: IAttr[];
    count: number;
  }>({
    method: 'GET',
    url: '/product/product/rule',
    params,
  });
};

/**
 * 删除商品规格
 */
export const deleteAttrs = (params: IDeleteAttrsParams) => {
  return request<{
    msg: string;
    status: string;
  }>({
    method: 'DELETE',
    url: '/product/product/rule/delete',
    params,
  });
};

/**
 * 添加/编辑商品规格
 * @param {number} id - 0 表示添加，指定id表示编辑
 */
export const saveAttrTpl = (id: number, data: IAttrTplForm) => {
  return request<{
    msg: string;
    status: string;
  }>({
    method: 'POST',
    url: `/product/product/rule/${id}`,
    data,
  });
};

/**
 * 商品规格
 */
export const getAttrTpl = (id: number) => {
  return request<{
    info: IAttrTpl;
  }>({
    method: 'GET',
    url: `/product/product/rule/${id}`,
  });
};
