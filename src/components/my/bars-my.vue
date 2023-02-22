<template>
  <div class="bars">
    <div class="content">
      <a class="box" href="#/orders">
        <img src="../../../public/images/我的订单.png" alt="" />
        <p class="title">商品订单</p>
      </a>
      <a class="box" href="#/book">
        <img src="../../../public/images/下单预约.png" alt="" />
        <p class="title">鱼塘订单</p>
      </a>
      <a class="box" href="#/collected">
        <img src="../../../public/images/收藏.png" alt="" />
        <p class="title">购物车</p>
      </a>
      <a class="box" href="#/store">
        <img src="../../../public/images/商城.png" alt="" />
        <p class="title">商城</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "bars-my",
};
</script>

<style lang="less" scoped>
.bars {
  padding: 0 0.12rem 0.12rem 0.12rem;
  .content {
    display: flex;
    background-color: white;
    border-radius: 0.12rem;
    padding: 0.06rem 0;
    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.06rem 0;
      text-align: center;
      color: #333333;
      &:active {
        background-color: rgba(241, 235, 235, 0.3);
        .title {
          color: #3f5577;
        }
      }
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      .title {
        font-size: 0.14rem;
        line-height: 2;
      }
    }
  }
}
</style>
