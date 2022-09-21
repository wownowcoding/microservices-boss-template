const { merge } = require('webpack-merge')
const path = require('path');
const utils = require('../src/utils/build');
const { prefix } = require('../prefix');

global.currentVersionDateNum = `${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date(new Date()))}`.replace(/[-\s:.]/g, '');

module.exports = defaultConfig => {
  const config = merge({
    publicPath: `${prefix && `/${prefix}` || ''}/public/dist`,
    outputDir: path.resolve('/app/public/dist'),
    pages: {
      index: {
        filename: path.resolve(__dirname, `./app/view/index.tpl`),
        template: 'index.ejs',
      }
    }
  }, defaultConfig)


  const defaultConfigureWebpack = defaultConfig.configureWebpack

  config.configureWebpack = webpackConfig => {
    webpackConfig = merge(webpackConfig, defaultConfigureWebpack)
    utils.setOutputName(webpackConfig);
    //  小于 100 的图片才转换成 base64
    utils.resolveImgLoader(webpackConfig);
  }

  config.chainWebpack = webpackConfig => {
    //  干掉 prefetch preload 预防懒加载文件重复加载两次
    webpackConfig.plugins.delete("prefetch")
    webpackConfig.plugins.delete("preload")
    webpackConfig.output.filename(`js/[name].${global.currentVersionDateNum}.js`)
    webpackConfig.output.chunkFilename(`js/[name].${global.currentVersionDateNum}.js`)

    webpackConfig
      .plugin('extract-css')
      .tap(options => {
        options[0].filename = `css/[name].${global.currentVersionDateNum}.css`;
        options[0].chunkFilename = `css/[name].${global.currentVersionDateNum}.css`;
        return options
      });
  }
  return config
}