const fs = require('fs');
const path = require('path')
let configServerUrl = '';
for (const argv of process.argv) {
  if (argv.indexOf('--src') !== -1) {
    configServerUrl = argv.replace('--src=', '');
  }
}
if (configServerUrl) {
  fs.writeFileSync(path.resolve(__dirname, 'config/config.apollo.js'), `module.exports = {
    configServerUrl: '${configServerUrl}',
    appId: 'mobile-boss-ssr', // 配置中心命名和项目名称保持一致,
    clusterName: 'default',
    namespaceName: ['application', 'goframework.common']
  }`, { 'flag': 'w' })
} else {
    throw error('apollo src not find!')
}
require('egg-apollos').init(require('path').join(__dirname, 'config/config.apollo.js'));