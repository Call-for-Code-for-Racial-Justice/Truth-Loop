export default {
  namespaced: true,
  state: {
    privacy_accepted: false,
  },
  getters: {
    getPrivacyAccept: (state) => state.privacy_accepted,
  },
  actions: {
    updatePrivacyAccept({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload != null && typeof payload !== "undefined") {
          commit('setPrivacyAccept', payload);
          resolve();
        } else {
          reject();
        }
      });
    },
  },
  mutations: {
    setPrivacyAccept(state, payload) {
      console.log(payload);
      state.privacy_accepted = payload.privacy_accepted;
    },
  },
};
