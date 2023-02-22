<template>
  <div class="collected">
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
      <template v-slot:title>我的购物车</template>
    </back-title>
    <div class="list">
      <div v-for="(item, index) in list" :key="index" class="item">
        <van-swipe-cell>
          <van-card
            :desc="item.desc"
            :num="item.num"
            :price="item.price"
            :thumb="item.coverImg"
            :title="item.name"
            class="goods-card"
            @click="J_Payment(item.collected_id)"
          />
          <van-checkbox
            v-show="isShowEdit"
            v-model="item.checked"
            checked-color="#13227a"
            class="checkbox"
          ></van-checkbox>
          <template #right>
            <van-button
              class="delete-button"
              square
              text="删除"
              type="danger"
              @click.prevent="delItem(item.collected_id)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <footer v-if="list.length">
      <div v-show="isShowEdit" class="box">
        <van-checkbox
          v-model="allChecked"
          checked-color="#13227a"
          class="checkToggle"
          @click="allSelected(allChecked)"
        ></van-checkbox>
        <div v-show="isShowEdit" class="btn toggle">全选</div>
      </div>
      <div v-show="isShowEdit" class="box">
        <van-checkbox
          v-model="reChecked"
          checked-color="#13227a"
          class="checkToggle"
        ></van-checkbox>
        <div class="btn toggle">反选</div>
      </div>
      <van-button
        v-show="isShowEdit"
        class="btn delete"
        color="red"
        size="small"
        @click="delItems"
        >删除
      </van-button>
      <van-button
        v-show="!isShowEdit"
        class="btn edit"
        color="#13227a"
        size="small"
        @click="isShowEdit = true"
        >编辑
      </van-button>
      <van-button
        v-show="isShowEdit"
        class="btn complete"
        color="#13227a"
        size="small"
        @click="isShowEdit = false"
        >完成
      </van-button>
    </footer>
    <van-empty v-if="!list.length" description="还没有商品，快去添加吧！" />
  </div>
</template>
<script>
import backTitle from "@/components/public/back-title";
import USER from "../../../public/data/user";

export default {
  name: "CollectedView",
  components: {
    backTitle,
  },
  data() {
    return {
      isShowEdit: false,
      allChecked: false,
      reChecked: false,
    };
  },
  watch: {
    reChecked: {
      handler: function () {
        this.reverse();
      },
    },
    list: {
      handler: function (newVal) {
        this.allChecked = newVal.every((el) => {
          if (el.checked) {
            return true;
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    list() {
      return this.$store.getters.getUserData.data.collection;
    },
  },
  methods: {
    J_Payment(id) {
      location.hash = `#/payment?collected_id=${id}`;
    },
    back() {
      history.back();
    },
    delItems() {
      const array = this.list.concat();
      array.forEach((el) => {
        if (el.checked === true) {
          USER.delUser_collectedGoods(el.collected_id);
        }
      });
      this.$store.commit("updateUserData");
    },
    delItem(id) {
      this.list.forEach((el) => {
        if (el.collected_id === id) {
          USER.delUser_collectedGoods(el.collected_id);
        }
      });
      this.$store.commit("updateUserData");
    },
    allSelected(flag) {
      if (flag) {
        this.list.map((el) => {
          el.checked = true;
        });
      } else {
        this.list.map((el) => {
          el.checked = false;
        });
      }
    },
    reverse() {
      this.list.map((el) => {
        el.checked = !el.checked;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.collected {
  .list {
    width: 100%;
    padding: 0.08rem;
    position: relative;

    .item {
      display: block;
      background-color: white;
      border-radius: 0.1rem;
      margin-bottom: 0.08rem;
    }

    .goods-card {
      margin: 0;
      background-color: white;
      border-radius: 0.1rem;
    }

    .delete-button {
      top: -40%;
      height: 100%;
      border-bottom-right-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
    }

    .checkbox {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translateY(-50%);
    }

    /deep/ .van-card__price {
      color: red;
    }

    /deep/ .van-card__desc {
      max-width: 80%;
      max-height: 70%;
      color: #646566;
      line-height: 0.2rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //文本最多行数
      overflow: hidden;
    }

    /deep/ .van-ellipsis {
      display: -webkit-box;
      width: 100%;
      height: 100%;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //文本最多行数
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
    }

    /deep/ .van-card__title {
      max-height: 0.32rem;
      font-weight: 600;
      line-height: 0.16rem;
    }
  }

  footer {
    width: 100%;
    height: 0.5rem;
    position: fixed;
    padding: 0.12rem;
    bottom: 0;
    background-color: white;
    font-size: 0;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.2);
    @media screen and (min-width: 710px) {
      width: 710px;
    }

    display: flex;
    gap: 0.24rem;
    align-items: center;

    .box {
      display: flex;
      gap: 0.04rem;
      align-items: center;

      .checkToggle {
        position: relative;
      }

      .btn.toggle {
        font-size: 0.14rem;
        color: #3f5577;
        border-radius: 0.05rem;
      }
    }

    .btn.edit,
    .btn.complete,
    .btn.delete {
      margin-left: auto;
      border-radius: 0.05rem;
    }

    .btn.delete {
      transform: translateX(0.32rem);
    }
  }
}
</style>
