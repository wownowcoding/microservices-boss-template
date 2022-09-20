module.exports = app => {
  app.bossSocket = [];

  //  推送给所有
  app.messenger.on('send-notification', params => {
    app.bossSocket.forEach(socket => {
      try {
        params.authentication = undefined;
        socket.emit('notification', params);
      } catch(error) {
        app.logger.error('send-notification error: ', error);
      }
    });
  });
  //  推送给某个操作员
  app.messenger.on('send-operator-notification', params => {
    app.bossSocket.forEach(socket => {
      try {
        if (socket.bossUser.operatorNo === params.operatorNo) {
          params.authentication = undefined;
          socket.emit('notification', params);
        }
      } catch(error) {
        app.logger.error('send-operator-notification error: ', error);
      }
    });
  });
  //  推送到某个角色
  app.messenger.on('send-role-notification', params => {
    app.bossSocket.forEach(socket => {
      try {
        if (socket.bossUser.roleNo === params.roleNo) {
          params.authentication = undefined;
          socket.emit('notification', params);
        }
      } catch(error) {
        app.logger.error('send-role-notification error: ', error);
      }
    });
  });
  //  批量角色号推送
  app.messenger.on('send-roles-notification', params => {
    app.bossSocket.forEach(socket => {
      try {
        if (params.roleNos.indexOf(socket.bossUser.roleNo) !== -1) {
          params.authentication = undefined;
          socket.emit('notification', params);
        }
      } catch(error) {
        app.logger.error('send-roles-notification error: ', error);
      }
    });
  });
}