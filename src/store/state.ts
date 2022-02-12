import { IUserInfo /* , IMenu */ } from '@/api/types/common';
import { getItem } from '@/utils/storage';
import { USER } from '@/utils/constants';

const state = {
  user: getItem<({ token: string } & IUserInfo) | null>(USER),
  isCollapse: false,
};

export default state;

export type State = typeof state;
