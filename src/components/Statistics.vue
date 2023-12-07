<template>
  <div>
    <p>Размер коллекции: {{ collectionLength }}</p>
    <p>Количество мужчин: {{ peopleCount("male") }}</p>
    <p>Количество женщин: {{ peopleCount("female") }}</p>
    <p>В коллекции {{ compareCount() }}</p>
    <div class="nations-block">
      <p>Количество контактов по каждой национальности</p>
      <p v-for="(item, i) in nationsCount()" :key="i">
        {{ item.key }}: {{ item.value }};
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contacts: Array,
  },
  methods: {
    //Получение количество контактов определенного пола
    peopleCount(gender) {
      return this.contacts?.filter((value) => value.gender === gender).length;
    },
    //Сравнение количества мужчин и женщин
    compareCount() {
      if (this.peopleCount("male") > this.peopleCount("female"))
        return "больше мужчин";
      else if (this.peopleCount("male") < this.peopleCount("female"))
        return "больше женщин";
      else return "одинаковое количество мужчин и женщин";
    },
    //Получение списка с количеством контаков каждой национальности
    nationsCount() {
      const nations = [...new Set(this.contacts?.map((item) => item.nat))];
      const object = [];
      nations.map((item, i) => {
        object[i] = {
          key: item,
          value: this.contacts?.filter((value) => value.nat === item).length,
        };
      });
      return object;
    },
  },
  computed: {
    collectionLength() {
      return this.contacts?.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.nations-block {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
