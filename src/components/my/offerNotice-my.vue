<template>
  <div class="offerNotice">
    <h5 class="title">天鲤钓场·大优惠</h5>
    <h6 class="subheading">一次买够10场，即可享受免费赠送一场</h6>
    <menu>
      <li class="item">
        <p class="info">买10场赠送1场</p>
        <p class="name">鲤鱼塘</p>
        <p class="price">￥1200</p>
      </li>
      <li class="item">
        <p class="info">买10场赠送1场</p>
        <p class="name">综合塘</p>
        <p class="price">￥1100</p>
      </li>
    </menu>
  </div>
</template>

<script>
export default {
  name: "offerNotice-my",
};
</script>

<style lang="less" scoped>
.offerNotice {
  font-size: 0.12rem;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  width: 100%-8rem;
  height: 2rem;
  margin: 0 auto;
  position: absolute;
  transform: translate(0.15rem, -0.64rem);
  border-radius: 0.05rem;
  text-align: center;
  .title {
    font-size: 0.2rem;
    line-height: 2.5;
    color: #e6ccad;
  }
  .subheading {
    font-size: 0.12rem;
    color: #e6ccad;
    font-weight: lighter;
  }
  menu {
    display: flex;
    gap: 0.08rem;
    padding: 0 0.12rem;
    margin-top: 0.08rem;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 36;
    .item {
      background-color: #fff5e5;
      color: #3f5577;
      padding: 0.12rem;
      line-height: 1.5;
      border-radius: 0.05rem;
      border: 1px solid #d4a673;
      .info {
        font-size: 0.13rem;
        font-weight: bold;
        color: #333333;
      }
      .name {
        font-size: 0.15rem;
        color: #333333;
        line-height: 2.5;
      }
      .price {
        font-size: 0.17rem;
        padding: 0.02rem;
        border-radius: 0.2rem;
        color: #ecca94;
        background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
      }
    }
  }
}
</style>
