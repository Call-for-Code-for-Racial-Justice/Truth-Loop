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
    path: '/policy/:id',
    name: 'Policy',
    component: () => import(/* webpackChunkName: "about" */ '../views/Policy'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
