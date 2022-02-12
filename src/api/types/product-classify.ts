export interface ITopCategory {
  id: string;
  cate_name: string;
  html: string;
  add_time: string;
  big_pic: string;
  is_show: 0 | 1;
  pic: string;
  pid: number;
  sort: number;
}

export interface IListForm {
  page?: number;
  limit?: number;
  is_show?: number; //  1-显示 0-不显示
  pid?: number; //		父级id
  cate_name?: string; //		产品名称
}

export interface ICategory {
  id: number;
  pid: number;
  cate_name: string;
  sort: number;
  pic: string;
  is_show: 0 | 1;
  add_time: string;
  big_pic: string;
  children: ICategory[];
  statusLoading?: boolean;
}

export interface IAddCategoryForm {
  pid: number | null;
  cate_name: string;
  sort: number;
  pic: string;
  is_show: 0 | 1;
}
