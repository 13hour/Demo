<template>
  <div class="payInfo">
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
      <template v-slot:title>鲤鱼塘</template>
    </back-title>
    <img class="cover" :src="pondDetails.coverImg" alt="" />
    <section>
      <div class="info">
        <h6 class="title">{{ pondDetails.name }}</h6>
        <div class="desc">
          {{ pondDetails.desc }}
        </div>
        <p class="price">￥{{ fishPond.price }}</p>
        <div class="time">
          <button ref="hour2" class="btn" @click="time(2)">
            今日钓鱼2个钟
          </button>
          <button ref="hour1" class="btn active" @click="time(1)">
            今日钓鱼1个钟
          </button>
        </div>
      </div>
      <div class="selector">
        <h5 class="title">选择你的钓位</h5>
        <table>
          <tr
            v-for="i in Number.parseInt(pondDetails.places / 10 + '')"
            :key="i"
            class="column"
          >
            <td
              class="line"
              v-for="j in 10"
              :key="j"
              @click="location"
              ref="cell"
            >
              {{ (i - 1) * 10 + j }}
            </td>
          </tr>
          <tr class="column">
            <td
              class="line"
              v-for="j in pondDetails.places % 10"
              :key="j"
              @click="location"
              ref="cell"
            >
              {{ (pondDetails.places / 10).toFixed(0) + j }}
            </td>
          </tr>
        </table>
        <div class="limit">
          <p class="tips">
            <span class="chunk-white"></span>
            <span class="tip">白色可选</span>
          </p>
          <p class="tips">
            <span class="chunk-red"></span>
            <span class="tip">红色不可选</span>
          </p>
        </div>
      </div>
      <footer>
        <van-radio-group v-model="radio.name">
          <van-radio class="radio" name="1" checked-color="#06a30c"
            >已选: <span class="num">{{ fishPond.location }}</span
            >号钓位</van-radio
          >
        </van-radio-group>
        <van-button class="confirm" color="#3f5577" @click="confirm"
          >确认</van-button
        >
      </footer>
    </section>
  </div>
</template>
<script>
import { Toast } from "vant";
import backTitle from "@/components/public/back-title";
import { mapGetters } from "vuex";
export default {
  name: "PayInfoView",
  components: {
    backTitle,
  },
  data() {
    return {
      radio: {
        name: "0",
      },
      fishPond: {
        location: "空",
        time_hours: 1,
        price: null,
      },
      pondDetails: null,
    };
  },
  created() {
    this.pondDetails = this.getPondDetails(this.$route.query.id);
    this.fishPond.price = this.pondDetails.price;
  },
  mounted() {
    this.place_fill();
  },
  computed: {
    ...mapGetters(["getPondDetails"]),
  },
  methods: {
    back() {
      history.back();
    },
    time(hour) {
      this.fishPond.time_hours = hour;
      this.fishPond.price = this.fishPond.time_hours * this.pondDetails.price;
      if (hour === 2) {
        this.$refs.hour1.classList.remove("active");
        this.$refs.hour2.classList.add("active");
      } else {
        this.$refs.hour1.classList.add("active");
        this.$refs.hour2.classList.remove("active");
      }
    },
    location(e) {
      if (
        this.pondDetails.place_fill.includes(
          Number.parseInt(e.target.textContent)
        )
      ) {
        Toast("该位置已经有人了");
      } else {
        this.fishPond.location = e.target.textContent;
        this.radio.name = "1";
        this.$refs.cell.map((el) => {
          if (
            !this.pondDetails.place_fill.includes(
              Number.parseInt(el.textContent)
            )
          ) {
            el.style.backgroundColor = "white";
            el.style.color = "black";
          }
        });
        e.target.style.backgroundColor = "#06a30c";
        e.target.style.color = "white";
      }
    },
    place_fill() {
      this.$refs.cell.forEach((el) => {
        if (
          this.pondDetails.place_fill.includes(Number.parseInt(el.textContent))
        ) {
          el.classList.add("fill");
        }
      });
    },
    confirm() {
      if (this.fishPond.time === null) {
        Toast("钓鱼时间未选择");
      } else if (this.radio.name === "0") {
        Toast("钓位未选择");
      } else {
        location.replace(
          `#/pondPayment?fishPondId=${
            this.pondDetails.id
          }&location=${this.fishPond.location.trim()}&time_hours=${
            this.fishPond.time_hours
          }`
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
@ThemeColor: #3f5577;
.payInfo {
  display: flex;
  flex-direction: column;
  gap: 0.01rem;
  margin-bottom: 0.5rem;
  .cover {
    width: 4rem;
    height: 3rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    padding: 0.08rem;

    .info {
      background-color: white;
      display: flex;
      flex-direction: column;
      gap: 0.08rem;
      padding: 0.12rem;
      border-radius: 0.1rem;

      .title {
        font-size: 0.18rem;
        color: @ThemeColor;
      }

      .desc {
        font-size: 0.14rem;
        color: #646566;
      }

      .price {
        font-size: 0.16rem;
        color: red;
      }

      .time {
        display: flex;
        gap: 0.08rem;
        font-size: 0.14rem;
        .btn {
          border-radius: 0.05rem;
          border: 1px solid #3f5577;
          padding: 0.02rem 0.06rem;
          &.active {
            background-color: #3f5577;
            color: white;
          }
        }
      }
    }

    .selector {
      .title {
        font-weight: 600;
        font-size: 0.14rem;
        height: 0.14rem;
        margin: 0.12rem 0;
        padding: 0 0 0 0.08rem;
        line-height: 0.14rem;
        border-left: 0.04rem solid @ThemeColor;
        color: @ThemeColor;
      }

      table {
        font-size: 0.16rem;
        color: #646566;
        border-collapse: separate;
        border-spacing: 0.08rem;

        .column {
          .line {
            background-color: white;
            width: 0.32rem;
            height: 0.32rem;
            text-align: center;
            line-height: 0.16rem;
            border-radius: 0.05rem;
            &.fill {
              background-color: red;
            }
          }
        }
      }
      .limit {
        font-size: 0;
        display: flex;
        gap: 0.18rem;
        padding-left: 0.08rem;

        .tips {
          font-size: 0;
          display: flex;
          gap: 0.06rem;
          align-self: center;

          .chunk-white {
            padding: 0.08rem;
            background-color: white;
            border-radius: 0.02rem;
          }

          .chunk-red {
            padding: 0.08rem;
            background-color: red;
            border-radius: 0.02rem;
          }

          .tip {
            font-size: 0.14rem;
          }
        }
      }
    }
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 0.5rem;
      padding: 0.12rem;
      background-color: white;

      display: flex;
      align-items: center;

      .radio {
        font-size: 0.15rem;
      }

      .num {
        font-size: 0.18rem;
        color: @ThemeColor;
      }

      .confirm {
        padding: 0 0.82rem;
        margin-left: auto;
        border-radius: 0.3rem;
      }
    }
  }
}
</style>
