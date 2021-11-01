#### redux 是什么

* redux 是一个专门用于做 ` 状态管理 ` 的 JS 库（不是 react 插件库）
* 它可以用在 react、angular、vue 等项目中，但基本与 react 配合使用
* 作用：集中式管理 react 应用中多个组件共享的状态

###### 什么情况下需要使用 redux

* 某个组件的状态，需要让其他组件可以随时拿到（共享）
* 一个组件需要改变另一个组件的状态（通信）
* 总体原则：能不用就不用，如果不用比较吃力才考虑使用

#### redux 工作流程

![](C:\Users\emipeng\Practice\My-Notebooks\2021-04-29-09-56-16.png)

#### redux 的三个核心概念

###### action

> * 动作的对象
> * 包含 2 个属性
>   * type：标识属性，值为字符串，唯一，必要属性
>   * data：数据属性，值类型任意，可选属性
> * 例子：{ type: 'ADD_STUDENT', data: { name: 'tom', age: 18} }

###### reducer

> * 用于初始化状态、加工状态
> * 加工时，根据旧的 state 和 action，产生新的 state 的 `纯函数`

###### store

> * 将 state、action、reducer 联系在一起的对象
> * 如何得到此对象？
>   * import { createStore } from 'redux'
>   * import reducer from './reducers'
>   * const store = createStore(reducer)
> * 此对象的功能？
>   * getState( )：得到 state
>   * dispatch( action )：分发 action，出发 reducer 调用，产生新的 state
>   * subscribe( listener )：注册监听，当产生了新的 state 时，自动调用

###### 求和案例

* 去除 Count 组件自身的状态

* src下建立：

  ```
  — src
  	— redux
  		— store.js
  		— count_reducer.js
  ```

* store.js

  * 引入`redux`中的 `createStore` 函数，创建一个 store
  * createStore 调用时要传入一个为其服务的 reducer
  * 记得暴露 store 对象

* count_reducer.js

  * reducer的本质是一个函数，接收：preState，action，返回加工后的状态
  * reducer有两个作用：初始化状态，加工状态
  * reducer被第一次调用时，是store自动触发的，
    * 传递的preState是：undefined
    * 转递的action是：{type：‘@@REDUX/INIT_a.2.b.4 ’}

* 在 index.js 中监测 store 中状态的改变，一旦发生改变重新渲染<App />

  备注：redux 只复制管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写

* count_action.js 专门用于创建 action 对象
* constant.js 防止由于编码疏忽写错action中的type

###### 异步 action

* 明确：延迟动作不想交给组件自身，想交给 action
* 何时需要异步 action：想要对状态进行操作，但是具体的数据靠异步任务返回（非必须）
* 具体编码：
  * yarn add redux-thunk，并配置在 store中
  * 创建 action 的函数不再返回一般对象，而是一个函数，该函数中写异步任务
  * 异步任务有结果后，分发一个同步的 action 去真正操作数据
* 备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步 action

#### react-redux

![](C:\Users\emipeng\Practice\My-Notebooks\1634798096(1).png)

* 明确两个概念：

  * UI组件：不能使用任何 redux 的 api，只负责页面的呈现、交互等
  * 容器组件：复制和 redux 通信，将结果交给 UI  组件

* 如何创建一个容器组件——靠react-redux的 connect 函数

  `connect( mapStateToProps, mapDispatchToProps )( UI组件 )`

  > ​		—`mapStateToProps`：映射状态，返回值是一个对象
  >    	 —`mapDispatchToProps`：映射操作状态的方法，返回值是一个对象

* 备注：容器组件中的 store 是靠 props 传进去的，而不是在容器组件中直接引入
* mapDispatchToProps 也可以是一个对象

###### 优化

* 容器组件和UI组件整合成一个文件
* 无需自己给容器组件传递 store，给<App />包裹一个 <Provider store={store}></Provider>即可
* 使用了 react-redux 后也不用再自己监测redux中状态的改变了，容器组件可以自己完成这个工作
* mapDispatchToProps 可以简写成一个对象
* 一个组件要和redux打交道需要经过哪几步？
  * 定义好UI组件————不暴露
  * 引入connect生产一个容器组件，并暴露
  * 在UI组件中通过this.props.xxx读取和操作状态

```react
import React, { Component } from 'react'
import { createIncrementAction, createDecrementAction } from '../../redux/count_action' 
// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

// 定义 UI 组件
class Count extends Component {
  // 加法
  increment = () => {
    const { value } = this.selectNumber
    this.props.increment(value * 1)
  }
  
  render() {
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
        <select ref={ c => this.selectNumber = c }>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}
// 使用 connect()() 创建并暴露一个 Count 组件
export default connect(
  state => ({count:state}), // 映射状态
  //mapDispatchToProps简写 // 映射操作状态的方法
  { 
    increment: createIncrementAction,
    decrement: createDecrementAction
  }
)(Count)

```

###### react-redux 数据共享

* 定义一个Person组件，和Count组件通过redux共享数据
* 为Person组件编写：reducer、action，配置constant常量
* 重点：Person的 reducer 和 Count 的 reducer 要使用`combineReducers` 进行合并，合并后的总状态是一个对象
* 交给 store 的是总 reducer，最后注意在组件取出状态的时候，记得”取到位“

#### 纯函数

* 一类特别的函数：只要是同样的输入（实参），必定得到同样的输出
* 必须遵守一下一些约束：
  * 不得改写参数数据
  * 不会产生任何副作用，例如网络请求，输入和输出设备
  * 不能调用 Date.now() 或者 Math.random() 等不纯的方法

* redux 的 reducer 函数必须是一个纯函数

