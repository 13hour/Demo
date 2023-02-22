<template>
  <div class="fishPonds">
    <back-title>
      <template v-slot:back>
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          @click="back"
        >
          <path
            d="M677.391515 873.916768c-7.86101 0-15.618586-2.999596-21.617778-8.895354L324.473535 533.721212c-11.998384-11.894949-11.998384-31.340606 0-43.235555L655.670303 159.288889c5.999192-5.999192 13.756768-8.895354 21.617778-8.895354 7.757576 0 15.618586 2.999596 21.617778 8.895354 11.894949 11.894949 11.894949 31.237172 0 43.235555L389.223434 512.103434 698.905859 821.785859c11.894949 11.998384 11.894949 31.340606 0 43.235555-5.895758 5.895758-13.756768 8.895354-21.514344 8.895354z m0 0"
          ></path>
        </svg>
      </template>
      <template v-slot:title>开钓付费</template>
    </back-title>
    <menu>
      <li class="item" v-for="item in getPondsList" :key="item.order_id">
        <a class="cover" :href="`#/pondPay?id=${item.id}`">
          <img :src="item.coverImg" alt="暂无封面" />
        </a>
        <div class="info">
          <h6 class="title">{{ item.name }}</h6>
          <div class="desc">{{ item.desc }}</div>
          <p class="price">
            <span class="yuan">￥{{ item.price }}</span>
          </p>
        </div>
      </li>
    </menu>
  </div>
</template>

<script>
import backTitle from "@/components/public/back-title";
import { mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  name: "FishPayView",
  components: {
    backTitle,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters(["getPondsList"]),
  },
  methods: {
    back() {
      history.back();
    },
    isConfirm() {
      Dialog.confirm({
        message: "是否提前结束",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.fishPonds {
  menu {
    padding: 0.12rem;
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    .item {
      display: flex;
      align-items: center;
      gap: 0.12rem;
      font-size: 0;
      padding: 0.08rem;
      background-color: white;
      border-radius: 0.1rem;
      position: relative;
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
        padding-top: 0.04rem;
        gap: 0.1rem;
        .van-count-down {
          padding: 0 0.02rem;
          background-color: red;
          color: white;
          border-radius: 0.06rem;
          font-size: 0.12rem;
          position: absolute;
          top: 0.04rem;
          right: 0.04rem;
        }
        .title {
          font-size: 0.16rem;
          color: #3f5577;
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
        footer {
          display: none;
        }
      }
    }
    .item.active {
      .info {
        footer {
          display: flex;
          gap: 0.04rem;
          .btn {
            white-space: nowrap;
            padding: 0.02rem 0.06rem;
            font-size: 0.08rem;
            background-color: #3f5577;
            border-radius: 0.05rem;
            color: white;
          }
        }
      }
    }
  }
}
</style>
