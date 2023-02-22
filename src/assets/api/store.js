const store = {
  //商品分类
  classify: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/cat/list",
    },
  },
  // 商品列表
  goodsList: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/default/goods-list",
      page: 1,
      cat_id: 1, // default，可选
    },
  },
  // 商品详情
  goodsDetails: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/goods/detail",
      id: 6, // default, 可选
    },
  },
};

export default store;
