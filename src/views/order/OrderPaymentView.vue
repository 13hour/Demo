<template>
  <div class="payment">
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
      <template v-slot:title>订单支付</template>
    </back-title>
    <div class="details">
      <div class="goods">
        <img class="cover" :src="goods.coverImg" alt="暂无封面" />
        <div class="info">
          <h6 class="title">
            {{ goods.name }}
            <span class="tag">{{ " " + goods.desc || "" }}</span>
          </h6>
          <p class="price">
            单价：<span class="yuan">￥{{ goods.unit_price }}</span>
          </p>
        </div>
      </div>
      <div class="Stepper">
        <p class="quantity">数量</p>
        <van-stepper
          v-model="goods.num"
          theme="round"
          button-size="22"
          disable-input
          min="1"
          :max="goods.stock_num"
        />
      </div>
      <div class="total">
        <span class="total-price">订单总价</span
        ><span class="price">￥{{ totalPrice }}</span>
      </div>
      <div class="fishpond">
        <van-cell
          is-link
          :title="fishpond.title"
          @click="fishpond.show = true"
        />
        <van-action-sheet
          cancel-text="取消"
          close-on-click-action
          v-model="fishpond.show"
          :actions="fishpond.actions"
          @select="onFishpondSelect"
        />
      </div>
      <div class="fishingPosition">
        <van-cell
          is-link
          :title="fishingPosition.title"
          @click="fishingPosition.show = true"
        />
        <van-action-sheet
          cancel-text="取消"
          close-on-click-action
          v-model="fishingPosition.show"
          :actions="fishingPosition.actions"
          @select="onPositionSelect"
        />
      </div>
      <div class="leaveAMessage">
        <h6 class="title">备注：</h6>
        <input
          class="message"
          v-model="message"
          placeholder="请留言，少于15字"
        />
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
          @click="confirm"
          type="primary"
          color="#3f5577"
          size="large"
          round
          >确认支付</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import backTitle from "@/components/public/back-title";
import USER from "../../../public/data/user";
export default {
  name: "OrderPaymentView",
  components: {
    backTitle,
  },
  data() {
    return {
      goods: {},
      message: "",
      fishpond: {
        show: false,
        actions: [{ name: "鲤鱼塘" }, { name: "综合塘" }, { name: "鲫鱼塘" }],
        title: "选择鱼塘位置",
      },
      fishingPosition: {
        show: false,
        actions: [],
        title: "选择钓位",
      },
      icon: {
        radio: "1",
        activeIcon: "https://img01.yzcdn.cn/vant/user-active.png",
        inactiveIcon: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
  created() {
    for (let i = 1; i < 100; i++) {
      this.fishingPosition.actions.push({
        name: i,
      });
    }
    if (this.$route.query.collected_id) {
      this.goods = USER.getUser_collectedPayment(
        Number.parseInt(this.$route.query.collected_id)
      );
    }
    if (this.$route.query.order_id) {
      this.goods = USER.getUser_goodsPayment(
        Number.parseInt(this.$route.query.order_id)
      );
    }
  },
  computed: {
    totalPrice() {
      return (this.goods.unit_price * this.goods.num).toFixed(2);
    },
  },
  methods: {
    updateUserGoodsData() {
      if (this.$route.query.collected_id) {
        USER.addUser_goods_order({
          id: this.goods.id,
          order_id: this.goods.collected_id,
          attrs_id: this.goods.attrs_id,
          name: this.goods.name,
          coverImg: this.goods.coverImg,
          desc: this.goods.desc,
          num: this.goods.num,
          stock_num: this.goods.stock_num,
          type: this.goods.type,
          unit_price: this.goods.unit_price,
          totalPrice: this.totalPrice,
          pond: this.fishpond.title,
          location: this.fishingPosition.title,
          date: new Date().toLocaleString(),
          message: this.message,
          finished_us: new Date().getTime() + 3 * 60 * 1000,
          step: 0, // 0：商家发货，1：物流中，2：卖家收货
          flag: 1, //0：未付款，1：已付款，2：已完成
        });
        USER.delUser_collectedGoods(
          Number.parseInt(this.$route.query.collected_id)
        );
      } else if (this.$route.query.order_id) {
        USER.setUser_goods_order({
          id: this.goods.id,
          order_id: this.goods.order_id,
          attrs_id: this.goods.attrs_id,
          name: this.goods.name,
          coverImg: this.goods.coverImg,
          desc: this.goods.desc,
          num: this.goods.num,
          stock_num: this.goods.stock_num,
          type: this.goods.type,
          unit_price: this.goods.unit_price,
          totalPrice: this.totalPrice,
          pond: this.fishpond.title,
          location: this.fishingPosition.title,
          date: new Date().toLocaleString(),
          message: this.message,
          finished_us: new Date().getTime() + 3 * 60 * 1000,
          step: 0, // 0：商家发货，1：物流中，2：卖家收货
          flag: 1, //0：未付款，1：已付款，2：已完成
        });
      }
      this.updateGoodsData();
      USER.reduceUserBalance(Number.parseInt(this.goods.totalPrice));
      this.$store.commit("updateUserData");
    },
    updateGoodsData() {
      let goods = this.$store.getters.getGoods;
      const goods_orders = USER.getUser_goods_order();
      goods_orders.forEach((el) => {
        if (el.order_id === Number.parseInt(this.$route.query.order_id)) {
          for (let key in goods) {
            if (key === el.type) {
              goods[key].map((product) => {
                if (product.id === this.goods.id) {
                  product.total -= this.goods.num;
                  if (Object.keys(product.attrs).length) {
                    product.attrs.properties.map((el) => {
                      if (el.id === this.goods.attrs_id) {
                        el.stock_num -= this.goods.num;
                      }
                    });
                  }
                }
              });
            }
          }
        }
      });
      this.$store.commit("updateGoodsData", goods);
    },
    back() {
      history.back();
    },
    onFishpondSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.fishpond.title = item.name;
      Toast(item.name);
    },
    onPositionSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.fishingPosition.title = item.name + "号钓鱼位";
      Toast(item.name);
    },
    confirm() {
      if (this.fishpond.title === "选择鱼塘位置") {
        Toast("没有选择鱼塘类型");
      } else if (this.fishingPosition.title === "选择钓位") {
        Toast("钓位空缺");
      } else {
        this.updateUserGoodsData();
        location.replace(`#/payOver?price=${this.totalPrice}`);
      }
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
      padding: 0.12rem;
      display: flex;
      gap: 0.08rem;
      border-radius: 0.1rem;
      background-color: white;
      .cover {
        width: 1.6rem;
        height: 1.8rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.08rem;
        .title {
          font-size: 0.16rem;
          color: #645f5f;
          .tag {
            white-space: pre-wrap;
            font-size: 0.16rem;
            color: @ThemeColor;
          }
        }
        .price {
          font-size: 0.16rem;
          .yuan {
            color: orange;
          }
        }
      }
    }
    .Stepper {
      padding: 0.12rem;
      border-radius: 0.1rem;
      background-color: white;
      display: flex;
      justify-content: space-between;
      width: 100%;
      .quantity {
        display: inline;
      }
      /deep/ .van-stepper--round .van-stepper__plus {
        color: #fff;
        background-color: #3f5577;
      }
      /deep/ .van-stepper--round .van-stepper__minus {
        color: #3f5577;
        background-color: #fff;
        border: 1px solid #3f5577;
      }
    }
    .total {
      padding: 0.12rem;
      display: flex;
      justify-content: space-between;
      background-color: white;
      border-radius: 0.1rem;
      .total-price {
        display: block;
      }
      .price {
        display: block;
        font-size: 0.16rem;
        color: orange;
      }
    }
    .fishpond,
    .fishingPosition {
      width: 100%;
      border-radius: 0.1rem;
      overflow: hidden;
    }
    .leaveAMessage {
      padding: 0.12rem;
      background-color: white;
      border-radius: 0.1rem;
      .title {
        padding: 0 0.04rem;
        font-size: 0.14rem;
        line-height: 1.8;
        color: #333333;
        font-weight: normal;
      }
      .message {
        border: none;
        outline: none;
        width: 100%;
        height: auto;
        border-radius: 0.1rem;
        font-size: 0.13rem;
        padding: 0.12rem;
        background-color: #f6f4f4;
      }
    }
    .pay-methods {
      /deep/ .van-radio__icon--checked .van-icon {
        color: #fff;
        background-color: @ThemeColor;
        border-color: @ThemeColor;
      }
    }
    .tips {
      font-size: 0.12rem;
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
