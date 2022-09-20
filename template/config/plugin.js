/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  io: {
    enable: true,
    package: 'egg-socket.io'
  },
  compress: {
    enable: true,
    package: 'egg-compress-br'
  },
  kubernetesPod: {
    enable: true,
    package: '@elephant-wownow/kubernetes-pod'
  }
};