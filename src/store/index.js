import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import contacts from "./contacts";
import filters from "./filters";
import tableView from "./tableView";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  modules: {
    auth,
    contacts,
    tableView,
    filters,
  },
});
