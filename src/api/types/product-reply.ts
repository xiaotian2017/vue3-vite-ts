export interface IListForm {
  page?: number;
  limit?: number;
  account?: string; //	评论用户名
  is_reply?: string; // 是否回复 1/0
  store_name?: string; //	产品名称
  data?: string; // 时间选择
  product_id?: number; //	指定商品评论 （默认）0-表示所有商品评论
}

export interface IReply {
  id?: number;
  product_id?: number; // 产品id
  account?: string; // 		用户名名称
  image?: string; // 		商品图片
  store_name?: string; // 		商品名称
  comment?: string; // 		评论内容
  pics?: string; // 		评论图片
  add_time?: number; // 添加时间
  merchant_reply_content?: string; // 回复内容
  score?: string; // 		评分
  create_time?: string; // 		添加时间转换后
  time?: string; // 		表示时间间隔	mock: 3分钟前
}

export interface ISelectedProduct {
  image: string; // 商品图
  product_id: number; // 商品ID
}

export interface IVirtualReply {
  // product_id: number; // 商品ID
  image: ISelectedProduct; // 选中商品
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  comment: string; // 评论内容
  pics: string; // 评论图片，数组
  product_score: number; //	商品分数
  service_score: number; // 服务分数
  add_time?: string; // 评论时间：为空默认当前时间
}

export interface ICol {
  span?: number;
}

export interface IFormRuleProps {
  type?: string;
  maxLength?: number;
  title?: string;
  src?: string;
  icon?: string;
  width?: string;
  height?: string;
  srcKey?: string;
  placeholder?: string;
  allowHalf?: boolean;
  closeBtn?: boolean;
  okBtn?: boolean;
  editable?: boolean;
  col?: ICol;
}

export interface IFomrRule {
  title: string;
  field: string;
  type: string;
  value: string[] | string;
  props: IFormRuleProps;
}

export interface IForm {
  action?: string;
  title?: string;
  rules?: IFomrRule[];
  method?: string;
  info?: string;
  status?: boolean;
}

export interface IProductListForm {
  page?: number;
  limit?: number;
  cate_id?: string;
  store_name?: string;
}

export interface IProductAttr {
  product_id: string; // 商品ID
  suk: string; // 规格名称
  stock: string; // 库存
  sales: string; // 销量
  price: string; // 价格
  image: string; // 图片
  unique: string; // 唯一值
  cost: string; // 成本价
  bar_code: string; // 规格编码
  ot_price: string; // 原价
  weight: string; // 重量
  volume: string; // 体积
  brokerage: string; // 一级返佣
  brokerage_two: string; // 二级返佣
  type: string; // 类型
  quota: string; // 限量
  quota_show: string; // 限量显示
}

export interface IProduct {
  selected?: boolean; // 是否选中
  id?: number;
  mer_id?: number; // 商户Id
  image?: string; // 产品图片
  slider_image?: string[]; // 轮播图
  store_name?: string; // 商品名称
  store_info?: string; // 商品简介
  keyword?: string; // 关键词
  cate_id?: string[]; // 分类
  price?: string; // 价格
  vip_price?: string; // 会员价格
  ot_price?: string; // 市场价
  postage?: string; // 邮费
  unit_name?: string; // 单位名
  sort?: number; // 排序
  sales?: number; // 销量
  stock?: number; // 库存
  is_show?: number; // 是否显示
  is_hot?: number; // 是否热卖
  is_benefit?: number; // 是否优惠
  is_best?: number; // 是否精品
  is_new?: number; // 是否新品
  description?: string; // 产品描述
  add_time?: number; // 添加时间
  is_postage?: number; // 是否包邮
  is_del?: number; // 是否删除
  mer_use?: number; // 商户是否代理     |                   |
  give_integral?: string; // 获得积分
  cost?: string; // 成本价
  is_seckill?: number; // 秒杀状态
  is_bargain?: number; // 砍价状态
  ficti?: number; // 虚拟销量
  browse?: number; // 浏览量
  code_path?: string; // 浏览量
  soure_link?: string;
  bar_code?: string; // 产品条码
  is_good?: number; // 虚拟销量
  cate_name?: string; // 分类名称
  attrs: IProductAttr[];
}
