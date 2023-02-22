<template>
  <div class="shopping">
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="detail.id"
      :properties="properties"
      @stepper-change="stepper_change"
      @buy-clicked="buy_clicked"
      @sku-selected="sku_selected"
      @add-cart="add_cart"
    />
  </div>
</template>

<script>
import USER from "../../../../public/data/user";
import { Toast } from "vant";
export default {
  name: "goods-purchase",
  props: ["isOpenSku", "detail"],
  watch: {
    isOpenSku: {
      handler: function (newVal) {
        this.show = newVal;
      },
    },
    show: {
      handler: function (newVal) {
        this.$emit("skuFlag", newVal);
      },
    },
  },
  data() {
    return {
      num: 1,
      time_id: new Date().getTime(),
      show: this.isOpenSku,
      sku_selected_id: null,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: null, // 默认价格（单位元）
        stock_num: null, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: this.detail.coverImg,
      },
      properties: [
        // 商品属性
      ],
    };
  },
  created() {
    this.getSku_v();
  },
  methods: {
    add_cart() {
      this.time_id = new Date().getTime();
      USER.add_collection({
        id: this.detail.id,
        attrs_id: this.sku_selected_id,
        collected_id: this.time_id,
        name: this.detail.name,
        coverImg: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].imgUrl
            ? this.detail.attrs.properties[this.sku_selected_id].imgUrl
            : this.detail.coverImg
          : this.detail.coverImg,
        desc: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].name
          : "",
        num: this.num,
        stock_num: this.detail.properties?.stock_num || this.detail.total,
        unit_price: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].price
          : this.detail.price,
        totalPrice:
          (this.detail.attrs.properties
            ? this.detail.attrs.properties[this.sku_selected_id].price
            : this.detail.price) * this.num,
        type: this.detail.type,
        price: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].price
          : this.detail.price,
        date: new Date().toLocaleString(),
        checked: false,
      });
      this.$store.commit("updateUserData");
      Toast("已添加进购物车");
    },
    stepper_change(value) {
      this.num = value;
    },
    sku_selected(data) {
      this.sku_selected_id = data.selectedSkuComb.id - 1;
    },
    getSku_v() {
      this.detail.attrs?.properties?.forEach((el) => {
        this.sku.tree[0].v.push({
          id: el.id,
          name: el.name,
          imgUrl: el.imgUrl,
          previewImgUrl: el.imgUrl,
        });
      });
      this.detail.attrs?.properties?.forEach((el) => {
        this.sku.list.push({
          id: el.id,
          s1: el.id,
          price: el.price * 100,
          stock_num: el.stock_num,
        });
      });
      this.sku.tree[0].k = this.detail.attrs.name;
      this.sku.price = this.detail.price;
      this.sku.stock_num = this.detail.total;
      this.sku_selected_id = this.detail.id;
      if (!Object.keys(this.detail.attrs).length) {
        this.sku.none_sku = true;
      }
    },
    buy_clicked() {
      this.time_id = new Date().getTime();
      USER.addUser_goods_order({
        id: this.detail.id,
        order_id: this.time_id,
        attrs_id: this.sku_selected_id,
        name: this.detail.name,
        coverImg: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].imgUrl
            ? this.detail.attrs.properties[this.sku_selected_id].imgUrl
            : this.detail.coverImg
          : this.detail.coverImg,
        desc: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].name
          : "",
        num: this.num,
        stock_num: this.detail.properties?.stock_num || this.detail.total,
        type: this.detail.type,
        unit_price: this.detail.attrs.properties
          ? this.detail.attrs.properties[this.sku_selected_id].price
          : this.detail.price,
        totalPrice:
          (this.detail.attrs.properties
            ? this.detail.attrs.properties[this.sku_selected_id].price
            : this.detail.price) * this.num,
        date: new Date().toLocaleString(),
        flag: 0, //0：未付款，1：已付款，2：已完成
      });
      this.$store.commit("updateUserData");
      location.replace(`#/payment?order_id=${this.time_id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.shopping {
}
</style>
