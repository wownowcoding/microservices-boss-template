const path = require("path");
const webpack = require('webpack')
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const ModuleFederationPlugin = require('../module-federation')
const target = 'https://boss-sit.lifekh.com';

module.exports = {
  configureWebpack: {
    plugins: [
      ModuleFederationPlugin,
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],
    optimization: { splitChunks: false },
    performance: {
      hints: "warning",
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: assetFilename => false
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      unsafeCache: true,
      alias: {
        "@": path.resolve("src"),
        style: path.resolve("src/style/")
      },
      plugins: [new DirectoryNamedWebpackPlugin()],
      fallback: {
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
    },
    module: {
      unknownContextCritical: false,
      exprContextCritical: false
    }
  },
  pages: {
    index: {
      entry: 'src/index.js',
      favicon: path.resolve(__dirname, '../favicon.ico'),
      chunks: ['vendor', 'common', 'index'],
      hash: true
    }
  },
  devServer: {
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
      },
      stylus: {
        options: {
          import: [path.resolve(__dirname, "../../src/style/utils.styl")],
          paths: [
            path.join(__dirname, "../../src/style"),
            path.join(__dirname, "../../")
          ]
        }
      }
    }
  },
}