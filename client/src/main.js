import '@babel/polyfill';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import config from '../config';

Vue.config.productionTip = false;

axios.defaults.baseURL = config.baseURL;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
