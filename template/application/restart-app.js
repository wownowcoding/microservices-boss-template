module.exports = app => {
  app.messenger.once('mobile-egg-restart', () => {
    try {
      if (Object.keys(app.config.currentMiddleware.list).filter(e => !!app.config.currentMiddleware.list[e]).length) {
        app.config.currentMiddleware.restartStatus = true;
      } else {
        app.config.currentMiddleware.restartStatus = false;
        process.exit(1);
      }
    } catch(error) {
      app.logger.info('app.messenger.once mobile-egg-restart error: ', error);
    }
  });
}