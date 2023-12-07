import axios from "axios";

export default {
  state: {
    contacts: null,
    copiedContacts: null,
    filteredContacts: null,
    sortedContacts: null,
    page: null,
  },

  getters: {
    //Получение списка контактов
    getContacts(state) {
      return state.contacts;
    },
    //Получение копии списка контактов
    getCopiedContacts(state) {
      return state.copiedContacts;
    },
    //Получение отсортированных контактов
    getSortedContacts(state) {
      return state.sortedContacts;
    },
    //Получение выбранной страницы
    getPage(state) {
      return state.page;
    },
    //Получение отфильтрованных для пагинации контактов
    getFilteredContacts(state) {
      return state.filteredContacts;
    },
  },

  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts;
    },
    SET_COPIED_CONTACTS(state, copiedContacts) {
      state.copiedContacts = copiedContacts;
    },
    SET_SORTED_CONTACTS(state, sortedContacts) {
      state.sortedContacts = sortedContacts;
    },
    SET_FILTERED_CONTACTS(state, filteredContacts) {
      state.filteredContacts = filteredContacts;
    },
    SET_PAGE(state, page) {
      state.page = page;
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
  },

  actions: {
    //Запрос на получение контактов по api
    async setContacts({ commit }) {
      await axios
        .get("https://randomuser.me/api/?results=200")
        .then((response) => {
          commit("SET_CONTACTS", response.data.results);
          commit("SET_COPIED_CONTACTS", response.data.results);
        });
    },
    setFilteredContacts({ commit }, filteredContacts) {
      commit("SET_FILTERED_CONTACTS", filteredContacts);
    },
    setCurrentPage({ commit }, page) {
      commit("SET_PAGE", page);
    },
  },
};
