import dayjs from 'dayjs';
// import * as isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
// import 'dayjs/locale/zh-cn'; // 导入本地化语言

// dayjs.extend(isLeapYear); // 使用插件
// dayjs.locale('zh-cn'); // 使用本地化语言

export function formatDate2S(time: dayjs.ConfigType): string {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(time: dayjs.ConfigType): string {
  return dayjs(time).format('YYYY-MM-DD');
}
