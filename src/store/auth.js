export default {
  state: {
    //Роль пользователя
    userRole: null,
  },

  getters: {
    //Проверка на авторизацию пользователя
    isAuth: (state) => !!state.userRole,
    //Получение роли пользователя
    getUserRole(state) {
      return state.userRole;
    },
  },

  mutations: {
    //Задание роли пользователя
    SET_USER_ROLE(state, userRole) {
      state.userRole = userRole;
    },
    //Очистка роли пользователя
    CLEAR_USER_ROLE(state) {
      state.userRole = null;
    },
  },

  actions: {
    //Логин с записью в local storage
    login({ commit }, role) {
      localStorage.setItem("userRole", role);
      commit("SET_USER_ROLE", role);
    },
    //Логаут
    logout({ commit }) {
      localStorage.removeItem("userRole");
      commit("CLEAR_USER_ROLE");
    },
  },
};
