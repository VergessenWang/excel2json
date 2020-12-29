// 引入等比适配插件
const px2rem = require("postcss-px2rem");

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
});

module.exports = {
  publicPath: "/",
  lintOnSave: false,
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss]
      },
      sass: {
        prependData: `@import "~@/scss/_variable.scss";`
      }
    }
  }
};
