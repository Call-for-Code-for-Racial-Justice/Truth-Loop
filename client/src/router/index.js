import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home'),
  },
  {
    path: '/policy/:policyid',
    name: 'policy',
    component: () => import('../views/Policy'),
  },
  {
    path: '/policy/:policyid/record',
    name: 'record',
    component: () => import('../views/Record'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
