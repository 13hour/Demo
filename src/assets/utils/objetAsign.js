// 说明：多层对象合并函数
function assignObj(target = {}, sources = {}) {
  let obj = target;
  if (typeof target != "object" || typeof sources != "object") {
    return sources; // 如果其中一个不是对象 就返回sources
  }
  for (let key in sources) {
    // 如果target也存在 那就再次合并
    if (Object.hasOwn(target, key)) {
      // 如果sources[key]对象则再次合并
      if (Object.prototype.toString.call(sources[key]) === "[object Object]") {
        obj[key] = assignObj(target[key], sources[key]);
      } else {
        //直接修改
        obj[key] = sources[key];
      }
    }
  }
  return obj;
}

export default assignObj;
