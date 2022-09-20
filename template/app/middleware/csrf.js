/**
 * 生成 csrf key
 */
const uuid = require('node-uuid')
const crypto = require('crypto');
module.exports = (options, app) => {
	return async function logger(ctx, next) {
    const filterUrls = ['/boss/boss-api/upload', '/boss-api/upload-assets', '/boss-api/wownow-upload-assets'];
    const isFilter = !(filterUrls.filter(e => ctx.request.url.indexOf(e) === -1).length);
    if (ctx.request) {
      if (ctx.request.url.indexOf('/boss/boss-api') !== -1 && isFilter) {
        let isAllow = false;
        const scenes = ctx.cookies.get('scenes');
        const querycsrfKey = ctx.request.header['dark-flower'];
        if (scenes && querycsrfKey) {
          const md5 = crypto.createHash('md5');
          md5.update(scenes + ctx.service.utilService.jsCrypto.CryptoJSKeys);
          const md5Key = md5.digest('hex');
          isAllow = md5Key === querycsrfKey;
        }
        if (!isAllow) {
          ctx.status = 404;
          ctx.body = {
            message: 'Forbidden'
          };
          return;
        }
      }
		}
		await next();
		if (ctx.response) {
      if (ctx.request.url.indexOf('/boss/boss-api') === -1 && isFilter) {
        const csrfKey = `${new Date().valueOf()}${uuid.v1()}`.replace(/-/g, '');
        const md5 = crypto.createHash('md5');
				md5.update(csrfKey);
				const md5Key = md5.digest('hex');
        ctx.cookies.set('scenes', md5Key, {
          httpOnly: false
        })
      }
    }
	};
};