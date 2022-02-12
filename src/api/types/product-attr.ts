export interface IAttr {
  id?: number;
  rule_name?: string;
  rule_value?: string;
  attr_name?: string;
  attr_value?: string[];
  statusLoading?: boolean;
}

export interface IListForm {
  page?: number;
  limit?: number;
  rule_name?: string;
}

export interface IDeleteAttrsParams {
  ids: string; // 规则id id拼接的字符串
  all?: 0 | 1; // 0：单页 1：所有加入队列执行
  where?: string; // 条件
}

export interface IAttrFormAttr {
  value: string; // 规格名称
  detail: string[]; // 规格值
  inputVisible: boolean;
  inputValue: string;
}

export interface IAttrTplForm {
  rule_name: string;
  spec: IAttrFormAttr[];
}

export interface IAttrTpl {
  id?: number;
  rule_name: string;
  rule_value?: string;
  spec: IAttrFormAttr[];
}
