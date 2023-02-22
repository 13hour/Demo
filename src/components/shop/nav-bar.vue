<template>
  <van-tabs
    v-model="active"
    sticky
    title-active-color="#3f5577"
    title-inactive-color="#333333"
    animated
  >
    <van-tab
      v-for="item in navData"
      :title="item.name"
      :key="item.id"
      :data-id="item.id"
    >
      <goods-list :goods="goods[item.id - 1].list"></goods-list>
    </van-tab>
  </van-tabs>
</template>

<script>
import goodsList from "@/components/shop/goods-list";
import { mapGetters } from "vuex";
export default {
  name: "nav-bar",
  components: {
    goodsList,
  },
  props: ["navData"],
  data() {
    return {
      active: 0,
      goods: [
        {
          id: 1,
          name: "渔具",
          list: [],
        },
        {
          id: 2,
          name: "鱼饵",
          list: [],
        },
        {
          id: 3,
          name: "饮料食物",
          list: [],
        },
      ],
    };
  },
  created() {
    this.goods[0].list = this.getGoodsList.fishingGear;
    this.goods[1].list = this.getGoodsList.bait;
    this.goods[2].list = this.getGoodsList.beverageAndFood;
  },
  computed: {
    ...mapGetters(["getGoodsList"]),
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 750px) {
  /deep/ .van-sticky--fixed {
    width: 730px;
    margin: 0 auto;
    border-bottom: 1px solid #aaaaaa;
  }
}
/deep/ .van-sticky--fixed {
  border-bottom: 1px solid #aaaaaa;
}
/deep/ .van-tabs--line .van-tabs__wrap {
  height: 0.32rem;
}
/deep/ .van-tab {
  font-size: 0.14rem;
  line-height: 2;
  height: 100%;
}
/deep/ .van-tabs__line {
  background-color: #3f5577;
}
</style>
