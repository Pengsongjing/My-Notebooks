# .env 文件 # 
`.env` 全局默认配置文件，不论什么环境都会加载合并
`.env.development` 开发环境加载的配置文件
`.env.production` 生产环境加载的配置文件

文件内容： 自定义属性名必须以 VUE_APP_开头， 比如 VUE_APP_XXX
    
##  模式 
模式是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：
* `development` 模式用于 `vue-cli-service serve`
* `test` 模式用于 `vue-cli-service test:unit`
* `production` 模式用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`

你可以通过传递 `--mode` 选项参数为命令行覆写默认的模式。例如，你想要在构建命令使用开发环境：
    `vue-cli-service build --mode development`

可以在命令行这样设置：
```javascript
"scripts": {
    "serve": "vue-cli-service serve",
    "build:beta": "vue-cli-service build --mode development",
    "build:release": "vue-cle-service build --mode production",
    "lint": "vue-cli-service lint"
}
```
文件名对应 `mode` 配置，当你运行指令 `npm run build:beta` 时，便可以在页面内部获取 `.env.development` 内设置的变量


可以通过为 `.env` 文件增加后缀来设置某个模式下特有的环境变量

如建立一个名为 .env.development 的文件，那么在这个文件里声明过的变量就只会在 development 模式下被载入

（在 `package.json` 中添加不同的环境对应的执行语句）

如： `'dev-build': 'vue-cli-service build --mode development'`

可以使用 --mode 来配置不同的模式

#### 基本格式： 
* `NODE_ENV` = 环境名称
* `NODE_APP_URL` = 对应的环境地址

Vue 启动时，无论是在开发环境还是生产环境，它始终都会加载 .env 文件里的内容，然后 

 **根据Node环境变量‘NODE_ENV’的值来选择加载‘development’还是‘production’。**

按顺序加载文件时，Vue会把后一个加载的文件与前面加载的文件内容进行比较，如果存在变量名相同，那么它会采用后一个文件里的变量值为变量的最终变量