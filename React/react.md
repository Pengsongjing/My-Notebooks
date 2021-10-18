## React

##### JSX

语法规则：

> * 定义虚拟DOM时，不要写引号
> * 标签中混入JS表达式时 要用{}
> * 样式的类名指定不要用class，要用className
> * 内联样式，要用 style={{key: value}} 的形式去写
> * 虚拟DOM必须只有一个根标签
> * 标签必须闭合
> * 标签首字母
>   * 若小写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错
>   * 若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错

一定注意区分：【js语句（代码）】与【js表达式】

1. 表达式：一个表达式会产生一个值，可以放在任何需要值的地方，下面这些都是表达式

   > `a`、`a+b`、`demo(1)`、`arr.map()`、`function test() {}`

2. 语句（代码）：下面这些都是语句（代码）

   > `if(){}`、`for(){}`、`switch(){case:xxx}`

##### 模块与组件

###### 模块

* 理解：向外提供特定功能的 js 程序，一般就是一个 js 文件
* 为什么要拆成模块：随着业务逻辑的增加，代码越来越多且复杂
* 作用：复用 js，简化 js 的编写，提高 js 运行效率

###### 组件

* 理解：用来实现局部功能效果的代码和资源的集合（html、css、js、image等）
* 为什么：一个界面的功能更复杂
* 作用：复用编码，简化项目编码，提高运行效率

###### 模块化

当应用的 js 都以模块来编写的，这个应用就是一个模块化的应用

###### 组件化

当应用是以多组件的方式实现，这个应用就是一个组件化的应用

#### react 面向组件编程

##### 函数式组件

```react
// 1. 创建函数式组件
function MyComponent() {
    console.log(this) // 此处的this是undefined，因为babel编译后开启了严格模式
    return (
    	<div>xxx</div>
    )
}
//2. 渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

执行了ReactDOM.render(<MyComponent />，document.....)之后，发生了什么？

* React解析组件标签，找到了MyComponent组件
* 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中

##### 类式组件

```react
// 1. 创建类式组件
class MyComponent extends React.Component{
    render() { 
        // render是放在那里的？ —— 类（MyComponent）的原型对象上，供实例使用
        // render中的this是谁？ —— MyComponent组件的实例对象
        return (
        	<div></div>
        )
    }
}
//2. 渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

执行了ReactDOM.render(<MyComponent />，document.....)之后，发生了什么？

* React解析组件标签，找到了MyComponent组件
* 发现组件是使用类定义的，随后 New 处来改类的实例，并通过改实例调用到原型上的 render 方法
* 将 render 返回的虚拟DOM转为真实DOM，随后呈现在页面中

#### state

`组件实例的三大核心属性：state、prop、ref`

###### 理解

* state 是组件对象最重要的属性，值是对象（可以包含多个 key-value 的组合）
* 组件被称为“状态机”，通过更新组件的 state 来更新对应的页面显示（重新渲染组件）

###### 注意

* 组件中 render 方法中的 this 为组件实例对象
* 组件自定义的方法中 this 为 undefined，如何解决
  * 强制绑定 this：通过函数对象bind（）
  * 箭头函数
* 状态数据，不能直接修改或更新，必须通过 setState 进行更新，且更新是一种合并，不是替换

#### props

###### 理解

* 每个组件对象都会有 props（properties 的简写）属性
* 组件标签的所有属性都保存在 props 中

###### 作用

* 通过标签属性从组件外向组内部传递变化的数据
* 注意：组件内部不要修改 props 数据

###### 编码操作

* 内部读取某个属性值

  > this.props.name

* 对 props 中的属性值进行类型限制和必要性限制

  > 第一种（react v15.5开始已弃用）
  >
  > Person.propTypes = {
  >
  > ​	name: React.PropTypes.string.isRequired,
  >
  > ​	age: React.PropTypes.number
  >
  > }

```javascript
// 第二种（新）
// 对标签属性进行类型、必要性的限制
static propTypes = {
	name: PropTypes.string.isRequired, // 限制name必传，且为字符串
	age: PropTypes.number
	// 类型为函数则为 PropTypes.func
}
// 指定默认值
static defaultProps = {
	age : 18  // 没有传age则默认为18
}
```

#### refs与事件处理

###### 理解

* 组件内的标签可以定义 ref 属性来标识自己

###### 编码操作

```jsx
// (1)字符串形式的ref
	<input ref='input1' />

// (2)回调形式的 ref
    <input ref={(c) => {this.input1 = c}} />
 
// (3)createRef
//React.createRef 调用后可以返回一个容器，该容器可以存储被 ref 所标识的节点
	myRef = React.createRef()
// this.myRef.current获取
	<input ref={this.myRef} />
```

###### 事件处理

* 通过 onXxx 属性指定事件处理函数（注意大小写）
  * React 使用的是自定义（合成）事件，而不是使用的原生 DOM 事件  ———— 为了更好的兼容性
  * React 中的事件是通过事件委托方式处理的（委托给组件最外层的元素）———— 为了高效
* 通过 event.target 得到发生事件的 DOM 元素对象

#### 高阶函数和函数柯里化

###### 高阶函数

* 如果一个函数符合下面 2 个规范中的任何一个，那么该函数就是高阶函数
  * 若 A 函数，接收的参数是一个函数，那么 A 就可以称之为高阶函数
  * 若 A 函数，调用的返回值依然是一个函数，那么 A 就可以称之为高阶函数
  * 常见的高阶函数有：Promise、setTimeout、arr.map( ) 等等

###### 函数的柯里化

* 通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

```js
// 简单例子
sum = (a) => {
	return (b) => {
		return (c) => {
			return a + b + c
		}
	}
}
const result = sum(1)(2)(3)
```

#### 组件的声明周期

###### 理解

* 组件对象从创建到死亡它会经历特定阶段
* React 组件对象包含一系列钩子函数（生命周期回调函数），在特定的时刻调用
* 我们在定义组件时，在特定的生命周期回调函数中做特定的工作

###### 生命周期图（旧版本）

![](C:\Users\emipeng\Practice\My-Notebooks\20210615230015219.png)

> 1. 初始化阶段：由ReactDOM.render( )出发------初次渲染
>    1. constructor( )
>    2. componentWillMount( )
>    3. render( )
>    4. componentDidMount( )   `常用，一般在这个钩子中做一些初始化的事情，例如：开启定时器、发送网络请求、订阅消息`
> 2. 更新阶段：由组件内部 this.setState( )或父组件重新 render 触发
>    1. shouldComponentUpdate( ) ` “阀门” 必须返回 false / true，为 true才继续向下`
>    2. componentWillUpdate( )
>    3. render( ) `必须使用的一个`
>    4. componentDidUpdate( )
> 3. 卸载组件：由 ReactDom.unmountComponentAtNode( )触发
>    1. componentWillUnmount( ) `常用，一般在这个钩子中做一些收尾的事情，例如：关闭定时器、取消消息订阅`

###### 生命周期（新版本）

![](C:\Users\emipeng\Practice\My-Notebooks\20210615230015519.png)

> 1. 初始化阶段：由ReactDOM.render( )出发------初次渲染
>    1. constructor( )
>    2. getDerivedStateFromProps( )
>    3. render( )
>    4. componentDidMount( )   `常用，一般在这个钩子中做一些初始化的事情，例如：开启定时器、发送网络请求、订阅消息`
> 2. 更新阶段：由组件内部 this.setState( )或父组件重新 render 触发
>    1. getDerivedStateFromProps( ) 
>    2. shouldComponentUpdate( )
>    3. render( ) `必须使用的一个`
>    4. getSnapshotBeforeUpdate( )
>    5. componentDidUpdate( )
> 3. 卸载组件：由 ReactDom.unmountComponentAtNode( )触发
>    1. componentWillUnmount( ) `常用，一般在这个钩子中做一些收尾的事情，例如：关闭定时器、取消消息订阅`

###### 重要的钩子

* render：初始化渲染或更新渲染调用
* componentDidMount：开启监听，发送 ajax 请求
* componentWillUnmount：做一些收尾工作，如清除定时器

###### 即将废弃的钩子

* componentWillMount
* componentWillReceiveProps
* componentWillUpdate

`使用会出现警告，需要加上 UNSAFE_ 前缀，以后可能会被彻底废弃，不建议使用`

