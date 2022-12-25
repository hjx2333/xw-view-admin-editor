const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const monacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 主环境
const nodeEnv = process.env.NODE_ENV

// 项目名称
const appName = 'xw-view'
// 开发环境启动本地服务的端口号
const port = 3099

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: true,
  // lintOnSave设置为false则为关闭eslint的校验
  lintOnSave: nodeEnv === 'development' ? true : false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: nodeEnv === 'development' || branchEnv === 'test',
  publicPath: process.env.VUE_PUBLIC_PATH,
  configureWebpack: config => {
    config.name = appName
    config.cache = {
      type: 'filesystem',
      compression: 'gzip'
    }

    config.plugins.concat([
      new monacoEditorWebpackPlugin(),
      new NodePolyfillPlugin()
    ])
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@styles', resolve('src/assets/styles'))
      .set('@views', resolve('src/views'))

    config.resolve.symlinks(true)
  },
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
    extract: nodeEnv === 'production',
    // 是否为 CSS 开启 source map
    sourceMap: nodeEnv !== 'production',
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@styles/helper/mixin.scss";
          @import "@styles/helper/variables.scss";
        `
      }
    }
  },
  devServer: {
    host: 'localhost',
    port,
    open: true,
    client: {
      // 全屏显示编译错误或警告
      overlay: {
        warnings: true,
        errors: true
      }
    }
  }
})
