import Store from '@/utils/store';
export default class BossSocket {
  constructor() {
    if (!io) {
      throw '未引入 socket.io!'
    }
    //  socket 类
    this.WebSocket = WebSocket;
    //  io 对象
    this.io = io;
    //  域名前缀
    this.preFix = Vue.prototype?.ssr?.preFix ?? 'boss';
    //  socket url
    this.wsUrl = `${window.location.origin}${this.preFix && '/' + this.preFix || ''}/send`;
    // this.wsUrl = `http://localhost:7001${this.preFix && '/' + this.preFix || ''}/send`;
    //  获取登录信息
    this.user = {
      lang: Store.loadObject('lang') || '',
      loginName: Store.loadObject('loginName') || '',
      roleName: Store.loadObject('roleName') || '',
      operatorNo: Store.loadObject('operatorNo') || '',
      roleNo: Store.loadObject('roleNo') || ''
    };
    const __timeout = setTimeout(() => {
      clearTimeout(__timeout);
      //  创建 socket 对象
      this.socket = this.io(this.wsUrl, {
        path: `${this.preFix && '/' + this.preFix || ''}/socket.io`,
        transports: ['websocket'],
        secure: true,
        query: {
          user: encodeURIComponent(JSON.stringify(this.user))
        }
      })
      //  初始化连接状态
      this.connectStatus = 'pending';
      //  开始连接
      this.connect();
      this.start();
    }, 10000);
  }
  //  监听事件
  onEvent(name, callback) {
    this.socket.on(name, callback);
  }
  //  发送事件
  sendEvent(name, params) {
    const sendName = `${this.preFix || ''}${name}`;
    const queryParams = {
      bossSocketHeader: {
        user: this.user
      },
      params
    };
    this.socket.emit(sendName, queryParams);
  }
  //  连接 socket 回调函数
  connect() {
    this.onEvent('connect', params => {
      console.log('\n\nparams: ', params);
      this.connectStatus = 'success';
    });
  }
  notify(params = {}) {
    const __isNotification = Store.loadObject('isNotification')
    if (__isNotification) {
      const { title = 'Notification', body = 'Tips', icon = require('@/assets/vipay_logo.png') } = params;
      if (window.webkitNotifications) {
        console.log('webkitNotifications!!');
        //  chrome老版本
        if ((window.webkitNotifications?.checkPermission() - 0) === 0) {
          console.log('webkitNotifications createNotification!!');
          const notif = window?.webkitNotifications?.createNotification(icon, title, body) ?? undefined;
          if (notif) {
            const noop = () => { };
            notif.display = noop;
            notif.onerror = noop;
            notif.onclose = noop;
            notif.onclick = function () {
              this.cancel();
            }
            notif.replaceId = 'Meteoric';
            notif.show();
          }
        } else {
          alert(body);
        }
      } else if ('Notification' in window) {
        console.log('Notification!!');
        if (Notification && Notification.permission === 'granted') {
          console.log(`Notification.permission === 'granted'`);
          this.sendNotification(title, body);
        } else if (Notification && Notification.permission !== 'granted') {
          console.log(`Notification.requestPermission`);
          Notification.requestPermission(status => {
            console.log(`Notification.requestPermission status: `, status);
            if (Notification.permission !== status) {
              Notification.permission = status;
              this.sendNotification(title, body);
            }
          });
          this.sendNotification(title, body);
        }
      }
    }
  }
  sendNotification(title = 'Notification', msg = '') {
    new Notification(title, {
      icon: require('@/assets/vipay_logo.png'),
      body: msg,
      requireInteraction: true
    });
  }
  start() {
    console.log('start!!!')
    this.onEvent('connect-callback', params => {
      console.log('Web Socket connect-callback params: ', params);
    });
    this.onEvent('notification', params => {
      console.log('Web Socket Notification params: ', params);
      if (params.body) {
        this.notify({
          body: params.body,
          title: params.title
        });
        return;
      }
      if (params.event === 'refresh-boss-language') {
        window.loadLanguageAsync();
        return;
      }
    });
    this.onEvent('close-boss-socket', params => {
      console.log('close-boss-socket: ', params)
      this.socket.close();
    });
  }
};
