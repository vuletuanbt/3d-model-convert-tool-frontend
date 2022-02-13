import Vue from 'vue';
import http from '../http';

export default {
  namespaced: true,
  state: {
    projects: [],
    newProjectName: null,
    file: null,
    error: null,
  },
  actions: {
    fetchProjects({ commit }) {
      return http()
        .get('/files')
        .then(({ data: { data: files } }) => {
          console.log(files);
          commit('setProjects', files);
        });
    },
    createProject({ commit, state }) {
      const formData = new FormData();
      formData.append('file', state.file, state.file.name);
      return http()
        .post('/files', formData)
        .then(({ data: { data: file } }) => {
          console.log(file);
          commit('setNewProjectName', null);
          commit('appendNewProject', file);
        })
        .catch((error) => {
          if (!error.response) {
            return;
          }
          if ([400, 413].includes(error.response.status)) {
            const { error: { message } } = error.response.data;
            commit('setError', message);
          }
        });
    },
    updateProject({ commit }, file) {
      return http()
        .put(`/projects/${file.id}`, { title: file.title })
        .then(() => {
          commit('unsetEditMode', file);
          // commit('setNewProject', data);
        });
    },
    deleteProject({ commit }, file) {
      return http()
        .delete(`/files/${file.id}`)
        .then(() => {
          commit('deleteProject', file);
        });
    },
  },
  getters: {},
  mutations: {
    setNewProjectName(state, name) {
      state.newProjectName = name;
    },
    setNewProject(state, file) {
      state.file = file;
    },
    appendNewProject(state, file) {
      state.projects = [file, ...state.projects];
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setEditMode(state, file) {
      Vue.set(file, 'isEditMode', true);
    },
    setProjectTitle(state, { file, title }) {
      file.title = title;
    },
    setError(state, error) {
      state.error = error;
    },
    unsetEditMode(state, file) {
      Vue.set(file, 'isEditMode', false);
    },
    deleteProject(state, file) {
      state.projects = state.projects.filter(item => item.id !== file.id);
    },
  },
};
