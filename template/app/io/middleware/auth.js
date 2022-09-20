module.exports = () => {
  return async (ctx, next) => {
    let user;
    try {
      user = JSON.parse(decodeURIComponent(ctx.request.query.user))
      for (let i = 0, len = ctx.app.bossSocket.length; i < len; i++) {
        if (ctx.app.bossSocket[i].bossUser.loginName === user.loginName) {
          ctx.app.bossSocket.splice(i, 1);
          break;
        }
      }
      const userKeys = Object.keys(user);
      const checkKeys = userKeys
        .filter(e => !(userKeys.indexOf(e) !== -1 && !!user[e]));
      if (!checkKeys.length) {
        ctx.socket.bossUser = user;
        ctx.app.bossSocket.push(ctx.socket);
      } else {
        ctx.socket.emit('close-boss-socket');
      }
    } catch (error) {
      ctx.logger.error('connect socket error: ', error);
    }
    await next();
    if (ctx.app.bossSocket.length && ctx.socket.bossUser) {
      let deleteIndex;
      for (let i = 0, len = ctx.app.bossSocket.length; i < len; i++) {
        if (ctx.app.bossSocket[i].bossUser.loginName == ctx.socket.bossUser.loginName) {
          deleteIndex = i;
          break;
        }
      }
      if (deleteIndex !== undefined) {
        ctx.app.bossSocket.splice(deleteIndex, 1);
      }
    }
  };
};
