#### React 路由

##### 相关理解

###### SPA 理解

* 单页 Web 应用（single page web application，SPA）
* 整个应用只有`一个完整的页面`
* 点击页面中的链接`不会刷新`页面，只会做页面的`局部更新`
* 数据都需要通过 ajax 请求获取，并在前端异步展现

###### 路由的理解

* 什么是路由？
  * 一个路由就是一个映射关系（key ：value）
  * key 为路径，value 可能是 function 或 component
* 路由分类
  * 后端路由
    * 理解：value 是 function，用来处理客户端提交的请求
    * 注册路由：`router.get(path, function(req,res))`
    * 工作过程：当 node 接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据
  * 前端路由
    * 浏览器端路由，value 是 component，用于展示页面内容
    * 注册路由：`<Route path='/test' component={Test}>`
    * 工作过程：当浏览器的 path 变为 /test 时，当前路由组件就会变为 Test 组件

###### react-router-dom 的理解

* react 的一个插件库
* 专门用来实现一个 SPA 应用
* 基于 react 的项目基本都会用到此库

##### react-router-dom 相关的API

###### 内置组件

> <BrowserRouter>
>
> <HashRouter>
>
> <Route>
>
> <Redirect>
>
> <Link>
>
> <NavLink>
>
> <Switch>

###### 路由的基本使用

* 明确好界面中的导航区、展示区

* 导航区的 a 标签改为 Link 标签

  > <Link to="/xxx">Demo</Link>

* 展示区写 Route 标签进行路径匹配

  > <Route Path="/xxx" component={Demo} />

* <App>的最外侧包裹一个 <BrowserRouter>或<HashRouter>

###### 路由组件和一般组件

* 写法不同

  > 一般组件：<Demo />
  >
  > 路由组件：<Route path="/demo" component={Demo} />

* 存放位置不同

  > 一般组件：components
  >
  > 路由组件：pages

* 接收到的 props 不同

  > 一般组件：写组件标签时传递了什么，就能收到什么
  >
  > 路由组件：接收到三个固定属性（history、location、match）
  >
  > 1. history:
  >
  > 2. 1. go: *ƒ go(n)*
  >    2. goBack: *ƒ goBack()*
  >    3. goForward: *ƒ goForward()*
  >    4. push: *ƒ push(path, state)*
  >    5. replace: *ƒ replace(path, state)
  >
  > 3. location:
  >
  > 4. 1. pathname: "/about"
  >    2. search: ""
  >    3. state: undefined
  >
  > 5. match:
  >
  > 6. 1. params: {}
  >    2. path: "/about"
  >    3. url: "/about"

###### NavLink 与封装 NavLink

* `NavLink` 可以实现路由链接的高亮，通过 `activeClassName`指定样式名
* 标签体内容是一个特殊的标签属性
* 通过 this.props.children 可以获取标签体内容

###### Switch

* 通常情况下，path 和 component 是一一对应的关系
* Switch 可以提高路由匹配效率

 ###### 解决多级路径刷新页面样式丢失问题

* `public / index.html `中引入样式时不写 `./ `写 ` / ` (常用)
* `public / index.html `中引入样式时不写 `./ `写 ` %PUBLIC_URL%` (常用)
* 使用 HashRouter

###### 路由的严格匹配与模糊匹配

* 默认使用的是模糊普配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序一致）
* 开启严格模式：`<Route exact={true} path='/about' componrnt={About} /> `
* 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

###### Redirect

* 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 redirect 指定的路由

* 具体编码

  ```react
  <Switch>
  	<Route path="/about" component={About} />
  	<Route path="/home" component={Home} />
      <Redirect to="/about" />
  </Switch>
  ```

###### 嵌套路由

* 注册子路由时要写上父路由的 path 值
* 路由的匹配是按照注册路由的顺序进行的

###### 向路由组件传递参数

* params参数

  * 路由链接（携带参数）：

    > <Link to="/demo/test/tom/18">详情</Link>

  * 注册路由（声明接收）：

    > <Route path="/demo/test/:name/:age" component={Test} />

  * 接收参数：

    > const { name,  age } = this.props.match.params

* search 参数

  * 路由链接（携带参数）：

    > <Link to="/demo/test?name=tom&age=18">详情</Link>

  * 注册路由（无需声明，正常注册即可）：

    > <Route path="/demo/test" component={Test} />

  * 接收参数：

    > const { search } = this.props.location
    >
    > 备注：获取到的 search 是 urlencoded 编码字符串，需要借助 querystring 解析

* state 参数

  * 路由链接（携带参数）：

    > <Link to={{path:"/demo/test" , state: {name:'tom‘，age: 18}}} >详情</Link>

  * 注册路由（无需声明，正常注册即可）：

    > <Route path="/demo/test" component={Test} />

  * 接收参数：

    >  this.props.location.state
    >
    > 备注：刷新也可以保留住参数

###### withRouter

* withRouter 可以加工一般组件，让一般组件具备路由组件所特有的 API

* withRouter 的返回自值是一个新组件

  ```react
  export defualt withRouter(test){}
  ```

##### 编程式路由导航

借助 this.props.history 对象上的 API 对操作路由跳转、前进、后退

​	— this.props.history.push()

​	— this.props.history.replace()

​	— this.props.history.goBack()

​	— this.props.history.goForward()

​	— this.props.history.go()

##### BrowserRouter 和 HashRouter  的区别

* 底层原理不一样：
  * BrowserRouter 使用的是 H5 的 history API，不兼容IE9及以下版本
  * HashRouter 使用的是 URL 的哈希值
* path 表现形式不一样
  * BrowserRouter 的路径中没有#，例如：localhost:3000/demo/test
  * HashRouter  的路径中包含#，例如：localhost:3000/#/demo/test

* 刷新后对路由 state 参数的影响
  * BrowserRouter 没有任何影响，因为 state 保存在 history 对象中
  * HashRouter  刷新后会导致路由 state 参数的丢失
* 备注：HashRouter 可以用于解决一些路径错误相关的问题

