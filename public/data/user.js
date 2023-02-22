class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.ID = 88888888;
    this.avtar = "../images/avtar.png";
    this.balance = 12900;
    this.income = 100;
    this.winTheBid = 10;
    this.coupon = 0;
    this.grade = {
      fishGoods: 12,
      count: 4,
      overAHundred: 0,
      pitCrown: 0,
    };
    this.data = {
      goods_order: [],
      ponds_order: [],
      collection: [],
    };
  }
  setLocalStorageData() {
    localStorage.setItem("user", JSON.stringify(this));
  }
  getLocalUserData() {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData === null) {
      return false;
    } else {
      this.data = userData.data;
      this.grade = userData.grade;
      this.winTheBid = userData.winTheBid;
      this.coupon = userData.coupon;
      this.balance = userData.balance;
      return userData;
    }
  }
  addUser_goods_order(goods) {
    this.data.goods_order.push(goods);
    this.setLocalStorageData();
  }
  setUser_goods_order(goods) {
    this.data.goods_order.map((el, index) => {
      if (el.order_id === goods.order_id) {
        this.data.goods_order[index] = goods;
      }
    });
    this.setLocalStorageData();
  }
  delUser_goods_order(id) {
    let array = this.getLocalUserData().data.goods_order.concat();
    array.forEach((el, index) => {
      if (el.order_id === id) {
        array.splice(index, 1);
      }
    });
    this.data.goods_order = array;
    this.setLocalStorageData();
  }
  delUser_collectedGoods(id) {
    let array = this.getLocalUserData().data.collection.concat();
    array.forEach((el, index) => {
      if (el.collected_id === id) {
        array.splice(index, 1);
      }
    });
    this.data.collection = array;
    this.setLocalStorageData();
  }
  getUser_goods_order() {
    return this.getLocalUserData().data.goods_order;
  }
  getUser_goodsPayment(order_id) {
    return this.getLocalUserData().data.goods_order.find(
      (el) => el.order_id === order_id
    );
  }
  getUser_collectedPayment(id) {
    return this.getLocalUserData().data.collection.find(
      (el) => el.collected_id === id
    );
  }
  addUser_ponds_order(data) {
    this.data.ponds_order.push(data);
    this.setLocalStorageData();
  }
  getUser_ponds_order() {
    return this.getLocalUserData().data.ponds_order;
  }
  add_collection(goods) {
    this.data.collection.push(goods);
    this.setLocalStorageData();
  }
  getUserInfo() {
    const that = this.getLocalUserData();
    return {
      name: that.name,
      ID: that.ID,
      password: that.password,
      avtar: that.avtar,
      balance: that.balance,
      income: that.income,
      winTheBid: that.winTheBid,
      coupon: that.coupon,
      grade: {
        fishGoods: that.grade.fishGoods,
        count: that.grade.count,
        overAHundred: that.grade.overAHundred,
        pitCrown: that.grade.pitCrown,
      },
    };
  }
  reduceUserBalance(money) {
    this.balance = (this.balance - money).toFixed(2);
    this.setLocalStorageData();
  }
  updateUser_ponds_order(data) {
    this.data.ponds_order = data;
    this.setLocalStorageData();
  }
}
let user = new User("钓鱼小达人", "123456");
export default user;
