import Vue from "vue";
// plugins
import "./plugins/axios";
import "./plugins/vant2.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/utils/mobileResize";
import "@/assets/css/reset.css";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate: function () {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
