<template>
  <div class="goods-info">
    <div class="info">
      <img class="cover" :src="detail.coverImg" alt="暂无封面" />
      <p class="name">{{ detail.name }}</p>
      <p class="desc">
        <svg
          class="guarantee"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M893.359817 142.982769c-141.157457 0-270.146168-48.674985-360.19489-133.856209-12.168746-12.168746-31.63874-12.168746-43.807487 0-87.614973 85.181224-219.037433 133.856209-360.19489 133.856209-17.036245 0-31.63874 14.602496-31.63874 31.63874V561.587641c0 124.121212 65.71123 238.507427 172.796197 309.086156l223.904931 146.024955c4.867499 2.433749 12.168746 4.867499 17.036245 4.867499 4.867499 0 12.168746-2.433749 17.036245-4.867499l223.904932-146.024955C861.721076 800.095068 924.998557 683.275104 924.998557 561.587641V174.621509c0-17.036245-14.602496-31.63874-31.63874-31.63874zM569.671165 668.672608c0 21.903743-24.337493 46.241236-58.409982 46.241236-36.506239 0-58.409982-24.337493-58.409982-46.241236 0-31.63874 36.506239-53.542484 36.506239-99.783719 0-58.409982-51.108734-138.723708-51.108734-189.832442 0-38.939988 29.204991-65.71123 73.012477-65.71123s73.012478 26.771242 73.012478 65.71123c0 48.674985-51.108734 131.42246-51.108734 189.832442 2.433749 51.108734 36.506239 65.71123 36.506238 99.783719z"
            fill="#F5B53A"
          ></path>
        </svg>
        安全保障
      </p>
      <p class="price">￥{{ detail.price }}</p>
    </div>
    <div class="details">
      <h6 class="title">商品详情</h6>
      <div class="content">
        <img
          v-for="(item, index) in detail.details.imgUrl"
          :src="item"
          alt=""
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods-info",
  props: ["detail"],
};
</script>
<style lang="less" scoped>
.goods-info {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  font-size: 0.14rem;
  .info {
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    background-color: white;
    .cover {
      width: 100%;
      height: 3rem;
    }
    .name {
      color: #333333;
      padding: 0 0.12rem;
    }
    .desc {
      font-size: 0.13rem;
      color: #aaaaaa;
      padding: 0 0.12rem;
      display: flex;
      align-items: center;
      .guarantee {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
    .price {
      color: orange;
      padding: 0 0.12rem;
      font-size: 0.18rem;
    }
  }
  .details {
    background-color: white;
    font-size: 0.12rem;
    width: 100%;
    .title {
      padding: 0 0.12rem;
      font-weight: normal;
      font-size: 0.16rem;
      line-height: 3;
    }
    /deep/ .content img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
