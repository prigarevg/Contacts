<template>
  <div v-if="pageCount > 1" class="pagination__block">
    <button :disabled="currentPage === 0" @click="prevPage">Назад</button>
    <div class="pagination">
      <button
        v-if="currentPage >= visiblePageCount - 1"
        type="button"
        :class="{ active: isPageActive(firstPage) }"
        @click="setPage(firstPage)"
      >
        {{ firstPage }}
      </button>
      <span class="dots" v-if="currentPage >= visiblePageCount"> ... </span>
      <ul class="buttons-block">
        <li v-for="(page, i) in pages" :key="i" class="pagination-item">
          <button
            type="button"
            :class="{ active: isPageActive(page.name) }"
            @click="setPage(page.name)"
            :disabled="page.isDisabled"
          >
            {{ page.name }}
          </button>
        </li>
      </ul>
      <span class="dots" v-if="currentPage < pageCount - visiblePageCount">
        ...
      </span>
      <button
        v-if="currentPage <= pageCount - visiblePageCount"
        type="button"
        :class="{ active: isPageActive(pageCount) }"
        @click="setPage(pageCount)"
      >
        {{ pageCount }}
      </button>
    </div>
    <button :disabled="currentPage >= pageCount - 1" @click="nextPage">
      Далее
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    objects: Array,
    currentPage: {
      type: Number,
      default: 0,
    },
    //Количество выводимых на странице элементов
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      //Видимый диапазон страниц
      visiblePageCount: 3,
    };
  },
  methods: {
    ...mapActions({
      setFilteredContacts: "setFilteredContacts",
      setCurrentPage: "setCurrentPage",
    }),
    //Переключение на следующую страницу
    nextPage() {
      this.setCurrentPage(this.currentPage + 1);
    },
    //Выбор страницы
    setPage(value) {
      this.setCurrentPage(value - 1);
    },
    //Переключение на предыдущую страницу
    prevPage() {
      this.setCurrentPage(this.currentPage - 1);
    },
    //Получение пагинированного списка контактов
    paginatedData() {
      const start = this.currentPage * this.size,
        end = start + this.size;
      this.setFilteredContacts(this.objects?.slice(start, end));
    },
    //Проверка на выбранную страницу
    isPageActive(page) {
      return this.currentPage === page - 1;
    },
  },
  watch: {
    currentPage() {
      this.paginatedData();
    },
    objects() {
      this.paginatedData();
    },
  },
  computed: {
    //Первая страница для случая, когда активная страница вышла за пределы видимого диапазона страниц
    firstPage() {
      if (this.pageCount > 1) return 1;
    },
    //Начальная страница среди выбранного диапазона страниц
    startPage() {
      if (this.currentPage === 0) {
        return 1;
      }

      if (
        this.currentPage === this.pageCount - 1 &&
        this.pageCount >= this.visiblePageCount
      ) {
        return this.pageCount - this.visiblePageCount + 1;
      }

      return this.currentPage;
    },
    //Последняя страница среди выбранного диапазона страниц
    endPage() {
      return Math.min(
        this.startPage + this.visiblePageCount - 1,
        this.pageCount
      );
    },
    //Получение видимого диапазона страниц
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage + 1,
        });
      }

      return range;
    },
    //Количество страниц
    pageCount() {
      let l = this.objects?.length,
        s = this.size;
      return Math.ceil(l / s);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
.pagination {
  display: flex;
  align-items: center;
  padding: 0 10px;
  &__block {
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: center;
  }
  .buttons-block {
    padding: 0;
  }
  .dots {
    padding: 0 5px;
  }
}
</style>
