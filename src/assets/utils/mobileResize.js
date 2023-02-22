// 移动设备适配设置
window.onload = () => {
  size();
  let fun = f();

  function f() {
    let timer = null;
    return function (size) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(function () {
        // 要执行的函数
        size();
      }, 200);
    };
  }

  window.onresize = function () {
    fun(size);
  };

  function size() {
    let designWidth = 375;
    let remPx = 100;
    let scale = document.documentElement.clientWidth / designWidth;
    document.documentElement.clientWidth < 740
      ? (document.documentElement.style.fontSize = remPx * scale + "px")
      : (document.documentElement.style.fontSize = 175 + "px");
  }
};
