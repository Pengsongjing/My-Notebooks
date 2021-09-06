## vue.config.js ##
是一个可选的配置文件，`vue3.0 `不再有 `webpack.config.js` 的配置，但不可避免的，在项目开发中我们会存在一些特殊的需求需要调整 `webpack`, 这个时候我们就需要在根目录创建 `vue.config.js` 去完成 `webpack` 的一些特殊配置，默认它会被 `@vue/cli-service` 自动加载。同时也可以在 `package.json` 中的 `vue` 字段进行配置（严格遵循JSON的格式来写）

查看webpack默认的配置：可以通过指令将webpack的配置输出到 output.js 文件
```
   vue inspect > output.js
```
###     1. vue.config.js 文件
这个文件导出了一个包含了选项的对象
```javascript
    module.exports = {
        // 选项
    }
```
###     2. 基本配置
```javascript
    module.exports = {
        productionSourceMap: false,  // 生产环境是否要生成 sourceMap
        publicPath: './',    // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致,可以通过三元运算去配置dev和prod环境, publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : './'
        outputDir: 'dist',  // build 时输出的文件目录
        assetsDir: 'assets',    // 放置静态文件夹目录
        devServer: {    // dev环境下，webpack-dev-server 相关配置
            port: 8080, // 开发运行时的端口
            host: '0.0.0.0', // 开发运行时域名，设置成'0.0.0.0',在同一个局域网下，如果你的项目在运行，同时可以通过你的http://ip:port/...访问你的项目
            https: false, // 是否启用 https
            open: true //  npm run serve 时是否直接打开浏览器
        }
        // 其他配置
        ...
    }
```
###     3.插件及规则配置 
如果有新增/修改 webpack 的 plugin 或者 rules , 有两种方式

* configureWebpack 方式：是一种相对比较简单的方式<br>
   * 它可以是一个对象：和`webpack`本身配置方式是一致，该对象将会被 `webpack-merge`合并入最终的 webpack 配置
   ```javascript
        configureWebpack: {
            rules: [],
            plugins: []
        }
    ```
    * 它也可以是一个函数：直接在函数内部进行修改配置
    ```javascript
        configureWebpack: ( config ) => {
            // 例如，通过判断运行环境，设置mode
            config.mode = 'production'
        }
    ```
* chainWebpack 方式：链式操作（高级）
    接下来所有的配置都会在该选项中进行
###     4.rules
*   rules的新增<br>
在 webpack 中 rules 是 module 的配置项，而所有的配置的都是挂载到 config 下的，所以新增一个rule方式：
```javascript
        config.module
            .rule(name)
                .use(name)
                    .loader(loader)
                        .options(options)
    例：
        // 通过 style-resources-loader 来添加less全局变量
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => {
            let rule = config.module.rule('less').oneOf(type)
            rule.use('style-resource')
                .loader('style-resources-loader')
                .options({
                    patterns: [path.resolve(__dirname, './lessVariates.less')]
                });
        });
```
* rules的修改<br>
可以使用tap方法进行修改：
```javascript
    config.module
        .rule(name)
            .use(name)
                .tap( options => newOptions)
例： 
    // `url-loader`是webpack默认已经配置的，现在我们来修改它的参数
        config.module.rule('images')
            .use('url-loader')
            .tap(options => ({
                name: './assets/images/[name].[ext]',
                quality: 85,
                limit: 0,
                esModule: false,
            }))
    }
```
###     5.插件plugins的配置
* 新增
   ` config.plugin(name).use(WebpackPlugin, args)`
* 修改
    也是通过 tap 进行修改
    `config.plugin(name).tap(args => newArgs)`
* 删除
    `config.plugins.delete(name)`
###     6.一些常见的配置
##### 修改enter文件
webpack 默认的` enter` 入口是 `src/main.ts`
```javascript
config.entryPoints.clear(); // 清空默认入口
config.entry('test').add(getPath('./test/main.ts')); // 重新设置
```
##### DefinePlugin
定义全局全局变量，`DefinePlugin` 是 webpack 已经默认配置的，我们可以对参数进行修改
```javascript
config.plugin('define').tap(args => [{ 
    ...args, 
    "window.isDefine": JSON.stringify(true),
    }]);
```
##### 自定义filename 及 chunkFilename
自定义打包后js文件的路径及文件名字
```javascript
    config.output.filename('./js/[name].[chunkhash:8].js');
    config.output.chunkFilename('./js/[name].[chunkhash:8].js');
```
##### 修改html-webpack-plugin参数
`html-webpack-plugin` 是 webpack 已经默认配置的，默认的源模版文件是 `public/index.html` ;我们可以对其参数进行修改
```javascript
    config.plugin('html')
    .tap(options => [{
        template: '../../index.html' // 修改源模版文件
        title: 'test',
    }]);
```
##### 设置别名alias
webpack默认是将`src`的别名设置为`@`, 此外，我们可以进行添加
```javascript
    config.resolve.alias
        .set('@', resolve('src')) 
        .set('api', resolve('src/apis'))
        .set('common', resolve('src/common'))
```
### 配置选项 ###
**baseUrl**：从 VUE CLI 3.3 起已弃用，请使用 `publicPath`

**pubilcPath**： `默认：'/'`<br>
            部署应用包时的基本URL，VUE CLI 会假设你的应用是被部署在一个域名的根路径上；这个值也可以被设置为空字符串`（''）`或者是相对路径`（'./'）`，这样所有的资源都会被链接为相对路径，方便迁移。

**outputDir**： `默认：'dist'`<br>
            当运行 `vue-cli-service build` 时生成的生产环境构建文件的目录。注意目标目录在构建前会被清除（构建时传入 `--no-clean` 可关闭该行动）

**assetsDir**： `默认：''`<br>
            放置生成的静态资源 `(js、css、img、fonts)`的 (相对于` outputDir `的) 目录

**indexPath**： `默认：'index.html'`
            指定生成的`index.html` 的输出路径 (相对于 `outputDir`)。也可以是一个绝对路径。

**filenameHashing**： `默认：true`<br>
                  默认情况下，生成的静态资源在它们的文件名中包含了`hash` 以便更好的控制缓存。然而，这也要求`index`的 `HTML` 是被 `Vue CLI`自动生成的。如果你无法使用 `Vue CLI` 生成的 `index HTML`，你可以通过将这个选项设为`false `来关闭文件名哈希
                
**pages**： `默认：undefined`
        在 `multi-page `模式下构建应用。每个`“page”`应该有一个对应的 `JavaScript` 入口文件。其值应该是一个对象，对象的 `key` 是入口的名字，`value `可以是对象或字符串
```javascript
    pages: {
        index:{
            // page 的入口
            entry: 'src/index/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，template中的title标签需要是<title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk
            chunks: ['chunk-vendors','chunk-common','index']
            // 当使用只有入口的字符串格式时，模板会被推导为`public/index.html`。并且如果找不到的话，就退回到`public/index.html`。输出文件名就会被推导为 `subpage.html`
            subpage: 'src/subpage/main.js'
        }
    }
```
**lintOnSave**：    `默认：default（可选值：'warning'|'default'|'error')`<br>
是否在`开发环境`下通过`eslint-loader`在每次保存时`lint`代码。这个值会在`@vue/cli-plugin-eslint`被安装之后生效
| 值 | 说明 |
---|:---
true/'warning' | 编译警告，仅仅会被输出到命令行，且不会使得编译失败
default |  错误在开发时直接显示在浏览器中，编译错误，同时也意味着lint错误将会导致编译失败
error | 编译错误，导致编译失败

**runtimeCompiler**： `默认：false`<br>
是否使用包含运行时编译器的 `Vue` 构建版本。设置为 `true` 后你就可以在 `Vue` 组件中使用 `template`选项了，但是这会让你的应用额外增加 `10kb` 左右。

**transpileDependencies**： `默认: []`<br>
默认情况下`babel-loader`会忽略所有` node_modules`中的文件。如果你想要通过 `Babel `显式转译一个依赖，可以在这个选项中列出来。

**productionSourceMap**： `默认：true`<br>
如果你不需要生产环境的` source map`，可以将其设置为`false` 以加速生产环境构建。

**crossorigin**： `默认： undefined`<br>
设置生成的 HTML 中 `<link rel="stylesheet">` 和 `<script> `标签的 `crossorigin` 属性

    需要注意的是该选项仅影响由html-webpack-plugin 在构建时注入的标签 - 直接写在模版(public/index.html)中的标签不受影响。
**integrity**： `默认：false`<br>
在生成的 HTML 中的`<link rel="stylesheet"> `和`<script>`标签上启用`Subresource Integrity (SRI)`。如果你构建后的文件是部署在` CDN` 上的，启用该选项可以提供额外的安全性。

**configureWebpack**：
*   如果这个值是一个对象，则会通过 `webpack-merge`合并到最终的配置中。
*   如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  
**chainWebpack**：
* 是一个函数，会接收一个基于 `webpack-chain` 的 `ChainableConfig`实例。允许对内部的`webpack`配置进行更细粒度的修改。

**css.requireModuleExtension**： `默认：true`<br>
默认情况下，只有` *.module.[ext]`结尾的文件才会被视作`CSS Modules `模块。设置为` false`后你就可以去掉文件名中的`.module`并将所有的 `*.(css|scss|sass|less|styl(us)?)`文件视为 `CSS Modules`模块。

**css.extract**： `默认：生产环境下是 true，开发环境下是 false`<br>
是否将组件中的 `CSS` 提取至一个独立的 `CSS` 文件中 (而不是动态注入到 `JavaScript`中的`inline`代码)。

同样当构建 `Web Components`组件时它总是会被禁用 (样式是 `inline` 的并注入到了 `shadowRoot` 中)。

当作为一个库构建时，你也可以将其设置为`false`免得用户自己导入 `CSS`。

提取 `CSS` 在开发环境模式下是默认不开启的，因为它和 `CSS` 热重载不兼容。然而，你仍然可以将这个值显性地设置为` true` 在所有情况下都强制提取。

**css.sourceMap**： `默认：false `<br>
是否为` CSS` 开启` source map`。设置为`true`之后可能会影响构建的性能。

**css.loaderOptions**： `默认：{}`<br>
```javascript
module.exports = {
    css: {
        loaderOptions: {
            css: {
                //这里的选项会传递给 css-loader
            },
            postcss: {
                //这里的选项会传递给 postcss-loader
            }
        }
    }
}
```
    相比于使用chainWebpack 手动指定loader更推荐上面这样做，因为这些选项需要应用在使用了相应 loader的多个地方。
支持的 loader 有：

* css-loader
* postcss-loader
* sass-loader
* less-loader
* stylus-loader
  
另外，也可以使用 `scss` 选项，针对`scss` 语法进行单独配置（区别于`sass`语法）。

**devServer**： 所有`webpack-dev-server`的选项都支持。
* 有些值像 `host`、`port`和 `https` 可能会被`命令行参数`覆写。
* 有些值像 `publicPath` 和 `historyApiFallback` 不应该被修改，因为它们需要和开发服务器的 `publicPath` 同步以保障正常的工作。

**devServer.proxy**：<br>
如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求`代理`到 API 服务器。这个问题可以通过`vue.config.js` 中的 `devServer.proxy` 选项来配置。
```javascript
module.exports = {
    devServer: {
        proxy: 'http:localhost:6666'
    }
}
```
**parallel**： `默认：require('os').cpus().length > 1`<br>
是否为 `Babel` 或 `TypeScript` 使用 `thread-loader`。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。

**pwa**: 
向 `PWA` 插件传递选项

**pluginOptions**: <br>
这是一个不进行任何 `schema` 验证的对象，因此它可以用来传递任何第三方插件选项。例如：
```javascript
module.exports = {
    pluginOptions: {
        foo: {
            // 插件可以作为 options.pluginOptions.foo 访问这些选项
        }
    }
}
```
## 常用完整配置
```javascript
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'xxxx' : 'xxxx',
    // build 时构建文件的目录，构建时传入 --no-clean 可关闭该行为
    outputDir: 'dist',  
    assetsDir: '',
    indexPath: 'index.html',
    // 默认在生产的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,
    // 构建多页面应用，页面的配置
    pages: {
        index: {
            entry: 'src/index.main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page',
            chunka: ['chunk-vensors','chunk-common','index'],
        },
        subpage: 'src/subpage/main.js'
    },
    // 在开发环境开启，生产构建时禁用eslint-loader
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 是否使用包含运行时编译器的vue构建版本
    runtimeCompiler: false,
    // Babel 显式转译列表
    transpileDependencies: [],
    productionSourceMap: true,
    crossorigin: '',
    integrity: false,
    configureWebpack: {},
    chainWebpack: () => {

    },
    // css处理
    css: {
        modules: true,
        extract: false,
        sourceMap: false,
        loaderOptions: {
            css: {},
            less: {}
        }
    },
    devServe: {
        open: true, // 浏览器自动打开
        port: 8888, // 端口
        proxy: { // 代理
            '/api': {
                target: 'http://101.15.22.98',
                changeOrigin: true, // 开启跨域
                // secure: true, // 如果是https，需要该参数
            }
        }
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    pluginOptions: {}
}
```