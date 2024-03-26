module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", //演示需要,去除生产环境追加bigscreen路径
  lintOnSave: true, //eslint检测
  outputDir: "dist", //打包输出文件
  assetsDir: "static", //资源储存路径
  indexPath: "index.html", //默认首页
  productionSourceMap: false, //不生成source文件
  // transpileDependencies: true, //兼容ie
  /* 配置代理 */
  devServer: {
    port: 9091, //端口
    proxy: {
      "/api": {
        target: "http://127.0.0.1/",
        pathRewrite: {
          "^/api": "api",
        },
      },
    },
  },
};
