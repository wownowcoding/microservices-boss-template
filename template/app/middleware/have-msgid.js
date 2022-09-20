/**
 * 打印请求级别的日志
 */
const uuid = require('node-uuid')
module.exports = (options, app) => {
	return async function haveMsgid(ctx, next) {
		if (!ctx.request.header.msgid) {
			ctx.request.header.msgid = `mobile-boss-ssr${uuid.v1()}`.replace(/-/g, '');
		}
		app.config.currentMiddleware.list[ctx.request.header.msgid] = true;
		await next();
		if (!ctx.response.header.msgid) {
			ctx.response.header.msgid = `mobile-boss-ssr${uuid.v1()}`.replace(/-/g, '');
		}
		app.config.currentMiddleware.list[ctx.request.header.msgid] = undefined;
	};
};