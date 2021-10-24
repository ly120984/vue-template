import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import user from "./modules/user"
export default {
  modules: {
    user,
  },
  namespaced: true, // namespaced must be true in module app.
  state: {
    name: process.env.VUE_APP_NAME,
    loginApp: '我是测试javascript',
    aa: '子项目aaa',
  },
  mutations: {
    changeLogin(state, data) {
      state.loginApp = data;
      return data
    }
  },
  actions: {
    actions1(state, data) {
      state.commit("changeLogin", data)

      return 'actions1'
    },
    actions2(state, data) {

    },
    actions3(state, data) {

    },
  },
};