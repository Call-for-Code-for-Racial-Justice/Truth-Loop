export default {
  namespaced: true,
  state: {
    privacy_accepted: false,
    privacy_cancelled: false,
  },
  getters: {
    getPrivacyAccept: (state) => state.privacy_accepted,
    getPrivacyCancel: (state) => state.privacy_cancelled,
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
      state.privacy_cancelled = payload.privacy_cancelled;
    },
  },
};
