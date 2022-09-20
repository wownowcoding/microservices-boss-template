import api from "./apiUtil";
import axios from 'axios';
import {post_funcCallback, get_upload_url as getUploadUrl} from '@/utils/axios.js';
import Cookies from 'js-cookie';
import md5 from 'md5';
import JsCrypto from '@/utils/js-crypto';

const jsCrypto = JsCrypto(1, true);

// 返回promise,根据rspCd控制resolve/reject
export const bizApi = async (...args) => {
  const res = await api(...args);
  if (!!res && res.rspCd + "" === "00000") {
    return Promise.resolve(res);
  } else {
    return Promise.reject(res);
  }
};

export const curl = (params = {}, url, config = {}) => {
  const { isBlockException = false, success = () => {}, headers = {}, fail = () => {}, error = () => {}, finally: finallyFunction = () => {} } = config;
  return api(params, url, {
    isBlockException,
    headers
  }).then(res => {
    if (res?.rspCd?.toString() === '00000') {
      success?.(res.data, res);
    } else {
      fail?.(res);
    }
    return res;
  }).catch(err => {
    error?.(err);
    return err;
  }).finally(finallyFunction);
}

export const get_upload_url = getUploadUrl;
const CancelToken = axios.CancelToken
export const upload = (data, url, cb, cancelHandle) => {
  const scenesKey = Cookies.get('scenes');
  return axios({
    url,
    data,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'TermTyp': 'WEB',// go 3.0要求字段,用于描述客户端类型
      'appVersion': '1.0',
      contentType: false,
      processData: false,
      'dark-flower': md5(Cookies.get('scenes') + jsCrypto.CryptoJSKeys)
    },
    contentType: false,
    processData: false,
    // 获取上传进度
    onUploadProgress: (e) => {
      cb && cb(e)
    },
    // 中断上传
    cancelToken: new CancelToken((c) => {
      cancelHandle && cancelHandle(c)
    })
  }).then(res => {
    try {
      res.data = JSON.parse(decodeURIComponent(jsCrypto.decrypt(res.data)))
    } catch (err) {}
    post_funcCallback(res);
    return res.data || res;
  })
}
