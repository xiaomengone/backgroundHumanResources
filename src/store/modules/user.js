import { apiLogin, apiGetUserInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { constantRoutes, resetRouter } from "@/router";

const state = {
  token: getToken(),
  stateUserInfo: {},
  routers: constantRoutes,
};

const mutations = {
  setToken(state, val) {
    state.token = val;
    setToken(val);
  },
  clearToken(state) {
    state.token = null;
    removeToken();
  },
  // 用户信息
  mutatSetStateuser(state, data) {
    state.stateUserInfo = data;
  },
  setRouters(state, val) {
    state.routers = [...constantRoutes, ...val];
  },
};

const actions = {
  // 登陆
  async userLogin({ commit }, data) {
    const res = await apiLogin(data);
    commit("setToken", res);
  },
  // 获取用户资料
  async storGetUserInfo({ commit }) {
    const res = await apiGetUserInfo();
    commit("mutatSetStateuser", res);
    return res;
  },
  // 退出
  userLogout({ commit }) {
    resetRouter();
    commit("clearToken");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
