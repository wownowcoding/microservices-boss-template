const path = require("path");
function resolve(dir) {
  return path.join(__dirname, "../../", dir);
}
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

module.exports = {
  /**
   * @description 干掉 prefetch 预防懒加载文件重复加载两次
   */
  deletePrefetch(config) {
    //  干掉 preload 和 prefetch 预防懒加载文件重复加载两次
    //  ['preload', 'prefetch']
    for (let i = config.plugins.length - 1; i >= 0; i--) {
      if (
        config.plugins &&
        config.plugins[i] &&
        config.plugins[i].options &&
        config.plugins[i].options.rel
      ) {
        if (["prefetch", 'preload'].indexOf(config.plugins[i].options.rel) !== -1) {
          config.plugins.splice(i, 1);
        }
      }
    }
  },
  setOutputName(config) {
    config.output.filename = `js/[name].${global.currentVersionDateNum}.js`;
    config.output.chunkFilename = `js/[name].${global.currentVersionDateNum}.js`;
    for (const rule of config.module.rules) {
      const ruleStr = JSON.stringify(rule);
      if (ruleStr.indexOf('[name]') !== -1) {
        if (Array.isArray(rule.use)) {
          for (let i = 0, len = rule.use.length; i < len; i++) {
            const u = rule.use[i];
            const ustr = JSON.stringify(u);
            if (ustr.indexOf('[name]') !== -1) {
              rule.use[i] = JSON.parse(ustr.replace(`[name].${global.currentVersionDateNum}`, `[name].${global.currentVersionDateNum}`))
            }
          }
        }
      }
    }
  },
  /**
   * @description 处理chunk
   * @param {Number} pageEntryLength 入口数,用于控制common合并js
   */
  getSplitChunks() {
    return {
      chunks: "all",
      // // 默认值是30kb
      minSize: 30000,
      // // 被多少模块共享
      // minChunks: 2,
      // // 所有异步请求不得超过5个
      maxAsyncRequests: 10,
      maxInitialRequests: 3,
      cacheGroups: {
        // 最基本的vue依赖
        vendor: {
          name: "vendor",
          priority: 10,
          reuseExistingChunk: true, // 去除重复依赖模块
          test: /[\\/]node_modules[\\/]/
        },
        // 根据入口数把公共的js合并到common
        commons: {
          name: "common",
          minChunks: 10,
          maxInitialRequests: 10,
          priority: 10,
          reuseExistingChunk: true, // 去除重复依赖模块
          minSize: 0 // 默认是30kb，minSize设置为0之后
          // 多次引用的utility1.js和utility2.js会被压缩到commons中
        },
        // 剩余的都进default
        index: {
          priority: -20,
          reuseExistingChunk: true, // 去除重复依赖模块
          name: "index",
          minChunks: Infinity
        }
      }
    };
  },
  /**
   * @description 小于 100 的图片才转换成 base64
   */
  resolveImgLoader(config) {
    for (let i = 0, len = config.module.rules.length; i < len; i++) {
      const ruleUse = config.module.rules[i].use;
      if (Array.isArray(ruleUse) && ruleUse.length) {
        for (let j = 0, jLen = ruleUse.length; j < jLen; j++) {
          const loader = ruleUse[j];
          if (loader.loader === "url-loader") {
            config.module.rules[i].use[j].options.limit = 100;
          }
        }
      }
    }
  },
  /**
   *
   * @description 多线程构建
   */
  threadLoader(config) {
    config.module.rules.push({
      test: /\.js|\.vue|\.json|\.less|\.styl$/,
      include: path.resolve(__dirname, "../../src"),
      use: [
        {
          loader: "thread-loader",
          // loaders with equal options will share worker pools
          options: {
            // the number of spawned workers, defaults to (number of cpus - 1) or
            // fallback to 1 when require('os').cpus() is undefined
            workers: require("os").cpus() * 10,
            // number of jobs a worker processes in parallel
            // defaults to 20
            workerParallelJobs: 50,
            // additional node.js arguments
            workerNodeArgs: ["--max-old-space-size=4096"],
            // Allow to respawn a dead worker pool
            // respawning slows down the entire compilation
            // and should be set to false for development
            poolRespawn: false,
            // timeout for killing the worker processes when idle
            // defaults to 500 (ms)
            // can be set to Infinity for watching builds to keep workers alive
            poolTimeout: 2000,
            // number of jobs the poll distributes to the workers
            // defaults to 200
            // decrease of less efficient but more fair distribution
            poolParallelJobs: 50,

            // name of the pool
            // can be used to create different pools with elsewise identical options
            name: "my-pool"
          }
        }
      ]
    });
  },
  /**
   * @description 构建告警配置
   */
  getPerformance(config) {
    return {
      hints: "warning",
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: assetFilename => false
    };
  },
  getResolve(config) {
    return {
      extensions: [".js", ".vue", ".json"],
      unsafeCache: true,
      alias: {
        "@": resolve("src"),
        style: resolve("src/style/")
      },
      plugins: [new DirectoryNamedWebpackPlugin()]
    };
  },
  //  样式注入
  setStylusLoaderOptions(config) {
    for (const oneOfItem of config.module.rules) {
      if (JSON.stringify(oneOfItem).indexOf("stylus-loader") !== -1) {
        for (const oneOf of oneOfItem.oneOf) {
          if (oneOf && Array.isArray(oneOf.use)) {
            for (let i = 0, len = oneOf.use.length; i < len; i++) {
              if (
                oneOf.use[i].loader &&
                oneOf.use[i].loader.indexOf("stylus-loader") !== -1 &&
                oneOf.use[i].options
              ) {
                oneOf.use[i].options.import = [
                  path.resolve(__dirname, "../../src/style/utils.styl")
                ];
                oneOf.use[i].options.paths = [
                  path.join(__dirname, "../../src/style"),
                  path.join(__dirname, "../../")
                ];
              }
            }
          }
        }
        break;
      }
    }
  }
};
