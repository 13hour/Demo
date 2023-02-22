<template>
  <div class="goods-details">
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
      <template v-slot:title>商品详情</template>
    </back-title>
    <goods-info :detail="detail" :key="redrawFlag + 1"></goods-info>
    <purchase-icon @buy="openSku"></purchase-icon>
    <goods-purchase
      :key="redrawFlag + 2"
      :isOpenSku="isOpenSku"
      :detail="detail"
      @skuFlag="closeSku"
    ></goods-purchase>
  </div>
</template>

<script>
import goodsInfo from "@/components/goods/goodsDetails/goods-info";
import purchaseIcon from "@/components/goods/goodsDetails/purchase-icon";
import goodsPurchase from "@/components/goods/goodsDetails/goods-purchase";
import backTitle from "@/components/public/back-title";
import { mapGetters } from "vuex";
export default {
  name: "GoodsDetailsView",
  components: {
    goodsInfo,
    purchaseIcon,
    goodsPurchase,
    backTitle,
  },
  data() {
    return {
      detail: {},
      isOpenSku: false,
      redrawFlag: 0,
    };
  },
  created() {
    this.detail = this.getGoodsDetails({
      type: this.$route.query.type,
      id: this.$route.query.id,
    });
    this.redrawFlag++;
  },
  computed: {
    ...mapGetters(["getGoodsDetails"]),
  },
  methods: {
    back() {
      history.back();
    },
    openSku() {
      this.isOpenSku = true;
    },
    closeSku(flag) {
      this.isOpenSku = flag;
    },
  },
};
</script>

<style lang="less" scoped>
.goods-details {
  margin-bottom: 0.5rem;
}
</style>
