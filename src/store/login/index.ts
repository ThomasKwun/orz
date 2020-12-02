import { Module, MutationTree } from 'vuex';
import { baseMutations } from '../base';

export interface LoginState extends BaseState{
  nickName?: string;
  password?: string;
}

// export type LoginMutations = 'setNickname' | 'setPassword';
export enum LoginMutations{
  setNickname = 'login/setNickname',
  setPassword = 'login/setPassword',
  setState = 'login/setState',
}
const state: LoginState = {
  nickName: localStorage.nickName || '',
  password: '',
};

const mutations: MutationTree<LoginState> = {
  setNickname: (_state: LoginState, payload: LoginState) => {
    const thisState = _state;
    thisState.nickName = payload.nickName;
  },
  setPassword: (_state: LoginState, payload: LoginState) => {
    const thisState = _state;
    thisState.nickName = payload.nickName;
  },
  ...baseMutations,
};

const loginModule: Module<any, any> = {
  namespaced: true,
  state,
  mutations,
};

export default loginModule;
