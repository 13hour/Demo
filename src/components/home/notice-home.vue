<template>
  <div class="notice">
    <svg
      class="icon"
      viewBox="0 0 1261 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1147.133 460.907l-213.577 0c-24.231 0-43.857 19.731-43.857 44.031l0 13.743c0 24.335 19.627 44.031 43.857 44.031l213.577 0c24.231 0 43.857-19.696 43.857-44.031l0-13.743c0-24.3-19.627-44.031-43.857-44.031zM651.579 83.011c-66.427 52.823-205.443 126.865-305.481 198.035l-0.139 0.069c-1.143 0.693-2.285 4.639-3.427 5.296-11.839 6.646-17.135 25.027-81.381 25.027l-125.343 0c-32.157 0-52.131 15.057-52.131 49.015l0 301.846c0 33.957 18.311 50.711 52.131 50.711l125.861 0c63.935 0.104 69.127 18.346 80.896 24.993 1.143 0.657 2.25 4.604 3.427 5.296l0.139 0.069c96.889 71.169 236.839 150.993 305.481 201.635 20.665 15.265 89.411 42.093 89.411-52.235 0-111.011 0-651.427 0-761.539 0-94.361-69.3-64.211-89.446-48.219zM848.818 291.119c11.354 20.007 33.819 25.027 50.227 11.215l175.569-147.981c16.407-13.811 20.493-41.227 9.173-61.269l-6.439-11.319c-11.319-20.007-33.819-25.027-50.193-11.215l-175.569 147.946c-16.407 13.846-20.527 41.261-9.173 61.269l6.404 11.354zM899.01 722.046c-16.407-13.811-38.873-8.793-50.227 11.181l-6.404 11.319c-11.354 20.007-7.2 47.423 9.173 61.269l175.569 147.946c16.407 13.811 38.873 8.793 50.193-11.181l6.439-11.319c11.319-20.007 7.2-47.423-9.173-61.269l-175.569-147.946z"
        fill="#13227a"
      ></path>
    </svg>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" vertical>
        <van-swipe-item v-for="item in noticeData" v-once :key="item.id">
          {{ item.content }} <span class="date">{{ item.created_at }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "notice-home",
  props: {
    noticeData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.notice {
  width: 100%;
  height: 0.32rem;
  font-size: 0.12rem;
  margin: 0.12rem 0;
  color: #333333;
  line-height: 0.32rem;
  overflow: hidden;
  border-radius: 0.1rem;
  z-index: 32;
  background-color: white;

  display: flex;
  align-items: center;
  .icon {
    width: 0.24rem;
    height: 0.24rem;
  }
  .swipe {
    text-align: center;
    width: 100%;
    height: 0.32rem;
    .date {
      color: #aaaaaa;
    }
  }
}
</style>
