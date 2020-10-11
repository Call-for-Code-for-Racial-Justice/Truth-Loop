/*eslint-disable */
import policy from '../../../mockdata/CURRENT_FULL_RETRIEVAL_OF_ARTIFACT_1';

export default {
    name: "policystore",
    namespaced: true,
    state: {
        current_policy: null,
    },
    getters: {
        getCurrentPolicy: (state) => state.current_policy,
    },
    actions: {
        fetchPolicy({ commit }, payload) {
            return new Promise((resolve, reject) => {
                if (payload != null && typeof payload !== "undefined") {
                    console.log('Fetching:', payload);
                    commit('setPolicy', policy);
                    resolve();
                } else {
                    reject();
                }
            });
        },
    },
    mutations: {
        setPolicy(state, payload) {
            state.current_policy = payload;
        },
    },
};
