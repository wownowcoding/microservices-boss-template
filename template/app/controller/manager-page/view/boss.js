const fs = require('fs');
const path = require('path');
module.exports = class ViewController extends require('egg').Controller {
  async testWebSocketKey() {
    if (!this.service.managerViewAggregation.index.haveOpenKey()) {
      const { txt } = this.ctx.getQueryAndBodyParams();
      this.ctx.body = txt && this.service.utilService.jsCrypto.encrypt(txt) || this.ctx.request.headers;
      return;
    }
    this.ctx.status = 200;
    const { wssKey: websocketKey } = this.ctx.getQueryAndBodyParams();
    if (websocketKey) {
      //  返回判断结果
      this.ctx.body = this.service.managerViewAggregation.sendWebSocket.getWssAuthenticationKey(websocketKey);
      return;
    }
    this.ctx.status = 404;
    this.ctx.body = '404 Not Found';
  }
  async sendNotification() {
    try {
      const query = this.ctx.getQueryAndBodyParams();

      const isPush = this.service.managerViewAggregation.sendWebSocket.sendAuthentication(query);
      if (isPush) {
        // this.ctx.logger.info('controller send-notification query: ', query);
        if (!query.operatorNo && !query.roleNo && !query.roleNo) {
          this.app.messenger.sendToApp('send-notification', query)
        } else if (query.operatorNo) {
          this.app.messenger.sendToApp('send-operator-notification', query)
        } else if (query.roleNo) {
          this.app.messenger.sendToApp('send-role-notification', query)
        } else if (query.roleNos) {
          this.app.messenger.sendToApp('send-roles-notification', query)
        }
        this.ctx.body = 'success';
      } else {
        this.ctx.body = 'authentication fail';
      }
    } catch(error) {
      this.ctx.body = error.toString();
    }
  }
  async index() {
    if (this.ctx.request.url.indexOf('/boss-api') === -1) {
      const { loginCallback } = this.ctx.request.query;
      //  如果链接上参数有包含 goupload 则重定向到上传页
      if (this.ctx.request.query.goupload) {
        return this.ctx.unsafeRedirect(`/boss/upload-static-resources`);
      }
      const isGoLogin = this.ctx.request.url.indexOf('/boss/login') === -1 && this.ctx.request.url.indexOf('/boss/upload-static-resources') === -1;
      if (isGoLogin) {
        //  非访问登录页
        const authSession = await this.service.managerViewAggregation.index.aggregationEnumAndMenu();
        this.ctx.logger.info('authSession: ', authSession)
        const __authSession = authSession && authSession.data || authSession;
        if (!(__authSession && __authSession.rspCd === '00000' && __authSession.rspInf === 'success')) {
          this.ctx.unsafeRedirect(`/boss/login${loginCallback && '?loginCallback=' + loginCallback || ''}`);
          return;
        }
      }
      // delete __config.authSession;
      await this.ctx.commonRender(`/index.tpl`, {
        env: this.app.config.env,
        config: encodeURIComponent(JSON.stringify({
          env: this.app.config.env,
          hosts: this.app.config.apollo && this.app.config.apollo.hosts || [],
          preFix: require('../../../../prefix').prefix
        }))
      })
    }
  }
  async setLanguage() {
    const language = this.ctx.request.query.language || this.ctx.request.header['accept-language'];
    this.ctx.cookies.set('language', language);
    this.ctx.body = 1;
  }
  async testApollo() {
    if (!this.service.managerViewAggregation.index.haveOpenKey()) {
      const { txt } = this.ctx.getQueryAndBodyParams();
      this.ctx.body = txt && this.service.utilService.jsCrypto.encrypt(txt) || this.ctx.request.headers;
      return;
    }
    this.ctx.body = {
      ...this.app.config,
      ...this.app.config.getHeapStatistics()
    };
  }
  async testBuildTime() {
    try {
      let buildTime = '';
      const buildTimePath = path.resolve(__dirname, '../../../../build-time.js');
      if (fs.existsSync(buildTimePath)) {
        buildTime = require(buildTimePath);
      }
      this.ctx.body = buildTime;
    } catch (err) {
      const _error = typeof _error === 'string' ? err : err.toString();
      this.ctx.body = {
        error: _error
      };
    }
  }
  async testEnums() {
    this.ctx.body = this && this.app && this.app.config && this.app.config.marketzone && this.app.config.marketzone.enums || {};
  }
  async testLogPath() {
    if (!this.service.managerViewAggregation.index.haveOpenKey()) {
      const { txt } = this.ctx.getQueryAndBodyParams();
      this.ctx.body = txt && this.service.utilService.jsCrypto.encrypt(txt) || this.ctx.request.headers;
      return;
    }
    this.ctx.body = process &&
      process.env &&
      process.env.__argv || ''
  }
  async testEggStartTime() {
    try {
      let appStartTime = '';
      const appStartTimePath = path.resolve(__dirname, '../../../../app-start-time.js');
      if (fs.existsSync(appStartTimePath)) {
        appStartTime = fs.readFileSync(appStartTimePath, 'utf8');
      }
      this.ctx.body = appStartTime;
    } catch (err) {
      const _error = typeof _error === 'string' ? err : err.toString();
      this.ctx.body = {
        error: _error
      };
    }
  }
  async testRestartApollo() {
    this.ctx.logger.info('手动更新 Apollo!');
    await this.app.runSchedule('apollo-schedule');
    this.ctx.body = 1;

    // this.ctx.body = JSON.stringify(this.app.javaServiceHost, null, 2);

    // process.nextTick(() => {
    //   this.app.messenger.sendToApp('mobile-egg-restart');
    // });
  }
};
