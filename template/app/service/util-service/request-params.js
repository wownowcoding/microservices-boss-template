'use strict';
const parseString = require('xml2js').parseString;
module.exports = app => {
  return class Encryption extends app.Service {
    constructor(ctx) {
      super(ctx);
    }
    /**
     * 将 query、post body 参数合并成一个对象
     */
    getQueryAndBodyParams(request) {
      const body = {};
      let query = {};
      if (
        request.body &&
        JSON.stringify(request.body) !== '{}'
      ) {
        const keys = Object.keys(request.body);
        keys.forEach(bodyKey => {
          if (bodyKey !== 'query') {
            body[bodyKey] = request.body[bodyKey];
          } else {
            query = request.body[bodyKey];
          }
        });
      }
      return Object.assign({}, request.query, body, query);
    }
    /**
     * 转换 cookie
     * @param  {[type]} cookie [description]
     * @return {[type]}        [description]
     */
    transitionCookie(cookie) {
      const cookieKey = cookie.split('=')[0];
      const cookieValue = cookie.substring(cookie.indexOf('=') + 1, cookie.length).split(';')[0];
      return {
        key: cookieKey,
        value: cookieValue
      };
    }
    /**
     * 获取所有 cookie 整合成 object 对象
     * @return {[type]} [description]
     */
    getAllCookies(cookies) {
      const ret = {};
      if (cookies) {
        if (cookies.indexOf('; ') >= 0) {
          const cookieList = cookies.split('; ');
          for (const cookie of cookieList) {
            const cookieJson = this.transitionCookie(cookie);
            ret[cookieJson.key] = cookieJson.value;
          }
        } else {
          const cookieJson = this.transitionCookie(cookies);
          ret[cookieJson.key] = cookieJson.value;
        }
      }
      return ret;
    }
    /**
     * 获取 xml 参数
     * @return {[type]} [description]
     */
    getRequestXml(req) {
      return new Promise(resolve => {
        let result;
        req.on('data', (chunk) => {
            result += chunk;// eslint-disable-line
        });
        req.on('end', () => {
            resolve(result);// eslint-disable-line
        });
      });
    }
    /**
     * 将 xml 格式的数据转换成 json
     * @param  {[type]} xml [description]
     * @return {[type]}     [description]
     */
    xmlJson(xml) {
      return new Promise(resolve => {
        parseString(xml, (err, result) => {
          resolve({
            error: err,
            data: result
          });
        });
      });
    }
    /**
     * 再次整理下 xml 的 json 格式
     */
    createJsonToXml(oldXmlJson, newXmlJson) {
      for (const oldJson in oldXmlJson) {
        if (oldXmlJson[oldJson].length) {
          newXmlJson[oldJson] = oldXmlJson[oldJson][0];// eslint-disable-line
        } else {
          newXmlJson[oldJson] = {};// eslint-disable-line
          this.createJsonToXml(oldXmlJson[oldJson], newXmlJson[oldJson]);
        }
      }
    }
    /**
     * 整理 xml json
     * @param  {[type]} xmlJson [description]
     * @return {[type]}         [description]
     */
    createJsonDeleteList(xmlJson) {
      const result = {};
      this.createJsonToXml(xmlJson, result);
      return result;
    }
    //  获取 xml json
    getParamsXml(req) {
      const xml = this.getRequestXml(req);
      const initXmlJson = this.xmlJson(xml);
      return this.createJsonDeleteList(initXmlJson);
    }
    /**
     *  获取所有从 request 获取的 post、get、xml 参数
     **/
    getAllRequestParamsNotCookie(request, req) {
      const postAndGet = this.getQueryAndBodyParams(request);
      const xmlJson = this.getParamsXml(req);
      return Object.assign({}, postAndGet, xmlJson);
    }
    /**
     *  获取所有从 request 获取的 post、get、cookies、xml 参数
     **/
    getAllRequestParams(request, req) {
      const postAndGet = this.getQueryAndBodyParams(request);
      const cookies = this.getAllCookies(request.header.cookie);
      const xmlJson = this.getParamsXml(req);
      return Object.assign({}, postAndGet, cookies, xmlJson);
    }
  };
};
