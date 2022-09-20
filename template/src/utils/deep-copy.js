export const deepCopy = function(__data) {
  var __type = typeof __data;
  if (__type === 'function') {
    var __fun;
    eval('__fun = ' + __data.toString());
    return __fun;
  } else if (__type === 'object') {
    if (Object.prototype.toString.call(__data) === '[object Array]') {
      var __array = [];
      for (var i = 0, len = __data.length || 0; i < len; i++) {
        __array.push(
          ['symbol', 'object', 'function'].indexOf(__data[i]) !== -1 ?
          deepCopy(__data[i]) : __data[i]
        );
      }
      return __array;
    } else {
      var __obj = {};
      Object.keys(__data).forEach(function(e) {
        __obj[['symbol', 'object', 'function'].indexOf(typeof e) !== -1 ? deepCopy(e) : e] =
          ['symbol', 'object', 'function'].indexOf(typeof __data[e]) !== -1 ? deepCopy(__data[e]) : __data[e]
      });
      return __obj;
    }
  } else if (__type === 'symbol') {
    try {
      return Symbol(__data.description);
    } catch (err) {
      return __data;
    }
  } else {
    return __data;
  }
};
//  合并两个对象
export const mergeObject = (a, b) => {
  const res = {};
  const dataType = ['object', 'string'];
  if (dataType.indexOf(typeof a) !== -1 && dataType.indexOf(typeof b) !== -1) {
    [typeof a === 'string' && a.split('') || a, typeof b === 'string' && b.split('') || b].forEach(e => Array.isArray(e) && e.forEach((echild, echildIndex) => {
      res[echildIndex] = typeof echild === 'object' && mergeObject(typeof res[echildIndex] === 'object' && res[echildIndex] || {}, echild) || echild;
    }) || Object.keys(e).forEach(echildKey => {
      res[echildKey] = typeof e[echildKey] === 'object' && mergeObject(typeof res[echildKey] === 'object' && res[echildKey] || {}, e[echildKey]) || e[echildKey];
    }));
    return res;
  }
  return false;
}
//  实现新的 object.assign
export const deepObjectAssign = (...args) => {
  let res = {};
  args.forEach(e => {
    const __res = mergeObject(res, e);
    if (__res !== false) {
      res = __res;
    }
  });
  return res;
}