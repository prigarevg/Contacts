<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div id="app">
    <nav>
      <span class="app-name">Контакты</span>
      <Navbar />
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  width: 100%;
  height: 40px;
  display: flex;
  background-color: #627fad;
  justify-content: space-between;
}
.app-name {
  font-size: 24px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>
