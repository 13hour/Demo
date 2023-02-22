<template>
  <div id="home">
    <swiper-home :swiperImg="swiperImg" :key="redrawFlag"></swiper-home>
    <notice-home :noticeData="noticeData" :key="redrawFlag + 1"></notice-home>
    <a class="title" href="#/fishPonds">
      开钓付费<span class="more">更多</span>
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M707.61856 495.14624l-357.5296-357.5296c-9.30816-9.30688-24.40064-9.30688-33.70752 0-9.30816 9.30816-9.30816 24.40064 0 33.7088L657.056 512 316.38144 852.67456c-9.30816 9.30688-9.30816 24.40064 0 33.7088 4.65408 4.65536 10.75328 6.98112 16.85376 6.98112 6.10048 0 12.19968-2.32576 16.85376-6.98112l357.5296-357.5296C716.92672 519.5456 716.92672 504.4544 707.61856 495.14624z"
          fill="#aaaaaa"
        ></path>
      </svg>
    </a>
    <pond-list-home :fish_pond="getPondsList"></pond-list-home>
    <a class="title">
      比赛预约<span class="more">更多</span>
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M707.61856 495.14624l-357.5296-357.5296c-9.30816-9.30688-24.40064-9.30688-33.70752 0-9.30816 9.30816-9.30816 24.40064 0 33.7088L657.056 512 316.38144 852.67456c-9.30816 9.30688-9.30816 24.40064 0 33.7088 4.65408 4.65536 10.75328 6.98112 16.85376 6.98112 6.10048 0 12.19968-2.32576 16.85376-6.98112l357.5296-357.5296C716.92672 519.5456 716.92672 504.4544 707.61856 495.14624z"
          fill="#aaaaaa"
        ></path>
      </svg>
    </a>
    <competitions-home
      :competitions="competitions"
      :key="redrawFlag + 3"
    ></competitions-home>
  </div>
</template>

<script>
import swiperHome from "@/components/home/swiper-home";
import api from "@/assets/api/index";
import noticeHome from "@/components/home/notice-home";
import pondListHome from "@/components/home/pond-list-home";
import competitionsHome from "@/components/home/competitions-home";
import { mapGetters } from "vuex";
export default {
  name: "home-view",
  components: {
    swiperHome,
    noticeHome,
    pondListHome,
    competitionsHome,
  },
  data() {
    return {
      swiperImg: [],
      noticeData: [],
      competitions: [],
      redrawFlag: 0,
    };
  },
  created() {
    this.getSwipeData();
    this.getNoticeData();
    this.getCompetitions();
  },
  computed: {
    ...mapGetters(["getPondsList"]),
  },
  methods: {
    async getSwipeData() {
      const response = await this.axios({
        url: "/fish" + api.home.swipe.path,
        method: api.home.swipe.method,
        params: {
          _mall_id: api.home.swipe.query._mall_id,
          r: api.home.swipe.query.r,
        },
      });
      response.data.data.home_pages[0].banners.forEach((el) => {
        this.swiperImg.push({
          id: el.id,
          picUrl: el.pic_url,
        });
      });
      this.redrawFlag++;
    },
    async getNoticeData() {
      const response = await this.axios({
        url: "/fish" + api.home.notice.path,
        method: api.home.notice.method,
        params: {
          _mall_id: api.home.notice.query._mall_id,
          r: api.home.notice.query.r,
        },
      });
      this.noticeData = response.data.data;
      this.redrawFlag++;
    },
    async getCompetitions() {
      const response = await this.axios({
        url: "/fish" + api.home.competitions.path,
        method: api.home.competitions.method,
        params: {
          _mall_id: api.home.competitions.query._mall_id,
          r: api.home.competitions.query.r,
          page: api.home.competitions.query.page,
        },
      });
      this.competitions = response.data.data.list;
      this.redrawFlag++;
    },
  },
};
</script>

<style lang="less" scoped>
@ThemeColor: #3f5577;
@FontColor: #aaaaaa;
#home {
  width: 100%;
  height: auto;
  padding: 0.08rem 0.12rem;
  margin-bottom: 0.5rem;
  .title {
    font-size: 0.2rem;
    width: 100%;
    height: 0.42rem;
    line-height: 0.42rem;
    font-weight: normal;
    color: @ThemeColor;
    display: flex;
    align-items: center;
    gap: 0.04rem;
    margin-top: 0.16rem;
    .more {
      display: inline-block;
      font-size: 0.14rem;
      color: @FontColor;
      margin-left: auto;
    }
    .icon {
      width: 0.15rem;
      height: 0.15rem;
    }
  }
}
</style>
