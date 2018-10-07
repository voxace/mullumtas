import '@babel/polyfill';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://192.168.1.232:3001/api'; // DEV
// axios.defaults.baseURL = 'http://159.65.107.105:3001/api'; // TEST
// axios.defaults.baseURL = 'http://www.mullumtas.com:3001/api'; // PROD

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
