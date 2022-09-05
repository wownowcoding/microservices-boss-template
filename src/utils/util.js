/*
 * @Description:
 * @Author: 黄博方
 * @Date: 2018-11-01 17:38:30
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-09-11 10:52:59
 */
// import moment from 'moment'
import moment from "moment-timezone";
import chineseCountryJson from "@/utils/chineseCountryJson";
import englishCountryJson from "@/utils/englishCountryJson";
import Store from "@/utils/store";
import utilConfigs from "@/utils/utilConfigs";
import config from '@/config'
let { baseURL } = config
// import { utils } from "stylus";

let util = {
  // 页面的一些常用配置项
  ...utilConfigs,
  timer: null
};
/**
 * @description 数字千分位
 * @param {Object} data 待处理数字
 */
util.AmtThousandsFmt = (data) => {
  if (!data) {
    return '0.00';
  }
  const ret = ((parseFloat(((data - 0) || 0), 10) - 0).toFixed(2)).toLocaleString() || data.toString();
  return ret === '0' && '0.00' || (ret.indexOf('.') === -1 && `${ret}.00` || ret);
}
/**
 * @description 数字对象处理
 * @param {Object} moneyObj 待处理数字
 * @param {Object} ops 配置项
 */
const moneyFlagMap = {
  USD: "$",
  CNY: ''
};
util.money = (moneyObj = {}, ops = { isNegative: false }) => {
  if (moneyObj === null) {
    const currency = 'USD'
    return `${moneyFlagMap[currency]}${util.AmtThousandsFmt(0)}`;
  }
  if (typeof moneyObj !== 'object') {
    moneyObj = {
      amount: ['string', 'number'].indexOf(typeof moneyObj) !== -1 && moneyObj || 0,
      currency: 'USD'
    };
  }
  const { isNegative } = ops
  const { amount, currency = 'USD' } = moneyObj;
  const result = `${moneyFlagMap[currency]}${util.AmtThousandsFmt(amount)}`
  if (isNegative) {
    if (amount === 0) {
      return result;
    }
    return `-${result}`;
  }
  return result;
}
util.clearStore = () => {
  const cacheObj = {};
  const cacheKeys = ['isNotification', 'lang', 'isDisabledIm'];
  cacheKeys.forEach(e => {
    cacheObj[e] = Store.loadObject(e);
  });
  Store.clear();
  cacheKeys.forEach(e => {
    if (cacheObj[e] !== null && cacheObj[e] !== undefined) {
      Store.saveObject(e, cacheObj[e]);
    }
  });
}
/**
 * @description 对象扁平化
 * @param {Object} obj 待处理对象
 */
util.flatten = function(obj){
  var result = {};

  function recurse(src, prop) {
      var toString = Object.prototype.toString;
      if (toString.call(src) == '[object Object]') {
          var isEmpty = true;
          for (var p in src) {
              isEmpty = false;
              recurse(src[p], prop ? prop + '.' + p : p)
          }
          if (isEmpty && prop) {
              result[prop] = {};
          }
      } else if (toString.call(src) == '[object Array]') {
          var len = src.length;
          if (len > 0) {
              src.forEach(function (item, index) {
                  recurse(item, prop ? prop + '.[' + index + ']' : index);
              })
          } else {
              result[prop] = [];
          }
      } else {
          result[prop] = src;
      }
  }
  recurse(obj,'');

  return result;
}
/**
 * @description 对象去扁平化
 * @param {Object} obj 待处理对象
 */
util.unflatten = function(obj) {
  if (Object(obj) !== obj || Array.isArray(obj))
      return obj;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};
  for (var p in obj) {
      var cur = resultholder,
          prop = "",
          m;
      while (m = regex.exec(p)) {
          cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
          prop = m[2] || m[1];
      }
      cur[prop] = obj[p];
  }
  return resultholder[""] || resultholder;
}

/**
 * @description iview-table render函数结合Vue过滤器简化调用
 * @param {String} keyName 需要过滤键名
 * @param {String} filterName 过滤器名称
 * @param {Array} filterArgs 过滤器需要的额外参数
 * @example render:this.Util.renderFilter('operationTime','Datetime',[])
 */
util.renderFilter = (keyName, filterName, filterArgs = []) => (h, params) =>
  h("span", Vue.filter(filterName)(params.row[keyName], ...filterArgs));

/**
 * @description iview-datepicker组件v-model绑定timestamp字段,需要放到组件的computed中
 * @param {Array<String>} propList 需要做计算的属性集合,为前后端交互表单的时间戳字段
 * @param {String} dataName 关联的表单,例如表单组件中的form对象
 * @example
 * // computed: {
 * //   ...computedTimestamp(['signTime', 'effectTime', 'invalidTime'])
 * // }
 */
// 要求在源dataName(form对象)中必须声明相应computed的属性初始值
util.computedTimestamp = (propList, dataName = "form") => {
  const res = {};
  propList.forEach(propName => {
    res[propName] = {
      get() {
        const timeStamp = Number(this[dataName][propName]);
        return !isNaN(timeStamp) && !!timeStamp
          ? moment(timeStamp).toDate()
          : null;
      },
      set(val) {
        return (this[dataName][propName] = val ? moment(val).valueOf() : "");
      }
    };
  });
  return res;
};

/**
 * @description 以配置方式生成针对iview-table列render函数操作按钮
 * @param {Function} h render函数
 * @param {Array<Object>} options 按钮配置
 * @param {Boolean} option.permission 权限,不配置则为true
 * @param {Boolean} option.condition 条件,不配置则为true,condition && permission控制是否显示该按钮
 * @param {String} option.label 按钮上的文案
 * @param {Function} option.handleClick 点击事件执行的函数
 * @param {Function} option.renderFn 直接传入render函数以跳过默认配置(替换场景)
 * @param {Object} option.btnProps 按钮的其它配置(拓展)
 * @example
 *  // this.Util.createOperatorBtnList(h, [
 *  //  {
 *  //      permission: product_solution_detail,
 *  //      label: this.$t('utils.detail'),
 *  //      handleClick: () => {
 *  //          this.$router.push(
 *  //              `/product/solution/detail?solutionId=${solutionId}`,
 *  //          )
 *  //      },
 *  //  },
 * // ])
 */

util.createOperatorBtnList = (h, options) => {
  let btnList = [];
  // 遍历配置
  options.forEach(item => {
    let {
      renderFn,
      btnProps,
      handleClick,
      condition,
      permission,
      label
    } = item;
    // 满足条件其具有权限,则把按钮置入
    // 不传默认为true
    condition = condition === undefined ? true : condition;
    permission = permission === undefined ? true : permission;
    if (condition && permission) {
      // 具有renderFn
      btnList.push(
        renderFn !== undefined
          ? renderFn
          : h(
              "Button",
              {
                ...util.tableColBtnCfg,
                ...btnProps,
                on: { click: handleClick }
              },
              label
            )
      );
    }
  });
  return btnList;
};

/**
 * @description 时间范围处理
 * @param {Array} timeRange 时间范围[开始时间,结束时间]
 * @param {String} format 入参时间的字符串格式(针对 DD/MM/YYYY 字符串时间格式的处理,不然moment会解析有误) (可选)
 */
util.timeRangeHandle = (timeRange, format) => {
  moment.tz.setDefault(Store.loadObject('currentTimeZone') || 'Indian/Christmas');
  const formatStr = format ? format.replace(/mm/g, 'MM').replace(/dd/g, 'DD').replace(/yyyy/g, 'YYYY') : format
  let [startTime, endTime] = timeRange;
  if (typeof(startTime) == 'number' && typeof(endTime) == 'number') {
    return [startTime, endTime]
  }
  if (!!startTime && !!endTime) {
    // 把时间范围处理成0:00~23:59
    startTime = moment(startTime, formatStr)
      .clone()
      .startOf("day")
      .valueOf();
    endTime = moment(endTime, formatStr)
      .clone()
      .endOf("day")
      .valueOf();
  }
  // 格式化
  // TODO 跟后端统一时间的入参格式
  if (startTime) startTime = moment(startTime).valueOf();
  if (endTime) endTime = moment(endTime).valueOf();
  return [startTime, endTime];
};

// 国家code转名字
util.country_show = function(countryCode) {
  let show;
  let lang = Store.loadObject("lang");
  let Json = lang == "zh" ? chineseCountryJson : englishCountryJson;
  Json.map(item => {
    item.data.map(country => {
      if (country.countryCode == countryCode) {
        show = country.countryName;
      }
    });
  });
  return show;
};

//小数减法计算
util.floatCalc = function (numOne,numTwo) {
  let res, ponitNumOne, ponitNumTwo
  try {
    ponitNumOne = numOne.toString().split('.')[1].length
  } catch (e) {
    ponitNumOne = 0
  }
  try {
    ponitNumTwo = numTwo.toString().split('.')[1].length
  } catch (e) {
    ponitNumTwo = 0
  }
  res = Math.pow(10, Math.max(ponitNumOne, ponitNumTwo))
  const precision = (ponitNumOne >= ponitNumTwo) ? ponitNumOne : ponitNumTwo;
  return ((numOne * res - numTwo * res) / res).toFixed(precision)
}
// 美元瑞尔金钱格式
util.money_show = function(format, num) {
  let handler;
  if (format == "USD" && num != "0") {
    handler = num.toFixed(2);
  } else {
    handler = num;
  }
  return handler;
};

// 筛选枚举值 添加方式
util.filter_enu = function(key, filter_arr) {
  let arr = [];
  key.map(item => {
    filter_arr.map(y => {
      if (item.code === y) {
        arr.push(item);
      }
    });
  });
  return arr;
};

// 筛选枚举值 移除方式
util.filter_enu_remove = function(key, filter_arr) {
  let arr = [];
  key.map(item => {
    filter_arr.map(y => {
      if (item.code !== y) {
        arr.push(item);
      }
    });
  });
  return arr;
};

// 校验元素上是否在目标数组中
util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

// 筛选对象中值为空的对象
util.screenOut = object => {
  let data = {};
  for (let i in object) {
    if (object[i]) {
      data[i] = object[i];
    }
  }
  return data;
};

util.handleTitle = function(vm, item) {
  if (typeof item.title === "object") {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
};

// 获取当前日期
util.getDate = function() {
  return moment().format("DDMMYYYY");
};

// 判断引用类型，建议只用在Function、Object的判断上
// 基本类型用typeof，Array建议用Array.isArray，类用instanceof
// 用法示例 isType('Object')({})
util.isType = type => val => {
  return (
    Object.prototype.toString.call(val).toLowerCase() ===
    `[object ${type}]`.toLowerCase()
  );
};
// 转13位时间戳
util.toTimeStamp = (time, type = "DD/MM/YYYY HH:mm:ss") => {
  if (typeof time === 'number') {
    return time
  }
  // 设置时区为金边时间（东7区）
  moment.tz.setDefault(Store.loadObject('currentTimeZone') || 'Indian/Christmas');
  return moment(time, type).isValid() ? moment(time, type).valueOf() : "";
};
// 时区转换
util.toTimeTz = (time, tz = Store.loadObject('currentTimeZone') || 'Indian/Christmas') => {
  // 设置时区为金边时间（东7区）
  return moment(time).isValid() ? moment.tz(time, tz).format() : "";
};
/**
 * @desc 判断是否为假，包括假值（除0外）和空数组/对象
 * @param val 要判断的值
 * @returns {boolean}
 */
util.checkEmpty = val => {
  if (!val && val !== 0 && val !== false) {
    return true;
  }

  // 判断时间
  if (util.isType("Date")(val)) {
    return false;
  }

  if (Array.isArray(val) && val.length === 0) {
    return true;
  } else if (
    Object.prototype.isPrototypeOf(val) &&
    Object.keys(val).length === 0
  ) {
    return true;
  }

  return false;
};
//  是否是数字
util.isNumber = data => /^-?[0-9]+\.?[0-9]{0,}$/.test(String(data));
//  转换数字
util.toNumber = num => num - 0 || 0;
//  四舍五入
util.toFixed = num => util.toNumber(util.toNumber(num).toFixed(2));
// 递归遍历树
util.traverseTreeList = (
  treeList,
  { nodeFn, leafNodeFn, parentNodeFn, childrenKey = "children" },
  resultArr = []
) => {
  for (let i = 0; i < treeList.length; i++) {
    const item = treeList[i];
    nodeFn && nodeFn(item, resultArr);
    if (item[childrenKey]) {
      parentNodeFn && parentNodeFn(item, resultArr);
      util.traverseTreeList(
        item[childrenKey],
        { nodeFn, leafNodeFn, parentNodeFn, childrenKey },
        resultArr
      );
    } else {
      leafNodeFn && leafNodeFn(item, resultArr);
    }
  }
  return resultArr;
};

util.setDateRegExpFormat = (date, format) => {
  if (typeof date === "string") {
    let dat = "";
    let reg1 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g; //  yyyy-MM-dd
    let reg2 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/g; //  yyyy-MM-dd HH:mm:ss
    let reg3 = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/g; //  yyyy/MM/dd
    let reg4 = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/g; //  yyyy/MM/dd HH:mm:ss
    let reg5 = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/g; //  dd/MM/yyyy  /   MM/dd/yyyy
    let reg6 = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/g; //  dd/MM/yyyy HH:mm:ss   /   MM/dd/yyyy HH:mm:ss
    let reg7 = /^[0-9]{2}\/[0-9]{4}$/g; //  MM/yyyy
    let reg8 = /^[0-9]{4}$/g; //  yyyy
    if (reg2.test(date) || (reg1.test(date) && format)) {
      dat = date;
    } else if (reg3.test(date) || (reg4.test(date) && format)) {
      dat = date.replace(/\//g, "-");
    } else if (reg5.test(date) && format) {
      if (format === "MM/dd/yyyy") {
        dat = `${date.split("/")[2]}-${date.split("/")[0]}-${
          date.split("/")[1]
        }`;
      } else {
        dat = `${date.split("/")[2]}-${date.split("/")[1]}-${
          date.split("/")[0]
        }`;
      }
    } else if (reg6.test(date) && format) {
      let dateSplit0 = date.split(" ")[0];
      let dateSplit1 = date.split(" ")[1];
      if (format === "MM/dd/yyyy HH:mm:ss") {
        dat = `${dateSplit0.split("/")[2]}-${dateSplit0.split("/")[0]}-${
          dateSplit0.split("/")[1]
        } ${dateSplit1}`;
      } else {
        dat = `${dateSplit0.split("/")[2]}-${dateSplit0.split("/")[1]}-${
          dateSplit0.split("/")[0]
        } ${dateSplit1}`;
      }
    } else if (reg7.test(date) && format === "MM/yyyy") {
      dat = `${date.split("/")[1]}-${date.split("/")[0]}`;
    } else if (reg8.test(date) && format === "yyyy") {
      dat = `${date}-01-01`;
    } else {
      dat = "";
    }
    return dat;
  } else {
    return date;
  }
};
util.timeout = (callback, timestamp) => {
  const __timeout = setTimeout(() => {
    clearTimeout(__timeout);
    typeof callback === 'function' && callback();
  }, timestamp);
}
// 通过传入时间差毫秒来计算时间差
util.timeDiff = (diffTime) => {
    // const diff = endTime - startTime;
    const days = Math.floor(diffTime / (24 * 3600 * 1000)) //计算天数
    const leave1 = diffTime % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000)) //计算相差小时数
    const leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
    const leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3 / 1000) // 计算秒数
    const dayStr = days ? `${days}${vm.$t('i.time.days')}` : '';
    const hoursStr = hours ? `${hours}${vm.$t('i.time.hours')}` : '';
    const minutesStr = minutes ? `${minutes}${vm.$t('i.time.minutes')}` : '';
    const secondsStr = seconds ? `${seconds}${vm.$t('i.time.seconds')}` : '';
    return `${dayStr} ${hoursStr} ${minutesStr} ${secondsStr}`
}

util.toPercent =(rate) => {
  const afterPercent = rate+'%';
  return afterPercent;
}

util.getDateForm = (currentTime) => {
  if (!currentTime) {
    currentTime = new Date()
  }
  //  [0: 年, 1: 月, 2: 日, 3: 时, 4: 分, 5: 秒, 6: 毫秒, 7: 季度]
  return [
    currentTime.getFullYear(),
    currentTime.getMonth() + 1,
    currentTime.getDate(),
    currentTime.getHours(),
    currentTime.getMinutes(),
    currentTime.getSeconds(),
    currentTime.getMilliseconds()
  ];
}

util.getTimezone = () => {
  return (0 - new Date().getTimezoneOffset() / 60);
}
/**
 *
 * @param {*} space 昨天开始算，往前x天
 * @returns 开始跟结束 [start, end]
 */
util.getDateStartEnd = (day, isTimestamp = true) => {
  const space = 86400000 * day
  const dateForm = util.getDateForm(new Date(Date.now() - space));
  const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
  const startDate = new Date(`${ymd} 00:00:00`)
  const endDate = new Date(startDate.valueOf() + space - 1000)
  if (isTimestamp) {
    return [startDate.valueOf(), endDate.valueOf()]
  }
  return [startDate, endDate]
}

// 包含从今天开始的往前多少个小时，如果是最近七天，算上今天，就是往前6天，24 * 6 = 144
// https://momentjs.com/docs/#/get-set/hour/
util.getDateFrom = (hours = -144, isTimestamp = true) => {
  const startTime = moment().hours(hours).startOf('day')
  const endTime = moment().hours(0).endOf('day')
  const sTime = startTime.valueOf()
  const eTime = endTime.valueOf()
  if (isTimestamp) {
    return [sTime, eTime]
  }
  return [new Date(sTime), new Date(eTime)]
}

util.getI18nText = (obj, language) => {
  if (!language) {
    language = Store.loadObject('lang') || 'en'
  }

  switch(language) {
    case 'en':
    case 'en-US':
      return obj['en'] || obj['en-US']
    case 'zh':
    case 'zh-CN':
      return obj['zh'] || obj['zh-CN']
    case 'km':
    case 'km-KH':
      return obj['km'] || obj['km-KH']
  }
}

util.downloadFile  = (fileName, url) => {
  const file_name = window.decodeURI(fileName)
  const a = window.document.createElement('a')
  a.download = file_name
  a.style.display = 'none'
  a.href = `${baseURL}/file_download/boss/${url}?filename=${encodeURIComponent(fileName)}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

util.summaryMethod = ({ columns, data }, { numberKeys, moneyKeys }) => {
  let lang = Store.loadObject('lang') || 'en'
  const sums = {}
  columns.forEach((column, index) => {
    const key = column.key
    if (index === 0) {
      sums[key] = {
        key,
        value: lang === 'en' ? 'Total' : '合计'
      }
      return
    }
    const values = data.map(item => item[key]).filter(e => e)
    let total = undefined
    let isMoney = moneyKeys.includes(key)
    let isNumber = numberKeys.includes(key)
    if (isMoney) {
      total = { amount: 0 }
    } else if (isNumber) {
      total = 0
    }
    values.forEach(val => {
      if (isNumber) {
        total += val
      } else if (isMoney) {
        if (val && typeof val === 'object') {
          total.amount += val.amount
        } else if (val) {
          total.amount += (parseInt(val) || 0)
        }
      }
    })
    if (isMoney) {
      total = util.money(total)
    }
    sums[key] = {
      key,
      value: total
    }
  })

  return sums
}
export default util;
