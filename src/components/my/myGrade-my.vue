<template>
  <div class="container">
    <div class="myGrade">
      <h6 class="title">我的成绩</h6>
      <div class="grade">
        <div class="fishCatch">
          <p class="title">鱼获</p>
          <p class="num">
            <slot name="fish"></slot>
          </p>
        </div>
        <div class="time">
          <p class="title">次数</p>
          <p class="num">
            <slot name="count"></slot>
          </p>
        </div>
        <div class="overAHundred">
          <p class="title">过百</p>
          <p class="num">
            <slot name="hundred"></slot>
          </p>
        </div>
        <div class="pitCrown">
          <p class="title">坑冠</p>
          <p class="num">
            <slot name="champion"></slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myGrade-my",
};
</script>

<style lang="less" scoped>
.container {
  margin-top: 1.36rem;
  padding: 0.12rem;
  .myGrade {
    padding: 0 0.12rem 0.12rem 0.12rem;
    background-color: white;
    border-radius: 0.1rem;
    z-index: 38;
    .title {
      line-height: 3;
      font-size: 0.18rem;
      font-weight: normal;
    }
    .grade {
      color: #333333;
      display: flex;
      .fishCatch,
      .time,
      .overAHundred,
      .pitCrown {
        flex: 1;
        text-align: center;
      }
      .title {
        font-size: 0.16rem;
        line-height: 1.5;
      }
      .num {
        font-size: 0.15rem;
        line-height: 3;
      }
    }
  }
}
</style>
