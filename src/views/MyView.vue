<template>
  <div id="my">
    <header-my>
      <template v-slot:avtar> <img :src="user_info.avtar" alt="" /></template>
      <template v-slot:name>用户名：{{ user_info.name }}</template>
      <template v-slot:identify>ID：{{ user_info.ID }}</template>
      <template v-slot:balance>￥{{ user_info.balance }}</template>
      <template v-slot:income>￥{{ user_info.income }}</template>
      <template v-slot:winTheBid>￥{{ user_info.winTheBid }}</template>
      <template v-slot:coupon>{{ user_info.coupon }}</template>
    </header-my>
    <offer-notice-my></offer-notice-my>
    <my-grade-my>
      <template v-slot:fish>{{ user_info.grade.fishGoods }}</template>
      <template v-slot:count>{{ user_info.grade.count }}</template>
      <template v-slot:hundred>{{ user_info.grade.overAHundred }}</template>
      <template v-slot:champion>{{ user_info.grade.pitCrown }}</template>
    </my-grade-my>
    <bars-my></bars-my>
    <other-my></other-my>
    <div class="quit">
      <van-button type="danger" size="large" round @click="quit"
        >退出</van-button
      >
    </div>
  </div>
</template>

<script>
import headerMy from "@/components/my/header-my";
import offerNoticeMy from "@/components/my/offerNotice-my";
import myGradeMy from "@/components/my/myGrade-my";
import barsMy from "@/components/my/bars-my";
import otherMy from "@/components/my/other-my";
import USER from "../../public/data/user";
import { Dialog } from "vant";
export default {
  name: "my-view",
  components: {
    headerMy,
    offerNoticeMy,
    myGradeMy,
    barsMy,
    otherMy,
  },
  data() {
    return {
      user_info: null,
    };
  },
  created() {
    this.user_info = USER.getUserInfo();
  },
  methods: {
    quit() {
      Dialog.confirm({
        message: "是否选择退出登录",
      })
        .then(() => {
          localStorage.removeItem("token");
          location.replace("#/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
#my {
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 0.75rem;
  .quit {
    font-size: 0;
    width: 50%;
    height: auto;
    margin: 0.14rem auto;
  }
}
</style>
