const { defineConfig } = require('@vue/cli-service')

// 引入等比适配插件
const px2rem = require('postcss-pxtorem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  rootValue: 16,
  propList:['*']
  // exclude: /node_modules/
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    open: false, // 自动打开浏览器
    port: 7891,
  },
  css: {
    loaderOptions: {
      postcss: {
        // plugins:[postcss],
        postcssOptions: {
          plugins: [
            postcss
          ],
        },
      },
      scss: {
        additionalData: `@import "~@/assets/css/public.scss";`,
      },
    }
  },
})

