<template>
  <header>
    <div class="user-info">
      <div class="user">
        <slot name="avtar" class="img"></slot>
        <div class="info">
          <p class="name">
            <slot name="name"></slot>
          </p>
          <p class="identify">
            <slot name="identify"></slot>
          </p>
        </div>
      </div>
      <div class="story">
        <div class="balance">
          <p class="title">我的余额</p>
          <p class="num">
            <slot name="balance"></slot>
          </p>
        </div>
        <div class="income">
          <p class="title">回鱼收入</p>
          <p class="num">
            <slot name="income"></slot>
          </p>
        </div>
        <div class="money">
          <p class="title">中标金额</p>
          <p class="num">
            <slot name="winTheBid"></slot>
          </p>
        </div>
        <div class="coupon">
          <p class="title">优惠卷</p>
          <p class="num">
            <slot name="coupon"></slot>
          </p>
        </div>
      </div>
    </div>
    <div class="circle"></div>
  </header>
</template>

<script>
export default {
  name: "header-my",
};
</script>

<style lang="less" scoped>
header {
  padding: 0.12rem 0.12rem 0.62rem 0.12rem;
  font-size: 0.12rem;
  background-color: #282828;
  position: relative;
  .user {
    padding: 0.08rem;
    display: flex;
    align-items: center;
    gap: 0.08rem;
    color: white;
    img {
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
    }
    .info {
      .name {
        font-size: 0.15rem;
        line-height: 1.3;
      }
      .identify {
        font-size: 0.12rem;
        line-height: 1.3;
      }
    }
  }
  .story {
    padding: 0.12rem 0.12rem 0.12rem 0.12rem;
    color: white;
    display: flex;
    .balance,
    .income,
    .money,
    .coupon {
      flex: 1;
      text-align: center;
    }
    .title {
      font-size: 0.15rem;
      line-height: 1.5;
    }
    .num {
      font-size: 0.13rem;
      line-height: 3;
    }
  }
  .circle {
    background-color: white;
    width: 100%;
    height: 0.42rem;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    position: absolute;
    left: 0;
    transform: translateY(0.24rem);
  }
}
</style>
