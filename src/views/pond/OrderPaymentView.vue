<template>
  <div class="payment">
    <back-title>
      <template #back>
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
      <template #title>订单支付</template>
    </back-title>
    <div class="details">
      <div class="goods">
        <img class="cover" :src="fishPond.coverImg" alt="暂无封面" />
        <div class="info">
          <h6 class="title">{{ fishPond.name }}</h6>
          <div class="desc">{{ fishPond.desc }}</div>
        </div>
      </div>
      <div class="basic">
        <p class="paragraph">
          <span class="attr">订单价格</span
          ><span class="price"
            >￥{{
              fishPond.price * Number.parseInt($route.query.time_hours)
            }}</span
          >
        </p>
        <p class="paragraph">
          <span class="attr">鱼类</span
          ><span class="fish"
            ><span
              class="kind"
              v-for="(el, index) in fishPond.properties"
              :key="index"
              >{{ el }}</span
            ></span
          >
        </p>
        <p class="paragraph">
          <span class="attr">已选钓位</span
          ><span class="number">{{ $route.query.location }}号</span>
        </p>
        <p class="paragraph">
          <span class="attr">钓鱼时间</span
          ><span class="roll">{{ $route.query.time_hours }}小时</span>
        </p>
        <p class="paragraph">
          <span class="attr">优惠卷</span><span class="roll">无</span>
        </p>
      </div>
      <div class="pay-methods">
        <van-radio-group v-model="icon.radio">
          <van-cell-group>
            <van-cell title="微信支付" clickable @click="icon.radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="支付宝支付" clickable @click="icon.radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="现金支付" clickable @click="icon.radio = '3'">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <p class="tips">备注：支付宝支付和现金支付由现场工作人员</p>
      <div class="confirm">
        <van-button
          type="primary"
          color="#3f5577"
          size="large"
          round
          @click="confirm"
          >确认支付</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import backTitle from "@/components/public/back-title";
import USER from "../../../public/data/user";
import { mapGetters } from "vuex";
export default {
  name: "OrderPaymentView",
  components: { backTitle },
  data() {
    return {
      fishPond: null,
      icon: {
        radio: "1",
        activeIcon: "https://img01.yzcdn.cn/vant/user-active.png",
        inactiveIcon: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
  created() {
    this.fishPond = this.getPondDetails(this.$route.query.fishPondId);
    this.time_hours = this.$route.query.time;
    this.location = this.$route.query.location;
  },
  computed: {
    ...mapGetters(["getPondDetails"]),
  },
  methods: {
    back() {
      history.back();
    },
    updatePondsData() {
      let ponds = this.$store.getters.getPonds;
      ponds.map((pond) => {
        if (pond.id === this.fishPond.id) {
          pond.place_fill.push(Number.parseInt(this.location));
        }
      });
      this.$store.commit("updatePondsData", ponds);
    },
    confirm() {
      const price =
        this.fishPond.price * Number.parseInt(this.$route.query.time_hours);
      USER.addUser_ponds_order({
        id: this.fishPond.id,
        order_id: new Date().getTime(),
        coverImg: this.fishPond.coverImg,
        name: this.fishPond.name,
        desc: this.fishPond.desc,
        price,
        location: this.$route.query.location,
        properties: this.fishPond.properties,
        type: this.fishPond.type,
        over_us:
          new Date().getTime() +
          Number.parseInt(this.$route.query.time_hours) * 60 * 60 * 1000,
        over_flag: false,
      });
      USER.reduceUserBalance(
        this.fishPond.price * Number.parseInt(this.$route.query.time_hours)
      );
      this.updatePondsData();
      this.$store.commit("updateUserData");
      location.replace(`#/payOver?price=${price}`);
    },
  },
};
</script>

<style lang="less" scoped>
@ThemeColor: #3f5577;
.payment {
  .details {
    width: 100%;
    height: auto;
    padding: 0.12rem;
    font-size: 0.14rem;
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    color: @ThemeColor;
    .goods {
      padding: 0.08rem;
      display: flex;
      gap: 0.08rem;
      border-radius: 0.1rem;
      background-color: white;
      .cover {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.1rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 0.08rem;
        .title {
          font-size: 0.16rem;
        }
        .desc {
          font-size: 0.15rem;
          width: 100%;
          height: 1rem;
          color: #333333;
        }
      }
    }
    .basic {
      border-radius: 0.1rem;
      background-color: white;
      padding: 0.08rem;
      .paragraph {
        display: flex;
        align-items: center;
        font-size: 0;
        height: 0.44rem;
        color: #333333;
        &:nth-child(1),
        &:nth-child(2) {
          border-bottom: 1px solid #f1f1fa;
        }
        .attr {
          font-size: 0.14rem;
        }
        .price {
          font-size: 0.14rem;
          color: red;
          margin-left: auto;
        }
        .fish {
          font-size: 0.14rem;
          margin-left: auto;
          display: flex;
          gap: 0.04rem;
          .kind {
            font-size: 0.12rem;
            border-radius: 0.05rem;
            color: white;
            background-color: #3f5577;
            padding: 0.02rem 0.04rem;
          }
        }
        .number {
          font-size: 0.14rem;
          color: #3f5577;
          margin-left: auto;
        }
        .roll {
          font-size: 0.15rem;
          color: #646566;
          margin-left: auto;
        }
      }
    }
    .pay-methods {
      /deep/ .van-radio__icon--checked .van-icon {
        color: #fff;
        background-color: #06a30c;
        border-color: #06a30c;
      }
    }
    .tips {
      font-size: 0.12rem;
      line-height: 2.5;
    }
    .confirm {
      padding: 0.12rem;
      border-radius: 0.1rem;
      /deep/ van-button {
        width: 100%;
        margin: 0 auto;
      }
    }
  }
}
</style>
