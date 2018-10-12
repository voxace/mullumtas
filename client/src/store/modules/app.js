import Vue from 'vue';

const state = {
  editing: true,
  snackbar: false,
  snackbarColor: 'success',
  snackbarMessage: 'Message',
  drawer: false,
  loginDialog: false,
};

const getters = {
  isEditing: state => state.editing,
  isDrawerOpen: state => state.drawer,
  snackbar: state => state.snackbar,
  snackbarColor: state => state.snackbarColor,
  snackbarMessage: state => state.snackbarMessage,
  loginDialog: state => state.loginDialog,
};

const actions = {
  toggleEditing(context) {
    context.commit('toggleEditing');
  },
  stopEditing(context) {
    context.commit('stopEditing');
  },
  openLoginDialog(context) {
    context.commit('openLoginDialog');
  },
  closeLoginDialog(context) {
    context.commit('closeLoginDialog');
  },
  toggleDrawer(context) {
    context.commit('toggleDrawer');
  },
  setDrawer(context, value) {
    context.commit('setDrawer', value);
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
  stopEditing(state) {
    state.editing = false;
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  openLoginDialog(state) {
    state.loginDialog = true;
  },
  closeLoginDialog(state) {
    state.loginDialog = false;
  },
  setDrawer(state, value) {
    state.drawer = value;
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
