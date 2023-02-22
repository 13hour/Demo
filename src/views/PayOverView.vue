<template>
  <div class="container">
    <div class="content">
      <div class="userInfo">
        <div class="box">
          <img :src="avatar" alt="" />
          <p class="name">{{ name }}</p>
        </div>
        <p class="title">付款</p>
      </div>
      <p class="price">￥{{ $route.query.price }}</p>
      <button class="btn" @click="J_home">完成</button>
    </div>
  </div>
</template>
<script>
import User from "../../public/data/user";
export default {
  name: "PayOverView",
  data() {
    return {
      name: User.getUserInfo().name,
      avatar: User.getUserInfo().avtar,
    };
  },
  methods: {
    J_home() {
      location.replace("#/my");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .content {
    font-size: 0.18rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.84rem;
    align-items: center;
    justify-content: center;
    .userInfo {
      width: 100%;
      height: 0.64rem;
      display: flex;
      flex-direction: column;
      gap: 0.18rem;
      align-items: center;
      justify-content: center;
      .box {
        display: flex;
        gap: 0.12rem;
        img {
          border-radius: 50%;
          width: 0.32rem;
          height: 0.32rem;
        }
        .name {
          line-height: 0.32rem;
          font-size: 0.14rem;
        }
      }
      .title {
        color: #333333;
        font-weight: bold;
      }
    }
    .price {
      color: orange;
      font-size: 0.34rem;
    }
    .btn {
      border: none;
      background-color: #07c160;
      color: white;
      width: 2.4rem;
      height: 0.42rem;
      border-radius: 0.2rem;
      letter-spacing: 0.12rem;
      font-size: 0.16rem;
    }
  }
}
</style>
