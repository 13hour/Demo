<template>
  <div id="store">
    <nav-bar :navData="navData" :key="reDrawFlag"></nav-bar>
  </div>
</template>

<script>
import navBar from "@/components/shop/nav-bar";
import api from "@/assets/api/index";
export default {
  name: "store-view",
  components: {
    navBar,
  },
  data() {
    return {
      navData: [],
      reDrawFlag: 0,
    };
  },
  created() {
    this.getNav();
  },
  methods: {
    async getNav() {
      const response = await this.axios({
        url: "fish" + api.store.classify.path,
        method: api.store.classify.method,
        params: {
          _mall_id: api.store.classify.query._mall_id,
          r: api.store.classify.query.r,
        },
      });
      this.navData = response.data.data.list;
      this.reDrawFlag++;
    },
  },
};
</script>

<style lang="less" scoped>
#store {
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}
</style>
