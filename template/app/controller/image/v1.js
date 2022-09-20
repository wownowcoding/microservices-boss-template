const https = require('https');
module.exports = class OrderDetailController extends require('egg').Controller {
  constructor(...args) {
    super(...args);
    this.contentTypeMap = {
      css: 'text/css',
      gif: 'image/gif',
      html: 'text/html',
      ico: 'image/x-icon',
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      js: 'text/javascript',
      json: 'application/json',
      pdf: 'application/pdf',
      png: 'image/png',
      svg: 'image/svg+xml',
      swf: 'application/x-shockwave-flash',
      tiff: 'image/tiff',
      txt: 'text/plain',
      wav: 'audio/x-wav',
      wma: 'audio/x-ms-wma',
      wmv: 'video/x-ms-wmv',
      xml: 'text/xml'
    }
  }
  async get() {
    const imgUrl = decodeURIComponent(this.ctx.params.img);
    const imgUrlFileTypeList = imgUrl.split('.');
    const getMap = this.contentTypeMap[imgUrlFileTypeList[imgUrlFileTypeList.length - 1]];
    const req = await new Promise((re, rj) => {
      const block = [];
      https.get(imgUrl, res => {
        res.on('data', (d) => block.push(d));
        res.on('end', () => {
          re({ data: Buffer.concat(block) });
        });
        res.on('error', err => rj({ error: err }))
      })
    });
    if (getMap && req.data) {
      this.ctx.response.set('content-type', getMap);
      this.ctx.body = req.data;
      return;
    }
    this.ctx.body = req.error;
  }
}