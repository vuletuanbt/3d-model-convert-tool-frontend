import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authentication from './authentication';
import file from './file';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: process.env.VUE_APP_API_BASE_URL,
    domain: process.env.VUE_APP_BACKEND_URL,
  },
  modules: {
    authentication,
    file,
  },
  mutations: {},
  plugins: [
    createPersistedState(),
  ],
});
