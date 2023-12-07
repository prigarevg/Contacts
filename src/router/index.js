import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  //Протект роутов
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(from, to, next) {
        if (!store.getters.isAuth) {
          next({
            name: "login",
          });
        } else next();
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter(from, to, next) {
        if (store.getters.isAuth === false) {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

export default router;
