const path = require('path');
const fs = require('fs');
const urlUtil = require('url');
module.exports = app => {
  return class managerViewAggregation extends app.Service {
    constructor(ctx) {
      super(ctx);
    }
    haveOpenKey() {
      try {
        const openKey = (this.ctx.request.header.cookie.split('; ').find(e => e.indexOf('open-key') !== -1) || '').replace('open-key=', '');
        return this.service.utilService.jsCrypto.decrypt(openKey) === '看什么看，有什么好看';
      } catch(error) {
        return false;
      }
      // return openKey === this.service.utilService.jsCrypto.encrypt('看什么看，有什么好看');
    }
    getDeployEnv() {
      //  默认本地
      let deployEnv = 'local';
      //  从 host 上获取环境
      if (this.ctx.request.header.host.indexOf('lifekh.com') !== -1) {
        if (this.ctx.request.header.host.indexOf('boss-') !== -1) {
          deployEnv = this.ctx.request.header.host.replace(/boss\-|\.lifekh.com/g, '');
        } else {
          //  生产环境
          deployEnv = '';
        }
      }
      return deployEnv;
    }
    /**
     * /boss_web         svc-lifekh-mp-service-basic-boss-web-sit.lifekh-mp-sit.svc.cluster.local
      /merchant-boss    svc-lifekh-mp-service-merchant-boss-web-sit.lifekh-mp-sit.svc.cluster.local
      /usercenter-boss  svc-lifekh-mp-service-usercenter-boss-web-sit.lifekh-mp-sit.svc.cluster.local
      /marketzone-boss  svc-lifekh-mp-service-basic-marketzone-web-sit.lifekh-mp-sit.svc.cluster.local
      /marketing-boss   svc-lifekh-mp-service-marketing-boss-web-sit.lifekh-mp-sit.svc.cluster.local
      /international_web  svc-lifekh-mp-service-basic-international-web-sit.lifekh-mp-sit.svc.cluster.local
      /notification_web   svc-lifekh-mp-service-middle-notification-web-sit.lifekh-mp-sit.svc.cluster.local
      /discovery_web   svc-lifekh-mp-service-discovery-boss-web-sit.lifekh-mp-sit.svc.cluster.local
      /settle-boss   svc-lifekh-mp-service-unify-settle-web-sit.lifekh-mp-sit.svc.cluster.local
      /shop/boss    svc-lifekh-mp-service-shop-core-service-sit.lifekh-mp-sit.svc.cluster.local
      /takeaway-delivery   svc-lifekh-tw-service-takeaway-delivery-web-sit.lifekh-tw-sit.svc.cluster.local
      /takeaway-merchant   svc-lifekh-tw-service-takeaway-merchant-web-sit.lifekh-tw-sit.svc.cluster.local
      /takeaway-order      svc-lifekh-tw-service-takeaway-order-web-sit.lifekh-tw-sit.svc.cluster.local
      /takeaway-product    svc-lifekh-tw-service-takeaway-product-web-sit.lifekh-tw-sit.svc.cluster.local
     */
    getOriginAndReferer() {
      //  默认本地
      let deployEnv = this.getDeployEnv();
      if (deployEnv === 'local') {
        return {
          origin: `http://${this.ctx.request.header.host}`,
          referer: `http://${this.ctx.request.header.host}/`,
          host: `boss-sit.lifekh.com`
        };
      }
      if (deployEnv) {
        return {
          origin: `https://boss-${deployEnv}.lifekh.com`,
          referer: `https://boss-${deployEnv}.lifekh.com/`,
          host: `boss-${deployEnv}.lifekh.com`
        };
      }
      return {
        origin: `https://boss.lifekh.com`,
        referer: `https://boss.lifekh.com/`,
        host: `boss.lifekh.com`
      };
    }
    getLang(lang) {
      const __lang = lang && lang.split(/\;|\-/g)[0] || 'en';
      const langMap = {
        zh: 'zh-CN',
        en: 'en-US',
        cb: 'cb',
        km: 'km-KH'
      }
      return langMap[__lang];
    }
    getCookies() {
      const cookieObject = {};
      this.ctx.request.header.cookie && this.ctx.request.header.cookie.split('; ').forEach(e => {
        const cookieStr = e.split('=');
        if (cookieStr[1] && cookieStr[1] !== 'undefined' && cookieStr[1] !== 'null') {
          cookieObject[cookieStr[0]] = cookieStr[1];
        }
      });
      return cookieObject;
    }
    async basicAxiosCurl(__url, data = {}, headers) {
      let url = __url.indexOf('.lifekh.com') !== -1 && __url.split('.lifekh.com')[1] || __url;
      const domain = this.getDomain(url);
      const axios = require('axios');
      // 拼接 url
      const signUrl = urlUtil.resolve(domain, url);
      // 创建axios实例
      let base_api = axios.create();
      const hostModel = this.getOriginAndReferer();
      //  获取国际化
      const language = this.ctx.cookies.get('language');
      const acceptLanguage = this.getLang(language || this.ctx.request.header['accept-language']) || this.ctx.request.header['accept-language'] || 'en';
      // 设置缺省头部字段
      base_api.defaults = Object.assign(base_api.defaults, {
        headers: Object.assign({}, {
          origin: hostModel.origin,
          referer: hostModel.referer,
          host: hostModel.host,
          'Content-Type': 'application/json',
          'TermTyp': 'WEB',// go 3.0要求字段,用于描述客户端类型
          'appVersion': '1.0',
          'accept-language': acceptLanguage,
          language: acceptLanguage,
          'Accept-Language': acceptLanguage,
          msgid: this.ctx.request.header.msgid,
          businessLine: this.ctx.request.header.businessLine || this.ctx.request.header.businessline || '',
		      departmentNo: this.ctx.request.header.departmentNo || this.ctx.request.header.departmentno || '',
          allBusinessLine: this.ctx.request.header.allBusinessLine || this.ctx.request.header.allbusinessline || true,
          loginName: this.ctx.request.header.loginName || this.ctx.request.header.loginname || '',
          mobileNo: this.ctx.request.header.mobileNo || this.ctx.request.header.mobileno || '',
          operatorNo: this.ctx.request.header.operatorNo || this.ctx.request.header.operatorno || '',
          roleNo: this.ctx.request.header.roleNo || this.ctx.request.header.roleno || ''
        }, headers),
        withCredentials: true,
        crossDomain: true,
        timeout: 10e4 //10秒超时
      });

      let result;
      let apiQuery = {
        method: 'post',
        url: signUrl,
        data
      };
      if (this.ctx.request.header.responsetype && this.ctx.request.header.sessionid && signUrl.indexOf('/boss_web/boss/auth/session.do') === -1) {
        apiQuery.headers = {
          "Content-Type": "application/json",
          sessionId: this.ctx.request.header.sessionid
        };
        apiQuery.responseType = 'arraybuffer';
      }
      const startTime = new Date().valueOf();
      try {
        this.ctx.logger.info(`requestJAVA-(${signUrl}): `, JSON.stringify(apiQuery));
        const res = (await base_api(apiQuery));
        this.ctx.logger.info(`耗时(${new Date().valueOf() - startTime}) requestJAVA response: `, JSON.stringify({
          url: res.config.url,
          query: res.config.data,
          data: apiQuery.responseType === 'arraybuffer' && 'stream data' || res.data,
          headers: apiQuery.headers,
          connection: res.connection
        }, null, 2));
        result = {
          ret: 'success',
          data: res,
          domain
        }
      } catch(err) {
        this.ctx.logger.info(`耗时(${new Date().valueOf() - startTime}) requestJAVAError-(${signUrl})-${JSON.stringify(apiQuery)} error: `, err);
        result = {
          ret: 'error',
          data: err,
          domain
        }
      }
      return result;
    }
    async commonAsiosCurl(url, data = {}, headers) {
      const basicData = await this.basicAxiosCurl(url, data, headers);
      const res = basicData && basicData.ret && basicData.ret === 'success' && basicData.data || {};
      if (typeof res.data === 'object' && !Array.isArray(res.data) && !Buffer.isBuffer(res.data)) {
        res.data.api = url;
      }
      return res && res.data &&
      {
        headers: res.headers,
        data: res.data
      } || basicData;
    }
    async bossCurl(url, data = {}, header) {
      const domain = this.getDomain(url);
      try {
        // 拼接 url
        const signUrl = urlUtil.resolve(domain, url);
        return await this.app.fetch(signUrl, Object.assign({}, JSON.parse(JSON.stringify(this.ctx.request.header)), {
          method: 'POST',
          data,
          dataType: 'json',
          contentType: 'json',
          header: Object.assign({}, this.ctx.request.header, header || {})
        }));
      } catch (e) {
        return {
          error: {
            code: 99999,
            message: 'timeout'
          }
        };
      }
    }
    getHosts() {
      return `/boss_web,svc-lifekh-mp-service-basic-boss-web-sit.lifekh-mp-sit.svc.cluster.local;/merchant-boss,svc-lifekh-mp-service-merchant-boss-web-sit.lifekh-mp-sit.svc.cluster.local;/usercenter-boss,svc-lifekh-mp-service-usercenter-boss-web-sit.lifekh-mp-sit.svc.cluster.local;/marketzone-boss,svc-lifekh-mp-service-basic-marketzone-web-sit.lifekh-mp-sit.svc.cluster.local;/marketing-boss,svc-lifekh-mp-service-marketing-boss-web-sit.lifekh-mp-sit.svc.cluster.local;/international_web,svc-lifekh-mp-service-basic-international-web-sit.lifekh-mp-sit.svc.cluster.local;/notification_web,svc-lifekh-mp-service-middle-notification-web-sit.lifekh-mp-sit.svc.cluster.local;/discovery_web,svc-lifekh-mp-service-discovery-boss-web-sit.lifekh-mp-sit.svc.cluster.local;/settle-boss,svc-lifekh-mp-service-unify-settle-web-sit.lifekh-mp-sit.svc.cluster.local;/shop/boss,svc-lifekh-mp-service-shop-core-service-sit.lifekh-mp-sit.svc.cluster.local;/takeaway-delivery,svc-lifekh-tw-service-takeaway-delivery-web-sit.lifekh-tw-sit.svc.cluster.local;/takeaway-merchant,svc-lifekh-tw-service-takeaway-merchant-web-sit.lifekh-tw-sit.svc.cluster.local;/takeaway-order,svc-lifekh-tw-service-takeaway-order-web-sit.lifekh-tw-sit.svc.cluster.local;/takeaway-product,svc-lifekh-tw-service-takeaway-product-web-sit.lifekh-tw-sit.svc.cluster.local;/tw-merchant-boss,svc-lifekh-tw-service-merchant-boss-service-sit.lifekh-tw-sit.svc.cluster.local;/groupon-service,svc-lifekh-tw-service-takeaway-groupon-service-sit.lifekh-tw-sit.svc.cluster.local;/merchantgateway_web,svc-lifekh-mp-service-basic-merchantgateway-web-sit.lifekh-mp-sit.svc.cluster.local;/authcenter,svc-lifekh-mp-service-authcenter-core-service-sit.lifekh-mp-sit.svc.cluster.local;/operator,svc-lifekh-mp-service-usercenter-core-service-sit.lifekh-mp-sit.svc.cluster.local;/file-service,svc-lifekh-mp-service-basic-file-web-sit.lifekh-mp-sit.svc.cluster.local;/node-composition,svc-lifekh-mp-nodejs-mobile-app-composition-sit.lifekh-mp-sit.svc.cluster.local;`;
    }
    getDomain(__url) {
      let url = __url.indexOf('.lifekh.com') !== -1 && __url.split('.lifekh.com')[1] || __url;
      let hosts;
      if (this.app && this.app.config && this.app.config.server && this.app.config.server.host) {
        hosts = this.app.config.server.host;
      }
      hosts = (hosts || this.getHosts()).split(';').filter(e => !!e).map(e => e.split(','));
      for (const __host of hosts) {
        if (url.indexOf(__host[0]) === 0) {
          return 'http://' + __host[1] + ':8080';
        }
      }
      //  默认本地
      let deployEnv = this.getDeployEnv();
      if (deployEnv === 'local') {
        return 'https://boss-sit.lifekh.com/';
      }
      if (deployEnv) {
        return `https://boss-${deployEnv}.lifekh.com/`;
      }
      return `https://boss.lifekh.com/`;
    }
    //  获取 boss 源码中的配置
    initBossConfig() {
      if (!this.app.config.bossConfig) {
        const bossConfig = {};
        fs.readFileSync(path.resolve(this.app.config.baseDir, './src/config.js'), 'utf8')
          .split(/const\ moduleNameMap\ \=\ \{|}/)
          .filter(e => e.indexOf('BOSS_WEB') !== -1)
          .find(e => 1)
          .split(',')
          .map(e => e.replace(/\s/g, '').split(/\/\/|\/\*/)[0] || '')
          .filter(e => !!e)
          .forEach(e => {
            const dataSource = e.replace(/\'/g, '').split(':');
            bossConfig[dataSource[0]] = dataSource[1];
          });
        this.app.config.bossConfig = bossConfig;
      }
    }
    getSystemMenuFirstList() {
      const cookieModel = this.getCookies();
      if (cookieModel.roleNo) {
        return this.commonAsiosCurl(`/boss_web/boss/system/menu/first/list.do`, {
          roleNo: cookieModel.roleNo
        }, {
          cookie: `BOSS-SHIRO-JSESSIONID=${cookieModel['BOSS-SHIRO-JSESSIONID']}`
        }).then(res => {
          const __res = {};
          Object.keys(res.data).forEach(e => {
            if (e !== 'responseTm') {
              __res[e] = res.data[e];
            }
          })
          return __res;
        });
      }
      return undefined;
    }
    getPermissionList() {
      const cookieModel = this.getCookies();
      return this.commonAsiosCurl(`/boss_web/boss/permission/tree/list.do`, {}, {
        cookie: `BOSS-SHIRO-JSESSIONID=${cookieModel['BOSS-SHIRO-JSESSIONID']}`
      }).then(res => {
        const __res = {};
        Object.keys(res.data).forEach(e => {
          if (e !== 'responseTm') {
            __res[e] = res.data[e];
          }
        })
        return __res;
      });
    }
    getEnums() {
      //  获取国际化
      const language = this.ctx.cookies.get('language');
      const acceptLanguage = this.getLang(language || this.ctx.request.header['accept-language']) || this.ctx.request.header['accept-language'] || 'en';
      if (this.app.config.marketzone && this.app.config.marketzone[acceptLanguage] && new Date().valueOf() - this.app.config.marketzone[acceptLanguage].time >= this.app.config.apolloConfig.schedule.interval) {
        return Promise.resolve(this.app.config.marketzone[acceptLanguage].enum);
      }
      return this.commonAsiosCurl(`/marketzone-boss/enum/enums/all/get.do`, {}, {}).then(res => {
        this.app.messenger.sendToApp('set-marketzone-enum', {
          language: acceptLanguage,
          enum: res
        });
        const __res = {};
        Object.keys(res.data).forEach(e => {
          if (e !== 'responseTm') {
            __res[e] = res.data[e];
          }
        })
        return __res;
      });
    }
    getAuthSession() {
      return this.commonAsiosCurl(`/boss_web/boss/auth/session.do`, {}, {
        cookie: this.ctx.request.header.cookie
      }).then(res => {
        if (res && res.ret === 'error') {
          throw res.data;
        }
        const __res = {};
        Object.keys(res.data).forEach(e => {
          if (e !== 'responseTm') {
            __res[e] = res.data[e];
          }
        })
        return __res;
      });
    }
    clearLoginSession() {
      this.ctx.cookies.set('BOSS-SHIRO-JSESSIONID', '', {
        httpOnly: true, // 默认就是 true
        encrypt: true,
        maxAge: 1
      });
    }
    convertToSend(url, params = {}) {
      const headers = {
        cookie: this.ctx.request.header.cookie || ''
      };
      if (this.ctx.request.header.responsetype) {
        headers.responseType = this.ctx.request.headers.responsetype;
      }
      return this.commonAsiosCurl(url, params, headers).then(res => {
        if (res) {
          if (res.headers && res.headers['set-cookie'] && res.headers['set-cookie'].length) {
            this.ctx.response.set('set-cookie', res.headers['set-cookie'][0]);
          }
        }
        return res
      });
    }
    async aggregationEnumAndMenu() {
      try {
        this.initBossConfig();
        return await this.convertToSend('/boss_web/boss/auth/session.do')
      } catch (err) {
        return err;
      }
    }
  }
};

