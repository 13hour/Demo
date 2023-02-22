<template>
  <div class="back">
    <slot name="back"></slot>
    <div class="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "back-title",
};
</script>

<style lang="less" scoped>
.back {
  width: 100%;
  height: 0.4rem;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 0.08rem;
  border-bottom: 1px solid #efeded;
  .icon {
    width: 0.28rem;
    height: 0.28rem;
    color: #3f5577;
  }
  .title {
    width: 100%;
    font-size: 0.15rem;
    color: #3f5577;
    text-align: center;
    letter-spacing: 0.04rem;
  }
}
</style>
