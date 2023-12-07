import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import store from "./store";
//Получение типа отображение таблицы
const view =
  localStorage.getItem("tableView") !== null
    ? localStorage.getItem("tableView")
    : "table";
//Проверка на авторизацию
store.dispatch("login", localStorage.getItem("userRole"));
//Задание полученного типа отображение таблицы
store.dispatch("setTableView", view);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
