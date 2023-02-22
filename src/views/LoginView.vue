<template>
  <div class="contain">
    <img alt="" class="title" src="../../public/images/fish.png" />
    <div id="Login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.name"
          :rules="[{ required: true, message: '请填写用户名' }]"
          label="用户名"
          name="用户名"
          placeholder="用户名(钓鱼小达人)"
        />
        <van-field
          v-model="user.password"
          :rules="[{ required: true, message: '请填写密码' }]"
          label="密码"
          name="密码"
          placeholder="密码(123456)"
          type="password"
        />
        <div style="margin: 0.16rem">
          <van-button block native-type="submit" round type="info"
            >提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import User from "../../public/data/user";
import user from "../../public/data/user";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(values) {
      this.user.name = User.getUserInfo().name;
      this.user.password = user.getUserInfo().password;
      if (user.name === values.用户名 && user.password === values.密码) {
        const token = new Date().getTime();
        localStorage.setItem("token", JSON.stringify(token));
        location.replace("#/");
        Toast("登录成功");
      } else {
        Toast("用户名或密码错误");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.contain {
  width: 100vw;
  height: 100vh;
  background-image: url("https://img1.baidu.com/it/u=1135335742,2301503984&fm=253&fmt=auto&app=138&f=JPEG?w=341&h=500");
  background-size: cover;
  z-index: 101;

  .title {
    width: 180%;
    height: 1.6rem;
    transform: translate(8%, 60%);
  }

  #Login {
    width: 80%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 33;
  }
}
</style>
