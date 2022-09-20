/**
 * Boss 后台系统
 */
 module.exports = app => {
  const { router, controller } = app;
  ['get', 'post'].forEach(e => {
    router[e]([app.routeSplicing('/boss-api/upload-assets'), `/upload-assets`], controller.managerPage.apis.boss.uploadAssets);
    router[e]([app.routeSplicing('/boss-api/wownow-upload-assets'), `/wownow-upload-assets`], controller.managerPage.apis.boss.uploadWownowAssets);
    router[e]([app.routeSplicing('/boss-api/upload')], controller.managerPage.apis.boss.uploadFile);
    router[e]([app.routeSplicing('/boss-api/batch')], controller.managerPage.apis.boss.batchConvertToSendV1);
    router[e]([app.routeSplicing('/boss-api')], controller.managerPage.apis.boss.convertToSendV1);
  });
};