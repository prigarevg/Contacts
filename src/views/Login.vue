<template>
  <div class="radio-group">
    <div class="radio-buttons">
      <span>
        <input id="admin" v-model="picked" type="radio" value="admin" />
        <label for="admin">Администратор</label>
      </span>
      <span>
        <input id="user" v-model="picked" type="radio" value="user" />
        <label for="user">Пользователь</label>
      </span>
    </div>
    <button :disabled="!picked" class="submit-btn" @click="makeLogin">
      Войти
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      picked: null,
    };
  },
  methods: {
    ...mapActions({
      login: "login",
    }),
    //Логин с выбранным типом пользователя
    makeLogin() {
      if (this.picked) {
        this.login(this.picked);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  &-group {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    font-size: 20px;
    width: 25vw;
  }
  &-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 30px;
    input[type="radio"] {
      display: none;
      &:checked {
        + {
          label {
            background: #627fad;
            color: white;
            &:hover {
              border: 1px solid #0050d3;
              border-radius: 10px;
            }
          }
        }
      }
    }
    label {
      display: inline-block;
      cursor: pointer;
      text-align: center;
      padding: 0 15px;
      line-height: 34px;
      border: 1px solid #999;
      border-radius: 6px;
      transition-property: border, border-radius;
      transition-duration: 1s, 0.5s;
      user-select: none;
      &:hover {
        border: 1px solid #0050d3;
        border-radius: 10px;
      }
    }
  }
}
.submit-btn {
  background-color: #627fad;
  color: white;
  border: 1px solid #284b85;
  font-size: 18px;
  border-radius: 1px 1px 15px 15px;
  cursor: pointer;
  transition: background-color 0.5s;
  &:hover {
    background-color: #284b85;
  }
  &:disabled {
    background-color: gray;
  }
}
</style>
