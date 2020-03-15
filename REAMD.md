## Webpack @v4.39 自学笔记:
### 1. 配置与安装:
- 推荐开发环境安装, 不推荐全局配置, 因webpack版本更新较快: 
```shell
$ npm install webpack webpack-cli -D
```
- 查看项目中所安装的版本:
```shell
$ npx webpack -v
```
或直接指定`node_modules`文件夹对应文件查询:
```shell
$ ./node_modules/.bin/webpack -v
```
- 其他命令:
  - 查看webpack历史发布信息: `npm info webpack`

### 2. 测试使用最基础的打包功能:
  - 新建 `./src/index.js` 文件, 并随便写点东西 
  - 新建`webpack.config.js` 文件, 并写下最简单的配置:**该文件名为webpack默认指定文件名,运行时webpack会自动寻找该文件进行配置**
  ```js
  module.exports = {
    entry: "./src/index.js", //默认⼊⼝⽂件
    output: "./dist/main.js" //默认输出文件
  };
  ```
  - 终端运行: `npx webpack`会自动生成 `./dist/main.js`文件
  - 当然, 也可以指定配置文件运行, 如: `npx webpack --config xx.js`, 则指定`xx.js`配置webpack
  - 用 `npm run` 运行webpack: 在package.json文件里配置如下, 其原理是在 `node_modules/.bin` 下创建一个软链接
  ```json
  "scrpits": {
    "bundle": "webpack"
  }
  ```
  ```shell
  $ npm run bundle
  ```
  

### 3. webpack文件的基础结构
```js
  const path = require('path')
  module.exports = { 
    // 1. 入口文件:
    entry: './src/index.js', 
    // 2. 输出结构
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js'
    },
    // 3. 打包环境
    mode:'development',
    // 4. 模块处理:
    module: {
      rules: {
        test: /\.css/,
        use: 'style-loader'
      }
    },
    // 5. 插件:
    plugins: [new HtmlWebpackPlugin()]
  }
```
> entry:
```js
//单⼊⼝ SPA，本质是个字符串
entry:{
 main: './src/index.js'
}
// 相当于简写
entry:"./src/index.js"

//多⼊⼝ entry是个对象
entry:{
  index:"./src/index.js",
  login:"./src/login.js"
}
```

> output: [示范代码 1-2 ](webpack.config.js)
```js
  // 单页面文件处理: 如React等前端框架
  output: {
    //输出⽂件的名称
    filename: "bundle.js",
    //输出⽂件到磁盘的⽬录，必须是绝对路径
    path: path.resolve(__dirname, "dist")
  },
  
  //多⼊⼝的处理
  output: {
    //利⽤占位符，⽂件名称不要重复
    filename: "[name][chunkhash:8].js",
    //输出⽂件到磁盘的⽬录，必须是绝对路径
    path: path.resolve(__dirname, "dist")
  },
```

- loader:
```shell
$ npm i -D file-loader
```
- module:
```js
module: {
  rules:[ ... ] // 
}
``` 
- loader: 顺序，从右到左，从下到上
- `file-loader`: 静态文件管理:
```js
rules:[{
    test: /\.(png|jpg?g|gif)$/,
    use: 'file-loader'
}]
```
`npm install url-loader -D`
- css-loader:
