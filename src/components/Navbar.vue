<template>
  <div v-if="this.isAuth()" class="logout">
    <a href="#" @click.prevent="makeLogout">Выйти</a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapGetters({ isAuth: "isAuth" }),
    ...mapActions({ logout: "logout" }),
    //Логаут
    makeLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.logout {
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: inherit;
  transition: background-color 0.5s;
  &:hover {
    background-color: #284b85;
  }
  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
