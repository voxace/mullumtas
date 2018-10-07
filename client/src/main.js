import '@babel/polyfill';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

if (process.env.VUE_APP_BASE) {
  axios.defaults.baseURL = process.env.VUE_APP_BASE;
} else {
  axios.defaults.baseURL = 'http://159.65.107.105:3001/api';
}

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
