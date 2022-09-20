'use strict'
const path = require('path')
const fs = require('fs');
const utils = require('./src/utils/build');
const webpack = require('webpack')
const ModuleFederationPlugin = require('./module-federation')
const { prefix } = require('./prefix');
const target = 'https://boss-sit.lifekh.com';
// const target = 'http://172.16.20.137:8081';

global.currentVersionDateNum = `${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date(new Date()))}`.replace(/[-\s:.]/g, '');

const resolve = dir => path.join(__dirname, dir)
//  删除文件夹
const deleteFolder = (viewPath) => {
  if (fs.existsSync(viewPath)) {
    if (fs.statSync(viewPath).isDirectory()) {
      fs.readdirSync(viewPath).forEach(file => {
        const curPath = path.resolve(viewPath, file);
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(viewPath);
    } else {
      fs.unlinkSync(viewPath);
    }
  }
}
//  删除 view 文件夹
deleteFolder(path.resolve(__dirname, './view'));
fs.mkdirSync(path.resolve(__dirname, './view'));
//  是否是开发模式
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  require('./scripts/build/init')();
}
const vueConfig = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/index.js',
      template: isDev ? 'local-index.ejs' : 'index.ejs',
      filename: isDev ? 'index.html' : path.resolve(__dirname, `./view/index.tpl`),
      favicon: path.resolve(__dirname, 'favicon.ico'),
      chunks: ['vendor', 'common', 'index'],
      hash: true
    }
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        },
        headers: {
          Referer: target
        }
      },
      '/boss/boss-api': {
        target,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/boss/boss-api': '/boss/boss-api'
        },
        headers: {
          Referer: target
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  indexPath: path.resolve(__dirname, './view'),
  configureWebpack: config => {
    if (isDev) {
      //  开发模式下
      config.devtool = 'eval-cheap-module-source-map'
      // 优化构建速度
      // https://www.cnblogs.com/skychx/p/webpack-dllplugin.html
      // TODO 后续要考虑怎么自动清缓存
      // config.plugins.unshift(new HardSourceWebpackPlugin({ cacheDirectory: path.resolve(__dirname, `./hard-source-cache/hard-source/[confighash]`) }));
    } else {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = false;
      utils.setOutputName(config);
    }

    if (process.argv.indexOf('npm_config_report=true') !== -1) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    if (isDev) {
      let isBuildPart = process.env.buildPart || process.argv.indexOf('buildPart') !== -1
      if (isBuildPart) {
        const { ineedCompileDirectoryPlugin } = require('./scripts/ineedCompileDirectoryPlugin')
        config.plugins.push(new ineedCompileDirectoryPlugin())
      }
    }
    // 减少Moment.js打包体积
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }))

    // 配置远程模块
    config.plugins.push(ModuleFederationPlugin)



    // 构建告警配置
    config.performance = utils.getPerformance(config);
    //  小于 100 的图片才转换成 base64
    utils.resolveImgLoader(config);

    // 处理 chunk
    config.optimization.splitChunks = false
    // config.optimization.splitChunks = utils.getSplitChunks(1);

    //  alias 配置, DirectoryNamedWebpackPlugin 让路径简写同名文件
    config.resolve = utils.getResolve();
    config.module.unknownContextCritical = false;
    config.module.exprContextCritical = false;
    config.resolve.fallback = {
      tls: false,
      net: false,
      fs: false,
      assert: false,
      stream: false,
      util: false,
      crypto: false,
      url: false,
      querystring: false,
      https: false,
      http: false,
      constants: false,
      path: false,
      zlib: false,
      http: false,
    }
    config.externals = {
      'vue': 'Vue',
      'iview': 'iview',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
    }
    //  干掉 prefetch 预防懒加载文件重复加载两次
    utils.deletePrefetch(config);
    //  注入 stylus-loader 全局样式变量
    utils.setStylusLoaderOptions(config);
  },
  chainWebpack: config => {
    if (process.env.use_analyzer) {
      // 分析
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    if (!isDev) {
      config
        .plugin('extract-css')
        .tap(options => {
          options[0].filename = `css/[name].${global.currentVersionDateNum}.css`;
          options[0].chunkFilename = `css/[name].${global.currentVersionDateNum}.css`;
          return options
        });
    }
  }
}

if (!isDev) {
  vueConfig.publicPath = `${prefix && `/${prefix}` || ''}/public/dist`;
  vueConfig.outputDir = resolve('/public/dist');
} else {
  vueConfig.publicPath = `http://localhost:8001/`;
}
module.exports = vueConfig;
