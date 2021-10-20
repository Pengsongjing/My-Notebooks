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

