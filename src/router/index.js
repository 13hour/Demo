import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/HomeView";
import store from "@/store";
import LoginView from "@/views/LoginView";
import { token_exist } from "@/assets/utils/expirationDate";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      id: 1,
      requiresAuth: true,
    },
    component: Home,
  },
  {
    name: "store",
    path: "/store",
    meta: {
      id: 2,
      requiresAuth: true,
    },
    component: () => import("@/views/StoreView"),
  },
  {
    name: "message",
    path: "/message",
    meta: {
      id: 3,
      requiresAuth: true,
    },
    component: () => import("@/views/MessageView"),
  },
  {
    name: "my",
    path: "/my",
    meta: {
      id: 4,
      requiresAuth: true,
    },
    component: () => import("@/views/MyView"),
  },
  {
    name: "details",
    path: "/details",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/goods/GoodsDetailsView"),
  },
  {
    name: "payment",
    path: "/payment",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/order/OrderPaymentView"),
  },
  {
    name: "orders",
    path: "/orders",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/order/OrdersView"),
  },
  {
    name: "book",
    path: "/book",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/order/BookView"),
  },
  {
    name: "collected",
    path: "/collected",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/order/CollectedView"),
  },
  {
    name: "fishponds",
    path: "/fishponds",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/pond/FishPayView"),
  },
  {
    name: "pondPay",
    path: "/pondPay",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/pond/PayInfoView"),
  },
  {
    name: "pondPayment",
    path: "/pondPayment",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/pond/OrderPaymentView"),
  },
  {
    name: "login",
    path: "/login",
    meta: {
      requiresAuth: false,
    },
    component: LoginView,
  },
  {
    name: "payOver",
    path: "/payOver",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/PayOverView"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!token_exist()) {
      next("/login");
    }
  }
  next();
});
router.afterEach((to, from) => {
  const toId = to.meta.id;
  const fromId = from.meta.id;
  const list = ["/", "/message", "/store", "/my"];
  const toPath = to.path;
  if (list.includes(toPath)) {
    store.commit("setBarsShow", false);
  } else {
    store.commit("setBarsShow", true);
  }
  to.meta.transitionName = toId > fromId ? "slide-right" : "slide-left";
});
export default router;
