const path = require('path');
const execSync = require('child_process').execSync;

module.exports = class OrderDetailController extends require('egg').Controller {
  async detali() {
    if (!this.service.managerViewAggregation.index.haveOpenKey()) {
      const { txt } = this.ctx.getQueryAndBodyParams();
      this.ctx.body = txt && this.service.utilService.jsCrypto.encrypt(txt) || this.ctx.request.headers;
      return;
    }
    try {
      const res = await this.app.fetch(`${this.app.config.compositionApi}/app/order/detail/v1/get-order?orderNo=${this.ctx.request.query.orderNo}`, {
        method: 'get',
        data: {},
        dataType: 'json',
        contentType: 'json'
      });
      this.ctx.body = typeof res === 'string' ? res : JSON.stringify(res, undefined, 2);
    } catch (err) {
      this.ctx.body = err;
    }
  }
  async getCompositionIP() {
    this.ctx.status = 200;
    const { proName } = this.ctx.getQueryAndBodyParams();
    if (proName && proName === 'composition') {
      const {
        timeout
      } = this.app.config.fetch;
      const defaultOptions = {
        timeout,
        method: 'GET'
      };
      // 合并默认options和自定义options
      const mergeOptions = Object.assign({}, defaultOptions, {
        data: {},
        dataType: 'json',
        contentType: 'json',
        header: {
          msgId: this.ctx.request.header.msgid,
          msgid: this.ctx.request.header.msgid
        }
      });

      // 直接返回this.curl返回的data字段
      const response = await this.app.curl(`${this.app.config.compositionApi}/manager/select/get-compositio-ip?proName=${proName}`, mergeOptions);
      this.ctx.body = response && response.res && response.res.remoteAddress || '';
      return;
    }
    this.ctx.status = 404;
    this.ctx.body = '404 Not Found'
  }
  async goCompositionPath() {
    if (!this.service.managerViewAggregation.index.haveOpenKey()) {
      const { txt } = this.ctx.getQueryAndBodyParams();
      this.ctx.body = txt && this.service.utilService.jsCrypto.encrypt(txt) || this.ctx.request.headers;
      return;
    }
    const { urlPath, method = 'get' } = this.ctx.getQueryAndBodyParams();
    try {
      const paramsData = {};
      let fetchUrl = `${this.app.config.compositionApi}${decodeURIComponent(urlPath)}`;
      if (method.toLocaleLowerCase() === 'post') {
        const myURL = new URL(fetchUrl);
        myURL.searchParams.forEach((value, name) => {
          paramsData[name] = value;
        });
        fetchUrl = require('url').resolve(myURL.origin, myURL.pathname);
      }
      // 从 config 获取可配置项作为默认options
      const {
        timeout
      } = this.app.config.fetch;
      const defaultOptions = {
        timeout,
        method: 'GET'
      };
      // 合并默认options和自定义options
      const mergeOptions = Object.assign({}, defaultOptions, {
        method,
        data: paramsData,
        dataType: 'json',
        contentType: 'json',
        header: {
          msgId: this.ctx.request.header.msgid,
          msgid: this.ctx.request.header.msgid
        }
      });

      // 直接返回this.curl返回的data字段
      const response = await this.app.curl(fetchUrl, mergeOptions);
      const res = response.data
      this.ctx.logger.info('goCompositionPath response: ', Object.keys(response).filter(e => e !== 'data').map(e => {
        return {
          [e]: response[e]
        }
      }));
      this.ctx.body = typeof res === 'string' ? res : JSON.stringify(res, undefined, 2);
    } catch (err) {
      this.ctx.body = urlPath;
    }
  }
  async getAllEnum() {
    this.ctx.body = await this.service.managerViewAggregation.index.getEnums();
  }
  async getBossEggConfig() {
    if (!this.service.managerViewAggregation.index.haveOpenKey()) {
      const { txt } = this.ctx.getQueryAndBodyParams();
      this.ctx.body = txt && this.service.utilService.jsCrypto.encrypt(txt) || this.ctx.request.headers;
      return;
    }
    this.ctx.body = JSON.stringify(Object.assign({}, this.app.config, {
      apolloData: process && process.env || {},
      ...this.app.config.getHeapStatistics()
    }), undefined, 2);
  }

  async testCopy() {
    // const nodeModulePath = path.resolve(this.app.config.baseDir, 'node_modules');
    // const currentNodeModulePath = path.resolve(__dirname, 'allNodeModules');
    // const ret = {
    //   start: `[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date())}]`
    // };
    // execSync(`cp -rf ${nodeModulePath} ${currentNodeModulePath}`);
    // ret.end = `[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date())}]`;
    // execSync(`rm -rf ${currentNodeModulePath}`);
    this.ctx.body = 1;
  }

}
