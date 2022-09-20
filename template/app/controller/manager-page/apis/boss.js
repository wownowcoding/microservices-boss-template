module.exports = class ApisController extends require('egg').Controller {
  constructor(...args) {
    super(...args);
    //  不需要访问的接口
    this.notLoginApis = [
      'boss_web/boss/auth/check/login.do',
      'boss_web/boss/auth/captcha/image/get.do',
      'boss_web/boss/auth/authentication.do',
      'boss_web/boss/auth/secondary/authentication.do',
      'node-composition/boss-language/all/list.do',
      'node-composition/boss-language/list.do',
      'node-composition/boss-language/bulk-insert.do'
    ];
  }
  async convertToSend() {
    const managerViewAggregation = this.service.managerViewAggregation.index;
    try {
      this.ctx.body = await managerViewAggregation.getSession();
      this.ctx.response.set('set-cookie', this.ctx.body.headers['set-cookie'][0]);
    } catch (err) {
      this.ctx.body = err;
    }
  }
  async batchConvertToSendV1() {
    let { apiQueryList } = this.ctx.getQueryAndBodyParams();
    let apisList;
    try {
      apisList = JSON.parse(decodeURIComponent(apiQueryList))
    } catch (err) {
      this.ctx.errorWrap(err);
      return;
    }
    const managerViewAggregation = this.service.managerViewAggregation.index;
    //  加入并行数组
    const jobRequest = [];
    let isLogin = false;
    for (const apis of apisList) {
      const { apiUrl, apiData } = apis;
      if (!isLogin) {
        isLogin = !(this.notLoginApis.filter(e => apis.apiUrl.indexOf(e) !== -1).length);
      }
      jobRequest.push(managerViewAggregation.convertToSend(apiUrl, apiData));
    }
    if (isLogin) {
      jobRequest.unshift(managerViewAggregation.convertToSend('/boss_web/boss/auth/session.do'));
    }
    //  开始执行查询
    const ret = await Promise.all(jobRequest);
    //  需要登录，校验登录状态
    if (isLogin && ret[0].data && !!(ret[0].data.rspCd !== '00000' || ret[0].data.rspInf !== 'success')) {
      this.ctx.bossListWrap([ret[0]]);
    } else if (isLogin) {
      this.ctx.bossListWrap(ret.filter((e, i) => i !== 0));
    } else {
      this.ctx.bossListWrap(ret);
    }
  }
  async convertToSendV1() {
    let { apiQuery } = this.ctx.getQueryAndBodyParams();
    let apis;
    try {
      apis = JSON.parse(decodeURIComponent(apiQuery))
    } catch (err) {
      this.ctx.errorWrap(err);
      return;
    }

    const managerViewAggregation = this.service.managerViewAggregation.index;
    const isLogin = !(this.notLoginApis.filter(e => apis.apiUrl.indexOf(e) !== -1).length);

    //  加入并行数组
    const jobRequest = [];
    if (isLogin) {
      jobRequest.push(managerViewAggregation.convertToSend('/boss_web/boss/auth/session.do'));
    }
    const { apiUrl, apiData } = apis;
    jobRequest.push(managerViewAggregation.convertToSend(apiUrl, apiData));

    //  开始执行查询
    const ret = await Promise.all(jobRequest);
    //  需要登录，校验登录状态
    if (isLogin) {
      this.ctx.bossWrap(ret[!!(ret[0].data && ret[0].data.rspCd !== '00000' || ret[0].data && ret[0].data.rspInf !== 'success') ? 0 : 1]);
    } else {
      this.ctx.bossWrap(ret[0]);
    }
  }
  async uploadWownowAssets() {
    this.ctx.status = 502;
    try {
      const searchParams = new URLSearchParams(this.ctx.request.query).toString();
      const httpProxy = require('http-proxy');
      const proxy = httpProxy.createProxyServer({
        proxyTimeout: 600000,
        timeout: 600000
      });
      const apiUrl = `/app/mobile-app-composition/file/wownow-upload.do${searchParams && `?${searchParams}` || ''}`;
      const target = this.app.config.compositionApi;

      //  将 req 里的路径改成另一端后端的路径，参数去除
      this.ctx.req.url = apiUrl;
      this.ctx.req._parsedUrl.search = '';
      this.ctx.req._parsedUrl.query = '';
      this.ctx.req._parsedUrl.pathname = this.ctx.req.url;
      this.ctx.req._parsedUrl.path = this.ctx.req.url;
      this.ctx.req._parsedUrl.href = this.ctx.req.url;
      this.ctx.req._parsedUrl._raw = this.ctx.req.url;
      this.ctx.req.headers.language = this.ctx.req.headers['accept-language'] || 'en'
      this.ctx.logger.info('wownow-upload assets request apiUrl: ', apiUrl);
      this.ctx.logger.info('wownow-upload assets request headers: ', this.ctx.req.headers);

      const result = await new Promise((resolve, reject) => {
        proxy.on('proxyRes', (proxyRes, req, res) => {
          let body = [];
          proxyRes.on('data', chunk => body.push(chunk));
          proxyRes.on('end', () => {
            const bodyStr = Buffer.concat(body).toString();
            try {
              return resolve(JSON.parse(bodyStr));
            } catch(err) {
              this.ctx.logger.info('upload error: ', err);
              return {
                error: bodyStr
              };
            }
          });
          proxyRes.on('error', (err, req, res) => resolve({
            error: err
          }));
        });
        proxy.web(this.ctx.req, this.ctx.res, {
          target,
          selfHandleResponse: true
        });
        proxy.on('error', (err, req, res) => resolve({
          error: err
        }))
      });
      this.ctx.logger.info('wownow-upload assets result: ', result);
      this.ctx.status = 200;
      this.ctx.body = result;
    } catch(error) {
      this.ctx.body = this.ctx.errorMsg();
    }
    try {
      require('stream-wormhole')(await this.ctx.getFileStream());
    } catch(err) {}
  }
  async uploadAssets() {
    this.ctx.status = 502;
    try {
      const managerViewAggregation = this.service.managerViewAggregation.index;
      const authSession = await managerViewAggregation.convertToSend('/boss_web/boss/auth/session.do');
      if (authSession.data && !!(authSession.data.rspCd !== '00000' || authSession.data.rspInf !== 'success')) {
        this.ctx.bossWrap(authSession);
        return
      }
      const searchParams = new URLSearchParams(this.ctx.request.query).toString();
      const httpProxy = require('http-proxy');
      const proxy = httpProxy.createProxyServer({
        proxyTimeout: 600000,
        timeout: 600000
      });
      const apiUrl = `/app/mobile-app-composition/file/upload.do${searchParams && `?${searchParams}` || ''}`;
      const target = this.app.config.compositionApi;

      //  将 req 里的路径改成另一端后端的路径，参数去除
      this.ctx.req.url = apiUrl;
      this.ctx.req._parsedUrl.search = '';
      this.ctx.req._parsedUrl.query = '';
      this.ctx.req._parsedUrl.pathname = this.ctx.req.url;
      this.ctx.req._parsedUrl.path = this.ctx.req.url;
      this.ctx.req._parsedUrl.href = this.ctx.req.url;
      this.ctx.req._parsedUrl._raw = this.ctx.req.url;
      this.ctx.req.headers.language = this.ctx.req.headers['accept-language'] || 'en'
      this.ctx.logger.info('upload assets request apiUrl: ', apiUrl);
      this.ctx.logger.info('upload assets request headers: ', this.ctx.req.headers);

      const result = await new Promise((resolve, reject) => {
        proxy.on('proxyRes', (proxyRes, req, res) => {
          let body = [];
          proxyRes.on('data', chunk => body.push(chunk));
          proxyRes.on('end', () => {
            const bodyStr = Buffer.concat(body).toString();
            try {
              return resolve(JSON.parse(bodyStr));
            } catch(err) {
              this.ctx.logger.info('upload error: ', err);
              return {
                error: bodyStr
              };
            }
          });
          proxyRes.on('error', (err, req, res) => resolve({
            error: err
          }));
        });
        proxy.web(this.ctx.req, this.ctx.res, {
          target,
          selfHandleResponse: true
        });
        proxy.on('error', (err, req, res) => resolve({
          error: err
        }))
      });
      this.ctx.logger.info('upload assets result: ', result);
      // if (result && result.rspCd === '99999') {
      //   try {
      //     require('stream-wormhole')(await this.ctx.getFileStream());
      //   } catch(err) {}
      //   this.ctx.errorWrap();
      //   return;
      // }
      this.ctx.status = 200;
      this.ctx.body = result;
      // this.ctx.bossWrap({
      //   data: result
      // })
    } catch(error) {
      // this.ctx.errorWrap();
      this.ctx.body = this.ctx.errorMsg();
    }
    try {
      require('stream-wormhole')(await this.ctx.getFileStream());
    } catch(err) {}
  }
  async uploadFile() {
    const managerViewAggregation = this.service.managerViewAggregation.index;
    const authSession = await managerViewAggregation.convertToSend('/boss_web/boss/auth/session.do');
    if (authSession.data && !!(authSession.data.rspCd !== '00000' || authSession.data.rspInf !== 'success')) {
      this.ctx.bossWrap(authSession);
      return
    }
    //  先获取要代理的路径
    const apiUrl = decodeURIComponent(this.ctx.request.query.api);
    const target = this.ctx.service.managerViewAggregation.index.getDomain(apiUrl);
    this.ctx.response.set('msgid', this.ctx.request.header.msgid);
    if (apiUrl) {
      const httpProxy = require('http-proxy');
      const proxy = httpProxy.createProxyServer({
        proxyTimeout: 600000,
        timeout: 600000
      });

      //  将 req 里的路径改成另一端后端的路径，参数去除
      this.ctx.req.url = apiUrl;
      this.ctx.req._parsedUrl.search = '';
      this.ctx.req._parsedUrl.query = '';
      this.ctx.req._parsedUrl.pathname = this.ctx.req.url;
      this.ctx.req._parsedUrl.path = this.ctx.req.url;
      this.ctx.req._parsedUrl.href = this.ctx.req.url;
      this.ctx.req._parsedUrl._raw = this.ctx.req.url;
      this.ctx.req.headers.language = this.ctx.req.headers['accept-language'] || 'en'
      this.ctx.logger.info('upload file request apiUrl: ', apiUrl);
      this.ctx.logger.info('upload file request headers: ', this.ctx.req.headers);

      let proxyTarget = this.ctx.service.managerViewAggregation.index.getDomain(apiUrl)
      this.ctx.logger.info('upload-proxy-target', proxyTarget)
      try {
        const result = await new Promise((resolve, reject) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            let body = [];
            proxyRes.on('data', chunk => body.push(chunk));
            proxyRes.on('end', () => {
              const bodyStr = Buffer.concat(body).toString();
              try {
                return resolve(JSON.parse(bodyStr));
              } catch(err) {
                this.ctx.logger.info('upload error: ', err);
                return {
                  error: bodyStr
                };
              }
            });
            proxyRes.on('error', (err, req, res) => resolve({
              error: err
            }));
          });
          proxy.web(this.ctx.req, this.ctx.res, {
            target,
            selfHandleResponse: true
          });
          proxy.on('error', (err, req, res) => resolve({
            error: err
          }))
        });
        this.ctx.logger.info('upload-file-result', result)
        if (result.error) {
          this.ctx.errorWrap(result.error);
          return;
        }
        this.ctx.bossWrap({
          data: result
        })
      } catch(error) {
        this.ctx.logger.info('upload-file-error', error)
      }
      try {
        require('stream-wormhole')(await this.ctx.getFileStream());
      } catch(err) {}
      return;
    }
    try {
      require('stream-wormhole')(await this.ctx.getFileStream());
    } catch(err) {}
    this.ctx.errorWrap('api is empty!');
  }
};
