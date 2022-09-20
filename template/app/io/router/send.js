module.exports = (io, app) => {
  const routePrefix = app.routePrefix('/send');

  io.route(routePrefix, io.controller.send.index);
  io.of(app.routeSplicing('/send')).route(routePrefix, io.controller.send.index);
}