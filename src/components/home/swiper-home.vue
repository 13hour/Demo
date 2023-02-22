<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperImg" v-once :key="item.id">
        <img :src="item.picUrl" alt="" class="pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "swiper-home",
  props: {
    swiperImg: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 1.5rem;
  z-index: 32;
  .my-swipe .van-swipe-item {
    text-align: center;
    width: 100%;
    height: 1.5rem;
    .pic {
      display: block;
      border-radius: 0.1rem;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
