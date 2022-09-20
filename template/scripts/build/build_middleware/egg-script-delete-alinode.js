/**
 * egg-script 启动时会自动在 $home 路径下建立 logs/alinode 文件夹，过滤将这段代码删了
 */
const fs = require('fs');
const path = require('path');
let isFor = true;
const readDirSync = async (__path) => {
  if (fs.existsSync(__path) && isFor) {
    const files = fs.readdirSync(__path);
    for (const __file of files) {
      if (__file.indexOf('node_modules') === -1) {
        const __filePath = path.resolve(__path, __file);
        if (!fs.statSync(__filePath).isDirectory()) {
          const data = fs.readFileSync(__filePath, 'utf-8');
          if (data.indexOf(`env.NODE_LOG_DIR || path.join(logDir, 'alinode')`) !== -1) {
            sayConsole(`\n============================ 修改 egg-scripts 强制在 $HOME 里建 logs/alinode 文件夹代码 ============================`)
            sayConsole(`============================ ${__filePath} ============================`)
            //  正则替换这句代码
            const newCode = data.replace(
              `env.NODE_LOG_DIR || path.join(logDir, 'alinode')`,
              `argv.alinode || env.NODE_LOG_DIR || path.join(logDir, 'alinode');env.__argv = JSON.stringify(argv);`
            );
            await new Promise(resolve => {
              fs.writeFile(__filePath, newCode, {
                flag: 'w',
                encoding: 'utf-8'
              }, () => resolve());
            });
            isFor = false;
            return isFor;
          }
        } else {
          readDirSync(__filePath);
        }
      }
    }
  }
}
const deleteAlinodeLogs = async (__sayConsole) => {
  sayConsole = __sayConsole;
  await readDirSync(path.resolve(__dirname, `../../../node_modules/egg-scripts`));
}
module.exports = {
  exec: deleteAlinodeLogs,
  name: '重置 egg-scripts 在系统对象 $HOME 里建立 /logs/alinode 文件夹代码',
  enable: true
};