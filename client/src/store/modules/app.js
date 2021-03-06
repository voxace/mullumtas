import Vue from 'vue';

const state = {
  editing: false,
  snackbar: false,
  snackbarColor: 'success',
  snackbarMessage: 'Message',
  drawer: false,
  studentsDrawer: false,
  loginDialog: false,
  fullscreen: false,
  myCourses: false,
};

const getters = {
  isEditing: state => state.editing,
  isFullScreen: state => state.fullscreen,
  isDrawerOpen: state => state.drawer,
  isStudentsDrawerOpen: state => state.studentsDrawer,
  snackbar: state => state.snackbar,
  snackbarColor: state => state.snackbarColor,
  snackbarMessage: state => state.snackbarMessage,
  loginDialog: state => state.loginDialog,
  isMyCourses: state => state.myCourses,
};

const actions = {
  toggleEditing(context) {
    context.commit('toggleEditing');
  },
  toggleFullScreen(context) {
    context.commit('toggleFullScreen');
  },
  setFullScreen(context, value) {
    context.commit('setFullScreen', value);
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
  toggleStudentsDrawer(context) {
    context.commit('toggleStudentsDrawer');
  },
  setStudentsDrawer(context, value) {
    context.commit('setStudentsDrawer', value);
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
  setMyCoursesFilter(context, value) {
    context.commit('setMyCoursesFilter', value);
  },
};

const mutations = {
  toggleEditing(state) {
    state.editing = !state.editing;
  },
  toggleFullScreen(state) {
    state.fullscreen = !state.fullscreen;
  },
  setFullScreen(state, value) {
    state.fullscreen = value;
  },
  stopEditing(state) {
    state.editing = false;
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
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  setStudentsDrawer(state, value) {
    state.studentsDrawer = value;
  },
  toggleStudentsDrawer(state) {
    state.studentsDrawer = !state.studentsDrawer;
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
  setMyCoursesFilter(state, value) {
    state.myCourses = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
