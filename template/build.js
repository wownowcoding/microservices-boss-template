const path = require('path');
const fs = require('fs');
const execSyncBase = require('child_process').execSync;
const os = require('os');
const v8 = require('v8');

//  获取环境变量的参数
const argvConfig = {
  projectName: path.basename(__dirname),
  projectPath: __dirname
};
argvConfig.cachePath = path.resolve(argvConfig.projectPath, `../${argvConfig.projectName}@tmp`);
process.argv.map(e => {
  const __str = e.replace(/^-+/, '').split('=');
  return __str && __str.length > 1 && [__str[0], __str[1]] || '';
}).filter(e => !!e).forEach(e => {
  argvConfig[e[0]] = e[1]; 
})
//  缓存路径
const packageJsonPath = path.resolve(argvConfig.cachePath, `package.json`);
const allNodeModulesPath = path.resolve(argvConfig.cachePath, `allNodeModules`);
const productionNodeModulesPath = path.resolve(argvConfig.cachePath, `productionNodeModules`);

const cacheNodeModules = {
  packageJsonPath: path.resolve(argvConfig.cachePath, `cache/package.json`),
  allNodeModulesPath: path.resolve(argvConfig.cachePath, `cache/allNodeModules`),
  productionNodeModulesPath: path.resolve(argvConfig.cachePath, `cache/productionNodeModules`)
}
//  当前 package.json 路径
const currentPackageJsonPath = path.resolve(argvConfig.projectPath, './package.json');
const currentNodeModulesPath = path.resolve(argvConfig.projectPath, './node_modules');

const viewPath = path.resolve(argvConfig.projectPath, `app/view`);
const publicPath = path.resolve(argvConfig.projectPath, `app/public`);
const cacheViewPath = path.resolve(argvConfig.cachePath, `view`);
const cachePublicPath = path.resolve(argvConfig.cachePath, `public`);

//  按一定格式统一时间输出
const getCurrentTime = () => `[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date(new Date().valueOf() + 3600001))}]`;
//  覆盖性写入文件
const writeFileSync = (dataSourcePath, data) => fs.writeFileSync(dataSourcePath, data, { 'flag': 'w' });
//  用来记录是否有做版本修改
let isUpdatePackage = false;
//  构建完成后的中间件
const middleware = [require('./scripts/build/build_middleware/egg-script-delete-alinode')];
//  检测文件夹是否存在，不存在则创建
const mkdirFilesDir = (dirPath) => !fs.existsSync(dirPath) && fs.mkdirSync(dirPath);
const heapStatisticsEnum = {
  total_heap_size: '总堆大小',
  total_heap_size_executable: '总堆大小可执行文件',
  total_physical_size: '总物理大小',
  total_available_size: '总可用大小',
  used_heap_size: '使用的堆大小',
  heap_size_limit: '堆大小限制',
  malloced_memory: '已分配的内存',
  peak_malloced_memory: '分配的内存峰值',
  does_zap_garbage: '覆盖堆垃圾',
  number_of_native_contexts: '本机上下文数量',
  number_of_detached_contexts: '分离上下文数',
  code_and_metadata_size: '代码和元数据的大小',
  bytecode_and_metadata_size: '字节码和元数据大小',
  external_script_source_size: '外部脚本源大小',
  space_size: '空间大小',
  space_used_size: '空间使用大小',
  space_available_size: '可用空间大小',
  physical_space_size: '物理空间大小'
};
//  换算数据大小
const getRamSize = (data) => {
  if (data > 1073741824) {
    return `${(((((data / 1024).toFixed(3) - 0) / 1024).toFixed(3) - 0) / 1024).toFixed(3) - 0}GB`;
  }
  if (data > 1048576) {
    return `${(((data / 1024).toFixed(3) - 0) / 1024).toFixed(3) - 0}MB`;
  }
  if (data > 1024) {
    return `${(data / 1024).toFixed(3) - 0}KB`;
  }
  return `${data}`;
}
const getHeapStatistics = () => {
  const heapStatistics = Object.assign({}, {
    ...v8.getHeapStatistics(),
    ...v8.getHeapCodeStatistics()
  });
  const heapSpaceStatistics = v8.getHeapSpaceStatistics();
  const __strList = Object.keys(heapStatistics).map(e => `[${e}-${heapStatisticsEnum[e]}]: ${getRamSize(heapStatistics[e] - 0)}`).concat(heapSpaceStatistics.map(e => {
    let __str = `空间名[${e.space_name}]: `;
    __str += Object.keys(e).filter(q => q !== 'space_name').map(q => `(${q}-${heapStatisticsEnum[q]}[${getRamSize(e[q] - 0)}])`);
    return __str;
  }));
  return __strList;
}
const logs = [];
//  输出控制台
const sayConsole = (msg, data = '') => {
  const currentLog = {
    msg,
    data,
    currentTime: getCurrentTime(),
    other: getHeapStatistics()
  };
  console.log(currentLog.msg, currentLog.data);
  console.log(currentLog.currentTime);
  logs.push(currentLog);
}
const execSync = (str, option = {}) => {
  let execResult;
  const { isShowResult = true } = option;
  sayConsole(`============================ shell: ${str} ============================`)
  try {
    execResult = execSyncBase(str);
    !!isShowResult && sayConsole(execResult.toString())
    return execResult.toString();
  } catch (err) {
    execResult && console.log('execResult: ', execResult);
    return {
      error: err
    }
  }
}
//  等待默认 0.5 秒并且输出控制台
const wait = (__time = 0.5) => new Promise(resolve => {
  sayConsole(`装完依赖，等待 ${__time} 秒~`);
  const __timeout = setTimeout(() => {
    clearTimeout(__timeout)
    resolve();
  }, __time * 1000);
})
//  清空文件夹
const deleteFolder = __path => {
  if (fs.existsSync(__path)) {
    fs.readdirSync(__path).forEach(file => {
      const curPath = path.resolve(__path, file);
      fs.statSync(curPath).isDirectory() ? deleteFolder(curPath) : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(__path);
  }
};
sayConsole(`\n\n============================ 开始初始化 ============================`)
execSync('node -v');
sayConsole('\n\ncpu: ', os.cpus().map(e => `Cpu: ${e.model}, 频率为: ${getRamSize(e.speed).replace(/KB/g, 'GB')}, 其它耗时(ms) -> ${Object.keys(e.times).map(q => `${q}-${e.times[q]}`).join(',')}`));
//  删掉以往的目录
// execSync(`rm -rf ${path.resolve(argvConfig.projectPath, `../${argvConfig.projectName}-cache`)}`);
//  确保缓存文件夹存在
mkdirFilesDir(argvConfig.cachePath)
// sayConsole(`============================ 切到 taobao 源 ============================`)
//  安装 nrm 管理源
execSync('npm config set registry https://registry.npmjs.org/')
!fs.existsSync(path.join(argvConfig.cachePath, 'cache')) && fs.mkdirSync(path.join(argvConfig.cachePath, 'cache'))
//  检查缓存
if (!fs.existsSync(allNodeModulesPath) && fs.existsSync(cacheNodeModules.allNodeModulesPath)) {
  execSync(`cp -rf ${cacheNodeModules.allNodeModulesPath} ${allNodeModulesPath}`)
}
if (fs.existsSync(allNodeModulesPath) && !fs.existsSync(cacheNodeModules.allNodeModulesPath)) {
  execSync(`cp -rf ${allNodeModulesPath} ${cacheNodeModules.allNodeModulesPath}`)
}

if (!fs.existsSync(packageJsonPath) && fs.existsSync(cacheNodeModules.packageJsonPath)) {
  execSync(`cp -rf ${cacheNodeModules.packageJsonPath} ${packageJsonPath}`)
}
if (fs.existsSync(packageJsonPath) && !fs.existsSync(cacheNodeModules.packageJsonPath)) {
  execSync(`cp -rf ${packageJsonPath} ${cacheNodeModules.packageJsonPath}`)
}

if (!fs.existsSync(productionNodeModulesPath) && fs.existsSync(cacheNodeModules.productionNodeModulesPath)) {
  execSync(`cp -rf ${cacheNodeModules.productionNodeModulesPath} ${productionNodeModulesPath}`)
}
if (fs.existsSync(productionNodeModulesPath) && !fs.existsSync(cacheNodeModules.productionNodeModulesPath)) {
  execSync(`cp -rf ${productionNodeModulesPath} ${cacheNodeModules.productionNodeModulesPath}`)
}
//  清除缓存且重新开始下载所有的依赖并且缓存
const cacheDevDependencies = async () => {
  execSync(`rm -rf ${path.resolve(argvConfig.projectPath, './.npmrc')}`)

  sayConsole('\n开始清理缓存的依赖!');
  await Promise.all([packageJsonPath, allNodeModulesPath, productionNodeModulesPath, currentNodeModulesPath].map(e => new Promise(resolve => {
    const __timeout = setTimeout(() => {
      clearTimeout(__timeout)
      execSync(`rm -rf ${e}`);
      resolve();
    }, 0);
  })));

  sayConsole('\n开始安装所有依赖!')
  //  安装所有依赖
  execSync(`npm i  --unsafe-perm`, {
    isShowResult: false
  });
  await wait();
  await wait();
  sayConsole('\n缓存依赖 npm i 的所有版本!')
  execSync(`rm -rf ${cacheNodeModules.allNodeModulesPath}`)
  execSync(`cp -rf ${currentNodeModulesPath} ${cacheNodeModules.allNodeModulesPath}`)
  execSync(`mv -f ${currentNodeModulesPath} ${allNodeModulesPath}`);
  execSync(`rm -rf ${cacheNodeModules.packageJsonPath}`)
  execSync(`cp -rf ${currentPackageJsonPath} ${cacheNodeModules.packageJsonPath}`)
  execSync(`cp -rf ${currentPackageJsonPath} ${packageJsonPath}`);

  execSync('npm install --production  --unsafe-perm', {
    isShowResult: false
  });
  await wait();

  if (middleware && middleware.length) {
    for (const __middleware of middleware) {
      if (__middleware && __middleware.enable && typeof __middleware.exec === 'function') {
        sayConsole(`\n============================ after middleware ${__middleware.name} ============================`)
        await __middleware.exec(sayConsole);
        sayConsole(`============================ ${__middleware.name} success ============================`)
      }
    }
  }
  await wait();
  sayConsole('\n缓存依赖 --production 版本!')
  execSync(`rm -rf ${cacheNodeModules.productionNodeModulesPath}`)
  execSync(`cp -rf ${currentNodeModulesPath} ${cacheNodeModules.productionNodeModulesPath}`)
  execSync(`mv -f ${currentNodeModulesPath} ${productionNodeModulesPath}`);
  await wait();

  //  备份完成
  sayConsole('\ndependencies 依赖安装完成，开始整合生产项目');
}
const buildMobileWebSSR = async () => {
  //  从缓存里移动所有依赖过来
  execSync(`mv -f ${allNodeModulesPath} ${currentNodeModulesPath}`);
  await wait();
  if (!argvConfig.noBuile || !!(!fs.existsSync(cacheViewPath) || !fs.existsSync(cachePublicPath))) {
    const buildCode = `npm run build_${argvConfig.env}`;
    sayConsole(`\n============================ ${buildCode} ============================`)
    const buildRes = execSync(buildCode, {
      isShowResult: false
    });
    if (typeof buildRes === 'object') {
      const newBuileRes = execSync(buildCode, {
        isShowResult: false
      });
      if (typeof newBuileRes === 'object') {
        throw new Error(`build error!`);
      }
    }
    execSync(`rm -rf ${cacheViewPath}`);
    execSync(`rm -rf ${cachePublicPath}`);
  } else {
    execSync(`rm -rf ${viewPath}`);
    execSync(`rm -rf ${publicPath}`);
    execSync(`cp -rf ${cacheViewPath} ${viewPath}`);
    execSync(`cp -rf ${cachePublicPath} ${publicPath}`);
  }
  //  用完了所有缓存，放回原位
  execSync(`mv -f ${currentNodeModulesPath} ${allNodeModulesPath}`);
  await wait();

  sayConsole('\n============================ mv --production ============================')
  execSync(`mv -f ${productionNodeModulesPath} ${currentNodeModulesPath}`);

  //  将文件夹都复制以后删除不必要的文件夹
  for (const _file of ['logs', 'run', 'typings', 'private']) {
    const filePath = path.resolve(argvConfig.projectPath, _file);
    if (fs.existsSync(filePath)) {
      execSync(`rm -rf ${filePath}`);
    }
  }
  for (const __file of fs.readdirSync(path.resolve(argvConfig.projectPath, 'src'))) {
    if (__file !== 'config.js') {
      execSync(`rm -rf ${path.resolve(argvConfig.projectPath, 'src', __file)}`);
    }
  }
  writeFileSync(path.resolve(__dirname, 'argvConfig.js'), `module.exports = ${JSON.stringify(argvConfig, undefined, 2)}`)
  writeFileSync(path.resolve(__dirname, 'build-logs.js'), `module.exports = ${JSON.stringify(logs, undefined, 2)}`)
  sayConsole('\n============================ 构建完成，接下来开始压缩 Zip 并且压缩 Docker! ============================');
}

(async () => {
  //  开始检测包是否有更新
  isUpdatePackage = !(fs.existsSync(packageJsonPath) && fs.existsSync(allNodeModulesPath) && fs.existsSync(productionNodeModulesPath));
  //  确保缓存文件存在的情况下，执行版本对比操作
  if (!isUpdatePackage) {
    sayConsole('\n缓存文件存在，开始对比依赖版本!')
    //  读取 package.json 的 dependencies 和 devDependencies
    const { dependencies: oldDependencies, devDependencies: oldDevDependencies } = require(packageJsonPath);
    const { dependencies, devDependencies } = require(currentPackageJsonPath)

    //  将 dependencies 和 devDependencies 整合一起对比是否有变更
    const oldPackageConfig = Object.assign({}, oldDevDependencies, oldDependencies);
    const packageConfig = Object.assign({}, devDependencies, dependencies);

    //  将所有依赖名称组合成数组，快速查看有没有修改
    const oldPackageList = Object.keys(oldPackageConfig).map(e => `${e}|${oldPackageConfig[e]}`);
    const packageList = Object.keys(packageConfig).map(e => `${e}|${packageConfig[e]}`);
    //  对比插件数
    isUpdatePackage = oldPackageList.length !== packageList.length;
    if (isUpdatePackage) {
      sayConsole('\n本次 build 依赖有作新增或删减操作');
    } else {
      //  遍历数组对比版本
      for (const __dependencie of oldPackageList) {
        const __dependencieIndex = packageList.indexOf(__dependencie);
        if (__dependencieIndex === -1) {
          isUpdatePackage = true;
          sayConsole(`\n查询到 old Package List 版本不一致的依赖 ${__dependencie}`);
          break;
        }
      }
      if (!isUpdatePackage) {
        for (const __dependencie of packageList) {
          const __dependencieIndex = oldPackageList.indexOf(__dependencie);
          if (__dependencieIndex === -1) {
            isUpdatePackage = true;
            sayConsole(`\n查询到 package List 版本不一致的依赖 ${__dependencie}`);
            break;
          }
        }
      }
      isUpdatePackage && sayConsole('\n本次构建无更新插件，开始构建业务代码!')
    }
  } else {
    sayConsole('\n缓存文件不存在!')
  }
  //  如果有更新，先安装依赖
  if (isUpdatePackage) {
    await cacheDevDependencies();
  }

  await buildMobileWebSSR();

  writeFileSync(path.resolve(__dirname, 'build-time.js'), `module.exports = {
    buildTime: '${getCurrentTime()}'
  }`)
})();