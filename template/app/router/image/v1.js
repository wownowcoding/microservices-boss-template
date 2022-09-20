module.exports = app => {
  const { router, controller } = app;
  ['get', 'post'].forEach(e => {
    router[e](app.routeSplicing('/:img/g'), controller.image.v1.get)
  })
};