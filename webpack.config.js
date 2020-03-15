const path = require('path')


module.exports = {
  // 1. 入口文件
  // 1.1 单入口文件:
  entry: './src/index.js',
  // 1.2 多入口文件:
  // entry: {
  //   index: './src/index.js',
  //   login: './src/login.js',
  // }, 
  // 2. 输出结构
  output: {
    path: path.resolve(__dirname, './dist'),
    // 2.1 单入口文件:
    // filename: 'main.js',
    // 2.2 多入口文件: 使用占位符[name]对应entry.main, 若entry没有指定对象名字, 则默认打包成main.js
    // [hash:6]为版本控制的hash码, 6为指定位数, 如果某一源文件改动,hash码才会触发改动:
    // filename: '[name]-[hash:6].js',
    filename: '[name].js'
  },
  // 3. 打包环境
  mode: 'development',
  // 4. 模块处理:
  module: {
    rules: [
      {
        test: /\.(png|jpg?g|gif)$/,
        // 4.1 file-loader: 静态文件读取:
        // use: 'file-loader', // !!!注意: url-loader: 可替代file-loader, 但是遇到jpg格式的模块时，会把该图⽚转换成base64格式字符串，并打包到js⾥。对⼩体积的图⽚⽐较合适，⼤图⽚不合适。
        // 4.2 'url-loader':
        use: {
          loader: 'url-loader',
          options: { // 可配置移动到哪个目录:
            name: '[name]-[hash:6].[ext]', // 占位符替代
            outputPath: "images/", // 输出路径
            // !!!注意: limit在移动端最常用:
            limit: 2048, //⼩于2048, 即2kb时，图片自动转换成base64的js代码, 不再独立生成文件
          }
        }
      },
      // 4.3 字体文件: 找到相应的字体: 
      {
        test: /\.(woff?2)$/,
        use: {
          loader: 'file-loader'
        }
      },
      // 4.4 样式: npm i -D style-loader css-loader
      {
        // !!!!注意: less-loader安装:  npm i -D less less-loader 官方文档错了, 没有安装less
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader', //'postcss-loader'
          // 'postcss-loader'也可以写成下面这种, 不独立成文件:
          {
            //4.5 加css前缀,兼容各种浏览器: npm i postcss-loader autoprefixer -D
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  //autoprefixer新版本中browsers替换成overrideBrowserslist,
                  // 后两个版本, 占有率大于1%
                  overrideBrowserslist: ["last 2 versions", ">1%"]
                })]
            }
          }
        ]
      }
    ],
  },
  /*开启监听模式: watch: true, 
  另一种方法: package.json添加软链接 "watch": "webpack --watch",*/
  watch: true, //默认false,不开启
  // 监听选项:
  watchOptions: {
    ignored: /node_modules/, //默认为空，不监听的⽂件或者⽬录，⽀持正则
    aggregateTimeout: 300, //监听到⽂件变化后，等300ms再去执⾏，默认300ms,
    // poll: 1000 //判断⽂件是否发⽣变化是通过不停的询问系统指定⽂件有没有变化，默认每秒问1次
  },
}