###### Hook 是什么

> Hook 是一个特殊的函数，它可以让你 “ 钩入” React的特性

#### useState()：状态钩子

`useState()`用于为函数组件引入状态

* useState() 函数接收状态的初始值，作为参数
* 该函数返回一个数组，数组的第一个成员是一个变量，指向状态的当前值，第二个成员是一个函数，用来更新状态

```react
import React, { useState } from 'react'

export default function Count() {
    
    const [count, setCount] = useState(0)
    
    return (
    	<h1>you clicked {count} times</h1>
        <button onClick={()=>{setCount(count+1)}}>click me</button>
    )
}
```

#### useContext()：共享状态钩子

如果需要在组件之间共享状态，可以使用`useContext()`

* 第一步就是使用 React Context API 在组件外部建立一个 `Context`
* <xxxContext.Provider>标签包裹子组件，提供`Context` 对象可以被子组件共享
* 使用`useContext()`钩子函数来引入 Context 对象，获取属性

```react
// 希望 Navbar 和 Message 之间共享状态
const AppContext = React.createContext({})

<AppContext.Provider value={{username: 'xxx'}}>
    <div>
    	<Navbar />
        <Message />
    </div>
</AppContext.Provider>
    
// Navbar 组件
function Navbar() {
    const {username} = useContext(AppContext)
    return (
    	<div>
        	<p>{username}</p>
        </div>
    )
}

// Message 同 Nabar 组件
```

#### useReducer()：action钩子

`const [state, dispatch] = userReducer(reducer, initialState)`

* `useReducer()` 接受 `Reducer 函数` 和 `状态的初始值`作为参数，返回一个数组
* 数组的第一个成员是`状态的当前值`，第二个成员是`发送 action 的 dispatch 函数`
* Reducer 函数的形式是：`(state, action) => newState`

```react
// 计数器例子
// Reducer 函数
const myReducer = (state, action) => {
    switch(action.type) {
        case 'add': return {...state, count: state.count + 1}
        default: return state
    }
}

// 组件代码
function App(){
    const [state, dispatch] = useReducer(myReducer, {count: 0})
    return (
    	<div>
        	<button 
                onClick={()=>{dispatch({type:'add'})}}
             >
                +1
            </button>
            <p>Count: {state.count}</p>
        </div>
    )
}
```

> 由于 Hooks 可以提供共享状态和 Reducer 函数，所以它可以在这方面取代 Redux。但是，它没法提供中间件和时间旅行，如果需要这两个功能，还是需要 redux

#### useEffect()：副作用钩子

```react
useEffect(()=>{
    // 在此可以执行任何带副作用的操作
    return () => {
        // 在此做一些收尾工作，比如清除定时器 / 取消订阅等
    }
} , [dispendencies])
```

* `useEffect() `用来引入具有副作用的操作，最常见的就是向服务器请求数据

* `useEffect()` 接受两个参数，第一个参数是一个函数，异步操作的代码放在这里；第二个参数是一个数组，用于给出 Effect 的依赖项，只要数组发送变化，`useEffect()` 就会执行

* 如果省略第二个参数，则每次组件渲染时，就会执行 `useEffect()`

* 可以把 useEffect Hook 看作如下三个函数的组合

  > componentDidMount( )
  >
  > componentDidUpdate( )
  >
  > componentWillUnmount( ) 

#### userRef()

`const refContainer = useRef(initValue)`

* `useRef()`返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数
* 返回的 `ref` 对象在组件的整个生命周期内都保持不变

```react
function demo() {
    const inputRef = useRef(null)
    const handleClick = () => {
        inputRef.current.focus()
    }
    return (
    	<>
        <input ref={inputRef}  />
        <button onClick={handleClick}>Focus the input</button>
        </>
    )
}
```

#### Hook 规则

* 只在最顶层使用 Hook（确保 Hook 在每次渲染中都按照相同的顺序被调用）
* 不要在循环、条件或嵌套函数中调用 Hook
* 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook
