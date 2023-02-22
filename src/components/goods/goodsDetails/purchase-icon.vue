<template>
  <div class="purchase">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon
        url="#/collected"
        icon="cart-o"
        text="购物车"
        :badge="cart_num"
        @click="J_shop_cart"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="openSku" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "purchase-icon",
  date() {},
  computed: {
    cart_num() {
      return this.$store.getters.getUserData.data.collection.length;
    },
  },
  methods: {
    J_shop_cart() {
      location.hash = "#/collected";
    },
    openSku() {
      this.$emit("buy");
    },
  },
};
</script>

<style lang="less" scoped>
.purchase {
  position: fixed;
  height: 0.5rem;
  width: 100%;
  bottom: 0;
  @media screen and (min-width: 730px) {
    /deep/ .van-goods-action {
      width: 730px;
      margin: 0 auto;
    }
  }
}
</style>
