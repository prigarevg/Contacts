<template>
  <div>
    <div class="menu">
      <div class="filter-block">
        <filter-component
          v-if="userRole === 'admin'"
          :options="filterOptions('nationality')"
          :filter-type="'nationality'"
          :default-value="'Национальность'"
        />
        <filter-component
          v-if="userRole === 'admin'"
          :options="filterOptions('gender')"
          :filter-type="'gender'"
          :default-value="'Пол'"
        />
        <filter-component
          v-if="userRole === 'admin'"
          :options="filterOptions('fullName')"
          :filter-type="'fullName'"
          :default-value="'Полное имя'"
        />
        <span
          v-if="selected === 'tiled'"
          :class="`sort-name-item sort-${sort}`"
          @click.prevent="setSort()"
        >
          <span>Сортировать по имени</span>
          <img src="../assets/white-sort.png" alt="sort" />
        </span>
      </div>
      <div class="sort-block">
        <select
          class="sort-block__item"
          v-model="selected"
          @change="setView($event)"
        >
          <option
            v-for="(option, i) in options"
            :key="i"
            v-bind:value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
        <span class="icon-item refresh-btn" @click="refresh()">
          <img src="../assets/refresh.png" alt="refresh" />
        </span>
      </div>
    </div>
    <div :class="selected === 'table' ? 'table' : 'tiled'">
      <div v-if="selected === 'table'" class="header">
        <span class="header__item"> Avatar </span>
        <span class="header__item centered-item">
          Fullname
          <span :class="`sort-item sort-${sort}`" @click.prevent="setSort()">
            <img src="../assets/sort.png" alt="sort" />
          </span>
        </span>
        <span class="header__item"> Birthday </span>
        <span class="header__item"> Email </span>
        <span class="header__item"> Phone </span>
        <span class="header__item"> Location </span>
        <span class="header__item"> Nationality </span>
      </div>
      <div
        :class="selected === 'table' ? 'row' : 'block'"
        v-for="(item, i) in filteredContactsList"
        :key="i"
      >
        <div class="header__item">
          <img :src="item.picture.large" alt="test" />
        </div>
        <span class="header__item">
          {{ item.name.first + " " + item.name.last }}
        </span>
        <span class="header__item">
          {{ formatDate(item.dob.date, item.dob.age) }}
        </span>
        <span class="header__item centered-item">
          {{ item.email }}
          <input type="hidden" :id="'email_' + i" :value="item.email" />
          <span class="icon-item" @click.prevent="copyValue('email_' + i)">
            <img src="../assets/copy.png" alt="copy" />
          </span>
        </span>
        <span class="header__item centered-item">
          {{ item.cell }}
          <input type="hidden" :id="'cell_' + i" :value="item.cell" />
          <span class="icon-item" @click.prevent="copyValue('cell_' + i)">
            <img src="../assets/copy.png" alt="copy" />
          </span>
        </span>
        <span class="header__item">
          {{ item.location.country + ", " + item.location.city }}
        </span>
        <span class="header__item">
          {{ item.nat }}
        </span>
      </div>
    </div>
    <Pagination :objects="contactsList" :current-page="currentPage" />
    <Statistics v-if="contactsList" :contacts="contactsList" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "../store";
import formatDate from "../utils/formatDate";
import Pagination from "../components/Pagination.vue";
import Statistics from "../components/Statistics.vue";
import FilterComponent from "../components/Filter.vue";

export default {
  store,
  components: {
    Pagination,
    Statistics,
    FilterComponent,
  },
  data() {
    return {
      contacts: store.getters.getContacts,
      selected: store.getters.getTableView,
      tempContacts: null,
      options: [
        { text: "Табличный", value: "table" },
        { text: "Плиточный", value: "tiled" },
      ],
      page: 1,
      sort: null,
    };
  },
  methods: {
    ...mapActions({
      setContacts: "setContacts",
      setTableView: "setTableView",
    }),
    formatDate,
    //Фильтрация опций фильтрации
    filterOptions(type) {
      if (this.getCopiedContacts === null && this.getContacts)
        store.commit("SET_COPIED_CONTACTS", [...this.getContacts]);
      const options = this.getCopiedContacts;
      switch (type) {
        //Уникальные национальности
        case "nationality": {
          return [...new Set(options?.map((item) => item.nat))];
        }
        //Пол
        case "gender": {
          return [...new Set(options?.map((item) => item.gender))];
        }
        //Полное имя
        case "fullName": {
          const filteredList = options?.map((item) => item.name);
          const temp = [];
          filteredList?.map((item, i) => {
            temp[i] = item.first + " " + item.last;
          });
          return temp;
        }
        default:
          return null;
      }
    },
    //Задание вида отображения таблицы
    setView(e) {
      this.setTableView(e.target.value);
    },
    //Обновление списка контактов
    refresh() {
      //Сброс фильтров, пагинации и сортировки
      store.commit("SET_PAGE", 0);
      store.commit("SET_FULL_NAME", null);
      store.commit("SET_GENDER", null);
      store.commit("SET_NATION", null);
      this.setSort("clear");
      //Получение обновленного списка контактов по api
      this.setContacts();
    },
    //Сортировка контактов по имени
    setSort(value) {
      if (value) this.sort = null;
      //Сортировка от A до Z
      const aToZ = () => {
        return [...this.getContacts].sort((a, b) =>
          a.name.first + " " + a.name.last > b.name.first + " " + b.name.last
            ? 1
            : -1
        );
      };
      //Сортировка от Z до A
      const zToA = () => {
        return [...this.getContacts].sort((a, b) =>
          a.name.first + " " + a.name.last > b.name.first + " " + b.name.last
            ? -1
            : 1
        );
      };
      //Сортировка в зависимости от выбранного состояния фильтра (если не передан параметр в функцию)
      if (!value) {
        switch (this.sort) {
          case null: {
            //Ререзвная копия значального списка контактов
            if (this.getCopiedContacts === null)
              store.commit("SET_COPIED_CONTACTS", [...this.getContacts]);
            //Задание типа сортировки "от A до Z"
            this.sort = "asc";
            //Если есть выбранные фильтры, то копируем отфильтрованный список
            if (
              store.getters.getNationalFilter ||
              store.getters.getGenderFilter ||
              store.getters.getFullNameFilter
            )
              store.commit("SET_SORTED_CONTACTS", [...this.getContacts]);
            store.commit("SET_CONTACTS", aToZ());
            break;
          }
          //От A до Z
          case "asc": {
            this.sort = "desc";
            store.commit("SET_CONTACTS", zToA());
            break;
          }
          //от Z до A
          case "desc": {
            this.sort = null;
            if (
              store.getters.getNationalFilter ||
              store.getters.getGenderFilter ||
              store.getters.getFullNameFilter
            )
              store.commit("SET_CONTACTS", [...this.getSortedContacts]);
            else store.commit("SET_CONTACTS", [...this.getCopiedContacts]);
            break;
          }
          default: {
            this.sort = null;
            store.commit("SET_CONTACTS", this.getCopiedContacts);
            break;
          }
        }
      }
    },
    //Копирование значения
    copyValue(e) {
      let valueToCopy = document.querySelector(`#${e}`);
      valueToCopy.setAttribute("type", "text");
      valueToCopy.select();
      document.execCommand("copy");

      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "успешно" : "неуспешно";
        alert("Скопировано " + msg);
      } catch (err) {
        alert("Не удалось скопировать");
      }
      valueToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
  computed: {
    ...mapGetters({
      getContacts: "getContacts",
      getCopiedContacts: "getCopiedContacts",
      getSortedContacts: "getSortedContacts",
      getFilteredContacts: "getFilteredContacts",
      getCurrentPage: "getPage",
      getUserRole: "getUserRole",
    }),
    userRole() {
      return this.getUserRole;
    },
    contactsList() {
      return this.getContacts;
    },
    filteredContactsList() {
      return this.getFilteredContacts;
    },
    currentPage() {
      if (this.getCurrentPage === null) {
        store.commit("SET_PAGE", 0);
        return 0;
      } else {
        return this.getCurrentPage;
      }
    },
  },
  mounted() {
    this.setContacts();
  },
};
</script>

<style lang="scss" scoped>
@mixin icon {
  display: flex;
  margin-left: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
.tiled {
  flex-wrap: wrap;
  background-color: cadetblue;
  color: white;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  gap: 10px;
}
.menu {
  display: flex;
  height: 35px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  select {
    cursor: pointer;
  }
}
.filter-block {
  display: flex;
  flex-direction: row;
  select {
    margin: 0 5px;
    &:first-child {
      margin-left: 10px;
    }
  }
}
.sort-block {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  &__item {
    margin: 0 5px;
    &:last-child {
      margin-right: 10px;
    }
  }
}
.icon-item {
  @include icon;
  width: 20px;
  height: 20px;
  img {
    width: 15px;
    height: 15px;
  }
  &.refresh-btn {
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.sort {
  &-item {
    @include icon;
    width: 20px;
    height: 20px;
    img {
      transition: width, height, transform, 0.5s, 0.5s, 0.5s;
    }
  }
  &-name-item {
    @include icon;
    img {
      margin-left: 5px;
      transition: width, height, transform, 0.5s, 0.5s, 0.5s;
    }
  }
  &-null {
    img {
      width: 15px;
      height: 15px;
      transform: rotate(180deg);
    }
  }
  &-asc {
    img {
      width: 20px;
      transform: rotate(180deg);
    }
  }
  &-desc {
    img {
      width: 20px;
      transform: rotate(0deg);
    }
  }
}
.table {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: row;
  background-color: #2c3e50;
  color: white;
  height: 50px;
  align-items: center;
  &__item {
    flex: 1;
    text-align: center;
  }
}
.centered-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px 0 0;
  background-color: cadetblue;
  color: white;
  align-items: center;
  &:last-child {
    padding-bottom: 5px;
  }
}
.block {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
</style>
