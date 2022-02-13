import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authentication from './authentication';
import file from './file';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
    domain: 'http://localhost:3000',
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
