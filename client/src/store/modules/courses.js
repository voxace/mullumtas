import Vue from 'vue';

const state = {
  editing: true,
  admin: true,
  snackbar: false,
  snackbarColor: 'success',
  snackbarMessage: 'Message',
};

const getters = {
  isEditing: state => state.editing,
  isAdmin: state => state.admin,
  snackbar: state => state.snackbar,
  snackbarColor: state => state.snackbarColor,
  snackbarMessage: state => state.snackbarMessage,
};

const actions = {
  toggleEditing(context) {
    context.commit('toggleEditing');
  },
  openSuccessBar(context, message) {
    context.commit('openSuccessBar', message);
  },
  openErrorBar(context, message) {
    context.commit('openErrorBar', message);
  },
  closeSnackBar(context) {
    context.commit('closeSnackBar');
  },
};

const mutations = {
  toggleEditing(state) {
    state.editing = !state.editing;
  },
  openSuccessBar(state, message) {
    state.snackbar = true;
    state.snackbarColor = 'success';
    state.snackbarMessage = message;
  },
  openErrorBar(state, message) {
    state.snackbar = true;
    state.snackbarColor = 'error';
    state.snackbarMessage = message;
  },
  closeSnackBar(state) {
    state.snackbar = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
