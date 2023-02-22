<template>
  <div class="orders">
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
      <template v-slot:title>商品订单</template>
    </back-title>
    <van-tabs v-model="activeName" title-active-color="#5d7291">
      <van-tab title="待付款" name="a"
        ><div class="box" v-for="item in obligation" :key="item.order_id">
          <p class="head">
            <span class="date">{{ item.date }}</span
            ><span class="tag">未付款</span>
          </p>
          <van-card
            :num="item.num"
            :price="item.unit_price"
            :desc="item.desc"
            :title="item.name"
            :thumb="item.coverImg"
            @click="J_Payment(item.order_id)"
          >
            <template #footer>
              <van-button
                size="small"
                @click.prevent="cancel(item.order_id)"
                color="#5d7291"
                >取消</van-button
              >
              <van-button
                size="small"
                @click.prevent="pay(item.order_id)"
                color="#5d7291"
                >付款</van-button
              >
            </template>
          </van-card>
        </div>
        <van-empty
          v-if="!obligation.length"
          description="没有待付款的商品订单"
        />
      </van-tab>
      <van-tab title="已付款" name="b"
        ><div class="box" v-for="item in paid" :key="item.order_id">
          <p class="head">
            <span class="date">{{ item.date }}</span
            ><span class="tag">已付款</span>
          </p>
          <van-card
            :num="item.num"
            :price="item.unit_price"
            :desc="item.desc"
            :title="item.name"
            :thumb="item.coverImg"
          >
            <template #tags>
              <van-tag plain color="#5d7291">{{ item.pond }}</van-tag>
              <van-tag plain color="#5d7291">{{ item.location }}</van-tag>
            </template>
            <template #footer>
              <span class="message">留言备注：{{ item.message }}</span>
              <van-button
                loading
                :loading-text="loading[item.step] + '...'"
                class="step"
                size="small"
              ></van-button>
            </template>
          </van-card>
        </div>
        <van-empty v-if="!paid.length" description="没有已付款的商品订单" />
      </van-tab>
      <van-tab title="已完成" name="c">
        <div class="box" v-for="item in complete" :key="item.order_id">
          <p class="head">
            <span class="date">{{ item.date }}</span
            ><span class="tag">已完成</span>
          </p>
          <van-card
            :num="item.num"
            :price="item.unit_price"
            :desc="item.desc"
            :title="item.name"
            :thumb="item.coverImg"
          >
            <template #tags>
              <van-tag plain color="#5d7291">{{ item.pond }}</van-tag>
              <van-tag plain color="#5d7291">{{ item.location }}</van-tag>
            </template>
            <template #footer>
              <span class="message">留言备注：{{ item.message }}</span>
              <van-button class="accept" size="small">已签收</van-button>
            </template>
          </van-card>
        </div>
        <van-empty v-if="!complete.length" description="没有已完成的商品订单" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import backTitle from "@/components/public/back-title";
import USER from "../.././../public/data/user";
export default {
  name: "OrdersView",
  components: {
    backTitle,
  },
  data() {
    return {
      activeName: "a",
      loading: ["发货中", "物流中", "已收货"],
    };
  },
  computed: {
    obligation() {
      return this.$store.getters.getUserData.data.goods_order.filter(
        (el) => el.flag === 0
      );
    },
    paid() {
      return this.$store.getters.getUserData.data.goods_order.filter(
        (el) => el.flag === 1
      );
    },
    complete() {
      return this.$store.getters.getUserData.data.goods_order.filter(
        (el) => el.flag === 2
      );
    },
  },
  created() {
    this.steps();
  },
  methods: {
    back() {
      history.back();
    },
    J_Payment(id) {
      location.hash = `#/payment?order_id=${id}`;
    },
    steps() {
      let goods = this.$store.getters.getUserData.data.goods_order;
      goods.map((order) => {
        if (order.flag === 1) {
          if (order.finished_us - new Date().getTime() >= 2 * 60 * 1000) {
            order.step = 0;
            USER.setUser_goods_order(order);
          } else if (order.finished_us - new Date().getTime() >= 60 * 1000) {
            order.step = 1;
            USER.setUser_goods_order(order);
          } else if (order.finished_us - new Date().getTime() < 60 * 1000) {
            order.step = 2;
            order.flag = 2;
            USER.setUser_goods_order(order);
          }
        }
      });
      this.$store.commit("updateUserData");
    },
    cancel(id) {
      USER.delUser_goods_order(id);
      this.$store.commit("updateUserData");
    },
    pay(id) {
      location.hash = `#/payment?order_id=${id}`;
    },
  },
};
</script>
<style lang="less" scoped>
.orders {
  width: 100%;
  .box {
    padding: 0.08rem 0.08rem 0.08rem 0.08rem;
    .head {
      font-size: 0.12rem;
      display: flex;
      align-items: center;
      padding: 0.08rem 0.16rem;
      border-radius: 0.1rem;
      background-color: white;
      .date {
        padding-left: 0.08rem;
      }
      .tag {
        margin-left: auto;
        font-size: 0.13rem;
        color: orange;
        padding: 0.04rem;
      }
    }
  }
  .message {
    display: inline-block;
    height: 100%;
    margin-right: auto;
    padding-top: 0.08rem;
  }
  /deep/ .van-card__footer {
    display: flex;
    white-space: nowrap;
    .van-button:first-child {
      margin-left: auto;
    }
    .accept {
      border: none;
      color: #767697;
    }
  }
  /deep/ .van-tabs__line {
    position: absolute;
    background-color: #5d7291;
  }
  /deep/ .van-card {
    border-radius: 0 0 0.1rem 0.1rem;
    background-color: white;
  }
  /deep/ .van-card:not(:first-child) {
    margin-top: 0;
  }
  /deep/ .van-card__price {
    color: red;
  }
}
</style>
