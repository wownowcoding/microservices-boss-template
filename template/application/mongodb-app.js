module.exports = app => {
  const __timeout = setTimeout(async () => {
    clearTimeout(__timeout);
    //  创建链接
    const ctx = app.createAnonymousContext();
    await ctx.service.mongodb.mongodb.connectMongodb();
  }, 10);
};