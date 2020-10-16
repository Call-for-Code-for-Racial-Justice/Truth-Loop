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
                  if (process.env.VUE_APP_MOCK_DATA) {
                    console.log('Using MOCK DATA for policy store');
                    commit('setPolicy', policy);
                  } else {
                    const apiurl = process.env.VUE_APP_SERVER_URL || "";
                    fetch(`${apiurl}/api/v1/legislativeArtifacts/fullDetail/${payload}`)
                      .then((response) => response.json())
                      .then((json) => {
                        commit('setPolicy', json);
                      });
                    }
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
