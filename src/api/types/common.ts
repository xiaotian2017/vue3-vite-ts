export interface ILoginInfo {
  login_logo: string;
  logo_rectangle: string;
  logo_square: string;
  slide: string[];
}

export interface ILoginForm {
  account: string;
  pwd: string;
  imgcode: string;
}

export interface IUserInfo {
  id: number;
  account: string;
  head_pic: string;
}

export interface IMenu {
  path: string;
  title: string;
  icon: string;
  header: string;
  is_header: number;
  children?: IMenu[];
}

export interface ILoginResponse {
  token: string;
  expires_time: number;
  menus: IMenu[];
  unique_auth: string[];
  user_info: IUserInfo;
  logo: string;
  logo_square: string;
  version: string;
  newOrderAudioLink: string;
}
