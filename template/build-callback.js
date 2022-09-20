const path = require('path');
const execSyncBase = require('child_process').execSync;

//  获取环境变量的参数
const argvConfig = require('./argvConfig');
//  输出控制台
const sayConsole = (msg, data = '') => {
  console.log(msg, data);
  console.log(`[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 19).replace('T', ' '))(new Date(new Date().valueOf() + 3600001))}]`);
}
const execSync = (str) => {
  sayConsole(`\n============================ shell: ${str} ============================`)
  try {
    const execResultStr = execSyncBase(str).toString()
    sayConsole(execResultStr)
    return execResultStr;
  } catch (err) {
    return {
      error: err
    }
  }
}
sayConsole(`\n============================ 执行构建回调 ============================`)
//  压缩完成后，将所有需要缓存的挪回去缓存位置
Promise.all([{
  dataSourcePath: path.resolve(argvConfig.projectPath, `app/view`),
  target: path.resolve(argvConfig.cachePath, `view`)
}, {
  dataSourcePath: path.resolve(argvConfig.projectPath, `app/public`),
  target: path.resolve(argvConfig.cachePath, `public`)
}, {
  dataSourcePath: path.resolve(argvConfig.projectPath, './node_modules'),
  target: path.resolve(argvConfig.cachePath, `productionNodeModules`)
}].map(e => new Promise(resolve => execSync(`mv -f ${e.dataSourcePath} ${e.target}`))));