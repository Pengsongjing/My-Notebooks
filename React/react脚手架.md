#### react脚手架

* xxx脚手架：用来帮助程序员快速创建一个基于 xxx 库的模板项目
  * 包含了所有需要的配置（语法检查、`jsx`编译、`devServer` ……）
  * 下载好了所有相关的依赖
  * 可以直接运行一个简单的效果
* react 提供了一个用于创建 react 项目的脚手架库：`create-react-app`
* 项目整体技术架构为：`react + webpack + es6 + eslint`
* 使用脚手架开发的项目的特点：模块化、组件化、工程化

```react
// __________固定的入口文件 index.js ____________
// 引入react核心库
import React from 'react'
// 引入 reactDOM
import ReactDOM from 'react-dom'
// 引入 APP 组件
import App from './App'
// 渲染到页面
ReactDOM.render(<App />, documnn.getElementBy（'root')

// ___________ “外壳”组件 App.js ___________
import React from 'react'

class App extends React.Component {
    render() {
        return (
        <div>Hello,react!</div>
        )
    }
}
export default App // 暴露 APP 组件
```

#### 功能界面的组件化编码流程

* 拆分组件：拆分界面，抽取组件
* 实现静态组件：使用组件实现静态页面效果
* 实现动态组件
  * 动态组件初始化数据
    * 数据类型
    * 数据名称
    * 保存在哪个组件？
  * 交互（从绑定事件监听开始）

#### React 脚手架配置代理

###### 方法一

> 在 package.json 中追加如下配置

```json
"proxy":"http://locahost:5000"
```

说明：

* 优点：配置简单，前端请求资源时可以不加任何前缀
* 缺点：不能配置多个代理
* 工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000 （优先匹配前端资源）

###### 方法二

* 第一步：创建代理配置文件

  > 在 src 下创建配置文件：src / setupProxy.js

* 编写 setupProxy.js 配置具体代理规则

```js
// __________setupProxy.js__________(放在src目录下)
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
    	proxy('/api1',{ // 遇见 /api 前缀的请求，就会出发该代理配置
        	target: 'http:locahost:5000', // 请求转发给谁
            changeOrigin: true, // 控制服务器收到的请求头中Host的值
            /*
            	changeOrigin设置为 true: 服务器收到请求头的 host 为： localhost: 5000
            	changeOrigin设置为 false: 服务器收到请求头的 host 为： localhost: 3000
            	changeOrigin默认值为 false，但是我们一般将 changeOrigin 值设置为true
            */
            pathRewrite: { // 重写请求路径，去除请求前缀，保证交给后台服务器的是正常请求地址
                '^/api1': ''
            }
        }),
        proxy('/api2',{
        	target: 'http:locahost:5001',
            changeOrigin: true,
            pathRewrite: {
                '^/api2': ''
            }
        }),
    )
}
```

说明：

* 优点：可以配置多个代理，可以灵活的控制请求是否走代理
* 缺点：配置繁琐，前端请求资源时必须加前缀

