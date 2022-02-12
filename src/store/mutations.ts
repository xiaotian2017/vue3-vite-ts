import { SET_USER, SET_IS_COLLAPSE } from './types';
import type { State } from './state';
import { setItem } from '@/utils/storage';
import { USER } from '@/utils/constants';

export default {
  [SET_USER](state: State, user: State['user']) {
    state.user = user;
    setItem(USER, user);
  },
  [SET_IS_COLLAPSE](state: State, isCollapse: State['isCollapse']) {
    state.isCollapse = isCollapse;
  },
};
