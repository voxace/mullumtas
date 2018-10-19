import Vue from 'vue';

const state = {
  loggedIn: false,
  username: '',
  id: '',
  admin: false,
  courses: [],
};

const getters = {
  loggedIn: state => state.loggedIn,
  isAdmin: state => state.admin,
  username: state => state.username,
  userID: state => state.id,
  userCourses: state => state.courses,
};

const actions = {
  login(context, user) {
    context.commit('login', user);
  },
  logout(context) {
    context.commit('logout');
  },
};

const mutations = {
  login(state, user) {
    state.loggedIn = true;
    state.username = user.detId;
    state.id = user._id;
    if (user.admin == true) state.admin = user.admin;
  },
  logout(state) {
    state.loggedIn = false;
    state.user = '';
    state.id = '';
    state.admin = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
