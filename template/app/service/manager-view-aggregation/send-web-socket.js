module.exports = app => {
  return class SendWebSocket extends app.Service {
    constructor(ctx) {
      super(ctx);
    }
    getWssAuthenticationKey(websocketKey) {
      if (websocketKey) {
        //  整理时间字段，单位数补0
        const __date = new Date();
        let month = __date.getMonth() + 1;
        month = month.toString().length <= 1 && `0${month}` || month.toString();
        let currentDay = __date.getDate();
        currentDay = currentDay.toString().length <= 1 && `0${currentDay}` || currentDay.toString();
        //  md5 加密 Apollo 的 key
        const md5 = require('crypto').createHash('md5');
        md5.update(`${__date.getFullYear()}${websocketKey}${month}${currentDay}`);
  
        //  返回判断结果
        return md5.digest('hex');
      }
      return 'websocketKey is empty';
    }
    //  web socket 推送接口校验判断
    sendAuthentication(query) {
      try {
        //  获取传过来的 authentication 和 Apollo 的 key
        const { authentication } = query;
        //  返回判断结果
        return authentication === this.getWssAuthenticationKey(this.app.config.websocket && this.app.config.websocket.sendKey || 'sdagwgawegaweg');
      } catch (err) {
        throw err;
      }
    }
  }
};
