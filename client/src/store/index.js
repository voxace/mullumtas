import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import courses from './modules/courses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    courses,
  },
});
