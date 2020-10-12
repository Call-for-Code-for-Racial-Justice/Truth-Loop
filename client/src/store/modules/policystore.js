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
                  if (process.env.USE_MOCK_DATA) {
                    commit('setPolicy', policy);
                  } else {
                    fetch(`http://localhost:5000/api/v1/legislativeArtifacts/fullDetail/${payload}`)
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
