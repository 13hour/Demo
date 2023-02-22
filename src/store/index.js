import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Bars: {
      isHidden: false,
    },
    ponds: JSON.parse(localStorage.getItem("ponds")),
    goods: JSON.parse(localStorage.getItem("goods")),
    USER: JSON.parse(localStorage.getItem("user")),
  },
  getters: {
    isHidden: function (state) {
      return state.Bars.isHidden;
    },
    getPondsList: function (state) {
      return state.ponds;
    },
    getPondDetails: (state) => (id) => {
      return state.ponds.find((el) => el.id === Number.parseInt(id));
    },
    getGoodsList: function (state) {
      return state.goods;
    },
    getGoodsDetails: (state) => (obj) => {
      for (const key in state.goods) {
        if (key === obj.type) {
          return state.goods[key].find(
            (goods) => goods.id === Number.parseInt(obj.id)
          );
        }
      }
    },
    getUserData: (state) => {
      return state.USER;
    },
    getGoods: (state) => {
      return state.goods;
    },
    getPonds: (state) => {
      return state.ponds;
    },
  },
  mutations: {
    setBarsShow: function (state, playLoad) {
      state.Bars.isHidden = playLoad;
    },
    updateUserData: (state) => {
      state.USER = JSON.parse(localStorage.getItem("user"));
    },
    updatePondsData: (state, ponds) => {
      localStorage.setItem("ponds", JSON.stringify(ponds));
      state.ponds = JSON.parse(localStorage.getItem("ponds"));
    },
    updateGoodsData: (state, goods) => {
      localStorage.setItem("goods", JSON.stringify(goods));
      state.goods = JSON.parse(localStorage.getItem("goods"));
    },
  },
  actions: {},
  modules: {},
});
