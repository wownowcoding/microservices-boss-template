module.exports = app => {
  class CommonApi extends app.Service {
    constructor(ctx) {
      super(ctx);
    }
    /**
     * 通用服务的统一接口封装，这里会统一做签名以及错误处理
     * @param url 调用通用服务的接口地址
     * @param data curl 请求的ata参数
     * @param method 请求的方法，不传默认是post
     * @param timeout 请求的超时时间
     */
    async curl(url, data, method = 'POST') {
      try {
        // 拼接域名前缀
        const requestUrl = this.app.config.serviceApi.host + url;
        return await this.app.fetch(requestUrl, {
          method,
          data,
          dataType: 'json',
          contentType: 'json'
        });
      } catch (e) {
        return {
          error: {
            code: 99999,
            message: 'timeout'
          }
        };
      }
    }
  }

  return CommonApi;
};
