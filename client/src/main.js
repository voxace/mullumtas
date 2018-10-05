import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';

Vue.config.productionTip = false;

// Setup axios to be available globally through Vue
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8081/api',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
