module.exports = app => {
  class dateUtil extends app.Service {
    getTimes(timestamp) {
      const date = new Date(!!timestamp && timestamp || undefined);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let M = date.getMinutes();
      let S = date.getSeconds();
      const MM = date.getMilliseconds();

      if (m <= 9) m = '0' + m;
      if (d <= 9) d = '0' + d;
      if (H <= 9) H = '0' + H;
      if (M <= 9) M = '0' + M;
      if (S <= 9) S = '0' + S;

      return [y, m, d, H, M, S, MM];
    }
    /**
     * 北京时间转印度印尼时间
     * @param {Long} 时间戳
     * @returns {Long} 时间戳
     */
    changeTimezone(timestamp) {
      // 根据配置判断时差
      const nation = this.app.config.nation;
      let diff = 0;
      if (nation === 'india') {
        diff = 2.5;
      } else if (nation === 'indonesia') {
        diff = 1;
      }
      return timestamp - diff * 60 * 60 * 1000;
    }
    /**
     * 根据传进来的当前月份获取 201707 格式的时间戳
     * @params: {
     *   month: 比如当月为 12, 则 12 - 1,
     *   differentiate: 隔离符号，2017-07 中间的 -,
     *   nowTime: 当前时间，建议不传
     * }
     */
    getMonthYear(params = {}) {
      const {
        month = new Date().getMonth(),
        differentiate = '-',
        nowTime = new Date()
      } = params;
      let monthStr;
      if (!!month && isFinite(month) && parseInt(month, 10) < 12) {
        monthStr = String(month + 1);
      } else {
        monthStr = String(nowTime.getMonth() + 1);
      }
      const ret = `${nowTime.getFullYear()}${differentiate}` +
        `${(monthStr.length === 1 ? `0${monthStr}` : monthStr)}`;
      return ret;
    }

    /**
     * 根据自定义的时间格式和时间戳转换格式
     * @param  Object: {
     *   formatStr: 时间格式(默认：yyyy(年)-MM(月)-dd(日) hh:mm:ss(S)),
     *   time: 时间戳(默认为当前时间)
     * }
     * @return String   2017-08-22 17:50:00
     */
    dateFormat(params = {}) {
      const {
        formatStr = 'yyyy-MM-dd hh:mm:ss(S)',
        time = new Date()
      } = params;
  
      //  初始化
      const setTime = new Date(time);
      let format = formatStr;
  
      //  整理时间模型
      const model = {};
      model['M+'] = setTime.getMonth() + 1;
      model['d+'] = setTime.getDate();
      model['h+'] = setTime.getHours();
      model['m+'] = setTime.getMinutes();
      model['s+'] = setTime.getSeconds();
      model['q+'] = Math.floor((setTime.getMonth() + 3) / 3);
      model['S'] = setTime.getMilliseconds();// eslint-disable-line
  
      //  先检测年份的正则替换
      if (/(y+)/.test(format)) {
        //  如果有 yyyy，则替换成年份
        format = format.replace(RegExp.$1,
          `${setTime.getFullYear()}`.substr(4 - RegExp.$1.length));
      }
  
      Object.keys(model).forEach(modelKey => {
        const nowModel = model[modelKey];
  
        //  循环将时间 model 里的 key 对应正则替换
        if (new RegExp(`(${modelKey})`).test(format)) {
          //  整理好将要替换的值
          const nowFormat = RegExp.$1.length === 1 ?
            nowModel : `00${nowModel}`.substr(String(nowModel).length);
  
          format = format.replace(RegExp.$1, nowFormat);
        }
      });
  
      return format;
    }
  }

  return dateUtil;
};
