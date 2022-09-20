module.exports = app => {
  process.on('uncaughtException', (...args) => {
    try {
      console.log('uncaughtException: ', JSON.stringify(args, null, 2));
      app.logger.info('uncaughtException: ', JSON.stringify(args, null, 2));
    } catch(err) {
      try {
        console.log('uncaughtException1: ', args.toString());
        app.logger.info('uncaughtException1: ', args.toString());
      } catch(error) {
        try {
          console.log('uncaughtException2: ', args);
          app.logger.info('uncaughtException2: ', args);
        } catch(er) {}
      }
    }
  });
  process.on('exit', (...args) => {
    try {
      console.log('About to exit with args: ', JSON.stringify(args, null, 2));
      app.logger.info('About to exit with args: ', JSON.stringify(args, null, 2));
    } catch(err) {
      try {
        console.log('About to exit with args1: ', args.toString());
        app.logger.info('About to exit with args1: ', args.toString());
      } catch(error) {
        try {
          console.log('About to exit with args2: ', args);
          app.logger.info('About to exit with args2: ', args);
        } catch(er) {}
      }
    }
  });
};