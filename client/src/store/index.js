/*eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import privacystore from './modules/privacystore';
import policystore from './modules/policystore';
import policyliststore from './modules/policystore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    privacystore,
    policyliststore,
    policystore,
  },
});
