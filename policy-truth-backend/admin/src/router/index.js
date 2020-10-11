import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/artifactform',
    name: 'Artifact Form',
    component: () => import(/* webpackChunkName: "artifactform" */ '../views/ArtifactForm.vue'),
  },
  {
    path: '/artifacttable',
    name: 'Artifact table',
    component: () => import(/* webpackChunkName: "artifactform" */ '../views/ArtifactTable.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
