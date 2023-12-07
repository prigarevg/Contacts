<template>
  <select v-model="selected" @change="setValue()">
    <option :value="null">
      {{ selected ? "Очистить" : `${defaultValue}` }}
    </option>
    <option v-for="(option, i) in options" :key="i" v-bind:value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "../store";

export default {
  props: {
    options: Array,
    filterType: String,
    defaultValue: String,
  },
  methods: {
    ...mapActions({
      setNation: "setNation",
      setGender: "setGender",
      setFullName: "setFullName",
    }),
    //Фильтрация
    setValue() {
      store.commit("SET_PAGE", 0);
      let temp = null;
      //Копия изначальной коллекции
      if (this.getCopiedContacts === null)
        store.commit("SET_COPIED_CONTACTS", [...this.getContacts]);
      const options = this.getCopiedContacts;
      //Фильтрация по национальности
      if (this.getNationalFilter) {
        temp = options.filter((item) => item.nat === this.getNationalFilter);
      }
      //Фильтрация по полу
      if (this.getGenderFilter) {
        if (temp)
          temp = temp.filter((item) => item.gender === this.getGenderFilter);
        else
          temp = options.filter((item) => item.gender === this.getGenderFilter);
      }
      //Фильтрация по полному имени
      if (this.getFullNameFilter) {
        if (temp)
          temp = temp.filter(
            (item) =>
              item.name?.first + " " + item.name?.last ===
              this.getFullNameFilter
          );
        else
          temp = options.filter(
            (item) =>
              item.name?.first + " " + item.name?.last ===
              this.getFullNameFilter
          );
      }

      if (
        this.getNationalFilter === null &&
        this.getGenderFilter === null &&
        this.getFullNameFilter === null
      )
        temp = options;
      //Замена начальной коллекции на отфильтрованную
      store.commit("SET_CONTACTS", temp);
    },
  },
  computed: {
    ...mapGetters({
      getNationalFilter: "getNationalFilter",
      getGenderFilter: "getGenderFilter",
      getFullNameFilter: "getFullNameFilter",
      getCopiedContacts: "getCopiedContacts",
      getContacts: "getContacts",
    }),
    //Метод с геттером и сеттером для выбранного типа фильтра
    selected: {
      get() {
        if (this.filterType === "nationality") return this.getNationalFilter;
        if (this.filterType === "gender") return this.getGenderFilter;
        return this.getFullNameFilter;
      },
      set(newValue) {
        if (this.filterType === "nationality") this.setNation(newValue);
        if (this.filterType === "gender") this.setGender(newValue);
        if (this.filterType === "fullName") this.setFullName(newValue);
      },
    },
  },
  watch: {
    getGenderFilter() {
      store.commit("SET_CONTACTS", this.getCopiedContacts);
      this.setValue();
    },
    getNationalFilter() {
      store.commit("SET_CONTACTS", this.getCopiedContacts);
      this.setValue();
    },
  },
};
</script>

<style scoped></style>
