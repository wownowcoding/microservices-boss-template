/**
 * Boss 后台系统
 */
module.exports = app => {
  const { router, controller } = app;
  ['get', 'post'].forEach(e => {
    router[e](app.routeSplicing('/api/order/detail'), controller.composition.order.order.detali)
    router[e](app.routeSplicing('/api/order/go-composition-path'), controller.composition.order.order.goCompositionPath)
    router[e](app.routeSplicing('/api/order/go-composition-ip'), controller.composition.order.order.getCompositionIP)
    router[e](app.routeSplicing('/api/order/go-boss-egg-config'), controller.composition.order.order.getBossEggConfig)
    router[e](app.routeSplicing('/api/order/test-copy'), controller.composition.order.order.testCopy)
    router[e](app.routeSplicing('/api/order/get-all-enum'), controller.composition.order.order.getAllEnum);
  })
};