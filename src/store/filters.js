export default {
  state: {
    //Фильтр по национальности
    nationalFilter: null,
    //Фильтр по полу
    genderFilter: null,
    //Фильтр по полному имени
    fullNameFilter: null,
  },

  getters: {
    getNationalFilter(state) {
      return state.nationalFilter;
    },
    getGenderFilter(state) {
      return state.genderFilter;
    },
    getFullNameFilter(state) {
      return state.fullNameFilter;
    },
  },

  mutations: {
    SET_NATION(state, nation) {
      state.nationalFilter = nation;
    },
    SET_GENDER(state, gender) {
      state.genderFilter = gender;
    },
    SET_FULL_NAME(state, fullName) {
      state.fullNameFilter = fullName;
    },
  },

  actions: {
    setNation({ commit }, filter) {
      commit("SET_NATION", filter);
    },
    setGender({ commit }, filter) {
      commit("SET_GENDER", filter);
    },
    setFullName({ commit }, filter) {
      commit("SET_FULL_NAME", filter);
    },
  },
};
