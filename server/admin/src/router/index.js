import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/artifacts/form',
    name: 'Add Artifacts',
    component: () => import(/* webpackChunkName: "artifactsform" */ '../views/ArtifactForm.vue'),
  },
  {
    path: '/artifacts',
    name: 'Artifacts',
    component: () => import(/* webpackChunkName: "artifacts" */ '../views/Artifacts.vue'),
  },
  {
    path: '/categories/form',
    name: 'Add Categories',
    component: () => import(/* webpackChunkName: "categoriesform" */ '../views/CategoriesForm.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
  },
  {
    path: '/levels/form',
    name: 'Add Levels',
    component: () => import(/* webpackChunkName: "levelsform" */ '../views/LevelsForm.vue'),
  },
  {
    path: '/levels',
    name: 'Levels',
    component: () => import(/* webpackChunkName: "levels" */ '../views/Levels.vue'),
  },
  {
    path: '/officials/form',
    name: 'Add Officials',
    component: () => import(/* webpackChunkName: "officialsform" */ '../views/OfficialsForm.vue'),
  },
  {
    path: '/officials',
    name: 'Officials',
    component: () => import(/* webpackChunkName: "officials" */ '../views/Officials.vue'),
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
  {
    path: '/geographies/form',
    name: 'Add Geographies',
    component: () => import(/* webpackChunkName: "geographiesform" */ '../views/GeographiesForm.vue'),
  },
  {
    path: '/geographies',
    name: 'Geographies',
    component: () => import(/* webpackChunkName: "geographies" */ '../views/Geographies.vue'),
  },
  {
    path: '/advocacy_groups/form',
    name: 'Add Advocacy Groups',
    component: () => import(
      /* webpackChunkName: "advocacygroupsform" */ '../views/AdvocacyGroupsForm.vue'
    ),
  },
  {
    path: '/advocacy_groups',
    name: 'Advocacy Groups',
    component: () => import(
      /* webpackChunkName: "advocacygroups" */ '../views/AdvocacyGroups.vue'
    ),
  },
  {
    path: '/video_testimonials/form',
    name: 'Add Video Testimonials',
    component: () => import(/* webpackChunkName: "videotestimonialsform" */ '../views/VideoTestimonialsForm.vue'),
  },
  {
    path: '/video_testimonials',
    name: 'Video Testimonials',
    component: () => import(/* webpackChunkName: "videos" */ '../views/VideoTestimonials.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
