import CryptoJS from 'crypto-js';
// CryptoJS = CryptoJS.default || CryptoJS;
const CryptoJSKeys = 'aDvkNJgUYWY/4/+x93gBaUq+E5hxvSe6FNv+FeKjfcw=';
/**
 * AES:sha512 加密
 * @param {String/Object} paramsValue 要加密的对象或者字符串
 * @param {String} key 要加密的秘钥
 * 
 * @returns {promise}
 */
const encrypt = (paramsValue = '', key = CryptoJSKeys) => CryptoJS.AES.encrypt(paramsValue, key).toString();
/**
 * AES:sha512 解密
 * @param {String} paramsValue 要解密的字符串
 * @param {String} key 要解密的秘钥
 * 
 * @returns {promise}
 */
const decrypt = (paramsValue = '', key = CryptoJSKeys) => CryptoJS.AES.decrypt(paramsValue, key).toString(CryptoJS.enc.Utf8)

const jsCrypto = {
  encrypt,
  decrypt,
  CryptoJSKeys
};

export default (app, isConfig = false) => {
  if (isConfig) {
    return jsCrypto;
  }
  return class JsCrypto extends app.Service {
    constructor(...args) {
      super(...args);
      Object.keys(jsCrypto).forEach(e => {
        this[e] = jsCrypto[e];
      });
    }
  };
};
