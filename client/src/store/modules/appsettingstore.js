export default {
  namespaced: true,
  state: {
    apptitle: "",
    topbar: {
      hasBack: false,
      hasSettings: false,
    },
  },
  getters: {
    getAppTitle: (state) => state.apptitle,
    getTopBarSettings: (state) => state.topbar,
  },
  actions: {
    updateAppSettings({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload != null && typeof payload !== "undefined") {
          commit('setAppSettings', payload);
          resolve();
        } else {
          reject();
        }
      });
    },
  },
  mutations: {
    setAppSettings(state, payload) {
      console.log(payload);
      if (payload.apptitle != null && typeof payload.apptitle !== "undefined") state.apptitle = payload.apptitle;
      if (payload.topbar.hasBack != null && typeof payload.topbar.hasBack !== "undefined") state.topbar.hasBack = payload.topbar.hasBack;
      if (payload.topbar.hasSettings != null && typeof payload.topbar.hasSettings !== "undefined") state.topbar.hasSettings = payload.topbar.hasSettings;
    },
  },
};
