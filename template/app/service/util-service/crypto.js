const crypto = require('crypto');
const _iv = 'a2xhcgAAAAAAAAAA';
const _key = 'Aeon';

/**
 * AES:sha256 加密
 * @param {String/Object} paramsValue 要加密的对象或者字符串
 * @param {String} key 要加密的秘钥
 * 
 * @returns {promise}
 */
const encrypt = (paramsValue = '', key = _key) => {
  //  如果值为 object,则转换成字符串
  let value = paramsValue;
  if (typeof paramsValue === 'object') {
    value = JSON.stringify(value);
  }

  const cryptkey = crypto.createHash('sha256').update(key).digest();
  const encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, _iv);
  let encryptdata = encipher.update(value, 'utf8', 'binary');
  encryptdata = encryptdata + encipher.final('binary');
  return Buffer.from(encryptdata, 'binary').toString('base64');
};
/**
 * AES:sha256 解密
 * @param {String} paramsValue 要解密的字符串
 * @param {String} key 要解密的秘钥
 * 
 * @returns {promise}
 */
const decrypt = (paramsValue = '', key = _key) => {
  const cryptkey = crypto.createHash('sha256').update(key).digest();
  const value = Buffer.from(paramsValue, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, _iv);
  let result = decipher.update(value, 'binary', 'utf8');
  result += decipher.final('utf8');
  return result;
};

/**
 * 加密
 * @param {String} value 需要加密的值
 * @param {*} isUtf8 是否加密成 utf8 编码
 * 
 * @returns {promise}
 */
const sha1 = (value, isUtf8 = true) => new Promise((resolve, reject) => {
  process.nextTick(() => {
    try {
      const cryptoSha1 = crypto.createHash('sha1');
      if (isUtf8) {
        cryptoSha1.update(value, 'utf8');
      } else {
        cryptoSha1.update(value);
      }
      resolve(cryptoSha1.digest('hex'));
    } catch (error) {
      reject(error);
    }
  });
});
/**
 * 原生 MD5 加密
 * @param {String} val 要加密的值
 */
const md5 = (val) => new Promise((resolve, reject) => {
  process.nextTick(() => {
    try {
      resolve(crypto.createHash('md5').update(val).digest('hex'));
    } catch (error) {
      reject(error);
    }
  });
});

const cryptoJSON = {
  encrypt,
  decrypt,
  sha1,
  md5
};

module.exports = (app, isConfig = false) => {
  if (isConfig) {
    return cryptoJSON;
  }
  return class Crypto extends app.Service {
    constructor(...args) {
      super(...args);
      Object.keys(cryptoJSON).forEach(e => {
        this[e] = cryptoJSON[e];
      });
    }
  };
};
