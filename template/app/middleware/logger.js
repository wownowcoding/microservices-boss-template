/**
 * 打印请求级别的日志
 */
module.exports = (options, app) => {
	return async function logger(ctx, next) {
		const requestTime = new Date().valueOf();
		if (ctx.request && ctx.request.url.toLocaleLowerCase().indexOf('/actuator/health') === -1 && ctx.request.url.toLocaleLowerCase().indexOf('/actuator/prometheus') === -1) {
      let { headers, body, method, query, url: requestUrl } = ctx.request;
      let currentUrl = ctx.request.url;
      if (query.apiQueryList) {
        currentUrl = `${ctx.request.url.split('?')[0]}?apiQueryList=${decodeURIComponent(query.apiQueryList)}`
			}
      ctx.logger.info(JSON.stringify({ type: 'request', method, url: currentUrl, headers, body, requestUrl }))
    }
		await next();
		if (ctx.response && ctx.request.url.toLocaleLowerCase().indexOf('/actuator/health') === -1 && ctx.request.url.toLocaleLowerCase().indexOf('/actuator/prometheus') === -1) {
			const responseData = {
				type: 'response',
				status: ctx.response.status, message: ctx.response.message || '',
				header: JSON.stringify(ctx.response.headers),
				body: ctx.response.header['content-type'] !== 'text/html; charset=utf-8' && !ctx.request.header.responseData && !(ctx.response.body && ctx.response.body._chunkSize && ctx.response.body._chunkSize > 10000) && JSON.stringify(ctx.response.body) || 'Length exceeds limit'
			};
			responseData.durationTime = requestTime - new Date().valueOf();
			if (ctx.request && ctx.request.header && ctx.request.header.responseData) {
				responseData.body = JSON.stringify(ctx.request.header.responseData);
			}
			ctx.logger.info(JSON.stringify(responseData))
		}
	};
};
