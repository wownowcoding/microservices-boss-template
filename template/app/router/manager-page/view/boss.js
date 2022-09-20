/**
 * Boss 后台系统
 */
module.exports = app => {
  const { router, controller } = app;
  ['get', 'post'].forEach(e => {
    router[e](app.routeSplicing('/test-build-time'), controller.managerPage.view.boss.testBuildTime);
    router[e]('/actuator/health', controller.managerPage.view.boss.testBuildTime);
    router[e]('/actuator/prometheus', controller.managerPage.view.boss.testBuildTime);
    router[e](app.routeSplicing('/marketzone/enums'), controller.managerPage.view.boss.testEnums);
    router[e](app.routeSplicing('/test-log-path'), controller.managerPage.view.boss.testLogPath);
    router[e](app.routeSplicing('/test-apollo'), controller.managerPage.view.boss.testApollo);
    router[e](app.routeSplicing('/test-egg-start-time'), controller.managerPage.view.boss.testEggStartTime);
    router[e](app.routeSplicing('/set/language'), controller.managerPage.view.boss.setLanguage);
    router[e](app.routeSplicing('/send/notification'), controller.managerPage.view.boss.sendNotification);
    router[e](app.routeSplicing('/send/test-wss-key'), controller.managerPage.view.boss.testWebSocketKey);
    router[e](app.routeSplicing('/restart/apollo'), controller.managerPage.view.boss.testRestartApollo);
  });
  //  视图路由
  router.get([app.routeSplicing('*'), app.routeSplicing('/*')], controller.managerPage.view.boss.index);
};