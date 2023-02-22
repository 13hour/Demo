<template>
  <div class="competitions">
    <menu>
      <li class="item" v-for="item in competitions" :key="item.id">
        <a class="cover">
          <img :src="item.pic_url[0].url" alt="暂无封面" />
          <div class="isEnded" v-if="item.is_end === 2">活动已结束</div>
        </a>
        <h6 class="title">{{ item.match_name }}</h6>
        <p class="description">
          {{ item.match_detail }}
        </p>
        <div class="footer">
          <p class="time">
            时间: <span>{{ item.created_at.slice(0, 10) }} </span>
          </p>
          <p class="address">
            地点: <span>{{ item.address }} </span>
          </p>
        </div>
      </li>
    </menu>
  </div>
</template>

<script>
export default {
  name: "competitions-home",
  props: {
    competitions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.competitions {
  menu {
    .item {
      position: relative;
      padding: 0.12rem;
      font-size: 0;
      background-color: white;
      margin-bottom: 0.12rem;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.12rem;
      .cover {
        width: 100%;
        height: 2.55rem;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
        }
      }
      .title {
        white-space: pre-wrap;
        text-align: justify;
        font-size: 0.18rem;
        color: #3f5577;
      }
      .description {
        display: flex;
        text-align: justify;
        justify-content: space-between;
        white-space: pre-line;
        line-height: 1.5;
        font-size: 0.14rem;
      }
      .footer {
        font-size: 0.13rem;
        display: flex;
        .time {
          span {
            color: #3e88f8;
          }
        }
        .address {
          margin-left: auto;
          span {
            color: #3e88f8;
          }
        }
      }
      .isEnded {
        font-size: 0.14rem;
        position: absolute;
        top: 0;
        right: 0;
        background-color: red;
        color: white;
        padding: 0.04rem 0.32rem;
        transform: rotate(45deg) translate(0.4rem, -0.1rem);
      }
    }
  }
}
</style>
