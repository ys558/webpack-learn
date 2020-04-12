const path = require('path')
const htmlWebpackPlugins = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 10. HMR热模块更新:
const webpack = require('webpack')
const { HotModuleReplacementPlugin } = webpack

module.exports = {
  // 1. 入口文件
  // 1.1 单入口文件:
  // entry: './src/index.js',
  // 1.2 多入口文件:
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  // 2. 输出结构
  output: {
    path: path.resolve(__dirname, './dist'),
    // 2.1 单入口文件:
    // filename: 'main.js',
    // 2.2 多入口文件: 使用占位符[name]对应entry.main, 若entry没有指定对象名字, 则默认打包成main.js
    // [hash:6]为版本控制的hash码, 6为指定位数, 如果某一源文件改动,hash码才会触发改动:
    // filename: '[name]-[chunkhash:6].js',
    // 10. HMR热模块更新不能用contenthash
    filename: '[name].js'
    // filename: '[name].js'
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
        use: [
            // 4. 普通配置,css会写在html里:
            // 'style-loader', 
            // 7. 让css成为单独的文件: 须配合MiniCssExtractPlugin使用:
            MiniCssExtractPlugin.loader,
            'css-loader', 
            'less-loader', //'postcss-loader'
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
  // 5. 插件:
  // 5.1 html-webpack-plugin
  // npm install --save-dev html-webpack-plugin
  plugins: [
    // 5.2 多html文件配置: new两个htmlWebpackPlugins配置, 并配置chunks
    new htmlWebpackPlugins({
      chunks: ['index'],
      title: '首页', //源html文件里, 标题须要写成ejs模板语法才能支持
      template: './src/index.html',
      //  true | 'head' | 'body' | false ,注⼊所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      inject: true,
      filename: 'index.html',
      hash: true, //如果为 true, 将添加⼀个唯⼀的 webpack 编译hash 到所有包含的脚本和 CSS ⽂件，对于解除 cache 很有⽤。
      cache: true, //默认值true，仅在⽂件修改之后才会发布⽂件。
      // 其余常用参数:
      // showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到 HTML ⻚⾯中
      // chunks: 允许只添加某些块 (⽐如，仅仅 unit test 块),
      // chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持的值：'none' | 'default' | {function}-default:'auto'
      // excludeChunks: 允许跳过某些块，(⽐如，跳过单元测试的块)
    }),
    new htmlWebpackPlugins({
      chunks: ['login'],
      title: '登录',
      template: './src/login.html',
      inject: true,
      filename: 'login.html',
    }),
    // 6. 把上一次构建的东西清除: 这里解构出来是符合官方文档的规定:
    new CleanWebpackPlugin({}),
    // 7. 把css抽离成单独的文件:
    new MiniCssExtractPlugin({
      // 7.1 contenthash, 内容变了hash值才会改变: 和chunkhash的区别, 因为css文件是从导入到index.js文件才能使用的, 如果index.js的内容发生改变, 导入在里面的css文件内容没变,css文件的hash值就不会改变
      filename: '[name]-[contenthash:6].css'
    }),
    // 10. HMR 热模块更新
    new HotModuleReplacementPlugin()
  ],
  // 8. 开发工具，多用于定位源代码错误：
  // https://webpack.js.org/configuration/devtool#devtool
  // devtool: 'source-map' | 'eval' | 'cheap' | 'Module' | 'inline-source-map'
  // 多可组合使用：
  devtool:"inline-source-map",// 开发环境配置
  // devtool:"cheap-module-inline-source-map", // 生产环境不推荐开启，可直接设置为null，

  // 9. WebpackDevServer 开启前端服务器，模拟后端数据，解决跨域等
  // 9.1 npm install webpack-dev-server -D
  // 9.2 修改软连接：
  // "server": "webpack-dev-server" 
  // 启动服务后，会发现dist⽬录清空了，这是因为devServer把打包后的模块不会放在dist⽬录下，⽽是放到内存中，从⽽提升速度
  // 9.3 配置：可以像前端框架一样发起监听
  devServer: {
    port: 5679,
    open: true,
    contentBase: './dist',
    // 9.4 代理转发，解决跨域：
    proxy: {
      // 访问前端服务时，转到9092端口：
      '/api': {
        target: 'http://localhost:9092'
      }
    },
    //10. Hot Module Replacement 热模块更新
    hot: true,
    hotOnly: true,
  }
}