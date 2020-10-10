import Vue from 'vue';
import Vuex from 'vuex';

import privacystore from './modules/privacystore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    privacystore,
  },
});
