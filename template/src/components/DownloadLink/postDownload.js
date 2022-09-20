/*
 * @Description:
 * @Author: Rico.刘一飞
 * @Date: 2019-10-30 14:46:32
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-11-04 17:45:00
 */
import { base_api, errorManage, rspInfManage } from "@/utils/axios";
import config from "@/config";
const { baseURL } = config;
import Store from "@/utils/store";
let downloadFileName;
/**
 *
 * @description 调用post请求下载文件的方法,要求响应文件流responseType为blob类型
 * @param {String} url 请求url
 * @param {Object} params 参数
 * @param {String} fileName 文件名
 */
const postDownload = async (url, params, fileName) => {
  const sessionId = Store.loadObject("sessionId");
  const { NODE_ENV } = process.env;
  // const __url = /http(s)?:\/\/.+/.test(url) ? url : baseURL + url;
  // const __url = NODE_ENV==='development'?
  // '/api/' + url:
  // /http(s)?:\/\/.+/.test(url) ?
  //   url :
  //    baseURL + url;

  // 处理下载文件的服务地址
  let __url = "";
  if (/http(s)?:\/\/.+/.test(url)) {
    // 去文件服务下载
    __url = url;
  } else if (NODE_ENV === "development") {
    // 本地开发走proxyTable代理
    __url = "/api/" + url;
  } else {
    // 生产环境读当前域名
    __url = baseURL + url;
  }

  const res = await base_api({
    // 用axios发送post请求
    method: "post",
    url: __url, // 请求地址
    // url: url, // 请求地址
    data: params, // 参数
    headers: {
      "Content-Type": "application/json",
      sessionId: sessionId
    },
    // responseType: 'blob', // 表明返回服务器返回的数据类型
    responseType: "arraybuffer"
  }).catch(error => {
    return errorManage(error);
  });
  downloadFileName = encodeURI(fileName);
  resolveBob(res);
};
const resolveBob = res => {
   // const blob = new Blob([res.data])
  let resData = res.data;
  // 因为约定服务器异常后,返回文件流的content-type:application/json,故以此来判断下载异常
  if (
    !!res.headers["content-type"] &&
    res.headers["content-type"].includes("application/json")
  ) {
    try {
      //服务器返回异常
      // Message.error('下载异常')
      let _resData = JSON.parse(
        new TextDecoder("utf-8").decode(new Uint8Array(resData))
      );
      rspInfManage(_resData, res?.headers?.msgid);
    } catch(err) {
      rspInfManage(res.data, res?.headers?.msgid);
    }
  } else {
    const blob = new Blob([resData], { type: "application/octet-stream" });
    // const blob = resData
    // 设置文件流名字必须现在服务端设置
    // Access-Control-Expose-Headers: Content-Disposition
    // 这样才能在res.headers中获取到content-disposition
    let resFileName;
    if (res.headers["content-disposition"]) {
      resFileName = res.headers["content-disposition"].replace(
        /.+filename=(.+)/,
        "$1"
      );
      if (resFileName.includes("+")) {
        resFileName = resFileName.replace(/\+/g, "%20");
      }
    }
    let fileName = resFileName || downloadFileName;
    console.log(" Dev Log: fileName", fileName);
    fileName = decodeURI(fileName); // 对中文文件名做解码
    if ("download" in document.createElement("a")) {
      // 非IE下载
      const elink = document.createElement("a");
      elink.download = fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName);
    }
  }
};
export default postDownload;
