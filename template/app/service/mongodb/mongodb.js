const mongodb = require('mongodb');
const { MongoClient } = mongodb;
const connectMongodb = (url, options) => new Promise(resolve => MongoClient.connect(url, options, (error, client) => resolve({
  ...mongodb,
  error,
  client
})));
module.exports = app => class MongodbService extends app.Service {
  async connectMongodb() {
    try {
      const mongodbConnect = await connectMongodb(app.config.mongoConfig.url, app.config.mongoConfig.options);
      if (mongodbConnect.error) {
        this.ctx.logger.error('mongodbconnect app error: ', mongodbConnect.error);
        return;
      }
      this.app.mongodb = mongodbConnect;
      this.app.mongodb.app = this.app;
    } catch(error) {
      this.ctx.logger.error('mongodbconnect try catch app error: ', error);
    }
  }
}