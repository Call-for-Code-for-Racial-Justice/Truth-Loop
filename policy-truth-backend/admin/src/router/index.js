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
    path: '/artifactsform',
    name: 'Add Artifacts',
    component: () => import(/* webpackChunkName: "artifactsform" */ '../views/ArtifactForm.vue'),
  },
  {
    path: '/artifacts',
    name: 'Artifacts',
    component: () => import(/* webpackChunkName: "artifacts" */ '../views/ArtifactTable.vue'),
  },
  {
    path: '/categories/form',
    name: 'Add Categories',
    component: () => import(/* webpackChunkName: "categoriesadd" */ '../views/CategoriesForm.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
  },
  {
    path: '/publications/form',
    name: 'Add Publications',
    component: () => import(/* webpackChunkName: "publicationsform" */ '../views/PublicationsForm.vue'),
  },
  {
    path: '/publications',
    name: 'Publications',
    component: () => import(/* webpackChunkName: "publications" */ '../views/Publications.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
