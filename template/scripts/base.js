const https = require('https');
const http = require('http');
global.fs = require('fs');
global.path = require('path');
const args = {};
process.argv.forEach(e => {
  if (e.indexOf('=') !== -1) {
    const datas = e.split('=');
    if (datas.length > 1) {
      args[datas[0]] = e.replace(datas[0] + '=', '');
    }
  }
});
Promise.prototype.isPromise = a => a && typeof a.then === 'function' && typeof a.catch === 'function' && typeof a.finally === 'function';
const getCurrentTime = () => `[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date())}]`;
const nowTime = new Date().valueOf();
const __log = console.log;
console.log = (data, msg = '') => {
  __log(data, msg);
  __log(getCurrentTime(), '\n');
}
const serialization = obj => JSON.parse(JSON.stringify(obj));
const httpsGet = url => new Promise((resolve, reject) => {
  try {
    https.get(url, res => res.on('data', d => resolve(d))).on('error', error => reject(error));
  } catch(httpsError) {
    reject(httpsError);
  }
});
const httpGet = url => new Promise((resolve, reject) => {
  try {
    http.get(url, res => res.on('data', d => resolve(d))).on('error', error => reject(error));
  } catch(httpsError) {
    reject(httpsError);
  }
});
const timeout = (fn = () => {}, timestamp = 0) => new Promise((resolve, reject) => {
  try {
    const ___timeout = setTimeout(() => {
      clearTimeout(___timeout);
      try {
        const callRet = typeof fn === 'function' && fn();
        if (Promise.prototype.isPromise(callRet)) {
          callRet.then(resolve).catch(reject);
        } else {
          resolve(callRet);
        }
      } catch(error) {
        reject(error);
      }
    }, timestamp);
  } catch(err) {
    reject(err);
  }
});
const getLang = l => l.toUpperCase().indexOf('KM') !== -1 && 'km-KH' || l.toUpperCase().indexOf('ZH') !== -1 && 'zh-CN' || 'en-US';
const writeFileSync = (dataSourcePath, data) => fs.writeFileSync(dataSourcePath, data, { 'flag': 'w' });
module.exports = {
  serialization,
  //  https get 访问 promise 的封装
  httpsGet,
  httpGet,
  getCurrentTime,
  //  当前时间
  nowTime,
  //  获取参数将其整理成 json
  getArgs: () => args,
  //  返回是一个 promise 的 timeout
  timeout,
  //  整理语言
  getLang,
  //  退出应用
  exit: () => process.exit(1),
  writeFileSync
};