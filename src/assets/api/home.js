const home = {
  swipe: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/index/tpl-index",
    },
  },
  notice: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/setting/notice",
    },
  },
  fish_pond: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/fish-pond/fish-list",
      page: 1,
      limit: 10,
    },
  },
  competitions: {
    path: "/web/index.php",
    method: "GET",
    query: {
      _mall_id: 1,
      r: "api/match/match-list",
      page: 1,
    },
  },
};

export default home;
