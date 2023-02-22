function unitConverter(num) {
  const unit = {
    tenThousand: 10000,
    calculate: 100000000,
    hundredBillion: 100000000000,
    trillion: 1000000000000,
  };
  if (!num || isNaN(num)) {
    return "请传入数值格式的数据";
  }
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = Number(num);
  if (Math.abs(num) > unit.trillion) {
    return (num / unit.trillion).toFixed(2) + "万亿";
  } else if (Math.abs(num) > unit.hundredBillion) {
    return (num / unit.hundredBillion).toFixed(2) + "千亿";
  } else if (Math.abs(num) > unit.calculate) {
    return (num / unit.calculate).toFixed(1) + "亿";
  } else if (Math.abs(num) > unit.tenThousand) {
    if ((num / unit.tenThousand).toFixed(1).slice(-1) === "0") {
      return (num / unit.tenThousand).toFixed(0) + "万";
    } else {
      return (num / unit.tenThousand).toFixed(1) + "万";
    }
  } else {
    return num;
  }
}

export default unitConverter;
