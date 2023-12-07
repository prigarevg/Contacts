export default {
  state: {
    tableView: "table",
  },

  getters: {
    getTableView(state) {
      return state.tableView;
    },
  },

  mutations: {
    SET_TABLE_VIEW(state, tableView) {
      state.tableView = tableView;
    },
  },

  actions: {
    //Задание вида отображения таблицы
    async setTableView({ commit }, tableView) {
      localStorage.setItem("tableView", tableView);
      commit("SET_TABLE_VIEW", tableView);
    },
  },
};
