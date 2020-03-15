// 4.5 postcss-loader配置:
module.exports = {
  plugins: [
    require('autoprefixer')({
      //autoprefixer新版本中browsers替换成overrideBrowserslist,
      // 后两个版本, 占有率大于1%
      overrideBrowserslist: ["last 2 versions", ">1%"]
  })]
}