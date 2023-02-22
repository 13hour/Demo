<template>
  <div class="goods">
    <menu>
      <li class="good" v-for="item in goods" :key="item.id">
        <a :href="'#/details?type=' + item.type + '&' + 'id=' + item.id">
          <img class="cover" :src="item.coverImg" alt="暂无封面" />
          <div class="desc">{{ item.name }}</div>
          <p class="price">￥{{ item.price }}</p>
        </a>
      </li>
    </menu>
  </div>
</template>

<script>
export default {
  name: "goods-list",
  props: ["goods"],
};
</script>

<style lang="less" scoped>
.goods {
  menu {
    display: flex;
    flex-wrap: wrap;
    gap: 0.12rem;
    padding: 0.12rem;
    .good {
      background-color: white;
      width: 48%;
      height: 2.2rem;
      padding: 0.08rem;
      font-size: 0;
      text-align: center;
      color: #333333;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.12rem;
        color: #333333;
        width: 100%;
        .cover {
          height: 1.2rem;
          width: 1.2rem;
          display: block;
          vertical-align: middle;
        }
        .desc {
          font-size: 0.14rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; //文本最多行数
          overflow: hidden;
          line-height: 1.2;
          height: 0.34rem;
        }
        .price {
          font-size: 0.15rem;
          line-height: 2;
          color: orange;
        }
      }
    }
  }
}
</style>
