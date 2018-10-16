import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/course/:short',
      name: 'course',
      component: () => import(/* webpackChunkName: "course" */ '../views/Course.vue'),
      props: true,
    },
    {
      path: '/course/:short/unit/:unitID/section/:sectionID/resource/:resourceID',
      name: 'resource',
      component: () => import(/* webpackChunkName: "resource" */ '../views/Resource.vue'),
      props: true,
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});
