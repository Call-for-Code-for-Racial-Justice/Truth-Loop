export default {
  namespaced: true,
  state: {
    items: [],
    item_count: 0,
    selected_item_details: null,
  },
  getters: {
    getItems: (state) => state.items,
    getItemCount: (state) => state.item_count,
    getItemDetails: (state) => state.selected_item_details,
  },
  actions: {
    updateItems({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload != null && typeof payload !== "undefined") {
          commit('setItems', payload);
          resolve();
        } else {
          reject();
        }
      });
    },
    updateItemDetails({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload != null && typeof payload !== "undefined") {
          commit('setItemDetails', payload);
          resolve();
        } else {
          reject();
        }
      });
    },
  },
  mutations: {
    setItems(state, payload) {
      console.log(payload);
      state.items = payload.items;
      state.item_count = payload.items.length;
    },
    setItemDetails(state, payload) {
      console.log(payload);
      state.selected_item_details = payload.itemdetail;
    },
  },
};
