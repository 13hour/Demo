<template>
  <div class="pondList">
    <menu>
      <li class="item" v-for="item in fish_pond" :key="item.id">
        <a class="cover">
          <img :src="item.coverImg" alt="暂无封面" />
        </a>
        <div class="info">
          <h6 class="title">{{ item.name }}</h6>
          <div class="desc">
            {{ item.desc }}
          </div>
          <p class="price">
            <span class="yuan">￥{{ item.price }}</span>
          </p>
        </div>
      </li>
    </menu>
  </div>
</template>

<script>
export default {
  name: "pond-list-home",
  props: {
    fish_pond: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.pondList {
  width: 100%;
  height: auto;
  border-radius: 0.1rem;
  background-color: white;
  overflow: hidden;
  menu {
    padding: 0 0.1rem;
    .item {
      display: flex;
      align-items: center;
      gap: 0.18rem;
      font-size: 0;
      padding: 0.2rem 0;
      &:nth-child(n) {
        border-bottom: 1px solid #efeded;
      }
      &:last-child {
        border-bottom: none;
      }
      .cover {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.15385rem;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 0.18rem;
        .title {
          font-size: 0.16rem;
        }
        .desc {
          font-size: 0.12rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; //文本最多行数
          overflow: hidden;
        }
        .price {
          font-size: 0.14rem;
        }
        .yuan {
          color: orange;
          font-size: 0.14rem;
        }
      }
    }
  }
}
</style>
