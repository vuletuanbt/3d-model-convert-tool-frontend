import HTTP from '../http';
import router from '../router';

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerUsername: null,
    registerPassword: null,
    registerError: null,

    loginUserName: null,
    loginPassword: null,
    loginError: null,

    token: null,
  },
  actions: {
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP()
        .post('/auth/register', {
          name: state.registerUsername,
          username: state.registerUsername,
          email: state.registerEmail,
          password: state.registerPassword,
        })
        .then(({ data: { data: { accessToken } } }) => {
          commit('setToken', accessToken);
          router.push('/');
        })
        .catch(() => {
          commit('setRegisterError', 'An error has occurred');
        });
    },
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },

    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP()
        .post('/auth/login', {
          username: state.loginUserName,
          password: state.loginPassword,
        })
        .then(({ data: { data: { accessToken } } }) => {
          commit('setToken', accessToken);
          router.push('/');
        })
        .catch((error) => {
          if (!error.response) {
            return;
          }
          if (error.response.status = 401) {
            commit('setLoginError', 'The username or password is incorrect.');
          }
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setRegisterUsername(state, username) {
      state.registerUsername = username;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },

    setloginUserName(state, email) {
      state.loginUserName = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
  },
};
